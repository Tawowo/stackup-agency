---
title: "Vitesse du site et Core Web Vitals : mesurer et améliorer"
seoTitle: "Core Web Vitals : mesurer et améliorer la vitesse"
excerpt: "LCP, INP, CLS : ce que signifient les Core Web Vitals, comment tester la vitesse de votre site gratuitement et quoi corriger en priorité."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 11
tag: "Technique"
category: "technique"
type: "guide"
keywords: ["c'est quoi les core web vitals", "comment tester la vitesse de mon site", "pourquoi mon site est lent sur mobile", "comment améliorer les core web vitals de mon site", "pagespeed insights comment lire les résultats", "c'est quoi le lcp"]
sources: ["https://web.dev", "https://developers.google.com/search"]
---

**Les Core Web Vitals sont trois mesures de l'expérience d'un visiteur sur une page : le temps d'affichage du contenu principal (LCP), la réactivité aux clics (INP) et la stabilité de la mise en page (CLS).** Pour les tester gratuitement, collez l'adresse de votre site dans PageSpeed Insights et regardez d'abord la version mobile.

La vitesse n'est pas qu'une affaire de technique : un site lent fait partir des visiteurs avant qu'ils aient vu votre numéro de téléphone.

## C'est quoi les Core Web Vitals ?

