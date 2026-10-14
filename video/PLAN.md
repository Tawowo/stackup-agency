# Plan de travail : film Stackup 45 s

1. **Découpage** : 7 plans calés sur la voix (script.json). Coupes sur la grille 120 BPM (0,5 s). Montage « complet » (≈ 45 s) et « court20 » (plans 1, 3, 4 resserré, 7).
2. **Moteur** : un seul monde Three.js (la Fabrique : ciel navy, sol quadrillé, lumière ambre, particules) piloté par le temps HyperFrames (`hf-seek`). Typographie cinétique et sous-titres en DOM animé par une timeline GSAP en pause.
3. **Plaques** : toute la 3D est faite de plaques extrudées (le ruban exact du logo, `src/webgl/bande/geometrie.ts`). Les écrans (site, boutique, tableau de bord, estimateur) sont des textures canvas redessinées à chaque image, découpées en tuiles.
4. **Fichiers** :
   - `script.json` : texte, phrases, timings réels ;
   - `config.json` : prix, démo, URL ;
   - `scripts/` : voix, son, build, contrôle qualité ;
   - `src/` : moteur et plans ;
   - `audio/` : voix, musique remplaçable, sons ;
   - `index.html`, `vertical.html`, `carre.html`, `vertical-20s.html` : générés par `scripts/build.mjs`.
5. **Ordre** :
   1. ossature sonore (voix Piper locale, lit 120 BPM, sons, timings) ;
   2. moteur et plans 1 à 7 en 16:9, avec une planche-contact (une image / 0,25 s) lue après chaque plan ;
   3. recomposition 9:16 et 1:1, variante 20 s ;
   4. sous-titres (variable `sousTitres`) ;
   5. rendus 60 i/s, ffprobe, planches finales, miniatures, rapport.
6. **Performance** : rendu WebGL logiciel (0,26 s/image sans ombres ni flou de profondeur, 1,5 s avec). Donc pas d'ombres portées ni de BokehPass : la profondeur passe par le brouillard et des particules floues.
7. Commit et push après chaque étape ; chaque décision tient en une ligne dans `JOURNAL.md`.
