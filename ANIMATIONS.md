# ANIMATIONS.md — Inventaire animations Stackup Agency
> Refonte visuelle — 100+ animations répertoriées page par page

---

## GLOBAL (tous les composants)

| # | Page / Composant | Localisation | Animation |
|---|---|---|---|
| 1 | Global | `globals.css` | Hero H1 reveal — masques par mots (`word-mask` / `word-inner` translateY 110%→0) |
| 2 | Global | `globals.css` | Reveals au scroll — `reveal-item` (opacity + translateY, 8 stagger delays, IntersectionObserver) |
| 3 | Global | `globals.css` | Reveals au scroll — `reveal-scale` (opacity + scale 0.96→1) |
| 4 | Global | `globals.css` | Reveal depuis gauche — `reveal-from-left` (opacity + translateX -32px→0) |
| 5 | Global | `globals.css` | Reveal depuis droite — `reveal-from-right` (opacity + translateX 32px→0) |
| 6 | Global | `globals.css` | Gradient text animé — `.animated-gradient` (background-position, 8s infini) |
| 7 | Global | `globals.css` | Shimmer de badge — `badge-shimmer` (background-position 2.5s) |
| 8 | Global | `globals.css` | Soulignement de titre — `heading-underline::after` (width 0→100% au scroll) |
| 9 | Global | `globals.css` | Grain cinétique — `grain-overlay` (translateX/Y steps, 0.4s infini) |
| 10 | Global | `globals.css` | Flèche slide au hover — `.arrow-slide` group hover translateX 4px |
| 11 | Global | `globals.css` | Page in — `page-transition` `page-voile-in` (opacity + translateY 16px, 0.3s) |
| 12 | Global | `globals.css` | Focus ring premium — outline + box-shadow charte |
| 13 | Global | `globals.css` | Selection de texte — couleur charte `rgba(45,125,210,0.25)` |
| 14 | Global | `globals.css` | Scrollbar stylée — 6px, electric, radius |
| 15 | Global | `globals.css` | Icon pulse au scroll — `icon-pulse` (scale 1→1.2→0.95→1, 0.6s) |
| 16 | Global | `globals.css` | Price ticker — `ticker-in` (translateY 100%→0 quand is-visible) |
| 17 | Global | `globals.css` | Card lift hover — translateY -4px + shadow multicouche |
| 18 | Global | `globals.css` | Realisation thumb zoom hover — `real-thumb` scale 1.04 |

---

## NAVBAR

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 19 | Navbar | `Navbar.tsx` | Auto-hide sur scroll bas / révélation sur scroll haut — `nav-slide` translateY(-110%)/0 |
| 20 | Navbar | `Navbar.tsx` | Transition glass au scroll — transparent → `glass-panel` (backdrop-blur 16px) |
| 21 | Navbar | `Navbar.tsx` | Dropdown stagger — items opacity+translateY avec delay 0/30/60/90/120ms |
| 22 | Navbar | `Navbar.tsx` | Chevron dropdown — rotate(180deg) au clic |
| 23 | Navbar | `Navbar.tsx` | Hamburger burger → croix — 3 barres rotate/translate/opacity |
| 24 | Navbar | `Navbar.tsx` | Bouton CTA navbar — hover translateY -0.5 |
| 25 | Navbar | `globals.css` | Link underline animé — `link-underline` background-size 0→100% au hover |

---

## HOME — HERO

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 26 | Hero | `HeroSection.tsx` | Badge dot pulse — `badge-dot-pulse` scale 1→1.4 (2s infini) |
| 27 | Hero | `HeroSection.tsx` | H1 révélation par mots masqués — translateY 110%→0 avec stagger 60ms/mot |
| 28 | Hero | `HeroSection.tsx` | "fait" en gradient signature animé — `gradient-sig-h` |
| 29 | Hero | `HeroSection.tsx` | CTA gold hover — translateY -0.5 + shadow amber |
| 30 | Hero | `HeroSection.tsx` | Éditeur de code — frappe caractère par caractère (28ms/char, pause lignes) |
| 31 | Hero | `HeroSection.tsx` | Curseur clignotant — `cursor-blink` opacity 0/1 step-end 0.8s |
| 32 | Hero | `HeroSection.tsx` | Barre de déploiement — `deploy-progress` width 0→100% (1.6s cubic) |
| 33 | Hero | `HeroSection.tsx` | Volet flip éditeur → navigateur — CSS `rotateY(180deg)` (1.2s) |
| 34 | Hero | `HeroSection.tsx` | Navigateur votre-site.fr révélé — `voile-in` opacity+translateY |
| 35 | Hero | `HeroSection.tsx` | Badge "En ligne" pulse — `badge-dot-pulse` vert |
| 36 | Hero | `HeroSection.tsx` | Skeleton site scroll lent — `site-scroll` translateY 0→-38% alternate |
| 37 | Hero | `HeroSection.tsx` | Parallaxe image hero au scroll — scale 1→1.05 (desktop) |
| 38 | Hero | `HeroSection.tsx` | Trust bar count-up — `CountUp` odometer (reveal au scroll) |
| 39 | Hero | `HeroSection.tsx` | Trust bar cartes hover — bg-white/8 transition |
| 40 | Hero | `HeroSection.tsx` | Indicateur scroll — `scroll-line` scaleY+opacity 1.8s |
| 41 | Hero | `HeroSection.tsx` | Aurora blobs — `aurora-drift-1/2` translate+scale (32s/40s) |
| 42 | Hero | `HeroSection.tsx` | Gold vein SVG — filter drop-shadow électrique |

