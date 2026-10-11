'use client'

/**
 * Déclencheur visible de LA PALETTE.
 *
 * Affiche le raccourci réel de la plateforme : « ⌘K » sur Mac, « Ctrl K »
 * ailleurs. Afficher le mauvais raccourci est pire que de n'en afficher aucun.
 */

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'

export default function PaletteBouton({ className = '' }: { className?: string }) {
  const [mac, setMac] = useState(false)

  // Détecté après hydratation : le serveur ne connaît pas la plateforme, et
  // deviner provoquerait une différence de rendu.
  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent))
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent('su:palette'))}
      aria-label="Rechercher dans le site"
      aria-keyshortcuts="Control+K Meta+K"
      className={`group inline-flex items-center gap-2 h-9 pl-3 pr-2 rounded-lg border border-navy/15 bg-white/60 text-[#475569] hover:text-navy hover:border-gold/50 transition-colors ${className}`}
    >
      <Search size={15} aria-hidden="true" />
      <span className="text-[13px] hidden xl:inline">Rechercher</span>
      <kbd className="hidden xl:inline font-mono text-[10.5px] px-1.5 py-0.5 rounded border border-navy/10 bg-navy/[0.04] text-[#475569]">
        {mac ? '⌘K' : 'Ctrl K'}
      </kbd>
    </button>
  )
}
