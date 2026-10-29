/**
 * PRIX DE L'OFFRE « CLUBS DE TENNIS » — SOURCE UNIQUE DE VÉRITÉ.
 * Les pages, les tableaux, le simulateur, les jetons {{club:…}} des textes et les données structurées lisent
 * uniquement ce fichier. Le pack « site + logiciel » n'est jamais écrit : il se calcule (remise PACK_DISCOUNT).
 * Montants en euros, hors taxe (voir la mention TVA de src/config/company.ts).
 * Modifier un prix : changer le nombre ici, puis `npm test` (les tests rappellent les montants de référence).
 */
import { z } from 'zod'

const Tarif = z.object({ miseEnPlace: z.number().int().positive(), mois: z.number().int().positive() })

const Categorie = z.object({
  id: z.enum(['mini', 'petit', 'moyen', 'grand', 'tres-grand']),
  nom: z.string(),
  /** Licenciés FFT de la saison en cours (tennis, padel et pickleball compris). */
  min: z.number().int().positive(),
  max: z.number().int().positive().nullable(),
  /** Taille du « club type » qui sert d'exemple (coût par licencié et par an). Hypothèse affichée comme telle. */
  clubType: z.number().int().positive(),
  site: Tarif,
  logiciel: Tarif,
  /** Heures d'accompagnement incluses à la mise en place : site seul, logiciel seul, les deux. */
  heures: z.object({ site: z.number().int().nonnegative(), logiciel: z.number().int().nonnegative(), pack: z.number().int().nonnegative() }),
  stockageGo: z.number().int().positive(),
})

export const OPTION_IDS = [
  'assistant-ia',
  'commande-vocale',
  'automatisations-avancees',
  'reservation-courts',
  'boutique',
  'ecran-club-house',
  'accueil-3d',
  'sponsors',
  'assemblee-generale',
  'subventions',
  'plusieurs-lieux',
  'referencement-local',
  'referencement-regional',
  'page-supplementaire',
  'reprise-contenu',
  'redaction-page',
  'import-source',
  'adresses-email',
  'copie-autonome',
] as const
export type OptionId = (typeof OPTION_IDS)[number]

const Option = z.object({
  id: z.enum(OPTION_IDS),
  nom: z.string(),
  description: z.string(),
  miseEnPlace: z.number().int().nonnegative(),
  /** 0 = pas d'abonnement pour cette option. */
  mois: z.number().int().nonnegative(),
  /** « fixe » : une fois ; « page » : prix par page (quantité). */
  unite: z.enum(['fixe', 'page']),
  /** Ce dont l'option a besoin : le site, le logiciel, ou une autre option. */
  requiert: z.enum(['site', 'logiciel', 'assistant-ia']).nullable(),
  condition: z.string(),
  /** Proposée dans le simulateur (la copie autonome ne se commande qu'au départ). */
  simulateur: z.boolean(),
  groupe: z.enum(['fonctions', 'visibilite', 'mise-en-place', 'depart']),
})

const Pricing = z.object({
  /** Remise du pack site + logiciel, sur la mise en place et sur l'abonnement. */
  packDiscount: z.number().min(0).max(0.5),
  /** Remise du paiement annuel de l'abonnement. */
  annualDiscount: z.number().min(0).max(0.5),
  /** Mise en place payable en N fois, sans frais, sur les N premiers mois. */
  installments: z.number().int().min(1),
  /** Engagement (mois), puis reconduction annuelle. */
  engagementMois: z.number().int().positive(),
  /** Heure d'accompagnement supplémentaire, facturée par tranche de 30 minutes. */
  heureSupplementaire: z.number().int().positive(),
  trancheMinutes: z.number().int().positive(),
  /** Développement propre à un seul club, chiffré avant. */
  heureDeveloppement: z.number().int().positive(),
  /** Premier rendez-vous en présentiel gratuit jusqu'à cette distance de Savigné-sur-Lathan. */
  premierRdvGratuitKm: z.number().int().positive(),
  /** Pages créées à la mise en place (pages légales en plus). */
  pagesIncluses: z.number().int().positive(),
  /** Délai de réponse du support (jours ouvrés). */
  supportJoursOuvres: z.number().int().positive(),
  /** Seuil de baisse des licenciés (saison en cours / moyenne des 3 saisons) qui déclenche le message « justificatif ». */
  seuilBaisse: z.number().min(0).max(1),
  categories: z.array(Categorie).length(5),
  options: z.array(Option),
})

