import type { Metadata } from 'next'
import Link from 'next/link'
import { Download, ExternalLink } from 'lucide-react'
import { SITE } from '@/config/site'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: 'Documents officiels — Cadre contractuel | Stackup Agency',
  description: 'Téléchargez les documents officiels de Stackup Agency : CGV, contrat de prestation, mentions légales, politique de confidentialité et documents commerciaux.',
  alternates: { canonical: `${SITE.url}/ressources/documents` },
  openGraph: {
    url: `${SITE.url}/ressources/documents`,
    title: 'Documents officiels | Stackup Agency',
    description: 'Cadre contractuel complet : CGV, contrats, devis, factures. Chaque projet Stackup est encadré par un dispositif contractuel qui vous protège.',
    type: 'website',
  },
}

const GROUPS = [
  {
    label: 'Légal',
    docs: [
      {
        title: 'Conditions Générales de Vente',
        slug: 'cgv',
        pdf: '/documents/cgv.pdf',
        size: '174 Ko',
        desc: 'Régit l\'ensemble de la relation commerciale : tarifs, délais d\'intervention (72/48/24 h), propriété du code et modalités de résiliation. Inclut l\'Annexe 1 RGPD.',
      },
      {
        title: 'Mentions légales',
        slug: 'mentions-legales',
        pdf: '/documents/mentions-legales.pdf',
        size: '34 Ko',
        desc: 'Éditeur du site, hébergeur, propriété intellectuelle et droit applicable. Document obligatoire pour tout site web professionnel.',
      },
      {
        title: 'Politique de confidentialité',
        slug: 'politique-confidentialite',
        pdf: '/documents/politique-confidentialite.pdf',
        size: '53 Ko',
        desc: 'Données collectées, durées de conservation, droits d\'accès et de suppression, base légale du traitement. Conforme au RGPD.',
      },
    ],
  },
  {
    label: 'Contractuel',
    docs: [
      {
        title: 'Contrat de prestation de services',
        slug: null,
        pdf: '/documents/contrat-prestation.pdf',
        size: '129 Ko',
        desc: 'Contrat complet encadrant la mission : périmètre, livrables, délais, conditions de paiement, transfert de propriété du code à réception du solde.',
      },
      {
        title: 'Contrat de maintenance',
        slug: null,
        pdf: '/documents/contrat-maintenance.pdf',
        size: '108 Ko',
        desc: 'Détaille les engagements de support, les délais d\'intervention (72/48/24 h selon formule) et les conditions de résiliation mensuelle sans pénalité.',
      },
      {
        title: 'Cession de droits',
        slug: null,
        pdf: '/documents/cession-droits.pdf',
        size: '59 Ko',
        desc: 'Transfert explicite des droits patrimoniaux sur le code et les créations graphiques. Garantit que le site vous appartient intégralement à la livraison.',
      },
      {
        title: 'Accord de confidentialité (NDA)',
        slug: null,
        pdf: '/documents/nda-confidentialite.pdf',
        size: '54 Ko',
        desc: 'Protège les informations sensibles échangées pendant le projet (données métier, stratégie, accès). Engagement réciproque des deux parties.',
      },
      {
        title: 'Avenant au contrat',
        slug: null,
        pdf: '/documents/avenant-contrat.pdf',
        size: '48 Ko',
        desc: 'Formalise toute modification en cours de projet : ajout de périmètre, révision de délai ou ajustement de prix. Aucune modification sans avenant signé.',
      },
    ],
  },
  {
    label: 'Commercial',
    docs: [
      {
        title: 'Devis type',
        slug: null,
        pdf: '/documents/devis-type.pdf',
        size: '63 Ko',
        desc: 'Modèle de devis avec tableau de prestations détaillé, modalités de paiement et espace de signature. Valable 30 jours à compter de la date d\'émission.',
      },
      {
        title: 'Bon de commande',
        slug: null,
        pdf: '/documents/bon-de-commande.pdf',
        size: '57 Ko',
        desc: 'Document de validation de commande précisant les références du projet, les montants et l\'acompte requis pour démarrer la mission.',
      },
      {
        title: 'Facture type',
        slug: null,
        pdf: '/documents/facture-type.pdf',
        size: '40 Ko',
        desc: 'Modèle de facture avec toutes les mentions légales obligatoires, numérotation, TVA applicable et zone de règlement.',
      },
      {
        title: 'Procès-verbal de livraison',
        slug: null,
        pdf: '/documents/pv-livraison.pdf',
        size: '53 Ko',
        desc: 'Validation officielle de la recette du projet. Signature du client déclenchant le transfert définitif de propriété et le démarrage du support post-livraison.',
      },
    ],
  },
]

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-[#0A0F1C]">
      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: 'Ressources', href: '/ressources' }, { name: 'Documents officiels' }]} />
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Documents officiels
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Un cadre contractuel qui vous protège — chaque projet Stackup est encadré par un dispositif
            contractuel complet. Vous avez égaré un document reçu par email ? Retrouvez-le ici.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-14">
        {GROUPS.map(group => (
          <section key={group.label}>
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400 mb-5">{group.label}</h2>
            <div className="space-y-3">
              {group.docs.map(doc => (
                <div key={doc.pdf} className="flex items-start gap-4 bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-5">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{doc.title}</p>
                    <p className="text-xs text-gray-500 dark:text-white/50 leading-relaxed mb-3">{doc.desc}</p>
                    <p className="text-xs text-gray-600 dark:text-white/30 mb-0">{doc.size}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                    {doc.slug && (
                      <Link href={`/${doc.slug}`} className="inline-flex items-center gap-1 px-3 py-1.5 border border-white/20 text-white/70 text-xs font-medium rounded-lg hover:text-white hover:border-white/40 transition-colors">
                        <ExternalLink size={11} />
                        Consulter
                      </Link>
                    )}
                    <a href={doc.pdf} download className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors">
                      <Download size={12} />
                      Télécharger le PDF
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <p className="text-xs text-gray-600 dark:text-white/30 text-center">
          Les modèles commerciaux sont fournis à titre indicatif. Votre exemplaire personnalisé vous sera remis lors de votre projet.{' '}
          <Link href="/contact" className="text-blue-600 dark:text-blue-400 underline hover:text-blue-500 dark:hover:text-blue-300 transition-colors">Nous contacter →</Link>
        </p>
      </div>
    </div>
  )
}
