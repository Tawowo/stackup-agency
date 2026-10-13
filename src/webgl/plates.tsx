'use client'
/**
 * LES PLAQUES — un seul InstancedBufferGeometry, N instances, deux layouts
 * (A = départ, B = arrivée) dans les attributs, `uMorph` qui interpole dans le
 * vertex shader. Changer de forme = écrire B, animer uMorph. Zéro calcul CPU
 * par trame.
 */
import { useEffect, useMemo, useRef } from 'react'
import { InstancedBufferAttribute, InstancedBufferGeometry, type Mesh } from 'three'
import gsap from 'gsap'
import { plaqueGeometry } from './geometry'
import { PLAQUE } from './logo-geometry'
import { stackUniforms } from './engine'
import { plateMaterial } from './materials/plate'
import { shadowMaterial } from './materials/shadow'
import { CLES_LAYOUT, LAYOUTS, type LayoutData, type LayoutName, type LayoutParams } from './layouts'
import { seed } from './layouts/types'
import { useScene } from './store'

export interface PlatesHandle {
  /** Écrit le layout cible dans B (A reçoit l'état courant) et remet uMorph à 0. */
  setTarget: (name: LayoutName) => void
  /** Pose A et B explicitement (morph piloté par une expérience). */
  setPair: (a: LayoutName, b: LayoutName | null, pp?: { a?: Partial<LayoutParams>; b?: Partial<LayoutParams> }) => void
  murA: number
  murB: number
}

export function buildInstanced(n: number) {
  const base = plaqueGeometry()
  const g = new InstancedBufferGeometry()
  g.index = base.index
  g.setAttribute('position', base.getAttribute('position'))
  g.setAttribute('normal', base.getAttribute('normal'))
  g.setAttribute('uv', base.getAttribute('uv'))
  g.instanceCount = n
  const idx = new Float32Array(n)
  const sd = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    idx[i] = i
    sd[i] = seed(i, 11)
  }
  g.setAttribute('aIndex', new InstancedBufferAttribute(idx, 1))
  g.setAttribute('aSeed', new InstancedBufferAttribute(sd, 1))
  g.setAttribute('aGroup', new InstancedBufferAttribute(new Float32Array(n), 1))
  g.setAttribute('aDelay', new InstancedBufferAttribute(new Float32Array(n), 1))
  for (const k of ['A', 'B']) {
    g.setAttribute(`aPos${k}`, new InstancedBufferAttribute(new Float32Array(n * 3), 3))
    g.setAttribute(`aRot${k}`, new InstancedBufferAttribute(new Float32Array(n * 3), 3))
    g.setAttribute(`aScale${k}`, new InstancedBufferAttribute(new Float32Array(n), 1))
  }
  g.boundingSphere = null
  return g
}

function write(g: InstancedBufferGeometry, k: 'A' | 'B', d: LayoutData) {
  const pos = g.getAttribute(`aPos${k}`) as InstancedBufferAttribute
  const rot = g.getAttribute(`aRot${k}`) as InstancedBufferAttribute
  const sc = g.getAttribute(`aScale${k}`) as InstancedBufferAttribute
  ;(pos.array as Float32Array).set(d.pos)
  ;(rot.array as Float32Array).set(d.rot)
  ;(sc.array as Float32Array).set(d.scale)
  pos.needsUpdate = rot.needsUpdate = sc.needsUpdate = true
  if (k === 'B') {
    const gr = g.getAttribute('aGroup') as InstancedBufferAttribute
    ;(gr.array as Float32Array).set(d.group)
    gr.needsUpdate = true
    const dl = g.getAttribute('aDelay') as InstancedBufferAttribute
    ;(dl.array as Float32Array).set(d.delay)
    dl.needsUpdate = true
  }
}

/** Figer l'état interpolé courant dans A (pour repartir d'un morph interrompu). */
function snapshot(g: InstancedBufferGeometry, morph: number, delay: number) {
  const n = g.instanceCount
  const seedA = g.getAttribute('aDelay').array as Float32Array
  for (const [name, size] of [
    ['Pos', 3],
    ['Rot', 3],
    ['Scale', 1],
  ] as const) {
    const a = g.getAttribute(`a${name}A`) as InstancedBufferAttribute
    const b = g.getAttribute(`a${name}B`) as InstancedBufferAttribute
    const A = a.array as Float32Array
    const B = b.array as Float32Array
    for (let i = 0; i < n; i++) {
      let t = Math.min(Math.max((morph - seedA[i]! * delay) / Math.max(1 - delay, 1e-3), 0), 1)
      t = t * t * (3 - 2 * t)
      for (let c = 0; c < size; c++) {
        const j = i * size + c
        A[j] = A[j]! + (B[j]! - A[j]!) * t
      }
    }
    a.needsUpdate = true
  }
}

export function Plates({ count, handleRef }: { count: number; handleRef: React.RefObject<PlatesHandle | null> }) {
  const u = stackUniforms()
  const geometry = useMemo(() => buildInstanced(count), [count])
  const material = useMemo(() => plateMaterial(u, PLAQUE), [u])
  const shadow = useMemo(() => shadowMaterial(u), [u])
  const meshRef = useRef<Mesh>(null)
  const currentRef = useRef<LayoutName>('logo')

  useEffect(() => {
    const s = useScene.getState()
    const compute = (name: LayoutName, override?: Partial<LayoutParams>) =>
      LAYOUTS[name](count, { ...useScene.getState().params, ...(override ?? {}) })
    const first = compute(s.layout)
    write(geometry, 'A', first)
    write(geometry, 'B', first)
    currentRef.current = s.layout
    const h: PlatesHandle = {
      murA: first.mur,
      murB: first.mur,
      setPair: (a, b, pp = {}) => {
        const da = compute(a, pp.a)
        const db = b ? compute(b, pp.b) : da
        write(geometry, 'A', da)
        write(geometry, 'B', db)
        h.murA = da.mur
        h.murB = db.mur
        currentRef.current = b ?? a
      },
      setTarget: (name) => {
        const st = useScene.getState()
        snapshot(geometry, u.uMorph.value, u.uDelay.value)
        h.murA = h.murA + (h.murB - h.murA) * u.uMorph.value
        const d = compute(name)
        write(geometry, 'B', d)
        h.murB = d.mur
        u.uMorph.value = 0
        currentRef.current = name
        st.setMorph(0)
      },
    }
    if (s.target) h.setPair(s.layout, s.target, s.pairParams)
    handleRef.current = h
    // Un changement de paramètres de pile recalcule la cible en place.
    // Un changement de paramètre de layout recalcule la cible en place.
    const unsub = useScene.subscribe((st, prev) => {
      if (st.params === prev.params || currentRef.current === 'logo') return
      if (CLES_LAYOUT.every((k) => st.params[k] === prev.params[k])) return
      const d = compute(currentRef.current, st.pairParams.b)
      write(geometry, 'B', d)
      h.murB = d.mur
    })
    return () => {
      unsub()
      handleRef.current = null
    }
  }, [geometry, count, u, handleRef])

  useEffect(() => () => geometry.dispose(), [geometry])

  return (
    <>
      <mesh ref={meshRef} geometry={geometry} material={material} frustumCulled={false} />
      <mesh geometry={geometry} material={shadow} frustumCulled={false} renderOrder={-1} />
    </>
  )
}

export { gsap }
