/**
 * SEO — métadonnées et JSON-LD partagés. Une seule origine : stackup-agency.fr.
 */
import type { Metadata } from 'next'
import { SITE } from '@/config/site'

export const ORIGINE = 'https://stackup-agency.fr'

export function meta({ titre, description, chemin, image, type = 'website', noindex = false }: { titre: string; description: string; chemin: string; image?: string; type?: 'website' | 'article'; noindex?: boolean }): Metadata {
  const url = `${ORIGINE}${chemin}`
  return {
    title: titre,
    description,
    alternates: { canonical: url },
    openGraph: { title: titre, description, url, siteName: 'Stackup Agency', locale: 'fr_FR', type, images: [{ url: image ?? '/og.png', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: titre, description },
    robots: noindex ? { index: false, follow: true } : undefined,
  }
}

/** Un champ encore entre crochets (« [SIRET à compléter] ») n'est pas une donnée : il ne sort jamais dans le JSON-LD. */
const renseigne = (v: string) => (v.startsWith('[') ? undefined : v)

export function organisation() {
  const e = SITE.entreprise
  const siret = renseigne(e.siret)
  const debut = renseigne(e.debutActivite)
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${ORIGINE}/#agence`,
    name: 'Stackup Agency',
    legalName: e.identite,
    url: ORIGINE,
    logo: `${ORIGINE}/Logo_Stackup-Agency.png`,
    image: `${ORIGINE}/Logo_Stackup-Agency.png`,
    email: SITE.email,
    telephone: SITE.telephoneIntl,
    founder: { '@type': 'Person', name: SITE.fondateur, url: `${ORIGINE}/a-propos` },
    address: { '@type': 'PostalAddress', streetAddress: e.rue, addressLocality: e.commune, postalCode: e.codePostal, addressRegion: 'Centre-Val de Loire', addressCountry: 'FR' },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Indre-et-Loire' },
      { '@type': 'AdministrativeArea', name: 'Centre-Val de Loire' },
      { '@type': 'AdministrativeArea', name: 'Pays de la Loire' },
    ],
    priceRange: '€€',
    ...(siret ? { identifier: { '@type': 'PropertyValue', propertyID: 'SIRET', value: siret } } : {}),
    ...(debut ? { foundingDate: debut } : {}),
  }
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
