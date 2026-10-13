---
title: "Site accessible (RGAA) : obligations et bonnes pratiques pour une TPE"
excerpt: "Le RGAA est le référentiel français d'accessibilité numérique, et son périmètre d'obligation s'étend progressivement au-delà du seul secteur public. Les 8 points d'accessibilité les plus impactants pour une TPE."
date: "2026-07-26"
updated: "2027-02-01"
readTime: 7
tag: "Performance Web"
category: "technique"
keywords: ["accessibilité web site", "RGAA obligations TPE", "WCAG TPE", "site internet accessible"]
---

**Le RGAA (Référentiel Général d'Amélioration de l'Accessibilité) est le référentiel français qui décline les standards internationaux WCAG pour les sites web — obligatoire pour le secteur public et les grandes entreprises, il s'étend progressivement à un périmètre plus large avec la directive européenne sur l'accessibilité (EAA), et reste une bonne pratique fortement recommandée pour toute TPE, même hors obligation légale directe.** Un site accessible touche plus de clients, améliore le SEO, et anticipe un cadre réglementaire qui continue de s'élargir.

---

## Ce que dit la loi en France, et ce qu'est le RGAA

Le RGAA est le référentiel officiel qui définit, en France, les critères techniques concrets à respecter pour qu'un site soit considéré comme accessible — il s'appuie sur les standards internationaux WCAG (Web Content Accessibility Guidelines) et les adapte au cadre réglementaire français. L'accessibilité web au sens du RGAA est obligatoire pour :
- Les sites du secteur public
- Les grandes entreprises (CA > 250M€) depuis la loi ELAN
- Les ETI sont concernées depuis 2025

Pour les TPE et PME, l'accessibilité au sens strict du RGAA n'est pas encore légalement obligatoire en France. Mais la directive européenne sur l'accessibilité (EAA — European Accessibility Act) entre en vigueur pour les services numériques et son périmètre d'application s'étend progressivement — une TPE qui vend en ligne ou propose certains services numériques peut se retrouver concernée plus tôt qu'elle ne l'anticipe.

**La bonne raison de s'y intéresser maintenant :** Un site accessible améliore l'expérience pour tous vos utilisateurs, pas seulement ceux en situation de handicap. Et Google lit votre site comme un lecteur d'écran — optimiser pour l'accessibilité améliore mécaniquement votre SEO, indépendamment de toute obligation légale.

---

## Les 8 points les plus impactants

### 1. Texte alternatif sur toutes les images (alt)

Chaque image doit avoir un attribut `alt` qui décrit son contenu. C'est utilisé par :
- Les lecteurs d'écran pour les utilisateurs malvoyants
- Google pour comprendre le contenu de l'image
- Le navigateur quand l'image ne charge pas

**Règle :** L'attribut `alt` doit décrire CE QUE MONTRE l'image, pas "image de" ou le nom du fichier.

- Mauvais : `alt="photo.jpg"` ou `alt="image"`
- Bon : `alt="Façade rénovée d'une maison à Tours après ravalement"`
- Pour les images décoratives : `alt=""` (attribut vide, pas d'absence d'attribut)

### 2. Contraste suffisant texte/fond

Un texte gris clair sur fond blanc est illisible pour les personnes avec une déficience visuelle — et difficile à lire pour tout le monde en plein soleil sur mobile.

**Standards WCAG :**
- Texte normal : ratio de contraste ≥ 4,5:1
- Grand texte (> 18px gras ou > 24px normal) : ratio ≥ 3:1

**Outil gratuit :** WebAIM Contrast Checker (webaim.org/resources/contrastchecker) — entrez vos couleurs et voyez le ratio.

### 3. Navigation au clavier

Un utilisateur qui ne peut pas utiliser une souris (handicap moteur) doit pouvoir naviguer sur votre site avec Tab, Entrée et les flèches.

