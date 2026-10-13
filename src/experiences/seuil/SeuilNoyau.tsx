'use client'
/** MOMENT 04 — SEUIL. « Pas que des sites. » La pile se replie en noyau compact. */
import { useEffect, useRef } from 'react'
import Seuil from '@/components/ui/Seuil'
import StackFrame from '@/webgl/StackFrame'
import { useScene } from '@/webgl/store'
import { ScrollTrigger, initGsap } from '@/lib/gsap'

export default function SeuilNoyau() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    initGsap()
    const el = ref.current
    if (!el) return
    const replier = () => {
      const s = useScene.getState()
      s.setMoment('04')
      s.setNuit(1)
      if (s.reduced) return
      s.setScrub(false)
      s.setTarget(null)
      s.setPose({ x: 0.1, y: 0.2 })
      s.setProjection(0.3)
      s.setLayout('noyau')
    }
    const st = ScrollTrigger.create({ trigger: el, start: 'top 60%', end: 'bottom 40%', onEnter: replier, onEnterBack: replier })
    return () => st.kill()
  }, [])
  return (
    <div ref={ref} className="su-seuil-noyau" data-moment="04" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', justifyItems: 'center', alignItems: 'start', paddingTop: '6svh', pointerEvents: 'none' }} aria-hidden="true">
        <StackFrame className="su-seuil-noyau__cadre" />
      </div>
      <Seuil id="seuil">Pas que des sites.</Seuil>
    </div>
  )
}
