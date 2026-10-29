---
term: "Erreur 404"
title: "Qu'est-ce qu'une erreur 404 sur un site ?"
seoTitle: "Erreur 404 : définition, causes et que faire"
excerpt: "Une erreur 404 signale qu'une page n'existe pas ou plus. Définition, impact réel sur le SEO, et comment la traiter sans paniquer."
definition: "L'erreur 404 est la réponse d'un serveur quand l'adresse demandée n'existe pas ou plus. Le visiteur voit une page d'erreur au lieu du contenu attendu."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 4
category: "seo"
keywords: ["erreur 404", "page 404", "404 not found", "c'est quoi une erreur 404", "erreur 404 seo"]
related: ["redirection-301", "refonte-de-site", "search-console", "crawl", "indexation"]
sources: ["https://developers.google.com/search"]
---

**Une erreur 404 apparaît quand un visiteur demande une adresse que votre site ne connaît pas. Ce n'est pas une catastrophe en soi : c'est la réponse normale pour une page qui n'existe pas, tant qu'elle ne touche pas des pages qui comptent.**

## À quoi ça sert ?

Le code 404 (« Not Found ») est un message honnête du serveur : « cette page n'est pas ici ». Il évite de faire croire à Google ou au visiteur qu'un contenu existe quand ce n'est pas le cas.

Le sujet n'est donc pas d'avoir zéro erreur 404, mais de savoir lesquelles sont normales et lesquelles trahissent un problème. Google a précisé à plusieurs reprises, dans sa documentation, que des pages 404 sur un site ne pénalisent pas le site entier. Ce qui coûte, c'est de perdre des visiteurs ou des liens utiles sur des pages importantes.

## Comment ça marche (en pratique)

Une 404 survient dans plusieurs cas :

- une faute de frappe dans un lien, à l'intérieur ou à l'extérieur de votre site ;
- une page supprimée ou renommée, sans redirection ;
- une refonte où les anciennes adresses n'ont pas été traitées ;
- une adresse que quelqu'un a simplement inventée ou mal recopiée.

Pour les repérer, la Search Console liste les pages que Google a tenté d'explorer sans succès. Les statistiques de visite montrent aussi les pages d'erreur réellement vues par vos visiteurs.

Selon la situation, trois réponses sont possibles :

1. **La page a un équivalent proche** : posez une [redirection 301](/lexique/redirection-301) vers cet équivalent.
2. **La page est supprimée pour de bon** et n'a pas de remplaçant : laissez la 404 (ou un code 410, qui signale une suppression définitive), avec une page d'erreur utile.
3. **La page devait exister** : c'est une vraie erreur, il faut la remettre en ligne ou corriger le lien qui y mène.

Méfiez-vous aussi de la « fausse 404 » (soft 404) : une page d'erreur qui répond pourtant « tout va bien » au serveur. Google la détecte et la traite comme une erreur ; mieux vaut qu'elle renvoie le bon code.

## Exemple concret

Exemple type : un coiffeur change le nom de la page « tarifs » en « prestations et prix ». Un ancien lien posé sur sa fiche Google mène toujours à l'ancienne adresse et affiche une erreur 404. Il a perdu des clients potentiels qui arrivaient de sa fiche.

Il ajoute une redirection de l'ancienne adresse vers la nouvelle. La fiche fonctionne de nouveau. Pour une page « promotion de Noël » supprimée sans remplaçant, il laisse la 404 mais soigne le message d'erreur.

## Ce qu'il faut vérifier

- **Les liens de votre fiche Google et de vos réseaux sociaux**, qui pointent souvent vers d'anciennes adresses.
- **Le menu et les liens internes** : un lien cassé sur son propre site est une erreur évitable.
- **La page d'erreur elle-même** : un message clair, le menu, une barre de recherche ou des liens vers vos pages principales, et un moyen de vous contacter.
- **Le bon code de réponse**, surtout après une refonte ou un changement d'hébergement.
- **Le rapport de la Search Console**, de temps en temps, pour attraper les erreurs sur des pages qui devraient exister.

Ne redirigez pas toutes vos 404 vers l'accueil : cela déroute le visiteur et brouille les signaux.

## Pour aller plus loin

- [Erreurs 404 et SEO : le guide](/blog/erreurs-404-seo-guide)
- [Site en erreur, page blanche, erreur 500 ou 404](/blog/site-en-erreur-page-blanche-erreur-500-404)
- [Refonte, SEO et redirections 301](/blog/refonte-site-web-guide)
- [Audit gratuit de votre site](/outils/audit-site)

## Questions fréquentes

**Les erreurs 404 font-elles baisser mon classement ?**
Pas globalement. Elles gênent surtout quand elles touchent des pages avec des liens entrants ou du trafic, et dégradent l'expérience des visiteurs.

**Faut-il corriger toutes les erreurs 404 de la Search Console ?**
Non. Corrigez celles qui concernent des pages utiles ou des liens importants, et laissez les autres.

**Quelle différence entre une 404 et une 410 ?**
La 404 dit « introuvable », la 410 dit « supprimée volontairement ». Dans la pratique, Google les traite de façon proche.

**À quoi ressemble une bonne page 404 ?**
Elle explique ce qui se passe en une phrase, garde le design du site et propose les chemins utiles : accueil, services, contact.
