/**
 * PAGES LOCALES DE L'OFFRE CLUBS DE TENNIS — la région Centre-Val de Loire et ses six départements.
 * Chaque page a son angle propre (pas de page où seul le nom change). Distances depuis Savigné-sur-Lathan :
 * toujours approximatives (« environ »). Aucun chiffre de clubs ni de licenciés par territoire. Les instances
 * du tennis sont nommées de façon générique : nous ne parlons pas en leur nom.
 */
import type { PageClub } from '../types'
import { DEMO } from '@/config/offre-clubs'

const R = '/clubs-de-tennis'

const CENTRE_VAL_DE_LOIRE: PageClub = {
  slug: 'centre-val-de-loire',
  chemin: `${R}/centre-val-de-loire`,
  famille: 'local',
  titre: `Site et logiciel pour les clubs de tennis du Centre-Val de Loire`,
  etiquette: `Local · Région Centre-Val de Loire`,
  reponse: `{{produit}} est conçu en Touraine, à Savigné-sur-Lathan, pour les clubs de tennis associatifs de toute la région, sections padel et pickleball comprises. Dans les six départements, la démo se visite en ligne, le premier échange se fait en visio ou en présentiel, et le suivi passe par e-mail ou formulaire.`,
  titleSeo: `Logiciel club de tennis en Centre-Val de Loire`,
  descriptionSeo: `Site et logiciel pour les clubs de tennis du Centre-Val de Loire : Cher, Eure-et-Loir, Indre, Indre-et-Loire, Loir-et-Cher, Loiret. Démo en ligne, visio.`,
  motCle: 'logiciel club de tennis Centre-Val de Loire',
  motsCles: [
    'site club de tennis Centre-Val de Loire',
    'logiciel gestion club de tennis région Centre',
    'création site association sportive Centre-Val de Loire',
    'site club de tennis Orléans Tours Blois Bourges',
    'prestataire site club sportif Centre-Val de Loire',
  ],
  capture: 'bureau-journee',
  demo: [
    { libelle: `Choisir un rôle et visiter la démo`, url: DEMO.accueil },
    { libelle: `Voir le site du club fictif`, url: DEMO.site },
  ],
  sections: [
    {
      id: 'une-offre-nee-en-touraine',
      titre: `Une offre née en Touraine, pour toute la région`,
      paragraphes: [
        `Stackup Agency est installée à Savigné-sur-Lathan, en Indre-et-Loire, au nord-ouest de Tours. C’est là que {{produit}} a été pensé : le site d’un club et le logiciel de son bureau, connectés en direct. Le principe tient en une phrase : **ADOC gère l’administratif fédéral, {{produit}} fait vivre votre club.**`,
        `L’offre s’adresse aux clubs de tennis associatifs, quelle que soit leur taille, du club de village à la grande structure d’agglomération. Elle vaut de la même façon dans les six départements de la région. Ce qui change d’un département à l’autre, c’est surtout la distance, donc la façon de se rencontrer.`,
      ],
    },
    {
      id: 'organisation-du-tennis',
      titre: `Comment le tennis est organisé dans la région`,
      paragraphes: [
        `En France, le tennis associatif s’organise autour de la Fédération française de tennis. À l’échelle de la région, la ligue Centre-Val de Loire de tennis relaie la fédération ; dans chaque département, un comité départemental de tennis est au plus près des clubs. Parmi leurs missions habituelles : les compétitions par équipes, la formation, l’accompagnement des clubs.`,
        `{{produit}} ne remplace aucune de ces instances, ni ADOC, l’outil fédéral des licences. Il n’est ni affilié ni approuvé par la FFT. Il s’occupe de la vie du club : le site, les familles, l’école de tennis, les équipes, le Challenge interne, les bénévoles. Le lien avec ADOC passe par l’**import et export des fichiers ADOC**.`,
      ],
    },
    {
      id: 'six-departements',
      titre: `Les six départements, et la façon de se rencontrer`,
      paragraphes: [
        `Le premier rendez-vous en présentiel est gratuit jusqu’à {{club:km}} km de Savigné-sur-Lathan. Cela couvre une partie du nord-ouest de l’Indre-et-Loire. Partout ailleurs dans la région, le premier échange se fait en visio, ou en présentiel avec une indemnité de déplacement indiquée sur devis. Les distances ci-dessous sont approximatives, par la route, jusqu’à la préfecture.`,
      ],
      liste: [
        `[Indre-et-Loire](/clubs-de-tennis/indre-et-loire) : Tours, à environ 35 km. Le département de l’agence, et celui du club qui utilise la solution.`,
        `[Loir-et-Cher](/clubs-de-tennis/loir-et-cher) : Blois, à environ 90 km. Le département voisin, par la vallée de la Loire.`,
        `[Indre](/clubs-de-tennis/indre) : Châteauroux, à environ 150 km.`,
        `[Loiret](/clubs-de-tennis/loiret) : Orléans, préfecture de la région, à environ 150 km.`,
        `[Eure-et-Loir](/clubs-de-tennis/eure-et-loir) : Chartres, à environ 170 km.`,
        `[Cher](/clubs-de-tennis/cher) : Bourges, à environ 180 km.`,
      ],
    },
    {
      id: 'travailler-a-distance',
      titre: `Ce qui se fait très bien à distance`,
      paragraphes: [
        `Pour la plupart des clubs de la région, l’essentiel se fait sans déplacement, et sans perdre en qualité. La démo en ligne d’un club fictif, le Grand Chelem Tennis Club, se visite avec le rôle de votre choix : présidente, trésorier, enseignant, parent. Le bureau peut l’explorer avant même le premier échange.`,
        `La visio sert au premier rendez-vous et à la prise en main : partage d’écran, questions, démonstration sur vos propres données une fois importées. Les contenus du site s’envoient par e-mail. Le support répond par e-mail ou formulaire, sous {{club:support-jours}} jours ouvrés. Et l’éditeur du site est fait pour que le club n’ait pas besoin de nous au quotidien.`,
      ],
    },
    {
      id: 'ce-que-vous-pouvez-attendre',
      titre: `Ce qu’un club de la région peut attendre`,
      paragraphes: [`Où que soit votre club dans le Centre-Val de Loire :`],
      liste: [
        `les mêmes formules, les mêmes prix par catégorie et les mêmes conditions ;`,
        `des heures d’accompagnement incluses, en visio ou sur place selon la distance ;`,
        `des délais indicatifs, sans date de livraison promise, qui dépendent surtout du temps de rassembler vos contenus ;`,
        `un seul interlocuteur, Mathéo Reboul, du premier échange au support ;`,
        `si vous voulez être mieux trouvé dans votre commune ou dans votre département, les options Référencement Local et Référencement Régional, sans promesse de position.`,
      ],
    },
    {
      id: 'reference',
      titre: `Un club de la région utilise déjà la solution`,
      paragraphes: [
        `Le Tennis Club Savigné Gizeux (TCSG), en Indre-et-Loire, utilise {{produit}}. Par transparence : Mathéo Reboul, fondateur de Stackup Agency, est vice-président de ce club. Les détails sont sur la [page Indre-et-Loire](/clubs-de-tennis/indre-et-loire).`,
      ],
    },
  ],
  faq: [
    {
      q: `Travaillez-vous avec des clubs en dehors de l’Indre-et-Loire ?`,
      a: `Oui, dans toute la région et au-delà. Hors du rayon de {{club:km}} km autour de Savigné-sur-Lathan, le premier rendez-vous se fait en visio, ou en présentiel avec une indemnité sur devis.`,
    },
    {
      q: `Les prix changent-ils selon le département ?`,
      a: `Non. Le prix dépend de la catégorie du club (ses licenciés FFT de la saison en cours) et des options, pas de sa localisation. Seul un déplacement au-delà de {{club:km}} km s’ajoute, sur devis, si vous le souhaitez.`,
    },
    {
      q: `Êtes-vous partenaires de la ligue ou des comités départementaux ?`,
      a: `Non. {{produit}} n’est ni affilié ni approuvé par la FFT, et nous ne parlons au nom d’aucune instance du tennis.`,
    },
    {
      q: `Peut-on tout faire en visio ?`,
      a: `Oui : premier échange, prise en main et questions. La démo se visite en ligne, les contenus s’envoient par e-mail, le support répond par e-mail ou formulaire.`,
    },
    {
      q: `Combien de temps faut-il pour démarrer ?`,
      a: `Le délai est indicatif et dépend surtout du club : le temps de réunir les textes, les photos et les fichiers. Nous ne promettons pas de date fixe.`,
    },
    {
      q: `Notre club a une section padel. Est-ce pris en compte ?`,
      a: `Oui. Les licenciés padel et pickleball comptent dans la catégorie, et le site comprend des pages de section. Voir [les clubs avec padel](/clubs-de-tennis/padel).`,
    },
  ],
  liens: [
    { href: `${R}/indre-et-loire`, nom: `Indre-et-Loire` },
    { href: `${R}/loir-et-cher`, nom: `Loir-et-Cher` },
    { href: `${R}/loiret`, nom: `Loiret` },
    { href: `${R}/cher`, nom: `Cher` },
    { href: `${R}/indre`, nom: `Indre` },
    { href: `${R}/eure-et-loir`, nom: `Eure-et-Loir` },
    { href: R, nom: `Site et logiciel pour clubs de tennis` },
    { href: `${R}/simulateur`, nom: `Simulateur de prix` },
  ],
  maj: '2026-10-29',
}

