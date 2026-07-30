'use client'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import BlogClient from './BlogClient'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Post } from '@/lib/blog'

export default function BlogPageClient({ posts }: { posts: Post[] }) {
  const { lang, t } = useLanguage()

  if (lang === 'en') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0F1C]">
        <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft size={16} /> Back to site
            </Link>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">Blog</h1>
            <p className="text-white/60 text-lg">Tips, insights and digital news.</p>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
          <div className="text-5xl mb-6">🇫🇷</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Our blog is in French
          </h2>
          <p className="text-ink/70 dark:text-white/60 mb-8">
            {t.blog.frOnly}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-electric hover:bg-electric text-white rounded-xl font-semibold transition-all hover:-translate-y-0.5"
          >
            Contact us in English →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0F1C]">
      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft size={16} /> Retour au site
          </Link>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">{t.blog.title}</h1>
          <p className="text-white/60 text-lg">{t.blog.subtitle}</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <BlogClient posts={posts} />
      </div>
    </div>
  )
}
