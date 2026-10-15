'use client'
/**
 * MOMENT 03 — LA PELLICULE. Mécanisme : PELLICULE. La lumière s'éteint.
 * Section épinglée, défilement horizontal piloté par le scroll vertical (et
 * balayage natif sur mobile), un projet par écran : l'ordinateur et le téléphone
 * montrent les vraies captures de la réalisation.
 */
import { useEffect, useRef, useState } from 'react'
import { useScene } from '@/webgl/store'
import { gsap, initGsap } from '@/lib/gsap'
import { PROJETS } from '@/experiences/galerie/projets'
import { Duo } from '@/components/appareils/Appareils'
import { arriverParScroll } from '../arrivee'
import Action from '@/components/ui/Action'
import './pellicule.css'

export default function Pellicule() {
  const section = useRef<HTMLElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const piste = useRef<HTMLDivElement>(null)
  const [courant, setCourant] = useState(0)

  useEffect(() => {
    initGsap()
    const el = section.current
    const st = scene.current
    const tr = piste.current
    if (!el || !st || !tr) return
    const reduit = useScene.getState().reduced
    const mobile = window.innerWidth < 768
    const n = PROJETS.length
    // L'accent suit la piste (index continu).
    const suivre = (f: number) => {
      const s = useScene.getState()
      if (s.moment !== '03') return
      const k = Math.min(n - 2, Math.max(0, Math.floor(f)))
      const t = Math.min(1, Math.max(0, f - k))
      const a = PROJETS[k]!.accent
      const b = PROJETS[k + 1]!.accent
      s.setAccent(gsap.utils.interpolate(a, b, t))
      setCourant(Math.round(f))
    }
    const arret = arriverParScroll(el, {
      moment: '03',
      layout: 'logo',
      pose: { x: 0, y: 0.35 },
      projection: 0.5,
      calme: true,
      onSortie: () => useScene.getState().setAccent('#F69106'),
    })
    const ctx = gsap.context(() => {
      if (mobile || reduit) {
        // Mobile : balayage natif ; la bande suit le scroll de la piste, en continu.
        const lire = () => suivre(tr.scrollLeft / Math.max(1, tr.clientWidth))
        tr.addEventListener('scroll', lire, { passive: true })
        return
      }
      gsap.to(tr, {
        x: () => -(n - 1) * window.innerWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: () => `+=${Math.round(window.innerHeight * (n - 1) * 0.9)}`,
          pin: st,
          scrub: true,
          snap: { snapTo: 1 / (n - 1), duration: { min: 0.6, max: 1.2 }, ease: 'power2.inOut', inertia: false, directional: false },
          onUpdate: (self) => suivre(self.progress * (n - 1)),
        },
      })
    }, el)
    return () => {
      ctx.revert()
      arret()
    }
  }, [])

  return (
    <section ref={section} className="su-pel" data-moment="03" data-nuit="1" data-titre="Réalisations" id="realisations-pellicule" aria-labelledby="su-pel-titre">
      <div ref={scene} className="su-pel__scene">
        <header className="su-pel__tete">
          <p className="su-mono su-pel__etiquette">03 — Réalisations</p>
          <h2 id="su-pel-titre" className="sr-only">
            Réalisations
          </h2>
          <p className="su-mono su-pel__compteur su-tabular" aria-live="polite">
            {String(courant + 1).padStart(2, '0')} / {String(PROJETS.length).padStart(2, '0')}
          </p>
        </header>
        <div ref={piste} className="su-pel__piste">
          {PROJETS.map((p, k) => (
            <article key={p.slug} className="su-pel__projet" style={{ '--accent': p.accent } as React.CSSProperties} aria-current={k === courant ? 'true' : undefined}>
              <div className="su-pel__capture">
                <Duo projet={p} prioritaire={k === 0} />
              </div>
              <div className="su-pel__texte">
                <p className="su-mono su-pel__demo">{p.statut}</p>
                <h3 className="su-display su-pel__nom">{p.nom}</h3>
                <p className="su-pel__type">{p.type}</p>
                <Action href={`/realisations/${p.slug}`} variante="contour" mot="Voir">
                  Voir la réalisation
                </Action>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
