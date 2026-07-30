'use client'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { SITE } from '@/config/site'
import { ArrowRight } from 'lucide-react'
import Odometer from '@/components/ui/Odometer'

const STACK = [
  {
    titre: 'Site vitrine',
    prix: SITE.pricing.vitrine,
    delai: SITE.delais.vitrine,
    desc: 'Présence professionnelle en ligne, SEO local, formulaire de contact. Tout inclus, sans frais cachés.',
    href: '/services/site-vitrine',
    bgLight: '#FFFFFF',
    bgDark: '#0F1E32',
    accent: '#2D7DD2',
    badge: 'Le plus rapide',
  },
  {
    titre: 'Site multi-pages',
    prix: SITE.pricing.multipages,
    delai: SITE.delais.multipages,
    desc: 'Site complet avec blog, galerie, pages service, Google Analytics et formulaires avancés.',
    href: '/services/site-multi-pages',
    bgLight: '#F0F6FF',
    bgDark: '#111827',
    accent: '#1B5A9E',
    badge: null,
  },
  {
    titre: 'Boutique en ligne',
    prix: SITE.pricing.ecommerce,
    delai: SITE.delais.ecommerce,
    desc: 'E-commerce complet avec catalogue, paiement Stripe, gestion des stocks et tableau de bord.',
    href: '/services/site-ecommerce',
    bgLight: '#FFFBF0',
    bgDark: '#1A1610',
    accent: '#F59E0B',
    badge: 'Le plus populaire',
  },
  {
    titre: 'Site association',
    prix: SITE.pricing.association,
    delai: SITE.delais.association,
    desc: 'Site loi 1901 avec adhésion en ligne, agenda des événements et formulaire de bénévolat.',
    href: '/services/site-association',
    bgLight: '#F0FFF4',
    bgDark: '#0F1F15',
    accent: '#16A34A',
    badge: null,
  },
  {
    titre: 'Système de gestion',
    prix: SITE.pricing.gestion,
    delai: SITE.delais.vitrine, // 10 jours ouvrés per CGV for base delivery
    desc: 'Logiciel sur mesure : caisse, agenda, CRM, commandes. Données hébergées en France.',
    href: '/services/systeme-gestion',
    bgLight: '#F8FAFC',
    bgDark: '#0D1320',
    accent: '#29C36A',
    badge: 'Sur mesure',
  },
  {
    titre: 'Marketing digital',
    prix: 299,
    delai: null,
    desc: 'Stratégie SEO, Google Ads, réseaux sociaux et reporting mensuel pour booster votre visibilité.',
    href: '/services',
    bgLight: '#FFF0FF',
    bgDark: '#160F1A',
    accent: '#9333EA',
    badge: null,
  },
  {
    titre: 'Rédaction blog SEO',
    prix: 25,
    delai: null,
    desc: 'Articles optimisés SEO rédigés par des experts, publiés et maillés dans votre site.',
    href: '/services/redaction-blog-seo',
    bgLight: '#FFFAF0',
    bgDark: '#1A1508',
    accent: '#D97706',
    badge: null,
  },
]

const TOP_OFFSET = 80
const CARD_PEEK  = 10

