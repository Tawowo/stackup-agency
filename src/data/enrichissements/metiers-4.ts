import type { Enrichissements } from './types'

export const ENRICHISSEMENTS: Enrichissements = {
  'cabinet-medical': {
    sections: [
      {
        titre: `Du premier patient à la dernière visite à domicile`,
        paragraphes: [
          `Dans un cabinet de médecine générale, la matinée commence souvent avant l’ouverture : le téléphone sonne, la salle d’attente se remplit, et chaque appel pour savoir si le docteur prend de nouveaux patients ou s’il accepte la carte Vitale retarde la consultation suivante. Les pics arrivent avec les épidémies hivernales, la rentrée scolaire et les renouvellements d’ordonnance de fin de mois. Un site bien construit absorbe ces questions répétitives : horaires, jours d’absence, médecin remplaçant, secteur de conventionnement, consignes en cas de retard. Ce que le secrétariat répète quarante fois par jour devient une page lisible.`,
          `Le cabinet tient aussi à une règle de prudence : un site médical ne remplace jamais le 15 quand la situation est grave, et ce rappel doit figurer en bonne place, visible depuis chaque page. Côté organisation, Stackup fabrique sur mesure des outils de gestion légers : demandes de renouvellement à traiter dans un ordre précis, formulaire de pré-rendez-vous qui trie le motif, affichage des remplaçants. Rien n’y collecte de données de santé inutiles. Mathéo Reboul, qui fabrique ces sites depuis Tours, commence par vous montrer votre page d’accueil en démonstration : c’est une prestation payante, et elle vous permet de juger le ton et la lisibilité avant de vous engager sur le reste.`,
        ],
      },
      {
        titre: `Ce que cherche un patient avant de pousser votre porte`,
        paragraphes: [
          `Un patient qui tape « médecin près de chez moi » veut savoir trois choses en quelques secondes : êtes-vous joignable aujourd’hui, prenez-vous de nouveaux patients, et où se garer. Les sites du secteur se perdent souvent dans un portrait flatteur du praticien, avec la partie utile reléguée en bas. Placez en tête de page l’adresse, le téléphone, les horaires et la prise de rendez-vous, puis seulement le reste. Une page par motif courant (certificat de sport, suivi de grossesse, vaccination, consultation de l’enfant) aide aussi le référencement local, parce que les gens cherchent par besoin.`,
          `Autre erreur répandue : des mentions floues sur les tarifs et le tiers payant. Un patient se demande si la consultation est conventionnée, s’il y a des dépassements, quels moyens de paiement sont acceptés. Répondez avant qu’il pose la question. Pensez enfin aux personnes âgées et aux aidants qui consultent depuis un téléphone : gros caractères, bouton d’appel direct, plan d’accès avec l’étage et la présence d’un ascenseur. Un cabinet qui indique clairement l’accessibilité pour les fauteuils roulants évite des appels et inspire confiance dès la première visite sur l’écran.`,
        ],
      },
    ],
    faq: [
      {
        q: `Puis-je afficher le nom des médecins remplaçants sur mon site ?`,
        a: `Oui, et c’est utile : les patients savent ainsi qui les recevra pendant vos absences. Nous prévoyons un bloc modifiable où vous indiquez les dates, le nom du remplaçant et ses horaires, sans toucher au reste de la page. Un simple champ de texte et une date de retour suffisent.`,
      },
      {
        q: `Le formulaire de contact peut-il recevoir des informations médicales ?`,
        a: `Nous déconseillons d’y faire figurer des symptômes détaillés. Le formulaire se limite à l’identité, au motif général et aux coordonnées, avec une mention claire de ne pas y décrire d’urgence. Les échanges médicaux restent dans le cadre de la consultation. Pour tout symptôme, un rappel invite à consulter ou à appeler le 15 en cas d’urgence vitale.`,
      },
      {
        q: `Comment prévenir les patients d’un cabinet fermé exceptionnellement ?`,
        a: `Nous ajoutons un bandeau d’information que vous activez en quelques secondes depuis un outil simple : fermeture pour congrès, jours fériés, panne de chauffage. Il apparaît sur toutes les pages, sans refaire la mise en page du site. L’affichage disparaît à la date que vous avez choisie, sans intervention de votre part.`,
      },
    ],
  },

  kinesitherapeute: {
    sections: [
      {
        titre: `Entre deux séances, la vie réelle d’un cabinet de rééducation`,
        paragraphes: [
          `Un kinésithérapeute enchaîne des séances aux durées réglées, avec peu de marge entre deux patients. Le planning dépend des prescriptions : des séances à recevoir dans un nombre précis, parfois à domicile, parfois en soins post-opératoires qui ne souffrent pas de retard. Chaque annulation tardive laisse un trou impossible à combler, et chaque appel pendant un soin coupe la concentration. Un site clair déplace ces échanges ailleurs : les patients consultent les horaires, repèrent ce qu’ils doivent apporter (ordonnance, carte Vitale, serviette, tenue adaptée) et réservent leur créneau sans vous interrompre.`,
          `Le rythme varie selon la saison : entorses de ski en hiver, tendinites chez les coureurs au printemps, lombalgies de jardinage à l’automne. Votre site peut suivre ce calendrier avec des pages ciblées que vous modifiez vous-même. Stackup construit aussi des outils de gestion à la mesure d’un petit cabinet : rappel automatique des rendez-vous, liste d’attente quand un créneau se libère, suivi du nombre de séances restantes par ordonnance. Rien d’imposant, juste ce qui évite les doublons. Pour savoir si l’atmosphère vous convient, Mathéo Reboul réalise depuis la Touraine une démonstration de votre page d’accueil avant tout engagement plus large ; cette étape est facturée, et vous repartez avec une image précise du résultat.`,
        ],
      },
      {
        titre: `Les recherches d’un patient qui a mal et veut une solution`,
        paragraphes: [
          `Quand une douleur s’installe, la recherche se fait souvent le soir, depuis un téléphone : « kiné épaule », « rééducation genou après opération », « kiné pour bébé bronchiolite », « kiné à domicile ». Chacune de ces formules mérite sa page, avec un langage simple qui explique ce que vous faites, comment se déroule la première séance et ce qu’il faut prévoir. Un patient inquiet apprécie qu’on lui décrive le déroulé sans jargon : bilan, techniques employées, exercices à faire chez soi, fréquence des visites.`,
          `Les sites du secteur commettent surtout deux fautes : empiler des promesses de guérison et masquer les informations pratiques. Évitez les engagements de résultat, qui n’ont pas leur place dans une profession de santé. Montrez plutôt vos formations complémentaires (sport, périnéologie, respiratoire, vestibulaire selon votre cas), votre équipement et la manière dont vous travaillez avec les médecins prescripteurs. Indiquez si vous prenez en charge à domicile et sur quel secteur, car ce détail évite les appels hors zone. Une page claire sur la prise en charge et la feuille de soins complète l’ensemble.`,
        ],
      },
    ],
    faq: [
      {
        q: `Dois-je mentionner l’ordonnance sur mon site ?`,
        a: `Oui, une phrase suffit pour rappeler ce qu’il faut apporter à la première séance. Cela évite des déplacements inutiles et des rendez-vous reportés. Nous la plaçons près du bouton de réservation pour qu’elle soit lue au bon moment. Les patients arrivent ainsi préparés, et vos premières minutes servent à examiner plutôt qu’à réclamer des papiers.`,
      },
      {
        q: `Puis-je indiquer que je me déplace à domicile ?`,
        a: `Oui, avec les communes couvertes et vos jours de tournée. Une page dédiée aide aussi les familles d’un patient âgé ou immobilisé qui cherchent exactement ce service. Nous prévoyons un formulaire qui demande l’adresse et la situation du patient. Ce détail évite aussi les appels hors zone, qui font perdre du temps aux deux parties.`,
      },
      {
        q: `Comment présenter mes formations complémentaires sans paraître vaniteux ?`,
        a: `En les reliant aux situations concrètes : chaque formation devient une ligne sous le type de patient concerné. Le visiteur comprend à quoi elle sert pour lui, au lieu de lire une liste de diplômes sans explication. Le visiteur retient ce qui le concerne, et vous gardez un ton mesuré plutôt qu’un étalage de titres.`,
      },
    ],
  },

  dentiste: {
    sections: [
      {
        titre: `Fauteuil, stérilisation, urgences : le quotidien d’un cabinet dentaire`,
        paragraphes: [
          `Un cabinet dentaire fonctionne avec un planning très serré, où une consultation de détartrage côtoie une prothèse à poser et une extraction non programmée. Les urgences — rage de dents, couronne cassée, accident de sport — bousculent la journée, et les patients qui souffrent appellent plusieurs cabinets à la suite. Un site qui indique comment vous traitez les urgences, à quelle heure appeler et ce qu’il faut faire en attendant vous met en position d’être choisi. La stérilisation, le respect des protocoles d’hygiène et l’équipement sont aussi des sujets que les patients cherchent à vérifier.`,
          `L’activité dépend du suivi : rappel annuel de contrôle, devis à valider avant des soins lourds, plan de traitement étalé sur plusieurs séances. Stackup peut fabriquer un petit outil de gestion pour envoyer ces rappels et garder trace des devis en attente, sans logiciel démesuré. Le site, lui, doit présenter l’équipe soignante, l’assistante dentaire, les spécialités et l’adresse précise. Avant de signer le projet complet, Mathéo Reboul, fondateur de Stackup en Touraine, peut réaliser la page d’accueil en démonstration : elle est payante, mais vous voyez le rendu avec vos propres textes avant de vous décider.`,
        ],
      },
      {
        titre: `Ce qui rassure ou inquiète quelqu’un qui cherche un dentiste`,
        paragraphes: [
          `Les recherches se partagent entre l’urgence (« dentiste ouvert aujourd’hui »), le besoin précis (« pose d’implant », « appareil dentaire adulte », « blanchiment ») et la comparaison de cabinets. Pour chaque soin, une page claire explique en quoi il consiste, le nombre de rendez-vous nécessaires, ce que ressent le patient et les suites normales. Évitez les photos avant/après qui promettent un résultat identique à tous ; un patient sait que les cas varient et préfère de la mesure.`,
          `Parmi les erreurs fréquentes figure l’absence totale d’information sur le coût. Même sans publier de tarifs précis, expliquez le principe du devis préalable, la part prise en charge par l’Assurance maladie et ce que couvre la mutuelle, en précisant que le reste à charge dépend de chaque dossier. Présentez aussi vos horaires d’accueil des enfants, l’accès pour les personnes à mobilité réduite et la possibilité de venir accompagné. Un cabinet qui parle franchement de ces sujets installe la confiance avant le premier fauteuil.`,
        ],
      },
    ],
    faq: [
      {
        q: `Puis-je expliquer le principe du devis avant les soins sur mon site ?`,
        a: `Oui, et c’est recommandé. Une page décrit les étapes : examen, proposition de traitement, devis remis, délai de réflexion, début des soins. Le patient comprend comment vous travaillez et ose davantage prendre rendez-vous. Le patient anticipe ainsi chaque étape, y compris la part qui reste à sa charge, et peut demander un devis en confiance.`,
      },
      {
        q: `Comment signaler les urgences en dehors des horaires du cabinet ?`,
        a: `Nous prévoyons un encart bien visible avec la marche à suivre : numéro à joindre, service de garde de votre secteur, conduite à tenir en attendant. Vous le mettez à jour vous-même pour les week-ends et jours fériés. En cas d’urgence vitale, le texte renvoie aussi vers les services de secours adaptés.`,
      },
      {
        q: `Le site peut-il accueillir des questions sur la prise en charge des enfants ?`,
        a: `Oui, une page dédiée présente votre approche avec les plus jeunes : première visite, durée, accompagnement par un parent, ambiance de la salle. Elle rassure les familles qui hésitent à franchir la porte d’un cabinet pour la première fois. Ajoutez-y une photo de la salle de soins : voir le fauteuil et le matériel apaise les enfants comme leurs parents.`,
      },
    ],
  },

  'pharmacie-parapharmacie': {
    sections: [
      {
        titre: `Comptoir, ordonnances, conseils : une officine rythmée par les files`,
        paragraphes: [
          `Une pharmacie vit sur deux rythmes qui se superposent : le flux de comptoir, avec des clients pressés qui veulent un avis rapide, et le travail plus lent de contrôle des ordonnances, de préparation et de conseil. Le titulaire jongle avec les gardes, les ruptures de stock, les campagnes de vaccination et les commandes du grossiste. Un site réduit la pression en répondant aux questions pratiques : jours de garde, horaires, présence d’un pharmacien pour un entretien, services disponibles en officine. Chaque information trouvée en ligne vous évite un appel au milieu d’un délivrance.`,
          `Une officine a aussi ses obligations propres : le pharmacien titulaire engage sa responsabilité, l’Ordre des pharmaciens encadre la communication, et la vente en ligne de médicaments suit des règles précises auprès de l’ARS. Un site de vitrine sans boutique reste une option parfaitement légitime : présenter l’équipe, les services et les conseils de saison suffit souvent. Stackup peut ajouter un outil simple pour recevoir des demandes de préparation à l’avance et les trier à l’ouverture. Mathéo Reboul, en Touraine, détaille avec vous ce qui a du sens pour votre officine.`,
        ],
      },
      {
        titre: `Pourquoi un client consulte votre site avant de venir`,
        paragraphes: [
          `La plupart des visiteurs cherchent un fait précis : « pharmacie ouverte dimanche », « pharmacie qui fait les tests », « location de matériel médical », « pharmacie conseils homéopathie ». Chaque service mérite une page courte, avec ce que vous proposez, comment en profiter et s’il faut prendre rendez-vous. Pensez aussi aux familles qui cherchent un produit pour un nourrisson, aux aidants de personnes âgées, aux sportifs. Classer vos conseils par situation de vie plutôt que par rayon rend le site plus utile qu’un catalogue.`,
          `Les erreurs courantes sont connues : un site qui affiche des promotions comme un hypermarché, des textes copiés des fabricants, aucune mention des pharmaciens et préparateurs qui accueillent en réalité le public. Ajoutez des visages et des prénoms, ainsi qu’un plan clair avec les places de stationnement et l’accès pour poussettes et fauteuils. Dans le domaine de la santé, évitez les allégations qui promettent un effet thérapeutique. Un ton de conseil sobre, qui renvoie vers le pharmacien pour toute question médicale, correspond mieux à ce que le public attend d’une officine.`,
        ],
      },
    ],
    faq: [
      {
        q: `Puis-je mettre en avant des promotions sans enfreindre les règles ?`,
        a: `La publicité sur les médicaments est encadrée. Nous pouvons mettre en avant des produits de parapharmacie et vos services, mais pas faire de promotion sur les médicaments remboursables. Nous vous orientons vers les textes de l’Ordre pour valider chaque formulation. En cas de doute, une phrase invite à demander conseil à l’officine plutôt que d’interpréter un texte seul.`,
      },
      {
        q: `Comment présenter les services d’une pharmacie de quartier ?`,
        a: `Nous créons une page par service (vaccination, orthopédie, location de matériel, entretiens pharmaceutiques) avec ce qui est proposé, les créneaux et la marche à suivre. Chaque page peut être retrouvée seule sur un moteur de recherche. Les clients retrouvent le service qu’ils cherchent sans parcourir un catalogue de produits entier.`,
      },
      {
        q: `Le site peut-il recevoir une ordonnance par photo ?`,
        a: `C’est techniquement possible, mais cela implique la protection des données de santé. Nous étudions avec vous un dispositif sécurisé, avec consentement du client et suppression des fichiers après traitement, avant toute mise en ligne. Le client sait aussi dans quel délai l’équipe prépare la commande, à condition que vous le définissiez vous-même.`,
      },
    ],
  },

  veterinaire: {
    sections: [
      {
        titre: `Consultations, chirurgies et appels de nuit : la cadence d’une clinique vétérinaire`,
        paragraphes: [
          `Une clinique vétérinaire alterne les consultations programmées, les opérations de la matinée, les visites en élevage pour les praticiens ruraux et les urgences qui surgissent sans prévenir. L’équipe comprend vétérinaires, auxiliaires spécialisées et parfois une personne à l’accueil, qui répond au téléphone en même temps qu’elle encaisse. Les propriétaires, eux, sont anxieux : un chien qui boite, un chat qui ne mange plus, un lapin apathique. Un site rassurant leur donne vite l’adresse, les horaires, le numéro d’urgence et la marche à suivre selon la gravité.`,
          `La continuité des soins fait partie des obligations de la profession, et les clients se demandent toujours qui répond la nuit. Indiquez clairement votre organisation de garde ou le renvoi vers la structure d’urgence de la région. Les vaccins, l’identification et le carnet de santé reviennent en cycle : un outil de rappel sur mesure, fabriqué par Stackup, peut prévenir les propriétaires quand une échéance approche. Si vous souhaitez voir avant d’acheter, Mathéo Reboul prépare depuis Tours une page d’accueil de démonstration à vos couleurs, facturée à part, pour que vous jugiez le résultat sur pièces avant de poursuivre.`,
        ],
      },
      {
        titre: `Les questions que se posent les propriétaires d’animaux avant de choisir`,
        paragraphes: [
          `Les propriétaires cherchent d’abord « vétérinaire près de moi », puis affinent selon leur animal : chien, chat, nouveaux animaux de compagnie, chevaux, animaux de ferme. Si votre clinique accueille les NAC (lapins, furets, rongeurs, oiseaux), dites-le haut et fort, car ces propriétaires trouvent peu de cliniques compétentes. Une page par espèce, avec les soins courants et ce que vous savez faire, répond à une vraie recherche. Pour les éleveurs, mettez en avant les tournées et le suivi de troupeau.`,
          `Les sites du secteur négligent souvent trois choses : la description d’une première visite, la politique d’annulation et les informations sur les paiements. Un propriétaire veut savoir à quoi s’attendre pour un chiot, ce que contient un bilan de santé, comment se passe un devis de chirurgie. Une clinique qui présente ses praticiens avec leurs domaines d’intérêt (dentisterie, comportement, chirurgie des tissus mous, médecine équine) donne envie de leur confier un animal. Sobriété et photos réelles de la clinique valent mieux que les images génériques de chiens souriants.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment signaler que ma clinique accueille les nouveaux animaux de compagnie ?`,
        a: `Nous créons une page par espèce accueillie, avec les soins pratiqués et les précautions de transport. Les propriétaires de lapins, furets ou oiseaux cherchent précisément cette information et la trouvent plus facilement qu’avec une simple mention en bas de page. Les propriétaires d’animaux moins courants gagnent un temps précieux, car peu de cliniques le précisent.`,
      },
      {
        q: `Puis-je publier des conseils de santé animale ?`,
        a: `Oui, sous forme d’articles pédagogiques (vaccination, vermifugation, chaleur estivale), sans diagnostic à distance. Chaque conseil renvoie vers la consultation pour tout symptôme précis. Ces pages vous donnent aussi une visibilité durable dans les moteurs de recherche. Chaque article se termine par un rappel sur la nécessité de consulter dès que l’animal présente un signe inhabituel.`,
      },
      {
        q: `Le site peut-il gérer les rappels de vaccins ?`,
        a: `Oui, avec un petit outil sur mesure : le propriétaire renseigne son animal, la date de son dernier vaccin, et reçoit un rappel au bon moment. Vous gardez la main sur les messages envoyés et sur la liste des contacts. Un message court, adapté à chaque espèce, prévient le propriétaire sans qu’il ait à y penser, et vous évitez des oublis coûteux pour l’animal.`,
      },
    ],
  },

  psychologue: {
    sections: [
      {
        titre: `Un cabinet où chaque détail compte avant même la première séance`,
        paragraphes: [
          `Un psychologue travaille sur un temps long, avec des consultations espacées d’une semaine et des plages de suivi réservées. Le titre est protégé et la pratique soumise au secret professionnel ainsi qu’au code de déontologie des psychologues. La plupart du temps, la personne qui consulte votre site hésite depuis des semaines à franchir le pas ; la moindre dissonance dans le ton — trop commercial, trop froid, trop savant — la fait renoncer. Votre site doit donc ressembler à votre cabinet : calme, précis, sans promesse de guérison ni formule de coaching.`,
          `L’organisation pratique pèse aussi. Vous gérez les annulations de dernière minute, les séances en visio, les créneaux protégés et vos temps de supervision. Un outil de réservation discret, sans compte obligatoire ni historique visible, protège la confidentialité de vos consultants. Rappelez aussi sur chaque page le numéro national de prévention du suicide, le 3114, pour les personnes en détresse qui arriveraient là par hasard. Cet ensemble est conçu sur mesure par Mathéo Reboul, en Touraine. Une page d’accueil de démonstration, payante, peut vous convaincre du ton juste avant que vous n’engagiez le projet complet.`,
        ],
      },
      {
        titre: `Ce que cherche une personne qui hésite à consulter`,
        paragraphes: [
          `Les recherches sont souvent formulées comme un symptôme ou une situation : « angoisse au travail », « deuil », « enfant qui refuse l’école », « couple en crise », « psychologue pour adolescent », « burn-out ». Une page par motif, rédigée avec pudeur, aide le visiteur à se reconnaître sans lui coller d’étiquette. Expliquez le déroulé d’une première séance, sa durée, la fréquence habituelle et ce que le patient peut attendre. Précisez à qui vous vous adressez : enfants, adolescents, adultes, couples, familles.`,
          `Les erreurs fréquentes des sites de psychologues tiennent à l’abus de jargon, aux photos de stock qui sonnent faux, et aux pages « tarifs » absentes. Les gens veulent savoir combien coûte une séance, si une annulation tardive est facturée, ce qu’il en est des dispositifs de remboursement en vigueur. Soyez factuel et évitez de promettre des résultats. Mentionnez votre formation, vos approches (TCC, psychanalytique, systémique, EMDR si vous êtes formé) et vos lieux de supervision. Une photo naturelle de votre salle de consultation, plutôt qu’un portrait posé, rassure beaucoup plus.`,
        ],
      },
    ],
    faq: [
      {
        q: `Dois-je afficher mon numéro d’enregistrement professionnel sur le site ?`,
        a: `Oui, il fait partie des informations de confiance. Nous l’intégrons avec votre titre, votre formation et votre mode d’exercice, dans les mentions légales et sur la page de présentation, afin que les visiteurs puissent vérifier qui vous êtes. Elles figurent aussi dans vos mentions légales, ce qui complète la transparence attendue d’un professionnel du soin psychique.`,
      },
      {
        q: `Comment éviter que le site paraisse trop commercial pour une activité de soin ?`,
        a: `En retirant les appels à l’action agressifs, les compteurs et les promesses. Nous choisissons des formulations sobres, un seul bouton de prise de contact par page et des visuels apaisants, qui laissent la décision au visiteur. Le visiteur garde sa liberté et reconnaît un cadre posé, loin du ton d’un vendeur.`,
      },
      {
        q: `Puis-je préciser mes règles d’annulation ?`,
        a: `Oui, sur une page de fonctionnement claire, avec le délai à respecter et ce qui est facturé en cas d’absence. Le patient les lit avant de réserver, ce qui évite les malentendus et les situations délicates en séance. Rien n’est laissé à l’interprétation, ce qui protège aussi votre temps de travail et la qualité des séances suivantes.`,
      },
    ],
  },

  sophrologue: {
    sections: [
      {
        titre: `Séances de groupe, séances individuelles : organiser une pratique de sophrologie`,
        paragraphes: [
          `Un sophrologue partage souvent son temps entre plusieurs lieux : son cabinet, une salle louée pour les séances collectives, parfois les locaux d’entreprises ou d’écoles. Le calendrier se découpe en cycles, avec des groupes qui démarrent à la rentrée, en janvier, au printemps. Les clients arrivent par vagues : candidats avant un examen, personnes en reprise de travail, futurs parents, sportifs avant une compétition. La profession n’est pas réglementée comme un métier de santé, ce qui rend votre formation, votre école et votre certification d’autant plus importantes à afficher.`,
          `Une activité de ce type souffre de plannings morcelés : quel groupe a encore de la place, quel jour, dans quelle salle, pour quel niveau ? Un outil de réservation sur mesure, fabriqué par Stackup, affiche les cycles ouverts et gère les inscriptions sans échanges de messages à répétition. Il permet aussi d’envoyer les consignes pratiques (tenue confortable, tapis, durée) avant la première séance. La démonstration d’une page d’accueil, proposée par Mathéo Reboul en Touraine contre paiement, vous laisse vérifier que l’ambiance reflète bien votre pratique, avant de prendre la moindre décision sur la suite.`,
        ],
      },
      {
        titre: `Les attentes de ceux qui cherchent « sophrologue » sur un moteur de recherche`,
        paragraphes: [
          `Beaucoup de visiteurs ne savent pas exactement ce qu’est la sophrologie. Ils tapent « sophrologue stress », « sophrologie sommeil », « sophrologue accouchement », « sophrologie enfant », « préparation mentale ». Une page par thème, avec une explication de ce que vous proposez et du déroulé d’une séance, répond à leur curiosité. Expliquez ce qu’est un exercice de respiration, ce que le client ressent, ce qu’il pratique ensuite chez lui. Soyez clair sur ce que la sophrologie n’est pas : elle ne remplace ni un avis médical ni un traitement.`,
          `Les sites du secteur tombent souvent dans les promesses de bien-être universel, les photos de coucher de soleil et les textes interchangeables. Préférez un ton précis et un portrait honnête de votre parcours : d’où vous venez, pourquoi cette pratique, quel public vous accompagnez. Indiquez les modalités concrètes — lieu, durée, tarif de séance, remboursements éventuels par certaines mutuelles selon les contrats — et proposez un premier contact par échange court. Un extrait audio de quelques minutes, que le visiteur peut écouter, donne un avant-goût de votre voix.`,
        ],
      },
    ],
    faq: [
      {
        q: `Dois-je indiquer ma formation et ma certification sur le site ?`,
        a: `Oui, c’est même essentiel pour une profession non réglementée. Nous détaillons votre école, votre année de certification, vos formations continues et vos engagements éthiques, afin que le visiteur sache précisément qui l’accompagnera. Ce détail pèse beaucoup dans le choix d’un praticien, puisque aucun diplôme d’État n’encadre l’exercice.`,
      },
      {
        q: `Comment présenter les séances en entreprise ?`,
        a: `Par une page dédiée aux organisations : formats proposés, public visé, objectifs, déroulé, contact. Les responsables des ressources humaines cherchent des informations précises et ne s’attardent pas sur un site qui mélange particuliers et entreprises. Vous pouvez aussi y joindre un exemple de programme et le profil des participants habituels.`,
      },
      {
        q: `Puis-je proposer un enregistrement audio d’essai ?`,
        a: `Oui, un court exercice de respiration en écoute libre fonctionne bien. Nous l’intégrons avec un lecteur simple, une transcription pour l’accessibilité et un avertissement rappelant de ne pas l’écouter en conduisant. Le visiteur peut tester la sensation sans engagement, et vous gagnez en crédibilité avant même le premier contact.`,
      },
    ],
  },

  naturopathe: {
    sections: [
      {
        titre: `Bilans, programmes et suivi : le travail d’un naturopathe au quotidien`,
        paragraphes: [
          `Un naturopathe consacre l’essentiel de ses journées à des entretiens approfondis : alimentation, sommeil, digestion, rythme de vie. Chaque bilan débouche sur un programme d’hygiène de vie, puis sur un suivi plus ou moins régulier. L’activité est saisonnière : détox de printemps, préparation de l’hiver, reprise de septembre. Vous gérez aussi des fiches clients détaillées, des recommandations écrites, parfois des ateliers en groupe ou des conférences. La naturopathie n’est pas une profession de santé reconnue, et vous ne posez ni diagnostic ni traitement : votre communication doit le dire sans ambiguïté.`,
          `Cette contrainte a des conséquences pratiques sur le site. Il faut un ton qui présente votre démarche d’accompagnement sans suggérer qu’elle guérit une maladie. Pour l’organisation, Stackup peut fabriquer un outil de gestion qui centralise les questionnaires préalables, envoie le compte rendu du bilan et planifie le suivi. Vos clients remplissent leur questionnaire avant la séance, ce qui libère du temps pour l’échange. Pour vérifier que le style correspond à votre approche, Mathéo Reboul établit depuis la Touraine une maquette de page d’accueil, payante, que vous pouvez examiner tranquillement avant de lancer le projet ensemble.`,
        ],
      },
      {
        titre: `Qui frappe à la porte d’un naturopathe, et avec quelles questions`,
        paragraphes: [
          `Les visiteurs arrivent avec des préoccupations de vie plus que de pathologie : fatigue persistante, ballonnements, sommeil agité, alimentation à repenser, accompagnement pendant la ménopause, hygiène de vie d’un jeune parent. Ils tapent des requêtes comme « naturopathe digestion », « naturopathe fatigue », « programme détox » ou « naturopathe en ligne ». Une page par thème, avec les principes que vous appliquez et la manière dont se passe un bilan, leur permet de se projeter. Ajoutez la durée des séances et la nature du suivi.`,
          `Les sites du secteur multiplient les allégations santé qu’ils ne peuvent pas justifier et, à l’inverse, restent vagues sur leur parcours. Mettez en avant votre formation, votre école, votre expérience, et précisez que vos conseils complètent un suivi médical sans s’y substituer. Évitez de lister des maladies « traitées ». Un article de blog mensuel sur un sujet précis (petit-déjeuner équilibré, routine du soir) installe votre expertise dans la durée. Une page de questions fréquentes, honnête sur les limites de la naturopathie, inspire davantage confiance qu’un discours enthousiaste.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment formuler mes services sans enfreindre les règles de la santé ?`,
        a: `Nous parlons d’accompagnement et d’hygiène de vie, jamais de traitement ni de guérison. Une mention claire indique que la naturopathie ne remplace pas un avis médical. Nous relisons ensemble chaque page pour écarter toute allégation douteuse. Cette prudence protège le visiteur autant que vous, et elle rassure ceux qui suivent déjà un traitement médical.`,
      },
      {
        q: `Mon site peut-il envoyer un questionnaire avant le premier rendez-vous ?`,
        a: `Oui, avec un formulaire sur mesure qui recueille habitudes alimentaires, rythme de vie et objectifs. Vous le recevez avant la séance. Les données sont conservées de manière sécurisée et le client est informé de leur usage. Vous gagnez du temps de consultation, et le client arrive avec ses propres observations déjà notées.`,
      },
      {
        q: `Puis-je organiser des ateliers collectifs en ligne ?`,
        a: `Oui, avec un calendrier d’ateliers, une inscription par session et l’envoi automatique du lien de connexion. Chaque atelier a sa page, ce qui facilite sa découverte sur un moteur de recherche et ses partages. Les participants se retrouvent ensuite dans un espace commun où vous déposez les documents annoncés pendant la séance.`,
      },
    ],
  },

  'salle-de-sport': {
    sections: [
      {
        titre: `Ouverture à 6 heures, fermeture à 22 heures : l’exploitation d’une salle`,
        paragraphes: [
          `Une salle de sport a des pics très marqués : l’avant-travail, la pause méridienne, l’après-bureau, puis la grande vague de janvier et de septembre. Entre les deux, il faut tenir la propreté, l’entretien des machines, les cours collectifs, les coachs et les inscriptions. Les coachs doivent détenir la carte professionnelle d’éducateur sportif, et les clients aiment qu’on le dise. Le site est votre accueil à toute heure : tarifs des formules, conditions de résiliation, planning, règles de la salle, ce qu’il faut apporter. Moins l’accueil répond au comptoir, plus il s’occupe de ses adhérents.`,
          `La gestion des adhérents tient une place centrale : abonnements, suspensions, séances d’essai, accès par badge ou QR code, présence aux cours. Stackup fabrique sur mesure des outils de gestion adaptés à une salle indépendante, sans passer par une plateforme imposée. Vous pouvez voir qui a payé, qui n’est pas venu depuis longtemps, quel cours est complet. Mathéo Reboul, fondateur en Touraine, peut commencer par composer votre accueil en démonstration, si vous le souhaitez ; la prestation est payante, mais elle donne une idée très concrète du site avant la signature.`,
        ],
      },
      {
        titre: `Ce qui fait pousser la porte d’une salle plutôt qu’une autre`,
        paragraphes: [
          `Quelqu’un qui cherche « salle de sport près de chez moi » compare des horaires, des types de cours, l’ambiance et les conditions d’engagement. Il ne veut pas deviner. Placez en tête les créneaux d’ouverture, la liste des activités (musculation, cardio, cross-training, cours collectifs, coaching), les espaces et les vestiaires. Les photos doivent montrer la salle en vrai, à une heure normale, pas une image retouchée. Une page par activité répond aux recherches précises comme « cours de pilates » ou « coaching personnel ».`,
          `L’erreur la plus fréquente consiste à cacher les conditions d’abonnement : durée d’engagement, frais d’inscription, résiliation, suspension pour blessure. Les visiteurs détestent les mauvaises surprises et les avis négatifs viennent souvent de là. Soyez transparent. Proposez une séance d’essai avec un formulaire clair, présentez vos coachs avec leurs spécialités, et indiquez les publics accueillis : débutants, seniors, femmes enceintes, sportifs confirmés. Une page sur le règlement intérieur et la tenue demandée complète l’ensemble et rassure les personnes qui n’ont jamais mis les pieds dans une salle.`,
        ],
      },
    ],
    faq: [
      {
        q: `Puis-je proposer une séance d’essai depuis le site ?`,
        a: `Oui, avec un formulaire qui demande le créneau souhaité et l’objectif de la personne. Vous recevez la demande, confirmez par message et préparez l’accueil. Cela permet de suivre combien d’essais se transforment en inscriptions. Le suivi de ces essais montre aussi quelles semaines amènent le plus de curieux dans vos locaux.`,
      },
      {
        q: `Comment afficher clairement les conditions d’engagement ?`,
        a: `Dans un tableau lisible, avec la durée, les frais éventuels, la façon de résilier ou de suspendre. Nous plaçons un résumé près des tarifs et le détail complet dans une page dédiée, pour que personne ne découvre une clause après coup. Les nouveaux adhérents apprécient de comprendre leurs droits avant de s’engager, et les litiges diminuent nettement.`,
      },
      {
        q: `Mon site peut-il présenter mes coachs et leurs spécialités ?`,
        a: `Oui, avec une fiche par coach : photo, spécialités, cours animés, qualifications. Les adhérents aiment choisir avec qui ils s’entraînent, et vous pouvez ajouter le lien de réservation d’une séance individuelle directement sur la fiche. Un court texte de présentation donne le ton de la salle et aide les débutants à choisir un encadrement qui leur convient.`,
      },
    ],
  },

  notaire: {
    sections: [
      {
        titre: `Rendez-vous de signature, dossiers en cours : la mécanique d’un office notarial`,
        paragraphes: [
          `Un office notarial est un lieu de précision. Les clients viennent pour une vente, une succession, un contrat de mariage, une donation ou la constitution d’une société, et chaque dossier suit des étapes où il manque toujours une pièce : acte d’état civil, titre de propriété, relevé de compte. Le notaire est officier public ; il rédige des actes authentiques, et le rythme est dicté par les dates de signature convenues entre vendeurs, acquéreurs et banques. Le téléphone sonne surtout pour demander l’état d’avancement. Un site qui explique les étapes classiques allège ces appels.`,
          `L’échange de documents est le point sensible. Les pièces d’identité, les titres et les justificatifs ne devraient pas voyager par courriel ordinaire. Stackup fabrique un espace de dépôt sécurisé sur mesure, rattaché à chaque dossier, avec la liste des pièces demandées cochée au fur et à mesure. Le client voit ce qu’il reste à fournir, le clerc reçoit ce qu’il attend. Mathéo Reboul réalise depuis la Touraine, en amont du devis signé, une page d’accueil de démonstration qui vous permet de valider la tonalité sobre qu’exige la profession ; cette étape est payante.`,
        ],
      },
      {
        titre: `Les interrogations des clients qui découvrent le notariat`,
        paragraphes: [
          `La plupart des visiteurs n’ont affaire à un notaire que deux ou trois fois dans leur vie. Ils cherchent donc des explications simples : « frais de notaire achat », « succession étapes », « donation enfants », « PACS ou mariage », « compromis de vente ». Chaque sujet mérite une page, avec les documents à réunir, le déroulé et les personnes concernées. Expliquez en particulier ce que recouvrent les frais d’acquisition : une grande partie correspond à des taxes reversées à l’État, et le reste à la rémunération réglementée de l’office et à des débours. Cette pédagogie lève une vraie méfiance.`,
          `Les sites de notaires commettent deux erreurs : un portail institutionnel austère, avec des textes juridiques indigestes, et l’absence de réponses pratiques à la question « que dois-je apporter ? ». Présentez votre équipe — notaires, clercs, négociateur s’il y en a un —, car le client veut savoir à qui il parle. Précisez les horaires d’accueil, l’accès aux personnes à mobilité réduite et la possibilité de signer à distance lorsque l’acte le permet. Un ton clair, sans jargon inutile, rassure et reste conforme à la dignité de la fonction.`,
        ],
      },
    ],
    faq: [
      {
        q: `Puis-je expliquer sur mon site la composition des frais de notaire ?`,
        a: `Oui, et c’est très demandé. Nous créons une page pédagogique qui distingue taxes, rémunération de l’office et frais divers, sans publier de chiffres que vous n’auriez pas validés. Elle réduit les questions de principe lors du premier rendez-vous. Le futur client comprend d’où viennent les montants et se montre plus serein au moment de la signature.`,
      },
      {
        q: `Comment présenter une liste de pièces à fournir par type de dossier ?`,
        a: `Par une page pour chaque situation (achat, vente, succession, donation) avec une liste de pièces téléchargeable. Le client prépare son dossier avant de venir, et votre équipe passe moins de temps à réclamer des documents manquants. Chaque liste reste à jour en quelques minutes et peut être imprimée, ce qui simplifie la préparation du rendez-vous.`,
      },
      {
        q: `Le site peut-il afficher l’avancement d’un dossier ?`,
        a: `C’est possible avec un espace client sur mesure : étapes franchies, pièces reçues, prochaine échéance. Il évite les appels de suivi. Nous définissons avec vous ce qui s’affiche, pour rester dans le cadre du secret professionnel. Le client garde ainsi une vision claire, sans écrire pour demander où en est son dossier.`,
      },
    ],
  },

  architecte: {
    sections: [
      {
        titre: `De l’esquisse au chantier : le cycle de travail d’une agence d’architecture`,
        paragraphes: [
          `Une agence d’architecture jongle avec des projets à des stades très différents : une esquisse à présenter, un permis de construire à déposer, un chantier à suivre le jeudi matin, une réception de travaux à organiser. Les missions suivent des phases bien identifiées — esquisse, avant-projet, dépôt de permis, consultation des entreprises, suivi de chantier — que le client ne connaît pas. Le titre est protégé et inscrit à l’Ordre des architectes, et l’assurance de responsabilité fait partie des mentions attendues. Vous passez beaucoup de temps à expliquer ce qui relève de vous et ce qui revient aux entreprises.`,
          `Le site peut porter cette pédagogie : une page « comment se déroule un projet » avec les étapes, les documents échangés et les décisions qui incombent au maître d’ouvrage. Stackup peut ajouter un espace de projet privé, fabriqué sur mesure, où un client retrouve plans, comptes rendus de chantier et photos d’avancement. Rien de lourd, juste de quoi éviter les courriels qui se perdent. À Tours, Mathéo Reboul vous soumet une démonstration payante de l’accueil, afin de voir comment vos images tiennent à l’écran avant de vous engager dans le projet complet.`,
        ],
      },
      {
        titre: `Comment un futur maître d’ouvrage choisit son architecte`,
        paragraphes: [
          `Les particuliers qui préparent une extension, une rénovation ou une maison neuve cherchent « architecte maison individuelle », « architecte rénovation », « extension permis de construire » ou « architecte d’intérieur ». Ils comparent surtout les réalisations et la manière de travailler. Un portfolio sert à prouver une cohérence, pas à tout montrer : choisissez peu de projets, avec pour chacun le programme, la contrainte, la réponse apportée. Indiquez aussi dans quelles situations le recours à un architecte est exigé pour déposer un permis, car beaucoup de visiteurs l’ignorent.`,
          `L’erreur la plus répandue est de ne montrer que des photos de beaux intérieurs finis, sans dire ce qui a été conçu ni quelles étaient les contraintes du terrain, du budget ou de la réglementation. Expliquez votre démarche, la place du dialogue avec le client, le type de missions que vous acceptez. Dites aussi ce que vous ne faites pas : pas de petite décoration, pas de chantier hors secteur. Un formulaire de premier contact qui demande la nature du projet, la localisation du terrain et le calendrier souhaité vous évite des échanges qui n’aboutissent pas.`,
        ],
      },
    ],
    faq: [
      {
        q: `À partir de quelle surface le recours à un architecte est-il obligatoire ?`,
        a: `Pour construire à titre personnel, il est en principe obligatoire au-delà de 150 m² de surface de plancher. Nous pouvons l’expliquer sur votre site, en vous invitant à vérifier le texte en vigueur pour chaque cas particulier. Pour tout autre cas, une déclaration préalable ou un permis suit des règles différentes que nous résumons simplement.`,
      },
      {
        q: `Combien de projets faut-il montrer dans un portfolio ?`,
        a: `Mieux vaut six projets bien documentés que trente photos sans contexte. Nous construisons une fiche par projet : lieu, programme, contrainte, solution retenue, photos et plans choisis. Le visiteur comprend votre manière de penser. Un visiteur lit dix pages tout au plus ; mieux vaut les consacrer aux projets qui vous ressemblent.`,
      },
      {
        q: `Puis-je créer un espace privé pour partager les documents d’un chantier ?`,
        a: `Oui, un espace sur mesure par projet permet de déposer plans, comptes rendus et photos. Chaque client accède uniquement à son dossier, avec un identifiant personnel, ce qui centralise les échanges sans multiplier les pièces jointes. Les accès peuvent être coupés une fois le chantier réceptionné, ou prolongés pour conserver les plans à portée de main.`,
      },
    ],
  },

  'courtier-credit': {
    sections: [
      {
        titre: `Dossiers, banques, délais : la vie d’un courtier entre deux appels`,
        paragraphes: [
          `Un courtier passe ses journées entre les clients qui apportent leurs justificatifs, les conseillers bancaires qui répondent ou ne répondent pas, et les offres de prêt à comparer. Les dossiers avancent en parallèle, chacun avec ses pièces manquantes : bulletins de salaire, avis d’imposition, relevés de compte, compromis de vente. L’intermédiaire en opérations de banque est immatriculé à l’ORIAS, et cette immatriculation, avec le détail de sa rémunération, doit être visible. Un client qui comprend d’emblée comment vous êtes payé et à quel moment vous intervenez se montre plus à l’aise pour confier ses documents.`,
          `Le premier gain d’un site, pour un courtier, est de préparer les dossiers en amont. Stackup fabrique sur mesure un formulaire qui pose les bonnes questions (projet, apport, revenus, situation) et une liste de pièces propre à chaque type de prêt. Le suivi de dossier peut être visible côté client, avec les étapes franchies. Avant de décider, vous pouvez commander à Mathéo Reboul, en Touraine, un accueil de démonstration, payant : il sert à vérifier que le ton reste professionnel et rassurant, sans excès promotionnel, comme l’attend le secteur financier.`,
        ],
      },
      {
        titre: `Ce qu’un emprunteur veut comprendre avant de confier son dossier`,
        paragraphes: [
          `Les emprunteurs cherchent « courtier prêt immobilier », « renégociation de prêt », « rachat de crédit », « prêt pour primo-accédant », « courtier investissement locatif ». Chaque projet a sa page, avec les étapes, les pièces à fournir et ce que fait concrètement le courtier. Le visiteur veut surtout comprendre en quoi vous l’aidez par rapport à une demande directe auprès de sa banque. Répondez sans exagérer : accès à plusieurs établissements, préparation d’un dossier solide, négociation des conditions, gain de temps. Pas de promesse de taux, car personne ne peut la garantir.`,
          `Les sites du secteur multiplient les simulateurs agressifs et oublient les mentions réglementaires. Un crédit engage celui qui l’emprunte, et les publicités doivent rappeler qu’il faut vérifier sa capacité de remboursement ; ce type de mention doit apparaître clairement. Précisez votre statut, votre immatriculation, votre assurance professionnelle et votre mode de rémunération. Évitez de collecter plus de données que nécessaire dès le premier formulaire. Un premier contact qui demande seulement le projet et un moyen de rappel aboutit à plus de conversations qu’un questionnaire interminable.`,
        ],
      },
    ],
    faq: [
      {
        q: `Quelles informations réglementaires dois-je faire figurer sur mon site ?`,
        a: `Votre numéro d’immatriculation à l’ORIAS, votre statut d’intermédiaire, votre mode de rémunération, l’assurance professionnelle et les coordonnées du médiateur. Nous les intégrons dans les mentions légales et en pied de page, et vous les relisez avant publication. Cette rigueur vous protège en cas de contrôle et rassure des clients qui confient des informations financières.`,
      },
      {
        q: `Puis-je afficher une calculette de mensualités ?`,
        a: `Oui, à condition de la présenter comme une simulation indicative et d’afficher les mentions d’usage. Nous la fabriquons sur mesure, sans dépendance à un service payant, et vous choisissez ce qu’elle affiche et ce qu’elle conserve. Aucun résultat ne doit être présenté comme une promesse, et nous le rappelons au sein de la calculette elle-même.`,
      },
      {
        q: `Comment recueillir les pièces d’un dossier sans passer par des courriels ?`,
        a: `Par un espace de dépôt sécurisé, avec une liste de pièces adaptée au projet. Le client téléverse ses documents à son rythme, vous voyez ce qui manque. Cela réduit les relances et protège des données financières sensibles. Chaque document reçu est classé automatiquement dans le dossier du client concerné.`,
      },
    ],
  },

  'diagnostiqueur-immobilier': {
    sections: [
      {
        titre: `Tournées, rapports, rendez-vous de dernière minute : un métier à flux tendu`,
        paragraphes: [
          `Le diagnostiqueur travaille à la demande de vendeurs, de bailleurs, d’agences et de notaires, et ses délais sont souvent dictés par la date d’une promesse de vente ou d’une mise en location. Sa journée est faite de déplacements, de relevés sur place — mesures, prélèvements, photos — puis de rédaction de rapports à rendre rapidement. Chaque diagnostic (DPE, amiante, plomb, électricité, gaz, termites, état des risques) demande une certification de personne délivrée par un organisme accrédité, ainsi qu’une assurance de responsabilité civile. Ces éléments rassurent et doivent apparaître clairement.`,
          `Un site peut absorber les demandes de dernière minute : formulaire qui recueille type de bien, adresse, année de construction, date souhaitée et diagnostics nécessaires. Stackup fabrique sur mesure un outil qui regroupe les demandes, propose les créneaux de votre tournée et permet de livrer les rapports dans un espace sécurisé. Les agences partenaires y retrouvent l’historique de leurs dossiers. Pour tester la clarté du parcours de commande, Mathéo Reboul prépare, dans son atelier tourangeau, un accueil de démonstration facturé, que vous examinez avant de lancer la fabrication de l’ensemble.`,
        ],
      },
      {
        titre: `Pourquoi on cherche un diagnostiqueur, et comment on le choisit`,
        paragraphes: [
          `Les particuliers cherchent « diagnostic immobilier avant vente », « DPE location », « diagnostic amiante », « diagnostiqueur près de chez moi ». Ils ne connaissent pas la liste exacte des diagnostics obligatoires, qui varie selon l’âge du logement, sa nature et l’opération. Une page « quels diagnostics pour mon bien ? » avec un questionnaire simple est un excellent point d’entrée. Les professionnels (agences, notaires, syndics) cherchent autre chose : fiabilité, délais, facilité de commande, interlocuteur identifié.`,
          `Les erreurs récurrentes tiennent à un site trop technique, qui empile les sigles sans les expliquer, ou à un site muet sur les certifications. Affichez vos certifications par domaine et la date de validité, votre assurance et votre secteur d’intervention. Expliquez ce qui se passe après la visite : quand arrive le rapport, comment il est transmis, ce qu’il faut faire si le résultat pose problème. Une page destinée aux agences, avec une commande simplifiée, vous apporte une clientèle régulière, plus précieuse qu’une suite de demandes isolées. Pensez à y indiquer les créneaux de tournée par secteur, pour que chacun comprenne dans quelle mesure vous pouvez vous déplacer au plus vite.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment aider un particulier à savoir quels diagnostics commander ?`,
        a: `Avec un questionnaire court : nature du bien, date de construction, vente ou location. Le site propose la liste des diagnostics habituellement concernés et renvoie vers votre formulaire de demande. Vous validez ensuite la liste exacte avec le client. Le client sait ainsi ce qu’il doit commander, et la demande que vous recevez est déjà bien préparée.`,
      },
      {
        q: `Puis-je avoir un espace réservé aux agences et notaires partenaires ?`,
        a: `Oui, avec un accès par identifiant pour commander, suivre l’état des visites et récupérer les rapports. Les professionnels gagnent du temps, et vous gardez une trace claire de chaque demande sans passer par des courriels dispersés. Chaque agence retrouve ses propres rapports, sans voir ceux des autres, avec un accès contrôlé.`,
      },
      {
        q: `Où afficher mes certifications et mon assurance ?`,
        a: `Sur une page de présentation et en pied de chaque page, avec le domaine concerné pour chaque certification. Le visiteur vérifie d’un coup d’œil que vous êtes habilité pour le diagnostic dont il a besoin. Une mention de la date d’échéance de chaque certification, mise à jour par vos soins, évite les documents périmés en ligne.`,
      },
    ],
  },

  'agence-evenementielle': {
    sections: [
      {
        titre: `Briefs, rétroplannings et jour J : comment travaille une agence événementielle`,
        paragraphes: [
          `Une agence événementielle gère plusieurs événements à la fois, chacun à un stade différent : brief reçu, devis envoyé, prestataires réservés, repérage du lieu, jour J. Elle coordonne traiteurs, techniciens son et lumière, décorateurs, loueurs de matériel, parfois des artistes. Chaque prestataire a ses contraintes, et le client attend que tout fonctionne sans qu’il ait à y penser. Il faut aussi tenir compte des règles de sécurité du lieu, des déclarations pour la musique diffusée en public et d’une assurance de responsabilité civile professionnelle, que les clients professionnels demandent souvent.`,
          `Le site sert ici d’outil de tri : il doit amener les bons projets et filtrer les autres. Un formulaire de brief détaillé (type d’événement, date, nombre d’invités, lieu envisagé, attentes) évite les premiers appels flous. Stackup peut fabriquer en plus un petit tableau de bord interne pour suivre chaque événement, ses prestataires et ses échéances. Mathéo Reboul, en Touraine, vous remet sur demande un accueil de démonstration, payant lui aussi, afin de vérifier que l’univers visuel correspond au vôtre avant de poursuivre le travail.`,
        ],
      },
      {
        titre: `Ce que veulent voir ceux qui confient un événement à une agence`,
        paragraphes: [
          `Les clients ne cherchent pas tous la même chose. Un couple tape « organisateur de mariage », une entreprise « séminaire d’équipe », une association « soirée de gala », une collectivité « inauguration ». Chaque profil a besoin d’une page distincte, avec des exemples de formats, la façon dont vous intervenez et les questions que vous posez au départ. Le particulier cherche surtout de la confiance et de l’écoute ; l’entreprise veut de la rigueur, une méthode et des références vérifiables. Les deux ne se parlent pas de la même façon.`,
          `L’erreur la plus courante est la galerie de belles photos sans contexte. Chaque réalisation devrait indiquer le type d’événement, la contrainte principale et votre rôle exact : conception, coordination, décoration, régie. Évitez de promettre un événement « sans stress » ou « sur mesure » sans le prouver. Expliquez votre méthode — rendez-vous de cadrage, proposition, réservations, rétroplanning, présence le jour même — et précisez ce qui se passe en cas d’imprévu. Cela distingue une agence structurée d’un simple recueil d’idées. Un lien de prise de contact visible sur chaque page suffit.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment structurer un formulaire de brief qui ne décourage pas ?`,
        a: `En posant cinq ou six questions essentielles, puis en laissant une zone libre. Les détails se discutent à l’oral. Nous adaptons les champs selon qu’il s’agit d’un mariage, d’un séminaire ou d’une soirée, pour que chaque demande soit exploitable. Les rubriques inutiles pour un type d’événement sont masquées, de façon que chacun réponde seulement à ce qui le concerne.`,
      },
      {
        q: `Puis-je montrer mes prestataires partenaires sur le site ?`,
        a: `Oui, avec leur accord, sous forme de liste ou de fiches. Cela rassure vos clients sur la qualité de votre réseau. Nous prévoyons que vous puissiez ajouter ou retirer un partenaire facilement, sans solliciter personne. Chaque partenaire peut être rattaché à un type d’événement, pour que les clients découvrent le bon interlocuteur.`,
      },
      {
        q: `Mon site peut-il suivre les événements en cours pour mon équipe ?`,
        a: `Oui, avec un outil interne sur mesure : liste des événements, étapes, prestataires confirmés, échéances à venir. Il reste privé et ne se mélange pas au site public. Nous le dimensionnons à la taille de votre équipe. Vous y retrouvez aussi les échanges avec chaque prestataire, afin de ne rien oublier la veille d’un événement important.`,
      },
    ],
  },

  'organisme-formation': {
    sections: [
      {
        titre: `Sessions, financeurs, émargements : la logistique d’un organisme de formation`,
        paragraphes: [
          `Un organisme de formation gère un calendrier de sessions avec ses intervenants, ses salles, ses groupes et ses financeurs. Il est déclaré auprès des services de l’État, dispose d’un numéro de déclaration d’activité, et vise souvent la certification Qualiopi, nécessaire pour que certains financements publics ou mutualisés soient mobilisables. Chaque formation s’accompagne de documents : programme, convention, convocation, feuille d’émargement, évaluation à chaud, attestation. Le travail administratif est considérable et ne tolère pas l’approximation, car des contrôles peuvent le vérifier.`,
          `Un site bien conçu fait gagner du temps sur toute cette chaîne. Il présente les formations avec les informations que le référentiel qualité demande de rendre publiques : objectifs, prérequis, durée, modalités, accessibilité aux personnes en situation de handicap, indicateurs de résultats. Stackup fabrique sur mesure les outils de gestion qui vont avec : inscription, génération des convocations, émargement numérique, suivi des évaluations. Un accueil de démonstration, facturé séparément par Mathéo Reboul en Touraine, vous aide à juger la clarté de votre catalogue avant de signer le reste du projet.`,
        ],
      },
      {
        titre: `Particuliers, entreprises, prescripteurs : trois publics, trois lectures`,
        paragraphes: [
          `Un particulier cherche « formation » suivie d’un métier et de « financée », « reconversion », « préparer un titre professionnel ». Il veut savoir si la formation est accessible avec son compte personnel de formation, combien de temps elle prend, quels débouchés elle ouvre. Un responsable des ressources humaines cherche « formation sécurité entreprise » ou « formation management intra », avec devis, dates et modalités d’inscription. Un prescripteur (conseiller en insertion, Pôle emploi devenu France Travail) veut vérifier votre sérieux en un coup d’œil. Chaque public mérite un chemin clair.`,
          `Les erreurs courantes des sites du secteur sont un catalogue en simple liste de titres, des fiches sans prérequis ni objectifs, et des informations de financement vagues. Une fiche solide précise le public, la durée, les modalités (présentiel, distanciel, mixte), le lieu, les moyens pédagogiques, la validation éventuelle (certification enregistrée, attestation). Présentez vos formateurs avec leurs compétences réelles. Affichez aussi un contact pour les besoins d’adaptation liés à un handicap. Plus la fiche est complète, moins vous répondez à des mails d’information, et plus le dossier d’inscription arrive prêt. Les référents de structures d’insertion, qui orientent plusieurs personnes à la fois, apprécient de retrouver partout la même présentation.`,
        ],
      },
    ],
    faq: [
      {
        q: `Quelles informations doivent figurer sur chaque fiche de formation ?`,
        a: `Les objectifs, le public visé, les prérequis, la durée, les modalités, le lieu, les moyens pédagogiques, l’évaluation, l’accessibilité aux personnes handicapées et les indicateurs de résultats. Nous construisons un modèle de fiche qui rassemble ces éléments de façon homogène. Un modèle commun garantit que chaque formation affiche les mêmes rubriques, dans le même ordre, et facilite le travail des auditeurs.`,
      },
      {
        q: `Puis-je gérer l’émargement et les attestations depuis le site ?`,
        a: `Oui, avec un outil sur mesure : feuille d’émargement numérique par demi-journée, attestation générée en fin de session, suivi des évaluations. Les documents sont conservés dans un espace sécurisé et faciles à retrouver en cas de contrôle. Vous pouvez en extraire une synthèse par session ou par stagiaire quand un financeur la demande.`,
      },
      {
        q: `Comment indiquer l’éligibilité au compte personnel de formation ?`,
        a: `Uniquement si la formation y est réellement inscrite, avec le lien officiel et la mention exacte. Nous évitons toute formulation ambiguë qui laisserait croire à un financement non acquis, car cela nuit à la confiance des stagiaires. En cas de doute, une page de contact dédiée permet aux stagiaires de poser leur question avant de s’inscrire.`,
      },
    ],
  },

  'auto-ecole': {
    sections: [
      {
        titre: `Planning de conduite, code, examens : le quotidien d’une auto-école`,
        paragraphes: [
          `Une auto-école tient un planning de leçons de conduite comme un horaire de trains : chaque moniteur a ses créneaux, chaque élève a ses disponibilités, et les annulations de dernière minute désorganisent la journée. S’y ajoutent les séances de code, les rendez-vous d’examen que l’on obtient sur un calendrier contraint, les formules (permis B, conduite accompagnée, boîte automatique, moto) et les financements possibles, dont le compte personnel de formation pour certains permis. L’établissement est agréé par la préfecture, les enseignants détiennent un titre professionnel et le contrat de formation suit un cadre précis.`,
          `Le site est un guichet permanent : forfaits, contrat type, pièces à fournir à l’inscription, démarches de l’ANTS, règles d’annulation. Stackup peut fabriquer un outil de gestion sur mesure pour réserver les heures de conduite, tenir le livret d’apprentissage numérique et prévenir élèves et moniteurs en cas de changement. Vous voyez d’un coup d’œil les heures effectuées et celles qui restent. Vous voulez juger le rendu avant d’engager le travail complet ? Mathéo Reboul peut fabriquer un accueil de démonstration payant, avec vos formules et vos horaires.`,
        ],
      },
      {
        titre: `Ce que cherchent les futurs conducteurs, et leurs parents`,
        paragraphes: [
          `Les jeunes cherchent « permis de conduire à 17 ans », « conduite accompagnée », « permis accéléré », « permis boîte auto », « passer le permis moto ». Leurs parents lisent le site en même temps qu’eux, parfois à leur place, car ce sont eux qui financent. Ils veulent des explications posées : déroulement des étapes, nombre d’heures minimum, rôle de l’accompagnateur, assurance. Une page par formule, avec le public concerné, les conditions d’accès et un exemple de parcours, évite les malentendus à l’inscription.`,
          `Les sites d’auto-écoles pèchent souvent par des tarifs introuvables, des photos de voitures sans visage humain et l’absence de présentation des moniteurs. Les élèves choisissent avant tout la personne qui sera assise à côté d’eux : montrez l’équipe, sa pédagogie, ses langues parlées, son accueil des personnes anxieuses ou en situation de handicap. Indiquez les véhicules utilisés, l’emplacement des locaux et les moyens de s’y rendre à pied, en bus ou à vélo. Un formulaire d’inscription préalable raccourcit le premier rendez-vous en agence, et laisse plus de temps pour parler de pédagogie.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment présenter les étapes de la conduite accompagnée aux parents ?`,
        a: `Par une page pas à pas : conditions d’âge, rendez-vous préalable, rôle de l’accompagnateur, kilométrage, rendez-vous pédagogiques. Les parents y trouvent réponse à leurs questions d’assurance et de responsabilité sans devoir appeler l’agence. Les jeunes conducteurs y trouvent aussi la liste des documents à préparer pour la première inscription.`,
      },
      {
        q: `Mon site peut-il gérer les annulations de leçons ?`,
        a: `Oui, avec un module de réservation sur mesure : l’élève annule ou déplace une heure depuis son espace dans le respect de votre règle, et le créneau libéré peut être proposé à d’autres élèves en attente. Les élèves qui se désistent libèrent ainsi un créneau utile, plutôt qu’une heure perdue pour votre moniteur.`,
      },
      {
        q: `Puis-je présenter chaque moniteur individuellement ?`,
        a: `Oui, avec photo, titre, style d’enseignement et créneaux habituels. Les élèves aiment savoir avec qui ils vont rouler. Une fiche par moniteur permet aussi de laisser l’élève choisir son enseignant lors de la réservation. Chaque fiche peut préciser les langues parlées et l’expérience avec les élèves anxieux.`,
      },
    ],
  },

  camping: {
    sections: [
      {
        titre: `Haute saison, arrivées échelonnées : le tempo d’un camping`,
        paragraphes: [
          `L’activité d’un camping se concentre sur quelques mois, avec un rythme qui s’accélère à l’approche de l’été. Les samedis d’arrivée et de départ sont des moments d’une intensité particulière : on accueille, on remet les clés, on contrôle les hébergements, on répond aux questions sur le wifi, la piscine, la laverie. Le classement par étoiles, délivré selon un référentiel officiel, reste un repère pour les vacanciers. Il faut aussi gérer la taxe de séjour, le règlement intérieur, les animaux et l’accueil des camping-cars. Chaque information évitée à l’accueil permet de mieux servir ceux qui se présentent.`,
          `Le site tient un rôle de pré-accueil. Les clients y trouvent les horaires d’arrivée, ce qu’ils peuvent apporter, les règles de la piscine, l’accès en cas d’arrivée tardive. Stackup fabrique sur mesure un moteur de réservation relié à vos emplacements et hébergements locatifs, avec acompte et confirmation. En hiver, le même outil sert à préparer la saison suivante. Mathéo Reboul, en Touraine, peut d’abord réaliser un accueil de démonstration, payant, afin que vous jugiez le rendu de vos paysages et de vos hébergements avant de vous engager.`,
        ],
      },
      {
        titre: `Choisir un camping depuis son canapé : ce que les vacanciers veulent savoir`,
        paragraphes: [
          `Les vacanciers cherchent « camping avec piscine », « camping familial », « location mobil-home », « camping au bord de l’eau », « camping calme sans animation ». Chaque profil a des attentes différentes : une famille veut des activités pour les enfants, un couple du calme, un cycliste un abri sûr pour son matériel. Une page par type d’hébergement (emplacement nu, caravane, tente équipée, mobil-home) avec photos, capacité, équipements et ambiance, permet de comparer sans appeler. Mentionnez aussi ce que le visiteur peut faire autour : randonnées, bords de rivière, marchés.`,
          `Les erreurs courantes sont des photos trop belles pour être vraies, un plan du site absent, et des conditions de réservation noyées dans un document PDF. Montrez les emplacements tels qu’ils sont, avec l’ombrage, la pente, la proximité des sanitaires. Précisez les conditions d’annulation, les jours d’arrivée imposés selon la période, la politique pour les chiens, l’accessibilité aux personnes à mobilité réduite. Un campeur déçu en arrivant laisse un avis qui reste. Un site honnête réduit l’écart entre l’attente et la réalité, et fidélise d’une année à l’autre.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment présenter la taxe de séjour et les frais annexes ?`,
        a: `Dans le récapitulatif de réservation, ligne par ligne, avec une page explicative. Le client voit exactement ce qu’il paie avant de valider. Cette transparence limite les discussions à l’arrivée et les litiges. Il peut s’ajouter à un lien vers la page officielle de votre commune, si vous souhaitez détailler le calcul.`,
      },
      {
        q: `Puis-je préciser les règles pour les animaux ?`,
        a: `Oui, sur une page claire : espèces acceptées, tenue en laisse, zones concernées, vaccinations demandées selon votre règlement. Les propriétaires d’animaux cherchent cette information en premier et réservent plus volontiers quand elle est limpide. Cette information, placée avant la réservation, limite les mauvaises surprises et les avis déçus en fin de séjour.`,
      },
      {
        q: `Mon site peut-il aider les arrivées tardives ?`,
        a: `Oui, avec une page pour les arrivées hors horaires : procédure, numéro de contact, emplacement réservé, consignes de calme. Nous ajoutons un champ d’heure d’arrivée prévue dans la réservation, que vous retrouvez dans votre planning. L’équipe d’accueil prépare alors la parcelle ou la clé, et les voyageurs fatigués sont accueillis plus vite.`,
      },
    ],
  },

  'ecole-danse-musique': {
    sections: [
      {
        titre: `Année scolaire, cours du mercredi, gala de juin : le calendrier d’une école artistique`,
        paragraphes: [
          `Une école de danse ou de musique vit au rythme de l’année scolaire. La rentrée de septembre concentre les inscriptions, la période de Noël prépare des auditions ou des spectacles, et le gala de fin d’année mobilise professeurs, parents, costumes et salle. Le mercredi et le samedi concentrent les cours des enfants, tandis que les adultes arrivent en soirée. Chaque élève suit un niveau, un instrument ou un style, parfois plusieurs cours par semaine. Les professeurs peuvent être salariés ou intervenants indépendants, ce qui complique les plannings.`,
          `Le site réduit la charge administrative de la rentrée : grille des cours par jour, niveaux, cours d’essai, conditions d’inscription, documents demandés, règlement intérieur. Stackup fabrique sur mesure un outil de gestion des inscriptions et des plannings, avec un espace où les familles retrouvent les horaires, les annonces et les documents. Les absences de professeurs sont signalées d’un clic. Une démonstration d’accueil, payante, élaborée par Mathéo Reboul en Touraine, vérifie que l’énergie de votre école transparaît bien avant de poursuivre le projet.`,
        ],
      },
      {
        titre: `Familles et adultes : deux publics à convaincre différemment`,
        paragraphes: [
          `Les parents cherchent « cours de danse enfant », « éveil musical », « cours de piano débutant », « école de musique près de chez moi ». Ils veulent connaître l’âge d’entrée, la durée des cours, le matériel nécessaire, le fonctionnement des évaluations, les spectacles. Les adultes, eux, demandent des horaires compatibles avec leur travail, un niveau qui ne les intimide pas, parfois un cours d’essai. Prévoyez des pages distinctes, avec des mots différents, et une présentation précise des professeurs, de leur parcours et de leur pédagogie.`,
          `Les sites du secteur négligent souvent le plus utile : une grille horaire lisible, la différence entre niveaux, le prix du trimestre ou de l’année, et la politique en cas d’absence. La galerie de spectacles est précieuse, mais les photos d’enfants posent la question du droit à l’image : prévoyez un accord écrit des parents et limitez la diffusion à ce qui est autorisé. Indiquez comment louer ou acheter un instrument, où se procurer les tenues, et comment se déroule le premier cours. Les familles aiment savoir à quoi s’attendre, surtout lorsqu’un enfant timide hésite encore devant son premier cours collectif.`,
        ],
      },
    ],
    faq: [
      {
        q: `Puis-je publier des photos d’enfants lors des spectacles ?`,
        a: `Uniquement avec l’autorisation écrite des représentants légaux. Nous prévoyons un formulaire de consentement à l’inscription et une galerie que vous pouvez modifier à tout moment si une famille retire son accord. Vous pouvez aussi conserver ces consentements dans un registre simple, utile si une famille demande un retrait.`,
      },
      {
        q: `Comment présenter un cours d’essai ?`,
        a: `Par un bouton visible sur la page de chaque discipline, qui ouvre un formulaire court : cours souhaité, âge, niveau, disponibilités. Vous recevez la demande, confirmez le créneau, et suivez combien d’essais mènent à une inscription. Les créneaux d’essai ne s’affichent que lorsqu’il reste de la place, pour éviter les refus en cascade.`,
      },
      {
        q: `Le site peut-il gérer le remplacement d’un professeur absent ?`,
        a: `Oui, avec un outil d’annonces sur mesure : vous indiquez l’absence, le cours concerné et la solution (annulation, remplaçant). Les familles concernées reçoivent le message, et l’information apparaît aussi sur le planning en ligne. Un historique des annonces reste consultable, afin que les familles qui l’ont manquée puissent retrouver l’information.`,
      },
    ],
  },

  tatoueur: {
    sections: [
      {
        titre: `Un atelier où chaque séance s’étale sur plusieurs heures`,
        paragraphes: [
          `Un tatoueur n’a pas un planning comme un coiffeur : une séance peut durer plusieurs heures, et un projet important en demande plusieurs. Chaque rendez-vous suppose un dessin préparé, un échange préalable, un poste désinfecté et du matériel à usage unique. L’activité est déclarée auprès des autorités sanitaires et exige une formation à l’hygiène et à la salubrité ; ces éléments rassurent les clients et se mentionnent sans détour. Entre les séances, vous répondez à des dizaines de messages demandant un devis ou une disponibilité, souvent avec une idée encore vague.`,
          `Le site peut structurer ces échanges : un formulaire de projet qui demande emplacement, taille approximative, style, références et photos, plutôt qu’un message flou sur les réseaux. Stackup fabrique sur mesure un petit outil de gestion pour suivre les demandes, les acomptes, les dessins en cours et les séances de retouche. Vous évitez de perdre un projet dans un fil de discussion. Avant de vous engager, Mathéo Reboul peut monter sur demande un accueil de démonstration facturé, pour juger de l’effet de votre travail une fois affiché sur un écran de téléphone comme d’ordinateur.`,
        ],
      },
      {
        titre: `Trouver le bon artiste : ce que regardent les clients`,
        paragraphes: [
          `Les clients cherchent un style plus qu’un salon : « tatouage fine line », « tatouage réaliste », « tatouage japonais », « cover-up », « tatouage floral ». Ils parcourent d’abord les images, puis cherchent l’adresse, la manière de prendre rendez-vous et les règles. Une galerie triée par style et par zone du corps leur évite de scroller sans fin. Chaque photo gagne à être accompagnée d’une information utile : emplacement, taille, nombre de séances, état de la peau une fois cicatrisée.`,
          `Parmi les erreurs fréquentes, on trouve des images sombres et recadrées, un site sans aucun mot sur le processus, et l’absence d’indications pour les mineurs ou les personnes qui hésitent. Précisez votre politique : un mineur ne peut se faire tatouer qu’avec l’accord de ses représentants légaux, et vous restez libre de refuser. Expliquez l’acompte, les retouches, les soins à suivre après la séance et les cas où vous déconseillez un projet. Une page qui détaille votre hygiène et le matériel utilisé rassure sans dramatiser, et attire des clients qui respectent votre travail.`,
        ],
      },
    ],
    faq: [
      {
        q: `Que dois-je afficher sur ma politique concernant les mineurs ?`,
        a: `Une phrase claire : l’autorisation des représentants légaux est obligatoire, avec leur présence ou un document signé, et vous gardez la liberté de refuser. Nous la plaçons dans la page de prise de rendez-vous et dans le formulaire. Le visiteur voit ainsi que vous appliquez la règle de manière constante, sans négociation à la porte du salon.`,
      },
      {
        q: `Comment gérer les demandes de recouvrement d’un ancien tatouage ?`,
        a: `Par un formulaire séparé qui demande des photos de l’existant et de la zone. Vous évaluez la faisabilité avant tout rendez-vous. Une page dédiée explique ce qu’un recouvrement permet ou non, afin de limiter les attentes irréalistes. Les références de style demandées vous donnent aussi une idée de la faisabilité sur la peau et l’emplacement choisis.`,
      },
      {
        q: `Puis-je recueillir un acompte en ligne ?`,
        a: `Oui, via un module de paiement sécurisé rattaché à la demande, avec vos conditions d’annulation affichées avant validation. L’acompte confirme le sérieux du projet et protège votre créneau, sans échanges de coordonnées bancaires par message. En cas de désistement, vos conditions précisent ce qui reste acquis, de façon que chacun sache à quoi s’en tenir.`,
      },
    ],
  },

  toiletteur: {
    sections: [
      {
        titre: `Bain, tonte, finitions : la journée d’un salon de toilettage`,
        paragraphes: [
          `Un salon de toilettage a un planning serré où chaque animal occupe un créneau qui dépend de sa race, de son poil et de son humeur. Un caniche demande plus de temps qu’un chien à poil ras, un chien noué doit être démêlé avec patience, et un animal craintif ralentit la séance. Les pics se concentrent avant les vacances, au printemps pour la mue, et à Noël pour les photos. Le métier repose sur un savoir-faire souvent appris par un diplôme ou un titre professionnel, et sur le respect de l’animal, qu’il faut savoir manipuler sans le brusquer.`,
          `Un site de toiletteur résout des problèmes concrets : indiquer les races acceptées, la durée habituelle, ce qu’il faut apporter, la conduite à tenir pour un chien qui n’a jamais été toiletté. Stackup fabrique sur mesure un module de réservation qui tient compte de la taille et du poil de l’animal pour proposer la bonne durée. Chaque client garde une fiche pour chaque compagnon. Pour voir l’univers de votre salon à l’écran avant de lancer le projet, Mathéo Reboul prépare pour vous un accueil de démonstration payant, que vous pouvez montrer à vos proches.`,
        ],
      },
      {
        titre: `Ce que les maîtres attendent avant de confier leur compagnon`,
        paragraphes: [
          `Les propriétaires cherchent « toiletteur chien près de chez moi », « toilettage chat », « toilettage chien à poil long », « toiletteur à domicile ». Ils confient un animal auquel ils tiennent, donc ils veulent voir où il sera, qui s’en occupe et comment cela se passe. Des photos du salon, de l’équipe et d’un déroulé complet — arrivée, bain, séchage, coupe, finitions, retour — apaisent beaucoup d’inquiétudes. Précisez ce que vous faites pour un animal stressé, et dans quels cas vous préférez refuser une prise en charge.`,
          `Les erreurs du secteur sont de ne montrer que des chiens parfaits, sans expliquer la prestation, et d’oublier les informations qui fâchent après coup : supplément pour poils emmêlés, délai de retard toléré, conditions d’annulation, vaccins demandés. Mettez ces informations en avant plutôt que de les laisser découvrir au comptoir. Ajoutez des conseils d’entretien entre deux séances (brossage, ongles, oreilles), qui montrent votre compétence. Une page spéciale pour les chats, plus rares dans les salons, ou pour les races exigeantes, attire une clientèle qui cherche exactement ce savoir-faire.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment expliquer le supplément pour un poil très emmêlé ?`,
        a: `Par une phrase claire dans la page des prestations : l’état du poil peut allonger la séance et modifier le tarif, et vous en informez le propriétaire avant de commencer. Cette transparence évite les désaccords à la remise de l’animal. Ce paragraphe reste affiché près du tarif d’appel, ce qui évite de longues discussions au moment de récupérer l’animal.`,
      },
      {
        q: `Puis-je demander les vaccins à jour avant la séance ?`,
        a: `Oui, si c’est votre règle de salon. Nous l’indiquons dans la réservation, avec un champ pour renseigner l’état des vaccins. Vous pouvez ainsi refuser ou reporter un rendez-vous en amont plutôt que le jour même. Le justificatif peut être photographié et joint à la réservation, évitant d’y repenser le jour de la séance.`,
      },
      {
        q: `Mon site peut-il prévenir le client que son animal est prêt ?`,
        a: `Oui, avec un message envoyé en un clic depuis votre outil de gestion, qui indique que l’animal est prêt à être récupéré. Les propriétaires arrivent au bon moment, et votre salon évite l’attente prolongée d’animaux dans les cages. Les propriétaires en profitent pour organiser leur retour, et vous libérez plus vite l’espace de séchage.`,
      },
    ],
  },
}
