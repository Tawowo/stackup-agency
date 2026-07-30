'use client'
import { useEffect, useRef, useState } from 'react'

// Per-digit rolling column odometer.
// Each digit animates from 0→target via a vertical column strip.
// Ease: expo-out (fast start, slow arrival) over 900ms.

interface OdometerProps {
  value: number
  suffix?: string
  className?: string
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

function DigitColumn({ target, delay }: { target: number; delay: number }) {
  const colRef = useRef<HTMLSpanElement>(null)
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)
  const duration = 900

  useEffect(() => {
    const el = colRef.current
    if (!el) return

    const animate = (now: number) => {
      if (!startRef.current) startRef.current = now + delay
      const elapsed = Math.max(0, now - startRef.current)
      const t = Math.min(1, elapsed / duration)
      const ease = easeOutExpo(t)
      // translateY: 0 = digit 0 at top, move up to show target digit
      // Column contains digits 0–9 stacked vertically; each is 1em tall
      const yPercent = -(ease * target * 100)
      el.style.transform = `translateY(${yPercent}%)`
      if (t < 1) rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, delay])

  return (
    <span
      className="relative inline-block overflow-hidden"
      style={{ height: '1.1em', width: '0.62em', lineHeight: '1.1em' }}
      aria-hidden="true"
    >
      <span
        ref={colRef}
        className="absolute top-0 left-0 flex flex-col"
        style={{ transform: 'translateY(0%)' }}
      >
        {Array.from({ length: 10 }, (_, d) => (
          <span key={d} className="block" style={{ height: '1.1em', lineHeight: '1.1em' }}>
            {d}
          </span>
        ))}
      </span>
    </span>
  )
}

export default function Odometer({ value, suffix = '', className = '' }: OdometerProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) { setReduced(true); setVisible(true); return }

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  const digits = String(value).split('').map(Number)

  if (reduced) {
    return <span className={className}>{value}{suffix}</span>
  }

  return (
    <span
      ref={containerRef}
      className={`inline-flex items-baseline tabular-nums ${className}`}
      aria-label={`${value}${suffix}`}
    >
      {visible && digits.map((d, i) => (
        <DigitColumn key={i} target={d} delay={i * 60} />
      ))}
      {!visible && <span style={{ opacity: 0 }}>{value}</span>}
      {suffix && <span>{suffix}</span>}
    </span>
  )
}
