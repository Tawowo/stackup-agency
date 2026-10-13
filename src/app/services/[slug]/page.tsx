import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import FicheService from '@/gabarits/FicheService'
import { SERVICES } from '@/data/services'
import { PROGRAMMES } from '@/experiences/compil/programmes'
import { SITE } from '@/config/site'
import { meta, filAriane, faqPage, JsonLd, ORIGINE } from '@/lib/seo'

export function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const s = SERVICES[slug]
  if (!s) return {}
  return meta({ titre: `${s.title} sur mesure — Stackup Agency`, description: s.metaDesc, chemin: `/services/${slug}` })
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = SERVICES[slug]
  const prog = PROGRAMMES.find((p) => p.slug === slug)
  if (!s || !prog) notFound()
  const prix = SITE.offres.find((o) => o.id === prog.offre)!.aPartirDe
  const autres = PROGRAMMES.filter((p) => p.slug !== slug).map((p) => ({ slug: p.slug, titre: SERVICES[p.slug]!.title }))
  return (
    <main>
      <JsonLd
        data={[
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'Services', chemin: '/services' },
            { nom: s.title, chemin: `/services/${slug}` },
          ]),
          { '@context': 'https://schema.org', '@type': 'Service', name: s.title, description: s.metaDesc, provider: { '@id': `${ORIGINE}/#agence` }, areaServed: 'FR', offers: { '@type': 'Offer', priceCurrency: 'EUR', price: prix, priceSpecification: { '@type': 'PriceSpecification', minPrice: prix, priceCurrency: 'EUR' } } },
          faqPage(s.faq),
        ]}
      />
      <FicheService slug={slug} service={s} forme={prog.forme} prix={prix} autres={autres} />
    </main>
  )
}
