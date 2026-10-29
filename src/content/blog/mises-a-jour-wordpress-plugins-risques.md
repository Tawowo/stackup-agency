---
title: 'Mises à jour WordPress et plugins : risques et bonnes pratiques'
seoTitle: 'Mises à jour WordPress et plugins : sans casser le site'
excerpt: >-
  Avant, pendant et après une mise à jour WordPress : sauvegarde, plugins
  fiables, PHP trop ancien, retour en arrière. La méthode pour ne rien casser.
date: '2026-10-29'
updated: '2026-10-29'
readTime: 13
tag: Technique
category: technique
type: guide
keywords:
  - comment mettre à jour wordpress sans casser son site
  - que faire avant une mise à jour wordpress
  - un plugin wordpress n'est plus maintenu
  - ma version de php est trop ancienne
  - quels plugins wordpress sont vraiment indispensables
sources:
  - 'https://wordpress.org'
  - 'https://developers.google.com/search'
  - 'https://web.dev'
---

**Mettre à jour WordPress est nécessaire pour la sécurité, mais une mise à jour faite à l'aveugle peut casser un site : la règle est de sauvegarder d'abord, de tester ensuite, et de ne jamais tout mettre à jour d'un seul clic sur un site qui vous rapporte des clients.** Un site à jour, avec peu de plugins bien choisis, coûte moins de temps qu'un site laissé à l'abandon.

Ce guide s'adresse à celui qui gère son site WordPress lui-même, ou qui veut comprendre ce que fait son prestataire. Il part du principe que votre site est en production : des clients le visitent, parfois y achètent.

## Pourquoi faut-il mettre à jour WordPress et ses plugins ?

WordPress est un logiciel ouvert, très répandu. Cette popularité en fait une cible : quand une faille est découverte dans le cœur, dans un thème ou dans un plugin, elle est exploitée rapidement par des robots qui parcourent le web à la recherche de sites non corrigés. Les mises à jour contiennent souvent la correction. Les ignorer revient à laisser une porte connue ouverte.

