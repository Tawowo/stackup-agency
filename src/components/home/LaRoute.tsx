'use client'
/**
 * LA MÉTHODE — V5
 * Timeline verticale 6 étapes · SVG trait qui se dessine au scrub
 * Trait 2px centré-gauche · numéros mono · icônes SVG trait
 */
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const STEPS = [
  {
    num: '01',
    title: 'Démo offerte',
    desc: 'On vous montre avant de vous vendre — une démo réelle de votre futur site.',
  },
  {
    num: '02',
    title: 'Devis sur mesure',
    desc: 'Devis détaillé sous 72h. Prix fixe, planning précis, aucune surprise.',
  },
  {
    num: '03',
    title: 'Signature',
    desc: 'Rien ne démarre avant votre accord. Vous validez chaque étape.',
  },
  {
    num: '04',
    title: 'Développement & livraison',
    desc: 'Code propre, performant, livré en 10 jours ouvrés avec formation.',
  },
  {
    num: '05',
    title: 'Ajustements inclus',
    desc: 'Support 30 jours post-livraison. Les retouches sont dans le prix.',
  },
  {
    num: '06',
    title: 'Croissance',
    desc: 'Blog SEO, maintenance mensuelle et suivi pour faire grandir votre activité.',
  },
]

function StepSVG({ num }: { num: string }) {
  const n = parseInt(num, 10)
  // Simple SVG trait micro-illustration per step
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {n === 1 && <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></>}
      {n === 2 && <><path d="M9 7h6l-1 5H10L9 7z"/><path d="M12 12v5"/><path d="M9 17h6"/></>}
      {n === 3 && <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>}
      {n === 4 && <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>}
      {n === 5 && <><path d="M12 2v20M2 12h20"/></>}
      {n === 6 && <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></>}
    </svg>
  )
}

export default function LaRoute() {
  const sectionRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [visible, setVisible] = useState<boolean[]>(STEPS.map(() => false))
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  // SVG path scrub — direct manipulation, no CSS transition
  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current
      const path = pathRef.current
      if (!el || !path) return

      const rect = el.getBoundingClientRect()
      const wh = window.innerHeight
      const start = rect.top - wh * 0.85
      const end = rect.bottom - wh * 0.15
      const range = end - start
      const progress = Math.max(0, Math.min(1, -start / range))

      const len = path.getTotalLength()
      path.style.strokeDashoffset = String(len * (1 - progress))
    }

    // Init dasharray
    const path = pathRef.current
    if (path) {
      const len = path.getTotalLength()
      path.style.strokeDasharray = String(len)
      path.style.strokeDashoffset = String(len)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Sticky step visibility — once true, stays true
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      setVisible(prev => {
        let changed = false
        const next = [...prev]
        entries.forEach(e => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.stepIdx)
            if (!isNaN(idx) && !next[idx]) { next[idx] = true; changed = true }
          }
        })
        return changed ? next : prev
      })
    }, { rootMargin: '0px 0px -20% 0px', threshold: 0 })

    stepRefs.current.forEach(el => { if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  // Vertical SVG path height matches content ~ 6 steps × 110px
  const pathD = 'M 24 0 L 24 660'

  return (
    <section ref={sectionRef} id="methode" className="py-24 bg-[#FFFDF9] relative overflow-hidden">
      {/* Single gentle halo */}
      <div className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px]" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[13px] font-semibold text-gold uppercase tracking-[0.18em] mb-3">Notre process</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-navy mb-4" style={{ lineHeight: 1.15 }}>
            Comment ça se passe ?
          </h2>
          <p className="text-navy/55 max-w-xl">
            Six étapes claires. Aucune mauvaise surprise. De la démo à la croissance.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* SVG vertical track */}
          <div className="absolute left-6 top-0 bottom-0 w-12 pointer-events-none hidden md:block" aria-hidden="true" style={{ height: '660px' }}>
            <svg viewBox="0 0 48 660" className="w-full h-full" fill="none">
              {/* Background track */}
              <path d={pathD} stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
              {/* Animated fill */}
              <path
                ref={pathRef}
                d={pathD}
                stroke="#F59E0B"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Steps */}
          <div className="space-y-12 md:pl-20">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                ref={el => { stepRefs.current[i] = el }}
                data-step-idx={i}
                className="flex items-start gap-5 transition-all duration-700"
                style={{
                  opacity: visible[i] ? 1 : 0,
                  transform: visible[i] ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.98)',
                  transitionDelay: `${i * 70}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                {/* Step icon */}
                <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-500 ${
                  visible[i] ? 'bg-navy text-white' : 'bg-gray-100 text-navy/30'
                }`}>
                  <StepSVG num={step.num} />
                </div>

                {/* Content */}
                <div className="flex-1 pt-1.5">
                  <div className="text-[11px] font-bold text-gold uppercase tracking-[0.18em] mb-1 data-mono">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-navy text-lg mb-1">{step.title}</h3>
                  <p className="text-navy/55 text-sm leading-relaxed max-w-lg">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 md:pl-20">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-ink font-bold px-8 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-md shadow-amber-500/20"
          >
            Commencer par la démo offerte <ArrowRight size={16} />
          </Link>
          <p className="text-navy/40 text-sm mt-3">Sans engagement · Devis sous 72h</p>
        </div>
      </div>
    </section>
  )
}
