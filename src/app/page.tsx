/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import MarqueeSeparator from '@/components/home/MarqueeSeparator'
import HomeFaq from '@/components/home/HomeFaq'
import { SITE } from '@/config/site'
import HeroSection from '@/components/home/HeroSection'
import Atelier from '@/components/home/Atelier'
import PreuvePar3 from '@/components/home/PreuvePar3'
import Showroom from '@/components/home/Showroom'
import LaRoute from '@/components/home/LaRoute'
import StatPills from '@/components/home/StatPills'
import RaisonDetre from '@/components/home/RaisonDetre'
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

        {/* 01 — Hero */}
        <HeroSection />
        <div className="seam-to-light" aria-hidden="true" />
        <MarqueeSeparator />
        <div className="section-divider" aria-hidden="true" />

        {/* 02 — L'Atelier — Nos services web */}
        <Atelier />
        <div className="section-divider" aria-hidden="true" />

        {/* 03 — Pourquoi Stackup Agency */}
        <PreuvePar3 />
        <div className="section-divider" aria-hidden="true" />

        {/* 04 — Notre raison d'être */}
        <RaisonDetre />
        <div className="section-divider" aria-hidden="true" />

        {/* 05 — Comment ça se passe — La Méthode */}
        <LaRoute />

        {/* 06 — Nos réalisations — Showroom */}
        <Showroom />

        {/* 07 — Chiffres clés */}
        <StatPills />
        <div className="section-divider" aria-hidden="true" />

        {/* 08 — FAQ */}
        <HomeFaq />
        <div className="section-divider" aria-hidden="true" />

        {/* 09 — CTA final */}
        <section className="py-28 bg-[#070B16] relative overflow-hidden">
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
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="halo-breathe w-[600px] h-[600px] rounded-full"
              style={{ background: 'radial-gradient(ellipse, rgba(45,125,210,0.15) 0%, rgba(245,158,11,0.05) 40%, transparent 70%)' }} />
          </div>
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-[13px] font-semibold text-gold/70 uppercase tracking-[0.18em] mb-4">Démarrons</p>
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
