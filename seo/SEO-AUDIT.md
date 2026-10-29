# SEO-AUDIT — stackup-agency.fr (Phase 0, lecture seule)

Constat du **29 octobre 2026**, sur le build de production local de la branche `claude/new-session-26nojr` (commit 65f9a5d, Next 16.4.3).
Données brutes : `seo/inventory.csv` (une ligne par URL, 619 pages explorées dont 580 au sitemap) et `seo/audit-data.json` (anomalies, quasi-doublons).
Régénérer : `node scripts/seo/inventaire.mjs`. Aucune modification du site n'a été faite pendant cette phase.

## 0. Lecture : l'audit externe décrit un état plus ancien

Le brief s'appuie sur un audit externe du 29/10. Plusieurs constats sont **déjà corrigés sur cette branche** (la production, elle, sert encore la page de maintenance : `main` n'a rien de ce travail). État réel point par point :

| Constat du brief | État sur la branche |
|---|---|
| Compteurs de prix : `à partir de0123456789…500€` dans le HTML | **Corrigé** : 0 occurrence ; le DOM contient « à partir de 500 € » en texte |
| Aucun JSON-LD | **Faux sur la branche** : présent sur 100 % des pages (ProfessionalService, WebSite, BreadcrumbList, Service, FAQPage, BlogPosting, CreativeWork, WebApplication). Reste à compléter (§3) |
| Maquettes de l'accueil : h3 « Cuisines, escaliers… » ×4-5, `<h1>` dans le faux code | **Toujours vrai** (§2, C1) |
| Placeholder `[ville]` sur `/plombier` | **Toujours vrai**, et sur 36 autres pages (§2, C2) |
| `lastmod` dans le futur | **Vrai pour 3 URL** (§2, C3) |
| `Host:` dans robots.txt | **Toujours vrai** (§2, I1) |
| Pages ville ~300 mots | **Dépassé** : villes 936-1 249 mots, zones 1 309-2 734, métiers 1 323-1 694 |
| 28 villes, 15 départements | Aujourd'hui : 17 villes, 6 départements, 11 zones (pages retirées ou fusionnées lors de la mission précédente) |
| ~230-300 articles, nombreux doublons | 264 articles ; une grande partie des doublons listés au §2.3 du brief n'existe déjà plus (§4) |

## 1. Chiffres clés

- 580 URL au sitemap (5 sitemaps par type), 0 orpheline, profondeur ≤ 3 clics, 0 canonical divergent, 0 title ou meta en double, 0 page sans h1 ni avec plusieurs h1, 0 image sans alt, 0 saut de niveau de titre.
- Contenu principal médian : article 1 466 mots, métier 1 529, lexique 839, zone 1 519, ville 1 010, **solution 389**, service local 479, réalisation 285.
- Liens sortants : ~70 par page (la grande majorité vient du pied de page et du menu), 331 sur `/blog`.
- Performance mobile (Lighthouse, WebGL logiciel, `next start` local) : accueil 97 (LCP 2,0 s, TBT 100-120 ms), ville 97, métier 98, article 98, tarifs 98 ; CLS 0 à 0,008. **JS transféré : 245-320 ko par page** (budget demandé : < 150 ko) ; accueil 521 ko en non compressé côté Lighthouse. INP non mesurable en laboratoire (TBT en proxy).

## 2. Problèmes (Critique / Important / Opportunité)

