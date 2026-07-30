/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import { CheckCircle, ChevronRight } from 'lucide-react'
import { SITE } from '@/config/site'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata = {
  title: 'Nos services web — Site vitrine, e-commerce, système de gestion | Stackup Agency',
  description: `Création de sites internet professionnels à partir de ${SITE.pricing.vitrine}€. Site vitrine, multi-pages, boutique en ligne, application métier. Devis gratuit sous 72h.`,
  alternates: { canonical: `${SITE.url}/services` },
  openGraph: {
    url: `${SITE.url}/services`,
    title: 'Nos services web — Stackup Agency',
    description: `Sites internet livrés en 10 à 21 jours. À partir de ${SITE.pricing.vitrine}€.`,
    type: 'website',
  },
}

const SERVICES = [
  {
    slug: 'site-vitrine',
    titre: 'Site vitrine',
    prix: SITE.pricing.vitrine,
    delai: SITE.delais.vitrine,
    desc: 'La présence en ligne essentielle pour votre activité. SEO local, formulaire de contact, responsive.',
    inclus: ['Design professionnel sur mesure', 'SEO local optimisé', 'Formulaire de contact', 'Hébergement 12 mois inclus', 'Certificat SSL', 'Responsive mobile'],
    ideal: 'Artisans, professions libérales, commerces de proximité',
  },
  {
    slug: 'site-multi-pages',
    titre: 'Site multi-pages',
    prix: SITE.pricing.multipages,
    delai: SITE.delais.multipages,
    desc: 'Site complet avec plusieurs sections : services, équipe, galerie, blog, témoignages.',
    inclus: ['Jusqu\'à 10 pages', 'Blog intégré', 'Galerie photos', 'Google Maps', 'Analytics', 'Formulaires avancés'],
    ideal: 'PME, agences, prestataires de services',
  },
  {
    slug: 'site-ecommerce',
    titre: 'Boutique en ligne',
    prix: SITE.pricing.ecommerce,
    delai: SITE.delais.ecommerce,
    desc: 'E-commerce complet avec paiement sécurisé, gestion des stocks et des commandes.',
    inclus: ['Catalogue produits illimité', 'Paiement sécurisé (Stripe)', 'Gestion des stocks', 'Click & Collect', 'Tableau de bord commandes', 'Emails automatiques'],
    ideal: 'Commerçants, artisans, créateurs',
  },
  {
    slug: 'systeme-gestion',
    titre: 'Système de gestion',
    prix: SITE.pricing.gestion,
    delai: '4 semaines',
    desc: 'Application métier sur mesure : caisse, RDV, CRM, commandes, planning.',
    inclus: ['Développement 100% sur mesure', 'Interface d\'administration', 'Formation incluse', 'Données hébergées en France', 'Pas d\'abonnement SaaS', 'Évolutions possibles'],
    ideal: 'Restaurants, hôtels, artisans, professions de santé',
  },
  {
    slug: 'site-association',
    titre: 'Site association',
    prix: SITE.pricing.association,
    delai: SITE.delais.association,
    desc: 'Site professionnel pour associations loi 1901. Adhésion, actualités, événements.',
    inclus: ['Design adapté association', 'Formulaire d\'adhésion', 'Calendrier événements', 'Espace membres', 'Hébergement 12 mois', 'SSL inclus'],
    ideal: 'Associations loi 1901, clubs sportifs, culturels',
  },
  {
    slug: 'redaction-blog-seo',
    titre: 'Rédaction blog SEO',
    prix: 25,
    delai: '5 jours ouvrés',
    desc: 'Articles de blog optimisés SEO pour gagner en visibilité sur Google. Packs mensuels disponibles.',
    inclus: ['Recherche de mots-clés', 'Structure Hn optimisée', 'Méta-titre et description', 'Liens internes', 'Article 800–1 500 mots', 'Livraison en 5 jours'],
    ideal: 'TPE, artisans, commerçants avec un site existant',
  },
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Services web — Stackup Agency',
  itemListElement: SERVICES.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: s.titre,
      url: `${SITE.url}/services/${s.slug}`,
      offers: { '@type': 'Offer', priceCurrency: 'EUR', price: s.prix, priceSpecification: { '@type': 'UnitPriceSpecification', price: s.prix, priceCurrency: 'EUR' } },
    },
  })),
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-[#0A0F1C]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: 'Services' }]} />
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Nos services de création web
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Sites internet professionnels à partir de {SITE.pricing.vitrine}€. Livrés en 10 à 21 jours,
            hébergement inclus, SEO optimisé. Devis gratuit sous 72h.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-8">
        {SERVICES.map(s => (
          <div key={s.slug} className="rounded-2xl border border-navy/20 dark:border-white/10 p-6 lg:p-8 hover:border-electric/30 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground dark:text-white mb-1">{s.titre}</h2>
                <p className="text-foreground/60 dark:text-white/60 text-sm">Idéal pour : {s.ideal}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-3xl font-bold text-navy dark:text-gold">{s.prix}€</div>
                <div className="text-xs text-foreground/70 dark:text-white/50 mt-0.5">Livraison : {s.delai}</div>
              </div>
            </div>
            <p className="text-foreground/80 dark:text-white/80 mb-5">{s.desc}</p>
            <div className="grid sm:grid-cols-2 gap-2 mb-6">
              {s.inclus.map(item => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-green-400 flex-shrink-0" />
                  <span className="text-sm text-foreground/70 dark:text-white/70">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={`/services/${s.slug}`} className="flex items-center gap-1 px-5 py-2.5 bg-electric hover:bg-electric text-white text-sm font-semibold rounded-xl transition-colors">
                Voir l'offre <ChevronRight size={14} />
              </Link>
              <Link href="/contact" className="px-5 py-2.5 border border-foreground/20 dark:border-white/20 text-foreground dark:text-white hover:bg-foreground/5 dark:hover:bg-white/10 text-sm font-semibold rounded-xl transition-colors">
                Demander un devis
              </Link>
            </div>
          </div>
        ))}

        {/* Comparison table */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">Comparatif des offres</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-4 text-foreground/60 dark:text-white/60 font-medium">Fonctionnalité</th>
                  <th className="text-center py-3 px-3 text-foreground dark:text-white font-semibold">Vitrine</th>
                  <th className="text-center py-3 px-3 text-foreground dark:text-white font-semibold">Multi-pages</th>
                  <th className="text-center py-3 px-3 text-navy dark:text-gold font-semibold">E-commerce</th>
                  <th className="text-center py-3 px-3 text-electric-ink dark:text-electric font-semibold">Gestion</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Design professionnel', true, true, true, true],
                  ['SEO local', true, true, true, true],
                  ['Hébergement 12 mois', true, true, true, true],
                  ['Blog intégré', false, true, true, false],
                  ['Paiement en ligne', false, false, true, true],
                  ['Gestion stocks', false, false, true, true],
                  ['Application sur mesure', false, false, false, true],
                  ['Formation incluse', false, false, false, true],
                ].map(([feat, ...values]) => (
                  <tr key={String(feat)} className="border-b border-white/5">
                    <td className="py-3 pr-4 text-foreground/70 dark:text-white/70">{feat}</td>
                    {values.map((v, i) => (
                      <td key={i} className="text-center py-3 px-3">
                        {v ? <span className="text-green-400">✓</span> : <span className="text-white/20">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="py-3 pr-4 text-foreground/60 dark:text-white/60 font-medium">Prix à partir de</td>
                  <td className="text-center py-3 px-3 font-bold text-foreground dark:text-white">{SITE.pricing.vitrine}€</td>
                  <td className="text-center py-3 px-3 font-bold text-foreground dark:text-white">{SITE.pricing.multipages}€</td>
                  <td className="text-center py-3 px-3 font-bold text-navy dark:text-gold">{SITE.pricing.ecommerce}€</td>
                  <td className="text-center py-3 px-3 font-bold text-electric-ink dark:text-electric">{SITE.pricing.gestion}€</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">Questions fréquentes</h2>
          <div className="space-y-3">
            {[
              { q: 'Quels sont les délais de livraison ?', a: `Site vitrine : ${SITE.delais.vitrine}. Site multi-pages : ${SITE.delais.multipages}. Boutique en ligne : ${SITE.delais.ecommerce}. Système de gestion : 4 semaines. Délais garantis contractuellement.` },
              { q: 'Le prix est-il tout inclus ?', a: 'Oui. Le prix affiché inclut le design, le développement, le SEO de base, l\'hébergement 12 mois, le certificat SSL et la formation à la prise en main. Pas de surprise.' },
              { q: 'Est-ce que je suis propriétaire du code ?', a: 'Oui, à 100%. Une fois le projet livré et payé, le code vous appartient entièrement. Vous êtes libre de le modifier ou de changer d\'hébergeur.' },
              { q: 'Que se passe-t-il après les 12 mois d\'hébergement inclus ?', a: `Après la première année, vous pouvez opter pour l'une de nos offres de maintenance (à partir de ${SITE.pricing.maintenanceStarter}€/mois) ou récupérer votre code et gérer l'hébergement vous-même.` },
            ].map(faq => (
              <details key={faq.q} className="group rounded-xl border border-navy/20 dark:border-white/10 overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-foreground dark:text-white list-none">
                  {faq.q}
                  <ChevronRight size={16} className="text-white/40 group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-4 pb-4 text-foreground/70 dark:text-white/70 text-sm">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric text-center">
          <h2 className="text-white font-bold text-xl mb-2">Pas sûr de l'offre adaptée ?</h2>
          <p className="text-white/70 mb-4">Décrivez votre projet et nous vous recommandons la solution idéale. Devis gratuit sous 72h.</p>
          <Link href="/contact" className="inline-block px-6 py-3 bg-gold hover:bg-gold/80 text-ink font-semibold rounded-xl transition-all hover:-translate-y-0.5">
            Demander un devis gratuit →
          </Link>
        </div>
      </div>
    </div>
  )
}
