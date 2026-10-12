# STACKUP — INVENTAIRE TECHNIQUE

> Phase 4. Ce que le site utilise réellement, où c'est implémenté, ce que ça coûte et ce que ça ne fait pas.
>
> Rien de ce qui figure ici n'est « prévu » ou « en cours » : tout est dans le dépôt et s'exécute.

---

## 1. Rendu 3D

| Élément | Emplacement | Détail |
|---|---|---|
| Moteur | `three@0.186.1` | MIT, 0 dépendance transitive. Imports sélectifs : 13 classes seulement. |
| Scène | `src/lib/webgl/monolithe.ts` | Framework-agnostique — instanciable dans un test ou un banc sans monter d'arbre React. |
| Shaders | `src/lib/webgl/monolithe.glsl.ts` | GLSL écrit à la main. Vertex : assemblage, respiration, désassemblage, parallaxe. Fragment : balayage gaussien, arêtes supérieures, rasance, liseré de Fresnel, grain procédural. |
| Qualité | `src/lib/webgl/quality.ts` | Moyenne glissante sur 60 trames, hystérésis, repos de 1,8 s. 3 paliers : 190 / 120 / 70 instances. |
| Cycle de vie | `src/lib/webgl/lifecycle.ts` | `libererGraphe()` retourne le décompte des ressources libérées — vérifiable dans un test plutôt que supposé. `demonterScene()` appelle `dispose()` **et** `forceContextLoss()`. |
| Monture React | `src/components/webgl/Monolithe.tsx` | `import()` dans l'effet : `three` n'entre jamais dans le bundle initial. |

### Pourquoi `three` brut et non React Three Fiber

Données npm relevées lors de la recherche (Phase 2) :

| Paquet | Poids décompressé | Dépendances |
|---|---|---|
| `three` | 19 964 ko | **0** |
| `@react-three/fiber` | 2 323 ko | 10 |
| `@react-three/drei` | 1 713 ko | **21** |
| `three-stdlib` | 25 787 ko | — |

Une seule scène, montée une fois. Le réconciliateur de R3F apporte une abstraction dont le site n'a aucun usage, au prix de 31 dépendances transitives.

### Ce que la scène ne fait pas

- **Aucun post-traitement.** Pas de bloom, pas de profondeur de champ. Sur fond ivoire, le bloom lave les contrastes.
- **Aucun chargement de modèle.** Tout est géométrie procédurale : une `BoxGeometry` instanciée.
- **Aucun texte dans le canvas.** Le H1, les CTA et les chiffres sont dans le DOM.
- **Aucune physique, aucune interaction au clic.** Le pointeur ne pilote qu'une parallaxe.

---

## 2. Animation et mouvement

| Élément | Emplacement | Détail |
|---|---|---|
| Système | `src/styles/stackup.css` | 4 durées, 3 courbes, 1 décalage. Aucune valeur écrite à la main dans les composants. |
| Grammaire d'entrée | `.su-pose-*` | Une seule animation d'apparition pour tout le site. |
| Révélation typographique | `.su-ligne-masque` / `.su-ligne-interne` | **En CSS pur**, démarrée à la première peinture. Le texte reste intégralement dans le DOM. |
| Lumière rasante | `.su-rasante`, `--su-angle-lumiere` | Angle **-18°** partagé entre le DOM et le shader, passé en uniforme — la cohérence est vérifiable, pas approximative. |

**Aucune bibliothèque d'animation.** `gsap` et `framer-motion` étaient déclarés mais importés par **aucun code vivant** ; ils ont été retirés. La licence de GSAP s'est par ailleurs révélée non libre à la lecture de son fichier `LICENSE.md` (« Standard "no charge" license »).

### Règle structurelle : l'état masqué n'est jamais l'état de repos

Un élément invisible par défaut qui attend une classe pour apparaître devient **définitivement invisible** si cette classe n'arrive pas. C'est exactement ce qui s'était produit avec `.check-item` : les six éléments inclus de chacune des six offres de `/services` n'étaient jamais affichés, sans la moindre erreur en console.

Deux garde-fous en découlent :
- Les primitives ne masquent leur contenu que sous `.su-js`, classe posée de façon **synchrone** dans `<head>`.
- Les 23 sélecteurs du site en `opacity: 0` ont été audités un par un.

---

## 3. Logique métier

| Module | Emplacement | Testé par |
|---|---|---|
| Laboratoire | `src/lib/laboratoire.ts` | 12 assertions |
| Configurateur | `src/lib/configurateur.ts` | 7 assertions |
| Contraste | `src/lib/contraste.ts` | utilisé par 3 composants |
| Palette | `src/lib/palette.ts` | couvert par le contrôle qualité Playwright |

### Choix notables

**Montants en centimes entiers.** Aucun flottant dans les calculs du laboratoire. Un euro flottant finit toujours par produire un total faux d'un centime — précisément le détail qui décrédibilise une démonstration de logiciel de gestion.

