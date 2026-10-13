import { ShaderMaterial } from 'three'
import type { StackUniforms } from '../engine'
import { HASH } from './glsl'

/**
 * LE MUR — le fond de l'atelier. Il peint la couleur de la page (encre ↔ ivoire
 * selon uNuit), le halo contrôlé de la lampe ambre derrière la pile, la
 * vignette et le grain. Grain et vignette sont ici, pas dans un EffectComposer.
 */
const vertex = /* glsl */ `
varying vec3 vWorld;
void main() {
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorld = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`
const fragment = /* glsl */ `
precision highp float;
${HASH}
uniform float uTime;
uniform float uNuit;
uniform vec3 uAccent;
uniform vec4 uStack;
uniform vec2 uResolution;
uniform float uHalo;
uniform float uWall;
uniform float uGrain;
varying vec3 vWorld;
const vec3 ENCRE = vec3(0.0235, 0.0431, 0.0784);
const vec3 IVOIRE = vec3(1.0, 0.992, 0.976);
void main() {
  vec3 col = mix(IVOIRE, ENCRE, uNuit);
  if (uWall > 0.5) {
    // Halo : la lampe ambre éclaire faiblement le mur derrière la pile, un peu
    // décalé vers la source (en haut à gauche).
    vec2 c = uStack.xy + vec2(-0.25, 0.35) * uStack.z;
    float d = distance(vWorld.xy, c) / (uStack.z * 1.6);
    float halo = exp(-d * d) * uHalo;
    col += uAccent * halo * mix(0.35, 1.0, uNuit);
    // Vignette.
    vec2 q = gl_FragCoord.xy / uResolution - 0.5;
    float vig = smoothstep(0.35, 0.95, length(q) * 1.25);
    col *= 1.0 - vig * 0.55 * uNuit;
    col = mix(col, col * 0.96, vig * (1.0 - uNuit));
    // Grain 2-3 %.
    if (uGrain > 0.5) {
      float g = hash12(gl_FragCoord.xy + vec2(0.0, fract(uTime * 0.41) * 131.0)) - 0.5;
      col += g * (0.025 + 0.01 * uNuit);
    }
  }
  gl_FragColor = vec4(col, 1.0);
}
`

export function wallMaterial(u: StackUniforms) {
  return new ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms: u, depthWrite: false })
}
