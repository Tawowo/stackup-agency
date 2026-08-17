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

const FAQ = [
  { q: 'Le studio de style est-il gratuit ?', a: 'Oui, entièrement gratuit et sans inscription. Explorez les presets métier, ajustez couleurs et typographies, et repartez avec un profil de style — que vous travailliez avec nous ou non.' },
  { q: 'Puis-je utiliser le style choisi pour mon devis ?', a: 'Oui, c\'est le but : le CTA en fin de parcours pré-remplit votre devis express avec le style sélectionné. Notre équipe part alors de cette base pour la maquette.' },
  { q: 'Les combinaisons proposées sont-elles professionnelles ?', a: 'Les palettes et paires typographiques sont curées à la main : chaque preset métier correspond à des conventions éprouvées de son secteur (confiance pour un cabinet, appétence pour un restaurant, prestige pour le luxe…).' },
  { q: 'Que se passe-t-il après avoir choisi un style ?', a: 'Rien d\'obligatoire. Si vous demandez un devis, la maquette reprend votre direction artistique — vous validez avant tout développement. La maquette est offerte, le devis gratuit sous 72 h.' },
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
    { '@type': 'ListItem', position: 3, name: 'Studio de style', item: `${SITE.url}/outils/studio-de-style` },
  ],
}

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: 'Outils', href: '/outils' }, { name: 'Studio de style' }]} />
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Studio de style</h1>
          <p className="text-white/60">Le studio de style est un configurateur gratuit d'identité visuelle : presets métier, palettes et typographies curées, aperçu en direct — puis un devis pré-rempli avec votre direction artistique si vous souhaitez la faire construire. Sans inscription.</p>
        </div>
      </div>

      <StudioClient />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold text-navy mb-6">Questions fréquentes sur le studio de style</h2>
        <div className="space-y-3">
          {FAQ.map(f => (
            <details key={f.q} className="group rounded-xl border border-gray-200 bg-white overflow-hidden">
              <summary className="p-4 cursor-pointer font-medium text-navy list-none">{f.q}</summary>
              <div className="px-4 pb-4 text-navy/65 text-sm leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 flex flex-wrap gap-4 text-sm border-t border-navy/10 dark:border-white/10 pt-6">
        <Link href="/outils/audit-site" className="text-electric hover:underline">Audit de site →</Link>
        <Link href="/devis" className="text-electric hover:underline">Devis express →</Link>
        <Link href="/tarifs" className="text-electric hover:underline">Voir les tarifs →</Link>
      </div>
    </div>
  )
}
