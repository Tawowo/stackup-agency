import { SOLUTIONS } from '@/data/solutions'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { SITE } from '@/config/site'

export const metadata = {
  title: 'Solutions digitales sur mesure — RDV, commandes, gestion, CRM',
  description: `Stackup Agency développe des solutions digitales sur mesure pour TPE et artisans : prise de RDV, click & collect, commande en ligne, CRM, gestion des stocks. À partir de ${SITE.pricing.gestion}€.`,
  alternates: { canonical: `${SITE.url}/solutions` },
  openGraph: {
    url: `${SITE.url}/solutions`,
    title: 'Solutions digitales sur mesure — Stackup Agency',
    description: `Solutions digitales sur mesure pour TPE et artisans. À partir de ${SITE.pricing.gestion}€.`,
    type: 'website',
  },
}

export default function SolutionsPage() {
  const p1 = SOLUTIONS.filter(s => s.priorite === 'P1')
  const p2p3 = SOLUTIONS.filter(s => s.priorite !== 'P1')

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Solutions digitales sur mesure — Stackup Agency',
    itemListElement: SOLUTIONS.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.nom,
      url: `${SITE.url}/solutions/${s.slug}`,
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
            <span className="text-white/60">Solutions</span>
          </nav>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Solutions digitales sur mesure
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Au-delà du site vitrine : des outils digitaux conçus pour votre activité.
            Prise de RDV, commandes en ligne, gestion des stocks, CRM — développés sur mesure,
            sans abonnement SaaS, données hébergées en France.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-12">
        <section>
          <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Solutions essentielles</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {p1.map(s => (
              <Link key={s.slug} href={`/solutions/${s.slug}`} className="p-5 rounded-2xl border border-navy/20 dark:border-white/10 hover:border-blue-400/40 transition-colors group">
                <h3 className="font-bold text-foreground dark:text-white group-hover:text-blue-400 transition-colors mb-2">{s.nom}</h3>
                <p className="text-sm text-foreground/60 dark:text-white/60 mb-3">{s.requetePrincipale}</p>
                <div className="flex flex-wrap gap-2">
                  {s.variantes.slice(0, 2).map(v => (
                    <span key={v} className="px-2 py-0.5 text-xs rounded-full bg-blue-500/10 text-blue-400">{v}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Autres solutions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {p2p3.map(s => (
              <Link key={s.slug} href={`/solutions/${s.slug}`} className="flex items-center justify-between p-4 rounded-xl border border-navy/20 dark:border-white/10 hover:border-blue-400/40 transition-colors group">
                <span className="font-medium text-foreground dark:text-white group-hover:text-blue-400 transition-colors">{s.nom}</span>
                <ChevronRight size={16} className="text-white/30 group-hover:text-blue-400 transition-colors" />
              </Link>
            ))}
          </div>
        </section>

        <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric text-center">
          <h2 className="text-white font-bold text-xl mb-2">Une idée de solution sur mesure ?</h2>
          <p className="text-white/70 mb-4">Décrivez votre besoin, nous vous répondons sous 72h.</p>
          <Link href="/contact" className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-400 text-amber-950 font-semibold rounded-xl transition-all hover:-translate-y-0.5">
            Demander un devis →
          </Link>
        </div>
      </div>
    </div>
  )
}
