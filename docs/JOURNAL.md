# Journal du chantier — Stackup Agency V5

Court par obligation (≤ 150 lignes).

## 2026-10-13 — Phase 0 : scaffold + Stack Engine ✅

**Départ.** L'ancien site et une refonte antérieure sont dans `ancien/` (git mv ; carrière de logo, images,
données, articles, configurateur, LogoMarque) à supprimer après la phase 6.

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
**Superposition** : 1,05 % / 1,08 % (seuil 2 %). **Cadence SwiftShader** : 16 fps max ici, à mesurer sur GPU.

**Dépendances hors liste** : `@tweakpane/core` (types, dev), `sharp` (logo-check, AVIF, dev).

## 2026-10-13 — Phase 1 : le hero (moment 00) ✅

**Fait.** Store : `projection`, `pose`, `scrub`, `target` (paire A/B explicite). Lenis sur `gsap.ticker` +
ScrollTrigger, barre de progression. Nav (LogoMarque, menu mobile en lamelles `inert`, focus piégé). Action,
Cote. OUVERTURE : épinglée 150 vh (120 mobile), titre déplié par mots, actions, cotes ; le scroll écrit uMorph
(logo → pile), ortho → perspective, épaisseur × 2,5. Repli 2D 100 % CSS (`--su-p`). Mouvement réduit : logo
figé, pas d'épinglage. Six pages de chantier.

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

**Captures lues** : 15 layouts sur `/lab`, 59 états de l'accueil (100 entrées ; démos injoignables d'ici,
AVIF repris de l'ancien site). Défauts corrigés : strates
vues de face ; scène vide au moment 01 → registre des boîtes ; pile du hero écrasant la paire → propriétaire
`moment` ; maquette décalée → blocs communs ; lamelles non refermées → phase dérivée de la progression ;
snap inertiel de la pellicule ; triggers faussés en mouvement réduit → plus d'épinglage.

**Corrections avant la phase 3** (captures avant dans `docs/qa/shots/avant/`) : zone d'exclusion du titre
(`useExclusion`, ResizeObserver) passée au vertex shader, les plaques en vol la contournent ; variante
`portrait` de `multi` (rien ne sort du cadre à 390) ; pellicule allongée. `half` réservé en GLSL corrigé.

## 2026-10-13 — Phase 3 : accueil, seconde moitié (moments 05-09) ✅

**Fait.** Layouts purs + tests : `machines` (12 nœuds, arêtes, hub ambre, portrait), `cadran` (arc de 48
plaques, aiguille `params.aiguille`), `methode` (cinq groupes, `params.etape`). Isolation par moment, `calme`.
05 MODULES : douze solutions réelles, un bouton par nœud calé sur sa plaque, maquette animée par découpe,
`DemoSlot` vide non rendu, aucun ancien Laboratoire. 06 CADRAN : ivoire, quatre Plaques + Cadran, trois
engagements tracés en SVG, aiguille sur l'offre focalisée. 07 ASSEMBLAGE SÉQUENTIEL : cinq étapes, plaque
ambre pour la démo. 08 ATELIER : portrait à venir, accordéon natif, pile à l'arrêt. 09 DÉPART : champ
unique → `/contact?projet=…`. Footer, pages de chantier légales, `devIndicators` coupés.

