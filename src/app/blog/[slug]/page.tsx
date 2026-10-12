import { getPost, getAllPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import MiniHero from '@/components/ui/MiniHero'
import { Clock, Tag } from 'lucide-react'
import RelatedPosts from '@/components/blog/RelatedPosts'
import AuthorByline from '@/components/blog/AuthorByline'
import ReadingProgress from '@/components/blog/ReadingProgress'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) return {}
  const url = `https://stackup-agency.fr/blog/${post.slug}`
  const rawTitle = post.seoTitle || post.title
  const suffix = ' | Stackup Agency'
  const maxBase = 65 - suffix.length // 47
  const seoTitle = rawTitle.length > maxBase
    ? rawTitle.slice(0, rawTitle.lastIndexOf(' ', maxBase - 1) || maxBase) + '…' + suffix
    : rawTitle + suffix
  const rawDesc = post.excerpt || post.title
  const desc = rawDesc.length > 165
    ? rawDesc.slice(0, rawDesc.lastIndexOf(' ', 162) || 162) + '…'
    : rawDesc.length < 120
      ? rawDesc + ' Devis gratuit sous 72h, livraison garantie.'
      : rawDesc
  return {
    title: { absolute: seoTitle },
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: post.title,
      description: desc,
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

  const faqSchema = post.faq && post.faq.length >= 2 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  } : null

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
    <div className="min-h-screen bg-[#FFFDF9]">
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <MiniHero
        signature="colonne"
        breadcrumb={[{ name: 'Blog', href: '/blog' }, { name: post.title }]}
        title={post.title}
      >
        <div className="su-sig__meta">
          <span className="su-sig__badge" style={{ marginBottom: 0 }}>
            <Tag size={11} /> {post.tag}
          </span>
          <span><Clock size={11} /> {post.readTime} min de lecture</span>
          <span>
            {post.updated
              ? `Mis à jour le ${new Date(post.updated).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}`
              : new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
        <AuthorByline date={post.date} updated={post.updated} readTime={post.readTime} />
      </MiniHero>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div
          className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/70 prose-a:text-electric prose-strong:text-foreground prose-li:text-foreground/70"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />

        <div className="mt-8 pt-6 border-t border-navy/10 flex flex-wrap gap-3 text-sm">
          <Link href="/tarifs" className="text-electric hover:underline">Nos tarifs →</Link>
          <Link href="/services" className="text-electric hover:underline">Nos services →</Link>
          <Link href="/realisations" className="text-electric hover:underline">Nos réalisations →</Link>
        </div>

        <RelatedPosts
          currentSlug={post.slug}
          currentCategory={post.category}
          currentTag={post.tag}
          allPosts={allPosts}
        />

        <div className="mt-12 pt-8 border-t border-navy/10">
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
