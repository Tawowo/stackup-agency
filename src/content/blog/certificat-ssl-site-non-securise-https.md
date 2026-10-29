---
title: "Site « non sécurisé » : certificat SSL et HTTPS"
seoTitle: "Site « non sécurisé » : réparer son certificat SSL"
excerpt: "Cadenas barré, « non sécurisé », certificat expiré : pourquoi ça arrive, comment le réparer, qui peut le faire et comment éviter que ça revienne."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 8
tag: "Technique"
category: "technique"
type: "question"
keywords: ["site non sécurisé", "certificat ssl expiré", "passer son site en https", "renouveler certificat ssl", "cadenas barré", "certificat ssl gratuit ou payant"]
sources: ["https://www.cnil.fr", "https://support.google.com/webmasters"]
---

**Quand votre site affiche « non sécurisé » ou un cadenas barré, c'est que le certificat SSL manque, a expiré ou est mal configuré : le navigateur prévient vos visiteurs avant même qu'ils lisent votre page.** Dans la plupart des cas, c'est réparable rapidement, et le certificat lui-même est aujourd'hui gratuit chez la plupart des hébergeurs.

## Pourquoi mon site est-il marqué « non sécurisé » ?

Votre navigateur compare l'adresse de votre site avec un document appelé **certificat SSL** (ou TLS). Ce certificat prouve que le site est bien celui qu'il prétend être et permet de chiffrer les échanges. Le protocole qui s'appuie dessus s'appelle **HTTPS**. Vous reconnaissez un site en HTTPS à l'adresse qui commence par « https:// » et au cadenas. Les termes sont définis dans le lexique : [certificat SSL](/lexique/certificat-ssl) et [HTTPS](/lexique/https).

L'avertissement apparaît dans quatre cas principaux.

**1. Le site n'est pas du tout en HTTPS.** L'adresse commence par « http:// ». C'est le cas d'un vieux site jamais mis à jour ou d'un hébergement qui n'a jamais activé le certificat.

**2. Le certificat a expiré.** Un certificat a une date de fin. Si le renouvellement automatique a échoué (carte bancaire expirée, domaine mal configuré, hébergeur changé), le navigateur affiche une page d'alerte rouge, parfois bloquante.

**3. Le certificat ne correspond pas à l'adresse.** Il a été émis pour « monsite.fr » mais votre site est aussi accessible via « www.monsite.fr », ou l'inverse.

**4. Le contenu est mixte.** La page est bien en HTTPS, mais une image, un script ou une police est encore chargé en HTTP. Le cadenas apparaît barré ou avec un avertissement. C'est très courant après une migration.

## Mon site affiche « non sécurisé » : que faire, dans l'ordre ?

1. **Regardez le message exact.** Cliquez sur l'icône à gauche de l'adresse : le navigateur indique si le certificat est expiré, invalide, ou si la connexion n'est tout simplement pas chiffrée.
2. **Vérifiez la date d'expiration.** Dans le même menu, la rubrique « certificat » donne la date de validité. Un certificat périmé explique à lui seul le blocage.
3. **Connectez-vous à l'espace de votre hébergeur.** Cherchez une rubrique « SSL », « HTTPS » ou « Sécurité ». La plupart des hébergeurs permettent d'activer ou de renouveler un certificat en quelques clics.
4. **Activez la redirection de HTTP vers HTTPS**, pour que toutes les anciennes adresses mènent à la version sécurisée.
5. **Contrôlez les contenus mixtes**, si le cadenas reste barré. Avec WordPress, une extension de remplacement d'adresses ou une recherche dans la base de données règle généralement le problème ; sur un site sur mesure, il faut corriger les liens dans le code.
6. **Videz le cache** de votre navigateur, de votre site et de votre CDN s'il y en a un, puis testez sur mobile et sur un autre navigateur.

Si rien ne fonctionne, ou si vous n'avez plus accès à l'hébergeur, passez à la section « Qui peut me réparer mon certificat ? » plus bas. Pour retrouver un accès perdu, voir [retrouver les identifiants de son hébergeur](/blog/retrouver-acces-site-identifiants-hebergeur).

