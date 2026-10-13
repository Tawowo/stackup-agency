# STACKUP — AUDIT DE RÉFÉRENCE (BASELINE)

> Phase 1 de la mission « expérience web futuriste ».
> Tout ce qui figure ici a été **vérifié par exécution ou lecture du code**, pas déduit des noms de fichiers.
> Date de l'audit : 2026-10-11 · Commit de départ : `84d2425` · Branche : `main`

---

## 1. Environnement réellement disponible

| Élément | État vérifié |
|---|---|
| Node / npm | v22.22.0 / 10.9.4 |
| Chromium (Playwright) | `/opt/pw-browsers/chromium-1194` — présent, lance en headless |
| Lighthouse | v13.4.1 en devDependency, fonctionne via `CHROME_PATH` |
| `raw.githubusercontent.com` | **200** — lecture de fichiers sources de dépôts possible |
| `registry.npmjs.org` | **200** — métadonnées de paquets accessibles |
| `api.github.com` | **403** — API GitHub bloquée par le proxy |
| `github.com` (HTML) | **400** — pages web GitHub bloquées |
| `stackup-agency.fr` (prod) | **000** — site de production injoignable depuis le conteneur |
| GPU | Aucun GPU dédié. Chromium tourne en SwiftShader (rendu logiciel). |

**Conséquence majeure pour la suite :** toute mesure de performance WebGL faite ici est un **plancher pessimiste** (rendu logiciel sans GPU). Les scores Lighthouse sont des indicateurs de laboratoire, pas des données de terrain au 75e percentile.

---

## 2. Build de référence

```
✓ Compiled successfully
✓ Generating static pages (435/435)
```

| Mesure | Valeur baseline |
|---|---|
| Pages générées | **435** |
| Erreurs / warnings de build | **0 / 0** |
| First Load JS partagé | **87,3 kB** |
| Page d'accueil | 24,1 kB → **129 kB** First Load |
| `/blog` | 6,15 kB → 114 kB |
| `/devis` | 10,4 kB → 106 kB |
| `/realisations` | 2,08 kB → 107 kB |
| `/services` | 1,81 kB → 97,8 kB |
| **CSS généré** | **174 697 octets (≈ 174 kB)** en un seul fichier |
| Total `.next/static/chunks` | 1,6 Mo |

---

## 3. Lighthouse mobile de référence — page d'accueil

Conditions : mobile simulé, throttling standard, serveur `next start` local, Chromium sans GPU.

| Métrique | Valeur |
|---|---|
| **Performance** | **78 / 100** |
| FCP | 1,2 s |
| LCP | 3,1 s |
| **TBT** | **570 ms** |
| CLS | **0** ✅ |
| Speed Index | 3,7 s |

### La cause n°1 du TBT est le CSS, pas le JavaScript

Relevé des tâches longues :

| Ressource | Durée de tâche longue |
|---|---|
| **`c5b5e86d40b52a92.css` (174 kB)** | **452 ms** |
| chunk `2117-…js` | 140 ms + 89 ms |
| Non attribuable | 96 ms |

C'est le constat le plus important de l'audit : **la feuille de style bloque le thread principal pendant 452 ms**. La dette CSS n'est pas seulement un problème de maintenabilité, c'est le premier goulot de performance du site. 23 951 octets de CSS sont par ailleurs signalés comme inutilisés sur la page d'accueil.

---

## 4. Dette technique mesurée

### 4.1 Prolifération d'animations sans système

- **87 blocs `@keyframes`** dans `src/app/globals.css` (2 810 lignes).
- Nommage incohérent : `heroRise` / `hero-word-in` / `hero-overline-in` coexistent (camelCase et kebab-case pour le même domaine).
- Doublons fonctionnels : `halo-pulse`, `halo-breathe`, `halo-orbit`, `aurora-drift-1`, `aurora-drift-2` font tous varier une lueur de fond.
- Aucune échelle de durées ni de courbes partagée : les valeurs sont écrites à la main dans chaque composant.

### 4.2 Dépendances mortes ou redondantes

| Paquet | Constat vérifié |
|---|---|
| **`gsap` ^3.15.0** | **Aucun `import` dans tout `src/`.** Dépendance totalement morte. |
| **`framer-motion` ^12.40.0** | Importé **uniquement** par 6 fichiers de `src/components/sections/`… qui sont eux-mêmes morts (voir 4.3). Donc : **aucun code vivant ne l'utilise**. |

Deux moteurs d'animation déclarés, zéro moteur réellement utilisé dans le code vivant.

### 4.3 Composants morts (0 import)

Vérifiés un par un par recherche d'import :

