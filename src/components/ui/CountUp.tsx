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
  const [value, setValue] = useState(0)
  const spanRef = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }
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

  return (
    <span ref={spanRef} className={className}>
      {prefix}{value}{suffix}
    </span>
  )
}
