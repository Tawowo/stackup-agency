'use client'
/**
 * ZONE D'EXCLUSION — l'union des boîtes des éléments ciblés (le titre, la
 * liste), mesurée par ResizeObserver et au scroll ; les plaques en vol la
 * contournent (vertex shader). Une seule zone active à la fois.
 */
import { useEffect } from 'react'
import { useScene } from './store'

export function useExclusion(selecteurs: string[], actif = true) {
  useEffect(() => {
    if (!actif) return
    const els = selecteurs.map((q) => document.querySelector<HTMLElement>(q)).filter((e): e is HTMLElement => !!e)
    if (!els.length) return
    const mesure = () => {
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
      for (const el of els) {
        const r = el.getBoundingClientRect()
        if (r.width === 0) continue
        x0 = Math.min(x0, r.left)
        y0 = Math.min(y0, r.top)
        x1 = Math.max(x1, r.right)
        y1 = Math.max(y1, r.bottom)
      }
      useScene.getState().setExclusion(x1 > x0 ? { x: x0, y: y0, w: x1 - x0, h: y1 - y0 } : null)
    }
    mesure()
    const ro = new ResizeObserver(mesure)
    els.forEach((el) => ro.observe(el))
    ro.observe(document.documentElement)
    window.addEventListener('scroll', mesure, { passive: true })
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', mesure)
      useScene.getState().setExclusion(null)
    }
  }, [selecteurs, actif])
}
