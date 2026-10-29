---
term: "3D Secure"
title: "Qu'est-ce que 3D Secure ?"
seoTitle: "3D Secure : définition et rôle dans le paiement"
excerpt: "3D Secure : définition simple de cette étape de confirmation du paiement par carte, pourquoi elle existe et comment elle influence vos ventes en ligne."
definition: "3D Secure est l'étape par laquelle la banque du client vérifie son identité lors d'un paiement en ligne, par exemple en lui demandant de valider dans son application bancaire ou par un code."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 3
category: "gestion"
keywords: ["3d secure", "c'est quoi 3d secure", "authentification forte paiement", "3ds paiement en ligne", "valider paiement application bancaire"]
related: ["paiement-en-ligne", "stripe", "abandon-de-panier", "boutique-en-ligne", "taux-de-conversion"]
---

**3D Secure est la vérification d'identité demandée par la banque du client pendant un paiement en ligne. Le client confirme dans son application bancaire ou avec un code. Pour vous, il protège les ventes, mais ajoute une étape où certains abandonnent.**

## À quoi ça sert ?

Il sert à s'assurer que la personne qui paie est bien le titulaire de la carte. Il limite les fraudes à la carte volée et réduit le risque de contestation après coup. Cette exigence découle de la réglementation européenne sur les services de paiement, souvent appelée DSP2 : l'authentification dite forte est devenue la norme pour la plupart des paiements en ligne. Les règles précises et les exceptions sont à vérifier auprès de votre prestataire de paiement et de votre banque.

## Comment ça marche (en pratique)

Après la saisie de la carte, la banque du client intervient :

1. Elle reçoit la demande de paiement par le prestataire.
2. Elle demande une preuve : validation dans l'application, empreinte biométrique du téléphone, ou code reçu.
3. Si la preuve est correcte, le paiement continue. Sinon il est refusé.

Vous n'avez rien à programmer vous-même : c'est le prestataire de paiement qui déclenche 3D Secure quand c'est nécessaire. Votre rôle consiste à choisir un prestataire qui le gère proprement et à rendre le retour sur votre site clair, avec une page de confirmation explicite. Voir [Stripe](/lexique/stripe) et [le paiement en ligne](/lexique/paiement-en-ligne).

## Exemple concret

Exemple type : une cliente règle une commande de produits du terroir. Après avoir saisi sa carte, elle reçoit une notification de sa banque, valide d'un doigt, et revient sur le site avec sa confirmation. Si elle ne voit pas la notification, elle peut abandonner : un message du type « Validez le paiement dans votre application bancaire » limite ce risque. Cas fictif.

## Les erreurs fréquentes

- **Penser que c'est votre site qui sécurise.** 3D Secure est une couche bancaire, pas une option de votre site.
- **Ne pas expliquer l'étape.** Un client surpris par une redirection se demande s'il s'agit d'une arnaque. Annoncez-la.
- **Oublier le mobile.** Passer d'un navigateur à l'application bancaire puis revenir doit fonctionner sans perdre le panier.
- **Confondre refus bancaire et bug.** Un paiement refusé par la banque n'est pas une panne du site. Proposez de réessayer ou de changer de moyen de paiement.
- **Négliger l'impact sur les ventes.** Surveillez vos paiements échoués dans l'outil de votre prestataire, en lien avec l'[abandon de panier](/lexique/abandon-de-panier).

## Pour aller plus loin

- [Paiement en ligne : guide commerçants](/blog/paiement-en-ligne-guide-commercants).
- [Tunnels d'achat e-commerce](/blog/tunnels-achat-ecommerce) : fluidifier la fin du parcours.
- [Site e-commerce](/services/site-ecommerce).
- [Estimer votre projet](/tarifs).

## Questions fréquentes

**3D Secure est-il obligatoire sur mon site ?**
Dans la plupart des cas, la banque du client l'exige pour les paiements en ligne par carte. Votre prestataire de paiement vous indique les cas d'exemption.

**3D Secure fait-il baisser mes ventes ?**
Il ajoute une étape, donc quelques clients abandonnent. En contrepartie, il réduit les fraudes. Un parcours soigné limite la perte.

**Le client doit-il avoir un smartphone ?**
Pas toujours : certaines banques proposent un code par SMS ou un lecteur dédié. Le choix du moyen dépend de la banque, pas de votre site.

**Qui est responsable en cas de fraude ?**
Cela dépend du contrat avec votre prestataire et de la présence ou non d'une authentification. Lisez ses conditions sur les litiges.
