# Les moments animés de la page d'accueil

Inventaire honnête. Un « moment » = **une intention distincte**, pas un
élément. Les quatre cartes de confiance qui entrent en décalé comptent pour
un seul moment, pas quatre — gonfler le compte n'apprendrait rien.

Chaque ligne indique ce qui déclenche le moment et où le vérifier.

---

## A — Animations de composition
*(ce qui se met en place à l'arrivée)*

| # | Moment | Déclencheur | Où |
|---|--------|-------------|-----|
| 1 | **L'assemblage du monolithe** — les particules viennent du lointain en vague décalée et se rangent en plateaux | chargement (`uAssemblage`, 2,2 s) | hero |
| 2 | **Le mot porteur lettre par lettre** — « décoller » arrive lettre à lettre, chacune avec sa propre trajectoire, sa rotation et son flou | CSS, au parse | hero |
| 3 | **Les trois niveaux du titre en cascade** — amorce, mot, chute, à 120 / 220 / 900 ms | CSS, au parse | hero |
| 4 | **L'accroche mot à mot, par le flou** — chaque mot se dénoue d'un flou de 6 px | CSS, au parse | hero |
| 5 | **La rampe de confiance** — les quatre cartes montent en décalé | CSS, au parse | hero |

## B — Animations spatiales
*(profondeur, parallaxe, caméra)*

| # | Moment | Déclencheur | Où |
|---|--------|-------------|-----|
| 6 | **Les plaques en parallaxe** — trois arêtes devant le texte, pilotées par le défilement ET par le pointeur, avec lissage | défilement + pointeur | hero |
| 7 | **Le voyage de caméra** — position, cible et distance focale interpolées d'un état de scène à l'autre | défilement | toute la page |
| 8 | **La rotation lente du nuage** — vitesse propre à chaque état | continu | toute la page |
| 9 | **L'inclinaison au pointeur** — la scène entière s'incline légèrement vers le curseur | pointeur | toute la page |

## C — Animations interactives
*(la page répond)*

| # | Moment | Déclencheur | Où |
|---|--------|-------------|-----|
| 10 | **La répulsion au pointeur** — la matière s'écarte du curseur et s'illumine à son approche | pointeur | toute la page |
| 11 | **L'impulsion au clic** — l'empilement s'embrase et se disperse, puis se reforme | clic | toute la page |
| 12 | **Le bouton magnétique** — le cadre suit le pointeur, le contenu suit le cadre avec un retard de 0,38 : c'est ce décalage qui donne la sensation de matière | pointeur | hero |
| 13 | **Le rail des réalisations** — cliquer un jalon déplace la PAGE, pas un état séparé : défilement, souris et clavier disent la même chose | clic / clavier | réalisations |
| 14 | **Le sélecteur de l'Atelier** — la maquette de navigateur rejoue son contenu au changement de service | clic | atelier |
| 15 | **Le logiciel manipulable** — filtres, tri, dépliage de ligne, avancement de dossier, totaux recalculés | clic / saisie | preuve logicielle |

## D — Animations liées au défilement
*(la position dans la page pilote l'image)*

| # | Moment | Déclencheur | Où |
|---|--------|-------------|-----|
| 16 | **La traversée nuit → jour → nuit** — le fond, le texte, les bordures et les surfaces voyagent ensemble | défilement | toute la page |
| 17 | **La métamorphose structure → interface** — le monolithe se défait et se reforme en maquette de site, en transition décalée et en arc | défilement, dans le seuil | seuil |
| 18 | **L'effacement des mots au cœur de la bascule** — les mots du seuil s'effacent exactement là où aucun texte ne serait lisible | défilement | seuil |
| 19 | **La règle graduée** — 28 graduations se lèvent une à une au fil de la progression | défilement | seuil |
| 20 | **La pellicule des réalisations** — la bande se déplace horizontalement, avec un arrêt franc sur chaque projet | défilement | réalisations |
| 21 | **La lumière de la salle** — le halo prend la couleur du projet au centre, en 700 ms | défilement | réalisations |
| 22 | **Le retrait de l'en-tête** — le titre de section s'efface dès que la bande démarre | défilement | réalisations |
| 23 | **Le filet de marge qui se trace** — hauteur écrite image par image, sans transition, pour suivre la main | défilement | méthode |
| 24 | **Le balayage des étapes** — chaque étape se découvre de gauche à droite, à la règle (`clip-path`) | entrée dans le cadre | méthode |
| 25 | **Le trait de progression du comparateur** — les barres s'étendent à l'entrée dans le cadre | entrée dans le cadre | preuve par 3 |
| 26 | **Les compteurs** — les chiffres montent jusqu'à leur valeur | entrée dans le cadre | hero, chiffres clés |

## E — Micro-interactions
*(le détail qui se remarque sans se voir)*

| # | Moment | Déclencheur | Où |
|---|--------|-------------|-----|
| 27 | **Le balayage lumineux du mot porteur** — une lueur traverse « décoller » en boucle lente, lettre après lettre | continu | hero |
| 28 | **Le trait du lien secondaire** — le soulignement se dessine d'un geste, pas d'un fondu | survol | hero |
| 29 | **L'éclat du bouton principal** — une lumière traverse la surface | survol | hero |
| 30 | **Le curseur de descente** — une pastille descend le long de son rail | continu | hero |
| 31 | **Les jalons du rail** — le trait du projet actif s'épaissit et prend sa couleur | défilement | réalisations |

## F — Moments spectaculaires
*(ceux qu'on raconte après)*

| # | Moment | Déclencheur | Où |
|---|--------|-------------|-----|
| 32 | **L'embrasement au clic** — l'empilement devient blanc chaud et explose | clic | hero |
| 33 | **Le franchissement du seuil** — la page bascule du noir au jour pendant que l'objet devient une interface | défilement | seuil |
| 34 | **L'entrée dans la salle de projection** — la page claire se creuse en un îlot d'encre | défilement | réalisations |

---

**Total : 34 moments distincts**, répartis sur les six familles.

## Ce qui se passe sans tout cela

| Condition | Ce qui reste |
|-----------|--------------|
| Sans JavaScript | Page entière en plein jour, 237 blocs de texte lisibles, aucun contenu masqué. Aucune animation, aucune scène. |
| Mouvement réduit | Aucun canvas, aucune animation d'entrée, aucun balayage. La traversée d'ambiance subsiste : ce n'est pas du mouvement, c'est une couleur de fond. |
| Sans WebGL | Aucun canvas. La traversée d'ambiance est pilotée en CSS par un observateur de défilement. |
| Appareil lent | Le nombre de particules descend de 56 000 à 26 000 puis 9 000, mesuré sur la cadence réelle. Les textes ne dépendent d'aucun état JavaScript : ils sont peints par le compositeur. |
