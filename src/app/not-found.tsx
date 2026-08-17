'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const TERMINAL_LINES = [
  { text: '> GET /page-introuvable HTTP/1.1', delay: 0 },
  { text: '< HTTP/1.1 404 Not Found', delay: 300, error: true },
  { text: '> Recherche dans le cache local...', delay: 700 },
  { text: '< Aucun résultat trouvé.', delay: 1100, error: true },
  { text: '> Analyse du contenu manquant...', delay: 1500 },
  { text: '< ERROR: Page évaporée dans les internets.', delay: 1900, error: true },
  { text: '> Redirection recommandée : /', delay: 2300 },
]

function TerminalLine({ text, error, visible }: { text: string; error?: boolean; visible: boolean }) {
  return (
    <div
      className={`transition-all duration-300 data-mono text-xs sm:text-sm ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
      } ${error ? 'text-red-400' : 'text-electric/80'}`}
    >
      {text}
      {visible && text === TERMINAL_LINES[TERMINAL_LINES.length - 1].text && (
        <span className="inline-block w-2 h-3.5 bg-electric/80 align-middle ml-1 animate-pulse" />
      )}
    </div>
  )
}

export default function NotFound() {
  const [visibleLines, setVisibleLines] = useState<boolean[]>(Array(TERMINAL_LINES.length).fill(false))

  useEffect(() => {
    TERMINAL_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, line.delay)
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#070B16] flex flex-col items-center justify-center px-4 text-center relative overflow-hidden scanline-section">

      {/* Perspective grid */}
      <div className="persp-grid absolute inset-0" aria-hidden="true" />

      {/* Background halos */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse, rgba(45,125,210,0.08) 0%, transparent 70%)' }} />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.05) 0%, transparent 70%)' }} />

      {/* Terminal box */}
      <div className="relative z-10 w-full max-w-lg mb-10 glass-panel hud-4corners rounded-xl overflow-hidden text-left">
        {/* Terminal chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-black/30">
          <span className="w-3 h-3 rounded-full bg-red-400/70" aria-hidden="true" />
          <span className="w-3 h-3 rounded-full bg-amber-400/70" aria-hidden="true" />
          <span className="w-3 h-3 rounded-full bg-green-400/70" aria-hidden="true" />
          <span className="ml-3 text-white/40 text-xs data-mono">stackup — terminal — 80×24</span>
        </div>
        {/* Terminal body */}
        <div className="p-5 space-y-2 min-h-[180px]">
          {TERMINAL_LINES.map((line, i) => (
            <TerminalLine key={i} text={line.text} error={line.error} visible={visibleLines[i]} />
          ))}
        </div>
      </div>

      {/* Big 404 */}
      <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-4 mb-8 select-none" aria-hidden="true">
        <span
          className="not-found-4 data-mono font-black leading-none"
          style={{ fontSize: 'clamp(5rem, 20vw, 11rem)', color: '#2D7DD2', opacity: 0.9, letterSpacing: '-0.05em' }}
        >4</span>
        <span
          className="not-found-0 data-mono font-black leading-none"
          style={{ fontSize: 'clamp(5rem, 20vw, 11rem)', background: 'linear-gradient(135deg, #F59E0B, #2D7DD2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-0.05em' }}
        >0</span>
        <span
          className="not-found-4b data-mono font-black leading-none"
          style={{ fontSize: 'clamp(5rem, 20vw, 11rem)', color: '#F59E0B', opacity: 0.9, letterSpacing: '-0.05em' }}
        >4</span>
      </div>

      {/* Text */}
      <h1 className="relative z-10 text-xl sm:text-2xl font-bold text-white mb-3">
        Cette page s&apos;est évaporée dans les internets.
      </h1>
      <p className="relative z-10 text-white/50 text-sm max-w-sm mb-10">
        Peut-être une faute de frappe, un lien expiré, ou simplement la magie du web.<br />
        On vous ramène sur quelque chose de solide.
      </p>

      {/* CTAs */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-3 mb-12">
        <Link
          href="/"
          className="btn-magnetic cta-glow px-6 py-3 bg-electric hover:bg-electric-ink text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5"
        >
          ← Retour à l&apos;accueil
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 glass-panel hud-corners text-white/70 hover:text-white font-medium rounded-xl transition-all hover:-translate-y-0.5"
        >
          Nous contacter
        </Link>
      </div>

      {/* Quick links */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 text-sm text-white/40">
        <Link href="/services" className="hover:text-electric transition-colors">Services</Link>
        <span>·</span>
        <Link href="/tarifs" className="hover:text-electric transition-colors">Tarifs</Link>
        <span>·</span>
        <Link href="/realisations" className="hover:text-electric transition-colors">Réalisations</Link>
        <span>·</span>
        <Link href="/blog" className="hover:text-electric transition-colors">Blog</Link>
        <span>·</span>
        <Link href="/faq" className="hover:text-electric transition-colors">FAQ</Link>
      </div>
    </div>
  )
}
