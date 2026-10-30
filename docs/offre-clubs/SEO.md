# Offre clubs — étude de mots-clés et correspondance mot-clé → page

Méthode : aucun accès à un outil de volumes (Keyword Planner, Search Console du site) depuis cet environnement. La liste ci-dessous est un **découpage par intention**, établi par raisonnement sur la façon dont un président, un trésorier ou un secrétaire de club cherche. Les volumes et la difficulté restent à renseigner après deux ou trois mois de Search Console. **Une seule page par intention** : une variante de formulation s’ajoute à la page, jamais une page de plus.

## Intentions nationales (toute la France)
| Intention (requêtes types) | Page cible | Type |
|---|---|---|
| site internet club de tennis · logiciel gestion club de tennis · logiciel association sportive tennis · application club de tennis | `/clubs-de-tennis` | offre |
| site internet pour club de tennis · créer le site d’un club · modèle de site de club de tennis | `/clubs-de-tennis/site-internet` | formule |
| logiciel de gestion de club · gestion adhérents club de tennis · logiciel bureau association sportive | `/clubs-de-tennis/logiciel-de-gestion` | formule |
| prix logiciel club de tennis · tarif site club de tennis · coût gestion club | `/clubs-de-tennis/tarifs` | transactionnel |
| simulateur prix club de tennis · estimer le coût du site d’un club | `/clubs-de-tennis/simulateur` | outil |
| démo logiciel club de tennis · essayer logiciel club | `/clubs-de-tennis/demo` | transactionnel |
| inscription en ligne club de tennis · réinscription en ligne · formulaire d’adhésion club | `/clubs-de-tennis/fonctionnalites/adhesions-reinscriptions-en-ligne` | fonctionnalité |
| encaisser cotisation en ligne club · HelloAsso club de tennis | `/clubs-de-tennis/fonctionnalites/paiement-en-ligne-helloasso` | fonctionnalité |
| import export ADOC · fichier ADOC adhérents · licences manquantes | `/clubs-de-tennis/fonctionnalites/import-export-adoc` | fonctionnalité |
| gestion école de tennis · appel école de tennis · annulation pluie séance | `/clubs-de-tennis/fonctionnalites/ecole-de-tennis` | fonctionnalité |
| challenge interne tennis · classement interne club · saisie matchs FFT | `/clubs-de-tennis/fonctionnalites/challenge-interne-saisie-des-matchs` | fonctionnalité |
| convocation équipe tennis · disponibilités joueurs · covoiturage matchs | `/clubs-de-tennis/fonctionnalites/equipes-et-competitions` | fonctionnalité |
| tournoi interne club · événement club tennis inscriptions · bénévoles club | `/clubs-de-tennis/fonctionnalites/tournois-internes` | fonctionnalité |
| espace parent club de tennis · application membre club | `/clubs-de-tennis/fonctionnalites/espace-membre-et-parent` | fonctionnalité |
| mailing club de tennis · prévenir les adhérents · notification club | `/clubs-de-tennis/fonctionnalites/communication` | fonctionnalité |
| tableau de bord bureau club · automatiser relances adhésion | `/clubs-de-tennis/fonctionnalites/ma-journee-et-automatisations` | fonctionnalité |
| IA association sportive · rédiger actualité club · dossier subvention IA | `/clubs-de-tennis/fonctionnalites/assistant-ia` | fonctionnalité (option) |
| réservation court de tennis en ligne · réservation padel club | `/clubs-de-tennis/fonctionnalites/reservation-de-courts` | fonctionnalité (option) |
| statistiques site club · statistiques adhérents | `/clubs-de-tennis/fonctionnalites/statistiques` | fonctionnalité |
| site club de padel · logiciel club de padel · section padel club de tennis | `/clubs-de-tennis/padel` | thématique |
| logiciel club de pickleball · section pickleball | `/clubs-de-tennis/pickleball` | thématique |
| questions logiciel club · ADOC compatible · RGPD logiciel club | `/clubs-de-tennis/faq` | information |

## Guides (intentions d’information, une page chacune)
| Intention | Guide |
|---|---|
| comment créer le site de son club de tennis | `/clubs-de-tennis/guides/creer-le-site-de-son-club-de-tennis-guide-complet` |
| organiser les réinscriptions en ligne | `…/reinscriptions-en-ligne-club-de-tennis` |
| gérer une école de tennis, annuler pour la pluie | `…/gerer-une-ecole-de-tennis-groupes-appel-annulations` |
| exporter et importer ses adhérents depuis ADOC | `…/exporter-importer-adherents-adoc` |
| encaisser les cotisations avec HelloAsso | `…/encaisser-cotisations-en-ligne-helloasso-club` |
| créer un challenge interne | `…/creer-un-challenge-interne-tennis` |
| convoquer les équipes, gérer les disponibilités | `…/convoquer-ses-equipes-disponibilites-tennis` |
| RGPD pour un club de tennis | `…/rgpd-club-de-tennis` |
| financer le numérique de son club | `…/financer-le-numerique-de-son-club` |
| ouvrir une section padel ou pickleball | `…/ouvrir-section-padel-pickleball-gestion` |
| choisir un logiciel de gestion de club | `…/choisir-logiciel-de-gestion-club-de-tennis` |
| erreurs d’un site de club sportif | `…/site-internet-club-sportif-erreurs-a-eviter` |

## Intentions locales
| Intention | Page |
|---|---|
| site club de tennis Tours · logiciel club de tennis Indre-et-Loire · création site association sportive Indre-et-Loire · club de tennis Savigné-sur-Lathan | `/clubs-de-tennis/indre-et-loire` (la plus riche : communes, référence TCSG, rendez-vous en présentiel) |
| site club de tennis Centre-Val de Loire · logiciel club tennis région Centre | `/clubs-de-tennis/centre-val-de-loire` |
| … Bourges, Cher · Chartres, Eure-et-Loir · Châteauroux, Indre · Blois, Loir-et-Cher · Orléans, Loiret | `/clubs-de-tennis/cher`, `eure-et-loir`, `indre`, `loir-et-cher`, `loiret` |

## Règles de non-cannibalisation
- La grande page vise les têtes d’intention ; les pages de formule, de fonctionnalité et de guide ne reprennent pas sa requête principale dans leur h1.
- Les pages locales n’ont aucun contenu en commun (contrôlé : 12 % de segments communs au plus, `scripts/clubs/verifier-contenus.mjs locales`).
- La FAQ complète porte toutes les questions ; la page tarifs n’en affiche que 5 (le prix), la grande page 8 (les plus fréquentes).
- Aucun comparatif ni page « concurrent » : l’offre se définit par ce qu’elle fait (voir `/clubs-de-tennis/guides/choisir-logiciel-de-gestion-club-de-tennis`).

## Technique
Titre ≤ 60 caractères, description ≤ 155, un h1, fil d’Ariane et JSON-LD (Service + AggregateOffer « à partir de », SoftwareApplication, HowTo, FAQPage, BreadcrumbList, BlogPosting pour les guides) ; sitemap dédié `/sitemap-clubs.xml` ; `llms.txt` à jour ; paramètres `utm_*` mesurés sans cookie (`seo/KPIS.md`). Le vérificateur `npm run seo:check` couvre toutes ces pages.
