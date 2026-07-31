import Link from 'next/link'
import { CheckCircle, ChevronRight } from 'lucide-react'

interface Card {
  titre: string
  prix: number
  delai: string
  desc: string
  inclus: string[]
  href: string
  highlight: boolean
}

/* Variant par position : 0=Starter, 1=Popular/Highlight, others=default */
function cardVariant(index: number, highlight: boolean) {
  if (highlight) return 'premium'
  if (index === 0) return 'starter'
  return 'default'
}

export default function PricingCards({ cards }: { cards: Card[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {cards.map((s, i) => {
        const variant = cardVariant(i, s.highlight)
        return (
          <div
            key={s.titre}
            className={`rounded-2xl p-6 flex flex-col relative overflow-hidden transition-all duration-300 ${
              variant === 'premium'
                ? 'card-gradient-border bg-gold/5 dark:bg-gold/5'
                : variant === 'starter'
                ? 'border-2 border-electric/60 hover:shadow-lg hover:shadow-electric/10 hover:-translate-y-0.5 bg-white dark:bg-white/5'
                : 'border border-navy/20 dark:border-white/10 hover:shadow-md hover:-translate-y-0.5 bg-white dark:bg-white/5'
            }`}
          >
            {/* Liseret accent */}
            <div className={`absolute top-0 left-0 right-0 h-0.5 ${
              variant === 'premium' ? 'bg-gradient-to-r from-gold to-amber-400' :
              variant === 'starter' ? 'bg-gradient-to-r from-electric to-electric-ink' :
              'bg-gradient-to-r from-navy/40 to-electric/40'
            }`} />

            {s.highlight && (
              <div className="text-xs font-bold text-gold mb-3 uppercase tracking-widest">
                ★ Le plus populaire
              </div>
            )}
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-foreground dark:text-white">{s.titre}</h3>
              <span className={`text-2xl font-bold ml-3 ${s.highlight ? 'text-gold' : 'text-navy dark:text-electric'}`}>
                {s.prix}&thinsp;€
              </span>
            </div>
            <p className="text-sm text-foreground/60 dark:text-white/60 mb-4">{s.desc}</p>
            <ul className="space-y-1.5 mb-5 flex-1">
              {s.inclus.map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground/70 dark:text-white/70">
                  <CheckCircle size={13} className={s.highlight ? 'text-gold flex-shrink-0' : 'text-electric flex-shrink-0'} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="text-xs text-foreground/70 dark:text-white/60 mb-4">Livraison : {s.delai}</div>
            <Link
              href={s.href}
              className={`flex items-center justify-center gap-1 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                s.highlight
                  ? 'bg-gold hover:bg-gold/90 text-ink shadow-md shadow-gold/20'
                  : variant === 'starter'
                  ? 'bg-electric hover:bg-electric-ink text-white shadow-md shadow-electric/20'
                  : 'border border-foreground/20 dark:border-white/20 text-foreground dark:text-white hover:bg-foreground/5 dark:hover:bg-white/10'
              }`}
            >
              Voir l&apos;offre <ChevronRight size={14} />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
