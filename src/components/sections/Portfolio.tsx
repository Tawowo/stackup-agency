'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Star, MapPin } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Portfolio() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const c = t.portfolio.client1

  return (
    <section id="realisations" className="py-24 lg:py-32 bg-background dark:bg-[#0A0F1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-navy/10 dark:bg-white/10 text-navy dark:text-white text-sm font-semibold mb-4">
            Portfolio
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground dark:text-white mb-4">
            {t.portfolio.title}
          </h2>
          <p className="text-foreground/60 dark:text-white/60 text-lg">{t.portfolio.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative group rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Gradient background representing the project */}
            <div className="h-64 bg-gradient-to-br from-red-600 via-orange-500 to-amber-500 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl mb-2">🍕</div>
                  <div className="text-white font-bold text-xl">Roma Pizzeria</div>
                  <div className="text-white/70 text-sm">Restaurant Management System</div>
                </div>
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {/* Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-gold rounded-full text-white text-xs font-bold shadow-lg">
                <Star size={12} fill="white" />
                {c.badge}
              </div>
            </div>

            <div className="bg-white dark:bg-[#111827] p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-foreground dark:text-white">{c.name}</h3>
                  <div className="flex items-center gap-1 text-foreground/50 dark:text-white/50 text-sm mt-1">
                    <MapPin size={13} />
                    {c.location}
                  </div>
                </div>
                <a
                  href="https://roma-pizzeria-restaurante.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-electric/10 hover:bg-electric text-electric hover:text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  {c.link}
                  <ExternalLink size={12} />
                </a>
              </div>
              <p className="text-foreground/70 dark:text-white/70 text-sm leading-relaxed mb-4">{c.desc}</p>
              <div className="flex flex-wrap gap-2">
                {c.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-navy/5 dark:bg-white/10 text-navy dark:text-white/80 rounded-md text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="glass dark:bg-white/5 rounded-2xl p-6 border border-navy/10 dark:border-white/10">
              <div className="text-4xl font-black text-electric mb-2">~100h</div>
              <p className="text-foreground/70 dark:text-white/70 text-sm">de développement pour un système complet de gestion restaurant avec 8 modules fonctionnels.</p>
            </div>
            <div className="glass dark:bg-white/5 rounded-2xl p-6 border border-navy/10 dark:border-white/10">
              <div className="text-4xl font-black text-gold mb-2">8+</div>
              <p className="text-foreground/70 dark:text-white/70 text-sm">modules : réservations, commandes, cuisine, fidélité, stats, admin, menu digital, notifications.</p>
            </div>

            <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric text-white">
              <h3 className="font-bold text-xl mb-2">{t.portfolio.cta}</h3>
              <p className="text-white/70 text-sm mb-4">Votre projet mérite la même attention et le même investissement.</p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-amber-500 text-white rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
              >
                Démarrer mon projet →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
