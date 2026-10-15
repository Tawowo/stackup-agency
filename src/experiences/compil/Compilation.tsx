'use client'
/**
 * /services — DU CODE AU PIXEL. Quatre compilations : à gauche, de vraies
 * lignes de code s'écrivent au rythme du scroll ; à droite, au même moment,
 * la pile se réassemble plaque par plaque en l'interface que ce code produit.
 * Chaque section part de la forme de la précédente (jamais de saut). Survoler
 * ou focaliser une ligne isole les plaques qu'elle produit : l'inspecteur.
 */
import { useEffect, useRef, useState } from 'react'
import StackFrame from '@/webgl/StackFrame'
import { MORPH } from '@/webgl/morph'
import { useScene } from '@/webgl/store'
import type { LayoutName } from '@/webgl/layouts'
import { gsap, ScrollTrigger, initGsap } from '@/lib/gsap'
import { SITE } from '@/config/site'
import { PRIX_PUBLICS } from '@/config/prix-publics.generated'
import Action from '@/components/ui/Action'
import Cadran from '@/components/ui/Cadran'
import { PROGRAMMES, type Programme } from './programmes'
import './compil.css'

function Section({ prog, avant, index }: { prog: Programme; avant: LayoutName; index: number }) {
  const section = useRef<HTMLElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(0)
  const offre = SITE.offres.find((o) => o.id === prog.offre)!
  const moment = `compil-${index}`

  useEffect(() => {
    initGsap()
    const el = section.current
    const st = scene.current
    if (!el || !st) return
    const reduit = useScene.getState().reduced
    const prendre = () => {
      const s = useScene.getState()
      if (s.moment === moment) return
      s.setMoment(moment)
      s.setMonde('fabrique')
      s.setParams({ retard: 0.6, arc: 0.3, flash: 1 })
      s.setProjection(0.35)
      s.setPose({ x: 0.06, y: -0.22 })
      s.setScrub(true)
      if (reduit) s.setPair(prog.forme, null)
      else s.setPair(avant, prog.forme)
    }
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * 1.4)}`,
        pin: reduit ? false : st,
        scrub: true,
        onEnter: prendre,
        onEnterBack: prendre,
        onUpdate: (self) => {
          prendre()
          const q = reduit ? 1 : self.progress
          setP(q)
          // Le code s'écrit sur 0 → 0,8 ; la forme se compile sur 0,1 → 0,95.
          if (!reduit) MORPH.value = Math.min(1, Math.max(0, (q - 0.1) / 0.85))
        },
      })
    }, el)
    return () => ctx.revert()
  }, [avant, prog.forme, moment])

  const n = prog.lignes.length
  const ecrites = p * 0.8 * n * 1.25
  return (
    <section ref={section} className="su-cmp" data-moment={moment} data-nuit="1" aria-labelledby={`su-cmp-${prog.slug}`}>
      <div ref={scene} className="su-cmp__scene">
        <div className="su-cmp__grille">
          <header className="su-cmp__tete">
            <p className="su-mono su-cmp__num">0{index + 1} — compilation</p>
            <h2 id={`su-cmp-${prog.slug}`} className="su-display su-cmp__titre">
              {prog.titre}
            </h2>
            <p className="su-cmp__ligne">{prog.ligne}</p>
          </header>
          <figure className="su-cmp__code" aria-label={`Code source : ${prog.fichier}`}>
            <figcaption className="su-mono su-cmp__fichier">
              <span aria-hidden="true">● ● ●</span> {prog.fichier}
            </figcaption>
            <pre>
              {prog.lignes.map((l, i) => {
                const t = Math.min(1, Math.max(0, ecrites - i))
                return (
                  <code
                    key={i}
                    className="su-cmp__l"
                    data-ecrite={t >= 1 ? '1' : '0'}
                    data-produit={l.groupe >= 0 ? '1' : '0'}
                    style={{ '--t': t.toFixed(3) } as React.CSSProperties}
                    tabIndex={l.groupe >= 0 ? 0 : -1}
                    onMouseEnter={() => l.groupe >= 0 && useScene.getState().setIsolate(l.groupe)}
                    onMouseLeave={() => useScene.getState().setIsolate(-1)}
                    onFocus={() => l.groupe >= 0 && useScene.getState().setIsolate(l.groupe)}
                    onBlur={() => useScene.getState().setIsolate(-1)}
                  >
                    <span className="su-cmp__n" aria-hidden="true">
                      {String(i + 1).padStart(2, ' ')}
                    </span>
                    {l.code || ' '}
                  </code>
                )
              })}
            </pre>
            <p className="su-mono su-cmp__statut" data-fini={p > 0.95 ? '1' : '0'}>
              {p > 0.95 ? '✓ compilé — survolez une ligne pour voir ce qu’elle produit' : '… compilation'}
            </p>
          </figure>
          <div className="su-cmp__rendu" aria-hidden="true">
            <StackFrame className="su-cmp__cadre" />
          </div>
          <div className="su-cmp__offre">
            <Cadran valeur={offre.aPartirDe} prefixe="à partir de" suffixe="€" className="su-cmp__cadran" />
            <Action href={`/services/${prog.slug}`} variante="contour">
              Le détail : {offre.nom.toLowerCase()}
            </Action>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Compilation() {
  useEffect(() => {
    const s = useScene.getState()
    s.setMoment('services-intro')
    s.setNuit(1)
    s.setScrub(false)
    s.setParams({ retard: 0.25, flash: 0, arc: 0.6 })
    if (!s.reduced) s.setPair('empile', null)
    return () => {
      const sc = useScene.getState()
      sc.setIsolate(-1)
      sc.setParams({ retard: 0.25, flash: 0, arc: 0.6, isoPush: 0.35, isoDim: 0.65 })
    }
  }, [])
  return (
    <>
      <section className="su-cmp__intro" data-moment="services-intro" data-nuit="1" aria-labelledby="su-cmp-titre">
        <div className="su-cmp__intro-grille">
          <div className="su-cmp__intro-texte">
            <p className="su-mono su-cmp__num">Services</p>
            <h1 id="su-cmp-titre" className="su-display su-cmp__h1">
              Du code
              <br />
              au pixel.
            </h1>
            <p className="su-cmp__ligne">
              Tout ce qu’on fabrique est écrit à la main, ligne par ligne, puis compilé en ce que vos clients voient. Descendez : quatre programmes vont se compiler sous vos yeux.
            </p>
          </div>
          <div className="su-cmp__intro-pile" aria-hidden="true">
            <StackFrame className="su-cmp__intro-cadre" />
          </div>
        </div>
      </section>
      {PROGRAMMES.map((prog, i) => (
        <Section key={prog.slug} prog={prog} index={i} avant={i === 0 ? 'empile' : PROGRAMMES[i - 1]!.forme} />
      ))}
      <section className="su-cmp__fin" data-moment="services-fin" data-nuit="0" aria-labelledby="su-cmp-fin">
        <h2 id="su-cmp-fin" className="su-display su-cmp__fin-titre">
          Et autour du code
        </h2>
        <ul className="su-cmp__autour">
          <li className="su-plaque">
            <h3>Maintenance</h3>
            <p>Hébergement, mises à jour, sauvegardes, corrections : un abonnement composé selon vos besoins, à partir d’environ {PRIX_PUBLICS.abonnementMin} € par mois, sans engagement, préavis d’un mois.</p>
            <a href="/tarifs?e=eyJzIjo5fQ#estimer">Composer mon abonnement</a>
          </li>
          <li className="su-plaque">
            <h3>Rédaction</h3>
            <p>Articles et pages écrits pour vos clients et pour Google, relus avec vous avant publication.</p>
            <a href="/tarifs?e=eyJzIjo2fQ#estimer">Estimer la rédaction</a>
          </li>
          <li className="su-plaque">
            <h3>Démo avant signature</h3>
            <p>Votre future page d’accueil, à votre image, avant tout engagement : {PRIX_PUBLICS.demo} €. Vous jugez sur pièce.</p>
            <a href="/contact?a=demo">La demander</a>
          </li>
        </ul>
      </section>
    </>
  )
}
