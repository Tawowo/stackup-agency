/**
 * SOURCE UNIQUE du contenu commercial (PROMPT-REFONTE § 12).
 * Prix toujours « à partir de », calculés par le moteur à partir de l'Excel. Aucune durée
 * fixe (seul un délai indicatif du moteur), aucun comparatif, aucun « hébergement France »,
 * aucune offre association.
 */
import { PRIX_PUBLICS as P } from './prix-publics.generated.ts'
import { COMPANY, adresseComplete } from './company.ts'

const aPartirDe = (id: keyof typeof P.offres) => P.offres[id]
const description = (code: keyof typeof P.descriptions) => P.descriptions[code]

export type IdOffre = 'une-page' | 'multi-pages' | 'boutique' | 'outil'

export interface Offre {
  id: IdOffre
  nom: string
  aPartirDe: number
  inclus: readonly string[]
}

export const SITE = {
  nom: 'Stackup Agency',
  url: 'https://stackup-agency.fr',
  fondateur: 'Mathéo Reboul',
  /** Commune de l'atelier (adresse réelle). Tours n'est pas l'adresse : c'est la métropole voisine, desservie sur place ou à distance. */
  ville: 'Savigné-sur-Lathan',
  departement: 'Indre-et-Loire',
  email: 'contact@stackup-agency.fr',
  /** Téléphone : affichage, lien tel: et forme internationale (JSON-LD). */
  telephone: '07 64 02 08 98',
  telephoneLien: 'tel:+33764020898',
  telephoneIntl: '+33764020898',
  /** Conditions de fabrication : les nombres viennent de l'Excel (Paramètres, Parcours client). */
  conditions: {
    acomptePourcent: P.acomptePourcent,
    soldePourcent: 100 - P.acomptePourcent,
    /** Séries de modifications sur la maquette (P06). */
    revisionsIncluses: P.seriesIncluses,
    /** Rendez-vous de finalisation inclus (P04). */
    rendezVousInclus: P.rdvInclus,
    /** Un mois d'ajustements après la mise en ligne (P07). */
    supportJours: 30,
    /** Tarif horaire au-delà de ce qui est inclus (P05). */
    tarifHoraire: P.tarifHoraire,
    /** Indemnité forfaitaire de recouvrement entre professionnels (art. D.441-5 du Code de commerce). */
    indemniteRecouvrement: 40,
  },
  /** Horaires d'ouverture (données structurées) : à renseigner par le propriétaire, au format schema.org OpeningHoursSpecification. Vide = non publié. */
  horaires: [] as { '@type': 'OpeningHoursSpecification'; dayOfWeek: string[]; opens: string; closes: string }[],
  social: {
    linkedin: 'https://www.linkedin.com/in/stackup-agency-5756943aa/',
    instagram: 'https://www.instagram.com/stackup.agency/',
    facebook: 'https://www.facebook.com/profile.php?id=61588724591496',
  },
  /** Offres : prix = configuration minimale passée dans le moteur (jamais écrit à la main). */
  offres: [
    {
      id: 'une-page',
      nom: 'Site une page',
      aPartirDe: aPartirDe('une-page'),
      inclus: [description('L01'), 'Page d’accueil sur mesure, au niveau d’animation de votre choix', 'Autres pages et fonctionnalités à la carte', 'Nom de domaine offert la première année'],
    },
    {
      id: 'multi-pages',
      nom: 'Site multi-pages',
      aPartirDe: aPartirDe('multi-pages'),
      inclus: ['Autant de pages que nécessaire, chacune à son niveau', `Pages moins chères à partir de la ${P.pleinTarifJusqua + 1}e`, 'Blog, galerie, rendez-vous… à la carte', 'Référencement local au choix', 'Nom de domaine offert la première année'],
    },
    {
      id: 'boutique',
      nom: 'Boutique en ligne',
      aPartirDe: aPartirDe('boutique'),
      inclus: [description('B00'), 'Catalogue : à l’unité ou importé depuis un fichier', 'Click & collect, points relais… en option'],
    },
    {
      id: 'outil',
      nom: 'Outil de gestion sur mesure',
      aPartirDe: aPartirDe('outil'),
      inclus: [description('O00'), `${P.nbModulesOutil} modules au choix, selon votre métier`, 'Vos données vous appartiennent'],
    },
  ] as const satisfies readonly Offre[],
  mentions: { tva: COMPANY.tva, devisValable: '30 jours' },
  /**
   * IDENTITÉ LÉGALE — lue dans src/config/company.ts (source unique). Mentions légales, devis et documents PDF
   * (`npm run documents`) passent par ici. Les champs entre crochets restent à compléter par le propriétaire.
   */
  entreprise: {
    identite: COMPANY.denomination,
    exploitant: COMPANY.nom,
    forme: COMPANY.forme,
    nomCommercial: COMPANY.nomCommercial,
    nomCommercialRegistre: COMPANY.nomCommercialRegistre,
    adresse: adresseComplete(false),
    rue: COMPANY.adresse.rue,
    codePostal: COMPANY.adresse.codePostal,
    commune: COMPANY.adresse.commune,
    siren: COMPANY.siren,
    siret: COMPANY.siret,
    ape: `${COMPANY.ape} — ${COMPANY.apeLibelle}`,
    immatriculation: `${COMPANY.immatriculation.registre}, le ${COMPANY.immatriculation.date}`,
    /** Date d'immatriculation au RNE (données structurées : foundingDate). */
    debutActivite: COMPANY.immatriculation.dateIso,
    mediateur: '[Médiateur de la consommation à compléter : nom, adresse postale et site internet]',
    assurance: '[Assurance responsabilité civile professionnelle à compléter : assureur et couverture géographique]',
  },
  /** Documents PDF : version, date, et mention de relecture (`documentsValides: true` la retire). */
  documents: {
    version: '1.0',
    dateVersion: '15 octobre 2026',
    documentsValides: false,
    mentionRelecture: 'Modèle à faire valider par un professionnel du droit avant usage',
  },
  /**
   * PARRAINAGE — quatre formules au choix du parrain. Chaque montant est un paramètre ici ; les pages, le
   * formulaire et le règlement PDF le lisent. Les montants se calculent hors abonnement, sur la création signée.
   */
  parrainage: {
    argent: { pourcent: 8, minimum: 50, maximum: 400 },
    credit: { pourcent: 15, moisValidite: 18 },
    abonnement: { seuil1: 1500, mois1: 2, seuil2: 3000, mois2: 4 },
    partage: { parrainPourcent: 5, filleulPourcent: 5 },
    fidelite: { filleuls: 3, cadeau: 'un audit de référencement ou une page supplémentaire offerte' },
  },
} as const

export function offre(id: IdOffre): Offre {
  return SITE.offres.find((o) => o.id === id)!
}

const euros = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 })

/** Toute mention de prix dans l'interface passe ici : « à partir de X € ». */
export function formatAPartirDe(o: Offre | number): string {
  const n = typeof o === 'number' ? o : o.aPartirDe
  return `à partir de ${euros.format(n)} €`
}
