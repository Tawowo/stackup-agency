/**
 * Les fiches « outil » (/solutions/[slug]) : chacune renvoie à un module du catalogue de l'outil de
 * gestion (codes O01 à O35 de l'Excel, voir src/config/tarifs.generated.ts) et, quand il existe,
 * au logiciel réel (Artibox, en développement) dont la démo est testable.
 * Aucun chiffre client, aucune comparaison de prix, aucune maquette inventée.
 * Les prix passent par des jetons {{prix:…}} ; jamais de montant écrit à la main.
 */
import { jetonsProfond } from '../lib/jetons'

export interface Solution {
  slug: string
  nom: string
  /** Codes des modules du catalogue (Excel) qui font cette fonction. */
  codes: string[]
  /** Le module existe déjà dans le logiciel réel (Artibox) : on peut le voir en démo. */
  dansLaDemo: boolean
  metiersCibles: string[]
  intro: string
  /** Trois situations du quotidien que le module règle. */
  situations: string[]
  fonctionnalites: string[]
  faq: { q: string; a: string }[]
}

const FAQ_PRIX = (nom: string) => ({
  q: `Combien coûte ${nom} ?`,
  a: 'Un outil de gestion démarre à partir de {{prix:outil}} € : le socle (connexion sécurisée, base de données, tableau de bord, export de vos données) plus le premier module. Le prix exact dépend des modules choisis ; l’estimateur vous donne une fourchette en quelques minutes, et le devis écrit fixe le montant avant que vous vous engagiez.',
})
const FAQ_DONNEES = {
  q: 'Mes données m’appartiennent-elles ?',
  a: 'Oui. Le socle de l’outil inclut l’export de vos données. Vous pouvez les récupérer à tout moment, et le code est cédé selon les conditions du devis.',
}
const FAQ_DEMO = {
  q: 'Puis-je voir un outil avant de décider ?',
  a: 'Oui : la démo du logiciel de gestion de Stackup est en ligne et se teste librement. Pour votre activité, une démonstration de votre propre outil peut être préparée avant le devis (démo à {{carte:demo}} €).',
}

