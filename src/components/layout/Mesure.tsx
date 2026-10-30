'use client'
/** Mesure d'audience anonyme : une vue par page, les clics sur le téléphone, l'e-mail, la démo, l'appel gratuit et les téléchargements (voir lib/mesure.ts). */
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
      const evt = a.dataset.evt
      if (evt && /^clubs_[a-z_]+$/.test(evt)) suivre(evt as Parameters<typeof suivre>[0], h.slice(0, 60))
      if (h.startsWith('tel:')) suivre('clic_telephone')
      else if (h.startsWith('mailto:')) suivre('clic_email')
      else if (/[?&]a=demo\b/.test(h)) suivre('clic_demo')
      else if (/[?&]a=appel\b/.test(h)) suivre('clic_appel')
      else if (/\.(pdf|docx?|xlsx?)(\?|$)/i.test(h) || a.hasAttribute('download')) suivre('telechargement', h.split('/').pop()?.split('?')[0])
    }
    document.addEventListener('click', clic, { passive: true })
    return () => document.removeEventListener('click', clic)
  }, [])
  return null
}
