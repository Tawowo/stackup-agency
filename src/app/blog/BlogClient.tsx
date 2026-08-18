'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Clock, ArrowRight, Search as SearchIcon, Star,
  Utensils, Wrench, ShoppingBag, MapPin, Globe, Cpu,
  Map, Search, Monitor, Rocket, Paintbrush, Briefcase, BarChart3,
  FileText, Camera, Video, Scale, Users, BookOpen,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

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
  restaurants: 'from-navy to-electric',
  artisans: 'from-gold to-navy',
  commerce: 'from-electric to-navy',
  'seo-local': 'from-navy to-electric',
  'creation-sites': 'from-electric to-gold',
  'applications-metier': 'from-navy to-electric',
  'pages-locales': 'from-gold to-electric',
  seo: 'from-navy to-electric',
  digital: 'from-electric to-navy',
  entrepreneuriat: 'from-gold to-navy',
  design: 'from-electric to-gold',
  'professions-liberales': 'from-navy to-gold',
  strategie: 'from-electric to-navy',
  photographes: 'from-navy to-gold',
  videastes: 'from-electric to-navy',
  associations: 'from-gold to-electric',
  'beaute-sante': 'from-electric to-gold',
  guides: 'from-navy to-electric',
}

const categoryIcons: Record<string, LucideIcon> = {
  restaurants: Utensils,
  artisans: Wrench,
  commerce: ShoppingBag,
  'seo-local': MapPin,
  'creation-sites': Globe,
  'applications-metier': Cpu,
  'pages-locales': Map,
  seo: Search,
  digital: Monitor,
  entrepreneuriat: Rocket,
  design: Paintbrush,
  'professions-liberales': Briefcase,
  strategie: BarChart3,
  photographes: Camera,
  videastes: Video,
  associations: Users,
  'beaute-sante': Scale,
  guides: BookOpen,
}

const categoryLabels: Record<string, string> = {
  tous: 'Tous',
  strategie: 'Prix & stratégie',
  'creation-sites': 'Création de sites',
  seo: 'SEO',
  'seo-local': 'SEO local',
  restaurants: 'Restauration',
  artisans: 'Artisans',
  commerce: 'Commerce & e-commerce',
  'applications-metier': 'Logiciels de gestion',
  'professions-liberales': 'Professions libérales',
  entrepreneuriat: 'Entrepreneuriat',
  digital: 'Digital',
  design: 'Design',
  'pages-locales': 'Pages locales',
}

// Slugs « piliers » mis en avant (les plus recherchés)
const FEATURED_SLUGS = ['cout-site-internet-2026', 'pixieset-jingoo-pictime-cout-reel-abonnements', 'site-vitrine-449-inclus']

const PAGE_SIZE = 24

