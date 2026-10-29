// À faire relire par un professionnel du droit avant le premier contrat.
/**
 * CGV DE LA PLATEFORME « {{produit}} » — conditions de l'abonnement des clubs de tennis (site, logiciel, ou les deux).
 * Distinctes des CGV agence (src/app/cgv/page.tsx), qui prévoient la cession du code : ici, aucune cession, une
 * licence d'utilisation pendant l'abonnement.
 *
 * Rendu par la page /cgv-plateforme, qui insère l'identité de l'entreprise (src/config/company.ts) en tête et passe
 * chaque chaîne dans `jetons` (src/lib/jetons.ts). Aucun montant de prix en chiffres : jetons {{club:…}} uniquement.
 * Les champs `todo` sont des notes de relecture : ils ne s'affichent jamais publiquement.
 */

export interface ArticleCgv {
  id: string
  titre: string
  paragraphes: string[]
  liste?: string[]
  /** Point à faire valider avant le premier contrat. Jamais affiché sur le site public. */
  todo?: string
}

const TARIFS = '[tarifs](/clubs-de-tennis/tarifs)'

const ARTICLES: ArticleCgv[] = [
  {
    id: 'objet',
    titre: '1. Définitions et objet',
    paragraphes: [
      `Le **Prestataire** désigne Mathéo REBOUL EI, exerçant sous le nom commercial Stackup Agency, dont l’identification complète figure en tête des présentes.`,
      `Le **Club** désigne l’association sportive, ou toute autre structure, qui souscrit un abonnement à {{produit}} par la signature d’un devis.`,
      `Les présentes conditions générales de vente (CGV) fixent les règles de la mise à disposition, par le Prestataire, d’une plateforme en ligne appelée {{produit}}, accessible par abonnement. Elles ne concernent pas les créations de sites ou d’outils vendues par le Prestataire avec cession du code, qui relèvent des [CGV de l’agence](/cgv).`,
      `Dans les présentes, les mots suivants ont le sens indiqué :`,
    ],
    liste: [
      `**Plateforme** : l’ensemble du service {{produit}}, hébergé et entretenu par le Prestataire, comprenant selon la formule choisie le Site et le Logiciel.`,
      `**Site** : le site internet public du Club, avec son éditeur qui permet au Club de modifier lui-même ses textes, images, menus et pages.`,
      `**Logiciel** : l’outil de gestion du bureau du Club (adhérents, adhésions, école de tennis, équipes, communication, etc.) et l’espace membre et parent.`,
      `**Formule** : le Site seul, le Logiciel seul, ou les deux ensemble (le pack).`,
      `**Mise en place** : la préparation de la Plateforme pour le Club (thème, pages, import des membres, prise en main), facturée une fois.`,
      `**Abonnement** : l’accès à la Plateforme et les services qui l’accompagnent, facturés chaque mois ou chaque année.`,
      `**Catégorie** : la tranche de taille du Club, qui détermine son prix (article 4).`,
      `**Utilisateurs** : les personnes à qui le Club ouvre un accès (membres du bureau, enseignants, bénévoles, adhérents, parents).`,
      `**Contenus** : les textes, photos, logos, documents et informations que le Club ou ses Utilisateurs déposent sur la Plateforme.`,
      `**Devis** : la proposition écrite du Prestataire, signée par le Club, qui précise la formule, la Catégorie, les options, les prix et les conditions particulières.`,
    ],
  },
  {
    id: 'documents',
    titre: '2. Documents contractuels et ordre de priorité',
    paragraphes: [
      `Le contrat entre le Club et le Prestataire est formé des documents suivants, du plus fort au plus faible : le **Devis signé**, les présentes **CGV**, puis l’**annexe « Contrat de traitement des données »**. En cas de contradiction entre eux, le document placé avant l’emporte, sauf pour la protection des données personnelles, où l’annexe l’emporte sur les CGV.`,
      `Le Devis est signé par une personne habilitée à engager le Club (en principe son président ou sa présidente, ou une personne qu’il ou elle a mandatée). Sa signature vaut acceptation des CGV et de l’annexe en vigueur ce jour-là. Les conditions générales ou bons de commande propres au Club ne s’appliquent pas, sauf accord écrit du Prestataire.`,
      `Le Prestataire peut faire évoluer les présentes CGV. Une nouvelle version ne s’applique à un contrat en cours qu’à la date de son renouvellement, après avoir été communiquée au Club par e-mail au moins 2 mois avant. Le Club qui la refuse peut ne pas renouveler son contrat, dans les conditions de l’article 8.`,
    ],
  },
  {
    id: 'licence',
    titre: '3. Licence d’utilisation et propriété',
    paragraphes: [
      `Pendant toute la durée de l’abonnement, le Prestataire accorde au Club un **droit d’utilisation non exclusif et non cessible** de la Plateforme, pour ses propres besoins et ceux de ses Utilisateurs. Ce droit prend fin avec le contrat.`,
      `Le Prestataire reste seul propriétaire de la Plateforme : son code, sa conception, ses thèmes, ses modèles de pages et ses fonctionnalités. **Aucune cession du code n’a lieu**, ni pendant le contrat ni à sa fin. Le Club s’interdit de copier, modifier, revendre ou mettre à disposition d’un tiers tout ou partie de la Plateforme, en dehors de l’usage normal du Site et du Logiciel.`,
      `**Le Club reste propriétaire de ses données et de ses Contenus** : textes, photos, logo, documents, fichiers d’adhérents. Il concède au Prestataire, pour la seule durée du contrat, le droit de les héberger, de les reproduire techniquement (sauvegardes, copies de travail) et de les afficher sur la Plateforme, dans la stricte mesure nécessaire à la fourniture du service. Le Prestataire n’en fait aucun autre usage, sous réserve de l’article 21 (références).`,
    ],
  },
  {
    id: 'categorie',
    titre: '4. Catégorie du Club',
    paragraphes: [
      `Le prix dépend de la Catégorie du Club, fixée selon le nombre de **licenciés FFT de la saison en cours**, en comptant ensemble le tennis, le padel et le pickleball :`,
      `Le Club justifie ce nombre par un **export de ses licenciés tiré d’ADOC**, ou par le **rapport présenté à son assemblée générale**, faisant apparaître les trois dernières saisons. Lorsque le nombre déclaré est nettement inférieur à celui des saisons précédentes, le Prestataire peut demander ce justificatif avant de retenir la Catégorie.`,
      `La Catégorie est revue **une fois par an, au renouvellement** du contrat, sur la base de la saison en cours à cette date. Elle ne change **jamais en cours de saison**, même si le nombre de licenciés augmente ou diminue entre-temps. Une nouvelle Catégorie, à la hausse comme à la baisse, est annoncée au Club avant le renouvellement.`,
    ],
    liste: [
      `**Mini** : de {{club:min:mini}} à {{club:max:mini}} licenciés ;`,
      `**Petit** : de {{club:min:petit}} à {{club:max:petit}} licenciés ;`,
      `**Moyen** : de {{club:min:moyen}} à {{club:max:moyen}} licenciés ;`,
      `**Grand** : de {{club:min:grand}} à {{club:max:grand}} licenciés ;`,
      `**Très grand** : {{club:min:tres-grand}} licenciés et plus.`,
    ],
  },
  {
    id: 'prix',
    titre: '5. Prix',
    paragraphes: [
      `Les prix affichés sur le site du Prestataire, notamment sur la page ${TARIFS} et dans le simulateur, sont **indicatifs** : ils donnent un ordre de grandeur « à partir de ». **Le prix ferme est celui du Devis signé.** Les prix sont exprimés en euros ; la mention relative à la TVA figure en tête des présentes et sur chaque Devis.`,
      `La formule qui réunit le Site et le Logiciel bénéficie d’une remise de {{club:remise-pack}} % sur la mise en place et sur l’abonnement, par rapport au prix des deux formules prises séparément. Le paiement annuel de l’abonnement bénéficie d’une remise de {{club:remise-annuelle}} % (article 7). Aucune autre remise n’est consentie.`,
      `Les options choisies par le Club (par exemple la réservation de courts ou l’assistant IA) figurent au Devis, avec leur prix de mise en place et, le cas échéant, leur prix mensuel. Une option ajoutée en cours de contrat fait l’objet d’un nouveau Devis ou d’un avenant.`,
      `Le Prestataire peut réviser le prix de l’abonnement **au plus une fois par an**. Toute révision est annoncée par écrit au Club **au moins 2 mois avant** sa date d’effet, qui coïncide avec l’échéance annuelle du contrat. Le Club qui n’accepte pas le nouveau prix peut résilier son contrat avant cette date d’effet, sans frais ni pénalité, par simple e-mail ; il continue alors de payer l’ancien prix jusqu’à la fin de la période en cours.`,
    ],
  },
  {
    id: 'mise-en-place',
    titre: '6. Mise en place',
    paragraphes: [
      `La mise en place comprend ce que décrit le Devis pour la formule choisie : par exemple le choix et le réglage du thème aux couleurs du Club, la création des pages (jusqu’à {{club:pages}} pages pour le Site, pages légales en plus), l’import des membres depuis une source (export ADOC ou tableur) pour le Logiciel, et la prise en main par le bureau.`,
      `Elle est payable **en une fois** à la signature du Devis, ou **en {{club:fois}} fois sans frais**, par parts égales sur les {{club:fois}} premiers mois de l’abonnement.`,
      `Le calendrier de mise en place est indicatif. Il dépend en grande partie des éléments que le Club fournit (textes, photos, logo, fichier des membres, validations). Le Prestataire informe le Club par écrit de tout décalage. La Plateforme est ouverte aux Utilisateurs quand le Club a validé sa mise en ligne.`,
    ],
  },
  {
    id: 'abonnement',
    titre: '7. Abonnement et paiement',
    paragraphes: [
      `L’abonnement est payé **chaque mois par prélèvement SEPA**, sur la base d’un mandat signé par le Club. Le Club peut aussi choisir le **paiement annuel**, en une fois et d’avance, avec une remise de {{club:remise-annuelle}} % sur le prix mensuel. Le choix figure au Devis et peut être modifié à chaque renouvellement.`,
      `L’abonnement commence à la date d’ouverture des accès au Club, précisée au Devis. Il comprend, pour la formule choisie :`,
      `Il ne comprend pas : les heures d’accompagnement au-delà de celles incluses (article 10) ; les développements propres à un seul club (article 15) ; les options non souscrites ; les frais du service de paiement en ligne ; la saisie des contenus à la place du Club ; l’envoi de SMS, qui n’est pas proposé ; la gestion des accès physiques aux courts (codes, serrures), qui n’est pas proposée.`,
    ],
    liste: [
      `l’hébergement, le nom de domaine, la connexion sécurisée (https), les sauvegardes quotidiennes, la surveillance et la sécurité ;`,
      `les mises à jour, la maintenance et les nouvelles fonctionnalités de la formule ;`,
      `le support par e-mail ou par formulaire (article 13) ;`,
      `des comptes illimités pour le bureau et les enseignants, et des membres illimités dans la limite de la Catégorie ;`,
      `les e-mails automatiques de la Plateforme, dans un usage normal (article 11) ;`,
      `un espace de stockage qui dépend de la Catégorie, précisé au Devis ;`,
      `l’export complet des données du Club, à tout moment ;`,
      `le contrat de traitement des données personnelles, en annexe.`,
    ],
  },
  {
    id: 'duree',
    titre: '8. Durée, reconduction et résiliation',
    paragraphes: [
      `Le contrat est conclu pour une **durée d’engagement de {{club:engagement}} mois**, à compter du début de l’abonnement. À la fin de cette période, il se **reconduit automatiquement par périodes d’un an**, sauf si l’une des parties y met fin.`,
      `Le Club peut mettre fin au contrat à l’échéance de l’engagement ou de toute période de reconduction, en prévenant le Prestataire **au moins 1 mois avant cette échéance**, par e-mail ou par courrier. Le Prestataire peut faire de même en prévenant le Club **au moins 3 mois avant l’échéance**, pour lui laisser le temps de s’organiser.`,
      `Si le Club met fin au contrat avant la fin de la période d’engagement, hors des cas prévus aux articles 5, 15 et 20, les sommes restant dues jusqu’à la fin de cette période restent exigibles, y compris le solde de la mise en place payée en plusieurs fois.`,
      `Si l’une des parties manque gravement à ses obligations et n’y remédie pas dans les 30 jours suivant une mise en demeure envoyée par lettre recommandée ou par e-mail avec accusé de réception, l’autre partie peut résilier le contrat sans attendre son échéance.`,
      `Dans tous les cas de fin du contrat, l’article 17 s’applique : le Club récupère ses données.`,
    ],
  },
  {
    id: 'information-reconduction',
    titre: '9. Information sur la reconduction',
    paragraphes: [
      `Avant chaque échéance, le Prestataire rappelle au Club, par e-mail, la date de fin de la période en cours, la possibilité de ne pas reconduire le contrat et la date limite pour le faire.`,
      `Lorsque le Club agit en tant que non-professionnel, cette information lui est adressée dans les délais prévus par le Code de la consommation. À défaut, le Club peut mettre fin au contrat à tout moment après la date de reconduction, dans les conditions prévues par ce code.`,
    ],
    todo: `TODO juriste : les associations peuvent être des non-professionnels au sens du Code de la consommation (art. L. 215-1 et suivants, information du consommateur ou non-professionnel sur la faculté de ne pas reconduire, au plus tôt 3 mois et au plus tard 1 mois avant le terme) — à valider ; aucune automatisation tant que ce point n’est pas validé.`,
  },
  {
    id: 'accompagnement',
    titre: '10. Accompagnement et heures incluses',
    paragraphes: [
      `Chaque formule comprend un nombre d’**heures d’accompagnement**, qui dépend de la formule et de la Catégorie. Il est indiqué sur la page ${TARIFS} et repris au Devis. Ces heures servent pendant la mise en place : recueil des demandes du Club, réglages, prise en main par le bureau et les enseignants. Les heures non utilisées ne sont ni remboursées ni reportées.`,
      `Au-delà, le temps d’accompagnement est facturé **{{club:heure}} € de l’heure**, par tranche de 30 minutes. Il est toujours annoncé au Club et accepté par écrit (un e-mail suffit) avant d’être réalisé.`,
    ],
  },
  {
    id: 'obligations-club',
    titre: '11. Obligations du Club',
    paragraphes: [
      `Le Club s’engage à :`,
      `Le Club reste responsable des Contenus qu’il publie et des informations qu’il adresse à ses adhérents. Le Prestataire peut retirer ou rendre inaccessible, après en avoir averti le Club sauf urgence, un Contenu manifestement illicite qui lui est signalé.`,
    ],
    liste: [
      `ne publier que des **contenus licites**, qui ne portent atteinte ni aux droits ni à la réputation de personne ;`,
      `disposer des **droits sur les images** qu’il publie : droits d’auteur des photographes, et autorisations des personnes photographiées, données par les parents pour les mineurs ;`,
      `fournir des informations **exactes et à jour**, notamment le nombre de licenciés servant à fixer sa Catégorie ;`,
      `garder ses **identifiants** confidentiels, ne pas les partager entre plusieurs personnes, fermer les accès des personnes qui quittent le bureau ou le club, et prévenir le Prestataire sans délai en cas de doute sur la sécurité d’un compte ;`,
      `faire un **usage normal des e-mails** : des messages liés à la vie du club, adressés à ses adhérents et contacts, et jamais d’envois en masse à des listes achetées ou sans lien avec le club ;`,
      `désigner un interlocuteur référent pour les échanges avec le Prestataire ;`,
      `respecter ses propres obligations, notamment l’information de ses adhérents sur l’usage de leurs données.`,
    ],
  },
  {
    id: 'impayes',
    titre: '12. Retards et impayés',
    paragraphes: [
      `En cas de prélèvement rejeté ou de facture impayée à son échéance, le Prestataire adresse d’abord une **relance** par e-mail au Club.`,
      `Si la somme n’est toujours pas réglée, le Prestataire envoie une **mise en demeure**. Si elle reste sans effet **15 jours**, le Prestataire peut **suspendre l’accès** à la Plateforme. Les données du Club sont conservées pendant la suspension, et l’accès est rétabli dès le paiement. Si la suspension se prolonge, le Prestataire peut résilier le contrat dans les conditions de l’article 8.`,
      `Lorsque le Club agit en tant que professionnel et que les articles L. 441-10 et D. 441-5 du Code de commerce s’appliquent, toute somme non payée à l’échéance porte de plein droit des **pénalités de retard** au taux de trois fois le taux d’intérêt légal, et donne lieu à une **indemnité forfaitaire de 40 €** pour frais de recouvrement. Dans les autres cas, les sommes impayées portent intérêt au taux légal applicable à compter de la mise en demeure.`,
    ],
  },
  {
    id: 'support',
    titre: '13. Support',
    paragraphes: [
      `Le support est assuré **par e-mail ou par le formulaire** prévu à cet effet. Le Prestataire répond **sous {{club:support-jours}} jours ouvrés** au plus. Ce délai est un délai de réponse : il ne garantit pas un délai de résolution, qui dépend de la nature de la demande.`,
      `Le support répond aux questions d’utilisation et traite les anomalies de la Plateforme. Il ne comprend pas la saisie des contenus à la place du Club ni les développements nouveaux.`,
    ],
  },
  {
    id: 'disponibilite',
    titre: '14. Disponibilité, maintenance et sauvegardes',
    paragraphes: [
      `Le Prestataire met en œuvre les moyens raisonnables pour que la Plateforme soit accessible en continu. Il s’agit d’une **obligation de moyens** : une interruption peut survenir, notamment du fait d’un prestataire technique ou du réseau internet.`,
      `Les opérations de **maintenance** prévisibles sont annoncées au Club à l’avance et réalisées, autant que possible, à des moments de faible utilisation. Une intervention urgente, notamment de sécurité, peut avoir lieu sans préavis.`,
      `Les données de la Plateforme font l’objet de **sauvegardes quotidiennes**. En cas d’incident, le Prestataire restaure la dernière sauvegarde disponible.`,
    ],
  },
  {
    id: 'evolutions',
    titre: '15. Évolutions de la Plateforme',
    paragraphes: [
      `Les **nouvelles fonctionnalités** ajoutées à la formule souscrite sont **incluses** dans l’abonnement, sans supplément. Le Prestataire peut faire évoluer la Plateforme (présentation, fonctionnement) pour l’améliorer ou la sécuriser. S’il retire une fonctionnalité essentielle de la formule souscrite, il en informe le Club au moins 2 mois avant, et le Club peut alors résilier son contrat sans frais.`,
      `Un **développement propre à un club** (une fonction qui n’existe pas dans la Plateforme et que le Club est seul à demander) fait l’objet d’un **devis à {{club:dev-heure}} € de l’heure**, chiffré et accepté avant tout travail. Ce développement fait partie de la Plateforme et reste la propriété du Prestataire, qui peut le proposer à d’autres clubs ; le Club en bénéficie pendant toute la durée de son abonnement.`,
    ],
  },
  {
    id: 'donnees',
    titre: '16. Données personnelles',
    paragraphes: [
      `Pour les données de ses adhérents, parents, enseignants, bénévoles et visiteurs, **le Club est responsable de traitement** : il décide pourquoi et comment ces données sont utilisées. **Le Prestataire agit en tant que sous-traitant** au sens de l’article 28 du Règlement général sur la protection des données (RGPD) : il les traite uniquement pour fournir la Plateforme et selon les instructions du Club.`,
      `Les engagements des deux parties sont décrits dans l’**annexe « Contrat de traitement des données »**, qui fait partie du contrat.`,
      `Pour ses propres besoins (gestion du contrat, facturation, échanges avec les membres du bureau), le Prestataire est responsable de traitement ; sa [politique de confidentialité](/politique-confidentialite) en décrit les conditions.`,
    ],
  },
  {
    id: 'fin-contrat',
    titre: '17. Fin du contrat et récupération des données',
    paragraphes: [
      `À la fin du contrat, quelle qu’en soit la cause, le Prestataire remet au Club un **export complet** de ses données (adhérents, adhésions, historique, documents et fichiers déposés), dans des formats courants et lisibles sans la Plateforme.`,
      `Le Site reste **en ligne pendant 1 mois** après la fin du contrat, pour laisser au Club le temps d’organiser la suite. Les données du Club sont ensuite **supprimées 3 mois après la fin du contrat**, sauf celles que le Prestataire doit conserver en vertu d’une obligation légale (par exemple ses factures).`,
      `Le code de la Plateforme n’étant pas cédé, le Club ne reçoit pas le Site lui-même. Il peut commander, en option, une **copie autonome du Site**, qui fonctionne sans la Plateforme et qu’il fait héberger où il le souhaite, pour {{club:option:copie-autonome:mise}} €. Cette option se commande avant la fin du contrat.`,
    ],
    todo: `TODO : préciser le sort du nom de domaine du Club en fin de contrat (enregistré au nom du Club dès l’origine, ou transféré sans frais à sa demande) et le format exact de l’export.`,
  },
  {
    id: 'responsabilite',
    titre: '18. Responsabilité',
    paragraphes: [
      `Le Prestataire est responsable des dommages directs causés au Club par un manquement à ses obligations. Dans la mesure permise par la loi, sa responsabilité est **limitée au montant payé par le Club au titre du contrat au cours des 12 derniers mois** précédant le fait à l’origine du dommage. Cette limite ne s’applique pas en cas de faute lourde ou dolosive, ni aux dommages corporels.`,
      `Le Prestataire n’est pas responsable des services de tiers que la Plateforme utilise ou vers lesquels elle renvoie, notamment le service de paiement **HelloAsso** et tout autre prestataire de paiement choisi par le Club, l’hébergeur, les messageries des destinataires (filtrage, classement en courrier indésirable) et le réseau internet. Il n’est pas non plus responsable des Contenus publiés par le Club ou ses Utilisateurs, ni des conséquences d’un usage non conforme aux présentes.`,
      `Aucun positionnement dans les moteurs de recherche n’est garanti.`,
    ],
    todo: `TODO juriste : si le Club est un non-professionnel, vérifier que le plafond de responsabilité n’est pas regardé comme abusif (art. L. 212-1, L. 212-2 et R. 212-1, 6° du Code de la consommation) et adapter la clause si besoin.`,
  },
  {
    id: 'deplacements',
    titre: '19. Déplacements',
    paragraphes: [
      `Le **premier rendez-vous en présentiel est gratuit** lorsque le Club se trouve à {{club:km}} km au plus de Savigné-sur-Lathan. Au-delà, ce rendez-vous a lieu en visio, ou en présentiel moyennant une indemnité de déplacement chiffrée sur devis. Les déplacements suivants sont également chiffrés sur devis.`,
    ],
  },
  {
    id: 'force-majeure',
    titre: '20. Force majeure',
    paragraphes: [
      `Aucune des parties n’est responsable d’un retard ou d’un manquement causé par un cas de force majeure au sens de l’article 1218 du Code civil. La partie empêchée en informe l’autre sans délai. Si l’empêchement dure plus de 2 mois, chacune des parties peut résilier le contrat par écrit, sans indemnité ; l’article 17 s’applique.`,
    ],
  },
  {
    id: 'references',
    titre: '21. Références',
    paragraphes: [
      `Sauf refus écrit du Club, adressé à tout moment, le Prestataire peut citer le Club comme référence : son nom, sa commune et l’adresse de son site. Aucune donnée personnelle d’adhérent n’est utilisée à cette fin, et aucun propos n’est prêté au Club sans son accord écrit.`,
    ],
  },
  {
    id: 'retractation',
    titre: '22. Droit de rétractation',
    paragraphes: [
      `Lorsque la loi accorde au Club un droit de rétractation, le Devis en rappelle les conditions et le délai, et lui remet le formulaire correspondant.`,
    ],
    todo: `TODO juriste : vérifier si l’article L. 221-3 du Code de la consommation (contrat conclu hors établissement avec un professionnel employant 5 salariés au plus, hors du champ de son activité principale) peut s’appliquer à un club signant hors établissement, par exemple au club-house ; prévoir alors la rétractation de 14 jours, son formulaire et la demande expresse de commencer la mise en place avant la fin du délai.`,
  },
  {
    id: 'droit-applicable',
    titre: '23. Droit applicable',
    paragraphes: [`Les présentes CGV et le contrat qu’elles régissent sont soumis au droit français.`],
  },
  {
    id: 'litiges',
    titre: '24. Litiges et juridiction',
    paragraphes: [
      `En cas de désaccord, le Club et le Prestataire cherchent d’abord une **solution amiable** : la partie qui se plaint expose sa demande par écrit, et l’autre y répond dans les 30 jours.`,
      `Lorsque le Club agit en tant que non-professionnel, il peut recourir gratuitement à un **médiateur de la consommation**, dont les coordonnées figurent en tête des présentes.`,
      `À défaut d’accord, si le Club est un professionnel, tout litige relève des tribunaux du ressort du siège du Prestataire. Dans les autres cas, le tribunal compétent est désigné selon les règles légales.`,
    ],
    todo: `TODO : médiateur de la consommation à désigner (nom, adresse, site). Faire vérifier si l’obligation de médiation (art. L. 612-1 du Code de la consommation, prévue pour les consommateurs) s’applique aux associations non professionnelles, ou si le médiateur est proposé à titre volontaire.`,
  },
]

