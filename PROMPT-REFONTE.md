# Refonte intégrale de stackup-agency.fr — prompt de réalisation

Tu es chargé de reconstruire le site de Stackup Agency. Lis ce document en entier avant d'agir, puis lis `CLAUDE.md`. Commence par la section 11 (méthode), qui dit par quoi commencer et dans quel ordre.

---

## 1. Mission et niveau d'ambition

Stackup Agency est une agence web d'une personne (Mathéo Reboul, Tours, Indre-et-Loire) qui fabrique des **sites et des outils sur mesure** pour les artisans, commerçants, TPE, professions libérales et associations. Elle vend aussi des logiciels de gestion sur mesure (devis, factures, planning, prise de rendez-vous, click & collect…).

Le site actuel (archive dans `../stackup-agency-20261012/`, à utiliser comme **référence de contenu, jamais comme base de code**) est jugé par son propriétaire banal, statique, mal composé, et indigne de ce qu'il livre à ses clients. La preuve : un site de démonstration livré à un client (Hydr'eaux, recherche de fuites) avec une scène WebGL persistante, des shaders, un moteur de qualité adaptative, des sections où « tout bouge », a laissé le client sous le choc. Le site de l'agence doit dépasser cette démo.

**Objectif mesurable.** Être, de très loin, le site d'agence web local le plus spectaculaire qu'un artisan ou un commerçant ait jamais ouvert, tout en restant lisible, rapide sur téléphone, et en donnant envie d'écrire. Un site spectaculaire qui ne vend pas est un échec ; un site qui vend sans impressionner aussi.

**Ce qui définit « spectaculaire » ici, concrètement :**

- Une scène 3D persistante, **vivante en permanence** (jamais figée au repos : respiration, balayage de lumière, dérive lente), qui réagit au pointeur, au scroll, au drag, au clic, et qui se **transforme** à chaque section pour raconter l'offre.
- Zéro section « posée » : chaque moment de l'accueil a son propre mécanisme nommé, et aucun ne réutilise le geste d'un autre.
- Des compositions asymétriques, monumentales, avec de la typographie très grande, de l'air, et un élément qui déborde par section.
- Des pages intérieures (tarifs en premier) aussi travaillées que l'accueil, pas des gabarits.
- Un mobile qui reste proche de la composition desktop : même scène, même objet, compositions en portrait.

**Ce qui n'est pas l'objectif :** une page de démos techniques sans contenu commercial ; un site « jamais vu » au sens absolu (les sites primés font déjà tout ceci) ; un chantier qui livre d'abord de la plomberie et le spectacle en dernier.

---

## 2. Règles bloquantes

Elles priment sur tout le reste du document. Si une instruction plus bas semble les contredire, elles gagnent.

1. **Le spectacle d'abord.** La première chose construite est le Stack Engine et le hero, sur `/lab` puis sur `/`. Pas de migration de contenu, pas de blog, pas de SEO avant que le hero ne soit validé visuellement.
2. **Rien n'est fait sans captures lues.** Pour chaque expérience et chaque page : captures Playwright à 1440 × 900 et 390 × 844, aux états de scroll listés, avec et sans `prefers-reduced-motion`. Chaque fichier image est ouvert avec l'outil de lecture d'image et commenté dans `docs/qa/rapport.json` (ce qui est visible, ce qui cloche, ce qui a été corrigé). Une capture non ouverte n'existe pas.
3. **Un seul objet 3D (le Stack Engine), un seul canvas persistant, un seul ticker.** Pas de deuxième système d'animation, pas de nuage de particules décoratif, pas de `setInterval`, pas de rAF maison.
4. **Vocabulaire d'apparition fermé** (§ 3.5). Le fondu + translation verticale est interdit hors blog et FAQ. Une revue `grep` doit le prouver.
5. **Chaque interaction essentielle fonctionne au clic/tap et au clavier.** Le survol n'est qu'agrément. Aucun contenu masqué par défaut sans JS.
6. **Honnêteté commerciale** : prix en « à partir de » partout, aucune durée de livraison, aucun comparatif de prix avec « les agences », aucun « hébergement France », aucun témoignage/chiffre/client/garantie inventé, réalisations actuelles étiquetées « Démo », pas d'offre « site association », pas d'offre rentrée. Fondateur : Mathéo Reboul, sans âge.
7. **Aucune API d'IA ni service payant à l'usage** dans le site livré.
8. **Dépendances limitées à la liste § 5.** Tout ajout est motivé par écrit dans `docs/JOURNAL.md`.
9. **Le logo est intouchable** : `Logo_Stackup-Agency.png` / `logo_Stackup-Agency_seul.png` sont la source. L'état de repos du Stack Engine reproduit exactement la silhouette des trois plaques du logo (superposition testée, § 11.4).
10. **Pas de document à la place du travail.** Pas de `.md` de plus de 150 lignes en sortie de session. Le journal reste court.
11. **Ne jamais déclarer terminé** avant les critères du § 13.
12. **Mobile capturé avant validation** de chaque moment. Pas de « on verra le mobile après ».
13. **Les états intermédiaires sont capturés**, pas seulement l'état final : une animation belle à la fin mais cassée pendant la transition est un échec. Le scroll inverse est testé.
14. **Un prototype isolé n'est pas une livraison** : `/lab` sert à régler le moteur, le résultat doit être intégré dans les pages.

---

## 3. Direction artistique et système visuel

### 3.1. Concept : « La Pile »

Le logo de Stackup est **trois plaques pliées, empilées** (navy, navy, ambre) qui forment un S. Le site prend ce fait au pied de la lettre : **une plaque est l'unité de fabrication**. Des centaines de plaques identiques, instanciées, forment le logo au repos, puis se réorganisent pour devenir ce que l'agence fabrique : une page, un site multi-pages, une boutique, un logiciel, un réseau de modules. Le visiteur comprend en cinq secondes, sans lire, que cette agence **empile des couches pour construire un outil**.

Cet objet unique est le fil de tout le site : hero, strates, offres, réalisations, tarifs, 404, transitions de page. Il n'y a pas de décor. Tout ce qui est en 3D est une plaque.

### 3.2. Univers : « Le chantier de nuit »

