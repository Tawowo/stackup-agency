/* eslint-disable react/no-unescaped-entities */
import { METIERS, CATEGORIES_METIERS } from '@/data/metiers'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { SITE } from '@/config/site'

export const metadata = {
  title: 'Création site internet par métier — Artisans, commerces, professions libérales',
  description: `Stackup Agency crée des sites internet adaptés à votre métier. Restaurant, artisan, médecin, commerçant : votre site professionnel à partir de ${SITE.pricing.vitrine}€, livré en 10 jours.`,
  alternates: { canonical: `${SITE.url}/creation-site-internet` },
  openGraph: {
    url: `${SITE.url}/creation-site-internet`,
    title: 'Création site internet par métier',
    description: `Sites internet professionnels par métier. À partir de ${SITE.pricing.vitrine}€.`,
    type: 'website',
  },
}

export default function CreationSiteInternetPage() {
  const categories = Object.entries(CATEGORIES_METIERS)

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Création site internet par métier — Stackup Agency',
    itemListElement: METIERS.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `Site internet ${m.metier}`,
      url: `${SITE.url}/creation-site-internet/${m.slug}`,
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
            <span className="text-white/60">Création site internet</span>
          </nav>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Création de site internet par métier
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Chaque métier a ses spécificités. Stackup Agency crée des sites adaptés à votre activité :
            restaurant, artisan, professionnel de santé, commerce... À partir de {SITE.pricing.vitrine}€.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-12">
        {categories.map(([cat, catLabel]) => {
          const metiersOfCat = METIERS.filter(m => m.categorie === cat)
          if (metiersOfCat.length === 0) return null
          return (
            <section key={cat}>
              <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">{catLabel}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {metiersOfCat.map(m => (
                  <Link key={m.slug} href={`/creation-site-internet/${m.slug}`} className="flex items-center justify-between p-4 rounded-xl border border-navy/20 dark:border-white/10 hover:border-blue-400/40 transition-colors group">
                    <span className="font-medium text-foreground dark:text-white group-hover:text-blue-400 transition-colors capitalize">{m.metier}</span>
                    <ChevronRight size={16} className="text-white/30 group-hover:text-blue-400 transition-colors" />
                  </Link>
                ))}
              </div>
            </section>
          )
        })}

        <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric text-center">
          <h2 className="text-white font-bold text-xl mb-2">Votre métier n'est pas listé ?</h2>
          <p className="text-white/70 mb-4">Nous travaillons avec tous les types d'entreprises. Contactez-nous.</p>
          <Link href="/#contact" className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5">
            Demander un devis →
          </Link>
        </div>
      </div>
    </div>
  )
}
