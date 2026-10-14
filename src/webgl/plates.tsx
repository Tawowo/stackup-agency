'use client'
/**
 * LES PLAQUES — un seul InstancedBufferGeometry, N instances, deux layouts
 * (A = départ, B = arrivée) dans les attributs, `uMorph` qui interpole dans le
 * vertex shader. Changer de forme = écrire B, animer uMorph. Zéro calcul CPU
 * par trame.
 */
import { useEffect, useMemo, useRef } from 'react'
import { InstancedBufferAttribute, InstancedBufferGeometry, Vector3, type Mesh } from 'three'
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
  /** Bas de la forme (y local), côté A et B : le sol se pose dessous. */
  solA: number
  solB: number
  /** Bascule la plaque la plus proche du point (repère local) : montre sa face « produit ». */
  basculer: (x: number, y: number) => boolean
  /** Position courante de la plaque ambre (instance 2), repère local, sans l'arc. */
  ambre: (out: Vector3) => Vector3
}

/** Bas d'une forme : la plus basse des plaques posées (échelle > 0), moins une demi-hauteur. */
function basDe(d: LayoutData): number {
  let min = Infinity
  for (let i = 0; i < d.scale.length; i++) {
    const sc = d.scale[i]!
    if (sc <= 0) continue
    const y = d.pos[i * 3 + 1]! - 0.36 * sc
    if (y < min) min = y
  }
  return Number.isFinite(min) ? min : -1.2
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
  g.setAttribute('aFlip', new InstancedBufferAttribute(new Float32Array(n), 1))
  for (const k of ['A', 'B']) {
    g.setAttribute(`aPos${k}`, new InstancedBufferAttribute(new Float32Array(n * 3), 3))
    g.setAttribute(`aRot${k}`, new InstancedBufferAttribute(new Float32Array(n * 3), 3))
    g.setAttribute(`aScale${k}`, new InstancedBufferAttribute(new Float32Array(n), 1))
    g.setAttribute(`aShear${k}`, new InstancedBufferAttribute(new Float32Array(n), 1))
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
  const sh = g.getAttribute(`aShear${k}`) as InstancedBufferAttribute
  ;(sh.array as Float32Array).set(d.shear)
  pos.needsUpdate = rot.needsUpdate = sc.needsUpdate = sh.needsUpdate = true
  if (k === 'B') {
    const gr = g.getAttribute('aGroup') as InstancedBufferAttribute
    ;(gr.array as Float32Array).set(d.group)
    gr.needsUpdate = true
    const dl = g.getAttribute('aDelay') as InstancedBufferAttribute
    ;(dl.array as Float32Array).set(d.delay)
    dl.needsUpdate = true
  }
}

/**
 * APPARIEMENT — une plaque absente d'un côté (échelle 0) ne traverse plus la
 * scène depuis un point d'attente lointain : elle naît ou s'efface sur place,
 * en profondeur, juste derrière la position qu'elle occupe de l'autre côté.
 * Les transitions restent des formes lisibles, jamais un amas qui se croise.
 */
function apparier(a: LayoutData, b: LayoutData) {
  const n = a.scale.length
  for (let i = 0; i < n; i++) {
    const sa = a.scale[i]!
    const sb = b.scale[i]!
    if (sa <= 0 && sb > 0) {
      a.pos[i * 3] = b.pos[i * 3]!
      a.pos[i * 3 + 1] = b.pos[i * 3 + 1]!
      a.pos[i * 3 + 2] = b.pos[i * 3 + 2]! - 0.9
      a.rot[i * 3] = b.rot[i * 3]!
      a.rot[i * 3 + 1] = b.rot[i * 3 + 1]!
      a.rot[i * 3 + 2] = b.rot[i * 3 + 2]!
    } else if (sb <= 0 && sa > 0) {
      b.pos[i * 3] = a.pos[i * 3]!
      b.pos[i * 3 + 1] = a.pos[i * 3 + 1]!
      b.pos[i * 3 + 2] = a.pos[i * 3 + 2]! - 0.9
      b.rot[i * 3] = a.rot[i * 3]!
      b.rot[i * 3 + 1] = a.rot[i * 3 + 1]!
      b.rot[i * 3 + 2] = a.rot[i * 3 + 2]!
    }
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
    ['Shear', 1],
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
    const flips = new Map<number, { v: number }>()
    const h: PlatesHandle = {
      murA: first.mur,
      murB: first.mur,
      solA: basDe(first),
      solB: basDe(first),
      setPair: (a, b, pp = {}) => {
        const da = compute(a, pp.a)
        const db = b ? compute(b, pp.b) : da
        // L'impression du hero garde sa tête d'impression (descente), le reste s'apparie.
        if (b && a !== 'empileDepart') apparier(da, db)
        write(geometry, 'A', da)
        write(geometry, 'B', db)
        h.murA = da.mur
        h.murB = db.mur
        h.solA = basDe(da)
        h.solB = basDe(db)
        currentRef.current = b ?? a
      },
      setTarget: (name) => {
        const st = useScene.getState()
        snapshot(geometry, u.uMorph.value, u.uDelay.value)
        h.murA = h.murA + (h.murB - h.murA) * u.uMorph.value
        h.solA = h.solA + (h.solB - h.solA) * u.uMorph.value
        const d = compute(name)
        // Chaîne d'assemblage : une plaque qui apparaît arrive sur le tapis, depuis la gauche,
        // à la hauteur du sol, déjà à sa taille et à plat.
        if (st.params.entree > 0.5) {
          const A = geometry.getAttribute('aPosA') as InstancedBufferAttribute
          const R = geometry.getAttribute('aRotA') as InstancedBufferAttribute
          const SA = geometry.getAttribute('aScaleA') as InstancedBufferAttribute
          const pa = A.array as Float32Array
          const ra = R.array as Float32Array
          const sa = SA.array as Float32Array
          for (let i = 0; i < geometry.instanceCount; i++) {
            if (sa[i]! > 0.01 || d.scale[i]! <= 0) continue
            pa[i * 3] = d.pos[i * 3]! - 3.2
            pa[i * 3 + 1] = (h.solB ?? -1) + 0.06
            pa[i * 3 + 2] = 0.2
            ra[i * 3] = 0
            ra[i * 3 + 1] = 0
            ra[i * 3 + 2] = 0
            sa[i] = d.scale[i]!
          }
          A.needsUpdate = R.needsUpdate = SA.needsUpdate = true
        } else {
          // Sinon, appariement en profondeur (comme setPair) : rien ne traverse la scène.
          const A = geometry.getAttribute('aPosA') as InstancedBufferAttribute
          const R = geometry.getAttribute('aRotA') as InstancedBufferAttribute
          const SA = geometry.getAttribute('aScaleA') as InstancedBufferAttribute
          const pa = A.array as Float32Array
          const ra = R.array as Float32Array
          const sa = SA.array as Float32Array
          for (let i = 0; i < geometry.instanceCount; i++) {
            const vaA = sa[i]! > 0.01
            const vaB = d.scale[i]! > 0
            if (!vaA && vaB) {
              for (let c = 0; c < 3; c++) {
                pa[i * 3 + c] = d.pos[i * 3 + c]! - (c === 2 ? 0.9 : 0)
                ra[i * 3 + c] = d.rot[i * 3 + c]!
              }
            } else if (vaA && !vaB) {
              for (let c = 0; c < 3; c++) {
                d.pos[i * 3 + c] = pa[i * 3 + c]! - (c === 2 ? 0.9 : 0)
                d.rot[i * 3 + c] = ra[i * 3 + c]!
              }
            }
          }
          A.needsUpdate = R.needsUpdate = true
        }
        write(geometry, 'B', d)
        h.murB = d.mur
        h.solB = basDe(d)
        u.uMorph.value = 0
        currentRef.current = name
        st.setMorph(0)
      },
      ambre: (out) => {
        const A = geometry.getAttribute('aPosA').array as Float32Array
        const B = geometry.getAttribute('aPosB').array as Float32Array
        const D = geometry.getAttribute('aDelay').array as Float32Array
        const dl = u.uDelay.value
        let t = Math.min(Math.max((u.uMorph.value - D[2]! * dl) / Math.max(1 - dl, 1e-3), 0), 1)
        t = t * t * (3 - 2 * t)
        return out.set(A[6]! + (B[6]! - A[6]!) * t, A[7]! + (B[7]! - A[7]!) * t, A[8]! + (B[8]! - A[8]!) * t)
      },
      basculer: (x, y) => {
        // Position courante de chaque instance (sans l'arc) : la plus proche dans un rayon d'une demi-plaque.
        const A = geometry.getAttribute('aPosA').array as Float32Array
        const B = geometry.getAttribute('aPosB').array as Float32Array
        const SA = geometry.getAttribute('aScaleA').array as Float32Array
        const SB = geometry.getAttribute('aScaleB').array as Float32Array
        const D = geometry.getAttribute('aDelay').array as Float32Array
        const m = u.uMorph.value
        const dl = u.uDelay.value
        let best = -1
        let bestD = Infinity
        for (let i = 0; i < geometry.instanceCount; i++) {
          let t = Math.min(Math.max((m - D[i]! * dl) / Math.max(1 - dl, 1e-3), 0), 1)
          t = t * t * (3 - 2 * t)
          const sc = SA[i]! + (SB[i]! - SA[i]!) * t
          if (sc <= 0.05) continue
          const px = A[i * 3]! + (B[i * 3]! - A[i * 3]!) * t
          const py = A[i * 3 + 1]! + (B[i * 3 + 1]! - A[i * 3 + 1]!) * t
          const dx = (x - px) / (0.75 * sc)
          const dy = (y - py) / (0.3 * sc)
          const dd = dx * dx + dy * dy
          if (dd < 1 && dd < bestD) {
            bestD = dd
            best = i
          }
        }
        if (best < 0) return false
        const attr = geometry.getAttribute('aFlip') as InstancedBufferAttribute
        const arr = attr.array as Float32Array
        const etat = flips.get(best) ?? { v: 0 }
        flips.set(best, etat)
        gsap.killTweensOf(etat)
        const cible = etat.v > 0.5 ? 0 : 1
        gsap.to(etat, {
          v: cible,
          duration: 0.9,
          ease: 'power3.inOut',
          onUpdate: () => {
            arr[best] = etat.v
            attr.needsUpdate = true
          },
        })
        return true
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
      h.solB = basDe(d)
      if (!st.target) {
        // Sans cible, la forme visible est A (morph 0) : on l'écrit aussi.
        write(geometry, 'A', d)
        h.murA = d.mur
        h.solA = h.solB
      }
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
