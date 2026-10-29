# Brief — entrées du lexique (stackup-agency.fr/lexique)

Lis d'abord `scripts/seo/BRIEF-REDACTION.md` : **toutes ses règles s'appliquent** (vouvoiement, aucun montant en chiffres — jetons `{{prix:…}}` seulement —, aucune durée de livraison, aucun témoignage ni chiffre inventé, prudence sur les lois, pas de dénigrement, pas de « Mathéo Reboul » homonyme, etc.).

Une entrée = **un terme**, une page `/lexique/<slug>` qui répond à « c'est quoi X ? », « définition X », « X à quoi ça sert ? ». C'est une page de définition utile à un artisan, un commerçant ou un indépendant, pas un article de blog : plus courte, plus nette, très concrète.

Fichier : `src/content/lexique/<slug>.md` (slug imposé par `scripts/seo/lexique/termes.json`).

```
---
term: "CMS"                                   # le terme tel qu'on l'écrit (casse correcte)
title: "Qu'est-ce qu'un CMS ?"                # h1 : question naturelle, propre au terme
seoTitle: "CMS : définition simple et exemples pour un site"   # 60 caractères MAX, terme en tête, sans la marque
excerpt: "…"                                   # meta description, 155 caractères MAX, avec un bénéfice
definition: "…"                                # définition courte autonome, 90 à 220 caractères (affichée sur la page /lexique)
date: "2026-10-29"
updated: "2026-10-29"
readTime: 3
category: "web"                                # web | seo | legal | gestion  (donnée dans termes.json)
keywords: ["cms", "définition cms", "c'est quoi un cms"]   # 3 à 6 formulations réelles
related: ["wordpress", "site-sur-mesure", "nom-de-domaine"]  # 3 à 5 slugs d'entrées du lexique (liste termes.json) — uniquement des slugs qui existent dans termes.json
sources: ["https://www.cnil.fr"]               # facultatif ; domaines officiels seulement (voir BRIEF-REDACTION)
---

**Réponse directe en deux phrases : la définition, puis ce qu'elle change pour vous.**

## À quoi ça sert ?
## Comment ça marche (en pratique)
## Exemple concret         ← un cas type FICTIF annoncé comme tel (« Exemple type : … »), propre au terme, jamais un client réel
## Les erreurs fréquentes  ← ou « Ce qu'il faut vérifier »
## Pour aller plus loin    ← 2 à 4 liens internes Markdown relatifs : au moins un vers une page de service ou un outil
                             (/services/…, /outils/…, /tarifs, /creation-site-internet) et, si pertinent, un guide du blog existant.
## Questions fréquentes   ← 3 à 4 questions, chacune en gras sur sa ligne, réponse sur la ligne suivante
```

- **Longueur : 450 à 800 mots** (hors front matter). Pas de remplissage. Des phrases courtes.
- Chaque entrée a son **angle propre** : une définition, une distinction qu'on confond (ex. SEO / SEA, CGV / CGU), un repère pratique. Jamais une phrase recopiée d'une entrée à l'autre.
- Les liens `/blog/<slug>` ne doivent viser que des articles qui existent dans `src/content/blog/` (vérifie avec `ls`). Les liens `/lexique/<slug>` ne doivent viser que des slugs de `termes.json`.
- Les entrées juridiques et fiscales : n'écris que ce dont tu es certain, renvoie vers la source officielle, ajoute « à vérifier sur le site officiel » pour tout seuil ou date.
- Ne cite pas d'outils concurrents de façon négative ; compare des faits.
- Vérification : `cd /home/user/stackup-agency && node scripts/seo/verifier-lexique.mjs <slug> <slug> …` jusqu'à ✓ pour chaque entrée.
- Ne modifie aucun autre fichier. Réponds en une ligne.
