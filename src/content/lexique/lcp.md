---
term: "LCP"
title: "Qu'est-ce que le LCP (Largest Contentful Paint) ?"
seoTitle: "LCP (Largest Contentful Paint) : définition et seuil"
excerpt: "Le LCP mesure le temps d'affichage du plus gros élément de votre page. Définition simple, seuil retenu par Google et leviers concrets pour l'améliorer."
definition: "Le LCP (Largest Contentful Paint) est le temps que met le plus grand élément visible d'une page, souvent une image ou un gros titre, à s'afficher à l'écran. Il mesure la rapidité perçue."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 4
category: "seo"
keywords: ["lcp", "largest contentful paint", "lcp définition", "c'est quoi le lcp", "améliorer le lcp"]
related: ["core-web-vitals", "hebergement-web", "mobile-first", "taux-de-rebond", "responsive-design"]
sources: ["https://web.dev"]
---

**Le LCP est le temps qui s'écoule entre le début du chargement d'une page et l'affichage de son plus gros élément visible : une photo, une bannière ou un bloc de texte. Pour vous, c'est le moment où le visiteur a enfin l'impression que la page est là.**

## À quoi ça sert ?

Un visiteur ne mesure pas la vitesse de votre site en millisecondes. Il regarde son écran et se demande si quelque chose d'utile est apparu. Le LCP traduit cette impression en chiffre.

C'est l'un des trois indicateurs des Core Web Vitals, les mesures d'expérience que Google publie pour juger une page. Les deux autres concernent la réactivité aux clics (INP) et la stabilité de la mise en page (CLS). Le LCP est le plus parlant pour un site vitrine, parce qu'il correspond à ce que l'on voit en premier.

Il sert donc à deux choses : repérer les pages qui font attendre vos visiteurs, et vérifier qu'une modification (nouvelle photo, nouveau thème, nouvel hébergeur) n'a rien dégradé.

## Comment ça marche (en pratique)

Le navigateur repère, pendant le chargement, quel est le plus grand élément visible dans la première fenêtre, sans avoir à faire défiler. Il note le moment où cet élément est entièrement dessiné. Cet instant est le LCP.

Selon les repères publiés sur web.dev, un LCP de 2,5 secondes ou moins est considéré comme bon, au-delà de 4 secondes comme mauvais, avec une zone intermédiaire entre les deux. La mesure retenue est celle du plus grand nombre de visites réelles (le seuil s'applique au 75e centile). Ces seuils peuvent évoluer : à vérifier sur web.dev.

Vous pouvez le lire à trois endroits :

- **PageSpeed Insights**, qui affiche les données de vraies visites quand il y en a assez, puis un test en laboratoire ;
- **Search Console**, rapport « Expérience » sur les Core Web Vitals, page par page ;
- **les outils de développement du navigateur**, pour voir précisément quel élément est le LCP.

Le plus souvent, l'élément en cause est la grande photo en haut de la page d'accueil. Plus rarement, c'est un titre qui attend le chargement d'une police.

## Exemple concret

Exemple type : un paysagiste affiche en haut de sa page d'accueil une photo de jardin prise au téléphone, envoyée telle quelle, très lourde. Sur mobile, avec une connexion moyenne, le visiteur voit un fond vide pendant plusieurs secondes. Le LCP est mauvais.

En redimensionnant la photo à la taille réellement affichée, en la convertissant en format moderne (WebP ou AVIF) et en la chargeant en priorité, l'image apparaît presque tout de suite. Le site n'a pas changé d'apparence. Il est simplement arrivé à l'écran plus vite.

## Les erreurs fréquentes

- **Mettre en avant une photo énorme** sans la compresser ni la redimensionner.
- **Charger l'image principale en différé** (« lazy loading »). Ce réglage convient aux images du bas de page, pas à la première.
- **Empiler des extensions et des scripts** (curseurs animés, widgets, vidéos) qui bloquent l'affichage.
- **Ignorer le serveur.** Un hébergement lent retarde tout, quelle que soit la qualité de la page.
- **Ne tester que sur son ordinateur** relié à une bonne connexion. Vos clients sont sur mobile, souvent en déplacement.

## Pour aller plus loin

- [Core Web Vitals : le guide technique](/blog/core-web-vitals-2026-guide-technique)
- [Pourquoi mon site charge lentement](/blog/pourquoi-site-charge-lentement)
- [Optimiser ses images : WebP, AVIF et SEO](/blog/optimiser-images-web-webp-avif-seo)
- [Audit gratuit de votre site](/outils/audit-site)

## Questions fréquentes

**Le LCP influence-t-il vraiment mon classement sur Google ?**
Les Core Web Vitals font partie des signaux d'expérience de page, mais ils pèsent peu face à la pertinence du contenu. Un bon LCP aide surtout vos visiteurs à rester.

**Quelle est la différence entre le LCP et le temps de chargement complet ?**
Le temps de chargement complet attend que tout soit chargé, y compris ce qu'on ne voit pas. Le LCP ne s'intéresse qu'à ce qui apparaît dans la première fenêtre.

**Mon LCP est différent entre le test et la Search Console, pourquoi ?**
Le test est une simulation ponctuelle. La Search Console agrège de vraies visites sur une période, avec des appareils et des connexions variés.

**Peut-on corriger le LCP sans refaire le site ?**
Souvent oui : images allégées, polices mieux chargées, scripts retirés ou différés. Si le problème vient de la structure du site ou de l'hébergement, il faut parfois aller plus loin.
