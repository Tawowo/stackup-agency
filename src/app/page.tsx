/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Clock, Zap, Shield } from 'lucide-react'
import { SITE } from '@/config/site'
import { realisations } from '@/lib/realisations'
import PageLoader from '@/components/ui/PageLoader'

export const metadata: Metadata = {
  title: "Agence web Tours — Création site internet livré en 10 jours dès 449€ | Stackup Agency",
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

const SERVICES_HOME = [
  { titre: 'Site vitrine', prix: SITE.pricing.vitrine, delai: SITE.delais.vitrine, desc: 'Présence professionnelle en ligne, SEO local, formulaire de contact.', href: '/services/site-vitrine' },
  { titre: 'Site multi-pages', prix: SITE.pricing.multipages, delai: SITE.delais.multipages, desc: 'Site complet avec blog, galerie, pages service et formulaires.', href: '/services/site-multi-pages' },
  { titre: 'Boutique en ligne', prix: SITE.pricing.ecommerce, delai: SITE.delais.ecommerce, desc: 'E-commerce avec paiement sécurisé et gestion des stocks.', href: '/services/site-ecommerce' },
  { titre: 'Système de gestion', prix: SITE.pricing.gestion, delai: '4 semaines', desc: 'Logiciel sur mesure : caisse, RDV, CRM, commandes.', href: '/services/systeme-gestion' },
  { titre: 'Site association', prix: SITE.pricing.association, delai: SITE.delais.association, desc: 'Site association loi 1901 avec adhésion et événements.', href: '/services/site-association' },
  { titre: 'Maintenance', prix: SITE.pricing.maintenanceStarter, delai: '/mois', desc: 'Hébergement, sauvegardes, mises à jour et support continu.', href: '/tarifs' },
]

export default function Home() {
  const realisationsHome = realisations.slice(0, 3)

  return (
    <>
      <PageLoader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <main>

        {/* Hero */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#060D1A] to-[#0A1628]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-3xl" />
            <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-amber-500/10 blur-3xl" />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-20 w-full">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Agence web — Tours, France
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-3xl">
              Le site web qui fait décoller votre activité.
            </h1>
            <p className="text-white/70 text-lg lg:text-xl mb-4 max-w-2xl leading-relaxed">
              Sites vitrines, e-commerce et applications sur mesure — conçus, développés et mis en ligne en 10 jours ouvrés.
            </p>
            <div className="flex flex-wrap gap-4 mb-5">
              <Link href="/contact" className="px-7 py-4 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/30 transition-all hover:-translate-y-0.5">
                Obtenir mon devis gratuit →
              </Link>
              <Link href="/services" className="px-7 py-4 border border-white/20 text-white hover:bg-white/10 font-semibold rounded-xl transition-all">
                Découvrir nos services
              </Link>
            </div>
            <div className="mb-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs">
                À partir de {SITE.pricing.vitrine} € · Devis gratuit sous 72 h
              </span>
            </div>
            {/* Confiance bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { val: '10 jours', label: "de l'idée à la mise en ligne" },
                { val: '100 %', label: 'sur mesure — zéro template' },
                { val: '72 h', label: 'réponse garantie' },
                { val: 'Code livré', label: 'vous êtes propriétaire' },
              ].map(s => (
                <div key={s.label} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xl font-bold text-white mb-0.5">{s.val}</div>
                  <div className="text-xs text-white/50">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-24 bg-background dark:bg-[#0A0F1C]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground dark:text-white mb-4">
                Nos services web
              </h2>
              <p className="text-foreground/60 dark:text-white/60 max-w-xl">
                Du site vitrine à l'application sur mesure — une solution adaptée à chaque budget et chaque activité.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {SERVICES_HOME.map(s => (
                <Link key={s.titre} href={s.href}
                  className="group p-5 rounded-2xl border border-navy/20 dark:border-white/10 hover:border-blue-500/40 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-foreground dark:text-white group-hover:text-blue-400 transition-colors">{s.titre}</h3>
                    <span className="text-amber-500 font-bold text-sm ml-2 flex-shrink-0">{s.prix}€{s.delai === '/mois' ? '/mois' : ''}</span>
                  </div>
                  <p className="text-foreground/60 dark:text-white/60 text-sm mb-3">{s.desc}</p>
                  <span className="text-xs text-blue-400">{s.delai !== '/mois' ? `Livraison : ${s.delai}` : 'Mensuel'}</span>
                </Link>
              ))}
            </div>
            <Link href="/services" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Voir tous nos services <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Pourquoi Stackup */}
        <section className="py-24 bg-[#060D1A]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12">
              Pourquoi Stackup Agency ?
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  Icon: Zap,
                  titre: "Le prix d'un indépendant",
                  desc: "Des tarifs 3 à 5 fois inférieurs aux agences classiques, à périmètre égal. Pas de bureaux à amortir, pas de couches commerciales : vous payez le travail, pas la structure.",
                },
                {
                  Icon: Shield,
                  titre: "La qualité d'une grande agence",
                  desc: "Code sur mesure en Next.js et TypeScript, performance et SEO intégrés dès la conception. Jugez sur pièce : toutes nos démonstrations sont en ligne.",
                },
                {
                  Icon: Clock,
                  titre: 'Une rapidité assumée',
                  desc: 'Votre site vitrine en ligne en 10 jours ouvrés, contractuellement. Chaque étape est cadrée, chaque délai est écrit.',
                },
              ].map(({ Icon, titre, desc }) => (
                <div key={titre} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{titre}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Réalisations */}
        <section id="realisations" className="py-24 bg-background dark:bg-[#0A0F1C]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground dark:text-white mb-3">
                  Nos réalisations
                </h2>
                <p className="text-foreground/60 dark:text-white/60">Nos démonstrations sont des projets complets, construits par nos soins et consultables en ligne. Ce que vous voyez est exactement ce que nous livrons.</p>
              </div>
              <Link href="/realisations" className="hidden sm:flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
                Voir tout <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-5 mb-8">
              {realisationsHome.map(r => (
                <Link key={r.slug} href={`/realisations/${r.slug}`}
                  className="group rounded-2xl border border-navy/20 dark:border-white/10 overflow-hidden hover:border-blue-500/30 transition-colors">
                  <div className="h-36 flex items-center justify-center relative" style={{ background: r.couleur }}>
                    <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(135deg, ${r.accent}, transparent)` }} />
                    <span className="relative text-white/70 font-bold text-4xl">{r.nom.charAt(0)}</span>
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-0.5 bg-black/40 text-white/70 text-xs rounded-full">Démonstration</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground dark:text-white group-hover:text-blue-400 transition-colors mb-1">{r.nom}</h3>
                    <p className="text-xs text-foreground/50 dark:text-white/50">{r.type}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/realisations" className="sm:hidden inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
              Voir toutes les réalisations <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* Processus */}
        <section className="py-24 bg-[#060D1A]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12">Comment ça marche ?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { n: '01', titre: 'Brief & devis', desc: 'Vous décrivez votre projet, nous répondons sous 72h avec un devis clair.' },
                { n: '02', titre: 'Maquette', desc: 'Validation visuelle avant le développement. Pas de surprise.' },
                { n: '03', titre: 'Développement', desc: 'Développement sur mesure avec points de suivi réguliers.' },
                { n: '04', titre: 'Livraison', desc: 'Mise en ligne, formation, et support inclus.' },
              ].map(s => (
                <div key={s.n} className="relative">
                  <div className="text-5xl font-bold text-white/10 mb-3 leading-none">{s.n}</div>
                  <h3 className="font-semibold text-white mb-2">{s.titre}</h3>
                  <p className="text-white/60 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Jugez sur pièce */}
        <section className="py-16 bg-background dark:bg-[#0A0F1C]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="rounded-2xl p-8 bg-gradient-to-br from-navy/20 to-blue-950/20 border border-white/10 text-center">
              <h3 className="font-bold text-white text-xl mb-3">Jugez sur pièce</h3>
              <p className="text-white/70 mb-5">
                Nos démonstrations sont des projets complets, construits par nos soins et consultables en ligne.
                Ce que vous voyez est exactement ce que nous livrons.
              </p>
              <Link href="/realisations" className="inline-flex items-center gap-2 px-6 py-3 bg-electric text-white font-semibold rounded-xl text-sm hover:bg-blue-500 transition-colors">
                Explorer nos démonstrations →
              </Link>
            </div>
          </div>
        </section>

        {/* Blog preview */}
        <section id="blog" className="py-24 bg-[#060D1A]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">Du concret sur le blog</h2>
              <Link href="/blog" className="hidden sm:flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
                Tous les articles <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { href: '/blog/creation-site-internet-prix', titre: 'Combien coûte un site internet en 2026 ?', cat: 'Tarifs' },
                { href: '/blog/vitesse-site-web-core-web-vitals', titre: 'Core Web Vitals : guide pratique pour les TPE', cat: 'Technique' },
                { href: '/blog/seo-local-google-business', titre: 'SEO local : comment apparaître en tête sur Google Maps', cat: 'SEO' },
              ].map(a => (
                <Link key={a.href} href={a.href}
                  className="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors">
                  <div className="text-xs text-blue-400 mb-2 font-medium">{a.cat}</div>
                  <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors text-sm leading-snug">{a.titre}</h3>
                </Link>
              ))}
            </div>
            <Link href="/blog" className="sm:hidden mt-6 inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
              Tous les articles <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-24 bg-gradient-to-br from-navy to-electric">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Votre site internet vous attend
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Devis gratuit sous 72h. Premier rendez-vous sans engagement.
              Livraison garantie en {SITE.delais.vitrine}.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/30 transition-all hover:-translate-y-0.5">
                Demander un devis gratuit →
              </Link>
              <Link href="/tarifs" className="px-8 py-4 border border-white/20 text-white hover:bg-white/10 font-semibold rounded-xl transition-all">
                Voir les tarifs
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              {[
                `${SITE.pricing.vitrine}€ tout inclus`,
                `Livraison en ${SITE.delais.vitrine}`,
                'Code 100% propriétaire',
                'Hébergement France',
              ].map(item => (
                <div key={item} className="flex items-center gap-1.5 text-white/60 text-sm">
                  <CheckCircle size={14} className="text-green-400" />
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
