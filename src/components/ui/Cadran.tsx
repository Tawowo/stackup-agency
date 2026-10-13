'use client'
/**
 * CADRAN — un chiffre à roues : chaque chiffre est une colonne 0-9 qui tourne
 * jusqu'à la bonne valeur. La première rotation est PILOTÉE PAR LE SCROLL
 * (`--p` de 0 à 1 quand le cadran entre dans le viewport, réversible) ; un
 * changement de valeur ensuite (configurateur) tourne en 900 ms. Le texte
 * réel est présent pour les lecteurs d'écran et sans JS.
 */
import { useEffect, useRef } from 'react'
import { ScrollTrigger, initGsap } from '@/lib/gsap'

const COLONNE = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export default function Cadran({ valeur, prefixe = '', suffixe = '', className = '' }: { valeur: number; prefixe?: string; suffixe?: string; className?: string }) {
  const texte = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(valeur)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    initGsap()
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', '1')
      el.dataset.scrub = '0'
      return
    }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 96%',
      end: 'top 62%',
      scrub: true,
      onUpdate: (self) => {
        el.style.setProperty('--p', self.progress.toFixed(4))
        el.dataset.scrub = self.progress >= 1 ? '0' : '1'
      },
    })
    return () => st.kill()
  }, [])
  return (
    <span ref={ref} className={`su-cadran su-tabular ${className}`} data-scrub="1" aria-label={`${prefixe}${texte}${suffixe}`.trim()}>
      {prefixe && <span className="su-cadran__pref">{prefixe}</span>}
      <span className="su-cadran__roues" aria-hidden="true">
        {Array.from(texte).map((c, i) =>
          /\d/.test(c) ? (
            <span key={i} className="su-cadran__roue" style={{ '--n': Number(c), '--i': i } as React.CSSProperties}>
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
