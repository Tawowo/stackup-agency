'use client'
/**
 * /tarifs — « Le Configurateur de pile ». Hero : la pile en cadran, le titre,
 * le configurateur. Puis les quatre offres détaillées, la maintenance, et
 * l'action finale vers /contact.
 */
import { useEffect, useRef } from 'react'
import StackFrame from '@/webgl/StackFrame'
import { useScene } from '@/webgl/store'
import { gsap, ScrollTrigger, SplitText, initGsap } from '@/lib/gsap'
import { SITE } from '@/config/site'
import { OFFRES_SCENE } from '@/experiences/offre/offres'
import type { Configuration } from '@/lib/configuration'
import Action from '@/components/ui/Action'
import Cadran from '@/components/ui/Cadran'
import Fiche from '@/components/ui/Fiche'
import Plaque from '@/components/ui/Plaque'
import Configurateur from './Configurateur'
import './tarifs.css'

const MAINTENANCE_LIGNES = [
  { nom: 'Mises à jour et sauvegardes', plans: [true, true, true] },
  { nom: 'Surveillance et remise en ligne', plans: [true, true, true] },
  { nom: 'Modifications de contenu', plans: [false, true, true] },
  { nom: 'Évolutions et nouvelles fonctions', plans: [false, false, true] },
  { nom: 'Priorité de traitement', plans: [false, false, true] },
]

