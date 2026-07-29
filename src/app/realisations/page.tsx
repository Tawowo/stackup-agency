import Link from 'next/link'
import { ChevronRight, ExternalLink } from 'lucide-react'
import { realisations } from '@/lib/realisations'
import { SITE } from '@/config/site'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata = {
  title: 'Réalisations — Sites de démonstration | Stackup Agency',
  description: 'Découvrez nos réalisations et sites de démonstration : site vitrine, e-commerce, boutique en ligne, système de gestion. Projets créés par Stackup Agency.',
  alternates: { canonical: `${SITE.url}/realisations` },
  openGraph: {
    url: `${SITE.url}/realisations`,
    title: 'Réalisations — Stackup Agency',
    description: 'Sites de démonstration réalisés par Stackup Agency.',
    type: 'website',
  },
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Réalisations Stackup Agency',
  itemListElement: realisations.map((r, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: r.nom,
    url: `${SITE.url}/realisations/${r.slug}`,
  })),
}

export default function RealisationsPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-[#0A0F1C]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: 'Réalisations' }]} />
          <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-semibold rounded-full mb-4 uppercase tracking-wide">
            Sites de démonstration
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Nos réalisations
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Ces projets sont des sites de démonstration conçus pour illustrer nos capacités techniques.
            Ils ne représentent pas de clients réels, sauf mention explicite.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {realisations.map(r => (
            <Link key={r.slug} href={`/realisations/${r.slug}`}
              className="group rounded-2xl border border-navy/20 dark:border-white/10 overflow-hidden hover:border-blue-500/30 transition-colors">
              <div className="h-40 flex items-center justify-center relative" style={{ background: r.couleur }}>
                <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(135deg, ${r.accent}, transparent)` }} />
                <span className="relative text-white/80 font-bold text-2xl tracking-tight">{r.nom.charAt(0)}</span>
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-black/40 text-white/80 text-xs rounded-full font-medium">Démonstration</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="font-bold text-foreground dark:text-white group-hover:text-blue-400 transition-colors">{r.nom}</h2>
                  <ChevronRight size={16} className="text-white/30 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-0.5" />
                </div>
                <p className="text-xs text-foreground/50 dark:text-white/50 mb-2">{r.type}</p>
                <p className="text-sm text-foreground/70 dark:text-white/70 line-clamp-2">{r.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {r.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-full text-xs border border-white/10 text-foreground/50 dark:text-white/50">{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Roma Pizzeria — seul client réel */}
        <section className="rounded-2xl border border-green-500/30 bg-green-500/5 p-6 lg:p-8 mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">Client réel</span>
          </div>
          <h2 className="text-xl font-bold text-foreground dark:text-white mb-2">Roma Pizzeria — Savigné-sur-Lathan</h2>
          <p className="text-foreground/70 dark:text-white/70 mb-4">
            Site vitrine avec prise de commande en ligne pour une pizzeria artisanale en Indre-et-Loire.
            Livré en 9 jours, le site a permis de développer la vente en ligne.
          </p>
          <div className="flex items-center gap-2">
            <a href="https://romapizzeria.fr" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 border border-white/20 text-white hover:bg-white/10 text-sm rounded-xl transition-colors">
              Voir le site <ExternalLink size={13} />
            </a>
          </div>
        </section>

        <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric text-center">
          <h2 className="text-white font-bold text-xl mb-2">Votre projet mérite le même soin</h2>
          <p className="text-white/70 mb-4">Devis gratuit sous 72h. Premier rendez-vous sans engagement.</p>
          <Link href="/contact" className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5">
            Démarrer mon projet →
          </Link>
        </div>
      </div>
    </div>
  )
}
