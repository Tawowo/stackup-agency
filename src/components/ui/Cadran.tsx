'use client'
/**
 * CADRAN — un chiffre à roues : chaque chiffre est une colonne 0-9 qui tourne
 * jusqu'à la bonne valeur (900 ms, chiffres tabulaires). Le texte réel est
 * présent pour les lecteurs d'écran et sans JS.
 */
import { useEffect, useState } from 'react'

const COLONNE = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export default function Cadran({ valeur, prefixe = '', suffixe = '', className = '' }: { valeur: number; prefixe?: string; suffixe?: string; className?: string }) {
  const texte = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(valeur)
  const [pret, setPret] = useState(false)
  useEffect(() => {
    const id = requestIdleCallbackSafe(() => setPret(true))
    return () => cancelIdle(id)
  }, [])
  return (
    <span className={`su-cadran su-tabular ${className}`} aria-label={`${prefixe}${texte}${suffixe}`.trim()}>
      {prefixe && <span className="su-cadran__pref">{prefixe}</span>}
      <span className="su-cadran__roues" aria-hidden="true">
        {Array.from(texte).map((c, i) =>
          /\d/.test(c) ? (
            <span key={i} className="su-cadran__roue" style={{ '--n': pret ? Number(c) : 0, '--i': i } as React.CSSProperties}>
              <span className="su-cadran__col">
                {COLONNE.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            </span>
          ) : (
            <span key={i} className="su-cadran__sep">
              {c}
            </span>
          ),
        )}
      </span>
      <span className="sr-only">{texte}</span>
      {suffixe && <span className="su-cadran__suf">{suffixe}</span>}
    </span>
  )
}

/* Pas de setTimeout « pour laisser le temps » : on attend simplement une
   tâche inactive, pour que la transition CSS parte de 0. */
function requestIdleCallbackSafe(fn: () => void): number {
  const w = window as Window & { requestIdleCallback?: (f: () => void) => number }
  return w.requestIdleCallback ? w.requestIdleCallback(fn) : window.setTimeout(fn, 0)
}
function cancelIdle(id: number) {
  const w = window as Window & { cancelIdleCallback?: (i: number) => void }
  if (w.cancelIdleCallback) w.cancelIdleCallback(id)
  else window.clearTimeout(id)
}
