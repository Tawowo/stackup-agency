---
term: "Google Analytics"
title: "Qu'est-ce que Google Analytics ?"
seoTitle: "Google Analytics : définition, usages et vigilance RGPD"
excerpt: "Google Analytics : l'outil de mesure d'audience de Google. À quoi il sert pour un petit site, ce qu'il ne dit pas et ce qu'il faut vérifier côté RGPD."
definition: "Google Analytics est un outil de mesure d'audience qui indique combien de personnes visitent un site, d'où elles viennent et ce qu'elles y font. Sa version actuelle s'appelle GA4."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 3
category: "seo"
keywords: ["google analytics", "c'est quoi google analytics", "ga4", "mesure d'audience site", "google analytics rgpd"]
related: ["search-console", "taux-de-rebond", "taux-de-conversion", "cookies", "rgpd"]
sources: ["https://www.cnil.fr", "https://support.google.com/analytics"]
---

**Google Analytics est un outil de mesure d'audience : il compte les visites de votre site et décrit ce que les visiteurs y font. Pour vous, il permet de savoir si votre site produit des contacts, à condition de l'installer dans le respect des règles sur les données personnelles.**

## À quoi ça sert ?

Analytics répond à des questions sur le comportement des visiteurs :

- Combien de personnes viennent, et par quel chemin (Google, réseaux sociaux, adresse tapée directement) ?
- Quelles pages sont lues, et sur quel appareil ?
- Combien de visiteurs appellent, remplissent le formulaire ou cliquent sur « itinéraire » ?

Cette dernière mesure est la plus utile : on la définit comme un « évènement » ou une « conversion ». Elle permet de juger un site à ses résultats concrets, pas seulement à son trafic. Voir aussi le [taux de conversion](/lexique/taux-de-conversion).

## Comment ça marche (en pratique)

L'outil repose sur un petit script ajouté à votre site, qui envoie à Google des informations sur chaque visite. Sa version actuelle, GA4, a remplacé l'ancienne version « Universal Analytics ». Vous consultez ensuite des rapports dans l'interface.

Point de vigilance : l'outil dépose des traceurs sur l'appareil du visiteur et traite des données personnelles. En France, la CNIL encadre cet usage. Elle a indiqué que certaines mesures d'audience peuvent être exemptées de consentement sous des conditions précises et avec une configuration particulière ; pour les autres, un [bandeau de cookies](/lexique/bandeau-cookies) est exigé. Les règles et les décisions évoluent : **à vérifier sur cnil.fr** avant installation.

Si le visiteur refuse les cookies, la mesure est partielle. C'est un effet normal du respect de la loi.

## Exemple concret

Exemple type : un kinésithérapeute souhaite savoir si son site apporte des rendez-vous. Il fait enregistrer deux évènements : le clic sur le numéro de téléphone et l'envoi du formulaire. Au bout de quelques semaines, il constate que presque tous les contacts passent par le mobile et que la page « Tarifs et remboursements » est la plus lue avant un appel. Il la place plus haut dans le menu.

## Les erreurs fréquentes

- Installer l'outil sans bandeau de consentement quand il est nécessaire.
- Regarder uniquement le nombre de visiteurs, sans mesurer d'action concrète.
- Oublier d'exclure ses propres visites, qui faussent les chiffres d'un petit site.
- Confondre Analytics et [Search Console](/lexique/search-console) : le premier mesure la visite, le second la visibilité dans Google.
- Interpréter trop vite de petits volumes : quelques visites ne permettent aucune conclusion fiable.

## Pour aller plus loin

- Une prise en main adaptée : [Google Analytics 4 pour les TPE](/blog/google-analytics-4-guide-tpe).
- Choisir des indicateurs utiles : [mesurer le ROI du SEO](/blog/mesurer-roi-seo-kpis-tableau-bord-tpe).
- Questions de conformité : notre [outil de mentions légales](/outils/generateur-mentions-legales).
- Une mesure sur mesure fait partie de la [création de site internet](/services/creation-de-site-internet).

## Questions fréquentes

**Google Analytics est-il gratuit ?**
La version standard est gratuite. Vérifiez néanmoins les conditions d'utilisation et les obligations de consentement qui s'appliquent à votre site.

**Faut-il un bandeau de cookies avec Analytics ?**
Dans la plupart des configurations, oui. La CNIL prévoit quelques exemptions strictement encadrées. Consultez le site officiel de la CNIL pour la situation à jour.

**Existe-t-il des alternatives ?**
Oui, d'autres outils de mesure d'audience existent, certains conçus pour limiter les données collectées. Comparez-les selon vos besoins réels et les règles en vigueur.

**GA4, c'est quoi par rapport à l'ancien Analytics ?**
GA4 est la version actuelle, fondée sur des évènements plutôt que sur des sessions. L'ancienne version a été arrêtée.
