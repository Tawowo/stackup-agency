---
term: "Redirection 301"
title: "Qu'est-ce qu'une redirection 301 ?"
seoTitle: "Redirection 301 : définition, usage et erreurs à éviter"
excerpt: "Une redirection 301 envoie visiteurs et Google d'une ancienne adresse vers la nouvelle, définitivement. Définition, cas d'usage et pièges à éviter."
definition: "Une redirection 301 est une instruction du serveur qui renvoie automatiquement une adresse vers une autre, de façon permanente. Elle sert à garder vos visiteurs et votre référencement lors d'un changement d'adresse."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 4
category: "seo"
keywords: ["redirection 301", "301 définition", "redirection permanente", "rediriger une page", "redirection 301 seo"]
related: ["erreur-404", "refonte-de-site", "balise-canonical", "nom-de-domaine", "indexation"]
sources: ["https://developers.google.com/search"]
---

**Une redirection 301 dit au navigateur et à Google : « cette page a déménagé définitivement, rendez-vous à la nouvelle adresse ». Bien posée, elle évite que vos anciens liens mènent à une erreur et conserve l'essentiel de ce que la page avait gagné.**

## À quoi ça sert ?

Chaque fois qu'une adresse change, l'ancienne continue d'exister ailleurs : dans les résultats de Google, dans les favoris de vos clients, dans les liens que d'autres sites font vers vous, dans vos anciennes cartes de visite et vos signatures d'e-mail. Sans redirection, tous ces chemins aboutissent à une page d'erreur.

La 301 relie l'ancien au nouveau. Le visiteur arrive au bon endroit sans s'en apercevoir, et Google comprend qu'il doit transférer l'ancienne page vers la nouvelle.

## Comment ça marche (en pratique)

Le serveur répond à la demande avec un code, « 301 Moved Permanently », accompagné de la nouvelle adresse. Le navigateur suit alors le renvoi. Il existe d'autres codes proches :

- **301 et 308** : déplacement permanent ;
- **302 et 307** : déplacement temporaire (une page en travaux, une promotion saisonnière).

Google traite la redirection permanente comme un signal fort pour remplacer l'ancienne adresse par la nouvelle dans ses résultats. La documentation officielle (developers.google.com/search) détaille les types de redirections.

On pose une 301 dans plusieurs situations :

1. **Refonte du site**, quand les adresses des pages changent.
2. **Changement de nom de domaine.**
3. **Passage de http à https**, ou choix entre avec ou sans « www ».
4. **Fusion ou suppression d'une page** qui a un équivalent proche.

La règle d'or : rediriger chaque ancienne page vers **la page qui la remplace vraiment**, la plus proche par le sujet. Pas vers l'accueil par commodité.

## Exemple concret

Exemple type : une électricienne refait son site. Son ancienne page « dépannage électrique » devient « /services/depannage ». Elle a reçu quelques liens d'un annuaire local et apparaît dans Google.

Elle ajoute une 301 de l'ancienne adresse vers la nouvelle. Les visiteurs venus de l'annuaire arrivent sur la bonne page, et Google met son index à jour au fil de ses visites. Sans cette redirection, l'annuaire pointerait vers une erreur et les liens ne serviraient plus à rien.

## Les erreurs fréquentes

- **Tout rediriger vers l'accueil.** Google peut les traiter comme des erreurs, et le visiteur ne trouve pas ce qu'il cherchait.
- **Enchaîner les redirections** (A vers B, puis B vers C). C'est plus lent et fragile : visez un seul saut.
- **Créer des boucles** où deux adresses se renvoient l'une à l'autre.
- **Retirer les redirections trop tôt.** Gardez-les longtemps, tant que d'anciens liens existent.
- **Utiliser une 302 par erreur** alors que le changement est définitif.
- **Oublier de tester.** Après la mise en ligne, essayez vos anciennes adresses importantes et vérifiez qu'elles arrivent au bon endroit.

Avant une refonte, dressez la liste de toutes les anciennes adresses (le plan du site, la Search Console et les statistiques vous y aident) et associez chacune à sa nouvelle destination.

## Pour aller plus loin

- [Refonte de site, SEO et redirections 301](/blog/refonte-site-web-seo-redirections-301)
- [Migrer un site Wix sans perdre son référencement](/blog/migrer-site-wix-sans-perdre-seo)
- [Erreurs 404 : comment les traiter](/blog/erreurs-404-seo-guide)
- [Refonte de site internet](/services/refonte-de-site-internet)

## Questions fréquentes

**Une redirection 301 fait-elle perdre du référencement ?**
Google indique qu'une redirection permanente correctement faite transmet les signaux de l'ancienne page. Un léger délai de prise en compte est normal.

**Quelle différence entre 301 et 302 ?**
La 301 annonce un changement définitif, la 302 un changement provisoire. Pour un déménagement de page, choisissez la 301.

**Combien de temps garder une redirection ?**
Le plus longtemps possible, tant que des liens ou des habitudes mènent encore vers l'ancienne adresse. Elle ne coûte presque rien.

**Faut-il rediriger une page supprimée sans équivalent ?**
Non. Une page qui n'a plus de remplaçant logique doit plutôt renvoyer une erreur propre, avec une page 404 utile.
