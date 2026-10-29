import type { Pilier } from './types'

export const PILIER: Pilier = {
  slug: 'referencement',
  chemin: '/services/referencement',
  titre: `Référencement naturel (SEO) : comment être trouvé sur Google quand on est artisan ou commerçant`,
  etiquette: `Service · référencement naturel`,
  reponse: `Le référencement naturel, c'est ce qui fait apparaître votre site dans les résultats de Google sans payer de publicité. Il repose sur un site sain, des pages qui répondent à ce que vos clients cherchent, et une réputation qui se construit lentement : personne ne peut garantir une position ni un délai.`,
  titleSeo: `Référencement naturel SEO : le guide pour artisans et TPE`,
  descriptionSeo: `Comment Google trouve, comprend et classe un site : technique, contenu, liens, local. Pour artisans et commerçants, sans promesse. Faites le point.`,
  sections: [
    {
      id: 'comment-google-fonctionne',
      titre: `Comment Google trouve, comprend et classe un site ?`,
      paragraphes: [
        `Google fonctionne en trois temps. Il explore d'abord le web avec des robots qui suivent les liens de page en page : c'est l'exploration. Il analyse ensuite ce qu'il a trouvé, le texte, les images, les titres, la structure, et range la page dans un immense index : c'est l'indexation. Enfin, quand quelqu'un tape une recherche, il choisit dans cet index les pages qui répondent le mieux et les ordonne : c'est le classement.`,
        `Google ne publie ni la liste complète des signaux de classement ni leurs pondérations ; il explique l'esprit : des contenus utiles, fiables, écrits pour les visiteurs, sur un site qui se charge correctement.`,
        `Un site peut échouer à chacune de ces étapes. Une page bloquée par erreur ne sera jamais explorée. Une page explorée mais quasi vide, ou copiée d'ailleurs, risque de ne pas être retenue dans l'index. Une page indexée mais moins utile que celles des concurrents sera classée plus bas. Quand un plombier me dit « mon site n'apparaît pas », la première question est donc : à quelle étape ça casse ?`,
      ],
      sous: [
        {
          titre: `Les quatre piliers : technique, contenu, popularité, local`,
          paragraphes: [
            `On range le travail de référencement en quatre familles, qui se complètent. Négliger l'une limite l'effet des autres.`,
          ],
          liste: [
            `La technique : le site est accessible aux robots, rapide, lisible sur téléphone, sécurisé, sans pages cassées ni doublons. C'est la fondation.`,
            `Le contenu : chaque page répond clairement à une question réelle de client, avec vos mots de métier, vos réalisations, vos zones d'intervention.`,
            `La popularité : d'autres sites sérieux parlent de vous et pointent vers vous (annuaires de métier, partenaires, presse locale, fournisseurs). C'est un signal de confiance.`,
            `Le local : pour un commerce ou un artisan qui travaille dans un secteur géographique, la fiche d'établissement Google, les avis et la cohérence de vos coordonnées pèsent autant que le site. Cela fait l'objet de la page [référencement local](/services/referencement-local).`,
          ],
        },
      ],
    },
    {
      id: 'mots-cles-intention',
      titre: `Quels mots-clés choisir quand on est artisan ou commerçant ?`,
      paragraphes: [
        `Un mot-clé est simplement la façon dont un client formule son besoin. Le piège est de choisir les mots que vous, vous utilisez. Un électricien parle de « mise en conformité du tableau » ; son client tape « tableau électrique qui disjoncte » ou « électricien près de chez moi ». Partez des questions que les clients posent au téléphone, sur le chantier ou au comptoir.`,
        `Ensuite vient l'intention de recherche, c'est-à-dire ce que la personne veut faire. Une recherche comme « comment purger un radiateur » est informative : la personne veut comprendre, pas forcément appeler. « Chauffagiste Tours dépannage » est transactionnelle : elle veut un professionnel maintenant. « Meilleur boulanger sans gluten » est comparative. Une même page ne peut pas répondre correctement à toutes ces intentions ; c'est pourquoi on prévoit une page par intention.`,
        `Les expressions longues et précises sont vos alliées. Elles sont moins recherchées, mais bien plus proches d'une décision, et la concurrence y est plus faible. « Paysagiste » est un combat perdu d'avance face aux grandes plateformes ; « création d'un jardin de rocaille en terrain en pente » peut être une page que vous méritez de gagner.`,
      ],
    },
    {
      id: 'structure-du-site',
      titre: `Comment structurer un site pour le référencement ?`,
      paragraphes: [
        `La règle de base : une page par intention, pas une page par commune. Un site pensé pour le SEO a une arborescence simple que l'on comprend en un coup d'œil : l'accueil, une page par grande prestation ou par grande catégorie de produits, une page de contact, quelques pages de confiance (présentation, réalisations, questions fréquentes), puis un blog si vous avez de quoi l'alimenter.`,
        `Chaque page de prestation traite un sujet complet : à qui elle s'adresse, ce que vous faites, comment cela se passe, ce qui fait varier le prix, les questions fréquentes, un moyen simple de vous joindre. Elle est liée aux pages voisines par des liens clairs, avec des textes de lien qui disent où l'on va (« refonte de site » plutôt que « cliquez ici »). Ces liens internes aident à la fois le visiteur et les robots à comprendre ce qui est important.`,
        `La tentation, surtout après avoir lu des conseils anciens, est de dupliquer la même page pour trente communes en changeant le nom de la ville. Cela produit des pages quasi identiques, que Google peut considérer comme des pages sans valeur propre. Mieux vaut une page solide « zone d'intervention » qui explique réellement où vous allez et comment vous travaillez, et ne créer une page par ville que lorsque vous avez des choses vraies et différentes à dire : des chantiers réalisés sur place, des spécificités locales, des témoignages réels.`,
      ],
    },
    {
      id: 'balises-donnees-structurees',
      titre: `Balises title, description, titres et données structurées : à quoi servent-elles ?`,
      paragraphes: [
        `La balise title est le titre de la page tel qu'il apparaît dans les résultats de Google. C'est l'élément le plus visible : il doit contenir la requête principale en tête, dire clairement de quoi parle la page et rester assez court pour ne pas être tronqué. Chaque page a son propre title, jamais le même sur tout le site.`,
        `La meta description, sous le titre, ne sert pas directement au classement mais influence le clic : une phrase de vente concrète. Les titres dans la page (h1, h2, h3) structurent le contenu comme les chapitres d'un livre. Il y a un seul h1, qui dit le sujet de la page, puis des h2 pour les grandes parties. Les images reçoivent un texte alternatif qui décrit ce qu'elles montrent : c'est utile aux personnes malvoyantes comme aux moteurs de recherche.`,
        `Les données structurées sont un balisage invisible qui décrit le contenu dans un format que les machines lisent sans ambiguïté : cette page est une entreprise locale, voici ses horaires, son adresse, cette autre page est une liste de questions-réponses. Google les utilise pour comprendre le contenu et, dans certains cas, pour afficher des résultats enrichis. Elles n'apportent aucune garantie d'affichage particulier, mais elles évitent les malentendus. La documentation de Google sur les données structurées indique celles qui sont prises en charge et à quelles conditions.`,
      ],
    },
    {
      id: 'vitesse-core-web-vitals',
      titre: `La vitesse du site compte-t-elle vraiment, et que sont les Core Web Vitals ?`,
      paragraphes: [
        `Oui, mais il faut la remettre à sa place. Google prend en compte l'expérience de la page, et un site très lent fait fuir les visiteurs avant même qu'ils lisent quoi que ce soit. En revanche, un site rapide avec un contenu faible ne sera pas bien classé pour autant : la vitesse départage plus qu'elle ne propulse.`,
        `Les causes de lenteur sont presque toujours les mêmes : photos non redimensionnées, trop d'extensions ou de scripts tiers, hébergement bas de gamme. PageSpeed Insights et le rapport Core Web Vitals de la Search Console permettent de mesurer avant et après. Le mobile passe en premier : Google évalue d'abord la version mobile.`,
        `Les Core Web Vitals sont trois mesures publiées par Google pour qualifier l'expérience réelle. Le LCP mesure le temps d'affichage du plus gros élément visible, souvent l'image principale ; l'objectif indiqué sur web.dev est de rester sous 2,5 secondes. L'INP mesure la réactivité quand on clique ou touche l'écran ; l'objectif est sous 200 millisecondes. Le CLS mesure la stabilité visuelle, c'est-à-dire si la page « saute » pendant le chargement ; l'objectif est de rester sous 0,1.`,
      ],
    },
    {
      id: 'liens-entrants-blog',
      titre: `Liens entrants et blog : que faire de réaliste quand on a peu de temps ?`,
      paragraphes: [
        `Un lien entrant est un lien d'un autre site vers le vôtre : Google y voit une recommandation, et la qualité compte plus que la quantité. Les liens réalistes pour un professionnel local sont ceux qui existent naturellement dans votre activité : l'annuaire de votre fédération ou chambre de métiers, le site de vos fournisseurs ou fabricants qui référencent leurs installateurs, les associations ou clubs que vous soutenez, la presse locale quand vous faites quelque chose de remarquable, les partenaires avec qui vous travaillez sur un chantier. Chacun demande un coup de téléphone ou un e-mail, pas un budget.`,
        `Le blog est utile seulement si vous répondez à de vraies questions de clients, mieux que ce qui existe déjà : comment choisir un matériau, que préparer avant votre venue, ce qui fait varier un devis. Un article précis par mois vaut mieux que dix textes génériques ; un blog laissé à l'abandon dessert plutôt le site.`,
      ],
    },
    {
      id: 'search-console-patience',
      titre: `Search Console, suivi des positions : combien de temps faut-il compter ?`,
      paragraphes: [
        `Google Search Console est l'outil gratuit de Google qui vous dit comment il voit votre site : quelles pages sont indexées, lesquelles posent problème, pour quelles requêtes vous apparaissez, combien de fois on a cliqué. C'est le tableau de bord de référence, et il se configure en quelques minutes en prouvant que vous êtes bien propriétaire du site.`,
        `Le suivi des positions consiste à regarder, mois après mois, si les pages qui comptent progressent sur les requêtes visées. Les positions varient selon la personne, le lieu et le jour : regardez des tendances, pas un chiffre isolé. Ce qui compte, ce sont les appels, les demandes de devis et les visites en magasin.`,
        `Sur la durée, aucun prestataire sérieux ne peut s'engager sur un délai ni sur une place. Les effets d'un travail de référencement se construisent progressivement : Google doit explorer vos modifications, les réévaluer, et comparer votre site à ceux des concurrents, qui bougent aussi. Un site neuf part de plus loin qu'un site ancien, et un site tenu à jour s'en sort mieux qu'un site oublié.`,
      ],
    },
    {
      id: 'erreurs-a-eviter',
      titre: `Quelles erreurs et pratiques à éviter en référencement ?`,
      paragraphes: [
        `Les règles de Google contre le spam sont publiques, et elles visent précisément les raccourcis que certains vendent encore. Voici ce qu'il vaut mieux refuser, même quand une offre paraît séduisante.`,
      ],
      liste: [
        `Le contenu produit en masse : des dizaines de pages générées automatiquement, sans relecture ni apport réel. Google le traite comme du spam quand il est conçu pour manipuler le classement plutôt que pour aider l'utilisateur.`,
        `L'achat de liens ou les échanges de liens organisés à grande échelle : cela viole les consignes de Google et peut entraîner une pénalité. Les liens doivent venir de vraies relations.`,
        `Les faux avis ou les avis achetés sur la fiche Google : en plus d'être trompeur, c'est sanctionnable.`,
        `Bloquer les robots par erreur, par exemple en laissant active l'option « demander aux moteurs de ne pas indexer ce site » après la mise en ligne.`,
      ],
    },
    {
      id: 'visibilite-ia',
      titre: `Comment apparaître dans ChatGPT, Gemini et les réponses générées par l'IA ?`,
      paragraphes: [
        `De plus en plus de personnes posent leurs questions à un assistant plutôt que de parcourir une liste de liens, et Google affiche lui-même des résumés générés en haut de certaines pages de résultats. Ces systèmes s'appuient en grande partie sur ce qui existe déjà sur le web, donc sur des sites bien construits et clairs. Les fondamentaux du référencement restent la meilleure base, et Google indique d'ailleurs, dans sa documentation, que ses bonnes pratiques habituelles s'appliquent à ces fonctionnalités.`,
        `Ce que vous pouvez faire concrètement : rédiger des contenus citables, c'est-à-dire des passages courts et factuels qui répondent directement à une question (prestation, zone, délai indicatif, matériaux, conditions) ; être cohérent d'un endroit à l'autre sur votre nom, votre adresse, vos horaires et vos services ; faciliter la lecture par les machines avec des titres propres et des données structurées ; et être présent sur des sources tierces fiables de votre métier.`,
        `Le fichier llms.txt est une proposition de convention : un petit fichier placé à la racine du site qui résume vos contenus principaux pour les assistants. Aucun grand moteur ne s'est engagé publiquement à s'en servir pour le classement ; il peut être utile à titre de bonne pratique, mais il ne remplace pas un site bien construit. Quant à être cité par un assistant, personne ne peut le garantir : les réponses varient d'une requête à l'autre et d'un service à l'autre.`,
      ],
    },
    {
      id: 'wix-wordpress-et-stackup',
      titre: `Le SEO est-il possible sur Wix ou WordPress, et que fait Stackup ?`,
      paragraphes: [
        `On peut tout à fait bien se référencer sur Wix, WordPress ou un site sur mesure : aucun outil ne garantit ni n'interdit une bonne position. Ce qui change, ce sont les marges de manœuvre.`,
      ],
      sous: [
        {
          titre: `Wix, WordPress et les autres outils`,
          paragraphes: [
            `Sur Wix, les réglages de titres, descriptions, adresses et redirections sont accessibles dans l'interface, ce qui suffit à de nombreux petits sites. Les limites apparaissent sur le contrôle fin de la technique et de la vitesse, car vous dépendez de la plateforme. Sur WordPress, la liberté est plus large, mais chaque extension pèse sur la vitesse et demande des mises à jour. Un site sur mesure donne un contrôle complet du code, mais il demande un investissement de départ et une dépendance à la personne qui l'a conçu. Il n'y a pas de bonne réponse universelle ; le [comparatif Wix, WordPress et sur mesure](/comparatif/wix-wordpress-sur-mesure) détaille ces compromis.`,
          ],
        },
        {
          titre: `Ce que fait Stackup en référencement`,
          paragraphes: [
            `Le travail se déroule en trois temps. D'abord un audit : exploration du site, pages indexées, titres, vitesse, mobile, structure, concurrence locale. Vous pouvez déjà faire un premier tour avec l'[audit de site gratuit](/outils/audit-site). Ensuite la correction : réglages techniques, réécriture des pages importantes, redirections, données structurées, et si besoin de nouvelles pages. Puis le suivi : lecture mensuelle de la Search Console, ajustements, compte rendu en clair. Le suivi se compose dans un abonnement mensuel à partir de {{abo:min}} €, sans engagement.`,
            `Si votre site est à créer ou à refaire, le référencement se prépare dès le départ plutôt qu'en rattrapage : voir la [création de site internet](/services/creation-de-site-internet) et la [refonte](/services/refonte-de-site-internet). Les niveaux et leurs prix figurent en haut de cette page et dans l'[estimateur](/tarifs). Rien ne garantit une position, et nous préférons vous le dire avant plutôt qu'après.`,
          ],
        },
      ],
    },
  ],
  exemples: [
    {
      titre: `Exemple type : un plombier qui n'apparaît que sur son nom`,
      texte: `Un plombier a un site d'une seule page, toutes prestations mélangées. Il apparaît sur son nom, jamais sur « fuite d'eau ». Le travail : une page par prestation, une zone d'intervention claire, une fiche Google vérifiée, puis le suivi dans la Search Console. Rien n'est promis sur le calendrier.`,
    },
    {
      titre: `Exemple type : une boulangère dont le site est lent`,
      texte: `Une boulangère a mis en ligne de grandes photos de ses pains, telles que sorties du téléphone ; l'accueil est lent sur mobile. On redimensionne les images, on retire un widget inutile, on rend le numéro cliquable et on vérifie avant et après dans PageSpeed Insights. L'objectif : une page correcte pour le client dans la rue, pas un score parfait.`,
    },
    {
      titre: `Exemple type : un kiné après une refonte réalisée sans suivi`,
      texte: `Un kinésithérapeute a changé de site et ses visites ont chuté. La Search Console montre des anciennes adresses sans redirection et une mention « ne pas indexer » restée d'une version de test. On corrige l'option, on pose les redirections, on redemande l'exploration. Le retour à la normale dépend de Google, et personne ne peut le chiffrer.`,
    },
  ],
  faq: [
    {
      q: `Quelle différence entre SEO, référencement naturel et référencement payant ?`,
      a: `SEO et référencement naturel désignent la même chose : apparaître dans les résultats sans payer pour chaque clic. Le référencement payant (Google Ads) affiche des annonces payantes au clic, qui disparaissent quand on arrête de payer. Les deux peuvent se compléter.`,
    },
    {
      q: `Combien de temps faut-il pour voir des résultats ?`,
      a: `Personne ne peut le dire honnêtement à l'avance : cela dépend de l'âge du site, de la concurrence dans votre métier et votre secteur, et de la régularité du travail. On mesure plutôt des tendances sur plusieurs mois dans la Search Console.`,
    },
    {
      q: `Dois-je avoir un blog pour être bien référencé ?`,
      a: `Non. Des pages de prestations bien écrites suffisent souvent à démarrer. Un blog devient utile si vous avez régulièrement de vraies réponses à donner à vos clients, et il faut pouvoir l'entretenir.`,
    },
    {
      q: `Faut-il une page pour chaque commune où j'interviens ?`,
      a: `Pas systématiquement. Des pages quasi identiques où seul le nom de la ville change apportent peu. Mieux vaut une page claire sur votre zone d'intervention, et des pages par ville seulement si vous avez des choses vraies et propres à chacune.`,
    },
    {
      q: `Acheter des liens ou des avis pour monter dans Google, est-ce une bonne idée ?`,
      a: `Non. L'achat de liens contrevient aux consignes de Google et peut entraîner une pénalité ; les faux avis sont trompeurs. Les liens et avis qui comptent viennent de vraies relations et de vrais clients.`,
    },
    {
      q: `Que sont les Core Web Vitals et dois-je m'en préoccuper ?`,
      a: `Ce sont trois mesures de Google sur l'expérience de la page : vitesse d'affichage (LCP), réactivité (INP) et stabilité visuelle (CLS). Elles servent surtout à repérer ce qui gêne vos visiteurs, en particulier sur mobile.`,
    },
    {
      q: `Qu'est-ce que la Search Console et est-ce payant ?`,
      a: `C'est un outil gratuit de Google qui montre quelles pages sont indexées, sur quelles requêtes vous apparaissez et quels problèmes sont détectés. Il se configure en prouvant que vous êtes propriétaire du site.`,
    },
    {
      q: `Le fichier llms.txt me fera-t-il citer par ChatGPT ou Gemini ?`,
      a: `Aucun service n'a publiquement promis de s'en servir pour décider de ses réponses. C'est une convention simple qui peut aider, mais un site clair, des contenus factuels et une présence cohérente restent bien plus déterminants.`,
    },
    {
      q: `Mon site Wix ou WordPress peut-il être bien référencé ?`,
      a: `Oui, à condition de soigner les titres, les pages, la vitesse et les redirections. Selon l'outil, vous avez plus ou moins de contrôle sur la technique, mais aucun n'interdit un bon référencement.`,
    },
    {
      q: `Pouvez-vous me garantir la première place sur Google ?`,
      a: `Non, et méfiez-vous de quiconque le fait. Nous travaillons ce qui dépend de nous, votre site, vos contenus et votre suivi, et nous vous disons ce que nous observons, sans promesse de position ni de délai.`,
    },
  ],
  sources: [
    { nom: `Google : documentation Search Central`, url: `https://developers.google.com/search/docs` },
    { nom: `Google : fonctionnement de la recherche (exploration, indexation, classement)`, url: `https://developers.google.com/search/docs/fundamentals/how-search-works` },
    { nom: `Google : règles contre le spam`, url: `https://developers.google.com/search/docs/essentials/spam-policies` },
    { nom: `web.dev : Core Web Vitals`, url: `https://web.dev/articles/vitals` },
  ],
  liens: [
    { href: `/services/referencement-local`, nom: `Référencement local`, note: `Fiche Google, avis, zone d'intervention` },
    { href: `/outils/audit-site`, nom: `Audit de site gratuit`, note: `Un premier état des lieux` },
    { href: `/services/creation-de-site-internet`, nom: `Création de site internet`, note: `Un site pensé pour être trouvé dès le départ` },
    { href: `/services/refonte-de-site-internet`, nom: `Refonte de site internet`, note: `Redirections et structure à préserver` },
    { href: `/comparatif/wix-wordpress-sur-mesure`, nom: `Wix, WordPress ou sur mesure`, note: `Les compromis, sans parti pris` },
    { href: `/tarifs`, nom: `Tarifs et estimateur`, note: `Les niveaux de référencement` },
    { href: `/blog`, nom: `Le blog`, note: `Guides et réponses détaillées` },
    { href: `/contact`, nom: `Contact`, note: `Parler de votre site` },
  ],
  maj: `2026-10-29`,
  type: 'service',
}
