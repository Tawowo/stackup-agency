---
title: 'Données structurées : FAQ, avis, horaires dans les résultats Google'
seoTitle: 'Données structurées : à quoi servent-elles vraiment ?'
excerpt: >-
  Schema.org, JSON-LD, rich snippets : ce que les données structurées font (et
  ne font plus) pour un site local, comment les ajouter et les tester.
date: '2027-02-26'
updated: '2027-02-26'
readTime: 11
tag: Référencement
category: seo
type: guide
keywords:
  - données structurées
  - c’est quoi schema.org
  - ajouter des données structurées sur un site
  - rich snippets
  - json-ld artisan
  - données structurées site local
sources:
  - 'https://developers.google.com/search'
  - 'https://web.dev'
publishAt: '2027-02-26'
---

**Les données structurées sont des informations écrites dans le code d’une page, dans un format que les moteurs comprennent sans deviner : nom de l’entreprise, adresse, horaires, produits, questions-réponses. Elles aident Google à comprendre votre site, mais elles ne garantissent ni un meilleur classement ni l’affichage d’un résultat enrichi.**

Le sujet est entouré de promesses exagérées. Certains vendent l’« étoile jaune sous votre lien » ou « la FAQ qui prend toute la place dans les résultats » comme des raccourcis. La réalité est plus sobre, et plus utile à connaître avant d’y consacrer du temps.

## C’est quoi les données structurées ?

Un texte écrit pour un humain se lit bien, mais une machine doit deviner ce qu’il représente. « 12 rue des Lilas, ouvert du mardi au samedi » est limpide pour vous ; pour un robot, ce n’est qu’une suite de mots. Les données structurées étiquettent cette information : « ceci est une adresse », « ceci est un horaire d’ouverture », « ceci est le prix d’un produit ». Elles ne s’affichent pas sur la page : elles sont dans le code, à destination des moteurs de recherche et d’autres programmes.

Le terme technique est « [données structurées](/lexique/donnees-structurees) » ; le vocabulaire qu’on utilise pour les écrire s’appelle schema.org.

### C’est quoi schema.org pour un site local ?

[Schema.org](/lexique/schema-org) est un dictionnaire commun, créé et maintenu par les principaux moteurs de recherche, qui définit des types d’objets (une entreprise locale, un produit, une recette, un événement, une question) et leurs propriétés (nom, adresse, prix, date). Pour un commerce ou un artisan, les types les plus utiles sont :

- **LocalBusiness** et ses sous-types (boulangerie, restaurant, plombier, coiffeur…) : nom, adresse, téléphone, horaires, zone de service ;
- **Organization** : l’identité de l’entreprise, son logo, ses profils officiels ;
- **Product** et **Offer** : pour les produits d’une boutique, avec prix, disponibilité, images ;
- **Service** : pour décrire une prestation et la zone où vous l’exercez ;
- **FAQPage** : pour une page de questions-réponses ;
- **BreadcrumbList** : le fil d’Ariane (Accueil > Services > Chauffe-eau) ;
- **Article** et **Person** : pour un article de blog et son auteur.

## À quoi servent les données structurées pour un artisan ?

Elles remplissent deux rôles distincts, qu’il faut séparer.

1. **Aider Google à comprendre.** Une page de plomberie dont le code déclare « entreprise locale, plombier, zone Touraine, téléphone tel numéro » est plus facile à classer qu’une page où tout est dans des phrases. Ce rôle est discret, sans effet visible, et c’est le plus sûr.
2. **Déclencher des résultats enrichis (rich snippets).** Dans certains cas, Google affiche autour de votre lien des éléments supplémentaires : fil d’Ariane, prix et disponibilité d’un produit, étoiles d’avis, questions. Ce rôle est visible, mais **soumis aux règles de Google**, qui changent et qui décide seul de l’affichage.

Un [rich snippet](/lexique/rich-snippet) n’est donc jamais acquis. Et l’absence de rich snippet ne veut pas dire que vos données sont inutiles.

## FAQ, avis, horaires : qu’est-ce qui s’affiche vraiment ?

Voici où en sont les trois exemples du titre, d’après la documentation de Google au moment où nous écrivons. Vérifiez sur developers.google.com/search avant d’investir du temps, car ces règles évoluent.

