/* eslint-disable react/no-unescaped-entities */
import { isRentreeActive, getRemainingTime } from '@/config/rentree'
import Link from 'next/link'
import CountdownRentree from './CountdownRentree'
import { SITE } from '@/config/site'

export default function BlocRentreeHome() {
  if (!isRentreeActive()) return null
  const initialTime = getRemainingTime()

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-navy via-[#1a3a6e] to-navy border-y border-gold/20 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/20 text-gold rounded-full text-xs font-semibold mb-4 uppercase tracking-wider">
          Offre rentrée — jusqu'au 15 septembre 2026
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Votre maquette de site <span className="text-gold">offerte</span>
        </h2>
        <p className="text-white/70 mb-4 max-w-xl mx-auto text-sm sm:text-base">
          Commandez votre site vitrine ({SITE.pricing.vitrine}€) ou multi-pages ({SITE.pricing.multipages}€) avant le 15 septembre et recevez la maquette sans engagement.
        </p>
        <div className="flex items-center justify-center gap-1 text-white/60 text-sm mb-6">
          Offre expire dans&nbsp;<CountdownRentree initialTime={initialTime} />
        </div>
        <Link
          href="/offre-rentree"
          className="inline-block px-8 py-3 bg-gold hover:bg-gold/90 text-ink font-bold rounded-xl transition-all hover:-translate-y-0.5 shadow-lg"
        >
          Découvrir l'offre →
        </Link>
      </div>
    </section>
  )
}
