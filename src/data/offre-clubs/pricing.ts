/**
 * TARIFS DE L'OFFRE CLUBS — la SEULE source de vérité des prix (pages, tableaux, simulateur, données structurées, e-mails).
 * Pour changer un prix, une catégorie ou une option : modifier ce fichier, rien d'autre. Le fichier est validé (zod) au chargement.
 * Les prix sont INDICATIFS (établis pour un club type de chaque catégorie) : le devis définitif suit un premier échange.
 * Les montants du pack « site + logiciel » ne sont pas stockés : ils se calculent avec `packDiscount` (voir domain/clubs/calcul.ts).
 */
import { z } from 'zod'

const euros = z.number().int().nonnegative()
const Tarif = z.object({ miseEnPlace: euros, mensuel: euros })

const CategorieSchema = z.object({
  id: z.enum(['mini', 'petit', 'moyen', 'grand', 'tres-grand']),
  nom: z.string(),
  licencies: z.object({ min: z.number().int().min(1), max: z.number().int().nullable() }),
  site: Tarif,
  logiciel: Tarif,
  /** Heures d'accompagnement incluses : site seul, logiciel seul, les deux. */
  heures: z.object({ site: z.number(), logiciel: z.number(), pack: z.number() }),
  stockageGo: z.number().int().positive(),
})

const OptionSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  nom: z.string(),
  description: z.string(),
  groupe: z.enum(['fonction', 'visibilite', 'contenu', 'service']),
  /** `forfait` : une fois ; `page` : prix par page (quantité) ; `heure` : prix par heure. */
  unite: z.enum(['forfait', 'page', 'heure']),
  miseEnPlace: euros.nullable(),
  mensuel: euros.nullable(),
  /** Pré-requis : l'option n'existe qu'avec le site, le logiciel, ou une autre option. */
  requiert: z.enum(['site', 'logiciel']).nullable(),
  requiertOption: z.string().nullable(),
  /** Une seule option de cette famille à la fois (ex. référencement local ou régional). */
  exclusifAvec: z.array(z.string()),
  condition: z.string().nullable(),
  /** Bornes de quantité pour les options à l'unité. */
  quantiteMax: z.number().int().positive().nullable(),
})

const PricingSchema = z.object({
  /** Remise du pack site + logiciel, sur la mise en place et sur l'abonnement. */
  packDiscount: z.number().min(0).max(0.5),
  /** Remise sur l'abonnement payé à l'année. */
  annualDiscount: z.number().min(0).max(0.5),
  /** La mise en place se règle en N fois sans frais, sur les N premiers mois. */
  miseEnPlaceEnFois: z.number().int().min(1).max(12),
  engagementMois: z.number().int().positive(),
  prelevement: z.string(),
  /** Accompagnement au-delà des heures incluses. */
  heureSupplementaire: z.object({ prix: euros, trancheMinutes: z.number().int().positive() }),
  /** Premier rendez-vous en présentiel gratuit jusqu'à N km de Savigné-sur-Lathan. */
  deplacementGratuitKm: z.number().int().positive(),
  /** Développement propre à un seul club : tarif horaire, chiffré avant. */
  developpementSurMesureHeure: euros,
  /** Support : délai de réponse en jours ouvrés. */
  supportJoursOuvres: z.number().int().positive(),
  categories: z.array(CategorieSchema).length(5),
  options: z.array(OptionSchema),
})

export type Categorie = z.infer<typeof CategorieSchema>
export type OptionClub = z.infer<typeof OptionSchema>
export type CategorieId = Categorie['id']
export type Pricing = z.infer<typeof PricingSchema>

const o = (
  id: string,
  nom: string,
  groupe: OptionClub['groupe'],
  miseEnPlace: number | null,
  mensuel: number | null,
  description: string,
  extra: Partial<Pick<OptionClub, 'unite' | 'requiert' | 'requiertOption' | 'exclusifAvec' | 'condition' | 'quantiteMax'>> = {},
): OptionClub => ({ id, nom, groupe, miseEnPlace, mensuel, description, unite: 'forfait', requiert: null, requiertOption: null, exclusifAvec: [], condition: null, quantiteMax: null, ...extra })

