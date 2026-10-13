/**
 * LE STUDIO DE STYLE — données partagées serveur / client : activités
 * (contenu fictif de l'aperçu), palettes, voix typographiques (uniquement les
 * trois polices chargées par le site, ou des piles système), mises en page,
 * finitions, ambiances (préréglages). lireChoix() lit l'URL pour le rendu
 * serveur (et le formulaire sans JS).
 */
export interface Secteur { id: string; nom: string; marque: string; nav: string[]; titre: string; sous: string; cta: string; items: string[]; offre: 'une-page' | 'boutique' }
export interface Palette { id: string; nom: string; fond: string; texte: string; primaire: string; accent: string }
export interface Voix { id: string; nom: string; titre: string; corps: string; graisse: number }
export interface Option { id: string; nom: string }

export const SECTEURS: Secteur[] = [
  { id: 'artisan', nom: 'Artisan', marque: 'Menuiserie Aubert', nav: ['Savoir-faire', 'Réalisations', 'Contact'], titre: 'Le bois, travaillé sur mesure, chez vous.', sous: 'Cuisines, escaliers, rangements : de la prise de mesures à la pose.', cta: 'Demander un devis', items: ['Cuisines', 'Escaliers', 'Rangements'], offre: 'une-page' },
  { id: 'restaurant', nom: 'Restaurant', marque: 'Le Comptoir de Loire', nav: ['La carte', 'Réserver', 'Accès'], titre: 'Cuisine de saison, au cœur de Tours.', sous: 'Une carte courte, qui change avec le marché.', cta: 'Réserver une table', items: ['Le midi', 'Le soir', 'Privatiser'], offre: 'une-page' },
  { id: 'commerce', nom: 'Commerce', marque: 'Maison Lison', nav: ['Boutique', 'Événements', 'Nous trouver'], titre: 'Des fleurs de saison, composées le jour même.', sous: 'Bouquets, plantes et compositions, à emporter ou livrés.', cta: 'Voir la boutique', items: ['Bouquets', 'Plantes', 'Mariages'], offre: 'boutique' },
  { id: 'cabinet', nom: 'Cabinet', marque: 'Cabinet Deshayes', nav: ['Missions', 'Cabinet', 'Rendez-vous'], titre: 'Vos comptes, clairs et tenus à jour.', sous: 'Un interlocuteur unique pour les indépendants et les petites entreprises.', cta: 'Prendre rendez-vous', items: ['Création', 'Comptabilité', 'Paie'], offre: 'une-page' },
  { id: 'bien-etre', nom: 'Bien-être', marque: 'Atelier Respire', nav: ['Séances', 'Planning', 'Contact'], titre: 'Prendre le temps de respirer.', sous: 'Séances individuelles et cours collectifs, en studio ou en ligne.', cta: 'Réserver une séance', items: ['Individuel', 'Collectif', 'Ateliers'], offre: 'une-page' },
  { id: 'creatif', nom: 'Créatif', marque: 'Studio Mirage', nav: ['Galeries', 'Prestations', 'Contact'], titre: 'Des images qui vous ressemblent.', sous: 'Portraits, reportages et photos de produits.', cta: 'Voir les galeries', items: ['Portraits', 'Reportages', 'Produits'], offre: 'une-page' },
]

export const PALETTES: Palette[] = [
  { id: 'ardoise', nom: 'Ardoise', fond: '#F6F4EF', texte: '#1F2A37', primaire: '#24364B', accent: '#C2650A' },
  { id: 'terracotta', nom: 'Terracotta', fond: '#FBF5EE', texte: '#2B1A12', primaire: '#A4471F', accent: '#3F6B4E' },
  { id: 'sauge', nom: 'Sauge', fond: '#F2F5EF', texte: '#1D2B22', primaire: '#4F6F52', accent: '#B5762E' },
  { id: 'loire', nom: 'Bleu Loire', fond: '#EEF4F8', texte: '#0F2537', primaire: '#1E5A8A', accent: '#D98E1F' },
  { id: 'poudre', nom: 'Poudre', fond: '#FBF1F0', texte: '#3A1E24', primaire: '#A84E5E', accent: '#2F4858' },
  { id: 'craie', nom: 'Craie & encre', fond: '#FFFFFF', texte: '#111111', primaire: '#111111', accent: '#D93A26' },
  { id: 'laiton', nom: 'Nuit & laiton', fond: '#14161B', texte: '#EDE7DA', primaire: '#C9A65A', accent: '#E9DFC6' },
  { id: 'prune', nom: 'Prune', fond: '#1E1424', texte: '#F3ECF5', primaire: '#B892D1', accent: '#7FD1B9' },
]

