'use client'

/**
 * Monture du PASSAGE.
 *
 * Un canvas fixe, plein écran, derrière tout le contenu. Il n'est monté que
 * sur la page d'accueil et vit pendant toute la traversée — il ne redémarre
 * à aucune section.
 *
 * Trois replis, dans cet ordre :
 *  1. Mouvement réduit → aucun canvas, l'ambiance reste au jour.
 *  2. Pas de WebGL → aucun canvas, mais la traversée jour → nuit → jour a
 *     quand même lieu, pilotée en CSS par un observateur de défilement.
 *  3. Création refusée par le pilote → idem.
 *
 * Dans les trois cas la page reste complète et lisible : la scène est un
 * enrichissement, jamais un prérequis.
 */

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ControlePassage } from '@/lib/webgl/passage'

/**
 * Repli : fait voyager `--su-nuit` au fil du défilement sans aucun WebGL.
 * L'identité de la traversée tient d'abord au fond de la page, pas aux
 * particules — c'est ce qui permet au repli d'être crédible.
 */
function useAmbianceSeule(actif: boolean) {
  useEffect(() => {
    if (!actif) return
    const racine = document.documentElement

    const ancres = () =>
      Array.from(document.querySelectorAll<HTMLElement>('[data-scene]')).map((el) => {
        const r = el.getBoundingClientRect()
        return {
          nuit: Number(el.dataset.nuit ?? 0),
          centre: r.top + window.scrollY + r.height / 2 - window.innerHeight / 2,
        }
      })

    let liste = ancres()
    let attente = false

    const maj = () => {
      if (liste.length === 0) return
      const y = window.scrollY
      let i = 0
      while (i < liste.length - 1 && y >= liste[i + 1].centre) i++
      const a = liste[i]
      const b = liste[Math.min(i + 1, liste.length - 1)]
      const span = Math.max(b.centre - a.centre, 1)
      const t = Math.min(Math.max((y - a.centre) / span, 0), 1)
      const doux = t * t * (3 - 2 * t)
      racine.style.setProperty('--su-nuit', (a.nuit + (b.nuit - a.nuit) * doux).toFixed(3))
    }

    const surDefilement = () => {
      if (attente) return
      attente = true
      requestAnimationFrame(() => {
        attente = false
        maj()
      })
    }

    const surRedimensionnement = () => {
      liste = ancres()
      maj()
    }

    window.addEventListener('scroll', surDefilement, { passive: true })
    window.addEventListener('resize', surRedimensionnement)
    maj()

    return () => {
      window.removeEventListener('scroll', surDefilement)
      window.removeEventListener('resize', surRedimensionnement)
      racine.style.removeProperty('--su-nuit')
    }
  }, [actif])
}

export default function Passage() {
  const hote = useRef<HTMLDivElement>(null)
  const controle = useRef<ControlePassage | null>(null)
  const [repli, setRepli] = useState(false)
  const [montable, setMontable] = useState(false)

  // Le canvas est posé directement sous <body>, par un portail.
  //
  // Sans cela, il hérite du bloc conteneur du premier ancêtre portant un
  // `transform` — ici `.page-transition`, dont l'animation d'entrée laisse
  // `transform: translateY(0)` en place à cause de `fill-mode: both`. Un
  // `position: fixed` y devient relatif à la PAGE : le canvas mesurait
  // 10 239 px de haut au lieu des 900 px du viewport, et la scène se
  // retrouvait hors cadre. Mesuré, pas supposé.
  useEffect(() => setMontable(true), [])

  useAmbianceSeule(repli)

  // Dépend de `montable` : au premier rendu le portail n'existe pas encore,
  // donc `hote.current` est nul. Sans cette dépendance l'effet partirait une
  // seule fois, trop tôt, et la scène ne démarrerait jamais.
  useEffect(() => {
    const element = hote.current
    if (!montable || !element) return
    let annule = false

    async function demarrer() {
      const [{ creerPassage }, { webglDisponible, mouvementReduit }] = await Promise.all([
        import('@/lib/webgl/passage'),
        import('@/lib/webgl/quality'),
      ])

      if (annule) return

      if (mouvementReduit()) {
        // Mouvement réduit : pas de canvas, mais la traversée d'ambiance
        // continue. Changer la couleur du fond au fil du défilement n'est pas
        // du mouvement — rien ne se déplace, rien ne clignote — et c'est ce
        // qui porte l'identité de la page. La supprimer laisserait au
        // contraire l'accueil bloqué dans la nuit de sa première peinture.
        setRepli(true)
        return
      }

      if (!webglDisponible()) {
        setRepli(true)
        return
      }

      const instance = creerPassage(element!)
      if (!instance) {
        setRepli(true)
        return
      }
      if (annule) {
        instance.detruire()
        return
      }

      controle.current = instance
      document.documentElement.dataset.passage = 'actif'
    }

    demarrer()

    return () => {
      annule = true
      controle.current?.detruire()
      controle.current = null
      delete document.documentElement.dataset.passage
    }
  }, [montable])

  if (!montable) return null

  return createPortal(
    <div ref={hote} className="su-passage" aria-hidden="true" />,
    document.body,
  )
}
