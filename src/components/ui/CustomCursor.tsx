'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(pointer: coarse)')
    if (mq.matches) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let rx = 0, ry = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      const x = e.clientX, y = e.clientY
      dot.style.left = `${x}px`
      dot.style.top = `${y}px`
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        rx += (x - rx) * 0.14
        ry += (y - ry) * 0.14
        ring.style.left = `${rx}px`
        ring.style.top = `${ry}px`
      })
    }

    const onEnterLink = () => { dot.classList.add('expanded'); ring.classList.add('expanded') }
    const onLeaveLink = () => { dot.classList.remove('expanded'); ring.classList.remove('expanded') }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="custom-cursor hidden lg:block" aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor-ring hidden lg:block" aria-hidden="true" />
    </>
  )
}
