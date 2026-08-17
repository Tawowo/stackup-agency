'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { SITE } from '@/config/site'

const FAQ_ITEMS = [
  { q: 'Combien coûte un site internet professionnel ?', a: `Un site vitrine complet démarre à ${SITE.pricing.vitrine} €, livraison et hébergement 12 mois inclus. Pas de frais cachés.` },
  { q: 'Combien de temps dure la réalisation ?', a: `Un site vitrine est livré en ${SITE.delais.vitrine} à compter de la validation du design. Les délais sont contractuels.` },
  { q: 'Suis-je propriétaire de mon site ?', a: 'Oui, à 100 %. Vous recevez tous les accès (hébergement, nom de domaine, code source) à la livraison.' },
]

export default function HomeFaq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-16 bg-[#060D1A] scanline-section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="section-marker mb-2" aria-hidden="true">[ FAQ ]</div>
        <h2 className="text-2xl font-bold text-white mb-6">Questions fréquentes</h2>
        <div className="space-y-2">
          {FAQ_ITEMS.map(({ q, a }, i) => (
            <div
              key={q}
              className={`rounded-xl transition-colors duration-200 overflow-hidden glass-panel ${
                open === i ? 'border-electric/30' : 'hover:border-white/15'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 group"
              >
                {/* [ Q ] mono marker per spec §2.10 */}
                <span className="faq-q-mono shrink-0 text-electric/60 data-mono text-xs mr-1" aria-hidden="true">[ Q ]</span>
                <span className={`flex-1 font-semibold text-sm leading-snug transition-colors ${open === i ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                  {q}
                </span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-electric/70 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              <div className={`faq-body ${open === i ? 'open' : ''}`}>
                <div>
                  <p className="px-5 pb-4 text-white/60 text-sm leading-relaxed">{a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link href="/faq" className="mt-6 inline-flex items-center gap-2 text-electric font-medium text-sm hover:text-electric/80 transition-colors">
          Toutes les questions <ArrowRight size={14} className="arrow-slide" />
        </Link>
      </div>
    </section>
  )
}
