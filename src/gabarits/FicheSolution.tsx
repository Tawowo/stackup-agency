'use client'
/**
 * FICHE OUTIL — /solutions/[slug]. Le réseau des modules en fond, le module
 * de la fiche allumé. Interaction propre : la règle « avant / avec l'outil »,
 * un curseur qu'on fait glisser (ou flèches) et qui transforme, ligne par
 * ligne, chaque problème du quotidien en la fonction qui le règle.
 */
import { useEffect, useState } from 'react'
import Link from 'next/link'
import StackFrame from '@/webgl/StackFrame'
import { useScene } from '@/webgl/store'
import Action from '@/components/ui/Action'
import Cadran from '@/components/ui/Cadran'
import Accordeon from '@/components/editorial/Accordeon'
import { SITE } from '@/config/site'
import './fiche-solution.css'

export interface DonneesSolution {
  slug: string
  nom: string
  intro: string
  problemes: string[]
  fonctionnalites: string[]
  avantages: string[]
  contexte: string
  faq: { q: string; a: string }[]
  metiers: { slug: string; nom: string }[]
  module: number
  voisines: { slug: string; nom: string }[]
}

export default function FicheSolution({ s }: { s: DonneesSolution }) {
  const [regle, setRegle] = useState(0)
  const prix = SITE.offres.find((o) => o.id === 'outil')!.aPartirDe
  useEffect(() => {
    const sc = useScene.getState()
    sc.setMoment(`solution-${s.slug}`)
    sc.setMonde('fabrique')
    sc.setNuit(1)
    sc.setScrub(false)
    sc.setParams({ retard: 0.25, flash: 0, arc: 0.6, modules: 12, isoPush: 0, isoDim: 0.42 })
    sc.setProjection(0.6)
    sc.setPose({ x: 0.12, y: -0.1 })
    if (!sc.reduced) sc.setLayout('machines')
    sc.setIsolate(s.module >= 0 ? s.module + 1 : -1)
    return () => useScene.getState().setIsolate(-1)
  }, [s.slug, s.module])

  const n = Math.max(s.problemes.length, 1)
  const lignes = s.problemes.map((p, i) => ({ avant: p, apres: s.fonctionnalites[i] ?? s.avantages[i] ?? '' }))
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
            <Cadran valeur={prix} prefixe="à partir de" suffixe="€" className="su-fso__cadran" />
          </p>
          <div className="su-fso__actions">
            <Action href={`/contact?objet=${encodeURIComponent(s.nom)}`}>Parler de mon outil</Action>
            <Action href="/solutions" variante="contour">
              Assembler plusieurs modules
            </Action>
          </div>
        </div>
        <div className="su-fso__scene" aria-hidden="true">
          <StackFrame className="su-fso__cadre" />
        </div>
      </div>
      <section className="su-fso__regle" aria-labelledby="su-fso-regle">
        <h2 id="su-fso-regle" className="su-fso__h2">
          Avant, et avec l’outil
        </h2>
        <label className="su-fso__curseur">
          <span className="su-mono">Avant</span>
          <input type="range" min={0} max={n} step={1} value={regle} onChange={(e) => setRegle(Number(e.target.value))} aria-valuetext={`${regle} problème${regle > 1 ? 's' : ''} réglé${regle > 1 ? 's' : ''} sur ${n}`} />
          <span className="su-mono">Avec l’outil</span>
        </label>
        <ul className="su-fso__lignes">
          {lignes.map((l, i) => (
            <li key={l.avant} data-regle={i < regle ? '1' : '0'}>
              <span className="su-fso__avant">{l.avant}</span>
              <span className="su-fso__apres">{l.apres}</span>
            </li>
          ))}
        </ul>
      </section>
      <div className="su-fso__corps">
        <section>
          <h2 className="su-fso__h2">Ce que fait l’outil</h2>
          <ul className="su-fso__fonctions">
            {s.fonctionnalites.map((f, i) => (
              <li key={f} className="su-plaque">
                <span className="su-mono">{String(i + 1).padStart(2, '0')}</span>
                {f}
              </li>
            ))}
          </ul>
        </section>
        <section className="su-fso__situation">
          <h2 className="su-fso__h2">Une situation type</h2>
          <p>{s.contexte}</p>
          <h3 className="su-fso__h3">Ce qui change pour vous</h3>
          <ul className="su-fso__avantages">
            {s.avantages.map((a) => (
              <li key={a}>{a}</li>
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
      <nav className="su-fso__voisines" aria-label="Outils qui se branchent bien avec celui-ci">
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
