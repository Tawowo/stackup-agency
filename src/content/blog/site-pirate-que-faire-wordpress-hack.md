---
title: "Mon site a été piraté : que faire, étape par étape"
seoTitle: "Site piraté : que faire en urgence, étape par étape"
excerpt: "Site WordPress, boutique ou vitrine piraté ? Les gestes à faire dans l'ordre, la restauration, les obligations légales et comment éviter la rechute."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 8
tag: "Technique"
category: "technique"
type: "question"
keywords: ["site piraté que faire", "comment réparer un site wordpress piraté", "site woocommerce piraté que faire", "boutique en ligne piratée que faire", "c'est quoi une faille de sécurité sur un site internet", "est-ce que les petits sites sont ciblés par les pirates"]
sources: ["https://www.cybermalveillance.gouv.fr", "https://www.cnil.fr", "https://support.google.com"]
---

**Si votre site est piraté, isolez-le, changez tous les mots de passe depuis un appareil sain, prévenez votre hébergeur, puis restaurez une sauvegarde saine avant de corriger la faille par laquelle les pirates sont entrés.** Nettoyer sans trouver la cause revient à rouvrir la porte : l'ordre des gestes compte autant que leur rapidité.

## Comment savoir si mon site est piraté ?

Les signes sont parfois spectaculaires (page d'accueil remplacée), le plus souvent discrets :

- des **redirections** vers des sites étrangers ou des annonces, en particulier depuis un téléphone ;
- des **pages ou articles** que vous n'avez pas créés (produits pharmaceutiques, jeux d'argent, textes en langue étrangère) ;
- un **avertissement de Google** dans les résultats (« Ce site peut être piraté ») ou un message de votre navigateur ;
- votre hébergeur vous **prévient** d'une activité suspecte ou **suspend** le compte ;
- des **utilisateurs administrateurs** inconnus dans l'espace de gestion ;
- un site **soudainement lent**, ou des e-mails de votre domaine qui partent en spam ;
- des clients qui vous disent avoir reçu un message étrange de votre part.

Un seul signe suffit à prendre l'alerte au sérieux.

## Mon site a été piraté : les étapes dans l'ordre

1. **Ne supprimez rien tout de suite.** Faites des captures d'écran, notez l'heure, conservez les messages de l'hébergeur : ce sont vos preuves, et ils aideront à retrouver la faille.
2. **Changez les mots de passe depuis un appareil sain** : espace d'hébergement, administration du site, accès FTP, base de données, messagerie liée au domaine, compte du bureau d'enregistrement. Si l'ordinateur que vous utilisez est lui-même suspect, passez par un autre appareil. Utilisez des mots de passe longs et différents pour chaque accès, avec un gestionnaire de mots de passe.
3. **Prévenez l'hébergeur.** Il peut isoler le site, fournir les journaux d'accès et indiquer les dates de sauvegardes disponibles.
4. **Mettez le site en maintenance** ou hors ligne le temps du traitement, surtout s'il redirige ou infecte vos visiteurs.
5. **Identifiez la date du début de l'infection** grâce aux journaux et à la date des fichiers modifiés.
6. **Restaurez une sauvegarde antérieure à l'infection**, si vous en avez une.
7. **Mettez tout à jour** (le cœur du système, le thème, les extensions) et supprimez ce qui ne sert pas.
8. **Contrôlez les comptes administrateurs** et supprimez ceux que vous ne connaissez pas.
9. **Cherchez ce qui a pu rester** : fichiers inconnus, code ajouté dans les fichiers du thème, tâches planifiées suspectes. C'est l'étape qui demande un professionnel.
10. **Surveillez** le site les jours suivants, et demandez à Google un réexamen s'il avait signalé le site.

