'use client'

/**
 * LA PLACE QU'UNE PAGE RÉSERVE À LA BANDE.
 *
 * Une boîte vide, mesurée en continu, dont la scène lit la position pour s'y
 * caler. C'est le mécanisme déjà employé par le hero, la section de l'offre
 * et les strates — extrait ici pour que n'importe quelle page puisse
 * l'utiliser sans le réécrire.
 *
 * POURQUOI UNE BOÎTE HTML PLUTÔT QU'UNE POSITION EN DUR. Un objet 3D calé
 * sur des coordonnées fixes se décale dès que la mise en page bouge : une
 * ligne de titre en plus, une largeur d'écran différente, et il n'est plus
 * en face de rien. Une boîte, elle, suit la grille comme le reste de la
 * page. C'est ce qui permet d'avoir un objet 3D aligné au pixel sur une mise
 * en page fluide, et de garder tout le texte en HTML.
 *
 * ELLE EST VIDE, ET C'EST VOULU : c'est une place, pas un contenu. Tout ce
 * que la scène montre est dit en clair ailleurs dans la page.
 */

import { useEffect, useRef } from 'react'
import { useBande } from '@/store/bande'

export default function AncrageScene({ className }: { className?: string }) {
  const boite = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = boite.current
    if (!el) return
    const { setAncrage } = useBande.getState()

    const relever = () => {
      const r = el.getBoundingClientRect()
      /* UNE BOÎTE SANS SURFACE N'EST PAS UNE PLACE.

         En portrait, ces boîtes passent en `display: none` : leur rectangle
         devient tout à zéro, et rapporter ce rectangle revenait à déclarer
         une place de hauteur nulle. L'objet s'y plaçait à l'échelle 0 —
         invisible à l'écran, mais toujours soumis au GPU, et le témoin
         comptait ses triangles. Un état masqué doit être un état ABSENT, pas
         un état réduit à rien. */
      if (r.width < 1 || r.height < 1) {
        setAncrage(null)
        return
      }
      setAncrage({
        cx: (r.left + r.width / 2) / window.innerWidth,
        cy: (r.top + r.height / 2) / window.innerHeight,
        hauteur: r.height / window.innerHeight,
      })
    }

    /* Au défilement AUSSI, pas seulement au redimensionnement : sinon
       l'objet reste épinglé à l'écran pendant que la page défile sous lui.
       Une fois par image au plus. */
    let image = 0
    let enAttente = false
    const suivre = () => {
      if (enAttente) return
      enAttente = true
      image = requestAnimationFrame(() => {
        enAttente = false
        relever()
      })
    }

    const vigie = new ResizeObserver(suivre)
    vigie.observe(el)
    window.addEventListener('scroll', suivre, { passive: true })
    window.addEventListener('resize', suivre)
    relever()
    return () => {
      cancelAnimationFrame(image)
      vigie.disconnect()
      window.removeEventListener('scroll', suivre)
      window.removeEventListener('resize', suivre)
      setAncrage(null)
    }
  }, [])

  return <div ref={boite} className={className} aria-hidden="true" />
}
