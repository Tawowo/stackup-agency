export const SITE = {
  name: 'Stackup Agency',
  legalName: 'Stackup Agency',
  url: 'https://stackup-agency.fr',
  email: 'contact@stackup-agency.fr',
  signature: "L'équipe Stackup Agency",
  address: {
    locality: 'Tours',
    department: 'Indre-et-Loire',
    departmentCode: '37',
    region: 'Centre-Val de Loire',
    country: 'FR',
  },
  serviceArea: 'Toute la France — interventions à distance et en région Centre-Val de Loire',
  founded: '2026',
  social: {
    linkedin: 'https://www.linkedin.com/in/stackup-agency-5756943aa/',
    instagram: 'https://www.instagram.com/stackup.agency/',
    facebook: 'https://www.facebook.com/profile.php?id=61588724591496',
  },
  pricing: {
    vitrine: 449,
    multipages: 749,
    association: 149,
    gestion: 1447,
    ecommerce: 1647,
    marketingMensuel: 0, // sur devis — ne pas afficher
    redactionArticle: 25,
    maintenanceStarter: 29,
    maintenancePro: 44,
    maintenancePremium: 89,
  },
  delais: {
    vitrine: '10 jours ouvrés',
    multipages: '17 jours ouvrés',
    ecommerce: '21 jours ouvrés',
    gestion: '21 jours ouvrés',
    association: '7 jours ouvrés',
  },
  indexNowKey: 'a3f7c2e1d9b4e8f0a1c5d7e9f2b3a4c6',

  /* ─── CONDITIONS COMMERCIALES — UNE SEULE VERSION ────────────────────────
     L'audit a relevé jusqu'à TROIS versions de la même condition selon
     l'endroit du site : l'acompte à 30/70, 40/60 ou 40/30/30 ; le support
     après livraison à 15, 30, 60 ou 90 jours ; les révisions à 2 ou 3. Un
     prospect attentif les voit, et un concurrent aussi.

     La version retenue est celle des CGV au format PDF du 28 juillet 2026,
     la plus récente et la plus engageante juridiquement. Toutes les pages,
     le configurateur, le devis, les JSON-LD et le comparateur lisent
     désormais CES valeurs et aucune autre. */
  conditions: {
    /** Acompte à la commande, en pourcentage. Solde à la livraison. */
    acomptePourcent: 40,
    soldePourcent: 60,
    /** Paiement en trois fois proposé au-delà de ce montant. */
    paiementTroisFoisDes: 749,
    /** Révisions comprises pendant la fabrication. */
    revisionsIncluses: 3,
    /** Support après mise en ligne, en jours calendaires. */
    supportJours: 30,
    /** Suppression de la mention « Réalisé par Stackup Agency ». */
    retraitSignatureEuros: 100,
    /** Suppléments, alignés sur les CGV. */
    supplements: {
      revisionSupplementaire: '25 à 35 €',
      pageSupplementaire: '60 €',
      produitAuDelaDe50: '2 € par produit',
    },
    devisValiditeJours: 30,
    tva: 'TVA non applicable, article 293 B du CGI. Prix affichés TTC.',
    nomDomaine: 'Nom de domaine offert la première année.',
    propriete: 'Propriété intégrale du code après solde.',
  },

  /* ─── HÉBERGEMENT — DIT TEL QU'IL EST ────────────────────────────────────
     Le site affirmait « hébergement France, vos données ne partent pas aux
     États-Unis » pendant que les mentions légales nomment Vercel Inc.,
     société américaine. C'est une contradiction visible, et la règle
     d'honnêteté interdit de la laisser. Formulation unique ci-dessous. */
  hebergement: {
    court: 'Hébergement en Europe',
    long: "Hébergement en Europe ou en France selon l'offre et votre choix. L'infrastructure par défaut est Vercel (régions européennes) ; un hébergement français est possible sur demande pour les systèmes de gestion.",
  },

  /* ─── PARRAINAGE — UNE SEULE VERSION ─────────────────────────────────────
     Quatre versions coexistaient (1 mois Premium, −10 %, « 1 mois de
     maintenance », « 200 € » dans l'image Open Graph). Celle-ci fait foi. */
  parrainage: {
    filleulRemise: 10,
    parrainRecompense: '1 mois de maintenance Premium offert',
  },

  /* ─── OFFRE EN COURS — MÉCANISME GÉNÉRIQUE ───────────────────────────────
     Remplace tout le code spécifique à l'« offre de rentrée », qui portait
     deux dates de fin contradictoires (13 et 15 septembre) et laissait une
     page, cinq composants et une case à cocher dans le devis longtemps après
     son expiration. Une seule date, un seul interrupteur. */
  offreEnCours: {
    active: false,
    titre: '',
    conditions: '',
    /** Date de fin au format ISO. Vide si aucune offre. */
    finLe: '',
    lien: '',
  },

  /* ─── DISPONIBILITÉ ──────────────────────────────────────────────────────
     Saisie à la main par le fondateur, jamais calculée : une disponibilité
     calculée automatiquement serait une urgence fabriquée. Chaîne vide =
     rien n'est affiché. */
  prochainCreneau: '',
} as const

/** Source unique des 7 offres affichées partout (cartes, tarifs, fiches) */
export const SERVICES = [
  {
    id: 'site-vitrine',
    titre: 'Site vitrine',
    prix: 449,
    unite: '€',
    delai: '10 jours ouvrés',
    desc: 'Présence professionnelle en ligne, SEO local, formulaire de contact. Hébergement 12 mois inclus.',
    href: '/services/site-vitrine',
    badge: 'Le plus rapide',
  },
  {
    id: 'site-multi-pages',
    titre: 'Site multi-pages',
    prix: 749,
    unite: '€',
    delai: '17 jours ouvrés',
    desc: 'Site complet avec blog, galerie, pages service, Google Analytics et formulaires avancés.',
    href: '/services/site-multi-pages',
    badge: null,
  },
  {
    id: 'site-ecommerce',
    titre: 'Boutique en ligne',
    prix: 1647,
    unite: '€',
    delai: '21 jours ouvrés',
    desc: 'E-commerce complet avec catalogue, paiement en ligne sécurisé, gestion des stocks et tableau de bord.',
    href: '/services/site-ecommerce',
    badge: 'Le plus populaire',
  },
  {
    id: 'systeme-gestion',
    titre: 'Système de gestion',
    prix: 1447,
    unite: '€',
    delai: '21 jours ouvrés',
    desc: 'Logiciel sur mesure : caisse, agenda, CRM, commandes. Données hébergées en France.',
    href: '/services/systeme-gestion',
    badge: 'Sur mesure',
  },
  {
    id: 'site-association',
    titre: 'Site association',
    prix: 149,
    unite: '€',
    delai: '7 jours ouvrés',
    desc: 'Site loi 1901 avec adhésion en ligne, agenda des événements et formulaire de bénévolat.',
    href: '/services/site-association',
    badge: null,
  },
  {
    id: 'marketing-digital',
    titre: 'Marketing digital',
    prix: null,
    unite: null,
    delai: null,
    desc: 'Stratégie SEO, Google Ads, réseaux sociaux et reporting mensuel pour booster votre visibilité.',
    href: '/services',
    badge: null,
  },
  {
    id: 'redaction-blog-seo',
    titre: 'Rédaction blog SEO',
    prix: 25,
    unite: '€/article',
    delai: null,
    desc: 'Articles optimisés SEO rédigés par des experts, publiés et maillés dans votre site.',
    href: '/services/redaction-blog-seo',
    badge: null,
  },
] as const
