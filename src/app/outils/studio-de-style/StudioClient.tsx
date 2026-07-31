/* eslint-disable react/no-unescaped-entities */
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

// ─── Données ──────────────────────────────────────────────────────────────────

const STYLES = [
  {
    id: 'moderne',
    label: 'Moderne & épuré',
    desc: 'Typographie fine, beaucoup d\'espace blanc, contraste net. Idéal professions libérales, tech, consulting.',
    palette: { bg: '#FFFFFF', text: '#0D1626', accent: '#2D7DD2', card: '#F0F4F8' },
    preview: { font: 'Inter, sans-serif', radius: '12px', shadow: '0 2px 12px rgba(0,0,0,0.06)' },
  },
  {
    id: 'chaleureux',
    label: 'Chaleureux & artisanal',
    desc: 'Tons terreux, typographie humaniste, textures douces. Idéal restauration, artisanat, bien-être.',
    palette: { bg: '#FDF8F0', text: '#2C1810', accent: '#C67C3C', card: '#F5EDE0' },
    preview: { font: 'Georgia, serif', radius: '8px', shadow: '0 2px 16px rgba(198,124,60,0.12)' },
  },
  {
    id: 'tech',
    label: 'Tech & premium',
    desc: 'Fond sombre, accents électriques, animations subtiles. Idéal SaaS, startups, services B2B.',
    palette: { bg: '#0A0F1C', text: '#E8F0FE', accent: '#4F9CF9', card: '#131B2E' },
    preview: { font: 'Inter, sans-serif', radius: '16px', shadow: '0 4px 24px rgba(79,156,249,0.2)' },
  },
  {
    id: 'local',
    label: 'Local & accessible',
    desc: 'Couleurs vives, navigation claire, CTA visibles. Idéal commerces de proximité, associations, TPE.',
    palette: { bg: '#FFFFFF', text: '#1a1a2e', accent: '#2ecc71', card: '#F0FFF4' },
    preview: { font: 'system-ui, sans-serif', radius: '6px', shadow: '0 1px 8px rgba(0,0,0,0.08)' },
  },
  {
    id: 'luxe',
    label: 'Luxe & élégance',
    desc: 'Noir profond, or, typographie serif. Idéal immobilier premium, bijouterie, hôtellerie haut de gamme.',
    palette: { bg: '#0C0C0C', text: '#F5F0E8', accent: '#C9A84C', card: '#1A1A1A' },
    preview: { font: 'Palatino, Georgia, serif', radius: '4px', shadow: '0 4px 32px rgba(201,168,76,0.15)' },
  },
]

const METIERS_DEMO = [
  { label: 'Restaurant', nom: 'La Belle Table', tagline: 'Cuisine française, terroir et savoir-faire depuis 1987' },
  { label: 'Plombier', nom: 'Martin Plomberie', tagline: 'Dépannage rapide, devis gratuit sous 2h' },
  { label: 'Coach', nom: 'Sophie Martinet', tagline: 'Coaching de vie et développement personnel' },
  { label: 'Boutique', nom: 'Atelier Créa', tagline: 'Créations artisanales faites à la main' },
]

// ─── Aperçu miniature ─────────────────────────────────────────────────────────

