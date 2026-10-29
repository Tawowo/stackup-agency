/**
 * PAGES « SPORTS » DE L'OFFRE CLUBS DE TENNIS — ce qui change pour un club de tennis qui a une section padel
 * ou pickleball. Rester factuel sur ces sports : rien de réglementaire, aucun chiffre.
 */
import type { PageClub } from '../types'
import { DEMO } from '@/config/offre-clubs'

const PADEL: PageClub = {
  slug: 'padel',
  chemin: '/clubs-de-tennis/padel',
  famille: 'sport',
  titre: `Un club de tennis avec une section padel : un seul site et un seul logiciel pour les deux`,
  etiquette: `Sport · Padel`,
  reponse: `Si votre club de tennis a ouvert une section padel, vous n’avez pas besoin d’un deuxième outil. Le site lui consacre ses pages, le logiciel gère les adhérents, les créneaux et la communication de la section, et les licenciés padel comptent simplement dans la catégorie du club. La réservation des terrains en ligne est une option.`,
  titleSeo: `Site et logiciel pour club de tennis avec section padel`,
  descriptionSeo: `Section padel dans un club de tennis : pages dédiées sur le site, adhérents, créneaux, réservation en option, communication ciblée. Démo en ligne.`,
  motCle: 'site et logiciel club de padel',
  motsCles: [
    'logiciel section padel club de tennis',
    'site internet section padel',
    'réservation terrain de padel club associatif',
    'gestion adhérents tennis et padel',
    'communication section padel club',
  ],
  capture: 'site-reserver',
  demo: [
    { libelle: `Réserver un terrain sur le site`, url: DEMO.page('/reserver') },
    { libelle: `Les règles de réservation du bureau`, url: DEMO.role('presidente', '/bureau/reservations') },
    { libelle: `Réserver depuis l’espace membre`, url: DEMO.role('membre', '/espace/reserver') },
  ],
  tarif: {
    formule: 'pack',
    option: 'reservation-courts',
    texte: `Aucun supplément pour le padel : le prix suit la catégorie du club, licenciés padel compris. Exemple type, catégorie Petit en pack : à partir de {{club:pack:petit:mise}} € de mise en place et {{club:pack:petit:mois}} € par mois. La réservation en ligne s’ajoute à partir de {{club:option:reservation-courts:mise}} € puis {{club:option:reservation-courts:mois}} € par mois.`,
  },
  sections: [
    {
      id: 'ce-qui-change',
      titre: `Ce qui change quand un club de tennis ouvre le padel`,
      paragraphes: [
        `Le padel se joue le plus souvent à quatre, sur un terrain plus petit qu’un court de tennis et entouré de parois. Pour le bureau, cela veut dire de nouveaux terrains à partager, des joueurs qui ne viennent parfois que pour le padel, des créneaux plus demandés à certaines heures, et une section qui veut ses propres informations.`,
        `La tentation est d’ajouter un outil de plus pour la section. C’est là que les choses se compliquent : deux fichiers d’adhérents, deux listes de diffusion, un planning des courts qui ne voit pas les terrains de padel. {{produit}} garde tout au même endroit : un seul club, plusieurs pratiques.`,
      ],
    },
    {
      id: 'categorie-et-licencies',
      titre: `Les licenciés padel comptent dans la catégorie du club`,
      paragraphes: [
        `Le prix de {{produit}} dépend de la catégorie du club, fixée d’après ses licenciés FFT de la saison en cours, **tennis, padel et pickleball compris**. Il n’y a pas de tarif à part pour la section padel.`,
        `On compte des licenciés, pas des pratiques : un adhérent qui joue au tennis et au padel avec une seule licence compte une fois. La FFT délivre des licences qui couvrent aussi le padel et le pickleball ; pour les règles précises de licence, référez-vous à la fédération. Le justificatif reste le même : un export ADOC ou le rapport d’assemblée générale avec les 3 dernières saisons. La catégorie est revue une fois par an, au renouvellement.`,
      ],
    },
    {
      id: 'pages-padel-sur-le-site',
      titre: `Des pages padel sur le site du club`,
      paragraphes: [
        `Les sections padel et pickleball font partie du [site du club](/clubs-de-tennis/site-internet). La section padel peut avoir sa page de présentation, ses tarifs, ses créneaux, ses actualités et ses photos, dans le même thème que le reste du site.`,
        `Avec l’éditeur, le responsable de la section met à jour sa page lui-même : un nouveau créneau, une soirée découverte, un résultat. Le design ne peut pas être cassé, et le bureau n’a pas à tout relire. La page « essai gratuit » sert aussi pour le padel : beaucoup de joueurs veulent essayer avant d’adhérer.`,
      ],
    },
    {
      id: 'adherents-et-adhesions',
      titre: `Adhérents et adhésions : une seule fiche par personne`,
      paragraphes: [
        `Dans le [logiciel du bureau](/clubs-de-tennis/logiciel-de-gestion), chaque adhérent a une fiche, et ses pratiques y sont notées : tennis, padel, ou les deux. Le bureau voit d’un coup d’œil qui joue à quoi, sans tenir une deuxième liste.`,
        `Si votre club a une formule d’adhésion propre au padel, elle figure parmi les tarifs du formulaire en ligne. Le paiement passe par HelloAsso et l’argent arrive directement sur le compte du club. Les licences manquantes sont repérées pour les joueurs de padel comme pour les autres, grâce à l’**import et export des fichiers ADOC**.`,
      ],
    },
    {
      id: 'creneaux-et-reservation',
      titre: `Créneaux et réservation des terrains de padel`,
      paragraphes: [
        `Le planning global des courts et des activités, compris dans le logiciel, montre les terrains de padel à côté des courts de tennis. Les créneaux réservés à la section, aux cours ou à une animation y apparaissent comme le reste.`,
        `La [réservation de courts en ligne](/clubs-de-tennis/fonctionnalites/reservation-de-courts) est une option. Le club fixe ses règles, et elles peuvent être différentes pour les terrains de padel : durée d’un créneau, délai pour réserver, invités autorisés. Dans la démo, par exemple, le padel est réglé sur des créneaux d’une heure et demie ; c’est un réglage, pas une règle imposée.`,
        `La gestion des accès physiques aux terrains (codes, serrures) n’est pas proposée.`,
      ],
    },
    {
      id: 'groupes-et-animations',
      titre: `Cours, groupes et animations de padel`,
      paragraphes: [
        `Si votre club propose des cours collectifs de padel, ils se gèrent comme les autres groupes : liste des inscrits, appel sur téléphone par l’enseignant, annulation et report. Les soirées, les tournois internes ou les journées découverte se créent comme des événements, avec inscriptions en ligne.`,
        `Le bénévolat aussi : une animation padel demande souvent du monde pour l’accueil ou la buvette, et les missions s’ouvrent aux inscriptions comme pour le reste du club.`,
      ],
    },
    {
      id: 'challenge',
      titre: `Et le Challenge interne ?`,
      paragraphes: [
        `Le [Challenge interne](/clubs-de-tennis/fonctionnalites/challenge-interne) est pensé pour le tennis : classement, badges, saisie des matchs au format FFT. Si votre section padel souhaite son propre classement, parlons-en au premier échange. Selon ce que vous voulez, cela peut passer par un tournoi interne ou par un développement propre au club, chiffré avant à {{club:dev-heure}} € de l’heure.`,
      ],
    },
    {
      id: 'communication',
      titre: `Écrire à la section padel, et seulement à elle`,
      paragraphes: [
        `Avec la [communication](/clubs-de-tennis/fonctionnalites/communication) du logiciel, vous choisissez à qui vous écrivez : tout le club, ou seulement les joueurs de padel. Un e-mail et une notification sur le téléphone suffisent pour annoncer un créneau libéré ou une soirée. Il n’y a pas de SMS ; si la section a son groupe de messagerie, elle le garde.`,
      ],
    },
    {
      id: 'plusieurs-lieux',
      titre: `Des terrains de padel sur un autre site ?`,
      paragraphes: [
        `Si la section padel joue sur un autre lieu que les courts de tennis, ou si vous voulez la gérer à part dans le même club, l’option « plusieurs lieux ou sections » existe : à partir de {{club:option:plusieurs-lieux:mise}} € puis {{club:option:plusieurs-lieux:mois}} € par mois. Pour un club où tout est au même endroit, elle n’est pas nécessaire.`,
      ],
    },
  ],
  faq: [
    {
      q: `Faut-il payer en plus pour la section padel ?`,
      a: `Non. Les licenciés padel comptent dans la catégorie du club, avec ceux du tennis et du pickleball. Seules les options, comme la réservation en ligne, s’ajoutent si vous les choisissez.`,
    },
    {
      q: `Notre section padel peut-elle avoir son propre site ?`,
      a: `Elle a ses pages dans le site du club, avec le même thème. Un site entièrement séparé n’est pas prévu ; c’est à discuter sur devis.`,
    },
    {
      q: `Les joueurs peuvent-ils réserver un terrain de padel en ligne ?`,
      a: `Oui, avec l’option réservation de courts. Le club règle la durée des créneaux, le délai et les invités, terrain par terrain.`,
    },
    {
      q: `Le logiciel gère-t-il les licences padel ?`,
      a: `Les licences se prennent dans ADOC. Le logiciel propose l’import et export des fichiers ADOC et repère les adhérents sans licence, padel compris.`,
    },
    {
      q: `Peut-on envoyer un message uniquement aux joueurs de padel ?`,
      a: `Oui, par e-mail et notification sur le téléphone. Il n’y a pas de SMS.`,
    },
    {
      q: `Proposez-vous la gestion des portes ou des codes d’accès aux terrains ?`,
      a: `Non, la gestion des accès physiques aux courts n’est pas proposée.`,
    },
  ],
  liens: [
    { href: '/clubs-de-tennis', nom: `Site et logiciel pour clubs de tennis` },
    { href: '/clubs-de-tennis/pickleball', nom: `Clubs avec pickleball` },
    { href: '/clubs-de-tennis/fonctionnalites/reservation-de-courts', nom: `Réservation de courts`, note: `Option` },
    { href: '/clubs-de-tennis/guides/ouvrir-une-section-padel-ou-pickleball', nom: `Ouvrir une section padel ou pickleball` },
    { href: '/clubs-de-tennis/site-internet', nom: `Le site du club` },
    { href: '/clubs-de-tennis/logiciel-de-gestion', nom: `Le logiciel du bureau` },
    { href: '/clubs-de-tennis/simulateur', nom: `Simulateur de prix` },
  ],
  maj: '2026-10-29',
}

