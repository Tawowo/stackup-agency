import type { ContenuLocal } from './types'

export const SECTIONS_PRIO: Record<string, ContenuLocal['sections']> = {
  'kinesitherapeute': [
    {
      titre: `Ce que tapent vos clients sur Google`,
      paragraphes: [
        `Un patient ne cherche pas « un cabinet de masso-kinésithérapie » : il tape ce qui lui fait mal ou ce que le médecin vient de prescrire. « kiné près de moi » dit l’urgence et la proximité ; la personne veut un cabinet joignable, avec un créneau cette semaine. Votre site doit donc montrer l’adresse, l’accès, les horaires et le bouton de rendez-vous avant tout texte de présentation. « kinésithérapeute Tours rendez-vous rapide » exprime la même impatience, avec un nom de ville : une page qui nomme clairement Tours, ou votre commune, répond mieux qu’une page qui parle de « notre secteur ».`,
        `D’autres requêtes décrivent un cas précis : « rééducation genou après opération », « kiné entorse cheville sportif », « kiné périnée après accouchement », « kiné bébé bronchiolite ». Chacune appelle sa propre page, avec ce que vous faites, comment se passe la première séance et ce qu’il faut apporter. Le patient qui lit « rééducation du genou » veut savoir si vous suivez les suites opératoires, pas lire un cours d’anatomie.`,
        `Restent les requêtes de comparaison et de coût : « kiné ou ostéopathe pour un mal de dos », « kiné à domicile Amboise », « combien coûte une séance de kiné », « avis kiné Chinon ». Pour la première, une courte page qui explique votre approche, sans dénigrer une autre profession, évite des rendez-vous qui n’ont pas lieu d’être. Pour la deuxième, listez les communes de tournée. Pour la troisième, renvoyez vers les informations de l’Assurance Maladie (ameli.fr) plutôt que de recopier des montants qui changent. Pour la dernière, votre fiche Google compte autant que votre site.`,
      ],
    },
    {
      titre: `Les pages d’un bon site de kinésithérapeute`,
      paragraphes: [
        `L’arborescence suit le parcours d’un patient. L’accueil dit en deux phrases qui vous êtes, où vous exercez et comment prendre rendez-vous. Viennent ensuite une page par grande famille de soins (rééducation post-opératoire, sport, rhumatologie, pédiatrie et respiratoire, périnéologie, selon ce que vous pratiquez réellement), puis une page « première séance » : bilan, déroulé, tenue, documents à apporter. Cette dernière rassure et réduit les arrivées sans ordonnance.`,
        `Prévoyez une page « cabinet » avec photos des salles, accès pour les personnes à mobilité réduite, stationnement et transports, puis une page « à domicile » si vous vous déplacez, avec la liste précise des communes couvertes. Si vous exercez à plusieurs, une fiche par praticien avec ses formations complémentaires évite que tout le monde prenne rendez-vous avec la même personne. Le formulaire de rendez-vous vient en dernier dans le parcours, mais le bouton doit rester visible en haut de chaque page sur mobile.`,
        `Gardez en pied de page les mentions légales, l’information sur les données personnelles et, si vous le souhaitez, une page d’actualité pour les fermetures de vacances ou les périodes de forte demande. Un patient qui trouve vos congés annoncés ne vous appelle pas pour rien.`,
      ],
    },
    {
      titre: `Ce que vous devez afficher, et ce qu’il faut éviter`,
      paragraphes: [
        `Le kinésithérapeute exerce une profession de santé réglementée : inscription au tableau de l’Ordre, diplôme d’État, déontologie. Votre site doit rester sobre et informatif. Affichez votre identité professionnelle, votre lieu d’exercice, vos horaires, vos diplômes et formations réels, ainsi que les informations pratiques sur la prise en charge. Pour les règles exactes de communication, les mentions à faire figurer et ce qui est permis en matière de publicité, la référence est l’Ordre des masseurs-kinésithérapeutes (cnomk.fr) : consultez-le avant la mise en ligne.`,
        `À éviter : toute promesse de guérison ou de résultat, les comparaisons avec des confrères, les photos avant-après de patients, les témoignages mis en scène. Des patients ne doivent jamais être identifiables sur votre site sans leur accord écrit. Pour les avis, vous ne maîtrisez pas ce que Google publie, mais vous pouvez répondre avec mesure, sans confirmer qu’une personne est suivie chez vous.`,
        `Côté données : un formulaire qui recueille un motif de consultation touche à des informations de santé. Limitez-vous au strict nécessaire, ne demandez pas de description détaillée de la pathologie par écrit, et renseignez-vous sur les obligations d’hébergement auprès de la CNIL (cnil.fr) et de l’Agence du numérique en santé (esante.gouv.fr). Le guide [site internet pour un cabinet de kinésithérapie](/blog/guide-site-internet-kinesitherapeute) détaille ces points, et [les règles de communication des professions de santé](/blog/site-web-medecin-kine) complètent le cadre.`,
      ],
    },
    {
      titre: `Quels outils de gestion pour un kinésithérapeute`,
      paragraphes: [
        `Le premier outil est la [prise de rendez-vous en ligne](/solutions/prise-rendez-vous-en-ligne), réglée sur vos durées de séance réelles : un bilan initial n’occupe pas le même créneau qu’une séance de suivi, et le domicile se planifie à part. Vous choisissez les plages ouvertes et ce qui s’affiche. Un rappel automatique la veille, par SMS ou courriel, réduit les absences ; le principe est détaillé dans l’article sur [la réservation en ligne et les absences](/blog/reservation-en-ligne-reduire-no-shows).`,
        `Deuxième outil : une liste d’attente. Quand un patient annule, le créneau libéré est proposé aux personnes qui attendent, plutôt que de rester vide. Troisième outil : un suivi simple des séries de séances par ordonnance, qui vous prévient quand une prescription touche à sa fin et qu’il faut demander un renouvellement au patient. Il s’agit d’un tableau de bord interne, pas d’un dossier médical : n’y stockez que ce qui est nécessaire à l’organisation.`,
        `Si vous exercez à plusieurs, un [planning partagé](/solutions/planning-employes) montre les salles, les remplaçants et les jours de chacun. Enfin, un [tableau de bord](/solutions/tableau-de-bord) vous montre la fréquentation par semaine et les créneaux qui restent vides, sans calcul à la main. Stackup les fabrique sur mesure dans le cadre d’un [logiciel de gestion](/services/logiciel-de-gestion).`,
      ],
    },
    {
      titre: `Budget, et erreurs fréquentes`,
      paragraphes: [
        `Pour un cabinet, un site d’une page avec adresse, horaires et lien de rendez-vous démarre à partir de {{prix:une-page}} €, et un site de plusieurs pages (soins, première séance, domicile, équipe) à partir de {{prix:multi-pages}} €. Les outils de gestion se chiffrent à part, à partir de {{prix:outil}} € pour un premier module. Ce qui fait varier le prix : le nombre de praticiens, le nombre de pages de soins, la prise de rendez-vous reliée ou non à votre agenda actuel, et la reprise de textes et de photos existants. L’estimation en ligne se trouve sur la page [tarifs](/tarifs).`,
        `Première erreur : une page d’accueil qui parle de bien-être sans dire où vous êtes ni comment prendre rendez-vous. Correction : adresse, téléphone et bouton en haut de page. Deuxième erreur : lister « toutes les pathologies » sur une seule page. Correction : une page par grande famille de soins que vous pratiquez vraiment, et rien d’autre.`,
        `Troisième erreur : promettre un soulagement rapide ou citer des résultats. Correction : décrire la méthode, le déroulé et vos formations, puis laisser le bilan parler. Quatrième erreur : oublier le voisin. Un patient qui hésite entre kiné et ostéopathe doit trouver une explication honnête ; la page consacrée au site d’un [ostéopathe](/creation-site-internet/osteopathe) montre comment une profession voisine structure le sien. Votre [référencement local](/services/referencement-local) fera le reste.`,
      ],
    },
  ],

  'photographe': [
    {
      titre: `Ce que tapent vos clients sur Google`,
      paragraphes: [
        `Presque personne ne tape simplement « photographe ». On cherche une occasion : « photographe mariage Tours », « photographe portrait professionnel pour LinkedIn », « photographe naissance à domicile », « photographe immobilier pour une annonce », « photographe pour un événement d’entreprise ». Chaque formulation désigne une page à part. Le futur marié veut voir des mariages complets, pas un portfolio mélangé ; le dirigeant veut un portrait net, rapide à organiser, avec un usage clair des images.`,
        `Les requêtes de prix sont fréquentes : « tarif photographe mariage », « combien coûte un shooting photo famille », « photographe pas cher ». Elles disent que le visiteur compare avant d’écrire. Sans afficher une grille figée, présentez ce qui compose le prix : durée de couverture, nombre d’images remises, retouche, déplacement, droits d’utilisation. Une page qui explique la composition d’un devis attire des demandes mieux préparées que des chiffres isolés.`,
        `Les recherches de proximité et de confiance viennent ensuite : « photographe près de moi », « photographe Saumur », « avis photographe Loches », « photographe disponible ce week-end ». Pour les deux premières, la zone couverte et la ville de départ doivent être écrites en toutes lettres. Pour les avis, un lien vers votre fiche Google et quelques extraits que vous avez le droit de reproduire rassurent. Pour la disponibilité, un calendrier public des dates prises évite de répondre à des demandes impossibles.`,
      ],
    },
    {
      titre: `Les pages d’un bon site de photographe`,
      paragraphes: [
        `Construisez le site par spécialité : une page mariage, une page portrait et famille, une page entreprise, une page événementiel, selon ce que vous proposez. Chacune contient une sélection courte de vos meilleures séries (une série complète vaut mieux que cent vignettes), un texte sur votre manière de travailler, le déroulé de la prestation, ce qui est remis au client, et un formulaire qui pose les bonnes questions : date, lieu, durée, usage des images.`,
        `Ajoutez une page « à propos » avec votre parcours et votre style, une page « comment ça se passe » qui décrit les étapes (échange, devis, acompte, séance, retouche, galerie privée), et une page tarifs ou « composer sa prestation ». Si vous faites des zones locales, une page par secteur desservi (Tours et alentours, Amboise, Chinon, Saumur) qui présente des lieux de prise de vue vraiment connus de vous.`,
        `Terminez par la galerie privée de livraison, accessible par lien et mot de passe, et, si vous vendez des tirages ou des albums, une boutique à part. Le parcours s’arrête au formulaire : tout doit y mener, sans détour par un menu à dix entrées.`,
      ],
    },
    {
      titre: `Ce que vous devez afficher, et ce qu’il faut éviter`,
      paragraphes: [
        `Un photographe est un professionnel indépendant : vos mentions légales doivent comporter votre identité, votre statut, votre numéro d’identification d’entreprise et vos coordonnées. L’outil de génération des mentions légales de Stackup (voir le [guide des mentions légales](/blog/mentions-legales-site-guide-generateur)) vous aide à n’en oublier aucune. Vos conditions générales de vente doivent préciser acompte, annulation, report de date, usage des images et mode de livraison. Pour les règles propres à la vente à distance de tirages ou d’albums, renseignez-vous sur service-public.fr et auprès de la DGCCRF.`,
        `Le droit d’auteur vous appartient, mais une personne photographiée dispose d’un droit à l’image : ne publiez pas un portrait de client sans son accord écrit, surtout pour un mariage, un enfant ou une séance de grossesse. Prévoyez dans le contrat une clause sur la publication de ses photos dans votre portfolio, et respectez le refus. Un visiteur tombé sur son visage sans l’avoir autorisé ne reviendra pas, et ne recommandera pas.`,
        `Évitez les galeries de fichiers pleine définition téléchargeables par n’importe qui sur la page publique, les images sans texte alternatif et les bandeaux de cookies envahissants. Sur la protection des fichiers, lisez [filigrane et droits d’auteur des photos en ligne](/blog/filigrane-droits-auteur-photos-en-ligne). Pour toute question de cession de droits, adressez-vous à un juriste ou à une organisation professionnelle de photographes.`,
      ],
    },
    {
      titre: `Quels outils de gestion pour un photographe`,
      paragraphes: [
        `Le premier outil est une galerie client privée : le mariage ou la séance d’entreprise y est déposé, le client choisit ses favoris, télécharge les fichiers autorisés. Vous évitez un abonnement mensuel à une plateforme tierce ; l’article [galerie client : abonnement ou outil propre](/blog/galerie-client-abonnement-ou-outil-propre) compare les deux voies sans détour. Un [portail client](/solutions/portail-client) sur mesure peut aussi porter le contrat, la facture et la sélection.`,
        `Deuxième outil : le devis et la facture avec acompte. Un [module de devis et factures](/solutions/gestion-devis-factures) reprend vos prestations types, calcule le total, génère un lien de paiement de l’acompte et déclenche un rappel pour le solde. Troisième outil : un suivi des dossiers, par étape (demande, devis envoyé, acompte reçu, séance faite, retouche, galerie livrée), pour ne rien laisser traîner en pleine saison.`,
        `Si vous recevez plusieurs demandes par semaine, un petit [CRM sur mesure](/solutions/crm-sur-mesure) garde l’historique de chaque contact, les relances à faire et la source de la demande. Pour vendre des tirages, une boutique reliée à votre catalogue s’étudie dans la page [site e-commerce](/services/site-ecommerce).`,
      ],
    },
    {
      titre: `Budget, et erreurs fréquentes`,
      paragraphes: [
        `Un portfolio d’une page, avec galerie, présentation et formulaire, démarre à partir de {{prix:une-page}} €. Un site à plusieurs pages (une par spécialité, tarifs, à propos, galerie privée) se situe à partir de {{prix:multi-pages}} €, et une boutique de tirages à partir de {{prix:boutique}} €. Ce qui fait varier le prix : le nombre de spécialités, la quantité de séries à intégrer et à optimiser, la galerie privée avec téléchargement, la vente en ligne et le calendrier de disponibilités. Calculez votre cas sur la page [tarifs](/tarifs).`,
        `Première erreur : un seul portfolio qui mélange mariage, produit et portrait. Correction : une page par spécialité, avec ses meilleures séries seulement. Deuxième erreur : des images lourdes qui font attendre plusieurs secondes sur mobile. Correction : formats modernes, dimensions adaptées, chargement progressif ; le guide [site de photographe : les fonctionnalités indispensables](/blog/site-photographe-fonctionnalites-indispensables) donne la liste.`,
        `Troisième erreur : aucune indication sur le déroulé ni sur ce qui est remis. Correction : une page qui décrit les étapes, le nombre d’images prévu dans votre formule et la forme de la remise ; voir aussi l’article sur [le nombre de photos à livrer par séance](/blog/combien-photos-livrer-par-seance). Quatrième erreur : un contact enfoui au fond du pied de page. Correction : un bouton de demande visible partout, et un formulaire qui pose les bonnes questions. Si vous filmez aussi, regardez le site d’un [vidéaste](/creation-site-internet/videaste).`,
      ],
    },
  ],

  'gite-location-saisonniere': [
    {
      titre: `Ce que tapent vos clients sur Google`,
      paragraphes: [
        `Le voyageur commence par un lieu et une contrainte : « gîte Touraine », « gîte avec piscine près de Chinon », « gîte pour 6 personnes Val de Loire », « location week-end Amboise », « gîte animaux acceptés Saumur ». La première formulation vise une région, donc votre page d’accueil doit nommer la Touraine, la vallée de la Loire ou votre commune précise. Les autres portent sur une capacité, un équipement ou une règle : la page doit répondre à ces critères sans qu’il faille écrire pour savoir.`,
        `Viennent ensuite les requêtes qui disent l’intention de comparer : « gîte pas cher week-end », « location vacances sans frais de service », « réserver un gîte en direct avec le propriétaire », « avis gîte ». Le visiteur qui tape « en direct » cherche déjà à éviter une plateforme ; votre site peut lui expliquer simplement comment réserver chez vous et ce qu’il y gagne, sans critiquer personne. Sur l’avis, un lien vers votre fiche Google et des extraits de livre d’or réels pèsent plus que toute promesse.`,
        `Enfin, les requêtes d’accessibilité et de séjour : « gîte accessible handicap Loire », « gîte proche châteaux de la Loire », « gîte pour randonnée à vélo », « que faire près de Loches en hiver ». Ces dernières attirent hors saison, quand les plateformes sont moins sollicitées. Une page « autour du gîte » bien rédigée, avec distances à pied ou en voiture et sites connus, vous place sur des recherches que les annonces sur plateforme ne couvrent pas.`,
      ],
    },
    {
      titre: `Les pages d’un bon site de gîte`,
      paragraphes: [
        `L’accueil montre le lieu, indique la capacité et propose de vérifier les dates. Viennent ensuite une page par logement si vous en avez plusieurs (avec couchages, surfaces, équipements, plan, photos classées par pièce), puis une page tarifs et conditions : périodes, durée minimale de séjour, jours d’arrivée, acompte, solde, caution, annulation, animaux, ménage de fin de séjour. Plus ces règles sont lisibles tôt, moins vous répondez aux mêmes questions.`,
        `Une page « autour du gîte » présente les alentours : sites à visiter, chemins de randonnée, producteurs, restaurants, marchés, selon les saisons. Ajoutez une page « disponibilités et réservation » avec calendrier à jour, un formulaire pour les demandes particulières (groupes, séjours longs), et une page sur vous, vos engagements et la vie sur place. Un lieu habité inspire plus confiance qu’une annonce anonyme.`,
        `Prévoyez enfin un espace discret pour les locataires déjà réservés : livret d’accueil, accès, consignes, numéros utiles. Cette page ne s’adresse pas aux moteurs de recherche mais à ceux qui arrivent, et elle vous épargne des messages à l’heure du dîner.`,
      ],
    },
    {
      titre: `Ce que vous devez afficher, et ce qu’il faut éviter`,
      paragraphes: [
        `La location saisonnière est encadrée : déclaration du meublé de tourisme en mairie, éventuel numéro d’enregistrement à faire figurer sur l’annonce dans certaines communes, classement facultatif en étoiles, taxe de séjour dans les communes qui l’ont instituée. Ces règles varient selon la commune et le type de logement ; vérifiez-les auprès de votre mairie et sur service-public.fr avant la mise en ligne, et n’affichez un classement que si vous l’avez réellement obtenu.`,
        `Votre site doit aussi comporter vos mentions légales, vos conditions de location et, si vous encaissez en ligne, des conditions de paiement claires. Précisez l’acompte, la date du solde, la caution et la politique d’annulation. Si vous communiquez un label de réseau, vérifiez que le logement est bien rattaché au réseau en question. Pour toute question sur l’assurance et le statut de loueur, rapprochez-vous de votre assureur et de l’administration compétente.`,
        `À éviter : des photos qui promettent un équipement absent, une capacité d’accueil supérieure à ce que permettent les couchages, une vue ou une piscine retouchées. Une déception à l’arrivée coûte plus cher qu’une réservation perdue. Sur le choix entre site propre et plateforme, lisez [système de réservation : commission ou propriété](/blog/systeme-reservation-en-ligne-commission-ou-propriete).`,
      ],
    },
    {
      titre: `Quels outils de gestion pour un gîte`,
      paragraphes: [
        `Le premier outil est un calendrier unique. Il se synchronise avec les calendriers des plateformes que vous gardez, afin d’éviter les doubles réservations, et il bloque vos dates personnelles. Le module de [réservation de location](/solutions/reservation-location) y ajoute le calcul du séjour, l’acompte, le solde et l’envoi automatique du récapitulatif.`,
        `Deuxième outil : le suivi des séjours. Pour chaque réservation, vous voyez les dates, le nombre de personnes, les paiements reçus, la caution et le ménage à prévoir. Un [planning](/solutions/planning-employes) partagé avec la personne qui assure le ménage ou le linge évite les oublis entre deux arrivées. Si vous gérez plusieurs logements, un [tableau de bord](/solutions/tableau-de-bord) montre ceux qui sont vides le mois prochain.`,
        `Troisième outil : la relation avec les anciens clients. Un [CRM sur mesure](/solutions/crm-sur-mesure) garde les séjours précédents, les dates préférées et permet une relance simple avant la saison. Le guide [application de réservation de location](/blog/application-reservation-location) décrit la logique générale. Si vous gérez des biens pour d’autres propriétaires, voyez [la conciergerie](/blog/conciergerie-airbnb-site-web).`,
      ],
    },
    {
      titre: `Budget, et erreurs fréquentes`,
      paragraphes: [
        `Un site de gîte à une page, avec photos, tarifs et formulaire de demande, démarre à partir de {{prix:une-page}} €. Avec plusieurs pages (logements, alentours, conditions, livre d’or), la base est à partir de {{prix:multi-pages}} €, et le module de réservation avec paiement et calendrier se chiffre à partir de {{prix:outil}} €. Ce qui fait varier le prix : le nombre de logements, le mode de réservation (demande ou paiement direct), la synchronisation avec les plateformes et la langue des textes si vous accueillez des étrangers.`,
        `Première erreur : des photos sombres et classées sans ordre. Correction : une série par pièce, de jour, avec un plan simple. Deuxième erreur : un calendrier introuvable ou périmé. Correction : un calendrier visible dès la page d’accueil, mis à jour automatiquement, et un site qui indique clairement les jours d’arrivée possibles.`,
        `Troisième erreur : des conditions de location en petits caractères. Correction : une page lisible avec acompte, caution, annulation, animaux, ménage. Quatrième erreur : ne parler que de l’été. Correction : décrire le lieu au printemps, en automne et en hiver, car beaucoup de séjours hors saison se décident sur ces détails. Pour comparer avec une autre forme d’hébergement, voyez le site d’un [hôtel ou de chambres d’hôtes](/creation-site-internet/hotel-chambres-hotes) et la page [référencement local](/services/referencement-local).`,
      ],
    },
  ],

  'avocat': [
    {
      titre: `Ce que tapent vos clients sur Google`,
      paragraphes: [
        `Quelqu’un qui cherche un avocat est rarement serein. « avocat divorce Tours » dit qu’une séparation est en cours, et que la personne veut savoir qui contacter, comment se passe un premier rendez-vous et si le cabinet traite ce type d’affaire. « avocat droit du travail licenciement » vient d’un salarié qui vient de recevoir un courrier. Pour ces deux requêtes, une page par domaine, avec un langage simple et le déroulé des étapes habituelles, répond mieux qu’un texte général sur le cabinet.`,
        `Les requêtes de coût sont fréquentes et délicates : « honoraires avocat divorce », « combien coûte un avocat », « premier rendez-vous avocat gratuit ». Elles expriment la crainte de la facture. Le site peut expliquer comment se fixent les honoraires (temps passé, forfait, convention) sans afficher de chiffre ni promettre de gratuité, et renvoyer vers le barreau ou service-public.fr pour l’aide juridictionnelle. Les règles d’information sur les honoraires relèvent de votre ordre : vérifiez-les.`,
        `D’autres requêtes disent l’urgence : « avocat garde à vue », « avocat urgence Tours », « avocat pénaliste disponible ce soir ». Si votre cabinet traite ces situations, un numéro direct visible et des horaires clairs sont indispensables ; sinon, ne vous positionnez pas dessus. Enfin, « avocat près de moi », « avocat Saumur droit immobilier » et « avis avocat » parlent de proximité et de confiance : adresse, accès, lieux de permanence et fiche Google à jour comptent autant que le texte.`,
      ],
    },
    {
      titre: `Les pages d’un bon site d’avocat`,
      paragraphes: [
        `Commencez par une page d’accueil sobre : qui vous êtes, votre barreau d’inscription, vos domaines d’intervention et comment prendre contact. Chaque domaine (famille, travail, immobilier, pénal, affaires, selon votre pratique) reçoit une page : les situations typiques, les étapes d’une procédure en termes simples, ce que le client doit préparer, sans présenter un cas comme gagné d’avance.`,
        `Ajoutez une page « votre premier rendez-vous » qui décrit où, combien de temps, ce qu’il faut apporter et comment vous abordez la question des honoraires. Une page « le cabinet » présente chaque avocat, son parcours, ses langues, ses domaines. Une page « accès et contact » indique l’adresse, l’accessibilité, les horaires, le téléphone et un formulaire court.`,
        `Si vous écrivez, un espace d’articles de fond (une réforme, une démarche, une question fréquente) montre votre manière de raisonner. Chaque article doit rester informatif, daté, sans conseil individualisé. Gardez les mentions légales et la politique de confidentialité en pied de page.`,
      ],
    },
    {
      titre: `Ce que vous devez afficher, et ce qu’il faut éviter`,
      paragraphes: [
        `L’avocat est soumis à des règles de déontologie, notamment en matière de publicité, de sollicitation de clientèle et de secret professionnel. Elles évoluent et relèvent de votre ordre : mieux vaut ne pas les résumer ici de mémoire. La référence est le barreau auquel vous êtes inscrit et le Conseil national des barreaux (cnb.avocat.fr), qui publient les textes en vigueur, notamment sur ce qu’un site peut contenir et sur les formalités éventuelles à accomplir avant sa mise en ligne. Demandez-leur avant de publier.`,
        `Sur le fond, trois principes de prudence. N’affichez une spécialisation que si vous détenez réellement la mention correspondante ; sinon, parlez de « domaines d’intervention » ou de « pratique ». Ne promettez aucun résultat et n’indiquez aucun chiffre de réussite. Pour les avis et témoignages de clients, demandez à votre barreau ce qui est admis avant d’en reproduire un seul.`,
        `Côté données personnelles, votre formulaire reçoit des informations sensibles : limitez les champs, invitez à ne pas détailler les faits par écrit, indiquez qui reçoit le message et comment il est conservé. Les repères généraux se trouvent sur cnil.fr, et l’article [RGPD et site web](/blog/rgpd-site-web-2026) rappelle les bases. Le secret professionnel s’applique aussi à vos échanges numériques : choisissez vos outils en conséquence.`,
      ],
    },
    {
      titre: `Quels outils de gestion pour un avocat`,
      paragraphes: [
        `Le premier outil est une prise de rendez-vous qui trie la demande. Un [module de rendez-vous en ligne](/solutions/prise-rendez-vous-en-ligne) propose des plages de consultation au cabinet, par téléphone ou en visioconférence, selon le domaine indiqué, et affiche ce qu’il faut apporter. Vous gardez la main : chaque demande est validée par vous ou par votre secrétariat.`,
        `Deuxième outil : un espace client sécurisé. Un [portail client](/solutions/portail-client) permet de déposer des pièces, de suivre l’état d’un dossier et de recevoir des documents, plutôt que de multiplier les envois par courriel. Faites-le valider auprès de votre barreau et de votre assureur. Troisième outil : devis et conventions d’honoraires, avec un [module de devis et factures](/solutions/gestion-devis-factures) pour produire des documents homogènes et suivre les paiements.`,
        `Quatrième outil : un suivi des échéances et des relances. Un [CRM sur mesure](/solutions/crm-sur-mesure) peut enregistrer les prospects et les dates à surveiller, sans y verser le contenu des dossiers. Pour les signatures à distance, voyez l’article sur la [signature électronique](/blog/signature-electronique-devis-en-ligne). Ces outils rejoignent l’offre de [logiciel de gestion](/services/logiciel-de-gestion) de Stackup.`,
      ],
    },
    {
      titre: `Budget, et erreurs fréquentes`,
      paragraphes: [
        `Un site de cabinet à plusieurs pages (accueil, domaines, avocat, premier rendez-vous, contact) démarre à partir de {{prix:multi-pages}} €, et un site d’une page de présentation à partir de {{prix:une-page}} €. Un espace client ou un module de rendez-vous se chiffre à partir de {{prix:outil}} €. Ce qui fait varier le prix : le nombre de domaines à rédiger, le nombre d’avocats présentés, la rédaction d’articles, le portail client et la prise de rendez-vous. Estimez votre projet sur la page [tarifs](/tarifs).`,
        `Première erreur : un jargon que seul un confrère comprend. Correction : des phrases courtes, un vocabulaire expliqué, des situations concrètes. Deuxième erreur : une photo de bibliothèque générique et aucun visage. Correction : une présentation personnelle courte et des photos du cabinet, qui rassurent.`,
        `Troisième erreur : un seul texte pour tous les domaines. Correction : une page par domaine, avec un titre qui reprend les mots d’un client. Quatrième erreur : des mentions floues sur le barreau, l’assurance ou la spécialisation. Correction : ne mentionner que ce qui est exact et vérifié avec votre ordre. Pour un cabinet voisin de votre activité, regardez la page [notaire](/creation-site-internet/notaire) et celle d’un [expert-comptable](/creation-site-internet/expert-comptable), puis travaillez votre [référencement local](/services/referencement-local).`,
      ],
    },
  ],

  'agence-immobiliere': [
    {
      titre: `Ce que tapent vos clients sur Google`,
      paragraphes: [
        `L’acquéreur et le vendeur n’emploient pas les mêmes mots. L’acquéreur écrit « appartement à vendre Tours centre », « maison 4 chambres avec jardin Joué-lès-Tours », « terrain constructible près de Loches ». Il cherche un bien, un quartier, un budget : votre site doit offrir des pages de résultats lisibles, filtrables et indexables, plutôt qu’un catalogue qui ne s’ouvre que dans une fenêtre fermée. La fiche d’un bien doit porter le nom de la commune et le type de bien dans son titre.`,
        `Le vendeur, lui, tape « estimation maison gratuite Tours », « combien vaut mon appartement », « vendre sa maison rapidement » ou « agence immobilière Amboise avis ». Il compare plusieurs agences avant d’appeler. Pour l’estimation, expliquez la méthode (visite, comparaison avec des ventes proches, analyse du marché local) et proposez un rendez-vous plutôt qu’un chiffre automatique : un chiffre sans visite serait trompeur. Pour les avis, votre fiche Google et vos références locales pèsent davantage que des slogans.`,
        `D’autres requêtes concernent le propriétaire bailleur : « gestion locative Tours », « mise en location appartement agence ». Si vous faites de la gestion, elle mérite sa page. Enfin, « agence immobilière près de moi » et « agence immobilière ouverte le samedi » parlent de proximité et d’horaires : adresse, plan d’accès et jours d’ouverture doivent être visibles en un coup d’œil.`,
      ],
    },
    {
      titre: `Les pages d’un bon site d’agence immobilière`,
      paragraphes: [
        `Les pages de biens à vendre et à louer forment le cœur du site : une liste filtrable (type, budget, surface, commune), puis des fiches complètes. Elles sont mises à jour tous les jours et archivent les biens vendus ou loués avec la mention correspondante. Autour, prévoyez une page par secteur couvert (Tours, Joué-lès-Tours, Amboise, Chinon, selon votre zone) qui parle du marché local avec des repères vérifiables.`,
        `Côté vendeurs, une page « vendre avec nous » explique le déroulé : rendez-vous, estimation sur place, mandat, photos, diffusion, visites, offre, compromis, acte. Une page d’estimation, avec un formulaire court, recueille l’adresse, le type de bien et les coordonnées. Une page « location » ou « gestion locative » s’adresse aux bailleurs.`,
        `Complétez par la page de l’équipe (chaque négociateur, secteur, coordonnées), une page « honoraires » conforme à vos obligations, un blog de conseils locaux et un contact avec carte. L’ordre compte : les biens d’abord, car c’est ce que l’acquéreur vient voir ; les services ensuite, pour rassurer le vendeur qui cherche son interlocuteur.`,
      ],
    },
    {
      titre: `Ce que vous devez afficher, et ce qu’il faut éviter`,
      paragraphes: [
        `L’activité d’agent immobilier est réglementée : carte professionnelle délivrée par la chambre de commerce et d’industrie, garantie financière lorsque l’agence détient des fonds, assurance de responsabilité civile professionnelle, médiateur de la consommation. Ces éléments, ainsi que l’affichage des honoraires et de la performance énergétique des biens dans les annonces, relèvent de textes précis qui évoluent, et que nous ne reproduisons donc pas ici. Vérifiez-les auprès de votre fédération ou de votre syndicat professionnel, de la DGCCRF et sur service-public.fr avant chaque mise en ligne d’un nouveau gabarit d’annonce.`,
        `Une annonce doit être exacte : surface, nombre de pièces, état, charges, prix. Un bien vendu ou sous compromis se retire ou se signale, sans laisser en ligne une offre périmée. Ne faites jamais figurer de critère discriminatoire dans une annonce, par exemple sur l’origine ou la situation familiale d’un locataire. Quant aux photos, utilisez uniquement celles dont vous détenez les droits, et respectez la vie privée des occupants.`,
        `À éviter également : des chiffres de marché non sourcés, des « prix au mètre carré » devenus faux, des estimations présentées comme certaines et des avis non vérifiables. Sur la forme du site, l’article [site internet d’agence immobilière](/blog/agence-immobiliere-site-web-2026) rappelle les erreurs les plus fréquentes.`,
      ],
    },
    {
      titre: `Quels outils de gestion pour une agence immobilière`,
      paragraphes: [
        `Le premier outil est un back-office de biens : un négociateur ajoute un bien, ses photos, ses caractéristiques, les champs obligatoires, et la fiche se publie sur le site sans ressaisie. Il peut distinguer vente, location et gestion, et signaler un bien sous compromis. Pour la tenue de vos fichiers, un [CRM sur mesure](/solutions/crm-sur-mesure) relie chaque contact (acquéreur, vendeur, bailleur) aux biens qui l’intéressent.`,
        `Deuxième outil : la planification des visites. La [prise de rendez-vous en ligne](/solutions/prise-rendez-vous-en-ligne) propose des créneaux de visite par bien, évite deux acquéreurs au même moment et rappelle le rendez-vous la veille. Troisième outil : un [planning d’équipe](/solutions/planning-employes) qui répartit les visites, les estimations et les permanences entre négociateurs.`,
        `Quatrième outil : devis, mandats et suivi, avec un [module de documents et factures](/solutions/gestion-devis-factures) pour garder trace de ce qui est signé et de ce qui reste à relancer. Le [tableau de bord](/solutions/tableau-de-bord) montre les mandats actifs, les biens sans visite depuis longtemps et les demandes d’estimation en attente. Stackup réunit ces briques dans un [logiciel de gestion](/services/logiciel-de-gestion) pensé pour votre agence.`,
      ],
    },
    {
      titre: `Budget, et erreurs fréquentes`,
      paragraphes: [
        `Un site d’agence avec catalogue de biens démarre à partir de {{prix:multi-pages}} €. Un site de présentation seule (équipe, services, contact) peut démarrer à partir de {{prix:une-page}} €, et un back-office de gestion des biens à partir de {{prix:outil}} €. Ce qui fait varier le prix : le nombre de biens et leur mise à jour (saisie manuelle ou reprise depuis votre logiciel actuel), le nombre de secteurs couverts, le nombre de négociateurs, le formulaire d’estimation et la prise de rendez-vous. Vérifiez votre cas sur la page [tarifs](/tarifs).`,
        `Première erreur : des filtres inutilisables sur mobile. Correction : une recherche simple en haut de page, avec peu de critères, testée avec un vrai téléphone. Deuxième erreur : des annonces sans prix lisible ni mentions obligatoires. Correction : des champs obligatoires dans le back-office, qui bloquent la publication d’une fiche incomplète.`,
        `Troisième erreur : des pages de secteur copiées d’une agence à l’autre. Correction : un texte propre à chaque commune, avec des repères locaux exacts. Quatrième erreur : cacher le téléphone et l’adresse. Correction : coordonnées dès le haut de page, et un bouton de contact sur chaque fiche. Pour des métiers voisins, regardez la page du [diagnostiqueur immobilier](/creation-site-internet/diagnostiqueur-immobilier) et celle d’un [courtier en crédit](/creation-site-internet/courtier-credit), puis appuyez-vous sur le [référencement local](/services/referencement-local).`,
      ],
    },
  ],
}
