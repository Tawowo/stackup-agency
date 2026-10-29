---
title: "Google Search Console : indexation, « explorée non indexée » et sitemap"
seoTitle: "Search Console : pages explorées non indexées, sitemap"
excerpt: "Ajouter son site, soumettre un sitemap, comprendre « explorée, actuellement non indexée » et faire indexer ses pages : le guide pas à pas."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 12
tag: "Référencement"
category: "seo"
type: "guide"
keywords: ["explorée actuellement non indexée signification", "comment ajouter mon site à la search console", "comment soumettre un sitemap à google", "comment faire indexer mon site rapidement", "détectée actuellement non indexée que faire", "mon site affiche noindex que faire"]
sources: ["https://developers.google.com", "https://support.google.com"]
---

**Search Console est l'outil gratuit de Google qui indique si vos pages sont connues, explorées et indexées, et pourquoi elles ne le sont pas. Pour faire indexer un site : l'ajouter à Search Console, vérifier qu'aucun « noindex » ni blocage ne l'en empêche, soumettre le sitemap, puis demander l'indexation des pages clés avec l'outil d'inspection.**

Le but de cet article est précis : comprendre les messages d'indexation et savoir quoi faire pour chacun. Pour une vue d'ensemble des rapports et des indicateurs, voir [Search Console pour les TPE](/blog/google-search-console-guide-avance-seo) ; pour un usage plus poussé, voir [le guide avancé](/blog/google-search-console-guide-avance-seo).

## C'est quoi Google Search Console, et à quoi sert-elle à un artisan ?

Search Console est un service gratuit de Google qui montre **comment Google voit votre site**. Il répond à des questions concrètes :

- Mes pages sont-elles dans l'index de Google ?
- Sur quelles recherches mon site s'affiche-t-il, et combien de personnes cliquent ?
- Google rencontre-t-il des erreurs en explorant mon site ?
- Mon site est-il utilisable sur mobile ?

Pour un artisan ou un commerçant, l'intérêt est double : savoir si les pages de prestations ou de villes sont bien prises en compte, et repérer rapidement un problème (page bloquée, site désindexé). Elle ne remplace pas la fiche Google, qui est un autre outil pour la présence locale.

## Comment ajouter mon site à la Search Console ?

1. Connectez-vous avec un compte Google, de préférence **celui de l'entreprise** et non un compte personnel d'un prestataire.
2. Ajoutez une **propriété**. Deux types :
   - la propriété **domaine** : elle couvre toutes les versions de l'adresse (avec ou sans www, http ou https). Elle se vérifie par un enregistrement dans la zone DNS du domaine ;
   - la propriété **préfixe d'URL** : elle couvre une adresse précise. Elle se vérifie par un fichier à déposer, une balise dans le site ou un lien avec Google Analytics.
3. **Vérifiez** la propriété selon la méthode proposée.
4. Attendez quelques jours : les données se remplissent progressivement.

### Connecter WordPress

Plusieurs possibilités : l'enregistrement DNS (le plus propre), la balise de vérification collée dans l'extension de référencement que vous utilisez, ou un fichier téléversé à la racine. Si vous n'avez pas accès au DNS, voir [retrouver les accès de son site](/blog/retrouver-acces-site-identifiants-hebergeur).

### Connecter Wix

L'espace d'administration propose, dans les outils de référencement, une connexion guidée à Google. Cherchez la rubrique consacrée à la Search Console dans les réglages SEO de la plateforme. La procédure change selon les versions : suivez l'assistant de votre tableau de bord.

## Comment lire les rapports de la Search Console ?

Trois rapports suffisent pour débuter.

**Performances.** Il montre les requêtes qui font apparaître votre site, le nombre d'**impressions** (affichages dans les résultats), de **clics**, la **position** moyenne et le **CTR**. Le CTR (taux de clics) est simplement le rapport entre les clics et les impressions : une page vue 100 fois et cliquée 5 fois a un CTR de 5 %. Un CTR faible sur une page bien placée suggère un titre ou une description peu engageants.

**Pages (indexation).** Il indique combien de pages sont indexées et pourquoi les autres ne le sont pas. C'est l'objet principal de cet article.

