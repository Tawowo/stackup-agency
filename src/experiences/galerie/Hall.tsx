'use client'
/**
 * /realisations — LA GALERIE. Un hall d'exposition traversé au scroll : la section est épinglée,
 * sa progression (scrub pur) fait avancer le travelling de la scène (`travel`). Chaque réalisation
 * est montrée dans un ordinateur et un téléphone dont les écrans affichent les VRAIES captures
 * (chacune remplit exactement l'écran). Le projet en face est présenté en HTML à gauche (nom, type,
 * statut, actions). Un clic sur un écran 3D ouvre la fiche.
 */
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import StackFrame from '@/webgl/StackFrame'
import { useScene } from '@/webgl/store'
import { gsap, ScrollTrigger, initGsap } from '@/lib/gsap'
import Action from '@/components/ui/Action'
import { Duo } from '@/components/appareils/Appareils'
import { PROJETS } from './projets'
import './galerie.css'

export default function Hall() {
  const section = useRef<HTMLElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const [courant, setCourant] = useState(0)
  const router = useRouter()
  const n = PROJETS.length

  // La scène : la Galerie, en perspective, lumière de nuit.
  useEffect(() => {
    initGsap()
    const el = section.current
    const st = scene.current
    if (!el || !st) return
    const s = useScene.getState()
    s.setMoment('galerie')
    s.setMonde('galerie')
    s.setTravel(-1)
    s.setNuit(1)
    s.setScrub(false)
    s.setPair('logo', null)
    s.setProjection(0)
    s.setPose({ x: 0, y: 0 })
    const reduit = s.reduced
    const ctx = gsap.context(() => {
      // L'intro défile : le hall s'avance depuis le fond (travel −1 → 0).
      ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'top top',
        scrub: true,
        onUpdate: (self) => useScene.getState().setTravel(self.progress - 1),
      })
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * (n - 1) * 0.85)}`,
        pin: reduit ? false : st,
        scrub: true,
        onUpdate: (self) => {
          const t = self.progress
          useScene.getState().setTravel(t)
          const k = Math.round(t * (n - 1))
          setCourant(k)
          useScene.getState().setAccent(PROJETS[k]!.accent)
        },
      })
      // Sous la liste (et jusqu'au pied de page), le hall s'efface : plus aucun écran derrière le texte.
      const liste = document.querySelector('.su-gal__liste')
      if (liste) {
        ScrollTrigger.create({
          trigger: liste,
          start: 'top 15%',
          onEnter: () => useScene.getState().setMonde('fabrique'),
          onLeaveBack: () => useScene.getState().setMonde('galerie'),
        })
      }
    }, el)
    return () => {
      ctx.revert()
      const sc = useScene.getState()
      sc.setMonde('fabrique')
      sc.setTravel(0)
      sc.setAccent('#F69106')
      sc.setSurvol(-1)
    }
  }, [n])

  // Un clic sur un écran 3D ouvre la fiche du projet.
  useEffect(() => {
    const ecoute = (e: Event) => {
      const d = (e as CustomEvent<{ slug: string }>).detail
      router.push(`/realisations/${d.slug}`)
    }
    window.addEventListener('su-galerie', ecoute)
    return () => window.removeEventListener('su-galerie', ecoute)
  }, [router])

  const p = PROJETS[courant]!
  return (
    <>
      <section className="su-gal__intro" data-moment="galerie-intro" data-nuit="1" aria-labelledby="su-gal-titre">
        <div className="su-gal__intro-grille">
          <div className="su-gal__intro-logo" aria-hidden="true">
            <StackFrame className="su-gal__cadre" />
          </div>
          <div>
            <p className="su-mono su-gal__etiquette">Réalisations — la galerie</p>
            <h1 id="su-gal-titre" className="su-display su-gal__titre">
              Entrez dans
              <br />
              la galerie.
            </h1>
            <p className="su-gal__ligne">
              Un site en ligne et le logiciel maison de Stackup : deux réalisations réelles, montrées avec leurs vraies captures d’écran, sur ordinateur et sur téléphone. Avancez dans le hall, l’écran que vous approchez s’allume.
            </p>
          </div>
        </div>
      </section>
      <section ref={section} className="su-gal" data-moment="galerie" data-nuit="1" aria-label="Le hall des démonstrations">
        <div ref={scene} className="su-gal__scene">
          <div className="su-gal__cartel" aria-live="polite">
            <p className="su-mono su-gal__compteur su-tabular">
              {String(courant + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
            </p>
            <p className="su-mono su-gal__demo" data-statut={p.statut === 'En ligne' ? 'ligne' : 'dev'}>
              {p.statut}
            </p>
            <h2 className="su-display su-gal__nom">{p.nom}</h2>
            <p className="su-gal__type">{p.type}</p>
            <p className="su-gal__desc">{p.description}</p>
            <div className="su-gal__actions">
              <Action href={`/realisations/${p.slug}`}>Voir la réalisation</Action>
              <Action href={p.url} variante="contour">
                {p.action}
              </Action>
            </div>
            <ol className="su-gal__jalons" aria-hidden="true">
              {PROJETS.map((q, k) => (
                <li key={q.slug} data-actif={k === courant ? '1' : '0'} style={{ '--accent': q.accent } as React.CSSProperties} />
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section className="su-gal__liste" data-moment="galerie-liste" data-nuit="1" aria-labelledby="su-gal-liste">
        <h2 id="su-gal-liste" className="su-display su-gal__liste-titre">
          Les réalisations
        </h2>
        <ul className="su-gal__grille">
          {PROJETS.map((q) => (
            <li key={q.slug} className="su-gal__carte">
              <a href={`/realisations/${q.slug}`} className="su-gal__lien">
                <Duo projet={q} />
                <span className="su-mono su-gal__demo" data-statut={q.statut === 'En ligne' ? 'ligne' : 'dev'}>
                  {q.statut}
                </span>
                <span className="su-gal__carte-nom">{q.nom}</span>
                <span className="su-gal__type">{q.type}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="su-gal__fin">
          <p className="su-display su-gal__fin-titre">Votre projet sera la prochaine.</p>
          <p className="su-gal__ligne">Un appel de 30 minutes pour comprendre votre activité, puis la démo de votre future page d’accueil.</p>
          <Action href="/contact?a=appel">Réserver mon appel gratuit</Action>
        </div>
      </section>
    </>
  )
}
