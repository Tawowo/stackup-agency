/* eslint-disable react/no-unescaped-entities */
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Search, Loader2, CheckCircle, AlertTriangle, XCircle, ChevronDown, ChevronUp } from 'lucide-react'

interface AuditResult {
  url: string
  scores: { performance: number; accessibility: number; seo: number }
  metrics: { lcp: string | null; cls: string | null; tbt: string | null }
  opportunities: { id: string; title: string; description: string; displayValue: string; savings: number }[]
}

function ScoreGauge({ label, score }: { label: string; score: number }) {
  const color = score >= 90 ? 'text-success' : score >= 50 ? 'text-gold' : 'text-red-500'
  const ring = score >= 90 ? 'stroke-success' : score >= 50 ? 'stroke-gold' : 'stroke-red-500'
  const Icon = score >= 90 ? CheckCircle : score >= 50 ? AlertTriangle : XCircle
  const r = 28
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r={r} fill="none" className="stroke-navy/10 dark:stroke-white/10" strokeWidth="6" />
          <circle cx="36" cy="36" r={r} fill="none" className={ring} strokeWidth="6"
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.6s ease' }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-xl font-bold tabular-nums ${color}`}>{score}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs text-foreground/70 dark:text-white/60">
        <Icon size={12} className={color} />
        {label}
      </div>
    </div>
  )
}

function Opportunity({ opp, defaultOpen }: { opp: AuditResult['opportunities'][0]; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false)
  return (
    <div className="rounded-xl border border-navy/15 dark:border-white/10 overflow-hidden">
      <button
        className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-navy/5 dark:hover:bg-white/5 transition-colors"
        onClick={() => setOpen(v => !v)}
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <AlertTriangle size={14} className="text-gold flex-shrink-0 mt-0.5" />
          <span className="text-sm font-medium text-foreground dark:text-white truncate">{opp.title}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {opp.displayValue && <span className="text-xs text-gold font-mono">{opp.displayValue}</span>}
          {open ? <ChevronUp size={14} className="text-foreground/40" /> : <ChevronDown size={14} className="text-foreground/40" />}
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 text-xs text-foreground/60 dark:text-white/50 leading-relaxed border-t border-navy/10 dark:border-white/10 pt-3">
          {opp.description}
        </div>
      )}
    </div>
  )
}

export default function AuditClient() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AuditResult | null>(null)
  const [error, setError] = useState('')

  const run = async () => {
    if (!url.trim()) return
    setLoading(true)
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
      setResult(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Formulaire */}
      <div className="flex gap-3 mb-8">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/30 dark:text-white/30" />
          <input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && run()}
            placeholder="https://mon-site.fr"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-navy/20 dark:border-white/10 bg-white dark:bg-white/5 text-foreground dark:text-white placeholder:text-foreground/30 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-electric/40 text-sm"
          />
        </div>
        <button
          onClick={run}
          disabled={loading || !url.trim()}
          className="flex items-center gap-2 px-6 py-3 bg-electric hover:bg-navy text-white font-semibold rounded-xl transition-colors disabled:opacity-50 text-sm flex-shrink-0"
        >
          {loading ? <><Loader2 size={16} className="animate-spin" /> Analyse…</> : 'Auditer →'}
        </button>
      </div>

      <p className="text-xs text-foreground/40 dark:text-white/30 mb-8 text-center">
        Analyse via Google PageSpeed Insights (mobile). Les scores sont réels, jamais simulés.
      </p>

      {error && (
        <div className="rounded-xl border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400 mb-6">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-8">
          {/* URL analysée */}
          <div className="text-xs text-foreground/40 dark:text-white/30 truncate">
            Résultats pour : <span className="font-mono text-foreground/60 dark:text-white/50">{result.url}</span>
          </div>

          {/* Scores */}
          <div className="rounded-2xl border border-navy/15 dark:border-white/10 p-6">
            <h2 className="text-sm font-semibold text-foreground/60 dark:text-white/50 mb-6 uppercase tracking-wide">Scores (mobile)</h2>
            <div className="flex justify-around flex-wrap gap-6">
              <ScoreGauge label="Performance" score={result.scores.performance} />
              <ScoreGauge label="Accessibilité" score={result.scores.accessibility} />
              <ScoreGauge label="SEO" score={result.scores.seo} />
            </div>
          </div>

          {/* Métriques Core Web Vitals */}
          {(result.metrics.lcp || result.metrics.cls || result.metrics.tbt) && (
            <div className="rounded-2xl border border-navy/15 dark:border-white/10 p-6">
              <h2 className="text-sm font-semibold text-foreground/60 dark:text-white/50 mb-4 uppercase tracking-wide">Core Web Vitals</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'LCP', value: result.metrics.lcp, hint: 'Largest Contentful Paint' },
                  { label: 'TBT', value: result.metrics.tbt, hint: 'Total Blocking Time' },
                  { label: 'CLS', value: result.metrics.cls, hint: 'Cumulative Layout Shift' },
                ].map(m => m.value && (
                  <div key={m.label} className="text-center">
                    <div className="text-lg font-bold font-mono text-foreground dark:text-white">{m.value}</div>
                    <div className="text-xs text-foreground/40 dark:text-white/30">{m.label}</div>
                    <div className="text-xs text-foreground/30 dark:text-white/20 hidden sm:block">{m.hint}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Opportunités */}
          {result.opportunities.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-foreground/60 dark:text-white/50 mb-3 uppercase tracking-wide">Opportunités d'amélioration</h2>
              <div className="space-y-2">
                {result.opportunities.map((opp, i) => (
                  <Opportunity key={opp.id} opp={opp} defaultOpen={i === 0} />
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric text-center">
            <h3 className="text-white font-bold text-lg mb-2">Vous voulez améliorer ces scores ?</h3>
            <p className="text-white/70 text-sm mb-4">Nos sites sont livrés avec des scores Lighthouse ≥ 90 par défaut.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/devis" className="px-6 py-2.5 bg-gold hover:bg-gold/90 text-ink font-bold rounded-xl text-sm transition-all">
                Refondre mon site →
              </Link>
              <Link href="/contact" className="px-6 py-2.5 border border-white/20 text-white hover:bg-white/10 rounded-xl text-sm transition-colors">
                Parler à un expert
              </Link>
            </div>
          </div>

          {/* Liens internes */}
          <div className="flex flex-wrap gap-4 text-sm pt-2 border-t border-navy/10 dark:border-white/10">
            <Link href="/outils" className="text-electric hover:underline">Nos outils gratuits →</Link>
            <Link href="/services" className="text-electric hover:underline">Nos services →</Link>
            <Link href="/tarifs" className="text-electric hover:underline">Voir les tarifs →</Link>
          </div>
        </div>
      )}
    </div>
  )
}
