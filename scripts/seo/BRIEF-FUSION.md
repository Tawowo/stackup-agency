# Brief — fusion d'articles en double en un article de référence

Lis `scripts/seo/BRIEF-REDACTION.md` (règles impératives et format Markdown des articles).

Tu reçois un **article à conserver** (le « gardé ») et un ou plusieurs articles **à fusionner** (les « fusionnés ») qui visent la même intention. Lis-les TOUS en entier (`src/content/blog/<slug>.md`).

Objectif : réécrire le fichier du **gardé** (même slug, même nom de fichier) pour qu'il devienne **l'article de référence complet** de l'intention, meilleur que chacun des anciens :
- garde ce que chaque ancien article avait d'utile et d'unique (méthodes, exemples, listes, cas types, questions de FAQ), supprime les répétitions et les passages creux ;
- **corrige toute incohérence** (chiffres qui se contredisent, définitions différentes) ; retire les statistiques de marché et fourchettes de prix de tiers dont la source n'est pas donnée : décris les facteurs qualitativement. **Aucun montant en euros en chiffres** (jetons `{{prix:…}}` pour les prix de Stackup, « à partir de » toujours) ; pas de durée de livraison de Stackup ; pas de « × moins cher » ;
- structure : réponse directe en gras (2 phrases), h2 reprenant des formulations réelles de requêtes (toutes celles de l'intention : « combien coûte… », « quand… », « comment… »), 1 800 à 3 000 mots, FAQ finale de 5 à 8 questions (`## Questions fréquentes`, question en gras sur sa ligne, réponse sur la suivante), pas de placeholder entre crochets ;
- front matter du gardé : conserve `title` (peut être retravaillé), `date` ; mets `updated: "2026-10-29"` ; réécris `seoTitle` (35 à 60 caractères, requête principale en tête) et `excerpt` (125 à 158 caractères) ; `keywords` = union des mots-clés des articles fusionnés (≤ 8) ; `type` : `guide` si la longueur dépasse 1 800 mots, sinon `question` ; `category` inchangée ; supprime `publishAt` s'il existe ;
- liens internes : conserve et complète les liens utiles vers `/tarifs`, `/services/…`, `/solutions/…`, `/outils/…`, `/lexique/<terme>` et vers d'autres articles qui EXISTENT (`ls src/content/blog`) ; **n'ajoute jamais de lien vers un article fusionné** (ils vont disparaître) ; au moins 6 liens internes contextuels avec ancres descriptives ;
- vérifie avec `cd /home/user/stackup-agency && node scripts/seo/verifier-article.mjs <slug-gardé> && node scripts/seo/verifier-meta.mjs <slug-gardé>` jusqu'à ✓.

Ne supprime pas les fichiers fusionnés (je m'en charge, avec les redirections 301) et ne modifie aucun autre fichier. Réponds en une ligne.
