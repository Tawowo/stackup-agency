'use client'
/**
 * LE CODE VIVANT — de vraies lignes des composants du site (générées dans
 * code-vivant.ts), peintes une fois dans une CanvasTexture et posées sur trois
 * plans derrière la pile. Le shader fait tout le reste : une tête d'écriture
 * révèle les lignes, le texte défile avec l'étage (le scroll), se dissout par
 * bruit fractal quand la page est écrite, et reste à bas contraste. La torche
 * l'éclaire au passage.
 */
import { useEffect, useMemo } from 'react'
import { CanvasTexture, DoubleSide, LinearFilter, PlaneGeometry, RepeatWrapping, ShaderMaterial } from 'three'
import { CODE_VIVANT } from '../code-vivant'
import { stackUniforms } from '../engine'
import { NOISE, TORCHE } from '../materials/glsl'

const LARGEUR = 1024
const HAUTEUR = 2048
const LIGNE = 19
const LIGNES = Math.floor(HAUTEUR / LIGNE)
const MOTS = /\b(const|let|function|return|import|export|from|if|else|for|new|type|interface|class|void|float|vec[234]|mat3|uniform|attribute|varying)\b/g

function peindre(): HTMLCanvasElement | null {
  if (typeof document === 'undefined') return null
  const c = document.createElement('canvas')
  c.width = LARGEUR
  c.height = HAUTEUR
  const ctx = c.getContext('2d')
  if (!ctx) return null
  ctx.clearRect(0, 0, LARGEUR, HAUTEUR)
  ctx.font = '500 14px "JetBrains Mono", ui-monospace, Menlo, monospace'
  ctx.textBaseline = 'top'
  for (let i = 0; i < LIGNES; i++) {
    const l = CODE_VIVANT[i % CODE_VIVANT.length] ?? ''
    const y = i * LIGNE + 3
    // Numéro de ligne, discret.
    ctx.fillStyle = 'rgba(255,255,255,0.35)'
    ctx.fillText(String(i + 1).padStart(3, ' '), 10, y)
    let x = 52
    // Mots-clés en ambre, chaînes en bleu clair, le reste en blanc.
    const parts = l.split(MOTS)
    for (let k = 0; k < parts.length; k++) {
      const p = parts[k] ?? ''
      if (!p) continue
      const cle = k % 2 === 1
      if (cle) ctx.fillStyle = '#F6B04A'
      else if (/['"`]/.test(p)) ctx.fillStyle = '#9CC4E8'
      else ctx.fillStyle = '#FFFFFF'
      ctx.fillText(p, x, y)
      x += ctx.measureText(p).width
    }
  }
  return c
}

const vertex = /* glsl */ `
varying vec2 vUv;
varying vec3 vWorld;
void main() {
  vUv = uv;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorld = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`
const fragment = /* glsl */ `
precision highp float;
${NOISE}
${TORCHE}
uniform sampler2D uTexte;
uniform float uTime;
uniform float uNuit;
uniform float uCode;
uniform float uEtage;
uniform float uDissolve;
uniform float uDecalage;
uniform float uRatio;
uniform float uProfondeur;
uniform vec3 uAccent;
varying vec2 vUv;
varying vec3 vWorld;
const vec3 NAVY = vec3(0.051, 0.173, 0.298);
void main() {
  // Le texte garde ses proportions ; il défile avec l'étage et, lentement, avec le temps.
  vec2 st = vec2(vUv.x, vUv.y * uRatio * 0.5);
  st.y += uEtage * 0.11 + uTime * 0.004 + uDecalage;
  vec4 tex = texture2D(uTexte, st);
  // Tête d'écriture : les lignes au-dessus de la tête sont écrites, la ligne
  // courante s'écrit caractère par caractère, le reste attend.
  float tete = fract(uTime * 0.018 + uDecalage * 3.7 + 0.55);
  float ligne = fract(st.y);
  float ecrit = step(ligne, tete);
  float rang = floor(ligne * 107.0);
  float rangTete = floor(tete * 107.0);
  float courante = step(abs(rang - rangTete), 0.5) * step(vUv.x, fract(tete * 107.0));
  ecrit = max(ecrit, courante);
  // Quand la page est pleine, elle se dissout par bruit fractal et repart.
  float dis = smoothstep(0.86, 1.0, tete);
  float n = fbm(vUv * 6.0 + uDecalage * 10.0);
  float garde = smoothstep(dis * 1.1 - 0.08, dis * 1.1, n);
  float front = (1.0 - smoothstep(0.0, 0.03, abs(n - dis * 1.1))) * step(0.01, dis) * step(dis, 0.97);
  // Bords du plan fondus, profondeur : plus loin, plus pâle.
  float bord = smoothstep(0.0, 0.08, vUv.x) * smoothstep(1.0, 0.92, vUv.x) * smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
  float lens = probeLens(vWorld);
  float a = tex.a * ecrit * garde * bord * uProfondeur;
  a *= uCode * (1.0 + lens * 1.8) * (1.0 - uDissolve * 0.6);
  vec3 nuit = tex.rgb;
  vec3 col = mix(NAVY, nuit, uNuit);
  col += uAccent * front * 0.9;
  a = mix(a * 0.55, a, uNuit) + front * bord * 0.25 * uCode * 4.0;
  gl_FragColor = vec4(col, a);
}
`

const PLANS = [
  { pos: [-1.95, 0.35, -2.4], ry: 0.38, w: 3.2, h: 4.2, decalage: 0.17, profondeur: 1 },
  { pos: [2.25, -0.25, -3.2], ry: -0.42, w: 3.4, h: 4.6, decalage: 0.61, profondeur: 0.85 },
  { pos: [0.3, 1.1, -4.9], ry: 0.06, w: 5.2, h: 5.4, decalage: 0.33, profondeur: 0.55 },
] as const

export default function CodeVivant() {
  const u = stackUniforms()
  const { geo, mats } = useMemo(() => {
    const canvas = peindre()
    const tex = canvas ? new CanvasTexture(canvas) : null
    if (tex) {
      tex.wrapS = tex.wrapT = RepeatWrapping
      tex.minFilter = LinearFilter
      tex.magFilter = LinearFilter
      tex.generateMipmaps = false
    }
    const g = new PlaneGeometry(1, 1)
    const ms = PLANS.map(
      (p) =>
        new ShaderMaterial({
          vertexShader: vertex,
          fragmentShader: fragment,
          uniforms: { ...u, uTexte: { value: tex }, uDecalage: { value: p.decalage }, uRatio: { value: p.h / p.w }, uProfondeur: { value: p.profondeur } },
          transparent: true,
          depthWrite: false,
          side: DoubleSide,
        }),
    )
    return { geo: g, mats: ms }
  }, [u])
  useEffect(() => () => {
    geo.dispose()
    mats.forEach((m) => m.dispose())
  }, [geo, mats])
  return (
    <>
      {PLANS.map((p, i) => (
        <mesh key={i} geometry={geo} material={mats[i]} position={[p.pos[0], p.pos[1], p.pos[2]]} rotation={[0, p.ry, 0]} scale={[p.w, p.h, 1]} renderOrder={-1} frustumCulled={false} />
      ))}
    </>
  )
}
