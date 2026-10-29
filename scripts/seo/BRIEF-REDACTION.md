# Règles de rédaction communes (Stackup Agency)

Tu écris pour stackup-agency.fr : agence web d'UNE personne, **Mathéo Reboul**, entrepreneur individuel basé à **Savigné-sur-Lathan (37340), en Touraine, au nord-ouest de Tours**. Elle fabrique des sites et des outils sur mesure pour artisans, commerçants, TPE et professions libérales. Ton : français, **vouvoiement**, direct, concret, sans slogan creux ni jargon non expliqué ; des phrases courtes, des exemples de métiers. Téléphone 07 64 02 08 98, contact@stackup-agency.fr.

## Interdits absolus (règles du projet)
- **Aucun montant en chiffres** : uniquement les jetons `{{prix:une-page}}`, `{{prix:multi-pages}}`, `{{prix:boutique}}`, `{{prix:outil}}`, `{{abo:min}}` (abonnement mensuel minimum), `{{carte:demo}}` (démo de la page d'accueil), `{{carte:visio}}` (visio), `{{tarif:heure}}`. Toujours « à partir de » devant un prix de Stackup. Pas de fourchette de prix inventée pour le marché ; on peut décrire ce qui fait varier un prix sans chiffrer.
- **Aucune durée de livraison fixe** de Stackup (« livré en 10 jours »…). On dit : « le calendrier se fixe ensemble avant de commencer ». Les délais de tiers (Google, administration) sont décrits qualitativement.
- **Aucun comparatif chiffré « × moins cher »**, aucune mention « hébergement en France/Europe » comme argument de Stackup.
- **Aucun témoignage, chiffre client, logo client, garantie, label, récompense ou statistique inventés.** Aucune étude citée si tu n'es pas certain de sa source exacte et de sa date ; préfère le qualitatif. Les exemples sont des **cas types fictifs** annoncés comme tels (« Exemple type : … »).
- Les réalisations actuelles du site sont des **démos** ; le tennis club de Savigné-Gizeux est la seule réalisation en ligne. Rien d'autre à citer.
- **Aucune offre « site association »** (ne parle pas d'associations comme cible commerciale).
- **Démo (15 €) et visio (30 €)** : prestations à part, facturées, jamais « déduites » du devis.
- Jamais d'âge du fondateur, jamais « depuis 2018 », jamais le prénom « Valéry ». Aucune information sur un autre « Mathéo Reboul ».
- Pas d'API d'IA vendue ni de service « IA » inventé : l'IA et l'automatisation se décrivent comme des outils intégrés à ce que Stackup fabrique, sans promesse chiffrée.
- Pas de dénigrement de concurrents ni de marques : comparer avec des faits vérifiables et laisser la limite de chaque solution (y compris celle d'un site sur mesure : coût de départ, dépendance à un prestataire).
- Lois, taux, dates, plafonds : n'écris que ce dont tu es **certain** ; sinon reste général et renvoie à la source officielle (service-public.fr, impots.gouv.fr, cnil.fr, economie.gouv.fr, legifrance.gouv.fr, support.google.com/business, developers.google.com/search, web.dev). Pour la facture électronique : calendrier de la réforme tel que fixé par la loi de finances pour 2024 puis reporté à 2026-2027 (réception pour toutes les entreprises ; émission progressive selon la taille) — reste prudent, dis « à vérifier sur les sites officiels ».
- Une phrase ne doit jamais être recopiée d'une page à l'autre : **chaque page a son texte propre**.

## Style
- Réponse directe d'abord (deux phrases), puis le détail. Intertitres (h2/h3) qui reprennent des formulations réelles de requêtes (« Combien coûte… », « Que faire si… »).
- Listes quand l'information s'y prête (étapes, critères, erreurs), mais le gros du texte reste en paragraphes.
- Exemples concrets par métier (plombier, coiffeur, boulangère, restaurateur, kiné, caviste, paysagiste…), jamais de clientèle ou de résultat chiffré inventés.
- Pas de « dans cet article nous allons voir ». Pas de conclusion qui répète. Pas de remplissage.
- Les liens internes se mettent en Markdown relatif (`[texte](/tarifs)`) dans les articles. Pages de référence existantes : `/tarifs` (estimateur de prix), `/contact`, `/services`, `/services/referencement`, `/services/site-ecommerce`, `/services/site-vitrine`, `/services/site-multi-pages`, `/solutions`, `/outils/audit-site`, `/ressources/cahier-des-charges`, `/realisations`, `/a-propos`, `/comparatif/wix-wordpress-sur-mesure`, `/zones-intervention`, `/agence-web/tours`, `/creation-site-internet` (et `/creation-site-internet/<métier>`).
  Pages à créer par cette mission (tu peux y lier) : `/services/creation-de-site-internet`, `/services/refonte-de-site-internet`, `/services/referencement-local`, `/services/logiciel-de-gestion`, `/services/ia-et-automatisation`, `/services/facture-electronique`, `/services/maintenance`, `/outils/generateur-mentions-legales`, `/outils/modele-devis`, `/outils/calculateur-clients-perdus`, `/outils/checklist-facture-electronique`, `/comparatif/shopify-ou-boutique-sur-mesure`, `/comparatif/obat-tolteck-logiciel-sur-mesure`, `/stackup-agency-en-bref`.

## Format des articles (fichiers Markdown dans `src/content/blog/<slug>.md`)
```
---
title: "Titre h1 (peut dépasser 60 caractères)"
seoTitle: "Titre de page, 60 caractères MAXIMUM, requête principale en tête, sans la marque"
excerpt: "Meta description, 155 caractères MAXIMUM, avec un bénéfice et une incitation ; elle sert aussi de chapô"
date: "2026-10-30"
updated: "2026-10-30"
readTime: 8
tag: "Référencement"
category: "seo"          # un de : creation, seo, seo-local, ecommerce, applications-metier, ia, artisans, juridique, strategie, marketing, technique
type: "question"          # question | guide | reglementation
keywords: ["requête principale", "variante 1", "variante 2"]
sources: ["https://www.service-public.fr", "https://www.cnil.fr"]   # facultatif ; domaines officiels seulement
---

**Réponse directe en deux phrases.** (une seule fois, en gras, tout en haut)

## Intertitre

Texte…

## Questions fréquentes

**Question complète ?**
Réponse sur une ligne ou deux (3 à 6 questions, propres à l'article).
```
La FAQ est la dernière section (`## Questions fréquentes`), chaque question en gras sur sa ligne, la réponse sur la ligne suivante. Longueur : 1 100 à 1 800 mots pour une question précise, 1 800 à 2 800 pour un guide. Chaque `##` reprend une variante réelle de la grappe fournie.
