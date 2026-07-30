'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { realisations } from '@/lib/realisations'

const PANELS = realisations.slice(0, 4)
// Scroll height = 100vh pin entry + 4 panels × 100vh + 100vh exit
const PIN_SCREENS = PANELS.length + 1   // extra scroll room to fully traverse all panels

export default function PinnedGallery() {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const trackRef  = useRef<HTMLDivElement>(null)
  const [active, setActive]     = useState(0)
  const [progress, setProgress] = useState(0)   // 0→1 across all panels
  const [isDesktop, setIsDesktop] = useState(false)

  // Mobile snap state
  const snapRef = useRef<HTMLDivElement>(null)
  const [snapActive, setSnapActive] = useState(0)

  // ── Detect desktop ──────────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setIsDesktop(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // ── Desktop: pin + scrub scroll handler ─────────────────
  const handleScroll = useCallback(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track || !isDesktop) return

    const { top, height } = wrap.getBoundingClientRect()
    // total scrollable distance = height - 100vh
    const scrollable = height - window.innerHeight
    const scrolled   = Math.max(0, Math.min(scrollable, -top))
    const p          = scrolled / scrollable            // 0→1

    // Horizontal translate: move track left by (panels-1) × 100vw
    const totalShift = (PANELS.length - 1) * window.innerWidth
    track.style.transform = `translateX(${-p * totalShift}px)`

    // Parallax: filigrane moves at 60% speed
    const items = track.querySelectorAll<HTMLElement>('[data-filigrane]')
    items.forEach((el, i) => {
      const panelProgress = Math.max(0, Math.min(1, p * PANELS.length - i))
      el.style.transform = `translateX(${panelProgress * 0.4 * window.innerWidth}px)`
    })

    const idx = Math.min(PANELS.length - 1, Math.floor(p * PANELS.length))
    setActive(idx)
    setProgress(p)
  }, [isDesktop])

  useEffect(() => {
    if (!isDesktop) return
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDesktop, handleScroll])

  // ── Mobile: snap scroll listener ─────────────────────────
  useEffect(() => {
    if (isDesktop) return
    const el = snapRef.current
    if (!el) return
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / el.clientWidth)
      setSnapActive(Math.min(idx, PANELS.length - 1))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [isDesktop])

  const snapTo = (i: number) => {
    const el = snapRef.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  // ─────────────────────────────────────────────────────────
  return (
    <section id="realisations">

      {/* ── Section header (always visible) ─────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="overline-label mb-2">Démonstrations</p>
            <h2 className="text-foreground dark:text-white heading-underline reveal-item">
              Nos réalisations
            </h2>
            <p className="text-foreground/60 dark:text-white/60 mt-3 max-w-xl text-sm">
              Projets complets construits par nos soins. Ce que vous voyez est exactement ce que nous livrons.
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

      {/* ══ DESKTOP : pin + scrub ═══════════════════════════ */}
      <div
        ref={wrapRef}
        className="hidden lg:block relative"
        style={{ height: `${PIN_SCREENS * 100}vh` }}
        aria-label="Galerie de réalisations"
      >
        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen overflow-hidden bg-background dark:bg-[#0A0F1C]">

          {/* Counter + progress bar */}
          <div className="absolute top-6 right-8 z-20 flex items-center gap-4">
            <div className="flex gap-1.5">
              {PANELS.map((_, i) => (
                <span
                  key={i}
                  className={`block h-0.5 rounded-full transition-all duration-300 ${
                    i === active ? 'w-8 bg-electric' : 'w-2 bg-navy/20 dark:bg-white/20'
                  }`}
                />
              ))}
            </div>
            <span className="font-mono text-xs text-foreground/40 dark:text-white/40 tabular-nums">
              {String(active + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(PANELS.length).padStart(2, '0')}
            </span>
          </div>

          {/* Scroll hint — disappears after first panel */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 transition-opacity duration-500"
            style={{ opacity: progress < 0.08 ? 1 : 0 }}
            aria-hidden="true"
          >
            <span className="text-foreground/30 dark:text-white/30 text-xs tracking-widest uppercase">Défiler</span>
            <div className="w-px h-10 bg-gradient-to-b from-foreground/20 dark:from-white/20 to-transparent" />
          </div>

          {/* Horizontal track — slides left via transform */}
          <div
            ref={trackRef}
            className="flex h-full will-change-transform"
            style={{ width: `${PANELS.length * 100}vw`, transition: 'none' }}
          >
            {PANELS.map((r, i) => (
              <div
                key={r.slug}
                className="relative flex-shrink-0 h-full overflow-hidden"
                style={{ width: '100vw' }}
              >
                {/* Giant project name filigrane — parallax layer */}
                <div
                  data-filigrane
                  className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
                  aria-hidden="true"
                >
                  <span
                    className="font-display font-bold whitespace-nowrap"
                    style={{
                      fontSize: 'clamp(6rem, 14vw, 13rem)',
                      lineHeight: 1,
                      color: r.couleur,
                      opacity: 0.07,
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {r.nom}
                  </span>
                </div>

                {/* Panel content — centered card */}
                <div className="relative z-10 h-full flex items-center justify-center px-16">
                  <div
                    className="w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 bg-white dark:bg-[#0D1626] shadow-2xl"
                    style={{ boxShadow: `0 32px 80px ${r.couleur}33` }}
                  >
                    {/* Browser chrome */}
                    <div className="flex items-center gap-1.5 px-5 py-3.5 border-b border-white/5"
                      style={{ background: `${r.couleur}CC` }}>
                      <span className="w-3 h-3 rounded-full bg-red-400/70" aria-hidden="true" />
                      <span className="w-3 h-3 rounded-full bg-amber-400/70" aria-hidden="true" />
                      <span className="w-3 h-3 rounded-full bg-green-400/70" aria-hidden="true" />
                      <div className="ml-4 flex flex-1 items-center justify-between gap-4">
                        <span className="text-white/60 text-xs font-mono">{new URL(r.url).hostname}</span>
                        <span className="badge-shimmer px-2.5 py-0.5 bg-white/10 text-white/70 text-xs rounded-full">
                          Démonstration
                        </span>
                      </div>
                    </div>

                    {/* Preview area — slow pan illusion with gradient overlay */}
                    <div
                      className="relative overflow-hidden"
                      style={{
                        height: 'clamp(280px, 38vh, 420px)',
                        background: `linear-gradient(155deg, ${r.couleur} 0%, ${r.accent} 100%)`,
                      }}
                    >
                      {/* Simulated UI skeleton — scrolls slowly */}
                      <div
                        className="absolute inset-x-0 top-0 px-8 pt-8 space-y-4"
                        style={{
                          animation: `demo-scroll-${i} 8s ease-in-out infinite alternate`,
                        }}
                      >
                        <div className="h-8 w-2/3 rounded-lg bg-white/20" />
                        <div className="h-4 w-full rounded bg-white/10" />
                        <div className="h-4 w-5/6 rounded bg-white/10" />
                        <div className="flex gap-3 pt-2">
                          <div className="h-10 w-28 rounded-xl bg-white/25" />
                          <div className="h-10 w-24 rounded-xl bg-white/10" />
                        </div>
                        <div className="grid grid-cols-3 gap-3 pt-4">
                          {[1, 2, 3].map(n => (
                            <div key={n} className="h-20 rounded-xl bg-white/10" />
                          ))}
                        </div>
                        <div className="h-4 w-4/5 rounded bg-white/10" />
                        <div className="h-4 w-full rounded bg-white/10" />
                        <div className="grid grid-cols-2 gap-3">
                          {[1, 2].map(n => (
                            <div key={n} className="h-32 rounded-xl bg-white/10" />
                          ))}
                        </div>
                      </div>
                      {/* Bottom fade */}
                      <div
                        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                        style={{ background: `linear-gradient(to top, ${r.couleur}, transparent)` }}
                      />
                    </div>

                    {/* Card body */}
                    <div className="p-8 flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <h3 className="font-display font-bold text-2xl text-foreground dark:text-white mb-1">
                          {r.nom}
                        </h3>
                        <p className="text-sm text-foreground/60 dark:text-white/50 mb-3">{r.type}</p>
                        <p className="text-sm text-foreground/70 dark:text-white/60 leading-relaxed max-w-xl">
                          {r.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {r.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 rounded-full text-xs font-medium border"
                              style={{
                                background: `${r.couleur}18`,
                                color: r.accent,
                                borderColor: `${r.accent}40`,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3 shrink-0">
                        <Link
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
                          style={{ background: r.accent }}
                        >
                          <ExternalLink size={14} />
                          Explorer la démo
                        </Link>
                        <Link
                          href={`/realisations/${r.slug}`}
                          className="text-xs text-foreground/50 dark:text-white/40 hover:text-electric transition-colors"
                        >
                          Voir la fiche →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Panel index bottom-left */}
                <div className="absolute bottom-8 left-8 z-20" aria-hidden="true">
                  <span
                    className="font-mono font-bold text-7xl leading-none select-none"
                    style={{ color: r.couleur, opacity: 0.12 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ MOBILE : snap carousel (conservé) ═══════════════ */}
      <div className="lg:hidden">
        <div
          ref={snapRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
          aria-label="Galerie de réalisations"
        >
          {PANELS.map((r, i) => (
            <div
              key={r.slug}
              className="snap-center shrink-0 w-[85vw] max-w-sm mx-2 first:ml-[7.5vw] last:mr-[7.5vw]"
            >
              <div className="rounded-2xl overflow-hidden border border-navy/20 dark:border-white/10 bg-white dark:bg-[#0D1626] shadow-lg">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5"
                  style={{ background: `${r.couleur}CC` }}>
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" aria-hidden="true" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" aria-hidden="true" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" aria-hidden="true" />
                  <span className="ml-3 text-white/60 text-xs font-mono truncate">{new URL(r.url).hostname}</span>
                </div>
                <div
                  className="h-40 flex items-center justify-center relative"
                  style={{ background: `linear-gradient(135deg, ${r.couleur}, ${r.accent})` }}
                >
                  <span className="font-display font-bold text-white/80 text-5xl">
                    {r.nom.charAt(0)}
                  </span>
                  <span
                    className="absolute top-2 right-2 badge-shimmer px-2 py-0.5 bg-black/30 text-white/60 text-xs rounded-full"
                  >
                    Démonstration
                  </span>
                </div>
                <div className="p-4">
                  <div className="text-xs text-foreground/50 dark:text-white/40 font-mono mb-1">
                    {String(i + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(PANELS.length).padStart(2, '0')}
                  </div>
                  <h3 className="font-display font-bold text-foreground dark:text-white mb-0.5">{r.nom}</h3>
                  <p className="text-xs text-foreground/60 dark:text-white/50 mb-3">{r.type}</p>
                  <Link
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-white px-3 py-1.5 rounded-lg w-fit"
                    style={{ background: r.accent }}
                  >
                    <ExternalLink size={11} /> Explorer
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile dots */}
        <div className="flex items-center justify-center gap-2 mt-5 pb-10">
          {PANELS.map((_, i) => (
            <button
              key={i}
              onClick={() => snapTo(i)}
              aria-label={`Réalisation ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                snapActive === i ? 'w-6 h-2 bg-electric' : 'w-2 h-2 bg-navy/20 dark:bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

    </section>
  )
}
