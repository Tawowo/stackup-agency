'use client'
/**
 * MOMENT 06 — LE JUSTE PRIX. Mécanisme : CADRAN. Ivoire.
 * Quatre Plaques (les quatre offres) avec Cadran « à partir de » et trois
 * inclusions ; trois engagements tracés en SVG ; la pile forme une jauge dont
 * l'aiguille suit l'offre survolée / focalisée. Aucune durée, aucun comparatif.
 */
import { useEffect, useRef, useState } from 'react'
import StackFrame from '@/webgl/StackFrame'
import { useScene } from '@/webgl/store'
import { ScrollTrigger, initGsap } from '@/lib/gsap'
import { arriverParScroll } from '../arrivee'
import { SITE } from '@/config/site'
import Action from '@/components/ui/Action'
import Cadran from '@/components/ui/Cadran'
import Plaque from '@/components/ui/Plaque'
import './prix.css'

const ENGAGEMENTS = [
  { nom: 'Démo avant signature', d: 'M4 16 l8 8 l16 -16' },
  { nom: 'Code et données à vous', d: 'M6 6 h20 v20 h-20 z M11 16 h10' },
  { nom: 'Pas d’abonnement obligatoire', d: 'M4 16 h24 M16 4 v24' },
]

export default function Prix() {
  const section = useRef<HTMLElement>(null)
  const [focal, setFocal] = useState(-1)
  const n = SITE.offres.length

  useEffect(() => {
    initGsap()
    const el = section.current
    if (!el) return
    const arret = arriverParScroll(el, { moment: '06', layout: 'cadran', pose: { x: 0, y: 0 }, projection: 1, params: { aiguille: 0 } })
    // Les engagements se tracent avec le scroll (SVG, --su-trace de 0 à 1).
    const traces = el.querySelectorAll<SVGPathElement>('.su-prix__trace')
    traces.forEach((p) => p.style.setProperty('--len', String(p.getTotalLength())))
    const st2 = ScrollTrigger.create({
      trigger: '.su-prix__engagements',
      start: 'top 90%',
      end: 'top 55%',
      scrub: true,
      onUpdate: (self) => el.style.setProperty('--su-trace', self.progress.toFixed(4)),
    })
    return () => {
      arret()
      st2.kill()
    }
  }, [])

  // L'aiguille suit l'offre focalisée (0 → 1 sur quatre offres).
  useEffect(() => {
    const s = useScene.getState()
    if (s.moment !== '06') return
    s.setParams({ aiguille: focal < 0 ? 0 : focal / (n - 1) })
  }, [focal, n])

  return (
    <section ref={section} className="su-prix" data-moment="06" data-nuit="0" data-titre="Le juste prix" id="prix" aria-labelledby="su-prix-titre">
      <div className="su-prix__grille">
        <header className="su-prix__tete">
          <p className="su-mono su-prix__etiquette">06 — Le juste prix</p>
          <h2 id="su-prix-titre" className="su-display su-prix__titre">
            Un prix juste,
            <br />
            écrit noir sur blanc.
          </h2>
        </header>
        <div className="su-prix__jauge" aria-hidden="true">
          <StackFrame className="su-prix__cadre" />
        </div>
        <ul className="su-prix__offres" aria-label="Les offres">
          {SITE.offres.map((o, k) => (
            <li key={o.id}>
              <Plaque
                as="article"
                className="su-prix__offre"
                tabIndex={0}
                data-focal={focal === k ? '1' : '0'}
                onMouseEnter={() => setFocal(k)}
                onFocus={() => setFocal(k)}
                onMouseLeave={() => setFocal(-1)}
                onBlur={() => setFocal(-1)}
                aria-labelledby={`su-prix-${o.id}`}
              >
                <p className="su-mono su-prix__num">0{k + 1}</p>
                <h3 id={`su-prix-${o.id}`} className="su-prix__nom">
                  {o.nom}
                </h3>
                <p className="su-prix__cadran">
                  <Cadran valeur={o.aPartirDe} prefixe="à partir de" suffixe="€" />
                </p>
                <ul className="su-prix__inclus">
                  {o.inclus.slice(0, 3).map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </Plaque>
            </li>
          ))}
        </ul>
        <ul className="su-prix__engagements" aria-label="Nos engagements">
          {ENGAGEMENTS.map((e, k) => (
            <li key={e.nom} className="su-mono" style={{ '--k': k } as React.CSSProperties}>
              <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
                <path className="su-prix__trace" d={e.d} />
              </svg>
              {e.nom}
            </li>
          ))}
        </ul>
        <div className="su-prix__action">
          <Action href="/tarifs" mot="Voir">
            Voir tous les tarifs
          </Action>
        </div>
      </div>
    </section>
  )
}
