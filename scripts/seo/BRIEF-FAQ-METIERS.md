# Brief — questions fréquentes propres à chaque page métier

Lis d'abord `scripts/seo/BRIEF-REDACTION.md` (toutes les règles s'appliquent : vouvoiement, aucun montant en chiffres, aucune durée de livraison de Stackup, aucun témoignage ni chiffre inventé, prudence sur les lois, pas de dénigrement).

Pour **chaque métier de ton lot**, écris **7 questions-réponses** propres à ce métier, destinées à la page `/creation-site-internet/<slug>` (la page parle déjà du site du métier : lis son contenu dans `src/data/metiers.ts` — champs intro, inclus, faq — et dans `src/data/enrichissements/metiers-*.ts` pour ne PAS répéter ce qui y est dit). Nom du métier : champ `metier` de `src/data/metiers.ts`.

Les 7 thèmes (un par question, formulée comme une vraie requête de ce métier, avec son vocabulaire) :
1. **Google Maps et fiche Google** : comment apparaître dans la carte, catégorie à choisir, avis.
2. **Nom de domaine et adresse e-mail professionnelle**.
3. **Devis et factures** : faire un devis plus vite, modèle, logiciel, mentions (sans dépasser le cadre : pas de montant).
4. **Automatiser** les relances, rappels de rendez-vous, impayés, commandes — ce qui a du sens pour CE métier.
5. **Photos, réseaux sociaux, avis** : quoi montrer sur le site de ce métier.
6. **Visibilité** : « mon site n'apparaît pas sur Google » / « comment avoir plus de clients » pour ce métier.
7. **Obligations légales du site** de ce métier (mentions légales, RGPD, règles propres à la profession : prudence, renvoyer aux sources officielles, aucune date ni seuil).

Règles de forme :
- Question : 6 à 16 mots, comme on la tape ou la dit (« Comment un menuisier apparaît-il sur Google Maps ? »). Jamais la même formulation d'un métier à l'autre.
- Réponse : **60 à 110 mots**, concrète, avec des détails du métier (outils, saisons, clients types, contraintes). Aucune phrase recopiée d'un métier à l'autre ; aucun lien ni Markdown ; pas de prix ; pas de « Stackup vous garantit ».
- Ne reprends pas les questions déjà posées dans la page (vérifie la liste existante).

Fichier à écrire : `src/data/enrichissements/metiers-faq-<N>.ts` (N donné par ton lot), exactement :

```ts
import type { ContenuLocal } from './types'

export const FAQ_METIERS: Record<string, ContenuLocal['faq']> = {
  'slug-du-metier': [
    { q: `…`, a: `…` },
    // 7 entrées
  ],
  // un bloc par métier du lot
}
```

Utilise des backticks pour les chaînes (les apostrophes typographiques ’ sont conseillées). Vérifie avec `cd /home/user/stackup-agency && npx tsc --noEmit` et `node scripts/seo/verifier-faq-metiers.mjs <N>` jusqu'à ✓. Ne modifie aucun autre fichier. Réponds en une ligne.
