---
term: "DNS"
title: "Qu'est-ce que le DNS ?"
seoTitle: "DNS : définition simple et rôle pour votre site"
excerpt: "Le DNS traduit votre nom de domaine en adresse de serveur et dirige aussi vos e-mails. Définition, enregistrements courants et erreurs à éviter."
definition: "Le DNS (Domain Name System) est l'annuaire d'internet : il traduit un nom de domaine en adresse de serveur et indique où envoyer le site et les e-mails. Une erreur de réglage peut couper l'un ou l'autre."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 3
category: "web"
keywords: ["dns définition", "c'est quoi le dns", "enregistrement dns", "dns site internet", "modifier dns"]
related: ["nom-de-domaine", "hebergement-web", "certificat-ssl", "site-web", "https"]
---

**Le DNS est l'annuaire d'internet : il fait le lien entre le nom de domaine que vous connaissez et l'adresse technique du serveur qui héberge votre site. Il indique aussi où livrer vos e-mails.**

## À quoi ça sert ?

Les ordinateurs se repèrent par des adresses numériques, pas par des noms. Le DNS fait la traduction. Quand quelqu'un tape votre adresse, son appareil interroge le DNS pour savoir quel serveur contacter. Sans cette étape, le [nom de domaine](/lexique/nom-de-domaine) ne mènerait nulle part.

Pour vous, le DNS compte surtout à trois moments : quand vous mettez un site en ligne, quand vous changez d'[hébergement](/lexique/hebergement-web) et quand vous configurez vos e-mails professionnels.

## Comment ça marche (en pratique)

Le DNS se configure dans une zone, c'est-à-dire une liste d'enregistrements que l'on gère chez son registrar ou chez son hébergeur. Les plus courants sont les suivants.

- **A** : relie le nom de domaine à l'adresse d'un serveur.
- **CNAME** : fait pointer un nom vers un autre nom, par exemple le sous-domaine « www ».
- **MX** : indique quel serveur reçoit les e-mails.
- **TXT** : stocke des informations de vérification et des règles d'authentification des e-mails.

Lorsqu'on modifie un enregistrement, le changement ne se voit pas partout instantanément. Les réseaux gardent des copies en mémoire pendant un certain temps : on parle de propagation. Elle peut prendre de quelques minutes à plusieurs heures. Soyez prudent le jour d'une migration.

## Exemple concret

Exemple type : un artisan change de prestataire et de serveur. Le nouveau site est prêt, mais l'ancienne adresse pointe toujours vers l'ancien serveur. Le prestataire modifie l'enregistrement A et conserve les enregistrements MX pour que la messagerie continue de fonctionner. Pendant la propagation, certains visiteurs voient encore l'ancien site : c'est normal, et il vaut mieux garder l'ancien en ligne jusqu'à la fin de la transition.

## Les erreurs fréquentes

- **Supprimer les enregistrements MX en changeant de site.** Vous ne recevriez plus d'e-mails.
- **Modifier la zone sans la copier d'abord.** Notez ou exportez la configuration avant tout changement.
- **Confondre l'endroit où est géré le DNS et l'hébergeur.** Ils peuvent être différents.
- **Couper l'ancien serveur trop tôt.** Laissez le temps à la propagation.
- **Laisser un enregistrement pointer vers un service qu'on n'utilise plus.** Cela peut créer un risque de sécurité.

## Pour aller plus loin

- [Retrouver l'accès à son site : identifiants et hébergeur](/blog/retrouver-acces-site-identifiants-hebergeur)
- [SSL et HTTPS pour un site](/blog/ssl-https-site-web)
- [Adresse e-mail professionnelle](/blog/adresse-mail-professionnelle-nom-de-domaine)
- [Maintenance d'un site](/services/maintenance)

## Questions fréquentes

**Combien de temps prend la propagation DNS ?**
Elle varie selon les réglages et les réseaux, de quelques minutes à plusieurs heures. Prévoyez une marge lors d'un changement de site.

**Le DNS influence-t-il la vitesse du site ?**
Légèrement, par le temps de réponse du service DNS utilisé. L'essentiel de la vitesse vient du serveur et du site lui-même.

**Qui gère le DNS de mon domaine ?**
Celui chez qui il est configuré : le registrar, l'hébergeur ou un service tiers. Vérifiez où se trouve la zone avant de modifier quoi que ce soit.

**Une erreur de DNS peut-elle couper mes e-mails ?**
Oui, si les enregistrements MX sont supprimés ou erronés. C'est pourquoi on les contrôle à chaque migration.
