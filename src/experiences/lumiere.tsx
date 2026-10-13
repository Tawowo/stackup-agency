'use client'
/**
 * LA LUMIÈRE — nuit (1) ou ivoire (0), pilotée UNIQUEMENT par la position de
 * scroll. Chaque moment déclare `data-nuit` ; à chaque frontière entre deux
 * moments, la lumière change sur une rampe de 50 vh centrée sur la frontière,
 * mesurée au centre du viewport. Remonter donne exactement l'inverse. Les
 * positions sont relevées après chaque refresh de ScrollTrigger (épinglages).
 */
import { useEffect } from 'react'
import { ScrollTrigger, initGsap } from '@/lib/gsap'
import { useScene } from '@/webgl/store'

export default function Lumiere() {
  useEffect(() => {
    initGsap()
    let premiere = 1
    let bornes: { y: number; apres: number }[] = []
    const mesurer = () => {
      const items = Array.from(document.querySelectorAll<HTMLElement>('[data-moment][data-nuit]')).map((el) => ({
        top: el.getBoundingClientRect().top + window.scrollY,
        nuit: Number(el.dataset.nuit),
      }))
      premiere = items[0]?.nuit ?? 1
      bornes = items.slice(1).map((it) => ({ y: it.top, apres: it.nuit }))
      calculer()
    }
    const calculer = () => {
      const H = window.innerHeight
      const y = window.scrollY + H * 0.5
      let n = premiere
      for (const b of bornes) {
        let t = (y - (b.y - 0.25 * H)) / (0.5 * H)
        t = t < 0 ? 0 : t > 1 ? 1 : t
        t = t * t * (3 - 2 * t)
        n = n + (b.apres - n) * t
      }
      const s = useScene.getState()
      if (Math.abs(s.nuit - n) > 1e-4 || s.nuitForcee !== null) s.setNuit(n)
    }
    const st = ScrollTrigger.create({ start: 0, end: () => ScrollTrigger.maxScroll(window), onUpdate: calculer })
    ScrollTrigger.addEventListener('refresh', mesurer)
    mesurer()
    return () => {
      st.kill()
      ScrollTrigger.removeEventListener('refresh', mesurer)
    }
  }, [])
  return null
}
