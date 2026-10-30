# Offre « Clubs de tennis » — décisions

Une ligne par décision, avec la raison. Date : 30 octobre 2026.

## Cadre

- **Exception à la règle « aucune offre site association » (CLAUDE.md, règle 8)** : demande explicite du propriétaire. L’offre clubs est un produit à part (plateforme par abonnement, licence d’utilisation), pas une déclinaison « site association » de l’offre agence ; CLAUDE.md le précise désormais.
- **Nom du produit** : `PRODUCT_NAME = 'Stackup Club'` dans `src/config/offre-clubs.ts` ; tous les textes passent par le jeton `{{produit}}`.
- **Aucune API d’IA dans le site** (règle 9) : l’assistant IA est une option du produit vendu, rien n’est appelé depuis stackup-agency.fr.

## Prix

- **Source unique** : `src/data/offre-clubs/pricing.ts`. Le pack n’est jamais écrit : `tarif(c, 'pack')` = (site + logiciel) × 0,85, mise en place à la dizaine, abonnement à l’euro. Les montants du brief sont retrouvés exactement (tests).
- **Grille distincte de l’Excel de l’agence** : l’offre clubs a sa propre grille, fixée par le propriétaire ; le moteur `src/domain/devis/` (Excel) reste celui de l’agence.
- **Validation zod dans les tests** (`pricing.schema.ts`, appliqué par `npm test`) et types TypeScript dans la grille : zod ne part pas dans le JavaScript du navigateur (simulateur 82 → 98 sur Lighthouse mobile).
- **Jetons de texte** `{{club:…}}` (`src/lib/jetons.ts`) : aucun montant écrit en chiffres dans les contenus rédigés.
- **Coût par licencié** : abonnement × 12 ÷ licenciés, arrondi aux 10 centimes, pour un « club type » par catégorie (35, 100, 220, 400, 650 licenciés : hypothèses affichées comme telles).
- **Mise en place du simulateur** = formule + mise en place des options + heures d’accompagnement en plus (tranches de 30 min) ; payable en 1 ou 3 fois (la dernière échéance absorbe l’arrondi au centime).
- **Remise annuelle** sur tout l’abonnement (formule + options) ; le pack ne remise pas les options.
- **Catégorie** = licenciés de la saison en cours ; la moyenne des 3 saisons ne sert qu’au message « justificatif » (seuil 90 %).

## Pages et contenus

- **Arborescence** : `/clubs-de-tennis` (grande page) ; `/clubs-de-tennis/<slug>` pour les formules, la région, les départements, padel et pickleball ; `/fonctionnalites/<slug>` ; `/guides/<slug>` ; `/tarifs`, `/simulateur`, `/demo`, `/faq` ; `/cgv-plateforme` ; `/desinscription` (noindex).
- **Catalogue** (`src/data/offre-clubs/catalogue.ts`) : chemins, noms, requête principale ; source du sitemap (`/sitemap-clubs.xml`), du plan du site, du maillage, de `llms.txt`.
- **Contenus rédigés** en données typées (`src/data/offre-clubs/pages/*.ts`, type `PageClub`), rendus par un gabarit unique (`src/gabarits/clubs/PageClub.tsx`) sur le gabarit Document du site.
- **Grande page** : 16 moments nuit / ivoire pilotés par la Lumière existante ; aucune apparition masquée (une découpe pilotée par le défilement a été essayée puis retirée : contenu masqué hors écran, contraire à la règle 6).
- **Captures** : vraies captures de la démo (`scripts/clubs-captures.mjs`), mêmes ratios que les réalisations, affichées dans les appareils du site (`Duo`, `Portable`, `Telephone`).
- **Démo par rôle** : lien `…/demo?role=parent&vers=/espace`, ajouté au dépôt de la démo (branche `claude/great-davinci-w9zjf2`). Tant que ce n’est pas en production, le lien ouvre l’accueil de la démo (choix du rôle).
- **Témoignage TCSG** : aucun texte inventé. Le bloc « À COMPLÉTER » ne s’affiche qu’hors production (`VERCEL_ENV !== 'production'`) ; en production, seule la référence factuelle apparaît.
- **Pages locales** : un angle propre par département (similarité maximale entre deux pages du site : 13,1 %) ; aucun chiffre de clubs ou de licenciés ; distances « environ ».
- **Menu** : « Clubs de tennis » en tête du menu Ressources (une sixième entrée principale cassait l’en-tête en 1024 et 1280 px), colonne dédiée dans le pied de page, lien sous les prix de l’accueil, choix « Je suis un club de tennis » dans l’estimateur.
- **Barre d’appel mobile** : « Estimer mon prix » (au lieu de « Demander ma démo ») sur les pages de l’offre ; masquée sur le simulateur.

## Demandes et mesure

- **Estimation par e-mail et devis** : `/api/clubs` (zod, pot de miel, durée minimale 2 s, 5 demandes / 10 min / IP). Le prix est recalculé côté serveur depuis l’état de la simulation. Resend existant ; sans clé : réponse 202 et ligne `demande_club` dans les journaux.
- **Désinscription** : `/api/desinscription` → e-mail à Mathéo + ligne `opposition` dans les journaux.
- **Mesure** : la mesure anonyme existante garde `utm_source|utm_medium|utm_campaign` pour la session ; événements `clubs_demo`, `clubs_simulateur_commence`, `clubs_simulateur_termine`, `clubs_devis`.
- **Lien partageable** : toute la simulation dans l’adresse (`?l=…&f=…&o=…`), lue côté serveur (page dynamique, comme `/tarifs`).

## Légal

- **Identité** : `src/config/company.ts` (Mathéo REBOUL EI, SIREN 131 637 431, SIRET 131 637 431 00019, APE 62.01Z, RNE 19/10/2026, adresse) ; `SITE.entreprise` en dérive ; mentions, CGV, confidentialité, pied de page, JSON-LD, `llms.txt` et les 11 PDF (`npm run documents`) régénérés.
- **TVA** : « TVA non applicable, art. 293 B du CGI », marqué `TODO à confirmer` dans `company.ts`.
- **CGV plateforme** : textes dans `src/data/offre-clubs/cgv-plateforme.ts` ; les notes `todo` (relecture juridique) ne s’affichent jamais ; avertissement « à faire relire » en commentaire du code.
- **Hébergement** : jamais « en France » ; la localisation des sous-traitants est laissée à compléter dans l’annexe données.

## Ce qui reste à valider (propriétaire)

TVA ; relecture juridique des CGV plateforme (reconduction, plafond de responsabilité, rétractation hors établissement, médiateur, liste des sous-traitants) ; citation, nom, fonction et photo du TCSG ; nom définitif du produit ; mise en production du lien de démo par rôle ; faits locaux et distances ; les 5 automatisations incluses à nommer.
