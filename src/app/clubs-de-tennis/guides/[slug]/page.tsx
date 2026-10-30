/** Un guide pour clubs : Markdown (src/content/clubs-guides), même gabarit de lecture que le journal. */
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Lecture from '@/experiences/journal/Lecture'
import Action from '@/components/ui/Action'
import { guide, guides, fonctionnalite, metaClubs } from '@/lib/clubs'
import { faqPage, filAriane, JsonLd, ORIGINE } from '@/lib/seo'
import { articleGuide, serviceClubs } from '@/lib/schema-clubs'
import { SITE } from '@/config/site'
import { CLUBS, MENTION_FFT } from '@/config/offre-clubs'
import '@/experiences/journal/journal.css'
import '@/components/editorial/editorial.css'
import '@/experiences/journal/lecture.css'

export const dynamicParams = false

export function generateStaticParams() {
  return guides().map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const g = guides().find((x) => x.slug === slug)
  if (!g) return {}
  return { ...metaClubs({ titre: g.seoTitre, description: g.extrait, chemin: `${CLUBS}/guides/${slug}`, type: 'article' }), keywords: g.motsCles }
}

const dateFr = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const g = await guide(slug)
  if (!g) notFound()
  const liees = g.fonctionnalites.map((s) => fonctionnalite(s)).filter((x): x is NonNullable<typeof x> => !!x)
  const autres = guides().filter((x) => x.slug !== slug).slice(0, 3)
  return (
    <main className="su-lec" data-moment="lecture" data-nuit="0">
      <JsonLd
        data={[
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'Clubs de tennis', chemin: CLUBS },
            { nom: 'Guides', chemin: `${CLUBS}/guides` },
            { nom: g.titre, chemin: `${CLUBS}/guides/${slug}` },
          ]),
          { ...articleGuide(g), wordCount: g.mots, keywords: g.motsCles.join(', '), image: `${ORIGINE}/og.png` },
          serviceClubs(),
          ...(g.faq.length ? [faqPage(g.faq)] : []),
        ]}
      />
      <header className="su-lec__tete" data-moment="lecture-tete" data-nuit="1">
        <div className="su-lec__tete-grille">
          <nav className="su-mono su-lec__ariane" aria-label="Fil d’Ariane">
            <Link href={CLUBS}>Clubs de tennis</Link> <span aria-hidden="true">/</span> <Link href={`${CLUBS}/guides`}>Guides</Link>
          </nav>
          <h1 className="su-display su-lec__titre">{g.titre}</h1>
          <p className="su-lec__chapo">{g.extrait}</p>
          <p className="su-mono su-lec__meta">
            <Link href="/auteur/matheo-reboul">{SITE.fondateur}</Link> · mis à jour le {dateFr(g.maj)} · {g.lecture} min de lecture
          </p>
        </div>
      </header>
      <div data-moment="lecture-corps" data-nuit="0">
        <Lecture sommaire={g.sommaire}>
          <div className="su-prose" dangerouslySetInnerHTML={{ __html: g.html }} />
          <aside className="su-lec__cta su-plaque">
            <p className="su-display">Voyez ce que cela donnerait pour votre club</p>
            <p>Une démo en ligne, un simulateur de prix, un appel gratuit : à votre rythme.</p>
            <Action href={`${CLUBS}/simulateur`}>Estimer le prix pour mon club</Action>
            <Action href={`${CLUBS}/demo`} variante="contour" evt="clubs_clic_demo">
              Voir la démo
            </Action>
          </aside>
          <p className="su-prose" style={{ fontSize: '0.875rem' }}>
            {MENTION_FFT}
          </p>
        </Lecture>
        <nav className="su-lec__lies" aria-label="À lire ensuite">
          <p className="su-mono">À lire ensuite</p>
          <ul>
            {liees.map((f) => (
              <li key={f.slug}>
                <Link href={`${CLUBS}/fonctionnalites/${f.slug}`}>{f.nom}</Link>
              </li>
            ))}
            {autres.map((a) => (
              <li key={a.slug}>
                <Link href={`${CLUBS}/guides/${a.slug}`}>{a.titre}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  )
}
