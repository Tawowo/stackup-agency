'use client'
/**
 * L'ATELIER — Concept V4
 * Split sticky : gauche = liste des 7 services / droite = navigateur vivant
 * qui MONTRE le service actif en train de se construire.
 */
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Monitor, LayoutGrid, ShoppingCart, Settings, Users, PenLine, BarChart2 } from 'lucide-react'
import { SERVICES } from '@/config/site'

// ─── Mini-prévisualisations animées par service ───────────────────────────
// Chaque composant simule la construction du service sous les yeux
function PreviewVitrine() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep(s => (s < 4 ? s + 1 : s)), 500)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="p-4 space-y-3 font-sans">
      {/* Header */}
      <div className={`transition-all duration-500 ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex items-center justify-between h-8 bg-navy rounded px-3">
          <div className="w-16 h-2 bg-white/60 rounded-full" />
          <div className="flex gap-1.5">
            {['Accueil','Services','Contact'].map(l => <div key={l} className="h-1.5 w-8 bg-white/30 rounded-full" />)}
          </div>
          <div className="h-5 w-14 bg-gold rounded text-[7px] text-ink font-bold flex items-center justify-center">Devis →</div>
        </div>
      </div>
      {/* Hero */}
      <div className={`transition-all duration-500 delay-200 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="h-20 bg-gradient-to-br from-navy to-electric rounded-lg flex items-center px-4">
          <div className="space-y-1">
            <div className="h-3 w-28 bg-white/80 rounded-full" />
            <div className="h-2 w-20 bg-white/40 rounded-full" />
            <div className="h-4 w-16 bg-gold rounded mt-2 text-[7px] text-ink font-bold flex items-center justify-center">Contactez-nous</div>
          </div>
        </div>
      </div>
      {/* Services grid */}
      <div className={`grid grid-cols-3 gap-1.5 transition-all duration-500 delay-400 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-50 border border-gray-200 rounded p-2 space-y-1">
            <div className="w-5 h-5 bg-electric/20 rounded" />
            <div className="h-1.5 w-full bg-gray-300 rounded-full" />
            <div className="h-1.5 w-2/3 bg-gray-200 rounded-full" />
          </div>
        ))}
      </div>
      {/* CTA */}
      <div className={`transition-all duration-500 delay-[600ms] ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="h-8 bg-gold rounded flex items-center justify-center text-[8px] text-ink font-bold">
          ✓ Site en ligne — devis gratuit →
        </div>
      </div>
    </div>
  )
}

