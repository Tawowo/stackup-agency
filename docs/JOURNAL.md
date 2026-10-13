# Journal du chantier — Stackup Agency V5

Court par obligation (≤ 150 lignes). Le propriétaire lit ce fichier pour savoir où on en est.

## 2026-10-13 — Phase 0 : scaffold + Stack Engine ✅

**Départ.** Le dépôt contenait l'ancien site et une refonte antérieure : tout est dans `ancien/`
(git mv, rien de perdu ; copie dans `../stackup-agency-20261012/`). `ancien/` est une carrière
(logo, images, PDF, données, 300 articles, configurateur, LogoMarque) à supprimer après la phase 6.

**Fait.** Next 16 / React 19 / TS strict / Tailwind 4 / three + R3F 9. Tokens, polices locales
(Poppins 600/700, Inter variable, JetBrains Mono). `scripts/logo-trace.mjs` dérive UNE plaque canonique
(143 × 46,7, pli 21,83°) et les trois poses du logo (rotation résiduelle ≤ 0,9°) des tracés SVG.
Stack Engine : InstancedBufferGeometry, deux layouts dans les attributs, morph en arc avec retard dans
le vertex shader, uniforms partagés, matériau navy/ambre éclairé à −18° (Fresnel, arêtes, balayage,
lentille, grain), ombre projetée sur un mur par le moteur lui-même (un matériau de profondeur ignorerait
le morph), mur qui peint fond/halo/vignette/grain, caméra ortho ↔ perspective par mélange de matrices,
un seul ticker gsap, drag avec inertie, paliers detect-gpu + moniteur (désactivé si `?quality=`).
`/lab` : Tweakpane, états par URL. Scripts : shots (1440/390, ± mouvement réduit, SwiftShader),
logo-check, cadence, compresser-png. Layouts purs testés (`node --test`).

**Captures lues** : 24. Défauts corrigés : Tweakpane en double ; caméra qui recentrait la pile ; tour
chaotique ; plaques de profil roses ; lentille et Fresnel trop forts ; ambre jaunie ; `--su-nuit` CSS.

**Superposition** : 1,05 % (1440) / 1,08 % (390), seuil 2 %. **Cadence SwiftShader** (temps réel) :
logo 8-9 fps en 1440, 15 en 390 ; pile 4 / 9 ; un canvas VIDE plafonne à 16 fps ici → le proxy « ≥ 30 »
n'est pas atteignable dans ce conteneur, à mesurer sur un vrai GPU.

**Dépendances hors liste** : `@tweakpane/core` (types, dev), `sharp` (logo-check, AVIF phase 3, dev).

## 2026-10-13 — Phase 1 : le hero (moment 00) ✅

**Fait.** Store : `projection`, `pose`, `scrub`, `target` (paire A/B explicite — la bascule « p > 0 »
courait contre le montage différé de la scène). Lenis sur `gsap.ticker` + ScrollTrigger, barre de
progression. Nav (LogoMarque, cinq entrées, action, menu mobile en lamelles `inert` + focus piégé).
Action, Cote (mesure réelle), Curseur (point + anneau amorti, pointeur fin). OUVERTURE : section
épinglée 150 vh (120 mobile), titre déplié par mots avec arête ambre, deux actions, quatre cotes (deux
mobile) ; le scroll écrit uMorph (logo → pile), ortho → perspective, épaisseur ×2,5, pose de la tour.
Repli 2D 100 % CSS : trois plaques SVG exactes + sept fantômes pilotés par `--su-p`. Mouvement
réduit : logo figé, texte posé, pas d'épinglage. Six pages de chantier pour les routes de la nav.

**Captures lues** : 23 états du hero + 2 logo-check (1,17 % / 1,43 %). Défauts corrigés : tour déjà
construite à p = 0 ; repli 2D en ivoire ; menu par-dessus la barre ; `?fond=ivoire` écrasé par le hero.

## 2026-10-13 — Phase 2 : accueil, première moitié ✅ (moments 01-04)

