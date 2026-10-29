---
title: "Pourquoi mon site n’apparaît pas sur Google (et comment le corriger)"
seoTitle: "Pourquoi mon site n'apparaît pas sur Google : 8 causes"
excerpt: "Site absent de Google ? Vérifiez en cinq minutes s'il est indexé, repérez la cause (noindex, fiche, refonte, délai) et suivez les corrections à faire."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 8
tag: "Référencement"
category: "seo"
type: "question"
keywords: ["pourquoi mon site n'apparaît pas sur google", "comment apparaître sur google", "mon site wordpress n'apparaît pas sur google", "mon entreprise n'apparaît pas sur google", "après refonte mon site n'apparaît plus sur google"]
sources: ["https://developers.google.com", "https://support.google.com"]
---

**Un site n'apparaît pas sur Google pour l'une de ces raisons : Google ne l'a pas encore exploré ou a reçu l'ordre de l'ignorer (noindex, robots.txt), ou il est indexé mais trop peu pertinent pour la recherche tapée.** Commencez par tester si Google connaît votre site, puis suivez l'arbre de décision ci-dessous : cinq minutes suffisent généralement pour repérer le blocage.

## Mon site est-il vraiment absent de Google ?

Deux situations se traitent différemment : le site n'est **pas indexé** (Google ne le connaît pas), ou il est **indexé mais mal classé**.

Le test est simple :

1. Tapez `site:votredomaine.fr` dans la barre de recherche de Google, en remplaçant par votre adresse. Si rien ne s'affiche, votre site n'est pas dans l'index. Si des pages apparaissent, il est indexé.
2. Tapez ensuite le nom exact de votre entreprise entre guillemets. Un site indexé apparaît presque toujours pour son propre nom.
3. Ouvrez la Search Console de Google (gratuite) et collez votre adresse dans la barre « Inspecter » : elle indique si la page est connue, si elle est indexable et pourquoi elle ne l'est pas.

Si votre site existe depuis des mois et reste invisible, ces trois tests disent presque toujours de quel côté chercher.

## Pourquoi mon site n'apparaît pas sur Google : les causes les plus courantes

### Le site est trop récent ou Google ne l'a jamais visité