const ANNEXE_DONNEES: ArticleCgv[] = [
  {
    id: 'annexe-objet',
    titre: '1. Objet et durée',
    paragraphes: [
      `La présente annexe constitue le contrat de traitement des données prévu par l’article 28 du RGPD. Elle fixe les conditions dans lesquelles le Prestataire, sous-traitant, traite des données personnelles pour le compte du Club, responsable de traitement, dans le cadre de la Plateforme {{produit}}.`,
      `Elle s’applique pendant toute la durée du contrat, puis jusqu’à la suppression complète des données du Club (article 13 de la présente annexe).`,
    ],
  },
  {
    id: 'annexe-finalites',
    titre: '2. Nature et finalités du traitement',
    paragraphes: [
      `Le Prestataire héberge, enregistre, organise, affiche, transmet et supprime les données selon les fonctions de la Plateforme utilisées par le Club, pour les finalités suivantes, et pour aucune autre :`,
    ],
    liste: [
      `la gestion des adhérents et des familles ;`,
      `les adhésions et réinscriptions, et le suivi des dossiers ;`,
      `l’école de tennis (groupes, appels, progression) ;`,
      `les équipes, compétitions, tournois internes et événements ;`,
      `la communication du Club avec ses adhérents (e-mails, notifications) et le site public du Club ;`,
      `le suivi des paiements effectués en ligne via HelloAsso ;`,
      `les statistiques du Club et la mesure de fréquentation de son site.`,
    ],
  },
  {
    id: 'annexe-personnes',
    titre: '3. Catégories de personnes concernées',
    paragraphes: [`Les données traitées concernent :`],
    liste: [
      `les adhérents du Club ;`,
      `les parents ou représentants légaux des adhérents mineurs ;`,
      `les adhérents mineurs ;`,
      `les enseignants et éducateurs ;`,
      `les bénévoles et membres du bureau ;`,
      `les visiteurs du site du Club et les personnes qui le contactent ou demandent un essai.`,
    ],
  },
  {
    id: 'annexe-donnees',
    titre: '4. Catégories de données',
    paragraphes: [
      `Les données traitées sont les suivantes :`,
      `Le Club ne demande par la Plateforme aucune pièce médicale. Il vérifie l’attestation ou le certificat selon ses propres procédures et n’enregistre que sa date et son type.`,
    ],
    liste: [
      `identité (nom, prénom, date de naissance, sexe, photo si le Club la demande) ;`,
      `coordonnées (adresse, e-mail, téléphone) ;`,
      `licence (numéro, type, classement, saison) ;`,
      `données relatives aux mineurs, rattachées au compte de leurs parents ;`,
      `attestations de santé ou certificats médicaux : **seulement la date et le type** du document, **jamais le contenu du questionnaire de santé** ;`,
      `droit à l’image : l’accord ou le refus de chaque personne, ou de ses parents pour un mineur ;`,
      `paiements : montant, date, état et référence ; **aucune donnée bancaire n’est stockée** sur la Plateforme, le paiement se faisant chez HelloAsso ;`,
      `données d’utilisation : participation aux séances, matchs, inscriptions, heures de bénévolat, journal des actions.`,
    ],
  },
  {
    id: 'annexe-instructions',
    titre: '5. Instructions documentées',
    paragraphes: [
      `Le Prestataire ne traite les données que sur **instruction documentée du Club**. Ces instructions sont constituées du contrat, de la présente annexe, des réglages que le Club choisit dans la Plateforme et de ses demandes écrites.`,
      `Le Prestataire informe immédiatement le Club si une instruction lui paraît contraire au RGPD ou au droit applicable. Il ne transfère pas les données hors de l’Union européenne en dehors des conditions de l’article 8, sauf obligation légale, dont il informe alors le Club au préalable lorsque la loi le permet.`,
    ],
  },
  {
    id: 'annexe-confidentialite',
    titre: '6. Confidentialité',
    paragraphes: [
      `Le Prestataire garantit la confidentialité des données. Seules les personnes qui en ont besoin pour fournir la Plateforme y ont accès, et elles sont tenues au secret. Le Prestataire n’accède aux données du Club que pour le support, la maintenance ou la sécurité, ou à la demande du Club.`,
      `Le Prestataire n’utilise jamais les données du Club pour son propre compte : ni prospection des adhérents, ni revente, ni publicité.`,
    ],
  },
  {
    id: 'annexe-securite',
    titre: '7. Mesures de sécurité',
    paragraphes: [`Le Prestataire met en œuvre des mesures techniques et organisationnelles adaptées au risque, notamment :`],
    liste: [
      `le **chiffrement des échanges** entre les appareils et la Plateforme (https) ;`,
      `des **droits d’accès par rôle** : chaque Utilisateur ne voit que ce que son rôle lui permet ;`,
      `un **journal des actions**, qui garde la trace de qui a fait quoi dans le Logiciel ;`,
      `des **sauvegardes quotidiennes** ;`,
      `des **mots de passe** protégés et jamais conservés en clair ;`,
      `un **cloisonnement par club** : les données d’un club ne sont jamais accessibles à un autre.`,
    ],
  },
  {
    id: 'annexe-sous-traitants',
    titre: '8. Sous-traitants ultérieurs et localisation',
    paragraphes: [
      `Le Club autorise le Prestataire à faire appel à des sous-traitants ultérieurs pour les services suivants :`,
      `Le Prestataire impose à chacun d’eux, par contrat, des obligations de protection des données au moins équivalentes à celles de la présente annexe, et reste responsable devant le Club de leur respect.`,
      `Le Prestataire **informe le Club au préalable** de tout ajout ou remplacement d’un sous-traitant ultérieur. Le Club peut s’y **opposer** par écrit dans les 30 jours ; si aucune solution n’est trouvée, il peut résilier le contrat sans frais.`,
      `Les données sont hébergées dans l’**Union européenne lorsque c’est possible** ; tout transfert hors UE est encadré par les garanties du RGPD (décision d’adéquation ou clauses contractuelles types).`,
    ],
    liste: [
      `l’hébergement de l’application ;`,
      `la base de données et le stockage des fichiers ;`,
      `l’envoi des e-mails ;`,
      `le paiement en ligne via HelloAsso, que le Club choisit et avec lequel il dispose de son propre compte ;`,
      `le fournisseur d’intelligence artificielle, uniquement si le Club a souscrit l’option assistant IA.`,
    ],
    todo: `TODO : liste nominative, localisation des données et garanties de transfert à compléter avant le premier contrat. Vérifier aussi la qualification de HelloAsso (contrat direct avec le Club : sous-traitant ultérieur ou prestataire distinct ?), les services de notification des navigateurs (notifications sur le téléphone) et les conditions du fournisseur d’IA (conservation, usage des données).`,
  },
  {
    id: 'annexe-conservation',
    titre: '9. Durée de conservation',
    paragraphes: [
      `Pendant le contrat, les données sont conservées selon les durées que le Club détermine. Le Club supprime ou fait supprimer les données qui ne sont plus nécessaires, par exemple celles des anciens adhérents au-delà de la durée qu’il a fixée.`,
      `À la fin du contrat, les données sont supprimées dans les conditions de l’article 13 de la présente annexe.`,
    ],
  },
  {
    id: 'annexe-assistance',
    titre: '10. Assistance au Club',
    paragraphes: [
      `Le Prestataire aide le Club à répondre aux personnes qui exercent leurs **droits** (accès, rectification, effacement, opposition, limitation, portabilité). S’il reçoit directement une telle demande, il la transmet au Club sans délai et n’y répond pas lui-même, sauf instruction du Club.`,
      `Il aide également le Club, sur demande, à réaliser une **analyse d’impact** relative à la protection des données (AIPD) lorsqu’elle est nécessaire, et, le cas échéant, à consulter la CNIL. Il met à sa disposition les informations utiles sur la Plateforme et ses mesures de sécurité.`,
    ],
  },
  {
    id: 'annexe-violations',
    titre: '11. Notification des violations de données',
    paragraphes: [
      `Le Prestataire notifie au Club toute violation de données personnelles **dans les meilleurs délais et au plus tard 48 heures après en avoir pris connaissance**, par e-mail à son interlocuteur référent.`,
      `La notification décrit, dans la mesure du possible, la nature de la violation, les catégories et le nombre approximatif de personnes et de données concernées, ses conséquences probables et les mesures prises ou proposées. Il appartient au Club, responsable de traitement, de notifier la violation à la CNIL et, si nécessaire, d’en informer les personnes concernées ; le Prestataire l’y aide.`,
    ],
  },
  {
    id: 'annexe-obligations-club',
    titre: '12. Obligations du Club',
    paragraphes: [
      `Le Club fournit au Prestataire les données nécessaires et des instructions conformes au RGPD. Il informe les personnes concernées de l’utilisation de leurs données, recueille les accords nécessaires (notamment pour le droit à l’image), tient son registre des traitements et veille, pendant toute la durée du traitement, au respect du RGPD.`,
    ],
  },
  {
    id: 'annexe-fin',
    titre: '13. Sort des données en fin de contrat',
    paragraphes: [
      `À la fin du contrat, le Prestataire **remet au Club un export complet** de ses données. Il **supprime ensuite toutes les données du Club 3 mois après la fin du contrat**, y compris les copies de sauvegarde, sauf obligation légale de conservation. Il confirme la suppression au Club par écrit, sur demande.`,
    ],
  },
  {
    id: 'annexe-audits',
    titre: '14. Documentation et audits',
    paragraphes: [
      `Le Prestataire met à la disposition du Club, **sur demande**, la documentation nécessaire pour démontrer le respect de ses obligations : description des mesures de sécurité, liste des sous-traitants ultérieurs, registre des traitements qu’il effectue pour le compte du Club.`,
      `Le Club peut, à ses frais et avec un préavis raisonnable, faire réaliser un audit, y compris une inspection, par lui-même ou par un auditeur tenu au secret, qui ne soit pas un concurrent du Prestataire. L’audit ne doit pas porter atteinte à la sécurité ni à la confidentialité des données des autres clubs.`,
    ],
  },
]