**Fait.** Attribut `aDelay` (ordre d'arrivée par layout). Layouts purs + tests : `strates` (5 lamelles
de 54 plaques, écartement piloté), `page` / `multi` / `boutique` / `logiciel` construits à partir de BLOCS
déclaratifs — la maquette HTML du moment 02 est dérivée des mêmes blocs, donc calée au pixel sur les
plaques en orthographique —, `pellicule` (cadre 16:9 glissant), `noyau`. Primitives Plaque, Seuil, Fiche,
Cadran (roues, Poppins non tabulaire → roues centrées). Store : `moment` (propriétaire de la scène : une
seule expérience écrit), paire A/B avec paramètres par côté, pose et projection amorties, nuit forcée.
Registre des boîtes d'ancrage : la pile suit la boîte la plus visible et glisse d'un moment à l'autre.
Moment 01 DÉCOUPE (épinglé 250 vh, lamelles une à une, 1-5 / clic isole, refermeture) ; 02 ASSEMBLAGE
(ivoire, sélecteur clavier/tap, maquette par découpe, Cadran, Fiche, rotation 7 s) ; 03 PELLICULE
(épinglé, horizontal au scroll, cadre teinté `uAccent`, snap, balayage natif mobile, AVIF produits) ;
04 SEUIL « Pas que des sites. » avec la pile en noyau. Mouvement réduit : moteur figé sur le logo,
aucun épinglage, couleurs posées sans tween. `ScrollRefresh` recalcule les triggers une fois tout monté.

**Captures lues** : 15 layouts sur `/lab`, 59 états de l'accueil (100 entrées dans `rapport.json`).
Défauts vus et corrigés : lab strates vus de face (traits), chevrons sur le texte, éventail trop serré ;
scène vide au moment 01 (la boîte du hero gardait la main) → registre ; pile du hero affichée sur 01-03
(la bascule du hero écrasait la paire) → propriétaire `moment` ; maquette décalée des plaques → blocs
communs ; lamelles pas refermées à p = 1 (onEnter/onUpdate en course) → phase dérivée de la progression ;
piste de la pellicule décalée après un saut (snap inertiel) ; noyau derrière le texte du Seuil ; en
mouvement réduit, les triggers sous le seul épinglage restant étaient mesurés faux → plus d'épinglage.
Noté, non corrigé : éventail `multi` qui déborde sur mobile ; le glissement de la pellicule est trop bref
pour une capture fixe (une vidéo le montrera en phase 3).

**Démos.** Les cinq URL de démo sont injoignables depuis ce conteneur (réseau sortant filtré) : les AVIF
de `public/realisations/` viennent des captures de l'ancien site (4 à 41 ko) ; à refaire depuis les démos.

**Pas fait** : vidéo Playwright du scroll ; moments 05-09 ; `ContactShadows`/`AdaptiveDpr` de drei non
employés (ombre et DPR gérés par le moteur).

**Corrections avant la phase 3 (captures avant dans `docs/qa/shots/avant/`).** Zone d'exclusion du
titre (`useExclusion`, ResizeObserver, union titre + nav) passée au vertex shader : les plaques en vol la
contournent par le côté le plus proche, pondéré par sin(πt) ; p = 0,25 / 0,5 / 0,75 capturés aux deux
largeurs, texte intact. Variante `portrait` de `multi` (trois pages empilées, `params.portrait` suit la
media query) : rien ne sort du cadre à 390. Pellicule : scrub 1,4, snap 0,6-1,2 s, morph du cadre 1,6 s ;
état `pellicule-glissement` (depuis 0,25 → 0,5, 700 ms) qui montre le cadre en vol. Défaut trouvé en
chemin : `half` est réservé en GLSL, le shader ne compilait plus (canvas noir sur toutes les captures).

**Prochaine étape — phase 3** : moments 05 (Salle des machines, modules + maquettes animées, `DemoSlot`
vide), 06 (Juste prix, layout `cadran`), 07 (Méthode, layout `methode`), 08 (Atelier), 09 (Départ, retour
au logo), footer ; vidéo d'un scroll entier (desktop, mobile, rm).

## 2026-10-13 — Phase 3 : accueil, seconde moitié (moments 05-09) ✅