const SERIF = "'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, serif"
export const VOIX: Voix[] = [
  { id: 'geometrique', nom: 'Géométrique', titre: 'var(--su-font-display), sans-serif', corps: 'var(--su-font-sans), sans-serif', graisse: 700 },
  { id: 'neutre', nom: 'Neutre', titre: 'var(--su-font-sans), sans-serif', corps: 'var(--su-font-sans), sans-serif', graisse: 800 },
  { id: 'editoriale', nom: 'Éditoriale', titre: SERIF, corps: 'var(--su-font-sans), sans-serif', graisse: 600 },
  { id: 'classique', nom: 'Classique', titre: SERIF, corps: SERIF, graisse: 500 },
  { id: 'technique', nom: 'Technique', titre: 'var(--su-font-mono), monospace', corps: 'var(--su-font-sans), sans-serif', graisse: 600 },
]

export const MISES: Option[] = [
  { id: 'centree', nom: 'Centrée' },
  { id: 'partagee', nom: 'Partagée' },
  { id: 'immersive', nom: 'Plein cadre' },
  { id: 'magazine', nom: 'Magazine' },
]

export const FINITIONS: Option[] = [
  { id: 'nette', nom: 'Angles nets' },
  { id: 'douce', nom: 'Angles doux' },
  { id: 'ronde', nom: 'Formes rondes' },
]

export interface Choix { secteur: string; palette: string; voix: string; mise: string; finition: string }
export type Reglage = Exclude<keyof Choix, 'secteur'>

export const AMBIANCES: (Option & Omit<Choix, 'secteur'>)[] = [
  { id: 'epure', nom: 'Épuré', palette: 'craie', voix: 'neutre', mise: 'centree', finition: 'nette' },
  { id: 'chaleureux', nom: 'Chaleureux', palette: 'terracotta', voix: 'editoriale', mise: 'partagee', finition: 'douce' },
  { id: 'naturel', nom: 'Naturel', palette: 'sauge', voix: 'geometrique', mise: 'partagee', finition: 'ronde' },
  { id: 'premium', nom: 'Premium', palette: 'laiton', voix: 'classique', mise: 'immersive', finition: 'nette' },
  { id: 'affirme', nom: 'Affirmé', palette: 'loire', voix: 'technique', mise: 'magazine', finition: 'nette' },
]

export const DEFAUT: Choix = { secteur: 'artisan', palette: 'terracotta', voix: 'editoriale', mise: 'partagee', finition: 'douce' }

const LISTES: Record<keyof Choix, { id: string }[]> = { secteur: SECTEURS, palette: PALETTES, voix: VOIX, mise: MISES, finition: FINITIONS }

/** L'ambiance dont les quatre réglages correspondent, sinon null (« sur mesure »). */
export const ambianceDe = (c: Choix) => AMBIANCES.find((a) => a.palette === c.palette && a.voix === c.voix && a.mise === c.mise && a.finition === c.finition) ?? null

/** Paramètres d'URL → choix valides ; ?ambiance=… applique un préréglage. */
export function lireChoix(q: Record<string, string | string[] | undefined>): Choix {
  const c = { ...DEFAUT }
  for (const k of Object.keys(LISTES) as (keyof Choix)[]) {
    const v = q[k]
    if (typeof v === 'string' && LISTES[k].some((o) => o.id === v)) c[k] = v
  }
  const a = AMBIANCES.find((x) => x.id === q.ambiance)
  return a ? { ...c, palette: a.palette, voix: a.voix, mise: a.mise, finition: a.finition } : c
}

/** Texte lisible sur une couleur (luminance relative). */
export function texteSur(hex: string): string {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b! > 0.179 ? '#111111' : '#FFFFFF'
}
