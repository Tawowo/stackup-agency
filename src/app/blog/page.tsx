import { getAllPosts } from '@/lib/blog'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import BlogClient from './BlogClient'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog SEO & Création Web — Conseils Experts | Stackup Agency',
  description: 'Conseils SEO, création de site web et marketing digital par Stackup Agency. Articles experts pour aider les TPE et PME à développer leur présence en ligne.',
  alternates: { canonical: 'https://stackup-agency.fr/blog' },
  openGraph: {
    url: 'https://stackup-agency.fr/blog',
    title: 'Blog SEO & Création Web — Conseils Experts | Stackup Agency',
    description: 'Conseils SEO, création de site web et marketing digital par Stackup Agency.',
    type: 'website',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0F1C]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft size={16} /> Retour au site
          </Link>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">Blog</h1>
          <p className="text-white/60 text-lg">Conseils, retours d&apos;expérience et actualités du digital.</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <BlogClient posts={posts} />
      </div>
    </div>
  )
}
