import { Feed } from 'feed'
import { getAllPosts } from '@/lib/blog'
import { SITE } from '@/config/site'

export const dynamic = 'force-static'

export async function GET() {
  const posts = getAllPosts().slice(0, 30)

  const feed = new Feed({
    title: `${SITE.name} — Blog SEO & Création Web`,
    description: 'Conseils SEO, création de site web et marketing digital pour TPE et PME.',
    id: SITE.url,
    link: SITE.url,
    language: 'fr',
    copyright: `© ${new Date().getFullYear()} ${SITE.name}`,
    author: {
      name: SITE.name,
      email: SITE.email,
      link: SITE.url,
    },
    feedLinks: {
      rss2: `${SITE.url}/feed.xml`,
    },
  })

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${SITE.url}/blog/${post.slug}`,
      link: `${SITE.url}/blog/${post.slug}`,
      description: post.excerpt,
      date: new Date(post.date),
      category: post.tag ? [{ name: post.tag }] : undefined,
    })
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
