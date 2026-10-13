'use client'
/**
 * LA GALERIE (/realisations) — un hall d'exposition : chaque projet est un
 * écran (moniteur + téléphone) suspendu dans l'espace, le long d'un couloir
 * qui s'enfonce dans la profondeur. Le scroll fait avancer un travelling
 * (`travel`, 0 → 1, scrub pur) ; l'écran qu'on approche s'allume et sa
 * capture s'anime à l'intérieur (lent travelling dans l'image) ; le pointeur
 * l'incline ; un clic émet `su-galerie` avec le rectangle de l'écran à
 * l'écran, pour la transition vers la fiche (élément partagé).
 */
import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { BoxGeometry, Color, Group, LinearFilter, PlaneGeometry, ShaderMaterial, SRGBColorSpace, Texture, TextureLoader, Vector3, Vector4 } from 'three'
import { stackUniforms } from '../engine'
import { useScene } from '../store'
import { NOISE } from '../materials/glsl'

export interface ProjetGalerie {
  slug: string
  nom: string
  accent: string
  capture: string
}

const ESPACEMENT = 10
const LARGEUR = 6.6
const RATIO = 558 / 1200

const ecranVertex = /* glsl */ `
varying vec2 vUv;
varying vec3 vWorld;
void main() {
  vUv = uv;
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
uniform vec3 uAccent;
uniform vec4 uRecadre;
varying vec2 vUv;
void main() {
  // Lent travelling dans la capture (zoom + dérive), plus marqué quand l'écran est allumé.
  float z = 1.04 + 0.05 * (0.5 + 0.5 * sin(uTime * 0.21)) * uAllume;
  vec2 uv = (vUv - 0.5) / z + 0.5;
  uv.x += sin(uTime * 0.13) * 0.012 * uAllume;
  uv = uRecadre.xy + uv * uRecadre.zw;
  vec3 c = texture2D(uCapture, uv).rgb;
  // Éteint : l'écran est une plaque sombre où l'image affleure ; allumé : pleine lumière.
  vec3 eteint = mix(vec3(0.03, 0.07, 0.12), c * 0.25, 0.6);
  vec3 col = mix(eteint, c, uAllume);
  // Ligne de balayage lumineuse à l'allumage, reflet en diagonale.
  float reflet = smoothstep(0.0, 0.02, vUv.x + vUv.y * 0.6 - 0.9) * smoothstep(0.22, 0.0, vUv.x + vUv.y * 0.6 - 0.9);
  col += vec3(1.0) * reflet * 0.06 * uAllume;
  // Survol : liseré ambre.
  float bord = 1.0 - smoothstep(0.0, 0.012, min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y)));
  col = mix(col, uAccent, bord * uSurvol);
  gl_FragColor = vec4(col, 1.0);
}
`
const corpsFragment = /* glsl */ `
precision highp float;
uniform float uAllume;
uniform vec3 uAccent;
varying vec2 vUv;
void main() {
  vec3 navy = vec3(0.051, 0.173, 0.298);
  float bord = 1.0 - smoothstep(0.0, 0.03, min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y)));
  vec3 col = navy * (0.55 + 0.35 * uAllume) + vec3(1.0, 0.99, 0.97) * bord * (0.25 + 0.55 * uAllume);
  col += uAccent * 0.08 * uAllume;
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
  // L'allée centrale, en ambre très léger.
  col += uAccent * (1.0 - smoothstep(0.0, 0.08, abs(p.x - 1.0) - 0.6)) * 0.05;
  float fond = smoothstep(-uLongueur - 20.0, -6.0, vWorld.z) * (1.0 - smoothstep(4.0, 9.0, vWorld.z));
  float cotes = 1.0 - smoothstep(10.0, 22.0, abs(p.x));
  gl_FragColor = vec4(col, fond * cotes * 0.9);
}
`

