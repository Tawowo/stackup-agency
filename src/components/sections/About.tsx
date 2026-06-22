'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Target, BookOpen, Users, Rocket } from 'lucide-react'
import Image from 'next/image'

const statIcons = [BookOpen, Target, Users, Rocket]

export default function About() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="apropos" className="py-24 lg:py-32 bg-white dark:bg-[#060D1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-electric/10 text-electric text-sm font-semibold mb-4">
              Notre histoire
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8">
              {t.about.title}
            </h2>
            <div className="space-y-4">
              {t.about.story.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                  className={`leading-relaxed ${i === 0 ? 'text-lg text-gray-900 dark:text-white font-medium' : 'text-gray-600 dark:text-white/60 text-sm'}`}
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <div className="space-y-6">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {t.about.stats.map((stat, i) => {
                const Icon = statIcons[i]
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.1 + 0.4 }}
                    className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10 shadow-sm"
                  >
                    <Icon size={22} className="text-electric mb-3" />
                    <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">{stat.value}</div>
                    <div className="text-gray-500 dark:text-white/60 text-sm">{stat.label}</div>
                  </motion.div>
                )
              })}
            </div>

            {/* Quote card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric"
            >
              <div className="text-gold text-5xl font-serif leading-none mb-3">&ldquo;</div>
              <p className="text-white font-medium text-lg leading-relaxed mb-6">
                Le digital ne devrait pas être un privilège. Nous le rendons accessible à ceux qui construisent vraiment.
              </p>
              <Image src="/logo-white.svg" alt="Stackup Agency" width={140} height={42} className="object-contain opacity-90" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
