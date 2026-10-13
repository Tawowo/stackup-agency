# STACKUP — DIRECTION ARTISTIQUE

> Phase 3. Ce document fixe le concept, le système et les règles. Il est le contrat que l'implémentation doit respecter.

---

## 1. Le concept : LA STRATE

### Le point de départ est le nom

**Stack up** — empiler, superposer, construire par couches.

C'est une chance que peu de marques ont : le nom décrit déjà le geste métier. Une agence qui fait du sur-mesure ne vend pas un produit fini, elle **assemble des couches** — une interface par-dessus une logique métier, par-dessus des données, par-dessus une infrastructure. C'est vrai d'un site vitrine comme d'un SaaS.

**Le motif fondateur de toute l'identité est donc la strate : une plaque, une couche, un module.**

Ce choix n'est pas décoratif, il est argumentatif :

| Ce que montre l'image | Ce que comprend le dirigeant de TPE |
|---|---|
| Des strates qui s'empilent | On construit votre solution couche par couche |
| Les mêmes strates, réorganisées | Le même savoir-faire sert un site ou un logiciel |
| Des strates qui se connectent | Vos outils communiquent au lieu de s'ignorer |
| Une strate qu'on retire sans effondrement | Votre solution évolue sans être refaite |

**Un visiteur qui n'a rien compris à la technique doit quand même repartir avec cette image.** C'est le test de validité du concept.

### Pourquoi ce n'est pas un énième site d'agence sombre

Le réflexe du « site futuriste » est connu : fond noir, néons violets, cartes en verre, lueurs. Cette esthétique est devenue un template.

**Stackup prend le chemin inverse : la lumière du jour.**

Fond ivoire. Matière navy dense. Et une **lumière rasante dorée** qui balaie les strates — la lumière d'un atelier en fin de journée sur de la matière travaillée, pas celle d'un néon de salle serveur.

C'est le pari de différenciation principal : une expérience WebGL ambitieuse **dans la clarté**, là où 95 % des démonstrations techniques se réfugient dans le noir parce que le noir pardonne tout. Réussir une scène 3D sur fond clair est plus difficile — les défauts de rendu, d'antialiasing et de contraste ne peuvent pas s'y cacher. C'est précisément ce qui rend la démonstration crédible.

---

## 2. Système graphique

### 2.1 Couleurs

| Rôle | Valeur | Usage |
|---|---|---|
| `--su-ivoire` | `#FFFDF9` | Fond principal. La lumière du jour. |
| `--su-navy` | `#1E3A5F` | La matière. Texte principal, strates. |
| `--su-encre` | `#0C1626` | Profondeur maximale, sections nocturnes. |
| `--su-or` | `#F59E0B` | **La lumière rasante.** Accent unique de valeur. |
| `--su-or-clair` | `#FBBF24` | Pointe de lumière, arêtes éclairées. |
| `--su-electrique` | `#2D7DD2` | Secondaire, signaux et liens. |
| `--su-ardoise` | `#64748B` | Texte secondaire. |

**Règle d'or stricte :** l'or ne sert qu'à trois choses — l'action principale, la lumière qui révèle, un mot-clé par section au maximum. Dès que l'or devient décoratif, il cesse d'être un signal.

### 2.2 Typographie

Trois familles sont déjà chargées (Inter, Space Grotesk, JetBrains Mono). **Aucune n'est ajoutée** : l'audit a montré qu'elles pèsent déjà sur le LCP.

| Niveau | Police | Traitement |
|---|---|---|
| Display | Space Grotesk 700 | `clamp(2.75rem, 7vw, 5.5rem)`, `letter-spacing: -0.03em` |
| H2 | Space Grotesk 700 | `clamp(1.75rem, 4vw, 3rem)` |
| H3 | Inter 600 | 1.25–1.4rem |
| Corps | Inter 400 | 1rem / interligne 1.65 |
| Mono-label | JetBrains Mono 600 | 0.78rem, `tracking: 0.18em`, majuscules |

### 2.3 Profondeur — le système de strates

C'est la grammaire spatiale du site. Cinq plans, et rien entre :

```
z-0   SUBSTRAT   fond, lumière ambiante
z-1   STRATE     la matière (cartes, blocs, modules 3D)
z-2   ARÊTE      bordures éclairées, séparations
z-3   SIGNAL     texte, données, contenu lisible
z-4   ACTION     boutons, contrôles, curseur
```

Ombres : trois niveaux seulement, toutes multicouches et teintées navy (jamais de noir pur, qui « salit » un fond ivoire).

### 2.4 Mouvement — « l'assemblage »

