import type { ContenuSolution } from './solutions-contenu'

export const CONTENU_SOLUTIONS_2: Record<string, ContenuSolution> = {
  'programme-fidelite': {
    sections: [
      {
        titre: `Le problème, vu depuis le terrain`,
        paragraphes: [
          `Exemple type : une boulangerie distribue des cartes à douze tampons. Au bout de quelques mois, la moitié dort au fond d’un sac, certaines sont remplies d’un coup par un client pressé, et personne ne sait combien de cartes circulent vraiment. La carte coûte de l’impression et des secondes de comptoir, et elle ne dit rien de ceux qui s’en servent.`,
          `Exemple type : une gérante de salon de coiffure sait que Madame D. vient toutes les six semaines. Elle ne remarque pas qu’une autre cliente, passée quatre fois l’an dernier, n’a pas reparu depuis l’été. Cette information existe dans sa mémoire, pas dans un endroit où l’on peut agir dessus.`,
          `Exemple type : un salon de thé voudrait remercier ses habitués avant les fêtes. Sans liste fiable, il offre la même chose à tout le monde ou ne fait rien, faute de temps. Un programme de fidélité sert à trois choses : retrouver le client, le reconnaître, lui donner une raison de revenir.`,
        ],
      },
      {
        titre: `Comment fonctionne le programme de fidélité digital`,
        paragraphes: [
          `Vous commencez par fixer les règles dans le module : des points par passage ou par euro dépensé, les seuils de récompense, la récompense elle-même (une boisson offerte, un soin à prix réduit, une viennoiserie). Rien n’est imposé, et vous pouvez les modifier quand votre activité change.`,
          `Au comptoir, vous retrouvez le client par son nom ou son code, vous ajoutez les points, et son solde est à jour. À l’écran, vous voyez sa fiche : points, prochaine récompense, historique de ses passages. Le client n’a rien à installer : il présente son code ou donne son nom. Une application installable sur téléphone existe en option, pour ceux qui préfèrent consulter leur solde eux-mêmes.`,
          `Le calcul du solde, le franchissement d’un seuil et la liste des clients proches d’une récompense sont automatiques. Ce qui ne l’est pas : décider de ce que vous offrez et à qui. L’envoi automatique de messages relève du module Automatisations, qui s’ajoute à part. Si le module de caisse est présent, les points peuvent se créditer à l’encaissement ; sinon, vous les saisissez vous-même.`,
        ],
      },
      {
        titre: `Ce que ce module remplace, et ce qu’il ne remplace pas`,
        paragraphes: [
          `La carte à tampons en papier reste la solution la plus simple : aucun outil, aucune donnée personnelle à protéger. Si vous connaissez vos cinquante habitués par leur prénom, elle suffit largement. Elle atteint ses limites quand la clientèle grandit, quand on veut savoir qui ne revient plus, ou quand les cartes se perdent et se contrefont.`,
          `Les applications de fidélité du marché se lancent vite et conviennent si vous acceptez leurs règles. En contrepartie, vos données de clientèle vivent chez l’éditeur, les paliers sont ceux qu’il propose, et certaines formules reposent sur un abonnement ou une commission. Beaucoup de logiciels de caisse incluent aussi une fonction fidélité : si votre caisse actuelle la fait correctement, gardez-la.`,
          `Le programme de Stackup a du sens quand la fidélité doit se relier à vos fiches clients, à votre caisse ou à votre site, avec vos propres règles et des données que vous possédez. Il ne remplace ni l’accueil, ni la qualité de ce que vous vendez, ni une vraie communication : il rend visible la fidélité, il ne la fabrique pas.`,
        ],
      },
      {
        titre: `Pour quels métiers et avec quelle configuration`,
        paragraphes: [
          `Le module sert surtout aux commerces où l’on revient souvent : la [boulangerie-pâtisserie](/creation-site-internet/boulangerie-patisserie), le [salon de coiffure](/creation-site-internet/salon-coiffure), l’institut de beauté, le café et salon de thé ou le restaurant qui a ses habitués.`,
          `La configuration type associe le programme à des [fiches clients](/solutions/crm-sur-mesure), pour retrouver chacun, à la [caisse](/solutions/caisse-enregistreuse) pour créditer les points sans double saisie, et à la prise de rendez-vous en ligne pour les métiers qui travaillent sur rendez-vous. Le tableau de bord montre alors qui revient, et à quel rythme.`,
        ],
      },
      {
        titre: `Budget et mise en place`,
        paragraphes: [
          `Le programme de fidélité est un module de l’outil de gestion. L’outil démarre à partir de {{prix:outil}} € : le socle (connexion sécurisée, base de données, export de vos données) plus un premier module. Le prix exact se fixe au devis écrit, avant tout engagement ; l’[estimateur](/tarifs#estimer) donne un ordre de grandeur en quelques minutes.`,
          `Ce qui fait varier le prix : la complexité des règles (un seul seuil ou plusieurs niveaux), la reprise de votre fichier de clients existant, le lien avec la caisse ou le site, l’application installable en option. Un abonnement facultatif, sans engagement, couvre l’hébergement, les sauvegardes et les correctifs, à partir de {{abo:min}} € par mois ; le [calculateur](/outils/calculateur-abonnement-saas) aide à le comparer à un abonnement logiciel sur plusieurs années.`,
          `Le code vous est cédé selon les conditions du devis et vos données restent exportables à tout moment. Avant de signer, vous pouvez voir votre futur programme dans une démonstration préparée pour votre activité : elle est facturée {{carte:demo}} € à part et n’est pas déduite du devis. Le calendrier se fixe ensemble avant de commencer.`,
        ],
      },
      {
        titre: `Ce qu’il faut préparer avant de commencer`,
        paragraphes: [
          `Le point de départ est une décision d’économie : que pouvez-vous offrir sans abîmer votre marge, et au bout de combien de passages ? Mettez-la par écrit, avec un exemple chiffré de votre côté (en euros de marge, pas en pourcentage de remise).`,
          `Rassemblez ensuite la liste de vos clients réguliers, avec nom et au moins un moyen de contact, en vérifiant que vous avez le droit de les conserver. Prévoyez une phrase d’information pour les clients inscrits, et un accord explicite avant toute offre envoyée par message : les règles de la CNIL sur le sujet se consultent sur cnil.fr. Décidez enfin qui ajoute les points au comptoir, pour que le geste soit le même chaque jour.`,
        ],
      },
    ],
    faq: [
      {
        q: `Un client peut-il tricher avec ses points ?`,
        a: `Les points sont ajoutés par vous ou par votre caisse, jamais par le client lui-même : c’est déjà moins facile à contourner qu’un tampon. Un client enregistré deux fois sous deux fiches reste possible ; la recherche par nom et la fiche client servent à l’éviter, et vous corrigez à la main si cela arrive.`,
      },
      {
        q: `Que deviennent les points si un client demande l’effacement de ses données ?`,
        a: `Chaque personne peut demander la suppression de ses données personnelles. La fiche est alors effacée, et les points avec elle. Prévoyez-le dans vos règles de fonctionnement, et consultez [le lexique sur le RGPD](/lexique/rgpd) ou cnil.fr pour le détail de vos obligations.`,
      },
      {
        q: `Faut-il écrire un règlement du programme ?`,
        a: `C’est recommandé : comment on gagne des points, quand ils expirent, ce que vous pouvez modifier et comment. Quelques lignes claires, affichées en boutique ou sur votre site, évitent les discussions au comptoir. Pour les obligations précises d’information du consommateur, la source est economie.gouv.fr.`,
      },
    ],
  },

  'caisse-enregistreuse': {
    sections: [
      {
        titre: `Le problème, vu depuis le terrain`,
        paragraphes: [
          `Exemple type : un restaurateur encaisse sur une caisse générique. Le soir, il ressaisit les totaux dans un tableur pour son comptable, et le plat du jour, qui change chaque semaine, est rangé dans une ligne « divers » faute de pouvoir le créer rapidement. Les chiffres existent, mais personne ne peut en tirer grand-chose.`,
          `Exemple type : une épicerie fine change des prix d’étiquette plusieurs fois par mois. La caisse n’est pas toujours à jour, le stock n’en sait rien, et la gérante découvre les écarts à l’inventaire. Chaque outil a sa propre version de la vérité.`,
          `Exemple type : une boutique de vêtements gère échanges, retours et périodes de soldes. Sa caisse enregistre la vente, mais pas la cliente : impossible de savoir ce qu’elle a déjà acheté. Une caisse utile parle au catalogue, au stock et aux fiches clients.`,
        ],
      },
      {
        titre: `Comment fonctionne le module de caisse`,
        paragraphes: [
          `Vos produits et vos prix sont ceux du catalogue de l’outil, le même que celui des autres modules. Sur la tablette, vous touchez les articles, le total se calcule, vous indiquez le mode de paiement, et le ticket est édité ou affiché. Un changement de prix dans le catalogue vaut tout de suite pour la caisse.`,
          `À la fin de la journée, le module affiche un récapitulatif : ventes, répartition par mode de paiement, articles les plus vendus. Vous pouvez exporter ces données pour votre comptable. Si le module de stocks est présent, chaque vente fait baisser les quantités sans que vous touchiez à rien. Une option permet de continuer à encaisser sans connexion internet.`,
          `Ce qui reste hors du module : le terminal de carte bancaire est un appareil séparé, fourni par votre banque ou un prestataire de paiement, et le module en note seulement le mode de paiement, sauf connexion spécifique étudiée au cadrage. Compter le tiroir en fin de journée et le comparer au récapitulatif reste votre geste.`,
        ],
      },
      {
        titre: `Ce que ce module remplace, et ce qu’il ne remplace pas`,
        paragraphes: [
          `Il remplace le cahier, la calculette et le ticket écrit à la main, mais aussi la ressaisie du soir. Face à une caisse du marché, matériel et logiciel vendus ensemble, la différence est l’intégration : ici, la caisse est une page de votre propre outil, avec vos produits, vos clients et vos règles.`,
          `Un point doit être dit clairement : un logiciel de caisse est encadré par la loi de lutte contre la fraude à la TVA. Pour les professionnels assujettis à la TVA, il doit garantir l’inaltérabilité des données, leur sécurisation, leur conservation et leur archivage, ce que justifie un certificat ou une attestation de l’éditeur. Les détails et les exceptions se vérifient sur impots.gouv.fr. Nous ne vous promettons pas un certificat que nous n’aurions pas : ce sujet se traite au cadrage, avant tout devis.`,
          `Dans plusieurs cas, un logiciel de caisse du marché, déjà conforme, est préférable : besoin standard, volume de tickets important, restauration avec service en salle complexe (tables, envoi en cuisine), ou simple envie de ne pas y réfléchir. Notre module s’adresse à ceux dont la caisse doit s’emboîter dans un outil sur mesure. L’article sur la [caisse sur mesure](/blog/gestion-caisse-sur-mesure) détaille cette réflexion.`,
        ],
      },
      {
        titre: `Pour quels métiers et avec quelle configuration`,
        paragraphes: [
          `Le module convient aux commerces de comptoir dont la gamme est suivie dans un catalogue : l’[épicerie fine](/creation-site-internet/epicerie-fine), la [boutique de mode](/creation-site-internet/boutique-mode), la cave à vins et spiritueux, le fromager ou le restaurant à la carte simple.`,
          `La configuration type associe la caisse à la [gestion des stocks](/solutions/gestion-stocks), pour que chaque vente fasse baisser les quantités, au programme de fidélité pour créditer les points au passage, et au [tableau de bord](/solutions/tableau-de-bord) pour suivre le chiffre d’affaires. Un commerce qui vend aussi sur internet ajoute le click and collect.`,
        ],
      },
      {
        titre: `Budget et mise en place`,
        paragraphes: [
          `La caisse est un module de l’outil de gestion, qui démarre à partir de {{prix:outil}} € : socle, connexion sécurisée, export de vos données, plus un premier module. Le prix exact figure au devis écrit. L’[estimateur](/tarifs#estimer) donne une première idée en changeant les modules cochés.`,
          `Trois choses le font varier : le travail de conformité décidé au cadrage, les liens avec le stock et les autres modules, et les options comme le fonctionnement sans connexion. Le matériel (tablette, tiroir-caisse, imprimante de tickets, terminal de carte) n’est pas compris et s’achète séparément. L’abonnement facultatif, sans engagement, démarre à partir de {{abo:min}} € par mois ; le [calculateur](/outils/calculateur-abonnement-saas) le met en regard d’un abonnement de caisse sur plusieurs années.`,
          `Le code vous est cédé selon les conditions du devis, et vos ventes restent exportables en permanence. Une démonstration de votre futur écran de caisse peut se faire avant de signer : elle coûte {{carte:demo}} €, facturée à part et non déduite. Le calendrier se fixe ensemble avant de commencer.`,
        ],
      },
      {
        titre: `Ce qu’il faut préparer avant de commencer`,
        paragraphes: [
          `Préparez votre catalogue complet : noms des produits, prix, familles, et surtout le taux de TVA de chaque ligne, que votre comptable peut vous confirmer. Notez aussi les cas particuliers de votre quotidien : remises habituelles, produits au poids, menus, ventes à emporter, consigne.`,
          `Listez le matériel que vous possédez déjà (tablette, tiroir, imprimante, terminal de carte) et les modes de paiement que vous acceptez. Demandez à votre comptable dans quel format il souhaite recevoir les ventes, et si votre statut vous place dans le champ de l’obligation de logiciel sécurisé. Décidez enfin qui ouvre et ferme la caisse chaque jour.`,
        ],
      },
    ],
    faq: [
      {
        q: `Peut-on garder notre terminal de carte bancaire actuel ?`,
        a: `Oui, c’est le cas général : le terminal reste celui de votre banque ou de votre prestataire, et le module note le mode de paiement. Relier les deux pour que le montant passe seul est une connexion à étudier au cadrage, pas une promesse systématique.`,
      },
      {
        q: `Que se passe-t-il si internet coupe en plein service ?`,
        a: `Avec l’option de fonctionnement sans connexion, la caisse continue d’enregistrer les ventes et les envoie quand le réseau revient. Sans cette option, l’encaissement dépend de la connexion : dites-nous au départ si votre local est exposé à ce risque.`,
      },
      {
        q: `Gérez-vous les tables, les commandes en salle et l’envoi en cuisine ?`,
        a: `Ce n’est pas dans le module de base. Cela peut se discuter au cadrage, mais pour un service en salle complexe, avec beaucoup de tables et plusieurs postes, une caisse de restauration spécialisée du marché est souvent la meilleure réponse. Nous vous le dirons franchement.`,
      },
    ],
  },

  'gestion-stocks': {
    sections: [
      {
        titre: `Le problème, vu depuis le terrain`,
        paragraphes: [
          `Exemple type : un caviste reçoit la demande d’un client pour un millésime précis. Il va au rayon, la bouteille n’y est plus, et le tableau du bureau l’annonce encore en stock. Le client repart, et la commande fournisseur est faite trop tard.`,
          `Exemple type : un restaurant commande ses produits frais « au feeling ». Certaines semaines, la chambre froide déborde et on jette ; d’autres, on retire un plat de la carte à midi. Personne ne tient le fil de ce qui entre et de ce qui sort.`,
          `Exemple type : un magasin de sport garde un fichier de plusieurs centaines de références, mis à jour à l’occasion de l’inventaire annuel. Entre-temps, les tailles et les coloris partent sans que le fichier le sache. Le stock est un tableur que tout le monde consulte et que personne ne tient.`,
        ],
      },
      {
        titre: `Comment fonctionne la gestion des stocks`,
        paragraphes: [
          `Chaque article du catalogue reçoit une fiche : nom, référence, unité, quantité actuelle, seuil d’alerte. À la réception d’une livraison, vous enregistrez l’entrée. Chaque sortie fait baisser la quantité : à la main, ou automatiquement quand le module est relié à la caisse ou aux commandes en ligne.`,
          `Quand un article passe sous son seuil, une alerte apparaît à l’écran. Avec le module de commandes fournisseurs, vous partez de cette liste pour préparer un bon de commande à l’intention du fournisseur concerné. Le client ne voit pas le module, mais il en ressent l’effet : moins de ruptures, et un site ou un click and collect qui n’affiche que ce qui existe.`,
          `Automatiques : le calcul des quantités et le déclenchement des alertes. Non automatiques : la décision de commander, et la quantité à commander. Rien ne remplace non plus un comptage réel de temps en temps, car la casse, les erreurs de saisie ou les produits abîmés créent des écarts qu’aucun logiciel ne devine.`,
        ],
      },
      {
        titre: `Ce que ce module remplace, et ce qu’il ne remplace pas`,
        paragraphes: [
          `Il remplace le cahier, la feuille accrochée au mur et le tableur dont la mise à jour dépend de la bonne volonté de chacun. Le tableur reste une bonne solution si vous êtes seul, avec une centaine d’articles et un rythme calme : ne payez pas un outil pour ce qu’une feuille de calcul tient très bien.`,
          `Les logiciels de stock du marché et les ERP sont préférables dès que vos besoins sont très standard, ou très lourds : milliers de références, plusieurs dépôts, suivi par lot, nomenclatures de fabrication. Ils ont des années de fonctions éprouvées, que nous ne prétendons pas égaler. Le module de gestion de caisse du marché inclut parfois un stock simple, qui suffit si la caisse est déjà en place.`,
          `Le module de Stackup trouve sa place quand le stock doit rester cohérent avec le reste de l’activité : la caisse, la boutique en ligne, les fournisseurs, les fiches clients. Il ne remplace ni l’inventaire physique, ni la valorisation comptable du stock pour le bilan, qui reste l’affaire de votre comptable. Voyez aussi notre article sur la [gestion de stock en petit commerce](/blog/gestion-de-stock-petit-commerce-artisan).`,
        ],
      },
      {
        titre: `Pour quels métiers et avec quelle configuration`,
        paragraphes: [
          `Le module sert tous ceux qui vendent ou consomment des produits : l’[épicerie fine](/creation-site-internet/epicerie-fine), la [cave à vins et spiritueux](/creation-site-internet/cave-vins-spiritueux), le magasin de sport, le restaurant ou la librairie-papeterie.`,
          `La configuration type relie les stocks à la [caisse](/solutions/caisse-enregistreuse) pour la baisse automatique à chaque vente, au [click and collect](/solutions/click-and-collect) pour que le site ne vende pas ce qui manque, et au tableau de bord pour voir les produits qui tournent. Les commandes fournisseurs s’ajoutent comme module à part.`,
        ],
      },
      {
        titre: `Budget et mise en place`,
        paragraphes: [
          `La gestion des stocks et les commandes fournisseurs sont deux modules de l’outil de gestion. L’outil complet démarre à partir de {{prix:outil}} €, socle compris. Seule une partie de ce montant concerne ces modules : le devis écrit détaille chaque ligne avant votre accord. L’[estimateur](/tarifs#estimer) permet de tester avec ou sans les commandes fournisseurs.`,
          `Les éléments qui font varier le prix : l’importation de votre fichier de stock existant, le nombre de champs propres à vos articles, le lien avec la caisse ou la boutique en ligne, et l’export comptable. L’abonnement facultatif, sans engagement, démarre à partir de {{abo:min}} € par mois et couvre l’hébergement, les sauvegardes et les correctifs ; le [calculateur](/outils/calculateur-abonnement-saas) le compare à un abonnement logiciel sur plusieurs années.`,
          `Vos données de stock vous appartiennent et sortent en un export, quel que soit le moment. Le code est cédé selon les conditions du devis. Une démonstration préparée sur votre propre catalogue est possible avant de signer, à {{carte:demo}} €, facturée à part et non déduite. Le calendrier se fixe ensemble avant de commencer.`,
        ],
      },
      {
        titre: `Ce qu’il faut préparer avant de commencer`,
        paragraphes: [
          `Le meilleur apport est un inventaire propre le jour du démarrage : une liste complète des articles avec référence, unité (pièce, kilo, bouteille, carton) et quantité réellement comptée. Un stock de départ faux donne des alertes fausses pendant des mois.`,
          `Fixez ensuite un seuil d’alerte pour chaque famille d’articles : à partir de quelle quantité voulez-vous être prévenu ? Rassemblez la liste de vos fournisseurs avec leurs coordonnées, et décidez qui réceptionne les marchandises et enregistre les entrées. Prévoyez enfin une date de contrôle régulier, pour comparer le stock affiché au stock réel.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment éviter que le stock affiché diffère du stock réel ?`,
        a: `En enregistrant les entrées dès la réception et en comptant physiquement de temps en temps. Les écarts viennent de la casse, des offerts, des erreurs de saisie : le module les rend visibles, il ne les supprime pas. Vous corrigez alors la quantité d’un article en quelques secondes.`,
      },
      {
        q: `Peut-on suivre plusieurs lieux de stockage, comme une boutique, une réserve et un camion ?`,
        a: `Le module de base suit un stock par article. Plusieurs lieux de stockage se discutent au cadrage, sans promesse automatique. Si vos besoins ressemblent à ceux d’une logistique multi-dépôts, un logiciel de stock spécialisé du marché sera sans doute plus adapté.`,
      },
      {
        q: `Le module calcule-t-il ce qu’il faut commander ?`,
        a: `Il vous prévient quand un article passe sous son seuil et prépare la liste de ce qui manque. La quantité à commander reste votre décision. Elle dépend de la saison, de vos promotions et de votre trésorerie, que seul votre jugement peut peser.`,
      },
    ],
  },

  'crm-sur-mesure': {
    sections: [
      {
        titre: `Le problème, vu depuis le terrain`,
        paragraphes: [
          `Exemple type : un cabinet d’expertise comptable garde les coordonnées de ses clients dans un logiciel, leurs échanges dans les messageries de chacun, et ses notes dans des carnets. Quand un client appelle, la personne qui décroche cherche dans trois endroits avant de répondre.`,
          `Exemple type : un courtier en crédit rencontre un prospect, promet de le rappeler après la réponse d’une banque, puis l’oublie derrière un dossier plus urgent. Le prospect signe ailleurs. Le courtier n’avait pas de mauvaise volonté, seulement aucun rappel visible.`,
          `Exemple type : un organisme de formation doit retrouver, pour chaque stagiaire, les sessions suivies, les échanges avec l’entreprise et les documents envoyés. Le dossier existe, mais éparpillé. Un CRM, c’est d’abord un seul endroit où se trouve tout ce qui concerne un client.`,
        ],
      },
      {
        titre: `Comment fonctionne le CRM sur mesure`,
        paragraphes: [
          `Chaque client ou prospect a une fiche : coordonnées, entreprise, contacts, notes, historique des échanges. Vous reprenez votre liste existante par un import, puis vous la complétez au fil de l’eau. Quand vous avez un appel, un rendez-vous ou un courrier, vous notez ce qui s’est dit en quelques lignes, daté.`,
          `Pour ne rien oublier, vous programmez une relance sur la fiche, avec une date. Le jour venu, elle apparaît dans votre liste de choses à faire. Selon votre métier, un module de dossiers détaillés ajoute les champs qui comptent chez vous : suivi d’un patient, fiche d’un animal, parcours d’un élève. Les devis et les factures se rattachent à la fiche du client.`,
          `Le client, lui, ne voit pas le CRM, sauf si vous ajoutez un portail client. Automatique : le rangement par client et l’affichage des relances à faire. Non automatique : la saisie. Un CRM est aussi bon que les notes qu’on y prend ; l’outil rend le geste rapide, il ne le fait pas à votre place.`,
        ],
      },
      {
        titre: `Ce que ce module remplace, et ce qu’il ne remplace pas`,
        paragraphes: [
          `Il remplace le carnet d’adresses, le tableur de clients et la mémoire de chacun. Pour une personne seule avec quelques dizaines de contacts, un tableur bien tenu ou un CRM gratuit du marché fait le travail, et nous vous le dirons si c’est votre cas.`,
          `Les CRM du marché ont de vraies forces : intégrations nombreuses, suivi d’une équipe commerciale, automatisation des campagnes, applications mobiles éprouvées. Ils se facturent souvent par utilisateur et vos données se trouvent chez l’éditeur, ce qui est un choix à faire en connaissance de cause. L’article sur le [CRM sur mesure](/blog/crm-sur-mesure-pme) en détaille le compromis.`,
          `Le CRM de Stackup est utile quand les fiches doivent ressembler à votre métier, se relier à vos devis et à vos factures, et vivre dans un outil que vous possédez. Il ne remplace pas une démarche commerciale, une messagerie ni un logiciel de campagnes d’e-mails massives. Voir aussi le terme [CRM dans le lexique](/lexique/crm).`,
        ],
      },
      {
        titre: `Pour quels métiers et avec quelle configuration`,
        paragraphes: [
          `Le module sert les activités où la relation dure et où l’historique compte : l’[avocat](/creation-site-internet/avocat), l’[expert-comptable](/creation-site-internet/expert-comptable), le [courtier en crédit](/creation-site-internet/courtier-credit), l’organisme de formation ou l’agence immobilière.`,
          `La configuration type associe le CRM à la [gestion des devis et des factures](/solutions/gestion-devis-factures), à la prise de rendez-vous en ligne et, quand les clients doivent consulter leurs documents, au portail client. Les fiches clients font déjà partie du logiciel de gestion de la démonstration en ligne.`,
        ],
      },
      {
        titre: `Budget et mise en place`,
        paragraphes: [
          `Le CRM s’appuie sur deux modules, les fiches clients et les dossiers détaillés propres à votre métier. L’outil complet démarre à partir de {{prix:outil}} €, socle, connexion sécurisée et export de vos données compris. Le devis écrit précise ce qui relève de chaque module. L’[estimateur](/tarifs#estimer) donne un premier ordre de grandeur.`,
          `Le prix varie avec la complexité des fiches (nombre de champs propres à votre métier), l’import de vos contacts, le nombre de rôles et de droits à distinguer, et les liens avec les devis, les factures ou le site. L’abonnement facultatif, sans engagement, démarre à partir de {{abo:min}} € par mois. Comparez-le à ce que vous payez aujourd’hui avec le [calculateur d’abonnement](/outils/calculateur-abonnement-saas).`,
          `Le code et les données vous appartiennent : l’export est inclus dans le socle, et le code est cédé selon le devis. Les fiches peuvent être vues dans la démonstration en ligne ; pour voir votre propre CRM avant de signer, une démonstration dédiée coûte {{carte:demo}} €, facturée à part et non déduite du devis.`,
        ],
      },
      {
        titre: `Ce qu’il faut préparer avant de commencer`,
        paragraphes: [
          `Exportez vos contacts actuels en fichier de tableur, et nettoyez-les : doublons, adresses incomplètes, anciens clients à garder ou non. Un import est aussi propre que le fichier d’origine. Décidez des catégories qui comptent pour vous : client, prospect, partenaire, ancien client.`,
          `Listez ensuite les informations que vous voulez voir sur une fiche : ce que vous cherchez à chaque appel, ce que vous regrettez de ne pas avoir noté. Fixez les règles de relance et de conservation des données personnelles, en vous aidant de cnil.fr. Décidez enfin qui saisit quoi, car un CRM tenu par une seule personne se vide vite.`,
        ],
      },
    ],
    faq: [
      {
        q: `Que faire des doublons au moment de l’import ?`,
        a: `Le plus sûr est de les traiter dans votre fichier avant l’import : un même contact écrit de deux façons deviendra deux fiches. Après l’import, une revue rapide des fiches principales permet de corriger ce qui reste.`,
      },
      {
        q: `Les e-mails que je reçois apparaissent-ils dans la fiche du client ?`,
        a: `Les échanges se notent dans la fiche. Relier automatiquement une messagerie est une connexion à étudier au cadrage, qui dépend de votre fournisseur de messagerie ; nous ne la promettons pas d’office.`,
      },
      {
        q: `Comment protéger des informations sensibles dans un CRM ?`,
        a: `En limitant ce que vous notez à ce qui est utile, en réglant les droits d’accès par personne et en vous connectant de façon sécurisée. Certaines données, comme celles de santé, demandent des précautions supplémentaires : consultez le lexique sur les données personnelles et cnil.fr avant de les saisir.`,
      },
    ],
  },

  'portail-client': {
    sections: [
      {
        titre: `Le problème, vu depuis le terrain`,
        paragraphes: [
          `Exemple type : un cabinet d’expertise comptable reçoit des pièces par e-mail, en photo, parfois en pièce jointe trop lourde qui rebondit. Chaque fin de trimestre, il faut relancer, retrouver, renommer. Les clients, eux, ne savent plus ce qu’ils ont déjà envoyé.`,
          `Exemple type : un architecte échange des plans avec ses clients. Trois versions circulent par e-mail, et personne ne sait laquelle est la dernière. Le client appelle pour demander « le bon fichier », et l’architecte passe du temps à le chercher.`,
          `Exemple type : un organisme de formation envoie convocations, attestations et factures à chaque stagiaire ou entreprise. Un destinataire change d’adresse, un message tombe dans les courriers indésirables, et la facture « jamais reçue » devient un sujet de relance. Un portail déplace le document : ce n’est plus vous qui l’envoyez, c’est le client qui vient le chercher.`,
        ],
      },
      {
        titre: `Comment fonctionne le portail client`,
        paragraphes: [
          `Vous créez l’accès d’un client, qui reçoit une invitation avec une connexion sécurisée. Il n’installe rien : il se connecte depuis son navigateur, sur ordinateur ou téléphone. Il arrive sur son espace, où il retrouve ses devis, ses factures et les documents que vous avez rangés pour lui, classés par dossier.`,
          `Quand vous déposez un nouveau document, une notification prévient le client. Chacun ne voit que ses propres éléments : les rôles et les droits distinguent ce que voit un client, un collaborateur ou vous. Le dépôt de documents par le client lui-même, dans l’autre sens, se décide au cadrage selon votre activité.`,
          `Automatiques : l’affichage des documents du bon client et l’envoi des notifications. Non automatiques : le dépôt et le classement, qui restent à vous, et la signature électronique, qui passe par un service spécialisé ajouté en module à part. Voyez le terme signature électronique pour ce que cela recouvre.`,
        ],
      },
      {
        titre: `Ce que ce module remplace, et ce qu’il ne remplace pas`,
        paragraphes: [
          `Il remplace l’e-mail avec pièces jointes comme canal principal d’échange de documents, et les services de partage de fichiers grand public utilisés faute de mieux. Ces derniers restent suffisants pour quelques clients occasionnels : si vous échangez des fichiers avec cinq personnes dans l’année, un dossier partagé bien protégé fera l’affaire.`,
          `Beaucoup de logiciels métier, de comptabilité ou de gestion de dossiers proposent leur propre espace client. S’il couvre votre besoin, utilisez-le : inutile de multiplier les portails. Le sur-mesure se justifie quand vous voulez un espace unique, à vos couleurs, qui rassemble devis, factures et documents venant de plusieurs outils, avec des données que vous possédez.`,
          `Un portail ne remplace pas vos obligations de confidentialité. Si votre profession est tenue au secret ou à des règles déontologiques, c’est à vous de vérifier ce qui est permis, auprès de votre ordre ou de votre instance professionnelle. Il ne remplace pas non plus un échange direct : c’est un classeur partagé, pas une messagerie. Notre article sur le [portail client et l’extranet](/blog/portail-client-extranet) approfondit ces limites.`,
        ],
      },
      {
        titre: `Pour quels métiers et avec quelle configuration`,
        paragraphes: [
          `Le module sert les professionnels qui échangent régulièrement des documents avec leurs clients : l’[expert-comptable](/creation-site-internet/expert-comptable), l’[avocat](/creation-site-internet/avocat), l’[architecte](/creation-site-internet/architecte), l’organisme de formation ou le diagnostiqueur immobilier.`,
          `La configuration type relie le portail aux fiches clients, pour qu’un accès corresponde à une vraie fiche, et à la gestion des devis et des factures, pour que les documents arrivent d’eux-mêmes. Le [tableau de bord](/solutions/tableau-de-bord) montre ensuite qui s’est connecté et ce qui reste en attente.`,
        ],
      },
      {
        titre: `Budget et mise en place`,
        paragraphes: [
          `Le portail repose sur deux modules : l’espace client et les documents partagés. L’outil complet démarre à partir de {{prix:outil}} €, socle et connexion sécurisée compris. Le devis écrit détaille chaque module. L’[estimateur](/tarifs#estimer) permet d’en voir l’effet en cochant ou non l’espace client.`,
          `Le prix varie selon le nombre de types de documents, les rôles et droits à distinguer, la reprise de vos documents existants, et la signature électronique si vous la voulez. L’hébergement des documents influe aussi sur l’abonnement facultatif, sans engagement, qui démarre à partir de {{abo:min}} € par mois ; ses conditions sont écrites au devis. Le [calculateur](/outils/calculateur-abonnement-saas) aide à comparer avec un abonnement d’espace client du marché.`,
          `Le code est cédé selon les conditions du devis et vos données restent exportables. Une démonstration de votre futur portail, avec un compte client d’essai, peut être préparée avant de signer : elle coûte {{carte:demo}} €, facturée à part et non déduite du devis.`,
        ],
      },
      {
        titre: `Ce qu’il faut préparer avant de commencer`,
        paragraphes: [
          `Dressez d’abord la liste des clients à inviter, avec une adresse e-mail valide pour chacun. Dessinez l’arborescence des dossiers telle que vous la voulez : par client, par année, par affaire, par type de document. Un bon classement dès le départ évite de tout reprendre ensuite.`,
          `Décidez qui, chez vous, voit quoi : vous seul, vos collaborateurs, un assistant. Rassemblez les documents existants à reprendre, et rédigez le message d’invitation que recevront vos clients, car un portail dont on ignore l’existence reste vide. Vérifiez enfin les règles de conservation de votre profession, qui peuvent imposer des durées précises.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment s’assurer qu’un client ne voit jamais le dossier d’un autre ?`,
        a: `Chaque document est rattaché à un client ou un dossier, et les droits limitent l’affichage à ce rattachement. Avant la mise en ligne, la recette se fait avec des comptes de test : vous vérifiez par vous-même qu’un compte ne voit que ses propres éléments.`,
      },
      {
        q: `Peut-on envoyer un document à signer depuis le portail ?`,
        a: `Oui, grâce à un service de signature électronique spécialisé, relié en module à part. Nous ne fabriquons pas la signature elle-même, ce qui est une bonne chose : sa valeur juridique repose sur le prestataire qui la fournit.`,
      },
      {
        q: `Que devient le portail si je change de prestataire ?`,
        a: `Le code vous est cédé selon les conditions du devis et vos documents sortent par l’export de l’outil. Vous pouvez donc confier la suite à un autre développeur. Notre article sur la [propriété de son logiciel](/blog/posseder-son-logiciel-quitter-abonnements) détaille ce point.`,
      },
    ],
  },
}
