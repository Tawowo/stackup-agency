/**
 * CE QUI EST INCLUS, NON INCLUS ET SUR DEVIS — listes lues par la grande page, la page tarifs, le simulateur et l'e-mail.
 * Aucun montant n'est écrit ici : les nombres viennent de pricing.ts (fonctions `conditions…`).
 */
import { PRICING } from './pricing.ts'

export const SITE_INCLUS: { titre: string; texte: string }[] = [
  { titre: 'Un thème haut de gamme aux couleurs du club', texte: 'Au choix parmi 2 ou 3 thèmes : logo, couleurs, typographies, animations, mode sombre, parfait sur téléphone.' },
  { titre: 'Jusqu’à 15 pages créées à la mise en place', texte: 'Accueil, le club, installations, tarifs et adhésion, école de tennis, adultes, équipes et compétitions, actualités, agenda, galerie, partenaires, documents, FAQ, contact, essai gratuit. Les pages légales sont incluses en plus.' },
  { titre: 'Un éditeur pour modifier seul', texte: 'Le club change tous les textes, images, liens, menus et documents, et crée de nouvelles pages sans limite.' },
  { titre: 'Adhésion en ligne et paiement HelloAsso', texte: 'Formulaire d’adhésion avec pièces jointes et bouton de paiement HelloAsso.' },
  { titre: 'Actualités, agenda, galerie, documents', texte: 'Agenda abonnable, galerie respectant le droit à l’image, documents à télécharger, FAQ, bandeau d’information urgent.' },
  { titre: 'Padel et pickleball', texte: 'Des sections dédiées si le club propose ces pratiques.' },
  { titre: 'Référencement de base', texte: 'Le club est trouvé quand on tape son nom : titres, plan du site, données structurées.' },
  { titre: 'Statistiques de visite respectueuses de la vie privée', texte: 'Sans cookie de suivi publicitaire.' },
  { titre: 'Accompagnement', texte: 'Recueil des demandes et prise en main, dans la limite des heures incluses de votre catégorie.' },
]

export const LOGICIEL_INCLUS: { titre: string; texte: string }[] = [
  { titre: 'Ma journée', texte: 'Ce qui demande une action aujourd’hui, pour chaque membre du bureau.' },
  { titre: 'Adhérents et familles', texte: 'Rôles et droits par personne : président, trésorier, secrétaire, enseignant, capitaine, bénévole…' },
  { titre: 'Adhésions et réinscriptions en ligne', texte: 'Suivi des dossiers et relances automatiques.' },
  { titre: 'Paiement en ligne via HelloAsso', texte: 'Suivi automatique des paiements ; l’argent va directement sur le compte du club, jamais chez nous.' },
  { titre: 'Trésorerie simple', texte: 'Et export pour le trésorier.' },
  { titre: 'Import et export des fichiers ADOC', texte: 'Avec contrôle des licences manquantes.' },
  { titre: 'École de tennis', texte: 'Groupes, appel sur téléphone, annulations et reports, progression Galaxie Tennis.' },
  { titre: 'Planning global', texte: 'Des courts et des activités.' },
  { titre: 'Challenge interne', texte: 'Classement, badges, saisie des matchs au format FFT, Hall of Fame.' },
  { titre: 'Équipes et compétitions', texte: 'Disponibilités, compositions, convocations, covoiturage.' },
  { titre: 'Tournois internes et événements', texte: 'Avec inscriptions.' },
  { titre: 'Bénévolat', texte: 'Missions, inscriptions, compteur d’heures.' },
  { titre: 'Communication', texte: 'Par e-mail et par notification sur le téléphone (pas de SMS).' },
  { titre: 'Documents, statistiques, journal', texte: 'Le journal garde la trace de qui a fait quoi.' },
  { titre: 'Espace membre et parent', texte: 'Installable comme une application sur le téléphone.' },
  { titre: '5 automatisations prêtes à l’emploi', texte: 'Relances, rappels, convocations…' },
  { titre: 'Import des membres depuis une source', texte: 'Export ADOC ou tableur.' },
]

