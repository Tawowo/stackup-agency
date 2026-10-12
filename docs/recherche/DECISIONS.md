# Ce que la recherche change concrètement

Les notes de lecture sont dans `NOTES-BRUTES.md`, avec le fichier lu pour
chaque dépôt et la liste nommée de ceux que je n'ai pas pu ouvrir.

Ce document-ci ne répète pas les notes. Il dit ce que j'en fais.

---

## Les six techniques retenues

### 1. Rendre la main au défilement — Lenis
`onVirtualScroll` s'arrête dès qu'un nœud du chemin porte
`data-lenis-prevent` (ou ses variantes `-vertical`, `-horizontal`, `-touch`,
`-wheel`), ou qu'un conteneur imbriqué peut encore défiler.

**Ce que j'en fais :** je n'installe pas Lenis. Je reprends le principe — un
attribut qui rend la main. Mes sections pilotées par le défilement ne
confisquent rien, mais rien ne le garantissait explicitement. C'est
maintenant une règle écrite plutôt qu'un effet de bord.

### 2. Le pas fixe avec accumulateur — react-three-rapier
`clampedDelta = clamp(dt, 0, 0.5)`, puis
`while (accumulator >= timeStep) { step(timeStep); accumulator -= timeStep }`,
avec interpolation au rendu par `accumulator / timeStep`.

**Ce que j'en fais :** mon réseau de modules intègre ses ressorts à `dt`
variable. Sur une image longue — un onglet qui revient au premier plan, un
appareil qui rame — l'intégration explose. Je corrige avec un accumulateur.
C'est un vrai défaut, trouvé par la lecture, pas par un test.

### 3. Le découpage de texte accessible — anime.js v4
Un span visuellement masqué portant le `innerHTML` d'origine est inséré en
premier enfant, puis toutes les lignes, mots et caractères reçoivent
`aria-hidden="true"`.

**Ce que j'en fais :** mon titre découpé lettre par lettre utilise
`aria-label` plus des espaces `sr-only`. C'est plus fragile : le
copier-coller donne « faitdécollervotre », et j'ai déjà dû corriger ce bogue
deux fois. J'adopte le motif d'anime.js. Je n'importe pas la bibliothèque.

### 4. Accumuler les deltas plutôt que relire la géométrie — curtains.js
`updateScrollPosition(dx, dy)` ajuste les positions à partir des deltas,
avec ce commentaire dans le dépôt : « set new positions based on our delta
without triggering reflow ».

**Ce que j'en fais :** plusieurs de mes composants appellent
`getBoundingClientRect()` à chaque image de défilement. C'est un reflow par
image et par composant. Je mets en cache à l'entrée et au redimensionnement.

### 5. Le bruit sans texture — webgl-noise (MIT)
Hachage arithmétique par `mod289` + `permute`, aucun accès texture, gradients
sur un octaèdre, masque radial à la puissance 4.

**Ce que j'en fais :** c'est déjà la base de mon `bruit()`. La lecture
confirme pourquoi il tient dans un vertex shader exécuté 56 000 fois par
image : zéro lecture mémoire. Je conserve, et j'ajoute l'avis de copyright
qui manquait.

### 6. Le rotationnel — lygia
`const float e = .1`, différences centrées, et
`return normalize(vec3(x, y, z) * divisor)` par défaut.

**Correction de ce que j'avais d'abord écrit ici :** j'avais noté que mon
rotationnel ne normalisait pas. C'est faux — la lecture de mon propre code
montre `return normalize(vec3(n1 - n2, n2 - n3, n3 - n1) + 1e-5)`. Sur ce
point je faisais déjà la bonne chose.

**La vraie différence, elle, subsiste :** lygia calcule un rotationnel EXACT
à partir d'un bruit VECTORIEL (`float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y`),
alors que le mien combine les différences d'un bruit SCALAIRE. Le champ
obtenu est plausible et sans divergence apparente, mais ce n'est pas
mathématiquement un rotationnel.

**Ce que j'en fais : rien, pour l'instant.** Le résultat à l'écran est bon et
la métamorphose repose dessus. Changer le champ de turbulence maintenant,
sans nécessité visuelle, c'est risquer le seul élément du hero qui
fonctionne déjà. Noté comme dette, pas comme correction.

---

## Les technologies écartées, et la raison

