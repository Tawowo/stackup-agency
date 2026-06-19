import { getAllPosts } from '@/lib/blog'
import Link from 'next/link'
import { Clock, Tag, ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Blog — Stackup Agency',
  description: 'Conseils, retours d\'expérience et actualités du digital.',
}

const colors: Record<string, string> = {
  'Restaurant': 'from-orange-400 to-red-500',
  "Retour d'expérience": 'from-blue-500 to-electric',
  'Conseils': 'from-emerald-400 to-teal-500',
}

const emojis: Record<string, string> = {
  'Restaurant': '🍕',
  "Retour d'expérience": '💻',
  'Conseils': '💡',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-background dark:bg-[#0A0F1C]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft size={16} /> Retour au site
          </Link>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">Blog</h1>
          <p className="text-white/60 text-lg">Conseils, retours d&apos;expérience et actualités du digital.</p>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="space-y-8">
          {posts.map(post => (
            <article key={post.slug} className="glass dark:bg-white/5 rounded-2xl overflow-hidden border border-navy/10 dark:border-white/10 hover:shadow-xl transition-all hover:-translate-y-0.5 group">
              <div className="flex flex-col sm:flex-row">
                <div className={`sm:w-48 h-40 sm:h-auto bg-gradient-to-br ${colors[post.tag] || 'from-navy to-electric'} flex items-center justify-center text-5xl flex-shrink-0`}>
                  {emojis[post.tag] || '📄'}
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-electric/10 text-electric rounded-md text-xs font-medium">
                      <Tag size={10} /> {post.tag}
                    </span>
                    <span className="flex items-center gap-1 text-foreground/40 dark:text-white/40 text-xs">
                      <Clock size={11} /> {post.readTime} min de lecture
                    </span>
                    <span className="text-foreground/40 dark:text-white/40 text-xs">{post.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-foreground dark:text-white mb-2 group-hover:text-electric transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-foreground/60 dark:text-white/60 text-sm mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="text-electric text-sm font-semibold hover:underline inline-flex items-center gap-1">
                    Lire l&apos;article →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
