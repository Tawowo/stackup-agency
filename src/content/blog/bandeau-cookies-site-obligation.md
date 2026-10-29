---
title: "Bandeau cookies : quand est-il obligatoire et comment le configurer ?"
seoTitle: "Bandeau cookies obligatoire ? Règles et configuration"
excerpt: "Site vitrine, boutique, Wix, WordPress, carte Google Maps : savez-vous si votre site a besoin d'un bandeau cookies et comment le rendre conforme ?"
date: "2026-10-29"
updated: "2026-10-29"
readTime: 9
tag: "Juridique"
category: "juridique"
type: "reglementation"
keywords: ["bandeau cookies obligatoire site vitrine", "bandeau cookies obligatoire sur un site e-commerce", "comment mettre un bandeau cookies sur un site wordpress", "outil de statistiques de site sans cookies", "bandeau cookies google maps intégré", "bandeau cookies conforme"]
sources: ["https://www.cnil.fr", "https://www.legifrance.gouv.fr"]
---

**Un bandeau cookies est obligatoire dès que votre site dépose ou lit sur l'appareil du visiteur un traceur qui n'est pas strictement nécessaire au service demandé : statistiques non exemptées, publicité, vidéo ou carte tierce, bouton de réseau social.** Un site vitrine qui n'utilise que des cookies techniques, sans contenu tiers ni statistiques soumises à consentement, n'a pas besoin de bandeau.

Cet article reprend l'état des règles tel que publié par la CNIL. Elles évoluent : vérifiez la version à jour sur [cnil.fr](https://www.cnil.fr).

## Un bandeau cookies est-il obligatoire sur un site vitrine

La réponse tient à une question : **que fait réellement votre site sur l'appareil du visiteur ?** Le bandeau n'est pas une obligation en soi. L'obligation porte sur le **consentement** préalable pour les traceurs (cookies et technologies similaires) qui ne sont pas indispensables. Le droit s'appuie sur la directive européenne dite « ePrivacy », transposée en droit français dans la loi Informatique et Libertés, et sur le RGPD pour la définition du consentement.

Deux catégories se distinguent.

**Traceurs exemptés de consentement.** Ils servent uniquement :

- à faire fonctionner le service demandé : panier d'achat, session d'un espace client, identification de l'utilisateur, équilibrage de charge ;
- à retenir un choix de l'utilisateur, comme la langue, quand c'est lui qui l'a fait ;
- à la sécurité (protection contre les attaques, détection de fraude) ;
- à une **mesure d'audience** strictement limitée, qui respecte les conditions fixées par la CNIL.

**Traceurs soumis à consentement.** Tous les autres : publicité et ciblage, outils d'analyse qui croisent les données ou les réutilisent à d'autres fins, partage sur les réseaux sociaux, contenus embarqués d'un tiers qui lisent ou écrivent des informations (vidéo, carte, widgets), certains outils de conversation ou de test.

Conséquence pour un site vitrine : si vous avez un site statique avec un formulaire de contact, sans statistiques tierces et sans contenus embarqués, **aucun bandeau n'est nécessaire**. En revanche, il faut informer clairement sur l'usage de toute donnée collectée via le formulaire (voir [notre article sur le RGPD](/blog/rgpd-site-web-2026)) et publier une politique de confidentialité.

### Et sur un site e-commerce

Le panier, la session, la connexion à un compte et le paiement sécurisé font partie des traceurs exemptés. Un bandeau est en revanche exigé dès que s'ajoutent un outil de mesure d'audience non exempté, une régie publicitaire, un pixel de réseau social, un module d'avis ou de chat qui dépose des cookies tiers. La boutique est plus exposée qu'un site vitrine simplement parce qu'elle empile plus d'outils. Un audit de ce que le site charge, avant la mise en ligne, évite de découvrir un cookie oublié trois mois plus tard.

## Les règles d'un bandeau conforme

Quand le consentement est nécessaire, le bandeau doit respecter plusieurs règles de la CNIL :

