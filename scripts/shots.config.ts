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
  action?: 'drag' | 'menu' | 'touche3' | 'onglet2' | 'onglet3' | 'onglet4' | 'noeud2' | 'noeud7' | 'focus-offre2' | 'conf-type' | 'conf-fonctions' | 'conf-options' | 'ctc-vide' | 'ctc-remplir' | 'torche' | 'clic-plaque' | 'tab-poser' | 'regle' | 'lampe'
  /** Limiter à certaines largeurs (par défaut : 1440 et 390). */
  largeurs?: number[]
  /** Position de scroll, en fraction de la distance épinglée du moment visé (par défaut 00). */
  scroll?: number
  moment?: string
  /** Défilement absolu en pixels (pages sans moment épinglé). */
  scrollY?: number
  /** Position de départ (même moment) avant d'aller à `scroll` : capture un état intermédiaire. */
  depuis?: number
  /** Approche : fraction de la hauteur du viewport AVANT le haut du moment (0,3 = il reste 70 % à monter). */
  avant?: number
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
      /* La Fabrique : le monde autour de la pile, pièce par pièce. */
      { nom: 'monde-logo', query: `${QUALITE}&layout=logo&proj=0&hud=0`, attente: 2200, sansRm: true },
      { nom: 'monde-sans', query: `${QUALITE}&layout=logo&proj=0&hud=0&sol=0&flux=0&code=0&lampe=0`, attente: 1600, sansRm: true, largeurs: [1440] },
      { nom: 'monde-sol', query: `${QUALITE}&layout=logo&proj=0&hud=0&flux=0&code=0&lampe=0`, attente: 1600, sansRm: true, largeurs: [1440] },
      { nom: 'monde-flux', query: `${QUALITE}&layout=pile&proj=0&hud=0&sol=0&code=0&lampe=0`, attente: 2200, sansRm: true, largeurs: [1440] },
      { nom: 'monde-code', query: `${QUALITE}&layout=logo&proj=0&hud=0&sol=0&flux=0&lampe=0&plaques=0&codeOpacite=0.4`, attente: 1600, sansRm: true, largeurs: [1440] },
      { nom: 'monde-lampe', query: `${QUALITE}&layout=logo&proj=0&hud=0&sol=0&flux=0&code=0`, attente: 1600, sansRm: true, largeurs: [1440] },
      { nom: 'monde-torche', query: `${QUALITE}&layout=machines&proj=0.2&hud=0`, action: 'torche', attente: 2200, sansRm: true, largeurs: [1440] },
      { nom: 'monde-bascule', query: `${QUALITE}&layout=logo&proj=0&hud=0`, action: 'clic-plaque', attente: 2200, sansRm: true, largeurs: [1440] },
      { nom: 'monde-descente', query: `${QUALITE}&layout=pile&proj=0&hud=0&dissolve=0.55`, attente: 2200, sansRm: true, largeurs: [1440] },
      { nom: 'monde-jour', query: `${QUALITE}&layout=logo&proj=0&hud=0&fond=ivoire`, attente: 2200, sansRm: true },
      { nom: 'monde-plat', query: `${QUALITE}&layout=logo&proj=1&hud=0&tangage=0`, attente: 1600, sansRm: true, largeurs: [1440] },
    ],
  },
  {
    route: '/',
    dossier: 'accueil',
    etats: [
      /* Calibrage : p = 0, 0,2, 0,4, 0,6, 0,8, 1 de chaque section épinglée (00, 01, 03). */
      { nom: '00-p0', query: QUALITE, attente: 1800 },
      { nom: '00-p02', query: QUALITE, scroll: 0.2, attente: 1400, sansRm: true },
      { nom: '00-p04', query: QUALITE, scroll: 0.4, attente: 1400, sansRm: true },
      { nom: '00-p06', query: QUALITE, scroll: 0.6, attente: 1400, sansRm: true },
      { nom: '00-p08', query: QUALITE, scroll: 0.8, attente: 1400, sansRm: true },
      { nom: '00-p1', query: QUALITE, scroll: 1, attente: 1800 },
      { nom: '00-torche', query: QUALITE, action: 'torche', attente: 1600, sansRm: true, largeurs: [1440] },
      { nom: '00-drag', query: QUALITE, action: 'drag', attente: 1200, sansRm: true },
      { nom: '00-menu', query: QUALITE, action: 'menu', attente: 1000, sansRm: true, largeurs: [390] },
      { nom: '00-sans-webgl', query: 'webgl=0', attente: 1500, sansRm: true },
      { nom: '00-sans-webgl-p1', query: 'webgl=0', scroll: 1, attente: 1500, sansRm: true },
      /* p = 0 : juste après la frontière (0,01), là où la section prend la main. */
      /* L'approche des strates : la tour du hero se replie en pile de lamelles, pilotée par le scroll. */
      { nom: '01-arrivee-03', query: QUALITE, moment: '01', avant: 0.3, attente: 1400, sansRm: true, largeurs: [1440] },
      { nom: '01-arrivee-06', query: QUALITE, moment: '01', avant: 0.6, attente: 1400, sansRm: true, largeurs: [1440] },
      { nom: '01-arrivee-09', query: QUALITE, moment: '01', avant: 0.9, attente: 1400, sansRm: true, largeurs: [1440] },
      { nom: '01-p0', query: QUALITE, moment: '01', scroll: 0.01, attente: 1800 },
      { nom: '01-p02', query: QUALITE, moment: '01', scroll: 0.2, attente: 1400, sansRm: true },
      { nom: '01-p04', query: QUALITE, moment: '01', scroll: 0.4, attente: 1400, sansRm: true },
      { nom: '01-p06', query: QUALITE, moment: '01', scroll: 0.6, attente: 1400, sansRm: true },
      { nom: '01-p08', query: QUALITE, moment: '01', scroll: 0.8, attente: 1400, sansRm: true },
      { nom: '01-p1', query: QUALITE, moment: '01', scroll: 1, attente: 1800 },
      { nom: '01-isole-3', query: QUALITE, moment: '01', scroll: 0.7, action: 'touche3', attente: 1400, sansRm: true },
      { nom: '02-une-page', query: QUALITE, moment: '02', scroll: 0, attente: 2600 },
      { nom: '02-multi', query: QUALITE, moment: '02', scroll: 0, action: 'onglet2', attente: 2200, sansRm: true },
      { nom: '02-boutique', query: QUALITE, moment: '02', scroll: 0, action: 'onglet3', attente: 2200, sansRm: true },
      { nom: '02-outil', query: QUALITE, moment: '02', scroll: 0, action: 'onglet4', attente: 2200, sansRm: true },
      { nom: '02-transition', query: QUALITE, moment: '02', scroll: 0, action: 'onglet2', attente: 450, sansRm: true },
      { nom: '03-p0', query: QUALITE, moment: '03', scroll: 0.01, attente: 2400 },
      { nom: '03-p02', query: QUALITE, moment: '03', scroll: 0.2, piste: 1, attente: 1600, sansRm: true },
      { nom: '03-p04', query: QUALITE, moment: '03', scroll: 0.4, piste: 2, attente: 1600, sansRm: true },
      { nom: '03-p06', query: QUALITE, moment: '03', scroll: 0.6, piste: 2, attente: 1600, sansRm: true },
      { nom: '03-p08', query: QUALITE, moment: '03', scroll: 0.8, piste: 3, attente: 1600, sansRm: true },
      { nom: '03-p1', query: QUALITE, moment: '03', scroll: 1, piste: 4, attente: 2400, sansRm: true },
      { nom: '04-seuil', query: QUALITE, moment: '04', scroll: 0, attente: 2400 },
      { nom: '05-repos', query: QUALITE, moment: '05', scroll: 0, attente: 2600 },
      { nom: '05-module-2', query: QUALITE, moment: '05', scroll: 0, action: 'noeud2', attente: 1800, sansRm: true },
      { nom: '05-module-7', query: QUALITE, moment: '05', scroll: 0, action: 'noeud7', attente: 1800, sansRm: true },
      { nom: '06-repos', query: QUALITE, moment: '06', scroll: 0, attente: 2600 },
      { nom: '06-focal', query: QUALITE, moment: '06', scroll: 0, action: 'focus-offre2', attente: 1800, sansRm: true },
      { nom: '07-p0', query: QUALITE, moment: '07', scroll: 0, attente: 2200 },
      { nom: '07-p05', query: QUALITE, moment: '07', scroll: 0.5, attente: 2200, sansRm: true },
      { nom: '07-p1', query: QUALITE, moment: '07', scroll: 1, attente: 2200, sansRm: true },
      { nom: '08-atelier', query: QUALITE, moment: '08', scroll: 0, attente: 2200 },
      { nom: '09-depart', query: QUALITE, moment: '09', scroll: 0, attente: 2400 },
      { nom: 'footer', query: QUALITE, moment: '09', scroll: 2, attente: 1800, sansRm: true },
    ],
  },
  {
    route: '/realisations',
    dossier: 'realisations',
    etats: [
      { nom: 'intro', query: QUALITE, attente: 1800 },
      { nom: 'hall-p0', query: QUALITE, moment: 'galerie', scroll: 0.01, attente: 2000 },
      { nom: 'hall-p05', query: QUALITE, moment: 'galerie', scroll: 0.5, attente: 2000, sansRm: true },
      { nom: 'hall-p1', query: QUALITE, moment: 'galerie', scroll: 1, attente: 2000, sansRm: true },
      { nom: 'liste', query: QUALITE, moment: 'galerie-liste', scroll: 0, attente: 1400, sansRm: true },
    ],
  },
  {
    route: '/realisations/au-pain-dore',
    dossier: 'realisations',
    etats: [{ nom: 'fiche', query: QUALITE, attente: 2200 }],
  },
  {
    route: '/services',
    dossier: 'services',
    etats: [
      { nom: 'intro', query: QUALITE, attente: 1800 },
      { nom: 'vitrine-p02', query: QUALITE, moment: 'compil-0', scroll: 0.2, attente: 1600, sansRm: true },
      { nom: 'vitrine-p06', query: QUALITE, moment: 'compil-0', scroll: 0.6, attente: 1600, sansRm: true },
      { nom: 'vitrine-p1', query: QUALITE, moment: 'compil-0', scroll: 1, attente: 1600 },
      { nom: 'boutique-p05', query: QUALITE, moment: 'compil-2', scroll: 0.5, attente: 1600, sansRm: true },
      { nom: 'outil-p1', query: QUALITE, moment: 'compil-3', scroll: 1, attente: 1600, sansRm: true },
      { nom: 'fin', query: QUALITE, moment: 'services-fin', scroll: 0, attente: 1400, sansRm: true },
    ],
  },
  {
    route: '/services/site-ecommerce',
    dossier: 'services',
    etats: [{ nom: 'fiche-ecommerce', query: QUALITE, attente: 2600 }],
  },
  {
    route: '/solutions',
    dossier: 'solutions',
    etats: [
      { nom: 'tableau', query: QUALITE, attente: 2200 },
      { nom: 'tableau-pose', query: QUALITE, action: 'tab-poser', attente: 1800, sansRm: true },
      { nom: 'catalogue', query: QUALITE, moment: 'solutions-catalogue', scroll: 0, attente: 1400, sansRm: true },
    ],
  },
  {
    route: '/solutions/prise-rendez-vous-en-ligne',
    dossier: 'solutions',
    etats: [
      { nom: 'fiche', query: QUALITE, attente: 2200 },
      { nom: 'fiche-regle', query: QUALITE, action: 'regle', attente: 1400, sansRm: true },
    ],
  },
  {
    route: '/a-propos',
    dossier: 'a-propos',
    etats: [
      { nom: 'p0', query: QUALITE, moment: 'atelier-nuit', scroll: 0, attente: 2000 },
      { nom: 'p04', query: QUALITE, moment: 'atelier-nuit', scroll: 0.4, attente: 1600, sansRm: true },
      { nom: 'p07', query: QUALITE, moment: 'atelier-nuit', scroll: 0.7, attente: 1600, sansRm: true },
      { nom: 'p1', query: QUALITE, moment: 'atelier-nuit', scroll: 1, attente: 1600 },
      { nom: 'lampe', query: QUALITE, moment: 'atelier-nuit', scroll: 1, action: 'lampe', attente: 1600, sansRm: true },
      { nom: 'recit', query: QUALITE, moment: 'atelier-recit', scroll: 0, attente: 1400, sansRm: true },
    ],
  },
  {
    route: '/tarifs',
    dossier: 'tarifs',
    etats: [
      { nom: 'vide', query: QUALITE, attente: 2200 },
      { nom: 'type', query: QUALITE, action: 'conf-type', attente: 2000, sansRm: true },
      { nom: 'fonctions', query: QUALITE, action: 'conf-fonctions', attente: 2000, sansRm: true },
      { nom: 'options', query: QUALITE, action: 'conf-options', attente: 2000, sansRm: true },
      { nom: 'offres', query: QUALITE, moment: 'tarifs', scroll: 0.42, attente: 2000, sansRm: true },
      { nom: 'maintenance', query: QUALITE, moment: 'tarifs', scroll: 1, attente: 2000, sansRm: true },
    ],
  },
  {
    route: '/contact',
    dossier: 'contact',
    etats: [
      { nom: 'vide', query: QUALITE, attente: 2000 },
      { nom: 'erreurs', query: QUALITE, action: 'ctc-vide', attente: 1200, sansRm: true },
      { nom: 'prerempli', query: `${QUALITE}&c=${encodeURIComponent('t=multi-pages;f=formulaire,galerie,rdv;m=pro;r=4')}&projet=${encodeURIComponent('Un site pour mon atelier de menuiserie à Tours, avec galerie et prise de rendez-vous.')}`, action: 'ctc-remplir', attente: 2200, sansRm: true },
    ],
  },
  {
    route: '/contact/merci',
    dossier: 'contact',
    etats: [{ nom: 'merci', query: `${QUALITE}&envoye=0`, attente: 2000, sansRm: true }],
  },
  {
    route: '/api/contact/apercu',
    dossier: 'contact',
    etats: [
      { nom: 'email-demande', query: '', attente: 300, sansRm: true, largeurs: [1440] },
      { nom: 'email-accuse', query: 'quel=accuse', attente: 300, sansRm: true, largeurs: [1440] },
    ],
  },
  ...([
    ['/agence-web/tours', 'loc-ville'],
    ['/agence-web/departement/indre-et-loire', 'loc-dep'],
    ['/creation-site-internet/plombier', 'loc-metier'],
    ['/services-locaux/creation-site-restaurant', 'loc-service'],
    ['/zones-intervention', 'loc-zones'],
  ] as [string, string][]).map(([route, m]): Route => ({
    route,
    dossier: 'locales',
    etats: [
      { nom: route.split('/').filter(Boolean).join('_') + '-hero', query: QUALITE, attente: 2000 },
      { nom: route.split('/').filter(Boolean).join('_') + '-corps', query: QUALITE, moment: `${m}-corps`, scroll: 0, attente: 1400, sansRm: true },
    ],
  })),
  {
    route: '/blog',
    dossier: 'blog',
    etats: [
      { nom: 'kiosque', query: QUALITE, attente: 2000 },
      { nom: 'liste', query: QUALITE, scrollY: 1400, attente: 1200, sansRm: true },
    ],
  },
  {
    route: '/blog/10-erreurs-seo-site-web',
    dossier: 'blog',
    etats: [
      { nom: 'article', query: QUALITE, attente: 2000 },
      { nom: 'article-milieu', query: QUALITE, scrollY: 2600, attente: 1400, sansRm: true },
    ],
  },
]
