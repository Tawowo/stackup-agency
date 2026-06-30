import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Download } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Modèle de facture — Stackup Agency',
  description: 'Structure type des factures émises par Stackup Agency.',
}

export default function ModeleFacture() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0F1C] py-24 pt-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-electric hover:underline text-sm mb-8">
          <ArrowLeft size={16} /> Retour à l&apos;accueil
        </Link>
        <div className="flex items-start justify-between mb-3 gap-4">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Modèle de facture</h1>
          <a
            href="/documents/facture-type.pdf"
            download
            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 border border-electric text-electric text-sm font-semibold rounded-xl hover:bg-electric/10 transition-colors"
          >
            <Download size={15} />
            PDF
          </a>
        </div>
        <p className="text-sm text-gray-500 dark:text-white/40 mb-12">Structure type des factures émises par Stackup Agency</p>

        {/* Document preview */}
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-8 space-y-8 font-mono text-sm">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-gray-200 dark:border-white/10 pb-6">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white font-sans">Stackup Agency</div>
              <div className="text-gray-500 dark:text-white/50 mt-1">Valéry Reboul</div>
              <div className="text-gray-500 dark:text-white/50">706 rue des Cormiers</div>
              <div className="text-gray-500 dark:text-white/50">37340 Savigné-sur-Lathan</div>
              <div className="text-gray-500 dark:text-white/50">contact@stackup-agency.fr</div>
              <div className="text-gray-400 dark:text-white/30 text-xs mt-1">SIRET : [numéro dès attribution]</div>
              <div className="text-gray-400 dark:text-white/30 text-xs">TVA non applicable, art. 293 B du CGI</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-gray-900 dark:text-white">FACTURE N° XXXX</div>
              <div className="text-gray-500 dark:text-white/50 mt-1">Date d&apos;émission : JJ/MM/AAAA</div>
              <div className="text-gray-500 dark:text-white/50">Date d&apos;échéance : JJ/MM/AAAA</div>
              <div className="text-xs text-gray-400 dark:text-white/30 mt-1">Réf. devis : N° XXXX</div>
            </div>
          </div>

          {/* Client */}
          <div className="border border-gray-200 dark:border-white/10 rounded-xl p-4">
            <div className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/30 mb-2">Facturé à</div>
            <div className="text-gray-700 dark:text-white/70">[Nom / Raison sociale]</div>
            <div className="text-gray-500 dark:text-white/50">[Adresse]</div>
            <div className="text-gray-500 dark:text-white/50">[Email]</div>
          </div>

          {/* Prestation */}
          <div>
            <div className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/30 mb-3">Désignation</div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10">
                  <th className="text-left py-2 text-gray-700 dark:text-white/70">Désignation</th>
                  <th className="text-right py-2 text-gray-700 dark:text-white/70">Montant HT</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-white/5">
                  <td className="py-3 text-gray-700 dark:text-white/70">[Service] — [Réf. devis associé]</td>
                  <td className="py-3 text-right text-gray-700 dark:text-white/70">[XXX] €</td>
                </tr>
              </tbody>
              <tfoot className="border-t-2 border-gray-300 dark:border-white/20">
                <tr>
                  <td className="pt-3 font-bold text-gray-900 dark:text-white">TOTAL HT</td>
                  <td className="pt-3 text-right font-bold text-gray-900 dark:text-white">[XXX] €</td>
                </tr>
                <tr>
                  <td className="text-xs text-gray-400 dark:text-white/30">TVA non applicable, art. 293 B du CGI</td>
                  <td className="text-right text-xs text-gray-400 dark:text-white/30">0 €</td>
                </tr>
                <tr>
                  <td className="pt-2 font-bold text-electric">TOTAL TTC</td>
                  <td className="pt-2 text-right font-bold text-electric">[XXX] €</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Paiement */}
          <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 space-y-2">
            <div className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/30 mb-2">Mode de règlement</div>
            <div className="text-gray-700 dark:text-white/70">Virement bancaire</div>
            <div className="text-gray-500 dark:text-white/50 text-xs">IBAN : [à compléter]</div>
          </div>

          {/* Mentions légales */}
          <div className="border-t border-gray-200 dark:border-white/10 pt-6">
            <div className="text-xs text-gray-400 dark:text-white/30 leading-relaxed">
              En cas de retard de paiement : pénalités au taux légal en vigueur (3 fois le taux d&apos;intérêt légal) + indemnité forfaitaire de 40 € pour frais de recouvrement (Art. L441-10 du Code de commerce).
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 dark:text-white/30 text-center mt-6">
          Les factures réelles sont émises après signature du devis et versement de l&apos;acompte.{' '}
          <Link href="/cgv" className="text-electric hover:underline">Voir nos CGV →</Link>
        </p>
      </div>
    </main>
  )
}
