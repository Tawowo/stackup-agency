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
  const f = useScene.getState().frame
  if (meilleur && f && Math.abs(f.x - meilleur.left) < 0.25 && Math.abs(f.y - meilleur.top) < 0.25 && Math.abs(f.w - meilleur.width) < 0.25 && Math.abs(f.h - meilleur.height) < 0.25) return
  useScene.getState().setFrame(meilleur ? { x: meilleur.left, y: meilleur.top, w: meilleur.width, h: meilleur.height } : null)
}

function armer() {
  if (armee) return
  armee = true
  // UNE lecture des boîtes par trame au plus, faite dans le ticker unique, jamais dans les écouteurs de scroll
  // (ScrollTrigger vient d'y écrire des styles : lire ici forcerait une mise en page par événement).
  // Les boîtes sont relues à chaque trame tant que ça bouge (scroll, redimensionnement, refresh), puis 4 fois par seconde
  // au repos (polices, transformations d'entrée) : plus de lecture de mise en page à 60 Hz sur une page immobile.
  let sale = true
  let derniere = 0
  const marquer = () => {
    sale = true
  }
  ro = new ResizeObserver(marquer)
  ro.observe(document.documentElement)
  window.addEventListener('scroll', marquer, { passive: true })
  window.addEventListener('resize', marquer)
  // GSAP est importé à la demande : il reste hors du chemin critique.
  import('@/lib/gsap').then(({ gsap, ScrollTrigger, initGsap }) => {
    initGsap()
    ScrollTrigger.addEventListener('refresh', marquer)
    gsap.ticker.add((temps) => {
      const ms = temps * 1000
      if (!sale && ms - derniere < 250) return
      sale = false
      derniere = ms
      elire()
    })
  })
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