const INDRE_ET_LOIRE: PageClub = {
  slug: 'indre-et-loire',
  chemin: `${R}/indre-et-loire`,
  famille: 'local',
  titre: `Site et logiciel pour les clubs de tennis d’Indre-et-Loire, conçus en Touraine`,
  etiquette: `Local · Indre-et-Loire (37)`,
  reponse: `{{produit}} est conçu à Savigné-sur-Lathan, au nord-ouest de Tours, et il est utilisé par un club du département, le Tennis Club Savigné Gizeux. Pour un club de tennis d’Indre-et-Loire, cela veut dire un interlocuteur proche, un premier rendez-vous en présentiel gratuit jusqu’à {{club:km}} km, et ailleurs dans le département une visio ou un déplacement sur devis.`,
  titleSeo: `Site et logiciel club de tennis en Indre-et-Loire (37)`,
  descriptionSeo: `Site et logiciel pour club de tennis en Indre-et-Loire, conçus à Savigné-sur-Lathan. Rendez-vous en présentiel, démo en ligne, prix par catégorie.`,
  motCle: 'site club de tennis Indre-et-Loire',
  motsCles: [
    'site club de tennis Tours',
    'logiciel club de tennis Indre-et-Loire',
    'création site association sportive Indre-et-Loire',
    'logiciel gestion club de tennis Tours',
    'site internet club de tennis Touraine',
    'site club de tennis Joué-lès-Tours',
    'logiciel club de tennis Chinon Loches Amboise',
  ],
  capture: 'site-accueil',
  demo: [
    { libelle: `Voir le site du club fictif`, url: DEMO.site },
    { libelle: `Ouvrir « Ma journée » de la présidente`, url: DEMO.role('presidente') },
    { libelle: `Essayer en tant que parent`, url: DEMO.role('parent') },
  ],
  etapes: [
    {
      titre: `Vous nous écrivez`,
      texte: `Par le [formulaire de contact](/contact), avec le nom et la commune du club. Nous vous répondons pour fixer un premier échange.`,
    },
    {
      titre: `Nous calculons la distance`,
      texte: `Par la route, depuis Savigné-sur-Lathan jusqu’au club. Jusqu’à {{club:km}} km, le premier rendez-vous en présentiel est gratuit.`,
    },
    {
      titre: `Le premier rendez-vous`,
      texte: `Au club, en présentiel, ou en visio si vous préférez ou si le club est plus loin. Au-delà de {{club:km}} km, un déplacement reste possible avec une indemnité indiquée sur devis.`,
    },
    {
      titre: `Le devis, puis la mise en place`,
      texte: `Selon votre catégorie et vos options. Le délai est indicatif ; la prise en main se fait avec les heures d’accompagnement incluses.`,
    },
  ],
  sections: [
    {
      id: 'concu-en-touraine',
      titre: `Un outil conçu en Indre-et-Loire`,
      paragraphes: [
        `Stackup Agency est une entreprise individuelle installée à Savigné-sur-Lathan, dans le nord-ouest du département, entre Château-la-Vallière, Langeais, Cinq-Mars-la-Pile et Bourgueil. Vous parlez toujours à la même personne : Mathéo Reboul, qui conçoit, installe et suit {{produit}}. Pour en savoir plus, voir [la page À propos](/a-propos).`,
        `Pour un club tourangeau, cette proximité a un intérêt concret. On peut se voir au club, regarder ensemble les courts, le club-house, le tableau d’affichage, les classeurs du secrétariat. On comprend mieux un club quand on l’a vu, et le bureau met plus facilement un visage sur la personne qui gère son site.`,
      ],
    },
    {
      id: 'tcsg',
      titre: `Le Tennis Club Savigné Gizeux utilise la solution`,
      paragraphes: [
        `Le Tennis Club Savigné Gizeux (TCSG), le club de Savigné-sur-Lathan, Gizeux et Cléré-les-Pins, utilise {{produit}}. Nous préférons le dire clairement : **Mathéo Reboul, fondateur de Stackup Agency, est vice-président du TCSG.** Ce n’est donc pas un client comme un autre, et nous ne le présentons pas comme un avis indépendant.`,
        `Ce que cela apporte malgré tout : la solution n’a pas été pensée dans un bureau loin des courts. Elle sert un vrai club associatif du département, avec ses bénévoles, ses réinscriptions, son école de tennis et ses équipes. Les besoins d’un bureau de club, nous les vivons de l’intérieur. Nous ne publions aucune citation du club : il n’en existe pas, et nous n’en inventerons pas.`,
      ],
    },
    {
      id: 'rendez-vous-en-presentiel',
      titre: `Un premier rendez-vous en présentiel, gratuit jusqu’à {{club:km}} km`,
      paragraphes: [
        `Le premier rendez-vous en présentiel est gratuit jusqu’à {{club:km}} km de Savigné-sur-Lathan. Plusieurs communes proches sont dans ce rayon, par exemple Langeais, Château-la-Vallière, Hommes, Rillé, Gizeux, Continvoir, Mazières-de-Touraine ou Cléré-les-Pins.`,
        `Tours est à environ 35 km : un peu au-delà de la limite. Pour un club de Tours, de son agglomération, ou plus loin dans le département, le premier échange se fait en visio, ou au club avec une indemnité de déplacement indiquée sur devis avant de venir. Pour toute autre commune, nous calculons la distance réelle par la route avant de vous répondre, plutôt que de l’estimer au jugé.`,
        `La visio n’est pas un pis-aller : elle suffit souvent pour un premier échange, surtout si le bureau a déjà parcouru la démo. Et pour un club proche, rien n’empêche de se revoir sur place pour la prise en main, dans le cadre des heures d’accompagnement incluses ; les heures au-delà sont à {{club:heure}} € de l’heure.`,
      ],
    },
    {
      id: 'un-rendez-vous-au-club',
      titre: `Comment se passe un rendez-vous au club`,
      paragraphes: [
        `Un premier rendez-vous ne vous engage à rien. Il sert à comprendre comment le bureau travaille aujourd’hui et ce qui lui pèse le plus. Nous regardons ensemble, si vous le voulez bien, votre site actuel, le tableur des adhérents, la grille des tarifs, l’organisation de l’école de tennis et la façon dont les équipes sont convoquées.`,
        `Nous parcourons aussi la démo en ligne sur grand écran ou sur un téléphone, rôle par rôle : la présidente, le trésorier, un enseignant, un parent. C’est souvent là que les questions concrètes arrivent : « et pour les familles avec trois enfants ? », « et si un parent n’a pas d’adresse e-mail ? ».`,
        `Il est utile d’avoir sous la main un export ADOC récent ou le rapport de la dernière assemblée générale : il fixe la catégorie du club, donc le prix. À l’issue du rendez-vous, vous recevez un devis écrit ; rien ne démarre sans votre accord.`,
      ],
    },
    {
      id: 'tennis-en-indre-et-loire',
      titre: `Le tennis en Indre-et-Loire : qui fait quoi`,
      paragraphes: [
        `Les clubs du département sont affiliés à la Fédération française de tennis. Le comité départemental de tennis d’Indre-et-Loire est l’instance la plus proche d’eux ; la ligue Centre-Val de Loire de tennis intervient à l’échelle de la région. On les retrouve notamment autour des championnats par équipes, de la formation et de l’accompagnement des clubs.`,
        `{{produit}} n’a pas de lien avec ces instances : il n’est ni affilié ni approuvé par la FFT. Il ne s’occupe pas des licences, qui restent dans ADOC, mais de tout le reste : le site, les familles, l’école de tennis, les équipes engagées dans les championnats, le Challenge interne. Le lien avec ADOC passe par l’**import et export des fichiers ADOC**, qui permet aussi de repérer les adhérents sans licence.`,
      ],
    },
    {
      id: 'communes',
      titre: `Les principales communes du département`,
      paragraphes: [
        `L’Indre-et-Loire est traversée par la Loire, le Cher, l’Indre et la Vienne. Sa préfecture est Tours ; ses deux sous-préfectures sont Chinon et Loches. Voici, par secteur, les principales communes où se trouvent des clubs de toutes tailles.`,
      ],
      sous: [
        {
          titre: `Tours et son agglomération`,
          paragraphes: [
            `Tours, Joué-lès-Tours, Saint-Cyr-sur-Loire, Saint-Pierre-des-Corps, Saint-Avertin, Chambray-lès-Tours, Fondettes, La Riche, Ballan-Miré. Les clubs y sont souvent plus grands, avec une école de tennis importante, plusieurs équipes engagées et parfois une section padel. Le logiciel du bureau y prend tout son sens : appel sur téléphone, convocations, suivi des dossiers.`,
          ],
        },
        {
          titre: `La vallée de la Loire`,
          paragraphes: [
            `Amboise et Montlouis-sur-Loire à l’est de Tours ; Langeais et Bourgueil à l’ouest, près de Savigné-sur-Lathan. Des clubs de taille moyenne, souvent fortement liés à la vie de leur commune, pour qui le site est la vitrine principale.`,
          ],
        },
        {
          titre: `Le sud et l’est du département`,
          paragraphes: [
            `Chinon, sur la Vienne ; Loches, sur l’Indre ; Bléré, sur le Cher. Des clubs qui rayonnent sur les communes autour et dont les adhérents viennent parfois de loin : l’adhésion et le paiement en ligne évitent des allers-retours.`,
          ],
        },
        {
          titre: `Le nord du département`,
          paragraphes: [
            `Château-Renault au nord-est, Château-la-Vallière au nord-ouest. Des clubs plus petits, souvent tenus par une poignée de bénévoles, pour qui la catégorie Mini ou Petit et le site seul suffisent parfois pour commencer.`,
          ],
        },
      ],
    },
    {
      id: 'quelle-formule',
      titre: `Club d’agglomération ou club de village : quelle formule ?`,
      paragraphes: [
        `Un club de village qui veut surtout être trouvé et prendre les adhésions en ligne peut commencer par [le site](/clubs-de-tennis/site-internet) : à partir de {{club:site:mini:mise}} € de mise en place et {{club:site:mini:mois}} € par mois en catégorie Mini. Un club de l’agglomération tourangelle avec une grosse école de tennis et plusieurs équipes aura plutôt intérêt au pack, qui réunit le site et [le logiciel du bureau](/clubs-de-tennis/logiciel-de-gestion) avec {{club:remise-pack}} % de remise.`,
        `Exemple type, club de la catégorie Grand ({{club:min:grand}} à {{club:max:grand}} licenciés) : le pack revient à partir de {{club:pack:grand:mise}} € de mise en place et {{club:pack:grand:mois}} € par mois, soit environ {{club:par-licencie:grand}} € par licencié et par an pour un club type de {{club:licencies-type:grand}} licenciés. Pour votre cas précis : [le simulateur](/clubs-de-tennis/simulateur).`,
      ],
    },
    {
      id: 'ce-que-vous-pouvez-attendre',
      titre: `Ce qu’un club d’Indre-et-Loire peut attendre`,
      paragraphes: [`Concrètement, pour un club du département :`],
      liste: [
        `un premier rendez-vous en présentiel gratuit dans un rayon de {{club:km}} km autour de Savigné-sur-Lathan, et ailleurs une visio ou un déplacement sur devis ;`,
        `la possibilité de faire la prise en main au club, avec les heures d’accompagnement incluses ;`,
        `un délai indicatif, établi avec vous, sans date de livraison promise ;`,
        `un support par e-mail ou formulaire, avec une réponse sous {{club:support-jours}} jours ouvrés ;`,
        `pour être mieux trouvé à Tours, à Chinon ou dans votre commune, l’option Référencement Local ; à l’échelle du département, le Référencement Régional. Aucune position n’est promise.`,
      ],
    },
  ],
  faq: [
    {
      q: `Pouvez-vous venir au club pour le premier rendez-vous ?`,
      a: `Oui. C’est gratuit jusqu’à {{club:km}} km de Savigné-sur-Lathan. Au-delà, nous venons avec une indemnité de déplacement indiquée sur devis, ou nous faisons le rendez-vous en visio.`,
    },
    {
      q: `Notre club est à Tours : le premier rendez-vous est-il gratuit en présentiel ?`,
      a: `Tours est à environ 35 km de Savigné-sur-Lathan, donc un peu au-delà de {{club:km}} km. Le premier échange se fait en visio, ou au club avec une indemnité annoncée sur devis.`,
    },
    {
      q: `Quel est votre lien avec le TCSG ?`,
      a: `Le Tennis Club Savigné Gizeux utilise la solution, et Mathéo Reboul, fondateur de Stackup Agency, en est vice-président. Nous le disons par transparence.`,
    },
    {
      q: `Êtes-vous en lien avec le comité départemental de tennis ?`,
      a: `Non. Nous n’avons pas de lien avec le comité départemental ni avec la ligue, et {{produit}} n’est ni affilié ni approuvé par la FFT.`,
    },
    {
      q: `Un club d’Indre-et-Loire paie-t-il moins cher ?`,
      a: `Non : les prix sont les mêmes partout. La proximité joue sur la façon de se rencontrer, pas sur le tarif.`,
    },
    {
      q: `Pouvez-vous reprendre le contenu de notre ancien site ?`,
      a: `Oui, en option : {{club:option:reprise-contenu:mise}} € par page reprise. Si vous préférez que nous rédigions une page à partir de vos informations, c’est {{club:option:redaction-page:mise}} € par page.`,
    },
    {
      q: `Pouvez-vous former les enseignants du club sur place ?`,
      a: `Oui, si le club est proche, dans le cadre des heures d’accompagnement incluses. Au-delà de ces heures, c’est {{club:heure}} € de l’heure, et un déplacement au-delà de {{club:km}} km s’ajoute sur devis.`,
    },
  ],
  liens: [
    { href: `${R}/centre-val-de-loire`, nom: `Centre-Val de Loire`, note: `Toute la région` },
    { href: `${R}/loir-et-cher`, nom: `Loir-et-Cher`, note: `Département voisin` },
    { href: `${R}/indre`, nom: `Indre`, note: `Département voisin` },
    { href: R, nom: `Site et logiciel pour clubs de tennis` },
    { href: `${R}/simulateur`, nom: `Simulateur de prix` },
    { href: `${R}/demo`, nom: `La démo` },
    { href: '/contact', nom: `Prendre rendez-vous` },
  ],
  maj: '2026-10-29',
}

