'use client'
/**
 * /tarifs — « Estimez votre projet ». Un hero court (la chaîne d'assemblage de la
 * Fabrique), puis l'estimateur, le parcours client, ce qui est inclus, les offres
 * « à partir de », l'abonnement composé et les services à la carte.
 */
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import StackFrame from '@/webgl/StackFrame'
import { useDragPile } from '@/webgl/useDragPile'
import { useScene } from '@/webgl/store'
import { gsap, SplitText, initGsap } from '@/lib/gsap'
import { SITE } from '@/config/site'
import { CONFIGS_OFFRES } from '@/domain/devis/offres'
import { ETAT_VIDE, encoder, type EtatEstimateur } from '@/domain/devis/etat'
import Action from '@/components/ui/Action'
import Plaque from '@/components/ui/Plaque'
import ParcoursClient from '@/components/tarifs/ParcoursClient'
import InclusCreation from '@/components/tarifs/InclusCreation'
import AbonnementCompose from '@/components/tarifs/AbonnementCompose'
import ALaCarte from '@/components/tarifs/ALaCarte'
import Estimateur from '@/experiences/estimateur/Estimateur'
import './tarifs.css'

export default function Tarifs({ initial }: { initial: EtatEstimateur }) {
  const page = useRef<HTMLElement>(null)
  const titre = useRef<HTMLHeadingElement>(null)
  const bind = useDragPile()
  useEffect(() => {
    initGsap()
    const el = page.current
    const h1 = titre.current
    if (!el || !h1) return
    const s = useScene.getState()
    s.setMoment('tarifs')
    s.setMonde('tapis')
    s.setNuit(1)
    s.setScrub(false)
    s.setTarget(null)
    // La chaîne d'assemblage : vue de trois quarts pour voir le tapis arriver.
    s.setParams({ entree: 1, arc: 0, retard: 0.35, flash: 0 })
    s.setPose({ x: 0.16, y: -0.3 })
    s.setProjection(0.35)
    s.setCalme(false)
    if (!s.reduced) s.setLayout('cadran')
    const split = new SplitText(h1, { type: 'words', wordsClass: 'su-tar__mot', aria: 'none' })
    const ctx = gsap.context(() => {
      if (!s.reduced) {
        gsap.set(split.words, { rotateX: -90, transformOrigin: '50% 100%' })
        gsap.to(split.words, { rotateX: 0, duration: 0.62, ease: 'power3.out', stagger: 0.07, delay: 0.15 })
      }
    }, el)
    return () => {
      ctx.revert()
      split.revert()
      const sc = useScene.getState()
      sc.setNuit(1)
      sc.setMonde('fabrique')
      sc.setParams({ entree: 0, arc: 0.6, retard: 0.25 })
    }
  }, [])

  return (
    <main ref={page} className="su-tar" data-lecture="1" data-moment="tarifs">
      <section className="su-tar__hero" data-moment="tarifs-hero" data-nuit="1" aria-labelledby="su-tar-titre">
        <div className="su-tar__grille">
          <header className="su-tar__tete">
            <p className="su-mono su-tar__etiquette">Tarifs · l’estimateur</p>
            <h1 ref={titre} id="su-tar-titre" className="su-display su-tar__titre">
              Combien coûte votre projet ?
            </h1>
            <p className="su-tar__ligne">
              Répondez à quelques questions simples, ou partez d’un projet tout prêt : une fourchette de prix se précise à chaque choix, et la chaîne d’assemblage ci-contre construit votre projet sous vos yeux.
            </p>
            <p className="su-tar__actions">
              <Action href="#estimer">Estimer mon projet</Action>
              <Action href="/contact?a=appel" variante="contour">
                Réserver mon appel gratuit
              </Action>
            </p>
            <p className="su-tar__secondaire">
              Vous savez déjà ce que vous voulez ? <a href="/ressources/cahier-des-charges">Décrivez votre projet en détail</a>
            </p>
          </header>
          <div className="su-tar__scene" {...bind()} role="img" aria-label="Le produit en construction sur la chaîne d’assemblage ; faites-le tourner">
            <StackFrame className="su-tar__cadre" />
          </div>
        </div>
      </section>

      <Estimateur initial={initial} />
      <ParcoursClient id="parcours" />
      <InclusCreation />

      <section className="su-tar__offres" data-moment="tarifs-offres" data-nuit="0" aria-labelledby="su-tar-offres">
        <div className="su-tar__grille su-tar__grille--offres">
          <h2 id="su-tar-offres" className="su-display su-tar__h2">
            Les quatre points de départ
          </h2>
          <p className="su-tar__sous">Chaque prix est un « à partir de » : la plus petite version de l’offre. Ouvrez-la dans l’estimateur pour l’agrandir à votre mesure.</p>
          <ul className="su-tar__liste">
            {SITE.offres.map((o, k) => (
              <li key={o.id} id={o.id}>
                <Plaque as="article" className="su-tar__offre" aria-labelledby={`su-tar-${o.id}`}>
                  <p className="su-mono su-tar__num">0{k + 1}</p>
                  <h3 id={`su-tar-${o.id}`} className="su-tar__nom">
                    {o.nom}
                  </h3>
                  <p className="su-tar__prix">
                    <span className="su-tar__prix-pre">à partir de</span> <span className="su-tabular">{o.aPartirDe.toLocaleString('fr-FR')} €</span>
                  </p>
                  <ul className="su-tar__inclus" aria-label="Inclus">
                    {o.inclus.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                  <Link className="su-tar__lien" href={`/tarifs?e=${encoder({ ...ETAT_VIDE(), cfg: CONFIGS_OFFRES[o.id] })}#estimer`}>
                    Ouvrir dans l’estimateur
                  </Link>
                </Plaque>
              </li>
            ))}
          </ul>
          <p className="su-tar__mention su-mono">
            {SITE.mentions.tva}. Devis valable {SITE.mentions.devisValable}.
          </p>
        </div>
      </section>

      <AbonnementCompose />
      <ALaCarte />

      <section className="su-tar__maint" aria-labelledby="su-tar-final" data-nuit="0">
        <div className="su-tar__grille">
          <p className="su-tar__final">
            <span id="su-tar-final" className="su-display su-tar__final-titre">
              Un devis, pas une estimation.
            </span>
            <span>Le prix exact se fixe avec vous, après un appel et une démo de votre page d’accueil.</span>
            <Action href="/contact?a=appel">Réserver mon appel gratuit (30 min)</Action>
          </p>
        </div>
      </section>
    </main>
  )
}
