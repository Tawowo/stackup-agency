import { notFound } from 'next/navigation'
import { DEPARTEMENTS, getArticles, getDepartement } from '@/data/departements'
import { COMMUNES_PAR_DEPARTEMENT } from '@/data/communes-groupes'
import { VILLES } from '@/data/villes'
import Locale from '@/gabarits/locale/Locale'
import CarteRelief from '@/components/carte/CarteRelief'
import type { Epingle } from '@/components/carte/epingles'
import { CHEF_LIEU, GEO } from '@/data/geo'
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
  const cl = GEO[CHEF_LIEU[d.slug] ?? '']
  const epingles: Epingle[] = cl ? [{ id: CHEF_LIEU[d.slug]!, nom: cl.nom, lat: cl.lat, lon: cl.lon, role: 'cible' }] : []
  for (const v of villes) {
    const g = GEO[v.slug]
    if (g && v.slug !== CHEF_LIEU[d.slug]) epingles.push({ id: v.slug, nom: g.nom, lat: g.lat, lon: g.lon, role: 'voisin', href: `/agence-web/${v.slug}` })
  }
  // Repères : les chefs-lieux voisins, pour situer le département.
  for (const [slug, cle] of Object.entries(CHEF_LIEU)) {
    const g = GEO[cle]
    if (slug !== d.slug && g && cl && Math.hypot((g.lat - cl.lat) * 1, (g.lon - cl.lon) * 0.68) < 1.3 && !epingles.some((e) => e.id === cle)) epingles.push({ id: cle, nom: g.nom, lat: g.lat, lon: g.lon, role: 'repere', href: `/agence-web/departement/${slug}` })
  }
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
        monde={<CarteRelief epingles={epingles} libelle={`Carte du département ${d.nom}`} />}
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
