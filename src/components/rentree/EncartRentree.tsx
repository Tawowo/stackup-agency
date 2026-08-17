import { isRentreeActive, getRemainingTime } from '@/config/rentree'
import Link from 'next/link'
import CountdownRentree from './CountdownRentree'

export default function EncartRentree() {
  if (!isRentreeActive()) return null
  const initialTime = getRemainingTime()

  return (
    <div className="rounded-xl border border-gold/30 bg-gold/5 p-4 flex items-center gap-4 my-6">
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-foreground dark:text-white text-sm mb-0.5">
          Offre rentrée — maquette offerte
        </div>
        {/* div et non p : CountdownRentree contient des <div> (TimeUnit), <div> dans <p> = HTML invalide */}
        <div className="text-xs text-foreground/60 dark:text-white/60">
          Expire dans <CountdownRentree initialTime={initialTime} />
        </div>
      </div>
      <Link
        href="/offre-rentree"
        className="flex-shrink-0 px-4 py-2 bg-gold hover:bg-gold/80 text-ink text-xs font-semibold rounded-xl transition-colors"
      >
        En savoir plus →
      </Link>
    </div>
  )
}
