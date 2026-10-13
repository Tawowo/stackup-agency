'use client'
/**
 * MOMENT 00 — L'OUVERTURE. Mécanisme : RÉVÉLATION.
 * Le logo exact est déjà là (ortho), immense, à gauche ; le mot porteur se
 * déplie mot par mot à droite. Au scroll (épinglé 150 vh) : la projection passe
 * d'orthographique à perspective, la pile prend de l'épaisseur, les plaques
 * arrivent de l'arrière-plan et s'empilent derrière le logo (logo → pile).
 */
import { useEffect, useRef } from 'react'
import StackFrame from '@/webgl/StackFrame'
import { stackUniforms } from '@/webgl/engine'
import { useScene } from '@/webgl/store'
import { useDragPile } from '@/webgl/useDragPile'
import { useExclusion } from '@/webgl/useExclusion'
import { gsap, ScrollTrigger, SplitText, initGsap } from '@/lib/gsap'
import Action from '@/components/ui/Action'
import Cote from '@/components/ui/Cote'
import './ouverture.css'

const EXCLUSION_00 = ['.su-ouv__texte', '.su-nav__barre']

export default function Ouverture() {
  const section = useRef<HTMLElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const titre = useRef<HTMLHeadingElement>(null)
  const bind = useDragPile()
  useExclusion(EXCLUSION_00)

  useEffect(() => {
    initGsap()
    const el = section.current
    const st = scene.current
    const h1 = titre.current
    if (!el || !st || !h1) return
    const s = useScene.getState()
    const u = stackUniforms()
    const reduit = s.reduced
    const mobile = window.innerWidth < 768

    // La scène : logo au départ, pile à l'arrivée, le scroll écrit uMorph.
    s.setMoment('00')
    s.setNuit(1)
    s.setScrub(true)
    s.setPair('logo', reduit ? null : 'pile')
    u.uMorph.value = 0
    s.setProjection(1)
    s.setPose({ x: 0, y: 0 })
    s.setActive(true)

    // Le titre se déplie mot par mot depuis sa ligne de base.
    const split = new SplitText(h1, { type: 'words', wordsClass: 'su-ouv__mot' })
    const mots = split.words
    const ctx = gsap.context(() => {
      if (reduit) {
        gsap.set(mots, { rotateX: 0, opacity: 1 })
        el.dataset.pret = '1'
        return
      }
      gsap.set(mots, { rotateX: -90, transformOrigin: '50% 100%' })
      gsap.to(mots, {
        rotateX: 0,
        duration: 0.62,
        ease: 'power3.out',
        stagger: 0.07,
        delay: 0.15,
        onStart: () => {
          mots.forEach((m, i) => {
            m.classList.add('su-ouv__mot--arete')
            setTimeout(() => m.classList.remove('su-ouv__mot--arete'), 620 + i * 70)
          })
        },
        onComplete: () => {
          el.dataset.pret = '1'
        },
      })
      gsap.fromTo('.su-ouv__ligne, .su-ouv__actions, .su-ouv__cotes', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.62, ease: 'power3.out', stagger: 0.07, delay: 0.5 })

      // Épinglage : p = 0 → 1 sur 150 vh (120 vh mobile).
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * (mobile ? 1.2 : 1.5))}`,
        pin: st,
        pinSpacing: true,
        scrub: 0.6,
        onEnter: () => useScene.getState().setMoment('00'),
        onEnterBack: () => useScene.getState().setMoment('00'),
        onUpdate: (self) => {
          const p = self.progress
          if (useScene.getState().moment !== '00') return
          u.uMorph.value = p
          el.style.setProperty('--su-p', p.toFixed(4))
          const sc = useScene.getState()
          sc.setProjection(1 - gsap.parseEase('power2.inOut')(p))
          sc.setParams({ epaisseur: 1 + 1.5 * Math.min(1, p * 2) })
          sc.setPose({ x: -0.12 * p, y: 0.22 * p })
        },
      })
    }, el)

    return () => {
      ctx.revert()
      split.revert()
      const sc = useScene.getState()
      sc.setTarget(null)
      sc.setScrub(false)
      sc.setProjection(1)
      sc.setPose({ x: 0, y: 0 })
      sc.setParams({ epaisseur: 1 })
      u.uMorph.value = 0
    }
  }, [])

  return (
    <section ref={section} className="su-ouv" data-moment="00" aria-labelledby="su-ouv-titre">
      <div ref={scene} className="su-ouv__scene">
        <div className="su-ouv__grille">
          <div className="su-ouv__logo" {...bind()} role="img" aria-label="Logo Stackup Agency, trois plaques empilées">
            <StackFrame className="su-ouv__cadre" />
          </div>
          <div className="su-ouv__texte">
            <p className="su-mono su-ouv__etiquette">00 — Ouverture</p>
            <h1 ref={titre} id="su-ouv-titre" className="su-display su-ouv__titre">
              Sites et outils sur mesure.
            </h1>
            <p className="su-ouv__ligne">
              Pour les artisans, les commerçants et les petites entreprises qui veulent un outil à eux, pas un abonnement.
            </p>
            <div className="su-ouv__actions">
              <Action href="#strates" mot="Voir">
                Voir ce qu&rsquo;on fabrique
              </Action>
              <Action href="/contact" variante="contour" mot="Écrire">
                Parler de votre projet
              </Action>
            </div>
          </div>
          <ul className="su-ouv__cotes" aria-label="Cotes de la composition">
            <li>
              <Cote cible=".su-ouv__cadre" mesure="largeur" nom="Logo" />
            </li>
            <li>
              <Cote cible=".su-ouv__titre" mesure="hauteur" nom="Titre" />
            </li>
            <li className="su-ouv__cote-desktop">
              <Cote cible=".su-ouv__grille" mesure="largeur" nom="Conteneur" />
            </li>
            <li className="su-ouv__cote-desktop">
              <Cote cible=".su-ouv__titre" mesure="bas" nom="Ligne de base" />
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
