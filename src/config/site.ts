/**
 * SOURCE UNIQUE du contenu commercial (PROMPT-REFONTE § 12).
 * Prix toujours « à partir de », calculés par le moteur à partir de l'Excel. Aucune durée
 * fixe (seul un délai indicatif du moteur), aucun comparatif, aucun « hébergement France »,
 * aucune offre association.
 */
import { PRIX_PUBLICS as P } from './prix-publics.generated.ts'

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
  ville: 'Tours',
  departement: 'Indre-et-Loire',
  email: 'contact@stackup-agency.fr',
  telephone: '',
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
  },
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
  mentions: { tva: 'TVA non applicable, art. 293 B du CGI', devisValable: '30 jours' },
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
