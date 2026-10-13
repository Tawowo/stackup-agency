# Journal du chantier — Stackup Agency V5

Court par obligation (≤ 150 lignes). Le propriétaire lit ce fichier pour savoir où on en est.

## 2026-10-13 — Phase 0 : scaffold + Stack Engine

**Situation de départ.** Le dépôt n'était pas vide : il contenait l'ancien site et une refonte
antérieure (Next 15, « bande » 3D). Tout a été déplacé dans `ancien/` (git mv, rien n'est perdu,
une copie est aussi dans `../stackup-agency-20261012/`). `ancien/` sert uniquement de carrière :
logo, images, PDF, données, 300 articles, logique du configurateur, `LogoMarque.tsx`. Il sera
supprimé du dépôt quand les reprises de la phase 6 (JSON-LD, redirections) seront faites.

**Plan de la phase 0 (10 lignes).**
1. Projet neuf : Next 16 (App Router, Turbopack), React 19, TS strict, Tailwind 4, ESLint 9.
2. Tokens `src/styles/tokens.css`, polices locales (Poppins 600/700, Inter variable, JetBrains Mono).
3. `scripts/logo-trace.mjs` : à partir des deux tracés SVG de `LogoMarque`, dériver la plaque
   canonique (parallélogramme, pente du pli) et les trois poses exactes du logo → `src/webgl/logo-geometry.ts`.
4. Stack Engine : uniforms partagés (`engine.ts`), `plates.tsx` (InstancedMesh, morph A→B dans le
   vertex shader, arc, retard par instance), matériau navy/ambre avec lumière à −18°, grain, lentille.
5. Layouts purs `logo` et `pile` (+ tests node:test), store zustand `scene`.
6. Canvas persistant `Scene.tsx` (frameloop never, avancé par `gsap.ticker`), caméra ortho↔perspective
   par mélange de matrices, ombre projetée sur un mur à −18°, respiration / balayage / dérive.
7. Paliers `quality.ts` (detect-gpu + capacités, `?quality=`), moniteur fps dans le ticker.
8. `/lab` : Tweakpane (épaisseur, écartement, torsion, arc, retard, morph, projection), drag.
9. Playwright : `scripts/shots.config.ts`, `shots.mjs`, projets 1440 / 390, SwiftShader ; `logo-check.mjs`.
10. Captures lues : lab logo, pile, drag, morph 0,5 ; superposition ≤ 2 % ; `docs/qa/rapport.json`.

**Ce qui est visible à la fin de la phase 0** (`npm run lab`, puis `/lab`) : le logo exact en trois
plaques, immense, qui respire en profondeur, balayé par une bande ambre, dérivant de ±2°, avec une
ombre longue à −18° sur un mur faiblement éclairé par la lampe ambre ; au drag il tourne (inertie,
retour lent) ; le bouton « pile » fait arriver une tour torsadée depuis l'arrière-plan (arc, retard
par instance) ; le curseur ortho ↔ perspective bascule sans saut ; « nuit / jour » allume l'ivoire.
`/` montre le logo calé sur les colonnes 1-6 et le mot porteur en Poppins — un stub, pas le hero.

**Captures lues** : 24 fichiers commentés dans `docs/qa/rapport.json` (lab × 7 états, accueil, logo-check).
Défauts trouvés en regardant, et corrigés : Tweakpane en double ; caméra qui recentrait la pile à
l'écran (le logo ignorait sa boîte HTML) ; tour chaotique (plaques trop grandes, trop nombreuses) ;
plaques de profil roses (classification des faces par la normale monde) ; lentille et Fresnel
beaucoup trop forts (taches beiges) ; ambre jaunie sur ivoire ; `--su-nuit` CSS qui ne suivait pas.

**Superposition du logo (règle 9)** : 1,05 % en 1440, 1,08 % en 390 (seuil 2 %), ratio à 0,45 % près.
Méthode : encre = luminance < 176, boîtes englobantes alignées, référence `logo_Stackup-Agency_seul.png`.
Chaque bande du logo a sa propre pente (0,418 / 0,392 / 0,391) : une plaque canonique à 21,83° plus une
rotation résiduelle par instance (≤ 0,9°) reproduit la silhouette.

**Cadence (SwiftShader, proxy)** — mesurée sur le temps réel, pas sur le delta borné :
logo 8-9 fps en 1440, 15 en 390 ; pile 4 en 1440, 9 en 390. Un canvas VIDE (un quad plat, sans
plaques) plafonne déjà à 16 fps en 1440 dans ce conteneur : le seuil « ≥ 30 » n'y est pas atteignable,
quel que soit le shader. Le moniteur de qualité (baisse du DPR puis du palier, puis repli 2D) est
désactivé quand `?quality=` force un palier, sinon il bascule les captures longues en 2D. À mesurer sur
un vrai GPU à la prochaine session ; en attendant, les captures restent la preuve.

**Décisions / dépendances.** Hors liste § 5, avec motif : `@tweakpane/core` (types de Tweakpane 4,
dev) ; `sharp` (recadrage/redimensionnement de `logo-check`, puis AVIF des démos en phase 3, dev).
Pas de Lenis, zod, Resend, tunnel-rat, drei-only encore : ajoutés quand une phase les emploie.
L'ombre est projetée par le moteur lui-même (second passage du même InstancedBufferGeometry, projeté
le long de la lumière sur un mur), pas par `ContactShadows` : un matériau de profondeur ne connaît pas
le morph dans le vertex shader. Le mur peint le fond (encre ↔ ivoire), le halo, la vignette et le grain.
Les layouts sont des fonctions pures (`node --test`, 3 tests).

