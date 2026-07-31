'use client'
import Link from 'next/link'
import { useRef, MouseEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { SERVICES } from '@/config/site'
import { isRentreeActive } from '@/config/rentree'

function ServiceCard({
  s,
  index,
}: {
  s: (typeof SERVICES)[number]
  index: number
}) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    el.style.setProperty('--sx', `${x}%`)
    el.style.setProperty('--sy', `${y}%`)
  }

  function handleMouseLeave() {
    const el = cardRef.current
    if (!el) return
    el.style.setProperty('--sx', '50%')
    el.style.setProperty('--sy', '50%')
  }

  const showRenteeBadge = (s.id === 'site-vitrine' || s.id === 'site-multi-pages') && isRentreeActive()

  return (
    <Link
      ref={cardRef}
      href={s.href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="service-card group reveal-item block rounded-2xl border border-navy/20 dark:border-white/10 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-electric/40 hover:shadow-lg hover:shadow-electric/10"
      style={{
        animationDelay: `${index * 80}ms`,
        '--sx': '50%',
        '--sy': '50%',
      } as React.CSSProperties}
    >
      {/* Spotlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(200px circle at var(--sx) var(--sy), rgba(45,125,210,0.08), transparent 70%)',
        }}
      />

      <div className="relative">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {s.badge && (
            <span className="inline-block rounded-full bg-electric/10 px-2.5 py-0.5 text-xs font-semibold text-electric-ink dark:text-electric">
              {s.badge}
            </span>
          )}
          {showRenteeBadge && (
            <span className="inline-block rounded-full bg-gold/20 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:text-gold">
              🎒 Maquette offerte
            </span>
          )}
        </div>

        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-foreground dark:text-white group-hover:text-electric transition-colors leading-snug">
            {s.titre}
          </h3>
          <span className="shrink-0 font-bold text-sm text-navy dark:text-white">
            {s.prix ? <>À partir de {s.prix}&thinsp;{s.unite}</> : 'Sur devis'}
          </span>
        </div>

        <p className="text-foreground/60 dark:text-white/60 text-sm mb-3 leading-relaxed">
          {s.desc}
        </p>

        <div className="flex items-center justify-between">
          {s.delai ? (
            <span className="text-xs text-electric-ink dark:text-electric">
              Livraison&nbsp;: {s.delai}
            </span>
          ) : (
            <span />
          )}
          <span className="flex items-center gap-1 text-xs font-medium text-electric-ink dark:text-electric opacity-0 group-hover:opacity-100 transition-opacity">
            Découvrir <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function ServiceCards() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
      {SERVICES.map((s, i) => (
        <ServiceCard key={s.id} s={s} index={i} />
      ))}
    </div>
  )
}
