'use client'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle, ChevronRight } from 'lucide-react'

interface Card {
  titre: string
  prix: number
  delai: string
  desc: string
  inclus: string[]
  href: string
  highlight: boolean
}

function useCountUp(target: number, isVisible: boolean, duration = 900) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number>(0)
  const startRef = useRef<number>(0)

  useEffect(() => {
    if (!isVisible) return
    cancelAnimationFrame(rafRef.current)
    startRef.current = performance.now()
    const tick = (now: number) => {
      const elapsed = now - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      // ease out quart
      const eased = 1 - Math.pow(1 - progress, 4)
      setValue(Math.round(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isVisible, target, duration])

  return value
}

function CardItem({ card, index, isVisible }: { card: Card; index: number; isVisible: boolean }) {
  const variant = card.highlight ? 'premium' : index === 0 ? 'starter' : 'default'
  const price = useCountUp(card.prix, isVisible, 900 + index * 100)
  const [checksVisible, setChecksVisible] = useState(false)

  useEffect(() => {
    if (isVisible) {
      const t = setTimeout(() => setChecksVisible(true), 400 + index * 80)
      return () => clearTimeout(t)
    }
  }, [isVisible, index])

  return (
    <div
      className={`reveal-item rounded-2xl p-6 flex flex-col relative overflow-hidden transition-all duration-300 ${
        variant === 'premium'
          ? 'card-gradient-border bg-gold/5 dark:bg-gold/5'
          : variant === 'starter'
          ? 'border-2 border-electric/60 hover:shadow-lg hover:shadow-electric/10 hover:-translate-y-0.5 bg-white dark:bg-white/5'
          : 'border border-navy/20 dark:border-white/10 hover:shadow-md hover:-translate-y-0.5 bg-white dark:bg-white/5'
      }`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Liseret accent */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${
        variant === 'premium' ? 'bg-gradient-to-r from-gold to-amber-400' :
        variant === 'starter' ? 'bg-gradient-to-r from-electric to-electric-ink' :
        'bg-gradient-to-r from-navy/40 to-electric/40'
      }`} />

      {card.highlight && (
        <div className="text-xs font-bold text-gold mb-3 uppercase tracking-widest">
          ★ Le plus populaire
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-foreground dark:text-white">{card.titre}</h3>
        <span className={`text-2xl font-bold ml-3 tabular-nums ${card.highlight ? 'text-gold' : 'text-navy dark:text-electric'}`}>
          <span className="price-reveal is-visible">
            <span className="price-reveal-inner">{price}&thinsp;€</span>
          </span>
        </span>
      </div>

      <p className="text-sm text-foreground/60 dark:text-white/60 mb-4">{card.desc}</p>

      <ul className={`space-y-1.5 mb-5 flex-1 ${checksVisible ? 'checks-visible' : ''}`}>
        {card.inclus.map((item, ci) => (
          <li key={item} className="check-item flex items-center gap-2 text-sm text-foreground/70 dark:text-white/70"
            style={{ transitionDelay: `${ci * 60}ms` }}>
            <CheckCircle size={13} className={card.highlight ? 'text-gold flex-shrink-0' : 'text-electric flex-shrink-0'} />
            {item}
          </li>
        ))}
      </ul>

      <div className="text-xs text-foreground/70 dark:text-white/60 mb-4">Livraison : {card.delai}</div>

      <Link
        href={card.href}
        className={`btn-lift flex items-center justify-center gap-1 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 ${
          card.highlight
            ? 'bg-gold hover:bg-gold/90 text-ink shadow-md shadow-gold/20'
            : variant === 'starter'
            ? 'bg-electric hover:bg-electric-ink text-white shadow-md shadow-electric/20'
            : 'border border-foreground/20 dark:border-white/20 text-foreground dark:text-white hover:bg-foreground/5 dark:hover:bg-white/10'
        }`}
      >
        Voir l&apos;offre <ChevronRight size={14} />
      </Link>
    </div>
  )
}

export default function PricingCards({ cards }: { cards: Card[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="grid sm:grid-cols-2 gap-4">
      {cards.map((card, i) => (
        <CardItem key={card.titre} card={card} index={i} isVisible={isVisible} />
      ))}
    </div>
  )
}
