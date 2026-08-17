/* eslint-disable react/no-unescaped-entities */
import { isRentreeActive, getRemainingTime, RENTREE_DEADLINE } from '@/config/rentree'
import { SITE } from '@/config/site'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ChevronRight } from 'lucide-react'
import CountdownRentree from '@/components/rentree/CountdownRentree'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata = {
  title: { absolute: 'Offre rentrée — maquette de site offerte | Stackup Agency' },
  description: `Commandez votre site vitrine (${SITE.pricing.vitrine}€) ou multi-pages (${SITE.pricing.multipages}€) avant le 15 septembre 2026 et recevez votre maquette sans engagement. Devis gratuit.`,
  alternates: { canonical: `${SITE.url}/offre-rentree` },
  openGraph: {
    url: `${SITE.url}/offre-rentree`,
    title: 'Offre rentrée — maquette de site offerte',
    description: 'Maquette offerte pour tout projet de site vitrine ou multi-pages commandé avant le 15 septembre 2026.',
    type: 'website',
  },
}

const FAQ_ITEMS = [
  {
    q: 'Qui peut bénéficier de l\'offre rentrée ?',
    a: 'Toute entreprise ou association commandant un site vitrine ou multi-pages entre la date de publication et le 15 septembre 2026 à 23h59 (heure de Paris).',
  },
  {
    q: 'Qu\'inclut exactement la maquette offerte ?',
    a: 'Une maquette complète de votre page d\'accueil (desktop + mobile) sur Figma, présentant le design, les couleurs, la typographie et la structure de contenu. Elle est livrée avant le démarrage du développement et vous appartient.',
  },
  {
    q: 'Y a-t-il un engagement à passer commande ?',
    a: 'Non. La maquette est réalisée après signature du bon de commande et versement de l\'acompte de 30 %. Si vous ne souhaitez pas poursuivre après la maquette, vous conservez la maquette mais l\'acompte reste acquis selon les CGV.',
  },
  {
    q: 'L\'offre s\'applique-t-elle aux boutiques en ligne et systèmes de gestion ?',
    a: `Non. L'offre rentrée est réservée aux sites vitrines (${SITE.pricing.vitrine}€) et multi-pages (${SITE.pricing.multipages}€). Les boutiques en ligne (${SITE.pricing.ecommerce}€) et systèmes de gestion (à partir de ${SITE.pricing.gestion}€) ne sont pas concernés.`,
  },
  {
    q: 'Que se passe-t-il si je commande après le 15 septembre ?',
    a: 'L\'offre prend fin automatiquement le 15 septembre 2026 à 23h59 (heure de Paris). Les commandes passées après cette date ne bénéficient pas de la maquette offerte.',
  },
]

