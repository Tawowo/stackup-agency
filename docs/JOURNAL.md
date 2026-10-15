# Journal du chantier — Stackup Agency V5

## Rapport de la mission « grille tarifaire + estimateur » (2026-10-14) — à lire en premier

**Prévisualisation Vercel** : https://stackup-agency-k3s6epe8h-tawowo-s-projects.vercel.app (commit 76af473, branche `claude/new-session-26nojr`).
`npm run verify` vert · 28 tests dont les 3 de référence (Hydr'eaux 4 050 € / 3 650–4 660 € / 90 €/mois ; ToutouBien 4 130 € / 3 720–4 750 € / 173 €/mois ; vitrine démo+visio 500 € reste 455 € / 450–580 €) · 432 routes ouvertes : 0 défaut · axe 0 violation (estimateur, étapes 2 à 10, référencement, contact) · sans JS : contenu intégral · accueil 251 ko de JS (inchangé), /tarifs 266 ko.
1. **Excel = source unique** : `npm run tarifs` lit les 11 onglets par nom et par code (151 lignes) → `tarifs.generated.ts` + `prix-publics.generated.ts` ; une ligne retirée de l'Excel disparaît (essai fait avec F07).
2. **Moteur** `src/domain/devis/` : reproduit le Simulateur à l'identique (dégressivité, série, référencement, IA, boutique, outil, urgence, remise, arrondi, fourchette, déductions, acompte, temps, taux horaire, délai, abonnement).
3. **Estimateur** `/tarifs#estimer` : 5 raccourcis, 9 étapes passables, récap fixe (fourchette seule), URL partageable (zod), chaîne 3D vivante ; ancien configurateur et studio de style supprimés (301 → `/tarifs#estimer`).
4. **Contact** : jeton + action (appel 30 min / démo) ; le serveur recalcule le prix exact et l'envoie, avec temps estimé et taux horaire, au seul e-mail de Mathéo (parcours testé : `node scripts/parcours-estimateur.mjs`).
5. **Site** : « à partir de » du moteur partout (offres, services, villes, métiers, FAQ, CGV, JSON-LD) ; textes et 300 articles passés en jetons `{{prix:…}}` ; Starter/Pro/Premium remplacés par l'abonnement composé + 3 exemples ; inclus, parcours client (accueil et tarifs), page `/services/referencement`, services à la carte ; durées fixes retirées (3 slugs renommés + 301).
6. **Imparfait** : articles de blog réécrits par lots d'agents (totaux chiffrés remplacés par du qualitatif) → relecture éditoriale conseillée ; les 301 sont des 308 (comportement Next) ; mini-aperçus des niveaux = pages HTML/CSS animées, pas le vrai site ; pas de Lighthouse ni de balayage HawkScan (pas de clé).

## Rapport de la mission « montrer la vraie chose » (2026-10-14) — à lire en premier

**Prévisualisation Vercel** : https://stackup-agency-gmgoikl9v-tawowo-s-projects.vercel.app (commit 4e4835a, branche `claude/new-session-26nojr`).
`npm run verify` vert · 432 routes du sitemap ouvertes : 0 défaut · axe WCAG 2.1 AA : 0 violation · sans JS : contenu intégral.

**Règle appliquée.** Chaque animation montre la vraie chose ; les plaques ne sont plus que matière (hero, fond) et transition.
1. **Hero** : le S est un objet rigide (plus de respiration ni de dérive) ; ruban refait à l'exact, plis vérifiés à DPR 3 (`scripts/logo-zoom.mjs`, 1,75 % / 0,36 %).
2. **Cinq couches** : vue éclatée de vrais calques (maquette, textes+photo, code, tableau de clients, serveur+adresse) qui fusionnent en un site fini ; clic = présentation de face.
3. **Ce qu'on fabrique** : page d'artisan, trois pages en éventail, boutique au panier qui se remplit, tableau de bord ; métamorphose des mêmes dalles.
4. **Réalisations** : vrai portable en alu + téléphone en 3D, capture qui défile, lumière sur le métal ; fiche avec portable HTML.
5. **Modules** : fenêtre d'application + douze cartes ; clic = la carte vole, impulsion de données, le module s'intègre.
6. **Mots de particules supprimés** (jamais nets) ; titres HTML.
7. **Comment on travaille** : un projet qui évolue (carnet → démo → code → mise en ligne → santé du site).
8. **Toutes les familles** : menu Ressources ; footer complet partout ; villes/départements/zones = carte en relief ; métiers = outil puis site du métier ; blog = bibliothèque feuilletable ; outils, FAQ (conversation), 404 (fenêtre vide), services locaux (maquette, page de résultats Google).

**Imparfait.** JS initial 251 ko gz sur l'accueil (budget 180 hors GSAP), ~150 ko ailleurs ; Lighthouse non lancé ; perf GPU réelle non mesurée.
Photo de visage toujours absente (voir plus bas) ; le téléphone de la galerie recadre la capture desktop ; maquettes = entreprises fictives (Aubert, Atelier du bois) ;
sans JS, les noms de villes de la carte sont masqués (listés plus bas) ; vidéos non régénérées pour cette mission (`node scripts/videos.mjs`).

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

## Historique condensé (2026-10-13)

- **Logo officiel + hero « impression »** : navy + ambre partout, liseré ivoire des arêtes, halo ambre ; couches de trois plaques posées une à une (`empile`).
- **Pages-mondes** : /tarifs (chaîne d'assemblage), /realisations (galerie), /services (compilation), /solutions (tableau de bord), /a-propos (atelier de nuit), /contact (enveloppe).
- **Gabarits** : `src/gabarits/locale/` (villes, départements, métiers, services locaux), `src/gabarits/document/` (légal, FAQ, outils).
- **Blog** 300 articles (67 programmés, ISR 12 h) ; SEO : `src/config/routes.ts`, sitemap, robots, 80 redirections (`scripts/redirections.mjs`).
- **QA** : `scripts/tour.mjs` (toutes les routes), `axe.mjs`, `sans-js.mjs`, `poids.mjs`, `logo-zoom.mjs`, `shots.mjs` ; rapport `docs/qa/rapport.json`.
- **Décisions** : prix toujours « à partir de » ; aucune durée affichée (`conforme()`) ; PDF retirés (identité légale erronée) ; pages légales « [à compléter] » ;
  PageSpeed (gratuit) pour l'audit ; cadran d'une traite ; nav en voile ; Lumière complète même en fin de page.

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
