'use client'
/**
 * Rendu en DERNIER dans une page : son effet s'exécute après ceux des
 * expériences, quand tous les épinglages sont en place. Un seul refresh
 * recalcule les positions de tous les ScrollTriggers (puis une fois les polices et les images
 * chargées, car les hauteurs changent).
 */
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ScrollTrigger, initGsap } from '@/lib/gsap'

export default function ScrollRefresh() {
  const chemin = usePathname()
  useEffect(() => {
    initGsap()
    ScrollTrigger.refresh()
    let vivant = true
    const refaire = () => {
      if (vivant) ScrollTrigger.refresh()
    }
    document.fonts?.ready.then(refaire)
    // Images et vidéos chargées : les hauteurs changent, les épingles se recalent une fois (jamais pendant le défilement).
    const complet = document.readyState === 'complete'
    if (!complet) window.addEventListener('load', refaire, { once: true })
    return () => {
      vivant = false
      window.removeEventListener('load', refaire)
    }
  }, [chemin])
  return null
}
