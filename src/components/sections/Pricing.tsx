'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, Zap } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'

const planSlugs = ['starter', 'pro', 'premium']

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
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.pricing.monthly}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
      </div>
    </section>
  )
}