**Captures lues** : 32 états (138 entrées). Défauts corrigés : trois états vides (`half` réservé en GLSL,
`ENTREES` importé d'un composant client, `COURT` utilisé avant sa déclaration) ; isolation des strates
qui dispersait le réseau ; bouton Caisse sous la maquette ; jauge minuscule ; étape 05 jamais franchie.
Notés : en mouvement réduit le logo figé passe derrière les nœuds (05) ; mobile : bandeau de 07 derrière 01.

**Vidéos.** L'enregistreur Playwright ne produit aucune trame sous SwiftShader et son ffmpeg n'a ni image2
ni VP9 : `scripts/videos.mjs` capture une trame JPEG par pas (simulation avancée par `__suSettle`), les envoie
en flux (image2pipe) en VP8 et garde une planche-contact (`planche-*`). Hors git, `npm run videos`.

**Vercel.** Preview en 404 : `vercel.json` (`"framework": "nextjs"`) était parti dans `ancien/`. Restauré,
plus `engines.node = 22.x`. vercel.app injoignable d'ici : état lu par l'API GitHub (`deployments`).

## 2026-10-13 — Phase 4 : tarifs + contact ✅

**Fait.** `src/lib/configuration.ts` (zod, `serialiser` / `deserialiser` `?c=t=outil;f=rdv;m=pro;r=4`,
`normaliser`, `estimer`, `lignesFiche`, `resumer` ; tests). Layouts `configurateur` et `formulaire`.
`/tarifs` : hero en `cadran`, configurateur en trois plaques (clavier), Cadran recalculé, « Recevoir un
devis » → `/contact?c=…`, quatre offres, suppléments, maintenance, lecture sur ivoire. `/contact` : zod
client + serveur, erreurs annoncées, RGPD, pot de miel, pré-remplissage, pile construite champ par champ.
`/api/contact` : limitation 5 / 10 min par IP, gabarits échappés, Resend ; sans clé → 202 `envoye: false`.

**Captures lues** : tarifs 6 états, contact 3, merci, 2 gabarits (150 entrées). Défauts vus et corrigés :
légendes des fieldsets dessinées sur le bord des plaques (flottées, plaques en flex) ; forme du
configurateur trop large pour son cadre et modules hors champ (variante compacte, colonne à 0,52) ; jauge du
hero coupée en bas. Non vérifié : l'envoi réel Resend (pas de clé ici) — le propriétaire ajoute
`RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` (domaine vérifié chez Resend) sur Vercel.

## 2026-10-13 — Refonte de l'univers : « La Fabrique » (avant la phase 5) ✅ (à relire sur GPU)

Référence lue : `reference/hydreaux-scan/` (hors git, exclu de tsc/eslint), livré par la même agence. Repris :
`probeLens` interpolée sol / profondeur, sol en bruit fractal avec front `fwidth`, flux GPU en `DataTexture`,
chronologie pure pilotée par le scroll, `DepthRail`. Le moteur et les neuf moments restent ; le monde change.

**Plan (10 lignes).** 1 tokens navy `#0B1E36 → #102A4A`, plaques claires + ambre sur fond sombre, curseur
supprimé · 2 ciel plein écran (dégradé, halo, vignette) et caméra inclinée (tangage 8°) · 3 sol d'atelier
(grille, ombre projetée, torche, dissolution fractale) · 4 flux GPU le long de la pile · 5 code vivant
(nos sources) derrière · 6 lumière ambre depuis la plaque ambre + poussière · 7 traversée (glissement
amorti, sol dissous puis reformé, rail cliquable, inclinaison du téléphone) · 8 bascule d'une plaque au clic
(face produit) · 9 calibrage scrub pur, captures p = 0…1 · 10 `/lab` d'abord, puis les neuf moments, vidéos.

**Fait.** `src/webgl/monde/` : `Ciel` (quad en clip space, halo calé sur `uStackEcran`), `Sol` (plan posé par
le vertex shader à `uSolY` = bas de la forme − marge, maille bornée 40-130 px, flaque de lumière, liseré de
torche, dissolution `uDissolve` avec front ambre), `Flux` (10 chemins × 128 pas en DataTexture, comètes
cohérentes par chemin, `uFlowTime` accéléré par la vitesse de scroll, déviation autour du pointeur, allumage
par la torche, hauteur calée sur `uBox`), `CodeVivant` (160 lignes de `plates.tsx`, `plate.ts`… peintes
en CanvasTexture, trois plans, tête d'écriture, défilement avec l'étage, dissolution fractale), `Lampe`
(halo billboard, faisceau vers le sol, poussière dans le faisceau). Ombre désormais projetée sur le sol.
`Scene` : tangage amorti, caméra orbitale, glissement amorti de la pile vers sa boîte (le trajet dissout le
sol), rayon du pointeur → `uProbe` (sol) / `uProbeDeep` (plan de la pile), clic → `basculer()` (attribut
`aFlip`, face produit procédurale au dos), `uLight` déplacé par `deviceorientation` (permission iOS au premier
toucher). Plaques : `mix(NAVY, CLAIR, uNuit)`, exposition contenue. Calibrage : `arriverParScroll`
(rampe « haut à 100 % → 55 % », forme commise à la fin, retour identique), `Lumiere` (nuit par frontières
`data-nuit`, rampe de 50 vh, scroll seul), étapes de la méthode en paire par tranche, pellicule continue
(bande de cadres par parité, accent interpolé, `largeur` mesurée), cadran, seuil, titres et tracés en scrub.
Rail de profondeur (`Rail.tsx`, IntersectionObserver −45 % / −50 %, Lenis au clic, gouttière gauche
≥ 1360 px). Ivoire sur 02, 06, 08. `__suSettle(n)` : la simulation avance sans rendre, pour des captures
déterministes sous SwiftShader (1-3 i/s) ; utilisé par shots, shot-accueil et videos.

**Captures lues** : 46 états du lab, 83 de l'accueil (129 entrées, rapport réécrit). Défauts vus et corrigés :
dissolution inversée (sonde `sonde-monde.mjs`), lampe calée sur la plaque ambre réelle de chaque forme, code
vivant à taille de lecture, HUD du lab qui faussait le viewport mobile, repli 2D noir hors de l'accueil (CSS
global, plaques claires), sol en bande sombre derrière le seuil (effacé sous une petite forme), tour trop
haute en portrait, cadre de la pellicule sur le texte mobile (× 0,7), Cadran arrêté entre deux chiffres
(quantifié), étape 02 de la méthode non révélée (étape par position de carte), page de la méthode sous la
nav (× 0,85), logo figé géant en mouvement réduit (× 0,6), flux gris sur ivoire. **Superposition** (tangage
8°) : 1,39 % (seuil 2 %). Seconde passe : approche des strates en rampe de scroll (la tour se replie en pile de
lamelles, états `01-arrivee-*`), hero qui reprend sa paire au retour, sol et poussière effacés sous une petite
forme ou quand le sol monte au-dessus du centre, cadre mobile de la pellicule centré sur la capture (× 0,6).
Vidéos regénérées et lues (planches-contact) : traversée continue, aucune coupure ; mi-rampe de lumière grise
→ pointe ambrée ; arc réduit pendant l'approche. Ouverts : plaques en vol qui frôlent la nav (00 p = 0,8),
bandeau de 07 derrière les étapes sur mobile, logo de l'atelier coupé à l'entrée, torche discrète (GPU).

**Pas fait / à vérifier sur un vrai GPU** : cadence réelle avec sol + flux + code + poussière (palier
`medium` : 600 flux, 220 poussières) ; le rendu des points (`gl_PointSize`) sur Safari ; l'inclinaison
du téléphone (non testable ici). Le rail n'a pas d'étiquettes permanentes sous 1680 px (gouttière de 24 px).

**Prochaine étape** : phase 5 (réalisations, services, solutions, à-propos, TRAVERSÉE), puis 6-7.
