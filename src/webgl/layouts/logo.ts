import { LOGO_POSES } from '../logo-geometry.ts'
import { allocate, horsChamp, setInstance, type LayoutData } from './types.ts'

/**
 * LOGO — les trois plaques exactes, les autres dissoutes hors champ.
 */
export function logo(n: number): LayoutData {
  const d = allocate(n)
  d.mur = -0.3
  for (let i = 0; i < n; i++) {
    const p = LOGO_POSES[i]
    if (p) setInstance(d, i, p.x, p.y, p.z, 0, p.rotY, p.rotZ, 1, 0)
    else horsChamp(d, i)
  }
  return d
}