**Pas fait en phase 0.** Repli 2D animé (SVG statique seulement) ; composition mobile de la pile ;
le retour après drag trop rapide pour être capturé ; AGENTS.md généré par Next désactivé.

**Prochaine étape — phase 1, le hero (moment 00)** : nav + LogoMarque, Lenis sur le ticker, section
épinglée 150 vh, ortho → perspective pilotée par le scroll, `logo` → `pile`, titre déplié par mots,
quatre cotes mesurées, curseur, repli 2D animé, mouvement réduit, mobile 390 ; captures p = 0 / 0,25 /
0,5 / 1 × 2 largeurs × (normal, rm) + sans WebGL ; logo-check sur `/`.

## 2026-10-13 — Phase 1 : le hero (moment 00)

**Plan (10 lignes).**
1. Store : `projection`, `pose` (orientation de base par expérience) et `scrub` (le scroll écrit uMorph, pas de tween) sortent de `params`.
2. Paramètres d'URL globaux (still, webgl, quality, proj, mur, ombre, fond) lus dans SceneMount : `logo-check` marche sur `/`.
3. Lenis sur `gsap.ticker` + ScrollTrigger ; barre de progression ambre ; pas de Lenis en mouvement réduit.
4. Nav : LogoMarque, cinq entrées, action ; suit `--su-nuit` ; menu mobile en lamelles, `inert` fermé, focus piégé.
5. Primitives : Action (ambre plein à reflet −18°, contour, lien), Cote (mesure réelle), Curseur (point + anneau amorti, pointeur fin seulement).
6. Expérience OUVERTURE : section épinglée 150 vh (120 vh mobile), p → uMorph (scrub 0,6), ortho → perspective, épaisseur ×2,5, pose de la tour.
7. Titre déplié par mots (SplitText, rotateX −90° → 0, arête ambre), ligne, deux actions, quatre cotes (deux sur mobile).
8. Repli 2D : trois plaques SVG (quads exportés par logo-trace) + plaques fantômes qui se déploient avec `--su-p`.
9. Mouvement réduit : pas d'épinglage, logo figé, texte instantané. Pages de chantier pour les routes de la nav.
10. Captures `/` : p = 0 / 0,25 / 0,5 / 1 × 2 largeurs × (normal, rm), drag, sans WebGL ; logo-check sur `/` ; rapport.

**Ce qui est visible à la fin de la phase 1** (`/`) : la nav (logo exact + lettrage, cinq entrées,
action), le logo immense à gauche qui respire, le titre « Sites et outils / sur mesure. » qui se déplie
mot par mot avec son arête ambre, la ligne, deux actions, quatre cotes mesurées en bas (deux sur
mobile). Au scroll, section épinglée : épaisseur ×2,5, ortho → perspective, les plaques arrivent de
l'arrière-plan et bâtissent la tour derrière le logo incliné ; le drag tourne la pile ; le curseur
ambre suit le pointeur fin et s'ouvre sur les actions ; barre de progression ambre ; menu mobile en
lamelles. Sans WebGL : le logo SVG exact et sept plaques fantômes qui se déploient avec le scroll.
Mouvement réduit : logo figé, texte posé, pas d'épinglage. Six routes de la nav existent en pages
de chantier (phase indiquée, rien d'inventé).

**Captures lues** : 23 états du hero + 2 logo-check (45 entrées dans `rapport.json`). Défauts trouvés
en regardant, corrigés : tour déjà construite à p = 0 (la bascule « p > 0 » courait contre le montage
différé de la scène → paire A/B explicite dans le store) ; repli 2D en ivoire ; panneau du menu
par-dessus la barre ; le hero écrasait `?fond=ivoire` (nuit forcée prioritaire). Non corrigé, noté :
à p = 0,5 des plaques en vol traversent la zone du titre.

**Superposition sur le hero** : 1,17 % en 1440, 1,43 % en 390 (seuil 2 %).

**Décisions.** Lenis installé (liste § 5), avancé par `gsap.ticker` ; SplitText et ScrollTrigger
viennent du paquet `gsap` (licence standard, gratuits). L'ombre, la dérive et la parallaxe sont des
rotations du groupe autour de son centre, la caméra ne bouge jamais : la pile reste calée au pixel sur
sa boîte HTML. Le repli 2D est 100 % CSS (`--su-p`), aucun JS par trame.

**Pas fait en phase 1.** Gyroscope (phase 7) ; vidéo Playwright du scroll (phase 3) ; cadence sur
vrai GPU ; raccourcis clavier ⌘K / G / ? (phase 5-7) ; le retour après drag reste rapide.

**Prochaine étape — phase 2** : layouts `strates`, `page`, `multi`, `boutique`, `logiciel` réglés sur
`/lab`, puis moments 01 (DÉCOUPE), 02 (ASSEMBLAGE, ivoire), 03 (PELLICULE, captures des démos), 04 (Seuil).
