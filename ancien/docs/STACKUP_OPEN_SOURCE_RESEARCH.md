# STACKUP — RECHERCHE OPEN SOURCE (PHASE 2)

> Recherche **réellement exécutée**, pas une liste d'inspirations inventées.
> Harnais reproductible : `scripts/research-opensource.mjs` · Données brutes : `docs/research-raw.json`

---

## 1. Ce qui a pu être vérifié, et comment — en toute transparence

### Contrainte d'environnement constatée

Le conteneur passe par un proxy qui filtre les domaines :

| Canal | Statut réel | Conséquence |
|---|---|---|
| `api.github.com` | **403** | Impossible de lire étoiles, dates de commit, arbres de fichiers |
| `github.com` (HTML) | **400** | Impossible de parcourir les dépôts dans un navigateur |
| `raw.githubusercontent.com` | **200** ✅ | **Lecture de fichiers sources réels possible** |
| `registry.npmjs.org` | **200** ✅ | **Métadonnées de paquets réelles** (version, licence, poids, dépendances) |

La recherche a donc été conduite via les deux canaux ouverts, avec journalisation de chaque requête.

### Bilan chiffré et honnête

| Mesure | Résultat |
|---|---|
| Paquets npm interrogés | 93 |
| **Paquets avec métadonnées réellement obtenues** | **90** |
| Dépôts GitHub sollicités | 110 |
| **Dépôts dont au moins un fichier a été téléchargé** | **94** |
| **Fichiers sources réellement téléchargés et analysés** | **160** |
| **Total de sources distinctes réellement consultées** | **184** |

**Ce que cela signifie précisément :**

- Pour les **90 paquets npm** : j'ai obtenu la version publiée, la licence déclarée, le poids dépaqueté, le nombre de dépendances et la date de dernière modification. Ce sont des faits, pas des estimations.
- Pour les **94 dépôts GitHub** : j'ai téléchargé et lu leur `README`, leur `LICENSE` et parfois leur `package.json`. **Je n'ai pas lu l'intégralité du code de ces dépôts** — l'API GitHub étant bloquée, je ne pouvais pas parcourir leurs arborescences.
- **16 dépôts n'ont pas pu être atteints** (branche par défaut différente de celle tentée, ou dépôt déplacé/privé). Ils sont listés en fin de document plutôt que dissimulés.

**Je ne prétends donc pas avoir « analysé 100 dépôts en profondeur ».** J'ai consulté 184 sources distinctes, dont 94 dépôts par leurs fichiers de présentation et de licence, ce qui est suffisant pour les décisions d'architecture et de licence documentées ci-dessous, mais pas pour affirmer une revue de code exhaustive.

---

## 2. Découverte déterminante : la licence GSAP

Le fichier `LICENSE.md` de `greensock/GSAP` a été téléchargé et lu. Il ne contient **pas** une licence MIT mais :

```
Standard "no charge" license: https://gsap.com/standard-license
```

Le registre npm confirme ce champ `license` non standard.

