/**
 * LE RUBAN DU LOGO → GÉOMÉTRIE EXACTE DES TROIS BANDES.
 *
 * Le logo officiel (`public/Logo_Stackup-Agency.png`) est UN ruban plié : trois
 * bandes (navy, navy, ambre), chacune un parallélogramme à extrémités
 * verticales, toutes alignées sur les mêmes bords gauche et droit. Relevé au
 * pixel (échelle 1 u = 1/100 unité monde, repère 146 × 229) :
 *
 *   haut    arête gauche 60,8 → 107,9 ; droite 1 → 49       pente 0,4135
 *   milieu  arête gauche …    → 114,8 ; droite …  → 171,2    pente 0,3917
 *   bas     arête gauche 181  → 228   ; droite 126 → 173     pente 0,3846
 *
 * Contraintes de pli (relevées sur le PNG, vérifiées par logo-zoom.mjs) :
 *  - la bande du haut est DEVANT celle du milieu (le pli gauche : le bord
 *    gauche du S est une seule droite verticale) ;
 *  - la bande du milieu est devant l'ambre, et leurs arêtes droites SE
 *    CONFONDENT (aucune barbe d'ambre qui dépasse à droite) ;
 *  - les trois bandes occupent exactement x ∈ [L, R] : aucun débord latéral.
 *
 * Une seule plaque canonique (largeur, hauteur, pente moyenne) sert à tout le
 * Stack Engine ; chaque bande du logo se cisaille de sa pente propre (`shear`),
 * ce qui garde les extrémités rigoureusement verticales (une rotation
 * résiduelle, elle, les inclinait et faisait déborder les bandes).
 */
import { writeFileSync } from 'node:fs'

const VIEW = { w: 146, h: 229 }
const L = 0.5
const R = 144
const D = R - L
const H = 46.8
const U = 100

const kHaut = 0.4135
const kMilieu = 0.3917
const kBas = 0.3846
const k0 = (kHaut + kMilieu + kBas) / 3

// Centres (SVG, y vers le bas) : haut et milieu lus sur le PNG ; l'ambre est
// calé pour que son arête droite se confonde avec celle du milieu.
const cHaut = (60.8 + H / 2 + 1.5 + H / 2) / 2
const milieuBasGauche = 114.8
const milieuBasDroite = 171.2
const cMilieu = (milieuBasGauche + milieuBasDroite) / 2 - H / 2
const milieuDroiteHaut = milieuBasDroite - H
const cBas = (milieuDroiteHaut + H / 2) + (kBas * D) / 2

const bandes = [
  { nom: 'haut', couleur: 'navy', k: kHaut, c: cHaut, miroir: false, z: 0.04 },
  { nom: 'milieu', couleur: 'navy', k: kMilieu, c: cMilieu, miroir: true, z: 0.02 },
  { nom: 'bas', couleur: 'ambre', k: kBas, c: cBas, miroir: false, z: 0 },
]

const cx = (L + R) / 2
const poses = bandes.map((b, i) => ({
  index: i,
  nom: b.nom,
  couleur: b.couleur,
  x: +((cx - VIEW.w / 2) / U).toFixed(5),
  y: +((VIEW.h / 2 - b.c) / U).toFixed(5),
  z: b.z,
  rotY: b.miroir ? Math.PI : 0,
  rotZ: 0,
  shear: +(b.k - k0).toFixed(5),
}))

// Polygones SVG exacts (repli 2D) : montant (haut, bas) ou descendant (milieu, miroir).
const quads = bandes.map((b) => {
  const s = b.miroir ? -1 : 1 // sens de la pente à l'écran (SVG : y diminue vers la droite si la bande monte)
  const yg = b.c + s * (b.k * D) / 2
  const yd = b.c - s * (b.k * D) / 2
  const pts = [[L, yg - H / 2], [R, yd - H / 2], [R, yd + H / 2], [L, yg + H / 2]]
  return { nom: b.nom, couleur: b.couleur, points: pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ') }
})

const out = `/* GÉNÉRÉ PAR scripts/logo-trace.mjs — ne pas éditer à la main. */

/** Boîte du décalque SVG (LogoMarque), en unités SVG. */
export const LOGO_VIEW = { w: ${VIEW.w}, h: ${VIEW.h} } as const

/** 1 unité monde = ${U} unités SVG. Le logo tient dans ${(VIEW.w / U).toFixed(2)} × ${(VIEW.h / U).toFixed(2)} unités monde. */
export const SVG_PAR_UNITE = ${U}

/** Plaque canonique : parallélogramme à extrémités verticales, en unités monde. */
export const PLAQUE = {
  largeur: ${(D / U).toFixed(5)},
  hauteur: ${(H / U).toFixed(5)},
  /** Angle du pli (pente moyenne des trois bandes), en radians. */
  pente: ${Math.atan(k0).toFixed(5)},
  /** Épaisseur : 2 % de la largeur. */
  epaisseur: ${((0.02 * D) / U).toFixed(5)},
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

/** Les trois bandes en polygones SVG (viewBox 0 0 ${VIEW.w} ${VIEW.h}), pour le repli 2D. */
export const LOGO_QUADS = ${JSON.stringify(quads, null, 2)} as const

/** Les trois plaques du logo, au repos (projection orthographique de face). */
export const LOGO_POSES: readonly PoseLogo[] = ${JSON.stringify(poses, null, 2)}
`
writeFileSync(new URL('../src/webgl/logo-geometry.ts', import.meta.url), out)
console.table(poses)
console.log(quads)
