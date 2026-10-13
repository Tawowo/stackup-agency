'use client'
/**
 * LA SCÈNE PERSISTANTE — un canvas, monté une fois, jamais démonté.
 * `frameloop="never"` : c'est `gsap.ticker` qui avance le rendu. Un seul ticker
 * pour tout le site.
 */
import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Color, Group, Mesh, PlaneGeometry, Vector2 } from 'three'
import gsap from 'gsap'
import { damp } from 'maath/easing'
import { BlendCamera, PX_PAR_UNITE, DISTANCE } from './camera'
import { PLAQUES_PAR_PALIER, stackUniforms } from './engine'
import { LOGO_VIEW, SVG_PAR_UNITE } from './logo-geometry'
import { wallMaterial } from './materials/wall'
import { Plates, type PlatesHandle } from './plates'
import { CIBLE_FPS, lireForcage, palierInferieur } from './quality'
import { useScene } from './store'

function Rig() {
  const u = stackUniforms()
  const set = useThree((s) => s.set)
  const size = useThree((s) => s.size)
  const gl = useThree((s) => s.gl)
  const advance = useThree((s) => s.advance)
  const camera = useMemo(() => new BlendCamera(), [])
  const groupRef = useRef<Group>(null)
  const wallRef = useRef<Mesh>(null)
  const platesRef = useRef<PlatesHandle | null>(null)
  const wallMat = useMemo(() => wallMaterial(u), [u])
  const wallGeo = useMemo(() => new PlaneGeometry(400, 400), [])
  const count = PLAQUES_PAR_PALIER[useScene((s) => s.tier)]
  const plaques = useScene((s) => s.params.plaques) > 0

  useEffect(() => {
    camera.position.set(0, 0, DISTANCE)
    camera.lookAt(0, 0, 0)
    set({ camera })
  }, [camera, set])

  useEffect(() => {
    camera.setSize(size.width, size.height)
    u.uResolution.value.set(size.width * gl.getPixelRatio(), size.height * gl.getPixelRatio())
  }, [size, camera, u, gl])

  // Layout cible : les pages écrivent `layout` dans le store, le moteur morphe.
  useEffect(() => {
    let prev = useScene.getState().layout
    return useScene.subscribe((s) => {
      if (s.layout !== prev && platesRef.current) {
        prev = s.layout
        platesRef.current.setTarget(s.layout)
        if (!s.still) {
          gsap.to(u.uMorph, { value: 1, duration: 1.1, ease: 'power2.inOut', onUpdate: () => useScene.getState().setMorph(u.uMorph.value) })
        }
      }
    })
  }, [u])

  // Pointeur : impact dans le plan de la pile, en unités locales du groupe.
  useEffect(() => {
    const px = { x: 0, y: 0, active: false }
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      px.x = e.clientX
      px.y = e.clientY
      px.active = true
    }
    const leave = () => (px.active = false)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerleave', leave)
    document.addEventListener('mouseleave', leave)
    const store = { px }
    ;(window as unknown as { __suPointer: typeof store }).__suPointer = store
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerleave', leave)
      document.removeEventListener('mouseleave', leave)
    }
  }, [])

  // LE TICKER UNIQUE.
  useEffect(() => {
    let t = 0
    let acc = 0
    let frames = 0
    let sousCible = 0
    const stackPos = { x: 0, y: 0, s: 1 }
    const orbit = { x: 0, y: 0 }
    const spin = { y: 0, x: 0 }
    const accent = new Color()
    const tick = (_time: number, deltaMs: number) => {
      const s = useScene.getState()
      if (document.hidden || !s.active) return
      const dtReel = deltaMs / 1000
      const dt = Math.min(dtReel, 0.05)
      if (!s.still) t += dt
      u.uTime.value = t
      u.uScan.value = (t / 9) % 1
      u.uNuit.value = s.nuit
      u.uIsolate.value = s.isolate
      u.uArc.value = s.params.arc
      u.uDelay.value = s.params.retard
      u.uEpaisseur.value = s.params.epaisseur
      u.uAmbient.value = s.params.ambiant
      u.uKey.value = s.params.cle
      u.uFresnel.value = s.params.fresnel
      u.uEdge.value = s.params.arete
      u.uHalo.value = s.params.halo
      u.uShadow.value = s.params.ombre
      u.uWall.value = s.params.mur
      u.uGrain.value = s.params.grain
      u.uBreath.value = s.still ? 0 : 1
      accent.set(s.accent)
      u.uAccent.value.copy(accent)

      // Projection : ortho ↔ perspective.
      camera.blend = s.params.projection
      u.uOrtho.value = s.params.projection
      camera.updateProjectionMatrix()

      // Cadrage : la boîte HTML → position et échelle du groupe.
      const g = groupRef.current
      if (g) {
        const f = s.frame
        const W = size.width
        const H = size.height
        if (f) {
          stackPos.x = (f.x + f.w / 2 - W / 2) / PX_PAR_UNITE
          stackPos.y = (H / 2 - (f.y + f.h / 2)) / PX_PAR_UNITE
          stackPos.s = Math.min(f.w / LOGO_VIEW.w, f.h / LOGO_VIEW.h) * (SVG_PAR_UNITE / PX_PAR_UNITE)
        } else {
          // Sans boîte déclarée : logo en coin, petit, qui respire.
          stackPos.s = 0.4
          stackPos.x = W / PX_PAR_UNITE / 2 - 1.1
          stackPos.y = -H / PX_PAR_UNITE / 2 + 1.3
        }
        g.position.set(stackPos.x, stackPos.y, 0)
        g.scale.setScalar(stackPos.s)
        // Drag : rotation avec inertie, retour lent.
        if (!s.dragging) {
          damp(spin, 'y', 0, 1.2, dt)
          damp(spin, 'x', 0, 1.2, dt)
        } else {
          spin.y = s.spin
          spin.x = s.tilt
        }
        if (!s.dragging && (Math.abs(spin.y - s.spin) > 1e-4 || Math.abs(spin.x - s.tilt) > 1e-4)) {
          s.setSpin(spin.y, spin.x, false)
        }
        // Dérive (orbite ±2° sur 12 s) et parallaxe du pointeur (±3°) :
        // appliquées au groupe, autour de son propre centre, pour que la pile
        // reste calée au pixel sur sa boîte HTML. La caméra ne bouge jamais.
        const dx = s.still ? 0 : (Math.sin((t * 2 * Math.PI) / 12) * 2 * Math.PI) / 180
        const dy = s.still ? 0 : (Math.sin((t * 2 * Math.PI) / 17) * 1.2 * Math.PI) / 180
        g.rotation.set(spin.x + dy + orbit.y, spin.y + dx + orbit.x, 0)
        // Mur et halo.
        const p = platesRef.current
        const murLocal = p ? p.murA + (p.murB - p.murA) * u.uMorph.value : -0.3
        u.uWallZ.value = murLocal * stackPos.s
        u.uStack.value.set(stackPos.x, stackPos.y, stackPos.s, 1)
        u.uBox.value.set(-1.2, s.layout === 'pile' ? 6 : 1.2)
        if (wallRef.current) wallRef.current.position.set(0, 0, u.uWallZ.value - 0.02)
        // Pointeur → repère local.
        const ptr = (window as unknown as { __suPointer?: { px: { x: number; y: number; active: boolean } } }).__suPointer?.px
        if (ptr && ptr.active && !s.still) {
          const wx = (ptr.x - W / 2) / PX_PAR_UNITE
          const wy = (H / 2 - ptr.y) / PX_PAR_UNITE
          u.uPointer.value.set((wx - stackPos.x) / stackPos.s, (wy - stackPos.y) / stackPos.s, 0)
          u.uPointerActive.value += (1 - u.uPointerActive.value) * Math.min(1, dt * 6)
          orbit.x = ((ptr.x / W - 0.5) * 6 * Math.PI) / 180
          orbit.y = ((ptr.y / H - 0.5) * -6 * Math.PI) / 180
        } else {
          u.uPointerActive.value *= 1 - Math.min(1, dt * 4)
          orbit.x *= 1 - Math.min(1, dt * 2)
          orbit.y *= 1 - Math.min(1, dt * 2)
        }
      }
      camera.position.set(0, 0, DISTANCE)
      camera.lookAt(0, 0, 0)
      camera.updateMatrixWorld()

      advance(_time)

      // Moniteur : moyenne glissante sur le temps RÉEL, baisse du DPR puis du palier.
      acc += dtReel
      frames++
      if (acc >= 1) {
        const fps = frames / acc
        s.setFps(Math.round(fps))
        acc = 0
        frames = 0
        // Palier forcé (?quality=) : aucune dégradation automatique.
        if (!s.still && !lireForcage() && fps < CIBLE_FPS[s.tier]) {
          sousCible++
          if (sousCible >= 3) {
            sousCible = 0
            const dpr = gl.getPixelRatio()
            if (dpr > 1) gl.setPixelRatio(Math.max(1, dpr - 0.25))
            else if (s.tier !== 'low') s.setTier(palierInferieur(s.tier))
            else s.setMode('2d')
          }
        } else sousCible = 0
      }
      if (!s.ready) s.setReady(true)
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [u, camera, advance, size, gl])

  return (
    <>
      <mesh ref={wallRef} geometry={wallGeo} material={wallMat} renderOrder={-2} frustumCulled={false} />
      <group ref={groupRef}>
        {plaques && <Plates count={count} handleRef={platesRef} />}
      </group>
    </>
  )
}

export default function Scene() {
  const setMode = useScene((s) => s.setMode)
  // Diagnostic (/lab) : ?aa=0 coupe l'anticrénelage.
  const aa = typeof window === 'undefined' || new URLSearchParams(window.location.search).get('aa') !== '0'
  return (
    <div className="su-canvas" aria-hidden="true">
      <Canvas
        frameloop="never"
        dpr={[1, 1.5]}
        gl={{ antialias: aa, alpha: false, powerPreference: 'high-performance', stencil: false }}
        eventSource={typeof document !== 'undefined' ? document.body : undefined}
        onCreated={({ gl }) => {
          gl.setClearColor(new Color('#060B14'), 1)
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault()
            setMode('2d')
          })
          const r = new Vector2()
          gl.getSize(r)
        }}
      >
        <Rig />
      </Canvas>
    </div>
  )
}
