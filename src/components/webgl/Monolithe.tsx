'use client'

/**
 * Monture React du MONOLITHE.
 *
 * Trois décisions importantes :
 *
 * 1. `three` est chargé par `import()` **dans l'effet**, pas en haut du
 *    fichier. Le paquet n'entre donc jamais dans le bundle initial : un
 *    visiteur en mouvement réduit, sans WebGL, ou qui ne descend jamais, ne le
 *    télécharge pas du tout.
 *
 * 2. Le repli CSS est rendu côté serveur et reste en place jusqu'à ce que la
 *    scène ait réellement produit sa première image. Il n'y a donc aucun
 *    instant où la zone est vide — c'est ce qui garde CLS à 0.
 *
 * 3. Le composant ne rend aucun texte. Le H1 et les CTA vivent dans le DOM de
 *    la section, devant le canvas.
 */

import { useEffect, useRef, useState } from 'react'
import type { ControleMonolithe } from '@/lib/webgl/monolithe'

/** Repli statique : la même grammaire de strates, en CSS pur. */
function ReplierStrates() {
  // Profil déterministe, calqué sur `largeurAuNiveau()` de la scène 3D, pour
  // que le repli ait la même silhouette que le rendu WebGL.
  const strates = Array.from({ length: 22 }, (_, i) => {
    const t = i / 21
    const largeur = 1.5 + 0.52 * Math.sin(t * 5.1 + 0.6) + 0.22 * Math.sin(t * 12.7)
    return {
      largeur: (largeur / 2.3) * 100,
      bas: t * 88 + 4,
      opacite: 0.35 + t * 0.4,
    }
  })

  return (
    <div className="su-repli" aria-hidden="true">
      {strates.map((s, i) => (
        <div
          key={i}
          className="su-repli__strate"
          style={{
            width: `${s.largeur}%`,
            bottom: `${s.bas}%`,
            height: '2.4%',
            opacity: s.opacite,
          }}
        />
      ))}
    </div>
  )
}

export default function Monolithe() {
  const hote = useRef<HTMLDivElement>(null)
  const controle = useRef<ControleMonolithe | null>(null)
  const [scenePrete, setScenePrete] = useState(false)

  useEffect(() => {
    const element = hote.current
    if (!element) return

    let annule = false
    let detacherScroll: (() => void) | undefined

    async function demarrer() {
      // Chargé ici, pas en haut du module : voir note 1.
      const [{ creerMonolithe }, { webglDisponible, mouvementReduit }] =
        await Promise.all([
          import('@/lib/webgl/monolithe'),
          import('@/lib/webgl/quality'),
        ])

      // Règle non négociable n°3 et n°4 : le mouvement réduit et l'absence de
      // WebGL laissent le repli CSS en place, définitivement.
      if (annule || mouvementReduit() || !webglDisponible()) return

      const instance = creerMonolithe(element!)
      if (!instance || annule) {
        instance?.detruire()
        return
      }

      controle.current = instance

      // Le repli ne disparaît qu'une fois la scène effectivement en train de
      // rendre. Deux trames d'attente : la première compile les shaders.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (!annule) setScenePrete(true)
        }),
      )

      // ---- Défilement : pilote le désassemblage ----
      // Lecture dans rAF, jamais dans le gestionnaire d'événement, pour ne pas
      // provoquer de recalcul de mise en page synchrone à chaque molette.
      let enAttente = false
      const surScroll = () => {
        if (enAttente) return
        enAttente = true
        requestAnimationFrame(() => {
          enAttente = false
          const rect = element!.getBoundingClientRect()
          const progression = Math.min(1, Math.max(0, -rect.top / (rect.height || 1)))
          instance.setDesassemblage(progression)
        })
      }
      window.addEventListener('scroll', surScroll, { passive: true })
      detacherScroll = () => window.removeEventListener('scroll', surScroll)

      // ---- Hors champ : on suspend le rendu ----
      const vigie = new IntersectionObserver(
        ([entree]) => instance.setActif(entree.isIntersecting),
        { rootMargin: '120px' },
      )
      vigie.observe(element!)
      const detacherVigie = () => vigie.disconnect()

      const precedent = detacherScroll
      detacherScroll = () => {
        precedent?.()
        detacherVigie()
      }
    }

    demarrer()

    return () => {
      annule = true
      detacherScroll?.()
      controle.current?.detruire()
      controle.current = null
    }
  }, [])

  return (
    <>
      {!scenePrete && <ReplierStrates />}
      <div ref={hote} className="su-scene" />
    </>
  )
}
