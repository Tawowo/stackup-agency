/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { SITE } from '@/config/site'
import MiniHero from '@/components/ui/MiniHero'
import DecorProfondeur from '@/components/ui/DecorProfondeur'

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

  const TIMELINE = [
    { year: '2018', label: 'Premiers projets web', desc: 'Sites vitrines pour commerçants locaux. L\'envie de bien faire naît là.' },
    { year: '2020', label: 'Freelance full-time', desc: 'Transition vers le développement professionnel. Next.js, TypeScript, design system.' },
    { year: '2022', label: 'Naissance de Stackup', desc: 'Structuration de la méthode : 10 jours, prix fixes, code propre.' },
    { year: '2024', label: 'Expansion services', desc: 'Ajout e-commerce, systèmes de gestion, marketing digital.' },
    { year: '2026', label: 'Aujourd\'hui', desc: 'Des dizaines de clients satisfaits. Le même engagement qualité.' },
  ]

  return (
    <div className="min-h-screen bg-[#FFFDF9] relative overflow-hidden">
      <DecorProfondeur variant="mixte" seed={0} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />

      <MiniHero
        title="L'agence qui rend le digital accessible."
        subtitle="Stackup Agency est née d'un constat simple : les indépendants méritent le même niveau d'exigence digitale que les grandes entreprises — sans les tarifs des grandes agences."
        breadcrumb={[{ name: 'À propos' }]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">

        {/* Portrait + intro */}
        <section className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Portrait */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0">
              {/* Fallback gradient si image absente */}
              <div className="absolute inset-0 bg-gradient-to-br from-navy via-electric to-gold opacity-20 rounded-3xl" />
              <Image
                src="/images/portrait-fondateur.webp"
                alt="Fondateur de Stackup Agency"
                fill
                className="object-cover rounded-3xl"
                priority
              />
              {/* Overlay subtle */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent rounded-3xl" />
              {/* Badge */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <div>
                    <div className="font-bold text-navy text-sm">Fondateur</div>
                    <div className="text-navy/55 text-xs">Tours (37) · Disponible</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Halo décoratif */}
            <div className="pointer-events-none absolute -top-8 -left-8 w-48 h-48 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)' }} />
          </div>

          {/* Texte intro */}
          <div>
            <p className="text-[13px] font-semibold text-gold uppercase tracking-[0.18em] mb-4">Notre raison d&apos;être</p>
            <h2 className="text-3xl font-bold text-navy mb-6" style={{ lineHeight: 1.2 }}>
              Des sites d&apos;exception,<br />accessibles à tous.
            </h2>
            <div className="space-y-4 text-navy/65 leading-relaxed text-[15px]">
              <p>
                Stackup Agency est née d&apos;un constat simple : les indépendants et les petites entreprises méritent le même niveau de site web que les grands groupes — mais les tarifs des agences classiques les en excluent presque toujours.
              </p>
              <p>
                Nous avons donc construit l&apos;agence autrement : des prix pensés pour les auto-entrepreneurs, les artisans, les commerçants et toutes les structures qui n&apos;ont pas les moyens d&apos;une multinationale. Sans jamais toucher à la qualité — le prix bas n&apos;est pas une concession, c&apos;est le projet.
              </p>
              <p>
                Parce qu&apos;entre petites entreprises, on se doit ce soutien-là. Certaines n&apos;existeraient plus sans un site qui travaille pour elles. Et ce qui est un droit d&apos;accès pour les petites structures devient, pour les plus grandes, un avantage économique évident.
              </p>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 mt-6 bg-gold hover:bg-gold/90 text-ink font-bold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 shadow-md shadow-gold/20">
              Démarrer mon projet <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Timeline narrative */}
        <section className="mb-20">
          <p className="text-[13px] font-semibold text-gold uppercase tracking-[0.18em] mb-4">Notre parcours</p>
          <h2 className="text-2xl font-bold text-navy mb-10">Notre parcours</h2>
          <div className="relative">
            {/* Ligne centrale */}
            <div className="absolute left-[60px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-gold via-electric to-navy hidden sm:block" aria-hidden="true" />
            <div className="space-y-6">
              {TIMELINE.map((t, i) => (
                <div key={t.year} className="reveal-item flex items-start gap-6" style={{ animationDelay: `${i * 80}ms` }}>
                  {/* Année */}
                  <div className="flex-shrink-0 w-[60px] text-right hidden sm:block">
                    <span className="text-xs font-black text-navy/50 data-mono">{t.year}</span>
                  </div>
                  {/* Dot */}
                  <div className="hidden sm:flex flex-shrink-0 w-4 h-4 rounded-full border-2 border-gold bg-white mt-0.5 relative z-10" />
                  {/* Card */}
                  <div className="flex-1 bg-white border border-gray-100 rounded-xl p-4 hover:border-gold/30 hover:shadow-[0_4px_24px_rgba(30,58,95,0.08)] transition-all duration-200">
                    <div className="sm:hidden text-xs font-black text-navy/30 data-mono mb-1">{t.year}</div>
                    <div className="font-bold text-navy text-sm mb-1">{t.label}</div>
                    <div className="text-navy/55 text-sm">{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ce en quoi nous croyons */}
        <section className="mb-20">
          <p className="text-[13px] font-semibold text-gold uppercase tracking-[0.18em] mb-4">Nos engagements</p>
          <h2 className="text-2xl font-bold text-navy mb-8">Ce en quoi nous croyons</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Les prix doivent être affichés clairement, sans mauvaise surprise',
              'Un site livré en 10 jours vaut mieux qu\'un projet qui traîne 6 mois',
              'Le code propre et performant, c\'est un respect pour l\'utilisateur et pour Google',
              'La maintenance et l\'hébergement font partie du service, pas une option cachée',
              'Votre site vous appartient — export et accès complets garantis',
              'Pas de clients fictifs, pas de témoignages inventés : uniquement ce que nous avons réellement fait',
            ].map((item, i) => (
              <div key={item} className="reveal-item flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-gold/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200" style={{ animationDelay: `${i * 50}ms` }}>
                <CheckCircle size={16} className="text-gold mt-0.5 flex-shrink-0" />
                <span className="text-navy/70 text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Technologies */}
        <section className="mb-20">
          <p className="text-[13px] font-semibold text-gold uppercase tracking-[0.18em] mb-4">Stack technique</p>
          <h2 className="text-2xl font-bold text-navy mb-6">Technologies</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: 'Next.js', desc: 'Performance, SEO natif, déploiement edge' },
              { label: 'TypeScript', desc: 'Fiabilité, maintenabilité, zéro bug silencieux' },
              { label: 'Tailwind CSS', desc: 'Interfaces précises, cohérentes, rapides' },
              { label: 'PostgreSQL / Prisma', desc: 'Bases de données robustes pour applications métier' },
            ].map((tech, i) => (
              <div key={tech.label} className="reveal-item p-4 rounded-xl bg-white border border-gray-100 hover:border-electric/30 hover:-translate-y-0.5 transition-all duration-200 group"
                style={{ animationDelay: `${i * 60}ms` }}>
                <div className="font-bold text-navy text-sm mb-1 group-hover:text-electric transition-colors data-mono">{tech.label}</div>
                <div className="text-navy/50 text-xs">{tech.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl p-8 bg-gradient-to-br from-navy to-electric/90 text-center">
          <h3 className="text-white font-bold text-xl mb-2">Votre vision. Notre code.</h3>
          <p className="text-white/70 mb-6">Premier rendez-vous gratuit, devis sous 72h, sans engagement.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold/80 text-ink font-semibold rounded-xl transition-all hover:-translate-y-0.5">
            Démarrer mon projet <ArrowRight size={16} />
          </Link>
        </div>

        <p className="text-center text-navy/55 text-sm mt-10">{SITE.signature}</p>
      </div>
    </div>
  )
}
