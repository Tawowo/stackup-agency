/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Clock, Zap, Shield } from 'lucide-react'
import MarqueeSeparator from '@/components/home/MarqueeSeparator'
import HomeFaq from '@/components/home/HomeFaq'
import { SITE } from '@/config/site'
import HeroSection from '@/components/home/HeroSection'
import BlocRentreeHome from '@/components/rentree/BlocRentreeHome'
import ServiceCards from '@/components/home/ServiceCards'
import ProcessSection from '@/components/home/ProcessSection'
import ManifestoSection from '@/components/home/ManifestoSection'
import PinnedGallery from '@/components/home/PinnedGallery'
import ScrollBackground from '@/components/home/ScrollBackground'

export const metadata: Metadata = {
  title: "Agence web Tours — Site internet en 10 jours",
  description: `Stackup Agency crée votre site internet en ${SITE.delais.vitrine} à partir de ${SITE.pricing.vitrine}€. Site vitrine, e-commerce, système de gestion sur mesure. Devis gratuit sous 72h.`,
  alternates: { canonical: SITE.url },
  openGraph: {
    url: SITE.url,
    title: "Agence web Tours — Site internet livré en 10 jours dès 449€",
    description: `Stackup Agency crée votre site internet en ${SITE.delais.vitrine} à partir de ${SITE.pricing.vitrine}€.`,
    type: 'website',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE.url}/blog?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  description: `Agence web basée à Tours. Création de sites internet professionnels pour TPE et artisans, livrés en ${SITE.delais.vitrine} à partir de ${SITE.pricing.vitrine}€.`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.departmentCode,
    addressCountry: SITE.address.country,
  },
  priceRange: `À partir de ${SITE.pricing.vitrine}€`,
  areaServed: { '@type': 'Country', name: 'France' },
  sameAs: [SITE.social.linkedin, SITE.social.instagram, SITE.social.facebook],
}




