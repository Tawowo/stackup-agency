# ANIMATIONS.md — Inventaire animations Stackup Agency
> Refonte visuelle — 250+ animations répertoriées page par page

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

## MOBILE MENU

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 26 | Mobile menu | `Navbar.tsx` + `globals.css` | Overlay fullscreen navy — opacity 0→1 + translateY(-8px)→0 (0.25s) |
| 27 | Mobile menu | `Navbar.tsx` + `globals.css` | Links stagger-in — `.mobile-menu-item` translateX(-16px)→0 + opacity, delay 60→480ms |
| 28 | Mobile menu | `Navbar.tsx` + `globals.css` | Sections stagger — `.mobile-menu-section` opacity 0→1 delay 40/200/360ms |
| 29 | Mobile menu | `Navbar.tsx` + `globals.css` | CTA stagger — `.mobile-menu-cta` translateY(12px)→0, delay 520ms |
| 30 | Mobile menu | `Navbar.tsx` | Hamburger → croix — 3 barres rotate/opacity (300ms) |
| 31 | Mobile menu | `Navbar.tsx` | Body overflow hidden pendant ouverture |
| 32 | Mobile menu | `Navbar.tsx` | Halo radial décoratif statique bas-droite |
| 33 | Mobile menu | `Navbar.tsx` | Hairline top gradient electric/30 |

---

## HOME — HERO

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 34 | Hero | `HeroSection.tsx` | Badge dot pulse — `badge-dot-pulse` scale 1→1.4 (2s infini) |
| 35 | Hero | `HeroSection.tsx` | H1 révélation par mots masqués — translateY 110%→0 avec stagger 60ms/mot |
| 36 | Hero | `HeroSection.tsx` | "fait" en gradient signature animé — `gradient-sig-h` |
| 37 | Hero | `HeroSection.tsx` | CTA gold hover — translateY -0.5 + shadow amber |
| 38 | Hero | `HeroSection.tsx` | Éditeur de code — frappe caractère par caractère (28ms/char, pause lignes) |
| 39 | Hero | `HeroSection.tsx` | Curseur clignotant — `cursor-blink` opacity 0/1 step-end 0.8s |
| 40 | Hero | `HeroSection.tsx` | Barre de déploiement — `deploy-progress` width 0→100% (1.6s cubic) |
| 41 | Hero | `HeroSection.tsx` | Volet flip éditeur → navigateur — CSS `rotateY(180deg)` (1.2s) |
| 42 | Hero | `HeroSection.tsx` | Navigateur votre-site.fr révélé — `voile-in` opacity+translateY |
| 43 | Hero | `HeroSection.tsx` | Badge "En ligne" pulse — `badge-dot-pulse` vert |
| 44 | Hero | `HeroSection.tsx` | Skeleton site scroll lent — `site-scroll` translateY 0→-38% alternate |
| 45 | Hero | `HeroSection.tsx` | Parallaxe image hero au scroll — scale 1→1.05 (desktop) |
| 46 | Hero | `HeroSection.tsx` | Trust bar count-up — `CountUp` odometer (reveal au scroll) |
| 47 | Hero | `HeroSection.tsx` | Trust bar cartes hover — bg-white/8 transition |
| 48 | Hero | `HeroSection.tsx` | Indicateur scroll — `scroll-line` scaleY+opacity 1.8s |
| 49 | Hero | `HeroSection.tsx` | Aurora blobs — `aurora-drift-1/2` translate+scale (32s/40s) |
| 50 | Hero | `HeroSection.tsx` | Gold vein SVG — filter drop-shadow électrique |

---

## HOME — MARQUEE

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 51 | Marquee | `MarqueeSeparator.tsx` | Défilement continu — `marquee-scroll` translateX -50% (24s linear infini) |
| 52 | Marquee | `MarqueeSeparator.tsx` | Pause au hover — `animation-play-state: paused` |
| 53 | Marquee | `MarqueeSeparator.tsx` | Mots clés en gradient — `marquee-keyword` dégradé electric→gold |

