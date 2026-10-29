'use client'
/** Mesure d'audience anonyme : une vue par page, les clics sur le téléphone et sur « demander ma démo » (voir lib/mesure.ts). */
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { suivre } from '@/lib/mesure'

export default function Mesure() {
  const chemin = usePathname()
  useEffect(() => {
    suivre('vue')
  }, [chemin])
  useEffect(() => {
    const clic = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a) return
      const h = a.getAttribute('href') ?? ''
      if (h.startsWith('tel:')) suivre('clic_telephone')
      else if (h.includes('objet=demo')) suivre('clic_demo')
    }
    document.addEventListener('click', clic, { passive: true })
    return () => document.removeEventListener('click', clic)
  }, [])
  return null
}
