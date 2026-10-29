---
term: "robots.txt"
title: "Qu'est-ce que le fichier robots.txt ?"
seoTitle: "robots.txt : définition, rôle et erreurs à éviter"
excerpt: "robots.txt : le fichier qui indique aux robots les zones à ne pas explorer. Ce qu'il fait, ce qu'il ne fait pas et l'erreur qui rend un site invisible."
definition: "Le fichier robots.txt, placé à la racine d'un site, indique aux robots des moteurs de recherche les parties qu'ils peuvent ou non explorer. Il règle l'exploration, pas l'affichage dans les résultats."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 3
category: "seo"
keywords: ["robots.txt", "fichier robots.txt", "robots txt définition", "bloquer google robots.txt", "robots.txt seo"]
related: ["sitemap-xml", "noindex", "crawl", "indexation", "search-console"]
sources: ["https://developers.google.com/search/docs/crawling-indexing/robots/intro"]
---

**Le fichier robots.txt est un petit texte, à la racine de votre site, qui indique aux robots de Google quelles zones ils peuvent explorer. Pour vous, il faut surtout savoir qu'il ne sert pas à cacher une page de Google, et qu'une ligne mal écrite peut rendre tout un site invisible.**

## À quoi ça sert ?

Il sert à gérer l'exploration, pas la confidentialité. Vous l'utilisez pour demander aux robots d'éviter des zones sans intérêt pour les internautes : panneau d'administration, résultats de recherche interne, filtres générant des milliers d'adresses presque identiques.

Il permet aussi d'indiquer l'adresse de votre [sitemap XML](/lexique/sitemap-xml).

## Comment ça marche (en pratique)

Le fichier se trouve toujours à `votresite.fr/robots.txt`. Il se compose de règles lisibles :

- `User-agent` désigne le robot concerné (`*` signifie tous) ;
- `Disallow` indique un chemin à ne pas explorer ;
- `Allow` autorise une exception ;
- `Sitemap` donne l'adresse du plan du site.

Deux points à bien comprendre :

1. Les robots sérieux, dont celui de Google, respectent ces règles. Mais le fichier est public : n'y listez rien de confidentiel, car cela révèle son existence. Pour protéger une zone, il faut un mot de passe.
2. Bloquer l'exploration n'empêche pas forcément une page d'apparaître dans Google. Si d'autres sites y renvoient, l'adresse peut s'afficher sans description. Pour retirer une page des résultats, on utilise la directive [noindex](/lexique/noindex), qui exige justement que la page reste explorable.

## Exemple concret

Exemple type : une agence immobilière locale met en ligne la nouvelle version de son site après des tests. Sur le site de test, le développeur avait écrit `Disallow: /` pour interdire tout le site aux robots. Cette ligne, oubliée lors de la mise en production, bloque l'exploration de tout le site : les pages disparaissent peu à peu de Google. Le correctif tient en une ligne à supprimer, mais il faut d'abord y penser.

## Les erreurs fréquentes

- Laisser `Disallow: /` après une mise en production.
- Utiliser robots.txt pour tenter de masquer une page confidentielle.
- Bloquer les fichiers de style ou de script dont Google a besoin pour afficher la page.
- Combiner robots.txt et noindex sur la même page : le robot ne peut plus lire la consigne noindex.
- Modifier le fichier sans le tester dans [Search Console](/lexique/search-console), qui permet de vérifier son contenu.

## Pour aller plus loin

- Les contrôles techniques à faire : [audit SEO technique en 50 points](/blog/audit-seo-technique-checklist-50-points).
- Si votre site n'apparaît pas : [pourquoi mon site n'apparaît pas sur Google](/blog/pourquoi-mon-site-n-apparait-pas-sur-google).
- Vérifier votre site : l'[audit gratuit](/outils/audit-site).
- Nous prenons en charge la mise en ligne dans la [création de site internet](/services/creation-de-site-internet).

## Questions fréquentes

**Mon site doit-il avoir un robots.txt ?**
Ce n'est pas obligatoire. Sans fichier, les robots explorent tout ce qu'ils trouvent. Il devient utile dès que vous voulez exclure certaines zones ou déclarer votre sitemap.

**Robots.txt empêche-t-il une page d'être indexée ?**
Pas de façon fiable. Il bloque l'exploration, pas l'indexation. Pour exclure une page, utilisez noindex.

**Comment voir le robots.txt d'un site ?**
Ajoutez `/robots.txt` à la fin de l'adresse du site dans votre navigateur. Le fichier est public.

**Un mauvais robots.txt peut-il faire disparaître mon site de Google ?**
Oui, si une règle bloque l'ensemble du site ou les pages importantes. C'est l'une des vérifications à faire après chaque mise en ligne ou refonte.
