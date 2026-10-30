/**
 * TEXTES DE LA GRANDE PAGE /clubs-de-tennis et des pages de formule : écrits à la main, lus par les gabarits.
 * Aucun montant en chiffres (jetons `{{club:…}}`), nom du produit en `{{nom:produit}}`, honnêteté ADOC/FFT.
 */
import type { QR } from './types.ts'

export const PROMESSE = 'Le site de votre club et le logiciel de votre bureau, connectés en direct. ADOC gère l’administratif fédéral, {{nom:produit}} fait vivre votre club.'

export const PROBLEME = {
  etiquette: 'Le point de départ',
  titre: 'Un bureau de bénévoles, six outils qui ne se parlent pas',
  intro: 'Personne n’a décidé d’en arriver là. Chaque outil est arrivé un jour pour régler un besoin précis, installé par un bénévole de bonne volonté. Résultat : le bureau passe ses soirées à recopier la même information d’un endroit à l’autre.',
  outils: [
    { titre: 'Le tableur des adhérents', texte: 'Que seule la personne qui l’a construit comprend vraiment, et qui n’existe qu’en une version sur un seul ordinateur.' },
    { titre: 'Les e-mails et les groupes de messagerie', texte: 'Pour convoquer, relancer, prévenir qu’il pleut. Chacun les lit quand il peut.' },
    { titre: 'Le site qui vieillit', texte: 'Les horaires de l’an dernier, le formulaire papier à imprimer, personne n’ose y toucher.' },
    { titre: 'La permanence d’inscription', texte: 'Des dossiers papier, des pièces manquantes, des chèques à déposer, et des soirées à ressaisir.' },
    { titre: 'ADOC', texte: 'Indispensable pour les licences et l’administratif fédéral, mais ce n’est pas fait pour faire vivre le club au quotidien.' },
    { titre: 'Les paiements à rapprocher', texte: 'Qui a payé, combien, pour quelle famille ? Le trésorier le reconstitue à la main.' },
  ],
  conclusion: 'Un seul endroit où tout se retrouve, c’est ce que {{nom:produit}} apporte à un club.',
} as const

export const SOLUTION = {
  etiquette: 'La solution',
  titre: 'Trois blocs, une seule information',
  intro: 'Le site, le logiciel et l’espace des membres lisent et écrivent dans la même base. Ce qui est saisi une fois apparaît partout où il sert.',
  blocs: [
    { id: 'site', titre: 'Le site du club', accroche: 'La vitrine, aux couleurs du club', texte: 'Ce que voient les futurs adhérents et les parents : le club, les installations, l’école de tennis, l’agenda, les actualités, les tarifs, l’adhésion en ligne. Le club le modifie seul, sans demander à personne.', lien: '/clubs-de-tennis/site-internet', lienTexte: 'Voir la formule site' },
    { id: 'logiciel', titre: 'Le logiciel du bureau', accroche: 'Le poste de pilotage du club', texte: 'Adhérents et familles, dossiers, paiements, école de tennis, équipes, tournois, bénévoles, communication. Chaque matin, « Ma journée » dit ce qui demande une action aujourd’hui.', lien: '/clubs-de-tennis/logiciel-de-gestion', lienTexte: 'Voir la formule logiciel' },
    { id: 'espace', titre: 'L’espace membre et parent', accroche: 'Le lien avec les familles', texte: 'Chaque famille retrouve ses enfants, ses séances, ses paiements, ses convocations. L’espace s’installe sur le téléphone comme une application.', lien: '/clubs-de-tennis/fonctionnalites/espace-membre-et-parent', lienTexte: 'Voir l’espace membre' },
  ],
  connexions: [
    'Une inscription faite sur le site arrive directement dans le logiciel, avec ses pièces jointes.',
    'Un match saisi par un membre met à jour le classement affiché sur le site.',
    'Une séance annulée par l’enseignant prévient les familles concernées, et seulement elles.',
  ],
} as const