La ressource publique [Cybermalveillance.gouv.fr](https://www.cybermalveillance.gouv.fr) propose un parcours d'assistance aux victimes et l'orientation vers des prestataires.

## Comment réparer un site WordPress piraté ?

WordPress est très répandu, donc très visé. La réparation suit les étapes ci-dessus, avec des points propres à ce système :

- **Réinstallez le cœur de WordPress** depuis une source officielle plutôt que de chercher les fichiers modifiés un par un.
- **Désinstallez les extensions et thèmes inutilisés**, et réinstallez les autres depuis leur source officielle plutôt que depuis une copie existante.
- **Vérifiez le dossier des fichiers téléversés** : il ne doit contenir ni programmes ni scripts.
- **Examinez la liste des utilisateurs**, la base de données (articles ou liens injectés) et les tâches planifiées.
- **Remplacez les clés de sécurité** du fichier de configuration pour forcer la déconnexion de toutes les sessions.

Si vous avez une extension « nulled » (version piratée d'une extension payante), c'est très probablement la porte d'entrée : à bannir.

## Site WooCommerce ou boutique en ligne piratée : que faire de plus ?

Une boutique ajoute deux enjeux : les données clients et le paiement.

- **Contactez votre prestataire de paiement** pour vérifier qu'aucun code n'a détourné des données de carte ou modifié la page de paiement.
- **Vérifiez les commandes et les e-mails** récents : certains pirates redirigent les notifications.
- **Données personnelles** : si des données de clients ont pu être consultées, il s'agit d'une violation de données personnelles. L'organisme responsable du traitement doit la consigner et, sauf si le risque pour les personnes est improbable, la notifier à la CNIL dans un délai de soixante-douze heures après en avoir pris connaissance. Selon la gravité, les personnes concernées doivent aussi être informées. Les démarches exactes sont sur [cnil.fr](https://www.cnil.fr).
- **Prévenez vos clients** si nécessaire, avec des mots simples, sans minimiser.

Un site vitrine sans compte client ni formulaire d'inscription pose moins ce problème, mais le formulaire de contact conserve des coordonnées : vérifiez ce qu'il enregistre.

## Les petits sites sont-ils ciblés par les pirates ?

Oui, car les attaques sont en grande majorité **automatisées** : des programmes parcourent le web à la recherche de versions vulnérables, sans regarder la taille de l'entreprise. Un site d'artisan non mis à jour est une cible aussi rentable qu'un autre : il peut servir à héberger des pages frauduleuses, envoyer du spam ou rediriger vos visiteurs. « Personne ne s'intéressera à moi » n'est donc pas une protection.

## C'est quoi une faille de sécurité sur un site internet ?

Une faille est une erreur ou une faiblesse dans le code ou la configuration d'un logiciel qui permet à quelqu'un d'y faire ce qui n'était pas prévu : lire des données, ajouter des fichiers, prendre le contrôle. Les éditeurs publient des correctifs, et les pirates, eux, exploitent le laps de temps pendant lequel vous n'avez pas installé le correctif. C'est pour cela que les mises à jour sont la première protection.

Les causes les plus fréquentes sur un petit site : un composant obsolète, un mot de passe faible ou réutilisé, une extension abandonnée, un compte d'hébergement partagé avec un prestataire qui n'est plus joignable.

## Comment savoir si mes plugins WordPress ont une faille connue ?

- Dans l'espace d'administration, l'écran des extensions affiche les mises à jour disponibles ; une extension qui n'a plus été mise à jour depuis longtemps ou qui a été retirée du catalogue officiel est un signal d'alerte.
- Les failles connues sont référencées dans des **bases publiques de vulnérabilités** (le système d'identifiants CVE, ainsi que des bases spécialisées dans WordPress) : cherchez le nom de l'extension et sa version.
- Les éditeurs indiquent dans leur historique de versions les correctifs de sécurité.
- Un prestataire de [maintenance](/services/maintenance) fait cette vérification à chaque intervention.

Moins d'extensions, c'est moins de surface d'attaque : supprimez celles dont vous n'avez pas un usage clair.

## Un formulaire de contact peut-il être piraté ?

Oui. Un formulaire qui ne contrôle pas ce qu'on lui envoie peut servir à injecter du code, à envoyer du spam à votre place ou à exposer des données. Un formulaire sain valide chaque champ côté serveur, limite les envois répétés, et n'enregistre que ce qui est nécessaire. Le spam qui arrive dans votre boîte n'est pas un piratage en soi, mais un signe que le formulaire est sollicité par des robots.

## Faut-il nettoyer le site ou le refaire ?

Nettoyer suffit quand l'intrusion est récente, qu'une bonne sauvegarde existe et que le site est par ailleurs sain. Refaire s'impose plutôt quand le site est ancien et empilé d'extensions abandonnées, quand l'infection revient après nettoyage, ou quand il est impossible d'être certain qu'il ne reste rien. Une [refonte](/services/refonte-de-site-internet) peut alors repartir d'une base propre, en reprenant les textes, les photos et les adresses utiles. Avec un [site conçu sur mesure](/services/site-vitrine) et simple, la surface d'attaque est plus petite.

## Comment fonctionne la sécurité d'un site statique ?

Un site **statique** est composé de pages déjà fabriquées, servies telles quelles. Il n'a pas de base de données ni de page d'administration publique à attaquer sur le serveur, donc beaucoup de failles courantes n'existent pas. La contrepartie : pour les formulaires, la réservation ou le paiement, il faut s'appuyer sur un service tiers ou un petit programme séparé, qui doit lui-même être sûr. Le site reste exposé au vol des accès de l'hébergement et aux composants utilisés. Un site statique n'est pas invincible, mais il demande moins d'entretien de sécurité.

## Qui est responsable en cas de piratage ? Mon assurance couvre-t-elle ?

La responsabilité dépend du contrat. En tant qu'éditeur du site, vous êtes responsable de ses contenus et, pour les données personnelles, de leur protection. Un prestataire n'est tenu à une mission de sécurité que si elle est prévue : demandez à relire votre devis et le contrat d'hébergement. Pour l'assurance, certains contrats couvrent les cyberattaques et d'autres non : contactez votre assureur et relisez les exclusions. Pour porter plainte, rassemblez vos preuves et rapprochez-vous des services indiqués sur [Cybermalveillance.gouv.fr](https://www.cybermalveillance.gouv.fr).

## Comment sécuriser son site après un piratage ?

Mises à jour planifiées, sauvegardes hors du serveur, comptes à droits limités, double authentification sur l'hébergement et l'administration, suppression de ce qui est inutile, surveillance de la disponibilité. L'importance de ces gestes est détaillée dans [Maintenance de site web](/blog/maintenance-site-web-guide), et le choix d'un hébergement dans [Quel hébergement choisir](/blog/quel-hebergement-choisir-site-web). Pour un avis sur votre site, vous pouvez [nous écrire](/contact) ou lancer l'[audit de site](/outils/audit-site).

## Questions fréquentes

**Google peut-il me pénaliser si mon site est piraté ?**
Google peut afficher un avertissement ou rétrograder un site infecté. Après nettoyage, la Search Console permet de demander un réexamen.

**Un antivirus sur mon ordinateur suffit-il à protéger mon site ?**
Non, il protège votre poste, pas le serveur. Il reste utile : un ordinateur infecté peut voler vos mots de passe d'hébergement.

**Dois-je payer une rançon si on me la demande ?**
Rien ne garantit la restitution, et le paiement encourage les attaquants. Prévenez plutôt l'hébergeur et les services d'assistance.

**Mes sauvegardes peuvent-elles aussi être infectées ?**
Oui, si l'infection est ancienne. Gardez plusieurs sauvegardes de dates différentes et testez la restauration.

**À quelle fréquence faut-il mettre à jour un site ?**
Dès que des correctifs de sécurité sont publiés, et au minimum à un rythme régulier fixé à l'avance.
