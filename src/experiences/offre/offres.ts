import { SITE, type IdOffre } from '@/config/site'
import type { LayoutName } from '@/webgl/layouts'
import type { LigneFiche } from '@/components/ui/Fiche'

export interface OffreScene {
  id: IdOffre
  layout: LayoutName
  pose: { x: number; y: number }
  projection: number
  fiche: LigneFiche[]
  /** Maquette HTML : dalles qui se métamorphosent en une vraie interface. */
  maquette: 'page' | 'multi' | 'boutique' | 'logiciel'
}

export const OFFRES_SCENE: OffreScene[] = [
  {
    id: 'une-page',
    layout: 'page',
    pose: { x: 0, y: 0 },
    projection: 1,
    maquette: 'page',
    fiche: [
      { cle: 'Type', valeur: 'Site une page' },
      { cle: 'Pages', valeur: '1 + mentions légales' },
      { cle: 'Fonctions', valeur: 'Formulaire, référencement local' },
      { cle: 'Hébergement', valeur: '12 mois inclus, SSL' },
      { cle: 'Domaine', valeur: 'Offert la 1re année' },
      { cle: 'Code', valeur: 'Propriétaire' },
    ],
  },
  {
    id: 'multi-pages',
    layout: 'multi',
    pose: { x: 0, y: 0 },
    projection: 1,
    maquette: 'multi',
    fiche: [
      { cle: 'Type', valeur: 'Site multi-pages' },
      { cle: 'Pages', valeur: 'Jusqu’à 10' },
      { cle: 'Fonctions', valeur: 'Blog, galerie, formulaires avancés, statistiques' },
      { cle: 'Hébergement', valeur: '12 mois inclus, SSL' },
      { cle: 'Domaine', valeur: 'Offert la 1re année' },
      { cle: 'Code', valeur: 'Propriétaire' },
    ],
  },
  {
    id: 'boutique',
    layout: 'boutique',
    pose: { x: 0, y: 0 },
    projection: 1,
    maquette: 'boutique',
    fiche: [
      { cle: 'Type', valeur: 'Boutique en ligne' },
      { cle: 'Pages', valeur: 'Catalogue, fiches produit, panier' },
      { cle: 'Fonctions', valeur: 'Paiement, stocks, e-mails, click & collect' },
      { cle: 'Hébergement', valeur: '12 mois inclus, SSL' },
      { cle: 'Code', valeur: 'Propriétaire' },
    ],
  },
  {
    id: 'outil',
    layout: 'logiciel',
    pose: { x: 0, y: 0 },
    projection: 1,
    maquette: 'logiciel',
    fiche: [
      { cle: 'Type', valeur: 'Outil de gestion sur mesure' },
      { cle: 'Modules', valeur: 'Selon votre métier' },
      { cle: 'Accès', valeur: 'Espace d’administration, formation' },
      { cle: 'Données', valeur: 'À vous, exportables' },
      { cle: 'Abonnement', valeur: 'Aucun obligatoire' },
      { cle: 'Code', valeur: 'Propriétaire' },
    ],
  },
]

export function offreDe(id: IdOffre) {
  return SITE.offres.find((o) => o.id === id)!
}