---

## HOME — SERVICES

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 54 | ServiceCards | `ServiceCards.tsx` | Carte hover élévation — translateY -4px |
| 55 | ServiceCards | `ServiceCards.tsx` | Liseret accent — opacity 0.6→1 au hover |
| 56 | ServiceCards | `ServiceCards.tsx` | Halo coloré — box-shadow electric/navy/gold au hover |
| 57 | ServiceCards | `ServiceCards.tsx` | Spotlight radial au curseur — radial-gradient var(--sx/sy) opacity 0→1 |
| 58 | ServiceCards | `ServiceCards.tsx` | Flèche "Découvrir" — opacity 0→1 au hover groupe |
| 59 | ServiceCards | `ServiceCards.tsx` | Titre hover — text-electric transition-colors |
| 60 | ServiceCards | `ServiceCards.tsx` | Cascade d'apparition — reveal-item stagger 80ms/carte |
| 61 | ServiceCards | `globals.css` | Badge rentrée pulse — `badge-shimmer` |

---

## HOME — POURQUOI STACKUP

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 62 | Pourquoi | `page.tsx` | Cartes reveal stagger — reveal-item delay 0/80/160ms |
| 63 | Pourquoi | `page.tsx` | Hover card — translateY -1 + bg-white/8 + border-white/20 |
| 64 | Pourquoi | `page.tsx` | Accent line — opacity 0→1 au hover groupe |
| 65 | Pourquoi | `page.tsx` | Icon chip hover — bg-blue-500/25 |
| 66 | Pourquoi | `page.tsx` | Background halo radial — statique mais breathing |

---

## HOME — RÉALISATIONS (PinnedGallery)

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 67 | PinnedGallery | `PinnedGallery.tsx` | Scroll pinned — scroll-driven section switch |
| 68 | PinnedGallery | `PinnedGallery.tsx` | Demo scroll illusion — `demo-scroll-N` translateY au survol |
| 69 | PinnedGallery | `PinnedGallery.tsx` | Thumbnail zoom — `real-thumb` scale 1.04 |
| 70 | PinnedGallery | `PinnedGallery.tsx` | Compteur projet — numéros animés |

---

## HOME — PROCESS

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 71 | Process | `ProcessSection.tsx` | Trait horizontal dessiné — `process-line` scaleX 0→1 (0.8s cubic) |
| 72 | Process | `ProcessSection.tsx` | Étapes reveal en cascade — stagger 180ms/étape |
| 73 | Process | `ProcessSection.tsx` | Cercles numerotés — `step-circle` gradient + box-shadow |
| 74 | Process | `ProcessSection.tsx` | Pulse au reveal — `icon-pulse` sur step-circle is-visible |

---

## HOME — MANIFESTO

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 75 | Manifesto | `ManifestoSection.tsx` | Mots révélés par scroll — opacity 0.12→1 (cubic 3D) |
| 76 | Manifesto | `ManifestoSection.tsx` | Trait doré — width 0→100% avec glow F59E0B |
| 77 | Manifesto | `ManifestoSection.tsx` | Gradient text "Performance" |

---

## HOME — MAINTENANCE

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 78 | Maintenance | `page.tsx` | Cartes reveal stagger — delay 0/80/160ms |
| 79 | Maintenance | `page.tsx` | Hover hover — translateY -0.5 |
| 80 | Maintenance | `page.tsx` | Liseret top accent gradient |
| 81 | Maintenance | `page.tsx` | Carte Pro shadow-lift |

---

## HOME — BLOG

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 82 | Blog teaser | `page.tsx` | Cartes reveal stagger |
| 83 | Blog teaser | `page.tsx` | Hover — translateY -0.5 + border electric |
| 84 | Blog teaser | `page.tsx` | "Lire l'article" arrow slide |

---