### Les FAQ dans les résultats

Google a longtemps affiché des questions-réponses déroulables sous les liens. Il a ensuite fortement restreint cet affichage : il est aujourd’hui réservé, en pratique, à quelques sites institutionnels de référence. Pour un site de TPE, **ne comptez pas** sur ce résultat enrichi. Cela ne signifie pas qu’une section de questions fréquentes est inutile : elle répond aux visiteurs et alimente les réponses directes. Mais l’ajout du balisage FAQPage ne produit plus l’effet visuel d’autrefois. Nous gardons un balisage propre quand il est simple à maintenir, sans en faire une promesse.

### Les avis et les étoiles

Les étoiles sous un lien proviennent d’un balisage d’avis, mais Google n’affiche pas celles que **vous écrivez vous-même sur votre propre entreprise** : un avis balisé sur votre page pour décrire votre propre commerce n’est pas éligible. Les étoiles que vous voyez pour une fiche locale viennent des avis Google de la [fiche d’établissement](/lexique/avis-google), pas de votre code. Pour les produits d’une boutique, les avis réels de clients, balisés correctement sur la fiche produit, peuvent être éligibles, selon les règles en vigueur. Ne balisez jamais des avis que vous avez inventés, copiés d’ailleurs ou qui ne figurent pas sur la page : c’est une infraction aux règles et une cause d’action manuelle de Google.

### Les horaires et les coordonnées

Pour une entreprise locale, Google s’appuie d’abord sur la **fiche Google Business Profile** pour afficher horaires, téléphone et adresse. Le balisage de la page LocalBusiness confirme ces informations et renforce la cohérence entre votre site et votre fiche, ce qui aide Google à vous reconnaître. Il ne remplace pas la fiche. Voyez [créer sa fiche Google Business Profile](/blog/creer-fiche-google-business-profile) et [apparaître sur Google Maps](/blog/apparaitre-google-maps-pack-local).

## Comment ajouter des données structurées sur un site ?

