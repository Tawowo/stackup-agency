import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Lecture from '@/experiences/journal/Lecture'
import Action from '@/components/ui/Action'
import { article, articlesLies, rayonDe, tousLesArticles } from '@/lib/blog'
import { meta, filAriane, faqPage, JsonLd, ORIGINE } from '@/lib/seo'
import { SITE } from '@/config/site'
import '@/experiences/journal/journal.css'
import '@/experiences/journal/lecture.css'

// Les articles programmés (publishAt) paraissent à leur date sans redéploiement.
export const revalidate = 43200

export function generateStaticParams() {
  return tousLesArticles().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const a = tousLesArticles().find((x) => x.slug === slug)
  if (!a) return {}
  return { ...meta({ titre: `${a.titre} | Stackup Agency`, description: a.extrait.slice(0, 160), chemin: `/blog/${slug}`, type: 'article' }), keywords: a.motsCles }
}

const dateFr = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = await article(slug)
  if (!a) notFound()
  const r = rayonDe(a.categorie)
  const lies = articlesLies(a)
  return (
    <main className="su-lec" data-moment="lecture" data-nuit="0">
      <JsonLd
        data={[
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'Blog', chemin: '/blog' },
            { nom: r.nom, chemin: `/blog/categorie/${r.id}` },
            { nom: a.titre, chemin: `/blog/${slug}` },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: a.titre,
            description: a.extrait,
            datePublished: a.date,
            dateModified: a.maj ?? a.date,
            author: { '@type': 'Person', name: SITE.fondateur },
            publisher: { '@id': `${ORIGINE}/#agence` },
            mainEntityOfPage: `${ORIGINE}/blog/${slug}`,
            keywords: a.motsCles.join(', '),
          },
          ...(a.faq.length ? [faqPage(a.faq)] : []),
        ]}
      />
      <header className="su-lec__tete" data-moment="lecture-tete" data-nuit="1">
        <div className="su-lec__tete-grille">
          <nav className="su-mono su-lec__ariane" aria-label="Fil d’Ariane">
            <Link href="/blog">Blog</Link> <span aria-hidden="true">/</span> <Link href={`/blog/categorie/${r.id}`}>{r.nom}</Link>
          </nav>
          <h1 className="su-display su-lec__titre">{a.titre}</h1>
          <p className="su-lec__chapo">{a.extrait}</p>
          <p className="su-mono su-lec__meta">
            {SITE.fondateur} · {a.maj ? `mis à jour le ${dateFr(a.maj)}` : dateFr(a.date)} · {a.lecture} min de lecture
          </p>
        </div>
      </header>
      <div data-moment="lecture-corps" data-nuit="0">
        <Lecture sommaire={a.sommaire}>
          <div className="su-prose" dangerouslySetInnerHTML={{ __html: a.html }} />
          <aside className="su-lec__cta su-plaque">
            <p className="su-display">Un site ou un outil pour votre métier ?</p>
            <p>Une démo avant de signer, un prix écrit avant de commencer.</p>
            <Action href="/contact">Parler de votre projet</Action>
          </aside>
        </Lecture>
        {lies.length > 0 && (
          <nav className="su-lec__lies" aria-label="Articles du même rayon">
            <p className="su-mono">Dans le même rayon</p>
            <ul>
              {lies.map((l) => (
                <li key={l.slug}>
                  <Link href={`/blog/${l.slug}`}>{l.titre}</Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </main>
  )
}
