# Offre clubs — mode d’emploi

## Où est quoi
| Quoi | Où |
|---|---|
| Identité légale (SIREN, SIRET, APE, adresse, EI, TVA) | `src/config/company.ts` — source unique ; `SITE.entreprise` (`src/config/site.ts`) en dérive |
| Nom du produit, liens de démo, référence TCSG, mentions FFT, paramètres des CGV, sous-traitants | `src/config/offre-clubs.ts` |
| **Tous les prix** (catégories, options, remises, déplacement) | `src/data/offre-clubs/pricing.ts` (validé par zod) |
| Listes « inclus / non inclus / sur devis » | `src/data/offre-clubs/inclus.ts` |
| Calcul (catégories, pack, 3 fois, annuel, coût par licencié) | `src/domain/clubs/` (pur, testé : `npm test`) |
| Textes de la grande page | `src/data/offre-clubs/contenu.ts` |
| 14 fonctionnalités, 9 pages locales, FAQ | `fonctionnalites-1.ts`, `fonctionnalites-2.ts`, `locales.ts`, `faq.ts` |
| 12 guides | `src/content/clubs-guides/*.md` |
| Pages | `src/app/clubs-de-tennis/`, `src/app/cgv-plateforme/`, `src/app/desinscription/` |
| Simulateur | `src/experiences/clubs/Simulateur.tsx` (+ `src/app/api/clubs/estimation/route.ts`) |

## Changer…
- **un prix, une catégorie, une remise, une option** : `pricing.ts` seulement. Les pages, le simulateur, les tableaux, le JSON-LD, l’e-mail et `llms.txt` suivent. Les textes n’écrivent jamais un montant : ils portent des jetons `{{club:abo-moyen-pack}}` (grammaire dans `src/domain/clubs/jetons.ts`).
- **le nom du produit** : `PRODUCT_NAME` dans `src/config/offre-clubs.ts` (les textes écrivent `{{nom:produit}}`). Les données des guides et des pages suivent ; les chemins d’URL ne changent pas.
- **les liens de démo** : `DEMO` dans `src/config/offre-clubs.ts`. Pour pointer une fonctionnalité vers un écran précis de la démo, ajouter une entrée à `DEMO_ECRANS` (clé = slug de la fonctionnalité).
- **une option** : ajouter une ligne `o(...)` dans `pricing.ts` (identifiant en minuscules-tirets ; `requiert: 'site' | 'logiciel'`, `requiertOption`, `exclusifAvec` pour les conditions ; l’ordre compte : un pré-requis précède son option). Ajouter un test dans `tests/clubs.test.mjs` si elle change le calcul.
- **le témoignage du TCSG** : `REFERENCE.temoignage` dans `offre-clubs.ts` (citation, auteur, rôle, photo) avec l’accord écrit de la personne. Tant qu’il est `null`, la page n’affiche que la référence factuelle.
- **la TVA** : `COMPANY.tva` dans `company.ts` (commentaire `TODO à confirmer`).

## Lire les demandes reçues
- **Estimation envoyée par e-mail** : un e-mail à `CONTACT_TO` (par défaut contact@stackup-agency.fr) avec **toutes les réponses**, le lien pour rouvrir la simulation et l’adresse du club en « répondre à » ; le club reçoit le récapitulatif. Sans `RESEND_API_KEY`, rien n’est envoyé : la demande est journalisée (`[clubs] estimation reçue`).
- **Demande de devis / d’appel** : le formulaire `/contact` arrive prérempli avec la simulation ; il est lu comme toutes les demandes de contact.
- **Opposition à la prospection** : e-mail « Opposition à la prospection » + une ligne JSON `{"desinscription": …}` dans les journaux du serveur. **Tenir une liste de suppression** (feuille de calcul) et ne jamais réécrire à ces adresses.
- **Mesure** (sans cookie, journaux du serveur, ligne `{"mesure": …}`) : `clubs_clic_demo`, `clubs_clic_estimateur`, `clubs_simulateur_commence`, `clubs_simulateur_termine`, `clubs_devis_demande`, `clubs_estimation_envoyee`, avec la page d’entrée et la campagne `utm_source.utm_medium.utm_campaign` (liens des e-mails : ajouter `?utm_source=email&utm_medium=prospection&utm_campaign=<nom>`). Rapport : `npm run seo:conversions journal.log`.

## Vérifier
```
npm run verify                                         # types, lint, tests, build
node --experimental-strip-types scripts/clubs/verifier-contenus.mjs --tous   # honnêteté, jetons, liens, longueurs, unicité
npm run seo:check && npm run seo:links                 # garde-fous du site (serveur de production sur 3100)
E2E_BASE=http://localhost:3100 SHOTS=1 npx playwright test tests/e2e/clubs.spec.ts   # parcours 390 / 768 / 1440 + captures
```
