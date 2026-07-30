'use client'
import { useEffect } from 'react'

// M6: interpolates the <main> background color as the user scrolls.
// light (#F8FAFC) → pale blue (#EFF6FF) → deep navy (#060D1A)
// Uses CSS custom property --scroll-bg on <body> for smooth interpolation.
// No layout shifts — paint-only operation.

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b]
}

function interpolateColor(c1: number[], c2: number[], t: number) {
  const r = Math.round(lerp(c1[0], c2[0], t))
  const g = Math.round(lerp(c1[1], c2[1], t))
  const b = Math.round(lerp(c1[2], c2[2], t))
  return `rgb(${r},${g},${b})`
}

const STOPS = [
  { at: 0,    hex: '#F8FAFC' }, // light start
  { at: 0.3,  hex: '#EFF6FF' }, // pale blue
  { at: 0.65, hex: '#0A0F1C' }, // deep
  { at: 1,    hex: '#060D1A' }, // deepest
]

const STOPS_DARK = [
  { at: 0,    hex: '#0A0F1C' },
  { at: 0.4,  hex: '#060D1A' },
  { at: 1,    hex: '#060D1A' },
]

export default function ScrollBackground() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    const darkMode = window.matchMedia('(prefers-color-scheme: dark)')
    const stops = darkMode.matches ? STOPS_DARK : STOPS
    const rgbStops = stops.map(s => ({ at: s.at, rgb: hexToRgb(s.hex) }))

    const main = document.querySelector<HTMLElement>('main.page-transition')
    if (!main) return

    const onScroll = () => {
      const totalH = document.documentElement.scrollHeight - window.innerHeight
      if (totalH <= 0) return
      const p = Math.max(0, Math.min(1, window.scrollY / totalH))

      let c1 = rgbStops[0], c2 = rgbStops[1]
      for (let i = 0; i < rgbStops.length - 1; i++) {
        if (p >= rgbStops[i].at && p <= rgbStops[i + 1].at) {
          c1 = rgbStops[i]; c2 = rgbStops[i + 1]; break
        }
      }
      const range = c2.at - c1.at
      const t = range === 0 ? 0 : (p - c1.at) / range
      // Don't set body bg — sections have their own; just mark progress for potential use
      main.style.setProperty('--scroll-p', String(p.toFixed(3)))
      // Actually tint a subtle overlay element
      const overlay = document.getElementById('scroll-bg-overlay')
      if (overlay) {
        const color = interpolateColor(c1.rgb, c2.rgb, t)
        overlay.style.background = color
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      id="scroll-bg-overlay"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 transition-colors duration-300"
      style={{ background: '#F8FAFC' }}
    />
  )
}
