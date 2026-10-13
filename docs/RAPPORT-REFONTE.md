# Rapport de refonte — Stackup Agency

Rapport demandé par la section 17.7 du dossier. Il est écrit pour être
utilisable, donc il nomme d'abord ce qui n'est pas fait.

Branche : `claude/brave-maxwell-i7g77j` · Date : 13 octobre 2026
Dernière mise à jour après les phases 3, 4a-4b, 5a et 6a-6b.

---

## 1. Ce qui n'est pas fait

Le dossier découpe le chantier en huit phases (§17.3). **Les phases 0 à 3
sont faites. Les phases 4 et 6 sont entamées. Les phases 5 et 7 ne sont pas
commencées.** Le détail :

| Phase | État | Ce qui manque |
| --- | --- | --- |
| 0. Socle | **Terminée** | — |
| 1. Scène et bande | **Terminée** | — |
| 2. Accueil, première moitié | **Terminée** | — |
| 3. Accueil, seconde moitié | **Terminée** sauf un point | Le feuilletage des captures au drag dans la PELLICULE. Juste Prix, DIX JOURS, Atelier, Départ, Salle des machines : faits. |
| 4. Pages commerciales | **Entamée** | Les six gabarits de service, le gabarit projet, le curseur des tarifs, la fusion complète configurateur + devis, le contact, et les View Transitions à proprement parler. Faits : la moitié architecturale de la TRAVERSÉE (chaque page déclare l'état de la bande) et le parcours de conversion sans ressaisie. |
| 5. Pages programmatiques | **En partie faite, avant ce chantier** | Le travail fin par gabarit décrit dans la matrice 13.11. Mais les pages NE SONT PAS restées au gabarit uniforme : signatures distinctes, fonds ivoire, contenu local réel. Mesuré en capture, voir §2 critère 4. |
| 6. Finition et mesure | **Entamée** | Grain et post-traitement, calque `G`, raccourcis, curseur, haptique, gyroscope, vidéos. Faits : la mesure des budgets 16.3 (`scripts/budgets.mjs`) et les trois niveaux de mouvement, avec leur réglage au pied de page. |
| 7. Options | **Non commencée** | Rapier, portails drei, PDF de devis, export du cahier des charges, visualisations d'articles |

Ce qui a été fait en phase 3 :

- **Le tampon « Démonstration »** sur les sept fiches de la salle de
  projection (règle bloquante §15.3), et la liste des projets lue depuis
  `lib/realisations.ts` au lieu d'une copie à cinq entrées qui avait déjà
  divergé.
- **DIX JOURS sur un calendrier réel** : dates en jours ouvrés depuis
  aujourd'hui, fériés français calculés et non listés, onze cas de test.
- **LE JUSTE PRIX** : le « ×8,9 moins cher qu'une agence classique » et ses
  fourchettes inventées sont supprimés ; la comparaison restante est sourcée
  par des articles publiés, et elle est moins flatteuse (voir §4).
- **LE DÉPART** : la bande revient et se replie en logo exact ; les trente
  étoiles clignotantes disparaissent.
- **Les trois engagements vérifiables**, chacun avec le lien qui permet de
  le contrôler.

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
| 3 | Neuf moments, neuf mécanismes distincts | **Tenu en partie** — huit moments sur neuf sont en place et aucun ne partage le geste d'un autre : bascule de projection, coupe en lamelles par plans de coupe, morph de 120 plaques, traversée d'accent, calendrier réel daté, repliement sur le logo. Quatre d'entre eux ne se trouvent dans aucun gabarit courant, ce que le critère demande. Manque la Salle des machines remise en scène. |
| 4 | Toutes les pages de la matrice transformées | **Tenu sur le point que le critère nomme**, et j'avais écrit l'inverse. Le gabarit condamné — bande sombre uniforme + colonne + cartes + CTA dégradé — n'existe plus : les en-têtes portent huit signatures distinctes réparties sur les familles, les fonds sont ivoire, et le dernier CTA à dégradé vient d'être remplacé par un aplat. Vérifié en capture sur six familles (hub, module, ville, métier, ressources, à propos), pas au `grep`. Ce qui reste de la phase 5 est le travail fin par gabarit décrit dans la matrice 13.11, que je n'ai pas repris ligne à ligne. |
| 5 | Mobile avec ses propres compositions | **Tenu sur les moments livrés** : hero en portrait, strates en onglets balayables, offres en balayage. Chaque moment a sa capture 390. |
| 6 | Parcours configurateur → devis → e-mail sans ressaisie | **Tenu**, sauf la dernière étape. Le parcours est joué de bout en bout par `scripts/parcours-conversion.mjs` aux deux largeurs : le type de projet arrive présélectionné et la synthèse est reprise. L'e-mail réellement reçu reste à vérifier à la main, une fois : un script de vérification n'a pas à écrire à qui que ce soit. |
| 7 | Budgets tenus, axe et contraste sur 31 routes | **Tenu pour l'accessibilité** : axe 0 violation, contraste 0 nœud en échec, défilement horizontal 0 px à 390 et 1440, neuf sources citées qui répondent toutes. **Mesuré et NON TENU pour la performance** : le LCP sort à 2,87–3,4 s contre 2,5 s de plafond. Voir §6 pour ce que cette mesure vaut et ce qu'elle ne vaut pas. |
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
8. **La bande du Départ était dessinée et invisible** — le compteur du
   renderer annonçait ses 96 triangles. Deux causes empilées : son brin navy
   #0D2C4C posé sur un fond encre #070B16, puis le fond opaque de la section
   qui passe par-dessus le canvas. La seconde, j'avais déjà écrit sa
   correction pour le hero et je l'ai refaite quand même.
9. **La source citée par Le Juste Prix rendait 404** : l'article a une date
   de publication au 19 novembre. Build vert, lint vert, page parfaite.
10. **La numérotation des moments comportait deux « 06 », deux « 09 » et un
    « 10 » placé avant un « 09 »** après les réordonnancements.
11. **`plan` et `ombre` sans place déclarée se plaçaient au centre à
    l'échelle 1** : le ruban couvrait le titre et les tarifs sur /tarifs, le
    titre et le texte sur une fiche projet.
12. **`repos` portait un facteur 4 de trop** : un ruban à 36 % de l'écran et
    rogné, là où le dossier demande une signature discrète.
13. **En portrait, la signature se posait sur le mot « sans »** du titre
    « Tarifs clairs, sans surprise ».
14. **L'aperçu des modules affichait une requête de référencement** —
    « création site e-commerce click and collect » — au lieu d'une phrase.
15. **Le moteur 3D était téléchargé sur les pages sans scène** : 238 ko pour
    un canvas qui ne dessine rien. Trouvé par la mesure des budgets, pas à
    l'œil.
16. **La scène 3D ignorait `prefers-reduced-motion`.** Le store portait le
    niveau de mouvement, les composants le lisaient — et rien ne l'écrivait.
    Les sections HTML faisaient ce qu'il fallait ; seule la scène était
    sourde, c'est-à-dire l'endroit où le mouvement est le plus fort. Un
    réglage que le système transmet et que le site ignore est pire qu'un
    réglage absent.
17. **Un CTA à dégradé survivait** dans les pages de services locaux —
    littéralement le motif que le dossier condamne.

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
- **`scene-portee.mjs` testait une route qui n'existe pas**
  (`/realisations/portfolio-photographe`) : il criait à la fuite sur une page
  404. Il contrôle désormais le code HTTP — une route morte doit se dire
  comme telle, pas se déguiser en anomalie de rendu.
- **Mon test du parcours de conversion s'est trompé deux fois avant le
  site** : il cliquait « Continuer » sans répondre à l'étape qui attendait
  une réponse, puis il cherchait un champ « message » qui n'apparaît qu'à une
  étape ultérieure. Deux accusations infondées.
- **Mon test des niveaux de mouvement**, qui envoyait un événement
  personnalisé que rien n'écoute — un mécanisme que j'avais inventé. Il
  rapportait le même niveau partout, et j'aurais pu en conclure que la
  correction ne marchait pas. C'est en cherchant comment forcer le niveau que
  la vraie lacune est apparue : il n'y avait aucun moyen, pour personne.
- **Et moi-même, dans la première version de ce rapport.** J'y ai écrit que
  le critère 4 n'était « pas tenu » et que la phase 5 n'était « pas
  commencée », en lisant le plan de phases plutôt que les pages. Capture
  faite sur six familles : le gabarit condamné n'existait déjà plus. Un
  rapport qui sous-estime trompe autant qu'un rapport qui enjolive — il fait
  refaire ce qui est fait, et détourne l'attention de ce qui ne l'est pas.
- **Mon audit de la règle 2.** J'ai annoncé à la phase 2e que le `grep`
  exigé par le dossier revenait vide. Il revenait vide parce qu'il ne
  cherchait que les CLASSES Tailwind `opacity-0 translate-y` : huit
  fondus-translations supplémentaires vivaient en style inline, dont quatre
  dans la seule section « raison d'être ». Un outil qui rend le résultat
  attendu n'est pas pour autant un outil qui mesure la bonne chose.

Deux instruments ont été ajoutés à la suite de ces erreurs :
`scripts/verifier-sources.mjs`, qui vérifie que chaque source citée en dur
répond 200, et `scripts/test-jours-ouvres.mjs`, onze cas sur le calcul des
dates. Un calcul de dates qu'on n'éprouve pas est un calcul faux qu'on n'a
pas encore vu.

Ce qui remplace les trois mesures fausses : `Temoin`, qui lit le compteur de
triangles du renderer, et `scripts/scene-portee.mjs`, qui balaie les routes. Le compteur ne ment pas
— il dit ce qui a été soumis au GPU. Résultat : 20 routes × 2 largeurs,
0 fuite ; l'accueil dessine (96 triangles à 1440, 48 à 390, la différence
étant la passe d'ombres absente en mobile).

---

## 6. État des vérifications

Toutes relancées au dernier commit :

### Performance — mesurée, et ce qu'elle vaut

```
TTFB            5 à 6 ms
CLS             0 (plafond 0,05)
LCP             2 874 à 3 444 ms (plafond 2 500) — NON TENU
JS transféré    253 ko sans scène · 498-511 ko avec
```

Le poids transféré a été divisé par deux sur les pages qui ne demandent pas
la scène (502 → 253 ko), et leur TBT avec (216 → 45 ms).

**Le LCP d'ici ne permet pas de juger ce que verra un visiteur.** Lighthouse
applique son bridage simulé — processeur divisé par quatre, 4G lente —
par-dessus un conteneur déjà partagé, et deux passages du même build donnent
des TBT allant du simple au triple. Le serveur répond en 5 ms et le CLS est à
zéro : le retard ne vient ni du serveur ni d'un décalage de mise en page. La
mesure est à refaire sur le déploiement réel, comme le dossier l'avait prévu
(§17.5).

### Le reste

```
build           vert
lint            0 avertissement
QA complet      25/25
axe-core        0 violation (dont 0 grave)
contraste       0 nœud en échec sur 31 routes
défilement h.   0 px à 1440 et 390
portée scène    0 fuite sur 20 routes × 2 largeurs
sources citées  9, toutes en réponse 200
jours ouvrés    11 cas de test, tous passants
seo-lint        3 échecs sur 100 pages (2 assumés, voir §1)
superposition   1,89 % / 2,00 % (seuil 2 %)
numérotation    croissante et sans doublon
```

Captures lues, et non seulement prises :
`docs/captures/p2-honnetete/`, `p2c-strates/`, `p2d-offre/`, `p2e-decoupe/`,
`p3-salle/`, `p3-methode/`, `p3-depart/`, `p3-prix/`, `p3-engagements/`.

---

## 7. Ce que je recommande pour la suite

Dans cet ordre, et pour une raison à chaque fois :

1. **Phase 4.** C'est maintenant la bonne suite : les moments de l'accueil
   sont en place, et les pages commerciales portent le chiffre d'affaires.
2. **Lire ce que dit désormais Le Juste Prix.** La comparaison sourcée est
   nettement moins flatteuse que le « ×8,9 » qu'elle remplace : avec le plan
   Starter, une vitrine sur cinq ans se situe entre 841 € de plus et 559 € de
   moins qu'un constructeur par abonnement. C'est la seule phrase que les
   sources autorisent. Si vous disposez de relevés de prix d'agences —
   devis reçus, grilles publiées — la comparaison « agence classique » peut
   revenir, sourcée cette fois.
3. **Trancher sur les doublons de `public/`** (§1) — une minute de votre
   part, 1,6 Mo de moins à servir.
4. **Relancer `scripts/budgets.mjs` sur stackup-agency.fr** une fois
   déployé. C'est la seule mesure de LCP qui vaudra quelque chose, et elle
   tranchera si le budget est réellement dépassé ou si le conteneur mentait.
5. **Vérifier une fois à la main qu'un devis arrive bien par e-mail.**
   C'est la seule étape du parcours de conversion que je n'ai pas jouée :
   poster le formulaire aurait envoyé un vrai message.
6. **Regarder le réglage des animations au pied de page** et dire s'il vous
   convient là. C'est un ajout de ma part : le dossier demande les trois
   niveaux, il ne dit pas où les proposer.