export default function BlogClient({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState('tous')
  const [query, setQuery] = useState('')
  const [limit, setLimit] = useState(PAGE_SIZE)

  // Comptes par catégorie (dynamiques, publiés uniquement — la lib filtre déjà)
  const counts = useMemo(() => {
    const c: Record<string, number> = {}
    posts.forEach(p => {
      const cat = (p.category || 'digital').toLowerCase()
      c[cat] = (c[cat] || 0) + 1
    })
    return c
  }, [posts])

  const filters = useMemo(() => {
    const known = Object.keys(categoryLabels).filter(k => k !== 'tous' && counts[k])
    return ['tous', ...known.sort((a, b) => (counts[b] || 0) - (counts[a] || 0))]
  }, [counts])

  const featured = useMemo(
    () => FEATURED_SLUGS.map(s => posts.find(p => p.slug === s)).filter(Boolean) as Post[],
    [posts]
  )

  const filtered = useMemo(() => {
    let r = active === 'tous' ? posts : posts.filter(p => (p.category || '').toLowerCase() === active)
    const q = query.trim().toLowerCase()
    if (q) r = r.filter(p => p.title.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q))
    return r
  }, [posts, active, query])

  const visible = filtered.slice(0, limit)

  function selectCat(f: string) {
    setActive(f)
    setLimit(PAGE_SIZE)
  }

  return (
    <>
      {/* Recherche instantanée */}
      <div className="relative mb-8 max-w-xl">
        <SearchIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/30" />
        <input
          type="search"
          value={query}
          onChange={e => { setQuery(e.target.value); setLimit(PAGE_SIZE) }}
          placeholder={`Rechercher parmi ${posts.length} articles…`}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-navy placeholder:text-navy/35 focus:outline-none focus:border-electric/50 focus:ring-2 focus:ring-electric/20 text-sm transition-all"
        />
      </div>

      {/* Catégories avec compteurs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {filters.map(f => {
          const Icon = f !== 'tous' ? categoryIcons[f] : null
          const n = f === 'tous' ? posts.length : counts[f] || 0
          return (
            <button
              key={f}
              onClick={() => selectCat(f)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                active === f
                  ? 'bg-electric text-white shadow-lg shadow-electric/30'
                  : 'bg-white text-ink/70 border border-gray-200 hover:border-electric hover:text-electric'
              }`}
            >
              {Icon && <Icon size={13} />}
              {categoryLabels[f]}
              <span className={`text-xs tabular-nums ${active === f ? 'text-white/70' : 'text-navy/40'}`}>{n}</span>
            </button>
          )
        })}
      </div>

      {/* À la une — 3 piliers (hors recherche/filtre actifs) */}
      {active === 'tous' && !query.trim() && featured.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <Star size={15} className="text-gold" />
            <h2 className="text-sm font-bold text-navy uppercase tracking-wider">À la une</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {featured.map((post, i) => {
              const cat = (post.category || 'digital').toLowerCase()
              const gradient = categoryColors[cat] || 'from-navy to-electric'
              const IconComp = categoryIcons[cat] || FileText
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`}
                  className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-gold/40 hover:shadow-[0_16px_48px_rgba(30,58,95,0.12)] hover:-translate-y-1 transition-all duration-300"
                  style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className={`h-24 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                    <IconComp size={32} className="text-white/80" strokeWidth={1.5} />
                  </div>
                  <div className="p-5">
                    <div className="text-xs text-gold font-bold uppercase tracking-wider mb-2">{categoryLabels[cat] || post.tag}</div>
                    <h3 className="font-bold text-navy text-sm leading-snug group-hover:text-electric transition-colors line-clamp-2 mb-2">{post.title}</h3>
                    <span className="text-xs text-navy/40 flex items-center gap-1"><Clock size={10} /> {post.readTime} min</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Compteur résultat */}
      <p className="text-muted text-sm mb-6" aria-live="polite">
        {filtered.length} article{filtered.length > 1 ? 's' : ''}
        {active !== 'tous' ? ` dans « ${categoryLabels[active]} »` : ''}
        {query.trim() ? ` pour « ${query.trim()} »` : ''}
      </p>

      {/* Grille d'articles */}
      <div className="grid sm:grid-cols-2 gap-5">
        {visible.map((post, i) => {
          const cat = (post.category || 'digital').toLowerCase()
          const gradient = categoryColors[cat] || 'from-navy to-electric'
          const IconComp = categoryIcons[cat] || FileText
          return (
            <article key={post.slug}
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-[0_16px_48px_rgba(30,58,95,0.10)] hover:border-electric/30 transition-all duration-300 hover:-translate-y-1 flex"
              style={{ animation: `fadeInUp 0.5s cubic-bezier(0.22,1,0.36,1) ${Math.min(i, 8) * 50}ms both` }}>
              <div className={`w-28 bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
                <IconComp size={28} className="text-white/80" strokeWidth={1.5} />
              </div>
              <div className="p-5 flex flex-col justify-center flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <span className="px-2 py-0.5 bg-electric/10 text-electric rounded-md text-xs font-semibold">{post.tag}</span>
                  <span className="flex items-center gap-1 text-muted text-xs"><Clock size={10} /> {post.readTime} min</span>
                </div>
                <h2 className="text-base font-bold text-gray-900 mb-1.5 group-hover:text-electric transition-colors line-clamp-2 leading-snug">
                  <Link href={`/blog/${post.slug}`} className="before:absolute before:inset-0">{post.title}</Link>
                </h2>
                <p className="text-gray-500 text-sm line-clamp-2">{post.excerpt}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-electric text-xs font-semibold group-hover:gap-2.5 transition-all">
                  Lire l&apos;article <ArrowRight size={12} />
                </span>
              </div>
            </article>
          )
        })}
      </div>

      {/* Pagination lazy */}
      {filtered.length > limit && (
        <div className="text-center mt-10">
          <button
            onClick={() => setLimit(l => l + PAGE_SIZE)}
            className="px-8 py-3 rounded-xl border border-navy/20 text-navy font-semibold text-sm hover:border-gold hover:text-gold hover:-translate-y-0.5 transition-all"
          >
            Afficher plus d&apos;articles ({filtered.length - limit} restants)
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted">
          Aucun article ne correspond à cette recherche.
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          article { animation: none !important; }
        }
      `}</style>
    </>
  )
}
