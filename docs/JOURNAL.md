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
