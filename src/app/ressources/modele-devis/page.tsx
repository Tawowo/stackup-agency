import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Download } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Modèle de devis — Stackup Agency',
  description: 'Structure type des devis émis par Stackup Agency pour vos projets web.',
}

export default function ModeleDevis() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0F1C] py-24 pt-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-electric hover:underline text-sm mb-8">
          <ArrowLeft size={16} /> Retour à l&apos;accueil
        </Link>
        <div className="flex items-start justify-between mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">Modèle de devis</h1>
            <p className="text-sm text-gray-500 dark:text-white/40">Structure type des devis émis par Stackup Agency</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
            <a
              href="/documents/devis-type.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2 border border-electric text-electric text-sm font-semibold rounded-xl hover:bg-electric/10 transition-colors"
            >
              <Download size={15} />
              PDF
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-4 py-2 bg-electric text-white text-sm font-semibold rounded-xl hover:bg-electric/90 transition-colors"
            >
              Demander un devis
            </Link>
          </div>
        </div>

        {/* Document preview */}
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 p-8 space-y-8 font-mono text-sm">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-gray-200 dark:border-white/10 pb-6">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white non-mono font-sans">Stackup Agency</div>
              <div className="text-gray-500 dark:text-white/50 mt-1">Valéry Reboul</div>
              <div className="text-gray-500 dark:text-white/50">706 rue des Cormiers</div>
              <div className="text-gray-500 dark:text-white/50">37340 Savigné-sur-Lathan</div>
              <div className="text-gray-500 dark:text-white/50">contact@stackup-agency.fr</div>
              <div className="text-gray-400 dark:text-white/30 text-xs mt-1">TVA non applicable, art. 293 B du CGI</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-gray-900 dark:text-white">DEVIS N° XXXX</div>
              <div className="text-gray-500 dark:text-white/50 mt-1">Date : JJ/MM/AAAA</div>
              <div className="text-gray-500 dark:text-white/50">Validité : 30 jours</div>
            </div>
          </div>

          {/* Client */}
          <div className="border border-gray-200 dark:border-white/10 rounded-xl p-4">
            <div className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/30 mb-2">Client</div>
            <div className="text-gray-700 dark:text-white/70">[Nom / Raison sociale]</div>
            <div className="text-gray-500 dark:text-white/50">[Adresse]</div>
            <div className="text-gray-500 dark:text-white/50">[Email]</div>
          </div>

          {/* Prestation */}
          <div>
            <div className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/30 mb-3">Désignation de la prestation</div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10">
                  <th className="text-left py-2 text-gray-700 dark:text-white/70">Désignation</th>
                  <th className="text-right py-2 text-gray-700 dark:text-white/70">Montant HT</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-white/5">
                  <td className="py-3 text-gray-700 dark:text-white/70">[Service choisi — description détaillée]</td>
                  <td className="py-3 text-right text-gray-700 dark:text-white/70">[XXX] €</td>
                </tr>
                <tr>
                  <td className="py-3 text-gray-500 dark:text-white/40 text-xs italic">[Options / prestations complémentaires]</td>
                  <td className="py-3 text-right text-gray-500 dark:text-white/40">[XX] €</td>
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
            <div className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/30 mb-2">Modalités de paiement</div>
            <div className="text-gray-700 dark:text-white/70">Acompte 40 % à la signature (soit <strong>[XXX] €</strong>)</div>
            <div className="text-gray-700 dark:text-white/70">Solde 60 % à la livraison (soit <strong>[XXX] €</strong>) — payable sous 30 jours</div>
            <div className="text-xs text-gray-500 dark:text-white/40 mt-1">Paiement par virement bancaire, PayPal ou carte via Stripe</div>
          </div>

          {/* Délai */}
          <div>
            <div className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/30 mb-2">Délai de réalisation</div>
            <div className="text-gray-700 dark:text-white/70">[X] jours ouvrés à compter de la réception du premier acompte et de l&apos;ensemble des éléments nécessaires (textes, images, accès).</div>
          </div>

          {/* Rétractation */}
          <div className="border-t border-gray-200 dark:border-white/10 pt-6">
            <div className="text-xs text-gray-400 dark:text-white/30 leading-relaxed">
              <strong>Droit de rétractation :</strong> Le client particulier dispose de 14 jours pour se rétracter (Art. L221-18 du Code de la consommation), sauf demande expresse de démarrage immédiat de la prestation.
            </div>
          </div>

          {/* Signature */}
          <div className="border-t border-gray-200 dark:border-white/10 pt-6 grid grid-cols-2 gap-8">
            <div>
              <div className="text-xs text-gray-400 dark:text-white/30 mb-6">Pour Stackup Agency</div>
              <div className="border-b border-gray-300 dark:border-white/20 pb-1 mb-1"></div>
              <div className="text-xs text-gray-400 dark:text-white/30">Valéry Reboul</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 dark:text-white/30 mb-6">Bon pour accord — Client</div>
              <div className="border-b border-gray-300 dark:border-white/20 pb-1 mb-1"></div>
              <div className="text-xs text-gray-400 dark:text-white/30">Date, signature et mention manuscrite</div>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 dark:text-white/30 text-center mt-6">
          Ce modèle est fourni à titre indicatif. Votre devis personnalisé sera émis après notre premier échange.{' '}
          <Link href="/#contact" className="text-electric hover:underline">Demander un devis gratuit →</Link>
        </p>
      </div>
    </main>
  )
}
