'use client'

/**
 * UN CADRAN — un nombre qui roule d'une valeur réelle à une autre.
 *
 * Fiche 11.3 : « Pendant le morph, les cadrans affichent des chiffres
 * intermédiaires RÉELS (roues), jamais un nombre aléatoire. »
 *
 * POURQUOI CETTE RÈGLE EXISTE. Le réflexe, pour animer un prix qui change,
 * est de faire défiler des chiffres au hasard pendant une seconde avant de
 * poser la bonne valeur. C'est joli et c'est un mensonge : pendant une
 * seconde, le site affiche des prix qui ne sont les prix de rien. Sur un
 * site commercial, où le visiteur peut photographier l'écran, c'est un
 * mensonge coûteux. Ici le nombre affiché est toujours une interpolation
 * entre le prix de départ et le prix d'arrivée — donc toujours une valeur
 * comprise entre deux prix réels de la grille.
 *
 * POURQUOI PAS DE TRANSITION CSS. Un nombre n'est pas une longueur : le
 * navigateur ne sait pas interpoler « 449 € » vers « 1 647 € ». L'animation
 * se fait donc en JavaScript, sur `requestAnimationFrame`, et elle s'arrête
 * d'elle-même — pas de boucle permanente.
 *
 * MOUVEMENT RÉDUIT. La valeur est posée d'un coup. On retire l'animation,
 * on ne la remplace pas par une autre.
 */

import { useEffect, useRef, useState } from 'react'
import { useBande } from '@/store/bande'

/** Durée du roulement, calée sur celle du morph (fiche 11.3 : 1 100 ms). */
const DUREE = 1100

interface Props {
  /** La valeur à atteindre. */
  valeur: number
  /** Mise en forme — `toLocaleString` par défaut. */
  format?: (n: number) => string
  /** Unité affichée après le nombre, hors du roulement. */
  suffixe?: string
}

export default function Cadran({ valeur, format, suffixe }: Props) {
  const [affichee, setAffichee] = useState(valeur)
  const depuis = useRef(valeur)
  const image = useRef(0)

  useEffect(() => {
    const depart = depuis.current
    if (depart === valeur) return

    if (useBande.getState().mouvement === 'aucun') {
      depuis.current = valeur
      setAffichee(valeur)
      return
    }

    const t0 = performance.now()
    const pas = (t: number) => {
      const e = Math.min(1, (t - t0) / DUREE)
      // Même courbe que le morph des plaques : les deux doivent se finir
      // ensemble, sinon le nombre « attend » la forme.
      const k = e * e * (3 - 2 * e)
      const n = Math.round(depart + (valeur - depart) * k)
      setAffichee(n)
      if (e < 1) {
        image.current = requestAnimationFrame(pas)
      } else {
        depuis.current = valeur
      }
    }
    image.current = requestAnimationFrame(pas)
    return () => cancelAnimationFrame(image.current)
  }, [valeur])

  const texte = format ? format(affichee) : affichee.toLocaleString('fr-FR')

  return (
    <span className="su-cadran">
      {/* La valeur d'arrivée, en clair, pour les lecteurs d'écran : le
          roulement est un effet visuel et n'a pas à être annoncé chiffre
          par chiffre. */}
      <span aria-hidden="true">{texte}</span>
      <span className="sr-only">
        {format ? format(valeur) : valeur.toLocaleString('fr-FR')}
        {suffixe ? ` ${suffixe}` : ''}
      </span>
      {suffixe ? <span aria-hidden="true"> {suffixe}</span> : null}
    </span>
  )
}