export const MERCREDI = {
  etiquette: 'Un mercredi au club',
  titre: 'Une journée type, du matin au soir',
  intro: 'Exemple type, inventé pour l’occasion : une journée ordinaire dans un club de taille moyenne.',
  scenes: [
    { heure: '7 h 45', titre: 'La pluie est tombée toute la nuit', texte: 'Le président ouvre « Ma journée » sur son téléphone. Deux séances de l’école de tennis de l’après-midi sont signalées : courts extérieurs, risque de pluie. Il les passe en « annulée, report à proposer » en un geste. Les familles concernées sont prévenues par e-mail et par notification, avant même le déjeuner.', effet: 'Plus de messages à écrire un par un, plus de parents qui viennent pour rien.' },
    { heure: '12 h 15', titre: 'Un parent inscrit son enfant pendant sa pause', texte: 'Depuis son téléphone, sur le site du club, une maman choisit la formule, remplit le dossier, joint le certificat et règle avec HelloAsso. Le dossier arrive dans « Ma journée » de la secrétaire, avec les pièces. Le paiement est suivi tout seul.', effet: 'La permanence d’inscription devient un simple contrôle.' },
    { heure: '21 h 30', titre: 'Un match du challenge interne vient de finir', texte: 'Les deux joueurs ont terminé leur partie. L’un saisit le score au format fédéral depuis le téléphone. Le classement du challenge bouge sur le site du club, et un badge s’affiche sur le profil du vainqueur.', effet: 'Le club vit entre les entraînements, et ça se voit.' },
  ],
} as const

export const ROLES: { id: string; titre: string; texte: string; fonctionnalite: string }[] = [
  { id: 'president', titre: 'Le président', texte: 'Une vue claire de ce qui presse, chaque jour, sans ouvrir six outils. Il garde la main sur les droits de chacun et sur l’image du club.', fonctionnalite: 'ma-journee-et-automatisations' },
  { id: 'tresorier', titre: 'Le trésorier', texte: 'Les paiements arrivent suivis, les cotisations sont suivies automatiquement, l’export est prêt pour la comptabilité et l’assemblée générale.', fonctionnalite: 'paiement-en-ligne-helloasso' },
  { id: 'secretaire', titre: 'Le secrétaire', texte: 'Les dossiers d’adhésion arrivent avec leurs pièces, les relances partent automatiquement, les listes et les convocations se préparent en quelques clics.', fonctionnalite: 'adhesions-reinscriptions-en-ligne' },
  { id: 'enseignant', titre: 'L’enseignant', texte: 'Ses groupes sur son téléphone, l’appel en quelques secondes, les annulations et les reports prévenus aux familles, la progression de chaque enfant.', fonctionnalite: 'ecole-de-tennis' },
  { id: 'capitaine', titre: 'Le capitaine', texte: 'Les disponibilités des joueurs, la composition de l’équipe, la convocation et le covoiturage, au même endroit.', fonctionnalite: 'equipes-et-competitions' },
  { id: 'parent', titre: 'Le parent', texte: 'Une seule application : les séances de ses enfants, les messages du club, les paiements, les documents. Plus de papiers dans le sac de sport.', fonctionnalite: 'espace-membre-et-parent' },
  { id: 'joueur', titre: 'Le joueur', texte: 'Son profil, ses matchs, le classement du challenge, les badges, les tournois et les événements auxquels il peut s’inscrire.', fonctionnalite: 'challenge-interne-saisie-des-matchs' },
]

export const ADOC = {
  etiquette: 'ADOC et Ten’Up',
  titre: 'Ce que nous faisons avec ADOC, et ce que nous ne faisons pas',
  intro: 'ADOC et Ten’Up sont des services de la Fédération française de tennis. Ils restent la référence pour les licences et les démarches fédérales. {{nom:produit}} ne les remplace pas : il s’occupe de la vie du club autour.',
  fait: [
    'Import et export des fichiers ADOC : vous reprenez vos adhérents et vous sortez ce dont vous avez besoin.',
    'Contrôle des licences manquantes : le logiciel vous dit qui joue sans licence à jour.',
    'Import des membres depuis une source : export ADOC ou tableur.',
    'Des liens utiles vers les services fédéraux sur le site du club.',
  ],
  nonFait: [
    'Aucune connexion directe avec ADOC : les échanges passent par des fichiers que vous exportez et importez vous-même.',
    'Aucun partenariat ni agrément de la Fédération : {{nom:produit}} n’est ni affilié ni approuvé par la FFT.',
    'Nous ne prenons pas les licences à votre place : elles se prennent dans les services fédéraux.',
    'Nous n’utilisons ni les logos ni les marques de la Fédération.',
  ],
} as const

