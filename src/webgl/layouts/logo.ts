import { LOGO_POSES } from '../logo-geometry.ts'
import { allocate, seed, setInstance, type LayoutData } from './types.ts'

/**
 * LOGO — les trois plaques exactes, les autres dissoutes hors champ.
 * Les instances inutilisées attendent derrière (z négatif, dispersées, échelle 0)
 * pour arriver de l'arrière-plan quand on passe à `pile`.
 */
export function logo(n: number): LayoutData {
  const d = allocate(n)
  d.mur = -0.3
  for (let i = 0; i < n; i++) {
    const p = LOGO_POSES[i]
    if (p) {
      setInstance(d, i, p.x, p.y, p.z, 0, p.rotY, p.rotZ, 1, 0)
    } else {
      const a = seed(i) * Math.PI * 2
      const r = 1.5 + seed(i, 1) * 3
      setInstance(d, i, Math.cos(a) * r, Math.sin(a) * r * 0.6 + 1.5, -4 - seed(i, 2) * 4, 0, a, 0, 0, 0)
    }
  }
  return d
}
