'use client'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { realisations } from '@/lib/realisations'

const PANELS = realisations.slice(0, 4)

export default function ImmersiveGallery() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      const { scrollLeft, clientWidth } = track
      const idx = Math.round(scrollLeft / clientWidth)
      setActive(Math.min(idx, PANELS.length - 1))
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (i: number) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' })
  }

  return (
    <section id="realisations" className="py-16 lg:py-24 bg-background dark:bg-[#0A0F1C] overflow-hidden">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="overline-label mb-2">Démonstrations</p>
            <h2 className="text-foreground dark:text-white heading-underline reveal-item">
              Nos réalisations
            </h2>
            <p className="text-foreground/60 dark:text-white/60 mt-3 max-w-xl text-sm">
              Projets complets construits par nos soins, consultables en ligne. Ce que vous voyez est exactement ce que nous livrons.
            </p>
          </div>
          <Link
            href="/realisations"
            className="hidden sm:flex items-center gap-1 text-electric-ink dark:text-electric hover:text-navy dark:hover:text-electric font-medium text-sm transition-colors shrink-0"
          >
            Voir tout <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Scroll track — snap both mobile & desktop */}
      <div
        ref={trackRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        aria-label="Galerie de réalisations"
      >
        {PANELS.map((r, i) => (
          <div
            key={r.slug}
            className="snap-center shrink-0 w-[85vw] lg:w-[60vw] max-w-3xl mx-2 lg:mx-4 first:ml-[7.5vw] lg:first:ml-[20vw] last:mr-[7.5vw] lg:last:mr-[20vw]"
          >
            <div className="group rounded-2xl overflow-hidden border border-navy/20 dark:border-white/10 hover:border-electric/30 transition-colors bg-white dark:bg-[#0D1626] shadow-xl relative">
              {/* Background project name watermark */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
                aria-hidden="true"
              >
                <span
                  className="font-display font-bold text-[clamp(4rem,12vw,9rem)] leading-none whitespace-nowrap"
                  style={{ color: r.couleur, opacity: 0.08 }}
                >
                  {r.nom}
                </span>
              </div>

              {/* Browser chrome mockup */}
              <div className="relative z-10">
                {/* Titlebar */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-[#111827]/80 dark:bg-[#111827] border-b border-white/5">
                  <span className="w-3 h-3 rounded-full bg-red-400/70" aria-hidden="true" />
                  <span className="w-3 h-3 rounded-full bg-amber-400/70" aria-hidden="true" />
                  <span className="w-3 h-3 rounded-full bg-green-400/70" aria-hidden="true" />
                  <div className="ml-3 flex-1 flex items-center justify-between">
                    <span className="text-white/30 text-xs font-mono truncate">{new URL(r.url).hostname}</span>
                    <span className="badge-shimmer ml-2 px-2 py-0.5 bg-white/10 text-white/60 text-xs rounded-full shrink-0">
                      Démonstration
                    </span>
                  </div>
                </div>

                {/* Preview area */}
                <div
                  className="h-52 lg:h-64 flex items-center justify-center relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${r.couleur} 0%, ${r.accent} 100%)` }}
                >
                  <div className="absolute inset-0 opacity-10" style={{ background: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E") repeat' }} aria-hidden="true" />
                  <div className="relative text-center">
                    <div className="text-white/90 font-display font-bold text-5xl lg:text-6xl mb-2 group-hover:scale-105 transition-transform duration-500 drop-shadow-lg">
                      {r.nom.charAt(0)}
                    </div>
                    <div className="text-white/70 text-sm font-medium">{r.type}</div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5 lg:p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="text-xs text-foreground/40 dark:text-white/30 font-mono mb-1">
                        {String(i + 1).padStart(2, '0')}/{String(PANELS.length).padStart(2, '0')}
                      </div>
                      <h3 className="font-display font-bold text-lg text-foreground dark:text-white group-hover:text-electric transition-colors">
                        {r.nom}
                      </h3>
                      <p className="text-xs text-foreground/50 dark:text-white/50 mt-0.5">{r.type}</p>
                    </div>
                    <Link
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy/10 dark:bg-white/5 border border-navy/20 dark:border-white/10 text-navy dark:text-white/80 text-xs font-medium hover:bg-electric hover:text-white hover:border-electric transition-all"
                    >
                      <ExternalLink size={12} />
                      Explorer
                    </Link>
                  </div>
                  <p className="text-sm text-foreground/60 dark:text-white/60 leading-relaxed line-clamp-2">
                    {r.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {r.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-navy/10 dark:bg-white/5 text-navy/70 dark:text-white/50 text-xs border border-navy/10 dark:border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress dots + nav */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2" role="tablist" aria-label="Navigation galerie">
          {PANELS.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={active === i}
              aria-label={`Réalisation ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`rounded-full transition-all duration-300 ${
                active === i
                  ? 'w-6 h-2 bg-electric'
                  : 'w-2 h-2 bg-navy/20 dark:bg-white/20 hover:bg-electric/50'
              }`}
            />
          ))}
        </div>
        <Link href="/realisations" className="sm:hidden flex items-center gap-1 text-electric-ink dark:text-electric font-medium text-sm transition-colors">
          Voir tout <ArrowRight size={14} />
        </Link>
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scrollTo(Math.max(0, active - 1))}
            disabled={active === 0}
            aria-label="Précédent"
            className="w-8 h-8 rounded-full border border-navy/20 dark:border-white/20 flex items-center justify-center text-foreground/60 dark:text-white/60 hover:border-electric hover:text-electric transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowRight size={14} className="rotate-180" />
          </button>
          <button
            onClick={() => scrollTo(Math.min(PANELS.length - 1, active + 1))}
            disabled={active === PANELS.length - 1}
            aria-label="Suivant"
            className="w-8 h-8 rounded-full border border-navy/20 dark:border-white/20 flex items-center justify-center text-foreground/60 dark:text-white/60 hover:border-electric hover:text-electric transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  )
}
