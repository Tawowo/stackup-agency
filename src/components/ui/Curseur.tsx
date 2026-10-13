'use client'
/**
 * CURSEUR — point ambre 8 px + anneau 32 px amorti. L'anneau s'ouvre sur les
 * éléments interactifs et affiche un mot (`data-curseur`). Pointeur fin
 * seulement ; désactivé au tactile, au clavier et en mouvement réduit.
 */
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export default function Curseur() {
  const point = useRef<HTMLDivElement>(null)
  const anneau = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const fin = window.matchMedia('(pointer: fine)').matches
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fin || reduit) return
    const p = point.current
    const a = anneau.current
    if (!p || !a) return
    document.documentElement.dataset.suCurseur = '1'
    const cible = { x: -100, y: -100 }
    const pos = { x: -100, y: -100 }
    let actif = false
    let clavier = false
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      cible.x = e.clientX
      cible.y = e.clientY
      actif = true
      clavier = false
      const inter = (e.target as HTMLElement | null)?.closest<HTMLElement>('a, button, [data-curseur], input, textarea, select, [role="button"]')
      const mot = inter?.dataset.curseur ?? ''
      a.dataset.ouvert = inter ? '1' : '0'
      a.dataset.mot = mot
      a.textContent = mot
    }
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Tab') clavier = true
    }
    const tick = (_t: number, dtMs: number) => {
      const k = 1 - Math.exp(-dtMs / 90)
      pos.x += (cible.x - pos.x) * k
      pos.y += (cible.y - pos.y) * k
      p.style.transform = `translate(${cible.x}px, ${cible.y}px)`
      a.style.transform = `translate(${pos.x}px, ${pos.y}px)`
      const visible = actif && !clavier
      p.style.opacity = visible ? '1' : '0'
      a.style.opacity = visible ? '1' : '0'
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('keydown', key)
    document.addEventListener('mouseleave', () => (actif = false))
    gsap.ticker.add(tick)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('keydown', key)
      gsap.ticker.remove(tick)
      delete document.documentElement.dataset.suCurseur
    }
  }, [])
  return (
    <>
      <div ref={point} className="su-curseur__point" aria-hidden="true" />
      <div ref={anneau} className="su-curseur__anneau" aria-hidden="true" />
    </>
  )
}
