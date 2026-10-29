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
import { MORPH } from '@/webgl/morph'
import { useScene } from '@/webgl/store'
import { useDragPile } from '@/webgl/useDragPile'
import { useExclusion } from '@/webgl/useExclusion'
import { gsap, ScrollTrigger, initGsap } from '@/lib/gsap'
import Action from '@/components/ui/Action'
import Cote from '@/components/ui/Cote'
import './ouverture.css'

const EXCLUSION_00 = ['.su-ouv__texte', '.su-nav__barre']
const MOTS_TITRE = ['Création', 'de', 'sites', 'et', 'd’outils', 'sur', 'mesure.']

export default function Ouverture() {
  const section = useRef<HTMLElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const bind = useDragPile()
  useExclusion(EXCLUSION_00)

  useEffect(() => {
    initGsap()
    const el = section.current
    const st = scene.current
    if (!el || !st) return
    const s = useScene.getState()
    const reduit = s.reduced
    const mobile = window.innerWidth < 768

    // La scène : l'IMPRESSION. Le logo est là ; au scroll, des couches de trois
    // plaques viennent se poser exactement derrière lui, une à une (tête
    // d'impression au-dessus → place), chacune s'allume en se posant ; le S
    // devient massif, puis la caméra tourne pour montrer la profondeur.
    s.setMoment('00')
    s.setScrub(true)
    s.setParams({ retard: 0.9, flash: 1, epaisseur: 1, arc: 0 })
    s.setPair(reduit ? 'logo' : 'empileDepart', reduit ? null : 'empile')
    MORPH.value = 0
    s.setProjection(1)
    s.setPose({ x: 0, y: 0 })
    s.setActive(true)

    // Le titre se déplie mot par mot et le texte se découpe : tout cela est du CSS (keyframes, `ouverture.css`), lancé
    // dès la première peinture, sans attendre le JavaScript (le texte est dans le HTML serveur, sans réécriture du DOM).
    // Le JS ne pose que l'indicateur « prêt », à la fin de la séquence.
    const fin = window.setTimeout(() => {
      el.dataset.pret = '1'
    }, reduit ? 0 : 1250)
    const ctx = gsap.context(() => {
      if (reduit) return

      // Épinglage : p = 0 → 1 sur 150 vh (120 vh mobile).
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * (mobile ? 1.2 : 1.5))}`,
        pin: st,
        pinSpacing: true,
        scrub: true,
        onEnter: () => useScene.getState().setMoment('00'),
        onEnterBack: () => {
          // Retour d'en bas : le hero reprend la main sur sa paire logo → pile.
          const sc = useScene.getState()
          sc.setMoment('00')
          sc.setScrub(true)
          sc.setParams({ retard: 0.9, flash: 1, epaisseur: 1, arc: 0 })
          sc.setPair(reduit ? 'logo' : 'empileDepart', reduit ? null : 'empile')
        },
        onUpdate: (self) => {
          const p = self.progress
          if (useScene.getState().moment !== '00') return
          // 0 → 0,78 : les couches se posent ; 0,72 → 1 : la caméra tourne autour du S massif.
          const lisse = (a: number, b: number) => {
            const t = Math.min(1, Math.max(0, (p - a) / (b - a)))
            return t * t * (3 - 2 * t)
          }
          MORPH.value = Math.min(1, p / 0.78)
          el.style.setProperty('--su-p', p.toFixed(4))
          const sc = useScene.getState()
          sc.setProjection(1 - lisse(0, 0.3))
          // Trois quarts léger pendant l'impression (on voit les couches arriver), puis le tour
          // de caméra : la profondeur part vers le haut et la droite sans atteindre le titre.
          sc.setPose({ x: 0.06 * lisse(0, 0.3) + 0.04 * lisse(0.72, 1), y: -0.24 * lisse(0, 0.3) - 0.15 * lisse(0.72, 1) })
        },
      })
    }, el)

    return () => {
      window.clearTimeout(fin)
      ctx.revert()
      const sc = useScene.getState()
      sc.setTarget(null)
      sc.setScrub(false)
      sc.setProjection(1)
      sc.setPose({ x: 0, y: 0 })
      sc.setParams({ epaisseur: 1, retard: 0.25, flash: 0, arc: 0.6 })
      MORPH.value = 0
    }
  }, [])

  return (
    <section ref={section} className="su-ouv" data-moment="00" data-nuit="1" data-titre="Ouverture" aria-labelledby="su-ouv-titre">
      <div ref={scene} className="su-ouv__scene">
        <div className="su-ouv__grille">
          <div className="su-ouv__logo" {...bind()} role="img" aria-label="Logo Stackup Agency, trois plaques empilées">
            <StackFrame className="su-ouv__cadre" />
          </div>
          <div className="su-ouv__texte">
            <p className="su-mono su-ouv__etiquette">00 — Ouverture</p>
            <h1 id="su-ouv-titre" className="su-display su-ouv__titre">
              {MOTS_TITRE.map((m, i) => (
                <span key={m}>
                  {i > 0 && ' '}
                  <span className="su-ouv__mot" style={{ '--i': i } as React.CSSProperties}>
                    {m}
                  </span>
                </span>
              ))}
            </h1>
            <p className="su-ouv__ligne">
              Sites internet, boutiques en ligne et outils de gestion pour les artisans, commerçants et petites entreprises, en Touraine et partout en France : un outil à vous, pas un abonnement.
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
