---
title: "Site adapté au mobile (responsive) : vérifier et corriger"
seoTitle: "Site adapté au mobile : tester et corriger (responsive)"
excerpt: "Votre site est-il bien adapté au mobile ? Testez-le en quelques minutes, repérez les défauts fréquents et corrigez-les, bouton d'appel compris."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 10
tag: "Création de site"
category: "creation"
type: "guide"
keywords: ["mon site est-il optimisé pour mobile", "comment rendre son site adapté au mobile", "un site doit-il être adapté aux mobiles", "comment afficher un bouton appeler sur mobile", "site internet mobile first pourquoi", "mon site ne s'affiche pas correctement sur tablette"]
sources: ["https://developers.google.com/search", "https://web.dev"]
---

**Oui, un site doit être adapté aux mobiles : une grande partie des recherches locales se fait sur téléphone, et Google explore et classe désormais les sites d'abord à partir de leur version mobile.** Pour savoir si le vôtre l'est, ouvrez-le sur votre propre téléphone, lisez-le d'une main, et appelez-vous depuis le bouton de contact : si quelque chose coince, ce guide vous dit où regarder et quoi corriger.

## Un site doit-il être adapté aux mobiles ? Pourquoi le « mobile first »

Il faut distinguer deux raisons, l'une technique et l'autre commerciale.