**Sitemaps.** Il liste les plans de site que vous avez soumis et leur état.

Regardez aussi les rubriques d'expérience sur la page (mobile, vitesse) et les alertes de sécurité. Pour comprendre les indicateurs de vitesse, voir [Core Web Vitals](/blog/core-web-vitals-2026-guide-technique).

## C'est quoi un sitemap, et comment le soumettre à Google ?

Un sitemap est un **fichier qui liste les pages de votre site** que vous voulez voir indexées. Il aide Google à les découvrir, surtout sur un site récent ou peu relié depuis l'extérieur. Ce n'est pas une garantie d'indexation : c'est une indication.

### Comment trouver le sitemap de mon site ?

Essayez ces adresses à la suite du nom de domaine :

- `/sitemap.xml` : l'adresse la plus courante, utilisée par de nombreuses plateformes dont Wix ;
- `/sitemap_index.xml` : souvent créée par les extensions de référencement sur WordPress ;
- `/wp-sitemap.xml` : le plan de site natif de WordPress dans les versions récentes.

Vous pouvez aussi regarder le fichier robots.txt (`/robots.txt`), qui indique parfois l'adresse du sitemap.

### Comment créer un sitemap ?

Dans la grande majorité des cas, **vous n'avez pas à le créer** : votre plateforme ou votre extension de référencement le génère et le met à jour. Sur un site sur mesure, il est produit par le site lui-même. Un sitemap doit contenir les pages que vous voulez indexer et écarter celles que vous ne voulez pas (pages de remerciement, pages de test, doublons).

### Comment le soumettre ?

1. Ouvrez Search Console, rubrique **Sitemaps**.
2. Saisissez l'adresse du sitemap (par exemple `sitemap.xml`).
3. Cliquez sur **Envoyer**.
4. Vérifiez que l'état indique « Réussite ». Une erreur signale un fichier introuvable ou illisible.

### « Sitemap soumis mais pages non indexées » : est-ce grave ?

Pas forcément. Le sitemap signale des pages à Google, qui décide ensuite de les indexer ou non selon leur utilité, leur qualité et sa capacité d'exploration. Si beaucoup de pages restent dehors, lisez les motifs dans le rapport « Pages » : ils sont expliqués ci-dessous.

## Explorée, actuellement non indexée : que signifie ce statut ?

Ce statut veut dire que **Google a visité la page mais ne l'a pas mise dans son index**, pour l'instant. Ce n'est pas une erreur technique : c'est une décision de Google, souvent liée à la valeur perçue de la page.

Causes fréquentes :

- **contenu mince** : peu de texte, rien d'original ;
- **contenu très proche d'une autre page** de votre site ou d'un autre site ;
- **page peu reliée** au reste du site, donc jugée secondaire ;
- **site récent** dont Google n'a pas encore évalué la qualité globale ;
- **pages sans intérêt de recherche** (variantes, filtres, archives).

Que faire, dans l'ordre :

