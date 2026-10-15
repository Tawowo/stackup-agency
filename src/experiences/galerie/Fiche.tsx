'use client'
/**
 * FICHE PROJET — /realisations/[slug]. Un ordinateur et un téléphone montrent les VRAIES captures
 * d'écran du projet (chacune remplit exactement l'écran, du haut vers le bas). Derrière, la pile
 * forme le logo teinté de l'accent du projet. Puis le dossier : ce que le projet démontre, les
 * fonctionnalités, le statut et le lien vers le site ou la démo.
 */
import { useEffect } from 'react'
import Link from 'next/link'
import { useScene } from '@/webgl/store'
import { initGsap } from '@/lib/gsap'
import Action from '@/components/ui/Action'
import Fiche2 from '@/components/ui/Fiche'
import { Duo } from '@/components/appareils/Appareils'
import type { Projet } from './projets'
import './fiche.css'

export default function Fiche({ projet: p, suivant }: { projet: Projet; suivant: { slug: string; nom: string } }) {
  useEffect(() => {
    initGsap()
    const s = useScene.getState()
    s.setMoment('fiche')
    s.setMonde('fabrique')
    s.setNuit(1)
    s.setAccent(p.accent)
    s.setScrub(false)
    s.setParams({ glisse: 0, largeur: 30, retard: 0.25, flash: 0, arc: 0.6 })
    s.setProjection(1)
    s.setPose({ x: 0, y: 0 })
    if (!s.reduced) s.setLayout('logo')
    return () => {
      useScene.getState().setAccent('#F69106')
    }
  }, [p.accent])

  const enLigne = p.statut === 'En ligne'
  return (
    <article className="su-fic" data-moment="fiche" data-nuit="1" style={{ '--accent': p.accent } as React.CSSProperties}>
      <header className="su-fic__tete">
        <nav className="su-mono su-fic__ariane" aria-label="Fil d’Ariane">
          <Link href="/realisations">Réalisations</Link> <span aria-hidden="true">/</span> <span>{p.nom}</span>
        </nav>
        <p className="su-mono su-fic__demo" data-statut={enLigne ? 'ligne' : 'dev'}>
          {p.statut}
        </p>
        <h1 className="su-display su-fic__titre">{p.nom}</h1>
        <p className="su-fic__type">{p.type}</p>
      </header>
      <div className="su-fic__visuel">
        <Duo projet={p} prioritaire />
      </div>
      <div className="su-fic__actions">
        <Action href={p.url}>{p.action}</Action>
        <Action href="/contact?a=appel" variante="contour">
          Un projet comme celui-ci
        </Action>
      </div>
      <div className="su-fic__corps">
        <section className="su-fic__bloc">
          <h2 className="su-fic__h2">Le projet</h2>
          <p className="su-fic__texte">{p.description}</p>
          <ul className="su-fic__etapes">
            {p.atouts.map((a) => (
              <li key={a.titre}>
                <strong>{a.titre}.</strong> {a.texte}
              </li>
            ))}
          </ul>
        </section>
        <aside className="su-fic__aside">
          <Fiche2
            lignes={[
              { cle: 'Type', valeur: p.type },
              { cle: 'Statut', valeur: p.statut },
              { cle: enLigne ? 'Site' : 'Démo', valeur: p.url.replace(/^https?:\/\//, '').replace(/\/$/, '') },
            ]}
          />
          {p.note && <p className="su-fic__note">{p.note}</p>}
        </aside>
        <section className="su-fic__bloc su-fic__bloc--large">
          <h2 className="su-fic__h2">{enLigne ? 'Ce que contient le site' : 'Ce que fait le logiciel'}</h2>
          <ul className="su-fic__fonctions">
            {p.fonctionnalites.map((f, i) => (
              <li key={f} className="su-plaque">
                <span className="su-mono">{String(i + 1).padStart(2, '0')}</span>
                {f}
              </li>
            ))}
          </ul>
        </section>
      </div>
      <footer className="su-fic__suite">
        <Link href={`/realisations/${suivant.slug}`} className="su-fic__suivant">
          <span className="su-mono">Réalisation suivante</span>
          <span className="su-display">{suivant.nom} →</span>
        </Link>
      </footer>
    </article>
  )
}
