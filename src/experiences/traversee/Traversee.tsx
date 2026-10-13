'use client'
/**
 * LA TRAVERSÉE — le passage d'une page à l'autre, sans coupure blanche.
 * Le canvas est persistant : la scène ne s'éteint jamais. Au clic sur un lien
 * interne, la page courante se replie vers le haut (découpe clip-path) pendant
 * que le sol de la Fabrique se dissout ; la nouvelle page se déplie depuis le
 * bas, le sol se reforme, et la pile glisse vers sa nouvelle boîte d'ancrage.
 * Retour/avant du navigateur : seul le dépliage joue. Mouvement réduit : rien.
 */
import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { gsap } from '@/lib/gsap'
import { useScene } from '@/webgl/store'

const SORTIE = 0.34
const ENTREE = 0.5

export default function Traversee() {
  const chemin = usePathname()
  const router = useRouter()
  const enCours = useRef(false)
  const premier = useRef(true)

  // Sortie : on intercepte les liens internes (avant le Link de Next).
  useEffect(() => {
    const clic = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a || a.target === '_blank' || a.hasAttribute('download') || a.dataset.suDirect !== undefined) return
      const url = new URL(a.href, location.href)
      if (url.origin !== location.origin || url.pathname.startsWith('/api/') || /\.(pdf|xml|txt)$/.test(url.pathname)) return
      if (url.pathname === location.pathname) return
      const s = useScene.getState()
      if (s.reduced) return
      const page = document.querySelector<HTMLElement>('.su-page')
      if (!page) return
      e.preventDefault()
      if (enCours.current) return
      enCours.current = true
      s.setDissolve(1)
      gsap.fromTo(
        page,
        { clipPath: 'inset(0% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: SORTIE,
          ease: 'power2.in',
          onComplete: () => router.push(url.pathname + url.search + url.hash),
        },
      )
    }
    document.addEventListener('click', clic, true)
    return () => document.removeEventListener('click', clic, true)
  }, [router])

  // Entrée : à chaque nouvelle route, la page se déplie depuis le bas.
  useEffect(() => {
    if (premier.current) {
      premier.current = false
      return
    }
    const page = document.querySelector<HTMLElement>('.su-page')
    const s = useScene.getState()
    enCours.current = false
    if (!page || s.reduced) {
      if (page) gsap.set(page, { clearProps: 'clipPath' })
      s.setDissolve(0)
      return
    }
    const t = gsap.fromTo(
      page,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: ENTREE,
        ease: 'power3.out',
        onStart: () => useScene.getState().setDissolve(0),
        onComplete: () => gsap.set(page, { clearProps: 'clipPath' }),
      },
    )
    return () => {
      t.kill()
    }
  }, [chemin])

  return null
}
