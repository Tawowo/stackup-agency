'use client'
import { useEffect, useRef, useState } from 'react'

// Ces ancres doivent exister dans la page, sinon leurs points pointent vers
// le vide. Sur l'accueil, quatre des cinq ancres d'origine n'existaient pas :
// la barre n'affichait qu'un seul point orphelin.
// Le composant filtre désormais les sections absentes au montage, ce qui le
// rend utilisable sur n'importe quelle page sans configuration.
const SECTIONS = [
  { id: 'services',     label: 'Services' },
  { id: 'pourquoi',     label: 'Pourquoi nous' },
  { id: 'laboratoire',  label: 'La preuve' },
  { id: 'methode',      label: 'La méthode' },
  { id: 'realisations', label: 'Réalisations' },
  { id: 'faq',          label: 'Questions' },
]

export default function SectionProgressBar() {
  const [active, setActive] = useState(-1)
  const [visible, setVisible] = useState(false)
  const [presentes, setPresentes] = useState<typeof SECTIONS>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    const retenues = SECTIONS.filter(s => document.getElementById(s.id))
    setPresentes(retenues)
    if (retenues.length < 2) return
    const els = retenues.map(s => document.getElementById(s.id))

    const update = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight
      // Show bar after first 200px scroll
      setVisible(scrollY > 200)

      // Find the currently active section
      let found = -1
      els.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        if (rect.top <= vh * 0.5) found = i
      })
      setActive(found)
    }

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (presentes.length < 2) return null

  return (
    <nav
      aria-label="Navigation par section"
      className="section-progress-bar fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
    >
      {/* Vertical track */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-navy/15" aria-hidden="true" />
      {presentes.map((s, i) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          aria-label={s.label}
          title={s.label}
          className="relative group"
        >
          {/* Dot */}
          <span className={`block rounded-full transition-all duration-300 ${
            i === active
              ? 'w-2.5 h-2.5 bg-electric shadow-[0_0_0_4px_rgba(27,90,158,0.15)]'
              : 'w-1.5 h-1.5 bg-navy/30 group-hover:bg-navy/70'
          }`} />
          {/* Label tooltip */}
          <span className="absolute right-6 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md bg-[#0C1626] border border-white/15 text-white text-xs data-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {s.label}
          </span>
        </button>
      ))}
    </nav>
  )
}
