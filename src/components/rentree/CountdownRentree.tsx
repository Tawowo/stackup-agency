'use client'
import { useEffect, useState } from 'react'
import { getRemainingTime, RENTREE_DEADLINE } from '@/config/rentree'

/** Un chiffre rendu avec effet rouleau odometer */
function OdometerDigit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-10 h-11 rounded-lg overflow-hidden bg-navy dark:bg-white/10 border border-white/10 shadow-inner">
        {/* Digit wrapper — key forces re-mount → transition triggers */}
        <div
          key={value}
          className="absolute inset-0 flex items-center justify-center font-mono font-bold text-xl text-white"
          style={{ animation: 'ticker-in 0.35s cubic-bezier(0.16,1,0.3,1) both' }}
        >
          {value}
        </div>
        {/* Shine top */}
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/8 to-transparent pointer-events-none" />
      </div>
      <span className="text-[9px] font-semibold uppercase tracking-widest text-foreground/40 dark:text-white/30 mt-1">{label}</span>
    </div>
  )
}

export default function CountdownRentree({ initialTime }: { initialTime: ReturnType<typeof getRemainingTime> }) {
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

  const j  = String(time.j).padStart(2, '0')
  const h  = String(time.h).padStart(2, '0')
  const m  = String(time.m).padStart(2, '0')
  const s  = String(time.s).padStart(2, '0')

  return (
    <span className="inline-flex items-end gap-1.5" aria-label={`${time.j} jours ${time.h}h ${time.m}m ${time.s}s restants`}>
      <OdometerDigit value={j[0]} label="" />
      <OdometerDigit value={j[1]} label="j" />
      <span className="text-white/30 font-bold text-lg mb-2">:</span>
      <OdometerDigit value={h[0]} label="" />
      <OdometerDigit value={h[1]} label="h" />
      <span className="text-white/30 font-bold text-lg mb-2">:</span>
      <OdometerDigit value={m[0]} label="" />
      <OdometerDigit value={m[1]} label="m" />
      <span className="text-white/30 font-bold text-lg mb-2">:</span>
      <OdometerDigit value={s[0]} label="" />
      <OdometerDigit value={s[1]} label="s" />
    </span>
  )
}
