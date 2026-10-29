import type { ContenuLocal } from './types'

export const FAQ_METIERS: Record<string, ContenuLocal['faq']> = {
  'notaire': [
    {
      q: `Comment l’office d’un notaire apparaît-il sur Google Maps ?`,
      a: `Créez ou revendiquez la fiche de l’office sur Google Business Profile, avec la catégorie « Notaire », l’adresse exacte, les horaires d’accueil et le numéro du standard. Ajoutez une photo de la façade et de l’entrée : un jour de signature, les clients cherchent la porte et une place de stationnement. Google peut demander une validation par courrier ou par appel. Les avis sont publics ; pour une profession réglementée, relisez les règles de communication de votre instance avant d’en solliciter, et ne répondez jamais en évoquant un dossier.`,
    },
    {
      q: `Quelle adresse e-mail choisir pour l’étude, avec un nom de domaine à nous ?`,
      a: `Prenez un nom de domaine proche de celui de l’office, puis des boîtes nominatives pour chaque notaire et clerc, plus une adresse d’accueil que plusieurs personnes surveillent. Conservez l’ancienne adresse en redirection, pour ne perdre aucun correspondant. Le courriel sert à fixer un rendez-vous, pas à faire circuler des actes ou des pièces d’identité. Le réseau professionnel du notariat propose aussi ses propres outils et adresses : demandez à votre instance ce qui est recommandé avant de changer quoi que ce soit.`,
    },
    {
      q: `Peut-on publier une estimation des frais d’un acte sur le site ?`,
      a: `Oui, à condition qu’elle reste indicative, datée et clairement distincte du décompte établi par l’office, car le tarif des actes est encadré. Le site peut demander la nature de l’opération, le type de bien et la situation des parties, afin que l’estimation précise soit préparée plus vite à la réception de la demande. La facturation proprement dite reste dans le logiciel de l’étude : le site prépare l’échange, il ne remplace pas votre comptabilité.`,
    },
    {
      q: `Quels rappels automatiques envoyer avant un rendez-vous de signature ?`,
      a: `Un message deux ou trois jours avant, rappelant l’heure, l’adresse, la personne qui reçoit et la liste des pièces à apporter. Une relance ciblée peut aussi partir quand un justificatif manque encore. N’y mettez aucune information sensible : pas de montant, pas de détail sur le dossier, seulement un lien vers l’espace sécurisé. Résultat attendu : moins de signatures décalées parce qu’un acquéreur a oublié sa pièce d’identité ou son relevé.`,
    },
    {
      q: `Quelles photos montrer sur le site d’un office notarial ?`,
      a: `L’équipe en situation sobre, la façade, l’accueil, la salle de signature : le client veut se représenter l’endroit et reconnaître ceux qui le recevront. Évitez les piles de dossiers visibles, les écrans lisibles et toute personne extérieure à l’office. Obtenez l’accord écrit de chaque collaborateur photographié. Côté réseaux, un profil professionnel sobre convient mieux qu’un compte très actif : l’essentiel est que le site soit à jour et que l’adresse affichée corresponde à la fiche Google.`,
    },
    {
      q: `Pourquoi mon office n’apparaît-il pas quand on cherche un notaire ?`,
      a: `Commencez par vérifier ce que vous attendez : le mot « notaire » seul est très disputé, alors qu’une recherche par commune ou par sujet (succession, vente d’une maison, donation) vous laisse plus de place. Une page par sujet et par secteur desservi aide Google à comprendre vos spécialités. Contrôlez aussi la fiche Google, la cohérence de l’adresse partout où elle figure, puis la Search Console pour voir si les pages sont bien indexées. Les annuaires officiels de la profession passent souvent devant : c’est normal.`,
    },
    {
      q: `Quelles mentions légales et quelles règles de données pour le site d’un office ?`,
      a: `Les mentions habituelles : identité de l’éditeur, adresse, forme de l’office, directeur de la publication, hébergeur, ainsi que les éléments propres à la profession, comme le titre, l’instance de rattachement, l’assurance et le médiateur. Le formulaire de contact impose une information claire sur l’usage des données, et les cookies un consentement quand ils ne sont pas strictement nécessaires. Le secret professionnel pèse aussi sur ce que vous publiez. Vérifiez chaque point sur service-public.fr, cnil.fr et auprès de votre instance.`,
    },
  ],

  'architecte': [
    {
      q: `Comment une agence d’architecture se fait-elle trouver sur Google Maps ?`,
      a: `Renseignez la fiche Google avec la catégorie d’architecte qui correspond à votre activité, l’adresse de l’agence et la zone où vous acceptez de travailler. Ajoutez des photos de réalisations légendées (rénovation, extension, maison neuve) plutôt qu’un logo seul. Demandez un avis aux maîtres d’ouvrage après la réception des travaux, quand ils ont vécu la différence. Répondez avec mesure, sans détailler de chantier. Si vous recevez à domicile, vous pouvez masquer l’adresse et ne garder que la zone d’intervention.`,
    },
    {
      q: `Faut-il un nom de domaine à mon nom ou à celui de l’agence ?`,
      a: `Si l’agence a plusieurs associés ou vise à être transmise, choisissez le nom de l’agence ; sinon votre nom propre est lisible et facile à retenir. Réservez les deux et faites pointer l’un vers l’autre. Chaque personne de l’équipe gagne une adresse nominative. Pour les plans lourds, évitez les pièces jointes : un lien de dépôt sécurisé est plus fiable. Une adresse gratuite grand public donne mauvaise impression quand un notaire, une mairie ou un promoteur vous écrit.`,
    },
    {
      q: `Comment établir plus vite une proposition d’honoraires pour un nouveau projet ?`,
      a: `Un formulaire de premier contact recueille la nature du projet, le terrain, la surface approximative, le budget de travaux envisagé et le calendrier. Vous répondez ensuite avec une trame de proposition par phase (esquisse, avant-projet, permis, consultation, suivi), où vous n’ajustez que ce qui change. Un contrat écrit entre l’architecte et le client reste la règle ; vérifiez le contenu attendu auprès de l’Ordre. Pour la facturation, votre logiciel habituel suffit : le site alimente simplement la demande.`,
    },
    {
      q: `Que peut-on automatiser dans le suivi d’un projet d’architecture ?`,
      a: `Trois choses sont utiles : un rappel au client quand une décision conditionne la suite (choix de matériaux, validation d’esquisse), une relance aux entreprises dont il manque un devis ou une attestation, et l’envoi du compte rendu après chaque réunion de chantier. Tout reste archivé dans l’espace du projet. En revanche, ne déléguez pas à un automate les échanges de conception : ils demandent votre voix. Un rappel bien placé évite surtout qu’un chantier attende une signature oubliée.`,
    },
    {
      q: `Quelles images et quels documents publier pour un projet terminé ?`,
      a: `Faites réaliser des photos par un photographe, par lumière du jour, et montrez le même lieu avant et après quand c’est possible. Ajoutez un plan simplifié et une courte légende sur la contrainte du terrain. Demandez l’accord du propriétaire avant publication et floutez plaques, numéros et vues sur les voisins. Vous restez titulaire de vos droits d’auteur sur l’œuvre, mais pas forcément sur l’image du bâtiment privé. Instagram ou Pinterest prolongent bien un portfolio visuel, à condition de renvoyer vers le site.`,
    },
    {
      q: `Comment obtenir des demandes de maisons ou d’extensions avec mon site d’architecte ?`,
      a: `Créez une page par type de projet (extension, rénovation, maison neuve, surélévation) et indiquez les communes où vous intervenez. Expliquez les étapes administratives locales, par exemple la lecture du plan local d’urbanisme ou la différence entre déclaration préalable et permis. Les futurs maîtres d’ouvrage cherchent d’abord à comprendre ce qui est possible sur leur terrain. Un formulaire qui demande l’adresse de la parcelle filtre les demandes hors secteur. Comptez plusieurs mois avant que Google valorise ces pages.`,
    },
    {
      q: `Quelles mentions obligatoires figurent sur le site d’un architecte ?`,
      a: `Outre les mentions légales habituelles, indiquez votre inscription à l’Ordre des architectes avec le conseil régional de rattachement, votre assurance de responsabilité professionnelle et la forme de la structure. Le titre d’architecte est protégé : ne le laissez pas apparaître pour une personne qui ne le détient pas. Les formulaires demandent une information claire sur les données collectées. Contrôlez le détail sur le site de l’Ordre, sur service-public.fr et sur cnil.fr, car les exigences évoluent.`,
    },
  ],

  'courtier-credit': [
    {
      q: `Comment un courtier en prêt immobilier ressort-il dans la carte Google ?`,
      a: `Choisissez la catégorie la plus proche de votre activité, comme courtier en prêts, et renseignez vos horaires de rendez-vous, en agence ou en visioconférence. Si vous recevez chez vous, masquez l’adresse et indiquez la zone desservie. Ajoutez une photo de vous et de l’accueil : un emprunteur confie ses relevés de compte à quelqu’un dont il voit le visage. Les avis gagnent à être demandés après la signature de l’offre de prêt, sans jamais promettre un taux ni citer un dossier.`,
    },
    {
      q: `Pourquoi un courtier doit-il avoir une adresse e-mail à son nom de domaine ?`,
      a: `Parce que vous recevez des bulletins de salaire, des avis d’imposition et des relevés bancaires. Une adresse gratuite grand public inquiète, et certaines banques filtrent plus facilement les messages qui en viennent. Avec votre propre domaine, vous créez une signature complète (statut, immatriculation, téléphone) et une adresse générale pour les dossiers. Pour les pièces, préférez un espace de dépôt à l’envoi libre par courriel : vous évitez les pièces perdues dans une boîte surchargée.`,
    },
    {
      q: `Comment présenter ma mission et ma rémunération avant d’ouvrir un dossier ?`,
      a: `Une page claire explique ce que vous faites, à quel moment vous êtes rémunéré et par qui, avant toute démarche. Vous pouvez ensuite proposer une trame de lettre de mission que le site pré-remplit avec le projet de l’emprunteur, ce qui accélère l’ouverture du dossier. Les règles exactes sur le contenu et la forme de ces documents relèvent de l’autorité de contrôle : vérifiez-les sur les sites officiels. Aucun montant n’a sa place dans un texte qui n’est pas à jour.`,
    },
    {
      q: `Quelles relances automatiques utiliser pour un dossier de prêt ?`,
      a: `Les plus utiles concernent les pièces : un message qui rappelle ce qu’il manque, avec un lien vers l’espace de dépôt. Un rappel avant un rendez-vous en visio réduit les oublis. Les échéances propres à l’achat (validité d’une offre, condition suspensive du compromis) méritent une alerte interne pour vous, pas pour le client. Évitez les relances insistantes sur la décision : un emprunteur qui compare plusieurs offres a besoin de temps, et un message trop appuyé le décourage.`,
    },
    {
      q: `Quelles images et quels avis mettre en avant sur un site de courtage ?`,
      a: `Un portrait soigné de vous, une photo de votre lieu de rendez-vous, et un schéma simple des étapes du dossier. Évitez les photos de maisons et de clés remises : elles ne prouvent rien. Ne mettez pas de logos de banques sans leur accord, car ce sont des marques. Les avis Google authentiques, présentés tels quels, valent mieux qu’une phrase de satisfaction recopiée. Chaque avis publié doit venir d’un client réel qui a accepté qu’on le cite.`,
    },
    {
      q: `Mon site de courtier ne reçoit aucune demande, par où commencer ?`,
      a: `Regardez d’abord si les pages existent pour chaque projet : primo-accédant, renégociation, investissement locatif, rachat de crédit, chacune associée à votre secteur. Une page unique intitulée « courtier » ne répond à aucune question précise. Vérifiez ensuite la fiche Google et la vitesse d’affichage sur mobile, puis la Search Console. Les partenariats locaux comptent beaucoup : agences immobilières, notaires, constructeurs. Ils vous envoient des demandes plus qualifiées que n’importe quelle publicité de passage.`,
    },
    {
      q: `Que faire des données financières collectées par le formulaire d’un site de courtage ?`,
      a: `Ne demandez que le strict nécessaire dès le premier contact : un projet et un moyen de vous joindre. Indiquez à quoi servent les informations, combien de temps vous les gardez et comment les faire effacer. Les cookies publicitaires exigent un consentement préalable. Les données de revenus et de patrimoine sont particulièrement sensibles : limitez les accès et chiffrez les échanges. Les règles précises se lisent sur cnil.fr, et un doute se règle avant la mise en ligne.`,
    },
  ],

  'diagnostiqueur-immobilier': [
    {
      q: `Comment un diagnostiqueur apparaît-il en tête pour « diagnostic immobilier » dans sa ville ?`,
      a: `Votre fiche Google doit porter la catégorie de diagnostiqueur immobilier, la zone de communes où vous vous déplacez et des horaires qui couvrent vos tournées. Pas de local ouvert au public ? Masquez l’adresse et gardez la zone. Ajoutez une photo de votre véhicule et de votre matériel, qui rassure sur le sérieux. Les avis des agences et des vendeurs comptent beaucoup, car ils comparent plusieurs offres le même jour. Demandez-les après l’envoi du rapport, quand la demande est satisfaite.`,
    },
    {
      q: `Quelle adresse e-mail professionnelle pour envoyer mes rapports aux agences et notaires ?`,
      a: `Une adresse à votre nom de domaine, avec une boîte distincte pour les commandes et une autre pour l’envoi des rapports. Les agences et notaires reçoivent beaucoup de messages : un expéditeur identifiable passe mieux que celui d’un service gratuit. Les rapports volumineux sont mieux transmis par lien de téléchargement que par pièce jointe. Faites aussi configurer les protections d’expéditeur du domaine, pour que vos envois n’aillent pas en courrier indésirable le jour où une vente en dépend.`,
    },
    {
      q: `Comment chiffrer vite un lot de diagnostics sans voir le logement ?`,
      a: `Un formulaire demande le type de bien, la surface approximative, l’année de construction, l’adresse et les diagnostics souhaités. Avec une grille par catégorie de bien et des formules de regroupement, vous renvoyez un devis cohérent en quelques minutes. Précisez qui règle, car le vendeur paie souvent via l’agence : la facture doit porter le bon destinataire. Notez les cas où un déplacement préalable est nécessaire. Aucun chiffre n’est inscrit ici : il vient de votre grille, que vous maîtrisez.`,
    },
    {
      q: `Quels messages automatiques envoyer avant et après la visite d’un bien ?`,
      a: `Avant la visite : une confirmation avec l’adresse, l’heure et ce qu’il faut prévoir, comme l’accès aux compteurs, aux combles ou à la cave et la présence d’une personne avec les clés. La veille, un rappel court. Après la visite : un message qui annonce la date d’envoi du rapport, puis l’envoi lui-même, puis une demande d’avis. Une relance de règlement peut partir vers les agences quand une facture reste ouverte, avec un ton neutre et une référence claire.`,
    },
    {
      q: `Quelles photos montrer sur le site d’un diagnostiqueur sans exposer les clients ?`,
      a: `Montrez votre matériel de mesure, votre tenue, votre véhicule, un exemple de rapport rendu anonyme et vos certificats. Évitez les photos d’intérieurs de clients, même avec l’adresse masquée : un voisin reconnaît vite la façade. Si vous publiez une photo d’un site pour illustrer une méthode, demandez l’accord du propriétaire. Un court film de présentation de votre déroulé de visite rassure les particuliers qui ne savent pas à quoi s’attendre.`,
    },
    {
      q: `Pourquoi mon site ne ressort-il pas pour « DPE » près de chez moi ?`,
      a: `Parce que les plateformes nationales et les gros cabinets occupent les premières places pour les requêtes générales. Votre atout est local : une page par diagnostic et par commune desservie, avec des explications utiles (quand le DPE est demandé, ce qu’il faut préparer). Mettez ces pages à jour quand la réglementation change. Soignez la fiche Google et vérifiez dans la Search Console que chaque page est indexée. Les résultats prennent du temps, mais ils s’additionnent d’un mois à l’autre.`,
    },
    {
      q: `Quelles règles de vente et de données personnelles pour un site de diagnostics ?`,
      a: `Le site doit porter les mentions légales de l’entreprise, des conditions de vente lisibles et une information sur l’usage des données. L’adresse d’un bien et le nom d’un propriétaire sont des données personnelles : limitez leur conservation et leur accès. Pour la rétractation ou l’annulation d’une prestation commandée en ligne, les règles dépendent du client et du cas ; consultez economie.gouv.fr et cnil.fr avant de rédiger vos conditions, et faites relire le texte final.`,
    },
  ],

  'agence-evenementielle': [
    {
      q: `Comment une wedding planner ou une agence apparaît-elle dans la carte Google ?`,
      a: `Choisissez la catégorie d’organisateur d’événements ou, si elle existe pour vous, celle de wedding planner, et indiquez les communes ou départements où vous intervenez. Postez des photos de décors et de tables dressées plutôt que d’invités. Si vous travaillez depuis chez vous, gardez l’adresse cachée. Les avis des mariés et des entreprises arrivent après l’événement : prévoyez le message de demande quelques jours plus tard, quand la fatigue est passée. Les publications de la fiche peuvent annoncer des salons ou des portes ouvertes.`,
    },
    {
      q: `Quelles adresses e-mail créer pour une agence événementielle avec son domaine ?`,
      a: `Une adresse générale, plus une adresse par univers si vous le souhaitez : mariage, entreprise, réception privée. Chaque demande arrive alors déjà triée. Les services achats d’entreprise se méfient des adresses gratuites, surtout pour un bon de commande. Votre signature indique votre statut, votre téléphone et le lien vers le portfolio. Prévoyez une réponse automatique les jours de forte activité, avec le délai habituel de retour, pour que personne ne croie sa demande perdue.`,
    },
    {
      q: `Comment faire un devis événementiel plus vite quand il mobilise plusieurs prestataires ?`,
      a: `Montez une trame par poste : lieu, restauration, sonorisation, décoration, régie, honoraires d’agence. Chaque ligne reprend le devis du prestataire, avec une marge de coordination clairement séparée. Proposez des options plutôt qu’une seule version : le client choisit et vous évitez les allers-retours. Le devis précise l’acompte, le calendrier des échéances et les conditions d’annulation. Les frais engagés pour le compte du client restent identifiables sur la facture finale.`,
    },
    {
      q: `Quelles tâches automatiser dans l’organisation d’un événement ?`,
      a: `Les relances d’un devis non signé, les rappels aux prestataires à l’approche de la date (plan d’accès, horaires de montage, besoins électriques) et les demandes d’acompte ou de solde. Une liste de contrôle du jour J envoyée à l’équipe la veille évite les oublis. Après l’événement, un questionnaire de satisfaction part tout seul. En revanche, les échanges de création et la négociation avec le client restent entre vos mains : l’automatisation ne remplace pas votre présence.`,
    },
    {
      q: `Comment montrer mes événements sans exposer les invités ni les clients ?`,
      a: `Privilégiez les décors, les tables, les mains qui déposent un bouquet, les lumières du soir. Pour toute photo avec visages, demandez l’accord écrit des personnes, ainsi que celui du lieu et des prestataires visibles. Créditez le photographe, dont le droit d’auteur s’applique. Instagram et Pinterest sont les vitrines naturelles du métier ; le site rassemble ensuite les projets, avec une légende sur le format, la contrainte du lieu et votre rôle exact.`,
    },
    {
      q: `Mon site d’événementiel n’apparaît pas sur Google, que faire pour attirer des clients ?`,
      a: `Créez une page par type d’événement et, quand c’est possible, par lieu partenaire : un domaine, une salle, un château. Les liens depuis ces lieux ou depuis des blogs de mariage vous aident. Les mariages se cherchent longtemps à l’avance : publiez vos pages avant la saison. Vérifiez la fiche Google, la vitesse sur mobile et l’indexation dans la Search Console. Un portfolio sans texte explicatif n’apporte rien à Google, qui lit des mots autant que des images.`,
    },
    {
      q: `Quelles obligations légales respecter sur le site d’une agence événementielle ?`,
      a: `Les mentions légales classiques, des conditions de vente qui précisent acompte, annulation et report, et une information sur les données collectées par le formulaire de brief, car les listes d’invités sont des données personnelles. La diffusion de musique, les droits à l’image et les règles de sécurité des lieux ont chacun leurs organismes : renseignez-vous auprès d’eux. Si vous proposez aussi des séjours ou des hébergements, d’autres règles peuvent s’appliquer ; vérifiez-les sur service-public.fr et economie.gouv.fr.`,
    },
  ],

  'organisme-formation': [
    {
      q: `Comment un centre de formation apparaît-il dans Google Maps ?`,
      a: `Renseignez une fiche avec la catégorie de centre de formation, l’adresse de vos salles et les horaires d’accueil. Si vous formez surtout chez les clients ou à distance, indiquez la zone desservie plutôt qu’un local. Ajoutez des photos des salles, du matériel pédagogique et de l’accès pour les personnes handicapées. Les avis de stagiaires ont du poids, mais ils ne remplacent pas les enquêtes de satisfaction de votre démarche qualité : les deux circuits restent séparés et les résultats ne se mélangent pas.`,
    },
    {
      q: `Comment éviter que mes convocations de stage partent dans les courriers indésirables ?`,
      a: `Envoyez-les depuis une adresse à votre propre nom de domaine, après avoir fait configurer les protections d’expéditeur de ce domaine (SPF, DKIM), que votre prestataire sait paramétrer. Utilisez des objets explicites et un texte court, avec les dates et le lieu. Séparez les boîtes : une pour les inscriptions, une pour les questions de handicap, une pour l’administratif. Un stagiaire qui ne reçoit pas sa convocation n’avertit personne, il vient simplement trop tard ou pas du tout.`,
    },
    {
      q: `Comment produire plus vite devis, convention et programme pour une entreprise ?`,
      a: `En partant de la fiche de la formation : intitulé, objectifs, durée, effectif, lieu, financeur. Un outil génère alors les documents à partir de ces champs, sans ressaisie. Vous modifiez seulement ce qui change d’un client à l’autre, comme les dates ou le nombre de participants. La facture est émise au bon destinataire, entreprise ou financeur, avec votre numéro de déclaration d’activité. Les mentions exactes des documents sont à vérifier sur les sites officiels du ministère du Travail.`,
    },
    {
      q: `Quelles tâches répétitives d’un organisme de formation peut-on automatiser ?`,
      a: `L’envoi des convocations et des programmes, le rappel de documents manquants avant le début, l’envoi du questionnaire d’évaluation à chaud en fin de session et la génération de l’attestation. La relance des financeurs ou des entreprises pour les factures en attente est aussi un bon candidat. Gardez la main sur les échanges avec un stagiaire en difficulté, sur les adaptations liées à un handicap et sur toute décision pédagogique : ces situations demandent une personne.`,
    },
    {
      q: `Quelles photos et quels témoignages afficher sur un site de formation ?`,
      a: `Montrez les salles, le matériel réellement utilisé, les formateurs au travail et, avec leur accord, quelques stagiaires en atelier. L’accord écrit est indispensable pour toute personne reconnaissable. Une courte vidéo où un formateur présente son programme aide beaucoup. LinkedIn est le réseau naturel pour les formations destinées aux entreprises. Ne citez que des retours réels de stagiaires, avec leur consentement, et ne présentez jamais un indicateur de résultat qui ne correspond pas à vos données publiées.`,
    },
    {
      q: `Mes formations n’apparaissent pas sur Google, comment attirer plus de stagiaires ?`,
      a: `Prévoyez une page par formation, intitulée comme les gens la tapent (« formation sauveteur secouriste du travail » plutôt qu’un sigle interne), avec la ville où elle se déroule. Gardez les dates de sessions à jour : une page périmée fait fuir. Les plateformes officielles de financement sont un canal à part et ne remplacent pas votre site. Les entreprises du secteur cherchent un interlocuteur : un formulaire de demande de devis visible sur chaque fiche leur évite de chercher.`,
    },
    {
      q: `Quelles mentions légales et quelles données personnelles pour un site de formation ?`,
      a: `Le site affiche les mentions classiques, le numéro de déclaration d’activité, vos conditions générales de vente et, pour les cursus concernés, le règlement intérieur et la procédure de réclamation. Les données des stagiaires, parfois liées à un handicap, sont sensibles : collectez le minimum et limitez les accès. Précisez la durée de conservation de chaque dossier. Les modalités exactes se vérifient sur le site du ministère du Travail et sur cnil.fr, car elles dépendent du type de formation.`,
    },
  ],

  'auto-ecole': [
    {
      q: `Comment une auto-école apparaît-elle sur Google Maps quand un jeune cherche le permis ?`,
      a: `Créez la fiche avec la catégorie d’auto-école, l’adresse du bureau, les horaires d’ouverture (qui diffèrent de ceux des moniteurs) et le téléphone. Ajoutez des photos du bureau, des véhicules et de l’équipe : les familles aiment voir à quoi ressemble l’endroit avant de pousser la porte. Demandez des avis après l’obtention du permis, quand la satisfaction est à son sommet. Répondez aussi aux critiques, calmement et sans détailler le dossier de l’élève.`,
    },
    {
      q: `Quelle adresse e-mail pour les inscriptions, y compris pour les élèves mineurs ?`,
      a: `Une adresse générique du type inscription@ à votre nom de domaine, que le secrétariat et le gérant consultent tous deux : vous évitez qu’un message reste dans une boîte personnelle. Pour un élève mineur, les échanges portent sur les parents ou le représentant légal ; indiquez-le dans le formulaire. Gardez des adresses distinctes pour les moniteurs, afin de leur transmettre le planning sans exposer les coordonnées des élèves. Le nom de domaine doit rester renouvelé, car il figure sur vos contrats et vos affiches.`,
    },
    {
      q: `Comment préparer plus vite un forfait et un contrat de formation à l’inscription ?`,
      a: `Le contrat de formation suit un cadre écrit que le ministère de l’Intérieur et la Sécurité routière décrivent sur leurs sites ; vérifiez-y les mentions exigées. Le site peut recueillir l’identité, la formule choisie et les pièces demandées, puis pré-remplir le contrat pour que l’élève n’ait plus qu’à relire et signer en agence. Vous proposez des formules lisibles (code seul, forfait, heures supplémentaires), avec une option de paiement échelonné. Les montants viennent de votre grille.`,
    },
    {
      q: `Quels rappels automatiques réduisent les heures de conduite perdues ?`,
      a: `Un message la veille de la leçon, avec l’heure, le moniteur et le lieu de rendez-vous, divise les oublis. Une alerte prévient l’élève quand il reste peu d’heures à son forfait, pour qu’il anticipe. À l’approche de l’examen, un rappel liste les documents à apporter. Les relances de paiement échelonné peuvent partir seules, sur un ton neutre. Les changements de dernière minute, eux, méritent un appel : un élève stressé a besoin d’une voix.`,
    },
    {
      q: `Quelles photos et quels réseaux sociaux conviennent à une auto-école ?`,
      a: `Montrez l’équipe, les véhicules (boîte manuelle, automatique, deux-roues si vous les proposez), la salle de code et l’accueil. La photo classique de l’élève avec ses clés ne se publie qu’avec son accord, ou celui de ses parents s’il est mineur. Les jeunes se trouvent surtout sur Instagram et TikTok ; un court conseil pratique par semaine fonctionne mieux qu’une publicité. Les avis Google servent de preuve sociale : affichez-les tels quels, sans les retoucher.`,
    },
    {
      q: `Pourquoi mon auto-école n’est pas trouvée quand on cherche un permis dans ma commune ?`,
      a: `Il faut sans doute une page par formule (permis B, conduite accompagnée, boîte automatique, moto) et une page pour chaque commune desservie, avec les horaires et le point de rendez-vous. Les auto-écoles en ligne occupent les recherches générales ; votre force est la proximité. Vérifiez la fiche Google et l’indexation dans la Search Console. Mettez à jour vos offres de rentrée et de vacances scolaires, qui sont des moments de recherche intense pour les familles.`,
    },
    {
      q: `Quelles mentions et quelle protection des données pour un site d’auto-école ?`,
      a: `Le site porte les mentions légales classiques, votre numéro d’agrément, vos conditions de vente et l’information sur les données collectées. Les élèves sont souvent mineurs : prévoyez le consentement du représentant légal pour le formulaire et limitez les données au nécessaire. Ne publiez pas de listes d’élèves ni de résultats nominatifs. Pour les obligations propres à la profession, y compris l’affichage de certaines informations, consultez la Sécurité routière et cnil.fr plutôt que de vous fier à un modèle de site.`,
    },
  ],

  'camping': [
    {
      q: `Comment un camping se fait-il voir sur Google Maps avant l’été ?`,
      a: `Choisissez la catégorie de camping et complétez les attributs : piscine, wifi, animaux acceptés, accès pour personnes à mobilité réduite, location d’hébergements. Prévoyez les horaires saisonniers et les dates d’ouverture, pour que la fiche n’indique pas un camping fermé en pleine saison. Ajoutez des photos prises à chaque période de l’année, y compris sous la pluie : elles montrent un lieu réel. Répondez aux avis tout l’été, car les voyageurs lisent surtout les plus récents.`,
    },
    {
      q: `Quelles adresses e-mail utiliser pour les réservations d’un camping ?`,
      a: `Une adresse de réservation à votre nom de domaine, qui envoie les confirmations et reçoit les questions, plus une adresse distincte pour la direction. En saison, surveillez la boîte chaque jour ; hors saison, une réponse automatique indique la date de réouverture de l’accueil. Les confirmations automatiques doivent arriver dans la boîte principale du client, pas dans le courrier indésirable : faites configurer correctement le domaine avant la première vague de réservations.`,
    },
    {
      q: `Comment établir plus vite un devis de séjour pour une famille ou un groupe ?`,
      a: `Avec une grille saisonnière et une liste d’options que le site additionne seul : emplacement ou hébergement, nombre de personnes, véhicule supplémentaire, électricité, animal, taxe de séjour. Le client voit le détail avant de valider, vous recevez la demande déjà calculée. Prévoyez l’acompte, la date du solde et les conditions d’annulation dans le même document. Pour les groupes, un formulaire à part précise les dates, l’effectif et les besoins particuliers. Les montants sont ceux de votre grille.`,
    },
    {
      q: `Quels messages automatiques envoyer entre la réservation et le départ des vacanciers ?`,
      a: `Une confirmation immédiate, puis un rappel de solde avant l’arrivée, puis un message quelques jours avant avec l’horaire d’accueil, le plan d’accès et ce qu’il faut apporter. Après le séjour, un courriel remercie et propose de laisser un avis. L’année suivante, un message annonce l’ouverture des réservations aux anciens clients. En cas de panier laissé en cours, une relance simple peut suffire. Chaque envoi reste court et signé de l’accueil du camping.`,
    },
    {
      q: `Quelles photos et quelles vidéos montrer pour donner envie de réserver un camping ?`,
      a: `Des emplacements réels avec leur ombrage, leur pente et leur distance aux sanitaires, les hébergements vus de l’intérieur, la piscine à un moment ordinaire de la journée et le paysage autour. Une courte vidéo de visite à pied rassure plus qu’un diaporama. Évitez les photos de vacanciers reconnaissables sans leur accord, surtout les enfants. Facebook et Instagram servent à montrer la vie du camping au fil de la saison, et le site conserve les informations pratiques.`,
    },
    {
      q: `Comment mieux remplir mon camping en basse saison grâce à mon site ?`,
      a: `Créez des pages pour les séjours qui plaisent hors été : week-end au bord de l’eau, randonnée, cyclotourisme, événements locaux de printemps ou d’automne. Indiquez clairement les dates d’ouverture et les équipements disponibles à ces périodes. Les plateformes de réservation prélèvent une commission, ce qui rend la réservation directe intéressante, mais elles apportent aussi de la visibilité : à vous de peser les deux selon votre situation. Gardez le calendrier de votre site à jour en permanence.`,
    },
    {
      q: `Quels classements, médiations et règles afficher légitimement sur le site d’un camping ?`,
      a: `N’affichez un classement en étoiles que si votre établissement le détient réellement et indiquez-le exactement comme l’attribution officielle. Un professionnel qui vend à des consommateurs doit aussi faire apparaître les coordonnées d’un médiateur de la consommation. Ajoutez le règlement intérieur, vos conditions de vente et l’information sur les données collectées lors de la réservation. Les détails sont à vérifier sur economie.gouv.fr, service-public.fr et cnil.fr, car ils peuvent changer.`,
    },
  ],

  'ecole-danse-musique': [
    {
      q: `Comment une école de musique ou de danse ressort-elle sur Google Maps à la rentrée ?`,
      a: `Renseignez la catégorie d’école de musique ou de danse (une seule principale, d’autres en complément si vous enseignez plusieurs arts), avec l’adresse de la salle et les horaires d’ouverture du secrétariat. Ajoutez des photos des salles, des instruments et du studio vides ou en cours, en évitant les élèves reconnaissables. À l’approche de septembre, publiez une annonce de portes ouvertes sur la fiche. Les avis de parents arrivent mieux au printemps, après le gala.`,
    },
    {
      q: `Quelles adresses e-mail créer pour une école de danse avec son nom de domaine ?`,
      a: `Une adresse de secrétariat que l’on retrouve sur les affiches et dans les plaquettes, plus une adresse par grande discipline si votre équipe est nombreuse. Les professeurs ne devraient pas utiliser leur boîte personnelle pour écrire aux familles : lorsqu’ils partent, les échanges disparaissent avec eux. Une liste de diffusion permet d’annoncer le gala ou la fermeture d’un cours sans exposer les adresses des parents. Renouvelez le domaine à temps : l’adresse imprimée sur vos supports doit toujours fonctionner.`,
    },
    {
      q: `Comment établir plus vite les tarifs et les factures pour chaque famille ?`,
      a: `Une grille lisible par discipline, durée de cours et formule (collectif, individuel, forfait familial) permet au site de calculer le total d’une inscription à plusieurs cours. Proposez un paiement échelonné et une attestation de règlement pour les familles qui la réclament. La facture reprend le nom du payeur, qui n’est pas toujours l’élève. Les remises éventuelles se paramètrent une fois pour toutes. Les montants sont ceux que vous fixez, et ils apparaissent sur le site automatiquement.`,
    },
    {
      q: `Quels rappels envoyer aux familles au fil de l’année artistique ?`,
      a: `Un rappel de paiement avant chaque échéance, un message avant les répétitions du gala avec horaires et tenue demandée, et une invitation à se réinscrire au printemps, quand les places se répartissent pour la rentrée suivante. Une liste d’attente par cours remplit les places libérées. Un rappel de la veille pour un cours d’essai améliore la présence. Évitez les messages trop fréquents : des familles qui reçoivent tout, tout le temps, finissent par ne plus rien lire.`,
    },
    {
      q: `Que montrer sur le site d’une école de musique pour donner envie de s’inscrire ?`,
      a: `Les instruments, les salles de cours, un extrait vidéo d’un cours collectif ou d’un récital, des mains sur un clavier ou des pieds sur un parquet, plutôt que des visages. Les extraits sonores sont précieux, mais la musique d’un tiers est protégée : n’utilisez que vos propres interprétations ou des œuvres libres de droits, et renseignez-vous auprès des organismes concernés. YouTube et Instagram prolongent bien le site. Chaque professeur doit apparaître avec un portrait et une phrase sur sa pédagogie.`,
    },
    {
      q: `Comment inscrire plus d’élèves à la prochaine rentrée sans publicité payante ?`,
      a: `Créez une page par discipline et par tranche d’âge, avec le cours d’essai bien visible. Annoncez vos portes ouvertes dès l’été, sur le site et sur la fiche Google. Rendez-vous aux salons de rentrée de votre commune avec le même visuel que celui du site. Les écoles voisines sont des partenaires possibles : une famille qui n’a plus de place chez l’une peut être orientée vers l’autre. Le bouche-à-oreille reste votre meilleur canal : donnez à chaque élève un lien facile à partager.`,
    },
    {
      q: `Quelles obligations légales pour le site d’une école de musique ou de danse ?`,
      a: `Les mentions légales classiques, des conditions d’inscription qui précisent paiement, absences et remboursement, et une information claire sur les données des élèves, souvent mineurs. Le formulaire d’inscription ne doit demander que l’utile. La diffusion de musique sur le site ou lors des spectacles relève de règles de droits d’auteur : renseignez-vous auprès des organismes de gestion. Les points précis se vérifient sur service-public.fr et cnil.fr, selon le statut juridique de votre école.`,
    },
  ],

  'tatoueur': [
    {
      q: `Comment un salon de tatouage apparaît-il sur Google Maps ?`,
      a: `Choisissez la catégorie de tatoueur ou de salon de tatouage, indiquez l’adresse, les jours d’ouverture et précisez que l’on vient sur rendez-vous si c’est votre règle. Les photos de la fiche gagnent à montrer le salon, le poste de travail propre et des tatouages cicatrisés, plutôt que des peaux fraîchement irritées. Les avis comptent beaucoup dans ce métier de confiance : sollicitez-les après la cicatrisation, quand le client a vu le résultat final.`,
    },
    {
      q: `Quelle adresse e-mail et quel nom de domaine pour un tatoueur indépendant ?`,
      a: `Votre nom d’artiste ou celui du salon, court et facile à épeler, car il figurera dans la biographie de vos réseaux. Une adresse dédiée aux projets reçoit les références et les photos des clients. Séparez-la de votre boîte personnelle pour que rien ne se perde. Si plusieurs artistes travaillent dans le salon, donnez à chacun sa propre adresse. Le site sert alors de page stable vers laquelle renvoie votre profil Instagram, quel que soit l’état de la plateforme.`,
    },
    {
      q: `Comment chiffrer un projet de tatouage sans échanger dix messages ?`,
      a: `Le formulaire de projet demande la zone du corps, la taille approximative, le style, couleur ou noir, et deux ou trois références. Vous répondez ensuite par un tarif horaire ou par projet, selon votre habitude, avec l’acompte demandé. Précisez que le prix final dépend du dessin validé. Un devis écrit, avec les conditions d’annulation, évite les malentendus. Aucun chiffre n’apparaît dans ces réponses : c’est vous qui fixez vos tarifs et qui les actualisez.`,
    },
    {
      q: `Quels messages automatiques envoyer avant et après une séance de tatouage ?`,
      a: `Un accusé de réception dès que le formulaire est envoyé, pour rassurer le client sur la prise en compte de son projet. Avant la séance, un rappel avec vos consignes habituelles de préparation, l’heure, et l’acompte à régler. Le lendemain, un message avec les soins que vous recommandez, puis un rappel de retouche. Écrivez-les vous-même : ils reprennent votre ton et vos consignes, que le site se contente d’envoyer au bon moment.`,
    },
    {
      q: `Comment photographier et classer mes tatouages sur le site ?`,
      a: `En lumière naturelle, à plat, sans filtre qui change les couleurs, avec la peau propre. Montrez au moins une photo cicatrisée par pièce importante, car c’est la tenue dans le temps qui convainc. Classez par style, taille et zone du corps. Ajoutez une courte légende sur l’intention du dessin. Demandez toujours l’accord du client, surtout pour les zones intimes ou reconnaissables par une marque de naissance. Instagram reste votre vitrine principale ; le site la complète avec les informations pratiques.`,
    },
    {
      q: `Mon Instagram suffit-il, ou mon site de tatoueur doit-il aussi être trouvé sur Google ?`,
      a: `Instagram attire un public qui regarde des images, mais il ne vous donne pas la main sur ce qui apparaît ni sur les prises de rendez-vous. Un site vous fournit une adresse stable que vous contrôlez. Pour qu’il soit trouvé, créez une page par style avec la ville, rédigez quelques lignes sur votre démarche et soignez la fiche Google. Les clients cherchent « tatoueur » suivi d’un style ou d’une ville ; chaque page répond à une de ces recherches précises.`,
    },
    {
      q: `Quelles obligations pour les formulaires et le consentement sur un site de tatoueur ?`,
      a: `Le site porte les mentions légales et informe sur l’usage des données saisies dans le formulaire de projet. Si vous demandez des informations de santé, comme des allergies, elles sont sensibles : collectez le strict nécessaire, expliquez pourquoi et limitez l’accès. Une fiche de consentement signée en salon, avant la séance, reste la référence ; le site peut la présenter à l’avance. Vérifiez les règles propres à votre activité auprès de l’administration sanitaire, et sur cnil.fr pour les données.`,
    },
  ],

  'toiletteur': [
    {
      q: `Comment un salon de toilettage apparaît-il dans les résultats de la carte Google ?`,
      a: `Choisissez la catégorie de toiletteur pour animaux, listez vos prestations (chiens, chats, races particulières, bain, coupe, dégriffage s’il y a lieu) et indiquez que l’on vient sur rendez-vous si c’est le cas. Les photos du salon propre, des tables et de l’espace d’attente rassurent les propriétaires. Si vous vous déplacez à domicile, précisez la zone plutôt qu’une adresse fixe. Les avis de propriétaires satisfaits, avec une photo de leur compagnon quand ils le veulent bien, sont très consultés.`,
    },
    {
      q: `Quelle adresse e-mail professionnelle pour un salon de toilettage indépendant ?`,
      a: `Une adresse à votre nom de domaine, qui reçoit les demandes de rendez-vous, envoie les confirmations et accepte les photos d’un chien à l’état de nœuds avant que vous n’en fixiez le tarif. Elle prend plus de poids qu’une adresse gratuite quand un vétérinaire ou un éleveur vous recommande. Une signature simple indique le nom du salon, les horaires et le téléphone. Gardez votre boîte personnelle à part, pour ne pas mélanger les messages des clients avec ceux de la famille.`,
    },
    {
      q: `Comment afficher un tarif lisible selon la taille, le poil et la prestation ?`,
      a: `Une grille à deux entrées : la taille de l’animal et la prestation choisie (bain, bain et coupe, entretien des yeux ou des oreilles). Le site propose ensuite une durée adaptée. Pour un chien dont vous ne connaissez pas le poil, un envoi de photos dans le formulaire permet d’annoncer un tarif préalable, confirmé à l’arrivée. La facture ou le ticket reprend la prestation exacte. Les montants viennent de votre grille et se modifient en quelques secondes.`,
    },
    {
      q: `Quels rappels automatiques envoyer aux propriétaires d’animaux ?`,
      a: `Un message la veille d’un rendez-vous, avec l’heure, la durée prévue et ce qu’il faut apporter, limite les absences. Pour les races dont le poil demande un entretien régulier, un rappel peut proposer un nouveau créneau au bout du délai que vous recommandez. Un message de saison avant la mue ou avant les vacances remplit le planning. Un acompte pour les clients qui ne se sont pas présentés ménage vos créneaux. Chaque message reste bref et mentionne le prénom de l’animal.`,
    },
    {
      q: `Quelles photos avant-après publier sans gêner les propriétaires ni les animaux ?`,
      a: `Photographiez dans une lumière douce, sur un fond neutre, quand l’animal est calme et à son aise, jamais en détresse. Montrez le résultat à côté de l’état d’arrivée seulement si le propriétaire est d’accord. Classez les images par race ou par type de poil, pour que chacun se reconnaisse. Évitez de laisser voir le véhicule, l’adresse ou le prénom complet du client sur une photo. Facebook et Instagram sont les réseaux naturels du métier ; le site garde les informations pratiques.`,
    },
    {
      q: `Comment attirer des propriétaires de chiens de ma commune vers mon salon ?`,
      a: `Créez des pages par race ou par type de poil dans lesquelles vous expliquez votre façon de travailler, ainsi qu’une page pour chaque commune voisine avec les temps de trajet. Faites-vous connaître des vétérinaires et des animaleries proches : leur recommandation compte. Soignez la fiche Google et demandez des avis après chaque séance réussie. Au fil des saisons, publiez quelques conseils d’entretien entre deux visites. Un lecteur qui retrouve ces conseils chez vous les associe à votre compétence.`,
    },
    {
      q: `Quelles obligations légales et quelles données pour le site d’un toiletteur ?`,
      a: `Le site affiche les mentions légales de l’entreprise et vos conditions de vente, avec les règles d’annulation et de retard. Les fiches de clients contiennent des données personnelles : coordonnées du propriétaire et informations sur l’animal. Gardez-les au strict nécessaire et dites combien de temps vous les conservez. Pour les règles propres à l’activité de toilettage et à la protection animale, renseignez-vous auprès des services de l’État, sur service-public.fr, et pour les données sur cnil.fr.`,
    },
  ],
}
