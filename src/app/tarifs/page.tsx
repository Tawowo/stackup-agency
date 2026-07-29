/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import { CheckCircle, ChevronRight } from 'lucide-react'
import { SITE } from '@/config/site'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata = {
  title: `Tarifs création site internet — À partir de ${SITE.pricing.vitrine}€ | Stackup Agency`,
  description: `Tarifs transparents pour la création de sites internet. Site vitrine ${SITE.pricing.vitrine}€, e-commerce ${SITE.pricing.ecommerce}€, système de gestion ${SITE.pricing.gestion}€. Pas de frais cachés.`,
  alternates: { canonical: `${SITE.url}/tarifs` },
  openGraph: {
    url: `${SITE.url}/tarifs`,
    title: `Tarifs création site internet — Stackup Agency`,
    description: `Tarifs transparents. Site vitrine dès ${SITE.pricing.vitrine}€, livraison en ${SITE.delais.vitrine}.`,
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Combien coûte un site internet professionnel ?', acceptedAnswer: { '@type': 'Answer', text: `Chez Stackup Agency, un site vitrine professionnel coûte ${SITE.pricing.vitrine}€. Un site multi-pages coûte ${SITE.pricing.multipages}€. Une boutique en ligne coûte ${SITE.pricing.ecommerce}€. Un système de gestion sur mesure coûte à partir de ${SITE.pricing.gestion}€. Ces prix sont tout inclus : design, développement, SEO, hébergement 12 mois et SSL.` } },
    { '@type': 'Question', name: "Y a-t-il des frais cachés ?", acceptedAnswer: { '@type': 'Answer', text: "Non, le prix affiché est le prix final. L'hébergement, le SSL et la formation de base sont inclus la première année. À partir de la 2e année, une maintenance optionnelle est proposée." } },
    { '@type': 'Question', name: "Comment se déroule le paiement ?", acceptedAnswer: { '@type': 'Answer', text: "Le paiement se fait en deux fois : 30% d'acompte au démarrage du projet, 70% à la livraison. Modes acceptés : virement bancaire, Stripe (carte bancaire)." } },
    { '@type': 'Question', name: "Proposez-vous des facilités de paiement ?", acceptedAnswer: { '@type': 'Answer', text: "Oui, pour les projets supérieurs à 500€, nous pouvons étudier un échelonnement sur 3 mensualités sans frais. Mentionnez-le dans votre demande de devis." } },
    { '@type': 'Question', name: "Puis-je bénéficier d'aides pour financer mon site ?", acceptedAnswer: { '@type': 'Answer', text: "Certaines aides régionales et dispositifs comme France Num peuvent couvrir une partie des frais de création de site internet pour les TPE. Renseignez-vous auprès de votre chambre de commerce." } },
  ],
}

