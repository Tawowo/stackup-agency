import { allocate, horsChamp, seed, setInstance, type LayoutData } from './types.ts'

/**
 * NOYAU — la pile repliée en un bloc compact : ~160 plaques serrées dans une
 * sphère aplatie, orientations variées, la plaque ambre au cœur.
 */
export function noyau(n: number): LayoutData {
  const d = allocate(n)
  d.mur = -0.6
  horsChamp(d, 0)
  horsChamp(d, 1)
  setInstance(d, 2, 0, 0, 0.1, 0, 0, 0, 0.22, 0, 0)
  const total = Math.min(n - 3, 160)
  for (let k = 0; k < total; k++) {
    const i = 3 + k
    const u = seed(i, 21)
    const v = seed(i, 22)
    const w = seed(i, 23)
    const r = 0.18 + 0.42 * Math.cbrt(u)
    const th = v * Math.PI * 2
    const ph = Math.acos(2 * w - 1)
    const x = r * Math.sin(ph) * Math.cos(th)
    const y = r * Math.sin(ph) * Math.sin(th) * 0.8
    const z = r * Math.cos(ph) * 0.6
    setInstance(d, i, x, y, z, (seed(i, 24) - 0.5) * 1.2, seed(i, 25) * Math.PI * 2, (seed(i, 26) - 0.5) * 1.2, 0.14, 0, k / total)
  }
  for (let i = 3 + total; i < n; i++) horsChamp(d, i)
  return d
}
