# Brief — pages « comparatif / alternative » (format Pilier)

Lis `scripts/seo/BRIEF-REDACTION.md` (vouvoiement, **aucun montant en chiffres** : jetons `{{prix:une-page}}`, `{{prix:multi-pages}}`, `{{prix:boutique}}`, `{{prix:outil}}`, `{{abo:min}}`, `{{carte:demo}}`, `{{carte:visio}}`, « à partir de » toujours devant un prix Stackup, aucune durée de livraison, aucun témoignage ni chiffre client, pas de « × moins cher », aucune mention « hébergement France »).

**Règles propres aux comparatifs**
- **Aucun prix, commission, taux ni statistique d'un service tiers** (non vérifiables) : écris « consultez la grille actuelle de l'éditeur ». Pas de dénigrement : reconnais où le service tiers est le meilleur choix (démarrage, volume, visibilité sur une place de marché, besoin standard).
- Positionnement Stackup : démo avant paiement, prix affichés, pas d'abonnement obligatoire, code et données à vous, fait main sans WordPress ni Wix. Basé en Touraine (Savigné-sur-Lathan), intervient à Tours et dans toute la région, partout en France à distance. Aucun local à Tours.
- Chaque page : `reponse` en 2 phrases (réponse directe), 7 à 9 sections (id a-z0-9-, titre h2 repris d’une vraie question de recherche), 1 tableau `comparaison` (7 à 9 lignes, critères réels : propriété des données, coûts récurrents, personnalisation, visibilité, dépendance, export, contrat), 3 `exemples` types FICTIFS annoncés « Exemple type », 8 à 10 FAQ, `liens` (6 à 10, chemins qui existent), `maj: '2026-10-29'`, `type: 'comparatif'`. Longueur totale 1 300 à 1 900 mots.
- Liens Markdown dans le texte : 6 à 10 au total vers `/tarifs#estimer`, `/solutions/<slug>` (`ls src/app/solutions` ou `src/data/solutions.ts`), `/creation-site-internet/<métier>` (`src/data/metiers.ts`), `/lexique/<terme>` (`scripts/seo/lexique/termes.json`), `/blog/<slug>` (`ls src/content/blog`), `/comparatif/…`. Vérifie que chaque cible existe.
- Sources officielles facultatives (domaines autorisés listés dans `src/data/piliers/types.ts`).
- Modèle de format : `src/data/piliers/shopify-ou-boutique-sur-mesure.ts` (lis-le en entier). Mêmes types (`Pilier`).

**Fichiers à écrire** (un par page) : `src/data/piliers/<slug>.ts` exportant `export const PILIER: Pilier = {…}` avec `chemin: '/comparatif/<slug>'`. `titleSeo` ≤ 60 caractères (sans marque), `descriptionSeo` 120–155.
Vérifie : `npx tsc --noEmit`. N’écris rien d’autre (les routes sont créées par l’orchestrateur). Réponds en une ligne.
