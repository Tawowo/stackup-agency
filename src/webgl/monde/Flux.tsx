'use client'
/**
 * LES FLUX — des données qui circulent le long de la pile et entre les
 * modules : des points GPU qui suivent des chemins échantillonnés dans une
 * DataTexture (128 pas × P chemins). Aucun calcul CPU par trame : le vertex
 * shader lit le chemin, avance avec uFlowTime (accéléré par le scroll),
 * contourne le pointeur et s'allume sous la torche.
 * Repère : celui du groupe de la pile (les flux tournent avec elle).
 */
import { useEffect, useMemo } from 'react'
import { BufferAttribute, BufferGeometry, CatmullRomCurve3, DataTexture, FloatType, LinearFilter, RGBAFormat, RepeatWrapping, ShaderMaterial, Vector3 } from 'three'
import { stackUniforms } from '../engine'
import { seed } from '../layouts/types'
import { HASH, TORCHE } from '../materials/glsl'

const PAS = 128

function chemins(): Vector3[][] {
  const v = (x: number, y: number, z: number) => new Vector3(x, y, z)
  const out: Vector3[][] = []
  // Trois hélices autour de l'axe (y de −1 à 1, remappé sur uBox dans le shader).
  for (let k = 0; k < 3; k++) {
    const pts: Vector3[] = []
    const r = 0.82 + k * 0.2
    const tours = 1.6 + k * 0.4
    for (let i = 0; i <= 24; i++) {
      const t = i / 24
      const a = t * Math.PI * 2 * tours + (k * Math.PI * 2) / 3
      pts.push(v(Math.cos(a) * r, -1 + 2 * t, Math.sin(a) * r * 0.7))
    }
    out.push(pts)
  }
  // Trois montées (câbles) à gauche, derrière, à droite.
  for (const [x, z] of [
    [-1.3, -0.4],
    [0.15, -1.0],
    [1.25, -0.25],
  ] as const) {
    const pts: Vector3[] = []
    for (let i = 0; i <= 8; i++) {
      const t = i / 8
      pts.push(v(x + Math.sin(t * 6.3) * 0.12, -1 + 2 * t, z + Math.cos(t * 4.1) * 0.1))
    }
    out.push(pts)
  }
  // Quatre arcs entre modules (d'un côté à l'autre, par-dessus ou par-dessous).
  out.push([v(-1.2, -0.9, 0.4), v(-0.7, 0.2, 0.7), v(0.3, 0.9, 0.5), v(1.15, 0.4, -0.2)])
  out.push([v(1.2, -0.7, 0.3), v(0.6, -0.1, 0.8), v(-0.4, 0.5, 0.6), v(-1.2, 0.8, 0.0)])
  out.push([v(-1.0, 0.9, -0.5), v(-0.2, 0.3, -0.9), v(0.8, -0.4, -0.7), v(1.2, -0.9, -0.2)])
  out.push([v(0.9, 1.0, 0.2), v(0.25, 0.4, -0.3), v(-0.6, -0.3, -0.7), v(-1.15, -1.0, -0.3)])
  return out
}

function texture(paths: Vector3[][]) {
  const P = paths.length
  const data = new Float32Array(PAS * P * 4)
  paths.forEach((pts, j) => {
    const ferme = j < 3
    const c = new CatmullRomCurve3(pts, ferme && false, 'centripetal')
    for (let i = 0; i < PAS; i++) {
      const p = c.getPoint(i / (PAS - 1))
      const o = (j * PAS + i) * 4
      data[o] = p.x
      data[o + 1] = p.y
      data[o + 2] = p.z
      data[o + 3] = 1
    }
  })
  const t = new DataTexture(data, PAS, P, RGBAFormat, FloatType)
  t.minFilter = t.magFilter = LinearFilter
  t.wrapS = RepeatWrapping
  t.needsUpdate = true
  return t
}

