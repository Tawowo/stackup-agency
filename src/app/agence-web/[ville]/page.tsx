import { notFound } from 'next/navigation'
import { VILLES, getVille } from '@/data/villes'
import { DEPARTEMENTS } from '@/data/departements'
import Locale from '@/gabarits/locale/Locale'
import { sansDelai } from '@/gabarits/locale/formes'
import { conforme } from '@/lib/conformite'
import { JsonLd, ORIGINE, faqPage, filAriane, meta } from '@/lib/seo'
import { SITE, offre } from '@/config/site'

export const dynamicParams = false
export function generateStaticParams() {
  return VILLES.map((v) => ({ ville: v.slug }))
}

const slugDe = (nom: string) => VILLES.find((v) => v.ville === nom)?.slug

export async function generateMetadata({ params }: { params: Promise<{ ville: string }> }) {
  const v = getVille((await params).ville)
  if (!v) return {}
  return meta({
    titre: `Agence web à ${v.ville} — sites et outils sur mesure`,
    description: `Création de site internet à ${v.ville} (${v.departement}) : site vitrine à partir de ${offre('une-page').aPartirDe} €, boutique, outils de gestion. Une démo avant de signer.`,
    chemin: `/agence-web/${v.slug}`,
  })
}

export default async function PageVille({ params }: { params: Promise<{ ville: string }> }) {
  const v = getVille((await params).ville)
  if (!v) notFound()
  const dep = DEPARTEMENTS.find((d) => d.nom === v.departement)
  const faq = sansDelai([
    { q: `Travaillez-vous avec des entreprises de ${v.ville} ?`, a: `Oui. L'atelier est à ${SITE.ville} ; on échange en visio, par téléphone ou sur place quand c'est utile. Les prix sont les mêmes partout.` },
    { q: `Combien coûte un site internet à ${v.ville} ?`, a: `Un site une page à partir de ${offre('une-page').aPartirDe} €, un site de plusieurs pages à partir de ${offre('multi-pages').aPartirDe} €, une boutique à partir de ${offre('boutique').aPartirDe} €. Le devis précis dépend de votre projet.` },
    { q: 'Puis-je voir mon site avant de m’engager ?', a: 'Oui : on vous montre une première version avant toute signature. Vous décidez ensuite.' },
  ])
  const voisins = v.villesVoisines.map((n) => ({ nom: n, href: slugDe(n) ? `/agence-web/${slugDe(n)}` : '' })).filter((l) => l.href)
  return (
    <>
      <JsonLd
        data={[
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'Agence web', chemin: '/agence-web' },
            { nom: v.ville, chemin: `/agence-web/${v.slug}` },
          ]),
          { '@context': 'https://schema.org', '@type': 'Service', name: `Création de site internet à ${v.ville}`, provider: { '@id': `${ORIGINE}/#agence` }, areaServed: { '@type': 'City', name: v.ville } },
          faqPage(faq),
        ]}
      />
      <Locale
        moment="loc-ville"
        forme="empile"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/agence-web', nom: 'Agence web' },
          { href: `/agence-web/${v.slug}`, nom: v.ville },
        ]}
        etiquette={`${v.departement} · ${v.region}`}
        titre={`Agence web à ${v.ville}`}
        intro={`Des sites et des outils sur mesure pour les artisans, commerçants et petites entreprises de ${v.ville}. Une démo avant de signer, un prix « à partir de » annoncé d’entrée.`}
        economie={{ titre: `L’économie de ${v.ville}`, texte: conforme(v.economie), secteurs: v.secteurs }}
        liens={{
          titre: 'Autour de vous',
          items: [...voisins, ...(dep ? [{ href: `/agence-web/departement/${dep.slug}`, nom: `Tout le département`, note: dep.code }] : [])],
        }}
        faq={faq}
      />
    </>
  )
}
