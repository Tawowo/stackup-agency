'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, DollarSign, Layers, PenSquare, User, HelpCircle, Gift } from 'lucide-react'
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
  const { banniereActive } = useBanniere()
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [outilsOpen, setOutilsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [navHidden, setNavHidden] = useState(false)
  const lastScrollY = useRef(0)
  const pathname = usePathname()
  const servicesRef = useRef<HTMLDivElement>(null)
  const outilsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const curr = window.scrollY
      const prev = lastScrollY.current
      lastScrollY.current = curr
      setScrolled(curr > 20)
      if (curr > 120 && curr > prev + 4) setNavHidden(true)
      else if (curr < prev - 4) setNavHidden(false)
      if (curr < 80) setNavHidden(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false)
      if (outilsRef.current && !outilsRef.current.contains(e.target as Node)) setOutilsOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isHome = pathname === '/'

  // V4 : navbar toujours claire
  // - Sur home non scrollée : fond transparent sur hero (texte blanc car hero sombre/coloré)
  // - Scrollée ou hors home : fond blanc/ivoire, texte navy
  const navBg = scrolled || !isHome
    ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
    : 'bg-transparent'

  const linkClass = scrolled || !isHome
    ? 'text-navy hover:text-gold'
    : 'text-white hover:text-white/80'

  const logoTextClass = scrolled || !isHome ? 'text-navy' : 'text-white'
  const logoSubClass  = scrolled || !isHome ? 'text-navy/60' : 'text-white/70'
  const barColor      = open ? 'bg-navy' : scrolled || !isHome ? 'bg-navy' : 'bg-white'

  const dropdownCls = (isOpen: boolean) =>
    `absolute top-full left-1/2 -translate-x-1/2 mt-2 rounded-2xl bg-white shadow-lift border border-gray-100 py-2 transition-all duration-200 dropdown-stagger ${isOpen ? 'opacity-100 pointer-events-auto translate-y-0 open' : 'opacity-0 pointer-events-none -translate-y-2'}`

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-50 nav-slide ${navBg} top-0 ${banniereActive ? 'lg:top-9' : ''} ${navHidden ? 'nav-hidden' : 'nav-visible'}`}
        role="navigation"
        aria-label="Navigation principale"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Stackup Agency — Accueil">
              <Image src="/logo-icon.png" alt="Stackup Agency" width={40} height={40} quality={100} className="object-contain" priority />
              <div className="flex flex-col leading-tight">
                <span className={`font-bold text-lg tracking-tight transition-colors ${logoTextClass}`}>Stackup</span>
                <span className={`font-light text-[10px] tracking-[0.2em] uppercase transition-colors ${logoSubClass}`}>Agency</span>
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
                      className="dropdown-item flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-navy transition-colors rounded-lg mx-1">
                      {l.label}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 my-1" />
                  <Link href="/services" role="menuitem" onClick={() => setServicesOpen(false)}
                    className="dropdown-item flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-electric-ink hover:bg-blue-50/70 transition-colors rounded-lg mx-1">
                    Voir tous les services <span className="arrow-slide">→</span>
                  </Link>
                </div>
              </div>

              <Link href="/tarifs" aria-current={pathname === '/tarifs' ? 'page' : undefined} className={`nav-link-animated text-sm font-medium transition-colors ${linkClass}`}>Tarifs</Link>
              <Link href="/realisations" aria-current={pathname === '/realisations' ? 'page' : undefined} className={`nav-link-animated text-sm font-medium transition-colors ${linkClass}`}>Réalisations</Link>
              <Link href="/blog" aria-current={pathname.startsWith('/blog') ? 'page' : undefined} className={`nav-link-animated text-sm font-medium transition-colors ${linkClass}`}>Blog</Link>
              <Link href="/a-propos" aria-current={pathname === '/a-propos' ? 'page' : undefined} className={`nav-link-animated text-sm font-medium transition-colors ${linkClass}`}>À propos</Link>

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
                      className="dropdown-item flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-navy transition-colors rounded-lg mx-1">
                      {l.label}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 my-1 mx-3" />
                  <Link href="/outils" role="menuitem" onClick={() => setOutilsOpen(false)}
                    className="dropdown-item flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-electric-ink hover:bg-blue-50/70 transition-colors rounded-lg mx-1">
                    Tous les outils <span className="arrow-slide">→</span>
                  </Link>
                </div>
              </div>

              <Link href="/parrainage" aria-current={pathname === '/parrainage' ? 'page' : undefined} className={`text-sm font-medium transition-colors ${linkClass}`}>Parrainage</Link>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link href="/devis" className="px-4 py-2.5 bg-gold hover:bg-gold/80 text-ink text-sm font-semibold rounded-xl shadow-lg shadow-amber-500/30 transition-all hover:-translate-y-0.5 whitespace-nowrap">
                Devis gratuit →
              </Link>
            </div>

            {/* Mobile hamburger spacing */}
            <div className="flex lg:hidden items-center pr-12" />
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

      {/* Mobile menu — fond blanc V4 */}
      <div className={`mobile-menu-overlay lg:hidden ${open ? 'menu-open' : ''}`} aria-hidden={!open}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.06) 0%, transparent 70%)' }} aria-hidden="true" />

        <div className="pt-20 px-6 pb-10 flex flex-col min-h-full">
          {/* Services */}
          <div className="mobile-menu-section mb-1">
            <p className="py-2 px-2 text-[10px] font-bold text-navy/30 uppercase tracking-[0.2em] mb-1">Services</p>
            <div className="flex flex-col gap-0.5">
              {SERVICES_LINKS.map((l, i) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="mobile-menu-item py-3 px-3 text-base font-medium text-navy/70 hover:text-navy hover:bg-amber-50 rounded-xl min-h-[48px] flex items-center gap-2 border border-transparent hover:border-gold/20"
                  style={{ transitionDelay: `${60 + i * 30}ms` }}>
                  <span className="w-1 h-1 rounded-full bg-gold/60 flex-shrink-0" aria-hidden="true" />
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="my-4 h-px bg-navy/8" />

          {/* Outils */}
          <div className="mobile-menu-section mb-1">
            <p className="py-2 px-2 text-[10px] font-bold text-navy/30 uppercase tracking-[0.2em] mb-1">Outils gratuits</p>
            <div className="flex flex-col gap-0.5">
              {OUTILS_LINKS.map((l, i) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="mobile-menu-item py-3 px-3 text-base font-medium text-navy/70 hover:text-navy hover:bg-amber-50 rounded-xl min-h-[48px] flex items-center gap-2 border border-transparent hover:border-gold/20"
                  style={{ transitionDelay: `${200 + i * 30}ms` }}>
                  <span className="w-1 h-1 rounded-full bg-electric/50 flex-shrink-0" aria-hidden="true" />
                  {l.label}
                </Link>
              ))}
              <Link href="/outils" onClick={() => setOpen(false)}
                className="mobile-menu-item py-2.5 px-3 text-sm font-semibold text-electric-ink hover:text-electric rounded-xl min-h-[44px] flex items-center"
                style={{ transitionDelay: '350ms' }}>
                Tous les outils →
              </Link>
            </div>
          </div>

          <div className="my-4 h-px bg-navy/8" />

          {/* Nav principale */}
          <div className="mobile-menu-section flex flex-col gap-0.5">
            {[
              { href: '/tarifs', label: 'Tarifs', Icon: DollarSign },
              { href: '/realisations', label: 'Réalisations', Icon: Layers },
              { href: '/blog', label: 'Blog', Icon: PenSquare },
              { href: '/a-propos', label: 'À propos', Icon: User },
              { href: '/faq', label: 'FAQ', Icon: HelpCircle },
              { href: '/parrainage', label: 'Parrainage', Icon: Gift },
            ].map((l, i) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="mobile-menu-item py-3.5 px-3 text-lg font-semibold text-navy hover:text-electric-ink hover:bg-blue-50/50 rounded-xl min-h-[56px] flex items-center gap-3 border border-transparent hover:border-electric/15"
                style={{ transitionDelay: `${360 + i * 35}ms` }}>
                <l.Icon size={18} strokeWidth={1.5} className="text-navy/40 flex-shrink-0" aria-hidden="true" />
                {l.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-8">
            <Link href="/devis" onClick={() => setOpen(false)}
              className="mobile-menu-cta flex items-center justify-center py-4 bg-gradient-to-r from-gold to-amber-400 text-ink text-base font-bold rounded-2xl min-h-[56px] shadow-lg shadow-gold/20 hover:opacity-90 transition-opacity">
              Devis gratuit →
            </Link>
            <p className="text-center text-navy/30 text-xs mt-4">Réponse sous 72h · Sans engagement</p>
          </div>
        </div>
      </div>
    </>
  )
}
