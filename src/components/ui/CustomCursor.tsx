'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dot, setDot] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      setHovered(el.closest('a, button, [data-hover]') !== null)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  useEffect(() => {
    let raf: number
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const animate = () => {
      setDot(prev => ({
        x: lerp(prev.x, pos.x, 0.12),
        y: lerp(prev.y, pos.y, 0.12),
      }))
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [pos])

  if (!visible) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-electric pointer-events-none z-[9999] hidden md:block"
        style={{ x: pos.x - 8, y: pos.y - 8 }}
        animate={{ scale: hovered ? 0.5 : 1, opacity: 0.9 }}
        transition={{ duration: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-electric pointer-events-none z-[9999] hidden md:block"
        style={{ x: dot.x - 20, y: dot.y - 20 }}
        animate={{ scale: hovered ? 1.5 : 1, opacity: 0.5 }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
