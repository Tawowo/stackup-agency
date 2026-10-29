'use client'
/**
 * DÉFILEMENT — natif. Aucune inertie artificielle : la molette, le tactile et le clavier
 * agissent immédiatement ; ScrollTrigger lit la vraie position. Ne reste qu'une barre de
 * progression fine, ambre, en haut (transform seul, écouteur passif).
 */
import { useEffect, useRef } from 'react'
import { initGsap } from '@/lib/gsap'

export default function Defilement() {
  const barre = useRef<HTMLDivElement>(null)
  useEffect(() => {
    initGsap()
    const maj = () => {
      if (!barre.current) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      barre.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`
    }
    window.addEventListener('scroll', maj, { passive: true })
    maj()
    return () => window.removeEventListener('scroll', maj)
  }, [])
  return <div ref={barre} className="su-progression" aria-hidden="true" />
}
