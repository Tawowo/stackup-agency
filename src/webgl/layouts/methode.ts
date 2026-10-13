import { allocate, horsChamp, rangee, setInstance, type LayoutData } from './types.ts'

const S = 0.1
const PX = 0.158

/**
 * MÉTHODE — une page qui s'assemble en cinq étapes : 1 la structure (en-tête,
 * pied), 2 la plaque ambre de la démo, 3 le contenu (titre, colonnes), 4 la
 * mise en ligne (barre d'adresse, bouton), 5 l'entretien (petites plaques de
 * réglage autour). Les groupes au-delà de `etape` restent hors champ.
 */
export function methode(n: number, etape = 5): LayoutData {
  const d = allocate(n)
  d.mur = -0.7
  horsChamp(d, 0)
  horsChamp(d, 1)
  horsChamp(d, 2)
  let i = 3
  const g = (k: number) => k <= etape
  if (g(1)) {
    i = rangee(d, i, 9, 0, 0.95, 0, PX, S, { g: 1, delay: 0, miroir: true })
    i = rangee(d, i, 9, 0, -0.95, 0, PX, S, { g: 1, delay: 0.1, miroir: true })
    for (let k = 0; k < 10; k++) {
      setInstance(d, i++, -0.66, 0.78 - k * 0.17, 0, 0, 0, Math.PI / 2, S * 0.9, 1, 0.15 + k * 0.01)
      setInstance(d, i++, 0.66, 0.78 - k * 0.17, 0, 0, 0, Math.PI / 2, S * 0.9, 1, 0.2 + k * 0.01)
    }
  }
  if (g(2)) setInstance(d, 2, -0.25, 0.45, 0.04, 0, 0, 0, S * 2.4, 2, 0.1)
  if (g(3)) {
    i = rangee(d, i, 5, -0.2, 0.08, 0, PX, S * 1.2, { g: 3, delay: 0.1 })
    i = rangee(d, i, 4, -0.28, -0.08, 0, PX, S * 1.2, { g: 3, delay: 0.15 })
    for (let r = 0; r < 4; r++) {
      i = rangee(d, i, 3, -0.32, -0.3 - r * 0.1, 0, PX, S * 0.8, { g: 3, delay: 0.2 + r * 0.03 })
      i = rangee(d, i, 3, 0.28, -0.3 - r * 0.1, 0, PX, S * 0.8, { g: 3, delay: 0.25 + r * 0.03 })
    }
  }
  if (g(4)) {
    i = rangee(d, i, 6, 0, 1.18, 0, PX, S * 0.7, { g: 4, delay: 0.1 })
    setInstance(d, i++, 0.3, 0.45, 0.03, 0, 0, 0, S * 1.6, 4, 0.3)
  }
  if (g(5)) {
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2
      setInstance(d, i++, Math.cos(a) * 1.05, Math.sin(a) * 1.35, -0.2, 0, 0, a, S * 0.5, 5, 0.2 + k * 0.05)
    }
  }
  for (; i < n; i++) horsChamp(d, i)
  return d
}
