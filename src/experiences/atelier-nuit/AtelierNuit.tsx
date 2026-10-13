'use client'
/**
 * /a-propos — L'ATELIER DE NUIT. Un bureau éclairé par la lampe ambre ; au
 * scroll (épinglé, scrub pur) la caméra s'approche de l'établi, le cadre du
 * portrait se construit en plaques (logo → cadre) et la photo se révèle à
 * l'intérieur ; puis les trois engagements s'écrivent en lumière, trait par
 * trait. Interaction propre : la lampe. Un clic sur l'interrupteur éteint la
 * lumière de la pièce et ne laisse que la lampe (et l'inverse).
 */
import { useEffect, useRef, useState } from 'react'
import StackFrame from '@/webgl/StackFrame'
import { stackUniforms } from '@/webgl/engine'
import { useScene } from '@/webgl/store'
import { gsap, ScrollTrigger, initGsap } from '@/lib/gsap'
import { SITE } from '@/config/site'
import Portrait from '@/components/ui/Portrait'
import Action from '@/components/ui/Action'
import Accordeon from '@/components/editorial/Accordeon'
import './atelier-nuit.css'

const ENGAGEMENTS = ['Une démo avant de signer', 'Un prix écrit avant de commencer', 'Le code et les données à vous']

const FAQ = [
  { q: 'Vous travaillez seul ?', r: 'Oui. Vous parlez à la personne qui conçoit, écrit le code et met en ligne votre site. Pas d’intermédiaire, pas de chef de projet qui transmet.' },
  { q: 'Et si je ne suis pas à Tours ?', r: 'La plupart des projets se font à distance : un appel vidéo pour démarrer, une démo en ligne, des échanges par écrit. Pour l’Indre-et-Loire, je peux venir sur place.' },
  { q: 'Pourquoi des outils sur mesure plutôt qu’un abonnement ?', r: 'Un abonnement vous loue un outil pensé pour tout le monde. Un outil sur mesure est fait pour votre façon de travailler, il vous appartient, et il ne s’arrête pas le jour où vous cessez de payer.' },
]

