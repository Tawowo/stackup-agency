import { SITE } from '@/config/site'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ContactForm from '@/components/sections/Contact'

export const metadata = {
  title: 'Contact — Devis gratuit sous 72h | Stackup Agency',
  description: 'Contactez Stackup Agency pour votre projet de site internet. Devis gratuit sous 72h, premier rendez-vous sans engagement. Basée à Tours, nous intervenons partout en France.',
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
    <div className="min-h-screen bg-background dark:bg-[#0A0F1C]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: 'Contact' }]} />
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Parlons de votre projet
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Décrivez votre projet et nous vous répondons sous 72h avec un devis personnalisé.
            Premier rendez-vous sans engagement.
          </p>
        </div>
      </div>

      <ContactForm />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <p className="text-center text-sm text-foreground/70 dark:text-white/40">
          Nos documents contractuels (CGV, contrat de prestation, devis type…) sont consultables{' '}
          <a href="/ressources/documents" className="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2">
            sur la page Documents officiels
          </a>.
        </p>
      </div>
    </div>
  )
}
