import { notFound } from 'next/navigation'
import { CATEGORIES_METIERS, METIERS, getMetier } from '@/data/metiers'
import { SERVICES } from '@/data/services'
import Locale from '@/gabarits/locale/Locale'
import { FORME_DU_SERVICE, sansDelai } from '@/gabarits/locale/formes'
import { conforme, conformeListe } from '@/lib/conformite'
import { JsonLd, ORIGINE, faqPage, filAriane, meta } from '@/lib/seo'
import { offre } from '@/config/site'

export const dynamicParams = false
export function generateStaticParams() {
  return METIERS.map((m) => ({ metier: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ metier: string }> }) {
  const m = getMetier((await params).metier)
  if (!m) return {}
  return meta({
    titre: `Création de site internet pour ${m.metier.toLowerCase()}`,
    description: conforme(`${m.intro.slice(0, 120)}… Site à partir de ${offre('une-page').aPartirDe} €, une démo avant de signer.`),
    chemin: `/creation-site-internet/${m.slug}`,
  })
}

export default async function PageMetier({ params }: { params: Promise<{ metier: string }> }) {
  const m = getMetier((await params).metier)
  if (!m) notFound()
  const faq = sansDelai(m.faq.map((f) => ({ q: f.q, a: conforme(f.a) })))
  const service = SERVICES[m.serviceLie]
  const proches = METIERS.filter((x) => x.categorie === m.categorie && x.slug !== m.slug).slice(0, 10)
  return (
    <>
      <JsonLd
        data={[
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'Création de site internet', chemin: '/creation-site-internet' },
            { nom: m.metier, chemin: `/creation-site-internet/${m.slug}` },
          ]),
          { '@context': 'https://schema.org', '@type': 'Service', name: `Création de site internet pour ${m.metier.toLowerCase()}`, provider: { '@id': `${ORIGINE}/#agence` }, areaServed: { '@type': 'Country', name: 'France' } },
          faqPage(faq),
        ]}
      />
      <Locale
        moment="loc-metier"
        forme={FORME_DU_SERVICE[m.serviceLie] ?? 'page'}
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/creation-site-internet', nom: 'Par métier' },
          { href: `/creation-site-internet/${m.slug}`, nom: m.metier },
        ]}
        etiquette={CATEGORIES_METIERS[m.categorie] ?? 'Métier'}
        titre={`Le site internet de votre ${m.metier.toLowerCase().replace(/s$/, '')}.`.replace('votre votre', 'votre')}
        intro={conforme(m.intro)}
        fonctions={{ titre: 'Ce qu’on y met', items: conformeListe(m.inclus).map((nom) => ({ nom })) }}
        liens={{
          titre: 'Pour aller plus loin',
          items: [...(service ? [{ href: `/services/${m.serviceLie}`, nom: service.title, note: 'l’offre' }] : []), { href: '/realisations', nom: 'Les démos', note: 'galerie' }, ...proches.map((p) => ({ href: `/creation-site-internet/${p.slug}`, nom: p.metier }))],
        }}
        faq={faq}
      />
    </>
  )
}
