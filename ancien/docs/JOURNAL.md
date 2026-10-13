# Journal du chantier

Court par obligation : le dossier interdit (17.6 §8) de produire de la
documentation à la place du travail. Une ligne par phase, ce qui est fait,
ce qui ne l'est pas.

## Phase 0 — Socle ✅

**Migration Next 15 + React 19.** Quatre ruptures traitées : `params`
asynchrone (11 routes), namespace `JSX` supprimé, `useRef<T>(null)` qui rend
`RefObject<T | null>`, types React 19. Build vert, 232 articles générés sur
300 (68 à publication future), 73 redirections intactes.

**Une régression trouvée par axe-core juste après la migration.** React 18
exigeait d'écrire `inert: ''` — la chaîne vide était la seule façon de poser
l'attribut. React 19 le prend en booléen natif, et la chaîne vide y est
FAUSSE : les trois panneaux de navigation fermés redevenaient tabulables, sur
cinq pages. Corrigé en `inert={!ouvert}`.

**Nettoyage.** Supprimés : `Monolithe.tsx`, `ScrollBackground.tsx`,
`CountUp.tsx`, `useReveal.ts`, `/api/testimonials`, les six composants
`rentree/`, `config/rentree.ts`, la page `/offre-rentree` (301 vers
`/tarifs`), `public/logo.svg` et `public/logo-white.svg` (redessins
approximatifs à deux polygones — exactement le « pictogramme inventé » que la
règle 4.2 proscrit), la dépendance `twilio` (jamais utilisée).

**`site.ts` devient la source unique.** Ajout des conditions commerciales en
UNE seule version (celle des CGV PDF du 28 juillet 2026, par arbitrage
18.6) : acompte 40/60, 3 révisions, 30 jours de support, suppléments ;
l'hébergement dit tel qu'il est (« en Europe ou en France selon l'offre »,
le site affirmait « France » alors que les mentions légales nomment Vercel,
société américaine) ; le parrainage en une version au lieu de quatre ; un
mécanisme générique `offreEnCours` à la place du code spécifique à l'offre de
rentrée, qui portait deux dates de fin contradictoires ; `prochainCreneau`
vide, à saisir à la main — jamais calculé, ce serait une urgence fabriquée.

**API.** `/api/contact` acceptait `html`, `confirmHtml` et `subject` du
client et les relayait à Resend : n'importe qui pouvait faire partir un
e-mail au contenu de son choix DEPUIS l'adresse de l'agence, vers une adresse
de son choix. Réécrite : zod, gabarits serveur, échappement, limitation de
débit. `/api/parrainage` idem. Le formulaire de devis envoie désormais un
récapitulatif en DONNÉES.

**Sitemap.** Les slugs de réalisations venaient d'une liste recopiée à la
main qui avait dérivé : `demo-videaste`, le projet mis en avant et seule
étude de cas du site, n'était déclaré à aucun moteur. Ils viennent maintenant
de `lib/realisations.ts`. Ajout de `/ressources` et `/plan-du-site`.

**Typographie.** Space Grotesk retirée, Poppins installée — la famille du
lettrage du logo. Trois voix sans rôle distinct deviennent deux voix fortes
plus la chasse fixe technique.

**Vérifié.** Build vert, lint propre, QA 25/25, captures « avant »
(`docs/captures/00-avant/`) et « socle » (`00-socle/`) prises et regardées en
1440 et 390.

## Phase 1 — Scène et bande ◐ (socle fait, hero en cours)

**L'objet.** Le ruban du logo, extrudé depuis les deux tracés de
`LogoMarque.tsx` — le décalque relevé sur le PNG d'origine, pas un redessin.
Aucun biseau (il élargirait la silhouette et ferait échouer la
superposition). L'épaisseur passe par `scale.z` : la géométrie est
construite une fois, et à épaisseur nulle il ne reste que la face avant,
donc exactement la silhouette plate.