Elles apportent aussi des corrections de bugs, des évolutions de compatibilité avec les nouvelles versions de PHP et du navigateur, et parfois des gains de vitesse. Le coût d'un site piraté (page de spam, redirection, suspension chez l'hébergeur, perte de référencement) dépasse presque toujours celui de l'entretien. Si cela vous est arrivé, lisez [site piraté : que faire](/blog/site-pirate-que-faire-wordpress-hack) et l'article général sur [la maintenance d'un site web](/blog/maintenance-site-web-guide).

## Que faire avant une mise à jour WordPress ?

La préparation tient en sept gestes.

1. **Sauvegardez les fichiers et la base de données**, et vérifiez que la sauvegarde est exploitable (téléchargeable, restaurable). Voir [sauvegarde et restauration d'un site](/blog/sauvegarde-restauration-site-internet).
2. **Lisez les notes de version** des mises à jour importantes : elles signalent les changements susceptibles de casser quelque chose.
3. **Vérifiez la compatibilité** : version de PHP de votre hébergement, version de WordPress minimale requise par chaque plugin.
4. **Notez ce qui est critique** : formulaire de contact, paiement, réservation. Ce sont les fonctions à retester après.
5. **Choisissez un moment calme** : pas le vendredi soir, pas pendant une période de ventes.
6. **Si possible, utilisez un site de test** (un « staging »), copie de votre site sur laquelle on essaie les mises à jour avant de les faire en vrai.
7. **Prévenez** les personnes qui contribuent au site de ne pas modifier le contenu pendant l'opération.

## Comment mettre à jour WordPress sans casser son site ?

Dans l'ordre :

1. **Mettez à jour les plugins un par un**, en commençant par ceux qui ont le moins d'impact (sécurité, sauvegarde), et testez rapidement après chacun. Si quelque chose se casse, vous savez lequel est en cause.
2. **Mettez à jour le thème**, surtout s'il est personnalisé : si vous avez modifié ses fichiers directement, une mise à jour écrasera vos changements. Utilisez un thème enfant pour ces modifications.
3. **Mettez à jour le cœur de WordPress** en dernier, une fois que les plugins sont à jour.
4. **Testez** : page d'accueil, une page intérieure, formulaire, panier et paiement pour une boutique, affichage sur téléphone, connexion à l'administration.
5. **Videz les caches** (celui du plugin de cache et celui du navigateur) pour voir la réalité.
6. **Gardez un journal** : date, éléments mis à jour, problèmes rencontrés.

Les mises à jour mineures du cœur (corrections de sécurité) peuvent être automatiques. Pour le reste, une mise à jour manuelle avec sauvegarde est plus prudente. Pour comprendre les termes, consultez le lexique : [WordPress](/lexique/wordpress), [sauvegarde de site](/lexique/sauvegarde-de-site) et [maintenance de site](/lexique/maintenance-de-site).

## Mise à jour WordPress qui a mal tourné : comment revenir en arrière ?

Si le site affiche une page blanche, une erreur ou perd sa mise en forme :

1. **Ne paniquez pas et ne refaites pas dix tentatives.** Chaque essai complique le diagnostic.
2. **Identifiez ce qui a changé** : dernier plugin, thème ou version.
3. **Désactivez le plugin suspect** : depuis l'administration si elle est accessible, sinon en renommant son dossier dans `wp-content/plugins` via le gestionnaire de fichiers de l'hébergeur ou le FTP.
4. **Revenez à la version précédente** du plugin ou du thème, que vous retrouvez en la téléchargeant à nouveau depuis le dépôt officiel ou depuis la sauvegarde.
5. **Si cela ne suffit pas, restaurez la sauvegarde** faite avant l'opération, en entier (fichiers et base) pour éviter l'incohérence entre les deux.
6. **Activez le mode débogage** temporairement pour lire l'erreur exacte, puis désactivez-le.
7. **Vérifiez le site en entier** avant de rouvrir.

Si vous n'avez pas de sauvegarde, regardez celles que votre hébergeur conserve peut-être. Pour les erreurs affichées, voir [page blanche, erreur 500 ou 404](/blog/site-en-erreur-page-blanche-erreur-500-404) et, si vous ne retrouvez plus vos accès, [retrouver l'accès à son site](/blog/retrouver-acces-site-identifiants-hebergeur).

## Que faire quand une mise à jour WooCommerce casse le site ?

Une boutique est plus délicate qu'un site vitrine : une panne coûte des ventes. Précautions supplémentaires :

- **Faites la mise à jour sur une copie de test** quand c'est possible, notamment pour les versions majeures de [WooCommerce](/lexique/woocommerce).
- **Évitez les périodes de forte activité** (soldes, fêtes, lancement).
- **Testez un parcours complet** : ajout au panier, calcul des frais de livraison, paiement (en mode test), e-mail de confirmation, accès au compte client.
- **Vérifiez les extensions de paiement et de livraison**, qui doivent être compatibles avec la nouvelle version.
- **Exportez les commandes** avant l'opération, pour ne pas dépendre d'une base endommagée.

En cas de panne, appliquez la procédure de retour en arrière ci-dessus et informez vos clients si le paiement est interrompu. Ne rejouez pas des commandes sans contrôler que les paiements correspondants sont bien passés.

## Faut-il un plugin de sécurité sur WordPress ?

Un plugin de sécurité peut aider, mais il ne remplace ni les mises à jour ni de bons mots de passe. Il sert à limiter les tentatives de connexion, à surveiller les fichiers modifiés, à bloquer certaines attaques connues et à alerter. Il ajoute lui-même du code, donc de la maintenance.

Le plus important, avant d'ajouter quoi que ce soit :

- **Des mises à jour régulières** du cœur, des thèmes et des plugins.
- **Des mots de passe uniques et longs**, avec double authentification pour les administrateurs.
- **Peu d'utilisateurs administrateurs.**
- **Des sauvegardes testées et stockées hors du site.**
- **Un hébergeur qui isole les comptes et applique des correctifs.**
- **La suppression** des plugins et thèmes inutilisés.

Si vous ajoutez un plugin de sécurité, choisissez-en un seul (plusieurs se gênent), maintenu activement, avec un nombre d'installations conséquent et des notes récentes. Pour le choix, appliquez les critères de la section suivante. Notre article [SEO sous WordPress, Wix et Shopify : plugins](/blog/seo-wordpress-wix-shopify-plugins) donne d'autres repères.

## Comment choisir un plugin WordPress fiable ?

Avant d'installer un plugin, vérifiez sur sa fiche du répertoire officiel :

- **La date de dernière mise à jour.** Un plugin non mis à jour depuis longtemps est un signal d'alarme.
- **La compatibilité** annoncée avec votre version de WordPress.
- **Le nombre d'installations actives** et les avis récents.
- **La réactivité du support** dans le forum, c'est-à-dire si les questions reçoivent des réponses.
- **La clarté de l'éditeur** : un nom, un site, une documentation.
- **Le modèle économique.** Un plugin gratuit finance son développement autrement : version payante, publicité, collecte de données. Lisez ce qu'il fait.
- **Ce qu'il fait réellement.** Un plugin qui sert à un seul bouton alourdit le site pour peu.

Évitez les plugins « piratés » ou téléchargés hors des sources officielles : ils sont une voie classique d'infection.

**Quels sont les risques d'un plugin gratuit ?** Ils ne sont pas plus risqués par nature qu'un plugin payant, mais ils dépendent de la bonne volonté d'un auteur. Les risques réels sont l'abandon (plus de correctifs), la faille non corrigée, la version « gratuite » qui devient payante avec des limites, et dans de rares cas du code malveillant ajouté lors d'un rachat. Gardez un œil sur les changements de propriétaire d'un plugin important.

## Combien de plugins WordPress peut-on installer ?

Il n'y a pas de nombre magique. Un petit nombre de plugins bien écrits est préférable à beaucoup de plugins médiocres. Chaque plugin ajoute du code qui peut ralentir, entrer en conflit ou devenir vulnérable. Ce qui compte, c'est la qualité et l'utilité de chacun, et votre capacité à les maintenir.

Une règle utile : **un plugin par fonction, et seulement si la fonction est indispensable.** Faites un audit une fois par an et désinstallez ce qui n'est plus utilisé (désactiver ne suffit pas, il faut supprimer). Pour la vitesse, lisez [pourquoi WordPress est lent](/blog/wordpress-pourquoi-site-lent).

## Quels plugins WordPress sont vraiment indispensables ?

Cela dépend du site. Pour un site vitrine, un jeu minimal peut se résumer à :

- **Une sauvegarde automatique** externalisée.
- **Un module de référencement** pour gérer titres, descriptions et plan du site.
- **Un formulaire de contact** fiable avec protection contre le spam (voir [formulaire de contact et spam](/blog/formulaire-contact-spam-captcha-protection)).
- **Un module de consentement aux cookies** si vous utilisez des outils de mesure ou de publicité ([bandeau cookies](/blog/bandeau-cookies-site-obligation)).
- **Une optimisation d'images** si vos photos sont lourdes ([images d'un site](/blog/images-site-internet-alt-poids-format)).

