import { LOGO_POSES, PLAQUE } from '../logo-geometry.ts'
import { allocate, horsChamp, setInstance, type LayoutData } from './types.ts'

/** Niveau du sol (y local) : le bas exact du logo debout (bas de la plaque ambre). */
export const SOL_EBOULIS = -1.14

/** Demi-étendues locales de la plaque : en y (pli compris) et en épaisseur. */
const DEMI_Y = Math.tan(PLAQUE.pente) * (PLAQUE.largeur / 2) + PLAQUE.hauteur / 2
const DEMI_Z = PLAQUE.epaisseur / 2

/** Demi-hauteur verticale d'une plaque couchée puis relevée de `inclinaison` rad (le coin bas touche le sol). */
function demiHauteur(s: number, inclinaison: number) {
  return s * (DEMI_Y * Math.sin(inclinaison) + DEMI_Z * Math.cos(inclinaison))
}

interface Gravat {
  x: number
  z: number
  /** Échelle de la plaque. */
  s: number
  /** Relevé au-dessus du sol (0 = à plat). */
  inclinaison: number
  /** Cap sur le sol (rotation autour de la verticale). */
  cap: number
  /** Posée sur une autre plaque : hauteur ajoutée (unités locales). */
  sur?: number
  delay: number
}

/** La plaque ambre, tombée devant la pile : couchée, un bord relevé, de biais. */
const AMBRE: Gravat = { x: 0.25, z: 0.55, s: 1, inclinaison: 0.28, cap: 0.4, delay: 0 }

/** Les plaques libres, éparpillées autour (déterministes, sans chevauchement). */
const GRAVATS: Gravat[] = [
  { x: -1.15, z: 0.3, s: 0.5, inclinaison: 0.08, cap: -0.6, delay: 0.25 },
  { x: -0.75, z: 1.35, s: 0.38, inclinaison: 0, cap: 1.1, delay: 0.4 },
  { x: 1.45, z: -0.15, s: 0.45, inclinaison: 0, cap: 0.9, delay: 0.3 },
  // Petit tas : une plaque à plat sur la précédente, croisée.
  { x: 1.42, z: -0.1, s: 0.3, inclinaison: 0, cap: -0.35, sur: 2 * DEMI_Z * 0.45, delay: 0.55 },
  { x: 1.3, z: 1.25, s: 0.3, inclinaison: 0.05, cap: -0.3, delay: 0.5 },
  { x: -1.6, z: -0.55, s: 0.34, inclinaison: 0.12, cap: 0.3, delay: 0.6 },
  { x: -0.2, z: -0.7, s: 0.28, inclinaison: 0.2, cap: 2.2, delay: 0.7 },
]

/** Pose d'une plaque couchée au sol : rx la couche (bord haut vers le fond), ry lui donne son cap. */
function poser(d: LayoutData, i: number, g: Gravat) {
  const y = SOL_EBOULIS + (g.sur ?? 0) + demiHauteur(g.s, g.inclinaison)
  setInstance(d, i, g.x, y, g.z, -(Math.PI / 2 - g.inclinaison), g.cap, 0, g.s, 0, g.delay)
}

/**
 * ÉBOULIS — la 404. Les deux plaques navy du logo restent en place ; la plaque
 * ambre (indice 2) est tombée au sol, couchée de biais devant la pile, et
 * quelques plaques libres traînent autour. Le S est incomplet : il manque
 * exactement ce qu'on cherchait. Ordre d'arrivée : l'ambre chute la première,
 * les gravats suivent.
 */
export function eboulis(n: number): LayoutData {
  const d = allocate(n)
  // Le mur recule : des gravats ont glissé derrière la pile.
  d.mur = -1.1
  for (let i = 0; i < 2; i++) {
    const p = LOGO_POSES[i]!
    setInstance(d, i, p.x, p.y, p.z, 0, p.rotY, p.rotZ, 1, 0, 0.1)
    d.shear[i] = p.shear
  }
  poser(d, 2, AMBRE)
  let i = 3
  for (const g of GRAVATS) {
    if (i >= n) break
    poser(d, i++, g)
  }
  for (; i < n; i++) horsChamp(d, i)
  return d
}

/**
 * Marge de sol propre à l'éboulis. Le moteur pose le sol à 0,36 × échelle sous
 * le centre de la plaque la plus basse (pensé pour des plaques debout), moins
 * `solMarge`. Couchées, les plaques flotteraient : cette marge (négative)
 * remonte le sol exactement à SOL_EBOULIS.
 */
export function margeSolEboulis(): number {
  const d = eboulis(3 + GRAVATS.length)
  let bas = Infinity
  for (let k = 0; k < d.scale.length; k++) {
    const s = d.scale[k]!
    if (s > 0) bas = Math.min(bas, d.pos[k * 3 + 1]! - 0.36 * s)
  }
  return bas - SOL_EBOULIS
}
