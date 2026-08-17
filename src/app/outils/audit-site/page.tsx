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

const FAQ = [
  { q: 'Cet audit de site est-il vraiment gratuit ?', a: 'Oui, entièrement gratuit et sans inscription. Les données proviennent de Google PageSpeed Insights, la même source que celle utilisée par les professionnels.' },
  { q: 'Les scores affichés sont-ils fiables ?', a: 'Ce sont les scores Lighthouse officiels de Google, mesurés sur mobile. C\'est un pré-diagnostic indicatif : il photographie l\'état technique de votre site mais ne remplace pas un audit complet (contenus, maillage, popularité).' },
  { q: 'Quel est un bon score de performance ?', a: 'Google considère 90-100 comme bon, 50-89 à améliorer, moins de 50 critique. La majorité des sites de TPE se situent entre 40 et 70 sur mobile — une refonte technique change radicalement ce chiffre.' },
  { q: 'Que faire si mes scores sont mauvais ?', a: 'Deux options : optimiser l\'existant (souvent limité par la technologie du site) ou refondre sur une base moderne. Nos sites sont livrés avec des scores ≥ 90 en standard. Le devis est gratuit et vous saurez à quoi vous attendre avant de décider.' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
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
    <div className="min-h-screen bg-[#FFFDF9]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: 'Outils', href: '/outils' }, { name: 'Audit de site' }]} />
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Audit de site gratuit</h1>
          <p className="text-white/60">Cet outil gratuit analyse n'importe quel site en 10 à 20 secondes via Google PageSpeed Insights : score de performance mobile, accessibilité, SEO et Core Web Vitals, avec des explications en français simple et des conseils concrets. Sans inscription.</p>
        </div>
      </div>

      <AuditClient />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold text-navy mb-6">Questions fréquentes sur l'audit de site</h2>
        <div className="space-y-3">
          {FAQ.map(f => (
            <details key={f.q} className="group rounded-xl border border-gray-200 bg-white overflow-hidden">
              <summary className="p-4 cursor-pointer font-medium text-navy list-none">{f.q}</summary>
              <div className="px-4 pb-4 text-navy/65 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-8 flex flex-wrap gap-4 text-sm border-t border-navy/10 dark:border-white/10 pt-6 mt-4">
        <Link href="/outils/studio-de-style" className="text-electric hover:underline">Studio de style →</Link>
        <Link href="/devis" className="text-electric hover:underline">Devis express →</Link>
        <Link href="/services" className="text-electric hover:underline">Nos services →</Link>
      </div>
    </div>
  )
}