```
src/components/sections/Hero.tsx          → 0 import
src/components/sections/About.tsx         → 0 import
src/components/sections/Services.tsx      → 0 import
src/components/sections/Blog.tsx          → 0 import
src/components/sections/FAQ.tsx           → 0 import
src/components/sections/Portfolio.tsx     → 0 import
src/components/sections/Pricing.tsx       → 0 import
src/components/sections/Contact.tsx       → 0 import
src/components/home/ProcessSection.tsx    → 0 import
src/components/home/PinnedGallery.tsx     → 0 import
src/components/home/ManifestoSection.tsx  → 0 import
src/components/home/ServiceCards.tsx      → 0 import
src/components/ui/SectionDepth.tsx        → 0 import
```

**13 composants morts.** Les supprimer retire mécaniquement la dernière raison de garder `framer-motion`.

### 4.4 Thème sombre fantôme

`src/contexts/ThemeContext.tsx` force le thème clair en permanence (`classList.remove('dark')`, commentaire « Plus de toggle, plus de dark mode »).
Pourtant **51 fichiers `.tsx` contiennent encore des classes `dark:`**. Tailwind génère donc des règles qui ne pourront jamais s'appliquer — contribution directe aux 174 kB de CSS.

### 4.5 Couche d'overlays globaux

`layout.tsx` monte simultanément : `PageProgressBar`, `SectionProgressBar`, `BrandPreloader`, `RevealObserver`, `CookieBanner`, plus la bannière rentrée. Deux barres de progression distinctes coexistent sans hiérarchie claire.

### 4.6 Trois familles de polices

`Inter` + `Space_Grotesk` + `JetBrains_Mono` sont chargées sur **toutes** les pages via `layout.tsx`. C'est l'explication la plus probable du plancher de LCP (~3 s) observé de façon constante sur toutes les pages du site, y compris celles notées 95/100.

---

## 5. Ce qui est bon et doit être préservé

L'audit ne relève pas que des problèmes. Les éléments suivants sont solides et ne doivent pas être cassés :

- **CLS = 0** sur toutes les pages mesurées. Rare et précieux.
- **Architecture SEO très développée** : 435 pages, sitemap segmenté, `llms.txt`, schémas JSON-LD (Organization, LocalBusiness, BlogPosting, FAQPage, BreadcrumbList), 300 articles de blog avec système de publication programmée (`publishAt`).
- **Source unique de vérité pour les prix** : `src/config/site.ts` centralise tarifs et délais. À conserver absolument.
- **Données structurées métier** : `src/data/metiers.ts` (79 métiers), `solutions.ts` (17), `villes.ts` (30), `departements.ts` (15), `communes-groupes.ts`. Actif considérable.
- **Honnêteté commerciale** : aucune fausse référence client, aucun faux témoignage, mention « démonstration » explicite sur les projets. Ligne éditoriale à préserver strictement.
- **Formulaires fonctionnels** : routes API `contact`, `parrainage`, `audit` avec Resend et Twilio.
- **Tests Playwright** et configuration `@axe-core/playwright` déjà présents.
- **Aucune erreur console** et **aucun débordement horizontal** détectés sur les 6 pages clés en mobile (390 px) et desktop (1440 px).

---

## 6. Faiblesses de conception observées visuellement

Captures de référence enregistrées dans `docs/baseline/` (12 images, 6 pages × 2 largeurs).

| Page | Constat |
|---|---|
| `/services` | Exactement le défaut à corriger : une carte par offre, titre + prix + deux boutons, **un grand vide au centre de la carte**. Aucune démonstration de ce que l'agence sait faire. |
| `/realisations` | Grille de cartes homogènes. Les projets ne se distinguent pas les uns des autres. |
| `/` (accueil) | Le hero utilise un éditeur de code animé en HTML/CSS. L'effet est correct mais reste du « faux code qui se tape » — un pattern très répandu, qui ne démontre aucune capacité technique réelle. |
| Global | Aucune signature de mouvement reconnaissable : les sections apparaissent toutes par le même fondu + translation. |

---

## 7. Conclusion de l'audit — stratégie qui en découle

Trois constats convergent vers une même décision architecturale :

1. Le CSS (174 kB, 87 keyframes) est **à la fois** la pire dette de maintenabilité **et** le premier goulot de performance (tâche longue de 452 ms).
2. Les deux moteurs d'animation déclarés ne sont utilisés par **aucun** code vivant — le terrain est donc libre pour choisir une architecture cohérente sans rien casser.
3. 13 composants morts et 51 fichiers avec du `dark:` fantôme peuvent être retirés sans aucun impact fonctionnel.

**La refonte créative ambitieuse et le nettoyage de performance ne sont pas en conflit : c'est le même chantier.** Reconstruire le système de mouvement sur des tokens et un moteur unique permet simultanément d'obtenir une signature visuelle propre à Stackup et de supprimer la tâche longue de 452 ms.

Ce qui ne doit **jamais** être sacrifié dans la suite : les 435 URLs, les données structurées, les 300 articles, la source unique des prix, l'honnêteté commerciale, le CLS à 0.
