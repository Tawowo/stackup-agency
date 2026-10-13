'use client'
/** MOMENT 04 — SEUIL. « Pas que des sites. » La pile se replie en noyau compact. */
import { useEffect, useRef } from 'react'
import Seuil from '@/components/ui/Seuil'
import StackFrame from '@/webgl/StackFrame'
import { initGsap } from '@/lib/gsap'
import { arriverParScroll } from '../arrivee'

export default function SeuilNoyau() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    initGsap()
    const el = ref.current
    if (!el) return
    return arriverParScroll(el, { moment: '04', layout: 'noyau', pose: { x: 0.1, y: 0.2 }, projection: 0.3, fin: 'top 45%' })
  }, [])
  return (
    <div ref={ref} className="su-seuil-noyau" data-moment="04" data-nuit="1" data-titre="Pas que des sites" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', justifyItems: 'center', alignItems: 'start', paddingTop: '6svh', pointerEvents: 'none' }} aria-hidden="true">
        <StackFrame className="su-seuil-noyau__cadre" />
      </div>
      <Seuil id="seuil">Pas que des sites.</Seuil>
    </div>
  )
}
