/* eslint-disable react/no-unescaped-entities */
'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { CheckCircle, XCircle, Minus, ChevronRight } from 'lucide-react'
import { SITE } from '@/config/site'

type Val = 'oui' | 'non' | 'partiel'

const ROWS: { label: string; wix: Val; wp: Val; mesure: Val; note?: string; cat: string }[] = [
  { cat: 'Prise en main',    label: 'Facilité de démarrage',             wix: 'oui',     wp: 'partiel', mesure: 'partiel', note: 'Wix est le plus simple à prendre en main seul' },
  { cat: 'Performance',      label: 'Performances (Core Web Vitals)',     wix: 'non',     wp: 'partiel', mesure: 'oui',     note: 'Les sites Next.js atteignent 90+ en Lighthouse' },
  { cat: 'SEO',              label: 'SEO technique complet',              wix: 'partiel', wp: 'partiel', mesure: 'oui',     note: 'Wix a progressé mais reste limité sur le technique' },
  { cat: 'Propriété',        label: 'Propriété du code',                  wix: 'non',     wp: 'oui',     mesure: 'oui',     note: 'Wix : vous êtes locataire de la plateforme' },
  { cat: 'Coût',             label: 'Sans abonnement mensuel obligatoire',wix: 'non',     wp: 'partiel', mesure: 'oui',     note: 'Wix facture 17-35€/mois en plus du tarif initial' },
  { cat: 'Design',           label: 'Design 100 % sur mesure',            wix: 'non',     wp: 'partiel', mesure: 'oui',     note: 'Wix et WP imposent des contraintes de templates' },
  { cat: 'Rapidité',         label: 'Vitesse de création',                wix: 'oui',     wp: 'oui',     mesure: 'partiel', note: 'Le sur-mesure prend 10-21 jours selon le type' },
  { cat: 'Sécurité',         label: 'Sécurité et mises à jour',           wix: 'oui',     wp: 'non',     mesure: 'oui',     note: 'WP est souvent ciblé par les pirates (plugins)' },
  { cat: 'Liberté',          label: 'Migration vers autre solution',       wix: 'non',     wp: 'oui',     mesure: 'oui',     note: 'Wix bloque l\'export du site complet' },
  { cat: 'Coût',             label: 'Coût total sur 3 ans',               wix: 'non',     wp: 'partiel', mesure: 'oui',     note: 'Wix coûte ~900-1800€ sur 3 ans d\'abonnement seul' },
]

const FILTERS = ['Tous', 'Coût', 'Performance', 'SEO', 'Propriété', 'Design', 'Sécurité', 'Liberté']

function Cell({ v, visible, delay }: { v: Val; visible: boolean; delay: number }) {
  const el = v === 'oui'
    ? <CheckCircle size={18} className="text-success" />
    : v === 'non'
    ? <XCircle size={18} className="text-red-400" />
    : <Minus size={18} className="text-gold" />

  return (
    <td className="py-4 px-4 text-center">
      <div className="flex justify-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.4)',
          transition: `opacity 0.35s ease ${delay}ms, transform 0.35s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`
        }}>
        {el}
      </div>
    </td>
  )
}

function ScoreBar({ solution, score, color }: { solution: string; score: number; color: string }) {
  const [w, setW] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setW(score), 100); obs.disconnect() } })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [score])
  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between text-sm mb-1.5">
        <span className="font-semibold text-white">{solution}</span>
        <span className="text-white/50 tabular-nums">{score}/100</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div className={`h-full rounded-full ${color}`}
          style={{ width: `${w}%`, transition: 'width 1s cubic-bezier(0.16,1,0.3,1)' }} />
      </div>
    </div>
  )
}

