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
        <section id="services" className="py-24 dark:bg-[#070B16] bg-background relative overflow-hidden scanline-section">
          {/* XXL decorative number */}
          <span className="section-number select-none" aria-hidden="true">01</span>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
            <div className="mb-12 max-w-2xl">
              <div className="section-marker mb-2 reveal-item" aria-hidden="true">[ 01 / SERVICES ]</div>
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
            <div className="section-marker mb-2 reveal-item" aria-hidden="true">[ 02 / POURQUOI ]</div>
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
        <section className="py-16 bg-[#070B16] scanline-section">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="reveal-item relative rounded-2xl p-8 text-center overflow-hidden glass-panel liseré-border hud-4corners">
              {/* Background halo */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <div className="w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(45,125,210,0.10) 0%, transparent 70%)' }} />
              </div>
              <div className="relative">
                <h3 className="font-bold text-white text-xl mb-3">Jugez sur pièce</h3>
                <p className="text-white/60 mb-6 max-w-md mx-auto">
                  Nos démonstrations sont des projets complets, construits par nos soins et consultables en ligne.
                  Ce que vous voyez est exactement ce que nous livrons.
                </p>
                <Link href="/realisations" className="btn-magnetic cta-glow inline-flex items-center gap-2 px-6 py-3 bg-navy hover:bg-electric text-white font-semibold rounded-xl text-sm transition-all hover:-translate-y-0.5">
                  Explorer nos démonstrations <span className="arrow-slide">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true" />

        {/* ── 04 — Blog ─────────────────────────────────────────────────────── */}
        <section id="blog" className="py-24 bg-[#060D1A] scanline-section relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="section-marker mb-2" aria-hidden="true">[ 04 / BLOG ]</div>
                <p className="overline-label !text-electric mb-3">Blog</p>
                <h2 className="text-3xl lg:text-5xl font-bold text-white reveal-item">Du concret sur le blog</h2>
              </div>
              <Link href="/blog" className="hidden sm:flex items-center gap-1 text-electric hover:text-electric/80 font-medium text-sm transition-colors">
                Tous les articles <ArrowRight size={14} />
              </Link>
            </div>
            {/* Asymmetric: 1 large card + 2 small */}
            <div className="grid sm:grid-cols-5 gap-4">
              <Link href="/blog/creation-site-internet-prix"
                className="reveal-item group relative sm:col-span-3 p-7 rounded-2xl glass-panel hud-4corners hover:border-electric/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{ animationDelay: '0ms' }}>
                <div className="text-xs text-electric font-bold uppercase tracking-widest mb-3 data-mono">Tarifs</div>
                <h3 className="font-bold text-white text-xl transition-colors leading-snug mb-4">
                  <span className="blog-title-highlight group-hover:text-electric transition-colors">Combien coûte un site internet en 2026 ?</span>
                </h3>
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
                    className="reveal-item group relative flex-1 p-5 rounded-2xl glass-panel hud-corners hover:border-electric/30 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
                    style={{ animationDelay: `${(i + 1) * 100}ms` }}>
                    <div className="text-xs text-electric font-bold uppercase tracking-widest mb-2 data-mono">{a.cat}</div>
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
        <section className="py-24 bg-[#0C1222] scanline-section relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
            <div className="mb-10">
              <div className="section-marker mb-2" aria-hidden="true">[ 05 / MAINTENANCE ]</div>
              <p className="overline-label !text-electric mb-3">Formules mensuelles</p>
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-3 reveal-item">
                Maintenance & hébergement
              </h2>
              <p className="text-white/60 reveal-item" style={{ animationDelay: '80ms' }}>Après la première année incluse, une formule mensuelle pour que votre site reste rapide, sécurisé et à jour.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { nom: 'Starter', prix: SITE.pricing.maintenanceStarter, delai: '72h ouvrées', inclus: ['Hébergement', 'SSL', 'Sauvegardes hebdo', 'Mises à jour sécurité'], highlight: false },
                { nom: 'Pro', prix: SITE.pricing.maintenancePro, delai: '48h ouvrées', inclus: ['Tout Starter', 'Sauvegardes quotidiennes', '2h modifications/mois', 'Rapport mensuel SEO'], highlight: true },
                { nom: 'Premium', prix: SITE.pricing.maintenancePremium, delai: '24h ouvrées', inclus: ['Tout Pro', '5h modifications/mois', 'Rapport mensuel SEO', 'Réponse prioritaire'], highlight: false },
              ].map((f, i) => (
                <div key={f.nom}
                  className={`maintenance-card reveal-item relative rounded-2xl p-5 glass-panel ${f.highlight ? 'highlight liseré-border liseré-permanent hud-corners' : 'hud-4corners'}`}
                  style={{ animationDelay: `${i * 80}ms` }}>
                  {f.highlight && <div className="text-xs font-semibold text-electric-ink dark:text-electric mb-2 uppercase tracking-wide data-mono">★ Le plus populaire</div>}
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className={`text-2xl font-bold data-mono ${f.highlight ? 'text-electric-ink dark:text-electric' : 'text-navy dark:text-gold'}`}>{f.prix}€</span>
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
        <section className="py-28 bg-[#070B16] relative overflow-hidden">
          {/* Star field — positions déterministes pour éviter l'hydration mismatch */}
          <div className="star-field" aria-hidden="true">
            {[
              [8,12,3.1,0.5],[17,67,2.8,1.2],[23,34,4.2,0.0],[31,89,3.7,2.1],[42,21,2.5,1.8],
              [51,55,3.9,0.3],[63,78,2.2,2.5],[72,43,4.8,0.8],[81,11,3.3,1.5],[91,66,2.7,0.1],
              [6,82,4.1,2.8],[15,47,3.5,0.6],[26,93,2.9,1.9],[35,28,4.5,0.9],[47,71,3.2,2.3],
              [56,16,2.6,1.1],[68,60,4.0,0.4],[76,85,3.8,2.0],[86,37,2.4,1.6],[95,52,4.6,0.7],
              [4,29,3.0,2.9],[19,74,2.3,0.2],[29,48,4.3,1.4],[39,91,3.6,2.6],[49,13,2.8,0.0],
              [59,57,4.7,1.7],[69,32,3.1,2.4],[79,77,2.5,0.5],[88,22,4.4,1.3],[97,68,3.9,2.2],
            ].map(([left, top, dur, delay], i) => (
              <div key={i} className="star" style={{
                left: `${left}%`,
                top: `${top}%`,
                '--dur': `${dur}s`,
                '--delay': `${delay}s`,
              } as React.CSSProperties} />
            ))}
          </div>
          {/* Halo animé */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="halo-breathe w-[600px] h-[600px] rounded-full"
              style={{
                background: 'radial-gradient(ellipse, rgba(45,125,210,0.15) 0%, rgba(245,158,11,0.05) 40%, transparent 70%)',
              }} />
          </div>
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="section-marker mb-3 text-center" aria-hidden="true">[ 06 / DÉMARRONS ]</div>
            <div className="overline-label !text-white/60 mb-4">Démarrons</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Votre site internet vous attend
            </h2>
            <p className="text-white/70 text-lg mb-10">
              Devis gratuit sous 72 h. Premier rendez-vous sans engagement.
              Livraison garantie en {SITE.delais.vitrine}.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-magnetic cta-glow relative overflow-hidden px-8 py-4 bg-gold hover:bg-gold/90 text-ink font-bold rounded-xl shadow-lg shadow-amber-500/30 transition-all hover:-translate-y-0.5">
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
