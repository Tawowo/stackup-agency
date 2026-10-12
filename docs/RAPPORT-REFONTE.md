# Refonte Stackup Agency — rapport

Trois commits sur `main` : `cdcfdfb`, `56e0ba7`, `e83a0ca`.
86 fichiers, +2 657 / −1 249 lignes.

Ce document dit ce qui a été fait, ce qui a été mesuré, et ce qui ne l'a pas
été. Les points marqués **non traité** le sont vraiment.

---

## Mission 1 — La recherche

**24 dépôts dont j'ai lu du code**, le fichier précisé pour chacun dans
`docs/recherche/NOTES-BRUTES.md`.

**6 dépôts nommés comme NON lus** plutôt que résumés depuis leur README :
Theatre.js, three-stdlib et maath (404 sur tous les chemins essayés), Rive,
les WebGPU samples, Tweakpane. L'objectif annoncé était trente ; il en manque
six, et ils sont nommés.

**Bilan des dépendances : aucune ajoutée.** Six techniques reprises, treize
bibliothèques écartées avec un motif chiffré — par exemple `EffectComposer`,
qui alloue deux cibles half-float plein écran, soit ≈ 63 Mo de VRAM en
1440×900 à dpr 1,75 avant le moindre effet. Le détail est dans
`docs/recherche/DECISIONS.md`.

**Deux défauts de mon propre code trouvés par la lecture :**
- le réseau de modules intégrait ses ressorts à `dt` variable — corrigé par un
  accumulateur à pas fixe (1/120 s), méthode lue dans react-three-rapier ;
- le titre découpé reposait sur `aria-label` plus des espaces `sr-only`, et le
  copier-coller donnait « faitdécollervotre » — remplacé par le motif de
  `splitText` d'anime.js v4.

**Une affirmation fausse corrigée dans mon propre document :** j'y avais écrit
que mon rotationnel ne normalisait pas. La lecture de mon code montre
l'inverse. La vraie différence avec lygia est ailleurs, et reste notée comme
dette, pas comme correction.

---

## Mission 2 — Le logo

Restauré avant cette session (`422d5b6`), par décalque et non à main levée :
chaque arête de `public/Logo_Stackup-Agency.png` scannée ligne par ligne puis
ajustée par régression, erreur inférieure au pixel sur une largeur de 145. Le
lettrage « Stackup AGENCY » est extrait en masque alpha, donc ce sont les
lettres du fichier d'origine.

Le préchargeur a été supprimé : un minuteur fixe de 840 ms sans rapport avec
un chargement réel, qui cachait un hero déjà noir derrière un écran noir.

---

## Mission 3 — La page d'accueil

### Le premier écran : « le plan habité »

Trois directions ont été conçues et comparées dans `DECISIONS.md`. Deux
écartées, avec motif :

- **La chambre noire** — spectaculaire, mais un site commercial entièrement
  sombre handicape la lecture des offres et des prix, qui sont l'argument de
  vente.
- **La matière** — la typographie extrudée est un poncif, et l'empilement de
  plaques est déjà la mécanique de l'anatomie : une redite interne.

**Retenue : le plan habité.** Les deux reproches appelaient deux réponses
différentes. L'IMPOSANT vient de l'échelle : le mot porteur monte à 17 vw et
déborde de la colonne de texte. Le PROFESSIONNEL vient de la mesure : une
grille de construction de 12 colonnes est visible, et toute la composition s'y
aligne. Les cotes affichent les dimensions réelles relevées dans le navigateur
et remises à jour par `ResizeObserver` — jamais des nombres décoratifs.

Supprimés parce qu'ils ajoutaient du mouvement sans ajouter de sens : les
trois plaques de parallaxe et les quatre cartes de confiance flottantes.

### L'ordre de la page, refait

L'ancien enchaînement posait **quatre sections de « preuve » avant de montrer
un seul site livré**, et répétait **cinq fois les mêmes quatre chiffres**.

| | Avant | Après |
|---|---|---|
| 01 | Hero | **L'ouverture** — le plan habité |
| 02 | Seuil | Seuil |
| — | Bandeau défilant | *supprimé* |
| 03 | Anatomie | Anatomie |
| 04 | Atelier | **Les services** (remonté) |
| 05 | Preuve par 3 | **Les réalisations** (remontées de la 8ᵉ place) |
| 06 | Preuve logicielle | La salle des machines |
| 07 | Réalisations | **Le verdict** — le prix, après le travail |
| 08 | La méthode | La méthode |
| 09 | Raison d'être | Raison d'être |
| 10 | Chiffres + FAQ | **FAQ seule** |
| 11 | Seuil + CTA | Seuil + CTA |