**Fait.** Layouts purs + tests : `machines` (12 nœuds en deux anneaux, chapelets d'arêtes, hub ambre,
variante portrait), `cadran` (arc de 48 plaques, graduations, aiguille pilotée par `params.aiguille`),
`methode` (cinq groupes qui s'assemblent, `params.etape`). Isolation paramétrée par moment (`isoPush`,
`isoDim`) ; `calme` (pile à l'arrêt). Moment 05 MODULES : douze solutions réelles de `src/data/solutions.ts`,
un bouton HTML par nœud calé sur sa plaque, clic / tap / flèches allument un nœud (isolation), maquette
animée par découpe dans une Plaque (liste, Cadran, statut en boucle de 2,4 s, puce qui tourne), rotation
6 s jusqu'à interaction, `DemoSlot.tsx` vide non rendu ; aucun ancien Laboratoire. 06 CADRAN : ivoire,
quatre Plaques + Cadran + trois inclusions, trois engagements tracés en SVG, l'aiguille suit l'offre
survolée / focalisée. 07 ASSEMBLAGE SÉQUENTIEL : cinq étapes, numéro déplié, texte découpé, plaque ambre
pour l'étape 02, scène collante à droite qui s'assemble par étape. 08 ATELIER : placeholder de portrait,
Mathéo Reboul, trois paragraphes, accordéon natif (`components/editorial`, fondu toléré), pile à l'arrêt.
09 DÉPART : champ unique → `/contact?projet=…`, retour au layout `logo`. Footer (logo, nav, mentions).
Pages de chantier pour mentions légales, confidentialité, CGV. `devIndicators` coupés (le pavé Next
entrait dans les captures).

**Captures lues** : 32 états des moments 05-09 + footer (138 entrées). Défauts vus et corrigés : trois
états vides (`half` réservé en GLSL ; `ENTREES` importé d'un composant client ; `COURT` utilisé avant
sa déclaration) ; isolation des strates qui dispersait le réseau ; bouton Caisse sous la maquette ;
jauge minuscule et titre 06 descendu ; étape 05 jamais franchie (seuil de déclenchement). Notés, non
corrigés : en mouvement réduit le logo figé passe derrière les nœuds (05) ; sur mobile le bandeau
épinglé de 07 passe derrière le texte de l'étape 01.

**Vidéos.** L'enregistreur de Playwright ne produit aucune trame sous SwiftShader (chemin annoncé,
fichier jamais écrit) et son ffmpeg n'a ni image2 ni VP9 : `scripts/videos.mjs` capture une trame JPEG
par pas de scroll et les envoie en flux (image2pipe) à ce ffmpeg en VP8. Trois vidéos dans
`docs/qa/videos/` (1440, 390, 1440 mouvement réduit), ignorées par git (`*.webm`), à regénérer avec
`npm run videos`.

**Pas fait** : gyroscope, raccourcis clavier globaux, réglage du mouvement (phase 7) ; cadence sur vrai GPU.

**Vercel.** La preview de la branche renvoyait 404 NOT_FOUND partout (même `/favicon.ico`) avec un build
« completed » : `vercel.json` (`"framework": "nextjs"`) était parti dans `ancien/` avec l'ancien site, et
le projet retombait sur son preset enregistré (servi comme dossier statique). Restauré à la racine, plus
`engines.node = 22.x`. Le conteneur ne peut pas joindre vercel.app (politique d'egress) : l'état des
déploiements se lit par l'API GitHub (`deployments` + `statuses.environment_url`).

## 2026-10-13 — Phase 4 : tarifs + contact ✅

**Fait.** `src/lib/configuration.ts` : schéma zod, `serialiser` / `deserialiser` (`?c=t=outil;f=rdv;m=pro;r=4`),
`normaliser` (fonctions incompatibles retirées), `estimer` (plancher + mensuel + fonctions « sur devis »,
jauge), `lignesFiche`, `resumer` ; tests. Layouts `configurateur` (forme du type en variante compacte + un
module 2 × 2 relié par fonction cochée) et `formulaire` (une rangée par champ valide, l'ambre au neuvième).
`/tarifs` : hero en `cadran` (aiguille = plancher / max), titre déplié, configurateur en trois plaques
(radios au clavier, cases, maintenance, rédaction), Cadran recalculé, « Recevoir un devis » → `/contact?c=…` ;
quatre offres en entier (Cadran, inclusions, Fiche), suppléments, trois plans de maintenance + tableau mono,
ancres `#une-page` etc. ; la lecture passe sur ivoire. `/contact` : trois plaques, zod client + serveur,
erreurs annoncées (`role="status"`, `aria-invalid`, focus sur le premier champ fautif), RGPD explicite,
pot de miel, `projet` / `objet` / `c` pré-remplis, Fiche de la configuration, pile construite champ par
champ. `/api/contact` : zod, limitation 5 / 10 min par IP (mémoire d'instance), gabarits HTML + texte
échappés, Resend (demande + accusé) ; sans `RESEND_API_KEY` → 202 `envoye: false`, consigné serveur, et la
page `/contact/merci` le dit. `/api/contact/apercu` (hors production) rend les deux gabarits.

**Captures lues** : tarifs 6 états, contact 3, merci, 2 gabarits (150 entrées). Défauts vus et corrigés :
légendes des fieldsets dessinées sur le bord des plaques (flottées, plaques en flex) ; forme du
configurateur trop large pour son cadre et modules hors champ (variante compacte, colonne à 0,52) ; jauge du
hero coupée en bas. Non vérifié : l'envoi réel Resend (pas de clé ici) — le propriétaire ajoute
`RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` (domaine vérifié chez Resend) sur Vercel.

**Prochaine étape — phase 5** : `/realisations` (+ fiche, transition par élément partagé), `/services`
(+ fiche), `/solutions` (+ fiche, Salle des machines en grand), `/a-propos`, TRAVERSÉE (le canvas ne se
démonte jamais entre les pages : morph vers le layout de la page cible).