const vertex = /* glsl */ `
${TORCHE}
uniform sampler2D uChemins;
uniform float uNbChemins;
uniform float uFlowTime;
uniform vec2 uBox;
uniform vec3 uPointer;
uniform float uPointerActive;
uniform float uOrtho;
uniform float uDpr;
attribute float aPath;
attribute float aOffset;
attribute float aSpeed;
attribute vec3 aJitter;
attribute float aSeed;
varying float vA;
varying float vSeed;
varying float vLens;
void main() {
  float t = fract(aOffset + uFlowTime * aSpeed * 0.06);
  vec3 p = texture2D(uChemins, vec2(t, (aPath + 0.5) / uNbChemins)).xyz;
  // La hauteur suit la boîte de la forme courante (logo court, pile haute).
  p.y = mix(uBox.x, uBox.y, (p.y + 1.0) * 0.5);
  p += aJitter;
  // Le pointeur dévie les flux : ils le contournent comme un obstacle.
  vec2 d = p.xy - uPointer.xy;
  float dl = length(d);
  float pousse = uPointerActive * smoothstep(1.0, 0.0, dl) * 0.7;
  p.xy += (dl > 1e-3 ? d / dl : vec2(0.0, 1.0)) * pousse;
  vec4 wp = modelMatrix * vec4(p, 1.0);
  vec4 mv = viewMatrix * wp;
  gl_Position = projectionMatrix * mv;
  // Comètes : une tête vive, une traîne douce, cohérentes le long du chemin
  // (la phase dépend de la position sur le chemin, pas du point).
  float tete = fract(t * 3.0 - uFlowTime * 0.12 + aPath * 0.37);
  vA = 0.12 + 0.88 * pow(1.0 - tete, 3.0);
  vLens = probeLens(wp.xyz);
  vSeed = aSeed;
  float persp = mix(6.5 / max(-mv.z, 0.5), 1.0, uOrtho);
  gl_PointSize = (1.8 + aSeed * 1.8 + vLens * 2.0 + (1.0 - tete) * 1.2) * persp * uDpr;
}
`
const fragment = /* glsl */ `
precision highp float;
${HASH}
uniform float uNuit;
uniform vec3 uAccent;
uniform float uFlux;
uniform float uDissolve;
varying float vA;
varying float vSeed;
varying float vLens;
const vec3 CLAIR = vec3(0.86, 0.91, 0.98);
const vec3 NAVY = vec3(0.051, 0.173, 0.298);
void main() {
  float d = length(gl_PointCoord - 0.5);
  float disc = smoothstep(0.5, 0.15, d);
  vec3 nuit = mix(uAccent, CLAIR, step(0.72, vSeed) * 0.8);
  vec3 col = mix(NAVY, nuit, uNuit);
  float a = disc * vA * uFlux * (1.0 + vLens * 1.6) * (1.0 - uDissolve * 0.5);
  a *= mix(0.5, 1.0, uNuit);
  gl_FragColor = vec4(col, a);
}
`

export default function Flux({ count = 900 }: { count?: number }) {
  const u = stackUniforms()
  const { geo, mat } = useMemo(() => {
    const paths = chemins()
    const tex = texture(paths)
    const P = paths.length
    const path = new Float32Array(count)
    const off = new Float32Array(count)
    const spd = new Float32Array(count)
    const jit = new Float32Array(count * 3)
    const sd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      path[i] = i % P
      off[i] = seed(i, 21)
      spd[i] = 0.7 + seed(i, 22) * 0.8
      jit[i * 3] = (seed(i, 23) - 0.5) * 0.07
      jit[i * 3 + 1] = (seed(i, 24) - 0.5) * 0.07
      jit[i * 3 + 2] = (seed(i, 25) - 0.5) * 0.07
      sd[i] = seed(i, 26)
    }
    const g = new BufferGeometry()
    g.setAttribute('position', new BufferAttribute(new Float32Array(count * 3), 3))
    g.setAttribute('aPath', new BufferAttribute(path, 1))
    g.setAttribute('aOffset', new BufferAttribute(off, 1))
    g.setAttribute('aSpeed', new BufferAttribute(spd, 1))
    g.setAttribute('aJitter', new BufferAttribute(jit, 3))
    g.setAttribute('aSeed', new BufferAttribute(sd, 1))
    g.boundingSphere = null
    const m = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: { ...u, uChemins: { value: tex }, uNbChemins: { value: P }, uDpr: { value: typeof window === 'undefined' ? 1 : Math.min(window.devicePixelRatio, 1.5) } },
      transparent: true,
      depthWrite: false,
    })
    return { geo: g, mat: m, tex }
  }, [count, u])
  useEffect(() => () => {
    geo.dispose()
    mat.dispose()
  }, [geo, mat])
  return <points geometry={geo} material={mat} frustumCulled={false} renderOrder={1} />
}
