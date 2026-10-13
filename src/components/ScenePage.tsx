'use client'
/**
 * SCÈNE DE PAGE — pour les pages éditoriales et les gabarits (locales, légales,
 * outils) : déclare en une ligne ce que la pile fait sur la page. La pile
 * rejoint sa boîte d'ancrage depuis la page précédente (glissement + sol dissous :
 * c'est la traversée), puis prend la forme demandée.
 */
import { useEffect } from 'react'
import type { LayoutName, LayoutParams } from '@/webgl/layouts'
import { useScene } from '@/webgl/store'

export default function ScenePage({ moment, forme = 'logo', projection = 0.4, pose = { x: 0.08, y: -0.24 }, params }: { moment: string; forme?: LayoutName; projection?: number; pose?: { x: number; y: number }; params?: Partial<LayoutParams> }) {
  useEffect(() => {
    const s = useScene.getState()
    s.setMoment(moment)
    s.setMonde('fabrique')
    s.setScrub(false)
    s.setTarget(null)
    s.setParams({ retard: 0.25, flash: 0, arc: 0.6, entree: 0, approche: 0, ...(params ?? {}) })
    s.setProjection(projection)
    s.setPose(pose)
    if (!s.reduced) s.setLayout(forme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moment, forme, projection])
  return null
}