export default function TarifsPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-[#0A0F1C]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: 'Tarifs' }]} />
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Tarifs clairs, sans surprise
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Site vitrine à partir de {SITE.pricing.vitrine}€, tout inclus : design, développement, SEO,
            hébergement 12 mois et SSL. Devis gratuit sous 72h.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-16">

        {/* Création */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">Création de site internet</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                titre: 'Site vitrine',
                prix: SITE.pricing.vitrine,
                delai: SITE.delais.vitrine,
                desc: 'Présence en ligne professionnelle pour artisans, commerçants et professions libérales.',
                inclus: ['1 page principale + mentions légales', 'Design sur mesure', 'SEO local', 'Hébergement 12 mois', 'SSL', 'Formulaire de contact'],
                href: '/services/site-vitrine',
                highlight: false,
              },
              {
                titre: 'Site multi-pages',
                prix: SITE.pricing.multipages,
                delai: SITE.delais.multipages,
                desc: 'Site complet avec blog, galerie, pages de service et formulaires avancés.',
                inclus: ['Jusqu\'à 10 pages', 'Blog + galerie', 'Formulaires avancés', 'Google Analytics', 'Hébergement 12 mois', 'SSL'],
                href: '/services/site-multi-pages',
                highlight: false,
              },
              {
                titre: 'Boutique en ligne',
                prix: SITE.pricing.ecommerce,
                delai: SITE.delais.ecommerce,
                desc: 'E-commerce complet avec paiement sécurisé, gestion des stocks et tableau de bord.',
                inclus: ['Catalogue illimité', 'Paiement Stripe', 'Gestion stocks', 'Emails auto', 'Click & Collect', 'Hébergement 12 mois'],
                href: '/services/site-ecommerce',
                highlight: true,
              },
              {
                titre: 'Site association',
                prix: SITE.pricing.association,
                delai: SITE.delais.association,
                desc: 'Site professionnel pour associations loi 1901 avec adhésion et événements.',
                inclus: ['Design associatif', 'Formulaire d\'adhésion', 'Calendrier', 'Hébergement 12 mois', 'SSL', 'Formation'],
                href: '/services/site-association',
                highlight: false,
              },
            ].map(s => (
              <div key={s.titre} className={`rounded-2xl border p-6 flex flex-col ${s.highlight ? 'border-amber-500/40 bg-amber-500/5' : 'border-navy/20 dark:border-white/10'}`}>
                {s.highlight && <div className="text-xs font-semibold text-amber-700 dark:text-amber-500 mb-3 uppercase tracking-wide">Le plus populaire</div>}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-foreground dark:text-white">{s.titre}</h3>
                  <span className="text-2xl font-bold text-amber-700 dark:text-amber-500 ml-3">{s.prix}€</span>
                </div>
                <p className="text-sm text-foreground/60 dark:text-white/60 mb-4">{s.desc}</p>
                <ul className="space-y-1.5 mb-5 flex-1">
                  {s.inclus.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground/70 dark:text-white/70">
                      <CheckCircle size={13} className="text-green-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-foreground/70 dark:text-white/40 mb-4">Livraison : {s.delai}</div>
                <Link href={s.href} className={`flex items-center justify-center gap-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${s.highlight ? 'bg-amber-500 hover:bg-amber-400 text-amber-950' : 'border border-foreground/20 dark:border-white/20 text-foreground dark:text-white hover:bg-foreground/5 dark:hover:bg-white/10'}`}>
                  Voir l'offre <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Système de gestion */}
        <section className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground dark:text-white">Système de gestion sur mesure</h2>
              <p className="text-foreground/60 dark:text-white/60 text-sm mt-1">Application métier 100% personnalisée</p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">à partir de {SITE.pricing.gestion}€</div>
              <div className="text-xs text-foreground/70 dark:text-white/50 mt-0.5">Livraison : 4 semaines</div>
            </div>
          </div>
          <p className="text-foreground/80 dark:text-white/80 mb-5">
            Logiciel sur mesure : caisse enregistreuse, système de réservation, CRM, gestion des stocks, planning...
            Conçu spécifiquement pour vos processus métier, données hébergées en France.
          </p>
          <div className="grid sm:grid-cols-3 gap-2 mb-6">
            {['Développement sur mesure', 'Interface d\'administration', 'Formation incluse', 'Données en France', 'Sans abonnement SaaS', 'Évolutions possibles'].map(item => (
              <div key={item} className="flex items-center gap-2 text-sm text-foreground/70 dark:text-white/70">
                <CheckCircle size={13} className="text-green-400 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/systeme-gestion" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors">
              Voir l'offre
            </Link>
            <Link href="/contact" className="px-5 py-2.5 border border-foreground/20 dark:border-white/20 text-foreground dark:text-white hover:bg-foreground/5 dark:hover:bg-white/10 text-sm font-semibold rounded-xl transition-colors">
              Demander un devis
            </Link>
          </div>
        </section>

        {/* Maintenance */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-2">Maintenance & hébergement</h2>
          <p className="text-foreground/60 dark:text-white/60 mb-6">Après la première année d'hébergement incluse, optez pour une maintenance mensuelle.</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { titre: 'Starter', prix: SITE.pricing.maintenanceStarter, inclus: ['Hébergement', 'SSL', 'Sauvegardes hebdo', 'Mises à jour sécurité', 'Réponse sous 72 h ouvrées'] },
              { titre: 'Pro', prix: SITE.pricing.maintenancePro, inclus: ['Tout Starter', 'Sauvegardes quotidiennes', '2h modifications/mois', 'Réponse sous 48 h ouvrées'] },
              { titre: 'Premium', prix: SITE.pricing.maintenancePremium, inclus: ['Tout Pro', '5h modifications/mois', 'Rapport mensuel SEO', 'Réponse sous 24 h ouvrées'] },
            ].map(m => (
              <div key={m.titre} className="rounded-2xl border border-navy/20 dark:border-white/10 p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-foreground dark:text-white">{m.titre}</h3>
                  <span className="text-xl font-bold text-amber-700 dark:text-amber-500">{m.prix}€<span className="text-sm font-normal text-foreground/70 dark:text-white/50">/mois</span></span>
                </div>
                <ul className="space-y-1.5">
                  {m.inclus.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground/60 dark:text-white/60">
                      <CheckCircle size={12} className="text-green-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Rédaction blog SEO */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-2">Rédaction blog SEO</h2>
          <p className="text-foreground/60 dark:text-white/60 mb-6">Des articles optimisés pour Google, rédigés par des professionnels. Boostez votre référencement naturel sans écrire une ligne.</p>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            {[
              { titre: 'Article à l\'unité', prix: '25', unite: '/article', inclus: ['Article 800–1 200 mots', 'Recherche de mots-clés', 'Structure Hn optimisée', 'Méta-titre & description', 'Livraison 5 jours ouvrés'] },
              { titre: 'Pack Visibilité', prix: '89', unite: '/mois', inclus: ['4 articles/mois', 'Calendrier éditorial', 'Recherche de mots-clés', 'Optimisation SEO on-page', 'Rapport mensuel positions'], highlight: true },
              { titre: 'Pack Autorité', prix: '159', unite: '/mois', inclus: ['8 articles/mois', 'Stratégie contenu 3 mois', 'Mots-clés longue traîne', 'Cocon sémantique', 'Rapport mensuel détaillé'] },
            ].map(p => (
              <div key={p.titre} className={`rounded-2xl border p-5 ${('highlight' in p && p.highlight) ? 'border-amber-500/40 bg-amber-500/5' : 'border-navy/20 dark:border-white/10'}`}>
                {('highlight' in p && p.highlight) && <div className="text-xs font-semibold text-amber-700 dark:text-amber-500 mb-2 uppercase tracking-wide">Le plus populaire</div>}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-foreground dark:text-white">{p.titre}</h3>
                  <span className="text-xl font-bold text-amber-700 dark:text-amber-500">{p.prix}€<span className="text-sm font-normal text-foreground/70 dark:text-white/50">{p.unite}</span></span>
                </div>
                <ul className="space-y-1.5">
                  {p.inclus.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground/60 dark:text-white/60">
                      <CheckCircle size={12} className="text-green-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 flex items-center justify-between gap-4">
            <div>
              <span className="font-semibold text-foreground dark:text-white text-sm">Accès technique blog</span>
              <span className="text-foreground/60 dark:text-white/60 text-sm ml-2">— Installation du blog sur votre site existant</span>
            </div>
            <span className="font-bold text-amber-700 dark:text-amber-500 flex-shrink-0">49€ <span className="text-foreground/60 dark:text-white/50 font-normal text-xs">une fois</span></span>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">Questions sur les tarifs</h2>
          <div className="space-y-3">
            {[
              { q: 'Combien coûte un site internet professionnel ?', a: `Chez Stackup Agency, un site vitrine professionnel coûte ${SITE.pricing.vitrine}€, tout inclus. Un site multi-pages coûte ${SITE.pricing.multipages}€. Une boutique en ligne coûte ${SITE.pricing.ecommerce}€. Un système de gestion sur mesure coûte à partir de ${SITE.pricing.gestion}€.` },
              { q: 'Y a-t-il des frais cachés ?', a: "Non, le prix affiché est le prix final. L'hébergement, le SSL et la formation de base sont inclus la première année. Pas de mauvaise surprise." },
              { q: 'Comment se déroule le paiement ?', a: "30% d'acompte au démarrage, 70% à la livraison. Virement bancaire ou carte bancaire (Stripe)." },
              { q: 'Proposez-vous des facilités de paiement ?', a: "Oui, pour les projets supérieurs à 500€, un échelonnement sur 3 mensualités sans frais est possible. Mentionnez-le dans votre demande." },
              { q: 'Puis-je bénéficier d\'aides pour financer mon site ?', a: "Certaines aides régionales et dispositifs comme France Num peuvent couvrir une partie des frais. Renseignez-vous auprès de votre chambre de commerce locale." },
            ].map(faq => (
              <details key={faq.q} className="group rounded-xl border border-navy/20 dark:border-white/10 overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-foreground dark:text-white list-none">
                  {faq.q}
                  <ChevronRight size={16} className="text-white/40 group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-4 pb-4 text-foreground/70 dark:text-white/70 text-sm">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric text-center">
          <h2 className="text-white font-bold text-xl mb-2">Obtenez votre devis personnalisé</h2>
          <p className="text-white/70 mb-4">Devis gratuit sous 72h. Premier rendez-vous sans engagement.</p>
          <Link href="/contact" className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-400 text-amber-950 font-semibold rounded-xl transition-all hover:-translate-y-0.5">
            Demander un devis gratuit →
          </Link>
        </div>
      </div>
    </div>
  )
}
