---
title: "Core Web Vitals 2026 : le guide technique complet"
seoTitle: "Core Web Vitals : LCP, INP et CLS expliqués (2026)"
excerpt: "LCP, INP, CLS : ce que mesure chaque indicateur, les seuils fixés par Google et les corrections à apporter pour une page rapide et stable sur mobile."
date: "2026-05-12"
updated: "2026-10-29"
readTime: 9
tag: "Performance"
category: "performance"
keywords: ["core web vitals 2026", "core web vitals guide", "LCP INP CLS", "performance web SEO"]
---


Depuis leur intégration officielle dans l'algorithme de Google en 2021, les Core Web Vitals sont devenus incontournables pour tout site qui souhaite performer en recherche organique. Depuis, ces métriques ont évolué : l'INP a remplacé le FID en mars 2024 et les seuils sont aujourd'hui bien documentés. Ce guide vous donne les clés pour mesurer, comprendre et optimiser chaque indicateur, avec les seuils officiels de Google.

## Qu'est-ce que les Core Web Vitals ?

Les Core Web Vitals sont trois métriques standardisées qui mesurent l'**expérience utilisateur réelle** d'une page web. Google les collecte via le Chrome User Experience Report (CrUX), qui agrège des données de millions d'utilisateurs Chrome. Contrairement à un test en laboratoire, ces données reflètent ce que vivent vraiment vos visiteurs sur leur connexion, leur appareil, leur navigateur.

Ces métriques entrent dans le calcul du **Page Experience signal**, l'un des facteurs de classement de Google. Elles ne remplacent pas la pertinence du contenu, mais à contenu équivalent, un site bien optimisé surclassera un site lent.

## LCP — Largest Contentful Paint

### Ce que mesure le LCP

Le LCP mesure le temps nécessaire pour que **l'élément le plus large visible à l'écran** soit entièrement rendu. Cet élément est généralement une image hero, une image de fond CSS, ou un bloc de texte volumineux en haut de page.

### Les seuils Google

- **Bon** : < 2,5 secondes
- **À améliorer** : entre 2,5 et 4 secondes
- **Mauvais** : > 4 secondes

En pratique, les sites e-commerce dont les images produit ne sont pas optimisées affichent souvent un LCP dans la zone « mauvais » sur mobile. C'est coûteux : plus une page met de temps à s'afficher, plus les visiteurs abandonnent avant d'avoir vu le produit, et l'effet se voit sur les conversions.

### Comment optimiser le LCP

**1. Précharger l'image LCP**

Utilisez `<link rel="preload">` dans le `<head>` de votre page :

```html
<link rel="preload" as="image" href="/hero-image.webp" fetchpriority="high">
```

**2. Supprimer les ressources bloquantes**

Les scripts JavaScript et CSS non critiques chargés dans le `<head>` retardent le rendu. Utilisez `defer` ou `async` pour les scripts, et chargez les CSS critiques en inline.

**3. Optimiser votre hébergement**

Un TTFB (Time To First Byte) élevé plombe mécaniquement le LCP. Visez un TTFB < 800 ms. Un hébergement mutualisé d'entrée de gamme affiche souvent un TTFB nettement plus élevé que cette cible, surtout aux heures de pointe — mesurez le vôtre, puis envisagez un hébergeur plus performant ou un CDN.

**4. Passer aux formats modernes**

