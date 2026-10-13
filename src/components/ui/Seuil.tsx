'use client'
/**
 * SEUIL — une phrase de trois mots, centrée, révélée par le scroll (dépliage
 * par mots). Un seul par page.
 */
import { useEffect, useRef } from 'react'
import { gsap, SplitText, initGsap } from '@/lib/gsap'

export default function Seuil({ children, id }: { children: string; id?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    initGsap()
    const el = ref.current
    if (!el) return
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const split = new SplitText(el, { type: 'words', wordsClass: 'su-seuil__mot' })
    if (reduit) return () => split.revert()
    // Piloté par le scroll (réversible, jamais en cours de route).
    gsap.set(split.words, { rotateX: -90, transformOrigin: '50% 100%' })
    const tween = gsap.to(split.words, {
      rotateX: 0,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: el, start: 'top 92%', end: 'top 55%', scrub: true },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      split.revert()
    }
  }, [])
  return (
    <section className="su-seuil" id={id} aria-label={children}>
      <p ref={ref} className="su-display su-seuil__texte">
        {children}
      </p>
    </section>
  )
}
