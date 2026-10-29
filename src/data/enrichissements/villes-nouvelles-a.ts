import type { Ville } from '../villes'
import type { Enrichissements } from './types'

export const VILLES_A: Ville[] = [
  {
    slug: 'saint-cyr-sur-loire',
    ville: 'Saint-Cyr-sur-Loire',
    departement: 'Indre-et-Loire (37)',
    region: 'Centre-Val de Loire',
    priorite: 'P2',
    requetePrincipale: 'agence web Saint-Cyr-sur-Loire',
    variantes: [
      'création site internet Saint-Cyr-sur-Loire',
      'création site web Saint-Cyr-sur-Loire',
      'développeur web Saint-Cyr-sur-Loire',
      'création site vitrine Saint-Cyr-sur-Loire',
      'refonte site internet Saint-Cyr-sur-Loire',
    ],
    villesVoisines: ['tours', 'joue-les-tours', 'langeais', 'amboise'],
    economie: `Saint-Cyr-sur-Loire est une commune de l’agglomération tourangelle, installée sur la rive droite de la Loire et collée à Tours par l’ouest. Elle est surtout résidentielle, ce qui nourrit une économie de proximité : cabinets de santé et de professions libérales, artisans du bâtiment, commerces de quartier, restaurants et services à la personne. Beaucoup d’indépendants y travaillent depuis leur domicile ou un petit local et interviennent aussi dans les communes voisines. Pour eux, être trouvé sur « près de chez moi » compte plus qu’une grande vitrine nationale.`,
    secteurs: ['Santé & professions libérales', 'Artisanat & bâtiment', 'Commerces de proximité', 'Restauration & services à la personne'],
  },
  {
    slug: 'saint-pierre-des-corps',
    ville: 'Saint-Pierre-des-Corps',
    departement: 'Indre-et-Loire (37)',
    region: 'Centre-Val de Loire',
    priorite: 'P2',
    requetePrincipale: 'agence web Saint-Pierre-des-Corps',
    variantes: [
      'création site internet Saint-Pierre-des-Corps',
      'création site web Saint-Pierre-des-Corps',
      'développeur web Saint-Pierre-des-Corps',
      'création site vitrine Saint-Pierre-des-Corps',
      'refonte site internet Saint-Pierre-des-Corps',
    ],
    villesVoisines: ['tours', 'joue-les-tours', 'chambray-les-tours', 'amboise'],
    economie: `Saint-Pierre-des-Corps est la commune, à l’est de Tours, où se trouve la gare TGV de l’agglomération, nœud ferroviaire de longue date. Cette histoire du rail a laissé un tissu d’entreprises tournées vers le transport, l’entreposage et la maintenance, auxquelles s’ajoutent des artisans du bâtiment, des garages, des commerces de proximité et des petites sociétés de services. Les professionnels de la commune travaillent souvent avec des clients de toute l’agglomération et de passage : un site qui indique clairement l’adresse, les accès et la zone desservie leur est particulièrement utile.`,
    secteurs: ['Transport, rail & logistique', 'Artisanat & bâtiment', 'Garages & services auto', 'Commerces de proximité'],
  },
  {
    slug: 'chambray-les-tours',
    ville: 'Chambray-lès-Tours',
    departement: 'Indre-et-Loire (37)',
    region: 'Centre-Val de Loire',
    priorite: 'P2',
    requetePrincipale: 'agence web Chambray-lès-Tours',
    variantes: [
      'création site internet Chambray-lès-Tours',
      'création site web Chambray-lès-Tours',
      'développeur web Chambray-lès-Tours',
      'création site vitrine Chambray-lès-Tours',
      'refonte site internet Chambray-lès-Tours',
    ],
    villesVoisines: ['tours', 'joue-les-tours', 'saint-pierre-des-corps', 'loches'],
    economie: `Chambray-lès-Tours est une commune de l’agglomération tourangelle située au sud de Tours, côté route de Loches. Elle abrite une importante zone commerciale, la Vrillonnerie, et des zones d’activités où se côtoient enseignes, magasins spécialisés, artisans, entrepôts et sociétés de services. À côté de cette économie de grandes surfaces vit un tissu plus discret d’entrepreneurs individuels et de petites entreprises du bâtiment, de la santé et des services aux entreprises. Sa proximité avec l’autoroute en fait une adresse pratique pour intervenir dans tout le sud de l’agglomération.`,
    secteurs: ['Commerce spécialisé & zones commerciales', 'Artisanat & bâtiment', 'Services aux entreprises', 'Santé & bien-être'],
  },
  {
    slug: 'chatellerault',
    ville: 'Châtellerault',
    departement: 'Vienne (86)',
    region: 'Nouvelle-Aquitaine',
    priorite: 'P3',
    requetePrincipale: 'agence web Châtellerault',
    variantes: [
      'création site internet Châtellerault',
      'création site web Châtellerault',
      'développeur web Châtellerault',
      'création site vitrine Châtellerault',
      'refonte site internet Châtellerault',
    ],
    villesVoisines: ['chinon', 'loches', 'tours'],
    economie: `Châtellerault est une ville du nord de la Vienne, bâtie sur les rives de la Vienne et traversée par l’axe Tours–Poitiers, que dessert l’autoroute A10. Son passé industriel, marqué par l’ancienne manufacture d’armes, a laissé un savoir-faire en mécanique et en métallurgie que l’on retrouve chez des sous-traitants et des ateliers. Le centre-ville, le patrimoine autour du pont Henri-IV et les musées apportent une clientèle de visiteurs aux commerces, restaurants et hébergements, tandis que l’artisanat et le bâtiment font vivre les communes alentour.`,
    secteurs: ['Industrie & mécanique', 'Commerce de centre-ville', 'Tourisme & patrimoine', 'Artisanat & bâtiment'],
  },
]

