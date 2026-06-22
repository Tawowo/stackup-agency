'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Globe, ShoppingCart, LayoutDashboard, FileText, Palette, TrendingUp, Wrench, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'

const serviceData = [
  { icon: Globe,          slug: 'site-vitrine',       color: 'from-blue-500 to-electric',     bg: 'bg-blue-50 dark:bg-blue-900/20',       price: 'À partir de 449€'        },
  { icon: FileText,       slug: 'site-multi-pages',   color: 'from-emerald-500 to-teal-600',  bg: 'bg-emerald-50 dark:bg-emerald-900/20', price: 'À partir de 749€'        },
  { icon: ShoppingCart,   slug: 'site-ecommerce',     color: 'from-purple-500 to-violet-600', bg: 'bg-purple-50 dark:bg-purple-900/20',   price: 'À partir de 1 147€'      },
  { icon: LayoutDashboard,slug: 'systeme-gestion',    color: 'from-electric to-navy',         bg: 'bg-sky-50 dark:bg-sky-900/20',         price: 'À partir de 1 447€'      },
  { icon: Palette,        slug: 'design-branding',    color: 'from-pink-500 to-rose-600',     bg: 'bg-pink-50 dark:bg-pink-900/20',       price: 'À partir de 189€'        },
  { icon: TrendingUp,     slug: 'marketing-digital',  color: 'from-orange-500 to-amber-600',  bg: 'bg-orange-50 dark:bg-orange-900/20',   price: 'Sur devis'               },
  { icon: Wrench,         slug: 'maintenance-support',color: 'from-slate-500 to-slate-700',   bg: 'bg-slate-50 dark:bg-slate-900/20',     price: 'À partir de 29€/mois'   },
]

export default function Services() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" className="py-24 lg:py-32 bg-[#F8FAFC] dark:bg-[#0A0F1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.services.title}
          </h2>
          <p className="text-gray-600 dark:text-white/60 text-lg max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {t.services.items.map((item, i) => {
            const { icon: Icon, slug, color, bg, price } = serviceData[i]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group relative bg-white dark:bg-white/5 rounded-2xl p-7 border border-gray-100 dark:border-white/10 hover:shadow-2xl hover:shadow-electric/10 hover:border-electric/30 dark:hover:border-electric/30 transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
              >
                <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md`}>
                    <Icon size={18} className="text-white" />
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg group-hover:text-electric transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 dark:text-white/60 text-sm leading-relaxed flex-1 mb-4">
                  {item.desc}
                </p>

                <span className="text-sm font-bold text-electric mb-3 block">{price}</span>

                <Link
                  href={`/services/${slug}`}
                  className="inline-flex items-center gap-2 text-electric text-sm font-semibold group-hover:gap-3 transition-all"
                >
                  En savoir plus
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r ${color} rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </motion.div>
            )
          })}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="group relative rounded-2xl p-7 bg-gradient-to-br from-navy via-[#1a3254] to-electric flex flex-col justify-between hover:shadow-2xl hover:shadow-electric/30 transition-all duration-300 hover:-translate-y-1.5"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5 text-2xl font-black text-white group-hover:bg-white/20 transition-colors">
                ✦
              </div>
              <h3 className="font-bold text-white text-xl mb-2">Projet sur mesure</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Vous avez un besoin spécifique ? Discutons de votre projet, gratuit et sans engagement.
              </p>
            </div>
            <Link
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-amber-500 text-white rounded-xl text-sm font-semibold transition-all group-hover:-translate-y-0.5"
            >
              Nous contacter
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
