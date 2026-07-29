import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Site Web pour Associations — Stackup Agency',
  description: 'Site professionnel clé en main pour associations, clubs et structures à but non lucratif — livré en 7 jours ouvrés à partir de 149€.',
  alternates: { canonical: 'https://stackup-agency.fr/services/site-association' },
  openGraph: {
    url: 'https://stackup-agency.fr/services/site-association',
    title: 'Site Web pour Associations — Stackup Agency',
    description: 'Site professionnel clé en main pour associations, clubs et structures à but non lucratif — livré en 7 jours ouvrés à partir de 149€.',
    type: 'website',
  },
}

const features = [
  'Design simple et professionnel aux couleurs de votre association',
  'Certificat SSL inclus',
  'Page de présentation de votre association',
  'Calendrier des événements',
  'Formulaire de contact et d\'adhésion',
  'SEO de base (référencement local)',
  'Responsive mobile & tablette',
  'Support technique 15 jours post-livraison',
]

const included = [
  'Jusqu\'à 4 pages',
  '1 révision incluse',
  'Hébergement offert 1 an',
  'Formation à l\'administration',
  'Mentions légales et RGPD',
]

const process = [
  { step: 'Échange initial', desc: 'Découverte de votre association, de vos besoins et de votre audience cible.' },
  { step: 'Maquette', desc: 'Proposition visuelle rapide pour validation avant développement.' },
  { step: 'Développement', desc: 'Intégration du design, du contenu et des fonctionnalités.' },
  { step: 'Validation', desc: 'Relecture et ajustements selon vos retours.' },
  { step: 'Mise en ligne', desc: 'Déploiement sur votre domaine avec configuration SSL.' },
]

const faq = [
  { q: 'L\'offre est-elle éligible aux subventions associatives ?', a: 'Oui. Nous pouvons fournir toutes les pièces justificatives nécessaires à votre demande de subvention numérique (devis, facture, description des prestations).' },
  { q: 'Pouvons-nous gérer le contenu nous-mêmes ?', a: 'Oui, nous intégrons une interface d\'administration simple et vous formons à son utilisation. Vos bénévoles peuvent mettre à jour les événements et actualités en autonomie.' },
  { q: 'L\'hébergement est-il vraiment inclus ?', a: 'Oui, l\'hébergement est offert la première année. À partir de la deuxième année, un abonnement maintenance à partir de 29€/mois prend le relais.' },
  { q: 'Qui peut bénéficier de cette offre ?', a: 'Tous types de structures : clubs sportifs, associations culturelles, amicales, groupes locaux, associations de parents d\'élèves, comités des fêtes, etc.' },
]

export default function SiteAssociationPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0F1C]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#1E3A5F] to-[#0F172A] py-24 pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/#services" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft size={16} />
            Retour aux services
          </Link>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4">Site Web pour Associations</h1>
          <p className="text-base sm:text-xl text-white/70">Un site professionnel pour votre association, club ou structure à but non lucratif.</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/60">
            <span>⏱ Délai : 7 jours ouvrés</span>
            <span>💰 À partir de 149€</span>
          </div>
          <p className="mt-3 text-xs text-white/40 max-w-xl">Délais détaillés dans nos <a href="/cgv" className="underline hover:text-white/60 transition-colors">CGV</a>.</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {['Clubs sportifs', 'Associations culturelles', 'Amicales', 'Groupes locaux'].map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        {/* Description */}
        <section>
          <div className="prose prose-lg dark:prose-invert max-w-none space-y-4">
            <p className="text-gray-700 dark:text-white/70 leading-relaxed">Les associations méritent une présence digitale sérieuse. Trop souvent, faute de budget ou de compétences techniques, les associations se retrouvent avec des sites obsolètes, peu accessibles ou inexistants. Chez Stackup Agency, nous avons créé une offre spécifiquement pensée pour les structures associatives.</p>
            <p className="text-gray-700 dark:text-white/70 leading-relaxed">Notre offre Site Association permet à votre structure de disposer d&apos;un site web professionnel, moderne et fonctionnel à un tarif adapté aux budgets associatifs. Adhérents, bénévoles, partenaires et donateurs potentiels trouveront toutes les informations dont ils ont besoin.</p>
            <p className="text-gray-700 dark:text-white/70 leading-relaxed">Nous construisons un site qui présente clairement votre mission, vos activités, vos membres actifs et vos événements à venir. Le formulaire d&apos;adhésion en ligne simplifie le recrutement de nouveaux membres, et la page actualités vous permet de maintenir votre communauté informée.</p>
            <p className="text-gray-700 dark:text-white/70 leading-relaxed">Le tout est livré en 7 jours ouvrés, hébergement inclus la première année, avec une formation à l&apos;administration pour que votre équipe puisse gérer le contenu en toute autonomie.</p>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Features */}
          <section className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-gray-100 dark:border-white/10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Ce qui est inclus</h2>
            <ul className="space-y-3">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-electric/10 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-electric" />
                  </div>
                  <span className="text-gray-700 dark:text-white/70 text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Included */}
          <section className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-gray-100 dark:border-white/10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Détail de l&apos;offre</h2>
            <ul className="space-y-3">
              {included.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-green-500" />
                  </div>
                  <span className="text-gray-700 dark:text-white/70 text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Process */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Notre processus</h2>
          <div className="space-y-4">
            {process.map((p, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-electric/10 flex items-center justify-center flex-shrink-0 text-electric font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{p.step}</h3>
                  <p className="text-gray-600 dark:text-white/60 text-sm">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Questions fréquentes</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.q}</h3>
                <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl p-8 bg-gradient-to-br from-[#1E3A5F] to-[#0F172A] text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Prêt à créer le site de votre association ?</h2>
          <p className="text-white/70 mb-6">Livraison en 7 jours ouvrés. Hébergement offert la première année. À partir de 149€.</p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#F59E0B] hover:bg-amber-500 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5"
          >
            Créer le site de votre association
          </Link>
        </section>
      </div>
    </main>
  )
}