const CHER: PageClub = {
  slug: 'cher',
  chemin: `${R}/cher`,
  famille: 'local',
  titre: `Site et logiciel pour les clubs de tennis du Cher, mis en place à distance`,
  etiquette: `Local · Cher (18)`,
  reponse: `Pour un club de tennis du Cher, de Bourges à Vierzon ou Saint-Amand-Montrond, {{produit}} se met en place à distance : démo en ligne, premier échange en visio, prise en main en partage d’écran. Bourges est à environ 180 km de Savigné-sur-Lathan ; un déplacement reste possible, avec une indemnité sur devis.`,
  titleSeo: `Site club de tennis dans le Cher : Bourges, Vierzon`,
  descriptionSeo: `Site et logiciel pour club de tennis dans le Cher : Bourges, Vierzon, Saint-Amand-Montrond. Mise en place en visio, adhésion en ligne, démo à visiter.`,
  motCle: 'site club de tennis Cher',
  motsCles: [
    'site club de tennis Bourges',
    'logiciel club de tennis Cher',
    'logiciel gestion club de tennis Bourges',
    'création site association sportive Cher',
    'site club de tennis Vierzon',
    'adhésion en ligne club de tennis Berry',
  ],
  capture: 'site-adhesion',
  demo: [
    { libelle: `Faire une adhésion familiale en ligne`, url: DEMO.page('/adherer') },
    { libelle: `Suivre les dossiers d’adhésion`, url: DEMO.role('secretaire', '/bureau/adhesions') },
  ],
  etapes: [
    {
      titre: `Visiter la démo`,
      texte: `Le bureau parcourt la démo en ligne avec le rôle de son choix, avant tout rendez-vous.`,
    },
    {
      titre: `Un premier échange en visio`,
      texte: `Pour comprendre votre club et répondre à vos questions, écran partagé.`,
    },
    {
      titre: `L’envoi des contenus et des fichiers`,
      texte: `Textes, photos et logo par e-mail ; vos membres par un export ADOC ou un tableur.`,
    },
    {
      titre: `La prise en main en visio`,
      texte: `Sur vos propres données, avec les heures d’accompagnement incluses.`,
    },
  ],
  sections: [
    {
      id: 'le-cher',
      titre: `Le Cher, au cœur du Berry`,
      paragraphes: [
        `Le Cher a pour préfecture Bourges ; ses sous-préfectures sont Vierzon et Saint-Amand-Montrond. Parmi les autres communes importantes : Saint-Doulchard, Saint-Florent-sur-Cher, Mehun-sur-Yèvre, Aubigny-sur-Nère ou Sancerre. Entre l’agglomération de Bourges, la Sologne au nord et le Sancerrois à l’est, les clubs n’ont ni la même taille ni les mêmes besoins.`,
        `Côté tennis, les clubs du département sont affiliés à la FFT, avec un comité départemental de tennis du Cher au plus près d’eux et la ligue Centre-Val de Loire de tennis à l’échelle de la région. {{produit}} n’a pas de lien avec ces instances et n’est ni affilié ni approuvé par la FFT.`,
      ],
    },
    {
      id: 'distance',
      titre: `À environ 180 km : comment on se rencontre`,
      paragraphes: [
        `Bourges est à environ 180 km de Savigné-sur-Lathan, bien au-delà des {{club:km}} km du premier rendez-vous gratuit en présentiel. Pour un club du Cher, le premier échange se fait donc en visio. Si le bureau tient à une rencontre au club, c’est possible : l’indemnité de déplacement est indiquée sur devis, avant de venir.`,
        `Dans les faits, la distance pèse peu sur un projet de ce type. Le site et le logiciel sont en ligne, la démo aussi, et tout ce que nous ferions au club se fait aussi bien écran partagé.`,
      ],
    },
    {
      id: 'mise-en-place-a-distance',
      titre: `Une mise en place à distance, étape par étape`,
      paragraphes: [
        `La mise en place à distance suit les étapes ci-dessus. Pour le bureau, elle demande surtout deux choses : rassembler les contenus du site (textes, photos, documents) et nous transmettre la liste des membres, par un export ADOC ou un tableur. L’import depuis une source est compris dans le logiciel.`,
        `La prise en main se fait en visio, sur vos propres données, une fois importées : c’est plus parlant qu’une démonstration générale. Les heures d’accompagnement incluses vont de {{club:heures:pack:mini}} h à {{club:heures:pack:tres-grand}} h pour le pack selon la catégorie. Ensuite, le support répond par e-mail ou formulaire sous {{club:support-jours}} jours ouvrés. Le délai de mise en place est indicatif.`,
      ],
    },
    {
      id: 'preparer-la-visio',
      titre: `Préparer la visio : ce qu’il est utile d’avoir sous la main`,
      paragraphes: [
        `Une visio réussie se prépare en dix minutes. Inutile d’installer quoi que ce soit de compliqué : un lien suffit, sur un ordinateur ou une tablette. Si plusieurs membres du bureau veulent participer, chacun peut se connecter de chez lui, ce qui évite de réunir tout le monde un soir de semaine.`,
      ],
      liste: [
        `l’adresse du site actuel du club, s’il en a un ;`,
        `un export ADOC récent ou le rapport de la dernière assemblée générale, pour fixer la catégorie ;`,
        `la grille des tarifs de la saison et le bulletin d’adhésion papier, s’il existe ;`,
        `la liste de ce qui vous prend le plus de temps : c’est par là que nous commencerons.`,
      ],
    },
    {
      id: 'adhesions-sans-deplacement',
      titre: `Des adhésions sans déplacement pour les familles`,
      paragraphes: [
        `Dans un département où les adhérents d’un club viennent souvent de plusieurs communes, l’[adhésion en ligne](/clubs-de-tennis/fonctionnalites/adhesions-en-ligne) change la vie des familles comme celle du bureau. Les parents inscrivent leurs enfants depuis leur téléphone, joignent les pièces demandées et paient par HelloAsso. L’argent arrive directement sur le compte du club.`,
        `Côté bureau, avec le logiciel, chaque dossier est suivi : complet, en attente d’une pièce, payé. Les relances partent automatiquement. Fini la permanence du samedi matin à attendre les chèques et les certificats.`,
      ],
    },
    {
      id: 'prix',
      titre: `Ce que cela coûte pour un club du Cher`,
      paragraphes: [
        `Les prix sont les mêmes partout. Exemple type : un club de la catégorie Petit ({{club:min:petit}} à {{club:max:petit}} licenciés) qui prend le pack paie à partir de {{club:pack:petit:mise}} € de mise en place et {{club:pack:petit:mois}} € par mois. La mise en place se règle en {{club:fois}} fois sans frais. Pour votre cas : [le simulateur](/clubs-de-tennis/simulateur).`,
      ],
    },
  ],
  faq: [
    {
      q: `Venez-vous dans le Cher pour le premier rendez-vous ?`,
      a: `Le premier échange se fait en visio. Une venue au club reste possible, avec une indemnité de déplacement indiquée sur devis.`,
    },
    {
      q: `Peut-on vraiment tout mettre en place à distance ?`,
      a: `Oui : démo en ligne, visio, envoi des contenus par e-mail, import des membres depuis un export ADOC ou un tableur, prise en main écran partagé.`,
    },
    {
      q: `Nos adhérents viennent de plusieurs communes. L’adhésion en ligne est-elle comprise ?`,
      a: `Oui, dans le site comme dans le logiciel : formulaire avec pièces jointes et paiement HelloAsso. Le suivi des dossiers et les relances sont dans le logiciel.`,
    },
    {
      q: `Qui répond quand nous avons une question ?`,
      a: `Mathéo Reboul, par e-mail ou formulaire, sous {{club:support-jours}} jours ouvrés.`,
    },
    {
      q: `Un club du Cher paie-t-il le déplacement ?`,
      a: `Seulement s’il demande une rencontre en présentiel, sur devis. Sinon, tout se fait en visio, sans frais de déplacement.`,
    },
  ],
  liens: [
    { href: `${R}/centre-val-de-loire`, nom: `Centre-Val de Loire`, note: `Toute la région` },
    { href: `${R}/loiret`, nom: `Loiret`, note: `Département voisin` },
    { href: `${R}/loir-et-cher`, nom: `Loir-et-Cher`, note: `Département voisin` },
    { href: `${R}/indre`, nom: `Indre`, note: `Département voisin` },
    { href: R, nom: `Site et logiciel pour clubs de tennis` },
    { href: `${R}/simulateur`, nom: `Simulateur de prix` },
  ],
  maj: '2026-10-29',
}

