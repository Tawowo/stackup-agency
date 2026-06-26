'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const links = [
    { href: '#services', label: t.nav.services },
    { href: '#realisations', label: t.nav.portfolio },
    { href: '#apropos', label: t.nav.about },
    { href: '#blog', label: t.nav.blog },
    { href: '#contact', label: t.nav.contact },
  ]

  const linkClass = scrolled
    ? 'text-gray-900 dark:text-white hover:text-electric dark:hover:text-electric'
    : 'text-[#1E3A5F] hover:text-electric'

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg shadow-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-icon.png"
              alt="Stackup"
              width={45}
              height={45}
              quality={100}
              className="object-contain"
              priority
            />
            <div className="flex flex-col leading-tight">
              <span className={`font-bold text-xl tracking-tight transition-colors ${
                scrolled ? 'text-[#1E3A5F] dark:text-white' : 'text-[#1E3A5F]'
              }`}>Stackup</span>
              <span className={`font-light text-xs tracking-[0.2em] uppercase transition-colors ${
                scrolled ? 'text-[#1E3A5F]/70 dark:text-white/70' : 'text-[#1E3A5F]/70'
              }`}>Agency</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors relative group ${linkClass}`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-electric group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Right controls — desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors hover:border-electric hover:text-electric ${
                scrolled
                  ? 'border-gray-300 dark:border-white/20 text-gray-900 dark:text-white'
                  : 'border-[#1E3A5F]/40 text-[#1E3A5F]'
              }`}
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <button
              onClick={toggleDark}
              className={`p-2 rounded-lg transition-colors hover:text-electric hover:bg-electric/10 ${
                scrolled ? 'text-gray-600 dark:text-white/70' : 'text-[#1E3A5F]/80'
              }`}
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

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-1">
            <button
              onClick={toggleDark}
              className={`p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors ${scrolled ? 'text-gray-700 dark:text-white' : 'text-[#1E3A5F]'}`}
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className={`p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors ${scrolled ? 'text-gray-700 dark:text-white' : 'text-[#1E3A5F]'}`}
              aria-label="Toggle menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — full screen, always dark bg */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 top-16 z-40 bg-[#1E3A5F] overflow-y-auto"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {links.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-4 px-4 text-lg font-medium text-white hover:text-[#F59E0B] rounded-xl hover:bg-white/10 transition-colors min-h-[56px] flex items-center"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-4 mt-3 border-t border-white/10">
                <button
                  onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                  className="px-4 py-2.5 text-sm font-semibold rounded-xl border border-white/20 text-white min-h-[44px]"
                >
                  {lang === 'fr' ? 'EN' : 'FR'}
                </button>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex-1 py-3 text-center bg-gold text-white text-sm font-semibold rounded-xl min-h-[44px] flex items-center justify-center"
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
