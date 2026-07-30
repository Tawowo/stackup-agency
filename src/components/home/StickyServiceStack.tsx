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
    bg: '#1E3A5F',
    accent: '#2D7DD2',
    badge: 'Le plus rapide',
  },
  {
    titre: 'Boutique en ligne',
    prix: SITE.pricing.ecommerce,
    delai: SITE.delais.ecommerce,
    desc: 'E-commerce complet avec catalogue, paiement Stripe, gestion des stocks et tableau de bord.',
    href: '/services/site-ecommerce',
    bg: '#2E2B28',
    accent: '#F59E0B',
    badge: 'Le plus populaire',
  },
  {
    titre: 'Site multi-pages',
    prix: SITE.pricing.multipages,
    delai: SITE.delais.multipages,
    desc: 'Site complet avec blog, galerie, pages service, Google Analytics et formulaires avancés.',
    href: '/services/site-multi-pages',
    bg: '#17202A',
    accent: '#008C8C',
    badge: null,
  },
  {
    titre: 'Système de gestion',
    prix: SITE.pricing.gestion,
    delai: '4 semaines',
    desc: 'Logiciel sur mesure : caisse, agenda, CRM, commandes. Données hébergées en France.',
    href: '/services/systeme-gestion',
    bg: '#101828',
    accent: '#29C36A',
    badge: 'Sur mesure',
  },
]

const TOP_OFFSET = 80   // sticky top offset in px
const CARD_PEEK  = 12   // px of each card peeking above the next

export default function StickyServiceStack() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setIsDesktop(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
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
        // Each card starts fading/scaling when the next one overlaps it
        const fadeStart = i * 140
        const fadeEnd   = (i + 1) * 140
        const p = Math.max(0, Math.min(1, (scrolledIn - fadeStart) / (fadeEnd - fadeStart)))
        const scale   = 1 - p * 0.04
        const opacity = 1 - p * 0.35
        card.style.transform = `scale(${scale})`
        card.style.opacity   = String(opacity)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDesktop])

  return (
    <>
      {/* ── Desktop: sticky stack ────────────────────────── */}
      <div ref={wrapRef} className="hidden lg:block relative" style={{ paddingBottom: `${STACK.length * 20}px` }}>
        {STACK.map((s, i) => (
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
            <Link href={s.href} className="group block rounded-2xl overflow-hidden border border-white/10"
              style={{ background: `linear-gradient(135deg, ${s.bg} 0%, ${s.bg}DD 100%)` }}>
              <div className="flex items-center justify-between px-8 py-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {s.badge && (
                      <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full"
                        style={{ background: `${s.accent}30`, color: s.accent }}>
                        {s.badge}
                      </span>
                    )}
                    <span className="text-white/30 text-xs font-mono">
                      {String(i + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(STACK.length).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white mb-1 group-hover:text-white/90 transition-colors">
                    {s.titre}
                  </h3>
                  <p className="text-white/60 text-sm max-w-xl leading-relaxed">{s.desc}</p>
                </div>
                <div className="flex flex-col items-end gap-4 ml-8 shrink-0">
                  <div className="text-right">
                    <div className="font-display font-bold text-3xl" style={{ color: s.accent }}>
                      <Odometer value={s.prix} suffix="€" />
                    </div>
                    <div className="text-white/40 text-xs mt-0.5">Livraison : {s.delai}</div>
                  </div>
                  <span
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all group-hover:gap-3"
                    style={{ background: `${s.accent}30`, border: `1px solid ${s.accent}40` }}
                  >
                    Découvrir <ArrowRight size={14} />
                  </span>
                </div>
              </div>
              {/* Bottom strip — accent color line */}
              <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)` }} />
            </Link>
          </div>
        ))}
      </div>

      {/* ── Mobile: simple cards grid (conservé) ─────────── */}
      <div className="lg:hidden grid sm:grid-cols-2 gap-4">
        {STACK.map(s => (
          <Link
            key={s.titre}
            href={s.href}
            className="group block p-5 rounded-2xl border border-navy/20 dark:border-white/10 hover:border-electric/40 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-foreground dark:text-white group-hover:text-electric transition-colors">
                {s.titre}
              </h3>
              <span className="text-navy dark:text-gold font-bold text-sm ml-2 shrink-0">{s.prix}€</span>
            </div>
            <p className="text-foreground/60 dark:text-white/60 text-sm mb-2">{s.desc}</p>
            <span className="text-xs text-electric-ink dark:text-electric">Livraison : {s.delai}</span>
          </Link>
        ))}
      </div>
    </>
  )
}
