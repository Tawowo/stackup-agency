/**
 * FAQ DE L'OFFRE CLUBS — questions de présidents, trésoriers, secrétaires et bénévoles.
 * Aucun montant écrit en chiffres : jetons `{{club:…}}`. Le nom du produit s'écrit `{{nom:produit}}`.
 */
import type { QuestionFaq } from './types.ts'

export const FAQ_CLUBS: QuestionFaq[] = [
  // ───────────────────────── OFFRE ─────────────────────────
  {
    id: 'offre-cest-quoi',
    theme: 'offre',
    q: `Qu’est-ce que {{nom:produit}} ?`,
    a: `C’est le site internet du club et le logiciel du bureau, reliés entre eux. Les adhésions faites sur le site arrivent directement dans les fiches du bureau, sans ressaisie. Vous choisissez une formule : le site, le logiciel, ou les deux. Le tout est proposé par abonnement, avec un prix qui dépend de la taille de votre club.`,
  },
  {
    id: 'offre-pour-qui',
    theme: 'offre',
    q: `Pour quels clubs cette offre est-elle faite ?`,
    a: `Pour les clubs de tennis, y compris ceux qui proposent aussi du padel ou du pickleball. Elle convient à une petite association gérée par deux bénévoles comme à un grand club avec une école de tennis. Un club omnisport complet, lui, fait l’objet d’un devis sur mesure : parlez-nous-en lors d’un [premier échange](/contact?a=appel).`,
  },
  {
    id: 'offre-site-seul',
    theme: 'offre',
    q: `Peut-on prendre le site sans le logiciel ?`,
    a: `Oui. La formule « site » comprend un site modifiable par le club, l’adhésion en ligne, le paiement HelloAsso, les actualités, l’agenda et la galerie. Vous pourrez ajouter le logiciel plus tard, lorsque le bureau en ressentira le besoin. Pour le détail, voyez la page [site internet du club](/clubs-de-tennis/site-internet).`,
  },
  {
    id: 'offre-logiciel-seul',
    theme: 'offre',
    q: `Peut-on prendre le logiciel sans le site ?`,
    a: `Oui. Si votre club a déjà un site dont il est content, la formule « logiciel » donne au bureau les adhérents, les réinscriptions, l’école de tennis, les équipes, le challenge interne et la trésorerie simple. Les options qui demandent le site, comme le référencement, ne sont alors pas disponibles. Détails sur la page [logiciel de gestion](/clubs-de-tennis/logiciel-de-gestion).`,
  },
  {
    id: 'offre-difference-adoc',
    theme: 'offre',
    q: `Quelle différence avec ADOC ?`,
    a: `ADOC est le service de la Fédération pour l’administratif fédéral, notamment les licences. {{nom:produit}} sert à faire vivre le club au quotidien : site, réinscriptions, école de tennis, convocations, communication. Les deux se complètent. Vous continuez à utiliser ADOC pour ce qui est fédéral, et vous échangez des fichiers entre les deux pour éviter de tout retaper.`,
  },
  {
    id: 'offre-qui-fait',
    theme: 'offre',
    q: `Qui fabrique {{nom:produit}} ?`,
    a: `{{nom:produit}} est fait par Stackup Agency, l’agence de Mathéo Reboul, installée à Savigné-sur-Lathan en Indre-et-Loire. Mathéo est aussi vice-président du Tennis Club Savigné-Gizeux, qui sert de [réalisation de référence](/realisations/tennis-club-savigne-gizeux). Vous parlez donc à quelqu’un qui connaît la vie d’un bureau de club : permanences, convocations, assemblée générale.`,
  },
  {
    id: 'offre-voir-avant',
    theme: 'offre',
    q: `Peut-on voir le produit avant de s’engager ?`,
    a: `Oui. Une [démonstration](/clubs-de-tennis/demo) permet d’ouvrir le site d’un club fictif et les écrans du bureau, avec différents rôles. Vous pouvez aussi demander un rendez-vous pour qu’on vous montre les écrans qui vous intéressent. Aucun engagement n’est pris tant que vous n’avez pas validé un devis.`,
  },
  {
    id: 'offre-ancien-site',
    theme: 'offre',
    q: `Notre club a déjà un site : que devient-il ?`,
    a: `Vous avez le choix. Soit vous gardez votre site et prenez seulement le logiciel. Soit vous passez au nouveau site, et nous pouvons reprendre les textes et les images de l’ancien, page par page, grâce à l’option « reprise du contenu » ({{club:opt-reprise-contenu-mep}} € la page, à partir de). Le prix définitif figure au devis.`,
  },
  {
    id: 'offre-besoin-specifique',
    theme: 'offre',
    q: `Et si notre besoin n’est pas dans l’offre ?`,
    a: `Ce qui n’est ni dans les formules ni dans les options passe par un devis sur mesure : une fonction absente, un design entièrement unique, une connexion à un autre logiciel, une traduction. Un développement propre à un seul club est chiffré à l’avance, à {{club:dev-heure}} € de l’heure. Rien n’est lancé sans votre accord.`,
  },
  {
    id: 'offre-tableur-messagerie',
    theme: 'offre',
    q: `Pourquoi ne pas continuer avec un tableur et des groupes de messagerie ?`,
    a: `Vous le pouvez, et beaucoup de clubs commencent ainsi. Les difficultés apparaissent quand le bureau change, quand les relances de réinscription s’accumulent ou quand on cherche qui a payé. Ici, tout le monde voit les mêmes informations à jour, et les relances partent seules. Vous gardez vos groupes de messagerie si vous le souhaitez.`,
  },

  // ───────────────────────── PRIX ─────────────────────────
  {
    id: 'prix-categories',
    theme: 'prix',
    q: `Comment sont définies les catégories de prix ?`,
    a: `Il y a cinq catégories : mini, petit, moyen, grand et très grand. Votre catégorie dépend du nombre de licenciés FFT du club pour la saison en cours, padel et pickleball compris. Plus le club est grand, plus l’abonnement est élevé, car il y a plus de membres, plus de stockage et plus d’accompagnement. Voyez la [grille des tarifs](/clubs-de-tennis/tarifs).`,
  },
  {
    id: 'prix-comment-on-compte',
    theme: 'prix',
    q: `Comment compte-t-on les licenciés ?`,
    a: `On retient les licenciés FFT de la saison en cours, toutes pratiques confondues : tennis, padel et pickleball. Les personnes qui ne sont pas licenciées, comme les bénévoles ou les parents, ne comptent pas. Si votre effectif est proche d’une limite entre deux catégories, parlons-en lors du devis plutôt que de deviner.`,
  },
  {
    id: 'prix-justificatif',
    theme: 'prix',
    q: `Quel justificatif faut-il fournir pour la catégorie ?`,
    a: `Nous vous demandons un document qui montre le nombre de licenciés de la saison en cours, par exemple l’export ou le récapitulatif de vos licences. Il sert uniquement à placer le club dans la bonne catégorie. Si vous ne savez pas où le trouver, indiquez-le-nous : nous vous guiderons.`,
  },
  {
    id: 'prix-revue-annuelle',
    theme: 'prix',
    q: `La catégorie peut-elle changer en cours de saison ?`,
    a: `Non. La catégorie est vérifiée une fois par an, au renouvellement, jamais en cours de saison. Si le club gagne des licenciés en septembre, le prix ne bouge pas avant la saison suivante. À l’inverse, si l’effectif baisse, la catégorie est revue au renouvellement, justificatif à l’appui.`,
  },
  {
    id: 'prix-cout-par-licencie',
    theme: 'prix',
    q: `Combien cela coûte-t-il par licencié ?`,
    a: `Faites le calcul simplement : prenez l’abonnement de l’année et divisez-le par votre nombre de licenciés. Les adhérents et les comptes du bureau ou des enseignants sont illimités dans la catégorie, sans supplément par personne. Pour un chiffre précis sur votre club, utilisez le [simulateur](/clubs-de-tennis/simulateur). Les prix sont indicatifs, le devis fait foi.`,
  },
  {
    id: 'prix-ordre-de-grandeur',
    theme: 'prix',
    q: `Quel est l’ordre de grandeur du prix pour un club moyen ?`,
    a: `À titre d’exemple, pour un club de catégorie moyen qui prend le site et le logiciel, l’abonnement est à partir de {{club:abo-moyen-pack}} € par mois, avec une mise en place à partir de {{club:mep-moyen-pack}} €. Ce sont des estimations pour un club type. Le simulateur calcule celles de votre club, et le devis définitif suit un premier échange.`,
  },
  {
    id: 'prix-pack',
    theme: 'prix',
    q: `Y a-t-il une réduction si l’on prend le site et le logiciel ensemble ?`,
    a: `Oui. Le pack « site + logiciel » bénéficie d’une remise de {{club:remise-pack}} %, appliquée à la mise en place et à l’abonnement. En plus des économies, les deux outils partagent les mêmes données : une adhésion faite sur le site apparaît tout de suite chez le bureau. Estimation exacte dans le [simulateur](/clubs-de-tennis/simulateur).`,
  },
  {
    id: 'prix-paiement-en-fois',
    theme: 'prix',
    q: `Peut-on payer la mise en place en plusieurs fois ?`,
    a: `Oui, pour toutes les formules : la mise en place se règle en {{club:fois}} fois sans frais, sur les {{club:fois}} premiers mois. Cela évite de sortir une grosse somme d’un coup de la trésorerie du club. L’abonnement mensuel, lui, est prélevé à chaque échéance.`,
  },
  {
    id: 'prix-annuel',
    theme: 'prix',
    q: `Peut-on payer l’abonnement à l’année ?`,
    a: `Oui, et c’est plus économique : l’abonnement payé à l’année coûte {{club:remise-annuel}} % de moins que les mensualités. Beaucoup de trésoriers apprécient de régler une seule fois, au moment de la saison. Dites-nous votre préférence lors du devis, il sera établi dans ce sens.`,
  },
  {
    id: 'prix-prelevement',
    theme: 'prix',
    q: `Comment se fait le paiement de l’abonnement ?`,
    a: `Par prélèvement automatique, avec un mandat SEPA signé par le club. Le trésorier n’a donc pas de virement à penser chaque mois. Le montant et les dates figurent dans le devis. Les frais de paiement en ligne des adhésions sont un sujet différent : HelloAsso est gratuit pour le club.`,
  },
  {
    id: 'prix-engagement',
    theme: 'prix',
    q: `Quelle est la durée d’engagement ?`,
    a: `L’engagement porte sur une saison, soit {{club:engagement}} mois. Cette durée permet au club d’installer ses habitudes et de passer une saison complète avec l’outil : inscriptions, école, compétitions, assemblée générale. Les conditions précises sont reprises dans le devis et dans les [conditions générales de la plateforme](/cgv-plateforme).`,
  },
  {
    id: 'prix-reconduction',
    theme: 'prix',
    q: `Que se passe-t-il à la fin de la première saison ?`,
    a: `L’abonnement est ensuite reconduit chaque année. C’est à ce moment que la catégorie est revue, justificatif à l’appui, selon les licenciés de la saison en cours. Les conditions de reconduction figurent dans les conditions générales de la plateforme, que nous vous remettons avant la signature.`,
  },
  {
    id: 'prix-resiliation',
    theme: 'prix',
    q: `Comment résilier l’abonnement ?`,
    a: `Les conditions de résiliation figurent dans les [conditions générales de la plateforme](/cgv-plateforme), que vous recevez avant de vous engager. Lisez-les avec le bureau, et posez-nous vos questions. Quoi qu’il arrive, vous pouvez exporter les données du club à tout moment, pour ne jamais être bloqué.`,
  },
  {
    id: 'prix-indicatif',
    theme: 'prix',
    q: `Pourquoi les prix sont-ils toujours « à partir de » ?`,
    a: `Parce qu’ils sont calculés pour un club type de chaque catégorie. Votre club a ses particularités : nombre d’options, pages à reprendre, sources de données à importer. Le devis définitif est établi après un premier échange, et rien n’est facturé avant votre accord écrit.`,
  },
  {
    id: 'prix-non-compris',
    theme: 'prix',
    q: `Qu’est-ce qui n’est pas compris dans l’abonnement ?`,
    a: `Les options, les heures d’accompagnement au-delà de celles incluses, les développements propres à un seul club et la saisie du contenu à votre place. Les frais de paiement en ligne ne sont pas compris non plus si vous choisissez un autre prestataire que HelloAsso. Tout est listé sur la page des [tarifs](/clubs-de-tennis/tarifs).`,
  },

  // ───────────────────────── ADOC / FFT ─────────────────────────
  {
    id: 'adoc-fichiers',
    theme: 'adoc-fft',
    q: `Peut-on échanger des fichiers avec ADOC ?`,
    a: `Oui. Le logiciel sait importer et exporter des fichiers ADOC. Vous déposez le fichier exporté d’ADOC pour alimenter vos fiches, et vous exportez un fichier au format attendu pour l’y reporter. C’est un échange de fichiers, géré par une personne du bureau, pas une liaison automatique. Voir la fonction [import et export ADOC](/clubs-de-tennis/fonctionnalites/import-export-adoc).`,
  },
  {
    id: 'adoc-connexion-directe',
    theme: 'adoc-fft',
    q: `Y a-t-il une connexion automatique avec ADOC ?`,
    a: `Non. Il n’y a pas de connexion directe : nous n’avons pas accès à votre compte ADOC et ADOC n’envoie rien tout seul. Tout passe par des fichiers que le club importe et exporte lui-même. Cela vous laisse la main sur ce qui entre et sort, et rien ne se met à jour sans que vous l’ayez décidé.`,
  },
  {
    id: 'adoc-partenariat-fft',
    theme: 'adoc-fft',
    q: `{{nom:produit}} est-il reconnu ou validé par la FFT ?`,
    a: `Non. {{nom:produit}} est un produit indépendant, fait par Stackup Agency. Il n’y a aucun partenariat, agrément ni label de la Fédération. ADOC et Ten’Up sont des services de la FFT, distincts de notre offre. Nous nous contentons de lire et d’écrire des fichiers compatibles pour vous simplifier le travail.`,
  },
  {
    id: 'adoc-remplace',
    theme: 'adoc-fft',
    q: `Faut-il continuer à utiliser ADOC ?`,
    a: `Oui. Les démarches fédérales, comme les licences, restent dans ADOC. {{nom:produit}} ne s’y substitue pas : il vous évite de retaper les mêmes informations en reprenant les fichiers, et il s’occupe de tout ce qu’ADOC ne couvre pas, comme le site, la communication, l’école ou les relances.`,
  },
  {
    id: 'adoc-tenup',
    theme: 'adoc-fft',
    q: `Et Ten’Up, que devient-il ?`,
    a: `Rien ne change : votre club garde ses usages de Ten’Up, comme avant. {{nom:produit}} n’annonce aucune intégration avec ce service. Vos joueurs continuent à l’utiliser pour ce que la Fédération y propose. Si vous souhaitez aller plus loin que de simples liens entre vos pages et Ten’Up, cela se discute sur devis.`,
  },
  {
    id: 'adoc-licences-manquantes',
    theme: 'adoc-fft',
    q: `Le logiciel repère-t-il les licences manquantes ?`,
    a: `Oui. Au moment de l’import d’un fichier ADOC, le logiciel contrôle les licences manquantes : il vous signale les adhérents qui ne sont pas encore licenciés ou qu’on ne retrouve pas. Le bureau sait ainsi à qui écrire avant le début des compétitions, plutôt que de le découvrir au dernier moment.`,
  },
  {
    id: 'adoc-double-saisie',
    theme: 'adoc-fft',
    q: `Devra-t-on saisir deux fois les adhérents ?`,
    a: `Non, c’est justement ce que l’échange de fichiers évite. Les adhésions faites sur le site arrivent dans le logiciel. Pour les licences, vous exportez au format ADOC au lieu de retaper chaque fiche. Il reste un geste manuel, l’import ou l’export, mais il se fait en quelques clics par le bureau.`,
  },

  // ───────────────────────── DONNÉES ─────────────────────────
  {
    id: 'donnees-rgpd',
    theme: 'donnees',
    q: `{{nom:produit}} respecte-t-il le RGPD ?`,
    a: `Nous travaillons pour que vous puissiez respecter vos obligations. Un contrat de traitement des données personnelles est inclus dans l’abonnement. Les statistiques de visite du site n’utilisent pas de cookie de suivi publicitaire, et la galerie vous aide à respecter le droit à l’image. Le guide [RGPD d’un club de tennis](/clubs-de-tennis/guides/rgpd-club-de-tennis) détaille vos démarches.`,
  },
  {
    id: 'donnees-proprietaire',
    theme: 'donnees',
    q: `À qui appartiennent les données du club ?`,
    a: `Au club. Les fiches des adhérents, les documents, les photos et les textes sont les vôtres. Nous les conservons et les traitons pour faire fonctionner le service, rien de plus. Vous pouvez en demander l’export complet à tout moment, sans avoir à justifier votre demande.`,
  },
  {
    id: 'donnees-export',
    theme: 'donnees',
    q: `Peut-on récupérer toutes nos données ?`,
    a: `Oui, à tout moment : l’export complet des données fait partie de l’abonnement. Vous n’avez pas besoin d’attendre la fin du contrat, ni de nous le demander avec une raison. C’est une garantie pour le club : si vous changez d’avis ou de bureau, vos informations restent à vous.`,
  },
  {
    id: 'donnees-sauvegardes',
    theme: 'donnees',
    q: `Les données sont-elles sauvegardées ?`,
    a: `Oui. L’abonnement comprend des sauvegardes quotidiennes, ainsi que l’hébergement, le nom de domaine, une connexion sécurisée (https), la surveillance et la sécurité. Si quelqu’un efface une fiche par erreur, signalez-le-nous rapidement : nous regardons ce qui peut être restauré.`,
  },
  {
    id: 'donnees-mineurs',
    theme: 'donnees',
    q: `Qu’en est-il des données des enfants et des mineurs ?`,
    a: `L’école de tennis compte beaucoup de mineurs, nous en tenons compte. Le dossier d’un enfant est rattaché à sa famille, et l’espace parent permet au responsable de le suivre. Seules les personnes ayant le rôle adéquat, par exemple l’enseignant ou le secrétaire, voient ce qui leur est utile. Le journal garde la trace de qui a fait quoi.`,
  },
  {
    id: 'donnees-sous-traitant',
    theme: 'donnees',
    q: `Qui est responsable des données : le club ou vous ?`,
    a: `Le club est responsable du traitement : c’est lui qui décide pourquoi il collecte ces informations. Stackup Agency agit comme sous-traitant : nous les traitons pour votre compte, selon vos instructions. Le contrat de traitement des données personnelles, inclus dans l’abonnement, fixe cette répartition par écrit.`,
  },
  {
    id: 'donnees-fin-contrat',
    theme: 'donnees',
    q: `Que deviennent nos données si l’on arrête ?`,
    a: `Vous les récupérez par l’export complet, que vous pouvez lancer à tout moment, donc avant votre départ. Les conditions de fin de contrat figurent dans les conditions générales de la plateforme. Si vous voulez que le site continue de fonctionner sans nous, l’option « copie autonome » ({{club:opt-copie-autonome-mep}} € à partir de) fournit une copie qui tourne sans la plateforme.`,
  },
  {
    id: 'donnees-qui-voit-quoi',
    theme: 'donnees',
    q: `Tout le monde voit-il toutes les informations ?`,
    a: `Non. Chaque personne a un rôle : président, trésorier, secrétaire, enseignant, capitaine, bénévole… Et chaque rôle donne accès uniquement à ce qui lui sert. Un capitaine voit ses joueurs, pas la trésorerie. Les comptes du bureau et des enseignants sont illimités, vous pouvez donc donner un compte à chacun.`,
  },

  // ───────────────────────── MISE EN PLACE ─────────────────────────
  {
    id: 'mep-premier-echange',
    theme: 'mise-en-place',
    q: `Comment se passe le premier échange ?`,
    a: `Vous nous racontez votre club : ce que vous avez aujourd’hui, ce qui vous fait perdre du temps, ce que vous aimeriez. Nous vous montrons ce qui y répond et ce qui n’existe pas. À la fin, vous savez si l’offre vous convient. Pour le demander, [prenez rendez-vous](/contact?a=appel).`,
  },
  {
    id: 'mep-justificatif',
    theme: 'mise-en-place',
    q: `Que faut-il préparer pour obtenir un devis ?`,
    a: `Peu de choses : le nombre de licenciés de la saison en cours (avec un justificatif), la liste de ce que vous voulez, comme le site, le logiciel ou des options, et si vous avez déjà un site à reprendre. Le reste se règle ensemble pendant l’échange. Inutile de tout avoir en main pour nous écrire.`,
  },
  {
    id: 'mep-devis',
    theme: 'mise-en-place',
    q: `Comment obtient-on un devis ?`,
    a: `Deux chemins. Vous pouvez d’abord faire une estimation avec le [simulateur](/clubs-de-tennis/simulateur), qui vous donne un ordre de grandeur. Puis vous demandez un devis, établi après un premier échange. Le devis précise la catégorie, les options, la mise en place et le délai. Vous le validez avec le bureau avant tout démarrage.`,
  },
  {
    id: 'mep-delai',
    theme: 'mise-en-place',
    q: `Combien de temps faut-il pour mettre le site en place ?`,
    a: `Cela dépend de la quantité de contenu à reprendre, de la rapidité avec laquelle le club nous fournit ses documents et des options choisies. Nous ne promettons donc pas de durée à l’avance : le délai est précisé au devis, et nous vous tenons au courant de l’avancement.`,
  },
  {
    id: 'mep-formation',
    theme: 'mise-en-place',
    q: `Y a-t-il une formation pour le bureau ?`,
    a: `L’accompagnement comprend la prise en main : nous montrons à celles et ceux qui s’en serviront comment modifier le site et utiliser le logiciel, dans la limite des heures incluses de votre catégorie. Pas besoin d’être à l’aise avec l’informatique. Si vous voulez plus de temps, l’heure supplémentaire est à {{club:heure-supp}} €, par demi-heure entamée.`,
  },
  {
    id: 'mep-reprise-membres',
    theme: 'mise-en-place',
    q: `Comment reprend-on la liste de nos membres ?`,
    a: `Vous nous donnez un export ADOC ou un tableur, et les membres sont importés dans le logiciel, avec contrôle des licences manquantes. Une source d’import est comprise. Pour une source supplémentaire, comptez l’option « import » ({{club:opt-import-source-mep}} € à partir de). Une reprise depuis un autre logiciel passe par un devis.`,
  },
  {
    id: 'mep-rendez-vous',
    theme: 'mise-en-place',
    q: `Peut-on se rencontrer en personne ?`,
    a: `Oui. Le premier rendez-vous en présentiel est gratuit jusqu’à {{club:km}} km de Savigné-sur-Lathan. Au-delà, nous faisons le rendez-vous en visio, ou nous convenons ensemble d’une indemnité de déplacement, indiquée sur le devis. Nous intervenons dans toute la région, et partout en France à distance.`,
  },
  {
    id: 'mep-heures',
    theme: 'mise-en-place',
    q: `Que sont les heures d’accompagnement ?`,
    a: `C’est le temps que nous passons avec vous pour recueillir vos demandes, régler le site ou les écrans et former le bureau. Chaque catégorie en comprend un certain nombre : par exemple {{club:heures-moyen-pack}} heures pour un club moyen qui prend le pack. Au-delà, l’heure supplémentaire est à {{club:heure-supp}} €, par demi-heure.`,
  },
  {
    id: 'mep-contenu',
    theme: 'mise-en-place',
    q: `Que doit fournir le club pour son site ?`,
    a: `Le logo, quelques photos, les informations pratiques (horaires, tarifs, contacts) et vos documents, comme le règlement ou le formulaire d’adhésion. La saisie du contenu à votre place n’est pas comprise. Si le temps manque, deux options existent : la reprise de l’ancien site ({{club:opt-reprise-contenu-mep}} € la page) ou la rédaction d’une page ({{club:opt-redaction-page-mep}} € la page, à partir de).`,
  },
  {
    id: 'mep-bureau-deborde',
    theme: 'mise-en-place',
    q: `Notre bureau manque de temps : est-ce un problème ?`,
    a: `Non, c’est le cas de la plupart des clubs. Nous prenons en charge la mise en place, et le logiciel est pensé pour que chacun s’occupe de sa tâche : l’écran « Ma journée » indique à chaque membre du bureau ce qui demande une action aujourd’hui. Vous avancez à votre rythme, et nous restons joignables par e-mail.`,
  },

  // ───────────────────────── FONCTIONNEMENT ─────────────────────────
  {
    id: 'fonc-helloasso',
    theme: 'fonctionnement',
    q: `Comment fonctionne le paiement avec HelloAsso ?`,
    a: `Le membre paie en ligne en passant par HelloAsso. L’argent va directement sur le compte bancaire du club, jamais chez nous, et HelloAsso est gratuit pour le club. Le logiciel suit les paiements automatiquement : le trésorier voit qui a réglé, sans pointer à la main. Voir [le paiement en ligne HelloAsso](/clubs-de-tennis/fonctionnalites/paiement-en-ligne-helloasso).`,
  },
  {
    id: 'fonc-emails',
    theme: 'fonctionnement',
    q: `Comment le club écrit-il à ses membres ?`,
    a: `Par e-mail et par notification sur le téléphone, depuis le logiciel. Vous pouvez écrire à tout le club, à un groupe, à une équipe ou aux parents d’un cours. Certains messages partent tout seuls : rappels de réinscription, convocations. Les e-mails automatiques sont compris dans un usage normal d’association. Voir la fonction [communication](/clubs-de-tennis/fonctionnalites/communication).`,
  },
  {
    id: 'fonc-sms',
    theme: 'fonctionnement',
    q: `Pourquoi n’y a-t-il pas de SMS pour prévenir les membres ?`,
    a: `Non, les SMS ne sont pas proposés. Le club utilise les e-mails, les notifications sur le téléphone ou ses propres groupes de messagerie, que vous pouvez garder. Pour un message urgent, comme un cours annulé à cause de la pluie, la notification arrive aussitôt sur le téléphone de ceux qui ont installé l’espace membre.`,
  },
  {
    id: 'fonc-telephone',
    theme: 'fonctionnement',
    q: `Est-ce que cela fonctionne sur téléphone ?`,
    a: `Oui, le site est conçu pour s’afficher parfaitement sur téléphone. L’espace membre et parent peut s’installer comme une application, sans passer par un magasin d’applications. L’enseignant peut ainsi faire l’appel de son groupe depuis le bord du court. Une application publiée sur l’App Store ou Google Play, elle, est possible sur devis.`,
  },
  {
    id: 'fonc-espace-parent',
    theme: 'fonctionnement',
    q: `À quoi sert l’espace parent ?`,
    a: `Un parent y retrouve la famille au même endroit : les enfants inscrits, les cours, les annonces du club, les documents à fournir et les paiements. Il n’a plus besoin d’appeler le secrétaire pour savoir si le cours a lieu. Voir la fonction [espace membre et parent](/clubs-de-tennis/fonctionnalites/espace-membre-et-parent).`,
  },
  {
    id: 'fonc-courts',
    theme: 'fonctionnement',
    q: `Les membres peuvent-ils réserver un court en ligne ?`,
    a: `Oui, avec l’option « réservation de courts en ligne » ({{club:opt-reservation-courts-mensuel}} € par mois, à partir de) : le membre réserve depuis son téléphone. En revanche, nous ne gérons pas l’accès physique aux courts, comme les codes ou les serrures : cela reste géré par le club. Voir la [réservation de courts](/clubs-de-tennis/fonctionnalites/reservation-de-courts).`,
  },
  {
    id: 'fonc-assistant-ia',
    theme: 'fonctionnement',
    q: `À quoi sert l’assistant IA du club ?`,
    a: `C’est une option du logiciel ({{club:opt-assistant-ia-mensuel}} € par mois, à partir de). Il répond à vos questions sur les données du club et aide à rédiger : actualités, lettres d’information, dossiers de subvention, rapport d’assemblée générale. Un humain valide toujours avant l’envoi. Son usage est plafonné, et le coût réel est annoncé avant tout dépassement.`,
  },
  {
    id: 'fonc-support',
    theme: 'fonctionnement',
    q: `Que faire en cas de problème ou de question ?`,
    a: `Écrivez-nous par e-mail ou via le formulaire. Délai de réponse maximal : {{club:support-jours}} jours ouvrés. La maintenance et la correction des anomalies sont comprises dans l’abonnement, ainsi que les mises à jour et les nouvelles fonctionnalités de votre formule, sans supplément.`,
  },
  {
    id: 'fonc-modifier-site',
    theme: 'fonctionnement',
    q: `Pourra-t-on modifier le site soi-même ?`,
    a: `Oui, c’est même le but. Un éditeur permet au club de changer tous les textes, images, liens, menus et documents, et de créer autant de nouvelles pages qu’il veut. Pas besoin de nous appeler pour ajouter une actualité ou un horaire. Voir [un site modifiable par le club](/clubs-de-tennis/fonctionnalites/site-modifiable-par-le-club).`,
  },
  {
    id: 'fonc-ecole',
    theme: 'fonctionnement',
    q: `Comment gère-t-on l’école de tennis ?`,
    a: `Le logiciel gère les groupes, l’appel sur téléphone, les annulations et les reports, par exemple un cours supprimé pour cause de pluie, et la progression des enfants selon Galaxie Tennis. Les parents sont prévenus et l’enseignant retrouve ses listes d’élèves. Voir la fonction [école de tennis](/clubs-de-tennis/fonctionnalites/ecole-de-tennis).`,
  },
  {
    id: 'fonc-competitions',
    theme: 'fonctionnement',
    q: `Peut-on organiser les équipes et les convocations ?`,
    a: `Oui. Les joueurs indiquent leurs disponibilités, le capitaine compose l’équipe, et les convocations partent par e-mail ou notification, avec un outil de covoiturage. Le club gère aussi un challenge interne, avec classement et saisie des matchs au format FFT. Voir [équipes et compétitions](/clubs-de-tennis/fonctionnalites/equipes-et-competitions).`,
  },

  // ───────────────────────── PADEL / PICKLEBALL ─────────────────────────
  {
    id: 'padel-inclus',
    theme: 'padel-pickleball',
    q: `Le padel et le pickleball sont-ils pris en compte ?`,
    a: `Oui. Le site comprend des sections dédiées si votre club propose ces pratiques, et le logiciel gère le planning global des courts et des activités. Vous n’avez pas besoin d’un abonnement séparé. Voyez les pages [padel](/clubs-de-tennis/padel) et [pickleball](/clubs-de-tennis/pickleball).`,
  },
  {
    id: 'padel-licencies',
    theme: 'padel-pickleball',
    q: `Les licenciés de padel et de pickleball comptent-ils dans la catégorie ?`,
    a: `Oui. La catégorie de prix se fonde sur les licenciés FFT de la saison en cours, tennis, padel et pickleball compris. Un club qui ouvre une section padel peut donc passer dans une catégorie supérieure au renouvellement, jamais en cours de saison. La catégorie suit le justificatif fourni.`,
  },
  {
    id: 'padel-nouvelle-section',
    theme: 'padel-pickleball',
    q: `Notre club ouvre une section padel : comment s’y prendre ?`,
    a: `Parlez-en dès le premier échange : nous prévoyons la section sur le site et l’organisation des courts dans le logiciel. Si le padel se joue sur un autre lieu, l’option « plusieurs lieux ou sections » ({{club:opt-plusieurs-lieux-mep}} € à partir de) peut convenir. Notre guide [ouvrir une section padel ou pickleball](/clubs-de-tennis/guides/ouvrir-section-padel-pickleball-gestion) vous accompagne.`,
  },
]

/** Les 8 questions les plus fréquentes, reprises sur la grande page. */
export const FAQ_COURTE_IDS: string[] = [
  'offre-cest-quoi',
  'offre-difference-adoc',
  'prix-categories',
  'prix-paiement-en-fois',
  'prix-engagement',
  'adoc-fichiers',
  'donnees-export',
  'mep-premier-echange',
]
