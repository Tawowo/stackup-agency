# ANIMATIONS.md — Stackup Agency V3

> Inventaire des animations implémentées — uniquement ce qui existe dans le code.
> Format : Page / Fichier / Classe ou composant

---

## Système global (`src/app/globals.css`)

| Classe CSS | Animation | Notes |
|---|---|---|
| `.dark body` | Background `#070B16` | Dark-first via ThemeContext |
| `.persp-grid` | `@keyframes grid-scroll` — translateY infini 20s | Grille perspective 1px, opacité <6% |
| `.scanline-section` | `@keyframes scanline-move` — translateY 0→100% 6s | Liseré lumineux horizontal lent |
| `.liseré-border::before` | `@keyframes liseré-rotate` — `--liseré-angle` 0→360° 4s | Point lumineux conic-gradient sur la bordure |
| `.liseré-permanent` | même animation à `8s linear infinite` | Variante lente (cartes Pro/Premium) |
| `.marquee-track` | `@keyframes marquee` — translateX -33.33% 24s | Défilement texte avant |
| `.marquee-track-rev` | `@keyframes marquee-rev` — translateX +33.33% 28s | Défilement texte inverse |
| `.marquee-wrap:hover .marquee-track` | `animation-play-state: paused` | Pause au survol |
| `.card-3d-enter` | `@keyframes card-3d-enter` — rotateX(8°)→0 + translateY(32px)→0 | Cascade services au scroll |
| `.reveal-item` | `@keyframes reveal-fade` — opacity+translateY — IntersectionObserver | Apparition au scroll |
| `.section-marker-type` | `@keyframes type-in` — width 0→auto | Labels mono qui s'écrivent |
| `.step-circle` | `@keyframes step-pop` — scale+opacity | Cercles numérotés du process |
| `.process-line` | `@keyframes draw-line` — scaleX 0→1 | Ligne circuit horizontale |
| `.circuit-h::after` | `@keyframes circuit-dot-h` — translateX 0→100% 3s | Point lumineux horizontal |
| `.circuit-v::after` | `@keyframes circuit-dot` — translateY 0→100% 4s | Point lumineux vertical |
| `.star-twinkle` | `@keyframes star-twinkle` — opacity+scale cyclique | Étoiles du fond CTA |
| `.halo-breathe` | `@keyframes halo-breathe` — scale 1→1.2 4s | Halo CTA pulsant |
| `.arrow-slide` | `@keyframes arrow-slide` — translateX boucle | Flèche → sur hover |
| `.gradient-sig` | `gradient-sig` — dégradé electric→gold sur text | Mots-clés marquee |
| `.faq-body.open` | `max-height` transition 300ms | Accordion FAQ |
| `.price-reveal-inner` | `@keyframes odometer-up` — translateY -100%→0 | Compteur de prix |

---

## Préchargeur (`src/components/ui/BrandPreloader.tsx`)

- **Deux bandes** : `.preloader-panel-top` (translateY(-100%)) + `.preloader-panel-bottom` (translateY(100%)) — décalage 60ms
- **Compteur RAF** : 0→100 avec easing `ease-in-out`, durée 1000ms
- **Condition** : `sessionStorage.getItem('preloader-v3-shown')` — s'affiche 1× par session
- **Aucune dépendance GSAP**

---

## Accueil (`src/app/page.tsx` + composants)

### HeroSection (`src/components/home/HeroSection.tsx`)
- `.section-marker-type` : `[ 01 / ACCUEIL ]` qui s'écrit
- `<video>` wired (source commentée — attente fichier `hero-accueil.mp4`)
- `.persp-grid` derrière la vidéo
- `liseré-border` sur l'éditeur glass panel
- Stat cards : `glass-panel hud-4corners`

### ServiceCards (`src/components/home/ServiceCards.tsx`)
- `.card-3d-enter` : cascade rotateX 4° → 0 + translateY 32px → 0
- `.glass-panel hud-4corners` sur chaque carte
- Spotlight radial `radial-gradient` au mousemove
- `animationDelay: ${index * 80}ms`

