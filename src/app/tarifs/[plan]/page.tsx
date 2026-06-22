import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Check, X, ArrowRight, Zap } from 'lucide-react'

type PlanData = {
  name: string
  price: string
  tagline: string
  description: string
  features: string[]
  notIncluded: string[]
  audience: string
  faq: { q: string; a: string }[]
  compare: { feature: string; starter: boolean; pro: boolean; premium: boolean }[]
  color: string
}

const plans: Record<string, PlanData> = {
  starter: {
    name: 'Starter',
    price: '29€/mois',
    tagline: 'L\'essentiel pour démarrer sereinement.',
    description: `Le plan Starter est conçu pour les indépendants et les petites entreprises qui ont besoin d'une maintenance de base fiable. Il garantit que votre site reste en ligne, sécurisé et fonctionnel.

Ce plan convient parfaitement si vous venez de lancer votre site et que vous souhaitez une solution d'hébergement et de maintenance sans surprise. Vous bénéficiez d'un hébergement haute disponibilité inclus, des mises à jour de sécurité régulières et d'un support par email avec réponse garantie sous 72h.

Le plan Starter inclut également une modification par mois — idéal pour mettre à jour vos horaires, changer une photo ou modifier un tarif.

C'est le point d'entrée idéal pour professionnaliser votre présence en ligne. Et si vos besoins évoluent, vous pouvez passer au plan Pro à tout moment.`,
    audience: 'Idéal pour les indépendants, artisans et petites entreprises avec un site vitrine simple.',
    features: [
      'Hébergement haute disponibilité inclus',
      'Mises à jour de sécurité régulières',
      'Support email — réponse sous 72h',
      '1 modification de contenu par mois (ajouts de contenu sur devis)',
      'Certificat SSL inclus',
      'Monitoring basique de disponibilité',
    ],
    notIncluded: [
      'Support téléphonique',
      'Rapport mensuel de performance',
      'Sauvegarde automatique hebdomadaire',
      'Modifications illimitées',
      'Audit SEO mensuel',
      'Conseil stratégique',
    ],
    faq: [
      { q: 'Qu\'est-ce qu\'une "modification" dans le plan Starter ?', a: 'Il s\'agit de toute mise à jour de contenu : changer un texte, remplacer une image, modifier des horaires ou des prix. Une modification par mois est incluse. Les ajouts de contenu plus conséquents font l\'objet d\'un devis.' },
      { q: 'Puis-je passer au plan Pro à tout moment ?', a: 'Oui, vous pouvez évoluer vers un plan supérieur à n\'importe quel renouvellement mensuel.' },
      { q: 'L\'hébergement est-il vraiment inclus ?', a: 'Oui, votre site est hébergé sur notre infrastructure incluse dans le prix. Vous n\'avez pas à gérer de serveur.' },
      { q: 'Que se passe-t-il si j\'ai besoin de plus d\'une modification par mois ?', a: 'Les modifications supplémentaires sont facturées 15€ l\'unité, ou vous pouvez passer au plan Pro.' },
    ],
    compare: [
      { feature: 'Hébergement inclus', starter: true, pro: true, premium: true },
      { feature: 'Mises à jour sécurité', starter: true, pro: true, premium: true },
      { feature: 'Support email 72h', starter: true, pro: true, premium: true },
      { feature: 'Support prioritaire 48h', starter: false, pro: true, premium: true },
      { feature: 'Support urgent 16h', starter: false, pro: false, premium: true },
      { feature: 'Modifications illimitées', starter: false, pro: false, premium: true },
      { feature: 'Rapport mensuel de performance', starter: false, pro: true, premium: true },
      { feature: 'Sauvegarde automatique hebdomadaire', starter: false, pro: true, premium: true },
      { feature: 'Audit SEO mensuel', starter: false, pro: false, premium: true },
      { feature: 'Tableau de bord statistiques', starter: false, pro: false, premium: true },
      { feature: 'Appel stratégie 30min/mois', starter: false, pro: false, premium: true },
    ],
    color: 'from-slate-600 to-slate-800',
  },
  pro: {
    name: 'Pro',
    price: '44€/mois',
    tagline: 'Le plan recommandé pour les entreprises actives.',
    description: `Le plan Pro est notre offre la plus populaire. Il combine l'essentiel de la maintenance avec un niveau de support et de service qui permet à votre site de rester performant et à jour en permanence.

Avec le support prioritaire sous 48h, vos demandes sont traitées en priorité. Que vous ayez un bug à corriger, une question technique ou une mise à jour à effectuer, nous intervenons rapidement. Les 3 modifications mensuelles incluses couvrent la grande majorité des besoins courants.

Le rapport mensuel de performance vous donne une visibilité claire sur ce qui a été fait sur votre site, comment il performe et s'il y a des points à améliorer.

Les sauvegardes automatiques hebdomadaires vous offrent une tranquillité d'esprit. En cas de problème, nous pouvons restaurer votre site dans l'état d'une semaine au pire.`,
    audience: 'Recommandé pour les PME, commerces et prestataires avec un site régulièrement mis à jour.',
    features: [
      'Tout le plan Starter +',
      'Support prioritaire — réponse sous 48h',
      '3 modifications de contenu par mois (ajouts de contenu sur devis)',
      'Rapport mensuel de performance',
      'Sauvegarde automatique hebdomadaire',
      'Monitoring avancé de disponibilité',
    ],
    notIncluded: [
      'Support urgent sous 16h',
      'Modifications illimitées',
      'Audit SEO mensuel',
      'Tableau de bord statistiques',
      'Appel stratégie 30min/mois',
    ],
    faq: [
      { q: 'Que comprend le rapport mensuel de performance ?', a: 'Le rapport inclut : disponibilité du site, interventions effectuées, mises à jour réalisées et recommandations pour le mois suivant.' },
      { q: 'Qu\'est-ce que le support prioritaire ?', a: 'Votre demande est traitée avant les demandes des plans inférieurs. Réponse garantie sous 48h ouvrées.' },
      { q: 'Puis-je utiliser mes 3 modifications en une fois ?', a: 'Oui, vous pouvez regrouper vos 3 modifications dans la même semaine si besoin.' },
      { q: 'Les sauvegardes sont-elles automatiques ?', a: 'Oui, une sauvegarde complète de votre site est effectuée automatiquement chaque semaine.' },
    ],
    compare: [
      { feature: 'Hébergement inclus', starter: true, pro: true, premium: true },
      { feature: 'Mises à jour sécurité', starter: true, pro: true, premium: true },
      { feature: 'Support email 72h', starter: true, pro: true, premium: true },
      { feature: 'Support prioritaire 48h', starter: false, pro: true, premium: true },
      { feature: 'Support urgent 16h', starter: false, pro: false, premium: true },
      { feature: 'Modifications illimitées', starter: false, pro: false, premium: true },
      { feature: 'Rapport mensuel de performance', starter: false, pro: true, premium: true },
      { feature: 'Sauvegarde automatique hebdomadaire', starter: false, pro: true, premium: true },
      { feature: 'Audit SEO mensuel', starter: false, pro: false, premium: true },
      { feature: 'Tableau de bord statistiques', starter: false, pro: false, premium: true },
      { feature: 'Appel stratégie 30min/mois', starter: false, pro: false, premium: true },
    ],
    color: 'from-navy to-electric',
  },
  premium: {
    name: 'Premium',
    price: '89€/mois',
    tagline: 'Le service complet pour les exigeants.',
    description: `Le plan Premium est notre offre la plus complète. Il est conçu pour les entreprises qui considèrent leur site web comme un actif stratégique et qui souhaitent bénéficier du meilleur niveau de service.

Le support urgent sous 16h est notre engagement le plus fort. Si votre site rencontre un problème critique, nous intervenons dans les plus brefs délais, y compris le week-end pour les incidents graves.

Les modifications illimitées vous donnent une flexibilité totale. Vous pouvez mettre à jour votre site sans vous soucier d'un compteur : nouveaux prix, nouvelle galerie, nouvelle page, nouveau contenu.

L'audit SEO mensuel est un avantage compétitif concret. Nous analysons vos positions sur Google, vos opportunités de mots-clés et effectuons des optimisations régulières pour améliorer votre visibilité organique.

L'appel stratégie de 30 minutes par mois est votre ligne directe avec notre expertise. Stratégie digitale, nouveaux projets, questions techniques — nous sommes votre partenaire numérique sur le long terme.`,
    audience: 'Idéal pour les entreprises exigeantes, les e-commerces actifs et ceux qui veulent un partenaire digital complet.',
    features: [
      'Tout le plan Pro +',
      'Support urgent — réponse sous 16h',
      'Modifications de contenu illimitées (ajouts de contenu sur devis)',
      'Audit SEO mensuel',
      'Tableau de bord statistiques (visiteurs, trafic, conversions)',
      'Appel stratégie 30min/mois',
      'Audit de performance trimestriel',
      'Priorité absolue sur tous les projets',
    ],
    notIncluded: [
      'Développement de nouvelles fonctionnalités majeures',
      'Refonte graphique complète',
      'Campagnes publicitaires payantes (budget ads)',
    ],
    faq: [
      { q: 'Le support urgent fonctionne-t-il le week-end ?', a: 'Pour les incidents critiques (site hors ligne, faille de sécurité), oui. Pour les demandes courantes, les délais sont ceux des jours ouvrés.' },
      { q: 'Que signifie "modifications illimitées" ?', a: 'Toutes les mises à jour de contenu, ajouts de photos, modifications de textes, changements de prix — sans limite ni surcoût. Les ajouts de contenu plus conséquents font l\'objet d\'un devis.' },
      { q: 'En quoi consiste l\'appel stratégie de 30 minutes ?', a: 'Un appel mensuel de 30 minutes pour discuter de votre stratégie digitale, de vos projets et de vos questions. C\'est votre temps, utilisez-le comme vous le souhaitez.' },
      { q: 'Qu\'est-ce que l\'audit de performance trimestriel ?', a: 'Un rapport approfondi tous les 3 mois sur les performances techniques de votre site, votre SEO et des recommandations d\'amélioration.' },
    ],
    compare: [
      { feature: 'Hébergement inclus', starter: true, pro: true, premium: true },
      { feature: 'Mises à jour sécurité', starter: true, pro: true, premium: true },
      { feature: 'Support email 72h', starter: true, pro: true, premium: true },
      { feature: 'Support prioritaire 48h', starter: false, pro: true, premium: true },
      { feature: 'Support urgent 16h', starter: false, pro: false, premium: true },
      { feature: 'Modifications illimitées', starter: false, pro: false, premium: true },
      { feature: 'Rapport mensuel de performance', starter: false, pro: true, premium: true },
      { feature: 'Sauvegarde automatique hebdomadaire', starter: false, pro: true, premium: true },
      { feature: 'Audit SEO mensuel', starter: false, pro: false, premium: true },
      { feature: 'Tableau de bord statistiques', starter: false, pro: false, premium: true },
      { feature: 'Appel stratégie 30min/mois', starter: false, pro: false, premium: true },
    ],
    color: 'from-purple-600 to-violet-800',
  },
}

