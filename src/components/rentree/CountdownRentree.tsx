'use client'
import { useEffect, useState } from 'react'
import { getRemainingTime, RENTREE_DEADLINE } from '@/config/rentree'

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

  return (
    <span className="font-mono font-bold tabular-nums">
      {time.j}j {String(time.h).padStart(2,'0')}h {String(time.m).padStart(2,'0')}m {String(time.s).padStart(2,'0')}s
    </span>
  )
}
