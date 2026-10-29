# Brief : requêtes réelles (questions et problèmes)

Contexte : Stackup Agency (Mathéo Reboul, Tours / Savigné-sur-Lathan, Indre-et-Loire) fabrique des sites et des outils de gestion sur mesure pour artisans, commerçants, TPE et professions libérales. Nous bâtissons l'univers de mots-clés du site : des milliers de requêtes réelles, regroupées ensuite par intention.

Tu écris UNIQUEMENT une liste de requêtes, telles que de vraies personnes les tapent dans Google ou les posent à un assistant, en français :
- minuscules, sans point d'interrogation obligatoire, formulations variées (courtes, longues, familières, fautes d'accent évitées) ;
- des questions (« comment », « combien », « pourquoi », « est-ce que », « faut-il », « quel », « que faire si ») ET des requêtes nominales (« logiciel devis artisan gratuit ») ;
- au moins 40 % formulées comme les « autres questions posées » de Google ;
- aucun doublon ni quasi-doublon (changer un seul mot ne compte pas) ;
- AUCUNE donnée chiffrée inventée dans la requête, aucune marque inventée, aucun nom de personne ; marques réelles autorisées seulement si naturelles (Wix, WordPress, Shopify, Google, Obat, Tolteck, Pennylane, Facebook, Instagram, ChatGPT, PrestaShop, Squarespace, Planity, Doctolib, Pages Jaunes…) ;
- années autorisées : 2026, 2027 ;
- pas de requêtes dénigrant un concurrent précis.

Chaque entrée est un objet JSON :
{"q": "la requête", "theme": "<un thème de la liste>", "etape": "<étape>", "intention": "<intention>", "metier": "<métier concerné ou vide>"}

Thèmes autorisés (copie exacte) : "création site", "refonte", "référencement", "référencement local", "e-commerce", "logiciel de gestion", "IA et automatisation", "facture électronique", "Google Business", "maintenance et sécurité", "obligations légales", "visibilité et clients", "gestion d'entreprise", "prix et devis".
Étapes autorisées : "pas encore conscient" (la personne vit un problème sans penser à un site ni à un outil), "problème" (elle a identifié le problème), "solution" (elle cherche comment le résoudre), "achat" (elle compare ou veut acheter/commander).
Intentions autorisées : "information", "comparaison", "achat", "local", "navigation".

Écris le résultat dans le fichier indiqué (tableau JSON valide, UTF-8, sans commentaire). Vérifie-le avec `node -e "JSON.parse(require('fs').readFileSync('FICHIER','utf8')).length"`. Réponds ensuite en UNE ligne : le chemin et le nombre d'entrées.
