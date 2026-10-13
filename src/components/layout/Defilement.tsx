'use client'
/**
 * DÉFILEMENT — Lenis (lerp 0,09) avancé par `gsap.ticker`, relié à ScrollTrigger.
 * Pas de Lenis en mouvement réduit. Barre de progression fine, ambre, en haut.
 */
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, initGsap } from '@/lib/gsap'

export default function Defilement() {
  const barre = useRef<HTMLDivElement>(null)
  useEffect(() => {
    initGsap()
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const progression = (p: number) => {
      if (barre.current) barre.current.style.transform = `scaleX(${p})`
    }
    if (reduit) {
      const maj = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        progression(max > 0 ? window.scrollY / max : 0)
      }
      window.addEventListener('scroll', maj, { passive: true })
      maj()
      return () => window.removeEventListener('scroll', maj)
    }
    const lenis = new Lenis({ lerp: 0.09, autoRaf: false, anchors: true })
    ;(window as unknown as { __suLenis?: Lenis }).__suLenis = lenis
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    lenis.on('scroll', (l: Lenis) => {
      ScrollTrigger.update()
      progression(l.progress)
    })
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      delete (window as unknown as { __suLenis?: Lenis }).__suLenis
    }
  }, [])
  return <div ref={barre} className="su-progression" aria-hidden="true" />
}