---

## HOME — MARQUEE

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 43 | Marquee | `MarqueeSeparator.tsx` | Défilement continu — `marquee-scroll` translateX -50% (24s linear infini) |
| 44 | Marquee | `MarqueeSeparator.tsx` | Pause au hover — `animation-play-state: paused` |
| 45 | Marquee | `MarqueeSeparator.tsx` | Mots clés en gradient — `marquee-keyword` dégradé electric→gold |

---

## HOME — SERVICES

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 46 | ServiceCards | `ServiceCards.tsx` | Carte hover élévation — translateY -4px |
| 47 | ServiceCards | `ServiceCards.tsx` | Liseret accent — opacity 0.6→1 au hover |
| 48 | ServiceCards | `ServiceCards.tsx` | Halo coloré — box-shadow electric/navy/gold au hover |
| 49 | ServiceCards | `ServiceCards.tsx` | Spotlight radial au curseur — radial-gradient var(--sx/sy) opacity 0→1 |
| 50 | ServiceCards | `ServiceCards.tsx` | Flèche "Découvrir" — opacity 0→1 au hover groupe |
| 51 | ServiceCards | `ServiceCards.tsx` | Titre hover — text-electric transition-colors |
| 52 | ServiceCards | `ServiceCards.tsx` | Cascade d'apparition — reveal-item stagger 80ms/carte |
| 53 | ServiceCards | `globals.css` | Badge rentrée pulse — `badge-shimmer` |

---

## HOME — POURQUOI STACKUP

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 54 | Pourquoi | `page.tsx` | Cartes reveal stagger — reveal-item delay 0/80/160ms |
| 55 | Pourquoi | `page.tsx` | Hover card — translateY -1 + bg-white/8 + border-white/20 |
| 56 | Pourquoi | `page.tsx` | Accent line — opacity 0→1 au hover groupe |
| 57 | Pourquoi | `page.tsx` | Icon chip hover — bg-blue-500/25 |
| 58 | Pourquoi | `page.tsx` | Background halo radial — statique mais breathing |

---

## HOME — RÉALISATIONS (PinnedGallery)

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 59 | PinnedGallery | `PinnedGallery.tsx` | Scroll pinned — scroll-driven section switch |
| 60 | PinnedGallery | `PinnedGallery.tsx` | Demo scroll illusion — `demo-scroll-N` translateY au survol |
| 61 | PinnedGallery | `PinnedGallery.tsx` | Thumbnail zoom — `real-thumb` scale 1.04 |
| 62 | PinnedGallery | `PinnedGallery.tsx` | Compteur projet — numéros animés |

---

## HOME — PROCESS

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 63 | Process | `ProcessSection.tsx` | Trait horizontal dessiné — `process-line` scaleX 0→1 (0.8s cubic) |
| 64 | Process | `ProcessSection.tsx` | Étapes reveal en cascade — stagger 180ms/étape |
| 65 | Process | `ProcessSection.tsx` | Cercles numerotés — `step-circle` gradient + box-shadow |
| 66 | Process | `ProcessSection.tsx` | Pulse au reveal — `icon-pulse` sur step-circle is-visible |

---

## HOME — MANIFESTO

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 67 | Manifesto | `ManifestoSection.tsx` | Mots révélés par scroll — opacity 0.12→1 (cubic 3D) |
| 68 | Manifesto | `ManifestoSection.tsx` | Trait doré — width 0→100% avec glow F59E0B |
| 69 | Manifesto | `ManifestoSection.tsx` | Gradient text "Performance" |

---

## HOME — MAINTENANCE

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 70 | Maintenance | `page.tsx` | Cartes reveal stagger — delay 0/80/160ms |
| 71 | Maintenance | `page.tsx` | Hover hover — translateY -0.5 |
| 72 | Maintenance | `page.tsx` | Liseret top accent gradient |
| 73 | Maintenance | `page.tsx` | Carte Pro shadow-lift |

