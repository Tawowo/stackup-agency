---
title: "SEO on-page : guide complet pour optimiser chaque page de votre site"
excerpt: "Title, meta, H1, maillage interne, vitesse : les optimisations on-page qui ont le plus d'impact sur votre positionnement Google en 2026."
date: "2026-08-19"
updated: "2026-07-28"
readTime: 8
tag: "SEO"
category: "seo"
keywords: ["SEO on-page guide", "optimisation on-page", "référencement interne site web", "SEO technique on-page 2026"]
---

**Le SEO on-page désigne l'ensemble des optimisations que vous pouvez faire directement sur vos pages web.** Contrairement au SEO off-page (liens entrants), il est entièrement sous votre contrôle. C'est souvent là que les TPE ont le plus à gagner.

---

## Les éléments SEO on-page par ordre d'importance

### 1. La balise title (titre de page)

La balise `<title>` est l'élément le plus important pour le SEO on-page. C'est ce qui apparaît en bleu dans les résultats Google et dans l'onglet du navigateur.

**Format recommandé :**
`[Mot-clé principal] — [Complément] | [Nom du site]`

Exemple : "Plombier urgence Tours — Intervention 24h/24 | Dupont Plomberie"

**Règles :**
- 50 à 60 caractères maximum (au-delà, Google tronque)
- Mot-clé principal en début de titre
- Un title unique par page (jamais le même sur deux pages)
- Pas de majuscules inutiles

### 2. La balise meta description

La meta description n'est pas un facteur de classement direct, mais elle influence le taux de clic (CTR) dans les résultats Google — ce qui impacte indirectement votre SEO.

**Format recommandé :**
- 150 à 160 caractères
- Include le mot-clé principal (Google le met en gras s'il correspond à la requête)
- Un appel à l'action clair
- Promesse de valeur unique

### 3. Le H1 (titre principal de la page)

Un seul H1 par page, qui doit :
- Contenir le mot-clé principal de la page
- Être différent (mais proche) du title
- Être placé en haut du contenu, avant le premier paragraphe

### 4. Les H2 et H3 (sous-titres)

Les sous-titres structurent le contenu pour les lecteurs ET pour Google :
- H2 pour les sections principales
- H3 pour les sous-sections
- Intégrez des mots-clés secondaires naturellement dans les H2

### 5. Le contenu textuel

**Longueur :** il n'y a pas de longueur idéale universelle, mais les pages bien classées sur des requêtes compétitives contiennent généralement 800 à 2 000 mots.

**Densité de mots-clés :** ne forcez pas l'insertion de mots-clés. Google lit les synonymes et le contexte. 1 à 2% de densité pour le mot-clé principal est une indication, pas une règle stricte.

**Fraîcheur :** mettez à jour votre contenu régulièrement. Ajoutez la date de dernière mise à jour en haut de vos articles.

### 6. Les images

- **Attribut alt** : décrivez chaque image avec du texte. Inclure le mot-clé naturellement dans l'alt des images principales.
- **Nom de fichier** : "photo-salon-renovation-tours.webp" plutôt que "IMG_2847.jpg"
- **Format** : WebP divise le poids par 2-3 vs JPEG sans perte de qualité visible
- **Lazy loading** : les images hors écran se chargent quand l'utilisateur scrolle (`loading="lazy"`)
- **Dimensions déclarées** : évite les sauts de mise en page (Cumulative Layout Shift)

### 7. Le maillage interne

Les liens entre vos pages :
- Signalent à Google quelles pages sont importantes
- Aident les visiteurs à naviguer
- Répartissent la "valeur" de liens entre vos pages

**Pratique :** liez chaque article de blog vers 2-3 pages de service pertinentes. Liez vos pages de service entre elles. Liez vers vos articles de blog depuis les pages de service.

### 8. L'URL

- Courte et descriptive : `/plombier-urgence-tours` plutôt que `/page?id=47`
- Mot-clé principal dans l'URL
- Tirets pour séparer les mots (pas de underscore)
- Tout en minuscules

---

## Les données structurées (Schema.org)

Les données structurées (JSON-LD) permettent à Google de comprendre le type de contenu de votre page et peuvent générer des rich snippets (étoiles, prix, FAQ...).

Types utiles pour une TPE :
- `LocalBusiness` : sur toutes vos pages
- `FAQPage` : sur les pages avec FAQ
- `Service` : sur vos pages de services
- `BreadcrumbList` : pour le fil d'Ariane
- `Article` : sur vos articles de blog

---

## La vitesse de chargement (Core Web Vitals)

Les Core Web Vitals sont des facteurs de classement depuis 2021 :

**LCP (Largest Contentful Paint)** : temps de chargement de l'élément principal visible. Cible : < 2,5 secondes.

**FID / INP (Interaction to Next Paint)** : réactivité aux interactions. Cible : < 200ms.

**CLS (Cumulative Layout Shift)** : stabilité visuelle pendant le chargement. Cible : < 0,1.

Pour mesurer : Google PageSpeed Insights (gratuit), Lighthouse dans Chrome DevTools.

---

## Audit SEO on-page en 10 points

Pour chaque page importante de votre site :

- [ ] Title unique, < 60 caractères, mot-clé en début
- [ ] Meta description unique, < 160 caractères, CTA inclus
- [ ] H1 unique avec mot-clé principal
- [ ] H2/H3 structurant le contenu avec mots-clés secondaires
- [ ] Images avec attributs alt descriptifs
- [ ] URL courte et descriptive
- [ ] Liens internes vers pages connexes (min 2-3)
- [ ] Données structurées adaptées au type de contenu
- [ ] Score Lighthouse mobile > 80
- [ ] Contenu mis à jour récemment (date visible)

---

## FAQ

**Faut-il optimiser toutes les pages ou seulement certaines ?**
Commencez par les pages les plus importantes : votre page d'accueil, vos pages de services principales, et vos articles de blog sur les mots-clés les plus recherchés. Un audit SEO aide à prioriser.

**Le contenu dupliqué est-il vraiment pénalisé par Google ?**
Google ne "pénalise" pas le contenu dupliqué dans la plupart des cas — il choisit simplement quelle version indexer (cannibalisation). Si vous avez plusieurs pages très similaires, utilisez la balise canonical pour indiquer la version à indexer.

**Combien de fois faut-il répéter un mot-clé dans un article ?**
Il n'y a pas de règle précise. Écrivez naturellement pour vos lecteurs. Si votre article répond vraiment à la requête, le mot-clé apparaîtra naturellement la bonne fréquence. Évitez la "bourrage de mots-clés" (keyword stuffing) — Google le détecte et le pénalise.

**Les balises meta keywords sont-elles encore utiles ?**
Non. Google a confirmé en 2009 qu'il n'utilise pas les meta keywords. Ils sont ignorés par les moteurs de recherche modernes.

**Comment savoir sur quels mots-clés je suis déjà positionné ?**
Google Search Console (gratuit) liste toutes les requêtes qui génèrent des impressions et des clics vers votre site. C'est le point de départ de tout audit SEO on-page.
