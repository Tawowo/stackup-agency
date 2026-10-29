---
title: "Gérer son stock quand on est petit commerçant ou artisan"
seoTitle: "Gestion de stock pour artisan et petit commerce : méthode"
excerpt: "Excel suffit-il ? Alerte de stock bas, inventaire, commandes et factures fournisseurs : une méthode simple pour artisans et commerçants, étape par étape."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 14
tag: "Applications métier"
category: "applications-metier"
type: "guide"
keywords: ["comment gérer son stock quand on est artisan", "excel suffit-il pour gérer un stock", "alerte de stock bas", "comment suivre les commandes fournisseurs", "comment classer ses factures fournisseurs", "gestion de stock simple pour artisan"]
sources: ["https://www.impots.gouv.fr", "https://www.service-public.fr"]
---

**Pour gérer un stock simplement, notez chaque entrée et chaque sortie, fixez un seuil minimum par article et comptez réellement ce que vous avez en rayon ou en atelier à intervalles réguliers. Un tableur suffit tant que vous avez peu de références et une seule personne qui le tient à jour ; au-delà, un outil partagé qui prévient quand il faut recommander évite les ruptures et les achats en double.**

Ce guide s'adresse au boulanger, à la fleuriste, au plombier qui garde des raccords et des chaudières en réserve, à la caviste, au paysagiste qui stocke des végétaux et du petit matériel. Il couvre le stock lui-même, puis la chaîne qui l'entoure : commandes fournisseurs, factures reçues, classement. Pour une vue d'ensemble plus générale de la gestion des stocks en commerce, l'article [gestion des stocks pour petit commerce](/blog/gestion-stocks-digitale) pose le cadre ; ici, on entre dans la pratique quotidienne.

## Comment gérer son stock quand on est artisan ou petit commerçant ?

Un stock est de l'argent immobilisé sur une étagère. Trop peu, et vous refusez des ventes ou retardez un chantier. Trop, et vous payez des produits qui dorment, qui se périment ou qui se démodent. La gestion de stock sert à garder l'équilibre, pas à faire de la comptabilité savante.

Commencez par trancher trois questions :

1. **Qu'est-ce qui entre dans le stock ?** Pour un plombier, les pièces qu'il garde dans la camionnette et l'atelier. Pour un coiffeur, les produits de revente et ceux utilisés en cabine. Pour une boulangère, les matières premières périssables. Ne comptez que ce dont l'absence vous pénalise.
2. **À quelle vitesse bouge chaque article ?** Les produits qui sortent chaque semaine méritent un suivi serré ; ceux qui sortent deux fois l'an, un comptage occasionnel.
3. **Qu'est-ce qui coûte cher si l'on en manque ?** Une vis à bois peut se racheter le lendemain ; une pièce spécifique à commander immobilise un chantier. Les articles critiques passent en premier.

Une fois ce tri fait, la méthode tient en quatre gestes : **enregistrer les mouvements, fixer des seuils, compter, recommander**. Tout le reste en découle.

## Excel suffit-il pour gérer un stock ?

Oui, pour beaucoup de petites structures, et pendant longtemps. Un tableur est gratuit (ou déjà installé), flexible, et vous le comprenez. Il atteint ses limites quand l'un de ces cas apparaît :

- plusieurs personnes saisissent en même temps (versions différentes du fichier, cellules écrasées) ;
- vous avez besoin de la donnée **sur le terrain** : au dépôt, dans le véhicule, en magasin, depuis un téléphone ;
- vous voulez être **prévenu** quand un article passe sous un seuil, plutôt que de découvrir la rupture en ouvrant le tiroir ;
- le tableau grossit et ralentit, avec des formules que personne n'ose plus toucher.

### Tableau Excel de gestion de stock : les colonnes utiles

Voici le minimum, à adapter. Un modèle de départ gratuit se construit en dix minutes avec ces colonnes :

| Colonne | À quoi elle sert |
|---|---|
| Référence ou nom court | Retrouver l'article sans ambiguïté |
| Catégorie | Filtrer (consommables, pièces, revente…) |
| Emplacement | Savoir où le chercher |
| Unité | Pièce, mètre, litre, carton |
| Quantité en stock | Ce qu'il y a réellement |
| Seuil minimum | En dessous, on recommande |
| Quantité à commander | Le lot habituel |
| Fournisseur | Qui appeler |
| Dernier prix d'achat | Suivre les évolutions |
| Date de dernier comptage | Savoir si l'info est fiable |

