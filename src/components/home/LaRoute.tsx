'use client'
/**
 * LA ROUTE — Concept V4
 * Chemin serpentin du process avec mini-illustrations et scroll-driven fill
 */
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const STEPS = [
  {
    id: 1,
    label: 'Brief',
    title: 'On écoute',
    desc: 'Un appel de 30 min pour comprendre votre projet, vos objectifs, votre budget.',
    emoji: '🎯',
    color: '#F59E0B',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    side: 'left' as const,
  },
  {
    id: 2,
    label: 'Devis',
    title: 'On chiffre',
    desc: 'Devis détaillé sous 72h. Prix fixe, sans surprise, avec planning précis.',
    emoji: '📋',
    color: '#2D7DD2',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    side: 'right' as const,
  },
  {
    id: 3,
    label: 'Design',
    title: 'On dessine',
    desc: 'Maquette de votre site en 48h. Vous validez avant qu\'on code.',
    emoji: '🎨',
    color: '#7C3AED',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    side: 'left' as const,
  },
  {
    id: 4,
    label: 'Dev',
    title: 'On code',
    desc: 'Développement rapide avec les meilleures technologies. Code propre, performant.',
    emoji: '⚡',
    color: '#1E3A5F',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    side: 'right' as const,
  },
  {
    id: 5,
    label: 'Livraison',
    title: 'On livre',
    desc: 'Mise en ligne, formation, support 30 jours inclus. Vous prenez le contrôle.',
    emoji: '🚀',
    color: '#059669',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    side: 'left' as const,
  },
]

function StepCard({ step, index, fillPct }: { step: typeof STEPS[0]; index: number; fillPct: number }) {
  const visible = fillPct > index * (100 / STEPS.length)
  return (
    <div
      className={`flex items-start gap-4 transition-all duration-500 ${
        step.side === 'right' ? 'flex-row-reverse text-right' : ''
      } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Icon bubble */}
      <div
        className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md transition-all duration-500"
        style={{
          background: visible ? step.color : '#F3F4F6',
          transform: visible ? 'scale(1)' : 'scale(0.8)',
        }}
      >
        {step.emoji}
      </div>

      {/* Card */}
      <div className={`flex-1 p-4 rounded-xl border transition-all duration-500 ${step.bg} ${step.border} ${
        visible ? 'shadow-sm' : ''
      }`}>
        <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: step.color }}>
          Étape {step.id} — {step.label}
        </div>
        <div className="font-bold text-navy text-base mb-1">{step.title}</div>
        <div className="text-navy/60 text-sm leading-relaxed">{step.desc}</div>
      </div>
    </div>
  )
}

export default function LaRoute() {
  const ref = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [fillPct, setFillPct] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const windowH = window.innerHeight
      // Start filling when element enters, full when bottom at 20% from top
      const start = rect.top - windowH * 0.9
      const end = rect.bottom - windowH * 0.2
      const range = end - start
      const progress = Math.max(0, Math.min(1, (-start) / range))
      setFillPct(Math.round(progress * 100))

      if (pathRef.current) {
        const length = pathRef.current.getTotalLength()
        pathRef.current.style.strokeDashoffset = String(length * (1 - progress))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // SVG serpentine path (zigzag between left and right cards)
  // Positions: L top, R, L, R, L bottom — snake path
  const pathD = 'M 100 0 C 100 60, 300 60, 300 120 C 300 180, 100 180, 100 240 C 100 300, 300 300, 300 360 C 300 420, 100 420, 100 480 C 100 540, 300 540, 300 600'

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength()
      pathRef.current.style.strokeDasharray = String(length)
      pathRef.current.style.strokeDashoffset = String(length)
    }
  }, [])

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
      <span className="section-number select-none" aria-hidden="true">04</span>
      <div className="pointer-events-none absolute top-0 left-0 w-96 h-96 rounded-full" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 70%)' }} />
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse, rgba(45,125,210,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        <div className="section-marker mb-2 reveal-item" aria-hidden="true">[ 04 / LA ROUTE ]</div>
        <div className="text-xs font-bold text-gold uppercase tracking-[0.2em] mb-3 reveal-item">Notre process</div>
        <h2 className="text-3xl lg:text-5xl font-bold text-navy mb-4 reveal-item" style={{ lineHeight: 1.15 }}>
          De l&apos;idée à la mise en ligne
        </h2>
        <p className="text-navy/55 max-w-xl mb-16 reveal-item" style={{ animationDelay: '80ms' }}>
          Un chemin balisé, sans mauvaise surprise. Du brief à la livraison en 10 jours.
        </p>

        {/* Desktop: 2-column snake */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* SVG path */}
            <div className="absolute left-1/2 -translate-x-1/2 top-8 bottom-8 w-[400px] pointer-events-none" aria-hidden="true">
              <svg viewBox="0 0 400 620" className="w-full h-full" fill="none">
                {/* Background track */}
                <path d={pathD} stroke="#E5E7EB" strokeWidth="3" fill="none" strokeLinecap="round" />
                {/* Animated fill */}
                <path
                  ref={pathRef}
                  d={pathD}
                  stroke="url(#routeGrad)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                />
                <defs>
                  <linearGradient id="routeGrad" x1="0" y1="0" x2="0" y2="620" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="50%" stopColor="#2D7DD2" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="space-y-16 relative z-10">
              {STEPS.map((step, i) => (
                <div
                  key={step.id}
                  className={`flex items-center ${step.side === 'right' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="w-5/12">
                    <StepCard step={step} index={i} fillPct={fillPct} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: single column */}
        <div className="lg:hidden space-y-4">
          {STEPS.map((step, i) => (
            <div
              key={step.id}
              className={`flex items-start gap-4 transition-all duration-500 ${fillPct > i * 20 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex-shrink-0 flex flex-col items-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow transition-all duration-300"
                  style={{ background: fillPct > i * 20 ? step.color : '#F3F4F6' }}
                >
                  {step.emoji}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-0.5 h-6 mt-1" style={{ background: fillPct > (i + 1) * 20 ? step.color : '#E5E7EB', transition: 'background 0.3s' }} />
                )}
              </div>
              <div className={`flex-1 p-4 rounded-xl border mb-2 ${step.bg} ${step.border}`}>
                <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: step.color }}>
                  {step.label}
                </div>
                <div className="font-bold text-navy text-sm mb-1">{step.title}</div>
                <div className="text-navy/60 text-xs leading-relaxed">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-ink font-bold px-8 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-md shadow-gold/20"
          >
            Démarrer mon projet <ArrowRight size={16} />
          </Link>
          <p className="text-navy/40 text-sm mt-3">Devis gratuit sous 72h</p>
        </div>
      </div>
    </section>
  )
}
