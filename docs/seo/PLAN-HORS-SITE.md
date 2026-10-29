# Plan hors site — à faire par Mathéo, dans cet ordre

Principe : **mêmes informations partout** (nom, adresse, téléphone, site). À copier-coller tel quel.

```
Nom      : Stackup Agency (Mathéo Reboul EI — Stackup Agency)
Adresse  : 706 rue des Cormiers, 37340 Savigné-sur-Lathan
Tél.     : 07 64 02 08 98
E-mail   : contact@stackup-agency.fr
Site     : https://stackup-agency.fr
```

## 1. Fiche Google Business Profile (priorité absolue)

C'est elle qui place Stackup dans la carte sur « agence web Tours ». Créer sur business.google.com, vérifier (courrier, appel ou vidéo selon ce que Google propose).

- **Type de fiche** : entreprise **à domicile avec zone de chalandise** (masquer l'adresse : c'est votre domicile). Zone : Tours, Joué-lès-Tours, Saint-Cyr-sur-Loire, Amboise, Chinon, Loches, Langeais, Bourgueil, Château-la-Vallière, Saumur, Angers, Le Mans, Blois + « Indre-et-Loire ».
- **Catégorie principale** (libellé exact à choisir dans la liste proposée) : « Concepteur de sites Web ».
- **Catégories secondaires** : « Service de marketing sur Internet », « Société de développement de logiciels », « Consultant en référencement (SEO) », « Consultant en informatique ». Pas plus de 4.
- **Services** (un par ligne, avec une phrase, sans prix en chiffres) : Création de site internet ; Refonte de site ; Référencement local ; Boutique en ligne ; Logiciel de gestion sur mesure ; Facture électronique ; Maintenance de site.
- **Description** (750 caractères max, à copier) :

> Stackup Agency est une agence web d'une personne, Mathéo Reboul, installée à Savigné-sur-Lathan, en Touraine. Je crée des sites internet, des boutiques en ligne et des outils de gestion sur mesure pour les artisans, commerçants, TPE et professions libérales d'Indre-et-Loire et des départements voisins. Vous voyez une démo de votre page d'accueil avant de signer, le prix est écrit avant de commencer, et le code comme les données vous appartiennent à la fin. Rendez-vous chez vous ou en visio. Estimation de prix en ligne sur stackup-agency.fr.

- **Photos** : portrait de Mathéo, logo, captures des réalisations (tennis club), 1 photo de l'espace de travail. Pas de photo générique.
- **Horaires** : les vrais. Les renseigner aussi dans `src/config/site.ts` (champ `horaires`) pour les données structurées.
- **Lien du site** : `https://stackup-agency.fr/` ; lien « rendez-vous » : `/contact?objet=demo`.
- **Messagerie Google** : la désactiver si vous ne répondez pas dans la journée.

### Premier mois de publications (1 par semaine, 100 à 150 mots, 1 photo, bouton « En savoir plus »)

1. **Présentation** — « Stackup Agency, c'est moi : Mathéo, à Savigné-sur-Lathan. Des sites et des outils sur mesure pour les artisans et commerçants de Touraine. Démo avant de signer. » → /stackup-agency-en-bref
2. **Question utile** — « Votre site apparaît-il sur Google ? Testez-le gratuitement en une minute. » → /outils/audit-site
3. **Pour les artisans** — « Un devis qui part le jour même fait signer plus souvent. Modèle de devis gratuit. » → /outils/modele-devis
4. **Facture électronique** — « Êtes-vous prêt ? Une checklist de 5 blocs, gratuite. » → /outils/checklist-facture-electronique

Mois suivants : 1 publication par semaine tirée du plan de publication (`plan-publication.csv`), même titre que l'article.

### Obtenir des avis (méthode)

