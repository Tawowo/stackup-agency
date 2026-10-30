import type { PageLocale } from './types.ts'

/**
 * Pages locales de l'offre clubs : la région, les six départements, le padel et le pickleball.
 * Chaque page a un contenu propre. Aucun chiffre de marché, aucun montant en chiffres (jetons `{{club:…}}`), aucune distance précise.
 */
export const PAGES_LOCALES: PageLocale[] = [
  {
    slug: 'centre-val-de-loire',
    type: 'region',
    nom: 'Centre-Val de Loire',
    etiquette: 'Région',
    titre: 'Site internet et logiciel pour club de tennis en Centre-Val de Loire',
    reponse:
      'Oui, {{nom:produit}} s’adresse aux clubs de tennis, de padel et de pickleball de toute la région : un site que le bureau modifie seul, et un logiciel de gestion qui suit les adhésions, l’école de tennis et les équipes. Mathéo Reboul est basé en Touraine, à Savigné-sur-Lathan, intervient dans les six départements, et travaille à distance avec n’importe quel club de France.',
    titleSeo: 'Site et logiciel pour club de tennis en Centre-Val de Loire',
    descriptionSeo:
      'Site internet et logiciel de gestion pour les clubs de tennis, padel et pickleball du Centre-Val de Loire : rendez-vous sur place ou en visio.',
    sections: [
      {
        id: 'ce-que-propose-stackup-club-aux-clubs-de-la-region',
        titre: 'Que propose {{nom:produit}} aux clubs de la région ?',
        paragraphes: [
          `Un club de tennis a besoin de deux outils qui se parlent : un site que les adhérents, les parents et les visiteurs consultent, et un logiciel que le bureau ouvre presque tous les jours. {{nom:produit}} réunit les deux. Le [site internet du club](/clubs-de-tennis/site-internet) se modifie sans compétence technique. Le [logiciel de gestion](/clubs-de-tennis/logiciel-de-gestion) suit les adhésions, les cours de l’école de tennis, les équipes, les tournois internes et la trésorerie.`,
          `ADOC reste l’outil administratif de la fédération. De notre côté, nous proposons l’import et l’export des fichiers ADOC, pour que le secrétaire ne ressaisisse rien à la main. {{nom:produit}} s’occupe de la vie quotidienne du club : la permanence d’inscription, les relances, les convocations, le planning, jusqu’à l’assemblée générale.`,
          `Le produit est fait par Stackup Agency, une agence d’une personne. Vous parlez donc toujours à Mathéo Reboul, de la première question jusqu’à la prise en main par votre bureau.`,
          `Ce que cela change pour un club de la région est très concret. Le président n’a plus à jongler entre un tableur, une boîte mail personnelle et un vieux site que personne n’ose toucher. Le trésorier retrouve les paiements au même endroit que les adhésions. L’enseignant fait l’appel sur son téléphone, au bord du court, et les annulations de séance partent vers les familles sans coup de fil. Le capitaine voit qui est disponible avant de composer son équipe.`,
          `Rien de tout cela ne dépend de la taille du club. Un club de village n’utilisera pas les mêmes fonctions qu’un club d’agglomération, mais tous deux gardent la même logique : une information saisie une seule fois, visible par ceux qui en ont besoin.`,
        ],
      },
      {
        id: 'six-departements-six-realites',
        titre: 'Six départements, six réalités de club : laquelle est la vôtre ?',
        paragraphes: [
          `La région rassemble des paysages et des manières de jouer très différentes. Un club de Beauce ne vit pas comme un club de Sologne, et un club d’une petite ville du Berry n’a pas les mêmes contraintes qu’un club de l’agglomération d’Orléans. Chaque département a donc sa page, avec ses villes, ses déplacements et ses habitudes.`,
        ],
        liste: [
          `[Cher](/clubs-de-tennis/cher) : le Berry, ses grandes distances et ses clubs de bourg.`,
          `[Eure-et-Loir](/clubs-de-tennis/eure-et-loir) : la Beauce, le Perche et la proximité de l’Île-de-France.`,
          `[Indre](/clubs-de-tennis/indre) : la Brenne, le Boischaut et des bureaux de club très restreints.`,
          `[Indre-et-Loire](/clubs-de-tennis/indre-et-loire) : la Touraine, où se trouve notre référence, le Tennis Club Savigné-Gizeux.`,
          `[Loir-et-Cher](/clubs-de-tennis/loir-et-cher) : la Sologne, la vallée de la Loire et celle du Loir.`,
          `[Loiret](/clubs-de-tennis/loiret) : l’agglomération d’Orléans, le Gâtinais et la Sologne.`,
        ],
      },
      {
        id: 'comment-s-organise-le-tennis-dans-la-region',
        titre: 'Comment le tennis s’organise-t-il à l’échelle de la région ?',
        paragraphes: [
          `Chaque club est affilié à la fédération. Il est rattaché à un comité départemental, lequel dépend à son tour de la ligue régionale. Ce découpage se retrouve dans la vie du club : le comité départemental prépare les championnats par équipes des niveaux départementaux, tandis que la ligue régionale s’occupe des niveaux au-dessus et du calendrier régional.`,
          `Pour un capitaine, cela veut dire des journées de match dans plusieurs villes, parfois loin du club. Pour un secrétaire, cela veut dire des dates à relayer à tout le monde et des équipes à composer chaque saison. C’est l’endroit où un site à jour et un outil de [convocation des équipes](/clubs-de-tennis/fonctionnalites/equipes-et-competitions) évitent des dizaines de messages éparpillés.`,
          `Nous ne remplaçons ni la ligue, ni le comité, ni la fédération. Nous aidons le club à mieux relayer ce qu’ils publient, et à garder ses propres informations en ordre.`,
          `La région est aussi un territoire de déplacements : on traverse le Val de Loire, on franchit les plateaux de Beauce, on contourne la Sologne. Un match à l’extérieur y prend facilement une demi-journée. Raison de plus pour que les informations pratiques (adresse du club adverse, heure de rendez-vous, covoiturage) arrivent à tous en un seul message, et non au fil de dix conversations.`,
        ],
      },
      {
        id: 'petit-club-rural-ou-club-d-agglomeration',
        titre: 'Petit club de village ou club d’agglomération : qu’est-ce qui change pour le bureau ?',
        paragraphes: [
          `Dans un petit club de village, tout repose sur deux ou trois bénévoles. Le président est aussi trésorier, parfois enseignant, souvent le seul à savoir où est rangé le fichier des adhérents. Ce qui lui manque, c’est du temps. Il lui faut un site qu’il met à jour depuis son téléphone et un outil qui relance les cotisations à sa place.`,
          `Dans un club d’agglomération, le bureau est plus étoffé, mais les sujets s’empilent : plusieurs groupes à l’école de tennis, de nombreuses équipes, des enseignants salariés, des parents qui posent des questions toute la semaine. Là, c’est la répartition des rôles qui compte : chacun ne voit que ce qui le concerne, et le [journal](/clubs-de-tennis/fonctionnalites/ma-journee-et-automatisations) garde la trace de qui a fait quoi.`,
          `Les catégories de prix suivent cette réalité : elles dépendent du nombre de licenciés de la saison, padel et pickleball compris. Un petit club ne paie pas pour des fonctions de grand club.`,
        ],
      },
      {
        id: 'rendez-vous-sur-place-ou-en-visio',
        titre: 'Rendez-vous sur place ou en visio : comment cela se passe-t-il ?',
        paragraphes: [
          `Le premier rendez-vous en présentiel est gratuit jusqu’à {{club:km}} km de Savigné-sur-Lathan. Au-delà, deux solutions : une visio, qui suffit très bien pour présenter le produit et recueillir vos besoins, ou une indemnité de déplacement établie sur devis si vous tenez à vous voir autour d’une table.`,
          `Selon la distance, le [simulateur](/clubs-de-tennis/simulateur) indique si le déplacement est gratuit. Il suffit de saisir la commune du club. Vous pouvez aussi regarder la [démo](/clubs-de-tennis/demo) seul, avant tout échange, ou [demander un appel](/contact?a=appel).`,
        ],
      },
      {
        id: 'quel-prix-pour-un-club-de-la-region',
        titre: 'Quel budget prévoir ?',
        paragraphes: [
          `Les prix sont indicatifs et établis pour un club type de chaque catégorie. À titre d’exemple, la formule complète pour un club de catégorie moyenne démarre à partir de {{club:abo-moyen-pack}} € par mois, avec une remise de {{club:remise-pack}} % quand vous prenez le site et le logiciel ensemble. La mise en place se règle en {{club:fois}} fois sans frais.`,
          `Le détail par catégorie est sur la page des [tarifs](/clubs-de-tennis/tarifs). Le devis définitif suit un premier échange.`,
        ],
      },
    ],
    faq: [
      {
        q: 'Intervenez-vous dans tous les départements de la région ?',
        a: 'Oui. Mathéo Reboul est basé en Touraine et se déplace dans les six départements. Selon la distance, le simulateur indique si le déplacement du premier rendez-vous est gratuit ; sinon, la visio ou une indemnité sur devis prennent le relais.',
      },
      {
        q: 'Mon club n’est pas dans la région, puis-je quand même vous contacter ?',
        a: 'Oui. Tout le travail peut se faire à distance, en visio et par écrit, partout en France. La page régionale décrit simplement le terrain que nous connaissons le mieux.',
      },
      {
        q: 'Faut-il quitter ADOC pour utiliser {{nom:produit}} ?',
        a: 'Non. ADOC reste l’outil administratif de la fédération. {{nom:produit}} permet l’import et l’export des fichiers ADOC et prend en charge le reste de la vie du club.',
      },
      {
        q: 'Les sections padel et pickleball sont-elles prises en charge ?',
        a: 'Oui, le site peut avoir des sections dédiées et leurs licenciés comptent dans la catégorie du club. Les pages sur le padel et le pickleball détaillent ce que cela change.',
      },
    ],
    voisines: ['indre-et-loire', 'loiret', 'cher', 'padel'],
    maj: '2026-10-30',
  },

  {
    slug: 'indre-et-loire',
    type: 'departement',
    nom: 'Indre-et-Loire',
    code: '37',
    etiquette: 'Département 37',
    titre: 'Site internet et logiciel pour club de tennis en Indre-et-Loire (37)',
    reponse:
      'Oui. {{nom:produit}} est fait en Indre-et-Loire, à Savigné-sur-Lathan, et utilisé par le Tennis Club Savigné-Gizeux, dont le fondateur est vice-président. Le premier rendez-vous en présentiel est gratuit jusqu’à {{club:km}} km de Savigné-sur-Lathan ; au-delà, visio ou indemnité de déplacement sur devis.',
    titleSeo: 'Site et logiciel pour club de tennis en Indre-et-Loire (37)',
    descriptionSeo:
      'Site internet et logiciel de gestion pour club de tennis en Indre-et-Loire : un créateur basé à Savigné-sur-Lathan, rendez-vous sur place ou en visio.',
    communes: [
      'Tours',
      'Joué-lès-Tours',
      'Saint-Cyr-sur-Loire',
      'Saint-Pierre-des-Corps',
      'Chambray-lès-Tours',
      'Saint-Avertin',
      'La Riche',
      'Fondettes',
      'Ballan-Miré',
      'Montlouis-sur-Loire',
      'Amboise',
      'Chinon',
      'Loches',
      'Langeais',
      'Bourgueil',
      'Château-Renault',
      'Sainte-Maure-de-Touraine',
      'Savigné-sur-Lathan',
    ],
    sections: [
      {
        id: 'un-createur-installe-en-touraine',
        titre: 'Pourquoi choisir un créateur installé en Touraine ?',
        paragraphes: [
          `{{nom:produit}} n’a pas été imaginé dans un bureau parisien. Il est fabriqué à Savigné-sur-Lathan, dans le nord-ouest de l’Indre-et-Loire, par Mathéo Reboul. Quand un président de club d’Amboise, de Chinon ou de Loches pose une question, la personne qui répond connaît le département, ses routes, ses horaires de bénévoles et la manière dont les clubs s’y organisent.`,
          `Concrètement, vous avez deux outils réunis : un [site internet](/clubs-de-tennis/site-internet) que le club modifie seul, et un [logiciel de gestion](/clubs-de-tennis/logiciel-de-gestion) pour le bureau. Les deux sont connectés en direct : une adhésion saisie sur le site apparaît tout de suite chez le secrétaire, sans fichier à recopier.`,
        ],
      },
      {
        id: 'le-tennis-club-savigne-gizeux-notre-reference',
        titre: 'Qui utilise déjà la solution dans le département ?',
        paragraphes: [
          `Notre référence est le Tennis Club Savigné-Gizeux (TCSG). Mathéo Reboul en est le vice-président : il n’a pas conçu l’outil en imaginant les besoins d’un club, il l’a construit en vivant ceux de son propre club. La permanence d’inscription de septembre, la composition des équipes, les rappels de cotisation et les messages aux parents sont des sujets qu’il connaît de l’intérieur.`,
          `Vous pouvez voir le résultat sur la page [réalisation du Tennis Club Savigné-Gizeux](/realisations/tennis-club-savigne-gizeux). C’est un exemple réel, à ne pas confondre avec la [démo](/clubs-de-tennis/demo), qui présente un club fictif où vous pouvez cliquer partout sans rien casser.`,
          `Nous n’affichons aucun avis recueilli ailleurs et aucun logo d’autre club : un seul club est cité, parce que c’est le seul dont nous pouvons parler en toute franchise.`,
        ],
      },
      {
        id: 'les-villes-et-les-vallees-du-departement',
        titre: 'Quelles villes et quels secteurs du département couvrons-nous ?',
        paragraphes: [
          `Le département se lit autour de quelques vallées. L’agglomération de Tours est au centre, entre la Loire et le Cher : Joué-lès-Tours, Saint-Cyr-sur-Loire, Saint-Pierre-des-Corps, Chambray-lès-Tours, Saint-Avertin, La Riche, Fondettes et Ballan-Miré forment un ensemble de communes presque continu. Les clubs de ce secteur ont souvent des bureaux étoffés, une école de tennis à plusieurs groupes et des équipes engagées dans de nombreux championnats.`,
          `Le long de la Loire, vers l’est, on trouve Montlouis-sur-Loire puis Amboise. Vers l’ouest, Langeais ouvre sur la vallée qui mène à Bourgueil. Au sud, Chinon et la Vienne, puis Loches et la vallée de l’Indre, avec Sainte-Maure-de-Touraine sur l’axe qui descend vers Poitiers. Au nord-est, Château-Renault tient le rôle de petite ville de référence.`,
          `Savigné-sur-Lathan, où nous sommes installés, appartient au pays du Lathan, entre Bourgueil, Langeais et Château-la-Vallière : un territoire de communes rurales où chaque club compte sur peu de bénévoles. Nous connaissons ce quotidien.`,
        ],
        liste: [
          `Agglomération de Tours : clubs nombreux, bureaux étoffés, plusieurs enseignants.`,
          `Vallée de la Loire (Montlouis-sur-Loire, Amboise, Langeais, Bourgueil) : clubs de villes moyennes et de bourgs, forte vie associative l’été.`,
          `Chinon et la vallée de la Vienne : clubs de petite ville, parfois à cheval sur plusieurs communes.`,
          `Loches, Sainte-Maure-de-Touraine et le sud du département : distances plus longues et clubs plus isolés.`,
          `Pays du Lathan et nord-ouest : villages, effectifs réduits, bureaux de quelques personnes.`,
        ],
      },
      {
        id: 'club-rural-ou-club-de-l-agglomeration-tourangelle',
        titre: 'Club de village ou club de l’agglomération tourangelle : quelle formule ?',
        paragraphes: [
          `Dans un petit club rural d’Indre-et-Loire, la priorité est de ne pas ajouter du travail aux bénévoles. Le plus souvent, c’est le [site](/clubs-de-tennis/site-internet) qui apporte le gain le plus immédiat : horaires, tarifs, contact et formulaire d’adhésion toujours à jour, sans appeler le président. Le logiciel vient ensuite, quand la gestion des licences et des cotisations devient lourde.`,
          `Dans un club de l’agglomération de Tours, les besoins se déplacent vers l’organisation : [école de tennis](/clubs-de-tennis/fonctionnalites/ecole-de-tennis) avec appel sur téléphone, [équipes et compétitions](/clubs-de-tennis/fonctionnalites/equipes-et-competitions), suivi des paiements, rôles distincts entre président, trésorier, enseignants et capitaines. La formule complète a alors tout son sens.`,
          `Dans les deux cas, la catégorie dépend du nombre de licenciés de la saison en cours, tennis, padel et pickleball compris. Elle est revue une fois par an, jamais en cours de saison.`,
        ],
      },
      {
        id: 'comment-le-tennis-s-organise-dans-le-departement',
        titre: 'Comment le tennis s’organise-t-il en Indre-et-Loire ?',
        paragraphes: [
          `Comme partout, les clubs du département sont affiliés à la fédération et rattachés au comité départemental. C’est lui qui prépare les championnats par équipes départementaux ; les niveaux supérieurs relèvent de la ligue régionale. Les journées de match mènent donc les équipes d’un bout à l’autre du département, du Chinonais jusqu’au nord de Tours, et parfois au-delà.`,
          `Cette organisation se vit au quotidien : un capitaine qui doit réunir huit personnes un samedi matin, un secrétaire qui relaie un calendrier, un trésorier qui vérifie que les licences sont bien prises. Pour garder tout cela lisible, l’import et l’export des fichiers ADOC évitent la double saisie, et le [journal du logiciel](/clubs-de-tennis/fonctionnalites/import-export-adoc) garde la trace de ce qui a été importé.`,
        ],
      },
      {
        id: 'rendez-vous-en-presentiel-ou-en-visio',
        titre: 'Peut-on se rencontrer sur place ? À quelles conditions ?',
        paragraphes: [
          `Oui, et nous le conseillons. Le premier rendez-vous en présentiel est gratuit jusqu’à {{club:km}} km de Savigné-sur-Lathan. Nous venons au club, nous regardons les courts, le club-house, le tableau d’affichage, la façon dont les inscriptions se passent aujourd’hui. Souvent, une heure sur place remplace dix échanges de messages.`,
          `Si votre club est plus loin, la visio fait très bien l’affaire pour le premier échange. Si vous préférez vraiment un rendez-vous sur place, une indemnité de déplacement est proposée sur devis, annoncée avant toute décision. Pour savoir dans quel cas vous êtes, le [simulateur](/clubs-de-tennis/simulateur) calcule selon la distance et indique si le déplacement est gratuit.`,
          `Pour un club de l’agglomération de Tours, de la vallée de la Loire ou du pays du Lathan, la réponse est le plus souvent simple. Pour le sud du département, le simulateur tranche en quelques secondes.`,
        ],
      },
      {
        id: 'quel-budget-pour-un-club-d-indre-et-loire',
        titre: 'Combien coûte une offre de ce type pour un club tourangeau ?',
        paragraphes: [
          `Prenons un club de catégorie moyenne, pour donner un ordre de grandeur. Le site seul démarre à partir de {{club:abo-moyen-site}} € par mois, le logiciel à partir de {{club:abo-moyen-logiciel}} € par mois, et les deux ensemble à partir de {{club:abo-moyen-pack}} € par mois grâce à la remise du pack. S’y ajoute une mise en place, payable en {{club:fois}} fois sans frais.`,
          `Ce sont des estimations. Le devis définitif suit un premier échange, et les [tarifs](/clubs-de-tennis/tarifs) détaillent chaque catégorie. Pour une demande précise, vous pouvez aussi [prendre rendez-vous](/contact?a=appel).`,
        ],
      },
    ],
    faq: [
      {
        q: 'Le premier rendez-vous est-il vraiment gratuit en Indre-et-Loire ?',
        a: 'Le premier rendez-vous en présentiel est gratuit jusqu’à {{club:km}} km de Savigné-sur-Lathan. Au-delà, nous proposons une visio, ou une indemnité de déplacement sur devis. Le simulateur calcule selon la distance.',
      },
      {
        q: 'Qui est le Tennis Club Savigné-Gizeux ?',
        a: 'C’est notre référence : un club tourangeau qui utilise la solution et dont Mathéo Reboul est le vice-président. Sa page de réalisation montre le résultat concret.',
      },
      {
        q: 'Mon club est près de Tours, aurez-vous des rendez-vous à distance ?',
        a: 'Pas forcément. Selon la distance, le simulateur indique si le déplacement est gratuit. La visio reste disponible si votre bureau préfère échanger de chez lui, le soir.',
      },
      {
        q: 'Que se passe-t-il si mon club n’a que quelques bénévoles ?',
        a: 'C’est justement le cas pour lequel l’outil est pensé. Le site se modifie depuis un téléphone, et le logiciel relance les cotisations et prépare les convocations à la place du bureau.',
      },
      {
        q: 'Peut-on commencer par le site et ajouter le logiciel plus tard ?',
        a: 'Oui. Les formules sont indépendantes : site, logiciel, ou les deux. La remise du pack s’applique quand vous prenez les deux ensemble.',
      },
    ],
    voisines: ['centre-val-de-loire', 'loir-et-cher', 'indre', 'padel'],
    maj: '2026-10-30',
  },

  {
    slug: 'cher',
    type: 'departement',
    nom: 'Cher',
    code: '18',
    etiquette: 'Département 18',
    titre: 'Site internet et logiciel pour club de tennis dans le Cher (18)',
    reponse:
      'Oui. {{nom:produit}} peut équiper les clubs du Cher, de Bourges à Saint-Amand-Montrond. Le département est étendu : selon la distance, le simulateur indique si le déplacement est gratuit, et la visio permet de tout faire sans bouger.',
    titleSeo: 'Site et logiciel pour club de tennis dans le Cher (18)',
    descriptionSeo:
      'Site internet et logiciel de gestion pour club de tennis dans le Cher : Bourges, Vierzon, Saint-Amand-Montrond, rendez-vous en visio ou sur place.',
    communes: [
      'Bourges',
      'Vierzon',
      'Saint-Amand-Montrond',
      'Mehun-sur-Yèvre',
      'Saint-Doulchard',
      'Sancerre',
      'Aubigny-sur-Nère',
      'Saint-Florent-sur-Cher',
    ],
    sections: [
      {
        id: 'un-departement-etire-du-nord-au-sud',
        titre: 'Le Cher est étendu : qu’est-ce que cela change pour un club ?',
        paragraphes: [
          `Le Cher se traverse en longueur. Au nord, Vierzon et Aubigny-sur-Nère regardent vers la Sologne et le Loiret. Au centre, Bourges, la préfecture, concentre les services, les grands équipements et le plus gros du monde associatif. Plus au sud, on entre dans le Boischaut, avec Saint-Amand-Montrond comme ville de référence, puis les premières terres du Bourbonnais. À l’est, Sancerre et ses vignes dominent la Loire.`,
          `Pour un club, cet étirement se paie en kilomètres : une journée de championnat par équipes peut mener à une heure ou plus de route, et un enseignant qui intervient dans deux communes passe du temps au volant. Ce qui compte alors, c’est de réduire tout ce qui n’a pas besoin d’un déplacement ou d’un appel : l’information doit être disponible sur le [site du club](/clubs-de-tennis/site-internet) avant même que quelqu’un la demande.`,
        ],
      },
      {
        id: 'bourges-vierzon-saint-amand-trois-poles',
        titre: 'Bourges, Vierzon, Saint-Amand-Montrond : trois pôles, trois façons de faire vivre un club',
        paragraphes: [
          `À Bourges et dans sa périphérie (Saint-Doulchard, Mehun-sur-Yèvre), les clubs vivent au rythme d’une ville universitaire et administrative : des adhérents qui travaillent en horaires décalés, des enfants scolarisés à plusieurs endroits, une demande de créneaux variés. Le planning global et les [réinscriptions en ligne](/clubs-de-tennis/fonctionnalites/adhesions-reinscriptions-en-ligne) y prennent tout leur sens.`,
          `À Vierzon, au carrefour des routes vers Orléans, Tours et Châteauroux, un club reçoit des joueurs de plusieurs directions. Un site clair, avec les contacts, les horaires et la fiche d’inscription, aide les nouveaux arrivants qui ne connaissent personne.`,
          `À Saint-Amand-Montrond et dans le sud, les clubs sont souvent plus isolés et les bureaux plus petits. Une seule personne peut cumuler les rôles de secrétaire, de trésorier et de webmestre. C’est le terrain où l’outil doit travailler à sa place.`,
        ],
      },
      {
        id: 'la-realite-des-petits-clubs-de-bourg',
        titre: 'La réalité d’un club de bourg dans le Berry',
        paragraphes: [
          `Dans les communes du Berry, le club de tennis fait partie des associations sportives qui animent la commune toute l’année. Il tient grâce à quelques personnes fidèles, qui ont chacune un emploi, une famille et d’autres engagements dans le village. Le renouvellement du bureau est une inquiétude constante : quand le trésorier part, ses habitudes partent avec lui.`,
          `C’est la raison pour laquelle le logiciel de gestion garde l’essentiel dans un même endroit : adhérents, paiements, documents, [rôles](/clubs-de-tennis/logiciel-de-gestion) et journal. Un nouveau trésorier retrouve l’historique au lieu de reconstituer un tableur égaré. Le club garde la maîtrise de ses données et peut en demander un export complet à tout moment.`,
          `Cela rassure aussi les anciens, qui craignent qu’un outil informatique ne les dépasse. Ici, chaque personne ne voit que les écrans de son rôle : la trésorière ne se perd pas dans les convocations, le capitaine ne touche pas aux paiements. Moins d’écrans, moins de peur de se tromper.`,
        ],
        liste: [
          `Un site dont les textes se changent depuis un téléphone, entre deux séances.`,
          `Des relances de cotisation envoyées automatiquement par e-mail.`,
          `Des convocations qui évitent les appels en chaîne la veille d’un match.`,
          `Des droits distincts pour chaque membre du bureau.`,
        ],
      },
      {
        id: 'les-rendez-vous-dans-le-cher',
        titre: 'Visio ou rendez-vous sur place : que prévoir dans le Cher ?',
        paragraphes: [
          `Le Cher est en partie à portée de notre déplacement gratuit, en partie au-delà. Le premier rendez-vous en présentiel est gratuit jusqu’à {{club:km}} km de Savigné-sur-Lathan ; pour les communes plus éloignées, nous faisons le premier échange en visio, ce qui évite à un bénévole de bloquer sa soirée. Une indemnité de déplacement peut être chiffrée sur devis si le bureau tient à une rencontre sur place.`,
          `Selon la distance, le simulateur indique si le déplacement est gratuit. Vous pouvez le [lancer ici](/clubs-de-tennis/simulateur), puis [demander une démonstration](/contact?a=demo) si vous voulez voir le produit avec votre bureau réuni.`,
        ],
      },
      {
        id: 'quel-calendrier-sportif-dans-le-cher',
        titre: 'Comment le calendrier sportif se répartit-il entre le comité et la ligue ?',
        paragraphes: [
          `Le comité départemental du Cher organise les compétitions de niveau départemental ; la ligue régionale prend le relais pour les niveaux supérieurs. Un club du Cher croise donc des adversaires venus de communes parfois très éloignées, y compris des départements voisins pour les niveaux régionaux.`,
          `Mieux vaut que les équipes sachent à l’avance qui joue, où et à quelle heure. La page [équipes et compétitions](/clubs-de-tennis/fonctionnalites/equipes-et-competitions) montre comment un capitaine recueille les disponibilités, compose l’équipe et envoie les convocations, avec une proposition de covoiturage quand le trajet est long.`,
          `Les saisons comptent aussi. Dans le Cher, comme ailleurs, la rentrée de septembre concentre les inscriptions, les réinscriptions et les premières convocations. Un club qui prépare cette période à l’avance, avec des relances déjà programmées et un formulaire d’adhésion prêt, aborde l’automne plus sereinement qu’un club qui découvre le travail en arrivant à la permanence.`,
          `Pour comparer avec un département voisin au paysage très différent, voyez l’[Indre](/clubs-de-tennis/indre) ou le [Loir-et-Cher](/clubs-de-tennis/loir-et-cher).`,
        ],
      },
    ],
    faq: [
      {
        q: 'Mon club du Cher est loin de Savigné-sur-Lathan, est-ce un problème ?',
        a: 'Non. Selon la distance, le simulateur indique si le déplacement est gratuit. Sinon, le premier échange se fait en visio, ou avec une indemnité de déplacement sur devis.',
      },
      {
        q: 'Notre bureau n’est joignable que le soir, comment faire ?',
        a: 'La visio est faite pour cela. Nous pouvons convenir d’un horaire en soirée, puis le bureau reprend seul la main sur le site et le logiciel ensuite.',
      },
      {
        q: 'Notre site actuel est ancien, peut-on reprendre son contenu ?',
        a: 'Oui, la reprise du contenu de l’ancien site est une option facturée à la page, avec un prix indicatif consultable sur la page des tarifs.',
      },
      {
        q: 'Une seule personne gère tout dans notre club, est-ce adapté ?',
        a: 'Oui, c’est même un cas très courant dans le Berry. Les relances et les convocations partent automatiquement, ce qui réduit ce que cette personne doit faire elle-même.',
      },
    ],
    voisines: ['indre', 'loiret', 'loir-et-cher', 'centre-val-de-loire'],
    maj: '2026-10-30',
  },

  {
    slug: 'eure-et-loir',
    type: 'departement',
    nom: 'Eure-et-Loir',
    code: '28',
    etiquette: 'Département 28',
    titre: 'Site internet et logiciel pour club de tennis en Eure-et-Loir (28)',
    reponse:
      'Oui. {{nom:produit}} convient aux clubs d’Eure-et-Loir, de Chartres à Dreux et de Châteaudun à Nogent-le-Rotrou. Le département est plus éloigné de la Touraine : selon la distance, le simulateur indique si le déplacement est gratuit, et la visio fait le reste.',
    titleSeo: 'Site et logiciel pour club de tennis en Eure-et-Loir (28)',
    descriptionSeo:
      'Site internet et logiciel de gestion pour club de tennis en Eure-et-Loir : Chartres, Dreux, Châteaudun, rendez-vous en visio ou sur place.',
    communes: [
      'Chartres',
      'Dreux',
      'Châteaudun',
      'Nogent-le-Rotrou',
      'Lucé',
      'Mainvilliers',
      'Vernouillet',
      'Luisant',
      'Épernon',
      'Maintenon',
      'Bonneval',
      'Anet',
    ],
    sections: [
      {
        id: 'beauce-perche-et-region-parisienne',
        titre: 'Beauce, Perche, Drouais : un département à plusieurs visages',
        paragraphes: [
          `L’Eure-et-Loir est le département de la région le plus tourné vers Paris. Le centre et le sud appartiennent à la Beauce, grande plaine céréalière où les villages sont séparés par de longs horizons. À l’ouest et au nord-ouest, le Perche présente des paysages plus vallonnés, avec Nogent-le-Rotrou pour ville de référence. Au nord, le Drouais gravite autour de Dreux, tout près de la limite avec les Yvelines et l’Eure.`,
          `Chartres, avec sa cathédrale, domine l’ensemble, accompagnée de ses voisines Lucé, Mainvilliers, Luisant et Champhol. Au sud, Châteaudun et Bonneval ouvrent vers la vallée du Loir. Dans le nord-est, Épernon et Maintenon sont très proches de l’Île-de-France.`,
        ],
      },
      {
        id: 'des-adherents-qui-travaillent-loin-du-club',
        titre: 'Que change la proximité de l’Île-de-France pour un club ?',
        paragraphes: [
          `Dans le nord et l’est du département, beaucoup d’adhérents travaillent dans la région parisienne ou y font des trajets quotidiens. Ils rentrent tard, arrivent au club par vagues, et n’ont pas toujours le temps de passer à la permanence. Un club qui ne sait pas les joindre perd des réinscriptions.`,
          `La réponse n’est pas d’ajouter des réunions. C’est de permettre à chaque adhérent de tout faire depuis son téléphone dans le train : renouveler la licence, régler la cotisation, répondre à une convocation. Les [adhésions et réinscriptions en ligne](/clubs-de-tennis/fonctionnalites/adhesions-reinscriptions-en-ligne) et l’[espace membre et parent](/clubs-de-tennis/fonctionnalites/espace-membre-et-parent) ont été pensés dans cet esprit.`,
          `Pour les parents, l’enjeu est le même : savoir à quelle heure et dans quel groupe est l’enfant, même quand on n’habite pas à côté du club.`,
        ],
      },
      {
        id: 'un-club-de-ville-ou-un-club-de-village-de-beauce',
        titre: 'Petits clubs de Beauce et clubs des villes : les différences qui comptent',
        paragraphes: [
          `En Beauce, un club peut se trouver dans un village de quelques rues, avec un seul court extérieur et un bureau de trois personnes. Le quotidien, c’est la météo : quand il vente ou pleut, il faut prévenir tout le monde, décaler un cours, rassurer les parents. Un message envoyé au bon groupe en quelques secondes vaut mieux que dix appels.`,
          `À Chartres ou à Dreux, les clubs ont davantage de structure : plusieurs enseignants, une école de tennis découpée par niveaux, des événements plus nombreux. Le besoin est celui d’une vraie [communication](/clubs-de-tennis/fonctionnalites/communication) par e-mail et par notification sur le téléphone, avec des listes de diffusion propres, au lieu de groupes de messagerie qui se perdent.`,
          `Entre les deux, les clubs de villes moyennes comme Châteaudun ou Nogent-le-Rotrou ont souvent un bureau actif mais fragile, très dépendant de deux ou trois bénévoles.`,
          `Dans un département de plaine, la météo a un autre effet : le vent de Beauce gêne le jeu, la pluie arrive sans prévenir sur un terrain sans abri. Savoir qu’un cours est déplacé ou annulé, et le savoir avant d’avoir pris la voiture, est le premier service que les familles attendent d’un club.`,
        ],
        liste: [
          `Village de Beauce : site simple, adhésion en ligne, rappels automatiques en cas d’intempérie.`,
          `Ville moyenne : suivi de l’école de tennis, équipes, tournois internes.`,
          `Agglomération de Chartres ou de Dreux : rôles distincts au bureau, statistiques, planning global.`,
        ],
      },
      {
        id: 'les-rendez-vous-en-eure-et-loir',
        titre: 'Rendez-vous gratuit ou visio : comment procéder depuis l’Eure-et-Loir ?',
        paragraphes: [
          `L’Eure-et-Loir se trouve au nord-est de notre base. Le premier rendez-vous en présentiel est gratuit jusqu’à {{club:km}} km de Savigné-sur-Lathan ; pour la plupart des communes du département, la visio est donc la solution la plus simple. Elle permet de montrer l’écran, de parcourir ensemble la [démo](/clubs-de-tennis/demo) et de répondre aux questions du bureau en direct.`,
          `Si votre bureau tient à une rencontre dans votre club-house, une indemnité de déplacement peut être chiffrée sur devis, avant toute décision. Selon la distance, le simulateur indique si le déplacement est gratuit : entrez la commune du club dans le [simulateur](/clubs-de-tennis/simulateur).`,
        ],
      },
      {
        id: 'competitions-et-calendrier-dans-le-28',
        titre: 'Comment les équipes se déplacent-elles pour les compétitions ?',
        paragraphes: [
          `Le comité départemental organise les rencontres de niveau départemental ; la ligue régionale gère les niveaux supérieurs. Un déplacement en Eure-et-Loir peut vouloir dire quelques minutes ou longtemps de route, selon que l’adversaire soit à l’autre bout du département ou en dehors.`,
          `Pour un capitaine, cela signifie recueillir les disponibilités à l’avance, composer l’équipe sans oublier personne, puis envoyer la convocation avec le lieu, l’horaire et la liste des voitures. C’est précisément ce que couvre la fonction [équipes et compétitions](/clubs-de-tennis/fonctionnalites/equipes-et-competitions).`,
          `Si votre club cherche à comparer avec la situation d’un département voisin, voyez le [Loiret](/clubs-de-tennis/loiret) ou le [Loir-et-Cher](/clubs-de-tennis/loir-et-cher).`,
        ],
      },
    ],
    faq: [
      {
        q: 'Mon club est en Eure-et-Loir, le déplacement est-il gratuit ?',
        a: 'Selon la distance, le simulateur indique si le déplacement est gratuit. Sinon, la visio ou une indemnité de déplacement sur devis permettent de faire le premier échange.',
      },
      {
        q: 'Nos adhérents sont souvent en déplacement pour leur travail, comment les joindre ?',
        a: 'Par e-mail et par notification sur le téléphone, depuis leur espace membre. Ils peuvent aussi renouveler leur adhésion et payer en ligne sans passer par la permanence.',
      },
      {
        q: 'Notre club a un seul court extérieur, est-ce trop petit ?',
        a: 'Non. La catégorie dépend du nombre de licenciés, pas de la taille du club-house. Un petit club paie le prix d’une petite catégorie.',
      },
      {
        q: 'Peut-on visiter la démo avant de prendre rendez-vous ?',
        a: 'Oui. La démo présente un club fictif, que vous pouvez parcourir seul, sans inscription, avant tout échange avec nous.',
      },
    ],
    voisines: ['loiret', 'loir-et-cher', 'centre-val-de-loire', 'indre-et-loire'],
    maj: '2026-10-30',
  },

  {
    slug: 'indre',
    type: 'departement',
    nom: 'Indre',
    code: '36',
    etiquette: 'Département 36',
    titre: 'Site internet et logiciel pour club de tennis dans l’Indre (36)',
    reponse:
      'Oui. {{nom:produit}} est adapté aux clubs de l’Indre, de Châteauroux aux petites communes de la Brenne et du Boischaut. Selon la distance, le simulateur indique si le déplacement est gratuit ; la visio permet de commencer sans quitter le club-house.',
    titleSeo: 'Site et logiciel pour club de tennis dans l’Indre (36)',
    descriptionSeo:
      'Site internet et logiciel de gestion pour club de tennis dans l’Indre : Châteauroux, La Châtre, Le Blanc, Issoudun, rendez-vous en visio ou sur place.',
    communes: [
      'Châteauroux',
      'Issoudun',
      'Le Blanc',
      'La Châtre',
      'Argenton-sur-Creuse',
      'Valençay',
      'Levroux',
      'Buzançais',
      'Déols',
      'Ardentes',
    ],
    sections: [
      {
        id: 'brenne-boischaut-et-grandes-plaines',
        titre: 'Brenne, Boischaut, plaine de Champagne berrichonne : un département rural',
        paragraphes: [
          `L’Indre est un département de campagne. Châteauroux, sa préfecture, et sa voisine Déols concentrent la vie urbaine. Autour, la plaine du nord, avec Issoudun et Levroux, laisse place à une agriculture ouverte. À l’ouest, la Brenne et ses étangs ; au sud, le Boischaut avec La Châtre, au pays de George Sand, et Argenton-sur-Creuse dans sa vallée. Valençay, Buzançais et Le Blanc complètent un réseau de petites villes séparées par de longues routes.`,
          `Les petites villes de l’Indre, comme Le Blanc, La Châtre, Valençay ou Buzançais, ont chacune un tissu associatif qui compte sur les mêmes personnes. Un bénévole qui s’occupe du tennis est souvent aussi dans l’association de parents d’élèves ou au comité des fêtes. Chaque minute que l’outil lui fait gagner profite à toute la commune.`,
          `Dans un territoire pareil, un club de tennis rend un service que peu d’autres structures rendent : il fait se rencontrer des habitants qui, sinon, ne se croiseraient pas. Il est aussi plus fragile, parce qu’il repose sur très peu de monde.`,
        ],
      },
      {
        id: 'quand-le-bureau-tient-a-une-ou-deux-personnes',
        titre: 'Que faire quand le bureau du club tient à une ou deux personnes ?',
        paragraphes: [
          `C’est la situation que nous rencontrons le plus souvent dans les clubs ruraux, et l’Indre n’y échappe pas. Une présidente qui est aussi secrétaire et enseigne bénévolement le mercredi. Un trésorier retraité qui garde les chèques dans une enveloppe. Un site qui n’a pas été mis à jour depuis deux saisons parce que celui qui savait s’en servir a déménagé.`,
          `Dans ces conditions, l’outil ne doit rien exiger. Le site se modifie depuis un téléphone, avec un éditeur qui se prend en main en quelques minutes. Le logiciel affiche en haut de l’écran [ce qui demande une action aujourd’hui](/clubs-de-tennis/fonctionnalites/ma-journee-et-automatisations) : une cotisation à relancer, un document manquant, une convocation à envoyer. Le reste se fait en arrière-plan.`,
          `Et si la personne qui s’en occupe s’arrête, le successeur ne repart pas de zéro : l’historique, les documents et les coordonnées sont au même endroit, avec un journal des actions.`,
        ],
      },
      {
        id: 'paiement-et-cotisations-a-la-campagne',
        titre: 'Comment encaisser les cotisations quand les adhérents sont dispersés ?',
        paragraphes: [
          `Dans l’Indre, les adhérents d’un club peuvent venir de plusieurs communes. Demander à chacun de se déplacer pour déposer un chèque est un obstacle de plus. Le [paiement en ligne via HelloAsso](/clubs-de-tennis/fonctionnalites/paiement-en-ligne-helloasso) résout cela : le paiement est gratuit pour le club, l’argent arrive directement sur le compte du club et jamais chez nous, et le suivi se fait tout seul dans le logiciel.`,
          `Les familles qui préfèrent payer autrement restent possibles : le club garde ses habitudes et note les règlements reçus. L’objectif est d’offrir un choix, pas d’en imposer un.`,
        ],
      },
      {
        id: 'visio-en-priorite-pour-l-indre',
        titre: 'Comment se passe un rendez-vous quand le club est loin ?',
        paragraphes: [
          `Une grande partie de l’Indre se situe au-delà de la zone de gratuité. Le premier rendez-vous en présentiel est gratuit jusqu’à {{club:km}} km de Savigné-sur-Lathan ; pour les clubs plus éloignés, nous commençons en visio, ce qui permet de montrer le site, de parcourir la [démo](/clubs-de-tennis/demo) et de répondre aux questions sans que personne ne fasse de route.`,
          `Si le bureau préfère malgré tout une rencontre sur place, une indemnité de déplacement peut être chiffrée sur devis, annoncée avant toute décision. Selon la distance, le simulateur indique si le déplacement est gratuit. Entrez simplement votre commune dans le [simulateur](/clubs-de-tennis/simulateur).`,
          `Cette formule a un avantage : un créneau d’une heure en soirée, depuis chez soi, sans organiser de réunion ni bloquer le club-house.`,
        ],
      },
      {
        id: 'les-championnats-quand-les-clubs-sont-eloignes',
        titre: 'Comment gérer les déplacements de matchs entre communes éloignées ?',
        paragraphes: [
          `Le comité départemental construit des poules en tenant compte de la géographie, mais dans un département rural, les trajets restent longs. Les capitaines passent beaucoup de temps à rappeler, à vérifier qui a une voiture, à décaler.`,
          `La [convocation des équipes](/clubs-de-tennis/fonctionnalites/equipes-et-competitions) rassemble tout : disponibilités, composition, lieu, horaire, covoiturage. Chacun répond depuis son téléphone et le capitaine voit d’un coup d’œil qui manque.`,
          `Une saison de tennis rythme aussi l’année du bénévole : inscriptions à la rentrée, championnats d’automne et de printemps, tournoi interne, assemblée générale. Savoir à l’avance ce qui arrive le mois suivant, grâce à l’écran du jour et aux automatisations, permet de ne plus tout porter dans sa tête.`,
          `Pour comparer avec un autre territoire rural, le [Cher](/clubs-de-tennis/cher) voisin pose des questions proches, avec une géographie différente.`,
        ],
      },
    ],
    faq: [
      {
        q: 'Nous sommes un très petit club de l’Indre, la catégorie est-elle adaptée ?',
        a: 'Oui. La plus petite catégorie existe précisément pour les clubs de petite taille. Les prix sont indicatifs et détaillés sur la page des tarifs.',
      },
      {
        q: 'Peut-on faire tout le projet en visio sans se rencontrer ?',
        a: 'Oui. Le recueil des besoins, la mise en place et la prise en main se font à distance. Un déplacement reste possible sur devis si le bureau le souhaite.',
      },
      {
        q: 'Les anciens bénévoles ont tout dans des tableurs, que devient cet historique ?',
        a: 'Le logiciel permet l’import des membres depuis un tableur ou depuis un export ADOC. Une source de données supplémentaire est proposée en option.',
      },
      {
        q: 'Comment le club recevra-t-il l’argent des cotisations en ligne ?',
        a: 'Avec HelloAsso, le paiement en ligne est gratuit pour le club et l’argent va directement sur le compte du club, sans passer par nous.',
      },
    ],
    voisines: ['cher', 'indre-et-loire', 'loir-et-cher', 'centre-val-de-loire'],
    maj: '2026-10-30',
  },

  {
    slug: 'loir-et-cher',
    type: 'departement',
    nom: 'Loir-et-Cher',
    code: '41',
    etiquette: 'Département 41',
    titre: 'Site internet et logiciel pour club de tennis en Loir-et-Cher (41)',
    reponse:
      'Oui. {{nom:produit}} convient aux clubs du Loir-et-Cher, de Blois à Vendôme et de Romorantin-Lanthenay à Montrichard. Le département touche la Touraine : selon la distance, le simulateur indique si le déplacement est gratuit.',
    titleSeo: 'Site et logiciel pour club de tennis en Loir-et-Cher (41)',
    descriptionSeo:
      'Site internet et logiciel de gestion pour club de tennis en Loir-et-Cher : Blois, Vendôme, Romorantin-Lanthenay, rendez-vous sur place ou en visio.',
    communes: [
      'Blois',
      'Vendôme',
      'Romorantin-Lanthenay',
      'Salbris',
      'Montoire-sur-le-Loir',
      'Selles-sur-Cher',
      'Saint-Aignan',
      'Montrichard',
      'Contres',
      'Mer',
      'Vineuil',
      'Lamotte-Beuvron',
    ],
    sections: [
      {
        id: 'entre-loire-loir-et-sologne',
        titre: 'Entre Loire, Loir et Sologne : où se situent les clubs ?',
        paragraphes: [
          `Le Loir-et-Cher se découpe en trois grands ensembles. Au bord de la Loire, Blois et sa périphérie, dont Vineuil, concentrent le plus d’activité, avec Mer en aval, vers la Beauce. Au nord-ouest, la vallée du Loir est dominée par Vendôme et, plus à l’ouest, par Montoire-sur-le-Loir, qui ouvre sur les confins de la Touraine. Au sud, la Sologne, de Lamotte-Beuvron à Salbris et Romorantin-Lanthenay, est un pays de forêts et d’étangs, et plus loin la vallée du Cher avec Selles-sur-Cher, Saint-Aignan et Montrichard.`,
          `Chacun de ces ensembles a son rythme. Les clubs sont répartis le long des vallées et des grands axes, plus rares dans les forêts. Une équipe de Sologne et une équipe du Vendômois ne se croisent pas souvent, sauf pour les niveaux régionaux.`,
        ],
      },
      {
        id: 'un-departement-voisin-de-la-touraine',
        titre: 'Pourquoi le Loir-et-Cher est-il notre voisin le plus proche ?',
        paragraphes: [
          `Notre base, Savigné-sur-Lathan, est en Touraine, mais le nord-ouest du Loir-et-Cher et l’est du département se trouvent dans le prolongement naturel de nos déplacements habituels. Le premier rendez-vous en présentiel est gratuit jusqu’à {{club:km}} km de Savigné-sur-Lathan, et certaines communes de la vallée du Loir ou de la vallée du Cher sont plus facilement joignables que d’autres.`,
          `La seule manière de le savoir est de regarder : selon la distance, le simulateur indique si le déplacement est gratuit. Il suffit de saisir le nom de la commune dans le [simulateur](/clubs-de-tennis/simulateur). Pour les clubs plus loin, une indemnité de déplacement sur devis ou une visio prennent le relais.`,
        ],
      },
      {
        id: 'la-vie-d-un-club-entre-vignes-et-forets',
        titre: 'Ce que vivent les clubs de la Sologne et des vallées',
        paragraphes: [
          `En Sologne, un club est souvent une association de village où le tennis côtoie la chasse, la pêche et les fêtes locales. Il y a souvent des résidents secondaires, ce qui complique les inscriptions : on ne sait pas toujours qui sera là en octobre. Dans les vallées du Cher et du Loir, la vie touristique, avec les châteaux de la Loire et les vignobles, amène des visiteurs qui souhaitent jouer l’été.`,
          `Les grandes propriétés, les châteaux et les domaines de la région attirent aussi des visiteurs d’un jour, qui cherchent parfois un court pour l’après-midi. Un club qui affiche clairement ses conditions d’accueil évite les appels au président un dimanche matin.`,
          `Pour ces publics, la clarté du site fait la différence. Un [site internet](/clubs-de-tennis/site-internet) bien structuré dit en un coup d’œil quand on peut venir, comment s’inscrire, à qui parler. Une page d’essai gratuit, un agenda abonnable, des tarifs lisibles évitent à un bénévole de répéter toujours les mêmes réponses.`,
        ],
        liste: [
          `Résidents secondaires : réinscription simple à distance.`,
          `Visiteurs de passage : informations claires sur la page d’accueil.`,
          `Familles installées : espace parent pour suivre les groupes de l’école de tennis.`,
        ],
      },
      {
        id: 'blois-vendome-romorantin-trois-villes-reperes',
        titre: 'Blois, Vendôme et Romorantin-Lanthenay : quelles différences pour un club ?',
        paragraphes: [
          `À Blois, la structure est celle d’un club d’agglomération : plusieurs groupes à l’école de tennis, un bureau partagé entre bénévoles, parfois des enseignants salariés. Les [rôles et les droits](/clubs-de-tennis/logiciel-de-gestion) permettent à chacun de voir uniquement ce qui le concerne.`,
          `À Vendôme, ville de taille moyenne au milieu des champs, le club joue souvent un rôle social important pour les jeunes. La communication avec les parents prend une grande place : horaires, annulations, événements. La [communication par e-mail et par notification](/clubs-de-tennis/fonctionnalites/communication) y est centrale.`,
          `À Salbris, à Lamotte-Beuvron ou à Contres, de plus petits clubs vivent souvent de la bonne volonté de quelques familles. L’objectif est de diminuer les tâches répétitives : une même réponse envoyée quinze fois, un même tableau recopié chaque septembre.`,
          `À Romorantin-Lanthenay et dans le sud du département, les trajets entre communes sont plus longs. Les clubs misent davantage sur la souplesse : un site complet pour que les adhérents trouvent seuls, et une gestion qui ne dépend pas de la présence physique du trésorier.`,
        ],
      },
      {
        id: 'competitions-et-liens-avec-les-departements-voisins',
        titre: 'Comment les compétitions mêlent-elles les clubs de plusieurs départements ?',
        paragraphes: [
          `Le comité départemental organise les rencontres départementales ; à partir d’un certain niveau, la ligue régionale prend le relais et il arrive que des équipes du Loir-et-Cher affrontent des clubs du Cher, du Loiret ou de l’Indre-et-Loire. Les déplacements sont alors plus longs et la préparation plus importante.`,
          `La page sur les [équipes et compétitions](/clubs-de-tennis/fonctionnalites/equipes-et-competitions) décrit comment le capitaine fait circuler les convocations. Pour comparer, vous pouvez parcourir les pages de l’[Indre-et-Loire](/clubs-de-tennis/indre-et-loire) et du [Loiret](/clubs-de-tennis/loiret).`,
        ],
      },
    ],
    faq: [
      {
        q: 'Mon club se trouve en Loir-et-Cher, le rendez-vous est-il gratuit ?',
        a: 'Cela dépend de la commune. Selon la distance, le simulateur indique si le déplacement est gratuit ; sinon, visio ou indemnité de déplacement sur devis.',
      },
      {
        q: 'Notre club accueille beaucoup de vacanciers l’été, le site peut-il en tenir compte ?',
        a: 'Oui. Vous modifiez vous-même les pages, l’agenda et le bandeau d’information, par exemple pour annoncer des horaires d’été ou des stages.',
      },
      {
        q: 'Peut-on demander une démonstration avec tout le bureau ?',
        a: 'Oui, en visio ou sur place selon la distance. Elle présente le club fictif de la démo, puis répond à vos questions précises.',
      },
      {
        q: 'Notre club a deux sites de jeu dans deux communes, est-ce possible ?',
        a: 'Oui, l’option plusieurs lieux ou sections est prévue pour cela. Son prix indicatif figure sur la page des tarifs.',
      },
    ],
    voisines: ['indre-et-loire', 'loiret', 'cher', 'eure-et-loir'],
    maj: '2026-10-30',
  },

  {
    slug: 'loiret',
    type: 'departement',
    nom: 'Loiret',
    code: '45',
    etiquette: 'Département 45',
    titre: 'Site internet et logiciel pour club de tennis dans le Loiret (45)',
    reponse:
      'Oui. {{nom:produit}} peut équiper les clubs du Loiret, d’Orléans à Montargis, de Gien à Pithiviers. Le département est dense autour d’Orléans : selon la distance, le simulateur indique si le déplacement est gratuit, et la visio complète.',
    titleSeo: 'Site et logiciel pour club de tennis dans le Loiret (45)',
    descriptionSeo:
      'Site internet et logiciel de gestion pour club de tennis dans le Loiret : Orléans, Montargis, Gien, Pithiviers, rendez-vous sur place ou en visio.',
    communes: [
      'Orléans',
      'Olivet',
      'Saint-Jean-de-Braye',
      'Saint-Jean-de-la-Ruelle',
      'Saran',
      'Fleury-les-Aubrais',
      'Montargis',
      'Pithiviers',
      'Gien',
      'Beaugency',
      'Meung-sur-Loire',
      'Sully-sur-Loire',
    ],
    sections: [
      {
        id: 'orleans-et-sa-couronne',
        titre: 'L’agglomération d’Orléans : que demande un grand club ?',
        paragraphes: [
          `Orléans, préfecture de la région, entraîne autour d’elle une couronne de communes très liées : Olivet au sud, Saint-Jean-de-Braye à l’est, Saint-Jean-de-la-Ruelle à l’ouest, Saran et Fleury-les-Aubrais au nord. Dans ce secteur, les clubs sont souvent les plus structurés du département, avec des bureaux étoffés, plusieurs enseignants, des groupes d’école de tennis nombreux et un calendrier chargé de compétitions.`,
          `À cette taille, la difficulté n’est plus de trouver quelqu’un pour faire le travail, mais de coordonner tout le monde. Qui a relancé quelle famille ? Quel enseignant a fait l’appel ? Quelle équipe est convoquée samedi ? Le [logiciel de gestion](/clubs-de-tennis/logiciel-de-gestion) répond avec des rôles distincts, un journal des actions et une vue « Ma journée » propre à chaque membre du bureau.`,
        ],
      },
      {
        id: 'de-la-beauce-au-gatinais',
        titre: 'Beauce, Gâtinais, Sologne, Val de Loire : le Loiret change de paysage tous les quelques kilomètres',
        paragraphes: [
          `Le Loiret réunit des mondes différents. Le nord, autour de Pithiviers, appartient à la Beauce. L’est, avec Montargis et la forêt d’Orléans, entre dans le Gâtinais et touche la Bourgogne. Le long de la Loire, Meung-sur-Loire, Beaugency, Sully-sur-Loire et Gien forment une chaîne de villes anciennes, tandis que le sud-ouest s’enfonce dans la Sologne.`,
          `Dans ce département, la ville est rarement loin d’une autre grande route. L’autoroute et les axes ferroviaires facilitent les déplacements vers l’Île-de-France et vers la Touraine. Cela donne à beaucoup de clubs un public mixte : des habitants installés de longue date, des familles arrivées récemment pour travailler à Orléans ou à Paris, des joueurs qui changent de club au gré des déménagements.`,
        ],
      },
      {
        id: 'accueillir-des-nouveaux-arrivants',
        titre: 'Comment un club accueille-t-il des familles qui arrivent en cours d’année ?',
        paragraphes: [
          `Dans les communes du Loiret en croissance, le club reçoit régulièrement des demandes d’essai en dehors de septembre. Le bureau n’a pas toujours le temps de répondre ni de réorienter. Une page claire sur l’essai gratuit, une fiche d’adhésion en ligne et une réponse automatique par e-mail évitent de laisser une famille sans nouvelle.`,
          `Du côté de la réinscription, le logiciel envoie les relances à la place du secrétaire et suit les [adhésions et réinscriptions en ligne](/clubs-de-tennis/fonctionnalites/adhesions-reinscriptions-en-ligne). Le secrétaire ne dépense plus sa soirée du mois d’août à recopier un tableau.`,
          `Les [statistiques](/clubs-de-tennis/fonctionnalites/statistiques) aident aussi le bureau à voir où se trouvent les familles, quels groupes se remplissent et lesquels attendent des inscriptions.`,
        ],
        liste: [
          `Essai gratuit visible dès la page d’accueil du site.`,
          `Adhésion en ligne avec pièces jointes.`,
          `Relances automatiques pour les dossiers incomplets.`,
          `Suivi de la répartition des groupes pour le bureau.`,
        ],
      },
      {
        id: 'cohabiter-avec-un-club-plus-gros-a-cote',
        titre: 'Petit club et grand club voisins : comment exister à côté d’un gros ?',
        paragraphes: [
          `Le Loiret compte aussi des villes moyennes, comme Montargis, Pithiviers et Gien, où le club de tennis fait partie du paysage associatif depuis longtemps. Les habitudes y sont solides, parfois trop : un règlement papier, un fichier ancien, des affichages au club-house que plus personne ne relit. Passer au numérique se fait mieux par étapes, en commençant par ce qui fait gagner le plus de temps à l’équipe en place.`,
          `Dans l’aire orléanaise, il n’est pas rare qu’un petit club de commune soit à quelques minutes d’un gros club d’agglomération. Le petit club n’a pas les mêmes équipements, mais il offre autre chose : de la proximité, une ambiance, des horaires plus souples. Pour que cela se sache, il doit être trouvé quand quelqu’un cherche un club près de chez lui.`,
          `C’est là que le [référencement local](/clubs-de-tennis/tarifs), proposé en option, peut aider un club à être mieux trouvé dans sa commune et autour. Nous ne promettons aucun classement : un référencement soigné augmente les chances d’être vu, il ne les garantit pas.`,
        ],
      },
      {
        id: 'rendez-vous-dans-le-loiret',
        titre: 'Rendez-vous dans le Loiret : visio, présentiel ou démonstration ?',
        paragraphes: [
          `Le Loiret se situe au nord-est de notre base. Le premier rendez-vous en présentiel est gratuit jusqu’à {{club:km}} km de Savigné-sur-Lathan, ce qui laisse de nombreuses communes du département au-delà de cette zone. Pour celles-ci, la visio donne un résultat équivalent pour un premier échange, et une indemnité de déplacement peut être chiffrée sur devis si le bureau tient à un rendez-vous sur place.`,
          `Selon la distance, le simulateur indique si le déplacement est gratuit. Vous pouvez [lancer le simulateur](/clubs-de-tennis/simulateur) ou [demander une démonstration](/contact?a=demo) pour voir le produit en situation.`,
          `Si le bureau change à la prochaine assemblée générale, la transmission est plus simple : les accès se redistribuent selon les rôles, et le nouveau trésorier ou la nouvelle secrétaire retrouve l’historique sans avoir à le reconstruire.`,
          `Pour comparer avec un département voisin, voyez l’[Eure-et-Loir](/clubs-de-tennis/eure-et-loir) ou le [Cher](/clubs-de-tennis/cher).`,
        ],
      },
    ],
    faq: [
      {
        q: 'Notre club est à Orléans, le déplacement est-il gratuit ?',
        a: 'Selon la distance, le simulateur indique si le déplacement est gratuit. Sinon, la visio est possible, ou une indemnité de déplacement sur devis.',
      },
      {
        q: 'Notre club a beaucoup d’enseignants, comment gérer les droits de chacun ?',
        a: 'Chaque personne reçoit des droits propres à son rôle : président, trésorier, secrétaire, enseignant, capitaine ou bénévole. Les comptes du bureau et des enseignants ne sont pas limités en nombre.',
      },
      {
        q: 'Peut-on recevoir des demandes d’essai toute l’année ?',
        a: 'Oui. Le site comporte une page d’essai gratuit et le formulaire alimente directement le logiciel, ce qui évite les demandes oubliées.',
      },
      {
        q: 'Les prix changent-ils si notre club grandit ?',
        a: 'La catégorie est revue une fois par an, au renouvellement, selon le nombre de licenciés de la saison en cours. Elle n’est jamais modifiée en cours de saison.',
      },
    ],
    voisines: ['eure-et-loir', 'loir-et-cher', 'cher', 'centre-val-de-loire'],
    maj: '2026-10-30',
  },

  {
    slug: 'padel',
    type: 'thematique',
    nom: 'Padel',
    etiquette: 'Padel',
    titre: 'Gérer une section padel dans un club de tennis : site et logiciel',
    reponse:
      'Oui. Quand un club ouvre une section padel, ce qui change vraiment, ce sont les courts, les créneaux, les licences, les équipes et les tarifs. {{nom:produit}} permet de les gérer dans le même outil que le tennis, avec une section dédiée sur le site. Les licenciés de padel comptent dans la catégorie du club.',
    titleSeo: 'Section padel dans un club de tennis : site et gestion',
    descriptionSeo:
      'Ouvrir une section padel dans un club de tennis : courts, créneaux, licences, équipes, inscriptions et site dédié, avec un seul outil de gestion.',
    sections: [
      {
        id: 'ce-qui-change-quand-on-ouvre-une-section-padel',
        titre: 'Que change l’arrivée du padel dans un club de tennis ?',
        paragraphes: [
          `Le padel se joue à quatre, toujours en double, sur un terrain plus petit qu’un court de tennis, entouré de parois. Pour un club, ce n’est pas une simple variante : il faut un équipement spécifique, de nouveaux horaires, un public souvent différent. Certains nouveaux joueurs n’ont jamais joué au tennis et arrivent par un ami, en groupe, avec l’envie de réserver une heure plutôt que de s’inscrire à l’année.`,
          `Pour le bureau, cela veut dire de nouveaux sujets en parallèle de ceux du tennis : une autre grille de créneaux, d’autres tarifs, des équipes qui s’inscrivent dans leurs propres compétitions, des licences à prendre. Si tout reste dans un tableur ou dans la tête du président, la section padel devient vite une charge à part.`,
          `Le guide [ouvrir une section padel ou pickleball : la gestion](/clubs-de-tennis/guides/ouvrir-section-padel-pickleball-gestion) reprend ces questions dans l’ordre.`,
        ],
      },
      {
        id: 'courts-et-creneaux',
        titre: 'Comment organiser les courts et les créneaux ?',
        paragraphes: [
          `Un court de padel se réserve par créneau, à l’heure ou à la demi-heure selon l’usage du club. Il faut décider quels créneaux sont réservés aux membres, lesquels sont ouverts aux joueurs extérieurs, lesquels sont pris par l’école ou par les entraînements d’équipe. Les erreurs de planning se paient tout de suite : deux groupes sur le même court un mardi soir sont deux groupes mécontents.`,
          `Le planning global du logiciel montre les courts et les activités sur un même écran. La [réservation de courts en ligne](/clubs-de-tennis/fonctionnalites/reservation-de-courts) est une option : à partir de {{club:opt-reservation-courts-mensuel}} € par mois, plus {{club:opt-reservation-courts-mep}} € de mise en place, pour que les joueurs réservent depuis leur téléphone. Prix indicatifs.`,
          `Nous ne gérons pas l’ouverture physique des installations : cela reste l’affaire du club. Ce que nous gérons, c’est la réservation et l’information.`,
        ],
      },
      {
        id: 'licences-et-categorie-du-club',
        titre: 'Comment les licences de padel sont-elles prises en compte ?',
        paragraphes: [
          `Les joueurs de padel prennent une licence auprès de la fédération, comme les joueurs de tennis. Dans la gestion du club, ils sont des adhérents à part entière. Le logiciel les suit avec les autres : adhésion, paiement, pièces à fournir, licence enregistrée ou manquante.`,
          `Le point à retenir est la catégorie tarifaire : elle dépend du nombre de licenciés de la saison en cours, et les licenciés de padel comptent, au même titre que ceux du tennis et du pickleball. Un club qui développe une section padel peut donc, d’une année à l’autre, changer de catégorie. La revue se fait une fois par an au renouvellement, jamais en cours de saison, justificatif à l’appui.`,
          `Pour les échanges de données avec la fédération, nous proposons l’[import et l’export des fichiers ADOC](/clubs-de-tennis/fonctionnalites/import-export-adoc), avec un contrôle des licences manquantes.`,
        ],
      },
      {
        id: 'equipes-et-competitions-de-padel',
        titre: 'Les équipes de padel se gèrent-elles comme les équipes de tennis ?',
        paragraphes: [
          `Presque. Une équipe de padel réunit des paires, avec ses propres disponibilités, ses propres journées de rencontre et son propre capitaine. Les convocations suivent le même principe : le capitaine demande qui est libre, compose l’équipe, envoie le lieu et l’horaire. Le logiciel traite cela dans la fonction [équipes et compétitions](/clubs-de-tennis/fonctionnalites/equipes-et-competitions).`,
          `Une section récente a rarement beaucoup d’équipes. Le plus simple est donc de garder une seule organisation pour tout le club, avec des équipes de tennis et de padel côte à côte, plutôt que de multiplier les outils.`,
        ],
      },
      {
        id: 'tarifs-et-inscriptions-a-la-section',
        titre: 'Comment présenter les tarifs et recevoir les inscriptions ?',
        paragraphes: [
          `Une section padel demande généralement une tarification propre : cotisation, forfaits de créneaux, stages d’initiation, cartes de séances. C’est au club de décider de ces tarifs ; nous fournissons le moyen de les afficher et de les encaisser. Le paiement passe par HelloAsso, gratuit pour le club, l’argent allant directement sur le compte du club.`,
          `Les inscriptions se font en ligne, avec les mêmes [adhésions et réinscriptions](/clubs-de-tennis/fonctionnalites/adhesions-reinscriptions-en-ligne) que pour le reste du club. Un joueur qui vient du padel n’est donc pas obligé de passer par un formulaire papier.`,
        ],
      },
      {
        id: 'une-section-dediee-sur-le-site',
        titre: 'Peut-on avoir une page dédiée au padel sur le site du club ?',
        paragraphes: [
          `Oui. Le [site internet du club](/clubs-de-tennis/site-internet) inclut des sections dédiées au padel et au pickleball, si le club propose ces pratiques. Vous y présentez les terrains, les horaires, les tarifs, les contacts et les prochains événements, séparément du tennis. Un visiteur qui cherche « padel » arrive directement sur une page qui lui parle.`,
          `Si la section se trouve sur un autre lieu que le club principal, l’option plusieurs lieux ou sections, à partir de {{club:opt-plusieurs-lieux-mensuel}} € par mois, peut être utile. Pour voir ce que cela donne, ouvrez la [démo](/clubs-de-tennis/demo) ou comparez avec la page [pickleball](/clubs-de-tennis/pickleball).`,
        ],
      },
    ],
    faq: [
      {
        q: 'Les licenciés de padel comptent-ils dans la catégorie de mon club ?',
        a: 'Oui. La catégorie dépend du nombre de licenciés de la saison en cours, tennis, padel et pickleball compris. Elle est revue une fois par an, au renouvellement.',
      },
      {
        q: 'Le site peut-il avoir une page uniquement pour le padel ?',
        a: 'Oui. Des sections dédiées au padel et au pickleball sont incluses dans le site, si le club propose ces pratiques.',
      },
      {
        q: 'Peut-on réserver un court de padel en ligne ?',
        a: 'Oui, avec l’option de réservation de courts en ligne. Son prix indicatif figure sur la page des tarifs.',
      },
      {
        q: 'Gérez-vous l’ouverture des installations de padel ?',
        a: 'Non. Cette partie reste gérée par le club. Nous gérons la réservation, l’information et le suivi des membres.',
      },
    ],
    voisines: ['pickleball', 'centre-val-de-loire', 'indre-et-loire'],
    maj: '2026-10-30',
  },

  {
    slug: 'pickleball',
    type: 'thematique',
    nom: 'Pickleball',
    etiquette: 'Pickleball',
    titre: 'Gérer une section pickleball dans un club de tennis : site et logiciel',
    reponse:
      'Oui. Une section pickleball se gère avec les mêmes outils que le reste du club : créneaux, licences, équipes, tarifs et inscriptions. Elle apparaît sur le site dans une section dédiée, et ses licenciés comptent dans la catégorie du club, comme ceux du tennis et du padel.',
    titleSeo: 'Section pickleball dans un club de tennis : site et gestion',
    descriptionSeo:
      'Lancer une section pickleball dans un club de tennis : créneaux, initiations, licences, équipes, tarifs et inscriptions gérés avec un seul outil.',
    sections: [
      {
        id: 'le-pickleball-nouvelle-pratique-du-club',
        titre: 'Pourquoi ajouter le pickleball à un club de tennis ?',
        paragraphes: [
          `Le pickleball se joue avec une raquette pleine et une balle en plastique perforée, sur un terrain beaucoup plus petit qu’un court de tennis. Les règles sont simples à expliquer et on peut jouer dès la première séance. Pour un club, c’est une porte d’entrée : un public plus âgé, des familles, des personnes qui n’ont jamais tenu une raquette, des adhérents du tennis qui veulent changer de rythme.`,
          `C’est aussi une pratique qui se partage : on y joue souvent en double, à plusieurs générations, avec beaucoup de discussion entre les points. Le club y gagne une ambiance différente de celle des entraînements de compétition, et des liens nouveaux entre ses membres.`,
          `Contrairement au padel, le pickleball ne demande pas toujours un nouvel équipement. Il se trace souvent sur un court existant, ou dans une salle, et les poteaux se rangent facilement. Pour le bureau, cela veut dire un démarrage souple, mais aussi une organisation à inventer : à quelle heure, pour qui, à quel prix, avec quel matériel prêté.`,
        ],
      },
      {
        id: 'initiations-et-creneaux',
        titre: 'Comment organiser les premières séances et les créneaux ?',
        paragraphes: [
          `Une section pickleball commence presque toujours par des séances de découverte. Il faut annoncer le jour, l’heure, le lieu, ce qu’il faut apporter, et recueillir les noms pour savoir combien de raquettes préparer. Quand le tracé se superpose à celui d’un court de tennis, il faut aussi s’assurer que personne n’ait réservé ce court au même moment.`,
          `Le planning global du logiciel rassemble les activités et les courts : le pickleball du jeudi après-midi n’entre pas en conflit avec l’entraînement d’une équipe de tennis. Pour les [tournois internes et événements](/clubs-de-tennis/fonctionnalites/tournois-internes), le club peut ouvrir des inscriptions avec un nombre de places limité et suivre la liste d’attente.`,
        ],
        liste: [
          `Séance de découverte avec inscription préalable.`,
          `Créneaux fixes pour les joueurs réguliers.`,
          `Prêt de matériel pour les débutants, noté dans le suivi.`,
          `Tournois conviviaux, ouverts à tous les niveaux.`,
        ],
      },
      {
        id: 'licences-et-statut-des-joueurs',
        titre: 'Quels joueurs de pickleball comptent dans le club ?',
        paragraphes: [
          `Les joueurs de pickleball qui prennent une licence sont des adhérents du club, au même titre que les autres. Ils comptent dans le nombre de licenciés qui fixe la catégorie tarifaire, avec ceux du tennis et du padel. Cela peut faire passer un club à la catégorie supérieure quand la section grandit : la revue se fait une fois par an, au renouvellement, jamais en cours de saison.`,
          `Certains joueurs viennent seulement essayer et ne souhaitent pas encore s’engager. Le club peut leur proposer une séance d’essai, puis une adhésion ensuite. Le suivi des [adhésions en ligne](/clubs-de-tennis/fonctionnalites/adhesions-reinscriptions-en-ligne) permet de relancer ceux qui ont essayé sans conclure, avec un message simple.`,
        ],
      },
      {
        id: 'equipes-tarifs-et-inscriptions',
        titre: 'Que faire pour les équipes, les tarifs et les inscriptions ?',
        paragraphes: [
          `Comme la pratique est récente dans beaucoup de clubs, les équipes constituées sont rares. Si votre section en possède, la fonction [équipes et compétitions](/clubs-de-tennis/fonctionnalites/equipes-et-competitions) sert à recueillir les disponibilités et à envoyer les convocations. Sinon, vous pouvez commencer par des rencontres amicales entre sections et d’autres clubs.`,
          `Dans tous les cas, mieux vaut ne pas multiplier les listes : un seul fichier d’adhérents, un seul calendrier, un seul endroit où les joueurs retrouvent leurs convocations. La section pickleball s’intègre au reste du club au lieu de fonctionner dans son coin.`,
          `Les tarifs sont fixés par le club : cotisation spécifique, carte de séances, tarif découverte, ou inclusion dans la cotisation générale. Ils s’affichent sur le site et se paient en ligne via HelloAsso, gratuit pour le club, l’argent arrivant directement sur le compte du club. Le choix de la formule vous appartient entièrement.`,
        ],
      },
      {
        id: 'la-section-pickleball-sur-le-site',
        titre: 'Comment présenter la section pickleball sur le site ?',
        paragraphes: [
          `Le [site du club](/clubs-de-tennis/site-internet) comprend des sections dédiées si le club propose le pickleball. Une page explique le jeu en quelques phrases, montre une photo du terrain, indique les horaires et dit comment s’inscrire. C’est important : beaucoup de visiteurs n’ont jamais entendu parler de cette pratique et ont besoin d’un texte pédagogique avant de franchir la porte.`,
          `Vous pouvez compléter avec une actualité à chaque événement, un album photo dans la galerie respectant le droit à l’image, et un agenda que les visiteurs peuvent ajouter à leur téléphone. Pour une vue d’ensemble avec les autres pratiques, regardez la page [padel](/clubs-de-tennis/padel) ou le guide [ouvrir une section padel ou pickleball](/clubs-de-tennis/guides/ouvrir-section-padel-pickleball-gestion).`,
          `Pour estimer le budget de votre club, utilisez le [simulateur](/clubs-de-tennis/simulateur). Les prix y sont indicatifs.`,
        ],
      },
    ],
    faq: [
      {
        q: 'Les licenciés de pickleball comptent-ils dans la catégorie de mon club ?',
        a: 'Oui. Ils sont comptés avec ceux du tennis et du padel. La catégorie est revue une fois par an, au renouvellement.',
      },
      {
        q: 'Peut-on organiser des séances de découverte avec inscription ?',
        a: 'Oui. Le club ouvre l’inscription à un événement, limite le nombre de places si besoin et envoie un rappel aux inscrits.',
      },
      {
        q: 'Faut-il un terrain particulier pour gérer une section pickleball ?',
        a: 'Ce n’est pas une question d’outil mais de choix du club. Le logiciel gère les créneaux et les courts, quelle que soit la configuration retenue.',
      },
      {
        q: 'Le site peut-il présenter le pickleball à des personnes qui ne connaissent pas ce sport ?',
        a: 'Oui. Une section dédiée permet d’expliquer la pratique, de présenter les horaires, les tarifs et le contact de la section.',
      },
    ],
    voisines: ['padel', 'centre-val-de-loire', 'indre-et-loire'],
    maj: '2026-10-30',
  },
]
