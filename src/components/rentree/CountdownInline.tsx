'use client'
/**
 * CountdownInline — version compacte du compteur pour la topbar.
 * Affichage texte simple : "27j 14h 33m 12s" — pas de flip digits,
 * adapté à la hauteur 36-44px de la bannière.
 *
 * La valeur SSR est rendue comme "---" pour éviter l'hydration mismatch
 * (le temps change entre le render serveur et l'hydration client).
 */
import { useEffect, useState } from 'react'
import { getRemainingTime, RENTREE_DEADLINE } from '@/config/rentree'

export default function CountdownInline() {
  const [time, setTime] = useState<ReturnType<typeof getRemainingTime> | null>(null)

  useEffect(() => {
    // Première lecture côté client uniquement → zéro mismatch SSR/client
    const t0 = getRemainingTime(RENTREE_DEADLINE)
    setTime(t0)
    if (t0.expired) return

    const id = setInterval(() => {
      const t = getRemainingTime(RENTREE_DEADLINE)
      setTime(t)
      if (t.expired) clearInterval(id)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  // Pendant le SSR + avant le premier tick client, pas de rendu (évite le mismatch)
  if (!time || time.expired) return null

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <span
      className="font-mono font-semibold tabular-nums text-ink/80"
      aria-label={`${time.j} jours ${time.h}h ${time.m}m ${time.s}s restants`}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {pad(time.j)}j {pad(time.h)}h {pad(time.m)}m {pad(time.s)}s
    </span>
  )
}
