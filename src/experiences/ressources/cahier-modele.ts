/**
 * LE MODÈLE DU CAHIER DES CHARGES — questions, lecture des réponses (URL ou
 * formulaire), rendu en sections et en texte. Module pur : lu par la page
 * serveur (rendu sans JS, formulaire GET) et par l'îlot client.
 */

export type CleTexte = 'secteur' | 'activite' | 'cible' | 'references' | 'resultat' | 'pages' | 'logo' | 'couleurs' | 'inspirations' | 'textes' | 'photos' | 'echeance'
export type CleMulti = 'objectifs' | 'fonctions'
export type CleChoix = 'style' | 'budget'

export type Question =
  | { cle: CleTexte; type: 'texte' | 'long'; label: string; aide?: string }
  | { cle: CleMulti; type: 'multi'; label: string; options: readonly string[] }
  | { cle: CleChoix; type: 'choix'; label: string; options: readonly string[] }

export interface Etape {
  id: string
  titre: string
  intro: string
  questions: Question[]
}

export type Reponses = Record<CleTexte | CleChoix, string> & Record<CleMulti, string[]>

export const OBJECTIFS = [
  'Obtenir des demandes de contact',
  'Vendre en ligne',
  'Présenter mon activité',
  'Recruter',
  'Informer, fidéliser',
  'Gagner en crédibilité',
  'Être trouvé localement',
] as const

export const FONCTIONS = [
  'Formulaire de contact',
  'Blog, actualités',
  'Galerie photos, portfolio',
  'Prise de rendez-vous',
  'Boutique, paiement en ligne',
  'Espace client ou membres',
  'Foire aux questions',
  'Carte, plan d’accès',
  'Plusieurs langues',
  'Outil de gestion interne (planning, devis, stocks)',
] as const

export const STYLES = ['Moderne et épuré', 'Chaleureux et humain', 'Haut de gamme', 'Dynamique et affirmé', 'Classique et rassurant'] as const

export const BUDGETS = ['Moins de 500 €', '500 à 1 000 €', '1 000 à 2 000 €', '2 000 à 5 000 €', 'Plus de 5 000 €', 'À définir ensemble'] as const

export const ETAPES: Etape[] = [
  {
    id: 'activite',
    titre: 'Votre activité',
    intro: 'Qui vous êtes, pour qui vous travaillez.',
    questions: [
      { cle: 'secteur', type: 'texte', label: 'Secteur d’activité', aide: 'Restauration, artisanat, santé, commerce…' },
      { cle: 'activite', type: 'texte', label: 'Votre offre en une phrase', aide: 'Plombier à Tours, boulangerie artisanale, coach sportif…' },
      { cle: 'cible', type: 'texte', label: 'Votre client idéal', aide: 'Particuliers du quartier, PME locales, touristes…' },
      { cle: 'references', type: 'texte', label: 'Sites de référence (concurrents ou modèles)', aide: 'Des adresses, séparées par des virgules.' },
    ],
  },
  {
    id: 'objectifs',
    titre: 'Les objectifs',
    intro: 'Ce que le site doit accomplir. Commencez par là, pas par les fonctionnalités.',
    questions: [
      { cle: 'objectifs', type: 'multi', label: 'Le site doit d’abord…', options: OBJECTIFS },
      { cle: 'resultat', type: 'long', label: 'Le résultat attendu dans six mois', aide: 'Par exemple : dix demandes de devis par mois, des réservations en ligne…' },
    ],
  },
  {
    id: 'fonctions',
    titre: 'Les fonctionnalités',
    intro: 'Ce dont vous avez besoin, pas ce qui serait joli à avoir.',
    questions: [
      { cle: 'fonctions', type: 'multi', label: 'Cochez ce qui vous est nécessaire', options: FONCTIONS },
      { cle: 'pages', type: 'long', label: 'Pages ou rubriques à prévoir', aide: 'Accueil, prestations, tarifs, à propos, contact…' },
    ],
  },
  {
    id: 'charte',
    titre: 'L’identité visuelle',
    intro: 'Ce qui existe déjà, ce que vous aimez.',
    questions: [
      { cle: 'logo', type: 'texte', label: 'Avez-vous un logo ?', aide: 'Oui, non, en cours…' },
      { cle: 'couleurs', type: 'texte', label: 'Couleurs souhaitées', aide: 'Bleu marine et or, vert forêt et blanc…' },
      { cle: 'inspirations', type: 'texte', label: 'Sites dont vous aimez l’allure', aide: 'Et en une phrase, pourquoi.' },
      { cle: 'style', type: 'choix', label: 'Le ton visuel', options: STYLES },
    ],
  },
  {
    id: 'budget',
    titre: 'Contenus et budget',
    intro: 'Qui fournit quoi, et dans quelle enveloppe.',
    questions: [
      { cle: 'textes', type: 'texte', label: 'Les textes : fournis par vous ?', aide: 'Oui, en partie, non…' },
      { cle: 'photos', type: 'texte', label: 'Les photos et visuels : fournis par vous ?', aide: 'Oui, non, à créer…' },
      { cle: 'budget', type: 'choix', label: 'Budget indicatif', options: BUDGETS },
      { cle: 'echeance', type: 'texte', label: 'Votre échéance', aide: 'Une ouverture, un salon, une saison… ou pas de contrainte.' },
    ],
  },
]

