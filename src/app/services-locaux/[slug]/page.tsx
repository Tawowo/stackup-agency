import { notFound } from 'next/navigation'
import { SERVICES_LOCAUX } from '@/data/services-locaux'
import Locale from '@/gabarits/locale/Locale'
import MondeService from '@/components/mondes/MondeService'
import MondeSerp from '@/components/mondes/MondeSerp'
import { sansDelai } from '@/gabarits/locale/formes'
import { conforme } from '@/lib/conformite'
import { JsonLd, ORIGINE, faqPage, filAriane, meta, offreService } from '@/lib/seo'

const MAQUETTE: Record<string, 'page' | 'multi' | 'boutique' | 'logiciel'> = {
  'creation-site-restaurant': 'page',
  'creation-site-artisan': 'page',
  'creation-site-commerce': 'multi',
  'creation-boutique-en-ligne': 'boutique',
  'developpement-application-metier': 'logiciel',
}

export const dynamicParams = false
export function generateStaticParams() {
  return Object.keys(SERVICES_LOCAUX).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const s = SERVICES_LOCAUX[slug]
  if (!s) return {}
  return meta({ titre: s.metaTitle, description: conforme(s.metaDesc.replace(/ Dès /, ' À partir de ')), chemin: `/services-locaux/${slug}` })
}

export default async function PageServiceLocal({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const s = SERVICES_LOCAUX[slug]
  if (!s) notFound()
  const faq = sansDelai(s.faq.map((f) => ({ q: f.q, a: conforme(f.a) })))
  const autres = Object.entries(SERVICES_LOCAUX).filter(([k]) => k !== slug)
  return (
    <>
      <JsonLd
        data={[
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'Services', chemin: '/services' },
            { nom: s.title, chemin: `/services-locaux/${slug}` },
          ]),
          { '@context': 'https://schema.org', '@type': 'Service', name: s.title, provider: { '@id': `${ORIGINE}/#agence` }, description: conforme(s.solution.desc), offers: offreService('une-page') },
          faqPage(faq),
        ]}
      />
      <Locale
        moment="loc-service"
        monde={slug === 'referencement-local-seo' ? <MondeSerp /> : <MondeService maquette={MAQUETTE[slug] ?? 'page'} />}
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/services', nom: 'Services' },
          { href: `/services-locaux/${slug}`, nom: s.title },
        ]}
        etiquette={s.title}
        titre={s.hero.headline}
        intro={conforme(s.hero.subheadline)}
        points={{ titre: s.problem.title, items: s.problem.points.map(conforme) }}
        economie={{ titre: s.solution.title, texte: conforme(s.solution.desc) }}
        fonctions={{ titre: 'Ce qu’on y met', items: s.features.map((f) => ({ nom: f.title, detail: conforme(f.desc) })) }}
        liens={{ titre: 'Les autres besoins', items: autres.map(([k, v]) => ({ href: `/services-locaux/${k}`, nom: v.title })) }}
        faq={faq}
        appel="Demander un devis"
      />
    </>
  )
}
