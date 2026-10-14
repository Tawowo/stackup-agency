# CLAUDE.md — Stackup Agency V5

Ce fichier est lu à chaque session. Il prime sur toute instruction contraire d'un prompt ponctuel.

## Ce qu'est ce projet

Le site de Stackup Agency (stackup-agency.fr), agence web d'une personne à Tours (37) qui fabrique des **sites et des outils sur mesure** pour artisans, commerçants, TPE et associations. Ce site est la **pièce maîtresse du portfolio** : c'est lui qui décide si un prospect confie son projet. Il doit être spectaculaire, impeccable, et vendre.

La spec complète est dans `PROMPT-REFONTE.md`. Le journal d'avancement est dans `docs/JOURNAL.md`. Le rapport de captures est dans `docs/qa/rapport.json`.

## Règles absolues

1. **Le spectacle d'abord.** On ne passe jamais une session entière sur de la plomberie invisible. Chaque session doit laisser quelque chose de nouveau à voir dans le navigateur.
2. **Rien n'est fait tant que ce n'est pas vu.** « Fait » = serveur lancé, captures Playwright prises (1440 et 390 px), **chaque capture ouverte et lue** avec l'outil de lecture d'image, commentée dans `docs/qa/rapport.json`, défauts corrigés, recapturé. Un build vert n'est pas une validation.
3. **Un objet, un moteur.** Toute la 3D passe par le Stack Engine (`src/webgl/`) : un champ de plaques instanciées pilotées par des uniforms partagés. Pas de deuxième système 3D, pas de nuage de particules décoratif, pas de décor.
4. **Un seul ticker.** `gsap.ticker` pilote Lenis et le rendu R3F (`frameloop="never"` + `advance()`). Aucun `requestAnimationFrame` maison, aucun `setInterval` d'animation.
5. **Vocabulaire d'apparition fermé.** Dépliage, découpe (`clip-path`), masque, dissolution, tracé SVG, cadran. Le fondu + translation verticale est **interdit** sauf dans le texte courant du blog et des FAQ. Vérification : `grep -rn "translate-y-4\|translate-y-8\|opacity-0" src/` doit être vide hors `src/components/editorial/`.
6. **Accessible au clic et au clavier.** Le survol et le pointeur n'ajoutent que de l'agrément. Tout contenu est présent sans JS (aucun état masqué par défaut). `prefers-reduced-motion` : apparitions instantanées, Stack Engine figé dans son état de repos (le logo).
7. **Pas de faux logiciel.** L'ancien « Laboratoire » (démo de gestion d'interventions) est supprimé et ne revient pas ; la Salle des machines montre des modules et des maquettes animées, pas un logiciel bricolé. Une vraie démo sera branchée plus tard par le propriétaire.
8. **Honnêteté commerciale.** Prix toujours en « à partir de », calculés par le moteur `src/domain/devis/` depuis l'Excel `docs/tarifs/` (jamais écrits à la main : jetons `{{prix:…}}` dans les textes). Aucune durée de livraison fixe : seul le délai indicatif du moteur peut s'afficher, toujours « indicatif ». Aucun comparatif « × moins cher ». Aucune mention « hébergement France ». Aucun témoignage, chiffre client, logo client ou garantie inventé. Les réalisations actuelles sont étiquetées « Démo ». Aucune offre « site association ».
9. **Aucune API d'IA, aucun service payant à l'usage** dans le site (pas de Claude, OpenAI, etc.). Resend pour les e-mails uniquement.
10. **Aucune dépendance hors liste** (voir PROMPT-REFONTE.md § 5) sans motif écrit dans `docs/JOURNAL.md`.
11. **Pas de documentation à la place du travail.** Aucun fichier `.md` de plus de 150 lignes ne sort d'une session, sauf `docs/JOURNAL.md` qui est tenu court et à jour.

## Identité

- Fondateur : **Mathéo Reboul**. Jamais d'âge, jamais de « depuis 2018 », jamais « Valéry ».
- Logo : `public/Logo_Stackup-Agency.png` et `public/logo_Stackup-Agency_seul.png` (trois plaques pliées navy / navy / ambre formant un S). Source unique. Aucun pictogramme réinventé. `LogoMarque.tsx` (repris de l'ancien projet) est le seul composant de logo.
- Couleurs : voir tokens dans `src/styles/tokens.css` (définis en § 3 du prompt). Ambre = unique couleur d'action et de lumière.
- Typo : display géométrique locale (Poppins 600/700 ou Urbanist), Inter pour le texte, JetBrains Mono pour les cotes et fiches. Jamais trois voix dans un même bloc.
- Langue : français, vouvoiement envers le visiteur, ton direct, pas de slogans creux.

## Stack

Next.js (dernière stable, App Router, Turbopack), React 19, TypeScript strict, Tailwind 4, `three` + `@react-three/fiber` 9 + `@react-three/drei`, GSAP 3.13+ (ScrollTrigger, SplitText, Flip, `@gsap/react`), Lenis, zustand 5, `@use-gesture/react`, maath, detect-gpu, zod, Playwright. Voir le prompt pour les motifs.

## Commandes

```
npm run dev            # serveur
npm run verify         # typecheck + lint + build
npm run shots          # captures Playwright 1440/390 de toutes les routes et états listés dans scripts/shots.config.ts
npm run shots:home     # accueil seul, tous les états de scroll
npm run tarifs         # regénère src/config/tarifs.generated.ts depuis docs/tarifs/Grille-tarifaire-Stackup.xlsx (source unique des prix)
npm run lab            # ouvre /lab (banc d'essai Stack Engine)
```

## Organisation

```
src/webgl/            Stack Engine : engine.ts (uniforms partagés), plates.tsx (instances), layouts/*.ts (formes cibles), materials/*.ts, quality.ts, Scene.tsx (canvas persistant), Fallback2D.tsx
src/experiences/      une expérience nommée = un dossier (ouverture, strates, assemblage, pellicule, machines, prix, methode, atelier, depart, traversee)
src/components/ui     primitives (Plaque, Cote, Fiche, Cadran, Action, Seuil)
src/components/editorial  blog, FAQ (seul endroit où le fondu est toléré)
src/gabarits/         un gabarit par fonction de page
src/config/site.ts    offres et textes commerciaux (les prix viennent de tarifs.generated.ts et du moteur)
src/domain/devis/     moteur de devis (pur, testé) ; src/lib/jetons.ts : jetons de prix des textes
src/data, src/content reprises de l'ancien projet telles quelles
docs/JOURNAL.md, docs/qa/rapport.json, docs/qa/shots/
```

## Début de chaque session

1. Lire `docs/JOURNAL.md` (où on en est, ce qui reste).
2. Lancer `npm run dev`, prendre une capture de l'accueil, la regarder : c'est l'état de départ.
3. Annoncer en trois lignes ce que la session va rendre visible.
4. Travailler. Capturer. Regarder. Corriger.
5. Mettre à jour `docs/JOURNAL.md` : fait / pas fait / pourquoi / prochaine étape.
