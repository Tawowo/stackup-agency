---
title: "Nom de domaine : choisir, acheter, renouveler, transférer"
seoTitle: "Nom de domaine : choisir, acheter, renouveler, DNS"
excerpt: "Choisir et acheter son nom de domaine, le renouveler, le transférer, comprendre le DNS et créer une adresse e-mail pro, sans perdre la main sur le vôtre."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 11
tag: "Technique"
category: "technique"
type: "guide"
keywords: ["comment choisir son nom de domaine", "acheter un nom de domaine", "c'est quoi le dns", "comment créer une adresse mail avec mon nom de domaine", "mon prestataire a acheté mon nom de domaine à son nom", "gandi ou ovh nom de domaine"]
sources: ["https://www.afnic.fr", "https://www.service-public.fr", "https://www.cnil.fr"]
---

**Un nom de domaine s'achète chez un bureau d'enregistrement (registrar), s'enregistre à votre nom pour une durée d'un an ou plus, et se renouvelle avant l'échéance sous peine de le perdre.** Le plus important n'est pas le prix, mais d'être le titulaire du domaine, d'avoir accès au compte du registrar et de savoir ce que contient sa configuration DNS (le site, la messagerie, les vérifications).

Ce guide ne refait pas la réflexion sur le choix du nom lui-même, traitée dans [Choisir son nom de domaine : guide complet](/blog/nom-de-domaine-choisir). Il couvre ce qui vient après : acheter, configurer, renouveler, transférer, récupérer un domaine mal enregistré, et créer vos adresses e-mail.

## Comment choisir son nom de domaine, en quelques critères ?

Quelques repères suffisent pour décider vite.