## Faut-il payer pour un certificat SSL ? Gratuit ou payant : quelle différence ?

**Pour un site de petite entreprise, le certificat gratuit suffit.** Des autorités de certification proposent des certificats gratuits (Let's Encrypt est la plus connue) et la plupart des hébergeurs les installent et les renouvellent automatiquement. Le niveau de chiffrement est le même.

Les certificats payants existent pour d'autres besoins :

- une **validation renforcée de l'organisation** (le navigateur affiche la même icône, mais le certificat contient des informations sur l'entreprise vérifiée) ;
- un **certificat couvrant de nombreux sous-domaines** ou plusieurs sites ;
- une **assurance** ou un service d'assistance inclus ;
- des exigences particulières d'un client ou d'un secteur réglementé.

Le prix ne change pas la force du chiffrement. Si un prestataire vous facture le certificat, demandez ce qu'il apporte de plus que la version gratuite. Un surcoût peut se justifier (installation, supervision), mais il doit être expliqué.

## Comment installer un certificat SSL sur son site ?

Tout dépend de votre situation.

**Sur un hébergement mutualisé classique.** Dans l'espace client, activez le certificat gratuit proposé et cochez l'option de redirection HTTPS. Le certificat est généralement actif en quelques minutes.

**Sur un créateur de site (Wix, Squarespace, Shopify, etc.).** Le certificat est inclus et se gère tout seul tant que votre domaine est correctement connecté. En cas de problème, vérifiez les enregistrements DNS du domaine ([DNS](/lexique/dns)) et contactez le support de la plateforme.

**Sur WordPress.** Activez le certificat chez l'hébergeur, puis modifiez les adresses du site dans les réglages pour qu'elles commencent par https. Contrôlez ensuite les contenus mixtes.

**Sur un serveur dédié ou un site sur mesure.** Le certificat s'installe côté serveur, avec un outil de gestion automatique qui obtient et renouvelle les certificats. C'est un travail d'administration à confier à la personne qui gère le serveur.

Pour passer un site entier de HTTP à HTTPS **sans perdre son référencement**, il faut aussi : rediriger chaque ancienne adresse vers la nouvelle, mettre à jour le plan du site, déclarer la version HTTPS dans la Search Console et corriger les liens internes. Les principes sont les mêmes que pour une migration ; voir [rediriger sans perdre son SEO](/blog/refonte-site-web-seo-redirections-301).

## Comment renouveler automatiquement un certificat, et pourquoi il ne se renouvelle pas

Les certificats gratuits ont une validité courte, justement pour que le renouvellement soit automatique. Quand il échoue, les causes les plus fréquentes sont :

- **Le domaine ne pointe plus vers le bon hébergement** : l'outil vérifie que vous contrôlez l'adresse, et le DNS a changé.
- **Une redirection ou un pare-feu bloque la vérification.**
- **Le compte d'hébergement est suspendu** pour impayé.
- **Le renouvellement automatique a été désactivé** lors d'une migration.
- **Un certificat manuel** a été installé un jour et personne ne l'a renouvelé.

Pour connaître la date d'expiration, ouvrez le détail du certificat dans le navigateur et notez-la dans votre agenda. Un contrat de [maintenance](/services/maintenance) inclut généralement cette surveillance ; voir aussi le [guide de la maintenance d'un site](/blog/maintenance-site-web-guide).

## Mon certificat est expiré, mon site est bloqué : comment le renouveler ?

Restez calme : un certificat expiré n'a rien détruit, il bloque seulement l'accès « confortable » au site. Vos fichiers et vos données sont intacts.

- **Hébergement classique** : connectez-vous, ouvrez la section SSL, relancez le renouvellement ou installez un nouveau certificat gratuit.
- **Plateforme de création de site** : vérifiez le domaine, l'abonnement et les enregistrements DNS, puis demandez au support de relancer l'émission.
- **Certificat acheté** : renouvelez chez le vendeur, puis réinstallez le fichier sur l'hébergement.
- **Aucun accès** : contactez la personne qui a créé le site, puis l'hébergeur avec une preuve que vous êtes le titulaire du domaine.

