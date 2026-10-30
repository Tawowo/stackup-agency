/**
 * CATALOGUE DES PAGES DE L'OFFRE « CLUBS DE TENNIS » — adresses, noms courts et requête principale de chaque page.
 * Source du plan du site, du sitemap, du maillage interne et de la table mot-clé → page (docs/offre-clubs/SEO.md).
 * Une seule page par intention de recherche.
 */
import { RACINE_CLUBS as R } from '../../config/offre-clubs.ts'

export interface EntreeCatalogue {
  chemin: string
  nom: string
  groupe: 'principal' | 'formule' | 'fonctionnalite' | 'local' | 'sport' | 'guide' | 'legal'
  motCle: string
}

export const PAGES_PRINCIPALES: EntreeCatalogue[] = [
  { chemin: R, nom: 'Clubs de tennis : site et logiciel', groupe: 'principal', motCle: 'site et logiciel pour club de tennis' },
  { chemin: `${R}/tarifs`, nom: 'Tarifs', groupe: 'principal', motCle: 'prix logiciel club de tennis' },
  { chemin: `${R}/simulateur`, nom: 'Simulateur de prix', groupe: 'principal', motCle: 'combien coûte un site de club de tennis' },
  { chemin: `${R}/demo`, nom: 'La démo', groupe: 'principal', motCle: 'démo logiciel club de tennis' },
  { chemin: `${R}/faq`, nom: 'Questions fréquentes', groupe: 'principal', motCle: 'questions logiciel gestion club de tennis' },
  { chemin: `${R}/guides`, nom: 'Guides pour les clubs', groupe: 'principal', motCle: 'guide gestion club de tennis' },
]

export const PAGES_FORMULES: EntreeCatalogue[] = [
  { chemin: `${R}/site-internet`, nom: 'Le site du club', groupe: 'formule', motCle: 'site internet club de tennis' },
  { chemin: `${R}/logiciel-de-gestion`, nom: 'Le logiciel du bureau', groupe: 'formule', motCle: 'logiciel gestion club de tennis' },
]

const F = `${R}/fonctionnalites`
export const PAGES_FONCTIONNALITES: EntreeCatalogue[] = [
  { chemin: `${F}/site-modifiable`, nom: 'Le site modifiable par le club', groupe: 'fonctionnalite', motCle: 'modifier le site de son club soi-même' },
  { chemin: `${F}/adhesions-en-ligne`, nom: 'Adhésions et réinscriptions en ligne', groupe: 'fonctionnalite', motCle: 'inscription en ligne club de tennis' },
  { chemin: `${F}/paiement-helloasso`, nom: 'Paiement en ligne HelloAsso', groupe: 'fonctionnalite', motCle: 'paiement cotisation club de tennis HelloAsso' },
  { chemin: `${F}/import-export-adoc`, nom: 'Import et export des fichiers ADOC', groupe: 'fonctionnalite', motCle: 'import export ADOC adhérents' },
  { chemin: `${F}/ecole-de-tennis`, nom: 'École de tennis', groupe: 'fonctionnalite', motCle: 'logiciel gestion école de tennis' },
  { chemin: `${F}/challenge-interne`, nom: 'Challenge interne et saisie des matchs', groupe: 'fonctionnalite', motCle: 'challenge interne tennis classement' },
  { chemin: `${F}/equipes-et-competitions`, nom: 'Équipes et compétitions', groupe: 'fonctionnalite', motCle: 'gestion équipes tennis convocations' },
  { chemin: `${F}/tournois-internes`, nom: 'Tournois internes', groupe: 'fonctionnalite', motCle: 'organiser un tournoi interne de tennis' },
  { chemin: `${F}/espace-membre-et-parent`, nom: 'Espace membre et parent', groupe: 'fonctionnalite', motCle: 'application membres club de tennis' },
  { chemin: `${F}/communication`, nom: 'Communication', groupe: 'fonctionnalite', motCle: 'communiquer avec les adhérents d’un club' },
  { chemin: `${F}/ma-journee-et-automatisations`, nom: 'Ma journée et automatisations', groupe: 'fonctionnalite', motCle: 'automatiser la gestion d’un club de tennis' },
  { chemin: `${F}/assistant-ia`, nom: 'Assistant IA du club', groupe: 'fonctionnalite', motCle: 'intelligence artificielle club sportif' },
  { chemin: `${F}/reservation-de-courts`, nom: 'Réservation de courts', groupe: 'fonctionnalite', motCle: 'réservation de courts de tennis en ligne' },
  { chemin: `${F}/statistiques`, nom: 'Statistiques', groupe: 'fonctionnalite', motCle: 'statistiques adhérents club de tennis' },
]

