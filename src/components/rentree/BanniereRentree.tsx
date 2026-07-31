'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { useBanniere } from '@/contexts/BanniereContext'
import { isRentreeActive, getRemainingTime } from '@/config/rentree'
import CountdownRentree from './CountdownRentree'

const SESSION_KEY = 'banniere_rentree_dismissed'

export default function BanniereRentree() {
  const { banniereActive, setBanniereActive } = useBanniere()
  const initialTime = useRef(getRemainingTime())

  useEffect(() => {
    if (!isRentreeActive()) return
    if (sessionStorage.getItem(SESSION_KEY)) return
    setBanniereActive(true)
  }, [setBanniereActive])

  function dismiss() {
    sessionStorage.setItem(SESSION_KEY, '1')
    setBanniereActive(false)
  }

  if (!banniereActive) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-9 bg-gold flex items-center justify-center px-4 text-ink text-xs font-medium">
      <Link href="/offre-rentree" className="flex items-center gap-2 hover:underline underline-offset-2">
        <span>🎒 Offre rentrée — maquette offerte ·</span>
        <CountdownRentree initialTime={initialTime.current} />
      </Link>
      <button
        onClick={dismiss}
        aria-label="Fermer la bannière"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
      >
        <X size={14} />
      </button>
    </div>
  )
}
