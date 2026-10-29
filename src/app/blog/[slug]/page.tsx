import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Lecture from '@/experiences/journal/Lecture'
import Action from '@/components/ui/Action'
import { article, articlesLies, rayonDe, tousLesArticles } from '@/lib/blog'
import { meta, filAriane, faqPage, JsonLd, ORIGINE } from '@/lib/seo'
import { SITE } from '@/config/site'
import { sourceSure } from '@/gabarits/pilier/PilierCorps'
import '@/experiences/journal/journal.css'
import '@/components/editorial/editorial.css'
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
  return { ...meta({ titre: a.seoTitre ?? a.titre, description: a.extrait, chemin: `/blog/${slug}`, type: 'article' }), keywords: a.motsCles }
}

const dateFr = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

const CTA_PAR_CATEGORIE: Record<string, { titre: string; texte: string; href: string; action: string }> = {
  seo: { titre: 'Votre site est-il bien vu de Google ?', texte: 'Testez-le gratuitement en une minute : titre, description, mobile, sécurité.', href: '/outils/audit-site', action: 'Auditer mon site' },
  'seo-local': { titre: 'Être trouvé près de chez vous.', texte: 'Fiche Google, pages locales, avis : ce qui compte pour votre zone.', href: '/services/referencement-local', action: 'Voir le référencement local' },
  creation: { titre: 'Combien coûterait votre site ?', texte: 'Estimez votre projet en quelques minutes, prix « à partir de » affichés.', href: '/tarifs#estimer', action: 'Estimer mon projet' },
  ecommerce: { titre: 'Une boutique qui vous appartient.', texte: 'Catalogue, paiement, stock : voyez ce qu’une boutique sur mesure change.', href: '/services/site-ecommerce', action: 'Voir la boutique en ligne' },
  'applications-metier': { titre: 'Un outil qui colle à votre métier.', texte: 'Planning, devis, stock, clients : les modules se combinent à la carte.', href: '/solutions', action: 'Voir les solutions' },
  ia: { titre: 'L’IA au service de votre quotidien.', texte: 'Automatisations utiles, sans jargon, avec votre accord à chaque étape.', href: '/services/ia-et-automatisation', action: 'Voir l’automatisation' },
  artisans: { titre: 'Un site fait pour l’artisan.', texte: 'Zone d’intervention, prestations, bouton d’appel : l’essentiel pour être appelé.', href: '/tarifs#estimer', action: 'Estimer mon site' },
  juridique: { titre: 'Mentions légales : faites-les justes.', texte: 'Un générateur gratuit pour vos mentions légales, à relire avec vos informations.', href: '/outils/generateur-mentions-legales', action: 'Générer mes mentions' },
  technique: { titre: 'Un site rapide et sain.', texte: 'Maintenance, sauvegardes, mises à jour : confiez-les ou gardez la main.', href: '/services/maintenance', action: 'Voir la maintenance' },
}
const CTA_DEFAUT = { titre: 'Un site ou un outil pour votre métier ?', texte: 'Une démo avant de signer, un prix écrit avant de commencer.', href: '/contact?a=demo', action: 'Demander ma démo' }
const ctaDeCategorie = (c: string) => CTA_PAR_CATEGORIE[c] ?? CTA_DEFAUT

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = await article(slug)
  if (!a) notFound()
  const r = rayonDe(a.categorie)
  const cta = ctaDeCategorie(a.categorie)
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
            author: { '@id': `${ORIGINE}/#matheo` },
            articleSection: r.nom,
            wordCount: a.mots,
            isPartOf: { '@id': `${ORIGINE}/#site` },
            image: `${ORIGINE}/og.png`,
            inLanguage: 'fr-FR',
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
            <Link href="/auteur/matheo-reboul">{SITE.fondateur}</Link> · {a.maj ? `mis à jour le ${dateFr(a.maj)}` : dateFr(a.date)} · {a.lecture} min de lecture
          </p>
        </div>
      </header>
      <div data-moment="lecture-corps" data-nuit="0">
        <Lecture sommaire={a.sommaire}>
          <div className="su-prose" dangerouslySetInnerHTML={{ __html: a.html }} />
          {a.sources && a.sources.filter(sourceSure).length > 0 && (
            <aside className="su-prose" aria-label="Sources officielles">
              <h2 id="sources">Sources officielles</h2>
              <ul>
                {a.sources.filter(sourceSure).map((u) => (
                  <li key={u}>
                    <a href={sourceSure(u)!} rel="noopener noreferrer" target="_blank">
                      {new URL(sourceSure(u)!).hostname.replace(/^www\./, '')}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          )}
          <aside className="su-lec__cta su-plaque">
            <p className="su-display">{cta.titre}</p>
            <p>{cta.texte}</p>
            <Action href={cta.href}>{cta.action}</Action>
            <Action href="/contact?a=appel" variante="contour">
              Réserver un appel gratuit
            </Action>
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
