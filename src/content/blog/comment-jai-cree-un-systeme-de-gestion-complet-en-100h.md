---
title: "Comment j'ai créé un système de gestion complet en 100h"
excerpt: "Retour d'expérience honnête sur la création du système de gestion de Roma Pizzeria : les défis techniques, les nuits blanches, et les leçons apprises."
date: "2026-06-05"
readTime: 8
tag: "Retour d'expérience"
---

# Comment j'ai créé un système de gestion complet en 100h

Quand le propriétaire de Roma Pizzeria m'a contacté, j'avais 17 ans et j'avais besoin de financer mes études. Ce qu'il me demandait allait bien au-delà d'un simple site web. C'était un **système complet de gestion de restaurant**.

## Le brief initial

La demande était simple en apparence :
- Un système de réservation en ligne
- Une gestion des commandes en temps réel
- Une interface pour la cuisine
- Un programme de fidélité
- Un dashboard administrateur

Simple sur le papier. Complexe dans la réalité.

## Les premiers jours : la phase d'architecture

J'ai commencé par cartographier tous les flux de données. Qui communique avec qui ? Comment les commandes passent-elles de la salle à la cuisine ? Comment gérer les conflits de réservation ?

**Stack technique retenu :**
- Next.js pour le frontend et l'API
- Prisma + PostgreSQL pour la base de données
- Pusher pour le temps réel
- Stripe pour les paiements
- Tailwind CSS pour l'interface

## Les défis techniques majeurs

### La gestion du temps réel

Le plus complexe était l'interface cuisine. Quand un serveur prend une commande, la cuisine doit être notifiée instantanément. J'ai utilisé Pusher pour les WebSockets, mais déboguer les connexions persistantes à 2h du matin est une expérience... formative.

### La gestion des conflits de réservation

Deux clients qui réservent la même table en même temps ? J'ai dû implémenter un système de verrou optimiste avec Prisma pour gérer ces cas de concurrence.

### Le système de fidélité

Calculer les points, gérer les niveaux, envoyer les notifications par SMS au bon moment — ce module m'a pris presque 15 heures à lui seul.

## Les nuits blanches

Je ne vais pas mentir : il y a eu des nuits à coder jusqu'à 4h du matin après les cours. Des bugs qui semblaient insolubles à minuit se révélaient stupidement simples le lendemain matin.

La leçon ? **Dormir est productif.** Un cerveau reposé résout en 10 minutes ce qu'un cerveau fatigué ne peut pas résoudre en 3 heures.

## Ce que j'ai appris

1. **Commencer par les données.** L'architecture de la base de données détermine tout le reste.
2. **Les utilisateurs ne font pas ce qu'on attend.** Tester avec de vraies personnes révèle des bugs impensables.
3. **La documentation sauve des vies.** (Les miennes et celles du client.)
4. **Le perfectionnisme est l'ennemi du livrable.** Il faut savoir dire "c'est assez bien pour maintenant".

## Le résultat

Après ~100 heures de travail sur plusieurs semaines, le système était en production. Roma Pizzeria avait son système complet, et moi j'avais mon premier client professionnel, ma première vraie référence, et la preuve que l'âge n'est pas une limite.

**Stackup Agency était née.**
