// FICHIER GÉNÉRÉ par scripts/tarifs-depuis-excel.mjs à partir de docs/tarifs/Grille-tarifaire-Stackup.xlsx.
// Ne pas modifier à la main : éditer l'Excel puis lancer `npm run tarifs`.

export interface TarifParams {
  tauxHoraireCible: number
  coefficient: number
  fourchetteBas: number
  fourchetteHaut: number
  arrondi: number
  pleinTarifJusqua: number
  tranche2Jusqua: number
  tauxTranche2: number
  tauxAuDela: number
  acompte: number
  majorationUrgence: number
  heuresParSemaine: number
  coefficientAttente: number
  paiement4FoisDes: number
  categoriesBoutiqueIncluses: number
}
export interface PrixHeures { prix: number; heures: number }
export interface Niveau { id: string; description: string; accueil: PrixHeures; page: PrixHeures; exemple: string }
export interface Portee {
  id: string; objectif: string; contenu: string
  forfait: PrixHeures; parPage: PrixHeures; parPageSerie: PrixHeures; suivi: string
}
export interface NiveauIA {
  id: string; objectif: string; contenu: string
  forfait: PrixHeures; parPage: PrixHeures; suivi: string
}
export interface Ligne {
  code: string
  famille: 'lancement' | 'fonctionnalite' | 'effet' | 'contenu' | 'seo' | 'boutique' | 'outil' | 'outil-option' | 'abonnement' | 'carte' | 'parcours'
  onglet: string
  groupe: string
  libelle: string
  description: string
  prix: number
  heures: number
  unite: string
  note: string
}

export const PARAMS: TarifParams = {
  "tauxHoraireCible": 45,
  "coefficient": 1,
  "fourchetteBas": 0.9,
  "fourchetteHaut": 1.15,
  "arrondi": 10,
  "pleinTarifJusqua": 10,
  "tranche2Jusqua": 30,
  "tauxTranche2": 0.6,
  "tauxAuDela": 0.4,
  "acompte": 0.4,
  "majorationUrgence": 0.2,
  "heuresParSemaine": 15,
  "coefficientAttente": 1.6,
  "paiement4FoisDes": 3000,
  "categoriesBoutiqueIncluses": 5
}

export const NIVEAUX: Niveau[] = [
  {
    "id": "Aucun",
    "description": "Pas de site (outil de gestion seul).",
    "accueil": {
      "prix": 0,
      "heures": 0
    },
    "page": {
      "prix": 0,
      "heures": 0
    },
    "exemple": ""
  },
  {
    "id": "Classique",
    "description": "Mise en page soignée et personnalisée, sans animation.",
    "accueil": {
      "prix": 200,
      "heures": 4
    },
    "page": {
      "prix": 50,
      "heures": 1
    },
    "exemple": "Site vitrine d'artisan simple"
  },
  {
    "id": "Animé",
    "description": "Apparitions douces au défilement, survols, petites animations qui donnent de la vie.",
    "accueil": {
      "prix": 450,
      "heures": 8
    },
    "page": {
      "prix": 60,
      "heures": 1.25
    },
    "exemple": "Site de commerce moderne"
  },
  {
    "id": "Signature",
    "description": "Vraie mise en scène, effets marquants et interactions : un site dont on se souvient.",
    "accueil": {
      "prix": 900,
      "heures": 14
    },
    "page": {
      "prix": 110,
      "heures": 2
    },
    "exemple": "ToutouBien"
  },
  {
    "id": "Immersif",
    "description": "Univers 3D animé en continu, comme stackup-agency.fr.",
    "accueil": {
      "prix": 1400,
      "heures": 22
    },
    "page": {
      "prix": 220,
      "heures": 4
    },
    "exemple": "Hydr'eaux Scan, stackup-agency.fr"
  }
]

export const PORTEES: Portee[] = [
  {
    "id": "Aucun",
    "objectif": "Pas de travail de référencement.",
    "contenu": "Le site est en ligne, sans optimisation.",
    "forfait": {
      "prix": 0,
      "heures": 0
    },
    "parPage": {
      "prix": 0,
      "heures": 0
    },
    "parPageSerie": {
      "prix": 0,
      "heures": 0
    },
    "suivi": "—"
  },
  {
    "id": "Essentiel",
    "objectif": "Être trouvé quand on tape votre nom.",
    "contenu": "Titres et descriptions de chaque page, plan du site déclaré à Google, site rapide et adapté au mobile, informations de l'entreprise structurées.",
    "forfait": {
      "prix": 150,
      "heures": 3
    },
    "parPage": {
      "prix": 8,
      "heures": 0.15
    },
    "parPageSerie": {
      "prix": 2,
      "heures": 0.05
    },
    "suivi": "Aucun ou publications"
  },
  {
    "id": "Local",
    "objectif": "Être trouvé dans votre ville et les communes autour.",
    "contenu": "Essentiel + 20 à 40 mots-clés locaux choisis selon ce que les gens tapent vraiment, textes optimisés page par page, fiche Google Business, liens entre les pages.",
    "forfait": {
      "prix": 350,
      "heures": 7
    },
    "parPage": {
      "prix": 15,
      "heures": 0.3
    },
    "parPageSerie": {
      "prix": 6,
      "heures": 0.12
    },
    "suivi": "Suivi Local"
  },
  {
    "id": "Régional",
    "objectif": "Être trouvé dans tout votre département ou votre région, sur vos principaux services.",
    "contenu": "Local + 80 à 150 mots-clés classés par volume de recherche, une page par service et par ville importante, analyse des concurrents, maillage complet, données structurées avancées.",
    "forfait": {
      "prix": 650,
      "heures": 13
    },
    "parPage": {
      "prix": 30,
      "heures": 0.6
    },
    "parPageSerie": {
      "prix": 10,
      "heures": 0.2
    },
    "suivi": "Suivi Régional"
  },
  {
    "id": "National",
    "objectif": "Être trouvé partout en France, sur tous vos services et sur les recherches les plus demandées.",
    "contenu": "Régional + 200 mots-clés et plus, priorisés par volume et difficulté, architecture du site pensée pour Google, plan de contenus sur 12 mois, pages réponses aux questions fréquentes, stratégie de liens.",
    "forfait": {
      "prix": 1200,
      "heures": 24
    },
    "parPage": {
      "prix": 50,
      "heures": 1
    },
    "parPageSerie": {
      "prix": 15,
      "heures": 0.3
    },
    "suivi": "Suivi National"
  }
]

export const NIVEAUX_IA: NiveauIA[] = [
  {
    "id": "Aucune",
    "objectif": "Pas de travail spécifique pour les IA.",
    "contenu": "",
    "forfait": {
      "prix": 0,
      "heures": 0
    },
    "parPage": {
      "prix": 0,
      "heures": 0
    },
    "suivi": "—"
  },
  {
    "id": "Essentielle",
    "objectif": "Que les IA comprennent qui vous êtes et ce que vous faites.",
    "contenu": "Fichier llms.txt, données structurées complètes (entreprise, services, FAQ, avis), informations identiques partout (nom, adresse, horaires), contenus rédigés en questions-réponses.",
    "forfait": {
      "prix": 150,
      "heures": 3
    },
    "parPage": {
      "prix": 5,
      "heures": 0.1
    },
    "suivi": "Aucun"
  },
  {
    "id": "Avancée",
    "objectif": "Que les IA vous citent quand on leur demande un professionnel comme vous.",
    "contenu": "Essentielle + pages réponses dédiées aux questions de vos clients, présence sur les sources que lisent les IA (annuaires, avis, presse locale), tests réguliers des réponses des IA sur vos recherches.",
    "forfait": {
      "prix": 400,
      "heures": 8
    },
    "parPage": {
      "prix": 15,
      "heures": 0.3
    },
    "suivi": "Suivi IA"
  }
]

