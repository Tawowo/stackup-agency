'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star, MessageSquare } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Testimonials() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="temoignages" className="py-24 lg:py-32 bg-background dark:bg-[#0A0F1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-semibold mb-4">
            Avis clients
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground dark:text-white mb-4">
            {t.testimonials.title}
          </h2>
          <p className="text-foreground/60 dark:text-white/60 text-lg">{t.testimonials.subtitle}</p>
        </motion.div>

        {/* Placeholder cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass dark:bg-white/5 rounded-2xl p-6 border border-dashed border-navy/20 dark:border-white/20 flex flex-col items-center justify-center text-center min-h-[200px] gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-navy/5 dark:bg-white/10 flex items-center justify-center">
                <MessageSquare size={20} className="text-navy/30 dark:text-white/30" />
              </div>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={16} className="text-gold/30" />
                ))}
              </div>
              <p className="text-foreground/30 dark:text-white/30 text-sm italic">
                Votre avis arrive bientôt...
              </p>
            </motion.div>
          ))}
        </div>

        {/* Placeholder message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-foreground/40 dark:text-white/40 text-sm">{t.testimonials.placeholder}</p>
          <a
            href="#contact"
            className="inline-block mt-4 px-6 py-2.5 bg-navy/5 dark:bg-white/10 text-navy dark:text-white rounded-xl text-sm font-medium hover:bg-navy/10 transition-colors"
          >
            Devenir notre premier client →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
