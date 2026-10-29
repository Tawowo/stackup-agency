/**
 * DONNÉES STRUCTURÉES CENTRALISÉES — un seul endroit pour les noeuds schema.org du site.
 * Les `@id` sont stables : `#agence` (ProfessionalService), `#matheo` (Person), `#site` (WebSite). Chaque page y renvoie
 * par `{ '@id': … }` (provider, author, publisher, worksFor) au lieu de recopier l'entreprise.
 * Les champs inconnus (horaires, coordonnées, profils) ne sortent jamais : voir seo/TODO-HUMAIN.md.
 */
import { SITE } from '@/config/site'
import { organisation, siteWeb, ORIGINE } from './seo'

export const ID = {
  agence: `${ORIGINE}/#agence`,
  personne: `${ORIGINE}/#matheo`,
  site: `${ORIGINE}/#site`,
}

const sansContexte = <T extends object>(o: T) => {
  const { ['@context']: _c, ...reste } = o as T & { '@context'?: string }
  void _c
  return reste
}

/** Mathéo Reboul : le fondateur, entité de référence (E-E-A-T). Pas de date de naissance ni d'âge. */
export function personne() {
  return {
    '@type': 'Person',
    '@id': ID.personne,
    name: SITE.fondateur,
    givenName: 'Mathéo',
    familyName: 'Reboul',
    jobTitle: 'Fondateur de Stackup Agency, développeur web',
    url: `${ORIGINE}/auteur/matheo-reboul`,
    mainEntityOfPage: `${ORIGINE}/a-propos`,
    image: `${ORIGINE}/images/portrait-fondateur.webp`,
    worksFor: { '@id': ID.agence },
    address: { '@type': 'PostalAddress', addressLocality: SITE.entreprise.commune, postalCode: SITE.entreprise.codePostal, addressRegion: 'Centre-Val de Loire', addressCountry: 'FR' },
    knowsAbout: ['développement web', 'création de site internet', 'Next.js et React', 'référencement naturel et local', 'logiciel de gestion sur mesure', 'facture électronique', 'automatisation des tâches administratives'],
    sameAs: Object.values(SITE.social),
  }
}

/** Le graphe global (toutes les pages) : ProfessionalService + Person + WebSite, liés par @id. */
export function grapheGlobal() {
  return { '@context': 'https://schema.org', '@graph': [sansContexte(organisation()), personne(), sansContexte(siteWeb())] }
}

type OffreId = 'une-page' | 'multi-pages' | 'boutique' | 'outil'
const offreDe = (id: OffreId) => SITE.offres.find((o) => o.id === id)!
const offre = (id: OffreId) => ({ '@type': 'Offer', priceCurrency: 'EUR', priceSpecification: { '@type': 'PriceSpecification', minPrice: offreDe(id).aPartirDe, priceCurrency: 'EUR', valueAddedTaxIncluded: false }, availability: 'https://schema.org/InStock', url: `${ORIGINE}/tarifs` })

/** Application métier (solutions de gestion, Artibox) : SoftwareApplication avec prix « à partir de ». */
export function logiciel(o: { nom: string; description: string; chemin: string; offre?: OffreId; prixMin?: number; image?: string; categorie?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${ORIGINE}${o.chemin}#logiciel`,
    name: o.nom,
    description: o.description,
    url: `${ORIGINE}${o.chemin}`,
    applicationCategory: o.categorie ?? 'BusinessApplication',
    operatingSystem: 'Web (tous navigateurs)',
    inLanguage: 'fr-FR',
    author: { '@id': ID.agence },
    publisher: { '@id': ID.agence },
    ...(o.image ? { image: `${ORIGINE}${o.image}` } : {}),
    offers: o.prixMin
      ? { '@type': 'Offer', priceCurrency: 'EUR', priceSpecification: { '@type': 'PriceSpecification', minPrice: o.prixMin, priceCurrency: 'EUR', valueAddedTaxIncluded: false }, url: `${ORIGINE}/tarifs` }
      : offre(o.offre ?? 'outil'),
  }
}

/** Outil gratuit en ligne : WebApplication (gratuit, aucun compte). */
export function outilGratuit(o: { nom: string; description: string; chemin: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${ORIGINE}${o.chemin}#outil`,
    name: o.nom,
    description: o.description,
    url: `${ORIGINE}${o.chemin}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web (tous navigateurs)',
    inLanguage: 'fr-FR',
    isAccessibleForFree: true,
    author: { '@id': ID.agence },
    publisher: { '@id': ID.agence },
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'EUR' },
  }
}

/** Service d'une page : fournisseur par @id, zone, public visé (métier), prix « à partir de » du moteur de devis. */
export function service(o: { nom: string; chemin: string; description?: string; type?: string; offre?: OffreId; audience?: string; zone?: 'locale' | 'nationale' }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${ORIGINE}${o.chemin}#service`,
    name: o.nom,
    url: `${ORIGINE}${o.chemin}`,
    ...(o.description ? { description: o.description } : {}),
    serviceType: o.type ?? 'Création de sites internet et d’outils de gestion sur mesure',
    provider: { '@id': ID.agence },
    areaServed: [{ '@type': 'AdministrativeArea', name: 'Indre-et-Loire' }, { '@type': 'Country', name: 'France' }],
    ...(o.audience ? { audience: { '@type': 'BusinessAudience', audienceType: o.audience } } : {}),
    offers: offre(o.offre ?? 'une-page'),
  }
}

/** Réalisation : CreativeWork lié à l'agence, avec le site client et sa capture. */
export function realisation(o: { nom: string; chemin: string; description: string; image: string; url?: string; genre?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${ORIGINE}${o.chemin}#realisation`,
    name: o.nom,
    url: `${ORIGINE}${o.chemin}`,
    description: o.description,
    image: `${ORIGINE}${o.image}`,
    creator: { '@id': ID.agence },
    author: { '@id': ID.personne },
    about: o.genre ?? 'Site internet et outil de gestion sur mesure',
    inLanguage: 'fr-FR',
    ...(o.url ? { sameAs: o.url } : {}),
  }
}
