'use client'

/**
 * Bouton magnétique.
 *
 * Le bouton se déplace légèrement vers le pointeur quand celui-ci approche,
 * et son contenu suit avec un retard. Ce décalage entre le cadre et le
 * libellé est ce qui donne la sensation de matière : sans lui, le bouton
 * « colle » au curseur et l'effet paraît mécanique.
 *
 * Désactivé au pointeur grossier (tactile) et en mouvement réduit.
 */

import { useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'

interface Props {
  href: string
  children: React.ReactNode
  className?: string
  /** Amplitude du déplacement, en pixels. */
  force?: number
  onClick?: () => void
}

export default function BoutonMagnetique({
  href,
  children,
  className = '',
  force = 9,
  onClick,
}: Props) {
  const cadre = useRef<HTMLAnchorElement>(null)
  const interieur = useRef<HTMLSpanElement>(null)
  const image = useRef(0)
  const cible = useRef({ x: 0, y: 0 })
  const courant = useRef({ x: 0, y: 0 })

  const animer = useCallback(() => {
    const c = courant.current
    const t = cible.current
    c.x += (t.x - c.x) * 0.16
    c.y += (t.y - c.y) * 0.16

    if (cadre.current) {
      cadre.current.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`
    }
    // Le contenu suit avec un gain plus faible : il traîne derrière le cadre.
    if (interieur.current) {
      interieur.current.style.transform = `translate3d(${c.x * 0.38}px, ${c.y * 0.38}px, 0)`
    }

    if (Math.abs(t.x - c.x) > 0.05 || Math.abs(t.y - c.y) > 0.05) {
      image.current = requestAnimationFrame(animer)
    } else {
      image.current = 0
    }
  }, [])

  const relancer = useCallback(() => {
    if (!image.current) image.current = requestAnimationFrame(animer)
  }, [animer])

  useEffect(() => {
    const el = cadre.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const surMouvement = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      // Rayon d'attraction proportionnel à la taille du bouton.
      const rayon = Math.max(r.width, r.height) * 0.9
      const d = Math.hypot(dx, dy)
      if (d > rayon) {
        cible.current = { x: 0, y: 0 }
      } else {
        const k = (1 - d / rayon) * force
        cible.current = { x: (dx / (d || 1)) * k, y: (dy / (d || 1)) * k }
      }
      relancer()
    }

    const surSortie = () => {
      cible.current = { x: 0, y: 0 }
      relancer()
    }

    window.addEventListener('pointermove', surMouvement, { passive: true })
    window.addEventListener('pointerleave', surSortie)
    return () => {
      window.removeEventListener('pointermove', surMouvement)
      window.removeEventListener('pointerleave', surSortie)
      cancelAnimationFrame(image.current)
    }
  }, [force, relancer])

  return (
    <Link ref={cadre} href={href} onClick={onClick} className={`su-magnetique ${className}`}>
      <span ref={interieur} className="su-magnetique__interieur">
        {children}
      </span>
    </Link>
  )
}
