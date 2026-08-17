'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SITE } from '@/config/site'
import { HERO_BLUR_DATA_URL } from '@/config/hero-blur'
import CountUp from '@/components/ui/CountUp'

// ─── Syntax-highlighted code tokens ──────────────────────────────
type Token = { text: string; color: string }
type Line = Token[]

const CODE: Line[] = [
  [
    { text: 'export', color: '#c084fc' },
    { text: ' default ', color: '#e2e8f0' },
    { text: 'function', color: '#c084fc' },
    { text: ' SiteVitrine', color: '#fde68a' },
    { text: '() {', color: '#94a3b8' },
  ],
  [
    { text: '  return', color: '#c084fc' },
    { text: ' (', color: '#94a3b8' },
  ],
  [
    { text: '    <Site', color: '#fb923c' },
    { text: ' délai', color: '#86efac' },
    { text: '=', color: '#94a3b8' },
    { text: '"10 jours"', color: '#fde68a' },
  ],
  [
    { text: '      ', color: '#e2e8f0' },
    { text: 'prix', color: '#86efac' },
    { text: '=', color: '#94a3b8' },
    { text: '"449 €"', color: '#fde68a' },
    { text: ' />', color: '#fb923c' },
  ],
  [
    { text: '  )', color: '#94a3b8' },
  ],
  [
    { text: '}', color: '#94a3b8' },
  ],
]

type Char = { text: string; color: string; lineIdx: number; tokenIdx: number }

function buildCharList(): Char[] {
  const chars: Char[] = []
  CODE.forEach((line, li) => {
    line.forEach((token, ti) => {
      for (const ch of token.text) {
        chars.push({ text: ch, color: token.color, lineIdx: li, tokenIdx: ti })
      }
    })
  })
  return chars
}

const CHAR_LIST = buildCharList()
const TOTAL_CHARS = CHAR_LIST.length

// Orchestrated entrance phases
type EntranceState = {
  overlay: boolean     // cinematic dark overlay visible
  badge: boolean       // badge floated in
  title: boolean       // title words staggering
  subtitle: boolean    // subtitle
  ctas: boolean        // CTA buttons
  trustbar: boolean    // trust bar
  editor: boolean      // code editor visible
}

