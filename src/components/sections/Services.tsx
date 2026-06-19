'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Globe, ShoppingCart, LayoutDashboard, Code2, Palette, TrendingUp, Wrench } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const icons = [Globe, ShoppingCart, LayoutDashboard, Code2, Palette, TrendingUp, Wrench]

const colors = [
  'from-blue-500 to-electric',
  'from-emerald-500 to-teal-600',
  'from-purple-500 to-violet-600',
  'from-electric to-navy',
  'from-pink-500 to-rose-600',
  'from-orange-500 to-amber-600',
  'from-slate-500 to-slate-700',
]

export default function Services() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="py-24 lg:py-32 bg-background dark:bg-[#0A0F1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-electric/10 text-electric text-sm font-semibold mb-4">
            Ce que nous faisons
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground dark:text-white mb-4">
            {t.services.title}
          </h2>
          <p className="text-foreground/60 dark:text-white/60 text-lg max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {t.services.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative glass dark:bg-white/5 rounded-2xl p-6 hover:shadow-xl hover:shadow-electric/10 transition-all duration-300 hover:-translate-y-1 cursor-default"
                data-hover
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[i]} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-foreground dark:text-white mb-2 text-lg">
                  {item.title}
                </h3>
                <p className="text-foreground/60 dark:text-white/60 text-sm leading-relaxed">
                  {item.desc}
                </p>
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-electric to-gold rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            )
          })}

          {/* CTA card */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.56 }}
            className="group relative rounded-2xl p-6 bg-gradient-to-br from-navy to-electric flex flex-col justify-between min-h-[180px] hover:shadow-xl hover:shadow-electric/30 transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              <div className="text-3xl font-black text-white mb-2">→</div>
              <h3 className="font-bold text-white text-lg mb-2">Votre projet</h3>
              <p className="text-white/70 text-sm">Discutons de vos besoins spécifiques.</p>
            </div>
            <span className="text-gold font-semibold text-sm group-hover:translate-x-1 transition-transform inline-block">
              Nous contacter →
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  )
}
