/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import { CheckCircle, ChevronRight } from 'lucide-react'
import { SITE } from '@/config/site'
import MiniHero from '@/components/ui/MiniHero'
import PricingCards from '@/components/tarifs/PricingCards'
import TarifsShelf from '@/components/tarifs/TarifsShelf'
import EncartRentree from '@/components/rentree/EncartRentree'
import DecorProfondeur from '@/components/ui/DecorProfondeur'

export const metadata = {
  title: `Tarifs création site internet — À partir de ${SITE.pricing.vitrine}€`,
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
    { '@type': 'Question', name: "Comment se déroule le paiement ?", acceptedAnswer: { '@type': 'Answer', text: "Le paiement se fait en deux fois : 30% d'acompte au démarrage du projet, 70% à la livraison. Modes acceptés : virement bancaire ou carte bancaire (paiement en ligne sécurisé)." } },
    { '@type': 'Question', name: "Proposez-vous des facilités de paiement ?", acceptedAnswer: { '@type': 'Answer', text: "Oui, pour les projets supérieurs à 500€, nous pouvons étudier un échelonnement sur 3 mensualités sans frais. Mentionnez-le dans votre demande de devis." } },
    { '@type': 'Question', name: "Puis-je bénéficier d'aides pour financer mon site ?", acceptedAnswer: { '@type': 'Answer', text: "Certaines aides régionales et dispositifs comme France Num peuvent couvrir une partie des frais de création de site internet pour les TPE. Renseignez-vous auprès de votre chambre de commerce." } },
  ],
}

