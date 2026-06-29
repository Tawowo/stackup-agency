import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Check, ArrowRight } from 'lucide-react'

type ServiceData = {
  title: string
  subtitle: string
  description: string
  price: string
  duration: string
  features: string[]
  included: string[]
  process: { step: string; desc: string }[]
  faq: { q: string; a: string }[]
  cta: string
}

const services: Record<string, ServiceData> = {
  'site-vitrine': {
    title: 'Site Vitrine',
    subtitle: 'Votre présence digitale professionnelle, clé en main.',
    description: `Un site vitrine, c'est votre carte de visite permanente sur internet. Il est disponible 24h/24, 7j/7, et travaille pour vous même quand vous dormez. Chez Stackup Agency, nous créons des sites vitrines qui ne se contentent pas d'exister — ils convertissent des visiteurs en clients.

Nous savons qu'un site web mal conçu peut faire fuir vos prospects en quelques secondes. C'est pourquoi chaque site que nous livrons est optimisé pour trois choses : la vitesse, l'esthétique et la conversion. Pas de template générique, pas de constructeur de page limitant — du code sur mesure, performant et évolutif.

Que vous soyez artisan, consultant, prestataire de service ou commerçant local, votre site vitrine doit refléter la qualité de votre travail. Nous prenons le temps de comprendre votre activité, vos clients cibles et vos objectifs avant d'écrire la première ligne de code.

Le résultat : un site qui ressemble à ce que vous êtes, qui charge en moins de 3 secondes, qui s'affiche parfaitement sur mobile et tablette, et qui remonte dans les résultats Google. Parce qu'un beau site invisible ne sert à rien.

Nous intégrons également les éléments essentiels à toute présence en ligne sérieuse : formulaire de contact, Google Maps, liens réseaux sociaux, mentions légales et politique de confidentialité conformes RGPD. Votre site est opérationnel dès le premier jour.`,
    price: 'À partir de 449€',
    duration: '10 jours ouvrés',
    features: [
      'Design personnalisé (pas de template)',
      'Responsive mobile & tablette',
      'Optimisation SEO on-page',
      'Formulaire de contact',
      'Google Maps intégré',
      'Certificat SSL inclus',
      'Temps de chargement < 3s',
      'Conformité RGPD',
    ],
    included: [
      'Jusqu\'à 5 pages',
      '2 révisions incluses',
      'Livraison des fichiers sources',
      'Formation à l\'administration',
      'Support technique 30 jours post-livraison',
    ],
    process: [
      { step: 'Découverte', desc: 'Échange initial pour comprendre votre activité, vos cibles et vos objectifs.' },
      { step: 'Maquette', desc: 'Création d\'une maquette visuelle de votre site pour validation avant développement.' },
      { step: 'Développement', desc: 'Intégration du design en code propre, responsive et optimisé.' },
      { step: 'Validation', desc: 'Test complet sur tous les appareils, retours et ajustements.' },
      { step: 'Mise en ligne', desc: 'Déploiement sur votre domaine avec configuration SSL et DNS.' },
    ],
    faq: [
      { q: 'Combien de pages peut inclure un site vitrine ?', a: 'Notre offre de base inclut jusqu\'à 5 pages (Accueil, Services, À propos, Contact, etc.). Des pages supplémentaires peuvent être ajoutées.' },
      { q: 'Est-ce que je peux modifier le contenu moi-même ?', a: 'Oui, nous pouvons intégrer un CMS simple si vous souhaitez gérer votre contenu. Nous vous formons à son utilisation.' },
      { q: 'Le site sera-t-il bien référencé sur Google ?', a: 'Nous optimisons chaque site pour le SEO technique (balises, vitesse, structure). Le référencement naturel prend du temps mais nous posons les bonnes bases.' },
    ],
    cta: 'Démarrer mon site vitrine',
  },
  'site-multi-pages': {
    title: 'Site Multi-pages',
    subtitle: 'Une présence digitale complète pour votre activité.',
    description: `Un site multi-pages va plus loin qu'un simple site vitrine. Il permet de développer l'ensemble de votre univers de marque, de détailler chaque service, de créer une vraie relation avec vos visiteurs et d'optimiser votre référencement sur de nombreux mots-clés.

Chez Stackup Agency, nous concevons des sites multi-pages pensés comme de véritables machines à générer des opportunités commerciales. Chaque page est conçue avec un objectif précis : informer, rassurer, convaincre et convertir.

Ce type de site est idéal si vous proposez plusieurs services distincts, si vous souhaitez partager du contenu régulier via un blog, si vous gérez plusieurs types de clients, ou si vous avez besoin d'une page dédiée pour chaque produit ou offre.

Nous travaillons sur l'architecture de l'information — la façon dont les pages s'organisent et s'enchaînent — pour que vos visiteurs trouvent naturellement ce qu'ils cherchent et soient guidés vers une prise de contact ou un achat. Navigation intuitive, maillage interne stratégique, appels à l'action bien placés.

Le rendu final est un site professionnel, rapide, sécurisé et optimisé pour les moteurs de recherche. Nous livrons avec une formation à l'outil d'administration pour que vous puissiez mettre à jour votre contenu en autonomie.`,
    price: 'À partir de 749€',
    duration: '17 jours ouvrés',
    features: [
      'Jusqu\'à 10 pages personnalisées',
      'Blog / actualités intégré',
      'Navigation avancée avec menu déroulant',
      'SEO avancé avec sitemap',
      'Formulaires multiples',
      'Galerie photo & vidéo',
      'Intégration réseaux sociaux',
      'Analytics Google intégré',
    ],
    included: [
      'Jusqu\'à 10 pages',
      '3 révisions incluses',
      'Module blog',
      'Formation à l\'administration',
      'Support technique 60 jours post-livraison',
    ],
    process: [
      { step: 'Audit & Stratégie', desc: 'Analyse de votre marché, définition de l\'architecture des pages et de la stratégie SEO.' },
      { step: 'Design système', desc: 'Création d\'une charte graphique cohérente déclinée sur toutes les pages.' },
      { step: 'Développement', desc: 'Intégration page par page avec animations, formulaires et fonctionnalités.' },
      { step: 'Tests & Validation', desc: 'Tests multi-appareils, vérification des performances et du référencement.' },
      { step: 'Mise en ligne & Formation', desc: 'Déploiement et formation complète à l\'administration du site.' },
    ],
    faq: [
      { q: 'Puis-je ajouter des pages par la suite ?', a: 'Absolument. L\'architecture est conçue pour évoluer. Des pages supplémentaires peuvent être ajoutées à tout moment.' },
      { q: 'Intégrez-vous un blog ?', a: 'Oui, le blog est inclus et vous pouvez publier des articles en toute autonomie.' },
      { q: 'Combien de temps après la livraison puis-je vous contacter ?', a: 'Vous bénéficiez de 60 jours de support post-livraison inclus. Au-delà, un plan de maintenance peut prendre le relais.' },
    ],
    cta: 'Créer mon site multi-pages',
  },
  'site-ecommerce': {
    title: 'Site E-commerce',
    subtitle: 'Vendez en ligne 24h/24 avec une boutique performante.',
    description: `Le commerce en ligne ne s'improvise pas. Un site e-commerce mal conçu, lent ou peu sécurisé génère des paniers abandonnés, de la méfiance et des ventes perdues. Chez Stackup Agency, nous développons des boutiques en ligne qui inspirent confiance, simplifient le parcours d'achat et maximisent les conversions.

Chaque e-commerce que nous créons est pensé du point de vue de l'acheteur. Parcours d'achat fluide, pages produits optimisées, paiement sécurisé multi-méthodes (carte, virement, PayPal), gestion des stocks intuitive et tableau de bord administrateur complet pour piloter votre activité.

Nous intégrons les meilleures pratiques de l'UX e-commerce : photos produits zoomables, avis clients, produits similaires, promotions et codes promo, gestion des retours, emails transactionnels automatiques (confirmation de commande, livraison, etc.).

Sur le plan technique, vos clients peuvent faire confiance : certificat SSL, paiement conforme PCI DSS, données cryptées. De votre côté, vous avez accès à des analytics détaillés pour suivre vos performances et optimiser vos ventes.

Que vous vendiez 10 ou 10 000 produits, nous adaptons la solution à votre catalogue et à vos ambitions.`,
    price: 'À partir de 1 647€',
    duration: '21 jours ouvrés',
    features: [
      'Catalogue produits illimité',
      'Paiement sécurisé (Stripe, PayPal)',
      'Emails transactionnels automatiques',
      'Gestion des promotions & codes promo',
      'Dashboard administrateur complet',
      'Optimisation SEO produits',
      'Certificat SSL inclus',
      'Conformité RGPD',
    ],
    included: [
      'Jusqu\'à 50 produits intégrés',
      'Configuration paiement & livraison',
      '3 révisions design',
      'Formation complète',
      'Support technique 90 jours post-livraison',
    ],
    process: [
      { step: 'Audit & Cahier des charges', desc: 'Analyse de votre catalogue, de vos modes de livraison et de vos besoins spécifiques.' },
      { step: 'Design UX/UI', desc: 'Conception du parcours d\'achat et des templates de pages produits.' },
      { step: 'Développement & Intégration', desc: 'Développement de la boutique avec intégration des paiements et de la logistique.' },
      { step: 'Tests & Sécurité', desc: 'Tests d\'achat complets, vérification de sécurité et optimisation des performances.' },
      { step: 'Lancement & Formation', desc: 'Mise en ligne, formation à l\'administration et premier suivi des ventes.' },
    ],
    faq: [
      { q: 'Quels moyens de paiement peuvent être intégrés ?', a: 'Carte bancaire via Stripe, PayPal, virement bancaire, et d\'autres solutions sur demande.' },
      { q: 'Puis-je gérer les stocks moi-même ?', a: 'Oui, vous avez un accès complet à l\'interface d\'administration pour gérer stocks, commandes et clients.' },
      { q: 'Le site est-il sécurisé pour les paiements ?', a: 'Absolument. Nous utilisons uniquement des solutions de paiement certifiées PCI DSS avec cryptage SSL.' },
    ],
    cta: 'Lancer ma boutique en ligne',
  },
  'systeme-gestion': {
    title: 'Système de Gestion',
    subtitle: 'Des outils sur mesure pour piloter votre activité.',
    description: `Les logiciels génériques ne font jamais exactement ce dont vous avez besoin. Ils sont souvent trop complexes, trop chers, ou trop rigides pour s'adapter à vos processus spécifiques. Chez Stackup Agency, nous développons des systèmes de gestion entièrement sur mesure, pensés pour votre métier et vos équipes.

Un système de gestion, c'est l'interface centrale de votre activité : réservations en ligne, gestion des commandes, tableau de bord en temps réel, programme de fidélité, gestion des employés, suivi des stocks, rapports automatiques... Tout ce dont vous avez besoin, rien de superflu.

Notre exemple de référence — L'Olivier Dashboard — illustre ce type de système. Il permet aux clients de réserver une table et de passer commande en ligne, à la cuisine de recevoir les commandes en temps réel sur une tablette, au gestionnaire de tout piloter depuis un dashboard, et aux clients fidèles de cumuler des points automatiquement.

Le résultat : moins d'erreurs, moins de temps perdu, plus de satisfaction client et plus de rentabilité. Ce type de système s'amortit généralement en quelques mois grâce aux gains de productivité qu'il génère.

Nous analysons vos flux de travail, nous concevons l'architecture, nous développons, nous testons et nous formons vos équipes. Et nous restons disponibles pour faire évoluer l'outil avec votre activité.`,
    price: 'À partir de 1 447€',
    duration: '21 jours ouvrés',
    features: [
      'Application web sur mesure',
      'Dashboard administrateur en temps réel',
      'Gestion des réservations / commandes',
      'Interface multi-utilisateurs avec rôles',
      'Notifications et alertes automatiques',
      'Rapports et statistiques',
      'API et intégrations tierces',
      'Application mobile possible',
    ],
    included: [
      'Analyse complète de vos besoins',
      'Architecture & conception',
      'Formation des équipes',
      'Documentation technique',
      'Support technique 90 jours post-livraison',
    ],
    process: [
      { step: 'Analyse des besoins', desc: 'Audit complet de vos processus, identification des points de friction et des gains possibles.' },
      { step: 'Conception', desc: 'Architecture technique, wireframes et validation du périmètre fonctionnel.' },
      { step: 'Développement itératif', desc: 'Développement par modules avec démonstrations régulières pour validation.' },
      { step: 'Tests & Formation', desc: 'Tests approfondis avec vos équipes et formation à l\'utilisation du système.' },
      { step: 'Déploiement', desc: 'Mise en production avec monitoring et support renforcé les premières semaines.' },
    ],
    faq: [
      { q: 'Mon activité est très spécifique. Pouvez-vous vraiment l\'adapter ?', a: 'C\'est justement notre spécialité. Nous développons sur mesure, donc oui, nous pouvons nous adapter à n\'importe quel métier.' },
      { q: 'Combien d\'utilisateurs peuvent accéder au système ?', a: 'Autant que nécessaire. Nous gérons les accès par rôles (admin, gérant, employé, client).' },
      { q: 'Peut-on faire évoluer le système ?', a: 'Absolument. Tout est conçu pour être évolutif. Vous pouvez ajouter des modules au fil du temps.' },
    ],
    cta: 'Discuter de mon projet',
  },
  'site-association': {
    title: 'Site Association',
    subtitle: 'Un site professionnel pour votre association, club ou structure à but non lucratif.',
    description: `Les associations méritent une présence digitale sérieuse. Trop souvent, faute de budget ou de compétences techniques, les associations se retrouvent avec des sites obsolètes, peu accessibles ou inexistants. Chez Stackup Agency, nous avons créé une offre spécifiquement pensée pour les structures associatives.

Notre offre Site Association permet à votre structure de disposer d'un site web professionnel, moderne et fonctionnel à un tarif adapté aux budgets associatifs. Adhérents, bénévoles, partenaires et donateurs potentiels trouveront toutes les informations dont ils ont besoin.

Nous construisons un site qui présente clairement votre mission, vos activités, vos membres actifs et vos événements à venir. Le formulaire d'adhésion en ligne simplifie le recrutement de nouveaux membres, et la page actualités vous permet de maintenir votre communauté informée.

Optimisé pour les moteurs de recherche et parfaitement adapté aux mobiles, votre site sera facilement trouvable par les personnes qui recherchent une structure comme la vôtre dans votre région.

Le tout est livré en 7 jours ouvrés, hébergement inclus la première année, avec une formation à l'administration pour que votre équipe puisse gérer le contenu en toute autonomie.`,
    price: 'À partir de 149€',
    duration: '7 jours ouvrés',
    features: [
      'Design personnalisé aux couleurs de l\'association',
      'Responsive mobile & tablette',
      'Page d\'accueil + présentation + contact',
      'Formulaire d\'adhésion en ligne',
      'Page actualités / événements',
      'Optimisation SEO local',
      'Certificat SSL inclus',
      'Conformité RGPD',
    ],
    included: [
      'Jusqu\'à 4 pages',
      '1 révision incluse',
      'Hébergement offert 1 an',
      'Formation à l\'administration',
      'Support technique 30 jours post-livraison',
    ],
    process: [
      { step: 'Échange initial', desc: 'Découverte de votre association, vos besoins et votre audience cible.' },
      { step: 'Maquette', desc: 'Proposition visuelle rapide pour validation avant développement.' },
      { step: 'Développement', desc: 'Intégration du design, du contenu et des fonctionnalités.' },
      { step: 'Validation', desc: 'Relecture et ajustements selon vos retours.' },
      { step: 'Mise en ligne', desc: 'Déploiement sur votre domaine avec configuration SSL.' },
    ],
    faq: [
      { q: 'L\'offre est-elle éligible aux subventions associatives ?', a: 'Nous pouvons fournir toutes les pièces justificatives nécessaires à votre demande de subvention numérique.' },
      { q: 'Pouvons-nous gérer le contenu nous-mêmes ?', a: 'Oui, nous intégrons une interface d\'administration simple et vous formons à son utilisation.' },
      { q: 'L\'hébergement est-il vraiment inclus ?', a: 'Oui, l\'hébergement est offert la première année. À partir de la deuxième année, un abonnement maintenance à partir de 29€/mois prend le relais.' },
    ],
    cta: 'Créer le site de votre association',
  },
  'marketing-digital': {
    title: 'Marketing Digital',
    subtitle: 'Faites-vous trouver par vos clients en ligne.',
    description: `Disposer d'un site web performant est une première étape. Encore faut-il que vos clients potentiels puissent le trouver. Le marketing digital regroupe l'ensemble des leviers permettant d'attirer un trafic qualifié vers votre site et de transformer ces visiteurs en clients.

Chez Stackup Agency, nous proposons une approche du marketing digital adaptée aux PME et aux entrepreneurs. Notre démarche repose sur une stratégie réaliste, des actions concrètes et des résultats mesurables.

Le SEO (référencement naturel) constitue le pilier de toute stratégie digitale durable. Nous optimisons votre site pour qu'il remonte sur les requêtes que cherchent réellement vos clients : titre de page, méta-descriptions, structure des URLs, contenu optimisé, backlinks — chaque détail est pris en compte.

Les réseaux sociaux sont un levier de visibilité et de relation client efficace lorsqu'ils sont utilisés avec méthode. Nous élaborons des stratégies de contenu cohérentes avec votre image de marque et adaptées aux plateformes où se trouve votre audience.

L'emailing reste l'un des canaux offrant le meilleur retour sur investissement. Newsletters, séquences automatisées, offres promotionnelles — nous concevons des campagnes qui engagent et convertissent.

Nous suivons les performances à l'aide d'outils d'analyse et vous fournissons des rapports mensuels clairs pour que vous sachiez exactement où va votre budget.`,
    price: 'Sur devis',
    duration: 'Selon la demande',
    features: [
      'Audit SEO complet',
      'Optimisation on-page & technique',
      'Création de contenu optimisé',
      'Campagnes emailing',
      'Google Ads (optionnel)',
      'Suivi des résultats',
      'Conseil stratégique',
    ],
    included: [
      'Audit initial offert',
      'Stratégie personnalisée',
      'Suivi des résultats mensuel',
      'Point stratégique mensuel',
      'Accès aux outils d\'analyse',
    ],
    process: [
      { step: 'Audit', desc: 'Analyse de votre présence digitale actuelle, de vos concurrents et de vos opportunités.' },
      { step: 'Stratégie', desc: 'Définition des canaux prioritaires, des objectifs et du plan d\'action.' },
      { step: 'Mise en place', desc: 'Configuration des outils, création des comptes et premiers contenus.' },
      { step: 'Exécution', desc: 'Production de contenu, publications, optimisations et campagnes.' },
      { step: 'Analyse & Optimisation', desc: 'Suivi des KPIs, rapport mensuel et ajustement de la stratégie.' },
    ],
    faq: [
      { q: 'Combien de temps avant de voir des résultats SEO ?', a: 'Le SEO est un investissement long terme. Les premiers résultats visibles apparaissent généralement entre 3 et 6 mois.' },
      { q: 'Quelle est la différence entre SEO et SEA ?', a: 'Le SEO (naturel) est gratuit mais prend du temps. Le SEA (Google Ads) est payant mais immédiat. Les deux sont complémentaires.' },
      { q: 'Gérez-vous tous les réseaux sociaux ?', a: 'Nous nous concentrons sur les réseaux pertinents pour votre activité. Mieux vaut être excellent sur 2 plateformes que médiocre sur toutes.' },
    ],
    cta: 'Booster ma visibilité',
  },
  'maintenance-support': {
    title: 'Maintenance & Support',
    subtitle: 'Votre site entre de bonnes mains, en permanence.',
    description: `Un site web n'est pas un produit fini que l'on pose et que l'on oublie. C'est un outil vivant qui doit être maintenu, mis à jour, sécurisé et surveillé pour rester performant et disponible. La maintenance est souvent négligée jusqu'au jour où quelque chose cesse de fonctionner.

Chez Stackup Agency, nous proposons des plans de maintenance adaptés à vos besoins et à votre budget. Notre objectif est que vous n'ayez jamais à vous préoccuper de votre site. Nous nous en chargeons.

Les mises à jour de sécurité sont notre priorité absolue. Les sites non mis à jour sont les premières cibles des attaques et des malwares. Nous appliquons les correctifs dès leur publication pour maintenir votre site à l'abri des menaces.

Les sauvegardes régulières constituent votre filet de sécurité. En cas de problème — intrusion, erreur de manipulation, panne d'hébergeur — nous pouvons restaurer votre site en quelques minutes.

Le support technique est disponible selon votre plan : du support email avec réponse sous 72h pour le plan Starter, jusqu'au support urgent sous 16h pour le plan Premium. Nous répondons à vos questions, corrigeons les anomalies et effectuons les modifications demandées.

Nous surveillons également les performances de votre site : temps de chargement, disponibilité, erreurs techniques. Si quelque chose ne va pas, nous le détectons avant vous.`,
    price: 'À partir de 29€/mois',
    duration: 'Engagement mensuel',
    features: [
      'Mises à jour sécurité',
      'Sauvegardes automatiques',
      'Monitoring disponibilité 24/7',
      'Support email — réponse sous 72h',
      'Modifications incluses (ajouts de contenu sur devis)',
      'Rapport mensuel de performance',
      'Hébergement inclus (certains plans)',
      'Optimisation performances',
    ],
    included: [
      'Hébergement haute disponibilité',
      'Certificat SSL',
      'Sauvegarde automatique hebdomadaire',
      'Rapport mensuel de performance',
      'Support selon plan choisi',
    ],
    process: [
      { step: 'Audit initial', desc: 'Analyse de votre site actuel, identification des points faibles et mise en conformité.' },
      { step: 'Onboarding', desc: 'Configuration des outils de monitoring, sauvegardes et accès nécessaires.' },
      { step: 'Maintenance régulière', desc: 'Mises à jour, vérifications de sécurité et sauvegardes selon planning.' },
      { step: 'Interventions', desc: 'Gestion des demandes de modifications et résolution des incidents.' },
      { step: 'Reporting', desc: 'Rapport mensuel de performance avec état du site, interventions effectuées et recommandations.' },
    ],
    faq: [
      { q: 'Que se passe-t-il si mon site tombe en panne ?', a: 'Nous sommes alertés automatiquement dès qu\'une panne est détectée et nous intervenons dans les délais de votre plan.' },
      { q: 'Puis-je changer de plan à tout moment ?', a: 'Oui, vous pouvez monter ou descendre en gamme à chaque renouvellement mensuel.' },
      { q: 'Que comprennent les "modifications" incluses ?', a: 'Changements de texte, d\'images, d\'horaires, de prix — toutes les mises à jour courantes de votre contenu. Les ajouts de contenu plus conséquents font l\'objet d\'un devis.' },
    ],
    cta: 'Protéger mon site',
  },
}