**Aucun prix inventé.** Un test vérifie que **tout** montant affiché par le configurateur existe dans `SITE.pricing`, et que les options sans tarif public restent « sur devis » sans contribuer au total.

**Recherche par sous-séquence** dans la palette : « sve » trouve « Site VitrinE ». Un `includes` simple obligerait à taper le début exact.

**Couleur de texte calculée** quand la couleur de fond est une donnée : l'accent d'un projet vient de sa fiche, pas d'un choix de mise en page. `texteLisibleSur()` choisit entre encre et blanc ; `assombrirJusquAu()` dérive une variante lisible **en conservant la teinte du projet** ; `composer()` calcule le fond composite réel plutôt que de supposer l'ivoire pur.

---

## 4. Accessibilité

| Mécanisme | Emplacement |
|---|---|
| Repère principal unique | `src/app/layout.tsx` — `<main id="contenu">` |
| Lien d'évitement | `.su-evitement`, premier élément focalisable |
| Palette ⌘K | motif ARIA combobox complet, focus restitué à la fermeture, défilement d'arrière-plan verrouillé sans décalage |
| Menu mobile fermé | `inert` — retire le sous-arbre de l'ordre de tabulation, ce que `aria-hidden` seul ne fait pas |
| Mouvement réduit | coupe la scène 3D, les balayages et les transitions ; **ne rend rien invisible** |
| Contraste | 0 violation sur 20 pages à 390 px et 18 pages à 1 440 px |

**Outil de vérification :** `scripts/scan-contraste.mjs`, qui interroge axe-core et regroupe les échecs par classe CSS pour pouvoir corriger à la source.

---

## 5. Performance

| Levier | Mise en œuvre | Effet mesuré |
|---|---|---|
| `three` hors bundle initial | `import()` dans l'effet | Le paquet n'est jamais téléchargé en mouvement réduit ou sans WebGL |
| Laboratoire monté à l'approche | `IntersectionObserver`, marge de 400 px | L'accueil reste à 128 ko de First Load malgré l'ajout d'une application complète |
| Suppression du code mort | 13 composants, 2 moteurs d'animation, 748 classes `dark:` inertes | Voir le relevé honnête ci-dessous |
| Bandeau cookies rendu côté serveur | classe `su-consenti` posée avant peinture | Élément LCP : **2 296 → 1 248 ms** |
| Rendu suspendu hors écran | `IntersectionObserver` + `visibilitychange` | Aucun cycle GPU quand la scène n'est pas visible |
| Perte de contexte GL gérée | `webglcontextlost` / `restored` | Évite le canvas noir définitif après une mise en veille |

### Résultat mesuré, en mobile simulé

| Page | Perf | A11y | Bonnes pratiques | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| `/` | 92 | **100** | 100 | 100 | 3,0 s | 150 ms | **0** |
| `/laboratoire` | 95 | **100** | 100 | 100 | 2,9 s | 10 ms | **0** |
| `/configurateur` | 95 | **100** | 100 | 100 | 2,9 s | 0 ms | **0** |
| `/services` | 95 | **100** | 100 | 100 | 2,9 s | 0 ms | **0** |
| `/tarifs` | 95 | **100** | 100 | 100 | 2,9 s | 20 ms | **0** |
| `/blog` | 92 | **100** | 100 | 100 | 3,3 s | 70 ms | **0** |

Rappel de la référence mesurée avant travaux sur `/` : **78 de performance, TBT 570 ms, LCP 3,1 s**.

La tâche longue de **452 ms** attribuée au CSS dans l'audit initial **n'apparaît plus** dans le relevé — alors même que le CSS a légèrement grossi. La taille du fichier n'était donc pas la cause directe de cette tâche longue, contrairement à ce que l'audit laissait supposer. C'est une hypothèse de l'audit que les mesures ont corrigée.

---

## 6. Ce qui reste faible, dit franchement

| Point | État | Ce qu'il faudrait |
|---|---|---|
| **LCP à 3,0 s** | Le plancher n'a pas été franchi. | Trois familles de polices sont chargées sur toutes les pages. Les réduire à deux, ou sous-ensembler JetBrains Mono qui ne sert qu'à de petits libellés, est la piste la plus probable. Non tenté ici : cela touche l'identité typographique, qui n'est pas un arbitrage technique. |
| **Remontée de palier non observée** | Le chemin de dégradation est vérifié, pas celui de remontée. | Une machine avec GPU. Impossible dans ce conteneur. |
| **Aucune mesure de terrain** | Tous les chiffres sont de laboratoire, sans GPU. | Des données réelles au 75e percentile. |
| **Le CSS a grossi, pas diminué** | **174 697 → 183 301 octets** (+5 %), répartis sur deux fichiers tous deux chargés sur chaque page. | Dit franchement : l'objectif d'allègement du CSS n'est pas atteint. Le site a gagné un système de design complet, le laboratoire, le configurateur, la palette et les schémas de service pour +8,6 ko — c'est contenu, mais c'est une hausse. Le vrai chantier reste la migration de `globals.css` (88 blocs `@keyframes`) vers `stackup.css` (8). |
