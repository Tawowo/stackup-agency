'use client'
/**
 * LA BOÎTE D'ANCRAGE — un élément HTML vide que la scène vient remplir au
 * pixel. Il porte aussi le repli 2D (le logo SVG) quand la 3D n'est pas rendue.
 */
import { useEffect, useRef, type ReactNode } from 'react'
import LogoMarque from '@/components/ui/LogoMarque'
import { useScene } from './store'

export default function StackFrame({ className = '', children }: { className?: string; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const setFrame = useScene((s) => s.setFrame)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const mesure = () => {
      const r = el.getBoundingClientRect()
      setFrame({ x: r.left, y: r.top, w: r.width, h: r.height })
    }
    mesure()
    const ro = new ResizeObserver(mesure)
    ro.observe(el)
    window.addEventListener('scroll', mesure, { passive: true })
    window.addEventListener('resize', mesure)
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', mesure)
      window.removeEventListener('resize', mesure)
      setFrame(null)
    }
  }, [setFrame])
  return (
    <div ref={ref} className={`su-frame ${className}`} data-su-frame="">
      <div className="su-repli" aria-hidden="true">
        <LogoMarque avecTexte={false} taille={0} />
      </div>
      {children}
    </div>
  )
}
