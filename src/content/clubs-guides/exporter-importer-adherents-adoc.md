---
title: "Exporter et importer ses adhérents avec ADOC : le principe, pas à pas"
seoTitle: "Import et export des adhérents ADOC pour un club de tennis"
excerpt: "À quoi servent l’import et l’export de fichiers ADOC, comment contrôler les licences manquantes, et pourquoi il n’y a pas de connexion directe."
date: "2026-10-30"
updated: "2026-10-30"
readTime: 8
keywords: ["import adhérents ADOC", "export fichier ADOC", "ADOC club de tennis", "licences manquantes club de tennis", "fichier adhérents tennis tableur", "logiciel de gestion club de tennis ADOC"]
features: ["import-export-adoc", "adhesions-reinscriptions-en-ligne", "ma-journee-et-automatisations", "statistiques"]
---

**Importer ou exporter des adhérents avec ADOC consiste à échanger des fichiers entre l’outil fédéral du club et son logiciel de gestion : on récupère un fichier d’un côté, on le dépose de l’autre, puis on contrôle ce qui manque. Il n’y a pas de connexion directe entre les deux : c’est vous qui déplacez le fichier, et le logiciel vous aide à vérifier le résultat.**

Ce guide explique le principe, à quoi cela sert dans la vie d’un bureau et comment contrôler les licences. Il ne décrit pas les écrans d’ADOC : ils appartiennent à la Fédération française de tennis et peuvent évoluer. Pour les manipulations précises, reportez-vous aux aides officielles de la FFT.

## ADOC et le logiciel du club : qui fait quoi ?

Il faut séparer deux rôles, car la confusion est fréquente.

- **ADOC** est un service de la FFT. Il gère l’administratif fédéral du club : c’est là que se traitent les démarches qui relèvent de la fédération, et c’est la référence officielle pour la situation du club vis-à-vis d’elle.
- **{{nom:produit}}** fait vivre le club au quotidien : le site, les réinscriptions, les groupes de l’école de tennis, les paiements, les équipes, la communication. C’est un service distinct, créé par Stackup Agency.

Les deux ne sont ni confondus ni fusionnés. {{nom:produit}} n’est pas un service de la FFT et ne remplace pas ADOC. Le club continue d’utiliser les services fédéraux, ADOC et Ten’Up compris, comme avant.

Alors pourquoi échanger des fichiers ? Parce que les mêmes personnes existent dans les deux mondes. L’adhérent qui se réinscrit en ligne sur le site du club doit aussi apparaître, à un moment, côté fédération. Plutôt que de tout retaper, on passe par des fichiers.

## À quoi sert l’import, concrètement ?

L’import sert surtout à **démarrer** et à **recoller**.

**Au démarrage.** Un club qui arrive dans le logiciel a déjà son fichier d’adhérents : dans ADOC, dans un tableur, parfois les deux. Le saisir à la main prendrait des soirées. L’import permet de partir de ce que vous avez déjà. Le logiciel accepte l’export d’ADOC ou un tableur, ce qui couvre la plupart des cas. L’offre comprend une source d’import ; une source supplémentaire est proposée en option, à partir de {{club:opt-import-source-mep}} € de mise en place.

**En cours de saison.** Quand des licences sont prises ou mises à jour côté fédération, vous pouvez réimporter un fichier récent pour que le logiciel reflète la situation. Vous évitez ainsi de répondre à l’adhérent « oui, c’est bon » alors que sa fiche est en retard.

**En préparation de saison.** Avant d’ouvrir les réinscriptions, un import du fichier à jour donne une base propre : les anciens adhérents sont déjà là, avec leurs coordonnées. Le guide sur les [réinscriptions en ligne](/clubs-de-tennis/guides/reinscriptions-en-ligne-club-de-tennis) montre comment s’en servir.

