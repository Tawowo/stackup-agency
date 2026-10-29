---
term: "Noindex"
title: "À quoi sert la directive noindex ?"
seoTitle: "Noindex : définition, usage et erreurs à éviter"
excerpt: "La directive noindex demande à Google de ne pas afficher une page dans ses résultats. Définition, usages utiles et piège du noindex oublié en ligne."
definition: "Noindex est une consigne placée dans une page ou dans les en-têtes du serveur qui demande aux moteurs de recherche de ne pas garder cette page dans leurs résultats, tout en la laissant accessible."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 4
category: "seo"
keywords: ["noindex", "balise noindex", "meta robots noindex", "désindexer une page", "noindex définition"]
related: ["indexation", "robots-txt", "crawl", "balise-canonical", "sitemap-xml"]
sources: ["https://developers.google.com/search"]
---

**Noindex est un panneau « ne pas afficher dans Google » accroché à une page. La page reste visible pour qui connaît l'adresse, mais Google la retire de ses résultats. Utile quand il est voulu, désastreux quand il est oublié sur une page importante.**

## À quoi ça sert ?

Toutes les pages d'un site n'ont pas leur place dans les résultats de recherche. Une page de remerciement après un formulaire, un espace client, un panier, une page de résultats de recherche interne : leur présence dans Google n'aide personne et peut diluer la qualité apparente de votre site.

Noindex permet de dire « cette page existe, mais ne la proposez pas aux internautes ». C'est un outil de tri, que l'on emploie avec parcimonie.

## Comment ça marche (en pratique)

Deux écritures équivalentes, décrites dans la documentation de Google (developers.google.com/search) :

- **Dans la page** : une balise meta de type robots, avec la valeur « noindex », placée dans l'en-tête ;
- **Dans les en-têtes HTTP** : l'en-tête « X-Robots-Tag: noindex », utile pour des fichiers comme les PDF.

Quand Google revient explorer la page et lit la consigne, il la retire de ses résultats. Cela prend le temps que Google revienne la visiter, donc la page peut rester affichée un moment.

Le point que l'on confond le plus : **noindex n'est pas robots.txt**.

- Le fichier [robots.txt](/lexique/robots-txt) dit « n'allez pas lire cette page ».
- Noindex dit « lisez-la, mais ne l'affichez pas ».

Si vous bloquez une page dans robots.txt, Google ne peut pas lire la consigne noindex qu'elle contient, et la page peut malgré tout apparaître dans les résultats, sans description. Pour désindexer proprement, laissez donc la page accessible aux robots et ajoutez noindex.

Autres précisions :

1. Ne combinez pas noindex et [balise canonical](/lexique/balise-canonical) vers une autre page : les signaux se contredisent.
2. Une page en noindex doit rester absente de votre plan de site XML.
3. Les liens présents sur une page noindex peuvent, à long terme, cesser d'être suivis.

## Exemple concret

Exemple type : un restaurateur a une page « merci pour votre réservation » qui s'affiche après un formulaire. Elle n'a aucun intérêt pour un internaute qui cherche un restaurant. Il y ajoute noindex. Elle disparaît des résultats, et les clients qui réservent continuent de la voir normalement.

Le piège inverse : pendant la création de son nouveau site, un noindex avait été activé sur toutes les pages pour éviter qu'elles n'apparaissent. Oublié à la mise en ligne, il rend tout le site invisible dans Google.

## Les erreurs fréquentes

- **Oublier le noindex de la phase de test** à la mise en ligne.
- **Cocher « décourager les moteurs de recherche »** dans un CMS et ne plus y penser.
- **Bloquer dans robots.txt** une page qu'on voulait désindexer.
- **Mettre noindex sur une page importante** par mauvaise manipulation d'une extension.
- **Utiliser noindex à la place d'une redirection** quand une page a déménagé.
- **Ne jamais vérifier.** L'inspection d'URL de la Search Console indique si la page est exclue par une balise noindex.

## Pour aller plus loin

- [Pages explorées mais non indexées dans la Search Console](/blog/search-console-indexation-explorees-non-indexees)
- [Pourquoi mon site n'apparaît pas sur Google](/blog/pourquoi-mon-site-n-apparait-pas-sur-google)
- [Audit gratuit de votre site](/outils/audit-site)

## Questions fréquentes

**Noindex supprime-t-il la page de mon site ?**
Non. La page reste en ligne et accessible. Seuls les moteurs de recherche cessent de la montrer.

**Combien de temps avant que la page disparaisse de Google ?**
Cela dépend du passage de Google sur la page. Vous pouvez demander une exploration dans la Search Console pour accélérer.

**Puis-je utiliser noindex sur toutes mes pages de test ?**
Oui, mais pensez à le retirer à la mise en ligne, et mieux vaut protéger l'environnement de test par mot de passe.

**Noindex protège-t-il une page confidentielle ?**
Non. Une page sensible doit être protégée par une connexion. Noindex est une demande, pas une sécurité.