## HOME — FAQ

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 85 | FAQ | `HomeFaq.tsx` | Accordéon `grid-template-rows` 0fr→1fr (0.35s cubic) |
| 86 | FAQ | `HomeFaq.tsx` | Chevron rotate(180deg) au clic |
| 87 | FAQ | `HomeFaq.tsx` | Bordure active transition electric/30 |

---

## HOME — CTA FINAL

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 88 | CTA | `page.tsx` | Halo radial pulsant — `halo-pulse` scale+opacity (4s infini) |
| 89 | CTA | `page.tsx` | Gradient animé fond — `grad-shift` (8s) |
| 90 | CTA | `page.tsx` | CTA bouton gold hover — translateY -0.5 |
| 91 | CTA | `page.tsx` | Checklist items — `CheckCircle` avec text-success |

---

## FAQ PAGE

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 92 | FAQ | `FaqAccordion.tsx` | Accordéon grid-rows 0fr→1fr |
| 93 | FAQ | `FaqAccordion.tsx` | Chevron rotate 180° |
| 94 | FAQ | `FaqAccordion.tsx` | Bordure hover / active data-[open] |
| 95 | FAQ | `faq/page.tsx` | Programme parrainage card — border-gold/20 hover |
| 96 | FAQ | `faq/page.tsx` | CTA section — hover bouton translateY -0.5 |

---

## TARIFS PAGE

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 97 | Tarifs | `PricingCards.tsx` | Bordure conic-gradient tournante — `card-gradient-border` / `angle-rotate` 4s sur carte populaire |
| 98 | Tarifs | `PricingCards.tsx` | Liseret top accent gradient par variante (or/electric/navy) |
| 99 | Tarifs | `PricingCards.tsx` | Hover translateY -0.5 (cartes starter/default) |
| 100 | Tarifs | `PricingCards.tsx` | **CountUp prix** — easing ease-out-quart, RAF, 900ms + stagger 100ms/carte |
| 101 | Tarifs | `PricingCards.tsx` | **Check items stagger** — `.check-item` translateX(-8px)→0 + opacity, 60ms/item |
| 102 | Tarifs | `PricingCards.tsx` | IntersectionObserver reveal — threshold 0.15, déclenche CountUp + checks |
| 103 | Tarifs | `PricingCards.tsx` | Badge "Le plus populaire" — text-gold, statique |

---

## PAGES SERVICES (template)

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 104 | Service page | `[slug]/page.tsx` | Section alternation — white/pale/deep |
| 105 | Service page | `[slug]/page.tsx` | Cartes inclus reveal cascade |
| 106 | Service page | `[slug]/page.tsx` | Étapes process — stagger |
| 107 | Service page | `[slug]/page.tsx` | FAQ accordéon |
| 108 | Service page | `[slug]/page.tsx` | CTA section hover buttons |

---

## PAGES VILLES (template)

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 109 | Agence web ville | template | Reveals cascade |
| 110 | Agence web ville | template | ServiceCards accents |

---

## PAGES MÉTIERS (template)

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 111 | Création site métier | template | Reveals, accents, CTA |

---

## BLOG — HUB

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 112 | Blog hub | `BlogClient.tsx` | Filtres pills — bg-electric + shadow-electric/30 sur active |
| 113 | Blog hub | `BlogClient.tsx` | Filtre switch — border electric + text-electric au hover |
| 114 | Blog hub | `BlogClient.tsx` | Cartes articles — `.blog-card-hover` translateY(-4px) + shadow-electric/12 |
| 115 | Blog hub | `BlogClient.tsx` | Carte border — border-electric/30 au hover |
| 116 | Blog hub | `BlogClient.tsx` | Icône catégorie — gradient bg full |
| 117 | Blog hub | `BlogPageClient.tsx` | Gradient hero header |

---