export default function Galerie({ projets }: { projets: ProjetGalerie[] }) {
  const u = stackUniforms()
  const camera = useThree((s) => s.camera)
  const size = useThree((s) => s.size)
  const racine = useRef<Group>(null)
  const ecrans = useRef<(Group | null)[]>([])
  const mobile = size.width < 768
  const n = projets.length

  const objets = useMemo(() => {
    const chargeur = new TextureLoader()
    const geoEcran = new PlaneGeometry(LARGEUR, LARGEUR * RATIO)
    const geoCorps = new BoxGeometry(LARGEUR + 0.22, LARGEUR * RATIO + 0.22, 0.12)
    const geoPied = new BoxGeometry(0.16, 1.6, 0.16)
    const geoTel = new PlaneGeometry(1.2, 2.45)
    const geoTelCorps = new BoxGeometry(1.32, 2.6, 0.1)
    const materiaux = projets.map((p) => {
      const tex: Texture = chargeur.load(p.capture)
      tex.colorSpace = SRGBColorSpace
      tex.minFilter = LinearFilter
      tex.generateMipmaps = false
      const accent = new Color(p.accent)
      const commun = { uTime: u.uTime, uAllume: { value: 0 }, uSurvol: { value: 0 }, uAccent: { value: accent } }
      return {
        ecran: new ShaderMaterial({ vertexShader: ecranVertex, fragmentShader: ecranFragment, uniforms: { ...commun, uCapture: { value: tex }, uRecadre: { value: new Vector4(0, 0, 1, 1) } } }),
        // Le téléphone montre le haut de la page, recadré au centre (aperçu, pas une capture mobile).
        tel: new ShaderMaterial({ vertexShader: ecranVertex, fragmentShader: ecranFragment, uniforms: { ...commun, uCapture: { value: tex }, uRecadre: { value: new Vector4(0.38, 0, 0.24, 1) } } }),
        corps: new ShaderMaterial({ vertexShader: ecranVertex, fragmentShader: corpsFragment, uniforms: commun }),
        tex,
      }
    })
    const sol = new ShaderMaterial({
      vertexShader: ecranVertex,
      fragmentShader: solFragment,
      uniforms: { uAccent: u.uAccent, uTravel: { value: 0 }, uLongueur: { value: n * ESPACEMENT } },
      transparent: true,
      depthWrite: false,
    })
    const geoSol = new PlaneGeometry(60, n * ESPACEMENT + 40)
    return { geoEcran, geoCorps, geoPied, geoTel, geoTelCorps, materiaux, sol, geoSol }
  }, [projets, u, n])

  useEffect(
    () => () => {
      objets.geoEcran.dispose()
      objets.geoCorps.dispose()
      objets.geoPied.dispose()
      objets.geoTel.dispose()
      objets.geoTelCorps.dispose()
      objets.geoSol.dispose()
      objets.sol.dispose()
      objets.materiaux.forEach((m) => {
        m.ecran.dispose()
        m.tel.dispose()
        m.corps.dispose()
        m.tex.dispose()
      })
    },
    [objets],
  )

  // Positions de repos (avant travelling) : en quinconce le long de l'allée.
  const position = (k: number) => {
    const cote = k % 2 === 0 ? 1 : -1
    return mobile ? new Vector3(0, 1.2, -k * ESPACEMENT) : new Vector3(1.8 + cote * 0.9, 0.3, -k * ESPACEMENT)
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
    const avance = s.travel * (n - 1) * ESPACEMENT
    r.position.set(0, 0, avance)
    const ptr = (window as unknown as { __suPointer?: { px: { x: number; y: number; active: boolean } } }).__suPointer?.px
    const nx = ptr?.active ? (ptr.x / size.width) * 2 - 1 : 0
    const ny = ptr?.active ? (ptr.y / size.height) * 2 - 1 : 0
    ecrans.current.forEach((g, k) => {
      if (!g) return
      const base = position(k)
      const z = base.z + avance
      // Un écran dépassé s'écarte de l'allée et s'éteint (on passe à côté de lui).
      const passe = Math.max(0, z)
      g.position.set(base.x + Math.sign(base.x - 1.8 || 1) * passe * 0.9, base.y - passe * 0.05, base.z)
      const proche = Math.max(0, 1 - Math.abs(z) / (ESPACEMENT * 0.9))
      const allume = Math.min(1, proche * 1.4)
      const m = vivants.current.materiaux[k]!
      const cible = s.survol === k ? 1 : 0
      m.ecran.uniforms.uAllume!.value = allume
      m.ecran.uniforms.uSurvol!.value += (cible - (m.ecran.uniforms.uSurvol!.value as number)) * Math.min(1, dt * 8)
      // L'écran qu'on approche se tourne vers le visiteur, et le pointeur l'incline.
      const face = proche
      g.rotation.set(-ny * 0.12 * face, (k % 2 === 0 ? -0.32 : 0.32) * (1 - face) + nx * 0.22 * face, 0)
      g.visible = z < 7
    })
    vivants.current.sol.uniforms.uTravel!.value = s.travel
  })

  const clic = (k: number) => (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    const g = ecrans.current[k]
    if (!g) return
    // Rectangle de l'écran à l'écran (pour l'élément partagé).
    const pts = [
      [-LARGEUR / 2, -LARGEUR * RATIO / 2],
      [LARGEUR / 2, LARGEUR * RATIO / 2],
    ].map(([x, y]) => {
      coin.set(x!, y!, 0.07)
      g.localToWorld(coin)
      coin.project(camera)
      return { x: (coin.x * 0.5 + 0.5) * size.width, y: (-coin.y * 0.5 + 0.5) * size.height }
    })
    const rect = { x: Math.min(pts[0]!.x, pts[1]!.x), y: Math.min(pts[0]!.y, pts[1]!.y), w: Math.abs(pts[1]!.x - pts[0]!.x), h: Math.abs(pts[1]!.y - pts[0]!.y) }
    window.dispatchEvent(new CustomEvent('su-galerie', { detail: { slug: projets[k]!.slug, rect } }))
  }

  return (
    <group ref={racine}>
      <mesh geometry={objets.geoSol} material={objets.sol} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.6, -(n * ESPACEMENT) / 2 + 6]} renderOrder={-2} />
      {projets.map((p, k) => {
        const m = objets.materiaux[k]!
        return (
          <group
            key={p.slug}
            ref={(g) => {
              ecrans.current[k] = g
            }}
          >
            <mesh geometry={objets.geoCorps} material={m.corps} position={[0, 0, -0.07]} />
            <mesh
              geometry={objets.geoEcran}
              material={m.ecran}
              onClick={clic(k)}
              onPointerOver={() => useScene.getState().setSurvol(k)}
              onPointerOut={() => useScene.getState().setSurvol(-1)}
            />
            <mesh geometry={objets.geoPied} material={m.corps} position={[0, -LARGEUR * RATIO / 2 - 0.8, -0.1]} />
            <group position={[LARGEUR / 2 + 0.2, -0.9, 0.9]} rotation={[0, -0.25, 0]}>
              <mesh geometry={objets.geoTelCorps} material={m.corps} position={[0, 0, -0.06]} />
              <mesh geometry={objets.geoTel} material={m.tel} onClick={clic(k)} />
            </group>
          </group>
        )
      })}
    </group>
  )
}

