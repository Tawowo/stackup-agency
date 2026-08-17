'use client'
/**
 * LE SHOWROOM V4.2 — Vraies démos Stackup, desktop + téléphone simultanés
 * Fond qui change par projet — captures réelles via Image Next.js
 */
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

interface Project {
  nom: string
  type: string
  slug: string
  image: string
  couleur: string
  accent: string
  url: string
  tags: string[]
}

const PROJECTS: Project[] = [
  {
    nom: 'Château des Lumières',
    type: 'Site vitrine — Hôtel boutique',
    slug: 'chateau-lumieres',
    image: '/images/realisations/chateau-lumieres.webp',
    couleur: '#213547',
    accent: '#5F8D6A',
    url: 'https://stackup-demos-e85v.vercel.app',
    tags: ['Hôtel', 'Réservation', 'Animations'],
  },
  {
    nom: 'Maison Élise',
    type: 'E-commerce — Mode',
    slug: 'maison-elise',
    image: '/images/realisations/maison-elise.webp',
    couleur: '#2E2B28',
    accent: '#D46A92',
    url: 'https://stackup-demos-tq9a.vercel.app',
    tags: ['Boutique', 'Panier', 'Mode'],
  },
  {
    nom: 'Au Pain Doré',
    type: 'Site vitrine — Boulangerie',
    slug: 'au-pain-dore',
    image: '/images/realisations/au-pain-dore.webp',
    couleur: '#5A3E2B',
    accent: '#D89C4A',
    url: 'https://stackup-demos-u2go.vercel.app',
    tags: ['Artisan', 'Vitrine', 'Local'],
  },
  {
    nom: "L'Olivier — Dashboard",
    type: 'Système de gestion',
    slug: 'lolivier-dashboard',
    image: '/images/realisations/lolivier-dashboard.webp',
    couleur: '#101828',
    accent: '#29C36A',
    url: 'https://stackup-demos-jxtr.vercel.app',
    tags: ['Dashboard', 'CRM', 'Restaurant'],
  },
]

