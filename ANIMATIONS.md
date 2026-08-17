# ANIMATIONS — Inventaire & Système Stackup

> Baseline : 60fps constant, transform/opacity uniquement, prefers-reduced-motion couvert, état initial safe (visible sans JS).

---

## Partie 1 — Recherche mondiale (15–20 techniques de référence)

Sources : Awwwards, FWA, Codrops, GSAP, Lenis, CSS-Tricks

### 1. Stagger Text Reveal (Codrops / GSAP SplitText)
Chaque mot/caractère animé indépendamment avec délai croissant (`stagger: 0.04s`).  
Source: https://tympanus.net/codrops/2020/06/17/making-stagger-reveal-animations-for-text/

### 2. Scroll-Driven Animations CSS native (`@keyframes` + `animation-timeline: scroll()`)
Sans JavaScript, déclenchement pur CSS via `scroll()` et `view()`.  
Source: https://tympanus.net/codrops/2024/01/17/a-practical-introduction-to-scroll-driven-animations-with-css-scroll-and-view/

### 3. Clip-Path Morphing Reveal
Image ou card révélée par `clip-path: inset(100% 0 0 0) → inset(0%)`.  
Source: https://tympanus.net/codrops/tag/clip-path/

### 4. SVG Stroke Draw (DrawSVG / stroke-dasharray)
Tracé progressif d'un SVG sur l'écran, synchronisé avec le scroll ou l'entrée viewport.  
Utilisé ici : ScoreGauge (audit), success-check (devis).

### 5. Text Scramble / ScrambleText
Lettres aléatoires qui convergent vers le texte final. Effet terminal / decode.  
Source: https://gsapify.com/gsap-text-animations/

### 6. Magnetic Button Effect
Bouton attire légèrement la souris dans son rayon (`translate` proportionnel à cursor distance).  
Source: Awwwards nominees — https://www.awwwards.com/inspiration_search/gsap-animation/

### 7. Smooth Scroll + ScrollTrigger (Lenis + GSAP)
`Lenis` normalise la vélocité de scroll, GSAP ScrollTrigger s'y accroche pour des animations millimétrées.  
Source: https://madewithgsap.com/

### 8. Parallax SVG/image layers (transform uniquement)
Couches multiples se déplacent à vitesses différentes via `translateY` proportionnel au scroll. Pas de `background-attachment: fixed` (perf).

### 9. Grid Explosion / Formation on Scroll
Cards réparties en grille explosée qui se rassemblent au scroll.  
Source: https://tympanus.net/codrops/hub/ (Creative Hub)

### 10. Page View Transitions API
`document.startViewTransition()` pour des transitions fluides entre pages sans rechargement visible.  
Source: https://css-tricks.com/unleash-the-power-of-scroll-driven-animations/

### 11. Counting / Odometer (RAF CountUp)
Chiffres qui s'incrémentent sur entrée viewport, courbe ease-out-quart.  
Implémenté: `useCountUp` hook, `1 - Math.pow(1-p, 4)`, ~800ms.

### 12. SVG Mask Reveal (SVG clipPath scroll-driven)
Image révélée via masque SVG qui s'efface au scroll.  
Source: https://tympanus.net/codrops/tag/scroll/

### 13. Loading Sequence Orchestrée
Étapes qui s'allument l'une après l'autre avec délais croissants, simulation de "travail".  
Implémenté: AuditClient 5-step sequence.

### 14. Accordion CSS `grid-template-rows: 0fr → 1fr`
Animation de hauteur sans JS via grid rows. 60fps garanti.  
Source: technique CSS moderne, 0 reflow.

### 15. Reading Progress Bar (`scaleX 0→1`)
Barre de progression de lecture fixée en haut, animée `scaleX` sur scroll passif.  
Implémenté: `reading-progress` dans globals.css.

### 16. Halo Particle Orbit
Particules en orbite autour d'un CTA, CSS `rotate + translateX + rotate` opposé.  
Source: technique Awwwards premium sites.

### 17. Blog Card Shimmer Hover
`::after` pseudo-élément avec gradient diagonal glisse au hover, `background-position` animée.