export const ABONNEMENT_INCLUS: string[] = [
  'Hébergement, nom de domaine, https, sauvegardes quotidiennes, surveillance et sécurité.',
  'Mises à jour et nouvelles fonctionnalités de la formule, sans supplément.',
  'Maintenance et correction des anomalies.',
  `Support par e-mail ou formulaire, réponse sous ${PRICING.supportJoursOuvres} jours ouvrés.`,
  'Comptes du bureau et des enseignants illimités, membres illimités dans la catégorie.',
  'E-mails automatiques dans un usage normal d’association.',
  'Stockage selon la catégorie.',
  'Export complet des données à tout moment.',
  'Contrat de traitement des données personnelles (RGPD).',
]

export const ABONNEMENT_NON_INCLUS: string[] = [
  'Les heures d’accompagnement au-delà des heures incluses.',
  'Les développements propres à un seul club.',
  'Les options.',
  'Les frais de paiement en ligne : HelloAsso est gratuit pour le club ; avec un autre prestataire, les frais sont à la charge du club.',
  'La saisie du contenu à la place du club.',
  'Les SMS : non proposés. Le club utilise les e-mails, les notifications ou ses propres groupes de messagerie.',
  'La gestion des accès physiques aux courts (codes, serrures) : non proposée, elle reste gérée par le club.',
]

/** Besoins qui passent en devis sur mesure (cases du simulateur et liste de la page tarifs). */
export const HORS_CATALOGUE: { id: string; libelle: string }[] = [
  { id: 'fonction-absente', libelle: 'une fonction absente des formules et des options' },
  { id: 'combinaison', libelle: 'une combinaison particulière d’éléments inclus et non inclus' },
  { id: 'developpement-specifique', libelle: 'un développement propre à notre club' },
  { id: 'design-unique', libelle: 'un design entièrement unique' },
  { id: 'connexion-logiciel', libelle: 'une connexion à un autre logiciel (comptabilité, Ten’Up au-delà des liens…)' },
  { id: 'reprise-logiciel', libelle: 'une reprise depuis un autre logiciel (Kalisport, AssoConnect…)' },
  { id: 'club-omnisport', libelle: 'un club omnisport complet' },
  { id: 'traduction', libelle: 'une traduction' },
  { id: 'application-stores', libelle: 'une application publiée sur l’App Store et Google Play' },
]

export const conditionsAbonnement = (): string[] => [
  `Engagement d’une saison (${PRICING.engagementMois} mois), puis reconduction annuelle.`,
  `${PRICING.prelevement}.`,
  `Mise en place payable en ${PRICING.miseEnPlaceEnFois} fois sans frais, sur les ${PRICING.miseEnPlaceEnFois} premiers mois, pour toutes les formules.`,
  `Abonnement payé à l’année : ${Math.round(PRICING.annualDiscount * 100)} % de moins.`,
  'Catégorie fixée selon les licenciés FFT de la saison en cours (tennis, padel et pickleball compris), justificatif demandé, revue une fois par an au renouvellement, jamais en cours de saison.',
  `Premier rendez-vous en présentiel gratuit jusqu’à ${PRICING.deplacementGratuitKm} km de Savigné-sur-Lathan ; au-delà, visio ou indemnité de déplacement sur devis.`,
  `Heure d’accompagnement supplémentaire : ${PRICING.heureSupplementaire.prix} € de l’heure, par tranche de ${PRICING.heureSupplementaire.trancheMinutes} minutes.`,
  `Développement propre à un seul club : ${PRICING.developpementSurMesureHeure} € de l’heure, chiffré avant.`,
]

export const MENTION_PRIX_INDICATIFS = 'Prix indicatifs, établis pour un club type de chaque catégorie. Le devis définitif est établi après un premier échange.'
