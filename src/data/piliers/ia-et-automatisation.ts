import type { Pilier } from './types'

export const PILIER: Pilier = {
  slug: 'ia-et-automatisation',
  chemin: '/services/ia-et-automatisation',
  titre: `IA et automatisation pour petites entreprises`,
  etiquette: `Service · IA et automatisation`,
  reponse: `Automatiser, c'est confier à un outil les tâches répétitives et prévisibles (relances, rappels, accusés de réception, saisie) pour garder votre temps pour ce qui demande du jugement. L'IA est un outil de plus dans cette boîte : utile pour un premier jet ou un tri, jamais sans relecture.`,
  titleSeo: `IA et automatisation en petite entreprise : par où commencer`,
  descriptionSeo: `Quelles tâches automatiser en TPE, lesquelles laisser à l'humain, quels risques avec l'IA, comment calculer la rentabilité. Sans promesse en l'air.`,
  sections: [
    {
      id: 'definition',
      titre: `C'est quoi l'automatisation pour une petite entreprise ?`,
      paragraphes: [
        `Automatiser, c'est demander à un logiciel d'exécuter à votre place une suite d'actions qui se répète toujours de la même façon. Un devis reste sans réponse, et quelques jours plus tard une relance part toute seule : voilà une automatisation. Pas forcément d'intelligence artificielle là-dedans : une règle écrite une fois (« si telle condition, alors telle action ») suffit le plus souvent.`,
        `L'IA ajoute une capacité différente : lire un texte libre, en tirer l'essentiel, proposer une formulation. Elle sert quand une règle simple ne suffit plus, par exemple pour trier des messages dont le contenu varie. Mais elle se trompe parfois, ce qu'une règle fixe ne fait pas. Gardez cette différence en tête pour la suite.`,
        `L'automatisation n'est pas réservée aux grandes entreprises. Une petite structure a même un avantage : peu de processus, que l'on connaît par cœur, donc faciles à décrire et à outiller. Quand on travaille seul, chaque heure récupérée se voit tout de suite.`,
      ],
    },
    {
      id: 'ce-quon-peut-automatiser',
      titre: `Que peut-on automatiser dans une petite entreprise ?`,
      paragraphes: [
        `Le bon critère n'est pas le métier mais la forme de la tâche : elle revient souvent, suit toujours à peu près les mêmes étapes, et une erreur se rattrape facilement. Un peintre, un électricien, un couvreur, un coiffeur ou un kiné n'ont pas les mêmes journées, mais ils retrouvent les mêmes familles de tâches.`,
      ],
      liste: [
        `Relances de devis : un message poli quand un devis envoyé reste sans réponse, avec un moyen simple de l'accepter ou de poser une question.`,
        `Relances d'impayés : un rappel courtois à l'échéance, un second plus ferme ensuite, et un signal pour vous quand il faut décrocher le téléphone.`,
        `Rappels de rendez-vous : un SMS ou un e-mail la veille, avec la possibilité de confirmer ou de déplacer, ce qui limite les absences.`,
        `Accusés de réception : dès qu'un formulaire de contact est rempli, le client reçoit un message qui confirme que sa demande est arrivée et ce qui se passe ensuite.`,
        `Tri de messages : classer ce qui arrive sur la boîte de contact (demande de devis, question, démarchage, urgence) pour traiter l'important d'abord.`,
        `Saisie de justificatifs : lire une facture fournisseur, en extraire la date, le montant, le fournisseur, et préparer l'écriture pour votre comptable. Vous vérifiez, l'outil n'a pas le dernier mot.`,
        `Du devis à la facture : un devis accepté devient une facture sans ressaisie. C'est la même information, inutile de la retaper.`,
        `Premier jet de réponse : un brouillon pour répondre à un message ou à un avis, que vous relisez, corrigez et envoyez vous-même.`,
      ],
      sous: [
        {
          titre: `Quelles tâches automatiser en priorité ?`,
          paragraphes: [
            `Celles qui vous coûtent un client ou de l'argent quand elles sont oubliées : la relance de devis, la relance d'impayé, la réponse à une demande entrante. Une relance qui part à l'heure vaut mieux qu'une relance parfaite qui ne part jamais. Les tâches de confort, comme programmer des publications sur les réseaux sociaux, viennent après : une réponse d'accueil automatique est raisonnable, une conversation entière menée par un robot l'est beaucoup moins dans un commerce où la relation compte.`,
          ],
        },
      ],
    },
    {
      id: 'ce-qui-ne-doit-pas-etre-automatise',
      titre: `Qu'est-ce qui ne doit pas être automatisé ?`,
      paragraphes: [
        `Tout ce qui engage votre responsabilité ou votre relation avec le client sans passer sous vos yeux. Le test est simple : si l'automatisme se trompe, qui s'en aperçoit, et quand ? Si c'est le client, et trop tard, n'automatisez pas, ou gardez une validation humaine.`,
      ],
      liste: [
        `L'envoi d'un devis ou d'une facture sans relecture : un prix, une quantité ou une mention erronés ont des conséquences commerciales et juridiques.`,
        `La réponse à une réclamation, à un litige ou à un client mécontent : le ton compte plus que la rapidité.`,
        `Les conseils qui relèvent d'une responsabilité professionnelle (santé, droit, sécurité d'une installation) : un texte généré n'a ni votre diplôme ni votre assurance.`,
        `Les décisions sur une personne (refuser un rendez-vous, un candidat) prises par un outil sans que vous sachiez pourquoi.`,
        `La relance d'un impayé sans vérification : relancer quelqu'un qui a déjà payé, ou dont le dossier est en discussion, abîme la relation.`,
        `Ce qui se fait une fois par an : le temps passé à automatiser dépasserait celui de la tâche.`,
      ],
    },
    {
      id: 'ia-generative',
      titre: `Quels usages concrets pour l'IA générative, et quelles limites ?`,
      paragraphes: [
        `Les assistants à base d'IA générative (ceux qui rédigent du texte à partir d'une consigne) sont bons pour un premier jet : reformuler un message, résumer un échange, proposer le plan d'une annonce. Ils sont moins fiables dès qu'il s'agit de faits précis : un prix, une date, une règle, une référence de produit.`,
        `Leur défaut principal : ils peuvent affirmer une chose fausse avec le même aplomb qu'une chose vraie, inventer une information sur votre entreprise, citer un texte de loi qui n'existe pas. Ils ne vous préviennent pas. La seule parade sérieuse est la relecture par quelqu'un qui connaît le sujet, c'est-à-dire vous.`,
      ],
      sous: [
        {
          titre: `Quelle IA pour un artisan, quelle IA gratuite ?`,
          paragraphes: [
            `Il n'y a pas de réponse universelle, et les offres changent vite. Posez trois questions : que fait l'outil de vos données, la version gratuite vous convient-elle vraiment ou prépare-t-elle le passage à l'offre payante, et que se passe-t-il si le service change ses conditions ou ferme ? Un assistant gratuit peut dépanner pour reformuler un texte sans rien de confidentiel. Dès qu'il touche à des données de clients, mieux vaut un cadre contractuel clair.`,
          ],
        },
        {
          titre: `Mon site est-il lisible par les assistants IA ?`,
          paragraphes: [
            `Personne ne peut garantir qu'un assistant citera votre site : leur fonctionnement n'est pas public. Ce qui aide, c'est ce qui aide déjà les moteurs de recherche et les visiteurs : un texte clair qui dit ce que vous faites, où et pour qui ; une page par service ; des coordonnées et des horaires écrits en toutes lettres, pas seulement dans une image ; une fiche d'établissement à jour. Pas de formule miracle.`,
          ],
        },
      ],
    },
    {
      id: 'donnees-clients-rgpd',
      titre: `Données clients et RGPD : que ne pas mettre dans un outil public ?`,
      paragraphes: [
        `Règle de prudence : ne collez pas dans un assistant en ligne grand public ce que vous ne mettriez pas sur une carte postale. Noms et coordonnées de clients, adresses de chantier, photos d'intérieurs, informations de santé (pour un kiné ou un institut), données bancaires, contenu d'un contrat ou d'un litige : ce sont des données personnelles ou confidentielles, et les envoyer à un service tiers est un traitement dont vous êtes responsable.`,
        `Le RGPD s'applique à une entreprise individuelle comme à une multinationale : savoir pourquoi vous collectez une donnée, ne garder que le nécessaire, informer la personne, savoir qui d'autre y accède. La CNIL publie des recommandations pratiques, y compris sur les systèmes d'IA ; consultez-les sur cnil.fr plutôt qu'un résumé, la doctrine évolue.`,
      ],
      liste: [
        `Anonymisez avant d'envoyer : remplacez le nom par « le client », retirez l'adresse, le téléphone, le numéro de dossier.`,
        `Lisez les conditions d'usage : vos textes servent-ils à entraîner le modèle ? Peut-on le désactiver ?`,
        `Séparez usage privé et usage professionnel : un compte gratuit créé à titre personnel n'est pas un cadre pour des données de clients.`,
        `Écrivez une règle courte (ce qu'on peut coller dans un assistant, ce qu'on ne colle jamais) et, avec des salariés, faites-en une charte d'une page.`,
      ],
      sous: [
        {
          titre: `Hébergement et sous-traitants : quelles questions poser ?`,
          paragraphes: [
            `Quand une solution traite vos données, quelqu'un les héberge et d'autres prestataires peuvent intervenir derrière (envoi d'e-mails, sauvegardes, outil d'IA). Plutôt que de croire une promesse commerciale, posez les questions et gardez les réponses par écrit. Aucune localisation n'est une garantie en soi : ce qui compte, c'est le cadre contractuel et la transparence.`,
          ],
          liste: [
            `Où les données sont-elles stockées, et qui est le fournisseur d'hébergement ?`,
            `Quels sous-traitants interviennent, et pour quelle fonction ?`,
            `Les données servent-elles à entraîner un modèle, et peut-on s'y opposer ?`,
            `Combien de temps sont-elles conservées, et comment les récupérer ou les supprimer ?`,
            `Que se passe-t-il en cas d'incident : serez-vous prévenu, et comment ?`,
          ],
        },
      ],
    },
    {
      id: 'zapier-make-n8n',
      titre: `Zapier, Make, n8n ou une automatisation intégrée à un outil sur mesure ?`,
      paragraphes: [
        `Les plateformes sans code comme Zapier, Make ou n8n relient des applications : quand un événement se produit dans l'une, une action se déclenche dans l'autre. Elles sont rapides à mettre en route, adaptées à un besoin simple, et vous pouvez les configurer vous-même. C'est une bonne façon de tester une idée avant de la figer.`,
        `Leurs limites : plusieurs abonnements dont les conditions évoluent selon le volume ; chaque lien entre deux outils est un point de panne possible, parfois silencieux ; et vos données passent par la plateforme intermédiaire, ce qui ajoute un sous-traitant à votre liste. n8n peut être installé sur un serveur que l'on maîtrise, mais il faut alors quelqu'un pour l'entretenir.`,
        `Une automatisation intégrée à un outil sur mesure est l'inverse : relance, rappel et conversion du devis en facture vivent dans le même logiciel que vos clients et vos documents. Moins de liaisons, un seul endroit où regarder quand quelque chose ne part pas, une règle adaptée à votre façon de travailler. Le revers est réel : un coût de départ plus élevé qu'un abonnement, et une dépendance à la personne qui l'a conçu. Pour une seule relance à automatiser, un outil du marché suffit probablement.`,
      ],
    },
    {
      id: 'cout-et-rentabilite',
      titre: `Combien coûte une automatisation, et est-elle rentable ?`,
      paragraphes: [
        `Le coût dépend de ce que l'on automatise, du nombre d'outils à relier, de la place laissée à la validation humaine et de ce qui existe déjà chez vous. Une relance par e-mail depuis un outil que vous utilisez déjà n'a rien à voir avec un enchaînement qui lit des documents, met à jour un dossier et prévient plusieurs personnes. Méfiez-vous d'un prix annoncé sans avoir regardé votre cas.`,
        `Pour savoir si elle est rentable, faites le calcul vous-même, sans chiffre emprunté à une étude :`,
      ],
      liste: [
        `Temps par occurrence : combien de minutes prend la tâche, recherche de l'information et allers-retours compris ? Chronométrez trois fois plutôt que d'estimer.`,
        `Fréquence : combien de fois par semaine ou par mois ? Temps gagné × fréquence = temps libéré sur la période.`,
        `Valeur de ce temps : ce que vous facturez à l'heure, ou ce qu'il vous permettrait de faire (un chantier de plus, un client de plus reçu).`,
        `Coûts à retrancher : l'outil ou le développement, l'abonnement éventuel, le temps de vérification qui reste, l'entretien.`,
      ],
      sous: [
        {
          titre: `Est-ce rentable d'automatiser quand on est seul ?`,
          paragraphes: [
            `Souvent oui : quand vous êtes seul, personne n'absorbe l'oubli. Une relance oubliée, c'est un devis qui dort. Mais le calcul reste le même : une tâche rare ou très variable ne se rentabilise pas, une tâche quotidienne, courte et identique, si. Pour les aides à la formation ou au financement, renseignez-vous auprès de votre OPCO, de votre chambre consulaire et sur service-public.fr : les dispositifs changent, nous n'en citons aucun ici.`,
          ],
        },
      ],
    },
    {
      id: 'demarrer',
      titre: `Comment démarrer : repérer, décrire, tester, mesurer`,
      paragraphes: [
        `On ne commence pas par choisir un outil, on choisit une tâche. Une seule, la plus répétitive et la plus agaçante.`,
      ],
      liste: [
        `Repérer : pendant une semaine, notez chaque fois que vous refaites ce que vous avez fait la veille. Messages recopiés, chiffres ressaisis, relances faites de tête en sont les classiques.`,
        `Décrire : écrivez la tâche étape par étape, comme pour la confier à un stagiaire. Quel événement la déclenche ? Quelles informations faut-il ? Dans quels cas faut-il s'arrêter pour vous demander ? Si vous n'arrivez pas à la décrire, elle n'est pas prête.`,
        `Tester : lancez la version automatique sur quelques cas réels, en gardant l'ancienne méthode en parallèle, et mettez-vous en copie des messages envoyés. Cherchez ce qui coince, pas ce qui marche.`,
        `Mesurer : au bout d'un mois, refaites le calcul avec les vraies données. Si le gain est faible ou si vous passez votre temps à corriger, simplifiez ou arrêtez. Un automatisme qui ne sert pas se désactive.`,
      ],
      sous: [
        {
          titre: `Comment faire automatiser son entreprise par un professionnel ?`,
          paragraphes: [
            `Arrivez avec la description écrite de la tâche et quelques cas réels. Demandez ce qui sera automatique, ce qui restera à valider par vous, ce qui se passe quand une règle ne s'applique pas, et qui s'occupe des modifications ensuite.`,
          ],
        },
      ],
    },
    {
      id: 'remplacer-mon-metier',
      titre: `L'IA va-t-elle remplacer mon métier ?`,
      paragraphes: [
        `Pour la plupart des métiers du geste, du contact et du conseil, rien n'indique un remplacement à court terme, et personne ne peut prédire sérieusement le long terme. Ce qui change, c'est la répartition du travail : certaines tâches de bureau, de rédaction ou de classement vont plus vite. Un plombier, une coiffeuse, un kiné, un paysagiste travaillent sur un lieu, un objet ou un corps réel, avec des imprévus qu'un logiciel ne gère pas.`,
        `Le vrai risque est plus prosaïque : perdre des demandes parce qu'on répond tard, ou laisser des concurrents mieux organisés gagner du temps sur l'administratif. Ni engouement ni peur : essayer un usage à la fois, avec relecture. Les dangers sont connus (erreurs non détectées, fuite de données, dépendance à un service, textes qui se ressemblent tous) et se gèrent par des habitudes simples : relire, anonymiser, garder une copie de ce qui compte, écrire avec votre voix.`,
      ],
    },
    {
      id: 'ce-que-fait-stackup',
      titre: `Ce que fait Stackup : des automatisations sur mesure dans vos outils de gestion`,
      paragraphes: [
        `Stackup Agency fabrique des sites et des outils sur mesure pour artisans, commerçants, TPE et professions libérales. Les automatisations sont des fonctions de l'outil lui-même : relance d'un devis resté sans réponse, rappel de rendez-vous, accusé de réception d'une demande, passage d'un devis accepté à la facture sans ressaisie. Elles suivent des règles écrites ensemble à partir de votre manière de travailler, et chaque envoi important peut passer par votre validation.`,
        `Ce n'est pas un produit d'IA : Stackup ne vend pas d'accès à une API d'IA facturée à l'usage et ne promet pas qu'un robot s'occupe de vos clients. Si un tri ou un brouillon automatique a du sens pour votre cas, nous en discutons avec ses limites, son coût de fonctionnement et ses conséquences sur vos données, avant de décider.`,
        `Un outil de gestion sur mesure démarre à partir de {{prix:outil}} €. Le prix final dépend de ce que l'outil doit faire, et vous pouvez l'estimer sur la page [tarifs](/tarifs). Le calendrier se fixe ensemble avant de commencer. La limite : un outil sur mesure coûte plus cher au départ qu'un abonnement, et vous dépendez d'un prestataire pour le faire évoluer. Nous vous le disons avant de signer.`,
      ],
    },
  ],
  exemples: [
    {
      titre: `Exemple type : un couvreur et ses devis en attente`,
      texte: `Exemple type, fictif. Un couvreur envoie ses devis le soir et oublie souvent de les relancer. Dans son outil de gestion, chaque devis envoyé reçoit une échéance : sans réponse à cette date, un brouillon de relance lui est proposé le matin. Il le relit, l'ajuste et l'envoie. Quand le devis est accepté, il devient une facture d'acompte sans ressaisie. Pour mesurer, il compare le temps des relances faites à la main avant et après.`,
    },
    {
      titre: `Exemple type : un salon de coiffure et les rendez-vous oubliés`,
      texte: `Exemple type, fictif. Une coiffeuse perd des créneaux parce que des clientes oublient leur rendez-vous. Un rappel part la veille par SMS ou e-mail, avec deux choix : confirmer ou déplacer. Le créneau libéré apparaît dans l'agenda et peut être reproposé. Pour une première visite ou une prestation longue, elle appelle elle-même : l'automatisme sert seulement à ne plus oublier.`,
    },
    {
      titre: `Exemple type : un cabinet libéral et les justificatifs du mois`,
      texte: `Exemple type, fictif. Un kinésithérapeute photographie ses factures fournisseurs en fin de semaine. Un outil en lit le fournisseur, la date et le montant, et prépare une ligne par pièce, qu'il valide avant de transmettre à son comptable. Aucune donnée de patient n'entre dans ce circuit, seuls les justificatifs de dépenses sont traités. L'IA aide à lire, l'humain décide de ce qui est enregistré.`,
    },
  ],
  faq: [
    {
      q: `Quelles tâches automatiser en priorité dans une TPE ?`,
      a: `Celles qui coûtent un client ou de l'argent quand on les oublie : relance de devis, relance d'impayé, réponse à une demande entrante, rappel de rendez-vous.`,
    },
    {
      q: `L'IA peut-elle lire et classer mes factures ?`,
      a: `Oui, elle peut en extraire le fournisseur, la date et le montant. Elle se trompe parfois : vous vérifiez avant de transmettre à votre comptable, et vous évitez les services publics pour des pièces contenant des données de clients.`,
    },
    {
      q: `Combien coûte une automatisation pour une petite entreprise ?`,
      a: `Cela dépend de ce qu'elle fait, du nombre d'outils reliés et de ce qui existe déjà. Un outil de gestion sur mesure Stackup démarre à partir de {{prix:outil}} €, et vous pouvez estimer le vôtre sur la page tarifs.`,
    },
    {
      q: `Comment calculer le gain de temps d'une automatisation ?`,
      a: `Chronométrez la tâche, multipliez le temps gagné par la fréquence, valorisez ce temps, puis retranchez le coût de l'outil, de son entretien et du temps de vérification. Refaites le calcul après un mois.`,
    },
    {
      q: `Puis-je coller les coordonnées de mes clients dans un assistant IA ?`,
      a: `Évitez-le dans un outil public ou gratuit : ce sont des données personnelles dont vous êtes responsable. Anonymisez, lisez les conditions d'usage et consultez les recommandations de la CNIL.`,
    },
    {
      q: `Zapier, Make ou n8n : lequel choisir ?`,
      a: `Pour un enchaînement simple entre deux applications que vous avez déjà, ils conviennent. Comparez leurs conditions actuelles et la façon dont ils traitent vos données. Au-delà, une automatisation intégrée à votre outil est plus simple à surveiller.`,
    },
    {
      q: `Les assistants IA citent-ils les petits sites d'artisans ?`,
      a: `Personne ne peut le garantir. Un site clair, avec vos services, votre zone, vos coordonnées en texte et une fiche d'établissement à jour, donne les meilleures chances.`,
    },
    {
      q: `L'IA va-t-elle remplacer mon métier ?`,
      a: `Rien n'indique un remplacement à court terme pour les métiers du geste, du contact et du conseil. Certaines tâches administratives changent : essayez un usage à la fois, avec relecture.`,
    },
    {
      q: `Stackup vend-il un assistant IA ou un agent vocal ?`,
      a: `Non. Stackup fabrique des sites et des outils de gestion sur mesure, avec des automatisations simples et validables, sans accès à une API d'IA facturée à l'usage.`,
    },
  ],
  sources: [
    { nom: `CNIL : intelligence artificielle et données personnelles`, url: `https://www.cnil.fr` },
    { nom: `Service-Public : informations pour les entreprises`, url: `https://www.service-public.fr` },
  ],
  liens: [
    { href: '/services/logiciel-de-gestion', nom: `Logiciel de gestion sur mesure`, note: `Là où vivent les relances, les devis et les factures.` },
    { href: '/solutions', nom: `Les solutions Stackup`, note: `Sites et outils par métier.` },
    { href: '/services/facture-electronique', nom: `Facture électronique`, note: `Ce que la réforme change pour votre facturation.` },
    { href: '/outils/modele-devis', nom: `Modèle de devis`, note: `Un devis clair, base de toute relance.` },
    { href: '/tarifs', nom: `Estimer votre projet`, note: `Prix « à partir de », calculé selon vos besoins.` },
    { href: '/contact', nom: `Nous contacter`, note: `Décrivez la tâche qui vous fait perdre du temps.` },
    { href: '/politique-confidentialite', nom: `Politique de confidentialité`, note: `Comment ce site traite vos données.` },
  ],
  maj: `2026-10-29`,
  type: 'service',
}
