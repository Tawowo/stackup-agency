# Journal de production : film Stackup Agency

## Rapport final

**Livrables** (dossier `video/livrables/`, 60 i/s, H.264 + AAC) :
- `stackup-pub-16x9.mp4` : 1920×1080, 45 s
- `stackup-pub-9x16.mp4` : 1080×1920, 45 s (format principal, composé en vertical)
- `stackup-pub-1x1.mp4` : 1080×1080, 45 s
- `stackup-pub-9x16-20s.mp4` : 1080×1920, 19,5 s (plans 1, 3, 4 resserré, 7)
- les mêmes en `-soustitres.mp4`, plus `thumbnail-<format>.png` pour chaque format

**Provisoire** : la voix (Piper `fr_FR-tom-medium`, locale) et la musique (lit de synthèse à 120 BPM, `audio/musique.mp3`). Les bruitages sont définitifs, mais remplaçables.

**Voix finale, avec une clé** : depuis `video/`, une des deux commandes, puis `npm run film`. Tous les timings se recalent seuls.
```
GOOGLE_TTS_API_KEY=… GOOGLE_TTS_VOICE=fr-FR-Chirp3-HD-Charon python3 scripts/voix.py --moteur google
ELEVENLABS_API_KEY=… ELEVENLABS_VOICE_ID=<voix FR masculine> python3 scripts/voix.py --moteur elevenlabs
```

**Remplacer la musique** : déposer le nouveau fichier à la place de `video/audio/musique.mp3` (même nom), puis lancer `npm run film` (= `bash scripts/rendre.sh`). La musique passe à −18 dB et s'éteint sur le logo automatiquement. Pour un seul format : `bash scripts/rendre.sh 9x16`.

**Prix et démo** : `video/config.json` (`prixVitrine`, actuellement 500 comme demandé ; **le site affiche 449**), puis `npm run film`.

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
- Architecture : un seul monde Three.js piloté par `hf-seek` (fonction pure du temps), plus une timeline GSAP en pause pour le DOM (titres, sous-titres, logo, URL). Les écrans (site, boutique, outil, IA, estimateur) sont des canvas redessinés à chaque image et plaqués sur des murs de tuiles.
- La caméra est décrite par ce qu'elle cadre (cible, angle, boîte) : les mêmes plans se recomposent en 9:16 et en 1:1. En vertical, les objets s'empilent, la caméra monte ou plonge et les titres passent en haut sur 2 ou 3 lignes.
- Formats : une composition racine par projet (règle HyperFrames). Le 16:9 est `video/index.html`, les autres sont `video/formats/{vertical,carre,vertical-20s}/` et partagent `src/`, `audio/`, `fonts/`, `vendor/` et `assets/` par liens symboliques.
- Bug corrigé : une timeline GSAP est « thenable », la résoudre dans une promesse bloquait l'enregistrement. Elle est désormais emballée dans un objet.
- QC plan 1 : titre « en morceaux » invisible (couleur transparente héritée) corrigé ; éclatement ralenti pour que les débris restent dans le cadre ; halo ambre réduit (il blanchissait l'écran). Accroche lisible à 1,25 s.
- QC plan 2 : texture animée du visiteur non redessinée (écran noir) corrigée ; les ratures partent avec leur mot ; éclair d'aspiration atténué.
- QC plan 3 : S recadré (sommet coupé pendant l'orbite) ; caméra en dérive lente pendant le logo officiel, pour ne jamais rester fixe plus de 0,75 s.
- QC plan 4 : écrans recadrés pour ne pas déborder ; ordinateur et téléphone arrivent par les côtés (le téléphone surgissait devant l'objectif).
- QC plan 5 : vue éclatée recentrée et étiquettes agrandies ; la démo sort à droite pour laisser la place au titre ; texte de la bulle IA agrandi. La bulle dit « Par exemple, Stackup Agency, à Tours : sites et outils sur mesure », sans aucune promesse de classement.
- QC plan 6 : estimateur agrandi ; « Site vitrine à partir de {prixVitrine} € » sur deux lignes dans la colonne de texte.
- QC plan 7 : en fin de montée, le ruban 3D est cadré pour tomber exactement sur le ruban du logo DOM. La relève se fait sous un éclair de 0,12 s avant l'impact final, puis tout se fige (3D, code, particules) pendant 1,5 s.
- Logo officiel sur fond navy : variante sombre du site (`LogoMarque` : brins ivoire #F5F3EE, ambre #F69106, lettrage extrait en masque alpha de `stackup-mot.png`). Proportions mesurées sur le PNG officiel : ruban 144 × 226, lettrage décalé de 0,336 × la hauteur du ruban. Le PNG lui-même a un fond blanc opaque et ne peut pas se poser sur du navy.
- Unité typographique calée sur le petit côté du cadre, pour que le 9:16 ne soit pas surdimensionné. Sous-titres : en 9:16, bas de la plaque à 17 % du bas, donc rien d'important dans les 15 % du bas.
- Contrôle : `scripts/qc.sh <format> <plan>` rend le plan en basse définition et produit une planche-contact (une image toutes les 0,25 s). Les sept plans 16:9 ont été relus et corrigés. Les formats 9:16, 1:1 et 9:16-20 s ont été vérifiés image par image avec sous-titres.
- Audit `hyperframes check` : sa limite fixe de 120 s ne suffit pas à rendre la 3D en WebGL logiciel. L'audit DOM (mise en page, contraste) passe donc par `formats/controle-*` (même film, sans dessin 3D) : 0 erreur, 44/44 textes conformes WCAG AA sur les trois formats. Si WebGL est absent, le film bascule sur un rendu factice au lieu de bloquer.
- Bus maître : +3 dB puis limiteur true-peak à −1,5 dBTP.
- Bug de mixage trouvé au premier rendu : une automation de volume remplace `data-volume` au lieu de s'y appliquer, et la musique sortait 14 dB trop fort. La courbe porte maintenant la valeur absolue (0,126 = −18 dB). Rendus relancés.
- Sous-titres : rendus par HyperFrames en calque transparent (ProRes 4444), puis incrustés par ffmpeg sur le film propre. Toutes les images restent produites par HyperFrames ; on évite seulement de rendre deux fois la 3D (environ 37 min par version de 45 s).
- Miniatures : l'image de l'accroche (1,55 s, « IL VOUS RAPPORTE QUOI ? » sur l'éclatement), une par format.
- Prévisualisation Studio ouverte (`npx hyperframes preview --background`) avant les rendus de livraison, comme le prévoit le workflow.