function DesktopFrame({ project, transitioning }: { project: Project; transitioning: boolean }) {
  return (
    <div className="flex-1 min-w-0">
      {/* Cadre navigateur */}
      <div className={`rounded-2xl overflow-hidden border border-gray-200 shadow-[0_24px_60px_rgba(0,0,0,0.15)] transition-all duration-300 ${transitioning ? 'opacity-0 scale-[0.99]' : 'opacity-100 scale-100'}`}>
        {/* Chrome nav */}
        <div className="bg-gray-100 px-3 py-2.5 flex items-center gap-2 border-b border-gray-200">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-white rounded-md px-2.5 py-1 text-[10px] text-gray-400 font-mono flex items-center gap-1.5 border border-gray-200">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: project.accent }} />
            {project.url.replace('https://', '')}
          </div>
          <ExternalLink size={11} className="text-gray-400" />
        </div>
        {/* Screenshot desktop */}
        <div className="relative bg-gray-900 overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <Image
            src={project.image}
            alt={`Capture ${project.nom}`}
            fill
            className="object-cover object-top transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
          {/* Overlay léger pour profondeur */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      </div>
      {/* Support moniteur */}
      <div className="h-3 bg-gray-200 rounded-b-xl mx-6" />
      <div className="h-1.5 bg-gray-300 rounded-full mx-12" />
    </div>
  )
}

function PhoneFrame({ project, transitioning }: { project: Project; transitioning: boolean }) {
  return (
    <div className={`flex-shrink-0 pb-3 transition-all duration-300 ${transitioning ? 'opacity-0 scale-[0.97]' : 'opacity-100 scale-100'}`}
      style={{ transitionDelay: transitioning ? '0ms' : '60ms' }}>
      <div className="rounded-[28px] overflow-hidden border-[3px] border-gray-700 shadow-[0_20px_60px_rgba(0,0,0,0.25)] bg-gray-900 relative" style={{ width: 130, aspectRatio: '9/19.5' }}>
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-3.5 rounded-full bg-gray-900 z-10" />
        {/* Screenshot dans le téléphone */}
        <div className="w-full h-full relative overflow-hidden">
          <Image
            src={project.image}
            alt={`Mobile ${project.nom}`}
            fill
            className="object-cover object-top"
            sizes="130px"
          />
        </div>
        {/* Bottom bar */}
        <div className="absolute bottom-0 inset-x-0 h-5 bg-gray-900 flex items-center justify-center">
          <div className="w-12 h-1 bg-gray-600 rounded-full" />
        </div>
      </div>
    </div>
  )
}

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
    }, 250)
  }

  return (
    <section className="py-24 relative overflow-hidden transition-colors duration-700"
      style={{ background: `linear-gradient(180deg, #FFFDF9 0%, ${p.couleur}18 40%, #FFFDF9 100%)` }}>
      <span className="section-number select-none" aria-hidden="true">03</span>

      {/* Halo arrière-plan qui suit le projet actif */}
      <div className="pointer-events-none absolute inset-0 transition-all duration-700" aria-hidden="true"
        style={{ background: `radial-gradient(ellipse at 50% 40%, ${p.accent}35 0%, transparent 60%)` }} />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"
        style={{ backgroundImage: 'linear-gradient(rgba(30,58,95,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,95,0.04) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="section-marker mb-2 reveal-item" aria-hidden="true">[ 03 / SHOWROOM ]</div>
        <div className="text-xs font-bold text-gold uppercase tracking-[0.2em] mb-3 reveal-item">Le Showroom</div>
        <h2 className="text-3xl lg:text-5xl font-bold text-navy mb-4 reveal-item" style={{ lineHeight: 1.15 }}>
          Nos vraies réalisations
        </h2>
        <p className="text-navy/55 max-w-xl mb-10 reveal-item" style={{ animationDelay: '80ms' }}>
          Sites de démonstration complets — consultables en ligne. Ce que vous voyez est exactement ce que nous livrons.
        </p>

        {/* Sélecteur projets */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {PROJECTS.map((proj, i) => (
            <button key={proj.slug} onClick={() => handleSelect(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                i === active
                  ? 'text-white border-transparent shadow-md shadow-black/15'
                  : 'bg-white text-navy/60 border-gray-200 hover:border-gray-300 hover:text-navy hover:-translate-y-0.5'
              }`}
              style={i === active ? { background: p.accent } : {}}
            >
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: i === active ? 'rgba(255,255,255,0.7)' : proj.accent }} />
              <span className="hidden sm:inline">{proj.nom}</span>
              <span className="sm:hidden text-xs">{proj.type.split('—')[0].trim()}</span>
            </button>
          ))}
        </div>

        {/* Écrans dual */}
        <div className="flex items-end gap-6 lg:gap-8">
          <DesktopFrame project={p} transitioning={transitioning} />
          <PhoneFrame project={p} transitioning={transitioning} />
        </div>

        {/* Info projet */}
        <div className="mt-8 flex items-start justify-between flex-wrap gap-4">
          <div>
            <h3 className="font-bold text-navy text-lg mb-0.5">{p.nom}</h3>
            <p className="text-navy/50 text-sm mb-2">{p.type}</p>
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map(t => (
                <span key={t} className="text-[11px] px-2.5 py-1 rounded-full font-medium border"
                  style={{ borderColor: p.accent + '40', color: p.accent, background: p.accent + '10' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <a href={p.url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl text-white transition-all hover:-translate-y-0.5 shadow-md"
              style={{ background: p.accent }}>
              <ExternalLink size={14} /> Voir en ligne
            </a>
            <Link href={`/realisations/${p.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl border border-gray-200 text-navy hover:border-navy/30 hover:bg-gray-50 transition-all hover:-translate-y-0.5">
              Fiche projet
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
