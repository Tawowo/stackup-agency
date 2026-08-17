/* eslint-disable react/no-unescaped-entities */
import { SITE } from '@/config/site'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AuditClient from './AuditClient'
import Link from 'next/link'

export const metadata = {
  title: { absolute: 'Audit de site gratuit — Performance & SEO | Stackup Agency' },
  description: 'Analysez votre site internet gratuitement : score de performance, accessibilité, SEO. Résultats réels via Google PageSpeed Insights. Aucune inscription.',
  alternates: { canonical: `${SITE.url}/outils/audit-site` },
  openGraph: {
    url: `${SITE.url}/outils/audit-site`,
    title: 'Audit de site gratuit — Performance & SEO',
    description: 'Analysez votre site en quelques secondes. Scores réels, opportunités d\'amélioration, Core Web Vitals.',
    type: 'website',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Outils', item: `${SITE.url}/outils` },
    { '@type': 'ListItem', position: 3, name: 'Audit de site', item: `${SITE.url}/outils/audit-site` },
  ],
}

export default function AuditPage() {
  return (
    <div className="min-h-screen bg-[#070B16]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: 'Outils', href: '/outils' }, { name: 'Audit de site' }]} />
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Audit de site gratuit</h1>
          <p className="text-white/60">Entrez l'URL de votre site pour obtenir ses scores de performance, SEO et accessibilité en quelques secondes.</p>
        </div>
      </div>

      <AuditClient />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-8 flex flex-wrap gap-4 text-sm border-t border-navy/10 dark:border-white/10 pt-6 mt-4">
        <Link href="/outils/studio-de-style" className="text-electric hover:underline">Studio de style →</Link>
        <Link href="/devis" className="text-electric hover:underline">Devis express →</Link>
        <Link href="/services" className="text-electric hover:underline">Nos services →</Link>
      </div>
    </div>
  )
}
