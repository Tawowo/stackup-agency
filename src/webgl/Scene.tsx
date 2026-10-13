'use client'
/**
 * LA SCÈNE PERSISTANTE — un canvas, monté une fois, jamais démonté.
 * `frameloop="never"` : c'est `gsap.ticker` qui avance le rendu. Un seul ticker
 * pour tout le site.
 *
 * LA FABRIQUE : autour de la pile, un monde persistant — le ciel (dégradé navy),
 * le sol d'atelier (grille, ombre, torche, dissolution), les flux de données,
 * le code vivant, la lampe ambre et sa poussière. La caméra est inclinée
 * (tangage) pour voir le sol ; elle glisse d'un moment à l'autre (la pile suit
 * sa boîte HTML avec un amortissement) et le sol se dissout pendant le trajet.
 */
import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Color, Group, Vector3 } from 'three'
import gsap from 'gsap'
import { damp } from 'maath/easing'
import { BlendCamera, PX_PAR_UNITE, DISTANCE } from './camera'
import { PLAQUES_PAR_PALIER, directionLumiere, stackUniforms } from './engine'
import { LOGO_VIEW, SVG_PAR_UNITE } from './logo-geometry'
import { Plates, type PlatesHandle } from './plates'
import Ciel from './monde/Ciel'
import Sol from './monde/Sol'
import Flux from './monde/Flux'
import CodeVivant from './monde/CodeVivant'
import Lampe from './monde/Lampe'
import Galerie from './monde/Galerie'
import Tapis from './monde/Tapis'
import { PROJETS } from '@/experiences/galerie/projets'
import { CIBLE_FPS, lireForcage, palierInferieur } from './quality'
import { useScene } from './store'

const FLUX_PAR_PALIER = { ultra: 1100, high: 900, medium: 600, low: 300 } as const
const POUSSIERE_PAR_PALIER = { ultra: 420, high: 360, medium: 220, low: 120 } as const

