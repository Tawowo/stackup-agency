'use client'
import Link from 'next/link'
import { useRef, MouseEvent } from 'react'
import { ArrowRight, Monitor, Layers, ShoppingBag, Settings, Users, PenTool, TrendingUp, type LucideIcon } from 'lucide-react'
import { SERVICES } from '@/config/site'
import { isRentreeActive } from '@/config/rentree'

type Accent = 'electric' | 'navy' | 'gold'

const SERVICE_META: Record<string, { accent: Accent; Icon: LucideIcon }> = {
  'site-vitrine':       { accent: 'electric', Icon: Monitor },
  'site-multi-pages':   { accent: 'electric', Icon: Layers },
  'site-ecommerce':     { accent: 'navy',     Icon: ShoppingBag },
  'systeme-gestion':    { accent: 'navy',     Icon: Settings },
  'site-association':   { accent: 'electric', Icon: Users },
  'redaction-blog-seo': { accent: 'gold',     Icon: PenTool },
  'marketing-digital':  { accent: 'gold',     Icon: TrendingUp },
}

const BADGE_STYLE: Record<string, string> = {
  'Le plus rapide':   'bg-electric text-white',
  'Le plus populaire':'bg-gold text-ink',
  'Sur mesure':       'bg-navy text-white',
}

const ICON_COLOR: Record<Accent, string> = {
  electric: 'text-electric dark:text-electric',
  navy:     'text-navy dark:text-blue-300',
  gold:     'text-amber-600 dark:text-gold',
}

function ServiceCard({ s, index }: { s: (typeof SERVICES)[number]; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const meta = SERVICE_META[s.id] ?? { accent: 'electric' as Accent, Icon: Monitor as LucideIcon }
  const { accent, Icon } = meta
  const rentreeBadge = (s.id === 'site-vitrine' || s.id === 'site-multi-pages') && isRentreeActive()

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--sx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    el.style.setProperty('--sy', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }

  function handleMouseLeave() {
    const el = cardRef.current
    if (!el) return
    el.style.setProperty('--sx', '50%')
    el.style.setProperty('--sy', '50%')
  }

  return (
    <Link
      ref={cardRef}
      href={s.href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`service-card card-accent card-accent-${accent} card-halo-${accent} card-3d-enter group reveal-item block rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hud-4corners glass-panel`}
      style={{ animationDelay: `${index * 80}ms`, '--sx': '50%', '--sy': '50%' } as React.CSSProperties}
    >
      {/* Spotlight radial */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(200px circle at var(--sx) var(--sy), ${accent === 'gold' ? 'rgba(245,158,11,0.08)' : accent === 'navy' ? 'rgba(30,58,95,0.10)' : 'rgba(45,125,210,0.08)'}, transparent 70%)` }}
      />

      <div className="relative">
        {/* Icon chip */}
        <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl mb-3 icon-chip-${accent}`}>
          <Icon size={18} className={ICON_COLOR[accent]} />
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {s.badge && (
            <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${BADGE_STYLE[s.badge] ?? 'bg-electric/10 text-electric-ink dark:text-electric'}`}>
              {s.badge}
            </span>
          )}
          {rentreeBadge && (
            <span className="inline-block rounded-full bg-gold/20 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:text-gold">
              Maquette offerte
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