### 18. Section Divider Scanline
`::before` pseudo-élément qui balaie la largeur en 3s en boucle.  
Signale les transitions de section sans rupture visuelle brutale.

### 19. Wizard Step Slide
Form multi-étapes : slide right/left selon direction de navigation, `translateX(-100%→0)`.  
Implémenté: DevisForm, CahierClient.

### 20. Intersection Observer Cascade
Éléments révélés en cascade via IntersectionObserver, délai CSS `--delay` per-item.  
Pattern universel Stackup: `reveal-item`, `in-view` class toggle.

---

## Partie 2 — Inventaire complet des animations Stackup

### LÉGENDE
- 🔵 **MAJEURE** — pièce dominante, mémorable
- 🟢 Mineure — micro-interaction ou subtilité
- Pages : H=Home, S=Services, D=Devis, A=Audit, C=Comparatif, CDC=Cahier, Blog, SS=Studio Style, T=Templates, R=Réalisations, P=Parrainage, DOC=Documents, 404

---

### 🔵 PIÈCES MAJEURES (objectif 60+)

| # | Nom | Description | Pages | CSS/JS | Status |
|---|-----|-------------|-------|--------|--------|
| 1 | Hero Film Opening | Hero entre avec `opacity:0,scale:0.96 → 1,1` + titre stagger par mot | H | CSS reveal-item | ✅ |
| 2 | Section Numbers XXL | `01–05` fantômes débordants, `clamp(6rem,14vw,12rem)`, text-stroke blanc 6% | H | CSS | ✅ |
| 3 | Heading Underline Draw | `::after width:0→100%` au scroll, 600ms | H,S,R,Blog | CSS+IO | ✅ |
| 4 | Divider Scanline | Balayage lumineux entre sections, 3s infini | H,S,D,A,C | CSS keyframe | ✅ |
| 5 | Halo Particle Orbit | 3 particules en orbite autour du CTA final | H | CSS keyframe | ✅ |
| 6 | Stat Rise Cascade | Stats montent de bas, délai 100ms/item | H,S | CSS+IO | ✅ |
| 7 | Blog Card Shimmer | Gradient diagonal glisse au hover | H | CSS hover | ✅ |
| 8 | Audit Score Gauge | SVG stroke-dasharray CountUp + glow électrique | A | JS+SVG | ✅ |
| 9 | Audit Loading Sequence | 5 étapes s'allument progressivement | A | JS orchestré | ✅ |
| 10 | Audit Section Reveal | Sections apparaissent phase 0→6, délais setTimeout | A | JS | ✅ |
| 11 | Devis Wizard Slide | Slide left/right entre étapes, transform:translateX | D | CSS+JS | ✅ |
| 12 | Devis Price CountUp | RAF ease-out-quart, 400ms, chiffre en direct | D | JS RAF | ✅ |
| 13 | Devis Success Draw | SVG cercle + coche tracés progressivement | D | CSS SVG | ✅ |
| 14 | Devis Card Selection | Cards avec scale+glow au select, auto-advance | D | CSS+JS | ✅ |
| 15 | Devis Recap Stagger | Lignes de recap apparaissent une par une | D | CSS stagger | ✅ |
| 16 | Comparatif Score Bar | Barres de score s'étendent `width:0→N%` au reveal | C | CSS+IO | ✅ |
| 17 | Comparatif Table Reveal | Rangées du tableau révélées en cascade | C | CSS+IO | ✅ |
| 18 | Comparatif Cell Pulse | Cellule sélectionnée pulse avec scale | C | CSS+JS | ✅ |
| 19 | Cahier Progress Bar | Barre de progression gradient, 5 étapes | CDC | CSS+JS | ✅ |
| 20 | Cahier Chip Toggle | Chips basculent avec scale+couleur | CDC | CSS+JS | ✅ |
| 21 | Cahier Form Slide | Glissement entre étapes du formulaire | CDC | CSS+JS | ✅ |
| 22 | Gallery Hover Scroll | Image défile sur hover (4s scroll-down) | R,T | CSS | ✅ |
| 23 | Maintenance Card Hover | TranslateY -4px + glow 40px électrique/15% | H | CSS | ✅ |
| 24 | Reading Progress Bar | scaleX 0→1 scroll passif, top fixed | Blog,CDC | CSS+JS | ✅ |
| 25 | Odometer Countdown | Chiffres flip style odometer | P | CSS+JS | ✅ |
| 26 | Hero Asymmetric Layout | Composition 5/7 col, débordement intentionnel | H | CSS grid | ✅ |
| 27 | Services Hub Reveal | Cards services reveal en cascade | S | CSS+IO | ✅ |
| 28 | MiniHero Reveal | Titre + soustitre reveal staggeré sur toutes sous-pages | ALL | CSS | ✅ |
| 29 | Parrainage Stagger | Étapes stagger reveal 150ms/item | P | CSS+IO | ✅ |
| 30 | 404 Animated | Illustration 404 + bouton retour animé | 404 | CSS | ✅ |
| 31 | **[NEW] Hero Word-by-Word** | Chaque mot du titre H1 hero entre avec `translateY(60px)→0` + stagger 80ms | H | CSS+IO | 🔄 |
| 32 | **[NEW] Nav Scroll Shrink** | Header réduit (padding + blur) après 80px de scroll | ALL | JS scroll | 🔄 |
| 33 | **[NEW] Card 3D Tilt** | Cards légèrement inclinées au hover (CSS perspective 1000px, rotateX/Y ±3°) | S,T | CSS | 🔄 |
| 34 | **[NEW] Number Flip Counter** | Chiffres stats flippent verticalement (rotateX 90°→0°) | H,S | CSS+IO | 🔄 |
| 35 | **[NEW] Blog Post Clip Reveal** | Image blog révélée `clip-path: inset(100%→0)` sur scroll | Blog | CSS+IO | 🔄 |
| 36 | **[NEW] CTA Magnetic** | Bouton CTA se déplace légèrement vers la souris (±8px) | H | JS | 🔄 |
| 37 | **[NEW] Timeline Draw** | Ligne verticale du processus se trace au scroll | S,D | CSS+IO | 🔄 |
| 38 | **[NEW] Toast Notification** | Feedback toast slide-in depuis le bas | D,SS | CSS+JS | 🔄 |
| 39 | **[NEW] Accordion Smooth** | `grid-template-rows: 0fr→1fr` pour FAQ | S,A | CSS | 🔄 |
| 40 | **[NEW] Studio Color Preview** | Aperçu couleur morphe en temps réel | SS | JS | 🔄 |
| 41 | **[NEW] Studio Screen Mockup** | Maquette live multi-screen animée | SS | JS | 🔄 |
| 42 | **[NEW] Export PDF Spin** | Icône PDF tourne pendant génération | SS | CSS | 🔄 |
| 43 | **[NEW] Palette Harmony Gen** | Bulles de couleur apparaissent en stagger | SS | CSS+JS | 🔄 |
| 44 | **[NEW] Typography Preview** | Police preview glisse en fondu-enchaîné | SS | CSS+JS | 🔄 |
| 45 | **[NEW] A/B Split Slide** | Mode A/B: les deux versions glissent côte à côte | SS | CSS+JS | 🔄 |
| 46 | **[NEW] URL Share Pulse** | Bouton share pulse (scale 1→1.06→1) après copie | SS | CSS+JS | 🔄 |
| 47 | **[NEW] Preset Card Hover** | Cards preset lèvent + ombre électrique | SS | CSS | 🔄 |
| 48 | **[NEW] Input Focus Glow** | Input/textarea glow électrique au focus | ALL | CSS | 🔄 |
| 49 | **[NEW] Nav Link Hover** | Underline slide depuis gauche `::after width:0→100%` | ALL | CSS | 🔄 |
| 50 | **[NEW] Hero Badge Float** | Badge "Agence certifiée" flotte légèrement (translateY ±4px, 3s) | H | CSS | 🔄 |
| 51 | **[NEW] Service Icon Spin** | Icône service tourne 15° au hover | S | CSS | 🔄 |
| 52 | **[NEW] Price Card Highlight** | Card prix sélectionnée scale 1.02 + border glow | D | CSS | 🔄 |
| 53 | **[NEW] Tabs Indicator Slide** | Indicateur tab glisse horizontalement | C,SS | CSS+JS | 🔄 |
| 54 | **[NEW] Scroll Progress Dots** | Points de progression de section (dots latéraux) | SS | JS | 🔄 |
| 55 | **[NEW] Hero CTA Pulse** | Bouton CTA pulse très subtilement (scale 1→1.02) | H | CSS | 🔄 |
| 56 | **[NEW] Blog Tag Hover** | Tags blog scale 1.05 + bg électrique | Blog | CSS | 🔄 |
| 57 | **[NEW] Image Reveal Wipe** | Images révélées avec wipe horizontal (clip-path) | R,T,Blog | CSS+IO | 🔄 |
| 58 | **[NEW] Footer Link Stagger** | Liens footer apparaissent en cascade au scroll | ALL | CSS+IO | 🔄 |
| 59 | **[NEW] Check Animation Stagger** | ✓ apparaissent un par un dans les listes features | S,D | CSS | 🔄 |
| 60 | **[NEW] Section Background Shift** | Fond navy↔nuit alterne avec transition douce | H | CSS | 🔄 |
| 61 | **[NEW] Studio Panel Slide** | Sidebar et panels du studio glissent à l'ouverture | SS | CSS+JS | 🔄 |
| 62 | **[NEW] Mockup Device Animate** | Les maquettes de devices dans le studio entrent en slide | SS | CSS | 🔄 |
| 63 | **[NEW] Success Confetti** | Particules colorées au succès formulaire | D | CSS+JS | 🔄 |
| 64 | **[NEW] Hero Subtitle Typewriter** | Sous-titre du hero tapé caractère par caractère | H | JS | 🔄 |
| 65 | **[NEW] Scroll Indicator Arrow** | Flèche "scroll" du hero rebondit doucement | H | CSS | 🔄 |

