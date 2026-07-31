/* eslint-disable react/no-unescaped-entities */
import { SITE } from '@/config/site'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { CheckCircle, Download, FileText } from 'lucide-react'

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

const SECTIONS = [
  { titre: 'Présentation de votre activité', desc: 'Secteur, positionnement, concurrents, cible client' },
  { titre: 'Objectifs du site', desc: 'Générer des leads, vendre en ligne, informer, recruter…' },
  { titre: 'Fonctionnalités requises', desc: 'Pages, formulaires, boutique, espace client…' },
  { titre: 'Charte graphique', desc: 'Logo, couleurs, typographie, exemples de sites aimés' },
  { titre: 'Contenus', desc: 'Textes fournis ou à rédiger, photos, vidéos' },
  { titre: 'Budget et délais', desc: 'Enveloppe indicative, date de mise en ligne souhaitée' },
]

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
    <div className="min-h-screen bg-background dark:bg-[#0A0F1C]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: 'Ressources', href: '/ressources/documents' }, { name: 'Cahier des charges' }]} />
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">Cahier des charges site internet</h1>
          <p className="text-white/60 text-lg">Un bon cahier des charges est la clé d'un projet livré dans les délais et dans le budget.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-12">

        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-4">Pourquoi rédiger un cahier des charges ?</h2>
          <p className="text-foreground/70 dark:text-white/70 mb-4">
            Un cahier des charges bien rédigé évite les malentendus, accélère la phase de brief et vous permet d'obtenir des devis comparables d'une agence à l'autre.
            C'est votre référence tout au long du projet.
          </p>
          <p className="text-foreground/70 dark:text-white/70">
            Il n'a pas besoin d'être exhaustif pour être utile. L'essentiel : définir vos objectifs, votre cible et vos contraintes de budget et délai.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">Les 6 sections essentielles</h2>
          <div className="space-y-3">
            {SECTIONS.map((s, i) => (
              <div key={s.titre} className="flex items-start gap-4 p-4 rounded-xl border border-navy/15 dark:border-white/10">
                <div className="w-8 h-8 rounded-full bg-electric/10 text-electric flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</div>
                <div>
                  <div className="font-semibold text-foreground dark:text-white text-sm">{s.titre}</div>
                  <div className="text-xs text-foreground/50 dark:text-white/40 mt-0.5">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA téléchargement — le document officiel est sur /ressources/documents */}
        <div className="rounded-2xl border border-electric/20 bg-electric/5 p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-xl bg-electric/10 flex items-center justify-center flex-shrink-0">
            <FileText size={24} className="text-electric" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-foreground dark:text-white mb-1">Modèle complet disponible</div>
            <p className="text-sm text-foreground/60 dark:text-white/50">
              Notre modèle de cahier des charges est disponible parmi nos documents officiels, avec notre contrat de prestation et nos CGV.
            </p>
          </div>
          <Link
            href="/ressources/documents"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-electric hover:bg-navy text-white font-semibold rounded-xl text-sm transition-colors"
          >
            <Download size={14} /> Télécharger
          </Link>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-4">Conseils pratiques</h2>
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

        <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric text-center">
          <h2 className="text-white font-bold text-lg mb-2">Pas encore de cahier des charges ?</h2>
          <p className="text-white/70 text-sm mb-4">Notre devis express vous pose les bonnes questions en 5 minutes.</p>
          <Link href="/devis" className="inline-block px-8 py-3 bg-gold hover:bg-gold/90 text-ink font-bold rounded-xl transition-all hover:-translate-y-0.5 text-sm">
            Devis express →
          </Link>
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
