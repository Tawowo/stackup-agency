'use client'
import { useEffect, useRef, useState } from 'react'

interface Props {
  target: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export default function CountUp({ target, duration = 1200, suffix = '', prefix = '', className }: Props) {
  const [value, setValue] = useState(target)
  const spanRef = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setValue(0)
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const t0 = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1)
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
          setValue(Math.round(eased * target))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    if (spanRef.current) obs.observe(spanRef.current)
    return () => obs.disconnect()
  }, [target, duration])

  // Les chiffres tabulaires donnent à chaque chiffre la même chasse, mais le
  // NOMBRE de chiffres change pendant le décompte : 0 → 10 → 100. Chaque
  // palier élargissait l'élément et décalait ce qui suit — origine du CLS de
  // 0,001 relevé par Lighthouse. On réserve donc dès la première image la
  // largeur du nombre final, exprimée en `ch` (une unité qui vaut exactement
  // la chasse d'un chiffre quand la police est tabulaire).
  const largeurFinale = `${String(target).length}ch`

  return (
    <span ref={spanRef} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}
      <span style={{ display: 'inline-block', minWidth: largeurFinale }}>{value}</span>
      {suffix}
    </span>
  )
}