export const VIDE: Reponses = {
  secteur: '',
  activite: '',
  cible: '',
  references: '',
  objectifs: [],
  resultat: '',
  fonctions: [],
  pages: '',
  logo: '',
  couleurs: '',
  inspirations: '',
  style: '',
  textes: '',
  photos: '',
  budget: '',
  echeance: '',
}

const MAX_TEXTE = 400

/** Lit les réponses dans des paramètres d'URL (formulaire GET sans JS). */
export function lireReponses(q: Record<string, string | string[] | undefined>): Reponses {
  const r: Reponses = { ...VIDE, objectifs: [], fonctions: [] }
  for (const e of ETAPES) {
    for (const x of e.questions) {
      const brut = q[x.cle]
      const liste = (Array.isArray(brut) ? brut : brut ? [brut] : []).map((v) => v.trim()).filter(Boolean)
      if (x.type === 'multi') r[x.cle] = x.options.filter((o) => liste.includes(o))
      else if (x.type === 'choix') r[x.cle] = x.options.find((o) => o === liste[0]) ?? ''
      else r[x.cle] = (liste[0] ?? '').slice(0, MAX_TEXTE)
    }
  }
  return r
}

export function valeur(r: Reponses, q: Question): string {
  const v = r[q.cle]
  return Array.isArray(v) ? v.join(', ') : v
}

export function nbRepondues(r: Reponses, e: Etape): number {
  return e.questions.filter((q) => valeur(r, q) !== '').length
}

/** Les sections du document généré : une par étape, une ligne par question. */
export function sections(r: Reponses) {
  return ETAPES.map((e, i) => ({
    num: i + 1,
    titre: e.titre,
    lignes: e.questions.map((q) => ({ cle: q.label, valeur: valeur(r, q) })),
  }))
}

/** Le document en texte brut (copier-coller dans un e-mail). */
export function texte(r: Reponses): string {
  const corps = sections(r)
    .map((s) => [`${s.num}. ${s.titre.toUpperCase()}`, ...s.lignes.map((l) => `${l.cle} : ${l.valeur || '—'}`)].join('\n'))
    .join('\n\n')
  return `CAHIER DES CHARGES — PROJET WEB\n\n${corps}\n`
}

/** Le résumé envoyé au formulaire de contact (champ « projet », 3 000 car.). */
export function resume(r: Reponses): string {
  const lignes = sections(r).flatMap((s) => s.lignes.filter((l) => l.valeur).map((l) => `${l.cle} : ${l.valeur}`))
  const t = ['Mon cahier des charges (préparé sur stackup-agency.fr) :', ...lignes].join('\n')
  return t.length > 2900 ? `${t.slice(0, 2897)}…` : t
}

/** Les paramètres d'URL qui reconstruisent ces réponses. */
export function versParams(r: Reponses): URLSearchParams {
  const p = new URLSearchParams()
  for (const e of ETAPES) {
    for (const q of e.questions) {
      const v = r[q.cle]
      if (Array.isArray(v)) v.forEach((x) => p.append(q.cle, x))
      else if (v) p.set(q.cle, v)
    }
  }
  return p
}

export function objetContact(r: Reponses): string {
  return r.fonctions.some((f) => f.startsWith('Outil de gestion')) ? 'Outil sur mesure' : 'Site'
}