const BRUT_SOLUTIONS: Solution[] = [
  {
    slug: 'prise-rendez-vous-en-ligne',
    nom: 'Prise de rendez-vous en ligne',
    codes: ['O08'],
    dansLaDemo: false,
    metiersCibles: ['osteopathe', 'salon-coiffure', 'institut-beaute', 'garage-automobile', 'auto-ecole', 'cabinet-medical'],
    intro: 'Vos clients réservent un créneau en ligne, à toute heure, sans que vous décrochiez le téléphone. Le module se branche à votre outil de gestion (planning, clients) et peut être relié à votre site internet.',
    situations: ['Le téléphone sonne pendant que vous travaillez.', 'Un client oublie son rendez-vous et ne prévient pas.', 'Votre agenda est dans un carnet, et vous le consultez rarement au même endroit que vos messages.'],
    fonctionnalites: ['Agenda en ligne : le client choisit un créneau libre', 'Durées et prestations adaptées à votre métier', 'Rappel automatique avant le rendez-vous (avec le module Automatisations)', 'Créneaux bloqués pour vos congés et vos pauses', 'Historique des rendez-vous dans la fiche du client', 'Option : relié à votre site internet'],
    faq: [
      { q: 'Les clients peuvent-ils annuler en ligne ?', a: 'Oui, si vous le souhaitez : le client annule depuis son message de confirmation, et le créneau se libère. Vous fixez le délai minimal d’annulation.' },
      { q: 'Peut-on gérer plusieurs personnes dans l’agenda ?', a: 'Oui. Chaque personne a son agenda, ses prestations et ses horaires, avec les rôles et droits avancés si vous voulez limiter ce que chacun voit.' },
      FAQ_PRIX('un module de prise de rendez-vous'),
      FAQ_DEMO,
    ],
  },
  {
    slug: 'gestion-devis-factures',
    nom: 'Gestion des devis et factures',
    codes: ['O02', 'O03', 'O04', 'O31'],
    dansLaDemo: true,
    metiersCibles: ['plombier', 'electricien', 'macon-renovateur', 'paysagiste-jardinier'],
    intro: 'Créer, envoyer et suivre vos devis, puis transformer en facture ce qui est accepté. C’est le cœur du logiciel de gestion de Stackup, déjà visible dans la démo : devis, factures, suivi des paiements.',
    situations: ['Vous refaites le même devis à la main, avec les mêmes prix.', 'Vous ne savez plus quel client a payé et lequel doit être relancé.', 'Votre comptable vous réclame des factures numérotées proprement.'],
    fonctionnalites: ['Devis créés à partir de votre catalogue de prestations', 'Factures conformes, numérotation automatique, avoirs', 'Suivi des paiements : qui a payé, qui est en retard', 'Relances automatiques (module Suivi des paiements)', 'Option : devis et factures automatiques (O31), le devis se remplit tout seul', 'Option : export comptable pour votre comptable'],
    faq: [
      { q: 'La facturation électronique est-elle prévue ?', a: 'Oui : le module Facturation électronique conforme envoie et reçoit les factures via une plateforme agréée. La réforme française s’applique par étapes, à partir de 2026-2027.' },
      { q: 'Mes anciens clients et prix peuvent-ils être repris ?', a: 'Oui, avec l’option Import de vos données existantes : vos fichiers Excel ou ceux d’un ancien logiciel sont repris au démarrage.' },
      FAQ_PRIX('un outil de devis et de factures'),
      FAQ_DEMO,
    ],
  },
  {
    slug: 'click-and-collect',
    nom: 'Click et Collect',
    codes: ['O17'],
    dansLaDemo: false,
    metiersCibles: ['boulangerie-patisserie', 'boucherie-charcuterie', 'fleuriste', 'pharmacie-parapharmacie'],
    intro: 'Vos clients commandent en ligne et viennent retirer au magasin, au créneau qu’ils ont choisi. Vous préparez à l’avance, sans file d’attente ni commande oubliée.',
    situations: ['Les commandes arrivent par téléphone et SMS, et se perdent.', 'Le samedi matin, la file d’attente décourage des clients.', 'Vous ne savez pas combien de commandes préparer pour demain.'],
    fonctionnalites: ['Catalogue de vos produits avec photos et prix', 'Choix du créneau de retrait par le client', 'Liste de préparation pour le lendemain', 'Statut de la commande : reçue, prête, retirée', 'Notification au client quand la commande est prête', 'Option : relié à votre site internet'],
    faq: [
      { q: 'Le paiement en ligne est-il obligatoire ?', a: 'Non. Le client peut payer en ligne ou au retrait, selon votre choix. Le paiement par carte relève de l’offre boutique en ligne si vous voulez aussi vendre à distance.' },
      { q: 'Quelle différence avec une boutique en ligne ?', a: 'Le Click et Collect est un module de l’outil de gestion : il sert à préparer et suivre les retraits en magasin. La boutique en ligne est une offre de site à part, avec paiement et livraison.' },
      FAQ_PRIX('un Click et Collect'),
      FAQ_DONNEES,
    ],
  },
  {
    slug: 'reservation-restaurant',
    nom: 'Réservation de restaurant',
    codes: ['O09'],
    dansLaDemo: false,
    metiersCibles: ['restaurant', 'pizzeria', 'brasserie-bar', 'restaurant-gastronomique'],
    intro: 'Vos clients réservent une table en ligne, vous voyez la salle du soir d’un coup d’œil. Le module Réservations est adapté à votre salle : tables, services, nombre de couverts.',
    situations: ['Les réservations arrivent par téléphone pendant le service.', 'Vous notez les tables sur un cahier, et l’erreur n’est jamais loin.', 'Des clients ne viennent pas et laissent une table vide.'],
    fonctionnalites: ['Réservation en ligne par service (midi, soir)', 'Nombre de couverts et capacité de la salle', 'Vue du jour pour l’équipe', 'Confirmation et rappel au client (avec le module Automatisations)', 'Fiche client avec ses réservations passées', 'Option : relié à votre site internet'],
    faq: [
      { q: 'Peut-on bloquer des services ou des jours ?', a: 'Oui : vous fermez un service, un jour ou une période (congés, privatisation) et les créneaux disparaissent du site.' },
      { q: 'Et les groupes ou les événements ?', a: 'Le module se règle selon votre cas : nombre maximal de couverts en ligne, demande de devis au-delà, par exemple.' },
      FAQ_PRIX('un module de réservation'),
      FAQ_DEMO,
    ],
  },
  {
    slug: 'programme-fidelite',
    nom: 'Programme de fidélité digital',
    codes: ['O18'],
    dansLaDemo: false,
    metiersCibles: ['restaurant', 'salon-coiffure', 'boulangerie-patisserie', 'institut-beaute'],
    intro: 'Des points, des récompenses et des offres pour vos clients fidèles, suivis dans votre outil plutôt que sur une carte papier qu’on oublie à la maison.',
    situations: ['Vos cartes à tampons se perdent ou se trichent.', 'Vous ne savez pas qui sont vos meilleurs clients.', 'Vous aimeriez les remercier, sans y passer vos soirées.'],
    fonctionnalites: ['Points gagnés à chaque passage ou achat', 'Récompenses que vous définissez', 'Offres ciblées pour vos clients fidèles', 'Liste des clients proches d’une récompense', 'Lien avec les fiches clients (CRM)', 'Option : relié à votre site internet'],
    faq: [
      { q: 'Faut-il une application à installer ?', a: 'Non obligatoirement. Le client peut présenter un code ou donner son nom ; une application installable sur téléphone existe en option.' },
      { q: 'Les règles de points sont-elles modifiables ?', a: 'Oui, elles se règlent selon votre activité : points par euro, par visite, seuils de récompense.' },
      FAQ_PRIX('un programme de fidélité'),
      FAQ_DONNEES,
    ],
  },
  {
    slug: 'caisse-enregistreuse',
    nom: 'Caisse et encaissement sur mesure',
    codes: ['O15'],
    dansLaDemo: false,
    metiersCibles: ['restaurant', 'boutique-mode', 'epicerie-fine'],
    intro: 'Un module de caisse qui s’intègre à votre outil de gestion : vos produits, vos prix et vos clients sont les mêmes partout. À étudier ensemble : la conformité fiscale d’un logiciel de caisse demande de la rigueur.',
    situations: ['Votre caisse ne parle pas à votre stock ni à vos clients.', 'Vous ressaisissez le soir ce que la caisse a déjà enregistré.', 'Vous voulez une caisse adaptée à votre activité, pas un logiciel générique.'],
    fonctionnalites: ['Encaissement rapide avec votre catalogue', 'Lien avec le stock (module Stocks)', 'Tickets et récapitulatif de la journée', 'Export vers votre comptable', 'Utilisable sur tablette', 'Option : fonctionne sans connexion'],
    faq: [
      { q: 'La caisse est-elle conforme à la loi anti-fraude ?', a: 'C’est un point à traiter au cadrage : un logiciel de caisse doit respecter des règles précises (inaltérabilité, archivage). Nous le regardons avec vous avant tout devis.' },
      { q: 'Faut-il du matériel particulier ?', a: 'Une tablette ou un ordinateur suffisent pour commencer ; un tiroir-caisse ou une imprimante de tickets s’ajoutent selon votre besoin.' },
      FAQ_PRIX('un module de caisse'),
      FAQ_DEMO,
    ],
  },
  {
    slug: 'gestion-stocks',
    nom: 'Gestion des stocks',
    codes: ['O16', 'O05'],
    dansLaDemo: false,
    metiersCibles: ['restaurant', 'epicerie-fine', 'cave-vins-spiritueux', 'magasin-sport'],
    intro: 'Entrées, sorties et alertes de rupture : vous savez ce qu’il reste et ce qu’il faut commander, sans compter à la main. Le module peut se lier aux commandes fournisseurs.',
    situations: ['Vous découvrez une rupture le jour où un client demande le produit.', 'Votre inventaire est un tableau Excel que personne ne met à jour.', 'Vous commandez trop ou pas assez.'],
    fonctionnalites: ['Entrées et sorties de stock', 'Alerte quand un article passe sous le seuil', 'Commandes fournisseurs (module à part)', 'Catalogue de produits partagé avec le reste de l’outil', 'Option : import de votre fichier de stock existant', 'Option : export comptable'],
    faq: [
      { q: 'Peut-on reprendre notre fichier Excel ?', a: 'Oui, avec l’option Import de vos données existantes : le fichier est repris au démarrage.' },
      { q: 'Le stock se met-il à jour à chaque vente ?', a: 'Oui si le module est relié à la caisse ou aux commandes en ligne : chaque vente fait baisser le stock.' },
      FAQ_PRIX('un module de stocks'),
      FAQ_DONNEES,
    ],
  },
  {
    slug: 'crm-sur-mesure',
    nom: 'CRM sur mesure',
    codes: ['O01', 'O21'],
    dansLaDemo: true,
    metiersCibles: ['avocat', 'expert-comptable', 'courtier-credit', 'organisme-formation'],
    intro: 'Fiches clients, historique des échanges, notes et relances : tout ce qui concerne un client au même endroit. Les fiches clients sont déjà dans le logiciel de gestion de Stackup, visible en démo ; elles s’adaptent à votre métier.',
    situations: ['Les informations d’un client sont dans trois carnets et deux boîtes mail.', 'Vous oubliez de rappeler un prospect.', 'Vous voulez savoir ce que vous avez déjà fait pour un client avant de décrocher.'],
    fonctionnalites: ['Fiches clients et contacts', 'Historique des échanges et notes', 'Relances à faire, avec rappel', 'Dossiers détaillés propres à votre métier (module dédié)', 'Lien direct avec les devis et les factures', 'Import de vos contacts existants'],
    faq: [
      { q: 'Quelle différence avec un CRM du commerce ?', a: 'Un CRM du commerce est général et payant par utilisateur. Ici, les fiches sont celles de votre métier, dans l’outil que vous possédez, avec les données exportables à tout moment.' },
      { q: 'Peut-on reprendre notre liste de clients ?', a: 'Oui, avec l’option Import de vos données existantes.' },
      FAQ_PRIX('un CRM sur mesure'),
      FAQ_DEMO,
    ],
  },
  {
    slug: 'portail-client',
    nom: 'Portail client et extranet',
    codes: ['O20', 'O28'],
    dansLaDemo: false,
    metiersCibles: ['expert-comptable', 'avocat', 'architecte', 'organisme-formation'],
    intro: 'Un espace privé où vos clients consultent leurs devis, leurs factures et leurs documents, sans vous les redemander par e-mail. Chacun ne voit que ce qui le concerne.',
    situations: ['Vous renvoyez les mêmes documents par e-mail, encore et encore.', 'Un client cherche une facture que vous lui avez déjà envoyée.', 'Vous voulez un échange plus sûr que la pièce jointe.'],
    fonctionnalites: ['Connexion sécurisée pour chaque client', 'Devis, factures et documents consultables', 'Documents partagés classés par client ou dossier', 'Signature électronique via un service spécialisé (module à part)', 'Rôles et droits : chacun ne voit que ses documents', 'Notifications quand un document est disponible'],
    faq: [
      { q: 'Mes clients doivent-ils créer un compte ?', a: 'Oui, avec une connexion sécurisée que vous leur envoyez. Ils n’ont rien à installer.' },
      { q: 'Où sont stockés les documents ?', a: 'Dans la base de données de votre outil, avec export de vos données à tout moment. Les conditions d’hébergement sont écrites au devis.' },
      FAQ_PRIX('un portail client'),
      FAQ_DEMO,
    ],
  },
  {
    slug: 'planning-employes',
    nom: 'Planning des employés',
    codes: ['O07', 'O12', 'O11'],
    dansLaDemo: true,
    metiersCibles: ['restaurant', 'salle-de-sport', 'institut-beaute'],
    intro: 'Qui fait quoi, quand : le planning de l’équipe se construit et se consulte depuis un téléphone. Le planning est déjà dans le logiciel de gestion de Stackup, visible en démo, avec la détection des conflits.',
    situations: ['Le planning est un tableau papier qu’on rature chaque semaine.', 'Deux personnes sont prévues au même endroit, ou personne.', 'Chacun demande ses horaires par SMS.'],
    fonctionnalites: ['Planning jour, semaine et mois', 'Détection des conflits d’horaires', 'Demandes de congés et échanges de créneaux (module à part)', 'Feuilles de temps et pointage (module à part)', 'Consultation sur téléphone par chaque membre', 'Lien avec les chantiers ou les rendez-vous'],
    faq: [
      { q: 'Chaque employé voit-il le planning des autres ?', a: 'Selon les droits que vous donnez : chacun peut ne voir que ses propres horaires.' },
      { q: 'Le planning prévient-il les employés d’un changement ?', a: 'Oui, avec le module Notifications et messagerie interne ou le module Automatisations.' },
      FAQ_PRIX('un module de planning'),
      FAQ_DEMO,
    ],
  },
  {
    slug: 'menu-qr-code',
    nom: 'Menu digital et QR code',
    codes: ['O19'],
    dansLaDemo: false,
    metiersCibles: ['restaurant', 'brasserie-bar', 'cafe-salon-the'],
    intro: 'Votre carte en ligne, accessible en scannant un QR code posé sur la table. Vous la changez vous-même en quelques secondes : plat du jour, prix, produit épuisé.',
    situations: ['Vos cartes imprimées sont périmées dès que le plat du jour change.', 'Réimprimer coûte du temps et de l’argent.', 'Un client demande un allergène et personne ne sait.'],
    fonctionnalites: ['Carte en ligne, modifiable par vous seul', 'QR code à imprimer pour vos tables et votre vitrine', 'Plats du jour et produits épuisés mis à jour instantanément', 'Photos et descriptions des plats', 'Mention des allergènes que vous renseignez', 'Lien possible avec la commande en ligne'],
    faq: [
      { q: 'Faut-il une application pour lire la carte ?', a: 'Non : le client scanne le QR code avec l’appareil photo de son téléphone et la carte s’ouvre dans son navigateur.' },
      { q: 'Puis-je modifier la carte seul ?', a: 'Oui, depuis votre outil, sur ordinateur ou téléphone.' },
      FAQ_PRIX('un menu digital'),
      FAQ_DONNEES,
    ],
  },
  {
    slug: 'tableau-de-bord',
    nom: 'Tableau de bord dirigeant',
    codes: ['O26', 'O27'],
    dansLaDemo: true,
    metiersCibles: ['restaurant', 'boutique-mode', 'organisme-formation'],
    intro: 'Chiffre d’affaires, marges, objectifs, délais de paiement : les chiffres qui comptent sur un seul écran. Un tableau de bord et des statistiques sont déjà dans le logiciel de gestion de Stackup, visibles en démo.',
    situations: ['Vous découvrez vos chiffres une fois par an, chez le comptable.', 'Vous ne savez pas quels clients rapportent vraiment.', 'Vous voulez savoir si le mois est bon avant qu’il soit fini.'],
    fonctionnalites: ['Chiffre d’affaires et objectifs du mois', 'Répartition par type de prestation et meilleurs clients', 'Délais de paiement et factures en retard', 'Graphiques lisibles sans formation', 'Rapports PDF automatiques (module à part)', 'Option : assistant IA qui commente vos chiffres (O35)'],
    faq: [
      { q: 'Les chiffres se mettent-ils à jour tout seuls ?', a: 'Oui, ils se calculent à partir de vos devis, factures et paiements saisis dans l’outil.' },
      { q: 'Peut-on recevoir un rapport par e-mail ?', a: 'Oui, avec le module Rapports PDF automatiques.' },
      FAQ_PRIX('un tableau de bord'),
      FAQ_DEMO,
    ],
  },
  {
    slug: 'reservation-location',
    nom: 'Réservation de location',
    codes: ['O09', 'O14'],
    dansLaDemo: false,
    metiersCibles: ['gite-location-saisonniere', 'camping', 'magasin-sport'],
    intro: 'Réserver des chambres, des salles, des véhicules ou du matériel : le module montre ce qui est libre, évite les doubles réservations et garde l’historique.',
    situations: ['Deux clients réservent le même matériel pour la même date.', 'Votre calendrier est partagé entre plusieurs supports.', 'Vous perdez du temps à répondre « c’est encore libre ? ».'],
    fonctionnalites: ['Calendrier de disponibilité par bien ou par salle', 'Réservation par période, avec blocage automatique', 'Disponibilité et affectation du matériel et des véhicules', 'Historique par client', 'Confirmation et rappel au client', 'Option : relié à votre site internet'],
    faq: [
      { q: 'Le paiement en ligne est-il possible ?', a: 'Oui, selon le besoin : acompte, paiement complet ou paiement sur place. Le paiement relève d’un service tiers dont le coût d’usage est refacturé.' },
      { q: 'Peut-on synchroniser avec un autre calendrier ?', a: 'Oui, avec l’option Connexion à un service externe (par exemple Google Agenda).' },
      FAQ_PRIX('un module de location'),
      FAQ_DEMO,
    ],
  },
]

export function getSolution(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug)
}

export const SOLUTIONS: Solution[] = jetonsProfond(BRUT_SOLUTIONS)
