import type { Pilier } from './types'

export const PILIER: Pilier = {
  slug: 'referencement-local',
  chemin: '/services/referencement-local',
  titre: 'Référencement local et fiche Google Business Profile : être trouvé près de chez vous',
  etiquette: 'Service · référencement local',
  reponse: `Google classe les entreprises locales selon trois critères : la pertinence, la distance et la notoriété. Vous ne choisissez pas la distance, mais vous pouvez travailler tout le reste : une fiche complète et exacte, des avis réels, des informations identiques partout et un site qui confirme ce que dit la fiche.`,
  titleSeo: 'Référencement local et fiche Google Business Profile',
  descriptionSeo: 'Fiche Google, avis, cohérence des coordonnées et pages utiles : comment être trouvé dans la carte près de chez vous. Demandez un audit de votre fiche.',
  sections: [
    {
      id: 'comment-google-decide',
      titre: 'Comment Google décide-t-il qui apparaît dans la carte ?',
      paragraphes: [
        `Quand une personne cherche « plombier », « coiffeur » ou « boulangerie » depuis son téléphone, Google affiche quelques fiches d'entreprises avec une carte. Il les choisit avec trois critères, que Google décrit lui-même dans son aide : la pertinence, la distance et la notoriété.`,
        `La pertinence mesure l'adéquation entre la recherche et votre fiche. Une fiche vide, ou rangée dans une catégorie vague, correspond mal à beaucoup de recherches. Une fiche précise, avec les bons services, correspond bien à celles qui comptent pour vous.`,
        `La distance est calculée entre l'endroit où se trouve la personne (ou celui qu'elle indique dans sa recherche) et votre adresse. C'est pour cela que les recherches « près de chez moi » donnent des résultats différents d'une rue à l'autre.`,
        `La notoriété reflète la place que vous occupez réellement : nombre et qualité des avis, présence sur d'autres sites, réputation sur le web en général. Elle se construit lentement, par un travail honnête.`,
      ],
      liste: [
        `Ce que vous maîtrisez : le contenu de la fiche, les avis que vous sollicitez, la cohérence de vos coordonnées, votre site.`,
        `Ce que vous ne maîtrisez pas : la position de la personne qui cherche, les concurrents voisins, les évolutions de l'affichage chez Google.`,
        `Ce que personne ne peut garantir : une place précise dans la carte. Méfiez-vous de qui la promet.`,
      ],
    },
    {
      id: 'creer-verifier-fiche',
      titre: 'Comment créer et vérifier sa fiche Google Business Profile ?',
      paragraphes: [
        `La fiche est gratuite. Vous la créez avec un compte Google, depuis le service Google Business Profile, en indiquant le nom de l'établissement, sa catégorie, son adresse ou sa zone desservie, un numéro de téléphone et l'adresse du site. Vérifiez d'abord qu'une fiche n'existe pas déjà : Google en crée parfois à partir de données publiques, et il vaut mieux la revendiquer que d'en ouvrir une seconde.`,
        `Ensuite vient la vérification : Google doit s'assurer que l'entreprise existe bien à l'endroit indiqué et que vous en êtes le responsable. Selon les cas, il propose une vérification par courrier, par téléphone, par e-mail ou par vidéo. Les méthodes offertes dépendent de votre activité et de ce que Google sait déjà de vous ; suivez simplement ce que la fiche vous propose.`,
        `Le délai dépend de la méthode retenue et de Google, pas de nous : prévoyez de la patience, surtout si un courrier est envoyé.`,
        `Un point qui compte : le compte Google qui détient la fiche doit être le vôtre, avec une adresse e-mail que vous contrôlez. Une fiche créée par un prestataire sur son propre compte devient un problème le jour où vous changez de prestataire.`,
      ],
    },
    {
      id: 'categories-services',
      titre: 'Quelle catégorie principale choisir, et que mettre dans les services ?',
      paragraphes: [
        `La catégorie principale est le renseignement le plus structurant de la fiche : elle dit à Google ce que vous êtes. Choisissez la plus précise qui décrit votre cœur de métier, pas la plus large. Un « électricien » n'est pas un « artisan du bâtiment » : prenez l'intitulé qui correspond à ce que les clients tapent.`,
        `Les catégories secondaires servent à couvrir vos autres activités réelles, sans en inventer. Si vous dépannez en chauffage mais que ce n'est pas votre métier, ne l'ajoutez pas : une fiche qui revendique tout apparaît mal sur tout. La liste des catégories disponibles évolue ; consultez celle que Google vous propose au moment de la modification.`,
        `Les services et produits s'ajoutent ensuite, avec un nom clair et une courte description. Pour un coiffeur : coupe, couleur, soin, coiffure de mariage. Pour un paysagiste : tonte, taille, création de massifs, entretien régulier. Utilisez les mots de vos clients, pas ceux de votre brochure.`,
        `La description de l'établissement, enfin, doit rester sobre : qui vous êtes, ce que vous faites, pour qui, et où. Pas de promotion, pas de coordonnées dans le texte, pas de liste de villes recopiées.`,
      ],
    },
    {
      id: 'adresse-zone-horaires',
      titre: 'Adresse ou zone desservie : que montrer, et comment gérer les horaires et les jours fériés ?',
      paragraphes: [
        `Si vous recevez vos clients (boutique, cabinet, salon, restaurant), la fiche affiche votre adresse : c'est elle qui sert au calcul de la distance. Si vous vous déplacez chez eux (plombier, électricien, paysagiste), vous pouvez au contraire masquer l'adresse et indiquer une zone desservie. Les règles de Google sur ce sujet sont précises ; elles figurent dans ses consignes de représentation de l'établissement.`,
        `Ne renseignez pas une adresse fictive, une boîte postale ou un bureau virtuel pour apparaître dans une ville où vous n'êtes pas : c'est contraire aux consignes et c'est une cause fréquente de suspension. Mieux vaut une zone desservie honnête qu'une adresse trompeuse.`,
        `La zone desservie se renseigne par villes ou par secteurs. Soyez réaliste : listez les endroits où vous intervenez vraiment, pas tout le département. Elle n'a pas la même force qu'une adresse physique dans le calcul de la distance, et il faut l'accepter.`,
      ],
      sous: [
        {
          titre: 'Horaires et jours fériés',
          paragraphes: [
            `Les horaires habituels se saisissent jour par jour, avec la possibilité de plusieurs plages (pause de midi par exemple). Pour les jours fériés, les ponts et les congés, utilisez les horaires exceptionnels de la fiche, en les saisissant à l'avance.`,
            `Une fiche qui annonce « ouvert » un jour où la porte est fermée fabrique des avis négatifs. Un artisan qui travaille sur rendez-vous peut l'indiquer dans la fiche plutôt que d'afficher des horaires qu'il ne tient pas.`,
          ],
        },
      ],
    },
    {
      id: 'photos-publications-questions',
      titre: 'Photos, publications, questions-réponses : que publier sur sa fiche ?',
      paragraphes: [
        `Les photos rassurent avant l'appel ou la visite. Montrez la façade et l'entrée (pour qu'on vous trouve), l'intérieur, l'équipe si elle y consent, et surtout votre travail : une coupe terminée, un massif planté, une cuisine posée. Des photos réelles, prises par vous ou par un professionnel, valent mieux que des images de banque.`,
        `Les publications permettent d'annoncer une actualité : un congé, une nouveauté, un événement, une offre de saison. Elles sont facultatives. Mieux vaut peu de publications utiles qu'un rythme intenable qui s'arrête au bout de trois semaines et laisse une vitrine à l'abandon.`,
        `Pour les questions fréquentes, Google fait évoluer les fonctions disponibles sur la fiche, donc regardez ce que la vôtre propose au moment de la modifier. Si l'espace de questions existe, répondez vous-même aux interrogations courantes (parking, accès, rendez-vous, moyens de paiement). S'il n'existe pas, placez ces réponses dans la description, dans les services et dans une foire aux questions de votre site.`,
      ],
    },
    {
      id: 'avis',
      titre: 'Comment obtenir des avis Google, y répondre et signaler un faux avis ?',
      paragraphes: [
        `Les avis comptent dans la notoriété, mais ils pèsent surtout sur la décision de la personne qui hésite entre deux fiches. La seule méthode saine est de demander à vos clients satisfaits, juste après la prestation, quand le souvenir est frais. Vous pouvez partager le lien direct vers votre fiche par SMS, par e-mail, ou par un petit QR code au comptoir ou sur la facture.`,
        `Ce qui est interdit : acheter des avis, en offrir en échange d'une remise ou d'un cadeau, ne solliciter que les clients dont vous êtes sûr qu'ils seront positifs, ou écrire vous-même vos avis. Google le détecte de mieux en mieux, retire les avis concernés et peut pénaliser la fiche. Consultez ses consignes sur les contenus soumis par les utilisateurs.`,
        `Répondez à tous les avis, y compris aux bons. Remerciez en une phrase personnalisée. Face à un avis négatif, restez factuel et poli : reconnaissez le problème s'il existe, proposez de poursuivre par téléphone et ne dévoilez jamais d'information sur le client.`,
        `Si un avis est faux, hors sujet, injurieux ou publié par quelqu'un qui n'a jamais été client, vous pouvez le signaler depuis la fiche et argumenter. Google instruit la demande, sans délai garanti, et peut refuser. Un avis négatif sincère, même désagréable, n'est pas supprimable : on y répond.`,
      ],
    },
    {
      id: 'coherence-nom-adresse-telephone',
      titre: 'Pourquoi le nom, l\'adresse et le téléphone doivent-ils être identiques partout ?',
      paragraphes: [
        `Google recoupe ce qu'il lit sur votre fiche, sur votre site, dans les annuaires et dans les pages publiques. Quand ces informations concordent, il est plus sûr de votre existence et de votre adresse. Quand elles divergent (« Rue de la Gare » ici, « R. Gare » là, un ancien numéro ailleurs), la confiance baisse et les clients se trompent d'endroit ou de numéro.`,
        `Le nom doit être celui que vous utilisez réellement : enseigne, panneau, factures. N'ajoutez pas de mots-clés pour mieux apparaître (« Dupont Plomberie Chauffage Dépannage Tours pas cher ») : c'est contraire aux consignes de Google et c'est une cause courante de suspension.`,
        `Le travail concret est un petit inventaire : listez tous les endroits où figurent vos coordonnées, comparez-les à la fiche, corrigez les écarts.`,
      ],
      liste: [
        `Votre site : pied de page, page contact, mentions légales.`,
        `Les annuaires généralistes et professionnels de votre métier.`,
        `Les réseaux sociaux, les pages de partenaires, les articles de presse locale.`,
        `Vos devis, factures et signatures d'e-mail.`,
      ],
    },
    {
      id: 'pages-locales',
      titre: 'Pages locales utiles ou pages « satellites » : pourquoi Stackup ne crée pas une page par commune ?',
      paragraphes: [
        `Le réflexe de beaucoup de prestataires est de dupliquer une page en changeant seulement le nom de la ville : « plombier à X », « plombier à Y », « plombier à Z ». Ces pages se ressemblent, n'apprennent rien au lecteur et visent seulement à capter des recherches. Les consignes anti-spam de Google les décrivent sous le nom de pages satellites (« doorway pages ») et elles peuvent nuire à l'ensemble du site.`,
        `Stackup ne les fabrique pas. Une page doit exister parce qu'elle répond à un besoin réel qu'aucune autre ne couvre. La question à se poser : si on retire le nom de la commune, la page dit-elle encore quelque chose de différent ? Sinon, elle est inutile.`,
        `Notre approche est de couvrir un territoire par un petit nombre de pages de zone réellement différentes : une par secteur dans lequel vous travaillez de façon distincte. Chacune se distingue par ce qui est vrai de ce secteur : les accès et le temps de déplacement, les types de chantiers ou de clientèle, les réalisations effectuées sur place, les contraintes locales (centre ancien, zone rurale, copropriétés), les modalités de contact.`,
        `Si vous n'avez rien de différent à dire sur une commune, elle ne mérite pas sa page : elle est citée dans la liste des communes desservies d'une page de zone, et dans la zone de la fiche Google. Vous pouvez voir comment Stackup présente son propre territoire sur la page des [zones d'intervention](/zones-intervention).`,
      ],
    },
    {
      id: 'site-fiche-suivi',
      titre: 'Comment le site et la fiche se renforcent, et comment suivre ses résultats chaque mois ?',
      paragraphes: [
        `La fiche amène la personne qui cherche jusqu'à vous ; le site doit ensuite la convaincre. Les deux se confirment l'un l'autre. La fiche pointe vers la bonne page (pas toujours l'accueil), le site reprend le même nom, la même adresse, les mêmes horaires, présente les mêmes services dans les mêmes termes et affiche un numéro cliquable depuis un téléphone.`,
        `Un site rapide, lisible sur mobile, avec une page par service important et une page contact complète, aide Google à comprendre ce que vous faites. Une page d'accueil qui parle de votre métier et de votre territoire, en toutes lettres, vaut mieux que des mots-clés cachés. Pour aller plus loin sur le site lui-même, voyez notre page [référencement](/services/referencement) et notre outil gratuit d'[audit de site](/outils/audit-site).`,
        `Le suivi est mensuel et court. Google Business Profile affiche des indicateurs de performance : appels, demandes d'itinéraire, clics vers le site, recherches qui ont fait apparaître la fiche. Regardez-les une fois par mois, avec la même méthode, et comparez avec le mois précédent.`,
        `Au même rythme, relisez les avis reçus, répondez à ceux qui restent sans réponse, vérifiez que les horaires des prochains jours fériés sont saisis, ajoutez une ou deux photos récentes. Un quart d'heure suffit quand la fiche est déjà en ordre.`,
      ],
    },
    {
      id: 'ce-que-fait-stackup',
      titre: 'Que fait Stackup, que ne fait-il pas, et combien cela coûte-t-il ?',
      paragraphes: [
        `Mathéo Reboul travaille seul, depuis Savigné-sur-Lathan, en Touraine. Il s'occupe de la mise en ordre de votre présence locale : audit de la fiche et du site, création ou revendication de la fiche, catégories, services, horaires, photos, inventaire des coordonnées dans les annuaires, pages de zone utiles sur le site, et un bilan mensuel clair.`,
        `Le propriétaire reste administrateur de sa fiche, toujours. Elle est rattachée à votre compte Google. Si vous le souhaitez, Stackup y est ajouté comme gestionnaire, avec un accès que vous pouvez retirer à tout moment, sans nous demander la permission. Si nous arrêtons de travailler ensemble, la fiche, ses avis et son historique restent chez vous.`,
        `Ce que Stackup ne fait pas : acheter ou rédiger de faux avis, créer des fiches fictives ou des adresses de complaisance, multiplier des pages par commune, promettre la première place ou un nombre d'appels. Nous ne répondons pas à vos avis à votre place sans que vous ayez relu : ils engagent votre nom.`,
        `Côté prix, le travail sur la fiche se chiffre sur devis, selon le nombre d'établissements, l'état de départ, l'ampleur de l'inventaire des annuaires et la nécessité ou non de pages de zone. Si un site est à créer ou à refaire, il démarre à partir de {{prix:une-page}} € pour une page ; utilisez l'[estimateur de tarifs](/tarifs) pour votre cas ou [écrivez-nous](/contact).`,
      ],
    },
  ],
  exemples: [
    {
      titre: 'Exemple type : un plombier qui se déplace, sans local ouvert au public',
      texte: `Il a une fiche mais affiche l'adresse de son domicile, que des clients prennent pour un magasin. On masque l'adresse, on déclare une zone desservie réaliste, on choisit la catégorie qui dit précisément le métier, on liste les dépannages courants comme services, on saisit des horaires d'astreinte clairs. Le site reçoit une page par grande prestation et une page de zone par secteur qu'il dessert vraiment.`,
    },
    {
      titre: 'Exemple type : une boulangère-pâtissière qui a déménagé sa boutique',
      texte: `Google affiche l'ancienne adresse, les anciens horaires, et un ancien numéro circule dans deux annuaires. On corrige la fiche, on recense les annuaires qui comportent encore les anciennes données et on demande leur mise à jour un par un. Les horaires des jours fériés sont saisis d'avance pour les fêtes, et un message de bienvenue en boutique invite les clients contents à laisser un avis.`,
    },
    {
      titre: 'Exemple type : un paysagiste qui voulait « une page par commune »',
      texte: `On lui propose d'abord de regrouper ses chantiers en trois secteurs réels : le centre-ville et ses jardins de maison, la périphérie pavillonnaire, la campagne et les grands terrains. Chacun a sa page avec ses types de travaux, ses accès et ses photos, et les communes desservies sont listées dedans. Il évite ainsi vingt pages quasi identiques et peut vraiment parler de chaque secteur.`,
    },
  ],
  faq: [
    {
      q: 'Combien coûte l\'optimisation d\'une fiche Google ?',
      a: `La fiche Google est gratuite. Le travail pour la mettre en ordre se chiffre sur devis, selon l'état de départ, le nombre d'établissements et ce qui doit être corrigé ailleurs (annuaires, site). Aucun prix n'est écrit à la main sur cette page : l'[estimateur](/tarifs) donne un ordre de grandeur et le devis fait foi.`,
    },
    {
      q: 'Peut-on apparaître dans Google Maps sans avoir de site internet ?',
      a: `Oui, la fiche peut exister seule. Elle sera pourtant moins convaincante qu'une fiche accompagnée d'un site qui confirme vos services, vos horaires et votre zone. Le site apporte aussi une adresse stable que vous maîtrisez, ce que la fiche ne vous donne pas.`,
    },
    {
      q: 'Que veut dire « près de chez moi » pour Google ?',
      a: `Google se base sur la position de la personne qui cherche, ou sur le lieu qu'elle précise. Vous ne pouvez donc pas être « près de chez moi » pour tout le monde. Une adresse réelle, une zone honnête, des informations cohérentes et de bons avis sont les seuls leviers sérieux.`,
    },
    {
      q: 'Combien de temps avant de voir un effet ?',
      a: `Cela dépend de l'état initial, de la concurrence locale et des vérifications que Google doit mener, que nous ne maîtrisons pas. Les corrections de base (catégorie, horaires, services) sont prises en compte plus vite que la notoriété, qui se construit sur plusieurs mois. Aucun résultat n'est garanti.`,
    },
    {
      q: 'Peut-on supprimer un mauvais avis ?',
      a: `Seulement s'il enfreint les règles de Google : faux avis, conflit d'intérêts, contenu injurieux ou hors sujet. On le signale depuis la fiche. Un avis sincère mais négatif reste en ligne : la bonne réponse est une réponse polie et factuelle.`,
    },
    {
      q: 'Puis-je demander des avis à mes clients ?',
      a: `Oui, c'est même la bonne méthode, à condition de ne rien offrir en échange et de ne pas trier les clients que vous sollicitez. Envoyez le lien direct de votre fiche juste après la prestation et laissez chacun écrire ce qu'il pense.`,
    },
    {
      q: 'Ai-je besoin d\'une page par ville où j\'interviens ?',
      a: `Non, et ce serait souvent contre-productif. Google déconseille les pages quasi identiques créées pour capter des recherches. Mieux vaut quelques pages de zone qui disent chacune quelque chose de vrai et de différent, plus la liste des communes desservies dans la fiche.`,
    },
    {
      q: 'Resterai-je administrateur de ma fiche si vous intervenez ?',
      a: `Oui. La fiche reste rattachée à votre compte Google. Stackup peut y être ajouté comme gestionnaire à votre demande, et vous retirez cet accès quand vous voulez. Les avis et l'historique restent à vous.`,
    },
    {
      q: 'Que se passe-t-il si Google suspend ma fiche ?',
      a: `Cela arrive surtout après un changement de nom ou d'adresse, un nom bourré de mots-clés ou une adresse non conforme. On corrige ce qui est contraire aux consignes puis on dépose une demande de réexamen depuis la fiche. Le délai de réponse est celui de Google et n'est pas garanti.`,
    },
    {
      q: 'Combien de fois par mois faut-il s\'en occuper ?',
      a: `Un bilan mensuel court suffit une fois la fiche en ordre : indicateurs de performance, avis à traiter, horaires des prochains jours fériés, une ou deux photos récentes. Le plus gros du travail se fait au départ.`,
    },
  ],
  sources: [
    { nom: 'Aide Google Business Profile', url: 'https://support.google.com/business' },
    { nom: 'Google : améliorer son classement local', url: 'https://support.google.com/business/answer/7091' },
    { nom: 'Google : consignes pour représenter son établissement', url: 'https://support.google.com/business/answer/3038177' },
    { nom: 'Google Search Central : règles anti-spam, pages satellites', url: 'https://developers.google.com/search/docs/essentials/spam-policies' },
  ],
  liens: [
    { href: '/services/referencement', nom: 'Référencement naturel', note: 'Le site lui-même, au-delà de la carte' },
    { href: '/outils/audit-site', nom: 'Audit de site gratuit', note: 'Un premier regard sur votre site' },
    { href: '/zones-intervention', nom: 'Zones d\'intervention', note: 'Où travaille Stackup' },
    { href: '/agence-web/tours', nom: 'Agence web à Tours', note: 'Le point de départ du territoire couvert' },
    { href: '/creation-site-internet', nom: 'Création de site internet', note: 'Par métier' },
    { href: '/services/creation-de-site-internet', nom: 'Service de création de site', note: 'Le détail de la prestation' },
    { href: '/tarifs', nom: 'Tarifs', note: 'L\'estimateur de prix' },
    { href: '/contact', nom: 'Contact', note: 'Parler de votre fiche' },
  ],
  maj: '2026-10-29',
  type: 'service',
}
