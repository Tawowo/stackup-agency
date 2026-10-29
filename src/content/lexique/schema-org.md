---
term: "schema.org"
title: "C'est quoi schema.org ?"
seoTitle: "schema.org : définition et rôle dans le référencement"
excerpt: "schema.org est le vocabulaire commun des moteurs de recherche pour décrire entreprises, produits et articles. Définition, exemples et bon usage."
definition: "schema.org est un vocabulaire partagé, créé par les grands moteurs de recherche, qui donne des noms standards aux choses d'une page : entreprise, produit, avis, horaires. On l'emploie dans les données structurées."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 3
category: "seo"
keywords: ["schema.org", "schema org définition", "c'est quoi schema.org", "schema markup", "balisage schema"]
related: ["donnees-structurees", "rich-snippet", "serp", "google-business-profile", "pack-local"]
sources: ["https://developers.google.com/search"]
---

**schema.org est un dictionnaire. Il donne à chaque chose décrite sur une page (une entreprise, un produit, un événement) un nom normalisé que tous les moteurs comprennent. Pour vous, c'est la langue dans laquelle on écrit les données structurées.**

## À quoi ça sert ?

Pour qu'un moteur de recherche sache qu'une ligne de texte est un numéro de téléphone et non un code de commande, il faut un langage partagé. schema.org le fournit. Le projet a été lancé en 2011 par Google, Microsoft, Yahoo et Yandex, pour éviter que chaque moteur impose son propre vocabulaire.

On confond souvent les deux notions. Les [données structurées](/lexique/donnees-structurees) sont la méthode : ajouter du balisage au code d'une page. schema.org est le dictionnaire de mots qu'on utilise pour le rédiger. Une analogie : le formulaire (données structurées) et la liste des champs autorisés (schema.org).

## Comment ça marche (en pratique)

Le vocabulaire est organisé en **types**, qui ont des **propriétés**. Un type est une catégorie de chose ; une propriété est une information qui la décrit.

- Le type **LocalBusiness** (entreprise locale) a des propriétés comme le nom, l'adresse, le téléphone, les horaires d'ouverture ou la zone desservie.
- Il existe des types plus précis, héritant du premier : plombier, électricien, boulangerie, restaurant, salon de coiffure. Choisissez le plus proche de votre métier, et à défaut le type général.
- Le type **Product** décrit un produit (nom, image, prix, disponibilité).
- Le type **Article** décrit un article de blog (titre, date, auteur).
- Le type **Event** décrit un événement.

Le vocabulaire est public sur le site schema.org, qui liste chaque type et ses propriétés. Toutes les propriétés n'ont pas d'utilité pour Google : sa documentation précise quelles propriétés il exploite pour chaque type d'affichage enrichi (developers.google.com/search).

En pratique, on écrit ces informations dans un bloc JSON-LD, placé dans le code de la page. Un test avec l'outil de validation de schema.org ou celui des résultats enrichis de Google permet de vérifier la syntaxe.

## Exemple concret

Exemple type : un électricien indépendant veut que Google comprenne précisément son activité. Son site décrit son entreprise avec le type « électricien », son nom, son téléphone, sa commune de base et les communes qu'il dessert, avec ses horaires d'intervention.

Ces informations existent déjà dans le texte du site. Le balisage les répète dans une forme que les machines lisent sans ambiguïté. Il doit rester identique à ce qui est écrit sur la page et sur sa fiche Google.

## Les erreurs fréquentes

- **Choisir un type qui n'existe pas** ou qui ne correspond pas à l'activité.
- **Remplir des propriétés avec des valeurs inventées**, comme des notes que personne n'a données.
- **Mélanger les noms** : « Schema », « schema.org » et « données structurées » ne désignent pas la même chose.
- **Ne pas vérifier la cohérence** avec le texte visible, l'adresse officielle et la fiche Google.
- **Croire que schema.org est un outil de Google.** C'est un projet commun, utilisé aussi par d'autres moteurs.

## Pour aller plus loin

- [Données structurées et schema.org pour commerces locaux](/blog/donnees-structurees-schema-org-commerces-locaux)
- [Apparaître sur Google Maps et dans le pack local](/blog/apparaitre-google-maps-pack-local)
- [Le service référencement local](/services/referencement-local)

## Questions fréquentes

**schema.org est-il obligatoire pour être bien référencé ?**
Non. Beaucoup de sites bien placés n'en ont pas. Il aide à lever les ambiguïtés et à viser certains affichages enrichis.

**Quelle différence entre schema.org et JSON-LD ?**
schema.org est le vocabulaire (les mots), JSON-LD est le format d'écriture (la grammaire) que Google recommande.

**Faut-il choisir un type très précis comme « plombier » ?**
Oui, si un type correspond vraiment à votre activité. Sinon, restez sur le type général d'entreprise locale.

**Où voir la liste des types disponibles ?**
Sur le site schema.org, qui référence tous les types et propriétés, avec des exemples.
