/* eslint-disable react/no-unescaped-entities */
import { METIERS, getMetier, CATEGORIES_METIERS } from '@/data/metiers'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home, CheckCircle, Star } from 'lucide-react'
import { SITE } from '@/config/site'

export async function generateStaticParams() {
  return METIERS.map(m => ({ metier: m.slug }))
}

export async function generateMetadata({ params }: { params: { metier: string } }) {
  const m = getMetier(params.metier)
  if (!m) return {}
  const url = `${SITE.url}/creation-site-internet/${m.slug}`
  const titre = `Site internet ${m.metier} — Création à partir de ${SITE.pricing.vitrine}€`
  const description = `Création de site internet pour ${m.metier}. ${m.variantes.slice(0, 2).join(', ')}. Devis gratuit sous 72h, livraison rapide.`
  return {
    title: titre,
    description,
    alternates: { canonical: url },
    openGraph: { url, title: titre, description, type: 'website' },
  }
}

const SERVICE_LABELS: Record<string, { label: string; prix: number; href: string }> = {
  'site-vitrine': { label: 'Site vitrine', prix: SITE.pricing.vitrine, href: '/services/site-vitrine' },
  'site-multi-pages': { label: 'Site multi-pages', prix: SITE.pricing.multipages, href: '/services/site-multi-pages' },
  'site-ecommerce': { label: 'Boutique en ligne', prix: SITE.pricing.ecommerce, href: '/services/site-ecommerce' },
  'systeme-gestion': { label: 'Système de gestion', prix: SITE.pricing.gestion, href: '/services/systeme-gestion' },
}

