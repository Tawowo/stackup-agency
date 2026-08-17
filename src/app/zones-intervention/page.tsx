import { DEPARTEMENTS } from '@/data/departements'
import { VILLES } from '@/data/villes'
import { SITE } from '@/config/site'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata = {
  title: { absolute: 'Zones d’intervention — Création de site internet partout en France | Stackup' },
  description:
    'Stackup Agency crée des sites internet dans plus de 1 000 communes : Centre-Val de Loire (Tours, Orléans, Blois, Chartres, Bourges, Châteauroux), régions limitrophes et toute la France. À distance, aux mêmes tarifs partout.',
  alternates: { canonical: `${SITE.url}/zones-intervention` },
  openGraph: {
    url: `${SITE.url}/zones-intervention`,
    title: 'Zones d’intervention — Stackup Agency',
    description: 'Plus de 1 000 communes couvertes. Création de sites internet à distance, aux mêmes tarifs partout en France.',
    type: 'website',
  },
}

const GRANDES_VILLES_FRANCE = [
  'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux', 'Lille', 'Nantes', 'Nice', 'Strasbourg', 'Rennes',
  'Montpellier', 'Grenoble', 'Dijon', 'Angers', 'Reims', 'Le Havre', 'Saint-Étienne', 'Toulon', 'Clermont-Ferrand',
  'Limoges', 'Besançon', 'Rouen', 'Caen', 'Nancy', 'Metz', 'Brest', 'Le Mans', 'Amiens', 'Perpignan', 'Nîmes',
]

// Regroupement par région
const REGIONS: { nom: string; deps: string[] }[] = [
  { nom: 'Centre-Val de Loire', deps: ['indre-et-loire', 'loiret', 'loir-et-cher', 'eure-et-loir', 'cher', 'indre'] },
  { nom: 'Pays de la Loire', deps: ['sarthe', 'maine-et-loire'] },
  { nom: 'Nouvelle-Aquitaine', deps: ['vienne', 'deux-sevres'] },
]

export default function ZonesInterventionPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Zones d’intervention', item: `${SITE.url}/zones-intervention` },
    ],
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: 'Zones d’intervention' }]} />
          <p className="text-[13px] font-semibold text-gold uppercase tracking-[0.18em] mb-3">Partout en France</p>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">Nos zones d’intervention</h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Basée à Tours, Stackup Agency crée des sites internet pour les entreprises de <strong className="text-gold">plus de 1 000 communes</strong> :
            tout le Centre-Val de Loire, les départements limitrophes et les grandes villes de France.
            La création se fait à distance — visio, téléphone, partage d’écran — aux mêmes tarifs affichés partout.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-14">

        {/* Comment on travaille à distance */}
        <section>
          <h2 className="text-2xl font-bold text-navy mb-4">Comment nous travaillons à distance</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { titre: 'Un premier appel', desc: '30 minutes pour comprendre votre projet, où que vous soyez. Devis gratuit sous 72 h.' },
              { titre: 'Validation par étapes', desc: 'Maquette, contenus, mise en ligne : vous validez chaque étape par visio ou email, à votre rythme.' },
              { titre: 'Livraison partout en France', desc: 'Site en ligne en 10 jours ouvrés (vitrine), formation à distance incluse, support 30 jours.' },
            ].map(s => (
              <div key={s.titre} className="p-5 rounded-xl bg-white border border-gray-100">
                <div className="font-bold text-navy text-sm mb-2">{s.titre}</div>
                <div className="text-navy/55 text-sm leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Régions → départements → communes */}
        {REGIONS.map(region => (
          <section key={region.nom}>
            <h2 className="text-2xl font-bold text-navy mb-6">{region.nom}</h2>
            <div className="space-y-8">
              {region.deps.map(slug => {
                const d = DEPARTEMENTS.find(x => x.slug === slug)
                if (!d) return null
                const villesAvecPage = VILLES.filter(v => d.communesPrincipales.some(c =>
                  c.localeCompare(v.ville, 'fr', { sensitivity: 'base' }) === 0))
                return (
                  <div key={d.slug} id={d.slug} className="rounded-2xl bg-white border border-gray-100 p-6 scroll-mt-24">
                    <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                      <h3 className="text-lg font-bold text-navy flex items-center gap-2">
                        <MapPin size={16} className="text-gold" /> {d.nom} ({d.code})
                      </h3>
                      <Link href={`/agence-web/departement/${d.slug}`}
                        className="inline-flex items-center gap-1 text-electric text-sm font-medium hover:underline">
                        Page complète {d.code} <ArrowRight size={13} />
                      </Link>
                    </div>
                    {villesAvecPage.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {villesAvecPage.map(v => (
                          <Link key={v.slug} href={`/agence-web/${v.slug}`}
                            className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold hover:border-gold transition-colors">
                            {v.ville}
                          </Link>
                        ))}
                      </div>
                    )}
                    <p className="text-navy/55 text-sm leading-relaxed columns-2 sm:columns-3 gap-6">
                      {d.communes.join(' · ')}
                    </p>
                  </div>
                )
              })}
            </div>
          </section>
        ))}

        {/* Grandes villes de France */}
        <section>
          <h2 className="text-2xl font-bold text-navy mb-3">Grandes villes — toute la France</h2>
          <p className="text-navy/55 text-sm mb-5 max-w-2xl">
            Au-delà de notre région d’origine, nous accompagnons des entreprises dans toutes les grandes villes françaises.
            La distance ne change ni le prix, ni le délai, ni la qualité du suivi.
          </p>
          <p className="text-navy/60 text-sm leading-relaxed">
            {GRANDES_VILLES_FRANCE.join(' · ')}
          </p>
        </section>

        {/* Compteur + CTA */}
        <section className="rounded-2xl p-8 bg-gradient-to-br from-navy to-electric text-center">
          <div className="text-4xl font-black text-gold mb-1">Plus de 1 000</div>
          <p className="text-white/80 font-semibold mb-1">communes couvertes en France</p>
          <p className="text-white/60 text-sm mb-6">Mêmes tarifs partout : site vitrine dès {SITE.pricing.vitrine} €, devis gratuit sous 72 h.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/devis" className="px-6 py-3 bg-gold hover:bg-gold/90 text-ink font-bold rounded-xl transition-all hover:-translate-y-0.5 text-sm">
              Démarrer mon devis
            </Link>
            <Link href="/tarifs" className="px-6 py-3 border border-white/25 text-white hover:bg-white/10 font-semibold rounded-xl transition-all text-sm">
              Voir les tarifs
            </Link>
          </div>
        </section>

        {/* Maillage */}
        <div className="flex flex-wrap gap-4 text-sm pt-4 border-t border-navy/10">
          <Link href="/agence-web" className="text-electric hover:underline">Nos pages villes →</Link>
          <Link href="/creation-site-internet" className="text-electric hover:underline">Sites par métier →</Link>
          <Link href="/services" className="text-electric hover:underline">Nos services →</Link>
        </div>
      </div>
    </div>
  )
}
