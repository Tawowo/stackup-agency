/**
 * LES CINQ CONFIGURATIONS DE LA BANDE.
 *
 * Fiche d'animation 11.3 (CONFIGURATION). La même matière devient vitrine,
 * site complet, boutique, logiciel ou site associatif. C'est ce qui fait de
 * la 3D une IDÉE plutôt qu'un effet : chaque transformation explique une
 * partie de l'offre.
 *
 * MÉTHODE. Une seule géométrie instanciée de N plaques fines, et cinq
 * tableaux de transformations cibles calculés par du code. Rien n'est
 * modelé : une forme modelée serait un fichier de plus à charger, à
 * versionner et à re-modeler au premier changement d'offre. Une forme
 * calculée se relit.
 *
 * L'interpolation entre deux configurations se fait plaque par plaque, avec
 * un retard tiré du rang de la plaque (fiche 11.3 : « retard par élément,
 * fenêtre 65 % ») : toutes ne partent pas en même temps, sinon le morph
 * ressemble à un simple fondu de deux formes.
 */

export type NomLayout = 'vitrine' | 'multipages' | 'boutique' | 'gestion'

/** Nombre de plaques. 120 : trivial pour le GPU, assez pour toutes les formes. */
export const NB_PLAQUES = 120

export interface Transformation {
  /** Position, en unités monde. */
  p: [number, number, number]
  /** Rotation d'Euler, en radians. */
  r: [number, number, number]
  /** Échelle, en unités monde. */
  e: [number, number, number]
}

/** Dimensions de référence, calées sur la bande continue (HAUTEUR_MONDE = 4). */
const L = 2.4 // largeur utile
const H = 3.4 // hauteur utile

/* ── Vitrine : une seule strate ────────────────────────────────────────────
   Un site vitrine, c'est une page. Les 120 plaques sont jointives et
   forment une plaque unique : la silhouette la plus simple de toutes, et
   c'est le propos. */
function vitrine(): Transformation[] {
  const cols = 12
  const rangs = NB_PLAQUES / cols
  const pl = L / cols
  const ph = H / rangs
  return Array.from({ length: NB_PLAQUES }, (_, i) => {
    const c = i % cols
    const r = Math.floor(i / cols)
    return {
      p: [(c - (cols - 1) / 2) * pl, ((rangs - 1) / 2 - r) * ph, 0],
      r: [0, 0, 0],
      e: [pl, ph, 0.06],
    } as Transformation
  })
}

/* ── Multi-pages : cinq strates écartées ───────────────────────────────────
   Cinq pages, cinq plans, décalés en profondeur et en hauteur. C'est la
   même image que les cinq couches de l'anatomie : un site complet est un
   empilement. */
function multipages(): Transformation[] {
  const strates = 5
  const parStrate = NB_PLAQUES / strates
  const cols = 8
  const rangs = parStrate / cols
  const pl = L / cols
  const ph = (H / strates / rangs) * 0.72
  return Array.from({ length: NB_PLAQUES }, (_, i) => {
    const s = Math.floor(i / parStrate)
    const j = i % parStrate
    const c = j % cols
    const r = Math.floor(j / cols)
    return {
      p: [
        (c - (cols - 1) / 2) * pl,
        ((strates - 1) / 2 - s) * (H / strates) + ((rangs - 1) / 2 - r) * ph,
        (s - (strates - 1) / 2) * 0.26,
      ],
      r: [0, 0, 0],
      e: [pl * 0.97, ph * 0.9, 0.05],
    } as Transformation
  })
}

/* ── Boutique : une grille de produits ─────────────────────────────────────
   Dix colonnes sur douze rangs, en léger relief irrégulier : un catalogue.
   Le relief vient d'un pseudo-aléa STABLE (fonction du rang), pas de
   `Math.random()` : une forme qui change à chaque rendu empêcherait toute
   comparaison de captures. */
