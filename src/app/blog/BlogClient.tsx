'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Clock, Tag, ArrowRight } from 'lucide-react'

type Post = {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: number
  tag: string
  category?: string
}

const categoryColors: Record<string, string> = {
  restaurants: 'from-orange-400 to-red-500',
  artisans: 'from-amber-500 to-orange-600',
  commerce: 'from-emerald-500 to-teal-600',
  'seo-local': 'from-blue-500 to-electric',
  'creation-sites': 'from-purple-500 to-violet-600',
  'applications-metier': 'from-cyan-500 to-blue-600',
  'pages-locales': 'from-rose-500 to-pink-600',
  seo: 'from-blue-500 to-electric',
  digital: 'from-purple-500 to-violet-600',
  entrepreneuriat: 'from-gold to-amber-600',
  design: 'from-pink-500 to-rose-600',
  'professions-liberales': 'from-indigo-500 to-purple-600',
  strategie: 'from-teal-500 to-emerald-600',
}

const categoryEmojis: Record<string, string> = {
  restaurants: '🍽️',
  artisans: '🔨',
  commerce: '🛍️',
  'seo-local': '📍',
  'creation-sites': '🌐',
  'applications-metier': '⚙️',
  'pages-locales': '🗺️',
  seo: '🔍',
  digital: '💻',
  entrepreneuriat: '🚀',
  design: '🎨',
  'professions-liberales': '👔',
  strategie: '📊',
}

const categoryLabels: Record<string, string> = {
  tous: 'Tous',
  restaurants: 'Restauration',
  artisans: 'Artisans',
  commerce: 'Commerce',
  'seo-local': 'SEO Local',
  'creation-sites': 'Création de sites',
  'applications-metier': 'Applications métier',
  'pages-locales': 'Pages locales',
  seo: 'SEO',
  digital: 'Digital',
  entrepreneuriat: 'Entrepreneuriat',
  design: 'Design',
  'professions-liberales': 'Professions libérales',
  strategie: 'Stratégie',
}

const filters = ['tous', 'seo-local', 'creation-sites', 'restaurants', 'artisans', 'commerce', 'applications-metier', 'pages-locales', 'digital', 'entrepreneuriat', 'design']

export default function BlogClient({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState('tous')

  const filtered = active === 'tous' ? posts : posts.filter(p => (p.category || '').toLowerCase() === active)

  return (
    <>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              active === f
                ? 'bg-electric text-white shadow-lg shadow-electric/30'
                : 'bg-white dark:bg-white/5 text-gray-600 dark:text-white/60 border border-gray-200 dark:border-white/10 hover:border-electric hover:text-electric'
            }`}
          >
            {f !== 'tous' && categoryEmojis[f] && <span className="mr-1.5">{categoryEmojis[f]}</span>}
            {categoryLabels[f]}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-gray-400 dark:text-white/40 text-sm mb-6">
        {filtered.length} article{filtered.length > 1 ? 's' : ''}
        {active !== 'tous' ? ` dans "${categoryLabels[active]}"` : ''}
      </p>

      {/* Articles */}
      <div className="space-y-6">
        {filtered.map(post => {
          const cat = (post.category || 'digital').toLowerCase()
          const gradient = categoryColors[cat] || 'from-navy to-electric'
          const emoji = categoryEmojis[cat] || '📄'
          return (
            <article key={post.slug} className="bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 hover:shadow-xl hover:shadow-electric/10 hover:border-electric/30 transition-all hover:-translate-y-0.5 group flex flex-col sm:flex-row">
              <div className={`sm:w-44 h-36 sm:h-auto bg-gradient-to-br ${gradient} flex items-center justify-center text-4xl flex-shrink-0`}>
                {emoji}
              </div>
              <div className="p-6 flex flex-col justify-center flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="flex items-center gap-1 px-2.5 py-1 bg-electric/10 text-electric rounded-md text-xs font-medium">
                    <Tag size={10} /> {post.tag}
                  </span>
                  <span className="flex items-center gap-1 text-gray-400 dark:text-white/40 text-xs">
                    <Clock size={11} /> {post.readTime} min de lecture
                  </span>
                  <span className="text-gray-400 dark:text-white/40 text-xs">{post.date}</span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-electric transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-500 dark:text-white/60 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1.5 text-electric text-sm font-semibold group-hover:gap-2.5 transition-all">
                  Lire l&apos;article
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400 dark:text-white/40">
          Aucun article dans cette catégorie pour le moment.
        </div>
      )}
    </>
  )
}