export const MAJORATION_UTILISATEURS: { des: number; taux: number }[] = [
  {
    "des": 1,
    "taux": 0
  },
  {
    "des": 4,
    "taux": 0.1
  },
  {
    "des": 11,
    "taux": 0.2
  },
  {
    "des": 31,
    "taux": 0.35
  }
]

export const LIGNES: Ligne[] = [
  {
    "code": "P01",
    "famille": "parcours",
    "onglet": "Parcours client",
    "groupe": "AVANT LA SIGNATURE",
    "libelle": "Appel découverte (30 min)",
    "description": "Un appel pour comprendre qui vous êtes, votre activité et ce que vous attendez. Gratuit, sans engagement.",
    "prix": 0,
    "heures": 0.5,
    "unite": "forfait",
    "note": "Gratuit. Sert à qualifier le projet avant la démo."
  },
  {
    "code": "P02",
    "famille": "parcours",
    "onglet": "Parcours client",
    "groupe": "AVANT LA SIGNATURE",
    "libelle": "Démo de votre future page d'accueil",
    "description": "On réalise la page d'accueil de votre site, à votre image, pour que vous puissiez juger sur pièce avant de décider.",
    "prix": 15,
    "heures": 6,
    "unite": "forfait",
    "note": "15 € ; offerte à ta discrétion. NON déduite du devis (ne pas le préciser au client). Plafond conseillé : ~6 h de travail."
  },
  {
    "code": "P03",
    "famille": "parcours",
    "onglet": "Parcours client",
    "groupe": "AVANT LA SIGNATURE",
    "libelle": "Visio de présentation et conseil (1 h 30)",
    "description": "On vous présente la démo, on échange sur vos besoins, on vous conseille et on ajuste le projet et le prix ensemble.",
    "prix": 30,
    "heures": 1.5,
    "unite": "forfait",
    "note": "30 € ; NON déduite du devis (ne pas le préciser au client)."
  },
  {
    "code": "P04",
    "famille": "parcours",
    "onglet": "Parcours client",
    "groupe": "PENDANT LA CRÉATION (inclus dans le devis)",
    "libelle": "Rendez-vous de finalisation inclus",
    "description": "Rendez-vous (visio ou sur place) pour construire le site avec vous.",
    "prix": 0,
    "heures": 0,
    "unite": "3 inclus",
    "note": "Au-delà : P05."
  },
  {
    "code": "P05",
    "famille": "parcours",
    "onglet": "Parcours client",
    "groupe": "PENDANT LA CRÉATION (inclus dans le devis)",
    "libelle": "Rendez-vous supplémentaire (1 h)",
    "description": "Un rendez-vous de plus que ceux prévus.",
    "prix": 40,
    "heures": 1,
    "unite": "par heure",
    "note": ""
  },
  {
    "code": "P06",
    "famille": "parcours",
    "onglet": "Parcours client",
    "groupe": "PENDANT LA CRÉATION (inclus dans le devis)",
    "libelle": "Séries de modifications sur la maquette",
    "description": "Deux séries de retours complets sur le design sont incluses avant le développement final.",
    "prix": 0,
    "heures": 0,
    "unite": "2 incluses",
    "note": "Au-delà : 40 €/h."
  },
  {
    "code": "P07",
    "famille": "parcours",
    "onglet": "Parcours client",
    "groupe": "PENDANT LA CRÉATION (inclus dans le devis)",
    "libelle": "Mois d'ajustements après la mise en ligne",
    "description": "Pendant un mois, les petites modifications du périmètre prévu sont gratuites.",
    "prix": 0,
    "heures": 0,
    "unite": "inclus",
    "note": ""
  },
  {
    "code": "P08",
    "famille": "parcours",
    "onglet": "Parcours client",
    "groupe": "PENDANT LA CRÉATION (inclus dans le devis)",
    "libelle": "Déplacement",
    "description": "Gratuit jusqu'à 40 km de Savigné-sur-Lathan.",
    "prix": 0.5,
    "heures": 0,
    "unite": "par km (A/R) au-delà de 40 km",
    "note": ""
  },
  {
    "code": "L01",
    "famille": "lancement",
    "onglet": "Création site",
    "groupe": "BASE DE TOUT PROJET",
    "libelle": "Forfait de lancement",
    "description": "Cadrage, structure du site, adaptation mobile et tablette, mentions légales et confidentialité, formulaire de contact, mise en ligne, tests.",
    "prix": 300,
    "heures": 6,
    "unite": "par projet",
    "note": "Toujours compté."
  },
  {
    "code": "L02",
    "famille": "lancement",
    "onglet": "Création site",
    "groupe": "BASE DE TOUT PROJET",
    "libelle": "Page en série (déclinaison d'un gabarit)",
    "description": "Pages générées à partir d'un même modèle : une par ville, par métier, par produit… (le modèle lui-même compte comme une page).",
    "prix": 20,
    "heures": 0.4,
    "unite": "par page",
    "note": ""
  },
  {
    "code": "F01",
    "famille": "fonctionnalite",
    "onglet": "Création site",
    "groupe": "FONCTIONNALITÉS",
    "libelle": "Formulaire de contact simple",
    "description": "Un formulaire qui vous envoie les demandes par e-mail.",
    "prix": 0,
    "heures": 0,
    "unite": "inclus",
    "note": "Inclus dans L01."
  },
  {
    "code": "F02",
    "famille": "fonctionnalite",
    "onglet": "Création site",
    "groupe": "FONCTIONNALITÉS",
    "libelle": "Formulaire avancé",
    "description": "Demande de devis avec choix, pièces jointes, photos.",
    "prix": 120,
    "heures": 2.5,
    "unite": "par formulaire",
    "note": ""
  },
  {
    "code": "F03",
    "famille": "fonctionnalite",
    "onglet": "Création site",
    "groupe": "FONCTIONNALITÉS",
    "libelle": "Questionnaire guidé en plusieurs étapes",
    "description": "Le visiteur répond étape par étape (ex. « Diagnostic Express » d'Hydr'eaux).",
    "prix": 250,
    "heures": 5,
    "unite": "par questionnaire",
    "note": ""
  },
  {
    "code": "F04",
    "famille": "fonctionnalite",
    "onglet": "Création site",
    "groupe": "FONCTIONNALITÉS",
    "libelle": "Prise de rendez-vous (outil existant)",
    "description": "Intégration d'un agenda en ligne existant (Calendly, Google Agenda…).",
    "prix": 90,
    "heures": 1.75,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "F05",
    "famille": "fonctionnalite",
    "onglet": "Création site",
    "groupe": "FONCTIONNALITÉS",
    "libelle": "Prise de rendez-vous sur mesure",
    "description": "Votre propre système de réservation de créneaux, sans abonnement extérieur.",
    "prix": 600,
    "heures": 12,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "F06",
    "famille": "fonctionnalite",
    "onglet": "Création site",
    "groupe": "FONCTIONNALITÉS",
    "libelle": "Blog / actualités",
    "description": "Une rubrique où publier des articles, avec catégories et recherche.",
    "prix": 200,
    "heures": 4,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "F07",
    "famille": "fonctionnalite",
    "onglet": "Création site",
    "groupe": "FONCTIONNALITÉS",
    "libelle": "Galerie / portfolio filtrable",
    "description": "Vos réalisations en photos, triables par catégorie.",
    "prix": 120,
    "heures": 2.5,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "F08",
    "famille": "fonctionnalite",
    "onglet": "Création site",
    "groupe": "FONCTIONNALITÉS",
    "libelle": "FAQ avec recherche",
    "description": "Questions fréquentes avec barre de recherche.",
    "prix": 80,
    "heures": 1.5,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "F09",
    "famille": "fonctionnalite",
    "onglet": "Création site",
    "groupe": "FONCTIONNALITÉS",
    "libelle": "Carte interactive / zone d'intervention",
    "description": "Une carte qui montre où vous intervenez.",
    "prix": 90,
    "heures": 1.75,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "F10",
    "famille": "fonctionnalite",
    "onglet": "Création site",
    "groupe": "FONCTIONNALITÉS",
    "libelle": "Avis Google affichés",
    "description": "Vos avis clients Google affichés sur le site.",
    "prix": 90,
    "heures": 1.75,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "F11",
    "famille": "fonctionnalite",
    "onglet": "Création site",
    "groupe": "FONCTIONNALITÉS",
    "libelle": "Inscription à une newsletter",
    "description": "Formulaire relié à un outil d'envoi d'e-mails.",
    "prix": 90,
    "heures": 1.75,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "F12",
    "famille": "fonctionnalite",
    "onglet": "Création site",
    "groupe": "FONCTIONNALITÉS",
    "libelle": "Espace membre / client",
    "description": "Connexion personnelle pour vos clients (documents, suivi…).",
    "prix": 900,
    "heures": 18,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "F13",
    "famille": "fonctionnalite",
    "onglet": "Création site",
    "groupe": "FONCTIONNALITÉS",
    "libelle": "Paiement en ligne simple",
    "description": "Payer un acompte ou une prestation en ligne par carte.",
    "prix": 200,
    "heures": 4,
    "unite": "forfait",
    "note": "Hors boutique."
  },
  {
    "code": "F14",
    "famille": "fonctionnalite",
    "onglet": "Création site",
    "groupe": "FONCTIONNALITÉS",
    "libelle": "Version dans une autre langue",
    "description": "Le site disponible dans une langue de plus (traduction à part : C04).",
    "prix": 350,
    "heures": 7,
    "unite": "par langue",
    "note": ""
  },
  {
    "code": "F15",
    "famille": "fonctionnalite",
    "onglet": "Création site",
    "groupe": "FONCTIONNALITÉS",
    "libelle": "Mesure d'audience respectueuse du RGPD",
    "description": "Statistiques de visites sans bandeau intrusif.",
    "prix": 90,
    "heures": 1.75,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "F16",
    "famille": "fonctionnalite",
    "onglet": "Création site",
    "groupe": "FONCTIONNALITÉS",
    "libelle": "Bouton WhatsApp / appel / chat",
    "description": "Un contact direct en un clic.",
    "prix": 30,
    "heures": 0.5,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "F17",
    "famille": "fonctionnalite",
    "onglet": "Création site",
    "groupe": "FONCTIONNALITÉS",
    "libelle": "Calculateur / simulateur sur mesure",
    "description": "Un outil interactif pour vos clients (estimation de prix, configurateur…).",
    "prix": 450,
    "heures": 9,
    "unite": "par outil",
    "note": ""
  },
  {
    "code": "F18",
    "famille": "fonctionnalite",
    "onglet": "Création site",
    "groupe": "FONCTIONNALITÉS",
    "libelle": "Recherche interne",
    "description": "Barre de recherche dans tout le site.",
    "prix": 150,
    "heures": 3,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "F19",
    "famille": "fonctionnalite",
    "onglet": "Création site",
    "groupe": "FONCTIONNALITÉS",
    "libelle": "Documents à télécharger",
    "description": "Brochures, PDF, fiches techniques à télécharger.",
    "prix": 60,
    "heures": 1.25,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "F20",
    "famille": "fonctionnalite",
    "onglet": "Création site",
    "groupe": "FONCTIONNALITÉS",
    "libelle": "Fil Instagram / réseaux sociaux",
    "description": "Vos dernières publications affichées sur le site.",
    "prix": 80,
    "heures": 1.5,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "E01",
    "famille": "effet",
    "onglet": "Création site",
    "groupe": "EFFETS ET ANIMATIONS SUR MESURE (en plus du niveau choisi)",
    "libelle": "Scène 3D sur mesure",
    "description": "Un objet ou votre logo en 3D, animé et interactif.",
    "prix": 700,
    "heures": 14,
    "unite": "par scène",
    "note": "Déjà incluse dans un accueil Immersif."
  },
  {
    "code": "E02",
    "famille": "effet",
    "onglet": "Création site",
    "groupe": "EFFETS ET ANIMATIONS SUR MESURE (en plus du niveau choisi)",
    "libelle": "Démonstration interactive",
    "description": "Une animation qui explique votre métier et avec laquelle on peut jouer.",
    "prix": 250,
    "heures": 5,
    "unite": "par animation",
    "note": ""
  },
  {
    "code": "E03",
    "famille": "effet",
    "onglet": "Création site",
    "groupe": "EFFETS ET ANIMATIONS SUR MESURE (en plus du niveau choisi)",
    "libelle": "Transitions animées entre les pages",
    "description": "Le passage d'une page à l'autre devient fluide et mis en scène.",
    "prix": 180,
    "heures": 3.5,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "E04",
    "famille": "effet",
    "onglet": "Création site",
    "groupe": "EFFETS ET ANIMATIONS SUR MESURE (en plus du niveau choisi)",
    "libelle": "Récit au défilement",
    "description": "Une section qui se raconte au fur et à mesure qu'on descend.",
    "prix": 220,
    "heures": 4.5,
    "unite": "par section",
    "note": ""
  },
  {
    "code": "E05",
    "famille": "effet",
    "onglet": "Création site",
    "groupe": "EFFETS ET ANIMATIONS SUR MESURE (en plus du niveau choisi)",
    "libelle": "Vidéo d'arrière-plan / introduction",
    "description": "Intégration d'une vidéo (le tournage et le montage ne sont pas compris).",
    "prix": 90,
    "heures": 1.75,
    "unite": "par vidéo",
    "note": ""
  },
  {
    "code": "E06",
    "famille": "effet",
    "onglet": "Création site",
    "groupe": "EFFETS ET ANIMATIONS SUR MESURE (en plus du niveau choisi)",
    "libelle": "Chiffres et graphiques animés",
    "description": "Compteurs et graphiques qui s'animent.",
    "prix": 80,
    "heures": 1.5,
    "unite": "par bloc",
    "note": ""
  },
  {
    "code": "E07",
    "famille": "effet",
    "onglet": "Création site",
    "groupe": "EFFETS ET ANIMATIONS SUR MESURE (en plus du niveau choisi)",
    "libelle": "Comparateur avant / après",
    "description": "Un curseur pour comparer deux photos.",
    "prix": 70,
    "heures": 1.5,
    "unite": "par bloc",
    "note": ""
  },
  {
    "code": "E08",
    "famille": "effet",
    "onglet": "Création site",
    "groupe": "EFFETS ET ANIMATIONS SUR MESURE (en plus du niveau choisi)",
    "libelle": "Mode sombre",
    "description": "Le site disponible en version claire et sombre.",
    "prix": 150,
    "heures": 3,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "E09",
    "famille": "effet",
    "onglet": "Création site",
    "groupe": "EFFETS ET ANIMATIONS SUR MESURE (en plus du niveau choisi)",
    "libelle": "Micro-interactions avancées",
    "description": "Boutons, survols et retours visuels travaillés sur tout le site.",
    "prix": 120,
    "heures": 2.5,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "E10",
    "famille": "effet",
    "onglet": "Création site",
    "groupe": "EFFETS ET ANIMATIONS SUR MESURE (en plus du niveau choisi)",
    "libelle": "Icônes ou illustrations animées sur mesure",
    "description": "Des pictogrammes dessinés pour vous et animés.",
    "prix": 150,
    "heures": 3,
    "unite": "par lot de 6",
    "note": ""
  },
  {
    "code": "C01",
    "famille": "contenu",
    "onglet": "Création site",
    "groupe": "CONTENUS",
    "libelle": "Rédaction d'une page",
    "description": "On écrit le texte d'une page à partir d'un échange avec vous.",
    "prix": 60,
    "heures": 1.25,
    "unite": "par page",
    "note": ""
  },
  {
    "code": "C02",
    "famille": "contenu",
    "onglet": "Création site",
    "groupe": "CONTENUS",
    "libelle": "Article de blog optimisé",
    "description": "Un article de 800 à 1 200 mots, pensé pour Google.",
    "prix": 60,
    "heures": 1.25,
    "unite": "par article",
    "note": ""
  },
  {
    "code": "C03",
    "famille": "contenu",
    "onglet": "Création site",
    "groupe": "CONTENUS",
    "libelle": "Relecture et adaptation de vos textes",
    "description": "On reprend vos textes pour les rendre clairs et efficaces.",
    "prix": 20,
    "heures": 0.4,
    "unite": "par page",
    "note": ""
  },
  {
    "code": "C04",
    "famille": "contenu",
    "onglet": "Création site",
    "groupe": "CONTENUS",
    "libelle": "Traduction d'une page",
    "description": "",
    "prix": 30,
    "heures": 0.6,
    "unite": "par page",
    "note": ""
  },
  {
    "code": "C05",
    "famille": "contenu",
    "onglet": "Création site",
    "groupe": "CONTENUS",
    "libelle": "Reprise du contenu d'un ancien site",
    "description": "Récupération et mise en forme des textes et images existants.",
    "prix": 10,
    "heures": 0.2,
    "unite": "par page",
    "note": ""
  },
  {
    "code": "C06",
    "famille": "contenu",
    "onglet": "Création site",
    "groupe": "CONTENUS",
    "libelle": "Sélection et retouche d'images",
    "description": "Choix, recadrage et optimisation de vos photos.",
    "prix": 40,
    "heures": 0.75,
    "unite": "par lot de 10",
    "note": ""
  },
  {
    "code": "S01",
    "famille": "seo",
    "onglet": "Référencement",
    "groupe": "C. MODULES À LA CARTE (en plus du niveau choisi, ou pour un site existant)",
    "libelle": "Audit de référencement de départ",
    "description": "Où vous en êtes sur Google, vos concurrents, vos points faibles, les priorités.",
    "prix": 150,
    "heures": 3,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "S02",
    "famille": "seo",
    "onglet": "Référencement",
    "groupe": "C. MODULES À LA CARTE (en plus du niveau choisi, ou pour un site existant)",
    "libelle": "Étude de mots-clés approfondie",
    "description": "Ce que vos clients tapent vraiment, combien de fois par mois, et ce qui est atteignable.",
    "prix": 200,
    "heures": 4,
    "unite": "forfait",
    "note": "Incluse dans les niveaux Régional et National."
  },
  {
    "code": "S03",
    "famille": "seo",
    "onglet": "Référencement",
    "groupe": "C. MODULES À LA CARTE (en plus du niveau choisi, ou pour un site existant)",
    "libelle": "Page service optimisée supplémentaire",
    "description": "Une page dédiée à un service, rédaction comprise.",
    "prix": 90,
    "heures": 1.75,
    "unite": "par page",
    "note": ""
  },
  {
    "code": "S04",
    "famille": "seo",
    "onglet": "Référencement",
    "groupe": "C. MODULES À LA CARTE (en plus du niveau choisi, ou pour un site existant)",
    "libelle": "Page ville optimisée supplémentaire",
    "description": "Une page pour une ville ou un secteur, rédaction comprise.",
    "prix": 45,
    "heures": 0.9,
    "unite": "par page",
    "note": ""
  },
  {
    "code": "S05",
    "famille": "seo",
    "onglet": "Référencement",
    "groupe": "C. MODULES À LA CARTE (en plus du niveau choisi, ou pour un site existant)",
    "libelle": "Données structurées avancées",
    "description": "Avis, produits, événements, FAQ affichés directement dans Google.",
    "prix": 120,
    "heures": 2.5,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "S06",
    "famille": "seo",
    "onglet": "Référencement",
    "groupe": "C. MODULES À LA CARTE (en plus du niveau choisi, ou pour un site existant)",
    "libelle": "Optimisation de la vitesse (Core Web Vitals)",
    "description": "Les critères de vitesse que Google mesure.",
    "prix": 150,
    "heures": 3,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "S07",
    "famille": "seo",
    "onglet": "Référencement",
    "groupe": "C. MODULES À LA CARTE (en plus du niveau choisi, ou pour un site existant)",
    "libelle": "Optimisation des images",
    "description": "Noms, textes alternatifs, poids allégé.",
    "prix": 40,
    "heures": 0.75,
    "unite": "par lot de 50",
    "note": ""
  },
  {
    "code": "S08",
    "famille": "seo",
    "onglet": "Référencement",
    "groupe": "C. MODULES À LA CARTE (en plus du niveau choisi, ou pour un site existant)",
    "libelle": "Inscription dans les annuaires",
    "description": "Pages Jaunes, annuaires locaux et professionnels, avec informations identiques partout.",
    "prix": 120,
    "heures": 2.5,
    "unite": "par lot de 20",
    "note": ""
  },
  {
    "code": "S09",
    "famille": "seo",
    "onglet": "Référencement",
    "groupe": "C. MODULES À LA CARTE (en plus du niveau choisi, ou pour un site existant)",
    "libelle": "Obtention d'un lien vers votre site",
    "description": "Un site sérieux qui parle de vous et renvoie vers le vôtre (partenaire, article, presse locale).",
    "prix": 80,
    "heures": 1.5,
    "unite": "par lien",
    "note": ""
  },
  {
    "code": "S10",
    "famille": "seo",
    "onglet": "Référencement",
    "groupe": "C. MODULES À LA CARTE (en plus du niveau choisi, ou pour un site existant)",
    "libelle": "Outils Google et Bing configurés",
    "description": "Search Console, Bing Webmaster, statistiques.",
    "prix": 60,
    "heures": 1.25,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "S11",
    "famille": "seo",
    "onglet": "Référencement",
    "groupe": "C. MODULES À LA CARTE (en plus du niveau choisi, ou pour un site existant)",
    "libelle": "Référencement des fiches produits",
    "description": "Titres, descriptions et données de chaque produit de la boutique.",
    "prix": 4,
    "heures": 0.08,
    "unite": "par produit",
    "note": ""
  },
  {
    "code": "S12",
    "famille": "seo",
    "onglet": "Référencement",
    "groupe": "C. MODULES À LA CARTE (en plus du niveau choisi, ou pour un site existant)",
    "libelle": "Référencement dans une autre langue",
    "description": "",
    "prix": 150,
    "heures": 3,
    "unite": "par langue",
    "note": ""
  },
  {
    "code": "S13",
    "famille": "seo",
    "onglet": "Référencement",
    "groupe": "C. MODULES À LA CARTE (en plus du niveau choisi, ou pour un site existant)",
    "libelle": "Refonte sans perte de référencement",
    "description": "Redirections et vérifications pour garder vos positions quand on remplace un ancien site.",
    "prix": 200,
    "heures": 4,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "B00",
    "famille": "boutique",
    "onglet": "Boutique",
    "groupe": "BASE",
    "libelle": "Socle boutique",
    "description": "Panier, paiement par carte, comptes clients, e-mails automatiques (commande, expédition), livraison simple, conditions générales de vente.",
    "prix": 1100,
    "heures": 20,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "B01",
    "famille": "boutique",
    "onglet": "Boutique",
    "groupe": "CATALOGUE",
    "libelle": "Mise en ligne d'un produit",
    "description": "On crée la fiche produit (photos, texte, prix) à partir de vos informations.",
    "prix": 3,
    "heures": 0.06,
    "unite": "par produit",
    "note": "Un produit = une fiche, même si vous en avez 200 en stock."
  },
  {
    "code": "B02",
    "famille": "boutique",
    "onglet": "Boutique",
    "groupe": "CATALOGUE",
    "libelle": "Import du catalogue depuis un fichier",
    "description": "Vous avez déjà la liste de vos produits (Excel, ancien site) : on l'importe d'un coup.",
    "prix": 120,
    "heures": 2.5,
    "unite": "forfait",
    "note": "Remplace B01 si le client fournit un fichier propre."
  },
  {
    "code": "B03",
    "famille": "boutique",
    "onglet": "Boutique",
    "groupe": "CATALOGUE",
    "libelle": "Variante de produit",
    "description": "Une déclinaison d'un produit : taille, couleur, contenance…",
    "prix": 0.5,
    "heures": 0.01,
    "unite": "par variante",
    "note": "Ex. un t-shirt en 3 couleurs × 4 tailles = 12 variantes."
  },
  {
    "code": "B04",
    "famille": "boutique",
    "onglet": "Boutique",
    "groupe": "CATALOGUE",
    "libelle": "Catégorie supplémentaire",
    "description": "Au-delà des catégories incluses (voir Paramètres).",
    "prix": 15,
    "heures": 0.3,
    "unite": "par catégorie",
    "note": ""
  },
  {
    "code": "B05",
    "famille": "boutique",
    "onglet": "Boutique",
    "groupe": "OPTIONS",
    "libelle": "Click & collect",
    "description": "Commander en ligne, retirer en boutique.",
    "prix": 150,
    "heures": 3,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "B06",
    "famille": "boutique",
    "onglet": "Boutique",
    "groupe": "OPTIONS",
    "libelle": "Points relais / plusieurs transporteurs",
    "description": "Choix du mode de livraison et calcul des frais.",
    "prix": 200,
    "heures": 4,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "B07",
    "famille": "boutique",
    "onglet": "Boutique",
    "groupe": "OPTIONS",
    "libelle": "Abonnement / box récurrente",
    "description": "Le client paie tous les mois automatiquement.",
    "prix": 400,
    "heures": 8,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "B08",
    "famille": "boutique",
    "onglet": "Boutique",
    "groupe": "OPTIONS",
    "libelle": "Produits numériques",
    "description": "Fichiers téléchargeables après achat.",
    "prix": 150,
    "heures": 3,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "B09",
    "famille": "boutique",
    "onglet": "Boutique",
    "groupe": "OPTIONS",
    "libelle": "Tarifs professionnels",
    "description": "Prix différents pour les clients pros.",
    "prix": 300,
    "heures": 6,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "B10",
    "famille": "boutique",
    "onglet": "Boutique",
    "groupe": "OPTIONS",
    "libelle": "Synchronisation des stocks",
    "description": "Stocks reliés à votre caisse ou à votre logiciel.",
    "prix": 450,
    "heures": 9,
    "unite": "par logiciel",
    "note": "Selon le logiciel : à confirmer au devis."
  },
  {
    "code": "B11",
    "famille": "boutique",
    "onglet": "Boutique",
    "groupe": "OPTIONS",
    "libelle": "Avis clients sur les produits",
    "description": "",
    "prix": 80,
    "heures": 1.5,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "B12",
    "famille": "boutique",
    "onglet": "Boutique",
    "groupe": "OPTIONS",
    "libelle": "Codes promo avancés et fidélité",
    "description": "",
    "prix": 150,
    "heures": 3,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "B13",
    "famille": "boutique",
    "onglet": "Boutique",
    "groupe": "OPTIONS",
    "libelle": "Google Shopping",
    "description": "Vos produits affichés dans l'onglet Shopping de Google.",
    "prix": 150,
    "heures": 3,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "B14",
    "famille": "boutique",
    "onglet": "Boutique",
    "groupe": "OPTIONS",
    "libelle": "Cartes cadeaux",
    "description": "",
    "prix": 120,
    "heures": 2.5,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "O00",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "SOCLE",
    "libelle": "Socle de l'outil",
    "description": "Connexion sécurisée, base de données, tableau de bord, export de vos données, hébergement prêt.",
    "prix": 900,
    "heures": 18,
    "unite": "forfait",
    "note": "Toujours compté si outil."
  },
  {
    "code": "O01",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — GESTION COMMERCIALE",
    "libelle": "Clients / contacts (CRM)",
    "description": "Fiches clients, historique, notes, relances.",
    "prix": 350,
    "heures": 7,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O02",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — GESTION COMMERCIALE",
    "libelle": "Devis",
    "description": "Créer, envoyer et suivre vos devis.",
    "prix": 400,
    "heures": 8,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O03",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — GESTION COMMERCIALE",
    "libelle": "Factures",
    "description": "Factures conformes, numérotation automatique, avoirs.",
    "prix": 450,
    "heures": 9,
    "unite": "module",
    "note": "Devis→facture inclus si O02 + O03."
  },
  {
    "code": "O04",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — GESTION COMMERCIALE",
    "libelle": "Suivi des paiements et relances",
    "description": "Qui a payé, qui est en retard, relances automatiques.",
    "prix": 250,
    "heures": 5,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O05",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — GESTION COMMERCIALE",
    "libelle": "Commandes fournisseurs",
    "description": "",
    "prix": 350,
    "heures": 7,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O06",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — GESTION COMMERCIALE",
    "libelle": "Catalogue de prestations / produits",
    "description": "Vos prix et prestations réutilisables partout.",
    "prix": 200,
    "heures": 4,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O07",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — ORGANISATION",
    "libelle": "Planning / agenda d'équipe",
    "description": "Qui fait quoi, quand.",
    "prix": 450,
    "heures": 9,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O08",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — ORGANISATION",
    "libelle": "Prise de rendez-vous par vos clients",
    "description": "Vos clients réservent un créneau en ligne.",
    "prix": 400,
    "heures": 8,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O09",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — ORGANISATION",
    "libelle": "Réservations / locations",
    "description": "Réserver des salles, véhicules, matériel, chambres…",
    "prix": 500,
    "heures": 10,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O10",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — ORGANISATION",
    "libelle": "Interventions / chantiers",
    "description": "Suivi des chantiers, photos, rapports d'intervention.",
    "prix": 500,
    "heures": 10,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O11",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — ORGANISATION",
    "libelle": "Feuilles de temps / pointage",
    "description": "",
    "prix": 300,
    "heures": 6,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O12",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — ORGANISATION",
    "libelle": "Congés et équipe",
    "description": "Demandes de congés, échanges de créneaux.",
    "prix": 350,
    "heures": 7,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O13",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — ORGANISATION",
    "libelle": "Notes de frais",
    "description": "",
    "prix": 250,
    "heures": 5,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O14",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — ORGANISATION",
    "libelle": "Véhicules et matériel",
    "description": "Entretien, disponibilité, affectation.",
    "prix": 300,
    "heures": 6,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O15",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — VENTE ET RELATION CLIENT",
    "libelle": "Caisse / encaissement",
    "description": "",
    "prix": 600,
    "heures": 12,
    "unite": "module",
    "note": "Vérifier les obligations légales des logiciels de caisse avant de vendre ce module."
  },
  {
    "code": "O16",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — VENTE ET RELATION CLIENT",
    "libelle": "Stocks",
    "description": "Entrées, sorties, alertes de rupture.",
    "prix": 450,
    "heures": 9,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O17",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — VENTE ET RELATION CLIENT",
    "libelle": "Commandes en ligne / click & collect",
    "description": "",
    "prix": 450,
    "heures": 9,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O18",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — VENTE ET RELATION CLIENT",
    "libelle": "Fidélité",
    "description": "Points, récompenses, offres.",
    "prix": 300,
    "heures": 6,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O19",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — VENTE ET RELATION CLIENT",
    "libelle": "Menu / carte en ligne avec QR code",
    "description": "",
    "prix": 250,
    "heures": 5,
    "unite": "module",
    "note": "Restaurants."
  },
  {
    "code": "O20",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — VENTE ET RELATION CLIENT",
    "libelle": "Espace client (portail)",
    "description": "Vos clients consultent devis, factures, documents.",
    "prix": 600,
    "heures": 12,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O21",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — MÉTIERS SPÉCIFIQUES",
    "libelle": "Dossiers clients détaillés (santé, animaux, élèves…)",
    "description": "Fiches de suivi propres à votre métier.",
    "prix": 500,
    "heures": 10,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O22",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — MÉTIERS SPÉCIFIQUES",
    "libelle": "Adhérents, cours et abonnements",
    "description": "Salles de sport, écoles, associations.",
    "prix": 450,
    "heures": 9,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O23",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — MÉTIERS SPÉCIFIQUES",
    "libelle": "Cotisations d'association",
    "description": "",
    "prix": 300,
    "heures": 6,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O24",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — MÉTIERS SPÉCIFIQUES",
    "libelle": "Traçabilité / hygiène (HACCP)",
    "description": "Relevés de température, contrôles, registres.",
    "prix": 400,
    "heures": 8,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O25",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — MÉTIERS SPÉCIFIQUES",
    "libelle": "Formulaires de terrain",
    "description": "Rapports, check-lists, signatures remplis sur téléphone.",
    "prix": 400,
    "heures": 8,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O26",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — PILOTAGE",
    "libelle": "Tableau de bord avancé",
    "description": "Chiffre d'affaires, marges, objectifs, graphiques.",
    "prix": 350,
    "heures": 7,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O27",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — PILOTAGE",
    "libelle": "Rapports PDF automatiques",
    "description": "",
    "prix": 300,
    "heures": 6,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O28",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — PILOTAGE",
    "libelle": "Documents partagés",
    "description": "Classement de vos fichiers par client ou dossier.",
    "prix": 250,
    "heures": 5,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O29",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — PILOTAGE",
    "libelle": "Notifications et messagerie interne",
    "description": "",
    "prix": 250,
    "heures": 5,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O30",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — PILOTAGE",
    "libelle": "Signature électronique",
    "description": "Via un service spécialisé (coût d'usage refacturé).",
    "prix": 250,
    "heures": 5,
    "unite": "module",
    "note": ""
  },
  {
    "code": "O31",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — AUTOMATISATION ET INTELLIGENCE ARTIFICIELLE",
    "libelle": "Devis et factures automatiques",
    "description": "Le devis se remplit à partir de vos prix habituels ; la facture part toute seule quand le chantier est terminé.",
    "prix": 450,
    "heures": 9,
    "unite": "module",
    "note": "Suppose O02 et O03."
  },
  {
    "code": "O32",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — AUTOMATISATION ET INTELLIGENCE ARTIFICIELLE",
    "libelle": "Facturation électronique conforme",
    "description": "Envoi et réception des factures électroniques via une plateforme agréée, comme l'impose la réforme française.",
    "prix": 450,
    "heures": 9,
    "unite": "module",
    "note": "Calendrier de la réforme et plateforme à vérifier au devis ; abonnement de la plateforme refacturé au réel."
  },
  {
    "code": "O33",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — AUTOMATISATION ET INTELLIGENCE ARTIFICIELLE",
    "libelle": "Commande vocale",
    "description": "Vous dictez (« j'ai vu M. Martin, 3 fenêtres PVC… ») et l'outil crée le devis, le rendez-vous ou la tâche.",
    "prix": 700,
    "heures": 14,
    "unite": "module",
    "note": "+ coût d'usage de la reconnaissance vocale / IA refacturé au réel."
  },
  {
    "code": "O34",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — AUTOMATISATION ET INTELLIGENCE ARTIFICIELLE",
    "libelle": "Automatisations sur mesure",
    "description": "Relances, rappels, tâches répétitives qui se font toutes seules (ex. relance de devis à J+7, rappel de rendez-vous la veille).",
    "prix": 250,
    "heures": 5,
    "unite": "par scénario",
    "note": ""
  },
  {
    "code": "O35",
    "famille": "outil",
    "onglet": "Outil de gestion",
    "groupe": "MODULES — AUTOMATISATION ET INTELLIGENCE ARTIFICIELLE",
    "libelle": "Assistant IA métier sur mesure",
    "description": "Une IA conçue pour votre activité, qui connaît vos prix, vos clients et vos habitudes, et vous conseille sans qu'on lui demande.",
    "prix": 1200,
    "heures": 24,
    "unite": "module",
    "note": "+ coût d'usage refacturé au réel."
  },
  {
    "code": "OP1",
    "famille": "outil-option",
    "onglet": "Outil de gestion",
    "groupe": "OPTIONS",
    "libelle": "Relié à votre site internet",
    "description": "Les données circulent entre le site et l'outil (réservations, commandes, demandes).",
    "prix": 250,
    "heures": 5,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "OP2",
    "famille": "outil-option",
    "onglet": "Outil de gestion",
    "groupe": "OPTIONS",
    "libelle": "Application installable sur téléphone",
    "description": "L'outil s'installe comme une appli, sans passer par les stores.",
    "prix": 350,
    "heures": 7,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "OP3",
    "famille": "outil-option",
    "onglet": "Outil de gestion",
    "groupe": "OPTIONS",
    "libelle": "Fonctionne sans connexion",
    "description": "Utilisable sur un chantier sans réseau, synchronisation au retour.",
    "prix": 400,
    "heures": 8,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "OP4",
    "famille": "outil-option",
    "onglet": "Outil de gestion",
    "groupe": "OPTIONS",
    "libelle": "Assistant IA intégré",
    "description": "Rédaction de devis, résumés, recherche dans vos données.",
    "prix": 600,
    "heures": 12,
    "unite": "forfait",
    "note": "+ coût d'usage de l'IA refacturé au réel, annoncé avant."
  },
  {
    "code": "OP5",
    "famille": "outil-option",
    "onglet": "Outil de gestion",
    "groupe": "OPTIONS",
    "libelle": "Import de vos données existantes",
    "description": "Reprise de vos fichiers Excel ou d'un ancien logiciel.",
    "prix": 150,
    "heures": 3,
    "unite": "par source",
    "note": ""
  },
  {
    "code": "OP6",
    "famille": "outil-option",
    "onglet": "Outil de gestion",
    "groupe": "OPTIONS",
    "libelle": "Export comptable",
    "description": "Fichiers prêts pour votre comptable.",
    "prix": 250,
    "heures": 5,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "OP7",
    "famille": "outil-option",
    "onglet": "Outil de gestion",
    "groupe": "OPTIONS",
    "libelle": "Connexion à un service externe",
    "description": "Banque, Google Agenda, logiciel existant…",
    "prix": 300,
    "heures": 6,
    "unite": "par service",
    "note": ""
  },
  {
    "code": "OP8",
    "famille": "outil-option",
    "onglet": "Outil de gestion",
    "groupe": "OPTIONS",
    "libelle": "Plusieurs établissements",
    "description": "",
    "prix": 300,
    "heures": 6,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "OP9",
    "famille": "outil-option",
    "onglet": "Outil de gestion",
    "groupe": "OPTIONS",
    "libelle": "Rôles et droits avancés",
    "description": "Chaque personne ne voit que ce qui la concerne.",
    "prix": 200,
    "heures": 4,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "A01",
    "famille": "abonnement",
    "onglet": "Abonnements",
    "groupe": "HÉBERGEMENT (nom de domaine inclus à partir de la 2e année)",
    "libelle": "Hébergement site jusqu'à 10 pages",
    "description": "Serveur, nom de domaine, sécurité https, sauvegardes.",
    "prix": 10,
    "heures": 0,
    "unite": "par mois",
    "note": ""
  },
  {
    "code": "A02",
    "famille": "abonnement",
    "onglet": "Abonnements",
    "groupe": "HÉBERGEMENT (nom de domaine inclus à partir de la 2e année)",
    "libelle": "Hébergement site de plus de 10 pages",
    "description": "",
    "prix": 15,
    "heures": 0,
    "unite": "par mois",
    "note": ""
  },
  {
    "code": "A03",
    "famille": "abonnement",
    "onglet": "Abonnements",
    "groupe": "HÉBERGEMENT (nom de domaine inclus à partir de la 2e année)",
    "libelle": "Supplément site Immersif (3D)",
    "description": "Ressources plus lourdes à diffuser.",
    "prix": 5,
    "heures": 0,
    "unite": "par mois",
    "note": ""
  },
  {
    "code": "A04",
    "famille": "abonnement",
    "onglet": "Abonnements",
    "groupe": "HÉBERGEMENT (nom de domaine inclus à partir de la 2e année)",
    "libelle": "Hébergement boutique",
    "description": "",
    "prix": 25,
    "heures": 0,
    "unite": "par mois",
    "note": ""
  },
  {
    "code": "A05",
    "famille": "abonnement",
    "onglet": "Abonnements",
    "groupe": "HÉBERGEMENT (nom de domaine inclus à partir de la 2e année)",
    "libelle": "Hébergement outil de gestion",
    "description": "Base de données et sauvegardes renforcées.",
    "prix": 30,
    "heures": 0,
    "unite": "par mois",
    "note": ""
  },
  {
    "code": "A06",
    "famille": "abonnement",
    "onglet": "Abonnements",
    "groupe": "MAINTENANCE ET SÉCURITÉ",
    "libelle": "Maintenance site — base",
    "description": "Mises à jour, surveillance, correction des anomalies, petites retouches.",
    "prix": 15,
    "heures": 0.25,
    "unite": "par mois",
    "note": ""
  },
  {
    "code": "A07",
    "famille": "abonnement",
    "onglet": "Abonnements",
    "groupe": "MAINTENANCE ET SÉCURITÉ",
    "libelle": "Maintenance — par page",
    "description": "",
    "prix": 0.5,
    "heures": 0.01,
    "unite": "par page / mois",
    "note": ""
  },
  {
    "code": "A08",
    "famille": "abonnement",
    "onglet": "Abonnements",
    "groupe": "MAINTENANCE ET SÉCURITÉ",
    "libelle": "Maintenance — par page en série",
    "description": "",
    "prix": 0.1,
    "heures": 0,
    "unite": "par page / mois",
    "note": ""
  },
  {
    "code": "A09",
    "famille": "abonnement",
    "onglet": "Abonnements",
    "groupe": "MAINTENANCE ET SÉCURITÉ",
    "libelle": "Maintenance boutique",
    "description": "Vérification des paiements, commandes, e-mails.",
    "prix": 15,
    "heures": 0.25,
    "unite": "par mois",
    "note": ""
  },
  {
    "code": "A10",
    "famille": "abonnement",
    "onglet": "Abonnements",
    "groupe": "MAINTENANCE ET SÉCURITÉ",
    "libelle": "Maintenance outil — base",
    "description": "",
    "prix": 20,
    "heures": 0.4,
    "unite": "par mois",
    "note": ""
  },
  {
    "code": "A11",
    "famille": "abonnement",
    "onglet": "Abonnements",
    "groupe": "MAINTENANCE ET SÉCURITÉ",
    "libelle": "Maintenance outil — par module",
    "description": "",
    "prix": 5,
    "heures": 0.1,
    "unite": "par module / mois",
    "note": ""
  },
  {
    "code": "A12",
    "famille": "abonnement",
    "onglet": "Abonnements",
    "groupe": "CONTENUS ET VISIBILITÉ",
    "libelle": "Publication courte",
    "description": "Une réalisation, une actualité, un conseil, à partir de vos photos et infos.",
    "prix": 10,
    "heures": 0.2,
    "unite": "par publication",
    "note": ""
  },
  {
    "code": "A13",
    "famille": "abonnement",
    "onglet": "Abonnements",
    "groupe": "CONTENUS ET VISIBILITÉ",
    "libelle": "Article de blog optimisé",
    "description": "",
    "prix": 40,
    "heures": 0.8,
    "unite": "par article",
    "note": ""
  },
  {
    "code": "A14",
    "famille": "abonnement",
    "onglet": "Abonnements",
    "groupe": "CONTENUS ET VISIBILITÉ",
    "libelle": "Suivi référencement Local",
    "description": "Suivi Google Search Console, améliorations mois par mois, conseils.",
    "prix": 60,
    "heures": 1.25,
    "unite": "par mois",
    "note": ""
  },
  {
    "code": "A15",
    "famille": "abonnement",
    "onglet": "Abonnements",
    "groupe": "CONTENUS ET VISIBILITÉ",
    "libelle": "Suivi référencement Régional",
    "description": "Suivi Local + nouvelles pages ciblées, analyse des concurrents.",
    "prix": 120,
    "heures": 2.5,
    "unite": "par mois",
    "note": ""
  },
  {
    "code": "A20",
    "famille": "abonnement",
    "onglet": "Abonnements",
    "groupe": "CONTENUS ET VISIBILITÉ",
    "libelle": "Suivi référencement National",
    "description": "Suivi Régional + plan de contenus, positions sur les recherches les plus demandées.",
    "prix": 220,
    "heures": 4.5,
    "unite": "par mois",
    "note": ""
  },
  {
    "code": "A21",
    "famille": "abonnement",
    "onglet": "Abonnements",
    "groupe": "CONTENUS ET VISIBILITÉ",
    "libelle": "Suivi de la visibilité dans les IA",
    "description": "Tests mensuels des réponses de ChatGPT, Gemini, Perplexity et Google sur vos recherches ; ajustements.",
    "prix": 40,
    "heures": 0.8,
    "unite": "par mois",
    "note": ""
  },
  {
    "code": "A22",
    "famille": "abonnement",
    "onglet": "Abonnements",
    "groupe": "CONTENUS ET VISIBILITÉ",
    "libelle": "Lien obtenu vers votre site",
    "description": "Un nouveau site sérieux qui renvoie vers le vôtre.",
    "prix": 80,
    "heures": 1.5,
    "unite": "par lien",
    "note": ""
  },
  {
    "code": "A16",
    "famille": "abonnement",
    "onglet": "Abonnements",
    "groupe": "CONTENUS ET VISIBILITÉ",
    "libelle": "Suivi de la fiche Google Business",
    "description": "Publications, réponses aux avis, mises à jour.",
    "prix": 25,
    "heures": 0.5,
    "unite": "par mois",
    "note": ""
  },
  {
    "code": "A17",
    "famille": "abonnement",
    "onglet": "Abonnements",
    "groupe": "CONTENUS ET VISIBILITÉ",
    "libelle": "Rapport mensuel",
    "description": "Visites, demandes reçues, évolution, en une page lisible.",
    "prix": 15,
    "heures": 0.3,
    "unite": "par mois",
    "note": "Nécessite F15."
  },
  {
    "code": "A18",
    "famille": "abonnement",
    "onglet": "Abonnements",
    "groupe": "CONTENUS ET VISIBILITÉ",
    "libelle": "Heure de modifications incluse",
    "description": "Temps réservé chaque mois pour vos demandes de changements.",
    "prix": 35,
    "heures": 1,
    "unite": "par heure / mois",
    "note": "Moins cher que l'heure ponctuelle (40 €)."
  },
  {
    "code": "A19",
    "famille": "abonnement",
    "onglet": "Abonnements",
    "groupe": "REMISE",
    "libelle": "Remise en cas de paiement annuel",
    "description": "",
    "prix": 0.1,
    "heures": 0,
    "unite": "% du total",
    "note": "Valeur en pourcentage."
  },
  {
    "code": "K01",
    "famille": "carte",
    "onglet": "À la carte",
    "groupe": "POUR UN SITE EXISTANT",
    "libelle": "Audit de votre site actuel",
    "description": "Rapport clair : ce qui marche, ce qui bloque, quoi améliorer en priorité.",
    "prix": 90,
    "heures": 2,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "K02",
    "famille": "carte",
    "onglet": "À la carte",
    "groupe": "POUR UN SITE EXISTANT",
    "libelle": "Intervention technique",
    "description": "Correction, ajout, modification sur un site existant.",
    "prix": 40,
    "heures": 1,
    "unite": "par heure",
    "note": "Minimum 30 min."
  },
  {
    "code": "K03",
    "famille": "carte",
    "onglet": "À la carte",
    "groupe": "POUR UN SITE EXISTANT",
    "libelle": "Accélération du site",
    "description": "Optimisation de la vitesse de chargement.",
    "prix": 180,
    "heures": 3.5,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "K04",
    "famille": "carte",
    "onglet": "À la carte",
    "groupe": "POUR UN SITE EXISTANT",
    "libelle": "Mise en conformité légale",
    "description": "Mentions légales, confidentialité, cookies.",
    "prix": 120,
    "heures": 2.5,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "K05",
    "famille": "carte",
    "onglet": "À la carte",
    "groupe": "POUR UN SITE EXISTANT",
    "libelle": "Transfert d'hébergement",
    "description": "Déplacer un site existant vers un hébergement géré par Stackup.",
    "prix": 150,
    "heures": 3,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "K06",
    "famille": "carte",
    "onglet": "À la carte",
    "groupe": "POUR UN SITE EXISTANT",
    "libelle": "Création de la fiche Google Business",
    "description": "",
    "prix": 90,
    "heures": 1.75,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "K07",
    "famille": "carte",
    "onglet": "À la carte",
    "groupe": "POUR UN SITE EXISTANT",
    "libelle": "Adresses e-mail professionnelles",
    "description": "Configuration (le coût du service e-mail reste à votre charge).",
    "prix": 60,
    "heures": 1.25,
    "unite": "forfait",
    "note": ""
  },
  {
    "code": "K08",
    "famille": "carte",
    "onglet": "À la carte",
    "groupe": "POUR UN SITE EXISTANT",
    "libelle": "Refonte d'un site existant",
    "description": "Se calcule avec la grille de création (même prix que du neuf, moins la reprise de contenu).",
    "prix": 0,
    "heures": 0,
    "unite": "voir Simulateur",
    "note": ""
  },
  {
    "code": "K09",
    "famille": "carte",
    "onglet": "À la carte",
    "groupe": "AVANT / PENDANT / APRÈS",
    "libelle": "Formation à l'utilisation du site ou de l'outil",
    "description": "",
    "prix": 40,
    "heures": 1,
    "unite": "par heure",
    "note": ""
  },
  {
    "code": "K10",
    "famille": "carte",
    "onglet": "À la carte",
    "groupe": "AVANT / PENDANT / APRÈS",
    "libelle": "Rendez-vous de conseil stratégique (1 h 30)",
    "description": "Analyse de vos besoins, recommandations concrètes.",
    "prix": 90,
    "heures": 1.5,
    "unite": "forfait",
    "note": "Le travail qui en découle est facturé à part."
  },
  {
    "code": "K11",
    "famille": "carte",
    "onglet": "À la carte",
    "groupe": "AVANT / PENDANT / APRÈS",
    "libelle": "Livraison en urgence (< 48 h)",
    "description": "Pour une intervention ponctuelle.",
    "prix": 0.3,
    "heures": 0,
    "unite": "% de majoration",
    "note": "Valeur en pourcentage."
  },
  {
    "code": "K12",
    "famille": "carte",
    "onglet": "À la carte",
    "groupe": "AVANT / PENDANT / APRÈS",
    "libelle": "Intervention hors horaires (soir, week-end)",
    "description": "",
    "prix": 0.5,
    "heures": 0,
    "unite": "% de majoration",
    "note": "Valeur en pourcentage."
  },
  {
    "code": "K13",
    "famille": "carte",
    "onglet": "À la carte",
    "groupe": "AVANT / PENDANT / APRÈS",
    "libelle": "Retrait de la mention « Réalisé par Stackup »",
    "description": "",
    "prix": 0,
    "heures": 0,
    "unite": "gratuit",
    "note": "Gratuit : la faire payer donne une mauvaise image."
  },
  {
    "code": "K14",
    "famille": "carte",
    "onglet": "À la carte",
    "groupe": "AVANT / PENDANT / APRÈS",
    "libelle": "Nom de domaine supplémentaire",
    "description": "",
    "prix": 0,
    "heures": 0,
    "unite": "au coût réel",
    "note": ""
  },
  {
    "code": "K15",
    "famille": "carte",
    "onglet": "À la carte",
    "groupe": "AVANT / PENDANT / APRÈS",
    "libelle": "Campagne e-mail / newsletter",
    "description": "Rédaction et envoi d'une campagne.",
    "prix": 120,
    "heures": 2.5,
    "unite": "par campagne",
    "note": ""
  }
]
