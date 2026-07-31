/* eslint-disable react/no-unescaped-entities */
import { getAllPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, ArrowRight, Home, ChevronRight } from 'lucide-react'
import { SITE } from '@/config/site'

const CATEGORIES: Record<string, { label: string; description: string; cats: string[] }> = {
  seo: {
    label: 'SEO & Référencement',
    description: 'Stratégies et techniques SEO pour améliorer la visibilité de votre site sur Google — référencement local, audit technique et optimisations concrètes.',
    cats: ['seo', 'seo-local', 'performance'],
  },
  'creation-sites': {
    label: 'Création de sites',
    description: 'Guides et conseils pour créer votre site internet professionnel — design, choix de la technologie, vitrine ou e-commerce, ce qui fonctionne vraiment.',
    cats: ['creation-sites', 'design'],
  },
  'applications-metier': {
    label: 'Applications métier',
    description: 'Développement d\'applications sur mesure pour les professionnels — gestion de RDV, commandes, stocks, CRM et tableaux de bord adaptés à votre activité.',
    cats: ['applications-metier'],
  },
  strategie: {
    label: 'Stratégie digitale',
    description: 'Stratégie digitale pour les TPE et PME — comment se démarquer en ligne, fidéliser ses clients et générer des leads sans budget publicitaire.',
    cats: ['strategie', 'entrepreneuriat', 'digital'],
  },
  restaurants: {
    label: 'Restauration',
    description: 'Le digital au service des restaurateurs — site internet, commande en ligne, click & collect, fidélisation et avis clients pour votre établissement.',
    cats: ['restaurants'],
  },
  artisans: {
    label: 'Artisans & commerce',
    description: 'Conseils pratiques pour les artisans, commerçants et professions libérales — comment développer sa clientèle et son chiffre d\'affaires grâce au digital.',
    cats: ['artisans', 'commerce', 'professions-liberales'],
  },
}

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map(cat => ({ cat }))
}

export async function generateMetadata({ params }: { params: { cat: string } }) {
  const catData = CATEGORIES[params.cat]
  if (!catData) return {}
  const url = `${SITE.url}/blog/categorie/${params.cat}`
  return {
    title: `${catData.label} — Articles et conseils`,
    description: catData.description,
    alternates: { canonical: url },
    openGraph: { url, title: catData.label, description: catData.description, type: 'website' },
  }
}

export default function BlogCategoriePage({ params }: { params: { cat: string } }) {
  const catData = CATEGORIES[params.cat]
  if (!catData) notFound()

  const allPosts = getAllPosts()
  const posts = allPosts.filter(p => p.category && catData.cats.includes(p.category))

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.url}/blog` },
      { '@type': 'ListItem', position: 3, name: catData.label, item: `${SITE.url}/blog/categorie/${params.cat}` },
    ],
  }

  return (
    <div className="min-h-screen bg-background dark:bg-[#0A0F1C]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 text-white/40 text-xs mb-6" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1"><Home size={11} /> Accueil</Link>
            <ChevronRight size={11} />
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ChevronRight size={11} />
            <span className="text-white/60">{catData.label}</span>
          </nav>
          <div className="inline-block px-3 py-1 bg-blue-500/20 text-electric text-xs font-medium rounded-full mb-4">
            {posts.length} article{posts.length > 1 ? 's' : ''}
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-4">{catData.label}</h1>
          <p className="text-white/70 text-lg max-w-2xl">{catData.description}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {posts.length === 0 ? (
          <p className="text-foreground/60 dark:text-white/60">Aucun article dans cette catégorie pour le moment.</p>
        ) : (
          <div className="grid gap-6">
            {posts.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group p-6 rounded-2xl border border-white/10 hover:border-electric/30 transition-colors bg-white/5 hover:bg-white/10"
              >
                <div className="flex items-center gap-3 mb-3 text-xs text-white/40">
                  <span className="px-2 py-1 rounded-full bg-white/10 text-white/60">{post.tag}</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime} min</span>
                  <span>
                    {new Date(post.updated ?? post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-foreground dark:text-white mb-2 group-hover:text-electric transition-colors">
                  {post.title}
                </h2>
                <p className="text-foreground/60 dark:text-white/60 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-electric text-sm font-medium">
                  Lire l'article <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 flex flex-wrap gap-3">
          {Object.entries(CATEGORIES).filter(([k]) => k !== params.cat).map(([slug, data]) => (
            <Link
              key={slug}
              href={`/blog/categorie/${slug}`}
              className="px-4 py-2 rounded-xl border border-white/10 hover:border-blue-400/40 text-sm text-foreground/60 dark:text-white/60 hover:text-electric transition-colors"
            >
              {data.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
