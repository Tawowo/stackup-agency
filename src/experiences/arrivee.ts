'use client'
/**
 * ARRIVÉE PAR LE SCROLL — la règle de calibrage : aucune transition de scène
 * dépendante du temps. Quand une section non épinglée entre dans le viewport,
 * la pile morphe de la forme précédente vers la sienne, pilotée uniquement par
 * la position de scroll (rampe « haut de section au bas du viewport » →
 * « haut de section à 55 % »). Remonter rejoue la rampe à l'envers, à
 * l'identique. À la fin de la rampe, la forme est « commise » : les
 * interactions de la section (onglets, aiguille) peuvent ensuite la changer.
 */
import { ScrollTrigger, gsap } from '@/lib/gsap'
import { stackUniforms } from '@/webgl/engine'
import type { LayoutName, LayoutParams } from '@/webgl/layouts'
import { useScene, type Pose, type SceneParams } from '@/webgl/store'

export interface Arrivee {
  moment: string
  layout: LayoutName
  pose: Pose
  projection: number
  /** Paramètres posés à l'arrivée (ex. etape, modules, isoPush). */
  params?: Partial<SceneParams>
  /** Surcharge de paramètres pour la forme d'arrivée seulement. */
  paramsB?: Partial<LayoutParams>
  /** Pile à l'arrêt (ombre longue) tant que la section est en vue. */
  calme?: boolean
  /** Fin de la rampe (par défaut : haut de section à 55 % du viewport). */
  fin?: string
  /** Appelé quand la section prend ou reprend la main (forme commise). */
  onPrise?: () => void
  onSortie?: () => void
}

const lisser = gsap.parseEase('power2.inOut')

export function arriverParScroll(el: HTMLElement, o: Arrivee): () => void {
  const u = stackUniforms()
  type Phase = 'hors' | 'rampe' | 'commis'
  let phase: Phase = 'hors'
  // La forme d'où l'on vient (la forme finale de la section précédente).
  let avant: { layout: LayoutName; params?: Partial<LayoutParams> } | null = null

  const poser = () => {
    const s = useScene.getState()
    s.setMoment(o.moment)
    s.setPose(o.pose)
    s.setProjection(o.projection)
    s.setParams({ retard: 0.25, flash: 0, arc: 0.6, ...(o.params ?? {}) })
    if (o.calme !== undefined) s.setCalme(o.calme)
  }
  const commettre = () => {
    const s = useScene.getState()
    s.setScrub(false)
    s.setPair(o.layout, null, o.paramsB ? { a: o.paramsB } : {})
    phase = 'commis'
    o.onPrise?.()
  }
  const mienne = () => useScene.getState().moment === o.moment

  const rampe = ScrollTrigger.create({
    trigger: el,
    start: 'top 100%',
    end: o.fin ?? 'top 55%',
    scrub: true,
    onUpdate: (self) => {
      const s = useScene.getState()
      const p = self.progress
      if (s.reduced) {
        // Mouvement réduit : le moteur reste figé sur le logo ; la section ne
        // prend que la main (moment, pose, calme), jamais la forme.
        if (p > 0.5 && phase !== 'commis') {
          poser()
          phase = 'commis'
          o.onPrise?.()
        }
        return
      }
      if (p <= 0) {
        // Rendue à la section précédente : elle reprend la main par ses propres déclencheurs.
        if (phase === 'rampe' && mienne()) u.uMorph.value = 0
        phase = 'hors'
        return
      }
      if (p >= 1) {
        if (phase !== 'commis') {
          if (phase === 'hors') poser()
          commettre()
        }
        return
      }
      if (phase !== 'rampe') {
        if (phase === 'hors') {
          // On arrive d'en haut : on part de la forme courante de la scène.
          avant = s.target ? { layout: s.target, params: s.pairParams.b } : { layout: s.layout, params: s.pairParams.a }
        }
        // D'en bas (forme commise) : on repart vers la forme d'avant, déjà connue.
        poser()
        s.setScrub(true)
        s.setPair(avant?.layout ?? s.layout, o.layout, { a: avant?.params, b: o.paramsB })
        phase = 'rampe'
      }
      if (mienne()) u.uMorph.value = lisser(p)
    },
  })
  // La section reprend la main quand on y revient (d'en bas) : forme commise, pose, calme.
  const reprendre = () => {
    if (phase !== 'commis' || mienne()) return
    poser()
    if (!useScene.getState().reduced) useScene.getState().setPair(o.layout, null, o.paramsB ? { a: o.paramsB } : {})
    o.onPrise?.()
  }
  const garde = ScrollTrigger.create({
    trigger: el,
    start: o.fin ?? 'top 55%',
    end: 'bottom 45%',
    onEnterBack: () => reprendre(),
    onEnter: () => reprendre(),
    onLeave: () => {
      if (o.calme) useScene.getState().setCalme(false)
      o.onSortie?.()
    },
    onLeaveBack: () => {
      if (o.calme) useScene.getState().setCalme(false)
      o.onSortie?.()
    },
  })
  return () => {
    rampe.kill()
    garde.kill()
    if (o.calme) useScene.getState().setCalme(false)
  }
}
