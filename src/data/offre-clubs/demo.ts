/**
 * PARCOURS DE LA DÉMO — la démo en ligne du club fictif « Grand Chelem Tennis Club », rôle par rôle.
 * Chaque étape ouvre directement le bon écran avec le bon rôle (DEMO.role). Les personnes citées sont FICTIVES :
 * ce sont les personnages de la démo, pas des clients. Rendu par la page /clubs-de-tennis/demo.
 *
 * Honnêteté : la démo simule l'envoi de SMS et un prestataire de paiement ; l'offre, elle, n'envoie pas de SMS et le
 * paiement en ligne passe par HelloAsso (NOTE_DEMO). Les écrans qui correspondent à une option le disent.
 */
import { DEMO, type RoleDemo } from '@/config/offre-clubs'
import type { IdCapture } from './captures'

export interface EtapeDemo {
  titre: string
  texte: string
  url: string
}

export interface ParcoursRole {
  role: RoleDemo
  /** Nom du rôle, tel qu'affiché. */
  nom: string
  /** Personnage fictif de la démo. */
  personne: string
  resume: string
  capture: IdCapture
  etapes: EtapeDemo[]
}

/** À afficher à côté de la démo : ce qu'elle simule et que l'offre fait autrement. */
export const NOTE_DEMO = `La démo simule l’envoi de SMS et un prestataire de paiement, pour que vous puissiez tout essayer. L’offre, elle, ne propose pas de SMS : les messages partent par e-mail et par notification sur le téléphone. Le paiement en ligne passe par HelloAsso, et l’argent va directement sur le compte du club. Certains écrans de la démo correspondent à des options : ils sont signalés.`

