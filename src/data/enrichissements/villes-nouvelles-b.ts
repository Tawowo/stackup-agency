import type { Ville } from '../villes'
import type { Enrichissements } from './types'

export const VILLES_B: Ville[] = [
  {
    slug: 'langeais',
    ville: 'Langeais',
    departement: 'Indre-et-Loire (37)',
    region: 'Centre-Val de Loire',
    priorite: 'P2',
    requetePrincipale: 'agence web Langeais',
    variantes: ['création site internet Langeais', 'création site web Langeais', 'développeur web Langeais', 'création site vitrine Langeais', 'refonte site internet Langeais'],
    villesVoisines: ['tours', 'saint-cyr-sur-loire', 'bourgueil', 'chinon', 'saumur'],
    economie: "Langeais est une petite ville de la vallée de la Loire, à l'ouest de Tours, dominée par son château du XVe siècle, qui attire des visiteurs une bonne partie de l'année. Autour de ce site se sont installés des commerces de centre-ville, des restaurants, des chambres d'hôtes et des gîtes. À côté du tourisme, on trouve des artisans du bâtiment, des professionnels de santé et des services de proximité qui servent aussi les communes voisines. La Loire à vélo passe par ici et amène une clientèle de passage, attentive à ce qu'elle peut réserver ou trouver ouvert à l'avance.",
    secteurs: ['Tourisme & patrimoine', 'Hébergement & restauration', 'Commerce de centre-ville', 'Artisanat & bâtiment'],
  },
  {
    slug: 'bourgueil',
    ville: 'Bourgueil',
    departement: 'Indre-et-Loire (37)',
    region: 'Centre-Val de Loire',
    priorite: 'P2',
    requetePrincipale: 'agence web Bourgueil',
    variantes: ['création site internet Bourgueil', 'création site web Bourgueil', 'développeur web Bourgueil', 'création site vitrine Bourgueil', 'refonte site internet Bourgueil'],
    villesVoisines: ['langeais', 'chinon', 'saumur', 'tours', 'chateau-la-valliere'],
    economie: "Bourgueil donne son nom à une appellation de vins rouges, produits surtout à partir du cabernet franc, et le vignoble structure toute la vie économique du secteur. Domaines familiaux, caves creusées dans le tuffeau, caveaux de dégustation et ventes à la propriété y côtoient les métiers qui gravitent autour de la vigne : tonnellerie, matériel viticole, transport. Le bourg a aussi ses commerces de proximité, ses marchands de produits du terroir, ses restaurants et ses hébergements pour les visiteurs venus goûter les vins et parcourir la campagne tourangelle.",
    secteurs: ['Viticulture & vente directe', 'Œnotourisme & hébergement', 'Commerces de proximité', 'Artisanat & métiers de la vigne'],
  },
  {
    slug: 'chateau-la-valliere',
    ville: 'Château-la-Vallière',
    departement: 'Indre-et-Loire (37)',
    region: 'Centre-Val de Loire',
    priorite: 'P2',
    requetePrincipale: 'création site internet Château-la-Vallière',
    variantes: ['agence web Château-la-Vallière', 'création site web Château-la-Vallière', 'développeur web Château-la-Vallière', 'création site vitrine Château-la-Vallière', 'refonte site internet Château-la-Vallière'],
    villesVoisines: ['langeais', 'bourgueil', 'tours', 'le-mans'],
    economie: "Château-la-Vallière se trouve dans la Gâtine tourangelle, un pays de bois, d'étangs et de bocage au nord de la Touraine, qui porte le nom de la duchesse de La Vallière, favorite de Louis XIV. L'économie y est rurale et diversifiée : exploitations agricoles, entreprises du bâtiment, artisans, petits commerces de bourg, professionnels de santé. La forêt et les étangs de la région attirent promeneurs, pêcheurs et vacanciers, ce qui fait vivre des gîtes, des chambres d'hôtes, des campings et quelques tables de campagne.",
    secteurs: ['Agriculture & élevage', 'Artisanat & bâtiment', 'Tourisme vert & hébergement', 'Commerces de bourg & santé'],
  },
]