const EURE_ET_LOIR: PageClub = {
  slug: 'eure-et-loir',
  chemin: `${R}/eure-et-loir`,
  famille: 'local',
  titre: `Site et logiciel pour les clubs de tennis d’Eure-et-Loir : équipes, déplacements et convocations`,
  etiquette: `Local · Eure-et-Loir (28)`,
  reponse: `En Eure-et-Loir, de Chartres à Dreux, Châteaudun ou Nogent-le-Rotrou, un club de tennis passe une bonne partie de la saison sur les routes avec ses équipes. {{produit}} regroupe disponibilités, compositions, convocations et covoiturage, avec le site du club en vitrine. Chartres est à environ 170 km de Savigné-sur-Lathan : on se rencontre en visio.`,
  titleSeo: `Site club de tennis en Eure-et-Loir : Chartres, Dreux`,
  descriptionSeo: `Site et logiciel pour club de tennis en Eure-et-Loir : Chartres, Dreux, Châteaudun. Équipes, convocations, covoiturage, adhésion en ligne. Démo, visio.`,
  motCle: 'site club de tennis Eure-et-Loir',
  motsCles: [
    'site club de tennis Chartres',
    'logiciel club de tennis Eure-et-Loir',
    'logiciel gestion club de tennis Chartres',
    'création site association sportive Eure-et-Loir',
    'convocation équipe tennis Chartres',
    'site club de tennis Dreux',
  ],
  capture: 'bureau-equipes',
  demo: [
    { libelle: `Composer une équipe en tant que capitaine`, url: DEMO.role('capitaine', '/bureau/equipes') },
    { libelle: `Voir les compétitions sur le site`, url: DEMO.page('/competitions') },
  ],
  sections: [
    {
      id: 'l-eure-et-loir',
      titre: `L’Eure-et-Loir, entre Beauce et Perche`,
      paragraphes: [
        `L’Eure-et-Loir a pour préfecture Chartres ; ses sous-préfectures sont Dreux, Châteaudun et Nogent-le-Rotrou. Autour de Chartres, Lucé, Mainvilliers et Luisant forment l’agglomération ; Vernouillet jouxte Dreux. Le département s’étend de la Beauce au Perche et touche l’Île-de-France au nord-est.`,
        `Les clubs de tennis du département sont affiliés à la FFT, avec le comité départemental de tennis d’Eure-et-Loir à leurs côtés et la ligue Centre-Val de Loire de tennis à l’échelle régionale. Ce sont ces instances qui organisent notamment les championnats par équipes. {{produit}} n’a aucun lien avec elles et n’est ni affilié ni approuvé par la FFT.`,
      ],
    },
    {
      id: 'equipes-et-deplacements',
      titre: `Des équipes qui se déplacent : le vrai casse-tête du capitaine`,
      paragraphes: [
        `Dans un département étendu, un match à l’extérieur peut demander une bonne organisation : qui est disponible, qui joue, qui conduit, à quelle heure on part. Ce travail repose souvent sur un capitaine bénévole et une conversation de groupe qui déborde.`,
        `Avec [les équipes et compétitions](/clubs-de-tennis/fonctionnalites/equipes-et-competitions) du logiciel, les joueurs indiquent leurs disponibilités, le capitaine compose l’équipe, la convocation part par e-mail et notification sur le téléphone, et le covoiturage s’organise dans la même fiche. Le capitaine n’a que ses équipes sous les yeux : il ne voit pas la trésorerie ni les dossiers d’adhésion. Voir aussi le guide [convoquer ses équipes](/clubs-de-tennis/guides/convoquer-ses-equipes).`,
      ],
    },
    {
      id: 'exemple-type',
      titre: `Exemple type : la semaine d’un capitaine`,
      paragraphes: [
        `Voici un exemple type, fictif, pour se représenter les choses. Le lundi, le capitaine d’une équipe seniors ouvre la rencontre du dimanche dans le logiciel : les joueurs reçoivent une notification et indiquent s’ils sont disponibles. Le mercredi, il voit qui a répondu, relance ceux qui ne l’ont pas fait et compose l’équipe.`,
        `Le jeudi, la convocation part avec l’heure et le lieu du rendez-vous. Deux joueurs proposent leur voiture, les autres s’inscrivent dans le covoiturage. Le dimanche soir, le résultat est publié en actualité sur le site. Tout s’est passé au même endroit, sans une conversation de groupe de cent messages.`,
      ],
    },
    {
      id: 'le-site-en-vitrine',
      titre: `Le site du club, vitrine des équipes et du club`,
      paragraphes: [
        `Le [site du club](/clubs-de-tennis/site-internet) comprend une page équipes et compétitions, des actualités pour les résultats, un agenda abonnable pour les rencontres et une galerie qui respecte le droit à l’image. Avec le pack, ce qui est saisi au bureau se retrouve sur le site sans ressaisie.`,
        `Pour un club de l’agglomération chartraine comme pour un club de village du Perche, le site est aussi la porte d’entrée des nouveaux adhérents : tarifs, adhésion en ligne avec paiement HelloAsso, essai gratuit.`,
      ],
    },
    {
      id: 'rencontre',
      titre: `Se rencontrer depuis la Touraine`,
      paragraphes: [
        `Chartres est à environ 170 km de Savigné-sur-Lathan. Le premier rendez-vous en présentiel n’est gratuit que jusqu’à {{club:km}} km ; pour un club d’Eure-et-Loir, il se fait donc en visio, ou sur place avec une indemnité de déplacement indiquée sur devis. La démo en ligne permet au bureau, et au capitaine, de se faire une idée avant d’en parler.`,
        `La prise en main se fait en visio, avec les heures d’accompagnement incluses. Le délai de mise en place est indicatif, et le support répond ensuite par e-mail ou formulaire sous {{club:support-jours}} jours ouvrés.`,
      ],
    },
    {
      id: 'prix',
      titre: `Ce que cela coûte`,
      paragraphes: [
        `Les équipes et les convocations font partie du logiciel. Exemple type, club de la catégorie Moyen ({{club:min:moyen}} à {{club:max:moyen}} licenciés) : le logiciel seul démarre à partir de {{club:logiciel:moyen:mise}} € de mise en place et {{club:logiciel:moyen:mois}} € par mois ; le pack avec le site, à partir de {{club:pack:moyen:mise}} € et {{club:pack:moyen:mois}} € par mois. Pour votre cas : [le simulateur](/clubs-de-tennis/simulateur).`,
      ],
    },
  ],
  faq: [
    {
      q: `Les convocations partent-elles par SMS ?`,
      a: `Non : par e-mail et notification sur le téléphone. Nous ne proposons pas de SMS. Si vos équipes ont un groupe de messagerie, elles le gardent.`,
    },
    {
      q: `Le covoiturage est-il compris ?`,
      a: `Oui, avec les équipes et compétitions du logiciel : disponibilités, composition, convocation et covoiturage au même endroit.`,
    },
    {
      q: `Le logiciel récupère-t-il les calendriers des championnats ?`,
      a: `Non, il n’est pas connecté aux outils fédéraux. Les rencontres se saisissent dans le logiciel ; les adhérents gardent leurs liens vers Ten’Up.`,
    },
    {
      q: `Notre club du Perche n’a qu’une équipe. Le logiciel est-il utile ?`,
      a: `Pour une seule équipe, le site seul peut suffire au début : être trouvé, prendre les adhésions en ligne, publier les résultats. Le logiciel devient intéressant quand les équipes, l’école et les adhésions se cumulent.`,
    },
    {
      q: `Venez-vous en Eure-et-Loir ?`,
      a: `Le premier échange se fait en visio. Une venue au club est possible, avec une indemnité de déplacement indiquée sur devis.`,
    },
    {
      q: `Pouvez-vous reprendre nos membres depuis ADOC ?`,
      a: `Oui : l’import des membres depuis une source, export ADOC ou tableur, est compris dans le logiciel.`,
    },
    {
      q: `Un capitaine peut-il voir les données de tout le club ?`,
      a: `Non. Chaque personne a un rôle et des droits : le capitaine voit ses équipes, pas la trésorerie ni les dossiers d’adhésion.`,
    },
  ],
  liens: [
    { href: `${R}/centre-val-de-loire`, nom: `Centre-Val de Loire`, note: `Toute la région` },
    { href: `${R}/loiret`, nom: `Loiret`, note: `Département voisin` },
    { href: `${R}/loir-et-cher`, nom: `Loir-et-Cher`, note: `Département voisin` },
    { href: `${R}/fonctionnalites/equipes-et-competitions`, nom: `Équipes et compétitions` },
    { href: R, nom: `Site et logiciel pour clubs de tennis` },
    { href: `${R}/simulateur`, nom: `Simulateur de prix` },
  ],
  maj: '2026-10-29',
}

