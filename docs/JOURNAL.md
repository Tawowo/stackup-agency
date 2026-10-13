# Journal du chantier — Stackup Agency V5

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
