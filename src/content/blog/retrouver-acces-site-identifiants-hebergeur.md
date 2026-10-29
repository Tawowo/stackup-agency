---
title: "Retrouver les accès de son site : hébergeur, domaine, administration"
seoTitle: "Retrouver les accès de son site : domaine, hébergeur, admin"
excerpt: "Identifiants perdus, prestataire parti, WordPress verrouillé : la marche à suivre pour récupérer domaine, hébergement et administration, étape par étape."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 8
tag: "Technique"
category: "technique"
type: "question"
keywords: ["je n'ai pas les accès de mon site que faire", "j'ai perdu l'accès à mon nom de domaine", "j'ai perdu le mot de passe administrateur de mon site wordpress", "comment savoir qui a accès à mon site", "comment réinitialiser le mot de passe wordpress sans accès mail", "un pirate a créé un compte administrateur sur mon wordpress"]
sources: ["https://www.service-public.fr", "https://www.cnil.fr"]
---

**Pour retrouver les accès de votre site, remontez la chaîne dans cet ordre : le nom de domaine (qui détermine tout), puis l'hébergeur, puis l'espace d'administration du site. Chacun a sa propre procédure de récupération, et c'est l'adresse e-mail liée à chaque compte qui ouvre la porte.**

Un site repose sur trois comptes distincts, souvent créés à des moments et par des personnes différentes. C'est ce qui rend la situation confuse : vous pouvez avoir le mot de passe du site mais pas celui du domaine, ou l'inverse. Voici comment démêler, sans rien casser.

## Je n'ai pas les accès de mon site : que faire en premier ?

Commencez par identifier **où se trouve chaque brique**. Faites un petit tableau avec trois lignes.

| Brique | À quoi elle sert | Où la retrouver |
|---|---|---|
| Nom de domaine | L'adresse (votre-entreprise.fr) | Facture ou e-mail du bureau d'enregistrement, annuaire public des noms de domaine |
| Hébergement | Le serveur où se trouvent les fichiers | Facture, e-mail de bienvenue, enregistrements DNS du domaine |
| Administration | Le tableau de bord pour modifier le site | Adresse du type votre-site.fr/wp-admin (WordPress) ou espace de la plateforme |

Puis cherchez dans votre messagerie, y compris les courriers indésirables, les mots « domaine », « hébergement », « identifiants », « bienvenue », « renouvellement », « facture ». Une seule facture suffit souvent à nommer l'hébergeur et le bureau d'enregistrement.

Ne faites pas de modification technique tant que vous n'avez pas fait une sauvegarde (voir [sauvegarder et restaurer son site](/blog/sauvegarde-restauration-site-internet)).

## J'ai perdu l'accès à mon nom de domaine : comment le récupérer ?

Le domaine est le plus important, car il contrôle l'adresse, les e-mails et la redirection vers l'hébergement. La marche à suivre :

1. **Trouvez qui est le bureau d'enregistrement.** Une recherche dans l'annuaire public des noms de domaine (le « whois ») l'affiche généralement, ainsi que la date d'expiration.
2. **Utilisez « mot de passe oublié »** sur l'espace client du bureau d'enregistrement, avec l'adresse e-mail du titulaire. L'identifiant est souvent cette adresse.
3. **Si l'adresse e-mail n'existe plus**, contactez le support du bureau d'enregistrement avec des justificatifs : pièce d'identité, extrait Kbis ou avis de situation Siren, facture d'achat.
4. **Si le domaine est au nom de votre ancien prestataire**, demandez-lui par écrit le transfert de titularité. S'il ne répond pas, voir [à qui appartient mon site](/blog/propriete-du-site-code-source-recuperer-son-site).
5. **Surveillez l'échéance.** Un domaine non renouvelé finit par être supprimé, et quelqu'un d'autre peut le racheter.

Pour la gestion à long terme (titulaire, renouvellement, contact), voir [le choix du nom de domaine](/blog/nom-de-domaine-choisir).

## Je ne retrouve plus l'identifiant d'hébergement : comment le trouver ?

L'hébergeur est la société qui fait « tourner » votre site. Pour le trouver :

- regardez vos **factures** et relevés bancaires (prélèvements récurrents) ;
- consultez les **enregistrements DNS** du domaine dans l'espace du bureau d'enregistrement : ils indiquent où pointe le site ;
- dans le site, regardez le **pied de page** ou les **mentions légales**, qui doivent indiquer l'hébergeur ;
- cherchez l'e-mail de bienvenue, qui contient l'identifiant de connexion.

Une fois l'hébergeur identifié, utilisez la procédure de mot de passe oublié. En cas d'échec, le support vous demandera des preuves de votre identité et de votre lien avec le site. Si vous hésitez sur un nouvel hébergeur, voir [quel hébergement choisir](/blog/quel-hebergement-choisir-site-web).

## J'ai perdu le mot de passe administrateur de mon site WordPress

Il y a trois cas, du plus simple au plus technique.

**Cas 1 : vous avez accès à l'adresse e-mail du compte.** Sur la page de connexion (votre-site.fr/wp-admin), cliquez sur « Mot de passe oublié ». Un lien arrive par e-mail.

**Cas 2 : vous n'avez plus accès à l'e-mail.** Si vous avez accès à l'hébergement, vous pouvez ouvrir l'outil de gestion de base de données fourni par l'hébergeur et modifier l'adresse e-mail ou le mot de passe de l'utilisateur concerné dans la table des utilisateurs. Cette opération demande de la prudence : faites une copie de la base avant d'y toucher. Si cela vous met mal à l'aise, un professionnel peut le faire en quelques minutes.

**Cas 3 : vous n'avez accès à rien.** Il faut d'abord récupérer l'hébergement et le domaine (voir plus haut). Aucune méthode sérieuse ne contourne cette étape.