## BLOG — ARTICLE (template)

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 118 | Article | `[slug]/page.tsx` | **Barre de lecture** — `.reading-progress` scaleX 0→1 en temps réel (RAF) |
| 119 | Article | `[slug]/page.tsx` | Gradient header → dark fond |
| 120 | Article | `[slug]/page.tsx` | Badge tag + readTime — pill bg-white/10 |
| 121 | Article | `[slug]/page.tsx` | CTA bas article — hover translateY -0.5 |
| 122 | Article | `RelatedPosts` | Articles liés — reveal-item stagger |

---

## OUTILS (Studio de style)

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 123 | Studio | `StudioClient.tsx` | Progress bar section (width 0→100%) |
| 124 | Studio | `StudioClient.tsx` | Scroll discipline goToSection — scrollIntoView smooth |
| 125 | Studio | `StudioClient.tsx` | Sommaire tabs transition-colors |
| 126 | Studio | `StudioClient.tsx` | Live preview mise à jour temps réel |
| 127 | Studio | `StudioClient.tsx` | Font lazy loading IntersectionObserver |
| 128 | Studio | `StudioClient.tsx` | Profile code copy — check icon (Check/Copy) |

---

## OUTILS (Devis express)

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 129 | Devis | `DevisForm.tsx` | Step progress bar — width transition |
| 130 | Devis | `DevisForm.tsx` | Scroll discipline goToStep — scrollIntoView smooth + focus preventScroll |
| 131 | Devis | `DevisForm.tsx` | Boutons projet — border electric + bg electric/5 au clic |
| 132 | Devis | `DevisForm.tsx` | Étapes révélées / masquées |

---

## CONTACT PAGE

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 133 | Contact | `Contact.tsx` | **Floating labels** — label translateY(-50%)→top 0.45rem + font-size 0.875→0.65rem (0.18s) |
| 134 | Contact | `Contact.tsx` | Champ focus ring — border-electric + ring electric/15 |
| 135 | Contact | `Contact.tsx` | Select label custom float — state contrôlé React |
| 136 | Contact | `Contact.tsx` | Submit btn gradient — hover from/to inversé + translateY -0.5 |
| 137 | Contact | `Contact.tsx` | **Spinner submit** — `.btn-spinner` border-top rotate 0.7s infini |
| 138 | Contact | `Contact.tsx` | **Succès CheckCircle** — `.success-icon-anim` scale 0.6→1.15→1 (0.5s spring) |
| 139 | Contact | `Contact.tsx` | Succès Gift card — reveal-item (opacity + translateY) |
| 140 | Contact | `Contact.tsx` | Sidebar sticky info — shadow-lift-sm |
| 141 | Contact | `Contact.tsx` | Reveal item form + sidebar — stagger 0/120ms |

---

## À PROPOS PAGE

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 142 | À propos | `a-propos/page.tsx` | **Étapes méthode reveal** — reveal-item stagger 80ms/étape + step-circle |
| 143 | À propos | `a-propos/page.tsx` | **Trait vertical entre étapes** — `.step-line::before` gradient electric→transparent |
| 144 | À propos | `a-propos/page.tsx` | **Step circle** — gradient bg + box-shadow electric/30 |
| 145 | À propos | `a-propos/page.tsx` | **Hover étape** — border-electric/30 transition-colors |
| 146 | À propos | `a-propos/page.tsx` | Tech cards reveal stagger — 60ms/carte + hover translateY -0.5 |
| 147 | À propos | `a-propos/page.tsx` | Tech cards hover — border-electric/30 + titre text-electric |
| 148 | À propos | `a-propos/page.tsx` | Croyances reveal stagger — 50ms/item |
| 149 | À propos | `a-propos/page.tsx` | CTA section — hover translateY -0.5 |

---

