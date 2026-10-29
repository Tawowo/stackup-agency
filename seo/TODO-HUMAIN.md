# TODO-HUMAIN — ce que seul le propriétaire peut fournir ou décider

Les champs ci-dessous sont aujourd'hui soit des `[… à compléter]` dans `src/config/site.ts`, soit des valeurs à confirmer. Rien n'est inventé.

## À fournir
- [ ] **Adresse exacte** (rue) : le site publie « 706 rue des Cormiers, 37340 Savigné-sur-Lathan » (JSON-LD, mentions légales, CGV, PDF). À confirmer ou à remplacer ; dire si elle doit rester masquée (domicile, pas d'accueil client).
- [ ] **SIREN, SIRET, code APE, date de début d'activité** (avis de situation INSEE) — `src/config/site.ts:96-99`, puis `npm run documents`.
- [ ] **Médiateur de la consommation** et **assurance RC pro** (assureur, couverture) — `site.ts:100-101`.
- [ ] **Horaires d'ouverture** (JSON-LD `openingHoursSpecification`, Google Business Profile).
- [ ] **Coordonnées GPS** de la commune ou du point de service (JSON-LD `geo`) : à défaut, centre de Savigné-sur-Lathan.
- [ ] **Profils** pour `sameAs` : fiche Google Business Profile, Malt, GitHub, PagesJaunes, Codeur (LinkedIn, Instagram et Facebook sont déjà renseignés).
- [ ] **Témoignages réels** avec accord écrit (nom, métier, ville) ; **vrais avis Google** une fois la fiche créée.
- [ ] **Chiffres de résultats réels** du Tennis Club Savigné-Gizeux (vitesse, visites, demandes) pour l'étude de cas ; accord du club pour le crédit « Site réalisé par Stackup Agency ».
- [ ] **Portrait et photos réelles** (atelier, projets) pour la page à propos.

## À décider (avant la Phase 3)
- [ ] Validation de la **liste de fusions d'articles** (§4 de `SEO-AUDIT.md`) avant toute redirection de plus de 10 URL.
- [ ] Liste des 20 métiers prioritaires (proposée dans le brief) et des 3 villes piliers pour les pages modèles.
- [ ] Villes lointaines (Rouen, Caen, Nantes…) : enrichir (« à distance, même prix ») ou fusionner dans la page région.
- [ ] Moment de la **fusion dans `main`** (désactive la page de maintenance de la production).
