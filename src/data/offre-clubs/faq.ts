/**
 * QUESTIONS FRÉQUENTES DE L'OFFRE « CLUBS DE TENNIS » — celles que posent les présidents, trésoriers et secrétaires
 * bénévoles. Rendu par la page /clubs-de-tennis/faq (regroupée par thème) ; les questions `essentielle` sont reprises
 * en tête de page et sur la page principale de l'offre.
 *
 * Règles : aucun montant en chiffres (jetons {{club:…}}, src/lib/jetons.ts), nom du produit en {{produit}},
 * « Import et export des fichiers ADOC » (jamais « connecté à ADOC »), aucune durée de mise en place chiffrée,
 * aucune mention d'hébergement en France, liens internes `[texte](/chemin)` vers des chemins du catalogue.
 */

export type ThemeFaq = 'offre' | 'prix' | 'contrat' | 'donnees' | 'adoc' | 'fonctionnement' | 'mise-en-place' | 'demo'

export interface QuestionClub {
  q: string
  a: string
  theme: ThemeFaq
  /** Une des 8 questions les plus fréquentes, mises en avant. */
  essentielle?: boolean
}

export const THEMES_FAQ: { id: ThemeFaq; titre: string }[] = [
  { id: 'offre', titre: 'L’offre en bref' },
  { id: 'adoc', titre: 'ADOC, Ten’Up et la fédération' },
  { id: 'prix', titre: 'Les prix et la catégorie du club' },
  { id: 'contrat', titre: 'Le contrat et le paiement' },
  { id: 'donnees', titre: 'Les données et le RGPD' },
  { id: 'fonctionnement', titre: 'Au quotidien' },
  { id: 'mise-en-place', titre: 'La mise en place' },
  { id: 'demo', titre: 'La démo et le rendez-vous' },
]