- Demander **à chaque client à la livraison**, de vive voix puis par un message court avec le **lien direct** d'avis (bouton « Obtenir plus d'avis » de la fiche) et un QR code sur la facture et la carte de visite.
- Ne **jamais** offrir de contrepartie, ne pas trier (Google interdit de ne demander qu'aux contents).
- **Répondre à tous les avis** sous 48 h, avec le prénom du client et un détail du projet.
- Premier objectif réaliste : tennis club, clients de démonstration, partenaires locaux qui vous connaissent réellement.

## 2. Annuaires et profils (informations identiques)

| Où | À faire | Texte |
|---|---|---|
| Bing Places | Importer la fiche Google | idem Google |
| Apple Business Connect | Créer la fiche | idem Google |
| Facebook / Instagram / LinkedIn | Page entreprise à jour (déjà créées : vérifier nom, adresse, site) | Description Google + lien |
| Pages Jaunes (pagesjaunes.fr) | Fiche gratuite « activité à domicile » | idem Google |
| CCI Touraine | Annuaire des entreprises et club d'entreprises | Description courte |
| Mairie de Savigné-sur-Lathan | Demander l'ajout à l'annuaire des entreprises de la commune | Nom, activité, site |
| Communauté de communes Touraine Ouest Val de Loire | Annuaire ou lettre des entreprises (se renseigner auprès du service économique) | idem |
| Malt, Codeur.com | Profil freelance (compléter avec le même nom et site) | Description courte |
| France Num (francenum.gouv.fr) | Profil prestataire si éligible | idem |
| Initiative Touraine / Réseau Entreprendre / réseaux d'affaires locaux (BNI, clubs) | Se présenter, être référencé | Description courte |

Règle : ne s'inscrire que dans les annuaires **gratuits**, **locaux** ou **thématiques web**. Aucun achat de liens, aucun annuaire « SEO » de masse.

## 3. Liens entrants réalistes (par ordre de facilité)

1. **Tennis club de Savigné-Gizeux** : mention « Site réalisé par Stackup Agency » en pied de page, lien vers `/realisations`.
2. **Clients** (dès la mise en ligne) : « Réalisé par Stackup Agency » dans le pied de page, avec leur accord, lien vers `/`. Proposer dans le devis.
3. **Partenaires locaux** : expert-comptable, photographe, imprimeur, graphiste : lien réciproque sur une page « partenaires ».
4. **Mairie et intercommunalité** : lien depuis l'annuaire des entreprises locales.
5. **IUT de Tours** (département informatique / métiers du multimédia) : proposer une intervention ou une offre de stage ; lien depuis leur page partenaires.
6. **La Nouvelle République** : un communiqué court (« un développeur de Savigné-sur-Lathan crée des sites et des outils pour les artisans de Touraine »), à envoyer à la rubrique locale du secteur.
7. **Associations et clubs** que vous soutenez : lien « partenaire » en échange d'un coup de main réel.
8. **Éditeurs d'outils que vous utilisez** (témoignage d'utilisateur si leur page « clients » l'accepte).

## 4. Calendrier de publication — 12 mois, 2 contenus par semaine

Voir `docs/seo/plan-publication.csv` : 104 créneaux (mardi et vendredi, à partir du 10 novembre 2026), classés par potentiel. Chaque ligne donne la requête principale et la grappe visée. Avant publication : relire, ajouter 2 liens internes, mettre à jour la date.

## 5. Mesure

Suivi mensuel de 100 requêtes dans `docs/seo/suivi.csv` (Search Console → Performances → filtre sur la requête). Compter aussi, dans les journaux du serveur, les événements `mesure` : vues, `clic_telephone`, `clic_demo`, `estimation_lancee`, `contact_envoye`.

## Les 5 actions à faire en premier

1. Créer et vérifier la fiche Google Business Profile (§ 1) et la remplir complètement.
2. Remplacer les champs `[… à compléter]` de `src/config/site.ts` par les données de l'avis de situation INSEE (SIREN, SIRET, APE, début d'activité) puis lancer `npm run documents`.
3. Fusionner la branche V5 dans `main` : tant que la production sert le mode maintenance, rien de ce travail n'est visible de Google.
4. Demander le lien « Site réalisé par Stackup Agency » au tennis club et poser le premier avis Google avec lui.
5. Inscrire le nouveau sitemap `https://stackup-agency.fr/sitemap.xml` dans la Search Console et demander la validation des correctifs.
