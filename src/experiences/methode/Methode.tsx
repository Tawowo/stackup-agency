'use client'
/**
 * MOMENT 07 — LA MÉTHODE. Mécanisme : UN PROJET QUI ÉVOLUE.
 * Cinq étapes, sans dates ni durées. Le même projet de site avance au rythme
 * du scroll : un croquis sur un carnet, la démo dans un navigateur (mise en
 * avant : la démo avant la vente), le code qui s'écrit pendant que le design
 * se construit, la mise en ligne, le suivi. Le numéro se déplie, le texte se
 * découpe.
 */
import { PRIX_PUBLICS } from '@/config/prix-publics.generated'
import { useEffect, useRef, useState } from 'react'
import { useScene } from '@/webgl/store'
import { ScrollTrigger, initGsap } from '@/lib/gsap'
import { Chantier, etatDe, memeEtat, poserChantier, type EtatChantier } from './Chantier'
import './methode.css'

const PRIX_DEMO = PRIX_PUBLICS.demo

export const ETAPES = [
  { num: '01', nom: 'On se parle', texte: 'Un rendez-vous, chez vous ou en visio. Vous racontez votre métier, vos clients, ce qui vous fait perdre du temps.' },
  { num: '02', nom: 'On vous montre avant de vous vendre', texte: `La démo de votre page d’accueil, avant toute signature (${PRIX_DEMO} €). Vous jugez sur pièce, pas sur promesse.`, ambre: true },
  { num: '03', nom: 'On fabrique', texte: 'Vous suivez l’avancement, vous relisez, vous demandez des ajustements. Rien n’est figé avant votre accord.' },
  { num: '04', nom: 'On met en ligne', texte: 'Nom de domaine, hébergement, certificat, formation : vous repartez avec les clés et vous savez vous en servir.' },
  { num: '05', nom: 'On reste là', texte: 'Maintenance, évolutions, nouvelles fonctions : l’outil grandit avec vous, à votre rythme.' },
]

export default function Methode() {
  const section = useRef<HTMLElement>(null)
  const [etape, setEtape] = useState(0)
  const [d, setD] = useState<EtatChantier>(() => etatDe(0))
  const scene = useRef<HTMLDivElement>(null)
  const [enVue, setEnVue] = useState(false)

  useEffect(() => {
    initGsap()
    const el = section.current
    if (!el) return
    const reduit = useScene.getState().reduced
    // Le chantier est un décor HTML : la pile reste le logo au repos, discrète.
    const prise = () => {
      const s = useScene.getState()
      s.setMoment('07')
      s.setScrub(false)
      s.setProjection(1)
      s.setPose({ x: 0, y: 0 })
      if (!s.reduced) s.setLayout('logo')
    }
    // Chaque carte, en passant de 80 % à 45 % du viewport, fait avancer le projet d'un cran.
    // Tout dérive de la position des cartes : identique à la remontée.
    const etapes = Array.from(el.querySelectorAll<HTMLElement>('.su-met__etape'))
    // Positions des cartes dans le document, relevées au refresh : aucune lecture de mise en page pendant le défilement.
    let hauts: number[] = []
    const mesurer = () => {
      hauts = etapes.map((c) => c.getBoundingClientRect().top + window.scrollY)
    }
    ScrollTrigger.addEventListener('refresh', mesurer)
    mesurer()
    const appliquer = (v: number) => {
      // Plateaux : chaque étape tient lisible ; la découpe vers la suivante est brève.
      const k = Math.min(5, Math.floor(v))
      const f = Math.min(1, Math.max(0, (v - k - 0.3) / 0.4))
      const e = reduit ? 5 : Math.min(5, k + f * f * (3 - 2 * f))
      if (scene.current) poserChantier(scene.current, e)
      const nouveau = etatDe(e)
      setD((prec) => (memeEtat(prec, nouveau) ? prec : nouveau))
    }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: prise,
      onEnterBack: prise,
      onUpdate: () => {
        const H = window.innerHeight
        let v = 0
        let franchies = 0
        const y = window.scrollY
        hauts.forEach((haut, i) => {
          const top = haut - y
          const t = Math.min(1, Math.max(0, (0.85 * H - top) / (0.4 * H)))
          v += t
          if (t > 0.05) franchies = i + 1
        })
        appliquer(v)
        setEtape(franchies)
      },
    })
    // La scène est FIXE (jamais déplacée par le défilement : un calque déplacé laissait un
    // fantôme dans le compositeur) ; elle se découvre par découpe tant que la section est en vue.
    const vue = ScrollTrigger.create({
      trigger: el,
      start: 'top 62%',
      end: 'bottom 70%',
      onToggle: (self) => setEnVue(self.isActive),
    })
    appliquer(0)
    return () => {
      ScrollTrigger.removeEventListener('refresh', mesurer)
      st.kill()
      vue.kill()
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
        <div className="su-met__place" aria-hidden="true" />
        <div ref={scene} className="su-met__scene" data-vue={enVue ? '1' : '0'}>
          <Chantier d={d} />
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
