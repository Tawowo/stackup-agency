import type { Pilier } from './types'

export const PILIER: Pilier = {
  slug: `obat-tolteck-logiciel-sur-mesure`,
  chemin: `/comparatif/obat-tolteck-logiciel-sur-mesure`,
  titre: `Obat, Tolteck et autres logiciels de devis et facturation ou outil sur mesure`,
  etiquette: `Comparatif · logiciel de gestion`,
  reponse: `Pour démarrer, un logiciel de devis et de facturation du marché est souvent le bon choix : il est prêt tout de suite et son coût de départ est faible. Un outil sur mesure se justifie quand votre métier ou votre façon de travailler ne rentre pas dans ces logiciels, ou quand vous voulez relier devis, planning, site et facturation.`,
  titleSeo: `Obat, Tolteck ou outil sur mesure : que choisir ?`,
  descriptionSeo: `Logiciel de devis et facturation du marché ou outil sur mesure ? Cas où chacun se justifie, limites, questions à poser. Comparatif honnête pour TPE.`,
  sections: [
    {
      id: `reponse-courte`,
      titre: `Obat, Tolteck ou outil sur mesure : lequel choisir ?`,
      paragraphes: [
        `Il n'y a pas de bonne réponse universelle. Les logiciels de devis et de facturation du marché (Obat, Tolteck, Henrri, Sellsy, Evoliz, Axonaut, Pennylane, Tiime et d'autres) répondent bien au besoin le plus courant : faire un devis, le transformer en facture, suivre les paiements. Vous pouvez les essayer avant de vous engager.`,
        `L'outil sur mesure répond à un autre besoin : celui où le logiciel du marché oblige à contourner, à ressaisir ou à bricoler à côté. Il demande un investissement de départ, un prestataire de confiance et de la maintenance. Ce n'est pas un « mieux », c'est un autre arbitrage.`,
        `Les noms cités sont des exemples. Leurs tarifs, fonctions et conditions changent : seuls leurs sites officiels sont à jour.`,
      ],
    },
    {
      id: `quand-logiciel-marche`,
      titre: `Quand un logiciel de devis et de facturation du marché est le bon choix`,
      paragraphes: [
        `Si vous démarrez ou si votre activité ressemble à celle de milliers d'autres, un logiciel du marché est généralement la solution la plus sensée. Vous profitez du travail d'une équipe produit, de mises à jour régulières et d'une prise en main rapide. Restez dessus dans ces situations :`,
      ],
      liste: [
        `Vous créez votre activité et votre façon de travailler n'est pas encore stable : mieux vaut un outil courant que de figer un process qui va changer.`,
        `Votre besoin tient en trois gestes : un devis, une facture, un suivi des règlements. Un plombier ou une coiffeuse qui facture simplement n'a pas besoin de plus.`,
        `Votre secteur est bien couvert : certains logiciels sont pensés pour le bâtiment, d'autres pour les indépendants en général. Si l'un colle à votre métier, inutile de refaire ce qui existe.`,
        `Vous voulez un outil prêt immédiatement, avec une assistance et une communauté d'utilisateurs.`,
        `Votre budget de départ est serré et vous préférez étaler le coût dans le temps.`,
      ],
    },
    {
      id: `quand-sur-mesure`,
      titre: `Quand un outil sur mesure se justifie`,
      paragraphes: [
        `Le sur mesure n'a de sens que s'il résout un problème précis que les logiciels du marché résolvent mal. Si vous cochez plusieurs cases ci-dessous, la question mérite d'être posée. Si vous n'en cochez aucune, restez où vous êtes.`,
      ],
      liste: [
        `Métier atypique : votre façon de chiffrer (au mètre, au poste, par forfait modulable) ne rentre pas dans les champs prévus et vous refaites vos calculs dans un tableur à côté.`,
        `Process spécifique : devis, acompte, planning, intervention, facture, relance sont faits dans des outils différents et vous ressaisissez les mêmes informations.`,
        `Besoin de relier site, planning et facturation : une demande de devis arrivée par votre site devrait créer le dossier et proposer un créneau, sans copier-coller.`,
        `Volonté de posséder vos données : base clients, devis et historique restent chez vous, dans un format que vous maîtrisez.`,
        `Un irritant quotidien dont vous savez estimer le temps perdu.`,
      ],
      sous: [
        {
          titre: `Ce que « sur mesure » ne veut pas dire`,
          paragraphes: [
            `Ce n'est pas un grand logiciel qui fait tout. C'est généralement un petit outil centré sur votre process : un formulaire de devis relié à votre grille de prix, un suivi de chantiers, des relances automatiques. Il reste volontairement étroit, et c'est ce qui le rend utile.`,
          ],
        },
      ],
    },
    {
      id: `cout-total`,
      titre: `Combien coûte un logiciel de gestion sur la durée : abonnement ou investissement ?`,
      paragraphes: [
        `Les deux modèles se comparent sur le coût total, pas sur le prix affiché. Un logiciel du marché se paie le plus souvent par abonnement, parfois par utilisateur : faible au départ, le coût se répète et peut évoluer avec l'équipe, les options ou la grille de l'éditeur. Pour les tarifs en vigueur, consultez le site de l'éditeur.`,
        `Un outil sur mesure se paie d'abord à la conception, puis il reste la maintenance et les évolutions que vous décidez. Chez Stackup, il démarre à partir de {{prix:outil}} €, le montant final dépendant de ce que l'outil doit faire. Estimez le vôtre avec [l'estimateur](/tarifs).`,
        `Pour comparer honnêtement, additionnez de chaque côté : abonnements et options plus temps perdu à ressaisir ; investissement plus maintenance. Le sur mesure ne gagne que si l'écart est réel. Pour un besoin standard, l'abonnement l'emporte souvent.`,
      ],
    },
    {
      id: `adaptation-metier`,
      titre: `Adaptation au métier et prise en main : lequel est le plus rapide ?`,
      paragraphes: [
        `Sur la prise en main, le logiciel du marché a l'avantage : compte créé, premier devis le jour même. Sur l'adaptation au métier, tout dépend du vôtre : certains logiciels sont très bien pensés pour une profession, mais un logiciel général impose ses champs. Si vous adaptez votre travail à l'outil plutôt que l'inverse, c'est un signal.`,
        `L'outil sur mesure demande un temps de cadrage : décrire votre façon de travailler, valider une maquette, tester. Le calendrier se fixe ensemble avant de commencer. En contrepartie, il parle votre langage : vos postes, vos unités, vos documents.`,
      ],
    },
    {
      id: `facture-electronique`,
      titre: `Facture électronique : un logiciel du marché ou un outil sur mesure est-il conforme ?`,
      paragraphes: [
        `La réforme de la facture électronique s'applique progressivement et son calendrier a déjà été reporté. Dates et obligations sont à vérifier sur les sites officiels ([economie.gouv.fr](https://www.economie.gouv.fr), [impots.gouv.fr](https://www.impots.gouv.fr)), pas sur une page commerciale, la nôtre comprise.`,
        `Côté logiciels du marché, chaque éditeur traite le sujet à son rythme : demandez-lui par écrit ce qui est prévu pour votre cas et si cela suppose un changement d'offre. Côté sur mesure, il faut produire un format conforme ou passer par une plateforme agréée, et prévoir qui tient la conformité à jour. Notre point de vue est détaillé sur la page [facture électronique](/services/facture-electronique).`,
      ],
    },
    {
      id: `donnees-export`,
      titre: `Export et propriété des données : que devient votre historique ?`,
      paragraphes: [
        `Devis, factures et fichier clients sont votre mémoire commerciale, avec des obligations de conservation à vérifier sur [service-public.fr](https://entreprendre.service-public.fr). Posez la question avant de choisir, pas le jour où vous voulez partir.`,
        `Pour un logiciel du marché, vérifiez les formats d'export, si l'export couvre les documents et pas seulement les contacts, et le sort de vos données à la résiliation. Pour un outil sur mesure, la propriété se règle dans le contrat : base à vous, accès, sauvegardes, récupération dans un format lisible. C'est un argument du sur mesure, mais il ne vaut que s'il est écrit.`,
      ],
    },
    {
      id: `evolutivite-integrations`,
      titre: `Évolutivité et intégrations : relier le site, le planning et le paiement`,
      paragraphes: [
        `Un logiciel du marché évolue au rythme de son éditeur : vous profitez des nouveautés mais vous ne décidez pas de la feuille de route. Beaucoup proposent des connexions avec d'autres services, à vérifier pour votre cas.`,
        `Un outil sur mesure évolue selon vos priorités. C'est utile pour les liaisons : un formulaire du site qui crée un dossier client, un planning qui alimente le devis, un lien de paiement qui marque la facture réglée. C'est la raison la plus fréquente de passer au sur mesure, plus que le prix. Une intégration reste un engagement : elle se surveille.`,
      ],
    },
    {
      id: `support-risques`,
      titre: `Support et risques : fermeture d'un éditeur, hausse de tarif, dépendance au prestataire`,
      paragraphes: [
        `Avec un logiciel du marché, vous dépendez d'un éditeur : il peut modifier ses tarifs, retirer une fonction, être racheté ou cesser son activité. Le support est mutualisé : structuré, mais pas toujours adapté à votre cas.`,
        `Avec un outil sur mesure, vous dépendez d'un prestataire, et pour une entreprise individuelle comme la nôtre, le risque est réel. La parade : code documenté, accès et base qui vous appartiennent, sauvegardes, et un contrat qui prévoit ce qui se passe si le prestataire n'est plus disponible. Dans les deux cas, prévoyez une sortie.`,
      ],
    },
    {
      id: `limites-sur-mesure`,
      titre: `Les limites d'un outil sur mesure`,
      paragraphes: [`Sans elles, cette comparaison ne vaudrait rien :`],
      liste: [
        `Le coût de départ est plus élevé qu'un premier mois d'abonnement.`,
        `Le cadrage prend du temps : décrire son process, tester, corriger.`,
        `Vous dépendez d'un prestataire pour la maintenance et les évolutions.`,
        `Un process mal décrit donne un outil mal ajusté : on réduit ce risque en commençant petit.`,
        `La conformité réglementaire reste à suivre dans la durée.`,
      ],
    },
    {
      id: `quand-choisir`,
      titre: `Quand choisir l'un ou l'autre : un repère simple`,
      paragraphes: [
        `Trois questions. Un logiciel du marché me permet-il de travailler sans contournement ? Si oui, gardez-le. Est-ce que je perds du temps chaque semaine à ressaisir ? Si oui, notez combien et voyez si un petit outil règle ce point précis. Ai-je besoin que mes données et mon process m'appartiennent ? Si oui, étudiez le sur mesure ou un logiciel à export complet.`,
        `La voie intermédiaire est souvent la plus sage : démarrer avec un logiciel du marché, observer ce qui gêne pendant quelques mois, puis ne faire fabriquer que la pièce qui manque. Une IA ne remplace pas un logiciel de gestion : vos devis et factures ont besoin d'un outil fiable et vérifiable.`,
      ],
    },
    {
      id: `questions-a-poser`,
      titre: `Questions à poser avant de choisir : à un éditeur ou à un prestataire`,
      paragraphes: [`Un bon interlocuteur répond clairement, par écrit.`],
      sous: [
        {
          titre: `À un éditeur de logiciel`,
          paragraphes: [],
          liste: [
            `Quel coût total pour mon nombre d'utilisateurs, aujourd'hui et si l'équipe grandit ?`,
            `Comment exporter mes documents et contacts, et dans quel format ?`,
            `Quel est votre plan pour la facture électronique ?`,
            `Que deviennent mes données si je résilie ?`,
            `Quelles connexions avec mon site, mon planning, mon paiement ?`,
          ],
        },
        {
          titre: `À un prestataire d'outil sur mesure`,
          paragraphes: [],
          liste: [
            `Que fait exactement l'outil, et que ne fait-il pas ?`,
            `À qui appartiennent le code, la base et les accès ?`,
            `Comment sont assurées sauvegardes et maintenance, et à quel coût ?`,
            `Que se passe-t-il si vous n'êtes plus disponible ?`,
            `Peut-on commencer par une première version limitée ?`,
          ],
        },
      ],
    },
    {
      id: `nous-contacter`,
      titre: `Et chez Stackup Agency ?`,
      paragraphes: [
        `Stackup Agency est l'entreprise de Mathéo Reboul, en Touraine. Nous fabriquons des outils sur mesure pour artisans, commerçants et TPE. Si un logiciel du marché suffit, nous vous le dirons. Un outil démarre à partir de {{prix:outil}} € : estimez-le sur la page [tarifs](/tarifs), voyez nos [solutions](/solutions), la page [logiciel de gestion](/services/logiciel-de-gestion), le [modèle de devis](/outils/modele-devis) gratuit, ou [écrivez-nous](/contact).`,
      ],
    },
  ],
  exemples: [
    {
      titre: `Exemple type : une plombière qui démarre`,
      texte: `Elle vient de créer son entreprise, fait des dépannages et facture à l'intervention. Un logiciel du marché lui suffit largement : prise en main rapide, abonnement léger, aucun développement à financer. Si elle embauche et veut relier ses demandes en ligne à son planning, elle posera la question plus tard.`,
    },
    {
      titre: `Exemple type : un atelier de menuiserie aux devis très variables`,
      texte: `Chaque ouvrage dépend de dimensions, d'essences et d'options. Le calcul se fait dans un tableur, puis est recopié dans un logiciel du marché sans champ adapté : perte de temps et risque d'erreur. Un petit outil appliquant sa grille de calcul et générant le devis est cohérent. Il commence par ce module et garde son logiciel de facturation.`,
    },
    {
      titre: `Exemple type : un salon de coiffure qui veut tout relier`,
      texte: `Rendez-vous par téléphone, carnet clients, encaissement ailleurs. La gérante voudrait que la réservation du site alimente l'agenda, envoie un rappel et prépare l'encaissement. Elle compare un assemblage de services du marché et un outil sur mesure, en regardant coût total, maintenance et dépendance à un prestataire.`,
    },
  ],
  comparaison: {
    titre: `Logiciel du marché ou outil sur mesure : critère par critère`,
    colonnes: [`Logiciel du marché (Obat, Tolteck, Henrri, Sellsy…)`, `Outil sur mesure`],
    lignes: [
      {
        critere: `Coût de départ`,
        a: `Généralement faible, essai possible. Tarifs sur le site de l'éditeur.`,
        b: `Plus élevé : à partir de {{prix:outil}} € chez Stackup, selon l'outil.`,
      },
      {
        critere: `Coût sur la durée`,
        a: `Abonnement récurrent, parfois par utilisateur, susceptible d'évoluer.`,
        b: `Pas d'abonnement par utilisateur ; maintenance et évolutions à prévoir.`,
      },
      {
        critere: `Adaptation au métier`,
        a: `Bonne pour les besoins courants ; champs imposés par l'éditeur.`,
        b: `Conçu pour votre façon de chiffrer, si le process est bien décrit.`,
      },
      {
        critere: `Prise en main`,
        a: `Très rapide : premier devis le jour même.`,
        b: `Plus lente : cadrage, maquette, tests.`,
      },
      {
        critere: `Facture électronique`,
        a: `À vérifier auprès de chaque éditeur.`,
        b: `À prévoir dans le projet et à écrire dans le contrat.`,
      },
      {
        critere: `Export des données`,
        a: `Variable selon l'éditeur : formats, périmètre, résiliation.`,
        b: `Format lisible à exiger dans le contrat.`,
      },
      {
        critere: `Propriété des données`,
        a: `Chez l'éditeur, selon ses conditions.`,
        b: `Sous votre contrôle, si c'est contractualisé.`,
      },
      {
        critere: `Évolutivité`,
        a: `Au rythme de l'éditeur.`,
        b: `Selon vos priorités, chaque évolution se chiffre.`,
      },
      {
        critere: `Intégrations (site, planning, paiement)`,
        a: `Connexions proposées par l'éditeur, à vérifier.`,
        b: `Liaisons conçues pour votre cas, avec un suivi.`,
      },
      {
        critere: `Support`,
        a: `Assistance mutualisée et communauté.`,
        b: `Interlocuteur direct, mais reposant sur le prestataire.`,
      },
      {
        critere: `Risque principal`,
        a: `Hausse de tarif, retrait de fonction, rachat ou fermeture.`,
        b: `Dépendance au prestataire, process mal décrit.`,
      },
      {
        critere: `Cas où il convient le mieux`,
        a: `Démarrage, besoin standard, budget de départ serré.`,
        b: `Métier atypique, process spécifique, site/planning/facturation à relier.`,
      },
    ],
    note: `Tendances générales, pas les offres précises d'un éditeur. Pour leurs tarifs et fonctions à jour, consultez leurs sites officiels.`,
  },
  faq: [
    {
      q: `Obat ou Tolteck : lequel choisir pour un artisan ?`,
      a: `Nous ne pouvons pas trancher à votre place, leurs offres évoluent. Essayez-les sur vos propres devis et comparez tarifs et fonctions sur leurs sites.`,
    },
    {
      q: `Combien coûte un logiciel de gestion sur mesure ?`,
      a: `Chez Stackup, un outil démarre à partir de {{prix:outil}} €. Le montant final dépend de ce qu'il doit faire ; l'estimateur de la page tarifs donne un ordre de grandeur.`,
    },
    {
      q: `Un outil sur mesure peut-il remplacer un logiciel de facturation ?`,
      a: `Pour un process précis, oui, mais ce n'est pas toujours souhaitable. Souvent, on garde le logiciel du marché et on ne fait fabriquer que ce qui lui manque.`,
    },
    {
      q: `Un logiciel du marché est-il adapté à un petit artisan ?`,
      a: `Souvent oui, surtout au démarrage. Vérifiez qu'il gère votre façon de chiffrer et testez-le avant de vous abonner.`,
    },
    {
      q: `Que devient mon historique si je change de logiciel ?`,
      a: `Cela dépend de l'éditeur : formats d'export et conditions de résiliation varient. Posez la question par écrit avant de vous engager.`,
    },
    {
      q: `La facture électronique est-elle gérée par un outil sur mesure ?`,
      a: `Elle peut l'être, via un format conforme ou une plateforme agréée. Calendrier et obligations sont à vérifier sur les sites officiels.`,
    },
    {
      q: `Que se passe-t-il si mon prestataire disparaît ?`,
      a: `Le risque est réel avec une petite structure. Exigez que code, base et accès vous appartiennent, et que des sauvegardes existent.`,
    },
    {
      q: `Puis-je commencer par un logiciel du marché puis passer au sur mesure ?`,
      a: `Oui, c'est souvent le plus sage. Vérifiez l'export de vos données et ne faites fabriquer que la pièce qui manque.`,
    },
  ],
  sources: [
    { nom: `Entreprendre.Service-public.fr : obligations de facturation`, url: `https://entreprendre.service-public.fr` },
    { nom: `Economie.gouv.fr : facturation électronique`, url: `https://www.economie.gouv.fr` },
    { nom: `Impots.gouv.fr : facturation électronique`, url: `https://www.impots.gouv.fr` },
  ],
  liens: [
    { href: `/services/logiciel-de-gestion`, nom: `Logiciel de gestion sur mesure`, note: `Devis, planning, suivi, relances` },
    { href: `/services/facture-electronique`, nom: `Facture électronique`, note: `Ce qu'il faut vérifier` },
    { href: `/outils/modele-devis`, nom: `Modèle de devis`, note: `Outil gratuit` },
    { href: `/solutions`, nom: `Solutions`, note: `Les outils que nous fabriquons` },
    { href: `/tarifs`, nom: `Tarifs`, note: `Estimer votre projet` },
    { href: `/contact`, nom: `Contact`, note: `Parler de votre besoin` },
  ],
  maj: `2026-10-30`,
  type: `comparatif`,
}
