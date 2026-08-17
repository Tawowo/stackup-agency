/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import { SITE } from '@/config/site'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FaqAccordion from '@/components/ui/FaqAccordion'

export const metadata = {
  title: 'FAQ — Questions fréquentes création de site',
  description: 'Toutes les réponses à vos questions sur la création de site internet : délais, prix, processus, paiement, hébergement, propriété du code, maintenance.',
  alternates: { canonical: `${SITE.url}/faq` },
  openGraph: {
    url: `${SITE.url}/faq`,
    title: 'FAQ — Stackup Agency',
    description: 'Réponses à toutes vos questions sur la création de site internet.',
    type: 'website',
  },
}

const FAQ_ITEMS = [
  {
    cat: 'Délais et processus',
    faqs: [
      { q: 'Quels sont les délais de livraison ?', a: `Site vitrine : ${SITE.delais.vitrine}. Site multi-pages : ${SITE.delais.multipages}. Boutique en ligne : ${SITE.delais.ecommerce}. Site association : ${SITE.delais.association}. Système de gestion : ${SITE.delais.gestion}. Les délais sont garantis contractuellement à partir de la validation du brief et du paiement de l'acompte.` },
      { q: 'Comment se déroule le processus de création ?', a: "1. Prise de contact et brief. 2. Devis et bon de commande. 3. Acompte de 30%. 4. Maquette. 5. Développement. 6. Retours et ajustements. 7. Livraison et mise en ligne. 8. Formation à la prise en main." },
      { q: 'Combien de modifications peut-on demander ?', a: "Deux rounds de retours sont inclus dans chaque projet. Des modifications supplémentaires sont facturées au taux horaire." },
      { q: 'Travaillez-vous à distance ou en présentiel ?', a: "Nous travaillons principalement à distance par visioconférence et email. Cela nous permet d'être réactifs pour tous nos clients en France, pas seulement en Touraine." },
    ],
  },
  {
    cat: 'Pourquoi Stackup Agency ?',
    faqs: [
      { q: 'Pourquoi vous plutôt qu\'une agence classique ?', a: 'Des tarifs 3 à 5 fois inférieurs à périmètre égal, car pas de bureaux à amortir ni de couches commerciales. Du code sur mesure en Next.js et TypeScript, pas de template. Un délai de 10 jours ouvrés contractuel pour un site vitrine. Et toutes nos démonstrations sont en ligne — pas de portfolio fantôme.' },
    ],
  },
  {
    cat: 'Tarifs et paiement',
    faqs: [
      { q: 'Quels sont les tarifs ?', a: `Site vitrine : ${SITE.pricing.vitrine}€. Site multi-pages : ${SITE.pricing.multipages}€. Boutique en ligne : ${SITE.pricing.ecommerce}€. Système de gestion : à partir de ${SITE.pricing.gestion}€. Site association : ${SITE.pricing.association}€. Ces prix sont tout inclus (design, développement, SEO, hébergement 12 mois, SSL).` },
      { q: 'Y a-t-il des frais cachés ?', a: "Non. Le prix affiché est le prix final. Hébergement, SSL et formation de base sont inclus la première année." },
      { q: 'Comment se déroule le paiement ?', a: "30% d'acompte au démarrage, 70% à la livraison. Virement bancaire ou carte bancaire via Stripe." },
      { q: 'Proposez-vous des facilités de paiement ?', a: "Pour les projets supérieurs à 500€, un échelonnement sur 3 mensualités sans frais est possible. Mentionnez-le lors de votre demande." },
      { q: 'Puis-je bénéficier d\'aides pour financer mon site ?', a: "Des dispositifs comme France Num peuvent aider les TPE à financer leur présence numérique. Renseignez-vous auprès de votre chambre de commerce locale." },
    ],
  },
  {
    cat: 'Technique et hébergement',
    faqs: [
      { q: 'Est-ce que je suis propriétaire du code ?', a: "Oui, à 100%. Une fois le projet livré et payé, le code vous appartient entièrement. Vous êtes libre de le modifier, de le transférer ou de changer d'hébergeur." },
      { q: 'Où est hébergé mon site ?', a: "Nos sites sont hébergés sur des serveurs français ou européens (OVH, Vercel, Scaleway). Vos données ne partent pas aux États-Unis." },
      { q: 'Que se passe-t-il après les 12 mois d\'hébergement inclus ?', a: `Vous pouvez opter pour l'une de nos offres de maintenance (à partir de ${SITE.pricing.maintenanceStarter}€/mois) ou récupérer votre code et gérer l'hébergement vous-même.` },
      { q: 'Mon site sera-t-il sécurisé ?', a: "Oui. Chaque site est livré avec un certificat SSL (HTTPS), des mises à jour de sécurité régulières et des sauvegardes automatiques." },
      { q: 'Mon site sera-t-il visible sur mobile ?', a: "Oui. Tous nos sites sont 100% responsive, optimisés pour mobile, tablette et desktop. Les performances mobiles sont testées avant livraison." },
    ],
  },
  {
    cat: 'Documents et contrats',
    faqs: [
      { q: 'Où retrouver mes documents ?', a: "Tous les documents officiels (CGV, contrat de prestation, devis, facture, NDA, avenant…) sont disponibles en téléchargement sur la page /ressources/documents. Votre exemplaire personnalisé vous est également remis par email en cours de projet." },
      { q: 'Avez-vous des CGV et un contrat ?', a: "Oui. Chaque projet est encadré par un contrat de prestation signé, des CGV complètes et une cession de droits explicite. Vous disposez d'un cadre contractuel solide dès le démarrage." },
    ],
  },
  {
    cat: 'SEO et visibilité',
    faqs: [
      { q: 'Le SEO est-il inclus ?', a: "Un SEO de base est inclus dans chaque projet : balises title et meta, structure HTML sémantique, données structurées Schema.org, sitemap XML, optimisation mobile et vitesse de chargement." },
      { q: 'Proposez-vous un accompagnement SEO continu ?', a: "Oui, nos offres de maintenance Pro et Premium incluent des rapports mensuels SEO et des recommandations d'optimisation." },
      { q: 'Comment être visible localement ?', a: "Nous optimisons chaque site pour le référencement local : balises geo, données structurées LocalBusiness, intégration Google Maps, et pages dédiées à votre ville et département." },
    ],
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.flatMap(cat =>
    cat.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    }))
  ),
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: 'FAQ' }]} />
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Questions fréquentes
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Tout ce que vous devez savoir avant de démarrer votre projet de site internet.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-12">
        {FAQ_ITEMS.map(cat => (
          <section key={cat.cat}>
            <h2 className="text-xl font-bold text-foreground dark:text-white mb-4 pb-2 border-b border-navy/10 dark:border-white/8">{cat.cat}</h2>
            <FaqAccordion items={cat.faqs} />
          </section>
        ))}

        <div className="rounded-xl border border-gold/20 bg-amber-50/30 dark:bg-gold/5 p-5 flex items-center gap-4 mb-6">
          <div className="flex-1">
            <div className="font-semibold text-foreground dark:text-white text-sm mb-0.5">Programme de parrainage</div>
            <p className="text-xs text-foreground/60 dark:text-white/60">Recommandez-nous et gagnez 1 mois de maintenance. Votre filleul reçoit −10% sur son projet.</p>
          </div>
          <Link href="/parrainage" className="flex-shrink-0 px-4 py-2 bg-gold hover:bg-gold/80 text-ink text-xs font-semibold rounded-xl transition-colors">
            Découvrir →
          </Link>
        </div>

        <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric text-center">
          <h2 className="text-white font-bold text-xl mb-2">Une question sans réponse ici ?</h2>
          <p className="text-white/70 mb-4">Contactez-nous directement. Nous répondons sous 72h.</p>
          <Link href="/contact" className="inline-block px-6 py-3 bg-gold hover:bg-gold/80 text-ink font-semibold rounded-xl transition-all hover:-translate-y-0.5">
            Nous contacter →
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-8 flex flex-wrap gap-4 text-sm">
        <Link href="/tarifs" className="text-electric hover:underline">Voir les tarifs →</Link>
        <Link href="/services" className="text-electric hover:underline">Nos services →</Link>
      </div>
    </div>
  )
}
