import { SITE } from '@/config/site'
import Link from 'next/link'
import MiniHero from '@/components/ui/MiniHero'
import ContactForm from '@/components/sections/Contact'
import EncartRentree from '@/components/rentree/EncartRentree'

export const metadata = {
  title: 'Contact — Devis gratuit sous 72h',
  description: 'Contactez Stackup Agency pour votre projet de site internet. Devis gratuit sous 72h, premier rendez-vous sans engagement. Toute la France.',
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    url: `${SITE.url}/contact`,
    title: 'Contact — Stackup Agency',
    description: 'Devis gratuit sous 72h. Premier RDV sans engagement.',
    type: 'website',
  },
}

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact — Stackup Agency',
  url: `${SITE.url}/contact`,
  mainEntity: {
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE.url}/contact` },
  ],
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#070B16]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <MiniHero
        title="Parlons de votre projet"
        subtitle="Décrivez votre projet et nous vous répondons sous 72h avec un devis personnalisé. Premier rendez-vous sans engagement."
        breadcrumb={[{ name: 'Contact' }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <EncartRentree />
      </div>
      <ContactForm />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <p className="text-center text-sm text-foreground/70 dark:text-white/40">
          Nos documents contractuels (CGV, contrat de prestation, devis type…) sont consultables{' '}
          <a href="/ressources/documents" className="text-electric hover:text-electric/80 transition-colors underline underline-offset-2">
            sur la page Documents officiels
          </a>.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/tarifs" className="text-electric hover:underline">Voir les tarifs →</Link>
          <Link href="/faq" className="text-electric hover:underline">Questions fréquentes →</Link>
          <Link href="/services" className="text-electric hover:underline">Nos services →</Link>
        </div>
      </div>
    </div>
  )
}
