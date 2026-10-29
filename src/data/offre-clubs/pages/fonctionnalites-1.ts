/**
 * PAGES « FONCTIONNALITÉ » DE L'OFFRE CLUBS DE TENNIS (1/2) — site modifiable, adhésions, HelloAsso, fichiers ADOC,
 * école de tennis, Challenge interne, équipes et compétitions. Montants : jetons {{club:…}} uniquement.
 */
import type { PageClub } from '../types'
import { DEMO } from '@/config/offre-clubs'

export const FONCTIONNALITES_1: PageClub[] = [
  // ─────────────────────────────────────────────────────────────────────────────────────────────── site modifiable
  {
    slug: 'site-modifiable',
    chemin: '/clubs-de-tennis/fonctionnalites/site-modifiable',
    famille: 'fonctionnalite',
    titre: `Un site de club que vous modifiez vous-même, sans risque de le casser`,
    etiquette: `Fonctionnalité · Site modifiable`,
    reponse: `Avec l’éditeur de {{produit}}, le bureau change un texte, une photo, un horaire ou un document directement sur la page, depuis un ordinateur ou un téléphone, sans attendre personne. Le design est protégé : il reste propre quoi que vous fassiez. L’éditeur est inclus dans la formule site et dans le pack site et logiciel.`,
    titleSeo: `Modifier le site de son club soi-même, sans technique`,
    descriptionSeo: `Changez textes, photos, menus et documents du site de votre club de tennis en quelques clics. Design protégé, pages illimitées. Essayez l’éditeur.`,
    motCle: 'modifier le site de son club soi-même',
    motsCles: [
      'modifier le site du club de tennis',
      'éditeur de site pour association sportive',
      'mettre à jour le site du club sans webmaster',
      'site de club facile à modifier',
      'changer les horaires sur le site du club',
      'ajouter une page au site du club',
    ],
    capture: 'editeur',
    demo: [
      { libelle: `Modifier une page en tant que présidente`, url: DEMO.role('presidente', '/editeur') },
      { libelle: `Changer le bandeau d’information urgent`, url: DEMO.role('presidente', '/editeur/bandeau') },
      { libelle: `Voir le site public du club fictif`, url: DEMO.site },
    ],
    tarif: {
      formule: 'site',
      texte: `Inclus dans la formule site, à partir de {{club:site:mini:mois}} € par mois et {{club:site:mini:mise}} € de mise en place pour un club de la catégorie Mini. Également inclus dans le pack site et logiciel, avec {{club:remise-pack}} % de remise.`,
    },
    etapes: [
      { titre: `Nous créons les premières pages`, texte: `À la mise en place, nous créons jusqu’à {{club:pages}} pages à partir de vos informations : accueil, le club, tarifs et adhésion, école de tennis, contact, etc. Les pages légales viennent en plus.` },
      { titre: `Vous ouvrez l’éditeur`, texte: `Connecté avec votre compte du bureau, vous voyez le site tel que le public le voit. Chaque élément que vous pouvez changer est signalé.` },
      { titre: `Vous modifiez sur la page`, texte: `Vous cliquez sur un texte, une image ou un lien et vous le changez sur place. Votre travail est gardé en brouillon tant que vous ne publiez pas.` },
      { titre: `Vous publiez`, texte: `Un clic, et la modification est en ligne. L’ancienne version reste dans l’historique : vous pouvez y revenir.` },
    ],
    sections: [
      {
        id: 'pourquoi-un-site-modifiable',
        titre: `Pourquoi le bureau doit-il pouvoir modifier le site lui-même ?`,
        paragraphes: [
          `Dans beaucoup de clubs, le site dépend d’une seule personne : un ancien membre du bureau, un parent qui « s’y connaît », un prestataire qu’on hésite à déranger pour une virgule. Le jour où cette personne n’est plus disponible, le site se fige. Les horaires d’été restent affichés en novembre, le tarif de la saison précédente aussi, et les familles appellent le président pour avoir l’information juste.`,
          `L’éditeur de {{produit}} règle ce problème à la racine : toute personne du bureau à qui vous en donnez le droit peut mettre le site à jour, sans compétence technique. Vous n’écrivez pas de code et vous n’apprenez pas un logiciel compliqué. Vous cliquez sur ce que vous voulez changer, vous le changez, vous publiez.`,
          `Le site reste ainsi le reflet exact de la vie du club. C’est ce qui donne envie à un nouveau venu de pousser la porte, et c’est ce qui évite au bureau de répondre dix fois à la même question.`,
        ],
      },
      {
        id: 'ce-que-vous-pouvez-modifier',
        titre: `Ce que vous pouvez modifier, et ce qui reste protégé`,
        paragraphes: [
          `L’éditeur vous laisse la main sur tout le contenu. Le cadre graphique, lui, est verrouillé : c’est ce qui garantit qu’un site modifié par cinq bénévoles différents reste aussi soigné qu’au premier jour.`,
        ],
        liste: [
          `**Les textes** de chaque page : présentation du club, horaires, tarifs, règlement intérieur.`,
          `**Les images** : vous déposez une photo, elle est allégée automatiquement pour s’afficher vite sur téléphone.`,
          `**Les liens et les menus** : ajouter une entrée, changer l’ordre, renommer une rubrique.`,
          `**Les documents** : fiche d’inscription, règlement, compte rendu d’assemblée générale, en téléchargement.`,
          `**De nouvelles pages**, sans limite de nombre, à partir de blocs déjà mis en forme.`,
          `**Le bandeau d’information urgent** : « Courts fermés ce matin, terrain gelé », affiché en haut de toutes les pages.`,
        ],
        sous: [
          {
            titre: `Ce qui ne bouge pas`,
            paragraphes: [
              `Les couleurs, les typographies, les espacements et la mise en page sont fixés par le thème choisi à la mise en place, parmi deux ou trois thèmes haut de gamme adaptés aux couleurs et au logo du club. Vous ne pouvez pas les dérégler par erreur. Un design entièrement unique, dessiné pour un seul club, n’entre pas dans la formule : il se fait sur devis.`,
            ],
          },
        ],
      },
      {
        id: 'brouillon-publication-historique',
        titre: `Brouillon, publication, historique : le droit à l’erreur`,
        paragraphes: [
          `Quand vous modifiez une page, rien ne part en ligne tant que vous n’avez pas cliqué sur « Publier ». Vous pouvez enregistrer un brouillon, le reprendre le lendemain, ou l’abandonner pour revenir à la version en ligne.`,
          `Chaque publication crée une nouvelle version et garde la précédente dans l’historique. Si quelqu’un supprime un paragraphe par mégarde, vous le retrouvez en quelques secondes. Le journal du site indique aussi qui a publié quoi, et quand : utile quand plusieurs personnes du bureau interviennent.`,
          `Les droits se donnent personne par personne. Le responsable communication peut avoir la main sur tout le site, un enseignant seulement sur la page de l’école de tennis si vous le souhaitez.`,
        ],
      },
      {
        id: 'site-et-logiciel-connectes',
        titre: `Avec le logiciel, une partie du site se met à jour toute seule`,
        paragraphes: [
          `Si votre club prend aussi le logiciel du bureau (le pack), certaines informations n’ont même plus besoin d’être recopiées. Les tarifs d’adhésion affichés sur le site sont ceux du logiciel, l’agenda public reprend les événements créés par le bureau, et le classement du Challenge interne se met à jour après chaque match validé.`,
          `Avec le site seul, vous gérez ces contenus à la main dans l’éditeur, ce qui reste simple. Le choix dépend surtout de la quantité d’informations que votre club fait vivre au fil de la saison. Pour comparer les deux formules, voyez [le site du club](/clubs-de-tennis/site-internet) et [le logiciel du bureau](/clubs-de-tennis/logiciel-de-gestion).`,
        ],
      },
      {
        id: 'limites-et-accompagnement',
        titre: `Ce que l’éditeur ne fait pas, et comment nous vous accompagnons`,
        paragraphes: [
          `L’éditeur vous rend autonome, mais il ne remplit pas le site à votre place. La saisie du contenu au fil de la saison reste l’affaire du club. Si vous voulez qu’on reprenne les textes de votre ancien site ou qu’on rédige une page pour vous, ce sont des options : la reprise du contenu, à partir de {{club:option:reprise-contenu:mise}} € par page, et la rédaction d’une page, à partir de {{club:option:redaction-page:mise}} € par page.`,
          `Des heures d’accompagnement sont incluses à la mise en place pour vous montrer l’éditeur, en présentiel ou en visio. Au-delà, l’heure est facturée {{club:heure}} €. Le référencement de base est fait (titres, plan du site, données structurées) pour que le club soit trouvé sur son nom ; nous ne promettons aucune position dans les résultats de recherche.`,
        ],
      },
    ],
    faq: [
      { q: `Faut-il des connaissances techniques pour utiliser l’éditeur ?`, a: `Non. Si vous savez écrire un e-mail et joindre une photo, vous savez modifier le site. La prise en main se fait pendant les heures d’accompagnement incluses.` },
      { q: `Peut-on modifier le site depuis un téléphone ?`, a: `Oui, pour les changements courants : un horaire, une actualité, le bandeau urgent, une photo. Pour créer une page complète, un ordinateur reste plus confortable.` },
      { q: `Combien de pages peut-on créer ?`, a: `Autant que vous voulez avec l’éditeur. Nous en créons jusqu’à {{club:pages}} à la mise en place ; au-delà, une page créée par nous est une option à {{club:option:page-supplementaire:mise}} € la page.` },
      { q: `Plusieurs personnes du bureau peuvent-elles modifier le site ?`, a: `Oui. Les comptes bureau sont illimités, et vous choisissez pour chacun ce qu’il peut modifier. Le journal garde la trace de chaque publication.` },
      { q: `Que se passe-t-il si quelqu’un fait une erreur ?`, a: `Vous revenez à la version précédente depuis l’historique. Et comme le design est verrouillé, une erreur touche un texte, jamais la mise en page.` },
      { q: `Peut-on changer de thème en cours de route ?`, a: `Le thème est choisi à la mise en place parmi deux ou trois propositions. Un changement ultérieur se discute avec nous ; un design unique se fait sur devis.` },
    ],
    liens: [
      { href: '/clubs-de-tennis/site-internet', nom: 'Le site du club', note: 'La formule complète' },
      { href: '/clubs-de-tennis/fonctionnalites/adhesions-en-ligne', nom: 'Adhésions et réinscriptions en ligne' },
      { href: '/clubs-de-tennis/fonctionnalites/communication', nom: 'Communication' },
      { href: '/clubs-de-tennis/guides/creer-le-site-de-son-club-de-tennis', nom: 'Guide : créer le site de son club de tennis' },
      { href: '/clubs-de-tennis/tarifs', nom: 'Tarifs' },
      { href: '/clubs-de-tennis/simulateur', nom: 'Simulateur de prix' },
    ],
    maj: '2026-10-29',
  },

  // ─────────────────────────────────────────────────────────────────────────────────────────── adhésions en ligne
  {
    slug: 'adhesions-en-ligne',
    chemin: '/clubs-de-tennis/fonctionnalites/adhesions-en-ligne',
    famille: 'fonctionnalite',
    titre: `Adhésions et réinscriptions en ligne : des dossiers complets sans courir après les papiers`,
    etiquette: `Fonctionnalité · Adhésions en ligne`,
    reponse: `Les familles s’inscrivent depuis le site ou leur téléphone, joignent les pièces demandées et paient en ligne avec HelloAsso. Le bureau voit chaque dossier avancer, et les relances partent toutes seules tant qu’il manque quelque chose. Le formulaire est inclus dans la formule site ; le suivi des dossiers et les relances sont inclus dans le logiciel.`,
    titleSeo: `Inscription en ligne au club de tennis : adhésions simples`,
    descriptionSeo: `Adhésions et réinscriptions en ligne pour club de tennis : formulaire familial, pièces jointes, paiement HelloAsso, suivi des dossiers et relances.`,
    motCle: 'inscription en ligne club de tennis',
    motsCles: [
      'adhésion en ligne club de tennis',
      'réinscription en ligne club sportif',
      'formulaire d’inscription club de tennis',
      'dossier d’adhésion tennis en ligne',
      'inscription famille club de tennis',
      'relance dossier incomplet association',
    ],
    capture: 'site-adhesion',
    demo: [
      { libelle: `Remplir une adhésion familiale sur le site`, url: DEMO.page('/adherer') },
      { libelle: `Suivre les dossiers en tant que secrétaire`, url: DEMO.role('secretaire', '/bureau/adhesions') },
      { libelle: `Compléter son dossier en tant que parent`, url: DEMO.role('parent', '/espace/dossier') },
    ],
    tarif: {
      formule: 'logiciel',
      texte: `Le formulaire d’adhésion en ligne est inclus dans la formule site, à partir de {{club:site:mini:mois}} € par mois. Le suivi des dossiers, les réinscriptions et les relances automatiques sont inclus dans le logiciel, à partir de {{club:logiciel:mini:mois}} € par mois pour un club de la catégorie Mini. Les deux ensemble : le pack, avec {{club:remise-pack}} % de remise.`,
    },
    etapes: [
      { titre: `La famille remplit un seul dossier`, texte: `Un parent inscrit ses enfants et lui-même dans le même formulaire, en trois étapes : les personnes, les activités, le paiement.` },
      { titre: `Elle joint les pièces`, texte: `Questionnaire de santé, certificat médical, autorisation parentale : chaque pièce se dépose en photo depuis le téléphone.` },
      { titre: `Elle paie en ligne`, texte: `Le bouton HelloAsso ouvre le paiement. L’argent arrive directement sur le compte du club.` },
      { titre: `Le bureau suit et valide`, texte: `Chaque dossier apparaît dans une colonne selon son état. Il manque une pièce ? Une relance part automatiquement. Le dossier est complet ? Vous le validez.` },
    ],
    sections: [
      {
        id: 'fin-des-dossiers-papier',
        titre: `Qu’est-ce que ça change pour le bureau à la rentrée ?`,
        paragraphes: [
          `La rentrée est le moment où le bureau d’un club de tennis s’épuise. Les fiches papier arrivent incomplètes, les chèques sont glissés dans une enveloppe sans nom, le certificat médical manque une fois sur trois, et quelqu’un passe ses soirées à tout recopier dans un tableur avant de saisir les licences.`,
          `Avec les adhésions en ligne, la famille fait elle-même la saisie, une seule fois, et elle ne peut pas envoyer un dossier sans les informations obligatoires. Le bureau ne recopie plus rien : il vérifie, il valide. Les informations arrivent propres dans la fiche de l’adhérent, avec les coordonnées des parents pour un mineur.`,
          `Pour les réinscriptions, c’est encore plus simple : l’adhérent de la saison passée retrouve ses informations déjà remplies. Il vérifie, il corrige ce qui a changé, il paie.`,
        ],
      },
      {
        id: 'suivi-des-dossiers',
        titre: `Un tableau qui montre où en est chaque dossier`,
        paragraphes: [
          `Dans le logiciel, les dossiers sont rangés en colonnes : commencé, pièces manquantes, en attente de paiement, complet, validé. Vous voyez d’un coup d’œil combien de familles bloquent, et sur quoi. Un clic ouvre le dossier, avec les pièces jointes à vérifier.`,
          `Les relances partent toutes seules à intervalles réguliers (dans la démo : trois jours, une semaine, puis deux semaines après le début du dossier), avec un message qui dit précisément ce qui manque. Si la famille complète entre-temps, la relance suivante ne part pas. Si rien ne bouge, une tâche apparaît dans « Ma journée » du secrétaire pour un appel.`,
          `Une fois le dossier validé, il rejoint la liste des licences à saisir dans ADOC. Le logiciel ne saisit pas la licence à votre place, mais il vous prépare la liste : voyez [l’import et l’export des fichiers ADOC](/clubs-de-tennis/fonctionnalites/import-export-adoc).`,
        ],
      },
      {
        id: 'pour-les-familles',
        titre: `Pour les familles : s’inscrire depuis le canapé, en quelques minutes`,
        paragraphes: [
          `Un parent qui inscrit deux enfants n’a pas envie de remplir deux formulaires. Le dossier familial regroupe tout le monde, applique les tarifs que le club a définis (une réduction pour le deuxième enfant, par exemple) et affiche le total avant le paiement, ligne par ligne.`,
          `Le formulaire fonctionne d’abord sur téléphone : gros boutons, champs lisibles, photo d’un document en un geste. Le parent peut s’arrêter et reprendre plus tard. Il retrouve ensuite son dossier dans son espace, avec ce qui est validé et ce qui reste à fournir.`,
        ],
      },
      {
        id: 'limites',
        titre: `Ce que l’adhésion en ligne ne fait pas`,
        paragraphes: [
          `Restons précis, pour que vous sachiez à quoi vous attendre.`,
        ],
        liste: [
          `Elle ne prend pas la licence : la licence fédérale se saisit toujours dans ADOC, l’outil officiel de la Fédération.`,
          `Elle ne juge pas la validité d’un certificat médical : elle vérifie qu’une pièce est déposée et à jour selon la date ; c’est le bureau qui la regarde.`,
          `Elle ne remplace pas l’accueil : certaines familles préféreront toujours venir au club. Le bureau peut créer le dossier pour elles dans le logiciel.`,
          `Avec le site seul, sans le logiciel, vous recevez les dossiers complets mais sans le tableau de suivi ni les relances automatiques.`,
        ],
      },
      {
        id: 'mise-en-place',
        titre: `Comment se passe la mise en place ?`,
        paragraphes: [
          `Avant l’ouverture des inscriptions, nous paramétrons avec vous les catégories et les tarifs de la saison, les pièces demandées selon l’âge, et le texte des messages de relance. Vos adhérents de la saison passée sont repris depuis une source (un export ADOC ou votre tableur), ce qui rend les réinscriptions pré-remplies dès la première année.`,
          `Pour préparer la campagne elle-même (dates, communication, relances), notre guide [organiser les réinscriptions en ligne](/clubs-de-tennis/guides/reinscriptions-en-ligne) détaille la méthode, étape par étape.`,
        ],
      },
    ],
    faq: [
      { q: `Les familles doivent-elles créer un compte ?`, a: `Oui, un compte simple avec une adresse e-mail. Il sert ensuite à suivre le dossier, à retrouver les plannings et à se réinscrire l’année suivante sans tout ressaisir.` },
      { q: `Peut-on encore accepter les chèques et les espèces ?`, a: `Oui. Le bureau enregistre le paiement reçu au club dans le dossier, qui passe alors à l’étape suivante comme pour un paiement en ligne.` },
      { q: `Quelles pièces peut-on demander ?`, a: `Celles que le club choisit : questionnaire de santé pour les mineurs, certificat médical, autorisation parentale, autorisation de droit à l’image. Les pièces demandées peuvent dépendre de l’âge.` },
      { q: `Les relances partent-elles même si le dossier est complet ?`, a: `Non. Avant chaque relance, le logiciel vérifie à nouveau le dossier ; s’il est complet, rien ne part.` },
      { q: `Peut-on inscrire un adulte et deux enfants dans le même dossier ?`, a: `Oui, c’est le principe du dossier familial : une seule saisie des coordonnées, un seul paiement, un total détaillé.` },
      { q: `Les données des familles sont-elles protégées ?`, a: `Elles ne servent qu’au club. Un contrat de traitement des données est inclus dans l’abonnement, et le club peut exporter toutes ses données à tout moment. Voyez notre guide sur le [RGPD pour un club de tennis](/clubs-de-tennis/guides/rgpd-club-de-tennis).` },
    ],
    liens: [
      { href: '/clubs-de-tennis/fonctionnalites/paiement-helloasso', nom: 'Paiement en ligne HelloAsso' },
      { href: '/clubs-de-tennis/fonctionnalites/import-export-adoc', nom: 'Import et export des fichiers ADOC' },
      { href: '/clubs-de-tennis/logiciel-de-gestion', nom: 'Le logiciel du bureau' },
      { href: '/clubs-de-tennis/guides/reinscriptions-en-ligne', nom: 'Guide : organiser les réinscriptions en ligne' },
      { href: '/clubs-de-tennis/tarifs', nom: 'Tarifs' },
    ],
    maj: '2026-10-29',
  },

  // ─────────────────────────────────────────────────────────────────────────────────────────── paiement HelloAsso
  {
    slug: 'paiement-helloasso',
    chemin: '/clubs-de-tennis/fonctionnalites/paiement-helloasso',
    famille: 'fonctionnalite',
    titre: `Encaisser les cotisations en ligne avec HelloAsso, l’argent directement sur le compte du club`,
    etiquette: `Fonctionnalité · Paiement HelloAsso`,
    reponse: `Les adhérents paient leur cotisation en ligne par HelloAsso, et l’argent arrive sur le compte du club, jamais chez nous. Le logiciel voit le paiement et met le dossier à jour tout seul : le trésorier n’a plus de pointage à faire. Le bouton de paiement est inclus dans la formule site, le suivi automatique dans le logiciel, et nous ne prenons aucun frais sur les paiements.`,
    titleSeo: `Paiement des cotisations du club de tennis avec HelloAsso`,
    descriptionSeo: `Cotisations payées en ligne avec HelloAsso, argent versé sur le compte du club, aucun frais chez nous, dossiers mis à jour automatiquement.`,
    motCle: 'paiement cotisation club de tennis HelloAsso',
    motsCles: [
      'HelloAsso club de tennis',
      'paiement en ligne cotisation association',
      'payer sa licence de tennis en ligne',
      'encaisser les adhésions en ligne',
      'paiement en ligne club sportif sans frais',
      'suivi des paiements trésorier club',
    ],
    capture: 'bureau-tresorerie',
    demo: [
      { libelle: `Voir les paiements en tant que trésorier`, url: DEMO.role('tresorier', '/bureau/tresorerie') },
      { libelle: `Payer une adhésion sur le site (paiement simulé)`, url: DEMO.page('/adherer') },
    ],
    tarif: {
      formule: 'pack',
      texte: `Le bouton de paiement HelloAsso est inclus dans la formule site, à partir de {{club:site:mini:mois}} € par mois ; le suivi automatique des paiements est inclus dans le logiciel, à partir de {{club:logiciel:mini:mois}} € par mois. Les deux ensemble : le pack, avec {{club:remise-pack}} % de remise. Aucun frais de notre part sur les paiements.`,
    },
    etapes: [
      { titre: `Le club ouvre son compte HelloAsso`, texte: `C’est le compte de l’association, à son nom, relié à son compte bancaire. Nous vous aidons à le relier à {{produit}} pendant la mise en place.` },
      { titre: `L’adhérent paie à la fin de son dossier`, texte: `Le montant calculé par le dossier est transmis au paiement. L’adhérent paie par carte sur la page de paiement sécurisée de HelloAsso.` },
      { titre: `Le paiement revient dans le logiciel`, texte: `Dès que HelloAsso confirme le paiement, le dossier passe à l’étape suivante et la ligne apparaît dans la trésorerie.` },
      { titre: `Le trésorier exporte`, texte: `En fin de mois ou de saison, il exporte la liste des paiements pour sa comptabilité, sans rien ressaisir.` },
    ],
    sections: [
      {
        id: 'ou-va-l-argent',
        titre: `Où va l’argent ? Sur le compte du club, sans intermédiaire de notre côté`,
        paragraphes: [
          `C’est la première question des trésoriers, et elle est légitime. La réponse est simple : nous ne touchons jamais l’argent du club. Le paiement passe par le compte HelloAsso de votre association, et HelloAsso verse les fonds sur le compte bancaire du club. {{produit}} ne fait que lire le résultat : « payé », « en attente », « échoué ».`,
          `Nous ne prélevons aucune commission et aucun frais sur les paiements de vos adhérents. Ce que vous payez chez nous, c’est l’abonnement et la mise en place, rien d’autre.`,
        ],
      },
      {
        id: 'pourquoi-helloasso',
        titre: `Pourquoi HelloAsso plutôt qu’un autre moyen de paiement ?`,
        paragraphes: [
          `HelloAsso est une solution de paiement pensée pour les associations. Pour le club, l’utilisation est gratuite : HelloAsso indique se financer par des contributions volontaires proposées aux personnes qui paient, contributions qu’elles peuvent modifier ou refuser. Nous vous invitons à lire leurs conditions à jour avant de vous lancer, car elles leur appartiennent.`,
          `Beaucoup de clubs connaissent déjà HelloAsso ou l’utilisent pour un tournoi ou une soirée. Le relier à {{produit}} permet de garder cet outil familier tout en supprimant le pointage à la main.`,
          `Si votre club tient à un autre prestataire de paiement, c’est possible sur devis (c’est une connexion à un autre logiciel), et les frais de ce prestataire sont alors à la charge du club.`,
        ],
      },
      {
        id: 'ce-que-ca-change-pour-le-tresorier',
        titre: `Ce que ça change pour le trésorier`,
        paragraphes: [
          `Sans paiement en ligne relié, le trésorier vit entre trois listes : les dossiers reçus, les chèques déposés et les virements sur le relevé. Il coche, il compare, il relance. Avec le suivi automatique, chaque paiement HelloAsso est rattaché à son dossier dès qu’il est confirmé.`,
        ],
        liste: [
          `**Une vue claire** des montants encaissés, en attente et en retard, par activité.`,
          `**Les paiements reçus au club** (chèque, espèces, coupons) s’enregistrent dans le même écran, pour que la trésorerie reste complète.`,
          `**Un paiement échoué** est signalé, et l’adhérent reçoit un message pour réessayer.`,
          `**Un export** pour le trésorier ou le cabinet comptable, à tout moment.`,
        ],
        sous: [
          {
            titre: `Une trésorerie simple, pas une comptabilité`,
            paragraphes: [
              `Le logiciel tient une trésorerie simple : ce qui entre, ce qui sort, par activité. Il ne remplace pas un logiciel de comptabilité ni l’expert-comptable si votre club en a un. Il leur fournit des données propres.`,
            ],
          },
        ],
      },
      {
        id: 'limites-et-demo',
        titre: `Les limites à connaître`,
        paragraphes: [
          `Le paiement en ligne ne fonctionne que si le club a son compte HelloAsso actif et validé : c’est une démarche que l’association fait elle-même, à son nom. Nous vous accompagnons pour relier ce compte, pas pour l’ouvrir à votre place.`,
          `Les remboursements se font depuis HelloAsso, selon leurs règles ; le logiciel enregistre ensuite le remboursement dans le dossier. Dans la démo en ligne, le paiement est simulé : aucune carte n’est débitée, et l’écran ne montre pas la vraie page HelloAsso.`,
          `Pour la méthode complète (paramétrer les tarifs, annoncer le paiement en ligne, gérer les paiements au club), voyez le guide [encaisser les cotisations avec HelloAsso](/clubs-de-tennis/guides/encaisser-cotisations-helloasso).`,
        ],
      },
    ],
    faq: [
      { q: `Prenez-vous une commission sur les cotisations ?`, a: `Non, aucune. L’argent va sur le compte du club par HelloAsso ; nous ne le voyons jamais passer.` },
      { q: `HelloAsso est-il vraiment gratuit pour le club ?`, a: `HelloAsso annonce un service gratuit pour les associations, financé par des contributions volontaires des payeurs. Vérifiez leurs conditions à jour sur leur site avant de vous engager.` },
      { q: `Faut-il déjà avoir un compte HelloAsso ?`, a: `Le club doit avoir le sien. S’il n’en a pas, il l’ouvre au nom de l’association ; nous le relions ensuite à {{produit}} pendant la mise en place.` },
      { q: `Peut-on payer en plusieurs fois ?`, a: `Cela dépend des possibilités offertes par HelloAsso au moment où vous paramétrez le paiement. Nous regardons avec vous ce qui est disponible.` },
      { q: `Et si un adhérent paie par chèque ?`, a: `Le bureau enregistre le chèque dans le dossier. La trésorerie reste complète, avec le moyen de paiement de chaque ligne.` },
      { q: `Peut-on utiliser un autre prestataire que HelloAsso ?`, a: `Oui, sur devis. Les frais de ce prestataire sont alors à la charge du club.` },
    ],
    liens: [
      { href: '/clubs-de-tennis/fonctionnalites/adhesions-en-ligne', nom: 'Adhésions et réinscriptions en ligne' },
      { href: '/clubs-de-tennis/fonctionnalites/statistiques', nom: 'Statistiques' },
      { href: '/clubs-de-tennis/logiciel-de-gestion', nom: 'Le logiciel du bureau' },
      { href: '/clubs-de-tennis/guides/encaisser-cotisations-helloasso', nom: 'Guide : encaisser les cotisations avec HelloAsso' },
      { href: '/clubs-de-tennis/tarifs', nom: 'Tarifs' },
    ],
    maj: '2026-10-29',
  },

  // ─────────────────────────────────────────────────────────────────────────────────────────── fichiers ADOC
  {
    slug: 'import-export-adoc',
    chemin: '/clubs-de-tennis/fonctionnalites/import-export-adoc',
    famille: 'fonctionnalite',
    titre: `Import et export des fichiers ADOC : vos adhérents à jour, vos licences contrôlées`,
    etiquette: `Fonctionnalité · Fichiers ADOC`,
    reponse: `{{produit}} lit le fichier que vous exportez d’ADOC pour créer ou mettre à jour les fiches de vos adhérents, et prépare un fichier au format attendu pour la saisie dans ADOC. Il compare aussi les adhérents qui ont payé avec les licenciés, pour repérer les licences manquantes. Il n’y a aucune connexion directe avec ADOC, qui reste l’outil officiel ; cette fonction est incluse dans le logiciel.`,
    titleSeo: `Import et export ADOC des adhérents du club de tennis`,
    descriptionSeo: `Lisez votre export ADOC pour mettre à jour vos adhérents, préparez la saisie des licences et repérez les licences manquantes. Sans connexion à ADOC.`,
    motCle: 'import export ADOC adhérents',
    motsCles: [
      'export ADOC adhérents',
      'importer fichier ADOC',
      'licences manquantes club de tennis',
      'fichier ADOC tableur',
      'contrôle des licences FFT club',
      'mettre à jour les adhérents depuis ADOC',
    ],
    capture: 'bureau-licences',
    demo: [
      { libelle: `Ouvrir les licences et les fichiers ADOC en tant que secrétaire`, url: DEMO.role('secretaire', '/bureau/licences') },
      { libelle: `Voir la fiche des adhérents en tant que présidente`, url: DEMO.role('presidente', '/bureau/adherents') },
    ],
    tarif: {
      formule: 'logiciel',
      texte: `Inclus dans le logiciel, à partir de {{club:logiciel:mini:mois}} € par mois et {{club:logiciel:mini:mise}} € de mise en place pour un club de la catégorie Mini. L’import initial des membres depuis une source (export ADOC ou tableur) est compris ; une source supplémentaire est une option à {{club:option:import-source:mise}} €.`,
    },
    etapes: [
      { titre: `Vous exportez depuis ADOC`, texte: `Comme aujourd’hui, vous téléchargez depuis ADOC le fichier de vos licenciés, au format tableur.` },
      { titre: `Vous le déposez dans {{produit}}`, texte: `Le logiciel reconnaît les colonnes, vous montre ce qu’il va créer ou mettre à jour, et signale les doublons et les erreurs avant d’enregistrer quoi que ce soit.` },
      { titre: `Vous contrôlez les licences`, texte: `Il compare les adhérents qui ont payé et les licenciés du fichier, et vous donne la liste des licences manquantes.` },
      { titre: `Vous préparez la saisie dans ADOC`, texte: `Il produit un fichier au format attendu avec les adhérents à licencier. La saisie dans ADOC, c’est vous qui la faites, dans ADOC.` },
    ],
    sections: [
      {
        id: 'ce-que-fait-la-fonction',
        titre: `Que fait exactement l’import et l’export des fichiers ADOC ?`,
        paragraphes: [
          `ADOC est l’outil de la Fédération française de tennis pour l’administratif des clubs : les licences, les affiliations, les données fédérales. {{produit}} ne le remplace pas et ne cherche pas à le faire. Il travaille à côté, avec les fichiers qu’ADOC sait produire. Trois choses précises :`,
        ],
        liste: [
          `**Lire un export ADOC** pour créer les fiches des nouveaux adhérents et mettre à jour celles qui existent (coordonnées, numéro de licence, classement).`,
          `**Produire un fichier au format attendu pour la saisie dans ADOC**, avec les adhérents validés au club qui n’ont pas encore de licence, pour que la personne qui saisit ait tout sous les yeux.`,
          `**Contrôler les licences manquantes** en comparant les adhérents qui ont payé au club et les licenciés présents dans le dernier export.`,
        ],
      },
      {
        id: 'ce-que-la-fonction-ne-fait-pas',
        titre: `Ce que nous ne faisons pas, et pourquoi nous le disons clairement`,
        paragraphes: [
          `Il n’y a **aucune connexion directe** entre {{produit}} et ADOC. Le logiciel ne se connecte pas à votre compte ADOC, ne lit pas ADOC en direct et n’y écrit rien. Il n’y a **aucune saisie automatique dans ADOC** : la prise de licence se fait toujours dans ADOC, par une personne du bureau habilitée.`,
          `**ADOC reste l’outil officiel.** En cas d’écart entre les deux, c’est ADOC qui fait foi pour tout ce qui est fédéral. {{produit}} n’est ni affilié ni approuvé par la Fédération française de tennis.`,
          `Nous préférons le dire ainsi plutôt que de laisser croire à une « synchronisation ». Le gain est réel, mais il vient de la suppression des recopies et des oublis, pas d’un branchement qui n’existe pas.`,
        ],
      },
      {
        id: 'import-pas-a-pas',
        titre: `Un import qui vous montre tout avant d’enregistrer`,
        paragraphes: [
          `Un fichier exporté peut contenir des accents mal encodés, des colonnes dans un ordre différent d’une saison à l’autre, ou une même personne présente deux fois. Le logiciel s’en charge avant que ça n’arrive dans vos fiches.`,
        ],
        liste: [
          `Il propose la correspondance des colonnes (nom, prénom, date de naissance, licence…) ; vous la vérifiez.`,
          `Il répare les caractères mal encodés que produisent souvent les tableurs.`,
          `Il repère les doublons dans le fichier et avec vos adhérents existants, par le numéro de licence ou par le nom et la date de naissance.`,
          `Il affiche un aperçu : fiches à créer, fiches à mettre à jour, lignes en erreur. Rien n’est enregistré sans votre accord.`,
        ],
        sous: [
          {
            titre: `Un import, ou plusieurs dans la saison`,
            paragraphes: [
              `Vous pouvez relancer l’import à chaque nouvel export, par exemple après une vague de prises de licence. Les fiches existantes sont mises à jour, sans créer de doublon.`,
            ],
          },
        ],
      },
      {
        id: 'controle-des-licences',
        titre: `Le contrôle des licences manquantes : la liste que tout secrétaire voudrait`,
        paragraphes: [
          `En octobre, la question revient dans tous les bureaux : « Tout le monde a-t-il sa licence ? ». Le contrôle compare deux listes que vous avez déjà : ceux qui ont payé leur adhésion au club, et ceux qui apparaissent comme licenciés dans votre dernier export ADOC.`,
          `Le résultat tient en quelques listes courtes : les adhérents payés sans licence, les licences arrivées à échéance, les licenciés qui n’ont pas de dossier au club. Il signale aussi un joueur convoqué en équipe dont la licence n’apparaît pas, avant la rencontre plutôt qu’après. Le contrôle vaut à la date de votre dernier export : pour une vue fraîche, exportez à nouveau.`,
        ],
      },
      {
        id: 'mise-en-place-adoc',
        titre: `Mise en place et questions pratiques`,
        paragraphes: [
          `À la mise en place, nous importons vos membres depuis une source au choix : un export ADOC ou votre tableur actuel. Si vous avez une deuxième source à reprendre (un ancien fichier, l’historique d’une autre saison), c’est l’option d’import supplémentaire.`,
          `Pour la marche à suivre côté ADOC (quel fichier exporter, à quel moment de la saison), lisez notre guide [exporter et importer ses adhérents depuis ADOC](/clubs-de-tennis/guides/exporter-importer-adherents-adoc). Pour les fiches joueurs et les tournois fédéraux, {{produit}} propose des liens vers Ten’Up, sans autre lien technique.`,
        ],
      },
    ],
    faq: [
      { q: `{{produit}} est-il connecté à ADOC ?`, a: `Non. Il n’existe aucune connexion directe. Le logiciel lit les fichiers que vous exportez d’ADOC et prépare un fichier pour la saisie ; il ne se connecte jamais à ADOC.` },
      { q: `Le logiciel peut-il prendre les licences à ma place ?`, a: `Non. La prise de licence se fait dans ADOC, par une personne habilitée du club. {{produit}} vous prépare la liste et les informations pour aller plus vite.` },
      { q: `Quel fichier faut-il exporter d’ADOC ?`, a: `L’export de vos licenciés au format tableur. Notre guide sur l’export et l’import des adhérents détaille où le trouver et à quel moment le faire.` },
      { q: `Que se passe-t-il si une personne est en double ?`, a: `L’aperçu de l’import la signale avant tout enregistrement. Vous choisissez de fusionner, de mettre à jour ou d’ignorer la ligne.` },
      { q: `En cas de désaccord entre {{produit}} et ADOC, qui a raison ?`, a: `ADOC, pour tout ce qui est fédéral. C’est l’outil officiel ; {{produit}} gère la vie du club.` },
      { q: `Peut-on importer un tableur qui ne vient pas d’ADOC ?`, a: `Oui. L’import initial accepte un export ADOC ou votre tableur ; la correspondance des colonnes s’adapte au fichier.` },
    ],
    liens: [
      { href: '/clubs-de-tennis/fonctionnalites/adhesions-en-ligne', nom: 'Adhésions et réinscriptions en ligne' },
      { href: '/clubs-de-tennis/fonctionnalites/equipes-et-competitions', nom: 'Équipes et compétitions' },
      { href: '/clubs-de-tennis/logiciel-de-gestion', nom: 'Le logiciel du bureau' },
      { href: '/clubs-de-tennis/guides/exporter-importer-adherents-adoc', nom: 'Guide : exporter et importer ses adhérents depuis ADOC' },
      { href: '/clubs-de-tennis/tarifs', nom: 'Tarifs' },
      { href: '/clubs-de-tennis/simulateur', nom: 'Simulateur de prix' },
    ],
    maj: '2026-10-29',
  },

  // ─────────────────────────────────────────────────────────────────────────────────────────── école de tennis
  {
    slug: 'ecole-de-tennis',
    chemin: '/clubs-de-tennis/fonctionnalites/ecole-de-tennis',
    famille: 'fonctionnalite',
    titre: `Gérer l’école de tennis : groupes, appel sur téléphone et progression des enfants`,
    etiquette: `Fonctionnalité · École de tennis`,
    reponse: `Les groupes, le calendrier des séances, l’appel fait sur le téléphone de l’enseignant, les annulations prévenues aux familles et la progression Galaxie Tennis de chaque enfant : tout est au même endroit. Les parents voient le planning de leurs enfants et signalent une absence en un geste. L’école de tennis est incluse dans le logiciel.`,
    titleSeo: `Logiciel de gestion d’école de tennis : groupes et appel`,
    descriptionSeo: `Groupes, calendrier, appel sur téléphone, annulations prévenues aux familles, progression Galaxie Tennis : l’école de tennis du club au même endroit.`,
    motCle: 'logiciel gestion école de tennis',
    motsCles: [
      'gestion école de tennis',
      'appel école de tennis sur téléphone',
      'suivi progression Galaxie Tennis',
      'planning cours de tennis enfants',
      'prévenir les parents annulation cours tennis',
      'groupes école de tennis logiciel',
      'stages de tennis inscription',
    ],
    capture: 'bureau-ecole',
    demo: [
      { libelle: `Faire l’appel en tant qu’enseignant`, url: DEMO.role('enseignant', '/bureau/ecole/appel') },
      { libelle: `Suivre la progression Galaxie Tennis`, url: DEMO.role('enseignant', '/bureau/ecole/progression') },
      { libelle: `Voir le planning des enfants en tant que parent`, url: DEMO.role('parent', '/espace/enfants') },
    ],
    tarif: {
      formule: 'logiciel',
      texte: `Incluse dans le logiciel, à partir de {{club:logiciel:mini:mois}} € par mois et {{club:logiciel:mini:mise}} € de mise en place pour un club de la catégorie Mini. Les comptes enseignants sont illimités.`,
    },
    etapes: [
      { titre: `Vous créez les groupes`, texte: `Jour, horaire, court, enseignant, niveau et nombre de places. Le logiciel signale un groupe trop chargé pour le nombre de courts.` },
      { titre: `Le calendrier se construit`, texte: `Les séances de la saison sont générées en sautant les vacances scolaires de votre zone, les jours fériés et les fermetures du club.` },
      { titre: `L’enseignant fait l’appel sur son téléphone`, texte: `Présent, absent, en retard : un geste par enfant, au bord du court. Les absences signalées par les parents sont déjà cochées.` },
      { titre: `La progression se suit dans le temps`, texte: `L’enseignant note les compétences de la grille Galaxie Tennis ; le logiciel propose un passage au niveau suivant, qu’il valide ou non.` },
    ],
    sections: [
      {
        id: 'pour-le-bureau',
        titre: `Une école de tennis qui tient sans tableur ni groupe de messagerie débordé`,
        paragraphes: [
          `L’école de tennis est souvent la plus grosse activité du club, et la plus lourde à suivre : des dizaines d’enfants, plusieurs groupes par soir, des enseignants à temps partiel, des parents qui veulent savoir si le cours est maintenu quand il pleut. Tout cela vit généralement dans un tableur, un cahier et des messages éparpillés.`,
          `Dans {{produit}}, chaque enfant a sa fiche, rattachée à sa famille et à son dossier d’adhésion. Chaque groupe a son calendrier, son enseignant et sa liste. Le bureau voit en un écran les groupes complets, ceux qui ont encore de la place et ceux qui ont une liste d’attente, avec une proposition de place à faire quand un enfant part.`,
        ],
      },
      {
        id: 'appel-et-assiduite',
        titre: `L’appel sur téléphone, et l’assiduité qui se calcule toute seule`,
        paragraphes: [
          `L’enseignant ouvre la séance du jour sur son téléphone et pointe chaque enfant. Pas de feuille à rendre, pas de ressaisie. Une séance non pointée reste « non renseignée » : le logiciel ne la compte ni comme une présence ni comme une absence.`,
          `L’assiduité de chaque enfant et de chaque groupe se calcule à partir de ces appels. Un enfant absent plusieurs semaines de suite est signalé au bureau : c’est souvent le signe d’un départ qui se prépare, et un appel aux parents peut le prévenir.`,
        ],
      },
      {
        id: 'annulations-et-reports',
        titre: `Pluie, absence d’un enseignant : annuler ou reporter sans passer la soirée au téléphone`,
        paragraphes: [
          `Quand une séance extérieure est menacée, le bureau ou l’enseignant l’annule ou la reporte en quelques clics. Les familles concernées sont prévenues par e-mail et par notification sur le téléphone, avec le motif et, si c’est un report, la nouvelle date.`,
          `Le logiciel aide à choisir le report : il propose un créneau qui ne tombe pas pendant les vacances et ne crée pas de conflit avec un autre groupe du même enseignant. Il ne décide pas à votre place.`,
          `Une précision honnête : l’offre ne comprend pas l’envoi de SMS. La démo en ligne en simule, mais les clubs clients reçoivent l’e-mail et la notification ; vous gardez vos groupes de messagerie habituels si vous le souhaitez.`,
        ],
      },
      {
        id: 'galaxie-tennis',
        titre: `La progression Galaxie Tennis, partagée avec les parents`,
        paragraphes: [
          `Pour les plus jeunes, la grille Galaxie Tennis (blanc, violet, rouge, orange, vert) structure déjà la pédagogie de nombreux clubs. Le logiciel la reprend : pour chaque niveau, la liste des compétences, la balle et le terrain. L’enseignant note les compétences acquises au fil des séances.`,
          `Quand l’essentiel d’un niveau est acquis, le logiciel propose le passage au niveau suivant. C’est une proposition : l’enseignant reste seul juge. Les parents voient dans leur espace où en est leur enfant, ce qui nourrit le dialogue plutôt que les questions de fin de séance.`,
        ],
        sous: [
          {
            titre: `Et les stages ?`,
            paragraphes: [
              `Les stages de vacances se créent comme des groupes courts, avec inscription en ligne. Les familles déjà adhérentes s’inscrivent depuis leur espace.`,
            ],
          },
        ],
      },
      {
        id: 'limites-ecole',
        titre: `Ce que ce module ne fait pas`,
        paragraphes: [
          `Il ne gère pas la paie ni les contrats des enseignants : ce n’est pas un logiciel de ressources humaines. Il ne remplace pas le diplôme ni le regard de l’enseignant sur la progression. Et il ne saisit rien dans les outils fédéraux.`,
          `Pour organiser l’école de tennis elle-même (groupes, tarifs, communication avec les parents), notre guide [gérer une école de tennis](/clubs-de-tennis/guides/gerer-une-ecole-de-tennis) donne une méthode, avec ou sans logiciel.`,
        ],
      },
    ],
    faq: [
      { q: `Les enseignants doivent-ils payer un compte ?`, a: `Non. Les comptes bureau et enseignants sont illimités et compris dans l’abonnement.` },
      { q: `Que se passe-t-il quand un groupe est complet ?`, a: `Les nouvelles demandes passent en liste d’attente. Quand une place se libère, le logiciel vous indique à qui la proposer en premier.` },
      { q: `Les vacances scolaires sont-elles prises en compte ?`, a: `Oui. Le calendrier des séances saute les vacances de votre zone, les jours fériés et les fermetures que vous déclarez.` },
      { q: `Les parents voient-ils les notes de leur enfant ?`, a: `Ils voient sa progression dans la grille Galaxie Tennis, telle que l’enseignant l’a notée. Les remarques internes du bureau restent internes.` },
      { q: `Peut-on gérer les cours adultes de la même façon ?`, a: `Oui. Un groupe adulte se crée comme un groupe enfant ; la grille Galaxie Tennis ne s’applique simplement pas.` },
      { q: `Un parent peut-il signaler une absence ?`, a: `Oui, en un geste depuis son espace. L’enseignant la voit déjà cochée au moment de l’appel.` },
    ],
    liens: [
      { href: '/clubs-de-tennis/fonctionnalites/espace-membre-et-parent', nom: 'Espace membre et parent' },
      { href: '/clubs-de-tennis/fonctionnalites/communication', nom: 'Communication' },
      { href: '/clubs-de-tennis/logiciel-de-gestion', nom: 'Le logiciel du bureau' },
      { href: '/clubs-de-tennis/guides/gerer-une-ecole-de-tennis', nom: 'Guide : gérer une école de tennis' },
      { href: '/clubs-de-tennis/tarifs', nom: 'Tarifs' },
    ],
    maj: '2026-10-29',
  },

  // ─────────────────────────────────────────────────────────────────────────────────────────── Challenge interne
  {
    slug: 'challenge-interne',
    chemin: '/clubs-de-tennis/fonctionnalites/challenge-interne',
    famille: 'fonctionnalite',
    titre: `Un Challenge interne qui fait jouer vos adhérents toute la saison`,
    etiquette: `Fonctionnalité · Challenge interne`,
    reponse: `Les joueurs saisissent leurs matchs sur le téléphone au format FFT, l’adversaire confirme, le bureau valide, et le classement se met à jour tout seul. Badges, palmarès de fin de saison et Hall of Fame donnent envie de revenir sur le court. Le Challenge interne est inclus dans le logiciel.`,
    titleSeo: `Challenge interne tennis : classement et saisie des matchs`,
    descriptionSeo: `Challenge interne pour club de tennis : saisie des matchs au format FFT, confirmation par l’adversaire, classement automatique, badges et Hall of Fame.`,
    motCle: 'challenge interne tennis classement',
    motsCles: [
      'challenge interne club de tennis',
      'classement interne tennis',
      'saisie des matchs tennis en ligne',
      'tableau à palettes tennis',
      'animation club de tennis adultes',
      'ladder tennis club',
    ],
    capture: 'site-challenge',
    demo: [
      { libelle: `Voir le tableau du Challenge sur le site`, url: DEMO.page('/challenge') },
      { libelle: `Saisir un match en tant que membre`, url: DEMO.role('membre', '/espace/jeu') },
      { libelle: `Valider les matchs en tant qu’enseignant`, url: DEMO.role('enseignant', '/bureau/challenge/validation') },
    ],
    tarif: {
      formule: 'logiciel',
      texte: `Inclus dans le logiciel, à partir de {{club:logiciel:mini:mois}} € par mois pour un club de la catégorie Mini. Avec le pack, le tableau s’affiche aussi sur le site du club. L’affichage en direct sur la télévision du club-house est une option à {{club:option:ecran-club-house:mise}} € de mise en place.`,
    },
    etapes: [
      { titre: `Le bureau fixe les règles`, texte: `Points d’une victoire, bonus contre un joueur mieux classé, nombre de matchs comptés entre deux mêmes joueurs dans le mois : le barème est le vôtre.` },
      { titre: `Les joueurs saisissent leurs matchs`, texte: `Depuis l’espace membre, au format de match FFT choisi. Le score est vérifié : un set impossible est refusé.` },
      { titre: `L’adversaire confirme`, texte: `Il reçoit une notification et confirme, ou conteste. Un match contesté va au bureau, qui tranche.` },
      { titre: `Le bureau valide, le classement bouge`, texte: `Le détail des points est affiché avant validation. Une fois validé, le classement et les badges se mettent à jour.` },
    ],
    sections: [
      {
        id: 'pourquoi-un-challenge',
        titre: `Pourquoi un Challenge interne change la vie d’un club`,
        paragraphes: [
          `Un adhérent adulte qui ne joue pas en équipe et ne fait pas de tournoi finit souvent par ne plus venir. Le Challenge interne lui donne une raison de réserver un court cette semaine : un adversaire à défier, des points à prendre, une place à gagner. C’est l’une des animations les plus simples pour faire vivre les courts entre deux saisons d’équipes.`,
          `Beaucoup de clubs ont essayé avec un tableau en liège et des palettes au club-house. Ça marche tant qu’une personne s’en occupe. {{produit}} garde l’esprit du tableau à palettes, mais la tenue du classement ne repose plus sur quelqu’un.`,
        ],
      },
      {
        id: 'saisie-format-fft',
        titre: `Une saisie des matchs au format FFT, vérifiée avant d’arriver au bureau`,
        paragraphes: [
          `Le joueur choisit le format joué (deux sets gagnants, super jeu décisif, sets courts…) parmi les formats de match de la Fédération, puis saisit le score. Le logiciel vérifie qu’il est possible : un 7/3 dans un set à six jeux ne passe pas.`,
          `Le match est ensuite envoyé à l’adversaire pour confirmation. Cette double vérification règle l’essentiel des litiges avant qu’ils n’existent. Le bureau voit la liste des matchs à valider, avec le détail des points de chaque joueur : « victoire, bonus contre un joueur mieux classé ». Il valide en un clic, ou arbitre un match contesté.`,
        ],
      },
      {
        id: 'classement-badges-hall-of-fame',
        titre: `Classement, badges et Hall of Fame : de quoi donner envie`,
        paragraphes: [
          `Le classement se recalcule après chaque match validé. Les badges récompensent des choses que tout le monde comprend : le premier match, une série de victoires, un exploit contre mieux classé, la régularité sur la saison. Certains sont automatiques, d’autres sont remis par le bureau.`,
          `En fin de saison, le Challenge se clôture : le palmarès est figé, les vainqueurs entrent au Hall of Fame du club, et une nouvelle saison repart. Les anciens palmarès restent consultables.`,
        ],
        liste: [
          `Dans l’espace membre : mon classement, mes matchs, mes badges.`,
          `Sur le site, si vous avez le pack : le tableau public, mis à jour en direct.`,
          `Au club-house, en option : le classement sur la télévision.`,
        ],
      },
      {
        id: 'ce-que-le-challenge-n-est-pas',
        titre: `Ce que le Challenge interne n’est pas`,
        paragraphes: [
          `Le Challenge interne est une animation du club. Il ne compte pas pour le classement fédéral et ne remplace pas la saisie des résultats officiels. Les matchs de tournois homologués et de championnats par équipes se déclarent dans les outils de la Fédération, comme aujourd’hui.`,
          `Le logiciel peut s’appuyer sur le classement fédéral de chaque joueur pour calculer les bonus. Ce classement vient de vos fichiers ADOC ou d’une saisie au club ; il n’est pas lu en direct auprès de la Fédération.`,
        ],
      },
      {
        id: 'lancer-son-challenge',
        titre: `Comment lancer le Challenge dans votre club ?`,
        paragraphes: [
          `Le plus dur n’est pas l’outil, c’est l’annonce : qui peut jouer, pendant quelle période, avec quel barème, et ce que gagnent les meilleurs. Nous paramétrons avec vous un premier barème simple, que vous pourrez ajuster en cours de saison si besoin.`,
          `Notre guide [créer un challenge interne](/clubs-de-tennis/guides/creer-un-challenge-interne) détaille les règles qui fonctionnent bien et les pièges à éviter (comme les deux mêmes joueurs qui se rencontrent tous les jours pour prendre des points).`,
        ],
      },
    ],
    faq: [
      { q: `Les joueurs doivent-ils installer une application ?`, a: `Non. Ils saisissent leurs matchs depuis l’espace membre, dans le navigateur du téléphone. Ils peuvent l’installer sur l’écran d’accueil s’ils le souhaitent, sans passer par un magasin d’applications.` },
      { q: `Peut-on organiser un Challenge en double ?`, a: `Oui, la saisie accepte les matchs en double. Le bureau choisit comment compter les points des paires dans le barème.` },
      { q: `Comment éviter les matchs arrangés ?`, a: `L’adversaire doit confirmer chaque match, le bureau valide, et le barème peut limiter le nombre de matchs comptés entre deux mêmes joueurs dans le mois.` },
      { q: `Le Challenge compte-t-il pour le classement FFT ?`, a: `Non. C’est une animation interne au club. Les résultats officiels se déclarent dans les outils de la Fédération.` },
      { q: `Faut-il un responsable du Challenge au bureau ?`, a: `Il faut une personne qui valide les matchs et tranche les rares contestations. Le reste (classement, badges, palmarès) se fait tout seul.` },
      { q: `Qui peut valider les matchs ?`, a: `Les personnes du bureau à qui vous donnez ce droit : souvent un enseignant ou le responsable sportif.` },
    ],
    liens: [
      { href: '/clubs-de-tennis/fonctionnalites/tournois-internes', nom: 'Tournois internes' },
      { href: '/clubs-de-tennis/fonctionnalites/espace-membre-et-parent', nom: 'Espace membre et parent' },
      { href: '/clubs-de-tennis/logiciel-de-gestion', nom: 'Le logiciel du bureau' },
      { href: '/clubs-de-tennis/guides/creer-un-challenge-interne', nom: 'Guide : créer un challenge interne' },
      { href: '/clubs-de-tennis/simulateur', nom: 'Simulateur de prix' },
    ],
    maj: '2026-10-29',
  },

  // ─────────────────────────────────────────────────────────────────────────────────────────── équipes
  {
    slug: 'equipes-et-competitions',
    chemin: '/clubs-de-tennis/fonctionnalites/equipes-et-competitions',
    famille: 'fonctionnalite',
    titre: `Équipes et compétitions : disponibilités, compositions et convocations sans relances à la main`,
    etiquette: `Fonctionnalité · Équipes et compétitions`,
    reponse: `Le capitaine demande les disponibilités en un message, voit qui répond, compose son équipe avec une aide qui respecte l’ordre des classements, puis envoie la convocation avec l’heure de rendez-vous et le covoiturage. Les joueurs répondent depuis leur téléphone. Les équipes et compétitions sont incluses dans le logiciel.`,
    titleSeo: `Équipes de tennis : disponibilités et convocations`,
    descriptionSeo: `Disponibilités, compositions, convocations et covoiturage des équipes du club de tennis, depuis le téléphone du capitaine. Inclus dans le logiciel.`,
    motCle: 'gestion équipes tennis convocations',
    motsCles: [
      'convocation équipe de tennis',
      'disponibilités joueurs championnat tennis',
      'composition équipe tennis ordre des classements',
      'covoiturage match de tennis',
      'capitaine équipe tennis outil',
      'championnat par équipes tennis organisation',
    ],
    capture: 'bureau-equipes',
    demo: [
      { libelle: `Préparer une rencontre en tant que capitaine`, url: DEMO.role('capitaine', '/bureau/equipes') },
      { libelle: `Voir les équipes et les résultats sur le site`, url: DEMO.page('/competitions') },
      { libelle: `Répondre à une convocation en tant que membre`, url: DEMO.role('membre', '/espace/planning') },
    ],
    tarif: {
      formule: 'logiciel',
      texte: `Incluses dans le logiciel, à partir de {{club:logiciel:mini:mois}} € par mois et {{club:logiciel:mini:mise}} € de mise en place pour un club de la catégorie Mini. Avec le pack, les équipes et les résultats s’affichent aussi sur le site du club.`,
    },
    etapes: [
      { titre: `Vous créez les équipes et le calendrier`, texte: `Les équipes engagées, leurs joueurs et leurs rencontres de la saison, à domicile ou à l’extérieur.` },
      { titre: `Les disponibilités sont demandées`, texte: `Quelques jours avant la rencontre, chaque joueur reçoit la question et répond « oui », « non » ou « peut-être » depuis son téléphone.` },
      { titre: `Le capitaine compose`, texte: `Le logiciel propose une composition parmi les disponibles, dans l’ordre des classements ; le capitaine ajuste et confirme.` },
      { titre: `La convocation part`, texte: `Heure et lieu de rendez-vous, adversaire, adresse, covoiturage : chaque joueur reçoit sa convocation par e-mail et notification.` },
      { titre: `Le résultat est publié`, texte: `Après la rencontre, le score est enregistré et peut devenir une actualité du club.` },
    ],
    sections: [
      {
        id: 'le-casse-tete-du-capitaine',
        titre: `Le casse-tête du capitaine, résolu sur son téléphone`,
        paragraphes: [
          `Être capitaine d’une équipe de club, c’est souvent passer la semaine à relancer : « Tu es là dimanche ? », « Tu peux conduire ? », « Qui a la clé du local ? ». Les réponses arrivent par trois canaux différents, certains ne répondent jamais, et la composition se fait la veille au soir.`,
          `Avec {{produit}}, le capitaine pose la question une fois, et voit le tableau des réponses se remplir. Il sait tout de suite s’il a assez de joueurs, et qui relancer. Si la composition n’est pas faite quelques jours avant la rencontre, il reçoit un rappel dans « Ma journée ».`,
        ],
      },
      {
        id: 'composition-et-ordre',
        titre: `Une aide à la composition qui respecte l’ordre des classements`,
        paragraphes: [
          `Les règlements de championnat imposent un ordre : un joueur ne peut pas jouer au-dessus d’un coéquipier mieux classé. Le logiciel propose une composition parmi les joueurs disponibles, dans cet ordre, et signale les joueurs « peut-être » pour que le capitaine décide.`,
          `S’il modifie l’ordre à la main, le logiciel l’avertit en cas d’incohérence. C’est une aide, pas un arbitre : le règlement de chaque épreuve fait foi, et le capitaine reste responsable de sa feuille de match. Si une licence manque pour un joueur aligné, le contrôle des licences le signale avant la rencontre.`,
        ],
      },
      {
        id: 'convocation-et-covoiturage',
        titre: `Convocations et covoiturage : chacun sait où et quand`,
        paragraphes: [
          `La convocation reprend tout ce qu’un joueur doit savoir : le jour, l’heure de rendez-vous, le lieu, l’adversaire, l’adresse du club adverse. Pour les déplacements, le capitaine indique qui conduit et combien de places il a ; le logiciel répartit les passagers de façon équilibrée, et chacun voit avec qui il part.`,
        ],
        liste: [
          `Envoi par e-mail et par notification sur le téléphone (pas de SMS dans l’offre).`,
          `La rencontre apparaît dans le planning de chaque joueur, avec un ajout possible à son agenda personnel.`,
          `Pour une équipe de jeunes, ce sont les parents qui reçoivent la convocation et répondent.`,
        ],
      },
      {
        id: 'resultats-et-site',
        titre: `Résultats, classements de poule et site du club`,
        paragraphes: [
          `Après la rencontre, le capitaine enregistre les scores. Le classement de la poule se recalcule avec le barème de points de l’épreuve, que vous pouvez régler (il varie selon les compétitions, vérifiez-le dans le règlement de la vôtre).`,
          `Avec le pack, la page « Équipes et compétitions » du site se met à jour : les équipes, les prochaines rencontres, les derniers résultats. Une victoire du week-end peut devenir une actualité en un clic.`,
        ],
      },
      {
        id: 'limites-equipes',
        titre: `Ce que ce module ne remplace pas`,
        paragraphes: [
          `Les inscriptions des équipes en championnat, les feuilles de match officielles et la saisie des résultats fédéraux restent dans les outils de la Fédération. {{produit}} organise la vie de l’équipe autour : qui joue, qui conduit, qui est prévenu. Pour les fiches des joueurs et des épreuves, il propose des liens vers Ten’Up.`,
          `Pour une méthode pas à pas (quand demander, comment relancer, que mettre dans une convocation), lisez notre guide [convoquer ses équipes](/clubs-de-tennis/guides/convoquer-ses-equipes).`,
        ],
      },
    ],
    faq: [
      { q: `Le capitaine a-t-il besoin d’un ordinateur ?`, a: `Non. Tout se fait depuis le téléphone : disponibilités, composition, convocation, résultat.` },
      { q: `Les joueurs doivent-ils avoir un compte ?`, a: `Oui, celui de leur espace membre, qu’ils ont avec leur adhésion. Ils répondent en un geste à la demande de disponibilité.` },
      { q: `Le logiciel connaît-il le règlement de mon championnat ?`, a: `Il applique la règle générale de l’ordre des classements et un barème de points que vous réglez. Le règlement de chaque épreuve fait foi : vérifiez-le.` },
      { q: `Les résultats sont-ils envoyés à la Fédération ?`, a: `Non. La saisie officielle des résultats reste dans les outils fédéraux. {{produit}} garde les résultats pour le club et son site.` },
      { q: `Peut-on gérer les équipes de jeunes ?`, a: `Oui. Pour un mineur, les demandes et les convocations vont aux parents, qui répondent pour leur enfant.` },
      { q: `Combien de capitaines peut-on avoir ?`, a: `Autant que d’équipes. Les comptes bureau sont illimités, et chaque capitaine ne voit que ce dont il a besoin.` },
    ],
    liens: [
      { href: '/clubs-de-tennis/fonctionnalites/communication', nom: 'Communication' },
      { href: '/clubs-de-tennis/fonctionnalites/import-export-adoc', nom: 'Import et export des fichiers ADOC' },
      { href: '/clubs-de-tennis/fonctionnalites/tournois-internes', nom: 'Tournois internes' },
      { href: '/clubs-de-tennis/logiciel-de-gestion', nom: 'Le logiciel du bureau' },
      { href: '/clubs-de-tennis/guides/convoquer-ses-equipes', nom: 'Guide : convoquer ses équipes' },
      { href: '/clubs-de-tennis/tarifs', nom: 'Tarifs' },
    ],
    maj: '2026-10-29',
  },
]
