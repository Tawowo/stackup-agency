import { SITE } from '@/config/site'
import DevisForm from '@/components/devis/DevisForm'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Link from 'next/link'

export const metadata = {
  title: { absolute: 'Devis express — site internet en 5 min | Stackup Agency' },
  description: `Obtenez un devis personnalisé pour votre site internet en 5 minutes. Site vitrine dès ${SITE.pricing.vitrine}€, multi-pages dès ${SITE.pricing.multipages}€. Réponse sous 72h.`,
  alternates: { canonical: `${SITE.url}/devis` },
  openGraph: {
    url: `${SITE.url}/devis`,
    title: 'Devis express — site internet',
    description: 'Configurez votre projet en 5 étapes et recevez un devis sous 72h.',
    type: 'website',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Devis express', item: `${SITE.url}/devis` },
  ],
}

export default function DevisPage() {
  return (
    <main className="min-h-screen bg-[#070B16]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: 'Devis express' }]} />
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Devis express</h1>
          <p className="text-white/60">5 étapes · moins de 5 minutes · réponse sous 72h</p>
        </div>
      </div>

      <DevisForm />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-8 flex flex-wrap gap-4 text-sm border-t border-navy/10 dark:border-white/10 pt-6 mt-4">
        <Link href="/tarifs" className="text-electric hover:underline">Voir les tarifs →</Link>
        <Link href="/services" className="text-electric hover:underline">Nos services →</Link>
        <Link href="/faq" className="text-electric hover:underline">Questions fréquentes →</Link>
        <Link href="/contact" className="text-electric hover:underline">Nous contacter →</Link>
      </div>
    </main>
  )
}
