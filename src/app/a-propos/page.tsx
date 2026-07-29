/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { SITE } from '@/config/site'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata = {
  title: 'À propos — Stackup Agency, agence web à Tours',
  description: `Stackup Agency est une agence web basée à Tours (37), spécialisée dans la création de sites internet et d'applications sur mesure pour les TPE et artisans. À partir de ${SITE.pricing.vitrine}€.`,
  alternates: { canonical: `${SITE.url}/a-propos` },
  openGraph: {
    url: `${SITE.url}/a-propos`,
    title: 'À propos — Stackup Agency',
    description: `Agence web à Tours spécialisée dans la création de sites internet pour TPE et artisans.`,
    type: 'website',
  },
}

export default function AProposPage() {
  const url = `${SITE.url}/a-propos`

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'À propos de Stackup Agency',
    url,
    description: 'Stackup Agency est une agence web basée à Tours, spécialisée dans la création de sites internet pour TPE et artisans.',
    mainEntity: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      foundingDate: SITE.founded,
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE.address.locality,
        addressRegion: SITE.address.region,
        addressCountry: SITE.address.country,
      },
      sameAs: [SITE.social.linkedin, SITE.social.instagram, SITE.social.facebook],
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'À propos', item: url },
    ],
  }

  return (
    <div className="min-h-screen bg-background dark:bg-[#0A0F1C]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: 'À propos' }]} />
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            À propos de Stackup Agency
          </h1>
          <p className="text-white/70 text-lg">
            Une agence web fondée à Tours par des développeurs convaincus qu'un bon site internet
            ne devrait pas coûter une fortune ni prendre trois mois.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-16">

        {/* L'agence */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">L'agence</h2>
          <div className="space-y-4 text-foreground/80 dark:text-white/80">
            <p>
              Stackup Agency est une micro-agence web basée à {SITE.address.locality} ({SITE.address.department}),
              spécialisée dans la création de sites internet et d'applications sur mesure pour les TPE,
              artisans et commerces locaux.
            </p>
            <p>
              Le modèle est simple : des offres transparentes avec des prix affichés, des délais tenus,
              et un interlocuteur unique du devis à la mise en ligne. Pas de chef de projet intermédiaire,
              pas de délégation à des sous-traitants anonymes. Vous parlez directement au développeur
              qui code votre site.
            </p>
            <p>
              Nous travaillons en Next.js, TypeScript et applications métier sur mesure. Cette approche
              nous permet de livrer des sites rapides, bien référencés et faciles à faire évoluer —
              sans compromis sur la qualité du code.
            </p>
          </div>

          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Fondée en', value: SITE.founded },
              { label: 'Basée à', value: `${SITE.address.locality} (${SITE.address.departmentCode})` },
              { label: 'Délai site vitrine', value: SITE.delais.vitrine },
            ].map(stat => (
              <div key={stat.label} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Notre approche */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">Notre approche</h2>
          <div className="space-y-4 text-foreground/80 dark:text-white/80">
            <p>
              Chaque projet démarre par une écoute attentive : quels sont vos objectifs, vos clients,
              vos contraintes ? Nous proposons ensuite une solution adaptée — pas un template générique
              sorti d'un catalogue.
            </p>
            <p>
              Nos sites sont construits avec les mêmes technologies que les grandes applications web :
              Next.js pour la performance et le SEO, TypeScript pour la fiabilité, Tailwind pour
              l'interface. Résultat : des sites rapides, accessibles, et faciles à maintenir.
            </p>
          </div>
        </section>

        {/* Ce en quoi nous croyons */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">Ce en quoi nous croyons</h2>
          <div className="space-y-3">
            {[
              'Les prix doivent être affichés clairement, sans mauvaise surprise',
              'Un site livré en 10 jours vaut mieux qu\'un projet qui traîne 6 mois',
              'Le code propre et performant, c\'est un respect pour l\'utilisateur et pour Google',
              'La maintenance et l\'hébergement font partie du service, pas une option cachée',
              'Votre site vous appartient — export et accès complets garantis',
              'Pas de clients fictifs, pas de témoignages inventés : uniquement ce que nous avons réellement fait',
            ].map(item => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground/80 dark:text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Jugez sur pièce */}
        <section className="rounded-2xl p-6 bg-gradient-to-br from-navy/20 to-blue-950/20 border border-white/10">
          <h2 className="text-xl font-bold text-foreground dark:text-white mb-3">Jugez sur pièce</h2>
          <p className="text-foreground/70 dark:text-white/70 mb-4">
            Toutes nos démonstrations sont des projets complets, construits par nos soins et consultables en ligne.
            Ce que vous voyez est exactement ce que nous livrons.
          </p>
          <Link href="/realisations" className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
            Explorer nos démonstrations →
          </Link>
        </section>

        {/* Contact */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric text-center">
          <h3 className="text-white font-bold text-xl mb-2">On discute de votre projet ?</h3>
          <p className="text-white/70 mb-4">Premier rendez-vous gratuit, devis sous 72h, sans engagement.</p>
          <Link href="/contact" className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5">
            Prendre contact →
          </Link>
        </div>
      </div>
    </div>
  )
}