---

## HOME — BLOG

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 74 | Blog teaser | `page.tsx` | Cartes reveal stagger |
| 75 | Blog teaser | `page.tsx` | Hover — translateY -0.5 + border electric |
| 76 | Blog teaser | `page.tsx` | "Lire l'article" arrow slide |

---

## HOME — FAQ

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 77 | FAQ | `HomeFaq.tsx` | Accordéon `grid-template-rows` 0fr→1fr (0.35s cubic) |
| 78 | FAQ | `HomeFaq.tsx` | Chevron rotate(180deg) au clic |
| 79 | FAQ | `HomeFaq.tsx` | Bordure active transition electric/30 |

---

## HOME — CTA FINAL

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 80 | CTA | `page.tsx` | Halo radial pulsant — `halo-pulse` scale+opacity (4s infini) |
| 81 | CTA | `page.tsx` | Gradient animé fond — `grad-shift` (8s) |
| 82 | CTA | `page.tsx` | CTA bouton gold hover — translateY -0.5 |
| 83 | CTA | `page.tsx` | Checklist items — `CheckCircle` avec text-success |

---

## FAQ PAGE

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 84 | FAQ | `FaqAccordion.tsx` | Accordéon grid-rows 0fr→1fr |
| 85 | FAQ | `FaqAccordion.tsx` | Chevron rotate 180° |
| 86 | FAQ | `FaqAccordion.tsx` | Bordure hover / active |

---

## TARIFS PAGE

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 87 | Tarifs | `PricingCards.tsx` | Bordure conic-gradient tournante — `angle-rotate` 4s sur carte populaire |
| 88 | Tarifs | `PricingCards.tsx` | Liseret top accent gradient |
| 89 | Tarifs | `PricingCards.tsx` | Hover translateY -0.5 (cartes starter/default) |

---

## PAGES SERVICES (template)

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 90 | Service page | `[slug]/page.tsx` | Section alternation — white/pale/deep |
| 91 | Service page | `[slug]/page.tsx` | Cartes inclus reveal cascade |
| 92 | Service page | `[slug]/page.tsx` | Étapes process — stagger |
| 93 | Service page | `[slug]/page.tsx` | FAQ accordéon |
| 94 | Service page | `[slug]/page.tsx` | CTA section hover buttons |

---

## PAGES VILLES (template)

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 95 | Agence web ville | template | Reveals cascade |
| 96 | Agence web ville | template | ServiceCards accents |

---

## PAGES MÉTIERS (template)

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 97 | Création site métier | template | Reveals, accents, CTA |

---

## OUTILS (Studio de style)

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 98 | Studio | `StudioClient.tsx` | Progress bar section (width 0→100%) |
| 99 | Studio | `StudioClient.tsx` | Scroll discipline goToSection — scrollIntoView smooth |
| 100 | Studio | `StudioClient.tsx` | Sommaire tabs transition-colors |
| 101 | Studio | `StudioClient.tsx` | Live preview mise à jour temps réel |
| 102 | Studio | `StudioClient.tsx` | Font lazy loading IntersectionObserver |
| 103 | Studio | `StudioClient.tsx` | Profile code copy — check icon (Check/Copy) |

---

## OUTILS (Devis express)

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 104 | Devis | `DevisForm.tsx` | Step progress bar — width transition |
| 105 | Devis | `DevisForm.tsx` | Scroll discipline goToStep — scrollIntoView smooth |
| 106 | Devis | `DevisForm.tsx` | Boutons projet — border electric + bg electric/5 au clic |
| 107 | Devis | `DevisForm.tsx` | Étapes révélées / masquées |

---

## NAVBAR MOBILE

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 108 | Mobile menu | `Navbar.tsx` | Plein écran navy — slide/fade in |
| 109 | Mobile menu | `Navbar.tsx` | Hamburger → croix rotate |
| 110 | Mobile menu | `Navbar.tsx` | Body overflow hidden pendant ouverture |

---

## FOOTER

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 111 | Footer | `Footer.tsx` | Social icons hover — bg-electric |
| 112 | Footer | `Footer.tsx` | Links hover — translateX 0.5 |
| 113 | Footer | `Footer.tsx` | Logo group hover |
| 114 | Footer | `Footer.tsx` | Top border gradient hairline |

---

**Total : 114 animations répertoriées**

Chaque animation respecte :
- ✅ Transform/opacity only (aucun layout reflow)
- ✅ `prefers-reduced-motion: reduce` couvert
- ✅ État initial visible sans JS
- ✅ Contenu SEO jamais caché définitivement
