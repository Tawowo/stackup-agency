---
workflow: general-video
flow: automation
storyboard: no
message: "Votre site peut faire bien plus pour vous : estimez votre projet en 2 minutes sur stackup-agency.fr"
destination: [site, YouTube, LinkedIn, Reels, TikTok, Shorts, Facebook]
aspect: [16:9, 9:16, 1:1]
language: fr-FR
audience: artisans, commerçants, TPE, professions libérales, associations (Tours et France)
length: 45s (+ variante 9:16 de 20 s)
---

## Intent
Film publicitaire motion design 3D, continuité spectaculaire de stackup-agency.fr : la Fabrique du site, de nuit. Brief complet du propriétaire : 7 plans, voix off imposée (voir `script.json`). Trois messages : le problème, la solution avec la preuve (démo avant décision), l'action (estimer en 2 minutes).

## Customizations
- Tout ce qui est en 3D est une plaque : le ruban du logo, extrudé exactement comme dans `src/webgl/bande/geometrie.ts`.
- Coupes sur une grille de 120 BPM. Aucun plan fixe de plus de 0,75 s, sauf le logo final (1,5 s). Pas de fondu enchaîné, pas de texte en simple fondu.
- Sous-titres incrustés (variable `sousTitres`), et en vertical rien dans les 15 % du bas.

## Assets
- `public/Logo_Stackup-Agency.png`, `public/marque/stackup-mot.png`, `LogoMarque.tsx` (tracés du ruban)
- Captures : `public/images/realisations/*.webp`

## Notes
- Interdits : chiffres de clients ou de projets, témoignages, garantie Google, délais de livraison, comparatifs avec d'autres agences.