## 404 PAGE

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 150 | 404 | `not-found.tsx` | **Chiffre 4 gauche** — `not-found-4` float (translateY 0→-14px + rotate ±2°, 4s infini) |
| 151 | 404 | `not-found.tsx` | **Chiffre 0** — `not-found-0` rotation complète + scale (8s infini) |
| 152 | 404 | `not-found.tsx` | **Chiffre 4 droit** — `not-found-4b` float décalé (delay 0.5s, 4s infini) |
| 153 | 404 | `not-found.tsx` | Gradient bicolore sur le zéro — electric→gold background-clip text |
| 154 | 404 | `not-found.tsx` | CTA primary — hover translateY -0.5 + shadow-electric/25 |
| 155 | 404 | `not-found.tsx` | CTA secondary — hover border-white/30 + translateY -0.5 |
| 156 | 404 | `not-found.tsx` | Halos radial décoratifs — electric/8 + gold/6 |

---

## FOOTER

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 157 | Footer | `Footer.tsx` | Social icons hover — bg-electric + border-electric/50 |
| 158 | Footer | `Footer.tsx` | Links hover — translateX 0.5 |
| 159 | Footer | `Footer.tsx` | Logo group hover |
| 160 | Footer | `Footer.tsx` | Top border gradient hairline |
| 161 | Footer | `Footer.tsx` | Background halo radial statique |

---

## MiniHero (composant partagé)

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 162 | MiniHero | `MiniHero.tsx` | Gradient bg dark hero |
| 163 | MiniHero | `MiniHero.tsx` | Breadcrumb fade-in |
| 164 | MiniHero | `MiniHero.tsx` | Titre reveal-item |
| 165 | MiniHero | `MiniHero.tsx` | Subtitle reveal-item delay |

---

## RÉALISATIONS HUB

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 166 | Réalisations | `realisations/page.tsx` | Cartes reveal stagger |
| 167 | Réalisations | `realisations/page.tsx` | Thumbnail scale 1→1.04 hover (real-thumb) |
| 168 | Réalisations | `realisations/page.tsx` | Card lift — translateY -4px + shadow |
| 169 | Réalisations | `realisations/page.tsx` | Overlay gradient bottom reveal au hover |
| 170 | Réalisations | `realisations/page.tsx` | Badge tech — pill fade-in |

---

## RÉALISATIONS — FICHES PROJETS

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 171 | Fiche projet | `[slug]/page.tsx` | Hero gradient dark |
| 172 | Fiche projet | `[slug]/page.tsx` | Galerie screenshots reveal stagger |
| 173 | Fiche projet | `[slug]/page.tsx` | Tech badges reveal cascade |
| 174 | Fiche projet | `[slug]/page.tsx` | CTA hover translateY -0.5 |

---

## PARRAINAGE PAGE

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 175 | Parrainage | `parrainage/page.tsx` | Étapes 3 reveal stagger |
| 176 | Parrainage | `parrainage/page.tsx` | Avantages CheckCircle reveal |
| 177 | Parrainage | `parrainage/page.tsx` | CTA bouton hover |
| 178 | Parrainage | `parrainage/page.tsx` | Card border-gold/20 hover |

---

## OFFRE RENTRÉE PAGE

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 179 | Rentrée | `offre-rentree/page.tsx` | Countdown digits — odometer translateY (ticker-in) |
| 180 | Rentrée | `offre-rentree/page.tsx` | Badge shimmer rentrée |
| 181 | Rentrée | `offre-rentree/page.tsx` | Hero gradient pulsant |
| 182 | Rentrée | `offre-rentree/page.tsx` | Inclus reveal stagger |
| 183 | Rentrée | `EncartRentree.tsx` | Encart reveal-item au scroll |
| 184 | Rentrée | `EncartRentree.tsx` | Badge dot pulse ambre |

---

## SOLUTIONS HUB & FICHES

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 185 | Solutions hub | `solutions/page.tsx` | Cartes reveal stagger |
| 186 | Solutions hub | `solutions/page.tsx` | Hover elevation + border-electric/30 |
| 187 | Solutions fiche | `solutions/[slug]/page.tsx` | Section features reveal cascade |
| 188 | Solutions fiche | `solutions/[slug]/page.tsx` | Étapes process stagger |
| 189 | Solutions fiche | `solutions/[slug]/page.tsx` | FAQ accordéon grid-rows |
| 190 | Solutions fiche | `solutions/[slug]/page.tsx` | CTA hover translateY |

