'use client'
/**
 * COTE — trait + valeur en chasse fixe. Toujours une mesure RÉELLE : l'élément
 * ciblé est observé (ResizeObserver), jamais une valeur décorative.
 */
import { useEffect, useState } from 'react'

export type Mesure = 'largeur' | 'hauteur' | 'bas' | 'gauche'

export default function Cote({
  cible,
  mesure,
  nom,
  className = '',
}: {
  /** Sélecteur de l'élément mesuré. */
  cible: string
  mesure: Mesure
  nom: string
  className?: string
}) {
  const [valeur, setValeur] = useState<number | null>(null)
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(cible)
    if (!el) return
    const lire = () => {
      const r = el.getBoundingClientRect()
      const v = mesure === 'largeur' ? r.width : mesure === 'hauteur' ? r.height : mesure === 'bas' ? r.bottom : r.left
      setValeur(Math.round(v))
    }
    lire()
    const ro = new ResizeObserver(lire)
    ro.observe(el)
    ro.observe(document.documentElement)
    return () => ro.disconnect()
  }, [cible, mesure])
  return (
    <span className={`su-cote ${className}`}>
      <span className="su-cote__trait" aria-hidden="true" />
      <span className="su-cote__nom">{nom}</span>
      <span className="su-cote__valeur su-tabular">{valeur === null ? '—' : `${valeur} px`}</span>
    </span>
  )
}
