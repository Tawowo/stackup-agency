'use client'
/**
 * Rendu en DERNIER dans une page : son effet s'exécute après ceux des
 * expériences, quand tous les épinglages sont en place. Un seul refresh
 * recalcule les positions de tous les ScrollTriggers (puis une fois les polices
 * chargées, car les hauteurs de titres changent).
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
    document.fonts?.ready.then(() => {
      if (vivant) ScrollTrigger.refresh()
    })
    return () => {
      vivant = false
    }
  }, [chemin])
  return null
}