Une fois le problème résolu, videz le cache et vérifiez que le site s'affiche correctement sur plusieurs appareils. Pendant l'incident, une publication sur votre fiche Google Business Profile ou vos réseaux avec le numéro de téléphone évite de perdre des demandes.

## Pourquoi un site sans HTTPS fait-il fuir les clients ?

Parce que le navigateur le dit lui-même : « Non sécurisé » s'affiche avant même que la page soit lue. Une personne qui hésite entre deux entreprises choisira celle qui n'affiche pas d'alerte. Et dès que votre site contient un formulaire (contact, devis, réservation), le chiffrement protège les données saisies. Côté référencement, le HTTPS est un signal léger ; voir [SSL et HTTPS pour votre site](/blog/ssl-https-site-web).

## Le certificat SSL est-il obligatoire pour une boutique en ligne ?

Pour une boutique, **c'est indispensable en pratique**. Les prestataires de paiement exigent une connexion sécurisée, les navigateurs alertent sur toute page de formulaire non chiffrée, et la protection des données personnelles suppose des mesures de sécurité adaptées ; les recommandations de la [CNIL](https://www.cnil.fr) vont dans ce sens. Un site marchand en HTTP ne sera tout simplement pas accepté par la plupart des solutions de paiement. Pour la mise en place d'une boutique, voir notre page [site e-commerce](/services/site-ecommerce).

Le certificat ne suffit toutefois pas à sécuriser une boutique : mises à jour, sauvegardes, mots de passe solides, extensions à jour et paiement délégué à un prestataire font aussi partie du travail.

## Qui peut me réparer mon certificat SSL ?

Par ordre de simplicité :

1. **Votre hébergeur**, via son support, si le certificat est géré chez lui.
2. **La personne ou l'agence qui a créé le site**, si elle gère encore l'hébergement.
3. **Un prestataire de maintenance** qui intervient sur les sites existants ; voir le service [maintenance](/services/maintenance).
4. **Vous-même**, si le tableau de bord de l'hébergeur propose l'activation en quelques clics.

Préparez ces informations avant d'appeler : l'adresse exacte du site, le message affiché, la date de votre dernière modification du site, le nom de l'hébergeur. Cela accélère le diagnostic. Si vous voulez qu'on regarde l'état de votre site, l'[audit de site](/outils/audit-site) signale les problèmes de sécurité visibles, et on peut aussi vous répondre via la [page contact](/contact).

## Rien à voir avec le SSL : la certification NF525 des caisses

Une question proche revient souvent : « c'est quoi la certification NF525 ? ». Elle ne concerne pas les sites web mais les **logiciels et systèmes de caisse** utilisés par les commerçants. Elle atteste que le logiciel respecte des exigences d'inaltérabilité, de sécurisation, de conservation et d'archivage des données de vente, dans le cadre de la lutte contre la fraude à la TVA. Les règles exactes, les assujettis et les justificatifs acceptés (certificat ou attestation) sont précisés sur [impots.gouv.fr](https://www.impots.gouv.fr). Si vous cherchez une caisse sur mesure, voir [gestion de caisse sur mesure](/blog/gestion-caisse-sur-mesure).

## Questions fréquentes

**Mon site est en HTTPS mais le cadenas est barré, pourquoi ?**
La page charge au moins un élément en HTTP (image, script, police) : c'est un contenu mixte. Corrigez les adresses concernées pour qu'elles commencent par https.

**Un certificat SSL protège-t-il mon site des pirates ?**
Non, il protège la transmission entre le visiteur et le serveur, pas le site lui-même. Les mises à jour, les sauvegardes et les mots de passe forts restent nécessaires.

**Le certificat SSL est-il valable pour tous mes sous-domaines ?**
Pas forcément : un certificat classique couvre une adresse précise, un certificat « wildcard » couvre tous les sous-domaines d'un domaine. Vérifiez ce qu'il couvre.

**Dois-je réindexer mon site après le passage en HTTPS ?**
Il faut déclarer la version HTTPS dans la Search Console, rediriger les anciennes adresses et mettre à jour le plan du site ; Google se charge ensuite de remplacer les anciennes adresses dans ses résultats.
