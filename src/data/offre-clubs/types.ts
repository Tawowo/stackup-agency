/** Types des contenus de l'offre clubs (pages de fonctionnalités, pages locales, FAQ). Aucun montant en chiffres dans les textes : jetons `{{club:…}}`. */

export interface QR {
  q: string
  a: string
}

export interface SectionTexte {
  /** Ancre (a-z, 0-9, tirets). */
  id: string
  /** Titre h2. */
  titre: string
  paragraphes: string[]
  liste?: string[]
}

export interface LigneApercu {
  gauche: string
  droite: string
  etat?: 'ok' | 'attente' | 'alerte'
}

/** Une grande fonctionnalité du site ou du logiciel : une page `/clubs-de-tennis/fonctionnalites/<slug>`. */
export interface Fonctionnalite {
  slug: string
  /** Nom court (menus, grilles). */
  nom: string
  /** h1. */
  titre: string
  /** Pour quelle formule : le site, le logiciel, ou les deux. */
  formule: 'site' | 'logiciel' | 'site-et-logiciel'
  /** Identifiant d'une option payante de pricing.ts, si la fonctionnalité en est une. */
  optionId?: string
  /** Réponse directe, 2 phrases. */
  reponse: string
  /** <title> sans la marque, 60 caractères maximum. */
  titleSeo: string
  /** Meta description, 120 à 155 caractères. */
  descriptionSeo: string
  /** Le bénéfice concret pour le club, 2 à 3 phrases. */
  benefice: string
  /** Comment ça marche : 4 à 6 étapes. */
  etapes: { titre: string; texte: string }[]
  /** Écran de la démo à ouvrir. */
  ecran: 'site' | 'bureau' | 'roles'
  /** Aperçu illustratif (club fictif) : 4 à 6 lignes d'exemple. */
  apercu: { titre: string; lignes: LigneApercu[] }
  /** 3 à 5 sections de texte (au total 600 mots au moins). */
  sections: SectionTexte[]
  faq: QR[]
  /** 2 à 4 slugs de fonctionnalités voisines. */
  voisines: string[]
  /** Requêtes visées (documentation SEO, non affichées). */
  mots: string[]
  /** Date de mise à jour (AAAA-MM-JJ). */
  maj: string
}

/** Page régionale, départementale ou thématique (padel, pickleball). */
export interface PageLocale {
  slug: string
  type: 'region' | 'departement' | 'thematique'
  /** Nom court : « Indre-et-Loire », « Padel ». */
  nom: string
  /** Code du département (« 37 ») pour les pages départementales. */
  code?: string
  etiquette: string
  /** h1. */
  titre: string
  reponse: string
  titleSeo: string
  descriptionSeo: string
  sections: SectionTexte[]
  /** Communes principales citées dans le texte (pages départementales). */
  communes?: string[]
  faq: QR[]
  /** Slugs de pages voisines (autres départements, région, padel…). */
  voisines: string[]
  maj: string
}

export interface QuestionFaq extends QR {
  /** Identifiant stable, pour la FAQ courte de la grande page. */
  id: string
  theme: 'offre' | 'prix' | 'adoc-fft' | 'donnees' | 'mise-en-place' | 'fonctionnement' | 'padel-pickleball'
}
