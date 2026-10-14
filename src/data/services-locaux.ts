import { jetonsProfond } from '../lib/jetons'
/**
 * SERVICES LOCAUX — les six pages de l'ancien site (/services-locaux/[slug]),
 * reprises sans étapes chiffrées ni délais (règle 8). Les FAQ qui parlent de
 * délais sont écartées à l'affichage.
 */

export type ServiceLocal = {
  title: string
  metaTitle: string
  metaDesc: string
  hero: { headline: string; subheadline: string; cta: string }
  problem: { title: string; points: string[] }
  solution: { title: string; desc: string }
  features: { title: string; desc: string; icon: string }[]
  price: { from: string; details: string }
  faq: { q: string; a: string }[]
}

const BRUT_SERVICES_LOCAUX: Record<string, ServiceLocal> = {
  'creation-site-restaurant': {
    title: 'Création de site web pour restaurant',
    metaTitle: 'Site web restaurant — Réservation en ligne',
    metaDesc: 'Créez un site web professionnel pour votre restaurant : réservation en ligne, menu digital, SEO local, click & collect Dès {{prix:une-page}} €.',
    hero: {
      headline: 'Le site web qui remplit votre restaurant',
      subheadline: 'Réservation en ligne, menu digital, SEO local et click & collect — tout ce dont votre établissement a besoin pour attirer plus de clients.',
      cta: 'Obtenir un devis gratuit',
    },
    problem: {
      title: 'Vos clients cherchent un restaurant sur Google avant de réserver',
      points: [
        'Votre restaurant n\'apparaît pas en premier sur Google Maps',
        'Vous perdez des réservations faute de système en ligne',
        'Votre menu n\'est pas visible ou pas à jour sur internet',
        'Les plateformes comme TheFork prennent 2€ par couvert',
        'Vous dépendez des avis Tripadvisor sans maîtriser votre image',
      ],
    },
    solution: {
      title: 'Un site web qui travaille pour vous 24h/24',
      desc: 'Nous créons des sites web sur mesure pour les restaurants, avec toutes les fonctionnalités qui convertissent les visiteurs en clients : réservation en ligne, menu interactif, Google Maps intégré et stratégie SEO locale pour apparaître en premier dans votre ville.',
    },
    features: [
      { title: 'Réservation en ligne', desc: 'Système de réservation sans commission, directement depuis votre site. Confirmations automatiques par email et SMS.', icon: '📅' },
      { title: 'Menu digital', desc: 'Menu toujours à jour, photos professionnelles, allergènes, formules. Accessible aussi via QR code en salle.', icon: '🍽️' },
      { title: 'SEO local optimisé', desc: 'Apparaître en premier sur "restaurant [votre ville]". Fiche Google Business intégrée et optimisée.', icon: '📍' },
      { title: 'Click & Collect', desc: 'Module de commande en ligne pour emporter ou livraison. Zéro commission, 100% pour vous.', icon: '🛍️' },
      { title: 'Galerie photo', desc: 'Mise en valeur de vos plats, de votre salle et de votre équipe. La première impression se fait en ligne.', icon: '📸' },
      { title: 'Gestion des avis', desc: 'Stratégie pour obtenir plus d\'avis Google positifs et y répondre professionnellement.', icon: '⭐' },
    ],
    price: { from: 'À partir de {{prix:une-page}} €', details: 'Site vitrine complet, menu digital, réservation en ligne, SEO local. Pas de frais cachés.' },
    faq: [
      { q: 'Combien de temps pour créer mon site ?', a: 'Nous livrons en 10 jours ouvrés après validation de la maquette.' },
      { q: 'Est-ce que je peux modifier mon menu moi-même ?', a: 'Oui, nous vous formons à la gestion du contenu. Modifier une carte prend moins de 5 minutes.' },
      { q: 'Y a-t-il des frais de commission sur les réservations ?', a: 'Aucune commission. Votre système de réservation vous appartient entièrement.' },
      { q: 'Mon site sera-t-il visible sur Google ?', a: 'Oui, nous optimisons votre référencement local et configurons votre fiche Google Business.' },
    ],
  },

  'creation-site-artisan': {
    title: 'Création de site web pour artisan',
    metaTitle: 'Site web artisan — Devis en ligne et SEO local',
    metaDesc: 'Site web professionnel pour artisans : portfolio chantiers, devis en ligne, prise de RDV, SEO local. Générez des leads qualifiés Dès {{prix:une-page}} €.',
    hero: {
      headline: 'Le site qui remplit votre carnet de commandes',
      subheadline: 'Portfolio de réalisations, formulaire de devis, prise de RDV en ligne et SEO local — attirez des clients qualifiés dans votre secteur.',
      cta: 'Demander un devis gratuit',
    },
    problem: {
      title: 'Vos clients cherchent un artisan sur Google avant d\'appeler',
      points: [
        'Vous n\'apparaissez pas dans les recherches Google de votre secteur',
        'Vous perdez du temps à répondre à des appels non qualifiés',
        'Vos chantiers ne sont pas visibles : les clients ne savent pas ce que vous faites',
        'Vous dépendez du bouche-à-oreille seul pour trouver des clients',
        'Vos concurrents avec un site web prennent vos clients',
      ],
    },
    solution: {
      title: 'Un site web qui génère des devis en automatique',
      desc: 'Nous créons des sites web sur mesure pour les artisans du bâtiment et de l\'artisanat, avec un portfolio de vos réalisations, un formulaire de devis en ligne et une stratégie SEO pour apparaître en premier dans votre ville et votre métier.',
    },
    features: [
      { title: 'Portfolio de réalisations', desc: 'Vos chantiers avant/après présentés professionnellement. Convainquez sans avoir à vous déplacer.', icon: '📸' },
      { title: 'Formulaire de devis en ligne', desc: 'Les clients décrivent leur projet directement en ligne. Vous recevez des leads qualifiés par email.', icon: '📋' },
      { title: 'SEO local par métier', desc: 'Apparaître sur "plombier [ville]", "électricien [secteur]"... Ciblage géographique précis.', icon: '📍' },
      { title: 'Prise de RDV en ligne', desc: 'Calendrier intégré pour planifier vos visites techniques. Réduisez les appels inutiles.', icon: '📅' },
      { title: 'Labels et certifications', desc: 'Mise en avant de vos qualifications RGE, Qualibat, assurances. Rassurer le client avant de le voir.', icon: '✅' },
      { title: 'Avis clients', desc: 'Collecte d\'avis Google automatisée. Construisez votre réputation en ligne.', icon: '⭐' },
    ],
    price: { from: 'À partir de {{prix:une-page}} €', details: 'Portfolio, formulaire de devis, SEO local, Google Business. Formation incluse.' },
    faq: [
      { q: 'Je n\'ai pas de photos de mes chantiers, c\'est un problème ?', a: 'Non. Nous vous conseillons sur comment photographier facilement vos chantiers avec un smartphone. Des photos simples bien cadrées suffisent.' },
      { q: 'Mon site sera visible sur quelle zone géographique ?', a: 'Nous optimisons votre référencement sur votre commune et les communes environnantes selon votre rayon d\'intervention.' },
      { q: 'Combien de temps pour avoir des résultats SEO ?', a: 'Les premiers résultats apparaissent entre 2 et 4 mois. En attendant, votre site donne déjà une image professionnelle.' },
      { q: 'Est-ce que je peux ajouter des réalisations moi-même ?', a: 'Oui, nous vous formons. Ajouter un nouveau chantier prend moins de 10 minutes.' },
    ],
  },

  'creation-site-commerce': {
    title: 'Création de site web pour commerce',
    metaTitle: 'Site web commerce — Click & collect, SEO local',
    metaDesc: 'Site web professionnel pour votre commerce : catalogue en ligne, click & collect, horaires, SEO local. Attirez des clients et vendez en ligne. Dès {{prix:une-page}} €.',
    hero: {
      headline: 'Votre commerce mérite d\'être visible en ligne',
      subheadline: 'Catalogue produits, horaires, click & collect et SEO local — combattez les pure players avec un site web qui convertit les visiteurs en clients.',
      cta: 'Obtenir un devis gratuit',
    },
    problem: {
      title: 'Vos clients cherchent un commerce local sur Google avant de se déplacer',
      points: [
        'Vos horaires et adresse sont introuvables ou incorrectes sur Google',
        'Vous n\'avez pas de catalogue en ligne et vous perdez des clients',
        'Amazon et les e-commerces nationaux vous prennent vos clients',
        'Vous n\'avez pas de solution de click & collect alors que vos concurrents en ont',
        'Votre réputation en ligne n\'est pas gérée',
      ],
    },
    solution: {
      title: 'Un site qui attire les clients dans votre boutique ET en ligne',
      desc: 'Nous créons des sites web sur mesure pour les commerces de proximité : catalogue produits, click & collect, horaires dynamiques et SEO local pour apparaître sur Google quand un client de votre quartier cherche ce que vous vendez.',
    },
    features: [
      { title: 'Catalogue en ligne', desc: 'Présentez vos produits avec photos, prix et descriptions. Actualisable facilement.', icon: '🛍️' },
      { title: 'Click & Collect', desc: 'Commandez en ligne, retirez en boutique. Zéro commission, service premium.', icon: '📦' },
      { title: 'SEO local', desc: 'Apparaître sur "[votre type de commerce] [votre ville]". Clients dans votre quartier garantis.', icon: '📍' },
      { title: 'Horaires dynamiques', desc: 'Gestion des horaires exceptionnels, jours fériés, fermetures. Toujours à jour.', icon: '🕐' },
      { title: 'Carte cadeau digitale', desc: 'Vendez des cartes cadeaux en ligne. Idéal pour les fêtes et les offres promotionnelles.', icon: '🎁' },
      { title: 'Newsletter locale', desc: 'Restez en contact avec vos clients fidèles. Annonces, promotions, nouveautés.', icon: '📧' },
    ],
    price: { from: 'À partir de {{prix:une-page}} €', details: 'Site vitrine + catalogue + SEO local. Click & collect disponible en option.' },
    faq: [
      { q: 'Je vends des centaines de produits, est-ce faisable ?', a: 'Oui. Nous pouvons créer une boutique e-commerce complète avec gestion des stocks. Devis personnalisé à partir de {{prix:multi-pages}} €.' },
      { q: 'Mes horaires changent souvent, comment les mettre à jour ?', a: 'Vous les modifiez vous-même en 2 clics depuis votre espace d\'administration. Votre Google Business est synchronisé.' },
      { q: 'Le click & collect prend-il une commission ?', a: 'Aucune commission. Vous encaissez 100% du montant des commandes.' },
      { q: 'Puis-je vendre en ligne et en boutique en même temps ?', a: 'Oui, c\'est précisément l\'objectif. Le stock est géré en temps réel pour éviter les ruptures.' },
    ],
  },

  'creation-boutique-en-ligne': {
    title: 'Création de boutique en ligne',
    metaTitle: 'Boutique en ligne sur mesure — dès {{prix:boutique}} €',
    metaDesc: 'Lancez votre boutique en ligne sur mesure : paiement sécurisé, gestion des stocks, livraison, SEO e-commerce. Développement professionnel dès {{prix:boutique}} €.',
    hero: {
      headline: 'Votre boutique en ligne, à vous',
      subheadline: 'Paiement sécurisé, gestion des stocks, livraison automatisée, SEO e-commerce — tout pour vendre en ligne sans dépendre d\'Amazon ou d\'Etsy.',
      cta: 'Lancer mon e-commerce',
    },
    problem: {
      title: 'Vendre sur les marketplaces vous coûte cher',
      points: [
        'Amazon prend 15 à 40% de commission sur chaque vente',
        'Etsy prend 6,5% + frais de transaction + frais de mise en ligne',
        'Vous ne contrôlez pas la relation client ni votre image de marque',
        'Vos données clients appartiennent à la plateforme, pas à vous',
        'Vous ne pouvez pas fidéliser vos clients ou leur envoyer des newsletters',
      ],
    },
    solution: {
      title: 'Votre boutique en ligne, 100% à vous',
      desc: 'Nous développons des boutiques e-commerce sur mesure avec Next.js et paiement en ligne sécurisé : rapides, sécurisées, référencées sur Google. Zéro commission sur vos ventes, vos clients vous appartiennent.',
    },
    features: [
      { title: 'Paiement en ligne sécurisé', desc: 'CB, Apple Pay, Google Pay. Argent viré directement sur votre compte. Aucune commission Stackup.', icon: '💳' },
      { title: 'Gestion des stocks', desc: 'Alertes de rupture, variants (tailles, couleurs), stock en temps réel. Simple à administrer.', icon: '📦' },
      { title: 'Livraison automatisée', desc: 'Calcul automatique des frais selon le poids et la destination. Intégration Colissimo, Mondial Relay.', icon: '🚚' },
      { title: 'SEO e-commerce', desc: 'Pages produits optimisées pour Google. Vos produits apparaissent dans les résultats de recherche.', icon: '🔍' },
      { title: 'Avis produits', desc: 'Les clients laissent des avis sur vos produits. Ça rassure et ça convertit.', icon: '⭐' },
      { title: 'Analytics & rapports', desc: 'Tableau de bord avec ventes, panier moyen, produits les plus vendus. Pilotez votre activité.', icon: '📊' },
    ],
    price: { from: 'À partir de {{prix:boutique}} €', details: 'Boutique complète, paiement en ligne sécurisé, livraison, SEO. Formation à la gestion incluse.' },
    faq: [
      { q: 'Y a-t-il des commissions sur mes ventes ?', a: 'Seuls les frais bancaires du prestataire de paiement s\'appliquent (de l\'ordre de 1,5% + 0,25€ par transaction pour les cartes européennes). Stackup ne prend aucune commission.' },
      { q: 'Combien de produits puis-je avoir ?', a: 'Autant que vous voulez. Notre boutique gère des catalogues de 10 à 10 000 produits.' },
      { q: 'Puis-je gérer les promotions et codes promo ?', a: 'Oui, depuis votre espace d\'administration vous créez des promotions, codes de réduction et ventes flash.' },
      { q: 'Et si je veux vendre en France et en Europe ?', a: 'Votre boutique peut être multilingue et gérer plusieurs devises. TVA par pays incluse.' },
    ],
  },

  'developpement-application-metier': {
    title: 'Développement d\'application métier sur mesure',
    metaTitle: 'Application métier sur mesure — CRM et ERP',
    metaDesc: 'Développement d\'application métier sur mesure : CRM, ERP, gestion planning, facturation automatique. Remplacez Excel et les logiciels génériques. Dès {{prix:outil}} €.',
    hero: {
      headline: 'Remplacez vos outils obsolètes par une application sur mesure',
      subheadline: 'CRM, gestion planning, facturation automatique, tableau de bord temps réel — une seule application qui fait tout ce que vous avez besoin.',
      cta: 'Discuter de mon projet',
    },
    problem: {
      title: 'Les outils génériques ne correspondent pas à votre métier',
      points: [
        'Excel n\'est pas fait pour gérer vos clients, vos stocks ou votre planning',
        'Les logiciels SaaS sont trop chers et trop génériques (Salesforce, Zoho...)',
        'Vos données sont dispersées dans 5 outils différents qui ne communiquent pas',
        'Vous passez des heures à faire des copier-coller entre logiciels',
        'Vos employés font des erreurs à cause d\'un processus trop manuel',
      ],
    },
    solution: {
      title: 'Une application pensée pour votre métier précis',
      desc: 'Nous développons des applications métier sur mesure qui s\'adaptent à vos processus — pas l\'inverse. CRM, ERP, gestion de planning, portail client, tableau de bord dirigeant : tout ce dont vous avez besoin dans un outil unique.',
    },
    features: [
      { title: 'CRM sur mesure', desc: 'Gestion de vos clients et prospects adaptée à votre cycle de vente. Historique, relances, pipelines.', icon: '👥' },
      { title: 'Gestion du planning', desc: 'Planning de vos équipes, techniciens ou ressources. Vue jour/semaine/mois, alertes, conflits.', icon: '📅' },
      { title: 'Facturation automatique', desc: 'Devis, bons de commande, factures générés automatiquement. Export comptable.', icon: '🧾' },
      { title: 'Tableau de bord dirigeant', desc: 'Chiffre d\'affaires en temps réel, indicateurs clés, alertes. Pilotez sans ouvrir Excel.', icon: '📊' },
      { title: 'Portail client', desc: 'Espace sécurisé où vos clients suivent leurs commandes, documents, factures.', icon: '🔐' },
      { title: 'Notifications temps réel', desc: 'Alertes email, SMS ou push pour vos équipes et vos clients. Rien n\'est oublié.', icon: '🔔' },
    ],
    price: { from: 'À partir de {{prix:outil}} €', details: 'Application sur mesure, hébergement sécurisé, formation équipe, un mois d\'ajustements après la mise en ligne. Le prix exact se fixe au devis, selon les modules choisis.' },
    faq: [
      { q: 'Combien de temps pour développer mon application ?', a: 'Cela dépend du nombre de modules choisis : l’estimateur de la page tarifs donne un délai indicatif, et le planning se définit ensemble lors du cadrage.' },
      { q: 'Est-ce que mes données sont sécurisées ?', a: 'Oui. Hébergement en Europe, chiffrement des données, sauvegardes quotidiennes, conformité RGPD.' },
      { q: 'Puis-je faire évoluer l\'application plus tard ?', a: 'Absolument. On développe en pensant à l\'évolutivité. Ajouter une fonctionnalité est simple et bien documenté.' },
      { q: 'Est-ce que l\'application fonctionne sur mobile ?', a: 'Oui, toutes nos applications sont responsives et accessibles depuis smartphone et tablette.' },
    ],
  },

  'referencement-local-seo': {
    title: 'Référencement local SEO',
    metaTitle: 'Référencement local — Apparaître sur Google Maps',
    metaDesc: 'Référencement local SEO : Google Business Profile, mots-clés locaux, backlinks, avis clients. Apparaissez en premier sur Google dans votre ville. Dès {{abo:suivi-local}} €/mois.',
    hero: {
      headline: 'Apparaître en premier sur Google dans votre ville',
      subheadline: 'Google Business Profile optimisé, mots-clés locaux, stratégie d\'avis et backlinks — tout pour dominer les résultats de recherche locaux.',
      cta: 'Audit SEO gratuit',
    },
    problem: {
      title: 'Une grande part des recherches Google ont une intention locale',
      points: [
        'Vous n\'apparaissez pas dans le "pack local" de Google (les 3 premiers résultats)',
        'Votre fiche Google Business est incomplète ou non optimisée',
        'Vos concurrents apparaissent avant vous alors qu\'ils sont moins bons que vous',
        'Vous n\'avez pas assez d\'avis Google pour être crédible',
        'Votre site n\'est pas optimisé pour les recherches mobiles locales',
      ],
    },
    solution: {
      title: 'Une stratégie SEO locale qui génère des clients',
      desc: 'Nous optimisons votre présence locale sur Google : fiche Google Business complète et optimisée, site web avec pages locales ciblées, stratégie d\'avis clients, et backlinks locaux pertinents. Le tout pour que vos clients vous trouvent quand ils cherchent ce que vous faites dans votre ville.',
    },
    features: [
      { title: 'Audit SEO local', desc: 'Analyse complète de votre visibilité actuelle, de vos concurrents et des opportunités à saisir.', icon: '🔍' },
      { title: 'Google Business Profile', desc: 'Optimisation complète : photos, description, catégories, horaires, posts réguliers, Q&A.', icon: '📍' },
      { title: 'Mots-clés locaux', desc: 'Recherche et ciblage des mots-clés les plus recherchés dans votre secteur et votre ville.', icon: '🎯' },
      { title: 'Pages locales', desc: 'Création de pages optimisées pour chaque commune de votre zone d\'intervention.', icon: '🗺️' },
      { title: 'Stratégie avis clients', desc: 'Système automatisé pour obtenir plus d\'avis Google positifs de vos clients satisfaits.', icon: '⭐' },
      { title: 'Reporting mensuel', desc: 'Rapport mensuel de votre positionnement, du trafic et des leads générés.', icon: '📊' },
    ],
    price: { from: 'À partir de {{abo:suivi-local}} €/mois', details: 'Audit initial, optimisation Google Business, suivi mensuel. Sans engagement, préavis d\'un mois.' },
    faq: [
      { q: 'En combien de temps verrai-je des résultats ?', a: 'Entre 2 et 4 mois pour les premiers résultats visibles. En 6 mois, votre positionnement est significativement amélioré.' },
      { q: 'J\'ai déjà un site web, avez-vous besoin de le refaire ?', a: 'Non, on peut optimiser votre site existant. Si des modifications importantes sont nécessaires, on vous le dira clairement.' },
      { q: 'Quelle est la différence entre SEO local et Google Ads ?', a: 'Le SEO local génère du trafic organique (gratuit sur le long terme). Google Ads génère du trafic payant immédiat. Les deux sont complémentaires.' },
      { q: 'Que se passe-t-il si j\'arrête le service ?', a: 'Votre positionnement reste acquis sur le court terme. On vous donne tous les accès et la documentation. Rien n\'est propriétaire.' },
    ],
  },
}

export const SERVICES_LOCAUX: Record<string, ServiceLocal> = jetonsProfond(BRUT_SERVICES_LOCAUX)
