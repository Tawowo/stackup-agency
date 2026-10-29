import { nombreFr } from '@/lib/jetons'
import { notFound } from 'next/navigation'
import { VILLES, getVille } from '@/data/villes'
import { DEPARTEMENTS } from '@/data/departements'
import Locale from '@/gabarits/locale/Locale'
import CarteRelief from '@/components/carte/CarteRelief'
import { epinglesVille } from '@/components/carte/epingles'
import { GEO } from '@/data/geo'
import { sansDelai } from '@/gabarits/locale/formes'
import { conforme } from '@/lib/conformite'
import { CONTENU_VILLES } from '@/data/enrichissements'
import { liensPublies } from '@/lib/liens-publies'
import { JsonLd, ORIGINE, faqPage, filAriane, meta, offreService } from '@/lib/seo'
import { SITE, offre } from '@/config/site'

export const dynamicParams = false
export function generateStaticParams() {
  return VILLES.map((v) => ({ ville: v.slug }))
}


export async function generateMetadata({ params }: { params: Promise<{ ville: string }> }) {
  const v = getVille((await params).ville)
  if (!v) return {}
  return meta({
    titre: `Agence web à ${v.ville} — sites et outils sur mesure`,
    description: `Création de site internet à ${v.ville} (${v.departement}) : site vitrine à partir de ${nombreFr(offre('une-page').aPartirDe)} €, boutique, outils de gestion. Une démo avant de signer.`,
    chemin: `/agence-web/${v.slug}`,
  })
}

export default async function PageVille({ params }: { params: Promise<{ ville: string }> }) {
  const v = getVille((await params).ville)
  if (!v) notFound()
  const dep = DEPARTEMENTS.find((d) => d.nom === v.departement)
  const local = liensPublies(CONTENU_VILLES[v.slug])
  const faq = sansDelai([
    { q: `Travaillez-vous avec des entreprises de ${v.ville} ?`, a: `Oui. L'atelier est à ${SITE.ville} ; on échange en visio, par téléphone ou sur place quand c'est utile. Les prix sont les mêmes partout.` },
    { q: `Combien coûte un site internet à ${v.ville} ?`, a: `Un site une page à partir de ${nombreFr(offre('une-page').aPartirDe)} €, un site de plusieurs pages à partir de ${nombreFr(offre('multi-pages').aPartirDe)} €, une boutique à partir de ${nombreFr(offre('boutique').aPartirDe)} €. Le devis précis dépend de votre projet.` },
    { q: 'Puis-je voir mon site avant de m’engager ?', a: 'Oui : on vous montre une première version avant toute signature. Vous décidez ensuite.' },
    ...(local?.faq ?? []),
  ])
  // `villesVoisines` donne des slugs ; la carte complète avec les villes les plus proches (distance à vol d'oiseau).
  const g0 = GEO[v.slug]
  const proches = g0
    ? VILLES.filter((x) => x.slug !== v.slug && GEO[x.slug])
        .map((x) => ({ x, d: Math.hypot(GEO[x.slug]!.lat - g0.lat, (GEO[x.slug]!.lon - g0.lon) * 0.68) }))
        .sort((p, q) => p.d - q.d)
        .slice(0, 5)
        .map((o) => o.x.slug)
    : []
  const slugsVoisins = [...new Set([...v.villesVoisines, ...proches])].filter((sl) => VILLES.some((x) => x.slug === sl)).slice(0, 7)
  const epingles = epinglesVille(
    v.slug,
    slugsVoisins.map((sl) => ({ slug: sl, nom: VILLES.find((x) => x.slug === sl)!.ville, href: `/agence-web/${sl}` })),
  )
  const voisins = slugsVoisins.map((sl) => ({ nom: VILLES.find((x) => x.slug === sl)!.ville, href: `/agence-web/${sl}` }))
  return (
    <>
      <JsonLd
        data={[
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'Agence web', chemin: '/agence-web' },
            { nom: v.ville, chemin: `/agence-web/${v.slug}` },
          ]),
          { '@context': 'https://schema.org', '@type': 'Service', name: `Création de site internet à ${v.ville}`, provider: { '@id': `${ORIGINE}/#agence` }, areaServed: { '@type': 'City', name: v.ville }, offers: offreService('une-page') },
          faqPage(faq),
        ]}
      />
      <Locale
        moment="loc-ville"
        monde={<CarteRelief epingles={epingles} libelle={`Carte de ${v.ville} et des villes voisines`} />}
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/agence-web', nom: 'Agence web' },
          { href: `/agence-web/${v.slug}`, nom: v.ville },
        ]}
        etiquette={`${v.departement} · ${v.region}`}
        titre={`Agence web à ${v.ville}`}
        intro={`Des sites et des outils sur mesure pour les artisans, commerçants et petites entreprises de ${v.ville}. Une démo avant de signer, un prix « à partir de » annoncé d’entrée.`}
        economie={{ titre: `L’économie de ${v.ville}`, texte: conforme(v.economie), secteurs: v.secteurs }}
        sections={local?.sections}
        liens={{
          titre: 'Autour de vous',
          items: [...voisins, ...(dep ? [{ href: `/agence-web/departement/${dep.slug}`, nom: `Tout le département`, note: dep.code }] : [])],
        }}
        faq={faq}
      />
    </>
  )
}
