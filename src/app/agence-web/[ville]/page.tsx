/* eslint-disable react/no-unescaped-entities */
import { VILLES, getVille } from '@/data/villes'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home, MapPin, CheckCircle, Star } from 'lucide-react'
import { SITE } from '@/config/site'

export async function generateStaticParams() {
  return VILLES.map(v => ({ ville: v.slug }))
}

export async function generateMetadata({ params }: { params: { ville: string } }) {
  const v = getVille(params.ville)
  if (!v) return {}
  const url = `${SITE.url}/agence-web/${v.slug}`
  const title = `Agence web ${v.ville} — Création site internet à partir de ${SITE.pricing.vitrine}€`
  const description = `Agence web à ${v.ville} (${v.departement}). Création de sites internet professionnels, e-commerce et applications métier. Devis gratuit sous 72h, livraison en 10 jours.`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { url, title, description, type: 'website' },
  }
}

const TEMOIGNAGES = [
  { nom: 'Roma Pizzeria', ville: 'Savigné-sur-Lathan', texte: 'Site livré en 9 jours, exactement ce dont nous avions besoin. La prise de commande en ligne a transformé notre activité.', note: 5 },
]

export default function AgenceWebVillePage({ params }: { params: { ville: string } }) {
  const v = getVille(params.ville)
  if (!v) notFound()

  const url = `${SITE.url}/agence-web/${v.slug}`
  const villesVoisines = VILLES.filter(vi => v.villesVoisines.includes(vi.slug))

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.name,
    url: SITE.url,
    description: `Agence web intervenant à ${v.ville} et dans toute la région ${v.region}. Création de sites internet, e-commerce et applications sur mesure.`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    areaServed: { '@type': 'City', name: v.ville },
    priceRange: `À partir de ${SITE.pricing.vitrine}€`,
    founder: { '@type': 'Person', name: SITE.founder.name },
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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Quel est le prix d'un site internet à ${v.ville} ?`,
        acceptedAnswer: { '@type': 'Answer', text: `Stackup Agency propose des sites vitrine à partir de ${SITE.pricing.vitrine}€ et des sites e-commerce à partir de ${SITE.pricing.ecommerce}€. Le devis est gratuit et rendu sous 72h.` },
      },
      {
        '@type': 'Question',
        name: `Combien de temps pour créer un site web à ${v.ville} ?`,
        acceptedAnswer: { '@type': 'Answer', text: `Un site vitrine est livré en ${SITE.delais.vitrine}. Un site e-commerce en ${SITE.delais.ecommerce}. Nous intervenons à distance pour toute la région ${v.region}.` },
      },
      {
        '@type': 'Question',
        name: `Stackup Agency se déplace-t-elle à ${v.ville} ?`,
        acceptedAnswer: { '@type': 'Answer', text: `Nous travaillons principalement à distance pour des clients partout en France, y compris à ${v.ville}. Les réunions se font par visioconférence, ce qui permet des délais plus courts et des tarifs compétitifs.` },
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background dark:bg-[#0A0F1C]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
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
            <MapPin size={16} className="text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">{v.departement} — {v.region}</span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Agence web {v.ville}
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-2xl">
            Création de sites internet professionnels pour les entrepreneurs et commerces de {v.ville} et alentours.
            Sites vitrine, e-commerce, applications métier — livrés en 10 à 21 jours, à partir de {SITE.pricing.vitrine}€.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/#contact" className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5">
              Devis gratuit sous 72h →
            </Link>
            <Link href="/services/site-vitrine" className="px-6 py-3 border border-white/20 text-white hover:bg-white/10 rounded-xl transition-all">
              Voir nos offres
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-16">

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
              { titre: 'Application métier', prix: `${SITE.pricing.gestion}€`, delai: '4 semaines', desc: 'Logiciel sur mesure : caisse, RDV, commandes, CRM', href: '/services/systeme-gestion' },
            ].map(s => (
              <Link key={s.titre} href={s.href} className="p-5 rounded-2xl border border-navy/20 dark:border-white/10 hover:border-blue-500/40 transition-colors group">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground dark:text-white group-hover:text-blue-400 transition-colors">{s.titre}</h3>
                  <span className="text-amber-500 font-bold text-sm">{s.prix}</span>
                </div>
                <p className="text-foreground/60 dark:text-white/60 text-sm mb-2">{s.desc}</p>
                <span className="text-xs text-blue-400">Livraison : {s.delai}</span>
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
              `Intervention à distance sur toute la région ${v.region}`,
              'Devis gratuit rendu sous 72h, sans engagement',
              `Sites vitrine livrés en ${SITE.delais.vitrine}`,
              'SEO local optimisé pour votre ville et département',
              'Maintenance et hébergement inclus sur 12 mois',
              'Fondateur accessible directement — pas d\'intermédiaires',
            ].map(item => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground/80 dark:text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Témoignage */}
        {TEMOIGNAGES.map(t => (
          <section key={t.nom} className="rounded-2xl p-6 bg-gradient-to-br from-navy/20 to-blue-950/20 border border-white/10">
            <div className="flex gap-1 mb-3">
              {Array.from({ length: t.note }).map((_, i) => (
                <Star key={i} size={16} className="text-amber-500 fill-amber-500" />
              ))}
            </div>
            <p className="text-foreground/80 dark:text-white/80 italic mb-3">"{t.texte}"</p>
            <p className="text-sm font-semibold text-foreground dark:text-white">{t.nom} — <span className="font-normal text-white/50">{t.ville} (client réel)</span></p>
          </section>
        ))}

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">
            Questions fréquentes — création de site à {v.ville}
          </h2>
          <div className="space-y-4">
            {[
              {
                q: `Quel est le prix d'un site internet à ${v.ville} ?`,
                a: `Stackup Agency propose des sites vitrine à partir de ${SITE.pricing.vitrine}€ et des boutiques en ligne à partir de ${SITE.pricing.ecommerce}€. Le devis est gratuit et rendu sous 72h.`,
              },
              {
                q: `Combien de temps faut-il pour créer un site à ${v.ville} ?`,
                a: `Un site vitrine est livré en ${SITE.delais.vitrine}. Un site multi-pages en ${SITE.delais.multipages}. Un e-commerce en ${SITE.delais.ecommerce}. Nous travaillons à distance pour toute la ${v.region}.`,
              },
              {
                q: `Stackup Agency intervient-elle à ${v.ville} ?`,
                a: `Oui, nous travaillons avec des clients dans toute la France dont ${v.ville} et sa région. Les échanges se font par visioconférence et email pour plus d'efficacité.`,
              },
            ].map(faq => (
              <details key={faq.q} className="group rounded-xl border border-navy/20 dark:border-white/10 overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-foreground dark:text-white list-none">
                  {faq.q}
                  <ChevronRight size={16} className="text-white/40 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-4 pb-4 text-foreground/70 dark:text-white/70 text-sm">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Villes voisines */}
        {villesVoisines.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">
              Nous intervenons aussi dans les villes proches
            </h2>
            <div className="flex flex-wrap gap-3">
              {villesVoisines.map(vi => (
                <Link key={vi.slug} href={`/agence-web/${vi.slug}`} className="px-4 py-2 rounded-xl border border-white/10 hover:border-blue-400/40 text-sm text-foreground/70 dark:text-white/70 hover:text-blue-400 transition-colors">
                  Agence web {vi.ville}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric text-center">
          <h3 className="text-white font-bold text-xl mb-2">Vous êtes à {v.ville} ? Parlons de votre projet.</h3>
          <p className="text-white/70 mb-4">Premier rendez-vous gratuit, devis sous 72h, sans engagement.</p>
          <Link href="/#contact" className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5">
            Demander un devis gratuit →
          </Link>
        </div>
      </div>
    </div>
  )
}
