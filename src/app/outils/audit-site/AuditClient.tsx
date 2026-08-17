/* eslint-disable react/no-unescaped-entities */
'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, CheckCircle, AlertTriangle, ChevronDown, ChevronUp, Zap, Eye, TrendingUp, Shield } from 'lucide-react'

interface AuditResult {
  url: string
  scores: { performance: number; accessibility: number; seo: number }
  metrics: { lcp: string | null; cls: string | null; tbt: string | null }
  opportunities: { id: string; title: string; description: string; displayValue: string; savings: number }[]
}

// ─── CountUp Hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number, active: boolean, delay = 0, duration = 1200) {
  const [v, setV] = useState(0)
  const raf = useRef(0)
  useEffect(() => {
    if (!active) return
    const t = setTimeout(() => {
      let start = 0
      const tick = (now: number) => {
        if (!start) start = now
        const p = Math.min((now - start) / duration, 1)
        const e = 1 - Math.pow(1 - p, 4)
        setV(Math.round(e * target))
        if (p < 1) raf.current = requestAnimationFrame(tick)
      }
      raf.current = requestAnimationFrame(tick)
    }, delay)
    return () => { clearTimeout(t); cancelAnimationFrame(raf.current) }
  }, [target, active, delay, duration])
  return v
}

// ─── Large Score Gauge ─────────────────────────────────────────────────────────
function ScoreGauge({ label, score, icon: Icon, delay = 0, active }: {
  label: string; score: number; icon: React.ElementType; delay?: number; active: boolean
}) {
  const displayed = useCountUp(score, active, delay)
  const pct = displayed / 100
  const r = 52
  const circ = 2 * Math.PI * r
  const dash = pct * circ
  const color = score >= 90 ? '#22c55e' : score >= 50 ? '#F59E0B' : '#ef4444'
  const textColor = score >= 90 ? 'text-success' : score >= 50 ? 'text-gold' : 'text-red-500'
  const grade = score >= 90 ? 'Excellent' : score >= 50 ? 'À améliorer' : 'Critique'

  return (
    <div className="audit-gauge-card flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <circle
            cx="60" cy="60" r={r} fill="none"
            stroke={color} strokeWidth="8"
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.04s linear', filter: `drop-shadow(0 0 6px ${color}60)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold tabular-nums ${textColor}`}>{displayed}</span>
          <span className="text-white/30 text-xs">/100</span>
        </div>
      </div>
      <div className="text-center">
        <div className="flex items-center gap-1.5 justify-center mb-1">
          <Icon size={14} className={textColor} />
          <span className="text-sm font-semibold text-white">{label}</span>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
          score >= 90 ? 'bg-success/20 text-success' :
          score >= 50 ? 'bg-gold/20 text-gold' :
          'bg-red-500/20 text-red-400'
        }`}>{grade}</span>
      </div>
    </div>
  )
}

// ─── Loading Sequence ─────────────────────────────────────────────────────────
const STEPS = [
  { label: 'Connexion à Google PageSpeed', duration: 1200 },
  { label: 'Récupération des métriques Lighthouse', duration: 3000 },
  { label: 'Analyse des Core Web Vitals', duration: 5500 },
  { label: 'Traitement accessibilité & SEO', duration: 8000 },
  { label: 'Génération du rapport final', duration: 0 },
]

function LoadingSequence({ done }: { done: boolean }) {
  const [active, setActive] = useState(0)
  // timer ref

  useEffect(() => {
    const timers = STEPS.slice(0, -1).map((s, i) =>
      setTimeout(() => setActive(i + 1), s.duration)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (done) setActive(STEPS.length)
  }, [done])

  return (
    <div className="max-w-md mx-auto py-16">
      {/* Animated ring */}
      <div className="relative w-20 h-20 mx-auto mb-10">
        <svg className="w-full h-full" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(45,125,210,0.1)" strokeWidth="4" />
          <circle cx="40" cy="40" r="34" fill="none" stroke="#2D7DD2" strokeWidth="4"
            strokeDasharray="53 160" strokeLinecap="round"
            style={{ animation: 'audit-spin 1.2s linear infinite', transformOrigin: '40px 40px' }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Search size={20} className="text-electric" />
        </div>
      </div>

      <div className="space-y-3">
        {STEPS.map((step, i) => {
          const state = i < active ? 'done' : i === active ? 'active' : 'pending'
          return (
            <div key={i} className={`flex items-center gap-3 transition-all duration-500 ${
              state === 'pending' ? 'opacity-30' : 'opacity-100'
            }`} style={{ transform: state === 'pending' ? 'translateX(-4px)' : 'translateX(0)' }}>
              <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                state === 'done' ? 'bg-success/20' :
                state === 'active' ? 'bg-electric/20' : 'bg-white/5'
              }`}>
                {state === 'done' ? (
                  <CheckCircle size={12} className="text-success" />
                ) : state === 'active' ? (
                  <div className="w-2 h-2 rounded-full bg-electric animate-pulse" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                )}
              </div>
              <span className={`text-sm ${state === 'done' ? 'text-white/70' : state === 'active' ? 'text-white font-medium' : 'text-white/30'}`}>
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
      <p className="text-center text-white/30 text-xs mt-8">10 à 20 secondes • Données réelles Google</p>
    </div>
  )
}

