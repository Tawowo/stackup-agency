# STACKUP — LABORATOIRE EXPÉRIMENTAL

> Phase 4. Ce document rend compte des expériences réellement exécutées et mesurées, avec leurs résultats — y compris ceux qui ont invalidé l'idée de départ.
>
> **Toutes les mesures ci-dessous ont été produites par exécution dans un navigateur réel.** Les scripts qui les produisent sont dans `scripts/` et peuvent être relancés.

---

## 0. Conditions de mesure — à lire avant les chiffres

| Élément | Réalité du banc |
|---|---|
| GPU | **Aucun.** Chromium rend via SwiftShader, en logiciel pur. |
| Conséquence | Toute mesure WebGL ici est un **plancher très pessimiste**. Une machine avec GPU fera nettement mieux, mais je n'ai aucun moyen de mesurer *combien* mieux depuis ce conteneur. |
| Chromium | `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` (binaire complet — le « headless shell » n'expose pas WebGL) |
| Serveur | `next start` local, build de production |

**Je ne prétends donc pas que la scène tourne à 60 fps sur un téléphone.** Je prétends qu'elle tourne à 40–57 fps *sans aucune accélération matérielle*, ce qui est un indicateur de marge, pas une mesure de terrain.

---

## 1. Banc de mesure du MONOLITHE

Page interne `/lab` (non indexée, hors sitemap). Elle publie ses relevés sur `window.__SU_LAB`, ce qui permet à un script de les lire sans interpréter une capture d'écran.

Script : `scripts/mesure-monolithe.mjs` → `npm run mesure:monolithe`

### 1.1 Ce qui a été vérifié

| Vérification | Méthode | Résultat |
|---|---|---|
| La scène démarre | lecture du diagnostic affiché par la page | `scène active` |
| **Les ressources sont libérées** | 6 allers-retours `/` ↔ `/lab`, soit 7 contextes WebGL créés | `scène active` après le 7e — le plafond du navigateur (~16) n'est jamais atteint |
| `prefers-reduced-motion` coupe la 3D | contexte Playwright `reducedMotion: 'reduce'` | **0 canvas** dans le DOM |
| Aucune erreur console | écoute `console` + `pageerror` | **0** |

Le test de libération est le plus important : une fuite WebGL ne produit aucune erreur, la scène cesse simplement de s'afficher après plusieurs navigations. Sans ce test, le défaut n'apparaîtrait qu'en production.

### 1.2 Mesures de cadence

Relevés sur 6 s de régime établi, 12 échantillons :

| Palier | Instances | Temps de trame moyen | Cadence équivalente |
|---|---|---|---|
| `basse` (choisi par le moniteur) | 70 | **17,6 → 24,8 ms** selon la version du shader | **40 à 57 fps** |

Le moniteur a choisi `basse` parce que le conteneur annonce peu de cœurs — c'est exactement le comportement voulu : **prudent par défaut, il remontera si la machine suit.**

### 1.3 Ce que les mesures ont fait changer

C'est la partie utile. Trois itérations, chacune déclenchée par une capture **regardée**, pas par une intuition :

| Itération | Ce que la capture montrait | Cause trouvée | Correction |
|---|---|---|---|
| 1 | Un objet **brun-orange**, pas navy-or. Des plaques entières saturées. | `pow(tangence, 9)` étalait la rasance en aplat ; ajouter de l'or à un navy presque noir donne du brun. | Exposant porté à 36, matière éclaircie (`#2a4d7a`), plancher d'ombre relevé. |
| 1 | Pile « boueuse », plaques mélangées. | `depthWrite: false` + `DoubleSide` : 70 plaques transparentes se composaient entre elles. | `depthWrite: true`, `FrontSide`. Léger défaut de tri pendant les 1,8 s d'assemblage, largement préférable. |
| 2 | Le navy et les strates lisent bien, mais **l'or a disparu** — la signature du concept était invisible. | Les faces supérieures ne couvrent que quelques pixels à cet angle de caméra ; les éclairer seules ne se voyait pas. | Bande gaussienne qui **traverse** la strate (`mix(couleur, or, bande * 0.52)`) au lieu de la frôler. |
| 3 | La bande dorée lit comme un **aplat de peinture orange**. | Une bande d'une seule teinte n'a pas la désaturation d'une vraie source lumineuse. | Dégradé de température : cœur presque blanc `#FFF7E3`, franges ambrées, plus un halo court. |

**Coût mesuré de ces améliorations :** 17,6 ms → 24,8 ms de temps de trame, soit 57 → 40 fps **en rendu logiciel**. C'est un coût réel, assumé : sans la bande, la scène ne porte plus le concept.

---

## 2. Expériences menées et leurs verdicts

### 2.1 Qualité adaptative : mesure du temps de trame plutôt que détection de GPU

**Hypothèse :** une liste de noms de GPU (`detect-gpu`, 956 ko) ne répond pas à la bonne question.

**Expérience :** implémentation d'un moniteur à moyenne glissante sur 60 trames, avec hystérésis (dégradation au-dessus de 24 ms, remontée seulement sous 13 ms, repos de 1,8 s entre deux décisions).

**Résultat :** ✅ retenu. Coût : 0 ko de dépendance. Le moniteur a correctement choisi `basse` sur ce conteneur sans GPU, et les trames > 200 ms (onglet en arrière-plan) sont exclues de la moyenne, ce qui évite une dégradation parasite au retour d'onglet.

**Limite honnête :** je n'ai pas pu observer une remontée de palier, faute de machine assez rapide dans ce conteneur. Le chemin de dégradation est vérifié, le chemin de remontée ne l'est pas.

### 2.2 Révélation typographique : React ou CSS ?

**Hypothèse de départ :** piloter la révélation par un état React est plus souple.

**Expérience :** mesure de l'élément LCP par `PerformanceObserver`, avec bridage réseau et CPU comparables au profil mobile de Lighthouse.

**Résultat :** ❌ **hypothèse invalidée.** Le H1 n'était même pas candidat au LCP — son texte restait translaté hors de son masque tant que React n'avait pas hydraté. L'élément LCP mesuré était **le bandeau cookies, à 2 296 ms**.

**Correction :** révélation entièrement en CSS, démarrée à la première peinture. Plus aucun état React dans le hero.

**Contre-mesure :** j'ai ensuite désactivé la révélation pour vérifier son coût réel.

| | FCP | LCP | TBT | Performance |
|---|---|---|---|---|
| Avec révélation | 1,2 s | **3,0 s** | 90 ms | 93 |
| Sans révélation | 1,2 s | **3,0 s** | 130 ms | 92 |

**La révélation ne coûte rien en LCP.** Elle est donc conservée — et cette conservation est fondée sur une mesure, pas sur une préférence esthétique.

### 2.3 Bandeau cookies rendu côté serveur

**Constat :** le bandeau ne se montait qu'après hydratation et devenait l'élément LCP à 2 296 ms.

**Expérience :** rendu côté serveur, avec masquage avant première peinture pour les visiteurs ayant déjà répondu (classe posée par un script synchrone dans `<head>`, même motif que `su-js`).

**Résultat :** ✅ LCP de l'élément **2 296 ms → 1 248 ms**, sans scintillement pour les visiteurs consentants.

### 2.4 Scène WebGL sur mobile : fond atténué ou bloc dans le flux ?

**Hypothèse de départ :** placer le monolithe en fond, atténué, derrière le contenu.

**Expérience :** capture à 390 px, regardée.

**Résultat :** ❌ **invalidé deux fois.**
1. À pleine opacité, il passait derrière le second appel à l'action et la mention tarifaire — texte illisible.
2. Atténué à 0,6 sous un masque, il ressemblait à **une bavure grise**, pas à un objet voulu.

**Correction :** sur mobile, le monolithe prend sa propre bande de 300 px **dans le flux**, à pleine intensité, entre la mention tarifaire et les chiffres clés. Sur grand écran, il reste calé à droite derrière le contenu.

### 2.5 Schémas de service en SVG plutôt qu'en WebGL

**Hypothèse :** six scènes 3D sur une même page coûteraient six contextes GL pour un gain nul.

**Résultat :** ✅ SVG retenu. Chaque schéma pèse quelques centaines d'octets, reste net à toute résolution, et s'anime sans JavaScript. Chaque composant observe sa propre visibilité, donc aucun des six ne s'anime hors écran.

**Correction après capture :** la première version lisait comme « une petite tache bleue ». Plaques élargies de 70 % à 87 % de la largeur disponible, arête dorée de 1,4 à 2,2 px, ombre portée pour que la pile soit posée et non flottante.

### 2.6 Détection de débordement horizontal : le critère lui-même était faux

**Constat :** `documentElement.scrollWidth > innerWidth` signalait des débordements sur `/`.

**Expérience :** mesure répétée sur 8 largeurs, plusieurs exécutions.

**Résultat :** ❌ **critère invalidé.** Le jeu de largeurs « fautives » changeait à chaque exécution, et le ratio était systématiquement 1,5× exactement. Cause : le bandeau défilant (~4 000 px, clippé par deux conteneurs) remonte par intermittence dans `scrollWidth` sous `overflow-x: clip`. Sur ~40 mesures, **le décalage horizontal réel est nul dans 100 % des cas.**

**Correction :** le contrôle qualité porte désormais sur deux invariants déterministes — la page ne défile pas latéralement, et aucun élément **non clippé par un ancêtre** ne dépasse la fenêtre. `contain: paint` a été ajouté au bandeau (gain de compositing réel, mais il ne supprime pas l'artefact de mesure — c'est dit dans le code plutôt que suggéré).

### 2.7 Classement automatique des contextes clairs et sombres

**Hypothèse :** on peut deviner, par le voisinage d'une ligne de JSX, si elle s'affiche sur fond clair ou sombre.

**Résultat :** ❌ **invalidé trois fois de suite.** L'heuristique a assombri du texte déjà lisible sur fond sombre (128 occurrences à rétablir), puis posé une teinte « fond sombre » sur 28 éléments en fond clair.

**Correction :** abandon de l'heuristique au profit d'un scan piloté par axe-core (`scripts/scan-contraste.mjs`), qui mesure les couleurs **réellement calculées**, fond composite compris. Chaque correction vise ensuite un nœud que le scan a nommé.

**C'est l'expérience la plus instructive du lot** : trois tentatives de raccourci ont coûté plus de temps que la méthode rigoureuse, et introduisaient des régressions invisibles.

---

## 3. Ce qui n'a pas été fait, et pourquoi

| Expérience envisagée | Statut | Raison |
|---|---|---|
| Post-traitement (bloom, DOF) | **non tenté** | Sans GPU, toute mesure serait ininterprétable. Et sur fond ivoire le bloom lave les contrastes au lieu de les renforcer. |
| Transitions de page animées | **non tenté** | `next/navigation` en App Router ne fournit pas de point d'accroche propre sans détourner le routeur. Le gain ne justifie pas la fragilité. |
| Curseur personnalisé | **écarté par la direction artistique** | Règle non négociable n° 7 : aucun curseur personnalisé sur tactile, et un curseur desktop seul crée une incohérence entre supports. |
| Scroll lissé | **écarté** | Règle non négociable n° 5 : le défilement natif n'est jamais détourné. |
| Mesure sur appareil réel | **impossible ici** | Le conteneur n'a ni GPU ni accès au site de production. |

---

## 4. Reproduire ces mesures

```bash
npm run build && npx next start -p 3100     # dans un terminal

npm run mesure:monolithe    # banc WebGL : cadence, libération, mouvement réduit
npm run verif:calculs       # 19 assertions sur les calculs métier
node scripts/qa-complet.mjs # 23 vérifications de comportement
node scripts/scan-contraste.mjs            # contraste, 1440 px
LARGEUR=390 node scripts/scan-contraste.mjs # contraste, 390 px
```

Les sorties sont écrites dans `docs/lab/`, `docs/qa/` et `docs/captures/`.
