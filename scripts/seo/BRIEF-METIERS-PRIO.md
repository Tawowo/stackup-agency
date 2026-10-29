# Brief — pages métier prioritaires (SEO national, 22 métiers)

Lis d'abord `scripts/seo/BRIEF-REDACTION.md` (toutes les règles s'appliquent : vouvoiement, aucun montant en chiffres — jetons `{{prix:une-page}}`, `{{prix:multi-pages}}`, `{{prix:boutique}}`, `{{prix:outil}}`, `{{abo:min}}`, `{{carte:demo}}`, `{{carte:visio}}` —, aucune durée de livraison de Stackup, aucun témoignage ni chiffre inventé, pas de dénigrement, prudence sur les lois).

La page `/creation-site-internet/<slug>` existe déjà : lis son contenu actuel (`src/data/metiers.ts`, champs intro, inclus, faq ; `src/data/enrichissements/metiers-*.ts` ; `src/data/enrichissements/metiers-faq-*.ts`). Tu **ajoutes des sections nouvelles** (≈ 800 à 1 100 mots au total par métier) sans répéter l'existant. Elles doivent être **réellement spécifiques au métier** — pas de phrase interchangeable d'un métier à l'autre.

Pour CHAQUE métier de ton lot, écris exactement **5 sections** (titre h2 + 2 à 4 paragraphes courts chacune ; seulement des paragraphes de texte, le gabarit n'affiche pas de listes) :
1. **« Ce que tapent vos clients sur Google »** : 6 à 10 formulations réelles et variées du métier (urgence, prix, près de moi, avis, devis, comparaison), ce que chacune dit de l'intention, et ce que le site doit répondre. Écris les requêtes entre guillemets français « … », avec de vrais noms de lieux seulement s'ils sont de la zone (Tours, Saumur, Chinon…) ; **jamais de crochets** [ville], [métier].
2. **« Les pages d'un bon site de [métier] »** (reformule avec le nom du métier) : l'arborescence idéale : quelles pages, quelles zones d'intervention, quelles galeries ou fiches, quels formulaires, dans quel ordre, et pourquoi.
3. **« Ce que vous devez afficher, et ce qu'il faut éviter »** : contraintes propres au métier (qualifications et assurances à afficher, règles de communication de la profession, hygiène et allergènes, mentions obligatoires, publicité réglementée, etc.). **N'écris que ce dont tu es certain** ; sinon reste général et renvoie à l'organisme officiel nommé (ordre professionnel, DGCCRF, ARS, ministère…), sans seuil ni date.
4. **« Quels outils de gestion pour un [métier] »** : 3 à 5 outils concrets (devis, planning, relances, réservation, catalogue, portail client…), reliés aux pages `/solutions/<slug>` quand elles existent (liste dans `src/data/solutions.ts` : cherche les slugs), en Markdown relatif `[texte](/solutions/…)`. Pas de promesse chiffrée.
5. **« Budget, et erreurs fréquentes »** : fourchette de **prix de Stackup uniquement via les jetons** (toujours « à partir de »), ce qui fait varier le prix pour ce métier, puis 4 erreurs fréquentes des sites de ce métier avec la correction.

Liens internes (Markdown relatif, 4 à 6 dans l'ensemble des sections du métier) : `/tarifs`, `/solutions/<…>`, `/services/<…>` (creation-de-site-internet, referencement-local, site-ecommerce, logiciel-de-gestion…), un guide `/blog/<slug>` qui existe (`ls src/content/blog`), au moins un métier voisin `/creation-site-internet/<slug>`. Ancres descriptives, jamais « cliquez ici ».

Fichier à écrire : `src/data/enrichissements/metiers-prio-<N>.ts` :

```ts
import type { ContenuLocal } from './types'

export const SECTIONS_PRIO: Record<string, ContenuLocal['sections']> = {
  'slug-du-metier': [
    { titre: `…`, paragraphes: [`…`, `…`] },
    // 5 sections
  ],
}
```

Chaînes en backticks ; apostrophes typographiques ’ conseillées. Vérifie avec `cd /home/user/stackup-agency && npx tsc --noEmit` puis `node scripts/seo/verifier-metiers-prio.mjs <N>` jusqu'à ✓. Ne modifie aucun autre fichier. Réponds en une ligne.