Trois déplacements, chacun pour une raison : les services suivent l'anatomie
(elle ouvre un site, ils disent lesquels on construit) ; les réalisations
remontent parce que le travail livré est la preuve la plus forte et ne peut
pas arriver quatrième dans une file de démonstrations ; le prix descend parce
qu'annoncer « huit fois moins cher » avant d'avoir montré le travail est une
affirmation, alors qu'après c'est une conclusion.

Trois suppressions, chacune pour cause de redite. Avant de supprimer les cinq
pastilles de chiffres, j'ai vérifié les cinq valeurs une par une : toutes sont
redites ailleurs, et le « 80 % moins cher » est même **calculé** par le
comparateur à partir des tarifs réels.

La seule information qui n'existait nulle part ailleurs — la pile technique du
bandeau défilant — a été **déplacée**, pas perdue : elle est descendue dans
les légendes de l'anatomie, lisible et rattachée à sa couche.

---

## Mission 4 — Les expériences

`docs/MOMENTS-ANIMES.md` est à jour : **46 moments**, dont **27 sur la page
d'accueil**, portés par six matières différentes — points en 3D, grille mesurée
au navigateur, plans HTML en perspective, Canvas 2D, pellicule de captures,
filets et balayages.

Le compte passe de 45 à 46, ce qui n'est pas le sujet : le sujet est que deux
mouvements qui ne disaient rien ont disparu.

---

## Mission 5 — Les technologies

Aucune bibliothèque installée. `three` reste en imports sélectifs, sans
dépendance transitive. Le tableau des treize écartées et de leur motif est
dans `DECISIONS.md`.

---

## Mission 6 — Le professionnalisme

- **Un seul surtitre.** La page en portait deux grammaires : `.su-surtitre` en
  chasse fixe avec son filet, et un empilement Tailwind en ligne, même couleur
  mais police proportionnelle et sans filet. Quatre sections utilisaient la
  seconde.
- **Des numéros de section**, de `01 — Ouverture` à `11 — Démarrons`.
- **Des filets plutôt que des cartes** pour le verdict.
- **Un seul blanc.** Huit pages utilisaient `#F8FAFC` là où trente utilisaient
  l'ivoire `#FFFDF9` de la marque.

---

## Mission 7 — Les pages intérieures

**Vingt-quatre pages ouvraient sur la même bande sombre**, copiée à
l'identique. Comme plusieurs de ces fichiers sont des gabarits — une page par
ville, une par métier, une par solution — elle se répétait en réalité sur
plusieurs centaines d'URL.

Vingt passent sur `MiniHero`, avec une signature par famille :

| Famille | Signature | Mécanisme |
|---|---|---|
| services, solutions, métiers, outils | `trace` | un schéma qui se câble |
| territoire | `maillage` **(nouveau)** | une couverture qui gagne du terrain |
| éditorial | `colonne` **(nouveau)** | des lignes de texte qui se composent |
| devis, offre | `signal` | des ondes concentriques |
| faq, plan du site | `sobre` | rien |

`/comparatif/wix-wordpress-sur-mesure` reste à l'écart : c'est une page
entièrement sombre, pas une page claire avec une bande rapportée.

### Ce que l'élargissement de l'audit a révélé

Le scan de contraste visitait **douze routes sur quarante-deux**, toutes déjà
jugées bonnes. Porté à **trente et une**, choisies pour couvrir au moins un
représentant de chaque gabarit, il est immédiatement passé de 0 à **13 nœuds
en échec**. Tous corrigés :

- `.float-field label` en `rgba(30,58,95,0.5)` → **2,75:1**. Ça concernait
  toutes les étiquettes flottantes des formulaires du site, et `.toc-link`
  avait la même valeur pour le sommaire des articles. Porté à 5,5:1.
- Le repère de `MiniHero` en `.section-marker` → **≈ 2,6:1**. Passé sur
  `.su-surtitre`, 4,94:1.
- Le studio de style choisissait la couleur du texte de ses maquettes par un
  **seuil de luminance**. Un seuil n'est pas un contraste : sur un bleu comme
  #4F9CF9 il donnait du blanc à **2,81:1**. Le fichier contenait déjà
  `fixContrast()`, qui ajuste jusqu'à 4,5:1, et ne s'en servait pas ici.
- 22 × `text-gray-500` sur gris clair (4,39:1).
- **Deux formulaires sans étiquettes**, signalés « critical » : les six champs
  du cahier des charges et le curseur « articles par mois ».

### Le défaut le plus sérieux

`CahierClient` — le formulaire guidé de cahier des charges — était écrit pour
un fond sombre. Sa page est en ivoire. **Le texte tapé par le visiteur
s'affichait en blanc sur ivoire : invisible.** Vérifié à la capture avant de
corriger, puis entièrement reteint.

Ce n'est pas une régression de ce lot : la racine de cette page était déjà
ivoire avant que j'y touche. La bande sombre en haut faisait illusion.

---

## Mission 8 — Ce qui a été observé, et ce que la mesure a démenti

