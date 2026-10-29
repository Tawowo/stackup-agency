---
term: "Stripe"
title: "Qu'est-ce que Stripe ?"
seoTitle: "Stripe : définition, usages et limites pour encaisser"
excerpt: "Stripe : c'est quoi ? Un prestataire de paiement en ligne pour encaisser par carte sur votre site. Fonctionnement, avantages, limites et questions à poser."
definition: "Stripe est un prestataire de paiement en ligne : il permet à un site d'encaisser des cartes bancaires et d'autres moyens de paiement, en gérant la sécurité et le reversement des fonds au vendeur."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 3
category: "gestion"
keywords: ["stripe", "c'est quoi stripe", "stripe paiement en ligne", "stripe pour petite entreprise", "stripe ou paypal"]
related: ["paiement-en-ligne", "3d-secure", "boutique-en-ligne", "api", "saas"]
---

**Stripe est une entreprise de paiement en ligne. Concrètement, c'est un service que votre site appelle pour encaisser un client par carte : Stripe sécurise la saisie, vérifie le paiement et vous reverse les fonds.**

## À quoi ça sert ?

À encaisser sans construire de système bancaire. Un site de vente, une réservation avec acompte, un abonnement mensuel : Stripe couvre ces cas avec la même brique technique. C'est un service très répandu chez les développeurs, car il se branche proprement sur un site sur mesure.

Il ne remplace ni votre comptabilité ni votre facturation. Il encaisse, c'est tout.

## Comment ça marche (en pratique)

Votre site communique avec Stripe par une [API](/lexique/api), c'est-à-dire un canal d'échange normalisé entre deux logiciels. Le déroulé est le suivant :

1. Le client clique sur « Payer » sur votre site.
2. Il est dirigé vers une page ou un module hébergé par Stripe, où il saisit sa carte.
3. Si sa banque l'exige, il valide via [3D Secure](/lexique/3d-secure).
4. Stripe confirme le paiement à votre site, qui enregistre la commande.
5. Les fonds, déduction faite des frais, arrivent ensuite sur votre compte bancaire.

Les frais de Stripe sont publiés sur son site et changent : consultez la grille à jour plutôt qu'un chiffre repris ailleurs. Comparez-la aux autres solutions dans [Stripe, PayPal, Payplug](/blog/paiement-en-ligne-stripe-paypal-payplug).

## Exemple concret

Exemple type : une créatrice de bijoux ouvre une petite boutique. Son site envoie chaque panier à Stripe, qui encaisse puis notifie la commande. Elle voit les paiements dans son tableau de bord Stripe et prépare les colis. Cas fictif.

## Ce qu'il faut vérifier

- **Le coût réel.** Commission par transaction, frais selon le type de carte, frais éventuels de litige : lisez la tarification officielle.
- **Les litiges.** Un client peut contester un paiement auprès de sa banque. Gardez les preuves de livraison ou de prestation.
- **L'ouverture du compte.** Stripe demande des informations sur votre entreprise et sur votre identité. Prévoyez-les avant le lancement.
- **La dépendance.** Comme avec tout prestataire, vous dépendez de ses conditions. Un site bien conçu permet de changer de solution de paiement sans tout refaire.
- **Les mentions légales.** Indiquez vos conditions de vente et votre politique de remboursement, voir [CGV](/blog/cgv-boutique-en-ligne).

## Pour aller plus loin

- [Guide du paiement en ligne pour commerçants](/blog/paiement-en-ligne-guide-commercants).
- [Site e-commerce avec paiement intégré](/services/site-ecommerce).
- [Outil sur mesure branché à votre encaissement](/services/logiciel-de-gestion).
- [Estimer votre projet](/tarifs).

## Questions fréquentes

**Stripe est-il gratuit ?**
Il n'y a généralement pas d'abonnement pour l'offre de base, mais chaque transaction supporte des frais. Consultez la tarification officielle de Stripe, qui évolue.

**Faut-il être une grande entreprise pour utiliser Stripe ?**
Non. Un entrepreneur individuel peut ouvrir un compte, sur présentation des justificatifs demandés.

**Stripe gère-t-il la facture de mes clients ?**
Il peut émettre des reçus, mais votre obligation de facturer reste la vôtre. Vérifiez sur [service-public.fr](https://www.service-public.fr) ce qu'une facture doit contenir.

**Puis-je utiliser Stripe sur un site WordPress ou Wix ?**
Souvent oui, par un module ou une extension. Sur un site sur mesure, l'intégration est directe et adaptée à vos règles de vente.
