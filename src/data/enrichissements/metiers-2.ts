import type { Enrichissements } from './types'

export const ENRICHISSEMENTS: Enrichissements = {
  'kebab-fast-food': {
    sections: [
      {
        titre: `Le coup de feu de midi, vu depuis le comptoir`,
        paragraphes: [
          `Un fast-food vit par rafales : le service de midi, la sortie des cours ou des bureaux, la soirée, le week-end. Entre la broche, la plancha, la friteuse et la caisse, personne n’a le temps de répondre au téléphone pour dire si la sauce est piquante ou si le menu étudiant existe encore. Le site tient ce rôle à votre place : carte lisible, composition de chaque sandwich, horaires exacts, y compris ceux du soir. La restauration commerciale impose d’informer sur les allergènes et d’indiquer l’origine de la viande bovine ; une page de carte bien construite le fait proprement, plat par plat, sans que vous recopiiez la même information sur trois supports.`,
          `Quand la commande en ligne arrive, le vrai sujet devient la cuisine : les tickets doivent tomber dans le bon ordre, avec l’heure de retrait demandée, sans doublon avec la caisse. Stackup réalise des sites et leurs outils internes à la demande. Un écran de préparation qui trie les commandes par heure de retrait, ou un interrupteur qui suspend la prise de commande quand la file déborde, voilà le genre de détail qui compte au quotidien. Mathéo Reboul, en Touraine, les conçoit en partant de votre manière de travailler plutôt que d’un modèle générique appliqué à tous les snacks.`,
        ],
      },
      {
        titre: `Ce que cherche celui qui a faim`,
        paragraphes: [
          `Le client d’un fast-food tape rarement un nom d’enseigne complet. Il cherche « kebab ouvert maintenant », « tacos près de moi », « menu étudiant », « livraison ou à emporter », souvent depuis un téléphone, debout sur un trottoir. Il veut trois réponses sans réfléchir : où vous êtes, si vous êtes ouvert, ce qu’il peut commander. Placez donc en tête de page le bouton d’appel, le bouton d’itinéraire et la carte, plutôt qu’une grande photo d’ambiance. Les quelques secondes gagnées à cet endroit valent plus qu’un texte de présentation soigné que personne ne lira pendant la pause déjeuner.`,
          `Les erreurs reviennent d’un site de snack à l’autre : une carte envoyée en simple photo, illisible sur mobile ; des horaires qui oublient la fermeture exceptionnelle ; des sauces et suppléments qu’il faut deviner ; une présence réduite aux plateformes de livraison, qui prélèvent une commission sur chaque commande et gardent le lien avec votre clientèle. Votre propre site garde ce lien direct. Ajoutez une page courte sur ce qui fait votre cuisine, la viande, le pain, les préparations maison, car c’est ce qu’un habitué raconte à ses collègues et ce qui donne envie à un nouveau venu.`,
        ],
      },
    ],
    faq: [
      {
        q: `Dois-je indiquer les allergènes sur le site ou seulement au comptoir ?`,
        a: `L’information sur les allergènes doit être accessible avant l’achat, y compris pour une commande à distance. Nous prévoyons donc une fiche par produit avec les allergènes cochés, que vous modifiez vous-même quand une recette ou un fournisseur change. Le client la voit avant de valider son panier.`,
      },
      {
        q: `Les clients peuvent-ils choisir leurs sauces et suppléments en ligne ?`,
        a: `Oui. Le choix se fait par étapes guidées : pain ou galette, viande, crudités, sauces, supplément, boisson. Il arrive sur le ticket de préparation dans un ordre lisible pour la cuisine, ce qui évite les erreurs de montage les soirs de forte affluence.`,
      },
      {
        q: `Que faire si je suis débordé un soir de match ?`,
        a: `Vous pouvez suspendre la prise de commande en un geste depuis votre téléphone, ou limiter les créneaux de retrait proposés. Un message prévient alors les clients que la cuisine est complète, au lieu de leur laisser attendre une commande que vous ne pouvez pas honorer.`,
      },
    ],
  },

  'food-truck': {
    sections: [
      {
        titre: `Marchés, zones d’activités, soirées privées : un planning qui bouge`,
        paragraphes: [
          `Un food truck n’a pas d’adresse fixe : c’est sa force et son premier problème. Lundi dans une zone d’activités, mercredi sur un marché, samedi à un mariage : vos clients vous ont croisé une fois et ne savent plus où vous retrouver. Le planning devient la pièce centrale du site, avec le lieu, le créneau et un lien d’itinéraire, mis à jour depuis le téléphone entre deux services. Côté papiers, stationner sur le domaine public suppose l’accord de la commune concernée et la restauration impose une formation à l’hygiène. Une page de présentation à l’intention des organisateurs les mentionne d’emblée, puisqu’ils vous les demanderont de toute façon.`,
          `Entre les demandes d’événements, les créneaux de marché et les jours de repos du camion, l’agenda se complique vite. Côté outils, un petit agenda interne qui alimente automatiquement le planning public, ou une fiche de demande d’événement qui arrive déjà triée par date, lieu et nombre de convives, évite les allers-retours de messages. Mathéo Reboul, en Touraine, propose aussi une démo de votre page d’accueil avant que vous vous engagiez ; cette démo est payante, mais elle vous montre le résultat avant toute signature. Cette démo est facturée, mais elle ne vous engage à rien d’autre.`,
        ],
      },
      {
        titre: `Les recherches qui mènent jusqu’à votre camion`,
        paragraphes: [
          `Deux publics cherchent un food truck. Le premier est le client de rue, qui tape « food truck ce midi » ou le nom du marché où il vous a vu : il lui faut le prochain emplacement, tout en haut de la page. Le second est l’organisateur, comité d’entreprise, association de commerçants, mairie ou futurs mariés, qui cherche « food truck mariage » ou « food truck séminaire ». Lui veut savoir ce que vous servez pour combien de convives, de quoi vous avez besoin sur place, quels documents vous fournissez. Deux entrées distinctes sur la page d’accueil, une par public, évitent de les mélanger.`,
          `Les erreurs courantes tiennent à l’habitude de tout confier à un réseau social : le planning se noie dans les publications, le menu est photographié de travers et rien n’est conçu pour un organisateur pressé. Il manque souvent la zone où vous vous déplacez, une adresse directe pour les devis et la preuve que vous êtes en règle. Une page de références montrant des photos du camion en service, les types d’événements assurés et la mention d’une attestation d’assurance disponible sur demande fait passer un organisateur du doute à la prise de contact.`,
        ],
      },
    ],
    faq: [
      {
        q: `Que mettre sur la page destinée aux organisateurs d’événements ?`,
        a: `Les types d’événements que vous assurez, le nombre de convives que vous pouvez servir, ce dont le camion a besoin sur place (emplacement, accès, électricité ou autonomie), les documents disponibles sur demande et un formulaire de demande détaillé. Tout se lit en une page.`,
      },
      {
        q: `Comment prévenir d’une annulation un jour de mauvais temps ?`,
        a: `Un bandeau d’alerte placé en haut de la page d’accueil affiche l’annulation ou le changement de lieu, modifiable depuis votre téléphone en quelques secondes. Le planning public se met à jour dans le même geste, et vos clients ne se déplacent plus pour rien.`,
      },
      {
        q: `Peut-on prendre des précommandes pour l’emplacement du jour ?`,
        a: `Oui. Le client choisit son plat et un créneau de retrait sur l’emplacement du jour, et vous recevez la liste classée par heure. C’est utile au marché ou en zone d’activités, quand la file se forme en quelques minutes et que chaque attente fait perdre un client.`,
      },
    ],
  },

  'brasserie-bar': {
    sections: [
      {
        titre: `Du café du matin au dernier verre du soir`,
        paragraphes: [
          `Une brasserie change de visage dans la journée : café pour les habitués, formule du midi pour les salariés des environs, apéritif en fin d’après-midi, dîner, puis soirée où le bar prend le relais. Chaque créneau a sa clientèle et son attente. Le salarié du midi veut l’ardoise du jour sans attendre, le groupe d’amis veut savoir s’il reste de la place samedi. Le site les sert tous : ardoise actualisée le matin, formules repérables, horaires distincts pour la cuisine et pour le bar, une précision que beaucoup d’établissements oublient et qui évite bien des déconvenues à vos clients.`,
          `Tenir un débit de boissons suppose une licence adaptée à ce que vous servez et le permis d’exploitation ; la vente d’alcool aux mineurs est interdite et la musique diffusée relève des droits d’auteur. Le site n’a pas à tout détailler, mais il doit rester prudent : aucune incitation à boire en excès, et la loi Evin à garder en tête pour les contenus promotionnels. Stackup, fondé par Mathéo Reboul en Touraine, peut aussi bâtir un outil de gestion des réservations de groupes qui regroupe dates, effectifs, demandes particulières et acomptes en un seul endroit.`,
        ],
      },
      {
        titre: `Ce que tapent les groupes, les afterworks et les amateurs de bière`,
        paragraphes: [
          `Les visiteurs qui vous trouvent par une recherche ne cherchent pas tous la même chose : « bar pour un anniversaire », « brasserie avec terrasse », « afterwork entre collègues », « bar pour regarder un match ». Autant de demandes qui appellent des pages précises plutôt qu’une page unique et vague. Une page terrasse avec photos et période d’ouverture, une page groupes avec capacité de la salle, une page soirées et retransmissions si vous en proposez. Le visiteur doit trouver tout de suite la réponse à sa question, sans devoir vous appeler pour savoir si la salle du fond peut être privatisée.`,
          `Les sites de bars et de brasseries commettent les mêmes fautes : une carte en photo floue, aucune distinction entre ce que sert la cuisine et ce que sert le bar, des événements annoncés seulement sur les réseaux où ils disparaissent du fil après quelques jours. L’accessibilité de l’établissement pour les personnes à mobilité réduite est rarement précisée, alors qu’elle décide de la venue d’un groupe entier. Un agenda daté, nettoyé régulièrement, vaut mieux qu’une promesse d’animations jamais mise à jour. Une soirée terminée doit disparaître, une offre périmée aussi.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment indiquer que la cuisine ferme avant le bar ?`,
        a: `Nous affichons deux séries d’horaires distinctes, celles du service en cuisine et celles du bar, sur la page d’accueil et dans la fiche pratique. Le visiteur sait d’emblée s’il peut dîner ou seulement boire un verre, et vous évitez les refus désagréables à la porte.`,
      },
      {
        q: `Puis-je annoncer mes soirées à thème et mes retransmissions de matchs ?`,
        a: `Oui, grâce à un agenda que vous alimentez vous-même : date, intitulé, éventuelle réservation conseillée. Les événements passés se retirent d’eux-mêmes de la page, ce qui évite de laisser traîner des annonces périmées, et un lien permet de partager chaque soirée.`,
      },
      {
        q: `La terrasse peut-elle s’afficher selon la météo ?`,
        a: `Un bandeau modifiable depuis votre téléphone indique si la terrasse est ouverte ce jour-là. Pas besoin de toucher au reste du site : un clic le matin suffit, et vos clients ne se retrouvent pas à l’intérieur alors qu’ils pensaient profiter du soleil.`,
      },
    ],
  },

  'cafe-salon-the': {
    sections: [
      {
        titre: `Une pause qui se prépare derrière le comptoir`,
        paragraphes: [
          `Dans un salon de thé, le calme que vos clients viennent chercher repose sur une organisation serrée : la pâtisserie du jour à sortir, les infusions à doser, la vaisselle, le service en salle, la vente de thé au poids ou en sachets à emporter. Le rythme comporte un petit matin, un déjeuner léger, un goûter qui est souvent le vrai temps fort, puis des week-ends plus chargés. Votre site gagne à refléter cette cadence : l’ardoise du jour, les pâtisseries disponibles, les horaires du goûter, les jours de fermeture. Les allergènes concernent aussi les gâteaux et les boissons végétales ; ils s’affichent fiche par fiche.`,
          `Si vous vendez aussi vos thés, deux métiers se superposent : celui de la salle et celui de la boutique, avec ses vracs, ses formats et ses expéditions. Un outil de gestion simple peut relier les deux, par exemple en marquant d’un seul clic un thé épuisé à la fois sur la carte et dans la boutique. Stackup fabrique sur mesure ce genre de petit outil. Mathéo Reboul, en Touraine, commence par observer ce que vous faites réellement avant de dessiner la moindre page, et refuse d’ajouter une fonction que vous n’utiliseriez pas.`,
        ],
      },
      {
        titre: `Thés, brunchs, travail au calme : ce qu’on cherche avant de pousser la porte`,
        paragraphes: [
          `Les recherches se partagent entre l’envie du moment, « salon de thé près de moi », « brunch le dimanche », « goûter avec des enfants », « café calme pour travailler », et la curiosité sur le produit : origine des thés, thé vert ou noir, infusions sans théine. Le visiteur compare surtout des ambiances ; il lui faut donc de vraies photos de la salle, de préférence à l’heure où elle est pleine, du mobilier, des tables. Dites si les ordinateurs sont les bienvenus, si les poussettes passent, si l’on peut réserver pour un groupe.`,
          `Les erreurs fréquentes : une carte qui ne précise pas ce qui est préparé sur place, des photos qui ressemblent à des images de banque, des horaires périmés dans un établissement qui ferme tôt, aucune indication sur les prises ou le wifi pour ceux qui viennent travailler. Citez des labels comme le bio ou le commerce équitable uniquement lorsque vos références les portent réellement. Plutôt qu’une page unique interminable, préférez de courtes pages par thème, le goûter, le brunch, la boutique de thés, que chaque visiteur retrouve facilement. Une photo de la vitrine du jour, remplacée quand la carte change, vaut mieux qu’un visuel de banque d’images.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment présenter la carte des thés sans perdre le visiteur ?`,
        a: `Nous classons les thés par famille (vert, noir, blanc, infusions) avec une fiche courte pour chacun : origine, intensité, notes aromatiques et conseil de préparation. Un filtre permet de repérer d’un coup les infusions sans théine ou les références biologiques.`,
      },
      {
        q: `Peut-on privatiser le salon pour un goûter d’anniversaire ?`,
        a: `Oui, avec une page dédiée et un formulaire qui demande la date, le nombre d’invités, l’âge des enfants le cas échéant et les allergies à connaître. Vous répondez avec ces éléments en main, sans devoir poser trois fois les mêmes questions au téléphone.`,
      },
      {
        q: `Comment gérer les gâteaux du jour qui s’épuisent ?`,
        a: `Chaque pâtisserie dispose d’un bouton « épuisé » que vous actionnez depuis votre téléphone au fil de la journée. La carte du site reste fidèle à ce qui reste en vitrine, et le client n’arrive pas avec l’envie d’un gâteau qui n’existe plus.`,
      },
    ],
  },

  'restaurant-gastronomique': {
    sections: [
      {
        titre: `Un service qui se joue bien avant la première assiette`,
        paragraphes: [
          `Dans une maison gastronomique, le travail commence des heures avant l’arrivée des convives : approvisionnement, mise en place, point entre la cuisine et la salle sur les produits du jour. Le menu évolue au fil des saisons et parfois d’un jour à l’autre ; un menu figé dans un PDF vieux de plusieurs mois dessert la maison. Le site distingue donc ce qui est permanent, la philosophie, l’équipe, les menus dégustation, de ce qui bouge, les suggestions de saison. Les allergies et régimes se déclarent avant le repas : un champ dédié dans la réservation permet à la cuisine de préparer une alternative sans surprise le soir même.`,
          `Dans ce registre, les garanties comptent. Le titre de Maître Restaurateur, délivré par l’État, ou les distinctions de guides, si vous en détenez, s’affichent de façon factuelle, avec le nom exact et l’année. Beaucoup d’adresses demandent une empreinte de carte bancaire en cas de défection ; le système de réservation doit l’expliquer sans ambiguïté. Stackup développe aussi des outils internes : Mathéo Reboul, en Touraine, sait relier carnet de réservations, fiches clients et préférences alimentaires dans un seul tableau, afin que la salle accueille chaque habitué comme un habitué. Le détail compte : un habitué retrouvé par son prénom reste fidèle.`,
        ],
      },
      {
        titre: `Ce que cherche celui qui réserve une table d’exception`,
        paragraphes: [
          `Une table gastronomique se choisit pour une occasion : anniversaire de mariage, repas d’affaires, cadeau, escapade. Les recherches mêlent le lieu, l’occasion et la crainte de se tromper. Le visiteur regarde la page du chef, le style de cuisine, la forme des menus avec leurs accords, la salle, les conditions d’accès, parfois la tenue souhaitée. Offrez-lui l’essentiel dans un ordre calme : l’esprit de la cuisine, un menu actuel, la salle, puis la réservation. Sa décision se prend souvent en quelques minutes sur un téléphone, avant d’être confirmée au calme sur un écran plus grand.`,
          `Les sites du secteur se trompent souvent sur le même point : trop d’effets. Photos si sombres ou si retouchées qu’elles ne ressemblent plus à l’assiette, musique qui démarre toute seule, formulaire de réservation caché derrière un menu déroulant. Le raffinement tient à la retenue. Autres oublis courants : aucune information sur l’accueil des enfants ou des régimes particuliers, avis cités sans source. Une page « offrir un repas » répond à une demande réelle, car le cadeau est l’une des premières raisons de visite d’un restaurant de ce niveau.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment recueillir les allergies et les régimes lors de la réservation ?`,
        a: `Le formulaire propose un champ dédié, avec des cases pour les cas fréquents et une zone libre. Ces informations arrivent avec la réservation, la cuisine les lit avant le service et peut préparer une alternative adaptée plutôt que d’improviser à table.`,
      },
      {
        q: `Peut-on vendre des bons cadeaux pour un repas ?`,
        a: `Oui. Une page « offrir un repas » présente les formules, accepte le paiement en ligne et génère un bon à imprimer ou à envoyer par e-mail. Vous définissez vous-même les conditions d’utilisation affichées, et le suivi des bons émis reste lisible côté restaurant.`,
      },
      {
        q: `Comment présenter la cave sans publier une liste interminable ?`,
        a: `Nous mettons en avant une sélection par région avec quelques accords pensés avec le sommelier, et renvoyons la carte complète à la salle. Le visiteur perçoit le caractère de la cave sans se perdre dans des centaines de références difficiles à tenir à jour.`,
      },
    ],
  },

  'traiteur-evenementiel': {
    sections: [
      {
        titre: `Du devis au dernier plateau débarrassé`,
        paragraphes: [
          `Un traiteur événementiel mène plusieurs chantiers de front : le devis du mariage de l’été prochain, la dégustation d’un menu, la prestation d’entreprise de jeudi, les achats, le matériel à charger. Les saisons dictent le calendrier : mariages au printemps et en été, séminaires à la rentrée, repas de fin d’année. Le site fait office de filtre en amont. Un formulaire qui demande la date, le lieu, le nombre de convives, le type de prestation et les contraintes alimentaires vous évite de rappeler trois fois le même prospect pour compléter son dossier, et vous montre en un coup d’œil si la date est encore libre.`,
          `Le métier est très encadré sur le plan sanitaire : plan de maîtrise sanitaire inspiré des principes HACCP, chaîne du froid, traçabilité, formation à l’hygiène, déclaration de l’activité auprès des services de l’État compétents. Votre site n’a pas à détailler ces procédures, mais une page d’engagements qui les évoque sobrement rassure les organisateurs d’entreprises, dont les cahiers des charges les demandent. Côté outils, Stackup conçoit sur mesure un suivi des devis par étape, de la demande à la signature. Mathéo Reboul, en Touraine, le bâtit autour de vos propres étapes.`,
        ],
      },
      {
        titre: `Mariage, séminaire, cocktail : trois clients, trois attentes`,
        paragraphes: [
          `Les recherches diffèrent selon l’événement. Les futurs mariés tapent « traiteur mariage » avec le nom de leur salle ou de leur département et comparent des ambiances, des souplesses, des façons de travailler. L’entreprise cherche « plateaux repas réunion » ou « cocktail d’entreprise » et veut du concret : formules, régimes, modalités de facturation, livraison. Le particulier qui prépare un baptême ou un anniversaire a besoin d’une prestation plus modeste. Une page par type d’événement, avec des exemples de buffets, de cocktails dînatoires et de repas assis, parle à chacun avec des mots justes.`,
          `Les portfolios de traiteurs pèchent par les mêmes défauts : de belles photos sans légende (combien de convives, quel type de service, quel lieu), aucune information sur le matériel et le personnel fournis, pas de menus de remplacement végétariens ou sans gluten. Ne citez jamais un client sans son accord ; décrivez plutôt la nature de l’événement. Une courte foire aux questions sur la dégustation, les acomptes et les modifications de dernière minute épargne beaucoup d’échanges, et laisse le premier rendez-vous se concentrer sur ce qui compte : le goût et l’organisation.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment gérer les régimes alimentaires et les allergies des invités ?`,
        a: `Le formulaire de demande propose une zone pour indiquer les régimes à prévoir (végétarien, sans gluten, allergies), et vos menus affichent les variantes disponibles. Vous chiffrez ainsi dès le départ des prestations adaptées, plutôt que de découvrir ces contraintes à quelques jours de l’événement.`,
      },
      {
        q: `Dois-je lister les salles de réception où j’interviens ?`,
        a: `C’est utile : les futurs mariés recherchent souvent par nom de salle. Vous pouvez présenter les lieux où vous avez l’habitude de travailler, avec l’accord de leurs gestionnaires, et préciser ce que vous apportez en matériel et en personnel sur place.`,
      },
      {
        q: `Une page dédiée aux dégustations a-t-elle un intérêt ?`,
        a: `Oui, car c’est souvent l’étape qui décide le client. La page explique comment se déroule une dégustation, ce qui est présenté, comment la demander et à quelles conditions elle s’organise. Vous qualifiez ainsi les demandes sérieuses avant d’y consacrer du temps en cuisine.`,
      },
    ],
  },

  'boucherie-charcuterie': {
    sections: [
      {
        titre: `Le comptoir, la chambre froide et le carnet de commandes`,
        paragraphes: [
          `Une boucherie-charcuterie s’organise autour de la découpe, de la maturation et de la fabrication maison : pâtés, boudins, saucisses, plats cuisinés. Les pics sont connus : le week-end, la veille des fêtes, la saison du barbecue, la fin d’année avec volailles, rôtis et foie gras. À ces moments-là, le téléphone sonne sans arrêt pendant que vous servez ceux qui font la queue. Une page de commande par jour de retrait absorbe cette pression : le client choisit les produits, la quantité et la date, et vous préparez à l’avance, sans noter à la main des commandes qui s’empilent sur le comptoir.`,
          `La réglementation vous demande d’indiquer l’origine de la viande bovine, de signaler les allergènes dans vos préparations et de respecter la traçabilité et la chaîne du froid. Chaque fiche produit du site peut reprendre l’espèce, le morceau, la provenance, le label éventuel et un conseil de cuisson. Un outil de gestion sur mesure, conçu par Mathéo Reboul en Touraine, peut regrouper les commandes par jour de retrait en une liste de préparation classée par rayon, boucherie, charcuterie, traiteur, que l’équipe lit au laboratoire plutôt que de déchiffrer un cahier. Le gain se mesure surtout les veilles de fête, quand chaque minute passée à écrire un bon de commande est une minute perdue devant le comptoir.`,
        ],
      },
      {
        titre: `Ce qu’un client cherche avant de choisir sa viande`,
        paragraphes: [
          `Celui qui cherche une boucherie en ligne se demande où acheter de la viande locale, d’où vient la bête, comment cuire une pièce peu courante, ce qu’il peut servir à douze convives. Il veut savoir si vous travaillez avec des éleveurs identifiés, si vous fabriquez vos propres préparations, si vous prenez les commandes de plateaux de fête. Une page consacrée à vos éleveurs, avec le nom de l’exploitation, la race et le terroir, répond à cette question de confiance mieux qu’une formule générale. Citez Label Rouge, IGP ou bio uniquement pour les produits qui les portent réellement.`,
          `Les sites de boucheries font souvent les mêmes erreurs : un catalogue de photos sans nom de morceau ni conseil de cuisson, aucune mention de l’origine, pas de date limite pour commander avant les fêtes, des jours de fermeture hebdomadaire oubliés, une rubrique « barbecue » créée une fois et jamais renouvelée. Pensez à ajouter une rubrique de recettes et de cuissons : elle attire les internautes qui s’interrogent sur la manière de préparer un rôti ou une côte, et elle installe votre boucherie comme celle qui explique plutôt que celle qui vend seulement.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment présenter les morceaux peu connus ?`,
        a: `Chaque morceau reçoit une fiche avec son nom, l’animal et la partie concernée, l’usage conseillé et un mode de cuisson. C’est un contenu simple à rédiger avec vous, qui répond aux recherches des clients curieux et vous évite d’expliquer la même chose au comptoir.`,
      },
      {
        q: `Que faire quand le prix final dépend de la pesée ?`,
        a: `Le client choisit une quantité estimée, et la fiche précise que le poids définitif est déterminé à la préparation. Le règlement se fait alors au retrait, sur le poids réel, ce qui reste honnête avec lui et évite les écarts de facturation.`,
      },
      {
        q: `Puis-je prendre des commandes de plats cuisinés et de charcuterie ?`,
        a: `Oui, la commande en ligne couvre aussi vos préparations de traiteur. Elles figurent dans une rubrique séparée, avec leurs propres dates de retrait et leurs allergènes, de sorte que l’équipe du laboratoire retrouve ces commandes distinctes de celles de la viande fraîche.`,
      },
    ],
  },

  'chocolatier': {
    sections: [
      {
        titre: `Quelques dates fortes et un laboratoire qui ne peut pas tout absorber`,
        paragraphes: [
          `Un chocolatier vit au rythme de dates précises : Noël, Pâques, la Saint-Valentin, la fête des mères, les cadeaux d’entreprise de fin d’année. Entre ces moments, l’activité est plus calme mais le laboratoire continue : tempérage, moulage, ganaches, enrobage, conditionnement. Toute demande qui arrive au dernier moment s’ajoute à un planning déjà plein. Le site aide en fixant des dates limites de commande par période, en affichant les créations de saison et en précisant lesquelles sont disponibles en boutique seulement ou à l’expédition. Les clients comprennent mieux une limite annoncée qu’un refus de dernière minute.`,
          `Chocolat et chaleur ne font pas bon ménage, ce qui conditionne la vente à distance : l’été, l’expédition demande des précautions particulières. Les allergènes, lait, fruits à coque, soja, gluten selon les recettes, doivent être signalés avec précision, traces possibles comprises. Un outil de gestion sur mesure peut relier le stock de coffrets, les commandes en ligne et la boutique, et marquer automatiquement ce qui est épuisé. Stackup les fabrique ; Mathéo Reboul, en Touraine, commence par comprendre votre laboratoire et votre manière de préparer les commandes avant de décider de quoi que ce soit.`,
        ],
      },
      {
        titre: `Pourquoi on vient chez vous plutôt qu’en rayon`,
        paragraphes: [
          `Celui qui cherche « chocolatier artisanal » ou « coffret de chocolats à offrir » cherche une garantie : une fabrication réelle, des matières identifiées, de la fraîcheur. Il veut savoir si vous fabriquez vous-même, d’où viennent la couverture ou les fèves, ce qui fait votre signature. Une page consacrée à l’atelier et une page par gamme, tablettes, ballotins, bonbons, spécialités de saison, répondent à ces questions. Pour les entreprises, une entrée distincte pour les cadeaux clients et salariés, avec la possibilité d’ajouter un logo ou une carte, répond à une demande qui revient chaque année.`,
          `Parmi les erreurs fréquentes, des photos de produits sans échelle, qui ne disent pas la taille d’un coffret, l’absence de poids ou de nombre de pièces, aucune aide pour choisir selon l’occasion, des dates de durabilité non mentionnées et des offres de fête déjà passées encore en première page. Une navigation par occasion, anniversaire, remerciement, naissance, fête, aide l’acheteur indécis à décider rapidement. Mettez enfin en avant la façon dont les chocolats sont emballés et protégés pour le transport, car c’est la première inquiétude de celui qui offre à distance.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment présenter les allergènes et les traces possibles ?`,
        a: `Chaque création a sa fiche avec la liste des allergènes cochée et une mention sur les traces possibles liées à l’atelier. Vous modifiez ces informations dès qu’une recette change. Elles s’affichent avant l’ajout au panier, ce qui protège vos clients allergiques comme votre responsabilité.`,
      },
      {
        q: `Un coffret composé par le client est-il possible ?`,
        a: `Oui. Le client choisit ses chocolats dans une grille, le site vérifie que la boîte est pleine et affiche la composition finale. Elle arrive sur votre bon de préparation sous une forme lisible, ce qui évite de recopier une liste de pièces à la main.`,
      },
      {
        q: `Comment signaler la rupture d’une création de saison ?`,
        a: `Vous retirez le produit ou affichez « épuisé » d’un clic, sans toucher au reste de la page. Le client voit tout de suite ce qui reste, et vous pouvez proposer une alternative proche pour ne pas perdre la vente. Le site reste cohérent avec la vitrine.`,
      },
    ],
  },

  'glacier': {
    sections: [
      {
        titre: `Une saison courte et un laboratoire qui tourne toute l’année`,
        paragraphes: [
          `Le glacier travaille avec le soleil : les beaux jours remplissent la boutique, la pluie la vide. Cette dépendance à la météo est le premier fait du métier. Derrière la vitrine, il faut fabriquer bacs, sorbets, crèmes et entremets glacés tout en respectant des températures de conservation strictes. Un site efficace affiche des horaires modifiables en quelques secondes, pour une ouverture exceptionnelle ou une fermeture à cause du mauvais temps, et la liste des parfums du jour, mise à jour depuis le téléphone sans passer par un prestataire. Votre clientèle y voit ce qui se passe au comptoir, à l’instant même.`,
          `Les allergènes sont déterminants : lait, œufs, fruits à coque dans de nombreuses recettes, gluten dans les cônes et les inclusions. Les termes comme « artisanal » ou « fait maison » ne s’emploient que si vos pratiques les justifient ; en cas de doute, décrivez simplement ce que vous fabriquez sur place. Hors saison, le site continue de servir : bûches glacées, entremets de fête, commandes de bacs pour réceptions. Stackup peut aussi construire, avec Mathéo Reboul en Touraine, un outil de gestion des commandes d’entremets glacés avec date de retrait et taille souhaitée.`,
        ],
      },
      {
        titre: `Parfums, bacs, entremets : ce que l’on vient chercher`,
        paragraphes: [
          `Les recherches suivent la météo : « glacier ouvert dimanche », « glace artisanale près de moi », « sorbet sans lactose », « gâteau glacé pour anniversaire ». Le visiteur veut surtout le parfum du jour et l’heure de fermeture. Placez sur la page d’accueil les horaires, les parfums et l’adresse, avant l’histoire de l’enseigne. Une page sur les régimes, sans lait, sans gluten, végétal, attire beaucoup si vos recettes s’y prêtent. N’y promettez que ce que vous pouvez garantir, et soyez précis sur le risque de contact avec d’autres ingrédients dans le laboratoire et à la vitrine.`,
          `Parmi les erreurs courantes : une carte de parfums figée depuis l’été précédent, des photos de coupes sans indication de ce qui est servi aujourd’hui, aucune distinction entre glace à emporter et consommation sur place, une terrasse dont personne ne sait si elle est ouverte. Pour les entremets et bûches, un formulaire de commande précis, avec la taille, les parfums, le message à inscrire et la date de retrait, vaut mieux qu’un numéro de téléphone saturé la veille d’un anniversaire ou d’une fête de famille. Pensez enfin à indiquer si vos glaces se commandent pour un événement extérieur, car cela ouvre une clientèle de mariages et de fêtes de village.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment signaler une fermeture à cause de la météo ?`,
        a: `Un bandeau en haut de la page d’accueil, modifiable depuis votre téléphone, annonce la fermeture ou l’ouverture exceptionnelle. Il s’affiche aussi dans l’encadré des horaires, pour que les clients ne se déplacent pas devant un rideau baissé un jour de pluie. Il s’affiche aussi dans l’encadré des horaires.`,
      },
      {
        q: `Que mettre sur le site pendant la saison creuse ?`,
        a: `Les produits qui se vendent hors saison : bûches glacées, entremets pour les fêtes, bacs pour réceptions et goûters. Le site bascule ses mises en avant au bon moment, de sorte que la page d’accueil reste utile en décembre autant qu’en juillet.`,
      },
      {
        q: `Comment parler des régimes sans prendre de risque ?`,
        a: `Nous distinguons ce qui est garanti sans lait ou sans gluten de ce qui l’est seulement dans la recette. Un avertissement clair sur le matériel partagé accompagne chaque fiche concernée, et vous gardez la maîtrise de chaque mot publié. Chaque mot publié reste de votre ressort, et nous relisons ensemble les formulations sensibles avant la mise en ligne.`,
      },
    ],
  },

  'epicerie-fine': {
    sections: [
      {
        titre: `Entre l’étagère, l’arrière-boutique et les producteurs`,
        paragraphes: [
          `Une épicerie fine gère un assortiment large de petites séries : confitures, huiles, conserves, biscuits, produits de producteurs voisins qui livrent à leur rythme. Chaque référence a sa date de durabilité, son étiquette, ses allergènes, et certaines n’existent qu’en quelques exemplaires. Pour la vente en ligne, la vraie difficulté est que le stock en rayon et le stock du site doivent rester identiques, faute de quoi un client commande un article déjà vendu en boutique. Un lien automatique entre la caisse et la boutique en ligne règle ce problème. La fin d’année, avec ses coffrets, reste le moment où il pèse le plus lourd.`,
          `L’étiquetage des denrées, ingrédients, allergènes, dates, concerne les produits que vous conditionnez vous-même ; pour les produits frais, la chaîne du froid conditionne la livraison ; et si vous vendez de l’alcool, la vente à distance obéit à ses propres obligations, différentes de celles des produits d’épicerie. Stackup bâtit sites et outils internes à la demande. À Tours, Mathéo Reboul peut prévoir une synchronisation de stock adaptée à votre caisse, dans la mesure où elle permet d’exporter ses données, ou un outil de saisie plus simple si ce n’est pas le cas.`,
        ],
      },
      {
        titre: `Offrir, découvrir, se faire conseiller : trois raisons de cliquer`,
        paragraphes: [
          `Les visiteurs d’une épicerie fine cherchent un cadeau, « panier garni », « coffret gourmand », une envie précise, « huile d’olive », « foie gras », « produits du terroir », ou un conseil pour un repas. L’acheteur de cadeau a besoin de choisir selon l’occasion et un budget, de voir la composition exacte du coffret, d’ajouter une carte, d’indiquer une date de livraison souhaitée. Prévoyez une navigation par occasion, anniversaire, remerciement, fêtes, et une page pour composer un panier à sa main, avec un aperçu clair de ce qu’il contient et de la manière dont il sera emballé.`,
          `Les sites d’épiceries commettent souvent les mêmes erreurs : des photos de produits sans le nom du producteur, des fiches sans composition, une page cadeaux sans possibilité de choisir ou de composer, aucune précision sur l’emballage, aucune séparation entre ce qui est disponible en boutique et ce qui s’expédie. Racontez vos producteurs : où ils travaillent, comment, pourquoi vous les avez choisis. Prévoyez un espace pour les entreprises, avec une demande de devis pour les cadeaux d’affaires, car ces commandes se préparent à l’avance et se comparent. Un client qui offre veut surtout être rassuré sur ce que recevra la personne choisie.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment permettre de composer un panier garni sur mesure ?`,
        a: `Le client choisit un contenant, puis ajoute les produits qu’il souhaite. Le site affiche la composition au fur et à mesure et signale si l’ensemble tient dans la boîte. Vous recevez la liste prête à préparer, avec la carte message à glisser dans le colis.`,
      },
      {
        q: `Comment gérer les produits frais ou fragiles à l’expédition ?`,
        a: `Nous distinguons les produits expédiables des produits à retirer en boutique, et ajoutons des règles : certains articles ne partent pas en période chaude, d’autres exigent un emballage adapté. Le client voit ces conditions avant de payer, pas après. Cette règle protège la qualité de vos produits et limite les réclamations.`,
      },
      {
        q: `Puis-je présenter la liste de mes producteurs ?`,
        a: `Oui, avec leur accord. Chaque producteur a une page courte : lieu, méthode de travail, produits que vous proposez de lui. Elle relie chaque fiche produit à une personne réelle et donne à votre sélection la cohérence que le visiteur cherche à reconnaître.`,
      },
    ],
  },

  'cave-vins-spiritueux': {
    sections: [
      {
        titre: `Conseil, étiquettes et cadre légal : le métier du caviste`,
        paragraphes: [
          `Le caviste passe ses journées entre dégustations, visites de domaines, mise en rayon et conseil au comptoir. Ses clients arrivent avec un plat, une occasion, un budget, et il traduit tout cela en bouteille. Les temps forts sont connus : les fêtes de fin d’année, la saison des barbecues, les cadeaux. Le site prolonge ce conseil : fiches par domaine avec appellation, cépage, millésime, notes de dégustation que vous écrivez vous-même, suggestions d’accords. C’est votre voix qui doit s’y entendre, pas la description recopiée du catalogue d’un distributeur que mille autres sites reprennent mot pour mot.`,
          `Le cadre légal compte : licence adaptée à la vente à emporter de boissons alcoolisées, interdiction de vendre aux mineurs, droits d’accises, mention de modération dans les contenus promotionnels. Pour la vente à distance, la majorité du client se vérifie dès la commande, et les modalités précises sont à confirmer avec votre comptable et les services des douanes. Côté outils, Stackup peut fabriquer un fichier clients avec préférences, des alertes de réassort et un suivi de stock par cuvée. Mathéo Reboul, en Touraine, le conçoit à partir de votre manière de tenir la cave.`,
        ],
      },
      {
        titre: `Ce que vos clients tapent avant de choisir une bouteille`,
        paragraphes: [
          `Les recherches sont variées : « vin pour un repas de fête », « bouteille à offrir », « vin bio », « whisky pour un cadeau », « vin pour accompagner un poisson ». La page doit proposer des filtres par région, couleur, appellation, mode de culture, et surtout par occasion et par plat. L’acheteur de cadeau n’y connaît rien : parlez-lui en mots simples, léger, boisé, fruité, sans exclure les amateurs avertis qui veulent le détail du domaine. Une rubrique de coups de cœur, écrite à la première personne, donne à votre cave un visage que les grandes surfaces n’ont pas.`,
          `Parmi les erreurs du secteur : un catalogue énorme sans filtre, des photos de bouteille toutes identiques, des notes de dégustation copiées, un millésime ou un volume absent de la fiche, des mentions légales invisibles, un stock affiché qui ne correspond pas à la cave. Une page consacrée aux vignerons que vous recevez, avec leur histoire et leurs méthodes, aide l’acheteur à comprendre pourquoi cette bouteille est chez vous. Veillez aussi à ne pas faire de la promotion de l’alcool un appel à la surconsommation. Les mentions légales, la date de naissance demandée et les conditions de livraison doivent rester lisibles, y compris sur un petit écran.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment vérifier que le client est majeur ?`,
        a: `Nous ajoutons une déclaration de majorité obligatoire à la commande et le rappel de l’interdiction de vente aux mineurs. Les contrôles complémentaires à prévoir à la livraison sont à confirmer avec les autorités compétentes et votre transporteur ; nous adaptons le parcours en conséquence.`,
      },
      {
        q: `Puis-je afficher des bouteilles rares en quantité limitée ?`,
        a: `Oui, avec un stock réel relié à votre cave. Le compteur diminue à chaque vente, en boutique comme en ligne, et la fiche passe en « épuisé » à la dernière bouteille. Vous évitez ainsi la survente, qui est la pire situation avec une cuvée rare.`,
      },
      {
        q: `Comment valoriser mon conseil sans le recopier d’un catalogue ?`,
        a: `Chaque fiche contient un espace pour vos propres notes : comment vous avez goûté le vin, avec quel plat, à quelle température. Nous vous aidons à structurer ces textes courts, afin que votre site se distingue des descriptions que tout le monde reprend.`,
      },
    ],
  },

  'fromager': {
    sections: [
      {
        titre: `Du lait cru à la cave d’affinage : le travail du vivant`,
        paragraphes: [
          `Le fromager travaille avec du vivant. Les fromages se retournent, se brossent, se lavent, s’affinent en cave, et leur état varie d’une semaine à l’autre : un même chèvre est plus sec ou plus crémeux selon le moment. Les saisons marquent l’offre, certains fromages n’étant proposés qu’à certaines périodes, comme le vacherin Mont d’Or en hiver. Si vous vendez des chèvres de Loire, Sainte-Maure-de-Touraine, Selles-sur-Cher ou Valençay, tous AOP, ils méritent chacun leur fiche. Le site comporte donc une page « de saison », que vous mettez à jour selon ce qui est réellement en cave.`,
          `Côté règles, la chaîne du froid commande la conservation, et les étiquettes doivent signaler le type de lait, cru ou pasteurisé, ainsi que les allergènes. Les fromages au lait cru sont déconseillés à certains publics, comme les femmes enceintes, selon les recommandations sanitaires : indiquer le type de lait sur chaque fiche est un service rendu à vos clients. Stackup conçoit aussi des outils internes ; Mathéo Reboul, depuis Tours, imagine par exemple un suivi des commandes de plateaux de fête par jour de retrait et par composition, pour que le laboratoire prépare sans relire un cahier.`,
        ],
      },
      {
        titre: `Ce que cherche un client avant de composer son plateau`,
        paragraphes: [
          `Les recherches tournent autour d’un usage : « plateau de fromages pour un repas de famille », « fromages pour une raclette », « fromages de chèvre locaux », « fromagerie ouverte le dimanche matin », « quel fromage avec ce vin ». La page des plateaux présente la composition type, le nombre de convives, la possibilité de choisir ses fromages, les alternatives sans lait cru et la date de retrait. Une page consacrée à la raclette, à la fondue ou à la tartiflette, mise en avant dès l’automne, correspond à une visite saisonnière que vous pouvez anticiper.`,
          `Les erreurs ressemblent à celles de tout commerce de produits d’exception : une fiche sans mention AOP ou AOC alors qu’elle s’applique, ou l’inverse, l’usage d’un label sans cahier des charges ; des photos de fromage entier sans la coupe ; aucun conseil de conservation ni de sortie du réfrigérateur ; un plateau de fête proposé trop tard ; des accords limités au vin, qui oublient le pain, les confitures, les fruits secs. Une page de conseils de dégustation, avec l’ordre dans lequel présenter les fromages, vous distingue d’un simple rayon libre-service.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment décrire un fromage à quelqu’un qui ne peut pas le goûter ?`,
        a: `Chaque fiche associe origine, lait, pâte, texture et arômes, avec des mots simples et concrets : crémeux, sec, lactique, de caractère. Vous ajoutez une suggestion d’accompagnement, et le client sait ce qu’il achètera, même sans avoir franchi la porte. Ces fiches peuvent ensuite se retrouver dans vos commandes de plateaux.`,
      },
      {
        q: `Comment éviter de promettre un fromage qui n’est plus en cave ?`,
        a: `Les fiches portent une mention « selon arrivage » et un bouton d’indisponibilité que vous activez en quelques secondes. Pour un plateau de fête, le site propose une alternative de même famille si une pièce manque, validée par vous avant le retrait.`,
      },
      {
        q: `Quelle information de conservation donner à mes clients ?`,
        a: `Une courte rubrique conseille d’emballer le fromage dans un papier adapté, de le sortir du réfrigérateur avant de le servir et de le conserver à part des autres aliments. Elle s’affiche sur les fiches et sur la confirmation de commande.`,
      },
    ],
  },

  'primeur': {
    sections: [
      {
        titre: `Le marché de gros à l’aube, la caisse à la fermeture`,
        paragraphes: [
          `Le primeur commence tôt : approvisionnement auprès de producteurs ou au marché de gros, chargement, mise en étal, tri des produits de la veille. L’étal change tous les jours au gré des arrivages, de la météo et des saisons : asperges au printemps, fruits rouges l’été, courges à l’automne, agrumes l’hiver. Rien ne sert de publier une carte fixe. Le site affiche plutôt les produits du jour, les arrivages marquants et la saison, avec un moyen simple de tout mettre à jour depuis le téléphone avant l’ouverture, au moment où vous disposez enfin de quelques minutes devant l’étal fini.`,
          `Pour les fruits et légumes frais, l’origine, la catégorie et la variété doivent figurer sur l’étal ; le site peut reprendre ces mentions sur ses fiches. L’indication « bio » n’est possible que pour des produits certifiés. Prix au kilo ou à la pièce : l’unité doit être claire. Stackup réalise des outils internes, par exemple la préparation de paniers par jour ou la tournée de livraison classée par rue. Mathéo Reboul, en Touraine, les conçoit à partir de ce que vous faites déjà, pas d’un modèle de logiciel pensé pour des commerces qui ne ressemblent pas au vôtre.`,
        ],
      },
      {
        titre: `Ce qui fait venir, et revenir, vers un étal de fruits et légumes`,
        paragraphes: [
          `Les recherches reviennent souvent : « primeur près de moi », « fruits et légumes de saison », « panier de légumes », « légumes locaux », « primeur bio ». Le client veut savoir ce qui est de saison, d’où cela vient et comment l’accommoder. Une page de saison, qui change à chaque trimestre avec quelques idées de recettes, répond à cette curiosité. Faites le lien avec vos producteurs : nom de l’exploitation, commune, produits livrés. Les particuliers comme les petits restaurants peuvent commander : prévoyez un espace réservé aux professionnels avec une demande de livraison régulière.`,
          `Les erreurs du secteur : des photos de stock de légumes qui n’ont rien à voir avec votre étal, une promesse de « local » sans précision de provenance, aucun moyen de commander en grande quantité pour un anniversaire ou un buffet, les horaires du marché hebdomadaire non indiqués si vous y tenez un étal. Un calendrier des marchés où vous êtes présent, avec les jours et les lieux, évite aux clients de vous chercher en vain et vous apporte une visibilité supplémentaire auprès de ceux qui ne passent jamais devant votre boutique.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment gérer les produits vendus au poids ?`,
        a: `Le client indique une quantité approximative, et la fiche précise que le poids exact est déterminé à la préparation. Le montant définitif se règle au retrait, sur le poids réel. Cela reste simple pour vous comme pour lui, sans arrondi caché.`,
      },
      {
        q: `Puis-je présenter un calendrier des fruits et légumes de saison ?`,
        a: `Oui. Une page affiche, mois par mois, ce qui est à l’étal, avec un renvoi vers les fiches disponibles. Elle attire les recherches de saison et aide vos clients à acheter ce qui est au meilleur, sans que vous ayez à répondre à la même question chaque jour.`,
      },
      {
        q: `Comment prendre les commandes des restaurateurs ?`,
        a: `Un espace dédié leur permet de déposer une commande récurrente ou ponctuelle, avec jour de livraison souhaité et notes pour la préparation. Vous retrouvez ces demandes séparées des commandes de particuliers, regroupées par jour de tournée. Les commandes pro et les commandes de particuliers ne se mélangent jamais, ce qui simplifie la préparation du matin.`,
      },
    ],
  },

  'poissonnier': {
    sections: [
      {
        titre: `La marée, la glace et l’heure d’ouverture`,
        paragraphes: [
          `Le poissonnier travaille le produit le plus périssable de tous les commerces alimentaires. Les arrivages dépendent de la pêche, des conditions en mer et de l’approvisionnement ; ce qu’on trouve au comptoir un mardi n’est pas ce qu’on y trouvait le lundi. L’étal repose sur la glace, la chaîne du froid et des gestes rapides : écailler, lever des filets, ouvrir des huîtres. Le site sert à prévenir : arrivages du jour, produits à réserver, fermeture exceptionnelle quand l’approvisionnement ne suit pas. Il épargne aux clients un déplacement inutile et à vous les appels qui interrompent la découpe.`,
          `L’étiquetage est encadré : dénomination commerciale, nom scientifique, zone de capture, méthode de production, mention « décongelé » le cas échéant. Les fiches du site reprennent ces informations. Pour les plateaux de fruits de mer, la précommande se fait avec date de retrait, composition et nombre de convives, et vous ne promettez rien avant d’avoir reçu la marchandise : la mention « selon arrivage » protège les deux parties. Stackup peut aussi produire une fiche de préparation des plateaux, regroupant les commandes par jour de retrait. Ce suivi simple évite les oublis les jours où tout le monde commande en même temps, pour la même soirée de réveillon.`,
        ],
      },
      {
        titre: `Poisson frais, coquillages, fêtes : ce que le client veut savoir`,
        paragraphes: [
          `Les recherches vont de « poissonnerie près de moi » à « poisson frais du jour », en passant par « huîtres pour Noël », « plateau de fruits de mer » ou « comment cuire un bar ». Le client hésite souvent : il aime le poisson mais n’ose pas l’acheter faute de savoir le préparer. Des fiches avec un mode de préparation simple, une cuisson, une saison, lèvent ce frein. Mentionnez ce que vous préparez sur place, écaillage, vidage, filets, car c’est un argument fort pour qui n’a ni le temps ni l’envie de s’en charger lui-même.`,
          `Les sites de poissonniers répètent les mêmes erreurs : une liste de produits qui ne bouge jamais, des photos génériques de poisson, aucune précision sur la provenance, des commandes de fêtes ouvertes trop tard, des horaires inexacts les jours fériés. Les coquillages ont leur calendrier propre et leurs périodes de forte demande ; une page qui explique la saison de chaque produit renforce votre image de professionnel. Les commandes de fêtes méritent une page distincte, avec une date limite claire, bien avant l’afflux du dernier moment. Une page « conseils » explique aussi comment conserver le poisson une fois rentré chez soi.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment éviter de promettre un poisson qui n’arrive pas ?`,
        a: `La mention « selon arrivage » accompagne les produits de la semaine, et la liste du jour se met à jour depuis votre téléphone. Pour les précommandes, vous confirmez au client quand la marchandise est arrivée. Il sait ainsi précisément ce qu’il peut attendre.`,
      },
      {
        q: `Puis-je proposer des préparations comme l’écaillage ou les filets ?`,
        a: `Oui, sous forme d’options à cocher au moment de la commande. Elles figurent sur votre bon de préparation, de sorte que la découpe est faite avant l’arrivée du client, et que le retrait en boutique prend peu de temps au comptoir.`,
      },
      {
        q: `Faut-il afficher la zone de pêche sur chaque fiche ?`,
        a: `Ces informations doivent figurer sur l’étal, et il est logique de les reprendre sur le site : nom du produit, zone de capture, méthode de production. Un modèle de fiche vous permet de les renseigner en quelques secondes à chaque nouvel arrivage.`,
      },
    ],
  },

  'librairie-papeterie': {
    sections: [
      {
        titre: `Entre la table des nouveautés et la commande spéciale`,
        paragraphes: [
          `Le libraire reçoit les nouveautés, range, conseille, passe des commandes pour les titres absents, gère les retours et anime la boutique avec des rencontres d’auteurs et des dédicaces. La papeterie ajoute son propre calendrier : rentrée scolaire et listes de fournitures, carnets et agendas de fin d’année. Le livre neuf est soumis au prix unique, fixé par l’éditeur ; on ne se distingue donc pas par le prix, mais par le conseil, le stock, la disponibilité et les services. Le site doit les rendre visibles : recherche d’un titre, disponibilité en boutique, commande à retirer sur place.`,
          `Le label « Librairie indépendante de référence » (LIR) est un label réel attribué aux librairies qui y sont reconnues ; si vous l’avez, il se mentionne tel quel. Si vous utilisez un logiciel de gestion de librairie, le site peut se brancher sur votre stock selon ce que ce logiciel permet d’exporter. Sinon, Stackup fabrique un outil sur mesure pour suivre les commandes spéciales, les mises de côté et les clubs de lecture. Mathéo Reboul, en Touraine, commence par regarder comment votre équipe travaille réellement au comptoir, avant de proposer la moindre fonctionnalité.`,
        ],
      },
      {
        titre: `Ce que cherchent les lecteurs, les parents et les enseignants`,
        paragraphes: [
          `Les recherches sont multiples : « librairie ouverte le dimanche », « livre pour un enfant de huit ans », « roman policier à offrir », « liste de fournitures de rentrée », « dédicace d’un auteur ». Plusieurs publics cohabitent : les lecteurs réguliers cherchent vos coups de cœur, les parents un cadeau selon l’âge, les enseignants et les associations des commandes groupées, les étudiants leurs manuels. Proposez des rubriques par âge, par genre et par thème, et un agenda des rencontres qui affiche clairement la date, l’intervenant et la réservation de places.`,
          `Les sites de librairies tombent souvent dans les mêmes travers : copier le résumé de l’éditeur sur chaque fiche sans y ajouter votre avis, ne pas afficher l’état du stock (disponible, à commander), ignorer les collectivités, laisser un événement passé en première page, oublier un moteur de recherche interne. Une page « commander un titre » simple, avec un champ pour l’auteur, le titre et vos coordonnées, remplace des allers-retours par téléphone. Enfin, si vous proposez des services de papeterie ou de fournitures, présentez-les à part du rayon des livres pour que personne ne passe à côté.`,
        ],
      },
    ],
    faq: [
      {
        q: `Puis-je vendre un livre moins cher que le prix affiché ?`,
        a: `Le prix du livre neuf est encadré par la loi sur le prix unique : votre site affiche le prix fixé par l’éditeur. Vous vous distinguez par le conseil, la rapidité de mise de côté et les services, pas par une bataille de prix qui ne vous est pas ouverte.`,
      },
      {
        q: `Comment gérer les listes de fournitures scolaires ?`,
        a: `Une page par établissement ou par niveau permet au parent de déposer sa liste et de la retrouver préparée en boutique. Vous recevez la demande avec les références, vous préparez le lot, et il passe le récupérer sans refaire la queue de la rentrée.`,
      },
      {
        q: `Comment annoncer mes rencontres d’auteurs et dédicaces ?`,
        a: `Chaque rencontre dispose de sa fiche : intervenant, date, lieu, titre présenté, possibilité de réserver une place ou un exemplaire dédicacé. L’événement disparaît automatiquement de la page une fois passé et reste dans une rubrique archive. La rubrique archive garde une trace de vos soirées passées, ce qui montre le dynamisme de la librairie.`,
      },
    ],
  },

  'tabac-presse': {
    sections: [
      {
        titre: `Une boutique ouverte tôt, fermée tard, qui rend dix services`,
        paragraphes: [
          `Un bureau de tabac est un commerce de passage et de proximité : journaux le matin, tickets de jeux, timbres, recharges, retrait de colis, bibelots, parfois cartes postales et souvenirs. Le buraliste ouvre tôt et ferme tard, souvent six jours sur sept ; sa clientèle est faite d’habitués qui ne savent pas toujours tout ce qu’il propose. Le site rend visible cette variété, avec une page par service et des horaires complets, y compris les jours fériés et les congés. Un visiteur qui découvre que vous gérez aussi les colis devient un client régulier de plus.`,
          `Le cadre est strict : la vente de tabac à distance est interdite en France, tout comme la publicité en sa faveur. Le site ne vend donc pas de tabac et ne le promeut pas. Les produits sont interdits aux mineurs, les jeux d’argent sont encadrés avec des messages de prévention, et rien ne doit être promis en matière de gains. Le site parle de services, de presse, de colis, de papeterie, de boutique. Stackup, fondé par Mathéo Reboul en Touraine, peut aussi fabriquer un petit outil pour gérer les réservations de journaux et les abonnements de vos clients fidèles.`,
        ],
      },
      {
        titre: `Les recherches de dépannage qui vous amènent des clients`,
        paragraphes: [
          `Les recherches parlent d’un besoin immédiat : « tabac ouvert le dimanche », « tabac presse près de moi », « point relais colis », « timbres », « journal local », « recharge téléphonique ». Les gens sont pressés, souvent en déplacement, et veulent une réponse à deux questions : êtes-vous ouvert maintenant, et proposez-vous ce service ? La page d’accueil doit y répondre en un coup d’œil, avec les horaires du jour mis en évidence et une liste de services lisible, accompagnée d’un bouton d’itinéraire et d’un numéro cliquable.`,
          `Les erreurs de ce secteur sont simples : une page unique qui ne contient que l’adresse, une liste de services périmée, une confusion entre les services assurés par un partenaire et ceux du bureau de tabac, un point de retrait de colis absent de la fiche Google. Une page « ce que nous proposons », organisée par pictogrammes avec une courte phrase par service, clarifie l’offre. Précisez aussi l’accessibilité du local et les possibilités de stationnement, car beaucoup de visites sont des arrêts rapides en voiture, entre deux rendez-vous.`,
        ],
      },
    ],
    faq: [
      {
        q: `Que puis-je afficher à propos des jeux ?`,
        a: `Le site peut indiquer que vous proposez ces services, avec un lien vers les sites officiels. Nous évitons toute promesse de gain, rappelons l’interdiction aux mineurs et affichons les messages de prévention. Le contenu reste informatif, jamais incitatif. Les liens vers les organismes officiels remplacent toute explication détaillée de votre côté.`,
      },
      {
        q: `Comment présenter un point de retrait de colis ?`,
        a: `Une page explique le service : quels transporteurs, quels documents apporter, quels horaires de retrait. Le visiteur sait avant de se déplacer s’il pourra récupérer son colis, et vos clients arrivent avec leur pièce d’identité et leur code déjà prêts. Le client évite un déplacement pour rien.`,
      },
      {
        q: `Puis-je annoncer les titres de presse en stock ?`,
        a: `Oui, une rubrique liste les quotidiens, magazines et titres locaux que vous recevez, avec la possibilité de les réserver. Le lecteur est sûr de trouver son titre, et vous gardez de côté les exemplaires que vos habitués attendent. Le client lit la liste du jour avant de venir, et l’habitué sait qu’un exemplaire lui est gardé.`,
      },
    ],
  },

  'magasin-sport': {
    sections: [
      {
        titre: `Les saisons sportives dictent tout le calendrier`,
        paragraphes: [
          `Un magasin de sport vit par saisons : ski et montagne en automne et en hiver, tennis, vélo et randonnée au printemps, natation et sports d’eau l’été, et la rentrée des clubs en septembre avec ses inscriptions et ses équipements. Chaque saison impose son stock, ses tailles, ses conseils d’essayage. L’atelier, cordage de raquettes, entretien de skis, réglage de vélos, assure une activité régulière hors saison. Le site suit ces bascules : mise en avant des rayons de saison, annonce des services d’atelier, créneaux de dépôt du matériel, afin que chaque période ait sa page d’accueil.`,
          `Les équipements de protection, casques et protections, répondent à des normes ; la fiche produit les indique, ainsi que le guide des tailles et les conseils de réglage. Selon votre région, un parcours local ou un itinéraire connu, la Loire à Vélo pour un magasin en Val de Loire, ancre le site dans la pratique réelle de vos clients. Stackup peut aussi livrer un outil d’atelier : Mathéo Reboul, en Touraine, prévoit un suivi avec dépôt du matériel, état d’avancement et notification quand il est prêt. Le suivi se fait au même endroit que le reste de l’activité, pour que personne ne cherche une fiche égarée au fond de l’atelier.`,
        ],
      },
      {
        titre: `Ce qu’un sportif veut savoir avant de s’équiper`,
        paragraphes: [
          `Les recherches se font par pratique : « chaussures de trail », « casque de vélo pour enfant », « location de ski », « raquette de tennis conseils », « magasin de sport ouvert ». Le sportif veut un conseil : pour quel niveau, quelle fréquence, quel terrain. Proposez des guides d’achat par pratique, rédigés par vous, qui disent clairement quoi choisir selon l’usage, une page par sport, et des filtres par taille et par disponibilité en magasin. Les clubs et associations apprécient un espace pour les commandes groupées de tenues et d’équipements.`,
          `Les erreurs courantes : un site qui copie l’arborescence d’un grand magasin sans la personnalité du vôtre, des fiches sans guide des tailles, des services de réparation et de location absents de la page d’accueil, aucune page pour les clubs, des photos qui n’aident pas à choisir. Le magasin local a pour avantage le conseil et le service après-vente ; ce sont eux qu’il faut placer en tête, avec des exemples concrets de situations que vous avez résolues pour vos clients, sans jamais citer de nom ni inventer de témoignage.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment présenter l’atelier de réparation ?`,
        a: `Une page décrit les prestations (entretien, réglage, cordage, réparation) et explique comment déposer son matériel. Un formulaire de dépôt recueille le type d’équipement et le problème constaté, et vous prévenez le client quand son matériel est prêt. Le suivi se consulte depuis le site, sans appeler le magasin.`,
      },
      {
        q: `Puis-je gérer des commandes groupées pour un club ?`,
        a: `Oui, avec un espace dédié aux clubs : liste des équipements proposés, tailles, quantités, date de retrait. Le responsable du club dépose une commande unique, que vous recevez regroupée, plus pratique que de multiples demandes par message. Une fois la commande préparée, vous prévenez le responsable pour le retrait groupé.`,
      },
      {
        q: `Comment afficher la disponibilité par taille ?`,
        a: `Chaque fiche présente les tailles et la disponibilité en magasin, reliées à votre stock quand c’est possible. Le client sait s’il peut essayer sa taille en boutique et peut réserver une paire avant de se déplacer. Les tailles manquantes se signalent clairement, avec une alternative proposée.`,
      },
    ],
  },

  'magasin-jouets': {
    sections: [
      {
        titre: `Une année qui se joue en grande partie en décembre`,
        paragraphes: [
          `Le magasin de jouets réalise une part importante de son année en fin d’année ; la préparation de Noël commence bien avant, avec les commandes aux fournisseurs, la mise en rayon et les catalogues. Autres moments : les anniversaires toute l’année, la rentrée scolaire avec ses jeux éducatifs, les vacances. L’équipe conseille : pour quel âge, quelle taille de famille, quel budget. Le site aide à anticiper avec des sélections par âge, une liste de souhaits partageable et la mise de côté en boutique, ce qui répartit une charge qui, sinon, s’accumule en quelques samedis.`,
          `Les jouets doivent porter le marquage CE et respecter la norme européenne de sécurité ; l’âge minimal et les avertissements, par exemple les petites pièces pour les moins de trois ans, figurent sur l’emballage et sur la fiche. Le site reprend ces mentions. Stackup assemble sites et outils internes ; Mathéo Reboul, installé en Touraine, imagine le suivi des listes de souhaits, des réservations et des bons cadeaux, relié à votre stock pour que les jouets réservés ne soient pas revendus à quelqu’un d’autre. Les jouets en promotion ou en fin de série s’y signalent aussi, sans bandeau criard, avec la quantité réellement disponible en rayon.`,
        ],
      },
      {
        titre: `Ce que cherchent les parents, les grands-parents et les enfants`,
        paragraphes: [
          `Les recherches sont souvent précises : « cadeau pour un enfant de cinq ans », « jeu de société en famille », « jouet en bois », « jeu éducatif », « loisirs créatifs ». L’acheteur est souvent un adulte qui ne sait pas quoi offrir : grand-parent, parrain, invité à un anniversaire. Une navigation par âge et par occasion, avec des idées cadeaux selon les centres d’intérêt, est plus claire que des catégories techniques. L’enfant regardera lui aussi les images : choisissez des contenus adaptés, sans éléments qui le détourneraient de la fiche.`,
          `Les erreurs courantes : un catalogue sans âge indiqué, des descriptions copiées du fabricant, aucune photo de la boîte ouverte, un manque de précision sur ce qui est inclus (piles non fournies, assemblage nécessaire), aucun conseil de vendeur, des soirées de jeux et des démonstrations en boutique non annoncées. Pour les jeux de société, indiquez le nombre de joueurs et un temps de jeu approximatif : c’est le premier critère de choix d’une famille. Un agenda d’animations en boutique donne enfin une raison de venir en dehors des périodes de cadeaux.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment signaler que des piles ou des accessoires ne sont pas fournis ?`,
        a: `Chaque fiche comporte un encadré « dans la boîte / à prévoir » : piles, assemblage, accessoires vendus séparément. Le client sait avant de commander ce qu’il lui faut, et vous réduisez les retours liés à une mauvaise surprise le matin de Noël.`,
      },
      {
        q: `Puis-je annoncer des soirées jeux et des démonstrations ?`,
        a: `Oui, avec un agenda d’animations : date, jeux présentés, inscription si les places sont limitées. L’événement apparaît sur la page d’accueil pendant la période utile, puis se retire automatiquement pour laisser la place au suivant. Les animations proposées chaque mois restent accessibles dans une rubrique à part.`,
      },
      {
        q: `Comment proposer un emballage cadeau en ligne ?`,
        a: `Une option à cocher au moment de la commande permet de demander l’emballage et d’ajouter un petit message. Elle apparaît sur votre bon de préparation, et le colis ou le retrait en boutique part déjà prêt à offrir. Le message peut être personnalisé, ce qui évite les cartes manuscrites oubliées en caisse.`,
      },
    ],
  },

  'boutique-decoration': {
    sections: [
      {
        titre: `Chaque pièce n’existe parfois qu’une fois`,
        paragraphes: [
          `Une boutique de décoration vend des pièces souvent uniques ou en petite série : luminaires, vaisselle, textiles, vases, mobilier d’appoint, créations d’artisans. Il y a un exemplaire en rayon et un exemplaire en ligne : si le site ignore qu’il a été vendu en boutique, le client reçoit une mauvaise nouvelle. Les réassorts suivent les collections et les saisons : la rentrée, Noël, les arts de la table du printemps. Ce renouvellement fait du site une vitrine vivante, avec des nouveautés mises en avant et des pièces vendues retirées proprement, sans que le visiteur ait l’impression d’un catalogue figé.`,
          `Les objets fragiles ou volumineux imposent des conditions de transport adaptées : emballage soigné, assurance du colis, retrait en magasin pour les pièces encombrantes. Le droit de rétractation prévu pour la vente à distance s’applique à votre boutique en ligne, et ses conditions doivent apparaître clairement. Stackup réalise aussi des outils de stock : Mathéo Reboul, en Touraine, peut relier un stock unifié entre boutique et site, avec marquage « vendu » automatique, et des fiches pièce que vous remplissez en peu de temps. Les pièces volumineuses se signalent par une icône claire sur leur fiche.`,
        ],
      },
      {
        titre: `Faire voir la pièce chez soi avant de l’acheter`,
        paragraphes: [
          `Les recherches mêlent style et usage : « vase en céramique », « luminaire scandinave », « décoration de salon », « idée cadeau pour une crémaillère ». Le visiteur cherche à se projeter. Il lui faut des photos en situation, des dimensions précises, la matière, la couleur réelle avec un avertissement sur les variations d’écran, des conseils d’entretien. La navigation se fait par pièce de la maison, par style, par matière, en plus de la catégorie d’objet. Un acheteur qui ne sait pas quoi choisir y trouve ses repères. Un lien vers vos réseaux, utile pour l’inspiration, ne doit pas remplacer la fiche complète sur votre propre site.`,
          `Les erreurs courantes : des fiches sans dimensions, des couleurs mal rendues, aucune indication sur le caractère unique d’une pièce, un récit vague sur les créateurs, l’absence de service de conseil et de prise de rendez-vous, des listes de mariage ou de naissance non annoncées. Présentez vos créateurs avec leur accord, et décrivez précisément ce que comprend le service de conseil en décoration : visite, sélection, accompagnement. Un visiteur qui sait ce qu’il obtiendra se décide plus facilement à prendre rendez-vous. Le conseil se réserve aussi à distance : une photo de la pièce à aménager, quelques dimensions, et votre première réponse arrive préparée.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment éviter de vendre deux fois une pièce unique ?`,
        a: `Le stock est partagé entre la boutique et le site : à la vente en caisse, la fiche passe en « vendu » ; à la commande en ligne, la pièce est réservée le temps du paiement. Selon votre caisse, nous la relions directement ou prévoyons une saisie rapide.`,
      },
      {
        q: `Comment limiter les retours liés aux couleurs ?`,
        a: `Les fiches montrent la pièce sous plusieurs éclairages, précisent la teinte avec des mots courants et signalent que l’écran peut modifier le rendu. Vous pouvez aussi proposer d’envoyer un échantillon de matière quand cela s’y prête. Le client choisit en connaissance de cause.`,
      },
      {
        q: `Puis-je présenter les créateurs dont je vends les pièces ?`,
        a: `Oui, avec leur accord. Chaque créateur a une page courte : son atelier, sa matière, ce qu’il fabrique. Elle relie vos fiches à une démarche réelle, et le visiteur comprend pourquoi les pièces diffèrent de celles qu’on trouve partout. Vous gardez la main sur ce qui est publié.`,
      },
    ],
  },
}
