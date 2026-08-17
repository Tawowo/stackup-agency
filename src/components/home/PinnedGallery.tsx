'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { realisations } from '@/lib/realisations'

const PANELS = realisations  // all 6
const N = PANELS.length

// SVG noise grain ID (inline, unique)
const GRAIN_ID = 'gallery-grain'

/** Inline URL typer — animates the URL string character-by-character when `url` changes */
function UrlTyper({ url }: { url: string }) {
  const [displayed, setDisplayed] = useState(url)
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Start from empty and type the new URL
    setDisplayed('')
    let i = 0
    function tick() {
      i++
      setDisplayed(url.slice(0, i))
      if (i < url.length) {
        rafRef.current = setTimeout(tick, 28)
      }
    }
    rafRef.current = setTimeout(tick, 80)
    return () => { if (rafRef.current) clearTimeout(rafRef.current) }
  }, [url])

  return (
    <span className="text-white/60 text-xs font-mono tracking-tight">
      {displayed}
      <span className="inline-block w-px h-3 bg-white/50 align-middle ml-px animate-pulse" aria-hidden="true" />
    </span>
  )
}

/** Odometer-style counter digit */
function OdometerNum({ n, total }: { n: number; total: number }) {
  return (
    <span className="data-mono text-xs text-foreground/60 dark:text-white/60 tabular-nums">
      {String(n + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(total).padStart(2, '0')}
    </span>
  )
}

export default function PinnedGallery() {
  const wrapRef    = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const tintRef    = useRef<HTMLDivElement>(null)
  const progBarRef = useRef<HTMLDivElement>(null)
  const rafRef     = useRef<number>(0)
  // refs pour le parallax du filigrane (un par panneau)
  const watermarkRefs = useRef<(HTMLSpanElement | null)[]>([])

  const [active, setActive]       = useState(0)
  const [progress, setProgress]   = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  // Mobile snap
  const snapRef = useRef<HTMLDivElement>(null)
  const [snapActive, setSnapActive] = useState(0)

  useEffect(() => {
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mqMotion.matches)

    const mqDesk = window.matchMedia('(min-width: 1024px)')
    setIsDesktop(mqDesk.matches)
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mqDesk.addEventListener('change', onChange)
    return () => mqDesk.removeEventListener('change', onChange)
  }, [])

  // Desktop: CSS-sticky progress + décor reactif
  const updateProgress = useCallback(() => {
    const wrap  = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    const { top, height } = wrap.getBoundingClientRect()
    const vh = window.innerHeight
    const scrollable = height - vh
    const p = Math.max(0, Math.min(1, -top / scrollable))

    // Track horizontal
    track.style.transform = `translateX(${-p * (N - 1) * 100}vw)`

    // Parallax filigrane
    const globalTx = p * (N - 1) * 100
    watermarkRefs.current.forEach((el, i) => {
      if (!el) return
      const offset = globalTx * 0.15 - i * 100 * 0.15
      el.style.transform = `translateX(${offset.toFixed(3)}vw)`
    })

    // Teinte réactive
    const activeIdx = Math.min(N - 1, Math.floor(p * N))
    if (tintRef.current) {
      const col = PANELS[activeIdx].couleur
      tintRef.current.style.background =
        `radial-gradient(ellipse 70% 60% at 50% 50%, ${col}18 0%, transparent 70%)`
    }

    // Barre de progression
    if (progBarRef.current) {
      progBarRef.current.style.transform = `scaleX(${p})`
    }

    setActive(activeIdx)
    setProgress(p)
  }, [])

  useEffect(() => {
    if (!isDesktop || reducedMotion) return

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateProgress)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateProgress()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isDesktop, reducedMotion, updateProgress])

  // Mobile snap
  useEffect(() => {
    if (isDesktop) return
    const el = snapRef.current
    if (!el) return
    const onScroll = () => {
      setSnapActive(Math.min(Math.round(el.scrollLeft / el.clientWidth), N - 1))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [isDesktop])

  const snapTo = (i: number) => {
    snapRef.current?.scrollTo({ left: i * snapRef.current.clientWidth, behavior: 'smooth' })
  }

  // Reduced motion: static grid
  if (reducedMotion) {
    return (
      <section id="realisations" className="py-16 bg-[#0C1222] scanline-section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-10">
          <div className="section-marker mb-2" aria-hidden="true">[ 02 / RÉALISATIONS ]</div>
          <p className="overline-label !text-electric mb-2">Démonstrations</p>
          <h2 className="text-white heading-underline reveal-item">Nos réalisations</h2>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PANELS.map((r) => (
            <Link key={r.slug} href={`/realisations/${r.slug}`}
              className="rounded-2xl overflow-hidden glass-panel hover:shadow-lg transition-shadow">
              <div className="relative h-40">
                <Image src={r.image} alt={r.nom} fill className="object-cover object-top" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white">{r.nom}</h3>
                <p className="text-xs text-white/50">{r.type}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="realisations">

      {/* Filtre grain SVG (inline, 0 Ko réseau) */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id={GRAIN_ID} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="greyNoise" />
            <feBlend in="SourceGraphic" in2="greyNoise" mode="overlay" result="blended" />
            <feComposite in="blended" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-10 bg-[#0C1222] scanline-section">
        <div className="section-marker mb-2" aria-hidden="true">[ 02 / RÉALISATIONS ]</div>
        <div className="flex items-end justify-between">
          <div>
            <p className="overline-label !text-electric mb-2">Démonstrations</p>
            <h2 className="text-white heading-underline reveal-item">
              Nos réalisations
            </h2>
            <p className="text-white/55 mt-3 max-w-xl text-sm">
              Projets complets construits par nos soins. Ce que vous voyez est exactement ce que nous livrons.
            </p>
          </div>
          <Link
            href="/realisations"
            className="hidden sm:flex items-center gap-1 text-electric hover:text-electric/80 font-medium text-sm transition-colors shrink-0"
          >
            Voir tout <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* ══ DESKTOP: CSS sticky horizontal scroll ══ */}
      <section
        ref={wrapRef}
        className="hidden lg:block"
        style={{ height: `${(N + 1) * 100}vh` }}
        aria-label="Galerie de réalisations"
      >
        {/* Sticky scene — forced dark */}
        <div className="sticky top-0 h-screen overflow-hidden" style={{ background: '#070B16' }}>

          {/* Perspective grid layer */}
          <div className="persp-grid absolute inset-0 z-[1]" aria-hidden="true" />

          {/* Grain 3 % */}
          <div
            className="absolute inset-0 pointer-events-none z-[2]"
            style={{ opacity: 0.03, filter: `url(#${GRAIN_ID})`, background: '#888' }}
            aria-hidden="true"
          />

          {/* Teinte réactive */}
          <div
            ref={tintRef}
            className="absolute inset-0 pointer-events-none z-[3]"
            style={{
              transition: 'background 400ms ease',
              background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${PANELS[0].couleur}18 0%, transparent 70%)`,
            }}
            aria-hidden="true"
          />

          {/* Counter — top right — odometer style */}
          <div className="absolute top-6 right-8 z-20 flex items-center gap-4" aria-hidden="true">
            <div className="flex gap-1.5">
              {PANELS.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Projet ${i + 1}`}
                  className={`block h-0.5 rounded-full transition-all duration-300 ${
                    i === active ? 'w-8 bg-electric' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>
            <OdometerNum n={active} total={N} />
          </div>

          {/* Scroll hint */}
          <div
            className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 transition-opacity duration-500 pointer-events-none"
            style={{ opacity: progress < 0.06 ? 1 : 0 }}
            aria-hidden="true"
          >
            <span className="text-white/30 text-xs tracking-widest uppercase data-mono">Défiler</span>
            <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
          </div>

          {/* Barre de progression */}
          <div className="absolute bottom-0 left-0 right-0 z-20 h-px bg-white/10" aria-hidden="true">
            <div
              ref={progBarRef}
              className="h-full origin-left"
              style={{
                background: 'linear-gradient(90deg, #2D7DD2, #F59E0B)',
                transform: 'scaleX(0)',
                transition: 'none',
              }}
            />
          </div>

          {/* Track — N panels side by side */}
          <div
            ref={trackRef}
            className="flex h-full will-change-transform z-[4] relative"
            style={{ width: `${N * 100}vw`, transition: 'none' }}
          >
            {PANELS.map((r, i) => (
              <div
                key={r.slug}
                className="relative flex-shrink-0 h-full overflow-hidden"
                style={{ width: '100vw' }}
              >
                {/* Filigrane avec parallax -15 % */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
                  aria-hidden="true"
                >
                  <span
                    ref={el => { watermarkRefs.current[i] = el }}
                    className="font-display font-bold whitespace-nowrap will-change-transform"
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

                {/* Browser frame card — XXL glass */}
                <div className="relative z-10 h-full flex items-center justify-center px-16">
                  <div
                    className="w-full max-w-4xl rounded-2xl overflow-hidden glass-panel liseré-border"
                    style={{ boxShadow: `0 32px 80px ${r.couleur}33, 0 0 0 1px rgba(255,255,255,0.06)` }}
                  >
                    {/* Browser chrome */}
                    <div className="flex items-center gap-1.5 px-5 py-3.5 border-b border-white/[0.06]"
                      style={{ background: `rgba(7,11,22,0.9)` }}>
                      <span className="w-3 h-3 rounded-full bg-red-400/70" aria-hidden="true" />
                      <span className="w-3 h-3 rounded-full bg-amber-400/70" aria-hidden="true" />
                      <span className="w-3 h-3 rounded-full bg-green-400/70" aria-hidden="true" />
                      {/* URL bar — typing animation on active */}
                      <div className="ml-4 flex flex-1 items-center justify-between gap-4">
                        <div className="flex-1 px-3 py-1 rounded-md bg-white/[0.05] border border-white/[0.08]">
                          {i === active
                            ? <UrlTyper url={r.url} />
                            : <span className="text-white/30 text-xs font-mono tracking-tight">{r.url}</span>
                          }
                        </div>
                        <span className="px-2.5 py-0.5 bg-white/10 text-white/60 text-xs rounded-full data-mono">
                          Démonstration
                        </span>
                      </div>
                    </div>

                    {/* Screenshot */}
                    <div className="relative overflow-hidden" style={{ height: 'clamp(280px, 38vh, 420px)' }}>
                      <Image
                        src={r.image}
                        alt={`Capture d'écran ${r.nom}`}
                        fill
                        sizes="(min-width: 1024px) 56vw"
                        className="object-cover object-top"
                        priority={i < 2}
                        loading={i < 2 ? 'eager' : 'lazy'}
                      />
                      {/* Bottom fade */}
                      <div
                        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                        style={{ background: `linear-gradient(to top, #070B16, transparent)` }}
                      />
                    </div>

                    {/* Card body */}
                    <div className="p-8 flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <h3 className="font-display font-bold text-2xl text-white mb-1">{r.nom}</h3>
                        <p className="text-sm text-white/50 mb-3">{r.type}</p>
                        <p className="text-sm text-white/60 leading-relaxed max-w-xl">{r.description}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {r.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-medium data-mono"
                              style={{ background: `${r.couleur}18`, color: r.accent, border: `1px solid ${r.accent}40` }}>
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
                          className="text-xs text-white/40 hover:text-electric transition-colors"
                        >
                          Voir la fiche →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Panel index — odometer */}
                <div className="absolute bottom-8 left-8 z-20" aria-hidden="true">
                  <span className="data-mono font-bold text-7xl leading-none select-none"
                    style={{ color: r.couleur, opacity: 0.12 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MOBILE: snap carousel ══ */}
      <div className="lg:hidden bg-[#0C1222] pb-10 scanline-section">
        <div
          ref={snapRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
          aria-label="Galerie de réalisations"
        >
          {PANELS.map((r, i) => (
            <div key={r.slug} className="snap-center shrink-0 w-[85vw] max-w-sm mx-2 first:ml-[7.5vw] last:mr-[7.5vw]">
              <div className="rounded-2xl overflow-hidden glass-panel shadow-lg">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.06]"
                  style={{ background: 'rgba(7,11,22,0.9)' }}>
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" aria-hidden="true" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" aria-hidden="true" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" aria-hidden="true" />
                  <span className="ml-3 text-white/55 text-xs font-mono truncate">{new URL(r.url).hostname}</span>
                </div>
                <div className="relative h-40">
                  <Image
                    src={r.image}
                    alt={`Aperçu ${r.nom}`}
                    fill
                    className="object-cover object-top"
                    loading={i < 2 ? 'eager' : 'lazy'}
                  />
                  <span className="absolute top-2 right-2 px-2 py-0.5 bg-black/40 text-white/60 text-xs rounded-full data-mono">
                    Démo
                  </span>
                </div>
                <div className="p-4">
                  <div className="text-xs text-white/40 data-mono mb-1">
                    {String(i + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(N).padStart(2, '0')}
                  </div>
                  <h3 className="font-display font-bold text-white mb-0.5">{r.nom}</h3>
                  <p className="text-xs text-white/50 mb-3">{r.type}</p>
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
        <div className="flex items-center justify-center gap-2 mt-5">
          {PANELS.map((_, i) => (
            <button
              key={i}
              onClick={() => snapTo(i)}
              aria-label={`Réalisation ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                snapActive === i ? 'w-6 h-2 bg-electric' : 'w-2 h-2 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

    </section>
  )
}
