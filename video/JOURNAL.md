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
- Voix calée par `scripts/voix.py` : synthèse phrase par phrase et silences rognés. Coupes de plan sur le temps (0,5 s), phrases sur le demi-temps, voix lancée un demi-temps après chaque coupe. La vitesse est ajustée automatiquement pour tenir la cible : 45,0 s (vitesse 1,116) et 19,5 s pour le montage 20 s.
- Plans obtenus (montage complet) : P1 0–3, P2 3–9, P3 9–14,5, P4 14,5–22,5, P5 22,5–30,5, P6 30,5–35,5, P7 35,5–45 (dont le logo fixe 43,5–45).
- Montage 20 s : p1, p3a, p4a, p4b, p4c, p7c. On retire « Couche après couche » et « Sur ordinateur… » pour tenir 19,5 s.
- Prononciation : l'URL est dite « Stackup Agency point f r », « IA » est dit « i a » (champ `tts` de `script.json`). Les phonèmes espeak de « Stackup Agency » sont corrects (anglais).
- Chorégraphie (`src/choregraphie.js`) : chaque événement visuel et chaque bruitage est calé sur une phrase ou une coupe. Le même module sert au film et au design sonore.
- Musique : lit de travail synthétisé en numpy (Ré mineur, nappe filtrée, grosse caisse, basse en croches, charleston et arpège à partir du plan 4), puis normalisé et encodé en mp3 par ffmpeg. Choix de numpy plutôt que des expressions `aevalsrc` de ffmpeg, pour un rendu plus musical à contraintes égales (synthèse pure, aucune œuvre protégée).
- Bruitages synthétisés (impact, verre, whoosh, clac, rature, clic, tick du cadran, tic du panier, pliage, ding, montée, aspiration, impact final), placés depuis `audio/cues-<montage>.json`.
- Mixage dans HyperFrames : voix à 0 dB, musique à −18 dB (`data-volume` 0,126), sons à −10 dB (0,316). La musique s'éteint sur le logo par une automation de volume. Mix intégré mesuré : −17,2 LUFS.
