'use client'
/**
 * FICHE OUTIL — /solutions/[slug]. Un module du catalogue de l'outil de gestion. Si le module existe
 * déjà dans le logiciel réel (Artibox, en développement), un ordinateur montre ses vraies captures
 * et la démo est à un clic ; sinon la fiche dit franchement que le module se construit sur mesure.
 */
import { useEffect } from 'react'
import Link from 'next/link'
import StackFrame from '@/webgl/StackFrame'
import { useScene } from '@/webgl/store'
import Action from '@/components/ui/Action'
import Cadran from '@/components/ui/Cadran'
import Accordeon from '@/components/editorial/Accordeon'
import { Portable } from '@/components/appareils/Appareils'
import { PROJETS } from '@/experiences/galerie/projets'
import './fiche-solution.css'

export interface DonneesSolution {
  slug: string
  nom: string
  intro: string
  situations: string[]
  fonctionnalites: string[]
  dansLaDemo: boolean
  /** Modules du catalogue (Excel) : code, nom et ce que le module fait. */
  modules: { code: string; libelle: string; description: string }[]
  /** « À partir de » du moteur : socle de l'outil + ces modules. */
  prix: number
  faq: { q: string; a: string }[]
  metiers: { slug: string; nom: string }[]
  voisines: { slug: string; nom: string }[]
}

const ARTIBOX = PROJETS.find((p) => p.slug === 'logiciel-gestion-artisans')!

export default function FicheSolution({ s }: { s: DonneesSolution }) {
  useEffect(() => {
    const sc = useScene.getState()
    sc.setMoment(`solution-${s.slug}`)
    sc.setMonde('fabrique')
    sc.setNuit(1)
    sc.setScrub(false)
    sc.setParams({ retard: 0.25, flash: 0, arc: 0.6, glisse: 0, largeur: 30 })
    sc.setProjection(0.6)
    sc.setPose({ x: 0.12, y: -0.1 })
    if (!sc.reduced) sc.setLayout('logo')
  }, [s.slug])

  return (
    <article className="su-fso" data-moment={`solution-${s.slug}`} data-nuit="1">
      <div className="su-fso__hero">
        <div className="su-fso__texte">
          <nav className="su-mono su-fso__ariane" aria-label="Fil d’Ariane">
            <Link href="/solutions">Outils de gestion</Link> <span aria-hidden="true">/</span> <span>{s.nom}</span>
          </nav>
          <h1 className="su-display su-fso__titre">{s.nom}</h1>
          <p className="su-fso__intro">{s.intro}</p>
          <p className="su-fso__prix">
            <Cadran valeur={s.prix} prefixe="outil complet à partir de" suffixe="€" className="su-fso__cadran" />
          </p>
          <div className="su-fso__actions">
            {s.dansLaDemo ? <Action href={ARTIBOX.url}>Tester la démo</Action> : <Action href={`/contact?objet=${encodeURIComponent(s.nom)}`}>Parler de mon outil</Action>}
            <Action href="/solutions" variante="contour">
              Voir le logiciel et tous les modules
            </Action>
          </div>
        </div>
        <div className="su-fso__scene">
          {s.dansLaDemo ? (
            <Portable ecran={ARTIBOX.bureau} nom={ARTIBOX.nom} prioritaire />
          ) : (
            <div aria-hidden="true" className="su-fso__cadre-zone">
              <StackFrame className="su-fso__cadre" />
            </div>
          )}
        </div>
      </div>
      <p className="su-fso__statut" data-demo={s.dansLaDemo ? '1' : '0'}>
        {s.dansLaDemo
          ? 'Ce module existe déjà dans Artibox, le logiciel de gestion de Stackup (en développement) : vous pouvez le tester en démo.'
          : 'Ce module se construit sur mesure à partir du catalogue de l’outil. Il n’est pas dans la démo actuelle : nous le préparons pour votre activité avant le devis.'}
      </p>
      <div className="su-fso__corps">
        <section>
          <h2 className="su-fso__h2">Vous reconnaissez-vous ?</h2>
          <ul className="su-fso__avantages">
            {s.situations.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="su-fso__h2">Ce que fait le module</h2>
          <ul className="su-fso__fonctions">
            {s.fonctionnalites.map((f, i) => (
              <li key={f} className="su-plaque">
                <span className="su-mono">{String(i + 1).padStart(2, '0')}</span>
                {f}
              </li>
            ))}
          </ul>
        </section>
        <section className="su-fso__catalogue">
          <h2 className="su-fso__h2">Dans le catalogue de l’outil</h2>
          <ul className="su-fso__modules">
            {s.modules.map((m) => (
              <li key={m.code}>
                <span className="su-mono">{m.code}</span>
                <b>{m.libelle}</b>
                {m.description && <span>{m.description}</span>}
              </li>
            ))}
          </ul>
        </section>
        <section className="su-fso__faq">
          <h2 className="su-fso__h2">Questions fréquentes</h2>
          <Accordeon questions={s.faq.map((f) => ({ q: f.q, r: f.a }))} />
        </section>
        {s.metiers.length > 0 && (
          <section>
            <h2 className="su-fso__h2">Pour quels métiers</h2>
            <ul className="su-fso__metiers">
              {s.metiers.map((m) => (
                <li key={m.slug}>
                  <Link href={`/creation-site-internet/${m.slug}`}>{m.nom}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
      <nav className="su-fso__voisines" aria-label="Modules qui se branchent bien avec celui-ci">
        {s.voisines.map((v) => (
          <Link key={v.slug} href={`/solutions/${v.slug}`} className="su-plaque">
            <span className="su-mono">Se branche avec</span>
            {v.nom}
          </Link>
        ))}
      </nav>
    </article>
  )
}