### Un défaut grave trouvé à l'écran

**Les deux barres du comparateur de prix n'étaient pas affichées**, sur le
site en ligne. Pas « mal cadrées » : absentes. `.cp-track` mesurait 25,6 px au
lieu de 40 sans aucun fond, `.cp-bar` faisait 0 px de haut sans dégradé, et
l'étiquette restait en `position: static` et en italique — le style par défaut
de `<em>`.

La cause : **styled-jsx scope ses styles par composant**. Les trois éléments
sont rendus par `Barre` ; leurs règles vivaient dans le bloc de
`ComparateurPrix`. C'est une régression que j'ai introduite moi-même en
extrayant `Barre` pour corriger une étiquette rognée — j'avais vérifié le
texte de l'étiquette, pas la présence des barres.

### Deux soupçons que la mesure n'a pas confirmés

Les deux viennent d'une capture regardée. Les deux sont restés **sans
correction**, parce que la mesure ne leur a pas donné raison.

| Soupçon | Mesure | Décision |
|---|---|---|
| En 390 px le voile de particules « salit » le fond | Mesure différentielle (même cadre, canvas affiché puis masqué) : **1,65 niveau de luminance sur 255**, contre 1,43 en 1440 px. L'hypothèse d'une densité plus forte prévoyait un facteur 3,7 ; l'écart réel est de 16 %. | Rien changé |
| Le nuage mord sur le titre du verdict | **0,24 niveau en moyenne, 3 % des pixels touchés** | Rien changé |

### Trois outils de mesure, dont deux étaient faux

- `scripts/grain.mjs` — première version : écart-type d'une bande fixe. Son
  résultat (un minimum de luminance à 21 sur un fond ivoire) trahissait du
  **texte** dans la zone : elle mesurait la présence de lettres, pas le grain.
  Refaite avec un témoin.
- `scripts/cadrer.mjs` — en 390 px, la démonstration logicielle passe de 4 à
  12 lignes selon l'avancement ; les captures tombaient 2 000 px au-dessus de
  la cible et montraient la section **précédente**.
- `scripts/scan-contraste.mjs` — couvrait douze routes sur quarante-deux.

---

## Mission 9 — Performance, accessibilité, fiabilité

| Contrôle | Résultat |
|---|---|
| `npm run build` | ✓ compilé, 0 erreur |
| `npx next lint` | ✓ 0 avertissement |
| `scripts/qa-complet.mjs` | 25 / 25 |
| `scripts/scan-contraste.mjs` (axe-core) | **0 nœud en échec sur 31 routes** |
| `scripts/detecter-invisibles.mjs` | 0 élément graphique sous 3:1, sur 19 pages |
| `scripts/defilement-horizontal.mjs` | **0 px** en 360, 390, 430, 768, 1024, 1440 |
| `scripts/replis.mjs` | les 4 voies tiennent — sans script, 264 blocs de texte lisibles en plein jour |
| Poids de l'accueil | **24,7 ko · 130 ko** de JS au premier chargement, contre 27,8 · 133 avant |

Un défaut de référencement corrigé au passage : `/offre-rentree` appelle
`notFound()` depuis que l'offre est close, mais le plan du site la déclarait
toujours — une URL annoncée aux moteurs qui répond 404. L'audit passe de 8 à
7 échecs et la catégorie « fetch » disparaît.

---

## Ce qui n'a PAS été fait

- **Six dépôts de la mission 1 ne sont pas lus** : Theatre.js, three-stdlib,
  maath, Rive, WebGPU samples, Tweakpane.
- **7 échecs `seo-lint`** subsistent sur 100 pages : titres et descriptions
  trop longs sur `/laboratoire`, `/parrainage` et `/outils/studio-de-style`,
  trop peu de liens internes dans le corps de `/laboratoire` et
  `/configurateur`. Aucun ne concerne l'accueil ni les en-têtes. **Aucun n'a
  été corrigé.**
- **`/comparatif/wix-wordpress-sur-mesure` n'a pas été retravaillée.**
- **Le rotationnel du shader** n'est pas un rotationnel exact : il combine les
  différences d'un bruit scalaire au lieu de dériver un bruit vectoriel. Noté
  comme dette.
- **1,6 Mo de doublons à double extension** restent dans `public/` —
  `hero-accueil.mp4.mp4`, `portrait-fondateur.webp.png`,
  `hero-monument-s.webp.png`. J'attends votre décision avant de supprimer des
  fichiers.
- **Les captures ont été prises en 1440 et 390** (et 1280 pour les en-têtes
  intérieurs). Les largeurs intermédiaires sont couvertes par le contrôle de
  débordement, pas par une capture regardée.
- **Aucun test sur un appareil réel.** Tout est mesuré sous Chromium avec
  SwiftShader : un rendu logiciel, sans GPU.
