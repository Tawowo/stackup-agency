import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Download } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente (CGV) | Stackup Agency',
  description: 'Conditions générales de vente de Stackup Agency. Modalités de commande, délais de livraison, paiement et garanties pour tous nos services de création web.',
  alternates: { canonical: 'https://stackup-agency.fr/cgv' },
  openGraph: {
    url: 'https://stackup-agency.fr/cgv',
    title: 'Conditions Générales de Vente (CGV) | Stackup Agency',
    description: 'Conditions générales de vente de Stackup Agency : commande, délais, paiement et garanties.',
    type: 'website',
  },
}

const sections = [
  {
    title: 'Article 1 — Identification du prestataire',
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Raison sociale :</strong> Stackup Agency, micro-entreprise</li>
        <li><strong>Représentant :</strong> Valéry Reboul</li>
        <li><strong>Adresse :</strong> 706 rue des Cormiers, 37340 Savigné-sur-Lathan</li>
        <li><strong>Email :</strong> <a href="mailto:contact@stackup-agency.fr" className="text-electric">contact@stackup-agency.fr</a></li>
        <li><strong>SIRET :</strong> En cours d&apos;attribution</li>
        <li><strong>TVA :</strong> Non applicable, art. 293 B du CGI</li>
      </ul>
    ),
  },
  {
    title: 'Article 2 — Objet',
    content: <p>Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre Stackup Agency et tout client passant commande pour les services suivants : création de sites web, applications, systèmes de gestion, maintenance et services associés.</p>,
  },
  {
    title: 'Article 3 — Services proposés et tarifs',
    content: (
      <div className="space-y-3">
        <p>Les tarifs sont indiqués TTC (TVA non applicable). Les délais sont indicatifs et exprimés en jours ouvrés :</p>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-white/10">
              <th className="text-left py-2 font-semibold">Service</th>
              <th className="text-left py-2 font-semibold">Tarif</th>
              <th className="text-left py-2 font-semibold">Délai</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {[
              ['Site Association', '149 €', '7 jours ouvrés'],
              ['Site Vitrine', '449 €', '10 jours ouvrés'],
              ['Site Multi-pages', '749 €', '17 jours ouvrés'],
              ['Site E-commerce', '1 647 €', '21 jours ouvrés'],
              ['Système de Gestion', '1 447 €', '21 jours ouvrés'],
              ['Maintenance Starter', '29 €/mois', 'Engagement mensuel'],
              ['Maintenance Pro', '44 €/mois', 'Engagement mensuel'],
              ['Maintenance Premium', '89 €/mois', 'Engagement mensuel'],
            ].map(([service, tarif, delai]) => (
              <tr key={service}>
                <td className="py-2">{service}</td>
                <td className="py-2">{tarif}</td>
                <td className="py-2">{delai}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-sm text-gray-500 dark:text-white/50">Stackup Agency se réserve le droit de prolonger les délais de <strong>20 jours ouvrés maximum</strong> en cas de forte demande ou d&apos;imprévu, avec notification préalable par email.</p>
      </div>
    ),
  },
  {
    title: 'Article 4 — Devis et commande',
    content: <p>Toute prestation fait l&apos;objet d&apos;un devis gratuit préalable, valable 30 jours. La commande est confirmée à réception du devis signé (ou accord écrit par email) et du versement du premier acompte.</p>,
  },
  {
    title: 'Article 5 — Modalités de paiement',
    content: (
      <div className="space-y-2">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>40 %</strong> du montant total à la signature du devis</li>
          <li><strong>60 %</strong> du solde à la livraison du projet — payable dans un délai de <strong>30 jours</strong> à compter de la date de livraison</li>
        </ul>
        <p>Paiement par virement bancaire, PayPal ou carte bancaire via Stripe.</p>
        <p>En cas de retard de paiement : pénalités au taux légal en vigueur (3 fois le taux d&apos;intérêt légal) + indemnité forfaitaire de <strong>40 €</strong> pour frais de recouvrement (Art. L441-10 du Code de commerce).</p>
      </div>
    ),
  },
  {
    title: 'Article 6 — Droit de rétractation',
    content: <p>Conformément à l&apos;article L221-18 du Code de la consommation, le client particulier dispose d&apos;un délai de <strong>14 jours</strong> pour se rétracter à compter de la signature du devis. Si le client souhaite que la prestation commence avant l&apos;expiration de ce délai, il doit en faire la demande expresse et écrite, ce qui entraîne la perte de son droit de rétractation une fois la prestation commencée.</p>,
  },
  {
    title: 'Article 7 — Livraison et réception',
    content: <p>À la livraison, le client dispose d&apos;un délai de validation pour signaler toute non-conformité avec les spécifications du devis. Passé ce délai sans retour écrit, la prestation est considérée comme acceptée. Les délais courent à compter de la réception de l&apos;acompte et de la transmission de l&apos;ensemble des éléments nécessaires (textes, images, accès, informations).</p>,
  },
  {
    title: 'Article 8 — Support et garantie après livraison',
    content: (
      <div className="space-y-2">
        <p>Après livraison, un support technique est inclus :</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Site Association :</strong> 15 jours ouvrés après livraison</li>
          <li><strong>Site Vitrine :</strong> 15 jours ouvrés après livraison</li>
          <li><strong>Site Multi-pages :</strong> 30 jours ouvrés après livraison</li>
          <li><strong>Site E-commerce :</strong> 30 jours ouvrés après livraison</li>
          <li><strong>Système de Gestion :</strong> 30 jours ouvrés après livraison</li>
        </ul>
        <p>Au-delà de cette période, un abonnement de maintenance (Starter / Pro / Premium) est nécessaire pour toute intervention technique.</p>
      </div>
    ),
  },
  {
    title: 'Article 9 — Propriété intellectuelle',
    content: <p>Une fois le solde intégralement réglé, le client devient pleinement propriétaire du code source et de tous les éléments livrés. Il peut librement réutiliser, modifier ou héberger le site ailleurs, sans restriction de la part de Stackup Agency.</p>,
  },
  {
    title: 'Article 10 — Responsabilité',
    content: <p>Stackup Agency s&apos;engage à fournir une prestation conforme aux spécifications du devis. La responsabilité de Stackup Agency ne peut être engagée en cas de mauvaise utilisation du site par le client après livraison, ni de modifications effectuées par un tiers non autorisé par Stackup Agency.</p>,
  },
  {
    title: 'Article 11 — Données et contenus fournis par le client',
    content: <p>Le client garantit disposer de tous les droits nécessaires sur les contenus qu&apos;il fournit (textes, images, logos, vidéos). Stackup Agency ne peut être tenu responsable d&apos;une utilisation non autorisée de contenus fournis par le client.</p>,
  },
  {
    title: 'Article 12 — Modifications de prix et de délais',
    content: <p>Les prix et délais indiqués sont susceptibles d&apos;évoluer selon la complexité du projet, le volume de contenu (notamment pour les sites e-commerce au-delà de 50 références produits) ou des demandes spécifiques du client. Tout ajustement tarifaire fait l&apos;objet d&apos;un avenant écrit et signé par les deux parties.</p>,
  },
  {
    title: 'Article 13 — Programme de parrainage',
    content: (
      <div className="space-y-2">
        <p>Le programme de parrainage de Stackup Agency fonctionne comme suit :</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Pour le parrain :</strong> 1 mois de maintenance offert (valeur jusqu&apos;à 89 €) pour chaque nouveau client signé grâce à sa recommandation</li>
          <li><strong>Pour le filleul :</strong> 10 % de réduction sur son premier projet</li>
        </ul>
        <p>Cette offre est cumulable et activée sur mention du nom du parrain lors de la prise de contact.</p>
      </div>
    ),
  },
  {
    title: 'Article 14 — Résiliation de la maintenance',
    content: <p>Les abonnements de maintenance sont sans engagement de durée minimum et peuvent être résiliés à tout moment par le client, avec un préavis de <strong>30 jours</strong> notifié par email à contact@stackup-agency.fr. Le client récupère intégralement son code source et ses données, sans frais ni contrainte.</p>,
  },
  {
    title: 'Article 15 — Médiation de la consommation',
    content: <p>Conformément à l&apos;article L.616-1 du Code de la consommation, en cas de litige non résolu à l&apos;amiable, le client particulier peut recourir gratuitement à un médiateur de la consommation agréé. Les coordonnées du médiateur compétent seront communiquées sur demande.</p>,
  },
  {
    title: 'Article 16 — Droit applicable et juridiction',
    content: <p>Les présentes CGV sont soumises au droit français. En cas de litige entre les parties, et après tentative de résolution amiable, les tribunaux français seront seuls compétents.</p>,
  },
  {
    title: 'Article 17 — Acceptation',
    content: <p>Toute commande passée auprès de Stackup Agency implique l&apos;acceptation pleine et entière des présentes Conditions Générales de Vente par le client. Ces CGV prévalent sur tout document du client.</p>,
  },
]

export default function CGV() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0F1C] py-24 pt-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-electric hover:underline text-sm mb-8">
          <ArrowLeft size={16} /> Retour à l&apos;accueil
        </Link>
        <div className="flex items-start justify-between mb-3 gap-4">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            Conditions Générales de Vente
          </h1>
          <a
            href="/documents/cgv.pdf"
            download
            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-electric text-white text-sm font-semibold rounded-xl hover:bg-electric/90 transition-colors"
          >
            <Download size={15} />
            PDF
          </a>
        </div>
        <p className="text-sm text-gray-500 dark:text-white/40 mb-12">Stackup Agency — Dernière mise à jour : 30 juin 2026</p>

        <div className="prose dark:prose-invert prose-sm max-w-none space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{section.title}</h2>
              <div className="text-gray-700 dark:text-white/70 leading-relaxed">{section.content}</div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
