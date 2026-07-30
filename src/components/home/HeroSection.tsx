'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SITE } from '@/config/site'
import { HERO_BLUR_DATA_URL } from '@/config/hero-blur'
import CountUp from '@/components/ui/CountUp'

const CODE_LINES = [
  { code: 'export default function', color: '#7dd3fc' },
  { code: '  SiteVitrine()', color: '#fde68a' },
  { code: '    → livrée en 10 jours', color: '#86efac' },
  { code: '    // dès 449 € tout inclus', color: '#94a3b8' },
]

export default function HeroSection() {
  const [typedLines, setTypedLines] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setRevealed(true)
      setTypedLines(CODE_LINES.length)
      return
    }

    const t0 = setTimeout(() => setRevealed(true), 100)
    const timers: ReturnType<typeof setTimeout>[] = [t0]

    const startTyping = (onDone: () => void) => {
      let line = 0
      const iv = setInterval(() => {
        line += 1
        setTypedLines(line)
        if (line >= CODE_LINES.length) {
          clearInterval(iv)
          onDone()
        }
      }, 600)
      return iv
    }

    const cycle = () => {
      setTypedLines(0)
      setFlipped(false)
      const iv = startTyping(() => {
        const t = setTimeout(() => setFlipped(true), 800)
        timers.push(t)
        const t2 = setTimeout(cycle, 5200)
        timers.push(t2)
      })
      return iv
    }

    const iv = cycle()

    // ─── Parallax subtil desktop (transform only) ─────────────────────
    const handleScroll = () => {
      if (!sectionRef.current || !imgRef.current) return
      const { top, height } = sectionRef.current.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -top / height))
      const scale = 1 + progress * 0.06
      imgRef.current.style.transform = `scale(${scale})`
    }

    const mql = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)')
    if (mql.matches) {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    return () => {
      timers.forEach(clearTimeout)
      clearInterval(iv)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const words = 'Le site web qui fait décoller votre activité.'.split(' ')

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#1E3A5F,#0B1A2E)' }}
    >
      {/* ── Couche 1 : image hero (LCP candidate) ───────────────────────── */}
      <div ref={imgRef} className="absolute inset-0 will-change-transform" aria-hidden="true">
        <Image
          src="/images/hero-monument-s.webp"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[72%_center] md:object-[68%_center]"
          placeholder="blur"
          blurDataURL={HERO_BLUR_DATA_URL}
          quality={85}
        />
      </div>

      {/* ── Couche 2 : voiles de lisibilité (pointer-events-none) ───────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Gauche — desktop : lisibilité du texte */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              'linear-gradient(90deg, rgba(6,13,26,.92) 0%, rgba(6,13,26,.55) 35%, transparent 62%)',
          }}
        />
        {/* Mobile : voile vertical global */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              'linear-gradient(180deg, rgba(6,13,26,.55), rgba(6,13,26,.85))',
          }}
        />
        {/* Haut — navbar */}
        <div
          className="absolute inset-x-0 top-0 h-[140px]"
          style={{
            background: 'linear-gradient(180deg, rgba(6,13,26,.75), transparent)',
          }}
        />
        {/* Bas — trust bar */}
        <div
          className="absolute inset-x-0 bottom-0 h-[180px]"
          style={{
            background: 'linear-gradient(0deg, rgba(6,13,26,.85), transparent)',
          }}
        />
        <div className="grain-overlay" />
      </div>

      {/* ── Couche 3 : contenu ──────────────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
              Agence web — Tours, France
            </div>

            <h1
              aria-label="Le site web qui fait décoller votre activité."
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 ${revealed ? 'hero-revealed' : ''}`}
            >
              {words.map((word, i) => (
                <span key={i} className="word-mask" style={{ marginRight: '0.28em' }}>
                  <span className="word-inner" style={{ transitionDelay: `${i * 60}ms` }}>
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <p className="text-white/80 text-lg lg:text-xl mb-6 max-w-xl leading-relaxed">
              Sites vitrines, e-commerce et applications sur mesure — conçus, développés et mis en
              ligne en 10 jours ouvrés.
            </p>

            <div className="flex flex-wrap gap-4 mb-5">
              <Link
                href="/contact"
                className="px-7 py-4 bg-gold hover:bg-gold/80 text-ink font-bold rounded-xl shadow-lg shadow-amber-500/25 transition-all hover:-translate-y-0.5"
              >
                Obtenir mon devis gratuit →
              </Link>
              <Link
                href="/services"
                className="px-7 py-4 border border-white/30 text-white hover:bg-white/10 font-semibold rounded-xl transition-all"
              >
                Découvrir nos services
              </Link>
            </div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs">
              À partir de {SITE.pricing.vitrine} € · Devis gratuit sous 72 h
            </span>
          </div>

          {/* Right: code window flip */}
          <div className="hidden lg:flex justify-center">
            <div className="flip-scene w-72">
              <div
                className={`flip-card w-full ${flipped ? 'flipped' : ''}`}
                style={{ height: '208px' }}
              >
                {/* Front: code */}
                <div className="flip-face w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-[#0D1626] shadow-2xl">
                  <div className="flex items-center gap-1.5 px-4 py-3 bg-[#111827] border-b border-white/5">
                    <span className="w-3 h-3 rounded-full bg-red-400/70" aria-hidden="true" />
                    <span className="w-3 h-3 rounded-full bg-amber-400/70" aria-hidden="true" />
                    <span className="w-3 h-3 rounded-full bg-green-400/70" aria-hidden="true" />
                    <span className="ml-3 text-white/30 text-xs font-mono">page.tsx</span>
                  </div>
                  <div className="p-4 font-mono text-sm space-y-2">
                    {CODE_LINES.map((line, i) => (
                      <div
                        key={i}
                        className={`transition-all duration-300 ${i < typedLines ? 'opacity-100' : 'opacity-0'}`}
                      >
                        <span className="text-white/20 mr-3 text-xs select-none">{i + 1}</span>
                        <span style={{ color: line.color }}>{line.code}</span>
                      </div>
                    ))}
                    {typedLines > 0 && typedLines < CODE_LINES.length && (
                      <span className="inline-block w-2 h-4 bg-blue-400 animate-pulse" aria-hidden="true" />
                    )}
                  </div>
                </div>
                {/* Back: site preview with slow-scroll illusion */}
                <div className="flip-face flip-face-back w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-white shadow-2xl">
                  <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <span className="w-3 h-3 rounded-full bg-red-400/70" aria-hidden="true" />
                    <span className="w-3 h-3 rounded-full bg-amber-400/70" aria-hidden="true" />
                    <span className="w-3 h-3 rounded-full bg-green-400/70" aria-hidden="true" />
                    <span className="ml-3 text-ink/70 text-xs font-mono">votre-site.fr</span>
                    <span aria-hidden="true" className="ml-auto text-[10px] text-success font-medium">● En ligne</span>
                  </div>
                  {/* Scrolling site skeleton — animates upward slowly */}
                  <div className="relative overflow-hidden" style={{ height: 'calc(100% - 41px)' }}>
                    <div
                      className="p-3 space-y-2 absolute inset-x-0 top-0"
                      style={{ animation: 'site-scroll 4s ease-in-out 0.5s infinite alternate' }}
                    >
                      {/* Navbar skeleton */}
                      <div className="flex items-center justify-between mb-1">
                        <div className="h-3 w-16 rounded bg-[#1E3A5F]" />
                        <div className="flex gap-1.5">
                          {[12,10,14,10].map((w,i) => <div key={i} className="h-2 rounded bg-gray-200" style={{width:`${w}px`}} />)}
                        </div>
                      </div>
                      {/* Hero section */}
                      <div className="h-5 w-3/4 rounded bg-[#1E3A5F]" />
                      <div className="h-2.5 w-full rounded bg-gray-200" />
                      <div className="h-2.5 w-5/6 rounded bg-gray-200" />
                      <div className="flex gap-2 pt-1">
                        <div className="h-7 w-20 rounded-lg bg-amber-400" />
                        <div className="h-7 w-16 rounded-lg bg-gray-200" />
                      </div>
                      {/* Cards */}
                      <div className="pt-2 grid grid-cols-3 gap-1.5">
                        {[1,2,3].map(n => <div key={n} className="h-10 rounded-lg bg-[#EFF6FF]" />)}
                      </div>
                      {/* Section 2 */}
                      <div className="pt-2 h-2.5 w-2/3 rounded bg-gray-300" />
                      <div className="h-2 w-full rounded bg-gray-100" />
                      <div className="h-2 w-4/5 rounded bg-gray-100" />
                      <div className="grid grid-cols-2 gap-1.5">
                        {[1,2].map(n => <div key={n} className="h-14 rounded-lg bg-[#F8FAFC] border border-gray-100" />)}
                      </div>
                      {/* CTA */}
                      <div className="pt-1 h-8 w-full rounded-xl bg-[#1E3A5F]/90" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16">
          {[
            { num: 10, suffix: ' j', label: "de l'idée à la mise en ligne" },
            { num: 100, suffix: ' %', label: 'sur mesure — zéro template' },
            { num: 72, suffix: ' h', label: 'réponse garantie' },
            { num: null, text: 'Code livré', label: 'vous êtes propriétaire' },
          ].map((s) => (
            <div
              key={s.label}
              className="text-center p-4 rounded-xl bg-white/5 border border-white/10 reveal-item"
            >
              <div className="text-xl font-bold text-white mb-0.5 price-ticker">
                {s.num !== null
                  ? <CountUp target={s.num} suffix={s.suffix} duration={1200} className="price-ticker-inner" />
                  : <span>{s.text}</span>
                }
              </div>
              <div className="text-xs text-white/60">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Indicateur de scroll ────────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5" aria-hidden="true">
        <span aria-hidden="true" className="text-white/40 text-xs tracking-widest uppercase">Défiler</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" style={{ animation: 'scroll-line 1.8s ease-in-out infinite' }} />
      </div>

      {/* ── Veine dorée SVG — couture vers section suivante ─────── */}
      <svg
        aria-hidden="true"
        className="gold-vein absolute bottom-0 left-0 w-full"
        style={{ height: '160px' }}
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
      >
        <path
          d="M0,160 C200,120 400,40 720,80 C1040,120 1240,40 1440,60"
          strokeWidth="1.5"
          style={{ opacity: 0.3 }}
        />
        <path
          d="M0,160 C300,100 600,60 900,100 C1100,130 1300,80 1440,100"
          strokeWidth="1"
          style={{ opacity: 0.18 }}
        />
      </svg>
    </section>
  )
}