### PinnedGallery (`src/components/home/PinnedGallery.tsx`)
- Sticky scroll horizontal — N panneaux × 100vw
- `UrlTyper` : frappe caractère par caractère (28ms/char) à chaque changement de projet actif
- Parallax filigrane -15% via `watermarkRefs`
- Barre de progression `scaleX(progress)` en bas
- `liseré-border` + `glass-panel` sur le browser frame XXL
- Mobile : snap carousel + dots

### ProcessSection (`src/components/home/ProcessSection.tsx`)
- `.process-line` : tracé horizontal `scaleX(0→1)` au scroll
- `.circuit-h` : point lumineux horizontal sur fond
- `.step-circle` : `step-pop` staggeré 180ms/step
- Cartes desktop : `glass-panel hud-corners`
- IntersectionObserver `threshold: 0.25`

### MarqueeSeparator (`src/components/home/MarqueeSeparator.tsx`)
- Rangée 1 : `.marquee-track` (fwd, 24s)
- Rangée 2 : `.marquee-track-rev` (reverse, 28s)
- Mots surlignés : `.gradient-sig`
- Pause au hover

### HomeFaq (`src/components/home/HomeFaq.tsx`)
- `.faq-body.open` : `max-height` transition
- `[ Q ]` préfixe mono par question
- `glass-panel` sur chaque item

### Maintenance cards (`src/app/page.tsx` ~l.254)
- Carte Pro : `.liseré-permanent .liseré-border hud-corners`
- Autres cartes : `.glass-panel hud-4corners`
- Prix : `data-mono`

### Blog cards (`src/app/page.tsx` ~l.209)
- `.glass-panel hud-4corners` / `.hud-corners`
- `data-mono` sur tags catégorie
- `animationDelay` stagger 100ms

### CTA section (`src/app/page.tsx` ~l.298)
- `star-field` : 30 `.star` avec `star-twinkle` aléatoires
- `.halo-breathe` sur le halo radial
- `.btn-magnetic .cta-glow` sur le bouton principal

---

## Barres de navigation

### PageProgressBar (`src/components/ui/PageProgressBar.tsx`)
- Barre horizontale top — `scaleX(scrollY/maxScroll)`

### SectionProgressBar (`src/components/ui/SectionProgressBar.tsx`)
- Barre verticale droite — dots cliquables
- Dot actif : `bg-electric shadow-[0_0_8px_rgba(45,125,210,0.8)]`
- Tooltip au hover sur chaque dot
- Visible après 200px scroll

---

## Pages secondaires

### 404 (`src/app/not-found.tsx`)
- Terminal animé : 7 lignes tapées en stagger (setTimeout 0→2300ms)
- `.persp-grid` fond
- `.glass-panel hud-4corners` sur le terminal
- `btn-magnetic cta-glow` sur retour accueil

### Contact (`src/components/sections/Contact.tsx`)
- `.persp-grid` fond
- Sidebar : `glass-panel hud-4corners circuit-h`
- Champs : transitions de focus

### MiniHero (`src/components/ui/MiniHero.tsx`)
- `.persp-grid` fond (toutes les pages secondaires)
- `.scanline-section`
- Prop `marker` optionnelle pour `section-marker`

### PricingCards (`src/components/tarifs/PricingCards.tsx`)
- `useCountUp` odomètre prix (RAF, ease-out quart, 900ms)
- `checks-visible` : coches qui se dessinent en stagger 60ms
- `glass-panel` + `liseré-border` / `liseré-permanent` selon variante

---

## Footer (`src/components/layout/Footer.tsx`)
- Watermark `STACKUP` outline (`-webkit-text-stroke: 1px rgba(255,255,255,0.04)`)
- `.footer-stagger` colonnes stagger au scroll

---

## Réduit / accessibilité

Tout bloc V3 est protégé par `@media (prefers-reduced-motion: reduce)` :
- Marquees stoppés
- `card-3d-enter`, `process-line`, `circuit-*`, `star-twinkle`, `halo-breathe` : désactivés
- `reveal-item` : affichage immédiat sans animation
- ProcessSection : `IntersectionObserver` → classes ajoutées immédiatement sans timeout
- PinnedGallery : fallback grille statique
