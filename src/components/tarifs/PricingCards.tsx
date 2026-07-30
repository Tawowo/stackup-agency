'use client'
import Link from 'next/link'
import { CheckCircle, ChevronRight } from 'lucide-react'
import CountUp from '@/components/ui/CountUp'

interface Card {
  titre: string
  prix: number
  delai: string
  desc: string
  inclus: string[]
  href: string
  highlight: boolean
}

export default function PricingCards({ cards }: { cards: Card[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {cards.map(s => (
        <div
          key={s.titre}
          className={`rounded-2xl border p-6 flex flex-col relative ${
            s.highlight
              ? 'card-gradient-border bg-gold/5'
              : 'border-navy/20 dark:border-white/10'
          }`}
        >
          {s.highlight && (
            <div className="text-xs font-semibold text-navy dark:text-gold mb-3 uppercase tracking-wide">
              Le plus populaire
            </div>
          )}
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-foreground dark:text-white">{s.titre}</h3>
            <span className="text-2xl font-bold text-navy dark:text-gold ml-3 price-ticker">
              <CountUp
                target={s.prix}
                suffix="€"
                duration={1000}
                className="price-ticker-inner is-visible"
              />
            </span>
          </div>
          <p className="text-sm text-foreground/60 dark:text-white/60 mb-4">{s.desc}</p>
          <ul className="space-y-1.5 mb-5 flex-1">
            {s.inclus.map(item => (
              <li key={item} className="flex items-center gap-2 text-sm text-foreground/70 dark:text-white/70">
                <CheckCircle size={13} className="text-green-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <div className="text-xs text-foreground/70 dark:text-white/40 mb-4">Livraison : {s.delai}</div>
          <Link
            href={s.href}
            className={`flex items-center justify-center gap-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              s.highlight
                ? 'bg-gold hover:bg-gold/80 text-ink'
                : 'border border-foreground/20 dark:border-white/20 text-foreground dark:text-white hover:bg-foreground/5 dark:hover:bg-white/10'
            }`}
          >
            Voir l&apos;offre <ChevronRight size={14} />
          </Link>
        </div>
      ))}
    </div>
  )
}