**Pour une petite boutique WooCommerce**, ajoutez la passerelle de paiement de votre prestataire, le module de livraison de votre transporteur, et un outil de gestion des taxes et factures. Au-delà, chaque extension doit répondre à un besoin précis.

## Faut-il un plugin de cache sur WordPress ?

Souvent oui, parce que WordPress génère chaque page à la demande à partir de la base de données. Un cache conserve la page toute prête et la sert plus vite. Mais certains hébergeurs proposent déjà un cache intégré : dans ce cas, un plugin de cache en plus peut créer des conflits. Regardez d'abord ce que propose votre hébergeur, activez une seule solution, et testez après chaque modification que les pages dynamiques (panier, compte client) ne sont pas mises en cache par erreur. Les mesures de vitesse se lisent sur [web.dev](https://web.dev) et dans [vitesse du site et Core Web Vitals](/blog/vitesse-site-core-web-vitals).

## Un plugin WordPress n'est plus maintenu : que faire ?

Un plugin abandonné est un risque croissant : il ne reçoit plus de correctifs de sécurité et finira par ne plus être compatible avec WordPress ou PHP. La démarche :

1. **Confirmez l'abandon** : date de dernière mise à jour, réponses du support, message de l'auteur ou avertissement du répertoire.
2. **Identifiez ce que le plugin fait** pour vous.
3. **Cherchez une alternative maintenue** qui fait la même chose, ou une fonction native de WordPress ou de votre thème.
4. **Planifiez la migration** : sauvegarde, installation de l'alternative sur une copie, import des données, retrait de l'ancien plugin.
5. **Si la fonction est critique et sans alternative**, faites évaluer une reprise du code par un développeur, ou une reconstruction de la fonction.

## Pourquoi mes plugins ne se mettent-ils pas à jour, ou ne sont-ils plus compatibles ?

Causes fréquentes :

