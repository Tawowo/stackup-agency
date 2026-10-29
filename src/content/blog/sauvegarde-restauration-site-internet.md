---
title: "Sauvegarder et restaurer son site internet"
seoTitle: "Sauvegarde de site internet : faire, vérifier, restaurer"
excerpt: "Que sauvegarder, à quelle fréquence, où stocker, comment vérifier qu'une sauvegarde marche et la restaurer : le guide WordPress et boutique."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 10
tag: "Technique"
category: "technique"
type: "guide"
keywords: ["comment faire une sauvegarde de son site internet", "comment sauvegarder son site wordpress", "sauvegarde automatique site internet professionnel", "comment vérifier qu'une sauvegarde fonctionne", "j'ai perdu mon site internet que faire", "quel plugin de sauvegarde wordpress utiliser"]
sources: ["https://www.cnil.fr", "https://www.service-public.fr"]
---

**Sauvegardez deux choses, les fichiers du site et sa base de données, de façon automatique, avec au moins une copie stockée hors du serveur du site, et testez la restauration au moins une fois. Une sauvegarde qu'on n'a jamais essayé de restaurer n'est qu'une hypothèse.**

Un site peut disparaître pour des raisons banales : mise à jour qui casse tout, piratage, erreur de manipulation, hébergeur défaillant, domaine non renouvelé. Dans tous ces cas, la différence entre une soirée désagréable et plusieurs semaines perdues tient à une seule chose : la sauvegarde existe-t-elle, est-elle récente et fonctionne-t-elle ?

## Que sauvegarder exactement sur un site WordPress ?

Un site WordPress se compose de deux parties, qu'il faut sauvegarder ensemble.

- **Les fichiers** : le dossier du site, et surtout `wp-content`, qui contient vos thèmes, vos extensions et vos **médias** (photos, documents téléversés), ainsi que le fichier de configuration.
- **La base de données** : elle contient vos pages, articles, réglages, utilisateurs et, pour une boutique, les commandes et les clients.

Sauvegarder uniquement les fichiers laisse le site vide de contenu. Sauvegarder uniquement la base laisse un site sans images. Pour un site statique ou sur mesure sans base de données, les fichiers suffisent, mais gardez aussi les contenus sources (textes, images originales).

À conserver en plus, hors du site :

- la **liste de vos accès** (domaine, hébergeur, administration) ;
- les **licences** de thèmes et d'extensions ;
- les **réglages DNS** (enregistrements du domaine, e-mail).

## À quelle fréquence sauvegarder son site ?

La bonne fréquence dépend de la vitesse à laquelle le contenu change, et de ce que vous pouvez accepter de perdre.

| Type de site | Rythme raisonnable |
|---|---|
| Vitrine qui change rarement | Hebdomadaire, et avant chaque mise à jour |
| Site avec actualités ou blog | Quotidien pour la base de données |
| Boutique en ligne | Quotidienne ou plus fréquente pour la base, car chaque commande compte |
| Avant toute intervention | Systématiquement, à la main |

Pour une boutique, la question à se poser est simple : si je restaure la sauvegarde de ce matin, combien de commandes ai-je perdues depuis ? Si la réponse vous gêne, augmentez la fréquence. Voir aussi la section consacrée à la boutique en ligne plus bas.

## Où stocker la sauvegarde de son site internet ?

Une copie stockée sur le même serveur que le site disparaît avec lui. La règle classique, dite « 3-2-1 », résume la bonne pratique : **trois copies** des données, sur **deux supports** différents, dont **une hors site**.

Pour un site, cela donne :

1. la copie de travail (le site lui-même) ;
2. une sauvegarde chez l'hébergeur (souvent comprise dans l'offre) ;
3. une sauvegarde **chez un tiers** : stockage en ligne, autre hébergeur, ou disque que vous contrôlez.

Les sauvegardes contiennent des données personnelles (clients, formulaires, comptes). Elles doivent donc être **protégées** par un mot de passe solide ou un chiffrement, accessibles à peu de personnes, et **supprimées après une durée raisonnable**. Les recommandations de la [CNIL](https://www.cnil.fr) sur la sécurité des données s'y appliquent.

## Comment faire une sauvegarde de son site internet ?

Trois voies, selon votre niveau et votre site.

### Option 1 : la sauvegarde de l'hébergeur

La plupart des hébergeurs proposent des sauvegardes automatiques, parfois incluses, parfois en option. Regardez dans l'espace client : fréquence, durée de conservation, possibilité de restaurer soi-même. **Ne vous y fiez pas comme unique copie** : elle est sur la même infrastructure, et elle peut ne conserver que quelques jours. Pour savoir si votre site est sauvegardé, la réponse est dans cet espace, ou dans les conditions de l'offre ; demandez-le par écrit si ce n'est pas clair. Pour choisir un hébergement, voir [quel hébergement choisir](/blog/paa-hebergement-site) et [les solutions d'hébergement](/blog/hebergement-web-choisir).

