/* GÉNÉRÉ PAR scripts/logo-trace.mjs — ne pas éditer à la main. */

/** Boîte du décalque SVG (LogoMarque), en unités SVG. */
export const LOGO_VIEW = { w: 146, h: 229 } as const

/** 1 unité monde = 100 unités SVG. Le logo tient dans 1.46 × 2.29 unités monde. */
export const SVG_PAR_UNITE = 100

/** Plaque canonique : parallélogramme à extrémités verticales, en unités monde. */
export const PLAQUE = {
  largeur: 1.43000,
  hauteur: 0.46657,
  /** Angle du pli (pente des arêtes longues), en radians. */
  pente: 0.38099,
  /** Épaisseur : 2 % de la largeur. */
  epaisseur: 0.02860,
} as const

export interface PoseLogo {
  index: number
  nom: string
  couleur: 'navy' | 'ambre'
  x: number
  y: number
  z: number
  rotY: number
  rotZ: number
}

/** Les trois plaques du logo, au repos (projection orthographique de face). */
export const LOGO_POSES: readonly PoseLogo[] = [
  {
    "index": 0,
    "nom": "haut",
    "couleur": "navy",
    "x": 0,
    "y": 0.59811,
    "z": 0,
    "rotY": 0,
    "rotZ": 0.01508
  },
  {
    "index": 1,
    "nom": "milieu",
    "couleur": "navy",
    "x": -0.005,
    "y": -0.0525,
    "z": 0.045,
    "rotY": 3.141592653589793,
    "rotZ": 0.00709
  },
  {
    "index": 2,
    "nom": "bas",
    "couleur": "ambre",
    "x": -0.005,
    "y": -0.62032,
    "z": 0,
    "rotY": 0,
    "rotZ": -0.00812
  }
]
