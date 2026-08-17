'use client'
import { useEffect, useState, useRef } from 'react'
import { getRemainingTime, RENTREE_DEADLINE } from '@/config/rentree'

/** Un seul chiffre dans sa fenêtre à hauteur fixe, glissement vertical vers le haut */
function Digit({ value }: { value: string }) {
  const [display, setDisplay] = useState(value)
  const [animClass, setAnimClass] = useState('')
  const prev = useRef(value)

  useEffect(() => {
    if (value === prev.current) return
    prev.current = value
    setAnimClass('cd-digit-exit')
    const t1 = setTimeout(() => {
      setDisplay(value)
      setAnimClass('cd-digit-enter')
    }, 100)
    const t2 = setTimeout(() => setAnimClass(''), 300)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [value])

  return (
    <div
      className="relative w-9 h-11 rounded-lg overflow-hidden bg-navy dark:bg-white/10 border border-white/10 shadow-inner flex items-center justify-center"
      aria-hidden="true"
    >
      <span
        className={`font-mono font-bold text-xl text-white select-none ${animClass}`}
        style={{ lineHeight: 1 }}
      >
        {display}
      </span>
      {/* shine */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/8 to-transparent" />
    </div>
  )
}

/** Une unité (ex: "27" + label "j") */
function TimeUnit({ tens, units, label }: { tens: string; units: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-0.5">
        <Digit value={tens} />
        <Digit value={units} />
      </div>
      <span className="text-[9px] font-semibold uppercase tracking-widest text-foreground/40 dark:text-white/30">
        {label}
      </span>
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

  const j = String(time.j).padStart(2, '0')
  const h = String(time.h).padStart(2, '0')
  const m = String(time.m).padStart(2, '0')
  const s = String(time.s).padStart(2, '0')

  return (
    <span
      className="inline-flex items-start gap-2"
      aria-label={`${time.j} jours ${time.h}h ${time.m}m ${time.s}s restants`}
    >
      <TimeUnit tens={j[0]} units={j[1]} label="j" />
      <span className="text-white/30 font-bold text-lg mt-1.5" aria-hidden="true">:</span>
      <TimeUnit tens={h[0]} units={h[1]} label="h" />
      <span className="text-white/30 font-bold text-lg mt-1.5" aria-hidden="true">:</span>
      <TimeUnit tens={m[0]} units={m[1]} label="m" />
      <span className="text-white/30 font-bold text-lg mt-1.5" aria-hidden="true">:</span>
      <TimeUnit tens={s[0]} units={s[1]} label="s" />
    </span>
  )
}