**La raison technique.** Google applique l'indexation « mobile first » : pour comprendre et classer une page, il utilise en priorité sa version affichée sur téléphone. Si votre version mobile est amputée (menu cassé, texte caché, images manquantes), c'est cette version amputée qui sert de base. La documentation de référence se trouve sur [developers.google.com/search](https://developers.google.com/search).

**La raison commerciale.** Quand un client cherche un plombier, un restaurant ou un coiffeur, il est souvent debout, dans la rue ou chez lui avec le téléphone à la main. Il veut une adresse, un numéro, des horaires, un moyen de réserver. Si la page est minuscule, s'il doit pincer l'écran pour lire, ou si le bouton « Appeler » n'existe pas, il revient en arrière et choisit le suivant.

Le terme « responsive » (adaptatif) désigne un site dont la mise en page s'ajuste à la largeur de l'écran : une colonne sur téléphone, plusieurs sur ordinateur, avec le même contenu. Les bases sont rappelées dans [Qu'est-ce que le responsive design](/blog/quest-ce-que-le-responsive-design).

## Mon site est-il optimisé pour mobile ? Les tests à faire en dix minutes

### 1. Le test à la main, sur un vrai téléphone

C'est le plus fiable. Ouvrez votre site sur votre téléphone, en navigation normale puis en navigation privée. Posez-vous ces questions :

- Le texte se lit-il **sans zoomer** ?
- Pouvez-vous **faire défiler** la page sans qu'elle glisse sur le côté ?
- Tous les **boutons et liens** sont-ils faciles à toucher du pouce, sans toucher le voisin par erreur ?
- Le **menu** s'ouvre-t-il, et les pages importantes sont-elles atteignables ?
- Le **numéro de téléphone** est-il cliquable ?
- Un message, un bandeau ou une fenêtre **masque-t-il** le contenu au chargement ?
- Le **formulaire** de contact est-il utilisable avec le clavier du téléphone ?

Faites ensuite la même chose sur une tablette, en position verticale puis horizontale.

### 2. Le test sur ordinateur

Dans Chrome ou Edge, ouvrez les outils de développement (touche F12), puis le mode « appareil » qui simule des écrans de téléphone et de tablette. C'est pratique pour tester plusieurs largeurs rapidement. Mais ce n'est qu'une simulation : elle ne reproduit ni le toucher réel ni la vitesse d'un réseau mobile.

### 3. Les outils de mesure

Google a retiré fin 2023 son ancien test « d'optimisation mobile » et le rapport correspondant dans la Search Console. Il reste d'autres outils utiles : PageSpeed Insights et les audits intégrés au navigateur (Lighthouse) analysent la version mobile et signalent la taille du texte, la zone tactile des boutons, l'absence de balise d'affichage, la lenteur. La mesure de la vitesse est détaillée dans [Vitesse du site et Core Web Vitals](/blog/vitesse-site-core-web-vitals). Pour un premier avis automatique sur l'ensemble du site, l'[audit de site](/outils/audit-site) est un point de départ.

## Pourquoi mon site n'est pas adapté aux smartphones ?

Les causes se regroupent en quelques familles, de la plus fréquente à la plus rare.

**Un site ancien.** Beaucoup de sites faits il y a plusieurs années ont été conçus pour un écran d'ordinateur, avec des largeurs fixes en pixels. Sur téléphone, ils s'affichent en miniature ou débordent. Corriger cela signifie souvent refaire la mise en page.

**Un thème ou un modèle mal conçu.** Certains modèles se disent adaptatifs mais cassent dès qu'on y insère une grande image, un tableau ou une vidéo.

**La balise d'affichage manquante.** Une ligne de code dans l'en-tête de la page (la balise « viewport ») dit au téléphone d'afficher la page à sa largeur réelle plutôt qu'en réduction d'un écran d'ordinateur. Sans elle, le téléphone rétrécit tout.

**Des éléments à largeur fixe.** Image, tableau, carte, vidéo intégrée ou bloc publicitaire de largeur fixe : un seul suffit à créer un défilement horizontal.

**Des fenêtres intrusives.** Les fenêtres contextuelles qui couvrent l'écran dès l'arrivée sur la page agacent les visiteurs et sont déconseillées par Google.

**Un contenu différent de la version ordinateur.** Si vous masquez sur mobile des textes ou des pages présents sur ordinateur, vous les retirez aussi de ce que Google voit en priorité.

## Mon site ne s'affiche pas correctement sur tablette

Les tablettes tombent dans une zone intermédiaire : plus larges qu'un téléphone, moins qu'un ordinateur. Un site peut être correct à 390 pixels de large et à 1440, mais déraper à 768 ou 1024. Les symptômes classiques : un menu qui reste en mode ordinateur et déborde, des colonnes trop étroites, une image qui dépasse son bloc, un bouton mal placé en orientation horizontale. La correction passe par l'ajout (ou la correction) de points de rupture dans la mise en page, c'est-à-dire des largeurs d'écran où la présentation change. Un bon site se teste sur au moins trois largeurs : téléphone, tablette, ordinateur.

## Comment rendre son site adapté au mobile ?

La réponse dépend de ce que vous avez.

**Si votre site est récent et basé sur un outil actuel** (créateur de site, thème à jour) : les réglages sont souvent dans l'éditeur. Passez en revue la version mobile, ajustez les tailles de texte, réorganisez les sections, supprimez les éléments trop lourds, activez la compression des images.

**Si votre site est ancien** : les retouches coûtent souvent plus cher que ce qu'elles rapportent. Une [refonte de site](/services/refonte-de-site-internet) repart d'une structure adaptative et conserve vos contenus et vos adresses de page utiles.

**Si vous créez un nouveau site** : demandez que la conception parte du téléphone. On dessine d'abord la version étroite, on y met l'essentiel (qui, quoi, où, comment joindre), puis on l'enrichit pour les écrans plus larges. Cette méthode évite d'avoir à « réduire » un site pensé pour ordinateur.

Pour fixer la méthode et le prix d'un projet, un [site vitrine](/services/site-vitrine) démarre à partir de {{prix:une-page}} € ; le prix exact se précise selon le nombre de pages et les fonctions choisies.

### Les points à vérifier ou à corriger

1. **Balise d'affichage** présente dans l'en-tête.
2. **Taille du texte** lisible sans zoom : le texte courant autour de 16 pixels, rarement moins.
3. **Zones tactiles** assez grandes : les recommandations courantes tournent autour de 44 à 48 pixels de côté, avec de l'espace entre deux boutons.
4. **Champs de formulaire** à 16 pixels minimum, sinon certains téléphones zooment automatiquement à la saisie.
5. **Images** à largeur flexible, jamais plus larges que l'écran, compressées.
6. **Tableaux** : faire défiler dans leur bloc, ou les transformer en listes sur petit écran.
7. **Pas de fenêtre contextuelle** qui masque le contenu à l'arrivée.
8. **Même contenu** sur mobile et sur ordinateur.
9. **Navigation simple** : 5 à 7 entrées au plus, bien visibles.
10. **Vitesse correcte** en 4G, pas seulement en wifi.

## Comment afficher un bouton « Appeler » sur mobile ?

C'est l'élément qui compte le plus pour un artisan ou un commerçant. Le principe technique est simple : un lien de type « téléphone » plutôt qu'un simple texte. En code, il s'écrit ainsi :

```html
<a href="tel:+33XXXXXXXXX">Appeler</a>
```

Le numéro est écrit au format international (sans le zéro initial, précédé de +33 pour la France). Sur téléphone, un toucher lance l'appel. Sur ordinateur, le lien ne sert à rien : mieux vaut alors afficher le numéro en toutes lettres.

Quelques bonnes pratiques :

- placez le bouton **en haut de page** (en-tête) et à la fin des pages de prestation ;
- donnez-lui un libellé clair (« Appeler l'atelier ») et une couleur qui ressort ;
- gardez-le visible pendant le défilement (barre d'actions fixe en bas de l'écran), sans masquer le contenu ;
- sur WordPress ou un créateur de site, utilisez le bloc « bouton » et saisissez `tel:` suivi du numéro à la place d'une adresse web ;
- ajoutez un deuxième moyen de contact : formulaire court, e-mail, ou lien vers la messagerie, car tout le monde ne veut pas téléphoner.

Une astuce de contrôle : après modification, appelez-vous depuis votre téléphone, en sortant du wifi.

## Application mobile ou site adapté : que choisir pour mes équipes terrain ?

Une partie des recherches porte sur des outils pour les équipes sur le terrain : suivi de chantier, facturation depuis un smartphone, gestion de stock, caisse sur tablette. La question est de savoir si vous avez besoin d'une « application » à installer, ou d'un outil accessible depuis le navigateur du téléphone.

Un outil web conçu pour le mobile présente trois avantages : il fonctionne sur n'importe quel téléphone sans installation ni passage par un magasin d'applications, il se met à jour d'un coup pour tout le monde, et il peut être utilisé aussi sur ordinateur au bureau. La limite principale : l'accès aux fonctions très spécifiques du téléphone peut être plus restreint, et un usage sans aucun réseau demande une conception particulière. Les arguments pour chaque option sont détaillés dans [Site web vs application mobile : quoi choisir](/blog/hebergement-web-choisir).

Pour un artisan, les besoins de terrain typiques sont : consulter le planning du jour, noter ce qui a été fait sur un chantier, prendre une photo rattachée au dossier, éditer un devis ou une facture sans repasser au bureau. Stackup Agency fabrique ce type d'[outil de gestion sur mesure](/services/logiciel-de-gestion), pensé dès le départ pour le téléphone. Si votre besoin passe par une application distribuée dans les boutiques, cela se discute au cas par cas lors d'un premier échange.

## Quand faut-il refaire le site plutôt que le corriger ?

Corriger a du sens quand le site est récent, avec une base propre, et que les défauts sont ponctuels : un bouton, un tableau, une image. Refaire a plus de sens quand :

- la mise en page entière est faite pour grand écran avec des largeurs fixes ;
- le thème n'est plus mis à jour ;
- le site est lent partout ;
- chaque correction en casse une autre.

Dans ce cas, le plus rentable est de repartir sur une structure adaptative et de reprendre vos textes, vos photos et vos adresses de page. Un échange de quelques minutes sur [la page contact](/contact) suffit généralement à dire si une retouche suffit ou si une refonte s'impose.

## Questions fréquentes

**Faut-il deux sites différents, un pour mobile et un pour ordinateur ?**
Non. Un seul site adaptatif, avec la même adresse et le même contenu, est la solution recommandée. Maintenir deux versions double le travail et multiplie les écarts.

**Mon site s'affiche bien sur mon téléphone mais pas sur celui de mes clients : pourquoi ?**
Les écrans, les navigateurs et les réglages de taille de texte varient. Testez sur plusieurs appareils, vérifiez le cache de votre navigateur et demandez une capture d'écran à votre client pour voir ce qu'il voit.

**Les menus déroulants fonctionnent-ils au toucher ?**
Ceux qui s'ouvrent uniquement au passage de la souris, non. Il faut que le menu s'ouvre au toucher, avec un bouton dédié (le « menu hamburger » ou un menu à rubriques visibles).

**Un site mobile est-il plus lent qu'un site ordinateur ?**
Pas par nature, mais le téléphone dispose d'un processeur et d'un réseau souvent moins puissants. Un site doit donc être plus léger : images compressées, peu de scripts, polices limitées.

**Dois-je prévoir une version mobile spéciale pour les clients âgés ?**
Pas une version à part : un texte plus grand, un contraste fort, des boutons larges et un parcours simple servent tout le monde.