Le principe à retenir : **l’import n’est pas une mise à jour permanente.** C’est une photographie, à un moment donné. Si une information change des deux côtés, c’est la dernière version importée qui prévaut dans le logiciel ; pensez à garder une date sur vos fichiers.

## À quoi sert l’export ?

L’export fait le chemin inverse. Le logiciel produit un fichier de vos adhérents, utilisable pour les besoins du bureau et pour les démarches côté fédération.

Les usages les plus courants :

- **Alimenter le côté fédéral** : le fichier permet de préparer ou de comparer les informations à saisir ou à transmettre dans ADOC. La façon exacte de les reprendre est décrite dans les aides officielles de la FFT.
- **Donner une liste au trésorier** : les paiements du logiciel sont exportables pour la comptabilité.
- **Contrôler** : sortir une liste pour la relire tranquillement, par exemple avant l’assemblée générale.
- **Conserver une sauvegarde à vous** : l’export complet de vos données est possible à tout moment, c’est un droit prévu dans l’abonnement, pas une option payante.

Dans tous les cas, il s’agit de fichiers que **vous** déposez ou envoyez. Aucun programme ne les transmet à votre place.

## Comment contrôler les licences manquantes ?

C’est la partie la plus utile du processus, et celle qui fait gagner le plus de temps au secrétaire.

Une licence manquante, c’est un adhérent qui joue, qui paie, qui est inscrit sur le site du club, mais dont la licence n’apparaît pas côté fédération. Elle se découvre souvent trop tard : le jour d’une compétition par équipes, ou lors du contrôle de fin de saison. Le logiciel propose, avec l’import, un **contrôle des licences manquantes**. Le principe est celui d’une comparaison entre deux listes :

1. Vous importez le fichier le plus récent du côté fédéral.
2. Le logiciel le compare à la liste de ses adhérents.
3. Il met en évidence les écarts : adhérents du club sans licence retrouvée dans le fichier, et personnes du fichier qui ne sont pas dans le club.
4. Le bureau traite chaque écart : relancer l’adhérent, corriger une faute de frappe, régulariser côté fédération.

Une remarque pratique : beaucoup d’écarts viennent de **différences d’écriture**. Un nom composé avec ou sans trait d’union, un prénom abrégé, une date de naissance inversée. Avant d’alerter l’adhérent, vérifiez les deux fiches.

Pour que le contrôle serve vraiment, faites-le **à des moments fixes** : à la fin des réinscriptions, avant le début des compétitions par équipes, avant l’assemblée générale. Le logiciel affiche dans « Ma journée » ce qui demande une action : c’est un bon rappel. La page [Ma journée et automatisations](/clubs-de-tennis/fonctionnalites/ma-journee-et-automatisations) explique cet affichage.

Précision importante : le contrôle indique des écarts à vérifier, il ne dit pas qu’une personne est ou non licenciée au sens officiel. La référence reste la fédération.

## Comment procéder, étape par étape ?

La méthode ci-dessous est volontairement générale : elle fonctionne quelle que soit la version d’ADOC.

1. **Choisissez un moment calme.** Pas le soir de la permanence d’inscription.
2. **Faites l’export côté fédéral.** Les manipulations se trouvent dans les aides officielles de la FFT ; suivez-les telles quelles, car l’écran peut avoir changé.
3. **Gardez le fichier tel quel.** Ne le modifiez pas dans un tableur avant l’import, sauf si l’aide du logiciel vous le demande. Enregistrer sous un autre format fait perdre des accents ou des colonnes.
4. **Importez-le dans le logiciel du club**, depuis la section prévue à cet effet.
5. **Relisez le résultat.** Vérifiez que le nombre de personnes et quelques fiches prises au hasard correspondent à votre fichier.
6. **Traitez les écarts** un par un, en commençant par les licences manquantes.
7. **Notez la date** de l’import, par exemple dans le journal du bureau.
8. **Programmez le prochain contrôle**, à un moment utile de la saison.

