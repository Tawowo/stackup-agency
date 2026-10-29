import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Document from '@/gabarits/document/Document'
import { sourceSure } from '@/gabarits/pilier/PilierCorps'
import { JsonLd, ORIGINE, faqPage, filAriane, meta } from '@/lib/seo'
import { RUBRIQUES_LEXIQUE, entree, entreesLiees, toutesLesEntrees } from '@/lib/lexique'
import { SITE } from '@/config/site'

export function generateStaticParams() {
  return toutesLesEntrees().map((e) => ({ slug: e.slug }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const e = toutesLesEntrees().find((x) => x.slug === slug)
  if (!e) return {}
  return { ...meta({ titre: e.seoTitre, description: e.extrait, chemin: `/lexique/${e.slug}` }), keywords: e.motsCles }
}

const dateFr = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const e = await entree((await params).slug)
  if (!e) notFound()
  const rubrique = RUBRIQUES_LEXIQUE.find((r) => r.id === e.rubrique)!
  const liees = entreesLiees(e)
  return (
    <>
      <JsonLd
        data={[
          filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Lexique', chemin: '/lexique' }, { nom: e.terme, chemin: `/lexique/${e.slug}` }]),
          {
            '@context': 'https://schema.org',
            '@type': 'DefinedTerm',
            name: e.terme,
            description: e.definition,
            url: `${ORIGINE}/lexique/${e.slug}`,
            inLanguage: 'fr-FR',
            termCode: e.slug,
            inDefinedTermSet: `${ORIGINE}/lexique#termes`,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: e.titre,
            url: `${ORIGINE}/lexique/${e.slug}`,
            inLanguage: 'fr-FR',
            dateModified: e.maj,
            datePublished: e.date,
            author: { '@type': 'Person', '@id': `${ORIGINE}/#matheo`, name: SITE.fondateur, url: `${ORIGINE}/auteur/matheo-reboul` },
            publisher: { '@id': `${ORIGINE}/#agence` },
          },
          ...(e.faq.length ? [faqPage(e.faq)] : []),
        ]}
      />
      <Document
        moment="lexique-terme"
        ariane={[{ href: '/', nom: 'Accueil' }, { href: '/lexique', nom: 'Lexique' }, { href: `/lexique/${e.slug}`, nom: e.terme }]}
        etiquette={`Lexique · ${rubrique.nom}`}
        titre={e.titre}
        chapo={e.definition}
        maj={dateFr(e.maj)}
        sommaire={e.sommaire}
      >
        <div dangerouslySetInnerHTML={{ __html: e.html }} />
        {e.sources && e.sources.filter(sourceSure).length > 0 && (
          <section aria-labelledby="sources-t">
            <h2 id="sources-t">Sources officielles</h2>
            <ul>
              {e.sources.filter(sourceSure).map((u) => (
                <li key={u}>
                  <a href={sourceSure(u)!} rel="noopener noreferrer" target="_blank">
                    {new URL(sourceSure(u)!).hostname.replace(/^www\./, '')}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
        {liees.length > 0 && (
          <section aria-labelledby="liees-t">
            <h2 id="liees-t">Mots liés</h2>
            <ul>
              {liees.map((l) => (
                <li key={l.slug}>
                  <Link href={`/lexique/${l.slug}`}>{l.terme}</Link> : {l.definition}
                </li>
              ))}
            </ul>
          </section>
        )}
        <p className="su-mono su-doc__maj-fin">
          <Link href="/lexique">Tout le lexique</Link> · <Link href="/auteur/matheo-reboul">{SITE.fondateur}</Link> · mis à jour le {dateFr(e.maj)}
        </p>
      </Document>
    </>
  )
}
