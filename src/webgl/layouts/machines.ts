import { allocate, horsChamp, rangee, setInstance, type LayoutData } from './types.ts'

export const S = 0.1
export const PX = 0.158

/** Position d'un nœud (unités monde) pour N modules : deux anneaux concentriques. */
export function noeud(k: number, n: number, portrait = false): { x: number; y: number } {
  const ext = Math.ceil(n * 0.6)
  if (k < ext) {
    const a = (k / ext) * Math.PI * 2 + Math.PI / 2
    return portrait ? { x: Math.cos(a) * 0.5, y: Math.sin(a) * 1.0 } : { x: Math.cos(a) * 0.64, y: Math.sin(a) * 0.98 }
  }
  const j = k - ext
  const m = n - ext
  const a = (j / m) * Math.PI * 2 + Math.PI / 2 + Math.PI / m
  return portrait ? { x: Math.cos(a) * 0.26, y: Math.sin(a) * 0.6 } : { x: Math.cos(a) * 0.32, y: Math.sin(a) * 0.5 }
}

/** Modules compatibles : voisins sur l'anneau + le hub ; en plus, une table explicite. */
export function aretes(n: number): [number, number][] {
  const ext = Math.ceil(n * 0.6)
  const a: [number, number][] = []
  for (let k = 0; k < ext; k++) a.push([k, (k + 1) % ext])
  for (let k = ext; k < n; k++) a.push([k, ext + ((k - ext + 1) % (n - ext))])
  for (let k = ext; k < n; k++) a.push([k, Math.round(((k - ext) / (n - ext)) * ext) % ext])
  return a
}

/**
 * MACHINES — la Salle des machines : N modules (blocs 3 × 2 de plaques, groupe
 * k + 1) reliés par des chapelets de petites plaques (groupe 0), un hub ambre
 * au centre (groupe 0). L'isolation (`uIsolate` = k + 1) assombrit et écarte
 * les autres nœuds.
 */
export function machines(n: number, modules = 12, portrait = false): LayoutData {
  const d = allocate(n)
  d.mur = -0.9
  horsChamp(d, 0)
  horsChamp(d, 1)
  setInstance(d, 2, 0, 0, 0.05, 0, 0, 0, S * 1.8, 0, 0)
  let i = 3
  const s = S * 0.8
  const pas = PX * 0.8
  for (let k = 0; k < modules; k++) {
    const { x, y } = noeud(k, modules, portrait)
    for (let r = 0; r < 2; r++) {
      i = rangee(d, i, 3, x, y + 0.045 - r * 0.09, 0, pas, s, { g: k + 1, delay: 0.1 + k * 0.05 + r * 0.02 })
    }
  }
  for (const [a, b] of aretes(modules)) {
    const A = noeud(a, modules, portrait)
    const B = noeud(b, modules, portrait)
    const L = Math.hypot(B.x - A.x, B.y - A.y)
    const nb = Math.max(1, Math.round(L / 0.1) - 1)
    const ang = Math.atan2(B.y - A.y, B.x - A.x)
    for (let t = 1; t <= nb; t++) {
      if (i >= n) break
      const f = t / (nb + 1)
      setInstance(d, i++, A.x + (B.x - A.x) * f, A.y + (B.y - A.y) * f, -0.04, 0, 0, ang, S * 0.4, 0, 0.7 + f * 0.1)
    }
  }
  for (; i < n; i++) horsChamp(d, i)
  return d
}
