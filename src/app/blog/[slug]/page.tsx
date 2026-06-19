import { getPost, getAllPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Tag } from 'lucide-react'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) return {}
  return { title: `${post.title} — Stackup Agency Blog`, description: post.excerpt }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen bg-background dark:bg-[#0A0F1C]">
      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft size={16} /> Tous les articles
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center gap-1 px-3 py-1.5 bg-white/10 text-white/80 rounded-full text-xs font-medium">
              <Tag size={11} /> {post.tag}
            </span>
            <span className="flex items-center gap-1 text-white/40 text-xs">
              <Clock size={11} /> {post.readTime} min de lecture
            </span>
            <span className="text-white/40 text-xs">{post.date}</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight">{post.title}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground dark:prose-headings:text-white prose-p:text-foreground/70 dark:prose-p:text-white/70 prose-a:text-electric prose-strong:text-foreground dark:prose-strong:text-white prose-li:text-foreground/70 dark:prose-li:text-white/70"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />

        <div className="mt-16 pt-8 border-t border-navy/10 dark:border-white/10">
          <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric">
            <h3 className="text-white font-bold text-lg mb-2">Prêt à démarrer votre projet ?</h3>
            <p className="text-white/70 text-sm mb-4">Premier RDV gratuit, devis sous 24h, sans engagement.</p>
            <Link href="/#contact" className="inline-block px-6 py-3 bg-gold hover:bg-amber-500 text-white font-semibold rounded-xl text-sm transition-all hover:-translate-y-0.5">
              Prendre rendez-vous →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
