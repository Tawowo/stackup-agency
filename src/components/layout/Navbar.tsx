'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'

export default function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const { dark, toggleDark } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#services', label: t.nav.services },
    { href: '#tarifs', label: t.nav.pricing },
    { href: '#realisations', label: t.nav.portfolio },
    { href: '#apropos', label: t.nav.about },
    { href: '#blog', label: t.nav.blog },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#0A0F1C]/90 backdrop-blur-md shadow-lg shadow-navy/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-electric to-navy flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl text-navy dark:text-white tracking-tight">
              Stackup<span className="text-electric">.</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/70 dark:text-white/70 hover:text-electric dark:hover:text-electric transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-electric group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Right controls */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-navy/20 dark:border-white/20 text-navy dark:text-white hover:border-electric hover:text-electric transition-colors"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg text-foreground/60 dark:text-white/60 hover:text-electric hover:bg-electric/10 transition-colors"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href="#contact"
              className="px-5 py-2.5 bg-gold hover:bg-amber-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-gold/30 hover:shadow-gold/50 transition-all hover:-translate-y-0.5"
            >
              {t.nav.cta}
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button onClick={toggleDark} className="p-2 text-foreground/60 dark:text-white/60">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 text-foreground dark:text-white"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-[#0A0F1C] border-t border-navy/10 dark:border-white/10"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {links.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3 px-4 text-sm font-medium text-foreground dark:text-white hover:text-electric rounded-lg hover:bg-electric/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-navy/20 dark:border-white/20 text-navy dark:text-white"
                >
                  {lang === 'fr' ? 'EN' : 'FR'}
                </button>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex-1 py-2.5 text-center bg-gold text-white text-sm font-semibold rounded-xl"
                >
                  {t.nav.cta}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
