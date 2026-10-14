'use client'
/**
 * LA GALERIE (/realisations) — un hall d'exposition de nuit : chaque projet est
 * présenté dans un vrai ordinateur portable en métal brossé et un téléphone,
 * le long d'une allée qui s'enfonce dans la profondeur. Le scroll fait avancer
 * un travelling (`travel`, 0 → 1, scrub pur) ; le portable qu'on approche
 * s'ouvre, son écran s'allume et la capture y défile ; une lumière chaude
 * glisse lentement sur l'aluminium ; le pointeur incline l'appareil ; un clic
 * émet `su-galerie` avec le rectangle de l'écran, pour la transition vers la
 * fiche (élément partagé).
 */
import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { BoxGeometry, Color, Group, LinearFilter, Mesh, PlaneGeometry, PMREMGenerator, PointLight, ShaderMaterial, SRGBColorSpace, Texture, TextureLoader, Vector2, Vector3, Vector4 } from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { stackUniforms } from '../engine'
import { useScene } from '../store'
import { NOISE } from '../materials/glsl'
import { materiauxAppareils, planArrondi, plaqueArrondie, textureClavier } from './appareils'

export interface ProjetGalerie {
  slug: string
  nom: string
  accent: string
  capture: string
}

const ESPACEMENT = 11
// Portable : châssis 6,4 × 4,2 ; couvercle 6,4 × 4,05 ; écran 16:10 de 6,0 × 3,75.
const LW = 6.4
const LD = 4.2
const BASE_H = 0.16
const COUV_H = 4.05
const ECR_W = 6.0
const ECR_H = 3.75
// Téléphone.
const TW = 1.28
const TH = 2.62
const TE_W = 1.16
const TE_H = 2.5

const ecranVertex = /* glsl */ `
uniform vec2 uTaille;
varying vec2 vUv;
varying vec3 vWorld;
void main() {
  vUv = position.xy / uTaille + 0.5;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorld = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`
const ecranFragment = /* glsl */ `
precision highp float;
uniform sampler2D uCapture;
uniform float uTime;
uniform float uAllume;
uniform float uSurvol;
uniform float uBalai;
uniform vec3 uAccent;
uniform vec4 uRecadre;
uniform vec2 uPan;
varying vec2 vUv;
void main() {
  // La capture DÉFILE dans l'écran : un cadrage plus serré que l'image, qui glisse d'un coin à l'autre.
  vec2 uv = uRecadre.xy + uPan * (vec2(1.0) - uRecadre.zw - uRecadre.xy) + vUv * uRecadre.zw;
  vec3 c = texture2D(uCapture, uv).rgb;
  vec3 eteint = mix(vec3(0.02, 0.04, 0.07), c * 0.18, 0.55);
  vec3 col = mix(eteint, c, uAllume);
  // Reflet de verre : une bande diagonale qui traverse l'écran quand la lumière glisse.
  float d = vUv.x + vUv.y * 0.55 - (uBalai * 2.2 - 0.6);
  float reflet = smoothstep(0.0, 0.05, d) * smoothstep(0.26, 0.04, d);
  col += vec3(1.0, 0.97, 0.9) * reflet * (0.05 + 0.05 * uAllume);
  float bord = 1.0 - smoothstep(0.0, 0.012, min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y)));
  col = mix(col, uAccent, bord * uSurvol);
  gl_FragColor = vec4(col, 1.0);
}
`
const solFragment = /* glsl */ `
precision highp float;
${NOISE}
uniform vec3 uAccent;
uniform float uTravel;
uniform float uLongueur;
varying vec3 vWorld;
void main() {
  vec2 p = vWorld.xz;
  float g = max(gridLine(p.x * 0.5, 0.8), gridLine((p.y) * 0.5, 0.8));
  float g5 = max(gridLine(p.x * 0.1, 1.2), gridLine(p.y * 0.1, 1.2));
  vec3 col = vec3(0.055, 0.14, 0.26) * (0.85 + fbm(p * 0.2) * 0.3);
  col += vec3(0.36, 0.55, 0.75) * (g * 0.12 + g5 * 0.25);
  col += uAccent * (1.0 - smoothstep(0.0, 0.08, abs(p.x - 1.0) - 0.6)) * 0.05;
  float fond = smoothstep(-uLongueur - 20.0, -6.0, vWorld.z) * (1.0 - smoothstep(4.0, 9.0, vWorld.z));
  float cotes = 1.0 - smoothstep(10.0, 22.0, abs(p.x));
  gl_FragColor = vec4(col, fond * cotes * 0.9);
}
`

const lisse = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

