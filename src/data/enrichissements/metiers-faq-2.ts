import type { ContenuLocal } from './types'

export const FAQ_METIERS: Record<string, ContenuLocal['faq']> = {
  'hotel-chambres-hotes': [
    {
      q: `Comment ma chambre d’hôtes apparaît-elle sur Google Maps quand on cherche près de soi ?`,
      a: `Créez ou revendiquez votre fiche Google, puis validez-la avec le code de vérification envoyé par Google. Choisissez comme catégorie principale celle qui décrit vraiment votre activité, par exemple chambre d’hôtes ou hôtel, et gardez les catégories secondaires pour les services annexes comme la table d’hôtes. Renseignez l’adresse exacte, les horaires de réception, une photo de la façade et du stationnement, puis l’adresse du site. Répondez à chaque avis, y compris les critiques : un voyageur lit surtout la façon dont l’hôte réagit quand quelque chose a manqué.`,
    },
    {
      q: `Quelle adresse e-mail utiliser pour recevoir les demandes de séjour de mes clients ?`,
      a: `Évitez l’adresse gratuite qui sert aussi à vos courses : une demande de week-end envoyée à une boîte saturée reste sans réponse. Prenez un nom de domaine proche du nom de votre maison, puis créez une adresse du type reservation@votre-domaine. Les confirmations, les consignes d’arrivée et les factures partent alors d’une adresse qui inspire confiance, et elle ne finit pas dans les courriers indésirables. Vous pouvez la faire suivre vers votre téléphone pour répondre depuis la cuisine, entre deux petits-déjeuners.`,
    },
    {
      q: `Comment établir un devis pour un groupe, un mariage ou un séminaire dans ma maison ?`,
      a: `Préparez un modèle de devis que vous adaptez à chaque demande : nombre de chambres et de nuits, repas, salle éventuelle, conditions d’annulation et montant de l’acompte. Faites poser les bonnes questions dès le formulaire du site, notamment les dates, le nombre de personnes et les régimes alimentaires, afin de ne pas échanger dix messages avant de chiffrer. Un devis daté, détaillé et accepté par écrit protège autant le groupe que vous. Les mentions obligatoires se vérifient sur le site officiel service-public.fr.`,
    },
    {
      q: `Peut-on envoyer automatiquement les consignes d’arrivée et un rappel avant le séjour ?`,
      a: `Oui, et c’est l’automatisation la plus utile pour un hébergeur qui n’a pas de réception ouverte toute la journée. Quelques jours avant l’arrivée, le client reçoit l’adresse précise, les horaires d’accueil, le code d’accès ou l’heure de remise des clés, et la manière de vous joindre en cas de retard. Un message après le départ peut aussi inviter à laisser un avis. Cela vous évite les appels de dernière minute au moment où vous préparez le petit-déjeuner ou changez les draps.`,
    },
    {
      q: `Quelles photos mettre pour qu’un voyageur ait envie de réserver ma chambre ?`,
      a: `Montrez la vraie chambre, de jour, rangée, avec le lit, la salle de bains et la vue depuis la fenêtre. Ajoutez la salle du petit-déjeuner, le jardin, l’entrée et le stationnement : on réserve aussi un lieu, pas seulement un lit. Évitez les images retouchées à l’excès, qui déçoivent à l’arrivée et finissent en avis négatif. Une photo de l’hôte accueillant dans la maison rassure beaucoup. Reprenez les saisons : une cheminée allumée en hiver, une terrasse en juillet.`,
    },
    {
      q: `Pourquoi les voyageurs me trouvent-ils sur Booking mais pas sur mon propre site ?`,
      a: `Les plateformes dépensent beaucoup pour être en tête, et un site récent met du temps à se faire connaître. Votre site doit répondre précisément à ce que tape un voyageur : chambre d’hôtes, nom du village, nom de la région, nom d’un château ou d’un festival proche. Chaque page doit avoir un titre clair, des textes propres à votre maison et une fiche Google à jour qui renvoie vers lui. Les avis récents et les mentions sur les sites de votre office de tourisme aident aussi à gagner en visibilité.`,
    },
    {
      q: `Quelles obligations légales pour le site d’un hôtel ou d’une chambre d’hôtes ?`,
      a: `Le site doit afficher l’identité de l’exploitant, l’adresse, les conditions de vente ou de réservation et la politique de gestion des données personnelles, avec un bandeau si des traceurs sont utilisés. Pour la profession, la déclaration de l’activité en mairie, le classement éventuel, la taxe de séjour et la fiche de police pour les clients étrangers dépendent de votre situation. Elles varient selon votre situation et se vérifient avant d’écrire quoi que ce soit : consultez service-public.fr, le site de votre mairie et celui de la CNIL pour les données.`,
    },
  ],

  'chauffagiste-climatisation': [
    {
      q: `Comment un chauffagiste apparaît-il dans la carte Google quand la chaudière tombe en panne ?`,
      a: `Votre fiche Google doit afficher votre numéro direct, votre zone d’intervention et des horaires qui reflètent la réalité, y compris les astreintes si vous en assurez. Prenez pour catégorie principale chauffagiste, puis ajoutez les catégories de l’installation de climatisation ou de pompes à chaleur si vous les posez. Une personne dont la chaudière s’arrête en janvier regarde les trois premiers résultats et appelle celui qui répond. Montrez des photos de chantiers réels, répondez aux avis et indiquez les marques que vous entretenez.`,
    },
    {
      q: `Faut-il une adresse e-mail professionnelle pour envoyer mes devis de pompe à chaleur ?`,
      a: `Oui, car un devis de plusieurs pages envoyé depuis une messagerie gratuite risque de finir en courrier indésirable, et le client doute de l’entreprise. Avec un nom de domaine à vous, vous créez contact@ pour les demandes, devis@ pour vos chiffrages et entretien@ pour les contrats. Chacun peut être redirigé vers votre téléphone pendant les tournées. Votre signature mentionne alors l’entreprise, le numéro d’identification et les qualifications que vous détenez réellement, ce qui rassure autant les particuliers que les syndics.`,
    },
    {
      q: `Comment faire mes devis de chauffage et de climatisation plus vite entre deux chantiers ?`,
      a: `Partez d’un devis type par installation : remplacement de chaudière, pompe à chaleur, climatiseur mono ou multisplit, entretien annuel. Chaque modèle contient les lignes de fournitures, la main-d’œuvre, la mise en service et les options à cocher. Le formulaire du site peut recueillir en amont la surface, le type de logement, l’énergie actuelle et une photo de la chaufferie, ce qui évite un déplacement inutile pour chiffrer. Un logiciel de devis qui reprend ces modèles et vos tarifs de fournisseurs vous fait gagner les soirées de saisie.`,
    },
    {
      q: `Peut-on relancer automatiquement les clients dont l’entretien de chaudière arrive à échéance ?`,
      a: `C’est même l’automatisation la plus rentable du métier. Votre fichier de clients enregistre la date de la dernière visite, la marque et le type d’appareil ; un message part au moment voulu pour proposer un créneau avant l’hiver, et un second rappelle la visite deux jours avant. Pour la climatisation, le rappel se fait plutôt au printemps. Chaque client garde la possibilité de répondre par un lien et de choisir son horaire. Vous remplissez ainsi vos tournées creuses de l’automne au lieu de courir après les appels.`,
    },
    {
      q: `Quelles photos de chantiers montrer sans exposer le domicile de mes clients ?`,
      a: `Photographiez la chaufferie, le groupe extérieur, le raccordement et le résultat après pose, en cadrant l’appareil plutôt que la pièce ou la façade entière. Demandez l’accord du client avant de publier, même pour une image sans visage, et masquez l’adresse. Montrez un avant et un après, la propreté de la finition, le calorifugeage et l’affichage de la mise en service : un futur client juge le soin d’après ces détails. Une courte vidéo d’un technicien expliquant l’entretien rassure plus qu’un catalogue de marques.`,
    },
    {
      q: `Mon site de chauffagiste est en ligne mais n’apparaît pas sur Google : que vérifier ?`,
      a: `Commencez par vérifier que le site est bien indexé en tapant son adresse dans la barre de recherche Google, et que la page d’accueil n’est pas bloquée par un réglage technique laissé après la mise en ligne. Ensuite, chaque page doit viser une demande précise : dépannage chaudière dans votre ville, installation de pompe à chaleur, entretien annuel. Un site neuf met du temps à remonter. Inscrivez-le dans la Search Console de Google, liez-le à votre fiche et collectez des avis de clients satisfaits.`,
    },
    {
      q: `Que doit afficher légalement le site d’un chauffagiste qui affiche une qualification RGE ?`,
      a: `Outre les mentions légales classiques et la politique de confidentialité, n’affichez une qualification, un label ou une marque que si vous la détenez en cours de validité, avec son organisme et son domaine exact. Une mention trompeuse expose à des sanctions. La manipulation de fluides frigorigènes et l’intervention sur le gaz relèvent de règles professionnelles spécifiques, ainsi que la présentation des aides financières. Vérifiez sur service-public.fr, sur l’annuaire officiel des professionnels qualifiés et auprès de votre organisme de qualification, plutôt que de recopier un texte trouvé en ligne.`,
    },
  ],

  'paysagiste-jardinier': [
    {
      q: `Comment un paysagiste ressort-il dans Google Maps pour les jardins de sa commune ?`,
      a: `Sur votre fiche Google, choisissez comme catégorie principale paysagiste ou entreprise d’entretien de jardins selon ce qui pèse le plus dans votre activité, puis précisez vos zones de déplacement plutôt qu’une adresse que vous ne recevez pas au public. Ajoutez des photos de jardins terminés, avec la saison, des services comme la taille, la tonte ou l’arrosage automatique, et de vrais horaires. Les avis comptent beaucoup : demandez-les en fin de chantier, au moment où le client voit son jardin fleuri, et répondez à chacun.`,
    },
    {
      q: `Nom de domaine et adresse e-mail : que choisir pour une entreprise de jardins ?`,
      a: `Un nom de domaine court qui reprend le nom de votre entreprise suffit, avec le nom de la ville si votre nom est très répandu. Il vous donne un site et des adresses comme contact@ ou devis@ qui restent à vous, même si vous changez de prestataire ou de téléphone. Sur un chantier, vous lisez vos messages depuis la camionnette : choisissez une messagerie qui se configure simplement sur mobile. Pensez à réserver aussi les variantes avec et sans tiret pour éviter qu’un homonyme n’en profite.`,
    },
    {
      q: `Comment chiffrer un devis de jardin sans me déplacer pour chaque demande ?`,
      a: `Faites remplir au visiteur une fiche d’avant-visite : surface approximative, nature du terrain, type de travaux, accès pour la machine, photos du jardin et budget qu’il envisage. Vous écartez ainsi les demandes hors zone ou hors budget, et vous gardez la visite pour ceux qui ont un vrai projet. Pour l’entretien régulier, un devis type avec fréquence de passage et prestations incluses se renouvelle chaque année. Précisez ce qui n’est pas compris, comme l’évacuation des déchets verts ou l’achat de végétaux, pour éviter les litiges.`,
    },
    {
      q: `Que peut-on automatiser pour un contrat d’entretien de jardin sur l’année ?`,
      a: `Les passages réguliers se prêtent bien à un calendrier partagé : le client voit les dates prévues, reçoit un rappel la veille et un message si la pluie décale l’intervention. Une relance de reconduction part avant la fin du contrat. Au changement de saison, un message propose la taille des haies, le nettoyage d’automne ou la plantation, selon l’historique du client. Vous gardez la maîtrise des plannings, tout en évitant les dizaines d’appels de printemps pour savoir quand vous passez.`,
    },
    {
      q: `Quelles photos de mes jardins montrer pour convaincre de futurs clients ?`,
      a: `Misez sur les séquences avant et après prises du même angle, à plusieurs mois d’écart : un massif vide puis fleuri montre ce que vous savez faire dans la durée. Ajoutez des plans, des détails de pose de terrasse ou de muret, et des images d’hiver, car un beau jardin en juin ne prouve pas la tenue de vos plantations. Demandez toujours l’accord du propriétaire avant de publier. Évitez les banques d’images : elles ne valent pas vos chantiers, et elles se repèrent sur-le-champ.`,
    },
    {
      q: `Pourquoi mon site de paysagiste n’apparaît-il pas pour la recherche jardinier près de moi ?`,
      a: `Une recherche de ce type s’appuie surtout sur la proximité et sur la fiche Google, avant le site. Vérifiez que votre zone de déplacement est claire, que chaque commune importante a ses mots dans une page de prestations et que vos coordonnées sont identiques partout, site, fiche et annuaires. Les paysagistes qui montent publient des réalisations situées dans leur secteur, avec le nom de la commune. Le travail est lent : comptez des mois de régularité, des avis réguliers et des photos neuves à chaque saison.`,
    },
    {
      q: `Quelles règles faut-il respecter sur le site d’une entreprise de jardins ?`,
      a: `Comme tout professionnel, affichez les mentions légales, votre identité d’entreprise, l’assurance si vous la mentionnez, et la politique de confidentialité pour le formulaire de devis. Certains travaux ont des règles propres : produits phytosanitaires, élagage près des lignes électriques, garanties sur les ouvrages, aides fiscales aux services à la personne pour l’entretien. Elles évoluent ; n’annoncez un avantage fiscal à vos clients qu’après l’avoir vérifié sur service-public.fr ou impots.gouv.fr, et pour les données personnelles sur cnil.fr.`,
    },
  ],

  'osteopathe': [
    {
      q: `Comment un ostéopathe apparaît-il sur Google Maps quand on cherche un cabinet proche ?`,
      a: `Votre fiche Google doit porter la catégorie ostéopathe, l’adresse exacte du cabinet, les horaires, un numéro de téléphone et le lien de prise de rendez-vous. Ajoutez des photos de la salle d’attente, de la cabine et de l’accès, avec le stationnement et l’étage : un patient qui souffre du dos veut savoir s’il peut monter. Sachez que les avis de patients sont encadrés par la déontologie ; ne les sollicitez pas de façon insistante, ne publiez pas de détails médicaux et répondez de manière neutre, sans confirmer qu’une personne est votre patiente.`,
    },
    {
      q: `Quelle adresse e-mail professionnelle choisir pour échanger avec mes patients ?`,
      a: `Une adresse à votre nom de domaine, du type cabinet@ ou votre nom suivi du domaine, vous distingue d’une boîte personnelle et donne un cadre à la relation. Évitez d’y échanger des informations de santé détaillées par message courant : orientez le patient vers le téléphone ou la consultation pour les questions médicales, et réservez l’e-mail à l’organisation, aux horaires et aux confirmations. Choisissez une messagerie qui protège l’accès par mot de passe robuste et double vérification, puisque votre boîte contient des données sensibles.`,
    },
    {
      q: `Que faut-il écrire sur mes factures et mes notes d’honoraires de patients ?`,
      a: `Après chaque consultation, le patient reçoit un document qui lui permet de demander un remboursement à sa mutuelle, si son contrat prévoit l’ostéopathie. Il comporte votre identité, votre numéro d’enregistrement professionnel, la date, l’acte et le montant réglé. Un modèle prérempli, généré depuis l’agenda, évite de tout retaper en fin de journée. Les règles précises sur la forme des justificatifs et la comptabilité dépendent de votre statut ; vérifiez-les auprès de votre comptable ou sur service-public.fr plutôt que sur un modèle recopié d’un confrère.`,
    },
    {
      q: `Peut-on envoyer des rappels de rendez-vous pour réduire les patients qui ne viennent pas ?`,
      a: `Oui, c’est l’automatisation qui rapporte le plus à un cabinet, où chaque créneau vide est du temps perdu. Un message part la veille avec l’heure, l’adresse et un lien pour confirmer ou annuler en un geste. Si le patient annule, le créneau se libère et peut être proposé à une personne en attente. Pour les consultations de suivi, un message après quelques semaines peut proposer de reprendre rendez-vous sans insister. Limitez-vous à l’organisation : aucun conseil médical personnalisé ne doit partir automatiquement.`,
    },
    {
      q: `Quelles photos et quels contenus mettre sur le site sans me placer hors déontologie ?`,
      a: `Montrez le cabinet, votre portrait professionnel, la table de soin et le parcours d’une consultation. Expliquez votre approche et vos domaines : nourrissons, sportifs, femmes enceintes, douleurs du quotidien. N’affichez ni photos avant et après, ni promesses de guérison, ni témoignages de patients, ni comparaison avec des confrères : la publicité de la profession est encadrée. Les réseaux sociaux se limitent à de la pédagogie générale, comme la posture au bureau. En cas de doute, appuyez-vous sur les règles de votre organisme professionnel.`,
    },
    {
      q: `Comment avoir plus de patients quand on s’installe comme ostéopathe dans une petite ville ?`,
      a: `Soignez d’abord les recherches locales : fiche Google complète, site avec une page par motif de consultation et votre commune en toutes lettres. Rédigez des pages qui répondent à des questions précises, par exemple le déroulé d’une première séance ou la prise en charge par les mutuelles. Inscrivez-vous aux annuaires professionnels de votre secteur, aux associations de commerçants et aux réseaux de santé locaux. Le bouche-à-oreille reste le premier canal ; le site sert à confirmer et à faciliter la prise de rendez-vous, à toute heure.`,
    },
    {
      q: `Quelles mentions et obligations pour le site d’un cabinet d’ostéopathie ?`,
      a: `Outre les mentions légales de tout professionnel, le site d’un ostéopathe mentionne généralement son titre, son numéro d’enregistrement auprès de l’agence régionale de santé et l’adresse du cabinet. Le titre est protégé : n’affichez que ce que vous avez le droit d’utiliser. Les données de santé recueillies lors d’une prise de rendez-vous demandent une vigilance particulière avec le RGPD, tant sur l’hébergement que sur la durée de conservation. Renseignez-vous sur le site de la CNIL, de l’ARS de votre région et de votre ordre ou syndicat professionnel.`,
    },
  ],

  'institut-beaute': [
    {
      q: `Que faire pour que mon institut de beauté ressorte sur Google Maps dans mon quartier ?`,
      a: `Complétez la fiche Google avec la catégorie institut de beauté, vos horaires exacts, vos jours de fermeture et un lien de prise de rendez-vous. Listez chaque soin, sa durée et son tarif dans la rubrique des services, plutôt qu’une longue liste dans la description. Ajoutez des photos de la cabine, de la devanture et de l’équipe, mais aucune image de cliente sans accord écrit. Invitez vos habituées à laisser un avis après un soin, et répondez avec chaleur, sans jamais citer ce qui a été fait à une personne précise.`,
    },
    {
      q: `Faut-il une adresse e-mail à mon nom de domaine pour mon salon d’esthétique ?`,
      a: `Oui, car elle sert pour les confirmations de rendez-vous, les bons cadeaux et les échanges avec vos fournisseurs de produits. Une adresse reprenant le nom de l’institut, par exemple bonjour@ ou rdv@, fait plus sérieux qu’un nom de famille suivi d’un fournisseur gratuit et se retrouve à coup sûr sur vos factures et cartes. Si une collaboratrice rejoint l’équipe, vous lui créez sa boîte sans changer de domaine ; si elle part, vous la fermez, et votre clientèle conserve la même adresse pour vous écrire.`,
    },
    {
      q: `Comment présenter mes forfaits et mes devis de mariage ou d’événement plus rapidement ?`,
      a: `Préparez des fiches types : soins visage et corps, épilation, maquillage d’une mariée avec essai, forfait pour un groupe de témoins. Pour chaque fiche, indiquez la durée, ce qui est inclus, l’acompte demandé et les conditions de report. Le site peut recueillir la date, le lieu et le nombre de personnes, afin que vous répondiez avec un devis clair le jour même. Pour les forfaits de plusieurs séances, la facture doit mentionner chaque prestation ; vérifiez la forme exacte avec votre comptable ou sur service-public.fr.`,
    },
    {
      q: `Que peut-on automatiser pour remplir mon agenda et limiter les rendez-vous manqués ?`,
      a: `Le rappel de rendez-vous par SMS ou e-mail la veille est le geste qui change le plus : la cliente confirme ou décale en un geste, et le créneau se libère à temps. Après un soin, un message peut conseiller l’entretien à la maison, puis proposer le prochain rendez-vous au bon moment, par exemple quand l’épilation repousse. Avant les fêtes, vous prévenez les clientes inscrites que les bons cadeaux sont en vente. Tout cela part sans que vous interrompiez un soin pour répondre au téléphone.`,
    },
    {
      q: `Quelles photos montrer d’un institut de beauté sans mettre mes clientes mal à l’aise ?`,
      a: `Mettez en avant le lieu : la cabine propre et lumineuse, le matériel, les produits rangés, la devanture. Un portrait de l’équipe en tenue de travail instaure la confiance avant la première visite. Pour les résultats, privilégiez des mains, des ongles ou un regard maquillé, avec l’accord écrit de la personne, et évitez les images de corps ou les comparatifs avant-après trop appuyés. Publiez des photos prises dans votre cabine plutôt que des visuels de marque : elles montrent ce qu’on trouvera vraiment.`,
    },
    {
      q: `Pourquoi mon institut n’apparaît-il pas quand on cherche une esthéticienne près de chez soi ?`,
      a: `La recherche d’une esthéticienne se joue d’abord sur la proximité, les avis et la fiche Google, ensuite sur le site. Vérifiez que la catégorie, l’adresse et les horaires sont justes, puis donnez à chaque soin sa propre page avec le nom de votre ville. Un site qui liste dix prestations dans un seul paragraphe ne répond à aucune requête précise. Relevez aussi votre adresse sur les annuaires locaux et assurez-vous qu’elle est écrite de la même façon partout. La progression se mesure en mois, pas en jours.`,
    },
    {
      q: `Quelles règles faut-il suivre sur le site d’un institut, notamment pour les soins ?`,
      a: `Affichez les mentions légales, l’identité de l’entreprise, vos conditions de vente pour les produits et bons cadeaux, ainsi que la politique de confidentialité. Un questionnaire de santé avant un soin concerne des données sensibles : ne demandez que le nécessaire, expliquez à quoi il sert et n’en gardez pas plus que besoin. L’exercice de l’esthétique suppose des qualifications et des règles d’hygiène ; ne promettez pas de résultats médicaux. Consultez service-public.fr, la CNIL et la fédération professionnelle de votre métier pour vérifier chaque point.`,
    },
  ],

  'photographe': [
    {
      q: `Comment un photographe sort-il sur Google Maps pour un portrait ou un mariage ?`,
      a: `Si vous recevez en studio, votre fiche affiche l’adresse, les horaires et la catégorie photographe ; si vous travaillez surtout en déplacement, indiquez plutôt votre zone et masquez l’adresse de votre domicile. Une galerie de photos de la fiche fonctionne comme une vitrine : choisissez vos meilleures images par univers, avec une légende. Demandez un avis aux mariés quelques semaines après la remise des photos, quand l’émotion est encore là, et répondez à chaque message en remerciant sans révéler de détails sur la séance.`,
    },
    {
      q: `Domaine au nom du photographe ou au nom du studio : que choisir ?`,
      a: `Votre nom propre est souvent le meilleur choix pour un indépendant, car les clients se souviennent de la personne et la cherchent par son nom. Si vous pensez créer un studio ou embaucher, un nom de marque se transmet plus facilement. Dans les deux cas, créez une adresse e-mail sur ce domaine pour les envois de galeries et de devis : un lien de téléchargement envoyé depuis une adresse gratuite peut être pris pour un message frauduleux. Votre adresse peut aussi figurer sur vos tirages comme signature.`,
    },
    {
      q: `Comment faire un devis et un contrat de photo plus rapidement, droits d’auteur compris ?`,
      a: `Créez un devis type par univers : mariage, portrait, entreprise, événement. Chaque modèle précise la durée de couverture, le nombre approximatif d’images livrées, les retouches, la livraison et l’usage autorisé des photos. Cette dernière ligne compte : les droits d’auteur appartiennent au photographe, et la cession à un client doit être écrite et délimitée. Un formulaire de demande bien conçu collecte la date, le lieu et le besoin, ce qui raccourcit les échanges. Faites relire votre contrat par un professionnel du droit ou renseignez-vous sur service-public.fr.`,
    },
    {
      q: `Peut-on automatiser l’envoi des galeries, des relances de paiement et des demandes d’avis ?`,
      a: `Oui, plusieurs étapes se répètent à chaque dossier. Le jour de la séance, un message récapitule les consignes ; une fois les photos prêtes, la galerie privée part avec son code d’accès ; si l’acompte ou le solde est en attente, une relance polie suit. Quelques semaines plus tard, une demande d’avis sort toute seule. Pour un mariage, un rappel de questionnaire sur le déroulé de la journée évite d’oublier un moment clé. Vous consacrez votre temps à l’image plutôt qu’à la gestion des courriels.`,
    },
    {
      q: `Quelles photos choisir pour mon portfolio et que publier sur les réseaux sociaux ?`,
      a: `Montrez peu d’images, mais celles qui ressemblent à ce que vous voulez vendre : un mariage si vous voulez faire des mariages, pas un mélange de tout. Classez-les par univers et gardez des séries complètes qui prouvent que vous tenez une journée entière, pas seulement des clichés isolés. Les réseaux sociaux servent à montrer les coulisses et les nouveautés ; le site reste la vitrine stable. Obtenez l’accord des personnes reconnaissables avant de publier, surtout des enfants, et signalez dans vos conditions comment vos images peuvent être utilisées.`,
    },
    {
      q: `Pourquoi mon portfolio de photographe reste-t-il invisible sur Google malgré de belles images ?`,
      a: `Google lit surtout du texte : une galerie sans titre, sans légende ni description ne dit pas de quoi elle parle. Donnez à chaque page un intitulé précis comme photographe de mariage et le nom de votre département, ajoutez des textes qui racontent une séance et nommez vos fichiers d’images de manière lisible. Les images lourdes ralentissent le chargement, ce qui pénalise la recherche sur mobile. Faites enfin parler de vous : blogs de mariage, lieux de réception, partenaires locaux qui renvoient vers votre site.`,
    },
    {
      q: `Quelles obligations légales pour un site de photographe : droit à l’image et mentions ?`,
      a: `Outre les mentions légales et la politique de confidentialité, le site d’un photographe pose deux questions propres au métier. D’abord le droit à l’image : publier une personne reconnaissable demande son accord, et celui des parents pour un enfant. Ensuite la propriété de vos photos : indiquez votre nom comme auteur et les conditions d’utilisation. Les galeries privées contiennent des données personnelles, donc à protéger et à supprimer après un délai raisonnable. Vérifiez les règles précises sur service-public.fr et cnil.fr, sans vous fier à un modèle copié.`,
    },
  ],

  'fleuriste': [
    {
      q: `Comment une fleuriste apparaît-elle dans Google Maps quand on cherche un bouquet maintenant ?`,
      a: `Une personne qui cherche un bouquet le jour même tape fleuriste et regarde qui est ouvert. Votre fiche doit donc afficher des horaires exacts, y compris les jours fériés et la veille de la fête des Mères ou de la Saint-Valentin, que Google permet de renseigner en horaires spéciaux. Choisissez fleuriste en catégorie principale, ajoutez les services comme livraison et retrait en boutique, et publiez des photos de votre vitrine et de bouquets de saison. Répondez aux avis, notamment après un deuil ou un mariage, avec délicatesse.`,
    },
    {
      q: `Quelle adresse e-mail utiliser pour les commandes de mariage et les demandes d’entreprises ?`,
      a: `Une adresse du type commandes@ ou mariage@ sur votre propre domaine met de l’ordre dans la boutique : les demandes de décoration florale ne se mélangent pas avec les messages de fournisseurs. Un mariage se prépare des mois avant ; la future mariée doit retrouver facilement votre échange, sans qu’il soit noyé dans une boîte personnelle. Pour les entreprises qui commandent des bouquets pour des accueils, la même adresse peut recevoir les bons de commande et servir à envoyer les factures en fin de mois.`,
    },
    {
      q: `Comment faire un devis de décoration florale pour un mariage sans y passer ses soirées ?`,
      a: `Construisez une grille de base : bouquet de la mariée, boutonnières, décorations de table, arche, voiture, avec une ligne par élément et la quantité modifiable. Le formulaire du site demande la date, le lieu, le nombre de tables, les couleurs souhaitées et des photos d’inspiration, ce qui permet de chiffrer sans premier rendez-vous. Rappelez que les fleurs dépendent de la saison et des arrivages : prévoyez une clause de remplacement équivalent. Précisez l’acompte, les conditions d’annulation et la reprise du matériel prêté, comme les vases.`,
    },
    {
      q: `Que peut-on automatiser dans une boutique de fleurs : rappels de dates, commandes, relances ?`,
      a: `Les occasions reviennent chaque année : anniversaire, fête des Mères, anniversaire de mariage. Un client peut enregistrer une date et recevoir un rappel quelques jours avant pour commander en deux gestes. Les commandes en ligne arrivent directement dans un tableau, avec l’heure et l’adresse de livraison, et le client reçoit un message quand le bouquet part. Pour un abonnement de fleurs à une entreprise ou un restaurant, la préparation hebdomadaire est planifiée. Vous gagnez en calme les jours de pointe, quand le téléphone sonne sans arrêt.`,
    },
    {
      q: `Quelles photos de bouquets mettre en ligne et comment les renouveler au fil des saisons ?`,
      a: `Photographiez vos bouquets à la lumière du jour, sur un fond neutre, avec une petite main ou un vase pour donner l’échelle. Montrez les pivoines au printemps, les dahlias en fin d’été, les branches et les baies en hiver : votre site doit suivre ce que vous avez réellement au comptoir. Une fleur qui n’est plus de saison déçoit à la livraison. Ajoutez des séries de mariages et de deuils traitées avec pudeur, après accord des familles. Un compte social alimenté chaque semaine prolonge la vitrine, sans la remplacer.`,
    },
    {
      q: `Comment attirer plus de clients dans ma boutique de fleurs en dehors des fêtes ?`,
      a: `Les grosses dates remplissent la boutique toutes seules ; le reste de l’année se construit avec des habitudes. Proposez des abonnements pour les entreprises, les restaurants et les cabinets, des bouquets du vendredi pour les week-ends, des ateliers de composition. Sur Google, faites ressortir ces services dans votre fiche et dans des pages dédiées de votre site, avec le nom de votre ville. Des liens avec les organisateurs de mariages, les pompes funèbres et les salles de réception de votre secteur apportent des commandes régulières.`,
    },
    {
      q: `Quelles mentions légales et règles de vente à distance pour un site de fleuriste ?`,
      a: `Un site qui vend en ligne affiche l’identité du vendeur, les prix toutes taxes comprises, les frais de livraison, les conditions de vente et un moyen de contacter la boutique. Pour la vente à distance, le droit de rétractation connaît des exceptions, notamment pour les produits qui se périment rapidement ; indiquez clairement ce qui s’applique à vos fleurs et à vos objets durables. La livraison au mauvais endroit ou en retard doit avoir une procédure. Vérifiez chaque règle sur economie.gouv.fr et service-public.fr avant de rédiger vos conditions.`,
    },
  ],

  'gite-location-saisonniere': [
    {
      q: `Comment mon gîte ressort-il dans Google Maps pour les vacanciers de la région ?`,
      a: `Pour un hébergement, Google propose des catégories adaptées, comme gîte ou location de vacances. Choisissez celle qui correspond le mieux, indiquez l’adresse, un numéro de téléphone et le lien de votre site. Les photos font l’essentiel du travail : séjour, chambres, cuisine, jardin, vue, et les environs qui donnent envie de venir. Gardez le calendrier à jour et répondez à chaque avis de vacanciers, y compris les critiques sur le chauffage ou le bruit. Un hôte qui répond avec calme rassure beaucoup plus qu’un dossier parfait.`,
    },
    {
      q: `Quelle adresse e-mail professionnelle pour un gîte et faut-il un nom de domaine ?`,
      a: `Oui, car votre location a un nom, et ce nom doit se retrouver partout : site, contrat, facture, adresse de contact. Une adresse comme contact@nom-du-gite évite qu’un locataire écrive à une boîte personnelle d’où votre réponse partirait mêlée à vos courriers privés. Elle sert aussi à envoyer le contrat de location, le livret d’accueil et la facture. Si vous vendez ou confiez la gestion à quelqu’un, le domaine et la boîte se transmettent avec le gîte, ce qui n’est pas possible avec une page de plateforme.`,
    },
    {
      q: `Comment rédiger un contrat de location saisonnière et un acompte sans erreur ?`,
      a: `Un contrat de location reprend l’identité des parties, la description du logement, les dates, le prix du séjour, les charges, le montant de l’acompte, la caution éventuelle et les conditions d’annulation. Gardez un modèle que vous adaptez à chaque réservation, avec les dates et le nombre de personnes prérempli depuis la demande. Le site peut collecter ces informations et générer un document prêt à envoyer. La forme exacte et les mentions obligatoires dépendent de votre situation : vérifiez-les sur service-public.fr ou auprès de votre comptable.`,
    },
    {
      q: `Quels messages automatiques envoyer à mes locataires avant, pendant et après le séjour ?`,
      a: `Trois moments suffisent. Avant l’arrivée, un message avec le plan d’accès, l’heure de remise des clés ou le code de la boîte et le contact en cas de retard. Pendant le séjour, une courte question pour savoir si tout va bien, afin de régler tout de suite un problème de chaudière ou de wifi. Après le départ, un remerciement, une demande d’avis et l’annonce des disponibilités de l’été prochain. Vous n’avez plus à retaper le même texte à chaque changement de locataires, un samedi entre deux ménages.`,
    },
    {
      q: `Quelles photos et quels contenus montrer pour qu’une famille choisisse mon gîte ?`,
      a: `Photographiez toutes les pièces, de jour, rangées, y compris la salle d’eau et les lits avec leur taille, car les familles comptent les couchages. Montrez l’extérieur : terrasse, barbecue, jeux d’enfants, stationnement. Ajoutez une carte avec les commerces, les sentiers et les visites à proximité, et les images de la région au fil des saisons. Un petit texte honnête sur ce qui est moins pratique, comme une route étroite ou l’absence de commerce à pied, limite les déceptions et les mauvais avis.`,
    },
    {
      q: `Pourquoi les vacanciers ne trouvent-ils mon gîte que sur Airbnb et pas sur Google ?`,
      a: `Une plateforme concentre des millions de visites et une annonce y apparaît de façon immédiate ; un site indépendant doit se faire connaître. Il doit répondre aux requêtes de vacanciers, du type gîte avec piscine ou location pour six personnes près d’un château, en nommant la commune et la région. Reliez-le à votre fiche Google, demandez à l’office de tourisme de renvoyer vers lui et présentez des photos qui lui sont propres. Gardez vos annonces sur les plateformes en complément : elles apportent des vacanciers que vous fidélisez ensuite.`,
    },
    {
      q: `Que dois-je déclarer et afficher légalement pour louer un gîte en meublé de tourisme ?`,
      a: `La location d’un meublé de tourisme suppose généralement une déclaration en mairie, et dans certaines communes un numéro d’enregistrement à afficher sur les annonces. Le classement en étoiles est facultatif mais encadré, et la taxe de séjour se collecte selon des règles locales. Sur le site, ajoutez les mentions légales, vos conditions de réservation et la politique de confidentialité. Ces règles changent et varient selon la commune ; renseignez-vous sur service-public.fr, auprès de votre mairie et de votre office de tourisme.`,
    },
  ],

  'kebab-fast-food': [
    {
      q: `Comment mon fast-food ressort-il sur Google Maps quand quelqu’un cherche à manger tout de suite ?`,
      a: `Dans la fiche Google, choisissez la catégorie qui vous décrit au plus près, par exemple restaurant de kebab ou fast-food, et ajoutez celles de la vente à emporter ou de la livraison si vous les proposez. Les horaires exacts, y compris la fermeture du dimanche et les jours fériés, évitent les clients qui arrivent devant un rideau baissé. Mettez des photos de vos sandwichs, du comptoir et de la devanture, ainsi que le menu. Répondez à tous les avis, même vexants, sans polémique : les nouveaux clients lisent les réponses.`,
    },
    {
      q: `Ai-je besoin d’une adresse e-mail professionnelle pour mon snack ou mon kebab ?`,
      a: `Oui, pour tout ce qui sort du comptoir : commandes de groupe, demandes de comités d’entreprise, factures de fournisseurs, échanges avec la mairie ou le bailleur. Une adresse sur le domaine de votre site, du type commande@ ou contact@, se transmet à un associé ou à un employé sans partager vos messages privés. Elle sert aussi à recevoir les notifications de commande en ligne, dans une boîte qui n’est pas celle de votre vie privée. Si vous changez de téléphone, vous gardez tout.`,
    },
    {
      q: `Comment établir plus vite un devis pour un repas d’entreprise ou une soirée de club ?`,
      a: `Gardez deux ou trois formules prêtes pour les groupes : plateaux de sandwichs, buffet, menu par personne avec boisson. Un devis type précise le nombre de convives, la date, l’heure de retrait ou de livraison, les allergies connues et le règlement. Le formulaire du site peut demander ces informations avant même votre rappel. Fixez un nombre minimum et un délai de commande raisonnable pour pouvoir vous organiser. Sur la forme des devis et factures, reportez-vous à service-public.fr plutôt qu’à un modèle trouvé au hasard.`,
    },
    {
      q: `Que peut-on automatiser pour éviter les appels pendant le coup de feu ?`,
      a: `Une commande en ligne reçue directement sur l’écran de la cuisine évite le téléphone qui sonne à midi. Le client choisit ses ingrédients, son créneau de retrait et paie ; il reçoit une confirmation avec l’heure prévue. Si le temps d’attente s’allonge, vous pouvez limiter le nombre de commandes par quart d’heure plutôt que de promettre l’impossible. Un message de relance peut aussi annoncer le menu du jour à ceux qui l’ont accepté. Tout cela se règle une fois, puis tourne tout seul pendant le service.`,
    },
    {
      q: `Quelles photos de plats mettre en ligne pour donner faim sans mentir sur la portion ?`,
      a: `Photographiez vos vrais sandwichs et vos assiettes au comptoir, à la lumière du jour, avec la portion que le client recevra. Une image trop retouchée provoque des avis déçus. Montrez le produit coupé, la broche, le pain en cours de préparation, ainsi que l’équipe : cela rassure sur la fraîcheur. Photographiez aussi la carte, les formules et les boissons, lisibles sur téléphone. Les réseaux sociaux servent à annoncer les nouveautés et les horaires de soirée ; le site reste la source où le client retrouve le prix et le menu à jour.`,
    },
    {
      q: `Comment avoir plus de clients que le snack d’à côté sans casser mes prix ?`,
      a: `Occupez les requêtes de proximité : kebab ouvert tard, snack près de la gare, burger à emporter dans votre quartier. Le site doit mentionner la ville, les horaires et la carte sur la première page ; la fiche Google, avec ses avis récents, pèse autant que lui. Distinguez-vous par ce que vous faites mieux : pain maison, sauces préparées sur place, viande d’origine précisée si vous pouvez le prouver. Un menu étudiant ou un menu du midi pour les entreprises voisines fidélise sans brader chaque sandwich.`,
    },
    {
      q: `Quelles obligations légales pour le site d’un restaurant rapide : allergènes, prix, mentions ?`,
      a: `Le site, comme le comptoir, doit renseigner les informations dues au consommateur : prix toutes taxes comprises, présence des allergènes réglementés pour les plats, identité de l’exploitant et mentions légales. Si vous prenez des commandes en ligne, ajoutez les conditions de vente et la politique de confidentialité. La vente à emporter et la livraison obéissent à des règles d’hygiène et d’affichage. Vérifiez la liste exacte des obligations sur economie.gouv.fr et service-public.fr, et demandez conseil à votre chambre de commerce ou à la direction départementale de la protection des populations.`,
    },
  ],

  'food-truck': [
    {
      q: `Comment un food truck peut-il être trouvé sur Google Maps alors qu’il change d’emplacement ?`,
      a: `Créez une fiche d’établissement mobile, sans adresse affichée, en indiquant les zones où vous servez. Quand vous êtes sur un emplacement fixe certains jours, renseignez des horaires précis et publiez des actualités avec le lieu du jour et l’heure d’arrivée. Choisissez la catégorie qui correspond à votre cuisine, comme restauration rapide ou camion de cuisine de rue. Ajoutez des photos du camion, du menu et de la file d’attente un jour de marché. Les avis des clients récents dissipent le doute : le camion existe et il sert vraiment.`,
    },
    {
      q: `Quelle adresse e-mail et quel nom de domaine pour un camion de cuisine de rue ?`,
      a: `Le nom du camion, tel qu’il est peint sur la carrosserie, fait un bon nom de domaine : on le lit sur le véhicule, on le retape facilement chez soi. Créez une adresse du type contact@ pour les organisateurs, les mairies et les gestionnaires de zones, et gardez-la distincte de votre messagerie personnelle. Une adresse sérieuse facilite l’obtention des emplacements, qui se négocient souvent par écrit avec des services municipaux. Elle figure sur votre devis, vos factures et vos cartes de visite.`,
    },
    {
      q: `Comment établir un devis pour un mariage ou un événement privé avec mon camion ?`,
      a: `Définissez vos formules d’événement : prix par convive, nombre minimum de portions, durée de service, électricité et accès nécessaires pour le camion. Le devis précise la date, le lieu, la surface d’installation, le menu choisi, les boissons et les conditions d’annulation, notamment en cas de météo. Le formulaire du site demande ces éléments dès le départ, ce qui évite les allers-retours avec l’organisateur. Prévoyez un acompte pour bloquer la date. Les règles de forme d’un devis se vérifient sur service-public.fr.`,
    },
    {
      q: `Comment prévenir automatiquement mes clients de mon emplacement du jour ou d’une annulation ?`,
      a: `Votre planning se met à jour une fois et se répète partout : sur le site, sur la fiche Google et dans un message envoyé aux abonnés qui l’ont demandé. Si vous annulez à cause d’un orage, une alerte part le matin même plutôt que d’obliger chacun à consulter vos réseaux. Pour les précommandes, un client peut réserver ses plats avant d’arriver et les retirer sans attendre. Vous gardez la main sur les quantités préparées, un point précieux quand la marchandise doit être fraîche chaque jour.`,
    },
    {
      q: `Quelles photos du camion et des plats donnent confiance aux organisateurs d’événements ?`,
      a: `Montrez le camion dans différents décors, de jour comme en soirée, avec l’équipe en tenue, l’espace de travail propre et la file de clients. Pour un organisateur, la présentation compte autant que le goût : un camion soigné rassure sur le sérieux de l’exploitant. Ajoutez des images du menu complet, des dimensions du véhicule et des besoins techniques. Si vous avez servi lors d’un événement, citez-le avec l’accord de l’organisateur. Évitez les photos prises de loin, floues ou de nuit, qui donnent une idée brouillonne.`,
    },
    {
      q: `Comment trouver plus de marchés et de soirées quand on démarre avec un food truck ?`,
      a: `Les organisateurs cherchent un camion avec une requête précise, souvent le nom de leur ville. Une page par type d’événement, marché, mariage, entreprise ou festival, avec vos conditions et un formulaire, leur évite de vous écrire dans le vide. Contactez directement les mairies, les comités des fêtes, les gestionnaires de zones d’activités et les salles de réception de votre secteur. Un dossier de présentation à jour, avec le menu, les besoins électriques et l’assurance, vous distingue de camions qui répondent sans détail.`,
    },
    {
      q: `Quelles autorisations et obligations légales pour le site et l’activité d’un food truck ?`,
      a: `L’activité ambulante suppose une autorisation d’occupation du domaine public délivrée par la commune pour chaque emplacement, ainsi que des règles d’hygiène et de formation propres à la restauration. Le site affiche, comme tout professionnel, les mentions légales, les prix toutes taxes comprises, les allergènes des plats et, si vous vendez en ligne, les conditions de vente. Les exigences changent selon la commune et le type d’événement. Renseignez-vous auprès de la mairie, de la chambre de commerce et sur service-public.fr avant d’annoncer un emplacement.`,
    },
  ],

  'brasserie-bar': [
    {
      q: `Comment une brasserie attire-t-elle les clients sur Google Maps pour déjeuner ou boire un verre ?`,
      a: `Choisissez la catégorie qui correspond à votre fonctionnement, brasserie ou bar, et ajoutez les attributs que Google propose, comme terrasse, groupes ou retransmission de matchs. Les horaires doivent distinguer la cuisine du bar, puisque l’un ferme avant l’autre. Ajoutez des photos de la salle, de la terrasse, de la carte et de plats servis un jour ordinaire. Le menu du jour et les événements peuvent se publier comme actualités. Répondez aux avis avec courtoisie, en particulier ceux qui parlent de l’attente ou du bruit.`,
    },
    {
      q: `Comment gérer le nom de domaine et les adresses e-mail de mon bar-brasserie ?`,
      a: `Prenez le nom que l’établissement porte sur la devanture, puis créez des adresses séparées : reservation@ pour les tables, evenements@ pour les privatisations, compta@ pour vos factures et fournisseurs. Cette organisation évite que la demande d’un groupe de vingt personnes disparaisse sous une commande de fûts. Si le gérant change, le domaine et les boîtes restent avec le fonds de commerce. Elle facilite aussi la communication avec les brasseurs, les brasseries partenaires et les associations qui organisent leurs soirées chez vous.`,
    },
    {
      q: `Comment faire un devis rapide pour une privatisation, un anniversaire ou un afterwork ?`,
      a: `Préparez des formules : apéritif dînatoire, repas assis, forfait boissons, location de la salle. Pour chacune, indiquez le nombre de convives minimum, la durée, ce qui est inclus et l’acompte demandé. Le formulaire du site recueille la date, l’effectif, l’occasion et les contraintes alimentaires, de sorte que votre réponse part avec un devis précis. Précisez les conditions d’annulation et l’heure de fermeture. Pour les mentions d’un devis ou d’une facture, vérifiez sur service-public.fr ou demandez à votre comptable.`,
    },
    {
      q: `Peut-on automatiser les réservations de tables et les rappels le soir d’un match ?`,
      a: `Oui. Un formulaire de réservation avec choix du nombre de couverts et du créneau alimente un planning que vous consultez depuis le comptoir. Le client reçoit une confirmation et un rappel, et peut annuler en un clic, ce qui libère la table. Les soirs de grande affluence, vous fermez les réservations dès que la salle est complète. Pour les retransmissions sportives, un message prévient vos habitués que la salle ouvre plus tôt. Moins d’appels pendant le service, moins de tables vides qui avaient pourtant été réservées.`,
    },
    {
      q: `Quelles photos montrer pour une brasserie : ambiance, carte des bières, équipe ?`,
      a: `Montrez la salle à deux moments, le midi lumineux et le soir plus intime, car vous accueillez deux clientèles. Photographiez la tireuse, les verres servis, les bouteilles et les plats les plus commandés avec un éclairage naturel. Ajoutez l’équipe, le patron et les serveurs : un lieu de convivialité se reconnaît à ses visages. Évitez de publier des clients identifiables sans leur accord, surtout en soirée. Sur les réseaux, annoncez les soirées, les nouvelles bières et les concerts, mais conservez la carte à jour sur le site.`,
    },
    {
      q: `Comment une brasserie remplit-elle sa salle un mardi soir creux ?`,
      a: `Proposez une raison précise de venir ce soir-là : soirée jeux, quiz, dégustation d’une brasserie locale, plat du mardi. Annoncez-la sur le site, sur la fiche Google et auprès des groupes de votre secteur : associations, clubs de sport, entreprises voisines pour leurs afterworks. Une page dédiée aux groupes avec capacités, formules et un formulaire de demande vous rend visible quand les organisateurs cherchent une salle. Les avis récents qui citent ces soirées renforcent le cercle : on vient parce que d’autres sont venus.`,
    },
    {
      q: `Quelles règles propres aux bars et brasseries faut-il respecter sur le site internet ?`,
      a: `Le site affiche les mentions légales, les prix de la carte toutes taxes comprises, les allergènes pour les plats et la politique de confidentialité si vous collectez des réservations. L’alcool est un cas particulier : la licence nécessaire dépend de votre établissement, la publicité pour les boissons alcoolisées est strictement encadrée et la vente aux mineurs est interdite. Ne rédigez pas vos textes de promotion sans vérifier ces limites. Consultez service-public.fr, votre mairie, la préfecture et la chambre de commerce pour les règles à jour.`,
    },
  ],
}
