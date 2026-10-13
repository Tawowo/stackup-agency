import { notFound } from 'next/navigation'
import { DEPARTEMENTS, getArticles, getDepartement } from '@/data/departements'
import { COMMUNES_PAR_DEPARTEMENT } from '@/data/communes-groupes'
import { VILLES } from '@/data/villes'
import Locale from '@/gabarits/locale/Locale'
import { sansDelai } from '@/gabarits/locale/formes'
import { conforme } from '@/lib/conformite'
import { JsonLd, ORIGINE, faqPage, filAriane, meta } from '@/lib/seo'
import { offre } from '@/config/site'

export const dynamicParams = false
export function generateStaticParams() {
  return DEPARTEMENTS.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const d = getDepartement((await params).slug)
  if (!d) return {}
  const a = getArticles(d.slug)
  return meta({
    titre: `Création de site internet ${a.dans === "l'" ? "dans l'" : 'dans ' + a.dans}${d.nom} (${d.code})`,
    description: `Sites vitrine, boutiques et outils sur mesure pour les entreprises ${a.de}${d.nom}. Site une page à partir de ${offre('une-page').aPartirDe} €. Une démo avant de signer.`,
    chemin: `/agence-web/departement/${d.slug}`,
  })
}

export default async function PageDepartement({ params }: { params: Promise<{ slug: string }> }) {
  const d = getDepartement((await params).slug)
  if (!d) notFound()
  const a = getArticles(d.slug)
  const faq = sansDelai(d.faq.map((f) => ({ q: f.q, a: conforme(f.a) })))
  const villes = VILLES.filter((v) => v.departement === d.nom)
  return (
    <>
      <JsonLd
        data={[
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'Agence web', chemin: '/agence-web' },
            { nom: d.nom, chemin: `/agence-web/departement/${d.slug}` },
          ]),
          { '@context': 'https://schema.org', '@type': 'Service', name: `Création de site internet ${a.dans}${d.nom}`, provider: { '@id': `${ORIGINE}/#agence` }, areaServed: { '@type': 'AdministrativeArea', name: d.nom } },
          faqPage(faq),
        ]}
      />
      <Locale
        moment="loc-dep"
        forme="strates"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/agence-web', nom: 'Agence web' },
          { href: `/agence-web/departement/${d.slug}`, nom: d.nom },
        ]}
        etiquette={`Département ${d.code} · ${d.region}`}
        titre={`Votre site internet, ${a.dans === "l'" ? "dans l'" : 'dans ' + a.dans}${d.nom}.`}
        intro={conforme(d.intro)}
        economie={{ titre: `Ce qui fait vivre ${a.dans}${d.nom}`, texte: conforme(d.economie) }}
        besoins={{ titre: 'Les métiers qui nous sollicitent', items: d.metiersPhares.map((m) => ({ nom: m.metier, detail: m.besoin })) }}
        communes={{ titre: `Les communes ${a.de}${d.nom}`, groupes: COMMUNES_PAR_DEPARTEMENT[d.slug] ?? [] }}
        liens={{ titre: 'Les villes du département', items: villes.map((v) => ({ href: `/agence-web/${v.slug}`, nom: v.ville })) }}
        faq={faq}
      />
    </>
  )
}
