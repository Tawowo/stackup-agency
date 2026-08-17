'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { useBanniere } from '@/contexts/BanniereContext'
import { isRentreeActive } from '@/config/rentree'
import CountdownInline from './CountdownInline'

const LS_KEY = 'banner-rentree-dismissed'
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000

function isDismissed(): boolean {
  try {
    const ts = localStorage.getItem(LS_KEY)
    return ts ? Date.now() - parseInt(ts, 10) < THIRTY_DAYS : false
  } catch { return false }
}

export default function BanniereRentree() {
  const { banniereActive, setBanniereActive } = useBanniere()


  useEffect(() => {
    if (!isRentreeActive() || isDismissed()) {
      setBanniereActive(false)
    }
  }, [setBanniereActive])

  function dismiss() {
    try { localStorage.setItem(LS_KEY, String(Date.now())) } catch {}
    setBanniereActive(false)
  }

  if (!banniereActive) return null

  return (
    /*
     * Mobile : fixed sous la navbar (top-16 = h-16 navbar), h-11 = 44px (touch-safe)
     * Desktop : fixed au top (top-0), h-9 = 36px, au-dessus de la navbar (z-[60] > z-50)
     */
    <div
      className="fixed left-0 right-0 z-[49] top-16 h-11 lg:top-0 lg:h-9 lg:z-[60] bg-gold flex items-center justify-between text-ink text-xs font-medium"
      role="banner"
      aria-label="Offre de rentrée"
    >
      {/* Spacer gauche pour équilibrer le bouton fermer */}
      <div className="w-11 lg:w-9 shrink-0" aria-hidden="true" />

      <Link
        href="/offre-rentree"
        className="flex-1 flex items-center justify-center gap-1.5 h-full hover:underline underline-offset-2 min-w-0 px-2"
        aria-label="Offre rentrée — maquette offerte jusqu&apos;au 13 septembre. En savoir plus."
      >
        <span className="truncate text-center">🎒 Maquette offerte jusqu&apos;au 13/09 →</span>
        <span className="hidden xl:inline shrink-0 opacity-80">
          · <CountdownInline />
        </span>
      </Link>

      <button
        onClick={dismiss}
        aria-label="Fermer la bannière offre de rentrée"
        className="shrink-0 w-11 h-11 lg:w-9 lg:h-9 flex items-center justify-center hover:opacity-70 active:opacity-50 transition-opacity"
      >
        <X size={14} aria-hidden="true" />
      </button>
    </div>
  )
}
