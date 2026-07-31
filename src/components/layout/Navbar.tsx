'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sun, Moon, ChevronDown } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { usePathname } from 'next/navigation'
import { useBanniere } from '@/contexts/BanniereContext'

const SERVICES_LINKS = [
  { href: '/services/site-vitrine', label: 'Site vitrine' },
  { href: '/services/site-multi-pages', label: 'Site multi-pages' },
  { href: '/services/site-ecommerce', label: 'Boutique en ligne' },
  { href: '/services/systeme-gestion', label: 'Système de gestion' },
  { href: '/services/site-association', label: 'Site association' },
]

const OUTILS_LINKS = [
  { href: '/devis', label: 'Devis express' },
  { href: '/outils/audit-site', label: 'Audit de site gratuit' },
  { href: '/outils/studio-de-style', label: 'Studio de style' },
  { href: '/ressources/cahier-des-charges', label: 'Cahier des charges' },
  { href: '/comparatif/wix-wordpress-sur-mesure', label: 'Comparateur solutions' },
]

export default function Navbar() {
  const { dark, toggleDark } = useTheme()
  const { banniereActive } = useBanniere()
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [outilsOpen, setOutilsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const servicesRef = useRef<HTMLDivElement>(null)
  const outilsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
      if (outilsRef.current && !outilsRef.current.contains(e.target as Node)) {
        setOutilsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isHome = pathname === '/'
  const navBg = !isHome
    ? 'bg-[#1E3A5F]'
    : scrolled
    ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg shadow-black/5 border-b border-navy/10 dark:border-white/10'
    : 'bg-transparent'

  const linkClass = !isHome
    ? 'text-white hover:text-amber-400'
    : scrolled
    ? 'text-gray-900 dark:text-white hover:text-electric-ink dark:hover:text-electric'
    : 'text-white hover:text-white/80'

  const barColor = open ? 'bg-white' : !isHome || scrolled ? 'bg-gray-900 dark:bg-white' : 'bg-white'

  const dropdownCls = (isOpen: boolean) =>
    `absolute top-full left-1/2 -translate-x-1/2 mt-2 rounded-xl bg-white dark:bg-gray-900 shadow-xl border border-gray-100 dark:border-white/10 py-1 transition-all duration-150 ${isOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-1'}`

  return (
    <>
      <nav className={`fixed left-0 right-0 z-50 transition-all duration-300 ${navBg} top-0 ${banniereActive ? 'lg:top-9' : ''}`} role="navigation" aria-label="Navigation principale">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Stackup Agency — Accueil">
              <Image src="/logo-icon.png" alt="Stackup Agency" width={40} height={40} quality={100} className="object-contain" priority />
              <div className="flex flex-col leading-tight">
                <span className={`font-bold text-lg tracking-tight transition-colors ${!isHome ? 'text-white' : scrolled ? 'text-[#1E3A5F] dark:text-white' : 'text-white'}`}>Stackup</span>
                <span className={`font-light text-[10px] tracking-[0.2em] uppercase transition-colors ${!isHome ? 'text-white/70' : scrolled ? 'text-[#1E3A5F]/70 dark:text-white/70' : 'text-white/70'}`}>Agency</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-5">
              {/* Services dropdown */}
              <div className="relative" ref={servicesRef}>
                <button
                  onClick={() => { setServicesOpen(v => !v); setOutilsOpen(false) }}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  className={`flex items-center gap-1 text-sm font-medium transition-colors ${linkClass}`}
                >
                  Services
                  <ChevronDown size={13} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`${dropdownCls(servicesOpen)} w-52`} role="menu">
                  {SERVICES_LINKS.map(l => (
                    <Link key={l.href} href={l.href} role="menuitem" onClick={() => setServicesOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-700 dark:text-white/80 hover:bg-blue-50 dark:hover:bg-white/5 hover:text-electric-ink dark:hover:text-electric transition-colors">
                      {l.label}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 dark:border-white/10 my-1" />
                  <Link href="/services" role="menuitem" onClick={() => setServicesOpen(false)}
                    className="block px-4 py-2.5 text-sm font-semibold text-electric-ink dark:text-electric hover:bg-blue-50 dark:hover:bg-white/5 transition-colors">
                    Voir tous les services →
                  </Link>
                </div>
              </div>

              <Link href="/tarifs" aria-current={pathname === '/tarifs' ? 'page' : undefined} className={`text-sm font-medium transition-colors ${linkClass}`}>Tarifs</Link>
              <Link href="/realisations" aria-current={pathname === '/realisations' ? 'page' : undefined} className={`text-sm font-medium transition-colors ${linkClass}`}>Réalisations</Link>
              <Link href="/blog" aria-current={pathname.startsWith('/blog') ? 'page' : undefined} className={`text-sm font-medium transition-colors ${linkClass}`}>Blog</Link>
              <Link href="/a-propos" aria-current={pathname === '/a-propos' ? 'page' : undefined} className={`text-sm font-medium transition-colors ${linkClass}`}>À propos</Link>

              {/* Outils dropdown */}
              <div className="relative" ref={outilsRef}>
                <button
                  onClick={() => { setOutilsOpen(v => !v); setServicesOpen(false) }}
                  aria-expanded={outilsOpen}
                  aria-haspopup="true"
                  className={`flex items-center gap-1 text-sm font-medium transition-colors ${linkClass}`}
                >
                  Outils
                  <ChevronDown size={13} className={`transition-transform ${outilsOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`${dropdownCls(outilsOpen)} w-56`} role="menu">
                  {OUTILS_LINKS.map(l => (
                    <Link key={l.href} href={l.href} role="menuitem" onClick={() => setOutilsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-700 dark:text-white/80 hover:bg-blue-50 dark:hover:bg-white/5 hover:text-electric-ink dark:hover:text-electric transition-colors">
                      {l.label}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 dark:border-white/10 my-1" />
                  <Link href="/outils" role="menuitem" onClick={() => setOutilsOpen(false)}
                    className="block px-4 py-2.5 text-sm font-semibold text-electric-ink dark:text-electric hover:bg-blue-50 dark:hover:bg-white/5 transition-colors">
                    Tous les outils →
                  </Link>
                </div>
              </div>

              <Link href="/parrainage" aria-current={pathname === '/parrainage' ? 'page' : undefined} className={`text-sm font-medium transition-colors ${linkClass}`}>Parrainage</Link>
            </div>

            {/* Desktop right */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <button onClick={toggleDark} aria-label="Basculer thème sombre"
                className={`p-2 rounded-lg transition-colors ${!isHome ? 'text-white/80 hover:text-white' : scrolled ? 'text-ink/70 dark:text-white/70 hover:text-electric-ink' : 'text-white/80 hover:text-white'}`}>
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <Link href="/devis" className="px-4 py-2.5 bg-gold hover:bg-gold/80 text-ink text-sm font-semibold rounded-xl shadow-lg shadow-amber-500/30 transition-all hover:-translate-y-0.5 whitespace-nowrap">
                Devis gratuit →
              </Link>
            </div>

            {/* Mobile dark mode */}
            <div className="flex lg:hidden items-center pr-12">
              <button onClick={toggleDark} aria-label="Basculer thème sombre"
                className={`p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors ${!isHome ? 'text-white' : scrolled ? 'text-gray-700 dark:text-white' : 'text-white'}`}>
                {dark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hamburger */}
      <button onClick={() => setOpen(!open)} type="button" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open}
        className="fixed top-3 right-4 z-[100] lg:hidden w-11 h-11 flex flex-col justify-center items-center gap-[5px]">
        <span className={`block w-6 h-0.5 transition-all duration-300 ${barColor} ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
        <span className={`block w-6 h-0.5 transition-all duration-300 ${barColor} ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-0.5 transition-all duration-300 ${barColor} ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-[90] bg-[#1E3A5F] overflow-y-auto lg:hidden">
          <div className="pt-20 px-6 pb-6 flex flex-col gap-1">
            <div className="py-2 px-4 text-xs font-semibold text-white/40 uppercase tracking-wider">Services</div>
            {SERVICES_LINKS.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="py-3 px-4 text-base font-medium text-white/80 hover:text-amber-400 rounded-xl hover:bg-white/10 transition-colors min-h-[48px] flex items-center">
                {l.label}
              </Link>
            ))}
            <div className="border-t border-white/10 my-2" />
            <div className="py-2 px-4 text-xs font-semibold text-white/40 uppercase tracking-wider">Outils gratuits</div>
            {OUTILS_LINKS.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="py-3 px-4 text-base font-medium text-white/80 hover:text-amber-400 rounded-xl hover:bg-white/10 transition-colors min-h-[48px] flex items-center">
                {l.label}
              </Link>
            ))}
            <Link href="/outils" onClick={() => setOpen(false)}
              className="py-3 px-4 text-sm font-semibold text-electric hover:text-amber-400 rounded-xl hover:bg-white/10 transition-colors min-h-[48px] flex items-center">
              Tous les outils →
            </Link>
            <div className="border-t border-white/10 my-2" />
            {[
              { href: '/tarifs', label: 'Tarifs' },
              { href: '/realisations', label: 'Réalisations' },
              { href: '/blog', label: 'Blog' },
              { href: '/a-propos', label: 'À propos' },
              { href: '/faq', label: 'FAQ' },
              { href: '/parrainage', label: 'Parrainage' },
            ].map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="py-4 px-4 text-lg font-medium text-white hover:text-amber-400 rounded-xl hover:bg-white/10 transition-colors min-h-[56px] flex items-center">
                {l.label}
              </Link>
            ))}
            <div className="pt-4 mt-3 border-t border-white/10">
              <Link href="/devis" onClick={() => setOpen(false)}
                className="flex items-center justify-center py-3 bg-gold text-ink text-sm font-semibold rounded-xl min-h-[48px] hover:bg-gold/80 transition-colors">
                Devis gratuit →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