**Conséquence pour Stackup :** GSAP n'est pas sous licence open source permissive. Sa licence standard gratuite comporte des restrictions d'usage (notamment sur les produits où l'utilisateur final paie pour accéder au contenu animé). Pour un site d'agence, l'usage serait vraisemblablement couvert — mais l'audit de Phase 1 a établi que **GSAP n'est importé nulle part dans `src/`**.

**Décision :** retirer `gsap` du projet. On supprime simultanément 6,1 Mo de dépendance morte et une obligation de licence non permissive, sans perdre une seule ligne de code fonctionnel.

---

## 3. Tableau de décision — données réelles du registre npm

| Paquet | Version | Licence | Poids dépaqueté | Deps | Décision Stackup |
|---|---|---|---|---|---|
| **three** | 0.186.1 | **MIT** | 19 964 kB | **0** | ✅ **Retenu**, en imports sélectifs |
| @react-three/fiber | 9.8.1 | MIT | 2 323 kB | 10 | ❌ Écarté — voir §4 |
| @react-three/drei | 10.7.9 | MIT | 1 713 kB | **21** | ❌ Écarté — 21 dépendances pour des aides non nécessaires |
| three-stdlib | 2.36.1 | MIT | **25 787 kB** | 6 | ❌ Écarté — poids disproportionné |
| postprocessing | 6.39.5 | Zlib | 2 709 kB | 0 | ❌ Écarté — post-traitement écrit à la main si besoin |
| ogl | 1.0.11 | Unlicense | **413 kB** | 0 | ⚠️ Sérieusement considéré — voir §4 |
| regl | 2.1.1 | MIT | 1 185 kB | 0 | ❌ Écarté — paradigme fonctionnel inadapté au besoin |
| pixi.js | 8.22.0 | MIT | 74 487 kB | 10 | ❌ Écarté — orienté 2D, trop lourd |
| babylonjs | 9.30.0 | Apache-2.0 | 110 840 kB | 0 | ❌ Écarté — moteur de jeu complet, hors sujet |
| **gsap** | 3.15.0 | **non-OSS** | 6 111 kB | 0 | ❌ **Supprimé du projet** |
| framer-motion | 14.1.0 | MIT | 5 853 kB | 3 | ❌ **Supprimé** — mort après nettoyage |
| motion | 14.1.0 | MIT | 739 kB | 2 | ⚠️ Successeur 8× plus léger — non retenu, voir §4 |
| lenis | 1.3.26 | MIT | 447 kB | 0 | ❌ Écarté — scroll natif préservé (accessibilité) |
| locomotive-scroll | 5.0.1 | MIT | 514 kB | 1 | ❌ Écarté — même raison |
| @theatre/core | 0.7.2 | Apache-2.0 | 882 kB | 1 | ❌ Écarté — outil d'édition, inutile en production |
| animejs | 4.5.0 | MIT | 2 076 kB | 0 | ❌ Écarté |
| @react-spring/web | 10.1.2 | MIT | **55 kB** | 5 | ⚠️ Noté comme recours léger si ressorts nécessaires |
| detect-gpu | 5.0.70 | MIT | 956 kB | 1 | ❌ Écarté — mesure réelle de frame-time préférée (voir §5) |
| simplex-noise | 4.0.3 | MIT | 106 kB | 0 | ❌ Écarté — bruit implémenté en GLSL côté GPU |
| troika-three-text | 0.52.5 | MIT | 823 kB | 4 | ❌ Écarté — typographie conservée en DOM (SEO + a11y) |
| camera-controls | 3.1.2 | MIT | 367 kB | 0 | ❌ Écarté — caméra pilotée par le scroll, pas par l'utilisateur |
| zustand | 5.0.15 | MIT | 93 kB | 0 | ❌ Écarté — état local React suffisant |
| **tinykeys** | 4.0.1 | MIT | **76 kB** | 0 | ⚠️ Étudié pour la palette ⌘K — finalement réimplémenté (≈ 30 lignes) |
| cmdk | 1.1.1 | MIT | 80 kB | 4 | ❌ Écarté — composant écrit sur mesure, accessible |
| web-vitals | 6.2.3 | Apache-2.0 | 1 166 kB | 0 | ❌ Écarté en production — Lighthouse utilisé en laboratoire |
| thumbhash | 0.1.1 | MIT | 13 kB | 0 | ⚠️ Noté pour un futur chantier images |

### Répartition des licences réellement lues dans les fichiers `LICENSE`

| Licence | Dépôts |
|---|---|
| MIT | **47** |
| Apache-2.0 | 12 |
| À vérifier au cas par cas (formats non standard) | 10 |
| CC | 1 |
| **Non open source (GSAP)** | **1** |
| Fichier `LICENSE` non trouvé au chemin tenté | 23 |

---

## 4. La décision d'architecture la plus importante : three.js brut, pas React Three Fiber

C'est le choix le plus contre-intuitif de ce projet, et il mérite d'être justifié.

**L'option confortable** aurait été `@react-three/fiber` + `@react-three/drei`. C'est la stack par défaut de l'écosystème React 3D.

**Les données collectées la déconseillent ici :**

1. **Coût de dépendances** : fiber (10 deps) + drei (21 deps) = **31 dépendances transitives** ajoutées pour une seule scène sur une seule page. Sur un site de 435 pages dont 434 n'ont aucun besoin de 3D, c'est un mauvais rapport.
2. **La scène visée n'est pas « réactive »** : c'est une scène unique, pilotée par le scroll et le pointeur, dont la géométrie est générée une fois. Le réconciliateur React de fiber résout un problème que ce projet n'a pas — et ajoute une couche entre le code et la boucle de rendu.
3. **Exigence explicite de la mission** : *« un développeur expérimenté puisse examiner le code et constater un véritable travail d'ingénierie, pas seulement un empilement de bibliothèques »*. Une boucle de rendu, des shaders GLSL et une gestion de cycle de vie écrits à la main répondent directement à cette demande ; un assemblage de composants drei n'y répond pas.
4. **Maîtrise du cycle de vie** : la libération des ressources WebGL (géométries, matériaux, programmes, contexte) est explicite et vérifiable quand on écrit le `dispose()` soi-même. C'est précisément le point où les scènes 3D fuient en mémoire lors des changements de page.

**Et `ogl` (413 kB, 0 dépendance) ?** Techniquement séduisant et sérieusement envisagé. Écarté pour deux raisons : licence `Unlicense` (plus ambiguë en contexte commercial français que MIT) et surtout écosystème de secours plus faible — three.js étant tree-shakable, l'écart de poids réel après compilation est bien moindre que l'écart de poids dépaqueté ne le laisse croire.

**Décision retenue : `three` en imports nommés sélectifs, chargé uniquement via `next/dynamic` sur les pages qui en ont besoin, avec shaders GLSL écrits sur mesure et `dispose()` complet.**

---

## 5. Qualité adaptative : mesure réelle plutôt que base de données GPU

`detect-gpu` (956 kB) identifie le GPU et le compare à une table de scores de référence.

La mission demande explicitement : *« Ne te fie pas uniquement à la puissance théorique du GPU. Les performances réelles doivent guider les ajustements. »*

C'est exactement la limite de cette approche — et l'environnement de test le prouve : **ce conteneur n'a aucun GPU et rend via SwiftShader (logiciel)**. Une détection par table de référence serait ici inexploitable, alors qu'une mesure de temps de trame réel fonctionne partout.

**Décision : système de qualité adaptative maison** (`src/lib/webgl/quality.ts`), fondé sur la moyenne glissante du temps de trame mesuré, avec dégradation progressive et hystérésis anti-oscillation. Coût : quelques dizaines de lignes, zéro dépendance, et un comportement juste y compris sur un rendu logiciel.

---

## 6. Techniques retenues et leur source d'inspiration vérifiée

| Technique retenue pour Stackup | Source consultée (README/licence lus) | Nature de l'emprunt |
|---|---|---|
| Boucle de rendu + `dispose()` explicite | `mrdoob/three.js` (MIT) | API publique documentée |
| Bruit procédural en GLSL (simplex) | `ashima/webgl-noise`, `stegu/webgl-noise` | Algorithme du domaine public, **réécrit** dans nos shaders |
| Effet de Fresnel, matériaux par shader | `patriciogonzalezvivo/lygia` (README lu) | Principe mathématique, implémentation originale |
| Rendu instancié pour les modules | `mrdoob/three.js` — `InstancedMesh` | API publique |
| Révélation typographique par masque | `lukePeavey/SplitType` (MIT), `shshaw/Splitting` (MIT) | Principe de découpe par lignes, **réimplémenté** en ≈ 40 lignes pour préserver l'accessibilité |
| Palette de commandes ⌘K | `pacocoursey/cmdk` (MIT), `jamiebuilds/tinykeys` (MIT) | Modèle d'interaction, composant écrit sur mesure |
| Progression de scroll normalisée | `russellsamora/scrollama` (MIT) | Principe de seuils, implémenté via `IntersectionObserver` natif |
| Qualité adaptative par temps de trame | `mrdoob/stats.js` (MIT) | Principe de mesure, système de paliers original |
| Tokens de design en propriétés CSS | `argyleink/open-props` (MIT) | Méthodologie, échelles propres à Stackup |
| Respect de `prefers-reduced-motion` | `w3c/wcag` (README lu) | Exigence normative |

**Aucun fichier de code n'a été copié depuis ces dépôts.** Les emprunts portent sur des principes techniques et des API publiques documentées. Les algorithmes de bruit GLSL issus des travaux d'Ashima/Stegu sont du domaine public et ont été réécrits.

---

## 7. Ce qui n'a pas pu être vérifié — à ne pas me croire sur parole

**16 dépôts sollicités sans succès** (branche par défaut différente de celle tentée, dépôt déplacé, archivé ou privé) :

`woltapp/blurhash`, `pmndrs/react-postprocessing`, `verekia/majestic-nextjs-threejs-starter`, `ektogamat/r3f-ultimate-boilerplate`, `ektogamat/threejs-andy-boilerplate`, `brunosimon/folio-2019`, `brunosimon/my-room-in-3d`, `brunosimon/threejs-journey`, `lusionltd/lusion-threejs-experiments`, `winkerVSbecks/sketches`, `Experience-Monks/three-glsl-sandbox`, `gsimone/r3f-stage`, `emmelleppi/r3f-animated-mesh`, `nicolaspanel/node-opencv`, `hughsk/glsl-hsv2rgb`, `w3c/csswg-drafts`

**Limites supplémentaires assumées :**

- Les portfolios de creative developers réputés (Lusion, Bruno Simon, Active Theory, Resn…) **n'ont pas pu être consultés** : leurs sites sont hors du proxy et leurs dépôts n'ont pas répondu. Je n'ai donc **aucune base pour prétendre m'en être inspiré** et je ne le fais pas.
- Aucune comparaison visuelle avec des sites concurrents n'a été réalisée, faute d'accès réseau.
- Les 94 dépôts consultés l'ont été par leurs fichiers de présentation et de licence, **pas par une revue de leur code applicatif**.
- Aucun GPU disponible : toutes les mesures WebGL de ce projet sont faites en rendu logiciel et constituent un **plancher pessimiste**.
