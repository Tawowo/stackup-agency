'use client'
/**
 * MOMENT 03 — LA PELLICULE. Mécanisme : PELLICULE. La lumière s'éteint.
 * Section épinglée, défilement horizontal piloté par le scroll vertical (et
 * balayage natif sur mobile), un projet par écran, plein écran. Derrière, la
 * pile forme un cadre de plaques qui se teinte de l'accent du projet ; le
 * passage d'un projet à l'autre fait glisser le cadre et la lumière.
 */
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import StackFrame from '@/webgl/StackFrame'
import { stackUniforms } from '@/webgl/engine'
import { useScene } from '@/webgl/store'
import { gsap, ScrollTrigger, initGsap } from '@/lib/gsap'
import { realisations } from '@/data/realisations'
import Action from '@/components/ui/Action'
import './pellicule.css'

const PROJETS = realisations.slice(0, 5)

export default function Pellicule() {
  const section = useRef<HTMLElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const piste = useRef<HTMLDivElement>(null)
  const [courant, setCourant] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    initGsap()
    const el = section.current
    const st = scene.current
    const tr = piste.current
    if (!el || !st || !tr) return
    const reduit = useScene.getState().reduced
    const mobile = window.innerWidth < 768
    const n = PROJETS.length
    const nuit = { v: useScene.getState().nuit }
    const eteindre = (v: number) => {
      gsap.killTweensOf(nuit)
      if (reduit) {
        nuit.v = v
        useScene.getState().setNuit(v)
        return
      }
      gsap.to(nuit, { v, duration: 1.1, ease: 'power2.inOut', onUpdate: () => useScene.getState().setNuit(nuit.v) })
    }
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        onEnter: () => {
          useScene.getState().setMoment('03')
          eteindre(1)
          setVisible(true)
        },
        onEnterBack: () => {
          useScene.getState().setMoment('03')
          eteindre(1)
          setVisible(true)
        },
        onLeaveBack: () => {
          eteindre(0)
          setVisible(false)
        },
      })
      if (mobile || reduit) {
        // Mobile : balayage natif ; on lit l'index au scroll de la piste.
        const lire = () => setCourant(Math.round(tr.scrollLeft / tr.clientWidth))
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
          scrub: 1.4,
          snap: { snapTo: 1 / (n - 1), duration: { min: 0.6, max: 1.2 }, ease: 'power2.inOut', inertia: false, directional: false },
          onUpdate: (self) => setCourant(Math.round(self.progress * (n - 1))),
        },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  // Le cadre de plaques suit le projet : glissement + accent.
  const precedent = useRef(0)
  useEffect(() => {
    if (!visible) return
    const s = useScene.getState()
    if (s.moment !== '03' || s.reduced) return
    const u = stackUniforms()
    const p = PROJETS[courant]!
    s.setAccent(p.accent)
    s.setPose({ x: 0.05, y: -0.08 })
    s.setProjection(0.3)
    s.setScrub(true)
    const sens = courant >= precedent.current ? 1 : -1
    precedent.current = courant
    s.setPair('pellicule', 'pellicule', { a: { glisse: 2.9 * sens }, b: { glisse: 0 } })
    u.uMorph.value = 0
    gsap.killTweensOf(u.uMorph)
    gsap.to(u.uMorph, { value: 1, duration: 1.6, ease: 'power2.inOut' })
    return () => {
      s.setAccent('#F69106')
    }
  }, [courant, visible])

  return (
    <section ref={section} className="su-pel" data-moment="03" id="realisations-pellicule" aria-labelledby="su-pel-titre">
      <div ref={scene} className="su-pel__scene">
        <div className="su-pel__cadre-zone" aria-hidden="true">
          <StackFrame className="su-pel__cadre" />
        </div>
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
                <Image src={`/realisations/${p.slug}/desktop.avif`} alt={`Capture d’écran de la démo ${p.nom}`} width={1440} height={900} sizes="(max-width: 767px) 92vw, 70vw" priority={k === 0} />
              </div>
              <div className="su-pel__texte">
                <p className="su-mono su-pel__demo">Démo</p>
                <h3 className="su-display su-pel__nom">{p.nom}</h3>
                <p className="su-pel__type">{p.type}</p>
                <Action href={p.url} variante="contour" mot="Ouvrir">
                  Ouvrir la démo
                </Action>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