**Test rapide :** Ouvrez votre site, mettez votre souris de côté, et naviguez uniquement au clavier. Si vous ne savez pas où vous êtes sur la page (pas d'indicateur visuel du focus), c'est un problème.

**Fix :** Ne supprimez pas l'outline CSS par défaut (`outline: none`) sans le remplacer. Les styles de focus sont essentiels pour la navigation clavier.

### 4. Structure de titres cohérente (H1, H2, H3)

La hiérarchie des titres (H1 → H2 → H3) doit être logique. Un lecteur d'écran lit les titres pour naviguer dans la page — comme une table des matières.

**Règle :** Un seul H1 par page. Ne sautez pas de niveaux (H2 puis H4 directement). Les titres structurent le contenu, pas le design.

### 5. Formulaires avec labels

Chaque champ de formulaire doit avoir un `<label>` associé. Les placeholders (texte grisé dans le champ) disparaissent quand on commence à taper — ils ne remplacent pas un vrai label.

**Correct :**
```html
<label for="email">Votre email</label>
<input type="email" id="email" name="email">
```

**Incorrect :**
```html
<input type="email" placeholder="Votre email">
```

### 6. Liens explicites (pas de "cliquez ici")

"Cliquez ici" ou "En savoir plus" répété plusieurs fois sur la page est inutilisable pour un lecteur d'écran qui liste tous les liens. Chaque lien doit être explicite hors contexte.

- Mauvais : "Pour voir nos tarifs, **cliquez ici**"
- Bon : "Voir nos **[tarifs de création de site web](/tarifs)**"

### 7. Sous-titres sur les vidéos

Si vous avez des vidéos de présentation, ajoutez des sous-titres. Nécessaire pour les personnes sourdes ou malentendantes, et très pratique pour tous les utilisateurs en contexte silencieux (transports, open space).

YouTube génère des sous-titres automatiques (qualité variable en français) que vous pouvez corriger avant de publier.

### 8. Page 404 et messages d'erreur lisibles

Les messages d'erreur (formulaire invalide, page introuvable) doivent être clairs et placés à côté de l'élément concerné — pas uniquement en rouge au-dessus du formulaire.

---

## Tester l'accessibilité de votre site

**Outils automatiques (gratuits) :**
- **WAVE** (wave.webaim.org) : Extension navigateur qui signale les problèmes d'accessibilité visuellement sur votre page
- **Axe DevTools** : Extension navigateur, plus technique, utilisée par les développeurs
- **Lighthouse** : Dans Chrome DevTools (F12), onglet Accessibility — score de 0 à 100

**Limitation :** Les outils automatiques détectent environ 30 à 40% des problèmes d'accessibilité. Une vraie évaluation nécessite des tests avec de vrais utilisateurs. Mais pour une TPE, passer de 0 à 70 sur le score Lighthouse Accessibility est un objectif atteignable automatiquement.

---

## Accessibilité et SEO : les points communs

Google crawle votre site comme un lecteur d'écran. Les mêmes bonnes pratiques améliorent les deux :
- Textes `alt` sur les images → Google comprend vos images
- Structure de titres claire → Google comprend la hiérarchie de votre contenu
- Liens explicites → Meilleur maillage interne interprété par Google
- Formulaires bien labelisés → Meilleure expérience utilisateur → meilleur taux de conversion

---

## En résumé

- Le RGAA décline les standards WCAG internationaux dans le cadre réglementaire français ; il est déjà obligatoire pour le secteur public et les grandes entreprises, et son périmètre s'élargit progressivement avec la directive européenne EAA.
- 8 points concentrent l'essentiel de l'impact accessibilité pour une TPE : texte alternatif, contraste, navigation clavier, structure des titres, formulaires labellisés, liens explicites, sous-titres vidéo, messages d'erreur clairs.
- Les outils automatiques (WAVE, Axe, Lighthouse) détectent 30 à 40 % des problèmes ; corriger les 8 points prioritaires reste l'approche la plus efficace pour une TPE sans budget dédié à l'accessibilité.
- Les mêmes bonnes pratiques qui améliorent l'accessibilité (structure, alt, liens explicites) améliorent mécaniquement le SEO du site.

## Questions fréquentes

**Mon site WordPress est-il accessible par défaut ?**
Non. L'accessibilité dépend du thème et des plugins utilisés. Certains thèmes premium mettent en avant leur conformité WCAG — vérifiez avant de choisir. Les plugins de constructeur de page (Elementor, Divi) génèrent souvent du code peu accessible.

**Faut-il une déclaration d'accessibilité sur son site ?**
Pour les sites du secteur public : oui, obligatoire. Pour les TPE privées : non obligatoire actuellement, mais certains prestataires publics le demandent. Une mention "Accessibilité : partiellement conforme" est suffisante pour montrer votre engagement.

**L'accessibilité coûte-t-elle beaucoup à implémenter a posteriori ?**
Les corrections les plus impactantes (alt, contraste, labels, titres) sont rapides à implémenter (quelques heures de développement). Une refonte complète pour atteindre WCAG AA coûte plus cher. L'approche pragmatique : corriger les 8 points ci-dessus en priorité.

**Est-ce que Tailwind CSS aide ou nuit à l'accessibilité ?**
Ni l'un ni l'autre — Tailwind gère le style, pas la structure HTML. Un développeur peut faire un HTML accessible ou non avec Tailwind. Certains composants UI basés sur Tailwind (Headless UI, Radix) sont conçus pour être accessibles.

**Mon concurrent n'a aucune accessibilité et est mieux classé que moi. L'accessibilité n'influence pas Google ?**
L'accessibilité est un facteur indirect. L'impact est réel mais rarement décisif face à des différences majeures de contenu ou de backlinks. Traitez l'accessibilité comme une amélioration de l'expérience utilisateur et de la couverture SEO, pas comme le levier principal de classement.

Voir aussi : [vitesse mobile optimisation](/blog/vitesse-mobile-optimisation), [guide SEO on-page](/blog/seo-on-page-guide-complet) et [création de site web à partir de 449€](/tarifs).
