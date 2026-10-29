---
title: "Factur-X, UBL, CII : quel format pour la facture électronique ?"
seoTitle: "Factur-X, UBL, CII : quel format de facture choisir"
excerpt: "Factur-X, UBL ou CII : ce que signifient ces formats, lequel utiliser pour une petite entreprise et comment produire ou lire une facture électronique."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 10
tag: "Facture électronique"
category: "juridique"
type: "reglementation"
keywords: ["quel format de facture électronique choisir", "factur-x c’est quoi", "différence entre factur-x ubl et cii", "format ubl facture", "xml facture électronique c’est quoi", "générer une facture factur-x gratuitement"]
sources: ["https://www.impots.gouv.fr", "https://www.economie.gouv.fr", "https://www.legifrance.gouv.fr"]
---

**Trois formats sont prévus pour la facture électronique : Factur-X (un PDF qui embarque ses données), UBL et CII (deux formats XML, sans PDF). Pour une petite entreprise, le choix se fait rarement à la main : c’est votre logiciel ou votre plateforme agréée qui produit le bon format, et Factur-X est le plus facile à lire.**

Un format de facture électronique est la manière dont les informations de la facture sont écrites pour qu’une machine les lise. Cette page explique les différences sans jargon inutile, ce qu’il faut vérifier avant de choisir un outil et comment ouvrir ou fabriquer un fichier. Les règles et les spécifications évoluent : confirmez le point sur les sites officiels ([impots.gouv.fr](https://www.impots.gouv.fr), [economie.gouv.fr](https://www.economie.gouv.fr)).

## Quel format de facture électronique choisir pour une petite entreprise ?

La réponse courte : celui que votre outil sait produire correctement, parmi les formats acceptés. Les plateformes agréées doivent traiter les formats prévus par la réforme, ce qui signifie qu’une facture bien formée dans l’un d’eux sera transmise. Vous n’avez donc pas à vous demander si votre client acceptera tel format : la plateforme se charge de la conversion et de l’acheminement dans le cadre prévu.

Votre vrai choix porte sur l’outil :

- **Un logiciel de facturation** qui génère le bon format en un clic, sans que vous voyiez jamais un fichier XML.
- **Une plateforme agréée** qui reçoit votre facture au format de votre logiciel et la transmet.
- **Un outil sur mesure** relié à une plateforme, quand vos besoins sont particuliers.

Si vous voulez maîtriser le sujet, retenez la règle générale : privilégiez un format hybride lisible par un humain (Factur-X) quand c’est possible, car vos clients, votre comptable et vous pouvez ouvrir le document comme un PDF habituel. Si votre client est une grande structure, elle peut préférer l’un des deux formats XML, mais cela se règle automatiquement entre plateformes.

## Factur-X : qu’est-ce que c’est et comment ça marche ?

Factur-X est un format franco-allemand qui combine deux éléments dans un seul fichier :

1. **Une facture au format PDF**, lisible à l’écran et imprimable, comme une facture habituelle.
2. **Un fichier de données XML**, intégré dans le PDF, que les logiciels lisent automatiquement.

Autrement dit, la même facture est à la fois un document pour l’humain et un jeu de données pour la machine. Le PDF utilisé est de type archivage (PDF/A-3), qui permet d’y glisser des pièces jointes. Le XML intégré suit la syntaxe CII (voir plus bas).

Une règle d’or : les deux parties doivent dire la même chose. Si le montant du PDF diffère de celui du XML, la facture est incohérente et risque d’être rejetée. C’est pourquoi on ne fabrique pas un Factur-X à la main : on utilise un outil qui génère les deux à partir des mêmes données.

### Les profils de Factur-X

Factur-X existe en plusieurs niveaux de détail, appelés profils : minimum, basique sans lignes, basique, EN 16931 (le profil « standard » européen) et étendu. Plus le profil est élevé, plus il contient d’informations structurées (lignes de facture, taxes, références). Les profils les plus légers ne portent pas le détail des lignes et ne conviennent pas à une facture complète. Pour la facture électronique réglementaire, le profil à viser est en général le profil EN 16931 ou un profil équivalent, à confirmer auprès de votre plateforme. Un bon logiciel choisit le bon profil à votre place.

## UBL : qu’est-ce que ce format ?

UBL (Universal Business Language) est un format XML standardisé, utilisé dans de nombreux pays. Il n’existe qu’en données : il n’y a pas de PDF intégré. Il est très utilisé dans les échanges entre systèmes informatiques, notamment dans les grandes organisations et dans les réseaux européens d’échange de factures. Pour un humain, un fichier UBL brut est illisible : il faut un logiciel qui l’affiche sous forme de document.

Si vous êtes une petite entreprise, vous n’aurez presque jamais à écrire en UBL. Vous le rencontrerez surtout lorsqu’un client très organisé vous envoie sa facture sous cette forme, ou lorsque votre logiciel offre le choix entre plusieurs formats d’export.

## CII : qu’est-ce que ce format ?

CII (Cross Industry Invoice) est un autre format XML, défini par l’organisme international de normalisation des échanges commerciaux (UN/CEFACT). Il joue deux rôles : il peut être utilisé seul comme fichier XML de facture, et il constitue la partie « données » de Factur-X. Comme l’UBL, il est fait pour être lu par des logiciels.

### Quelle est la différence entre Factur-X, UBL et CII ?

| | Factur-X | UBL | CII |
|---|---|---|---|
| Nature | PDF + données XML intégrées | Fichier XML | Fichier XML |
| Lisible par un humain | Oui, comme un PDF | Non, sans logiciel | Non, sans logiciel |
| Lisible par un logiciel | Oui | Oui | Oui |
| Usage typique | TPE, PME, comptables | Grandes organisations, échanges entre systèmes | Échanges entre systèmes, base de Factur-X |
| Complexité pour vous | Faible avec un bon outil | Gérée par l’outil | Gérée par l’outil |

Les trois s'appuient sur la même norme européenne de contenu de facture, qui définit quelles informations une facture électronique doit contenir. Ce sont trois « emballages » d'un même contenu.

## XML : c’est quoi dans une facture électronique ?

XML est un langage de balises, qui range des informations dans des cases nommées : `SellerTradeParty` pour le vendeur, `GrandTotalAmount` pour le total TTC, par exemple. C’est ce qui permet à un logiciel de lire « le montant TTC » sans deviner où il se trouve dans un texte. Ouvert dans un éditeur de texte, un fichier XML ressemble à une longue suite de lignes avec des chevrons : lisible, mais austère.

### Comment lire ou ouvrir une facture XML ?

Voici les solutions, de la plus simple à la plus technique :

- **Demandez la version lisible.** Votre plateforme ou votre logiciel de facturation affiche la facture reçue sous forme de document ; c’est la méthode normale.
- **Ouvrez un Factur-X comme un PDF.** Un lecteur de PDF affiche la facture. Les données XML sont dans les pièces jointes du fichier (souvent repérables à l’icône de trombone dans le lecteur).
- **Utilisez un visualiseur.** Des outils en ligne et des bibliothèques libres convertissent un XML de facture en document lisible. Avant d’y envoyer une facture réelle, vérifiez ce que devient le fichier : une facture contient des données de vos clients et de vos prix.
- **Ouvrez le XML dans un navigateur ou un éditeur de texte.** C’est possible, mais cela n’a d’intérêt que pour un contrôle technique.

Conclusion pratique : vous ne devriez pas avoir à lire du XML. Si vous y êtes contraint, c’est que votre outil n’est pas adapté.

## Comment générer ou créer une facture Factur-X ?

Il existe trois voies.

1. **Votre logiciel ou votre plateforme la génère.** C’est la voie normale : vous saisissez la facture, l’outil produit le fichier conforme.
2. **Un service de conversion en ligne** transforme un PDF et des données en Factur-X. Utile ponctuellement, mais ne remplace pas un outil intégré : il faut ressaisir ou importer les données à chaque facture, et il ne gère pas l’envoi par plateforme.
3. **Des bibliothèques libres de programmation** permettent de produire du Factur-X depuis un logiciel maison. Elles sont adaptées à des développeurs, pas à un usage manuel.

Quel que soit le mode, vérifiez la conformité avec un validateur : des outils gratuits contrôlent la structure et la cohérence d’un fichier. Le « gratuit » convient pour tester ou pour une facture occasionnelle ; dès que vous facturez régulièrement des professionnels, un outil intégré à votre façon de travailler vous fera gagner du temps et évitera les erreurs de saisie.

### Existe-t-il un générateur ou un logiciel Factur-X gratuit ?

Oui, certains éditeurs proposent des versions gratuites limitées (nombre de factures, fonctions réduites), et des outils libres permettent de produire des fichiers. Posez-vous trois questions avant de choisir : pouvez-vous récupérer vos données si vous changez ? L’outil envoie-t-il la facture à la plateforme agréée, ou seulement un fichier à envoyer vous-même ? Qui assure le support en cas de rejet ? Un outil gratuit qui produit un joli fichier sans l’acheminer ne règle qu’une moitié du problème.

## Quel logiciel pour un artisan ou un commerçant peu à l’aise avec l’informatique ?

Fixez-vous trois exigences de simplicité :

- **Un parcours court** : choisir un client, saisir les lignes, envoyer. Pas de menus à rallonge.
- **Un vocabulaire de métier** : acompte, situation, avoir, devis accepté, plutôt que des termes techniques sur les formats et les statuts.
- **Un accompagnement humain** : quelqu’un qui répond au téléphone ou par message quand une facture est refusée.

Demandez une démonstration avec l’une de vos factures réelles. Si l’éditeur ne le propose pas, c’est un signal. Pour le choix de la plateforme elle-même (immatriculation, prix, réversibilité), voyez notre article sur les [artisans et micro-entrepreneurs](/blog/facture-electronique-artisan-micro-entrepreneur). Pour le calendrier des échéances, voyez [le calendrier 2026-2027](/blog/facture-electronique-calendrier-2026-2027), à vérifier sur les sites officiels.

## Les erreurs de format à éviter

- **Envoyer un PDF simple en pensant qu’il suffit.** Un PDF classique n’est pas une facture électronique structurée.
- **Modifier le PDF d’un Factur-X après coup.** Les données XML restent inchangées, la facture devient incohérente.
- **Oublier les nouvelles mentions** (SIREN du client, catégorie d’opération, adresse de livraison si différente) : un format correct ne compense pas des données manquantes.
- **Choisir un outil sans export.** Si vous ne pouvez pas récupérer vos factures dans un format ouvert, vous êtes captif.
- **Négliger l’archivage.** Les factures doivent être conservées pendant la durée légale sous une forme garantissant leur intégrité.

## Un outil sur mesure pour produire et envoyer ses factures

Quand le logiciel du marché ne colle pas à votre façon de travailler (chantiers en plusieurs étapes, produits sur mesure, tarifs spécifiques), un outil développé pour vous peut préparer les factures dans le format voulu et les transmettre à la plateforme agréée de votre choix, lorsque celle-ci propose une interface de connexion. Le coût de départ d’un outil de ce type est à partir de {{prix:outil}} €, selon ce que vous voulez automatiser. La page [facture électronique](/services/facture-electronique) précise ce que Stackup Agency peut brancher, et la [checklist](/outils/checklist-facture-electronique) vous aide à vérifier vos besoins. Pour en parler, [contactez-nous](/contact).

## Questions fréquentes

**Une facture Factur-X peut-elle être modifiée après son émission ?**
Non, on ne modifie pas une facture émise. En cas d’erreur, on émet un avoir ou une facture rectificative qui renvoie à la facture d’origine, à travers le même circuit.

**Mon client peut-il me demander un format précis ?**
Il peut exprimer une préférence, mais l’acheminement passe par les plateformes qui gèrent les formats autorisés. Si votre outil produit un format correct, la plateforme se charge du reste.

**Un fichier Factur-X est-il plus lourd qu’un PDF classique ?**
Un peu, puisqu’il embarque des données en plus, mais la différence est négligeable pour un usage normal.

**Que se passe-t-il si la plateforme rejette ma facture ?**
Vous recevez un statut de rejet avec un motif (donnée manquante, incohérence, destinataire inconnu). Corrigez, puis renvoyez selon la procédure de votre plateforme.

**Faut-il conserver le PDF et le XML séparément ?**
Avec Factur-X, un seul fichier contient les deux. Conservez-le tel quel, sans le convertir ni le modifier, et respectez les durées légales de conservation, à vérifier sur les sites officiels.