// ─── Opportunity Item ─────────────────────────────────────────────────────────
function Opportunity({ opp, index, visible }: {
  opp: AuditResult['opportunities'][0]; index: number; visible: boolean
}) {
  const [open, setOpen] = useState(index === 0)
  return (
    <div
      className="rounded-xl border border-white/10 overflow-hidden transition-all duration-500"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(12px)', transitionDelay: `${index * 80}ms` }}
    >
      <button
        className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-white/5 transition-colors"
        onClick={() => setOpen(v => !v)}
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <AlertTriangle size={14} className="text-gold flex-shrink-0 mt-0.5" />
          <span className="text-sm font-medium text-white">{opp.title}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {opp.displayValue && (
            <span className="text-xs text-gold font-mono bg-gold/10 px-2 py-0.5 rounded-md">{opp.displayValue}</span>
          )}
          {open ? <ChevronUp size={14} className="text-white/30" /> : <ChevronDown size={14} className="text-white/30" />}
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 text-xs text-white/50 leading-relaxed border-t border-white/5 pt-3">
          {opp.description}
        </div>
      )}
    </div>
  )
}

// ─── Results Section ─────────────────────────────────────────────────────────
function Results({ result }: { result: AuditResult }) {
  const [phase, setPhase] = useState(0)
  // Staggered reveal: 0=url, 1=gauges, 2=cwv, 3=opps, 4=verdict, 5=cta

  useEffect(() => {
    const delays = [100, 300, 900, 1600, 2400, 3000]
    const timers = delays.map((d, i) => setTimeout(() => setPhase(i + 1), d))
    return () => timers.forEach(clearTimeout)
  }, [])

  const avg = Math.round((result.scores.performance + result.scores.accessibility + result.scores.seo) / 3)
  const verdict = avg >= 85 ? { label: 'Site performant', color: 'success', desc: 'Votre site est bien optimisé. Quelques ajustements peuvent encore le booster.' } :
                  avg >= 60 ? { label: 'Améliorations possibles', color: 'gold', desc: 'Des gains significatifs sont accessibles, notamment sur la performance mobile.' } :
                  { label: 'Attention requise', color: 'red-500', desc: 'Votre site souffre de problèmes techniques qui affectent son référencement et sa conversion.' }

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* URL badge */}
      <div className={`transition-all duration-500 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/60 font-mono">
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          {result.url}
        </div>
      </div>

      {/* Score Gauges — BIG */}
      <div className={`transition-all duration-700 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ transitionDelay: '0ms' }}>
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-1 h-5 bg-electric rounded-full" />
            <h2 className="text-xs font-semibold text-white/50 uppercase tracking-widest">Scores Lighthouse (mobile)</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <ScoreGauge label="Performance" score={result.scores.performance} icon={Zap} delay={200} active={phase >= 2} />
            <ScoreGauge label="Accessibilité" score={result.scores.accessibility} icon={Eye} delay={400} active={phase >= 2} />
            <ScoreGauge label="SEO" score={result.scores.seo} icon={TrendingUp} delay={600} active={phase >= 2} />
          </div>
        </div>
      </div>

      {/* Core Web Vitals */}
      {(result.metrics.lcp || result.metrics.cls || result.metrics.tbt) && (
        <div className={`transition-all duration-700 ${phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="rounded-2xl border border-white/10 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-5 bg-gold rounded-full" />
              <h2 className="text-xs font-semibold text-white/50 uppercase tracking-widest">Core Web Vitals</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'LCP', value: result.metrics.lcp, hint: 'Largest Contentful Paint', good: '< 2.5s' },
                { label: 'TBT', value: result.metrics.tbt, hint: 'Total Blocking Time', good: '< 200ms' },
                { label: 'CLS', value: result.metrics.cls, hint: 'Cumulative Layout Shift', good: '< 0.1' },
              ].map(m => m.value && (
                <div key={m.label} className="text-center p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-2xl font-bold font-mono text-white mb-1">{m.value}</div>
                  <div className="text-xs font-semibold text-white/60 mb-1">{m.label}</div>
                  <div className="text-xs text-white/25 hidden sm:block">{m.hint}</div>
                  <div className="text-xs text-success/70 hidden sm:block mt-1">Cible : {m.good}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Opportunities */}
      {result.opportunities.length > 0 && (
        <div className={`transition-all duration-700 ${phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-gold/60 rounded-full" />
            <h2 className="text-xs font-semibold text-white/50 uppercase tracking-widest">
              {result.opportunities.length} opportunité{result.opportunities.length > 1 ? 's' : ''} d'amélioration
            </h2>
          </div>
          <div className="space-y-2">
            {result.opportunities.map((opp, i) => (
              <Opportunity key={opp.id} opp={opp} index={i} visible={phase >= 4} />
            ))}
          </div>
        </div>
      )}

      {/* Verdict */}
      <div className={`transition-all duration-700 ${phase >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className={`rounded-2xl p-6 border ${
          avg >= 85 ? 'border-success/30 bg-success/5' :
          avg >= 60 ? 'border-gold/30 bg-gold/5' :
          'border-red-500/30 bg-red-500/5'
        }`}>
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              avg >= 85 ? 'bg-success/20' : avg >= 60 ? 'bg-gold/20' : 'bg-red-500/20'
            }`}>
              <Shield size={18} className={avg >= 85 ? 'text-success' : avg >= 60 ? 'text-gold' : 'text-red-400'} />
            </div>
            <div>
              <div className={`font-bold text-lg mb-1 ${avg >= 85 ? 'text-success' : avg >= 60 ? 'text-gold' : 'text-red-400'}`}>
                {verdict.label}
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{verdict.desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className={`transition-all duration-700 ${phase >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="rounded-2xl p-8 bg-gradient-to-br from-navy via-navy to-electric/80 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #F59E0B, transparent)', transform: 'translate(30%, -30%)' }} />
          <div className="relative z-10">
            <h3 className="text-white font-bold text-xl mb-2">Vous voulez améliorer ces scores ?</h3>
            <p className="text-white/60 text-sm mb-6">
              Nos sites sont livrés avec des scores Lighthouse ≥ 90 en standard. Perf, accessibilité, SEO : tout est optimisé dès le départ.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/devis"
                className="px-6 py-2.5 bg-gold hover:bg-gold/90 text-ink font-bold rounded-xl text-sm transition-all hover:-translate-y-0.5">
                Refondre mon site →
              </Link>
              <Link href="/contact"
                className="px-6 py-2.5 border border-white/20 text-white hover:bg-white/10 rounded-xl text-sm transition-colors">
                Parler à un expert
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <div className="flex flex-wrap gap-4 text-sm pt-2 border-t border-white/5">
        <Link href="/outils" className="text-electric hover:underline">Nos outils gratuits →</Link>
        <Link href="/services" className="text-electric hover:underline">Nos services →</Link>
        <Link href="/tarifs" className="text-electric hover:underline">Voir les tarifs →</Link>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AuditClient() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadDone, setLoadDone] = useState(false)
  const [result, setResult] = useState<AuditResult | null>(null)
  const [error, setError] = useState('')

  const run = async () => {
    if (!url.trim()) return
    setLoading(true)
    setLoadDone(false)
    setResult(null)
    setError('')
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur inconnue')
      setLoadDone(true)
      await new Promise(r => setTimeout(r, 400))
      setResult(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#060D1A] text-white">
      {/* Search bar — always visible */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && run()}
              placeholder="https://mon-site.fr"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric/50 text-base transition-all"
            />
          </div>
          <button
            onClick={run}
            disabled={loading || !url.trim()}
            className="flex items-center gap-2 px-8 py-4 bg-electric hover:bg-electric/90 text-white font-bold rounded-2xl transition-all disabled:opacity-40 text-sm flex-shrink-0 hover:-translate-y-0.5"
            style={{ boxShadow: '0 0 20px rgba(45,125,210,0.4)' }}
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Auditer →'
            )}
          </button>
        </div>

        {!loading && !result && (
          <p className="text-center text-white/25 text-xs mt-4">
            Analyse via Google PageSpeed Insights (mobile) · Données réelles, jamais simulées
          </p>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 mb-8">
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        </div>
      )}

      {/* Loading sequence */}
      {loading && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <LoadingSequence done={loadDone} />
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
          <Results result={result} />
        </div>
      )}
    </div>
  )
}