export default function OffreRentreePage() {
  if (!isRentreeActive()) notFound()

  const initialTime = getRemainingTime()

  const offerSchema = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: 'Offre rentrée — maquette de site offerte',
    description: `Maquette Figma offerte pour tout site vitrine (${SITE.pricing.vitrine}€) ou multi-pages (${SITE.pricing.multipages}€) commandé avant le 15 septembre 2026.`,
    url: `${SITE.url}/offre-rentree`,
    price: '0',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    validFrom: '2026-07-01T00:00:00Z',
    validThrough: RENTREE_DEADLINE.toISOString(),
    seller: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    itemOffered: {
      '@type': 'Service',
      name: 'Maquette Figma page d\'accueil (desktop + mobile)',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Offre rentrée', item: `${SITE.url}/offre-rentree` },
    ],
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: 'Offre rentrée' }]} />
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/20 text-gold rounded-full text-xs font-semibold mb-4 uppercase tracking-wider">
            Offre de rentrée — jusqu'au 15 septembre 2026
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Votre maquette de site <span className="text-gold">offerte</span>
          </h1>
          <p className="text-white/70 text-lg mb-6 max-w-2xl">
            Commandez votre site vitrine ({SITE.pricing.vitrine}€) ou multi-pages ({SITE.pricing.multipages}€) avant le 15 septembre et recevez votre maquette Figma (desktop + mobile) sans surcoût.
          </p>
          <div className="flex items-center gap-2 text-white/50 text-sm mb-8">
            Offre expire dans&nbsp;<span className="text-gold"><CountdownRentree initialTime={initialTime} /></span>
          </div>
          <Link
            href="/devis?offre=rentree"
            className="inline-block px-8 py-4 bg-gold hover:bg-gold/90 text-ink font-bold rounded-xl text-lg transition-all hover:-translate-y-0.5 shadow-lg"
          >
            Démarrer mon projet →
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-16">

        {/* 3 étapes */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-8">Comment ça marche ?</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                num: '1',
                title: 'Vous décrivez votre projet',
                desc: 'Via le formulaire de devis express. Type de site, secteur, contenu : 5 minutes suffisent.',
              },
              {
                num: '2',
                title: 'Nous créons votre maquette',
                desc: 'Sous 5 jours ouvrés, vous recevez une maquette Figma complète (desktop + mobile) de votre page d\'accueil.',
              },
              {
                num: '3',
                title: 'Vous validez et on développe',
                desc: `Après validation, le développement démarre. Site vitrine livré en ${SITE.delais.vitrine}, multi-pages en ${SITE.delais.multipages}.`,
              },
            ].map(step => (
              <div key={step.num} className="rounded-xl border border-navy/20 dark:border-white/10 p-6">
                <div className="w-10 h-10 rounded-full bg-gold/20 text-gold font-bold text-lg flex items-center justify-center mb-4">
                  {step.num}
                </div>
                <h3 className="font-semibold text-foreground dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-foreground/60 dark:text-white/60">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ce qui est inclus */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">Ce qui est inclus dans l'offre</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              `Site vitrine à ${SITE.pricing.vitrine}€ tout inclus`,
              `Site multi-pages à ${SITE.pricing.multipages}€ tout inclus`,
              'Maquette Figma page d\'accueil (desktop + mobile)',
              'Design sur mesure à votre identité visuelle',
              'SEO de base inclus (balises, Schema.org, sitemap)',
              `Hébergement 12 mois inclus`,
              'SSL (HTTPS) inclus',
              'Formation à la prise en main',
            ].map(item => (
              <div key={item} className="flex items-center gap-3 text-sm text-foreground/80 dark:text-white/70">
                <CheckCircle size={16} className="text-success flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Conditions */}
        <section className="rounded-xl border border-navy/20 dark:border-white/10 p-6 bg-navy/5 dark:bg-white/5">
          <h2 className="text-lg font-bold text-foreground dark:text-white mb-3">Conditions de l'offre</h2>
          <ul className="text-sm text-foreground/70 dark:text-white/60 space-y-1.5 list-disc list-inside">
            <li>Valable pour toute commande de site vitrine ou multi-pages signée avant le 15 septembre 2026 à 23h59 (heure de Paris).</li>
            <li>Non cumulable avec d'autres réductions.</li>
            <li>La maquette est livrée après versement de l'acompte de 30 % et validation du brief.</li>
            <li>L'offre ne s'applique pas aux boutiques en ligne ni aux systèmes de gestion.</li>
            <li>Offre soumise aux CGV disponibles sur <Link href="/ressources/documents" className="text-electric hover:underline">la page Documents officiels</Link>.</li>
          </ul>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">Questions fréquentes</h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map(faq => (
              <details key={faq.q} className="group rounded-xl border border-navy/20 dark:border-white/10 overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-foreground dark:text-white list-none">
                  {faq.q}
                  <ChevronRight size={16} className="text-white/40 group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-4 pb-4 text-foreground/70 dark:text-white/70 text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <div className="rounded-2xl p-8 bg-gradient-to-br from-navy to-electric text-center">
          <h2 className="text-white font-bold text-2xl mb-2">Prêt à démarrer ?</h2>
          <p className="text-white/70 mb-6">Démarrez votre devis express maintenant. Premier RDV gratuit, sans engagement.</p>
          <Link
            href="/devis?offre=rentree"
            className="inline-block px-8 py-4 bg-gold hover:bg-gold/90 text-ink font-bold rounded-xl transition-all hover:-translate-y-0.5"
          >
            Obtenir mon devis gratuit →
          </Link>
        </div>

        {/* Internal links */}
        <div className="flex flex-wrap gap-4 text-sm pt-4 border-t border-navy/10 dark:border-white/10">
          <Link href="/tarifs" className="text-electric hover:underline">Voir les tarifs →</Link>
          <Link href="/services" className="text-electric hover:underline">Nos services →</Link>
          <Link href="/contact" className="text-electric hover:underline">Nous contacter →</Link>
          <Link href="/faq" className="text-electric hover:underline">Questions fréquentes →</Link>
        </div>
      </div>
    </div>
  )
}
