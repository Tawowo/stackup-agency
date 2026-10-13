import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import FicheSolution from '@/gabarits/FicheSolution'
import { SOLUTIONS } from '@/data/solutions'
import { METIERS } from '@/data/metiers'
import { MODULES } from '@/experiences/machines/modules'
import { conforme, conformeListe } from '@/lib/conformite'
import { meta, filAriane, faqPage, JsonLd, ORIGINE } from '@/lib/seo'

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const sol = SOLUTIONS.find((x) => x.slug === slug)
  if (!sol) return {}
  return meta({ titre: `${sol.nom} sur mesure — outil de gestion | Stackup Agency`, description: conforme(sol.intro).slice(0, 158), chemin: `/solutions/${slug}` })
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const sol = SOLUTIONS.find((x) => x.slug === slug)
  if (!sol) notFound()
  const i = SOLUTIONS.indexOf(sol)
  const voisines = [1, 2, 3].map((k) => SOLUTIONS[(i + k) % SOLUTIONS.length]!).map((v) => ({ slug: v.slug, nom: v.nom }))
  const metiers = sol.metiersCibles
    .map((m) => METIERS.find((x) => x.slug === m))
    .filter((m): m is NonNullable<typeof m> => !!m)
    .map((m) => ({ slug: m.slug, nom: m.metier.charAt(0).toUpperCase() + m.metier.slice(1) }))
  const faq = sol.faq.map((f) => ({ q: conforme(f.q), a: conforme(f.a) }))
  return (
    <main>
      <JsonLd
        data={[
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'Outils de gestion', chemin: '/solutions' },
            { nom: sol.nom, chemin: `/solutions/${slug}` },
          ]),
          { '@context': 'https://schema.org', '@type': 'Service', name: sol.nom, description: conforme(sol.intro), provider: { '@id': `${ORIGINE}/#agence` }, offers: { '@type': 'Offer', priceCurrency: 'EUR', priceSpecification: { '@type': 'PriceSpecification', minPrice: 1447, priceCurrency: 'EUR' } } },
          faqPage(faq),
        ]}
      />
      <FicheSolution
        s={{
          slug,
          nom: sol.nom,
          intro: conforme(sol.intro),
          problemes: conformeListe(sol.problemes),
          fonctionnalites: conformeListe(sol.fonctionnalites),
          avantages: conformeListe(sol.avantages),
          contexte: conforme(sol.exempleContexte),
          faq,
          metiers,
          module: MODULES.findIndex((m) => m.slug === slug),
          voisines,
        }}
      />
    </main>
  )
}