function PreviewEcommerce() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep(s => (s < 4 ? s + 1 : s)), 450)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="p-4 space-y-2.5">
      {/* Navbar boutique */}
      <div className={`transition-all duration-500 ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex items-center justify-between h-7 bg-gray-50 border border-gray-200 rounded px-2">
          <div className="w-12 h-2 bg-navy rounded-full" />
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-electric/20 rounded text-[7px] flex items-center justify-center">🛒</div>
            <div className="h-4 px-2 bg-gold rounded text-[7px] text-ink font-bold flex items-center">Panier (3)</div>
          </div>
        </div>
      </div>
      {/* Produits */}
      <div className={`grid grid-cols-2 gap-1.5 transition-all duration-500 delay-300 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {[
          { c: 'bg-amber-100', p: '24 €', n: 'Produit A' },
          { c: 'bg-blue-100', p: '39 €', n: 'Produit B' },
          { c: 'bg-pink-100', p: '18 €', n: 'Produit C' },
          { c: 'bg-green-100', p: '52 €', n: 'Produit D' },
        ].map((p, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded overflow-hidden">
            <div className={`h-10 ${p.c}`} />
            <div className="p-1.5">
              <div className="h-1.5 w-3/4 bg-gray-300 rounded-full mb-1" />
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-bold text-navy">{p.p}</span>
                <div className="h-3 px-1 bg-electric rounded text-[6px] text-white flex items-center">+</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Paiement Stripe */}
      <div className={`transition-all duration-500 delay-[600ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="bg-[#635BFF] rounded p-2 text-[7px] text-white font-medium text-center">
          💳 Paiement sécurisé Stripe — 133 €
        </div>
      </div>
      {/* Confirmation */}
      <div className={`transition-all duration-500 delay-[800ms] ${step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="bg-green-50 border border-green-200 rounded p-1.5 text-[7px] text-green-700 font-semibold text-center">
          ✓ Commande confirmée · Livraison sous 48h
        </div>
      </div>
    </div>
  )
}

function PreviewGestion() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep(s => (s < 4 ? s + 1 : s)), 400)
    return () => clearInterval(id)
  }, [])
  const bars = [65, 42, 88, 55, 72]
  return (
    <div className="p-4 space-y-2.5">
      {/* Sidebar + main */}
      <div className="flex gap-2 h-32">
        {/* Sidebar */}
        <div className={`w-14 bg-navy rounded space-y-1 p-1.5 transition-all duration-500 ${step >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          {['Tableau','Clients','Devis','Stock','Rapports'].map((l, i) => (
            <div key={l} className={`h-4 rounded text-[5px] flex items-center px-1 transition-colors ${i === 0 ? 'bg-gold text-ink font-bold' : 'text-white/50'}`}>
              {l}
            </div>
          ))}
        </div>
        {/* Dashboard */}
        <div className="flex-1 space-y-1.5">
          {/* KPIs */}
          <div className={`grid grid-cols-2 gap-1 transition-all duration-500 delay-200 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {[
              { label: 'CA / mois', val: '12 480 €', c: 'text-electric' },
              { label: 'Devis ouverts', val: '7', c: 'text-gold' },
            ].map(k => (
              <div key={k.label} className="bg-white border border-gray-100 rounded p-1.5">
                <div className="text-[5px] text-navy/40 uppercase tracking-wide">{k.label}</div>
                <div className={`text-[9px] font-bold ${k.c}`}>{k.val}</div>
              </div>
            ))}
          </div>
          {/* Chart bars */}
          <div className={`bg-white border border-gray-100 rounded p-1.5 transition-all duration-500 delay-400 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="text-[5px] text-navy/40 mb-1">CHIFFRE D&apos;AFFAIRES</div>
            <div className="flex items-end gap-0.5 h-8">
              {bars.map((h, i) => (
                <div key={i} className="flex-1 bg-electric/20 rounded-sm relative overflow-hidden">
                  <div
                    className="absolute bottom-0 w-full bg-electric rounded-sm transition-all duration-700"
                    style={{
                      height: step >= 3 ? `${h}%` : '0%',
                      transitionDelay: `${i * 80 + 400}ms`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Notification */}
      <div className={`transition-all duration-500 delay-[700ms] ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="bg-gold/10 border border-gold/30 rounded p-1.5 text-[7px] text-navy font-medium">
          🔔 Nouveau devis signé · Client: Martin Dupont · 2 400 €
        </div>
      </div>
    </div>
  )
}

function PreviewAssociation() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep(s => (s < 3 ? s + 1 : s)), 500)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="p-4 space-y-2.5">
      <div className={`transition-all duration-500 ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="h-14 bg-gradient-to-r from-green-600 to-emerald-500 rounded flex items-center justify-center">
          <div className="text-center">
            <div className="text-[8px] text-white/80 uppercase tracking-widest">Association</div>
            <div className="h-2 w-24 bg-white/80 rounded-full mx-auto mt-1" />
          </div>
        </div>
      </div>
      <div className={`grid grid-cols-3 gap-1 transition-all duration-500 delay-300 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {[
          { t: '47 membres', i: '👥' }, { t: '3 événements', i: '📅' }, { t: 'Don en ligne', i: '💚' }
        ].map(c => (
          <div key={c.t} className="bg-emerald-50 border border-emerald-100 rounded p-1.5 text-center">
            <div className="text-sm">{c.i}</div>
            <div className="text-[6px] text-emerald-700 font-semibold mt-0.5">{c.t}</div>
          </div>
        ))}
      </div>
      <div className={`transition-all duration-500 delay-[600ms] ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="bg-emerald-600 rounded p-1.5 text-[7px] text-white font-bold text-center">
          Je deviens bénévole →
        </div>
      </div>
    </div>
  )
}

function PreviewBlog() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep(s => (s < 4 ? s + 1 : s)), 400)
    return () => clearInterval(id)
  }, [])
  const words = ['Comment','booster','son','SEO','local','en','2026','?']
  return (
    <div className="p-4 space-y-2">
      <div className={`transition-all duration-500 ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="h-10 bg-gradient-to-r from-amber-400 to-amber-500 rounded flex items-center px-3">
          <div className="text-[8px] text-ink font-bold">Rédaction SEO · stackup-agency.fr</div>
        </div>
      </div>
      <div className={`space-y-1 transition-all duration-500 delay-200 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-wrap gap-0.5">
          {words.map((w, i) => (
            <span
              key={i}
              className="text-[8px] font-bold text-navy transition-all duration-300"
              style={{
                opacity: step >= 2 ? 1 : 0,
                transitionDelay: `${i * 60 + 200}ms`,
              }}
            >{w} </span>
          ))}
        </div>
      </div>
      <div className={`space-y-1 transition-all duration-500 delay-500 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        {[80, 90, 60].map((w, i) => (
          <div key={i} className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gold/60 rounded-full transition-all duration-700" style={{ width: step >= 3 ? `${w}%` : '0%', transitionDelay: `${i * 120 + 500}ms` }} />
          </div>
        ))}
        <div className="text-[6px] text-navy/40 uppercase tracking-wide">Densité mots-clés · Lisibilité · Score SEO</div>
      </div>
      <div className={`transition-all duration-500 delay-[800ms] ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <div className="bg-gold/10 border border-gold/30 rounded p-1 text-[7px] text-navy font-semibold">
          ✓ Article publié et indexé · Position estimée : Top 5 Google
        </div>
      </div>
    </div>
  )
}

function PreviewMarketing() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep(s => (s < 4 ? s + 1 : s)), 450)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="p-4 space-y-2.5">
      {/* Google Ads preview */}
      <div className={`transition-all duration-500 ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="bg-white border border-gray-200 rounded p-2">
          <div className="text-[6px] text-green-700 font-bold mb-0.5">📢 Annonce sponsorisée</div>
          <div className="text-[8px] text-electric font-semibold">Artisan Plombier Tours — Devis Gratuit</div>
          <div className="text-[6px] text-gray-500 mt-0.5">3 clics · 0,42 €/clic · 1,26 € dépensés</div>
        </div>
      </div>
      {/* Analytics chart */}
      <div className={`bg-white border border-gray-100 rounded p-2 transition-all duration-500 delay-300 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="text-[5px] text-navy/40 uppercase mb-1">VISITES / SEMAINE</div>
        <div className="flex items-end gap-0.5 h-10">
          {[30,45,40,60,55,80,95].map((h, i) => (
            <div key={i} className="flex-1 relative">
              <div className="absolute bottom-0 w-full bg-electric rounded-sm transition-all duration-500"
                style={{ height: step >= 2 ? `${h}%` : '0%', transitionDelay: `${i * 60 + 300}ms` }} />
            </div>
          ))}
        </div>
        <div className={`text-[7px] text-green-600 font-bold mt-1 transition-all duration-300 delay-[700ms] ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
          ↑ +216 % de trafic en 4 semaines
        </div>
      </div>
      {/* Rapport */}
      <div className={`transition-all duration-500 delay-[800ms] ${step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="bg-navy rounded p-1.5 text-[7px] text-white font-medium text-center">
          Rapport mensuel · 47 prospects générés
        </div>
      </div>
    </div>
  )
}

function PreviewMultiPages() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep(s => (s < 4 ? s + 1 : s)), 450)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="p-4 space-y-2">
      {/* Pages listing */}
      <div className={`space-y-1.5 transition-all duration-500 ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {['Accueil','Services','Galerie','Blog','Contact'].map((p, i) => (
          <div key={p} className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded px-2 py-1"
            style={{ transitionDelay: `${i * 80}ms` }}>
            <span className="text-[7px] text-navy font-medium">{p}</span>
            <div className={`text-[6px] transition-all duration-300 ${step >= 2 ? 'text-green-600 font-bold' : 'text-gray-300'}`}
              style={{ transitionDelay: `${i * 100 + 300}ms` }}>
              {step >= 2 ? '✓ Publié' : '···'}
            </div>
          </div>
        ))}
      </div>
      {/* Analytics */}
      <div className={`grid grid-cols-3 gap-1 transition-all duration-500 delay-500 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}>
        {[
          { l: 'Pages', v: '5' }, { l: 'Articles', v: '12' }, { l: 'SEO', v: '96/100' }
        ].map(k => (
          <div key={k.l} className="bg-electric/10 rounded p-1 text-center">
            <div className="text-[9px] font-bold text-electric">{k.v}</div>
            <div className="text-[5px] text-navy/50">{k.l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Map service ID → preview component & colors ────────────────────────
const PREVIEW_MAP: Record<string, { Component: () => JSX.Element; accent: string; bgFrom: string; bgTo: string }> = {
  'site-vitrine':       { Component: PreviewVitrine,     accent: '#2D7DD2', bgFrom: '#EFF6FF', bgTo: '#DBEAFE' },
  'site-multi-pages':   { Component: PreviewMultiPages,  accent: '#2D7DD2', bgFrom: '#EFF6FF', bgTo: '#BFDBFE' },
  'site-ecommerce':     { Component: PreviewEcommerce,   accent: '#1E3A5F', bgFrom: '#EEF2FF', bgTo: '#C7D2FE' },
  'systeme-gestion':    { Component: PreviewGestion,     accent: '#1E3A5F', bgFrom: '#F0FDF4', bgTo: '#DCFCE7' },
  'site-association':   { Component: PreviewAssociation, accent: '#16A34A', bgFrom: '#F0FDF4', bgTo: '#BBF7D0' },
  'redaction-blog-seo': { Component: PreviewBlog,        accent: '#D97706', bgFrom: '#FFFBEB', bgTo: '#FEF3C7' },
  'marketing-digital':  { Component: PreviewMarketing,   accent: '#7C3AED', bgFrom: '#FAF5FF', bgTo: '#EDE9FE' },
}

// ─── Service list item ────────────────────────────────────────────────────
import type { LucideIcon } from 'lucide-react'
const SERVICE_ICONS: Record<string, LucideIcon> = {
  'site-vitrine':       Monitor,
  'site-multi-pages':   LayoutGrid,
  'site-ecommerce':     ShoppingCart,
  'systeme-gestion':    Settings,
  'site-association':   Users,
  'redaction-blog-seo': PenLine,
  'marketing-digital':  BarChart2,
}

export default function Atelier() {
  const [active, setActive] = useState(0)
  const [, setPrevActive] = useState(0)
  const [animKey, setAnimKey] = useState(0) // force remount on change
  const services = [...SERVICES]

  function handleSelect(i: number) {
    if (i === active) return
    setPrevActive(active)
    setActive(i)
    setAnimKey(k => k + 1)
  }

  const svc = services[active]
  const meta = PREVIEW_MAP[svc.id] ?? PREVIEW_MAP['site-vitrine']
  const Preview = meta.Component

  return (
    <section id="services" className="py-24 bg-[#FFFDF9] relative overflow-hidden">
      {/* Halos */}
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[400px]" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 70%)' }} />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[300px]" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse, rgba(45,125,210,0.05) 0%, transparent 70%)' }} />
      <span className="section-number select-none" aria-hidden="true">01</span>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <div className="section-marker mb-2" aria-hidden="true">[ 01 / L&apos;ATELIER ]</div>
          <div className="text-xs font-bold text-gold uppercase tracking-[0.2em] mb-3">L&apos;Atelier</div>
          <h2 className="text-3xl lg:text-5xl font-bold text-navy mb-4" style={{ lineHeight: 1.15 }}>
            Nos services web
          </h2>
          <p className="text-navy/55 max-w-xl">
            Survolez chaque service — et voyez-le se construire en direct.
          </p>
        </div>

        {/* Desktop: sticky split */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — liste services */}
          <div className="space-y-2">
            {services.map((s, i) => {
              const isActive = i === active
              const pm = PREVIEW_MAP[s.id]
              return (
                <button
                  key={s.id}
                  onClick={() => handleSelect(i)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 group ${
                    isActive
                      ? 'bg-white border-gray-200 shadow-[0_8px_32px_rgba(30,58,95,0.12)] -translate-y-0.5'
                      : 'bg-white/50 border-transparent hover:bg-white hover:border-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {(() => { const Icon = SERVICE_ICONS[s.id]; return Icon ? <Icon size={20} strokeWidth={1.5} className={`flex-shrink-0 transition-colors ${isActive ? 'text-navy' : 'text-navy/45 group-hover:text-navy'}`} aria-hidden="true" /> : null })()}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`font-bold text-sm transition-colors ${isActive ? 'text-navy' : 'text-navy/70 group-hover:text-navy'}`}>
                          {s.titre}
                        </span>
                        {s.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-gold/15 text-amber-700 rounded-full">
                            {s.badge}
                          </span>
                        )}
                      </div>
                      <p className={`text-xs transition-colors line-clamp-1 ${isActive ? 'text-navy/55' : 'text-navy/35 group-hover:text-navy/50'}`}>
                        {s.desc}
                      </p>
                    </div>
                    {s.prix && (
                      <span className={`text-sm font-bold tabular-nums data-mono shrink-0 transition-colors ${isActive ? 'text-gold' : 'text-navy/40 group-hover:text-gold/70'}`}>
                        {s.prix} {s.unite}
                      </span>
                    )}
                    {/* Active indicator bar */}
                    {isActive && (
                      <div className="w-0.5 h-8 rounded-full self-center" style={{ background: pm.accent }} />
                    )}
                  </div>
                </button>
              )
            })}
            <Link href="/services" className="inline-flex items-center gap-2 text-electric-ink hover:text-navy font-medium transition-colors mt-4 text-sm">
              Voir tous nos services <ArrowRight size={14} />
            </Link>
          </div>

          {/* Right — navigateur vivant sticky */}
          <div className="sticky top-24">
            {/* Browser frame */}
            <div className="browser-frame-light overflow-hidden rounded-2xl"
              style={{ boxShadow: '0 32px 80px rgba(30,58,95,0.15), 0 4px 12px rgba(30,58,95,0.06)' }}>
              {/* Browser bar */}
              <div className="browser-bar-light">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="browser-url-light mx-2 flex items-center gap-1">
                  <span className="text-green-600 text-[10px]">🔒</span>
                  <span className="text-xs text-navy/40 font-mono truncate">stackup-demo.fr / {svc.id}</span>
                </div>
                <ExternalLink size={11} className="text-navy/25" />
              </div>

              {/* Preview area */}
              <div
                className="relative overflow-hidden transition-all duration-500"
                style={{
                  minHeight: '320px',
                  background: `linear-gradient(135deg, ${meta.bgFrom} 0%, ${meta.bgTo} 100%)`,
                }}
              >
                {/* Titre du service en construction */}
                <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-10">
                  <span className="text-[9px] font-bold text-navy/40 uppercase tracking-widest data-mono">
                    {svc.titre} — en construction…
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] text-green-600 font-bold">LIVE</span>
                  </span>
                </div>

                {/* Preview component (remounted on change) */}
                <div key={`${svc.id}-${animKey}`} className="pt-7">
                  <Preview />
                </div>
              </div>

              {/* Footer browser */}
              <div className="bg-gray-50 border-t border-gray-100 px-4 py-2 flex items-center justify-between">
                <span className="text-[10px] text-navy/35 data-mono">
                  Délai : {svc.delai ?? 'Sur devis'}
                </span>
                {svc.prix ? (
                  <span className="text-[10px] font-bold text-gold data-mono">
                    À partir de {svc.prix} {svc.unite}
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-navy/40 data-mono">Sur devis</span>
                )}
              </div>
            </div>

            {/* CTA sous le browser */}
            <div className="mt-4 text-center">
              <Link
                href={svc.href}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy hover:bg-electric text-white text-sm font-semibold rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-navy/20"
              >
                Voir l&apos;offre {svc.titre} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile: liste + preview au-dessus */}
        <div className="lg:hidden space-y-4">
          {/* Preview mobile fixe en haut */}
          <div className="browser-frame-light rounded-2xl overflow-hidden sticky top-20 z-10"
            style={{ boxShadow: '0 16px 48px rgba(30,58,95,0.12)' }}>
            <div className="browser-bar-light">
              <div className="flex gap-1.5">
                {['bg-red-400','bg-yellow-400','bg-green-400'].map(c => <div key={c} className={`w-2.5 h-2.5 rounded-full ${c}`} />)}
              </div>
              <div className="browser-url-light mx-2 flex items-center">
                <span className="text-[10px] text-navy/40 truncate">{svc.id}</span>
              </div>
            </div>
            <div className="transition-all duration-500" style={{ background: `linear-gradient(135deg, ${meta.bgFrom}, ${meta.bgTo})`, minHeight: '200px' }}>
              <div className="pt-4 scale-90 origin-top" key={`mob-${svc.id}-${animKey}`}>
                <Preview />
              </div>
            </div>
          </div>

          {/* Liste services mobile */}
          <div className="space-y-2">
            {services.map((s, i) => (
              <button
                key={s.id}
                onClick={() => handleSelect(i)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                  i === active ? 'bg-white border-gray-200 shadow-md' : 'bg-white/60 border-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  {(() => { const Icon = SERVICE_ICONS[s.id]; return Icon ? <Icon size={16} strokeWidth={1.5} className="text-navy/50 flex-shrink-0" aria-hidden="true" /> : null })()}
                  <div>
                    <div className="font-bold text-sm text-navy">{s.titre}</div>
                    <div className="text-xs text-navy/45">{s.prix ? `${s.prix} ${s.unite}` : 'Sur devis'}</div>
                  </div>
                  {i === active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gold" />}
                </div>
              </button>
            ))}
          </div>

          <Link href="/services" className="inline-flex items-center gap-2 text-electric-ink font-medium text-sm">
            Voir tous nos services <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