## Comment désactiver un plugin WordPress sans accès à l'administration ?

C'est utile quand une extension fait planter le site. Si vous avez l'accès aux fichiers (gestionnaire de fichiers de l'hébergeur ou FTP) :

1. Ouvrez le dossier `wp-content/plugins`.
2. Renommez le dossier de l'extension problématique (par exemple en ajoutant `-off` à la fin). WordPress ne la charge plus.
3. Rechargez le site. Si la page d'administration revient, reconnectez-vous et traitez le problème.
4. Pour désinstaller proprement, faites-le ensuite depuis l'administration, ou supprimez le dossier une fois certain qu'il n'est plus nécessaire.

Pour désactiver toutes les extensions à la fois, renommez le dossier `plugins` lui-même. Sauvegardez avant chaque manipulation.

## Comment savoir qui a accès à mon site ?

Il y a plusieurs portes d'entrée, à vérifier une par une.

- **L'administration du site** : dans WordPress, la rubrique « Utilisateurs » liste tous les comptes et leurs rôles. Repérez les administrateurs que vous ne connaissez pas.
- **L'hébergement** : le panneau de l'hébergeur indique les accès FTP, les utilisateurs de la base de données et parfois les connexions récentes.
- **Le bureau d'enregistrement** : qui est contact et titulaire du domaine.
- **Vos outils annexes** : Google (fiche, Search Console, Analytics), réseaux sociaux, messagerie.
- **Les prestataires** : listez ceux qui ont eu un accès à un moment, avec la date de fin.

### Un ancien salarié a encore accès au site : que faire ?

Supprimez son compte (ou rétrogradez-le), changez les mots de passe partagés et ceux qu'il connaissait (hébergement, domaine, réseaux), vérifiez les redirections de messagerie qu'il aurait pu créer et retirez-le des propriétés Google. Faites-le le jour du départ la prochaine fois : une procédure de sortie de trois lignes suffit.

## Un pirate a créé un compte administrateur sur mon WordPress : que faire ?

Si vous voyez un compte administrateur inconnu, le site a probablement été compromis. Agissez dans cet ordre.

1. **Ne supprimez rien d'urgent sans copie.** Faites une sauvegarde de l'état actuel pour garder des preuves.
2. **Changez tous les mots de passe** : administration, hébergement, base de données, FTP, messagerie liée.
3. **Supprimez le compte inconnu** et les extensions ou thèmes que vous n'avez pas installés.
4. **Mettez à jour** WordPress, le thème et les extensions.
5. **Restaurez une sauvegarde saine** si le site est endommagé (pages ajoutées, redirections vers d'autres sites).
6. **Contrôlez** Search Console : des pages ou messages d'alerte de sécurité peuvent y apparaître.
7. **Activez l'authentification à deux facteurs** et limitez les tentatives de connexion.
8. **Si des données personnelles sont concernées** (clients, formulaires), la violation peut devoir être notifiée à la CNIL dans un délai très court après en avoir pris connaissance. Consultez [cnil.fr](https://www.cnil.fr) pour la procédure.

Une maintenance régulière évite l'essentiel de ces cas ; voir [la maintenance d'un site](/blog/maintenance-site-web-guide) et la page [maintenance](/services/maintenance).

## « Votre connexion n'est pas privée » s'affiche sur mon site : que faire ?

Ce message n'est pas un problème d'accès, mais il est souvent découvert en même temps. Il signale que le certificat HTTPS du site est expiré, absent ou mal configuré. La solution passe par l'hébergeur : renouveler ou réémettre le certificat, puis vérifier que le site redirige bien vers la version sécurisée. Voir [SSL et HTTPS expliqués simplement](/blog/ssl-https-site-web). Si vous n'avez pas la main sur l'hébergement, c'est une raison de plus de récupérer vos accès.

## Comment éviter de perdre à nouveau ses accès ?

- Utilisez un **gestionnaire de mots de passe** et partagez-en l'accès avec une personne de confiance.
- Mettez **votre propre adresse e-mail** comme contact du domaine et de l'hébergement, jamais celle d'un prestataire seul.
- Notez les **dates de renouvellement** dans votre agenda.
- Gardez un **document d'accès** (domaine, hébergeur, administration, sauvegardes) hors du site.
- Faites une **sauvegarde** régulière.
- Demandez un **site administrable** : vous devez pouvoir modifier vos textes et vos photos sans appeler quelqu'un. Un [audit de votre site](/outils/audit-site) peut montrer ce qui vous échappe, et si vous voulez repartir sur une base claire, [écrivez-nous](/contact).

## Questions fréquentes

**Combien de temps faut-il pour récupérer un nom de domaine ?**
Cela dépend du bureau d'enregistrement et des justificatifs demandés. Une réinitialisation simple est immédiate ; un changement de titulaire peut prendre quelques jours. Ne comptez pas sur un délai précis.

**L'hébergeur peut-il me donner l'accès sans que le compte soit à mon nom ?**
Non, il doit s'assurer de l'identité du titulaire. Il peut vous aider si vous prouvez que vous êtes l'entreprise concernée.

**Peut-on retrouver un site supprimé ?**
Si l'hébergeur ou un outil a fait des sauvegardes, oui. À défaut, des copies partielles d'anciennes pages existent parfois dans les archives du web, mais rien ne garantit la restauration complète.

**À quoi sert l'authentification à deux facteurs ?**
Elle ajoute un code temporaire à votre mot de passe. Même si le mot de passe fuit, la personne qui le détient ne peut pas se connecter sans ce code.

**Quels accès dois-je donner à un prestataire ?**
Un compte à son nom, avec le niveau de droits nécessaire à sa mission, plutôt que votre identifiant personnel. À la fin du travail, retirez-le.
