---
title: "Comment j'ai créé un système de gestion complet en 100h"
excerpt: "Retour d'expérience honnête sur la création du système de gestion de Roma Pizzeria : architecture technique, défis, nuits blanches et leçons apprises. Un projet de développeur web junior qui a tout changé."
date: "2026-06-05"
readTime: 9
tag: "Retour d'expérience"
keywords: ["système de gestion restaurant", "logiciel restaurant sur mesure", "développement web restaurant", "créer système gestion", "développeur web junior"]
---

# Comment j'ai créé un système de gestion complet pour un restaurant en 100 heures

Il y a quelques mois, j'avais 17 ans, besoin de financer mes études, et une idée un peu folle : créer des solutions digitales pour les petits commerces locaux. La première opportunité s'est présentée sous la forme d'un propriétaire de pizzeria qui cherchait à moderniser sa gestion. Ce qu'il me demandait allait bien au-delà d'un simple site vitrine.

Voici le retour d'expérience complet sur ce premier grand projet — les décisions techniques, les galères, les solutions trouvées à 2h du matin, et ce que ça m'a appris sur le **développement web de logiciels de gestion restaurant sur mesure**.

## Le brief initial : ambitieux mais flou

La première conversation avec le client de Roma Pizzeria a duré deux heures. En sortant, j'avais une liste de besoins qui ressemblait à ça :

- Un système de réservation en ligne
- Une interface pour prendre les commandes en salle
- Un écran en cuisine pour voir les commandes en temps réel
- Un programme de fidélité pour les clients réguliers
- Un tableau de bord pour suivre les stats et les ventes
- Un menu digital modifiable sans intervention technique

Six modules. Chacun potentiellement un projet à part entière. Et moi, développeur autodidacte de 17 ans, qui apprenait encore sur le tas.

La première question que je me suis posée : est-ce que c'est réalisable ? La deuxième : par où commencer ?

## L'architecture : la décision la plus importante

Avant d'écrire une seule ligne de code, j'ai passé plusieurs jours à concevoir l'architecture du système. C'est l'étape que les débutants négligent le plus souvent, et celle qui fait la différence entre un projet qui tient la route et un projet qui s'effondre à mi-chemin.

### Stack technique retenu

**Frontend et Backend :** Next.js 14 avec App Router. Ce choix me permettait d'avoir une codebase unifiée, avec des Server Actions pour les opérations critiques et des composants clients pour les interfaces en temps réel.

**Base de données :** PostgreSQL avec Prisma comme ORM. La puissance de PostgreSQL pour les requêtes complexes, et la productivité de Prisma pour éviter d'écrire du SQL brut à chaque fois.

**Temps réel :** Pusher. J'ai évalué les WebSockets natifs et Socket.io, mais Pusher offrait la solution la plus simple pour démarrer rapidement avec des canaux sécurisés et un plan gratuit généreux.

**Paiements :** Stripe, sans hésitation. L'API est excellente, la documentation claire, et la confiance des clients est acquise d'avance.

**Design :** Tailwind CSS. Vitesse de développement maximale une fois les classes maîtrisées.

**Auth :** NextAuth.js pour gérer les différents rôles (client, serveur, cuisinier, admin).

### Modélisation de la base de données

La modélisation des données a été le travail le plus intellectuellement exigeant du projet. Un restaurant, c'est un réseau de relations complexes :

- Un **client** peut avoir plusieurs **réservations**
- Une **réservation** est liée à une **table** et peut inclure des **pré-commandes**
- Une **commande** est composée de plusieurs **items** liés à des **produits du menu**
- Chaque **item de commande** peut avoir des **modifications** (sans oignons, sauce à part...)
- Les **clients** accumulent des **points de fidélité** à chaque commande

J'ai dessiné ce schéma à la main d'abord, puis dans Prisma. Cette phase de réflexion en amont m'a évité plusieurs refactorisations douloureuses.

## Les 5 défis techniques majeurs

### 1. Le temps réel entre la salle et la cuisine

C'est le cœur battant du système. Quand un serveur valide une commande, la cuisine doit le voir apparaître instantanément sur son écran. Pas dans 30 secondes. Instantanément.

L'implémentation avec Pusher s'est révélée plus délicate que prévu. Le problème principal : **la gestion des reconnexions**. Quand la connexion internet du restaurant coupe brièvement (ça arrive), il faut que l'interface cuisine récupère les commandes manquées automatiquement au reconnect. J'ai dû implémenter un système de synchronisation au démarrage qui récupère toutes les commandes actives depuis la base de données, indépendamment des événements Pusher.

```typescript
// Extrait simplifié de la logique de synchronisation
useEffect(() => {
  // Charger l'état initial depuis la DB
  fetchActiveOrders().then(setOrders)
  
  // S'abonner aux événements en temps réel
  const channel = pusher.subscribe('kitchen-orders')
  channel.bind('new-order', (data) => {
    setOrders(prev => [...prev, data.order])
  })
  channel.bind('order-updated', (data) => {
    setOrders(prev => prev.map(o => o.id === data.order.id ? data.order : o))
  })
  
  return () => pusher.unsubscribe('kitchen-orders')
}, [])
```

### 2. La gestion des conflits de réservation