export const FAQ_CLUBS: QuestionClub[] = [
  // ── L'offre ────────────────────────────────────────────────────────────────────────────────────────────────
  {
    theme: 'offre',
    essentielle: true,
    q: `Qu’est-ce que {{produit}}, en deux phrases ?`,
    a: `C’est le site internet de votre club et le logiciel de votre bureau, reliés entre eux : une adhésion remplie sur le site arrive directement dans le suivi des dossiers du bureau. ADOC continue de gérer l’administratif fédéral (les licences), {{produit}} sert à faire vivre le club au quotidien : adhésions, école de tennis, équipes, Challenge interne, communication. Vous pouvez prendre [le site](/clubs-de-tennis/site-internet), [le logiciel](/clubs-de-tennis/logiciel-de-gestion), ou les deux.`,
  },
  {
    theme: 'offre',
    q: `À quels clubs s’adresse l’offre ?`,
    a: `Aux clubs de tennis associatifs, petits ou grands, gérés par des bénévoles, avec ou sans enseignant salarié. Les sections [padel](/clubs-de-tennis/padel) et [pickleball](/clubs-de-tennis/pickleball) sont comprises, sans supplément. Un club omnisport ou une structure commerciale peut demander un devis, mais l’offre n’a pas été pensée pour eux.`,
  },
  {
    theme: 'offre',
    q: `Peut-on prendre seulement le site, ou seulement le logiciel ?`,
    a: `Oui. Il existe trois formules : **le site**, **le logiciel**, ou **les deux** ensemble, avec une remise de {{club:remise-pack}} % sur la mise en place et sur l’abonnement. Beaucoup de clubs commencent par le site et ajoutent le logiciel l’année suivante, ou l’inverse. Les [tarifs](/clubs-de-tennis/tarifs) détaillent les trois formules.`,
  },
  {
    theme: 'offre',
    q: `Que contient exactement le site du club ?`,
    a: `Un thème haut de gamme aux couleurs du club, choisi parmi deux ou trois thèmes, parfait sur téléphone. Jusqu’à {{club:pages}} pages créées à la mise en place (accueil, tarifs et adhésion, école de tennis, équipes, actualités, agenda, galerie, contact…), plus les pages légales. Le formulaire d’adhésion en ligne, le bouton de paiement HelloAsso, l’agenda, la galerie et un bandeau d’information urgent sont compris. Le détail est sur la page [le site du club](/clubs-de-tennis/site-internet).`,
  },
  {
    theme: 'offre',
    q: `Que contient le logiciel du bureau ?`,
    a: `« Ma journée » (ce qui demande une action aujourd’hui), les adhérents et les familles, les adhésions et réinscriptions en ligne avec relances automatiques, une trésorerie simple, l’Import et export des fichiers ADOC, l’école de tennis, le planning des courts, le Challenge interne, les équipes, les tournois internes, le bénévolat, la communication par e-mail et l’espace membre et parent. Cinq automatisations prêtes à l’emploi sont incluses. Tout est décrit sur la page [le logiciel du bureau](/clubs-de-tennis/logiciel-de-gestion).`,
  },
  {
    theme: 'offre',
    q: `Est-ce un vrai logiciel de comptabilité ?`,
    a: `Non. La trésorerie de {{produit}} suit les encaissements, les cotisations en attente et les dépenses du club, et produit un export pour le trésorier. La comptabilité de l’association (bilan, compte de résultat) se tient dans l’outil habituel du trésorier ou chez l’expert-comptable, à partir de cet export.`,
  },
  {
    theme: 'offre',
    q: `Qui est derrière {{produit}} ?`,
    a: `Stackup Agency, l’entreprise individuelle de Mathéo Reboul, installée à Savigné-sur-Lathan, au nord-ouest de Tours. Vous parlez toujours à la même personne, de la démo au support. Pour en savoir plus, voyez la page [à propos](/a-propos).`,
  },
  {
    theme: 'offre',
    q: `Un club utilise-t-il déjà la solution ?`,
    a: `Oui, le Tennis Club Savigné Gizeux (TCSG). Par transparence : Mathéo Reboul, fondateur de Stackup Agency, est vice-président de ce club. Pour juger par vous-même sans vous fier à notre parole, la [démo complète](/clubs-de-tennis/demo) est ouverte à tous.`,
  },
  {
    theme: 'offre',
    q: `Que se passe-t-il si Stackup Agency s’arrête un jour ?`,
    a: `C’est une question légitime face à une petite entreprise. Vos données vous appartiennent et l’export complet est possible à tout moment, pas seulement à la fin. Pour le site, une copie autonome qui fonctionne sans la plateforme peut être commandée au départ, à partir de {{club:option:copie-autonome:mise}} €. Les conditions de fin de contrat figurent dans les [CGV de la plateforme](/cgv-plateforme).`,
  },

  // ── ADOC, Ten'Up et la fédération ────────────────────────────────────────────────────────────────────────────
  {
    theme: 'adoc',
    essentielle: true,
    q: `Faut-il quitter ADOC pour utiliser {{produit}} ?`,
    a: `Non. ADOC reste l’outil de la fédération pour prendre les licences, et vous continuez à l’utiliser comme aujourd’hui. {{produit}} s’occupe de ce qu’ADOC ne fait pas : le site, les dossiers d’adhésion, l’école de tennis, les équipes, la communication avec les familles. Les deux vivent côte à côte.`,
  },
  {
    theme: 'adoc',
    q: `Quelle différence entre ADOC et {{produit}} ?`,
    a: `ADOC sert à l’administratif fédéral : licences, affiliations, compétitions officielles. {{produit}} sert à la vie du club : accueillir les nouveaux, suivre les dossiers, faire l’appel de l’école de tennis, composer les équipes, prévenir les parents. En résumé : ADOC gère l’administratif fédéral, {{produit}} fait vivre votre club.`,
  },
  {
    theme: 'adoc',
    q: `{{produit}} est-il relié directement à ADOC ?`,
    a: `Non, il n’y a pas de connexion directe. Le logiciel propose l’**Import et export des fichiers ADOC** : vous exportez la liste de vos licenciés depuis ADOC, vous l’importez dans {{produit}}, et le logiciel signale les adhérents dont la licence manque. Le guide [exporter et importer ses adhérents depuis ADOC](/clubs-de-tennis/guides/exporter-importer-adherents-adoc) montre la marche à suivre.`,
  },
  {
    theme: 'adoc',
    q: `Comment savoir quels adhérents n’ont pas encore leur licence ?`,
    a: `Après l’import du fichier ADOC, le logiciel compare les adhésions payées et les licences prises, et liste les écarts : adhérent sans licence, licence sans adhésion. La secrétaire voit la liste dans « Ma journée » et peut relancer en quelques gestes. Détail sur la page [Import et export des fichiers ADOC](/clubs-de-tennis/fonctionnalites/import-export-adoc).`,
  },
  {
    theme: 'adoc',
    q: `Et Ten’Up ?`,
    a: `Ten’Up reste l’application de la fédération pour les joueurs : classement, tournois homologués, réservation dans certains clubs. Le site et l’espace membre proposent simplement des liens vers Ten’Up là où c’est utile. {{produit}} n’est ni affilié ni approuvé par la Fédération française de tennis.`,
  },

  // ── Les prix et la catégorie ──────────────────────────────────────────────────────────────────────────────────
  {
    theme: 'prix',
    essentielle: true,
    q: `Combien ça coûte ?`,
    a: `Le prix dépend de la formule et de la taille du club. Pour un petit club de la catégorie Mini, le site démarre à partir de {{club:site:mini:mise}} € de mise en place et {{club:site:mini:mois}} € par mois. Pour un club de la catégorie Moyen, le pack site et logiciel est à partir de {{club:pack:moyen:mise}} € de mise en place et {{club:pack:moyen:mois}} € par mois. Le [simulateur](/clubs-de-tennis/simulateur) donne votre prix indicatif en une minute ; le devis définitif suit un premier échange.`,
  },
  {
    theme: 'prix',
    q: `Combien ça représente par licencié ?`,
    a: `Pour un club type de {{club:licencies-type:moyen}} licenciés, l’abonnement du pack revient à environ {{club:par-licencie:moyen}} € par licencié et par an. Pour un club type de {{club:licencies-type:petit}} licenciés, c’est environ {{club:par-licencie:petit}} €. Ces exemples types servent à comparer avec le montant de la cotisation ; votre propre calcul se fait dans le [simulateur](/clubs-de-tennis/simulateur).`,
  },
  {
    theme: 'prix',
    q: `Comment est calculée la catégorie de notre club ?`,
    a: `Sur le nombre de licenciés FFT de la saison en cours, tennis, padel et pickleball compris. Il y a cinq catégories : Mini (moins de {{club:min:petit}} licenciés), Petit (de {{club:min:petit}} à {{club:max:petit}}), Moyen (de {{club:min:moyen}} à {{club:max:moyen}}), Grand (de {{club:min:grand}} à {{club:max:grand}}) et Très grand (à partir de {{club:min:tres-grand}}). Les membres non licenciés ne comptent pas.`,
  },
  {
    theme: 'prix',
    q: `Quel justificatif faut-il fournir pour la catégorie ?`,
    a: `Un export ADOC du nombre de licenciés, ou le rapport d’assemblée générale qui présente les trois dernières saisons. Il n’y a rien d’autre à fournir. La catégorie est revue une fois par an, au moment du renouvellement.`,
  },
  {
    theme: 'prix',
    q: `Et si nos licenciés baissent ?`,
    a: `La catégorie est revue chaque année au renouvellement, sur les licenciés de la saison en cours. Si vos effectifs ont baissé au point de changer de catégorie, l’abonnement suit la nouvelle catégorie dès la saison suivante, sur simple justificatif. Le prix ne bouge pas en cours de saison, ni à la hausse ni à la baisse.`,
  },
  {
    theme: 'prix',
    q: `Pourquoi un abonnement mensuel, et pas un achat une fois pour toutes ?`,
    a: `Parce qu’un site et un logiciel en ligne demandent un travail permanent : hébergement, nom de domaine, https, sauvegardes quotidiennes, surveillance, mises de sécurité, mises à jour et support. L’abonnement couvre tout cela, plus les nouvelles fonctionnalités de votre formule. La mise en place, elle, paie le travail de départ : thème, pages, import des membres, prise en main.`,
  },
  {
    theme: 'prix',
    q: `Qu’est-ce qui n’est pas compris dans le prix ?`,
    a: `Les heures d’accompagnement au-delà de celles incluses ({{club:heure}} € de l’heure), les développements propres à votre club ({{club:dev-heure}} € de l’heure, toujours chiffrés avant), les options, les frais de paiement d’un autre prestataire que HelloAsso et la saisie de vos contenus à votre place. Les SMS et la gestion des accès aux courts (codes, serrures) ne sont pas proposés. Rien n’est facturé sans accord écrit.`,
  },
  {
    theme: 'prix',
    q: `Les prix sont-ils HT ou TTC ?`,
    a: `Les prix sont indiqués hors taxe ; Stackup Agency est aujourd’hui en franchise en base de TVA : le prix indiqué est le prix payé.`,
  },
  {
    theme: 'prix',
    q: `Y a-t-il des remises ?`,
    a: `Deux, et seulement deux : {{club:remise-pack}} % en prenant le site et le logiciel ensemble, et {{club:remise-annuelle}} % sur l’abonnement si vous le payez à l’année. Il n’y a pas de prix « spécial premier client » ni de promotion limitée dans le temps : le même club paie le même prix, quelle que soit la date.`,
  },
  {
    theme: 'prix',
    q: `Combien coûtent les options ?`,
    a: `Chaque option a son prix, visible sur la page des [tarifs](/clubs-de-tennis/tarifs). Par exemple, la réservation de courts est à partir de {{club:option:reservation-courts:mise}} € de mise en place et {{club:option:reservation-courts:mois}} € par mois ; l’écran club-house est à partir de {{club:option:ecran-club-house:mise}} €, payés une seule fois. Vous pouvez ajouter une option en cours de contrat.`,
  },

  // ── Le contrat et le paiement ────────────────────────────────────────────────────────────────────────────────
  {
    theme: 'contrat',
    essentielle: true,
    q: `Y a-t-il un engagement ?`,
    a: `Oui, une saison : {{club:engagement}} mois. Ensuite, l’abonnement se reconduit d’année en année, et vous pouvez l’arrêter à chaque échéance. Cet engagement court permet à un nouveau bureau de ne pas hériter d’un contrat de plusieurs années.`,
  },
  {
    theme: 'contrat',
    q: `Comment résilier ?`,
    a: `Par un simple e-mail ou un courrier, avant la date de reconduction annuelle, selon le préavis écrit dans les [CGV de la plateforme](/cgv-plateforme). Aucune justification n’est demandée. Avant la fin, vous récupérez l’export complet de vos données.`,
  },
  {
    theme: 'contrat',
    q: `Le contrat se renouvelle-t-il tout seul ?`,
    a: `Oui, chaque année, à la date anniversaire, après la première saison d’engagement. C’est aussi le moment où la catégorie est revue selon vos licenciés. Pensez à en parler en bureau quelques semaines avant l’échéance.`,
  },
  {
    theme: 'contrat',
    q: `Peut-on payer la mise en place en plusieurs fois ?`,
    a: `Oui, en {{club:fois}} fois sans frais, sur les premiers mois. C’est souvent plus simple pour la trésorerie d’une association en début de saison. Le [simulateur](/clubs-de-tennis/simulateur) montre le montant de chaque échéance.`,
  },
  {
    theme: 'contrat',
    q: `Peut-on payer l’abonnement à l’année ?`,
    a: `Oui, et l’abonnement est alors réduit de {{club:remise-annuelle}} %. C’est pratique pour un club qui encaisse l’essentiel de ses cotisations en septembre. Le paiement mensuel reste possible si vous préférez étaler.`,
  },
  {
    theme: 'contrat',
    q: `Comment se fait le paiement de l’abonnement ?`,
    a: `Par prélèvement SEPA sur le compte de l’association. Le trésorier signe le mandat une fois, et une facture est envoyée à chaque échéance. Il n’y a pas de carte bancaire à renouveler ni de virement à penser chaque mois.`,
  },
  {
    theme: 'contrat',
    q: `Peut-on changer de formule en cours de route ?`,
    a: `Oui. Passer du site seul au pack, ou ajouter le logiciel, se fait à tout moment : la mise en place complémentaire et le nouvel abonnement sont chiffrés avant. Retirer une formule ou une option se fait à l’échéance annuelle.`,
  },

  // ── Les données et le RGPD ───────────────────────────────────────────────────────────────────────────────────
  {
    theme: 'donnees',
    essentielle: true,
    q: `À qui appartiennent les données du club ?`,
    a: `Au club, sans ambiguïté. Les adhérents, les familles, les paiements, les documents et les photos restent la propriété de l’association. Stackup Agency ne les utilise que pour faire fonctionner le service, ne les vend pas et ne les partage avec personne.`,
  },
  {
    theme: 'donnees',
    q: `Peut-on récupérer toutes nos données ?`,
    a: `Oui, à tout moment, pas seulement en fin de contrat : l’export complet est inclus dans l’abonnement. Les listes sortent dans des fichiers lisibles par un tableur, et les documents dans leur format d’origine.`,
  },
  {
    theme: 'donnees',
    q: `Que deviennent nos données si nous arrêtons ?`,
    a: `Vous récupérez l’export complet avant la fin du contrat. Les données sont ensuite supprimées de la plateforme, dans le délai prévu par les [CGV de la plateforme](/cgv-plateforme). Pour garder le site en ligne ailleurs, une copie autonome peut être commandée, à partir de {{club:option:copie-autonome:mise}} €.`,
  },
  {
    theme: 'donnees',
    q: `Qui est responsable au sens du RGPD ?`,
    a: `Le club est responsable du traitement : c’est lui qui décide quelles données il recueille et pourquoi. Stackup Agency est sous-traitant : il héberge et traite les données pour le compte du club, selon un contrat de traitement des données fourni avec l’abonnement. Le [guide RGPD pour un club de tennis](/clubs-de-tennis/guides/rgpd-club-de-tennis) explique ce que cela implique pour le bureau.`,
  },
  {
    theme: 'donnees',
    q: `Et les données des enfants, les attestations de santé ?`,
    a: `Ce sont les données les plus sensibles du club, et elles sont traitées comme telles. Chaque personne du bureau ne voit que ce que son rôle permet : un enseignant voit ses groupes, pas les paiements. Pour la santé, nous vous conseillons de ne recueillir que l’attestation signée par le parent, pas le détail du questionnaire. Le droit à l’image est demandé dans le dossier d’adhésion et respecté par la galerie.`,
  },
  {
    theme: 'donnees',
    q: `Où sont hébergées les données ?`,
    a: `Chez des prestataires d’hébergement choisis pour leur sécurité. La liste des sous-traitants et leur localisation figure dans l’annexe données des [CGV de la plateforme](/cgv-plateforme). Si un prestataire change, l’annexe est mise à jour et vous en êtes informé.`,
  },
  {
    theme: 'donnees',
    q: `Les données sont-elles sauvegardées ?`,
    a: `Oui, chaque jour, automatiquement : les sauvegardes quotidiennes font partie de l’abonnement, comme la surveillance du service. En cas de fausse manœuvre, le journal de qui a fait quoi permet aussi de retrouver ce qui a été modifié et par qui.`,
  },

  // ── Au quotidien ────────────────────────────────────────────────────────────────────────────────────────────
  {
    theme: 'fonctionnement',
    q: `Faut-il être à l’aise avec l’informatique ?`,
    a: `Non. Les écrans ont été pensés pour des bénévoles qui y passent un peu de temps le soir, souvent sur téléphone : de gros boutons, des mots simples, une page « Ma journée » qui dit quoi faire. Si vous savez envoyer un e-mail avec une pièce jointe, vous savez vous servir de {{produit}}.`,
  },
  {
    theme: 'fonctionnement',
    q: `Pouvons-nous modifier le site nous-mêmes ?`,
    a: `Oui, c’est le principe. Avec l’éditeur, le club change seul les textes, les images, les liens, les menus et les documents, et crée de nouvelles pages sans limite. Le design est protégé : impossible de casser la mise en page. Voyez [le site modifiable par le club](/clubs-de-tennis/fonctionnalites/site-modifiable).`,
  },
  {
    theme: 'fonctionnement',
    q: `Le bureau change chaque année : que se passe-t-il ?`,
    a: `Rien ne se perd. Les comptes sont nominatifs, avec des rôles et des droits par personne : on retire les droits de l’ancien trésorier et on les donne au nouveau, en quelques gestes. L’historique, les documents et les dossiers restent dans le club, pas dans la boîte mail de quelqu’un. Les comptes du bureau et des enseignants sont illimités.`,
  },
  {
    theme: 'fonctionnement',
    q: `Nous avons plusieurs enseignants : chacun a-t-il son accès ?`,
    a: `Oui, les comptes enseignants sont illimités. Chaque enseignant voit ses groupes, fait l’appel depuis son téléphone, annule ou reporte une séance, et note la progression Galaxie Tennis de ses élèves. Le détail est sur la page [école de tennis](/clubs-de-tennis/fonctionnalites/ecole-de-tennis).`,
  },
  {
    theme: 'fonctionnement',
    q: `Gérez-vous le padel et le pickleball ?`,
    a: `Oui, comme des sections du club : pages sur le site, créneaux dans le planning, adhérents et équipes. Les licenciés padel et pickleball comptent dans la catégorie du club, comme ceux du tennis. Voyez les pages [clubs avec padel](/clubs-de-tennis/padel) et [clubs avec pickleball](/clubs-de-tennis/pickleball).`,
  },
  {
    theme: 'fonctionnement',
    q: `Les membres peuvent-ils réserver un court en ligne ?`,
    a: `Oui, avec l’option [réservation de courts](/clubs-de-tennis/fonctionnalites/reservation-de-courts), à partir de {{club:option:reservation-courts:mise}} € de mise en place et {{club:option:reservation-courts:mois}} € par mois. Les règles du club (durée, délai, invités) s’appliquent toutes seules. La gestion des codes d’accès ou des serrures des courts n’est pas proposée : elle reste chez le club.`,
  },
  {
    theme: 'fonctionnement',
    q: `Envoyez-vous des SMS ?`,
    a: `Non, l’offre ne propose pas de SMS. Les messages partent par e-mail et par notification sur le téléphone, depuis l’espace membre et parent. Le club garde ses groupes de messagerie habituels pour les échanges informels. Voyez la page [communication](/clubs-de-tennis/fonctionnalites/communication).`,
  },
  {
    theme: 'fonctionnement',
    q: `Comment les familles utilisent-elles l’espace membre et parent ?`,
    a: `Depuis le téléphone : le planning des enfants, une absence signalée en un geste, les autorisations à signer, la carte de membre. L’espace s’installe comme une application, en l’ajoutant à l’écran d’accueil depuis le navigateur, sans passer par un magasin d’applications. Les membres sont illimités dans votre catégorie. Voyez [l’espace membre et parent](/clubs-de-tennis/fonctionnalites/espace-membre-et-parent).`,
  },
  {
    theme: 'fonctionnement',
    q: `Comment marche le paiement des cotisations avec HelloAsso ?`,
    a: `Le formulaire d’adhésion en ligne propose un bouton de paiement HelloAsso, et le logiciel suit automatiquement qui a payé. HelloAsso est gratuit pour le club : il se finance par une contribution volontaire proposée au payeur, qui peut la refuser. Si vous préférez un autre prestataire de paiement, ses frais sont à la charge du club. Voyez [le paiement en ligne HelloAsso](/clubs-de-tennis/fonctionnalites/paiement-helloasso).`,
  },
  {
    theme: 'fonctionnement',
    essentielle: true,
    q: `L’argent des cotisations passe-t-il par vous ?`,
    a: `Non, jamais. Les paiements en ligne vont directement de la famille au compte du club, par HelloAsso. Stackup Agency ne touche pas l’argent des adhérents et n’y a pas accès : le logiciel reçoit seulement l’information « payé » pour mettre à jour le dossier.`,
  },
  {
    theme: 'fonctionnement',
    q: `Y a-t-il de l’intelligence artificielle ?`,
    a: `Seulement si vous le souhaitez, avec l’option [assistant IA du club](/clubs-de-tennis/fonctionnalites/assistant-ia), à partir de {{club:option:assistant-ia:mise}} € de mise en place et {{club:option:assistant-ia:mois}} € par mois. Il répond aux questions sur les données du club et prépare des brouillons d’actualités, de newsletters ou de dossiers de subvention. Un humain relit et valide toujours avant que quoi que ce soit parte.`,
  },
  {
    theme: 'fonctionnement',
    q: `Comment fonctionne le Challenge interne ?`,
    a: `Les joueurs saisissent leurs matchs au format des scores FFT depuis leur téléphone, l’adversaire confirme, et le classement se met à jour tout seul, avec des badges et un Hall of Fame. Le tableau peut s’afficher sur le site du club. Voyez [le Challenge interne](/clubs-de-tennis/fonctionnalites/challenge-interne) et le guide [créer un challenge interne](/clubs-de-tennis/guides/creer-un-challenge-interne).`,
  },
  {
    theme: 'fonctionnement',
    q: `Comment joindre le support ?`,
    a: `Par e-mail ou par le formulaire de [contact](/contact). La réponse arrive sous {{club:support-jours}} jours ouvrés. Le support fait partie de l’abonnement : poser une question ne coûte rien.`,
  },

  // ── La mise en place ─────────────────────────────────────────────────────────────────────────────────────────
  {
    theme: 'mise-en-place',
    essentielle: true,
    q: `Combien de temps faut-il pour la mise en place ?`,
    a: `Un délai indicatif vous est donné avec le devis, après le premier échange. Il dépend surtout de ce que le club peut fournir : textes, photos, logo, et l’export ADOC ou le tableur des membres. Nous vous conseillons de lancer le projet hors de la période des réinscriptions, pour que le bureau ait le temps de prendre l’outil en main.`,
  },
  {
    theme: 'mise-en-place',
    q: `Y a-t-il une formation ?`,
    a: `Oui, des heures d’accompagnement sont incluses dans la mise en place : recueil de vos demandes, puis prise en main avec les personnes du bureau. Par exemple, le pack pour un club de la catégorie Moyen comprend {{club:heures:pack:moyen}} heures. Au-delà, l’heure est facturée {{club:heure}} €, toujours après accord.`,
  },
  {
    theme: 'mise-en-place',
    q: `Faut-il ressaisir tous nos adhérents ?`,
    a: `Non. L’import des membres depuis une source est compris : l’export ADOC ou votre tableur. Une deuxième source (un ancien fichier, un autre tableur) s’ajoute à partir de {{club:option:import-source:mise}} €. La reprise depuis un autre logiciel de gestion se fait sur devis.`,
  },
  {
    theme: 'mise-en-place',
    q: `Qui écrit les textes du site ?`,
    a: `Le club fournit ses textes et ses photos ; la saisie du contenu à la place du club n’est pas comprise. Si vous préférez, une page peut être rédigée pour vous à partir de vos informations, à partir de {{club:option:redaction-page:mise}} € la page, et les textes de l’ancien site peuvent être repris, à partir de {{club:option:reprise-contenu:mise}} € la page. Le guide [créer le site de son club de tennis](/clubs-de-tennis/guides/creer-le-site-de-son-club-de-tennis) aide à préparer les contenus.`,
  },
  {
    theme: 'mise-en-place',
    q: `Gardons-nous notre nom de domaine et nos adresses e-mail ?`,
    a: `Le nom de domaine est compris dans l’abonnement ; si le club en a déjà un, il peut être conservé. La mise en place d’adresses e-mail du club (contact@, president@…) est une option, à partir de {{club:option:adresses-email:mise}} €, le coût du service e-mail restant à la charge du club.`,
  },
  {
    theme: 'mise-en-place',
    q: `Serons-nous trouvés sur Google ?`,
    a: `Le référencement de base est compris : titres, plan du site et données structurées pour que le club soit trouvé sur son nom. Pour être trouvé dans les communes voisines ou dans tout le département, il existe deux options de référencement. Personne ne peut honnêtement promettre une place précise dans les résultats, et nous ne le faisons pas.`,
  },
  {
    theme: 'mise-en-place',
    q: `Pouvez-vous ajouter une fonction qui n’existe pas ?`,
    a: `Oui, sur devis. Un développement propre à votre club est facturé {{club:dev-heure}} € de l’heure, toujours chiffré et accepté avant de commencer. Si la fonction sert à beaucoup de clubs, elle peut rejoindre la formule pour tout le monde.`,
  },

  // ── La démo et le rendez-vous ───────────────────────────────────────────────────────────────────────────────
  {
    theme: 'demo',
    essentielle: true,
    q: `Où voir la démo ?`,
    a: `En ligne, sans inscription : un club fictif, le Grand Chelem Tennis Club, avec son site public, le logiciel du bureau et l’espace des familles. Vous choisissez un rôle (présidente, trésorier, secrétaire, enseignant, capitaine, parent, membre) et vous voyez ce que cette personne voit. La page [la démo](/clubs-de-tennis/demo) propose un parcours conseillé de dix minutes.`,
  },
  {
    theme: 'demo',
    q: `Peut-on tout essayer dans la démo, sans rien casser ?`,
    a: `Oui. Vous pouvez remplir une adhésion, faire l’appel, saisir un match ou modifier une page : vos essais restent dans votre navigateur, personne d’autre ne les voit. Toutes les personnes et toutes les données de la démo sont inventées.`,
  },
  {
    theme: 'demo',
    q: `La démo montre-t-elle exactement l’offre ?`,
    a: `Presque, avec deux différences à connaître. La démo simule l’envoi de SMS et un prestataire de paiement, alors que l’offre n’envoie pas de SMS et que le paiement en ligne passe par HelloAsso. Certains écrans de la démo correspondent à des options (réservation de courts, assistant IA, boutique, écran club-house) : les [tarifs](/clubs-de-tennis/tarifs) disent ce qui est inclus et ce qui ne l’est pas.`,
  },
  {
    theme: 'demo',
    q: `Pouvez-vous venir présenter {{produit}} au bureau ?`,
    a: `Oui. Le premier rendez-vous en présentiel est gratuit jusqu’à {{club:km}} km de Savigné-sur-Lathan, par exemple au club-house un soir de réunion de bureau. Au-delà, le rendez-vous se fait en visio, ou en présentiel avec une indemnité de déplacement indiquée sur devis. Demandez-le depuis la page [contact](/contact).`,
  },
  {
    theme: 'demo',
    q: `Une présentation en visio est-elle possible ?`,
    a: `Oui, pour tous les clubs, où qu’ils soient. Il suffit d’un ordinateur avec une connexion correcte ; les membres du bureau peuvent se joindre chacun de chez soi. Nous parcourons la démo ensemble avec vos questions, puis nous estimons votre prix dans le [simulateur](/clubs-de-tennis/simulateur).`,
  },
]
