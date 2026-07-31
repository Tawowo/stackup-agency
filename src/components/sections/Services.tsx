'use client'
import { motion } from 'framer-motion'
import { Globe, ShoppingCart, LayoutDashboard, FileText, Palette, TrendingUp, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'

const serviceData = [
  { icon: Globe,          slug: 'site-vitrine',       color: 'from-electric to-navy',  bg: 'bg-electric/10 dark:bg-electric/10', price: 'À partir de 449€',    border: 'border-electric/40  hover:border-electric'  },
  { icon: FileText,       slug: 'site-multi-pages',   color: 'from-navy to-electric',  bg: 'bg-navy/10 dark:bg-navy/20',         price: 'À partir de 749€',    border: 'border-navy/30      hover:border-electric'  },
  { icon: ShoppingCart,   slug: 'site-ecommerce',     color: 'from-gold to-amber-400', bg: 'bg-gold/10 dark:bg-gold/10',         price: 'À partir de 1 647€',  border: 'border-gold/40      hover:border-gold'      },
  { icon: LayoutDashboard,slug: 'systeme-gestion',    color: 'from-electric to-navy',  bg: 'bg-electric/10 dark:bg-electric/10', price: 'À partir de 1 447€',  border: 'border-electric/40  hover:border-electric'  },
  { icon: Palette,        slug: 'site-association',   color: 'from-navy to-electric',  bg: 'bg-navy/10 dark:bg-navy/20',         price: 'À partir de 149€',    border: 'border-navy/30      hover:border-electric'  },
  { icon: TrendingUp,     slug: 'marketing-digital',  color: 'from-gold to-amber-400', bg: 'bg-gold/10 dark:bg-gold/10',         price: 'À partir de 299€/mois', border: 'border-gold/40    hover:border-gold'      },
]

export default function Services() {
  const { t } = useLanguage()

  return (
    <section id="services" className="py-24 lg:py-32 bg-[#F8FAFC] dark:bg-[#0A0F1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
         
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.services.title}
          </h2>
          <p className="text-ink/70 dark:text-white/60 text-lg max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {t.services.items.slice(0, 6).map((item, i) => {
            const { icon: Icon, slug, color, bg, price, border } = serviceData[i]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`group relative bg-white dark:bg-white/5 rounded-2xl p-7 border-2 ${border} border-opacity-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col`}
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
                  {t.services.learnMore}
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )
          })}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="group relative rounded-2xl p-7 bg-gradient-to-br from-navy via-[#1a3254] to-electric flex flex-col justify-between hover:shadow-2xl hover:shadow-electric/30 transition-all duration-300 hover:-translate-y-1.5"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5 text-2xl font-black text-white group-hover:bg-white/20 transition-colors">
                ✦
              </div>
              <h3 className="font-bold text-white text-xl mb-2">{t.services.customProject}</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {t.services.customProjectDesc}
              </p>
            </div>
            <Link
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold text-ink rounded-xl text-sm font-semibold transition-all group-hover:-translate-y-0.5"
            >
              {t.services.contactUs}
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
