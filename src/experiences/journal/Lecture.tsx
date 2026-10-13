'use client'
/**
 * LECTURE — l'article sur ivoire, colonne de lecture étroite, sommaire collant
 * qui suit la position (IntersectionObserver), et la pile qui se construit
 * dans la marge au fil de la lecture : une couche par part lue (scrub pur).
 */
import { useEffect, useRef, useState } from 'react'
import StackFrame from '@/webgl/StackFrame'
import { stackUniforms } from '@/webgl/engine'
import { useScene } from '@/webgl/store'
import { ScrollTrigger, initGsap } from '@/lib/gsap'

export default function Lecture({ sommaire, children }: { sommaire: { id: string; titre: string }[]; children: React.ReactNode }) {
  const [actif, setActif] = useState('')
  const corps = useRef<HTMLDivElement>(null)
  useEffect(() => {
    initGsap()
    const s = useScene.getState()
    const u = stackUniforms()
    s.setMoment('lecture')
    s.setMonde('fabrique')
    s.setScrub(true)
    s.setParams({ retard: 0.9, flash: 1, arc: 0, epaisseur: 1 })
    s.setProjection(0.3)
    s.setPose({ x: 0.08, y: -0.26 })
    s.setPair(s.reduced ? 'logo' : 'empileDepart', s.reduced ? null : 'empile')
    u.uMorph.value = 0
    const el = corps.current
    const st = el
      ? ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            if (useScene.getState().moment === 'lecture' && !useScene.getState().reduced) u.uMorph.value = self.progress
          },
        })
      : null
    const titres = el ? Array.from(el.querySelectorAll('h2[id]')) : []
    const io = new IntersectionObserver(
      (es) => {
        for (const e of es) if (e.isIntersecting) setActif(e.target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    titres.forEach((t) => io.observe(t))
    return () => {
      st?.kill()
      io.disconnect()
      useScene.getState().setParams({ retard: 0.25, flash: 0, arc: 0.6 })
    }
  }, [])
  return (
    <div className="su-lec__grille">
      <aside className="su-lec__marge">
        <div className="su-lec__pile" aria-hidden="true">
          <StackFrame className="su-lec__cadre" />
        </div>
        {sommaire.length > 2 && (
          <nav className="su-lec__sommaire" aria-label="Sommaire">
            <p className="su-mono">Sommaire</p>
            <ol>
              {sommaire.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} aria-current={actif === t.id ? 'true' : undefined}>
                    {t.titre}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
      </aside>
      <div ref={corps} className="su-lec__corps">
        {children}
      </div>
    </div>
  )
}