export type Categorie = z.infer<typeof Categorie>
export type CategorieId = Categorie['id']
export type Option = z.infer<typeof Option>
export type Formule = 'site' | 'logiciel' | 'pack'

export const PRICING = Pricing.parse({
  packDiscount: 0.15,
  annualDiscount: 0.1,
  installments: 3,
  engagementMois: 12,
  heureSupplementaire: 40,
  trancheMinutes: 30,
  heureDeveloppement: 50,
  premierRdvGratuitKm: 30,
  pagesIncluses: 15,
  supportJoursOuvres: 7,
  seuilBaisse: 0.9,
  categories: [
    { id: 'mini', nom: 'Mini', min: 1, max: 49, clubType: 35, site: { miseEnPlace: 590, mois: 19 }, logiciel: { miseEnPlace: 590, mois: 25 }, heures: { site: 1, logiciel: 2, pack: 3 }, stockageGo: 2 },
    { id: 'petit', nom: 'Petit', min: 50, max: 149, clubType: 100, site: { miseEnPlace: 890, mois: 25 }, logiciel: { miseEnPlace: 890, mois: 35 }, heures: { site: 2, logiciel: 3, pack: 5 }, stockageGo: 5 },
    { id: 'moyen', nom: 'Moyen', min: 150, max: 299, clubType: 220, site: { miseEnPlace: 1190, mois: 29 }, logiciel: { miseEnPlace: 1190, mois: 45 }, heures: { site: 2, logiciel: 4, pack: 6 }, stockageGo: 10 },
    { id: 'grand', nom: 'Grand', min: 300, max: 499, clubType: 400, site: { miseEnPlace: 1490, mois: 35 }, logiciel: { miseEnPlace: 1590, mois: 59 }, heures: { site: 3, logiciel: 5, pack: 8 }, stockageGo: 20 },
    { id: 'tres-grand', nom: 'Très grand', min: 500, max: null, clubType: 650, site: { miseEnPlace: 1890, mois: 45 }, logiciel: { miseEnPlace: 1990, mois: 79 }, heures: { site: 3, logiciel: 6, pack: 9 }, stockageGo: 50 },
  ],
  options: [
    { id: 'assistant-ia', nom: 'Assistant IA du club', description: 'Questions sur les données du club, rédaction d’actualités, de newsletters, de dossiers de subvention et du rapport d’assemblée générale. Un humain valide toujours.', miseEnPlace: 190, mois: 19, unite: 'fixe', requiert: 'logiciel', condition: 'Avec le logiciel. Usage plafonné ; au-delà, le coût réel est annoncé avant.', simulateur: true, groupe: 'fonctions' },
    { id: 'commande-vocale', nom: 'Commande vocale', description: 'Dicter une question ou une action à l’assistant, depuis le téléphone.', miseEnPlace: 90, mois: 9, unite: 'fixe', requiert: 'assistant-ia', condition: 'Nécessite l’assistant IA.', simulateur: true, groupe: 'fonctions' },
    { id: 'automatisations-avancees', nom: 'Automatisations avancées', description: '25 scénarios prêts à l’emploi et 3 scénarios sur mesure, en plus des 5 automatisations incluses.', miseEnPlace: 290, mois: 10, unite: 'fixe', requiert: 'logiciel', condition: 'Avec le logiciel.', simulateur: true, groupe: 'fonctions' },
    { id: 'reservation-courts', nom: 'Réservation de courts en ligne', description: 'Les membres réservent un court depuis le site ou leur téléphone ; les règles du club (durée, délai, invités) s’appliquent toutes seules.', miseEnPlace: 290, mois: 12, unite: 'fixe', requiert: null, condition: 'Avec le site ou le logiciel.', simulateur: true, groupe: 'fonctions' },
    { id: 'boutique', nom: 'Boutique du club', description: 'Tenues du club, précommandes groupées, retrait au club.', miseEnPlace: 390, mois: 15, unite: 'fixe', requiert: null, condition: 'Frais de paiement en ligne à la charge du club.', simulateur: true, groupe: 'fonctions' },
    { id: 'ecran-club-house', nom: 'Écran club-house', description: 'Le classement du Challenge et les infos du jour en direct sur la télévision du club-house.', miseEnPlace: 90, mois: 0, unite: 'fixe', requiert: 'logiciel', condition: 'Avec le logiciel.', simulateur: true, groupe: 'fonctions' },
    { id: 'accueil-3d', nom: 'Accueil 3D sur mesure', description: 'Une scène en trois dimensions unique au club en page d’accueil, avec une image fixe de secours sur les petits appareils.', miseEnPlace: 900, mois: 5, unite: 'fixe', requiert: 'site', condition: 'Avec le site.', simulateur: true, groupe: 'visibilite' },
    { id: 'sponsors', nom: 'Sponsors et partenaires', description: 'Dossier de partenariat en PDF, suivi des renouvellements, rapport de visibilité pour chaque partenaire.', miseEnPlace: 90, mois: 5, unite: 'fixe', requiert: 'logiciel', condition: 'Avec le logiciel.', simulateur: true, groupe: 'fonctions' },
    { id: 'assemblee-generale', nom: 'Assemblée générale et votes en ligne', description: 'Convocation, ordre du jour, procurations, votes en ligne et procès-verbal.', miseEnPlace: 90, mois: 5, unite: 'fixe', requiert: 'logiciel', condition: 'Avec le logiciel.', simulateur: true, groupe: 'fonctions' },
    { id: 'subventions', nom: 'Dossiers de subvention', description: 'Suivi des demandes, pièces à fournir, échéances et comptes rendus.', miseEnPlace: 90, mois: 5, unite: 'fixe', requiert: 'logiciel', condition: 'Avec le logiciel.', simulateur: true, groupe: 'fonctions' },
    { id: 'plusieurs-lieux', nom: 'Plusieurs lieux ou sections', description: 'Plusieurs sites de pratique ou plusieurs sections gérés séparément dans le même club.', miseEnPlace: 190, mois: 10, unite: 'fixe', requiert: null, condition: 'Avec le site ou le logiciel.', simulateur: true, groupe: 'fonctions' },
    { id: 'referencement-local', nom: 'Référencement Local', description: 'Être trouvé dans sa commune et les communes autour : pages et contenus locaux, fiche d’établissement, suivi.', miseEnPlace: 350, mois: 60, unite: 'fixe', requiert: 'site', condition: 'Avec le site.', simulateur: true, groupe: 'visibilite' },
    { id: 'referencement-regional', nom: 'Référencement Régional', description: 'Être trouvé dans tout le département : contenus, pages et suivi à l’échelle départementale.', miseEnPlace: 650, mois: 120, unite: 'fixe', requiert: 'site', condition: 'Avec le site.', simulateur: true, groupe: 'visibilite' },
    { id: 'page-supplementaire', nom: 'Page supplémentaire créée à la mise en place', description: 'Au-delà des 15 pages créées à la mise en place (le club peut toujours en créer lui-même avec l’éditeur, sans limite).', miseEnPlace: 50, mois: 0, unite: 'page', requiert: 'site', condition: 'Au-delà des 15 pages.', simulateur: true, groupe: 'mise-en-place' },
    { id: 'reprise-contenu', nom: 'Reprise du contenu de l’ancien site', description: 'Les textes et images de l’ancien site repris page par page.', miseEnPlace: 10, mois: 0, unite: 'page', requiert: 'site', condition: 'Avec le site.', simulateur: true, groupe: 'mise-en-place' },
    { id: 'redaction-page', nom: 'Rédaction d’une page', description: 'Une page rédigée pour le club à partir de ses informations.', miseEnPlace: 60, mois: 0, unite: 'page', requiert: 'site', condition: 'Avec le site.', simulateur: true, groupe: 'mise-en-place' },
    { id: 'import-source', nom: 'Import d’une source de données supplémentaire', description: 'Une deuxième source de membres ou d’historique (un autre tableur, un ancien fichier), en plus de celle incluse.', miseEnPlace: 150, mois: 0, unite: 'fixe', requiert: 'logiciel', condition: 'Avec le logiciel.', simulateur: true, groupe: 'mise-en-place' },
    { id: 'adresses-email', nom: 'Adresses e-mail du club', description: 'Mise en place des adresses du club (contact@, president@…).', miseEnPlace: 60, mois: 0, unite: 'fixe', requiert: null, condition: 'Coût du service e-mail à la charge du club.', simulateur: true, groupe: 'mise-en-place' },
    { id: 'copie-autonome', nom: 'Copie autonome du site en cas de départ', description: 'Une copie du site qui fonctionne sans la plateforme, à héberger où le club le souhaite.', miseEnPlace: 690, mois: 0, unite: 'fixe', requiert: 'site', condition: 'À la fin du contrat.', simulateur: false, groupe: 'depart' },
  ],
})

