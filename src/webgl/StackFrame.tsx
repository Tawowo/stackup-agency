'use client'
/**
 * LA BOÎTE D'ANCRAGE — un élément HTML vide que la scène vient remplir au
 * pixel. Il porte aussi le repli 2D (le logo SVG) quand la 3D n'est pas rendue.
 *
 * Plusieurs boîtes coexistent sur une page (une par moment). Un seul registre
 * mesure toutes les boîtes à chaque scroll / redimensionnement et élit celle
 * qui est la plus visible ; à égalité (aucune visible), la plus proche du
 * centre du viewport. La pile suit donc la boîte du moment courant et glisse
 * d'une boîte à l'autre avec le défilement.
 */
import { useEffect, useRef, type ReactNode } from 'react'
import Fallback2D from './Fallback2D'
import { useScene } from './store'

const registre = new Set<HTMLElement>()
let ro: ResizeObserver | null = null
let armee = false

function elire() {
  const W = window.innerWidth
  const H = window.innerHeight
  let meilleur: DOMRect | null = null
  let meilleurScore = -Infinity
  for (const el of registre) {
    const r = el.getBoundingClientRect()
    if (r.width === 0 || r.height === 0) continue
    const visible = Math.max(0, Math.min(r.bottom, H) - Math.max(r.top, 0)) * Math.max(0, Math.min(r.right, W) - Math.max(r.left, 0))
    const dist = Math.hypot(r.left + r.width / 2 - W / 2, r.top + r.height / 2 - H / 2)
    const score = visible > 0 ? 1e9 + visible : -dist
    if (score > meilleurScore) {
      meilleurScore = score
      meilleur = r
    }
  }
  useScene.getState().setFrame(meilleur ? { x: meilleur.left, y: meilleur.top, w: meilleur.width, h: meilleur.height } : null)
}

function armer() {
  if (armee) return
  armee = true
  ro = new ResizeObserver(elire)
  ro.observe(document.documentElement)
  window.addEventListener('scroll', elire, { passive: true })
  window.addEventListener('resize', elire)
}

export default function StackFrame({ className = '', children }: { className?: string; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    armer()
    registre.add(el)
    ro?.observe(el)
    elire()
    return () => {
      registre.delete(el)
      ro?.unobserve(el)
      elire()
    }
  }, [])
  return (
    <div ref={ref} className={`su-frame ${className}`} data-su-frame="">
      <div className="su-repli" aria-hidden="true">
        <Fallback2D />
      </div>
      {children}
    </div>
  )
}
