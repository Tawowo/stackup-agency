'use client'
/**
 * /realisations — LA GALERIE. Un hall d'exposition traversé au scroll : la
 * section est épinglée, sa progression (scrub pur) fait avancer le travelling
 * de la scène (`travel`). Le projet en face est présenté en HTML à gauche
 * (nom, type, « Démo », actions). Clic sur un écran 3D ou sur « Voir la fiche » :
 * l'écran grandit jusqu'à la place de la capture dans la fiche (élément
 * partagé), puis la fiche s'ouvre.
 */
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import StackFrame from '@/webgl/StackFrame'
import { useScene } from '@/webgl/store'
import { gsap, ScrollTrigger, initGsap } from '@/lib/gsap'
import Action from '@/components/ui/Action'
import { PROJETS } from './projets'
import './galerie.css'

/** Rectangle cible de la capture dans la fiche (hero) — partagé avec la fiche. */
export function rectFiche() {
  const W = window.innerWidth
  const l = Math.min(1200, W - 48)
  return { x: (W - l) / 2, y: W < 768 ? 150 : 190, w: l, h: l * (558 / 1200) }
}

export default function Hall() {
  const section = useRef<HTMLElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const [courant, setCourant] = useState(0)
  const router = useRouter()
  const n = PROJETS.length

  // La scène : la Galerie, en perspective, lumière de nuit.
  useEffect(() => {
    initGsap()
    const el = section.current
    const st = scene.current
    if (!el || !st) return
    const s = useScene.getState()
    s.setMoment('galerie')
    s.setMonde('galerie')
    s.setTravel(0)
    s.setNuit(1)
    s.setScrub(false)
    s.setPair('logo', null)
    s.setProjection(0)
    s.setPose({ x: 0, y: 0 })
    const reduit = s.reduced
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * (n - 1) * 0.85)}`,
        pin: reduit ? false : st,
        scrub: true,
        onUpdate: (self) => {
          const t = self.progress
          useScene.getState().setTravel(t)
          const k = Math.round(t * (n - 1))
          setCourant(k)
          useScene.getState().setAccent(PROJETS[k]!.accent)
        },
      })
    }, el)
    return () => {
      ctx.revert()
      const sc = useScene.getState()
      sc.setMonde('fabrique')
      sc.setTravel(0)
      sc.setAccent('#F69106')
      sc.setSurvol(-1)
    }
  }, [n])

  // Élément partagé : l'écran (3D ou capture HTML) grandit jusqu'à sa place dans la fiche.
  useEffect(() => {
    const ouvrir = (slug: string, rect: { x: number; y: number; w: number; h: number }) => {
      const p = PROJETS.find((q) => q.slug === slug)
      if (!p) return
      router.prefetch(`/realisations/${slug}`)
      const img = document.createElement('img')
      img.src = p.capture
      img.alt = ''
      img.className = 'su-gal__partage'
      Object.assign(img.style, { left: `${rect.x}px`, top: `${rect.y}px`, width: `${rect.w}px`, height: `${rect.h}px` })
      document.body.appendChild(img)
      const cible = rectFiche()
      const reduit = useScene.getState().reduced
      gsap.to(img, {
        left: cible.x,
        top: cible.y,
        width: cible.w,
        height: cible.h,
        duration: reduit ? 0 : 0.75,
        ease: 'power3.inOut',
        onComplete: () => {
          sessionStorage.setItem('su-partage', slug)
          router.push(`/realisations/${slug}`)
          // L'image reste jusqu'à ce que la fiche affiche la sienne (elle la retire).
          setTimeout(() => img.remove(), 2500)
        },
      })
    }
    const ecoute = (e: Event) => {
      const d = (e as CustomEvent<{ slug: string; rect: { x: number; y: number; w: number; h: number } }>).detail
      ouvrir(d.slug, d.rect)
    }
    window.addEventListener('su-galerie', ecoute)
    ;(window as unknown as { __suOuvrir?: typeof ouvrir }).__suOuvrir = ouvrir
    return () => window.removeEventListener('su-galerie', ecoute)
  }, [router])

  const p = PROJETS[courant]!
  const voirFiche = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey) return
    e.preventDefault()
    // Depuis le bouton : l'élément partagé part du centre de l'écran courant.
    const W = window.innerWidth
    const H = window.innerHeight
    const w = Math.min(760, W * 0.62)
    const ouvrir = (window as unknown as { __suOuvrir?: (s: string, r: { x: number; y: number; w: number; h: number }) => void }).__suOuvrir
    if (ouvrir) ouvrir(p.slug, { x: W < 768 ? (W - w) / 2 : W * 0.42, y: H * 0.28, w, h: w * (558 / 1200) })
    else router.push(`/realisations/${p.slug}`)
  }

  return (
    <>
      <section className="su-gal__intro" data-moment="galerie-intro" data-nuit="1" aria-labelledby="su-gal-titre">
        <div className="su-gal__intro-grille">
          <div className="su-gal__intro-logo" aria-hidden="true">
            <StackFrame className="su-gal__cadre" />
          </div>
          <div>
            <p className="su-mono su-gal__etiquette">Réalisations — la galerie</p>
            <h1 id="su-gal-titre" className="su-display su-gal__titre">
              Entrez dans
              <br />
              la galerie.
            </h1>
            <p className="su-gal__ligne">
              Sept démonstrations complètes, une par métier. Ce sont des entreprises fictives et des fonctionnalités réelles : chaque démo s’ouvre, se teste, se manipule. Avancez dans le hall, l’écran que vous approchez s’allume.
            </p>
          </div>
        </div>
      </section>
      <section ref={section} className="su-gal" data-moment="galerie" data-nuit="1" aria-label="Le hall des démonstrations">
        <div ref={scene} className="su-gal__scene">
          <div className="su-gal__cartel" aria-live="polite">
            <p className="su-mono su-gal__compteur su-tabular">
              {String(courant + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
            </p>
            <p className="su-mono su-gal__demo" style={{ color: p.accent }}>
              Démo · {p.filtre}
            </p>
            <h2 className="su-display su-gal__nom">{p.nom}</h2>
            <p className="su-gal__type">{p.type}</p>
            <p className="su-gal__desc">{p.description}</p>
            <div className="su-gal__actions">
              <Action href={`/realisations/${p.slug}`} onClick={voirFiche}>
                Voir la fiche
              </Action>
              <Action href={p.url} variante="contour">
                Ouvrir la démo
              </Action>
            </div>
            <ol className="su-gal__jalons" aria-hidden="true">
              {PROJETS.map((q, k) => (
                <li key={q.slug} data-actif={k === courant ? '1' : '0'} style={{ '--accent': q.accent } as React.CSSProperties} />
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section className="su-gal__liste" data-moment="galerie-liste" data-nuit="1" aria-labelledby="su-gal-liste">
        <h2 id="su-gal-liste" className="su-display su-gal__liste-titre">
          Toutes les démonstrations
        </h2>
        <ul className="su-gal__grille">
          {PROJETS.map((q) => (
            <li key={q.slug} className="su-gal__carte">
              <a href={`/realisations/${q.slug}`} className="su-gal__lien">
                <img src={q.capture} alt={`Capture de la démo ${q.nom}`} width={1200} height={558} loading="lazy" />
                <span className="su-mono su-gal__demo" style={{ color: q.accent }}>
                  Démo · {q.filtre}
                </span>
                <span className="su-gal__carte-nom">{q.nom}</span>
                <span className="su-gal__type">{q.type}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="su-gal__fin">
          <p className="su-display su-gal__fin-titre">Votre métier n’est pas dans la liste ?</p>
          <p className="su-gal__ligne">On vous fabrique une démo avant de vous demander quoi que ce soit.</p>
          <Action href="/contact?objet=demo">Demander ma démo</Action>
        </div>
      </section>
    </>
  )
}
