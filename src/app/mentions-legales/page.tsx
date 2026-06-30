import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Download } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mentions légales — Stackup Agency',
  description: 'Mentions légales du site stackup-agency.fr',
}

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0F1C] py-24 pt-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-electric hover:underline text-sm mb-8">
          <ArrowLeft size={16} /> Retour à l&apos;accueil
        </Link>
        <div className="flex items-start justify-between mb-3 gap-4">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Mentions légales</h1>
          <a
            href="/documents/mentions-legales.pdf"
            download
            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-electric text-white text-sm font-semibold rounded-xl hover:bg-electric/90 transition-colors"
          >
            <Download size={15} />
            PDF
          </a>
        </div>
        <p className="text-sm text-gray-500 dark:text-white/40 mb-12">Stackup Agency — Dernière mise à jour : 30 juin 2026</p>

        <div className="prose dark:prose-invert prose-sm max-w-none space-y-10">
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">1. Éditeur du site</h2>
            <div className="text-gray-700 dark:text-white/70 leading-relaxed space-y-1">
              <p>Le site <strong>stackup-agency.fr</strong> est édité par Stackup Agency, micro-entreprise en cours d&apos;immatriculation, représentée par Valéry Reboul.</p>
              <ul className="list-disc pl-5 space-y-1 mt-3">
                <li><strong>Représentant :</strong> Valéry Reboul</li>
                <li><strong>Adresse :</strong> 706 rue des Cormiers, 37340 Savigné-sur-Lathan</li>
                <li><strong>Email :</strong> <a href="mailto:contact@stackup-agency.fr" className="text-electric">contact@stackup-agency.fr</a></li>
                <li><strong>SIRET :</strong> En cours d&apos;attribution</li>
                <li><strong>Statut :</strong> Micro-entreprise</li>
                <li><strong>TVA :</strong> Non applicable, art. 293 B du CGI</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">2. Directeur de la publication</h2>
            <p className="text-gray-700 dark:text-white/70 leading-relaxed">Valéry Reboul</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">3. Hébergeur du site</h2>
            <div className="text-gray-700 dark:text-white/70 leading-relaxed">
              <p>Le site stackup-agency.fr est hébergé par :</p>
              <ul className="list-disc pl-5 space-y-1 mt-3">
                <li><strong>Vercel Inc.</strong></li>
                <li>340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</li>
                <li><a href="https://vercel.com" className="text-electric">vercel.com</a></li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">4. Hébergeur email</h2>
            <div className="text-gray-700 dark:text-white/70 leading-relaxed">
              <p>Les emails professionnels de Stackup Agency sont hébergés par :</p>
              <ul className="list-disc pl-5 space-y-1 mt-3">
                <li><strong>OVH SAS</strong></li>
                <li>2 rue Kellermann, 59100 Roubaix, France</li>
                <li><a href="https://ovhcloud.com" className="text-electric">ovhcloud.com</a></li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">5. Propriété intellectuelle</h2>
            <p className="text-gray-700 dark:text-white/70 leading-relaxed">
              L&apos;ensemble des éléments composant ce site (textes, images, logos, code source, charte graphique) est la propriété exclusive de Stackup Agency, sauf mention contraire. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l&apos;autorisation préalable et écrite de Stackup Agency.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">6. Limitation de responsabilité</h2>
            <div className="text-gray-700 dark:text-white/70 leading-relaxed space-y-3">
              <p>Stackup Agency s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations diffusées sur ce site. Cependant, Stackup Agency ne peut garantir l&apos;exactitude, la précision ou l&apos;exhaustivité des informations mises à disposition.</p>
              <p>Stackup Agency décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site, ainsi que pour tout dommage direct ou indirect résultant de l&apos;accès au site ou de l&apos;utilisation des informations qui y sont contenues.</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">7. Droit applicable et juridiction compétente</h2>
            <p className="text-gray-700 dark:text-white/70 leading-relaxed">
              Les présentes mentions légales sont soumises au droit français. En cas de litige, et après tentative de résolution amiable, les tribunaux français seront seuls compétents.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">8. Contact</h2>
            <p className="text-gray-700 dark:text-white/70 leading-relaxed">
              Pour toute question relative au site ou à son contenu :{' '}
              <a href="mailto:contact@stackup-agency.fr" className="text-electric hover:underline">contact@stackup-agency.fr</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
