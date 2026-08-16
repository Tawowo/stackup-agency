'use client'
import { useEffect, useRef } from 'react'

const STEPS = [
  { n: '01', titre: 'Brief & devis', desc: 'Vous décrivez votre projet, nous répondons sous 72 h avec un devis clair.' },
  { n: '02', titre: 'Maquette', desc: 'Validation visuelle avant le développement. Pas de surprise.' },
  { n: '03', titre: 'Développement', desc: 'Développement sur mesure avec points de suivi réguliers.' },
  { n: '04', titre: 'Livraison', desc: 'Mise en ligne, formation, et support inclus.' },
]

export default function ProcessSection() {
  const lineRef   = useRef<HTMLDivElement>(null)
  const stepRefs  = useRef<(HTMLDivElement | null)[]>([])
  const circleRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      lineRef.current?.classList.add('drawn')
      stepRefs.current.forEach(el => { el?.classList.add('is-visible') })
      return
    }

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      lineRef.current?.classList.add('drawn')
      stepRefs.current.forEach((el, i) => {
        setTimeout(() => {
          el?.classList.add('is-visible')
        }, i * 180)
      })
      obs.disconnect()
    }, { threshold: 0.25 })

    if (lineRef.current) obs.observe(lineRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="py-24 bg-[#060D1A] relative overflow-hidden">
      {/* Subtle background halo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(45,125,210,0.06) 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="overline-label !text-electric mb-3">Processus</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">Comment ça marche ?</h2>
        </div>

        {/* Desktop: horizontal with drawing line */}
        <div className="hidden sm:block">
          <div className="relative mb-10">
            <div className="absolute top-[22px] left-12 right-12 h-px bg-white/8" />
            <div ref={lineRef} className="process-line absolute top-[22px] left-12 right-12 h-px bg-gradient-to-r from-electric via-electric/60 to-navy" />
          </div>

          <div className="grid grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                ref={el => { stepRefs.current[i] = el }}
                className="reveal-item"
              >
                {/* Number circle */}
                <div
                  ref={el => { circleRefs.current[i] = el }}
                  className="step-circle mb-5"
                >
                  {s.n}
                </div>
                <h3 className="font-semibold text-white mb-2 text-base">{s.titre}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="sm:hidden space-y-6">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex items-start gap-4">
              <div className="step-circle is-visible" style={{ animationDelay: `${i * 100}ms` }}>
                {s.n}
              </div>
              <div className="pt-1.5">
                <h3 className="font-semibold text-white mb-1">{s.titre}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
