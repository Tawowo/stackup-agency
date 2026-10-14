import { jetonsProfond } from '../lib/jetons'
/**
 * LES QUATRE SERVICES — repris de l'ancien site (textes), sans durée de
 * livraison (règle 8). Les prix viennent de SITE (src/config/site.ts).
 */
import { SITE } from '@/config/site'

export type Service = {
  title: string
  subtitle: string
  metaDesc: string
  description: string
  price: string
  priceNote?: string
  features: string[]
  included: string[]
  process: { step: string; desc: string }[]
  faq: { q: string; a: string }[]
  cta: string
}

const BRUT_SERVICES: Record<string, Service> = {
  'site-vitrine': {
    title: 'Site Vitrine',
    subtitle: 'Votre présence digitale professionnelle, clé en main.',
    metaDesc: 'Site vitrine professionnel à partir de {{prix:une-page}} €. Design sur mesure, SEO intégré, responsive mobile. Démo avant signature.',
    description: `Un site vitrine, c'est votre carte de visite permanente sur internet. Il est disponible 24h/24, 7j/7, et travaille pour vous même quand vous dormez. Chez Stackup Agency, nous créons des sites vitrines qui ne se contentent pas d'exister — ils convertissent des visiteurs en clients.

Nous savons qu'un site web mal conçu peut faire fuir vos prospects en quelques secondes. C'est pourquoi chaque site que nous livrons est optimisé pour trois choses : la vitesse, l'esthétique et la conversion. Pas de modèle générique préfabriqué, pas de constructeur de page limitant — du code sur mesure, performant et évolutif.

Que vous soyez artisan, consultant, prestataire de service ou commerçant local, votre site vitrine doit refléter la qualité de votre travail. Nous prenons le temps de comprendre votre activité, vos clients cibles et vos objectifs avant d'écrire la première ligne de code.

Le résultat : un site qui ressemble à ce que vous êtes, qui charge en moins de 3 secondes, qui s'affiche parfaitement sur mobile et tablette, et qui remonte dans les résultats Google. Parce qu'un beau site invisible ne sert à rien.

Nous intégrons également les éléments essentiels à toute présence en ligne sérieuse : formulaire de contact, Google Maps, liens réseaux sociaux, mentions légales et politique de confidentialité conformes RGPD. Votre site est opérationnel dès le premier jour.`,
    price: 'À partir de {{prix:une-page}} €',
    features: [
      'Design personnalisé (pas de modèle préfabriqué)',
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
      `${SITE.conditions.revisionsIncluses} séries de modifications sur la maquette`,
      'Livraison des fichiers sources',
      'Formation à l\'administration',
      'Un mois d’ajustements après la mise en ligne',
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
    metaDesc: 'Site multi-pages jusqu\'à 10 pages, blog intégré, à partir de {{prix:multi-pages}} €. Architecture SEO, design personnalisé. Devis gratuit.',
    description: `Un site multi-pages va plus loin qu'un simple site vitrine. Il permet de développer l'ensemble de votre univers de marque, de détailler chaque service, de créer une vraie relation avec vos visiteurs et d'optimiser votre référencement sur de nombreux mots-clés.

Chez Stackup Agency, nous concevons des sites multi-pages pensés comme de véritables machines à générer des opportunités commerciales. Chaque page est conçue avec un objectif précis : informer, rassurer, convaincre et convertir.

Ce type de site est idéal si vous proposez plusieurs services distincts, si vous souhaitez partager du contenu régulier via un blog, si vous gérez plusieurs types de clients, ou si vous avez besoin d'une page dédiée pour chaque produit ou offre.

Nous travaillons sur l'architecture de l'information — la façon dont les pages s'organisent et s'enchaînent — pour que vos visiteurs trouvent naturellement ce qu'ils cherchent et soient guidés vers une prise de contact ou un achat. Navigation intuitive, maillage interne stratégique, appels à l'action bien placés.

Le rendu final est un site professionnel, rapide, sécurisé et optimisé pour les moteurs de recherche. Nous livrons avec une formation à l'outil d'administration pour que vous puissiez mettre à jour votre contenu en autonomie.`,
    price: 'À partir de {{prix:multi-pages}} €',
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
      `${SITE.conditions.revisionsIncluses} séries de modifications sur la maquette`,
      'Module blog',
      'Formation à l\'administration',
      'Un mois d’ajustements après la mise en ligne',
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
      { q: 'Combien de temps après la livraison puis-je vous contacter ?', a: 'Pendant un mois après la mise en ligne, les petites modifications du périmètre prévu sont gratuites. Ensuite, un abonnement composé selon vos besoins peut prendre le relais.' },
    ],
    cta: 'Créer mon site multi-pages',
  },
  'site-ecommerce': {
    title: 'Site E-commerce',
    subtitle: 'Vendez en ligne 24h/24 avec une boutique performante.',
    metaDesc: 'Boutique en ligne sur mesure à partir de {{prix:boutique}} €. Paiement en ligne sécurisé, SEO produits, gestion des stocks. Devis gratuit.',
    description: `Le commerce en ligne ne s'improvise pas. Un site e-commerce mal conçu, lent ou peu sécurisé génère des paniers abandonnés, de la méfiance et des ventes perdues. Chez Stackup Agency, nous développons des boutiques en ligne qui inspirent confiance, simplifient le parcours d'achat et maximisent les conversions.

Chaque e-commerce que nous créons est pensé du point de vue de l'acheteur. Parcours d'achat fluide, pages produits optimisées, paiement sécurisé multi-méthodes (carte, virement, PayPal), gestion des stocks intuitive et tableau de bord administrateur complet pour piloter votre activité.

Nous intégrons les meilleures pratiques de l'UX e-commerce : photos produits zoomables, avis clients, produits similaires, promotions et codes promo, gestion des retours, emails transactionnels automatiques (confirmation de commande, livraison, etc.).

Sur le plan technique, vos clients peuvent faire confiance : certificat SSL, paiement conforme PCI DSS, données cryptées. De votre côté, vous avez accès à des analytics détaillés pour suivre vos performances et optimiser vos ventes.

Que vous vendiez 10 ou 10 000 produits, nous adaptons la solution à votre catalogue et à vos ambitions.`,
    price: 'À partir de {{prix:boutique}} €',
    features: [
      'Catalogue produits illimité',
      'Paiement en ligne sécurisé (CB, PayPal)',
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
      `${SITE.conditions.revisionsIncluses} séries de modifications sur la maquette`,
      'Formation complète',
      'Un mois d’ajustements après la mise en ligne',
    ],
    process: [
      { step: 'Audit & Cahier des charges', desc: 'Analyse de votre catalogue, de vos modes de livraison et de vos besoins spécifiques.' },
      { step: 'Design UX/UI', desc: 'Conception du parcours d\'achat et des modèles de pages produits.' },
      { step: 'Développement & Intégration', desc: 'Développement de la boutique avec intégration des paiements et de la logistique.' },
      { step: 'Tests & Sécurité', desc: 'Tests d\'achat complets, vérification de sécurité et optimisation des performances.' },
      { step: 'Lancement & Formation', desc: 'Mise en ligne, formation à l\'administration et premier suivi des ventes.' },
    ],
    faq: [
      { q: 'Quels moyens de paiement peuvent être intégrés ?', a: 'Carte bancaire, PayPal, virement bancaire, et d\'autres solutions sur demande.' },
      { q: 'Puis-je gérer les stocks moi-même ?', a: 'Oui, vous avez un accès complet à l\'interface d\'administration pour gérer stocks, commandes et clients.' },
      { q: 'Le site est-il sécurisé pour les paiements ?', a: 'Absolument. Nous utilisons uniquement des solutions de paiement certifiées PCI DSS avec cryptage SSL.' },
    ],
    cta: 'Lancer ma boutique en ligne',
  },
  'systeme-gestion': {
    title: 'Système de Gestion',
    subtitle: 'Des outils sur mesure pour piloter votre activité.',
    metaDesc: 'Application de gestion sur mesure à partir de {{prix:outil}} €. Réservations, commandes, dashboard temps réel. Adapté à votre métier.',
    description: `Les logiciels génériques ne font jamais exactement ce dont vous avez besoin. Ils sont souvent trop complexes, trop chers, ou trop rigides pour s'adapter à vos processus spécifiques. Chez Stackup Agency, nous développons des systèmes de gestion entièrement sur mesure, pensés pour votre métier et vos équipes.

Un système de gestion, c'est l'interface centrale de votre activité : réservations en ligne, gestion des commandes, tableau de bord en temps réel, programme de fidélité, gestion des employés, suivi des stocks, rapports automatiques... Tout ce dont vous avez besoin, rien de superflu.

Notre exemple de référence — L'Olivier Dashboard — illustre ce type de système. Il permet aux clients de réserver une table et de passer commande en ligne, à la cuisine de recevoir les commandes en temps réel sur une tablette, au gestionnaire de tout piloter depuis un dashboard, et aux clients fidèles de cumuler des points automatiquement.

Le résultat : moins d'erreurs, moins de temps perdu, plus de satisfaction client et plus de rentabilité. Ce type de système s'amortit généralement en quelques mois grâce aux gains de productivité qu'il génère.

Nous analysons vos flux de travail, nous concevons l'architecture, nous développons, nous testons et nous formons vos équipes. Et nous restons disponibles pour faire évoluer l'outil avec votre activité.`,
    price: 'À partir de {{prix:outil}} €',
    priceNote: 'Le prix exact se fixe au devis, selon les modules choisis.',
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
      'Un mois d’ajustements après la mise en ligne',
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
}

export const SERVICES: Record<string, Service> = jetonsProfond(BRUT_SERVICES)
