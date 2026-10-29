# Brief — titles et meta descriptions des articles anciens

Pour chaque article de ton lot (slugs dans `scripts/seo/articles-meta-a-ecrire.json`, indices donnés), lis le front matter et le début du texte de `src/content/blog/<slug>.md`, puis **écris à la main** deux champs du front matter (ne touche à AUCUN autre champ ni au corps) :

- `seoTitle` : balise title de la page. **35 à 60 caractères**, la **requête principale en tête** (la formulation qu'un artisan ou un commerçant taperait), un bénéfice ou un angle, sans la marque (elle est ajoutée toute seule quand il reste de la place). Pas de « : » en milieu s'il fait perdre le sens. Pas de majuscules à chaque mot. Pas deux seoTitle identiques dans tout le blog (le vérificateur compare avec tous les articles).
- `excerpt` : meta description et chapô. **140 à 158 caractères**, une phrase de bénéfice, une preuve concrète tirée de l'article (méthode, liste, exemple, règle) et une incitation à lire ou à agir. Vous pouvez mentionner « démo avant de signer », « prix affiché » ou « code à vous » **seulement si c'est pertinent et vrai pour l'article** ; jamais de prix chiffré, jamais de durée de livraison, jamais de statistique inventée. Vouvoiement, français naturel, pas de point d'exclamation, pas de « découvrez » en première position, pas de « … ». Deux articles ne doivent pas avoir la même meta.

Règles du projet : lis `scripts/seo/BRIEF-REDACTION.md` (section « Interdits absolus »).
Édition : utilise l'outil Edit sur la ligne `excerpt:` (conserve les guillemets doubles et échappe-les au besoin) et ajoute/remplace la ligne `seoTitle:` juste après `title:`. Conserve `title`, `date`, `updated`, `category`, etc. tels quels.
Vérification : `cd /home/user/stackup-agency && node scripts/seo/verifier-meta.mjs <slug> <slug> …` jusqu'à ✓ pour tous les slugs de ton lot. Ne modifie aucun autre fichier. Réponds en une ligne.
