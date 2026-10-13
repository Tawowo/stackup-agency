'use client'

/**
 * LA PAGE DÉCLARE, LA SCÈNE OBÉIT.
 *
 * Spécification : dossier §11.6 (TRAVERSÉE). « Le site est un seul lieu : la
 * bande ne disparaît jamais, elle change d'état quand on change de page. »
 *
 * POURQUOI UN HOOK ET NON UN `setEtat` ÉCRIT DANS CHAQUE PAGE. Jusqu'ici,
 * chaque section de l'accueil appelait `setEtat` dans son propre effet, avec
 * sa propre logique de nettoyage — ou, plus souvent, sans. Résultat mesuré :
 * l'état survivait à la page qui l'avait posé, et la bande s'affichait par-
 * dessus le contenu de routes qui ne l'avaient jamais demandée. La correction
 * d'alors fut un état « absent » par défaut plus une remise à zéro au
 * changement de route ; ce hook en est la suite logique, côté page.
 *
 * Il garantit trois choses qu'on oublie une fois sur deux à la main :
 *   — l'état est posé au montage,
 *   — il est RENDU au démontage, quoi qu'il arrive,
 *   — l'accent du projet courant suit le même cycle de vie.
 *
 * Une page qui n'appelle pas ce hook obtient le vide, et c'est voulu : le
 * silence vaut « je ne demande rien », jamais « garde ce qu'il y avait ».
 */

import { useEffect } from 'react'
import { useBande, type EtatBande } from '@/store/bande'

interface Options {
  /** Teinte le brin navy — la pellicule des pages projet. */
  accent?: string | null
  /** Progression fixe, pour les états qui ne défilent pas. */
  progression?: number
}

export function useEtatBande(etat: EtatBande, options: Options = {}) {
  const { accent = null, progression } = options

  useEffect(() => {
    const s = useBande.getState()
    s.setEtat(etat)
    s.setAccent(accent)
    if (progression !== undefined) s.setProgression(progression)

    return () => {
      /* On rend la scène, on ne la laisse pas à la page suivante. Le
         `SceneMontee` remet déjà à zéro au changement de route ; ceci couvre
         le cas d'un composant démonté SANS changement de route — un onglet,
         une vue conditionnelle — que la remise à zéro de route ne voit pas. */
      const f = useBande.getState()
      f.setEtat('absent')
      f.setAccent(null)
      f.setAncrage(null)
    }
  }, [etat, accent, progression])
}
