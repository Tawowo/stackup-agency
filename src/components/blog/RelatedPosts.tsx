import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import type { Post } from '@/lib/blog'

interface RelatedPostsProps {
  currentSlug: string
  currentCategory?: string
  currentTag?: string
  allPosts: Post[]
}

export default function RelatedPosts({ currentSlug, currentCategory, currentTag, allPosts }: RelatedPostsProps) {
  const related = allPosts
    .filter(p => p.slug !== currentSlug)
    .map(p => ({
      post: p,
      score: (p.category === currentCategory ? 2 : 0) + (p.tag === currentTag ? 1 : 0),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ post }) => post)

  if (related.length === 0) return null

  return (
    <div className="mt-12 pt-8 border-t border-navy/10 dark:border-white/10">
      <h3 className="text-lg font-bold text-foreground dark:text-white mb-6">Articles qui pourraient vous intéresser</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        {related.map(post => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group p-4 rounded-xl border border-white/10 hover:border-electric/30 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2 text-xs text-white/40">
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/60">{post.tag}</span>
              <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime} min</span>
            </div>
            <h4 className="text-sm font-semibold text-foreground dark:text-white mb-2 group-hover:text-electric transition-colors line-clamp-2">
              {post.title}
            </h4>
            <span className="inline-flex items-center gap-1 text-electric text-xs">
              Lire <ArrowRight size={12} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