Trois formats existent (JSON-LD, microdonnées, RDFa), mais Google recommande le **JSON-LD** : un bloc de code placé dans la page, séparé du texte visible, donc facile à ajouter, à modifier et à supprimer. Voici un exemple, pour une entreprise fictive :

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Plumber",
  "name": "Dépannage Exemple",
  "url": "https://www.exemple.fr/",
  "telephone": "+33 2 00 00 00 00",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "12 rue des Lilas",
    "postalCode": "37000",
    "addressLocality": "Tours",
    "addressCountry": "FR"
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "08:00",
    "closes": "18:00"
  }],
  "areaServed": ["Tours", "Joué-lès-Tours", "Saint-Cyr-sur-Loire"]
}
</script>
```

La méthode concrète :

1. **Choisissez le type le plus précis** parmi ceux de schema.org pour votre activité ;
2. **Remplissez uniquement ce qui est vrai et visible** sur la page : le balisage doit refléter le contenu réel, pas l’embellir ;
3. **Placez le bloc** dans le code de la page concernée (l’accueil pour l’entreprise, la fiche pour le produit) ;
4. **Testez** avec les outils officiels (voir plus bas) ;
5. **Mettez à jour** quand les horaires ou les prix changent, sinon vous créez des incohérences.

### Avec un CMS ou un site sur mesure

Sur un CMS comme [WordPress](/lexique/wordpress), des extensions ajoutent du balisage automatiquement ; vérifiez ce qu’elles génèrent, car certaines produisent des données erronées ou en double. Sur un site sur mesure, les données se génèrent depuis les contenus du site (nom, horaires, produits), donc elles restent cohérentes avec ce que voit le visiteur. C’est ce que nous faisons sur les sites fabriqués par Stackup Agency : la page de l’entreprise, les fiches de service et le fil d’Ariane sont balisés, sans que vous ayez à y toucher. Les détails du service sont sur la page [référencement](/services/referencement).

Pour une analyse plus complète des types de balisage adaptés aux commerces, lisez aussi [données structurées Schema.org pour les commerces locaux](/blog/donnees-structurees-schema-rich-snippets).

## Comment tester ses données structurées ?

Deux outils officiels, gratuits :

- le **test des résultats enrichis** de Google, qui indique si une page est éligible à un type de résultat enrichi et signale les erreurs ;
- le **validateur de schema.org**, qui vérifie la syntaxe de tout balisage, qu’il soit éligible ou non.

Dans la [Search Console](/lexique/search-console), des rapports « Améliorations » listent les pages avec des données structurées valides, avec avertissements ou en erreur. Le guide [Search Console pour aller plus loin](/blog/google-search-console-guide-avance-seo) montre où les trouver. Une erreur est à corriger, un avertissement signale souvent une propriété facultative qu’on peut ignorer.

Attention : « valide » ne veut pas dire « affiché ». Un balisage correct peut très bien ne produire aucun résultat enrichi, car Google choisit au cas par cas.

### Que faire quand le test signale un problème ?

Lisez le message au lieu de le subir : il nomme la propriété fautive et la ligne concernée. Corrigez d’abord les erreurs, qui bloquent l’éligibilité, puis jugez les avertissements au cas par cas. Après correction, republiez la page, relancez le test, puis demandez une nouvelle exploration dans la Search Console. Gardez une trace de ce que vous avez changé, pour savoir quoi annuler en cas de régression.

## Quelles erreurs éviter ?

- **Balisage de contenu invisible.** Marquer une information qui n’apparaît pas sur la page est contraire aux consignes de Google.
- **Faux avis ou avis auto-attribués**, comme vu plus haut.
- **Incohérences** entre le balisage, la page et la fiche Google : horaires différents, numéro de téléphone différent.
- **Types inadaptés.** Marquer un artisan comme « Product » ou une page de service comme « Article » pour tenter d’obtenir des étoiles.
- **Duplication.** Plusieurs extensions qui génèrent chacune leur bloc, avec des informations contradictoires.
- **Oublier de mettre à jour** après un déménagement ou un changement de tarif.
- **Croire que c’est un levier magique.** Les données structurées complètent un contenu solide, elles ne le remplacent pas.

## Les données structurées valent-elles l’effort pour un petit site ?

Oui pour les bases : entreprise locale, fil d’Ariane, produits d’une boutique, article de blog avec auteur. Elles se mettent en place une fois, coûtent peu à maintenir et clarifient votre site pour les moteurs et pour les assistants qui lisent de plus en plus les pages. Non si l’on y voit une astuce pour apparaître avec des étoiles ou des FAQ en pleine page. Pour un artisan ou un commerçant, les priorités restent la fiche Google, les avis réels, des pages claires par service et la vitesse du site : consultez [les erreurs SEO les plus courantes](/blog/10-erreurs-seo-site-web) et [Core Web Vitals en 2026](/blog/core-web-vitals-2026-guide-technique) pour savoir par où commencer. Un [audit gratuit du site](/outils/audit-site) donne un premier état des lieux, y compris du balisage.

Pour les assistants de recherche à base d’IA, le raisonnement est le même : ils lisent d’abord vos contenus, et un balisage cohérent est un plus, jamais une garantie. Voir [SEO et IA générative](/blog/seo-ia-generative-ai-overviews-google).

## Questions fréquentes

**Les données structurées améliorent-elles mon classement ?**
Pas directement. Google indique qu’elles l’aident à comprendre la page, mais qu’elles ne sont pas un facteur de classement à elles seules. Elles peuvent seulement rendre le résultat éligible à un affichage enrichi.

**Dois-je baliser mes avis clients pour avoir des étoiles ?**
Pas pour votre propre entreprise : ces avis ne sont pas éligibles à l’affichage d’étoiles. Concentrez-vous sur les avis de votre fiche Google, que Google gère lui-même.

**JSON-LD ou microdonnées : lequel choisir ?**
JSON-LD, recommandé par Google : le code est séparé du contenu, plus facile à lire, à tester et à corriger.

**Faut-il un développeur pour ajouter des données structurées ?**
Pas toujours : un CMS avec une extension fiable peut suffire pour les bases. Dès qu’il faut des cas particuliers, un site sur mesure ou une vérification soignée, un développeur évite les erreurs.

**Combien de temps avant de voir un effet ?**
Google doit réexplorer la page, puis décider d’un éventuel affichage : cela peut prendre du temps, et il n’y a pas de garantie. Surveillez les rapports de la Search Console plutôt que les résultats un par un.