export const ENRICHISSEMENTS_B: Enrichissements = {
  langeais: {
    sections: [
      {
        titre: `Un château, la Loire et des visiteurs qui préparent leur halte`,
        paragraphes: [
          `Langeais se reconnaît de loin : son château, bâti à la fin du XVe siècle sous Louis XI, se dresse au cœur de la ville, avec les ruines d’un donjon médiéval juste à côté. C’est dans ce château qu’a été célébré, en 1491, le mariage de Charles VIII et d’Anne de Bretagne. Cette histoire attire des visiteurs de toute la France et de l’étranger, qui font souvent une étape ici entre Tours et Saumur, ou en revenant de Villandry, de l’autre côté de la Loire. La ville est aussi sur le parcours de la Loire à vélo, et le Val de Loire est classé au patrimoine mondial de l’UNESCO : le voyageur qui passe prépare son étape à l’avance, depuis son téléphone, parfois la veille au soir.`,
          `Pour un commerçant ou un restaurateur du centre-ville, cela change la question à se poser : que voit quelqu’un qui tape « boulangerie Langeais », « restaurant près du château de Langeais » ou « chambre d’hôtes Langeais » ? S’il trouve une fiche Google à jour, des horaires fiables, un site qui montre la carte, les photos du lieu et le moyen de réserver, il vient. S’il ne trouve rien, il va ailleurs, sans que vous le sachiez jamais. Le site n’a pas besoin d’être long. Il doit répondre vite, être lisible sur mobile et dire ce qui change d’une saison à l’autre : jours de fermeture, horaires d’été, menu du moment.`,
        ],
      },
      {
        titre: `Hébergeurs, restaurateurs, artisans : trois façons d’utiliser un site`,
        paragraphes: [
          `Un hébergeur de Langeais (gîte, chambre d’hôtes, petit hôtel) vend un lieu avant de vendre une nuit. Les photos des chambres, l’accès à pied depuis le château, le stationnement, le local pour ranger les vélos, les langues parlées à l’accueil : ce sont ces détails qui rassurent un voyageur qui ne connaît pas la ville. Un calendrier de disponibilités et un formulaire de demande de séjour évitent les échanges de courriels à rallonge. Pour un restaurateur, l’essentiel tient en quatre éléments : la carte lisible, les horaires, un moyen de réserver, un plan d’accès. Rien de plus, mais tout cela à jour.`,
          `Les artisans, eux, n’ont pas la même clientèle. Un plombier, un couvreur, un électricien ou un paysagiste basé à Langeais est surtout appelé par des particuliers des communes voisines. Son site doit donc annoncer clairement la zone desservie, les types de travaux, la manière de demander un devis et, si c’est utile, une galerie de chantiers réalisés. Un formulaire qui demande dès le départ l’adresse, la nature du problème et la photo éventuelle fait gagner du temps aux deux parties. Pour un artisan qui est sur les chantiers toute la journée, c’est souvent la différence entre un rappel le soir et une demande oubliée.`,
        ],
      },
      {
        titre: `Être trouvé à Langeais, et se rencontrer sans perdre de temps`,
        paragraphes: [
          `Le référencement local repose sur peu de choses, mais elles doivent être justes. La fiche Google (adresse, catégorie, horaires, photos) vient en premier. Ensuite, le site doit citer Langeais et les communes voisines que vous desservez, avec des mots que les gens emploient vraiment, sans bourrage de mots-clés. Les avis de clients, quand ils sont sincères, comptent beaucoup pour un commerce dont la clientèle ne vous connaît pas. Inutile, en revanche, de créer des dizaines de pages presque identiques pour chaque village : mieux vaut une page honnête qui dit ce que vous faites et où.`,
          `Mathéo Reboul travaille à proximité, depuis Savigné-sur-Lathan, en Touraine. Si vous préférez parler de votre projet face à face, un rendez-vous dans votre commerce, votre gîte ou votre atelier peut s’organiser : voir vos locaux aide à choisir ce que le site doit mettre en avant. Si votre emploi du temps est serré, un échange en visio, à l’heure qui vous convient, fonctionne aussi. Le calendrier du projet se fixe ensemble avant de commencer, et vous restez libre de faire modifier les horaires et les photos vous-même une fois le site en ligne.`,
        ],
      },
    ],
    faq: [
      {
        q: `Je tiens un gîte près du château de Langeais : que mettre en premier sur le site ?`,
        a: `Les photos des pièces, l’emplacement exact par rapport au château et au centre, puis un moyen simple de demander une date. Le voyageur compare plusieurs hébergements sur son téléphone : il doit voir en quelques secondes si votre gîte lui convient. Le reste (équipements, règles de la maison, environs) vient juste après.`,
      },
      {
        q: `Les visiteurs de la Loire à vélo peuvent-ils vraiment devenir ma clientèle ?`,
        a: `Oui, si vous êtes visible au bon moment : ils cherchent une halte, un repas, un réparateur ou une nuit, souvent le jour même. Une fiche Google à jour et un site qui indique clairement vos horaires et votre adresse suffisent à les faire entrer. Précisez ce que vous proposez aux cyclistes si c’est le cas : local à vélos, repas rapide, recharge.`,
      },
      {
        q: `Un artisan de Langeais doit-il avoir une page pour chaque commune voisine ?`,
        a: `Pas forcément. Une page par commune ne se justifie que si vous avez quelque chose de précis à dire sur votre travail là-bas. Sinon, une liste claire des communes desservies, sur la page principale, est plus lisible pour le visiteur et plus honnête pour les moteurs de recherche.`,
      },
    ],
  },
  bourgueil: {
    sections: [
      {
        titre: `Un vignoble, des caves dans le tuffeau et des visiteurs qui cherchent la bonne adresse`,
        paragraphes: [
          `À Bourgueil, la vigne n’est pas un décor : elle fait vivre une bonne partie du pays. L’appellation Bourgueil produit principalement des vins rouges à base de cabernet franc, et sa voisine Saint-Nicolas-de-Bourgueil forme une appellation distincte. Beaucoup de domaines sont familiaux, avec des caves creusées dans le tuffeau, où l’on reçoit à la propriété. Le client qui vient ici veut en général goûter, parler au vigneron, repartir avec quelques bouteilles. Avant de se déplacer, il cherche : « cave Bourgueil dégustation », « vigneron Bourgueil vente directe », « hébergement près des vignes ». Le site est la première porte d’entrée, souvent la seule avant la visite.`,
          `Ce que le visiteur veut y trouver est simple : où se trouve le domaine, quels jours et à quelle heure on peut le recevoir, s’il faut prendre rendez-vous, quels vins sont à la vente, et comment commander s’il habite loin. Les périodes de vendanges et les mois d’hiver n’ont pas la même organisation, ce qui plaide pour des horaires faciles à modifier. Une fiche Google exacte, avec des photos réelles de la cave et du chai, complète le site et rassure ceux qui n’osent pas pousser une porte sans savoir si elle est ouverte.`,
        ],
      },
      {
        titre: `Vigneron, caviste, restaurateur, hébergeur : ce que le site simplifie`,
        paragraphes: [
          `Pour un vigneron, un site peut présenter les cuvées, raconter l’exploitation et surtout organiser les demandes : réservation d’une dégustation, commande de caisses, retrait au domaine. Un petit outil relié au site permet de suivre les commandes dans un tableau unique, plutôt que dans un carnet, des courriels et des messages éparpillés. Si vous expédiez à des particuliers, la vente en ligne d’alcool suppose de respecter des règles précises, notamment sur la majorité du client et sur la publicité ; elles sont à vérifier sur les sites officiels avant de lancer quoi que ce soit.`,
          `Autour du vin, d’autres métiers profitent de la même clientèle. Un restaurateur de Bourgueil gagne à publier sa carte du moment et ses jours d’ouverture, qui changent selon la saison. Un hébergeur y montre ses chambres, sa proximité avec les caves et les chemins de balade. Un commerçant de produits du terroir peut présenter une sélection simple, avec mise de côté en boutique. Une boulangerie, un coiffeur ou un garagiste du bourg, enfin, ont un besoin plus modeste : être trouvés par les gens du secteur, avec des horaires exacts et un numéro qui répond. Ces besoins sont différents, donc les sites le sont aussi.`,
        ],
      },
      {
        titre: `Se faire trouver autour de Bourgueil, et se voir sur place ou à distance`,
        paragraphes: [
          `La recherche locale, ici, se mélange avec celle du voyage. Une même personne peut taper le nom du village pour un vin, puis « chambre d’hôtes près de Bourgueil », puis « restaurant Bourgueil » le jour du départ. Votre fiche Google, votre site et vos photos doivent donc raconter la même histoire, avec les mêmes horaires et la même adresse partout. Citer les communes voisines que vous desservez ou qui sont proches de votre domaine aide les gens à vous situer, sans qu’il soit nécessaire de multiplier les pages.`,
          `Mathéo Reboul est installé à Savigné-sur-Lathan, dans le nord-ouest de la Touraine, à proximité de Bourgueil. Un rendez-vous sur place est possible, ce qui est précieux pour un domaine : voir la cave, le caveau et l’accès permet de décider ce qu’on montre et dans quel ordre. Si vous préférez, un échange en visio fait l’affaire, par exemple en dehors de la saison des vendanges, quand votre emploi du temps est trop chargé. Le calendrier du projet se fixe ensemble avant de commencer, en tenant compte de vos périodes de travail à la vigne.`,
        ],
      },
    ],
    faq: [
      {
        q: `Un petit domaine de Bourgueil a-t-il intérêt à vendre ses vins en ligne ?`,
        a: `Pas forcément dès le départ. Beaucoup de vignerons commencent par un site qui présente les cuvées et prend les commandes par formulaire, puis traitent le paiement et l’expédition à la main. Une vraie boutique en ligne a du sens si vous expédiez régulièrement ; avant cela, il vaut mieux vérifier les règles de la vente d’alcool à distance sur les sites officiels.`,
      },
      {
        q: `Comment présenter des horaires de dégustation qui changent selon la saison ?`,
        a: `En les isolant dans un bloc que vous modifiez vous-même : horaires d’été, d’hiver, fermetures, périodes de vendanges, jours sur rendez-vous seulement. Le reste du site ne bouge pas. Cela évite d’afficher des horaires faux, ce qui est l’erreur qui fait le plus perdre de visites pour un caveau.`,
      },
      {
        q: `Faut-il distinguer Bourgueil et Saint-Nicolas-de-Bourgueil sur mon site ?`,
        a: `Oui, si votre domaine produit l’une ou l’autre appellation : ce sont deux appellations distinctes et les amateurs de vin y sont attentifs. Indiquez clairement laquelle correspond à chaque cuvée, avec le cépage et le style du vin en quelques mots simples, pour que le visiteur sache ce qu’il achète.`,
      },
    ],
  },
  'chateau-la-valliere': {
    sections: [
      {
        titre: `Une commune de la Gâtine tourangelle, entre forêt, étangs et bourg`,
        paragraphes: [
          `Château-la-Vallière n’a pas la silhouette d’une ville de passage : c’est un bourg de la Gâtine tourangelle, au nord de la Touraine, entouré de bois, d’étangs et de bocage. Son nom vient de la duchesse de La Vallière, favorite de Louis XIV, dont le titre a été attaché à cette seigneurie. La forêt qui porte le nom de la commune est un but de promenade et de randonnée, et les étangs de la région attirent les pêcheurs. Ici, on vient pour le calme et la nature, et on cherche un gîte, une table de campagne ou un endroit où se ravitailler, avec parfois un séjour qui dure plusieurs jours.`,
          `Pour ceux qui vivent et travaillent ici, la question est différente : comment être trouvé par les habitants des communes voisines, quand la ville la plus proche demande déjà un trajet ? Quelqu’un qui cherche un artisan du bâtiment, une aide à domicile, un garage ou un cabinet de santé tape le nom du bourg suivi du métier, ou « près de moi ». Les résultats mettent en avant les fiches Google les plus complètes et les sites les plus clairs. Dans un secteur rural, une présence soignée et bien renseignée compte plus qu’un budget publicitaire : il y a moins de concurrents, donc le moindre effort se voit.`,
        ],
      },
      {
        titre: `Artisans, exploitants agricoles, gîtes : des besoins concrets`,
        paragraphes: [
          `Les artisans du bâtiment sont nombreux dans ce type de territoire, et leurs clients habitent souvent à plusieurs kilomètres. Un site utile à un maçon, un charpentier, un électricien ou un paysagiste annonce la zone d’intervention, la nature des travaux, quelques chantiers en photos et une façon simple de demander un devis depuis son téléphone. Il rassure sur ce qui compte pour un particulier : l’artisan existe, il est joignable, il intervient chez moi. Un formulaire qui recueille l’adresse, le type de travaux et une photo évite de rappeler trois fois pour comprendre la demande.`,
          `Un exploitant qui vend en direct (viande, œufs, légumes, produits transformés) peut présenter ses produits, ses jours de vente à la ferme ou sur les marchés, et prendre les commandes à l’avance, pour limiter les invendus. Un propriétaire de gîte, de chambre d’hôtes ou d’emplacements de camping y montre les lieux, les activités à proximité (balades en forêt, pêche, vélo) et un calendrier de disponibilités. Pour tous, il s’agit d’un outil de travail : si une fonction ne retire pas une tâche de votre semaine, elle n’entre pas dans le projet.`,
        ],
      },
      {
        titre: `Se rencontrer quand on habite la campagne`,
        paragraphes: [
          `Mathéo Reboul habite Savigné-sur-Lathan, lui aussi en Touraine du nord-ouest : il connaît ce type de territoire où les distances comptent, où l’on s’organise autour des déplacements et où l’on n’a pas toujours le temps d’aller en ville. Un rendez-vous à proximité, chez vous, dans votre atelier ou à la ferme, est possible pour cadrer le projet. Rencontrer les lieux permet de choisir ce qu’il faut montrer : l’entrée de la ferme, le matériel, le gîte, un exemple de chantier. Ce sont les vraies photos qui rassurent un client, pas des images génériques.`,
          `Quand l’emploi du temps est trop serré, la visio évite les déplacements : vous racontez votre activité, on regarde ensemble des exemples, on décide du contenu des pages. Une connexion modeste suffit. Vous gardez la main ensuite : les horaires, les photos et les nouveautés peuvent se modifier sans passer par un appel. Le calendrier se fixe ensemble avant de commencer, en tenant compte des saisons de travail, de la moisson aux chantiers de l’été, pour que le site arrive quand vous avez le temps de le regarder.`,
        ],
      },
    ],
    faq: [
      {
        q: `Dans un petit bourg comme Château-la-Vallière, un site internet est-il vraiment utile ?`,
        a: `Oui, parce que les gens cherchent un artisan, un gîte ou un service depuis leur téléphone, même à la campagne. Avec peu de concurrents proches, une fiche Google complète et un site clair vous placent vite devant les autres. Le site n’a pas besoin d’être grand : horaires, zone desservie, photos réelles et un moyen de vous joindre.`,
      },
      {
        q: `Comment attirer les randonneurs et les pêcheurs vers mon gîte ?`,
        a: `En montrant ce qui les intéresse : les chemins de promenade et les étangs à proximité, un endroit où ranger le matériel, des horaires d’arrivée souples. Ajoutez des photos prises sur place et un calendrier de disponibilités. Ces visiteurs comparent plusieurs hébergements et choisissent souvent celui qui répond le plus clairement à leurs questions.`,
      },
      {
        q: `Un agriculteur qui vend à la ferme peut-il prendre les commandes sur le site ?`,
        a: `Oui, sans passer par une grande boutique en ligne. Un catalogue simple avec les produits de saison, des quantités à choisir et un jour de retrait à la ferme ou sur un marché suffit pour commencer. Vous préparez la commande à l’avance, ce qui limite les pertes, et le client sait ce qui l’attend.`,
      },
    ],
  },
}