Un site neuf n'est pas listé le jour de sa mise en ligne. Google doit d'abord le découvrir (par un lien venant d'un autre site, ou par un plan du site transmis dans la Search Console), puis l'explorer, puis décider de l'indexer. Cela prend du temps et rien ne garantit une date. Pour accélérer, déclarez votre site dans la Search Console et envoyez votre plan de site (`sitemap.xml`). Le délai varie selon la concurrence et l'âge du site, et personne ne peut le garantir.

### Une balise « noindex » ou un robots.txt bloque Google

C'est la cause la plus fréquente après une mise en ligne. Pendant la création, on interdit l'indexation pour que personne ne tombe sur un site inachevé ; on oublie de lever l'interdiction au lancement. Deux endroits à vérifier :

- **La balise `noindex`** dans le code des pages (« robots » ou en-tête HTTP). L'inspection d'URL de la Search Console indique « Exclue par la balise noindex ».
- **Le fichier `robots.txt`** à la racine de votre site (`votredomaine.fr/robots.txt`). Une ligne `Disallow: /` interdit tout le site.

Sur WordPress, ouvrez Réglages puis Lecture : la case « Demander aux moteurs de recherche de ne pas indexer ce site » doit être décochée. Sur un site créé avec un outil comme Wix, vérifiez les réglages SEO de chaque page et du site entier : une page peut être masquée aux moteurs de recherche sans que cela se voie.

### Le site est indexé, mais jamais pour la bonne requête

Votre site apparaît pour son nom, pas pour « plombier Tours » : ce n'est pas un problème technique, c'est de la concurrence et du contenu. Google classe les pages d'après leur pertinence pour la recherche et leur utilité pour les visiteurs. Une page d'accueil qui dit « Bienvenue » sans préciser votre métier ni votre zone n'a aucune raison d'être choisie.

Ce qui change la donne :

- Une page par métier ou par prestation, dont le titre et le premier paragraphe disent clairement ce que vous faites et où.
- Des textes écrits pour être utiles (prix indicatifs, déroulé d'une intervention, questions des clients), pas pour répéter des mots-clés.
- Des liens depuis d'autres sites sérieux de votre secteur ou de votre ville.

Pour la méthode complète, voyez [SEO : les erreurs qui plombent les sites de petites entreprises](/blog/10-erreurs-seo-site-web) et la page [référencement naturel](/services/referencement).

### Après refonte, mon site n'apparaît plus sur Google

Une refonte déplace des pages, change des adresses et parfois le nom de domaine. Si l'ancien site disparaît sans que Google soit prévenu, les pages qui se classaient disparaissent avec lui. Les causes habituelles :

- Les anciennes adresses ne redirigent pas vers les nouvelles (il faut des redirections 301, page par page).
- Le site de test était en noindex et l'est resté en production.
- Les titres et les textes ont été réécrits sans reprendre les expressions qui fonctionnaient.
- Le plan du site n'a pas été renvoyé à la Search Console.

La correction consiste à comparer l'ancien et le nouveau site, rétablir les redirections et demander une nouvelle exploration. Détail dans [refonte et redirections 301](/blog/refonte-site-web-seo-redirections-301). Si vous préparez une refonte, la page [refonte de site internet](/services/refonte-de-site-internet) décrit comment ce point est traité dès le départ.

### Le site est lent, mal conçu pour le mobile ou en erreur

Un site qui plante, renvoie des erreurs 404 ou s'affiche mal sur téléphone peut être moins bien exploré. Le rapport « Pages » de la Search Console liste les pages en erreur ; l'article sur les [erreurs 404](/blog/erreurs-404-seo-guide) explique comment les traiter.

### Le cadenas n'apparaît pas sur mon site

Le cadenas signale une connexion en HTTPS. S'il manque, le navigateur affiche « Non sécurisé » : mauvais signal pour vos visiteurs. Causes fréquentes : certificat non installé ou expiré, ou image et script encore appelés en HTTP. Demandez à votre hébergeur d'installer le certificat, et lisez [HTTPS et SSL](/blog/ssl-https-site-web).

## Comment apparaître sur Google : par où commencer

Dans l'ordre, pour un artisan ou un commerçant :

1. **Débloquer l'indexation** : pas de noindex, un robots.txt propre, un plan du site envoyé.
2. **Écrire clairement le métier et la zone** sur la page d'accueil et sur chaque page de service.
3. **Créer et vérifier la fiche Google Business** si vous recevez des clients ou vous déplacez chez eux (voir la section suivante).
4. **Obtenir des liens utiles** : annuaires professionnels sérieux, partenaires, associations locales, presse locale.
5. **Suivre les résultats** dans la Search Console, une fois par mois.

Si vous voulez savoir où vous en êtes sans vous lancer seul, l'[audit de site](/outils/audit-site) repère les blocages les plus courants.

## Faut-il payer pour apparaître sur Google ?

Non, pas pour apparaître dans les résultats naturels : Google n'accepte pas de paiement pour y figurer ou pour y monter. Vous pouvez en revanche acheter de la publicité (Google Ads), qui apparaît avec la mention « Sponsorisé » en haut des résultats. C'est un levier utile sur certaines requêtes, mais il s'arrête quand vous cessez de payer.

Ce qui coûte, c'est le travail : un site bien construit, des textes, une fiche à jour, parfois un prestataire pour le faire. Le [suivi en référencement local](/services/referencement-local) en fait partie. Méfiez-vous des promesses de « première place garantie » : personne ne peut engager Google.

## Ma fiche Google n'apparaît pas dans les recherches

Pour un commerce local, la fiche Google Business pèse souvent autant que le site. Si elle n'apparaît pas :

- **Elle n'est pas validée.** Google demande de confirmer l'adresse (courrier, appel, vidéo…) avant de l'afficher.
- **Elle a été suspendue.** Une activité décrite de façon trompeuse, une adresse jugée fausse ou un nom bourré de mots-clés peuvent entraîner une suspension. La page d'aide de Google détaille la procédure de réexamen.
- **La catégorie est mal choisie.** Une catégorie principale éloignée de ce que les clients recherchent réduit votre visibilité.
- **Elle est sous un autre nom.** Cherchez le nom exact, l'adresse et le numéro de téléphone saisis dans la fiche.

Google classe les résultats locaux selon trois critères officiels : la pertinence, la distance et la notoriété. Les avis, la présence en ligne et la qualité de la fiche influencent la notoriété. Vous trouverez la méthode d'optimisation dans [Fiche Google Business : l'optimisation complète](/blog/fiche-google-business-optimisation).

## Pourquoi mon commerce n'apparaît pas quand on cherche près de chez soi

La recherche « près de moi » dépend de la position de la personne qui cherche. Un commerce situé à deux rues apparaît plus facilement qu'un commerce à quinze kilomètres, à pertinence égale. Vous ne pouvez pas modifier la position du client, mais vous pouvez travailler le reste : catégorie précise, adresse exacte, horaires à jour, photos, avis récents, et un site qui cite votre commune et celles autour.

Un artisan qui se déplace chez ses clients (plombier, paysagiste, électricien) n'a souvent pas d'adresse ouverte au public. Dans la fiche, il déclare une **zone d'intervention** plutôt qu'une adresse affichée, et son site détaille les communes desservies. Une page par commune stratégique, avec un contenu réel, aide à apparaître dans les villes autour de chez vous. Évitez les dizaines de pages identiques où seule la ville change : Google les écarte.

## Comment apparaître dans les aperçus IA de Google ?

Google indique qu'il n'existe pas de balise spéciale pour figurer dans ses aperçus générés par IA : il faut être indexé et jugé utile. Mêmes fondamentaux : un contenu clair, factuel et à jour, qui répond directement aux questions. Détails dans l'article sur les [AI Overviews](/blog/ai-overviews-seo-tpe).

## L'ancienne adresse de mon entreprise apparaît encore sur internet

Après un déménagement, l'ancienne adresse survit à plusieurs endroits : la fiche Google, les annuaires, des sites tiers qui ont copié vos données. La marche à suivre :

1. Corrigez d'abord la fiche Google Business et votre propre site.
2. Passez en revue les annuaires où vous êtes inscrit (Pages Jaunes, annuaires de métier, Facebook, etc.) et mettez-les à jour.
3. Pour une page Google qui affiche encore d'anciennes informations malgré une mise à jour, utilisez l'outil de demande de suppression ou de réexamen d'URL de la Search Console.
4. Gardez la même écriture du nom, de l'adresse et du téléphone partout : c'est ce qui permet à Google de recouper les sources.

## Questions fréquentes

**Combien de temps faut-il pour que Google indexe un nouveau site ?**
Cela varie de quelques jours à plusieurs semaines. Envoyer le plan du site dans la Search Console et obtenir quelques liens depuis d'autres sites accélère la découverte, sans garantie de date.

**Dois-je acheter des liens ou des avis pour être mieux placé ?**
Non. Les règles de Google interdisent les liens achetés pour manipuler le classement et les faux avis. Ils exposent à des sanctions, jusqu'au retrait de la fiche.

**Mon site Wix ou WordPress est-il moins bien référencé qu'un site sur mesure ?**
Non, pas par principe. Ce qui compte, c'est la structure, la vitesse, les textes et l'absence de blocage. Une solution mal réglée peut échouer, et un site sur mesure sans stratégie aussi.

**Est-ce que je peux demander à Google d'explorer ma page tout de suite ?**
Oui, via l'inspection d'URL de la Search Console, qui propose de demander une indexation. Google n'est pas tenu de répondre dans un délai précis.
