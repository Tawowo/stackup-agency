'use client'
/**
 * MOMENT 05 — LA SALLE DES MACHINES. Mécanisme : MODULES.
 * La pile en réseau de modules (plaques-nœuds reliées par des plaques fines),
 * chaque nœud une solution réelle du catalogue. Clic / tap / clavier sur un
 * nœud : il s'allume, les arêtes s'éclairent, et une maquette HTML animée du
 * module s'assemble par découpe dans une Plaque à droite. Rotation automatique
 * toutes les 6 s jusqu'à la première interaction. Aucun logiciel fonctionnel.
 */
import { useEffect, useRef, useState } from 'react'
import StackFrame from '@/webgl/StackFrame'
import { useScene } from '@/webgl/store'
import { noeud } from '@/webgl/layouts/machines'
import { LOGO_VIEW, SVG_PAR_UNITE } from '@/webgl/logo-geometry'
import { gsap, ScrollTrigger, initGsap } from '@/lib/gsap'
import Action from '@/components/ui/Action'
import Plaque from '@/components/ui/Plaque'
import { MODULES } from './modules'
import MaquetteModule from './Maquette'
import './machines.css'

const W = LOGO_VIEW.w / SVG_PAR_UNITE
const H = LOGO_VIEW.h / SVG_PAR_UNITE

export default function Machines() {
  const section = useRef<HTMLElement>(null)
  const [actif, setActif] = useState(0)
  const [interagi, setInteragi] = useState(false)
  const [visible, setVisible] = useState(false)
  const portrait = useScene((s) => s.params.portrait) > 0.5
  const boutons = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    initGsap()
    const el = section.current
    if (!el) return
    const entrer = () => {
      const s = useScene.getState()
      s.setMoment('05')
      s.setNuit(1)
      setVisible(true)
      if (s.reduced) return
      s.setScrub(false)
      s.setTarget(null)
      s.setPose({ x: 0.12, y: -0.1 })
      s.setProjection(0.6)
      s.setParams({ modules: MODULES.length, isoPush: 0, isoDim: 0.42 })
      s.setLayout('machines')
    }
    const st = ScrollTrigger.create({ trigger: el, start: 'top 55%', end: 'bottom 45%', onEnter: entrer, onEnterBack: entrer, onLeave: () => setVisible(false), onLeaveBack: () => setVisible(false) })
    return () => {
      st.kill()
      useScene.getState().setIsolate(-1)
    }
  }, [])

  useEffect(() => {
    if (!visible) return
    useScene.getState().setIsolate(actif + 1)
    return () => useScene.getState().setIsolate(-1)
  }, [actif, visible])

  useEffect(() => {
    if (interagi || !visible) return
    const d = gsap.delayedCall(6, () => setActif((a) => (a + 1) % MODULES.length))
    return () => {
      d.kill()
    }
  }, [actif, interagi, visible])

  const choisir = (k: number) => {
    setInteragi(true)
    setActif(k)
  }
  const clavier = (e: React.KeyboardEvent) => {
    const n = MODULES.length
    let k = -1
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') k = (actif + 1) % n
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') k = (actif - 1 + n) % n
    if (k < 0) return
    e.preventDefault()
    choisir(k)
    boutons.current[k]?.focus()
  }

  const mod = MODULES[actif]!
  return (
    <section ref={section} className="su-mac" data-moment="05" id="machines" aria-labelledby="su-mac-titre">
      <div className="su-mac__grille">
        <header className="su-mac__tete">
          <p className="su-mono su-mac__etiquette">05 — La salle des machines</p>
          <h2 id="su-mac-titre" className="su-display su-mac__titre">
            Des outils qui vous
            <br />
            appartiennent.
          </h2>
          <p className="su-mac__ligne">
            Devis, factures, planning, rendez-vous, click &amp; collect : fabriqués pour votre métier, sans abonnement, données à vous.
          </p>
          <Action href="/contact?objet=Outil%20sur%20mesure" mot="Écrire">
            Parler de votre outil
          </Action>
        </header>
        <div className="su-mac__reseau">
          <StackFrame className="su-mac__cadre">
            {/* Les nœuds HTML : un bouton par module, calé sur la plaque (ortho). */}
            <div className="su-mac__noeuds" role="listbox" aria-label="Les modules" aria-activedescendant={`su-mac-${mod.slug}`} tabIndex={0} onKeyDown={clavier}>
              {MODULES.map((m, k) => {
                const p = noeud(k, MODULES.length, portrait)
                return (
                  <button
                    key={m.slug}
                    id={`su-mac-${m.slug}`}
                    ref={(r) => {
                      boutons.current[k] = r
                    }}
                    type="button"
                    role="option"
                    aria-selected={k === actif}
                    tabIndex={-1}
                    className="su-mac__noeud su-mono"
                    data-actif={k === actif ? '1' : '0'}
                    style={{ left: `${((p.x + W / 2) / W) * 100}%`, top: `${((H / 2 - p.y) / H) * 100}%` }}
                    onClick={() => choisir(k)}
                    data-curseur="Allumer"
                  >
                    {m.court}
                  </button>
                )
              })}
            </div>
          </StackFrame>
        </div>
        <Plaque variante="encre" className="su-mac__plaque" aria-live="polite">
          <MaquetteModule key={mod.slug} slug={mod.slug} />
        </Plaque>
      </div>
    </section>
  )
}