const brut = {
  packDiscount: 0.15,
  annualDiscount: 0.1,
  miseEnPlaceEnFois: 3,
  engagementMois: 12,
  prelevement: 'Prélèvement automatique (mandat SEPA)',
  heureSupplementaire: { prix: 40, trancheMinutes: 30 },
  deplacementGratuitKm: 30,
  developpementSurMesureHeure: 50,
  supportJoursOuvres: 7,
  categories: [
    { id: 'mini', nom: 'Mini', licencies: { min: 1, max: 49 }, site: { miseEnPlace: 590, mensuel: 19 }, logiciel: { miseEnPlace: 590, mensuel: 25 }, heures: { site: 1, logiciel: 2, pack: 3 }, stockageGo: 2 },
    { id: 'petit', nom: 'Petit', licencies: { min: 50, max: 149 }, site: { miseEnPlace: 890, mensuel: 25 }, logiciel: { miseEnPlace: 890, mensuel: 35 }, heures: { site: 2, logiciel: 3, pack: 5 }, stockageGo: 5 },
    { id: 'moyen', nom: 'Moyen', licencies: { min: 150, max: 299 }, site: { miseEnPlace: 1190, mensuel: 29 }, logiciel: { miseEnPlace: 1190, mensuel: 45 }, heures: { site: 2, logiciel: 4, pack: 6 }, stockageGo: 10 },
    { id: 'grand', nom: 'Grand', licencies: { min: 300, max: 499 }, site: { miseEnPlace: 1490, mensuel: 35 }, logiciel: { miseEnPlace: 1590, mensuel: 59 }, heures: { site: 3, logiciel: 5, pack: 8 }, stockageGo: 20 },
    { id: 'tres-grand', nom: 'Très grand', licencies: { min: 500, max: null }, site: { miseEnPlace: 1890, mensuel: 45 }, logiciel: { miseEnPlace: 1990, mensuel: 79 }, heures: { site: 3, logiciel: 6, pack: 9 }, stockageGo: 50 },
  ],
  options: [
    o('assistant-ia', 'Assistant IA du club', 'fonction', 190, 19, 'Questions sur les données du club, rédaction d’actualités, de newsletters, de dossiers de subvention et du rapport d’assemblée générale. Un humain valide toujours.', { requiert: 'logiciel', condition: 'Avec le logiciel. Usage plafonné ; au-delà, le coût réel est annoncé avant.' }),
    o('commande-vocale', 'Commande vocale', 'fonction', 90, 9, 'Dicter une demande au lieu de la taper.', { requiertOption: 'assistant-ia', condition: 'Nécessite l’assistant IA.' }),
    o('automatisations-avancees', 'Automatisations avancées', 'fonction', 290, 10, '25 scénarios prêts à l’emploi et 3 scénarios sur mesure.', { requiert: 'logiciel', condition: 'Avec le logiciel.' }),
    o('reservation-courts', 'Réservation de courts en ligne', 'fonction', 290, 12, 'Les membres réservent un court depuis leur téléphone.'),
    o('boutique-club', 'Boutique du club', 'fonction', 390, 15, 'Tenues du club et précommandes groupées.', { condition: 'Frais de paiement à la charge du club.' }),
    o('ecran-club-house', 'Écran club-house', 'fonction', 90, null, 'Le classement en direct sur la télévision du club.', { requiert: 'logiciel', condition: 'Avec le logiciel.' }),
    o('accueil-3d', 'Accueil 3D sur mesure', 'fonction', 900, 5, 'Une scène d’accueil unique au club.', { requiert: 'site', condition: 'Avec le site.' }),
    o('sponsors', 'Sponsors et partenaires', 'fonction', 90, 5, 'Dossier PDF, renouvellements, visibilité des partenaires.', { requiert: 'logiciel', condition: 'Avec le logiciel.' }),
    o('assemblee-generale', 'Assemblée générale et votes en ligne', 'fonction', 90, 5, 'Convocations, émargement et votes en ligne.', { requiert: 'logiciel', condition: 'Avec le logiciel.' }),
    o('subventions', 'Dossiers de subvention', 'fonction', 90, 5, 'Suivi des dossiers, des pièces et des échéances.', { requiert: 'logiciel', condition: 'Avec le logiciel.' }),
    o('plusieurs-lieux', 'Plusieurs lieux ou sections', 'fonction', 190, 10, 'Plusieurs sites de pratique ou plusieurs sections dans le même club.'),
    o('referencement-local', 'Référencement local', 'visibilite', 350, 60, 'Être trouvé dans sa commune et autour.', { requiert: 'site', exclusifAvec: ['referencement-regional'], condition: 'Avec le site.' }),
    o('referencement-regional', 'Référencement régional', 'visibilite', 650, 120, 'Être trouvé dans tout le département.', { requiert: 'site', exclusifAvec: ['referencement-local'], condition: 'Avec le site.' }),
    o('page-supplementaire', 'Page supplémentaire créée à la mise en place', 'contenu', 50, null, 'Au-delà des 15 pages comprises.', { unite: 'page', requiert: 'site', quantiteMax: 100, condition: 'Au-delà des 15 pages comprises.' }),
    o('reprise-contenu', 'Reprise du contenu de l’ancien site', 'contenu', 10, null, 'Reprise des textes et images, par page.', { unite: 'page', requiert: 'site', quantiteMax: 200 }),
    o('redaction-page', 'Rédaction d’une page', 'contenu', 60, null, 'Nous écrivons la page à partir de vos informations.', { unite: 'page', requiert: 'site', quantiteMax: 100 }),
    o('import-source', 'Import d’une source de données supplémentaire', 'service', 150, null, 'Au-delà de la source d’import comprise.', { requiert: 'logiciel' }),
    o('adresses-email', 'Adresses e-mail du club', 'service', 60, null, 'contact@, president@… à votre nom de domaine.', { condition: 'Le coût du service e-mail reste à la charge du club.' }),
    o('copie-autonome', 'Copie autonome du site en cas de départ', 'service', 690, null, 'Une copie du site qui fonctionne sans la plateforme.', { requiert: 'site' }),
  ],
} satisfies z.input<typeof PricingSchema>

export const PRICING: Pricing = PricingSchema.parse(brut)

export const categorieDe = (id: CategorieId): Categorie => PRICING.categories.find((c) => c.id === id)!
export const optionDe = (id: string): OptionClub | undefined => PRICING.options.find((x) => x.id === id)
