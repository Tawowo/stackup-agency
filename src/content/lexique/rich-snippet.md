---
term: "Rich snippet"
title: "Qu'est-ce qu'un rich snippet dans Google ?"
seoTitle: "Rich snippet : définition, exemples et conditions"
excerpt: "Un rich snippet est un résultat Google enrichi : étoiles, prix, disponibilité. Définition, conditions d'obtention et ce qu'on ne peut pas garantir."
definition: "Un rich snippet, ou résultat enrichi, est un résultat Google qui affiche des informations en plus du titre et de la description : prix, disponibilité, note, fil d'Ariane. Il n'est jamais garanti."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 4
category: "seo"
keywords: ["rich snippet", "rich snippet définition", "résultat enrichi google", "rich results", "extrait enrichi"]
related: ["donnees-structurees", "schema-org", "serp", "position-zero", "avis-google"]
sources: ["https://developers.google.com/search"]
---

**Un rich snippet est un résultat de recherche « augmenté » : sous le titre, on voit un prix, une disponibilité, un fil d'Ariane ou une note. Il est plus parlant qu'un résultat classique, mais Google décide seul de l'afficher.**

## À quoi ça sert ?

Un résultat enrichi donne au chercheur une information utile avant même de cliquer. Pour une boutique, c'est le prix et le stock. Pour une recette, le temps de préparation. Pour une page de service, un fil d'Ariane qui situe la page dans le site.

Ce supplément d'information rend le résultat plus visible et plus rassurant. Il peut améliorer le taux de clic, sans toucher à la position dans la liste.

Google utilise désormais plutôt l'expression « résultats enrichis » (rich results) ; « rich snippet » reste le terme courant en français.

## Comment ça marche (en pratique)

Les résultats enrichis reposent sur les [données structurées](/lexique/donnees-structurees) ajoutées au code de la page. Voici la chaîne complète :

1. Vous balisez la page avec le vocabulaire [schema.org](/lexique/schema-org), généralement en JSON-LD.
2. Google explore la page et lit le balisage.
3. Si le balisage est valide, conforme à ses règles et si la page est jugée de qualité, **elle devient éligible**.
4. Google décide, requête par requête, d'afficher ou non l'enrichissement.

Le point 4 est essentiel : l'éligibilité n'est pas une promesse. Google peut ne rien afficher, retirer l'affichage plus tard, ou le réserver à certains types de sites. Cela est arrivé avec les questions fréquentes, dont l'affichage a été restreint en 2023. Consultez la documentation officielle (developers.google.com/search) pour la liste actuelle.

Pour une entreprise de service local, les enrichissements les plus accessibles sont le fil d'Ariane, les informations de produit pour une boutique et les événements. Les étoiles issues d'avis que vous publiez vous-même sur votre propre entreprise ne sont plus autorisées par Google dans ces cas, à vérifier dans la documentation.

## Exemple concret

Exemple type : une boutique de céramique en ligne balise chaque fiche produit avec nom, image, prix et disponibilité. Après exploration, certaines fiches s'affichent dans Google avec leur prix et la mention « en stock ». Le chercheur sait d'emblée s'il peut acheter, et il clique en connaissance de cause.

Si elle change son prix dans la fiche sans modifier le balisage, les deux informations divergent. Google peut alors cesser d'afficher l'enrichissement. D'où l'intérêt de générer le balisage depuis les mêmes données que la page.

## Les erreurs fréquentes

- **Promettre un affichage** à un client ou à soi-même. Rien ne l'assure.
- **Balisage trompeur**, par exemple de fausses notes : risque de sanction manuelle.
- **Balisage non conforme à la page** : un prix dans le code qui n'est pas celui affiché.
- **Oublier de tester** avec l'outil de test des résultats enrichis de Google.
- **Copier des exemples trouvés ailleurs** sans adapter les valeurs.
- **Négliger le fond.** Sans page utile et fiable, le meilleur balisage ne mène nulle part.

## Pour aller plus loin

- [Données structurées pour les commerces locaux](/blog/donnees-structurees-schema-org-commerces-locaux)
- [Fiches produit : structure, photos et SEO](/blog/fiche-produit-qui-vend-structure-photos-seo)
- [Le service référencement](/services/referencement)

## Questions fréquentes

**Comment obtenir un rich snippet ?**
En balisant correctement une page de qualité avec des données structurées valides. Ensuite, Google décide s'il affiche l'enrichissement ou non.

**Un rich snippet améliore-t-il mon classement ?**
Non, il n'est pas lié à la position. Il peut augmenter les clics en rendant le résultat plus informatif.

**Pourquoi mon balisage est valide mais rien ne s'affiche ?**
Le balisage valide donne l'éligibilité, pas l'affichage. Google tient compte de la requête, de la qualité de la page et de ses propres règles.

**Quelle différence avec la position zéro ?**
Le rich snippet enrichit un résultat normal. La position zéro est un encadré de réponse placé tout en haut, au-dessus des résultats.
