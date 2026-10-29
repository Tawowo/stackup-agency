/**
 * PAGES « FONCTIONNALITÉ » DE L'OFFRE CLUBS DE TENNIS (2/2) — tournois internes, espace membre et parent,
 * communication, Ma journée et automatisations, assistant IA, réservation de courts, statistiques.
 * Montants : jetons {{club:…}} uniquement.
 */
import type { PageClub } from '../types'
import { DEMO } from '@/config/offre-clubs'

export const FONCTIONNALITES_2: PageClub[] = [
  // ─────────────────────────────────────────────────────────────────────────────────────────── tournois internes
  {
    slug: 'tournois-internes',
    chemin: '/clubs-de-tennis/fonctionnalites/tournois-internes',
    famille: 'fonctionnalite',
    titre: `Organiser un tournoi interne de tennis : inscriptions, tableaux et programmation au même endroit`,
    etiquette: `Fonctionnalité · Tournois internes`,
    reponse: `Les joueurs s’inscrivent en ligne, le logiciel tire le tableau ou les poules, propose une programmation sur vos courts et met les résultats à jour au fil du tournoi. Les mêmes outils servent aux événements du club, de la soirée de fin de saison à la journée portes ouvertes. Les tournois internes et les événements sont inclus dans le logiciel.`,
    titleSeo: `Organiser un tournoi interne de tennis : tableaux et poules`,
    descriptionSeo: `Tournoi interne de tennis : inscriptions en ligne, tableau, poules ou tournoi multi-chances, programmation des matchs, résultats. Inclus dans le logiciel.`,
    motCle: 'organiser un tournoi interne de tennis',
    motsCles: [
      'tournoi interne club de tennis',
      'tableau tournoi tennis automatique',
      'tournoi multi-chances TMC',
      'poules tournoi tennis',
      'programmation des matchs tournoi',
      'inscription tournoi interne en ligne',
      'tournoi de double club de tennis',
    ],
    capture: 'bureau-tournois',
    demo: [
      { libelle: `Gérer un tournoi en tant qu’enseignant`, url: DEMO.role('enseignant', '/bureau/tournois') },
      { libelle: `Voir les tournois sur le site du club`, url: DEMO.page('/tournois') },
      { libelle: `S’inscrire à un tournoi en tant que membre`, url: DEMO.role('membre', '/espace/tournois') },
    ],
    tarif: {
      formule: 'logiciel',
      texte: `Inclus dans le logiciel, à partir de {{club:logiciel:mini:mois}} € par mois et {{club:logiciel:mini:mise}} € de mise en place pour un club de la catégorie Mini. Avec le pack, les tournois et leurs résultats s’affichent aussi sur le site.`,
    },
    etapes: [
      { titre: `Vous créez le tournoi`, texte: `Dates, catégories (simple, double, jeunes), format de match, nombre de places, date limite d’inscription.` },
      { titre: `Les joueurs s’inscrivent`, texte: `Depuis le site ou leur espace membre. Une fois le tournoi complet, les suivants passent en liste d’attente.` },
      { titre: `Le tableau se tire`, texte: `Élimination directe, poules ou tournoi multi-chances : le logiciel place les têtes de série et tire les autres joueurs.` },
      { titre: `Les matchs se programment`, texte: `Il propose un ordre des matchs sur vos courts et vos créneaux, sans qu’un joueur joue deux fois en même temps.` },
      { titre: `Les résultats avancent le tableau`, texte: `Chaque score saisi qualifie le vainqueur pour le tour suivant, jusqu’au podium.` },
    ],
    sections: [
      {
        id: 'pourquoi-un-outil',
        titre: `Pourquoi un outil pour un simple tournoi du club ?`,
        paragraphes: [
          `Un tournoi interne, c’est souvent une grande feuille sur la table du club-house, des inscriptions par message, un tirage fait à la main la veille et une programmation qui se réécrit trois fois dans la journée. Le bénévole qui l’organise y passe des soirées, et il suffit d’un forfait pour tout décaler.`,
          `{{produit}} reprend chacune de ces étapes. Les inscriptions arrivent au même endroit, le tirage est fait selon des règles claires, la programmation tient compte des courts disponibles et du repos des joueurs. Le jour J, l’organisateur saisit les scores sur son téléphone et le tableau avance tout seul.`,
        ],
      },
      {
        id: 'formats',
        titre: `Élimination directe, poules, tournoi multi-chances : quel format pour votre tournoi ?`,
        paragraphes: [
          `Le format dépend de ce que vous voulez offrir aux joueurs. Le logiciel sait construire les trois formats les plus courants dans les clubs.`,
        ],
        liste: [
          `**L’élimination directe** : le plus simple, idéal pour un tableau final. Les têtes de série sont placées aux bonnes lignes, les exempts vont aux mieux classés.`,
          `**Les poules** : chacun joue plusieurs matchs. Le classement de poule départage les égalités par les victoires, puis le match entre les ex aequo, puis les sets et les jeux.`,
          `**Le tournoi multi-chances** : chaque joueur dispute plusieurs matchs, toutes les places sont jouées. Très apprécié pour les jeunes et les tournois de reprise.`,
        ],
        sous: [
          {
            titre: `Le tirage au sort est-il équitable ?`,
            paragraphes: [
              `Oui, et il est reproductible : le tirage suit des règles connues et donne le même résultat si on le relance avec les mêmes inscrits. Vous pouvez donc l’expliquer à un joueur qui s’interroge. Une fois qu’un match du tour suivant a commencé, le tableau en amont ne peut plus être modifié par erreur.`,
            ],
          },
        ],
      },
      {
        id: 'programmation',
        titre: `Une programmation qui tient compte de vos courts et de vos joueurs`,
        paragraphes: [
          `Vous indiquez les courts et les créneaux disponibles. Le logiciel propose l’ordre des matchs : il évite qu’un joueur soit programmé deux fois au même moment, garde un temps de repos entre deux matchs, et fait jouer les matchs qui alimentent le tour suivant en premier. Ce qui ne rentre pas dans les créneaux est signalé, plutôt que caché.`,
          `La programmation reste une proposition : l’organisateur la déplace s’il le faut. Les courts réservés au tournoi apparaissent dans le planning global du club, pour que l’école de tennis et les équipes ne s’y retrouvent pas en même temps.`,
        ],
      },
      {
        id: 'evenements',
        titre: `Et les autres événements du club ?`,
        paragraphes: [
          `Le même module sert à tout ce qui demande une inscription : la soirée de fin de saison, la journée portes ouvertes, la sortie à un grand tournoi, l’assemblée générale. Vous fixez le nombre de places, les membres s’inscrivent depuis leur espace, une liste d’attente prend le relais quand c’est complet, et un rappel part avant la date.`,
          `Si vous avez besoin de bras (buvette, arbitrage, rangement), le module bénévolat inclus dans le logiciel permet de créer des missions et de compter les heures données.`,
        ],
      },
      {
        id: 'limites-tournois',
        titre: `Ce que ce module ne gère pas`,
        paragraphes: [
          `Les tournois homologués par la Fédération, ceux qui comptent pour le classement, s’organisent avec les outils fédéraux et un juge-arbitre. {{produit}} est fait pour les tournois internes, non homologués : le tournoi du club, le double surprise, le tournoi des jeunes de fin d’année. Pour les tournois fédéraux, il propose des liens vers Ten’Up.`,
          `Il n’encaisse pas non plus de droits d’inscription par lui-même : si le tournoi est payant, le paiement passe par HelloAsso comme les cotisations, ou se règle au club.`,
        ],
      },
    ],
    faq: [
      { q: `Peut-on organiser un tournoi de double ?`, a: `Oui. Les paires s’inscrivent ensemble et le tableau se construit avec les paires comme avec des joueurs.` },
      { q: `Le tournoi compte-t-il pour le classement FFT ?`, a: `Non. Un tournoi interne n’est pas homologué. Les tournois homologués se gèrent avec les outils de la Fédération.` },
      { q: `Que se passe-t-il en cas de forfait ?`, a: `Vous saisissez le forfait comme un résultat : le joueur présent est qualifié et le tableau continue.` },
      { q: `Les joueurs voient-ils le tableau en direct ?`, a: `Oui, dans leur espace membre, et sur le site du club si vous avez le pack.` },
      { q: `Peut-on mélanger tennis, padel et pickleball ?`, a: `Chaque tournoi a sa pratique et ses courts. Vous pouvez en créer un par pratique le même week-end.` },
      { q: `Qui peut saisir les scores ?`, a: `Les personnes à qui vous donnez le droit : l’organisateur, un enseignant, un membre du bureau.` },
    ],
    liens: [
      { href: '/clubs-de-tennis/fonctionnalites/challenge-interne', nom: 'Challenge interne et saisie des matchs' },
      { href: '/clubs-de-tennis/fonctionnalites/equipes-et-competitions', nom: 'Équipes et compétitions' },
      { href: '/clubs-de-tennis/fonctionnalites/reservation-de-courts', nom: 'Réservation de courts' },
      { href: '/clubs-de-tennis/logiciel-de-gestion', nom: 'Le logiciel du bureau' },
      { href: '/clubs-de-tennis/guides/creer-un-challenge-interne', nom: 'Guide : créer un challenge interne' },
      { href: '/clubs-de-tennis/tarifs', nom: 'Tarifs' },
    ],
    maj: '2026-10-29',
  },

  // ─────────────────────────────────────────────────────────────────────────────────────────── espace membre et parent
  {
    slug: 'espace-membre-et-parent',
    chemin: '/clubs-de-tennis/fonctionnalites/espace-membre-et-parent',
    famille: 'fonctionnalite',
    titre: `L’espace membre et parent : le club dans la poche de chaque adhérent`,
    etiquette: `Fonctionnalité · Espace membre et parent`,
    reponse: `Chaque adhérent a son espace, sur téléphone comme sur ordinateur : son planning, ses matchs, son dossier, sa carte de membre. Les parents y suivent leurs enfants et signalent une absence en un geste. Il s’installe sur l’écran d’accueil comme une application, sans passer par un magasin d’applications, et il est inclus dans le logiciel.`,
    titleSeo: `Application membres du club de tennis : l’espace adhérent`,
    descriptionSeo: `Planning, matchs, dossier, carte de membre, enfants : l’espace membre et parent du club de tennis, installable sur le téléphone. Inclus dans le logiciel.`,
    motCle: 'application membres club de tennis',
    motsCles: [
      'espace adhérent club de tennis',
      'espace parent école de tennis',
      'application club de tennis pour les membres',
      'carte de membre club de tennis numérique',
      'appli club sportif sans store',
      'planning des enfants club de tennis',
    ],
    capture: 'espace-parent',
    demo: [
      { libelle: `Essayer l’espace en tant que parent`, url: DEMO.role('parent', '/espace') },
      { libelle: `Voir le planning des enfants`, url: DEMO.role('parent', '/espace/enfants') },
      { libelle: `Ouvrir sa carte de membre en tant que membre`, url: DEMO.role('membre', '/espace/carte') },
    ],
    tarif: {
      formule: 'logiciel',
      texte: `Inclus dans le logiciel, à partir de {{club:logiciel:mini:mois}} € par mois pour un club de la catégorie Mini. Les membres sont illimités dans la catégorie du club : aucun coût par adhérent.`,
    },
    etapes: [
      { titre: `L’adhérent reçoit son accès`, texte: `Avec son adhésion, il reçoit un e-mail pour ouvrir son espace. Un parent a un seul accès pour toute la famille.` },
      { titre: `Il l’installe s’il le souhaite`, texte: `Depuis le navigateur de son téléphone, il ajoute l’espace à son écran d’accueil. Il s’ouvre ensuite comme une application.` },
      { titre: `Il accepte les notifications`, texte: `Pour être prévenu d’une séance annulée, d’une convocation ou d’un match à confirmer. Il peut changer d’avis à tout moment.` },
      { titre: `Il retrouve tout au même endroit`, texte: `Planning, dossier, matchs, tournois, carte de membre : plus besoin de demander au bureau.` },
    ],
    sections: [
      {
        id: 'ce-que-voit-l-adherent',
        titre: `Que trouve un adhérent dans son espace ?`,
        paragraphes: [
          `L’espace est conçu d’abord pour le téléphone, avec de gros boutons et l’essentiel en haut : ce qui se passe aujourd’hui et cette semaine. Chaque adhérent n’y voit que ce qui le concerne.`,
        ],
        liste: [
          `**Son planning** : cours, rencontres d’équipe, tournois, événements auxquels il est inscrit.`,
          `**Son dossier** : l’état de son adhésion, les pièces à fournir, ses paiements.`,
          `**Ses matchs** du Challenge interne : saisir un score, confirmer celui d’un adversaire, voir son classement et ses badges.`,
          `**Sa carte de membre**, à montrer au club si on la lui demande.`,
          `**Ses notifications** : séance annulée, convocation, rappel d’événement.`,
          `**La réservation d’un court**, si votre club a pris l’option réservation.`,
        ],
      },
      {
        id: 'pour-les-parents',
        titre: `Pour les parents : un seul accès pour toute la famille`,
        paragraphes: [
          `Un parent avec deux enfants à l’école de tennis voit le planning des deux sur le même écran, avec les séances, les stages et les éventuels matchs. Si un enfant est malade, il signale l’absence en un geste : l’enseignant la voit au moment de l’appel.`,
          `C’est aussi dans cet espace que le parent complète un dossier, dépose une pièce, consulte la progression de son enfant dans la grille Galaxie Tennis, ou répond à une convocation d’équipe pour un jeune. Le bureau n’a plus à jouer le standard téléphonique.`,
        ],
      },
      {
        id: 'application-sans-store',
        titre: `Une application sans magasin d’applications : qu’est-ce que ça veut dire ?`,
        paragraphes: [
          `L’espace membre est un site web qui se comporte comme une application. L’adhérent l’ouvre une fois dans le navigateur de son téléphone, puis l’ajoute à son écran d’accueil : une icône du club apparaît, et l’espace s’ouvre en plein écran, comme une application classique.`,
          `L’avantage : rien à télécharger depuis un magasin d’applications, pas de mise à jour à faire, le même espace sur tous les téléphones et sur l’ordinateur. La limite : il n’apparaît pas dans les magasins d’applications. Une vraie application publiée dans ces magasins n’est pas comprise dans l’offre ; elle se fait sur devis.`,
        ],
      },
      {
        id: 'confidentialite',
        titre: `Qui voit quoi ? La vie privée des adhérents respectée`,
        paragraphes: [
          `Un adhérent ne voit pas les coordonnées des autres. Un parent ne voit que ses enfants. Les photos de la galerie réservées aux adhérents ne s’affichent qu’aux personnes connectées, et une photo d’un enfant sans autorisation de droit à l’image ne devient jamais publique.`,
          `Chaque adhérent peut consulter les informations que le club garde sur lui. Les règles qui s’appliquent à un club en la matière sont détaillées dans notre guide [RGPD pour un club de tennis](/clubs-de-tennis/guides/rgpd-club-de-tennis).`,
        ],
      },
      {
        id: 'limites-espace',
        titre: `Les limites à connaître`,
        paragraphes: [
          `Les notifications sur le téléphone ne fonctionnent que si l’adhérent les accepte. Certains les refuseront : ils continueront à recevoir les e-mails. L’offre ne comprend pas de SMS, même si la démo en simule.`,
          `L’espace membre fait partie du logiciel. Avec le site seul, vos adhérents n’ont pas d’espace personnel : ils consultent les informations publiques du site et remplissent le formulaire d’adhésion.`,
        ],
      },
    ],
    faq: [
      { q: `Les adhérents doivent-ils payer l’application ?`, a: `Non. L’espace est compris dans l’abonnement du club, et les membres sont illimités dans la catégorie du club.` },
      { q: `Faut-il télécharger quelque chose ?`, a: `Non. L’espace s’ouvre dans le navigateur. L’ajouter à l’écran d’accueil est facultatif et ne prend que quelques secondes.` },
      { q: `Fonctionne-t-il sur tous les téléphones ?`, a: `Sur les téléphones récents, oui, avec leur navigateur habituel. Il fonctionne aussi sur ordinateur et tablette.` },
      { q: `Un grand-parent peut-il suivre un enfant ?`, a: `Le club peut rattacher plusieurs adultes responsables à un enfant, chacun avec son propre accès.` },
      { q: `Que se passe-t-il si un adhérent perd son mot de passe ?`, a: `Il en demande un nouveau par e-mail depuis la page de connexion, sans passer par le bureau.` },
      { q: `Les adhérents voient-ils les numéros de téléphone des autres ?`, a: `Non. Les coordonnées restent réservées au bureau, selon les droits donnés à chacun.` },
    ],
    liens: [
      { href: '/clubs-de-tennis/fonctionnalites/ecole-de-tennis', nom: 'École de tennis' },
      { href: '/clubs-de-tennis/fonctionnalites/communication', nom: 'Communication' },
      { href: '/clubs-de-tennis/fonctionnalites/challenge-interne', nom: 'Challenge interne et saisie des matchs' },
      { href: '/clubs-de-tennis/logiciel-de-gestion', nom: 'Le logiciel du bureau' },
      { href: '/clubs-de-tennis/demo', nom: 'La démo' },
      { href: '/clubs-de-tennis/tarifs', nom: 'Tarifs' },
    ],
    maj: '2026-10-29',
  },

  // ─────────────────────────────────────────────────────────────────────────────────────────── communication
  {
    slug: 'communication',
    chemin: '/clubs-de-tennis/fonctionnalites/communication',
    famille: 'fonctionnalite',
    titre: `Communiquer avec les adhérents : le bon message aux bonnes personnes, sans liste à tenir`,
    etiquette: `Fonctionnalité · Communication`,
    reponse: `Le bureau écrit un message et choisit à qui il part : les parents d’un groupe, une équipe, tous les adhérents adultes. Il arrive par e-mail et en notification sur le téléphone, et les listes se tiennent à jour toutes seules avec les adhésions. La communication est incluse dans le logiciel ; l’offre ne comprend pas de SMS.`,
    titleSeo: `Communiquer avec les adhérents d’un club : e-mails ciblés`,
    descriptionSeo: `Envoyez un message aux parents d’un groupe, à une équipe ou à tout le club, par e-mail et notification. Listes à jour, sans SMS. Inclus dans le logiciel.`,
    motCle: 'communiquer avec les adhérents d’un club',
    motsCles: [
      'envoyer un e-mail aux adhérents du club',
      'newsletter club de tennis',
      'prévenir les parents école de tennis',
      'liste de diffusion club sportif',
      'notification adhérents association',
      'communication club de tennis',
    ],
    capture: 'bureau-communication',
    demo: [
      { libelle: `Écrire un message en tant que secrétaire`, url: DEMO.role('secretaire', '/bureau/communication') },
      { libelle: `Voir les notifications reçues par un parent`, url: DEMO.role('parent', '/espace/notifications') },
    ],
    tarif: {
      formule: 'logiciel',
      texte: `Incluse dans le logiciel, à partir de {{club:logiciel:mini:mois}} € par mois pour un club de la catégorie Mini. Les e-mails automatiques sont compris dans un usage normal. Le site, de son côté, comprend les actualités, l’agenda et le bandeau d’information urgent.`,
    },
    etapes: [
      { titre: `Vous choisissez les destinataires`, texte: `Un groupe de l’école, ses parents, une équipe, les membres d’une pratique, le bureau, tout le club.` },
      { titre: `Vous écrivez, ou vous partez d’un modèle`, texte: `Les messages qui reviennent (rappel de réinscription, séance annulée) s’enregistrent comme modèles.` },
      { titre: `Vous envoyez maintenant ou plus tard`, texte: `Envoi immédiat, ou programmé à la date et à l’heure de votre choix.` },
      { titre: `Vous voyez ce qui est parti`, texte: `La boîte d’envoi garde chaque message, avec ses destinataires et les envois en échec.` },
    ],
    sections: [
      {
        id: 'listes-a-jour',
        titre: `Des listes de diffusion qui se tiennent à jour toutes seules`,
        paragraphes: [
          `Le vrai problème de la communication d’un club, ce n’est pas d’écrire le message : c’est de savoir à qui l’envoyer. La liste des parents du groupe du mercredi n’est jamais à jour, un nouvel adhérent n’est pas dans le bon groupe de messagerie, un ancien reçoit encore tout.`,
          `Dans {{produit}}, les destinataires ne sont pas des listes à tenir : ce sont des critères. « Les parents du groupe orange du mercredi » est calculé au moment de l’envoi, à partir des inscriptions. Un enfant qui change de groupe change de liste, sans que personne n’y pense.`,
        ],
      },
      {
        id: 'e-mail-et-notification',
        titre: `E-mail et notification : pourquoi pas de SMS ?`,
        paragraphes: [
          `Chaque message part par e-mail et, pour les adhérents qui ont accepté les notifications de leur espace membre, en notification sur le téléphone. La notification s’affiche comme un message, sans frais pour le club.`,
          `L’offre ne propose pas de SMS. Les SMS ont un coût à l’unité, et un club peut vite se retrouver avec une facture qui dépend de son actualité. La démo en ligne montre un envoi de SMS, mais il est simulé et ne fait pas partie de ce que nous vendons. Si votre club utilise déjà des groupes de messagerie pour les échanges rapides entre joueurs, gardez-les : {{produit}} s’occupe des messages officiels du club.`,
        ],
      },
      {
        id: 'messages-automatiques',
        titre: `Les messages qui partent tout seuls`,
        paragraphes: [
          `Une bonne partie de la communication d’un club se répète. Elle peut partir sans que personne n’y pense :`,
        ],
        liste: [
          `la relance d’un dossier d’adhésion incomplet, qui dit précisément ce qui manque ;`,
          `les parents prévenus quand une séance de l’école est annulée ou reportée ;`,
          `la convocation d’une équipe avec l’heure de rendez-vous et le covoiturage ;`,
          `la confirmation d’inscription à un événement, puis le rappel la veille.`,
        ],
        sous: [
          {
            titre: `Et le site ?`,
            paragraphes: [
              `Les messages ciblés vont aux adhérents. Pour le public, le site garde ses outils : les actualités, l’agenda auquel on peut s’abonner, et le bandeau d’information urgent en haut de toutes les pages (« Club fermé ce samedi pour le tournoi »).`,
            ],
          },
        ],
      },
      {
        id: 'regles-et-consentement',
        titre: `Respecter les adhérents : consentement et désinscription`,
        paragraphes: [
          `Les messages liés à l’adhésion (dossier, séance, convocation) sont attendus par l’adhérent. Les messages d’information générale, comme une lettre du club ou l’annonce d’un partenaire, demandent plus de précautions. Chaque e-mail de ce type comporte un lien de désinscription, et l’adhérent peut régler ses préférences.`,
          `Notre guide [RGPD pour un club de tennis](/clubs-de-tennis/guides/rgpd-club-de-tennis) explique ce qu’un club peut envoyer, à qui, et ce qu’il doit garder comme trace. Pour les règles officielles, la référence reste le site de la CNIL.`,
        ],
      },
      {
        id: 'limites-communication',
        titre: `Ce que la communication ne fait pas`,
        paragraphes: [
          `Pas de SMS, donc, et pas de publication automatique sur les réseaux sociaux. Les e-mails sont compris dans un usage normal pour un club ; si vous prévoyez des envois massifs vers des personnes extérieures au club, parlons-en avant.`,
          `Si vous voulez de l’aide pour rédiger une lettre du club ou une actualité, l’[assistant IA](/clubs-de-tennis/fonctionnalites/assistant-ia), en option, propose un brouillon que vous relisez avant tout envoi.`,
        ],
      },
    ],
    faq: [
      { q: `Pourquoi n’y a-t-il pas de SMS ?`, a: `Parce qu’ils coûtent à l’unité et rendraient la facture du club imprévisible. L’e-mail et la notification sur le téléphone couvrent les besoins, et le club peut garder ses groupes de messagerie.` },
      { q: `La démo envoie des SMS : est-ce trompeur ?`, a: `La démo simule un SMS pour montrer le principe, sans rien envoyer. L’offre, elle, ne comprend pas de SMS : nous préférons le dire clairement.` },
      { q: `Les e-mails risquent-ils d’arriver en indésirables ?`, a: `Les envois partent d’un service d’e-mail prévu pour cela, avec les réglages qui aident à la bonne réception. Aucun service ne peut garantir qu’un message n’arrivera jamais en indésirables.` },
      { q: `Peut-on envoyer depuis une adresse du club ?`, a: `Les messages portent le nom du club. Si vous voulez des adresses à votre nom de domaine (contact@, president@…), c’est l’option adresses e-mail, à {{club:option:adresses-email:mise}} € de mise en place, le service e-mail restant à la charge du club.` },
      { q: `Un enseignant peut-il écrire aux parents de son groupe ?`, a: `Oui, si vous lui en donnez le droit. Il voit alors les destinataires de ses groupes, pas les autres.` },
      { q: `Peut-on programmer un message ?`, a: `Oui : vous choisissez la date et l’heure d’envoi, et vous pouvez le modifier ou l’annuler d’ici là.` },
    ],
    liens: [
      { href: '/clubs-de-tennis/fonctionnalites/espace-membre-et-parent', nom: 'Espace membre et parent' },
      { href: '/clubs-de-tennis/fonctionnalites/ma-journee-et-automatisations', nom: 'Ma journée et automatisations' },
      { href: '/clubs-de-tennis/fonctionnalites/site-modifiable', nom: 'Le site modifiable par le club' },
      { href: '/clubs-de-tennis/logiciel-de-gestion', nom: 'Le logiciel du bureau' },
      { href: '/clubs-de-tennis/guides/rgpd-club-de-tennis', nom: 'Guide : RGPD pour un club de tennis' },
      { href: '/clubs-de-tennis/tarifs', nom: 'Tarifs' },
    ],
    maj: '2026-10-29',
  },

  // ─────────────────────────────────────────────────────────────────────────────────────────── Ma journée
  {
    slug: 'ma-journee-et-automatisations',
    chemin: '/clubs-de-tennis/fonctionnalites/ma-journee-et-automatisations',
    famille: 'fonctionnalite',
    titre: `Ma journée et automatisations : chaque bénévole sait ce qu’il a à faire aujourd’hui`,
    etiquette: `Fonctionnalité · Ma journée et automatisations`,
    reponse: `En ouvrant le logiciel, chaque membre du bureau voit d’abord « Ma journée » : ce qui demande une action de sa part aujourd’hui, et rien d’autre. Les tâches qui se répètent sont confiées à des automatisations : 5 sont incluses dans le logiciel, et l’option automatisations avancées en ajoute 25, plus 3 scénarios faits sur mesure pour votre club.`,
    titleSeo: `Automatiser la gestion d’un club de tennis : Ma journée`,
    descriptionSeo: `Ce qui demande une action aujourd’hui, pour chaque membre du bureau, et des automatisations pour les tâches répétitives : 5 incluses, 25 + 3 en option.`,
    motCle: 'automatiser la gestion d’un club de tennis',
    motsCles: [
      'automatisation association sportive',
      'tableau de bord bureau club de tennis',
      'relances automatiques club',
      'tâches du bureau club de tennis',
      'gagner du temps bénévoles club',
      'automatiser les relances adhésion',
    ],
    capture: 'bureau-journee',
    demo: [
      { libelle: `Ouvrir « Ma journée » de la présidente`, url: DEMO.role('presidente', '/bureau') },
      { libelle: `Voir les automatisations du club`, url: DEMO.role('presidente', '/bureau/automatisations') },
      { libelle: `Consulter le journal de qui a fait quoi`, url: DEMO.role('presidente', '/bureau/audit') },
    ],
    tarif: {
      formule: 'logiciel',
      option: 'automatisations-avancees',
      texte: `« Ma journée » et 5 automatisations sont inclus dans le logiciel, à partir de {{club:logiciel:mini:mois}} € par mois pour un club de la catégorie Mini. L’option automatisations avancées (25 scénarios prêts à l’emploi et 3 sur mesure) coûte {{club:option:automatisations-avancees:mise}} € de mise en place et {{club:option:automatisations-avancees:mois}} € par mois.`,
    },
    etapes: [
      { titre: `Vous ouvrez le logiciel`, texte: `« Ma journée » s’affiche en premier, adaptée à votre rôle : présidente, trésorier, secrétaire, enseignant, capitaine.` },
      { titre: `Vous traitez ce qui est urgent`, texte: `Un dossier à valider, un paiement en retard, une composition d’équipe à faire : chaque ligne mène directement à l’écran où agir.` },
      { titre: `Les automatisations font le reste`, texte: `Quand un événement se produit (un dossier reste incomplet, une séance est annulée), le scénario prévu s’exécute.` },
      { titre: `Tout est tracé`, texte: `Le journal garde chaque action, faite par une personne ou par une automatisation.` },
    ],
    sections: [
      {
        id: 'ma-journee',
        titre: `« Ma journée » : la liste qui remplace les post-it`,
        paragraphes: [
          `Un bénévole n’a pas le temps de parcourir dix écrans pour savoir s’il y a quelque chose à faire. « Ma journée » lui donne la réponse en ouvrant le logiciel : la secrétaire voit les dossiers à valider et les licences à saisir dans ADOC, le trésorier les paiements en retard, l’enseignant ses séances du jour et le temps prévu, le capitaine la rencontre qui n’a pas encore de composition.`,
          `S’il n’y a rien à faire, l’écran le dit. C’est aussi précieux que le reste : un bénévole qui sait qu’il peut fermer l’ordinateur l’esprit tranquille reste bénévole plus longtemps.`,
        ],
      },
      {
        id: 'comment-marche-une-automatisation',
        titre: `Comment marche une automatisation ? « Quand, si, alors »`,
        paragraphes: [
          `Une automatisation se lit comme une phrase. **Quand** quelque chose se produit (un dossier est créé, un match est saisi, une rencontre approche), **si** une condition est remplie (il manque une pièce, le joueur est mineur), **alors** une action part : un message, une notification, une tâche dans « Ma journée » d’une personne.`,
          `Avant chaque action prévue à l’avance, le logiciel vérifie à nouveau que la condition tient toujours : une famille qui a complété son dossier entre-temps ne reçoit pas de relance. Une automatisation peut être testée sans rien envoyer, mise en pause ou modifiée par le bureau.`,
        ],
      },
      {
        id: 'incluses-et-option',
        titre: `5 automatisations incluses, 25 et 3 sur mesure en option`,
        paragraphes: [
          `Le logiciel comprend **5 automatisations prêtes**, choisies parmi les besoins de base de tout club : par exemple la relance d’un dossier d’adhésion incomplet, la licence à saisir dans ADOC après une adhésion validée, ou les parents prévenus quand une séance est annulée. Nous les réglons avec vous à la mise en place.`,
          `L’option **automatisations avancées** ajoute **25 scénarios prêts à l’emploi**, qui couvrent les équipes, le Challenge, les événements, la fidélisation des adhérents, et **3 scénarios faits sur mesure** pour une habitude propre à votre club. Elle coûte {{club:option:automatisations-avancees:mise}} € de mise en place et {{club:option:automatisations-avancees:mois}} € par mois.`,
        ],
        liste: [
          `Exemple type, équipe : à quelques jours d’une rencontre sans composition, le capitaine reçoit un rappel.`,
          `Exemple type, fidélisation : un adhérent régulier qui ne vient plus depuis plusieurs semaines est signalé au bureau.`,
          `Exemple type, Challenge : un match saisi est envoyé à l’adversaire pour confirmation, puis validé.`,
        ],
      },
      {
        id: 'journal',
        titre: `Le journal de qui a fait quoi`,
        paragraphes: [
          `Chaque modification importante est enregistrée : qui a validé ce dossier, qui a changé ce tarif, quelle automatisation a envoyé ce message, et quand. Ce n’est pas de la surveillance, c’est de la mémoire. Quand le bureau change à l’assemblée générale, les nouveaux arrivants retrouvent l’historique au lieu de repartir de zéro.`,
        ],
      },
      {
        id: 'limites-automatisations',
        titre: `Ce que les automatisations ne font pas`,
        paragraphes: [
          `Elles n’agissent que dans {{produit}} : elles envoient des e-mails et des notifications, créent des tâches, changent un statut. Elles n’envoient pas de SMS, n’écrivent rien dans ADOC et ne commandent rien hors du logiciel. Une décision sensible, comme une restriction de réservation ou la validation d’un dossier, peut être soumise à l’accord d’une personne avant d’être appliquée.`,
          `Un scénario qui n’existe ni dans les 5 incluses, ni dans les 25 de l’option, ni dans vos 3 sur mesure relève d’un développement propre, chiffré avant, à {{club:dev-heure}} € de l’heure.`,
        ],
      },
    ],
    faq: [
      { q: `Peut-on modifier le texte des messages automatiques ?`, a: `Oui. Chaque message part d’un modèle que vous adaptez au ton du club, avec des champs remplis automatiquement (prénom, groupe, date).` },
      { q: `Peut-on désactiver une automatisation ?`, a: `Oui, à tout moment, d’un clic. Elle reste enregistrée et peut être réactivée.` },
      { q: `Une automatisation peut-elle se tromper de destinataire ?`, a: `Elle suit les critères que vous avez fixés et les données du club. Vous pouvez la tester sans rien envoyer pour vérifier qui serait concerné.` },
      { q: `Quelles sont les 5 automatisations incluses ?`, a: `Des scénarios de base que tout club utilise (relance de dossier, licence à saisir, parents prévenus d’une annulation, par exemple). Nous les choisissons et les réglons avec vous à la mise en place.` },
      { q: `Qu’apportent les 3 scénarios sur mesure de l’option ?`, a: `Une habitude propre à votre club, traduite en automatisation : par exemple un message particulier après la première séance d’un nouvel enfant.` },
      { q: `« Ma journée » est-elle la même pour tout le bureau ?`, a: `Non. Chacun voit ce qui relève de son rôle et de ses droits. La présidente peut avoir une vue d’ensemble.` },
    ],
    liens: [
      { href: '/clubs-de-tennis/fonctionnalites/communication', nom: 'Communication' },
      { href: '/clubs-de-tennis/fonctionnalites/assistant-ia', nom: 'Assistant IA du club' },
      { href: '/clubs-de-tennis/fonctionnalites/adhesions-en-ligne', nom: 'Adhésions et réinscriptions en ligne' },
      { href: '/clubs-de-tennis/logiciel-de-gestion', nom: 'Le logiciel du bureau' },
      { href: '/clubs-de-tennis/simulateur', nom: 'Simulateur de prix', note: 'Ajoutez l’option et voyez le total' },
      { href: '/clubs-de-tennis/tarifs', nom: 'Tarifs' },
    ],
    maj: '2026-10-29',
  },

  // ─────────────────────────────────────────────────────────────────────────────────────────── assistant IA
  {
    slug: 'assistant-ia',
    chemin: '/clubs-de-tennis/fonctionnalites/assistant-ia',
    famille: 'fonctionnalite',
    titre: `L’assistant IA du club : poser une question, obtenir un brouillon, toujours relu par un humain`,
    etiquette: `Fonctionnalité · Assistant IA`,
    reponse: `L’assistant répond aux questions du bureau sur les données du club (« combien de jeunes ne se sont pas réinscrits ? ») et rédige des brouillons : actualités, lettres du club, dossiers de subvention, rapport d’assemblée générale. Un humain valide toujours avant qu’un texte parte ou qu’une donnée change. C’est une option du logiciel, avec un usage plafonné.`,
    titleSeo: `Intelligence artificielle pour club sportif : l’assistant`,
    descriptionSeo: `Questions sur les données du club, brouillons d’actualités, de newsletters et de dossiers de subvention. Un humain valide toujours. Option du logiciel.`,
    motCle: 'intelligence artificielle club sportif',
    motsCles: [
      'IA pour club de tennis',
      'assistant IA association sportive',
      'rédiger un dossier de subvention avec l’IA',
      'IA rapport d’assemblée générale association',
      'intelligence artificielle bénévoles association',
      'IA newsletter club',
    ],
    capture: 'bureau-assistant',
    demo: [
      { libelle: `Poser une question à l’assistant en tant que présidente`, url: DEMO.role('presidente', '/bureau/assistant') },
      { libelle: `Demander un chiffre en tant que trésorier`, url: DEMO.role('tresorier', '/bureau/assistant') },
    ],
    tarif: {
      option: 'assistant-ia',
      texte: `Option du logiciel : {{club:option:assistant-ia:mise}} € de mise en place et {{club:option:assistant-ia:mois}} € par mois. L’usage est plafonné ; au-delà, le coût réel est annoncé avant. La commande vocale, qui permet de dicter à l’assistant depuis le téléphone, est une option en plus : {{club:option:commande-vocale:mise}} € de mise en place et {{club:option:commande-vocale:mois}} € par mois.`,
    },
    etapes: [
      { titre: `Vous posez votre question`, texte: `En français, comme à un collègue : « Combien de filles de moins de douze ans à l’école de tennis ? »` },
      { titre: `L’assistant répond avec les données du club`, texte: `Le chiffre vient des données du logiciel, avec un lien vers la liste qui le justifie.` },
      { titre: `Vous demandez un brouillon`, texte: `Une actualité sur le week-end des équipes, une lettre aux familles, la partie « activités » d’un dossier de subvention.` },
      { titre: `Vous relisez et vous décidez`, texte: `Vous corrigez, vous validez, ou vous jetez. Rien ne part sans vous.` },
    ],
    sections: [
      {
        id: 'a-quoi-sert-l-assistant',
        titre: `À quoi sert un assistant IA dans un club de tennis ?`,
        paragraphes: [
          `Les bénévoles d’un bureau passent beaucoup de temps sur deux choses qui ne sont pas du tennis : chercher un chiffre, et écrire. Combien de licenciés de moins de dix-huit ans ? Combien de familles n’ont pas encore payé ? Et ensuite rédiger le mot du président, l’actualité des équipes, le rapport moral de l’assemblée générale, le dossier de subvention de la commune.`,
          `L’assistant fait gagner du temps sur ces deux tâches. Il ne remplace ni le bureau ni son jugement : il prépare, le bureau décide.`,
        ],
      },
      {
        id: 'questions-sur-les-donnees',
        titre: `Des réponses qui viennent de vos données, pas de l’imagination`,
        paragraphes: [
          `Le principe le plus important : un chiffre donné par l’assistant vient des données du logiciel, et il est accompagné d’un lien vers la liste qui le justifie. Si l’assistant annonce un nombre d’enfants, le lien ouvre la liste de ces enfants, nom par nom. Vous pouvez vérifier en un clic.`,
          `Quand une donnée n’a pas été saisie, l’assistant le dit au lieu d’inventer un chiffre. Un « je ne sais pas » vaut mieux qu’un faux zéro, surtout dans un dossier de subvention.`,
        ],
      },
      {
        id: 'brouillons',
        titre: `Des brouillons de textes, à relire`,
        paragraphes: [
          `L’assistant rédige à partir des faits du club : les résultats des équipes, les événements passés, les effectifs de l’école de tennis. Il propose un brouillon que vous modifiez à votre guise.`,
        ],
        liste: [
          `une actualité pour le site après un week-end de rencontres ;`,
          `une lettre aux adhérents ou aux familles ;`,
          `les parties descriptives d’un dossier de subvention (activités, public, projet) ;`,
          `un premier jet du rapport d’activité de l’assemblée générale.`,
        ],
        sous: [
          {
            titre: `Un humain valide toujours`,
            paragraphes: [
              `L’assistant n’envoie aucun message, ne publie aucune actualité et ne modifie aucune donnée de lui-même. Toute action qu’il propose attend la validation d’une personne du bureau qui en a le droit. C’est une règle de conception, pas un réglage qu’on pourrait oublier.`,
            ],
          },
        ],
      },
      {
        id: 'usage-et-cout',
        titre: `Un usage plafonné, un coût connu d’avance`,
        paragraphes: [
          `Un assistant IA a un coût d’utilisation réel. Pour qu’il reste prévisible, l’option comprend un usage plafonné, adapté à un bureau de club. Si votre club dépasse ce plafond, le coût réel vous est annoncé avant : pas de mauvaise surprise sur la facture.`,
          `L’assistant demande le logiciel : il travaille sur les données que le logiciel gère. La commande vocale est une option supplémentaire, pratique pour poser une question depuis le bord du court sans taper.`,
        ],
      },
      {
        id: 'limites-ia',
        titre: `Les limites, dites franchement`,
        paragraphes: [
          `Un texte rédigé par une IA peut contenir une maladresse ou une formulation inexacte : c’est pour cela qu’il est toujours relu. L’assistant ne connaît que ce qui est dans le logiciel ; il ne sait rien des décisions prises au téléphone ou en réunion si personne ne les a notées.`,
          `Il n’a pas accès à ADOC ni aux données fédérales, et il ne donne pas d’avis juridique ou comptable. Dans la démo en ligne, l’assistant montre le fonctionnement sur les données du club fictif. Avant d’activer l’option, posez-nous vos questions sur le service d’IA utilisé et sur les données qui lui sont transmises : le contrat de traitement des données inclus dans l’abonnement encadre ce point.`,
        ],
      },
    ],
    faq: [
      { q: `L’assistant peut-il envoyer un message à ma place ?`, a: `Il peut le préparer, jamais l’envoyer seul. Une personne du bureau valide chaque envoi.` },
      { q: `Peut-il inventer un chiffre ?`, a: `Les chiffres viennent des données du logiciel, avec un lien vers la liste qui les justifie. Quand une donnée manque, il le dit.` },
      { q: `Que se passe-t-il si on dépasse le plafond d’usage ?`, a: `Le coût réel vous est annoncé avant. Vous décidez de continuer ou d’attendre le mois suivant.` },
      { q: `Peut-on prendre l’assistant sans le logiciel ?`, a: `Non. Il travaille sur les données du logiciel ; avec le site seul, il n’aurait rien à consulter.` },
      { q: `Peut-il remplir un dossier de subvention entier ?`, a: `Il rédige les parties descriptives à partir des données du club. Les montants, les budgets et les pièces restent à vérifier et à fournir par le bureau.` },
      { q: `À quoi sert la commande vocale ?`, a: `À dicter une question ou une demande depuis le téléphone, sans taper. C’est une option qui nécessite l’assistant IA.` },
    ],
    liens: [
      { href: '/clubs-de-tennis/fonctionnalites/statistiques', nom: 'Statistiques' },
      { href: '/clubs-de-tennis/fonctionnalites/ma-journee-et-automatisations', nom: 'Ma journée et automatisations' },
      { href: '/clubs-de-tennis/logiciel-de-gestion', nom: 'Le logiciel du bureau' },
      { href: '/clubs-de-tennis/guides/financer-le-numerique-du-club', nom: 'Guide : financer le numérique de son club' },
      { href: '/clubs-de-tennis/simulateur', nom: 'Simulateur de prix' },
      { href: '/clubs-de-tennis/tarifs', nom: 'Tarifs' },
    ],
    maj: '2026-10-29',
  },

  // ─────────────────────────────────────────────────────────────────────────────────────────── réservation de courts
  {
    slug: 'reservation-de-courts',
    chemin: '/clubs-de-tennis/fonctionnalites/reservation-de-courts',
    famille: 'fonctionnalite',
    titre: `Réservation de courts en ligne : vos règles s’appliquent toutes seules`,
    etiquette: `Fonctionnalité · Réservation de courts`,
    reponse: `Les membres réservent un court depuis le site ou leur téléphone, et les règles du club (durée, délai, invités) s’appliquent sans que le bureau ait à arbitrer. Les créneaux de l’école de tennis, des équipes et des tournois sont déjà bloqués. C’est une option, avec le site ou le logiciel ; elle ne gère pas les accès physiques aux courts.`,
    titleSeo: `Réservation de courts de tennis en ligne pour votre club`,
    descriptionSeo: `Réservation de courts en ligne depuis le site ou le téléphone, avec les règles du club : durée, délai, invités. Option avec le site ou le logiciel.`,
    motCle: 'réservation de courts de tennis en ligne',
    motsCles: [
      'réserver un court de tennis en ligne club',
      'logiciel réservation terrain tennis',
      'planning des courts club de tennis',
      'réservation court padel club',
      'règles de réservation club de tennis',
      'réservation invité club de tennis',
    ],
    capture: 'site-reserver',
    demo: [
      { libelle: `Réserver un court sur le site du club`, url: DEMO.page('/reserver') },
      { libelle: `Réserver depuis l’espace membre`, url: DEMO.role('membre', '/espace/reserver') },
      { libelle: `Voir les réservations en tant que secrétaire`, url: DEMO.role('secretaire', '/bureau/reservations') },
    ],
    tarif: {
      option: 'reservation-courts',
      texte: `Option avec le site ou le logiciel : {{club:option:reservation-courts:mise}} € de mise en place et {{club:option:reservation-courts:mois}} € par mois. Le planning global des courts et des activités, lui, est inclus dans le logiciel.`,
    },
    etapes: [
      { titre: `Vous décrivez vos courts et vos règles`, texte: `Courts de tennis, de padel, de pickleball, éclairés ou non, couverts ou non ; durée d’une réservation, délai maximum, règles des invités.` },
      { titre: `Les activités du club sont déjà bloquées`, texte: `École de tennis, rencontres d’équipe, tournois internes : ces créneaux apparaissent comme occupés.` },
      { titre: `Le membre choisit un créneau libre`, texte: `Il voit les créneaux disponibles, choisit son partenaire, et réserve. Une demande qui ne respecte pas une règle est refusée avec l’explication.` },
      { titre: `Le bureau garde la vue d’ensemble`, texte: `Il voit l’occupation des courts, peut fermer un court pour entretien et annuler une réservation si besoin.` },
    ],
    sections: [
      {
        id: 'fin-du-cahier',
        titre: `Pourquoi passer du cahier ou du tableau à la réservation en ligne ?`,
        paragraphes: [
          `Le cahier du club-house et le tableau à fiches ont un charme réel, mais ils obligent à se déplacer pour réserver, et ils laissent place aux réservations en double, aux noms illisibles et aux créneaux bloqués « au cas où ». Le bureau finit par arbitrer des conflits qui n’ont rien de sportif.`,
          `Avec la réservation en ligne, le membre réserve depuis chez lui, à toute heure. Le règlement du club est appliqué de la même façon pour tout le monde, et un créneau libéré redevient visible immédiatement.`,
        ],
      },
      {
        id: 'regles-du-club',
        titre: `Les règles du club, appliquées sans discussion`,
        paragraphes: [
          `Chaque club a ses habitudes. L’option les reprend telles que vous les fixez, et le logiciel les applique à chaque demande.`,
        ],
        liste: [
          `**La durée** d’une réservation (une heure en tennis, plus en padel par exemple), avec des créneaux réguliers.`,
          `**Le délai** : combien de jours à l’avance on peut réserver, et le nombre de réservations par semaine.`,
          `**Les invités** : un membre peut-il venir avec une personne extérieure, combien de fois par mois.`,
          `**Les heures et les courts** : horaires d’ouverture, courts non éclairés indisponibles à la tombée de la nuit, court fermé pour entretien.`,
        ],
        sous: [
          {
            titre: `Une demande refusée explique pourquoi`,
            paragraphes: [
              `Si une réservation ne respecte pas une règle, le membre voit la raison en clair (« vous avez déjà deux réservations cette semaine ») au lieu d’un simple refus. Le règlement devient compréhensible, et le bureau reçoit moins de réclamations.`,
            ],
          },
        ],
      },
      {
        id: 'planning-global',
        titre: `Le planning global : inclus dans le logiciel, avec ou sans l’option`,
        paragraphes: [
          `Il faut distinguer deux choses. Le **planning global des courts et des activités** fait partie du logiciel : le bureau y voit qui occupe chaque court, pour l’école de tennis, les équipes, les tournois et les événements, et le logiciel signale les conflits (un court donné deux fois, un enseignant à deux endroits).`,
          `L’**option réservation** ouvre ce planning aux membres, pour qu’ils réservent eux-mêmes les créneaux libres. Elle fonctionne avec le site (réservation depuis la page du club) ou avec le logiciel (réservation depuis l’espace membre, avec les créneaux du club déjà bloqués). Le plus complet est d’avoir les deux.`,
        ],
      },
      {
        id: 'acces-physiques',
        titre: `Ce que l’option ne fait pas : les codes, les serrures, l’éclairage`,
        paragraphes: [
          `La réservation en ligne ne gère pas l’accès physique aux courts. Elle ne commande ni serrure, ni portail, ni éclairage, et ne distribue pas de code d’accès. La démo en ligne affiche un code du jour à titre d’illustration ; ce n’est pas une fonction de l’offre.`,
          `Si votre club a une serrure à code ou un système d’accès, il continue de le gérer comme aujourd’hui. Une connexion à un autre logiciel, quand elle est possible, se fait sur devis. Nous préférons le dire avant la signature qu’après.`,
        ],
      },
      {
        id: 'questions-pratiques-reservation',
        titre: `Padel, pickleball, terrains partagés : les questions pratiques`,
        paragraphes: [
          `Les courts de padel et de pickleball se décrivent comme les courts de tennis, avec leurs propres durées. Si votre club partage des installations avec la commune ou une autre association, vous pouvez bloquer leurs créneaux pour qu’ils n’apparaissent pas comme réservables.`,
          `Pour un club qui ouvre une nouvelle pratique, notre guide [ouvrir une section padel ou pickleball](/clubs-de-tennis/guides/ouvrir-une-section-padel-ou-pickleball) aborde aussi l’organisation des créneaux.`,
        ],
      },
    ],
    faq: [
      { q: `La réservation est-elle incluse dans le logiciel ?`, a: `Non, c’est une option. Le logiciel inclut le planning global des courts pour le bureau ; l’option permet aux membres de réserver eux-mêmes.` },
      { q: `Peut-on prendre l’option avec le site seul ?`, a: `Oui. Elle fonctionne avec le site ou avec le logiciel. Avec le logiciel, les créneaux de l’école et des équipes sont bloqués automatiquement.` },
      { q: `L’option gère-t-elle les codes d’accès ou la serrure ?`, a: `Non. La gestion des accès physiques aux courts (codes, serrures) n’est pas proposée. Le club garde son système actuel.` },
      { q: `Un membre peut-il annuler sa réservation ?`, a: `Oui, depuis son espace. Le club fixe le délai au-delà duquel une annulation n’est plus possible.` },
      { q: `Les non-membres peuvent-ils réserver ?`, a: `La réservation est pensée pour les membres. Un membre peut inviter une personne extérieure selon les règles d’invités du club.` },
      { q: `Le bureau peut-il bloquer un court pour un événement ?`, a: `Oui. Un court fermé pour entretien, pour un tournoi ou une animation n’est plus réservable sur ce créneau.` },
    ],
    liens: [
      { href: '/clubs-de-tennis/fonctionnalites/espace-membre-et-parent', nom: 'Espace membre et parent' },
      { href: '/clubs-de-tennis/fonctionnalites/tournois-internes', nom: 'Tournois internes' },
      { href: '/clubs-de-tennis/padel', nom: 'Clubs avec padel' },
      { href: '/clubs-de-tennis/guides/ouvrir-une-section-padel-ou-pickleball', nom: 'Guide : ouvrir une section padel ou pickleball' },
      { href: '/clubs-de-tennis/simulateur', nom: 'Simulateur de prix', note: 'Ajoutez l’option et voyez le total' },
      { href: '/clubs-de-tennis/tarifs', nom: 'Tarifs' },
    ],
    maj: '2026-10-29',
  },

  // ─────────────────────────────────────────────────────────────────────────────────────────── statistiques
  {
    slug: 'statistiques',
    chemin: '/clubs-de-tennis/fonctionnalites/statistiques',
    famille: 'fonctionnalite',
    titre: `Les statistiques du club, prêtes pour l’assemblée générale et les dossiers de subvention`,
    etiquette: `Fonctionnalité · Statistiques`,
    reponse: `Effectifs par âge, par sexe, par commune et par pratique, taux de réinscription, évolution d’une saison à l’autre, assiduité de l’école de tennis, occupation des courts : les chiffres du club se calculent tout seuls à partir des données du logiciel. Une donnée manquante est affichée comme inconnue, jamais comme un zéro. Les statistiques sont incluses dans le logiciel.`,
    titleSeo: `Statistiques des adhérents du club de tennis, sans tableur`,
    descriptionSeo: `Effectifs par âge, sexe, commune et pratique, réinscriptions, assiduité, occupation des courts : les statistiques du club, prêtes pour l’AG.`,
    motCle: 'statistiques adhérents club de tennis',
    motsCles: [
      'statistiques club de tennis',
      'taux de réinscription club sportif',
      'chiffres pour assemblée générale association',
      'effectifs par âge club de tennis',
      'statistiques pour dossier de subvention',
      'tableau de bord président club',
    ],
    capture: 'bureau-statistiques',
    demo: [
      { libelle: `Voir les statistiques en tant que présidente`, url: DEMO.role('presidente', '/bureau/statistiques') },
      { libelle: `Exporter les chiffres en tant que trésorier`, url: DEMO.role('tresorier', '/bureau/statistiques') },
    ],
    tarif: {
      formule: 'logiciel',
      texte: `Incluses dans le logiciel, à partir de {{club:logiciel:mini:mois}} € par mois pour un club de la catégorie Mini. La formule site comprend de son côté des statistiques de visite du site, respectueuses de la vie privée.`,
    },
    etapes: [
      { titre: `Les données s’accumulent d’elles-mêmes`, texte: `Adhésions, appels de l’école, matchs, réservations : chaque action du quotidien alimente les chiffres.` },
      { titre: `Vous ouvrez les statistiques`, texte: `Les principaux indicateurs du club s’affichent pour la saison en cours, avec la comparaison aux saisons précédentes enregistrées.` },
      { titre: `Vous filtrez`, texte: `Par saison, par pratique, par tranche d’âge ou par groupe, pour répondre à une question précise.` },
      { titre: `Vous exportez`, texte: `Un tableau à joindre au rapport d’assemblée générale ou à un dossier de subvention.` },
    ],
    sections: [
      {
        id: 'les-chiffres-du-club',
        titre: `Quels chiffres le logiciel calcule-t-il ?`,
        paragraphes: [
          `Les questions qu’on pose à un président de club reviennent chaque année : combien d’adhérents, combien de jeunes, combien de femmes, d’où viennent-ils, combien sont restés d’une saison à l’autre. Sans outil, quelqu’un reconstitue ces chiffres à la main dans un tableur, la veille de l’assemblée générale.`,
        ],
        liste: [
          `**Les effectifs** par tranche d’âge, par sexe, par commune de résidence, par pratique (tennis, padel, pickleball) et par classement.`,
          `**L’école de tennis** : enfants par niveau Galaxie Tennis, assiduité par groupe.`,
          `**La fidélité** : taux de réinscription, évolution sur plusieurs saisons, tranches d’âge où l’on perd le plus d’adhérents.`,
          `**La vie sportive** : participation au Challenge interne, occupation des courts par jour et par heure.`,
          `**Les recettes** par activité, à partir de la trésorerie.`,
        ],
      },
      {
        id: 'inconnu-plutot-que-zero',
        titre: `« Inconnu » plutôt que zéro : des chiffres qu’on peut défendre`,
        paragraphes: [
          `Un chiffre faux dans un dossier de subvention peut coûter cher en crédibilité. Le logiciel suit donc une règle stricte : quand une donnée n’a pas été saisie, la statistique s’affiche comme inconnue, jamais comme zéro. Un taux de réinscription ne peut pas se calculer la première saison, faute de saison précédente dans le logiciel : il le dit.`,
          `Chaque chiffre est calculé à partir des fiches réelles du club. Vous pouvez donc toujours remonter à la liste des personnes qui le composent, et vérifier.`,
        ],
      },
      {
        id: 'pour-l-ag-et-les-subventions',
        titre: `Pour l’assemblée générale, la commune et les financeurs`,
        paragraphes: [
          `Les statistiques servent d’abord au bureau, pour piloter : un groupe de l’école qui se vide, une tranche d’âge qui ne se réinscrit pas, un créneau de courts qui reste vide le jeudi soir. Elles servent ensuite à rendre des comptes : le rapport d’activité de l’assemblée générale, le bilan demandé par la commune, la partie « public touché » d’un dossier de subvention.`,
          `Les tableaux s’exportent pour être repris dans vos documents. Si votre club a pris l’assistant IA en option, il peut aussi rédiger un premier jet des parties chiffrées à partir de ces statistiques, que vous relisez. Pour aller plus loin sur les financements, lisez notre guide [financer le numérique de son club](/clubs-de-tennis/guides/financer-le-numerique-du-club).`,
        ],
      },
      {
        id: 'categorie-du-club',
        titre: `Les statistiques et la catégorie tarifaire du club`,
        paragraphes: [
          `Le prix de l’abonnement dépend du nombre de licenciés de la saison en cours, tennis, padel et pickleball compris. La catégorie est établie sur justificatif (un export ADOC ou un rapport d’assemblée générale avec les trois dernières saisons) et revue une fois par an, au renouvellement.`,
          `Les statistiques du logiciel ne servent pas à vous facturer en cours de saison : elles sont à vous. Pour connaître votre catégorie et le prix correspondant, utilisez le [simulateur](/clubs-de-tennis/simulateur).`,
        ],
      },
      {
        id: 'limites-statistiques',
        titre: `Ce que les statistiques ne disent pas`,
        paragraphes: [
          `Elles ne valent que ce que valent les données saisies : un appel non fait à l’école de tennis laisse une assiduité inconnue, une réservation non enregistrée n’apparaît pas dans l’occupation des courts. L’occupation des courts suppose d’ailleurs le planning, et pour les créneaux des membres, l’option réservation.`,
          `Elles ne remplacent pas les chiffres officiels de la Fédération : pour le nombre de licenciés reconnu au niveau fédéral, ADOC fait foi. Et elles ne comparent pas votre club à d’autres clubs : chaque club ne voit que ses propres données.`,
        ],
      },
    ],
    faq: [
      { q: `Faut-il saisir quelque chose de plus pour avoir les statistiques ?`, a: `Non. Elles se calculent à partir de ce que le club fait déjà dans le logiciel : adhésions, appels, matchs, réservations.` },
      { q: `Peut-on comparer avec les saisons d’avant ?`, a: `Oui, pour les saisons enregistrées dans le logiciel. L’historique des saisons antérieures peut être repris à la mise en place, depuis votre source de données.` },
      { q: `Peut-on exporter les chiffres ?`, a: `Oui, sous forme de tableau, pour l’assemblée générale ou un dossier de subvention. Le club peut aussi exporter toutes ses données à tout moment.` },
      { q: `Les chiffres sont-ils les mêmes que ceux d’ADOC ?`, a: `Ils sont proches si vos fichiers sont à jour, mais pour les licenciés reconnus par la Fédération, ADOC fait foi.` },
      { q: `Qui peut voir les statistiques ?`, a: `Les personnes du bureau à qui vous en donnez le droit. Les adhérents n’y ont pas accès.` },
      { q: `Les statistiques de visite du site sont-elles comprises ?`, a: `Oui, dans la formule site : des statistiques de fréquentation respectueuses de la vie privée.` },
    ],
    liens: [
      { href: '/clubs-de-tennis/fonctionnalites/assistant-ia', nom: 'Assistant IA du club' },
      { href: '/clubs-de-tennis/fonctionnalites/ecole-de-tennis', nom: 'École de tennis' },
      { href: '/clubs-de-tennis/fonctionnalites/import-export-adoc', nom: 'Import et export des fichiers ADOC' },
      { href: '/clubs-de-tennis/logiciel-de-gestion', nom: 'Le logiciel du bureau' },
      { href: '/clubs-de-tennis/guides/financer-le-numerique-du-club', nom: 'Guide : financer le numérique de son club' },
      { href: '/clubs-de-tennis/simulateur', nom: 'Simulateur de prix' },
    ],
    maj: '2026-10-29',
  },
]
