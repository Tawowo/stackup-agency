'use client'
/**
 * CADRAN — un chiffre à roues : chaque chiffre est une colonne 0-9 qui tourne
 * jusqu'à la bonne valeur. La rotation part quand le cadran entre dans le
 * viewport et tourne d'une traite (900 ms) : un prix n'est JAMAIS figé sur une
 * valeur intermédiaire quand le scroll s'arrête. Revenir au-dessus le remet à
 * zéro (il retournera à la prochaine entrée). Un changement de valeur ensuite
 * (configurateur) tourne en 900 ms. Le texte réel est présent pour les
 * lecteurs d'écran et sans JS.
 */
import { useEffect, useRef } from 'react'

const COLONNE = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export default function Cadran({ valeur, prefixe = '', suffixe = '', className = '' }: { valeur: number; prefixe?: string; suffixe?: string; className?: string }) {
  const texte = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(valeur)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', '1')
      el.dataset.scrub = '0'
      return
    }
    const etat = { p: 0 }
    const poser = () => {
      el.style.setProperty('--p', etat.p.toFixed(4))
      el.dataset.scrub = etat.p >= 1 ? '0' : '1'
    }
    poser()
    // GSAP est importé à la demande : le cadran ne l'impose pas au chargement de la page.
    let vivant = true
    let nettoyer = () => {}
    import('@/lib/gsap').then(({ gsap, ScrollTrigger, initGsap }) => {
      if (!vivant) return
      initGsap()
      const tourner = () => gsap.to(etat, { p: 1, duration: 0.9, ease: 'power3.out', overwrite: true, onUpdate: poser })
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 96%',
        onEnter: () => tourner(),
        onEnterBack: () => tourner(),
        onLeaveBack: () => {
          gsap.killTweensOf(etat)
          etat.p = 0
          poser()
        },
      })
      nettoyer = () => {
        st.kill()
        gsap.killTweensOf(etat)
      }
    })
    return () => {
      vivant = false
      nettoyer()
    }
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
