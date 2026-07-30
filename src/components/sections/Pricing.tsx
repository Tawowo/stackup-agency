'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, Zap, ArrowRight } from 'lucide-react'
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
                className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${
                  isPro
                    ? 'bg-gradient-to-b from-navy to-[#1a3254] text-white shadow-2xl shadow-navy/30 lg:scale-[1.03]'
                    : i === 0
                      ? 'bg-white dark:bg-white/5 border-2 border-electric hover:shadow-xl hover:shadow-electric/10 hover:-translate-y-1'
                      : 'bg-white dark:bg-white/5 border-2 border-[#F59E0B] hover:shadow-xl hover:shadow-[#F59E0B]/10 hover:-translate-y-1'
                }`}
              >
                {isPro && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 bg-gold rounded-full text-ink text-xs font-bold shadow-lg">
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
                      <span className={`text-sm ${isPro ? 'text-white/80' : 'text-ink/70 dark:text-white/70'}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/tarifs/${slug}`}
                  className={`block text-center py-3.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 ${
                    isPro
                      ? 'bg-gold hover:bg-gold text-ink shadow-lg shadow-gold/30'
                      : 'bg-electric/10 hover:bg-electric/20 text-electric'
                  }`}
                >
                  {t.pricing.choose} {plan.name}
                </Link>

                {/* En savoir plus */}
                <div className={`mt-4 pt-4 ${isPro ? 'border-t border-white/20' : 'border-t border-gray-100 dark:border-white/10'}`}>
                  <Link
                    href={`/tarifs/${slug}`}
                    className={`group/btn w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-sm border-2 transition-all duration-200 ${
                      isPro
                        ? 'text-white border-white hover:bg-white hover:text-navy'
                        : i === 0
                          ? 'text-electric border-electric hover:bg-electric hover:text-white'
                          : 'text-[#F59E0B] border-[#F59E0B] hover:bg-[#F59E0B] hover:text-ink'
                    }`}
                  >
                    {t.pricing.learnMore}
                    <ArrowRight size={14} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
