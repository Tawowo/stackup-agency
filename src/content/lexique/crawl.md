---
term: "Crawl"
title: "Qu'est-ce que le crawl (exploration par Google) ?"
seoTitle: "Crawl : définition de l'exploration d'un site par Google"
excerpt: "Crawl : le passage des robots de Google sur votre site pour découvrir ses pages. Comment ça fonctionne et comment faciliter leur travail sur un petit site."
definition: "Le crawl est l'exploration automatique d'un site par les robots d'un moteur de recherche, qui suivent les liens de page en page pour découvrir et relire le contenu avant de l'indexer."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 3
category: "seo"
keywords: ["crawl", "crawl google", "définition crawl", "googlebot", "exploration d'un site"]
related: ["indexation", "robots-txt", "sitemap-xml", "maillage-interne", "search-console"]
sources: ["https://developers.google.com/search/docs/crawling-indexing/googlebot"]
---

**Le crawl est l'exploration de votre site par les robots de Google : ils passent de lien en lien pour découvrir vos pages. Pour vous, il suffit de savoir qu'une page que le robot ne peut pas atteindre ne sera jamais lue, donc jamais classée.**

## À quoi ça sert ?

Le robot de Google, appelé Googlebot, parcourt le web en permanence pour trouver des pages nouvelles ou modifiées. Ce qu'il lit est ensuite analysé, puis éventuellement ajouté à l'[index](/lexique/indexation). Sans crawl, aucune indexation.

Le sujet intéresse surtout ceux qui constatent qu'une page tarde à apparaître ou que des modifications mettent du temps à être prises en compte.

## Comment ça marche (en pratique)

Le robot part de pages connues et suit les liens. Il peut aussi utiliser votre [sitemap XML](/lexique/sitemap-xml). Chaque site se voit attribuer un effort d'exploration limité, parfois appelé « budget de crawl ». Pour un petit site de quelques dizaines de pages, ce n'est pas un sujet : il ne devient réel que pour les sites de grande taille.

Ce qui facilite le crawl :

- Des pages **reliées** entre elles ([maillage interne](/lexique/maillage-interne)), sans page orpheline.
- Un site **rapide** et stable : un serveur lent ou qui renvoie des erreurs décourage le robot.
- Des liens écrits en vrais liens, que le robot peut suivre.
- Un fichier [robots.txt](/lexique/robots-txt) qui ne bloque pas les zones utiles.
- Peu de redirections en chaîne et peu de [pages en erreur](/lexique/erreur-404).

Search Console propose un rapport de statistiques sur l'exploration, avec les erreurs rencontrées.

## Exemple concret

Exemple type : un restaurant a un site dont la carte est un fichier image intégré dans la page, sans texte, et les plats saisonniers ne sont accessibles que via un menu qui ne fonctionne que par un script. Le robot ne voit pas les plats. Le restaurateur remplace la carte par une page de texte avec de vrais liens vers chaque catégorie : le robot peut désormais lire et suivre la structure.

## Les erreurs fréquentes

- Laisser des pages sans aucun lien entrant : le robot ne les trouve pas.
- Bloquer par erreur des dossiers entiers dans robots.txt.
- Cacher des contenus derrière des menus ou des boutons qui ne fonctionnent qu'avec une interaction.
- Négliger la vitesse et la stabilité du serveur.
- S'inquiéter du « budget de crawl » sur un petit site, alors que les causes sont généralement ailleurs.

## Pour aller plus loin

- Un contrôle complet : [audit SEO technique en 50 points](/blog/audit-seo-technique-checklist-50-points).
- Les cas de pages vues mais non retenues : [Search Console et indexation](/blog/search-console-indexation-explorees-non-indexees).
- Tester votre site : l'[audit gratuit](/outils/audit-site).
- Nous concevons des sites faciles à explorer : [création de site internet](/services/creation-de-site-internet).

## Questions fréquentes

**Crawl et indexation, quelle différence ?**
Le crawl est la lecture de la page par le robot. L'indexation est l'enregistrement de cette page dans la base de Google. Une page peut être explorée sans être indexée.

**À quelle fréquence Google explore-t-il mon site ?**
Elle varie selon la taille, la popularité et la fréquence de mise à jour. Un site qui change souvent est généralement revisité plus régulièrement.

**Puis-je demander à Google de revenir sur une page ?**
Oui, avec l'outil d'inspection d'URL de Search Console. Google reste libre du moment et de la suite.

**Faut-il craindre le crawl de robots non désirés ?**
Certains robots visitent un site sans y être invités. Un pare-feu ou votre hébergeur peut les limiter. Le robots.txt ne les arrête que s'ils veulent le respecter.