export default function ComparatifClient() {
  const [filter, setFilter] = useState('Tous')
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  const [visible, setVisible] = useState(false)
  const [selectedNote, setSelectedNote] = useState<string | null>(null)
  const tableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.1 })
    if (tableRef.current) obs.observe(tableRef.current)
    return () => obs.disconnect()
  }, [])

  const filtered = filter === 'Tous' ? ROWS : ROWS.filter(r => r.cat === filter)

  // Score totaux
  const scores = {
    wix: ROWS.filter(r => r.wix === 'oui').length * 10 + ROWS.filter(r => r.wix === 'partiel').length * 5,
    wp: ROWS.filter(r => r.wp === 'oui').length * 10 + ROWS.filter(r => r.wp === 'partiel').length * 5,
    mesure: ROWS.filter(r => r.mesure === 'oui').length * 10 + ROWS.filter(r => r.mesure === 'partiel').length * 5,
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-16">

      {/* Filtres */}
      <div>
        <p className="text-xs text-white/40 uppercase tracking-widest mb-4 font-medium">Filtrer par catégorie</p>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === f
                  ? 'bg-electric text-white shadow-lg shadow-electric/30'
                  : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div ref={tableRef} className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 px-4 text-xs font-semibold text-white/40 uppercase tracking-widest w-2/5">Critère</th>
              <th className="text-center py-4 px-4 text-sm font-bold text-white/70 w-1/5">Wix</th>
              <th className="text-center py-4 px-4 text-sm font-bold text-white/70 w-1/5">WordPress</th>
              <th className="text-center py-4 px-4 text-sm font-bold text-electric w-1/5">
                Sur-mesure ✦
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr
                key={row.label}
                className="compare-row border-b border-white/5 cursor-pointer"
                onMouseEnter={() => { setHoveredRow(i); setSelectedNote(row.note || null) }}
                onMouseLeave={() => { setHoveredRow(null) }}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(-8px)',
                  transition: `opacity 0.4s ease ${i * 60}ms, transform 0.4s ease ${i * 60}ms`,
                  background: hoveredRow === i ? 'rgba(45,125,210,0.05)' : undefined,
                }}
              >
                <td className="py-4 px-4">
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-white/25 font-mono mt-0.5 hidden sm:block w-6 flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="text-sm font-medium text-white">{row.label}</div>
                      <div className="text-xs text-white/30 mt-0.5 hidden sm:block">{row.cat}</div>
                    </div>
                  </div>
                </td>
                <Cell v={row.wix}    visible={visible} delay={i * 60 + 100} />
                <Cell v={row.wp}     visible={visible} delay={i * 60 + 180} />
                <Cell v={row.mesure} visible={visible} delay={i * 60 + 260} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Note tooltip */}
      <div className="h-12">
        {selectedNote && (
          <p className="compare-verdict text-sm text-white/50 italic border-l-2 border-electric/40 pl-4">
            {selectedNote}
          </p>
        )}
      </div>

      {/* Légende */}
      <div className="flex gap-6 text-xs flex-wrap">
        <span className="flex items-center gap-1.5"><CheckCircle size={13} className="text-success" /> <span className="text-white/50">Oui / Bien</span></span>
        <span className="flex items-center gap-1.5"><Minus size={13} className="text-gold" /> <span className="text-white/50">Partiel / Limité</span></span>
        <span className="flex items-center gap-1.5"><XCircle size={13} className="text-red-400" /> <span className="text-white/50">Non / Mauvais</span></span>
      </div>

      {/* Score synthèse */}
      <section className="rounded-2xl border border-white/10 p-8 bg-white/[0.02]">
        <h2 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-8">Score global sur {ROWS.length * 10} points</h2>
        <div className="space-y-3">
          <ScoreBar solution="Sur-mesure (Next.js)" score={scores.mesure} color="bg-electric" />
          <ScoreBar solution="Wix"                  score={scores.wix}    color="bg-white/30" />
          <ScoreBar solution="WordPress"            score={scores.wp}     color="bg-white/20" />
        </div>
      </section>

      {/* Quand choisir */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Quand choisir quoi ?</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { title: 'Wix', icon: '🟡', when: 'Site personnel, hobby, test rapide. Budget zéro et pas besoin de performances poussées.', col: 'border-white/10' },
            { title: 'WordPress', icon: '🔵', when: 'Blog avec beaucoup de contenu, site géré par une équipe non-technique avec accès CMS simple.', col: 'border-white/10' },
            { title: 'Sur-mesure', icon: '⚡', when: `Activité professionnelle, commerce, restaurant, artisan. Dès ${SITE.pricing.vitrine}€ chez Stackup Agency.`, col: 'border-electric/40' },
          ].map((c, i) => (
            <div key={c.title} className={`rounded-2xl border ${c.col} p-5 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-white/20`}
              style={{ animationDelay: `${i * 100}ms` }}>
              <div className="text-2xl mb-3">{c.icon}</div>
              <div className="font-bold text-white mb-2">{c.title}</div>
              <div className="text-sm text-white/50 leading-relaxed">{c.when}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Avis honnête */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Notre avis honnête</h2>
        <div className="space-y-4 text-white/60 text-sm leading-relaxed">
          <p><strong className="text-white">Wix</strong> est idéal si vous voulez gérer vous-même un site simple sans budget initial. Mais les abonnements s'accumulent (17-35€/mois), vous ne possédez pas votre site, et les performances SEO restent inférieures à un site bien construit.</p>
          <p><strong className="text-white">WordPress</strong> offre plus de liberté mais exige une maintenance régulière (mises à jour, plugins, sécurité). Les performances dépendent entièrement du thème et des extensions choisis.</p>
          <p><strong className="text-white">Sur-mesure (Next.js)</strong> est la meilleure option sur 2-3 ans : performances Lighthouse 90+, code propriétaire, pas d'abonnement plateforme, SEO technique complet. Le coût initial est plus élevé mais le coût total sur 3 ans est souvent inférieur à Wix.</p>
        </div>
      </section>

      {/* CTA */}
      <div className="rounded-2xl p-8 bg-gradient-to-br from-navy to-electric text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 opacity-10 rounded-full"
          style={{ background: 'radial-gradient(circle, #F59E0B, transparent)', transform: 'translate(20%, -20%)' }} />
        <h2 className="text-white font-bold text-xl mb-2 relative">Vous avez choisi le sur-mesure ?</h2>
        <p className="text-white/60 text-sm mb-6 relative">Devis express en 5 min · Réponse sous 72h.</p>
        <Link href="/devis"
          className="inline-flex items-center gap-2 px-8 py-3 bg-gold hover:bg-gold/90 text-ink font-bold rounded-xl transition-all hover:-translate-y-0.5 text-sm relative">
          Démarrer mon devis <ChevronRight size={14} />
        </Link>
      </div>

      <div className="flex flex-wrap gap-4 text-sm border-t border-white/5 pt-6">
        <Link href="/outils" className="text-electric hover:underline">Nos outils gratuits →</Link>
        <Link href="/ressources/cahier-des-charges" className="text-electric hover:underline">Cahier des charges →</Link>
        <Link href="/tarifs" className="text-electric hover:underline">Voir les tarifs →</Link>
      </div>
    </div>
  )
}
