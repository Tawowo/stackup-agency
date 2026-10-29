/**
 * LES ROUTES — source unique du sitemap, du plan du site et des sondes QA.
 */
import { VILLES } from '@/data/villes'
import { DEPARTEMENTS } from '@/data/departements'
import { METIERS } from '@/data/metiers'
import { SOLUTIONS } from '@/data/solutions'
import { SERVICES } from '@/data/services'
import { SERVICES_LOCAUX } from '@/data/services-locaux'
import { PROJETS } from '@/experiences/galerie/projets'
import { RAYONS, tousLesArticles } from '@/lib/blog'
import { ZONES } from '@/data/zones'

export interface Route {
  chemin: string
  nom: string
  groupe: 'principal' | 'offre' | 'outils' | 'local' | 'journal' | 'legal'
  priorite: number
}

export const PAGES_FIXES: Route[] = [
  { chemin: '/', nom: 'Accueil', groupe: 'principal', priorite: 1 },
  { chemin: '/realisations', nom: 'Réalisations', groupe: 'principal', priorite: 0.9 },
  { chemin: '/services', nom: 'Services', groupe: 'principal', priorite: 0.9 },
  { chemin: '/services/referencement', nom: 'Référencement', groupe: 'offre', priorite: 0.8 },
  { chemin: '/solutions', nom: 'Outils de gestion', groupe: 'principal', priorite: 0.9 },
  { chemin: '/tarifs', nom: 'Tarifs', groupe: 'principal', priorite: 0.9 },
  { chemin: '/a-propos', nom: 'À propos', groupe: 'principal', priorite: 0.7 },
  { chemin: '/contact', nom: 'Contact', groupe: 'principal', priorite: 0.8 },
  { chemin: '/faq', nom: 'Questions fréquentes', groupe: 'offre', priorite: 0.6 },
  { chemin: '/services/creation-de-site-internet', nom: 'Création de site internet', groupe: 'offre', priorite: 0.9 },
  { chemin: '/services/refonte-de-site-internet', nom: 'Refonte de site internet', groupe: 'offre', priorite: 0.8 },
  { chemin: '/services/referencement-local', nom: 'Référencement local', groupe: 'offre', priorite: 0.8 },
  { chemin: '/services/logiciel-de-gestion', nom: 'Logiciel de gestion sur mesure', groupe: 'offre', priorite: 0.8 },
  { chemin: '/services/ia-et-automatisation', nom: 'IA et automatisation', groupe: 'offre', priorite: 0.7 },
  { chemin: '/services/facture-electronique', nom: 'Facture électronique', groupe: 'offre', priorite: 0.8 },
  { chemin: '/services/maintenance', nom: 'Maintenance de site internet', groupe: 'offre', priorite: 0.7 },
  { chemin: '/comparatif/wix-wordpress-sur-mesure', nom: 'Wix, WordPress ou sur mesure', groupe: 'offre', priorite: 0.6 },
  { chemin: '/comparatif/shopify-ou-boutique-sur-mesure', nom: 'Shopify ou boutique sur mesure', groupe: 'offre', priorite: 0.6 },
  { chemin: '/comparatif/obat-tolteck-logiciel-sur-mesure', nom: 'Obat, Tolteck ou logiciel sur mesure', groupe: 'offre', priorite: 0.6 },
  { chemin: '/stackup-agency-en-bref', nom: 'Stackup Agency en bref', groupe: 'principal', priorite: 0.7 },
  { chemin: '/auteur/matheo-reboul', nom: 'Mathéo Reboul, auteur', groupe: 'principal', priorite: 0.4 },
  { chemin: '/parrainage', nom: 'Parrainage', groupe: 'offre', priorite: 0.4 },
  { chemin: '/outils', nom: 'Outils gratuits', groupe: 'outils', priorite: 0.6 },
  { chemin: '/outils/audit-site', nom: 'Audit de site', groupe: 'outils', priorite: 0.6 },
  { chemin: '/outils/generateur-mentions-legales', nom: 'Générateur de mentions légales', groupe: 'outils', priorite: 0.6 },
  { chemin: '/outils/modele-devis', nom: 'Modèle de devis', groupe: 'outils', priorite: 0.6 },
  { chemin: '/outils/calculateur-clients-perdus', nom: 'Calculateur de clients perdus', groupe: 'outils', priorite: 0.6 },
  { chemin: '/outils/checklist-facture-electronique', nom: 'Checklist facture électronique', groupe: 'outils', priorite: 0.6 },
  { chemin: '/ressources', nom: 'Ressources', groupe: 'outils', priorite: 0.5 },
  { chemin: '/ressources/cahier-des-charges', nom: 'Cahier des charges', groupe: 'outils', priorite: 0.5 },
  { chemin: '/ressources/documents', nom: 'Documents PDF', groupe: 'outils', priorite: 0.5 },
  { chemin: '/agence-web', nom: 'Agence web : les villes', groupe: 'local', priorite: 0.6 },
  { chemin: '/creation-site-internet', nom: 'Création de site par métier', groupe: 'local', priorite: 0.6 },
  { chemin: '/zones-intervention', nom: 'Zones d’intervention', groupe: 'local', priorite: 0.5 },
  { chemin: '/blog', nom: 'Le journal', groupe: 'journal', priorite: 0.7 },
  { chemin: '/mentions-legales', nom: 'Mentions légales', groupe: 'legal', priorite: 0.2 },
  { chemin: '/cgv', nom: 'Conditions générales de vente', groupe: 'legal', priorite: 0.2 },
  { chemin: '/politique-confidentialite', nom: 'Politique de confidentialité', groupe: 'legal', priorite: 0.2 },
  { chemin: '/cookies', nom: 'Cookies', groupe: 'legal', priorite: 0.2 },
  { chemin: '/plan-du-site', nom: 'Plan du site', groupe: 'legal', priorite: 0.3 },
]

