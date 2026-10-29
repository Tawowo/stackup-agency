import type { Pilier } from './types'

export const PILIER: Pilier = {
  slug: 'refonte-de-site-internet',
  chemin: '/services/refonte-de-site-internet',
  titre: `Refonte de site internet : refaire son site sans perdre ses visiteurs`,
  etiquette: `Service · refonte de site`,
  reponse: `Refaire son site internet consiste à reconstruire ce qui ne fonctionne plus (vitesse, mobile, modification, sécurité) tout en gardant ce qui a de la valeur : vos textes utiles, vos adresses web et votre place dans Google. Chez Stackup, la refonte de site vitrine démarre « à partir de » {{prix:une-page}} € pour une page et « à partir de » {{prix:multi-pages}} € pour un site de plusieurs pages, avec une démo à voir avant de vous engager.`,
  titleSeo: `Refonte de site internet : devis et méthode sans perte SEO`,
  descriptionSeo: `Refaire son site sans perdre votre référencement : signes, prix « à partir de », migration Wix ou WordPress, démo avant de signer. Demandez un devis.`,
  sections: [
    {
      id: 'signes-site-a-refaire',
      titre: `Quels sont les signes qu'un site internet est à refaire ?`,
      paragraphes: [
        `Un site est à refaire quand il vous coûte des clients ou du temps, et que le corriger morceau par morceau coûterait plus cher que de repartir sur une base saine. Six signes reviennent presque toujours chez les artisans, commerçants et professions libérales qui nous contactent.`,
        `Deux ou trois de ces signes qui se cumulent indiquent que le problème est dans les fondations, pas dans un détail.`,
      ],
      sous: [
        {
          titre: `Le site est lent`,
          paragraphes: [
            `Un visiteur qui attend devant une page blanche repart, surtout sur un téléphone en 4G dans une camionnette ou une cuisine. Les causes classiques : images de plusieurs mégaoctets posées telles quelles, dizaines d'extensions empilées, hébergement saturé. Google publie ses critères de performance sur [web.dev](https://web.dev) ; vous pouvez aussi lancer notre [audit de site](/outils/audit-site) pour voir où ça coince.`,
          ],
        },
        {
          titre: `Le site n'est pas adapté au mobile`,
          paragraphes: [
            `Si vous devez pincer l'écran pour lire un numéro de téléphone ou si le menu déborde, le site a été pensé avant l'ère du smartphone. Pour un plombier, un coiffeur ou un restaurateur, la majorité des visites se font sur mobile : un bouton « Appeler » invisible, c'est un appel perdu.`,
          ],
        },
        {
          titre: `Le site est introuvable sur Google`,
          paragraphes: [
            `Votre nom d'entreprise ne ressort même pas en première position, ou vos prestations n'apparaissent sur aucune requête locale. Ce n'est pas toujours la faute du site : la fiche Google, les avis et la concurrence comptent. Mais un site sans titres clairs, sans pages par prestation et sans structure lisible par les moteurs ne peut pas se placer. Le [référencement](/services/referencement) se construit sur une bonne base technique.`,
          ],
        },
        {
          titre: `Impossible de le modifier vous-même ou sans appeler quelqu'un`,
          paragraphes: [
            `Changer un horaire, ajouter une photo de chantier ou retirer un tarif périmé ne devrait pas prendre une semaine ni une facture. Si chaque modification passe par un prestataire qui répond quand il peut, votre site vieillit plus vite que votre activité.`,
          ],
        },
        {
          titre: `Le site a été piraté ou affiche des alertes de sécurité`,
          paragraphes: [
            `Des pages que vous n'avez pas écrites, des redirections vers d'autres sites, un avertissement du navigateur : le site a été compromis. On nettoie et on sécurise d'abord, puis on décide si la base mérite d'être gardée.`,
          ],
        },
        {
          titre: `Le prestataire a disparu`,
          paragraphes: [
            `Plus de réponse, plus d'accès, personne ne sait où est hébergé le site. C'est un cas courant et récupérable : voyez plus bas la section sur les accès et le nom de domaine. Le risque n'est pas que le site tombe demain, c'est que vous ne puissiez plus rien en faire le jour où il le faudra.`,
          ],
        },
      ],
    },
    {
      id: 'refaire-ou-corriger',
      titre: `Faut-il refaire son site internet ou le corriger ?`,
      paragraphes: [
        `Corrigez quand le problème est localisé et que la base est saine ; refaites quand le problème est partout. Un site correct dans sa structure mais avec des photos lourdes se répare en une intervention. Un site bâti sur un thème abandonné, avec des pages impossibles à adapter au mobile, se répare à l'infini sans jamais devenir bon.`,
        `Posez-vous trois questions. Pouvez-vous modifier un texte sans aide ? Le site s'affiche-t-il correctement sur votre téléphone ? Les outils qui le font tourner sont-ils encore maintenus par leurs éditeurs ? Trois « oui » : corrigez. Deux « non » ou plus : une refonte vous coûtera moins cher à moyen terme que des rustines.`,
        `Un critère compte souvent plus que la technique : l'activité a-t-elle changé ? Un artisan qui a ajouté un métier ou un cabinet qui a déménagé n'a plus besoin du site d'il y a quelques années, même s'il fonctionne encore.`,
        `Nous vous disons franchement quand la correction suffit. Un échange en visio ({{carte:visio}} €, prestation à part) permet de trancher à partir de votre site réel.`,
      ],
    },
    {
      id: 'ce-quon-conserve',
      titre: `Que conserver quand on refait son site ?`,
      paragraphes: [
        `Une refonte n'est pas une table rase. On garde tout ce qui a de la valeur, on reconstruit le reste. Avant de dessiner quoi que ce soit, on fait l'inventaire de l'existant, page par page.`,
      ],
      liste: [
        `Les textes utiles : présentation de l'activité, descriptions de prestations, zone d'intervention, réponses aux questions que vos clients posent vraiment. On les relit, on les resserre, on ne les jette pas par principe.`,
        `Les adresses web qui reçoivent des visites ou des liens d'autres sites : on les conserve à l'identique ou on les redirige proprement.`,
        `L'historique : articles, actualités, réalisations passées. Une page qui a quelques années d'ancienneté et reçoit des visites a de la valeur pour Google.`,
        `Les photos que vous avez prises vous-même (chantiers, plats, vitrines, équipe) : elles valent mieux que n'importe quelle banque d'images. On les recompresse sans les dénaturer.`,
        `Le nom de domaine, les adresses e-mail liées et la fiche Google : ils ne dépendent pas du site, et on évite d'y toucher sans nécessité.`,
      ],
      sous: [
        {
          titre: `Ce qu'on retire sans regret`,
          paragraphes: [
            `Les pages vides ou en doublon, les tarifs périmés, les mentions d'un ancien numéro, les extensions inutilisées, les images qui n'apportent rien. Un site plus court mais à jour convainc davantage qu'un site long et daté.`,
          ],
        },
      ],
    },
    {
      id: 'referencement-refonte',
      titre: `Comment refaire son site sans perdre son référencement ?`,
      paragraphes: [
        `En préparant la migration avant de toucher au site : on liste les adresses existantes, on décide du sort de chacune, on met en place des redirections 301 et on suit Google avant et après la mise en ligne. Une refonte sans cette préparation fait souvent perdre des positions que l'ancien site avait mis des années à gagner.`,
        `Le principe est simple : Google a mémorisé vos adresses. Si une adresse disparaît sans redirection, le visiteur arrive sur une erreur et le moteur finit par retirer la page de ses résultats. La documentation officielle de Google sur le [déménagement d'un site](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) décrit cette logique.`,
      ],
      sous: [
        {
          titre: `1. L'inventaire des adresses (URL)`,
          paragraphes: [
            `On exporte la liste de toutes les pages existantes et on y croise les données de la Search Console : lesquelles reçoivent des clics, lesquelles sont citées ailleurs. Chaque ligne reçoit une décision : conserver, fusionner, rediriger ou supprimer.`,
          ],
        },
        {
          titre: `2. Les redirections 301`,
          paragraphes: [
            `Une redirection 301 dit à Google et aux visiteurs : « cette page a définitivement déménagé ici ». On redirige chaque ancienne adresse vers la page la plus proche par le sujet, pas toutes vers l'accueil. Rediriger en bloc vers la page d'accueil est une erreur fréquente, car Google la traite comme une page introuvable déguisée.`,
          ],
        },
        {
          titre: `3. Les balises et la structure`,
          paragraphes: [
            `Titres de page, descriptions, titres de niveau 1 et 2, textes alternatifs des images : on reprend ceux qui fonctionnent, on améliore les autres. Pour un artisan, cela veut dire une page par métier et par zone, avec un titre qui reprend les mots de ses clients.`,
          ],
        },
        {
          titre: `4. La Search Console avant et après`,
          paragraphes: [
            `Avant la mise en ligne, on relève les pages qui reçoivent du trafic et les requêtes qui les amènent. Après, on soumet le nouveau plan du site, on vérifie les erreurs d'exploration et on compare. Les délais de prise en compte par Google ne se commandent pas : quelques fluctuations passagères sont normales, une chute durable signale un oubli à corriger vite.`,
          ],
        },
      ],
    },
    {
      id: 'migrer-depuis-wix-wordpress',
      titre: `Comment migrer son site depuis Wix, Jimdo, Squarespace ou WordPress ?`,
      paragraphes: [
        `On peut quitter ces plateformes sans repartir de zéro : les textes et les images se récupèrent, les adresses se redirigent, et le nom de domaine se transfère ou se redirige vers le nouvel hébergement. La difficulté n'est pas l'export, c'est de ne rien casser pendant la bascule.`,
        `Chaque solution a ses particularités. Pour une comparaison de fond entre les approches, lisez notre [comparatif Wix, WordPress et site sur mesure](/comparatif/wix-wordpress-sur-mesure), qui présente aussi les limites d'un site sur mesure.`,
      ],
      sous: [
        {
          titre: `Depuis Wix`,
          paragraphes: [
            `Le site ne s'exporte pas comme un fichier réutilisable : la mise en page est propre à la plateforme. On récupère donc textes et visuels, on reconstruit les pages, et on soigne les redirections, car les adresses Wix suivent leur propre logique. Si votre domaine est géré chez Wix, on le transfère ou on pointe ses réglages vers le nouveau site au moment choisi.`,
          ],
        },
        {
          titre: `Depuis Jimdo ou Squarespace`,
          paragraphes: [
            `Les contenus sont récupérables, parfois en partie par un export de la plateforme, mais la mise en page ne suit pas. On reprend les textes et les images, on reconstruit une structure adaptée à votre activité, et on n'oublie pas l'inventaire des adresses, même sur un petit site.`,
          ],
        },
        {
          titre: `Depuis WordPress`,
          paragraphes: [
            `C'est le cas où l'on conserve le plus : base de contenus, articles, médias. Selon l'état du site, on peut reprendre l'existant, ou reconstruire en reprenant les contenus. Si le thème et les extensions ne sont plus maintenus, mieux vaut en sortir que de repousser le problème. Dans tous les cas, on sauvegarde l'ensemble avant d'y toucher.`,
          ],
        },
      ],
    },
    {
      id: 'acces-nom-de-domaine',
      titre: `Comment récupérer ses accès et son nom de domaine ?`,
      paragraphes: [
        `Le nom de domaine vous appartient s'il est enregistré à votre nom : retrouvez le registrar (la société où il est enregistré) via l'annuaire public des noms de domaine, puis reprenez la main avec l'adresse e-mail du titulaire. Si le prestataire l'a enregistré à son nom, demandez-lui par écrit le transfert ; c'est votre droit de savoir qui est titulaire de votre adresse.`,
        `Voici l'ordre dans lequel nous procédons quand un prestataire a disparu ou ne répond plus.`,
      ],
      liste: [
        `Identifier le titulaire du nom de domaine et son registrar, à partir des informations publiques et de vos anciennes factures.`,
        `Retrouver l'adresse e-mail rattachée au compte : une récupération de mot de passe suffit souvent à rouvrir l'accès.`,
        `Demander le code de transfert au titulaire, ou le faire demander par vous si le domaine est à votre nom.`,
        `Repérer où le site est hébergé et qui en paie la facture, pour ne pas couper l'ancien site avant que le nouveau soit prêt.`,
        `Récupérer les accès à la Search Console, à la fiche Google et aux outils de statistiques. Si vous n'en êtes pas propriétaire, on en recrée un neuf à votre nom.`,
        `Noter tout cela dans un document que vous gardez : pour la suite, le site doit pouvoir changer de prestataire sans drame.`,
      ],
    },
    {
      id: 'deroule-projet-refonte',
      titre: `Comment se déroule un projet de refonte de site ?`,
      paragraphes: [
        `Un projet de refonte suit un enchaînement simple : diagnostic de l'existant, démo à voir avant de s'engager, construction, recette, bascule, suivi. Le calendrier se fixe ensemble avant de commencer, en fonction de la taille du site et de votre disponibilité pour relire les contenus.`,
        `Plus tôt vous préparez votre [cahier des charges](/ressources/cahier-des-charges), même court, moins il y a d'allers-retours.`,
      ],
      liste: [
        `Diagnostic : on regarde le site actuel, ses visites, ses points faibles et ce qu'il faut absolument garder.`,
        `Démo : avant la signature, vous voyez à quoi ressemblerait votre site. La démo est une prestation à part ({{carte:demo}} €), facturée, et n'est pas déduite du devis.`,
        `Devis : il détaille ce qui est inclus et ce qui ferait varier le prix. Aucun montant n'est modifié en cours de route sans votre accord.`,
        `Construction : maquette, intégration des contenus, réglages de vitesse et de référencement, formulaire de contact, mentions légales.`,
        `Recette : vous parcourez le site sur ordinateur et sur téléphone, et vous signalez ce qui manque ou déplaît ; nous corrigeons.`,
        `Bascule : redirections en place, nom de domaine pointé vers le nouveau site, Search Console vérifiée. L'ancien site n'est coupé qu'une fois la bascule contrôlée.`,
        `Suivi : relevé des positions et des erreurs après la mise en ligne, puis ajustements.`,
      ],
    },
    {
      id: 'prix-refonte',
      titre: `Combien coûte la refonte d'un site internet ?`,
      paragraphes: [
        `La refonte d'un site vitrine démarre « à partir de » {{prix:une-page}} € pour un site d'une page, et « à partir de » {{prix:multi-pages}} € pour un site de plusieurs pages. Ce sont des prix de départ : le montant exact dépend de ce que contient votre site, ce que vous calculez vous-même avec l'[estimateur de prix](/tarifs).`,
        `Si vous cherchez une refonte « pas chère » : un site refait au rabais, sans redirections ni vérifications, peut faire perdre en trafic bien plus que l'économie réalisée. Notre approche : un prix de départ clair, et la liste de ce qui le fait bouger.`,
      ],
      sous: [
        {
          titre: `Ce qui fait varier le prix`,
          paragraphes: [
            `Plusieurs éléments pèsent sur le devis, sans que nous les chiffrions ici puisque tout dépend de votre cas.`,
          ],
          liste: [
            `Le nombre de pages à reconstruire et la part de contenus à réécrire plutôt qu'à reprendre.`,
            `Le nombre d'adresses à rediriger et l'ancienneté du site, donc la quantité de référencement à préserver.`,
            `La plateforme d'origine et la difficulté à en récupérer les contenus.`,
            `Les fonctions demandées : formulaire, prise de rendez-vous, galerie, boutique, espace client. Pour une boutique, voyez la page [site e-commerce](/services/site-ecommerce).`,
            `Les photos : reprendre les vôtres coûte moins que d'organiser une séance dédiée.`,
            `La maintenance choisie ensuite, présentée plus bas.`,
          ],
        },
        {
          titre: `Refonte ou création : quelle différence ?`,
          paragraphes: [
            `Une refonte ajoute le travail de reprise et de migration, mais protège ce qui existe. Sans visite ni contenu à sauver, une [création de site](/services/creation-de-site-internet) est plus simple.`,
          ],
        },
      ],
    },
    {
      id: 'erreurs-refonte',
      titre: `Quelles sont les erreurs fréquentes d'une refonte ?`,
      paragraphes: [
        `Les erreurs de refonte sont presque toujours des oublis de préparation, pas des défauts de conception. Voici celles que nous voyons le plus souvent, et la parade pour chacune.`,
      ],
      liste: [
        `Oublier les redirections : l'ancien lien mène à une erreur, Google le retire. Parade : inventaire et redirections 301 avant la mise en ligne.`,
        `Tout rediriger vers l'accueil : le visiteur ne retrouve pas sa page. Parade : une redirection vers la page équivalente.`,
        `Changer le nom de domaine sans nécessité : on repart de zéro côté confiance. Parade : garder le domaine sauf raison solide.`,
        `Ne pas être titulaire de son domaine ou de son hébergement. Parade : tout mettre à votre nom, avec un document d'accès.`,
        `Refaire le design sans refaire les textes : un site neuf qui répète de vieilles phrases n'apporte pas plus de clients. Parade : relire les contenus avant de dessiner.`,
        `Couper l'ancien site trop tôt. Parade : le garder joignable jusqu'à validation de la bascule.`,
        `Ne rien mesurer après. Parade : un relevé avant et après dans la Search Console.`,
      ],
    },
    {
      id: 'apres-la-refonte',
      titre: `Que faire après la refonte : suivi et maintenance ?`,
      paragraphes: [
        `Un site refait n'est pas fini le jour de sa mise en ligne : il faut surveiller son référencement les premières semaines, puis le garder à jour. Sans entretien, les mêmes problèmes (lenteur, sécurité, contenus périmés) reviennent.`,
        `Le suivi après mise en ligne consiste à vérifier les erreurs d'exploration, contrôler que les redirections font bien leur travail et ajuster les titres des pages qui ont perdu des positions. La [maintenance](/services/maintenance) prend ensuite le relais : sauvegardes, mises à jour, petites modifications de contenu, surveillance. Le [référencement](/services/referencement) se poursuit avec de nouvelles pages et vos avis clients.`,
        `Un restaurant qui change sa carte chaque saison n'a pas les mêmes besoins qu'un électricien dont les prestations bougent peu. Pour définir les vôtres, [contactez-nous](/contact).`,
      ],
    },
  ],
  exemples: [
    {
      titre: `Exemple type : un plombier avec un site Wix qui n'apporte plus d'appels`,
      texte: `Les pages sont lentes sur téléphone, le numéro n'est pas cliquable et aucune page ne parle de dépannage. Après inventaire, on conserve ses textes de présentation, on crée une page par prestation et par commune desservie, on rend le téléphone cliquable partout et on redirige les anciennes adresses. Cas fictif, pour illustrer la méthode.`,
    },
    {
      titre: `Exemple type : une boulangère dont l'ancien prestataire a disparu`,
      texte: `Le site WordPress de la boulangère n'a plus d'accès et le prestataire ne répond plus. On identifie le titulaire du domaine, on récupère le compte, on repère l'hébergement, on sauvegarde, puis on reconstruit une version légère qu'elle peut mettre à jour. Elle repart avec un document regroupant tous ses accès. Cas fictif.`,
    },
    {
      titre: `Exemple type : un cabinet de kinésithérapie piraté`,
      texte: `Le site affiche des pages étrangères à son activité et le navigateur signale un danger. On nettoie, on change les mots de passe, puis, le thème n'étant plus maintenu, on reconstruit en gardant les textes validés par les praticiens, les adresses utiles et des mentions légales à jour. Cas fictif.`,
    },
  ],
  faq: [
    {
      q: `Combien de temps faut-il pour refaire un site internet ?`,
      a: `Nous ne donnons pas de durée fixe : elle dépend du nombre de pages, de la reprise des contenus et de votre réactivité pour les relire. Le calendrier se fixe ensemble avant de commencer.`,
    },
    {
      q: `Vais-je perdre mon référencement en refaisant mon site ?`,
      a: `Pas si la migration est préparée : inventaire des adresses, redirections 301, reprise des balises utiles et suivi dans la Search Console. Quelques variations passagères sont normales après une bascule.`,
    },
    {
      q: `Puis-je garder mon nom de domaine actuel ?`,
      a: `Oui, et c'est généralement conseillé. On le pointe vers le nouveau site. Il faut seulement qu'il soit enregistré à votre nom, ce que nous vérifions en début de projet.`,
    },
    {
      q: `Que se passe-t-il si mon ancien prestataire refuse de me donner mes accès ?`,
      a: `On regarde d'abord qui est titulaire du nom de domaine. S'il est à votre nom, vous reprenez la main vous-même. Sinon, une demande écrite de transfert est la première étape ; nous vous aidons à la formuler.`,
    },
    {
      q: `Peut-on refaire un site Wix ou Jimdo sans tout perdre ?`,
      a: `Oui pour les textes et les images, qu'on récupère. La mise en page, elle, est propre à la plateforme et se reconstruit. Les anciennes adresses sont redirigées vers les nouvelles.`,
    },
    {
      q: `Combien coûte une refonte de site vitrine ?`,
      a: `À partir de {{prix:une-page}} € pour une page et à partir de {{prix:multi-pages}} € pour un site de plusieurs pages. L'estimateur de la page tarifs donne le détail selon vos besoins.`,
    },
    {
      q: `Pourquoi payer une démo avant de signer ?`,
      a: `La démo ({{carte:demo}} €) vous montre à quoi ressemblerait votre site avant tout engagement. C'est une prestation à part, facturée, qui n'est pas déduite du devis.`,
    },
    {
      q: `Dois-je réécrire tous mes textes ?`,
      a: `Non. On garde ce qui est utile et juste, on retire ce qui est périmé, et on réécrit seulement ce qui ne sert plus vos visiteurs. Vous validez tout avant la mise en ligne.`,
    },
    {
      q: `Pourrai-je modifier mon site moi-même après la refonte ?`,
      a: `Selon ce que nous construisons ensemble, oui pour les textes courants et les photos. Pour le reste, la maintenance prend le relais : mises à jour, sauvegardes, petites modifications.`,
    },
    {
      q: `Faut-il refaire son site tous les ans ?`,
      a: `Non. Un site bien construit et entretenu dure longtemps. On le refait quand l'activité change ou quand la base technique devient un frein, pas par effet de mode.`,
    },
  ],
  sources: [
    { nom: `Google Search Central — Déménager un site avec changement d'URL`, url: `https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes` },
    { nom: `web.dev — Performance et expérience utilisateur`, url: `https://web.dev` },
  ],
  liens: [
    { href: '/services/creation-de-site-internet', nom: `Création de site internet`, note: `Repartir de zéro quand il n'y a rien à sauver` },
    { href: '/services/referencement', nom: `Référencement`, note: `Gagner des positions après la bascule` },
    { href: '/outils/audit-site', nom: `Audit de votre site`, note: `Voir ce qui coince avant de décider` },
    { href: '/tarifs', nom: `Tarifs et estimateur`, note: `Calculer votre prix « à partir de »` },
    { href: '/services/maintenance', nom: `Maintenance`, note: `Garder le site à jour et sécurisé` },
    { href: '/comparatif/wix-wordpress-sur-mesure', nom: `Wix, WordPress ou sur mesure`, note: `Comparer les approches et leurs limites` },
    { href: '/ressources/cahier-des-charges', nom: `Cahier des charges`, note: `Préparer votre demande` },
    { href: '/contact', nom: `Contact`, note: `Parler de votre projet de refonte` },
  ],
  maj: '2026-10-30',
  type: 'service',
}