Ajoutez une feuille « mouvements » (date, article, entrée ou sortie, quantité, motif) : la quantité en stock se calcule alors depuis les mouvements, ce qui évite d'écraser la valeur à la main et permet de retrouver une erreur.

Conseil pratique : une cellule qui se colore quand la quantité tombe sous le seuil (mise en forme conditionnelle) donne déjà un début d'alerte, à condition d'ouvrir le fichier.

## Gestion de stock simple pour artisan : cinq règles qui évitent la plupart des problèmes

- **Un emplacement par article.** Ce qui n'a pas de place fixe se perd. Une étiquette suffit.
- **Une sortie notée dès qu'elle a lieu.** Pas en fin de semaine. Un carnet dans le véhicule ou une note vocale ramenée au bureau fait l'affaire à défaut de mieux.
- **Un seuil minimum par article critique**, calculé sur le délai de réapprovisionnement : si le fournisseur met quelques jours à livrer et que vous en consommez une certaine quantité par semaine, le seuil couvre cette période.
- **Un stock de sécurité raisonnable** pour les pièces qui bloquent un chantier.
- **Un responsable** : une seule personne est chargée de vérifier le tableau et de lancer les commandes, même si plusieurs saisissent.

Ces règles semblent évidentes. En pratique, ce sont les sorties non notées qui faussent presque tous les stocks de petite entreprise.

## Alerte automatique de rupture de stock : comment la mettre en place ?

Une alerte de stock bas prévient avant la rupture, pas après. Selon l'outil, trois niveaux existent.

**Dans un tableur** : mise en forme conditionnelle, ou une colonne « à commander » qui affiche « oui » quand la quantité est inférieure ou égale au seuil. C'est gratuit et immédiat, mais passif.

**Avec un tableur en ligne partagé** : certains services de feuilles de calcul permettent d'envoyer un e-mail quand une condition est remplie. Le résultat est correct, mais le montage reste fragile (une colonne déplacée peut tout casser).

**Avec un outil sur mesure** : l'outil envoie un message (e-mail ou notification) à la bonne personne quand un seuil est franchi, regroupe les articles à recommander par fournisseur et prépare le bon de commande. C'est le seul niveau où l'alerte et la commande se suivent.

Dans les trois cas, le plus difficile est de **choisir de bons seuils**, pas de déclencher l'alerte. Un seuil trop bas prévient trop tard ; trop haut, il submerge de messages que l'on cesse de lire. Révisez-les après les premières semaines d'usage, puis à chaque saison si votre activité est saisonnière.

## Comment faire un inventaire de stock facilement ?

Un inventaire complet est utile une à deux fois par an, notamment pour la clôture comptable : votre comptable vous dira ce dont il a besoin. Entre-temps, il vaut mieux faire des **comptages tournants**.

1. **Découpez le stock en zones ou en catégories.** Une semaine, l'étagère des raccords ; la suivante, celle des joints.
2. **Comptez à deux** quand c'est possible, sans regarder la quantité attendue, pour ne pas être influencé.
3. **Notez l'écart** entre le comptage et le fichier, et son motif probable (casse, perte, erreur de saisie, vol).
4. **Corrigez par un mouvement « ajustement »**, pas en écrasant la quantité : on garde la trace.
5. **Priorisez les articles chers et les articles critiques**, qu'on compte plus souvent.

Pour un commerce, évitez de compter pendant l'affluence. Pour un artisan, faites-le avant une grosse période de chantiers plutôt qu'au milieu. Si vous gérez beaucoup de références, un lecteur de codes-barres ou la caméra d'un téléphone accélère le comptage, mais la méthode reste la même.

## Comment suivre les commandes fournisseurs ?

La commande est le moment où l'on perd le plus facilement la trace : un appel, un e-mail, un « je repasse demain », puis plus rien. Pour suivre sans effort :

- **Un statut par commande** : à passer, passée, partiellement reçue, reçue, litigieuse.
- **Les dates** : date de commande, date promise, date de réception réelle. Le fournisseur qui annonce une date et la repousse trois fois se repère ainsi.
- **Le rapprochement** à la réception : bon de livraison, commande et facture doivent concorder. Une ligne manquante se signale tout de suite, pas trois semaines plus tard.
- **Une trace de la conversation** : le devis ou l'e-mail du fournisseur est rattaché à la commande.

