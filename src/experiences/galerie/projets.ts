/**
 * Les réalisations exposées : deux projets réels, avec leurs vraies captures d'écran
 * (ordinateur et téléphone) préparées par scripts/realisations-captures.mjs.
 * Aucune démonstration fictive : un site en ligne et un logiciel en développement.
 */
import { CAPTURES } from '@/config/captures.generated'

export type Statut = 'En ligne' | 'En développement'

export interface Ecran {
  /** Les captures, dans l'ordre d'affichage, toutes au même ratio. */
  images: { fichier: string; largeur: number; hauteur: number; legende: string }[]
  /** La bande verticale (captures empilées + la première répétée) lue par la scène 3D. */
  bande: { fichier: string; cases: number; largeur: number; hauteur: number } | null
  /** Aucune capture fournie : l'interface montre un emplacement neutre. */
  manquant: boolean
}

export interface Projet {
  slug: string
  nom: string
  statut: Statut
  type: string
  accent: string
  url: string
  /** Texte du lien principal. */
  action: string
  description: string
  /** Ce que la réalisation démontre, en trois phrases. */
  atouts: { titre: string; texte: string }[]
  fonctionnalites: string[]
  note?: string
  bureau: Ecran
  mobile: Ecran
  /** Image d'aperçu (réseaux, données structurées). */
  capture: string
}

type Famille = 'bureau' | 'mobile'
const ecran = (slug: keyof typeof CAPTURES.projets, famille: Famille, legendes: string[]): Ecran => {
  const c = CAPTURES.projets[slug][famille]
  return {
    manquant: c.manquant,
    images: c.images.map((im, i) => ({ fichier: im.fichier, largeur: im.largeur, hauteur: im.hauteur, legende: legendes[i] ?? '' })),
    bande: c.bande ? { fichier: c.bande.fichier, cases: c.bande.cases, largeur: c.bande.largeur, hauteur: c.bande.hauteur } : null,
  }
}

export const RATIO_BUREAU = CAPTURES.ratio.bureau
export const RATIO_MOBILE = CAPTURES.ratio.mobile

const tennis = ecran('tennis-club-savigne-gizeux', 'bureau', ['Page d’accueil du site', 'Le menu « Plus » ouvert sur la page de connexion'])
const tennisMobile = ecran('tennis-club-savigne-gizeux', 'mobile', ['Page du pickleball au club', 'Adhésion : le choix de la formule', 'La boutique du club : le tee-shirt'])
const artibox = ecran('logiciel-gestion-artisans', 'bureau', ['Tableau de bord', 'Prix des fournisseurs', 'Statistiques'])
const artiboxMobile = ecran('logiciel-gestion-artisans', 'mobile', ['Planning de la journée', 'Chantiers en kanban', 'Pilotage, en mode sombre'])

export const PROJETS: Projet[] = [
  {
    slug: 'tennis-club-savigne-gizeux',
    nom: 'Tennis Club Savigné-Gizeux',
    statut: 'En ligne',
    type: 'Site de club sportif',
    accent: '#B5451B',
    url: 'https://tennis-club-savigne-gizeux.fr',
    action: 'Visiter le site',
    description:
      'Le site du club de tennis de Savigné-sur-Lathan, Gizeux et Cléré-les-Pins : un site très complet, de nombreuses pages, des animations qui le mettent en valeur et un référencement travaillé.',
    atouts: [
      { titre: 'Un site très complet', texte: 'Le club, les équipes, les compétitions, le calendrier, la réservation, l’adhésion, la boutique du club, la galerie, les documents : de nombreuses pages, toutes reliées par un menu clair.' },
      { titre: 'Des animations qui le valorisent', texte: 'La page d’accueil est mise en scène : le mouvement est là pour donner envie, jamais pour gêner la lecture.' },
      { titre: 'Un référencement travaillé', texte: 'Le site est pensé pour être trouvé par les habitants du secteur qui cherchent un club près de chez eux.' },
    ],
    fonctionnalites: [
      'Menu complet sur deux niveaux, au clavier comme au toucher',
      'Connexion à un espace membre, avec accès rapide sans compte',
      'Le Challenge du club : badges, présences, classement',
      'Réservation des terrains',
      'Adhésion en ligne : choix de la formule, aides acceptées, paiement en plusieurs fois',
      'Boutique du club : précommande du tee-shirt, toutes tailles',
      'Journées découverte et pages dédiées (pickleball)',
      'Actualités, blog, calendrier et galerie',
      'Pages équipes, compétitions, installations, sponsors et partenaires',
      'Espace bureau, documents et contact',
    ],
    bureau: tennis,
    mobile: tennisMobile,
    capture: tennis.images[0]?.fichier ?? '/og.png',
  },
  {
    slug: 'logiciel-gestion-artisans',
    nom: 'Artibox',
    statut: 'En développement',
    type: 'Logiciel de gestion pour artisans',
    accent: '#2D6A5C',
    url: 'https://demo-hub-gestion-artisan.vercel.app/',
    action: 'Tester la démo',
    description:
      'Le logiciel maison de Stackup : devis, factures, chantiers, planning et statistiques dans un seul outil, pour un artisan qui veut piloter son activité à l’atelier comme sur le chantier.',
    atouts: [
      { titre: 'Ce qui compte, en premier', texte: 'Chaque matin, l’outil classe ce qu’il faut faire par montant en jeu et par urgence : une facture en retard passe avant un devis à relancer.' },
      { titre: 'Du bureau au chantier', texte: 'Le même outil s’utilise sur ordinateur et sur téléphone : tableau de bord, planning de l’équipe, chantiers, devis et factures.' },
      { titre: 'Des alertes utiles', texte: 'Facture impayée, devis qui expire, marge d’un chantier qui dérape, conflit de planning : l’outil prévient avant que ça coûte.' },
    ],
    fonctionnalites: [
      'Tableau de bord : chiffre d’affaires, devis en attente, chantiers en cours, impayés',
      'Liste « À faire aujourd’hui » classée par montant et par urgence, et alertes',
      'Clients, devis, factures et catalogue de prestations',
      'Fournisseurs : les prix qui ont augmenté, la dépense par fournisseur',
      'Planning jour, mois et équipe, avec détection des conflits',
      'Chantiers en kanban ou en liste : avancement, équipe, météo',
      'Statistiques : conversion des devis, répartition du chiffre d’affaires, meilleurs clients, délai de paiement',
      'Pilotage : santé de l’entreprise et file des éléments à valider',
      'Mode sombre, recherche rapide, notifications',
      'Utilisable sur téléphone, avec simulation de coupure réseau',
    ],
    note: 'Les données affichées (clients, montants, chantiers) sont fictives. Le logiciel est en cours de développement.',
    bureau: artibox,
    mobile: artiboxMobile,
    capture: artibox.images[0]?.fichier ?? '/og.png',
  },
]

export const projetDe = (slug: string) => PROJETS.find((p) => p.slug === slug)