**Le principe directeur : chez Stackup, les éléments ne surgissent pas, ils se posent.**

Un élément qui apparaît vient de *derrière et légèrement au-dessus*, puis se cale — comme une plaque qu'on dépose sur une pile. Le mouvement se termine par un très léger arrêt net, pas par un rebond élastique.

La courbe signature :

```css
--su-pose: cubic-bezier(0.16, 0.84, 0.28, 1);   /* décélération franche */
```

Quatre durées, pas une de plus :

```css
--su-t-reflexe: 140ms;   /* retour immédiat : survol, focus */
--su-t-geste:   320ms;   /* changement d'état : onglet, accordéon */
--su-t-pose:    620ms;   /* entrée d'un élément */
--su-t-scene:  1100ms;   /* transformation d'une scène entière */
```

Décalage entre éléments d'un groupe : **70 ms**, jamais plus de 6 éléments décalés (au-delà, l'attente devient perceptible).

### 2.5 La lumière rasante

Signature visuelle transversale : un balayage lumineux doré traverse les strates selon un angle constant de **-18°** sur tout le site. Dans la scène 3D, c'est une vraie lumière directionnelle. Dans le DOM, c'est un dégradé animé sur les arêtes. Le même angle partout crée l'impression d'un espace unique.

---

## 3. Les pièces maîtresses

### 3.1 LE MONOLITHE — scène WebGL du hero

Une structure monumentale composée de strates instanciées qui s'assemblent au chargement, respirent au repos, réagissent au pointeur par un déplacement de parallaxe et se désassemblent au scroll pour libérer la section suivante.

- Rendu : `three` en imports sélectifs, `InstancedMesh`, shader GLSL sur mesure (lumière rasante + Fresnel + grain procédural).
- Le H1, le sous-titre et les CTA restent **en DOM**, devant la scène. Aucun texte dans le canvas (SEO + accessibilité).
- Trois paliers de qualité pilotés par le temps de trame mesuré.
- **Repli obligatoire sans WebGL** : composition CSS de strates statiques, visuellement cohérente.

### 3.2 L'ATELIER DES STRATES — services

Les mêmes strates, recomposées pour chaque service. Un site vitrine est une pile courte et large ; un SaaS est une pile profonde avec des connexions latérales ; une automatisation est un flux qui traverse les strates. **Une seule métaphore, six démonstrations différentes.**

### 3.3 LE LABORATOIRE — démonstration logicielle réelle

La pièce qui prouve que Stackup fait du logiciel, pas seulement des sites : une **interface métier réellement fonctionnelle**, manipulable, avec un état cohérent, des filtres qui filtrent, des tris qui trient, des calculs justes.

Données de démonstration **explicitement étiquetées comme telles**. Aucune fausse connexion à une API, aucun faux résultat.

### 3.4 LE CONFIGURATEUR — pont commercial

Un parcours qui construit progressivement le besoin du prospect et produit une synthèse réellement utile, transmise au devis. **Aucun prix ferme inventé** : seules les fourchettes publiques de `config/site.ts` sont affichées, avec la mention « à partir de ».

### 3.5 LA PALETTE — navigation ⌘K

Accès clavier à toute la navigation. Écrite sur mesure, accessible, 0 dépendance.

---

## 4. Règles non négociables

Ces règles priment sur toute considération esthétique :

1. **Le contenu reste dans le DOM.** Aucun texte indispensable dans un canvas.
2. **Les 435 URLs sont préservées.** Aucune suppression de page.
3. **`prefers-reduced-motion` coupe tout mouvement non essentiel**, y compris la scène 3D qui bascule sur une image fixe.
4. **Sans WebGL, le site reste complet.** La 3D est un enrichissement, jamais un prérequis.
5. **Le scroll natif n'est jamais détourné.** Pas de scroll-jacking, pas de scroll lissé imposé.
6. **CLS reste à 0.** Toute scène a des dimensions réservées.
7. **Aucun curseur personnalisé sur tactile.**
8. **Aucune donnée inventée.** Pas de faux client, pas de faux chiffre, pas de fausse performance.
9. **Toute scène libère ses ressources** au démontage (`dispose()` vérifiable).
10. **La qualité se dégrade avant que l'expérience ne casse.**

---

## 5. Critère d'acceptation du concept

Le concept est réussi si un visiteur qui coupe JavaScript, ou qui active la réduction d'animations, ou qui arrive sur un téléphone d'entrée de gamme, **comprend toujours que Stackup assemble des systèmes par couches** — parce que la métaphore vit aussi dans la mise en page, pas seulement dans le WebGL.
