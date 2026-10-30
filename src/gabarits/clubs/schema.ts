/**
 * DONNÉES STRUCTURÉES DE L'OFFRE « CLUBS DE TENNIS » — Service, SoftwareApplication, AggregateOffer (prix « à partir de »
 * en EUR, lus dans pricing.ts), HowTo. Le fournisseur est toujours l'agence (`#agence`, src/lib/schema.ts).
 */
import { ORIGINE } from '@/lib/seo'
import { ID } from '@/lib/schema'
import { PRODUCT_NAME, RACINE_CLUBS } from '@/config/offre-clubs'
import { CATEGORIES, tarif, type Formule } from '@/data/offre-clubs/pricing'

const NOMS: Record<Formule, string> = { site: `${PRODUCT_NAME} — le site du club`, logiciel: `${PRODUCT_NAME} — le logiciel du bureau`, pack: `${PRODUCT_NAME} — site + logiciel` }

/** Une offre « à partir de » : abonnement mensuel (prix principal), la mise en place en offre jointe ; catégorie la plus petite. */
export function offreFormule(f: Formule) {
  const t = tarif(CATEGORIES[0]!, f)
  return {
    '@type': 'Offer',
    name: NOMS[f],
    url: `${ORIGINE}${RACINE_CLUBS}/tarifs`,
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    seller: { '@id': ID.agence },
    priceSpecification: { '@type': 'UnitPriceSpecification', name: 'Abonnement mensuel (à partir de)', minPrice: t.mois, priceCurrency: 'EUR', unitCode: 'MON', referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' }, valueAddedTaxIncluded: false },
    addOn: { '@type': 'Offer', name: 'Mise en place (à partir de)', priceCurrency: 'EUR', priceSpecification: { '@type': 'PriceSpecification', minPrice: t.miseEnPlace, priceCurrency: 'EUR', valueAddedTaxIncluded: false } },
  }
}

/** Les trois formules, en offre agrégée (abonnement mensuel le plus bas / le plus haut). */
export function offreAgregee() {
  const mois = CATEGORIES.flatMap((c) => (['site', 'logiciel', 'pack'] as const).map((f) => tarif(c, f).mois))
  return {
    '@type': 'AggregateOffer',
    priceCurrency: 'EUR',
    lowPrice: Math.min(...mois),
    highPrice: Math.max(...mois),
    offerCount: 3,
    offers: (['site', 'logiciel', 'pack'] as const).map(offreFormule),
  }
}

export function serviceClubs(o: { nom: string; chemin: string; description: string; formule?: Formule; zone?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${ORIGINE}${o.chemin}#service`,
    name: o.nom,
    url: `${ORIGINE}${o.chemin}`,
    description: o.description,
    serviceType: 'Site internet et logiciel de gestion pour clubs de tennis',
    provider: { '@id': ID.agence },
    audience: { '@type': 'Audience', audienceType: 'Clubs de tennis associatifs (sections padel et pickleball comprises)' },
    areaServed: o.zone ? [{ '@type': 'AdministrativeArea', name: o.zone }, { '@type': 'Country', name: 'France' }] : [{ '@type': 'Country', name: 'France' }],
    offers: offreFormule(o.formule ?? 'site'),
  }
}

export function logicielClubs(chemin = RACINE_CLUBS) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${ORIGINE}${RACINE_CLUBS}#logiciel`,
    name: PRODUCT_NAME,
    description: 'Le site d’un club de tennis et le logiciel de son bureau, connectés en direct : adhésions et réinscriptions en ligne, paiement HelloAsso, école de tennis, Challenge interne, équipes, import et export des fichiers ADOC, espace membre et parent.',
    url: `${ORIGINE}${chemin}`,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Gestion de club sportif',
    operatingSystem: 'Web (tous navigateurs), installable sur téléphone',
    inLanguage: 'fr-FR',
    author: { '@id': ID.agence },
    publisher: { '@id': ID.agence },
    image: `${ORIGINE}/clubs-de-tennis/demo/bureau-journee-bureau.avif`,
    screenshot: [`${ORIGINE}/clubs-de-tennis/demo/site-accueil-bureau.avif`, `${ORIGINE}/clubs-de-tennis/demo/bureau-journee-bureau.avif`, `${ORIGINE}/clubs-de-tennis/demo/espace-parent-mobile.avif`],
    offers: offreAgregee(),
  }
}

export function howTo(nom: string, etapes: { titre: string; texte: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: nom,
    step: etapes.map((e, i) => ({ '@type': 'HowToStep', position: i + 1, name: e.titre, text: e.texte })),
  }
}
