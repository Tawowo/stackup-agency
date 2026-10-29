---
term: "sauvegarde de site"
title: "Qu'est-ce que la sauvegarde d'un site internet ?"
seoTitle: "Sauvegarde de site : définition, fréquence et restauration"
excerpt: "La sauvegarde est une copie de votre site pour le restaurer après un incident. Définition, ce qu'elle contient et comment vérifier qu'elle fonctionne."
definition: "La sauvegarde d'un site est une copie de ses fichiers et de sa base de données, conservée à part, qui permet de le remettre en état après une panne, un piratage ou une fausse manipulation."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 3
category: "web"
keywords: ["sauvegarde de site", "backup site web", "c'est quoi une sauvegarde de site", "restaurer un site internet", "sauvegarde wordpress"]
related: ["maintenance-de-site", "hebergement-web", "mise-en-production", "certificat-ssl", "donnee-personnelle"]
---

**Une sauvegarde est une copie de votre site, conservée ailleurs, qui permet de le remettre en marche si quelque chose tourne mal. C'est l'assurance la moins visible et l'une des plus utiles : on ne s'en soucie que le jour où elle manque.**

## À quoi ça sert ?

Un site peut être endommagé par une mise à jour ratée, une erreur humaine, une panne de serveur, un piratage ou la fermeture d'un compte d'hébergement. Sans copie récente et saine, il faut parfois tout reconstruire ; avec elle, on revient à un état antérieur.

Pour un commerce en ligne, elle protège aussi les commandes et les comptes clients. Pour un site de présentation, elle évite de perdre les textes et photos que vous avez mis du temps à réunir.

## Comment ça marche (en pratique)

Une sauvegarde complète couvre deux ensembles :

- **Les fichiers** : le code, les images, les documents du site.
- **La base de données**, s'il y en a une : pages, commandes, comptes, réglages.

Les bons réflexes sont connus sous le nom de règle « 3-2-1 », qui consiste à garder trois copies, sur deux supports différents, dont une hors du serveur d'origine. Une copie rangée sur le même serveur que le site ne vous aide pas si ce serveur disparaît.

Trois questions à poser :

1. **À quelle fréquence ?** Plus le site change souvent (commandes, réservations), plus la fréquence doit être élevée.
2. **Combien de temps garde-t-on les copies ?** Il faut pouvoir revenir à une version antérieure, pas seulement à la plus récente, si le problème n'a été détecté qu'après coup.
3. **A-t-on déjà testé la restauration ?** Une sauvegarde jamais testée est une hypothèse, pas une garantie.

Votre [hébergeur](/lexique/hebergement-web) en propose parfois, avec des conditions variables ; la [maintenance](/lexique/maintenance-de-site) les organise de façon suivie.

## Exemple concret

Exemple type : un fleuriste met à jour son site et obtient une page blanche. Grâce à une copie de la veille, le site est restauré rapidement et seul le travail du jour est refait. Sans cette copie, il aurait fallu reconstruire les pages à partir de zéro, en retrouvant les photos une à une.

## Les erreurs fréquentes

- **Compter uniquement sur l'hébergeur** sans savoir ce qu'il sauvegarde, pour combien de temps et comment restaurer.
- **Ne garder qu'une copie** sur le même serveur.
- **Ne jamais tester la restauration.**
- **Oublier la base de données**, alors que les fichiers seuls ne suffisent pas pour un site dynamique.
- **Conserver des sauvegardes sans protection** : elles contiennent parfois des données personnelles, donc à stocker de manière sécurisée.

## Pour aller plus loin

- [Sauvegarde et restauration d'un site](/blog/sauvegarde-restauration-site-internet).
- [Maintenance d'un site web](/blog/maintenance-site-web-guide).
- [Service de maintenance](/services/maintenance).
- [Estimer votre projet](/tarifs).

## Questions fréquentes

**Mon hébergeur fait-il des sauvegardes ?**
Beaucoup en proposent, avec des conditions différentes (fréquence, durée de conservation, restauration payante ou non). Vérifiez dans votre contrat, sans le supposer.

**Où conserver mes sauvegardes ?**
Sur au moins un support distinct du serveur du site, avec un accès protégé.

**Puis-je sauvegarder mon site moi-même ?**
Oui, si vous savez accéder aux fichiers et à la base. Sinon, mieux vaut un outil automatique ou un prestataire.

**Une sauvegarde protège-t-elle contre le piratage ?**
Elle permet de revenir à un état antérieur, mais ne corrige pas la faille. Il faut aussi la fermer, sinon l'incident peut se reproduire.
