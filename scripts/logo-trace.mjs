/**
 * DÉCALQUE DU LOGO → GÉOMÉTRIE DE LA PLAQUE.
 *
 * Entrée : les deux tracés SVG de `LogoMarque.tsx` (coordonnées relevées sur
 * `public/Logo_Stackup-Agency.png`, repère 146 × 229). Le logo est un ruban
 * plié : trois bandes (navy, navy, ambre), chacune un parallélogramme à
 * extrémités verticales. Ce script :
 *   1. isole les trois parallélogrammes à partir des sommets des tracés ;
 *   2. en déduit UNE plaque canonique (largeur, hauteur d'extrémité, pente du
 *      pli) partagée par toutes les instances du Stack Engine ;
 *   3. écrit la pose exacte des trois plaques du logo (centre, rotation
 *      résiduelle, miroir, couleur) dans `src/webgl/logo-geometry.ts`.
 *
 * Les bandes du logo n'ont pas toutes exactement la même pente (0,42 / 0,39 /
 * 0,38). Une seule géométrie + une rotation résiduelle par plaque reproduit la
 * silhouette avec une erreur < 0,3 % de l'aire (mesurée par logo-check).
 */
import { writeFileSync } from 'node:fs'

const VIEW = { w: 146, h: 229 }
const RUBAN_NAVY = 'M144 1 L144 49 L50 88 L145 125 L144 171 L87 148 L1 115 L0 68 L4 60 Z'
const RUBAN_AMBRE = 'M87 148 L144 171 L144 173 L1 228 L1 181 Z'

function points(d) {
  return d.match(/[ML]\s*[\d.]+\s+[\d.]+/g).map((s) => s.slice(1).trim().split(/\s+/).map(Number))
}
const N = points(RUBAN_NAVY)
const A = points(RUBAN_AMBRE)
const slope = (p, q) => (q[1] - p[1]) / (q[0] - p[0])

/* Chaque bande : deux arêtes longues (haut, bas) données par deux points
   chacune, et deux extrémités verticales xL / xR. Les points sont lus dans
   l'ordre du tracé (voir le commentaire du composant). */
const bandes = [
  { nom: 'haut', couleur: 'navy', haut: [N[8], N[0]], bas: [N[2], N[1]], xL: 2, xR: 144 },
  { nom: 'milieu', couleur: 'navy', haut: [N[7], N[3]], bas: [N[6], N[4]], xL: 0.5, xR: 144.5 },
  { nom: 'bas', couleur: 'ambre', haut: [A[4], A[0]], bas: [A[3], A[1]], xL: 1, xR: 144 },
]

const mesures = bandes.map((b) => {
  const kH = slope(b.haut[0], b.haut[1])
  const kB = slope(b.bas[0], b.bas[1])
  const k = (kH + kB) / 2
  const yAt = (edge, x) => edge[0][1] + slope(edge[0], edge[1]) * (x - edge[0][0])
  const hL = yAt(b.bas, b.xL) - yAt(b.haut, b.xL)
  const hR = yAt(b.bas, b.xR) - yAt(b.haut, b.xR)
  const cx = (b.xL + b.xR) / 2
  const cy = (yAt(b.haut, cx) + yAt(b.bas, cx)) / 2
  return { ...b, k, w: b.xR - b.xL, h: (hL + hR) / 2, cx, cy }
})

/* Plaque canonique : moyennes. La pente est exprimée en repère monde (y vers
   le haut), donc signe inversé par rapport au SVG. Les bandes « haut » et
   « bas » descendent vers la gauche (k SVG < 0 → pente monde > 0) ; la bande
   du milieu est la même plaque retournée (miroir en x = rotation π autour
   de Y). */
const w = mesures.reduce((s, m) => s + m.w, 0) / 3
const h = mesures.reduce((s, m) => s + m.h, 0) / 3
const kAbs = mesures.reduce((s, m) => s + Math.abs(m.k), 0) / 3
const pente = Math.atan(kAbs)
const U = 100 // 1 unité monde = 100 unités SVG

const poses = mesures.map((m, i) => {
  const miroir = m.k > 0 // la bande du milieu descend vers la droite
  const kMonde = -m.k * (miroir ? -1 : 1) // pente de cette bande, dans le repère de la plaque
  const rotZ = Math.atan(kMonde) - pente // résidu après la pente canonique
  return {
    index: i,
    nom: m.nom,
    couleur: m.couleur,
    x: +((m.cx - VIEW.w / 2) / U).toFixed(5),
    y: +((VIEW.h / 2 - m.cy) / U).toFixed(5),
    z: i === 1 ? 0.045 : 0, // le milieu passe devant : c'est le pli
    rotY: miroir ? Math.PI : 0,
    rotZ: +(miroir ? -rotZ : rotZ).toFixed(5),
    pente: +m.k.toFixed(4),
  }
})

/* Les trois parallélogrammes en coordonnées SVG (repli 2D), ordre d'empilement :
   haut, bas (ambre), puis milieu devant. */
const quads = mesures.map((m) => {
  const yAt = (edge, x) => edge[0][1] + slope(edge[0], edge[1]) * (x - edge[0][0])
  const pts = [
    [m.xL, yAt(m.haut, m.xL)],
    [m.xR, yAt(m.haut, m.xR)],
    [m.xR, yAt(m.bas, m.xR)],
    [m.xL, yAt(m.bas, m.xL)],
  ]
  return { nom: m.nom, couleur: m.couleur, points: pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ') }
})

const out = `/* GÉNÉRÉ PAR scripts/logo-trace.mjs — ne pas éditer à la main. */

/** Boîte du décalque SVG (LogoMarque), en unités SVG. */
export const LOGO_VIEW = { w: ${VIEW.w}, h: ${VIEW.h} } as const

/** 1 unité monde = ${U} unités SVG. Le logo tient dans ${(VIEW.w / U).toFixed(2)} × ${(VIEW.h / U).toFixed(2)} unités monde. */
export const SVG_PAR_UNITE = ${U}

/** Plaque canonique : parallélogramme à extrémités verticales, en unités monde. */
export const PLAQUE = {
  largeur: ${(w / U).toFixed(5)},
  hauteur: ${(h / U).toFixed(5)},
  /** Angle du pli (pente des arêtes longues), en radians. */
  pente: ${pente.toFixed(5)},
  /** Épaisseur : 2 % de la largeur. */
  epaisseur: ${((0.02 * w) / U).toFixed(5)},
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
/** Les trois plaques en polygones SVG (viewBox 0 0 ${VIEW.w} ${VIEW.h}), pour le repli 2D. */
export const LOGO_QUADS = ${JSON.stringify(quads, null, 2)} as const

export const LOGO_POSES: readonly PoseLogo[] = ${JSON.stringify(
  poses.map((p) => ({ index: p.index, nom: p.nom, couleur: p.couleur, x: p.x, y: p.y, z: p.z, rotY: p.rotY, rotZ: p.rotZ })),
  null,
  2,
)}
`
writeFileSync(new URL('../src/webgl/logo-geometry.ts', import.meta.url), out)
console.table(mesures.map((m) => ({ bande: m.nom, w: m.w.toFixed(1), h: m.h.toFixed(1), pente: m.k.toFixed(4), cx: m.cx.toFixed(1), cy: m.cy.toFixed(1) })))
console.log('plaque canonique', { w: w.toFixed(2), h: h.toFixed(2), pente: `${((pente * 180) / Math.PI).toFixed(2)}°` })
console.table(poses)