### Critique
- **C1. Sémantique de l'accueil polluée par les maquettes** : 19 `<h3>` dont 4× « Cuisines, escaliers et rangements sur mesure » (`src/components/maquettes/blocs.tsx:131`, `src/experiences/strates/calques.tsx:90`), du faux code contenant `<h1>` (`calques.tsx:113`, `src/experiences/methode/Chantier.tsx:116`). La hiérarchie réelle parle de menuiserie, pas de Stackup.
- **C2. Placeholders visibles dans le texte** (`[ville]`, `[métier]`, `[nom]`, `[… à compléter]`) sur 37 pages : `/creation-site-internet/{plombier,couvreur-charpentier,vitrier,courtier-credit,organisme-formation}`, `/services-locaux/creation-site-artisan`, `/blog` (extrait) et 23 articles (liste dans `audit-data.json`, clé `placeholders`). Certains sont des exemples de requêtes (« plombier urgence [ville] ») : à reformuler sans crochets. Les `[SIREN à compléter]` de `/mentions-legales` et `/cgv` sont de vrais manques légaux (INSEE non fourni).
- **C3. Dates futures** : `updated: "2027-02-01"` (`src/content/blog/accessibilite-site-web-guide.md:5`), `"2027-01-25"` (`refonte-site-web-seo-redirections-301.md:5`) → `lastmod` du sitemap et `dateModified` dans le futur ; `/blog` hérite de 2027-02-01.
- **C4. 19 URL en 404 liées depuis 35 endroits** : les entrées du lexique renvoient vers des articles programmés (`/blog/ouvrir-boutique-en-ligne-guide-complet`, `/blog/site-nextjs-explique`…) alors que le blog retire ces liens tant que l'article n'est pas publié et que `src/lib/lexique.ts` ne le fait pas. Cause : bug de ma mission précédente, à corriger en Phase 1.
- **C5. Titles raccourcis automatiquement, donc appauvris** : `titreFinal()` (`src/lib/seo.tsx`) coupe au dernier séparateur (« : ») quand le titre dépasse 60 caractères. Résultat : « Devis en ligne pour artisans » (28) au lieu de « …comment automatiser et gagner du temps » ; 29 pages ont un title < 30 caractères, sans marque ni intention. Il faut un `seoTitle` écrit à la main pour les ~100 articles anciens qui n'en ont pas.
- **C6. Adresse publiée à confirmer** : « 706 rue des Cormiers » figure dans le JSON-LD, les mentions légales, les CGV et les PDF. Le brief la déclare `TODO-SEO` : à confirmer avant la mise en ligne (voir `TODO-HUMAIN.md`).

### Important
- **I1. `robots.txt`** contient `Host: https://stackup-agency.fr` (`src/app/robots.ts:15`), ignoré par Google ; `/lab` et `/contact/merci` sont en Disallow mais non en `noindex` meta.
- **I2. Title de l'accueil** « Stackup Agency — Sites et outils sur mesure, Tours » (`src/app/layout.tsx:13`) : pas de requête principale ; h1 « Sites et outils sur mesure. » sans intention ; meta qui dit « Agence web à Tours » alors que l'atelier est à Savigné-sur-Lathan (positionnement à rendre exact : Touraine, partout en France à distance).
- **I3. Poids JS** : 245-320 ko transférés par page contre 150 ko visés ; à analyser (framework, GSAP, scène 3D chargée avant interaction ?).
- **I4. `<html lang="fr">`** au lieu de `fr-FR` ; sitemap : `priority` présent partout (ignoré par Google) et pas d'`image:image`.
- **I5. Solutions (13 pages)** : 356-458 mots chacune et 58 paires à 15-29 % de phrases communes (record : reservation-restaurant ↔ reservation-location 29 %). Page mince et quasi dupliquée : à réécrire (brief §5.5).
- **I6. Réalisations** : 248 et 285 mots, `/realisations` 137 mots ; pas d'étude de cas (contexte, problème, solution, résultats).
- **I7. 14 pages à ≤ 2 liens entrants** (12 métiers rares : glacier, opticien, vitrier, ramoneur, façadier, terrassier…, plus `/lexique/persona` et `/lexique/signature-electronique`).
- **I8. Liens internes vers des URL qui redirigent** (12) : `/agence-web/departement/{loiret,eure-et-loir,cher,orne,nievre,allier,creuse,deux-sevres}`, `/services/redaction-blog-seo`, `/devis`, deux anciens articles fusionnés : à remplacer par la cible finale.
- **I9. `/blog`** : 12 279 mots et 331 liens sur une seule page (388 ko de HTML) : à paginer (liens `<a>` crawlables) ; les 8 rayons du blog sont en noindex (choix de la mission précédente : listes dupliquées).
- **I10. Données structurées incomplètes** (§3).
- **I11. Meta trop courtes** : 4 meta de 115-118 caractères (`/contact`, `/services/site-vitrine`, 2 rayons) sous les 120 demandés.

### Opportunité
- O1. Pages de zone « Gâtine et vallée du Lathan » et villes proches (Langeais, Bourgueil, Saumur, Chinon…) : vérifier celles qui manquent (la zone Touraine Ouest Val de Loire existe : 28 communes, 2 734 mots).
- O2. Outils gratuits supplémentaires (QR menu, simulateur SaaS vs sur mesure…), études de cas, comparatifs (`/comparatif/` : 3 pages).
- O3. 7 slugs `paa-*` à renommer (301) ; catégories déjà fusionnées en 8 rayons.
- O4. Réassurance et conversion (événements, CTA collant mobile) : Phase 5.

