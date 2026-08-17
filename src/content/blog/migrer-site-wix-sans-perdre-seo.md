---
title: "Quitter Wix : migrer son site sans perdre son SEO"
excerpt: "Migrer un site Wix sans perdre son référencement demande une méthode précise : redirections 301, préservation du contenu indexé, et vérification post-migration."
date: "2026-08-17"
publishAt: "2026-11-07"
readTime: 8
tag: "Création de sites"
category: "creation-sites"
keywords: ["migrer site wix", "quitter wix", "wix vers wordpress sans perdre seo", "changer de site sans perdre referencement"]
---

**Migrer un site Wix sans perdre son SEO demande trois choses : recenser toutes les URLs indexées par Google, mettre en place une redirection 301 de chaque ancienne URL vers son équivalent sur le nouveau site, et republier un contenu au moins aussi complet qu'avant.** Sans ces étapes, une migration peut faire chuter le trafic organique de 50 à 90 % dans les semaines qui suivent — un risque réel mais entièrement évitable avec la bonne méthode.

## Pourquoi la migration depuis Wix est plus délicate qu'ailleurs

Wix ne permet aucun export technique du site : ni le code, ni la structure de base de données, ni les redirections automatiques vers un nouveau domaine ou une nouvelle plateforme. Contrairement à WordPress, où un export XML standard existe, quitter Wix signifie reconstruire entièrement le site ailleurs, en recréant manuellement chaque page et chaque URL.

C'est cette absence de portabilité qui rend la migration risquée pour le SEO si elle n'est pas préparée : Google a indexé les URLs Wix existantes, avec leur historique d'autorité accumulée (liens entrants, ancienneté, signaux de confiance). Une migration bâclée qui change les URLs sans redirection efface cet historique du jour au lendemain.

## L'étape 1 : recenser toutes les URLs indexées

Avant toute migration, la liste complète des URLs actuellement indexées par Google doit être établie via Google Search Console (rapport de couverture) et un crawl complet du site existant. Cette liste sert de référence pour vérifier, après migration, qu'aucune URL indexée n'a été oubliée dans le plan de redirection.

Une erreur fréquente : se baser uniquement sur le plan du site actuel plutôt que sur les URLs réellement indexées — certaines pages anciennes, parfois supprimées de la navigation mais toujours actives dans l'index Google, sont oubliées et génèrent des erreurs 404 après migration.

## L'étape 2 : construire la table de correspondance

Chaque ancienne URL Wix doit être associée à sa nouvelle URL équivalente sur le site de destination. Quand la structure change complètement (nouvelle architecture de site, nouvelles catégories), la redirection doit viser la page la plus proche en termes de contenu et d'intention, jamais systématiquement la page d'accueil — une redirection généralisée vers la page d'accueil est un signal négatif pour Google et dégrade fortement l'expérience utilisateur.

| Situation | Bonne pratique |
|---|---|
| URL identique en contenu, nouvelle structure | Redirection 301 directe vers l'équivalent |
| Page fusionnée avec une autre | Redirection 301 vers la page qui contient désormais ce contenu |
| Page supprimée sans équivalent | Redirection 301 vers la catégorie ou section la plus proche, jamais la page d'accueil par défaut |
| Ancienne page déjà en erreur avant migration | Laisser en 404 propre, ne pas forcer une redirection artificielle |

## L'étape 3 : mettre en place les redirections techniquement

C'est le point de blocage principal d'une migration Wix : Wix ne permettant aucune redirection sortante vers un nom de domaine externe une fois le domaine transféré, les redirections doivent être configurées au niveau du DNS ou du nouvel hébergement, immédiatement après le transfert du nom de domaine vers la nouvelle infrastructure. Un délai entre l'arrêt de Wix et la mise en place effective des redirections crée une fenêtre où Google rencontre des erreurs, avec un impact direct sur le classement.

## L'étape 4 : republier un contenu au moins équivalent

