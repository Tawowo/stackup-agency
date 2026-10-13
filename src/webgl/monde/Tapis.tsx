'use client'
/**
 * LA CHAÎNE D'ASSEMBLAGE (/tarifs) — un tapis lumineux qui arrive de la
 * gauche jusqu'au produit en construction, et un portique de mesure à
 * mi-course. Les modules choisis dans le configurateur arrivent sur le tapis
 * (entrée « tapis » du moteur), passent sous le portique — qui s'allume et
 * ajoute leur prix au Cadran — puis s'emboîtent dans le produit.
 * Positionné chaque trame d'après la pile (uStack) et le sol (uSolY).
 */
import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { BoxGeometry, Group, PlaneGeometry, ShaderMaterial } from 'three'
import { stackUniforms } from '../engine'
import { useScene } from '../store'

const vertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
const tapisFragment = /* glsl */ `
precision highp float;
uniform float uTime;
uniform float uDefile;
uniform vec3 uAccent;
uniform float uNuit;
varying vec2 vUv;
void main() {
  // Chevrons lumineux qui avancent vers le produit (x croissant), bords éclairés.
  float x = vUv.x * 14.0 - uDefile;
  float chevron = abs(fract(x - abs(vUv.y - 0.5) * 0.8) - 0.5);
  float trait = 1.0 - smoothstep(0.04, 0.09, chevron);
  float bord = 1.0 - smoothstep(0.0, 0.06, min(vUv.y, 1.0 - vUv.y));
  float fondu = smoothstep(0.0, 0.25, vUv.x) * smoothstep(1.0, 0.92, vUv.x);
  vec3 base = mix(vec3(0.9, 0.88, 0.84), vec3(0.04, 0.1, 0.18), uNuit);
  vec3 col = base + uAccent * (trait * 0.55 + bord * 0.6);
  gl_FragColor = vec4(col, (0.85 + trait * 0.15) * fondu);
}
`
const portiqueFragment = /* glsl */ `
precision highp float;
uniform vec3 uAccent;
uniform float uPassage;
uniform float uNuit;
varying vec2 vUv;
void main() {
  vec3 navy = vec3(0.051, 0.173, 0.298);
  float bord = 1.0 - smoothstep(0.0, 0.08, min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y)));
  vec3 col = navy + vec3(1.0, 0.99, 0.97) * bord * 0.5 * uNuit + uAccent * uPassage * 0.9;
  gl_FragColor = vec4(col, 1.0);
}
`
const rideauFragment = /* glsl */ `
precision highp float;
uniform vec3 uAccent;
uniform float uPassage;
uniform float uTime;
varying vec2 vUv;
void main() {
  // Le rideau de mesure : un plan de lumière vertical, plus vif au passage d'un module.
  float lignes = 0.5 + 0.5 * sin(vUv.y * 80.0 - uTime * 6.0);
  float a = (0.08 + uPassage * 0.5) * (0.6 + 0.4 * lignes) * smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
  gl_FragColor = vec4(uAccent * a, a);
}
`

export default function Tapis() {
  const u = stackUniforms()
  const groupe = useRef<Group>(null)
  const portique = useRef<Group>(null)
  const objets = useMemo(() => {
    const tapis = new ShaderMaterial({ vertexShader: vertex, fragmentShader: tapisFragment, uniforms: { uTime: u.uTime, uDefile: { value: 0 }, uAccent: u.uAccent, uNuit: u.uNuit }, transparent: true, depthWrite: false })
    const commun = { uAccent: u.uAccent, uPassage: { value: 0 }, uNuit: u.uNuit, uTime: u.uTime }
    const montant = new ShaderMaterial({ vertexShader: vertex, fragmentShader: portiqueFragment, uniforms: commun })
    const rideau = new ShaderMaterial({ vertexShader: vertex, fragmentShader: rideauFragment, uniforms: commun, transparent: true, depthWrite: false })
    return { tapis, montant, rideau, plan: new PlaneGeometry(1, 1), boite: new BoxGeometry(1, 1, 1) }
  }, [u])
  useEffect(
    () => () => {
      Object.values(objets).forEach((o) => (o as { dispose: () => void }).dispose())
    },
    [objets],
  )
  const vivants = useRef(objets)
  useEffect(() => {
    vivants.current = objets
  }, [objets])
  useFrame((_, dt) => {
    const g = groupe.current
    if (!g) return
    const s = u.uStack.value
    const echelle = Math.max(0.5, s.z)
    // Le tapis : du bord gauche de l'écran jusqu'au produit, posé juste au-dessus du sol.
    g.position.set(s.x, u.uSolY.value + 0.015, 0)
    g.scale.setScalar(echelle)
    vivants.current.tapis.uniforms.uDefile!.value = (vivants.current.tapis.uniforms.uDefile!.value as number) + dt * (0.6 + useScene.getState().vitesse * 3)
    // Le portique s'allume quand le morph traverse son abscisse (0,45 → 0,65).
    const m = u.uMorph.value
    const passage = useScene.getState().params.entree > 0.5 ? Math.max(0, 1 - Math.abs(m - 0.55) / 0.12) : 0
    vivants.current.montant.uniforms.uPassage!.value = passage
  })
  return (
    <group ref={groupe}>
      <mesh geometry={objets.plan} material={objets.tapis} rotation={[-Math.PI / 2, 0, 0]} position={[-3.6, 0, 0.2]} scale={[7.2, 1.1, 1]} renderOrder={-1} />
      <group ref={portique} position={[-2.6, 0, 0.2]}>
        <mesh geometry={objets.boite} material={objets.montant} position={[0, 0.85, -0.62]} scale={[0.06, 1.7, 0.06]} />
        <mesh geometry={objets.boite} material={objets.montant} position={[0, 0.85, 0.62]} scale={[0.06, 1.7, 0.06]} />
        <mesh geometry={objets.boite} material={objets.montant} position={[0, 1.7, 0]} scale={[0.08, 0.08, 1.3]} />
        <mesh geometry={objets.plan} material={objets.rideau} position={[0, 0.85, 0]} rotation={[0, Math.PI / 2, 0]} scale={[1.24, 1.7, 1]} />
      </group>
    </group>
  )
}
