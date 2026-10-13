export const SITE = {
  name: 'Stackup Agency',
  legalName: 'Stackup Agency',
  url: 'https://stackup-agency.fr',
  email: 'contact@stackup-agency.fr',
  /* Aucun numéro n'existait dans le dépôt au moment d'écrire la page de
     maintenance, et je n'en invente pas. Renseignez-le ici au format
     international (« +33 6 12 34 56 78 ») et il s'affichera ; laissé vide,
     la page n'affiche que l'adresse e-mail. */
  telephone: '',
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
  /* PRIX PLANCHERS, JAMAIS DES PRIX FERMES.
     Chaque montant ci-dessous est un point de DÉPART : le prix définitif
     dépend du périmètre et se fixe au devis. Tout affichage passe donc par
     `aPartirDe()` ci-dessous, pour qu'aucun écran ne puisse présenter l'un
     de ces nombres comme un tarif arrêté. */
  pricing: {
    vitrine: 449,
    multipages: 749,
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
     maintenance », « 200 € » dans l'image Open Graph).

     C'est l'article 13 des CGV qui fait foi, et il décrit un CHOIX, pas une
     récompense unique : « au choix, 1 mois d'abonnement Premium (89 €)
     offert OU −10 % sur sa propre prestation non encore signée ». La
     première rédaction de ce bloc avait aplati ce choix en une seule
     branche, ce qui recréait la divergence qu'il devait supprimer — la page
     de parrainage, elle, offrait bien les deux. */
  parrainage: {
    /** Remise accordée au filleul sur son premier projet, en pourcent. */
    filleulRemise: 10,
    /** Les deux branches au choix du parrain, par filleul signé. */
    parrainRecompenseA: "1 mois d'abonnement Premium offert (valeur à partir de 89 €)",
    parrainRecompenseB: '−10 % sur sa propre prestation non encore signée',
    /** Formulation courte, pour un titre ou une carte. */
    parrainCourt: '1 mois Premium offert ou −10 %',
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

/**
 * Un prix tel qu'il doit s'afficher partout sur le site.
 *
 * Les montants de `SITE.pricing` sont des planchers : le prix définitif
 * dépend du périmètre et se fixe au devis. Les afficher nus — « 449 € » —
 * les fait lire comme des tarifs arrêtés, ce qu'ils ne sont pas. Cette
 * fonction est le seul endroit où la formule est écrite, pour qu'elle reste
 * la même d'un écran à l'autre.
 *
 * L'espace avant l'euro est insécable : « 449 €» ne doit jamais se couper
 * en fin de ligne.
 */
export function aPartirDe(montant: number, suffixe = '€'): string {
  return `à partir de ${montant.toLocaleString('fr-FR')}\u00a0${suffixe}`
}

/** Variante capitalisée, pour un début de phrase ou un intitulé. */
export function APartirDe(montant: number, suffixe = '€'): string {
  const t = aPartirDe(montant, suffixe)
  return t.charAt(0).toUpperCase() + t.slice(1)
}

/**
 * LA FIN ANNONCÉE DE LA MAINTENANCE.
 *
 * Une date FIXE, écrite en clair, et non un calcul du type « maintenant
 * + 48 h » : ce dernier repousserait l'échéance à chaque chargement et le
 * compte à rebours n'arriverait jamais à zéro. Le visiteur qui revient une
 * heure plus tard doit voir une heure de moins.
 *
 * Format ISO 8601 avec le fuseau explicite (`Z` = UTC) : sans lui, un
 * navigateur interprète la chaîne dans SON fuseau, et deux visiteurs de
 * continents différents voient deux comptes à rebours différents.
 *
 * Posée à 48 h de sa rédaction, le 13 octobre 2026 à 15 h 15 UTC.
 * Pour la changer : remplacez simplement la chaîne ci-dessous.
 */
export const MAINTENANCE_FIN = '2026-10-15T15:15:21Z'

/**
 * LE MODE MAINTENANCE EST-IL ACTIF ?
 *
 * C'EST CETTE LIGNE QUI DÉCIDE, et rien d'autre. Mettre `false` rallume le
 * site ; mettre `true` le remet en construction. Un commit, un déploiement,
 * c'est tout.
 *
 * POURQUOI ICI PLUTÔT QUE DANS UNE VARIABLE D'ENVIRONNEMENT. La variable
 * existe toujours (voir `middleware.ts`) et reste prioritaire, mais elle
 * oblige à passer par le tableau de bord de l'hébergeur, à ne pas se tromper
 * d'environnement, et à redéployer quand même. Une constante dans le dépôt
 * se lit, se relit et se change au même endroit que le reste du site —
 * personne n'a à deviner où est l'interrupteur.
 *
 * La date de fin du compte à rebours est juste au-dessus : les deux vont
 * ensemble, et c'est voulu.
 */
export const MAINTENANCE_ACTIVE = true