Le SEO ne dépend pas que des redirections techniques : le nouveau contenu doit couvrir au minimum les mêmes sujets et mots-clés que l'ancien site, idéalement avec un contenu enrichi plutôt que raccourci. Une migration qui réduit le volume de contenu utile (pages fusionnées de façon trop agressive, sections supprimées) peut faire perdre du positionnement même avec des redirections techniquement correctes.

## L'étape 5 : vérifier après migration

Dans les jours qui suivent la mise en ligne du nouveau site, plusieurs vérifications s'imposent : soumettre le nouveau sitemap XML dans Google Search Console, vérifier dans le rapport de couverture que les anciennes URLs redirigent correctement (statut "Page avec redirection" plutôt que "Erreur 404"), et surveiller l'évolution du trafic organique sur les semaines suivantes pour détecter toute anomalie rapidement.

## Le calendrier réaliste d'une migration réussie

| Phase | Durée indicative |
|---|---|
| Audit et recensement des URLs indexées | 2 à 5 jours |
| Construction de la table de correspondance | 3 à 7 jours selon la taille du site |
| Développement et contenu du nouveau site | 10 à 21 jours ouvrés (selon le type de site) |
| Mise en place des redirections + bascule DNS | 1 à 2 jours |
| Suivi post-migration en Search Console | 4 à 8 semaines |

## Ce qui se passe si la migration est mal préparée

Sans redirections propres, Google traite chaque ancienne URL comme définitivement disparue : le trafic organique associé chute immédiatement, et l'autorité accumulée par ces pages (liens entrants, ancienneté) n'est pas transférée aux nouvelles URLs. Reconstruire ce positionnement perdu peut prendre plusieurs mois, alors qu'une migration bien préparée conserve la quasi-totalité du trafic organique dès les premières semaines suivant la bascule.

## En résumé

- Wix ne permet aucun export technique : la migration signifie reconstruire le site ailleurs, pas le transférer.
- Le recensement complet des URLs indexées par Google Search Console est la première étape indispensable, avant même de commencer le nouveau site.
- Chaque ancienne URL doit rediriger vers son équivalent réel le plus proche, jamais systématiquement vers la page d'accueil.
- Une migration bien préparée conserve la quasi-totalité du trafic organique ; une migration bâclée peut faire chuter le trafic de 50 à 90 %.

## Questions fréquentes

**Combien de temps le SEO met-il à se stabiliser après une migration ?**
Avec des redirections propres, Google traite généralement la majorité des redirections en 2 à 6 semaines. Un suivi de 2 à 3 mois reste recommandé pour confirmer la stabilité complète du positionnement.

**Faut-il migrer tout le site d'un coup ou par étapes ?**
Une migration complète, préparée en amont avec toutes les redirections prêtes avant la bascule, limite la fenêtre de risque. Une migration partielle multiplie les risques d'incohérence entre deux systèmes actifs simultanément.

**Perd-on les avis Google ou la fiche Google Business Profile en migrant le site ?**
Non, la fiche Google Business Profile est indépendante du site web. Seule l'URL du site renseignée sur la fiche doit être mise à jour vers la nouvelle adresse une fois la migration terminée.

**Peut-on garder le même nom de domaine en quittant Wix ?**
Oui, c'est même recommandé pour limiter l'impact SEO : seul l'hébergement change, le domaine reste identique et continue de porter l'historique de confiance accumulé auprès de Google.

**Une agence peut-elle s'occuper de toute la migration, y compris les redirections ?**
Oui, c'est la partie technique la plus sensible d'une migration et elle doit être anticipée dès le devis, pas ajoutée après coup une fois le nouveau site déjà en ligne.

---

*Pour aller plus loin : [Wix vs sur mesure : le comparatif honnête 2026](/blog/wix-ou-sur-mesure-comparatif-2026) · [Refonte de site : garder son SEO en changeant de site](/blog/refonte-site-web-seo-redirections-301) · [Wix vs WordPress vs sur-mesure — Comparatif complet](/comparatif/wix-wordpress-sur-mesure)*
