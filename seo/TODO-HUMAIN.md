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

## À relire / fournir (ajouts de la mission SEO complète)
- [ ] **Relire les faits rédigés sans accès en ligne** : calendrier de la facture électronique (article `logiciel-facturation-devis-auto`, page `/services/facture-electronique`, comparatif Batappli/Henrri) à confronter à impots.gouv.fr et economie.gouv.fr ; faits locaux des pages ville/zone ; règles des métiers réglementés (`avocat`, `osteopathe`, `kinesitherapeute`, `agence-immobiliere`).
- [ ] **Comparatifs de plateformes** (7 pages `/comparatif/*`) : aucun prix ni commission de tiers n’y figure ; relire les descriptions fonctionnelles des services cités (Squarespace, Jimdo, Planity, Treatwell, TheFork, Zenchef, Pixieset, Pictime, Batappli, Henrri, Uber Eats, Deliveroo, Solocal) car elles évoluent.
- [ ] **Titre changé** : l’article `no-show-reservation-restaurant` n’annonce plus « 80 % » (chiffre non sourcé).
- [ ] **Fiche Google Business** : après création, ajouter l’URL dans `sameAs` et les 12 publications de `seo/offsite/publications-google-business.md`.
- [ ] **Appel gratuit 30 min** : le formulaire `/contact?a=appel` envoie une demande ; brancher un agenda de prise de rendez-vous (outil de votre choix) si vous voulez la réservation directe.
- [ ] **Horaires** : tant qu’ils ne sont pas dans `src/config/site.ts`, aucun horaire n’est publié dans le JSON-LD.
- [ ] **Volumes de recherche** : `seo/keyword-map.csv` n’a ni volume ni difficulté (aucun accès à un outil de mots-clés) ; à renseigner depuis Search Console / Keyword Planner après 2 à 3 mois.
- [ ] **Budget JavaScript** (150 ko compressés demandés) : non atteint (245 à 320 ko selon la page, React/Next ≈ 115 ko, GSAP ≈ 47 ko) ; décision à prendre si le gain de score prime sur les animations.
- [ ] **Démos par métier** (captures dédiées) : non réalisées ; les pages métiers s’appuient sur des textes et cas types fictifs annoncés comme tels.
- [ ] **IndexNow** : à envoyer seulement après la mise en ligne (`node scripts/indexnow.mjs --envoyer`), sur votre accord.
- [ ] **Titre de l’article** `e-commerce-produits-locaux-terroir` : contient « garder 100 % de vos marges » ; à arbitrer (promesse commerciale).

## Offre clubs de tennis (`/clubs-de-tennis`) — à valider avant les premiers e-mails
- [ ] **Relecture juridique** des conditions de la plateforme (`/cgv-plateforme`) : préavis, mise en demeure, révision des prix, reconduction (information des non-professionnels, article L215-1 du Code de la consommation), juridiction, annexe de traitement des données. Paramètres : `CGV_PLATEFORME` dans `src/config/offre-clubs.ts`.
- [ ] **Sous-traitants et localisation des données** (annexe 1) : fournisseur de base de données, fournisseur d’IA (option), région d’hébergement de chaque service : `SOUS_TRAITANTS` dans `offre-clubs.ts`.
- [ ] **TVA** : confirmer « TVA non applicable, art. 293 B du CGI » (`src/config/company.ts`, commentaire TODO).
- [ ] **Témoignage du TCSG** : citation, nom, rôle, photo, accord écrit (`REFERENCE.temoignage`).
- [ ] **Nom du produit** : « Stackup Club » est un nom de travail (`PRODUCT_NAME`).
- [ ] **Liens directs de la démo** par écran (`DEMO_ECRANS`) et captures réelles de la démo si vous le souhaitez.
- [ ] **Faits locaux** des pages départementales (Cher, Eure-et-Loir, Indre, Loir-et-Cher, Loiret, Indre-et-Loire) : rédigés de mémoire, aucun chiffre ; à relire.
- [ ] **Médiateur de la consommation** et **assurance RC pro** (toujours à compléter).
- [ ] **Liste de suppression** de la prospection : à tenir (`/desinscription` envoie un e-mail à chaque opposition).
- [ ] **Premier envoi** : liens avec `?utm_source=email&utm_medium=prospection&utm_campaign=<nom>` ; n’envoyer à aucun club tant que les points ci-dessus ne sont pas validés.
