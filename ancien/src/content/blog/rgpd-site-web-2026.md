---
title: "RGPD et site web en 2026 : les obligations qui ont vraiment changé"
excerpt: "Cookies, formulaires, Google Analytics : ce que le RGPD impose réellement aux petits sites en 2026. Checklist pratique et coûts de mise en conformité."
date: "2026-07-23"
updated: "2026-07-28"
readTime: 8
tag: "Juridique"
category: "juridique"
keywords: ["RGPD site web 2026", "conformité RGPD PME", "cookies consentement", "mentions légales RGPD"]
---

**Le RGPD s'applique à tous les sites web qui collectent des données personnelles — y compris les plus petits.** En pratique, peu de TPE sont parfaitement conformes. En 2026, la CNIL intensifie ses contrôles sur les PME. Voici ce qui est vraiment obligatoire, ce qui est recommandé, et ce que ça coûte de se mettre en conformité.

---

## Ce que le RGPD impose concrètement à un site web TPE

### 1. La bannière de cookies

Si votre site utilise des cookies non essentiels (Google Analytics, pixels Facebook, chat en ligne, etc.), vous devez :
- Afficher une bannière de consentement avant de poser ces cookies
- Permettre à l'utilisateur de refuser aussi facilement qu'accepter
- Ne pas poser les cookies avant que le consentement soit donné

La CNIL a précisé en 2024 que les boutons "Accepter" et "Refuser" doivent être au même niveau visuel. Un bouton "Accepter" en couleur et un lien "Continuer sans accepter" en gris ne sont pas conformes.

**Solutions conformes pour les TPE :**
- Axeptio (français, payant — environ 30-80€/mois selon le plan)
- Cookiebot (danois, 9€/mois pour les petits sites)
- Orejime (open source, gratuit, à configurer)
- Tarteaucitron.js (open source, gratuit, maintenu par une association française)

### 2. Les mentions légales

Obligatoires pour tout site web français (loi LCEN 2004 + RGPD) :
- Nom et prénom ou dénomination sociale
- Adresse du siège social
- Numéro SIRET
- Adresse email de contact
- Nom de l'hébergeur
- Nom du directeur de publication

Ces mentions doivent être accessibles depuis toutes les pages (généralement dans le footer).

### 3. La politique de confidentialité