export default function AtelierNuit() {
  const section = useRef<HTMLElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(0)
  const [lampe, setLampe] = useState(true)

  useEffect(() => {
    initGsap()
    const el = section.current
    const st = scene.current
    if (!el || !st) return
    const u = stackUniforms()
    const s = useScene.getState()
    const reduit = s.reduced
    s.setMoment('atelier-nuit')
    s.setMonde('atelier')
    s.setNuit(1)
    s.setScrub(true)
    s.setParams({ retard: 0.5, arc: 0.4, flash: 0, approche: 0, halo: 0.34 })
    s.setProjection(0.3)
    s.setPose({ x: 0.1, y: -0.18 })
    s.setPair('logo', reduit ? null : 'cadre')
    u.uMorph.value = 0
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * 2)}`,
        pin: reduit ? false : st,
        scrub: true,
        onUpdate: (self) => {
          const q = reduit ? 1 : self.progress
          setP(q)
          if (useScene.getState().moment !== 'atelier-nuit') return
          // 0 → 0,45 : le cadre se construit en se tournant face à vous ; ensuite on
          // s'approche : la figure entière (cadre 3D + photo) grandit d'un bloc, le
          // cadre ne quitte jamais la photo (pas de travelling caméra ici).
          const m = Math.min(1, q / 0.45)
          u.uMorph.value = m
          const f = 1 - m * m * (3 - 2 * m)
          useScene.getState().setPose({ x: 0.1 * f, y: -0.18 * f })
        },
      })
    }, el)
    return () => {
      ctx.revert()
      useScene.getState().setParams({ approche: 0, halo: 0.24, lampe: 1 })
      useScene.getState().setMonde('fabrique')
    }
  }, [])

  // L'interrupteur : la lampe seule (pièce noire) ou la pièce éclairée.
  useEffect(() => {
    const s = useScene.getState()
    s.setParams({ halo: lampe ? 0.34 : 0.08, lampe: lampe ? 1 : 0.15 })
    document.documentElement.dataset.suLampe = lampe ? '1' : '0'
    return () => {
      delete document.documentElement.dataset.suLampe
    }
  }, [lampe])

  const revele = Math.min(1, Math.max(0, (p - 0.3) / 0.25))
  const ecrit = (k: number) => Math.min(1, Math.max(0, (p - 0.55 - k * 0.12) / 0.14))
  return (
    <>
      <section ref={section} className="su-atn" data-moment="atelier-nuit" data-nuit="1" aria-labelledby="su-atn-titre">
        <div ref={scene} className="su-atn__scene">
          <div className="su-atn__grille">
            <header className="su-atn__tete">
              <p className="su-mono su-atn__etiquette">À propos — l’atelier de nuit</p>
              <h1 id="su-atn-titre" className="su-display su-atn__titre">
                {SITE.fondateur}
              </h1>
              <p className="su-atn__role su-mono">Fondateur · conception, code, mise en ligne · {SITE.ville}</p>
              <button type="button" className="su-atn__interrupteur" aria-pressed={lampe} onClick={() => setLampe((l) => !l)}>
                <span className="su-atn__bouton" aria-hidden="true" />
                {lampe ? 'Éteindre la pièce, garder la lampe' : 'Rallumer la pièce'}
              </button>
            </header>
            <figure className="su-atn__portrait" style={{ '--revele': revele.toFixed(3), '--approche': Math.max(0, (p - 0.45) / 0.55).toFixed(3) } as React.CSSProperties}>
              <div className="su-atn__cadre-zone" aria-hidden="true">
                <StackFrame className="su-atn__cadre" />
              </div>
              <div className="su-atn__photo">
                <Portrait fond="nuit" priorite />
              </div>
            </figure>
            <ol className="su-atn__engagements" aria-label="Trois engagements">
              {ENGAGEMENTS.map((e, k) => (
                <li key={e} style={{ '--e': ecrit(k).toFixed(3) } as React.CSSProperties}>
                  <svg viewBox="0 0 1000 80" className="su-atn__trace" aria-hidden="true">
                    <text x="0" y="58" pathLength={1}>
                      {e}
                    </text>
                  </svg>
                  <span className="sr-only">{e}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section className="su-atn__recit" data-moment="atelier-recit" data-nuit="0" aria-labelledby="su-atn-recit">
        <div className="su-atn__recit-grille">
          <h2 id="su-atn-recit" className="su-display su-atn__h2">
            Une agence d’une personne,
            <br />
            et c’est voulu.
          </h2>
          <div className="su-atn__paragraphes">
            <p>Je fabrique des sites et des outils pour des gens qui ont un métier à faire tourner, pas du temps à perdre dans un logiciel. Un artisan, un restaurateur, une boutique, un cabinet : chacun a ses journées, ses clients, ses contraintes. Un outil sur mesure part de là.</p>
            <p>Vous parlez à celui qui conçoit, écrit le code et met en ligne. Personne ne transmet votre demande à quelqu’un d’autre ; ce que vous dites en rendez-vous est ce qui est fabriqué.</p>
            <p>La règle de l’atelier est simple : une démo avant de signer, un prix écrit avant de commencer, et à la fin, le code et les données vous appartiennent. Si vous voulez partir un jour, vous partez avec tout.</p>
          </div>
          <dl className="su-atn__fiche">
            <div>
              <dt className="su-mono">Atelier</dt>
              <dd>{SITE.ville}, {SITE.departement}</dd>
            </div>
            <div>
              <dt className="su-mono">Contact</dt>
              <dd>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </dd>
            </div>
            <div>
              <dt className="su-mono">Fabrique</dt>
              <dd>Sites vitrines, boutiques, outils de gestion</dd>
            </div>
          </dl>
          <div className="su-atn__faq">
            <Accordeon questions={FAQ} />
          </div>
          <div className="su-atn__actions">
            <Action href="/contact">Parler de votre projet</Action>
            <Action href="/realisations" variante="contour">
              Voir les démos
            </Action>
          </div>
        </div>
      </section>
    </>
  )
}
