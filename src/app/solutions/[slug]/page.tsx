import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import FicheSolution from '@/gabarits/FicheSolution'
import { SOLUTIONS } from '@/data/solutions'
import { METIERS } from '@/data/metiers'
import { LIGNES } from '@/config/tarifs.generated'
import { prixOutilAvec } from '@/domain/devis/offres'
import { conforme, conformeListe } from '@/lib/conformite'
import { meta, filAriane, faqPage, JsonLd, ORIGINE } from '@/lib/seo'
import { logiciel } from '@/lib/schema'
import { CONTENU_SOLUTIONS } from '@/data/solutions-contenu'
import { liensPublies } from '@/lib/liens-publies'
import { PRIX_PUBLICS } from '@/config/prix-publics.generated'

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const sol = SOLUTIONS.find((x) => x.slug === slug)
  if (!sol) return {}
  return meta({ titre: `${sol.nom} sur mesure — module d’outil de gestion | Stackup Agency`, description: conforme(sol.intro).slice(0, 158), chemin: `/solutions/${slug}` })
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
  const contenu = liensPublies(CONTENU_SOLUTIONS[slug])
  const faq = [...sol.faq, ...(contenu?.faq ?? [])].map((f) => ({ q: conforme(f.q), a: conforme(f.a) }))
  return (
    <main>
      <JsonLd
        data={[
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'Outils de gestion', chemin: '/solutions' },
            { nom: sol.nom, chemin: `/solutions/${slug}` },
          ]),
          { '@context': 'https://schema.org', '@type': 'Service', name: sol.nom, description: conforme(sol.intro), provider: { '@id': `${ORIGINE}/#agence` }, offers: { '@type': 'Offer', priceCurrency: 'EUR', priceSpecification: { '@type': 'PriceSpecification', minPrice: prixOutilAvec(sol.codes.slice(0, 1)), priceCurrency: 'EUR' } } },
          logiciel({ nom: sol.nom, description: conforme(sol.intro), chemin: `/solutions/${slug}`, prixMin: prixOutilAvec(sol.codes.slice(0, 1)) }),
          faqPage(faq),
        ]}
      />
      <FicheSolution
        s={{
          slug,
          nom: sol.nom,
          intro: conforme(sol.intro),
          situations: conformeListe(sol.situations),
          fonctionnalites: conformeListe(sol.fonctionnalites),
          dansLaDemo: sol.dansLaDemo,
          modules: sol.codes.map((c) => {
            const l = LIGNES.find((x) => x.code === c)!
            return { code: c, libelle: l.libelle, description: l.description }
          }),
          prix: prixOutilAvec(sol.codes.slice(0, 1)),
          abonnementMin: PRIX_PUBLICS.abonnementMin,
          sections: contenu?.sections.map((x) => ({ titre: conforme(x.titre), paragraphes: x.paragraphes.map(conforme) })),
          faq,
          metiers,
          voisines,
        }}
      />
    </main>
  )
}