export default function HeroSection() {
  const [charCount, setCharCount] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'deploying' | 'preview'>('typing')
  const [deployProgress, setDeployProgress] = useState(0)
  const [entrance, setEntrance] = useState<EntranceState>({
    overlay: true, badge: false, title: false, subtitle: false,
    ctas: false, trustbar: false, editor: false,
  })
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([])

  function addTimer(fn: () => void, ms: number) {
    timerRefs.current.push(setTimeout(fn, ms))
  }

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setEntrance({ overlay: false, badge: true, title: true, subtitle: true, ctas: true, trustbar: true, editor: true })
      setCharCount(TOTAL_CHARS)
      setPhase('preview')
      setDeployProgress(100)
      return
    }

    // ── Orchestrated cinematic entrance ──────────────────────────
    // t=0:   overlay starts fading
    addTimer(() => setEntrance(e => ({ ...e, overlay: false })), 0)
    // t=150: badge floats in
    addTimer(() => setEntrance(e => ({ ...e, badge: true })), 150)
    // t=350: title words start staggering (each word has its own delay via CSS)
    addTimer(() => setEntrance(e => ({ ...e, title: true })), 350)
    // t=400: editor appears
    addTimer(() => setEntrance(e => ({ ...e, editor: true })), 400)
    // t=900: subtitle fades in
    addTimer(() => setEntrance(e => ({ ...e, subtitle: true })), 900)
    // t=1100: CTAs slide up
    addTimer(() => setEntrance(e => ({ ...e, ctas: true })), 1100)
    // t=1300: trust bar rises
    addTimer(() => setEntrance(e => ({ ...e, trustbar: true })), 1300)

    // ── Typing cycle (starts after editor appears) ──────────────
    const runCycle = () => {
      setCharCount(0)
      setPhase('typing')
      setDeployProgress(0)

      let c = 0
      const baseDelay = 28

      const typeNext = () => {
        if (c >= TOTAL_CHARS) {
          addTimer(() => {
            setPhase('deploying')
            const start = Date.now()
            const dur = 1800
            const tick = () => {
              const p = Math.min(1, (Date.now() - start) / dur)
              const eased = p < 0.85
                ? p / 0.85 * 0.92
                : 0.92 + (p - 0.85) / 0.15 * 0.08
              setDeployProgress(Math.round(eased * 100))
              if (p < 1) addTimer(tick, 40)
              else {
                setDeployProgress(100)
                addTimer(() => setPhase('preview'), 400)
                addTimer(runCycle, 3500)
              }
            }
            tick()
          }, 400)
          return
        }

        c++
        setCharCount(c)

        const prevChar = CHAR_LIST[c - 1]
        const nextChar = CHAR_LIST[c]
        const isLineEnd = !nextChar || nextChar.lineIdx !== prevChar.lineIdx
        const delay = isLineEnd ? baseDelay * 8 : baseDelay + Math.random() * 10
        addTimer(typeNext, delay)
      }

      addTimer(typeNext, 600)
    }

    addTimer(runCycle, 500)

    // ── Parallax subtil desktop ──────────────────────────────────
    const handleScroll = () => {
      if (!sectionRef.current || !imgRef.current) return
      const { top, height } = sectionRef.current.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -top / height))
      imgRef.current.style.transform = `scale(${1 + progress * 0.05})`
    }
    const mql = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)')
    if (mql.matches) window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      timerRefs.current.forEach(clearTimeout)
      timerRefs.current = []
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Build rendered lines from charCount
  const renderedLines: Line[] = CODE.map(() => [])
  let count = 0
  for (const ch of CHAR_LIST) {
    if (count >= charCount) break
    const existing = renderedLines[ch.lineIdx]
    const last = existing[existing.length - 1]
    if (last && last.color === ch.color) {
      last.text += ch.text
    } else {
      existing.push({ text: ch.text, color: ch.color })
    }
    count++
  }

  const words = 'Le site web qui fait décoller votre activité.'.split(' ')

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#070B16' }}
    >
      {/* ── [PIÈCE 1] Fond vidéo + image parallax ─────────────────── */}
      <div ref={imgRef} className="absolute inset-0 will-change-transform" aria-hidden="true">
        {/* Vidéo H.264 — 1.6 Mo, compatible Chrome/Safari/FF */}
        <video
          className="absolute inset-0 w-full h-full object-cover object-[68%_center]"
          autoPlay muted loop playsInline disablePictureInPicture preload="none"
          poster="/images/hero-monument-s.webp" aria-hidden="true"
        >
          <source src="/hero-accueil.mp4" type="video/mp4" />
        </video>
        {/* Image fallback (no-JS / poster avant load) */}
        <Image
          src="/images/hero-monument-s.webp"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          className="object-cover object-[72%_center] md:object-[68%_center]"
          placeholder="blur"
          blurDataURL={HERO_BLUR_DATA_URL}
          quality={60}
        />
      </div>

      {/* ── [PIÈCE 2b] Trame perspective au sol ──────────────────── */}
      <div className="persp-grid z-[2]" aria-hidden="true" />

      {/* ── [PIÈCE 2] Cinematic dark overlay — s'efface à l'ouverture ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: '#060D1A',
          opacity: entrance.overlay ? 1 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      {/* ── Voiles permanents ──────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-[2]" aria-hidden="true">
        <div className="absolute inset-0 hidden md:block"
          style={{ background: 'linear-gradient(90deg, rgba(6,13,26,.92) 0%, rgba(6,13,26,.55) 35%, transparent 62%)' }}
        />
        <div className="absolute inset-0 md:hidden"
          style={{ background: 'linear-gradient(180deg, rgba(6,13,26,.55), rgba(6,13,26,.85))' }}
        />
        <div className="absolute inset-x-0 top-0 h-[140px]"
          style={{ background: 'linear-gradient(180deg, rgba(6,13,26,.75), transparent)' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-[180px]"
          style={{ background: 'linear-gradient(0deg, rgba(6,13,26,.85), transparent)' }}
        />
        <div className="grain-overlay" />
      </div>

      {/* ── [PIÈCE 3] Contenu orchestré ───────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — séquence orchestrée */}
          <div>
            {/* Section marker mono [ 01 / HERO ] */}
            <div
              className="section-marker mb-4"
              style={{
                opacity: entrance.badge ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }}
              aria-hidden="true"
            >
              <span className="section-marker-type">[ 01 / ACCUEIL ]</span>
            </div>

            {/* [PIÈCE 3a] Badge — float in t=150ms */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-white/80 text-sm mb-8 badge-float"
              style={{
                opacity: entrance.badge ? 1 : 0,
                transform: entrance.badge ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 badge-dot-pulse" aria-hidden="true" />
              <span className="data-mono text-xs tracking-widest">AGENCE WEB — TOURS</span>
            </div>

            {/* [PIÈCE 3b] Titre — word-by-word stagger t=350ms */}
            <h1
              aria-label="Le site web qui fait décoller votre activité."
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              {words.map((word, i) => (
                <span key={i} className="word-mask" style={{ marginRight: '0.28em' }}>
                  <span
                    className="word-inner"
                    style={{
                      transitionDelay: entrance.title ? `${i * 80}ms` : '0ms',
                      ...(entrance.title ? { transform: 'translateY(0)', opacity: 1 } : {}),
                    }}
                  >
                    {i === 2
                      ? <span className="gradient-sig-h">{word}</span>
                      : word}
                  </span>
                </span>
              )).reduce<React.ReactNode[]>((acc, el, i) => i === 0 ? [el] : [...acc, ' ', el], [])}
            </h1>

            {/* [PIÈCE 3c] Subtitle — t=900ms */}
            <p
              className="text-white/80 text-lg lg:text-xl mb-6 max-w-xl leading-relaxed"
              style={{
                opacity: entrance.subtitle ? 1 : 0,
                transform: entrance.subtitle ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.7s ease 0ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0ms',
              }}
            >
              Sites vitrines, e-commerce et applications sur mesure — conçus, développés et mis en
              ligne en 10 jours ouvrés.
            </p>

            {/* [PIÈCE 3d] CTAs — t=1100ms */}
            <div
              className="flex flex-wrap gap-4 mb-5"
              style={{
                opacity: entrance.ctas ? 1 : 0,
                transform: entrance.ctas ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease 0ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0ms',
              }}
            >
              <Link
                href="/contact"
                className="cta-breathe relative px-7 py-4 bg-gold hover:bg-gold/90 text-ink font-bold rounded-xl shadow-lg shadow-amber-500/30 transition-all hover:-translate-y-0.5 overflow-hidden btn-lift"
              >
                Obtenir mon devis gratuit <span className="arrow-slide ml-1">→</span>
              </Link>
              <Link
                href="/services"
                className="px-7 py-4 border border-white/25 text-white hover:bg-white/10 hover:border-white/40 font-semibold rounded-xl transition-all btn-lift"
              >
                Découvrir nos services
              </Link>
            </div>
            <div
              style={{
                opacity: entrance.ctas ? 1 : 0,
                transition: 'opacity 0.6s ease 200ms',
              }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/55 text-xs">
                À partir de {SITE.pricing.vitrine} € · Devis gratuit sous 72 h
              </span>
            </div>
          </div>

          {/* [PIÈCE 4] Code editor — t=400ms, animation propre ──── */}
          <div
            className="hidden lg:flex justify-center"
            style={{
              opacity: entrance.editor ? 1 : 0,
              transform: entrance.editor ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.96)',
              transition: 'opacity 0.8s ease 0ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0ms',
            }}
          >
            <div className="liseré-border w-80 rounded-2xl overflow-hidden shadow-lift-lg hud-corners" style={{ background: '#0D1626', isolation: 'isolate', willChange: 'transform' }}>

              {/* Editor chrome */}
              <div style={{ background: '#111827' }} className="border-b border-white/5">
                <div className="flex items-center gap-1.5 px-4 pt-3 pb-1">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F57]" aria-hidden="true" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" aria-hidden="true" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F]" aria-hidden="true" />
                  <span className="ml-auto text-white/20 text-[10px] font-mono tracking-wide">stackup-agency</span>
                </div>
                <div className="flex text-[11px] font-mono">
                  <div className="px-4 py-1.5 border-b-2 border-blue-400 text-blue-300 bg-[#0D1626]/60">
                    page.tsx
                  </div>
                  <div className="px-4 py-1.5 text-white/20">
                    layout.tsx
                  </div>
                </div>
              </div>

              {/* Code area */}
              {(phase === 'typing' || phase === 'deploying') && (
                <div className="p-4 font-mono text-[12px] leading-relaxed min-h-[180px]">
                  {CODE.map((_, lineIdx) => {
                    const rendered = renderedLines[lineIdx]
                    const isCurrentLine = rendered && rendered.length > 0 &&
                      (() => {
                        const next = renderedLines[lineIdx + 1]
                        return !next || next.length === 0
                      })()
                    const hasContent = rendered && rendered.length > 0
                    if (!hasContent && lineIdx > 0) {
                      const prev = renderedLines[lineIdx - 1]
                      if (!prev || prev.length === 0) return null
                      if (lineIdx > charCount) return null
                    }
                    return (
                      <div key={lineIdx} className="flex items-start gap-3 min-h-[1.5em]">
                        <span className="text-white/20 select-none w-4 text-right flex-shrink-0">
                          {lineIdx + 1}
                        </span>
                        <span>
                          {rendered?.map((tok, ti) => (
                            <span key={ti} style={{ color: tok.color }}>{tok.text}</span>
                          ))}
                          {isCurrentLine && phase === 'typing' && (
                            <span className="cursor-blink" aria-hidden="true" />
                          )}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Deploy bar */}
              {phase === 'deploying' && (
                <div className="px-4 pb-4 -mt-2">
                  <div className="flex items-center justify-between text-[10px] text-white/40 mb-1.5">
                    <span>Building…</span>
                    <span>{deployProgress}%</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-75"
                      style={{ width: `${deployProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Site preview */}
              {phase === 'preview' && (
                <div className="animate-[voile-in_0.4s_cubic-bezier(0.16,1,0.3,1)_both]">
                  <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-50 border-b border-gray-200">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" aria-hidden="true" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" aria-hidden="true" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" aria-hidden="true" />
                    <div className="ml-2 flex-1 h-5 bg-gray-200 rounded text-[10px] text-gray-500 flex items-center px-2 font-mono">
                      votre-site.fr
                    </div>
                    <span className="ml-1 text-[9px] text-emerald-600 font-semibold flex items-center gap-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 badge-dot-pulse" />
                      En ligne
                    </span>
                  </div>
                  <div className="relative overflow-hidden" style={{ height: '158px', background: '#fff' }}>
                    <div
                      className="p-3 space-y-2 absolute inset-x-0 top-0"
                      style={{ animation: 'site-scroll 4s ease-in-out 0.5s infinite alternate' }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="h-3 w-16 rounded bg-[#1E3A5F]" />
                        <div className="flex gap-1.5">
                          {[12,10,14,10].map((w,i) => <div key={i} className="h-2 rounded bg-gray-200" style={{width:`${w}px`}} />)}
                        </div>
                      </div>
                      <div className="h-5 w-3/4 rounded bg-[#1E3A5F]" />
                      <div className="h-2.5 w-full rounded bg-gray-200" />
                      <div className="h-2.5 w-5/6 rounded bg-gray-200" />
                      <div className="flex gap-2 pt-1">
                        <div className="h-7 w-20 rounded-lg bg-amber-400" />
                        <div className="h-7 w-16 rounded-lg bg-gray-200" />
                      </div>
                      <div className="pt-2 grid grid-cols-3 gap-1.5">
                        {[1,2,3].map(n => <div key={n} className="h-10 rounded-lg bg-[#EFF6FF]" />)}
                      </div>
                      <div className="pt-2 h-2.5 w-2/3 rounded bg-gray-300" />
                      <div className="h-2 w-full rounded bg-gray-100" />
                      <div className="grid grid-cols-2 gap-1.5">
                        {[1,2].map(n => <div key={n} className="h-14 rounded-lg bg-[#F8FAFC] border border-gray-100" />)}
                      </div>
                      <div className="pt-1 h-8 w-full rounded-xl bg-[#1E3A5F]/90" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* [PIÈCE 5] Trust bar — t=1300ms, rise animation ──────── */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16"
          style={{
            opacity: entrance.trustbar ? 1 : 0,
            transform: entrance.trustbar ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.8s ease 0ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0ms',
          }}
        >
          {[
            { num: 10, suffix: ' j', label: "de l'idée à la mise en ligne" },
            { num: 100, suffix: ' %', label: 'sur mesure — zéro template' },
            { num: 72, suffix: ' h', label: 'réponse garantie' },
            { num: null, text: 'Code livré', label: 'vous êtes propriétaire' },
          ].map((s, i) => (
            <div
              key={s.label}
              className="text-center p-4 rounded-xl glass-panel hud-4corners reveal-item hover:bg-white/8 transition-colors"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="text-xl font-bold text-white mb-0.5 price-ticker">
                {s.num !== null
                  ? <CountUp target={s.num} suffix={s.suffix} duration={1200} className="price-ticker-inner" />
                  : <span>{s.text}</span>
                }
              </div>
              <div className="text-xs text-white/55">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* [PIÈCE 6] Scroll indicator bounce ─────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5" aria-hidden="true"
        style={{
          opacity: entrance.trustbar ? 1 : 0,
          transition: 'opacity 1s ease 0.5s',
        }}
      >
        <span className="text-white/35 text-xs tracking-widest uppercase">Défiler</span>
        <div className="scroll-indicator w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>

      {/* [PIÈCE 7] Gold vein SVG ─────────────────────────────────── */}
      <svg aria-hidden="true" className="gold-vein absolute bottom-0 left-0 w-full" style={{ height: '160px' }}
        viewBox="0 0 1440 160" preserveAspectRatio="none">
        <path d="M0,160 C200,120 400,40 720,80 C1040,120 1240,40 1440,60" strokeWidth="1.5" style={{ opacity: 0.3 }} />
        <path d="M0,160 C300,100 600,60 900,100 C1100,130 1300,80 1440,100" strokeWidth="1" style={{ opacity: 0.18 }} />
      </svg>

      {/* [PIÈCE 8] Halo lumineux hero ────────────────────────────── */}
      <div className="pointer-events-none absolute top-1/3 right-1/4 w-96 h-96 rounded-full z-[3]" aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse, rgba(45,125,210,0.12) 0%, transparent 70%)',
          animation: 'halo-pulse 5s ease-in-out infinite',
          opacity: entrance.title ? 1 : 0,
          transition: 'opacity 1.5s ease 0.5s',
        }}
      />
    </section>
  )
}
