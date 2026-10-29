import type { Pilier } from './types'

export const PILIER: Pilier = {
  slug: 'batappli-henrri-ou-devis-factures-sur-mesure',
  chemin: '/comparatif/batappli-henrri-ou-devis-factures-sur-mesure',
  titre: 'Batappli, Henrri ou devis-factures sur mesure : que choisir pour une entreprise du bâtiment ?',
  etiquette: 'Comparatif · devis et factures',
  reponse: `Un logiciel du marché comme Batappli ou Henrri est le bon choix si vos devis et vos factures restent classiques : vous démarrez vite, avec un outil déjà prêt. Un module de devis-factures sur mesure se justifie quand vos chantiers ont des règles que ces logiciels ne gèrent pas, ou quand vous voulez posséder l'outil et vos données.`,
  titleSeo: 'Batappli, Henrri ou devis-factures sur mesure',
  descriptionSeo: 'Batappli, Henrri ou module de devis-factures sur mesure ? Coûts, données, chantiers, facture électronique : comparez avant de choisir votre outil.',
  sections: [
    {
      id: 'logiciel-devis-factures-marche',
      titre: 'Que proposent les logiciels de devis et de factures du marché ?',
      paragraphes: [
        `Batappli et Henrri sont des logiciels en ligne de devis et de facturation. Ils fournissent des modèles de documents, un carnet de clients, une bibliothèque d'ouvrages ou de prestations et un suivi des paiements. Certains sont pensés pour le bâtiment, d'autres pour tous les indépendants ; les fonctions, formules et conditions évoluent, et il faut les lire chez l'éditeur.`,
        `Pour un artisan qui veut sortir du traitement de texte et du tableur, ces outils apportent immédiatement de l'ordre : numérotation, mentions, historique. Nous ne cherchons pas à les déconseiller par principe : un logiciel déjà prêt, utilisé par beaucoup de professionnels, est un choix sérieux.`,
        `Cette page ne donne aucun tarif de ces éditeurs : consultez la grille actuelle de chacun. Côté Stackup, un outil sur mesure démarre à partir de {{prix:outil}} €, le montant exact dépendant de vos documents et de vos règles de calcul.`,
      ],
    },
    {
      id: 'module-sur-mesure-definition',
      titre: 'Qu\'est-ce qu\'un module de devis-factures sur mesure ?',
      paragraphes: [
        `C'est un outil fabriqué pour votre façon de chiffrer : vos prestations, vos prix, vos coefficients, vos lots, vos acomptes, vos situations de travaux. Vous créez un devis à partir de votre catalogue, le client le valide, et ce qui est accepté se transforme en facture sans ressaisie. C'est le cœur de notre solution [gestion des devis et factures](/solutions/gestion-devis-factures).`,
        `Il s'accompagne de ce qui entoure le devis dans la vie réelle : suivi des paiements, relances, export pour le comptable. L'outil s'installe à votre nom, avec vos données dans votre base, et peut s'ouvrir à d'autres modules (planning de chantiers, stock) si vous en avez besoin plus tard.`,
      ],
    },
    {
      id: 'couts-depart-recurrents',
      titre: 'Abonnement mensuel ou outil sur mesure : que coûte chaque option ?',
      paragraphes: [
        `Le coût de départ est le point fort du logiciel du marché : on s'inscrit, on paramètre, on commence. Un outil sur mesure demande d'investir avant le premier devis émis.`,
        `Sur plusieurs années, la comparaison change. Un logiciel en ligne est un abonnement qui se poursuit tant que vous l'utilisez, parfois par utilisateur ou par fonction ajoutée. Un outil sur mesure supprime l'abonnement de licence, mais garde des coûts d'hébergement, de nom de domaine et de suivi, dont un suivi Stackup à partir de {{abo:min}} € par mois, sans obligation.`,
        `Faites le calcul avec votre nombre d'utilisateurs et de documents réels. Notre article [logiciel sur mesure ou SaaS : calcul sur cinq ans](/blog/logiciel-sur-mesure-ou-saas-calcul-5-ans) propose une méthode, et le [calculateur d'abonnement](/outils/calculateur-abonnement-saas) vous aide à chiffrer l'existant.`,
      ],
    },
    {
      id: 'chantiers-regles-specifiques',
      titre: 'Un logiciel standard gère-t-il des chantiers avec des règles particulières ?',
      paragraphes: [
        `Dans la plupart des cas, oui. Les logiciels du marché savent faire un devis avec des lignes, des quantités, une TVA, un acompte. Ils ont aussi des fonctions de suivi de chantier qui conviennent à de nombreux artisans.`,
        `Les difficultés apparaissent quand votre métier a ses propres règles : un prix qui dépend de la surface et de la difficulté d'accès, des forfaits qui se composent selon des options liées, une facturation en plusieurs situations, des tarifs différents selon le client. On contourne souvent par un tableur à côté, ce qui fait perdre l'intérêt du logiciel.`,
        `Un outil sur mesure encode ces règles une fois, et le devis se remplit à votre manière. Le revers est qu'il faut les décrire précisément, et que chaque règle est un développement.`,
      ],
    },
    {
      id: 'donnees-sortie-dependance',
      titre: 'Que deviennent vos devis et vos clients si vous changez de logiciel ?',
      paragraphes: [
        `Sur un logiciel en ligne, vos documents et votre fichier clients sont stockés chez l'éditeur. Vous pouvez en général exporter une partie de vos données, mais le format et l'étendue de l'export varient : certains historiques ne ressortent qu'en PDF, d'autres en tableau. Avant de vous engager, regardez ce qu'on peut emporter, et surtout pendant combien de temps après la résiliation.`,
        `Avec un outil sur mesure, les données sont dans votre base, et le contrat doit dire que code et données vous appartiennent. Pour les factures, c'est important : vous avez des obligations de conservation de vos documents comptables, à vérifier sur [economie.gouv.fr](https://www.economie.gouv.fr) et auprès de votre comptable. Notre article [posséder son logiciel et quitter les abonnements](/blog/posseder-son-logiciel-quitter-abonnements) en parle.`,
        `Il reste une dépendance, à la personne qui fabrique l'outil. Stackup est une agence d'une personne : un interlocuteur direct, mais aussi un point de fragilité que nous compensons par un code documenté et des accès à votre nom.`,
      ],
    },
    {
      id: 'facture-electronique-obligatoire',
      titre: 'Facture électronique obligatoire : quel outil choisir ?',
      paragraphes: [
        `La réforme de la facturation électronique impose, selon un calendrier échelonné, que les factures entre entreprises passent par une plateforme agréée par l'administration. Dates, tailles d'entreprise concernées et obligations évoluent : c'est un sujet à vérifier sur [economie.gouv.fr](https://www.economie.gouv.fr) et sur impots.gouv.fr avant de choisir un outil.`,
        `Cela concerne tous les logiciels. Un éditeur du marché peut proposer une solution intégrée ou un raccordement à une plateforme agréée : demandez-lui par écrit ce qui est prévu pour votre cas et à quelle échéance. Pour un outil sur mesure, le principe est identique : l'outil produit le devis et la facture, et il se raccorde à la plateforme agréée que vous avez choisie.`,
        `Stackup n'est pas une plateforme agréée et ne se présente pas comme telle. Nous fabriquons l'outil qui prépare vos documents ; la transmission réglementaire passe par une plateforme agréée, avec ses propres conditions, non comprises dans le prix de l'outil. Voir notre page [facture électronique](/services/facture-electronique).`,
      ],
    },
    {
      id: 'rapidite-prise-en-main',
      titre: 'Quelle solution est la plus rapide à prendre en main ?',
      paragraphes: [
        `Le logiciel du marché, nettement : il existe, il est documenté, d'autres artisans l'utilisent, et vous pouvez émettre votre premier devis rapidement si vos prestations sont prêtes à saisir.`,
        `Un outil sur mesure demande un cadrage (quels documents, quelles règles, quelles reprises de données), puis la fabrication et la formation. Nous ne promettons pas de durée fixe : le calendrier se fixe ensemble avant de commencer. Dans les deux cas, le plus long est souvent de rassembler vos prix et vos anciens clients.`,
      ],
    },
    {
      id: 'quand-choisir',
      titre: 'Quand choisir un logiciel du marché, quand choisir le sur-mesure ?',
      paragraphes: [
        `Nos critères, en toute franchise : ils dépendent de votre activité, pas de ce que nous aimerions vendre.`,
      ],
      sous: [
        {
          titre: 'Choisissez plutôt Batappli, Henrri ou un équivalent si…',
          paragraphes: [
            `Votre façon de chiffrer est classique et vous voulez être opérationnel vite avec un budget de départ limité.`,
          ],
          liste: [
            `Vous démarrez ou vous êtes seul, avec des devis simples.`,
            `Vous ne voulez rien administrer côté technique.`,
            `Vous acceptez un abonnement et un outil qui reste chez l'éditeur.`,
          ],
        },
        {
          titre: 'Choisissez plutôt un module sur mesure si…',
          paragraphes: [
            `Votre métier a des règles de calcul ou de facturation que les logiciels du marché ne gèrent pas, et vous voulez posséder l'outil.`,
          ],
          liste: [
            `Vous gardez un tableur à côté pour tout ce que le logiciel ne sait pas faire.`,
            `Vous voulez relier devis, planning de chantiers et suivi des paiements.`,
            `Plusieurs personnes l'utilisent et l'abonnement par utilisateur pèse.`,
            `Vous raisonnez sur plusieurs années et avez un interlocuteur de confiance pour le suivi.`,
          ],
        },
      ],
    },
    {
      id: 'questions-avant-decider',
      titre: 'Quelles questions se poser avant de choisir un logiciel de devis ?',
      paragraphes: [
        `Répondez-y par écrit avant de comparer :`,
      ],
      liste: [
        `Quels documents produisez-vous : devis, acomptes, factures de situation, avoirs ?`,
        `Quelles règles de calcul vous obligent à un tableur à côté ?`,
        `Combien de personnes l'utilisent, et sur quels appareils, chantier compris ?`,
        `Que pouvez-vous exporter si vous changez d'outil ?`,
        `Comment l'outil se raccorde-t-il à la facture électronique, et à quelle échéance ?`,
      ],
    },
  ],
  exemples: [
    {
      titre: 'Exemple type : un plombier seul qui sort du traitement de texte',
      texte: `Il fait des devis simples avec des lignes de main-d'œuvre et de fournitures, quelques acomptes. Un logiciel du marché lui convient : prêt tout de suite, documents propres, suivi des paiements. Il vérifiera auprès de l'éditeur comment l'outil traitera la facture électronique.`,
    },
    {
      titre: 'Exemple type : une petite entreprise de rénovation avec plusieurs corps de métier',
      texte: `Elle chiffre des lots avec des coefficients selon la difficulté, facture en situations de travaux et fait travailler deux équipes. Son tableur sert à tout ce que le logiciel ne gère pas. Un module sur mesure, relié à un planning de chantiers, supprime ce tableur, à condition d'assumer le coût de départ et le suivi.`,
    },
    {
      titre: 'Exemple type : un électricien qui veut garder la main sur ses données',
      texte: `Il apprécie son logiciel actuel mais s'inquiète de ce qu'il pourra emporter en cas de changement. Il compare l'export proposé par l'éditeur à un outil à lui. Tant que l'export lui convient et que l'abonnement reste raisonnable, il peut rester. Si l'un des deux le gêne, le sur-mesure devient une option.`,
    },
  ],
  comparaison: {
    titre: 'Logiciels du marché et devis-factures sur mesure, critère par critère',
    colonnes: ['Batappli, Henrri (logiciel du marché)', 'Module devis-factures sur mesure'],
    lignes: [
      {
        critere: 'Coût de départ',
        a: 'Faible : inscription et paramétrage, sans développement.',
        b: 'Plus élevé : conception et développement, à partir de {{prix:outil}} €.',
      },
      {
        critere: 'Coûts récurrents',
        a: 'Abonnement selon la formule ou le nombre d\'utilisateurs : consultez la grille actuelle de l\'éditeur.',
        b: 'Hébergement, domaine et suivi, sans abonnement de licence.',
      },
      {
        critere: 'Propriété des données',
        a: 'Documents et clients stockés chez l\'éditeur, selon ses conditions.',
        b: 'Base de données et code à vous, si le contrat le prévoit.',
      },
      {
        critere: 'Personnalisation',
        a: 'Modèles et paramètres dans le cadre de l\'éditeur.',
        b: 'Vos règles de calcul, vos documents, vos lots, vos acomptes.',
      },
      {
        critere: 'Chantiers atypiques',
        a: 'Souvent bien couverts ; les cas particuliers passent par un tableur à côté.',
        b: 'Règles encodées une fois, devis qui se remplit à votre manière.',
      },
      {
        critere: 'Dépendance',
        a: 'À l\'éditeur : ses prix, ses conditions, sa feuille de route.',
        b: 'À votre prestataire : code documenté et accès à votre nom indispensables.',
      },
      {
        critere: 'Export et sortie',
        a: 'Export variable selon l\'éditeur ; à vérifier avant de s\'engager.',
        b: 'Export complet de vos données, changement de prestataire possible.',
      },
      {
        critere: 'Facture électronique',
        a: 'À demander à l\'éditeur : solution intégrée ou raccordement, et échéance.',
        b: 'Raccordement à une plateforme agréée choisie ensemble ; Stackup n\'est pas une plateforme agréée.',
      },
      {
        critere: 'Contrat et engagement',
        a: 'Conditions générales de l\'éditeur ; durée et résiliation à lire.',
        b: 'Devis et contrat avec prix affichés ; suivi sans obligation.',
      },
    ],
    note: `Les tarifs et fonctions de Batappli, Henrri et des logiciels équivalents ne sont volontairement pas cités : consultez la grille actuelle de l'éditeur. Les prix Stackup sont toujours « à partir de » ; le [simulateur de tarifs](/tarifs#estimer) donne une estimation.`,
  },
  faq: [
    {
      q: 'Batappli ou Henrri : lequel choisir ?',
      a: `Cela dépend de votre activité et de la complexité de vos devis. Comparez fonctions, conditions et export sur les sites des éditeurs, et testez avec un vrai devis avant de vous engager.`,
    },
    {
      q: 'Existe-t-il une alternative à Batappli ou Henrri ?',
      a: `Oui : d'autres logiciels du marché, une solution proposée par votre comptable, ou un module de devis-factures sur mesure. Chacun a un coût de départ, des coûts récurrents et une dépendance différents.`,
    },
    {
      q: 'Un logiciel de devis-factures est-il obligatoire pour un artisan ?',
      a: `Non, mais vos devis et factures doivent respecter les mentions obligatoires. Un outil aide à les produire proprement ; vérifiez les règles sur service-public.fr ou auprès de votre comptable.`,
    },
    {
      q: 'La facture électronique est-elle obligatoire pour mon entreprise ?',
      a: `La réforme s'applique selon un calendrier échelonné, différent selon la taille de l'entreprise. Vérifiez votre situation sur economie.gouv.fr et voyez notre page [facture électronique](/services/facture-electronique).`,
    },
    {
      q: 'Stackup est-il une plateforme agréée de facturation électronique ?',
      a: `Non. Stackup fabrique l'outil de devis et de facturation ; la transmission réglementaire passe par une plateforme agréée choisie ensemble, avec ses propres conditions.`,
    },
    {
      q: 'Combien coûte un module de devis-factures sur mesure chez Stackup ?',
      a: `À partir de {{prix:outil}} €, selon le nombre de documents, les règles de calcul et les liaisons avec vos autres outils. Le [simulateur de tarifs](/tarifs#estimer) donne une estimation, puis le devis fixe le montant.`,
    },
    {
      q: 'Puis-je récupérer mes anciens devis et clients dans un outil sur mesure ?',
      a: `En général oui, par import de vos fichiers ou d'un export de votre ancien logiciel. Le format de départ conditionne ce qui se reprend : on le regarde ensemble avant de chiffrer.`,
    },
    {
      q: 'Que se passe-t-il si mon prestataire n\'est plus disponible ?',
      a: `C'est le risque principal du sur-mesure. Exigez un code documenté, des accès à votre nom et la propriété écrite du code et des données, pour qu'un autre développeur puisse reprendre.`,
    },
    {
      q: 'Peut-on tester l\'outil avant de payer le projet ?',
      a: `Oui : une démo est possible avant le devis. C'est une prestation à part, facturée {{carte:demo}} €, qui n'est pas déduite du devis.`,
    },
    {
      q: 'Puis-je commencer avec un logiciel du marché puis passer au sur-mesure ?',
      a: `Oui, c'est courant : on démarre simplement, puis on investit quand les limites se font sentir. Prévoyez l'export de vos données dès le départ. [Parlons-en](/contact).`,
    },
  ],
  sources: [
    { nom: 'Economie.gouv.fr : facturation électronique', url: 'https://www.economie.gouv.fr' },
    { nom: 'Impots.gouv.fr : facturation électronique et plateformes agréées', url: 'https://www.impots.gouv.fr' },
    { nom: 'Service-Public.fr : factures et devis', url: 'https://www.service-public.fr' },
  ],
  liens: [
    { href: '/solutions/gestion-devis-factures', nom: 'Gestion des devis et factures', note: 'Le module sur mesure, déjà visible dans la démo.' },
    { href: '/services/facture-electronique', nom: 'Facture électronique', note: 'Calendrier, plateformes agréées et préparation de votre entreprise.' },
    { href: '/blog/logiciel-de-devis-et-facturation-artisan-comment-choisir', nom: 'Logiciel de devis et facturation : comment choisir' },
    { href: '/comparatif/obat-tolteck-logiciel-sur-mesure', nom: 'Obat, Tolteck ou logiciel sur mesure', note: 'Un autre comparatif pour le bâtiment.' },
    { href: '/creation-site-internet/plombier', nom: 'Site pour plombier', note: 'Un exemple de métier du bâtiment.' },
    { href: '/outils/modele-devis', nom: 'Modèle de devis', note: 'Partez d\'un document propre avant de choisir.' },
    { href: '/tarifs#estimer', nom: 'Simulateur de tarifs', note: 'Une estimation « à partir de » selon votre projet.' },
    { href: '/contact', nom: 'Parler de votre projet', note: 'Décrire votre activité et obtenir un avis franc.' },
  ],
  maj: '2026-10-29',
  type: 'comparatif',
}
