import { allocate, horsChamp, rangee, setInstance, type LayoutData } from './types.ts'

export interface StratesOptions {
  /** 0 = lamelles refermées en une plaque épaisse, 1 = écartées. */
  ouverture: number
}

export const STRATES = ['Design', 'Contenu', 'Code', 'Données', 'Hébergement'] as const
const COLS = 9
const RANGS = 6
const ECHELLE = 0.12
const PAS_X = 0.176
const PAS_Z = 0.058

/**
 * STRATES — cinq lamelles horizontales (design, contenu, code, données,
 * hébergement), chacune 54 plaques à plat en 9 × 6. Fermées : un bloc épais.
 * Ouvertes : écartées de haut en bas. Le retard par lamelle (aDelay = k / 5)
 * les fait s'écarter UNE À UNE pendant le morph. La plaque ambre du logo
 * (index 2) est la première plaque de la lamelle « Design ».
 */
export function strates(n: number, o: StratesOptions = { ouverture: 1 }): LayoutData {
  const d = allocate(n)
  const ecart = 0.07 + (0.38 - 0.07) * Math.min(1, Math.max(0, o.ouverture))
  d.mur = -0.9
  // Les plaques 0 et 1 du logo se dissolvent, la 2 (ambre) rejoint « Design ».
  horsChamp(d, 0)
  horsChamp(d, 1)
  let i = 3
  for (let k = 0; k < STRATES.length; k++) {
    const y = ((STRATES.length - 1) / 2 - k) * ecart
    const delay = k / STRATES.length
    for (let r = 0; r < RANGS; r++) {
      const z = ((RANGS - 1) / 2 - r) * PAS_Z
      const decale = (r % 2) * (PAS_X / 2)
      if (k === 0 && r === 0) {
        // Première rangée de Design : la plaque ambre prend le premier slot.
        const x0 = -((COLS - 1) * PAS_X) / 2 + decale
        setInstance(d, 2, x0, y, z, -Math.PI / 2, 0, 0, ECHELLE, k, delay)
        i = rangee(d, i, COLS - 1, decale + PAS_X / 2, y, z, PAS_X, ECHELLE, { rx: -Math.PI / 2, g: k, delay: delay + 0.01 * r, miroir: true })
      } else {
        i = rangee(d, i, COLS, decale, y, z, PAS_X, ECHELLE, { rx: -Math.PI / 2, g: k, delay: delay + 0.01 * r, miroir: true })
      }
    }
  }
  for (; i < n; i++) horsChamp(d, i)
  return d
}
