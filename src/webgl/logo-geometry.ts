/* GÉNÉRÉ PAR scripts/logo-trace.mjs — ne pas éditer à la main. */

/** Boîte du décalque SVG (LogoMarque), en unités SVG. */
export const LOGO_VIEW = { w: 146, h: 229 } as const

/** 1 unité monde = 100 unités SVG. Le logo tient dans 1.46 × 2.29 unités monde. */
export const SVG_PAR_UNITE = 100

/** Plaque canonique : parallélogramme à extrémités verticales, en unités monde. */
export const PLAQUE = {
  largeur: 1.43500,
  hauteur: 0.46800,
  /** Angle du pli (pente moyenne des trois bandes), en radians. */
  pente: 0.37757,
  /** Épaisseur : 2 % de la largeur. */
  epaisseur: 0.02870,
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
  /** Écart de pente à la plaque canonique (cisaillement, extrémités restent verticales). */
  shear: number
}

/** Les trois bandes en polygones SVG (viewBox 0 0 146 229), pour le repli 2D. */
export const LOGO_QUADS = [
  {
    "nom": "haut",
    "couleur": "navy",
    "points": "0.5,60.8 144.0,1.5 144.0,48.3 0.5,107.6"
  },
  {
    "nom": "milieu",
    "couleur": "navy",
    "points": "0.5,68.1 144.0,124.3 144.0,171.1 0.5,114.9"
  },
  {
    "nom": "bas",
    "couleur": "ambre",
    "points": "0.5,179.6 144.0,124.4 144.0,171.2 0.5,226.4"
  }
] as const

/** Les trois plaques du logo, au repos (projection orthographique de face). */
export const LOGO_POSES: readonly PoseLogo[] = [
  {
    "index": 0,
    "nom": "haut",
    "couleur": "navy",
    "x": -0.0075,
    "y": 0.5995,
    "z": 0.04,
    "rotY": 0,
    "rotZ": 0,
    "shear": 0.0169
  },
  {
    "index": 1,
    "nom": "milieu",
    "couleur": "navy",
    "x": -0.0075,
    "y": -0.051,
    "z": 0.02,
    "rotY": 3.141592653589793,
    "rotZ": 0,
    "shear": -0.0049
  },
  {
    "index": 2,
    "nom": "bas",
    "couleur": "ambre",
    "x": -0.0075,
    "y": -0.60895,
    "z": 0,
    "rotY": 0,
    "rotZ": 0,
    "shear": -0.012
  }
]
