'use client'
import { useDrag } from '@use-gesture/react'
import { useScene } from './store'

/** Drag : tourne la pile autour de son axe vertical (et incline un peu). */
export function useDragPile() {
  return useDrag(
    ({ movement: [mx, my], active, memo }) => {
      const s = useScene.getState()
      const start = (memo as { y: number; x: number } | undefined) ?? { y: s.spin, x: s.tilt }
      const y = start.y + mx * 0.006
      const x = Math.max(-0.4, Math.min(0.4, start.x + my * 0.003))
      s.setSpin(y, x, active)
      return start
    },
    { pointer: { touch: true }, filterTaps: true },
  )
}
