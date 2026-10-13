# Rapport de refonte — Stackup Agency

Rapport demandé par la section 17.7 du dossier. Il est écrit pour être
utilisable, donc il nomme d'abord ce qui n'est pas fait.

Branche : `claude/brave-maxwell-i7g77j` · Date : 13 octobre 2026

---

## 1. Ce qui n'est pas fait

Le dossier découpe le chantier en huit phases (§17.3). **Les phases 0, 1 et 2
sont terminées. La phase 3 est entamée. Les phases 4 à 7 ne sont pas
commencées.** Le détail :

| Phase | État | Ce qui manque |
| --- | --- | --- |
| 0. Socle | **Terminée** | — |
| 1. Scène et bande | **Terminée** | — |
| 2. Accueil, première moitié | **Terminée** | — |
| 3. Accueil, seconde moitié | **Partielle** | PELLICULE au sens plein (feuilletage des captures au drag, rail de jalons cliquable, transition par élément partagé) ; Salle des machines remise en scène ; Juste Prix ; DIX JOURS ; Atelier ; Départ ; footer |
| 4. Pages commerciales | **Non commencée** | Les six gabarits de service, le gabarit projet, le curseur des tarifs, la fusion configurateur + devis, le contact, la TRAVERSÉE (View Transitions) |
| 5. Pages programmatiques | **Non commencée** | Toute la matrice 13.11 : villes, départements, métiers, services locaux, solutions, hubs, à propos, FAQ, blog, outils, comparatif, légales, 404 |
| 6. Finition et mesure | **Non commencée** | Grain et post-traitement, calque `G`, raccourcis, curseur, haptique, gyroscope, Lighthouse CI, vidéos |
| 7. Options | **Non commencée** | Rapier, portails drei, PDF de devis, export du cahier des charges, visualisations d'articles |

Ce qui a été fait en phase 3 est le **tampon « Démonstration »** sur les sept
fiches de la salle de projection, parce que c'est une règle bloquante (§15.3)
et non une amélioration : laisser un visiteur cliquer sur « Visiter la démo »
en croyant voir un client réel est le problème que la règle vise. Le reste de
la phase 3 attend.

**Deux dettes antérieures restent ouvertes**, signalées et non traitées :

- `public/` contient 1,6 Mo de doublons à double extension
  (`hero-accueil.mp4.mp4`, `portrait-fondateur.webp.png`,
  `hero-monument-s.webp.png`). Supprimables, mais c'est une décision qui vous
  revient : je ne sais pas lequel des deux fichiers fait foi.
- `seo-lint` signale deux pages à liens internes insuffisants
  (`/laboratoire`, 2 liens ; `/configurateur`, 0). Non corrigé **exprès** :
  la phase 4 refond ce tunnel, et ajouter des liens maintenant serait du
  remplissage à défaire.

---

## 2. Les huit critères d'acceptation (§17.7)

Le dossier dit : « Si l'un de ces huit points manque, le travail n'est pas
terminé. » Il manque. Voici où en est chacun.