export async function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = services[params.slug]
  if (!service) return {}
  return {
    title: `${service.title} — Stackup Agency`,
    description: service.subtitle,
  }
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services[params.slug]
  if (!service) notFound()

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0F1C]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#1E3A5F] to-[#0F172A] py-24 pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/#services" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft size={16} />
            Retour aux services
          </Link>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4">{service.title}</h1>
          <p className="text-base sm:text-xl text-white/70">{service.subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/60">
            <span>⏱ Délai : {service.duration}</span>
            {service.price !== 'Sur devis' && <span>💰 {service.price}</span>}
          </div>
          <p className="mt-3 text-xs text-white/40 max-w-xl">Délai indicatif en jours ouvrés. Stackup Agency se réserve le droit de prolonger ce délai de 20 jours ouvrés maximum en cas de forte demande ou d&apos;imprévu, avec notification préalable.</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        {/* Description */}
        <section>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {service.description.split('\n\n').map((para, i) => (
              <p key={i} className="text-gray-700 dark:text-white/70 leading-relaxed mb-4">{para}</p>
            ))}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Features */}
          <section className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-gray-100 dark:border-white/10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Ce qui est inclus</h2>
            <ul className="space-y-3">
              {service.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-electric/10 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-electric" />
                  </div>
                  <span className="text-gray-700 dark:text-white/70 text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* What's included in the package */}
          <section className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-gray-100 dark:border-white/10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Notre engagement</h2>
            <ul className="space-y-3">
              {service.included.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-gold" />
                  </div>
                  <span className="text-gray-700 dark:text-white/70 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Process */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Notre processus</h2>
          <div className="space-y-4">
            {service.process.map((step, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-electric flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {i + 1}
                  </div>
                  {i < service.process.length - 1 && <div className="w-0.5 h-full bg-electric/20 mt-2" />}
                </div>
                <div className="pb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{step.step}</h3>
                  <p className="text-gray-600 dark:text-white/60 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Questions fréquentes</h2>
          <div className="space-y-4">
            {service.faq.map((item, i) => (
              <div key={i} className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.q}</h3>
                <p className="text-gray-600 dark:text-white/60 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-navy to-electric rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">{service.cta}</h2>
          <p className="text-white/70 mb-6">Devis gratuit sous 72h. Sans engagement.</p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold hover:bg-amber-500 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5 shadow-lg"
          >
            Demander un devis
            <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </main>
  )
}
