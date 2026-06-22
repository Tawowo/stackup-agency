'use client'
import { motion } from 'framer-motion'
import { ArrowDown, ChevronRight, Mail } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

function AbstractIllustration() {
  return (
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Background circles */}
      <circle cx="350" cy="150" r="180" fill="#2D7DD2" opacity="0.06" />
      <circle cx="400" cy="320" r="120" fill="#F59E0B" opacity="0.08" />
      <circle cx="200" cy="380" r="90" fill="#1E3A5F" opacity="0.05" />

      {/* Grid lines */}
      {[100, 200, 300, 400].map(x => (
        <line key={`v${x}`} x1={x} y1="50" x2={x} y2="450" stroke="#1E3A5F" strokeWidth="0.5" opacity="0.08" />
      ))}
      {[100, 200, 300, 400].map(y => (
        <line key={`h${y}`} x1="50" y1={y} x2="450" y2={y} stroke="#1E3A5F" strokeWidth="0.5" opacity="0.08" />
      ))}

      {/* Geometric shapes */}
      <rect x="280" y="80" width="90" height="90" rx="16" fill="none" stroke="#2D7DD2" strokeWidth="2" opacity="0.3" transform="rotate(15 325 125)" />
      <rect x="320" y="200" width="60" height="60" rx="10" fill="#2D7DD2" opacity="0.12" transform="rotate(-10 350 230)" />
      <polygon points="150,120 220,80 240,160 170,180" fill="#F59E0B" opacity="0.12" />
      <circle cx="380" cy="380" r="40" fill="none" stroke="#F59E0B" strokeWidth="2" opacity="0.3" />
      <circle cx="380" cy="380" r="20" fill="#F59E0B" opacity="0.15" />

      {/* Connector dots */}
      {[[130,250],[230,180],[310,290],[410,200]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill="#2D7DD2" opacity="0.25" />
      ))}
      <polyline points="130,250 230,180 310,290 410,200" fill="none" stroke="#2D7DD2" strokeWidth="1.5" opacity="0.15" strokeDasharray="6 4" />

      {/* Accent bar */}
      <rect x="80" y="340" width="120" height="6" rx="3" fill="#2D7DD2" opacity="0.2" />
      <rect x="80" y="354" width="70" height="4" rx="2" fill="#F59E0B" opacity="0.25" />

      {/* Code bracket hint */}
      <text x="60" y="200" fontFamily="monospace" fontSize="48" fill="#1E3A5F" opacity="0.06">{'<'}</text>
      <text x="420" y="320" fontFamily="monospace" fontSize="48" fill="#1E3A5F" opacity="0.06">{'>'}</text>
    </svg>
  )
}

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#F8FAFC] dark:bg-[#060D1A]">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#1E3A5F 1px, transparent 1px), linear-gradient(90deg, #1E3A5F 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">

          {/* Left — text */}
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-electric/10 dark:bg-electric/20 text-electric text-sm font-semibold mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
              Agence digitale — France
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#0F172A] dark:text-white leading-[1.08] mb-4 tracking-tight"
            >
              {t.hero.title1}
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] mb-8 tracking-tight text-electric"
            >
              {t.hero.title2}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-base sm:text-lg text-[#475569] dark:text-white/60 max-w-xl mb-10 leading-relaxed"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#services"
                className="group flex items-center justify-center gap-2 px-7 py-3.5 bg-[#1E3A5F] hover:bg-navy/90 text-white font-semibold rounded-xl shadow-md shadow-navy/20 hover:shadow-navy/30 transition-all hover:-translate-y-0.5 text-sm"
              >
                {t.hero.cta1}
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="group flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-[#1E3A5F] dark:border-white/30 text-[#1E3A5F] dark:text-white hover:bg-[#1E3A5F] hover:text-white dark:hover:bg-white/10 font-semibold rounded-xl transition-all hover:-translate-y-0.5 text-sm"
              >
                <Mail size={16} />
                {t.hero.cta2}
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="mt-14 flex gap-8 sm:gap-12"
            >
              {[
                { value: '10j', label: 'Délai moyen' },
                { value: '449€', label: 'Dès' },
                { value: '72h', label: 'Réponse garantie' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-2xl sm:text-3xl font-black text-[#1E3A5F] dark:text-white mb-0.5">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-[#475569] dark:text-white/40">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block w-full max-w-lg mx-auto"
          >
            <AbstractIllustration />
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-[#1E3A5F]/30 dark:text-white/30"
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