function boutique(): Transformation[] {
  const cols = 10
  const rangs = NB_PLAQUES / cols
  const pl = (L * 1.08) / cols
  const ph = (H * 1.02) / rangs
  return Array.from({ length: NB_PLAQUES }, (_, i) => {
    const c = i % cols
    const r = Math.floor(i / cols)
    const bruit = Math.sin(i * 12.9898) * 43758.5453
    const z = (bruit - Math.floor(bruit) - 0.5) * 0.3
    return {
      p: [(c - (cols - 1) / 2) * pl, ((rangs - 1) / 2 - r) * ph, z],
      r: [0, 0, 0],
      e: [pl * 0.82, ph * 0.82, 0.07],
    } as Transformation
  })
}

/* ── Système de gestion : des modules reliés ───────────────────────────────
   Huit groupes en couronne autour d'un noyau. Un logiciel de gestion n'est
   pas une page : c'est un ensemble de modules qui se parlent. */
function gestion(): Transformation[] {
  const modules = 8
  const parModule = NB_PLAQUES / modules
  const rayon = 1.25
  return Array.from({ length: NB_PLAQUES }, (_, i) => {
    const m = Math.floor(i / parModule)
    const j = i % parModule
    const angle = (m / modules) * Math.PI * 2
    const cx = Math.cos(angle) * rayon
    const cy = Math.sin(angle) * rayon * 1.12
    // Chaque module est une petite pile de plaques.
    const cols = 3
    const c = j % cols
    const r = Math.floor(j / cols)
    const pl = 0.2
    const ph = 0.12
    return {
      p: [
        cx + (c - (cols - 1) / 2) * pl,
        cy + ((parModule / cols - 1) / 2 - r) * ph,
        Math.sin(angle) * 0.18,
      ],
      r: [0, 0, angle * 0.12],
      e: [pl * 0.86, ph * 0.78, 0.06],
    } as Transformation
  })
}

const FABRIQUES: Record<NomLayout, () => Transformation[]> = {
  vitrine,
  multipages,
  boutique,
  gestion,
}

/** Les cinq configurations, calculées une fois. */
export const LAYOUTS: Record<NomLayout, Transformation[]> = {
  vitrine: FABRIQUES.vitrine(),
  multipages: FABRIQUES.multipages(),
  boutique: FABRIQUES.boutique(),
  gestion: FABRIQUES.gestion(),
}

/**
 * LES LIAISONS ENTRE MODULES, pour la configuration « système de gestion ».
 *
 * Fiche 11.3 : les huit modules sont « reliés par des lignes ». Sans elles,
 * on voit huit grappes posées en couronne — ce qui raconte « huit choses
 * séparées », l'exact contraire du propos. Un logiciel de gestion vaut par
 * ce qui circule entre ses modules.
 *
 * Les segments sont calculés une fois, dans le même repère que les plaques,
 * et consommés par un `LineSegments` : chaque module au noyau, plus la
 * couronne de proche en proche.
 */
export function segmentsGestion(): Float32Array {
  const modules = 8
  const parModule = NB_PLAQUES / modules
  const rayon = 1.25
  const centres: [number, number, number][] = []
  for (let m = 0; m < modules; m++) {
    const angle = (m / modules) * Math.PI * 2
    centres.push([Math.cos(angle) * rayon, Math.sin(angle) * rayon * 1.12, Math.sin(angle) * 0.18])
  }
  const pts: number[] = []
  for (let m = 0; m < modules; m++) {
    // Rayon : du noyau vers le module.
    pts.push(0, 0, 0, ...centres[m])
    // Couronne : du module au suivant.
    pts.push(...centres[m], ...centres[(m + 1) % modules])
  }
  void parModule
  return new Float32Array(pts)
}

/**
 * Le retard de chaque plaque dans le morph, entre 0 et 0,35.
 *
 * Tiré d'un hachage du rang : stable d'un rendu à l'autre, donc comparable
 * d'une capture à l'autre, mais sans motif visible.
 */
export function retardPlaque(i: number): number {
  const h = Math.sin(i * 78.233) * 43758.5453
  return (h - Math.floor(h)) * 0.35
}