Sombre dominant. Le site est un atelier la nuit : fond d'encre profonde, et **l'ambre du logo est la seule source de lumière**. Les plaques navy ne sont visibles que parce que l'ambre les éclaire : reflets sur les arêtes, ombre portée longue, halo contrôlé (jamais de glow flou décoratif, jamais de glassmorphism). Les moments de calme commercial (offres, prix, méthode) passent sur **ivoire** : la lumière s'allume, on lit, on décide. Le retour au sombre est toujours motivé par la scène (les plaques occultent la lumière, ou la section « descend » dans l'atelier).

Matières : encre et métal brossé. Grain fin (bruit bleu, 2-3 % d'amplitude) sur les fonds sombres et sur les plaques. Bords nets. Ombres à −18° partagées entre CSS et 3D (une seule constante `--su-lumiere-angle`).

### 3.3. Tokens (`src/styles/tokens.css`)

| Variable | Valeur | Rôle |
| --- | --- | --- |
| `--su-encre` | `#060B14` | Fond de l'atelier (dominant) |
| `--su-encre-2` | `#0A1220` | Surfaces sombres en relief |
| `--su-navy` | `#0D2C4C` | Plaques, structure, titres sur ivoire (aligné sur le logo) |
| `--su-navy-clair` | `#1C4A78` | Arêtes éclairées des plaques |
| `--su-ambre` | `#F69106` | Lumière, actions, pli (logo) |
| `--su-ambre-clair` | `#FFB84D` | Ambre sur sombre (texte, reflets) |
| `--su-ambre-texte` | `#B45309` | Ambre lisible sur ivoire |
| `--su-ivoire` | `#FFFDF9` | Fond des moments de lecture |
| `--su-ivoire-creuse` | `#F3EFE6` | Champs, fiches, plaques HTML |
| `--su-graphite` | `#8A97A8` | Cotes, texte doux sur sombre |
| `--su-graphite-ivoire` | `#64748B` | Texte doux sur ivoire |
| `--su-lumiere-angle` | `-18deg` | Direction unique de la lumière |
| `--su-nuit` | `0 → 1` | Variable pilotée par le scroll : 1 = encre, 0 = ivoire. Le fond, les couleurs de texte et le fond du canvas en dérivent. |

Pas de bleu électrique, pas de dégradés multicolores, pas de violet. Deux couleurs de structure, une lumière.

### 3.4. Typographie

| Rôle | Police | Tailles |
| --- | --- | --- |
| Display | **Poppins** 600/700 (famille du lettrage du logo), chargée en local via `next/font/local` ; `Urbanist` acceptée si Poppins paraît trop vue après une capture comparative | Mot porteur `clamp(4.5rem, 17vw, 16rem)`, interlignage 0,9 ; Display XL `clamp(2.75rem, 7vw, 6rem)` ; H1 intérieur `clamp(2.4rem, 4.5vw, 4rem)` ; H2 `clamp(1.75rem, 2.8vw, 2.5rem)` |
| Texte | **Inter** variable | 1rem / 1.125rem, interlignage 1,55 ; `tabular-nums` dès qu'un chiffre bouge |
| Technique | **JetBrains Mono** 400/600 | 0.8125rem, capitales espacées 0.08em, pour les cotes, fiches de fabrication, étiquettes |

Les titres longs cassent à un mot choisi (`<br>` éditorial). Les titres sont **immenses** : un mot porteur par grand moment, qui touche les bords du conteneur.

### 3.5. Mouvement

Quatre durées : réflexe 140 ms, geste 320 ms, pose 620 ms, scène 1 100 ms. Trois courbes : `--su-pose: cubic-bezier(.16,.84,.28,1)` (ce qui arrive), `--su-glisse: cubic-bezier(.33,0,.1,1)` (ce qui se déplace), `--su-sortie: cubic-bezier(.5,0,.75,0)` (ce qui part). Cascade 70 ms, 6 éléments maximum.

Vocabulaire d'apparition par famille (le seul autorisé) :

| Famille | Geste | Durée |
| --- | --- | --- |
| Titres | SplitText par mots ; chaque mot se **déplie** depuis sa ligne de base (`rotateX(-90deg)` → 0, `transform-origin: bottom`), avec une arête ambre qui s'allume puis s'éteint au passage | 620 ms, cascade 70 ms |
| Plaques HTML, fiches | **Découpe** : `clip-path: inset(0 100% 0 0)` → `inset(0)`, puis l'ombre se pose | 620 ms |
| Images, captures | **Masque** qui s'ouvre du côté de la lumière (−18°) | 1 100 ms |
| Chiffres (prix, cotes) | **Cadran** à roues, chiffres tabulaires | 900 ms |
| Schémas SVG | **Tracé** `stroke-dashoffset` puis remplissage | 900 + 400 ms |
| Listes éditoriales (blog, FAQ) | fondu + 8 px, seul endroit où c'est permis | 320 ms |

Le **mouvement permanent** (sans interaction) est obligatoire sur la scène : respiration des plaques (±1,5 % d'échelle, période 6 s, déphasée par instance), balayage lumineux lent (une bande d'ambre parcourt la pile toutes les 9 s), dérive de caméra (orbite de ±2° sur 12 s). Le site n'est jamais immobile, mais jamais agité : le mouvement de fond est lent, le mouvement d'interaction est vif.

### 3.6. Composition

Grille de 12 colonnes (calque visible par la touche `G`), gouttières 24 px, conteneurs 1 200 px (texte) / 1 440 px (scènes) / pleine largeur (pellicule). Compositions asymétriques : masse à gauche, air à droite, ou l'inverse par intention ; au moins 30 % de vide actif par section ; un élément déborde de la grille par section ; jamais de centré-centré sauf les Seuils. Pas de cartes arrondies : des **plaques** HTML à angles de 4 px, ombre posée à −18°.

### 3.7. Composants récurrents (`src/components/ui`)

- **Plaque** : surface à angles 4 px, ombre à −18°, variante encre / ivoire-creuse. Remplace toute carte.
- **Cote** : trait + valeur en chasse fixe, toujours une mesure réelle (`ResizeObserver`), jamais décorative.
- **Fiche de fabrication** : bloc mono avec étiquettes (type, pages, fonctions, hébergement, propriété du code). Une par offre, par réalisation, par solution.
- **Cadran** : chiffre à roues pour les prix.
- **Seuil** : phrase de trois mots, centrée, révélée par le scroll, un seul par page maximum.
- **Action** : bouton ambre plein avec reflet à −18°, secondaire contour, tertiaire lien tracé. Jamais plus de deux côte à côte.
- **Curseur** (desktop, pointeur fin uniquement) : point ambre de 8 px + anneau de 32 px amorti ; l'anneau s'ouvre sur les éléments interactifs et affiche un mot (« Voir », « Tourner », « Choisir »). Désactivé au tactile, au clavier et en mouvement réduit.

---

## 4. Le Stack Engine (`src/webgl/`)

Le moteur unique. Tout le reste du site est construit autour.

### 4.1. Principe

- Un `InstancedMesh` de **N plaques** (N par palier : 1 200 / 800 / 450 / 220), géométrie d'une plaque pliée (un parallélogramme extrudé de 2 % d'épaisseur avec un pli à l'angle du logo ; généré par code à partir du décalque SVG du logo, voir `scripts/logo-trace.mjs`).
- Chaque instance porte des attributs : `aIndex`, `aSeed`, `aPosA/aRotA/aScaleA` (layout de départ) et `aPosB/aRotB/aScaleB` (layout d'arrivée). Un uniform `uMorph` (0 → 1) interpole dans le **vertex shader**, avec trajectoire en arc (hauteur proportionnelle à la distance) et retard par instance (`aSeed × 0,25`). Changer de layout = écrire les attributs B et animer `uMorph` avec GSAP. Zéro calcul CPU par trame.
- Uniforms partagés par référence entre tous les matériaux (`createStackUniforms()`) : `uTime`, `uMorph`, `uScan` (position du balayage lumineux), `uPointer` (impact du pointeur dans le plan de la pile), `uPointerActive`, `uLight` (direction, fixe à −18°), `uNuit` (synchronisé avec `--su-nuit`), `uAccent` (teinte de la section : ambre par défaut, accent du projet dans la pellicule), `uIsolate` (index de strate isolée, −1 sinon).
- Matériau `plateMaterial` : navy mat, arêtes éclairées (Fresnel discret), reflet ambre selon `uLight`, grain, **lentille** autour de `uPointer` (les plaques sous le pointeur se soulèvent de 6 % et s'allument), teinte `uAccent`. Les trois plaques « du logo » (indices 0-2) ont leur couleur propre (navy, navy, ambre) ; toutes les autres sont navy.
- Ombre portée : un plan récepteur sous la pile avec `ContactShadows` (drei) au palier haut, un disque d'ombre dégradé au palier bas.
- Post-traitement : grain et vignette **fusionnés dans le matériau** (pas d'EffectComposer). Rien d'autre.

### 4.2. Layouts (`src/webgl/layouts/*.ts`, fonctions pures, testées)

Chaque layout retourne, pour chaque instance, position / rotation / échelle. Les instances non utilisées par un layout sont envoyées « hors champ » et dissoutes (`aScale → 0`).

| Layout | Forme | Utilisé par |
| --- | --- | --- |
| `logo` | Les 3 plaques exactes du logo (indices 0-2), les autres dissoutes. Projection orthographique → silhouette **identique** au PNG | Hero p = 0, nav, 404, repos, mouvement réduit |
| `pile` | Les 3 plaques + 200-1 200 plaques empilées en colonne torsadée derrière, comme une tour en construction | Hero p = 1, transition |
| `strates` | 5 lamelles horizontales espacées (design, contenu, code, données, hébergement), chacune composée de ~60 plaques en rangée | Moment 01 |
| `page` | Une page web vue en perspective : plaques formant en-tête, titre, colonnes, bouton | Offre « site une page » |
| `multi` | Trois pages en éventail | Offre « site multi-pages » |
| `boutique` | Grille 4 × 3 de plaques-produits + une plaque « panier » | Offre « boutique » |
| `logiciel` | Réseau de 8 modules reliés (plaques-nœuds + plaques fines en arêtes) | Offre « outil sur mesure », moment 05 |
| `pellicule` | Un cadre 16:9 de plaques par projet, alignés horizontalement | Moment 03 |
| `cadran` | Les plaques forment une jauge en arc | Tarifs |
| `methode` | 5 groupes de plaques qui s'assemblent en séquence | Moment 06 |
| `portrait` | Variante compacte de chaque layout pour largeur < 768 px (empilement vertical, échelle réduite) | Mobile |

Les layouts doivent être **réglés sur `/lab`** avec Tweakpane (épaisseur, écartement, torsion, hauteur d'arc, retard) et capturés avant intégration. Un layout moche est pire que pas de layout.

### 4.3. Qualité et repli

- `detect-gpu` + capacités (`WebGL2`, cœurs, mémoire, pointeur, largeur, mouvement réduit) → palier `ultra | high | medium | low`. `?quality=` force un palier.
- `PerformanceMonitor` (drei) : si la moyenne glissante passe sous la cible (55 / 50 / 40 / 28 fps), baisse du DPR puis du palier. Sous `low`, repli 2D.
- **Repli 2D** (`Fallback2D.tsx`) : le logo en SVG dont les trois plaques se déplient et se réempilent par `clip-path` et `transform`, synchronisé sur la même timeline de scroll. Obligatoire, pas optionnel : c'est ce que voient WebGL absent, mouvement réduit (état figé), et `low`.
- Canvas monté une fois dans `app/layout.tsx` (`position: fixed; inset: 0; pointer-events: none`), `eventSource` sur `document.body`, jamais démonté. `frameloop="never"`, avancé par `gsap.ticker`. Pause sur `visibilitychange` et quand aucune expérience n'est visible. `webglcontextlost` géré (repli 2D).
- Chaque page déclare ce qu'elle veut dans la scène via `tunnel-rat` (ou un store zustand `scene` : layout cible, accent, nuit, caméra). Les pages sans scène laissent le logo en coin, respirant.

### 4.4. Interactions du moteur

- **Pointeur** : lentille (soulèvement + allumage) ; parallaxe de caméra ±3°.
- **Drag** (`@use-gesture`) : tourne la pile autour de son axe vertical avec inertie (`maath/damp`) ; retour lent à l'orientation de la timeline une fois lâché.
- **Scroll** : écrit `uMorph` et le layout cible via les ScrollTriggers des expériences (scrub 0,6).
- **Clic/tap sur une strate ou une plaque-offre** : `uIsolate` ; les autres plaques s'écartent et s'assombrissent.
- **Clavier** : flèches pour tourner, chiffres 1-5 pour isoler une strate, Échap pour revenir.
- **Gyroscope** (mobile, après permission, optionnel) : remplace la parallaxe du pointeur.

---

## 5. Stack technique et dépendances

Nouveau projet dans `./` (le dossier courant, vide au départ). L'ancien site est dans `../stackup-agency-20261012/` et sert uniquement à **récupérer** : `public/` (logo, images, documents PDF), `src/data/*` (villes, départements, métiers, solutions, communes), `src/content/blog/*` (300 articles), la logique de calcul du configurateur, `LogoMarque.tsx`, les JSON-LD et métadonnées (pour plus tard). Rien d'autre n'est copié : pas de composant, pas de CSS, pas de test, pas de doc.

Vérifier les versions avec `npm view <pkg> version` avant d'installer ; prendre la dernière stable.

| Dépendance | Motif |
| --- | --- |
| `next` (dernière stable, App Router, Turbopack), `react` 19, `typescript` strict | Base ; View Transitions |
| `tailwindcss` 4 | Mise en page ; les tokens restent en CSS natif |
| `three`, `@react-three/fiber` 9, `@react-three/drei` | Stack Engine, `ContactShadows`, `PerformanceMonitor`, `AdaptiveDpr`, `View` |
| `gsap` + `@gsap/react` | ScrollTrigger, SplitText, Flip, ticker unique (gratuit, licence standard) |
| `lenis` | Scroll lissé, `respectReducedMotion` |
| `zustand` 5 | État scène ↔ UI sans re-render |
| `@use-gesture/react` | Drag, inertie, balayage mobile |
| `maath` | Amortissement |
| `detect-gpu` | Palier initial |
| `tunnel-rat` | Déclaration de scène par page |
| `zod` | Validation API et formulaires |
| `resend` | E-mails (contact, devis) |
| `gray-matter`, `remark`, `remark-html` | Blog (phase 4) |
| `@playwright/test`, `@axe-core/playwright`, `tweakpane` (dev) | Captures, accessibilité, banc d'essai |

Interdits : toute bibliothèque d'animation supplémentaire (Motion, anime.js…), tout EffectComposer, toute API d'IA, Twilio, toute UI kit.

Scripts `package.json` : `dev`, `build`, `verify` (typecheck + lint + build), `shots` (Playwright : toutes les routes et états de `scripts/shots.config.ts`, sortie dans `docs/qa/shots/<route>/<etat>-<largeur>[-rm].png`), `shots:home`, `lab`.

Playwright : projets `desktop-1440` (1440 × 900) et `mobile-390` (Pixel 5), Chromium avec `--use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader --ignore-gpu-blocklist`. Les fps SwiftShader sont un proxy (≥ 30 accepté).

---

## 6. Page d'accueil : neuf moments

Alternance stricte spectacle / calme. Chaque moment a un **mécanisme nommé**, un **état de la pile**, un **régime de lumière** (`--su-nuit`), des **états intermédiaires à capturer**, et sa **composition mobile**. Les textes sont des propositions à conserver sauf contre-ordre ; aucun chiffre ne sort d'ailleurs que de `src/config/site.ts`.

### Moment 00 — L'OUVERTURE (hero) · spectacle · nuit = 1

**Mécanisme : RÉVÉLATION.** Au chargement, aucune page de chargement : le logo exact (layout `logo`, caméra orthographique) est déjà là, immense, calé à gauche sur la grille, respirant, balayé par la lumière. À droite, en bas, le mot porteur se déplie mot par mot : **« Sites et outils sur mesure. »** (Poppins, taille mot porteur, ivoire), puis une ligne de texte : « Pour les artisans, les commerçants et les petites entreprises qui veulent un outil à eux, pas un abonnement. », puis deux actions : « Voir ce qu'on fabrique » (ambre) et « Parler de votre projet » (contour). En bas de l'écran, quatre **cotes réelles** mesurées par `ResizeObserver` (largeur du logo, hauteur du titre, largeur du conteneur, position de la ligne de base), en mono graphite : le site montre sa propre construction.

Au premier scroll (p = 0 → 1 sur 150 vh, épinglé) : la caméra passe **d'orthographique à perspective** (interpolation de projection, pas de coupure), la pile prend de l'épaisseur et projette son ombre, puis les centaines de plaques arrivent de l'arrière-plan et s'empilent derrière les trois plaques du logo (layout `logo` → `pile`), en arc, avec retard par instance. Le titre reste, l'ambre du logo devient la lumière de la scène. À p = 1, on voit une tour de plaques en construction, le titre à sa gauche.

Mouvement permanent : respiration, balayage, dérive de caméra. Pointeur : lentille + parallaxe. Drag : tourne la pile. Clavier : flèches.

**États à capturer** : p = 0, 0,25, 0,5, 1 ; avec drag ; mouvement réduit (logo figé, texte instantané) ; sans WebGL (repli SVG). Superposition pixel du logo à p = 0 (§ 11.4).

**Mobile (390)** : logo dans le tiers supérieur, en portrait (`portrait` du layout `logo`), titre dessous sur deux lignes, actions empilées, deux cotes au lieu de quatre. Même transformation au scroll, hauteur épinglée 120 vh. Drag horizontal fonctionne.

### Moment 01 — LES STRATES · spectacle pédagogique · nuit = 1

**Mécanisme : DÉCOUPE.** Seuil (le seul de la page) : « **Un site, c'est cinq couches.** » Puis, pinned sur 250 vh, la pile se **découpe en cinq lamelles** horizontales qui s'écartent une à une (layout `strates`), chacune étiquetée en mono à gauche par un titre qui se déplie et une ligne : 01 Design (ce que vos clients voient), 02 Contenu (ce qu'ils lisent), 03 Code (ce qui fait tout tenir), 04 Données (vos clients, vos commandes, vos rendez-vous), 05 Hébergement et nom de domaine (ce qui le rend accessible). Clic/tap ou touches 1-5 : la strate s'isole, les autres s'assombrissent, un paragraphe de deux lignes apparaît en découpe. À la fin, les lamelles se **referment** en une seule plaque épaisse : « Nous fabriquons les cinq. Vous êtes propriétaire des cinq. »

**États** : fermé, 2 strates ouvertes, 5 ouvertes, strate 3 isolée, refermé. **Mobile** : strates en portrait, étiquettes sous la scène, balayage horizontal entre strates, tap pour isoler.

### Moment 02 — L'OFFRE · calme interactif · nuit → 0 (la lumière s'allume)

**Mécanisme : ASSEMBLAGE.** Fond ivoire. À gauche, un sélecteur vertical de quatre offres (plaques HTML, clavier et tap) : **Site une page**, **Site multi-pages**, **Boutique en ligne**, **Outil de gestion sur mesure**. À droite, la scène (dans une `View` cadrée) où la pile se **réassemble** en la forme choisie (layouts `page`, `multi`, `boutique`, `logiciel`) ; par-dessus la 3D, une **maquette HTML** s'assemble en même temps : en-tête, titre, blocs, bouton apparaissent par découpe, calés sur les plaques (Flip). Sous le sélecteur, la **Fiche de fabrication** de l'offre (mono : pages, fonctions, hébergement 12 mois inclus, nom de domaine offert la 1re année, code propriétaire) et le prix en **Cadran** : « à partir de 449 € » (et 749 / 1 647 / 1 447 € selon l'offre). Action : « Détailler cette offre » → page tarifs, ancre de l'offre. Changement automatique d'offre toutes les 7 s tant que personne n'a interagi, puis arrêt définitif à la première interaction.

**États** : chaque offre (4) + un instant de transition (uMorph = 0,5) + une transition de maquette. **Mobile** : sélecteur en onglets horizontaux balayables au-dessus de la scène en portrait, fiche en dessous, cadran pleine largeur.

### Moment 03 — LA PELLICULE (réalisations) · spectacle · nuit → 1

**Mécanisme : PELLICULE.** La lumière s'éteint. Section épinglée, défilement horizontal piloté par le scroll vertical (et par balayage sur mobile), un projet par écran, **plein écran** : capture desktop grande + capture mobile en avant-plan décalée, titre du projet en display XL, une ligne, étiquette **« Démo »** en mono, lien « Ouvrir la démo ». La pile, derrière, forme un cadre de plaques par projet (layout `pellicule`) et **se teinte de l'accent du projet** (`uAccent`) ; le passage d'un projet à l'autre fait glisser la lumière. Snap par projet. Les projets actuels sont repris tels quels (données de `src/lib/realisations.ts` de l'ancien site), réduits à 5 maximum, tous étiquetés « Démo » ; ils seront remplacés plus tard par le propriétaire.

Les captures doivent être **produites** : script Playwright sur les URL de démo (desktop 1440 et mobile 390, format AVIF ≤ 120 ko), stockées dans `public/realisations/<slug>/`. Si une URL est inaccessible, utiliser la capture existante et le noter.

**États** : projets 1, 3, 5 ; un glissement (entre 2 et 3). **Mobile** : balayage natif horizontal, capture mobile en grand, capture desktop en arrière, snap.

### Moment 04 — SEUIL · respiration · nuit = 1

Trois mots : « **Pas que des sites.** » La pile se replie en noyau compact pendant la lecture. (Ce Seuil remplace celui du moment 01 si tu juges qu'un seul suffit ; dans ce cas garde celui-ci.)

### Moment 05 — LA SALLE DES MACHINES · dense, fonctionnel · nuit = 1

**Mécanisme : MODULES.** L'ancien « Laboratoire » (faux logiciel de gestion d'interventions, `lib/laboratoire.ts`) est **supprimé** : il ne représente pas le niveau de l'agence. À sa place : la pile en layout `logiciel`, un réseau de **modules** (plaques-nœuds reliées par des plaques fines), chaque nœud étant une solution réelle du catalogue (devis-factures, planning, prise de rendez-vous, click & collect, espace client, stocks, caisse, fidélité, CRM, réservation, menu QR, tableau de bord…). Clic/tap/clavier sur un nœud : il s'allume, les arêtes vers les modules compatibles s'éclairent, et une **maquette HTML animée** du module s'assemble par découpe dans une Plaque à droite (un écran stylisé : liste, chiffres en cadran, statut qui change tout seul en boucle lente), sans être un logiciel fonctionnel. Rotation automatique des nœuds toutes les 6 s jusqu'à la première interaction. Titre à gauche : « **Des outils qui vous appartiennent.** » et une ligne : « Devis, factures, planning, rendez-vous, click & collect : fabriqués pour votre métier, sans abonnement, données à vous. » Action : « Parler de votre outil » (vers contact, objet pré-rempli « Outil sur mesure »).

Emplacement réservé (`experiences/machines/DemoSlot.tsx`, vide pour l'instant, non rendu) : une vraie démo embarquée d'un logiciel de l'agence sera branchée plus tard par le propriétaire. Ne rien inventer à la place.

**États** : repos, un module allumé avec sa maquette, un deuxième module. **Mobile** : réseau en portrait (nœuds en colonne), maquette sous le réseau, tap pour allumer.

### Moment 06 — LE JUSTE PRIX · calme éditorial · nuit = 0

**Mécanisme : CADRAN.** Ivoire. Titre : « **Un prix juste, écrit noir sur blanc.** » Quatre Plaques (les quatre offres) avec Cadran « à partir de » et trois inclusions chacune ; aucune durée, aucun comparatif. Sous les plaques, trois engagements en mono, tracés en SVG : « Démo avant signature », « Code et données à vous », « Pas d'abonnement obligatoire ». La pile, en arrière-plan léger, forme une jauge (layout `cadran`) dont l'aiguille suit l'offre survolée/focalisée. Action : « Voir tous les tarifs ».

**États** : repos, une offre focalisée. **Mobile** : plaques empilées, cadran plein écran, jauge réduite.

### Moment 07 — LA MÉTHODE · scrollytelling · nuit → 1

**Mécanisme : ASSEMBLAGE SÉQUENTIEL.** Cinq étapes, sans dates ni durées : **01 On se parle** (rendez-vous, chez vous ou en visio) · **02 On vous montre avant de vous vendre** (une démo de votre site, gratuite, avant toute signature) · **03 On fabrique** (vous suivez l'avancement) · **04 On met en ligne** (nom de domaine, hébergement, formation) · **05 On reste là** (maintenance, évolutions). À chaque étape franchie par le scroll, un groupe de plaques s'assemble (layout `methode`) jusqu'à former une page complète ; le numéro de l'étape se déplie en display XL à gauche, le texte en découpe. L'étape 02 est la plus mise en avant (c'est l'argument qui a fait signer Hydr'eaux) : une plaque ambre.

**États** : étapes 1, 2, 5. **Mobile** : étapes en pile verticale, scène en bandeau épinglé en haut.

### Moment 08 — L'ATELIER (fondateur) · éditorial · nuit = 1

Portrait (photo à venir ; placeholder : une plaque ivoire-creuse de même ratio, pas d'image de stock), nom **Mathéo Reboul**, titre « Fondateur, développeur », trois paragraphes courts (pourquoi des outils sur mesure, pourquoi des prix justes, pourquoi la démo avant la vente), sans âge, sans date de création, sans chiffre de clients. Trois questions fréquentes en accordéon (fondu autorisé). La pile est à l'arrêt, ombre longue.

### Moment 09 — LE DÉPART (CTA) · spectacle bref · nuit = 1

« **Il reste une chose à faire.** » Un seul champ (« Votre projet en une phrase ») et une action « Recevoir une démo ». À l'envoi : redirection vers `/contact` avec le champ pré-rempli. En arrière-plan, la pile **se replie en logo** (retour au layout `logo`) : la page se termine comme elle a commencé. Footer en dessous : logo exact, navigation, mentions, pas de filigrane, pas d'étoiles.

### Retiré de l'accueil

Comparateur de prix, offre rentrée, parrainage, le Laboratoire (faux logiciel manipulable), blocs villes/métiers (ils vivent dans leurs pages), FAQ longue, deuxième Seuil, étoiles, halo, portrait de dos.

---

## 7. Pages prioritaires (même exigence que l'accueil)

Chaque page a sa signature. Aucune n'utilise « mini-hero + colonne + cartes + CTA dégradé ».

### 7.1. `/tarifs` — « Le Configurateur de pile » (priorité égale à l'accueil)

C'est la page la plus regardée après l'accueil. Elle fusionne l'ancien `/tarifs` et l'ancien `/configurateur`.

- Hero : la pile en layout `cadran`, titre « **Choisissez ce qu'on empile.** », et à droite un **configurateur** en trois temps (plaques HTML, clavier et tap) : *Type* (une page / multi-pages / boutique / outil), *Fonctions* (cases : formulaire, galerie, blog, prise de RDV, paiement, espace client, devis-factures… chaque case allume un module de la pile), *Options* (nom de domaine, maintenance Starter / Pro / Premium à 29 / 44 / 89 €/mois, rédaction d'articles). À chaque choix, la pile se réassemble et le **Cadran** recalcule « à partir de X € ». Aucune durée.
- Sous le configurateur : les quatre offres détaillées en Plaques, inclusions complètes, Fiche de fabrication, ce qui est en supplément (révision, page supplémentaire, retrait de la mention « Réalisé par »).
- Maintenance : trois plans en Plaques, comparaison en tableau mono.
- Action finale : « Recevoir un devis » → `/contact` avec la configuration sérialisée dans l'URL (zod) et pré-remplie. **Aucune ressaisie.**
- États à capturer : configurateur vide, type choisi, 3 fonctions cochées, options, mobile pour chacun.

### 7.2. `/realisations` et `/realisations/[slug]`

Liste : la pellicule de l'accueil en version verticale, pleine largeur, un projet par écran, filtres par type (Flip). Fiche : **transition par élément partagé** (View Transitions, repli Flip) depuis la capture ; dossier de fabrication (Fiche mono : type, pages, fonctions, stack), galerie desktop + mobile en masque, lien vers la démo, projet suivant. Étiquette « Démo » partout tant que le propriétaire n'a pas remplacé les projets.

### 7.3. `/services` et `/services/[slug]`

Hub : les quatre offres + maintenance + rédaction, chacune une Plaque qui, au survol/focus, reconfigure la pile en bandeau. Fiche : hero avec la pile dans le layout de l'offre, maquette HTML qui s'assemble, « pour qui » (trois profils), inclusions, Fiche de fabrication, prix « à partir de », action vers `/tarifs` avec l'offre présélectionnée.

### 7.4. `/contact` (fusionne `/devis` et `/contact`)

Une seule page de conversion. Formulaire en **trois plaques** (Vous / Votre projet / Comment vous joindre), validation zod côté client et serveur, erreurs annoncées, RGPD explicite, aucune bulle « Beau prénom ». La configuration venue de `/tarifs` ou de l'accueil est lue et affichée en Fiche. Envoi via Resend avec gabarit serveur ; limitation de débit par IP. Pendant la saisie, la pile se construit plaque par plaque à chaque champ rempli (motivation visible). Page de confirmation avec la pile refermée en logo.

### 7.5. `/a-propos`

Portrait, manifeste en trois Seuils de lecture (sans animation de fondu : découpe), engagements, méthode rappelée, aucune frise datée.

### 7.6. `/solutions` et `/solutions/[slug]` (outils de gestion)

Hub : la Salle des machines en grand (réseau de modules du moment 05, sans logiciel fonctionnel), 15 modules, chaque module une plaque-nœud ; clic → fiche. Fiche : ce que fait l'outil, pour quel métier, capture ou maquette assemblée, Fiche de fabrication, « à partir de 1 447 € », action vers `/contact` objet pré-rempli.

### 7.7. Reste du site (phase 4, après validation de tout ce qui précède)

Un gabarit par fonction, construit dans le même langage : « Pour qui » (villes, départements, métiers, services locaux : un hero signé avec la pile en bandeau, le nom du lieu/métier en display XL, offres adaptées, aucun reste de thème précédent), « Éditorial » (blog liste + article : lecture confortable, découpe des titres, fondu toléré pour le corps), « Outil » (audit PageSpeed, studio de style, cahier des charges : conservés fonctionnellement, remis en scène), légales, 404 (le logo seul, les plaques qui cherchent et ne trouvent pas), plan du site. Puis sitemap, robots, RSS, JSON-LD et redirections 301 reportés depuis l'ancien site. `/offre-rentree` → 301 `/tarifs` ; `/devis` → 301 `/contact` ; `/configurateur` → 301 `/tarifs` ; `/services/site-association` → 301 `/services` ; `/laboratoire` → 301 `/solutions`.

---

## 8. Navigation, transitions, raccourcis

- **Nav** : logo exact (SVG `LogoMarque`) à gauche, cinq entrées (Réalisations, Services, Outils de gestion, Tarifs, À propos), action « Parler de votre projet ». Sur sombre : ivoire ; sur ivoire : navy. La nav suit `--su-nuit`. Menu mobile : panneau en strates (chaque entrée une lamelle qui se déplie), `inert` quand fermé, focus piégé.
- **Palette ⌘K / Ctrl K** : pages, offres, réalisations, articles ; raccourci `G` (grille), `?` (aide des raccourcis), `1-5` (strates), flèches (tourner la pile). Raccourcis désactivés dans les champs.
- **Transitions de page (TRAVERSÉE)** : le canvas ne se démonte jamais ; la pile se transforme vers le layout de la page cible pendant la navigation ; les blocs HTML sortent par `--su-sortie` (140 ms) et arrivent par découpe ; élément partagé pour les captures de réalisations (View Transitions API, repli Flip). Jamais de fondu au noir.
- **Scroll** : Lenis, `lerp` 0,09, `respectReducedMotion`. Barre de progression fine ambre en haut.

---

## 9. Mobile

Mobile = même scène, même objet, compositions en portrait. Règles :

- Chaque moment a sa composition 390 px décrite ci-dessus ; elle est capturée avant validation.
- Palier `medium` maximum par défaut sur mobile ; `low` → repli 2D ; aucune section épinglée au-delà de 150 vh sur mobile.
- Toutes les interactions scroll/drag ont un équivalent tactile : balayage, tap. La lentille du pointeur est remplacée par un tap qui allume localement.
- Cibles tactiles ≥ 44 px, pas de survol nécessaire, formulaires avec types de clavier adaptés.
- Budget : LCP ≤ 2,5 s en 4G simulée (le titre est en HTML, la 3D arrive après), CLS ≤ 0,05, INP ≤ 200 ms.

---

## 10. Performance et accessibilité

| Métrique | Accueil | Intérieures |
| --- | --- | --- |
| JS initial (hors three/GSAP différés) | ≤ 180 ko gz | ≤ 140 ko gz |
| three + R3F + drei + GSAP (différés après LCP) | ≤ 320 ko gz | partagé |
| Lighthouse perf mobile | ≥ 80 | ≥ 90 |
| Lighthouse accessibilité / SEO / bonnes pratiques | 100 | 100 |
| Draw calls permanents | ≤ 8 | ≤ 3 |
| Trames | 60 fps palier haut ; ≥ 30 fps SwiftShader | — |

Accessibilité : WCAG 2.2 AA (contraste 4,5:1 texte, 3:1 UI, vérifié par un script sur toutes les familles de routes), axe-core sans violation, clavier complet, canvas `aria-hidden` avec équivalents `aria-live` pour les états de la pile, trois niveaux de mouvement (complet / léger / aucun) dans un réglage accessible depuis le footer et piloté par `prefers-reduced-motion` par défaut, zoom 200 % sans perte, contenu intégral sans JS.

Sécurité : en-têtes (CSP incluse), validation zod sur toutes les API, limitation de débit, `try/catch` sur tout accès au stockage navigateur.

---

## 11. Méthode de travail

### 11.1. Ordre des phases

Chaque phase laisse un site qui tourne et quelque chose de nouveau à voir. On ne passe à la suivante qu'avec les captures lues et validées.

| Phase | Contenu | Visible à la fin | Captures obligatoires |
| --- | --- | --- | --- |
| **0. Scaffold + moteur** (première session) | Projet neuf, tokens, polices, `LogoMarque`, Stack Engine avec layouts `logo` et `pile`, `/lab` avec Tweakpane, scripts `shots` | `/lab` : la pile respire, balayée, tourne au drag, passe de logo à pile | lab : logo, pile, drag, morph 0,5 ; superposition logo |
| **1. Hero** | Moment 00 complet sur `/`, nav, curseur, Lenis, ticker unique, repli 2D, mouvement réduit | Un hero qui coupe le souffle, desktop et mobile | 00 : 4 états × 2 largeurs × (normal, rm) + sans WebGL |
| **2. Accueil, première moitié** | Layouts `strates`, `page`, `multi`, `boutique`, `logiciel` ; moments 01, 02, 03, 04 | Moitié de l'accueil, tous mécanismes différents | tous les états listés § 6 |
| **3. Accueil, seconde moitié** | Moments 05-09 (05 sans l'ancien Laboratoire), footer, Seuil, pellicule avec captures de démos produites | Accueil complet, vidéo Playwright d'un scroll entier (desktop, mobile, rm) | idem + vidéos |
| **4. Tarifs + contact** | § 7.1, 7.4, parcours sans ressaisie, e-mail réel (Resend en test) | Le parcours de conversion complet | configurateur 4 états × 2 ; contact 3 états × 2 ; e-mail reçu |
| **5. Réalisations, services, solutions, à-propos** | § 7.2, 7.3, 7.5, 7.6, TRAVERSÉE | Toutes les pages prioritaires | une par page × 2 + 3 vidéos de navigation |
| **6. Reste du site + SEO** | § 7.7, blog, programmatiques, redirections, sitemap, JSON-LD, RSS | Site complet, aucune route perdue | une par gabarit × 2 ; échantillon 5 villes / 5 métiers / 5 articles |
| **7. Finition et mesure** | Trois niveaux de mouvement, gyroscope, raccourcis, Lighthouse CI, axe + contraste sur toutes les familles, budgets | Rapport final | toutes recapturées |

### 11.2. Boucle à l'intérieur de chaque phase

concevoir (plan en 10 lignes dans le journal) → implémenter → `npm run dev` → `npm run shots` (ou `shots:home`) → **ouvrir et lire chaque capture** → noter dans `docs/qa/rapport.json` (`{ fichier, route, etat, largeur, rm, visible: "…", defauts: ["…"], corrige: true|false }`) → corriger → recapturer → `npm run verify` → journal.

Si une capture montre une section vide, un texte invisible, un canvas noir, une plaque déformée, une composition centrée-centrée, un fondu-translation : ce n'est pas validé.

### 11.3. Journal (`docs/JOURNAL.md`, ≤ 150 lignes)

Par session : date, phase, ce qui est visible de nouveau, ce qui n'a pas marché et pourquoi, décisions prises (avec motif pour toute dépendance ajoutée), prochaine étape. Le propriétaire lit ce fichier pour savoir où on en est.

### 11.4. Test de superposition du logo

Script `scripts/logo-check.mjs` : capture du hero à p = 0 (1440), recadrage sur la zone du logo, comparaison pixel à pixel avec `Logo_Stackup-Agency.png` redimensionné (seuil d'écart : 2 % de pixels). Lancé en phase 0, 1, et à chaque modification du moteur. Même vérification visuelle pour la nav et le 404.

### 11.5. Ce que tu ne fais pas

- Tu ne commences pas par migrer l'ancien site, nettoyer son CSS, ou porter ses 300 articles.
- Tu ne produis pas de rapport de 1 000 lignes.
- Tu n'installes pas une dépendance « au cas où ».
- Tu ne mets pas un `setTimeout` pour « laisser le temps à l'animation ».
- Tu ne conserves pas un composant de l'ancien site parce qu'il existe (seules exceptions : `LogoMarque`, la logique de calcul du configurateur, les données et le contenu). Le « Laboratoire » et les routes `/laboratoire` et `/lab` de l'ancien site sont abandonnés (le nouveau `/lab` est le banc d'essai du Stack Engine, `noindex`).
- Tu ne déclares pas « terminé », « prêt pour la production », « spectaculaire » : tu décris ce que montrent les captures.

---

## 12. Contenu commercial (`src/config/site.ts`, source unique)

```ts
export const SITE = {
  nom: "Stackup Agency",
  fondateur: "Mathéo Reboul",
  ville: "Tours", departement: "Indre-et-Loire",
  email: "…", telephone: "…", // repris de l'ancien site.ts
  offres: [
    { id: "une-page",    nom: "Site une page",            aPartirDe: 449,  inclus: ["Design sur mesure", "Page unique + mentions légales", "Formulaire de contact", "Référencement local", "Hébergement 12 mois et SSL", "Nom de domaine offert la 1re année", "Code propriétaire"] },
    { id: "multi-pages", nom: "Site multi-pages",         aPartirDe: 749,  inclus: ["Jusqu'à 10 pages", "Blog et galerie", "Formulaires avancés", "Statistiques", "Hébergement 12 mois et SSL", "Nom de domaine offert la 1re année", "Code propriétaire"] },
    { id: "boutique",    nom: "Boutique en ligne",        aPartirDe: 1647, inclus: ["Catalogue et paiement", "Gestion des stocks", "E-mails automatiques", "Click & Collect", "Hébergement 12 mois et SSL", "Code propriétaire"] },
    { id: "outil",       nom: "Outil de gestion sur mesure", aPartirDe: 1447, inclus: ["Développement sur mesure", "Espace d'administration", "Formation", "Vos données vous appartiennent", "Sans abonnement obligatoire"] },
  ],
  maintenance: [ { id: "starter", prix: 29 }, { id: "pro", prix: 44 }, { id: "premium", prix: 89 } ],
  redaction: { article: 25, pack4: 89, pack8: 159 },
  supplements: { revision: "25 à 35 €", pageSupplementaire: 60, retraitMention: 100 },
  mentions: { tva: "TVA non applicable, art. 293 B du CGI", devisValable: "30 jours" },
  // AUCUN champ de durée, AUCUN comparatif, AUCUN hébergement France, AUCUNE offre association.
}
```

Toute mention de prix dans l'interface passe par `formatAPartirDe(offre)` → « à partir de 449 € ». Les conditions (acompte, support, révisions) qui se contredisent dans l'ancien site ne sont **pas** affichées pour l'instant, sauf celles ci-dessus ; le propriétaire les fixera plus tard.

---

## 13. Définition de « terminé » (critères d'acceptation)

Le travail est accepté si, et seulement si :

1. Un visiteur qui coupe toutes les animations trouve encore la composition remarquable : grille, typographie monumentale, logo exact, plaques, cotes.
2. Le logo est exact dans la nav et au repos du hero, et c'est lui qui devient la pile ; un observateur comprend en 5 secondes que l'agence « empile des couches pour fabriquer un outil ».
3. Chacun des neuf moments de l'accueil a un mécanisme différent ; au moins quatre ne se trouvent dans aucun template (révélation ortho → perspective, strates isolables, assemblage pile + maquette HTML, pellicule teintée, salle des machines manipulable).
4. La scène n'est jamais immobile et réagit au pointeur, au scroll, au drag, au clic et au clavier.
5. `/tarifs` et `/contact` sont aussi travaillés que l'accueil, et le parcours configurateur → contact → e-mail fonctionne sans ressaisie.
6. Chaque page prioritaire (§ 7) a sa signature ; aucune ne ressemble à un gabarit.
7. Le mobile a ses compositions, proches du desktop, et ses captures.
8. Les budgets § 10 sont tenus, axe et contraste passent, mouvement réduit et sans-JS fonctionnent.
9. `docs/qa/rapport.json` référence une capture lue et commentée pour chaque état listé dans ce document.
10. Le rapport final nomme ce qui n'a pas été fait.

Si un point manque, ce n'est pas terminé, et le journal le dit.

---

## 14. Rapport final attendu (≤ 150 lignes, dans `docs/JOURNAL.md`)

Routes construites et leur gabarit ; captures indexées ; métriques mesurées (fps par palier, Lighthouse par page clé, poids des bundles) ; dépendances ajoutées avec motifs ; ce qui n'a pas été fait et pourquoi ; dettes restantes ; ce que le propriétaire doit fournir (photo, vraies réalisations, conditions commerciales définitives, clés Resend/PageSpeed).

---

**Commence maintenant par la phase 0.** Avant d'écrire du code, écris dans `docs/JOURNAL.md` un plan de 10 lignes pour cette phase, puis exécute-le. La première capture que tu regardes doit être la pile qui respire sur `/lab`.