export default function TarifsPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] relative overflow-hidden">
      <DecorProfondeur variant="warm" seed={1} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <MiniHero
        title="Tarifs clairs, sans surprise"
        subtitle={`Site vitrine à partir de ${SITE.pricing.vitrine}€, tout inclus : design, développement, SEO, hébergement 12 mois et SSL. Devis gratuit sous 72h.`}
        breadcrumb={[{ name: 'Tarifs' }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-16">

        {/* Étagères */}
        <TarifsShelf />

        {/* Création */}
        <section>
          <h2 className="text-2xl font-bold text-navy mb-6">Création de site internet</h2>
          <PricingCards cards={[
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
              inclus: ['Catalogue illimité', 'Paiement en ligne sécurisé', 'Gestion stocks', 'Emails auto', 'Click & Collect', 'Hébergement 12 mois'],
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
          ]} />
        </section>

        <EncartRentree />

        {/* Système de gestion */}
        <section className="rounded-2xl border border-electric/30 bg-blue-500/5 p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground dark:text-white">Système de gestion sur mesure</h2>
              <p className="text-foreground/60 dark:text-white/60 text-sm mt-1">Application métier 100% personnalisée</p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-3xl font-bold text-electric-ink dark:text-electric">à partir de {SITE.pricing.gestion}€</div>
              <div className="text-xs text-foreground/70 dark:text-white/50 mt-0.5">Livraison : {SITE.delais.gestion}</div>
            </div>
          </div>
          <p className="text-foreground/80 dark:text-white/80 mb-5">
            Logiciel sur mesure : caisse enregistreuse, système de réservation, CRM, gestion des stocks, planning...
            Conçu spécifiquement pour vos processus métier, données hébergées en France.
          </p>
          <div className="grid sm:grid-cols-3 gap-2 mb-6">
            {['Développement sur mesure', 'Interface d\'administration', 'Formation incluse', 'Données en France', 'Sans abonnement SaaS', 'Évolutions possibles'].map(item => (
              <div key={item} className="flex items-center gap-2 text-sm text-foreground/70 dark:text-white/70">
                <CheckCircle size={13} className="text-success flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/systeme-gestion" className="px-5 py-2.5 bg-navy hover:bg-electric text-white text-sm font-semibold rounded-xl transition-colors">
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
          <p className="text-foreground/60 dark:text-white/60 mb-3">Après la première année d'hébergement incluse, optez pour une maintenance mensuelle.</p>
          <p className="text-foreground/55 dark:text-white/55 text-sm mb-6 max-w-2xl">Le nom de domaine est offert la première année sur toutes les créations de site. Ensuite, il reste à votre charge — sauf si vous avez un abonnement de maintenance actif : il y est inclus.</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { titre: 'Starter', prix: SITE.pricing.maintenanceStarter, inclus: ['Hébergement + nom de domaine inclus', 'SSL', 'Sauvegardes hebdo', 'Mises à jour techniques (navigateurs, exigences Google, sécurité)', 'Réponse sous 72 h ouvrées'] },
              { titre: 'Pro', prix: SITE.pricing.maintenancePro, inclus: ['Tout Starter', 'Sauvegardes quotidiennes', '2h modifications/mois', 'Réponse sous 48 h ouvrées'] },
              { titre: 'Premium', prix: SITE.pricing.maintenancePremium, inclus: ['Tout Pro', '5h modifications/mois', 'Rapport mensuel SEO', 'Réponse sous 24 h ouvrées'] },
            ].map(m => (
              <div key={m.titre} className="rounded-2xl border border-navy/20 dark:border-white/10 p-5 hover:border-electric/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-foreground dark:text-white">{m.titre}</h3>
                  <span className="text-xl font-bold text-navy dark:text-gold">{m.prix}€<span className="text-sm font-normal text-foreground/70 dark:text-white/50">/mois</span></span>
                </div>
                <ul className="space-y-1.5">
                  {m.inclus.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground/60 dark:text-white/60">
                      <CheckCircle size={12} className="text-success flex-shrink-0" />
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
              <div key={p.titre} className={`rounded-2xl border p-5 ${('highlight' in p && p.highlight) ? 'border-amber-500/40 bg-gold/5' : 'border-navy/20 dark:border-white/10'}`}>
                {('highlight' in p && p.highlight) && <div className="text-xs font-semibold text-navy dark:text-gold mb-2 uppercase tracking-wide">Le plus populaire</div>}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-foreground dark:text-white">{p.titre}</h3>
                  <span className="text-xl font-bold text-navy dark:text-gold">{p.prix}€<span className="text-sm font-normal text-foreground/70 dark:text-white/50">{p.unite}</span></span>
                </div>
                <ul className="space-y-1.5">
                  {p.inclus.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-foreground/60 dark:text-white/60">
                      <CheckCircle size={12} className="text-success flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-electric/20 bg-blue-500/5 p-4 flex items-center justify-between gap-4">
            <div>
              <span className="font-semibold text-foreground dark:text-white text-sm">Accès technique blog</span>
              <span className="text-foreground/60 dark:text-white/60 text-sm ml-2">— Installation du blog sur votre site existant</span>
            </div>
            <span className="font-bold text-navy dark:text-gold flex-shrink-0">49€ <span className="text-foreground/60 dark:text-white/50 font-normal text-xs">une fois</span></span>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">Questions sur les tarifs</h2>
          <div className="space-y-3">
            {[
              { q: 'Combien coûte un site internet professionnel ?', a: `Chez Stackup Agency, un site vitrine professionnel coûte ${SITE.pricing.vitrine}€, tout inclus. Un site multi-pages coûte ${SITE.pricing.multipages}€. Une boutique en ligne coûte ${SITE.pricing.ecommerce}€. Un système de gestion sur mesure coûte à partir de ${SITE.pricing.gestion}€.` },
              { q: 'Y a-t-il des frais cachés ?', a: "Non, le prix affiché est le prix final. L'hébergement, le SSL et la formation de base sont inclus la première année. Pas de mauvaise surprise." },
              { q: 'Comment se déroule le paiement ?', a: "30% d'acompte au démarrage, 70% à la livraison. Virement bancaire ou carte bancaire (paiement en ligne sécurisé)." },
              { q: 'Proposez-vous des facilités de paiement ?', a: "Oui, pour les projets supérieurs à 500€, un échelonnement sur 3 mensualités sans frais est possible. Mentionnez-le dans votre demande." },
              { q: 'Puis-je bénéficier d\'aides pour financer mon site ?', a: "Certaines aides régionales et dispositifs comme France Num peuvent couvrir une partie des frais. Renseignez-vous auprès de votre chambre de commerce locale." },
            ].map(faq => (
              <details key={faq.q} className="group rounded-xl border border-navy/20 dark:border-white/10 overflow-hidden hover:border-gold/30 transition-colors duration-200">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-foreground dark:text-white list-none hover:bg-amber-50/30 transition-colors">
                  {faq.q}
                  <ChevronRight size={16} className="text-navy/40 group-open:rotate-90 transition-transform flex-shrink-0 group-hover:text-gold" />
                </summary>
                <div className="px-4 pb-4 text-foreground/70 dark:text-white/70 text-sm">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric text-center">
          <h2 className="text-white font-bold text-xl mb-2">Obtenez votre devis personnalisé</h2>
          <p className="text-white/70 mb-4">Devis gratuit sous 72h. Premier rendez-vous sans engagement.</p>
          <Link href="/contact" className="inline-block px-6 py-3 bg-gold hover:bg-gold/80 text-ink font-semibold rounded-xl transition-all hover:-translate-y-0.5">
            Demander un devis gratuit →
          </Link>
        </div>

        {/* Parrainage */}
        <div className="rounded-2xl border border-gold/20 bg-gradient-to-br from-amber-50/50 to-transparent dark:from-gold/5 dark:to-transparent p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex-1">
            <div className="text-xs font-semibold text-gold uppercase tracking-widest mb-1">Programme parrainage</div>
            <h3 className="font-bold text-foreground dark:text-white mb-1">
              Parrainez un professionnel : 1 mois Premium (89 €) offert ou −10 % sur votre prestation
            </h3>
            <p className="text-sm text-foreground/60 dark:text-white/60">
              Votre filleul bénéficie de −10% sur son premier projet. Valeur jusqu'à 89€ pour vous.
            </p>
          </div>
          <Link href="/parrainage" className="flex-shrink-0 px-5 py-2.5 bg-gold hover:bg-gold/80 text-ink text-sm font-semibold rounded-xl transition-colors">
            En savoir plus →
          </Link>
        </div>
      </div>
    </div>
  )
}
