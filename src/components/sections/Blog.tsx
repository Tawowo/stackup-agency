'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Clock, Tag, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const articles = [
  {
    slug: 'pourquoi-votre-restaurant-a-besoin-dun-site-web-en-2026',
    title: 'Pourquoi votre restaurant a besoin d\'un site web en 2026',
    excerpt: 'En 2026, ne pas avoir de présence en ligne, c\'est laisser partir vos clients chez la concurrence. Découvrez pourquoi un site web est devenu indispensable.',
    date: '12 juin 2026',
    readTime: 5,
    tag: 'Restaurant',
    color: 'from-orange-400 to-red-500',
    emoji: '🍕',
  },
  {
    slug: 'comment-jai-cree-un-systeme-de-gestion-complet-en-100h',
    title: 'Comment j\'ai créé un système de gestion complet en 100h',
    excerpt: 'Retour d\'expérience honnête sur la création du système de gestion de Roma Pizzeria : les défis techniques, les nuits blanches, et les leçons apprises.',
    date: '5 juin 2026',
    readTime: 8,
    tag: 'Retour d\'expérience',
    color: 'from-blue-500 to-electric',
    emoji: '💻',
  },
  {
    slug: 'les-5-erreurs-digitales-des-petits-commerces',
    title: 'Les 5 erreurs digitales des petits commerces (et comment les éviter)',
    excerpt: 'Pas de site, mauvais référencement, photos de mauvaise qualité... Tour d\'horizon des erreurs les plus coûteuses et comment les corriger rapidement.',
    date: '28 mai 2026',
    readTime: 6,
    tag: 'Conseils',
    color: 'from-emerald-400 to-teal-500',
    emoji: '💡',
  },
]

export default function Blog() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="blog" className="py-24 lg:py-32 bg-white dark:bg-[#060D1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-electric/10 text-electric text-sm font-semibold mb-4">
            Ressources
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground dark:text-white mb-4">
            {t.blog.title}
          </h2>
          <p className="text-foreground/60 dark:text-white/60 text-lg">{t.blog.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group glass dark:bg-white/5 rounded-2xl overflow-hidden border border-navy/10 dark:border-white/10 hover:shadow-xl hover:shadow-electric/10 transition-all hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <div className={`h-44 bg-gradient-to-br ${article.color} flex items-center justify-center relative`}>
                <span className="text-6xl">{article.emoji}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center gap-1 px-2.5 py-1 bg-electric/10 text-electric rounded-md text-xs font-medium">
                    <Tag size={10} />
                    {article.tag}
                  </span>
                  <span className="flex items-center gap-1 text-foreground/40 dark:text-white/40 text-xs">
                    <Clock size={11} />
                    {article.readTime} {t.blog.readTime}
                  </span>
                </div>
                <h3 className="font-bold text-foreground dark:text-white mb-2 leading-snug group-hover:text-electric transition-colors">
                  {article.title}
                </h3>
                <p className="text-foreground/60 dark:text-white/60 text-sm leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-foreground/40 dark:text-white/40 text-xs">{article.date}</span>
                  <a
                    href={`/blog/${article.slug}`}
                    className="flex items-center gap-1 text-electric text-xs font-semibold group-hover:gap-2 transition-all"
                  >
                    {t.blog.readMore}
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-10"
        >
          <a
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-electric text-electric hover:bg-electric hover:text-white rounded-xl font-semibold text-sm transition-all"
          >
            {t.blog.allArticles}
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
