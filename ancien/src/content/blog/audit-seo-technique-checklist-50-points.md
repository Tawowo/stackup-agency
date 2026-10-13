---
title: "Audit SEO technique : checklist 50 points complète"
excerpt: "Checklist audit SEO technique en 50 points : indexation, performance, on-page, mobile, données structurées. Identifiez et corrigez vos problèmes SEO."
date: "2026-03-30"
readTime: 12
tag: "SEO Technique"
category: "seo"
keywords: ["audit SEO technique", "checklist SEO", "SEO technique", "audit site web", "SEO 50 points"]
---


Un audit SEO technique est le bilan de santé de votre site web. Avant de produire du contenu, de construire des liens ou d'investir dans la publicité, vous devez vous assurer que votre site est techniquement capable d'être indexé, compris et bien classé par Google. Cette checklist de 50 points couvre tous les aspects critiques, organisés par priorité.

**Outils nécessaires** : Google Search Console (gratuit), Google PageSpeed Insights (gratuit), Screaming Frog SEO Spider (gratuit jusqu'à 500 URLs), Lighthouse (intégré à Chrome).

---

## Catégorie 1 : Indexation et crawlabilité (10 points)

Ces points déterminent si Google peut **trouver et indexer** vos pages.

**Point 1 — Robots.txt bien configuré**
Vérifiez que votre fichier `robots.txt` (accessible sur `votresite.fr/robots.txt`) ne bloque pas accidentellement des pages importantes. Une erreur classique : bloquer tout le site avec `Disallow: /` oublié lors d'une migration.

**Point 2 — Sitemap XML soumis et valide**
Votre sitemap (`/sitemap.xml`) doit lister toutes vos pages indexables, être soumis dans Google Search Console → Sitemaps, et ne contenir que des URLs retournant un code 200 (pas de redirections ou de pages 404 dans le sitemap).

**Point 3 — Pas de balises noindex sur des pages importantes**
Vérifiez que vos pages de service et de contenu ne contiennent pas `<meta name="robots" content="noindex">` par erreur. Screaming Frog peut les lister toutes.

**Point 4 — Couverture d'index dans Search Console**
Dans GSC → Index → Couverture : examinez les URLs "Exclues" et "En erreur". Les erreurs 404 légitimes sont normales ; les pages importantes en erreur doivent être corrigées.

**Point 5 — Profondeur d'URL < 3 clics depuis l'accueil**
Toute page importante doit être accessible en 3 clics maximum depuis la page d'accueil. Les pages enfouies plus profondément sont moins bien crawlées.

**Point 6 — Pas de contenu dupliqué interne**
Utilisez Search Console ou Screaming Frog pour détecter les pages avec du contenu très similaire. Réglez avec des balises canoniques (`<link rel="canonical">`).

**Point 7 — Canonical tags corrects**
Chaque page doit avoir un canonical qui pointe vers elle-même (self-referencing canonical) ou vers la version canonique si le contenu existe en plusieurs versions (avec/sans www, http/https, avec/sans trailing slash).

**Point 8 — Redirections 301 correctement chaînées**
Les redirections en chaîne (A → B → C) diluent le PageRank et ralentissent le crawl. Aplatissez-les en redirections directes (A → C). Screaming Frog les détecte avec le rapport "Redirect Chains".

**Point 9 — Pas de pages orphelines**
Une page sans lien entrant interne est invisible pour Google. Listez vos pages via Screaming Frog et vérifiez que chacune reçoit au moins un lien depuis une autre page de votre site.

**Point 10 — Log files / fréquence de crawl**
Si vous avez accès aux logs de votre serveur, analysez la fréquence à laquelle Googlebot visite votre site. Une fréquence faible indique soit un site peu autorité, soit des problèmes techniques qui découragent le crawl.

---

## Catégorie 2 : Performance et Core Web Vitals (10 points)

**Point 11 — LCP < 2,5 secondes (données terrain)**
Vérifiez dans Google Search Console → Expérience → Signaux web essentiels. Le LCP terrain (pas laboratoire) doit être vert pour 75 % de vos visites. Consultez notre [guide Core Web Vitals 2026](/blog/core-web-vitals-2026-guide-technique) pour les optimisations.

**Point 12 — INP < 200 ms**
Mesurez l'INP via PageSpeed Insights (données terrain) ou via le rapport Core Web Vitals de Search Console. Un INP > 500 ms est critique.

**Point 13 — CLS < 0,1**
Vérifiez le rapport CLS dans Search Console. Les causes fréquentes : images sans dimensions, polices web avec FOUT, publicités sans réservation d'espace.

**Point 14 — TTFB < 800 ms**
Le Time To First Byte mesure la réactivité de votre serveur. Testable via WebPageTest.org. Un TTFB > 1,5 s signifie souvent un hébergement insuffisant ou une base de données non optimisée.

**Point 15 — Compression Gzip/Brotli activée**
Vérifiez dans les DevTools Chrome (onglet Network → Headers) que vos ressources HTML/CSS/JS sont servies avec `content-encoding: gzip` ou `br`. Gain moyen : 60-80 % sur la taille des fichiers texte.

**Point 16 — Images en formats modernes (WebP/AVIF)**
Vérifiez que vos images sont en WebP ou AVIF, pas en PNG/JPEG lourd. Consultez notre guide d'[optimisation des images web](/blog/optimiser-images-web-webp-avif-seo).

**Point 17 — Lazy loading sur les images hors viewport**
Les images situées sous le premier écran doivent avoir l'attribut `loading="lazy"`. Les images dans le premier écran (notamment l'image LCP) ne doivent PAS avoir lazy loading.

