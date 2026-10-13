import { allocate, horsChamp, setInstance, type LayoutData } from './types.ts'

const S = 0.1

/**
 * CADRAN — une jauge en arc (de −150° à −30°, 72 plaques tangentes), des
 * graduations, et une aiguille (chapelet de plaques, l'ambre à la pointe) dont
 * l'angle suit `aiguille` (0 → 1).
 */
export function cadran(n: number, aiguille = 0): LayoutData {
  const d = allocate(n)
  d.mur = -0.6
  horsChamp(d, 0)
  horsChamp(d, 1)
  const R = 1.0
  const cy = -0.3
  const a0 = (-150 * Math.PI) / 180
  const a1 = (-30 * Math.PI) / 180
  let i = 3
  const arc = 48
  for (let k = 0; k < arc; k++) {
    const a = a0 + ((a1 - a0) * k) / (arc - 1)
    setInstance(d, i++, Math.cos(a) * R, cy + Math.sin(a) * R, 0, 0, 0, a + Math.PI / 2, S * 1.15, 0, k / arc)
  }
  for (let k = 0; k <= 4; k++) {
    const a = a0 + ((a1 - a0) * k) / 4
    setInstance(d, i++, Math.cos(a) * (R + 0.14), cy + Math.sin(a) * (R + 0.14), 0, 0, 0, a, S * 0.7, 0, 0.4 + k * 0.03)
  }
  const ang = a0 + (a1 - a0) * Math.min(1, Math.max(0, aiguille))
  const nb = 7
  for (let k = 1; k <= nb; k++) {
    const r = (R - 0.18) * (k / nb)
    setInstance(d, i++, Math.cos(ang) * r, cy + Math.sin(ang) * r, 0.03, 0, 0, ang, S * 0.85, 1, 0.5 + k * 0.02)
  }
  setInstance(d, 2, Math.cos(ang) * (R - 0.12), cy + Math.sin(ang) * (R - 0.12), 0.05, 0, 0, ang, S * 1.1, 1, 0.65)
  setInstance(d, i++, 0, cy, 0.04, 0, 0, 0, S * 1.6, 1, 0.3)
  for (; i < n; i++) horsChamp(d, i)
  return d
}
