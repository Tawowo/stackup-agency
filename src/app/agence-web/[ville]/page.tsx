/* eslint-disable react/no-unescaped-entities */
import { VILLES, getVille } from '@/data/villes'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home, MapPin, CheckCircle, Building2, TrendingUp, ArrowRight } from 'lucide-react'
import { SITE } from '@/config/site'

export async function generateStaticParams() {
  return VILLES.map(v => ({ ville: v.slug }))
}

export async function generateMetadata({ params }: { params: { ville: string } }) {
  const v = getVille(params.ville)
  if (!v) return {}
  const url = `${SITE.url}/agence-web/${v.slug}`
  const rawTitle = `Agence web ${v.ville} — Site internet dès ${SITE.pricing.vitrine}€`
  const suffix = ' | Stackup Agency'
  const seoTitle = rawTitle.length <= 65 - suffix.length
    ? rawTitle + suffix
    : `Agence web ${v.ville} — dès ${SITE.pricing.vitrine}€` + suffix
  const description = `Création de site internet à ${v.ville} à partir de ${SITE.pricing.vitrine}€, livré en 10 jours ouvrés. Design personnalisé, SEO intégré. Devis gratuit sous 72h.`
  return {
    title: { absolute: seoTitle },
    description,
    alternates: { canonical: url },
    openGraph: { url, title: rawTitle, description, type: 'website' },
  }
}