Les Core Web Vitals (« signaux web essentiels ») sont un ensemble de mesures définies par Google pour évaluer l'expérience réelle d'un visiteur sur une page. Elles sont décrites sur [web.dev](https://web.dev). Il y en a trois, qui correspondent à trois questions :

| Mesure | Question posée | Seuil « bon » |
|---|---|---|
| **LCP** (Largest Contentful Paint) | Combien de temps avant que le plus gros élément visible (image, titre) s'affiche ? | 2,5 secondes ou moins |
| **INP** (Interaction to Next Paint) | Quand je touche un bouton ou un menu, la page réagit-elle vite ? | 200 millisecondes ou moins |
| **CLS** (Cumulative Layout Shift) | La page bouge-t-elle pendant le chargement (texte qui saute, bouton qui se déplace) ? | 0,1 ou moins |

Ces seuils sont évalués sur la grande majorité des visites réelles (le 75e centile, c'est-à-dire que trois visites sur quatre doivent atteindre le seuil). Au-delà de 4 secondes pour le LCP, de 500 millisecondes pour l'INP et de 0,25 pour le CLS, la mesure est jugée « mauvaise ». Entre les deux, elle « doit être améliorée ».

## C'est quoi le LCP, l'INP et le CLS ?

**Le LCP** mesure le moment où l'élément principal de la page est visible : une grande photo, un bandeau, un titre. Sur un site d'artisan, c'est souvent l'image du haut de page. Un LCP lent vient d'une image trop lourde, d'un serveur lent ou de scripts qui bloquent l'affichage.

**L'INP** a remplacé en mars 2024 une ancienne mesure appelée FID. Elle observe la réactivité de la page tout au long de la visite : ouverture d'un menu, clic sur un bouton, saisie dans un formulaire. Un INP élevé signale des scripts trop nombreux ou trop lourds.

**Le CLS** détecte les déplacements inattendus. Vous commencez à lire, une image se charge au-dessus, le texte descend, vous touchez le mauvais bouton. Les causes classiques : images sans dimensions déclarées, bandeaux de cookies qui s'insèrent après coup, polices qui changent d'aspect au chargement, publicités ou widgets qui arrivent tard.

## La vitesse du site compte-t-elle pour Google ?

Oui, mais avec nuance. Google a indiqué que l'expérience de page fait partie des signaux utilisés pour classer les résultats, et que la pertinence du contenu reste prioritaire. Une page très pertinente et un peu lente peut passer devant une page rapide mais vide. En revanche, à contenu équivalent, la rapidité est un avantage. Ne comptez pas sur un gain de position spectaculaire en passant de « moyen » à « bon » : le bénéfice le plus certain est ailleurs.

## La vitesse de chargement et le taux de rebond

Le bénéfice le plus tangible est pour le visiteur. Quelqu'un qui cherche un plombier ou un restaurant est pressé, souvent sur téléphone, parfois en réseau mobile moyen. Si la page tarde à s'afficher, il revient au résultat de recherche et clique sur le suivant. Cela explique pourquoi un site lent peut sembler « ne jamais être appelé » alors qu'il est bien placé. Vitesse et appels sont liés : un site rapide donne plus vite le numéro, l'adresse, le bouton de contact. Aucune statistique générale ne remplace la mesure sur votre propre site, avec vos propres visiteurs.

## Comment tester la vitesse de son site gratuitement ?

Trois outils gratuits, complémentaires :

1. **PageSpeed Insights** : vous collez l'adresse d'une page, l'outil analyse la version mobile et la version ordinateur et affiche les trois mesures.
2. **Google Search Console** : un rapport dédié aux Core Web Vitals regroupe vos pages par état (bon, à améliorer, mauvais) à partir de données de visiteurs réels.
3. **Lighthouse**, intégré à Chrome (outils de développement, onglet « Lighthouse ») : une analyse en simulation, utile pour tester une modification avant publication.

Testez plusieurs pages : l'accueil, une page de prestation, une page avec beaucoup de photos, le formulaire de contact. La page d'accueil seule peut masquer des problèmes ailleurs. Testez à plusieurs moments : un seul résultat n'est pas fiable. Pour une analyse plus large et gratuite, l'[audit de site](/outils/audit-site) vérifie aussi la vitesse parmi d'autres points.

## PageSpeed Insights : comment lire les résultats

L'écran contient deux blocs, et la confusion entre les deux est fréquente.

**Les données réelles (« Découvrez ce que vivent vos utilisateurs réels »).** Elles viennent de visiteurs de votre site réellement équipés de Chrome, agrégées sur environ 28 jours. Elles sont les plus proches de ce que Google observe. Si votre site a peu de visites, ce bloc peut être absent : ce n'est pas une anomalie.

**Le diagnostic (« Diagnostiquer les problèmes de performance »).** Il vient d'un test réalisé à l'instant sur un appareil simulé. La note sur 100 se trouve ici, avec une liste d'opportunités (images à compresser, scripts à différer, polices à optimiser). Cette note varie d'un test à l'autre et ne se confond pas avec les Core Web Vitals.

Comment lire : regardez d'abord les données réelles de la version mobile. Si elles sont bonnes, une note moyenne dans le diagnostic n'est pas une urgence. Si elles sont mauvaises, ouvrez la liste des opportunités et traitez celles qui économisent le plus. Les codes couleur sont simples : vert (bon), orange (à améliorer), rouge (mauvais).

## Pourquoi mon site internet est-il lent à charger ?

Les causes se classent par fréquence sur les sites de petites entreprises.

1. **Des images trop lourdes.** Une photo de smartphone peut peser plusieurs mégaoctets, alors qu'une image d'écran bien préparée est beaucoup plus légère.
2. **Trop de scripts.** Chaque extension, chaque widget (chat, carte, avis, réseau social, statistiques) ajoute du code à charger.
3. **Un thème ou un modèle lourd**, conçu pour tout faire.
4. **Un hébergement lent ou saturé**, surtout avec des offres d'entrée de gamme.
5. **Pas de mise en cache**, donc la page est recalculée à chaque visite.
6. **Des polices et des vidéos intégrées sans précaution.**
7. **Un site ancien**, jamais optimisé.

## Pourquoi mon site est-il lent sur mobile ?

Le téléphone cumule trois handicaps : un processeur moins puissant, un réseau parfois moyen, un écran où l'on charge pourtant les mêmes grandes images que sur ordinateur. Ce qui passe sans problème sur un ordinateur en wifi peut devenir pénible sur un téléphone en 4G. D'où l'intérêt de tester en mobile d'abord et de concevoir en partant du téléphone. Le détail est dans [Vitesse mobile : comment accélérer votre site sur smartphone](/blog/vitesse-mobile-optimisation) et dans [Pourquoi votre site charge lentement](/blog/pourquoi-site-charge-lentement).

## Mon site WordPress est très lent : que faire ?

Par ordre d'efficacité :

- **Compresser et redimensionner les images** avant de les mettre en ligne, et utiliser un format moderne si possible.
- **Supprimer les extensions inutiles** et vérifier leur poids.
- **Installer une extension de cache** et la configurer pour votre hébergement.
- **Changer de thème** si celui-ci est très lourd.
- **Mettre à jour PHP** vers une version prise en charge par l'hébergeur et compatible avec vos extensions.
- **Nettoyer la base de données** (révisions, éléments en trop).
- **Vérifier l'hébergement.**

Faites une sauvegarde avant toute modification, et testez ensuite. Sur un site en production, il vaut mieux faire ces travaux sur une copie. Un entretien régulier évite que la lenteur ne revienne : voir [la maintenance](/services/maintenance) et [Maintenance de site web](/blog/maintenance-site-web-guide).

## Mon site Wix est lent : pourquoi, que faire ?

Sur une plateforme comme Wix, vous n'avez pas la main sur le serveur, mais sur le contenu : nombre d'images, taille de ces images, animations, vidéos en arrière-plan, applications ajoutées, nombre d'éléments sur la page d'accueil. Les gestes utiles : alléger les images avant import, retirer les animations d'entrée superflues, limiter les applications aux indispensables, éviter les bandeaux vidéo en plein écran, et scinder les pages trop longues. Les Core Web Vitals de ce type de site dépendent largement de ces choix de contenu.

## Faut-il changer d'hébergeur si mon site est lent ?

Pas forcément. Un hébergeur est en cause quand le **temps de réponse du serveur** est élevé : l'outil de test indique un « délai de réponse du serveur » long dès le début du chargement, sur plusieurs pages et à plusieurs moments. Si, au contraire, le serveur répond vite et que la lenteur vient des images et des scripts, changer d'hébergeur ne réglera rien. Corrigez d'abord le contenu, et ne changez d'hébergeur que si le problème persiste. Le choix d'un hébergement est détaillé dans [Quel hébergement choisir](/blog/paa-hebergement-site).

## Comment optimiser les images de mon site ?

C'est souvent le gain le plus rapide.

- **Redimensionnez** avant l'import : inutile de mettre en ligne une photo de très grande largeur pour un emplacement plus petit.
- **Compressez** avec un outil adapté, et choisissez un format moderne (WebP ou AVIF) quand votre outil le permet.
- **Déclarez les dimensions** de chaque image : cela réduit les sauts de page (CLS).
- **Chargez en différé** les images situées plus bas dans la page, mais pas l'image principale du haut, qui doit s'afficher d'emblée.
- **Nommez les fichiers** et renseignez le texte alternatif : c'est utile pour l'accessibilité et pour le référencement des images. Pour les boutiques, les photos produits suivent les mêmes règles.

## Comment réduire le poids d'une page web ?

Le poids d'une page est la somme de tout ce qu'elle charge. Les leviers :

1. alléger les **images** ;
2. limiter les **polices** (une ou deux familles, quelques graisses) ;
3. retirer les **scripts** inutiles (anciens outils de statistiques, widgets inutilisés) ;
4. éviter les **vidéos** qui se lancent seules ; préférer un lien ou une image cliquable ;
5. activer la **compression** et la **mise en cache** côté hébergement ;
6. supprimer les **styles et scripts** que personne n'utilise plus.

## Comment améliorer les Core Web Vitals de mon site ?

Une méthode en cinq temps :

1. **Mesurez** les pages clés en mobile (PageSpeed Insights, Search Console).
2. **Identifiez la mesure en cause** : LCP, INP ou CLS.
3. **Traitez les causes dominantes** :
   - LCP : l'image principale (taille, format, priorité), le serveur, le code qui bloque l'affichage ;
   - INP : les scripts lourds, les extensions, les menus mal conçus ;
   - CLS : dimensions manquantes, éléments insérés tardivement, polices.
4. **Re-testez** après chaque changement important.
5. **Surveillez** : les données réelles se mettent à jour sur plusieurs semaines, donc patience.

Les détails techniques à jour sont sur [web.dev](https://web.dev).

## Combien coûte l'optimisation de la vitesse d'un site ?

Il n'existe pas de prix standard : tout dépend de l'état du site. Alléger des images et supprimer des extensions est un travail court. Reprendre un thème lourd ou migrer vers un hébergement adapté en est un autre. Un site ancien, empilé de correctifs, coûtera souvent moins cher à **refaire** qu'à optimiser : voir [la refonte](/services/refonte-de-site-internet). Demandez un diagnostic écrit qui dit ce qui sera fait, ce qui ne le sera pas, et comment le résultat sera mesuré, sans promesse de note. Pour obtenir un devis ou un avis, [contactez-nous](/contact).

## Les clients appellent mon concurrent et pas moi : la vitesse est-elle en cause ?

Elle peut l'être, mais elle n'est qu'une explication parmi d'autres : fiche Google moins visible, avis moins nombreux, numéro difficile à trouver, site illisible sur téléphone, réponse trop tardive aux appels. Testez votre site sur votre téléphone en 4G, comme le ferait un client pressé, et comparez-le à celui de votre concurrent. Si le vôtre met visiblement plus de temps à afficher le numéro, vous avez trouvé une piste.

## Questions fréquentes

**Quelle note PageSpeed faut-il viser ?**
La note sur 100 varie d'un test à l'autre. Concentrez-vous sur les trois mesures réelles (LCP, INP, CLS) et sur la facilité d'utilisation du site par un visiteur.

**Les Core Web Vitals s'appliquent-ils à tout le site ou page par page ?**
Page par page, avec une agrégation par groupes de pages dans la Search Console. Une page d'accueil rapide ne garantit pas que les autres le soient.

**Un site statique est-il plus rapide qu'un WordPress ?**
En général oui, parce qu'il n'a pas de base de données ni d'extensions à charger. Mais un site statique mal conçu, avec des images énormes, reste lent.

**Faut-il refaire le site pour qu'il soit rapide ?**
Pas toujours. Si la base est saine, l'optimisation suffit. Si le site est ancien, lourd et difficile à modifier, la refonte est plus durable.

**Un réseau d'entreprise lent peut-il faire croire que mon site est lent ?**
Oui. Testez depuis un autre réseau, et regardez les données réelles de la Search Console plutôt qu'un test isolé.