export const PAGES_LOCALES: EntreeCatalogue[] = [
  { chemin: `${R}/centre-val-de-loire`, nom: 'Centre-Val de Loire', groupe: 'local', motCle: 'logiciel club de tennis Centre-Val de Loire' },
  { chemin: `${R}/indre-et-loire`, nom: 'Indre-et-Loire', groupe: 'local', motCle: 'site club de tennis Indre-et-Loire' },
  { chemin: `${R}/cher`, nom: 'Cher', groupe: 'local', motCle: 'site club de tennis Cher' },
  { chemin: `${R}/eure-et-loir`, nom: 'Eure-et-Loir', groupe: 'local', motCle: 'site club de tennis Eure-et-Loir' },
  { chemin: `${R}/indre`, nom: 'Indre', groupe: 'local', motCle: 'site club de tennis Indre' },
  { chemin: `${R}/loir-et-cher`, nom: 'Loir-et-Cher', groupe: 'local', motCle: 'site club de tennis Loir-et-Cher' },
  { chemin: `${R}/loiret`, nom: 'Loiret', groupe: 'local', motCle: 'site club de tennis Loiret' },
]

export const PAGES_SPORTS: EntreeCatalogue[] = [
  { chemin: `${R}/padel`, nom: 'Clubs avec padel', groupe: 'sport', motCle: 'site et logiciel club de padel' },
  { chemin: `${R}/pickleball`, nom: 'Clubs avec pickleball', groupe: 'sport', motCle: 'logiciel club de pickleball' },
]

const G = `${R}/guides`
export const PAGES_GUIDES: EntreeCatalogue[] = [
  { chemin: `${G}/creer-le-site-de-son-club-de-tennis`, nom: 'Créer le site de son club de tennis', groupe: 'guide', motCle: 'créer le site de son club de tennis' },
  { chemin: `${G}/reinscriptions-en-ligne`, nom: 'Organiser les réinscriptions en ligne', groupe: 'guide', motCle: 'réinscription club de tennis en ligne' },
  { chemin: `${G}/gerer-une-ecole-de-tennis`, nom: 'Gérer une école de tennis', groupe: 'guide', motCle: 'gérer une école de tennis' },
  { chemin: `${G}/exporter-importer-adherents-adoc`, nom: 'Exporter et importer ses adhérents depuis ADOC', groupe: 'guide', motCle: 'exporter adhérents ADOC' },
  { chemin: `${G}/encaisser-cotisations-helloasso`, nom: 'Encaisser les cotisations avec HelloAsso', groupe: 'guide', motCle: 'encaisser cotisations HelloAsso club' },
  { chemin: `${G}/creer-un-challenge-interne`, nom: 'Créer un challenge interne', groupe: 'guide', motCle: 'créer un challenge interne tennis' },
  { chemin: `${G}/convoquer-ses-equipes`, nom: 'Convoquer ses équipes', groupe: 'guide', motCle: 'convoquer équipe tennis disponibilités' },
  { chemin: `${G}/rgpd-club-de-tennis`, nom: 'RGPD pour un club de tennis', groupe: 'guide', motCle: 'RGPD club de tennis' },
  { chemin: `${G}/financer-le-numerique-du-club`, nom: 'Financer le numérique de son club', groupe: 'guide', motCle: 'subvention numérique club sportif' },
  { chemin: `${G}/ouvrir-une-section-padel-ou-pickleball`, nom: 'Ouvrir une section padel ou pickleball', groupe: 'guide', motCle: 'ouvrir une section padel club de tennis' },
]

export const PAGES_LEGALES_CLUBS: EntreeCatalogue[] = [
  { chemin: '/cgv-plateforme', nom: 'CGV de la plateforme', groupe: 'legal', motCle: 'conditions générales plateforme club' },
  { chemin: '/desinscription', nom: 'Se désinscrire des e-mails', groupe: 'legal', motCle: 'désinscription' },
]

export const CATALOGUE_CLUBS: EntreeCatalogue[] = [...PAGES_PRINCIPALES, ...PAGES_FORMULES, ...PAGES_FONCTIONNALITES, ...PAGES_LOCALES, ...PAGES_SPORTS, ...PAGES_GUIDES, ...PAGES_LEGALES_CLUBS]

export const nomDe = (chemin: string) => CATALOGUE_CLUBS.find((p) => p.chemin === chemin)?.nom ?? chemin
