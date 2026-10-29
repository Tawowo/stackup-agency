/**
 * CE QUI EST INCLUS, NON INCLUS ET SUR DEVIS — source unique des listes affichées par la grande page, les tarifs,
 * les pages formules et le simulateur. Les montants passent par les jetons {{club:…}} (src/lib/jetons.ts).
 */

export const INCLUS_SITE = [
  'Un thème haut de gamme aux couleurs du club, au choix parmi 2 ou 3 thèmes : logo, couleurs, typographies, animations, mode sombre, parfait sur téléphone',
  'Jusqu’à {{club:pages}} pages créées à la mise en place : accueil, le club, installations, tarifs et adhésion, école de tennis, adultes, équipes et compétitions, actualités, agenda, galerie, partenaires, documents, FAQ, contact, essai gratuit (pages légales en plus)',
  'L’éditeur : le club modifie seul textes, images, liens, menus et documents, et crée de nouvelles pages sans limite',
  'Formulaire d’adhésion en ligne avec pièces jointes et bouton de paiement HelloAsso',
  'Actualités, agenda abonnable, galerie respectant le droit à l’image, documents à télécharger, FAQ, bandeau d’information urgent',
  'Sections padel et pickleball si le club en a',
  'Référencement de base : le club est trouvé sur son nom (titres, plan du site, données structurées)',
  'Statistiques de visite respectueuses de la vie privée',
  'Heures d’accompagnement incluses : recueil des demandes et prise en main',
] as const

export const INCLUS_LOGICIEL = [
  'Ma journée : ce qui demande une action aujourd’hui, pour chaque membre du bureau',
  'Adhérents et familles, rôles et droits par personne (président, trésorier, secrétaire, enseignant, capitaine, bénévole…)',
  'Adhésions et réinscriptions en ligne, suivi des dossiers, relances automatiques',
  'Paiement en ligne via HelloAsso avec suivi automatique des paiements : l’argent va directement sur le compte du club',
  'Trésorerie simple et export pour le trésorier',
  'Import et export des fichiers ADOC, contrôle des licences manquantes',
  'École de tennis : groupes, appel sur téléphone, annulations et reports, progression Galaxie Tennis',
  'Planning global des courts et des activités',
  'Challenge interne : classement, badges, saisie des matchs au format FFT, Hall of Fame',
  'Équipes et compétitions : disponibilités, compositions, convocations, covoiturage',
  'Tournois internes et événements avec inscriptions',
  'Bénévolat : missions, inscriptions, compteur d’heures',
  'Communication par e-mail et par notification sur le téléphone',
  'Documents, statistiques, journal de qui a fait quoi',
  'Espace membre et parent, installable comme une application sur le téléphone',
  '5 automatisations prêtes à l’emploi',
  'Import des membres depuis une source (export ADOC ou tableur)',
] as const

export const ABONNEMENT_INCLUS = [
  'Hébergement, nom de domaine, https, sauvegardes quotidiennes, surveillance et sécurité',
  'Mises à jour et nouvelles fonctionnalités de la formule, sans supplément',
  'Maintenance et correction des anomalies',
  'Support par e-mail ou formulaire, réponse sous {{club:support-jours}} jours ouvrés',
  'Comptes du bureau et des enseignants illimités, membres illimités dans la catégorie',
  'E-mails automatiques dans un usage normal d’association',
  'Stockage selon la catégorie',
  'Export complet des données à tout moment',
  'Contrat de traitement des données personnelles (RGPD)',
] as const

export const ABONNEMENT_NON_INCLUS = [
  'Les heures d’accompagnement au-delà des heures incluses ({{club:heure}} € de l’heure, par tranche de 30 minutes)',
  'Les développements propres à un seul club',
  'Les options',
  'Les frais de paiement en ligne : HelloAsso est gratuit pour le club ; avec un autre prestataire, les frais sont à la charge du club',
  'La saisie du contenu à la place du club',
  'Les SMS : non proposés (e-mails, notifications ou les groupes de messagerie du club)',
  'La gestion des accès physiques aux courts (codes, serrures) : non proposée, elle reste gérée par le club',
] as const

export const SUR_DEVIS = [
  'Toute fonction absente des formules et des options',
  'Toute combinaison particulière d’éléments inclus et non inclus',
  'Un développement propre à un seul club ({{club:dev-heure}} € de l’heure, chiffré avant)',
  'Un design entièrement unique',
  'Une connexion à un autre logiciel (comptabilité, Ten’Up au-delà des liens…)',
  'Une reprise depuis un autre logiciel de gestion',
  'Un club omnisport complet',
  'Une traduction',
  'Une application publiée sur l’App Store et Google Play',
  'Les déplacements au-delà des conditions du premier rendez-vous',
] as const

export const CONDITIONS = [
  'Engagement d’une saison ({{club:engagement}} mois), puis reconduction annuelle',
  'Prélèvement automatique (mandat SEPA)',
  'Mise en place payable en {{club:fois}} fois sur les {{club:fois}} premiers mois, sans frais, pour toutes les formules',
  'Paiement annuel de l’abonnement : −{{club:remise-annuelle}} %',
  'Site + logiciel : −{{club:remise-pack}} % sur la mise en place et sur l’abonnement, par rapport à la somme des deux',
  'Aucune autre remise',
  'Premier rendez-vous en présentiel gratuit jusqu’à {{club:km}} km de Savigné-sur-Lathan ; au-delà, visio ou indemnité de déplacement chiffrée sur devis ; les rendez-vous suivants entrent dans les heures d’accompagnement',
  'Catégorie selon les licenciés FFT de la saison en cours (tennis, padel et pickleball), justificatif à fournir (export ADOC ou rapport d’assemblée générale avec les 3 dernières saisons), revue une fois par an au renouvellement, jamais en cours de saison',
] as const
