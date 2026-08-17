'use client'
/**
 * CountdownInline — version compacte du compteur pour la topbar.
 * Affichage texte simple : "27j 14h 33m 12s" — pas de flip digits,
 * adapté à la hauteur 36-44px de la bannière.
 */
import { useEffect, useState } from 'react'
import { getRemainingTime, RENTREE_DEADLINE } from '@/config/rentree'

export default function CountdownInline({ initialTime }: { initialTime: ReturnType<typeof getRemainingTime> }) {
  const [time, setTime] = useState(initialTime)

  useEffect(() => {
    if (time.expired) return
    const id = setInterval(() => {
      const t = getRemainingTime(RENTREE_DEADLINE)
      setTime(t)
      if (t.expired) clearInterval(id)
    }, 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (time.expired) return null

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
