import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Download, FileText, FileCheck, FilePen, FileSignature, Presentation, ClipboardList } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Documents à Télécharger | Stackup Agency',
  description: 'Téléchargez tous les documents légaux et commerciaux de Stackup Agency : CGV, contrat de prestation, devis, facture, attestation.',
  alternates: { canonical: 'https://stackup-agency.fr/ressources/documents' },
  openGraph: {
    url: 'https://stackup-agency.fr/ressources/documents',
    title: 'Documents à Télécharger | Stackup Agency',
    description: 'Téléchargez tous les documents légaux et commerciaux de Stackup Agency.',
    type: 'website',
  },
}

const docs = [
  {
    category: 'Documents légaux',
    items: [
      {
        icon: FileText,
        title: 'Conditions Générales de Vente',
        description: 'CGV complètes — tarifs, délais, paiement, support, propriété intellectuelle (17 articles).',
        href: '/cgv',
        pdf: '/documents/cgv.pdf',
        filename: 'cgv.pdf',
      },
      {
        icon: FileText,
        title: 'Mentions légales',
        description: 'Éditeur, hébergeur, propriété intellectuelle et droit applicable.',
        href: '/mentions-legales',
        pdf: '/documents/mentions-legales.pdf',
        filename: 'mentions-legales.pdf',
      },
    ],
  },
  {
    category: 'Documents commerciaux',
    items: [
      {
        icon: FilePen,
        title: 'Contrat de prestation de services',
        description: 'Contrat complet à imprimer, remplir et faire signer. Inclut tous les articles essentiels.',
        href: null,
        pdf: '/documents/contrat-prestation.pdf',
        filename: 'contrat-prestation.pdf',
      },
      {
        icon: FileCheck,
        title: 'Devis type',
        description: 'Modèle de devis avec tableau de prestations, modalités de paiement et espace de signature.',
        href: '/ressources/modele-devis',
        pdf: '/documents/devis-type.pdf',
        filename: 'devis-type.pdf',
      },
      {
        icon: FileCheck,
        title: 'Facture type',
        description: 'Modèle de facture avec mentions légales obligatoires et zone de règlement.',
        href: '/ressources/modele-facture',
        pdf: '/documents/facture-type.pdf',
        filename: 'facture-type.pdf',
      },
      {
        icon: Presentation,
        title: 'Présentation Stackup Agency',
        description: 'Document "Comment ça se passe" — 7 étapes, tarifs et engagements. Idéal pour vos premiers échanges.',
        href: null,
        pdf: '/documents/presentation-stackup.pdf',
        filename: 'presentation-stackup.pdf',
      },
      {
        icon: FileSignature,
        title: 'Avenant au contrat',
        description: 'Document de modification de contrat en cours de projet — prix, délai, périmètre.',
        href: null,
        pdf: '/documents/avenant-contrat.pdf',
        filename: 'avenant-contrat.pdf',
      },
      {
        icon: ClipboardList,
        title: 'Attestation de fin de projet',
        description: 'Procès-verbal de réception — validation client et déclenchement du support post-livraison.',
        href: null,
        pdf: '/documents/attestation-fin-projet.pdf',
        filename: 'attestation-fin-projet.pdf',
      },
    ],
  },
]

export default function DocumentsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0F1C] py-24 pt-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-electric hover:underline text-sm mb-8">
          <ArrowLeft size={16} /> Retour à l&apos;accueil
        </Link>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">Documents</h1>
        <p className="text-sm text-gray-500 dark:text-white/40 mb-12">
          Tous les documents légaux et commerciaux de Stackup Agency, disponibles en téléchargement PDF.
        </p>

        <div className="space-y-12">
          {docs.map((group) => (
            <div key={group.category}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-electric mb-4">{group.category}</h2>
              <div className="space-y-3">
                {group.items.map((doc) => {
                  const Icon = doc.icon
                  return (
                    <div
                      key={doc.filename}
                      className="flex items-start gap-4 bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-5"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-electric/10 flex items-center justify-center">
                        <Icon size={18} className="text-electric" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white text-sm">{doc.title}</p>
                            <p className="text-xs text-gray-500 dark:text-white/50 mt-0.5 leading-relaxed">{doc.description}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {doc.href && (
                              <Link
                                href={doc.href}
                                className="text-xs text-electric hover:underline whitespace-nowrap"
                              >
                                Voir
                              </Link>
                            )}
                            <a
                              href={doc.pdf}
                              download={doc.filename}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-electric text-white text-xs font-semibold rounded-lg hover:bg-electric/90 transition-colors"
                            >
                              <Download size={12} />
                              PDF
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 dark:text-white/30 text-center mt-10">
          Les documents commerciaux sont des modèles. Votre exemplaire personnalisé vous sera remis lors de votre projet.{' '}
          <Link href="/#contact" className="text-electric hover:underline">Nous contacter →</Link>
        </p>
      </div>
    </main>
  )
}
