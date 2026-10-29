/**
 * SEO — métadonnées et JSON-LD partagés. Une seule origine : stackup-agency.fr.
 */
import type { Metadata } from 'next'
import { SITE } from '@/config/site'

export const ORIGINE = 'https://stackup-agency.fr'

const MARQUE = ' | Stackup Agency'
/**
 * Titre de page : 60 caractères au plus, la requête en tête, la marque à la fin quand elle tient.
 * `Stackup Agency` complet si possible, sinon `Stackup`, sinon le titre seul (jamais tronqué en plein mot).
 */
export function titreFinal(titre: string): string {
  const t = titre.replace(/\s*[|—–-]\s*Stackup( Agency)?$/i, '').trim()
  if (/stackup/i.test(t)) return t
  if (t.length + MARQUE.length <= 60) return t + MARQUE
  if (t.length + ' | Stackup'.length <= 60) return t + ' | Stackup'
  return t
}
/** Meta description : 155 caractères au plus, coupée à la fin d'un mot. */
export function descriptionFinale(d: string): string {
  const t = d.replace(/\s+/g, ' ').trim()
  if (t.length <= 155) return t
  const coupe = t.slice(0, 154)
  return coupe.slice(0, coupe.lastIndexOf(' ')).replace(/[,;:\s]+$/, '') + '…'
}

export function meta({ titre, description, chemin, image, type = 'website', noindex = false }: { titre: string; description: string; chemin: string; image?: string; type?: 'website' | 'article'; noindex?: boolean }): Metadata {
  const url = `${ORIGINE}${chemin}`
  const t = titreFinal(titre)
  description = descriptionFinale(description)
  return {
    title: { absolute: t },
    description,
    alternates: { canonical: url },
    openGraph: { title: t, description, url, siteName: 'Stackup Agency', locale: 'fr_FR', type, images: [{ url: image ?? '/og.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: t, description },
    robots: noindex ? { index: false, follow: true } : undefined,
  }
}

/** Un champ encore entre crochets (« [SIRET à compléter] ») n'est pas une donnée : il ne sort jamais dans le JSON-LD. */
const renseigne = (v: string) => (v.startsWith('[') ? undefined : v)

export function organisation() {
  const e = SITE.entreprise
  const siret = renseigne(e.siret)
  const debut = renseigne(e.debutActivite)
  const prix = (id: 'une-page' | 'multi-pages' | 'boutique' | 'outil') => SITE.offres.find((o) => o.id === id)!
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${ORIGINE}/#agence`,
    name: 'Stackup Agency',
    legalName: e.identite,
    alternateName: 'Mathéo Reboul EI — Stackup Agency',
    url: ORIGINE,
    logo: `${ORIGINE}/Logo_Stackup-Agency.png`,
    image: `${ORIGINE}/Logo_Stackup-Agency.png`,
    description: 'Agence web d’une personne en Touraine : sites internet, boutiques en ligne et outils de gestion sur mesure pour artisans, commerçants, TPE et professions libérales. Une démo avant de signer.',
    email: SITE.email,
    telephone: SITE.telephoneIntl,
    founder: { '@type': 'Person', '@id': `${ORIGINE}/#matheo`, name: SITE.fondateur, url: `${ORIGINE}/auteur/matheo-reboul` },
    address: { '@type': 'PostalAddress', streetAddress: e.rue, addressLocality: e.commune, postalCode: e.codePostal, addressRegion: 'Centre-Val de Loire', addressCountry: 'FR' },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Indre-et-Loire' },
      { '@type': 'AdministrativeArea', name: 'Loir-et-Cher' },
      { '@type': 'AdministrativeArea', name: 'Maine-et-Loire' },
      { '@type': 'AdministrativeArea', name: 'Sarthe' },
      { '@type': 'AdministrativeArea', name: 'Vienne' },
      { '@type': 'AdministrativeArea', name: 'Indre' },
      { '@type': 'Country', name: 'France' },
    ],
    priceRange: '€€',
    sameAs: Object.values(SITE.social),
    knowsAbout: ['création de site internet', 'référencement naturel', 'référencement local', 'boutique en ligne', 'logiciel de gestion sur mesure', 'facture électronique', 'automatisation'],
    ...(SITE.horaires.length ? { openingHoursSpecification: SITE.horaires } : {}),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Offres Stackup Agency',
      itemListElement: (['une-page', 'multi-pages', 'boutique', 'outil'] as const).map((id) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: prix(id).nom },
        priceCurrency: 'EUR',
        priceSpecification: { '@type': 'PriceSpecification', minPrice: prix(id).aPartirDe, priceCurrency: 'EUR', valueAddedTaxIncluded: false },
      })),
    },
    ...(siret ? { identifier: { '@type': 'PropertyValue', propertyID: 'SIRET', value: siret } } : {}),
    ...(debut ? { foundingDate: debut } : {}),
  }
}

/** Le site lui-même : WebSite avec la recherche interne (/recherche?q=). */
export function siteWeb() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${ORIGINE}/#site`,
    url: ORIGINE,
    name: 'Stackup Agency',
    inLanguage: 'fr-FR',
    publisher: { '@id': `${ORIGINE}/#agence` },
    potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: `${ORIGINE}/recherche?q={search_term_string}` }, 'query-input': 'required name=search_term_string' },
  }
}

/** `offers` d'un Service : prix « à partir de » issu du moteur de devis (jamais écrit à la main). */
export function offreService(id: 'une-page' | 'multi-pages' | 'boutique' | 'outil') {
  const o = SITE.offres.find((x) => x.id === id)!
  return { '@type': 'Offer', priceCurrency: 'EUR', priceSpecification: { '@type': 'PriceSpecification', minPrice: o.aPartirDe, priceCurrency: 'EUR', valueAddedTaxIncluded: false }, availability: 'https://schema.org/InStock', url: `${ORIGINE}/tarifs` }
}

export function filAriane(etapes: { nom: string; chemin: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: etapes.map((e, i) => ({ '@type': 'ListItem', position: i + 1, name: e.nom, item: `${ORIGINE}${e.chemin}` })),
  }
}

export function faqPage(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
}

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}
