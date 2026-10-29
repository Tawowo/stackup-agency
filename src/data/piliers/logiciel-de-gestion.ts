import type { Pilier } from './types'

export const PILIER: Pilier = {
  slug: 'logiciel-de-gestion',
  chemin: '/services/logiciel-de-gestion',
  titre: 'Logiciel de gestion sur mesure pour artisans, commerçants et TPE',
  etiquette: 'Service · logiciel de gestion',
  reponse: `Un logiciel de gestion sur mesure regroupe au même endroit vos devis, vos factures, votre planning, vos clients et vos rendez-vous, avec les champs et les écrans de votre métier. Il démarre à partir de {{prix:outil}} €, vos données vous appartiennent et vous pouvez voir une démonstration avant de signer.`,
  titleSeo: 'Logiciel de gestion sur mesure pour TPE et artisans',
  descriptionSeo: 'Logiciel de gestion sur mesure : devis, factures, planning, clients, rendez-vous. Vos données vous appartiennent. Démo avant de signer, prix à partir de.',
  sections: [
    {
      id: 'a-quoi-sert-un-logiciel-de-gestion',
      titre: 'À quoi sert un logiciel de gestion pour une petite entreprise ?',
      paragraphes: [
        `Un logiciel de gestion sert à tenir au même endroit ce que vous gardez aujourd'hui dans plusieurs : un carnet pour les rendez-vous, un tableur pour les devis, un classeur pour les factures, une boîte mail pour les échanges avec les clients. Il ne remplace pas votre métier. Il retire les ressaisies, les oublis et les « où est-ce que j'ai mis ça ? ».`,
        `Concrètement, un bon outil de gestion répond à quatre questions du quotidien. Qui sont mes clients et qu'ai-je déjà fait pour eux ? Qu'ai-je prévu cette semaine, et avec qui ? Qu'ai-je facturé, et qu'est-ce qui n'est pas encore payé ? Où en suis-je ce mois-ci ? Si vous devez ouvrir trois fichiers pour répondre, l'outil n'est pas encore là.`,
        `Pas besoin d'être une grande structure. Un plombier, une coiffeuse ou un kinésithérapeute ont les mêmes besoins de fond : retrouver une fiche client en quelques secondes, ne pas laisser un rendez-vous ou une relance filer. Ce qui change d'un métier à l'autre, ce sont les détails, et c'est là que le sur mesure se distingue.`,
      ],
    },
    {
      id: 'excel-et-papier-ne-suffisent-plus',
      titre: 'Excel et papier ne suffisent plus : les signes qui ne trompent pas',
      paragraphes: [
        `Excel et le papier fonctionnent très bien tant que l'activité reste petite et que vous êtes seul à les tenir. Ils cessent de suffire quand l'erreur coûte plus cher que la saisie. Voici les signes que nous voyons le plus souvent chez les artisans, commerçants et TPE.`,
      ],
      liste: [
        `Vous refaites le même devis à la main, avec les mêmes prix, en changeant trois lignes.`,
        `Vous ne savez plus, sans chercher, quel client a payé et lequel doit être relancé.`,
        `Un rendez-vous ou un chantier est noté à deux endroits qui ne disent pas la même chose.`,
        `Plusieurs personnes modifient le même fichier, et la dernière version n'est jamais sûre.`,
        `Vous recopiez le soir ce que vous avez déjà écrit dans la journée.`,
        `Votre comptable vous réclame des factures numérotées proprement, et vous les reconstituez à la main.`,
        `Vous hésitez à prendre un nouveau client parce que vous craignez de ne plus suivre.`,
        `Le jour où l'ordinateur tombe en panne, personne ne sait où est la dernière sauvegarde.`,
      ],
      sous: [
        {
          titre: 'Est-ce qu\'il faut tout remplacer d\'un coup ?',
          paragraphes: [
            `Non. Le plus souvent, un ou deux modules suffisent pour commencer : les devis et factures, ou le planning, ou les rendez-vous. Le reste vient plus tard, si le besoin se confirme. C'est même la façon la plus sûre de procéder : vous voyez l'outil servir avant d'en demander davantage.`,
          ],
        },
      ],
    },
    {
      id: 'logiciel-du-marche-ou-sur-mesure',
      titre: 'Logiciel du marché ou logiciel de gestion sur mesure : comment choisir ?',
      paragraphes: [
        `Il n'y a pas de bonne réponse unique. Un logiciel du marché, en abonnement, convient très bien à beaucoup d'activités. Un outil sur mesure se justifie quand votre façon de travailler ne rentre pas dans les cases d'un produit standard. Voici cinq critères honnêtes pour décider, avec la limite de chaque option.`,
        `Pour une comparaison plus détaillée, avec des outils de devis connus dans le bâtiment, voyez notre [comparatif logiciel du marché et outil sur mesure](/comparatif/obat-tolteck-logiciel-sur-mesure).`,
      ],
      sous: [
        {
          titre: 'Le coût de départ',
          paragraphes: [
            `Un abonnement du marché démarre souvent bas : vous testez, vous vous lancez, vous payez chaque mois. Un outil sur mesure demande un investissement initial plus net, parce qu'il faut le concevoir pour vous. C'est le point faible du sur mesure, et il faut le dire clairement.`,
          ],
        },
        {
          titre: 'L\'abonnement dans la durée',
          paragraphes: [
            `Un abonnement se paie tant que vous l'utilisez, souvent par utilisateur, et les tarifs évoluent selon la politique de l'éditeur. Un outil sur mesure a un coût de départ, puis des frais d'hébergement et de maintenance, qui sont écrits au devis. Sur plusieurs années, le calcul dépend du nombre de personnes qui s'en servent et des modules dont vous avez besoin : faites-le sur votre cas, pas sur une moyenne.`,
          ],
        },
        {
          titre: 'L\'adaptation à votre métier',
          paragraphes: [
            `C'est la vraie raison d'être du sur mesure. Un paysagiste n'a pas les mêmes champs sur un devis qu'une esthéticienne sur une fiche client. Un outil sur mesure reprend vos prestations, vos unités, votre vocabulaire.`,
          ],
        },
        {
          titre: 'La dépendance',
          paragraphes: [
            `Chaque option crée une dépendance, mais pas la même. Avec un logiciel du marché, vous dépendez d'un éditeur : ses prix, ses évolutions, sa survie. Avec un outil sur mesure, vous dépendez de la personne qui l'a fabriqué pour le faire évoluer et le maintenir. C'est un risque réel, surtout avec une agence d'une seule personne comme la nôtre : nous le détaillons plus bas, dans les limites.`,
          ],
        },
        {
          titre: 'L\'export des données',
          paragraphes: [
            `Posez la question à n'importe quel fournisseur : puis-je récupérer toutes mes données, dans un format utilisable, quand je veux ? Avec un outil de Stackup, l'export est inclus dans le socle. Pour un logiciel du marché, la réponse varie : lisez les conditions avant de vous engager, et testez l'export pendant la période d'essai.`,
          ],
        },
      ],
    },
    {
      id: 'quels-modules-pour-quel-besoin',
      titre: 'Quels modules pour un outil de gestion : devis, planning, clients, rendez-vous, stock, caisse ?',
      paragraphes: [
        `Un outil de gestion Stackup se compose d'un socle (connexion sécurisée, base de données, tableau de bord, export de vos données) auquel on ajoute des modules, un par un. Voici ceux dont les artisans, commerçants et TPE ont le plus souvent besoin. Chacun a sa [fiche détaillée dans les solutions](/solutions).`,
      ],
      sous: [
        {
          titre: 'Devis et factures',
          paragraphes: [
            `C'est le cœur de l'outil. Vous créez vos devis à partir de votre catalogue de prestations, vous transformez en facture ce qui est accepté, vous suivez les paiements et vous relancez ce qui est en retard. La numérotation est automatique, les avoirs sont gérés. Un export pour votre comptable est disponible en option. Pour préparer un devis sans outil, vous pouvez aussi partir de notre [modèle de devis](/outils/modele-devis).`,
          ],
        },
        {
          titre: 'Planning de chantiers et d\'équipe',
          paragraphes: [
            `Le planning se construit par jour, semaine ou mois, et se consulte depuis un téléphone. L'outil détecte les conflits d'horaires : deux personnes prévues au même endroit, ou personne. Il peut être lié aux chantiers ou aux rendez-vous. Les demandes de congés, les échanges de créneaux et les feuilles de temps sont des modules à part, que vous ajoutez si vous en avez l'usage. Voyez la [fiche planning des employés](/solutions/planning-employes).`,
          ],
        },
        {
          titre: 'Fiches clients',
          paragraphes: [
            `Fiches clients et contacts, historique des échanges, notes, relances à faire avec rappel. Les fiches sont celles de votre métier : un coiffeur y note ses colorations, un paysagiste l'adresse du chantier et les accès. Elles sont reliées aux devis et aux factures, donc vous voyez d'un coup d'œil ce qu'un client a commandé et payé.`,
          ],
        },
        {
          titre: 'Rendez-vous et rappels',
          paragraphes: [
            `Vos clients réservent un créneau en ligne, à toute heure, sans que vous décrochiez. Les durées s'adaptent à vos prestations, vos congés bloquent les créneaux, et un rappel automatique peut être envoyé avant le rendez-vous grâce au module d'automatisations. Pour les restaurants, un module de réservation gère les tables, les services et le nombre de couverts.`,
          ],
        },
        {
          titre: 'Stock, caisse et suivi du temps',
          paragraphes: [
            `Le module de stocks suit les entrées, les sorties et alerte quand un article passe sous son seuil. La caisse s'intègre à l'outil pour que produits, prix et clients soient les mêmes partout. Attention : un logiciel de caisse doit respecter des règles précises de conformité fiscale. Nous l'examinons avec vous avant tout devis, et nous ne promettons rien sans l'avoir vérifié. Le suivi du temps passe par les feuilles de temps et le pointage, modules à part.`,
          ],
        },
      ],
    },
    {
      id: 'donnees-et-propriete',
      titre: 'Mes données m\'appartiennent-elles ? Propriété et export',
      paragraphes: [
        `Oui. Vos clients, vos devis, vos factures et vos plannings sont à vous. L'export de vos données fait partie du socle de l'outil : vous pouvez les récupérer à tout moment, sans nous demander la permission ni payer pour cela. Le code de l'outil est cédé selon les conditions écrites au devis.`,
        `À l'entrée aussi : l'option d'import de vos données existantes reprend vos fichiers Excel ou ceux d'un ancien logiciel au démarrage.`,
        `Côté protection des données personnelles, vos clients sont des personnes : leurs coordonnées relèvent du règlement général sur la protection des données. Les principes à connaître (ne collecter que le nécessaire, informer, pouvoir supprimer) sont présentés sur le site de la CNIL. Nous construisons l'outil pour que vous puissiez les respecter, mais la responsabilité de traitement reste la vôtre.`,
      ],
    },
    {
      id: 'facture-electronique-et-conformite',
      titre: 'Facture électronique : un outil sur mesure sera-t-il conforme ?',
      paragraphes: [
        `La réforme de la facturation électronique est prévue en France par étapes, sur 2026-2027, avec des obligations qui varient selon la taille de l'entreprise (réception d'abord, émission ensuite). Le calendrier a déjà été décalé une fois : vérifiez toujours la situation à jour sur le site de l'administration fiscale et sur service-public.fr avant de décider quoi que ce soit.`,
        `Pour un outil de gestion, l'enjeu est simple : émettre et recevoir des factures dans les formats prévus, en passant par une plateforme agréée. Un module de facturation électronique conforme est prévu au catalogue pour cela. Nous ne fabriquons pas la plateforme elle-même : l'outil s'y connecte.`,
        `Si vous voulez comprendre où vous en êtes avant de choisir un outil, lisez notre page sur la [facture électronique](/services/facture-electronique). Elle explique ce qui vous concerne selon votre situation, et ce qu'il faut vérifier sur les sites officiels.`,
      ],
    },
    {
      id: 'connexion-au-site-formation-evolution',
      titre: 'Connexion au site, prise en main et évolution progressive',
      paragraphes: [
        `Un outil de gestion n'est pas isolé de votre site internet. Plusieurs modules, comme la prise de rendez-vous, la réservation ou le Click et Collect, peuvent être reliés à votre site : le client réserve ou commande depuis votre page, et la demande arrive directement dans votre outil, sans ressaisie. Cette liaison est une option, pas une obligation : l'outil fonctionne très bien sans site.`,
        `La prise en main se prépare avec vous. Un outil que personne n'ose ouvrir ne sert à rien. L'interface est pensée pour des gens qui n'ont pas le temps de lire une notice, et nous passons ensemble sur les écrans que vous utiliserez tous les jours. Ce qui est compris dans l'accompagnement est écrit au devis, pour que rien ne soit flou.`,
        `Enfin, l'outil grandit avec vous. On commence par un module, on le fait vivre, puis on en ajoute un autre quand le besoin se confirme : les rendez-vous après les devis, le stock après la caisse. Certaines automatisations simples (rappels, relances) peuvent s'y ajouter ; pour savoir ce qui est raisonnable, lisez notre page [IA et automatisation](/services/ia-et-automatisation).`,
      ],
    },
    {
      id: 'combien-coute-un-logiciel-de-gestion-sur-mesure',
      titre: 'Combien coûte un logiciel de gestion sur mesure ?',
      paragraphes: [
        `Un outil de gestion Stackup démarre à partir de {{prix:outil}} €. Ce prix couvre le socle (connexion sécurisée, base de données, tableau de bord, export de vos données) et le premier module. C'est un prix de départ, pas un tarif fixe : le montant définitif dépend de ce que vous choisissez.`,
        `Le [simulateur de la page tarifs](/tarifs) vous donne une estimation en quelques minutes, et le devis écrit fixe le montant avant que vous vous engagiez. Voici ce qui fait varier le prix, sans chiffrer ce qui ne peut pas l'être honnêtement à l'avance.`,
      ],
      liste: [
        `Le nombre de modules : devis et factures seuls, ou avec planning, clients, rendez-vous, stock.`,
        `Le nombre d'utilisateurs et les droits à régler : chacun voit-il tout, ou seulement ses propres informations ?`,
        `La reprise de vos données existantes : un fichier propre se reprend vite, trois fichiers contradictoires demandent plus de travail.`,
        `Les liaisons avec d'autres services : votre site, un calendrier externe, une plateforme de facturation, un moyen de paiement.`,
        `La part de sur-mesure dans les écrans et les règles : un devis avec des calculs propres à votre métier demande plus de conception qu'un devis standard.`,
        `Les contraintes de conformité : une caisse ou une facturation électronique se traitent avec plus de rigueur qu'un simple planning.`,
      ],
      sous: [
        {
          titre: 'Et après la mise en route ?',
          paragraphes: [
            `Un outil en ligne a des coûts qui continuent : hébergement, maintenance, éventuels services tiers (envoi de messages, paiement). Ils sont écrits au devis, pour que vous sachiez ce que vous payez avant de signer. Les services tiers facturés à l'usage sont refacturés, et le devis le précise.`,
          ],
        },
      ],
    },
    {
      id: 'comment-on-demarre',
      titre: 'Comment démarre-t-on un projet de logiciel de gestion ?',
      paragraphes: [
        `On commence par parler de votre quotidien, pas de technique. Quelles tâches vous font perdre du temps, quels documents vous manipulez, qui s'en sert. Ce premier échange permet de dire honnêtement si un logiciel du marché vous suffit : si c'est le cas, nous vous le dirons.`,
        `Ensuite, vous pouvez voir avant de signer. La démonstration du logiciel de gestion de Stackup est en ligne et se teste librement. Pour votre activité, une démonstration de votre propre outil peut être préparée avant le devis : c'est une prestation à part, à {{carte:demo}} €, facturée et non déduite du devis. Une visio de cadrage est aussi possible, à {{carte:visio}} €, avec le même principe.`,
        `Le devis écrit liste les modules, les conditions de cession des données et du code, l'hébergement et la maintenance. Le calendrier se fixe ensemble avant de commencer, en fonction de ce qui est choisi : nous ne promettons pas de durée avant de connaître votre besoin. Voyez nos [réalisations](/realisations), pour l'instant des démos, ou [écrivez-nous](/contact).`,
      ],
    },
    {
      id: 'limites-d-un-outil-sur-mesure',
      titre: 'Quelles sont les limites d\'un outil sur mesure ?',
      paragraphes: [
        `Un outil sur mesure n'est pas une solution magique. Voici les limites à connaître avant de vous décider.`,
        `Il se maintient. Un logiciel n'est jamais terminé : les navigateurs évoluent, les règles aussi (la facturation électronique en est l'exemple), et des corrections seront nécessaires. Prévoyez une maintenance, et sachez qui la fait. Chez Stackup, c'est une personne, Mathéo Reboul. C'est un avantage (vous parlez à celui qui a fabriqué l'outil) et un risque (une agence d'une seule personne n'a pas de remplaçant). C'est pour cela que les données sont exportables et que la cession du code est écrite au devis : vous n'êtes jamais prisonnier.`,
        `Il coûte plus cher au départ qu'un abonnement. Si votre activité est simple et qu'un logiciel standard fait le travail, c'est lui qu'il faut prendre.`,
        `Il ne remplace pas votre comptable ni vos obligations légales. Il vous aide à tenir vos documents proprement. Les règles comptables, fiscales ou de conformité de la caisse restent à vérifier auprès des sources officielles et de votre expert-comptable.`,
      ],
    },
  ],
  exemples: [
    {
      titre: 'Exemple type : un plombier seul avec un apprenti',
      texte: `Exemple type, fictif. Un plombier fait ses devis dans un tableur, ses factures dans un autre, et note ses interventions dans un carnet. Il commence par le module devis et factures : catalogue de prestations, devis envoyés au client, suivi des paiements. Quelques mois plus tard, il ajoute le planning pour répartir les interventions entre lui et son apprenti.`,
    },
    {
      titre: 'Exemple type : un salon de coiffure de trois personnes',
      texte: `Exemple type, fictif. Une gérante prend ses rendez-vous au téléphone et dans un agenda papier, ce qui coûte du temps pendant les coupes. Elle met en place la prise de rendez-vous en ligne, avec un agenda par collaboratrice et des durées adaptées à chaque prestation. Les fiches clients gardent les notes de couleur, et un rappel est envoyé avant chaque rendez-vous. Le programme de fidélité vient plus tard, une fois l'agenda bien rodé.`,
    },
    {
      titre: 'Exemple type : une cave avec boutique et dégustations',
      texte: `Exemple type, fictif. Un caviste suit son stock dans un fichier que personne ne met à jour. Il choisit le module de stocks avec alerte de seuil, relié à une caisse. Les clients réguliers sont dans des fiches clients, pour retrouver ce qu'ils ont aimé. Comme la caisse relève de règles de conformité précises, ce module est regardé avec lui avant le devis, et rien n'est promis sans vérification.`,
    },
  ],
  faq: [
    {
      q: 'Qu\'est-ce qu\'un logiciel de gestion sur mesure ?',
      a: `C'est un outil en ligne fabriqué pour votre activité : vos prestations, vos champs, vos documents. Il regroupe selon vos besoins les devis, factures, planning, clients et rendez-vous, au lieu de vous faire entrer dans les cases d'un produit standard.`,
    },
    {
      q: 'Quelle est la différence avec un logiciel de devis et facturation du marché ?',
      a: `Un logiciel du marché est prêt à l'emploi, en abonnement, mais standard. Un outil sur mesure suit votre métier, mais coûte plus au départ et se maintient avec un prestataire. Le [comparatif](/comparatif/obat-tolteck-logiciel-sur-mesure) détaille les deux options.`,
    },
    {
      q: 'Combien coûte un logiciel de gestion sur mesure ?',
      a: `Un outil démarre à partir de {{prix:outil}} € avec le socle et le premier module. Le devis écrit le fixe avant l'engagement.`,
    },
    {
      q: 'Puis-je voir l\'outil avant de signer ?',
      a: `Oui. La démonstration du logiciel de gestion de Stackup est en ligne. Une démonstration de votre propre outil peut être préparée avant le devis, à {{carte:demo}} €, prestation à part non déduite du devis.`,
    },
    {
      q: 'Mes données m\'appartiennent-elles, et puis-je les exporter ?',
      a: `Oui. L'export de vos données fait partie du socle et reste possible à tout moment. Le code est cédé selon les conditions écrites au devis.`,
    },
    {
      q: 'L\'outil sera-t-il prêt pour la facture électronique ?',
      a: `Un module de facturation électronique conforme existe au catalogue, via une plateforme agréée. Le calendrier de la réforme étant échelonné et déjà modifié, vérifiez-le sur les sites officiels. Voyez aussi notre page sur la [facture électronique](/services/facture-electronique).`,
    },
    {
      q: 'Peut-on commencer petit puis ajouter des modules ?',
      a: `Oui, c'est même conseillé. On démarre avec le socle et un module, par exemple les devis et factures, puis on ajoute le planning, le stock ou les rendez-vous quand le besoin se confirme.`,
    },
    {
      q: 'Que se passe-t-il si vous ne pouvez plus assurer la maintenance ?',
      a: `C'est le risque d'une agence d'une seule personne, et nous préférons le dire. Vos données restent exportables à tout moment et la cession du code est prévue au devis : un autre prestataire peut reprendre l'outil.`,
    },
    {
      q: 'Un outil de gestion peut-il être relié à mon site internet ?',
      a: `Oui, en option : la prise de rendez-vous, la réservation ou le Click et Collect peuvent être reliés à votre site, et les demandes arrivent directement dans l'outil. Voyez les [solutions](/solutions) pour chaque module.`,
    },
  ],
  sources: [
    { nom: 'Entreprendre.Service-Public.fr : la facturation électronique', url: 'https://entreprendre.service-public.fr' },
    { nom: 'impots.gouv.fr : facturation électronique', url: 'https://www.impots.gouv.fr' },
    { nom: 'CNIL : les règles à respecter pour vos fichiers clients', url: 'https://www.cnil.fr' },
  ],
  liens: [
    { href: '/solutions', nom: 'Toutes les solutions' },
    { href: '/solutions/planning-employes', nom: 'Planning des employés' },
    { href: '/comparatif/obat-tolteck-logiciel-sur-mesure', nom: 'Logiciel du marché ou sur mesure' },
    { href: '/outils/modele-devis', nom: 'Modèle de devis' },
    { href: '/services/facture-electronique', nom: 'Facture électronique' },
    { href: '/services/ia-et-automatisation', nom: 'IA et automatisation' },
    { href: '/tarifs', nom: 'Tarifs et simulateur' },
    { href: '/realisations', nom: 'Réalisations' },
    { href: '/contact', nom: 'Nous contacter' },
  ],
  maj: '2026-10-30',
  type: 'service',
}
