import { LessDepth, ShaderMaterial } from 'three'
import type { StackUniforms } from '../engine'
import { INSTANCE, ROT } from './glsl'

/**
 * OMBRE PORTÉE — la même plaque, projetée le long de la lumière (−18°) sur le
 * mur z = uWallZ. Une ombre planaire nette, longue, qui se raccourcit quand la
 * plaque respire vers le mur : c'est la vie de la scène au repos.
 */
const vertex = /* glsl */ `
${ROT}
${INSTANCE}
uniform vec3 uLight;
uniform float uWallZ;
varying float vDepth;
void main() {
  Inst I = instance(position);
  vec4 wp = modelMatrix * vec4(I.world, 1.0);
  float t = (uWallZ - wp.z) / uLight.z;
  vec3 sp = wp.xyz + uLight * t;
  sp.z = uWallZ + 0.002;
  vDepth = wp.z - uWallZ;
  gl_Position = projectionMatrix * viewMatrix * vec4(sp, 1.0);
}
`
const fragment = /* glsl */ `
precision highp float;
uniform float uNuit;
uniform float uShadow;
varying float vDepth;
void main() {
  // Sur l'encre : plus sombre que l'encre. Sur l'ivoire : navy translucide.
  vec3 nuit = vec3(0.012, 0.024, 0.047);
  vec3 jour = vec3(0.051, 0.173, 0.298);
  float a = mix(0.22, 0.85, uNuit) * uShadow;
  a *= 1.0 - smoothstep(1.5, 6.0, vDepth) * 0.5;
  gl_FragColor = vec4(mix(jour, nuit, uNuit), a);
}
`

export function shadowMaterial(u: StackUniforms) {
  const m = new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms: u,
    transparent: true,
    depthWrite: true,
    depthFunc: LessDepth,
  })
  return m
}
