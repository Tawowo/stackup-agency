'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqItem { q: string; a: string }

interface Props {
  items: FaqItem[]
  dark?: boolean
  /** Initially open index */
  defaultOpen?: number
}

export default function FaqAccordion({ items, dark = false, defaultOpen }: Props) {
  const [open, setOpen] = useState<number | null>(defaultOpen ?? null)

  const cardBase = dark
    ? 'border-white/8 bg-white/3 hover:border-white/15 data-[open]:border-electric/25 data-[open]:bg-white/6'
    : 'border-navy/12 bg-white dark:border-white/8 dark:bg-white/3 hover:border-navy/25 dark:hover:border-white/15 data-[open]:border-electric/30 data-[open]:bg-blue-50/50 dark:data-[open]:bg-white/6'

  const questionText = dark
    ? 'text-white/80 group-hover:text-white data-[open]:text-white'
    : 'text-foreground/80 dark:text-white/80 group-hover:text-foreground dark:group-hover:text-white data-[open]:text-foreground dark:data-[open]:text-white'

  const answerText = dark
    ? 'text-white/55'
    : 'text-foreground/60 dark:text-white/55'

  return (
    <div className="space-y-2">
      {items.map(({ q, a }, i) => (
        <div
          key={q}
          data-open={open === i ? '' : undefined}
          className={`rounded-xl border transition-colors duration-200 overflow-hidden ${cardBase}`}
        >
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="group w-full text-left px-5 py-4 flex items-center justify-between gap-4"
          >
            <span
              data-open={open === i ? '' : undefined}
              className={`font-semibold text-sm leading-snug transition-colors ${questionText}`}
            >
              {q}
            </span>
            <ChevronDown
              size={16}
              className={`shrink-0 text-electric/60 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
            />
          </button>
          <div className={`faq-body ${open === i ? 'open' : ''}`}>
            <div>
              <p className={`px-5 pb-4 text-sm leading-relaxed ${answerText}`}>{a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