Obligatoire si vous collectez des données personnelles. Doit expliquer :
- Quelles données sont collectées (nom, email, IP...)
- Pourquoi elles sont collectées (base légale : consentement, contrat, intérêt légitime...)
- Combien de temps elles sont conservées
- Qui peut y avoir accès (hébergeur, outil d'email, etc.)
- Comment l'utilisateur peut exercer ses droits (accès, rectification, suppression)

### 4. Les formulaires de contact

Chaque formulaire qui collecte des données personnelles doit :
- Lister les données collectées et leur finalité
- Mentionner la durée de conservation
- Inclure un lien vers la politique de confidentialité
- Ne pas pré-cocher des cases de consentement marketing

### 5. Google Analytics et la CNIL

Google Analytics (Universal Analytics et GA4) transfère des données vers les serveurs de Google aux États-Unis. La CNIL a considéré en 2022 que ce transfert était illicite au regard du RGPD (absence de protection équivalente à l'UE).

Depuis, la situation a évolué avec le Privacy Shield 2.0 (accord UE-US de 2023), qui a rendu Google Analytics à nouveau légalement utilisable en théorie. En pratique, la conformité stricte recommande :
- Activer la pseudonymisation des IP dans GA4
- Utiliser une alternative européenne (Matomo, Plausible, Fathom)
- Afficher une bannière de consentement permettant de refuser Analytics

---

## Ce qui a vraiment changé en 2026

### Contrôles CNIL renforcés sur les PME

Depuis 2025, la CNIL a étendu ses campagnes de contrôle aux PME et TPE, après avoir principalement ciblé les grandes entreprises. Elle utilise des outils automatisés pour détecter les non-conformités sur des échantillons de sites.

Les principaux manquements constatés :
1. Bannière de cookies non conforme (pas de bouton refuser équivalent)
2. Absence de politique de confidentialité
3. Formulaires sans mention des bases légales
4. Google Analytics posé sans consentement

### Les sanctions pour les TPE

Les amendes RGPD peuvent théoriquement atteindre 4% du chiffre d'affaires mondial. En pratique, la CNIL commence par :
1. Une mise en demeure (délai pour se mettre en conformité)
2. En cas de non-conformité persistante : une sanction financière

Pour les TPE, les sanctions ont été de quelques milliers à quelques dizaines de milliers d'euros selon la gravité. Le risque principal est la mise en demeure, pas l'amende immédiate.

---

## Checklist de conformité pour un site TPE

**Indispensable :**
- [ ] Mentions légales complètes dans le footer
- [ ] Politique de confidentialité accessible depuis toutes les pages
- [ ] Bannière de cookies conforme si cookies non essentiels
- [ ] Formulaires avec mention des données collectées et finalités

**Recommandé :**
- [ ] Politique de confidentialité rédigée avec les vrais délais de conservation
- [ ] Registre des traitements (document interne — obligatoire si > 250 salariés, recommandé pour tous)
- [ ] Contrats de sous-traitance avec vos prestataires qui accèdent aux données (hébergeur, outil email)

**Optionnel selon votre situation :**
- [ ] DPO (délégué à la protection des données) — obligatoire uniquement pour certaines activités sensibles
- [ ] Analyse d'impact (DPIA) — obligatoire pour les traitements à haut risque

---

## Coûts de mise en conformité pour une TPE

| Action | Coût estimé |
|---|---|
| Mentions légales (rédaction) | 0€ (modèles gratuits) à 200€ (avocat) |
| Politique de confidentialité | 0€ (générateurs) à 500€ (avocat) |
| Bannière cookies (Tarteaucitron) | 0€ (open source, config par développeur) |
| Bannière cookies (Axeptio) | 30-80€/mois |
| Audit conformité par un avocat | 500€ à 2 000€ |
| **Total minimal acceptable** | **0 à 100€** |
| **Total avec accompagnement pro** | **1 000€ à 3 000€** |

La mise en conformité minimale (mentions légales, politique de confidentialité basique, bannière cookies open source) est réalisable pour quelques heures de travail et zéro coût. Un avocat spécialisé est utile pour les activités qui collectent des données sensibles.

---

## FAQ

**Mon site n'a qu'un formulaire de contact. Ai-je besoin d'une bannière de cookies ?**
Si votre site n'utilise que des cookies essentiels (session, CSRF) et aucun outil d'analyse ou marketing, vous n'avez pas besoin de bannière de consentement. En revanche, si vous utilisez Google Analytics, Facebook Pixel, ou un chat en ligne, oui.

**Quelle est la différence entre cookies essentiels et cookies non essentiels ?**
Les cookies essentiels permettent le fonctionnement du site (connexion, panier). Les cookies non essentiels servent à l'analyse (Analytics), au marketing (Pixel) ou aux fonctionnalités tierces (chat). Seuls les non essentiels nécessitent un consentement.

**Dois-je demander à mes clients existants leur consentement ?**
Si vous avez une base email constituée avant votre mise en conformité, il faut vérifier la base légale. Si les emails ont été collectés avec le consentement explicite à l'envoi d'emails marketing, vous êtes conformes. Sinon, un email de re-consentement est recommandé.

**Matomo est-il une alternative conforme à Google Analytics ?**
Oui. Matomo (anciennement Piwik) est une alternative open source qui peut être hébergée sur votre propre serveur — sans transfert de données vers des tiers. Configuré avec certains paramètres (anonymisation IP, pas de cookies cross-site), il peut être utilisé sans bannière de consentement selon la CNIL.

**Est-ce que le RGPD s'applique si je ne vends qu'en France ?**
Oui. Le RGPD s'applique dès que vous collectez des données de résidents européens, quelle que soit la taille de votre structure. Il n'y a pas de seuil de chiffre d'affaires ou de nombre de clients.
