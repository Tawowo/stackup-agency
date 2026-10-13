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
  action?: 'drag'
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
    etats: [{ nom: 'haut', query: QUALITE, attente: 1200 }],
  },
]
