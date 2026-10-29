import type { Pilier } from './types'

export const PILIER: Pilier = {
  slug: `facture-electronique`,
  chemin: `/services/facture-electronique`,
  titre: `Facture électronique : se mettre en conformité quand on est artisan, commerçant ou TPE`,
  etiquette: `Service · facture électronique`,
  reponse: `La facturation électronique va remplacer l'envoi de factures en PDF par des échanges passant par une plateforme agréée, avec un calendrier fixé par la loi mais qui peut encore évoluer. Pour un artisan, un commerçant ou une TPE, l'essentiel est de choisir tôt un outil raccordé à une plateforme agréée et de remettre ses données clients en ordre.`,
  titleSeo: `Facture électronique : conformité pour artisans et TPE`,
  descriptionSeo: `Facturation électronique : ce qui change, qui est concerné, quoi faire pour votre TPE ou votre commerce. Faites le point avec notre checklist.`,
  sections: [
    {
      id: `ce-que-change`,
      titre: `Ce que change la facturation électronique, en mots simples`,
      paragraphes: [
        `Aujourd'hui, vous envoyez probablement vos factures par e-mail, en PDF, ou vous les remettez sur papier. Avec la réforme, les factures entre entreprises établies en France devront circuler sous une forme électronique structurée, par l'intermédiaire d'une plateforme agréée par l'administration. Pour vous, cela change surtout une chose : une facture ne part plus d'un simple PDF en pièce jointe, elle passe par un circuit contrôlé.`,
        `Voici les mots qu'il faut comprendre, sans plus.`,
      ],
      sous: [
        {
          titre: `Facture électronique et e-invoicing`,
          paragraphes: [
            `Une facture électronique n'est pas un PDF. C'est une facture dont les informations (qui facture, qui paie, quels produits, quel montant, quelle TVA) sont écrites dans un format que les logiciels savent lire seuls. Un PDF ordinaire se lit à l'écran, mais un logiciel n'en extrait pas les montants de façon fiable. Le mot anglais « e-invoicing » désigne simplement cet échange de factures sous forme structurée.`,
          ],
        },
        {
          titre: `E-reporting`,
          paragraphes: [
            `Toutes les ventes ne donnent pas lieu à une facture électronique entre deux entreprises. Quand vous vendez à un particulier, par exemple un client qui entre dans votre boutique, ou quand vous travaillez avec l'étranger, la réforme prévoit une autre obligation : transmettre à l'administration certaines données de ces opérations. C'est ce qu'on appelle l'e-reporting. Ce n'est pas une facture envoyée au client, c'est une information transmise à l'administration. Le détail des opérations et des données à transmettre est précisé par les textes officiels, à consulter sur impots.gouv.fr.`,
          ],
        },
        {
          titre: `Plateforme agréée et portail public`,
          paragraphes: [
            `Une plateforme agréée est un service, privé, que l'administration a immatriculé après vérification. Elle reçoit vos factures, les transmet à votre client, et envoie à l'administration les données qui doivent lui parvenir. Vous n'envoyez donc plus vos factures directement à vos clients : vous les confiez à votre plateforme, qui les remet à la plateforme du destinataire.`,
            `Le portail public de facturation est la solution portée par l'État. D'après les informations officielles, son rôle a évolué au fil des annonces, et il sert surtout aujourd'hui de point central du dispositif, notamment pour l'annuaire. Vérifiez son rôle exact sur les sites officiels au moment de votre choix.`,
          ],
        },
        {
          titre: `L'annuaire`,
          paragraphes: [
            `L'annuaire est un répertoire central des entreprises. Il indique, pour chaque entreprise, la plateforme sur laquelle elle accepte de recevoir ses factures. C'est grâce à lui que votre plateforme sait où envoyer la facture destinée à votre client. D'où l'importance d'avoir des données clients exactes, nous y revenons plus bas.`,
          ],
        },
        {
          titre: `Les formats : Factur-X et les autres`,
          paragraphes: [
            `Les formats acceptés sont des formats structurés : Factur-X, qui combine un PDF lisible par une personne et des données lisibles par un logiciel, ainsi que des formats uniquement structurés comme UBL ou CII. Vous n'avez normalement pas à choisir : c'est votre logiciel ou votre plateforme qui produit le bon format à partir de ce que vous saisissez.`,
          ],
        },
      ],
    },
    {
      id: `qui-est-concerne`,
      titre: `Qui est concerné par la facture électronique, et dans quel ordre ?`,
      paragraphes: [
        `En principe, toutes les entreprises assujetties à la TVA et établies en France sont concernées, quelle que soit leur taille, dès lors qu'elles facturent d'autres entreprises. Cela inclut les artisans, les commerçants, les TPE et les professions libérales, y compris sous le régime de la micro-entreprise. Les ventes à des particuliers ne donnent pas lieu à une facture électronique, mais peuvent relever de l'e-reporting.`,
        `Le calendrier est progressif, et il a déjà été reporté une fois par rapport aux premières dates fixées par la loi de finances pour 2024. Le schéma général, tel qu'il était connu à la date de mise à jour de cette page, est le suivant : toutes les entreprises doivent pouvoir recevoir des factures électroniques à partir de 2026, tandis que l'obligation d'émettre arrive par étapes selon la taille de l'entreprise, les plus grandes en premier et les plus petites ensuite, en 2027. Ces informations sont à vérifier sur les sites officiels avant toute décision, car le calendrier peut évoluer.`,
        `Pour une TPE ou un artisan, cela veut dire deux échéances à ne pas confondre : savoir recevoir les factures de vos fournisseurs, puis savoir émettre les vôtres. La réception concerne tout le monde en premier. Vos fournisseurs peuvent vous envoyer des factures électroniques avant que vous n'ayez à en émettre.`,
      ],
      liste: [
        `Réception : toutes les entreprises concernées, selon le calendrier en vigueur (à vérifier).`,
        `Émission : progressive selon la taille de l'entreprise, les plus petites structures venant après les plus grandes (à vérifier).`,
        `E-reporting : pour les ventes à des particuliers et les opérations avec l'étranger, selon les textes (à vérifier).`,
        `Les dates exactes se consultent sur impots.gouv.fr et economie.gouv.fr, qui font foi.`,
      ],
    },
    {
      id: `que-faire`,
      titre: `Que doit faire concrètement un artisan ou un commerçant ?`,
      paragraphes: [
        `Vous n'avez pas à devenir informaticien. Concrètement, il y a quatre décisions à prendre et deux vérifications à faire, dans cet ordre.`,
      ],
      liste: [
        `Constater comment vous facturez aujourd'hui : traitement de texte, tableur, logiciel de caisse ou de facturation, outil de votre comptable.`,
        `Choisir comment vous passerez par une plateforme agréée : soit un logiciel de facturation qui en propose une ou s'y raccorde, soit une plateforme choisie directement, soit l'outil que votre expert-comptable met à disposition.`,
        `Vérifier que votre outil sait produire une facture au bon format et la transmettre sans que vous ayez à le faire à la main.`,
        `Vérifier vos données : fiche entreprise, mentions de vos factures, données de chaque client professionnel.`,
        `Prévenir vos clients et demander à vos fournisseurs comment ils vous enverront leurs factures.`,
        `Tester avec une ou deux factures réelles avant la date à laquelle vous devez être prêt.`,
      ],
      sous: [
        {
          titre: `Plateforme agréée ou logiciel qui en propose une ?`,
          paragraphes: [
            `Les deux fonctionnent. Choisir directement une plateforme agréée convient si vous avez déjà un outil de facturation capable de s'y raccorder. Prendre un logiciel de facturation qui inclut ou intègre une plateforme convient si vous partez d'un tableur ou d'un fichier. La liste officielle des plateformes agréées est publiée par l'administration sur impots.gouv.fr : ne retenez qu'une solution qui y figure.`,
          ],
        },
      ],
    },
    {
      id: `donnees-clients`,
      titre: `Vérifier ses données clients : SIREN, adresse de facturation, mentions`,
      paragraphes: [
        `C'est le travail le plus simple et le plus souvent négligé. Une facture est rejetée ou mal acheminée quand l'identité du destinataire est approximative. Avant de choisir un outil, passez vos clients professionnels en revue.`,
        `Pour chaque client professionnel, notez l'identifiant de l'entreprise (SIREN, et SIRET de l'établissement concerné), la raison sociale exacte telle qu'elle figure au registre, l'adresse de facturation, et, si elle est différente, l'adresse de livraison. Si vous avez un doute, le registre officiel des entreprises permet de vérifier ces informations gratuitement.`,
        `Les mentions obligatoires d'une facture évoluent avec la réforme. D'après les textes, de nouvelles mentions apparaissent, par exemple le numéro SIREN du client, l'adresse de livraison des biens quand elle diffère de l'adresse de facturation, la catégorie de l'opération (vente de biens, prestation de services, ou les deux) et l'option éventuelle pour le paiement de la TVA d'après les débits. La liste complète et à jour se trouve sur impots.gouv.fr et service-public.fr : appuyez-vous sur ces pages et non sur une liste recopiée.`,
        `Votre propre fiche compte autant. Vérifiez que votre dénomination, votre adresse, votre SIREN et votre régime de TVA sont corrects dans votre outil de facturation, et dans votre espace professionnel sur impots.gouv.fr.`,
      ],
      liste: [
        `Un client = un SIREN vérifié, une raison sociale exacte, une adresse de facturation.`,
        `Une adresse de livraison distincte quand elle existe.`,
        `Une règle claire pour les clients particuliers (pas de facture électronique, mais peut-être de l'e-reporting).`,
      ],
    },
    {
      id: `sanctions`,
      titre: `Quelles sanctions si l'on n'est pas conforme ?`,
      paragraphes: [
        `Les textes prévoient des sanctions financières en cas de non-respect des obligations : défaut d'émission d'une facture sous forme électronique, défaut de transmission des données d'e-reporting, ou recours à une plateforme non agréée. Les montants et les conditions d'application sont fixés par la loi, et ils peuvent être modifiés ; nous ne les recopions donc pas ici.`,
        `Ce qu'il faut retenir : les textes distinguent plusieurs situations, les conditions d'application dépendent de la situation. Pour connaître la règle applicable à votre cas, consultez les textes sur legifrance.gouv.fr et la présentation officielle sur impots.gouv.fr, et demandez confirmation à votre expert-comptable.`,
      ],
    },
    {
      id: `comment-stackup-aide`,
      titre: `Comment Stackup vous aide à vous mettre en conformité`,
      paragraphes: [
        `Stackup Agency n'est pas une plateforme agréée et ne se présente pas comme telle. Mathéo Reboul fabrique des outils sur mesure ; pour la facture électronique, cela veut dire un outil de devis et de facturation adapté à votre métier, raccordé à une plateforme agréée que nous choisissons ensemble. La plateforme assure la transmission réglementaire, et l'outil vous fait gagner du temps à la saisie.`,
        `Concrètement, l'accompagnement se découpe en trois parties que vous pouvez prendre séparément.`,
      ],
      sous: [
        {
          titre: `Une checklist pour faire le point seul`,
          paragraphes: [
            `La [checklist facture électronique](/outils/checklist-facture-electronique) reprend les points de ce guide sous forme de cases à cocher : vos outils actuels, vos données clients, vos mentions, vos questions à poser. Elle vous permet de savoir où vous en êtes avant de parler à qui que ce soit.`,
          ],
        },
        {
          titre: `Un outil de devis et de facturation sur mesure`,
          paragraphes: [
            `Si les logiciels du marché ne correspondent pas à votre façon de travailler (devis avec options, acomptes, chantiers en plusieurs étapes, tarifs au poids, caisse et facture), nous fabriquons l'outil à vos règles, puis nous le raccordons à la plateforme agréée que vous avez choisie. Vous partez de votre [modèle de devis](/outils/modele-devis) et de vos habitudes réelles. C'est la logique de notre [logiciel de gestion sur mesure](/services/logiciel-de-gestion), avec une partie automatisable décrite sur la page [IA et automatisation](/services/ia-et-automatisation) : relances, envoi, rapprochement.`,
            `Un outil de ce type se prépare à partir de {{prix:outil}} €, toujours « à partir de » : le prix dépend du nombre de documents, des règles de calcul et du raccordement. Vous pouvez estimer votre cas sur la page [tarifs](/tarifs). La plateforme agréée a ses propres conditions, qui ne sont pas incluses dans le prix de l'outil.`,
          ],
        },
        {
          titre: `Une formation à la prise en main`,
          paragraphes: [
            `Nous prévoyons un temps de prise en main avec vous et, si vous le souhaitez, avec la personne qui saisit vos factures. Un échange en visio est possible ({{carte:visio}} €), prestation à part, facturée, qui n'est pas déduite du devis.`,
          ],
        },
        {
          titre: `Ce que nous ne faisons pas`,
          paragraphes: [
            `Nous ne remplaçons pas votre expert-comptable, nous ne vous conseillons pas sur votre fiscalité et nous ne garantissons pas votre conformité : celle-ci dépend aussi de la plateforme choisie et de vos pratiques. Un outil sur mesure a aussi ses limites : un coût de départ, et une dépendance à votre prestataire pour les évolutions. Si un logiciel du marché suffit à votre activité, nous vous le dirons.`,
          ],
        },
      ],
    },
    {
      id: `questions-editeur`,
      titre: `Quelles questions poser à un éditeur de logiciel ou à une plateforme ?`,
      paragraphes: [
        `Avant de signer, posez des questions précises. Les réponses vagues sont déjà une réponse.`,
      ],
      liste: [
        `La plateforme est-elle bien dans la liste officielle des plateformes agréées publiée sur impots.gouv.fr ? Ou est-elle en cours d'immatriculation, et que se passe-t-il alors ?`,
        `Quels formats sont produits (Factur-X, UBL, CII) et lesquels sont reçus ?`,
        `Le logiciel gère-t-il la réception des factures fournisseurs et pas seulement l'émission ?`,
        `Comment fonctionne l'e-reporting pour mes ventes aux particuliers ?`,
        `Que deviennent mes données et mes factures si je change d'outil ou si je résilie ? Puis-je les exporter, dans quel format ?`,
        `Combien coûte l'ensemble, et qu'est-ce qui fait varier le prix ?`,
        `Qui m'aide en cas de rejet d'une facture, et par quel moyen ?`,
        `Mon expert-comptable peut-il accéder à mes factures sans ressaisie ?`,
      ],
    },
    {
      id: `erreurs`,
      titre: `Quelles erreurs éviter quand on prépare la facturation électronique ?`,
      paragraphes: [
        `Les erreurs les plus fréquentes ne sont pas techniques. Elles viennent de l'attente, du flou sur le rôle de chacun et d'achats trop rapides.`,
      ],
      liste: [
        `Attendre le dernier moment : les bons outils se choisissent, se testent et se prennent en main avant l'échéance, pas pendant.`,
        `Confondre un PDF envoyé par e-mail avec une facture électronique : ce n'est pas la même chose.`,
        `Choisir une solution sans vérifier qu'elle figure dans la liste officielle des plateformes agréées.`,
        `Oublier la réception : même si vous émettez plus tard, vous devrez pouvoir recevoir les factures de vos fournisseurs.`,
        `Négliger les données clients : SIREN manquant, raison sociale approximative, adresse de livraison oubliée.`,
        `Ne pas prévoir de sortie : un outil dont on ne peut pas exporter ses données est une contrainte.`,
        `Croire une date définitive : le calendrier a déjà évolué, et il peut encore le faire. Relisez les sites officiels de temps en temps.`,
      ],
    },
    {
      id: `expert-comptable`,
      titre: `Quel est le rôle de l'expert-comptable ?`,
      paragraphes: [
        `Votre expert-comptable est un interlocuteur à associer dès le départ. Il connaît votre régime de TVA, vos obligations déclaratives et la façon dont vos factures arrivent dans sa comptabilité. Beaucoup de cabinets recommandent un outil ou une plateforme à leurs clients. Mieux vaut le savoir avant d'acheter autre chose.`,
        `Posez-lui trois questions : quelle solution recommande-t-il, que peut-il récupérer automatiquement de votre outil, et qui prend en charge l'e-reporting pour vos ventes aux particuliers. Son rôle s'arrête là où commence celui de l'outil : il vous conseille sur le choix et sur la conformité, nous fabriquons ou adaptons l'outil, la plateforme assure la transmission.`,
        `Si vous n'avez pas d'expert-comptable, les pages officielles de service-public.fr et d'impots.gouv.fr restent votre première source pour les règles.`,
      ],
    },
    {
      id: `calendrier-preparation`,
      titre: `Comment préparer le calendrier, étape par étape ?`,
      paragraphes: [
        `Plutôt que des durées, voici un ordre de travail. Les dates dépendent de votre taille et de votre secteur, à vérifier auprès des sites officiels.`,
        `Première étape, le point de départ : consultez le calendrier officiel pour votre cas, notez comment vous facturez aujourd'hui et ce que fait déjà votre comptable. Deuxième étape, les données : nettoyez votre fichier clients, vérifiez vos mentions, listez vos ventes à des particuliers et à l'étranger. Troisième étape, le choix : comparez deux ou trois solutions avec la liste de questions plus haut, puis décidez avec votre expert-comptable. Quatrième étape, l'installation : configurez l'outil, raccordez-le à la plateforme, importez vos clients. Cinquième étape, l'essai : émettez quelques factures réelles ou de test, observez les rejets éventuels, corrigez. Sixième étape, la bascule : prévenez vos clients, abandonnez l'ancien circuit, gardez un œil sur les évolutions des textes.`,
        `Si vous voulez un outil sur mesure, le calendrier de la fabrication se fixe ensemble avant de commencer, en tenant compte de votre date limite. [Contactez-nous](/contact) pour en parler : un échange suffit pour savoir si un logiciel du marché ou un outil sur mesure vous convient mieux.`,
      ],
    },
  ],
  exemples: [
    {
      titre: `Exemple type : un plombier chauffagiste en entreprise individuelle`,
      texte: `Un plombier fait ses devis dans un traitement de texte et ses factures dans un tableur. Il facture surtout des particuliers, avec quelques syndics et petites entreprises. Pour les particuliers, pas de facture électronique, mais un possible e-reporting selon les textes. Pour les professionnels, il lui faut un outil qui produit la facture au bon format. Il fait le point avec la checklist, vérifie le SIREN de ses clients professionnels, puis choisit avec son comptable un outil raccordé à une plateforme agréée. Il garde ses devis habituels, avec acomptes et chantiers en plusieurs étapes. Cas fictif, donné à titre d'illustration.`,
    },
    {
      titre: `Exemple type : une boulangerie qui livre des restaurants et des collectivités`,
      texte: `Une boulangerie vend surtout au comptoir, à des particuliers, mais livre aussi quelques restaurants et une cantine chaque semaine. Ses ventes au comptoir relèvent de l'e-reporting, ses livraisons aux professionnels de la facture électronique. Elle doit donc distinguer les deux flux dans son outil, et gérer des adresses de livraison différentes des adresses de facturation. Elle vérifie aussi comment ses fournisseurs lui enverront leurs factures. Cas fictif, donné à titre d'illustration.`,
    },
    {
      titre: `Exemple type : une petite société de services avec un outil sur mesure`,
      texte: `Une TPE de maintenance de matériel facture des abonnements annuels et des interventions ponctuelles. Les logiciels du marché ne gèrent pas ses règles de calcul, elle les contourne avec des tableurs. Avec Stackup, elle fait fabriquer un outil de devis et de facturation à ses règles, raccordé à une plateforme agréée choisie ensemble avec son expert-comptable. L'outil produit les factures, la plateforme les transmet, le comptable récupère les écritures. Cas fictif, donné à titre d'illustration.`,
    },
  ],
  faq: [
    {
      q: `La facture électronique est-elle obligatoire pour un artisan ?`,
      a: `En principe oui pour les entreprises assujetties à la TVA établies en France, selon un calendrier progressif qui dépend de la taille. Les dates sont à vérifier sur impots.gouv.fr et economie.gouv.fr, car elles peuvent évoluer.`,
    },
    {
      q: `Un PDF envoyé par e-mail est-il une facture électronique ?`,
      a: `Non, pas au sens de la réforme. Une facture électronique contient des données structurées lisibles par un logiciel, et transite par une plateforme agréée. Le format Factur-X associe un PDF et ces données.`,
    },
    {
      q: `Qu'est-ce qu'une plateforme agréée ?`,
      a: `C'est un service privé immatriculé par l'administration, qui transmet vos factures à vos clients et envoie à l'administration les données requises. La liste officielle est publiée sur impots.gouv.fr.`,
    },
    {
      q: `Stackup est-elle une plateforme agréée ?`,
      a: `Non. Stackup fabrique des outils de devis et de facturation sur mesure, raccordés à une plateforme agréée choisie avec vous. La transmission réglementaire est assurée par cette plateforme.`,
    },
    {
      q: `Que dois-je faire pour les ventes à des particuliers ?`,
      a: `Elles ne donnent pas lieu à une facture électronique, mais peuvent relever de l'e-reporting, c'est-à-dire de la transmission de données à l'administration. Vérifiez les règles applicables à votre activité sur impots.gouv.fr.`,
    },
    {
      q: `Combien coûte un outil de facturation sur mesure ?`,
      a: `Un outil de ce type se prépare à partir de {{prix:outil}} €. Le prix final dépend de vos règles de calcul, du nombre de documents et du raccordement à la plateforme. La plateforme agréée a ses propres conditions.`,
    },
    {
      q: `Faut-il changer de logiciel de facturation ?`,
      a: `Pas forcément. Si votre logiciel actuel se raccorde à une plateforme agréée et produit un format accepté, il peut suffire. Posez la question à votre éditeur, et vérifiez-le avec votre expert-comptable.`,
    },
    {
      q: `Quelles sanctions risque-t-on en cas de non-conformité ?`,
      a: `Les textes prévoient des sanctions financières pour certains manquements. Nous ne les recopions pas : consultez legifrance.gouv.fr et impots.gouv.fr pour les conditions et montants en vigueur.`,
    },
    {
      q: `Que faut-il vérifier dans mes fichiers clients ?`,
      a: `Le SIREN, la raison sociale exacte, l'adresse de facturation et, si elle diffère, l'adresse de livraison. Ces informations évitent des rejets de factures. La checklist de Stackup reprend ces points.`,
    },
    {
      q: `Puis-je commencer sans attendre la date limite ?`,
      a: `Oui, et c'est conseillé : choisir, installer et tester un outil prend du temps. Commencez par la réception des factures et par le nettoyage de vos données clients, puis décidez de l'outil avec votre expert-comptable.`,
    },
  ],
  sources: [
    { nom: `impots.gouv.fr : la facturation électronique`, url: `https://www.impots.gouv.fr` },
    { nom: `economie.gouv.fr : la réforme de la facturation électronique`, url: `https://www.economie.gouv.fr` },
    { nom: `service-public.fr : facture, mentions obligatoires`, url: `https://www.service-public.fr` },
    { nom: `legifrance.gouv.fr : textes applicables`, url: `https://www.legifrance.gouv.fr` },
  ],
  liens: [
    { href: `/outils/checklist-facture-electronique`, nom: `Checklist facture électronique`, note: `Faire le point sur vos outils et vos données clients` },
    { href: `/outils/modele-devis`, nom: `Modèle de devis`, note: `Partir d'un devis conforme` },
    { href: `/services/logiciel-de-gestion`, nom: `Logiciel de gestion sur mesure`, note: `Devis, factures, suivi de chantier` },
    { href: `/services/ia-et-automatisation`, nom: `IA et automatisation`, note: `Relances, envois, rapprochements` },
    { href: `/tarifs`, nom: `Tarifs`, note: `Estimer votre projet` },
    { href: `/contact`, nom: `Contact`, note: `Parler de votre cas` },
  ],
  maj: `2026-10-29`,
  type: `service`,
}