export default function StickyServiceStack() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isDesktop, setIsDesktop] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setIsDesktop(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', onChange)

    const dq = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDark(dq.matches || document.documentElement.classList.contains('dark'))
    const onDark = (e: MediaQueryListEvent) => setIsDark(e.matches)
    dq.addEventListener('change', onDark)

    return () => {
      mq.removeEventListener('change', onChange)
      dq.removeEventListener('change', onDark)
    }
  }, [])

  useEffect(() => {
    if (!isDesktop) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    const handleScroll = () => {
      const wrap = wrapRef.current
      if (!wrap) return
      const { top } = wrap.getBoundingClientRect()
      const scrolledIn = Math.max(0, -(top - window.innerHeight * 0.6))

      cardRefs.current.forEach((card, i) => {
        if (!card || i === STACK.length - 1) return
        const fadeStart = i * 140
        const fadeEnd   = (i + 1) * 140
        const p = Math.max(0, Math.min(1, (scrolledIn - fadeStart) / (fadeEnd - fadeStart)))
        const scale   = 1 - p * 0.04
        card.style.transform = `scale(${scale})`
        card.style.opacity   = String(1 - p * 0.35)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDesktop])

  return (
    <>
      {/* ── Desktop: sticky stack ───────────────────────────── */}
      <div
        ref={wrapRef}
        className="hidden lg:block relative"
        style={{ paddingBottom: `${STACK.length * 20}px` }}
      >
        {STACK.map((s, i) => {
          const bg = isDark ? s.bgDark : s.bgLight
          const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
          const titleColor  = isDark ? '#FFFFFF' : '#1E293B'
          const descColor   = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(30,41,59,0.6)'
          const metaColor   = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(30,41,59,0.4)'

          return (
            <div
              key={s.titre}
              ref={el => { cardRefs.current[i] = el }}
              className="sticky transition-none will-change-transform"
              style={{
                top: `${TOP_OFFSET + i * CARD_PEEK}px`,
                zIndex: 10 + i,
                marginBottom: i < STACK.length - 1 ? '120px' : 0,
              }}
            >
              <Link
                href={s.href}
                className="group block rounded-2xl overflow-hidden"
                style={{
                  background: bg,
                  border: `1px solid ${borderColor}`,
                  boxShadow: isDark
                    ? '0 4px 24px rgba(0,0,0,0.4)'
                    : '0 4px 24px rgba(0,0,0,0.08)',
                }}
              >
                <div className="flex items-center justify-between px-8 py-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {s.badge && (
                        <span
                          className="px-2.5 py-0.5 text-xs font-semibold rounded-full"
                          style={{ background: `${s.accent}22`, color: s.accent }}
                        >
                          {s.badge}
                        </span>
                      )}
                      <span className="text-xs font-mono" style={{ color: metaColor }}>
                        {String(i + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(STACK.length).padStart(2, '0')}
                      </span>
                    </div>
                    <h3
                      className="font-display font-bold text-2xl mb-1 group-hover:opacity-80 transition-opacity"
                      style={{ color: titleColor }}
                    >
                      {s.titre}
                    </h3>
                    <p className="text-sm max-w-xl leading-relaxed" style={{ color: descColor }}>
                      {s.desc}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-4 ml-8 shrink-0">
                    <div className="text-right">
                      <div className="font-display font-bold text-3xl" style={{ color: s.accent }}>
                        {s.prix && <><Odometer value={s.prix} />
                        {s.titre === 'Rédaction blog SEO' ? '€/art.' : '€'}</>}
                      </div>
                      {s.delai && (
                        <div className="text-xs mt-0.5" style={{ color: metaColor }}>
                          Livraison : {s.delai}
                        </div>
                      )}
                    </div>
                    <span
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all group-hover:gap-3"
                      style={{
                        background: `${s.accent}18`,
                        border: `1px solid ${s.accent}35`,
                        color: s.accent,
                      }}
                    >
                      Découvrir <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
                {/* Accent bottom strip */}
                <div
                  className="h-px w-full"
                  style={{ background: `linear-gradient(90deg, transparent, ${s.accent}80, transparent)` }}
                />
              </Link>
            </div>
          )
        })}
      </div>

      {/* ── Mobile: simple cards grid ──────────────────────── */}
      <div className="lg:hidden grid sm:grid-cols-2 gap-4">
        {STACK.map(s => (
          <Link
            key={s.titre}
            href={s.href}
            className="group block p-5 rounded-2xl border border-navy/20 dark:border-white/10 hover:border-electric/40 transition-colors bg-white dark:bg-[#0D1626]"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-foreground dark:text-white group-hover:text-electric transition-colors">
                {s.titre}
              </h3>
              <span className="font-bold text-sm ml-2 shrink-0" style={{ color: s.accent }}>
                {s.prix}€{s.titre === 'Rédaction blog SEO' ? '/art.' : ''}
              </span>
            </div>
            <p className="text-foreground/60 dark:text-white/60 text-sm mb-2">{s.desc}</p>
            {s.delai && (
              <span className="text-xs text-electric-ink dark:text-electric">Livraison : {s.delai}</span>
            )}
          </Link>
        ))}
      </div>
    </>
  )
}
