'use client'
import { useEffect, useRef } from 'react'

const STEPS = [
  { n: '01', titre: 'Brief & devis', desc: 'Vous décrivez votre projet, nous répondons sous 72 h avec un devis clair.' },
  { n: '02', titre: 'Maquette', desc: 'Validation visuelle avant le développement. Pas de surprise.' },
  { n: '03', titre: 'Développement', desc: 'Développement sur mesure avec points de suivi réguliers.' },
  { n: '04', titre: 'Livraison', desc: 'Mise en ligne, formation, et support inclus.' },
]

export default function ProcessSection() {
  const lineRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      lineRef.current?.classList.add('drawn')
      stepRefs.current.forEach(el => el?.classList.add('is-visible'))
      return
    }

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        lineRef.current?.classList.add('drawn')
        stepRefs.current.forEach((el, i) => {
          setTimeout(() => el?.classList.add('is-visible'), i * 150)
        })
        obs.disconnect()
      }
    }, { threshold: 0.3 })

    if (lineRef.current) obs.observe(lineRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="py-24 bg-[#060D1A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12">Comment ça marche ?</h2>

        {/* Desktop: horizontal with drawing line */}
        <div className="hidden sm:block">
          <div className="relative mb-8">
            <div className="absolute top-5 left-8 right-8 h-px bg-white/10" />
            <div ref={lineRef} className="process-line absolute top-5 left-8 right-8 h-px bg-gradient-to-r from-blue-500 to-electric" />
          </div>
          <div className="grid grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <div key={s.n} ref={el => { stepRefs.current[i] = el }} className="reveal-item">
                <div className="w-10 h-10 rounded-full bg-electric flex items-center justify-center mb-4 text-white font-bold text-sm shadow-lg shadow-blue-600/30">
                  {s.n}
                </div>
                <h3 className="font-semibold text-white mb-2">{s.titre}</h3>
                <p className="text-white/60 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical simple */}
        <div className="sm:hidden space-y-6">
          {STEPS.map(s => (
            <div key={s.n} className="flex items-start gap-4">
              <div className="w-10 h-10 flex-shrink-0 rounded-full bg-electric flex items-center justify-center text-white font-bold text-sm">
                {s.n}
              </div>
              <div className="pt-1">
                <h3 className="font-semibold text-white mb-1">{s.titre}</h3>
                <p className="text-white/60 text-sm">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
