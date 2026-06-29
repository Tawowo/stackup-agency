import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Politique de cookies — Stackup Agency',
  description: 'Informations sur les cookies utilisés par stackup-agency.fr',
}

export default function Cookies() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0F1C] py-24 pt-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-electric hover:underline text-sm mb-8">
          <ArrowLeft size={16} /> Retour à l&apos;accueil
        </Link>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Politique de cookies</h1>
        <p className="text-gray-500 dark:text-white/50 text-sm mb-12">Dernière mise à jour : juin 2026</p>

        <div className="prose dark:prose-invert prose-sm max-w-none space-y-10">
          <section>
            <h2>1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
            <p>Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de la visite d&apos;un site web. Il permet au site de mémoriser des informations sur votre visite.</p>
          </section>

          <section>
            <h2>2. Cookies utilisés sur ce site</h2>
            <p>Ce site utilise <strong>uniquement des cookies techniques strictement nécessaires</strong> à son fonctionnement :</p>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10">
                  <th className="text-left py-2 pr-4">Nom</th>
                  <th className="text-left py-2 pr-4">Finalité</th>
                  <th className="text-left py-2">Durée</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-white/5">
                  <td className="py-2 pr-4 font-mono">theme</td>
                  <td className="py-2 pr-4">Mémorise votre préférence de thème (clair/sombre)</td>
                  <td className="py-2">Session</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-white/5">
                  <td className="py-2 pr-4 font-mono">cookie-consent</td>
                  <td className="py-2 pr-4">Mémorise votre acceptation de la politique de cookies</td>
                  <td className="py-2">1 an</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2>3. Cookies tiers et publicité</h2>
            <p>Ce site <strong>n&apos;utilise aucun cookie publicitaire, analytique tiers ou de tracking</strong>. Aucune donnée de navigation n&apos;est partagée avec des réseaux publicitaires.</p>
          </section>

          <section>
            <h2>4. Gestion des cookies</h2>
            <p>Vous pouvez à tout moment supprimer les cookies stockés dans votre navigateur via les paramètres de celui-ci :</p>
            <ul>
              <li><strong>Chrome</strong> : Paramètres → Confidentialité et sécurité → Cookies</li>
              <li><strong>Firefox</strong> : Paramètres → Vie privée et sécurité → Cookies</li>
              <li><strong>Safari</strong> : Préférences → Confidentialité → Gérer les données des sites web</li>
              <li><strong>Edge</strong> : Paramètres → Confidentialité, recherche et services → Cookies</li>
            </ul>
            <p>La désactivation des cookies techniques peut affecter le fonctionnement du site (notamment la mémorisation du thème).</p>
          </section>

          <section>
            <h2>5. Contact</h2>
            <p>Pour toute question relative aux cookies : <a href="mailto:contact@stackup-agency.fr" className="text-electric">contact@stackup-agency.fr</a></p>
          </section>
        </div>
      </div>
    </main>
  )
}
