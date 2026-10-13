/* eslint-disable react/no-unescaped-entities */
import { VILLES } from '@/data/villes'
import Link from 'next/link'
import { MapPin, ChevronRight } from 'lucide-react'
import { SITE, aPartirDe } from '@/config/site'
import MiniHero from '@/components/ui/MiniHero'

export const metadata = {
  title: 'Agence web — Création site internet en France',
  description: `Agence web basée à Tours, création de sites internet pour TPE et artisans partout en France. Site vitrine ${aPartirDe(SITE.pricing.vitrine)}, livré en 10 jours. Devis gratuit.`,
  alternates: { canonical: `${SITE.url}/agence-web` },
  openGraph: {
    url: `${SITE.url}/agence-web`,
    title: 'Agence web — Création site internet en France',
    description: `Stackup Agency crée des sites internet professionnels pour les entrepreneurs et TPE. ${aPartirDe(SITE.pricing.vitrine)}.`,
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
    <div className="min-h-screen bg-[#FFFDF9]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <MiniHero
        signature="maillage"
        breadcrumb={[{ name: 'Agence web' }]}
        title="Agence web — création de sites internet"
      >
        <p className="su-sig__chapo">
          Stackup Agency crée des sites internet professionnels pour les TPE, artisans et commerces.
          Basée à Tours, nous intervenons à distance dans toute la France.
          À partir de {SITE.pricing.vitrine} €, livraison en 10 jours.
        </p>
      </MiniHero>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-12">
        {villesByRegion.map(({ region, villes }) => (
          villes.length > 0 && (
            <section key={region}>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-electric" />
                {region}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {villes.map(v => (
                  <Link key={v.slug} href={`/agence-web/${v.slug}`} className="flex items-center justify-between p-4 rounded-xl border border-navy/20 hover:border-blue-400/40 transition-colors group">
                    <div>
                      <span className="font-medium text-foreground group-hover:text-electric transition-colors">Agence web {v.ville}</span>
                      <p className="text-xs text-foreground/70 mt-0.5">{v.departement}</p>
                    </div>
                    <ChevronRight size={16} className="text-[#64748B] group-hover:text-electric transition-colors" />
                  </Link>
                ))}
              </div>
            </section>
          )
        ))}

        <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric text-center">
          <h2 className="text-white font-bold text-xl mb-2">Votre ville n'est pas listée ?</h2>
          <p className="text-white/70 mb-4">Nous intervenons dans toute la France. Contactez-nous pour en parler.</p>
          <Link href="/contact" className="inline-block px-6 py-3 bg-gold hover:bg-gold/80 text-ink font-semibold rounded-xl transition-all hover:-translate-y-0.5">
            Demander un devis →
          </Link>
        </div>
      </div>
    </div>
  )
}