1. **Rien ne doit être déposé avant le choix** (hors traceurs exemptés). Un bandeau qui affiche « En continuant, vous acceptez » alors que les traceurs sont déjà actifs n'est pas conforme.
2. **Refuser doit être aussi simple qu'accepter.** Un bouton « Tout refuser » doit apparaître au même niveau que « Tout accepter », avec la même visibilité. Cacher le refus dans un second écran est un manquement sanctionné par la CNIL.
3. **Un choix libre, éclairé, spécifique.** Pas de case précochée, pas de consentement « global » masqué dans l'acceptation des conditions d'utilisation. Chaque finalité doit pouvoir être acceptée ou refusée.
4. **Une information claire** sur les finalités, l'identité des responsables des traceurs, et la possibilité de retirer son consentement à tout moment.
5. **Un retrait aussi facile que le consentement** : un lien « Gérer mes cookies » dans le pied de page, toujours accessible.
6. **Une conservation limitée du choix.** La CNIL recommande de redemander le consentement après six mois environ, et de ne pas réafficher le bandeau à chaque page pour un visiteur qui a refusé.
7. **Une preuve du consentement** : vous devez pouvoir démontrer qu'il a été recueilli.

Éviter le « mur de cookies » (obligation d'accepter pour accéder au site) est aussi une règle générale : ne conditionnez pas l'accès au contenu à l'acceptation, sauf cas particulier.

### Quelles sanctions

La CNIL peut contrôler, mettre en demeure puis sanctionner. Elle a déjà sanctionné de grands éditeurs pour des bandeaux qui rendaient le refus plus difficile que l'acceptation. Les petits sites sont plus souvent visés par des mises en demeure, qui demandent une mise en conformité rapide. Le risque n'est donc pas théorique, même si les sommes en jeu dépendent de chaque cas.

## Mesurer ses visites sans cookies

Vous voulez savoir combien de personnes visitent votre site sans afficher de bandeau ? C'est possible dans certaines conditions. La CNIL admet que des outils de mesure d'audience **bien configurés** puissent être exemptés de consentement, à condition notamment que :

- la mesure serve uniquement à produire des statistiques anonymes sur le site, **pour le compte de l'éditeur** ;
- les données ne soient **pas croisées** avec d'autres traitements ni transmises à des tiers qui les réutilisent ;
- les traceurs aient une **durée de vie limitée** (la CNIL cite treize mois) et les données brutes une **conservation limitée** ;
- les visiteurs soient **informés** et puissent s'opposer ;
- l'outil ne suive pas l'utilisateur d'un site à l'autre.

La CNIL a publié des critères et a indiqué que certains outils, dans une configuration précise, remplissent ces conditions. Parmi les solutions couramment citées, on trouve Matomo (configuré pour l'exemption) et des outils sobres qui ne déposent aucun cookie. Un outil gratuit des grands acteurs de la publicité, utilisé avec ses réglages par défaut, n'entre en général pas dans ce cadre. Avant de choisir, lisez la fiche de la CNIL sur la mesure d'audience, puis **vérifiez la configuration de votre outil** : le même logiciel peut être conforme ou non selon ses réglages.

Autre piste : les **journaux du serveur** (accès, erreurs) donnent déjà une idée du trafic, sans traceur sur le visiteur. Ils sont moins fins mais suffisent souvent pour un site vitrine. Pour comprendre votre visibilité, la Search Console de Google (données de recherche, sans traceur posé sur vos visiteurs) répond à beaucoup de questions.

## Une carte Google Maps intégrée : faut-il un bandeau

L'intégration d'une carte Google Maps par un `iframe` classique charge des ressources de Google et peut déposer ou lire des traceurs. Dans l'état actuel de la doctrine de la CNIL, un tel contenu embarqué relève du consentement sauf à démontrer qu'il n'utilise pas de traceur non exempté. Trois solutions concrètes :

1. **Charger la carte au clic.** Le visiteur voit une image statique avec « Afficher la carte (Google Maps) » : la requête vers Google n'est faite qu'après son action, avec l'information sur ce que cela implique.
2. **Remplacer la carte par un simple lien** « Voir l'itinéraire » qui ouvre Maps dans un nouvel onglet. C'est la version la plus sobre.
3. **Utiliser une carte qui ne dépose pas de traceur**, ou une image statique de la carte avec l'adresse en texte.

La même logique vaut pour une vidéo embarquée, un bouton de partage, un fil de réseau social. La solution du clic de confirmation est la plus propre : le contenu reste accessible, la personne décide. Elle est aussi la plus simple à mettre en place dans un [site sur mesure](/services/creation-de-site-internet), puisqu'aucun script tiers n'est chargé avant le choix. Pour l'intégration d'une carte en lien avec votre référencement local, voyez [Google Maps sur votre site](/blog/google-maps-integration-site).

## Mettre un bandeau cookies sur Wix, WordPress ou un site sur mesure

### Sur Wix

Wix propose dans les réglages du site un module de bandeau de consentement aux cookies, à activer, personnaliser et relier aux applications installées. Vérifiez que le bouton de refus est aussi visible que celui d'acceptation, que les applications tierces (statistiques, chat, pixel) respectent bien le choix, et que le lien de gestion des cookies est dans le pied de page. Consultez l'aide de Wix pour la procédure à jour.

### Sur WordPress

Le plus fréquent est d'utiliser une extension de gestion du consentement. Un bandeau gratuit conforme est possible, mais vérifiez avant l'installation :

- le bouton « Tout refuser » est-il disponible dès le premier niveau ?
- l'extension **bloque-t-elle réellement** les scripts avant consentement, ou se contente-t-elle d'afficher une bannière ?
- permet-elle de **consigner les choix** ?
- est-elle **maintenue** et compatible avec votre version de WordPress ?
- est-elle gratuite pour votre usage ? Certaines versions gratuites sont limitées.

Après installation, testez avec les outils de développement du navigateur : ouvrez l'onglet « Application » (ou « Stockage »), rechargez la page **sans avoir cliqué**, et regardez les cookies présents. S'il y en a d'autres que les cookies techniques, le bandeau ne bloque pas ce qu'il devrait.

### Sur un site sur mesure

Pour un site fait à la main, la méthode la plus fiable reste de ne rien charger qui nécessite un bandeau : pas de statistiques tierces, pas de contenus embarqués avant clic, polices et images servies par le site. Le bandeau n'est alors plus nécessaire, ou limité à un seul outil activé volontairement. Cette sobriété a un second avantage : un site plus rapide, avec moins d'intermédiaires. C'est l'approche que nous privilégions ; si vous partez d'un site existant, un [audit](/outils/audit-site) permet de voir ce qu'il charge avant de décider quoi garder.

## La politique de cookies et les mentions

Même sans bandeau, publiez :

- une **politique de confidentialité** qui décrit les données collectées (formulaire de contact, devis), leur durée de conservation, vos coordonnées et les droits des personnes ;
- une page ou une section « cookies » si vous utilisez des traceurs, qui liste leur nom, leur finalité et leur durée ;
- vos **mentions légales**. Notre [générateur de mentions légales](/outils/generateur-mentions-legales) vous aide à les rédiger.

Pour un récapitulatif plus large des obligations de votre site, lisez [le RGPD et votre site en 2026](/blog/rgpd-site-web-2026).

## Questions fréquentes

**Le bandeau cookies protège-t-il vraiment mon site d'une sanction ?**
Non, s'il est mal configuré. Un bandeau décoratif qui laisse les traceurs actifs avant le choix, ou qui rend le refus plus difficile que l'acceptation, ne vous met pas en règle. Ce qui compte, c'est ce que le site fait réellement.

**Les cookies de session de mon espace client demandent-ils un consentement ?**
En principe non : un traceur indispensable au fonctionnement d'un service que l'utilisateur demande est exempté. Informez-en tout de même dans votre politique de confidentialité.

**Si je ne mets qu'un lien vers Facebook ou Instagram, ai-je besoin d'un bandeau ?**
Un simple lien sortant ne dépose rien sur votre site. C'est le widget intégré (bouton « J'aime », fil de publications) qui charge des traceurs. Un lien est donc plus sobre qu'un module.

**Combien de temps le choix du visiteur doit-il être conservé ?**
La CNIL recommande une durée limitée, d'environ six mois, avant de redemander. Dans l'intervalle, ne réaffichez pas le bandeau à chaque visite.

**Mon site est-il concerné si je n'ai que des visiteurs en France ?**
Oui : la règle vise l'éditeur du site, et vous êtes établi en France. Le nombre de visiteurs ou leur origine ne change pas l'obligation de recueillir un consentement quand il est nécessaire. Pour parler de votre cas, écrivez-nous via la [page contact](/contact).
