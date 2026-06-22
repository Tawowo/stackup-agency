'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, Zap, Globe, ShoppingCart, LayoutDashboard, Code2, Palette, FileImage, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'

const planSlugs = ['starter', 'pro', 'premium']

import { FileText } from 'lucide-react'

const projectIcons = [Globe, FileText, ShoppingCart, LayoutDashboard, Palette, FileImage, Code2]
const projectSlugs = ['site-vitrine', 'site-multi-pages', 'site-ecommerce', 'systeme-gestion', 'design-branding', null, null]

export default function Pricing() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="tarifs" className="py-24 lg:py-32 bg-white dark:bg-[#060D1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-semibold mb-4">
            Tarification
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.pricing.title}
          </h2>
          <p className="text-gray-600 dark:text-white/60 text-lg max-w-2xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </motion.div>

        {/* Monthly plans */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8"
        >
          {t.pricing.monthly}
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {t.pricing.plans.map((plan, i) => {
            const isPro = i === 1
            const slug = planSlugs[i]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  isPro
                    ? 'bg-gradient-to-b from-navy to-[#1a3254] text-white shadow-2xl shadow-navy/30 scale-[1.03]'
                    : 'bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm'
                }`}
              >
                {isPro && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 bg-gold rounded-full text-white text-xs font-bold shadow-lg">
                    <Zap size={12} fill="white" />
                    {t.pricing.recommended}
                  </div>
                )}
                <div className="mb-6">
                  <h4 className={`font-bold text-xl mb-2 ${isPro ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    {plan.name}
                  </h4>
                  <div className="flex items-end gap-1">
                    <span className={`text-5xl font-black ${isPro ? 'text-white' : 'text-electric'}`}>
                      {plan.price}€
                    </span>
                    <span className={`text-sm pb-2 ${isPro ? 'text-white/60' : 'text-gray-500 dark:text-white/50'}`}>
                      {t.pricing.month}
                    </span>
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${isPro ? 'bg-gold/20' : 'bg-electric/10'}`}>
                        <Check size={12} className={isPro ? 'text-gold' : 'text-electric'} />
                      </div>
                      <span className={`text-sm ${isPro ? 'text-white/80' : 'text-gray-600 dark:text-white/70'}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/tarifs/${slug}`}
                  className={`block text-center py-3.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 ${
                    isPro
                      ? 'bg-gold hover:bg-amber-500 text-white shadow-lg shadow-gold/30'
                      : 'bg-electric/10 hover:bg-electric/20 text-electric'
                  }`}
                >
                  Choisir {plan.name}
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Project pricing */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8"
        >
          {t.pricing.project}
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.pricing.projects.map((p, i) => {
            const Icon = projectIcons[i] || Code2
            const slug = projectSlugs[i]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.07 + 0.7 }}
                className="group bg-white dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10 hover:border-electric/30 dark:hover:border-electric/30 hover:shadow-lg hover:shadow-electric/10 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-electric/10 flex items-center justify-center group-hover:bg-electric/20 transition-colors">
                  <Icon size={20} className="text-electric" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-electric transition-colors">{p.name}</h4>
                  {p.price === 'Sur devis' || p.price === 'On quote' ? (
                    <Link href="#contact" className="text-xl font-black text-gold hover:text-amber-500 transition-colors underline decoration-dotted underline-offset-4">
                      Sur devis →
                    </Link>
                  ) : (
                    <div className="text-xl font-black text-electric">
                      {p.price.startsWith('À') || p.price.startsWith('Starting') ? p.price : `à partir de ${p.price}`}
                    </div>
                  )}
                </div>
                {slug && (
                  <Link
                    href={`/services/${slug}`}
                    className="inline-flex items-center gap-1.5 text-electric text-xs font-semibold group-hover:gap-2.5 transition-all"
                  >
                    En savoir plus
                    <ArrowRight size={13} />
                  </Link>
                )}
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="text-center text-gray-400 dark:text-white/40 text-sm mt-8"
        >
          * Tous les prix sont HT. Devis personnalisé gratuit sous 24h.
        </motion.p>
      </div>
    </section>
  )
}
