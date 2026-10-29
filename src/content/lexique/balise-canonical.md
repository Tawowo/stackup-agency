---
term: "Balise canonical"
title: "À quoi sert la balise canonical ?"
seoTitle: "Balise canonical : définition et usage pour votre SEO"
excerpt: "La balise canonical indique à Google quelle adresse retenir quand plusieurs pages se ressemblent. Définition, exemples et erreurs à éviter."
definition: "La balise canonical est une ligne de code qui désigne, parmi plusieurs adresses au contenu identique ou très proche, celle que Google doit considérer comme la version de référence."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 4
category: "seo"
keywords: ["balise canonical", "canonical définition", "rel canonical", "url canonique", "à quoi sert la balise canonical"]
related: ["contenu-duplique", "redirection-301", "indexation", "noindex", "sitemap-xml"]
sources: ["https://developers.google.com/search"]
---

**La balise canonical dit à Google : « parmi ces adresses qui montrent la même chose, voici la bonne ». Elle évite que votre page se concurrence elle-même et regroupe ses signaux sur une seule URL.**

## À quoi ça sert ?

Une même page peut être accessible par plusieurs adresses sans que vous le sachiez : avec ou sans « www », en http ou en https, avec un paramètre de suivi ajouté à la fin, avec une variante de couleur ou de tri sur une boutique. Pour un visiteur, c'est la même page. Pour un moteur de recherche, ce sont plusieurs adresses à départager.

La balise canonical lui indique laquelle conserver. Sans elle, Google choisit lui-même, et son choix n'est pas toujours celui que vous auriez fait.

## Comment ça marche (en pratique)

Elle se place dans l'en-tête de la page, sous la forme d'un lien : `<link rel="canonical" href="https://exemple.fr/ma-page">`. Elle peut aussi être envoyée dans les en-têtes HTTP, notamment pour des fichiers PDF.

Quelques règles à retenir, détaillées dans la documentation de Google (developers.google.com/search) :

- **C'est un indice, pas un ordre.** Google peut l'ignorer s'il estime qu'une autre adresse est plus pertinente.
- **Utilisez des adresses complètes**, avec le protocole et le nom de domaine, pas des chemins relatifs.
- **Une page peut pointer vers elle-même.** C'est même une bonne pratique : une balise « auto-référente » protège des paramètres ajoutés par des tiers.
- **Une seule balise canonical par page**, et qui mène vers une page qui répond bien (pas une erreur, pas une redirection).
- **Ne la mélangez pas avec noindex.** Les deux envoient des signaux contradictoires : l'une dit « gardez cette version », l'autre « ne gardez rien ».

La canonical n'est pas une redirection. Le visiteur reste sur la page qu'il a ouverte. Si une ancienne adresse ne doit plus servir du tout, la bonne réponse est une redirection 301, pas une balise.

## Exemple concret

Exemple type : un caviste vend du vin en ligne. Sa fiche produit existe à l'adresse normale, mais aussi avec un paramètre de tri (« ?tri=prix ») et avec un paramètre venu d'une newsletter. Trois adresses, une seule fiche.

En plaçant sur chacune une balise canonical vers l'adresse propre, il regroupe les signaux (liens reçus, visites) sur une seule URL. Google n'a plus à deviner, et le caviste évite que trois versions s'éparpillent dans les résultats.

## Les erreurs fréquentes

- **Pointer toutes les pages vers l'accueil.** Google finit par ignorer ces balises et vos pages disparaissent du suivi.
- **Oublier de la mettre à jour** après un changement d'adresse ou de passage en https.
- **Cibler une page qui renvoie une erreur ou une redirection.**
- **Créer une chaîne** : A pointe vers B qui pointe vers C.
- **Compter sur la canonical pour du contenu copié ailleurs** sans en avoir l'accord. Elle sert à désigner une version de votre contenu, pas à légitimer une copie.
- **La laisser mal configurée par un thème ou une extension.** Vérifiez dans le code source de vos pages ce qui est réellement produit.

Pour contrôler, ouvrez la page, affichez le code source et cherchez « canonical ». L'outil d'inspection d'URL de la Search Console indique aussi quelle adresse Google a retenue.

## Pour aller plus loin

- [Les 10 erreurs SEO fréquentes sur un site](/blog/10-erreurs-seo-site-web)
- [Indexation : pages explorées mais non indexées](/blog/search-console-indexation-explorees-non-indexees)
- [Checklist d'audit SEO technique](/blog/audit-seo-technique-checklist-50-points)
- [Le service référencement](/services/referencement)

## Questions fréquentes

**La canonical est-elle obligatoire ?**
Non, mais elle est utile dès qu'une page peut s'ouvrir par plusieurs adresses. Sur un petit site propre, une balise auto-référente suffit.

**Quelle différence avec une redirection 301 ?**
La 301 envoie le visiteur ailleurs. La canonical laisse le visiteur sur la page et ne s'adresse qu'aux moteurs.

**Google respecte-t-il toujours la balise canonical ?**
Pas toujours. Elle compte comme une recommandation, que Google confronte à d'autres signaux comme les liens et les redirections.

**Dois-je en mettre une sur chaque page ?**
C'est une bonne habitude, à condition qu'elle pointe vers la bonne adresse. Beaucoup de CMS le font automatiquement : vérifiez le résultat.
