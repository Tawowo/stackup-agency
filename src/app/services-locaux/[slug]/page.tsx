import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, ArrowRight, Mail } from 'lucide-react'

type PageData = {
  title: string
  metaTitle: string
  metaDesc: string
  hero: { headline: string; subheadline: string; cta: string }
  problem: { title: string; points: string[] }
  solution: { title: string; desc: string }
  features: { title: string; desc: string; icon: string }[]
  steps: { num: string; title: string; desc: string }[]
  price: { from: string; details: string }
  faq: { q: string; a: string }[]
  testimonial: { quote: string; author: string; company: string }
}

const pages: Record<string, PageData> = {
  'creation-site-restaurant': {
    title: 'Création de site web pour restaurant',
    metaTitle: 'Site web restaurant — Réservation en ligne',
    metaDesc: 'Créez un site web professionnel pour votre restaurant : réservation en ligne, menu digital, SEO local, click & collect. Livré en 10 jours dès 449€.',
    hero: {
      headline: 'Le site web qui remplit votre restaurant',
      subheadline: 'Réservation en ligne, menu digital, SEO local et click & collect — tout ce dont votre établissement a besoin pour attirer plus de clients.',
      cta: 'Obtenir un devis gratuit',
    },
    problem: {
      title: '80% des clients cherchent un restaurant sur Google avant de réserver',
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
    steps: [
      { num: '01', title: 'Consultation gratuite', desc: 'On échange 30 minutes pour comprendre votre établissement, vos besoins et vos objectifs.' },
      { num: '02', title: 'Maquette en 48h', desc: 'Vous recevez une maquette complète de votre site avant qu\'une seule ligne de code soit écrite.' },
      { num: '03', title: 'Développement', desc: 'Notre équipe code votre site en 7 jours. Rapide, fiable, performant.' },
      { num: '04', title: 'Mise en ligne', desc: 'Votre site est en ligne. On configure Google Business et on vous forme à la gestion.' },
    ],
    price: { from: 'À partir de 449€', details: 'Site vitrine complet, menu digital, réservation en ligne, SEO local. Pas de frais cachés.' },
    faq: [
      { q: 'Combien de temps pour créer mon site ?', a: 'Nous livrons en 10 jours ouvrés après validation de la maquette.' },
      { q: 'Est-ce que je peux modifier mon menu moi-même ?', a: 'Oui, nous vous formons à la gestion du contenu. Modifier une carte prend moins de 5 minutes.' },
      { q: 'Y a-t-il des frais de commission sur les réservations ?', a: 'Aucune commission. Votre système de réservation vous appartient entièrement.' },
      { q: 'Mon site sera-t-il visible sur Google ?', a: 'Oui, nous optimisons votre référencement local et configurons votre fiche Google Business.' },
    ],
    testimonial: {
      quote: 'Depuis notre nouveau site, nous recevons 30% de réservations en plus par mois. La mise en place a été rapide et l\'équipe Stackup a tout géré.',
      author: 'Chef propriétaire',
      company: 'Restaurant, Centre-Val de Loire',
    },
  },

  'creation-site-artisan': {
    title: 'Création de site web pour artisan',
    metaTitle: 'Site web artisan — Devis en ligne et SEO local',
    metaDesc: 'Site web professionnel pour artisans : portfolio chantiers, devis en ligne, prise de RDV, SEO local. Générez des leads qualifiés. Livré en 10 jours dès 449€.',
    hero: {
      headline: 'Le site qui remplit votre carnet de commandes',
      subheadline: 'Portfolio de réalisations, formulaire de devis, prise de RDV en ligne et SEO local — attirez des clients qualifiés dans votre secteur.',
      cta: 'Demander un devis gratuit',
    },
    problem: {
      title: '90% des particuliers cherchent un artisan sur Google avant d\'appeler',
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
    steps: [
      { num: '01', title: 'Échange découverte', desc: 'On parle de votre métier, vos spécialités et votre zone géographique cible.' },
      { num: '02', title: 'Maquette personnalisée', desc: 'Design sur mesure adapté à votre secteur en 48h. Validé avant développement.' },
      { num: '03', title: 'Intégration de vos réalisations', desc: 'On met en valeur vos meilleurs chantiers avec photos et descriptions.' },
      { num: '04', title: 'Mise en ligne et SEO', desc: 'Votre site est en ligne, référencé sur Google et sur votre Google Business Profile.' },
    ],
    price: { from: 'À partir de 449€', details: 'Portfolio, formulaire de devis, SEO local, Google Business. Formation incluse.' },
    faq: [
      { q: 'Je n\'ai pas de photos de mes chantiers, c\'est un problème ?', a: 'Non. Nous vous conseillons sur comment photographier facilement vos chantiers avec un smartphone. Des photos simples bien cadrées suffisent.' },
      { q: 'Mon site sera visible sur quelle zone géographique ?', a: 'Nous optimisons votre référencement sur votre commune et les communes environnantes selon votre rayon d\'intervention.' },
      { q: 'Combien de temps pour avoir des résultats SEO ?', a: 'Les premiers résultats apparaissent entre 2 et 4 mois. En attendant, votre site donne déjà une image professionnelle.' },
      { q: 'Est-ce que je peux ajouter des réalisations moi-même ?', a: 'Oui, nous vous formons. Ajouter un nouveau chantier prend moins de 10 minutes.' },
    ],
    testimonial: {
      quote: 'J\'ai reçu ma première demande de devis en ligne 3 jours après la mise en ligne. En 6 mois, 40% de mes nouveaux clients viennent de mon site.',
      author: 'Artisan plombier-chauffagiste',
      company: 'Eure-et-Loir',
    },
  },

  'creation-site-commerce': {
    title: 'Création de site web pour commerce',
    metaTitle: 'Site web commerce — Click & collect, SEO local',
    metaDesc: 'Site web professionnel pour votre commerce : catalogue en ligne, click & collect, horaires, SEO local. Attirez des clients et vendez en ligne. Dès 449€.',
    hero: {
      headline: 'Votre commerce mérite d\'être visible en ligne',
      subheadline: 'Catalogue produits, horaires, click & collect et SEO local — combattez les pure players avec un site web qui convertit les visiteurs en clients.',
      cta: 'Obtenir un devis gratuit',
    },
    problem: {
      title: '76% des clients cherchent un commerce local sur Google avant de se déplacer',
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
    steps: [
      { num: '01', title: 'Audit de votre situation', desc: 'On analyse votre présence en ligne actuelle et ce que font vos concurrents.' },
      { num: '02', title: 'Stratégie personnalisée', desc: 'On définit les fonctionnalités prioritaires selon votre type de commerce.' },
      { num: '03', title: 'Création et intégration', desc: 'Votre catalogue, vos photos, vos horaires — tout est intégré et optimisé.' },
      { num: '04', title: 'Formation et suivi', desc: 'On vous forme à la gestion du site. Support disponible si besoin.' },
    ],
    price: { from: 'À partir de 449€', details: 'Site vitrine + catalogue + SEO local. Click & collect disponible en option.' },
    faq: [
      { q: 'Je vends des centaines de produits, est-ce faisable ?', a: 'Oui. Nous pouvons créer une boutique e-commerce complète avec gestion des stocks. Devis personnalisé à partir de 749€.' },
      { q: 'Mes horaires changent souvent, comment les mettre à jour ?', a: 'Vous les modifiez vous-même en 2 clics depuis votre espace d\'administration. Votre Google Business est synchronisé.' },
      { q: 'Le click & collect prend-il une commission ?', a: 'Aucune commission. Vous encaissez 100% du montant des commandes.' },
      { q: 'Puis-je vendre en ligne et en boutique en même temps ?', a: 'Oui, c\'est précisément l\'objectif. Le stock est géré en temps réel pour éviter les ruptures.' },
    ],
    testimonial: {
      quote: 'Notre boutique fait maintenant 25% de son chiffre d\'affaires grâce au click & collect mis en place par Stackup. La livraison locale suit.',
      author: 'Responsable boutique',
      company: 'Commerce de centre-ville',
    },
  },

  'creation-boutique-en-ligne': {
    title: 'Création de boutique en ligne',
    metaTitle: 'Boutique en ligne sur mesure — dès 1 147€',
    metaDesc: 'Lancez votre boutique en ligne sur mesure : paiement sécurisé, gestion des stocks, livraison, SEO e-commerce. Développement professionnel dès 1 147€.',
    hero: {
      headline: 'Votre boutique en ligne livrée en 10 jours',
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
      desc: 'Nous développons des boutiques e-commerce sur mesure avec Next.js et Stripe : rapides, sécurisées, référencées sur Google. Zéro commission sur vos ventes, vos clients vous appartiennent.',
    },
    features: [
      { title: 'Paiement sécurisé Stripe', desc: 'CB, Apple Pay, Google Pay. Argent viré directement sur votre compte. Aucune commission Stackup.', icon: '💳' },
      { title: 'Gestion des stocks', desc: 'Alertes de rupture, variants (tailles, couleurs), stock en temps réel. Simple à administrer.', icon: '📦' },
      { title: 'Livraison automatisée', desc: 'Calcul automatique des frais selon le poids et la destination. Intégration Colissimo, Mondial Relay.', icon: '🚚' },
      { title: 'SEO e-commerce', desc: 'Pages produits optimisées pour Google. Vos produits apparaissent dans les résultats de recherche.', icon: '🔍' },
      { title: 'Avis produits', desc: 'Les clients laissent des avis sur vos produits. Ça rassure et ça convertit.', icon: '⭐' },
      { title: 'Analytics & rapports', desc: 'Tableau de bord avec ventes, panier moyen, produits les plus vendus. Pilotez votre activité.', icon: '📊' },
    ],
    steps: [
      { num: '01', title: 'Définition du catalogue', desc: 'On structure votre catalogue, vos catégories et vos pages produits avec vous.' },
      { num: '02', title: 'Design sur mesure', desc: 'Maquette de votre boutique adaptée à votre univers de marque. Validée avant développement.' },
      { num: '03', title: 'Développement & intégration', desc: 'Développement complet, intégration Stripe, configuration livraison, SEO produits.' },
      { num: '04', title: 'Formation & lancement', desc: 'On vous forme à la gestion des commandes, du catalogue et des promotions.' },
    ],
    price: { from: 'À partir de 1 147€', details: 'Boutique complète, paiement Stripe, livraison, SEO. Formation à la gestion incluse.' },
    faq: [
      { q: 'Combien prend Stripe de commission ?', a: 'Stripe prend 1,5% + 0,25€ par transaction (cartes européennes). C\'est tout. Stackup ne prend aucune commission.' },
      { q: 'Combien de produits puis-je avoir ?', a: 'Autant que vous voulez. Notre boutique gère des catalogues de 10 à 10 000 produits.' },
      { q: 'Puis-je gérer les promotions et codes promo ?', a: 'Oui, depuis votre espace d\'administration vous créez des promotions, codes de réduction et ventes flash.' },
      { q: 'Et si je veux vendre en France et en Europe ?', a: 'Votre boutique peut être multilingue et gérer plusieurs devises. TVA par pays incluse.' },
    ],
    testimonial: {
      quote: 'En 3 mois, notre boutique en ligne a généré autant de CA que notre point de vente physique. Et sans payer de commission à personne.',
      author: 'Créatrice de cosmétiques naturels',
      company: 'Boutique en ligne, France',
    },
  },

  'developpement-application-metier': {
    title: 'Développement d\'application métier sur mesure',
    metaTitle: 'Application métier sur mesure — CRM et ERP',
    metaDesc: 'Développement d\'application métier sur mesure : CRM, ERP, gestion planning, facturation automatique. Remplacez Excel et les logiciels génériques. Dès 1 447€.',
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
    steps: [
      { num: '01', title: 'Atelier de cadrage', desc: 'On cartographie vos processus actuels et on définit précisément les fonctionnalités nécessaires.' },
      { num: '02', title: 'Spécifications & maquettes', desc: 'Document de spécifications validé, puis maquettes complètes de l\'interface.' },
      { num: '03', title: 'Développement itératif', desc: 'Développement par sprints avec démonstrations régulières. Vous voyez avancer le projet.' },
      { num: '04', title: 'Déploiement & formation', desc: 'Mise en production, formation de vos équipes, documentation. Support 3 mois inclus.' },
    ],
    price: { from: 'À partir de 1 447€', details: 'Application sur mesure, hébergement sécurisé, formation équipe, support 3 mois. Devis précis après atelier de cadrage.' },
    faq: [
      { q: 'Combien de temps pour développer mon application ?', a: 'Entre 4 et 12 semaines selon la complexité. Nous définissons ensemble le planning lors du cadrage.' },
      { q: 'Est-ce que mes données sont sécurisées ?', a: 'Oui. Hébergement en France, chiffrement des données, sauvegardes quotidiennes, conformité RGPD.' },
      { q: 'Puis-je faire évoluer l\'application plus tard ?', a: 'Absolument. On développe en pensant à l\'évolutivité. Ajouter une fonctionnalité est simple et bien documenté.' },
      { q: 'Est-ce que l\'application fonctionne sur mobile ?', a: 'Oui, toutes nos applications sont responsives et accessibles depuis smartphone et tablette.' },
    ],
    testimonial: {
      quote: 'On a remplacé 4 logiciels différents par une seule application Stackup. L\'équipe gagne 2h par jour et les erreurs de saisie ont disparu.',
      author: 'Dirigeant PME',
      company: '25 employés, secteur services',
    },
  },

  'referencement-local-seo': {
    title: 'Référencement local SEO',
    metaTitle: 'Référencement local — Apparaître sur Google Maps',
    metaDesc: 'Référencement local SEO : Google Business Profile, mots-clés locaux, backlinks, avis clients. Apparaissez en premier sur Google dans votre ville. Dès 189€/mois.',
    hero: {
      headline: 'Apparaître en premier sur Google dans votre ville',
      subheadline: 'Google Business Profile optimisé, mots-clés locaux, stratégie d\'avis et backlinks — tout pour dominer les résultats de recherche locaux.',
      cta: 'Audit SEO gratuit',
    },
    problem: {
      title: '46% des recherches Google ont une intention locale',
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
    steps: [
      { num: '01', title: 'Audit de visibilité', desc: 'On analyse votre situation actuelle et celle de vos concurrents sur Google.' },
      { num: '02', title: 'Stratégie personnalisée', desc: 'Plan d\'action priorisé selon votre secteur, votre zone et votre budget.' },
      { num: '03', title: 'Optimisation technique', desc: 'Google Business, site web, citations locales — tout est optimisé.' },
      { num: '04', title: 'Suivi et amélioration', desc: 'Reporting mensuel et ajustements continus. Le SEO est un marathon, pas un sprint.' },
    ],
    price: { from: 'À partir de 189€/mois', details: 'Audit initial, optimisation Google Business, suivi mensuel. Engagement 6 mois minimum recommandé.' },
    faq: [
      { q: 'En combien de temps verrai-je des résultats ?', a: 'Entre 2 et 4 mois pour les premiers résultats visibles. En 6 mois, votre positionnement est significativement amélioré.' },
      { q: 'J\'ai déjà un site web, avez-vous besoin de le refaire ?', a: 'Non, on peut optimiser votre site existant. Si des modifications importantes sont nécessaires, on vous le dira clairement.' },
      { q: 'Quelle est la différence entre SEO local et Google Ads ?', a: 'Le SEO local génère du trafic organique (gratuit sur le long terme). Google Ads génère du trafic payant immédiat. Les deux sont complémentaires.' },
      { q: 'Que se passe-t-il si j\'arrête le service ?', a: 'Votre positionnement reste acquis sur le court terme. On vous donne tous les accès et la documentation. Rien n\'est propriétaire.' },
    ],
    testimonial: {
      quote: 'En 4 mois, on est passés de la 2ème page à la 3ème position sur "plombier Dreux". On reçoit maintenant 8 à 10 demandes par semaine via Google.',
      author: 'Artisan plombier',
      company: 'Eure-et-Loir',
    },
  },
}

export function generateStaticParams() {
  return Object.keys(pages).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = pages[slug]
  if (!page) return {}
  const url = `https://stackup-agency.fr/services-locaux/${slug}`
  return {
    title: page.metaTitle,
    description: page.metaDesc,
    alternates: { canonical: url },
    openGraph: { url, title: page.metaTitle, description: page.metaDesc, type: 'website' },
  }
}

export default async function ServicesLocauxPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = pages[slug]
  if (!page) notFound()

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0F1C]">
      {/* Hero */}
      <div className="bg-[#050A14] pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-10 transition-colors">
            <ArrowLeft size={14} /> Retour au site
          </Link>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {page.hero.headline}
          </h1>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            {page.hero.subheadline}
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#1E3A5F] to-[#2D7DD2] text-white font-semibold rounded-lg hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-electric/25"
          >
            {page.hero.cta}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Problem */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{page.problem.title}</h2>
          <ul className="space-y-4">
            {page.problem.points.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-ink/70 dark:text-white/70">
                <span className="text-red-500 mt-0.5 flex-shrink-0">✗</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{page.solution.title}</h2>
          <p className="text-lg text-ink/70 dark:text-white/70 leading-relaxed">{page.solution.desc}</p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Ce que comprend votre projet</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {page.features.map((f, i) => (
              <div key={i} className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-gray-500 dark:text-white/60 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Notre processus</h2>
          <div className="space-y-8">
            {page.steps.map((s, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="w-14 h-14 rounded-2xl bg-[#050A14] dark:bg-white/10 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                  {s.num}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{s.title}</h3>
                  <p className="text-gray-500 dark:text-white/60 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Tarifs transparents</h2>
          <div className="bg-white dark:bg-white/5 rounded-2xl p-10 border border-gray-100 dark:border-white/10 inline-block mt-6">
            <div className="text-4xl font-black text-[#2D7DD2] mb-3">{page.price.from}</div>
            <p className="text-gray-500 dark:text-white/60 mb-8">{page.price.details}</p>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#F59E0B] hover:bg-gold text-ink font-semibold rounded-xl transition-all hover:scale-105"
            >
              <Mail size={16} />
              Devis gratuit en 24h
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <blockquote className="text-xl text-ink/70 dark:text-white/70 italic leading-relaxed mb-6">
            &ldquo;{page.testimonial.quote}&rdquo;
          </blockquote>
          <div className="font-semibold text-gray-900 dark:text-white">{page.testimonial.author}</div>
          <div className="text-sm text-muted dark:text-white/40">{page.testimonial.company}</div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Questions fréquentes</h2>
          <div className="space-y-6">
            {page.faq.map((item, i) => (
              <div key={i} className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-[#2D7DD2] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.q}</h3>
                    <p className="text-gray-500 dark:text-white/60 text-sm leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section id="contact" className="py-24 px-4 bg-[#050A14]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Prêt à démarrer votre projet ?</h2>
          <p className="text-white/60 mb-10">Répondez en 72h garanties. Consultation initiale gratuite et sans engagement.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@stackup-agency.fr"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F59E0B] hover:bg-gold text-ink font-semibold rounded-xl transition-all hover:scale-105 shadow-lg shadow-amber-500/25"
            >
              <Mail size={18} />
              contact@stackup-agency.fr
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              Voir nos services
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-8 flex flex-wrap gap-4 text-sm">
        <Link href="/tarifs" className="text-electric hover:underline">Voir les tarifs →</Link>
        <Link href="/realisations" className="text-electric hover:underline">Nos réalisations →</Link>
        <Link href="/contact" className="text-electric hover:underline">Demander un devis →</Link>
      </div>
    </div>
  )
}
