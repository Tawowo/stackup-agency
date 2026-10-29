# OFFSITE-ACTIONS — tout ce qui se fait hors du site, dans l’ordre

À faire par Mathéo (rien ne s’automatise sans compte propriétaire). Le détail des données d’identité et la méthode de base sont dans `docs/seo/PLAN-HORS-SITE.md` ; les textes prêts à copier sont dans `seo/offsite/`.
Règle d’or : **mêmes nom, adresse, téléphone, site partout** (bloc NAP ci-dessous). Aucun achat de lien, aucun annuaire « SEO » de masse, aucun faux avis.

```
Nom      : Stackup Agency
Adresse  : 706 rue des Cormiers, 37340 Savigné-sur-Lathan (à confirmer, voir TODO-HUMAIN)
Tél.     : 07 64 02 08 98   ·   E-mail : contact@stackup-agency.fr
Site     : https://stackup-agency.fr
Zone     : basé en Touraine, intervient à Tours et dans toute la région, partout en France à distance
```

## Étape 0 — avant tout (jour 1)
- [ ] Fusion de la branche dans `main` (sinon la production sert la page de maintenance et rien n’est visible).
- [ ] Search Console : propriété « domaine », envoyer `https://stackup-agency.fr/sitemap.xml` (c’est un index : 9 sitemaps par type), demander la validation des correctifs.
- [ ] Bing Webmaster Tools : importer depuis Search Console, soumettre le même sitemap.
- [ ] `node scripts/indexnow.mjs --envoyer` une fois la production à jour (simulation d’abord sans option).
- [ ] Compléter `src/config/site.ts` (SIREN, SIRET, APE, médiateur, assurance, horaires) puis `npm run documents`.

## Étape 1 — Google Business Profile (semaine 1)
- [ ] Créer la fiche sur business.google.com. Type : **entreprise à domicile avec zone de chalandise**, adresse masquée sauf décision contraire.
- [ ] Catégorie principale : « Concepteur de sites Web ». Secondaires, à choisir parmi celles proposées : service de marketing sur Internet, développeur de logiciels, consultant en référencement, consultant en informatique. Libellés à vérifier dans l’interface (Google les renomme).
- [ ] Zone de service : Tours, Joué-lès-Tours, Saint-Cyr-sur-Loire, Saint-Pierre-des-Corps, Chambray-lès-Tours, Amboise, Langeais, Bourgueil, Chinon, Saumur, Loches, Château-la-Vallière, Blois (liste = pages `/agence-web/<ville>` du site ; ne pas dépasser ce que vous couvrez vraiment).
- [ ] Services (un par ligne, une phrase, **sans prix en chiffres**) : création de site internet, refonte de site, boutique en ligne, logiciel de gestion sur mesure, référencement local, maintenance. Les prix « à partir de » restent sur `/tarifs`.
- [ ] Description (≤ 750 caractères) : voir `seo/offsite/textes-a-copier.md`, § 1.
- [ ] Photos réelles : portrait, logo, captures de réalisations (Tennis Club, démo hub), espace de travail. Pas d’image générique.
- [ ] Lien site `https://stackup-agency.fr/` ; lien rendez-vous `https://stackup-agency.fr/contact?a=appel` ; questions-réponses : y publier 6 questions de la FAQ.
- [ ] Publier 1 post par semaine : les 12 premiers sont rédigés dans `seo/offsite/publications-google-business.md`.
- [ ] Renseigner l’URL de la fiche dans `src/config/site.ts` (`sameAs`) pour le JSON-LD.

## Étape 2 — avis (en continu)
- [ ] Demander un avis **à chaque client à la livraison**, de vive voix puis par message (modèles dans `textes-a-copier.md`, § 4), avec le lien direct et un QR code.
- [ ] Ne rien offrir en échange, ne pas trier les clients, répondre à tous les avis sous 48 h.
- [ ] Premier avis : avec le Tennis Club Savigné-Gizeux, s’il est d’accord. Aucun avis n’est affiché sur le site tant qu’il n’est pas réel et publié par Google.

## Étape 3 — profils et annuaires (semaines 2–3, textes identiques)
- [ ] Bing Places (import Google), Apple Business Connect, Pages Jaunes (fiche gratuite), France Num si éligible.
- [ ] LinkedIn, Instagram, Facebook : nom, description, lien, bannière à jour (déjà créés ; vérifier le NAP).
- [ ] Malt, Codeur.com : profil complet, mêmes mots, lien vers `/realisations`. GitHub : profil avec lien (facultatif).
- [ ] Annuaires locaux gratuits : mairie de Savigné-sur-Lathan, communauté de communes Touraine Ouest Val de Loire, CCI Touraine.
- [ ] Une fois créés, ajouter chaque profil dans `sameAs` (`src/lib/schema.ts` lit `SITE.social`) et signaler dans le journal.

## Étape 4 — liens entrants (mois 1–6, par ordre de facilité)
1. Tennis Club Savigné-Gizeux : « Site réalisé par Stackup Agency » en pied de page, lien vers `/realisations/tennis-club-savigne-gizeux`.
2. Chaque client, à la mise en ligne : mention en pied de page avec accord, à prévoir dans le devis.
3. Partenaires locaux (comptable, photographe, imprimeur, graphiste) : lien réciproque sur une page « partenaires » ; modèle de message dans `textes-a-copier.md`, § 5.
4. Mairie et intercommunalité, CCI Touraine, clubs d’entreprises, associations soutenues.
5. IUT de Tours (offre de stage ou d’intervention), presse locale (communiqué court : voir § 6).
6. Annuaires d’outils/blogs : donner le flux `https://stackup-agency.fr/blog/feed.xml`.
7. Ressources citables : proposer `/outils/audit-site` et `/ressources/cahier-des-charges` aux sites de réseaux d’entrepreneurs locaux (utiles, gratuits, sans formulaire obligatoire).

## Étape 5 — visibilité dans les IA (continu)
- [ ] Garder `/llms.txt`, `/stackup-agency-en-bref` et la page `/a-propos` à jour ; une seule présentation d’entreprise, la même partout.
- [ ] Politique des robots IA : voir `seo/README.md`.
- [ ] Une fois par trimestre, poser 10 questions types dans les assistants (« agence web Tours », « combien coûte un site pour un artisan ») et noter si Stackup est cité : colonne dans `docs/seo/suivi.csv`.

## Étape 6 — mesure (mensuelle, 30 minutes)
- [ ] Search Console : 100 requêtes suivies (`docs/seo/suivi.csv`), pages et pays. Voir `seo/KPIS.md`.
- [ ] Google Business : appels, itinéraires, clics site, avis. Noter dans `KPIS.md`.
- [ ] `npm run seo:report` : contrôle des pages et événements de conversion.

## Ne pas faire
Achat de liens ou d’avis, annuaires de masse, articles invités sans lien éditorial réel, pages « ville » en série, comparaison chiffrée avec un concurrent, promesse de position sur Google.
