/**
 * GUIDES DE L'OFFRE « CLUBS DE TENNIS » (2/2) — articles de fond utiles à un club même s'il n'achète rien.
 * Ordre : celui de PAGES_GUIDES (src/data/offre-clubs/catalogue.ts), guides 6 à 10.
 */
import type { PageClub } from '../types'
import { DEMO } from '@/config/offre-clubs'

const G = '/clubs-de-tennis/guides'

export const GUIDES_2: PageClub[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'creer-un-challenge-interne',
    chemin: `${G}/creer-un-challenge-interne`,
    famille: 'guide',
    titre: `Créer un challenge interne qui fait vraiment jouer les membres de votre club, toute la saison`,
    etiquette: `Guide · Challenge interne`,
    reponse: `Un challenge interne réussi tient à des règles courtes et écrites, une formule adaptée au nombre de joueurs, une saisie des résultats confirmée par les deux adversaires, et un classement visible qui bouge souvent. Il doit donner envie de jouer à tous les niveaux, pas seulement aux meilleurs.`,
    titleSeo: `Créer un challenge interne de tennis : règles et méthode`,
    descriptionSeo: `Échelle, poules ou points, règles de défi, saisie des résultats, palmarès : la méthode pour lancer un challenge interne qui fait jouer tout le club.`,
    motCle: `créer un challenge interne tennis`,
    motsCles: [
      `challenge interne club de tennis`,
      `règlement challenge tennis`,
      `classement interne tennis échelle`,
      `organiser des matchs entre membres`,
      `faire jouer les adhérents loisir`,
      `tableau à palettes tennis`,
    ],
    capture: 'site-challenge',
    demo: [
      { libelle: `Voir le tableau du Challenge`, url: DEMO.page('/challenge') },
      { libelle: `Saisir un match comme un membre`, url: DEMO.role('membre', '/espace/jeu') },
    ],
    etapes: [
      { titre: `Choisir l’objectif`, texte: `Faire jouer les loisirs, préparer les équipes, animer l’hiver, intégrer les nouveaux : l’objectif décide de la formule et des règles.` },
      { titre: `Choisir la formule`, texte: `Échelle de défis, poules par niveau ou classement à points. Prenez la plus simple qui sert votre objectif.` },
      { titre: `Écrire le règlement sur une page`, texte: `Qui peut défier qui, dans quel délai, quel format de match, comment saisir le résultat, que se passe-t-il en cas de refus ou de litige.` },
      { titre: `Constituer le classement de départ`, texte: `Selon le classement fédéral, les résultats de la saison précédente, ou un tirage pour les nouveaux. Annoncez la méthode.` },
      { titre: `Lancer avec un temps fort`, texte: `Une soirée de lancement, un premier tour de matchs, un affichage au club-house. Les premières semaines décident de la suite.` },
      { titre: `Faire vivre et clôturer`, texte: `Publiez le classement souvent, mettez en avant ceux qui jouent, et terminez par un palmarès et une remise de récompenses.` },
    ],
    sections: [
      {
        id: 'a-quoi-sert-un-challenge-interne',
        titre: `À quoi sert un challenge interne dans un club de tennis ?`,
        paragraphes: [
          `Beaucoup d’adhérents loisir paient leur cotisation et jouent peu, faute de partenaire ou d’occasion. Un challenge interne leur donne une raison de réserver un court cette semaine : un adversaire à affronter, une place à gagner, un résultat qui s’affiche. Il crée des rencontres entre des membres qui ne se seraient pas croisés autrement.`,
          `Il sert aussi le club. Les courts sont occupés à des heures creuses, les nouveaux adhérents s’intègrent plus vite, et les capitaines d’équipe repèrent des joueurs en forme. Pour le bureau, c’est une animation qui tourne presque seule une fois lancée, à condition que les règles soient claires dès le départ.`,
          `Un challenge interne n’est pas une compétition homologuée par défaut : ses résultats ne comptent pas pour le classement fédéral. Si vous voulez que certains matchs comptent, renseignez-vous auprès de votre comité départemental sur les formules officielles existantes.`,
        ],
      },
      {
        id: 'quelle-formule-choisir',
        titre: `Échelle, poules ou points : quelle formule choisir ?`,
        paragraphes: [
          `Il existe trois grandes formules, chacune avec ses avantages. Le choix dépend surtout du nombre de participants et de l’écart de niveau entre eux.`,
        ],
        sous: [
          {
            titre: `L’échelle de défis, ou tableau à palettes`,
            paragraphes: [
              `Chaque joueur occupe une place. On peut défier un joueur placé un peu au-dessus de soi ; en cas de victoire, on prend sa place. C’est la formule la plus vivante et la plus lisible, idéale autour d’un tableau au club-house. Sa limite : avec beaucoup d’inscrits, ceux du bas peuvent se décourager. Plusieurs échelles par niveau règlent le problème.`,
            ],
          },
          {
            titre: `Les poules par niveau`,
            paragraphes: [
              `Des groupes de joueurs proches, chacun rencontre les autres sur une période, puis les premiers montent et les derniers descendent. Les matchs sont plus équilibrés et chacun sait qui il doit jouer. Il faut en revanche relancer ceux qui tardent à organiser leurs rencontres.`,
            ],
          },
          {
            titre: `Le classement à points`,
            paragraphes: [
              `Chaque match rapporte des points selon le résultat et le niveau de l’adversaire. On joue avec qui l’on veut, quand on veut. C’est souple, mais il faut un barème simple et connu, sinon le classement paraît mystérieux.`,
            ],
          },
        ],
      },
      {
        id: 'regles-du-challenge',
        titre: `Quelles règles écrire pour éviter les disputes ?`,
        paragraphes: [
          `Les litiges naissent toujours des cas non prévus. Un règlement d’une page, affiché et envoyé à chaque participant, en évite la plupart.`,
        ],
        liste: [
          `**Qui peut défier qui** : par exemple jusqu’à un certain nombre de places au-dessus de soi.`,
          `**Le délai** pour jouer un défi accepté, et ce qui se passe s’il n’est pas joué.`,
          `**Le refus** : combien de refus sont tolérés, et quand un refus vaut défaite.`,
          `**Le format de match** : choisissez un des formats de match définis par la FFT, par exemple avec un super jeu décisif à la place du troisième set, pour que les matchs tiennent dans une heure de court.`,
          `**La saisie du résultat** : qui le saisit, sous quel délai, et comment l’adversaire le confirme.`,
          `**Les absences longues** : blessure, voyage. Prévoyez une mise en pause plutôt qu’une descente.`,
          `**L’arbitre des litiges** : une personne désignée, dont la décision clôt la question.`,
        ],
      },
      {
        id: 'saisir-les-resultats-sans-contestation',
        titre: `Comment faire saisir les résultats sans contestation ?`,
        paragraphes: [
          `La feuille papier punaisée au club-house a du charme, mais elle s’efface, se perd ou se corrige au crayon. Le plus fiable est une saisie par le vainqueur, ou par l’un des deux joueurs, puis une confirmation par l’adversaire. Tant que le résultat n’est pas confirmé, le classement ne bouge pas.`,
          `Demandez le score complet, set par set, et la date. C’est ce qui permet ensuite de faire un palmarès, de repérer les matchs serrés et de répondre aux questions. Un résultat contesté remonte à l’arbitre désigné, qui tranche.`,
          `Pensez aussi à l’organisation pratique du match lui-même. Qui réserve le court ? Qui apporte les balles ? Le plus simple est de laisser le joueur défié choisir parmi deux ou trois créneaux proposés par le challenger, et de réserver le court aussitôt l’accord trouvé. Un défi accepté mais jamais programmé est la première cause d’essoufflement d’un challenge : un rappel automatique ou un message de l’organisateur à mi-délai suffit souvent à relancer la rencontre.`,
        ],
      },
      {
        id: 'faire-vivre-le-challenge',
        titre: `Comment faire vivre le challenge toute l’année ?`,
        paragraphes: [
          `Un challenge s’essouffle quand le classement ne bouge plus. Les leviers sont connus : rendre visibles les résultats, récompenser l’activité autant que la victoire, et marquer des temps forts.`,
        ],
        liste: [
          `Publiez le classement au club-house et en ligne, mis à jour à chaque match confirmé.`,
          `Récompensez aussi le plus grand nombre de matchs joués, la meilleure progression, le premier match d’un nouveau membre.`,
          `Organisez des périodes : un challenge d’hiver, un challenge de printemps, avec chacun son palmarès.`,
          `Gardez la mémoire : un tableau d’honneur des vainqueurs de chaque saison donne envie d’y figurer.`,
          `Terminez par une soirée de clôture, même modeste, avec remise des récompenses.`,
        ],
      },
      {
        id: 'inclure-tous-les-niveaux',
        titre: `Comment inclure tous les membres, et pas seulement les meilleurs ?`,
        paragraphes: [
          `Le risque d’un challenge, c’est de devenir l’affaire des cinq ou six joueurs les plus motivés. Pour l’éviter, créez plusieurs tableaux par niveau, ouvrez un tableau dédié aux débutants et aux joueurs qui reprennent, et pensez aux doubles, souvent plus faciles à organiser pour les adhérents loisir.`,
          `Si le club a une section padel ou pickleball, un challenge par discipline est un bon moyen d’animer ces nouvelles pratiques. Et invitez personnellement les membres qui n’osent pas : un message du bureau ou d’un enseignant change souvent tout.`,
        ],
      },
      {
        id: 'comment-produit-gere-le-challenge',
        titre: `Comment {{produit}} gère le challenge interne ?`,
        paragraphes: [
          `Dans le logiciel, [le Challenge interne](/clubs-de-tennis/fonctionnalites/challenge-interne) reprend ces principes : classement, badges, saisie des matchs au format FFT depuis l’espace membre, confirmation par l’adversaire et validation par le bureau, et un Hall of Fame qui garde le palmarès de chaque saison. Le tableau à palettes s’affiche aussi sur le site du club.`,
          `En option, l’écran club-house affiche le classement en direct sur la télévision du club, à partir de {{club:option:ecran-club-house:mise}} € à la mise en place. Vous pouvez aussi organiser des [tournois internes](/clubs-de-tennis/fonctionnalites/tournois-internes) avec inscriptions au même endroit. Le [simulateur](/clubs-de-tennis/simulateur) donne un prix indicatif selon votre catégorie.`,
        ],
      },
    ],
    faq: [
      { q: `Les matchs du challenge interne comptent-ils pour le classement FFT ?`, a: `Pas par défaut : un challenge interne n’est pas une compétition homologuée. Si vous voulez que des matchs comptent, renseignez-vous auprès de votre comité sur les formules officielles.` },
      { q: `Quel format de match choisir ?`, a: `Un format court, choisi parmi ceux de la FFT, par exemple deux sets et un super jeu décisif, permet de jouer sur un créneau d’une heure. Le même format pour tous évite les discussions.` },
      { q: `Que faire si un joueur refuse tous les défis ?`, a: `Prévoyez dans le règlement un nombre de refus tolérés, au-delà duquel le refus vaut défaite. Une pause est possible en cas de blessure ou d’absence longue.` },
      { q: `Comment éviter les résultats contestés ?`, a: `Faites saisir le score complet par un joueur et confirmer par l’adversaire. Un résultat non confirmé ne compte pas, et une personne désignée tranche les litiges.` },
      { q: `Faut-il une inscription payante au challenge ?`, a: `C’est un choix du club. Beaucoup le gardent gratuit pour les adhérents, pour ne mettre aucun frein à la participation.` },
      { q: `Peut-on faire un challenge en double ?`, a: `Oui, et c’est souvent plus facile pour les adhérents loisir. Il faut alors décider si le classement suit les paires ou les joueurs.` },
    ],
    liens: [
      { href: '/clubs-de-tennis/fonctionnalites/challenge-interne', nom: `Challenge interne et saisie des matchs` },
      { href: '/clubs-de-tennis/fonctionnalites/tournois-internes', nom: `Tournois internes` },
      { href: '/clubs-de-tennis/fonctionnalites/espace-membre-et-parent', nom: `Espace membre et parent`, note: `Là où les membres saisissent leurs matchs.` },
      { href: '/clubs-de-tennis/guides/convoquer-ses-equipes', nom: `Convoquer ses équipes` },
      { href: '/clubs-de-tennis/simulateur', nom: `Simulateur de prix` },
    ],
    maj: '2026-10-29',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'convoquer-ses-equipes',
    chemin: `${G}/convoquer-ses-equipes`,
    famille: 'guide',
    titre: `Convoquer vos équipes et gérer les disponibilités sans passer la semaine au téléphone`,
    etiquette: `Guide · Équipes et compétitions`,
    reponse: `Pour convoquer une équipe sereinement, demandez les disponibilités tôt et au même endroit, composez l’équipe en vérifiant le règlement de la compétition, puis envoyez une convocation écrite complète : lieu, heure, ordre des joueurs, covoiturage. Prévoyez un remplaçant à chaque rencontre et une règle simple pour les désistements.`,
    titleSeo: `Convoquer une équipe de tennis : disponibilités et méthode`,
    descriptionSeo: `Recueillir les disponibilités, composer l’équipe, rédiger la convocation, organiser le covoiturage et gérer les forfaits : la méthode du capitaine.`,
    motCle: `convoquer équipe tennis disponibilités`,
    motsCles: [
      `convocation match par équipes tennis`,
      `disponibilités joueurs équipe`,
      `capitaine équipe tennis organisation`,
      `composition équipe championnat`,
      `covoiturage match de tennis`,
      `forfait match par équipes`,
    ],
    capture: 'bureau-equipes',
    demo: [
      { libelle: `Voir les équipes comme un capitaine`, url: DEMO.role('capitaine', '/bureau/equipes') },
    ],
    etapes: [
      { titre: `Réunir le calendrier`, texte: `Dès que le calendrier de la compétition est connu, notez chaque rencontre, à domicile ou à l’extérieur, avec l’adresse et l’heure.` },
      { titre: `Demander les disponibilités pour toute la phase`, texte: `Une seule demande, pour toutes les dates, avec trois réponses possibles : disponible, indisponible, peut-être. Fixez une date de réponse.` },
      { titre: `Composer l’équipe`, texte: `Choisissez parmi les disponibles, dans le respect du règlement : licences valides, ordre des joueurs, règles propres à la compétition.` },
      { titre: `Envoyer la convocation écrite`, texte: `Lieu, heure de rendez-vous, heure du match, ordre, tenue, covoiturage, contact du capitaine. La même pour tous.` },
      { titre: `Faire confirmer`, texte: `Chaque joueur convoqué confirme. Sans confirmation à la date dite, le capitaine appelle le remplaçant.` },
      { titre: `Après la rencontre`, texte: `Saisissez les résultats là où la compétition le demande, remerciez, et notez ce qui a coincé pour la rencontre suivante.` },
    ],
    sections: [
      {
        id: 'pourquoi-la-convocation-est-un-casse-tete',
        titre: `Pourquoi la convocation est-elle le casse-tête du capitaine ?`,
        paragraphes: [
          `Un capitaine bénévole doit réunir le bon nombre de joueurs, au bon niveau, au bon endroit, à une date fixée par d’autres. Il le fait souvent avec des messages individuels, des réponses qui arrivent dans trois applications différentes, et des « je te redis » qui ne reviennent jamais. Le jeudi soir, il ne sait toujours pas s’il aura une équipe dimanche.`,
          `Le problème n’est pas la mauvaise volonté des joueurs. C’est l’absence d’un endroit unique où la question est posée et où la réponse est visible. Dès que les disponibilités sont recueillies au même endroit et pour toute une phase, la composition devient une affaire de minutes.`,
        ],
      },
      {
        id: 'recueillir-les-disponibilites',
        titre: `Comment recueillir les disponibilités des joueurs ?`,
        paragraphes: [
          `Demandez tôt, pour toutes les rencontres de la phase en une seule fois. Un joueur répond plus volontiers à une question qu’à huit, et il connaît souvent déjà ses week-ends pris.`,
        ],
        liste: [
          `Trois réponses possibles : **disponible**, **indisponible**, **peut-être**. Le « peut-être » doit devenir un oui ou un non avant une date fixée.`,
          `Une date limite de réponse, rappelée une fois aux retardataires.`,
          `La possibilité de changer sa réponse, avec un message au capitaine quand un disponible devient indisponible.`,
          `Une vue d’ensemble : pour chaque rencontre, qui est disponible, qui ne l’est pas, qui n’a pas répondu.`,
        ],
        sous: [
          {
            titre: `Et pour les équipes de jeunes ?`,
            paragraphes: [
              `Ce sont les parents qui répondent, et ils jonglent avec les activités de plusieurs enfants. Adressez la demande aux deux parents quand c’est possible, rappelez la date de la rencontre quelques jours avant, et indiquez clairement l’heure de retour prévue. Pour les plus jeunes, précisez aussi qui accompagne l’équipe et comment joindre cette personne le jour même. Un parent rassuré sur l’organisation dit plus facilement oui.`,
            ],
          },
        ],
      },
      {
        id: 'composer-l-equipe-et-respecter-le-reglement',
        titre: `Comment composer l’équipe en respectant le règlement ?`,
        paragraphes: [
          `Chaque compétition par équipes a son règlement, fixé par la FFT, la ligue ou le comité : licences, ordre des joueurs selon le classement, règles sur les joueurs qui ont déjà joué dans une autre équipe du club, nombre de joueurs, catégories d’âge. Lisez-le en début de saison, et gardez-le sous la main.`,
          `Avant chaque convocation, vérifiez trois points : chaque joueur a une licence valide pour la saison, l’ordre respecte les classements, et aucun joueur n’est bloqué par une règle de la compétition. Une erreur ici peut coûter la rencontre sur tapis vert, ce qui est bien plus décourageant qu’une défaite sur le court.`,
          `Pensez aussi à l’équilibre humain : faire jouer régulièrement les remplaçants, prévenir ceux qui ne sont pas retenus avant qu’ils ne le découvrent, et expliquer vos choix quand ils sont discutés.`,
        ],
      },
      {
        id: 'que-mettre-dans-une-convocation',
        titre: `Que doit contenir une convocation ?`,
        paragraphes: [
          `Une bonne convocation répond d’avance à toutes les questions de la veille au soir. Écrite, envoyée à tous les joueurs retenus et au remplaçant, elle tient en quelques lignes.`,
        ],
        liste: [
          `La rencontre : adversaire, compétition, journée.`,
          `Le lieu exact, avec l’adresse du club adverse et, si besoin, le type de surface.`,
          `L’heure de rendez-vous et l’heure du début des matchs.`,
          `L’ordre des joueurs et le remplaçant.`,
          `Le covoiturage : qui conduit, qui monte avec qui, l’heure et le lieu de départ.`,
          `Ce qu’il faut apporter : tenue du club, balles, licence ou attestation si le règlement le demande.`,
          `Le contact du capitaine le jour même.`,
        ],
      },
      {
        id: 'covoiturage-et-deplacements',
        titre: `Comment organiser le covoiturage et les rencontres à domicile ?`,
        paragraphes: [
          `Pour les rencontres à l’extérieur, le covoiturage se décide en même temps que la composition. Notez qui a une voiture et combien de places, et répartissez les passagers. Pour les équipes de jeunes, demandez aux parents de s’inscrire comme conducteurs et vérifiez avec votre assureur et le règlement du club comment sont couverts les déplacements assurés par des bénévoles.`,
          `À domicile, la convocation concerne aussi le club : courts réservés, balles neuves, accueil de l’équipe adverse, juge-arbitre si la compétition le prévoit, et parfois un pot après la rencontre. Une liste de tâches partagée avec les bénévoles évite que tout repose sur le capitaine.`,
        ],
      },
      {
        id: 'gerer-forfaits-et-desistements',
        titre: `Comment gérer les désistements de dernière minute ?`,
        paragraphes: [
          `Ils arrivent : une blessure, un enfant malade, une panne. Une règle annoncée en début de saison les rend moins pénibles. Le joueur qui se désiste prévient lui-même le capitaine dès qu’il le sait ; le capitaine appelle le remplaçant prévu ; si personne n’est disponible, il consulte la liste des joueurs du niveau inférieur.`,
          `Le forfait d’une équipe a souvent des conséquences prévues par le règlement de la compétition. Si vous le voyez venir, prévenez le capitaine adverse et l’organisateur le plus tôt possible, comme le demande en général le règlement.`,
          `Après la rencontre, prenez quelques minutes pour fermer la boucle : saisissez les résultats là où la compétition l’exige, remerciez les joueurs et les conducteurs, et publiez un mot sur le site ou dans les actualités du club. Notez aussi ce qui a coincé, une adresse erronée, un horaire mal compris, un remplaçant prévenu trop tard : c’est ce qui rend la convocation suivante plus simple. Ces petits gestes entretiennent l’envie de jouer pour le club, surtout chez les joueurs qui ne sont pas convoqués à chaque fois.`,
        ],
      },
      {
        id: 'comment-produit-gere-les-equipes',
        titre: `Comment {{produit}} gère les équipes et les convocations ?`,
        paragraphes: [
          `Dans le logiciel, [les équipes et compétitions](/clubs-de-tennis/fonctionnalites/equipes-et-competitions) suivent cette méthode : chaque joueur indique ses disponibilités depuis son espace membre, le capitaine voit pour chaque rencontre qui est disponible, compose l’équipe, envoie les convocations par e-mail et notification, et organise le covoiturage. Le contrôle des licences aide à repérer un joueur dont la licence de la saison manque.`,
          `La saisie officielle des résultats reste à faire dans les outils de la FFT : le logiciel ne la remplace pas, il prépare la rencontre. Essayez le rôle « capitaine » dans la démo, puis estimez le prix pour votre club avec le [simulateur](/clubs-de-tennis/simulateur).`,
        ],
      },
    ],
    faq: [
      { q: `Combien de temps avant une rencontre faut-il convoquer ?`, a: `Assez tôt pour que chacun s’organise et que le remplaçant puisse être prévenu. Le plus simple est de recueillir les disponibilités pour toute la phase dès que le calendrier est connu.` },
      { q: `Où trouver le règlement de la compétition ?`, a: `Auprès de l’organisateur : la FFT, la ligue ou le comité départemental selon la compétition. Lisez-le en début de saison, en particulier les règles de composition.` },
      { q: `Faut-il toujours prévoir un remplaçant ?`, a: `C’est fortement conseillé. Le remplaçant reçoit la convocation comme les autres et sait qu’il peut être appelé jusqu’au dernier moment.` },
      { q: `Comment éviter les réponses éparpillées dans plusieurs applications ?`, a: `Posez la question à un seul endroit, pour toutes les dates, et demandez que les changements y soient faits. Les groupes de messagerie restent utiles pour la convivialité, pas pour les réponses officielles.` },
      { q: `Les parents peuvent-ils conduire les jeunes aux rencontres ?`, a: `Oui, c’est courant. Vérifiez avec l’assureur du club et votre règlement intérieur comment ces déplacements sont couverts, et gardez la liste des conducteurs.` },
      { q: `Le logiciel du club saisit-il les résultats dans les outils de la FFT ?`, a: `Non. La saisie officielle se fait dans les outils de la fédération. Le logiciel du club sert à préparer les rencontres et à garder l’historique pour le club.` },
    ],
    liens: [
      { href: '/clubs-de-tennis/fonctionnalites/equipes-et-competitions', nom: `Équipes et compétitions` },
      { href: '/clubs-de-tennis/fonctionnalites/espace-membre-et-parent', nom: `Espace membre et parent`, note: `Les disponibilités depuis le téléphone.` },
      { href: '/clubs-de-tennis/fonctionnalites/communication', nom: `Communication` },
      { href: '/clubs-de-tennis/guides/creer-un-challenge-interne', nom: `Créer un challenge interne` },
      { href: '/clubs-de-tennis/simulateur', nom: `Simulateur de prix` },
    ],
    maj: '2026-10-29',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'rgpd-club-de-tennis',
    chemin: `${G}/rgpd-club-de-tennis`,
    famille: 'guide',
    titre: `Le RGPD pour un club de tennis : les bons réflexes, expliqués simplement aux bénévoles`,
    etiquette: `Guide · RGPD`,
    reponse: `Un club de tennis traite des données personnelles, souvent de mineurs, parfois liées à la santé : le RGPD s’applique donc. L’essentiel tient en quelques réflexes : tenir un registre, ne recueillir que le nécessaire, savoir pourquoi on le garde et combien de temps, protéger l’accès, demander l’accord pour les photos, et choisir des prestataires qui s’engagent par contrat. La CNIL publie des guides pour les associations.`,
    titleSeo: `RGPD club de tennis : registre, mineurs, photos, durées`,
    descriptionSeo: `Registre, base légale, données de mineurs, santé, droit à l’image, durées de conservation, sous-traitants : les bons réflexes RGPD pour un club de tennis.`,
    motCle: `RGPD club de tennis`,
    motsCles: [
      `RGPD association sportive`,
      `registre des traitements association`,
      `données personnelles adhérents club`,
      `droit à l’image enfants club sportif`,
      `durée de conservation données adhérents`,
      `certificat médical données de santé club`,
    ],
    capture: 'bureau-adherents',
    demo: [
      { libelle: `Voir la fiche d’un adhérent et ses accords`, url: DEMO.role('secretaire', '/bureau/adherents') },
      { libelle: `Voir le journal de qui a fait quoi`, url: DEMO.role('presidente', '/bureau/audit') },
    ],
    etapes: [
      { titre: `Lister ce que le club fait des données`, texte: `Adhésions, école de tennis, équipes, communication, site, photos, paiements : une ligne par usage, avec les données concernées.` },
      { titre: `Remplir le registre`, texte: `Pour chaque usage : la finalité, la base légale, les personnes qui ont accès, les prestataires, la durée de conservation. La CNIL propose un modèle.` },
      { titre: `Faire le tri`, texte: `Supprimez les champs que vous ne lisez pas, les vieux fichiers, les copies en double sur les ordinateurs des bénévoles.` },
      { titre: `Protéger l’accès`, texte: `Chacun n’accède qu’à ce dont il a besoin pour sa mission. Des mots de passe propres à chacun, pas un compte partagé.` },
      { titre: `Informer les adhérents`, texte: `Une politique de confidentialité claire sur le site et dans le formulaire d’adhésion, avec un contact pour exercer ses droits.` },
      { titre: `Relire chaque saison`, texte: `À chaque rentrée, relisez le registre, supprimez ce qui a dépassé sa durée et vérifiez les contrats des prestataires.` },
    ],
    sections: [
      {
        id: 'le-rgpd-concerne-t-il-un-club',
        titre: `Le RGPD concerne-t-il vraiment un petit club de tennis ?`,
        paragraphes: [
          `Oui. Le règlement général sur la protection des données s’applique à toute structure qui traite des données personnelles, quelle que soit sa taille et même si elle ne fonctionne qu’avec des bénévoles. Un club tient des fiches d’adhérents, des coordonnées de parents, des dates de naissance, des photos, parfois des informations de santé : il est concerné.`,
          `La bonne nouvelle, c’est que le RGPD ne demande pas à un club les mêmes moyens qu’à une grande entreprise. Il demande du bon sens organisé : savoir ce que l’on garde, pourquoi, qui y accède, et pendant combien de temps. La CNIL publie sur son site des fiches et des guides destinés aux associations ; ce guide n’est pas un avis juridique, mais une porte d’entrée vers ces ressources.`,
          `Désignez une personne du bureau référente sur ces questions. Elle n’a pas besoin d’être juriste ; elle tient le registre à jour et répond aux demandes des adhérents.`,
        ],
      },
      {
        id: 'tenir-le-registre',
        titre: `Qu’est-ce que le registre, et comment le tenir ?`,
        paragraphes: [
          `Le registre des activités de traitement est un document qui décrit, pour chaque usage des données, ce que fait le club. La gestion des adhérents n’étant pas une activité occasionnelle, le registre est en pratique attendu pour un club. La CNIL en propose un modèle simple à remplir.`,
        ],
        liste: [
          `**La finalité** : à quoi servent les données (gérer les adhésions, organiser l’école, communiquer avec les membres).`,
          `**Les données** : lesquelles exactement, pour qui (adhérents, parents, enseignants, bénévoles).`,
          `**Les destinataires** : qui y accède au club, et quels prestataires.`,
          `**La durée de conservation** : combien de temps, et ce qui se passe ensuite.`,
          `**Les mesures de sécurité** : comment l’accès est protégé.`,
        ],
      },
      {
        id: 'base-legale-et-minimisation',
        titre: `Sur quelle base le club peut-il utiliser les données, et lesquelles demander ?`,
        paragraphes: [
          `Chaque usage doit reposer sur une base légale prévue par le RGPD. Pour un club, les plus courantes sont l’exécution du contrat d’adhésion (gérer la cotisation, organiser les cours), le respect d’une obligation légale, l’intérêt légitime (informer les membres de la vie du club) et le consentement (publier une photo, envoyer une lettre d’information à des non-membres). La base choisie se note dans le registre.`,
          `Le principe de minimisation demande de ne recueillir que le nécessaire. Avant d’ajouter une question au formulaire d’adhésion, demandez-vous : qui la lira, et pour quoi faire ? La profession des parents, par exemple, n’a en général rien à faire dans une fiche d’école de tennis.`,
        ],
      },
      {
        id: 'mineurs-et-donnees-de-sante',
        titre: `Que faut-il savoir sur les données des mineurs et la santé ?`,
        paragraphes: [
          `Les données des enfants méritent une attention particulière. Les informations sont recueillies auprès des parents, les autorisations (soins, sortie, photos) sont données par eux, et les coordonnées utilisées pour la communication sont les leurs. Limitez strictement l’accès aux fiches des enfants aux personnes qui les encadrent.`,
          `Les informations de santé sont des données dites sensibles. Les règles sur le certificat médical et le questionnaire de santé pour la licence ont évolué et diffèrent selon l’âge : vérifiez chaque saison ce que demande la FFT. Quand c’est possible, conservez seulement le fait qu’une attestation a été fournie et sa date, plutôt que le document lui-même, et ne le laissez jamais circuler par e-mail entre bénévoles.`,
          `Pour une allergie ou un traitement qu’un enseignant doit connaître, recueillez l’information avec l’accord des parents, et partagez-la seulement avec l’encadrement concerné.`,
        ],
      },
      {
        id: 'droit-a-l-image',
        titre: `Peut-on publier des photos des membres et des enfants ?`,
        paragraphes: [
          `Une photo où l’on reconnaît une personne est une donnée personnelle, et sa publication relève aussi du droit à l’image. Demandez l’accord de l’adulte, ou des parents pour un enfant, au moment de l’adhésion, par un choix explicite et sans case cochée d’avance. Gardez la trace de ce choix, et permettez de le changer en cours de saison.`,
          `Au moment de publier, vérifiez les accords des personnes reconnaissables. Évitez les noms complets d’enfants en légende. Si un parent demande le retrait d’une photo, retirez-la rapidement, sans discussion.`,
        ],
      },
      {
        id: 'conservation-securite-sous-traitants',
        titre: `Combien de temps garder les données, et qui peut y accéder ?`,
        paragraphes: [
          `Le RGPD ne fixe pas une durée unique : c’est au club de définir une durée justifiée pour chaque usage, et de s’y tenir. Une approche courante consiste à garder les données pendant l’adhésion, puis une durée limitée pour les anciens membres, avant suppression ou anonymisation. Les pièces comptables, elles, ont des durées de conservation fixées par les textes. La CNIL donne des repères ; notez vos choix dans le registre.`,
          `La sécurité est souvent une affaire d’habitudes : un compte par personne, pas de mot de passe partagé, pas de fichier d’adhérents sur une clé USB ou dans un dossier partagé ouvert, et des accès retirés quand un bénévole quitte le bureau.`,
          `Enfin, les prestataires qui traitent les données pour le compte du club, logiciel, hébergeur, outil d’e-mails, sont des sous-traitants au sens du RGPD. Ils doivent s’engager par un contrat qui précise ce qu’ils font des données. Demandez-le avant de signer. Et sachez répondre aux droits des personnes : accès, rectification, effacement, opposition, dans les délais prévus.`,
        ],
      },
      {
        id: 'comment-produit-aide-pour-le-rgpd',
        titre: `Comment {{produit}} aide le club à respecter le RGPD ?`,
        paragraphes: [
          `Le logiciel n’applique pas le RGPD à la place du club, mais il rend les bons réflexes plus faciles. Les rôles et droits sont définis par personne : un enseignant voit ses groupes, pas la trésorerie. Le journal garde la trace de qui a fait quoi. Les accords pour les photos sont enregistrés sur chaque fiche, et la galerie du site les respecte.`,
          `Un contrat de traitement des données est fourni avec l’abonnement, et le club peut exporter l’ensemble de ses données à tout moment. Pour les familles, [l’espace membre et parent](/clubs-de-tennis/fonctionnalites/espace-membre-et-parent) permet de consulter et mettre à jour ses informations. Les conditions sont détaillées dans les [CGV de la plateforme](/cgv-plateforme). Pour un prix indicatif, voyez le [simulateur](/clubs-de-tennis/simulateur).`,
        ],
      },
    ],
    faq: [
      { q: `Un club sans salarié doit-il appliquer le RGPD ?`, a: `Oui. Le RGPD s’applique dès que l’on traite des données personnelles, que l’association ait des salariés ou non.` },
      { q: `Le club doit-il tenir un registre des traitements ?`, a: `En pratique oui, car la gestion des adhérents n’est pas une activité occasionnelle. La CNIL propose un modèle de registre simple à remplir.` },
      { q: `Peut-on garder les certificats médicaux des adhérents ?`, a: `Ce sont des données de santé, donc sensibles. Vérifiez ce que la FFT demande pour la saison, conservez le moins possible, et limitez l’accès à ceux qui en ont besoin.` },
      { q: `Faut-il l’accord des parents pour publier la photo d’un enfant ?`, a: `Oui. Recueillez-le par un choix explicite au moment de l’inscription, gardez-en la trace, et retirez la photo si les parents le demandent.` },
      { q: `Combien de temps garder les fiches des anciens adhérents ?`, a: `Le club fixe une durée justifiée pour chaque usage et la note dans son registre. La CNIL donne des repères ; les pièces comptables ont leurs propres durées légales.` },
      { q: `Que faire si un adhérent demande la suppression de ses données ?`, a: `Vérifiez ce que le club doit légalement conserver, supprimez le reste, et répondez par écrit dans les délais prévus par le RGPD.` },
      { q: `Ce guide remplace-t-il un conseil juridique ?`, a: `Non. Il donne les grands principes. Pour une question précise, consultez les ressources de la CNIL ou un professionnel du droit.` },
    ],
    liens: [
      { href: '/clubs-de-tennis/guides/exporter-importer-adherents-adoc', nom: `Exporter et importer ses adhérents depuis ADOC` },
      { href: '/clubs-de-tennis/guides/creer-le-site-de-son-club-de-tennis', nom: `Créer le site de son club de tennis`, note: `Mentions légales et photos.` },
      { href: '/clubs-de-tennis/fonctionnalites/espace-membre-et-parent', nom: `Espace membre et parent` },
      { href: '/clubs-de-tennis/logiciel-de-gestion', nom: `Le logiciel du bureau` },
      { href: '/cgv-plateforme', nom: `CGV de la plateforme` },
      { href: '/clubs-de-tennis/simulateur', nom: `Simulateur de prix` },
    ],
    sources: [
      { nom: `CNIL`, url: 'https://www.cnil.fr/' },
      { nom: `Légifrance`, url: 'https://www.legifrance.gouv.fr/' },
    ],
    maj: '2026-10-29',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'financer-le-numerique-du-club',
    chemin: `${G}/financer-le-numerique-du-club`,
    famille: 'guide',
    titre: `Financer le numérique de votre club : les pistes à explorer et le dossier à préparer`,
    etiquette: `Guide · Financement`,
    reponse: `Le site et le logiciel d’un club peuvent être financés de plusieurs façons : le budget du club, les subventions des collectivités, les appels à projets du sport selon les territoires, les fonds de soutien à la vie associative, et les partenaires privés. Aucune de ces pistes n’est automatique : les dispositifs changent selon le territoire et l’année, et doivent toujours être vérifiés avant de compter dessus.`,
    titleSeo: `Subvention numérique club sportif : les pistes à explorer`,
    descriptionSeo: `Collectivités, appels à projets du sport, fonds associatifs, partenaires privés : les pistes pour financer le site et le logiciel du club, à vérifier.`,
    motCle: `subvention numérique club sportif`,
    motsCles: [
      `financer le site d’un club de tennis`,
      `subvention association sportive logiciel`,
      `aide numérique association`,
      `mécénat club de tennis`,
      `dossier de subvention club sportif`,
      `partenaires privés association sportive`,
    ],
    capture: 'bureau-statistiques',
    demo: [
      { libelle: `Voir les statistiques du club`, url: DEMO.role('presidente', '/bureau/statistiques') },
      { libelle: `Voir le suivi des subventions`, url: DEMO.role('tresorier', '/bureau/subventions') },
    ],
    etapes: [
      { titre: `Chiffrer le projet`, texte: `Demandez un devis précis : mise en place, abonnement, options. Un financeur veut un montant et une durée, pas une intention.` },
      { titre: `Écrire le besoin en une page`, texte: `Ce qui pose problème aujourd’hui, ce que le projet change pour les adhérents et les bénévoles, et comment vous le mesurerez.` },
      { titre: `Identifier les financeurs possibles`, texte: `Commune ou intercommunalité, département, région, appels à projets du sport via la ligue ou le comité, fonds associatifs, entreprises locales.` },
      { titre: `Vérifier les calendriers`, texte: `Chaque financeur a ses dates de dépôt. Notez-les dans l’agenda du bureau, avec un rappel bien avant.` },
      { titre: `Préparer les pièces`, texte: `Statuts, derniers comptes, budget prévisionnel, rapport d’activité, coordonnées bancaires, numéros d’identification de l’association.` },
      { titre: `Rendre compte`, texte: `Une subvention obtenue appelle un compte rendu. Gardez les factures et notez ce que le projet a changé.` },
    ],
    sections: [
      {
        id: 'presenter-le-projet-au-bureau',
        titre: `Comment présenter le projet au bureau avant de chercher des financements ?`,
        paragraphes: [
          `Avant de solliciter qui que ce soit, le bureau doit être convaincu. Le plus efficace est de partir des problèmes concrets : les réinscriptions qui prennent des soirées, les relances de paiement, les messages perdus, les informations dispersées entre plusieurs personnes. Notez ce que le projet change pour les adhérents et pour les bénévoles, plutôt que les fonctions de l’outil.`,
          `Présentez ensuite un coût complet sur plusieurs saisons : la mise en place une fois, puis l’abonnement chaque année. Rapporté au nombre de licenciés, ce coût devient plus facile à discuter en réunion. Indiquez aussi ce que le club dépense déjà : un ancien site, des outils payants, des impressions, des frais de paiement.`,
          `Enfin, faites voter la décision, au bureau ou en assemblée générale selon vos statuts. Un projet voté se défend mieux devant un financeur, et la trace de la décision fait souvent partie des pièces demandées.`,
          `Un point de prudence : une subvention finance souvent un démarrage, rarement un coût qui revient chaque année. Avant de vous engager, vérifiez que le club peut payer l’abonnement sur son budget courant, même sans aide. Une subvention obtenue devient alors un vrai coup de pouce, et non une condition de survie du projet. C’est aussi un argument auprès des financeurs, qui préfèrent les projets dont la suite est assurée.`,
        ],
      },
      {
        id: 'subventions-des-collectivites',
        titre: `Les collectivités peuvent-elles aider le club ?`,
        paragraphes: [
          `La commune ou l’intercommunalité est souvent le premier partenaire d’un club : elle met à disposition les courts et verse parfois une subvention de fonctionnement. Selon les territoires, le département ou la région ont aussi des dispositifs de soutien aux associations sportives, parfois orientés vers l’équipement, l’emploi ou le développement.`,
          `Ces aides changent d’une collectivité à l’autre et d’une année à l’autre. Ne vous fiez pas à ce qu’un autre club a obtenu ailleurs : contactez directement le service des sports ou de la vie associative de votre collectivité, et demandez ce qui existe cette année, pour quel type de projet, et à quelle date.`,
          `Le numérique est rarement une ligne à part. Il entre plus souvent dans un projet plus large : accueillir de nouveaux publics, ouvrir une section, simplifier le bénévolat. Présentez-le ainsi.`,
        ],
      },
      {
        id: 'agence-nationale-du-sport-et-appels-a-projets',
        titre: `Que proposent l’Agence nationale du Sport et les appels à projets du sport ?`,
        paragraphes: [
          `L’Agence nationale du Sport finance des projets de développement des clubs, en partie par l’intermédiaire des fédérations. Pour le tennis, renseignez-vous auprès de votre ligue et de votre comité départemental, qui relaient les campagnes, leurs priorités et leurs dates. Les critères, les montants et l’éligibilité d’un projet numérique sont à vérifier selon votre territoire et l’année.`,
          `D’autres appels à projets apparaissent régulièrement, portés par des collectivités, des fondations ou des acteurs du sport. Ils sont souvent courts et thématiques. Le plus sûr est de rester en contact avec votre ligue et votre comité, et de surveiller les annonces locales.`,
        ],
      },
      {
        id: 'fonds-de-soutien-a-la-vie-associative',
        titre: `Existe-t-il des fonds pour la vie associative ?`,
        paragraphes: [
          `Oui. Le Fonds pour le développement de la vie associative, géré par les services de l’État dans chaque département, soutient notamment le fonctionnement et les projets innovants des associations, selon des priorités fixées localement chaque année. Le site associations.gouv.fr présente ce fonds et les démarches, dont le dépôt en ligne des demandes de subvention par le Compte Asso.`,
          `Comme pour les autres pistes, vérifiez les priorités de l’année dans votre département : un projet numérique peut être éligible une année et ne pas l’être la suivante. Le délai entre le dépôt et la réponse peut être long, ce qui compte si votre projet doit démarrer avant la rentrée.`,
        ],
      },
      {
        id: 'partenaires-prives-mecenat-parrainage',
        titre: `Comment solliciter des partenaires privés ?`,
        paragraphes: [
          `Les entreprises locales, commerçants, artisans, banques, soutiennent souvent les clubs. Deux cadres existent, qu’il faut distinguer. Le parrainage, ou sponsoring, est un échange : l’entreprise apporte une somme et reçoit en contrepartie de la visibilité, par exemple son logo sur le site ou une banderole. Le mécénat est un don sans contrepartie équivalente, qui peut ouvrir droit à une réduction d’impôt pour le donateur si l’association remplit les conditions de l’intérêt général.`,
          `Les règles fiscales du mécénat sont précises : vérifiez-les sur economie.gouv.fr ou service-public.fr avant de promettre un reçu fiscal à qui que ce soit. Pour le parrainage, un dossier simple suffit : qui est le club, combien de membres, quelle visibilité, à quel prix, pour quelle durée.`,
          `Un site soigné aide justement ces démarches : une page partenaires visible donne au sponsor quelque chose à montrer.`,
        ],
      },
      {
        id: 'monter-un-dossier-solide',
        titre: `Comment monter un dossier de subvention qui tient la route ?`,
        paragraphes: [
          `Un financeur lit beaucoup de dossiers. Le vôtre sera retenu s’il est clair, chiffré et réaliste.`,
        ],
        liste: [
          `Un titre de projet qui dit ce qui change, pas le nom d’un outil.`,
          `Le constat de départ, en quelques phrases concrètes.`,
          `Les publics concernés : adhérents, parents, bénévoles, nouveaux venus.`,
          `Un budget détaillé, avec le devis en pièce jointe et la part financée par le club.`,
          `Un calendrier indicatif et les personnes responsables.`,
          `La façon dont vous rendrez compte des résultats.`,
        ],
      },
      {
        id: 'comment-produit-s-inscrit-dans-le-budget',
        titre: `Comment {{produit}} s’inscrit dans le budget d’un club ?`,
        paragraphes: [
          `Les prix de {{produit}} dépendent de la catégorie du club, selon le nombre de licenciés. Pour un club type de la catégorie moyen, soit {{club:licencies-type:moyen}} licenciés, le pack site et logiciel revient à environ {{club:par-licencie:moyen}} € par licencié et par an d’abonnement, à titre indicatif. La mise en place est payable en {{club:fois}} fois sans frais, et le paiement annuel de l’abonnement réduit son prix de {{club:remise-annuelle}} %. Le [simulateur](/clubs-de-tennis/simulateur) calcule un prix indicatif pour votre club, et la page [tarifs](/clubs-de-tennis/tarifs) détaille les formules.`,
          `Nous fournissons un devis détaillé, utile pour un dossier, mais nous ne garantissons aucune subvention. En option, le logiciel peut suivre vos dossiers de subvention (pièces, échéances, comptes rendus) et vos sponsors, et les [statistiques](/clubs-de-tennis/fonctionnalites/statistiques) aident à présenter l’activité du club.`,
        ],
      },
    ],
    faq: [
      { q: `Peut-on obtenir une subvention pour le site du club ?`, a: `C’est possible selon les territoires et les années, rarement pour le site seul. Présentez-le dans un projet plus large et vérifiez les dispositifs auprès de votre collectivité, de votre ligue et des services de l’État.` },
      { q: `Où trouver les aides de l’Agence nationale du Sport ?`, a: `Pour le tennis, auprès de votre ligue et de votre comité départemental, qui relaient les campagnes. Critères et dates sont à vérifier chaque année.` },
      { q: `Qu’est-ce que le Compte Asso ?`, a: `Le service en ligne de l’État qui permet aux associations de déposer certaines demandes de subvention. Il est présenté sur associations.gouv.fr.` },
      { q: `Quelle différence entre mécénat et sponsoring ?`, a: `Le sponsoring est un échange contre de la visibilité. Le mécénat est un don sans contrepartie équivalente, qui peut ouvrir droit à une réduction d’impôt pour le donateur sous conditions, à vérifier sur les sites officiels.` },
      { q: `Le devis de {{produit}} peut-il servir à un dossier de subvention ?`, a: `Oui, nous fournissons un devis détaillé après un premier échange. Nous ne garantissons pas l’obtention d’une subvention.` },
      { q: `Faut-il attendre la subvention pour démarrer ?`, a: `Cela dépend du financeur : certains demandent que le projet ne commence pas avant leur décision. Vérifiez cette règle avant de signer quoi que ce soit.` },
    ],
    liens: [
      { href: '/clubs-de-tennis/tarifs', nom: `Tarifs` },
      { href: '/clubs-de-tennis/simulateur', nom: `Simulateur de prix`, note: `Un prix indicatif pour votre catégorie.` },
      { href: '/clubs-de-tennis/fonctionnalites/statistiques', nom: `Statistiques`, note: `Les chiffres du club pour vos dossiers.` },
      { href: '/clubs-de-tennis/guides/ouvrir-une-section-padel-ou-pickleball', nom: `Ouvrir une section padel ou pickleball` },
      { href: '/contact', nom: `Demander un devis` },
    ],
    sources: [
      { nom: `Associations.gouv.fr`, url: 'https://www.associations.gouv.fr/' },
      { nom: `Service-public.fr`, url: 'https://www.service-public.fr/' },
      { nom: `Economie.gouv.fr`, url: 'https://www.economie.gouv.fr/' },
    ],
    maj: '2026-10-29',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'ouvrir-une-section-padel-ou-pickleball',
    chemin: `${G}/ouvrir-une-section-padel-ou-pickleball`,
    famille: 'guide',
    titre: `Ouvrir une section padel ou pickleball dans votre club de tennis : ce qui change dans la gestion`,
    etiquette: `Guide · Padel et pickleball`,
    reponse: `Ouvrir une section padel ou pickleball, c’est accueillir un nouveau public avec ses propres attentes : des licences et une offre tarifaire adaptées, des créneaux partagés avec le tennis, un encadrement qualifié, du matériel à prêter et une communication dédiée. Le padel demande un terrain spécifique ; le pickleball peut souvent commencer sur des installations existantes.`,
    titleSeo: `Ouvrir une section padel ou pickleball dans un club`,
    descriptionSeo: `Licences, créneaux, encadrement, matériel, communication : ce qui change quand un club de tennis ouvre une section padel ou pickleball, étape par étape.`,
    motCle: `ouvrir une section padel club de tennis`,
    motsCles: [
      `section pickleball club de tennis`,
      `créer une section padel`,
      `licence padel pickleball FFT`,
      `créneaux padel et tennis`,
      `encadrement padel club`,
      `matériel pickleball club`,
    ],
    capture: 'site-reserver',
    demo: [
      { libelle: `Voir la réservation de courts`, url: DEMO.page('/reserver') },
      { libelle: `Voir le planning des courts et des activités`, url: DEMO.role('presidente', '/bureau/planning') },
    ],
    etapes: [
      { titre: `Vérifier l’envie et le public`, texte: `Interrogez vos adhérents et votre entourage : qui jouerait, quand, à quel niveau ? Une séance de découverte en dit plus qu’un sondage.` },
      { titre: `Faire le point avec la ligue et la commune`, texte: `Licences, assurance, formation des encadrants, installations : votre ligue et votre comité vous orientent, la commune décide souvent pour les terrains.` },
      { titre: `Décider de l’offre`, texte: `Adhésion spécifique ou option de l’adhésion tennis, créneaux réservés, séances encadrées ou jeu libre.` },
      { titre: `Prévoir les créneaux`, texte: `Placez les nouveaux créneaux dans le planning global pour éviter les conflits avec l’école de tennis et les équipes.` },
      { titre: `Équiper`, texte: `Raquettes ou palettes de prêt, balles, filets ou marquages si besoin. De quoi faire essayer sans achat préalable.` },
      { titre: `Communiquer et accueillir`, texte: `Une page dédiée sur le site, des séances découverte, un référent de la section qui accueille les nouveaux.` },
    ],
    sections: [
      {
        id: 'padel-ou-pickleball-differences-pour-un-club',
        titre: `Padel ou pickleball : quelles différences pour un club de tennis ?`,
        paragraphes: [
          `Les deux disciplines attirent des publics que le tennis touche moins, mais elles ne posent pas les mêmes questions au club. Le padel se joue en double sur un terrain fermé par des parois, avec une raquette pleine et une balle proche de celle du tennis. Il demande donc un terrain spécifique : c’est un projet d’équipement, souvent porté avec la commune.`,
          `Le pickleball se joue sur un terrain plus petit, avec une palette et une balle en plastique perforée. Il peut souvent démarrer sur un court de tennis avec des marquages temporaires et des filets adaptés, ou dans une salle. C’est une façon de tester l’intérêt sans gros investissement, à condition de vérifier que vos installations s’y prêtent.`,
          `Dans les deux cas, le club change un peu de nature : de nouveaux adhérents, d’autres habitudes de jeu, souvent plus tournées vers le loisir et la convivialité. Préparez le bureau et les adhérents tennis à cette cohabitation.`,
        ],
      },
      {
        id: 'licences-et-assurance',
        titre: `Quelles licences et quelle assurance pour les nouveaux pratiquants ?`,
        paragraphes: [
          `Les nouveaux pratiquants doivent être couverts comme les joueurs de tennis. Renseignez-vous auprès de votre ligue ou de votre comité sur la licence à prendre pour chaque pratique, ce qu’elle couvre, et ce que la FFT prévoit pour la saison. Vérifiez aussi avec l’assureur du club que les nouvelles activités et les éventuels nouveaux lieux sont bien couverts.`,
          `Côté club, décidez de l’offre : une adhésion propre à la section, une option ajoutée à l’adhésion tennis, ou une formule découverte limitée dans le temps. Écrivez ces règles dans la grille tarifaire, avant d’ouvrir les inscriptions, comme pour le tennis.`,
          `Dans le suivi des licences, distinguez les pratiques : il sera plus simple de savoir qui joue à quoi, de présenter la section à l’assemblée générale et de suivre son développement.`,
          `Pensez enfin à la place de la section dans la vie de l’association : un membre du bureau qui la représente, une ligne dans le budget, un temps de parole à l’assemblée générale. Une section qui n’a ni budget ni représentant au bureau reste un ajout ; une section intégrée devient une partie du club, et ses pratiquants s’y sentent chez eux. Les statuts et le règlement intérieur peuvent aussi devoir être relus, si leur rédaction ne mentionne que le tennis.`,
        ],
      },
      {
        id: 'creneaux-et-cohabitation-avec-le-tennis',
        titre: `Comment partager les créneaux avec le tennis ?`,
        paragraphes: [
          `La question des créneaux est celle qui crée le plus de frictions. Si le pickleball utilise un court de tennis, chaque heure de pickleball est une heure de tennis en moins. Si le padel a son terrain, il faut organiser sa réservation et son accès.`,
        ],
        liste: [
          `Faites un planning global de tous les terrains et de toutes les activités : école, équipes, entraînements, padel, pickleball, jeu libre.`,
          `Réservez des créneaux fixes à la section au démarrage, pour lui donner une chance de trouver son public.`,
          `Choisissez des créneaux peu utilisés par le tennis quand c’est possible.`,
          `Écrivez les règles de réservation : durée, délai, invités, priorités. Les mêmes pour tous.`,
          `Faites un bilan après quelques mois et ajustez avec les deux sections.`,
        ],
      },
      {
        id: 'encadrement-qualifie',
        titre: `Qui peut encadrer les séances ?`,
        paragraphes: [
          `L’encadrement contre rémunération d’une activité sportive est réglementé par le code du sport : il demande une qualification reconnue. Vérifiez auprès de la FFT, de votre ligue ou de la direction départementale chargée des sports quelles qualifications permettent d’encadrer le padel et le pickleball, et si vos enseignants de tennis peuvent les obtenir.`,
          `Pour le jeu libre et l’animation, des bénévoles motivés font souvent démarrer la section. Désignez un référent : il accueille les nouveaux, organise les séances découverte, tient le lien avec le bureau. Sans référent, une section nouvelle s’essouffle vite.`,
        ],
      },
      {
        id: 'materiel-et-installations',
        titre: `Quel matériel prévoir pour démarrer ?`,
        paragraphes: [
          `Le premier frein d’un curieux, c’est de ne pas avoir le matériel. Prévoyez des raquettes de padel ou des palettes de pickleball de prêt, des balles, et pour le pickleball, des filets et un moyen de tracer ou de matérialiser les lignes. Notez qui emprunte quoi, et rangez le matériel dans un endroit fermé.`,
          `Pour les installations, le padel demande un projet d’équipement : terrain, éclairage, accès, entretien. C’est en général un dossier à construire avec la commune, et parfois un sujet pour les financements du sport. Le pickleball demande surtout de vérifier les dimensions et la surface disponibles.`,
        ],
      },
      {
        id: 'communiquer-et-accueillir-un-nouveau-public',
        titre: `Comment communiquer et accueillir ce nouveau public ?`,
        paragraphes: [
          `Les personnes qui découvrent le padel ou le pickleball ne cherchent pas forcément un club de tennis. Donnez à la section une vraie page sur le site : ce qu’est la pratique, les créneaux, l’encadrement, le prix, et un bouton pour réserver une séance découverte. Ajoutez-la au menu, et parlez-en dans les actualités et l’agenda.`,
          `Organisez des journées portes ouvertes, invitez les parents de l’école de tennis, les anciens adhérents, les entreprises voisines. Et pensez à l’après : une personne qui a aimé sa séance découverte doit savoir comment revenir, et à qui s’adresser.`,
        ],
      },
      {
        id: 'comment-produit-gere-padel-et-pickleball',
        titre: `Comment {{produit}} gère les sections padel et pickleball ?`,
        paragraphes: [
          `Le site de {{produit}} prévoit des sections padel et pickleball : une page par pratique, l’adhésion en ligne avec les formules de chaque section, l’agenda et les actualités. Dans le logiciel, le planning global montre les courts et les activités de toutes les disciplines, et les licences de tennis, padel et pickleball sont suivies ensemble. Les pages [clubs avec padel](/clubs-de-tennis/padel) et [clubs avec pickleball](/clubs-de-tennis/pickleball) détaillent ce qui est prévu.`,
          `En option, la [réservation de courts en ligne](/clubs-de-tennis/fonctionnalites/reservation-de-courts) applique les règles du club, à partir de {{club:option:reservation-courts:mise}} € à la mise en place ; l’option plusieurs lieux sert si la section joue ailleurs. La gestion des accès physiques aux courts (codes, serrures) n’est pas proposée. Le [simulateur](/clubs-de-tennis/simulateur) donne un prix indicatif, en sachant que les licenciés padel et pickleball comptent dans la catégorie du club.`,
        ],
      },
    ],
    faq: [
      { q: `Faut-il un terrain spécifique pour le pickleball ?`, a: `Pas toujours. Le pickleball peut souvent démarrer sur un court de tennis avec des marquages et des filets adaptés, ou en salle. Vérifiez les dimensions et la surface dont vous disposez.` },
      { q: `Quelle licence pour les joueurs de padel ou de pickleball ?`, a: `Renseignez-vous auprès de votre ligue ou de votre comité sur la licence adaptée à chaque pratique et sur ce qu’elle couvre pour la saison.` },
      { q: `Un enseignant de tennis peut-il encadrer le padel ?`, a: `L’encadrement rémunéré demande une qualification reconnue par le code du sport. Vérifiez auprès de la FFT ou de votre ligue quelles qualifications sont reconnues pour le padel et le pickleball.` },
      { q: `Comment éviter les conflits de créneaux avec le tennis ?`, a: `Avec un planning global de tous les terrains et activités, des créneaux fixes pour la section au démarrage, et des règles de réservation écrites, les mêmes pour tous.` },
      { q: `Faut-il une adhésion séparée pour la section ?`, a: `C’est un choix du club : adhésion propre, option de l’adhésion tennis ou formule découverte. L’important est de l’écrire dans la grille tarifaire avant d’ouvrir.` },
      { q: `Les licenciés padel et pickleball comptent-ils dans la catégorie de prix ?`, a: `Oui. La catégorie de {{produit}} se fonde sur les licenciés FFT de la saison en cours, tennis, padel et pickleball compris.` },
    ],
    liens: [
      { href: '/clubs-de-tennis/padel', nom: `Clubs avec padel` },
      { href: '/clubs-de-tennis/pickleball', nom: `Clubs avec pickleball` },
      { href: '/clubs-de-tennis/fonctionnalites/reservation-de-courts', nom: `Réservation de courts` },
      { href: '/clubs-de-tennis/guides/financer-le-numerique-du-club', nom: `Financer le numérique de son club` },
      { href: '/clubs-de-tennis/simulateur', nom: `Simulateur de prix` },
    ],
    sources: [
      { nom: `Légifrance`, url: 'https://www.legifrance.gouv.fr/' },
      { nom: `Service-public.fr`, url: 'https://www.service-public.fr/' },
    ],
    maj: '2026-10-29',
  },
]
