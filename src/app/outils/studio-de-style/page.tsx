/* eslint-disable react/no-unescaped-entities */
import { SITE } from '@/config/site'
import Breadcrumb from '@/components/ui/Breadcrumb'
import StudioClient from './StudioClient'
import Link from 'next/link'

export const metadata = {
  title: { absolute: 'Studio de style — Identité visuelle de votre site | Stackup' },
  description: 'Explorez 5 univers visuels pour votre site internet. Aperçu en direct, profil de style personnalisé, jonction vers votre devis express. Outil gratuit.',
  alternates: { canonical: `${SITE.url}/outils/studio-de-style` },
  openGraph: {
    url: `${SITE.url}/outils/studio-de-style`,
    title: 'Studio de style — Choisissez votre identité visuelle',
    description: '5 univers visuels, aperçu en direct, profil personnalisé. Gratuit et sans inscription.',
    type: 'website',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Outils', item: `${SITE.url}/outils` },
    { '@type': 'ListItem', position: 3, name: 'Studio de style', item: `${SITE.url}/outils/studio-de-style` },
  ],
}

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-[#0A0F1C]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: 'Outils', href: '/outils' }, { name: 'Studio de style' }]} />
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Studio de style</h1>
          <p className="text-white/60">Explorez 5 univers visuels et trouvez l'identité qui correspond à votre activité.</p>
        </div>
      </div>

      <StudioClient />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 flex flex-wrap gap-4 text-sm border-t border-navy/10 dark:border-white/10 pt-6">
        <Link href="/outils/audit-site" className="text-electric hover:underline">Audit de site →</Link>
        <Link href="/devis" className="text-electric hover:underline">Devis express →</Link>
        <Link href="/tarifs" className="text-electric hover:underline">Voir les tarifs →</Link>
      </div>
    </div>
  )
}