---

### 🟢 MICRO-INTERACTIONS SYSTÉMATIQUES (objectif 400+)

> Appliquées à chaque instance du composant concerné sur toutes les pages.

| Composant | Type | Pages concernées | Instances est. |
|-----------|------|-----------------|----------------|
| Bouton primaire | scale 1.03 + glow | ALL | ~45 |
| Bouton secondaire | translateY -1px | ALL | ~30 |
| Lien texte inline | underline slide | ALL | ~80 |
| Card (tout type) | translateY -4px | ALL | ~60 |
| Input/textarea | border glow + label float | D,A,CDC,SS | ~40 |
| Checkbox | scale 1.1 + check draw | D,CDC | ~25 |
| Select/dropdown | border + chevron rotate | D,CDC,SS | ~15 |
| Badge/chip | scale 1.05 + border elect | C,CDC,SS | ~35 |
| Image (hover) | scale 1.02 container | R,T,Blog | ~30 |
| Icône nav | scale 1.1 | ALL | ~20 |
| Tag blog | bg + scale | Blog | ~25 |
| Accordion toggle | chevron rotate 180° | S,A | ~15 |
| Pagination | scale + color | Blog | ~10 |
| Share button | pulse after click | SS | ~5 |
| Copy button | checkmark swap | CDC,SS | ~8 |
| Breadcrumb link | color transition | ALL | ~40 |
| **Total estimé** | | | **~483** |

---

## Partie 3 — Règles d'implémentation

### ✅ Autorisé
- `transform` (translate, scale, rotate, skew)
- `opacity`
- `filter` (blur, drop-shadow) — avec précaution (GPU)
- `clip-path` — performances correctes sur GPU
- `stroke-dasharray/offset` — SVG uniquement

### ❌ Interdit (layout thrashing)
- `width`, `height` animés (sauf `grid-template-rows: 0fr→1fr`)
- `top`, `left`, `right`, `bottom`
- `margin`, `padding` animés
- `background-color` en transition directe (ok via opacity d'un pseudo-élément)

### 🔄 Prefers-reduced-motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
→ Toujours déclaré. État final visible sans animation.

### 🖥️ Règle des 2 lourdes
- Jamais 2 animations "lourdes" dans le même viewport simultané.
- "Lourde" = filter blur, clip-path complexe, SVG animé, particle system.
- Une lourde + N légères (transform/opacity) = OK.

---

*Inventaire mis à jour à chaque sprint — les ✅ sont implémentés, les 🔄 sont en cours.*
