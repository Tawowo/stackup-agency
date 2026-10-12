'use client'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import BlogClient from './BlogClient'
import MiniHero from '@/components/ui/MiniHero'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Post } from '@/lib/blog'

export default function BlogPageClient({ posts }: { posts: Post[] }) {
  const { lang, t } = useLanguage()

  if (lang === 'en') {
    return (
      <div className="min-h-screen bg-[#FFFDF9]">
        <MiniHero signature="colonne" title="Blog" subtitle="Tips, insights and digital news.">
          <p className="su-sig__actions">
            <Link href="/" className="su-lien-trace inline-flex items-center gap-2">
              <ArrowLeft size={16} /> Back to site
            </Link>
          </p>
        </MiniHero>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Our blog is in French
          </h2>
          <p className="text-ink/70 mb-8">
            {t.blog.frOnly}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-electric hover:bg-electric text-white rounded-xl font-semibold transition-all hover:-translate-y-0.5"
          >
            Contact us in English →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      {/* « colonne » : des lignes qui se composent de la droite vers la
          gauche. Ce qu'on vient chercher ici est du texte ; la signature le
          dit sans l'illustrer. */}
      <MiniHero
        signature="colonne"
        breadcrumb={[{ name: 'Blog' }]}
        title={t.blog.title}
        subtitle={t.blog.subtitle}
      >
        <p className="su-sig__meta">
          <span>{posts.length} articles publiés — guides, prix et conseils concrets pour les TPE</span>
        </p>
      </MiniHero>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <BlogClient posts={posts} />
      </div>
    </div>
  )
}
