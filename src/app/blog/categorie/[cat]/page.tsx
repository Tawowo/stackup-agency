/* eslint-disable react/no-unescaped-entities */
import { getAllPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { SITE } from '@/config/site'
import MiniHero from '@/components/ui/MiniHero'

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

export async function generateMetadata({ params }: { params: Promise<{ cat: string }> }) {
  const parametres = await params
  const catData = CATEGORIES[parametres.cat]
  if (!catData) return {}
  const url = `${SITE.url}/blog/categorie/${parametres.cat}`
  return {
    title: `${catData.label} — Articles et conseils`,
    description: catData.description,
    alternates: { canonical: url },
    openGraph: { url, title: catData.label, description: catData.description, type: 'website' },
  }
}

export default async function BlogCategoriePage({ params }: { params: Promise<{ cat: string }> }) {
  const parametres = await params
  const catData = CATEGORIES[parametres.cat]
  if (!catData) notFound()

  const allPosts = getAllPosts()
  const posts = allPosts.filter(p => p.category && catData.cats.includes(p.category))

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.url}/blog` },
      { '@type': 'ListItem', position: 3, name: catData.label, item: `${SITE.url}/blog/categorie/${parametres.cat}` },
    ],
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <MiniHero
        signature="colonne"
        breadcrumb={[{ name: 'Blog', href: '/blog' }, { name: catData.label }]}
        title={catData.label}
        subtitle={catData.description}
      >
        <span className="su-sig__badge">
          {posts.length} article{posts.length > 1 ? 's' : ''}
        </span>
      </MiniHero>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {posts.length === 0 ? (
          <p className="text-[#475569]">Aucun article dans cette catégorie pour le moment.</p>
        ) : (
          <div className="grid gap-6">
            {posts.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group p-6 rounded-2xl border border-white/10 hover:border-electric/30 transition-colors bg-white/5 hover:bg-white/10"
              >
                <div className="flex items-center gap-3 mb-3 text-xs text-white/65">
                  <span className="px-2 py-1 rounded-full bg-white/10 text-white/60">{post.tag}</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime} min</span>
                  <span>
                    {new Date(post.updated ?? post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-electric transition-colors">
                  {post.title}
                </h2>
                <p className="text-[#475569] text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-electric text-sm font-medium">
                  Lire l'article <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 flex flex-wrap gap-3">
          {Object.entries(CATEGORIES).filter(([k]) => k !== parametres.cat).map(([slug, data]) => (
            <Link
              key={slug}
              href={`/blog/categorie/${slug}`}
              className="px-4 py-2 rounded-xl border border-white/10 hover:border-blue-400/40 text-sm text-[#475569] hover:text-electric transition-colors"
            >
              {data.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