function Rig() {
  const u = stackUniforms()
  const set = useThree((s) => s.set)
  const size = useThree((s) => s.size)
  const gl = useThree((s) => s.gl)
  const advance = useThree((s) => s.advance)
  const camera = useMemo(() => new BlendCamera(), [])
  const groupRef = useRef<Group>(null)
  const mondeRef = useRef<Group>(null)
  const platesRef = useRef<PlatesHandle | null>(null)
  const tier = useScene((s) => s.tier)
  const count = PLAQUES_PAR_PALIER[tier]
  const p = useScene((s) => s.params)
  const monde = useScene((s) => s.monde)
  const plaques = p.plaques > 0

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
    let prevTarget = useScene.getState().target
    let prevPP = useScene.getState().pairParams
    return useScene.subscribe((s) => {
      const pl = platesRef.current
      if (!pl) return
      if (s.target !== prevTarget || s.pairParams !== prevPP) {
        // Une expérience pose la paire A → B et écrit uMorph elle-même.
        prevTarget = s.target
        prevPP = s.pairParams
        prev = s.layout
        gsap.killTweensOf(u.uMorph)
        pl.setPair(s.layout, s.target, s.pairParams)
        if (!s.target) u.uMorph.value = 0
        return
      }
      if (s.layout !== prev) {
        prev = s.layout
        if (s.target) {
          pl.setPair(s.layout, s.target, s.pairParams)
          return
        }
        pl.setTarget(s.layout)
        if (!s.still && !s.scrub) {
          gsap.to(u.uMorph, { value: 1, duration: 1.1, ease: 'power2.inOut', onUpdate: () => useScene.getState().setMorph(u.uMorph.value) })
        }
      }
    })
  }, [u])

  // Pointeur (torche) et clic (bascule d'une plaque).
  useEffect(() => {
    const px = { x: 0, y: 0, active: false, clic: null as { x: number; y: number } | null }
    let down: { x: number; y: number; t: number; cible: boolean } | null = null
    const racine = document.documentElement
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      px.x = e.clientX
      px.y = e.clientY
      px.active = true
      // La lumière suit le pointeur sur toute la page (calque CSS .su-lueur).
      racine.style.setProperty('--su-mx', `${e.clientX}px`)
      racine.style.setProperty('--su-my', `${e.clientY}px`)
      racine.dataset.suLueur = '1'
    }
    const leave = () => {
      px.active = false
      delete racine.dataset.suLueur
    }
    const interactif = (t: EventTarget | null) => t instanceof Element && !!t.closest('a,button,input,select,textarea,label,summary,[data-su-pane]')
    const pdown = (e: PointerEvent) => {
      down = { x: e.clientX, y: e.clientY, t: performance.now(), cible: interactif(e.target) }
    }
    const pup = (e: PointerEvent) => {
      if (!down) return
      const d = down
      down = null
      if (d.cible || Math.hypot(e.clientX - d.x, e.clientY - d.y) > 6 || performance.now() - d.t > 500) return
      px.clic = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', pdown, { passive: true })
    window.addEventListener('pointerup', pup, { passive: true })
    document.addEventListener('mouseleave', leave)
    const store = { px }
    ;(window as unknown as { __suPointer: typeof store }).__suPointer = store
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', pdown)
      window.removeEventListener('pointerup', pup)
      document.removeEventListener('mouseleave', leave)
    }
  }, [])

  // LE TICKER UNIQUE.
  useEffect(() => {
    let t = 0
    let acc = 0
    let frames = 0
    let sousCible = 0
    let premier = true
    let boiteVue = false
    let scrollPrec = window.scrollY
    const cible = { x: 0, y: 0, s: 1 }
    const stackPos = { x: 0, y: 0, s: 1 }
    const orbit = { x: 0, y: 0 }
    const spin = { y: 0, x: 0 }
    const lisse = { px: 0, py: 0, proj: 1, el: 0, dissolve: 0, vitesse: 0, probe: 0 }
    const accent = new Color()
    const lumiere = directionLumiere()
    const lum = new Vector3()
    const a = new Vector3()
    const b = new Vector3()
    const dir = new Vector3()
    const probe = new Vector3()
    const probeDeep = new Vector3()
    const local = new Vector3()
    const lampe = new Vector3()
    const ecran = new Vector3()
    const pas = (deltaMs: number, rendre: boolean) => {
      const s = useScene.getState()
      if (document.hidden || !s.active) return
      const dtReel = deltaMs / 1000
      const dt = Math.min(dtReel, 0.1)
      if (!s.still) t += dt
      const prm = s.params
      u.uTime.value = t
      u.uScan.value = (t / 9) % 1
      u.uNuit.value = s.nuit
      u.uIsolate.value = s.isolate
      u.uIsoPush.value = prm.isoPush
      u.uIsoDim.value = prm.isoDim
      u.uArc.value = prm.arc
      u.uDelay.value = prm.retard
      u.uEpaisseur.value = prm.epaisseur
      u.uAmbient.value = prm.ambiant
      u.uKey.value = prm.cle
      u.uFresnel.value = prm.fresnel
      u.uEdge.value = prm.arete
      u.uHalo.value = prm.halo
      u.uShadow.value = prm.ombre
      u.uWall.value = prm.mur
      u.uGrain.value = prm.grain
      u.uFlux.value = prm.fluxIntensite * prm.flux
      u.uCode.value = prm.codeOpacite * prm.code
      u.uLampeForce.value = prm.lampe
      u.uRim.value = prm.rim
      u.uMot.value = s.mot
      u.uForme.value = s.forme
      {
        // Le mot s'écrit dans la zone libre : moitié droite sur grand écran, haut de l'écran sur mobile.
        const Wu = size.width / PX_PAR_UNITE
        const Hu = size.height / PX_PAR_UNITE
        if (size.width >= 768) u.uMotCadre.value.set(Wu * 0.22, Hu * 0.12, 0.8, Math.min(Wu * 0.22, 3.4))
        else u.uMotCadre.value.set(0, Hu * 0.22, 0.8, Wu * 0.42)
      }
      u.uFlash.value = prm.flash
      u.uBreath.value = s.still || s.calme ? 0 : 1
      accent.set(s.accent)
      u.uAccent.value.copy(accent)

      // Vitesse de scroll (normalisée) et étage : les flux accélèrent, le code défile.
      const sy = window.scrollY
      const v = dt > 0 ? Math.min(1, Math.abs(sy - scrollPrec) / dt / 2600) : 0
      scrollPrec = sy
      damp(lisse, 'vitesse', Math.max(v, s.vitesse), 0.25, dt)
      u.uVitesse.value = lisse.vitesse
      if (!s.still) u.uFlowTime.value += dt * (0.5 + 3.0 * lisse.vitesse)
      u.uEtage.value = s.etage || sy / Math.max(1, window.innerHeight)

      // Projection, pose et tangage : amortis (un changement de section ne saute pas).
      const elCible = (prm.tangage * Math.PI) / 180
      if (s.still || premier) {
        lisse.proj = s.projection
        lisse.px = s.pose.x
        lisse.py = s.pose.y
        lisse.el = elCible
      } else {
        damp(lisse, 'proj', s.projection, 0.18, dt)
        damp(lisse, 'px', s.pose.x, 0.25, dt)
        damp(lisse, 'py', s.pose.y, 0.25, dt)
        damp(lisse, 'el', elCible, 0.3, dt)
      }
      camera.blend = lisse.proj
      u.uOrtho.value = lisse.proj
      camera.updateProjectionMatrix()
      const el = lisse.el
      // LA PLONGÉE : pendant une traversée (sol dissous), la caméra avance dans la scène
      // et la mise au point passe de la pile au fond (le code devient net), puis revient.
      const plonge = s.reduced ? 0 : lisse.dissolve
      const dist = DISTANCE * (1 - 0.32 * plonge) * (1 - 0.38 * prm.approche)
      camera.position.set(0, dist * Math.sin(el + 0.06 * plonge), dist * Math.cos(el + 0.06 * plonge))
      u.uFocus.value = plonge
      camera.lookAt(0, 0, 0)
      camera.updateMatrixWorld()

      // Lumière : la lampe, en haut à gauche, devant ; l'inclinaison du téléphone la déplace.
      lum.copy(lumiere)
      lum.x += s.inclinaison.x * 0.45
      lum.z += s.inclinaison.y * 0.25
      u.uLight.value.copy(lum.normalize())

      // Cadrage : la boîte HTML → position et échelle du groupe, avec glissement.
      const g = groupRef.current
      if (g) {
        const f = s.frame
        const W = size.width
        const H = size.height
        if (f) {
          cible.x = (f.x + f.w / 2 - W / 2) / PX_PAR_UNITE
          // Avec le tangage, le plan z = 0 est vu en légère plongée : on compense la hauteur.
          cible.y = (H / 2 - (f.y + f.h / 2)) / PX_PAR_UNITE / Math.cos(el)
          cible.s = Math.min(f.w / LOGO_VIEW.w, f.h / LOGO_VIEW.h) * (SVG_PAR_UNITE / PX_PAR_UNITE)
          // Mouvement réduit : le logo figé remplit les boîtes des autres moments (souvent larges) ;
          // on le garde plus petit pour qu'il ne passe pas derrière leur texte.
          if (s.reduced && s.moment !== '00') cible.s *= 0.6
        } else {
          // Sans boîte déclarée : logo en coin, petit, qui respire.
          cible.s = 0.4
          cible.x = W / PX_PAR_UNITE / 2 - 1.1
          cible.y = -H / PX_PAR_UNITE / 2 + 1.3
        }
        // Le glissement : la pile rejoint sa boîte en ~0,35 s. Le trajet dissout le sol.
        let dist = Math.hypot(cible.x - stackPos.x, cible.y - stackPos.y) + Math.abs(cible.s - stackPos.s) * 2
        // La première boîte mesurée est prise sans glissement (le sol naît en place).
        const naissance = !!f && !boiteVue
        if (f) boiteVue = true
        if (s.still || premier || s.reduced || naissance) {
          stackPos.x = cible.x
          stackPos.y = cible.y
          stackPos.s = cible.s
          dist = 0
        } else {
          damp(stackPos, 'x', cible.x, 0.22, dt)
          damp(stackPos, 'y', cible.y, 0.22, dt)
          damp(stackPos, 's', cible.s, 0.22, dt)
        }
        const dissolveCible = Math.max(gsap.utils.clamp(0, 1, (dist - 0.08) / 1.1), s.dissolve, f ? 0 : 1)
        if (s.still || premier || naissance) lisse.dissolve = dissolveCible
        else damp(lisse, 'dissolve', dissolveCible, dissolveCible > lisse.dissolve ? 0.08 : 0.22, dt)
        u.uDissolve.value = lisse.dissolve
        // Départ : l'enveloppe monte, rapetisse et file au fond de la scène.
        const fu = prm.fuite
        const fuE = fu * fu
        g.position.set(stackPos.x + fu * 0.6, stackPos.y + fu * 1.4, -fuE * 9)
        g.scale.setScalar(stackPos.s * (1 - 0.55 * fu))
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
        // reste calée au pixel sur sa boîte HTML.
        const fige = s.still || s.calme
        const dx = fige ? 0 : (Math.sin((t * 2 * Math.PI) / 12) * 2 * Math.PI) / 180
        const dy = fige ? 0 : (Math.sin((t * 2 * Math.PI) / 17) * 1.2 * Math.PI) / 180
        g.rotation.set(spin.x + dy + orbit.y + lisse.px, spin.y + dx + orbit.x + lisse.py, 0)
        g.updateMatrixWorld()
        // Le monde (code vivant) suit la pile sans tourner avec elle.
        const m = mondeRef.current
        if (m) {
          m.position.set(stackPos.x, stackPos.y, 0)
          // Le code vivant garde une taille de lecture : il ne grandit pas avec un logo géant.
          m.scale.setScalar(gsap.utils.clamp(0.8, 1.7, stackPos.s))
        }
        // Zone d'exclusion (titre) → repère local du groupe.
        const ex = s.exclusion
        if (ex && ex.w > 0) {
          const lx = (px: number) => ((px - W / 2) / PX_PAR_UNITE - stackPos.x) / stackPos.s
          const ly = (py: number) => ((H / 2 - py) / PX_PAR_UNITE / Math.cos(el) - stackPos.y) / stackPos.s
          u.uExclu.value.set(lx(ex.x), ly(ex.y + ex.h), lx(ex.x + ex.w), ly(ex.y))
          u.uExcluActive.value = 1
        } else u.uExcluActive.value = 0
        // Le sol : sous le bas de la forme courante ; la lampe : en haut à gauche, devant.
        const pl = platesRef.current
        const morph = u.uMorph.value
        const solLocal = pl ? pl.solA + (pl.solB - pl.solA) * morph : -1.2
        const murLocal = pl ? pl.murA + (pl.murB - pl.murA) * morph : -0.3
        u.uWallZ.value = murLocal * stackPos.s
        u.uSolY.value = stackPos.y + (solLocal - prm.solMarge) * stackPos.s
        u.uStack.value.set(stackPos.x, stackPos.y, stackPos.s, 1)
        // La lumière part du logo : la plaque ambre, où qu'elle soit dans la forme courante,
        // est la source (l'inclinaison du téléphone la décale).
        if (pl) {
          pl.ambre(lampe)
          lampe.x += s.inclinaison.x * 0.5
          lampe.y += s.inclinaison.y * 0.3
          lampe.z += 0.45
          g.localToWorld(lampe)
          u.uLampe.value.lerp(lampe, premier ? 1 : Math.min(1, dt * 8))
        } else u.uLampe.value.set(stackPos.x, stackPos.y - 0.58 * stackPos.s, 0.45 * stackPos.s)
        u.uBox.value.set(-1.2, s.layout === 'pile' || s.target === 'pile' ? 6 : 1.2)
        // Centre de la pile à l'écran (pour le halo du ciel).
        ecran.set(stackPos.x, stackPos.y, 0).project(camera)
        const dprE = gl.getPixelRatio()
        u.uStackEcran.value.set((ecran.x * 0.5 + 0.5) * W * dprE, (ecran.y * 0.5 + 0.5) * H * dprE, stackPos.s * PX_PAR_UNITE * dprE)

        // La torche : le rayon du pointeur frappe le sol (uProbe) et le plan de la pile (uProbeDeep).
        const ptr = (window as unknown as { __suPointer?: { px: { x: number; y: number; active: boolean; clic: { x: number; y: number } | null } } }).__suPointer?.px
        const frapper = (cx: number, cy: number) => {
          const nx = (cx / W) * 2 - 1
          const ny = -(cy / H) * 2 + 1
          a.set(nx, ny, -1).unproject(camera)
          b.set(nx, ny, 1).unproject(camera)
          dir.subVectors(b, a)
          // Plan du sol y = uSolY.
          const ts = (u.uSolY.value - a.y) / (dir.y || 1e-6)
          probe.copy(a).addScaledVector(dir, ts)
          // Plan de la pile z = 0.
          const tz = (0 - a.z) / (dir.z || 1e-6)
          probeDeep.copy(a).addScaledVector(dir, tz)
        }
        if (ptr && ptr.active && !s.still) {
          frapper(ptr.x, ptr.y)
          u.uProbe.value.lerp(probe, Math.min(1, dt * 10))
          u.uProbeDeep.value.lerp(probeDeep, Math.min(1, dt * 10))
          u.uProbeActive.value += (1 - u.uProbeActive.value) * Math.min(1, dt * 6)
          u.uProbeRadius.value = 1.3 * gsap.utils.clamp(0.6, 1.4, stackPos.s)
          local.copy(u.uProbeDeep.value)
          g.worldToLocal(local)
          u.uPointer.value.copy(local)
          u.uPointerActive.value += (1 - u.uPointerActive.value) * Math.min(1, dt * 6)
          orbit.x = ((ptr.x / W - 0.5) * 6 * Math.PI) / 180
          orbit.y = ((ptr.y / H - 0.5) * -6 * Math.PI) / 180
        } else {
          u.uProbeActive.value *= 1 - Math.min(1, dt * 4)
          u.uPointerActive.value *= 1 - Math.min(1, dt * 4)
          orbit.x *= 1 - Math.min(1, dt * 2)
          orbit.y *= 1 - Math.min(1, dt * 2)
        }
        // Clic : la plaque sous le pointeur bascule et montre sa face produit ;
        // ailleurs, une onde part du point touché sur le sol et souffle les flux.
        if (ptr && ptr.clic && pl) {
          frapper(ptr.clic.x, ptr.clic.y)
          ptr.clic = null
          local.copy(probeDeep)
          g.worldToLocal(local)
          const touche = pl.basculer(local.x, local.y)
          if (!touche && !s.reduced) u.uOnde.value.set(probe.x, probe.z, u.uTime.value, 1)
        }
      }

      if (rendre) advance(performance.now())
      premier = false
      if (!rendre) return

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
    const tick = (_time: number, deltaMs: number) => pas(deltaMs, true)
    gsap.ticker.add(tick)
    // Captures (SwiftShader, 1-3 i/s) : avance la simulation sans rendre, pour
    // obtenir l'état qu'un visiteur à 60 i/s verrait après `n` trames.
    if (process.env.NODE_ENV !== 'production') (window as unknown as { __suCam?: BlendCamera }).__suCam = camera
    // QA : lecture de l'état de la scène depuis les sondes Playwright (dev seulement).
    if (process.env.NODE_ENV !== 'production') (window as unknown as { __suEtat?: () => unknown }).__suEtat = () => useScene.getState()
    const w = window as unknown as { __suSettle?: (n?: number) => void }
    w.__suSettle = (n = 120) => {
      // Les écouteurs de scroll (boîtes, ScrollTrigger, lumière) d'abord, de façon synchrone.
      window.dispatchEvent(new Event('scroll'))
      ;(window as unknown as { __suST?: { update: () => void } }).__suST?.update()
      for (let i = 0; i < n; i++) pas(1000 / 60, false)
    }
    return () => {
      gsap.ticker.remove(tick)
      delete w.__suSettle
    }
  }, [u, camera, advance, size, gl])

  return (
    <>
      <Ciel />
      {p.sol > 0 && <Sol />}
      {p.lampe > 0 && <Lampe poussiere={POUSSIERE_PAR_PALIER[tier]} />}
      <group ref={mondeRef}>{p.code > 0 && <CodeVivant />}</group>
      {monde === 'galerie' && <Galerie projets={PROJETS} />}
      {monde === 'tapis' && <Tapis />}
      <group ref={groupRef}>
        {plaques && <Plates count={count} handleRef={platesRef} />}
        {p.flux > 0 && <Flux count={FLUX_PAR_PALIER[tier]} />}
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
          gl.setClearColor(new Color('#0B1E36'), 1)
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault()
            setMode('2d')
          })
        }}
      >
        <Rig />
      </Canvas>
    </div>
  )
}