function StylePreview({ style, metier }: { style: typeof STYLES[0]; metier: typeof METIERS_DEMO[0] }) {
  const { palette, preview } = style

  return (
    <div
      className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 select-none"
      style={{
        background: palette.bg,
        fontFamily: preview.font,
        boxShadow: preview.shadow,
        minHeight: '220px',
      }}
    >
      {/* Nav simulée */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: `${palette.text}15` }}>
        <span className="font-bold text-sm" style={{ color: palette.text }}>{metier.nom}</span>
        <div className="flex gap-3">
          {['Services', 'À propos', 'Contact'].map(n => (
            <span key={n} className="text-xs" style={{ color: `${palette.text}80` }}>{n}</span>
          ))}
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md" style={{ background: palette.accent, color: palette.bg, borderRadius: preview.radius }}>
            Devis
          </span>
        </div>
      </div>
      {/* Hero simulé */}
      <div className="px-4 py-6">
        <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: palette.accent }}>{metier.label}</div>
        <div className="font-bold text-lg leading-tight mb-2" style={{ color: palette.text }}>{metier.tagline}</div>
        <div className="text-xs mb-4" style={{ color: `${palette.text}60` }}>
          Devis gratuit sous 72h · Livraison garantie
        </div>
        <div className="flex gap-2">
          <span className="text-xs font-semibold px-3 py-1.5" style={{ background: palette.accent, color: palette.bg, borderRadius: preview.radius }}>
            Prendre contact →
          </span>
          <span className="text-xs px-3 py-1.5" style={{ background: palette.card, color: palette.text, borderRadius: preview.radius }}>
            Nos services
          </span>
        </div>
      </div>
      {/* Cards services */}
      <div className="px-4 pb-4 grid grid-cols-3 gap-2">
        {['Service 1', 'Service 2', 'Service 3'].map(s => (
          <div key={s} className="p-2 text-center" style={{ background: palette.card, borderRadius: preview.radius }}>
            <div className="w-4 h-4 rounded-full mx-auto mb-1" style={{ background: palette.accent, opacity: 0.7 }} />
            <div className="text-xs" style={{ color: `${palette.text}80` }}>{s}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Profil généré ────────────────────────────────────────────────────────────

function ProfilStyle({ style, metier }: { style: typeof STYLES[0]; metier: typeof METIERS_DEMO[0] }) {
  const recommendations = {
    moderne: ['Typographie Inter ou DM Sans', 'Espacement généreux (padding 24-32px)', 'Animations d\'entrée subtiles', 'Photos professionnelles haute définition'],
    chaleureux: ['Typographie Lora ou Playfair Display', 'Photos de produits en lumière naturelle', 'Textures papier ou lin en arrière-plan', 'Témoignages clients mis en avant'],
    tech: ['Fond sombre avec accents lumineux', 'Animations de défilement fluides', 'Data visualisation si pertinent', 'Badges de confiance (sécurité, certifications)'],
    local: ['CTA très visibles et répétés', 'Numéro de téléphone en header', 'Horaires et adresse bien visibles', 'Google Maps intégré'],
    luxe: ['Typographie serif élégante', 'Photos plein écran haute résolution', 'Minimalisme — moins c\'est plus', 'Formulaire de contact discret'],
  }

  return (
    <div className="rounded-2xl border border-navy/20 dark:border-white/10 p-6 bg-white dark:bg-[#0D1626]">
      <div className="text-xs font-semibold text-foreground/40 dark:text-white/40 uppercase tracking-wider mb-3">Votre profil de style</div>
      <h3 className="text-xl font-bold text-foreground dark:text-white mb-1">{style.label}</h3>
      <p className="text-sm text-foreground/60 dark:text-white/60 mb-4">{style.desc}</p>

      <div className="flex gap-3 mb-5">
        {Object.entries(style.palette).map(([key, color]) => (
          <div key={key} className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-lg border border-black/10" style={{ background: color }} />
            <span className="text-xs text-foreground/30 dark:text-white/30">{key}</span>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <div className="text-xs font-semibold text-foreground/50 dark:text-white/40 mb-2 uppercase tracking-wide">Recommandations</div>
        <ul className="space-y-1.5">
          {(recommendations[style.id as keyof typeof recommendations] ?? []).map(r => (
            <li key={r} className="flex items-start gap-2 text-sm text-foreground/70 dark:text-white/60">
              <CheckCircle size={14} className="text-success flex-shrink-0 mt-0.5" />
              {r}
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={`/devis?metier=${encodeURIComponent(metier.label)}&style=${style.id}`}
        className="inline-block w-full text-center px-6 py-3 bg-gold hover:bg-gold/90 text-ink font-bold rounded-xl transition-all hover:-translate-y-0.5 text-sm"
      >
        Démarrer mon projet avec ce style →
      </Link>
    </div>
  )
}

// ─── Composant principal ──────────────────────────────────────────────────────

export default function StudioClient() {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [selectedMetier, setSelectedMetier] = useState(0)

  const style = STYLES.find(s => s.id === selectedStyle) ?? null
  const metier = METIERS_DEMO[selectedMetier]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

      {/* Choix du métier de demo */}
      <div className="mb-8">
        <div className="text-sm font-medium text-foreground/60 dark:text-white/50 mb-3">Simuler pour :</div>
        <div className="flex flex-wrap gap-2">
          {METIERS_DEMO.map((m, i) => (
            <button
              key={m.label}
              onClick={() => setSelectedMetier(i)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all border ${
                i === selectedMetier
                  ? 'bg-electric text-white border-electric'
                  : 'border-navy/20 dark:border-white/15 text-foreground/70 dark:text-white/50 hover:border-electric/40'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grille des styles */}
      <div className="grid lg:grid-cols-2 gap-6 mb-10">
        {STYLES.map(s => (
          <button
            key={s.id}
            onClick={() => setSelectedStyle(s.id)}
            className={`text-left rounded-2xl border-2 transition-all overflow-hidden ${
              selectedStyle === s.id
                ? 'border-electric ring-4 ring-electric/10'
                : 'border-navy/15 dark:border-white/10 hover:border-electric/40'
            }`}
          >
            <div className="p-4 pb-3">
              <StylePreview style={s} metier={metier} />
            </div>
            <div className="px-4 pb-4">
              <div className="font-semibold text-foreground dark:text-white text-sm">{s.label}</div>
              <div className="text-xs text-foreground/50 dark:text-white/40 mt-0.5">{s.desc}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Profil + CTA */}
      {style ? (
        <ProfilStyle style={style} metier={metier} />
      ) : (
        <div className="rounded-2xl border border-dashed border-navy/20 dark:border-white/15 p-8 text-center text-foreground/40 dark:text-white/30 text-sm">
          Sélectionnez un style pour voir votre profil et les recommandations
        </div>
      )}

      {/* Liens internes */}
      <div className="flex flex-wrap gap-4 text-sm pt-6 mt-6 border-t border-navy/10 dark:border-white/10">
        <Link href="/outils/audit-site" className="text-electric hover:underline">Auditer mon site →</Link>
        <Link href="/realisations" className="text-electric hover:underline">Voir nos réalisations →</Link>
        <Link href="/services" className="text-electric hover:underline">Nos services →</Link>
      </div>
    </div>
  )
}