| Écartée | Raison, tirée de la lecture |
|---|---|
| **GSAP / ScrollTrigger** | Le `pin-spacer` est exactement ce que je réimplémente à la main. Mais GSAP n'est pas MIT, et le projet revendique zéro dépendance transitive. Je reprends la mécanique, pas le paquet. |
| **Three.js postprocessing** | `EffectComposer` alloue DEUX cibles half-float plein écran. En 1440×900 à dpr 1.75 : ≈ 63 Mo de VRAM avant le moindre effet. Pour un nuage déjà en additif, le bloom ajoute des passes pour un gain faible. |
| **Drei `MeshTransmissionMaterial`** | Une passe de scène COMPLÈTE en plus par image, deux avec `backside`. Doubler le coût de rendu pour un effet de verre. |
| **React Three Fiber** | `useLoader` suspend, `useFrame` s'abonne à un store — tout cela suppose une architecture R3F. Le moteur actuel est en imports sélectifs de Three, sans dépendance transitive. Migrer coûterait tout l'existant. |
| **OGL** | Remplacerait Three plutôt que le compléter. Gain de poids marginal, perte de tout le travail fait. |
| **PixiJS** | Un second moteur de rendu complet. Pour une distorsion, un `ShaderMaterial` sur un quad coûte une dépendance de moins. |
| **react-three-rapier** | Un moteur physique WASM pour huit nœuds reliés par des ressorts. |
| **troika-three-text** | Un draw call par bloc, c'est excellent. Mais du texte en 3D n'est ni sélectionnable, ni indexable, ni lisible par un lecteur d'écran. Pour une agence dont le référencement est un argument de vente, c'est un contresens. |
| **Lottie** | Suppose un fichier After Effects. L'agence n'en a pas. |
| **gltfjsx** | L'agence n'a aucun modèle 3D. Un outil sans matière première. |
| **Paper.js** | Ajuster des Béziers sur un tracé dense sert quand on part d'un dessin à main levée. Mes tracés sont construits. |
| **animate.css** | Valeurs en pixels absolus, rythme verrouillé en pourcentages, aucune variable exposée. C'est la définition de la « même recette partout ». *(Et il contient un bogue : à 80 %, `transition-timing-function` au lieu de `animation-timing-function`, sans effet dans un `@keyframes`.)* |
| **TSL / WebGPU** | Réécrirait tout le moteur pour un gain invisible à 56 000 points. À reconsidérer le jour où la scène deviendrait une simulation GPU. |
| **Barba** | Next.js gère la navigation. Mais son principe — jouer la sortie PENDANT le chargement — est transposable avec l'API View Transitions. |

**Bilan des dépendances : aucune ajoutée.** Six techniques reprises, treize
bibliothèques écartées avec un motif chiffré. C'était l'objet de la
recherche : savoir ce qu'on ne prend pas.

---

## Les trois directions artistiques, et celle que je retiens

### A — LA CHAMBRE NOIRE
Tout le site dans l'encre ; la lumière révèle le contenu par flaques. Hero :
typographie monumentale balayée par une source lumineuse mobile.

- **Pour :** spectaculaire au premier regard, immédiatement premium.
- **Contre :** c'est à moitié ce que fait déjà le site. Et un site
  commercial entièrement sombre handicape la lecture des offres et des prix,
  qui sont l'argument de vente. **Écartée : spectaculaire mais contraire au
  but commercial.**

### B — LA MATIÈRE
Le travail de l'agence présenté comme des matériaux : épaisseur, tranches,
lumière rasante. Sections = plaques qui glissent et s'empilent.

- **Pour :** tactile, mémorable, et le nom de l'agence le suggère.
- **Contre :** la typographie extrudée en 3D est un poncif daté, et
  l'empilement de plaques est déjà la mécanique de l'anatomie. **Écartée :
  redite interne et référence usée.**

### C — LE PLAN HABITÉ ✅ RETENUE
Le site se présente comme un **plan technique habité** : une grille de
construction visible, des cotes, des repères, des annotations en chasse
fixe — et, à l'intérieur de ce système de mesure, un objet monumental qui
vit et se transforme.

- **L'idée centrale :** le professionnalisme ne vient pas d'ajouter des
  effets, il vient de montrer que tout est mesuré. La grille n'est pas un
  ornement : c'est le système d'alignement auquel toute la page obéit, et
  elle est visible pour qu'on le sache.
- **Pourquoi elle répond au reproche :** « composition amateur » vient
  d'alignements incohérents et d'espacements irréguliers. Une grille
  affichée rend l'incohérence impossible à cacher — elle force la rigueur
  au lieu de la promettre.
- **Pourquoi elle est futuriste sans être froide :** la mesure est vivante.
  Les cotes suivent l'objet, les repères se mettent à jour, la grille fuit
  en perspective vers un horizon. C'est une salle de contrôle, pas un plan
  imprimé.
- **Pourquoi elle est à Stackup et à personne d'autre :** une agence qui
  construit des sites montre ses instruments de construction. Le même geste
  que l'anatomie, mais érigé en système pour toute la page.
- **Le mécanisme principal :** une grille en perspective rendue dans le
  shader existant (pas un nouveau moteur), des cotes en SVG qui suivent des
  ancres DOM, et une typographie alignée au pixel sur cette grille.
- **Le risque :** la froideur. Je le corrige par l'échelle — les titres
  doivent être monumentaux — et par l'ambre, qui reste la seule couleur
  chaude et donc le point de chaleur de toute la page.
