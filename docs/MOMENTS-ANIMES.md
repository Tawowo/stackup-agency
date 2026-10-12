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
| 5 | **La ligne de données** — les quatre repères se posent en décalé sur la grille | CSS, au parse | ouverture |
| 5 bis | **La grille de construction** — les douze colonnes se lèvent sous le contenu | CSS, au parse | ouverture |
| 5 ter | **Les cotes qui se mesurent** — largeur et hauteur du cadre relevées au navigateur et réécrites à chaque redimensionnement, jamais des nombres décoratifs | `ResizeObserver` | ouverture |

## B — Animations spatiales
*(profondeur, parallaxe, caméra)*

| # | Moment | Déclencheur | Où |
|---|--------|-------------|-----|
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
| 25 | **Le trait de progression du comparateur** — les barres s'étendent à l'entrée dans le cadre, l'étiquette de délai passe à l'extérieur quand la barre est trop courte | entrée dans le cadre | verdict |
| 26 | **Le compteur du rapport** — « ×8,9 » monte jusqu'à sa valeur, recalculée à chaque type de projet | entrée dans le cadre, clic | verdict |

## E — Micro-interactions
*(le détail qui se remarque sans se voir)*

| # | Moment | Déclencheur | Où |
|---|--------|-------------|-----|
| 27 | **Le balayage lumineux du mot porteur** — une lueur traverse « décoller » en boucle lente, lettre après lettre | continu | hero |
| 28 | **Le trait du lien secondaire** — le soulignement se dessine d'un geste, pas d'un fondu | survol | hero |
| 29 | **L'éclat du bouton principal** — une lumière traverse la surface | survol | hero |
| 30 | **Le curseur de descente** — une pastille descend le long de son rail | continu | hero |
| 31 | **Les jalons du rail** — le trait du projet actif s'épaissit et prend sa couleur | défilement | réalisations |

## G — Mécanismes ajoutés par la passe « diversité radicale »
*(des matières différentes, pas le même effet reteinté)*

| # | Moment | Mécanisme | Où |
|---|--------|-----------|-----|
| 35 | **L'anatomie s'ouvre** — cinq plans HTML en perspective s'écartent au défilement puis se referment | 3D CSS sur de vrais éléments, `preserve-3d` | anatomie |
| 36 | **L'isolement d'une couche** — survoler ou tabuler une légende éteint les quatre autres et révèle le plan choisi | opacité + saturation, piloté par la légende | anatomie |
| 37 | **L'inclinaison de la pile** — la scène s'incline vers le pointeur, avec inertie | rotation lissée | anatomie |
| 38 | **Le réseau circule** — des paquets parcourent les liaisons entre modules, avec une traînée | Canvas 2D, courbes de Bézier | réseau |
| 39 | **Les nœuds se dérobent** — le pointeur repousse les modules, qui reviennent par ressort | physique simple, amortie | réseau |
| 40 | **Le sous-graphe s'éclaire** — choisir un module allume ses liaisons et éteint le reste | parcours du graphe | réseau |
| 41 | **Le schéma se câble** — blocs puis liaisons puis points se tracent dans l'ordre | `stroke-dashoffset` sur SVG | /services |
| 42 | **Le titre découpé** — une trame diagonale défile DERRIÈRE les lettres | `background-clip: text` | /realisations |
| 43 | **L'axe se gradue** — une règle se construit de gauche à droite, cran par cran | `scaleX` puis `scaleY` décalés | /tarifs |
| 44 | **La chronologie se pose** — cinq crans apparaissent le long d'une ligne de temps | rebond séquencé | /a-propos |
| 45 | **Le signal émet** — des ondes concentriques partent d'un point | cercles en boucle décalée | /contact, /parrainage |