export default function Galerie({ projets }: { projets: ProjetGalerie[] }) {
  const u = stackUniforms()
  const camera = useThree((s) => s.camera)
  const size = useThree((s) => s.size)
  const gl = useThree((s) => s.gl)
  const scene = useThree((s) => s.scene)
  const racine = useRef<Group>(null)
  const groupes = useRef<(Group | null)[]>([])
  const couvercles = useRef<(Group | null)[]>([])
  const telephones = useRef<(Group | null)[]>([])
  const ecransMesh = useRef<(Mesh | null)[]>([])
  const balai = useRef<PointLight>(null)
  const mobile = size.width < 768
  const n = projets.length

  // L'éclairage de studio : un environnement de pièce (reflets de l'aluminium), généré, sans fichier.
  const cible = useRef({ gl, scene })
  useEffect(() => {
    cible.current = { gl, scene }
  }, [gl, scene])
  useEffect(() => {
    const { gl: rendu, scene: sc } = cible.current
    const pm = new PMREMGenerator(rendu)
    const env = pm.fromScene(new RoomEnvironment(), 0.04)
    sc.environment = env.texture
    sc.environmentIntensity = 0.9
    return () => {
      sc.environment = null
      env.dispose()
      pm.dispose()
    }
  }, [])

  const objets = useMemo(() => {
    const chargeur = new TextureLoader()
    const clavier = textureClavier()
    const mat = materiauxAppareils(clavier)
    const geo = {
      base: plaqueArrondie(LW, LD, 0.22, BASE_H, 0.014),
      deck: new PlaneGeometry(LW - 0.5, LD - 0.7),
      pave: plaqueArrondie(1.9, 1.15, 0.1, 0.012, 0.004),
      couvercle: plaqueArrondie(LW, COUV_H, 0.2, 0.1, 0.014),
      cadre: plaqueArrondie(LW - 0.1, COUV_H - 0.1, 0.17, 0.012, 0.004),
      ecran: planArrondi(ECR_W, ECR_H, 0.04),
      encoche: plaqueArrondie(0.5, 0.09, 0.04, 0.012, 0.004),
      charniere: new BoxGeometry(LW * 0.7, 0.07, 0.12),
      tel: plaqueArrondie(TW, TH, 0.2, 0.13, 0.016),
      telCadre: plaqueArrondie(TW - 0.04, TH - 0.04, 0.17, 0.012, 0.004),
      telEcran: planArrondi(TE_W, TE_H, 0.12),
      ilot: plaqueArrondie(0.36, 0.1, 0.05, 0.012, 0.004),
      sol: new PlaneGeometry(60, n * ESPACEMENT + 40),
    }
    const ecrans = projets.map((p) => {
      const tex: Texture = chargeur.load(p.capture)
      tex.colorSpace = SRGBColorSpace
      tex.minFilter = LinearFilter
      tex.generateMipmaps = false
      const commun = { uTime: u.uTime, uAllume: { value: 0 }, uSurvol: { value: 0 }, uBalai: { value: 0 }, uAccent: { value: new Color(p.accent) }, uCapture: { value: tex } }
      return {
        // Portable : 60 % de la largeur de la capture (16:10) ; ordinateur au repos, la capture glisse.
        ecran: new ShaderMaterial({ vertexShader: ecranVertex, fragmentShader: ecranFragment, uniforms: { ...commun, uTaille: { value: new Vector2(ECR_W, ECR_H) }, uRecadre: { value: new Vector4(0, 0, 0.62, 0.83) }, uPan: { value: new Vector2(0, 0) } } }),
        // Téléphone : le haut de la page, recadré (aperçu — pas une vraie capture mobile).
        tel: new ShaderMaterial({ vertexShader: ecranVertex, fragmentShader: ecranFragment, uniforms: { ...commun, uTaille: { value: new Vector2(TE_W, TE_H) }, uRecadre: { value: new Vector4(0.36, 0, 0.26, 1) }, uPan: { value: new Vector2(0, 0) } } }),
        tex,
      }
    })
    const sol = new ShaderMaterial({ vertexShader: `varying vec3 vWorld;void main(){vec4 wp=modelMatrix*vec4(position,1.0);vWorld=wp.xyz;gl_Position=projectionMatrix*viewMatrix*wp;}`, fragmentShader: solFragment, uniforms: { uAccent: u.uAccent, uTravel: { value: 0 }, uLongueur: { value: n * ESPACEMENT } }, transparent: true, depthWrite: false })
    return { geo, mat, ecrans, sol, clavier }
  }, [projets, u, n])

  useEffect(
    () => () => {
      Object.values(objets.geo).forEach((g) => g.dispose())
      Object.values(objets.mat).forEach((m) => m.dispose())
      objets.clavier.dispose()
      objets.sol.dispose()
      objets.ecrans.forEach((m) => {
        m.ecran.dispose()
        m.tel.dispose()
        m.tex.dispose()
      })
    },
    [objets],
  )

  // Positions de repos : le portable à droite du titre, l'allée en quinconce.
  const position = (k: number) => {
    const cote = k % 2 === 0 ? 1 : -1
    return mobile ? new Vector3(0.6, 0.9, -k * ESPACEMENT) : new Vector3(1.0 + cote * 0.4, -0.25, -k * ESPACEMENT)
  }

  const coin = new Vector3()
  const vivants = useRef(objets)
  useEffect(() => {
    vivants.current = objets
  }, [objets])

  useFrame((_, dt) => {
    const s = useScene.getState()
    const r = racine.current
    if (!r) return
    if (process.env.NODE_ENV !== 'production') (window as unknown as { __suGalerie?: Group }).__suGalerie = r
    const t = u.uTime.value as number
    // travel < 0 : l'introduction — le hall attend au fond et à droite, puis s'avance (−1 → 0).
    const intro = Math.min(1, Math.max(0, -s.travel))
    const avance = Math.max(0, s.travel) * (n - 1) * ESPACEMENT
    const ii = intro * intro * (3 - 2 * intro)
    const recul = mobile ? 6.5 : 0
    r.position.set(ii * (mobile ? 9 : 11), 0, avance - recul - ii * 5)
    const ptr = (window as unknown as { __suPointer?: { px: { x: number; y: number; active: boolean } } }).__suPointer?.px
    const nx = ptr?.active ? (ptr.x / size.width) * 2 - 1 : 0
    const ny = ptr?.active ? (ptr.y / size.height) * 2 - 1 : 0
    let plusProche = 0
    let kProche = 0
    groupes.current.forEach((g, k) => {
      if (!g) return
      const base = position(k)
      const z = base.z + avance
      const passe = Math.max(0, z)
      g.position.set(base.x + Math.sign(base.x - 1.0 || 1) * passe * 0.9, base.y - passe * 0.05, base.z)
      const proche = Math.max(0, 1 - Math.abs(z) / (ESPACEMENT * 0.9))
      if (proche > plusProche) {
        plusProche = proche
        kProche = k
      }
      const ouvert = lisse(0.12, 0.62, proche)
      const m = vivants.current.ecrans[k]!
      const cible = s.survol === k ? 1 : 0
      m.ecran.uniforms.uAllume!.value = lisse(0.2, 0.7, proche)
      m.tel.uniforms.uAllume!.value = lisse(0.3, 0.8, proche)
      m.ecran.uniforms.uSurvol!.value += (cible - (m.ecran.uniforms.uSurvol!.value as number)) * Math.min(1, dt * 8)
      // La capture défile : un va-et-vient lent d'un coin à l'autre de l'image, plus vif à l'approche.
      const ph = t * 0.11 + k * 1.7
      ;(m.ecran.uniforms.uPan!.value as Vector2).set(0.5 + 0.5 * Math.sin(ph), 0.5 + 0.5 * Math.sin(ph * 0.8 + 1))
      ;(m.tel.uniforms.uPan!.value as Vector2).set(0.5, 0.5 + 0.5 * Math.sin(ph * 0.9))
      // Le portable pivote vers le visiteur en approchant ; le pointeur l'incline.
      g.rotation.set(0.3 - ny * 0.08 * proche, (k % 2 === 0 ? -0.34 : 0.34) * (1 - lisse(0.1, 0.9, proche)) + nx * 0.2 * proche, 0)
      // Le couvercle s'ouvre (fermé à plat → ouvert à ~100°), le téléphone se dresse.
      const couv = couvercles.current[k]
      if (couv) couv.rotation.x = Math.PI / 2 - (Math.PI / 2 + 0.22) * ouvert
      const tel = telephones.current[k]
      if (tel) {
        tel.visible = ouvert > 0.02
        tel.position.y = -1.0 - (1 - ouvert) * 1.2
        tel.rotation.y = -0.32 + nx * 0.15 * proche
        tel.scale.setScalar(0.4 + 0.6 * ouvert)
      }
      g.scale.setScalar(mobile ? 0.9 : 0.82)
      g.visible = z < 8 && z > -ESPACEMENT * 1.6
    })
    // La lumière qui glisse : un balayage lent sur l'aluminium du portable le plus proche.
    const l = balai.current
    if (l) {
      const base = position(kProche)
      const balayage = Math.sin(t * 0.42)
      l.position.set(base.x + balayage * 6.2, 2.6 + Math.cos(t * 0.31) * 0.8, base.z + 3.4)
      const acc = new Color(vivants.current ? '#fff3dc' : '#ffffff')
      l.color.copy(acc)
      l.intensity = 120 * (0.45 + 0.55 * plusProche)
    }
    const bal = 0.5 + 0.5 * Math.sin(t * 0.42)
    vivants.current.ecrans.forEach((m) => {
      m.ecran.uniforms.uBalai!.value = bal
    })
    vivants.current.sol.uniforms.uTravel!.value = Math.max(0, s.travel)
  })

  const clic = (k: number) => (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    const m = ecransMesh.current[k]
    if (!m) return
    // Rectangle de l'écran à l'écran (pour l'élément partagé).
    const pts = [
      [-ECR_W / 2, -ECR_H / 2],
      [ECR_W / 2, ECR_H / 2],
    ].map(([x, y]) => {
      coin.set(x!, y!, 0.01)
      m.localToWorld(coin)
      coin.project(camera)
      return { x: (coin.x * 0.5 + 0.5) * size.width, y: (-coin.y * 0.5 + 0.5) * size.height }
    })
    const rect = { x: Math.min(pts[0]!.x, pts[1]!.x), y: Math.min(pts[0]!.y, pts[1]!.y), w: Math.abs(pts[1]!.x - pts[0]!.x), h: Math.abs(pts[1]!.y - pts[0]!.y) }
    window.dispatchEvent(new CustomEvent('su-galerie', { detail: { slug: projets[k]!.slug, rect } }))
  }

  const { geo, mat } = objets
  return (
    <group ref={racine}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[-4, 7, 6]} intensity={1.1} color="#dfe9ff" />
      <pointLight ref={balai} distance={22} decay={1.4} intensity={100} />
      <mesh geometry={geo.sol} material={objets.sol} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.6, -(n * ESPACEMENT) / 2 + 6]} renderOrder={-2} />
      {projets.map((p, k) => {
        const m = objets.ecrans[k]!
        return (
          <group
            key={p.slug}
            ref={(g) => {
              groupes.current[k] = g
            }}
          >
            {/* Le châssis : dessus alu, clavier gravé, pavé tactile. */}
            <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <mesh geometry={geo.base} material={mat.alu} position={[0, 0, 0]} />
              <mesh geometry={geo.deck} material={mat.deck} position={[0, 0.18, BASE_H / 2 + 0.004]} />
              <mesh geometry={geo.pave} material={mat.pave} position={[0, -(LD / 2 - 0.62), BASE_H / 2 + 0.006]} />
            </group>
            {/* Le couvercle : pivot à l'arête arrière du châssis. */}
            <group
              ref={(g) => {
                couvercles.current[k] = g
              }}
              position={[0, BASE_H / 2, -LD / 2 + 0.06]}
            >
              <mesh geometry={geo.charniere} material={mat.aluSombre} position={[0, 0.03, 0]} />
              <group position={[0, COUV_H / 2 + 0.05, 0]}>
                <mesh geometry={geo.couvercle} material={mat.alu} position={[0, 0, -0.065]} />
                <mesh geometry={geo.cadre} material={mat.cadre} position={[0, 0, 0.0]} />
                <mesh
                  ref={(o) => {
                    ecransMesh.current[k] = o
                  }}
                  geometry={geo.ecran}
                  material={m.ecran}
                  position={[0, 0.02, 0.01]}
                  onClick={clic(k)}
                  onPointerOver={() => useScene.getState().setSurvol(k)}
                  onPointerOut={() => useScene.getState().setSurvol(-1)}
                />
                <mesh geometry={geo.encoche} material={mat.cadre} position={[0, ECR_H / 2 + 0.1, 0.012]} />
              </group>
            </group>
            {/* Le téléphone : titane, cadre, écran, îlot. */}
            <group
              ref={(g) => {
                telephones.current[k] = g
              }}
              position={[LW / 2 + 0.95, -1.0, 1.7]}
              rotation={[0.04, -0.32, -0.05]}
            >
              <mesh geometry={geo.tel} material={mat.titane} />
              <mesh geometry={geo.telCadre} material={mat.cadre} position={[0, 0, 0.066]} />
              <mesh geometry={geo.telEcran} material={m.tel} position={[0, 0, 0.074]} onClick={clic(k)} />
              <mesh geometry={geo.ilot} material={mat.cadre} position={[0, TE_H / 2 - 0.16, 0.078]} />
            </group>
          </group>
        )
      })}
    </group>
  )
}
