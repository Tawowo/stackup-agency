'use client'
/**
 * LA ROUTE V4.3 — Scrub SVG direct + bulles toujours visibles
 * - SVG path : strokeDashoffset = f(scrollY) DIRECT, zéro transition CSS
 * - Cards : IntersectionObserver "sticky" (once visible = always visible)
 *   + fallback scroll % pour les items déjà dépassés
 */
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionDepth from '@/components/ui/SectionDepth'

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
    desc: "Maquette de votre site en 48h. Vous validez avant qu'on code.",
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

const pathD =
  'M 100 0 C 100 60, 300 60, 300 120 C 300 180, 100 180, 100 240 C 100 300, 300 300, 300 360 C 300 420, 100 420, 100 480 C 100 540, 300 540, 300 600'

export default function LaRoute() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  // "sticky" — une fois visible, reste à true
  const [visible, setVisible] = useState<boolean[]>(Array(STEPS.length).fill(false))
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  /* ── SVG scrub direct ── */
  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    const len = path.getTotalLength()
    path.style.strokeDasharray = String(len)
    path.style.strokeDashoffset = String(len)

    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const wh = window.innerHeight
      const scrollable = rect.height + wh
      const scrolled = wh - rect.top
      const progress = Math.max(0, Math.min(1, scrolled / scrollable))
      path.style.strokeDashoffset = String(len * (1 - progress))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── IntersectionObserver sticky — never goes back to false ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        setVisible((prev) => {
          const next = [...prev]
          let changed = false
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const idx = Number((e.target as HTMLElement).dataset.stepIdx)
              if (!isNaN(idx) && !next[idx]) {
                next[idx] = true
                changed = true
              }
            }
          })
          return changed ? next : prev
        })
      },
      // Déclenche quand la carte arrive dans les 70% inférieurs du viewport
      { rootMargin: '0px 0px -20% 0px' }
    )
    cardRefs.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      <span className="section-number select-none" aria-hidden="true">04</span>
      <SectionDepth variant="warm" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        <div className="section-marker mb-2 reveal-item" aria-hidden="true">[ 04 / LA ROUTE ]</div>
        <div className="text-xs font-bold text-gold uppercase tracking-[0.2em] mb-3 reveal-item">Notre process</div>
        <h2 className="text-3xl lg:text-5xl font-bold text-navy mb-4 reveal-item" style={{ lineHeight: 1.15 }}>
          De l&apos;idée à la mise en ligne
        </h2>
        <p className="text-navy/55 max-w-xl mb-16 reveal-item" style={{ animationDelay: '80ms' }}>
          Un chemin balisé, sans mauvaise surprise. Du brief à la livraison en 10 jours.
        </p>

        {/* ── Desktop : snake 2 colonnes ── */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-8 bottom-8 w-[400px] pointer-events-none" aria-hidden="true">
              <svg viewBox="0 0 400 620" className="w-full h-full" fill="none">
                <path d={pathD} stroke="#E5E7EB" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path
                  ref={pathRef}
                  d={pathD}
                  stroke="url(#routeGrad)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
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
              {STEPS.map((step, i) => {
                const on = visible[i]
                return (
                  <div
                    key={step.id}
                    ref={(el) => { cardRefs.current[i] = el }}
                    data-step-idx={i}
                    className={`flex items-center ${step.side === 'right' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="w-5/12">
                      <div className={`flex items-start gap-4 transition-all duration-600 ${step.side === 'right' ? 'flex-row-reverse text-right' : ''} ${on ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {/* Bulle emoji */}
                        <div
                          className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md transition-all duration-500"
                          style={{
                            background: on ? step.color : '#F3F4F6',
                            transform: on ? 'scale(1)' : 'scale(0.75)',
                          }}
                        >
                          {step.emoji}
                        </div>
                        {/* Carte texte */}
                        <div className={`flex-1 p-4 rounded-xl border transition-all duration-500 ${step.bg} ${step.border} ${on ? 'shadow-sm' : ''}`}>
                          <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: step.color }}>
                            Étape {step.id} — {step.label}
                          </div>
                          <div className="font-bold text-navy text-base mb-1">{step.title}</div>
                          <div className="text-navy/60 text-sm leading-relaxed">{step.desc}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Mobile : colonne unique ── */}
        <div className="lg:hidden space-y-4">
          {STEPS.map((step, i) => {
            const on = visible[i]
            return (
              <div
                key={step.id}
                ref={(el) => { if (!cardRefs.current[i]) cardRefs.current[i] = el }}
                data-step-idx={i}
                className={`flex items-start gap-4 transition-all duration-500 ${on ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
              >
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow transition-all duration-300"
                    style={{ background: on ? step.color : '#F3F4F6' }}
                  >
                    {step.emoji}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="w-0.5 h-6 mt-1 transition-colors duration-500" style={{ background: visible[i + 1] ? step.color : '#E5E7EB' }} />
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
            )
          })}
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