export const ETAPES_MISE_EN_PLACE: { titre: string; texte: string }[] = [
  { titre: 'Un premier échange', texte: 'Un appel gratuit de 30 minutes, ou un rendez-vous. En présentiel, le premier rendez-vous est gratuit jusqu’à {{club:km}} km de Savigné-sur-Lathan ; au-delà, visio ou indemnité sur devis.' },
  { titre: 'Le justificatif des licenciés', texte: 'Un export ADOC, ou le rapport d’assemblée générale avec les chiffres des trois dernières saisons. Il fixe votre catégorie.' },
  { titre: 'Le devis', texte: 'Un prix ferme, établi à partir de ce que vous avez choisi : formule, options, accompagnement. Rien ne démarre avant votre accord.' },
  { titre: 'La mise en place', texte: 'Nous créons le site, paramétrons le logiciel et reprenons vos membres. Le délai est précisé au devis, jamais promis au hasard.' },
  { titre: 'La formation du bureau', texte: 'Les heures d’accompagnement de votre catégorie servent à former les bénévoles et à répondre à leurs premières questions.' },
  { titre: 'La mise en ligne', texte: 'Le site et le logiciel sont ouverts aux membres. Vous voyez le résultat avant que les familles ne le voient.' },
  { titre: 'Le suivi', texte: 'Support par e-mail ou formulaire, réponse sous {{club:support-jours}} jours ouvrés, sauvegardes, mises à jour et nouvelles fonctionnalités de la formule sans supplément.' },
]

export const DONNEES = {
  etiquette: 'Sécurité et données',
  titre: 'Les données du club appartiennent au club',
  intro: 'Un club gère des données sensibles : des enfants, des certificats, des paiements. Elles sont traitées comme telles.',
  points: [
    { titre: 'RGPD', texte: 'Le club est responsable de traitement, Stackup Agency est sous-traitant. Un contrat de traitement des données personnelles est inclus dans l’abonnement.' },
    { titre: 'Vos données restent à vous', texte: 'Les adhérents, les contenus, les photos, le logo vous appartiennent. Nous n’en faisons aucun autre usage.' },
    { titre: 'Export complet à tout moment', texte: 'Vous récupérez toutes vos données quand vous le souhaitez, pas seulement à la fin du contrat.' },
    { titre: 'Hébergement, sauvegardes, https', texte: 'Hébergement professionnel, sauvegardes quotidiennes, connexion sécurisée, surveillance. Les prestataires techniques sont listés dans le contrat de traitement.' },
    { titre: 'Des droits par personne', texte: 'Chacun ne voit que ce qui le concerne : le trésorier les paiements, l’enseignant ses groupes, le parent ses enfants. Un journal garde la trace de qui a fait quoi.' },
    { titre: 'En fin de contrat', texte: 'Vous recevez l’export complet de vos données. Le site reste en ligne un mois, les données sont supprimées trois mois après la fin du contrat. Une copie autonome du site existe en option.' },
  ],
} as const

export const DEMO_PARCOURS: { id: 'site' | 'bureau' | 'roles'; titre: string; texte: string; bouton: string }[] = [
  { id: 'site', titre: 'Le site d’un club', texte: 'Le site du club fictif « Grand Chelem Tennis Club » : ce que voit un futur adhérent ou un parent. Parcourez l’accueil, l’école de tennis, l’agenda, l’adhésion.', bouton: 'Voir le site d’un club' },
  { id: 'bureau', titre: 'Le logiciel du bureau', texte: 'Le poste de pilotage du même club : « Ma journée », les adhérents, les dossiers, l’école de tennis, les équipes, les paiements.', bouton: 'Ouvrir le logiciel du bureau' },
  { id: 'roles', titre: 'Essayer en tant que…', texte: 'Choisissez un rôle : présidente, trésorier, enseignant, parent… et voyez le club à travers ses yeux.', bouton: 'Essayer en tant que parent' },
]

export const PARCOURS_CONSEILLE = [
  'Commencez par le site : regardez-le comme un futur adhérent.',
  'Ouvrez ensuite le logiciel du bureau et lisez « Ma journée ».',
  'Choisissez le rôle du trésorier, puis celui du parent : deux regards très différents.',
  'Revenez nous dire ce qui manque à votre club : nous vous répondons personnellement.',
]

export const PAGES_COMPRISES = ['Accueil', 'Le club', 'Installations', 'Tarifs et adhésion', 'École de tennis', 'Adultes', 'Équipes et compétitions', 'Actualités', 'Agenda', 'Galerie', 'Partenaires', 'Documents', 'FAQ', 'Contact', 'Essai gratuit']

export const APPEL_FINAL = {
  titre: 'Regardons ensemble ce que cela donnerait pour votre club',
  texte: 'Un appel de 30 minutes suffit pour savoir si {{nom:produit}} convient à votre club. Sans engagement : vous voyez la démo, vous obtenez une estimation, vous décidez ensuite.',
}

export const FAQ_PRIX_ARGUMENT: QR = {
  q: 'Combien cela coûte-t-il par licencié ?',
  a: 'Le coût par licencié se calcule depuis votre catégorie : l’abonnement annuel divisé par le nombre de licenciés de la saison. Le simulateur l’affiche pour votre club.',
}
