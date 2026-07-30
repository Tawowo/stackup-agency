'use client'
import { useEffect, useState } from 'react'

export default function BrandPreloader() {
  const [visible, setVisible] = useState(false)
  const [lifting, setLifting] = useState(false)

  useEffect(() => {
    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // One-time per session
    if (sessionStorage.getItem('preloader-shown')) return
    sessionStorage.setItem('preloader-shown', '1')

    setVisible(true)
    // Start lift after stroke animation (450ms) + tiny buffer
    const t1 = setTimeout(() => setLifting(true), 480)
    // Remove from DOM after full animation
    const t2 = setTimeout(() => setVisible(false), 750)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!visible) return null

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center bg-navy"
      style={{
        clipPath: lifting
          ? 'inset(0 0 100% 0)'
          : 'inset(0 0 0% 0)',
        transition: lifting ? 'clip-path 0.25s cubic-bezier(0.4,0,0.2,1)' : 'none',
      }}
    >
      {/* S logo stroke */}
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <path
          d="M52 22c-3.5-5-10-8-16-7-8 1.5-13 9-10 17 2 6 9 9 15 12 8 3.5 14 9 12 18-2 8-11 12-19 11-5-0.5-10-3-13-7"
          stroke="#F59E0B"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            strokeDasharray: 150,
            strokeDashoffset: 0,
            animation: 'preloader-draw 0.45s cubic-bezier(0.16,1,0.3,1) forwards',
          }}
        />
      </svg>
      <style>{`
        @keyframes preloader-draw {
          from { stroke-dashoffset: 150; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  )
}
