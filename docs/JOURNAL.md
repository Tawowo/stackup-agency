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
