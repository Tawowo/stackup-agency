/* eslint-disable react/no-unescaped-entities */
import { VILLES } from '@/data/villes'
import Link from 'next/link'
import { MapPin, ChevronRight, Home } from 'lucide-react'
import { SITE } from '@/config/site'

export const metadata = {
  title: 'Agence web — Création de sites internet partout en France',
  description: `Stackup Agency crée des sites internet professionnels pour les entrepreneurs et TPE. Basée à Tours, nous intervenons dans toute la région Centre-Val de Loire et au-delà. À partir de ${SITE.pricing.vitrine}€.`,
  alternates: { canonical: `${SITE.url}/agence-web` },
  openGraph: {
    url: `${SITE.url}/agence-web`,
    title: 'Agence web — Création de sites internet partout en France',
    description: `Stackup Agency crée des sites internet professionnels pour les entrepreneurs et TPE. À partir de ${SITE.pricing.vitrine}€.`,
    type: 'website',
  },
}

const REGIONS = ['Centre-Val de Loire', 'Pays de la Loire', 'Normandie', 'Île-de-France']

export default function AgenceWebPage() {
  const villesByRegion = REGIONS.map(r => ({
    region: r,
    villes: VILLES.filter(v => v.region === r),
  }))

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Zones d\'intervention — Agence web Stackup Agency',
    itemListElement: VILLES.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `Agence web ${v.ville}`,
      url: `${SITE.url}/agence-web/${v.slug}`,
    })),
  }

  return (
    <div className="min-h-screen bg-background dark:bg-[#0A0F1C]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 text-white/40 text-xs mb-6" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1"><Home size={11} /> Accueil</Link>
            <ChevronRight size={11} />
            <span className="text-white/60">Agence web</span>
          </nav>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Agence web — création de sites internet
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Stackup Agency crée des sites internet professionnels pour les TPE, artisans et commerces.
            Basée à Tours, nous intervenons à distance dans toute la France.
            À partir de {SITE.pricing.vitrine}€, livraison en 10 jours.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-12">
        {villesByRegion.map(({ region, villes }) => (
          villes.length > 0 && (
            <section key={region}>
              <h2 className="text-xl font-bold text-foreground dark:text-white mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-blue-400" />
                {region}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {villes.map(v => (
                  <Link key={v.slug} href={`/agence-web/${v.slug}`} className="flex items-center justify-between p-4 rounded-xl border border-navy/20 dark:border-white/10 hover:border-blue-400/40 transition-colors group">
                    <div>
                      <span className="font-medium text-foreground dark:text-white group-hover:text-blue-400 transition-colors">Agence web {v.ville}</span>
                      <p className="text-xs text-foreground/50 dark:text-white/50 mt-0.5">{v.departement}</p>
                    </div>
                    <ChevronRight size={16} className="text-white/30 group-hover:text-blue-400 transition-colors" />
                  </Link>
                ))}
              </div>
            </section>
          )
        ))}

        <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric text-center">
          <h2 className="text-white font-bold text-xl mb-2">Votre ville n'est pas listée ?</h2>
          <p className="text-white/70 mb-4">Nous intervenons dans toute la France. Contactez-nous pour en parler.</p>
          <Link href="/#contact" className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5">
            Demander un devis →
          </Link>
        </div>
      </div>
    </div>
  )
}
