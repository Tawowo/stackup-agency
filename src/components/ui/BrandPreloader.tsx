'use client'
import { useEffect, useRef, useState } from 'react'

export default function BrandPreloader() {
  const [visible, setVisible] = useState(false)
  const [count, setCount] = useState(0)
  const [lifting, setLifting] = useState(false)
  const rafRef = useRef<number>(0)
  const startRef = useRef<number>(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (sessionStorage.getItem('preloader-v3-shown')) return
    sessionStorage.setItem('preloader-v3-shown', '1')

    setVisible(true)

    // Counter 0→100 over 800ms (eased)
    startRef.current = performance.now()
    const animCount = (now: number) => {
      const elapsed = now - startRef.current
      const p = Math.min(elapsed / 800, 1)
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
      setCount(Math.round(eased * 100))
      if (p < 1) rafRef.current = requestAnimationFrame(animCount)
    }
    rafRef.current = requestAnimationFrame(animCount)

    // Start lifting at 900ms
    const t1 = setTimeout(() => setLifting(true), 900)
    // Remove at 1400ms (after both panels clear)
    const t2 = setTimeout(() => setVisible(false), 1400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (!visible) return null

  return (
    <div aria-hidden="true" className="fixed inset-0 z-[99999] pointer-events-none">
      {/* Top panel */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-[#070B16] flex items-end justify-end px-8 pb-4 transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{ transform: lifting ? 'translateY(-100%)' : 'translateY(0)' }}
      />

      {/* Bottom panel */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#070B16] transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          transform: lifting ? 'translateY(100%)' : 'translateY(0)',
          transitionDelay: lifting ? '60ms' : '0ms',
        }}
      />

      {/* Center content (stays visible until panels lift away) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[#070B16]"
        style={{ opacity: lifting ? 0 : 1, transition: 'opacity 0.2s ease', transitionDelay: '0.1s' }}>
        {/* S stroke SVG */}
        <svg width="64" height="64" viewBox="0 0 80 80" fill="none" aria-hidden="true">
          <path
            d="M52 22c-3.5-5-10-8-16-7-8 1.5-13 9-10 17 2 6 9 9 15 12 8 3.5 14 9 12 18-2 8-11 12-19 11-5-0.5-10-3-13-7"
            stroke="#F59E0B"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            style={{
              strokeDasharray: 160,
              strokeDashoffset: 0,
              animation: 'preloader-draw-v3 0.55s cubic-bezier(0.16,1,0.3,1) forwards',
            }}
          />
          {/* Subtle circle frame */}
          <circle cx="40" cy="40" r="36" stroke="rgba(45,125,210,0.15)" strokeWidth="1" fill="none" />
        </svg>

        {/* Counter */}
        <div
          className="font-mono text-xs tracking-[0.4em] text-white/30"
          style={{ fontFamily: 'var(--font-mono, ui-monospace, monospace)' }}
        >
          {String(count).padStart(3, '0')}
        </div>
      </div>
    </div>
  )
}
