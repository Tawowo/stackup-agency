import { allocate, horsChamp, rangee, setInstance, type LayoutData } from './types.ts'

const S = 0.1
const PX = 0.158

/**
 * FORMULAIRE — la pile se construit plaque par plaque à mesure que le
 * visiteur remplit les champs (`champs` : 0 → 9). Chaque champ rempli pose une
 * rangée ; le dernier (le consentement) pose la plaque ambre : c'est prêt.
 */
export function formulaire(n: number, champs: number): LayoutData {
  const d = allocate(n)
  d.mur = -0.6
  horsChamp(d, 0)
  horsChamp(d, 1)
  const c = Math.max(0, Math.min(9, Math.round(champs)))
  let i = 3
  // Le socle : toujours là.
  i = rangee(d, i, 8, 0, -1.0, 0, PX, S, { g: 0, delay: 0, miroir: true })
  for (let k = 0; k < c; k++) {
    const y = -0.78 + k * 0.2
    const largeur = [5, 5, 4, 4, 3, 7, 5, 4, 2][k]!
    i = rangee(d, i, largeur, -0.1 + (k % 2) * 0.1, y, 0, PX, S, { g: k + 1, delay: 0.1 + k * 0.02 })
  }
  if (c >= 9) setInstance(d, 2, 0.45, 0.85, 0.04, 0, 0, 0, S * 2, 10, 0.4)
  else horsChamp(d, 2)
  for (; i < n; i++) horsChamp(d, i)
  return d
}
