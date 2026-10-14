# Journal de production : film Stackup Agency

<!-- RAPPORT FINAL : à rédiger en tête, une fois les rendus vérifiés -->

## Décisions (une ligne chacune)

- 2026-10-14 · Skill HyperFrames installé (`npx skills add heygen-com/hyperframes`), CLI 0.8.157. Doc lue : hyperframes, general-video, core (composition, data-attributes, déterminisme, sous-compositions, médias), animation (adaptateur Three.js), CLI (rendu), audio.
- Route HyperFrames : `general-video`, en mode autonome (`flow: automation`, `storyboard: no`). Le brief impose un découpage 3D sur mesure, pas une capture de site (`product-launch-video` écartée).
- Projet dans `video/`, hors du build Next (aucun fichier .ts ; `video/` ajouté à `.vercelignore`).
- Réseau : le CDN jsdelivr et HuggingFace sont bloqués. GSAP 3.14.2 et Three 0.181.2 sont copiés dans `video/vendor/` depuis npm, ce qui rend aussi le rendu indépendant du réseau.
- Polices locales (`video/fonts/`, Fontsource, licence OFL) : Poppins 700/800 pour les titres, Inter 400/600/700 pour les sous-titres, JetBrains Mono 500/700 pour les cotes et étiquettes.
- Mesure de rendu (Chrome headless, WebGL logiciel, 4 cœurs, 1080p) : 0,26 s/image pour 400 plaques ; ×6 avec ombres portées ; ×6 avec BokehPass. Ombres et BokehPass sont donc exclus. La profondeur de champ est simulée par le brouillard, des particules floues en avant-plan et un flou CSS sur les calques lointains.
- Voix : aucune clé TTS dans l'environnement. Voix provisoire locale Piper `fr_FR-tom-medium` (homme, 44,1 kHz), lancée via sherpa-onnx. Le modèle vient des releases GitHub de sherpa-onnx (HuggingFace est bloqué). Écartées : `gilles-low` (16 kHz, phonèmes nasaux perdus) et `upmc` (22 kHz).
- Prix : `config.json` met `prixVitrine` à 500 comme le demande le brief. ATTENTION, le site affiche « à partir de 449 € » : il faut mettre 449 dans `config.json` pour aligner la vidéo sur le site.
- Estimateur (plan 6) : comme sur le site, le cadran se fige sur « à partir de {prixVitrine} € » et jamais sur un prix ferme (règle du `Configurateur.tsx`). Aucune fourchette inventée.
