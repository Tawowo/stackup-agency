# Journal du chantier — Stackup Agency V5

## Rapport de la nuit (2026-10-14) — à lire en premier

**Prévisualisation Vercel** : https://stackup-agency-kktwoccwo-tawowo-s-projects.vercel.app (commit 2866bc2, branche
`claude/new-session-26nojr`). `npm run verify` vert. 432 routes du sitemap ouvertes une à une : toutes en 200, sans
erreur console ni débordement (`docs/qa/tour.json`). axe WCAG 2.1 AA : 0 violation (23 routes × 1440/390). Sans JS :
contenu intégral. 80 anciennes URL redirigées (308), aucune ne finit en 404.

**Pages terminées.** Accueil (10 moments, hero « impression »). Mondes : /tarifs (chaîne d'assemblage),
/realisations + 7 fiches (galerie), /services + 4 fiches (du code au pixel), /solutions + 15 fiches (tableau de
bord), /a-propos (atelier de nuit), /contact (enveloppe qui part au fond) + merci. Traversée entre toutes les pages.
Blog : 233 articles en ligne + 67 programmés (publiés à leur date), 30 rubriques, RSS. Local : 30 villes,
18 départements (communes filtrables), 79 métiers, 6 services locaux, zones. Outils : audit de site, studio de
style, cahier des charges, documents, FAQ, comparatif, parrainage. Légal : mentions, CGV, confidentialité, cookies,
plan du site, 404 animée. SEO : métadonnées, JSON-LD, sitemap, robots, OG, icônes.

**Imparfait, en clair.**
- JS initial (gzip) : accueil 243 ko (budget 180 hors GSAP : ~188), /tarifs 239, pages intérieures 147 (budget 140).
  Lighthouse non lancé (outil absent ici) ; perf GPU réelle non mesurée (SwiftShader seulement).
- Vidéos : accueil, /tarifs et /realisations refaites ; les autres pages se génèrent avec `node scripts/videos.mjs --cas=pages`
  (non versionnées, trop lourdes).
- Galerie : le « téléphone » montre un recadrage de la capture desktop (pas de vraie capture mobile).
- Audit de site : Google PageSpeed refuse sans clé (quota partagé épuisé) ; résultat jamais vu rendu.
- Studio de style sur mobile : l'aperçu n'est pas collant. 404 sur mobile : une plaque frôle l'étiquette.

**Ce que le propriétaire doit fournir.**
1. La photo de visage en fichier : `public/images/source/matheo-reboul.jpg`, puis `node scripts/portrait.mjs`
   (le message ne contenait pas de fichier ; la photo de l'atelier sert en attendant).
2. Vraies réalisations (et captures mobiles) ; les 7 actuelles restent étiquetées « Démo ».
3. Clés Vercel : `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` (contact, parrainage), `PAGESPEED_API_KEY` (audit).
4. Identité légale : titulaire, SIRET, médiateur (marqués « [à compléter] »), hébergeur (Vercel ou OVH ?).
5. Les 12 PDF de `public/documents` à régénérer (autre nom, SIRET étranger, offre association, délais) : retirés.
6. À confirmer : récompense du parrainage, « domaine inclus tant que la maintenance court », rapport SEO mensuel.

Court par obligation (≤ 150 lignes). Les sessions anciennes sont condensées ; le détail est dans git.

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

## 2026-10-13 — Logo officiel, hero « impression », phase 5 ambitieuse

**Plan (10 lignes).**
1. Logo officiel navy + ambre partout (pile 3D au repos, nav, footer, repli 2D) ; lisibilité sur navy par
   liseré ivoire sur les arêtes (rim light), halo ambre localisé derrière le logo, plaque claire dans la nav.
2. Hero « impression » : layout `empile`, couches de trois plaques alignées derrière le logo, posées une à une
   au scroll, chaque couche s'allume en se posant ; puis la caméra tourne pour montrer le S massif.
3. Captures p = 0 / 0,2 / 0,4 / 0,6 / 0,8 / 1 du hero lues ; logo-check refait ; strates partent de `empile`.
4. Socle des pages-mondes : `Monde` (un composant par page qui pilote la scène), travelling `uTravel`.
5. /tarifs « La Chaîne d'assemblage » : tapis lumineux, modules qui s'emboîtent, portique qui ajoute au
   Cadran, produit tournant au drag, plan technique tracé en lumière derrière.
6. /realisations « La Galerie » : hall en travelling, écrans (ordinateur + téléphone) suspendus, la capture
   s'allume et défile à l'approche, pointeur qui incline, clic → l'écran remplit la page (fiche).
7. /services « Du code au pixel », /solutions « Le Tableau de bord vivant » (blocs aimantés, flux, chiffres).
8. /a-propos « L'Atelier de nuit » ; /contact : à l'envoi, le S se replie en enveloppe et part en profondeur.
9. Chaque page : ambiance permanente, une interaction propre, scrub pur, réglée sur `/lab`, captures 1440 /
   390 lues à chaque palier, une vidéo. Contenu commercial lisible et prioritaire.
10. Ordre : 1 → 2 → /tarifs → /realisations → /services → /solutions → /a-propos → /contact.

**Fait (étapes 1-2).** Logo officiel navy + ambre partout : `uClair = 0`, liseré ivoire des arêtes (`uRim`,
rim light) et halo ambre localisé derrière la pile (`uHalo` 0,24) ; nav et footer posés sur une plaque claire
(`.su-logo-plaque`) ; repli 2D navy avec liseré ivoire. Hero « impression » : layouts `empile` / `empileDepart`
(20 couches de trois plaques exactement alignées, pas 0,034 ; copies de la plaque ambre en ambre), chaque couche
descend à plat et s'allume en se posant (`uFlash`, fonction du morph seul), puis la caméra tourne (pose 0,72 → 1).
Captures p = 0…1 lues (1440 / 390). Superposition : hero 1,20 % (1440), 1,46 % (390), lab 1,39 %. `logo-check`
masque la nav et le rail (ils entraient dans la boîte). `StackFrame` relit les boîtes à chaque trame (ticker).
Décision : la photo envoyée dans le message n'arrive pas comme fichier ; `scripts/portrait.mjs` la traitera dès
qu'elle sera posée en `public/images/source/matheo-reboul.jpg` ; en attendant, la photo de l'atelier
(`portrait-fondateur.webp`, déjà dans le dépôt) sert de portrait.

## 2026-10-13 (nuit) — Mission en autonomie : état précis pour reprendre avec « Continue »

**Fait.** Accueil audité (captures relues : hero, strates, offre, seuil, machines, prix, méthode, atelier,
départ ; mots formés par les flux, onde au clic, plongée de caméra entre sections, lueur au pointeur).
Pages-mondes : `/realisations` (Galerie, `src/webgl/monde/Galerie.tsx`, `src/experiences/galerie/`),
`/services` (Compilation, `src/experiences/compil/`), `/solutions` (Tableau, `src/experiences/tableau/`),
`/a-propos` (Atelier de nuit, `src/experiences/atelier-nuit/`), `/tarifs` (Tapis + plan technique), fiches
services (4), solutions (15), réalisations (7). Blog : 300 articles (`src/lib/blog.ts`, `src/experiences/journal/`),
catégories, RSS. Pages locales : gabarit signé `src/gabarits/locale/` (villes 30, départements 18 avec
communes filtrables, métiers 79, services locaux 6, zones). Traversée : `src/experiences/traversee/Traversee.tsx`
(repli de la page par découpe + dissolution du sol, dépliage à l'arrivée). Contact : layout `enveloppe` +
paramètre `fuite` (l'enveloppe file au fond), la page merci la fait revenir. SEO : `src/config/routes.ts`
(source unique), `sitemap.ts`, `robots.ts`, `src/config/redirections.ts` (80 × 301, générées par
`scripts/redirections.mjs`) — **à brancher dans `next.config.ts`** (redémarre le serveur : le faire hors captures).

**Décisions (une ligne chacune).**
- Les 67 articles à `publishAt` futur restent programmés (stratégie de l'ancien site) ; ISR 12 h les publie à date.
- Cadran : rotation d'une traite à l'entrée (900 ms) — un prix ne reste jamais figé sur une valeur intermédiaire.
- À propos : pas de travelling caméra (le cadre 3D quittait la photo) ; la figure entière grandit d'un bloc.
- Galerie : le hall attend au fond à droite pendant l'intro (travel −1 → 0) ; mobile : recul de 6 unités.
- Nav : voile du fond courant dès 40 px de scroll (le texte ne passe plus sous le logo).
- PageSpeed Insights (gratuit, sans IA) reste la source de l'audit de site ; clé `PAGESPEED_API_KEY` facultative.

**Fait ensuite.** Gabarit Document (`src/gabarits/document/`) : mentions, CGV, confidentialité, cookies, plan
du site, 404 en éboulis (`src/webgl/layouts/eboulis.ts`) ; outils (audit PageSpeed `src/lib/audit.ts`, studio de
style `src/experiences/outils/`) ; ressources (cahier des charges imprimable, documents), FAQ, comparatif,
parrainage (`src/experiences/ressources/`, `/api/parrainage`). Redirections branchées dans `next.config.ts`
(80 × 308). Traversée vérifiée en capture (`scripts/sonde-traversee.mjs`). axe : 0 violation sur 23 routes ×
2 largeurs (`scripts/axe.mjs`). Sans JS : `@media (scripting: none)` ouvre toutes les découpes
(`scripts/sans-js.mjs`). Tour des 432 routes du sitemap (`scripts/tour.mjs` → `docs/qa/tour.json`) : 0 défaut
après correction. `npm run verify` vert. OG + icônes (`scripts/og.mjs`). GSAP/Lenis/three différés.

**Décisions de la seconde moitié.**
- Les 12 PDF de `public/documents` portent un autre nom et un SIRET étranger au site : tous retirés de la page.
- `conforme()` neutralise aussi « sous 72 h », « livré en N jours » et l'offre association (149 € → offre une page).
- Pages légales : identité (titulaire, SIRET, médiateur) laissée « [à compléter par le propriétaire] ».

**Reste à faire.** Vidéos des pages-mondes (`node scripts/videos.mjs --cas=pages`, ~140 trames chacune) ;
JS initial au-dessus du budget sur l'accueil (342 ko gz) et les pages qui importent GSAP au rendu — prochaine
étape : importer GSAP à la demande dans chaque expérience comme dans `Cadran.tsx`.

## 2026-10-14 — Règle prioritaire : montrer la vraie chose (mission 2)

- Décision : le S est un objet rigide (plus de respiration, de dérive par plaque, de lentille qui soulève) ; seules
  la lumière et la caméra vivent (la dérive de caméra s'éteint en projection orthographique).
- Décision : géométrie du ruban refaite à l'exact (`scripts/logo-trace.mjs`) : une plaque canonique + cisaillement par
  bande (`aShear`), x ∈ [L, R] identique, haut devant milieu devant ambre, arêtes droites milieu/ambre confondues.
  Superposition à DPR 3 (`scripts/logo-zoom.mjs`) : plis nets, écart total 1,75 % en trop / 0,36 % en moins.
- Décision : les mots de particules (COUCHES, OFFRES…) sont supprimés (jamais parfaitement nets) ; les titres HTML suffisent.
- Décision : bibliothèque de maquettes HTML/CSS/SVG (`src/components/maquettes/`) = la vraie chose ; les plaques ne font
  plus que la matière (hero, fond) et la transition (métamorphose de dalles dans « Ce qu'on fabrique »).
- Décision : « Comment on travaille » : scène en `position: fixed` + découpe (un calque épinglé laissait un fantôme).
- Décision : réalisations : portable/téléphone en 3D (géométrie extrudée + environnement de pièce généré, sans fichier).
