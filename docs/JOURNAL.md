# Journal du chantier — Stackup Agency V5

## RAPPORT — mission 8 « Offre clubs de tennis » (2026-10-30) — à lire en premier

1. **Offre** `/clubs-de-tennis` (plateforme « Stackup Club », site + logiciel) : grande page en 16 moments, tarifs, simulateur dédié, démo rôle par rôle, FAQ (63 questions), 2 formules, 14 fonctionnalités, région + 6 départements, padel, pickleball, 10 guides, `/cgv-plateforme`, `/desinscription`. Mode d’emploi : `docs/offre-clubs/README.md` ; décisions : `DECISIONS.md` ; mots-clés : `SEO.md`.
2. **Prix** : source unique `src/data/offre-clubs/pricing.ts` (pack calculé, validation zod dans `npm test`), moteur pur `src/domain/clubs/`, jetons `{{club:…}}` ; 14 tests. **Légal** : `src/config/company.ts` (Mathéo REBOUL EI, SIREN/SIRET, APE, RNE) partout, 11 PDF régénérés ; TVA « à confirmer ».
3. **Contrôles (build de production)** : `npm run verify` vert (43 tests) ; e2e clubs 390 / 768 / 1440 ; `seo:check` 0 manquement (617 URL) ; maillage 0 orpheline ; similarité max 13,1 % ; axe 0 violation ; Lighthouse mobile 97-98 (accueil de l’offre, simulateur, tarifs, démo, Indre-et-Loire, guide), LCP ≤ 2,0 s, CLS 0.
4. **Reste au propriétaire** : TVA ; relecture juridique des CGV plateforme ; témoignage TCSG ; nom du produit ; fusion de la démo (`?role=`) en production ; faits locaux ; fusion de cette branche dans `main`.

## RAPPORT — mission 7 « SEO complet, phases 0 à 8 » (2026-10-29) — à lire en premier

1. **Audit** (Phase 0) : `seo/SEO-AUDIT.md`, `inventory.csv` ; correctifs techniques (Phase 1) et JSON-LD centralisé `src/lib/schema.ts` (Phase 2) livrés plus tôt (commits c6d3665, c3073f0, f5496d7).
2. **Contenus (Phase 3)** : 20 métiers prioritaires (5 sections ≈ 1 100 mots chacun, `metiers-prio-1..4.ts`), 15 solutions (6 sections + 3 Q/R, `solutions-contenu-1..3.ts`), 537 Q/R métiers, 7 nouveaux comparatifs + hub `/comparatif` (aucun prix de tiers), études de cas Tennis Club et Artibox, calculateur « abonnement ou sur mesure ».
3. **Blog** : 20 articles fusionnés/renommés (301, 191 redirections, 0 chaîne), 66 articles débarrassés des statistiques et prix de tiers non sourcés, `seo/blog-triage.csv` (`npm run seo:triage`) ; liens vers articles programmés neutralisés (`src/lib/liens-publies.ts`).
4. **Conversion (Phase 5)** : barre d'appel mobile, CTA par catégorie d'article, appel gratuit `/contact?a=appel`, événements `clic_email`, `clic_appel`, `telechargement` + page d'entrée de session ; `npm run seo:conversions journal.log`.
5. **Hors site (Phase 7)** : `seo/OFFSITE-ACTIONS.md`, `seo/offsite/` (textes à copier, 12 publications Google Business). **Phase 8** : `seo/KPIS.md`, `seo/README.md` (politique robots IA), `seo/content-briefs/` (96 briefs, `npm run seo:briefs`), CI : NAP, Lighthouse budgets.
6. **Contrôles (build de production)** : `seo:check` 0 manquement ; maillage 0 orpheline, ≤ 3 clics ; similarité max 13,6 % ; audit HTML 0 remarque ; 191 redirections sans problème ; tests unitaires 29/29.
7. **Reste à votre charge** : `seo/TODO-HUMAIN.md` (SIREN, horaires, fiche Google, avis, relecture des faits juridiques et du calendrier facture électronique, accord du club). Budget JS 150 ko non atteint (245-320 ko). **Fusion dans `main`** : la maintenance (503) de `main` disparaît ; IndexNow seulement après votre accord.

