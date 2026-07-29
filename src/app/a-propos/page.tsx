/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import { ChevronRight, Home, ExternalLink, CheckCircle } from 'lucide-react'
import { SITE } from '@/config/site'

export const metadata = {
  title: 'À propos — Mathéo Reboul, fondateur de Stackup Agency',
  description: `Stackup Agency est une agence web fondée par Mathéo Reboul, développeur basé à Tours (37). Création de sites internet et applications sur mesure pour les TPE et artisans. À partir de ${SITE.pricing.vitrine}€.`,
  alternates: { canonical: `${SITE.url}/a-propos` },
  openGraph: {
    url: `${SITE.url}/a-propos`,
    title: 'À propos — Stackup Agency',
    description: `Stackup Agency, agence web fondée par Mathéo Reboul à Tours. Sites internet et applications sur mesure pour TPE et artisans.`,
    type: 'profile',
  },
}

export default function AProposPage() {
  const url = `${SITE.url}/a-propos`

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'À propos de Stackup Agency',
    url,
    description: 'Stackup Agency est une agence web fondée par Mathéo Reboul, développeur basé à Tours.',
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
      founder: {
        '@type': 'Person',
        name: SITE.founder.name,
        jobTitle: SITE.founder.role,
        url: SITE.founder.linkedin,
        sameAs: [SITE.founder.linkedin],
      },
    },
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.founder.name,
    jobTitle: SITE.founder.role,
    url: SITE.founder.linkedin,
    worksFor: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    sameAs: [SITE.founder.linkedin, SITE.social.instagram],
    knowsAbout: ['Développement web', 'Next.js', 'SEO', 'TypeScript', 'Applications métier', 'E-commerce'],
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 text-white/40 text-xs mb-6" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1"><Home size={11} /> Accueil</Link>
            <ChevronRight size={11} />
            <span className="text-white/60">À propos</span>
          </nav>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            À propos de Stackup Agency
          </h1>
          <p className="text-white/70 text-lg">
            Une agence web fondée à Tours par un développeur qui croit qu'un bon site internet
            ne devrait pas coûter une fortune ni prendre trois mois.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-16">

        {/* Fondateur */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">Le fondateur</h2>
          <div className="p-6 rounded-2xl border border-navy/20 dark:border-white/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                M
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground dark:text-white">{SITE.founder.name}</h3>
                <p className="text-blue-400 font-medium">{SITE.founder.role}</p>
                <p className="text-foreground/50 dark:text-white/50 text-sm mt-1">
                  Basé à {SITE.address.locality}, {SITE.address.department}
                </p>
              </div>
            </div>
            <div className="prose dark:prose-invert max-w-none text-foreground/80 dark:text-white/80 space-y-3">
              <p>
                Développeur web fullstack spécialisé en Next.js, TypeScript et applications métier.
                J'ai fondé Stackup Agency en {SITE.founded} avec une conviction simple : les TPE et artisans
                méritent des sites web aussi professionnels que les grandes entreprises, à des tarifs accessibles.
              </p>
              <p>
                Avant Stackup Agency, j'ai travaillé sur des projets web variés — de la landing page simple
                au système de gestion complet. Cette expérience m'a convaincu que la clé est dans la rapidité
                d'exécution et la qualité du code, pas dans des processus d'agence interminables.
              </p>
              <p>
                Chaque projet est géré directement par moi. Pas de chef de projet intermédiaire, pas de délégation
                à des sous-traitants anonymes. Vous parlez au développeur qui code votre site.
              </p>
            </div>
            <div className="mt-4 flex gap-3">
              <a
                href={SITE.founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-xl text-sm transition-colors"
              >
                <ExternalLink size={14} /> LinkedIn
              </a>
            </div>
          </div>
        </section>

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
              et un interlocuteur unique du devis à la mise en ligne.
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

        {/* Valeurs */}
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

        {/* Client réel */}
        <section className="rounded-2xl p-6 bg-gradient-to-br from-navy/20 to-blue-950/20 border border-white/10">
          <h2 className="text-xl font-bold text-foreground dark:text-white mb-3">Notre client de référence</h2>
          <p className="text-foreground/70 dark:text-white/70 mb-4">
            <strong className="text-white">Roma Pizzeria</strong> à Savigné-sur-Lathan (37) est notre premier client réel.
            Site livré en 9 jours avec système de commande en ligne intégré. C'est le type de projet sur lequel
            nous nous spécialisons : rapide, concret, rentable pour le client.
          </p>
          <p className="text-foreground/50 dark:text-white/50 text-sm">
            Les autres réalisations présentées sur ce site sont des démonstrations de nos capacités,
            réalisées par Stackup Agency pour illustrer nos offres. Elles ne représentent pas de vrais clients.
          </p>
        </section>

        {/* Contact */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric text-center">
          <h3 className="text-white font-bold text-xl mb-2">On discute de votre projet ?</h3>
          <p className="text-white/70 mb-4">Premier rendez-vous gratuit, devis sous 72h, sans engagement.</p>
          <Link href="/#contact" className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5">
            Prendre contact →
          </Link>
        </div>
      </div>
    </div>
  )
}