export const PARCOURS_DEMO: ParcoursRole[] = [
  {
    role: 'presidente',
    nom: 'Présidente',
    personne: 'Hélène Marchand',
    resume: `Hélène voit tout le club et peut tout faire. Sa page « Ma journée » lui dit ce qui demande une décision aujourd’hui.`,
    capture: 'bureau-journee',
    etapes: [
      {
        titre: 'Ma journée',
        texte: `La première page qu’Hélène ouvre le matin : les dossiers d’adhésion à relancer, la pluie annoncée ce soir sur les cours en extérieur, la rencontre des Dames 1 à composer. Chaque ligne mène à l’écran où l’on agit.`,
        url: DEMO.role('presidente', '/bureau'),
      },
      {
        titre: 'Les statistiques du club',
        texte: `Le nombre d’adhérents par saison, les jeunes et les adultes, les communes d’origine, le remplissage de l’école de tennis. De quoi préparer le rapport moral de l’assemblée générale sans tableur.`,
        url: DEMO.role('presidente', '/bureau/statistiques'),
      },
      {
        titre: 'Le journal de qui a fait quoi',
        texte: `Chaque modification est notée avec son auteur et sa date : un dossier validé, un paiement marqué, une page du site changée. Utile quand le bureau est nombreux, ou quand il change.`,
        url: DEMO.role('presidente', '/bureau/audit'),
      },
      {
        titre: 'L’assistant du club (option)',
        texte: `Posez une question en français, par exemple « combien de jeunes ne se sont pas encore réinscrits ? ». L’assistant répond à partir des données du club et prépare des brouillons ; une personne relit et valide toujours. C’est l’option assistant IA.`,
        url: DEMO.role('presidente', '/bureau/assistant'),
      },
      {
        titre: 'L’assemblée générale (option)',
        texte: `La convocation, l’ordre du jour, les procurations, les votes en ligne et le procès-verbal, au même endroit. C’est l’option assemblée générale.`,
        url: DEMO.role('presidente', '/bureau/vie-associative'),
      },
    ],
  },
  {
    role: 'tresorier',
    nom: 'Trésorier',
    personne: 'Bruno Lefèvre',
    resume: `Bruno suit les encaissements du club : qui a payé, qui reste à relancer, et l’export à remettre en fin de saison.`,
    capture: 'bureau-tresorerie',
    etapes: [
      {
        titre: 'La trésorerie',
        texte: `Les cotisations encaissées, les paiements en attente, les échéanciers des familles qui paient en plusieurs fois, et l’export pour la comptabilité. Dans la démo, les paiements en ligne sont simulés ; dans l’offre, ils passent par HelloAsso et arrivent directement sur le compte du club.`,
        url: DEMO.role('tresorier', '/bureau/tresorerie'),
      },
      {
        titre: 'Les dossiers à valider',
        texte: `Le trésorier voit les dossiers d’adhésion dont le paiement est arrivé et peut les valider. Plus besoin de comparer un relevé de banque avec une liste papier.`,
        url: DEMO.role('tresorier', '/bureau/adhesions'),
      },
      {
        titre: 'Les sponsors (option)',
        texte: `Le dossier de partenariat, les renouvellements à venir et ce que chaque partenaire a obtenu en visibilité. C’est l’option sponsors et partenaires.`,
        url: DEMO.role('tresorier', '/bureau/sponsors'),
      },
      {
        titre: 'Les subventions (option)',
        texte: `Les demandes en cours, les pièces à fournir, les échéances et les comptes rendus à rendre. C’est l’option dossiers de subvention.`,
        url: DEMO.role('tresorier', '/bureau/subventions'),
      },
    ],
  },
  {
    role: 'secretaire',
    nom: 'Secrétaire',
    personne: 'Camille Roussel',
    resume: `Camille tient les adhérents, les dossiers d’adhésion, les licences et la communication du club.`,
    capture: 'bureau-adhesions',
    etapes: [
      {
        titre: 'Les dossiers d’adhésion',
        texte: `Chaque dossier avance de colonne en colonne : reçu, pièces manquantes, paiement attendu, complet. Les relances partent automatiquement ; Camille ne s’occupe que des cas particuliers.`,
        url: DEMO.role('secretaire', '/bureau/adhesions'),
      },
      {
        titre: 'Les adhérents et les familles',
        texte: `Une fiche par personne, rattachée à sa famille : les parents, les enfants, les coordonnées, le droit à l’image, l’historique des saisons.`,
        url: DEMO.role('secretaire', '/bureau/adherents'),
      },
      {
        titre: 'Les licences et les fichiers ADOC',
        texte: `L’Import et export des fichiers ADOC : on importe la liste des licenciés exportée d’ADOC, et le logiciel montre les adhérents dont la licence manque encore. Il n’y a pas de connexion directe à ADOC.`,
        url: DEMO.role('secretaire', '/bureau/licences'),
      },
      {
        titre: 'La communication',
        texte: `La newsletter du mois, les messages aux familles d’un groupe, les actualités du site. Dans la démo, une boîte d’envoi simulée montre aussi des SMS ; l’offre envoie des e-mails et des notifications, pas de SMS.`,
        url: DEMO.role('secretaire', '/bureau/communication'),
      },
      {
        titre: 'L’éditeur du site',
        texte: `Cliquez sur un texte du site et modifiez-le en place, changez une photo, ajoutez une page. Le design reste protégé : impossible de casser la mise en page.`,
        url: DEMO.role('secretaire', '/editeur'),
      },
    ],
  },
  {
    role: 'enseignant',
    nom: 'Enseignant',
    personne: 'Karim Benali',
    resume: `Karim dirige l’école de tennis : ses groupes, l’appel sur téléphone, les séances annulées et la progression des élèves.`,
    capture: 'bureau-ecole',
    etapes: [
      {
        titre: 'L’école de tennis',
        texte: `Tous les groupes de la semaine, avec les effectifs, les listes d’attente et les créneaux. Une séance annulée pour la pluie prévient les familles concernées, et seulement elles.`,
        url: DEMO.role('enseignant', '/bureau/ecole'),
      },
      {
        titre: 'L’appel sur téléphone',
        texte: `Au bord du court, Karim coche les présents en deux gestes. Les absences signalées par les parents apparaissent déjà.`,
        url: DEMO.role('enseignant', '/bureau/ecole/appel'),
      },
      {
        titre: 'La progression Galaxie Tennis',
        texte: `Le niveau de chaque enfant dans la Galaxie Tennis (blanc, violet, rouge, orange, vert), les évaluations, et ce que les parents en voient dans leur espace.`,
        url: DEMO.role('enseignant', '/bureau/ecole/progression'),
      },
      {
        titre: 'Les stages',
        texte: `Les stages des vacances : inscriptions, groupes, présence. Les familles s’inscrivent depuis leur espace.`,
        url: DEMO.role('enseignant', '/bureau/ecole/stages'),
      },
    ],
  },
  {
    role: 'capitaine',
    nom: 'Capitaine',
    personne: 'Julie Perrin',
    resume: `Julie capitaine l’équipe Dames 1 : qui est disponible dimanche, qui joue, qui conduit.`,
    capture: 'bureau-equipes',
    etapes: [
      {
        titre: 'L’équipe et la prochaine rencontre',
        texte: `Le sondage de disponibilités à moitié rempli, la composition à arrêter, puis les convocations envoyées aux joueuses retenues.`,
        url: DEMO.role('capitaine', '/bureau/equipes'),
      },
      {
        titre: 'Le planning des courts',
        texte: `Les courts occupés par l’école, les entraînements et les rencontres : on voit tout de suite si un créneau est libre pour un entraînement d’équipe.`,
        url: DEMO.role('capitaine', '/bureau/planning'),
      },
      {
        titre: 'Les compétitions sur le site',
        texte: `Le calendrier et les résultats des équipes, publiés sur le site du club pour les supporters et les familles.`,
        url: DEMO.role('capitaine', '/competitions'),
      },
    ],
  },
  {
    role: 'parent',
    nom: 'Parent',
    personne: 'Sophie Delmas, parent de Léo et Inès',
    resume: `Sophie suit ses deux enfants depuis son téléphone : Léo à l’école de tennis, Inès en compétition.`,
    capture: 'espace-parent',
    etapes: [
      {
        titre: 'Mes enfants',
        texte: `Le groupe de chaque enfant, son enseignant, sa progression Galaxie Tennis et les prochains stages.`,
        url: DEMO.role('parent', '/espace/enfants'),
      },
      {
        titre: 'Le planning de la semaine',
        texte: `Les séances de Léo et d’Inès, avec l’alerte pluie quand un cours est annulé. Une absence se signale en un geste, et l’enseignant la voit à l’appel.`,
        url: DEMO.role('parent', '/espace/planning'),
      },
      {
        titre: 'Le dossier et les autorisations',
        texte: `Les pièces du dossier, les autorisations à signer et l’attestation de paiement. Dans la démo, le paiement est simulé ; dans l’offre, il se fait par HelloAsso.`,
        url: DEMO.role('parent', '/espace/dossier'),
      },
      {
        titre: 'L’adhésion familiale en ligne',
        texte: `Le formulaire du site, en trois étapes : la famille, les activités de chacun, les pièces et le paiement. C’est ce que remplit une famille qui découvre le club.`,
        url: DEMO.role('parent', '/adherer'),
      },
    ],
  },
  {
    role: 'membre',
    nom: 'Membre',
    personne: 'Thomas Garnier, joueur classé 15/2',
    resume: `Thomas joue en compétition et dans le Challenge interne. Tout se passe sur son téléphone.`,
    capture: 'espace-jeu',
    etapes: [
      {
        titre: 'Mon espace',
        texte: `Son tableau de bord : sa place au Challenge, les matchs à confirmer, ses réservations et les infos du club.`,
        url: DEMO.role('membre', '/espace'),
      },
      {
        titre: 'Saisir un match',
        texte: `Thomas saisit le score au format FFT ; son adversaire confirme, et le classement du Challenge se met à jour tout seul.`,
        url: DEMO.role('membre', '/espace/jeu'),
      },
      {
        titre: 'Le tableau du Challenge',
        texte: `Le classement interne, publié sur le site du club, avec les badges et le palmarès des saisons passées.`,
        url: DEMO.role('membre', '/challenge'),
      },
      {
        titre: 'Réserver un court (option)',
        texte: `Un court en trois gestes, avec les règles du club appliquées toutes seules. C’est l’option réservation de courts ; l’ouverture physique des courts (codes, serrures) n’est pas gérée par l’offre.`,
        url: DEMO.role('membre', '/espace/reserver'),
      },
      {
        titre: 'Ma carte de membre',
        texte: `La carte du club sur le téléphone, à montrer à l’accueil ou lors d’une rencontre.`,
        url: DEMO.role('membre', '/espace/carte'),
      },
    ],
  },
]

