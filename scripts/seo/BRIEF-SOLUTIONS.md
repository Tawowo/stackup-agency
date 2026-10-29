# Brief — pages « solutions » (modules de l'outil de gestion), référence nationale

Lis `scripts/seo/BRIEF-REDACTION.md` (toutes les règles s'appliquent : vouvoiement, **aucun montant en chiffres** — jetons `{{prix:outil}}`, `{{prix:multi-pages}}`, `{{abo:min}}`, `{{carte:demo}}`, `{{carte:visio}}` —, « à partir de » toujours devant un prix de Stackup, aucune durée de livraison de Stackup, aucun témoignage ni chiffre client inventé, pas de « × moins cher », pas de dénigrement, **aucun prix ni statistique de concurrent ou de marché**).

Chaque page `/solutions/<slug>` existe déjà (lis sa fiche dans `src/data/solutions.ts` : intro, situations, fonctionnalités, FAQ, métiers visés, et le catalogue des modules dans `src/config/tarifs.generated.ts` via les codes). Elle fait aujourd'hui 350 à 450 mots, trop mince et trop proche des autres. Tu écris le **contenu long et propre** de chaque solution de ton lot : **6 sections** (titre h2 + 2 à 4 paragraphes courts de texte ; pas de listes) et **3 questions fréquentes supplémentaires** (distinctes de celles déjà présentes), soit 900 à 1 300 mots par solution :

1. « Le problème, vu depuis le terrain » : 2 ou 3 situations concrètes propres à CE module (cas types **fictifs** annoncés « Exemple type : … »), pas un texte interchangeable.
2. « Comment fonctionne <le module> » : le déroulé réel, étape par étape, du côté du professionnel et du côté de son client ; ce que l'on voit à l'écran ; ce qui est automatique et ce qui ne l'est pas.
3. « Ce que ce module remplace, et ce qu'il ne remplace pas » : comparaison **factuelle et honnête** avec les solutions habituelles de la catégorie (cahier papier, tableur, logiciel du marché, plateforme avec commission, abonnement). Cite les types de solutions, pas de prix, pas de dénigrement ; dis clairement quand une solution du marché est préférable (usage très simple, très peu d'utilisateurs, besoin standard).
4. « Pour quels métiers et avec quelle configuration » : 3 à 5 métiers (liens `[métier](/creation-site-internet/<slug>)` vers des pages qui existent : voir `src/data/metiers.ts`), et la configuration type de modules à combiner (liens `[module](/solutions/<slug>)` vers les 12 autres solutions).
5. « Budget et mise en place » : ce que le prix « à partir de » comprend (jeton `{{prix:outil}}` seulement pour l'outil complet), ce qui le fait varier, l'abonnement facultatif (`{{abo:min}}`, sans engagement), la propriété du code et des données, démo avant de signer (`{{carte:demo}}` € facturée à part, non déduite). Aucune durée.
6. « Ce qu'il faut préparer avant de commencer » : les informations, données et décisions que le client doit rassembler (listes de clients, tarifs, horaires, règles de la maison…), propres au module.

Liens internes : dans le corps, 5 à 8 liens Markdown relatifs au total : `/tarifs#estimer`, `/outils/calculateur-abonnement-saas`, `/solutions/<…>`, `/creation-site-internet/<…>`, `/lexique/<terme>` (slugs de `scripts/seo/lexique/termes.json`), `/blog/<slug>` (articles qui existent : `ls src/content/blog`), ancres descriptives.

Fichier à écrire : **remplace le fichier existant** `src/data/solutions-contenu-<N>.ts` (N donné par ton lot) :

```ts
import type { ContenuSolution } from './solutions-contenu'

export const CONTENU_SOLUTIONS_<N>: Record<string, ContenuSolution> = {
  'slug-de-la-solution': {
    sections: [
      { titre: `…`, paragraphes: [`…`, `…`] },
      // 6 sections
    ],
    faq: [
      { q: `…`, a: `…` },
      // 3 questions
    ],
  },
}
```

Chaînes en backticks, apostrophes typographiques ’. Vérifie avec `cd /home/user/stackup-agency && npx tsc --noEmit` puis `node scripts/seo/verifier-solutions.mjs <N>` jusqu'à ✓. Ne modifie aucun autre fichier. Réponds en une ligne.
