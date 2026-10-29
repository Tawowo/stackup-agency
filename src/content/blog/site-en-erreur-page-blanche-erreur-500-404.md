---
title: "Site en erreur (500, 404, page blanche) : causes et solutions"
seoTitle: "Site en erreur 500, 404, page blanche : que faire ?"
excerpt: "Erreur 500, 404, page blanche ou site inaccessible : les causes les plus fréquentes, les vérifications à faire vous-même et qui contacter en priorité."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 9
tag: "Technique"
category: "technique"
type: "question"
keywords: ["mon site affiche une erreur 500 que faire", "c'est quoi une erreur 404", "mon site affiche une page blanche que faire", "pourquoi mon site ne s'affiche plus", "que faire quand son site internet tombe en panne", "que faire si mon prestataire web ne répond plus"]
---

**Un site qui affiche une erreur 500, une page blanche ou qui ne s'affiche plus a presque toujours une cause identifiable : une extension ou une mise à jour fautive, un hébergement saturé ou suspendu, un nom de domaine expiré ou une mauvaise configuration.** Commencez par vérifier si le problème vient de chez vous (cache, connexion), puis contactez l'hébergeur ou le prestataire qui gère le site avec le message d'erreur exact et l'heure du problème.

## Pourquoi mon site ne s'affiche plus ? Les trois vérifications de départ

Avant de chercher une panne compliquée, éliminez les causes simples.

