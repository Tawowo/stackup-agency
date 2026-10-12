'use client'

/**
 * LE SEUIL.
 *
 * La section où la page bascule du plein jour vers l'encre. Elle est
 * volontairement presque vide : c'est le moment où le nuage se réorganise en
 * maquette de site, et rien ne doit lui disputer l'attention.
 *
 * Elle a aussi une fonction technique. Faire s'inverser le fond et le texte
 * en même temps ferait se croiser leurs luminances, et le contraste
 * s'effondrerait à mi-course. En plaçant la bascule ici, à l'intérieur d'une
 * section sans corps de texte, le croisement n'a lieu sur aucun contenu.
 */

import { useEffect, useRef, useState } from 'react'

export interface ProprietesSeuil {
  /** Clé d'état de scène : fait le lien avec `ETATS` dans le moteur. */
  scene: string
  /** Ambiance visée à la sortie du seuil. */
  nuit: number
  /** Trois fragments, révélés l'un après l'autre. */
  mots: readonly [string, string, string]
  /** Libellé accessible de la transition. */
  intitule: string
}

export default function Seuil({ scene, nuit, mots, intitule }: ProprietesSeuil) {
  const section = useRef<HTMLElement>(null)
  const [avancement, setAvancement] = useState(0)

  useEffect(() => {
    const el = section.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setAvancement(1)
      return
    }

    let attente = false
    const maj = () => {
      const r = el.getBoundingClientRect()
      const h = window.innerHeight
      // 0 quand la section entre par le bas, 1 quand elle sort par le haut.
      const p = 1 - (r.top + r.height * 0.35) / (h + r.height * 0.35)
      setAvancement(Math.min(Math.max(p, 0), 1))
      attente = false
    }
    const surDefilement = () => {
      if (attente) return
      attente = true
      requestAnimationFrame(maj)
    }
    window.addEventListener('scroll', surDefilement, { passive: true })
    window.addEventListener('resize', surDefilement)
    maj()
    return () => {
      window.removeEventListener('scroll', surDefilement)
      window.removeEventListener('resize', surDefilement)
    }
  }, [])

  return (
    <section
      ref={section}
      data-scene={scene}
      data-nuit={nuit}
      className={`su-seuil su-ambiance ${nuit > 0.5 ? 'su-seuil--nuit' : 'su-seuil--jour'}`}
      style={{ '--av': avancement.toFixed(3) } as React.CSSProperties}
      aria-label={intitule}
    >
      <div className="su-seuil__contenu su-scene-devant">
        <p className="su-seuil__phrase">
          {mots.map((mot, i) => (
            <span
              key={mot}
              className="su-seuil__mot"
              style={{ '--i': i } as React.CSSProperties}
            >
              {mot}
            </span>
          ))}
        </p>

        {/* Règle graduée : donne une échelle au vide et matérialise la
            progression de la traversée. */}
        <div className="su-seuil__regle" aria-hidden="true">
          {Array.from({ length: 28 }, (_, i) => (
            <span key={i} style={{ '--i': i } as React.CSSProperties} />
          ))}
        </div>
      </div>
    </section>
  )
}
