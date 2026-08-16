/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { SITE } from '@/config/site'
import MiniHero from '@/components/ui/MiniHero'

export const metadata = {
  title: 'À propos — Notre agence web à Tours',
  description: `Stackup Agency, agence web à Tours (37), crée des sites internet sur mesure pour TPE et artisans. Fondateur accessible, livraison en 10 jours ouvrés, prix fixes.`,
  alternates: { canonical: `${SITE.url}/a-propos` },
  openGraph: {
    url: `${SITE.url}/a-propos`,
    title: 'À propos — Stackup Agency',
    description: 'Agence web à Tours spécialisée dans la création de sites internet pour TPE et artisans.',
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

  const METHODE = [
    { n: '01', titre: 'Écoute', desc: 'Un entretien de 30 minutes pour comprendre vos objectifs, vos clients et vos contraintes.' },
    { n: '02', titre: 'Proposition', desc: 'Un devis clair, un délai précis, une liste de livrables. Pas de surprise.' },
    { n: '03', titre: 'Design', desc: 'Maquette validée par vos soins avant une seule ligne de code.' },
    { n: '04', titre: 'Développement', desc: 'Next.js, TypeScript, Tailwind. Code propre, performant, votre propriété.' },
    { n: '05', titre: 'Livraison', desc: 'Mise en ligne, formation à l\'administration, transfert complet des accès.' },
  ]

  return (
    <div className="min-h-screen bg-background dark:bg-[#0A0F1C]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <MiniHero
        title="L'agence qui rend le digital de qualité accessible."
        subtitle="Stackup Agency est née d'un constat simple : les indépendants, commerçants et TPE méritent le même niveau d'exigence digitale que les grandes entreprises — sans les tarifs des grandes agences."
        breadcrumb={[{ name: 'À propos' }]}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-16">

        {/* Corps principal */}
        <section className="space-y-5 text-foreground/80 dark:text-white/80 text-lg leading-relaxed">
          <p>
            Nous avons choisi une autre voie : une structure légère, des processus précis,
            une stack moderne (Next.js, TypeScript), et des centaines d'heures investies
            dans la méthode plutôt que dans les bureaux. Résultat : des sites et des applications
            sur mesure, livrés en 10 jours ouvrés, à des prix qu'aucune agence classique
            ne peut proposer à qualité égale.
          </p>
          <p>
            Notre conviction : les meilleurs clients ne cherchent pas le moins cher — ils cherchent
            le meilleur rapport qualité, vision, exécution. C'est exactement ce que nous construisons,
            projet après projet.
          </p>
          <p className="text-xl font-semibold text-foreground dark:text-white">
            Votre vision. Notre code.
          </p>
        </section>

        {/* Méthode */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-8">Notre méthode en 5 étapes</h2>
          <div className="space-y-4">
            {METHODE.map((step, i) => (
              <div key={step.n} className={`reveal-item step-line flex items-start gap-5 p-5 rounded-2xl border border-navy/10 dark:border-white/10 bg-white dark:bg-white/2 hover:border-electric/30 transition-colors duration-200`}
                style={{ animationDelay: `${i * 80}ms` }}>
                <div className="step-circle w-10 h-10 flex-shrink-0 text-sm font-bold flex items-center justify-center">
                  {step.n}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground dark:text-white mb-1">{step.titre}</h3>
                  <p className="text-foreground/60 dark:text-white/60 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technologies */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">Technologies</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: 'Next.js', desc: 'Performance, SEO natif, déploiement edge', icon: '⚡' },
              { label: 'TypeScript', desc: 'Fiabilité, maintenabilité, zéro bug silencieux', icon: '🛡️' },
              { label: 'Tailwind CSS', desc: 'Interfaces précises, cohérentes, rapides', icon: '🎨' },
              { label: 'PostgreSQL / Prisma', desc: 'Bases de données robustes pour applications métier', icon: '🗄️' },
            ].map((tech, i) => (
              <div key={tech.label} className="reveal-item p-4 rounded-xl border border-navy/10 dark:border-white/10 bg-white dark:bg-white/3 hover:border-electric/30 hover:-translate-y-0.5 transition-all duration-200 group"
                style={{ animationDelay: `${i * 60}ms` }}>
                <div className="text-xl mb-2">{tech.icon}</div>
                <div className="font-semibold text-foreground dark:text-white text-sm mb-1 group-hover:text-electric transition-colors">{tech.label}</div>
                <div className="text-foreground/70 dark:text-white/50 text-xs">{tech.desc}</div>
              </div>
            ))}
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
            ].map((item, i) => (
              <div key={item} className="reveal-item flex items-start gap-3" style={{ animationDelay: `${i * 50}ms` }}>
                <CheckCircle size={18} className="text-success mt-0.5 flex-shrink-0" />
                <span className="text-foreground/80 dark:text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Cadre contractuel */}
        <section className="rounded-2xl p-6 bg-gradient-to-br from-navy/20 to-blue-950/20 border border-white/10">
          <h2 className="text-xl font-bold text-foreground dark:text-white mb-3">Cadre contractuel</h2>
          <p className="text-foreground/70 dark:text-white/70 mb-4">
            Devis, contrat de prestation, CGV, mentions légales et tous les documents officiels
            sont disponibles en téléchargement.
          </p>
          <Link href="/ressources/documents" className="inline-flex items-center gap-2 text-electric text-sm font-medium hover:text-electric/80 transition-colors">
            Consulter les documents officiels →
          </Link>
        </section>

        {/* Jugez sur pièce */}
        <section className="rounded-2xl p-6 bg-gradient-to-br from-navy/20 to-blue-950/20 border border-white/10">
          <h2 className="text-xl font-bold text-foreground dark:text-white mb-3">Jugez sur pièce</h2>
          <p className="text-foreground/70 dark:text-white/70 mb-4">
            Toutes nos démonstrations sont des projets complets, construits par nos soins et consultables en ligne.
            Ce que vous voyez est exactement ce que nous livrons.
          </p>
          <Link href="/realisations" className="inline-flex items-center gap-2 text-electric text-sm font-medium hover:text-electric/80 transition-colors">
            Explorer nos démonstrations →
          </Link>
        </section>

        {/* CTA */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric text-center">
          <h3 className="text-white font-bold text-xl mb-2">Votre vision. Notre code.</h3>
          <p className="text-white/70 mb-4">Premier rendez-vous gratuit, devis sous 72h, sans engagement.</p>
          <Link href="/contact" className="inline-block px-6 py-3 bg-gold hover:bg-gold/80 text-ink font-semibold rounded-xl transition-all hover:-translate-y-0.5">
            Démarrer mon projet →
          </Link>
        </div>

        {/* Signature */}
        <p className="text-center text-foreground/60 dark:text-white/60 text-sm">{SITE.signature}</p>
      </div>
    </div>
  )
}