const INDRE: PageClub = {
  slug: 'indre',
  chemin: `${R}/indre`,
  famille: 'local',
  titre: `Site et logiciel pour les clubs de tennis de l’Indre : moins de tâches pour un bureau de bénévoles`,
  etiquette: `Local · Indre (36)`,
  reponse: `Dans l’Indre, de Châteauroux à Issoudun, Le Blanc ou La Châtre, beaucoup de bureaux de club reposent sur quelques bénévoles. {{produit}} leur montre chaque jour ce qui demande une action, envoie les relances tout seul et répartit les missions entre bénévoles. Châteauroux est à environ 150 km de Savigné-sur-Lathan : le premier échange se fait en visio.`,
  titleSeo: `Site club de tennis dans l’Indre : Châteauroux`,
  descriptionSeo: `Site et logiciel pour club de tennis dans l’Indre : Châteauroux, Issoudun, Le Blanc, La Châtre. Relances automatiques, bénévolat, adhésion en ligne. Visio.`,
  motCle: 'site club de tennis Indre',
  motsCles: [
    'site club de tennis Châteauroux',
    'logiciel club de tennis Indre',
    'logiciel gestion club de tennis Châteauroux',
    'création site association sportive Indre',
    'site club de tennis Issoudun',
    'gestion bénévoles club de tennis',
  ],
  capture: 'bureau-automatisations',
  demo: [
    { libelle: `Voir « Ma journée » du trésorier`, url: DEMO.role('tresorier') },
    { libelle: `Les missions des bénévoles`, url: DEMO.role('benevole', '/bureau/benevolat') },
  ],
  sections: [
    {
      id: 'l-indre',
      titre: `L’Indre, du Boischaut à la Brenne`,
      paragraphes: [
        `L’Indre a pour préfecture Châteauroux ; ses sous-préfectures sont Issoudun, Le Blanc et La Châtre. Déols touche Châteauroux ; Argenton-sur-Creuse, Buzançais et Valençay comptent aussi parmi les communes connues du département. Entre la Brenne à l’ouest et le Boischaut au sud, une grande partie du territoire est rurale.`,
        `Les clubs de tennis de l’Indre sont affiliés à la FFT, avec le comité départemental de tennis de l’Indre et la ligue Centre-Val de Loire de tennis. {{produit}} est un outil indépendant : il n’est ni affilié ni approuvé par la FFT, et nous ne parlons au nom d’aucune de ces instances.`,
      ],
    },
    {
      id: 'un-bureau-de-benevoles',
      titre: `Quand le bureau tient à quelques personnes`,
      paragraphes: [
        `Dans un petit club, le président fait souvent aussi le secrétariat, et le trésorier relance lui-même les cotisations. Ce qui épuise n’est pas une grosse tâche, mais la somme des petites : un certificat manquant, un chèque à encaisser, une famille à relancer, un créneau à annuler.`,
        `[Ma journée](/clubs-de-tennis/fonctionnalites/ma-journee-et-automatisations) montre à chaque membre du bureau ce qui l’attend aujourd’hui, et seulement cela. Les 5 automatisations prêtes s’occupent des relances courantes, par exemple un dossier d’adhésion incomplet. Le journal garde la trace de qui a fait quoi : si un bénévole passe la main en cours de saison, son successeur sait où en sont les choses.`,
      ],
    },
    {
      id: 'benevolat',
      titre: `Répartir les missions entre bénévoles`,
      paragraphes: [
        `Le tournoi du club, la fête de l’école de tennis, la buvette d’un match par équipes : chaque événement demande des bras. Le bénévolat du logiciel permet de publier des missions, de laisser les adhérents s’y inscrire depuis leur téléphone et de compter les heures données. Le bureau voit d’un coup d’œil ce qui reste à pourvoir, sans passer dix coups de téléphone.`,
        `Ce compteur d’heures est aussi utile au moment de l’assemblée générale ou d’un dossier de subvention, pour montrer ce que les bénévoles apportent au club.`,
      ],
    },
    {
      id: 'exemple-type',
      titre: `Exemple type : un club de village et ses trois bénévoles`,
      paragraphes: [
        `Prenons un club type, fictif : deux courts extérieurs, une école de tennis le mercredi, une équipe engagée au printemps, et un bureau de trois personnes. Avant, les réinscriptions se faisaient sur papier lors d’une permanence, les chèques s’empilaient dans une boîte et le trésorier tenait un tableur le soir.`,
        `Avec {{produit}}, les familles se réinscrivent en ligne et paient par HelloAsso. Le trésorier voit qui a payé sans pointer de chèques. La présidente trouve chaque matin, dans Ma journée, les deux ou trois choses qui l’attendent. Le club n’a pas gagné de bénévoles, mais ceux qu’il a passent moins de soirées sur l’administratif.`,
      ],
    },
    {
      id: 'commencer-petit',
      titre: `Commencer petit : la catégorie Mini`,
      paragraphes: [
        `Un club de {{club:min:mini}} à {{club:max:mini}} licenciés relève de la catégorie Mini. Le site seul y démarre à partir de {{club:site:mini:mise}} € de mise en place et {{club:site:mini:mois}} € par mois ; le logiciel seul, à partir de {{club:logiciel:mini:mise}} € et {{club:logiciel:mini:mois}} € par mois ; le pack, à partir de {{club:pack:mini:mise}} € et {{club:pack:mini:mois}} € par mois. La mise en place se règle en {{club:fois}} fois sans frais.`,
        `Pour un club qui hésite, le site seul est une première marche : être trouvé, prendre les adhésions en ligne avec HelloAsso. Le logiciel peut venir ensuite. Le [guide sur le financement du numérique](/clubs-de-tennis/guides/financer-le-numerique-du-club) donne des pistes pour financer le projet.`,
      ],
    },
    {
      id: 'rencontre',
      titre: `Se rencontrer à environ 150 km`,
      paragraphes: [
        `Châteauroux est à environ 150 km de Savigné-sur-Lathan. Comme le premier rendez-vous gratuit en présentiel est limité à {{club:km}} km, un club de l’Indre fait son premier échange en visio, ou nous reçoit au club avec une indemnité de déplacement indiquée sur devis. La prise en main se fait en visio. Le support répond par e-mail ou formulaire sous {{club:support-jours}} jours ouvrés.`,
      ],
    },
  ],
  faq: [
    {
      q: `Notre club est tout petit. Le logiciel vaut-il la peine ?`,
      a: `Il vaut la peine quand quelques bénévoles portent tout. Si vous voulez commencer plus simplement, le site seul en catégorie Mini permet déjà l’adhésion en ligne.`,
    },
    {
      q: `Quelles relances sont automatiques ?`,
      a: `Les 5 automatisations incluses couvrent des cas courants, comme un dossier d’adhésion incomplet. Les automatisations avancées sont une option.`,
    },
    {
      q: `Les bénévoles doivent-ils créer un compte ?`,
      a: `Ils utilisent leur espace membre, installable sur le téléphone, pour s’inscrire aux missions.`,
    },
    {
      q: `Venez-vous dans l’Indre ?`,
      a: `Le premier échange se fait en visio. Une venue au club reste possible avec une indemnité de déplacement indiquée sur devis.`,
    },
    {
      q: `Si le président change, que deviennent les accès ?`,
      a: `Les rôles et les droits se changent dans le logiciel. Le journal garde l’historique, et les données restent au club.`,
    },
  ],
  liens: [
    { href: `${R}/centre-val-de-loire`, nom: `Centre-Val de Loire`, note: `Toute la région` },
    { href: `${R}/indre-et-loire`, nom: `Indre-et-Loire`, note: `Département voisin` },
    { href: `${R}/loir-et-cher`, nom: `Loir-et-Cher`, note: `Département voisin` },
    { href: `${R}/cher`, nom: `Cher`, note: `Département voisin` },
    { href: R, nom: `Site et logiciel pour clubs de tennis` },
    { href: `${R}/simulateur`, nom: `Simulateur de prix` },
  ],
  maj: '2026-10-29',
}

