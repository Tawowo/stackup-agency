'use client'
import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function PageProgressBar() {
  const pathname = usePathname()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    setVisible(true)
    setProgress(0)

    let p = 0
    const tick = () => {
      p = p < 80 ? p + (80 - p) * 0.08 : p
      setProgress(p)
      if (p < 80) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    timerRef.current = setTimeout(() => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      setProgress(100)
      setTimeout(() => setVisible(false), 300)
    }, 600)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [pathname])

  if (!visible) return null

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[99998] h-[2px] pointer-events-none"
      style={{
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #1E3A5F, #2D7DD2, #F59E0B)',
        transition: progress === 100 ? 'width 0.15s ease, opacity 0.3s ease' : 'width 0.1s linear',
        opacity: progress >= 100 ? 0 : 1,
      }}
    />
  )
}
