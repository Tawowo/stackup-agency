'use client'
/**
 * LA PREUVE PAR 3 — Concept V4
 * 3 panels pleine largeur à scroll :
 * 1. Comparateur de prix (jauges animées agence vs Stackup)
 * 2. Morph code → site (textarea de code qui fond en page web)
 * 3. Timeline 10 jours (barres qui se remplissent jour par jour)
 */
import { useState, useEffect, useRef } from 'react'
import { CheckCircle, Code2, Globe } from 'lucide-react'
import { SITE } from '@/config/site'

// ─── Panel 1 : Comparateur de prix ───────────────────────────────────────────
function PriceComparator({ isVisible }: { isVisible: boolean }) {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    let frame = 0
    const dur = 1400
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setPct(Math.round(eased * 100))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isVisible])

  const agencePrice = 6000
  const stackupPrice = SITE.pricing.vitrine
  const agenceRatio = 100
  const stackupRatio = Math.round((stackupPrice / agencePrice) * 100)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* Agence classique */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-medium text-navy/60">Agence classique</span>
            <span className="text-xl font-black text-navy/40 tabular-nums data-mono">
              {isVisible ? Math.round((pct / 100) * agencePrice).toLocaleString('fr-FR') : 0}&thinsp;€
            </span>
          </div>
          <div className="h-10 bg-gray-100 rounded-xl overflow-hidden relative">
            <div
              className="h-full rounded-xl transition-none bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-end pr-3"
              style={{ width: `${pct * agenceRatio / 100}%`, transition: isVisible ? 'width 1.4s cubic-bezier(0.16,1,0.3,1)' : 'none' }}
            >
              {pct > 50 && <span className="text-white text-xs font-bold">3–8 mois</span>}
            </div>
          </div>
        </div>
        {/* Stackup */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-bold text-navy">Stackup Agency</span>
            <span className="text-xl font-black text-gold tabular-nums data-mono">
              {isVisible ? Math.round((pct / 100) * stackupPrice).toLocaleString('fr-FR') : 0}&thinsp;€
            </span>
          </div>
          <div className="h-10 bg-gold/10 rounded-xl overflow-hidden relative">
            <div
              className="h-full rounded-xl bg-gradient-to-r from-gold to-amber-400 flex items-center justify-end pr-3"
              style={{ width: `${pct * stackupRatio / 100}%`, transition: isVisible ? 'width 1.4s cubic-bezier(0.16,1,0.3,1)' : 'none' }}
            >
              {pct > 30 && <span className="text-ink text-xs font-bold">10 jours</span>}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-3 bg-gold/8 border border-gold/20 rounded-xl p-4">
        <div className="text-3xl font-black text-gold data-mono tabular-nums">
          {Math.round((1 - stackupRatio / 100) * 100)}%
        </div>
        <p className="text-sm text-navy/70">moins cher, avec le même niveau de qualité et bien plus de réactivité.</p>
      </div>
    </div>
  )
}

