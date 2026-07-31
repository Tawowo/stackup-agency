---
title: "Données structurées Schema.org pour commerces locaux"
excerpt: "Implémentez les données structurées JSON-LD pour votre commerce local : LocalBusiness, FAQ, Product, Review. Guide complet avec exemples de code."
date: "2026-04-20"
readTime: 10
tag: "SEO Technique"
category: "seo"
keywords: ["données structurées", "schema.org", "JSON-LD", "SEO local", "rich snippets", "commerce local"]
---


Lorsqu'une pizzeria à Tours apparaît dans Google avec ses horaires, son numéro de téléphone, ses étoiles d'avis et un lien direct vers le menu — sans que l'internaute clique — c'est grâce aux données structurées. Ces balises invisibles dans le code HTML permettent à Google de comprendre précisément ce qu'est votre page et d'afficher des **résultats enrichis** (rich snippets) qui augmentent drastiquement votre taux de clics.

Selon les données de Search Engine Land, les résultats enrichis obtiennent en moyenne 20 à 30 % de clics supplémentaires par rapport aux résultats classiques. Pour un commerce local, c'est souvent la différence entre une page 1 efficace et une page 1 qui ne convertit pas.

## Qu'est-ce que Schema.org et JSON-LD ?

**Schema.org** est un vocabulaire standardisé, créé conjointement par Google, Bing, Yahoo et Yandex, qui définit des types d'entités (LocalBusiness, Product, Person, Event...) et leurs propriétés. C'est la langue que comprennent les moteurs de recherche.

**JSON-LD** (JavaScript Object Notation for Linked Data) est le format recommandé par Google pour implémenter ce vocabulaire. Il s'insère dans une balise `<script type="application/ld+json">` dans le `<head>` de votre page, sans interférer avec votre HTML visible.

L'avantage du JSON-LD : il est facile à maintenir, peut être injecté dynamiquement, et Google le lit de manière fiable même quand le JavaScript est activé.

> Note : si votre site est développé avec un framework comme Astro ou Next.js, les données structurées peuvent être gérées par le composant de page — consultez votre développeur pour confirmer l'implémentation.

## Type 1 : LocalBusiness — La base pour tout commerce

Le schema `LocalBusiness` (ou ses sous-types comme `Restaurant`, `MedicalBusiness`, `AutoRepair`...) communique à Google l'identité complète de votre établissement.

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Menuiserie Dupont",
  "description": "Fabrication et pose de menuiseries sur mesure à Tours depuis 1987.",
  "url": "https://www.menuiserie-dupont-tours.fr",
  "telephone": "+33247000000",
  "email": "contact@menuiserie-dupont-tours.fr",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "14 rue des Artisans",
    "addressLocality": "Tours",
    "postalCode": "37000",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 47.3941,
    "longitude": 0.6848
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "12:00"
    }
  ],
  "priceRange": "€€",
  "image": "https://www.menuiserie-dupont-tours.fr/images/facade.jpg",
  "sameAs": [
    "https://www.facebook.com/menuiseriedupont",
    "https://www.google.com/maps/place/?q=place_id:ChIJXXX"
  ]
}
```

**Conseil** : les propriétés `geo` (coordonnées GPS) et `sameAs` (liens vers vos profils sociaux et Google Maps) renforcent la confiance de Google et améliorent votre positionnement en recherche locale. C'est complémentaire à l'optimisation de votre fiche Google Business Profile pour la [recherche vocale locale](/blog/recherche-vocale-seo-local-pres-de-moi).

## Type 2 : FAQPage — Pour apparaître dans les résultats accordéon

Le schema `FAQPage` permet à Google d'afficher vos questions-réponses directement dans les SERP sous forme de liste dépliable. Ce format occupe jusqu'à 3 fois plus d'espace qu'un résultat classique.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quels délais pour une pose de fenêtres sur mesure ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Comptez généralement 4 à 6 semaines entre la commande et la pose, selon la complexité des menuiseries et notre planning. Nous vous confirmons un délai précis lors du devis gratuit."
      }
    },
    {
      "@type": "Question",
      "name": "Intervenez-vous en Indre-et-Loire ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, nous intervenons dans tout l'Indre-et-Loire : Tours, Amboise, Blois, Chinon, Loches et leurs agglomérations. Le déplacement pour le devis est gratuit dans un rayon de 40 km."
      }
    }
  ]
}
```

Condition pour que Google l'affiche : les questions doivent réellement apparaître sur votre page (en HTML lisible), pas seulement dans le JSON-LD.

## Type 3 : Product — Pour les e-commerçants et artisans

