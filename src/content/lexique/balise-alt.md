---
term: "Balise alt"
title: "À quoi sert la balise alt d'une image ?"
seoTitle: "Balise alt : définition, rôle et bonnes pratiques"
excerpt: "La balise alt décrit une image en texte pour les personnes malvoyantes et pour Google. Définition, règles d'écriture et exemples pour un site local."
definition: "La balise alt, ou texte alternatif, est la description écrite d'une image dans le code d'une page. Elle est lue par les lecteurs d'écran, affichée si l'image échoue et exploitée par Google."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 3
category: "seo"
keywords: ["balise alt", "texte alternatif", "attribut alt image", "alt image seo", "comment remplir la balise alt"]
related: ["rgaa", "responsive-design", "mot-cle", "serp", "ux"]
sources: ["https://developers.google.com/search"]
---

**La balise alt est une courte description écrite d'une image. Elle sert d'abord aux personnes qui ne la voient pas, puis aux moteurs de recherche. Un bon texte alternatif décrit ce que montre l'image, utile à la page.**

## À quoi ça sert ?

Elle a trois usages :

- **L'accessibilité.** Les personnes aveugles ou malvoyantes utilisent un lecteur d'écran, qui lit à voix haute le texte alternatif de chaque image. Sans lui, l'image est muette ou, pire, annoncée par son nom de fichier.
- **La robustesse.** Si l'image ne se charge pas (connexion faible, bloqueur), le texte s'affiche à sa place.
- **Le référencement.** Google s'appuie sur le texte alternatif, avec le contexte de la page, pour comprendre une image et la proposer dans la recherche d'images.

Techniquement, c'est un attribut de la balise image : `<img src="chantier.jpg" alt="Terrasse en bois terminée avec escalier">`.

## Comment ça marche (en pratique)

Pour bien rédiger un texte alternatif :

1. **Décrivez ce que l'image montre**, de façon factuelle, comme vous l'expliqueriez à quelqu'un au téléphone.
2. **Restez court** : une phrase brève suffit, sans « image de » ni « photo de ».
3. **Intégrez le contexte utile**, pas des mots-clés à la chaîne. Le mot-clé n'a sa place que s'il décrit réellement l'image.
4. **Adaptez-vous à l'objectif de l'image.** Si elle est un bouton ou un lien, le texte décrit l'action (« Appeler le cabinet »), pas l'image.
5. **Laissez l'attribut vide pour une image purement décorative** (`alt=""`). Le lecteur d'écran l'ignorera, ce qui évite du bruit.

Les images qui contiennent du texte demandent une attention particulière : le texte alternatif doit reprendre ce texte. Mieux vaut éviter de mettre l'information importante uniquement dans une image.

Le texte alternatif est un des points de base de l'accessibilité numérique. Les obligations réglementaires dépendent du statut de l'organisation : à vérifier sur les sites officiels, par exemple pour le référentiel [RGAA](/lexique/rgaa).

## Exemple concret

Exemple type : un électricien publie la photo d'un tableau électrique rénové.

- Alt faible : `alt="IMG_4521"` ou `alt="electricien tours pas cher electricien tours devis"`.
- Alt utile : `alt="Tableau électrique rénové dans une maison ancienne, avec disjoncteurs étiquetés"`.

La deuxième version aide une personne malvoyante, informe Google sur la photo et colle à ce que montre la page. La première ne sert qu'à bourrer de mots-clés, ce que Google déconseille.

## Les erreurs fréquentes

- **Laisser le nom de fichier** de l'appareil photo (« IMG_4521 »).
- **Bourrer l'attribut de mots-clés.** Google le considère comme du bourrage et ça nuit aux lecteurs d'écran.
- **Remplir identiquement** toutes les images d'une page.
- **Oublier l'attribut**, ce qui est une erreur d'accessibilité.
- **Écrire des textes trop longs.** Quelques mots à une courte phrase suffisent. Une explication plus détaillée peut se placer dans le texte de la page.
- **Compter sur l'alt seul** : le nom du fichier, la légende et le texte autour comptent aussi.

## Pour aller plus loin

- [Accessibilité d'un site web : le guide](/blog/accessibilite-site-web-guide)
- [Optimiser ses images : WebP, AVIF et SEO](/blog/optimiser-images-web-webp-avif-seo)
- [Un site accessible aux personnes en situation de handicap](/blog/site-web-accessible-handicap)
- [Audit gratuit de votre site](/outils/audit-site)

## Questions fréquentes

**La balise alt est-elle un facteur de classement ?**
Elle aide Google à comprendre l'image, surtout pour la recherche d'images, mais ne suffit pas à classer une page.

**Faut-il mettre un alt sur chaque image ?**
Oui, l'attribut doit être présent. Vide pour une image décorative, rempli pour une image qui apporte une information.

**Alt, title, légende : quelle différence ?**
L'alt remplace l'image pour qui ne la voit pas. La légende s'affiche sous l'image pour tous. Le title, rarement lu, apparaît au survol.

**Combien de caractères pour un alt ?**
Il n'y a pas de limite magique. Quelques mots à une courte phrase suffisent dans la plupart des cas.
