'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { realisations } from '@/lib/realisations'
import { useLanguage } from '@/contexts/LanguageContext'

const filters = ['Tous', 'Site vitrine', 'E-commerce', 'Système de gestion']

export default function Portfolio() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeFilter, setActiveFilter] = useState('Tous')

  const filtered = activeFilter === 'Tous'
    ? realisations
    : realisations.filter(r => r.filterType === activeFilter)

  return (
    <section id="realisations" className="py-24 lg:py-32 bg-[#F8FAFC] dark:bg-[#0A0F1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.portfolio.title}
          </h2>
          <p className="text-ink/70 dark:text-white/60 text-lg max-w-2xl mx-auto">
            {t.portfolio.subtitle}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeFilter === f
                  ? 'bg-[#1E3A5F] text-white shadow-lg'
                  : 'bg-white dark:bg-white/5 text-ink/70 dark:text-white/60 border border-gray-200 dark:border-white/10 hover:border-[#1E3A5F] hover:text-[#1E3A5F]'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((r, i) => (
            <motion.div
              key={r.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Color header */}
              <div
                className="h-36 relative flex items-end p-5"
                style={{ background: r.couleur }}
              >
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ background: `radial-gradient(circle at 80% 20%, ${r.accent}, transparent 60%)` }}
                />
                <div className="relative z-10">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {r.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-xs font-semibold"
                        style={{ background: `${r.accent}30`, color: r.accent, border: `1px solid ${r.accent}40` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-xl text-white">{r.nom}</h3>
                  <p className="text-white/60 text-sm">{r.type}</p>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 p-5 bg-white dark:bg-[#111827] flex flex-col">
                <p className="text-ink/70 dark:text-white/70 text-sm leading-relaxed mb-5 flex-1">
                  {r.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Link
                    href={`/realisations/${r.slug}`}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#1E3A5F] hover:bg-[#162E4D] text-white text-sm font-semibold rounded-lg transition-colors min-h-[40px]"
                  >
                    Voir le projet
                    <ArrowRight size={14} />
                  </Link>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white/80 hover:border-[#1E3A5F] hover:text-[#1E3A5F] text-sm font-medium rounded-lg transition-colors min-h-[40px]"
                  >
                    Démo live
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="inline-block rounded-2xl p-8 bg-gradient-to-br from-[#1E3A5F] to-[#2D7DD2] text-white">
            <h3 className="font-bold text-xl mb-2">{t.portfolio.yourProject}</h3>
            <p className="text-white/70 text-sm mb-5">{t.portfolio.demoSameQuality}</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#F59E0B] hover:bg-gold text-ink rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
            >
              {t.portfolio.viewProject} →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