## 3. Données structurées : état réel
Présents : ProfessionalService (adresse, areaServed, priceRange, founder inline, sameAs ×3 LinkedIn/Instagram/Facebook, hasOfferCatalog), WebSite + SearchAction, BreadcrumbList, Service (+offers), FAQPage, BlogPosting, CreativeWork (réalisations), WebApplication (certains outils), DefinedTerm(+Set) pour le lexique, HowTo sur les piliers.
**Manquants** : `Person` autonome (Mathéo Reboul, `@id` `#matheo` seulement cité), `geo`, `openingHoursSpecification` (horaires inconnus), `SoftwareApplication` (Artibox, solutions), `CreativeWork` enrichi (about, dateCreated), `audience` métier sur les Service, `image` par article (`/og.png` générique), `wordCount`/`articleSection` sur BlogPosting, WebApplication sur `/outils/audit-site`. `Organization` et `ProfessionalService` ne sont qu'un seul nœud (acceptable).

## 4. Cannibalisation : état des groupes cités dans le brief
- Déjà résolus (URL absente) : `/blog/prix-site-internet-restaurant-2026`, `pourquoi-votre-restaurant-perd-des-clients…`, `site-vitrine-tours`, `seo-tours-pme`, `site-web-tours-conversion`, `site-web-angers`, `agence-web/orleans`, `site-web-le-mans`, `seo-le-mans-entreprises`, `externaliser-redaction-blog-guide`, `google-search-console-guide-tpe`, `avis-clients-artisan-strategie`.
- **Encore en double (à fusionner, liste à valider)** : `refonte-site-web-{guide,quand-pourquoi,budget,seo-redirections-301}` ; `{cout-site-internet-2026, paa-combien-coute-site-web, tarif-agence-web-france, devis-site-internet-pourquoi-ecarts}` ; `seo-artisan-batiment` ↔ `seo-local-artisan-batiment-2026` ; `ai-overviews-seo-tpe` ↔ `seo-ia-generative-ai-overviews-google` ↔ `chatgpt-apparence-resultats-google` ; `portfolio-{artisan-digital, digital-artisan-art, digital-creatif}` ; `gestion-stocks-digitale` ↔ `gestion-stock-restaurant-digital` ; `avis-google-strategie-complete` ; `fiche-google-business-optimisation` ↔ `google-my-business-guide-commercants` ; `/agence-web/blois`+`site-web-blois`+`seo-blois-entreprises` ; `/agence-web/angers`+`seo-angers-entreprises`.
- Mécanique : page métier ↔ guide métier (`/creation-site-internet/X` ↔ `/blog/guide-site-internet-X`) visent la même requête ; `services/creation-de-site-internet` ↔ pages zones sur « créer un site internet freelance ». Voir `docs/seo/cannibalisation.csv`.
- Quasi-doublons de texte (shingles de 5 mots) : seules les solutions (58 paires, max 29 %), 17 entrées du lexique (max 17 %, vocabulaire commun domaine/DNS/SSL) et 3 services locaux dépassent 15 %. Articles, métiers, villes, zones : aucune paire ≥ 15 %.

## 5. Plan proposé (à valider)
**Phase 1 (technique, sans risque)** : C1-C5, I1-I4, I8, test CI bloquant (placeholder, date future, title/meta, h1, canonical, JSON-LD), sitemap par type étendu (8 sitemaps) + `lastmod` réels, budget Lighthouse CI, `seo/redirects.csv`.
**Phase 2** : `seo/schema.ts` centralisé (`@graph`, `@id` stables), Person, SoftwareApplication, geo, audience, tests de validation.
**Phase 3** : `seo/keyword-map.csv` (10 couches), modèles sur l'accueil, `/tarifs`, 5 métiers prioritaires, 3 villes piliers ; réécriture des 13 solutions ; **liste des fusions d'articles et de villes à valider avant action** (`blog-triage.csv`).
Le brief demande ma validation avant Phase 3 et avant toute fusion de plus de 10 URL : je m'arrête ici.
**Fusion dans `main`** : je la ferai à la fin de toutes les phases ; `main` porte aujourd'hui la page de maintenance (503) qui disparaîtrait avec cette branche.