export const ENRICHISSEMENTS_A: Enrichissements = {
  'saint-cyr-sur-loire': {
    sections: [
      {
        titre: `Être trouvé quand on est collé à Tours`,
        paragraphes: [
          `À Saint-Cyr-sur-Loire, la difficulté est inverse de celle d’une petite ville isolée : la commune touche Tours, et les moteurs de recherche ne s’arrêtent pas aux limites communales. Un kiné, une coiffeuse ou un plombier installés à Saint-Cyr sont cherchés par des habitants de Tours, de Fondettes, de La Membrolle-sur-Choisille ou de Luynes, qui tapent souvent « près de moi » ou le nom de leur quartier. Il faut donc dire précisément où l’on se trouve, quelles communes on dessert et à quelles heures on répond. Une fiche Google exacte, une adresse claire, un plan et un téléphone cliquable sur mobile font l’essentiel du travail.`,
          `Le site complète la fiche plus qu’il ne la remplace. Il explique ce que vous faites, présente quelques réalisations réelles, indique la zone d’intervention et donne un moyen simple de vous joindre ou de demander un rendez-vous. Pour un artisan du bâtiment qui se déplace chez le client, la liste des communes desservies, depuis la rive droite de la Loire jusqu’aux communes de l’ouest, compte plus qu’une longue présentation de l’entreprise.`,
          `Les horaires méritent une attention particulière dans une commune où beaucoup d’habitants rentrent du travail en soirée. Un cabinet qui reçoit tard, un restaurant fermé le lundi, un artisan joignable le samedi matin : ces détails, affichés pareillement sur le site et sur la fiche Google, évitent les appels inutiles. Si vous changez de local ou de téléphone, la modification se fait aux deux endroits le même jour, sinon le client se fie à l’information la plus ancienne qu’il trouve.`,
        ],
      },
      {
        titre: `Cabinets, artisans et commerces de quartier`,
        paragraphes: [
          `Commune résidentielle, Saint-Cyr vit beaucoup de métiers de service. Un cabinet médical ou paramédical a besoin d’une page qui dit qui reçoit, sur rendez-vous ou non, avec quelles spécialités, et ce qu’il faut apporter. Une infirmière libérale, un ostéopathe ou un cabinet d’expertise comptable cherchent d’abord à rassurer : visage, parcours, accès au cabinet, stationnement. Les commerces de quartier, boulangerie, fleuriste, caviste ou institut de beauté, tirent profit d’un site court : horaires du jour, adresse, produits ou prestations de saison, éventuellement commande à retirer sur place.`,
          `Les entreprises qui travaillent pour les particuliers de la commune, comme un paysagiste, un électricien ou un peintre, gagnent à montrer des chantiers terminés, avec leur texte et leurs photos, plutôt qu’un catalogue générique. Un formulaire de demande de devis qui pose les bonnes questions dès le départ (type de travaux, adresse, délais souhaités) évite les allers-retours téléphoniques, surtout pour ceux qui répondent depuis une camionnette ou un chantier.`,
          `Quelques photos prises dans vos propres locaux, ou chez un client d’accord, rendent un site plus convaincant que des images de catalogue. Dans une commune où l’on choisit souvent un professionnel sur la recommandation d’un voisin, une page qui montre le visage et la façon de travailler d’une personne rassure davantage qu’une formule d’accueil.`,
        ],
      },
      {
        titre: `Un rendez-vous depuis Savigné-sur-Lathan, ou en visio`,
        paragraphes: [
          `Mathéo Reboul travaille depuis Savigné-sur-Lathan, au nord-ouest de Tours, et peut venir vous voir sur place à Saint-Cyr pour cadrer le projet : regarder votre activité, comprendre comment arrivent vos clients, décider ce que le site doit faire. Si vous préférez gagner du temps, un échange en visio permet de faire le même tour du sujet, écran partagé, sans déplacement ni de votre côté ni du nôtre.`,
          `On commence par ce qui existe : votre fiche Google, vos coordonnées affichées en ligne, un éventuel ancien site ou une page de réseau social. Ensuite seulement on décide de ce qu’il faut fabriquer, en gardant ce qui sert à vos clients saint-cyriens et en écartant le reste. Le calendrier se fixe ensemble avant de commencer.`,
        ],
      },
    ],
    faq: [
      {
        q: `Saint-Cyr-sur-Loire est tout près de Tours : faut-il un site pour chaque ville ?`,
        a: `Non. Un seul site suffit, avec une adresse claire à Saint-Cyr et la liste des communes que vous desservez, Tours comprise. Ce qui compte, c’est que ces informations soient exactes et cohérentes entre votre site et votre fiche Google.`,
      },
      {
        q: `Mon cabinet de Saint-Cyr prend déjà les rendez-vous par téléphone : un site change-t-il quelque chose ?`,
        a: `Il décharge le téléphone des questions répétitives : horaires, accès, pièces à apporter, spécialités. Une prise de rendez-vous en ligne peut s’ajouter, mais seulement si elle simplifie réellement votre planning.`,
      },
      {
        q: `Puis-je vous rencontrer à Saint-Cyr-sur-Loire ?`,
        a: `Oui, un premier rendez-vous sur place est possible. Mathéo Reboul se déplace depuis Savigné-sur-Lathan, et la visio reste une alternative si votre emploi du temps est serré.`,
      },
    ],
  },
  'saint-pierre-des-corps': {
    sections: [
      {
        titre: `Une commune de passage, entre rail et agglomération`,
        paragraphes: [
          `Saint-Pierre-des-Corps est connue d’abord pour sa gare, où s’arrêtent les TGV de l’agglomération tourangelle. Cela dessine un public particulier : des voyageurs de passage qui cherchent un restaurant, un taxi, un hôtel ou un réparateur à proximité, et des habitants de l’agglomération qui viennent à la commune pour ses artisans et ses services. Pour un commerce ou un restaurant proche de la gare, le site doit répondre en quelques secondes : où se trouve-t-on par rapport aux quais, jusqu’à quelle heure est-on ouvert, peut-on réserver ou emporter.`,
          `Les recherches de ces visiteurs partent souvent d’un téléphone, avec les bagages à la main. Une page lisible, des horaires à jour, un plan et un bouton d’appel bien visibles valent mieux qu’un site chargé d’animations. Une fiche Google soignée, avec photos réelles de l’établissement et accès indiqué depuis la gare, complète le dispositif.`,
          `Un hôtel, un taxi ou un loueur qui vit des arrivées en gare a un autre souci : être trouvé au bon moment, c’est-à-dire quand le voyageur regarde son téléphone sur le quai ou dans le hall. Mieux vaut un site qui s’ouvre vite et dit tout de suite où l’on est, comment réserver et quels moyens de paiement sont acceptés, que cinq pages de présentation. Les langues parlées sur place, si vous accueillez des voyageurs étrangers, se disent en une ligne.`,
        ],
      },
      {
        titre: `Transporteurs, artisans et métiers du bâtiment`,
        paragraphes: [
          `Le passé ferroviaire de la commune a laissé des terrains d’activité, des entrepôts et des entreprises tournées vers le transport et la maintenance. Pour ces sociétés, le site est surtout une carte de visite sérieuse : métiers exercés, zone couverte, moyens, contacts distincts selon la demande. Un donneur d’ordre qui compare plusieurs prestataires regarde si les informations sont précises et faciles à retrouver, bien avant le style graphique.`,
          `Les artisans du bâtiment, les garages et les petits ateliers installés sur la commune interviennent souvent dans toute l’agglomération. Leur site gagne à lister les villes desservies, Tours, Joué-lès-Tours, Chambray-lès-Tours et les communes voisines, à montrer des travaux réels et à proposer un formulaire de demande de devis simple. Un mécanicien ou un carrossier peut aussi indiquer ce qu’il faut préparer avant de déposer un véhicule, ce qui réduit les appels de précision.`,
          `Un transporteur ou un entrepositaire peut aussi se servir de son site pour trier les demandes : une page par type de prestation, un formulaire qui demande dès le départ la nature de la marchandise, le point de départ et l’arrivée, et un contact direct pour les urgences. Cela fait gagner du temps à l’exploitation et rend la première réponse plus précise.`,
        ],
      },
      {
        titre: `Travailler ensemble, sur place ou à distance`,
        paragraphes: [
          `Mathéo Reboul est installé à Savigné-sur-Lathan et se déplace volontiers dans l’agglomération de Tours, Saint-Pierre-des-Corps comprise. Un rendez-vous dans votre atelier, votre commerce ou votre bureau permet de voir comment vos clients vous trouvent, ce qu’ils demandent au comptoir ou au téléphone, et de décider ensemble de ce que le site doit faire.`,
          `Si vous préférez échanger à distance, la visio fait très bien l’affaire pour un premier cadrage. Vous repartez avec une idée claire des pages utiles, de ce qu’il est inutile de développer et des fonctions qui pourront s’ajouter plus tard, sans engagement sur un calendrier fixe avant d’avoir regardé votre situation.`,
          `Concrètement, la première étape consiste à relever ce que vos clients demandent le plus souvent, au guichet, au téléphone ou par message. Ces questions deviennent la structure du site : une page par activité, un plan d’accès, une zone desservie et un moyen de contact adapté à chaque demande. Vous gardez la main sur les textes et les horaires, pour les modifier le jour où quelque chose change.`,
        ],
      },
    ],
    faq: [
      {
        q: `Mon commerce est près de la gare de Saint-Pierre-des-Corps : que doit montrer mon site en priorité ?`,
        a: `L’accès depuis la gare, les horaires du jour, un téléphone cliquable et, si vous faites de la vente à emporter ou des réservations, le moyen de les faire en deux gestes. Le reste peut rester sobre.`,
      },
      {
        q: `Je travaille dans le transport ou l’entreposage : un site est-il vraiment utile ?`,
        a: `Oui, comme carte de visite sérieuse. Un donneur d’ordre y vérifie vos activités, votre zone et vos contacts avant de vous écrire. Il n’a pas besoin d’un site spectaculaire, mais d’informations nettes.`,
      },
      {
        q: `Dois-je afficher les communes où j’interviens autour de Saint-Pierre-des-Corps ?`,
        a: `Oui, si vous vous y déplacez réellement. Une liste courte et exacte, cohérente avec votre fiche Google, aide les clients et les moteurs de recherche à comprendre votre zone.`,
      },
    ],
  },
  'chambray-les-tours': {
    sections: [
      {
        titre: `Une commune commerçante au sud de l’agglomération`,
        paragraphes: [
          `Chambray-lès-Tours est identifiée par ses zones commerciales, dont la Vrillonnerie, et par la route de Loches qui la traverse. Les clients y viennent en voiture, souvent avec un besoin précis : un magasin de bricolage, du mobilier, un équipement, un service. Dans ce décor, une enseigne indépendante ou un artisan doit se distinguer par une information très concrète : ce qu’il vend, ce qu’il pose ou répare, où se garer, quand venir.`,
          `Les recherches locales décident beaucoup. Une personne qui tape le nom d’un produit suivi de « Chambray » ou de « Tours sud » compare des fiches Google, des horaires et des photos avant de se déplacer. Un site clair, avec un plan d’accès depuis la route de Loches et des horaires à jour, évite la visite pour rien et la mauvaise note qui en découle.`,
          `Un point d’accès compte plus qu’un long texte : l’entrée par la route de Loches, le parking, l’accueil des personnes qui se déplacent avec des charges lourdes. Les enseignes indépendantes gagnent à le dire, avec une photo de la façade que l’on reconnaît en arrivant. Un chauffeur-livreur ou un client pressé trouvera alors tout de suite le bon bâtiment.`,
        ],
      },
      {
        titre: `Magasins spécialisés, artisans et sociétés de services`,
        paragraphes: [
          `À côté des grandes surfaces, Chambray accueille des magasins spécialisés, des showrooms, des entrepôts et des entreprises de services installées dans les zones d’activités. Pour un magasin de cuisine, de literie ou de carrelage, le site sert de catalogue d’inspiration et de point d’entrée vers le rendez-vous en showroom. Pour un installateur ou un artisan, il montre des chantiers terminés et la zone couverte au sud de Tours, jusqu’aux communes de la vallée du Cher.`,
          `Les professionnels de santé et de bien-être, de plus en plus nombreux dans les communes périphériques, ont un autre besoin : une page qui rassure et renseigne. Spécialités, mode de rendez-vous, accès pour les personnes à mobilité réduite, stationnement, moyens de paiement. Un dentiste, un opticien ou un centre de pilates y gagne en fréquentation sans avoir à répondre trente fois aux mêmes questions.`,
          `Les sociétés de services installées dans les zones d’activités, comme un cabinet d’informatique, une agence de recrutement ou une société de nettoyage, cherchent surtout des clients professionnels de l’agglomération. Leur site doit présenter clairement leurs prestations, leurs références vérifiables et un contact par métier, et non lister des promesses générales.`,
        ],
      },
      {
        titre: `Un point de rendez-vous facile depuis l’autoroute`,
        paragraphes: [
          `Chambray est bien reliée au réseau routier, ce qui facilite aussi un rendez-vous avec Mathéo Reboul. Il part de Savigné-sur-Lathan, au nord-ouest de Tours, et peut venir à votre magasin, votre atelier ou votre bureau pour voir comment vos clients arrivent chez vous et ce qu’ils cherchent en premier.`,
          `Une visio reste possible pour un premier échange, notamment si vous êtes pris par l’ouverture du magasin. L’objectif est de repartir avec une liste courte de ce que le site doit faire, dans l’ordre d’utilité, et de laisser de côté ce qui ne servirait pas votre clientèle. Le calendrier se fixe ensemble, une fois le besoin posé.`,
          `Pour un commerce, on peut prévoir des blocs que vous modifiez seul : horaires de fin d’année, jours de fermeture, arrivage, promotion de saison. Pour un artisan, ce sera plutôt la liste des communes desservies et une galerie de chantiers à compléter. Chaque information est placée là où le client la cherche, sans qu’il ait à fouiller le site.`,
        ],
      },
    ],
    faq: [
      {
        q: `Mon magasin est dans une zone commerciale de Chambray : comment me distinguer des enseignes voisines ?`,
        a: `En étant plus précis qu’elles sur ce qui vous est propre : produits ou services que l’on ne trouve pas ailleurs, conseil, installation, rendez-vous en showroom. Votre site et votre fiche Google doivent le dire simplement.`,
      },
      {
        q: `Un artisan basé à Chambray peut-il être trouvé à Tours ou à Joué-lès-Tours ?`,
        a: `Oui, à condition d’annoncer ces communes comme zone d’intervention et de les citer sur le site comme sur votre fiche Google. Évitez d’en lister des dizaines que vous ne desservez pas vraiment.`,
      },
      {
        q: `Faut-il une boutique en ligne si j’ai déjà un magasin à Chambray ?`,
        a: `Pas forcément. Beaucoup de clients veulent voir avant d’acheter. Un catalogue en ligne avec retrait ou rendez-vous en magasin suffit souvent, la vente à distance ne s’ajoute que si elle correspond à votre métier.`,
      },
    ],
  },
  chatellerault: {
    sections: [
      {
        titre: `Une ville de la Vienne, à une heure et quelques de Savigné-sur-Lathan`,
        paragraphes: [
          `Châtellerault est située dans le nord de la Vienne, sur la Vienne justement, au bord de l’axe Tours–Poitiers. Elle ne fait pas partie de l’aire de Tours, et son public cherche d’abord des acteurs de son territoire. Un artisan, un commerçant ou une PME de Châtellerault est cherché depuis le centre-ville, depuis les quartiers de la rive droite comme Châteauneuf et depuis les communes voisines. Le site doit donc afficher une vraie adresse locale, les communes desservies et un numéro à jour, sans copier le discours d’une agence parisienne.`,
          `Stackup Agency est basée à Savigné-sur-Lathan, en Indre-et-Loire. Il faut un peu plus d’une heure de route pour rejoindre Châtellerault, ce qui permet un rendez-vous sur place pour un projet qui le justifie. Pour un premier cadrage, la visio évite ce trajet.`,
          `Les quartiers autour du centre-ville ont leurs habitudes de recherche, et les habitants préfèrent souvent un professionnel proche, qu’ils puissent croiser ou appeler sans passer par une plateforme nationale. Une fiche Google bien remplie, avec des photos réelles et vos horaires exacts, apporte une grande partie des contacts ; le site la complète en racontant ce que vous faites et pour qui.`,
        ],
      },
      {
        titre: `Industrie, patrimoine et commerces du centre`,
        paragraphes: [
          `Le passé industriel de la ville, lié à la manufacture d’armes, a laissé une culture de la mécanique et de la métallurgie. Les ateliers et sous-traitants de ce secteur s’adressent surtout à des donneurs d’ordre qui vérifient les compétences et les moyens avant d’appeler. Leur site peut rester sobre : activités, machines ou savoir-faire, zones desservies, contact technique, et une page claire pour les demandes de devis ou de prototypes.`,
          `Le pont Henri-IV, les rives de la Vienne et le musée Auto Moto Vélo font venir des visiteurs en ville. Les restaurants, hébergements et commerces du centre peuvent s’appuyer sur une page qui indique les horaires de saison, les menus et comment venir, plutôt que de laisser le visiteur chercher des informations dispersées sur plusieurs sites. Un artisan d’art ou un commerçant de produits locaux y trouve aussi une raison d’afficher son atelier.`,
          `Les restaurateurs peuvent publier leur carte du moment sans refaire le site, et les commerçants de produits du terroir indiquer ce qui est de saison. Un artisan d’art ou un petit atelier peut montrer ses pièces et ses techniques, ce qui explique ses prix mieux qu’une longue description. Tout cela reste simple à modifier par vos soins.`,
        ],
      },
      {
        titre: `Artisans et bâtiment dans le Châtelleraudais`,
        paragraphes: [
          `Autour de Châtellerault, les artisans du bâtiment et des services à domicile interviennent dans plusieurs communes, parfois jusqu’aux limites de l’Indre-et-Loire. Leur enjeu est de dire clairement où ils vont. Un électricien, un couvreur ou un paysagiste a intérêt à lister ses communes, à montrer des chantiers réels et à proposer une demande de devis qui demande déjà le lieu, le type de travaux et le délai souhaité.`,
          `La visio est ici une bonne option pour le premier échange : nous passons en revue votre situation, vos clients actuels, la façon dont ils vous trouvent, puis nous décidons de ce qui mérite d’être construit. Un déplacement sur place peut venir ensuite, si le projet l’exige. Aucun calendrier de livraison n’est promis avant d’avoir regardé ce que vous attendez.`,
          `Concrètement, on commence par relever ce que vos clients demandent le plus souvent et comment ils vous ont connu. Ces informations fixent la structure : les pages utiles, la zone desservie, le formulaire de contact. Vous gardez la main sur les textes et les horaires, et vous pouvez les modifier vous-même le jour où l’activité change, sans passer par un prestataire.`,
        ],
      },
    ],
    faq: [
      {
        q: `Châtellerault est dans la Vienne : travaillez-vous aussi hors d’Indre-et-Loire ?`,
        a: `Oui. Le site se construit à distance et le travail ne dépend pas du département. Un rendez-vous sur place est possible, mais la visio permet de faire l’essentiel sans déplacement.`,
      },
      {
        q: `Je suis artisan à Châtellerault et j’interviens vers Poitiers ou Tours : comment l’indiquer ?`,
        a: `Citez les communes ou les secteurs où vous allez réellement, sur le site et sur votre fiche Google. Une zone réaliste est plus crédible qu’une liste très longue que personne ne vérifie.`,
      },
      {
        q: `Ma PME de mécanique a-t-elle besoin d’un site très travaillé ?`,
        a: `Non, d’un site précis. Vos clients professionnels cherchent des compétences, des moyens et un contact. Quelques pages claires, des photos réelles de l’atelier et un formulaire de demande suffisent à poser votre sérieux.`,
      },
    ],
  },
}
