'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Clock, Tag, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const articles = [
  {
    slug: 'pourquoi-votre-restaurant-perd-des-clients-sans-site-web',
    title: 'Pourquoi votre restaurant perd des clients sans site web en 2026',
    excerpt: 'En 2026, ne pas avoir de site web pour votre restaurant, c\'est laisser des centaines de couverts à vos concurrents. Découvrez pourquoi et comment y remédier.',
    date: '15 jan. 2026',
    readTime: 5,
    tag: 'Restaurants',
    color: 'from-orange-400 to-red-500',
    emoji: '🍕',
  },
  {
    slug: 'cout-site-internet-2026',
    title: 'Combien coûte un site internet en 2026 ? Guide complet des tarifs',
    excerpt: 'Prix d\'un site vitrine, e-commerce ou sur mesure en 2026 : découvrez les tarifs réels et ce qui justifie les écarts de prix.',
    date: '23 juin 2026',
    readTime: 7,
    tag: 'Création de sites',
    color: 'from-blue-500 to-electric',
    emoji: '💻',
  },
  {
    slug: '10-erreurs-seo-site-web',
    title: '10 erreurs SEO qui plombent votre site web',
    excerpt: 'Votre site web est beau mais personne ne le trouve ? Ces 10 erreurs SEO classiques expliquent pourquoi vous n\'apparaissez pas sur Google. Et comment les corriger.',
    date: '25 jan. 2026',
    readTime: 7,
    tag: 'SEO',
    color: 'from-emerald-400 to-teal-500',
    emoji: '🔍',
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
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground dark:text-white mb-4">
            {t.blog.title}
          </h2>
          <p className="text-foreground/60 dark:text-white/60 text-lg">{t.blog.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
