# STACKUP — RAPPORT FINAL

> Phase 8. Ce qui a été livré, ce qui a été mesuré, ce qui ne marche pas, et ce qui reste à faire.
>
> **Règle appliquée à tout ce document : aucune affirmation qui n'ait été vérifiée par exécution.** Quand une mesure manque, c'est écrit.

---

## 1. En une page

| | Avant | Après |
|---|---|---|
| Performance accueil (mobile simulé) | **78** | **92** |
| TBT accueil | **570 ms** | **150 ms** |
| CLS | 0 | **0** sur les 6 pages mesurées |
| Accessibilité | non mesurée | **100 / 100** sur les 6 pages mesurées |
| Bonnes pratiques | non mesurée | **100 / 100** |
| SEO | non mesuré | **100 / 100** |
| Violations de contraste | **44 sur la seule page d'accueil** | **0** sur 20 pages, en 390 px et en 1 440 px |
| Hero | éditeur de code animé (faux code qui se tape) | scène WebGL exécutée par le navigateur du visiteur |
| Démonstration logicielle | aucune | interface de gestion réellement fonctionnelle |
| Pages générées | 435 (mesuré à l'audit) | **439** (mesuré après travaux) |
| Build | 0 erreur, 0 avertissement | 0 erreur, 0 avertissement |

---

## 2. Ce qui a été livré

### 2.1 LE MONOLITHE — scène WebGL du hero

Une structure de strates instanciées qui s'assemblent au chargement, respirent au repos, réagissent au pointeur et se désassemblent au défilement, traversées par une bande de lumière dorée qui remonte la pile.

- `three@0.186.1` en imports sélectifs (13 classes), **0 dépendance transitive**.
- Shaders GLSL écrits à la main. L'angle de lumière **-18°** est partagé entre le DOM et le shader via un uniforme — la cohérence est vérifiable, pas approximative.
- Qualité adaptative fondée sur le **temps de trame mesuré**, pas sur une liste de noms de GPU.
- `three` chargé par `import()` **dans l'effet** : il n'entre jamais dans le bundle initial.

**Vérifié par exécution :** 0 erreur console · scène toujours active après **7 montages successifs** (preuve que le contexte WebGL est libéré) · **0 canvas** sous `prefers-reduced-motion` · 40 à 57 fps **en rendu logiciel sans GPU**.

### 2.2 LE LABORATOIRE — `/laboratoire` et sur l'accueil

Une interface de gestion d'interventions **réellement fonctionnelle** : filtres de statut cumulables, recherche insensible aux accents portant aussi sur les lignes de prestation, cinq tris, dépliage du détail, avancement du cycle de vie, synthèse recalculée sur l'ensemble filtré.

- Montants en **centimes entiers** : aucun total faux d'un centime.
- **19 assertions** vérifient les calculs (`npm run verif:calculs`), dont : HT + TVA = TTC sur les 12 jeux, engagé + en attente = total, aucun tri ne perd ni ne duplique d'élément, pas de division par zéro sur un ensemble vide.
- Données fictives, bandeau d'avertissement **non dissimulable**, aucune requête réseau, aucun client réel.

Le composant réel est monté sur la page d'accueil, pas une capture. Il est chargé à l'approche de la section : **l'accueil reste à 128 ko de First Load** malgré l'ajout d'une application complète.

### 2.3 LE CONFIGURATEUR — `/configurateur`

Quatre étapes, un point de départ chiffré, une synthèse transmise au formulaire de devis.

- **Aucun prix inventé.** Un test vérifie que tout montant affiché existe dans `SITE.pricing`, et que les options sans tarif public (intégrations, reprise de données, formation, multilingue) restent « sur devis » **sans contribuer au total**.
- La synthèse **n'écrase jamais** une saisie en cours dans le formulaire de devis, et la clé de transmission est consommée après lecture.
- Toujours présenté comme « à partir de », jamais comme un devis.

### 2.4 LA PALETTE — ⌘K / Ctrl+K

Recherche par sous-séquence (« sve » trouve « Site VitrinE ») sur les pages, services, solutions, 79 métiers et 30 villes **réels** — chaque entrée pointe vers une URL qui existe. Motif ARIA combobox, focus restitué à la fermeture, défilement d'arrière-plan verrouillé sans décalage. 0 dépendance. Déclencheur visible dans la barre de navigation, affichant le raccourci de la plateforme.

### 2.5 L'ATELIER DES STRATES — `/services`

L'audit relevait le pire défaut du site : une carte par offre, titre + prix + deux boutons, **et un grand vide au centre**. Chaque offre a désormais son schéma de structure : un site vitrine est une pile courte et large, un outil de gestion une pile profonde à liaisons latérales, une boutique un flux qui traverse les couches. Une métaphore, six morphologies.

En SVG et non en WebGL : six scènes 3D sur une page coûteraient six contextes GL pour un gain nul.

---

## 3. Bugs trouvés en route — et ce qu'ils disent

Ces défauts n'ont pas été cherchés : ils sont apparus parce que les mesures les ont rendus visibles.

### 3.1 La page `/services` affichait des listes vides

`.check-item` avait `opacity: 0` au repos et n'était révélé que sous un parent portant `.checks-visible` — classe posée par deux composants seulement. **Les six éléments inclus de chacune des six offres étaient invisibles sur la page qui les vend.**

Aucune erreur, aucun avertissement : la page se contentait d'être vide. C'est le type de bug qu'aucun outil ne signale et qu'aucune relecture de code ne trouve — il faut regarder la page.

**Règle qui en découle, appliquée partout :** l'état masqué n'est jamais l'état de repos. Les 23 sélecteurs du site en `opacity: 0` ont été audités un par un.

### 3.2 La barre de navigation n'avait plus de fond, hors accueil

`bg-[#FFFDF9]/92` ne génère **aucune règle CSS** : Tailwind ne produit de déclaration que pour les paliers de son échelle d'opacité. Vérifié dans le CSS produit. Régression que j'avais moi-même introduite.

Balayage complet : **124 occurrences** d'opacités hors échelle (`/8`, `/12`, `/14`, `/38`, `/48`…), dont les pastilles de statut du laboratoire, qui n'avaient aucun fond.

### 3.3 La page 404 avait un bouton illisible

Elle utilisait `.glass-panel`, qui est le verre du thème **clair**, avec du texte blanc : **1,35:1**. Le bouton « Nous contacter » était pratiquement invisible.

### 3.4 L'élément LCP de l'accueil était le bandeau cookies

Mesuré par `PerformanceObserver` : le bandeau ne se montait qu'après hydratation et devenait l'élément LCP à **2 296 ms**. Le H1 n'était même pas candidat — son texte restait translaté hors de son masque tant que React n'avait pas hydraté.

Deux corrections : bandeau rendu côté serveur avec masquage avant peinture pour les visiteurs déjà consentants ; révélation typographique entièrement en CSS. Élément LCP : **2 296 → 1 248 ms**.

### 3.5 Le menu mobile fermé restait accessible au clavier

`aria-hidden` masque aux lecteurs d'écran mais **ne retire pas les liens de l'ordre de tabulation**. `inert` fait les deux.

### 3.6 Le repère `<main>` manquait à 29 gabarits

Ces 29 gabarits génèrent l'essentiel des pages du site. Corrigé une fois dans le layout, avec conversion des 13 `<main>` de page en `<div>` pour n'avoir jamais deux repères imbriqués.

---

## 4. Ce que je me suis trompé à faire

Cette section existe parce qu'elle est plus instructive que la liste des réussites.

### 4.1 Trois tentatives de classement automatique clair/sombre, trois échecs

J'ai essayé de deviner, par le voisinage d'une ligne de JSX, si elle s'affichait sur fond clair ou sombre. L'heuristique a :
1. assombri 128 occurrences de texte **déjà lisibles** sur fond sombre ;
2. posé une teinte « fond sombre » sur 28 éléments en fond **clair** ;
3. rendu nécessaire un retour en arrière complet de 223 occurrences.

**Ces raccourcis ont coûté plus de temps que la méthode rigoureuse** et introduisaient des régressions invisibles. La solution retenue — un scan piloté par axe-core, qui mesure les couleurs réellement calculées — a traité les 44 violations initiales sans jamais se tromper.

### 4.2 Un critère de test faux, pris pour un bug du site

`scrollWidth > innerWidth` signalait des débordements. Sur ~40 mesures, le jeu de largeurs « fautives » changeait à chaque exécution et le ratio valait 1,5× exactement. Cause : le bandeau défilant (~4 000 px, clippé) remonte par intermittence dans `scrollWidth` sous `overflow-x: clip`. **Le décalage horizontal réel est nul dans 100 % des cas.**

J'ai failli « corriger » un site qui n'avait rien. Le test porte désormais sur deux invariants déterministes.

### 4.3 Une hypothèse de l'audit invalidée par les mesures

L'audit concluait que la feuille de style de 174 ko causait une tâche longue de 452 ms et en faisait le premier goulot de performance. Après travaux, **le CSS a grossi** (183 301 octets) et **la tâche longue a disparu**, le TBT passant de 570 à 150 ms.

La taille du fichier n'était donc pas la cause directe. Je ne sais pas précisément ce qui l'était — la suppression de 13 composants morts et de deux moteurs d'animation a probablement plus compté. **Je préfère le dire que de m'attribuer un raisonnement que les mesures ne confirment pas.**

---

## 5. Ce qui ne va pas, ou pas encore

| Point | État mesuré | Ce qu'il faudrait |
|---|---|---|
| **LCP à 3,0 s** | Le plancher n'a pas bougé (3,1 s avant). | Trois familles de polices sur toutes les pages. Les réduire à deux, ou sous-ensembler JetBrains Mono qui ne sert qu'à de petits libellés. Non tenté : cela touche l'identité typographique, qui est un arbitrage de marque, pas un arbitrage technique. |
| **Le CSS a grossi de 5 %** | 174 697 → 183 301 octets. | L'objectif d'allègement n'est pas atteint. `stackup.css` (8 `@keyframes`) cohabite avec `globals.css` (88). La migration est un chantier à part entière. |
| **Remontée de palier de qualité non observée** | Le chemin de dégradation est vérifié ; celui de remontée ne l'est pas. | Une machine avec GPU. Impossible dans ce conteneur. |
| **Aucune mesure de terrain** | Tous les chiffres sont de laboratoire, sans GPU, sur `next start` local. | Des données réelles au 75e percentile après mise en ligne. |
| **La scène n'a été vue que sur un rendu logiciel** | 40–57 fps sans accélération matérielle. | Je ne peux pas affirmer à quoi elle ressemble sur un vrai GPU — seulement qu'elle a de la marge. |
| **Transitions de page** | Non implémentées. | `next/navigation` en App Router n'offre pas de point d'accroche propre sans détourner le routeur. |
| **`/lab`** | Page technique interne, en `noindex`, hors sitemap. | À supprimer avant mise en ligne si elle n'est pas souhaitée, ou à conserver comme banc de mesure. |

---

## 6. Ce qui a été préservé

Vérifié, pas supposé :

- **Aucun gabarit de route n'a été supprimé** — vérifié par `diff` de la liste des `page.tsx` entre le commit de référence `84d2425` et l'état actuel. Trois gabarits ont été ajoutés : `/lab`, `/laboratoire`, `/configurateur`.
- Le build génère **439** pages contre 435 à l'audit. L'écart est de 4 alors que j'ai ajouté 3 gabarits ; **je n'ai pas identifié la quatrième** et je ne l'invente pas. Ce qui est établi : aucune route n'a disparu, et le sitemap contient 423 URL dont `/laboratoire` et `/configurateur`, sans `/lab` (qui est en `noindex`).
- `src/config/site.ts` reste la **source unique des prix**. Un test l'impose au configurateur.
- Les 300 articles de blog, le système de publication programmée, les schémas JSON-LD, le sitemap segmenté : intacts.
- **Honnêteté commerciale** : aucune fausse référence client, aucun faux témoignage, aucune statistique inventée. Les données du laboratoire portent un bandeau « Démonstration » non dissimulable.
- Aucun secret exposé, aucune sécurité désactivée, aucune dépense engagée.

---

## 7. Reproduire toutes les mesures

```bash
npm run build && npx next start -p 3100

npm run verif:calculs                        # 19 assertions métier
node scripts/qa-complet.mjs                  # 23 vérifications de comportement
npm run mesure:monolithe                     # banc WebGL
node scripts/scan-contraste.mjs              # contraste, 1440 px
LARGEUR=390 node scripts/scan-contraste.mjs  # contraste, 390 px
node scripts/capture-site.mjs                # captures mobile + desktop
```

Sorties : `docs/lab/`, `docs/qa/`, `docs/captures/`.

---

## 8. Documents de la mission

| Phase | Document |
|---|---|
| 1 | `docs/STACKUP_BASELINE_AUDIT.md` — audit et référence mesurée |
| 2 | `docs/STACKUP_OPEN_SOURCE_RESEARCH.md` — recherche sur dépôts réels, licences |
| 3 | `docs/STACKUP_CREATIVE_DIRECTION.md` — concept « LA STRATE », système, règles |
| 4 | `docs/STACKUP_EXPERIMENTAL_LAB.md` — expériences menées et verdicts |
| 4 | `docs/STACKUP_TECHNIQUE_INVENTORY.md` — ce que le site utilise réellement |
| 8 | ce document |