Cette routine prend peu de temps quand elle est régulière, et beaucoup quand elle est repoussée. Elle peut aussi être confiée à un bénévole formé, avec un compte à son nom : le journal du logiciel garde la trace de qui a fait quoi.

## Pourquoi pas de connexion directe, et que faire si on la souhaite ?

Beaucoup de présidents demandent : « Pourquoi ne pas brancher les deux ? » La réponse tient en trois points.

- **Les deux outils appartiennent à des acteurs différents.** ADOC est un service de la FFT, avec ses règles et son calendrier. Nous ne prétendons pas être connectés à un outil que nous ne contrôlons pas.
- **Un fichier, ça se vérifie.** Avant d’importer, vous voyez ce que vous allez déposer. Une mise à jour automatique silencieuse peut écraser une bonne information sans que personne s’en aperçoive.
- **C’est honnête.** Nous préférons une promesse tenue (échanger des fichiers et contrôler) à une promesse floue.

Si votre club a un besoin plus poussé (par exemple une connexion à un autre logiciel de comptabilité), c’est possible mais sur devis : il s’agit d’un développement propre à votre cas, chiffré avant toute décision. La page [import et export ADOC](/clubs-de-tennis/fonctionnalites/import-export-adoc) précise le périmètre, et la page [tarifs](/clubs-de-tennis/tarifs) liste ce qui est inclus.

## Quelles précautions pour les données personnelles ?

Un fichier d’adhérents contient des noms, des adresses, des dates de naissance, parfois des mineurs. Quelques réflexes :

- **Ne l’envoyez pas par une messagerie personnelle** sans nécessité, et ne le laissez pas traîner dans le dossier « Téléchargements » d’un ordinateur partagé.
- **Supprimez les fichiers temporaires** après l’import.
- **Limitez le nombre de personnes** qui y accèdent : le secrétaire et le trésorier suffisent la plupart du temps.
- **Passez par des comptes nominatifs**, jamais un mot de passe partagé du club.

Le contrat de traitement des données personnelles (RGPD) est inclus avec l’abonnement. Pour comprendre vos obligations de club, notre guide dédié : [RGPD pour un club de tennis](/clubs-de-tennis/guides/rgpd-club-de-tennis).

## Combien cela coûte-t-il ?

L’import et l’export de fichiers ADOC font partie du logiciel de gestion, sans supplément. Pour un club de taille moyenne, l’abonnement du logiciel démarre à partir de {{club:abo-moyen-logiciel}} € par mois. Ces prix sont indicatifs ; le [simulateur](/clubs-de-tennis/simulateur) calcule votre cas selon la taille du club.

## Et maintenant ?

Repérez dans votre club qui s’occupe d’ADOC et qui tient le tableur : ce sont souvent deux personnes différentes, et c’est là que naissent les écarts. Pour voir comment le contrôle des licences se présente à l’écran, [regardez la démo](/clubs-de-tennis/demo). Pour chiffrer votre club, [demandez un devis](/contact?a=appel). Et pour comparer plusieurs outils sans vous tromper de question, notre guide pour [choisir un logiciel de gestion de club de tennis](/clubs-de-tennis/guides/choisir-logiciel-de-gestion-club-de-tennis) vous aidera.

## Questions fréquentes

**Existe-t-il une connexion directe avec ADOC ?**
Non. Le logiciel permet l’import et l’export des fichiers ADOC, que vous transférez vous-même. Les manipulations côté fédération sont expliquées dans les aides officielles de la FFT.

**Faut-il encore utiliser ADOC ?**
Oui, pour tout ce qui relève de l’administratif fédéral. {{nom:produit}} ne remplace pas les services de la FFT : il facilite la vie du bureau autour d’eux.

**Peut-on importer depuis un tableur ?**
Oui. Le logiciel accepte aussi l’import des membres depuis un tableur. Si votre fichier est très désordonné, une aide à la reprise peut être chiffrée ; une reprise depuis un autre logiciel passe par un devis sur mesure.
