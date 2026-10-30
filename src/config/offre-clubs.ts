/**
 * OFFRE CLUBS — constantes de l'offre « plateforme pour clubs de tennis » (nom du produit, démo, référence, mentions).
 * Les prix vivent dans data/offre-clubs/pricing.ts ; l'identité légale dans config/company.ts.
 */

/** Nom de travail du produit. Un seul endroit : les textes écrivent `{{nom:produit}}`. */
export const PRODUCT_NAME = 'Stackup Club'

/** Racine de l'offre sur le site. */
export const CLUBS = '/clubs-de-tennis'

/** Démo en ligne : un club fictif, « Grand Chelem Tennis Club ». */
export const DEMO = {
  clubFictif: 'Grand Chelem Tennis Club',
  site: 'https://grand-chelem-platform.vercel.app/',
  bureau: 'https://grand-chelem-platform.vercel.app/bureau',
  roles: 'https://grand-chelem-platform.vercel.app/demo',
} as const

/**
 * Liens directs vers un écran précis de la démo, par page de fonctionnalité (clé = slug).
 * TODO à confirmer : seules les trois adresses ci-dessus sont connues ; une fonctionnalité sans entrée ici renvoie vers l'accueil du bureau.
 */
export const DEMO_ECRANS: Record<string, string> = {}

/** Référence réelle : le Tennis Club Savigné-Gizeux utilise la solution ; le fondateur en est vice-président (à dire toujours). */
export const REFERENCE = {
  nom: 'Tennis Club Savigné-Gizeux',
  abrege: 'TCSG',
  siteUrl: 'https://tennis-club-savigne-gizeux.fr',
  fiche: '/realisations/tennis-club-savigne-gizeux',
  lien: 'Mathéo Reboul, fondateur de Stackup Agency, en est vice-président.',
  /**
   * Témoignage : À COMPLÉTER par le propriétaire (citation, nom, rôle, photo) avec l'accord écrit de la personne.
   * Tant que la citation est `null`, la page affiche la référence factuelle, jamais une citation inventée.
   */
  temoignage: null as null | { citation: string; auteur: string; role: string; photo?: string },
} as const

export const MENTION_FFT = 'Stackup Club n’est ni affilié ni approuvé par la Fédération française de tennis. ADOC et Ten’Up sont des services de la FFT.'
/** Formule exacte à employer pour ADOC. Jamais « connecté à ADOC », jamais « partenaire de la FFT ». */
export const FORMULE_ADOC = 'Import et export des fichiers ADOC'

/**
 * PARAMÈTRES DES CONDITIONS GÉNÉRALES DE LA PLATEFORME (/cgv-plateforme).
 * TODO juriste : les durées ci-dessous sont des propositions à valider avant le premier contrat (préavis, mise en demeure, révision des prix).
 */
export const CGV_PLATEFORME = {
  version: '1.0',
  maj: '2026-10-30',
  /** Préavis de résiliation avant la date anniversaire. */
  preavisResiliationMois: 2,
  /** Une révision de prix est annoncée au moins N mois avant. */
  revisionPrixPreavisMois: 2,
  /** Délai laissé après mise en demeure avant suspension. */
  miseEnDemeureJours: 15,
  /** Le site reste en ligne N mois après la fin du contrat. */
  maintienEnLigneMois: 1,
  /** Les données sont supprimées N mois après la fin du contrat. */
  suppressionDonneesMois: 3,
} as const

/**
 * Sous-traitants ultérieurs (annexe « contrat de traitement des données »).
 * TODO à confirmer par le propriétaire avant tout contrat : fournisseur de base de données, fournisseur d'IA (option), région d'hébergement de chaque service.
 */
export const SOUS_TRAITANTS: { role: string; prestataire: string; localisation: string; aConfirmer: boolean; option?: boolean }[] = [
  { role: 'Hébergement du site et de l’application', prestataire: 'Vercel Inc.', localisation: 'Société établie aux États-Unis ; région d’hébergement des fonctions et des données à préciser', aConfirmer: true },
  { role: 'Base de données', prestataire: 'Fournisseur à désigner', localisation: 'À préciser', aConfirmer: true },
  { role: 'Envoi des e-mails', prestataire: 'Resend, Inc.', localisation: 'Société établie aux États-Unis', aConfirmer: true },
  { role: 'Assistant IA du club', prestataire: 'Fournisseur à désigner', localisation: 'À préciser', aConfirmer: true, option: true },
]
