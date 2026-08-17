'use client'
import { useEffect, useRef } from 'react'

const STEPS = [
  { n: '01', titre: 'Brief & devis', desc: 'Vous décrivez votre projet, nous répondons sous 72 h avec un devis clair.', color: 'bg-gold/10 border-gold/20 text-gold' },
  { n: '02', titre: 'Maquette', desc: 'Validation visuelle avant le développement. Pas de surprise.', color: 'bg-electric/10 border-electric/20 text-electric' },
  { n: '03', titre: 'Développement', desc: 'Développement sur mesure avec points de suivi réguliers.', color: 'bg-navy/10 border-navy/20 text-navy' },
  { n: '04', titre: 'Livraison', desc: 'Mise en ligne, formation, et support inclus.', color: 'bg-green-100 border-green-200 text-green-700' },
]

export default function ProcessSection() {
  const lineRef   = useRef<HTMLDivElement>(null)
  const stepRefs  = useRef<(HTMLDivElement | null)[]>([])

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
        setTimeout(() => { el?.classList.add('is-visible') }, i * 180)
      })
      obs.disconnect()
    }, { threshold: 0.25 })

    if (lineRef.current) obs.observe(lineRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Halo or */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(45,125,210,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <div className="section-marker mb-2" aria-hidden="true">[ 03 / PROCESSUS ]</div>
          <p className="overline-label mb-3">Processus</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-navy">Comment ça marche ?</h2>
        </div>

        {/* Desktop: horizontal with drawing line */}
        <div className="hidden sm:block">
          <div className="relative mb-10">
            <div className="absolute top-[22px] left-12 right-12 h-px bg-gray-200" />
            <div ref={lineRef} className="process-line absolute top-[22px] left-12 right-12 h-0.5 bg-gradient-to-r from-gold via-electric to-navy" />
          </div>

          <div className="grid grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                ref={el => { stepRefs.current[i] = el }}
                className="reveal-item bg-white border border-gray-100 hud-corners rounded-xl p-5 hover:shadow-[0_12px_40px_rgba(30,58,95,0.08)] transition-shadow"
              >
                {/* Numéro coloré */}
                <div className={`step-circle mb-5 data-mono w-10 h-10 rounded-xl border flex items-center justify-center text-sm font-bold ${s.color}`}>
                  {s.n}
                </div>
                <h3 className="font-semibold text-navy mb-2 text-base">{s.titre}</h3>
                <p className="text-navy/55 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="sm:hidden space-y-4">
          {STEPS.map((s) => (
            <div key={s.n} className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-xl">
              <div className={`flex-shrink-0 w-9 h-9 rounded-lg border flex items-center justify-center text-xs font-bold data-mono ${s.color}`}>
                {s.n}
              </div>
              <div className="pt-0.5">
                <h3 className="font-semibold text-navy mb-1">{s.titre}</h3>
                <p className="text-navy/55 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
