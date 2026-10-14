'use client'
/**
 * LA BIBLIOTHÈQUE — les articles sont des couvertures posées sur une étagère,
 * qu'on feuillette : celle du centre est de face, les autres s'effacent en
 * perspective de chaque côté. Flèches, glissé, clavier, ou clic sur une
 * couverture voisine pour la ramener ; clic sur celle du centre pour la lire.
 * Les couvertures suivent le filtre (rayons, recherche) du kiosque.
 */
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Picto } from '@/components/maquettes/illustrations'
import './bibliotheque.css'

export interface Couverture {
  slug: string
  titre: string
  etiquette: string
  lecture: number
  rayon: string
}

const STYLE: Record<string, { teinte: string; picto: Parameters<typeof Picto>[0]['nom'] }> = {
  creation: { teinte: '#1f4c97', picto: 'engrenage' },
  seo: { teinte: '#9a4507', picto: 'loupe' },
  'seo-local': { teinte: '#2f6f5e', picto: 'accueil' },
  commerce: { teinte: '#7a2f55', picto: 'panier' },
  outils: { teinte: '#3d7f9e', picto: 'graphique' },
  restaurants: { teinte: '#b4532a', picto: 'couvert' },
  artisans: { teinte: '#8a5a2b', picto: 'marteau' },
  strategie: { teinte: '#4a4aa0', picto: 'dossier' },
  associations: { teinte: '#2a7d6a', picto: 'personnes' },
}

export default function Bibliotheque({ couvertures }: { couvertures: Couverture[] }) {
  const [courant, setCourant] = useState({ cle: '', i: 0 })
  const cle = couvertures.map((c) => c.slug).join('|')
  // L'index se remet à 0 quand le filtre change (la clé de la liste change).
  const i = courant.cle === cle ? Math.min(courant.i, Math.max(0, couvertures.length - 1)) : 0
  const aller = (k: number) => setCourant({ cle, i: Math.max(0, Math.min(couvertures.length - 1, k)) })
  const depart = useRef<number | null>(null)
  const zone = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = zone.current
    if (!el) return
    const key = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setCourant((c) => ({ cle, i: Math.min(couvertures.length - 1, (c.cle === cle ? c.i : 0) + 1) }))
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setCourant((c) => ({ cle, i: Math.max(0, (c.cle === cle ? c.i : 0) - 1) }))
      }
    }
    el.addEventListener('keydown', key)
    return () => el.removeEventListener('keydown', key)
  }, [cle, couvertures.length])

  if (!couvertures.length) return <p className="su-bib__vide">Aucun article ne correspond.</p>
  return (
    <div className="su-bib" ref={zone}>
      <div
        className="su-bib__scene"
        role="group"
        aria-roledescription="carrousel"
        aria-label="Les articles, à feuilleter"
        tabIndex={0}
        onPointerDown={(e) => (depart.current = e.clientX)}
        onPointerUp={(e) => {
          if (depart.current === null) return
          const dx = e.clientX - depart.current
          depart.current = null
          if (Math.abs(dx) > 40) aller(i + (dx < 0 ? 1 : -1))
        }}
      >
        {couvertures.map((c, k) => {
          const o = k - i
          const st = STYLE[c.rayon] ?? STYLE.creation!
          const dist = Math.abs(o)
          const centre = o === 0
          const contenu = (
            <>
              <span className="su-bib__dos" aria-hidden="true" />
              <span className="su-bib__tranche" aria-hidden="true" />
              <span className="su-bib__rayon su-mono">{c.etiquette}</span>
              <span className="su-bib__pic" aria-hidden="true">
                <Picto nom={st.picto} />
              </span>
              <span className="su-bib__titre">{c.titre}</span>
              <span className="su-bib__pied su-mono">{c.lecture} min de lecture</span>
            </>
          )
          // Éventail : le livre voisin se décale de 0,68 largeur, les suivants se serrent derrière (0,17 chacun).
          const x = centre ? 0 : Math.sign(o) * (0.68 + (dist - 1) * 0.17)
          const style = {
            '--x': x,
            '--r': centre ? 0 : -Math.sign(o) * 52,
            '--d': dist,
            '--teinte': st.teinte,
            zIndex: 20 - dist,
        
          } as React.CSSProperties
          return centre ? (
            <Link key={c.slug} href={`/blog/${c.slug}`} className="su-bib__livre" data-centre="1" style={style} aria-label={`Lire : ${c.titre}`}>
              {contenu}
            </Link>
          ) : (
            <button key={c.slug} type="button" className="su-bib__livre" style={style} tabIndex={dist > 4 ? -1 : 0} aria-label={`Ramener au centre : ${c.titre}`} onClick={() => aller(k)}>
              {contenu}
            </button>
          )
        })}
        <div className="su-bib__etagere" aria-hidden="true" />
      </div>
      <div className="su-bib__commandes">
        <button type="button" className="su-bib__fleche" onClick={() => aller(i - 1)} disabled={i === 0} aria-label="Article précédent">
          ←
        </button>
        <span className="su-mono su-bib__compte" aria-live="polite">
          {i + 1} / {couvertures.length}
        </span>
        <button type="button" className="su-bib__fleche" onClick={() => aller(i + 1)} disabled={i >= couvertures.length - 1} aria-label="Article suivant">
          →
        </button>
      </div>
    </div>
  )
}
