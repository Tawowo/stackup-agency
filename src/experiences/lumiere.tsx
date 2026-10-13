'use client'
/**
 * LA LUMIÈRE — nuit (1) ou ivoire (0), pilotée UNIQUEMENT par la position de
 * scroll. Chaque moment déclare `data-nuit` ; à chaque frontière entre deux
 * moments, la lumière change sur une rampe de 40 vh centrée sur la frontière,
 * mesurée au centre du viewport. Remonter donne exactement l'inverse. Les
 * positions sont relevées après chaque refresh de ScrollTrigger (épinglages).
 */
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ScrollTrigger, initGsap } from '@/lib/gsap'
import { useScene } from '@/webgl/store'
import { MOT_DU_MOMENT } from '@/webgl/monde/mots'

export default function Lumiere() {
  const chemin = usePathname()
  useEffect(() => {
    initGsap()
    let premiere = 1
    let actif = false
    let bornes: { y: number; apres: number }[] = []
    let entrees: { y: number; mot: number }[] = []
    const mesurer = () => {
      const items = Array.from(document.querySelectorAll<HTMLElement>('[data-moment][data-nuit]')).map((el) => ({
        top: el.getBoundingClientRect().top + window.scrollY,
        nuit: Number(el.dataset.nuit),
      }))
      actif = items.length > 0
      premiere = items[0]?.nuit ?? 1
      bornes = items.slice(1).map((it) => ({ y: it.top, apres: it.nuit }))
      entrees = Array.from(document.querySelectorAll<HTMLElement>('[data-moment]'))
        .map((el) => ({ y: el.getBoundingClientRect().top + window.scrollY, mot: MOT_DU_MOMENT[el.dataset.moment ?? ''] ?? 0 }))
        .filter((e) => e.mot > 0)
      calculer()
    }
    const calculer = () => {
      // Une page sans `data-nuit` gère sa lumière elle-même.
      if (!actif) return
      const H = window.innerHeight
      const y = window.scrollY + H * 0.5
      let n = premiere
      for (const b of bornes) {
        let t = (y - (b.y - 0.2 * H)) / (0.4 * H)
        t = t < 0 ? 0 : t > 1 ? 1 : t
        t = t * t * (3 - 2 * t)
        n = n + (b.apres - n) * t
      }
      const s = useScene.getState()
      if (Math.abs(s.nuit - n) > 1e-4 || s.nuitForcee !== null) s.setNuit(n)
      // Le mot : quand le haut d'un moment traverse la zone 60 % → 0 % du viewport,
      // les flux l'écrivent (cloche : se forme, tient, se défait). Scroll seul.
      const yh = window.scrollY
      let mot = s.mot
      let forme = 0
      for (const e of entrees) {
        const q = (yh + H * 0.6 - e.y) / (H * 0.6)
        if (q > 0 && q < 1) {
          const cloche = Math.min(1, Math.sin(Math.PI * q) * 1.6)
          if (cloche > forme) {
            forme = cloche
            mot = e.mot
          }
        }
      }
      if (s.reduced) forme = 0
      if (Math.abs(forme - s.forme) > 1e-4 || mot !== s.mot) s.setMot(mot, forme)
    }
    const st = ScrollTrigger.create({ start: 0, end: () => ScrollTrigger.maxScroll(window), onUpdate: calculer })
    ScrollTrigger.addEventListener('refresh', mesurer)
    mesurer()
    // La page nouvellement montée pose ses sections après ce rendu : on remesure.
    const t = setTimeout(mesurer, 60)
    return () => {
      clearTimeout(t)
      st.kill()
      ScrollTrigger.removeEventListener('refresh', mesurer)
    }
  }, [chemin])
  return null
}
