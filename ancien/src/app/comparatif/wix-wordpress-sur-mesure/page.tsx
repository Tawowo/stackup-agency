/* eslint-disable react/no-unescaped-entities */
import { SITE } from '@/config/site'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ComparatifClient from './ComparatifClient'

export const metadata = {
  title: { absolute: 'Wix vs WordPress vs sur-mesure — Comparatif | Stackup Agency' },
  description: 'Comparatif Wix, WordPress et site sur-mesure : coût total, performances, SEO, liberté, maintenance. Guide honnête pour choisir sans regrets.',
  alternates: { canonical: `${SITE.url}/comparatif/wix-wordpress-sur-mesure` },
  openGraph: {
    url: `${SITE.url}/comparatif/wix-wordpress-sur-mesure`,
    title: 'Wix vs WordPress vs sur-mesure — Lequel choisir ?',
    description: 'Comparatif honnête des 3 solutions pour votre site internet. Coût total, SEO, performances, liberté.',
    type: 'article',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Comparatif', item: `${SITE.url}/comparatif` },
    { '@type': 'ListItem', position: 3, name: 'Wix vs WordPress vs sur-mesure', item: `${SITE.url}/comparatif/wix-wordpress-sur-mesure` },
  ],
}

export default function ComparatifPage() {
  return (
    <div className="min-h-screen bg-[#060D1A] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: 'Outils', href: '/outils' }, { name: 'Comparatif' }]} />
          <h1 className="reveal-item text-3xl lg:text-4xl font-bold text-white mb-4">Wix vs WordPress vs sur-mesure</h1>
          <p className="reveal-item text-white/60 text-lg" style={{ animationDelay: '80ms' }}>Comparaison honnête pour choisir sans regrets.</p>
        </div>
      </div>

      <ComparatifClient />
    </div>
  )
}
