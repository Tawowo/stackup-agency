---
term: "Indexation"
title: "Qu'est-ce que l'indexation d'une page par Google ?"
seoTitle: "Indexation Google : définition et comment la vérifier"
excerpt: "Indexation : l'étape où Google enregistre une page dans sa base. Comment savoir si vos pages sont indexées et que faire quand elles ne le sont pas."
definition: "L'indexation est l'étape où un moteur de recherche enregistre une page dans sa base de données après l'avoir explorée. Seule une page indexée peut apparaître dans les résultats de recherche."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 3
category: "seo"
keywords: ["indexation", "indexation google", "page indexée", "définition indexation", "vérifier indexation site"]
related: ["crawl", "sitemap-xml", "robots-txt", "noindex", "search-console"]
sources: ["https://developers.google.com/search/docs/crawling-indexing"]
---

**L'indexation est le moment où Google enregistre une page dans sa base après l'avoir lue. Pour vous, la règle est simple : une page non indexée est introuvable sur Google, même parfaitement écrite.**

## À quoi ça sert ?

Google ne cherche pas sur le web en direct quand on lui pose une question : il interroge sa propre base, l'index. Une page y entre en trois temps : découverte, exploration (le [crawl](/lexique/crawl)), puis indexation. C'est seulement après qu'elle peut être classée et affichée.

Savoir si vos pages sont indexées est donc la première vérification quand un site « n'apparaît pas ». Si la page n'est pas dans l'index, inutile de retravailler les mots-clés : le problème est en amont.

## Comment ça marche (en pratique)

Pour vérifier :

- Dans [Search Console](/lexique/search-console), l'outil d'inspection d'URL indique si une adresse précise est connue de Google, et pourquoi elle ne l'est pas. Le rapport « Pages » donne la vue d'ensemble.
- La recherche `site:votresite.fr` dans Google donne une idée approximative, mais moins fiable.

Les causes les plus fréquentes d'une page non indexée :

- Le site est récent et Google n'est pas encore passé.
- Un blocage volontaire ou accidentel : consigne [noindex](/lexique/noindex) ou règle du [robots.txt](/lexique/robots-txt).
- La page est jugée peu utile, trop proche d'une autre ou trop mince.
- Elle est mal reliée au reste du site ([maillage interne](/lexique/maillage-interne)).
- Une erreur technique (page inaccessible, redirection en boucle).

On peut demander une exploration via l'inspection d'URL, mais Google reste maître de sa décision.

## Exemple concret

Exemple type : une céramiste ouvre un site de six pages. Au bout de quelque temps, seules quatre sont dans Google. Dans Search Console, la page « Stages d'été » apparaît en « explorée, actuellement non indexée » : elle ne contient que deux lignes. Elle ajoute du vrai contenu (déroulé, public, lieu, photos), relie la page depuis l'accueil et demande une nouvelle inspection. Rien n'est garanti, mais la page a désormais de quoi être retenue.

## Les erreurs fréquentes

- Confondre « le site existe » et « le site est indexé ».
- Oublier de retirer un noindex ou un blocage de robots.txt à la mise en production.
- Multiplier les pages quasi identiques : Google en choisit une et laisse les autres de côté.
- Demander sans cesse une réindexation au lieu de corriger la cause.
- Ne jamais regarder le rapport « Pages » de Search Console.

## Pour aller plus loin

- Le cas le plus courant : [pages explorées mais non indexées](/blog/search-console-indexation-explorees-non-indexees).
- Si le site est invisible : [pourquoi mon site n'apparaît pas sur Google](/blog/pourquoi-mon-site-n-apparait-pas-sur-google).
- Un état des lieux : l'[audit gratuit](/outils/audit-site).
- Notre [service de référencement](/services/referencement).

## Questions fréquentes

**Combien de temps faut-il pour qu'une page soit indexée ?**
Il n'existe pas de durée garantie : de quelques heures à plusieurs semaines selon le site et la page. Un site récent ou peu lié est souvent plus lent.

**Indexée veut-il dire bien classée ?**
Non. L'indexation est un préalable : une page indexée peut rester très loin dans les résultats.

**Peut-on forcer l'indexation d'une page ?**
Non. On peut la signaler à Google (sitemap, inspection d'URL), mais le moteur décide d'indexer ou non.

**Toutes les pages d'un site doivent-elles être indexées ?**
Non. Certaines n'ont pas vocation à l'être : panier, pages de remerciement, résultats de recherche interne.