export async function generateStaticParams() {
  return Object.keys(plans).map(plan => ({ plan }))
}

export async function generateMetadata({ params }: { params: { plan: string } }): Promise<Metadata> {
  const plan = plans[params.plan]
  if (!plan) return {}
  return {
    title: `Plan ${plan.name} ${plan.price} — Stackup Agency`,
    description: plan.tagline,
  }
}

export default function TarifPage({ params }: { params: { plan: string } }) {
  const plan = plans[params.plan]
  if (!plan) notFound()

  const planKeys = ['starter', 'pro', 'premium'] as const

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0F1C]">
      {/* Hero */}
      <section className={`bg-gradient-to-br ${plan.color} py-24 pt-32`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/#tarifs" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft size={16} />
            Retour aux tarifs
          </Link>
          {params.plan === 'pro' && (
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gold rounded-full text-white text-xs font-bold mb-4">
              <Zap size={12} fill="white" />
              Recommandé
            </div>
          )}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4">Plan {plan.name}</h1>
          <p className="text-base sm:text-xl text-white/70 mb-4">{plan.tagline}</p>
          <div className="text-5xl font-black text-white">{plan.price}</div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        {/* Description */}
        <section>
          {plan.description.split('\n\n').map((para, i) => (
            <p key={i} className="text-gray-700 dark:text-white/70 leading-relaxed mb-4">{para}</p>
          ))}
          <div className="mt-6 p-4 bg-electric/10 rounded-xl border border-electric/20">
            <p className="text-electric font-semibold text-sm">{plan.audience}</p>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Included */}
          <section className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-gray-100 dark:border-white/10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Ce qui est inclus</h2>
            <ul className="space-y-3">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-electric/10 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-electric" />
                  </div>
                  <span className="text-gray-700 dark:text-white/70 text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Not included */}
          <section className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-gray-100 dark:border-white/10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Non inclus</h2>
            <ul className="space-y-3">
              {plan.notIncluded.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
                    <X size={12} className="text-red-400" />
                  </div>
                  <span className="text-gray-500 dark:text-white/50 text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Comparison table */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Comparaison des plans</h2>
          <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/10">
                  <th className="text-left p-4 text-gray-500 dark:text-white/50 text-sm font-medium">Fonctionnalité</th>
                  {planKeys.map(key => (
                    <th key={key} className={`p-4 text-sm font-bold ${key === params.plan ? 'text-electric' : 'text-gray-500 dark:text-white/50'}`}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                      {key === params.plan && <div className="text-xs font-normal text-electric/70">Votre plan</div>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {plan.compare.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50 dark:bg-white/2' : ''}>
                    <td className="p-4 text-gray-700 dark:text-white/70 text-sm">{row.feature}</td>
                    {planKeys.map(key => (
                      <td key={key} className="p-4 text-center">
                        {row[key] ? (
                          <Check size={16} className={key === params.plan ? 'text-electric mx-auto' : 'text-green-500 mx-auto'} />
                        ) : (
                          <X size={16} className="text-gray-300 dark:text-white/20 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Questions fréquentes</h2>
          <div className="space-y-4">
            {plan.faq.map((item, i) => (
              <div key={i} className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.q}</h3>
                <p className="text-gray-600 dark:text-white/60 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-navy to-electric rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Commencer avec le plan {plan.name}</h2>
          <p className="text-white/70 mb-6">Sans engagement. Résiliable à tout moment.</p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold hover:bg-amber-500 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5 shadow-lg"
          >
            Démarrer maintenant
            <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </main>
  )
}