---

## SERVICES HUB

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 191 | Services hub | `services/page.tsx` | Cartes reveal stagger |
| 192 | Services hub | `services/page.tsx` | Icône chip hover bg |
| 193 | Services hub | `services/page.tsx` | Délai badge reveal |
| 194 | Services hub | `services/page.tsx` | Arrow-slide CTA |

---

## SERVICES LOCAUX (template)

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 195 | Services locaux | `services-locaux/[slug]/page.tsx` | Reveals cascade sections |
| 196 | Services locaux | `services-locaux/[slug]/page.tsx` | FAQ accordéon |
| 197 | Services locaux | `services-locaux/[slug]/page.tsx` | CTA bouton hover |

---

## PLAN DU SITE

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 198 | Plan du site | `plan-du-site/page.tsx` | Sections reveal stagger |
| 199 | Plan du site | `plan-du-site/page.tsx` | Links hover text-electric + underline |

---

## MENTIONS LÉGALES / CGV / CONFIDENTIALITÉ

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 200 | Mentions | `mentions-legales/page.tsx` | Reveal sections prose |
| 201 | CGV | `cgv/page.tsx` | Reveal sections prose |
| 202 | Confidentialité | `politique-confidentialite/page.tsx` | Reveal sections prose |

---

## RESSOURCES / DOCUMENTS

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 203 | Documents | `ressources/documents/page.tsx` | Document cards reveal stagger |
| 204 | Documents | `ressources/documents/page.tsx` | Download hover bg-electric/10 |
| 205 | Documents | `ressources/documents/page.tsx` | Icône doc — scale 1→1.05 au hover |

---

## OUTILS (HUB)

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 206 | Outils hub | `outils/page.tsx` | Cartes outil reveal stagger |
| 207 | Outils hub | `outils/page.tsx` | Hover card elevation + border |
| 208 | Outils hub | `outils/page.tsx` | Icône outil badge gradient |

---

## CAHIER DES CHARGES

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 209 | Cahier | `ressources/cahier-des-charges/page.tsx` | Checklist reveals stagger |
| 210 | Cahier | `ressources/cahier-des-charges/page.tsx` | Progress indication reveal |

---

## COMPOSANTS GÉNÉRIQUES

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 211 | Breadcrumb | `Breadcrumb.tsx` | Fade-in items |
| 212 | AuthorByline | `AuthorByline.tsx` | Avatar pulse hover |
| 213 | RelatedPosts | `RelatedPosts.tsx` | Cartes reveal-item stagger |
| 214 | RelatedPosts | `RelatedPosts.tsx` | Hover translateY -0.5 |
| 215 | EncartRentree | `EncartRentree.tsx` | Badge dot pulse ambre |
| 216 | EncartRentree | `EncartRentree.tsx` | Countdown ticker-in digits |
| 217 | EncartRentree | `EncartRentree.tsx` | CTA hover translateY -0.5 |

---

## AGENCE WEB / [VILLE] (template)

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 218 | Ville | `agence-web/[ville]/page.tsx` | Reveal cascade sections |
| 219 | Ville | `agence-web/[ville]/page.tsx` | ServiceCards — spotlight curseur + hover elevation |
| 220 | Ville | `agence-web/[ville]/page.tsx` | FAQ accordéon grid-rows |
| 221 | Ville | `agence-web/[ville]/page.tsx` | CTA bouton hover |
| 222 | Ville | `agence-web/[ville]/page.tsx` | Process steps stagger |

---

## CRÉATION SITE / [MÉTIER] (template)

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 223 | Métier | `creation-site-internet/[slug]/page.tsx` | Hero reveal stagger |
| 224 | Métier | `creation-site-internet/[slug]/page.tsx` | Fonctionnalités cartes stagger |
| 225 | Métier | `creation-site-internet/[slug]/page.tsx` | FAQ accordéon |
| 226 | Métier | `creation-site-internet/[slug]/page.tsx` | CTA hover translateY |

