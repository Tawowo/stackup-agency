---
term: "Sitemap XML"
title: "Qu'est-ce qu'un sitemap XML ?"
seoTitle: "Sitemap XML : définition, utilité et mise en place"
excerpt: "Sitemap XML : le plan de votre site à destination de Google. À quoi il sert, comment le vérifier dans Search Console et les erreurs courantes à éviter."
definition: "Le sitemap XML est un fichier qui liste les pages importantes d'un site pour aider les moteurs de recherche à les découvrir. Il ne garantit pas leur indexation, mais facilite le travail de Google."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 3
category: "seo"
keywords: ["sitemap xml", "plan de site xml", "définition sitemap", "sitemap google", "soumettre sitemap search console"]
related: ["robots-txt", "indexation", "crawl", "search-console", "maillage-interne"]
sources: ["https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview"]
---

**Le sitemap XML est le plan de votre site, rédigé pour les robots : une liste des pages que vous voulez voir explorées. Pour vous, c'est un fichier de confort, surtout utile pour un site récent ou volumineux, qui n'assure pas à lui seul que vos pages apparaîtront sur Google.**

## À quoi ça sert ?

Google découvre normalement les pages en suivant les liens. Le sitemap lui donne une liste directe, ce qui aide dans plusieurs cas : site tout neuf, qui n'a pas encore de liens entrants ; site avec beaucoup de pages ; pages peu reliées entre elles ; changements fréquents.

Pour un petit site de quelques pages bien reliées, il n'est pas indispensable, mais il ne coûte rien et c'est une bonne pratique.

## Comment ça marche (en pratique)

Le sitemap est un fichier texte au format XML, généralement à l'adresse `votresite.fr/sitemap.xml`. Chaque ligne indique l'adresse d'une page, et éventuellement sa date de dernière modification.

Les règles essentielles :

- N'y mettre que les pages que vous voulez voir dans Google, accessibles, en HTTPS et avec l'adresse définitive. Pas de pages redirigées, supprimées ou marquées [noindex](/lexique/noindex).
- Indiquer l'adresse du sitemap dans le fichier [robots.txt](/lexique/robots-txt) et le déclarer dans [Search Console](/lexique/search-console).
- Le tenir à jour : la plupart des gestionnaires de contenu et des sites modernes le génèrent automatiquement. Un sitemap est limité à un nombre maximal d'adresses et de poids ; au-delà, on en crée plusieurs (à vérifier dans la documentation de Google).

Après l'envoi, Search Console indique combien de pages ont été lues et signale les erreurs.

## Exemple concret

Exemple type : un électricien met en ligne un nouveau site de huit pages. Aucun site n'y renvoie encore. Il vérifie que `sitemap.xml` existe, l'ajoute dans Search Console, et constate que Google a lu les huit adresses. Une page « mentions légales » mal configurée en noindex apparaît dans les alertes : il la retire du sitemap, car elle n'a pas à y figurer.

## Les erreurs fréquentes

- Laisser dans le sitemap des adresses qui renvoient une erreur ou une redirection.
- Oublier de le mettre à jour après une refonte : il liste alors d'anciennes adresses.
- Croire qu'il suffit à faire indexer toutes les pages : c'est une suggestion, pas un ordre.
- Y inclure des pages de test ou des versions en double.
- Ne jamais regarder le rapport de Search Console, qui signale pourtant les erreurs de lecture.

## Pour aller plus loin

- Quand les pages sont lues mais pas retenues : [explorées mais non indexées dans Search Console](/blog/search-console-indexation-explorees-non-indexees).
- Une vérification complète : [l'audit SEO technique en 50 points](/blog/audit-seo-technique-checklist-50-points).
- Contrôler votre site : l'[audit gratuit](/outils/audit-site).
- Nos sites sont livrés avec un sitemap généré : voir la [création de site internet](/services/creation-de-site-internet).

## Questions fréquentes

**Un sitemap est-il obligatoire ?**
Non, mais il est recommandé. Google peut très bien découvrir un petit site sans, à condition que les pages soient reliées entre elles.

**Où trouver le sitemap de mon site ?**
Essayez `votresite.fr/sitemap.xml`. Si l'adresse affiche une page d'erreur, demandez à votre prestataire ou vérifiez les réglages de votre gestionnaire de contenu.

**Le sitemap XML est-il la même chose qu'un plan de site pour les visiteurs ?**
Non. Le sitemap XML s'adresse aux robots. Un plan de site visible, parfois en pied de page, s'adresse aux visiteurs.

**Faut-il y mettre toutes les pages ?**
Seulement celles qui ont vocation à apparaître dans Google. Excluez les pages privées, les remerciements de formulaire et les doublons.
