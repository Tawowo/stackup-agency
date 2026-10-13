/**
 * TOUTES LES CAPTURES. Une entrée = une route, une liste d'états. Chaque état
 * est pris en 1440 × 900 et 390 × 844, avec et sans `prefers-reduced-motion`.
 * Sortie : docs/qa/shots/<route>/<etat>-<largeur>[-rm].png
 */
export interface Etat {
  nom: string
  /** Paramètres d'URL ajoutés à la route. */
  query?: string
  /** Geste à exécuter avant la capture. */
  action?: 'drag' | 'menu'
  /** Limiter à certaines largeurs (par défaut : 1440 et 390). */
  largeurs?: number[]
  /** Position de scroll, en fraction de la distance épinglée du moment 00. */
  scroll?: number
  /** Attente supplémentaire après le chargement, en ms (animations de scène). */
  attente?: number
  /** Ne pas prendre la variante mouvement réduit. */
  sansRm?: boolean
}
export interface Route {
  route: string
  dossier: string
  etats: Etat[]
}

export const QUALITE = 'quality=high&pane=0'

export const ROUTES: Route[] = [
  {
    route: '/lab',
    dossier: 'lab',
    etats: [
      { nom: 'logo', query: `${QUALITE}&layout=logo`, attente: 1200 },
      { nom: 'pile', query: `${QUALITE}&layout=pile`, attente: 1600 },
      { nom: 'morph-05', query: `${QUALITE}&layout=pile&morph=0.5&still=1`, attente: 800, sansRm: true },
      { nom: 'drag', query: `${QUALITE}&layout=pile`, action: 'drag', attente: 1600, sansRm: true },
      { nom: 'perspective', query: `${QUALITE}&layout=pile&proj=0`, attente: 1600, sansRm: true },
      { nom: 'jour', query: `${QUALITE}&layout=logo&fond=ivoire`, attente: 1200, sansRm: true },
      { nom: 'repli', query: `webgl=0&pane=0`, attente: 300, sansRm: true },
    ],
  },
  {
    route: '/',
    dossier: 'accueil',
    etats: [
      { nom: '00-p0', query: QUALITE, attente: 1800 },
      { nom: '00-p025', query: QUALITE, scroll: 0.25, attente: 1600 },
      { nom: '00-p05', query: QUALITE, scroll: 0.5, attente: 1600 },
      { nom: '00-p1', query: QUALITE, scroll: 1, attente: 1800 },
      { nom: '00-drag', query: QUALITE, action: 'drag', attente: 1200, sansRm: true },
      { nom: '00-menu', query: QUALITE, action: 'menu', attente: 1000, sansRm: true, largeurs: [390] },
      { nom: '00-sans-webgl', query: 'webgl=0', attente: 1500, sansRm: true },
      { nom: '00-sans-webgl-p1', query: 'webgl=0', scroll: 1, attente: 1500, sansRm: true },
    ],
  },
]
