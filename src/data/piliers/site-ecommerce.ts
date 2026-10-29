import type { Pilier } from './types.ts'

export const PILIER: Pilier = {
  slug: 'site-ecommerce',
  chemin: '/services/site-ecommerce',
  titre: `Créer une boutique en ligne pour un commerce ou un artisan`,
  etiquette: `Service · boutique en ligne`,
  reponse: `Une boutique en ligne a du sens quand vos produits se décrivent, s'emballent ou se retirent en magasin, et que des clients vous le demandent déjà. Chez Stackup Agency, une boutique sur mesure se fait à partir de {{prix:boutique}} €, avec un devis qui dépend de votre catalogue, de vos livraisons et de vos outils.`,
  titleSeo: `Création de boutique en ligne sur mesure pour commerçants`,
  descriptionSeo: `Boutique en ligne sur mesure pour commerçants et artisans : catalogue, paiement, click and collect, stock lié à la caisse. À partir de {{prix:boutique}} €.`,
  sections: [
    {
      id: 'quand-une-boutique-a-du-sens',
      titre: `Une boutique en ligne a-t-elle du sens pour un petit commerce ou un artisan ?`,
      paragraphes: [
        `Oui, si vous avez quelque chose à vendre à distance. Un fromager qui prépare des plateaux, une fleuriste qui livre des bouquets, un caviste dont les clients réclament une bouteille précise : la demande existe déjà, par téléphone ou au comptoir. La boutique permet d'y répondre à toute heure, sans décrocher à chaque fois.`,
        `Elle a moins de sens si votre activité repose sur le devis (plombier, paysagiste) ou sur le rendez-vous (kiné, coiffeur) : un site vitrine suffit alors. Une boutique demande du temps presque chaque jour : préparer les commandes, répondre, mettre le catalogue à jour.`,
        `Trois questions avant de vous lancer. Qui achèterait en ligne : vos clients actuels ou des inconnus ? Pouvez-vous préparer une commande sans gêner la boutique physique ? Vos produits se décrivent-ils bien avec une photo et quelques lignes ?`,
      ],
      liste: [
        `Bon signe : on vous demande déjà « vous livrez ? » ou « vous pouvez me mettre ça de côté ? ».`,
        `À réfléchir : produits fragiles, très périssables ou volumineux, qui compliquent l'expédition.`,
        `À réfléchir : une seule personne pour tout faire, sans créneau prévu pour les commandes en ligne.`,
      ],
    },
    {
      id: 'sur-mesure-plateforme-marketplace',
      titre: `Boutique sur mesure, plateforme louée ou marketplace : que choisir ?`,
      paragraphes: [
        `Il existe trois façons de vendre en ligne, aucune n'est mauvaise en soi, et beaucoup de commerçants en combinent deux.`,
        `Une plateforme louée (vous créez la boutique avec des modèles et payez un abonnement) se met en place vite, et un éditeur gère les mises à jour. Sa limite : vous restez dans le cadre de l'éditeur, les fonctions en plus passent souvent par des modules payants, et le coût court tant que vous vendez. Une marketplace vous donne accès à une audience existante, mais vous vendez dans la vitrine d'un autre, avec ses règles et ses commissions, et la relation client lui appartient d'abord.`,
        `Une boutique sur mesure est un site à vous : parcours d'achat, modes de livraison et liens avec vos outils sont conçus pour votre métier. Sa limite, à dire franchement : le coût de départ est plus élevé, vous dépendez d'un prestataire pour les évolutions importantes, et personne ne vous apporte de trafic au départ. Elle se justifie si vous avez des règles de vente particulières (retrait avec créneaux, produits à la commande), si vous voulez relier la boutique à votre caisse, ou si vous tenez à votre propre clientèle.`,
        `Les critères sont détaillés dans [Shopify ou boutique sur mesure](/comparatif/shopify-ou-boutique-sur-mesure). Si vous hésitez, [écrivez-nous](/contact) : nous vous dirons si votre projet justifie du sur mesure ou si une plateforme louée suffit. La marketplace reste utile comme vitrine en plus : votre site est l'endroit où vos habitués commandent sans intermédiaire.`,
      ],
    },
    {
      id: 'catalogue-fiches-produits-photos',
      titre: `Comment construire un catalogue, des fiches produits et des photos qui vendent ?`,
      paragraphes: [
        `Un catalogue se construit comme une étagère de magasin. Choisissez des catégories que vos clients reconnaîtraient en entrant chez vous (« Fromages de chèvre », « Bouquets », « Vins de Loire »), pas votre classement interne. Une catégorie à un seul produit se fusionne avec une autre.`,
        `Une bonne fiche répond aux questions posées au comptoir : de quoi s'agit-il, quelle taille ou quel poids, d'où ça vient, comment ça se conserve, quand et comment je le reçois. Le prix s'affiche toutes taxes comprises, et les frais de livraison sont connus avant la validation. Les déclinaisons (tailles, formats) restent sur une seule fiche.`,
        `Les photos font la moitié du travail, et vous pouvez en produire beaucoup vous-même : lumière naturelle près d'une fenêtre, fond neutre, même cadrage dans toute une catégorie. Évitez les photos de fournisseur reprises telles quelles. Nous allégeons les images pour que la page reste rapide sur téléphone.`,
      ],
      liste: [
        `Un titre explicite, avec le nom que le client tape réellement.`,
        `Une description courte, puis une description détaillée (origine, composition, conservation).`,
        `Allergènes, composition ou consignes d'entretien lorsque la réglementation l'impose.`,
        `La disponibilité réelle : en stock, sur commande, retrait possible à partir de tel jour.`,
      ],
    },
    {
      id: 'paiement-livraison-click-and-collect',
      titre: `Paiement en ligne, livraison et retrait en magasin : comment les organiser ?`,
      paragraphes: [
        `Vous ne manipulez jamais les numéros de carte. La boutique s'appuie sur un prestataire de paiement agréé, qui verse les sommes sur le compte de votre entreprise, et la page de paiement applique l'authentification forte du porteur de carte. Selon vos clients, on propose la carte, un portefeuille électronique, parfois le virement ou le paiement au retrait. Le prestataire se choisit avec vous, après lecture de ses conditions et de ses frais.`,
        `La livraison fait le plus hésiter. Vous expédiez par transporteur : zones, poids, tarifs, emballage, et qui prend en charge un colis abîmé. Vous livrez vous-même dans un rayon limité, avec créneaux, comme un fleuriste ou un traiteur. Ou vous proposez le retrait en magasin. Les trois peuvent coexister, avec des règles différentes selon le produit.`,
      ],
      sous: [
        {
          titre: `Click and collect : commander en ligne, retirer en magasin`,
          paragraphes: [
            `C'est souvent le meilleur point de départ pour un commerce de proximité : pas de transporteur, et le client repasse chez vous, donc achète parfois autre chose. La boutique propose des jours et des créneaux, vous prévient d'une commande, et le client reçoit un e-mail quand elle est prête.`,
            `Prévoyez une heure limite de commande, un nombre maximal de retraits par créneau, un statut « prête » qui déclenche le message, et une règle pour les commandes jamais retirées. Une commande passée en ligne et retirée en magasin reste, en principe, un achat à distance : les règles de rétractation ci-dessous s'y appliquent, sauf exceptions.`,
          ],
        },
        {
          titre: `Frais de port : à décider avant`,
          paragraphes: [
            `Beaucoup de paniers sont abandonnés parce que le coût de livraison apparaît à la dernière étape. Fixez un barème simple (par poids, par zone ou par montant) et un éventuel seuil de livraison offerte, en gardant en tête le coût réel de l'emballage et du temps de préparation.`,
          ],
        },
      ],
    },
    {
      id: 'stock-synchronise-avec-la-caisse',
      titre: `Peut-on synchroniser le stock de la boutique avec la caisse du magasin ?`,
      paragraphes: [
        `Souvent oui, mais cela dépend de votre caisse. Un produit vendu au comptoir réduit le stock affiché en ligne, et un produit commandé en ligne est réservé en magasin. Sans cela, vous vendez en ligne la dernière pièce qui vient de partir en rayon, et vous devez vous excuser auprès du client.`,
        `Tout dépend de ce que la caisse sait faire : certaines offrent une interface de connexion ou un export, d'autres sont fermées. Nous le vérifions au début du projet, avant de promettre quoi que ce soit. À défaut de connexion directe, il reste un import régulier d'un fichier de stock, ou un petit stock réservé à la vente en ligne.`,
        `Si vous avez besoin d'aller plus loin (suivi des commandes, fournisseurs, étiquettes), la boutique peut s'appuyer sur un outil fabriqué pour vous : voir [logiciel de gestion sur mesure](/services/logiciel-de-gestion).`,
      ],
    },
    {
      id: 'tva-facturation-cgv-retractation-mentions',
      titre: `TVA, facturation, CGV, rétractation, mentions obligatoires : que prévoir ?`,
      paragraphes: [
        `Vendre en ligne ajoute des obligations à celles du magasin. Voici l'essentiel, à compléter avec les sources officielles en bas de page : les textes évoluent et certaines règles dépendent de votre statut. Nous prévoyons dans la boutique les pages et les cases à cocher, mais les textes juridiques restent de votre responsabilité.`,
      ],
      sous: [
        {
          titre: `Mentions légales`,
          paragraphes: [
            `Le site doit permettre d'identifier son éditeur : nom ou raison sociale, adresse, contact, numéro d'immatriculation, hébergeur, et les informations propres à l'activité (numéro de TVA, autorisations éventuelles). Le [générateur de mentions légales](/outils/generateur-mentions-legales) donne un premier brouillon.`,
          ],
        },
        {
          titre: `Conditions générales de vente (CGV)`,
          paragraphes: [
            `Les CGV fixent les règles : produits et prix, commande et paiement, livraison, retours, garanties légales, réclamations, recours à un médiateur de la consommation. Le client doit pouvoir les lire avant de commander et les accepter explicitement. Rédigez-les pour votre activité réelle : copier celles d'un autre site crée des contradictions avec votre fonctionnement.`,
          ],
        },
        {
          titre: `Droit de rétractation`,
          paragraphes: [
            `Pour une vente à distance à un particulier, la règle de base est un délai de quatorze jours à compter de la réception, sans justification. Le vendeur doit informer le client, fournir un formulaire type et rembourser dans les délais prévus. Des exceptions existent, notamment pour les produits qui risquent de se détériorer rapidement et les biens nettement personnalisés. Elles ne jouent pas automatiquement : lisez la fiche de service-public.fr pour vos produits.`,
          ],
        },
        {
          titre: `TVA, facturation, données personnelles`,
          paragraphes: [
            `Le taux de TVA dépend du produit, et votre régime de votre statut (y compris la franchise en base, qui doit être affichée correctement). Les règles de facturation électronique se déploient progressivement : à vérifier sur les sites officiels, avec notre page [facture électronique](/services/facture-electronique). Vendre dans d'autres pays de l'Union européenne peut entraîner des règles de TVA spécifiques : interrogez votre comptable avant.`,
            `La boutique collecte noms, adresses et historiques de commande : informez les clients, ne gardez que l'utile, et demandez leur accord pour les cookies non indispensables. La CNIL explique ces règles clairement.`,
          ],
        },
      ],
    },
    {
      id: 'vendre-produits-alimentaires-ou-vin',
      titre: `Peut-on vendre des produits alimentaires ou du vin en ligne ?`,
      paragraphes: [
        `Oui, mais ces produits ont des règles propres, à vérifier avant de se lancer. Nous ne faisons pas de conseil juridique : voici des repères à confirmer auprès des administrations.`,
        `Pour l'alimentaire, les règles d'hygiène, d'étiquetage, d'information sur les allergènes et de traçabilité s'appliquent comme au comptoir, avec en plus le transport. Un produit frais demande une chaîne du froid et un emballage adapté, ce qui limite les distances et les jours d'expédition. Les produits d'origine animale peuvent relever de règles sanitaires particulières : renseignez-vous auprès de la direction départementale chargée de la protection des populations.`,
        `Pour le vin et les spiritueux s'ajoutent les conditions d'exercice de la vente d'alcool, la fiscalité des boissons alcooliques, l'interdiction de vendre aux mineurs, les règles de publicité, et des contraintes d'expédition en France comme à l'étranger. Certains transporteurs refusent aussi l'alcool.`,
        `Techniquement, la boutique peut intégrer une confirmation d'âge, des mentions sur les fiches, des restrictions de livraison par zone ou par produit, et des créneaux de retrait adaptés à la fraîcheur. La décision de vendre et les autorisations vous reviennent. Pour des cas de métier, voyez les pages [fromager](/creation-site-internet/fromager), [cave à vins et spiritueux](/creation-site-internet/cave-vins-spiritueux) et [fleuriste](/creation-site-internet/fleuriste).`,
      ],
    },
    {
      id: 'referencement-et-emails-de-commande',
      titre: `Comment faire trouver une boutique en ligne, et quoi envoyer après une commande ?`,
      paragraphes: [
        `Une boutique neuve n'est pas trouvée par magie. Son référencement repose sur du concret : une page par catégorie et par produit avec un vrai titre et un vrai texte, des adresses lisibles, des images légères, une page rapide sur mobile, et des données structurées sur le prix et la disponibilité. Pour un commerce local, votre fiche Google compte autant que le site : elle doit renvoyer vers la boutique et indiquer vos horaires de retrait.`,
        `Deux pièges classiques : copier les descriptions du fournisseur (le même texte existe sur cent sites) et laisser en ligne des produits épuisés sans explication. Mieux vaut une page « momentanément indisponible » qui propose des produits proches. Notre méthode est présentée sur la page [référencement](/services/referencement).`,
        `Après la commande, les e-mails font partie de la relation. Un bon parcours en prévoit quatre : la confirmation avec le récapitulatif, le message « prête à retirer » ou « expédiée » avec le suivi, un message en cas de problème (rupture, retard), et un contact clair pour toute question. Nous rédigeons les textes avec vous pour rester dans votre ton, vérifions la lecture sur téléphone, et envoyons depuis une adresse de votre domaine pour limiter les courriers indésirables.`,
      ],
    },
    {
      id: 'couts-recurrents-a-anticiper',
      titre: `Quels coûts récurrents prévoir après la création de la boutique ?`,
      paragraphes: [
        `Créer la boutique n'est que le début de la dépense. Nous ne donnons pas de chiffres ici, car ils dépendent de vos volumes, mais voici ce qu'il faut regarder, quelle que soit la solution retenue.`,
      ],
      liste: [
        `Le nom de domaine, renouvelé chaque année, et l'hébergement.`,
        `Les frais du prestataire de paiement, prélevés sur chaque vente.`,
        `Emballages, étiquettes et transport, souvent sous-estimés au départ.`,
        `Le temps de préparation des commandes : un coût, même s'il n'est facturé à personne.`,
        `Mises à jour de sécurité et maintenance, dès que la boutique évolue.`,
        `Les outils connectés : e-mails en volume, gestion, caisse reliée.`,
        `Photos et textes pour les nouveaux produits, à chaque saison.`,
        `Plateforme louée : abonnement, modules, commissions. Marketplace : commissions et publicité interne. Sur mesure : abonnement de suivi, facultatif.`,
      ],
    },
    {
      id: 'combien-coute-une-boutique-en-ligne',
      titre: `Combien coûte une boutique en ligne sur mesure et qu'est-ce qui fait varier le prix ?`,
      paragraphes: [
        `Chez Stackup Agency, une boutique démarre à partir de {{prix:boutique}} €. C'est un point de départ calculé par notre moteur de devis, pas le prix de votre projet. Vous pouvez estimer votre cas avec [l'estimateur de tarifs](/tarifs). Le calendrier se fixe ensemble avant de commencer, sans date promise à l'avance.`,
        `Ce qui fait varier le prix, c'est d'abord le catalogue : nombre de produits, déclinaisons, produits composés, import depuis un fichier existant. Viennent ensuite les modes de livraison (un transporteur ou plusieurs, zones, retrait avec créneaux), le paiement, les règles particulières (confirmation d'âge, produits frais, commandes à date) et les liens avec vos outils (caisse, comptabilité, gestion).`,
        `Autres facteurs : un espace client avec historique, des codes promotionnels, des textes et photos à produire, plusieurs langues, la reprise d'un ancien site. Une démonstration de l'allure de votre accueil est possible, facturée à part {{carte:demo}} €. Enfin, une boutique sur mesure vous appartient mais demande de la maintenance : c'est un choix à faire en connaissance de cause, avec ou sans abonnement de suivi.`,
      ],
    },
  ],
  exemples: [
    {
      titre: `Exemple type : une fromagerie et ses plateaux à retirer`,
      texte: `Cas fictif. Une fromagerie de centre-ville reçoit chaque semaine des demandes de plateaux par téléphone. La boutique propose une dizaine de plateaux et les fromages à la coupe, avec une date de retrait choisie par le client et une heure limite de commande la veille. Les fiches indiquent la conservation, les allergènes et le lait utilisé. Pas de transporteur au départ : du retrait seulement, pour garder la chaîne du froid sous contrôle. L'équipe reçoit un récapitulatif des préparations, le client un e-mail quand c'est prêt. Le stock reste géré à la main.`,
    },
    {
      titre: `Exemple type : une cave avec confirmation d'âge`,
      texte: `Cas fictif. Une cave indépendante veut proposer une sélection de bouteilles à une clientèle qui ne passe pas toujours en magasin. La boutique affiche une confirmation de majorité et rappelle les règles à la validation. Les livraisons se limitent à la France, avec un transporteur choisi pour sa capacité à expédier des bouteilles. Le stock est relié à la caisse par un import régulier. Les règles fiscales et de vente d'alcool sont vérifiées avec le comptable avant l'ouverture.`,
    },
    {
      titre: `Exemple type : une fleuriste qui livre dans un rayon limité`,
      texte: `Cas fictif. Une fleuriste de village reçoit beaucoup de commandes de dernière minute. La boutique propose des bouquets à composition fixe, avec la mention que les fleurs varient selon la saison. Le client choisit un jour et un créneau de livraison dans quelques communes, ou un retrait en boutique, et ajoute un message à glisser dans le bouquet. Les commandes sont plafonnées par créneau pour que la préparation reste réaliste.`,
    },
  ],
  faq: [
    {
      q: `Combien coûte la création d'une boutique en ligne ?`,
      a: `Chez Stackup Agency, à partir de {{prix:boutique}} €. Le prix final dépend du nombre de produits, des livraisons, du paiement et des liens avec vos outils. L'estimateur de la page tarifs donne une première idée.`,
    },
    {
      q: `Faut-il un statut particulier pour vendre en ligne ?`,
      a: `Non, vous vendez avec le statut de votre entreprise. Certaines activités (alcool, alimentaire frais) demandent en revanche des autorisations ou déclarations : vérifiez sur entreprendre.service-public.fr et auprès de votre chambre consulaire.`,
    },
    {
      q: `Peut-on proposer uniquement le retrait en magasin ?`,
      a: `Oui, c'est un bon départ pour un commerce de proximité. La boutique propose des créneaux, prévient quand la commande est prête, et vous évite de gérer un transporteur. La livraison pourra s'ajouter plus tard.`,
    },
    {
      q: `Le droit de rétractation s'applique-t-il à un retrait en magasin ?`,
      a: `En principe oui : une commande en ligne reste une vente à distance, même retirée chez vous. Le délai de base est de quatorze jours, avec des exceptions (denrées périssables, produits personnalisés). Consultez la fiche de service-public.fr.`,
    },
    {
      q: `Le stock de la boutique peut-il suivre celui de ma caisse ?`,
      a: `Souvent, selon ce que votre caisse permet : connexion directe, export de fichier ou import régulier. Nous le vérifions au début du projet et vous disons clairement ce qui est possible.`,
    },
    {
      q: `Qui rédige les CGV et les mentions légales ?`,
      a: `La boutique prévoit les pages et les cases d'acceptation, et nous vous aidons à structurer le contenu. Ces textes engagent votre entreprise : relisez-les et faites-vous conseiller si votre activité est particulière.`,
    },
    {
      q: `Peut-on vendre du vin ou des produits frais en ligne ?`,
      a: `C'est possible, avec des règles propres (alcool, fiscalité, vérification de l'âge, chaîne du froid, étiquetage). Nous les intégrons techniquement ; la décision de vendre et les autorisations restent de votre côté.`,
    },
    {
      q: `La boutique sera-t-elle bien placée sur Google ?`,
      a: `Personne ne peut le garantir. Nous posons les bases : pages claires, textes propres à chaque produit, images légères, vitesse sur mobile, données structurées. La suite dépend de votre concurrence et du travail dans la durée.`,
    },
    {
      q: `Que se passe-t-il si je veux changer de solution plus tard ?`,
      a: `Une boutique sur mesure vous appartient : vous pouvez demander l'export de votre catalogue et de vos commandes. Prévoyez du temps pour reconstruire les pages et les liens, afin de ne pas perdre votre place dans les résultats.`,
    },
    {
      q: `Plateforme louée ou site sur mesure : lequel choisir ?`,
      a: `Cela dépend du projet. Une plateforme louée démarre vite pour un catalogue classique. Le sur mesure convient mieux à des règles de vente particulières ou à des outils à relier. Le comparatif détaille les critères.`,
    },
  ],
  sources: [
    { nom: `Service-Public.fr : vente à distance et rétractation`, url: `https://www.service-public.fr` },
    { nom: `Entreprendre.Service-Public.fr : obligations du commerçant`, url: `https://entreprendre.service-public.fr` },
    { nom: `Ministère de l'Économie : commerce en ligne et consommateurs`, url: `https://www.economie.gouv.fr` },
    { nom: `CNIL : données personnelles et cookies`, url: `https://www.cnil.fr` },
  ],
  liens: [
    { href: `/comparatif/shopify-ou-boutique-sur-mesure`, nom: `Shopify ou boutique sur mesure`, note: `Les critères de choix et les limites de chaque solution.` },
    { href: `/services/logiciel-de-gestion`, nom: `Logiciel de gestion sur mesure`, note: `Relier commandes, stock et suivi.` },
    { href: `/services/referencement`, nom: `Référencement`, note: `Être trouvé sur Google.` },
    { href: `/tarifs`, nom: `Tarifs et estimateur` },
    { href: `/creation-site-internet/fromager`, nom: `Site pour un fromager` },
    { href: `/creation-site-internet/cave-vins-spiritueux`, nom: `Site pour une cave à vins et spiritueux` },
    { href: `/creation-site-internet/fleuriste`, nom: `Site pour un fleuriste` },
    { href: `/services/facture-electronique`, nom: `Facture électronique` },
    { href: `/outils/generateur-mentions-legales`, nom: `Générateur de mentions légales` },
    { href: `/contact`, nom: `Parler de votre boutique` },
  ],
  maj: `2026-10-29`,
  type: 'service',
}
