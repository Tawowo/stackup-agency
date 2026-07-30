import Link from 'next/link'
import { SITE } from '@/config/site'

interface AuthorBylineProps {
  date?: string
  updated?: string
  readTime?: number
  compact?: boolean
}

export default function AuthorByline({ date, updated, readTime, compact = false }: AuthorBylineProps) {
  const displayDate = updated ?? date
  const dateStr = displayDate
    ? new Date(displayDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : null
  const name = SITE.signature
  const initials = 'SA'

  if (compact) {
    return (
      <div className="flex items-center gap-3 text-xs text-foreground/70 dark:text-white/50">
        <span>{name}</span>
        {dateStr && <span>·</span>}
        {dateStr && <span>{dateStr}</span>}
        {readTime && <span>·</span>}
        {readTime && <span>{readTime} min</span>}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4 py-4 border-t border-b border-white/10 my-6">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-electric flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
        {initials}
      </div>
      <div>
        <div className="font-semibold text-foreground dark:text-white text-sm">{name}</div>
        <div className="text-xs text-foreground/70 dark:text-white/50 flex items-center gap-2">
          <Link href="/a-propos" className="hover:text-electric transition-colors">Stackup Agency</Link>
          {dateStr && <span>·</span>}
          {dateStr && <span>{updated ? `Mis à jour le ${dateStr}` : dateStr}</span>}
          {readTime && <span>· {readTime} min de lecture</span>}
        </div>
      </div>
    </div>
  )
}