export const CGV_PLATEFORME: { version: string; dateVersion: string; articles: ArticleCgv[]; annexeDonnees: ArticleCgv[] } = {
  version: '1.0',
  dateVersion: '29 octobre 2026',
  articles: ARTICLES,
  annexeDonnees: ANNEXE_DONNEES,
}

/** Paragraphe à ajouter à la politique de confidentialité (/politique-confidentialite) : la prospection des clubs. */
export const PROSPECTION: { titre: string; paragraphes: string[] } = {
  titre: 'Prospection des clubs de tennis',
  paragraphes: [
    `Pour présenter {{produit}} aux clubs de tennis, nous leur écrivons par e-mail. Nous utilisons pour cela les **adresses de contact publiques des clubs** : l’adresse e-mail générique du club ou celle de ses dirigeants, telles qu’elles sont publiées sur des sources publiques (site du club, annuaires publics). Nous enregistrons avec elle le nom du club, sa commune et, lorsqu’ils sont publiés avec l’adresse, le nom et la fonction du dirigeant.`,
    `**Finalité** : présenter notre offre aux clubs et répondre à ceux qui souhaitent en savoir plus. Chaque message indique qui l’envoie, d’où vient l’adresse utilisée et comment ne plus recevoir nos e-mails.`,
    `**Base légale** : notre intérêt légitime à faire connaître notre offre (article 6.1.f du RGPD). Il s’agit d’une prospection auprès de personnes morales, les associations, par leurs adresses de contact professionnelles, avec un message en rapport avec la fonction de la personne qui le reçoit, comme le permet la CNIL.`,
    `**Durée de conservation** : 3 ans à compter du dernier contact avec le club. Passé ce délai, l’adresse est supprimée.`,
    `**Droit d’opposition** : vous pouvez vous opposer à tout moment à ces envois, sans avoir à vous justifier, par le lien de désinscription présent dans chaque e-mail, par la page [désinscription](/desinscription), ou par e-mail à l’adresse de contact indiquée sur cette page. Après une opposition, nous ne conservons que l’adresse concernée, dans une liste d’opposition, pour ne plus vous écrire.`,
    `Ces adresses ne sont ni cédées, ni louées, ni revendues, et nous n’achetons aucun fichier d’adresses.`,
  ],
}