**Point 18 — Cache navigateur bien configuré**
Vérifiez les headers `Cache-Control` et `Expires` de vos ressources statiques. Les images, CSS et JS doivent être mis en cache pendant au moins 1 an (`max-age=31536000`).

**Point 19 — Score PageSpeed Insights mobile > 70**
Visez 70+ sur mobile dans PageSpeed Insights. En dessous de 50, c'est urgent. Notez que le score laboratoire peut différer des données terrain.

**Point 20 — CDN activé (sites avec audience nationale/internationale)**
Un CDN (Content Delivery Network) réduit la latence en servant les ressources statiques depuis un serveur proche de l'utilisateur. Pour un site local à Tours, ce n'est pas toujours critique. Pour un e-commerce avec clients dans toute la France, c'est important.

---

## Catégorie 3 : On-page et structure (10 points)

**Point 21 — Balise title unique sur chaque page (50-60 caractères)**
Vérifiez avec Screaming Frog → "Page Titles" qu'aucune page n'a de title dupliqué, vide ou tronqué dans les SERP.

**Point 22 — Meta description unique et incitative (150-160 caractères)**
La meta description n'est pas un facteur de classement direct mais influence fortement le CTR. Elle doit contenir le mot-clé principal et une promesse claire.

**Point 23 — Un seul H1 par page**
Le H1 doit être unique, contenir le mot-clé principal et décrire fidèlement le contenu de la page. Évitez d'utiliser votre logo ou nom de site comme H1.

**Point 24 — Hiérarchie H2/H3 cohérente**
Vérifiez que vos titres respectent une hiérarchie logique : H1 → H2 → H3, sans sauter de niveaux. Screaming Frog peut exporter la structure des titres.

**Point 25 — Mots-clés dans les balises importantes**
Le mot-clé principal doit apparaître dans : le H1, les 100 premiers mots du contenu, au moins un H2, le title, la meta description, l'attribut alt d'une image.

**Point 26 — Attributs alt sur toutes les images**
Toutes les images doivent avoir un attribut `alt` descriptif. Les images décoratives utilisent `alt=""`. Screaming Frog → Images → "Missing Alt Text".

**Point 27 — Contenu suffisant (> 300 mots par page)**
Les pages avec moins de 300 mots de contenu utile sont souvent considérées comme du "thin content". Pages de service : 600 mots minimum. Articles de blog : 1000+ mots.

**Point 28 — URLs propres et descriptives**
Les URLs doivent être courtes, en minuscules, avec des tirets (pas des underscores), sans paramètres inutiles. Évitez : `/page?id=42&cat=3`. Préférez : `/services/creation-site-vitrine`.

