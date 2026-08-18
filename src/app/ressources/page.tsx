import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, Download, ArrowRight } from 'lucide-react'
import { SITE } from '@/config/site'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: 'Ressources — Modèles et documents gratuits | Stackup Agency',
  description: 'Ressources gratuites Stackup Agency : modèle de cahier des charges à télécharger et documents contractuels officiels (CGV, mentions légales, politique de confidentialité).',
  alternates: { canonical: `${SITE.url}/ressources` },
  openGraph: {
    url: `${SITE.url}/ressources`,
    title: 'Ressources — Stackup Agency',
    description: 'Modèle de cahier des charges et documents officiels, gratuits et téléchargeables.',
    type: 'website',
  },
}

const RESSOURCES = [
  {
    href: '/ressources/cahier-des-charges',
    icon: FileText,
    titre: 'Modèle de cahier des charges',
    desc: 'Un modèle gratuit et téléchargeable pour cadrer votre projet de site internet avant de contacter un prestataire : objectifs, contenu, budget, délais.',
  },
  {
    href: '/ressources/documents',
    icon: Download,
    titre: 'Documents officiels',
    desc: 'CGV, contrat de prestation, mentions légales, politique de confidentialité : le cadre contractuel complet de Stackup Agency, consultable et téléchargeable.',
  },
]

export default function RessourcesPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Ressources', item: `${SITE.url}/ressources` },
    ],
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: 'Ressources' }]} />
          <p className="text-[13px] font-semibold text-gold uppercase tracking-[0.18em] mb-3">Gratuit</p>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">Ressources</h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Des modèles et documents gratuits pour préparer votre projet et comprendre le cadre contractuel Stackup Agency, sans engagement.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 gap-5">
          {RESSOURCES.map(r => (
            <Link key={r.href} href={r.href}
              className="group p-6 rounded-2xl bg-white border border-gray-100 hover:border-gold/40 hover:-translate-y-1 transition-all">
              <r.icon size={22} className="text-gold mb-4" />
              <h2 className="font-bold text-navy text-lg mb-2">{r.titre}</h2>
              <p className="text-navy/60 text-sm leading-relaxed mb-4">{r.desc}</p>
              <span className="inline-flex items-center gap-1 text-electric text-sm font-medium">
                Consulter <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
