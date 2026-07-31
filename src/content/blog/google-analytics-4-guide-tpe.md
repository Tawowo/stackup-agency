---
title: "Google Analytics 4 pour les TPE : ce qu'il faut vraiment suivre"
excerpt: "GA4 est plus complexe qu'Universal Analytics. Mais pour une TPE, seuls 6 rapports comptent vraiment. Ce guide se concentre sur l'essentiel."
date: "2026-07-21"
updated: "2026-07-30"
readTime: 7
tag: "Marketing Digital"
category: "marketing"
keywords: ["Google Analytics 4 TPE", "GA4 guide", "analytics site web PME", "mesure performance site"]
---

**Google Analytics 4 est installé sur 60% des sites web, mais moins de 20% des TPE l'utilisent réellement pour prendre des décisions.** La majorité installe le code et n'ouvre plus jamais l'interface. Ce guide identifie les 6 rapports utiles pour une TPE — le reste peut attendre.

---

## Pourquoi GA4 est déroutant pour les petites entreprises

Google Analytics 4 a remplacé Universal Analytics en juillet 2023. Le changement d'interface et de logique de données a désarçonné beaucoup d'utilisateurs. UA était centré sur les "sessions" ; GA4 est centré sur les "événements".

Pour une TPE, cette distinction est secondaire. Ce qui compte : savoir d'où viennent vos visiteurs, quelles pages ils visitent, et s'ils vous contactent.

---

## Configuration minimale indispensable

Avant de regarder les données, 3 configurations sont nécessaires pour que GA4 vous donne des informations fiables :

### 1. Marquer vos propres visites comme trafic interne

Si vous visitez votre site régulièrement (pour le mettre à jour, pour montrer à des clients), ces visites faussent vos données. Dans GA4 : Admin → Flux de données → Définir les adresses IP internes à exclure.

### 2. Configurer les événements de conversion

Un "événement de conversion" dans GA4 correspond à une action importante : soumission de formulaire, clic sur votre numéro de téléphone, visite de la page de remerciement.

Sans cette configuration, GA4 vous dit combien de personnes visitent votre site mais pas combien vous contactent. C'est comme regarder le nombre de clients qui entrent dans votre boutique sans savoir combien achètent.

### 3. Connecter Google Search Console

Dans GA4 : Admin → Associations de produits → Search Console. Cette connexion vous donne les mots-clés Google qui génèrent des visites sur votre site.

---

## Les 6 rapports utiles pour une TPE

### Rapport 1 : Sources de trafic

**Où le trouver :** Rapports → Acquisition → Acquisition de trafic

**Ce qu'il vous dit :** D'où viennent vos visiteurs — Google (organique), réseaux sociaux, e-mail, accès direct, Google Ads.

**Ce que vous cherchez :** Quelle source envoie le plus de visiteurs ? Quelle source génère le plus de conversions (contacts) ? Ces deux questions n'ont pas toujours la même réponse.

### Rapport 2 : Pages les plus visitées

**Où le trouver :** Rapports → Engagement → Pages et écrans

**Ce qu'il vous dit :** Quelles pages attirent le plus de trafic, combien de temps les visiteurs y restent, et quel pourcentage quittent immédiatement (taux de rebond implicite).

**Ce que vous cherchez :** Vos pages de service sont-elles visitées ? Si votre page d'accueil fait 80% du trafic et vos pages de service 5%, c'est un problème de navigation.

### Rapport 3 : Rapport en temps réel

**Où le trouver :** Rapports → Temps réel

**Ce qu'il vous dit :** Les visiteurs actifs sur votre site en ce moment.

**Utilisation concrète :** Après une publication sur les réseaux sociaux, un e-mail ou une campagne Google Ads, vérifiez en temps réel si le trafic monte. Utile pour tester que votre tracking fonctionne.

### Rapport 4 : Conversion par source

**Où le trouver :** Rapports → Acquisition → Acquisition de trafic (colonne Conversions)

**Ce qu'il vous dit :** Combien de contacts (si vous avez configuré les conversions) viennent de chaque source.

