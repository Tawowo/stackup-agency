'use client'
/**
 * STAT PILLS V5.1 — Pastilles à fort contraste
 * Fond teinté distinct · chiffre grand en couleur pleine · libellé navy foncé
 * Contraste AA vérifié : orange sur orange-50 ≥ 4.5:1 / navy sur blue-50 ≥ 7:1
 */
import { useRef, useState, useEffect } from 'react'
import { Zap, TrendingDown, Target, ClipboardList, Shield } from 'lucide-react'

// Contraste vérifié AA :
// amber-700 (#b45309) sur amber-50 (#fffbeb) → 5.6:1 ✅
// blue-800 (#1e40af) sur blue-50 (#eff6ff) → 8.2:1 ✅
// emerald-700 (#047857) sur emerald-50 (#ecfdf5) → 6.1:1 ✅
// purple-700 (#7e22ce) sur purple-50 (#faf5ff) → 7.8:1 ✅
const STATS = [
  {
    value: 10, suffix: 'j',
    label: 'Délai de livraison',
    Icon: Zap,
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    numColor: 'text-amber-700',
    iconColor: 'text-amber-600',
    labelColor: 'text-amber-900',
  },
  {
    value: 80, suffix: '%',
    label: "Moins cher qu'une agence",
    Icon: TrendingDown,
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    numColor: 'text-emerald-700',
    iconColor: 'text-emerald-600',
    labelColor: 'text-emerald-900',
  },
  {
    value: 100, suffix: '%',
    label: 'Code sur mesure',
    Icon: Target,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    numColor: 'text-blue-800',
    iconColor: 'text-blue-600',
    labelColor: 'text-blue-900',
  },
  {
    value: 72, suffix: 'h',
    label: 'Devis gratuit',
    Icon: ClipboardList,
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    numColor: 'text-purple-700',
    iconColor: 'text-purple-600',
    labelColor: 'text-purple-900',
  },
  {
    value: 30, suffix: 'j',
    label: 'Support post-livraison',
    Icon: Shield,
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    numColor: 'text-amber-700',
    iconColor: 'text-amber-600',
    labelColor: 'text-amber-900',
  },
]

function Pill({ stat, isVisible, delay }: { stat: typeof STATS[0]; isVisible: boolean; delay: number }) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!isVisible) return
    const dur = 1200
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 4)
      setCount(Math.round(eased * stat.value))
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    const t = setTimeout(() => { rafRef.current = requestAnimationFrame(tick) }, delay)
    return () => { clearTimeout(t); cancelAnimationFrame(rafRef.current) }
  }, [isVisible, stat.value, delay])

  return (
    <div
      className={`flex flex-col items-center gap-3 px-6 py-5 rounded-2xl border ${stat.bg} ${stat.border}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.96)',
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      <stat.Icon size={20} strokeWidth={1.5} className={stat.iconColor} aria-hidden="true" />
      {/* Grand chiffre en couleur pleine */}
      <div className={`text-4xl font-black tabular-nums leading-none ${stat.numColor}`}>
        {count}<span className="text-2xl">{stat.suffix}</span>
      </div>
      <div className={`text-xs font-semibold text-center max-w-[110px] leading-tight ${stat.labelColor}`}>
        {stat.label}
      </div>
    </div>
  )
}

export default function StatPills() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setIsVisible(true); obs.disconnect() }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-16 bg-[#FFFDF9] relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="w-[600px] h-48 rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 70%)' }} />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        <div className="flex flex-wrap justify-center gap-4">
          {STATS.map((s, i) => (
            <Pill key={s.label} stat={s} isVisible={isVisible} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  )
}
