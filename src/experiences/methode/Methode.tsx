'use client'
/**
 * MOMENT 07 — LA MÉTHODE. Mécanisme : ASSEMBLAGE SÉQUENTIEL. Nuit → 1.
 * Cinq étapes, sans dates ni durées. À chaque étape franchie par le scroll,
 * un groupe de plaques s'assemble jusqu'à former une page complète ; le
 * numéro se déplie en display XL, le texte en découpe. L'étape 02 (la démo
 * avant la vente) est mise en avant : une plaque ambre.
 */
import { useEffect, useRef, useState } from 'react'
import StackFrame from '@/webgl/StackFrame'
import { stackUniforms } from '@/webgl/engine'
import { useScene } from '@/webgl/store'
import { ScrollTrigger, initGsap } from '@/lib/gsap'
import { arriverParScroll } from '../arrivee'
import './methode.css'

export const ETAPES = [
  { num: '01', nom: 'On se parle', texte: 'Un rendez-vous, chez vous ou en visio. Vous racontez votre métier, vos clients, ce qui vous fait perdre du temps.' },
  { num: '02', nom: 'On vous montre avant de vous vendre', texte: 'Une démo de votre site, gratuite, avant toute signature. Vous jugez sur pièce, pas sur promesse.', ambre: true },
  { num: '03', nom: 'On fabrique', texte: 'Vous suivez l’avancement, vous relisez, vous demandez des ajustements. Rien n’est figé avant votre accord.' },
  { num: '04', nom: 'On met en ligne', texte: 'Nom de domaine, hébergement, certificat, formation : vous repartez avec les clés et vous savez vous en servir.' },
  { num: '05', nom: 'On reste là', texte: 'Maintenance, évolutions, nouvelles fonctions : l’outil grandit avec vous, à votre rythme.' },
]

export default function Methode() {
  const section = useRef<HTMLElement>(null)
  const [etape, setEtape] = useState(0)

  useEffect(() => {
    initGsap()
    const el = section.current
    if (!el) return
    const u = stackUniforms()
    // Arrivée : la jauge devient la structure de la page (étape 1), pilotée par le scroll.
    const arret = arriverParScroll(el, { moment: '07', layout: 'methode', pose: { x: 0.08, y: -0.25 }, projection: 0.4, params: { etape: 1 } })
    // Puis les étapes 2 à 5 s'assemblent, une par tranche de scroll, à l'identique à la remontée.
    let paire = -1
    const etapes = el.querySelectorAll<HTMLElement>('.su-met__etape')
    const st = ScrollTrigger.create({
      trigger: etapes[1] ?? el,
      start: 'top 80%',
      endTrigger: etapes[etapes.length - 1] ?? el,
      end: 'top 45%',
      scrub: true,
      onUpdate: (self) => {
        const s = useScene.getState()
        if (s.moment !== '07') return
        const e = 1 + self.progress * 4
        const k = Math.min(4, Math.floor(e))
        const t = e - k
        setEtape(Math.round(e))
        if (s.reduced) return
        if (k !== paire) {
          paire = k
          s.setScrub(true)
          s.setPair('methode', 'methode', { a: { etape: k }, b: { etape: k + 1 } })
        }
        u.uMorph.value = t * t * (3 - 2 * t)
      },
    })
    return () => {
      arret()
      st.kill()
    }
  }, [])

  return (
    <section ref={section} className="su-met" data-moment="07" data-nuit="1" data-titre="La méthode" id="methode" aria-labelledby="su-met-titre">
      <div className="su-met__grille">
        <header className="su-met__tete">
          <p className="su-mono su-met__etiquette">07 — La méthode</p>
          <h2 id="su-met-titre" className="su-display su-met__titre">
            Comment on
            <br />
            travaille.
          </h2>
        </header>
        <div className="su-met__scene">
          <StackFrame className="su-met__cadre" />
        </div>
        <ol className="su-met__etapes" aria-label="Les cinq étapes">
          {ETAPES.map((e, k) => (
            <li key={e.num} className={`su-met__etape ${e.ambre ? 'su-plaque su-plaque--ambre' : ''}`} data-franchie={etape >= k + 1 ? '1' : '0'}>
              <span className="su-display su-met__num" aria-hidden="true">
                {e.num}
              </span>
              <div className="su-met__texte">
                <h3 className="su-met__nom">
                  <span className="su-mono su-met__num-sr">{e.num}</span> {e.nom}
                </h3>
                <p>{e.texte}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