Ce problème m'a donné du fil à retordre. Imaginez : deux clients réservent la même table au même moment depuis deux appareils différents. Lequel a priorité ?

La solution naive — vérifier la disponibilité puis créer la réservation — souffre d'une race condition : entre la vérification et la création, quelqu'un d'autre peut réserver la même table.

La solution : les **transactions Prisma avec verrouillage optimiste**. On utilise un champ `version` sur chaque table, et si deux transactions concurrentes tentent de modifier la même ressource, Prisma lève une erreur que l'on rattrape pour réessayer.

### 3. Le système de fidélité

Les règles de fidélité paraissent simples de l'extérieur (1€ dépensé = 1 point) mais deviennent vite complexes :

- Les points ont-ils une durée de validité ?
- Comment gérer les remboursements (retrait de points) ?
- Différents niveaux de fidélité avec des multiplicateurs ?
- Les points s'appliquent-ils aux commandes avec réduction ?

J'ai opté pour une approche **event sourcing légère** : plutôt que de stocker juste le solde de points, je stocke chaque transaction de points avec son montant, sa raison et la commande associée. Le solde actuel est calculé à la volée. Ça permet d'avoir un historique complet et de corriger facilement les erreurs.

### 4. L'interface cuisine sur tablette en cuisine

La cuisine est un environnement hostile pour les interfaces numériques. Les cuisiniers ont les mains occupées, les écrans peuvent être giclés d'eau, l'attention est limitée. L'interface devait être :

- Lisible à distance de 2 mètres
- Opérable avec un seul doigt
- Avec un retour visuel fort et sonore pour les nouvelles commandes
- Simple : pas de navigation complexe

J'ai fait plusieurs versions et testé avec le chef. La première était trop chargée, la deuxième mieux mais les boutons trop petits, la troisième était la bonne. **Ne pas négliger les tests utilisateurs, même informels.**

### 5. La gestion des permissions et des rôles

Le système a 4 types d'utilisateurs avec des droits très différents :

- **Client** : réserver, commander, voir ses points
- **Serveur** : prendre des commandes, gérer les tables
- **Cuisinier** : voir et traiter les commandes en cuisine
- **Admin** : tout faire + accès aux statistiques

Implémenter un RBAC (Role-Based Access Control) solide sans librairie externe a été formateur. J'ai créé un système de middleware Next.js qui vérifie les permissions à chaque requête vers les routes protégées.

## Les nuits où je voulais tout arrêter

Il y a eu trois moments vraiment difficiles.

**La nuit du bug de synchronisation** — À minuit, je découvre que dans certains cas, une commande peut apparaître deux fois sur l'écran cuisine. Le bug n'est pas reproductible de manière fiable. J'ai passé 4 heures à tracer chaque événement Pusher avant de trouver : un effet React qui se déclenchait deux fois en mode développement avec React StrictMode. Solution : 3 lignes de code. Leçon : *toujours lire les avertissements de la console jusqu'au bout.*

**Le crash de migration de base de données** — À J-3 de la livraison, une migration Prisma mal écrite a corrompu partiellement les données de test. J'ai cru avoir tout perdu. En réalité, j'avais une sauvegarde automatique de 6 heures plus tôt. J'ai perdu 6 heures de travail. Leçon : *sauvegardes automatiques dès le premier jour, toujours.*

**La première démo client ratée** — La démo de validation avec le client s'est mal passée. L'interface était fonctionnelle mais pas intuitive. Le client ne savait pas où cliquer. J'ai dû reprendre entièrement la navigation de l'admin. Leçon : *montrer des maquettes avant de coder l'interface. Toujours.*

## Ce que 100 heures m'ont appris

Après ce projet, voici les principes que j'applique maintenant systématiquement :

**1. La modélisation des données d'abord.** L'architecture de la base de données conditionne tout. Une heure de réflexion en amont économise dix heures de refactorisation plus tard.

**2. Construire pour l'échec.** Connexion internet qui coupe, erreur serveur, utilisateur qui fait quelque chose d'inattendu — tout ça va arriver. Gérer ces cas dès le début, pas à la fin.

**3. Tester avec de vraies personnes le plus tôt possible.** Pas seulement le client final, mais n'importe qui. Les bugs UX sont invisibles quand on a le nez dans le code.

**4. Documenter en écrivant le code.** Pas des commentaires pour expliquer ce que fait le code (les noms de variables font ça), mais pourquoi les choix ont été faits.

**5. Dormir est productif.** Un cerveau reposé résout en 20 minutes ce qu'un cerveau fatigué ne résout pas en 3 heures.

## Le résultat et la suite

Roma Pizzeria dispose aujourd'hui d'un système de gestion complet qui fonctionne en production. 8 modules, une interface par rôle, des données en temps réel, un programme de fidélité et des stats détaillées.

C'est avec ce projet que Stackup Agency est née. Et avec la conviction que les petits commerces méritent des outils digitaux modernes à des prix accessibles, pas seulement les grandes enseignes.

Si vous gérez un restaurant et que vous voulez discuter d'un système similaire, **contactez-moi — premier RDV gratuit, devis sous 24h**.

---

*Technologies utilisées dans ce projet : Next.js 14, TypeScript, PostgreSQL, Prisma, Pusher, Stripe, NextAuth.js, Tailwind CSS, Vercel.*
