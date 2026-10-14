import { LOGO_POSES } from '../logo-geometry.ts'
import { allocate, horsChamp, seed, setInstance, type LayoutData } from './types.ts'

/** Pas entre deux couches (unités locales) : un peu plus que l'épaisseur d'une plaque (0,0286). */
export const PAS_COUCHE = 0.034
/** Groupe réservé : la plaque est peinte en ambre (copies de la plaque ambre du logo). */
export const GROUPE_AMBRE = 99

/**
 * EMPILE — le hero « impression ». Les trois plaques du logo restent devant ;
 * derrière elles, `couches` copies exactes des trois plaques, alignées, chacune
 * reculée d'un pas : le S devient un S massif, fait de couches visibles.
 * L'ordre d'arrivée (`delay`) suit la profondeur : la couche 1 se pose d'abord,
 * juste derrière le logo, puis la 2, etc. — comme une impression couche par couche.
 */
export function empile(n: number, couches = 20): LayoutData {
  const d = allocate(n)
  const base = LOGO_POSES.length
  const L = Math.max(0, Math.min(couches, Math.floor((n - base) / base)))
  d.mur = -(L + 2) * PAS_COUCHE - 0.3
  for (let i = 0; i < base; i++) {
    const p = LOGO_POSES[i]!
    setInstance(d, i, p.x, p.y, p.z, 0, p.rotY, p.rotZ, 1, 0, 0)
    d.shear[i] = p.shear
  }
  let i = base
  for (let k = 1; k <= L; k++) {
    for (let j = 0; j < base; j++) {
      const p = LOGO_POSES[j]!
      // Retard : couche par couche, les trois plaques d'une couche presque ensemble.
      // Groupe 99 : copie de la plaque ambre (elle reste ambre, le S massif garde ses couleurs).
      setInstance(d, i, p.x, p.y, p.z - k * PAS_COUCHE, 0, p.rotY, p.rotZ, 1, j === 2 ? GROUPE_AMBRE : k, (k - 1 + j * 0.12) / Math.max(1, L))
      d.shear[i] = p.shear
      i++
    }
  }
  for (; i < n; i++) horsChamp(d, i)
  return d
}

/**
 * La tête d'impression : point de départ des couches. Chaque plaque arrive
 * d'au-dessus et de devant, réduite à rien, et descend se poser à sa place.
 * Utilisé comme côté A de la paire (logo + couches en approche).
 */
export function empileDepart(n: number, couches = 20): LayoutData {
  const d = empile(n, couches)
  const base = LOGO_POSES.length
  const L = Math.min(couches, Math.floor((n - base) / base))
  for (let i = base; i < base + L * base; i++) {
    // Juste au-dessus de sa place, alignée : la tête d'impression la dépose.
    d.pos[i * 3 + 1] = d.pos[i * 3 + 1]! + 0.55 + seed(i, 3) * 0.05
    d.scale[i] = 0
  }
  return d
}
