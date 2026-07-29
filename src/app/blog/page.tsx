import { getAllPosts } from '@/lib/blog'
import BlogPageClient from './BlogPageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog SEO & Création Web — Conseils Experts | Stackup Agency',
  description: 'Conseils SEO, création de site web et marketing digital par Stackup Agency. Articles experts pour aider les TPE et PME à développer leur présence en ligne.',
  alternates: {
    canonical: 'https://stackup-agency.fr/blog',
  },
  openGraph: {
    url: 'https://stackup-agency.fr/blog',
    title: 'Blog SEO & Création Web — Conseils Experts | Stackup Agency',
    description: 'Conseils SEO, création de site web et marketing digital par Stackup Agency.',
    type: 'website',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()
  return <BlogPageClient posts={posts} />
}