export default function Home() {

  return (
    <>
      <ScrollBackground />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <main className="page-transition">

        <HeroSection />

        {/* Couture hero → light */}
        <div className="seam-to-light dark:hidden" aria-hidden="true" />

        <MarqueeSeparator />

        <BlocRentreeHome />

        {/* Section divider */}
        <div className="section-divider" aria-hidden="true" />

        {/* ── 01 — Services ─────────────────────────────────────────────────── */}
        <section id="services" className="py-24 bg-background dark:bg-[#0A0F1C] relative overflow-hidden">
          {/* XXL decorative number */}
          <span className="section-number select-none" aria-hidden="true">01</span>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
            <div className="mb-12 max-w-2xl">
              <div className="text-xs font-bold text-electric uppercase tracking-[0.2em] mb-3 reveal-item">Services web</div>
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground dark:text-white mb-4 reveal-item heading-underline-animated in-view" style={{ lineHeight: 1.15 }}>
                Nos services web
              </h2>
              <p className="text-foreground/60 dark:text-white/60 max-w-xl reveal-item" style={{ animationDelay: '80ms' }}>
                Du site vitrine à l'application sur mesure — une solution adaptée à chaque budget et chaque activité.
              </p>
            </div>
            <ServiceCards />
            <Link href="/services" className="inline-flex items-center gap-2 text-electric-ink dark:text-electric hover:text-navy dark:hover:text-electric font-medium transition-colors mt-8">
              Voir tous nos services <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true" />

        {/* ── 02 — Pourquoi Stackup ──────────────────────────────────────────── */}
        <section className="py-24 bg-[#060D1A] relative overflow-hidden">
          <span className="section-number !text-white/[0.04]" aria-hidden="true">02</span>
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 rounded-full"
            aria-hidden="true"
            style={{ background: 'radial-gradient(ellipse, rgba(45,125,210,0.08) 0%, transparent 70%)' }} />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-xs font-bold text-electric uppercase tracking-[0.2em] mb-3 reveal-item">Pourquoi nous</div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-16 reveal-item" style={{ lineHeight: 1.15 }}>
              Pourquoi Stackup Agency ?
            </h2>
            {/* Asymmetric 3-column layout: large left card + 2 stacked right */}
            <div className="grid lg:grid-cols-5 gap-4">
              {/* Large left card */}
              <div className="reveal-item stat-card lg:col-span-2 group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-electric/30 hover:bg-white/8 transition-all duration-300 hover:-translate-y-1 shadow-lift-sm overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl bg-gradient-to-r from-electric to-electric/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="text-5xl font-black text-electric mb-4 tabular-nums" style={{ lineHeight: 1 }}>3–5×</div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center mb-5">
                  <Zap size={20} className="text-electric" />
                </div>
                <h3 className="font-bold text-white text-lg mb-3">Le prix d'un indépendant</h3>
                <p className="text-white/55 text-sm leading-relaxed">Des tarifs 3 à 5 fois inférieurs aux agences classiques, à périmètre égal. Pas de bureaux à amortir, pas de couches commerciales : vous payez le travail, pas la structure.</p>
              </div>
              {/* Right: 2 stacked */}
              <div className="lg:col-span-3 grid sm:grid-rows-2 gap-4">
                <div className="reveal-item stat-card group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 hover:bg-white/8 transition-all duration-300 hover:-translate-y-1 shadow-lift-sm overflow-hidden"
                  style={{ animationDelay: '120ms' }}>
                  <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl bg-gradient-to-r from-gold to-gold/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/20 flex items-center justify-center flex-shrink-0">
                      <Shield size={20} className="text-gold" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">La qualité d'une grande agence</h3>
                      <p className="text-white/55 text-sm leading-relaxed">Code sur mesure en Next.js et TypeScript, performance et SEO intégrés dès la conception. Jugez sur pièce : toutes nos démonstrations sont en ligne.</p>
                    </div>
                  </div>
                </div>
                <div className="reveal-item stat-card group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/8 transition-all duration-300 hover:-translate-y-1 shadow-lift-sm overflow-hidden"
                  style={{ animationDelay: '240ms' }}>
                  <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl bg-gradient-to-r from-electric/80 to-navy opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Clock size={20} className="text-electric" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">Une rapidité assumée</h3>
                      <p className="text-white/55 text-sm leading-relaxed">Votre site vitrine en ligne en 10 jours ouvrés, contractuellement. Chaque étape est cadrée, chaque délai est écrit.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PinnedGallery />

        <ProcessSection />

        {/* Jugez sur pièce */}
        <section className="py-16 bg-background dark:bg-[#0A0F1C]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="reveal-item relative rounded-2xl p-8 border border-white/10 text-center overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(30,58,95,0.4), rgba(45,125,210,0.15), rgba(11,26,46,0.5))' }}>
              {/* Background halo */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <div className="w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(45,125,210,0.12) 0%, transparent 70%)' }} />
              </div>
              <div className="relative">
                <h3 className="font-bold text-white text-xl mb-3">Jugez sur pièce</h3>
                <p className="text-white/65 mb-6 max-w-md mx-auto">
                  Nos démonstrations sont des projets complets, construits par nos soins et consultables en ligne.
                  Ce que vous voyez est exactement ce que nous livrons.
                </p>
                <Link href="/realisations" className="inline-flex items-center gap-2 px-6 py-3 bg-navy hover:bg-electric text-white font-semibold rounded-xl text-sm transition-all hover:-translate-y-0.5 shadow-lift-sm">
                  Explorer nos démonstrations <span className="arrow-slide">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true" />

        {/* ── 04 — Blog ─────────────────────────────────────────────────────── */}
        <section id="blog" className="py-24 bg-[#060D1A] relative overflow-hidden">
          <span className="section-number !text-white/[0.04]" aria-hidden="true">04</span>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="text-xs font-bold text-electric uppercase tracking-[0.2em] mb-3 reveal-item">Blog</div>
                <h2 className="text-3xl lg:text-5xl font-bold text-white reveal-item">Du concret sur le blog</h2>
              </div>
              <Link href="/blog" className="hidden sm:flex items-center gap-1 text-electric hover:text-electric/80 font-medium text-sm transition-colors">
                Tous les articles <ArrowRight size={14} />
              </Link>
            </div>
            {/* Asymmetric: 1 large card + 2 small */}
            <div className="grid sm:grid-cols-5 gap-4">
              <Link href="/blog/creation-site-internet-prix"
                className="blog-card reveal-item group relative sm:col-span-3 p-7 rounded-2xl bg-white/5 border border-white/10 hover:border-electric/30 hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{ animationDelay: '0ms' }}>
                <div className="text-xs text-electric font-bold uppercase tracking-widest mb-3">Tarifs</div>
                <h3 className="font-bold text-white text-xl group-hover:text-electric transition-colors leading-snug mb-4">Combien coûte un site internet en 2026 ?</h3>
                <span className="text-xs text-white/30 group-hover:text-electric/60 transition-colors flex items-center gap-1">
                  Lire l'article <span className="arrow-slide">→</span>
                </span>
              </Link>
              <div className="sm:col-span-2 flex flex-col gap-4">
                {[
                  { href: '/blog/vitesse-site-web-core-web-vitals', titre: 'Core Web Vitals : guide pratique pour les TPE', cat: 'Technique' },
                  { href: '/blog/seo-local-google-business', titre: 'SEO local : comment apparaître en tête sur Google Maps', cat: 'SEO' },
                ].map((a, i) => (
                  <Link key={a.href} href={a.href}
                    className="blog-card reveal-item group relative flex-1 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-electric/30 hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
                    style={{ animationDelay: `${(i + 1) * 100}ms` }}>
                    <div className="text-xs text-electric font-bold uppercase tracking-widest mb-2">{a.cat}</div>
                    <h3 className="font-semibold text-white group-hover:text-electric/80 transition-colors text-sm leading-snug mb-3">{a.titre}</h3>
                    <span className="text-xs text-white/30 group-hover:text-electric/50 transition-colors flex items-center gap-1">
                      Lire l'article <span className="arrow-slide">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/blog" className="sm:hidden mt-6 inline-flex items-center gap-1 text-electric hover:text-electric/80 font-medium text-sm transition-colors">
              Tous les articles <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true" />

        {/* ── 05 — Maintenance ──────────────────────────────────────────────── */}
        <section className="py-24 bg-background dark:bg-[#0A0F1C] relative overflow-hidden">
          <span className="section-number" aria-hidden="true">05</span>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
            <div className="mb-10">
              <div className="text-xs font-bold text-electric uppercase tracking-[0.2em] mb-3 reveal-item">Formules mensuelles</div>
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground dark:text-white mb-3 reveal-item">
                Maintenance & hébergement
              </h2>
              <p className="text-foreground/60 dark:text-white/60 reveal-item" style={{ animationDelay: '80ms' }}>Après la première année incluse, une formule mensuelle pour que votre site reste rapide, sécurisé et à jour.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { nom: 'Starter', prix: SITE.pricing.maintenanceStarter, delai: '72h ouvrées', inclus: ['Hébergement', 'SSL', 'Sauvegardes hebdo', 'Mises à jour sécurité'], highlight: false },
                { nom: 'Pro', prix: SITE.pricing.maintenancePro, delai: '48h ouvrées', inclus: ['Tout Starter', 'Sauvegardes quotidiennes', '2h modifications/mois', 'Rapport mensuel SEO'], highlight: true },
                { nom: 'Premium', prix: SITE.pricing.maintenancePremium, delai: '24h ouvrées', inclus: ['Tout Pro', '5h modifications/mois', 'Rapport mensuel SEO', 'Réponse prioritaire'], highlight: false },
              ].map((f, i) => (
                <div key={f.nom}
                  className={`maintenance-card reveal-item relative rounded-2xl border p-5 ${f.highlight ? 'highlight border-electric/40 bg-electric/5 shadow-lift' : 'border-navy/20 dark:border-white/10'}`}
                  style={{ animationDelay: `${i * 80}ms` }}>
                  <div className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl ${f.highlight ? 'bg-gradient-to-r from-electric to-electric/40' : 'bg-gradient-to-r from-navy/30 to-electric/20'}`} />
                  {f.highlight && <div className="text-xs font-semibold text-electric-ink dark:text-electric mb-2 uppercase tracking-wide">★ Le plus populaire</div>}
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className={`text-2xl font-bold ${f.highlight ? 'text-electric-ink dark:text-electric' : 'text-navy dark:text-gold'}`}>{f.prix}€</span>
                    <span className="text-sm text-foreground/60 dark:text-white/60">/mois</span>
                  </div>
                  <div className="font-semibold text-foreground dark:text-white mb-1">{f.nom}</div>
                  <div className="text-xs text-electric-ink dark:text-electric mb-4">Réponse {f.delai}</div>
                  <ul className="space-y-1.5">
                    {f.inclus.map(item => (
                      <li key={item} className="flex items-center gap-2 text-sm text-foreground/70 dark:text-white/70">
                        <CheckCircle size={12} className={`flex-shrink-0 ${f.highlight ? 'text-electric' : 'text-success'}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/tarifs" className="inline-flex items-center gap-2 text-electric-ink dark:text-electric font-medium text-sm transition-colors hover:text-navy dark:hover:text-electric/80">
                Voir toutes les formules <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ teaser — animated accordions */}
        <HomeFaq />

        <ManifestoSection />

        <div className="section-divider" aria-hidden="true" />

        {/* ── CTA final ──────────────────────────────────────────────────────── */}
        <section className="py-28 animated-gradient relative overflow-hidden">
          {/* Halo animé */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="w-[600px] h-[600px] rounded-full"
              style={{
                background: 'radial-gradient(ellipse, rgba(45,125,210,0.18) 0%, rgba(245,158,11,0.06) 40%, transparent 70%)',
                animation: 'halo-pulse 4s ease-in-out infinite',
              }} />
            {/* Orbiting particles */}
            <div className="absolute w-0 h-0" style={{ top: '50%', left: '50%' }}>
              <div className="halo-particle" />
              <div className="halo-particle" />
              <div className="halo-particle" />
            </div>
          </div>
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="overline-label !text-white/60 mb-4">Démarrons</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Votre site internet vous attend
            </h2>
            <p className="text-white/70 text-lg mb-10">
              Devis gratuit sous 72 h. Premier rendez-vous sans engagement.
              Livraison garantie en {SITE.delais.vitrine}.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="relative overflow-hidden px-8 py-4 bg-gold hover:bg-gold/90 text-ink font-bold rounded-xl shadow-lg shadow-amber-500/30 transition-all hover:-translate-y-0.5">
                Démarrer mon projet <span className="arrow-slide ml-1">→</span>
              </Link>
              <Link href="/tarifs" className="px-8 py-4 border border-white/25 text-white hover:bg-white/10 hover:border-white/40 font-semibold rounded-xl transition-all">
                Voir les tarifs
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              {[
                `${SITE.pricing.vitrine} € tout inclus`,
                `Livraison en ${SITE.delais.vitrine}`,
                'Code 100 % propriétaire',
                'Hébergement France',
              ].map(item => (
                <div key={item} className="flex items-center gap-1.5 text-white/60 text-sm">
                  <CheckCircle size={14} className="text-success" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
