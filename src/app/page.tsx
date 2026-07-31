/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Clock, Zap, Shield } from 'lucide-react'
import { SITE } from '@/config/site'
import HeroSection from '@/components/home/HeroSection'
import ServiceCards from '@/components/home/ServiceCards'
import ProcessSection from '@/components/home/ProcessSection'
import ManifestoSection from '@/components/home/ManifestoSection'
import PinnedGallery from '@/components/home/PinnedGallery'
import ScrollBackground from '@/components/home/ScrollBackground'

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

        {/* Services */}
        <section id="services" className="py-24 bg-background dark:bg-[#0A0F1C]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground dark:text-white mb-4 reveal-item heading-underline">
                Nos services web
              </h2>
              <p className="text-foreground/60 dark:text-white/60 max-w-xl">
                Du site vitrine à l'application sur mesure — une solution adaptée à chaque budget et chaque activité.
              </p>
            </div>
            <ServiceCards />
            <Link href="/services" className="inline-flex items-center gap-2 text-electric-ink dark:text-electric hover:text-navy dark:hover:text-electric font-medium transition-colors">
              Voir tous nos services <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Pourquoi Stackup */}
        <section className="py-24 bg-[#060D1A] relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="overline-label mb-3 !text-electric">Pourquoi nous</div>
            <h2 className="text-white mb-12">
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
                    <Icon size={20} className="text-electric" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{titre}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PinnedGallery />

        <ProcessSection />

        {/* Jugez sur pièce */}
        <section className="py-16 bg-background dark:bg-[#0A0F1C]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="rounded-2xl p-8 bg-gradient-to-br from-navy/20 to-blue-950/20 border border-white/10 text-center">
              <h3 className="font-bold text-white text-xl mb-3">Jugez sur pièce</h3>
              <p className="text-white/70 mb-5">
                Nos démonstrations sont des projets complets, construits par nos soins et consultables en ligne.
                Ce que vous voyez est exactement ce que nous livrons.
              </p>
              <Link href="/realisations" className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-semibold rounded-xl text-sm hover:bg-electric transition-colors">
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
              <Link href="/blog" className="hidden sm:flex items-center gap-1 text-electric hover:text-electric/80 font-medium text-sm transition-colors">
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
                  className="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-electric/30 transition-colors">
                  <div className="text-xs text-white/70 mb-2 font-medium">{a.cat}</div>
                  <h3 className="font-semibold text-white group-hover:text-electric/80 transition-colors text-sm leading-snug">{a.titre}</h3>
                </Link>
              ))}
            </div>
            <Link href="/blog" className="sm:hidden mt-6 inline-flex items-center gap-1 text-electric hover:text-electric/80 font-medium text-sm transition-colors">
              Tous les articles <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* Maintenance */}
        <section className="py-24 bg-background dark:bg-[#0A0F1C]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground dark:text-white mb-3">
                Maintenance & hébergement
              </h2>
              <p className="text-foreground/60 dark:text-white/60">Après la première année incluse, une formule mensuelle pour que votre site reste rapide, sécurisé et à jour.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { nom: 'Starter', prix: SITE.pricing.maintenanceStarter, delai: '72h ouvrées', inclus: ['Hébergement', 'SSL', 'Sauvegardes hebdo', 'Mises à jour sécurité'] },
                { nom: 'Pro', prix: SITE.pricing.maintenancePro, delai: '48h ouvrées', inclus: ['Tout Starter', 'Sauvegardes quotidiennes', '2h modifications/mois', 'Rapport mensuel SEO'], highlight: true },
                { nom: 'Premium', prix: SITE.pricing.maintenancePremium, delai: '24h ouvrées', inclus: ['Tout Pro', '5h modifications/mois', 'Rapport mensuel SEO', 'Réponse prioritaire'] },
              ].map(f => (
                <div key={f.nom} className={`reveal-item rounded-2xl border p-5 ${f.highlight ? 'border-electric/40 bg-electric/5' : 'border-navy/20 dark:border-white/10'}`}>
                  {f.highlight && <div className="text-xs font-semibold text-electric-ink dark:text-electric mb-2 uppercase tracking-wide">Le plus populaire</div>}
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-2xl font-bold text-navy dark:text-gold">{f.prix}€</span>
                    <span className="text-sm text-foreground/60 dark:text-white/60">/mois</span>
                  </div>
                  <div className="font-semibold text-foreground dark:text-white mb-1">{f.nom}</div>
                  <div className="text-xs text-electric-ink dark:text-electric mb-4">Réponse {f.delai}</div>
                  <ul className="space-y-1.5">
                    {f.inclus.map(i => (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground/70 dark:text-white/70">
                        <CheckCircle size={12} className="text-success flex-shrink-0" />
                        {i}
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

        {/* FAQ teaser */}
        <section className="py-16 bg-[#060D1A]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-white mb-6">Questions fréquentes</h2>
            <div className="space-y-3">
              {[
                { q: 'Combien coûte un site internet professionnel ?', a: `Un site vitrine complet démarre à ${SITE.pricing.vitrine} €, livraison et hébergement 12 mois inclus. Pas de frais cachés.` },
                { q: 'Combien de temps dure la réalisation ?', a: `Un site vitrine est livré en ${SITE.delais.vitrine} ouvrés à compter de la validation du design. Les délais sont contractuels.` },
                { q: 'Suis-je propriétaire de mon site ?', a: 'Oui, à 100 %. Vous recevez tous les accès (hébergement, nom de domaine, code source) à la livraison.' },
              ].map(({ q, a }) => (
                <details key={q} className="group rounded-xl border border-white/10 bg-white/3 p-5 open:bg-white/5 transition-colors">
                  <summary className="font-semibold text-white cursor-pointer list-none flex justify-between items-center gap-4">
                    {q}
                    <span className="text-electric shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                  </summary>
                  <p className="mt-3 text-white/70 text-sm leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
            <Link href="/faq" className="mt-6 inline-flex items-center gap-2 text-electric font-medium text-sm hover:text-electric/80 transition-colors">
              Toutes les questions <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        <ManifestoSection />

        {/* CTA final */}
        <section className="py-24 animated-gradient">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Votre site internet vous attend
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Devis gratuit sous 72 h. Premier rendez-vous sans engagement.
              Livraison garantie en {SITE.delais.vitrine}.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="px-8 py-4 bg-gold hover:bg-gold/80 text-ink font-bold rounded-xl shadow-lg shadow-amber-500/25 transition-all hover:-translate-y-0.5">
                Démarrer mon projet →
              </Link>
              <Link href="/tarifs" className="px-8 py-4 border border-white/20 text-white hover:bg-white/10 font-semibold rounded-xl transition-all">
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