export default function AgenceWebVillePage({ params }: { params: { ville: string } }) {
  const v = getVille(params.ville)
  if (!v) notFound()

  const url = `${SITE.url}/agence-web/${v.slug}`
  const villesVoisines = VILLES.filter(vi => v.villesVoisines.includes(vi.slug))

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Création de site internet à ${v.ville}`,
    provider: {
      '@type': 'Organization',
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: { '@type': 'City', name: v.ville },
    description: `Création de sites internet professionnels pour les entreprises de ${v.ville} et de la région ${v.region}.`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: `${SITE.pricing.vitrine}`,
      priceSpecification: { '@type': 'UnitPriceSpecification', price: SITE.pricing.vitrine, priceCurrency: 'EUR' },
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Agence web', item: `${SITE.url}/agence-web` },
      { '@type': 'ListItem', position: 3, name: `Agence web ${v.ville}`, item: url },
    ],
  }

  const faqItems = [
    {
      q: `Quel est le prix d'un site internet à ${v.ville} ?`,
      a: `Stackup Agency propose des sites vitrine à partir de ${SITE.pricing.vitrine}€ et des sites e-commerce à partir de ${SITE.pricing.ecommerce}€. Le devis est gratuit et rendu sous 72h, sans engagement.`,
    },
    {
      q: `Combien de temps pour créer un site web à ${v.ville} ?`,
      a: `Un site vitrine est livré en ${SITE.delais.vitrine}. Un site multi-pages en ${SITE.delais.multipages}. Un e-commerce en ${SITE.delais.ecommerce}. Nous intervenons à distance pour toute la région ${v.region}.`,
    },
    {
      q: `Stackup Agency intervient-elle à ${v.ville} ?`,
      a: `Oui, nous travaillons avec des clients dans toute la France, dont ${v.ville} et sa région. Les échanges se font par visioconférence et email — ce qui nous permet de tenir des délais courts et des tarifs compétitifs.`,
    },
    {
      q: `Mon site sera-t-il bien référencé à ${v.ville} ?`,
      a: `Le SEO local est intégré à tous nos sites dès la création. Nous optimisons votre fiche Google My Business, les balises locales et le contenu pour que vous apparaissiez sur les recherches de vos futurs clients à ${v.ville} et dans le ${v.departement}.`,
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 text-white/40 text-xs mb-6" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1"><Home size={11} /> Accueil</Link>
            <ChevronRight size={11} />
            <Link href="/agence-web" className="hover:text-white transition-colors">Agence web</Link>
            <ChevronRight size={11} />
            <span className="text-white/60">{v.ville}</span>
          </nav>

          <div className="flex items-center gap-2 mb-4">
            <MapPin size={16} className="text-electric" />
            <span className="text-electric text-sm font-medium">{v.departement} — {v.region}</span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Agence web {v.ville}
          </h1>
          <p className="text-white/70 text-lg mb-6 max-w-2xl">
            Création de sites internet professionnels pour les entrepreneurs et commerces de {v.ville} et alentours.
            Sites vitrine, e-commerce, applications métier — livrés en 10 à 21 jours, à partir de {SITE.pricing.vitrine}€.
          </p>

          <div className="flex flex-wrap gap-3 mb-8 text-sm text-white/60">
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-success" /> À partir de {SITE.pricing.vitrine}€</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-success" /> Livraison en {SITE.delais.vitrine}</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-success" /> Devis gratuit sous 72h</span>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="px-6 py-3 bg-gold hover:bg-gold/80 text-ink font-semibold rounded-xl transition-all hover:-translate-y-0.5">
              Devis gratuit sous 72h →
            </Link>
            <Link href="/services/site-vitrine" className="px-6 py-3 border border-white/20 text-white hover:bg-white/10 rounded-xl transition-all">
              Voir nos offres
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-16">

        {/* Contexte économique local */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Building2 size={20} className="text-electric" />
            </div>
            <h2 className="text-2xl font-bold text-foreground dark:text-white">
              Le digital à {v.ville}
            </h2>
          </div>
          <p className="text-foreground/70 dark:text-white/70 leading-relaxed mb-6">
            {v.economie} Dans cet environnement, un site internet professionnel n'est plus un luxe — c'est la condition pour exister aux yeux de vos futurs clients qui cherchent sur Google avant de prendre contact.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {v.secteurs.map(s => (
              <div key={s} className="reveal-item flex items-center gap-3 p-3 rounded-xl bg-blue-950/20 border border-blue-900/20">
                <TrendingUp size={16} className="text-electric flex-shrink-0" />
                <span className="text-foreground/80 dark:text-white/80 text-sm font-medium">{s}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-8">
            Nos services pour les entreprises de {v.ville}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { titre: 'Site vitrine', prix: `${SITE.pricing.vitrine}€`, delai: SITE.delais.vitrine, desc: 'Présence en ligne professionnelle, SEO local optimisé', href: '/services/site-vitrine' },
              { titre: 'Site multi-pages', prix: `${SITE.pricing.multipages}€`, delai: SITE.delais.multipages, desc: 'Site complet avec plusieurs sections et pages de service', href: '/services/site-multi-pages' },
              { titre: 'Boutique en ligne', prix: `${SITE.pricing.ecommerce}€`, delai: SITE.delais.ecommerce, desc: 'E-commerce complet, paiement sécurisé, gestion des stocks', href: '/services/site-ecommerce' },
              { titre: 'Application métier', prix: `${SITE.pricing.gestion}€`, delai: SITE.delais.gestion, desc: 'Logiciel sur mesure : caisse, RDV, commandes, CRM', href: '/services/systeme-gestion' },
            ].map(s => (
              <Link key={s.titre} href={s.href} className="reveal-item p-5 rounded-2xl border border-navy/20 dark:border-white/10 hover:border-electric/40 hover:-translate-y-0.5 transition-all duration-200 group">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground dark:text-white group-hover:text-electric transition-colors">{s.titre}</h3>
                  <span className="text-gold font-bold text-sm">{s.prix}</span>
                </div>
                <p className="text-foreground/60 dark:text-white/60 text-sm mb-2">{s.desc}</p>
                <span className="text-xs text-electric-ink dark:text-electric">Livraison : {s.delai}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Pourquoi nous */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">
            Pourquoi choisir Stackup Agency pour votre site à {v.ville} ?
          </h2>
          <div className="space-y-3">
            {[
              `Intervention à distance sur toute la région ${v.region} — visioconférence et email`,
              'Devis gratuit rendu sous 72h, sans engagement',
              `Sites vitrine livrés en ${SITE.delais.vitrine}, délai tenu garanti`,
              `SEO local optimisé pour ${v.ville} et le ${v.departement}`,
              'Hébergement haute disponibilité inclus sur 12 mois',
              "Fondateur accessible directement — pas d'intermédiaires",
              'Aucune commission, aucun abonnement imposé après livraison',
            ].map(item => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle size={18} className="text-success mt-0.5 flex-shrink-0" />
                <span className="text-foreground/80 dark:text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Processus */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">
            Comment ça se passe pour une entreprise de {v.ville} ?
          </h2>
          <div className="space-y-4">
            {[
              { n: '01', titre: 'Premier contact', desc: `Vous nous contactez depuis ${v.ville} — par email ou via le formulaire. Nous vous répondons sous 24h pour comprendre votre projet.` },
              { n: '02', titre: 'Devis sous 72h', desc: 'Après un premier échange (visioconférence ou email), vous recevez un devis précis, sans engagement, dans les 72h.' },
              { n: '03', titre: 'Développement à distance', desc: `Nous travaillons à distance pour toute la région ${v.region}. Vous suivez l'avancement sur un lien de prévisualisation privé.` },
              { n: '04', titre: 'Mise en ligne', desc: 'Votre site est mis en ligne, référencé sur Google et livré clé en main avec hébergement 12 mois inclus.' },
            ].map(step => (
              <div key={step.n} className="flex items-start gap-4 p-4 rounded-xl border border-white/10">
                <span className="text-2xl font-bold text-electric/40 font-mono flex-shrink-0 w-10">{step.n}</span>
                <div>
                  <h3 className="font-semibold text-foreground dark:text-white mb-1">{step.titre}</h3>
                  <p className="text-foreground/60 dark:text-white/60 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Jugez sur pièce */}
        <section className="rounded-2xl p-6 bg-gradient-to-br from-navy/20 to-blue-950/20 border border-white/10">
          <h3 className="font-bold text-white mb-2">Jugez sur pièce</h3>
          <p className="text-white/70 text-sm mb-4">Toutes nos démonstrations sont des projets complets, construits par nos soins et consultables en ligne. Ce que vous voyez est exactement ce que nous livrons.</p>
          <Link href="/realisations" className="inline-flex items-center gap-2 text-electric text-sm font-medium hover:text-electric/80 transition-colors">
            Explorer nos démonstrations <ArrowRight size={14} />
          </Link>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">
            Questions fréquentes — création de site à {v.ville}
          </h2>
          <div className="space-y-3">
            {faqItems.map(faq => (
              <details key={faq.q} className="group rounded-xl border border-navy/20 dark:border-white/10 overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-foreground dark:text-white list-none">
                  {faq.q}
                  <ChevronRight size={16} className="text-white/40 group-open:rotate-90 transition-transform flex-shrink-0 ml-3" />
                </summary>
                <div className="px-4 pb-4 text-foreground/70 dark:text-white/70 text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Villes voisines */}
        {villesVoisines.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">
              Nous intervenons aussi dans les villes proches de {v.ville}
            </h2>
            <div className="flex flex-wrap gap-3">
              {villesVoisines.map(vi => (
                <Link key={vi.slug} href={`/agence-web/${vi.slug}`} className="px-4 py-2 rounded-xl border border-white/10 hover:border-blue-400/40 text-sm text-foreground/70 dark:text-white/70 hover:text-electric transition-colors">
                  Agence web {vi.ville}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="rounded-2xl p-8 bg-gradient-to-br from-navy to-electric text-center">
          <h3 className="text-white font-bold text-2xl mb-2">Vous êtes à {v.ville} ? Parlons de votre projet.</h3>
          <p className="text-white/70 mb-2">Premier rendez-vous gratuit, devis sous 72h, sans engagement.</p>
          <p className="text-white/50 text-sm mb-6">Tout se passe à distance — aussi efficace qu'en présentiel, plus rapide.</p>
          <Link href="/contact" className="inline-block px-8 py-3 bg-gold hover:bg-gold/80 text-ink font-semibold rounded-xl transition-all hover:-translate-y-0.5">
            Demander un devis gratuit →
          </Link>
        </div>
      </div>
    </div>
  )
}