Pour un site qui vend des produits ou des prestations tarifées, le schema `Product` enrichit les résultats avec le prix, la disponibilité et la note moyenne.

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Fenêtre PVC double vitrage 120x100",
  "description": "Fenêtre PVC blanc sur mesure, double vitrage 4/16/4, certification Acotherm Th9.",
  "brand": {
    "@type": "Brand",
    "name": "Menuiserie Dupont"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://www.menuiserie-dupont-tours.fr/fenetres/pvc-120x100",
    "priceCurrency": "EUR",
    "price": "450",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2026-12-31"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  }
}
```

Pour un site e-commerce complet, les données structurées Product sont fondamentales et doivent être générées dynamiquement depuis votre catalogue. Notre service de [création de site e-commerce](/services/site-ecommerce) les intègre nativement.

## Type 4 : Review et AggregateRating — Les étoiles qui font la différence

L'affichage des étoiles dans les résultats Google (les fameuses "rich snippets avec notes") repose sur les schemas `Review` et `AggregateRating`. Attention : depuis 2023, Google n'affiche plus les étoiles pour les pages d'accueil ou les pages de catégorie génériques — uniquement pour les pages produit, recette, cours, et quelques autres types spécifiques.

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Menuiserie Dupont",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "89",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Marie L."
      },
      "datePublished": "2026-03-15",
      "reviewBody": "Excellent travail, pose soignée et équipe très professionnelle. Je recommande vivement.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      }
    }
  ]
}
```

Ne fabriquez jamais de faux avis : Google et les utilisateurs détectent les patterns anormaux, et la pénalité manuelle est sévère.

## Comment tester vos données structurées

### 1. Rich Results Test (outil officiel Google)

Rendez-vous sur [search.google.com/test/rich-results](https://search.google.com/test/rich-results), entrez votre URL ou collez votre code JSON-LD. L'outil indique :
- Les schemas détectés
- Les erreurs bloquantes (champs obligatoires manquants)
- Les avertissements (champs recommandés manquants)
- Une prévisualisation du résultat enrichi

### 2. Schema Markup Validator

Sur [validator.schema.org](https://validator.schema.org), validez la conformité de vos schemas avec la spécification Schema.org, indépendamment des règles spécifiques à Google.

### 3. Rapport "Résultats enrichis" dans Search Console

Dans Google Search Console → Améliorations, vous voyez les résultats enrichis détectés sur votre site, avec le nombre de pages valides, les erreurs et les avertissements. C'est votre tableau de bord de monitoring à long terme. Consultez notre [guide Google Search Console avancé](/blog/google-search-console-guide-avance-seo) pour exploiter pleinement ces rapports.

## Stratégie d'implémentation par priorité

Pour un commerce local qui commence, voici l'ordre d'implémentation recommandé :

1. **LocalBusiness** sur la page d'accueil et la page contact → signal d'identité pour Google
2. **FAQPage** sur vos pages de services → augmente la surface dans les SERP
3. **BreadcrumbList** sur toutes les pages internes → améliore la navigation dans les résultats
4. **Product / Service** sur vos pages offres → active les rich snippets avec prix
5. **Review / AggregateRating** → seulement si vous avez des avis authentiques à afficher

Cette approche progressive s'inscrit dans une stratégie SEO globale. Pour les bases du maillage interne qui accompagnent ces optimisations, lisez notre article sur le [maillage interne et le cocon sémantique](/blog/maillage-interne-cocon-semantique-seo).

## FAQ

### Les données structurées Schema.org sont-elles un facteur de classement ?

Pas directement. Google affirme que Schema.org n'est pas un facteur de classement en lui-même. Cependant, les résultats enrichis augmentent votre CTR (taux de clic), et un CTR supérieur peut indirectement améliorer votre positionnement. De plus, Schema.org aide Google à mieux comprendre votre contenu, ce qui peut avoir un effet indirect sur la pertinence perçue.

### Quel est le schema le plus facile à implémenter pour commencer ?

Le schema `FAQPage` est le plus accessible et souvent le plus rentable en termes de visibilité. Vous avez probablement déjà une section FAQ sur vos pages de services — il suffit d'ajouter le JSON-LD correspondant. En moins d'une heure, vous pouvez doubler l'espace occupé par vos résultats Google sur certaines requêtes.

### Comment valider que mon JSON-LD est correctement lu par Google ?

Utilisez le **Rich Results Test** de Google avec l'URL de votre page (pas le code HTML brut) pour tester exactement ce que Google voit. Ensuite, vérifiez le rapport "Résultats enrichis" dans Google Search Console 48 à 72 heures après déploiement. Si le schema est valide, vous verrez votre page listée dans le rapport correspondant.

### Les données structurées fonctionnent-elles pour tous les types de commerce ?

Schema.org couvre plus de 800 types d'entités, donc oui pour la grande majorité des commerces. Les types `LocalBusiness` et `FAQPage` sont universels. Certains types spécialisés (Restaurant, LegalService, MedicalBusiness) offrent des propriétés supplémentaires pertinentes. Seules les pages d'accueil génériques ne peuvent pas afficher d'étoiles de notation — c'est une contrainte imposée par Google depuis 2023.

---

Les données structurées représentent l'un des leviers SEO les plus sous-exploités par les PME françaises. Bien implémentées, elles peuvent transformer votre visibilité dans Google sans modifier une seule ligne de votre contenu. Contactez-nous pour un audit de vos données structurées actuelles.

[Prendre rendez-vous gratuitement](/contact)