1. **Testez depuis un autre appareil et un autre réseau** (le téléphone en 4G, par exemple). Si le site s'ouvre là, le problème vient de votre navigateur ou de votre connexion. Videz le cache, ou ouvrez le site en navigation privée.
2. **Notez le message exact** : un code (404, 500, 503), une phrase (« Index of », « Site en cours de construction », « Connexion non sécurisée »), ou une page entièrement blanche. Faites une capture d'écran avec l'heure.
3. **Vérifiez le nom de domaine.** S'il a expiré, tout disparaît d'un coup : site, e-mails, formulaires. Regardez le courrier du gestionnaire de votre domaine (le bureau d'enregistrement) pour une alerte de renouvellement.

Ces gestes orientent le diagnostic et donnent à votre interlocuteur une description utilisable.

## C'est quoi une erreur 404 et comment la corriger sur un site ?

Une **erreur 404** signifie que le serveur fonctionne mais que la page demandée n'existe pas (ou plus) à cette adresse. Le site, lui, n'est pas en panne : seule cette adresse ne mène nulle part.

Les causes habituelles : une page supprimée ou renommée, un lien mal écrit sur votre site ou sur un site tiers, une adresse modifiée lors d'une refonte sans redirection, une faute de frappe du visiteur.

Pour corriger : **rétablir la page** si elle a été supprimée par erreur, **poser une redirection permanente** (dite 301) vers la page équivalente, **corriger le lien fautif** là où vous le contrôlez, et **prévoir une page 404 utile** (menu, téléphone) plutôt qu'un message sec.

Quelques erreurs 404 isolées n'ont rien de dramatique. Un grand nombre, surtout après une refonte, fait perdre des visiteurs et du référencement : la méthode de détection et de traitement est détaillée dans [Erreurs 404 et SEO](/blog/erreurs-404-seo-guide).

## Mon site affiche une erreur 500 : que faire ?

Une **erreur 500** (« Internal Server Error ») indique que le serveur a rencontré un problème en traitant la demande, sans pouvoir dire lequel à l'écran. C'est un message générique ; la vraie cause se lit dans le journal d'erreurs de l'hébergement.

Les causes fréquentes :

- une **extension ou un thème** incompatible, souvent après une mise à jour ;
- une erreur dans un fichier de configuration du site ;
- une **limite de mémoire ou de ressources** dépassée sur l'hébergement ;
- une **version de PHP** incompatible avec le site (changée par l'hébergeur ou par vous) ;
- un fichier corrompu après un transfert ou une mise à jour interrompue.

La démarche à suivre : si vous venez de faire une modification (mise à jour, nouvelle extension, changement de version PHP), annulez-la ou désactivez ce qui a été ajouté. Sinon, ouvrez un ticket chez l'hébergeur en lui transmettant l'heure, l'adresse concernée et la dernière action menée. Le journal d'erreurs, accessible depuis l'espace d'administration de l'hébergement (souvent une interface de type cPanel, c'est-à-dire le panneau de gestion de votre hébergement), indique en général le fichier fautif.

Sur une boutique (PrestaShop, WooCommerce ou autre), la cause est de même nature, mais chaque minute d'arrêt peut coûter une commande : une sauvegarde récente est votre meilleure assurance.

## Mon site affiche une page blanche : que faire ?

La page blanche (parfois appelée « écran blanc de la mort » sous WordPress) a généralement la même famille de causes que l'erreur 500, mais le serveur n'a même pas affiché de message. En pratique, c'est presque toujours une erreur de programme qui interrompt la construction de la page.

Dans l'ordre :

1. **Annulez la dernière modification** (extension activée, thème changé, mise à jour lancée).
2. **Désactivez les extensions** une par une, ou toutes d'un coup en renommant leur dossier depuis l'hébergement, pour repérer la fautive. À défaut d'habitude, confiez-le à la personne qui gère le site.
3. **Vérifiez la version de PHP** dans l'espace d'hébergement et revenez à la précédente si elle a changé.
4. **Regardez le journal d'erreurs**, qui indique le fichier en cause, puis **restaurez une sauvegarde** si rien n'aboutit.

Pour savoir quelle extension fait planter le site, cherchez la plus récente ou la dernière mise à jour. Pour éviter la situation, testez les mises à jour sur une copie du site (un « environnement de test ») avant de les appliquer au site réel. C'est la raison d'être d'une [maintenance régulière](/services/maintenance).

## Mon site affiche « Index of » ou « Ce site est en cours de construction »

Ces deux messages ont des sens très différents.

**« Index of »** signifie que le serveur ne trouve pas de page d'accueil dans le dossier demandé et affiche la liste des fichiers à la place. Soit la page d'accueil a été supprimée ou mal nommée, soit le site a été installé dans un sous-dossier, soit une manipulation a vidé le dossier.

**« Ce site est en cours de construction »** (ou une page d'attente de l'hébergeur) signifie que le nom de domaine pointe vers un hébergement où le site n'a pas été installé, ou où le fichier d'accueil par défaut est encore en place. On le voit après un changement d'hébergeur, après une migration inachevée, ou quand le domaine pointe vers le mauvais espace.

Dans les deux cas, la correction se fait dans l'espace d'hébergement : replacer le site dans le bon dossier, vérifier que la page d'accueil est présente, ou corriger la redirection du domaine.

## Mon site affiche une erreur de contenu mixte

Le message apparaît quand une page sécurisée (« https ») charge un élément non sécurisé (« http ») : image, script, feuille de style. Cela arrive souvent après l'installation du certificat, quand d'anciennes adresses sont restées en « http ». La correction consiste à les remplacer par leur version sécurisée. Les bases du certificat sont dans [HTTPS et SSL sur un site web](/blog/ssl-https-site-web).

## Mon site marche chez moi mais pas chez mes clients (ou pas sur téléphone)

Quelques raisons possibles :

- **le cache** : votre navigateur affiche une ancienne version, ou celui de vos clients ;
- **le changement récent de domaine ou d'hébergeur** : la mise à jour des adresses peut mettre un moment à se propager partout, si bien que le site s'ouvre chez vous mais pas chez eux ;
- **un certificat de sécurité expiré**, que certains appareils signalent plus durement que d'autres.

Demandez à un client une capture d'écran et l'appareil utilisé : c'est ce qui fait gagner le plus de temps.

## Comment savoir si mon site est en panne, et être prévenu ?

La plupart des propriétaires apprennent la panne par un client. On peut faire mieux : un **service de surveillance de disponibilité** (il en existe de gratuits ou peu coûteux) interroge votre site à intervalle régulier et vous envoie un message, par e-mail ou SMS, quand il ne répond plus. Choisissez un service qui surveille aussi la validité du certificat et la date d'expiration du domaine.

Testez aussi ce qui ne se voit pas : envoyez-vous un message par le formulaire de contact chaque mois, et vérifiez la réservation et le paiement. Un formulaire en panne n'affiche aucune erreur, mais il vous coûte des demandes.

## Qui contacter quand mon site est en panne ?

Trois interlocuteurs possibles, selon le symptôme :

| Symptôme | Premier interlocuteur |
|---|---|
| Erreur 500, page blanche, lenteur, site hors ligne | L'hébergeur, ou la personne qui maintient le site |
| Site qui disparaît d'un coup, e-mails coupés | Le bureau d'enregistrement du domaine (expiration ?) |
| Fonction cassée après une modification (menu, formulaire, réservation) | Le prestataire qui a conçu ou maintient le site |
| Publicités ou redirections étranges, pages que vous n'avez pas créées | Hébergeur et prestataire, en urgence : voir [Mon site a été piraté](/blog/site-pirate-que-faire-wordpress-hack) |

Qui est tenu de maintenir le site ? Cela dépend de ce qui a été convenu. Une création de site n'inclut pas forcément la maintenance : si rien n'est écrit, personne n'est chargé de l'assurer. Vérifiez votre devis ou votre contrat. Les enjeux sont expliqués dans [Maintenance de site web](/blog/maintenance-site-web-guide), et le choix d'un hébergeur dans [Quel hébergement choisir](/blog/paa-hebergement-site).

## Que faire si mon prestataire web ne répond plus ?

Situation courante quand un indépendant arrête son activité. Dans l'ordre :

1. **Envoyez un message écrit** (e-mail avec accusé de lecture, puis courrier si nécessaire) qui rappelle le problème et fixe une date de réponse raisonnable.
2. **Récupérez vos accès** : l'espace du bureau d'enregistrement du domaine (normalement à votre nom), l'espace d'hébergement, l'administration du site. Si ces comptes sont au nom du prestataire, demandez-en le transfert.
3. **Faites une copie** de ce que vous pouvez : textes, photos, fichiers du site.
4. **Faites appel à un autre professionnel** pour reprendre la main ; il peut souvent travailler à partir de la sauvegarde.

Pour éviter le piège dès le départ, exigez que le domaine, l'hébergement et les accès soient à votre nom.

## Peut-on retrouver un site qui n'existe plus ?

Parfois. Des services d'archivage du web, comme l'Internet Archive, conservent des copies anciennes de nombreux sites : vous y retrouverez des textes et des images, rarement un site complet qui fonctionne. Votre hébergeur a pu garder des sauvegardes un temps limité. Une version de préproduction (copie de test, sur une adresse provisoire) peut aussi contenir une version récente : demandez à votre prestataire s'il en existe une.

## Questions fréquentes

**Une erreur 404 fait-elle baisser mon référencement ?**
Quelques-unes, non. C'est l'accumulation d'adresses cassées qui reçoivent des visites ou des liens qui pose problème, surtout après une refonte sans redirections.

**Une mise à jour peut-elle faire tomber mon site ?**
Oui, notamment quand une extension ou un thème n'est pas compatible avec la nouvelle version. D'où l'intérêt d'une sauvegarde et d'un test sur une copie avant de mettre à jour le site réel.

**Mon site est inaccessible depuis ce matin, est-ce grave ?**
Cela dépend de la cause. Commencez par vérifier le domaine, l'hébergement et le certificat, puis contactez votre hébergeur avec l'heure du problème.

**Combien de temps faut-il pour réparer un site en erreur ?**
De quelques minutes (une extension désactivée) à bien plus (restauration, piratage). Une sauvegarde récente et un interlocuteur identifié raccourcissent toujours la réparation. Pour un diagnostic de votre site, [écrivez-nous](/contact) ou passez par l'[audit de site](/outils/audit-site).
