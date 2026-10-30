/**
 * DONNÉES STRUCTURÉES DE L'OFFRE CLUBS — Service + AggregateOffer (prix « à partir de », lus dans pricing.ts), SoftwareApplication, HowTo.
 * Même @id d'entreprise que le reste du site : un seul ProfessionalService, jamais une copie.
 */
import { ID } from './schema'
import { ORIGINE } from './seo'
import { jetons } from './jetons'
import { PRICING } from '@/data/offre-clubs/pricing'
import { ETAPES_MISE_EN_PLACE } from '@/data/offre-clubs/contenu'
import { prixPack } from '@/domain/clubs/calcul'
import { PRODUCT_NAME, CLUBS } from '@/config/offre-clubs'

const cats = PRICING.categories
const abos = cats.map((c) => prixPack(c).mensuel)
const mini = Math.min(...cats.map((c) => Math.min(c.site.mensuel, c.logiciel.mensuel)))
const maxi = Math.max(...abos)

/** AggregateOffer : de l'abonnement le plus bas (site, catégorie Mini) au plus haut (site + logiciel, catégorie Très grand). */
function offres() {
  return {
    '@type': 'AggregateOffer',
    priceCurrency: 'EUR',
    lowPrice: mini,
    highPrice: maxi,
    offerCount: cats.length * 3,
    offers: cats.map((c) => ({
      '@type': 'Offer',
      name: `${PRODUCT_NAME}, catégorie ${c.nom}, site + logiciel`,
      priceCurrency: 'EUR',
      priceSpecification: [
        { '@type': 'UnitPriceSpecification', name: 'Abonnement mensuel à partir de', price: prixPack(c).mensuel, priceCurrency: 'EUR', unitCode: 'MON', valueAddedTaxIncluded: false },
        { '@type': 'PriceSpecification', name: 'Mise en place à partir de', minPrice: prixPack(c).miseEnPlace, priceCurrency: 'EUR', valueAddedTaxIncluded: false },
      ],
      url: `${ORIGINE}${CLUBS}/tarifs`,
    })),
  }
}

export function serviceClubs(o?: { chemin?: string; nom?: string; description?: string }) {
  const chemin = o?.chemin ?? CLUBS
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${ORIGINE}${chemin}#service`,
    name: o?.nom ?? `${PRODUCT_NAME} : site internet et logiciel de gestion pour clubs de tennis`,
    url: `${ORIGINE}${chemin}`,
    description: jetons(o?.description ?? 'Le site du club et le logiciel du bureau, connectés en direct, par abonnement : adhésions en ligne, école de tennis, paiements HelloAsso, challenge interne, import et export des fichiers ADOC.'),
    serviceType: 'Site internet et logiciel de gestion par abonnement pour clubs de tennis, de padel et de pickleball',
    provider: { '@id': ID.agence },
    areaServed: [{ '@type': 'AdministrativeArea', name: 'Centre-Val de Loire' }, { '@type': 'AdministrativeArea', name: 'Indre-et-Loire' }, { '@type': 'Country', name: 'France' }],
    audience: { '@type': 'Audience', audienceType: 'Clubs de tennis, de padel et de pickleball (associations sportives)' },
    offers: offres(),
  }
}

export function logicielClubs() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${ORIGINE}${CLUBS}#logiciel`,
    name: PRODUCT_NAME,
    description: 'Plateforme en ligne pour clubs de tennis : site internet du club, logiciel de gestion du bureau, espace membre et parent.',
    url: `${ORIGINE}${CLUBS}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web (tous navigateurs), installable sur téléphone',
    inLanguage: 'fr-FR',
    author: { '@id': ID.agence },
    publisher: { '@id': ID.agence },
    offers: offres(),
  }
}

export function howToMiseEnPlace() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `Comment se passe la mise en place de ${PRODUCT_NAME} dans un club`,
    step: ETAPES_MISE_EN_PLACE.map((e, i) => ({ '@type': 'HowToStep', position: i + 1, name: jetons(e.titre), text: jetons(e.texte) })),
  }
}

export function articleGuide(g: { titre: string; extrait: string; date: string; maj: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: g.titre,
    description: g.extrait,
    datePublished: g.date,
    dateModified: g.maj,
    inLanguage: 'fr-FR',
    author: { '@id': ID.personne },
    publisher: { '@id': ID.agence },
    mainEntityOfPage: `${ORIGINE}${CLUBS}/guides/${g.slug}`,
    about: { '@id': `${ORIGINE}${CLUBS}#service` },
  }
}