## RAPPORT — mission 6 « renforcer tout le SEO » (2026-10-29) — à lire en premier

1. **Univers** : 65 471 formulations (21 424 avant), 13 128 formulations-types distinctes (hors métier et lieu), 5 575 grappes, 380 pages cibles ; mots courts (têtes de 1 à 3 mots), lexique (24 tournures par terme), 150 métiers × 50 besoins, 272 communes × 12 services, 20 métiers ruraux × 272 communes, outils et comparatifs. Ce sont des formulations PLAUSIBLES (aucun volume mesuré), une carte de couverture : jamais une page par combinaison (`scripts/seo/extensions.mjs`).
2. **Lexique** : `/lexique` + 139 définitions `/lexique/<terme>` (450-800 mots, DefinedTerm + DefinedTermSet + FAQ), pour « c'est quoi X » et les mots courts ; dans le sitemap, le plan du site, `llms.txt`, le menu Ressources et le pied de page.
3. **Pages métier** : 77 métiers × 7 questions propres (Maps, domaine et e-mail, devis, relances, photos, visibilité, obligations) = 539 réponses uniques ; section « métier voisin » nommant les 74 métiers sans page propre rattachés (`metiers-voisins.ts`).
4. **Articles du plan** : 47 écrits (verifier-article ✓) : 12 publiés, 35 programmés mardi et vendredi du 10 novembre 2026 au 9 mars 2027 (`scripts/seo/programmer.mjs`) ; 2 fusions de plus (301 conservées : le script fusionne désormais au lieu d'écraser).
5. **Couverture** (`couverture.mjs`) : grappes bien couvertes 2 047 → 2 970, à enrichir 1 013 → 277. Cannibalisation (`cannibalisation.mjs`) : la page métier et son guide visent la même requête (rôles : vente / conseil, à surveiller en Search Console).
6. **Technique** : flux RSS `/blog/feed.xml`, IndexNow (`scripts/indexnow.mjs`, simulation par défaut, clé dans `public/`), HowTo sur les piliers, audit HTML (titres, alt, liens, balises : 0 remarque), rayons du blog en noindex, auteur allégé (doublon avec le plan du site), numérotation FAQ à 2 chiffres.
7. **Contrôles (build de production)** : 580 URL, 0 erreur ; maillage 0 orpheline, ≤3 clics ; similarité max 12,4 % ; 171 redirections, 0 chaîne ; audit visuel 36 pages × 2 largeurs OK ; axe 0 violation ; Lighthouse mobile 97-98 (accueil 97) ; `npm run verify` vert (29 tests) ; e2e 14/14 ; Next 16.4.3 (avis de sécurité).
8. **Reste à votre charge** : fusionner dans `main` (la production sert la maintenance), INSEE, fiche Google, `node scripts/indexnow.mjs --envoyer` après la mise en ligne, relire les faits juridiques des 139 définitions et 47 articles, inscrire le sitemap dans la Search Console. Les positions ne se jugeront que dans 2 à 6 mois.

## RAPPORT FINAL — mission 5 « référencement, fluidité, identité légale » (2026-10-29) — à lire en premier

1. **Requêtes** : 21 424 requêtes (Search Console réelle + combinaisons métier × ville × besoin + questions), 2 350 grappes, 239 pages cibles, plan de 104 publications (`docs/seo/`). Aucun volume Keyword Planner : classement par grappe et intention, pas par volume.
2. **Pages créées** : 7 piliers de service (2 000-3 000 mots), 2 comparatifs (Shopify, Obat/Tolteck), 4 outils gratuits (modèle de devis, mentions légales, clients perdus, checklist facture électronique), « Stackup Agency en bref », page auteur, recherche, hub des zones + 11 pages d'intercommunalité (Touraine Ouest Val de Loire en tête) avec moteur « Votre commune », 7 villes, 6 départements, 66 articles neufs (dont 6 guides par métier).
3. **Réécrites** : 46 articles modifiés, textes de villes/métiers/départements uniques (`src/data/enrichissements/`), JSON-LD complet (ProfessionalService, Service + offers, FAQPage, BreadcrumbList, Article, HowTo, WebSite + SearchAction), `llms.txt` et `llms-full.txt`, robots ouvert aux robots IA.
4. **Fusionnées / supprimées** : 67 articles fusionnés et 11 retirés (78 fichiers) → 37 redirections 301 (`redirections-articles.json`) ; 169 redirections au total, 0 chaîne, 0 boucle, aucune cible programmée ; rayons du blog en noindex et hors sitemap.
5. **Contrôles (build de production)** : 430 URL du sitemap (5 sitemaps par type), 0 erreur (200, title ≤60 et uniques, description ≤155, un h1, canonical, JSON-LD valide, aucun Markdown brut) ; 0 page orpheline, profondeur ≤3 clics ; pire similarité entre deux pages 12,5 % (seuil 15) ; `npm run verify` vert (29 tests) ; e2e 13/14 puis 7/7 en relançant le test estimateur mobile (flake de timing sous charge) ; axe 0 violation ; `npm run audit:visuel` (nouveau) 34 pages × 2 largeurs, 0 problème.
6. **Perf avant → après** (Lighthouse mobile, WebGL logiciel) : accueil 49 → 95-97, LCP 7,4 s → 2,0 s, TBT 110 ms ; autres pages 98-99, TBT 20-80 ms, CLS 0. Lenis retiré, 3D à la demande (`docs/qa/perf/`). Pas de GPU réel dans le conteneur : à confirmer sur un téléphone.
7. **Légal** : EI « Mathéo Reboul EI — Stackup Agency », Savigné-sur-Lathan, TVA art. 293 B intégrés. **MANQUE : SIREN, SIRET, APE, début d'activité** (avis INSEE non fourni : champs `[… à compléter]` de `src/config/site.ts`, jamais publiés tant qu'ils sont entre crochets), puis `npm run documents`. Médiateur et assurance RCP aussi à fournir.
8. **5 actions hors site** (`docs/seo/PLAN-HORS-SITE.md`) : (1) fiche Google Business Profile complète ; (2) fournir l'avis INSEE ; (3) **fusionner cette branche dans `main`** : la production sert toujours le mode maintenance (503), Google ne voit rien de ce travail ; (4) lien « Site réalisé par Stackup Agency » + premier avis avec le tennis club ; (5) soumettre `https://stackup-agency.fr/sitemap.xml` dans la Search Console.
9. **Ne se jugera que dans 2 à 6 mois** : positionnement des piliers et pages de zone, effet des fusions d'articles, indexation de ~430 URL, apparition dans les réponses d'IA, premiers appels depuis la fiche Google (suivi mensuel : `docs/seo/suivi.csv`, événements `mesure` dans les logs).
10. **À faire relire / vérifier** : faits locaux et réglementaires rédigés de mémoire (zones, facture électronique, métiers réglementés), nom officiel de la zone « Gâtine et Choisilles – Pays de Racan », distances indicatives, `PROMPT-SEO-PUISSANCE.md` reçu vide (0 octet). Next 16.4.0 → 16.4.3 (avis de sécurité) : mise à jour faite, verify vert.


