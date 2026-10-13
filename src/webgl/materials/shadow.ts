import { LessDepth, ShaderMaterial } from 'three'
import type { StackUniforms } from '../engine'
import { INSTANCE, NOISE, ROT } from './glsl'

/**
 * OMBRE PORTÉE — la même plaque, projetée le long de la lumière de la lampe
 * sur le sol de l'atelier (plan y = uSolY). Une ombre planaire, longue vers
 * la droite et le fond, qui se dissout avec le sol pendant une traversée.
 */
const vertex = /* glsl */ `
${ROT}
${INSTANCE}
uniform vec3 uLight;
uniform float uSolY;
varying float vHauteur;
varying vec3 vSol;
void main() {
  Inst I = instance(position);
  vec4 wp = modelMatrix * vec4(I.world, 1.0);
  float t = (uSolY - wp.y) / min(uLight.y, -0.05);
  vec3 sp = wp.xyz + uLight * max(t, 0.0);
  sp.y = uSolY + 0.004;
  vHauteur = wp.y - uSolY;
  vSol = sp;
  gl_Position = projectionMatrix * viewMatrix * vec4(sp, 1.0);
}
`
const fragment = /* glsl */ `
precision highp float;
${NOISE}
uniform float uNuit;
uniform float uShadow;
uniform float uDissolve;
uniform vec4 uStack;
varying float vHauteur;
varying vec3 vSol;
void main() {
  // Sur navy : plus sombre que le sol. Sur ivoire : navy translucide.
  vec3 nuit = vec3(0.016, 0.047, 0.094);
  vec3 jour = vec3(0.051, 0.173, 0.298);
  float a = mix(0.18, 0.62, uNuit) * uShadow;
  // Plus la plaque est haute, plus l'ombre est douce et pâle.
  a *= 1.0 - smoothstep(0.5, 5.0, vHauteur) * 0.65;
  // L'ombre suit la dissolution du sol.
  vec2 g = (vSol.xz - vec2(uStack.x, 0.0)) / max(uStack.z, 0.2);
  float n = fbm(g * 0.6 + 3.1);
  a *= smoothstep(uDissolve * 1.15 - 0.06, uDissolve * 1.15, n);
  a *= smoothstep(0.5, 0.95, uStack.z);
  gl_FragColor = vec4(mix(jour, nuit, uNuit), a);
}
`

export function shadowMaterial(u: StackUniforms) {
  return new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms: u,
    transparent: true,
    depthWrite: true,
    depthFunc: LessDepth,
  })
}