export function routesDynamiques(): Route[] {
  const articles = tousLesArticles()
  // Une page de catégorie par rayon ; les anciennes catégories redirigent vers leur rayon.
  // Une rubrique n'entre au sitemap qu'avec au moins 3 articles publiés : en dessous, la page est trop mince (elle reste accessible, en noindex).
  const categories = new Set(RAYONS.filter((r) => articles.filter((a) => r.categories.includes(a.categorie)).length >= 3).map((r) => r.id))
  return [
    ...PROJETS.map((p) => ({ chemin: `/realisations/${p.slug}`, nom: `Réalisation — ${p.nom}`, groupe: 'principal' as const, priorite: 0.7 })),
    ...Object.entries(SERVICES).map(([slug, s]) => ({ chemin: `/services/${slug}`, nom: s.title, groupe: 'offre' as const, priorite: 0.8 })),
    ...SOLUTIONS.map((s) => ({ chemin: `/solutions/${s.slug}`, nom: s.nom, groupe: 'offre' as const, priorite: 0.7 })),
    ...Object.entries(SERVICES_LOCAUX).map(([slug, s]) => ({ chemin: `/services-locaux/${slug}`, nom: s.title, groupe: 'offre' as const, priorite: 0.6 })),
    ...ZONES.map((z) => ({ chemin: `/zones-intervention/${z.slug}`, nom: `Zone : ${z.court}`, groupe: 'local' as const, priorite: 0.6 })),
    ...VILLES.map((v) => ({ chemin: `/agence-web/${v.slug}`, nom: `Agence web à ${v.ville}`, groupe: 'local' as const, priorite: 0.6 })),
    ...DEPARTEMENTS.map((d) => ({ chemin: `/agence-web/departement/${d.slug}`, nom: `${d.nom} (${d.code})`, groupe: 'local' as const, priorite: 0.5 })),
    ...METIERS.map((m) => ({ chemin: `/creation-site-internet/${m.slug}`, nom: m.metier, groupe: 'local' as const, priorite: 0.5 })),
    ...[...categories].map((c) => ({ chemin: `/blog/categorie/${c}`, nom: c, groupe: 'journal' as const, priorite: 0.4 })),
    ...articles.map((a) => ({ chemin: `/blog/${a.slug}`, nom: a.titre, groupe: 'journal' as const, priorite: 0.5 })),
  ]
}

export const toutesLesRoutes = () => [...PAGES_FIXES, ...routesDynamiques()]

/** Famille de sitemap (un fichier par type de page). */
export type FamilleSitemap = 'pages' | 'services' | 'metiers' | 'zones' | 'ressources'
export const FAMILLES_SITEMAP: FamilleSitemap[] = ['pages', 'services', 'metiers', 'zones', 'ressources']
export function familleSitemap(chemin: string): FamilleSitemap {
  if (chemin.startsWith('/creation-site-internet')) return 'metiers'
  if (chemin.startsWith('/agence-web') || chemin.startsWith('/zones-intervention')) return 'zones'
  if (chemin.startsWith('/blog') || chemin.startsWith('/ressources')) return 'ressources'
  if (chemin.startsWith('/services') || chemin.startsWith('/solutions') || chemin.startsWith('/comparatif') || chemin.startsWith('/outils') || chemin.startsWith('/tarifs')) return 'services'
  return 'pages'
}
