# SEO de stackup-agency.fr — mode d’emploi

Tout ce qui touche au référencement vit ici (`seo/`), dans `scripts/seo/` (outils) et dans `docs/seo/` (données de travail : univers de mots-clés, grappes, plan de publication, suivi). Ce fichier dit comment s’en servir.

## Les fichiers livrés
| Fichier | Rôle |
|---|---|
| `SEO-AUDIT.md`, `inventory.csv`, `audit-data.json` | État des lieux (Phase 0), page par page : titres, h1, mots, liens, JSON-LD |
| `keyword-map.csv` | Une page cible par intention (pas de page par formulation) ; régénéré par `scripts/seo/grappes.mjs --keyword-map` |
| `blog-triage.csv` | Garder / Améliorer / Fusionné / Renommé pour chaque article ; régénéré par `npm run seo:triage` |
| `redirects.csv` | Toutes les 301, sans chaîne ; source : `scripts/redirections.mjs` → `src/config/redirections.ts` |
| `content-briefs/` | Un brief par page à créer ou refondre (titre, requête, plan, liens, données à fournir) |
| `OFFSITE-ACTIONS.md`, `offsite/` | Actions hors site et textes prêts à copier |
| `TODO-HUMAIN.md` | Ce que seul le propriétaire peut fournir (SIREN, horaires, avis, accords) |
| `KPIS.md` | Indicateurs, sources et fréquence de lecture |

## Les commandes
```
npm run seo:check        # garde-fous bloquants sur le site de production local (3100)
npm run seo:meta         # longueur et unicité des metas des articles
npm run seo:links        # maillage : pages orphelines, profondeur, liens entrants
npm run seo:report       # inventaire complet → seo/inventory.csv
npm run seo:triage       # triage du blog → seo/blog-triage.csv
npm run seo:conversions  # conversions par page d’entrée, depuis un export de journal
```
Avant : `npm run build && npx next start -p 3100`. La CI (`.github/workflows/seo.yml`) rejoue tout cela et Lighthouse (`lighthouserc.json`) à chaque push.

## Ce que la CI refuse
Un seul h1 ; title de 30 à 62 caractères et unique ; meta description de 120 à 165 et unique ; canonical absolu auto-référent ; `lang="fr-FR"` ; aucune page au sitemap en noindex ; JSON-LD valide, complet par type, questions FAQ présentes dans le texte ; **aucun** `TODO-SEO`, `[ville]`, `[métier]`, `Lorem`, `{{`, `undefined`, `NaN` dans le HTML ; aucune date future ; aucun lien interne cassé ou menant à une redirection ; toutes les URL du sitemap en 200.

## Règles éditoriales (extraits de CLAUDE.md)
- Prix toujours « à partir de », **jamais écrits à la main** : jetons `{{prix:…}}` résolus par le moteur depuis l’Excel `docs/tarifs/`.
- Aucune durée de livraison, aucun « × moins cher », aucun témoignage, chiffre client, logo client ou garantie inventé ; aucun prix, commission ou statistique d’un tiers sans source officielle.
- Positionnement local exact : basé en Touraine (Savigné-sur-Lathan), intervient à Tours et dans la région, partout en France à distance. Aucun local à Tours.
- Pas de pages satellites : une page par intention, chaque page apporte un contenu propre (voir `scripts/seo/duplication.mjs`).
- Les placeholders restent dans `src/config/site.ts` (`[… à compléter]`) et `TODO-HUMAIN.md`, jamais dans une page publiée.

## Politique des robots d’IA
Décision actuelle : **autoriser** les robots de recherche et d’assistants (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, Claude-SearchBot, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, DuckAssistBot, etc.) sur tout le site, sauf `/api/`, `/lab`, `/contact/merci` et les URL à paramètres. Raison : le site vend un service local et gagne à être cité par les assistants ; le contenu est public, factuel et sous la responsabilité de l’éditeur.
- Définie dans `src/app/robots.ts` (liste `ROBOTS_IA`), documentée pour les assistants dans `/llms.txt` et `/llms-full.txt` (générés par `src/lib/llms.ts` à partir des mêmes données que le site).
- Pour **refuser** l’entraînement sans perdre la citation : passer `Google-Extended`, `Applebot-Extended`, `CCBot`, `anthropic-ai` en `disallow: '/'` ; les robots de recherche (OAI-SearchBot, Claude-SearchBot, PerplexityBot) restent autorisés.
- Revoir cette décision une fois par an ou si un robot nouveau apparaît dans les journaux.

## Ajouter une page sans casser le SEO
1. Vérifier dans `keyword-map.csv` qu’aucune page ne couvre déjà l’intention ; sinon enrichir cette page.
2. Écrire le contenu (données dans `src/data/…` ou Markdown dans `src/content/…`), avec jetons de prix et liens relatifs.
3. Déclarer la route dans `src/config/routes.ts` (alimente sitemap, plan du site et llms.txt).
4. Construire, lancer `npm run seo:check` et `npm run seo:links` ; corriger jusqu’à zéro manquement.
5. Si une URL change : l’ajouter à `scripts/redirections.mjs` (jamais de chaîne), puis relancer ce script.