/** « La démo en 10 minutes » : le parcours conseillé à un bureau qui découvre l'offre. */
export const PARCOURS_CONSEILLE: EtapeDemo[] = [
  {
    titre: '1. Le site du club',
    texte: `Commencez comme un visiteur : l’accueil, les tarifs, l’école de tennis, sur ordinateur puis sur téléphone. C’est ce que voit une famille qui cherche un club.`,
    url: DEMO.site,
  },
  {
    titre: '2. L’adhésion en ligne',
    texte: `Remplissez une adhésion familiale en trois étapes, comme le ferait un parent. Le paiement est simulé ; dans l’offre, il passe par HelloAsso.`,
    url: DEMO.page('/adherer'),
  },
  {
    titre: '3. Le dossier arrive au bureau',
    texte: `Passez côté secrétaire : le dossier que vous venez de remplir apparaît dans le suivi des adhésions. C’est le lien direct entre le site et le logiciel.`,
    url: DEMO.role('secretaire', '/bureau/adhesions'),
  },
  {
    titre: '4. Ma journée de la présidente',
    texte: `Ce qui demande une action aujourd’hui, pour la personne qui préside : relances, météo, équipe à composer.`,
    url: DEMO.role('presidente', '/bureau'),
  },
  {
    titre: '5. L’appel de l’école de tennis',
    texte: `Prenez le téléphone de l’enseignant et faites l’appel d’un groupe en deux gestes.`,
    url: DEMO.role('enseignant', '/bureau/ecole/appel'),
  },
  {
    titre: '6. L’espace d’un parent',
    texte: `Le planning des enfants, une absence signalée, l’alerte pluie : ce que les familles ont dans leur poche.`,
    url: DEMO.role('parent', '/espace/planning'),
  },
  {
    titre: '7. Le Challenge interne',
    texte: `Saisissez un match comme un joueur, puis regardez le tableau du Challenge sur le site.`,
    url: DEMO.role('membre', '/espace/jeu'),
  },
  {
    titre: '8. Modifier le site soi-même',
    texte: `Ouvrez l’éditeur et changez un texte de la page d’accueil. Vos essais restent dans votre navigateur : vous ne cassez rien.`,
    url: DEMO.role('secretaire', '/editeur'),
  },
]
