/**
 * GUIDES DE L'OFFRE « CLUBS DE TENNIS » (1/2) — articles de fond utiles à un club même s'il n'achète rien.
 * Ordre : celui de PAGES_GUIDES (src/data/offre-clubs/catalogue.ts), guides 1 à 5.
 */
import type { PageClub } from '../types'
import { DEMO } from '@/config/offre-clubs'

const G = '/clubs-de-tennis/guides'

export const GUIDES_1: PageClub[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'creer-le-site-de-son-club-de-tennis',
    chemin: `${G}/creer-le-site-de-son-club-de-tennis`,
    famille: 'guide',
    titre: `Créer le site de votre club de tennis : un site clair, juste et que les bénévoles peuvent tenir à jour`,
    etiquette: `Guide · Site du club`,
    reponse: `Un bon site de club de tennis répond d’abord aux questions des visiteurs : où jouer, à quel prix, comment adhérer, quand commence l’école de tennis et qui contacter. Commencez par une dizaine de pages essentielles, désignez qui les met à jour, respectez les règles des sites d’association (mentions légales, cookies, droit à l’image), et ne publiez que ce que le bureau saura garder exact.`,
    titleSeo: `Créer le site de son club de tennis : la méthode`,
    descriptionSeo: `Pages indispensables, nom de domaine, mentions légales, photos, mise à jour par les bénévoles : la méthode pas à pas pour créer le site de votre club.`,
    motCle: `créer le site de son club de tennis`,
    motsCles: [
      `site internet club de tennis`,
      `faire un site pour une association sportive`,
      `quelles pages sur le site d’un club`,
      `mentions légales site association`,
      `nom de domaine club de tennis`,
      `mettre à jour le site du club`,
    ],
    capture: 'site-accueil',
    demo: [
      { libelle: `Voir le site d’un club type`, url: DEMO.site },
      { libelle: `Ouvrir l’éditeur du site`, url: DEMO.role('presidente', '/editeur') },
    ],
    etapes: [
      { titre: `Faire l’inventaire de ce qui existe`, texte: `Rassemblez l’ancien site s’il existe, la page sur les réseaux sociaux, la plaquette de rentrée, la grille des tarifs, le règlement intérieur et les photos. Notez ce qui est encore vrai et ce qui ne l’est plus.` },
      { titre: `Lister les questions des visiteurs`, texte: `Demandez à la personne qui répond au téléphone ou aux messages quelles questions reviennent. Chaque question fréquente mérite une réponse visible sur le site.` },
      { titre: `Réserver un nom de domaine au nom du club`, texte: `Choisissez une adresse courte, proche du nom du club, et faites-la enregistrer au nom de l’association, pas au nom d’un bénévole. Notez les accès dans un endroit que le bureau connaît.` },
      { titre: `Écrire les pages essentielles`, texte: `Accueil, le club, installations, tarifs et adhésion, école de tennis, adultes, compétitions, actualités, agenda, contact. Des phrases courtes, des informations datées, un bouton d’action par page.` },
      { titre: `Rassembler des photos autorisées`, texte: `Utilisez des photos du club pour lesquelles les personnes, ou les parents pour les enfants, ont donné leur accord. Une photo de court vide vaut mieux qu’une photo sans autorisation.` },
      { titre: `Désigner les éditeurs`, texte: `Deux personnes au moins savent modifier le site : une qui publie les actualités, une qui met à jour les pages de rentrée. Le savoir ne doit pas reposer sur une seule personne.` },
      { titre: `Publier, annoncer, puis prévoir la mise à jour de saison`, texte: `Annoncez le site aux adhérents, mettez son adresse sur les affiches et la signature des e-mails. Inscrivez dans l’agenda du bureau une date de relecture avant chaque rentrée.` },
    ],
    sections: [
      {
        id: 'pourquoi-un-site-en-plus-des-reseaux-sociaux',
        titre: `Pourquoi un site, quand le club a déjà une page sur les réseaux sociaux ?`,
        paragraphes: [
          `Les réseaux sociaux sont très bien pour raconter la vie du club : une victoire d’équipe, une photo de la fête de l’école, un rappel de tournoi. Mais ils montrent surtout ce qui est récent. Un parent qui cherche, en août, le prix de l’école de tennis et l’horaire des cours du mercredi doit faire défiler des mois de publications pour trouver la réponse, quand elle existe.`,
          `Le site, lui, tient les informations stables : les tarifs de la saison, les créneaux, l’adresse des courts, la façon d’adhérer, les personnes à contacter. Il est trouvé par les moteurs de recherche quand quelqu’un tape le nom du club ou de la commune. Et il appartient à l’association : son contenu ne dépend pas des règles d’une plateforme qui peut changer d’affichage du jour au lendemain.`,
          `Les deux se complètent. Le site est la référence, les réseaux sociaux renvoient vers lui. Une publication « Les inscriptions sont ouvertes » qui pointe vers la page d’adhésion du site fait plus d’adhésions qu’une publication qui demande d’envoyer un message.`,
        ],
      },
      {
        id: 'quelles-pages-sur-le-site-d-un-club-de-tennis',
        titre: `Quelles pages faut-il sur le site d’un club de tennis ?`,
        paragraphes: [
          `Partez des visiteurs, pas de l’organigramme. Un site de club reçoit surtout quatre publics : les familles qui cherchent une école de tennis, les adultes qui veulent reprendre ou découvrir, les adhérents qui cherchent une information pratique, et les partenaires ou la mairie. Chaque page doit servir au moins l’un d’eux.`,
        ],
        liste: [
          `**Accueil** : ce qu’est le club en deux phrases, l’actualité du moment, et les boutons « Adhérer » et « Essayer ».`,
          `**Tarifs et adhésion** : la grille complète, ce que comprend la cotisation, la licence, les réductions famille, et comment s’inscrire.`,
          `**École de tennis** : les âges, les créneaux, l’encadrement, le déroulé de l’année, ce qu’il faut apporter.`,
          `**Adultes** : loisir, cours collectifs, compétition, padel ou pickleball si le club en propose.`,
          `**Installations** : nombre et type de courts, éclairage, club-house, accès, stationnement, plan.`,
          `**Compétitions et équipes** : les équipes engagées, les résultats, le tournoi du club.`,
          `**Actualités et agenda** : ce qui se passe, daté. Une actualité sans date fait douter de tout le reste.`,
          `**Contact** : une adresse e-mail du club, les personnes à joindre selon le sujet, les horaires du secrétariat s’il y en a.`,
          `**Pages légales** : mentions légales et politique de confidentialité, accessibles depuis le bas de chaque page.`,
        ],
        sous: [
          {
            titre: `Faut-il tout faire dès le départ ?`,
            paragraphes: [
              `Non. Mieux vaut huit pages justes que vingt pages dont la moitié datent de la saison dernière. Ajoutez la galerie, les partenaires, les documents ou une foire aux questions quand vous avez de quoi les remplir et quelqu’un pour les suivre.`,
            ],
          },
        ],
      },
      {
        id: 'qui-met-a-jour-le-site-du-club',
        titre: `Qui met à jour le site, et à quel moment de la saison ?`,
        paragraphes: [
          `La plupart des sites de club ne vieillissent pas parce qu’ils sont mal faits, mais parce que personne ne sait plus les modifier. Le bénévole qui l’a créé a quitté le bureau, le mot de passe est perdu, et le site affiche encore les tarifs d’il y a trois saisons. Avant de choisir un outil, décidez qui s’en occupera.`,
          `Une organisation simple fonctionne bien : une personne publie les actualités et les résultats au fil de l’eau, une autre relit les pages stables à chaque rentrée. Le calendrier est connu d’avance : la grille des tarifs change en fin de saison, les créneaux de l’école se fixent avant la reprise, l’agenda se remplit avec le calendrier sportif.`,
          `Choisissez un outil que ces personnes peuvent vraiment utiliser seules, depuis un ordinateur ou un téléphone, sans craindre de casser la mise en page. Si chaque modification demande d’appeler quelqu’un, le site ne sera pas mis à jour.`,
        ],
      },
      {
        id: 'obligations-site-association',
        titre: `Quelles règles faut-il respecter sur le site d’une association ?`,
        paragraphes: [
          `Un site d’association a les mêmes obligations de base qu’un autre site. Ce n’est pas compliqué, mais il faut y penser avant la mise en ligne. Les pages officielles de service-public.fr et de la CNIL détaillent ces règles ; voici les points qui concernent presque tous les clubs.`,
        ],
        liste: [
          `**Les mentions légales** : le nom de l’association, son adresse, le nom du responsable de la publication (souvent le président ou la présidente) et les coordonnées de l’hébergeur du site.`,
          `**La politique de confidentialité** : quelles données le site recueille (formulaire de contact, adhésion), pourquoi, combien de temps, et comment exercer ses droits.`,
          `**Les cookies et mesures d’audience** : certains outils de statistiques demandent le consentement du visiteur, d’autres, plus respectueux, peuvent s’en passer. La CNIL publie les conditions.`,
          `**Le droit à l’image** : une photo où l’on reconnaît une personne demande son accord, et celui des parents pour un enfant. Gardez la trace de ces accords.`,
          `**Les droits d’auteur** : une photo trouvée sur internet n’est pas libre. Utilisez vos photos, ou des images dont la licence permet l’usage.`,
        ],
      },
      {
        id: 'pieges-a-eviter-site-club',
        titre: `Quels pièges éviter quand on crée le site du club ?`,
        paragraphes: [
          `Les mêmes erreurs reviennent souvent, et presque toutes viennent d’un manque d’anticipation plutôt que d’un manque de compétence.`,
        ],
        liste: [
          `Un nom de domaine ou un compte enregistré au nom personnel d’un bénévole : le jour où il part, le club perd la main.`,
          `Des informations sans date : « inscriptions ouvertes » sans saison, « tournoi le samedi » sans mois.`,
          `Un formulaire de contact qui arrive dans une boîte que personne ne lit.`,
          `Des pages trop longues sur téléphone, alors que la plupart des parents consultent le site depuis le leur.`,
          `Des documents en PDF illisibles sur petit écran pour des informations qui tiendraient en trois lignes.`,
          `Des photos d’enfants publiées sans autorisation, ou avec des noms complets en légende.`,
          `Un site dont on ne peut pas récupérer le contenu si l’on change de prestataire.`,
        ],
      },
      {
        id: 'comment-produit-fait-le-site-du-club',
        titre: `Comment {{produit}} s’occupe du site de votre club ?`,
        paragraphes: [
          `Si vous préférez ne pas construire le site vous-mêmes, [la formule Site](/clubs-de-tennis/site-internet) reprend cette méthode. Vous choisissez un thème parmi deux ou trois, adapté aux couleurs, au logo et aux typographies du club, lisible sur téléphone et en mode sombre. Jusqu’à {{club:pages}} pages sont créées à la mise en place, à partir des informations que vous fournissez ; les pages légales viennent en plus.`,
          `Ensuite, le club est autonome. [L’éditeur du site](/clubs-de-tennis/fonctionnalites/site-modifiable) permet aux bénévoles de modifier textes, images, liens, menus et documents, et de créer de nouvelles pages, sans pouvoir casser le design. Le formulaire d’adhésion en ligne, les actualités, l’agenda, la galerie qui respecte le droit à l’image et un bandeau d’information urgent sont compris. Le référencement de base fait en sorte que le club soit trouvé sur son nom ; nous ne promettons pas de position dans les résultats.`,
          `L’hébergement, le nom de domaine, les sauvegardes et la sécurité sont inclus dans l’abonnement, et vous pouvez exporter vos données à tout moment. Pour savoir ce que cela coûterait à votre club, le [simulateur](/clubs-de-tennis/simulateur) donne un prix indicatif selon votre catégorie, à partir de {{club:site:mini:mois}} € par mois pour le site seul ; le devis définitif suit un premier échange.`,
        ],
      },
    ],
    faq: [
      { q: `Combien de temps faut-il pour créer le site d’un club ?`, a: `Cela dépend surtout du temps nécessaire pour rassembler les textes, les tarifs et les photos. C’est souvent l’étape la plus longue. Commencez par l’inventaire et les questions des visiteurs : la suite va plus vite quand le contenu est prêt.` },
      { q: `Le site doit-il appartenir à l’association ?`, a: `Oui. Le nom de domaine, les comptes et le contenu doivent être enregistrés au nom du club, avec des accès connus du bureau. C’est la meilleure protection contre le départ d’un bénévole ou un changement de prestataire.` },
      { q: `Faut-il des mentions légales sur le site d’un club ?`, a: `Oui, comme pour tout site. Elles indiquent qui édite le site, qui est responsable de la publication et qui l’héberge. Une politique de confidentialité est aussi nécessaire dès que le site recueille des données, par exemple avec un formulaire.` },
      { q: `Peut-on publier des photos des enfants de l’école de tennis ?`, a: `Seulement avec l’autorisation des parents, recueillie et conservée. Évitez les noms complets en légende. En cas de doute, choisissez une photo où les enfants ne sont pas reconnaissables.` },
      { q: `Le site remplace-t-il la page du club sur les réseaux sociaux ?`, a: `Non, ils se complètent. Le site tient les informations stables et l’adhésion ; les réseaux sociaux racontent la vie du club et renvoient vers le site.` },
      { q: `Un site de club est-il trouvé sur Google automatiquement ?`, a: `Un site bien construit, avec des titres clairs et un plan du site, est en général trouvé sur le nom du club. Être trouvé sur des recherches plus larges demande un travail de contenu dans la durée, sans garantie de position.` },
    ],
    liens: [
      { href: '/clubs-de-tennis/site-internet', nom: `Le site du club`, note: `La formule Site en détail.` },
      { href: '/clubs-de-tennis/fonctionnalites/site-modifiable', nom: `Le site modifiable par le club`, note: `Ce que les bénévoles peuvent changer seuls.` },
      { href: '/clubs-de-tennis/simulateur', nom: `Simulateur de prix`, note: `Un prix indicatif pour votre catégorie.` },
      { href: '/clubs-de-tennis/guides/rgpd-club-de-tennis', nom: `RGPD pour un club de tennis` },
      { href: '/clubs-de-tennis/guides/reinscriptions-en-ligne', nom: `Organiser les réinscriptions en ligne` },
    ],
    sources: [
      { nom: `Service-public.fr`, url: 'https://www.service-public.fr/' },
      { nom: `CNIL`, url: 'https://www.cnil.fr/' },
    ],
    maj: '2026-10-29',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'reinscriptions-en-ligne',
    chemin: `${G}/reinscriptions-en-ligne`,
    famille: 'guide',
    titre: `Organiser les réinscriptions en ligne de votre club sans y passer vos soirées`,
    etiquette: `Guide · Réinscriptions`,
    reponse: `Des réinscriptions en ligne bien organisées tiennent en trois choses : un calendrier annoncé tôt, un formulaire court qui reprend ce que le club sait déjà, et des relances régulières mais espacées. Le bureau ne traite plus que les dossiers incomplets et les cas particuliers, au lieu de ressaisir chaque fiche à la main.`,
    titleSeo: `Réinscription au club de tennis en ligne : la méthode`,
    descriptionSeo: `Calendrier, formulaire, familles, pièces, paiement, relances : comment organiser les réinscriptions en ligne de votre club de tennis, étape par étape.`,
    motCle: `réinscription club de tennis en ligne`,
    motsCles: [
      `réinscriptions club de tennis`,
      `formulaire d’inscription en ligne club sportif`,
      `relancer les adhérents pour la cotisation`,
      `inscription famille club de tennis`,
      `dossier d’adhésion incomplet`,
      `ouvrir les inscriptions de la saison`,
    ],
    capture: 'bureau-adhesions',
    demo: [
      { libelle: `Voir le suivi des dossiers d’adhésion`, url: DEMO.role('secretaire', '/bureau/adhesions') },
      { libelle: `Essayer l’adhésion familiale en ligne`, url: DEMO.page('/adherer') },
    ],
    etapes: [
      { titre: `Fixer la grille de la saison`, texte: `Faites voter ou valider les tarifs, les réductions et les règles (famille, étudiants, nouveaux) avant d’ouvrir quoi que ce soit. Une grille qui change en cours de route crée des remboursements et des malentendus.` },
      { titre: `Annoncer le calendrier`, texte: `Date d’ouverture, période réservée aux anciens adhérents et à l’école de tennis si le club en a une, date de reprise, date limite. Annoncez-le par e-mail, sur le site et au club.` },
      { titre: `Préparer un formulaire court`, texte: `Ne demandez que ce dont le club a besoin, et préremplissez ce qu’il connaît déjà. Chaque question en plus fait abandonner quelqu’un.` },
      { titre: `Ouvrir et accompagner`, texte: `Ouvrez à la date dite, gardez une permanence au club pour ceux qui ne sont pas à l’aise en ligne, et répondez vite aux premières questions : elles révèlent les points flous du formulaire.` },
      { titre: `Relancer par vagues`, texte: `Une relance aux personnes qui n’ont pas commencé, une autre à celles dont le dossier est incomplet, avec ce qui manque précisément. Pas de message générique à tout le monde.` },
      { titre: `Clore et passer aux licences`, texte: `Après la date limite, faites le point des dossiers complets, payés, et des licences à prendre. Le reste devient une liste nominative, traitée au cas par cas.` },
    ],
    sections: [
      {
        id: 'pourquoi-les-reinscriptions-prennent-du-temps',
        titre: `Pourquoi les réinscriptions prennent-elles autant de temps au bureau ?`,
        paragraphes: [
          `Ce n’est pas la saisie d’une fiche qui coûte, c’est tout ce qui l’entoure : le formulaire papier à moitié rempli, le chèque sans nom au dos, le certificat ou l’attestation qui manque, le parent qui inscrit deux enfants et demande la réduction famille, la personne qui a changé d’adresse e-mail. Chaque dossier incomplet devient un échange, et chaque échange une soirée de plus.`,
          `Le passage en ligne ne supprime pas ces cas, mais il les réduit et les rend visibles. Un formulaire bien conçu empêche d’oublier un champ obligatoire, calcule la cotisation selon les règles du club et demande les pièces au bon moment. Le bureau voit d’un coup d’œil qui a fini, qui a commencé et qui n’a rien fait.`,
          `Encore faut-il préparer la saison. Un formulaire en ligne monté à la hâte, avec une grille de tarifs incomplète, crée autant de travail que le papier.`,
        ],
      },
      {
        id: 'quand-ouvrir-les-reinscriptions',
        titre: `Quand ouvrir les réinscriptions, et dans quel ordre ?`,
        paragraphes: [
          `Ouvrez assez tôt pour que les familles s’organisent avant la rentrée, et assez tard pour que la grille et les créneaux soient fixés. Beaucoup de clubs choisissent la fin de saison, autour de l’assemblée générale ou de la fête du club, quand les adhérents sont encore là et que l’on peut répondre de vive voix.`,
          `Si l’école de tennis est complète chaque année, réservez une première période aux enfants déjà inscrits et à leurs frères et sœurs, puis ouvrez aux nouveaux. Dites-le clairement : une règle annoncée à l’avance passe mieux qu’une liste d’attente découverte au dernier moment.`,
          `Fixez une date limite réelle, avec une conséquence simple : après cette date, la place dans un groupe n’est plus garantie. Sans date, une partie des réinscriptions traîne jusqu’aux vacances d’automne.`,
        ],
      },
      {
        id: 'que-mettre-dans-le-formulaire-de-reinscription',
        titre: `Que doit contenir le formulaire de réinscription ?`,
        paragraphes: [
          `Demandez le nécessaire, rien de plus. Ce que le club ne lira pas n’a rien à faire dans le formulaire, et le RGPD vous demande justement de limiter les données recueillies.`,
        ],
        liste: [
          `L’identité, la date de naissance et les coordonnées, préremplies pour un ancien adhérent qui n’a qu’à vérifier.`,
          `La formule choisie (loisir, compétition, école, padel ou pickleball) et le créneau souhaité pour l’école.`,
          `Pour un mineur : les coordonnées des parents, les personnes autorisées à venir le chercher, l’autorisation de soins.`,
          `L’attestation ou le document de santé demandé par la réglementation en vigueur pour la licence, selon l’âge.`,
          `Le choix sur le droit à l’image, présenté comme un vrai choix, sans case cochée d’avance.`,
          `L’acceptation du règlement intérieur, avec un lien pour le lire.`,
          `Le paiement, ou la façon de payer si le club accepte aussi d’autres moyens.`,
        ],
        sous: [
          {
            titre: `Faut-il demander un certificat médical ?`,
            paragraphes: [
              `Les règles sur le certificat médical et le questionnaire de santé ont évolué ces dernières années et ne sont pas les mêmes pour les mineurs et les majeurs. Vérifiez chaque saison ce que la FFT demande pour la licence, et ne conservez que ce qui est nécessaire.`,
            ],
          },
        ],
      },
      {
        id: 'familles-reductions-cas-particuliers',
        titre: `Comment gérer les familles, les réductions et les cas particuliers ?`,
        paragraphes: [
          `La famille est l’unité qui compte pour les parents : ils veulent inscrire tout le monde en une fois et payer une seule fois. Organisez le formulaire pour cela. Un parent remplit ses informations, ajoute chaque enfant, et la réduction famille se calcule selon la règle du club, sans qu’il ait à la demander.`,
          `Écrivez vos règles de réduction noir sur blanc, avec des exemples. « Réduction à partir du deuxième membre de la famille » laisse des questions : la réduction porte-t-elle sur la cotisation seule ou sur la licence aussi ? Le parent qui joue compte-t-il ? Une règle claire évite de trancher au cas par cas, et donc de froisser.`,
          `Gardez une porte ouverte pour les situations à part : une famille qui ne peut pas payer d’un coup, une aide sociale, un adhérent qui ne veut pas payer en ligne. Le formulaire peut prévoir un champ « Je souhaite en parler au club », traité discrètement par le trésorier. Pensez aussi aux aides que certaines familles peuvent présenter selon les dispositifs de l’année, à vérifier avant d’ouvrir.`,
        ],
      },
      {
        id: 'relancer-les-adherents-sans-les-lasser',
        titre: `Comment relancer les adhérents sans les lasser ?`,
        paragraphes: [
          `Une bonne relance est précise, rare et utile. Elle dit à la personne ce qui manque pour elle, pas ce qui manque en général. « Il manque l’attestation de santé de Léa ; vous pouvez l’ajouter ici » obtient une réponse ; « N’oubliez pas de compléter votre dossier » se perd dans la boîte de réception.`,
          `Prévoyez les relances à l’avance : un premier rappel à ceux qui n’ont pas commencé, quelques jours avant la date limite ; un rappel ciblé aux dossiers incomplets ; un dernier message après la date limite pour les places de l’école. Entre deux, laissez le temps aux familles de répondre.`,
          `Arrêtez de relancer ceux qui ont dit qu’ils ne reviendraient pas. Et profitez-en pour leur demander, en une question facultative, pourquoi : c’est l’information la plus utile pour la saison suivante.`,
        ],
      },
      {
        id: 'comment-produit-gere-les-reinscriptions',
        titre: `Comment {{produit}} gère les réinscriptions ?`,
        paragraphes: [
          `Dans le logiciel, [les adhésions et réinscriptions en ligne](/clubs-de-tennis/fonctionnalites/adhesions-en-ligne) suivent ce calendrier. L’adhérent, ou le parent pour toute la famille, remplit le formulaire en ligne avec les pièces jointes, et la cotisation se calcule selon les règles du club. Chaque dossier apparaît au bureau dans un tableau par étape : commencé, incomplet, complet, payé.`,
          `Les relances automatiques partent selon ce qui manque à chacun, par e-mail et par notification sur le téléphone ; l’offre ne propose pas de SMS, et le club garde ses groupes de messagerie habituels. Le paiement se fait par [HelloAsso](/clubs-de-tennis/fonctionnalites/paiement-helloasso), avec un suivi automatique des règlements. « Ma journée » montre à chaque membre du bureau ce qui demande une action aujourd’hui, et le journal garde la trace de qui a fait quoi.`,
          `Le formulaire d’adhésion existe aussi dans la formule Site seule, avec pièces jointes et bouton de paiement. Pour un prix indicatif selon la taille de votre club, utilisez le [simulateur](/clubs-de-tennis/simulateur).`,
        ],
      },
    ],
    faq: [
      { q: `Faut-il garder un formulaire papier ?`, a: `Gardez au moins une solution pour ceux qui ne sont pas à l’aise en ligne : une permanence au club, ou un bénévole qui saisit le dossier avec eux. Le but est que tout finisse au même endroit, pas d’exclure qui que ce soit.` },
      { q: `Quand faut-il ouvrir les réinscriptions ?`, a: `Quand la grille de tarifs et les créneaux de l’école sont fixés. Beaucoup de clubs ouvrent en fin de saison, quand les adhérents sont encore au club, avec une date limite avant la reprise.` },
      { q: `Comment éviter les dossiers incomplets ?`, a: `Rendez obligatoires les champs indispensables, demandez les pièces dans le formulaire même, et relancez chaque personne sur ce qui lui manque précisément, pas avec un message général.` },
      { q: `Peut-on inscrire toute une famille en une seule fois ?`, a: `C’est ce qu’il faut viser : un parent remplit ses informations, ajoute chaque enfant, et paie une seule fois. Les règles de réduction famille doivent être écrites à l’avance pour se calculer seules.` },
      { q: `Combien de relances envoyer ?`, a: `Peu, mais ciblées : un rappel à ceux qui n’ont pas commencé, un rappel des pièces manquantes, un dernier message après la date limite. Au-delà, un appel ou un mot au club fonctionne mieux.` },
      { q: `La réinscription en ligne remplace-t-elle la prise de licence ?`, a: `Non. La licence se prend dans les outils de la FFT. La réinscription en ligne prépare le dossier du club ; le bureau s’en sert ensuite pour prendre les licences.` },
    ],
    liens: [
      { href: '/clubs-de-tennis/fonctionnalites/adhesions-en-ligne', nom: `Adhésions et réinscriptions en ligne` },
      { href: '/clubs-de-tennis/guides/encaisser-cotisations-helloasso', nom: `Encaisser les cotisations avec HelloAsso` },
      { href: '/clubs-de-tennis/guides/exporter-importer-adherents-adoc', nom: `Exporter et importer ses adhérents depuis ADOC` },
      { href: '/clubs-de-tennis/fonctionnalites/ma-journee-et-automatisations', nom: `Ma journée et automatisations`, note: `Les relances qui partent toutes seules.` },
      { href: '/clubs-de-tennis/simulateur', nom: `Simulateur de prix` },
    ],
    sources: [
      { nom: `CNIL`, url: 'https://www.cnil.fr/' },
      { nom: `Associations.gouv.fr`, url: 'https://www.associations.gouv.fr/' },
    ],
    maj: '2026-10-29',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'gerer-une-ecole-de-tennis',
    chemin: `${G}/gerer-une-ecole-de-tennis`,
    famille: 'guide',
    titre: `Gérer une école de tennis : des groupes équilibrés, un appel rapide et des parents prévenus à temps`,
    etiquette: `Guide · École de tennis`,
    reponse: `Gérer une école de tennis, c’est surtout bien préparer la rentrée : des groupes construits par âge, niveau et disponibilité, un appel fait en quelques gestes à chaque séance, et une règle claire pour prévenir les familles quand la pluie ou une absence d’enseignant annule un cours. Le reste, la progression et le lien avec les parents, se construit sur ces bases.`,
    titleSeo: `Gérer une école de tennis : groupes, appel, annulations`,
    descriptionSeo: `Constituer les groupes, faire l’appel, prévenir les parents en cas de pluie, suivre la progression : la méthode pour gérer l’école de tennis de votre club.`,
    motCle: `gérer une école de tennis`,
    motsCles: [
      `organiser une école de tennis`,
      `groupes école de tennis par niveau`,
      `faire l’appel cours de tennis`,
      `annulation cours de tennis pluie`,
      `prévenir les parents cours annulé`,
      `suivi progression Galaxie Tennis`,
    ],
    capture: 'bureau-ecole',
    demo: [
      { libelle: `Faire l’appel comme un enseignant`, url: DEMO.role('enseignant', '/bureau/ecole/appel') },
      { libelle: `Voir l’espace d’un parent`, url: DEMO.role('parent', '/espace/enfants') },
    ],
    etapes: [
      { titre: `Recenser les créneaux et les enseignants`, texte: `Listez les courts disponibles par jour et par heure, couverts ou non, et les disponibilités de chaque enseignant et assistant. C’est la limite réelle du nombre de groupes.` },
      { titre: `Fixer les règles des groupes`, texte: `Tranches d’âge, niveaux, nombre d’enfants par enseignant selon le terrain utilisé. Écrivez-les avant de voir les inscriptions, pour ne pas les tordre au cas par cas.` },
      { titre: `Recueillir les vœux des familles`, texte: `Dans le formulaire d’inscription, demandez deux ou trois créneaux possibles plutôt qu’un seul. Les groupes se composent beaucoup plus facilement.` },
      { titre: `Composer et publier les groupes`, texte: `Répartissez, vérifiez l’équilibre, puis annoncez à chaque famille son groupe, son horaire, son enseignant et le lieu, par écrit.` },
      { titre: `Préparer l’appel et la règle d’annulation`, texte: `Donnez à chaque enseignant sa liste sur son téléphone, et écrivez qui décide d’annuler une séance, à quel moment, et comment les familles sont prévenues.` },
      { titre: `Faire un point à mi-saison`, texte: `Regardez la présence par groupe, les enfants qui décrochent et ceux qui progressent vite. Ajustez les groupes tant qu’il est temps.` },
    ],
    sections: [
      {
        id: 'comment-construire-les-groupes',
        titre: `Comment construire les groupes de l’école de tennis ?`,
        paragraphes: [
          `Un groupe réussi réunit des enfants d’âge et de niveau proches, sur un créneau qui convient aux familles, avec un enseignant disponible et un court adapté. Ces quatre contraintes se tirent mutuellement : le meilleur groupe sur le papier ne sert à rien si le créneau tombe pendant le conservatoire de la moitié des enfants.`,
          `Commencez par les contraintes fixes, les courts et les enseignants, puis placez les enfants. Pour les plus jeunes, le dispositif Galaxie Tennis de la FFT, organisé en niveaux de couleur avec des terrains et des balles adaptés, donne un repère commun aux enseignants et aux parents. Pour les plus grands, le niveau de jeu et l’envie de compétition comptent autant que l’âge.`,
          `Gardez une petite marge : une ou deux places libres dans certains groupes permettent d’accueillir un enfant qui arrive en cours d’année, ou de déplacer celui qui s’ennuie ou peine dans le sien.`,
        ],
        sous: [
          {
            titre: `Que faire des fratries et des covoiturages ?`,
            paragraphes: [
              `Les familles demandent souvent que deux enfants jouent au même moment, ou qu’un enfant soit avec un camarade pour partager les trajets. Notez ces vœux dans le formulaire et satisfaites-les quand le niveau le permet ; dites franchement quand ce n’est pas possible.`,
            ],
          },
        ],
      },
      {
        id: 'faire-l-appel-rapidement',
        titre: `Comment faire l’appel sans perdre de temps sur le court ?`,
        paragraphes: [
          `L’appel sert à trois choses : savoir qui était là en cas de problème, repérer les enfants qui décrochent, et justifier la présence auprès des parents ou de la commune si on vous le demande. Il doit prendre moins de temps que les lacets à refaire.`,
          `Le papier fonctionne tant que quelqu’un recopie la feuille ensuite, ce qui arrive rarement. Une liste sur le téléphone de l’enseignant, avec les enfants du groupe et un geste par enfant, est plus fiable : la présence est enregistrée tout de suite et visible par le bureau.`,
          `Prévoyez le cas des absences annoncées. Si un parent signale l’absence de son enfant à l’avance, l’enseignant doit le voir dans sa liste avant la séance, et ne pas s’inquiéter de son absence.`,
        ],
      },
      {
        id: 'annulation-cours-pluie-prevenir-les-parents',
        titre: `Pluie, court indisponible, enseignant absent : comment prévenir les familles ?`,
        paragraphes: [
          `Sur des courts extérieurs, la météo décide souvent. Le pire scénario est connu : des parents qui font le trajet pour rien, ou un enseignant qui attend seul sous l’abri. La solution est une règle écrite, connue de tous, appliquée à chaque fois.`,
        ],
        liste: [
          `**Qui décide** : l’enseignant du créneau, ou le responsable de l’école, pas « quelqu’un du bureau ».`,
          `**Quand** : assez tôt avant la séance pour que les familles soient prévenues avant de partir.`,
          `**Comment** : un seul canal officiel, toujours le même, que les familles savent consulter.`,
          `**Ce qui se passe ensuite** : séance reportée, remplacée par une séance en salle, ou simplement annulée. Dites-le dès le début de saison.`,
          `**La trace** : notez chaque annulation et son motif. En fin de saison, vous saurez combien de séances ont eu lieu par groupe.`,
        ],
      },
      {
        id: 'suivre-la-progression-des-enfants',
        titre: `Comment suivre la progression des enfants ?`,
        paragraphes: [
          `Les parents veulent savoir si leur enfant progresse, et l’enfant aime voir qu’il passe un cap. Un suivi simple suffit : le niveau en début de saison, les objectifs travaillés, le niveau atteint, et un mot de l’enseignant.`,
          `Pour les plus jeunes, les niveaux de couleur de Galaxie Tennis donnent ce langage commun. Pour les plus grands, la première compétition, le premier classement ou l’entrée dans une équipe sont des étapes concrètes. Partagez ce suivi au moins une fois dans l’année, par écrit, plutôt qu’en deux minutes sur le bord du court.`,
        ],
      },
      {
        id: 'garder-le-lien-avec-les-parents',
        titre: `Comment garder le lien avec les parents sans y passer ses soirées ?`,
        paragraphes: [
          `Les parents ont besoin de peu, mais au bon moment : le planning de leur enfant, les annulations, les dates des stages et des fêtes, les autorisations à signer. Ce qui épuise les bénévoles, ce sont les questions individuelles qui pourraient avoir une réponse unique et visible.`,
          `Rassemblez tout au même endroit : un espace où chaque parent voit les informations de ses enfants, peut signaler une absence et signer une autorisation. Gardez l’e-mail pour les messages importants, et réservez les groupes de messagerie à la convivialité, pas aux informations officielles.`,
        ],
      },
      {
        id: 'role-du-bureau-et-des-enseignants',
        titre: `Qui fait quoi entre le bureau et les enseignants ?`,
        paragraphes: [
          `Beaucoup de tensions dans une école de tennis viennent d’un partage des rôles jamais écrit. L’enseignant pense que le bureau a prévenu les familles, le bureau pense que l’enseignant l’a fait, et personne ne l’a fait. Prenez une heure avant la rentrée pour répartir clairement les tâches, et donnez la liste à chacun.`,
          `En général, l’enseignant tient l’appel, décide des annulations liées au terrain, suit la progression et propose les changements de groupe. Le bureau, ou le responsable de l’école, gère les inscriptions, les paiements, les autorisations, la communication officielle et les relations avec les familles quand un problème dépasse le court. Quand l’enseignant est salarié du club ou intervient comme prestataire, ce partage compte aussi pour son contrat et ses heures.`,
        ],
        liste: [
          `Une seule personne de référence pour les familles, avec une adresse e-mail du club plutôt qu’un numéro personnel.`,
          `Une liste des enfants à jour pour chaque enseignant, avec les contacts d’urgence et les autorisations.`,
          `Un point rapide entre enseignants et bureau à chaque période de vacances scolaires.`,
        ],
      },
      {
        id: 'comment-produit-fait-vivre-l-ecole',
        titre: `Comment {{produit}} fait vivre l’école de tennis ?`,
        paragraphes: [
          `Dans le logiciel, [l’école de tennis](/clubs-de-tennis/fonctionnalites/ecole-de-tennis) reprend cette méthode : groupes par créneau et par enseignant, appel sur le téléphone en un geste par enfant, annulations et reports, et suivi de la progression avec les niveaux de Galaxie Tennis. Quand une séance est annulée, les familles concernées sont prévenues par e-mail et par notification sur leur téléphone.`,
          `Côté parents, [l’espace membre et parent](/clubs-de-tennis/fonctionnalites/espace-membre-et-parent), installable comme une application, montre le planning des enfants, permet de signaler une absence et de signer les autorisations. L’enseignant voit l’absence dans sa liste d’appel. Les stages se gèrent au même endroit.`,
          `Vous pouvez essayer l’appel dans la démo avec le rôle « enseignant ». Pour un prix indicatif, le [simulateur](/clubs-de-tennis/simulateur) calcule le logiciel ou le pack selon votre catégorie.`,
        ],
      },
    ],
    faq: [
      { q: `Combien d’enfants par groupe dans une école de tennis ?`, a: `Cela dépend de l’âge, du terrain utilisé et des recommandations de la FFT pour l’enseignement. Fixez votre règle avec vos enseignants avant la rentrée et appliquez-la à tous les groupes.` },
      { q: `Qui doit décider d’annuler un cours pour la pluie ?`, a: `Une personne désignée à l’avance, en général l’enseignant du créneau ou le responsable de l’école. L’important est que la décision soit prise assez tôt et annoncée par un seul canal, toujours le même.` },
      { q: `Faut-il rattraper les cours annulés ?`, a: `C’est un choix du club, à annoncer en début de saison : report, séance en salle, ou annulation simple. Ce qui crée des tensions, c’est une règle découverte après coup.` },
      { q: `À quoi sert l’appel si l’on connaît les enfants ?`, a: `À savoir qui était présent en cas d’incident, à repérer un enfant qui décroche, et à faire le bilan de la saison. Une liste sur téléphone le rend presque instantané.` },
      { q: `Comment informer les parents de la progression ?`, a: `Par écrit, au moins une fois dans l’année : le niveau de départ, ce qui a été travaillé, le niveau atteint. Les niveaux de couleur de Galaxie Tennis aident pour les plus jeunes.` },
      { q: `Peut-on gérer les stages des vacances au même endroit ?`, a: `C’est préférable : les familles retrouvent leurs informations, et le bureau voit les inscriptions et les paiements avec ceux de l’école.` },
    ],
    liens: [
      { href: '/clubs-de-tennis/fonctionnalites/ecole-de-tennis', nom: `École de tennis`, note: `Groupes, appel, annulations, progression.` },
      { href: '/clubs-de-tennis/fonctionnalites/espace-membre-et-parent', nom: `Espace membre et parent` },
      { href: '/clubs-de-tennis/fonctionnalites/communication', nom: `Communication`, note: `E-mail et notification, sans SMS.` },
      { href: '/clubs-de-tennis/guides/reinscriptions-en-ligne', nom: `Organiser les réinscriptions en ligne` },
      { href: '/clubs-de-tennis/simulateur', nom: `Simulateur de prix` },
    ],
    maj: '2026-10-29',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'exporter-importer-adherents-adoc',
    chemin: `${G}/exporter-importer-adherents-adoc`,
    famille: 'guide',
    titre: `Exporter vos adhérents depuis ADOC et les importer ailleurs, proprement et sans doublons`,
    etiquette: `Guide · Fichiers ADOC`,
    reponse: `ADOC, l’outil de la FFT, permet d’exporter la liste des licenciés du club dans un fichier tableur. Pour l’importer dans un autre outil, gardez seulement les colonnes utiles, vérifiez les accents, les dates et les doublons, faites un essai sur quelques lignes, puis comparez dans l’autre sens les adhésions du club et les licences prises. Il n’y a pas de connexion directe : tout passe par des fichiers.`,
    titleSeo: `Exporter ses adhérents depuis ADOC : la méthode`,
    descriptionSeo: `Export ADOC en fichier tableur, colonnes utiles, contrôles avant import, doublons, licences manquantes : reprendre vos adhérents sans erreur.`,
    motCle: `exporter adhérents ADOC`,
    motsCles: [
      `export ADOC fichier tableur`,
      `importer les licenciés dans un fichier`,
      `liste des adhérents ADOC`,
      `doublons fichier adhérents`,
      `licences manquantes club de tennis`,
      `reprendre ses adhérents dans un logiciel`,
    ],
    capture: 'bureau-licences',
    demo: [
      { libelle: `Voir l’écran des licences et des fichiers ADOC`, url: DEMO.role('secretaire', '/bureau/licences') },
    ],
    etapes: [
      { titre: `Consulter la documentation de la FFT`, texte: `Les écrans d’ADOC évoluent. Avant d’exporter, consultez l’aide et la documentation officielles de la FFT, ou demandez à votre ligue, pour savoir où se trouve l’export et ce qu’il contient cette saison.` },
      { titre: `Exporter la liste des licenciés`, texte: `Choisissez la saison voulue et exportez le fichier tableur. Enregistrez-le avec un nom daté, dans un dossier dont l’accès est limité au bureau.` },
      { titre: `Ouvrir le fichier et repérer les colonnes`, texte: `Vérifiez que les accents s’affichent correctement, que les dates sont lisibles et que chaque colonne a un titre clair. Notez celles dont vous avez besoin.` },
      { titre: `Faire le ménage`, texte: `Retirez les colonnes inutiles pour l’usage prévu, repérez les lignes en double et les adresses e-mail manquantes ou visiblement fausses.` },
      { titre: `Importer un essai`, texte: `Importez quelques lignes d’abord, vérifiez le résultat fiche par fiche, puis importez le reste.` },
      { titre: `Comparer adhésions et licences`, texte: `Mettez en regard les adhérents du club et les licences du fichier : chaque différence est soit une licence à prendre, soit un dossier à vérifier.` },
    ],
    sections: [
      {
        id: 'pourquoi-sortir-ses-adherents-d-adoc',
        titre: `Pourquoi sortir ses adhérents d’ADOC, puisque tout y est ?`,
        paragraphes: [
          `ADOC est l’outil de la FFT pour la gestion administrative des clubs : les licences, les informations fédérales des licenciés, les données que la fédération demande. Il reste la référence pour tout ce qui est fédéral, et rien ne le remplace sur ce terrain.`,
          `Mais la vie du club demande autre chose : les groupes de l’école de tennis, les familles et leurs réductions, les cotisations et leur suivi, les équipes, le bénévolat, la communication. Beaucoup de clubs tiennent ces informations dans un tableur à côté, et le premier besoin est alors de partir d’une liste propre, sans tout ressaisir.`,
          `Un export sert aussi à vérifier. En fin de période de réinscription, comparer les adhérents du club et les licences réellement prises permet de repérer un oubli avant qu’il ne pose problème, par exemple au moment d’une compétition.`,
        ],
      },
      {
        id: 'a-quoi-ressemble-un-export-adoc',
        titre: `À quoi ressemble un export d’ADOC ?`,
        paragraphes: [
          `Un export est un fichier tableur : une ligne par licencié, une colonne par information. On l’ouvre avec un tableur courant. Selon le format choisi, il peut s’agir d’un fichier dont les colonnes sont séparées par des points-virgules ; si tout s’affiche dans une seule colonne à l’ouverture, c’est souvent un réglage d’ouverture du fichier, pas une erreur des données.`,
          `Nous ne décrivons pas ici les menus exacts d’ADOC : ils dépendent de la version et de vos droits d’accès, et seule la FFT peut les documenter de façon fiable. Référez-vous à l’aide intégrée d’ADOC et à la documentation officielle de la fédération, ou interrogez votre ligue ou votre comité départemental, qui accompagnent les clubs sur ces outils.`,
          `Un point de vigilance : ce fichier contient des données personnelles, parfois de mineurs. Ne l’envoyez pas en pièce jointe à toute la liste du bureau, ne le laissez pas traîner dans un dossier partagé ouvert, et supprimez les copies dont vous n’avez plus besoin.`,
        ],
      },
      {
        id: 'quelles-colonnes-garder',
        titre: `Quelles colonnes garder, et lesquelles laisser de côté ?`,
        paragraphes: [
          `Gardez ce dont l’usage prévu a besoin, et rien d’autre. Le RGPD parle de minimisation des données ; en pratique, moins le fichier contient d’informations, moins il y a de risques et d’erreurs.`,
        ],
        liste: [
          `**Le numéro de licence** : c’est la clé la plus sûre pour reconnaître une personne d’un fichier à l’autre.`,
          `**Le nom, le prénom et la date de naissance** : utiles pour l’identification et pour placer un enfant dans la bonne tranche d’âge.`,
          `**Le type de licence et la saison** : pour savoir qui est licencié cette année, et à quel titre.`,
          `**Le classement** : utile pour les équipes et le Challenge interne.`,
          `**Les coordonnées** (e-mail, téléphone, commune) : à vérifier, car elles sont souvent plus à jour dans le dossier d’adhésion du club.`,
          `**Les colonnes à laisser de côté** : tout ce que votre outil n’utilisera pas. Une information non utilisée n’a pas à être copiée.`,
        ],
      },
      {
        id: 'verifications-avant-import',
        titre: `Quelles vérifications faire avant d’importer le fichier ?`,
        paragraphes: [
          `La plupart des imports ratés le sont pour des raisons banales. Quelques contrôles évitent de passer ensuite des heures à corriger fiche par fiche.`,
        ],
        liste: [
          `**Les accents** : « Hélène » qui devient une suite de caractères étranges signale un problème d’encodage. Corrigez-le à l’ouverture ou à l’enregistrement du fichier.`,
          `**Les dates** : vérifiez que les dates de naissance sont toutes au même format et qu’aucune n’a été transformée par le tableur.`,
          `**Les doublons** : une même personne peut apparaître deux fois, avec une faute de frappe ou une ancienne adresse. Le numéro de licence aide à les repérer.`,
          `**Les familles** : l’export liste des personnes, pas des familles. Pour regrouper parents et enfants, il faudra une étape à part.`,
          `**Les mineurs** : l’adresse e-mail indiquée est-elle celle de l’enfant ou celle d’un parent ? Pour la communication du club, c’est en général le parent qu’il faut joindre.`,
          `**Les lignes vides ou de total** : supprimez-les avant l’import.`,
        ],
        sous: [
          {
            titre: `Et si le club a déjà son propre tableur ?`,
            paragraphes: [
              `Décidez quelle source fait foi pour chaque information. Une bonne règle : ADOC pour la licence et le classement, le dossier d’adhésion du club pour les coordonnées et les choix de la famille. Un import qui écrase des coordonnées récentes avec des anciennes fait perdre du travail.`,
            ],
          },
        ],
      },
      {
        id: 'reperer-les-licences-manquantes',
        titre: `Dans l’autre sens : comment repérer les licences qui manquent ?`,
        paragraphes: [
          `Une fois les adhésions de la saison recueillies, il reste à prendre les licences dans ADOC. Le risque classique : un adhérent a payé sa cotisation au club, mais sa licence n’a pas été prise, et personne ne s’en aperçoit avant un match ou un tournoi.`,
          `La méthode est simple : exportez la liste des licenciés de la saison, mettez-la en regard de la liste des adhésions validées du club, et regardez les différences. Un adhérent sans licence, c’est une licence à prendre. Un licencié sans adhésion, c’est un dossier à vérifier. Refaites l’exercice après chaque vague de réinscriptions.`,
        ],
      },
      {
        id: 'comment-produit-traite-les-fichiers-adoc',
        titre: `Comment {{produit}} traite les fichiers ADOC ?`,
        paragraphes: [
          `{{produit}} ne se connecte pas à ADOC et n’est ni affilié ni approuvé par la FFT. La fonction s’appelle exactement [Import et export des fichiers ADOC](/clubs-de-tennis/fonctionnalites/import-export-adoc) : vous déposez le fichier exporté d’ADOC, le logiciel associe les colonnes, signale les doublons et les erreurs, vous montre un aperçu avant d’appliquer, et garde un rapport dans le journal.`,
          `ADOC reste la référence pour la licence et le classement ; les coordonnées déjà connues du club ne sont pas écrasées. Le contrôle des licences manquantes compare ensuite adhésions et licences, et le logiciel prépare un export de ce qui reste à saisir dans ADOC.`,
          `L’import des membres depuis une source, un export ADOC ou un tableur, est compris à la mise en place. Une seconde source se chiffre en option, à partir de {{club:option:import-source:mise}} €. Le [simulateur](/clubs-de-tennis/simulateur) donne un prix indicatif pour votre club.`,
        ],
      },
    ],
    faq: [
      { q: `Peut-on connecter un logiciel de club directement à ADOC ?`, a: `Nous ne proposons pas de connexion directe. La méthode fiable consiste à exporter un fichier depuis ADOC et à l’importer dans l’autre outil, puis à refaire l’opération quand c’est utile.` },
      { q: `Où se trouve l’export dans ADOC ?`, a: `Les menus évoluent et dépendent de vos droits d’accès. Consultez l’aide et la documentation officielles de la FFT, ou demandez à votre ligue ou à votre comité départemental.` },
      { q: `Le fichier s’ouvre dans une seule colonne : est-il abîmé ?`, a: `En général non. C’est souvent un fichier dont les colonnes sont séparées par des points-virgules : choisissez ce séparateur à l’ouverture dans votre tableur.` },
      { q: `Comment éviter les doublons à l’import ?`, a: `Utilisez le numéro de licence comme clé quand il existe, puis vérifiez les cas restants par nom et date de naissance. Faites toujours un essai sur quelques lignes avant l’import complet.` },
      { q: `Peut-on envoyer l’export à tous les membres du bureau ?`, a: `Évitez-le. Le fichier contient des données personnelles, parfois de mineurs. Limitez-le aux personnes qui en ont besoin, et supprimez les copies inutiles.` },
      { q: `À quelle fréquence comparer adhésions et licences ?`, a: `Après chaque vague de réinscriptions, puis avant le début des compétitions par équipes. C’est le moment où un oubli coûte le plus cher.` },
    ],
    liens: [
      { href: '/clubs-de-tennis/fonctionnalites/import-export-adoc', nom: `Import et export des fichiers ADOC` },
      { href: '/clubs-de-tennis/guides/rgpd-club-de-tennis', nom: `RGPD pour un club de tennis`, note: `Ce que l’on peut garder, et combien de temps.` },
      { href: '/clubs-de-tennis/guides/reinscriptions-en-ligne', nom: `Organiser les réinscriptions en ligne` },
      { href: '/clubs-de-tennis/logiciel-de-gestion', nom: `Le logiciel du bureau` },
      { href: '/clubs-de-tennis/simulateur', nom: `Simulateur de prix` },
    ],
    sources: [{ nom: `CNIL`, url: 'https://www.cnil.fr/' }],
    maj: '2026-10-29',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'encaisser-cotisations-helloasso',
    chemin: `${G}/encaisser-cotisations-helloasso`,
    famille: 'guide',
    titre: `Encaisser les cotisations de votre club avec HelloAsso, du compte de l’association au suivi des paiements`,
    etiquette: `Guide · Paiement en ligne`,
    reponse: `HelloAsso permet à une association d’encaisser des paiements en ligne sur son propre compte : le club ouvre un compte au nom de l’association, crée un formulaire d’adhésion avec ses tarifs, et reçoit les versements. Selon HelloAsso, le service se finance par des contributions volontaires que les payeurs peuvent choisir de laisser ; le reste, c’est au trésorier de rapprocher paiements et adhésions.`,
    titleSeo: `Encaisser les cotisations du club avec HelloAsso`,
    descriptionSeo: `Compte de l’association, formulaire d’adhésion, tarifs, contribution volontaire, rapprochement des paiements : encaisser les cotisations avec HelloAsso.`,
    motCle: `encaisser cotisations HelloAsso club`,
    motsCles: [
      `HelloAsso club de tennis`,
      `formulaire d’adhésion HelloAsso`,
      `paiement en ligne cotisation association`,
      `contribution volontaire HelloAsso`,
      `payer sa cotisation en plusieurs fois`,
      `rapprochement paiements trésorier association`,
    ],
    capture: 'site-adhesion',
    demo: [
      { libelle: `Essayer l’adhésion familiale et le paiement`, url: DEMO.page('/adherer') },
      { libelle: `Voir la trésorerie du club`, url: DEMO.role('tresorier', '/bureau/tresorerie') },
    ],
    etapes: [
      { titre: `Préparer les pièces de l’association`, texte: `Statuts, informations sur les dirigeants, coordonnées bancaires du compte de l’association. Vérifiez sur le site de HelloAsso la liste à jour de ce qui est demandé.` },
      { titre: `Ouvrir le compte au nom du club`, texte: `Le compte est celui de l’association, pas d’un bénévole. Donnez l’accès à au moins deux membres du bureau, dont le trésorier.` },
      { titre: `Créer le formulaire d’adhésion`, texte: `Une ligne par tarif de la grille, les champs indispensables, et un intitulé de saison clair. Testez-le vous-même avant de l’ouvrir.` },
      { titre: `Expliquer la contribution volontaire`, texte: `Prévenez les adhérents qu’une contribution facultative leur sera proposée au moment de payer, et qu’ils peuvent la modifier.` },
      { titre: `Ouvrir et suivre`, texte: `Publiez le lien sur le site et dans l’e-mail de réinscription. Suivez les paiements au fil de l’eau plutôt qu’à la fin.` },
      { titre: `Rapprocher et clôturer`, texte: `Chaque paiement doit correspondre à un dossier d’adhésion. Les écarts se traitent un par un, puis le trésorier exporte le tout pour sa comptabilité.` },
    ],
    sections: [
      {
        id: 'comment-fonctionne-helloasso',
        titre: `Comment fonctionne HelloAsso pour une association ?`,
        paragraphes: [
          `HelloAsso est une plateforme de paiement en ligne destinée aux associations : adhésions, billetterie, dons, boutique. Le club y crée un compte au nom de l’association, prépare ses formulaires, et partage un lien. Les adhérents paient par carte, et les sommes sont versées sur le compte bancaire de l’association.`,
          `Pour ouvrir le compte, la plateforme demande des informations sur l’association et ses dirigeants, ainsi que ses coordonnées bancaires. Ce contrôle est normal pour tout service de paiement ; prévoyez-le avant la période de réinscription, pas la veille de l’ouverture.`,
          `Côté coût, HelloAsso indique que son service est gratuit pour les associations et qu’il se finance par des contributions volontaires proposées aux payeurs au moment du paiement. Les conditions peuvent évoluer : vérifiez-les sur le site de HelloAsso au moment de vous inscrire, et relisez-les de temps en temps.`,
        ],
      },
      {
        id: 'construire-le-formulaire-d-adhesion',
        titre: `Comment construire le formulaire d’adhésion ?`,
        paragraphes: [
          `Le formulaire de paiement doit suivre fidèlement la grille de tarifs votée. Une ligne par formule (adulte loisir, adulte compétition, jeune, école de tennis, padel ou pickleball selon le club), avec un intitulé que l’adhérent comprend sans explication.`,
          `Demandez dans le formulaire ce qui permet de rattacher le paiement à la bonne personne : nom et prénom de l’adhérent, et pas seulement du payeur. C’est le piège le plus fréquent : un parent paie pour deux enfants qui portent un autre nom que le sien, et le trésorier ne sait plus à qui attribuer le paiement.`,
        ],
        liste: [
          `Un titre avec la saison : « Adhésion saison » suivi des deux années.`,
          `Les tarifs exacts de la grille, avec ce qu’ils comprennent (cotisation, licence, cours).`,
          `Le nom de chaque adhérent concerné par le paiement.`,
          `Une adresse e-mail de contact pour le reçu.`,
          `Un lien vers le règlement intérieur et la politique de confidentialité du club.`,
        ],
      },
      {
        id: 'paiement-en-plusieurs-fois-et-reductions',
        titre: `Paiement en plusieurs fois, réductions, aides : comment s’organiser ?`,
        paragraphes: [
          `Une cotisation d’école de tennis représente une somme pour une famille. Proposer de payer en plusieurs fois aide beaucoup de familles ; vérifiez dans HelloAsso les possibilités offertes au moment où vous préparez le formulaire, et précisez les dates d’échéance.`,
          `Les réductions (famille, étudiant, ancien adhérent) sont plus simples à gérer quand elles sont calculées avant le paiement, dans le dossier d’adhésion, plutôt que demandées après coup. Un code de réduction partagé de bouche à oreille finit toujours par circuler plus loin que prévu.`,
          `Certaines familles bénéficient d’aides pour la pratique sportive, nationales ou locales, selon les dispositifs de l’année. Renseignez-vous auprès de votre ligue, de votre commune ou de votre département, et prévoyez comment le club les accepte : la part restante peut être payée en ligne, le reste justifié au bureau.`,
        ],
      },
      {
        id: 'rapprocher-paiements-et-adhesions',
        titre: `Comment le trésorier rapproche-t-il paiements et adhésions ?`,
        paragraphes: [
          `Le rapprochement consiste à vérifier que chaque paiement correspond à un dossier, et que chaque dossier a son paiement. C’est le travail du trésorier, et il est beaucoup plus léger s’il est fait au fil de l’eau, chaque semaine pendant la période de réinscription, que d’un seul coup en octobre.`,
          `Gardez une méthode simple : exportez la liste des paiements, mettez-la en regard des adhésions, et notez les écarts. Les cas habituels sont connus : un paiement sans dossier, un dossier sans paiement, un montant qui ne correspond pas à la formule choisie, un remboursement à faire après une erreur. Chaque cas se règle avec un message personnel, pas une relance générale.`,
          `Conservez les justificatifs selon les règles comptables applicables à votre association, et donnez à l’expert-comptable ou au vérificateur aux comptes un export propre plutôt qu’une capture d’écran.`,
        ],
      },
      {
        id: 'expliquer-la-contribution-volontaire',
        titre: `Que dire aux adhérents sur la contribution volontaire ?`,
        paragraphes: [
          `Au moment de payer, HelloAsso propose au payeur de laisser une contribution pour financer le service. Certains adhérents la remarquent et s’interrogent : est-ce le club qui la demande ? Est-elle obligatoire ? Mieux vaut l’expliquer avant qu’ils ne la découvrent.`,
          `Une phrase suffit dans l’e-mail de réinscription : le paiement passe par HelloAsso, une plateforme gratuite pour les associations ; une contribution facultative à HelloAsso vous sera proposée, vous pouvez la modifier. Cette transparence évite des messages au bureau et respecte le choix de chacun.`,
        ],
      },
      {
        id: 'erreurs-de-paiement-et-remboursements',
        titre: `Que faire en cas d’erreur de paiement ou de demande de remboursement ?`,
        paragraphes: [
          `Les erreurs arrivent chaque saison : un parent paie deux fois, choisit la mauvaise formule, ou inscrit un enfant qui finalement ne viendra pas. Le plus important est d’avoir une règle avant que la question ne se pose, écrite dans le règlement intérieur ou les conditions d’adhésion : dans quels cas le club rembourse, jusqu’à quelle date, et ce qui reste dû (la licence déjà prise, par exemple).`,
          `Pour le remboursement lui-même, regardez dans votre espace HelloAsso ce que la plateforme permet et dans quelles conditions ; sinon, le trésorier rembourse par virement depuis le compte du club. Dans les deux cas, gardez une trace écrite : la demande, la décision, la date et le montant remboursé. Un remboursement fait de la main à la main, sans trace, pose toujours problème au moment de présenter les comptes à l’assemblée générale.`,
          `Enfin, un paiement en double n’est pas une catastrophe s’il est repéré vite. C’est l’intérêt du suivi au fil de l’eau : l’erreur se corrige en un message, avant que la famille ne s’en aperçoive sur son relevé bancaire.`,
        ],
      },
      {
        id: 'comment-produit-utilise-helloasso',
        titre: `Comment {{produit}} utilise HelloAsso ?`,
        paragraphes: [
          `Dans {{produit}}, [le paiement en ligne passe par HelloAsso](/clubs-de-tennis/fonctionnalites/paiement-helloasso) : l’argent va directement sur le compte du club, jamais chez nous. Le bouton de paiement est placé dans le formulaire d’adhésion du site, après le calcul de la cotisation de toute la famille.`,
          `Avec le logiciel, chaque paiement se rattache automatiquement au bon dossier d’adhésion, et le trésorier retrouve dans la trésorerie la liste des paiements et des écarts, avec un export pour sa comptabilité. Si un club préfère un autre prestataire de paiement, c’est possible, mais les frais de ce prestataire sont alors à sa charge.`,
          `Pour estimer le coût de la formule qui vous convient, le [simulateur](/clubs-de-tennis/simulateur) donne un prix indicatif selon le nombre de licenciés de votre club.`,
        ],
      },
    ],
    faq: [
      { q: `Le club paie-t-il des frais avec HelloAsso ?`, a: `HelloAsso indique que son service est gratuit pour les associations et se finance par des contributions volontaires des payeurs. Vérifiez les conditions à jour sur son site au moment de l’inscription.` },
      { q: `Sur quel compte arrive l’argent des cotisations ?`, a: `Sur le compte bancaire de l’association, renseigné lors de l’ouverture du compte HelloAsso. Le compte doit être au nom du club, jamais au nom d’un bénévole.` },
      { q: `La contribution volontaire est-elle obligatoire pour l’adhérent ?`, a: `Elle est présentée comme facultative et modifiable par le payeur. Expliquez-le dans votre e-mail de réinscription pour éviter les questions.` },
      { q: `Peut-on proposer le paiement en plusieurs fois ?`, a: `Vérifiez dans HelloAsso les options disponibles au moment où vous créez le formulaire, et indiquez clairement les échéances aux familles.` },
      { q: `Comment savoir quel enfant correspond à un paiement ?`, a: `Demandez le nom de chaque adhérent dans le formulaire, pas seulement celui du payeur. C’est la première cause d’écarts au moment du rapprochement.` },
      { q: `Faut-il encore accepter les chèques ?`, a: `C’est un choix du club. Beaucoup gardent un autre moyen de paiement pour ceux qui ne paient pas en ligne ; l’important est que tous les paiements finissent dans le même suivi.` },
    ],
    liens: [
      { href: '/clubs-de-tennis/fonctionnalites/paiement-helloasso', nom: `Paiement en ligne HelloAsso` },
      { href: '/clubs-de-tennis/fonctionnalites/adhesions-en-ligne', nom: `Adhésions et réinscriptions en ligne` },
      { href: '/clubs-de-tennis/guides/reinscriptions-en-ligne', nom: `Organiser les réinscriptions en ligne` },
      { href: '/clubs-de-tennis/guides/rgpd-club-de-tennis', nom: `RGPD pour un club de tennis` },
      { href: '/clubs-de-tennis/simulateur', nom: `Simulateur de prix` },
    ],
    sources: [
      { nom: `Associations.gouv.fr`, url: 'https://www.associations.gouv.fr/' },
      { nom: `Service-public.fr`, url: 'https://www.service-public.fr/' },
    ],
    maj: '2026-10-29',
  },
]
