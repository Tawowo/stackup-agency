---
term: "Core Web Vitals"
title: "Que sont les Core Web Vitals ?"
seoTitle: "Core Web Vitals : définition, LCP, INP et CLS"
excerpt: "Core Web Vitals : les trois mesures de Google sur la vitesse et la stabilité d'une page (LCP, INP, CLS). Seuils, outils de test et correctifs simples."
definition: "Les Core Web Vitals sont trois mesures de Google sur l'expérience d'une page : vitesse d'affichage (LCP), réactivité (INP) et stabilité visuelle (CLS). Elles comptent parmi les signaux de qualité."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 4
category: "seo"
keywords: ["core web vitals", "définition core web vitals", "lcp inp cls", "signaux web essentiels", "vitesse site google"]
related: ["lcp", "responsive-design", "mobile-first", "search-console", "referencement-naturel"]
sources: ["https://web.dev/articles/vitals", "https://developers.google.com/search/docs/appearance/core-web-vitals"]
---

**Les Core Web Vitals sont trois indicateurs par lesquels Google mesure si une page est agréable à utiliser : elle s'affiche vite, réagit vite et ne bouge pas pendant qu'on la lit. Pour vous, ils servent de guide pour repérer un site lent ou instable, surtout sur mobile.**

## À quoi ça sert ?

Un visiteur qui attend ou qui clique sur le mauvais bouton parce que la page a sauté repart. Google en tient compte : ces indicateurs font partie des signaux d'expérience sur la page. Ils ne remplacent pas la qualité du contenu, mais à contenu comparable, une page plus agréable est favorisée. Ils améliorent aussi vos demandes de contact, indépendamment du classement.

## Comment ça marche (en pratique)

Les trois mesures et leurs seuils « bon » selon web.dev (à vérifier sur le site officiel, car ils peuvent évoluer) :

- **LCP (Largest Contentful Paint)** : le temps d'affichage du plus gros élément visible, souvent une photo ou un titre. Bon : 2,5 secondes ou moins. Voir aussi [LCP](/lexique/lcp).
- **INP (Interaction to Next Paint)** : la réactivité aux clics, aux touches et aux appuis, qui a remplacé l'ancien indicateur FID. Bon : 200 millisecondes ou moins.
- **CLS (Cumulative Layout Shift)** : la stabilité visuelle, c'est-à-dire de combien le contenu se décale pendant le chargement. Bon : 0,1 ou moins.

Ces mesures sont relevées sur de vrais visiteurs, puis évaluées au 75e percentile. Vous les voyez dans [Search Console](/lexique/search-console) (rubrique Core Web Vitals) et dans PageSpeed Insights. Sur un site récent ou peu visité, les données réelles peuvent manquer : l'outil affiche alors des tests en laboratoire.

## Exemple concret

Exemple type : un fleuriste a une page d'accueil dont la grande photo pèse très lourd et n'est pas compressée. Le LCP est mauvais, surtout sur mobile. Il remplace l'image par une version dans un format moderne, à la bonne taille, et réserve l'espace de la photo dans la page pour éviter qu'elle ne pousse le texte au chargement. Il retest ensuite avec PageSpeed Insights.

## Les erreurs fréquentes

- Tester uniquement sur son ordinateur avec une connexion rapide : la majorité des visiteurs sont sur mobile.
- Charger de grosses images non optimisées, des vidéos ou des polices en grand nombre.
- Ajouter des bandeaux, des fenêtres publicitaires ou des widgets qui décalent la page.
- Empiler les extensions ou scripts tiers, surtout sur un gestionnaire de contenu lourd.
- Chercher le score parfait au détriment du contenu : l'objectif est « bon », pas 100 sur 100.

## Pour aller plus loin

- Le détail technique : [Core Web Vitals, guide technique](/blog/core-web-vitals-2026-guide-technique).
- Comprendre la lenteur : [pourquoi un site charge lentement](/blog/pourquoi-site-charge-lentement).
- Tester votre site : l'[audit gratuit](/outils/audit-site).
- Nos sites sont construits pour la vitesse : voir la [création de site internet](/services/creation-de-site-internet).

## Questions fréquentes

**Les Core Web Vitals influencent-ils le classement ?**
Oui, ils font partie des signaux d'expérience de page. Leur poids reste limité par rapport à la pertinence du contenu, mais ils comptent à qualité égale.

**Où voir les Core Web Vitals de mon site ?**
Dans Search Console (rubrique dédiée) et dans PageSpeed Insights, en saisissant l'adresse d'une page.

**Pourquoi mon mobile est-il moins bon que mon ordinateur ?**
Les téléphones ont des processeurs et des connexions moins performants, et les mesures de Google les testent dans des conditions plus exigeantes.

**INP, FID : quelle différence ?**
INP a remplacé FID comme indicateur de réactivité. Il observe l'ensemble des interactions de la visite, pas seulement la première.
