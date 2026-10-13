import { ShaderMaterial } from 'three'
import type { StackUniforms } from '../engine'
import { HASH } from './glsl'

/**
 * LE CIEL — le fond de la Fabrique : dégradé navy profond (bas) → navy (haut),
 * jamais de noir ; le halo ambre de la lampe au-dessus de la pile ; vignette
 * douce ; grain fin. Sur ivoire (uNuit → 0) : papier chaud, halo discret.
 * Dessiné plein écran, en espace de clip : il ne dépend pas de la caméra.
 */
const vertex = /* glsl */ `
void main() { gl_Position = vec4(position.xy, 0.9999, 1.0); }
`
const fragment = /* glsl */ `
precision highp float;
${HASH}
uniform float uTime;
uniform float uNuit;
uniform vec3 uAccent;
uniform vec3 uStackEcran;
uniform vec2 uResolution;
uniform float uHalo;
uniform float uWall;
uniform float uGrain;
uniform float uEtage;
uniform float uLampeForce;
const vec3 NAVY_PROFOND = vec3(0.043, 0.118, 0.212); /* #0B1E36 */
const vec3 NAVY = vec3(0.063, 0.165, 0.290);         /* #102A4A */
const vec3 NAVY_HAUT = vec3(0.086, 0.227, 0.384);    /* #163A62 */
const vec3 IVOIRE = vec3(1.0, 0.992, 0.976);
const vec3 IVOIRE_CREUSE = vec3(0.953, 0.937, 0.902);
void main() {
  vec2 q = gl_FragCoord.xy / uResolution;
  // La descente : l'horizon du dégradé glisse légèrement avec l'étage.
  float h = q.y + sin(uEtage * 0.9) * 0.06;
  vec3 nuit = mix(NAVY_PROFOND, NAVY, smoothstep(0.0, 0.8, h));
  nuit = mix(nuit, NAVY_HAUT, smoothstep(0.75, 1.0, h) * 0.45);
  vec3 jour = mix(IVOIRE, IVOIRE_CREUSE, smoothstep(0.2, 1.0, h) * 0.4);
  vec3 col = mix(jour, nuit, uNuit);
  // Allumage : à mi-chemin, la lumière est chaude (ambre), pas grise.
  col += uAccent * sin(3.14159265 * clamp(uNuit, 0.0, 1.0)) * 0.10;
  if (uWall > 0.5) {
    float sc = max(uStackEcran.z, 40.0);
    // Halo de la lampe : au-dessus et à gauche de la pile, large, ambré.
    vec2 c = uStackEcran.xy + vec2(-1.4, 1.9) * sc;
    float d = distance(gl_FragCoord.xy, c) / (sc * 2.6);
    float halo = exp(-d * d) * uHalo * uLampeForce;
    col += uAccent * halo * mix(0.3, 1.1, uNuit);
    // Halo ambre localisé derrière la pile : il détache le navy du logo du fond navy.
    float d2 = distance(gl_FragCoord.xy, uStackEcran.xy) / (sc * 1.15);
    col += uAccent * exp(-d2 * d2) * uHalo * 1.1 * uNuit;
    // Vignette douce (jamais noire).
    vec2 v = q - 0.5;
    float vig = smoothstep(0.4, 1.0, length(v) * 1.3);
    col = mix(col, NAVY_PROFOND, vig * 0.4 * uNuit);
    if (uGrain > 0.5) {
      float g = hash12(gl_FragCoord.xy + vec2(0.0, fract(uTime * 0.41) * 131.0)) - 0.5;
      col += g * (0.02 + 0.01 * uNuit);
    }
  }
  gl_FragColor = vec4(col, 1.0);
}
`
export function cielMaterial(u: StackUniforms) {
  return new ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms: u, depthWrite: false, depthTest: false })
}
