'use client'
/**
 * STAT PILLS — pastilles avec compteurs
 * Lucide icons · IntersectionObserver count-up
 */
import { useRef, useState, useEffect } from 'react'
import { Zap, TrendingDown, Target, ClipboardList, Shield } from 'lucide-react'

const STATS = [
  { value: 10,  suffix: 'j',  label: 'Délai de livraison',        Icon: Zap,           color: 'bg-amber-50 border-amber-200 text-amber-700' },
  { value: 80,  suffix: '%',  label: "Moins cher qu'une agence",   Icon: TrendingDown,  color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
  { value: 100, suffix: '%',  label: 'Code sur mesure',            Icon: Target,        color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { value: 72,  suffix: 'h',  label: 'Devis gratuit',              Icon: ClipboardList, color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { value: 30,  suffix: 'j',  label: 'Support post-livraison',     Icon: Shield,        color: 'bg-amber-50 border-amber-200 text-amber-700' },
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
      className={`flex flex-col items-center gap-2 px-5 py-4 rounded-2xl border transition-all duration-500 ${stat.color} ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <stat.Icon size={20} strokeWidth={1.5} aria-hidden="true" />
      <div className="text-3xl font-black tabular-nums data-mono leading-none">
        {count}<span className="text-lg">{stat.suffix}</span>
      </div>
      <div className="text-xs font-medium text-center opacity-70 max-w-[100px] leading-tight">{stat.label}</div>
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
        <div className="w-[600px] h-48 rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.08) 0%, transparent 70%)' }} />
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