export default function Tarifs({ initiale }: { initiale: Configuration }) {
  const page = useRef<HTMLElement>(null)
  const titre = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    initGsap()
    const el = page.current
    const h1 = titre.current
    if (!el || !h1) return
    const s = useScene.getState()
    s.setMoment('tarifs')
    s.setNuit(1)
    s.setScrub(false)
    s.setTarget(null)
    s.setPose({ x: 0, y: 0 })
    s.setProjection(1)
    s.setCalme(false)
    if (!s.reduced) s.setLayout('cadran')
    const split = new SplitText(h1, { type: 'words', wordsClass: 'su-tar__mot' })
    const nuit = { v: 1 }
    const vers = (v: number) => {
      gsap.killTweensOf(nuit)
      if (useScene.getState().reduced) {
        nuit.v = v
        useScene.getState().setNuit(v)
        return
      }
      gsap.to(nuit, { v, duration: 1.1, ease: 'power2.inOut', onUpdate: () => useScene.getState().setNuit(nuit.v) })
    }
    const ctx = gsap.context(() => {
      if (!s.reduced) {
        gsap.set(split.words, { rotateX: -90, transformOrigin: '50% 100%' })
        gsap.to(split.words, { rotateX: 0, duration: 0.62, ease: 'power3.out', stagger: 0.07, delay: 0.15 })
      }
      // La lecture (offres, maintenance) se fait sur ivoire.
      ScrollTrigger.create({ trigger: '.su-tar__offres', start: 'top 60%', onEnter: () => vers(0), onLeaveBack: () => vers(1) })
    }, el)
    return () => {
      ctx.revert()
      split.revert()
      gsap.killTweensOf(nuit)
      useScene.getState().setNuit(1)
    }
  }, [])

  return (
    <main ref={page} className="su-tar" data-moment="tarifs">
      <section className="su-tar__hero" aria-labelledby="su-tar-titre">
        <div className="su-tar__grille">
          <div className="su-tar__scene">
            <StackFrame className="su-tar__cadre" />
          </div>
          <header className="su-tar__tete">
            <p className="su-mono su-tar__etiquette">Tarifs · le configurateur</p>
            <h1 ref={titre} id="su-tar-titre" className="su-display su-tar__titre">
              Choisissez ce qu’on empile.
            </h1>
            <p className="su-tar__ligne">Un type, des fonctions, des options : le plancher se recalcule à chaque choix, et part avec vous vers le devis.</p>
          </header>
          <div className="su-tar__conf">
            <Configurateur initiale={initiale} />
          </div>
        </div>
      </section>

      <section className="su-tar__offres" aria-labelledby="su-tar-offres">
        <div className="su-tar__grille">
          <h2 id="su-tar-offres" className="su-display su-tar__h2">
            Les quatre offres,
            <br />
            en entier.
          </h2>
          <ul className="su-tar__liste">
            {SITE.offres.map((o, k) => {
              const sc = OFFRES_SCENE.find((x) => x.id === o.id)!
              return (
                <li key={o.id} id={o.id}>
                  <Plaque as="article" className="su-tar__offre" aria-labelledby={`su-tar-${o.id}`}>
                    <p className="su-mono su-tar__num">0{k + 1}</p>
                    <h3 id={`su-tar-${o.id}`} className="su-tar__nom">
                      {o.nom}
                    </h3>
                    <p className="su-tar__prix">
                      <Cadran valeur={o.aPartirDe} prefixe="à partir de" suffixe="€" />
                    </p>
                    <ul className="su-tar__inclus" aria-label="Inclus">
                      {o.inclus.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                    <Fiche lignes={sc.fiche} className="su-tar__fiche" />
                    <Action href={`/contact?c=${encodeURIComponent(`t=${o.id}`)}`} variante="contour" mot="Devis">
                      Demander un devis
                    </Action>
                  </Plaque>
                </li>
              )
            })}
          </ul>
          <aside className="su-tar__supplements" aria-labelledby="su-tar-sup">
            <h3 id="su-tar-sup" className="su-mono">
              En supplément
            </h3>
            <dl className="su-tar__sup-liste">
              <div>
                <dt>Révision au-delà des révisions incluses</dt>
                <dd className="su-tabular">{SITE.supplements.revision}</dd>
              </div>
              <div>
                <dt>Page supplémentaire</dt>
                <dd className="su-tabular">{SITE.supplements.pageSupplementaire} €</dd>
              </div>
              <div>
                <dt>Retrait de la mention « Réalisé par Stackup Agency »</dt>
                <dd className="su-tabular">{SITE.supplements.retraitMention} €</dd>
              </div>
            </dl>
            <p className="su-tar__mention su-mono">
              {SITE.mentions.tva}. Devis valable {SITE.mentions.devisValable}.
            </p>
          </aside>
        </div>
      </section>

      <section className="su-tar__maint" aria-labelledby="su-tar-maint">
        <div className="su-tar__grille">
          <h2 id="su-tar-maint" className="su-display su-tar__h2">
            La maintenance,
            <br />
            si vous la voulez.
          </h2>
          <ul className="su-tar__plans">
            {SITE.maintenance.map((m, k) => (
              <li key={m.id}>
                <Plaque as="article" className="su-tar__plan" data-plan={m.id}>
                  <p className="su-mono su-tar__num">0{k + 1}</p>
                  <h3 className="su-tar__nom">{m.nom}</h3>
                  <p className="su-tar__prix">
                    <Cadran valeur={m.prix} suffixe="€/mois" />
                  </p>
                  <ul className="su-tar__inclus">
                    {MAINTENANCE_LIGNES.filter((l) => l.plans[k]).map((l) => (
                      <li key={l.nom}>{l.nom}</li>
                    ))}
                  </ul>
                </Plaque>
              </li>
            ))}
          </ul>
          <table className="su-tar__table su-mono">
            <caption className="sr-only">Comparaison des plans de maintenance</caption>
            <thead>
              <tr>
                <th scope="col">Inclus</th>
                {SITE.maintenance.map((m) => (
                  <th key={m.id} scope="col">
                    {m.nom}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MAINTENANCE_LIGNES.map((l) => (
                <tr key={l.nom}>
                  <th scope="row">{l.nom}</th>
                  {l.plans.map((p, k) => (
                    <td key={k} aria-label={p ? 'inclus' : 'non inclus'}>
                      {p ? '●' : '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="su-tar__final">
            <span className="su-display su-tar__final-titre">Un devis, pas une estimation.</span>
            <span>Tout ce que vous avez empilé ci-dessus arrive pré-rempli dans le formulaire.</span>
            <Action href="/contact" mot="Devis">
              Recevoir un devis
            </Action>
          </p>
        </div>
      </section>
    </main>
  )
}