Pour un tableur, un onglet « commandes » avec ces colonnes suffit. Le jour où vous en passez beaucoup, un outil qui relie article, fournisseur et commande évite de tout saisir deux fois.

## Comment automatiser la commande de fournitures auprès de ses fournisseurs ?

Automatiser ne veut pas dire que l'outil commande seul à votre place. C'est rarement souhaitable. On automatise **la préparation** :

1. L'outil détecte les articles sous le seuil.
2. Il les regroupe par fournisseur et propose les quantités habituelles.
3. Vous relisez, ajustez, validez.
4. Il génère le bon de commande ou le message à envoyer (e-mail, formulaire du fournisseur).
5. Il enregistre la commande et attend la réception.

Un commerçant qui commande chaque semaine auprès des mêmes trois fournisseurs gagne du temps dès que la liste est préremplie. Un artisan qui commande à la demande, chantier par chantier, a plutôt intérêt à rattacher chaque achat au chantier concerné : voir [l'article sur le suivi des chantiers](/blog/logiciel-planning-chantiers-interventions).

La commande automatique à 100 % ne convient qu'aux consommables à demande très régulière et aux fournisseurs fiables. Pour tout le reste, la validation humaine est une bonne protection contre les erreurs et les promotions mal comprises.

## Comment automatiser la saisie de ses factures fournisseurs ?

Le gain de temps est réel, mais il passe par trois étapes qu'il ne faut pas confondre.

**Réception.** Les factures arrivent par e-mail, par courrier, par un portail du fournisseur. Première simplification : une adresse e-mail dédiée aux factures d'achat, où tout est transféré.

**Lecture.** Un logiciel de reconnaissance de texte extrait le fournisseur, la date, les montants, les lignes. Certains services utilisent l'intelligence artificielle pour cela. Le résultat est utile mais **jamais parfait** : un chiffre mal lu, une ligne de remise oubliée, une facture au format inhabituel. Il faut donc une étape de **vérification humaine** rapide, surtout pour tout ce qui sert à la comptabilité ou à la TVA.

**Enregistrement.** Les données validées alimentent le stock (mise à jour des prix d'achat, des quantités reçues), la liste des commandes et, si vous en avez un, votre outil de comptabilité ou le fichier que votre comptable consulte.

Une vraie question à se poser avant d'acheter un outil de lecture : **que devient le document ?** Les factures contiennent des données de vos fournisseurs et de vos clients. Vérifiez où elles sont traitées et conservées, et si vous pouvez tout récupérer en cas de changement d'outil. Un outil sur mesure peut recevoir un export de votre logiciel de facturation sans passer par un service tiers ; ce n'est pas indispensable, mais c'est un critère.

## Dois-je pouvoir recevoir des factures électroniques de mes fournisseurs ?

La réforme française de la facturation électronique prévoit que toutes les entreprises assujetties à la TVA doivent pouvoir **recevoir** des factures électroniques par l'intermédiaire de plateformes agréées, tandis que l'**émission** est étalée dans le temps selon la taille de l'entreprise. Le calendrier a été modifié plusieurs fois depuis la première loi de finances qui l'a instauré. Pour ne pas vous tromper, vérifiez les dates et les modalités actuelles sur impots.gouv.fr avant toute décision.

Conséquences pratiques pour votre gestion de stock et d'achats :

- vos fournisseurs vous enverront de plus en plus leurs factures dans un format structuré, via une plateforme, plutôt qu'en PDF par e-mail ;
- vous aurez besoin d'une plateforme agréée (la vôtre ou celle de votre comptable) pour les recevoir ;
- ces factures contiennent des données lisibles par machine : elles peuvent alimenter automatiquement vos commandes et vos prix d'achat, ce qui réduit la saisie.

Notre page [facture électronique](/services/facture-electronique) explique ce que nous pouvons mettre en place. Une [checklist de préparation](/outils/checklist-facture-electronique) est également proposée pour faire le point sur votre situation. Concernant la partie émission de vos propres factures et devis, voir [le guide sur les logiciels de devis et de facturation pour artisan](/blog/logiciel-de-devis-et-facturation-artisan-comment-choisir).

## Comment classer ses factures fournisseurs ?

Une règle simple vaut mieux qu'un système compliqué qu'on abandonne. Voici une organisation que l'on retrouve chez beaucoup de petites entreprises :

- **Un dossier par année**, puis **un dossier par fournisseur** (ou par mois, si vous avez peu de fournisseurs mais beaucoup de factures).
- **Un nom de fichier normalisé** : date, fournisseur, numéro de facture. Exemple : « 2026-10-12_Grossiste-Dupont_F2041.pdf ». Un nom identique pour tous évite les doublons et facilite la recherche.
- **Un statut visible** : à payer, payée, rapprochée avec la commande.
- **Un lien avec la commande** : le fichier est rattaché à la ligne de commande correspondante dans votre suivi.
- **Une sauvegarde** : jamais un seul exemplaire sur un seul disque.

Ce classement vaut pour le numérique comme pour le papier scanné.

## Où stocker ses factures électroniques ?

D'abord, combien de temps ? Les pièces comptables se conservent en général dix ans, selon le Code de commerce, mais confirmez votre cas et le format avec votre comptable ou sur service-public.fr. Ensuite, où ?

- **Dans un espace dont vous gardez le contrôle** : un stockage en ligne à votre nom, avec une sauvegarde indépendante. Évitez les adresses e-mail comme seul lieu de conservation : une boîte pleine, un compte supprimé ou un changement de fournisseur et les pièces disparaissent.
- **Dans leur format d'origine** : pour une facture électronique, l'original est le fichier structuré reçu, pas son impression ou sa capture. Conservez le fichier tel qu'il est arrivé.
- **Avec un accès pour votre comptable**, soit par un dossier partagé, soit par un export régulier.
- **Avec une restauration testée** : essayez de retrouver une facture d'il y a deux ans. Si vous n'y arrivez pas en quelques minutes, l'organisation n'est pas bonne.

## Quand passer du tableur à un outil sur mesure ?

Un tableur reste la bonne réponse tant que vous êtes seul, avec un nombre limité de références et sans besoin de terrain. Un outil sur mesure devient pertinent quand plusieurs des signes suivants apparaissent :

- vous faites des ruptures ou des doublons d'achat régulièrement ;
- plusieurs personnes (atelier, magasin, véhicules) doivent lire et mettre à jour le stock ;
- vous passez des heures à ressaisir des factures ou des bons de livraison ;
- vos données sont éparpillées entre un tableur, un carnet, un logiciel de caisse et une boîte mail ;
- vous voulez un tableau de bord simple : valeur du stock, articles qui dorment, fournisseurs les plus sollicités.

La limite d'un outil sur mesure est son coût de départ et le fait qu'il dépend d'un prestataire pour évoluer. À l'inverse, il épouse votre façon de travailler et vous n'en êtes pas locataire. Notre offre d'outil démarre à partir de {{prix:outil}} € selon le périmètre ; le détail se trouve sur la page [logiciel de gestion](/services/logiciel-de-gestion). Pour estimer votre cas, [l'estimateur de tarifs](/tarifs) donne un ordre de grandeur et vous pouvez ensuite [nous écrire](/contact).

## Questions fréquentes

**Quelle est la différence entre stock minimum et stock de sécurité ?**
Le stock minimum est le seuil qui déclenche une commande. Le stock de sécurité est la marge supplémentaire gardée pour absorber un retard de livraison ou une demande imprévue. Le premier prévient, le second protège.

**Faut-il suivre la valeur du stock ?**
Pour la comptabilité, oui, au moins à la clôture : votre comptable valorise le stock à partir de votre inventaire. Pour la gestion courante, le suivi des quantités et des seuils est plus utile que le calcul de la valeur.

**Comment gérer des produits périssables ?**
Notez la date limite de consommation ou de péremption par lot, et sortez d'abord les lots les plus anciens. C'est le principe du premier entré, premier sorti. Dans l'alimentaire, les règles d'hygiène et de traçabilité s'ajoutent : renseignez-vous auprès des organismes officiels.

**Un logiciel de caisse suffit-il à gérer le stock ?**
Beaucoup de logiciels de caisse décrémentent le stock à chaque vente, ce qui est un bon début pour un commerce. Ils couvrent moins bien les achats, les pertes, les matières premières et les chantiers. Vérifiez ce que le vôtre permet avant d'ajouter un autre outil.

**Que faire d'un stock qui ne tourne plus ?**
Identifiez-le dans votre inventaire (date de dernière sortie), puis décidez : promotion, utilisation dans un chantier, retour fournisseur si possible, ou sortie du stock. Et ajustez vos seuils pour ne pas le racheter.
