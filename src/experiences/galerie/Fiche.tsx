'use client'
/**
 * FICHE PROJET — /realisations/[slug]. La capture occupe exactement la place
 * où l'écran de la galerie a fini sa course (élément partagé) ; derrière
 * elle, la pile forme un cadre de plaques (layout `pellicule`) teinté de
 * l'accent du projet. Puis le dossier : contexte, ce qui a été construit,
 * fonctionnalités, comment tester, accès.
 */
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import StackFrame from '@/webgl/StackFrame'
import { useScene } from '@/webgl/store'
import { gsap, initGsap } from '@/lib/gsap'
import Action from '@/components/ui/Action'
import Fiche2 from '@/components/ui/Fiche'
import type { Projet } from './projets'
import './fiche.css'

export default function Fiche({ projet: p, suivant }: { projet: Projet; suivant: { slug: string; nom: string } }) {
  const capture = useRef<HTMLImageElement>(null)
  useEffect(() => {
    initGsap()
    const s = useScene.getState()
    s.setMoment('fiche')
    s.setMonde('fabrique')
    s.setNuit(1)
    s.setAccent(p.accent)
    s.setScrub(false)
    s.setParams({ glisse: 0, largeur: 30, retard: 0.25, flash: 0, arc: 0.6 })
    s.setProjection(0.15)
    s.setPose({ x: 0.04, y: -0.06 })
    if (!s.reduced) s.setLayout('pellicule')
    // L'élément partagé de la galerie finit sa course sur la capture réelle
    // (recalage FLIP), puis s'efface : la capture prend le relais sans saut.
    const img = capture.current
    const partage = document.querySelector<HTMLElement>('.su-gal__partage')
    const retirer = () => {
      document.querySelectorAll('.su-gal__partage').forEach((e) => e.remove())
      if (img) img.style.visibility = ''
    }
    if (partage && img) {
      img.style.visibility = 'hidden'
      const r = img.getBoundingClientRect()
      gsap.to(partage, { left: r.left, top: r.top, width: r.width, height: r.height, duration: s.reduced ? 0 : 0.45, ease: 'power3.inOut', onComplete: () => (img.complete ? retirer() : img.addEventListener('load', retirer, { once: true })) })
    }
    const filet = setTimeout(retirer, 1500)
    return () => {
      clearTimeout(filet)
      useScene.getState().setAccent('#F69106')
    }
  }, [p.accent])

  return (
    <article className="su-fic" data-moment="fiche" data-nuit="1" style={{ '--accent': p.accent } as React.CSSProperties}>
      <header className="su-fic__tete">
        <nav className="su-mono su-fic__ariane" aria-label="Fil d’Ariane">
          <Link href="/realisations">Réalisations</Link> <span aria-hidden="true">/</span> <span>{p.nom}</span>
        </nav>
        <p className="su-mono su-fic__demo">Démo · {p.filtre}</p>
        <h1 className="su-display su-fic__titre">{p.nom}</h1>
        <p className="su-fic__type">{p.type}</p>
      </header>
      <div className="su-fic__visuel">
        <div className="su-fic__cadre-zone" aria-hidden="true">
          <StackFrame className="su-fic__cadre" />
        </div>
        <img ref={capture} className="su-fic__capture" src={p.capture} alt={`Capture d’écran de la démo ${p.nom}`} width={1200} height={558} />
      </div>
      <div className="su-fic__actions">
        <Action href={p.url}>Ouvrir la démo</Action>
        <Action href="/contact?objet=demo" variante="contour">
          Une démo pour mon métier
        </Action>
      </div>
      <div className="su-fic__corps">
        <section className="su-fic__bloc">
          <h2 className="su-fic__h2">Le projet</h2>
          <p className="su-fic__texte">{p.contexte ?? p.description}</p>
          {p.construit && (
            <>
              <h3 className="su-fic__h3">Ce qui a été construit</h3>
              <ol className="su-fic__etapes">
                {p.construit.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ol>
            </>
          )}
        </section>
        <aside className="su-fic__aside">
          <Fiche2
            lignes={[
              { cle: 'Type', valeur: p.type },
              { cle: 'Statut', valeur: 'Démonstration (entreprise fictive)' },
              { cle: 'Étiquettes', valeur: p.tags.join(', ') },
              { cle: 'Code', valeur: 'Propriétaire' },
            ]}
          />
          {p.acces && (
            <div className="su-plaque su-fic__acces">
              <p className="su-mono">Accès de démonstration</p>
              {p.acces.motDePasse && (
                <p>
                  Mot de passe : <code>{p.acces.motDePasse}</code>
                </p>
              )}
              {p.acces.note && <p className="su-fic__note">{p.acces.note}</p>}
            </div>
          )}
        </aside>
        <section className="su-fic__bloc su-fic__bloc--large">
          <h2 className="su-fic__h2">Fonctionnalités</h2>
          <ul className="su-fic__fonctions">
            {p.fonctionnalites.map((f, i) => (
              <li key={f} className="su-plaque">
                <span className="su-mono">{String(i + 1).padStart(2, '0')}</span>
                {f}
              </li>
            ))}
          </ul>
        </section>
        {p.tester && (
          <section className="su-fic__bloc su-fic__bloc--large">
            <h2 className="su-fic__h2">Comment la tester</h2>
            <ol className="su-fic__etapes">
              {p.tester.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ol>
          </section>
        )}
      </div>
      <footer className="su-fic__suite">
        <Link href={`/realisations/${suivant.slug}`} className="su-fic__suivant">
          <span className="su-mono">Démo suivante</span>
          <span className="su-display">{suivant.nom} →</span>
        </Link>
      </footer>
    </article>
  )
}
