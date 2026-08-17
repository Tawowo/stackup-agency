'use client'
/**
 * LE SHOWROOM — Concept V4
 * Desktop + téléphone simultanés, fond qui change par projet
 */
import { useState } from 'react'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

interface Project {
  id: string
  name: string
  type: string
  url: string
  bg: string          // gradient CSS
  accent: string
  desktopBg: string   // couleur de fond desktop preview
  phoneBg: string
  desc: string
  tags: string[]
  desktopContent: React.ReactNode
  phoneContent: React.ReactNode
}

function DesktopScreen({ bg, accent, name, tags }: { bg: string; accent: string; name: string; tags: string[] }) {
  return (
    <div className="rounded-t-xl overflow-hidden border border-gray-200 shadow-2xl" style={{ aspectRatio: '16/10' }}>
      {/* Browser chrome */}
      <div className="bg-gray-100 px-3 py-2 flex items-center gap-2 border-b border-gray-200">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded-md px-2 py-0.5 text-[10px] text-gray-400 font-mono">
          {name.toLowerCase().replace(/\s+/g, '-')}.fr
        </div>
        <ExternalLink size={10} className="text-gray-400" />
      </div>
      {/* Content */}
      <div className="relative overflow-hidden flex-1" style={{ background: bg, height: 'calc(100% - 36px)' }}>
        {/* Nav */}
        <div className="absolute top-0 inset-x-0 bg-black/20 backdrop-blur-sm px-4 py-2 flex items-center justify-between">
          <div className="text-white font-bold text-xs">{name}</div>
          <div className="flex gap-3">
            {['Accueil','Services','Contact'].map(l => (
              <div key={l} className="text-white/70 text-[9px]">{l}</div>
            ))}
          </div>
        </div>
        {/* Hero text */}
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 px-6 pt-8">
          <div className="text-white/90 text-xs font-bold uppercase tracking-widest">{tags[0]}</div>
          <div className="text-white text-base font-black text-center leading-tight max-w-xs">{name}</div>
          <div className="text-white/70 text-[10px] text-center">Solution web professionnelle</div>
          <div className="mt-2 px-4 py-1.5 rounded-lg text-[10px] font-bold" style={{ background: accent, color: '#fff' }}>
            Découvrir →
          </div>
        </div>
        {/* Tags */}
        <div className="absolute bottom-2 left-2 flex gap-1">
          {tags.map(t => (
            <span key={t} className="text-[8px] bg-white/20 backdrop-blur-sm rounded px-1.5 py-0.5 text-white/80">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function PhoneScreen({ bg, accent, name }: { bg: string; accent: string; name: string }) {
  return (
    <div className="rounded-[28px] overflow-hidden border-[3px] border-gray-800 shadow-2xl bg-gray-800 relative" style={{ width: 140, aspectRatio: '9/19' }}>
      {/* Notch */}
      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-3.5 rounded-full bg-gray-900 z-10" />
      {/* Screen */}
      <div className="w-full h-full overflow-hidden" style={{ background: bg }}>
        {/* Status bar */}
        <div className="flex items-center justify-between px-3 pt-4 pb-1">
          <div className="text-white/70 text-[7px]">9:41</div>
          <div className="flex gap-1">
            <div className="w-3 h-1.5 bg-white/70 rounded-sm" />
            <div className="w-2 h-1.5 bg-white/70 rounded-sm" />
          </div>
        </div>
        {/* Content */}
        <div className="px-3 pt-2">
          <div className="text-white/90 text-[8px] font-bold uppercase tracking-wider mb-1">{name}</div>
          <div className="text-white text-[11px] font-black leading-tight mb-2">Votre site{'\n'}pro.</div>
          <div className="text-[8px] font-bold text-white rounded-lg px-3 py-1.5 inline-block mb-3" style={{ background: accent }}>
            Voir →
          </div>
          {/* Cards */}
          {[0,1].map(i => (
            <div key={i} className="bg-white/15 backdrop-blur-sm rounded-xl p-2 mb-1.5">
              <div className="w-8 h-1.5 bg-white/40 rounded mb-1" />
              <div className="w-12 h-1 bg-white/25 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const PROJECTS: Omit<Project, 'desktopContent' | 'phoneContent'>[] = [
  {
    id: 'vitrine',
    name: 'Restaurant La Belle',
    type: 'Site Vitrine',
    url: '/services/site-vitrine',
    bg: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #EC4899 100%)',
    accent: '#F59E0B',
    desktopBg: '#7C3AED',
    phoneBg: 'linear-gradient(180deg, #7C3AED, #A855F7)',
    desc: 'Site vitrine restaurant livré en 10 jours.',
    tags: ['Restaurant', 'Vitrine', 'SEO'],
  },
  {
    id: 'ecommerce',
    name: 'Boutique Artisane',
    type: 'E-commerce',
    url: '/services/site-ecommerce',
    bg: 'linear-gradient(135deg, #059669 0%, #10B981 50%, #34D399 100%)',
    accent: '#10B981',
    desktopBg: '#059669',
    phoneBg: 'linear-gradient(180deg, #059669, #10B981)',
    desc: 'Boutique en ligne avec paiement intégré.',
    tags: ['E-shop', 'Paiement', 'Stock'],
  },
  {
    id: 'gestion',
    name: 'Pro Gestion',
    type: 'Système sur mesure',
    url: '/services/systeme-gestion',
    bg: 'linear-gradient(135deg, #1E3A5F 0%, #2D7DD2 100%)',
    accent: '#F59E0B',
    desktopBg: '#1E3A5F',
    phoneBg: 'linear-gradient(180deg, #1E3A5F, #2D7DD2)',
    desc: 'Tableau de bord CRM & suivi client.',
    tags: ['CRM', 'Devis', 'Dashboard'],
  },
  {
    id: 'assoc',
    name: 'Asso & Culture',
    type: 'Site Association',
    url: '/services/site-association',
    bg: 'linear-gradient(135deg, #D97706 0%, #F59E0B 50%, #FCD34D 100%)',
    accent: '#D97706',
    desktopBg: '#D97706',
    phoneBg: 'linear-gradient(180deg, #D97706, #F59E0B)',
    desc: 'Présence en ligne pour associations.',
    tags: ['Association', 'Agenda', 'Don'],
  },
]

export default function Showroom() {
  const [active, setActive] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const p = PROJECTS[active]

  function handleSelect(i: number) {
    if (i === active) return
    setTransitioning(true)
    setTimeout(() => {
      setActive(i)
      setTransitioning(false)
    }, 300)
  }

  return (
    <section className="py-24 relative overflow-hidden transition-all duration-700" style={{
      background: `linear-gradient(180deg, #FFFDF9 0%, ${p.desktopBg}18 40%, #FFFDF9 100%)`
    }}>
      <span className="section-number select-none" aria-hidden="true">03</span>
      {/* Background halo matching project */}
      <div className="pointer-events-none absolute inset-0 transition-all duration-700" aria-hidden="true"
        style={{ background: `radial-gradient(ellipse at 50% 30%, ${p.desktopBg}22 0%, transparent 65%)` }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="section-marker mb-2 reveal-item" aria-hidden="true">[ 03 / SHOWROOM ]</div>
        <div className="text-xs font-bold text-gold uppercase tracking-[0.2em] mb-3 reveal-item">Le Showroom</div>
        <h2 className="text-3xl lg:text-5xl font-bold text-navy mb-4 reveal-item" style={{ lineHeight: 1.15 }}>
          Nos réalisations
        </h2>
        <p className="text-navy/55 max-w-xl mb-12 reveal-item" style={{ animationDelay: '80ms' }}>
          Desktop et mobile, en simultané — comme vos vrais visiteurs.
        </p>

        {/* Project selector */}
        <div className="flex flex-wrap gap-2 mb-10">
          {PROJECTS.map((proj, i) => (
            <button
              key={proj.id}
              onClick={() => handleSelect(i)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                i === active
                  ? 'text-white border-transparent shadow-md'
                  : 'bg-white text-navy/60 border-gray-200 hover:border-navy/20'
              }`}
              style={i === active ? { background: p.desktopBg } : {}}
            >
              {proj.type}
            </button>
          ))}
        </div>

        {/* Dual screen display */}
        <div className={`transition-all duration-300 ${transitioning ? 'opacity-0 scale-[0.99]' : 'opacity-100 scale-100'}`}>
          <div className="flex items-end gap-6 lg:gap-10">
            {/* Desktop */}
            <div className="flex-1 min-w-0">
              <DesktopScreen
                bg={p.bg}
                accent={p.accent}
                name={p.name}
                tags={p.tags}
              />
              {/* Stand */}
              <div className="h-3 bg-gray-200 rounded-b-xl mx-4" />
              <div className="h-1.5 bg-gray-300 rounded-full mx-8" />
            </div>

            {/* Phone */}
            <div className="flex-shrink-0 pb-3">
              <PhoneScreen bg={p.phoneBg} accent={p.accent} name={p.name} />
            </div>
          </div>

          {/* Project info */}
          <div className="mt-8 flex items-start justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-bold text-navy text-lg">{p.name}</h3>
              <p className="text-navy/55 text-sm">{p.desc}</p>
            </div>
            <Link
              href={p.url}
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl text-white transition-all hover:-translate-y-0.5 shadow-md"
              style={{ background: p.desktopBg }}
            >
              En savoir plus <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
