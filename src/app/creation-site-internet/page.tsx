/* eslint-disable react/no-unescaped-entities */
import { METIERS, CATEGORIES_METIERS } from '@/data/metiers'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SITE, aPartirDe } from '@/config/site'
import MiniHero from '@/components/ui/MiniHero'

export const metadata = {
  title: 'Sites internet par métier — TPE, artisans',
  description: `Site internet sur mesure selon votre métier : restaurant, artisan, médecin, commerçant. ${aPartirDe(SITE.pricing.vitrine)}, livré en 10 jours. Devis gratuit sous 72h.`,
  alternates: { canonical: `${SITE.url}/creation-site-internet` },
  openGraph: {
    url: `${SITE.url}/creation-site-internet`,
    title: 'Création site internet par métier',
    description: `Sites internet professionnels par métier. ${aPartirDe(SITE.pricing.vitrine)}.`,
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
    <div className="min-h-screen bg-[#FFFDF9]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <MiniHero
        signature="trace"
        breadcrumb={[{ name: 'Création site internet' }]}
        title="Création de site internet par métier"
        subtitle={`Chaque métier a ses spécificités. Stackup Agency crée des sites adaptés à votre activité : restaurant, artisan, professionnel de santé, commerce… ${aPartirDe(SITE.pricing.vitrine)}.`}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-12">
        {categories.map(([cat, catLabel]) => {
          const metiersOfCat = METIERS.filter(m => m.categorie === cat)
          if (metiersOfCat.length === 0) return null
          return (
            <section key={cat}>
              <h2 className="text-xl font-bold text-foreground mb-4">{catLabel}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {metiersOfCat.map(m => (
                  <Link key={m.slug} href={`/creation-site-internet/${m.slug}`} className="flex items-center justify-between p-4 rounded-xl border border-navy/20 hover:border-blue-400/40 transition-colors group">
                    <span className="font-medium text-foreground group-hover:text-electric transition-colors capitalize">{m.metier}</span>
                    <ChevronRight size={16} className="text-[#64748B] group-hover:text-electric transition-colors" />
                  </Link>
                ))}
              </div>
            </section>
          )
        })}

        <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric text-center">
          <h2 className="text-white font-bold text-xl mb-2">Votre métier n'est pas listé ?</h2>
          <p className="text-white/70 mb-4">Nous travaillons avec tous les types d'entreprises. Contactez-nous.</p>
          <Link href="/contact" className="inline-block px-6 py-3 bg-gold hover:bg-gold/80 text-ink font-semibold rounded-xl transition-all hover:-translate-y-0.5">
            Demander un devis →
          </Link>
        </div>
      </div>
    </div>
  )
}
