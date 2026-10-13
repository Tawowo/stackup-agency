'use client'
/**
 * LA LAMPE — la lumière ambre de l'atelier : un halo (billboard) à la source,
 * un faisceau volumétrique vers la pile (quad orienté, bruité, contrôlé) et
 * une poussière lumineuse qui dérive dans le faisceau. Tout en espace monde,
 * positionné par uLampe / uStack dans les shaders : la lampe ne tourne pas
 * avec la pile, elle pivote avec la caméra.
 */
import { useEffect, useMemo } from 'react'
import { AdditiveBlending, BufferAttribute, BufferGeometry, PlaneGeometry, ShaderMaterial } from 'three'
import { stackUniforms } from '../engine'
import { seed } from '../layouts/types'
import { NOISE } from '../materials/glsl'

const haloVertex = /* glsl */ `
uniform vec3 uLampe;
uniform vec4 uStack;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec3 right = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
  vec3 up = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
  vec3 wp = uLampe + (right * position.x + up * position.y) * uStack.z * 2.6;
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
}
`
const haloFragment = /* glsl */ `
precision highp float;
uniform vec3 uAccent;
uniform float uNuit;
uniform float uLampeForce;
uniform float uHalo;
varying vec2 vUv;
void main() {
  float d = length(vUv - 0.5) * 2.0;
  float coeur = exp(-d * d * 9.0) * 0.5;
  float halo = exp(-d * d * 2.5) * 0.3;
  float a = (coeur + halo) * uLampeForce * mix(0.1, 1.0, uNuit) * (0.5 + uHalo * 2.0);
  gl_FragColor = vec4(mix(uAccent, vec3(1.0, 0.85, 0.6), coeur * 0.5) * a, a);
}
`
const faisceauVertex = /* glsl */ `
uniform vec3 uLampe;
uniform vec4 uStack;
uniform float uSolY;
varying vec2 vUv;
void main() {
  vUv = uv;
  // De la plaque ambre vers le sol, devant la pile : le faisceau s'élargit en tombant.
  vec3 cible = vec3(uStack.x + 0.3 * uStack.z, uSolY, 2.4 * uStack.z);
  vec3 axe = cible - uLampe;
  vec3 vue = normalize(cameraPosition - uLampe);
  vec3 travers = normalize(cross(normalize(axe), vue));
  float x = uv.y;
  float largeur = uStack.z * (0.6 + 2.8 * x);
  vec3 wp = uLampe + axe * x * 1.1 + travers * (uv.x - 0.5) * largeur;
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
}
`
const faisceauFragment = /* glsl */ `
precision highp float;
${NOISE}
uniform vec3 uAccent;
uniform float uNuit;
uniform float uTime;
uniform float uLampeForce;
varying vec2 vUv;
void main() {
  float x = vUv.y;
  float t = abs(vUv.x - 0.5) * 2.0;
  float profil = pow(1.0 - t, 2.2);
  float longueur = smoothstep(0.0, 0.08, x) * pow(1.0 - x, 1.4);
  // Volutes : le faisceau respire, lentement.
  float v = fbm(vec2(vUv.x * 3.0, x * 4.0 - uTime * 0.07)) * 0.6 + 0.4;
  float a = profil * longueur * v * 0.13 * uLampeForce * uNuit;
  gl_FragColor = vec4(uAccent * a, a);
}
`
const poussiereVertex = /* glsl */ `
uniform vec4 uStack;
uniform vec3 uLampe;
uniform float uSolY;
uniform float uTime;
uniform float uOrtho;
uniform float uDpr;
attribute vec3 aPos;
attribute float aSeed;
varying float vA;
void main() {
  // Un volume autour de la pile ; dérive lente, chacune à son rythme.
  vec3 p = aPos;
  p.x += sin(uTime * 0.13 + aSeed * 6.3) * 0.25;
  p.y += sin(uTime * 0.09 + aSeed * 9.1) * 0.2 + fract(uTime * 0.012 * (0.5 + aSeed)) * 0.6 - 0.3;
  p.z += cos(uTime * 0.11 + aSeed * 4.7) * 0.2;
  vec3 wp = vec3(uStack.x, uStack.y, 0.0) + p * uStack.z;
  // Sous le sol, la poussière s'éteint (jamais de rangée écrasée sur une ligne).
  float sousSol = smoothstep(uSolY - 0.3, uSolY + 0.15, wp.y);
  // Visible surtout dans le faisceau : distance à l'axe lampe → pied de pile.
  vec3 cible = vec3(uStack.x + 0.3 * uStack.z, uSolY, 2.4 * uStack.z);
  vec3 axe = normalize(cible - uLampe);
  vec3 rel = wp - uLampe;
  float along = clamp(dot(rel, axe), 0.0, 20.0);
  float ecart = length(rel - axe * along) / max(uStack.z, 0.3);
  float dansFaisceau = 1.0 - smoothstep(0.3 + along * 0.45 / max(uStack.z, 0.3), 1.0 + along * 0.6 / max(uStack.z, 0.3), ecart);
  vA = (0.05 + 0.7 * dansFaisceau) * sousSol;
  vA *= 0.6 + 0.4 * sin(uTime * (0.6 + aSeed) + aSeed * 20.0);
  vec4 mv = viewMatrix * vec4(wp, 1.0);
  gl_Position = projectionMatrix * mv;
  float persp = mix(6.5 / max(-mv.z, 0.5), 1.0, uOrtho);
  gl_PointSize = (1.0 + aSeed * 1.3) * persp * uDpr;
}
`
const poussiereFragment = /* glsl */ `
precision highp float;
uniform vec3 uAccent;
uniform float uNuit;
uniform float uLampeForce;
varying float vA;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.1, d) * vA * uLampeForce * uNuit * 0.7;
  gl_FragColor = vec4(mix(uAccent, vec3(1.0, 0.95, 0.85), 0.5) * a, a);
}
`