**Ce que vous cherchez :** Le SEO génère-t-il des contacts ? Google Ads rentabilise-t-il son coût ? Cette donnée justifie vos investissements marketing.

### Rapport 5 : Appareils utilisés

**Où le trouver :** Rapports → Tech → Technologie

**Ce qu'il vous dit :** Quelle proportion de visiteurs utilise mobile vs desktop vs tablette.

**Ce que vous cherchez :** Si 70% de vos visiteurs sont sur mobile et que votre site n'est pas optimal sur mobile, vous perdez 70% de vos conversions potentielles.

### Rapport 6 : Localisation des visiteurs

**Où le trouver :** Rapports → Démographie → Données démographiques → Ville

**Ce qu'il vous dit :** D'où viennent géographiquement vos visiteurs.

**Ce que vous cherchez :** Pour un commerce local, vérifiez que votre trafic vient bien de votre zone géographique. Si vous recevez beaucoup de trafic depuis des villes lointaines sans intention d'achat locale, votre ciblage SEO est peut-être à revoir.

---

## Fréquence de consultation recommandée

| Fréquence | Rapport |
|---|---|
| Quotidien | Temps réel (après une action marketing) |
| Hebdomadaire | Sources de trafic, Conversions |
| Mensuel | Pages visitées, Localisation, Appareils |
| Trimestriel | Comparaison période précédente sur tous les rapports |

Ne vous noyez pas dans les données. Un regard hebdomadaire de 10 minutes sur les sources de trafic et les conversions suffit pour la grande majorité des TPE.

---

## Alternatives à GA4 pour les TPE

GA4 est puissant mais complexe. Deux alternatives sont intéressantes pour les petites structures :

**Plausible Analytics :** Simple, respect de la vie privée, conforme RGPD sans bannière de cookies nécessaire. Interface claire. 9€/mois pour un site. Idéal si vous voulez des données essentielles sans complexité.

**Matomo :** Open-source, auto-hébergeable, très puissant. Plus proche de GA4 en fonctionnalités. Gratuit en auto-hébergement (hébergement à payer).

**Microsoft Clarity :** Gratuit, enregistre les sessions de navigation et génère des heatmaps. Excellent pour comprendre le comportement des utilisateurs sur votre site. Complémentaire de GA4.

---

## FAQ

**GA4 respecte-t-il le RGPD ?**
GA4 en configuration standard ne respecte pas le RGPD sans bannière de consentement, car les données sont transférées vers des serveurs Google aux États-Unis. Pour être conforme, configurez le mode consentement GA4 ou utilisez une alternative comme Plausible ou Matomo.

**Est-ce que GA4 remplace Google Search Console ?**
Non, ce sont deux outils complémentaires. GA4 mesure ce qui se passe sur votre site (comportement des visiteurs). Search Console mesure votre visibilité dans les résultats Google (requêtes, positions, impressions). Les deux sont gratuits et tous deux indispensables.

**Mon site reçoit 50 visiteurs par mois. Vaut-il la peine d'installer GA4 ?**
Oui, même avec peu de trafic. GA4 vous dira d'où viennent ces 50 visiteurs et lesquels vous contactent. C'est l'information de base pour améliorer votre référencement ou votre contenu.

**Peut-on installer GA4 sans développeur ?**
Oui, via Google Tag Manager (GTM). Installez le code GTM sur votre site (opération unique, souvent 15 minutes), puis gérez GA4 et tous vos autres tags (Meta Pixel, Google Ads, etc.) depuis l'interface GTM sans toucher au code.

**GA4 fonctionne-t-il avec WordPress ?**
Oui. Le plugin "Site Kit by Google" installe GA4, Search Console et PageSpeed Insights directement dans votre tableau de bord WordPress en quelques clics.

Voir aussi : [guide SEO on-page complet](/blog/seo-on-page-guide-complet), [RGPD et site web en 2026](/blog/rgpd-site-web-2026) et [maintenance de site web](/blog/maintenance-site-web-guide).