// ─── Panel 2 : Morph code → site ─────────────────────────────────────────────
function CodeMorph({ isVisible }: { isVisible: boolean }) {
  const [phase, setPhase] = useState(0) // 0=code, 1=transition, 2=site

  useEffect(() => {
    if (!isVisible) return
    const t1 = setTimeout(() => setPhase(1), 600)
    const t2 = setTimeout(() => setPhase(2), 1400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [isVisible])

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative h-64 rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
        {/* Code panel */}
        <div
          className="absolute inset-0 bg-[#0d1117] p-4 font-mono text-xs transition-all duration-700"
          style={{ opacity: phase >= 2 ? 0 : 1, transform: phase >= 1 ? 'scale(0.98) translateX(-8px)' : 'scale(1)' }}
        >
          <div className="text-gray-500 mb-1">{'// site-vitrine.tsx'}</div>
          <div><span className="text-[#ff7b72]">export default</span> <span className="text-[#d2a8ff]">function</span> <span className="text-[#79c0ff]">Vitrine</span>{'() {'}</div>
          <div className="ml-4"><span className="text-[#ff7b72]">return</span> {'('}</div>
          <div className="ml-8">{'<'}<span className="text-[#7ee787]">main</span> <span className="text-[#79c0ff]">className</span>=<span className="text-[#a5d6ff]">&quot;hero&quot;</span>{'>'}</div>
          <div className="ml-10">{'<'}<span className="text-[#7ee787]">h1</span>{'>'}<span className="text-white">Bienvenue</span>{'</'}<span className="text-[#7ee787]">h1</span>{'>'}</div>
          <div className="ml-10">{'<'}<span className="text-[#7ee787]">p</span>{'>'}<span className="text-gray-300">Votre site web pro</span>{'</'}<span className="text-[#7ee787]">p</span>{'>'}</div>
          <div className="ml-10">{'<'}<span className="text-[#7ee787]">button</span>{'>'}<span className="text-white">Devis gratuit</span>{'</'}<span className="text-[#7ee787]">button</span>{'>'}</div>
          <div className="ml-8">{'</'}<span className="text-[#7ee787]">main</span>{'>'}</div>
          <div className="ml-4">{')'}</div>
          <div>{'}'}</div>
        </div>
        {/* Site panel */}
        <div
          className="absolute inset-0 bg-[#FFFDF9] p-5 transition-all duration-700"
          style={{ opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? 'scale(1)' : 'scale(1.02) translateX(8px)' }}
        >
          <div className="bg-navy rounded-lg h-8 flex items-center px-3 mb-3">
            <div className="flex gap-1.5 mr-3">
              {['bg-red-400','bg-yellow-400','bg-green-400'].map(c => <div key={c} className={`w-2 h-2 rounded-full ${c}`} />)}
            </div>
            <div className="flex-1 bg-white/10 rounded text-white/60 text-[10px] px-2 py-0.5 font-mono">stackup-agency.fr</div>
          </div>
          <div className="text-center py-4">
            <div className="text-2xl font-black text-navy mb-2">Bienvenue</div>
            <div className="text-sm text-navy/55 mb-4">Votre site web pro</div>
            <div className="inline-block bg-gold text-ink text-sm font-bold px-5 py-2 rounded-xl">Devis gratuit</div>
          </div>
          <div className="absolute bottom-3 right-3">
            <Globe size={14} className="text-electric" />
          </div>
        </div>
        {/* Transition flash */}
        {phase === 1 && (
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center">
            <Code2 size={32} className="text-gold animate-spin" />
          </div>
        )}
      </div>
      <div className="mt-4 text-center text-sm text-navy/50">
        Du code propre à un site qui performe — en {SITE.delais.vitrine}
      </div>
    </div>
  )
}

// ─── Panel 3 : Timeline 10 jours ─────────────────────────────────────────────
const DAYS = [
  { label: 'J1', desc: 'Brief & validation maquette', color: 'bg-gold' },
  { label: 'J2', desc: 'Design UI livré', color: 'bg-gold' },
  { label: 'J3', desc: 'Intégration HTML/CSS', color: 'bg-electric' },
  { label: 'J4', desc: 'Fonctionnalités back-end', color: 'bg-electric' },
  { label: 'J5', desc: 'Contenu & textes', color: 'bg-electric' },
  { label: 'J6', desc: 'SEO technique', color: 'bg-navy' },
  { label: 'J7', desc: 'Tests & corrections', color: 'bg-navy' },
  { label: 'J8', desc: 'Recette client', color: 'bg-navy' },
  { label: 'J9', desc: 'Ajustements finaux', color: 'bg-navy' },
  { label: 'J10', desc: '🚀 Mise en ligne !', color: 'bg-green-500' },
]

function Timeline({ isVisible }: { isVisible: boolean }) {
  const [filled, setFilled] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    setFilled(0)
    let i = 0
    const interval = setInterval(() => {
      i++
      setFilled(i)
      if (i >= DAYS.length) clearInterval(interval)
    }, 160)
    return () => clearInterval(interval)
  }, [isVisible])

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-2">
        {DAYS.map((d, i) => (
          <div key={d.label} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 flex-shrink-0 ${
              i < filled ? `${d.color} text-white scale-100` : 'bg-gray-100 text-navy/30 scale-95'
            }`}>
              {i < filled ? (i === DAYS.length - 1 ? '🚀' : <CheckCircle size={14} />) : d.label}
            </div>
            <div className={`flex-1 h-1.5 rounded-full overflow-hidden bg-gray-100`}>
              <div
                className={`h-full rounded-full transition-all duration-300 ${d.color}`}
                style={{ width: i < filled ? '100%' : '0%' }}
              />
            </div>
            <span className={`text-xs transition-all duration-300 flex-shrink-0 w-44 ${i < filled ? 'text-navy/70' : 'text-navy/25'}`}>{d.desc}</span>
          </div>
        ))}
      </div>
      {filled >= DAYS.length && (
        <div className="mt-5 text-center animate-[fadeIn_0.4s_ease]">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2 text-sm font-bold text-green-700">
            <CheckCircle size={16} /> Site livré en 10 jours chrono
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Composant principal ──────────────────────────────────────────────────────
const TABS = [
  { id: 'prix', label: 'Prix comparés', icon: '💰', sub: 'Jusqu\'à 80% moins cher' },
  { id: 'code', label: 'Code → Site', icon: '⚡', sub: 'La magie en direct' },
  { id: 'delai', label: '10 jours', icon: '📅', sub: 'La vraie timeline' },
]

export default function PreuvePar3() {
  const [activeTab, setActiveTab] = useState(0)
  const [wasVisible, setWasVisible] = useState<boolean[]>([false, false, false])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setWasVisible(v => v.map((_, i) => i === activeTab ? true : v[i]))
        obs.disconnect()
      }
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [activeTab])

  function handleTab(i: number) {
    setActiveTab(i)
    setWasVisible(v => v.map((was, idx) => idx === i ? true : was))
  }

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
      <span className="section-number select-none" aria-hidden="true">02</span>
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-96 rounded-full" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse at 80% 0%, rgba(45,125,210,0.07) 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        <div className="section-marker mb-2 reveal-item" aria-hidden="true">[ 02 / PREUVE ]</div>
        <div className="text-xs font-bold text-gold uppercase tracking-[0.2em] mb-3 reveal-item">La preuve par 3</div>
        <h2 className="text-3xl lg:text-5xl font-bold text-navy mb-4 reveal-item" style={{ lineHeight: 1.15 }}>
          Pourquoi Stackup Agency ?
        </h2>
        <p className="text-navy/55 max-w-xl mb-10 reveal-item" style={{ animationDelay: '80ms' }}>
          Pas des promesses — des démonstrations.
        </p>

        {/* Tabs */}
        <div className="flex gap-2 sm:gap-3 mb-10 flex-wrap">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => handleTab(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                i === activeTab
                  ? 'bg-navy text-white border-navy shadow-md shadow-navy/15'
                  : 'bg-white text-navy/60 border-gray-200 hover:border-gold/30 hover:text-navy'
              }`}
            >
              <span>{t.icon}</span>
              <span className="hidden sm:inline">{t.label}</span>
              <span className="sm:hidden">{t.sub}</span>
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="bg-[#FFFDF9] rounded-2xl border border-gray-100 p-6 sm:p-10 min-h-[320px] relative">
          {/* Tab sub-label */}
          <div className="text-xs font-bold text-gold uppercase tracking-widest mb-6 data-mono">{TABS[activeTab].sub}</div>

          {activeTab === 0 && <PriceComparator isVisible={wasVisible[0]} />}
          {activeTab === 1 && <CodeMorph isVisible={wasVisible[1]} />}
          {activeTab === 2 && <Timeline isVisible={wasVisible[2]} />}
        </div>
      </div>
    </section>
  )
}
