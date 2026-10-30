# Offre « Clubs de tennis » — mode d’emploi

Tout ce qu’il faut pour faire vivre l’offre sans toucher au reste du site.

## Où sont les choses

| Quoi | Fichier |
| --- | --- |
| Nom du produit, promesse, liens de démo, référence TCSG, mentions FFT | `src/config/offre-clubs.ts` |
| Tous les prix (catégories, options, conditions) | `src/data/offre-clubs/pricing.ts` |
| Inclus / non inclus / sur devis / conditions | `src/data/offre-clubs/inclus.ts` |
| Liste des pages, adresses, requête principale | `src/data/offre-clubs/catalogue.ts` |
| Textes des pages (formules, fonctionnalités, local, guides) | `src/data/offre-clubs/pages/*.ts` |
| FAQ, parcours de la démo, CGV plateforme | `src/data/offre-clubs/faq.ts`, `demo.ts`, `cgv-plateforme.ts` |
| Identité légale de l’entreprise | `src/config/company.ts` |
| Calcul du simulateur (pur, testé) | `src/domain/clubs/simulation.ts` |
| Grande page | `src/experiences/clubs/Offre.tsx` |
| Simulateur | `src/experiences/simulateur-clubs/Simulateur.tsx` |

## Changer un prix

1. Modifier le nombre dans `src/data/offre-clubs/pricing.ts` (ex. `site: { miseEnPlace: 590, mois: 19 }`).
2. `npm test` : la grille est validée (zod) et les montants de référence sont rappelés dans `tests/clubs.test.mjs` ; mettre à jour le tableau `REFERENCE` du test si le changement est voulu.
3. C’est tout : pages, tableaux, simulateur, textes (jetons `{{club:…}}`), e-mails, `llms.txt` et données structurées suivent.

Le pack site + logiciel se recalcule seul (`packDiscount`). Les remises : `packDiscount`, `annualDiscount`.

## Changer le nom du produit

Une ligne : `PRODUCT_NAME` dans `src/config/offre-clubs.ts`. Les textes utilisent `{{produit}}`. Relancer `node --experimental-strip-types --no-warnings scripts/clubs-og.mjs` pour les images de partage.

## Changer les liens de démo

`DEMO.origine` dans `src/config/offre-clubs.ts`. Les liens par rôle s’écrivent `DEMO.role('parent', '/espace')` (ils supposent la démo à jour, avec `?role=`). Nouvelles captures : `node --experimental-strip-types --no-warnings scripts/clubs-captures.mjs --base=https://grand-chelem-platform.vercel.app`.

## Ajouter une option

1. Ajouter l’identifiant dans `OPTION_IDS` et l’objet dans `PRICING.options` (`pricing.ts`) : nom, description, mise en place, prix mensuel (0 sinon), unité (`fixe` ou `page`), condition (`requiert` : `site`, `logiciel`, `assistant-ia` ou `null`), groupe, `simulateur: true/false`.
2. `npm test` (le schéma vérifie qu’aucune option ne manque ni n’est en double).
3. Elle apparaît dans les tarifs, le simulateur (avec sa condition) et `llms.txt` ; le jeton `{{club:option:<id>:mise}}` est disponible pour les textes.

## Ajouter ou modifier une page

- Texte d’une page existante : son objet dans `src/data/offre-clubs/pages/*.ts` (type `PageClub`, règles en tête de `types.ts`).
- Nouvelle page : l’ajouter au catalogue (`catalogue.ts`) et aux données (`pages/*.ts`) ; elle entre dans le sitemap, le plan du site et `llms.txt`.

## Lire les demandes reçues

- **Par e-mail** (si `RESEND_API_KEY` est posée sur Vercel) : chaque « Recevoir l’estimation » ou « Demander un devis » envoie le récapitulatif au club et toutes les réponses à `CONTACT_TO` (par défaut contact@stackup-agency.fr), avec le lien de la simulation.
- **Dans les journaux Vercel** (toujours) : filtrer sur `demande_club` (type, club, catégorie, formule, e-mail) et `opposition` (demandes de désinscription).
- **Mesure d’audience** (journaux, filtre `mesure`) : `clubs_demo`, `clubs_simulateur_commence`, `clubs_simulateur_termine`, `clubs_devis` ; le champ `campagne` porte `utm_source|utm_medium|utm_campaign` des liens d’e-mail.

Pour les e-mails de prospection, utiliser des liens du type `https://stackup-agency.fr/clubs-de-tennis?utm_source=email&utm_medium=prospection&utm_campaign=clubs-37-2026` et mettre dans chaque e-mail le lien `https://stackup-agency.fr/desinscription?email=<adresse>`.

## Vérifier

```
npm test                                  # dont tests/clubs.test.mjs (calcul et grille)
npx playwright test tests/e2e/clubs.spec.ts   # parcours à 390, 768 et 1440 px (serveur sur :3000)
node --experimental-strip-types --no-warnings scripts/clubs-shots.mjs http://localhost:3100   # captures → docs/offre-clubs/screenshots
```

Décisions et points à valider : `DECISIONS.md`. Mots-clés et correspondance page par page : `SEO.md`.
