'use client'
/**
 * L'ATELIER V4.2 — Navigateur XXL avec vraies mini-réalisations
 * Chaque service = mini-site crédible qui se construit en 6-8 étapes
 */
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { SERVICES } from '@/config/site'
import DecorProfondeur from '@/components/ui/DecorProfondeur'

// ─── Utilitaire d'animation par step ─────────────────────────────────────────
function useLoopSteps(total: number, interval = 480) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep(s => (s >= total - 1 ? 0 : s + 1)), interval)
    return () => clearInterval(id)
  }, [total, interval])
  return step
}

// ─── PREVIEW 1 : Site Vitrine ─────────────────────────────────────────────────
function PreviewVitrine() {
  const step = useLoopSteps(7, 520)
  const visible = (n: number) => step >= n
  return (
    <div className="flex flex-col h-full font-sans bg-[#FFFDF9] overflow-hidden">
      {/* Nav */}
      <div className={`transition-all duration-500 ${visible(1) ? 'opacity-100' : 'opacity-0 -translate-y-2'}`}>
        <div className="flex items-center justify-between px-4 py-2 bg-[#1E3A5F]">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 bg-gold rounded-md" />
            <div className="h-2 w-14 bg-white/60 rounded-full" />
          </div>
          <div className="hidden sm:flex gap-3">
            {['Accueil','Services','Contact'].map(l => <div key={l} className="h-1.5 w-10 bg-white/30 rounded-full" />)}
          </div>
          <div className="h-6 w-16 bg-gold rounded text-[8px] text-[#1E3A5F] font-bold flex items-center justify-center">Devis →</div>
        </div>
      </div>
      {/* Hero */}
      <div className={`transition-all duration-600 delay-100 ${visible(2) ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative h-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #2D7DD2 100%)' }}>
          <div className="absolute inset-0 flex items-center px-5">
            <div className="space-y-1.5">
              <div className="h-3 w-32 bg-white/85 rounded-full" />
              <div className="h-2 w-44 bg-white/45 rounded-full" />
              <div className="h-2 w-28 bg-white/30 rounded-full" />
              <div className="flex gap-2 mt-2">
                <div className="h-6 w-20 bg-gold rounded-lg text-[8px] text-[#1E3A5F] font-bold flex items-center justify-center">Nous contacter</div>
                <div className="h-6 w-16 bg-white/15 border border-white/30 rounded-lg text-[8px] text-white flex items-center justify-center">En savoir +</div>
              </div>
            </div>
          </div>
          {/* Déco bubbles */}
          <div className="absolute right-4 top-4 w-16 h-16 rounded-full bg-white/8" />
          <div className="absolute right-10 bottom-2 w-8 h-8 rounded-full bg-gold/20" />
        </div>
      </div>
      {/* Services 3 cartes */}
      <div className={`grid grid-cols-3 gap-2 px-3 pt-3 transition-all duration-500 delay-200 ${visible(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
        {[['🖥️','Site web','Dès 490€'],['⚡','Rapide','10 jours'],['🎯','SEO','Inclus']].map(([ico,t,s]) => (
          <div key={t} className="bg-white border border-gray-100 rounded-lg p-2 shadow-sm">
            <div className="text-base mb-1">{ico}</div>
            <div className="h-2 w-12 bg-navy/60 rounded-full mb-1" />
            <div className="text-[8px] text-gold font-bold">{s}</div>
          </div>
        ))}
      </div>
      {/* À propos bande */}
      <div className={`mx-3 mt-2 transition-all duration-500 delay-300 ${visible(4) ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-white border border-gray-100 rounded-lg p-2.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-amber-400 flex-shrink-0" />
          <div className="space-y-1 flex-1">
            <div className="h-2 w-20 bg-navy/60 rounded-full" />
            <div className="h-1.5 w-32 bg-navy/30 rounded-full" />
          </div>
        </div>
      </div>
      {/* Témoignage */}
      <div className={`mx-3 mt-2 transition-all duration-500 delay-400 ${visible(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <div className="bg-amber-50 border border-gold/20 rounded-lg p-2">
          <div className="flex gap-0.5 mb-1">{[1,2,3,4,5].map(i => <span key={i} className="text-gold text-[8px]">★</span>)}</div>
          <div className="h-1.5 w-full bg-navy/20 rounded-full mb-1" />
          <div className="h-1.5 w-3/4 bg-navy/15 rounded-full" />
        </div>
      </div>
      {/* Footer */}
      <div className={`mt-auto transition-all duration-500 delay-500 ${visible(6) ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-[#1E3A5F] px-4 py-2 flex items-center justify-between">
          <div className="h-1.5 w-16 bg-white/25 rounded-full" />
          <div className="flex gap-2">
            {[1,2,3].map(i => <div key={i} className="w-4 h-4 rounded bg-white/10" />)}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── PREVIEW 2 : Site Multi-pages ────────────────────────────────────────────
function PreviewMultiPages() {
  const step = useLoopSteps(7, 500)
  const v = (n: number) => step >= n
  return (
    <div className="flex h-full bg-white overflow-hidden">
      {/* Sidebar */}
      <div className={`w-32 bg-gray-50 border-r border-gray-100 flex-shrink-0 transition-all duration-500 ${v(1) ? 'opacity-100' : 'opacity-0 -translate-x-3'}`}>
        <div className="p-3">
          <div className="w-8 h-8 bg-electric rounded-lg mb-3" />
          <div className="space-y-1.5">
            {['Accueil','Services','Blog','Galerie','Contact','À propos'].map((l,i) => (
              <div key={l} className={`h-5 rounded px-2 flex items-center gap-1.5 text-[8px] font-medium transition-all duration-300 ${i === 2 ? 'bg-electric text-white' : 'text-navy/50 hover:bg-gray-100'}`}>
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${i === 2 ? 'bg-white' : 'bg-navy/20'}`} />
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Contenu */}
      <div className="flex-1 overflow-hidden p-3 space-y-2">
        {/* Header */}
        <div className={`transition-all duration-500 delay-100 ${v(2) ? 'opacity-100' : 'opacity-0'}`}>
          <div className="h-7 bg-navy rounded-lg flex items-center px-3 gap-2">
            <div className="h-2 w-20 bg-white/60 rounded-full" />
            <div className="ml-auto h-2 w-8 bg-gold rounded-full" />
          </div>
        </div>
        {/* Blog header */}
        <div className={`transition-all duration-500 delay-200 ${v(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <div className="h-16 rounded-lg overflow-hidden" style={{ background: 'linear-gradient(135deg, #2D7DD2, #1E3A5F)' }}>
            <div className="p-3">
              <div className="text-[8px] text-gold font-bold mb-1">BLOG & ACTUALITÉS</div>
              <div className="h-2.5 w-28 bg-white/80 rounded-full" />
            </div>
          </div>
        </div>
        {/* Articles grid */}
        <div className={`grid grid-cols-2 gap-1.5 transition-all duration-500 delay-300 ${v(4) ? 'opacity-100' : 'opacity-0'}`}>
          {[['#F59E0B','Tarifs','Jan 2026'],['#2D7DD2','SEO local','Fév 2026'],['#7C3AED','Next.js','Mar 2026'],['#059669','E-commerce','Avr 2026']].map(([c,t,d]) => (
            <div key={t} className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm">
              <div className="h-8 w-full" style={{ background: `linear-gradient(135deg, ${c}30, ${c}15)` }}>
                <div className="h-full flex items-center justify-center text-[10px] font-bold" style={{ color: c }}>✍️</div>
              </div>
              <div className="p-1.5">
                <div className="h-1.5 w-14 bg-navy/60 rounded-full mb-0.5" />
                <div className="text-[7px] text-navy/30">{d}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Tags */}
        <div className={`flex flex-wrap gap-1 transition-all duration-500 delay-400 ${v(5) ? 'opacity-100' : 'opacity-0'}`}>
          {['SEO','Web','Tarifs','Design','Next.js'].map((t,i) => (
            <span key={t} className="text-[7px] px-2 py-0.5 rounded-full border font-medium" style={{ borderColor: ['#F59E0B','#2D7DD2','#7C3AED','#059669','#1E3A5F'][i]+'40', color: ['#F59E0B','#2D7DD2','#7C3AED','#059669','#1E3A5F'][i] }}>
              {t}
            </span>
          ))}
        </div>
        {/* Pagination */}
        <div className={`flex justify-center gap-1 transition-all duration-500 delay-500 ${v(6) ? 'opacity-100' : 'opacity-0'}`}>
          {[1,2,3,'...'].map((p,i) => (
            <div key={i} className={`w-5 h-5 rounded text-[8px] flex items-center justify-center font-bold ${i === 0 ? 'bg-electric text-white' : 'bg-gray-100 text-navy/40'}`}>{p}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── PREVIEW 3 : E-commerce ───────────────────────────────────────────────────
function PreviewEcommerce() {
  const step = useLoopSteps(8, 460)
  const v = (n: number) => step >= n
  const [cartOpen, setCartOpen] = useState(false)
  useEffect(() => { if (step === 5) setCartOpen(true); if (step < 3) setCartOpen(false) }, [step])
  return (
    <div className="flex flex-col h-full bg-[#FFFDF9] overflow-hidden">
      {/* Nav avec panier */}
      <div className={`transition-all duration-500 ${v(1) ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-between px-3 py-1.5 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center gap-1.5"><div className="w-5 h-5 bg-emerald-500 rounded" /><div className="h-2 w-12 bg-navy/40 rounded-full" /></div>
          <div className="flex gap-2">
            {['Boutique','Nouveautés','Marques'].map(l => <div key={l} className="h-1.5 w-10 bg-navy/25 rounded-full" />)}
          </div>
          <div className="relative">
            <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-sm cursor-pointer" onClick={() => setCartOpen(c => !c)}>🛒</div>
            {cartOpen && <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gold rounded-full text-[7px] text-ink font-bold flex items-center justify-center">2</div>}
          </div>
        </div>
      </div>
      {/* Grille produits */}
      <div className={`grid grid-cols-2 gap-2 p-3 flex-1 transition-all duration-500 delay-100 ${v(2) ? 'opacity-100' : 'opacity-0'}`}>
        {[
          { c: '#F59E0B', n: 'Collier Or', p: '89€', badge: 'Nouveau' },
          { c: '#7C3AED', n: 'Bague Argent', p: '45€', badge: 'Bestseller' },
          { c: '#059669', n: 'Bracelet', p: '32€', badge: null },
          { c: '#2D7DD2', n: 'Boucles', p: '56€', badge: 'Promo' },
        ].map((prod, i) => (
          <div key={prod.n} className={`bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm transition-all duration-300 ${v(i + 2) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="h-16 flex items-center justify-center relative" style={{ background: `linear-gradient(135deg, ${prod.c}15 0%, ${prod.c}25 100%)` }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: `${prod.c}30` }}>✨</div>
              {prod.badge && <div className="absolute top-1 left-1 text-[7px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: prod.c }}>{prod.badge}</div>}
            </div>
            <div className="p-2">
              <div className="h-1.5 w-16 bg-navy/50 rounded-full mb-0.5" />
              <div className="text-[8px] font-black" style={{ color: prod.c }}>{prod.p}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Badge paiement sécurisé */}
      <div className={`mx-3 mb-2 transition-all duration-500 delay-[600ms] ${v(6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <div className="flex items-center justify-center gap-3 bg-emerald-50 border border-emerald-200 rounded-lg py-1.5 px-3">
          <span className="text-xs">🔒</span>
          <div className="text-[8px] text-emerald-700 font-bold">Paiement 100% sécurisé</div>
          <div className="flex gap-1">
            {['💳','🍎','💰'].map(e => <span key={e} className="text-[9px]">{e}</span>)}
          </div>
        </div>
      </div>
      {/* Mini panier slide */}
      {cartOpen && (
        <div className="absolute right-0 top-8 w-40 bg-white rounded-xl border border-gray-200 shadow-xl p-3 z-10 animate-[slideIn_0.3s_ease]">
          <div className="text-[9px] font-bold text-navy mb-2">Panier (2)</div>
          {[['Collier Or','89€'],['Bague','45€']].map(([n,p]) => (
            <div key={n} className="flex justify-between items-center py-1 border-b border-gray-50">
              <div className="text-[8px] text-navy/60">{n}</div>
              <div className="text-[8px] font-bold text-gold">{p}</div>
            </div>
          ))}
          <div className="mt-2 h-5 bg-emerald-500 rounded text-[7px] text-white font-bold flex items-center justify-center">Commander →</div>
        </div>
      )}
    </div>
  )
}

// ─── PREVIEW 4 : Système de Gestion ──────────────────────────────────────────
function PreviewGestion() {
  const step = useLoopSteps(7, 500)
  const v = (n: number) => step >= n
  const bars = [35, 55, 42, 68, 80, 62, 90, 74]
  return (
    <div className="flex h-full bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className={`w-28 bg-[#1E3A5F] flex-shrink-0 transition-all duration-500 ${v(1) ? 'opacity-100' : 'opacity-0 -translate-x-3'}`}>
        <div className="p-3">
          <div className="flex items-center gap-1.5 mb-4">
            <div className="w-6 h-6 bg-gold rounded" />
            <div className="h-2 w-10 bg-white/40 rounded-full" />
          </div>
          {['Dashboard','Clients','Devis','Factures','Stock','Rapports'].map((l, i) => (
            <div key={l} className={`h-5 rounded px-2 mb-0.5 flex items-center gap-1 text-[7px] ${i === 0 ? 'bg-gold/20 text-gold' : 'text-white/40'}`}>
              <div className={`w-1 h-1 rounded-full ${i === 0 ? 'bg-gold' : 'bg-white/20'}`} />
              {l}
            </div>
          ))}
        </div>
      </div>
      {/* Dashboard */}
      <div className="flex-1 p-3 space-y-2 overflow-hidden">
        {/* KPIs */}
        <div className={`grid grid-cols-3 gap-1.5 transition-all duration-500 delay-100 ${v(2) ? 'opacity-100' : 'opacity-0'}`}>
          {[['CA','+18%','#F59E0B'],['Clients','84','#2D7DD2'],['Devis','12','#059669']].map(([k,val,c]) => (
            <div key={k} className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm">
              <div className="text-[7px] text-navy/40 mb-0.5">{k}</div>
              <div className="text-sm font-black" style={{ color: c }}>{val}</div>
            </div>
          ))}
        </div>
        {/* Graphique barres */}
        <div className={`bg-white rounded-lg p-2 border border-gray-100 transition-all duration-500 delay-200 ${v(3) ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-[7px] text-navy/40 mb-1.5">Chiffre d&apos;affaires — 8 mois</div>
          <div className="flex items-end gap-0.5 h-12">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 relative overflow-hidden rounded-sm" style={{ height: `${h}%`, background: `linear-gradient(180deg, #2D7DD2, #1E3A5F)`, transition: `height 0.6s ease ${i * 60}ms`, opacity: v(3) ? 1 : 0 }}>
                {i === 7 && <div className="absolute inset-x-0 top-0 h-1 bg-gold rounded-sm" />}
              </div>
            ))}
          </div>
        </div>
        {/* Tableau clients */}
        <div className={`bg-white rounded-lg border border-gray-100 overflow-hidden transition-all duration-500 delay-300 ${v(4) ? 'opacity-100' : 'opacity-0'}`}>
          <div className="grid grid-cols-3 gap-0 border-b border-gray-100 px-2 py-1">
            {['Client','Devis','Statut'].map(h => <div key={h} className="text-[7px] font-bold text-navy/40">{h}</div>)}
          </div>
          {[['Boulangerie Dupont','1 200€','✓'],['Restaurant Belle','850€','⏳'],['Atelier Martin','2 100€','✓']].map(([n,p,s]) => (
            <div key={n} className="grid grid-cols-3 gap-0 px-2 py-1 border-b border-gray-50 last:border-0">
              <div className="text-[7px] text-navy/60 truncate">{n}</div>
              <div className="text-[7px] font-bold text-navy">{p}</div>
              <div className="text-[8px]">{s}</div>
            </div>
          ))}
        </div>
        {/* Graphique courbe (SVG) */}
        <div className={`bg-white rounded-lg p-2 border border-gray-100 transition-all duration-500 delay-400 ${v(5) ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-[7px] text-navy/40 mb-1">Nouveaux clients</div>
          <svg viewBox="0 0 120 30" className="w-full" style={{ height: 30 }}>
            <polyline points="0,28 15,22 30,18 45,20 60,12 75,8 90,10 105,4 120,6" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round" />
            <polyline points="0,28 15,22 30,18 45,20 60,12 75,8 90,10 105,4 120,6 120,30 0,30" fill="rgba(245,158,11,0.1)" />
          </svg>
        </div>
      </div>
    </div>
  )
}

// ─── PREVIEW 5 : Site Association ────────────────────────────────────────────
function PreviewAssociation() {
  const step = useLoopSteps(7, 520)
  const v = (n: number) => step >= n
  return (
    <div className="flex flex-col h-full bg-[#FFFDF9] overflow-hidden">
      {/* Header */}
      <div className={`transition-all duration-500 ${v(1) ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-between px-3 py-2" style={{ background: 'linear-gradient(135deg, #D97706, #F59E0B)' }}>
          <div className="flex items-center gap-1.5">
            <span className="text-white text-sm">🤝</span>
            <div className="h-2 w-16 bg-white/70 rounded-full" />
          </div>
          <div className="h-5 w-18 bg-white/20 border border-white/40 rounded text-[7px] text-white font-bold px-2 flex items-center">Adhérer →</div>
        </div>
      </div>
      {/* Hero */}
      <div className={`transition-all duration-500 delay-100 ${v(2) ? 'opacity-100' : 'opacity-0'}`}>
        <div className="h-16 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FEF9EF, #FFFDF9)' }}>
          <div className="p-3">
            <div className="text-[7px] font-bold text-amber-600 mb-1">ASSOCIATION LOI 1901</div>
            <div className="h-2.5 w-32 bg-navy/60 rounded-full mb-1" />
            <div className="h-1.5 w-40 bg-navy/25 rounded-full" />
          </div>
        </div>
      </div>
      {/* Agenda événements */}
      <div className={`px-3 pt-2 transition-all duration-500 delay-200 ${v(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <div className="text-[8px] font-bold text-navy/50 mb-1.5">📅 Prochains événements</div>
        <div className="space-y-1.5">
          {[['15 Jan','Réunion mensuelle','amber'],['22 Jan','Atelier créatif','blue'],['5 Fév','Portes ouvertes','green']].map(([d,t,c]) => (
            <div key={t} className="flex items-center gap-2 bg-white rounded-lg px-2 py-1.5 border border-gray-100">
              <div className="w-8 h-8 rounded-lg flex flex-col items-center justify-center flex-shrink-0" style={{ background: c === 'amber' ? '#FEF3C7' : c === 'blue' ? '#DBEAFE' : '#DCFCE7' }}>
                <div className="text-[7px] font-bold" style={{ color: c === 'amber' ? '#D97706' : c === 'blue' ? '#2D7DD2' : '#059669' }}>{d.split(' ')[0]}</div>
                <div className="text-[6px]" style={{ color: c === 'amber' ? '#D97706' : c === 'blue' ? '#2D7DD2' : '#059669' }}>{d.split(' ')[1]}</div>
              </div>
              <div className="h-1.5 w-24 bg-navy/40 rounded-full" />
            </div>
          ))}
        </div>
      </div>
      {/* Membres counter */}
      <div className={`grid grid-cols-3 gap-2 px-3 pt-2 transition-all duration-500 delay-300 ${v(4) ? 'opacity-100' : 'opacity-0'}`}>
        {[['142','Membres'],['28','Bénévoles'],['12','Ans']].map(([n,l]) => (
          <div key={l} className="bg-amber-50 border border-amber-100 rounded-lg p-2 text-center">
            <div className="text-sm font-black text-amber-600">{n}</div>
            <div className="text-[7px] text-amber-700/60">{l}</div>
          </div>
        ))}
      </div>
      {/* Bouton adhésion */}
      <div className={`mx-3 mt-2 transition-all duration-500 delay-400 ${v(5) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="h-8 rounded-xl flex items-center justify-center text-[9px] text-white font-bold gap-1.5" style={{ background: 'linear-gradient(135deg, #D97706, #F59E0B)' }}>
          ❤️ Rejoindre l&apos;association
        </div>
      </div>
      {/* Don */}
      <div className={`mx-3 mt-1.5 mb-1 transition-all duration-500 delay-500 ${v(6) ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-white border border-gray-100 rounded-lg px-3 py-1.5 flex items-center justify-between">
          <div className="text-[8px] text-navy/50">Faire un don</div>
          <div className="flex gap-1">
            {['10€','20€','50€'].map(a => <div key={a} className="text-[7px] px-1.5 py-0.5 bg-amber-50 border border-amber-200 rounded font-bold text-amber-700">{a}</div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── PREVIEW 6 : Blog SEO ────────────────────────────────────────────────────
function PreviewBlog() {
  const step = useLoopSteps(7, 480)
  const v = (n: number) => step >= n
  const [seoScore, setSeoScore] = useState(0)
  useEffect(() => {
    if (!v(5)) return
    let i = 0
    const id = setInterval(() => { i += 3; setSeoScore(Math.min(i, 92)); if (i >= 92) clearInterval(id) }, 30)
    return () => clearInterval(id)
  }, [step]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* Header blog */}
      <div className={`transition-all duration-500 ${v(1) ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-between px-3 py-2 bg-[#1E3A5F]">
          <div className="flex items-center gap-1.5">
            <span className="text-base">✍️</span>
            <div className="h-2 w-16 bg-white/50 rounded-full" />
          </div>
          <div className="text-[7px] bg-gold/20 text-gold border border-gold/30 rounded px-1.5 py-0.5 font-bold">SEO ✓</div>
        </div>
      </div>
      {/* Article en cours de rédaction */}
      <div className="flex-1 p-3 space-y-2 overflow-hidden">
        <div className={`transition-all duration-500 delay-100 ${v(2) ? 'opacity-100' : 'opacity-0'}`}>
          <div className="h-2 w-48 bg-navy/70 rounded-full mb-1" />
          <div className="text-[7px] text-navy/30 mb-2">Rédigé le 15 janvier 2026 · 5 min de lecture</div>
        </div>
        {/* Image d'article */}
        <div className={`transition-all duration-500 delay-150 ${v(3) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="h-16 rounded-xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #2D7DD2 60%, #F59E0B 100%)' }}>
            <div className="h-full flex items-center justify-center">
              <div className="text-white/30 text-2xl">✍️</div>
            </div>
          </div>
        </div>
        {/* Lignes de texte qui s'écrivent */}
        <div className="space-y-1">
          {[1,2,3,4,5].map(i => (
            <div key={i} className={`h-1.5 bg-navy/15 rounded-full transition-all duration-500 ${v(i+2) ? 'opacity-100' : 'opacity-0'}`}
              style={{ width: i === 5 ? '55%' : `${70 + Math.random() * 25}%`, transitionDelay: `${i * 80}ms` }} />
          ))}
        </div>
        {/* Tags */}
        <div className={`flex flex-wrap gap-1 transition-all duration-500 delay-500 ${v(5) ? 'opacity-100' : 'opacity-0'}`}>
          {['#SEO','#WebDesign','#Astuce'].map((t,i) => (
            <span key={t} className="text-[7px] px-2 py-0.5 rounded-full font-bold" style={{ background: ['#FEF3C7','#DBEAFE','#F3E8FF'][i], color: ['#D97706','#2D7DD2','#7C3AED'][i] }}>{t}</span>
          ))}
        </div>
        {/* Score SEO */}
        <div className={`transition-all duration-500 delay-[600ms] ${v(6) ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-2">
            <div className="flex items-center justify-between mb-1">
              <div className="text-[7px] text-navy/40 font-bold">Score SEO</div>
              <div className="text-[9px] font-black" style={{ color: seoScore > 80 ? '#059669' : '#F59E0B' }}>{seoScore}/100</div>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-100" style={{ width: `${seoScore}%`, background: seoScore > 80 ? '#059669' : '#F59E0B' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── PREVIEW 7 : Marketing Digital ───────────────────────────────────────────
function PreviewMarketing() {
  const step = useLoopSteps(7, 500)
  const v = (n: number) => step >= n
  const keywords: [string, number][] = [['création site web',1],['agence web tours',2],['site vitrine prix',3],['devis site internet',4]]
  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className={`transition-all duration-500 ${v(1) ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-white border-b border-gray-100 px-3 py-1.5 flex items-center gap-2">
          <span className="text-sm">📈</span>
          <div className="h-2 w-20 bg-navy/40 rounded-full" />
          <div className="ml-auto text-[7px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded-full">● LIVE</div>
        </div>
      </div>
      <div className="flex-1 p-3 space-y-2 overflow-hidden">
        {/* Courbe qui monte */}
        <div className={`bg-white rounded-xl border border-gray-100 p-2.5 transition-all duration-500 delay-100 ${v(2) ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-[7px] text-navy/40 mb-1.5">Visiteurs organiques / mois</div>
          <svg viewBox="0 0 120 40" className="w-full" style={{ height: 40 }}>
            <defs>
              <linearGradient id="mktGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2D7DD2" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#2D7DD2" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polyline points="0,38 15,34 30,28 45,32 60,22 75,14 90,8 105,6 120,2" fill="none" stroke="#2D7DD2" strokeWidth="1.5" strokeLinejoin="round" />
            <polygon points="0,38 15,34 30,28 45,32 60,22 75,14 90,8 105,6 120,2 120,40 0,40" fill="url(#mktGrad)" />
            {/* Point actuel */}
            <circle cx="120" cy="2" r="2.5" fill="#F59E0B" />
          </svg>
          <div className="flex justify-between mt-1">
            <div className="text-[7px] text-navy/30">Jan</div>
            <div className="text-[8px] font-black text-blue-600">+340% ↑</div>
          </div>
        </div>
        {/* Mots-clés qui se classent */}
        <div className={`bg-white rounded-xl border border-gray-100 p-2.5 transition-all duration-500 delay-200 ${v(3) ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-[7px] font-bold text-navy/40 mb-1.5">🎯 Positions Google</div>
          <div className="space-y-1">
            {keywords.map(([kw, pos], i) => (
              <div key={kw} className={`flex items-center gap-2 transition-all duration-400 ${v(i + 3) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'}`}
                style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="w-5 h-5 rounded font-black text-[8px] flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: pos === 1 ? '#F59E0B' : pos <= 3 ? '#059669' : '#2D7DD2' }}>
                  #{pos}
                </div>
                <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${100 - pos * 20}%`, background: pos === 1 ? '#F59E0B' : '#2D7DD2', transition: 'width 0.8s ease' }} />
                </div>
                <div className="text-[7px] text-navy/40 w-28 truncate">{kw as string}</div>
              </div>
            ))}
          </div>
        </div>
        {/* KPI bubbles */}
        <div className={`grid grid-cols-3 gap-1.5 transition-all duration-500 delay-500 ${v(6) ? 'opacity-100' : 'opacity-0'}`}>
          {[['🎯','CTR','8.4%'],['⏱️','Bounce','32%'],['💰','ROI','×4.2']].map(([e,k,v]) => (
            <div key={k} className="bg-white border border-gray-100 rounded-lg p-1.5 text-center">
              <div className="text-sm">{e}</div>
              <div className="text-[7px] text-navy/40">{k}</div>
              <div className="text-[9px] font-black text-electric">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Map service id → preview + accent ────────────────────────────────────────
const PREVIEW_MAP: Record<string, { Component: React.FC; accent: string; bg: string }> = {
  'site-vitrine':      { Component: PreviewVitrine,     accent: '#2D7DD2', bg: 'from-blue-50 to-[#FFFDF9]' },
  'site-multi-pages':  { Component: PreviewMultiPages,  accent: '#7C3AED', bg: 'from-purple-50 to-white' },
  'site-ecommerce':    { Component: PreviewEcommerce,   accent: '#059669', bg: 'from-emerald-50 to-[#FFFDF9]' },
  'systeme-gestion':   { Component: PreviewGestion,     accent: '#1E3A5F', bg: 'from-slate-50 to-white' },
  'site-association':  { Component: PreviewAssociation, accent: '#D97706', bg: 'from-amber-50 to-[#FFFDF9]' },
  'redaction-blog-seo':{ Component: PreviewBlog,        accent: '#2D7DD2', bg: 'from-blue-50 to-white' },
  'marketing-digital': { Component: PreviewMarketing,   accent: '#F59E0B', bg: 'from-yellow-50 to-[#FFFDF9]' },
}

const SERVICE_ICONS: Record<string, string> = {
  'site-vitrine': '🖥️', 'site-multi-pages': '📄', 'site-ecommerce': '🛍️',
  'systeme-gestion': '⚙️', 'site-association': '🤝', 'redaction-blog-seo': '✍️', 'marketing-digital': '📈',
}

// ─── Composant principal ──────────────────────────────────────────────────────
export default function Atelier() {
  const [active, setActive] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const services = [...SERVICES]

  function handleSelect(i: number) {
    if (i === active) return
    setActive(i)
    setAnimKey(k => k + 1)
  }

  const svc = services[active]
  const preview = PREVIEW_MAP[svc?.id] ?? PREVIEW_MAP['site-vitrine']
  const { Component: PreviewComponent, accent, bg } = preview

  return (
    <section id="services" className="py-20 bg-[#FFFDF9] relative overflow-hidden">
      <DecorProfondeur variant="warm" seed={0} />
      <span className="section-number select-none" aria-hidden="true">01</span>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div className="mb-10">
          <div className="section-marker mb-2" aria-hidden="true">[ 01 / L&apos;ATELIER ]</div>
          <div className="text-xs font-bold text-gold uppercase tracking-[0.2em] mb-3">L&apos;Atelier</div>
          <h2 className="text-3xl lg:text-5xl font-bold text-navy mb-4" style={{ lineHeight: 1.15 }}>
            Nos services web
          </h2>
          <p className="text-navy/55 max-w-lg">
            Cliquez sur un service — regardez-le se construire sous vos yeux.
          </p>
        </div>

        {/* Desktop : split sticky */}
        <div className="hidden lg:grid lg:grid-cols-[340px_1fr] gap-8 items-start">
          {/* Colonne gauche — liste */}
          <div className="space-y-1.5">
            {services.map((s, i) => (
              <button
                key={s.id}
                onClick={() => handleSelect(i)}
                className={`group w-full text-left px-4 py-3.5 rounded-2xl border transition-all duration-200 ${
                  i === active
                    ? 'bg-white border-gray-200 shadow-[0_4px_24px_rgba(30,58,95,0.12)]'
                    : 'bg-transparent border-transparent hover:bg-white/70 hover:border-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all ${
                    i === active ? 'shadow-md' : ''
                  }`} style={{ background: i === active ? `${PREVIEW_MAP[s.id]?.accent}15` : '#F3F4F6' }}>
                    {SERVICE_ICONS[s.id]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-bold text-sm transition-colors ${i === active ? 'text-navy' : 'text-navy/60'}`}>{s.titre}</div>
                    <div className="text-xs text-navy/55 truncate">{s.prix ? `${s.prix} ${s.unite}` : 'Sur devis'}</div>
                  </div>
                  {i === active && (
                    <div className="w-1.5 h-8 rounded-full flex-shrink-0" style={{ background: accent }} />
                  )}
                </div>
              </button>
            ))}
            <Link href="/services" className="inline-flex items-center gap-2 text-electric-ink font-medium text-sm mt-3 px-2">
              Voir tous nos services <ArrowRight size={14} />
            </Link>
          </div>

          {/* Colonne droite — navigateur XXL sticky */}
          <div className="sticky top-24">
            {/* Cadre navigateur */}
            <div className="rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(30,58,95,0.18)] border border-gray-200 bg-white">
              {/* Barre navigateur */}
              <div className="bg-gray-100 px-4 py-3 flex items-center gap-3 border-b border-gray-200">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                {/* URL bar */}
                <div className="flex-1 bg-white rounded-lg px-3 py-1.5 flex items-center gap-2 border border-gray-200">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: accent }} />
                  <span className="text-xs text-gray-500 font-mono truncate">
                    {svc?.href || '/services/site-vitrine'}.stackup-agency.fr
                  </span>
                  <div className="ml-auto flex items-center gap-1">
                    <div className="text-[10px] text-green-600 font-bold">● LIVE</div>
                  </div>
                </div>
                <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
              </div>

              {/* Zone de preview — hauteur généreuse */}
              <div key={animKey} className={`bg-gradient-to-br ${bg}`} style={{ height: 420 }}>
                <PreviewComponent />
              </div>

              {/* Pied navigateur */}
              <div className="bg-gray-50 border-t border-gray-100 px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">{SERVICE_ICONS[svc?.id]}</span>
                  <span className="font-bold text-sm text-navy">{svc?.titre}</span>
                  {svc?.prix && <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: accent }}>
                    dès {svc.prix}{svc.unite}
                  </span>}
                </div>
                <Link href={svc?.href || '/services'} className="text-xs font-bold flex items-center gap-1 px-3 py-1.5 rounded-lg text-white transition-all hover:-translate-y-0.5" style={{ background: accent }}>
                  Voir l&apos;offre <ArrowRight size={11} />
                </Link>
              </div>
            </div>

            {/* Indicateur de progression */}
            <div className="flex justify-center gap-1.5 mt-4">
              {services.map((_, i) => (
                <button key={i} onClick={() => handleSelect(i)}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{ background: i === active ? accent : '#D1D5DB', transform: i === active ? 'scale(1.4)' : 'scale(1)' }} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile : preview + liste */}
        <div className="lg:hidden">
          {/* Preview mobile */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md mb-6">
            <div className="bg-gray-100 px-3 py-2 flex items-center gap-2 border-b border-gray-200">
              <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-400" /><div className="w-2 h-2 rounded-full bg-yellow-400" /><div className="w-2 h-2 rounded-full bg-green-400" /></div>
              <div className="flex-1 bg-white rounded px-2 py-1 text-[10px] text-gray-400 font-mono">{svc?.id}.fr</div>
            </div>
            <div key={`m-${animKey}`} className={`bg-gradient-to-br ${bg}`} style={{ height: 260 }}>
              <PreviewComponent />
            </div>
          </div>

          {/* Liste services mobile */}
          <div className="space-y-2">
            {services.map((s, i) => (
              <button key={s.id} onClick={() => handleSelect(i)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                  i === active ? 'bg-white border-gray-200 shadow-md' : 'bg-white/60 border-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{SERVICE_ICONS[s.id]}</span>
                  <div>
                    <div className="font-bold text-sm text-navy">{s.titre}</div>
                    <div className="text-xs text-navy/45">{s.prix ? `${s.prix} ${s.unite}` : 'Sur devis'}</div>
                  </div>
                  {i === active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gold" />}
                </div>
              </button>
            ))}
          </div>

          <Link href="/services" className="inline-flex items-center gap-2 text-electric-ink font-medium text-sm mt-4">
            Voir tous nos services <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