export const CATEGORIES = PRICING.categories
export const OPTIONS = PRICING.options

/** Arrondi commercial du pack : mise en place à la dizaine, abonnement à l'euro. */
const dizaine = (n: number) => Math.round(n / 10) * 10
const euro = (n: number) => Math.round(n)

/** Prix d'une formule pour une catégorie. Le pack n'est jamais stocké : il se calcule ici. */
export function tarif(c: Categorie, formule: Formule): { miseEnPlace: number; mois: number } {
  if (formule === 'site') return c.site
  if (formule === 'logiciel') return c.logiciel
  const r = 1 - PRICING.packDiscount
  return { miseEnPlace: dizaine((c.site.miseEnPlace + c.logiciel.miseEnPlace) * r), mois: euro((c.site.mois + c.logiciel.mois) * r) }
}

/** Économie du pack par rapport à la somme du site et du logiciel. */
export function economiePack(c: Categorie) {
  const p = tarif(c, 'pack')
  return { miseEnPlace: c.site.miseEnPlace + c.logiciel.miseEnPlace - p.miseEnPlace, mois: c.site.mois + c.logiciel.mois - p.mois }
}

export const heuresIncluses = (c: Categorie, formule: Formule) => c.heures[formule]

/** La catégorie d'un nombre de licenciés de la saison en cours. */
export function categorieDe(licencies: number): Categorie {
  const n = Math.max(1, Math.floor(licencies))
  return CATEGORIES.find((c) => n >= c.min && (c.max === null || n <= c.max)) ?? CATEGORIES[0]!
}

export const categorie = (id: CategorieId) => CATEGORIES.find((c) => c.id === id)!
export const option = (id: OptionId) => OPTIONS.find((o) => o.id === id)!

/** Coût par licencié et par an, arrondi aux dix centimes : abonnement × 12 ÷ licenciés. */
export function coutParLicencieAn(moisTotal: number, licencies: number): number {
  if (licencies <= 0) return 0
  return Math.round((moisTotal * 12) / licencies * 10) / 10
}

/** Le plus petit prix de chaque formule (« à partir de »). */
export function aPartirDe(formule: Formule) {
  const c = CATEGORIES[0]!
  return tarif(c, formule)
}
