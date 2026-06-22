'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-gray-900 border-t border-white/10 px-4 py-4 sm:py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
        <p className="text-white/80 text-sm flex-1">
          Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement.{' '}
          <Link href="/cookies" className="text-electric hover:underline">En savoir plus</Link>
        </p>
        <button
          onClick={accept}
          className="shrink-0 px-5 py-2 bg-electric hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          Accepter
        </button>
      </div>
    </div>
  )
}
