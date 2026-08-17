/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import MarqueeSeparator from '@/components/home/MarqueeSeparator'
import HomeFaq from '@/components/home/HomeFaq'
import { SITE } from '@/config/site'
import HeroSection from '@/components/home/HeroSection'
import BlocRentreeHome from '@/components/rentree/BlocRentreeHome'
import Atelier from '@/components/home/Atelier'
import PreuvePar3 from '@/components/home/PreuvePar3'
import Showroom from '@/components/home/Showroom'
import LaRoute from '@/components/home/LaRoute'
import StatPills from '@/components/home/StatPills'
import ManifestoSection from '@/components/home/ManifestoSection'
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
        <div className="seam-to-light" aria-hidden="true" />

        <MarqueeSeparator />

        <BlocRentreeHome />

        {/* Section divider */}
        <div className="section-divider" aria-hidden="true" />

        {/* ── 01 — L'Atelier (services vivants) ─────────────────────────── */}
        <Atelier />

        <div className="section-divider" aria-hidden="true" />

        {/* ── 02 — La Preuve par 3 ───────────────────────────────────────────── */}
        <PreuvePar3 />

        {/* ── 03 — Le Showroom ───────────────────────────────────────────────── */}
        <Showroom />

        {/* ── 04 — La Route (process) ────────────────────────────────────────── */}
        <LaRoute />

        {/* ── Stat pills rebondissantes ──────────────────────────────────────── */}
        <StatPills />

        {/* Jugez sur pièce — mini CTA sur fond ivoire */}
        <section className="py-16 bg-[#FFFDF9]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="reveal-item relative rounded-2xl p-8 text-center overflow-hidden bg-white border border-gray-100 shadow-[0_8px_32px_rgba(30,58,95,0.08)] hud-4corners">
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <div className="w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)' }} />
              </div>
              <div className="relative">
                <h3 className="font-bold text-navy text-xl mb-3">Jugez sur pièce</h3>
                <p className="text-navy/55 mb-6 max-w-md mx-auto">
                  Nos démonstrations sont des projets complets, construits par nos soins et consultables en ligne.
                  Ce que vous voyez est exactement ce que nous livrons.
                </p>
                <Link href="/realisations" className="btn-magnetic inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold/80 text-ink font-semibold rounded-xl text-sm shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-0.5">
                  Explorer nos démonstrations <span className="arrow-slide">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true" />

        {/* ── 04 — Blog ─────────────────────────────────────────────────────── */}
        <section id="blog" className="py-24 bg-white relative overflow-hidden">
          {/* Décor de profondeur */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute top-0 right-0 w-[700px] h-[450px]" style={{ background: 'radial-gradient(ellipse at 80% 10%, rgba(45,125,210,0.18) 0%, transparent 65%)' }} />
            <div className="absolute bottom-0 left-0 w-[500px] h-[350px]" style={{ background: 'radial-gradient(ellipse at 20% 90%, rgba(245,158,11,0.14) 0%, transparent 65%)' }} />
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(30,58,95,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,95,0.045) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="section-marker mb-2" aria-hidden="true">[ 04 / BLOG ]</div>
                <p className="overline-label mb-3">Blog</p>
                <h2 className="text-3xl lg:text-5xl font-bold text-navy reveal-item">Du concret sur le blog</h2>
              </div>
              <Link href="/blog" className="hidden sm:flex items-center gap-2 text-electric-ink hover:text-navy font-medium text-sm transition-colors group">
                Tous les articles <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            {/* Asymmetric magazine: 1 large + 2 small */}
            <div className="grid sm:grid-cols-5 gap-5">
              {/* Grande carte magazine */}
              <Link href="/blog/creation-site-internet-prix"
                className="reveal-item group relative sm:col-span-3 rounded-2xl bg-white border border-gray-100 overflow-hidden hover:border-gold/30 hover:shadow-[0_24px_60px_rgba(30,58,95,0.12)] transition-all duration-300 hover:-translate-y-1.5"
                style={{ animationDelay: '0ms' }}>
                {/* Image éditoriale SVG */}
                <div className="relative h-44 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #2D7DD2 60%, #F59E0B 100%)' }}>
                  <div className="absolute inset-0 flex items-center justify-center gap-4 px-6">
                    {/* Mini-illustration : prix comparés */}
                    <div className="space-y-2 flex-1">
                      {[['Agence','6000€','bg-gray-300/40'],['Stackup','490€','bg-gold']].map(([l,p,c]) => (
                        <div key={l} className="flex items-center gap-2">
                          <div className="text-[9px] text-white/70 w-12">{l}</div>
                          <div className={`h-4 rounded-sm ${c} flex items-center px-1.5`} style={{ width: l === 'Agence' ? '80%' : '18%' }}>
                            <span className="text-[8px] font-bold text-white">{p}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-4xl font-black text-white/20 select-none">€</div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] font-bold bg-gold text-ink px-2 py-0.5 rounded-full uppercase tracking-wider">Tarifs</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/10 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="text-xs text-gold font-bold uppercase tracking-widest mb-2 data-mono flex items-center gap-2">
                    Tarifs · 5 min de lecture
                  </div>
                  <h3 className="font-bold text-navy text-xl transition-colors leading-snug mb-4 group-hover:text-electric">
                    Combien coûte un site internet en 2026 ?
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-navy/60 group-hover:text-gold transition-colors flex items-center gap-1">
                      Lire l&apos;article <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </div>
                {/* Top border accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <div className="sm:col-span-2 flex flex-col gap-5">
                {[
                  { href: '/blog/vitesse-site-web-core-web-vitals', titre: 'Core Web Vitals : guide pratique pour les TPE', cat: 'Technique', color: '#2D7DD2', bg: 'linear-gradient(135deg, #2D7DD2, #1E3A5F)', emoji: '⚡', read: '4 min' },
                  { href: '/blog/seo-local-google-business', titre: 'SEO local : apparaître en tête sur Google Maps', cat: 'SEO', color: '#059669', bg: 'linear-gradient(135deg, #059669, #047857)', emoji: '📍', read: '6 min' },
                ].map((a, i) => (
                  <Link key={a.href} href={a.href}
                    className="reveal-item group relative flex-1 rounded-2xl bg-white border border-gray-100 overflow-hidden hover:border-electric/30 hover:shadow-[0_16px_40px_rgba(30,58,95,0.10)] transition-all duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${(i + 1) * 100}ms` }}>
                    {/* Image éditoriale */}
                    <div className="h-24 relative flex items-center justify-center overflow-hidden" style={{ background: a.bg }}>
                      <span className="text-3xl opacity-60">{a.emoji}</span>
                      <div className="absolute top-2 left-3">
                        <span className="text-[8px] font-bold bg-white/20 text-white backdrop-blur-sm px-2 py-0.5 rounded-full uppercase tracking-wider border border-white/20">{a.cat}</span>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/10 to-transparent" />
                    </div>
                    <div className="p-4">
                      <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5 data-mono" style={{ color: a.color }}>{a.cat} · {a.read}</div>
                      <h3 className="font-semibold text-navy group-hover:text-electric transition-colors text-sm leading-snug mb-2">{a.titre}</h3>
                      <span className="text-xs text-navy/60 group-hover:text-electric transition-colors flex items-center gap-1">
                        Lire <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                      </span>
                    </div>
                    <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, ${a.color}, ${a.color}50)` }} />
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/blog" className="sm:hidden mt-6 inline-flex items-center gap-1 text-electric-ink hover:text-navy font-medium text-sm transition-colors">
              Tous les articles <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true" />

        {/* ── 05 — Maintenance ──────────────────────────────────────────────── */}
        <section className="py-24 bg-[#FFFDF9] relative overflow-hidden">
          {/* Halo or doux */}
          <div className="pointer-events-none absolute top-0 left-0 w-[600px] h-[400px]" aria-hidden="true"
            style={{ background: 'radial-gradient(ellipse at 20% 10%, rgba(245,158,11,0.16) 0%, transparent 65%)' }} />
          <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[300px]" aria-hidden="true"
            style={{ background: 'radial-gradient(ellipse at 80% 90%, rgba(45,125,210,0.12) 0%, transparent 65%)' }} />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
            <div className="mb-10">
              <div className="section-marker mb-2" aria-hidden="true">[ 05 / MAINTENANCE ]</div>
              <p className="overline-label mb-3">Formules mensuelles</p>
              <h2 className="text-3xl lg:text-5xl font-bold text-navy mb-3 reveal-item">
                Maintenance & hébergement
              </h2>
              <p className="text-navy/55 reveal-item" style={{ animationDelay: '80ms' }}>Après la première année incluse, une formule mensuelle pour que votre site reste rapide, sécurisé et à jour.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { nom: 'Starter', prix: SITE.pricing.maintenanceStarter, delai: '72h ouvrées', inclus: ['Hébergement', 'SSL', 'Sauvegardes hebdo', 'Mises à jour sécurité'], highlight: false },
                { nom: 'Pro', prix: SITE.pricing.maintenancePro, delai: '48h ouvrées', inclus: ['Tout Starter', 'Sauvegardes quotidiennes', '2h modifications/mois', 'Rapport mensuel SEO'], highlight: true },
                { nom: 'Premium', prix: SITE.pricing.maintenancePremium, delai: '24h ouvrées', inclus: ['Tout Pro', '5h modifications/mois', 'Rapport mensuel SEO', 'Réponse prioritaire'], highlight: false },
              ].map((f, i) => (
                <div key={f.nom}
                  className={`maintenance-card reveal-item relative rounded-2xl p-5 ${f.highlight
                    ? 'bg-navy text-white liseré-border hud-corners shadow-[0_24px_60px_rgba(30,58,95,0.20)]'
                    : 'bg-white border border-gray-100 hover:border-navy/20 hover:shadow-[0_12px_40px_rgba(30,58,95,0.10)] hover:-translate-y-1 hud-4corners'} transition-all duration-300`}
                  style={{ animationDelay: `${i * 80}ms` }}>
                  {f.highlight && <div className="text-xs font-semibold text-gold mb-2 uppercase tracking-wide data-mono">★ Le plus populaire</div>}
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className={`text-2xl font-bold data-mono ${f.highlight ? 'text-gold' : 'text-navy'}`}>{f.prix}€</span>
                    <span className={`text-sm ${f.highlight ? 'text-white/60' : 'text-navy/50'}`}>/mois</span>
                  </div>
                  <div className={`font-semibold mb-1 ${f.highlight ? 'text-white' : 'text-navy'}`}>{f.nom}</div>
                  <div className={`text-xs mb-4 ${f.highlight ? 'text-gold/80' : 'text-electric-ink'}`}>Réponse {f.delai}</div>
                  <ul className="space-y-1.5">
                    {f.inclus.map(item => (
                      <li key={item} className={`flex items-center gap-2 text-sm ${f.highlight ? 'text-white/70' : 'text-navy/60'}`}>
                        <CheckCircle size={12} className={`flex-shrink-0 ${f.highlight ? 'text-gold' : 'text-electric'}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/tarifs" className="inline-flex items-center gap-2 text-electric-ink hover:text-navy font-medium text-sm transition-colors">
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
