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
  action?: 'drag' | 'menu' | 'touche3' | 'onglet2' | 'onglet3' | 'onglet4' | 'noeud2' | 'noeud7' | 'focus-offre2'
  /** Limiter à certaines largeurs (par défaut : 1440 et 390). */
  largeurs?: number[]
  /** Position de scroll, en fraction de la distance épinglée du moment visé (par défaut 00). */
  scroll?: number
  moment?: string
  /** Position de départ (même moment) avant d'aller à `scroll` : capture un état intermédiaire. */
  depuis?: number
  /** Mobile : index du projet à afficher par balayage de la pellicule. */
  piste?: number
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
      { nom: 'strates-ouvert', query: `${QUALITE}&layout=strates&ouverture=1&rx=0.55&ry=-0.35&proj=0.3`, attente: 1600, sansRm: true },
      { nom: 'strates-ferme', query: `${QUALITE}&layout=strates&ouverture=0&rx=0.55&ry=-0.35&proj=0.3`, attente: 1600, sansRm: true },
      { nom: 'page', query: `${QUALITE}&layout=page&ry=-0.3&proj=0.2`, attente: 1600, sansRm: true },
      { nom: 'multi', query: `${QUALITE}&layout=multi&rx=0.08&ry=-0.2&proj=0`, attente: 1600, sansRm: true },
      { nom: 'boutique', query: `${QUALITE}&layout=boutique`, attente: 1600, sansRm: true },
      { nom: 'logiciel', query: `${QUALITE}&layout=logiciel`, attente: 1600, sansRm: true },
      { nom: 'pellicule', query: `${QUALITE}&layout=pellicule`, attente: 1600, sansRm: true },
      { nom: 'noyau', query: `${QUALITE}&layout=noyau&proj=0.3`, attente: 1600, sansRm: true, largeurs: [1440] },
    ],
  },
  {
    route: '/',
    dossier: 'accueil',
    etats: [
      { nom: '00-p0', query: QUALITE, attente: 1800 },
      { nom: '00-p025', query: QUALITE, scroll: 0.25, attente: 1600 },
      { nom: '00-p05', query: QUALITE, scroll: 0.5, attente: 1600 },
      { nom: '00-p075', query: QUALITE, scroll: 0.75, attente: 1600, sansRm: true },
      { nom: '00-p1', query: QUALITE, scroll: 1, attente: 1800 },
      { nom: '00-drag', query: QUALITE, action: 'drag', attente: 1200, sansRm: true },
      { nom: '00-menu', query: QUALITE, action: 'menu', attente: 1000, sansRm: true, largeurs: [390] },
      { nom: '00-sans-webgl', query: 'webgl=0', attente: 1500, sansRm: true },
      { nom: '00-sans-webgl-p1', query: 'webgl=0', scroll: 1, attente: 1500, sansRm: true },
      { nom: '01-ferme', query: QUALITE, moment: '01', scroll: 0.02, attente: 1800 },
      { nom: '01-2-ouvertes', query: QUALITE, moment: '01', scroll: 0.25, attente: 1600, sansRm: true },
      { nom: '01-5-ouvertes', query: QUALITE, moment: '01', scroll: 0.7, attente: 1800 },
      { nom: '01-isole-3', query: QUALITE, moment: '01', scroll: 0.7, action: 'touche3', attente: 1400, sansRm: true },
      { nom: '01-referme', query: QUALITE, moment: '01', scroll: 1, attente: 1800, sansRm: true },
      { nom: '02-une-page', query: QUALITE, moment: '02', scroll: 0, attente: 2600 },
      { nom: '02-multi', query: QUALITE, moment: '02', scroll: 0, action: 'onglet2', attente: 2200, sansRm: true },
      { nom: '02-boutique', query: QUALITE, moment: '02', scroll: 0, action: 'onglet3', attente: 2200, sansRm: true },
      { nom: '02-outil', query: QUALITE, moment: '02', scroll: 0, action: 'onglet4', attente: 2200, sansRm: true },
      { nom: '02-transition', query: QUALITE, moment: '02', scroll: 0, action: 'onglet2', attente: 450, sansRm: true },
      { nom: '03-projet-1', query: QUALITE, moment: '03', scroll: 0, attente: 2400 },
      { nom: '03-projet-3', query: QUALITE, moment: '03', scroll: 0.5, piste: 2, attente: 2400, sansRm: true },
      { nom: 'pellicule-glissement', query: QUALITE, moment: '03', depuis: 0.25, scroll: 0.5, piste: 2, attente: 700, sansRm: true },
      { nom: '03-projet-5', query: QUALITE, moment: '03', scroll: 1, piste: 4, attente: 2400, sansRm: true },
      { nom: '04-seuil', query: QUALITE, moment: '04', scroll: 0, attente: 2400 },
      { nom: '05-repos', query: QUALITE, moment: '05', scroll: 0, attente: 2600 },
      { nom: '05-module-2', query: QUALITE, moment: '05', scroll: 0, action: 'noeud2', attente: 1800, sansRm: true },
      { nom: '05-module-7', query: QUALITE, moment: '05', scroll: 0, action: 'noeud7', attente: 1800, sansRm: true },
      { nom: '06-repos', query: QUALITE, moment: '06', scroll: 0, attente: 2600 },
      { nom: '06-focal', query: QUALITE, moment: '06', scroll: 0, action: 'focus-offre2', attente: 1800, sansRm: true },
      { nom: '07-etape-1', query: QUALITE, moment: '07', scroll: 0, attente: 2200 },
      { nom: '07-etape-2', query: QUALITE, moment: '07', scroll: 0.35, attente: 2200, sansRm: true },
      { nom: '07-etape-5', query: QUALITE, moment: '07', scroll: 1, attente: 2200, sansRm: true },
      { nom: '08-atelier', query: QUALITE, moment: '08', scroll: 0, attente: 2200 },
      { nom: '09-depart', query: QUALITE, moment: '09', scroll: 0, attente: 2400 },
      { nom: 'footer', query: QUALITE, moment: '09', scroll: 2, attente: 1800, sansRm: true },
    ],
  },
]
