/* eslint-disable react/no-unescaped-entities */
import { SITE } from '@/config/site'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { CheckCircle, FileText } from 'lucide-react'
import CahierClient from './CahierClient'

export const metadata = {
  title: { absolute: 'Cahier des charges site internet — Modèle gratuit | Stackup' },
  description: 'Modèle de cahier des charges pour votre projet de site internet. Objectifs, cibles, fonctionnalités, budget, délais : toutes les sections essentielles. Gratuit.',
  alternates: { canonical: `${SITE.url}/ressources/cahier-des-charges` },
  openGraph: {
    url: `${SITE.url}/ressources/cahier-des-charges`,
    title: 'Modèle de cahier des charges site internet',
    description: 'Modèle complet et gratuit pour bien cadrer votre projet web avant de contacter une agence.',
    type: 'website',
  },
}


const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Ressources', item: `${SITE.url}/ressources` },
    { '@type': 'ListItem', position: 3, name: 'Cahier des charges', item: `${SITE.url}/ressources/cahier-des-charges` },
  ],
}

export default function CahierDesChargesPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: 'Ressources', href: '/ressources/documents' }, { name: 'Cahier des charges' }]} />
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">Cahier des charges site internet</h1>
          <p className="text-white/60 text-lg">Un bon cahier des charges est la clé d'un projet livré dans les délais et dans le budget.</p>
        </div>
      </div>

      {/* Interactive guided form */}
      <CahierClient />

      {/* Static SEO content below */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 space-y-10 border-t border-white/5 pt-10">
        <section>
          <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Pourquoi rédiger un cahier des charges ?</h2>
          <p className="text-foreground/70 dark:text-white/70 mb-4">
            Un cahier des charges bien rédigé évite les malentendus, accélère la phase de brief et vous permet d'obtenir des devis comparables d'une agence à l'autre.
          </p>
          <p className="text-foreground/70 dark:text-white/70">
            Il n'a pas besoin d'être exhaustif pour être utile. L'essentiel : définir vos objectifs, votre cible et vos contraintes de budget et délai.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Conseils pratiques</h2>
          <ul className="space-y-3">
            {[
              'Commencez par les objectifs, pas par la liste de fonctionnalités',
              'Identifiez 3 sites que vous aimez et expliquez pourquoi',
              'Précisez si vous fournissez les textes et photos ou si c\'est à l\'agence de les produire',
              'Indiquez une fourchette de budget — cela aide à proposer la bonne solution',
              'Mentionnez votre échéance : inauguration, événement, ouverture…',
            ].map(tip => (
              <li key={tip} className="flex items-start gap-3 text-foreground/70 dark:text-white/60 text-sm">
                <CheckCircle size={15} className="text-success flex-shrink-0 mt-0.5" />
                {tip}
              </li>
            ))}
          </ul>
        </section>

        <div className="rounded-2xl border border-electric/20 bg-electric/5 p-5 flex items-center gap-4">
          <FileText size={20} className="text-electric flex-shrink-0" />
          <div className="flex-1 text-sm text-foreground/60 dark:text-white/50">
            Notre modèle de cahier des charges officiel est disponible parmi nos <Link href="/ressources/documents" className="text-electric hover:underline">documents à télécharger</Link>.
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm border-t border-navy/10 dark:border-white/10 pt-6">
          <Link href="/outils" className="text-electric hover:underline">Nos outils gratuits →</Link>
          <Link href="/comparatif/wix-wordpress-sur-mesure" className="text-electric hover:underline">Comparatif solutions →</Link>
          <Link href="/services" className="text-electric hover:underline">Nos services →</Link>
        </div>
      </div>
    </div>
  )
}