WebP réduit sensiblement le poids des images par rapport au JPEG, et AVIF va en général encore plus loin à qualité visuelle équivalente ; le gain exact dépend de chaque image, donc testez sur vos propres visuels. Consultez notre article sur [l'optimisation des images web](/blog/optimiser-images-web-webp-avif-seo) pour les détails d'implémentation.

## INP — Interaction to Next Paint

### Ce que mesure l'INP

L'INP a remplacé le FID (First Input Delay) en mars 2024. C'est une métrique bien plus complète : là où le FID ne mesurait que la première interaction, **l'INP mesure la réactivité globale de la page** en prenant en compte toutes les interactions utilisateur (clics, pressions clavier, taps).

L'INP retient, en pratique, l'une des interactions les plus lentes de la session (le 98e percentile sur les pages très interactives). En clair : il capture les pires interactions, pas la moyenne.

### Les seuils Google

- **Bon** : < 200 ms
- **À améliorer** : entre 200 et 500 ms
- **Mauvais** : > 500 ms

### Comment optimiser l'INP

**1. Réduire les Long Tasks JavaScript**

Une Long Task est un bloc de code JavaScript qui bloque le thread principal plus de 50 ms. L'utilisateur perçoit un freezing ou un retard de réponse. Utilisez le Chrome DevTools Performance panel pour les identifier.

**2. Différer les traitements non urgents**

```javascript
// Au lieu de bloquer le thread principal
processHeavyData(data);

// Utilisez scheduler.postTask ou setTimeout
setTimeout(() => processHeavyData(data), 0);
```

**3. Limiter les effets de bord au clic**

Chaque gestionnaire de clic qui déclenche des calculs complexes, des mises à jour DOM massives ou des appels réseau synchrones dégrade l'INP. Profitez du [guide de vitesse de chargement](/blog/vitesse-chargement-site-guide-technique-complet) pour aller plus loin.

**4. Mettre à jour vers les frameworks modernes**

Les versions récentes de React, Vue et Svelte intègrent des mécanismes de concurrence (React Concurrent Mode, Svelte 5) qui découpent les mises à jour en unités plus petites, réduisant l'INP.

## CLS — Cumulative Layout Shift

### Ce que mesure le CLS

Le CLS mesure la **stabilité visuelle** d'une page. Chaque fois qu'un élément se déplace inopinément pendant le chargement (une image qui apparaît et repousse le texte, une pub qui s'insère, une police qui change la mise en page), un score de décalage est calculé.

Le score CLS est la somme de tous ces décalages inattendus. Un score de 0 signifie aucun décalage. Un score de 0,5 signifie une expérience très dégradée.

### Les seuils Google

- **Bon** : < 0,1
- **À améliorer** : entre 0,1 et 0,25
- **Mauvais** : > 0,25

### Comment optimiser le CLS

**1. Toujours définir des dimensions pour les images**

```html
<!-- Mauvais -->
<img src="photo.webp" alt="produit">

<!-- Bon -->
<img src="photo.webp" alt="produit" width="800" height="600">
```

Sans dimensions, le navigateur ne peut pas réserver l'espace avant le chargement de l'image. Résultat : le contenu saute quand l'image arrive.

**2. Réserver l'espace pour les publicités et embeds**

Utilisez des conteneurs CSS avec une taille fixe ou un aspect-ratio prédéfini pour les blocs publicitaires, les iframes YouTube et les widgets tiers.

**3. Éviter les polices de substitution trop différentes**

Le FOUT (Flash of Unstyled Text) et le FOIT (Flash of Invisible Text) génèrent du CLS quand la police web diffère trop de la police système. Utilisez `font-display: optional` ou auto-hébergez vos polices pour un contrôle optimal.

**4. Charger les éléments dynamiques hors du flux**

Les bandeaux cookies, popups et notifications qui apparaissent au chargement doivent être positionnés en `fixed` ou `absolute` pour ne pas déplacer le contenu existant.

## Comment mesurer vos Core Web Vitals

### Outils de terrain (données réelles)

- **Google Search Console** → rapport "Expérience de la page" : données CrUX par URL, segmentées mobile/desktop
- **PageSpeed Insights** : combine données terrain (CrUX) et laboratoire (Lighthouse)
- **CrUX Dashboard** (Looker Studio) : visualisation de l'historique des données terrain

### Outils de laboratoire (données simulées)

- **Lighthouse** (dans Chrome DevTools, onglet "Lighthouse") : audit complet avec suggestions
- **WebPageTest.org** : tests depuis différentes localisations, filmstrip visuel
- **GTmetrix** : visualisation de la cascade de chargement

Pour une analyse complète, consultez notre [guide Google Search Console avancé](/blog/google-search-console-guide-avance-seo) — la section "Core Web Vitals" du rapport de performance est particulièrement instructive.

## Priorités d'optimisation selon votre type de site

| Type de site | Problème le plus fréquent | Priorité |
|---|---|---|
| Site vitrine avec images | LCP élevé | Optimiser images + preload |
| E-commerce | CLS (images produit sans dimensions) | Dimensions fixes sur toutes les images |
| Blog / contenu | INP (commentaires, widgets) | Charger les scripts tiers en lazy |
| Landing page | LCP + CLS | Image hero en WebP + réserver espaces |

Pour les sites e-commerce notamment, les Core Web Vitals ont un impact direct sur les conversions. Notre service de [création de site e-commerce](/services/site-ecommerce) intègre ces optimisations dès la conception.

L'optimisation des Core Web Vitals est un travail continu, pas un projet ponctuel. Les mises à jour de navigateurs, l'ajout de nouveaux scripts marketing, les changements de design : chaque modification peut impacter vos scores. Mettez en place un monitoring mensuel via Search Console et traitez les régressions rapidement.

## En résumé

- Les Core Web Vitals 2026 mesurent trois axes : la vitesse de chargement (LCP), la réactivité (INP) et la stabilité visuelle (CLS).
- Les seuils "bon" sont LCP < 2,5s, INP < 200ms, CLS < 0,1 — mesurés sur des données réelles via le Chrome User Experience Report.
- Le mobile est prioritaire dans l'index de Google (mobile-first indexing) : c'est d'abord votre score mobile qu'il faut surveiller.
- Trois outils gratuits suffisent pour mesurer et suivre ses scores : Search Console, PageSpeed Insights et Lighthouse.

## Questions fréquentes

**Quel est un bon score LCP pour mon site ?**
Un LCP inférieur à 2,5 secondes est considéré "bon" par Google, pour 75% de vos visiteurs. En pratique, visez moins de 2 secondes pour avoir une marge de sécurité.

**L'INP affecte-t-il directement mon classement Google ?**
Oui. L'INP fait partie du Page Experience signal depuis mars 2024, en remplacement du FID. Un mauvais INP (> 500 ms) peut pénaliser votre positionnement face à des concurrents avec un meilleur score, à qualité de contenu équivalente.

**Comment mesurer mes Core Web Vitals gratuitement ?**
Trois outils gratuits suffisent : Google Search Console (données réelles de vos utilisateurs), PageSpeed Insights (analyse combinant données réelles et simulées) et Lighthouse intégré à Chrome DevTools.

**Les Core Web Vitals sont-ils plus importants sur mobile que sur desktop ?**
Le mobile est prioritaire. Depuis le déploiement complet du mobile-first indexing, la version mobile de votre site est prioritaire dans l'index de Google, et les seuils sont plus difficiles à atteindre sur mobile (réseaux plus lents, CPU moins puissants).

**Un site en Next.js a-t-il un avantage sur les Core Web Vitals ?**
Un site codé sur mesure avec un framework moderne (Next.js) part avec un avantage réel : pas de plugins superflus, rendu optimisé, images servies en formats modernes par défaut — contrairement à un site sous CMS générique chargé d'extensions.

---

*Pour aller plus loin : [Pourquoi votre site charge lentement](/blog/pourquoi-site-charge-lentement) · [Vitesse mobile : le guide d'optimisation](/blog/vitesse-mobile-optimisation) · [Google Search Console : le guide avancé](/blog/google-search-console-guide-avance-seo) · [Rédaction de blog SEO](/services/referencement)*
