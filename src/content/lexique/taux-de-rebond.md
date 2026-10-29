---
term: "Taux de rebond"
title: "C'est quoi le taux de rebond d'un site ?"
seoTitle: "Taux de rebond : définition simple et comment le lire"
excerpt: "Le taux de rebond indique la part de visites sans véritable interaction. Définition, lecture dans Google Analytics 4 et ce qu'il faut en conclure."
definition: "Le taux de rebond est la part des visites où l'internaute n'a pas interagi avec le site avant de partir. Dans Google Analytics 4, c'est l'inverse du taux d'engagement."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 4
category: "seo"
keywords: ["taux de rebond", "taux de rebond définition", "c'est quoi le taux de rebond", "bon taux de rebond", "taux de rebond ga4"]
related: ["google-analytics", "taux-de-conversion", "kpi", "landing-page", "core-web-vitals"]
sources: ["https://support.google.com"]
---

**Le taux de rebond est la proportion de visites au cours desquelles la personne n'a rien fait de significatif avant de quitter le site. C'est un signal à interpréter avec le contexte : un rebond n'est pas forcément un échec.**

## À quoi ça sert ?

Il sert de thermomètre. Quand il est très élevé sur une page précise, c'est que quelque chose ne colle pas entre ce que le visiteur attendait et ce qu'il a trouvé : message flou, page trop lente, contenu qui ne répond pas à la recherche.

Il ne sert pas à juger la qualité globale de votre site, ni à prédire votre classement sur Google. Google n'a jamais indiqué l'utiliser comme critère de classement.

## Comment ça marche (en pratique)

Tout dépend de l'outil, et c'est là que l'on se trompe le plus.

Dans l'ancienne version de Google Analytics (Universal Analytics), un rebond était une visite d'une seule page, sans autre action. Une personne qui lisait votre page de contact pendant cinq minutes puis partait comptait comme un rebond, même si elle avait relevé votre numéro.

Dans Google Analytics 4, la logique a changé. Une session est dite « engagée » si elle dure plus de dix secondes, ou si elle comporte au moins une conversion, ou si elle compte au moins deux pages vues. Le taux de rebond est le complément du taux d'engagement : tout ce qui n'est pas engagé est un rebond. Les définitions exactes sont à vérifier dans l'aide officielle de Google Analytics.

Pour le lire utilement :

1. Regardez-le **page par page**, pas en moyenne sur tout le site.
2. Comparez des pages **de même nature** : une page de contact et un article de blog n'ont pas le même comportement normal.
3. Croisez-le avec **la source** du trafic (recherche, réseaux sociaux, annuaire) et avec **l'appareil** (mobile ou ordinateur).

## Exemple concret

Exemple type : un plombier a une page « dépannage fuite d'eau » qui reçoit des visites depuis Google. Beaucoup de visiteurs repartent sans cliquer ailleurs. Inquiétant ? Pas forcément : si cette page affiche le numéro de téléphone bien en vue, ces visiteurs ont peut-être simplement appelé. Le taux de rebond est élevé, la page remplit son rôle.

Même chose pour un article de blog qui répond à une question précise. Le lecteur a sa réponse et s'en va, satisfait.

À l'inverse, une page d'accueil avec un rebond élevé, un affichage lent sur mobile et aucun appel ni formulaire envoyé mérite de l'attention.

## Ce qu'il faut vérifier

- **Votre outil de mesure.** Comparer un chiffre d'Universal Analytics à un chiffre de GA4 n'a aucun sens.
- **Le suivi des actions.** Si les clics sur le téléphone, les e-mails et les formulaires ne sont pas enregistrés comme événements, vos visiteurs actifs passent pour des rebonds.
- **La vitesse d'affichage**, surtout sur mobile.
- **La cohérence entre la promesse et la page.** Un titre qui annonce une chose et une page qui en dit une autre font fuir.
- **Les visites parasites** (robots, trafic interne) qui faussent les moyennes sur un petit site.

Ne cherchez pas un « bon » pourcentage universel. Il n'existe pas : il dépend du type de page et de la source du trafic. Comparez-vous à vous-même, dans le temps.

## Pour aller plus loin

- [Google Analytics 4 : le guide pour les TPE](/blog/google-analytics-4-guide-tpe)
- [Mesurer le retour du SEO avec les bons indicateurs](/blog/mesurer-roi-seo-kpis-tableau-bord-tpe)
- [Pourquoi votre site charge lentement](/blog/pourquoi-site-charge-lentement)
- [Audit gratuit de votre site](/outils/audit-site)

## Questions fréquentes

**Un taux de rebond élevé est-il toujours mauvais ?**
Non. Sur une page qui répond à une question ou affiche un numéro à appeler, partir après avoir obtenu l'information est un succès.

**Le taux de rebond influence-t-il le référencement ?**
Google n'a pas annoncé l'utiliser comme critère de classement. Ce qui compte, c'est que la page réponde réellement à la recherche.

**Pourquoi mon taux de rebond a-t-il changé en passant à GA4 ?**
Parce que la définition n'est plus la même : GA4 le calcule à partir de l'engagement et non plus des visites d'une seule page.

**Comment le faire baisser ?**
Clarifiez le message du haut de page, accélérez l'affichage, ajoutez une suite logique (un lien, un bouton d'appel) et vérifiez que la page répond bien à la recherche qui y mène.
