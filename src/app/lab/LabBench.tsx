'use client'
/**
 * /lab — LE BANC D'ESSAI du Stack Engine. Noindex. Sert à régler les layouts
 * (Tweakpane) et à les capturer avant intégration. Paramètres d'URL lus au
 * chargement : layout, morph, proj, still, quality, webgl, mur, ombre, fond.
 */
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import StackFrame from '@/webgl/StackFrame'
import { stackUniforms } from '@/webgl/engine'
import { useDragPile } from '@/webgl/useDragPile'
import { PARAMS_DEFAUT, useScene, type SceneParams } from '@/webgl/store'
import type { LayoutName } from '@/webgl/layouts'

const LAYOUTS: LayoutName[] = ['logo', 'pile']

export default function LabBench({ hud = true }: { hud?: boolean }) {
  const bind = useDragPile()
  const paneRef = useRef<HTMLDivElement>(null)
  const layout = useScene((s) => s.layout)
  const setLayout = useScene((s) => s.setLayout)
  const morph = useScene((s) => s.morph)
  const fps = useScene((s) => s.fps)
  const tier = useScene((s) => s.tier)
  const mode = useScene((s) => s.mode)
  const spin = useScene((s) => s.spin)

  // Paramètres d'URL (captures reproductibles).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    const s = useScene.getState()
    const u = stackUniforms()
    const p: Partial<SceneParams> = {}
    const proj = q.get('proj')
    if (proj !== null) p.projection = Number(proj)
    if (q.get('mur') === '0') p.mur = 0
    if (q.get('ombre') === '0') p.ombre = 0
    for (const k of Object.keys(PARAMS_DEFAUT) as (keyof SceneParams)[]) {
      const v = q.get(k)
      if (v !== null) p[k] = Number(v)
    }
    s.setParams(p)
    if (q.get('fond') === 'ivoire') s.setNuit(0)
    const l = q.get('layout') as LayoutName | null
    const m = q.get('morph')
    if (l && LAYOUTS.includes(l) && l !== s.layout) {
      // En mode still, le morph est posé directement (pas de tween).
      s.setLayout(l)
      if (m !== null) {
        const v = Number(m)
        const poser = () => {
          u.uMorph.value = v
          s.setMorph(v)
        }
        if (s.still) setTimeout(poser, 50)
        else gsap.delayedCall(0.05, () => {
          gsap.killTweensOf(u.uMorph)
          poser()
        })
      }
    }
  }, [])

  // Tweakpane, chargé à la demande (dev uniquement, mais le bundle est séparé).
  useEffect(() => {
    if (!paneRef.current) return
    if (new URLSearchParams(window.location.search).get('pane') === '0') return
    let dispose = () => {}
    let annule = false
    import('tweakpane').then(({ Pane }) => {
      if (annule) return
      const s = useScene.getState()
      const params = { ...s.params }
      const p = new Pane({ container: paneRef.current!, title: 'Stack Engine' })
      const push = () => useScene.getState().setParams({ ...params })
      const f1 = p.addFolder({ title: 'Plaque & morph' })
      f1.addBinding(params, 'epaisseur', { min: 0, max: 4, step: 0.05 }).on('change', push)
      f1.addBinding(params, 'arc', { min: 0, max: 2, step: 0.05 }).on('change', push)
      f1.addBinding(params, 'retard', { min: 0, max: 0.9, step: 0.01 }).on('change', push)
      f1.addBinding(params, 'projection', { min: 0, max: 1, step: 0.01, label: 'ortho ↔ persp' }).on('change', push)
      const f2 = p.addFolder({ title: 'Pile' })
      f2.addBinding(params, 'parNiveau', { min: 1, max: 6, step: 1 }).on('change', push)
      f2.addBinding(params, 'ecart', { min: 0.03, max: 0.3, step: 0.005 }).on('change', push)
      f2.addBinding(params, 'torsion', { min: 0, max: 0.6, step: 0.005 }).on('change', push)
      f2.addBinding(params, 'rayon', { min: 0, max: 1.2, step: 0.01 }).on('change', push)
      f2.addBinding(params, 'chantier', { min: 0, max: 0.4, step: 0.01 }).on('change', push)
      f2.addBinding(params, 'echelle', { min: 0.1, max: 1, step: 0.01 }).on('change', push)
      f2.addBinding(params, 'hauteur', { min: 0.5, max: 12, step: 0.1 }).on('change', push)
      const f3 = p.addFolder({ title: 'Lumière' })
      f3.addBinding(params, 'ambiant', { min: 0, max: 1, step: 0.01 }).on('change', push)
      f3.addBinding(params, 'cle', { min: 0, max: 2, step: 0.01 }).on('change', push)
      f3.addBinding(params, 'fresnel', { min: 0, max: 1.5, step: 0.01 }).on('change', push)
      f3.addBinding(params, 'arete', { min: 0, max: 1.5, step: 0.01 }).on('change', push)
      f3.addBinding(params, 'halo', { min: 0, max: 0.6, step: 0.01 }).on('change', push)
      f3.addBinding(params, 'ombre', { min: 0, max: 1, step: 0.01 }).on('change', push)
      const etat = { nuit: s.nuit, morph: 0, isolate: -1 }
      const f4 = p.addFolder({ title: 'Scène' })
      f4.addBinding(etat, 'nuit', { min: 0, max: 1, step: 0.01 }).on('change', (e) => useScene.getState().setNuit(e.value))
      f4.addBinding(etat, 'morph', { min: 0, max: 1, step: 0.01 }).on('change', (e) => {
        const u = stackUniforms()
        gsap.killTweensOf(u.uMorph)
        u.uMorph.value = e.value
        useScene.getState().setMorph(e.value)
      })
      f4.addBinding(etat, 'isolate', { min: -1, max: 5, step: 1 }).on('change', (e) => useScene.getState().setIsolate(e.value))
      p.addButton({ title: 'Réinitialiser' }).on('click', () => {
        Object.assign(params, PARAMS_DEFAUT)
        push()
        p.refresh()
      })
      dispose = () => p.dispose()
    })
    return () => {
      annule = true
      dispose()
    }
  }, [])

  const aller = (l: LayoutName) => {
    if (l === layout) {
      // Rejouer le morph depuis l'autre forme.
      const autre = LAYOUTS.find((x) => x !== l)!
      useScene.getState().setLayout(autre)
      setTimeout(() => useScene.getState().setLayout(l), 1150)
      return
    }
    setLayout(l)
  }

  return (
    <main className="relative min-h-svh">
      <div
        {...bind()}
        className="absolute inset-0 touch-none select-none"
        style={{ cursor: 'grab' }}
        aria-label="Faire tourner la pile"
        role="img"
      />
      <div className="pointer-events-none relative mx-auto grid min-h-svh max-w-[1440px] grid-cols-12 gap-x-6 px-6">
        <StackFrame className="col-span-12 my-[10svh] min-h-[80svh] md:col-span-6 md:col-start-4" />
      </div>

      <header className="pointer-events-auto absolute left-6 top-6 flex flex-col gap-3" hidden={!hud}>
        <p className="su-mono" style={{ color: 'var(--su-texte-doux)' }}>
          LAB · Stack Engine · {tier} · {mode} · {fps} fps · morph {morph.toFixed(2)} · spin {spin.toFixed(2)}
        </p>
        <div className="flex gap-2">
          {LAYOUTS.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => aller(l)}
              className="su-mono rounded-[4px] px-3 py-2"
              style={{
                background: l === layout ? 'var(--su-ambre)' : 'transparent',
                color: l === layout ? 'var(--su-encre)' : 'var(--su-texte)',
                border: '1px solid var(--su-graphite)',
                boxShadow: l === layout ? 'var(--su-ombre)' : 'none',
              }}
              aria-pressed={l === layout}
            >
              {l}
            </button>
          ))}
          <button
            type="button"
            className="su-mono rounded-[4px] px-3 py-2"
            style={{ border: '1px solid var(--su-graphite)' }}
            onClick={() => {
              const u = stackUniforms()
              gsap.killTweensOf(u.uMorph)
              u.uMorph.value = 0.5
              useScene.getState().setMorph(0.5)
            }}
          >
            morph 0,5
          </button>
          <button
            type="button"
            className="su-mono rounded-[4px] px-3 py-2"
            style={{ border: '1px solid var(--su-graphite)' }}
            onClick={() => useScene.getState().setNuit(useScene.getState().nuit > 0.5 ? 0 : 1)}
          >
            nuit / jour
          </button>
        </div>
      </header>
      <div ref={paneRef} className="pointer-events-auto absolute right-6 top-6 w-[300px] max-md:hidden" />
    </main>
  )
}
