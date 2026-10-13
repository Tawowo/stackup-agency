'use client'
/**
 * MONTAGE — décide une fois (palier, WebGL, mouvement réduit), charge three/R3F
 * en différé, et pose `data-su-mode` sur <html> pour le repli 2D.
 */
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { detecterPalier } from './quality'
import { useScene, type SceneParams } from './store'
import { stackUniforms } from './engine'

const Scene = dynamic(() => import('./Scene'), { ssr: false })

export default function SceneMount() {
  const [pret, setPret] = useState(false)
  const mode = useScene((s) => s.mode)
  const setTier = useScene((s) => s.setTier)
  const setMode = useScene((s) => s.setMode)
  const setReduced = useScene((s) => s.setReduced)
  const setStill = useScene((s) => s.setStill)

  useEffect(() => {
    let vivant = true
    const q = new URLSearchParams(window.location.search)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const reduit = mq.matches
    setReduced(reduit)
    if (q.get('still') === '1' || reduit) setStill(true)
    // Diagnostics (captures, logo-check) : valables sur toute route.
    const st = useScene.getState()
    const proj = q.get('proj')
    if (proj !== null) st.setProjection(Number(proj))
    const rx = q.get('rx')
    const ry = q.get('ry')
    if (rx !== null || ry !== null) st.setPose({ x: Number(rx ?? 0), y: Number(ry ?? 0) })
    const p: Partial<SceneParams> = {}
    if (q.get('mur') === '0') p.mur = 0
    if (q.get('ombre') === '0') p.ombre = 0
    if (q.get('grain') === '0') p.grain = 0
    if (q.get('plaques') === '0') p.plaques = 0
    // Le monde, pièce par pièce (sol, flux, code, lampe) et l'inclinaison de la caméra.
    for (const k of ['sol', 'flux', 'code', 'lampe', 'tangage'] as const) {
      const v = q.get(k)
      if (v !== null) p[k] = Number(v)
    }
    if (Object.keys(p).length) st.setParams(p)
    if (q.get('fond') === 'ivoire') st.forcerNuit(0)
    if (process.env.NODE_ENV !== 'production') {
      ;(window as unknown as { __su?: unknown }).__su = { scene: useScene, u: stackUniforms() }
    }
    detecterPalier().then((tier) => {
      if (!vivant) return
      setTier(tier)
      if (tier === 'low' || q.get('webgl') === '0') setMode('2d')
      setPret(true)
    })
    return () => {
      vivant = false
    }
  }, [setTier, setMode, setReduced, setStill])

  useEffect(() => {
    document.documentElement.dataset.suMode = mode
  }, [mode])

  // Portrait (< 768 px) : variantes compactes des layouts.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const appliquer = () => useScene.getState().setParams({ portrait: mq.matches ? 1 : 0 })
    appliquer()
    mq.addEventListener('change', appliquer)
    return () => mq.removeEventListener('change', appliquer)
  }, [])

  // Mobile : l'inclinaison du téléphone déplace la lampe (permission iOS demandée au premier toucher).
  useEffect(() => {
    if (!('DeviceOrientationEvent' in window) || !window.matchMedia('(pointer: coarse)').matches) return
    let base: { beta: number; gamma: number } | null = null
    const lire = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return
      base ??= { beta: e.beta, gamma: e.gamma }
      const x = Math.max(-1, Math.min(1, (e.gamma - base.gamma) / 25))
      const y = Math.max(-1, Math.min(1, (e.beta - base.beta) / 25))
      useScene.getState().setInclinaison(x, y)
    }
    const brancher = () => window.addEventListener('deviceorientation', lire)
    const demander = () => {
      type Perm = { requestPermission?: () => Promise<'granted' | 'denied'> }
      const P = DeviceOrientationEvent as unknown as Perm
      if (typeof P.requestPermission === 'function') P.requestPermission().then((r) => r === 'granted' && brancher()).catch(() => {})
      else brancher()
      window.removeEventListener('touchend', demander)
    }
    window.addEventListener('touchend', demander, { passive: true })
    return () => {
      window.removeEventListener('touchend', demander)
      window.removeEventListener('deviceorientation', lire)
    }
  }, [])

  // `--su-nuit` (CSS) suit la nuit de la scène : fond, textes et canvas ensemble.
  useEffect(() => {
    const appliquer = (n: number) => document.documentElement.style.setProperty('--su-nuit', n.toFixed(3))
    appliquer(useScene.getState().nuit)
    return useScene.subscribe((s, prev) => {
      if (s.nuit !== prev.nuit) appliquer(s.nuit)
    })
  }, [])

  // Lisible par Playwright : la scène a rendu au moins une trame.
  const ready = useScene((s) => s.ready)
  useEffect(() => {
    document.documentElement.dataset.suReady = ready || mode === '2d' ? '1' : '0'
  }, [ready, mode])

  if (!pret || mode === '2d') return null
  return <Scene />
}