const LOIR_ET_CHER: PageClub = {
  slug: 'loir-et-cher',
  chemin: `${R}/loir-et-cher`,
  famille: 'local',
  titre: `Site et logiciel pour les clubs de tennis du Loir-et-Cher : l’école de tennis et les familles`,
  etiquette: `Local · Loir-et-Cher (41)`,
  reponse: `Le Loir-et-Cher est le département voisin de la Touraine : Blois est à environ 90 km de Savigné-sur-Lathan. Pour un club de Blois, Vendôme ou Romorantin-Lanthenay, {{produit}} simplifie surtout l’école de tennis : groupes, appel sur téléphone, annulations, et un espace parent pour les familles. Premier échange en visio, ou au club sur devis.`,
  titleSeo: `Site club de tennis en Loir-et-Cher : Blois, Vendôme`,
  descriptionSeo: `Site et logiciel pour club de tennis en Loir-et-Cher : Blois, Vendôme, Romorantin. École de tennis, appel sur téléphone, espace parent. Démo en ligne.`,
  motCle: 'site club de tennis Loir-et-Cher',
  motsCles: [
    'site club de tennis Blois',
    'logiciel club de tennis Loir-et-Cher',
    'logiciel gestion club de tennis Blois',
    'création site association sportive Loir-et-Cher',
    'logiciel école de tennis Blois',
    'site club de tennis Vendôme',
  ],
  capture: 'espace-parent',
  demo: [
    { libelle: `Faire l’appel en tant qu’enseignant`, url: DEMO.role('enseignant', '/bureau/ecole/appel') },
    { libelle: `Le planning des enfants côté parent`, url: DEMO.role('parent', '/espace/enfants') },
    { libelle: `La page école de tennis du site`, url: DEMO.page('/ecole-de-tennis') },
  ],
  sections: [
    {
      id: 'le-loir-et-cher',
      titre: `Le Loir-et-Cher, de la Sologne au Vendômois`,
      paragraphes: [
        `Le Loir-et-Cher a pour préfecture Blois, sur la Loire ; ses sous-préfectures sont Vendôme, sur le Loir, et Romorantin-Lanthenay, en Sologne. Vineuil, Mer, Salbris, Saint-Aignan ou Montoire-sur-le-Loir comptent aussi parmi ses communes. Le département touche l’Indre-et-Loire à l’ouest : c’est le plus proche de l’agence après le nôtre.`,
        `Ses clubs de tennis sont affiliés à la FFT, avec le comité départemental de tennis de Loir-et-Cher et la ligue Centre-Val de Loire de tennis. {{produit}} n’est ni affilié ni approuvé par la FFT ; il ne gère pas les licences, qui restent dans ADOC, mais propose l’**import et export des fichiers ADOC**.`,
      ],
    },
    {
      id: 'ecole-de-tennis',
      titre: `L’école de tennis, là où le bureau passe le plus de temps`,
      paragraphes: [
        `Pour beaucoup de clubs, l’école de tennis est à la fois la fierté et la charge principale : des groupes par âge et par niveau, des enseignants à coordonner, des parents qui veulent savoir si le cours a lieu quand il pleut.`,
        `Avec [l’école de tennis](/clubs-de-tennis/fonctionnalites/ecole-de-tennis) du logiciel, les groupes sont constitués une fois, l’enseignant fait l’appel sur son téléphone en bord de court, et une annulation ou un report prévient les familles concernées par e-mail et notification. La progression des enfants suit Galaxie Tennis. Le bureau n’a plus à tout relayer à la main.`,
      ],
    },
    {
      id: 'espace-parent',
      titre: `Un espace pour les parents, sur leur téléphone`,
      paragraphes: [
        `Les parents ont leur [espace membre et parent](/clubs-de-tennis/fonctionnalites/espace-membre-et-parent), qui s’installe sur le téléphone comme une application, sans passer par un magasin d’applications. Ils y voient le planning de leurs enfants, signalent une absence en un geste et retrouvent leur dossier et leur carte de membre.`,
        `Côté site, la page école de tennis présente les groupes, les tarifs et le formulaire d’adhésion familiale. Avec le pack, ce que le bureau change dans le logiciel se reflète sur le site.`,
      ],
    },
    {
      id: 'reinscriptions-de-rentree',
      titre: `Les réinscriptions de la rentrée`,
      paragraphes: [
        `La rentrée concentre tout : les anciens qui se réinscrivent, les nouveaux qui arrivent, les groupes à refaire. Avec les [adhésions et réinscriptions en ligne](/clubs-de-tennis/fonctionnalites/adhesions-en-ligne), une famille déjà connue retrouve ses informations et n’a qu’à les confirmer. Les pièces demandées se déposent en ligne, le paiement passe par HelloAsso.`,
        `Le bureau suit les dossiers dans un tableau : à compléter, en attente, payés. Les relances partent toutes seules. Quand les inscriptions sont closes, les enfants sont répartis dans les groupes de l’école, et chaque parent voit le créneau de son enfant dans son espace.`,
      ],
    },
    {
      id: 'rencontre',
      titre: `Blois à environ 90 km : visio ou rencontre au club`,
      paragraphes: [
        `À environ 90 km de Savigné-sur-Lathan, Blois est au-delà des {{club:km}} km du premier rendez-vous gratuit, mais à une distance raisonnable. Selon ce que préfère le bureau, le premier échange se fait en visio, ou au club avec une indemnité de déplacement indiquée sur devis avant de venir. Pour un club du nord du département, vers Vendôme, ou du sud, en Sologne, le calcul de la distance se fait au cas par cas.`,
        `La prise en main peut se faire en visio ou, avec le même principe d’indemnité, sur place avec les enseignants. Le délai de mise en place reste indicatif.`,
      ],
    },
    {
      id: 'prix',
      titre: `Ce que cela coûte`,
      paragraphes: [
        `L’école de tennis fait partie du logiciel. Exemple type, catégorie Petit ({{club:min:petit}} à {{club:max:petit}} licenciés) : le logiciel démarre à partir de {{club:logiciel:petit:mise}} € de mise en place et {{club:logiciel:petit:mois}} € par mois ; le pack avec le site, à partir de {{club:pack:petit:mise}} € et {{club:pack:petit:mois}} € par mois. Pour votre cas : [le simulateur](/clubs-de-tennis/simulateur).`,
      ],
    },
  ],
  faq: [
    {
      q: `Pouvez-vous venir à Blois pour le premier rendez-vous ?`,
      a: `Oui, avec une indemnité de déplacement indiquée sur devis, car Blois est à environ 90 km de Savigné-sur-Lathan. Sinon, le premier échange se fait en visio, sans frais.`,
    },
    {
      q: `Les parents sont-ils prévenus si un cours est annulé ?`,
      a: `Oui. Une annulation ou un report dans le logiciel prévient les familles concernées par e-mail et notification sur le téléphone. Il n’y a pas de SMS.`,
    },
    {
      q: `Nos enseignants doivent-ils avoir un ordinateur ?`,
      a: `Non. L’appel se fait sur le téléphone, en bord de court. Les comptes enseignants sont illimités.`,
    },
    {
      q: `La progression Galaxie Tennis est-elle suivie ?`,
      a: `Oui, la progression Galaxie Tennis fait partie de l’école de tennis du logiciel.`,
    },
    {
      q: `Notre club a aussi une section padel en Sologne. Est-ce possible ?`,
      a: `Oui. Les licenciés padel comptent dans la catégorie, et si la section joue sur un autre lieu, l’option « plusieurs lieux ou sections » existe. Voir [les clubs avec padel](/clubs-de-tennis/padel).`,
    },
    {
      q: `Le logiciel remplace-t-il ADOC pour l’école de tennis ?`,
      a: `Non. Les licences restent dans ADOC. Le logiciel gère les groupes, l’appel et les familles, et propose l’import et export des fichiers ADOC.`,
    },
  ],
  liens: [
    { href: `${R}/centre-val-de-loire`, nom: `Centre-Val de Loire`, note: `Toute la région` },
    { href: `${R}/indre-et-loire`, nom: `Indre-et-Loire`, note: `Département voisin` },
    { href: `${R}/loiret`, nom: `Loiret`, note: `Département voisin` },
    { href: `${R}/eure-et-loir`, nom: `Eure-et-Loir`, note: `Département voisin` },
    { href: `${R}/cher`, nom: `Cher`, note: `Département voisin` },
    { href: `${R}/indre`, nom: `Indre`, note: `Département voisin` },
    { href: R, nom: `Site et logiciel pour clubs de tennis` },
    { href: `${R}/simulateur`, nom: `Simulateur de prix` },
  ],
  maj: '2026-10-29',
}

