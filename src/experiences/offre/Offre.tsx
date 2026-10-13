'use client'
/**
 * MOMENT 02 — L'OFFRE. Mécanisme : ASSEMBLAGE. La lumière s'allume (ivoire).
 * Sélecteur vertical de quatre offres (clavier, tap) ; la pile se réassemble
 * en la forme choisie et une maquette HTML s'assemble par-dessus, par découpe.
 * Fiche de fabrication et prix en Cadran. Rotation automatique toutes les 7 s
 * jusqu'à la première interaction.
 */
import { useEffect, useRef, useState } from 'react'
import StackFrame from '@/webgl/StackFrame'
import { useScene } from '@/webgl/store'
import { gsap, initGsap } from '@/lib/gsap'
import { arriverParScroll } from '../arrivee'
import Action from '@/components/ui/Action'
import Cadran from '@/components/ui/Cadran'
import Fiche from '@/components/ui/Fiche'
import { OFFRES_SCENE, offreDe } from './offres'
import Maquette from './Maquette'
import './offre.css'

export default function Offre() {
  const section = useRef<HTMLElement>(null)
  const [actif, setActif] = useState(0)
  const [interagi, setInteragi] = useState(false)
  const [visible, setVisible] = useState(false)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  // Entrée dans la section : la pile morphe vers la première offre, pilotée par le scroll.
  useEffect(() => {
    initGsap()
    const el = section.current
    if (!el) return
    const o = OFFRES_SCENE[0]!
    return arriverParScroll(el, {
      moment: '02',
      layout: o.layout,
      pose: o.pose,
      projection: o.projection,
      onPrise: () => setVisible(true),
      onSortie: () => setVisible(false),
    })
  }, [])

  // La scène suit l'offre active (tween de layout, pas de scrub).
  useEffect(() => {
    if (!visible) return
    const o = OFFRES_SCENE[actif]!
    const s = useScene.getState()
    if (s.moment !== '02' || s.reduced) return
    s.setScrub(false)
    s.setTarget(null)
    s.setPose(o.pose)
    s.setProjection(o.projection)
    s.setLayout(o.layout)
  }, [actif, visible])

  // Rotation automatique tant que personne n'a interagi.
  useEffect(() => {
    if (interagi || !visible) return
    const d = gsap.delayedCall(7, () => setActif((a) => (a + 1) % OFFRES_SCENE.length))
    return () => {
      d.kill()
    }
  }, [actif, interagi, visible])

  const choisir = (k: number) => {
    setInteragi(true)
    setActif(k)
  }
  const clavier = (e: React.KeyboardEvent) => {
    const n = OFFRES_SCENE.length
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      const k = (actif + 1) % n
      choisir(k)
      tabs.current[k]?.focus()
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const k = (actif - 1 + n) % n
      choisir(k)
      tabs.current[k]?.focus()
    }
  }

  const o = OFFRES_SCENE[actif]!
  const offre = offreDe(o.id)

  return (
    <section ref={section} className="su-off" data-moment="02" data-nuit="0" data-titre="L’offre" id="offre" aria-labelledby="su-off-titre">
      <div className="su-off__grille">
        <header className="su-off__tete">
          <p className="su-mono su-off__etiquette">02 — L’offre</p>
          <h2 id="su-off-titre" className="su-display su-off__titre">
            Ce qu’on
            <br />
            fabrique.
          </h2>
        </header>
        <div className="su-off__selecteur" role="tablist" aria-label="Les offres" aria-orientation="vertical" onKeyDown={clavier}>
          {OFFRES_SCENE.map((s, k) => {
            const of = offreDe(s.id)
            return (
              <button
                key={s.id}
                ref={(r) => {
                  tabs.current[k] = r
                }}
                type="button"
                role="tab"
                id={`su-off-tab-${s.id}`}
                aria-selected={k === actif}
                aria-controls="su-off-panneau"
                tabIndex={k === actif ? 0 : -1}
                className="su-plaque su-off__onglet"
                data-actif={k === actif ? '1' : '0'}
                onClick={() => choisir(k)}
              >
                <span className="su-mono su-off__num">0{k + 1}</span>
                <span className="su-off__nom">{of.nom}</span>
              </button>
            )
          })}
        </div>
        <div className="su-off__scene">
          <StackFrame className="su-off__cadre">
            <Maquette key={o.id} offre={o} />
          </StackFrame>
        </div>
        <div className="su-off__panneau" id="su-off-panneau" role="tabpanel" aria-labelledby={`su-off-tab-${o.id}`}>
          <p className="su-off__prix">
            <Cadran valeur={offre.aPartirDe} prefixe="à partir de" suffixe="€" className="su-off__cadran" />
          </p>
          <Fiche lignes={o.fiche} className="su-off__fiche" />
          <Action href={`/tarifs#${o.id}`} mot="Détailler">
            Détailler cette offre
          </Action>
        </div>
      </div>
    </section>
  )
}
