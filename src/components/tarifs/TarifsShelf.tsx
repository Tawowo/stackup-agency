'use client'
/**
 * TARIFS ÉTAGÈRES — Concept V4
 * Étagères qui se remplissent de coches en scroll
 */
import { useRef, useState, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'

interface Shelf {
  label: string
  color: string
  border: string
  bg: string
  items: string[]
}

const SHELVES: Shelf[] = [
  {
    label: 'Starter',
    color: 'text-electric',
    border: 'border-electric/30',
    bg: 'bg-blue-50',
    items: ['Design sur mesure', 'SEO local', 'Hébergement 12 mois', 'SSL inclus', 'Formulaire contact'],
  },
  {
    label: 'Pro',
    color: 'text-gold',
    border: 'border-gold/40',
    bg: 'bg-amber-50',
    items: ['Tout Starter +', 'Blog intégré', 'Google Analytics', 'Galerie photos', 'Formulaires avancés', 'Pages multiples'],
  },
  {
    label: 'Premium',
    color: 'text-purple-600',
    border: 'border-purple-300',
    bg: 'bg-purple-50',
    items: ['Tout Pro +', 'Paiement en ligne', 'Gestion stocks', 'Emails automatiques', 'Tableau de bord', 'Click & Collect'],
  },
]

function ShelfRow({ shelf, isVisible, shelfIndex }: { shelf: Shelf; isVisible: boolean; shelfIndex: number }) {
  const [filled, setFilled] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    setFilled(0)
    let i = 0
    const delay = shelfIndex * 200
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setFilled(i)
        if (i >= shelf.items.length) clearInterval(interval)
      }, 90)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(t)
  }, [isVisible, shelf.items.length, shelfIndex])

  return (
    <div className={`rounded-2xl border-2 p-5 transition-all duration-500 ${shelf.border} ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}
      style={{ transitionDelay: `${shelfIndex * 120}ms` }}
    >
      {/* Shelf label */}
      <div className={`text-xs font-black uppercase tracking-widest mb-4 ${shelf.color}`}>
        ── {shelf.label} ──
      </div>

      {/* Items (shelf slots) */}
      <div className="grid sm:grid-cols-2 gap-2">
        {shelf.items.map((item, i) => (
          <div
            key={item}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-300 ${
              i < filled ? `${shelf.bg} opacity-100` : 'bg-gray-50 opacity-30'
            }`}
            style={{ transitionDelay: `${i * 30}ms` }}
          >
            <CheckCircle
              size={15}
              className={`flex-shrink-0 transition-all duration-300 ${i < filled ? shelf.color : 'text-gray-300'}`}
            />
            <span className={`text-sm font-medium transition-all duration-300 ${i < filled ? 'text-navy' : 'text-navy/30'}`}>
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* Shelf plank decoration */}
      <div className={`mt-4 h-1 rounded-full transition-all duration-1000 ${
        filled >= shelf.items.length ? shelf.bg : 'bg-gray-100'
      }`} style={{ width: filled >= shelf.items.length ? '100%' : `${(filled / shelf.items.length) * 100}%` }} />
    </div>
  )
}

export default function TarifsShelf() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setIsVisible(true); obs.disconnect() }
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="space-y-4 mb-12">
      <div className="text-sm text-navy/40 font-mono mb-6">{'// Ce qui est inclus dans chaque formule'}</div>
      {SHELVES.map((s, i) => (
        <ShelfRow key={s.label} shelf={s} isVisible={isVisible} shelfIndex={i} />
      ))}
    </div>
  )
}