**La bascule de projection.** La matrice de projection est la moyenne
pondérée de l'orthographique et de la perspective. Deux autres pistes ont
été écartées pour des raisons précises : une perspective à petit angle n'est
PAS une orthographie (il y reste une fuite, la silhouette ne se superpose
jamais, et la distance tend vers l'infini) ; deux caméras échangées à
mi-parcours font un saut visible, que le dossier interdit explicitement.

**LA SUPERPOSITION — la règle bloquante 4.2 §6.**

| | 1440 px | 390 px |
|---|---|---|
| écart brut | **1,89 %** | **2,00 %** |
| dont forme fausse (hors contour) | 0,38 % | 0,47 % |
| écart de proportions | 0,31 % | — |

Seuil du dossier : 2 %. Tenu aux deux largeurs.

Le chemin pour y arriver dit quelque chose. Premier essai : **83 %**. Trois
fautes, toutes dans la MESURE, aucune dans l'objet :

1. Le dossier (4.1) annonce `logo_Stackup-Agency_seul.png` comme « détouré,
   RGBA ». Vérifié au navigateur : il a un canal alpha, mais **zéro pixel
   transparent** — 81,8 % de blanc opaque. Il n'est pas détouré. Binariser
   par l'alpha allumait l'image entière.
2. La capture incluait la barre de navigation et le bandeau cookies : leur
   encre entrait dans la boîte englobante. Première correction par liste de
   sélecteurs à masquer — elle laissait passer le bouton du menu mobile,
   d'où 84 % en 390 px. Une liste de ce qu'il faut cacher est toujours
   incomplète ; une liste de ce qu'il faut garder ne l'est pas.
3. Le seuil de binarisation était à 232, ce qui inclut le halo
   d'anticrénelage. Le bon seuil se DÉRIVE : luminance du navy 39,7, de
   l'ambre 156,4, du papier 255 ; demi-couverture à 147 et 206 ; moyenne
   **176**. Sous 157, l'ambre plein est exclu et l'écart explose à 76 % —
   ce qui confirme l'arithmétique.

**Cadence** (SwiftShader, rendu logiciel sans GPU — proxy, pas un vrai
appareil) : 31 fps en 1440, 60 fps en 390.

**LE HERO.** Le ruban 3D s'aligne au pixel sur une boîte vide déclarée par
le HTML, à côté du lettrage, qui reste du HTML (sélectionnable, indexable,
lisible par un lecteur d'écran, présent sans WebGL). Titre « Votre [site] en
10 jours ouvrés. », mot porteur cliquable, deux actions, quatre cotes tirées
de `site.ts`, pied « 00 — Ouverture ».

**Quatre défauts trouvés en regardant les captures, et un par la QA :**

1. Le ruban n'apparaissait pas. La bande se plaçait hors cadre parce qu'elle
   lisait `state.viewport` de R3F, qui calcule la hauteur visible à partir du
   `fov` — or la projection de cette scène est une matrice MÉLANGÉE
   ortho/perspective. La hauteur visible est passée dans un module partagé.
2. Le ruban était correctement placé mais invisible : le hero se peignait un
   fond ivoire opaque qui passait devant le calque fixe. L'ivoire est
   désormais porté par le `body` ; une section qui veut laisser voir la scène
   ne peint rien.
3. La page devenait sombre une fois ce fond retiré : le hero portait encore
   `data-scene="ouverture"`, qui met la traversée nuit/jour à 1. La direction
   retenue est ivoire dominant ; le hero ne participe plus à ce système.
4. Au défilement, la bande restait collée à l'écran et chevauchait le titre :
   l'ancrage n'était relevé qu'au redimensionnement. Il suit maintenant le
   défilement, une fois par image au plus.
5. La QA a relevé que le titre se copiait « Votresiteen 10 jours ouvrés » :
   première version en `display: flex` avec `gap`. Le rendu était identique,
   mais une gouttière n'est pas un caractère.

**Deux contrôles de la QA étaient périmés** : ils cherchaient « décoller »,
le mot porteur de l'ancien hero. Réécrits sur ce qui doit rester vrai quelle
que soit la formulation.

**Pas fait en phase 1** : le repli SVG animé, l'ombre portée réelle sur
l'ivoire, le drag à ± 20°, le cycle du mot porteur relié à la configuration
de la bande (il change le texte et le store, pas encore la forme).

## Phase 2 — L'offre ◐ (CONFIGURATION faite, STRATES non faite)

**CONFIGURATION (fiche 11.3).** Cent vingt plaques instanciées, cinq
configurations calculées par du code : une strate pour la vitrine, cinq pour
le multi-pages, une grille de produits pour la boutique, huit modules en
couronne pour le système de gestion, une page et un formulaire pour
l'association. Rien n'est modelé — une forme modelée serait un fichier de
plus à charger, versionner et re-modeler au premier changement d'offre.

Le morph se fait plaque par plaque avec un retard tiré du rang (fenêtre de
65 %) et un léger arc en Z. Sans le retard, les 120 plaques partent et
arrivent ensemble et le mouvement se lit comme un bloc qui glisse ; sans
l'arc, elles se traversent par le plus court chemin, ce qui se voit.

Les deux pseudo-aléas (relief de la boutique, retard du morph) sont des
hachages du rang, pas `Math.random()` : une forme qui change à chaque rendu
rendrait toute comparaison de captures impossible.

**La section L'OFFRE** remplace « l'Atelier » : une grille de sept vignettes
et vingt-cinq fondus-translations, qui annonçait « survolez chaque service »
alors qu'elle ne réagissait qu'au clic, et dont l'aperçu collait au-dessus de
la liste sur mobile. Cinq onglets en `role="tablist"`, flèches et touches
1–5, prix et délais lus dans `site.ts`, révisions et support lus dans les
conditions uniques.

**Un défaut vu sur capture :** les plaques ambrées retombaient toutes sur
deux colonnes et dessinaient des rayures verticales — une plaque sur six
dans une grille de douze. Passé à une sur sept, premier avec 12, 10, 8 et 3,
les quatre largeurs de grille utilisées.

**Pas fait en phase 2** : STRATES (la bande qui se découpe en cinq lamelles
et envoie ses composants dans une maquette), les lignes entre modules de la
configuration « gestion », la nav en strates, le menu mobile refait, le
défilement automatique des offres, le verrou de 8 s.