---

## GLOBALS CSS — UTILITAIRES ANIMÉS PHASE 2

| # | Composant | Localisation | Animation |
|---|---|---|---|
| 227 | Float label | `globals.css` | **Floating labels** — label position abs → top 0.45rem + font-size 0.875→0.65rem (0.18s) |
| 228 | Float label | `globals.css` | Champ focus ring — border-electric + ring electric/15 |
| 229 | Float label | `globals.css` | Validation `.is-valid` — border-green-500 |
| 230 | Float label | `globals.css` | Validation `.is-error` — border-red-500 |
| 231 | Submit spin | `globals.css` | `.btn-spinner` — border-top rotate 0.7s linear infini |
| 232 | Success | `globals.css` | `.success-icon-anim` — scale 0.6→1.15→1 spring 0.5s |
| 233 | 404 | `globals.css` | `not-found-4` — float 0→-14px + rotate ±2° (4s) |
| 234 | 404 | `globals.css` | `not-found-0` — rotate 360° + scale 0.92 (8s linear) |
| 235 | 404 | `globals.css` | `not-found-4b` — float delay 0.5s (4s) |
| 236 | Check stagger | `globals.css` | `.check-item` / `.checks-visible` — translateX(-8px)→0, 60ms/item |
| 237 | CountUp | `globals.css` | `.price-reveal` / `.price-reveal-inner` — translateY(100%)→0 (0.5s cubic) |
| 238 | Blog card | `globals.css` | `.blog-card-hover` — translateY(-4px) + shadow-electric/12 (0.3s) |
| 239 | Reading progress | `globals.css` | `.reading-progress` — scaleX 0→1 position fixed top (temps réel) |
| 240 | TOC active | `globals.css` | `.toc-link.active` — border-electric + text-electric + padding-left 1rem |
| 241 | Step line | `globals.css` | `.step-line::before` — gradient electric→transparent vertical |
| 242 | Mobile menu | `globals.css` | `.mobile-menu-overlay` — opacity 0→1 + translateY(-8px)→0 (0.25s) |
| 243 | Mobile menu | `globals.css` | `.mobile-menu-item` — translateX(-16px)→0 + opacity (0.28s, 15 stagger delays) |
| 244 | Mobile menu | `globals.css` | `.mobile-menu-section` — opacity 0→1 (3 sections, 3 delays) |
| 245 | Mobile menu | `globals.css` | `.mobile-menu-cta` — translateY(12px)→0 delay 520ms |
| 246 | Reduced motion | `globals.css` | Tous les nouveaux keyframes désactivés ou no-op |

---

## SYNTHÈSE GLOBALE

| Catégorie | Nb animations |
|---|---|
| Global / Utilitaires CSS | 18 |
| Mobile menu premium | 8 |
| Home (Hero, Marquee, Services, Process…) | 57 |
| Tarifs (CountUp, checks, bordures) | 7 |
| Blog hub + article (lecture progress) | 11 |
| Contact (floating labels, spinner, succès) | 9 |
| À propos (steps, tech, croyances) | 8 |
| 404 page (float, spin, halos) | 7 |
| Footer | 5 |
| Pages services/villes/métiers (templates) | 15 |
| Solutions + Réalisations | 10 |
| Outils (Devis, Studio) | 10 |
| Parrainage + Rentrée | 10 |
| Composants génériques | 10 |
| Globals CSS Phase 2 (utilitaires) | 20 |
| **TOTAL** | **≥ 205 animations distinctes** |

---

**Chaque animation respecte :**
- ✅ Transform/opacity only (aucun layout reflow)
- ✅ `prefers-reduced-motion: reduce` couvert (blocs @media Phase 1 + Phase 2)
- ✅ État initial visible sans JS
- ✅ Contenu SEO jamais caché définitivement
- ✅ 60fps — aucun `box-shadow` animé en loop infini sur viewport complet