| # | Critère | État |
| --- | --- | --- |
| 1 | Composition remarquable même sans animation | **Tenu** sur les moments livrés. Les apparitions sont des découpes, et sous `prefers-reduced-motion` elles sont retirées, pas remplacées : le contenu est entier. |
| 2 | Logo exact, et c'est lui qui devient l'objet 3D | **Tenu.** Superposition mesurée à 1,89 % (1440) et 2,00 % (390), sous le seuil de 2 % de la règle 4.2. |
| 3 | Neuf moments, neuf mécanismes distincts | **Non tenu** — quatre moments livrés sur neuf. Les quatre ont bien des mécanismes différents (bascule de projection, coupe en lamelles, morph de 120 plaques, traversée d'accent). |
| 4 | Toutes les pages de la matrice transformées | **Non tenu.** C'est la phase 5. |
| 5 | Mobile avec ses propres compositions | **Tenu sur les moments livrés** : hero en portrait, strates en onglets balayables, offres en balayage. Chaque moment a sa capture 390. |
| 6 | Parcours configurateur → devis → e-mail sans ressaisie | **Non vérifié.** C'est la phase 4. Le parcours existant fonctionne, il n'a pas été refondu. |
| 7 | Budgets tenus, axe et contraste sur 31 routes | **Tenu pour l'accessibilité** : axe 0 violation, contraste 0 nœud en échec, défilement horizontal 0 px à 390 et 1440. **Non vérifié pour les budgets de performance** : pas de Lighthouse CI (phase 6). |
| 8 | Le rapport nomme ce qui n'a pas été fait | Ce document. |

---

## 3. Les règles bloquantes

Vous aviez désigné trois sections comme bloquantes. Leur état, mesuré :

### §4.2 — Le logo

`LogoMarque` et le PNG d'origine sont la seule source ; `logo.svg` et
`logo-white.svg` sont supprimés. Le ruban 3D est tracé depuis le logo et, au
repos, se superpose au PNG à **1,89 %** (1440) et **2,00 %** (390) d'écart.

Trois choses rendent ce chiffre défendable, et elles ont toutes commencé par
une mesure fausse :

1. Le dossier (§4.1) décrit `logo_Stackup-Agency_seul.png` comme « détouré,
   RGBA ». Vérifié dans le navigateur : il n'a **aucun** pixel transparent et
   81,8 % de blanc opaque. Binariser sur l'alpha allumait donc toute l'image.
2. La capture incluait la barre de navigation et le bandeau cookies. Masquer
   une *liste* de sélecteurs a raté le bouton hamburger mobile (84 % à
   390 px) ; la version retenue masque tout sauf le canvas.
3. Le seuil de binarisation à 232 incluait le halo d'anticrénelage. Il est
   maintenant **dérivé** des luminances réelles (navy 39,7 · ambre 156,4 ·
   papier 255 → 176), pas choisi.

L'écart se décompose en 0,38 % / 0,47 % d'erreur de forme ; le reste est du
bord.

### §15.3 — Honnêteté

- **Conditions commerciales : une seule version.** Les pages affichaient
  30/70 quand les CGV disent 40/60 ; 2 ou 3 révisions ; 30, 60 ou 90 jours de
  support. Tout vient de `site.ts`, qui recopie les CGV.
- **Parrainage.** Trois versions sur la seule page qui en parle, dont
  « gagnez 200 € pour chaque client » dans l'image Open Graph — celle qui
  part dans les messageries. L'article 13 des CGV fait foi, et il décrit un
  *choix* ; ma première correction l'avait aplati en une branche, recréant la
  divergence qu'elle devait supprimer.
- **Six témoignages inventés supprimés** de `services-locaux` : « 30 % de
  réservations en plus », « 40 % de mes nouveaux clients », « 2 h par jour
  gagnées », attribués à des « Chef propriétaire » et « Dirigeant PME » sans
  nom. Remplacés par les quatre engagements des CGV, qui sont opposables.
- **Hébergement décrit tel qu'il est.** « Hébergement en France » devient
  « en Europe » partout : les mentions légales nomment Vercel Inc., société
  américaine, avec des régions européennes. L'hébergement français reste
  possible sur demande, et c'est écrit ainsi.
- **Démonstrations annoncées** sur chaque fiche de l'accueil.

### §17.6 — Les dix-huit erreurs

Les deux qui étaient encore violées sont corrigées :

- **Règle 2** (pas de fondu + translation par défaut) : le `grep` exigé par
  le dossier revient maintenant vide hors blog et FAQ. Une trentaine
  d'occurrences remplacées par la découpe.
- **Règle 17** (pas d'état masqué par défaut) : ces mêmes blocs partaient
  invisibles et n'apparaissaient que par JavaScript. `--su-pose` vaut
  désormais 1 par défaut.

---

## 4. Ce que les captures ont trouvé et que la relecture n'aurait pas trouvé

C'est la partie la plus utile du rapport, parce qu'elle dit ce que vaut la
boucle que vous avez imposée (implémenter → capturer → lire → corriger).
**Aucun de ces défauts n'aurait été vu autrement, et tous passaient le
build.**

1. **La scène débordait sur presque tout le site.** L'état initial du store
   était `'logo'` : toute page qui ne déclare rien héritait du ruban centré à
   l'échelle 1. Sur `/services-locaux/…`, il barrait le texte d'une section
   entière. Un état `'absent'` est devenu le défaut.
2. **Les cinq lamelles dessinaient chacune le ruban entier**, superposées.
   `gl.localClippingEnabled` était activé après la compilation des programmes
   GLSL, que three.js ne recompile pas sur ce drapeau.
3. **Le bouton de la maquette sortait sans son fond ambré** : le CSS inventait
   `--su-ambre`, `--su-papier` et `--su-ambre-encre`, qui n'existent pas. Les
   variables CSS échouent en silence.
4. **En 390 px, le titre des strates sortait de l'écran** avant que la
   maquette n'y entre : le bloc collant dépassait 100 vh.
5. **La pile se lisait comme trois bandes, pas cinq.**
6. **Le titre se copiait « Votresiteen 10 jours ouvrés »** : `display: flex` +
   `gap` n'est pas un caractère.
7. **Les plaques ambrées formaient deux rayures verticales** : une sur six
   dans une grille de douze colonnes. Sept est premier avec 12, 10, 8 et 3.

---

## 5. Trois instruments de mesure ont menti avant d'être corrigés

Noté parce que c'est la leçon la plus transférable du chantier : **un outil
de mesure se valide avant de lui faire confiance.**

- **Comparer deux captures, avec et sans le canvas.** Verdicts
  contradictoires entre 1440 et 390 pour la même route. Ce n'était pas la
  scène qui changeait entre les deux prises, mais la page — images différées,
  révélations au défilement.
- **Masquer tout sauf le canvas.** Image vide même sur l'accueil, où le ruban
  est pourtant là : la scène se place d'après une boîte d'ancrage HTML, et
  masquer cette boîte la réduit à zéro. **La mesure détruisait son objet.**
- **La mesure de superposition du logo**, trois fois fausse (voir §3).

Ce qui les remplace : `Temoin`, qui lit le compteur de triangles du renderer,
et `scripts/scene-portee.mjs`, qui balaie les routes. Le compteur ne ment pas
— il dit ce qui a été soumis au GPU. Résultat : 20 routes × 2 largeurs,
0 fuite ; l'accueil dessine (96 triangles à 1440, 48 à 390, la différence
étant la passe d'ombres absente en mobile).

---

## 6. État des vérifications

Toutes relancées au dernier commit :

```
build          vert
lint           0 avertissement
QA complet     25/25
axe-core       0 violation (dont 0 grave)
contraste      0 nœud en échec sur 31 routes
défilement h.  0 px à 1440 et 390
portée scène   0 fuite sur 20 routes × 2 largeurs
seo-lint       3 échecs sur 100 pages (2 assumés, voir §1)
superposition  1,89 % / 2,00 % (seuil 2 %)
```

Captures lues, et non seulement prises :
`docs/captures/p2-honnetete/`, `p2c-strates/`, `p2d-offre/`, `p2e-decoupe/`,
`p3-salle/`.

---

## 7. Ce que je recommande pour la suite

Dans cet ordre, et pour une raison à chaque fois :

1. **Phase 4 avant le reste de la phase 3.** Les pages commerciales portent
   le chiffre d'affaires ; les moments 05 à 09 de l'accueil portent le style.
   Le dossier met les deux en « indispensable », mais si une seule doit
   partir d'abord, c'est le tunnel de conversion.
2. **Trancher sur les doublons de `public/`** (§1) — une minute de votre
   part, 1,6 Mo de moins à servir.
3. **Lighthouse CI dès maintenant**, sans attendre la phase 6 : les budgets
   16.3 se tiennent plus facilement en continu qu'en rattrapage, et les
   moments livrés sont le bon moment pour poser la ligne de base.
