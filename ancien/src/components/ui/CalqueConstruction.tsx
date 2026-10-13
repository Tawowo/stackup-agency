'use client'

/**
 * LE CALQUE DE CONSTRUCTION — touche G.
 *
 * Le dossier (§10.11, §12.4) sort la grille de douze colonnes de l'affichage
 * permanent pour la mettre derrière une touche. La raison est juste : une
 * grille toujours visible devient un décor, et un décor ne prouve rien.
 * Derrière une touche, elle reste ce qu'elle est — un instrument, que les
 * prospects techniques trouveront et que la validation utilise (les captures
 * de QA se prennent avec et sans).
 *
 * La touche est ignorée quand le focus est dans un champ de saisie : sinon
 * taper « agence » dans la recherche ferait clignoter la page.
 */
import { useEffect } from 'react'

export default function CalqueConstruction() {
  useEffect(() => {
    const surTouche = (e: KeyboardEvent) => {
      if (e.key !== 'g' && e.key !== 'G') return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const cible = e.target as HTMLElement | null
      const tag = cible?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || cible?.isContentEditable) return
      const r = document.documentElement
      r.dataset.grille = r.dataset.grille === 'oui' ? 'non' : 'oui'
    }
    window.addEventListener('keydown', surTouche)
    return () => window.removeEventListener('keydown', surTouche)
  }, [])
  return null
}
