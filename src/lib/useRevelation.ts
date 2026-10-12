'use client'

/**
 * Révélation au défilement, sans jamais risquer de contenu définitivement
 * invisible.
 *
 * Le motif courant — `style={{ opacity: visible ? 1 : 0 }}` piloté par un
 * état React — a un défaut grave : l'état masqué est l'état de repos. Si le
 * script ne s'exécute pas, si l'observateur ne se déclenche jamais, ou si le
 * composant est rendu côté serveur sans être hydraté, **le contenu
 * n'apparaît jamais**. Mesuré sur ce site : sans JavaScript, les six étapes
 * de la section méthode étaient à opacité 0 — la section entière était vide.
 *
 * Ce hook renverse la logique. Il renvoie une classe à poser sur l'élément ;
 * le masquage vit en CSS, sous `.su-js`, classe apposée de façon synchrone
 * dans `<head>`. Sans JavaScript, aucun masquage n'existe.
 *
 * Trois garde-fous :
 *  - `prefers-reduced-motion` révèle immédiatement, sans observation ;
 *  - une temporisation de secours révèle tout au bout de `secours` ms, même
 *    si l'observateur n'a rien vu ;
 *  - l'observation est arrêtée dès qu'un élément est révélé, car la
 *    révélation est définitive.
 */

import { useEffect, useRef, useState } from 'react'

interface Options {
  /** Nombre d'éléments à observer. */
  nombre?: number
  /** Marge d'observation. Négative en bas = déclenche avant d'atteindre le bord. */
  marge?: string
  /** Délai au-delà duquel tout est révélé, quoi qu'il arrive. */
  secours?: number
}

export function useRevelation({
  nombre = 1,
  marge = '0px 0px -15% 0px',
  secours = 2500,
}: Options = {}) {
  const [reveles, setReveles] = useState<boolean[]>(() => Array(nombre).fill(false))
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const revelerTout = () => setReveles(Array(nombre).fill(true))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revelerTout()
      return
    }
    if (typeof IntersectionObserver === 'undefined') {
      revelerTout()
      return
    }

    const vigie = new IntersectionObserver(
      (entrees) => {
        setReveles((avant) => {
          let change = false
          const apres = [...avant]
          for (const e of entrees) {
            if (!e.isIntersecting) continue
            const i = Number((e.target as HTMLElement).dataset.revele)
            if (!Number.isNaN(i) && !apres[i]) {
              apres[i] = true
              change = true
              vigie.unobserve(e.target)
            }
          }
          return change ? apres : avant
        })
      },
      { rootMargin: marge, threshold: 0 },
    )

    for (const el of refs.current) if (el) vigie.observe(el)

    // Filet : si rien ne s'est déclenché, on montre quand même. Un contenu
    // qui apparaît sans animation vaut infiniment mieux qu'un contenu absent.
    const minuteur = setTimeout(revelerTout, secours)

    return () => {
      clearTimeout(minuteur)
      vigie.disconnect()
    }
  }, [nombre, marge, secours])

  /** Props à étaler sur l'élément n° i. */
  const props = (i: number) => ({
    ref: (el: HTMLElement | null) => {
      refs.current[i] = el
    },
    'data-revele': i,
    className: `su-revelable${reveles[i] ? ' est-revele' : ''}`,
  })

  return { reveles, props }
}