1. **Améliorez la page** : texte utile, exemples, photos, réponses précises, informations locales réelles.
2. **Différenciez** les pages proches (une page ville ne doit pas être la copie d'une autre avec le nom changé).
3. **Reliez-la** depuis des pages importantes (menu, accueil, pages liées). Voir [le maillage interne](/blog/maillage-interne-cocon-semantique-seo).
4. **Regroupez ou supprimez** les pages qui n'ont pas de raison d'être.
5. **Demandez à nouveau l'indexation** après amélioration, et patientez.

## Détectée, actuellement non indexée : que faire ?

Ici, Google **connaît l'adresse** (par le sitemap ou un lien) mais **n'a pas encore exploré** la page. Souvent, il l'a mise en attente pour ne pas surcharger le site ou parce qu'il la juge peu prioritaire.

- Sur un **site récent**, c'est normal : attendez quelques jours à quelques semaines.
- Si cela dure, vérifiez que le **site est rapide** et sans erreurs serveur.
- **Reliez** la page depuis le menu ou des pages fortes.
- Vérifiez qu'elle n'est pas **en doublon** d'une autre.
- Si le site est lent ou instable, voir [pourquoi un site charge lentement](/blog/pourquoi-site-charge-lentement).

## Comment demander l'indexation d'une page à Google ?

1. Dans Search Console, collez l'adresse complète de la page dans la barre d'**inspection d'URL**.
2. Lisez le résultat : la page est-elle « sur Google » ? Si non, quel motif ?
3. Cliquez sur **Tester l'URL en direct** pour voir comment Google la lit en ce moment.
4. Si tout est correct, cliquez sur **Demander une indexation**.

Il existe un quota de demandes. Réservez-les aux pages importantes : nouvelle prestation, page ville, article. Une demande n'est pas une garantie : Google décide.

### Combien de temps pour qu'une nouvelle page soit indexée ?

Cela va de quelques jours à plusieurs semaines, sans engagement. Cela dépend de la notoriété du site, de la fréquence de mise à jour, de la qualité de la page et de la façon dont elle est reliée. Un site neuf prend plus de temps.

### Comment forcer Google à indexer son site ?

On ne force pas. On **facilite** : sitemap, liens internes, contenu utile, site rapide, demande d'indexation pour les pages clés, et liens depuis d'autres sites (annuaires, partenaires). Les services qui promettent de « forcer l'indexation » n'ont pas de moyen particulier.

## Mon site affiche « noindex » : comment l'enlever ?

Une balise ou un en-tête **noindex** demande à Google de ne pas indexer la page. Dans Search Console, le motif s'affiche : « Exclue par la balise noindex ». C'est souvent un reste de la phase de construction du site.

- **WordPress** : dans Réglages > Lecture, vérifiez que la case « Demander aux moteurs de recherche de ne pas indexer ce site » est décochée. Contrôlez aussi les réglages de votre extension de référencement, page par page.
- **Wix** et autres plateformes : cherchez l'option de masquage de la page dans les résultats de recherche, dans les réglages SEO de la page.
- **Site sur mesure** : demandez à votre développeur de contrôler la balise et les en-têtes.

Après correction, inspectez l'URL et demandez une indexation. Si **tout le site** est concerné, traitez cela en urgence : il est invisible sur Google.

## À quoi sert le fichier robots.txt ?

Le fichier `robots.txt` indique aux robots d'exploration quelles zones du site ils peuvent visiter. Il sert à éviter l'exploration de zones inutiles (administration, panier, recherche interne), pas à cacher des pages.

Attention à deux erreurs :

- **Bloquer par erreur tout le site** (une ligne `Disallow: /` laissée en place) : le site n'est plus exploré.
- **Croire que robots.txt empêche l'indexation** : une page bloquée peut quand même apparaître dans les résultats, sans description, si d'autres pages la citent. Pour l'exclure de l'index, c'est la balise noindex qui sert, et la page doit rester accessible aux robots pour qu'ils la lisent.

### Page bloquée par le fichier robots.txt : que faire ?

Ouvrez `votre-site.fr/robots.txt`, repérez la règle qui concerne l'adresse, retirez-la ou modifiez-la si le blocage est une erreur. Sur WordPress, ce fichier est souvent géré par l'extension de référencement ; sur d'autres plateformes, par les réglages SEO. Après modification, inspectez l'URL pour voir si Google peut maintenant y accéder.

### Comment savoir si mes visiteurs sont des robots, et les empêcher de remplir mon formulaire ?

Les robots d'exploration de Google ne sont pas ceux qui remplissent vos formulaires : ces derniers sont des robots de spam. On les repère à des messages absurdes ou répétitifs et à des envois sans navigation préalable. Pour s'en protéger sans gêner les visiteurs : champ piège invisible, contrôle du temps de remplissage, limitation du nombre d'envois, ou captcha en dernier recours. Les statistiques de visite ne séparent pas toujours bien robots et humains ; ne vous fiez pas à une hausse soudaine de trafic sans en vérifier l'origine.

## Page en double : « Google a choisi une URL canonique différente »

Deux statuts se ressemblent :

- **« Page en double, l'utilisateur n'a pas sélectionné de page canonique »** : Google voit plusieurs pages identiques et vous n'avez pas indiqué laquelle est la principale.
- **« Page en double, Google a choisi une URL canonique différente de celle de l'utilisateur »** : vous avez indiqué une page principale, mais Google en a choisi une autre.

La **page canonique** est la version de référence d'un contenu qui existe à plusieurs adresses (avec ou sans www, paramètres de suivi, versions imprimables, pages ville quasi identiques). Que faire :

1. **Identifiez** les adresses concernées.
2. **Choisissez** la version à conserver.
3. **Indiquez-la** avec une balise canonique, ou redirigez les autres vers elle (redirection permanente).
4. **Différenciez** vraiment les pages qui doivent rester séparées.
5. **Vérifiez** que le sitemap ne contient que les adresses canoniques.

Faut-il changer l'URL d'une page déjà indexée ? Évitez-le sauf raison forte. Si vous le faites, redirigez l'ancienne adresse vers la nouvelle par une redirection permanente, mettez à jour les liens internes et le sitemap, et signalez la page à nouveau. Voir [les erreurs 404](/blog/erreurs-404-seo-guide) si des anciennes adresses renvoient une erreur.

## Comment savoir si mon site est indexé, et que faire s'il a été désindexé ?

Pour vérifier, deux méthodes :

- Dans Search Console, le rapport **Pages** indique le nombre de pages indexées.
- Dans Google, la recherche `site:votre-site.fr` donne un aperçu des pages connues. Elle est indicative, non exhaustive.

Si le site ou des pages **disparaissent** :

1. Inspectez l'URL : y a-t-il un « noindex », un blocage, une erreur serveur ?
2. Regardez la rubrique des **actions manuelles** et des **problèmes de sécurité** : une sanction ou un piratage sont signalés.
3. Vérifiez que **le domaine et l'hébergement** sont actifs (renouvellement oublié).
4. Contrôlez si une **mise à jour** ou une **refonte** a changé les adresses ou les balises.
5. Corrigez, puis demandez une nouvelle indexation.

### L'indexation mobile-first

Google utilise principalement la **version mobile** d'une page pour l'indexer et la classer. Si votre site cache du contenu sur mobile, ce contenu peut être ignoré. Vérifiez que le texte, les liens et les images importants figurent aussi sur la version mobile. Pour la méthode, voir [l'index mobile-first](/blog/index-mobile-first-google-optimiser-site-mobile).

## Que faire ensuite, concrètement ?

Une routine courte suffit : une fois par mois, ouvrez le rapport « Pages », notez les nouveaux motifs d'exclusion, corrigez ce qui est lié à une erreur (noindex, blocage, 404), améliorez les pages jugées faibles, et suivez l'évolution des impressions. Si vous préférez déléguer ou si le diagnostic dépasse vos compétences, un [audit du site](/outils/audit-site) donne un état des lieux, la page [référencement](/services/referencement) décrit notre accompagnement et vous pouvez [nous écrire](/contact) pour en parler. Pour les repères officiels, la [documentation de Google pour les créateurs de sites](https://developers.google.com/search) fait référence.

## Questions fréquentes

**Faut-il une Search Console si le site est petit ?**
Oui, elle est gratuite et elle vous alerte sur les problèmes d'indexation. Même un site d'une page en bénéficie.

**Search Console remplace-t-elle un outil de statistiques ?**
Non. Elle mesure ce qui se passe avant le clic (affichages, clics, indexation). Un outil de statistiques mesure ce que font les visiteurs sur le site.

**Pourquoi les chiffres de Search Console changent-ils d'un jour à l'autre ?**
Les données arrivent avec un décalage et sont arrondies ou filtrées. Regardez les tendances sur plusieurs semaines plutôt que les variations d'un jour.

**Dois-je supprimer les pages non indexées ?**
Pas systématiquement. Si une page est utile aux visiteurs, améliorez-la. Si elle est inutile ou en doublon, supprimez-la ou redirigez-la.

**Peut-on faire indexer une page sans Search Console ?**
Oui, Google découvre aussi les pages par les liens et le sitemap. Mais sans Search Console vous ne saurez pas quelles pages sont exclues, ni pourquoi.
