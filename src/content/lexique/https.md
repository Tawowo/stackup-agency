---
term: "HTTPS"
title: "Qu'est-ce que le HTTPS ?"
seoTitle: "HTTPS : définition et différence avec HTTP"
excerpt: "HTTPS est la version sécurisée du protocole du web, signalée par le cadenas. Définition, différence avec HTTP et vérifications pour votre site."
definition: "HTTPS est la version sécurisée du protocole HTTP : les échanges entre le visiteur et le site sont chiffrés grâce à un certificat. On le reconnaît au préfixe https et au cadenas du navigateur."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 3
category: "web"
keywords: ["https définition", "différence http https", "c'est quoi https", "site https obligatoire", "passer en https"]
related: ["certificat-ssl", "hebergement-web", "dns", "nom-de-domaine", "redirection-301"]
---

**HTTPS est la version sécurisée de l'adresse d'un site : le « s » signifie que les échanges sont chiffrés. Un site en simple HTTP est signalé comme non sécurisé par les navigateurs, ce qui nuit à la confiance.**

## À quoi ça sert ?

HTTP est le protocole par lequel un navigateur demande une page à un site. En HTTP simple, ces échanges circulent en clair : une personne mal intentionnée sur le même réseau peut les lire ou les modifier. Avec HTTPS, ils sont chiffrés, et le navigateur vérifie l'identité du site.

Concrètement, cela protège ce que vos visiteurs saisissent : nom, téléphone, message d'un formulaire de contact, informations de paiement. C'est aussi une question de crédibilité, puisque le navigateur affiche un avertissement à côté d'un site non sécurisé.

## Comment ça marche (en pratique)

HTTPS repose sur un [certificat SSL](/lexique/certificat-ssl) installé sur le serveur. Une fois en place, il faut s'assurer que tout le site passe par HTTPS.

1. **Installer le certificat**, souvent fourni par l'[hébergeur](/lexique/hebergement-web).
2. **Rediriger automatiquement** les anciennes adresses en http vers les adresses https, par une [redirection 301](/lexique/redirection-301).
3. **Corriger les contenus mixtes** : images, scripts ou polices encore appelés en http.
4. **Mettre à jour les liens** et déclarer la version https dans les outils de suivi de Google.

Une fois cela fait, vérifiez qu'il n'existe qu'une seule version du site, par exemple avec ou sans « www », sinon Google peut y voir des doublons.

## Exemple concret

Exemple type : une restauratrice ouvre le formulaire de réservation de son site depuis son téléphone et voit un avertissement « non sécurisé ». Son prestataire constate que le site répond encore en http et que certaines images sont chargées sans chiffrement. Il active la redirection vers https, corrige les images et vérifie le rendu. Les clients ne voient plus d'alerte en réservant.

## Les erreurs fréquentes

- **Installer le certificat sans rediriger.** Le site resterait accessible en deux versions.
- **Laisser des contenus en http.** Le cadenas peut disparaître ou afficher un avertissement.
- **Oublier les outils de suivi.** Il faut déclarer la bonne version du site dans la Search Console.
- **Négliger le renouvellement.** Un certificat expiré replace le site en situation d'alerte.
- **Croire qu'HTTPS suffit à sécuriser un site.** Il protège le transport des données, pas le site lui-même contre les attaques.

## Pour aller plus loin

- [SSL et HTTPS pour un site](/blog/ssl-https-site-web)
- [Refonte de site, SEO et redirections 301](/blog/refonte-site-web-seo-redirections-301)
- [RGPD et site internet](/blog/rgpd-site-internet-artisan-commercant)
- [Maintenance d'un site](/services/maintenance)

## Questions fréquentes

**Quelle différence entre HTTP et HTTPS ?**
HTTP envoie les données en clair, HTTPS les chiffre et authentifie le site. Le second est la norme actuelle.

**HTTPS est-il un critère de référencement ?**
Google l'utilise comme un signal modeste. L'effet principal tient à la confiance des visiteurs.

**Un site vitrine a-t-il besoin d'HTTPS ?**
Oui, même sans paiement : un formulaire de contact transmet des données personnelles, et les navigateurs signalent les sites non sécurisés.

**Comment vérifier que mon site est bien en HTTPS ?**
Tapez l'adresse avec http au début : vous devez être redirigé vers la version https, avec un cadenas dans la barre d'adresse.
