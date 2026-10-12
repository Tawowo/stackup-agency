import { SITE } from '@/config/site'
import DevisForm from '@/components/devis/DevisForm'
import MiniHero from '@/components/ui/MiniHero'
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
    <div className="min-h-screen bg-[#FFFDF9]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* « signal » : des ondes émises depuis un point. Même famille que
          contact et parrainage — une page d'où part un message. */}
      <MiniHero
        signature="signal"
        breadcrumb={[{ name: 'Devis express' }]}
        title="Devis express"
        subtitle="5 étapes · moins de 5 minutes · réponse sous 72 h"
      />

      <DevisForm />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-8 flex flex-wrap gap-4 text-sm border-t border-navy/10 pt-6 mt-4">
        <Link href="/tarifs" className="text-electric hover:underline">Voir les tarifs →</Link>
        <Link href="/services" className="text-electric hover:underline">Nos services →</Link>
        <Link href="/faq" className="text-electric hover:underline">Questions fréquentes →</Link>
        <Link href="/contact" className="text-electric hover:underline">Nous contacter →</Link>
      </div>
    </div>
  )
}