export default function Lampe({ poussiere = 360 }: { poussiere?: number }) {
  const u = stackUniforms()
  const dpr = typeof window === 'undefined' ? 1 : Math.min(window.devicePixelRatio, 1.5)
  const objets = useMemo(() => {
    const quad = new PlaneGeometry(1, 1)
    const halo = new ShaderMaterial({ vertexShader: haloVertex, fragmentShader: haloFragment, uniforms: u, transparent: true, depthWrite: false, depthTest: false, blending: AdditiveBlending })
    const faisceau = new ShaderMaterial({ vertexShader: faisceauVertex, fragmentShader: faisceauFragment, uniforms: u, transparent: true, depthWrite: false, blending: AdditiveBlending })
    const g = new BufferGeometry()
    const pos = new Float32Array(poussiere * 3)
    const sd = new Float32Array(poussiere)
    for (let i = 0; i < poussiere; i++) {
      pos[i * 3] = (seed(i, 31) - 0.5) * 4.2
      pos[i * 3 + 1] = (seed(i, 32) - 0.5) * 3.4 + 0.3
      pos[i * 3 + 2] = (seed(i, 33) - 0.5) * 3.0 + 0.8
      sd[i] = seed(i, 34)
    }
    g.setAttribute('position', new BufferAttribute(new Float32Array(poussiere * 3), 3))
    g.setAttribute('aPos', new BufferAttribute(pos, 3))
    g.setAttribute('aSeed', new BufferAttribute(sd, 1))
    g.boundingSphere = null
    const pous = new ShaderMaterial({ vertexShader: poussiereVertex, fragmentShader: poussiereFragment, uniforms: { ...u, uDpr: { value: dpr } }, transparent: true, depthWrite: false, blending: AdditiveBlending })
    return { quad, halo, faisceau, g, pous }
  }, [u, poussiere, dpr])
  useEffect(() => () => {
    objets.quad.dispose()
    objets.halo.dispose()
    objets.faisceau.dispose()
    objets.g.dispose()
    objets.pous.dispose()
  }, [objets])
  return (
    <>
      <mesh geometry={objets.quad} material={objets.faisceau} renderOrder={-1} frustumCulled={false} />
      <mesh geometry={objets.quad} material={objets.halo} renderOrder={2} frustumCulled={false} />
      <points geometry={objets.g} material={objets.pous} renderOrder={1} frustumCulled={false} />
    </>
  )
}
