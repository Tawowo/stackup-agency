---
term: "certificat SSL"
title: "Qu'est-ce qu'un certificat SSL ?"
seoTitle: "Certificat SSL : définition, rôle et renouvellement"
excerpt: "Un certificat SSL chiffre les échanges entre vos visiteurs et votre site et prouve son identité. Définition, types, renouvellement et erreurs fréquentes."
definition: "Un certificat SSL (en pratique TLS) chiffre les échanges entre le navigateur du visiteur et votre site, et atteste de l'identité du site. Il est à l'origine du cadenas et de l'adresse en https."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 3
category: "web"
keywords: ["certificat ssl définition", "c'est quoi un certificat ssl", "certificat ssl site internet", "certificat expiré"]
related: ["https", "hebergement-web", "dns", "nom-de-domaine", "site-web"]
---

**Un certificat SSL est un fichier installé sur votre site qui chiffre les échanges avec vos visiteurs et prouve que le site est bien le vôtre. Sans lui, les navigateurs affichent un avertissement qui fait fuir les clients.**

## À quoi ça sert ?

Il remplit deux fonctions. Il chiffre les données transmises, ce qui protège les informations saisies dans un formulaire ou un paiement contre l'interception. Il authentifie le site : le navigateur vérifie que le certificat a été émis pour votre [nom de domaine](/lexique/nom-de-domaine) par une autorité reconnue.

Le résultat visible est le cadenas dans la barre d'adresse et le préfixe [https](/lexique/https). Quand le certificat manque ou est périmé, le navigateur signale un site « non sécurisé » ou affiche une page d'alerte avant l'accès.

## Comment ça marche (en pratique)

Le terme SSL est un ancien nom : le protocole utilisé aujourd'hui s'appelle TLS, mais l'expression « certificat SSL » est restée dans l'usage. Le certificat est délivré par une autorité de certification après vérification que vous contrôlez bien le domaine.

Il existe différents niveaux de vérification : une validation simple du domaine, qui suffit à la plupart des sites de TPE, et des validations plus poussées de l'organisation, utilisées par certaines grandes structures. Beaucoup d'hébergeurs fournissent un certificat gratuit et le renouvellent automatiquement. Il a une durée de validité limitée, et il doit être renouvelé avant son expiration.

Après installation, le site doit être configuré pour utiliser https partout, avec une redirection automatique de l'ancienne adresse non sécurisée vers la nouvelle.

## Exemple concret

Exemple type : un coiffeur remarque que des clients lui disent voir un message d'alerte en ouvrant son site. Le certificat a expiré parce que le renouvellement automatique avait échoué après un changement d'hébergeur. Son prestataire réinstalle un certificat, vérifie la redirection vers https et met en place un suivi des échéances pour éviter que cela se reproduise.

## Les erreurs fréquentes

- **Laisser expirer le certificat.** Prévoyez une alerte ou un renouvellement automatique et vérifiez qu'il fonctionne.
- **Oublier les contenus mixtes.** Une image chargée en http dans une page https déclenche un avertissement.
- **Ne pas rediriger l'ancienne adresse.** Vous auriez deux versions du site, ce qui gêne le référencement.
- **Acheter un certificat cher sans en avoir besoin.** Pour un site de TPE, un certificat standard suffit généralement.
- **Croire qu'il protège tout.** Il sécurise les échanges, pas le site contre le piratage.

## Pour aller plus loin

- [SSL et HTTPS : ce qu'il faut savoir](/blog/ssl-https-site-web)
- [Hébergement web : bien choisir](/blog/hebergement-web-choisir)
- [Site en erreur : que faire](/blog/site-en-erreur-page-blanche-erreur-500-404)
- [Maintenance d'un site](/services/maintenance)

## Questions fréquentes

**Un certificat SSL est-il obligatoire ?**
Pratiquement oui : les navigateurs signalent les sites non sécurisés, et un site qui recueille des données ou des paiements doit protéger ces échanges.

**Un certificat SSL est-il payant ?**
Il existe des certificats gratuits, souvent fournis par l'hébergeur, et des certificats payants. Pour un site classique, le gratuit suffit en général.

**Quelle différence entre SSL et TLS ?**
TLS est le protocole moderne qui a remplacé SSL. On parle toujours de SSL par habitude.

**Un certificat améliore-t-il le référencement ?**
Google considère le https comme un signal léger. L'enjeu principal est la confiance des visiteurs.
