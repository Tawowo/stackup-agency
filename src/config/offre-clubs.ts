/**
 * OFFRE « CLUBS DE TENNIS » — nom du produit, promesse, liens de démonstration et mentions obligatoires.
 * Changer le nom du produit : une ligne (PRODUCT_NAME). Changer un lien de démo : DEMO. Les prix vivent ailleurs,
 * dans src/data/offre-clubs/pricing.ts (source unique).
 */

/** Nom de travail du produit. Tous les textes de l'offre le lisent (jeton {{produit}} dans les contenus). */
export const PRODUCT_NAME = 'Stackup Club'

/** Racine des pages de l'offre. */
export const RACINE_CLUBS = '/clubs-de-tennis'

/** La promesse, à comprendre en cinq secondes. */
export const PROMESSE = {
  titre: 'Le site de votre club et le logiciel de votre bureau, connectés en direct.',
  sousTitre: `ADOC gère l’administratif fédéral, ${PRODUCT_NAME} fait vivre votre club.`,
  pourQui: 'Pour les clubs de tennis associatifs, y compris leurs sections padel et pickleball.',
}

/** Démonstration en ligne : un club fictif, le Grand Chelem Tennis Club. */
const DEMO_ORIGINE = 'https://grand-chelem-platform.vercel.app'
export const DEMO = {
  clubFictif: 'Grand Chelem Tennis Club',
  origine: DEMO_ORIGINE,
  /** Le site public du club. */
  site: `${DEMO_ORIGINE}/`,
  /** Le logiciel du bureau. */
  bureau: `${DEMO_ORIGINE}/bureau`,
  /** L'accueil de la démo, avec le choix du rôle. */
  accueil: `${DEMO_ORIGINE}/demo`,
  /** Ouvre la démo directement avec un rôle (et, en option, une page précise). */
  role: (role: RoleDemo, vers?: string) => `${DEMO_ORIGINE}/demo?role=${role}${vers ? `&vers=${encodeURIComponent(vers)}` : ''}`,
  /** Une page précise du site ou du logiciel. */
  page: (chemin: string) => `${DEMO_ORIGINE}${chemin}`,
}
export type RoleDemo = 'presidente' | 'tresorier' | 'secretaire' | 'enseignant' | 'capitaine' | 'parent' | 'membre' | 'benevole'

/** Les trois boutons de démo, réutilisés partout. */
export const BOUTONS_DEMO = [
  { id: 'site', libelle: 'Voir le site d’un club', url: DEMO.site, decouverte: 'Le site public du Grand Chelem Tennis Club : accueil animé, tarifs et adhésion en ligne, école de tennis, Challenge interne, actualités, agenda, réservation, galerie.' },
  { id: 'bureau', libelle: 'Ouvrir le logiciel du bureau', url: DEMO.role('presidente'), decouverte: '« Ma journée » de la présidente, les adhérents et les familles, les dossiers d’adhésion, la trésorerie, l’école de tennis, les équipes, les statistiques.' },
  { id: 'parent', libelle: 'Essayer en tant que parent', url: DEMO.role('parent'), decouverte: 'L’espace d’un parent sur téléphone : le planning des enfants, une absence en un geste, les autorisations à signer, la carte de membre.' },
] as const

/** Référence réelle : le club qui utilise la solution. */
export const REFERENCE = {
  club: 'Tennis Club Savigné Gizeux',
  sigle: 'TCSG',
  url: 'https://tennis-club-savigne-gizeux.fr',
  /** Le fondateur de Stackup est vice-président du club : à dire, par transparence. */
  lien: 'Mathéo Reboul, fondateur de Stackup Agency, est vice-président du club.',
  /** À COMPLÉTER par le propriétaire : citation réelle, nom et fonction de la personne, photo. Vide = bloc « à compléter ». */
  temoignage: { citation: '', auteur: '', fonction: '', photo: '' },
}

/** Mentions obligatoires de l'offre (pied de chaque page). */
export const MENTIONS_CLUBS = {
  fft: `${PRODUCT_NAME} n’est ni affilié ni approuvé par la Fédération française de tennis. ADOC et Ten’Up sont des services de la FFT.`,
  prix: 'Prix indicatifs, établis pour un club type de chaque catégorie. Le devis définitif est établi après un premier échange.',
  adoc: 'Import et export des fichiers ADOC',
}
