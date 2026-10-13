'use client'

/**
 * LE RÉGLAGE DES ANIMATIONS.
 *
 * Le dossier demande trois niveaux de mouvement (§14.10 : plein, léger,
 * aucun). Ils existaient dans le store et les composants 3D les lisaient —
 * mais rien ne les écrivait, sauf la page de banc. Ils n'étaient donc
 * atteignables par personne.
 *
 * POURQUOI UN RÉGLAGE EN PLUS DE LA PRÉFÉRENCE SYSTÈME. La préférence du
 * système d'exploitation est désormais suivie, et c'est le défaut. Mais elle
 * est binaire et globale : quelqu'un qui l'active pour un autre site, ou qui
 * la laisse active par habitude, ne peut pas voir ce que ce site fait. À
 * l'inverse, quelqu'un sur une machine lente voudrait calmer ce site sans
 * toucher à son système. Le réglage donne le dernier mot au visiteur, sur ce
 * site seulement.
 *
 * CE QUI EST MÉMORISÉ, ET OÙ. Dans `localStorage`, parce que c'est un
 * confort personnel qui doit survivre à la visite — pas une donnée, pas un
 * suivi. Rien n'est envoyé nulle part. Si le stockage est refusé, le réglage
 * fonctionne pour la session en cours et c'est tout.
 *
 * ACCESSIBILITÉ. Trois vrais boutons radio dans un `radiogroup`, navigables
 * au clavier, avec l'état porté par `aria-checked` et non par la couleur.
 */

import { useEffect, useState } from 'react'
import { useBande, type Mouvement } from '@/store/bande'

const CLE = 'su:mouvement'

const NIVEAUX: { id: Mouvement | 'auto'; nom: string; aide: string }[] = [
  { id: 'auto', nom: 'Auto', aide: 'Suit la préférence de votre système' },
  { id: 'plein', nom: 'Complètes', aide: 'Toutes les animations' },
  { id: 'leger', nom: 'Réduites', aide: 'Plus de boucles continues' },
  { id: 'aucun', nom: 'Aucune', aide: 'Rien ne bouge' },
]

export default function ReglageMouvement() {
  const [choix, setChoix] = useState<Mouvement | 'auto'>('auto')

  // Lecture au montage seulement : avant, le réglage « auto » s'applique,
  // ce qui est le comportement sans JavaScript comme avec.
  useEffect(() => {
    try {
      const v = localStorage.getItem(CLE)
      if (v === 'plein' || v === 'leger' || v === 'aucun') setChoix(v)
    } catch {
      // Stockage refusé : on reste en « auto », ce qui est le bon défaut.
    }
  }, [])

  const appliquer = (id: Mouvement | 'auto') => {
    setChoix(id)
    try {
      if (id === 'auto') localStorage.removeItem(CLE)
      else localStorage.setItem(CLE, id)
    } catch {
      // Sans stockage, le choix vaut pour la session.
    }
    if (id === 'auto') {
      /* On rend la main au système : la même règle qu'au chargement. */
      const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const nav = navigator as Navigator & { deviceMemory?: number }
      const modeste = (nav.deviceMemory ?? 8) <= 4 || (navigator.hardwareConcurrency ?? 8) <= 4
      useBande.getState().setMouvement(reduit ? 'aucun' : modeste ? 'leger' : 'plein')
    } else {
      useBande.getState().setMouvement(id)
    }
  }

  return (
    <div className="su-reglage-mvt">
      <span className="su-reglage-mvt__titre" id="su-mvt-titre">
        Animations
      </span>
      <div className="su-reglage-mvt__choix" role="radiogroup" aria-labelledby="su-mvt-titre">
        {NIVEAUX.map((n) => (
          <button
            key={n.id}
            type="button"
            role="radio"
            aria-checked={choix === n.id}
            title={n.aide}
            className="su-reglage-mvt__bouton"
            onClick={() => appliquer(n.id)}
          >
            {n.nom}
          </button>
        ))}
      </div>
    </div>
  )
}