## F — Moments spectaculaires
*(ceux qu'on raconte après)*

| # | Moment | Déclencheur | Où |
|---|--------|-------------|-----|
| 32 | **L'embrasement au clic** — l'empilement devient blanc chaud et explose | clic | hero |
| 33 | **Le franchissement du seuil** — la page bascule du noir au jour pendant que l'objet devient une interface | défilement | seuil |
| 34 | **L'entrée dans la salle de projection** — la page claire se creuse en un îlot d'encre | défilement | réalisations |

---

**Total : 46 moments distincts.** Deux ont été retirés — les plaques en
parallaxe et la rampe de quatre cartes du hero — et trois ajoutés avec
l'ouverture. Le compte monte de 45 à 46, ce qui n'est pas le sujet : le sujet
est qu'il n'y a plus deux mouvements qui ne disaient rien.

Sur la seule page d'accueil : **27 moments**, portés par **six matières
différentes** — des points en 3D (ouverture), une grille mesurée au
navigateur (ouverture), des plans HTML en perspective (anatomie), des traits
en Canvas 2D (réseau), des captures en pellicule (réalisations), des filets
et des balayages (méthode).

Les six pages commerciales ont chacune une ouverture distincte, là où elles
partageaient jusqu'ici le même fondu.

## Ce qui se passe sans tout cela

| Condition | Ce qui reste |
|-----------|--------------|
| Sans JavaScript | Page entière en plein jour, 264 blocs de texte lisibles, aucun contenu masqué. Aucune animation, aucune scène. |
| Mouvement réduit | Aucun canvas, aucune animation d'entrée, aucun balayage. La traversée d'ambiance subsiste : ce n'est pas du mouvement, c'est une couleur de fond. |
| Sans WebGL | Aucun canvas. La traversée d'ambiance est pilotée en CSS par un observateur de défilement. |
| Appareil lent | Le nombre de particules descend de 56 000 à 26 000 puis 9 000, mesuré sur la cadence réelle. Les textes ne dépendent d'aucun état JavaScript : ils sont peints par le compositeur. |
| Écran étroit | La pellicule des réalisations redevient une pile verticale : détourner le défilement sur un téléphone est désagréable, et les captures ne se chargeaient pas derrière une translation. |

## Ce qui a été retiré, et pourquoi

| Retiré | Raison |
|--------|--------|
| La trame de particules derrière les sections de jour | Le même nuage traînait derrière l'anatomie, le réseau, les réalisations et la méthode, et ramenait à une seule texture quatre sections conçues pour être radicalement différentes. La scène appartient désormais à la nuit. |
| 840 ms de préchargeur | Un minuteur fixe sans rapport avec un chargement réel, qui cachait un hero déjà noir derrière un écran noir. Ramené de 1 400 ms à 560 ms. |
| Le fondu-montée partagé des six en-têtes commerciaux | Remplacé par cinq mécanismes distincts. |
| Les plaques en parallaxe du hero | Trois arêtes qui glissaient devant le texte. Elles ajoutaient du mouvement sans ajouter de sens, et brouillaient la lecture du titre. |
| La rampe des quatre cartes de confiance | Quatre cartes flottantes sous le hero. Remplacées par une ligne de données alignée sur la grille, qui se lit d'un balayage au lieu de quatre. |
| Le bandeau défilant d'adjectifs | Dix mots qui glissaient en boucle, `aria-hidden`, sans une information que la page ne porte pas ailleurs. Sa seule donnée propre — la pile technique — est descendue dans les légendes de l'anatomie, lisible et rattachée à sa couche. |
| Les cinq pastilles de chiffres | Cinq cartes identiques à la teinte près. Leurs cinq chiffres sont tous redits ailleurs, et le « 80 % moins cher » est même CALCULÉ par le comparateur à partir des tarifs réels. |
| L'onglet « Code → Site » | Un bloc de JSX qui fondait en page web : exactement la phrase du seuil, et exactement la démonstration de l'anatomie. Trois fois le même propos. |
| L'onglet « 10 jours » | Une seconde chronologie J1→J10, en concurrence avec la méthode qui déroule le même processus avec le contenu réel des échanges. |