const PICKLEBALL: PageClub = {
  slug: 'pickleball',
  chemin: '/clubs-de-tennis/pickleball',
  famille: 'sport',
  titre: `Le pickleball dans un club de tennis : accueillir une nouvelle section sans un outil de plus`,
  etiquette: `Sport · Pickleball`,
  reponse: `Le pickleball arrive souvent dans un club de tennis par quelques séances de découverte, puis par des créneaux réguliers. {{produit}} suit ce chemin : une page sur le site, des séances avec inscriptions, des courts partagés visibles dans le planning, une communication réservée à la section. Les licenciés pickleball comptent dans la catégorie du club.`,
  titleSeo: `Logiciel club de pickleball dans un club de tennis`,
  descriptionSeo: `Pickleball dans un club de tennis : page de section, séances découverte, courts partagés au planning, messages ciblés. Licenciés compris dans la catégorie.`,
  motCle: 'logiciel club de pickleball',
  motsCles: [
    'section pickleball club de tennis',
    'site internet pickleball club',
    'organiser des séances de pickleball',
    'réservation court pickleball',
    'gestion adhérents tennis et pickleball',
  ],
  capture: 'bureau-communication',
  demo: [
    { libelle: `Écrire à une section depuis le bureau`, url: DEMO.role('secretaire', '/bureau/communication') },
    { libelle: `Le planning des courts et des activités`, url: DEMO.role('presidente', '/bureau/planning') },
    { libelle: `La page d’essai gratuit du site`, url: DEMO.page('/essai-gratuit') },
  ],
  tarif: {
    formule: 'logiciel',
    texte: `Pas de tarif à part pour le pickleball : le prix suit la catégorie du club. Exemple type, catégorie Mini, logiciel seul : à partir de {{club:logiciel:mini:mise}} € de mise en place et {{club:logiciel:mini:mois}} € par mois. Avec le site, le pack retire {{club:remise-pack}} % aux deux.`,
  },
  etapes: [
    {
      titre: `Présenter le pickleball sur le site`,
      texte: `Une page de section explique le jeu en quelques phrases, donne les horaires et le contact du responsable.`,
    },
    {
      titre: `Ouvrir des séances découverte`,
      texte: `Chaque séance est un événement avec inscriptions en ligne, visible dans l’agenda abonnable du site.`,
    },
    {
      titre: `Installer des créneaux réguliers`,
      texte: `Quand la section prend, les créneaux entrent dans le planning global, à côté du tennis.`,
    },
    {
      titre: `Accueillir les nouveaux adhérents`,
      texte: `L’adhésion en ligne enregistre la pratique de chacun, et la section reçoit ses propres messages.`,
    },
  ],
  sections: [
    {
      id: 'ce-qui-change',
      titre: `Ce qui change pour le bureau quand le pickleball arrive`,
      paragraphes: [
        `Le pickleball se joue avec une raquette pleine, appelée paddle, et une balle en plastique perforée, sur un terrain plus petit qu’un court de tennis, en simple ou en double. Ses lignes sont parfois tracées sur un court de tennis ou dans une salle. Pour un club, c’est une activité qui peut démarrer avec peu de matériel, sur des installations existantes.`,
        `C’est aussi une activité qui peut amener un nouveau public : des adultes qui découvrent la raquette, des joueurs qui reprennent une activité. Pour le bureau, cela veut dire des personnes à accueillir, des créneaux à caser sur des courts déjà occupés, et une section qui a besoin d’être visible sans prendre la place du tennis.`,
      ],
    },
    {
      id: 'categorie-et-licencies',
      titre: `Les licenciés pickleball comptent dans la catégorie`,
      paragraphes: [
        `La catégorie de {{produit}} se calcule sur les licenciés FFT de la saison en cours, **tennis, padel et pickleball compris**. La FFT délivre des licences qui couvrent aussi le padel et le pickleball ; pour le détail des licences, la référence reste la fédération.`,
        `Une section qui démarre ne change pas forcément la catégorie du club. Et si elle grandit, la catégorie n’est revue qu’une fois par an, au renouvellement, sur la base d’un export ADOC ou du rapport d’assemblée générale avec les 3 dernières saisons. Pas de surprise en cours de saison.`,
      ],
    },
    {
      id: 'page-de-section',
      titre: `Une page pickleball sur le site du club`,
      paragraphes: [
        `Le [site du club](/clubs-de-tennis/site-internet) comprend des sections padel et pickleball. La page pickleball peut expliquer le jeu à quelqu’un qui n’en a jamais entendu parler, montrer des photos de séances (dans le respect du droit à l’image), donner les horaires et le nom du responsable.`,
        `Le responsable de la section la tient à jour lui-même avec l’éditeur. La page « essai gratuit » du site sert aussi au pickleball : c’est souvent par là qu’un curieux fait le premier pas.`,
      ],
    },
    {
      id: 'courts-partages',
      titre: `Des courts partagés entre tennis et pickleball`,
      paragraphes: [
        `Quand les lignes de pickleball sont tracées sur un court de tennis, ce court ne peut pas servir aux deux en même temps. Le planning global des courts et des activités, compris dans le [logiciel du bureau](/clubs-de-tennis/logiciel-de-gestion), montre qui occupe quoi, quelle que soit l’activité. Le bureau voit tout de suite si une séance de pickleball tombe sur un créneau de l’école de tennis.`,
        `Si vous prenez l’option [réservation de courts](/clubs-de-tennis/fonctionnalites/reservation-de-courts), à partir de {{club:option:reservation-courts:mise}} € puis {{club:option:reservation-courts:mois}} € par mois, le club fixe ses règles court par court : durée, délai pour réserver, invités.`,
      ],
    },
    {
      id: 'seances-et-groupes',
      titre: `Séances découverte, groupes et animations`,
      paragraphes: [
        `Une séance découverte se crée comme un événement, avec inscriptions en ligne et un nombre de places. Elle apparaît dans l’agenda du site, que les adhérents peuvent ajouter à celui de leur téléphone.`,
        `Quand les séances deviennent régulières, elles peuvent être organisées en groupes, avec la liste des inscrits et l’appel sur téléphone. Un petit tournoi interne de pickleball se prépare avec les [tournois internes](/clubs-de-tennis/fonctionnalites/tournois-internes). Le [Challenge interne](/clubs-de-tennis/fonctionnalites/challenge-interne), lui, est pensé pour le tennis ; un classement pickleball est à étudier ensemble, et s’il demande un développement, il est chiffré avant.`,
      ],
    },
    {
      id: 'communication',
      titre: `Une communication réservée à la section`,
      paragraphes: [
        `Les joueurs de pickleball n’ont pas besoin de recevoir les convocations des équipes de tennis, et inversement. La [communication](/clubs-de-tennis/fonctionnalites/communication) du logiciel permet d’écrire à la seule section pickleball, par e-mail et par notification sur le téléphone. Il n’y a pas de SMS. Pour les membres qui n’ont pas l’habitude des outils en ligne, l’e-mail reste le canal le plus simple.`,
      ],
    },
    {
      id: 'adherents',
      titre: `Une seule fiche, même pour ceux qui ne jouent qu’au pickleball`,
      paragraphes: [
        `Chaque adhérent a une fiche où ses pratiques sont notées. Un joueur qui ne vient que pour le pickleball est un adhérent du club comme un autre : il adhère en ligne, paie par HelloAsso, reçoit les informations de sa section et peut s’inscrire comme bénévole. Les licences manquantes sont repérées pour tout le monde, grâce à l’**import et export des fichiers ADOC**.`,
      ],
    },
  ],
  faq: [
    {
      q: `Le pickleball coûte-t-il un supplément ?`,
      a: `Non. Les licenciés pickleball comptent dans la catégorie du club, avec ceux du tennis et du padel.`,
    },
    {
      q: `Nos lignes de pickleball sont tracées sur un court de tennis : le logiciel le voit-il ?`,
      a: `Le planning global montre l’occupation de chaque court, quelle que soit l’activité. Le bureau voit donc qu’un court pris pour le pickleball n’est pas libre pour le tennis.`,
    },
    {
      q: `Comment organiser des séances découverte ?`,
      a: `Chaque séance se crée comme un événement, avec inscriptions en ligne et nombre de places, et apparaît dans l’agenda du site.`,
    },
    {
      q: `Peut-on écrire seulement aux joueurs de pickleball ?`,
      a: `Oui, par e-mail et notification sur le téléphone, depuis la communication du logiciel.`,
    },
    {
      q: `Y a-t-il un classement pickleball dans le Challenge ?`,
      a: `Le Challenge interne est pensé pour le tennis. Pour le pickleball, un tournoi interne est la solution la plus simple ; un classement dédié se discute et, s’il demande un développement, se chiffre avant.`,
    },
    {
      q: `Notre section pickleball débute. Faut-il prendre le logiciel tout de suite ?`,
      a: `Pas forcément. Une page sur le site et des séances avec inscriptions suffisent pour commencer. Le logiciel devient utile quand il faut gérer les adhérents, les créneaux et les messages de la section avec le reste du club.`,
    },
  ],
  liens: [
    { href: '/clubs-de-tennis', nom: `Site et logiciel pour clubs de tennis` },
    { href: '/clubs-de-tennis/padel', nom: `Clubs avec padel` },
    { href: '/clubs-de-tennis/guides/ouvrir-une-section-padel-ou-pickleball', nom: `Ouvrir une section padel ou pickleball` },
    { href: '/clubs-de-tennis/fonctionnalites/communication', nom: `Communication` },
    { href: '/clubs-de-tennis/fonctionnalites/tournois-internes', nom: `Tournois internes` },
    { href: '/clubs-de-tennis/logiciel-de-gestion', nom: `Le logiciel du bureau` },
    { href: '/clubs-de-tennis/simulateur', nom: `Simulateur de prix` },
  ],
  maj: '2026-10-29',
}

export const SPORTS: PageClub[] = [PADEL, PICKLEBALL]