export default function MetierPage({ params }: { params: { metier: string } }) {
  const m = getMetier(params.metier)
  if (!m) notFound()

  const url = `${SITE.url}/creation-site-internet/${m.slug}`
  const service = SERVICE_LABELS[m.serviceLie] ?? SERVICE_LABELS['site-vitrine']
  const categorieLbl = CATEGORIES_METIERS[m.categorie] ?? m.categorie

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Quel est le prix d'un site internet pour ${m.metier} ?`,
        acceptedAnswer: { '@type': 'Answer', text: `Un ${service.label.toLowerCase()} pour ${m.metier} coûte à partir de ${service.prix}€ chez Stackup Agency. Le devis est gratuit et rendu sous 72h.` },
      },
      {
        '@type': 'Question',
        name: `Quelles fonctionnalités sont importantes pour le site d'un ${m.metier} ?`,
        acceptedAnswer: { '@type': 'Answer', text: `Pour un ${m.metier}, nous recommandons : présentation des services, galerie photos, formulaire de contact, intégration Google Maps et optimisation SEO local. Selon votre activité : prise de RDV en ligne, click & collect ou boutique e-commerce.` },
      },
      {
        '@type': 'Question',
        name: `Combien de temps pour créer un site ${m.metier} ?`,
        acceptedAnswer: { '@type': 'Answer', text: `Un ${service.label.toLowerCase()} est livré en ${m.serviceLie === 'site-ecommerce' ? SITE.delais.ecommerce : m.serviceLie === 'site-multi-pages' ? SITE.delais.multipages : SITE.delais.vitrine}. Nous garantissons le respect des délais annoncés.` },
      },
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Création site internet', item: `${SITE.url}/creation-site-internet` },
      { '@type': 'ListItem', position: 3, name: `Site internet ${m.metier}`, item: url },
    ],
  }

  const delai = m.serviceLie === 'site-ecommerce' ? SITE.delais.ecommerce : m.serviceLie === 'site-multi-pages' ? SITE.delais.multipages : SITE.delais.vitrine

  return (
    <div className="min-h-screen bg-background dark:bg-[#0A0F1C]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 text-white/40 text-xs mb-6" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1"><Home size={11} /> Accueil</Link>
            <ChevronRight size={11} />
            <Link href="/creation-site-internet" className="hover:text-white transition-colors">Création site internet</Link>
            <ChevronRight size={11} />
            <span className="text-white/60 capitalize">{m.metier}</span>
          </nav>

          <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full mb-4">{categorieLbl}</div>

          <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Site internet pour {m.metier}
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-2xl">
            Stackup Agency crée des sites internet professionnels pour les {m.metier}s.
            {m.variantes[0] ? ` ${m.variantes[0].charAt(0).toUpperCase() + m.variantes[0].slice(1)},` : ''} devis gratuit sous 72h.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/#contact" className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5">
              Devis gratuit sous 72h →
            </Link>
            <Link href={service.href} className="px-6 py-3 border border-white/20 text-white hover:bg-white/10 rounded-xl transition-all">
              Voir l'offre {service.label}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-16">

        {/* Offre recommandée */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">
            Notre recommandation pour un {m.metier}
          </h2>
          <div className="p-6 rounded-2xl border border-blue-500/30 bg-blue-500/5">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-foreground dark:text-white">{service.label}</h3>
              <span className="text-2xl font-bold text-amber-500">{service.prix}€</span>
            </div>
            <p className="text-foreground/70 dark:text-white/70 mb-4">
              Solution idéale pour la grande majorité des {m.metier}s. Inclut SEO local, formulaire de contact,
              responsive mobile et hébergement 12 mois.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-foreground/60 dark:text-white/60">
              <span>✓ Livraison : {delai}</span>
              <span>✓ Hébergement inclus 12 mois</span>
              <span>✓ SEO local optimisé</span>
            </div>
          </div>
        </section>

        {/* Ce qu'inclut le site */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">
            Ce qu'inclut votre site de {m.metier}
          </h2>
          <div className="space-y-3">
            {[
              `Page d'accueil optimisée pour "${m.requetePrincipale}"`,
              'Présentation de vos services avec photos professionnelles',
              'Formulaire de contact et localisation Google Maps',
              'Optimisation SEO local pour votre ville',
              'Compatible mobile, tablette et desktop',
              'Hébergement haute disponibilité inclus 12 mois',
              'Certificat SSL (HTTPS) inclus',
              'Tableau de bord Google Analytics',
            ].map(item => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground/80 dark:text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Témoignage */}
        <section className="rounded-2xl p-6 bg-gradient-to-br from-navy/20 to-blue-950/20 border border-white/10">
          <div className="flex gap-1 mb-3">
            {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-amber-500 fill-amber-500" />)}
          </div>
          <p className="text-foreground/80 dark:text-white/80 italic mb-3">
            "Site livré en 9 jours, exactement ce dont nous avions besoin. La prise de commande en ligne a transformé notre activité."
          </p>
          <p className="text-sm font-semibold text-foreground dark:text-white">
            Roma Pizzeria — <span className="font-normal text-white/50">Savigné-sur-Lathan (client réel)</span>
          </p>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {[
              {
                q: `Quel est le prix d'un site internet pour ${m.metier} ?`,
                a: `Un ${service.label.toLowerCase()} pour ${m.metier} coûte à partir de ${service.prix}€. Le devis est gratuit et rendu sous 72h.`,
              },
              {
                q: `Quelles fonctionnalités sont essentielles pour un site ${m.metier} ?`,
                a: `Pour un ${m.metier}, les éléments clés sont : présentation claire des services, galerie photos, formulaire de contact, intégration Maps et SEO local. Nous pouvons aussi ajouter : prise de RDV en ligne, boutique, click & collect selon votre activité.`,
              },
              {
                q: `Combien de temps pour créer mon site ?`,
                a: `Votre ${service.label.toLowerCase()} est livré en ${delai} à compter de la validation du brief et du paiement.`,
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

        {/* Mots-clés associés */}
        <section>
          <h3 className="text-lg font-semibold text-foreground dark:text-white mb-3">Recherches associées</h3>
          <div className="flex flex-wrap gap-2">
            {m.variantes.map(v => (
              <span key={v} className="px-3 py-1.5 rounded-full text-xs border border-white/10 text-foreground/60 dark:text-white/60">
                {v}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric text-center">
          <h3 className="text-white font-bold text-xl mb-2">Prêt à créer votre site de {m.metier} ?</h3>
          <p className="text-white/70 mb-4">Premier RDV gratuit, devis sous 72h, livraison garantie en {delai}.</p>
          <Link href="/#contact" className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5">
            Demander un devis gratuit →
          </Link>
        </div>
      </div>
    </div>
  )
}