const LOIRET: PageClub = {
  slug: 'loiret',
  chemin: `${R}/loiret`,
  famille: 'local',
  titre: `Site et logiciel pour les clubs de tennis du Loiret : des outils à la mesure des grands clubs`,
  etiquette: `Local · Loiret (45)`,
  reponse: `Dans le Loiret, l’agglomération d’Orléans réunit des clubs de tennis de grande taille, aux côtés des clubs de Montargis, Pithiviers, Gien et des villages. {{produit}} suit leur croissance : catégories jusqu’à {{club:min:tres-grand}} licenciés et plus, Challenge interne, statistiques, plusieurs lieux en option. Orléans est à environ 150 km de Savigné-sur-Lathan : premier échange en visio.`,
  titleSeo: `Site club de tennis dans le Loiret : Orléans, Montargis`,
  descriptionSeo: `Site et logiciel pour club de tennis dans le Loiret : Orléans, Montargis, Pithiviers, Gien. Grands clubs, Challenge, statistiques, plusieurs lieux.`,
  motCle: 'site club de tennis Loiret',
  motsCles: [
    'site club de tennis Orléans',
    'logiciel club de tennis Loiret',
    'logiciel gestion club de tennis Orléans',
    'création site association sportive Loiret',
    'site club de tennis Montargis',
    'challenge interne tennis Orléans',
  ],
  capture: 'bureau-statistiques',
  demo: [
    { libelle: `Les statistiques du club`, url: DEMO.role('presidente', '/bureau/statistiques') },
    { libelle: `Le tableau du Challenge sur le site`, url: DEMO.page('/challenge') },
    { libelle: `Saisir un match en tant que membre`, url: DEMO.role('membre', '/espace/jeu') },
  ],
  sections: [
    {
      id: 'le-loiret',
      titre: `Le Loiret, autour d’Orléans et du Val de Loire`,
      paragraphes: [
        `Le Loiret a pour préfecture Orléans, qui est aussi la préfecture de la région Centre-Val de Loire. Ses sous-préfectures sont Montargis et Pithiviers. Autour d’Orléans, Olivet, Fleury-les-Aubrais, Saint-Jean-de-Braye, Saint-Jean-de-la-Ruelle et Saran forment une agglomération dense ; le long de la Loire, on trouve aussi Gien, Briare, Meung-sur-Loire ou Beaugency. Le département s’étend du Gâtinais à la Sologne, en passant par la Beauce.`,
        `Les clubs de tennis du Loiret sont affiliés à la FFT, avec le comité départemental de tennis du Loiret et la ligue Centre-Val de Loire de tennis. {{produit}} est indépendant de ces instances : il n’est ni affilié ni approuvé par la FFT.`,
      ],
    },
    {
      id: 'grands-clubs',
      titre: `Un grand club n’a pas les mêmes besoins qu’un petit`,
      paragraphes: [
        `Au-delà de quelques centaines de licenciés, un club ressemble à une petite entreprise : plusieurs enseignants, beaucoup de familles, des équipes dans plusieurs divisions, un bureau qui se partage les rôles. Le tableur ne suffit plus, et chacun doit pouvoir agir sans marcher sur les plates-bandes des autres.`,
        `Le [logiciel du bureau](/clubs-de-tennis/logiciel-de-gestion) donne à chaque personne un rôle et des droits : la secrétaire suit les dossiers, le trésorier les paiements, les enseignants leurs groupes, les capitaines leurs équipes. Les comptes du bureau et des enseignants sont illimités, et le journal garde la trace de qui a fait quoi.`,
        `Les adhérents ne sont pas oubliés : chacun a son espace sur téléphone, avec sa carte de membre, son dossier et, pour les parents, le planning des enfants. Moins de questions arrivent au secrétariat, parce que les réponses sont déjà dans la poche des adhérents.`,
      ],
    },
    {
      id: 'challenge-et-statistiques',
      titre: `Faire jouer les adhérents entre eux, et mesurer la saison`,
      paragraphes: [
        `Dans un grand club, beaucoup d’adhérents ne jouent pas en compétition. Le [Challenge interne](/clubs-de-tennis/fonctionnalites/challenge-interne) leur donne une raison de se retrouver : les joueurs saisissent leurs matchs au format FFT depuis leur téléphone, l’adversaire confirme, le classement et les badges se mettent à jour, et le Hall of Fame garde la mémoire des saisons.`,
        `Les [statistiques](/clubs-de-tennis/fonctionnalites/statistiques) aident le bureau à préparer l’assemblée générale ou un dossier de subvention : évolution des adhésions, répartition par âge, fréquentation. Quand une donnée n’est pas encore saisie, elle est affichée comme inconnue, jamais comme zéro.`,
      ],
    },
    {
      id: 'equipes-et-tournois',
      titre: `Beaucoup d’équipes, et des tournois internes`,
      paragraphes: [
        `Quand un club engage de nombreuses équipes, jeunes et adultes, chaque capitaine gère ses disponibilités, ses compositions, ses convocations et son covoiturage dans [les équipes et compétitions](/clubs-de-tennis/fonctionnalites/equipes-et-competitions), sans dépendre d’un responsable sportif débordé.`,
        `Les [tournois internes](/clubs-de-tennis/fonctionnalites/tournois-internes) et les événements, avec inscriptions en ligne, complètent la saison : tournoi de fin d’année, journée double mixte, fête de l’école. Les bénévoles s’inscrivent aux missions de l’organisation depuis leur téléphone.`,
      ],
    },
    {
      id: 'plusieurs-lieux',
      titre: `Plusieurs lieux de pratique ?`,
      paragraphes: [
        `Certains clubs jouent sur plusieurs sites : courts extérieurs d’un côté, salle couverte de l’autre, ou une section dans une autre commune. L’option « plusieurs lieux ou sections » permet de les gérer séparément dans le même club, à partir de {{club:option:plusieurs-lieux:mise}} € puis {{club:option:plusieurs-lieux:mois}} € par mois.`,
      ],
    },
    {
      id: 'rencontre-et-prix',
      titre: `Se rencontrer, et ce que cela coûte`,
      paragraphes: [
        `Orléans est à environ 150 km de Savigné-sur-Lathan, au-delà des {{club:km}} km du premier rendez-vous gratuit en présentiel. Le premier échange se fait en visio, ou au club avec une indemnité de déplacement indiquée sur devis. Pour un grand club, il est utile d’y associer plusieurs membres du bureau, chacun avec ses questions.`,
        `Exemple type, catégorie Très grand ({{club:min:tres-grand}} licenciés et plus) : le pack démarre à partir de {{club:pack:tres-grand:mise}} € de mise en place et {{club:pack:tres-grand:mois}} € par mois, soit environ {{club:par-licencie:tres-grand}} € par licencié et par an pour un club type de {{club:licencies-type:tres-grand}} licenciés. Les heures d’accompagnement incluses montent à {{club:heures:pack:tres-grand}} h, et le stockage à {{club:stockage:tres-grand}} Go. Pour votre cas : [le simulateur](/clubs-de-tennis/simulateur).`,
      ],
    },
  ],
  faq: [
    {
      q: `Le logiciel tient-il la charge d’un club de plusieurs centaines de licenciés ?`,
      a: `Oui : les catégories vont jusqu’à {{club:min:tres-grand}} licenciés et plus, avec des membres illimités dans la catégorie et des comptes bureau et enseignants illimités.`,
    },
    {
      q: `Le Challenge interne est-il compris ?`,
      a: `Oui, dans le logiciel : classement, badges, saisie des matchs au format FFT et Hall of Fame. L’écran club-house pour l’afficher sur la télévision du club est une option.`,
    },
    {
      q: `Pouvez-vous reprendre plusieurs fichiers de membres ?`,
      a: `L’import depuis une source est compris. Chaque source supplémentaire coûte {{club:option:import-source:mise}} €.`,
    },
    {
      q: `Peut-on afficher le classement du Challenge au club-house ?`,
      a: `Oui, avec l’option écran club-house : {{club:option:ecran-club-house:mise}} €, sans abonnement. Le classement et les infos du jour s’affichent en direct sur la télévision du club.`,
    },
    {
      q: `Venez-vous à Orléans ?`,
      a: `Le premier échange se fait en visio. Une venue au club est possible avec une indemnité de déplacement indiquée sur devis.`,
    },
    {
      q: `Pouvez-vous développer une fonction propre à notre club ?`,
      a: `Oui, sur devis : {{club:dev-heure}} € de l’heure, toujours chiffré avant.`,
    },
    {
      q: `Nos données restent-elles au club ?`,
      a: `Oui. Un contrat de traitement des données est signé, et l’export complet des données est possible à tout moment.`,
    },
  ],
  liens: [
    { href: `${R}/centre-val-de-loire`, nom: `Centre-Val de Loire`, note: `Toute la région` },
    { href: `${R}/eure-et-loir`, nom: `Eure-et-Loir`, note: `Département voisin` },
    { href: `${R}/loir-et-cher`, nom: `Loir-et-Cher`, note: `Département voisin` },
    { href: `${R}/cher`, nom: `Cher`, note: `Département voisin` },
    { href: R, nom: `Site et logiciel pour clubs de tennis` },
    { href: `${R}/simulateur`, nom: `Simulateur de prix` },
  ],
  maj: '2026-10-29',
}

export const LOCALES: PageClub[] = [CENTRE_VAL_DE_LOIRE, INDRE_ET_LOIRE, CHER, EURE_ET_LOIR, INDRE, LOIR_ET_CHER, LOIRET]
