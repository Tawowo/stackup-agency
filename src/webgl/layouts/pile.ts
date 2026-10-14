import { LOGO_POSES } from '../logo-geometry.ts'
import { allocate, horsChamp, seed, setInstance, type LayoutData } from './types.ts'

export interface PileOptions {
  /** Plaques par niveau (1 = colonne simple, 3-4 = colimaçon). */
  parNiveau: number
  /** Écart vertical entre deux niveaux, en unités monde. */
  ecart: number
  /** Torsion par niveau, en radians. */
  torsion: number
  /** Rayon du colimaçon (0 = axe). */
  rayon: number
  /** Part des plaques encore « en vol » au sommet (tour en construction). */
  chantier: number
  /** Échelle des plaques de la tour par rapport à celles du logo. */
  echelle: number
  /** Hauteur de la tour, en unités monde (elle dépasse le cadre). */
  hauteur: number
}

export const PILE_DEFAUT: PileOptions = {
  parNiveau: 3,
  ecart: 0.14,
  torsion: 0.12,
  rayon: 0.42,
  chantier: 0.12,
  echelle: 0.5,
  hauteur: 3.4,
}

/**
 * PILE — les trois plaques du logo restent devant, et une tour torsadée se
 * construit derrière elles, du bas du logo vers le haut, au-delà du cadre.
 * Les plaques sont tangentes au colimaçon (elles regardent vers l'extérieur).
 * Les instances que la tour n'emploie pas restent dissoutes hors champ.
 */
export function pile(n: number, o: PileOptions = PILE_DEFAUT): LayoutData {
  const d = allocate(n)
  const parNiveau = Math.max(1, Math.round(o.parNiveau))
  const base = LOGO_POSES.length
  const dispo = Math.max(0, n - base)
  const niveaux = Math.max(1, Math.floor(o.hauteur / o.ecart))
  const poses = Math.min(dispo, niveaux * parNiveau)
  const enVol = Math.min(dispo - poses, Math.round(poses * o.chantier))
  const yBas = (LOGO_POSES[2]?.y ?? -0.62) - 0.15
  const zTour = -0.6 - o.rayon
  d.mur = zTour - o.rayon - 0.3

  for (let i = 0; i < base; i++) {
    const p = LOGO_POSES[i]!
    setInstance(d, i, p.x, p.y, p.z, 0, p.rotY, p.rotZ, 1, 0)
    d.shear[i] = p.shear
  }
  for (let k = 0; k < dispo; k++) {
    const i = base + k
    if (k < poses) {
      const niveau = Math.floor(k / parNiveau)
      const slot = k % parNiveau
      const angle = niveau * o.torsion + (slot / parNiveau) * Math.PI * 2
      const r = parNiveau === 1 ? 0 : o.rayon
      const x = Math.sin(angle) * r
      const z = zTour + Math.cos(angle) * r
      const y = yBas + niveau * o.ecart
      // Tangente au cercle : la plaque regarde vers l'extérieur ; une sur deux retournée (le pli).
      const miroir = (niveau + slot) % 2 === 1 ? Math.PI : 0
      setInstance(d, i, x, y, z, 0, angle + miroir, 0, o.echelle, 1)
    } else if (k < poses + enVol) {
      // Au sommet, les dernières plaques ne sont pas encore posées.
      const j = k - poses
      const yTop = yBas + niveaux * o.ecart
      const sx = (seed(i, 3) - 0.5) * 2.2
      const sz = zTour + (seed(i, 4) - 0.5) * 1.4
      const sy = yTop + seed(i, 5) * 1.4 + j * 0.01
      setInstance(d, i, sx, sy, sz, (seed(i, 6) - 0.5) * 0.8, seed(i, 7) * Math.PI * 2, (seed(i, 8) - 0.5) * 0.5, o.echelle, 1)
    } else {
      horsChamp(d, i)
    }
  }
  return d
}
