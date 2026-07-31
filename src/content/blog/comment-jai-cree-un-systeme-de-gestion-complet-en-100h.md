---
title: "Comment j'ai créé un système de gestion complet en moins de 100h"
excerpt: "Retour d'expérience sur la conception et le développement d'un système de gestion sur mesure pour un client — de la spécification au déploiement en moins de 100 heures de travail."
date: "2026-07-18"
readTime: 7
tag: "Développement"
category: "creation-sites"
keywords: ["système de gestion sur mesure", "développement web sur mesure", "tableau de bord entreprise", "application web PME", "logiciel gestion personnalisé"]
---


Quand un client m'a contacté en disant "j'ai besoin d'un logiciel pour gérer mes commandes, mon stock et mes factures — les solutions du marché ne correspondent pas à mon métier", j'aurais pu lui suggérer Salesforce, HubSpot ou un ERP standard. À la place, j'ai construit quelque chose sur mesure. En 94 heures de développement, étalées sur 3 semaines. Voici comment.

## Le contexte : pourquoi le sur-mesure ?

Mon client gère un atelier de fabrication de mobilier haut de gamme à Tours. Son process de travail est très spécifique : devis avec configuration visuelle des pièces, suivi d'avancement par étape de fabrication, gestion des matières premières avec alertes de seuil, et facturation en plusieurs fois liée à l'avancement réel du chantier.

Aucun outil du marché ne couvrait ce process sans contorsions. Les solutions génériques nécessitaient des semaines de paramétrage et des compromis sur le workflow. Le coût de licences sur 5 ans dépassait 15 000€. Notre devis : 3 800€, livraison en 3 semaines.

## Phase 1 — Spécification (8h)

La première étape, souvent négligée, est la plus importante. J'ai passé 8 heures avec le client à documenter précisément :

- **Les rôles** : qui utilise quoi ? (gérant, atelier, commercial, comptabilité)
- **Les flux** : comment une commande entre dans le système, avance, et ressort en facture ?
- **Les données** : quelles informations stocker, quelles relations entre elles ?
- **Les règles métier** : quand déclencher une alerte ? Quel statut peut suivre quel autre ?

Le livrable de cette phase : un document de spécification fonctionnelle de 12 pages avec des schémas de flux et une liste exhaustive des fonctionnalités, priorisées en Must Have / Should Have / Nice to Have.

**Résultat** : 100 % des fonctionnalités développées correspondent exactement au besoin. Zéro développement inutile, zéro fonctionnalité oubliée.

## Phase 2 — Architecture technique (6h)

Avant d'écrire une ligne de code, 6 heures pour choisir et documenter les choix techniques :

**Stack choisie** : Next.js 14 (App Router) + TypeScript + Prisma ORM + PostgreSQL + Tailwind CSS. Ce stack permet un développement rapide, une maintenance simple, et des performances excellentes.

**Structure de la base de données** : 8 tables principales (clients, devis, commandes, articles, matières, stock, étapes_fabrication, factures) avec leurs relations. Chaque relation bien définie en amont évite les refactorisations coûteuses plus tard.

**Authentification** : NextAuth.js avec rôles (admin, atelier, commercial) — chaque rôle voit un dashboard différent.

**Hébergement** : Vercel pour le frontend, Supabase pour la base de données PostgreSQL. Infrastructure qui scale et coût maîtrisé (< 50€/mois pour ce volume).

## Phase 3 — Développement core (52h)

Le cœur du développement en 5 sprints d'une journée chacun :

### Sprint 1 (10h) — Fondations
Mise en place du projet, authentification, navigation par rôle, modèle de données Prisma, seed de données de test. À la fin de cette journée : on peut se connecter avec différents rôles et voir des interfaces vides mais fonctionnelles.

### Sprint 2 (12h) — Module Clients & Devis
CRUD complet des clients, création de devis avec sélection des articles, calcul automatique des totaux et TVA, PDF de devis généré à la volée (react-pdf), statuts de devis (brouillon / envoyé / accepté / refusé).

### Sprint 3 (10h) — Module Production
Transformation d'un devis accepté en commande, board de suivi Kanban par étape de fabrication (drag & drop), notifications internes au changement d'étape, calcul de la date de livraison estimée.

### Sprint 4 (10h) — Module Stock
Saisie des matières premières avec unité et seuil d'alerte, décrémentation automatique du stock à chaque étape de production validée, tableau de bord alertes stock, historique des mouvements.

### Sprint 5 (10h) — Module Facturation
Génération de factures liées à l'avancement (acompte 30% à la commande, solde à la livraison), suivi des paiements, relances automatiques à J+30, export comptable CSV.

## Phase 4 — Interface et expérience utilisateur (16h)

La différence entre un outil qu'on utilise et un outil qu'on subit, c'est l'interface. 16 heures consacrées à :

- **Dashboard role-based** : chaque rôle voit un résumé des informations qui le concernent dès la connexion
- **Tableaux de données** avec tri, filtres et recherche en temps réel (sans rechargement de page)
- **Formulaires avec validation** en temps réel (pas d'attente du submit pour savoir si un champ est invalide)
- **Design responsive** pour une utilisation sur tablette depuis l'atelier
- **Mode sombre** (les artisans préfèrent, surtout en fin de journée)

Le client a testé l'interface à mi-parcours (après Sprint 3) et fait 6 retours. Tous intégrés en 4 heures. C'est l'avantage du sur-mesure : le feedback est immédiat et les modifications sont rapides car on connaît chaque ligne de code.

## Phase 5 — Tests, déploiement, formation (12h)

Les dernières 12 heures :

- **Tests** : scénarios de test pour chaque module (4h), correction des bugs trouvés (2h)
- **Migration des données** : import des données existantes (fichiers Excel du client) dans la nouvelle base (2h)
- **Déploiement** : mise en production sur Vercel + Supabase, configuration du domaine, SSL (1h)
- **Formation** : session de 2h avec le gérant et les 3 utilisateurs principaux, documentation utilisateur en PDF (3h)

## Résultat final

**94 heures de développement**, dont 8h de spécification et 6h d'architecture. Le client utilise le système depuis 4 mois. Bilan :

- **Temps de facturation divisé par 3** : de 45 min à 15 min par facture
- **Zéro rupture de stock surprise** depuis le lancement (contre 2-3 par mois avant)
- **Visibilité temps réel** sur l'avancement de chaque commande
- **ROI estimé par le client** : positif dès le 2ème mois

## Ce qu'on peut faire pour vous

Ce type de projet — un système de gestion sur mesure parfaitement adapté à votre workflow — est exactement notre cœur de métier chez Stackup Agency. Chaque métier a ses spécificités, et les solutions génériques ont leurs limites.

Qu'il s'agisse d'un [système de caisse et gestion pour restaurant](/blog/systeme-caisse-restaurant-2026), d'un outil de suivi de chantiers pour un artisan, d'un CRM adapté à votre cycle de vente ou d'un tableau de bord dirigeant sur mesure, nous construisons des outils qui s'adaptent à vous — pas l'inverse.

Délai : 3 à 5 semaines selon la complexité. Tarif : à partir de 1 800€. Découvrez notre [offre de développement sur mesure](/services/site-ecommerce) ou [contactez-nous](/contact) directement pour discuter de votre projet.

---

*Vous avez un process métier que les logiciels standards ne couvrent pas ? [Parlez-nous de votre projet](/contact) — premier échange gratuit, devis sous 72h.*
