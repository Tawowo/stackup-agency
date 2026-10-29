---
term: "Données structurées"
title: "Que sont les données structurées en SEO ?"
seoTitle: "Données structurées : définition et utilité pour un site"
excerpt: "Les données structurées expliquent le contenu de vos pages aux moteurs de recherche. Définition simple, exemples pour un commerce local et limites."
definition: "Les données structurées sont des balises ajoutées au code d'une page pour décrire son contenu de façon lisible par les machines : entreprise, horaires, produit, avis. Elles aident Google à comprendre."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 4
category: "seo"
keywords: ["données structurées", "données structurées seo", "structured data", "json-ld", "données structurées définition"]
related: ["schema-org", "rich-snippet", "serp", "google-business-profile", "e-e-a-t"]
sources: ["https://developers.google.com/search"]
---

**Les données structurées sont une étiquette ajoutée dans le code de votre page, invisible pour le visiteur, qui dit aux moteurs de recherche : « ceci est une entreprise, voici son adresse, ses horaires, son téléphone ». Elles clarifient, elles ne garantissent rien.**

## À quoi ça sert ?

Un moteur de recherche lit du texte sans le comprendre comme vous. Il voit « 12 rue des Lilas » et « 9 h – 18 h », mais ne sait pas toujours que c'est l'adresse et les horaires de l'établissement. Les données structurées l'écrivent noir sur blanc, dans un format normalisé.

Deux bénéfices possibles :

- **Une meilleure compréhension** de ce que la page décrit (une entreprise, un produit, un article, un événement) ;
- **Une éligibilité à des affichages enrichis** dans les résultats, comme le prix ou la disponibilité d'un produit.

Google précise dans sa documentation que le balisage ne donne ni un meilleur classement automatique, ni la certitude d'un affichage enrichi.

## Comment ça marche (en pratique)

Le format que Google recommande est le **JSON-LD** : un petit bloc de code placé dans la page, séparé du texte visible. Il utilise le vocabulaire de [schema.org](/lexique/schema-org). Deux autres formats existent (microdonnées et RDFa), plus rarement utilisés aujourd'hui.

Pour un commerce ou un artisan, les types utiles sont :

- **l'entreprise locale** (nom, adresse, téléphone, horaires, zone desservie) ;
- **le produit** (nom, image, prix, disponibilité) pour une boutique ;
- **l'article**, pour un blog ;
- **le fil d'Ariane**, qui montre la place d'une page dans le site ;
- **l'événement**, si vous organisez un atelier ou une portes ouvertes.

Les règles de base :

1. **Balisez ce qui est visible** sur la page. Décrire dans le code des informations absentes du texte est contraire aux consignes de Google.
2. **Gardez les données cohérentes** avec votre fiche Google Business Profile et le reste du site.
3. **Testez-les** avec l'outil de test des résultats enrichis de Google ou le validateur de schema.org.
4. **Surveillez la Search Console**, qui signale les erreurs de balisage.

Attention aux évolutions : Google réduit ou retire parfois des affichages enrichis (c'est arrivé pour les questions fréquentes, désormais limitées à quelques sites). À vérifier sur developers.google.com/search.

## Exemple concret

Exemple type : une boulangerie indique sur son site son adresse, ses horaires et son téléphone, mais seulement dans une image. Google doit deviner.

En ajoutant un bloc JSON-LD « boulangerie » avec les mêmes informations en texte, elle lève le doute. Elle y ajoute ses jours de fermeture. Rien ne change pour le visiteur, mais les machines disposent désormais d'une version fiable et lisible.

## Les erreurs fréquentes

- **Inventer des avis ou des notes** dans le balisage : c'est contraire aux règles et risque une action manuelle de Google.
- **Balisage et contenu qui ne correspondent pas** (horaires différents entre le code et la page).
- **Copier un exemple trouvé en ligne** sans l'adapter, avec le nom d'une autre entreprise.
- **Empiler des types** qui ne décrivent pas la page.
- **Oublier de mettre à jour** les horaires saisonniers.
- **Attendre un effet immédiat.** Les affichages enrichis ne sont jamais garantis.

## Pour aller plus loin

- [Données structurées et schema.org pour les commerces locaux](/blog/donnees-structurees-schema-org-commerces-locaux)
- [SEO on-page : le guide complet](/blog/seo-on-page-guide-complet)
- [Le service référencement local](/services/referencement-local)

## Questions fréquentes

**Les données structurées améliorent-elles mon classement ?**
Pas directement. Elles aident Google à comprendre vos pages et peuvent rendre éligible à des affichages enrichis, sans garantie.

**Dois-je savoir coder pour en ajouter ?**
Pas forcément : des extensions et des générateurs existent. Il faut cependant relire le résultat et le tester avant de le publier.

**Quelle différence avec schema.org ?**
Les données structurées sont la méthode, schema.org est le vocabulaire commun qu'on utilise pour les écrire.

**Faut-il en mettre sur toutes les pages ?**
Seulement là où elles décrivent quelque chose de réel : l'entreprise sur l'accueil et le contact, les produits sur les fiches, les articles sur le blog.