**Point 29 — Maillage interne présent**
Chaque page doit contenir des liens internes vers des pages connexes. Vérifiez qu'aucune page n'a zéro lien interne entrant. Notre guide sur le [maillage interne](/blog/maillage-interne-cocon-semantique-seo) détaille la stratégie.

**Point 30 — Liens brisés (404) absents**
Screaming Frog ou le rapport de couverture GSC identifient les liens internes pointant vers des 404. Chaque lien brisé est une mauvaise expérience utilisateur et un gaspillage de crawl budget.

---

## Catégorie 4 : Données structurées (5 points)

**Point 31 — Schema LocalBusiness sur la page d'accueil**
Indispensable pour tout commerce local. Inclut nom, adresse, téléphone, horaires, coordonnées GPS.

**Point 32 — Schema FAQPage sur les pages de service**
Augmente la surface d'affichage dans les SERP et améliore le CTR. Les questions doivent être visibles dans le contenu HTML.

**Point 33 — Schema BreadcrumbList**
Permet à Google d'afficher le fil d'Ariane dans les résultats. Facile à implémenter et bénéfice direct sur la présentation des résultats.

**Point 34 — Validation via Rich Results Test**
Testez chaque page instrumentée sur [search.google.com/test/rich-results](https://search.google.com/test/rich-results). Zéro erreur bloquante requise.

**Point 35 — Suivi via rapport "Résultats enrichis" dans GSC**
Monitoring mensuel dans Google Search Console pour détecter les nouvelles erreurs après chaque déploiement. Détails dans notre guide sur les [données structurées Schema.org](/blog/donnees-structurees-schema-org-commerces-locaux).

---

## Catégorie 5 : Mobile et UX (8 points)

**Point 36 — Test mobile Google passé (aucune erreur)**
Utilisez le rapport "Ergonomie sur mobile" dans Google Search Console. Problèmes fréquents : éléments cliquables trop proches, texte trop petit, contenu plus large que l'écran.

**Point 37 — Viewport meta tag présent**
`<meta name="viewport" content="width=device-width, initial-scale=1">` doit être dans le `<head>` de chaque page.

**Point 38 — Même contenu sur mobile et desktop**
Avec le mobile-first indexing, Google indexe votre version mobile. Si du contenu est caché ou réduit sur mobile (accordéons, onglets), assurez-vous que Google peut quand même y accéder. Voir notre guide sur l'[index mobile-first](/blog/index-mobile-first-google-optimiser-site-mobile).

**Point 39 — Taille des cibles tactiles > 48x48 px**
Les boutons et liens sur mobile doivent être assez grands pour être tapés facilement. Recommandation Google : minimum 48x48 pixels avec 8 pixels d'espacement.

**Point 40 — Pas de Flash ou technologies non supportées**
Flash est mort. Les iframes non responsives, les popups intrusives au chargement, les interstitiels qui bloquent le contenu sont pénalisés par Google depuis 2017.

**Point 41 — Score UX mobile > 80 (Lighthouse)**
Ouvrez Chrome DevTools → Lighthouse → cochez "Mobile" et "Performance". Un score UX mobile > 80 est le seuil pour une bonne expérience.

**Point 42 — Polices lisibles sur petits écrans (> 16px)**
La taille minimale recommandée pour le corps de texte est 16px sur mobile. Un texte trop petit force l'utilisateur à zoomer — mauvaise UX et signal négatif pour Google.

**Point 43 — Images responsive avec srcset**
Servez des images adaptées à la taille d'écran avec l'attribut `srcset`. Une image de 2000px de large sur un écran de 375px est un gaspillage de bande passante.

---

## Catégorie 6 : Sécurité et technique avancée (7 points)

**Point 44 — HTTPS actif sur tout le site**
Vérifiez que toutes les pages (y compris images, scripts, CSS) sont servies en HTTPS. Une page en HTTPS qui charge des ressources HTTP crée des "mixed content" qui peuvent bloquer le chargement.

**Point 45 — Certificat SSL valide et non expiré**
Vérifiez la date d'expiration de votre certificat SSL. Un certificat expiré rend votre site inaccessible et détruit votre SEO instantanément.

**Point 46 — Une seule version de l'URL (www ou non-www)**
Choisissez `www.votresite.fr` ou `votresite.fr`, mais pas les deux. L'autre doit rediriger en 301 vers la version choisie. Déclarez la version préférée dans Google Search Console.

**Point 47 — Balises hreflang si site multilingue**
Si votre site existe en plusieurs langues, les balises hreflang indiquent à Google quelle version servir selon la langue/région de l'utilisateur.

**Point 48 — Pagination bien gérée**
Les pages paginées (`/blog/page/2`) doivent être indexables si elles contiennent du contenu unique. Évitez d'utiliser `noindex` sur les pages de pagination — préférez des liens `rel="prev"` / `rel="next"` ou, pour les grands sites, la pagination infinie avec intersection observer.

**Point 49 — Fichier .htaccess ou configuration serveur optimisés**
Vérifiez : compression activée, cache navigateur configuré, redirection http → https, redirection non-www → www (ou l'inverse).

**Point 50 — Google Analytics 4 et Search Console correctement configurés**
Sans mesure, pas d'amélioration. GA4 et GSC doivent être installés, liés entre eux, et monitorés mensuellement. Consultez notre guide de [mesure du ROI SEO](/blog/mesurer-roi-seo-kpis-tableau-bord-tpe).

---

## Par où commencer ?

Si votre site a de nombreux problèmes, traitez-les dans cet ordre :
1. **Indexation** (points 1-10) : si Google ne peut pas vous indexer, rien d'autre ne sert
2. **HTTPS et sécurité** (points 44-46) : prérequis absolus
3. **Mobile** (points 36-43) : priorité avec le mobile-first indexing
4. **Performance** (points 11-20) : impact direct sur les Core Web Vitals
5. **On-page** (points 21-30) : optimisations de contenu et de structure
6. **Données structurées** (points 31-35) : bonus de visibilité

## FAQ

### À quelle fréquence réaliser un audit SEO technique ?

Un audit complet est recommandé tous les 6 mois, ou après tout changement majeur du site (refonte, migration, ajout de fonctionnalités). Un monitoring mensuel via Google Search Console permet de détecter les problèmes ponctuels entre les audits complets. Après une [refonte de site](/blog/refonte-site-web-seo-redirections-301), un audit immédiat est indispensable.

### Quels outils gratuits utiliser pour l'audit ?

Pour un audit gratuit : **Google Search Console** (indexation, Core Web Vitals, mobile), **PageSpeed Insights** (performance), **Screaming Frog** (crawl limité à 500 URLs), **Lighthouse** dans Chrome DevTools (audit complet en laboratoire), **Rich Results Test** (données structurées). Ces cinq outils couvrent 80 % des besoins pour un site de PME.

### Qu'est-ce qu'il faut corriger en priorité absolue ?

La priorité absolue est tout ce qui empêche l'indexation : un robots.txt bloquant, une page `noindex` sur des contenus importants, un site entier en erreur 404 ou non-HTTPS. En second, les problèmes qui détruisent l'expérience mobile (ergonomie mobile défaillante, texte illisible). Ces problèmes peuvent diviser votre trafic organique par 2 ou 3.

### Puis-je faire l'audit moi-même sans expert SEO ?

Les points 1 à 10 et 21 à 30 sont accessibles à un non-technique avec Google Search Console et Screaming Frog. Les points liés à la performance (11-20) et à la configuration serveur (44-50) nécessitent des notions techniques. Un développeur web peut les implémenter si vous lui fournissez le rapport de diagnostic. Pour un audit complet et les préconisations priorisées, un expert SEO gagne du temps et évite les erreurs.

---

Cette checklist est votre point de départ. Chaque point corrigé améliore la santé technique de votre site et renforce ses chances de se positionner. N'essayez pas de tout corriger en une semaine — priorisez, planifiez, mesurez.

[Prendre rendez-vous gratuitement](/contact)
