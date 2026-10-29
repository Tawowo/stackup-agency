---
term: "API"
title: "Qu'est-ce qu'une API ?"
seoTitle: "API : définition simple et exemples pour un site"
excerpt: "Une API relie deux logiciels pour qu'ils échangent des données. Définition simple, exemples (paiement, carte, agenda) et points de vigilance."
definition: "Une API (interface de programmation) est un point d'accès normalisé par lequel un logiciel en sollicite un autre pour obtenir des données ou déclencher une action, sans connaître son fonctionnement interne."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 3
category: "web"
keywords: ["api définition", "c'est quoi une api", "api site web", "api exemple simple", "à quoi sert une api"]
related: ["application-web", "front-end-et-back-end", "automatisation", "paiement-en-ligne", "stripe"]
---

**Une API est un guichet par lequel un logiciel demande un service à un autre : afficher une carte, encaisser un paiement, lire un agenda. Pour vous, c'est ce qui permet à votre site de s'appuyer sur des outils existants plutôt que de tout réinventer.**

## À quoi ça sert ?

Un site moderne fait rarement tout lui-même. Il délègue : le paiement à un service spécialisé, la carte à un fournisseur de cartographie, l'envoi de courriels à un service d'e-mails. Les API sont les prises qui rendent ces branchements possibles.

Pour une petite entreprise, cela veut dire **moins de saisie à la main** : une commande qui crée automatiquement une facture, une demande de rendez-vous qui apparaît dans l'agenda, un avis qui s'affiche sur le site. C'est la base de l'[automatisation](/lexique/automatisation).

## Comment ça marche (en pratique)

Imaginez un serveur de restaurant. Vous (le site) lui passez une commande en suivant le format de la carte ; il la transmet en cuisine (le service tiers) et revient avec le plat. Vous n'avez pas besoin de savoir comment la cuisine fonctionne : seul compte le format de la commande et de la réponse.

Concrètement :

1. Le fournisseur publie une documentation : adresses d'appel, données attendues, réponses possibles.
2. Le développeur du site envoie des requêtes à ces adresses, en général avec une **clé** qui identifie votre compte.
3. Le service répond avec des données (par exemple « paiement accepté ») que le site exploite.

Cette clé est un secret : elle ne doit jamais se trouver dans une page visible par les visiteurs ni circuler par courriel. C'est le rôle du [back-end](/lexique/front-end-et-back-end) de la conserver.

## Exemple concret

Exemple type : une fleuriste vend des bouquets en ligne. Le site utilise l'API d'un service de [paiement en ligne](/lexique/paiement-en-ligne) comme [Stripe](/lexique/stripe) pour encaisser sans jamais manipuler elle-même les numéros de carte. Une seconde connexion avertit par courriel dès qu'une commande est payée, et une troisième ajoute la livraison au planning. Trois branchements, aucune ressaisie.

## Les erreurs fréquentes

- **Brancher sans réfléchir à la dépendance.** Si le service tiers change ses conditions, ses tarifs ou ses règles, votre site doit s'adapter.
- **Exposer une clé secrète** dans le code visible du navigateur.
- **Ignorer les limites d'usage.** Certains services plafonnent le nombre de requêtes ou deviennent payants au-delà d'un seuil : lisez les conditions.
- **Oublier les données personnelles.** Envoyer des informations de clients à un service tiers relève du RGPD ; vérifiez la rubrique correspondante du fournisseur.
- **Ne pas prévoir de plan B** si le service est indisponible un moment : message clair, enregistrement en attente.

## Pour aller plus loin

- [Payer en ligne : Stripe, PayPal, Payplug](/blog/paiement-en-ligne-stripe-paypal-payplug).
- [IA et automatisation](/services/ia-et-automatisation) pour relier vos outils entre eux.
- [Logiciel de gestion sur mesure](/services/logiciel-de-gestion) quand il faut connecter plusieurs services.
- [Estimer un projet](/tarifs).

## Questions fréquentes

**Une API est-elle un logiciel ?**
Non. C'est une porte d'entrée, un ensemble de règles pour dialoguer avec un logiciel, pas le logiciel lui-même.

**Faut-il payer pour utiliser une API ?**
Cela dépend du fournisseur. Certaines sont gratuites jusqu'à un certain usage, d'autres facturées à la demande ou par commission. Lisez la grille avant de vous engager.

**Une API est-elle sûre ?**
Elle l'est autant que sa mise en œuvre : connexion sécurisée, clés protégées, droits limités au nécessaire.

**Mon site actuel peut-il utiliser des API ?**
La plupart des CMS passent par des extensions ; un site sur mesure peut se connecter directement. L'intérêt est à évaluer selon le besoin réel.