- **Court et facile à dicter au téléphone.** Si vous devez épeler, il est trop compliqué. Évitez les traits d'union et les doubles lettres ambiguës.
- **Proche de votre nom commercial.** C'est ce que les clients tapent en premier. Pour un artisan, le nom de l'entreprise suffit généralement ; ajouter le métier ou la ville est utile quand le nom est très courant.
- **Une extension cohérente.** Le .fr rassure une clientèle française ; le .com est reconnu partout. Vous pouvez réserver les deux et faire pointer l'un vers l'autre.
- **Libre de droits.** Vérifiez que le nom n'est pas une marque déposée d'un tiers (base de l'INPI) et qu'il est disponible sur les réseaux sociaux qui vous importent.
- **Stable.** Si vous pensez changer de nom commercial dans l'année, attendez. Un domaine peut en revanche rester en redirection longtemps.

## Acheter ou réserver un nom de domaine pour son entreprise : comment faire ?

La démarche est identique pour un .com et un .fr.

1. **Cherchez la disponibilité** sur le site d'un registrar. Si le nom est pris, essayez une variante plutôt qu'une extension exotique.
2. **Choisissez la durée** : un an est suffisant pour commencer, plusieurs années réduisent le risque d'oubli.
3. **Renseignez le titulaire** : c'est votre identité, ou celle de votre société. C'est le point le plus important, il fixe qui détient le droit.
4. **Gardez vos identifiants** et activez la double authentification sur le compte.
5. **Activez le renouvellement automatique**, avec une carte valide et une adresse e-mail que vous consultez.

Sur la protection des données personnelles du titulaire, certains registrars masquent vos coordonnées dans la base publique des noms de domaine ; l'AFNIC, qui gère le .fr, a ses propres règles d'affichage. Renseignez-vous sur la page du registrar.

## Gandi ou OVH : quel registrar choisir ?

Gandi et OVHcloud sont deux acteurs français très connus. Un registrar se juge sur des critères que vous pouvez vérifier :

- **Le prix total sur plusieurs années**, y compris le tarif de renouvellement, souvent différent du tarif promotionnel de la première année.
- **L'interface DNS** : lisible, avec la possibilité de modifier chaque enregistrement et de sauvegarder la zone.
- **La sécurité du compte** : double authentification, verrouillage du transfert.
- **Le support** et sa langue.
- **Les options incluses** : redirection d'e-mail, boîtes de messagerie, certificat.
- **La facilité à partir** : l'export de la configuration et le code de transfert doivent être simples à obtenir.

Comparer deux registrars, c'est comparer ces six lignes, pas des slogans. Si votre site est hébergé ailleurs, l'hébergeur et le registrar peuvent être deux sociétés différentes, c'est même conseillé : si l'un pose problème, vous gardez l'autre. Pour l'hébergement, voyez [Quel hébergement choisir pour son site web](/blog/quel-hebergement-choisir-site-web).

## C'est quoi le DNS, et qu'est-ce qu'une zone DNS ?

Le DNS (Domain Name System) est l'annuaire d'internet : il traduit un nom lisible (`votre-entreprise.fr`) en adresse que les machines comprennent. La **zone DNS** de votre domaine est la liste de ses entrées, appelées enregistrements. Les principaux :

| Enregistrement | Rôle |
|---|---|
| A / AAAA | Relie votre domaine à l'adresse du serveur qui héberge le site |
| CNAME | Fait pointer un nom (par exemple `www`) vers un autre nom |
| MX | Indique où arrivent vos e-mails |
| TXT | Contient des vérifications et des règles : SPF, DKIM, DMARC, preuve de propriété d'un service |
| NS | Désigne les serveurs de noms qui gèrent la zone |

La zone est un document sensible : si vous supprimez un enregistrement MX, vos e-mails n'arrivent plus ; si vous supprimez le A ou le CNAME, le site disparaît. D'où le conseil de copier la zone avant toute modification.

## Comment changer les serveurs DNS de son domaine, et est-ce que cela coupe mes mails ?

Changer les **serveurs de noms** (NS) déplace toute la gestion de la zone vers un autre fournisseur. Ce qu'il faut savoir :

1. **Copiez d'abord la zone actuelle** (capture ou export), en particulier les enregistrements MX et TXT.
2. **Recréez ces enregistrements** dans la nouvelle zone avant de changer les NS.
3. **Changez les NS** chez le registrar.
4. **Attendez la propagation** et testez le site et la messagerie.

Si vous omettez l'étape 2, oui, vos e-mails peuvent s'interrompre, parce que la nouvelle zone ne sait pas où les livrer. À l'inverse, changer seulement un enregistrement A ou CNAME pour pointer le site vers un nouvel hébergeur ne touche pas à la messagerie, tant que les MX restent en place. C'est souvent l'option la plus sûre.

## Comment configurer le DNS pour un nouveau site ou pour Vercel ?

Un hébergeur ou une plateforme vous indique les enregistrements à créer pour y relier votre domaine. En général :

- un enregistrement **A** (ou ALIAS) pour le domaine sans `www` ;
- un enregistrement **CNAME** pour `www` ;
- parfois un enregistrement **TXT** pour prouver que vous êtes le propriétaire.

Pour Vercel, comme pour d'autres plateformes, ajoutez d'abord le domaine dans le projet : l'interface affiche les valeurs exactes à saisir chez votre registrar. Recopiez-les telles quelles, ne gardez pas d'anciens enregistrements A en doublon, et attendez la validation indiquée par la plateforme. Un certificat HTTPS est ensuite généré automatiquement dans la plupart des cas.

Pour un site créé avec Wix, le principe est le même, avec deux voies : **pointer** (modifier les enregistrements A et CNAME chez votre registrar) ou **transférer** le domaine chez Wix. Un domaine acheté ailleurs fonctionne très bien avec Wix : suivez les instructions de l'éditeur, et gardez l'accès à votre compte registrar.

## Comment vérifier la propagation DNS, et savoir si mes DNS sont corrects ?

Après une modification, il faut un délai pour que le monde entier voie la nouvelle valeur : de quelques minutes à plusieurs heures, parfois plus selon la durée de vie (TTL) des anciens enregistrements. Pendant ce temps, vos visiteurs peuvent voir l'ancienne ou la nouvelle version.

Pour vérifier :

- Utilisez un **outil de vérification DNS en ligne** : il interroge plusieurs serveurs dans le monde et montre ce qu'ils voient.
- Sur ordinateur, les commandes `nslookup` (Windows) ou `dig` (Mac, Linux) renvoient les enregistrements, par exemple `dig votre-entreprise.fr MX`.
- Comparez avec ce que votre hébergeur ou votre messagerie annonce : ils affichent les valeurs attendues.
- Vérifiez trois choses : le site s'ouvre en `https://` avec et sans `www`, les e-mails arrivent et partent, et aucun ancien enregistrement ne reste en doublon.

Si ça ne change pas après un jour, relisez l'enregistrement : une faute de frappe est la cause la plus courante.

## Comment sécuriser son DNS et son nom de domaine ?

Un domaine détourné fait perdre le site et la messagerie, et peut servir à des escroqueries. Les protections les plus utiles :

- **Double authentification** sur le compte du registrar, et un mot de passe unique.
- **Verrouillage du domaine** (transfert verrouillé), pour empêcher un transfert non voulu.
- **Adresse de contact du titulaire à jour**, que vous consultez : c'est là que partent les alertes d'expiration et de transfert.
- **Renouvellement automatique** ou rappel dans l'agenda.
- **DNSSEC**, option proposée par beaucoup de registrars, qui signe les réponses DNS pour réduire les falsifications. Activez-le avec l'aide de votre prestataire, car une erreur peut rendre le site injoignable.
- **Peu de personnes avec un accès**, et des accès nominatifs plutôt qu'un compte partagé.

## Comment renouveler son nom de domaine sans le perdre ?

Un nom de domaine est loué pour une durée, pas acheté pour toujours. Si vous ne renouvelez pas, il passe en période d'expiration, puis peut être libéré et racheté par quelqu'un d'autre. Les règles de délai varient selon l'extension et le registrar.

Pour ne pas le perdre :

- vérifiez la **date d'échéance** dans votre compte registrar ;
- activez le **renouvellement automatique** et vérifiez la carte bancaire enregistrée ;
- notez un rappel annuel dans votre agenda ;
- renouvelez pour plusieurs années si votre budget le permet ;
- ne laissez pas la facture partir sur l'adresse e-mail d'une personne qui a quitté l'entreprise.

Un domaine qui expire fait tomber le site et la messagerie en même temps, d'un coup.

## Comment transférer son nom de domaine vers un autre registrar ?

Le transfert se fait entre deux registrars, sans changer de titulaire. La marche type :

1. **Copiez la zone DNS** actuelle.
2. **Déverrouillez** le domaine chez l'ancien registrar.
3. **Demandez le code de transfert** (code d'autorisation), envoyé à l'adresse du titulaire.
4. **Lancez le transfert** chez le nouveau registrar avec ce code.
5. **Validez** les e-mails de confirmation éventuels.
6. **Recréez ou importez la zone**, et testez site et messagerie.

Certains registrars ajoutent une année à la durée du domaine au moment du transfert ; d'autres imposent un délai après l'achat ou après un transfert récent. Pour un .fr, l'AFNIC publie les règles : lisez-les avant de commencer. Évitez de transférer à quelques jours de l'échéance.

## Mon prestataire a acheté mon nom de domaine à son nom : que faire ?

C'est fréquent, et ce n'est pas toujours de la mauvaise foi : certains prestataires enregistrent le domaine pour aller vite. Mais c'est lui, et non vous, qui est alors titulaire. Si la relation se dégrade, vous risquez de ne plus contrôler votre adresse.

Marche à suivre :

1. **Vérifiez le titulaire** dans la base publique des noms de domaine (ou demandez-le au registrar).
2. **Relisez le devis ou le contrat** : prévoit-il la propriété du domaine ?
3. **Demandez par écrit** le transfert ou le changement de titulaire à votre nom, avec le code de transfert.
4. **Gardez les preuves** de paiement du domaine, de la commande et des échanges.
5. **Si le prestataire refuse ou ne répond plus**, contactez le registrar, et pour un .fr, l'AFNIC, qui propose des procédures de résolution des litiges. Un professionnel du droit peut vous conseiller.

Pour éviter le problème : exigez que le domaine soit enregistré à votre nom dès le devis, que vous ayez l'accès au compte et que les identifiants vous soient remis à la livraison. Voyez aussi [Maintenance de site web](/blog/maintenance-site-web-guide), qui traite des accès à conserver, et la page [création de site internet](/services/creation-de-site-internet).

## Quelle est la différence entre une adresse e-mail et un nom de domaine ?

Le nom de domaine est ce qui suit le `@` : `votre-entreprise.fr`. L'adresse e-mail est l'identifiant complet : `contact@votre-entreprise.fr`. Avoir un domaine ne crée pas de boîte de réception par défaut : il faut un service de messagerie qui gère des boîtes pour ce domaine, relié par les enregistrements MX.

## Comment créer une adresse e-mail avec mon nom de domaine ?

1. **Choisissez un service de messagerie** : celui de votre registrar ou de votre hébergeur, ou un service professionnel payant (suites bureautiques en ligne, par exemple).
2. **Créez la boîte** (`contact@`, `prenom@`).
3. **Ajoutez les enregistrements MX** donnés par le service.
4. **Ajoutez les enregistrements TXT** (SPF, DKIM, DMARC) qui indiquent aux messageries de vos destinataires que vos e-mails sont légitimes. Sans eux, vos messages risquent d'atterrir dans les courriers indésirables.
5. **Configurez la boîte** sur votre téléphone et votre ordinateur.

**Une adresse professionnelle gratuite avec son nom de domaine existe-t-elle ?** Une boîte complète est rarement gratuite à vie. En revanche, beaucoup de registrars proposent la **redirection** : `contact@votre-entreprise.fr` renvoie vers votre adresse personnelle. C'est utile pour démarrer, mais répondre depuis l'adresse professionnelle demande un réglage supplémentaire.

**Combien coûte une messagerie professionnelle ?** Elle est généralement facturée par boîte et par mois, avec des écarts selon le service et la capacité de stockage. Comparez sur un an et sur le nombre de boîtes dont vous avez vraiment besoin.

Pour vous faire accompagner sur ces réglages, [contactez Mathéo](/contact) : la configuration du domaine et de la messagerie fait partie de ce qui se prévoit au lancement d'un site, ainsi que l'[estimation de votre projet](/tarifs).

## Questions fréquentes

**Peut-on avoir plusieurs noms de domaine pour le même site ?**
Oui. Un domaine principal reçoit le site, les autres redirigent vers lui. Cela évite que quelqu'un utilise une variante de votre nom.

**Que se passe-t-il si mon domaine expire alors que mon site est en ligne ?**
Le site et les e-mails cessent de fonctionner. Selon l'extension, une période de rattrapage permet de renouveler, mais ce n'est pas garanti ni gratuit.

**Peut-on garder son domaine en changeant d'hébergeur ?**
Oui : le domaine et l'hébergement sont indépendants. Il suffit de modifier les enregistrements DNS pour pointer vers le nouvel hébergeur.

**Faut-il déposer son nom de domaine comme marque ?**
Le domaine n'est pas une marque : il se réserve auprès d'un registrar, la marque se dépose à l'INPI. Si votre nom commercial est important, renseignez-vous sur la protection par marque.

**Un nom de domaine avec le nom de ma ville améliore-t-il le référencement ?**
Pas de façon décisive. Les contenus, la fiche Google et les liens comptent davantage ; choisissez un domaine lisible avant tout.