- **Licence expirée** pour un plugin payant : la mise à jour est bloquée tant qu'elle n'est pas renouvelée.
- **Droits d'écriture insuffisants** sur le serveur, ou espace disque saturé.
- **Version de PHP ou de WordPress trop ancienne** : le plugin exige une version plus récente.
- **Conflit de cache** : l'écran d'administration affiche encore l'ancienne version.
- **Limite de temps ou de mémoire** de l'hébergement atteinte.
- **Mise à jour interrompue**, qui laisse le site en mode maintenance.

Pour une incompatibilité entre un plugin et votre version de WordPress, regardez si une version plus récente du plugin existe, sinon cherchez une alternative. Ne forcez jamais une installation en modifiant le code sans test.

## Ma version de PHP est trop ancienne : que faire ?

PHP est le langage dans lequel WordPress fonctionne. Chaque version a une durée de support : passé ce cap, elle ne reçoit plus de correctifs de sécurité. Les versions encore supportées sont listées sur le site officiel de PHP ; WordPress indique aussi dans son administration les versions recommandées.

**Comment mettre à jour la version de PHP de son site ?** Depuis le panneau de votre hébergeur, il existe en général un réglage de version PHP.

1. **Sauvegardez** le site.
2. **Vérifiez la compatibilité** de votre thème et de vos plugins avec la version visée.
3. **Passez à la version supérieure, d'une marche à la fois** si l'écart est grand.
4. **Testez** immédiatement le site et la boutique.
5. **Revenez à la version précédente** depuis le même panneau si quelque chose casse, le temps de corriger.

**Mon site utilise une ancienne version de PHP : faut-il le refaire ?** Pas forcément. Si un thème ou un plugin bloque le passage à une version récente, on peut souvent remplacer l'élément en cause. La refonte devient la bonne réponse quand le thème est abandonné, que plusieurs plugins critiques ne sont plus maintenus et que les corrections coûtent plus cher que la reconstruction. Voir [refonte de site web : guide](/blog/refonte-site-web-guide).

## Mise à jour par un professionnel ou refonte : que choisir ?

Deux situations se présentent.

**La mise à jour suffit** si le site fonctionne, que le thème est maintenu, que les plugins sont raisonnables en nombre et que vous voulez seulement le garder sain. Un professionnel fait le travail avec sauvegarde et tests, à la demande ou dans un abonnement de maintenance. La page [maintenance de site](/services/maintenance) décrit notre offre ; elle ne se limite pas à nos propres sites.

**La refonte est préférable** si le site est lent malgré les efforts, si plusieurs éléments sont abandonnés, si la structure ne correspond plus à votre activité, ou si les coûts d'entretien dépassent le gain. Voir [refonte de site internet](/services/refonte-de-site-internet) et [WordPress ou sur mesure](/blog/wordpress-vs-sur-mesure). Honnêtement, WordPress reste un bon choix pour beaucoup de sites, à condition d'être entretenu ; un site sur mesure coûte plus au départ et dépend d'un prestataire, mais il a moins de pièces à surveiller. Un prix « à partir de » s'obtient avec l'[estimateur](/tarifs).

## Questions fréquentes

**Comment mettre à jour WordPress sans casser son site ?**
Sauvegardez fichiers et base de données, mettez à jour les plugins un par un, puis le thème, puis WordPress, et testez les fonctions critiques après chaque étape. Idéalement, essayez d'abord sur une copie du site.

**Que faire si une mise à jour a cassé mon site ?**
Désactivez le plugin ou le thème en cause, revenez à la version précédente, ou restaurez la sauvegarde complète faite avant. Ne multipliez pas les essais.

**Faut-il un plugin de sécurité et un plugin de cache ?**
Un plugin de sécurité aide mais ne remplace pas les mises à jour. Un plugin de cache accélère le site, sauf si votre hébergeur en fournit déjà un : n'en activez qu'un.

**Que faire quand un plugin n'est plus maintenu ?**
Cherchez une alternative maintenue ou une fonction native, préparez la migration sur une copie, puis supprimez l'ancien plugin. Un plugin abandonné devient une faille de sécurité.

**Comment mettre à jour la version de PHP de son site ?**
Depuis le panneau de l'hébergeur, après sauvegarde et vérification de compatibilité des thèmes et plugins. Testez le site immédiatement et revenez à l'ancienne version en cas de problème.
