import { allocate, horsChamp, rangee, setInstance, type LayoutData } from './types.ts'
import { blocsDe } from './offres.ts'

const S = 0.1
const PX = 0.158
const TYPES = ['page', 'multi', 'boutique', 'logiciel'] as const

/**
 * CONFIGURATEUR — la pile prend la forme du type choisi (les mêmes blocs que
 * l'offre), et chaque fonction cochée allume un MODULE supplémentaire : un
 * bloc 2 × 2 empilé dans la marge droite, relié par deux petites plaques.
 * `type` : 0-3 ; `fonctions` : masque binaire (bit k = k-ième fonction).
 */
export function configurateur(n: number, type: number, fonctions: number, portrait = false): LayoutData {
  const d = allocate(n)
  d.mur = -0.8
  horsChamp(d, 0)
  horsChamp(d, 1)
  const nom = TYPES[Math.max(0, Math.min(3, Math.round(type)))]!
  // Toujours la variante compacte (le cadre du configurateur est haut et étroit).
  const blocs = blocsDe(nom, true)
  let i = 3
  // La forme de l'offre, décalée à gauche pour laisser la colonne des modules.
  const dx = portrait ? 0 : -0.16
  const ech = portrait ? 0.72 : 0.74
  for (const b of blocs) {
    const pas = PX * (b.s / S) * ech
    const z = b.z ?? 0
    if (b.ambre) {
      setInstance(d, 2, b.x * ech + dx, b.y * ech, z + 0.03, 0, 0, 0, b.s * ech, 0, b.delay)
      continue
    }
    const cols = Math.max(...b.rangees)
    const w = cols * pas
    const h = b.rangees.length * (b.s * ech * 0.62) + b.s * ech * 0.5
    const x0 = b.x * ech + dx - w / 2
    const y0 = b.y * ech + h / 2
    b.rangees.forEach((c, r) => {
      const y = y0 - b.s * ech * 0.5 - r * (b.s * ech * 0.62)
      i = rangee(d, i, c, x0 + (c * pas) / 2, y, z, pas, b.s * ech, { g: 0, delay: b.delay + r * 0.02, miroir: b.role === 'entete' })
    })
  }
  // Les modules : une colonne à droite (en portrait : une rangée en bas).
  let slot = 0
  for (let k = 0; k < 12; k++) {
    if (!((fonctions >> k) & 1)) continue
    const x = portrait ? -0.5 + slot * 0.25 : 0.52
    const y = portrait ? -1.02 : 0.9 - slot * 0.3
    i = rangee(d, i, 2, x, y + 0.06, 0.02, PX * 0.9, S * 0.9, { g: k + 1, delay: 0.5 + slot * 0.08 })
    i = rangee(d, i, 2, x, y - 0.06, 0.02, PX * 0.9, S * 0.9, { g: k + 1, delay: 0.52 + slot * 0.08 })
    // Deux plaques de liaison vers la forme.
    if (!portrait) {
      setInstance(d, i++, x - 0.2, y, -0.03, 0, 0, 0, S * 0.45, k + 1, 0.6 + slot * 0.08)
      setInstance(d, i++, x - 0.3, y + 0.02, -0.03, 0, 0, 0, S * 0.45, k + 1, 0.64 + slot * 0.08)
    }
    slot++
  }
  for (; i < n; i++) horsChamp(d, i)
  return d
}
