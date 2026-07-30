import { getPost, getAllPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, Tag, Home, ChevronRight } from 'lucide-react'
import RelatedPosts from '@/components/blog/RelatedPosts'
import AuthorByline from '@/components/blog/AuthorByline'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) return {}
  const url = `https://stackup-agency.fr/blog/${post.slug}`
  return {
    title: `${post.title} | Stackup Agency`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()
  const allPosts = getAllPosts()

  const url = `https://stackup-agency.fr/blog/${post.slug}`

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    image: `https://stackup-agency.fr/blog/${post.slug}/opengraph-image`,
    author: {
      '@type': 'Organization',
      name: 'Stackup Agency',
      url: 'https://stackup-agency.fr',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Stackup Agency',
      url: 'https://stackup-agency.fr',
      logo: { '@type': 'ImageObject', url: 'https://stackup-agency.fr/icons/icon-512.png', width: 512, height: 512 },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: post.keywords?.join(', '),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://stackup-agency.fr' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://stackup-agency.fr/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  }

  return (
    <div className="min-h-screen bg-background dark:bg-[#0A0F1C]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-white/40 text-xs mb-6" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1"><Home size={11} /> Accueil</Link>
            <ChevronRight size={11} />
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ChevronRight size={11} />
            <span className="text-white/60 truncate max-w-[200px]">{post.title}</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center gap-1 px-3 py-1.5 bg-white/10 text-white/80 rounded-full text-xs font-medium">
              <Tag size={11} /> {post.tag}
            </span>
            <span className="flex items-center gap-1 text-white/40 text-xs">
              <Clock size={11} /> {post.readTime} min de lecture
            </span>
            <span className="text-white/40 text-xs">
              {post.updated
                ? `Mis à jour le ${new Date(post.updated).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}`
                : new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight">{post.title}</h1>
          <AuthorByline date={post.date} updated={post.updated} readTime={post.readTime} />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground dark:prose-headings:text-white prose-p:text-foreground/70 dark:prose-p:text-white/70 prose-a:text-electric prose-strong:text-foreground dark:prose-strong:text-white prose-li:text-foreground/70 dark:prose-li:text-white/70"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />

        <RelatedPosts
          currentSlug={post.slug}
          currentCategory={post.category}
          currentTag={post.tag}
          allPosts={allPosts}
        />

        <div className="mt-12 pt-8 border-t border-navy/10 dark:border-white/10">
          <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric">
            <h3 className="text-white font-bold text-lg mb-2">Prêt à démarrer votre projet ?</h3>
            <p className="text-white/70 text-sm mb-4">Premier RDV gratuit, devis sous 72h, sans engagement.</p>
            <Link href="/contact" className="inline-block px-6 py-3 bg-gold hover:bg-gold text-ink font-semibold rounded-xl text-sm transition-all hover:-translate-y-0.5">
              Prendre rendez-vous →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