## Mission 5 — décisions (une ligne par décision)

- **A. Fluidité** (fait) : Lenis retiré (dépendance supprimée du package.json : défilement natif partout) ; rendu 3D à la demande (endormi 3,2 s après la dernière activité, éveil au scroll/pointeur/changement d'état), DPR 1–1,5 seulement aux paliers high/ultra ; aucun rendu React au scroll (Chantier, Compilation, Atelier : variables CSS) ; lecture des boîtes `StackFrame` une fois par trame ; intro du hero en CSS pur (LCP 7,4 s → 2,0 s) ; la 3D démarre à la première interaction (ou 10 s), le logo SVG du HTML est affiché d'ici là. Lighthouse mobile : accueil 95-97 (49 avant), autres pages 98-100. Mesures : `docs/qa/perf/`, scripts `perf-trace.mjs`, `perf-profil*.mjs`, `lighthouse.mjs`.
- **C. Référencement** (fait) : une page par intention (pas de page « métier × ville » dupliquée) ; local = pages de zone par intercommunalité (272 communes, 11 EPCI, source officielle) + moteur « Votre commune » sans page par commune ; titres raccourcis automatiquement à 60 caractères (`titreFinal`) ; rayons du blog noindex (listes d'articles dupliquées) ; articles fusionnés quand la grappe est la même (Jaccard) ; mesure d'audience anonyme sans cookie (`/api/mesure`), pas de bandeau ; aucune API d'IA.
- **Date** : les contenus sont datés du 29 octobre 2026 (date réelle), jamais d'une date future.
- **B. Identité légale** (fait, **incomplet : l'avis de situation INSEE n'a pas été joint**) : `SITE.entreprise` porte « Mathéo Reboul EI — Stackup Agency », Savigné-sur-Lathan (37340), TVA 293 B ; SIREN, SIRET, code APE, début d'activité = `[… à compléter]` (mentions, CGV, 11 PDF régénérés, JSON-LD : jamais publiés tant qu'entre crochets). Aucune information de l'homonyme « Mathéo Reboul » (prospection B2B) n'est utilisée.

## Rapport SEO — Search Console (2026-10-29) — à lire en premier

**Production** : `main` contient encore le middleware de maintenance (503 sur toutes les routes, `MAINTENANCE_ACTIVE = true`) : les 24 erreurs 5xx viennent de là. La V5 (cette branche) n'a aucun middleware : 420 URL du sitemap répondent 200 sur le build de production local. **Rien n'est corrigé en production tant que cette branche n'est pas fusionnée dans `main`** (décision du propriétaire).
1. **Chiffres parasites** : les roues du Cadran étaient du texte (colonnes 0-9) ; `aria-hidden` n'empêche pas Google de les lire. Les colonnes sont maintenant du contenu CSS ; le prix n'existe qu'une fois, en `.sr-only`. Vérifié dans le HTML brut de 12 pages puis sur les 420 URL.
2. **Canonical** absente sur `/`, `/tarifs`, `/contact` : ajoutée. Toutes les pages : une seule canonical absolue vers elles-mêmes.
3. **404** : des articles publiés renvoyaient des liens vers des articles programmés (pas encore en ligne) : liens retirés tant que l'article n'est pas publié (58 articles programmés d'ici février 2027). Redirection `idee-mise-en-ligne-10-jours-methode` (cible non publiée) → `/blog`.
4. **Redirections** : 301 en un seul saut, variantes avec barre finale et www comprises (`skipTrailingSlashRedirect` + règles jumelles) ; 105 règles, 0 chaîne, 0 boucle ; 1 171 URL anciennes testées + export Search Console (pages) : 0 problème.
5. **Doublons** : les 21 catégories du blog n'étaient que 9 pages en double (100 % identiques) : 13 redirections 301 vers leurs rubriques ; rubrique de moins de 3 articles = noindex et hors sitemap.
6. **Pages faibles** : villes 325 → 989 mots (texte commun 62 → 20 %), métiers 284 → 848 mots (33 → 11 %), textes locaux uniques et 3 FAQ propres par page (`src/data/enrichissements/`) ; à relire (faits locaux écrits de mémoire).
7. **Sitemap** : plus d'URL qui redirige, 404 ou noindex ; `lastmod` réel (date du dernier commit qui touche le contenu de la famille, `npm run lastmod` ; articles : leur date).
8. **Scripts** : `scripts/controle-sitemap.mjs` (statut, canonical, h1, title/description uniques, prix propres, meta hors contenu), `controle-anciennes-urls.mjs`, `audit-redirections.mjs`, `audit-pages.mjs`, `lastmod.mjs`.
**Reste** : solutions (3 fiches proches : 390 mots) et 2 articles courts à enrichir ; `next build` local s'arrête avec « SecurityFatalError » (version de Next signalée vulnérable) après avoir produit le build : à traiter en mettant Next à jour (non fait sans accord) ; le build Vercel passe.

## Rapport de la mission 4 « réalisations réelles, estimateur pas à pas, documents » (2026-10-15) — à lire en premier

**Prévisualisation Vercel** : https://stackup-agency-o9lxhm2ka-tawowo-s-projects.vercel.app (commit 51e7f1a) (branche `claude/new-session-26nojr`).
`npm run verify` vert (typecheck, lint, 29 tests dont les 3 de référence mis à jour, build) · `npm run test:e2e` : 14 tests (5 raccourcis + parcours perso + étapes sautées, 1440 et 390) · axe WCAG 2.1 AA : 0 violation (23 routes × 2 largeurs) · 426 routes du sitemap ouvertes : 0 défaut · contenu intégral sans JS · `scripts/contraste.mjs` (contraste mesuré sur le rendu WebGL réel) : défauts corrigés, voir « Imparfait ».
1. **Réalisations** : anciennes démos supprimées (7 × 301 → `/realisations`). Tennis Club Savigné-Gizeux (« En ligne ») et Artibox (« En développement », lien « Tester la démo ») avec les captures fournies, rognées et recadrées au même ratio : chaque écran (3D et HTML) est rempli exactement, du haut vers le bas, ordinateur + téléphone réel. Vérifié à 1440/1024/768/390.
2. **Accueil, modules** : 8 cartes (Planning, Clients, Rendez-vous + O31–O35) ; l'écran montre ce que fait chaque module (onde → phrase → devis, carte de conseil IA, statut « Transmise ») ; lien vers la démo.
3. **/solutions** refait autour d'Artibox (captures, catalogue O01–O35 avec automatisation et IA en tête, métiers, prix du moteur) ; 13 fiches liées aux modules, 2 en 301.
4. **Démo 15 € et visio 30 €** : facturées à part, plus aucune « déduction » (Excel v2, moteur, site, e-mails, PDF) ; tests de référence : Hydr'eaux 4 050 €, ToutouBien 4 130 €, Vitrine 500 € (acompte 200 €).
5. **Estimateur pas à pas** : une étape visible, barre « Étape k sur N · nom » (N s'adapte), choix précédents résumés et cliquables, boutons toujours au même endroit, retour en haut + focus au titre, étapes sans objet sautées, recommandation « Notre conseil si vous hésitez », mots simples.
6. **Textes et lisibilité** : phrase du fondateur ; légendes de `/contact` et engagements d'`/a-propos` en vrai texte plein ; portrait détouré (`scripts/portrait.mjs`, fond remplacé par l'ambiance de la marque), cadre de plaques calé sur la photo ; **07 64 02 08 98** partout (icône tel: en barre, pied de page, contact, mentions, JSON-LD, pages locales).
7. **Cahier des charges** : menu Ressources (premier), `/tarifs`, fin de l'estimateur (config reprise), `/contact`, accueil ; envoi à Mathéo (avec la configuration) et PDF téléchargeable.
8. **Documents** : `npm run documents` → 11 PDF (CGV, abonnement, devis + bon de commande, PV, cession, sous-traitance RGPD, rétractation, confidentialité + cookies, guide d'accueil, règlement du parrainage, grille tarifaire) ; variables dans `site.ts`.
9. **Parrainage** : 4 formules en cartes, montants dans `site.ts`, formulaire avec choix de la formule, bonus au 3e filleul.
**Manque / à fournir** : SIRET, médiateur de la consommation, assurance RCP (placeholders `[à compléter]`, `site.ts`) ; textes juridiques à faire relire (`documentsValides: false`) ; captures supplémentaires si souhaitées (aucune manquante).
**Tennis club — robots.txt / sitemap** : NON VÉRIFIABLE (le conteneur n'accède pas au site). Texte du site : « de nombreuses pages », sans chiffre. À lancer depuis votre poste : `node scripts/verifier-robots.mjs https://tennis-club-savigne-gizeux.fr` (dit si GPTBot, ClaudeBot, Google-Extended, PerplexityBot… sont bloqués ; si oui, cela contredit la « visibilité dans les IA » vendue).
**Imparfait** : contraste de la 3D derrière le texte résolu sur mobile en estompant la marque (pages de lecture), pas en déplaçant le texte ; l'audit de contraste saute de longues pages pilotées au scroll (accueil validé par captures) ; JS initial de l'accueil au-dessus du budget (inchangé) ; textes juridiques non relus par un juriste.


## Rapports précédents (résumé)

- **Nuit (14/10)** : V5 construite de bout en bout (accueil en 10 moments, mondes par famille de pages, 300 articles, 432 routes ouvertes sans défaut, axe 0 violation, contenu intégral sans JS, 80 redirections).
- **« Montrer la vraie chose » (14/10)** : chaque animation montre la vraie chose (cinq couches, maquettes réelles, galerie 3D, modules, méthode) ; plaques réduites à la matière et aux transitions.
- **« Grille tarifaire + estimateur » (14/10)** : Excel = source unique (`npm run tarifs`), moteur `src/domain/devis/` testé (3 cas de référence), estimateur `/tarifs#estimer`, prix « à partir de » partout via jetons `{{prix:…}}`.


## Acquis (phases 0 à 4 et « La Fabrique »)

- **Socle.** Next 16 / React 19 / TS strict / Tailwind 4 / three + R3F 9, GSAP + Lenis sur un seul ticker,
  zustand. Ancien site dans `ancien/` (carrière, à supprimer après la phase 6). Dépendances hors liste :
  `@tweakpane/core` (types, dev), `sharp` (logo-check, AVIF, dev).
- **Stack Engine.** Plaque canonique et trois poses du logo dérivées du tracé SVG ; InstancedBufferGeometry,
  layouts A/B dans les attributs, morph en arc avec retard (`aDelay`), lentille, isolation, exclusion du
  titre, bascule au clic (`aFlip`, face produit). Caméra ortho ↔ perspective par mélange de matrices, tangage
  8°. Layouts purs testés (`tests/`). `/lab` + Tweakpane, états par URL.
- **La Fabrique** (`src/webgl/monde/`). Ciel navy `#0B1E36 → #102A4A`, sol d'atelier (grille, ombre projetée,
  torche `uProbe`, dissolution fractale pendant chaque traversée), flux GPU en DataTexture, code vivant tiré de
  nos sources, lampe ambre sur la plaque ambre + poussière. Glissement amorti de boîte en boîte, rail de
  profondeur (≥ 1360 px), inclinaison du téléphone → lumière.
- **Calibrage.** Tout ce qui suit le scroll est en scrub pur : `arriverParScroll` (rampe d'arrivée, forme
  commise, retour identique), `Lumiere` (nuit par frontières `data-nuit`, rampe 40 vh), cadran, seuil, titres.
  `__suSettle(n)` avance la simulation sans rendre : captures et vidéos déterministes sous SwiftShader.
- **Accueil.** Neuf moments (ouverture, strates, offre, pellicule, seuil, machines, prix, méthode, atelier,
  départ) + footer ; ivoire sur 02, 06, 08. **Tarifs** (configurateur → `?c=` → contact) et **contact** (zod
  client + serveur, Resend ; sans clé → 202 `envoye: false`).
- **Outillage QA.** `npm run shots` (1440 / 390, ± mouvement réduit), `logo-check` (seuil 2 %), `videos`
  (trames JPEG → VP8 + planche-contact), sondes `sonde-monde`, `sonde-scroll`, `sonde-issue`.
- **Vercel.** `vercel.json` (`"framework": "nextjs"`) à la racine, `engines.node = 22.x` ; vercel.app
  injoignable d'ici, état lu par l'API GitHub.
- **Ouverts hérités.** Envoi Resend réel non testé (clé à poser sur Vercel) ; bandeau de 07 derrière les étapes
  sur mobile ; cadence réelle à mesurer sur GPU (SwiftShader plafonne à 16 i/s).

## Mission « grille tarifaire + estimateur » (décisions, 1 ligne chacune)
- `exceljs` ajouté en dépendance de dev : seule lib qui lit l'xlsx avec les formules ; sert uniquement à `npm run tarifs`, jamais embarquée dans le site.
- Excel (`docs/tarifs/`) = source unique ; `scripts/tarifs-depuis-excel.mjs` lit par onglet + code → `src/config/tarifs.generated.ts` (151 lignes). Ligne retirée de l'Excel = 0 € / absente après `npm run tarifs`.
- Moteur `src/domain/devis/` : reproduit le Simulateur à l'identique, y compris ses particularités (temps sans variantes boutique ; pages à référencer sans pages en série ; options boutique/outil comptées même si la boutique/l'outil est « Non »). Tests : 3 cas de référence + 5.
- Estimateur `/tarifs#estimer` (`src/experiences/estimateur/`) : 5 raccourcis, 9 étapes passables, récap fixe (fourchette seule), état en URL (`?e=`, zod, `src/domain/devis/etat.ts`) ; ancien configurateur et studio de style supprimés, 301 → `/tarifs#estimer`.
- Fond de l'estimateur : nuit (la chaîne 3D est un canvas derrière le contenu : une section ivoire opaque la masque) ; le contenu est une « feuille » ivoire à gauche, le cadre 3D transparent à droite.
- Contact : `?e=` + `?a=appel|demo` ; le serveur recalcule le prix exact depuis le jeton (jamais depuis le navigateur) et l'ajoute, avec temps estimé et taux horaire, au seul e-mail de Mathéo. Parcours testé : `node scripts/parcours-estimateur.mjs`.
- Délai : CLAUDE.md règle 8 disait « aucune durée affichée » ; la mission demande un délai indicatif issu du moteur → seul ce délai est affiché, toujours « indicatif ».

## Mission 4 « réalisations réelles, estimateur pas à pas, documents » — décisions
- Excel v2 : modules O31–O35 (automatisation et IA) et plus de déduction ; moteur sans `deduction`/`reste` (acompte sur le total), démo 15 € et visio 30 € facturées à part, aucune mention de déduction ni de non-déduction nulle part.
- Réalisations : captures du propriétaire récupérées dans la transcription de la session (images jointes en cours de message), rognées des barres navigateur/iPhone par `scripts/realisations-captures.mjs` (ratio commun par famille, ancrage en haut, AVIF) ; aucune capture inventée. Écran 3D et écran HTML au même ratio.
- Tennis Club : nombre de pages, `robots.txt` et sitemap non vérifiables (le conteneur n'accède pas au site) → texte « de nombreuses pages », résultat « non vérifié » dans le rapport.
- Accueil modules : 8 cartes (Planning, Clients, Rendez-vous + O31–O35) ; noms/descriptions lus dans l'Excel ; écrans explicites (onde → phrase → devis, carte de conseil IA, statut « Transmise »). « Sans abonnement » retiré (faux avec l'outil).
- `/solutions` refait autour d'Artibox ; `src/experiences/tableau/` (tableau de bord fictif) supprimé. Fiches : 13 gardées (chacune liée à un code de module, honnête sur « dans la démo » ou « sur mesure »), `commande-en-ligne-livraison` → 301 click-and-collect, `galerie-client-photographe` → 301 hub (aucun module correspondant). Statistiques et comparatifs inventés retirés.
- Estimateur pas à pas : barre « Étape k sur N · nom » (N s'adapte aux étapes sans objet), choix précédents résumés (2 dernières lignes visibles, le reste replié), boutons toujours au même endroit (nav collante, au-dessus de la barre du récap sur mobile), retour en haut + focus au titre à chaque étape. Tests e2e `npm run test:e2e` (14 : 5 raccourcis + parcours perso + étapes sautées, à 1440 et 390).
- Documents : `npm run documents` rend 11 PDF depuis des sources HTML (`scripts/documents/`, gabarit de marque, Playwright) ; identité, TVA, médiateur, assurance, version et `documentsValides` dans `site.ts` ; aucun montant écrit à la main (contexte lu dans l'Excel et le moteur). Anciens PDF (ancienne identité) supprimés. Textes juridiques rédigés par sous-agents, à faire relire : le pied de page « Modèle à faire valider… » reste tant que `documentsValides` vaut false.
- Parrainage : 4 formules + bonus de fidélité, tous les montants dans `site.ts` (`parrainage`) ; formulaire avec choix de la formule ; règlement PDF.
- `detect-gpu` : tables de performance servies par le site (`public/gpu-benchmarks`) au lieu d'unpkg (aucune requête tierce) ; page cookies corrigée (clé `su-quality`).