### Option 2 : une extension de sauvegarde

Sur WordPress, des extensions dédiées (UpdraftPlus, BackWPup, parmi les plus répandues) sauvegardent fichiers et base, selon un calendrier, vers un stockage externe. Pour choisir, posez ces questions plutôt que de suivre un classement :

- sauvegarde-t-elle **fichiers et base** ?
- peut-elle envoyer la copie vers **un stockage externe** ?
- permet-elle une **restauration simple** et testable ?
- prévient-elle **en cas d'échec** ?
- est-elle **maintenue** régulièrement ?
- la version gratuite suffit-elle à votre besoin, ou faut-il la version payante ?

### Option 3 : la sauvegarde manuelle

Utile avant une intervention, ou pour un petit site. On copie les fichiers via le gestionnaire de fichiers de l'hébergeur ou un client FTP, et on exporte la base avec l'outil de gestion de base de données de l'hébergeur. Cela demande de la méthode : horodatez et nommez les archives, notez ce qu'elles contiennent. Si vous n'êtes pas à l'aise, mieux vaut automatiser.

### Automatiser la sauvegarde

L'automatisation est la seule méthode fiable, car personne n'oublie ce qu'il n'a pas à faire. Planifiez la sauvegarde la nuit, envoyez la copie vers un stockage externe, conservez plusieurs versions (quotidiennes récentes, hebdomadaires plus anciennes) et activez les alertes d'échec. Si le site est confié à un prestataire, c'est un point à écrire dans le contrat de maintenance ; voir [la maintenance d'un site](/blog/maintenance-site-web-guide) et la page [maintenance](/services/maintenance).

## Comment vérifier qu'une sauvegarde fonctionne ?

C'est l'étape qu'on saute, et la plus importante. Trois niveaux de contrôle.

1. **Contrôle rapide** : la date de la dernière sauvegarde est récente, sa taille est cohérente avec celle du site, et l'archive s'ouvre sans erreur.
2. **Contenu** : l'archive contient bien des fichiers du site et un fichier de base de données non vide.
3. **Restauration test** : restaurer sur un site de test (un sous-domaine, un environnement local ou un espace de préproduction), vérifier que les pages, les images, les formulaires et la connexion fonctionnent.

Faites ce test après la mise en place, puis une à deux fois par an, et à chaque changement d'hébergeur ou d'extension. Gardez une note : date du test, résultat, personne responsable. Si vous gérez des données de clients, ce test fait aussi partie des mesures de sécurité qu'on peut vous demander de montrer.

## Comment restaurer son site après un problème ?

Procédez dans cet ordre, sans précipitation.

1. **Comprenez ce qui s'est passé.** Mise à jour ratée, piratage, erreur de manipulation, serveur défaillant ? Restaurer sans corriger la cause peut reproduire le problème.
2. **Faites une copie de l'état actuel**, même cassé : elle peut servir à comparer ou récupérer des commandes récentes.
3. **Choisissez la bonne sauvegarde** : la plus récente *avant* le problème.
4. **Restaurez d'abord sur un site de test**, si le temps le permet.
5. **Restaurez fichiers et base** ensemble, puis vérifiez les pages, les médias, les formulaires, le paiement pour une boutique.
6. **Changez les mots de passe** si un piratage est possible, et mettez tout à jour.
7. **Vérifiez le référencement** : pages en erreur, redirections, pages indexées.
8. **Notez l'incident** et ce qu'il faut changer pour qu'il ne se reproduise pas.

Si vous n'avez plus accès au site, commencez par [retrouver vos accès](/blog/retrouver-acces-site-identifiants-hebergeur).

### Restauration d'un site WordPress : les cas les plus fréquents

- **Écran blanc après une mise à jour** : restaurez la sauvegarde d'avant, ou désactivez l'extension fautive (renommez son dossier dans `wp-content/plugins`).
- **Site piraté** : restaurez une sauvegarde antérieure à l'intrusion, puis changez tous les accès et supprimez les comptes inconnus.
- **Contenu supprimé par erreur** : selon le cas, la corbeille de WordPress ou une restauration partielle de la base suffit.
- **Changement d'hébergeur raté** : restaurez l'ancien site à l'ancienne adresse et reprenez la migration.

## J'ai perdu mon site internet : que faire ?

Si aucune sauvegarde n'existe ou si elle est inutilisable, il reste des pistes, de la plus fiable à la plus incertaine.

1. **Contactez l'hébergeur** : il garde parfois des copies de secours que vous ne voyez pas.
2. **Cherchez vos fichiers locaux** : photos originales, textes dans vos documents, anciennes versions envoyées par e-mail par le prestataire.
3. **Consultez les archives du web** : des copies partielles d'anciennes pages sont parfois disponibles. Elles permettent de récupérer des textes, rarement un site fonctionnel.
4. **Contactez l'ancien prestataire** : il peut avoir une copie de livraison.
5. **Reconstruisez** à partir des contenus retrouvés, en profitant de l'occasion pour mieux organiser. Voir [refaire son site internet](/blog/refaire-son-site-internet-quand-et-comment).

Dans tous les cas, ne laissez pas le domaine expirer pendant que vous cherchez : sans lui, vous perdez l'adresse.

## Sauvegarde d'une boutique en ligne : pourquoi et comment

Une boutique a des données qui changent en continu : commandes, stocks, clients, paiements. Une restauration à partir d'une copie ancienne efface les commandes passées depuis, ce qui crée des litiges et des problèmes comptables.

- Sauvegardez la **base de données** très régulièrement, plus souvent que le reste.
- Gardez des **exports** de commandes dans un tableur ou votre outil de gestion.
- Avant toute mise à jour (thème, extension, passerelle de paiement), sauvegardez à la main.
- Après une restauration, **comparez** avec les notifications de commande et les relevés du prestataire de paiement pour retrouver les commandes manquantes.
- Rappelez-vous que les données clients sont personnelles : protégez et limitez la conservation des sauvegardes.

Les obligations d'une boutique sont rappelées dans [le guide des obligations légales du e-commerce](/blog/cgv-boutique-en-ligne). Pour un projet de boutique, la page [site e-commerce](/services/site-ecommerce) présente notre approche, et un [audit](/outils/audit-site) permet de vérifier l'état de départ.

## Comment sauvegarder les fichiers de son entreprise simplement ?

Le site n'est qu'une partie de vos données. Les devis, factures, photos de chantier, fichier clients et comptabilité méritent le même soin. Une méthode simple pour un indépendant :

1. **Rassemblez** les documents dans une arborescence claire et unique.
2. **Synchronisez** vers un service en ligne qui garde un historique des versions.
3. **Copiez** une fois par mois sur un disque externe rangé ailleurs que dans le bureau.
4. **Testez** l'ouverture d'un fichier ancien.
5. **Notez** où est quoi, et qui peut y accéder.

Si vous avez perdu des données de l'entreprise, regardez d'abord les historiques de version de votre service en ligne, la corbeille, les messageries et les copies chez vos partenaires (comptable, banque, fournisseurs). Pour la facturation, la durée de conservation des pièces comptables est fixée par la loi ; vérifiez-la sur [service-public.fr](https://www.service-public.fr).

## Comment supprimer les anciens utilisateurs d'un site WordPress ?

Un compte oublié est une porte ouverte. Dans l'administration, rubrique « Utilisateurs » :

1. Passez en revue la liste, notez ceux que vous ne reconnaissez pas ou qui ne servent plus.
2. Pour un compte légitime mais inutile, **supprimez-le** en choisissant d'attribuer ses contenus à un autre compte, pour ne pas perdre ses articles.
3. Pour un compte inconnu avec droits d'administrateur, voir la procédure en cas de piratage dans [retrouver les accès de son site](/blog/retrouver-acces-site-identifiants-hebergeur).
4. Changez les mots de passe des comptes restants et activez l'authentification à deux facteurs si possible.

Faites une sauvegarde avant de supprimer quoi que ce soit.

## Questions fréquentes

**Une sauvegarde chez l'hébergeur suffit-elle ?**
Non, pas seule. Elle protège contre une erreur courante, mais pas contre la défaillance de l'hébergeur ou la suppression du compte. Gardez au moins une copie ailleurs.

**Combien de temps garder les sauvegardes ?**
Assez pour revenir avant un problème découvert tardivement, pas indéfiniment. Plusieurs versions récentes et quelques versions plus anciennes suffisent généralement. Les sauvegardes contenant des données personnelles ne doivent pas être conservées sans limite.

**Que coûte une sauvegarde automatique ?**
Cela va du gratuit (outil de l'hébergeur ou extension de base) au payant (stockage externe, restauration assistée, surveillance). Chez Stackup Agency, la maintenance fait partie de l'abonnement mensuel facultatif, qui démarre à partir de {{abo:min}} € par mois pour un site d'une page, composé à la carte.

**Peut-on sauvegarder un site sans accès à l'administration ?**
Oui si vous avez accès à l'hébergement : les fichiers et la base se copient depuis son espace client. Sans aucun accès, il faut d'abord récupérer l'hébergeur ou le domaine.

**Faut-il sauvegarder avant chaque mise à jour ?**
Oui. C'est le moment où une extension peut casser le site. Une sauvegarde juste avant, testée ou au moins vérifiée, permet de revenir en arrière en quelques minutes.
