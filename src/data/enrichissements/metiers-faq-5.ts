import type { ContenuLocal } from './types'

export const FAQ_METIERS: Record<string, ContenuLocal['faq']> = {
  'jardinerie-animalerie': [
    {
      q: `Comment ma jardinerie ressort-elle sur Google Maps quand on cherche une animalerie ?`,
      a: `Sur votre fiche Google, choisissez comme catégorie principale celle qui pèse le plus dans votre activité, puis ajoutez des catégories secondaires pour le toilettage, les plantes ou l’alimentation animale. Renseignez les horaires du printemps, qui s’allongent, et les fermetures exceptionnelles. Ajoutez des photos des rayons, du bassin à poissons, de la serre. Répondez à chaque avis, y compris au client mécontent d’une plante qui n’a pas repris : une réponse posée rassure les suivants. Le site complète la fiche avec la page de chaque service.`,
    },
    {
      q: `Faut-il un nom de domaine à mon nom ou à celui du magasin ?`,
      a: `Prenez le nom sous lequel vos clients vous connaissent, celui de l’enseigne, pas un assemblage de mots-clés. Il doit se dicter facilement au comptoir et s’épeler sans hésitation. Gardez le même nom pour l’adresse e-mail professionnelle, par exemple contact@ suivi de votre domaine : c’est plus crédible qu’une boîte grand public sur les devis de collectivités ou de fournisseurs. Réservez aussi les variantes proches si le nom est courant. Le domaine reste à votre nom : vérifiez qu’il est enregistré à votre titre, pas à celui du prestataire.`,
    },
    {
      q: `Comment faire plus vite les devis pour un aménagement de massifs ou de bassin ?`,
      a: `Préparez un modèle avec vos lignes habituelles : fourniture des végétaux, terreau, paillage, main-d’œuvre, livraison. Un logiciel de devis et de facturation, même simple, reprend vos références et évite de tout retaper. Sur une facture, vérifiez les mentions obligatoires auprès de service-public.fr : identité du vendeur, désignation des produits, conditions de règlement. Le site peut recueillir en amont les informations utiles, comme la surface du terrain, l’exposition ou le type de sol, pour que le premier chiffrage parte sans appel de précision.`,
    },
    {
      q: `Que peut-on automatiser dans une jardinerie sans perdre le contact avec les clients ?`,
      a: `Trois choses ont du sens : l’alerte sur les arrivages de plants ou de semences, pour les clients qui s’inscrivent, le rappel du rendez-vous de toilettage la veille, et la relance d’une commande passée en ligne et non retirée. Le conseil au rayon, lui, ne s’automatise pas, et c’est ce qui vous distingue d’une grande surface. Mieux vaut peu d’automatismes bien réglés, avec la possibilité de vous joindre par téléphone, que des messages envoyés à tout le monde sans distinction.`,
    },
    {
      q: `Quelles photos montrer sur le site d’une jardinerie-animalerie, et faut-il Instagram ?`,
      a: `Montrez ce qu’on ne trouve pas sur un catalogue : la serre un matin de printemps, les étals de légumes en godets, un massif réalisé avec vos plants, le salon de toilettage. Prenez la lumière du jour, au lieu des néons du magasin. Pour les animaux, demandez l’accord avant de photographier un client avec le sien. Instagram convient aux saisons, aux nouveautés et aux animaux présentés à l’adoption ; sur le site, gardez les pages qui durent, avec les derniers posts affichés sans effort.`,
    },
    {
      q: `Pourquoi ma jardinerie reste-t-elle invisible sur « plantes près de chez moi » ?`,
      a: `Cette recherche s’appuie surtout sur la fiche Google et sur la proximité, moins sur le site lui-même. Vérifiez que l’adresse, les horaires et les catégories sont justes, puis donnez au site une page par univers : plantes d’intérieur, potager, aquariophilie, toilettage, avec la commune citée naturellement. Les contenus de saison, comme quoi planter en automne, attirent des lectures utiles. L’indexation prend du temps : ouvrez la Search Console, gratuite, pour voir ce que Google a compris de vos pages et ce qu’il ignore.`,
    },
    {
      q: `Quelles règles spécifiques s’appliquent au site d’une jardinerie qui vend aussi des animaux ?`,
      a: `En plus des mentions légales communes (identité, adresse, hébergeur, numéro d’immatriculation), la vente d’animaux de compagnie est encadrée : informations sur l’animal, identification, certificat de l’établissement. Les règles évoluent, donc lisez-les sur service-public.fr ou auprès de votre direction départementale de la protection des populations avant de rédiger vos annonces. Si le site recueille des noms et des e-mails, il lui faut une page de confidentialité claire, détaillée sur cnil.fr. N’affichez jamais une annonce que vous ne pouvez pas justifier.`,
    },
  ],

  'macon-renovateur': [
    {
      q: `Comment un maçon peut-il sortir sur Google Maps dans sa commune et autour ?`,
      a: `Créez ou revendiquez votre fiche Google, choisissez la catégorie qui décrit le mieux votre cœur de métier, maçon ou entreprise de rénovation, puis des catégories secondaires pour l’extension ou le carrelage si vous les faites. Si vous vous déplacez chez les clients, vous pouvez masquer l’adresse et indiquer vos communes. Ajoutez des photos de chantiers terminés. Les avis sont la clé : demandez-les à la réception des travaux, quand le client est satisfait, en lui envoyant le lien direct.`,
    },
    {
      q: `Une adresse e-mail professionnelle est-elle utile pour une entreprise de maçonnerie ?`,
      a: `Une adresse à votre nom de domaine, du type prenom@votre-entreprise, rassure un particulier qui envoie son projet et un architecte qui cherche un sous-traitant. Elle évite aussi le mélange avec votre courrier privé et vous permet de partager une boîte commune avec votre conjoint ou votre secrétaire, sans donner vos accès personnels. Prévoyez une signature avec raison sociale, SIRET et numéro de téléphone du chantier. Le nom de domaine doit rester à votre nom, pas à celui de celui qui l’a installé.`,
    },
    {
      q: `Comment établir des devis plus rapidement sans oublier le poste du gros œuvre ?`,
      a: `Construisez une bibliothèque de lignes types, terrassement, fondations, élévation de murs, enduit, évacuation des gravats, que vous ajustez chantier par chantier. Un logiciel de devis du bâtiment fait gagner du temps et sert aussi pour la facturation, avec les situations de travaux. Les mentions du devis et de la facture, dont l’assurance professionnelle, se vérifient sur service-public.fr. Un formulaire de demande sur le site, avec photos et description, vous évite un déplacement pour un projet qui ne vous concerne pas.`,
    },
    {
      q: `Peut-on automatiser les relances de devis et de situations de travaux ?`,
      a: `Oui, avec mesure. Une relance de devis envoyée quelques jours après, qui rappelle le projet et propose de répondre aux questions, convient à la plupart des clients. Pour les situations de travaux en retard de paiement, un rappel automatique courtois suivi d’un appel de votre part marche mieux que dix messages. Gardez à la main la relance des gros clients, comme les syndics ou les promoteurs. Évitez tout envoi automatique qui ne dépend pas de l’état réel du chantier, car il agace plus qu’il ne rappelle.`,
    },
    {
      q: `Comment montrer mes chantiers sans exposer la maison de mes clients ?`,
      a: `Demandez toujours l’accord écrit du client avant de publier une photo de son logement, même sans visage. Cadrez sur le travail : montée d’un mur, ouverture dans un porteur, dalle coulée, enduit fini, plutôt que sur l’intérieur. Évitez les plaques de rue et les numéros. Les séries avant, pendant, après sont les plus convaincantes. Sur les réseaux, un court récit d’un chantier de plusieurs semaines fidélise mieux qu’une photo isolée, et les avis Google confirment que vous êtes sérieux.`,
    },
    {
      q: `Mon site de maçon est en ligne mais personne ne m’appelle : que vérifier ?`,
      a: `Commencez par chercher votre métier avec votre commune sur Google : êtes-vous cité, sur la carte ou sur le site ? Si non, vérifiez que chaque prestation a sa page, extension, ouverture de mur, rénovation de façade, avec les communes desservies. Contrôlez ensuite que le numéro est cliquable sur mobile et que le formulaire fonctionne vraiment. Enfin, le bouche-à-oreille reste votre première source : mettez votre site sur le véhicule, les devis et les panneaux de chantier, et laissez le temps à Google d’indexer.`,
    },
    {
      q: `Quelles mentions légales et assurances un site de maçonnerie doit-il afficher ?`,
      a: `Les mentions communes à tout site professionnel : identité de l’entreprise, forme juridique, adresse, SIRET, contact, hébergeur. Pour le bâtiment, l’assurance de responsabilité décennale est à faire apparaître avec l’assureur et la zone couverte, mais le détail exact des obligations est à vérifier sur service-public.fr ou auprès de votre assureur. Si vous collectez des demandes de devis, une page de confidentialité indique comment vous traitez les données ; la cnil.fr donne les règles. Ne citez que les labels que vous détenez réellement.`,
    },
  ],

  'couvreur-charpentier': [
    {
      q: `Comment un couvreur se fait-il trouver sur Google Maps après une tempête ?`,
      a: `Soignez la fiche avant la saison des intempéries : catégorie principale couvreur, secondaire charpentier ou zingueur si vous en faites, horaires à jour et numéro qui répond. Ajoutez des photos de toitures terminées, ardoise, tuile, zinc, prises en sécurité depuis le sol ou par drone si vous y êtes autorisé. Après un épisode de vent ou de grêle, les recherches locales montent d’un coup : une fiche complète et des avis récents font passer votre entreprise avant celles qui ne sont pas à jour.`,
    },
    {
      q: `Quel nom de domaine et quelle e-mail choisir pour une entreprise de couverture ?`,
      a: `Un nom court qui reprend votre raison sociale ou votre nom, sans tiret superflu ni accent, se retient mieux quand on le lit sur la porte de la camionnette. Évitez d’y glisser « toiture pas cher » : il vieillit mal et fait amateur. Une adresse professionnelle sur ce domaine sert pour les devis envoyés aux particuliers et aux assureurs qui demandent des pièces après sinistre. Gardez l’adresse e-mail d’origine active quelque temps après tout changement, pour ne pas perdre les clients qui ont votre ancien contact.`,
    },
    {
      q: `Comment faire un devis de toiture plus vite sans me tromper sur les surfaces ?`,
      a: `Le gain vient d’un modèle qui sépare les postes : dépose, charpente, liteaunage, couverture, zinguerie, échafaudage, évacuation. Ajoutez les options fréquentes, comme l’isolation ou les fenêtres de toit, que vous proposez ou non. Un logiciel de devis du bâtiment calcule les surfaces à partir de vos relevés. Le formulaire du site peut demander dès le départ le type de toit, sa pente approximative et des photos de l’extérieur, pour vous permettre de répondre avant même de monter sur place. Les mentions obligatoires se vérifient sur service-public.fr.`,
    },
    {
      q: `Quels rappels automatiques ont du sens pour un couvreur-charpentier ?`,
      a: `Le rappel d’un rendez-vous de visite de toiture, avec l’heure et la consigne de laisser un accès à la trappe ou aux combles, évite les déplacements à vide. La relance d’un devis resté sans réponse est utile aussi. Pour l’entretien, démoussage ou contrôle annuel des solins, un message envoyé une fois par an aux clients qui l’ont accepté entretient la relation. En revanche, ne planifiez aucun envoi sans accord préalable : la cnil.fr rappelle les règles de prospection par e-mail.`,
    },
    {
      q: `Que montrer en photo sur un site de couvreur-charpentier, et comment gérer les avis ?`,
      a: `Privilégiez le contraste : une toiture mousseuse puis la même après réfection, la charpente en cours de levage, le détail d’un faîtage ou d’un solin que le client ne voit jamais. Précisez la matière et la nature du chantier en légende. Les photos prises en hauteur doivent respecter la sécurité et la vie privée des voisins. Pour les avis, demandez-les quand l’échafaudage est démonté et que le client est content ; répondez aussi aux remarques négatives, factuellement, sans polémique.`,
    },
    {
      q: `Mon site de couvreur n’apparaît pas pour « réparation toiture » : par où commencer ?`,
      a: `Cette requête est disputée par des plateformes nationales. Visez d’abord le local : une page par prestation avec la commune ou le secteur, réparation de fuite, rénovation de couverture, charpente neuve, démoussage, et un texte qui parle de ce que vous faites vraiment. Vérifiez que votre fiche Google est complète et que le site se charge bien sur mobile. Ensuite, laissez Google indexer. La Search Console, gratuite, vous indique les requêtes qui amènent des visites et celles pour lesquelles vous n’apparaissez pas encore.`,
    },
    {
      q: `Quelles obligations légales pour le site d’un couvreur et pour ses photos de chantiers ?`,
      a: `Mentions légales classiques : identité, SIRET, adresse, hébergeur, contact. Les assurances de la profession, comme la décennale, peuvent être mentionnées, avec l’assureur et la couverture, en vérifiant les exigences actuelles sur service-public.fr. Pour les photos de chantiers, l’accord du propriétaire est préférable, surtout si la maison est reconnaissable. Si le site collecte des demandes de devis, indiquez dans une page de confidentialité ce que vous faites de ces données, en suivant les repères de la cnil.fr. Ne revendiquez jamais un label sans attestation.`,
    },
  ],

  'menuisier-ebeniste': [
    {
      q: `Comment mon atelier de menuiserie ressort-il sur Google Maps dans la région ?`,
      a: `Votre fiche Google doit dire clairement ce que vous faites : menuisier, ébéniste, fabricant de cuisines ou d’escaliers selon l’atelier, en catégorie principale puis secondaires. Si les clients viennent à l’atelier, indiquez les jours d’ouverture ; sinon, précisez que c’est sur rendez-vous. Ajoutez des photos de meubles terminés et de l’atelier, avec les essences nommées. Quelques avis détaillés, où le client raconte la commande sur mesure, pèsent plus que des étoiles sans commentaire.`,
    },
    {
      q: `Quel nom de domaine pour un ébéniste et quelle adresse e-mail professionnelle ?`,
      a: `Si votre nom est la marque, comme pour beaucoup d’ébénistes, un domaine à votre nom fait l’affaire et dure toute la carrière. Si l’atelier a un nom propre, utilisez-le. Évitez les noms trop génériques, difficiles à protéger. L’adresse contact@ sur votre domaine sera lue par les architectes d’intérieur et les particuliers qui envoient des plans ou des photos. Prévoyez une boîte qui accepte les pièces jointes volumineuses, ou un lien de dépôt, car vos clients envoient des plans de pièces et des croquis.`,
    },
    {
      q: `Comment chiffrer plus vite un meuble sur mesure et relancer ensuite l’acompte ?`,
      a: `Découpez votre devis en blocs : conception, matière, fabrication, finition, pose. Gardez une trame par type d’ouvrage, bibliothèque, dressing, escalier, que vous adaptez aux cotes. Un logiciel de devis garde vos prix de matière à jour et génère l’acompte à la commande ; les mentions de la facture sont à vérifier sur service-public.fr. Le formulaire du site peut demander les dimensions, l’essence souhaitée et une photo de la pièce, pour que l’échange démarre avec des éléments concrets plutôt qu’avec une simple intention.`,
    },
    {
      q: `Que peut-on automatiser dans un atelier de menuiserie sans perdre le sur-mesure ?`,
      a: `Ce qui entoure la fabrication : l’accusé de réception d’une demande, le rappel d’un rendez-vous de prise de cotes, la relance d’un devis avant qu’il ne tombe dans l’oubli, le message d’avancement quand un meuble passe de la découpe au vernis. Le dessin, le choix du bois et le conseil restent à vous. Un suivi de commande simple, avec les étapes et une date prévue que vous mettez à jour, répond à la question que tout client finit par poser : où en est ma table ?`,
    },
    {
      q: `Comment photographier mes meubles pour le site et faut-il être sur Instagram ?`,
      a: `Le bois aime la lumière rasante d’une fenêtre : placez le meuble près d’un mur clair, évitez le flash, montrez un détail d’assemblage, le fil du bois, une poignée. Une photo de l’ensemble dans la pièce du client donne l’échelle. Une courte vidéo du geste, un rabot qui passe, convainc plus qu’un texte sur le fait main. Instagram ou Pinterest servent bien l’ébénisterie, car les gens y cherchent de l’inspiration ; le site rassemble ensuite l’essentiel avec un moyen simple de vous contacter.`,
    },
    {
      q: `Mon site de menuisier est discret sur Google : comment recevoir plus de demandes ?`,
      a: `Parlez de ce que les gens tapent : escalier sur mesure, bibliothèque, placard sous pente, avec une page par type d’ouvrage et votre secteur. Un portfolio sans texte reste invisible pour Google, ajoutez donc le contexte, les essences, la façon de faire. Tenez aussi votre fiche à jour et demandez des avis après livraison. Les architectes d’intérieur et les cuisinistes de la région sont des relais fréquents : faites-leur connaître le site. Le référencement demande des mois, mais il s’accumule.`,
    },
    {
      q: `Quelles mentions légales pour mon site de menuisier et quelles règles sur les images ?`,
      a: `Les mentions habituelles : identité, SIRET, adresse, hébergeur, contact. Si vous vendez en ligne des pièces ou des meubles, s’ajoutent conditions de vente, droit de rétractation et informations précontractuelles, à vérifier sur economie.gouv.fr ; les meubles sur mesure obéissent souvent à des règles particulières sur le retour. Les photos des créations vous appartiennent, celles que le client a prises ou les plans de l’architecte non. Une page de confidentialité décrit le traitement des données reçues par le formulaire, selon les repères de la cnil.fr.`,
    },
  ],

  'peintre-decorateur': [
    {
      q: `Comment un peintre en bâtiment apparaît-il en bonne place sur Google Maps ?`,
      a: `Choisissez en catégorie principale peintre en bâtiment, puis ajoutez ce que vous faites : ravalement, pose de papier peint, enduits décoratifs. Renseignez la zone desservie plutôt qu’une adresse si vous travaillez chez les clients. Publiez des photos avant et après, en lumière naturelle, et mettez-les à jour au fil des chantiers. Les avis qui citent une prestation précise, une cage d’escalier ou une façade, aident Google à comprendre ce que vous faites. Répondez poliment à chacun, même à un avis court.`,
    },
    {
      q: `Quel nom de domaine et quelle adresse mail pour mon entreprise de peinture ?`,
      a: `Visez un nom simple que le client retient après avoir vu votre camionnette : votre nom de famille, ou le nom de votre entreprise suivi d’un mot de métier si le nom est déjà pris. Évitez les chiffres et les tirets. Une adresse e-mail sur ce domaine figure sur vos devis et vos factures, ce qui est plus crédible, notamment pour les syndics de copropriété et les agences immobilières qui vous commandent des remises en état. Notez les identifiants de votre domaine dans un endroit sûr, sans en laisser la gestion à un tiers.`,
    },
    {
      q: `Comment faire mes devis de peinture plus vite sans me tromper sur les surfaces ?`,
      a: `Découpez par pièce et par poste : protection, préparation des supports, sous-couche, deux couches de finition, évacuation. Un tableau ou un logiciel de devis qui reprend vos coefficients par type de support, plâtre, boiserie, crépi, vous évite de refaire le calcul à chaque fois. Le client qui remplit le formulaire du site avec la surface, l’état des murs et des photos vous permet de préparer une première réponse sans déplacement. Vérifiez les mentions à faire figurer sur le devis et la facture sur service-public.fr.`,
    },
    {
      q: `Quelles relances automatiques utiles pour un peintre : devis, rendez-vous, paiement ?`,
      a: `La relance d’un devis envoyé, après quelques jours, pèse peu pour vous et rappelle le projet au client. Un message de rappel avant le jour du chantier précise ce qu’il faut dégager et protéger, ce qui évite les retards. Pour une facture impayée, un premier rappel poli et automatique suffit souvent, avant un appel. Les clients des syndics, eux, passent par une procédure : ne les relancez pas comme un particulier. Gardez la main sur le ton, car la peinture se fait chez les gens.`,
    },
    {
      q: `Quelles photos de chantiers de peinture faut-il mettre sur le site ?`,
      a: `Des séries avant et après prises du même angle, de jour, volets ouverts, sans le flash qui écrase les teintes. Ajoutez un gros plan sur une finition nette : un angle de plinthe, une ligne de cache, un enduit lissé. Nommez la teinte ou l’effet quand le client est d’accord. Évitez les photos où l’on distingue des objets personnels ou la décoration reconnaissable. Sur les réseaux, quelques transformations marquantes d’une pièce font davantage que de longues publications ; les avis Google viennent compléter l’ensemble.`,
    },
    {
      q: `Pourquoi mon site de peintre reste-t-il invisible sur « peintre près de chez moi » ?`,
      a: `Cette recherche pointe d’abord les fiches Google, pas les sites. Faites en sorte que la vôtre soit complète et reçoive des avis. Pour le site, créez une page par prestation et par secteur, par exemple ravalement de façade ou peinture d’un appartement, avec un vrai texte et vos photos. Le bouche-à-oreille compte beaucoup dans votre métier : mettez l’adresse du site sur les devis, sur les panneaux de chantier et sur la carte de visite. Contrôlez que le site s’affiche vite sur un téléphone.`,
    },
    {
      q: `Que doit contenir le site légal d’un peintre : mentions, assurances, déchets ?`,
      a: `Commencez par les mentions légales classiques : identité, SIRET, adresse, hébergeur, contact. Pour le bâtiment, indiquez l’assurance de votre profession selon les exigences en vigueur, à confirmer sur service-public.fr ou avec votre assureur. Si vous parlez de peintures écologiques ou de labels, n’affirmez que ce que vous pouvez prouver avec les fiches des fabricants. Une page de confidentialité couvre les données du formulaire de devis ; la cnil.fr explique comment la rédiger. Ne publiez pas de photos de logements reconnaissables sans accord.`,
    },
  ],

  'carreleur-sol': [
    {
      q: `Comment un carreleur se positionne-t-il sur Google Maps pour les travaux de salle de bain ?`,
      a: `Choisissez la catégorie de carreleur en principale, puis des secondaires pour le parquet, la résine ou le béton ciré si vous les posez. Précisez dans la description les pièces que vous traitez le plus : salles de bain, terrasses, cuisines. Ajoutez des photos de poses finies, joints nets, et des détails de calepinage. Si vous vous déplacez chez les clients, indiquez vos communes. Demandez un avis à la réception du chantier, quand le client vient de voir le résultat, et citez la pièce dans votre réponse.`,
    },
    {
      q: `Quelle adresse e-mail et quel domaine pour une entreprise de carrelage ?`,
      a: `Prenez un domaine à votre nom ou à celui de l’entreprise, facile à écrire sur un devis. Les magasins de matériaux, les architectes et les agences à qui vous envoyez vos tarifs préfèrent voir une adresse à votre domaine plutôt qu’une messagerie grand public. Elle reçoit aussi les photos et les plans que les clients vous envoient avant la visite. Gardez-en une seule pour l’entreprise ; pour les chantiers, un numéro mobile dédié sépare vie privée et travail. Conservez les codes d’accès du domaine vous-même.`,
    },
    {
      q: `Comment établir plus vite un devis de carrelage au mètre carré avec les fournitures ?`,
      a: `Séparez toujours la pose, les fournitures et les préparations : ragréage, étanchéité, plinthes, joints, dépose de l’ancien revêtement. Un tableur ou un logiciel de devis garde vos prix de pose par type de carreau, grand format, mosaïque, sol extérieur, parce que la difficulté change. Le formulaire du site peut demander la surface, la pièce et le support actuel, ce qui évite de se déplacer pour rien. Le détail des mentions du devis et de la facture se vérifie sur service-public.fr.`,
    },
    {
      q: `Quels rappels ou relances automatiser quand on pose du carrelage chez des particuliers ?`,
      a: `Un message avant le chantier pour rappeler de libérer la pièce et de prévoir l’accès à l’eau et à l’électricité, un autre après pour donner les consignes d’entretien et le temps de séchage des joints, avant de circuler ou de laver. Ces messages réduisent les appels inutiles. Ajoutez la relance d’un devis resté en attente, car le client hésite souvent sur le choix du carreau. Ne relancez pas la facture automatiquement avant d’avoir vérifié que le chantier est bien clos avec lui.`,
    },
    {
      q: `Comment photographier un carrelage pour qu’on voie la qualité de pose ?`,
      a: `Photographiez en lumière rasante, qui révèle la planéité, avec un cadrage large puis un gros plan sur les joints et les coupes autour des siphons. Évitez les clichés pris contre la lumière d’une fenêtre, où les reflets cachent le travail. Montrez la pièce vide, rangée, avant de la meubler. Une série par style, moderne, rustique, terrasse, aide le visiteur à trouver son projet. Sur Instagram ou Pinterest, les transformations de salle de bain sont très partagées ; le site garde les détails techniques.`,
    },
    {
      q: `Mon site de carreleur n’attire aucun client : comment avoir plus de demandes de devis ?`,
      a: `Vérifiez d’abord que la page de chaque prestation existe : carrelage de salle de bain, terrasse extérieure, béton ciré, avec les communes servies et des photos réelles. Un formulaire court, qui demande surface et photos, convertit mieux qu’un long questionnaire. Complétez la fiche Google et demandez des avis. Les magasins de carrelage et les artisans voisins, plombiers ou plaquistes, peuvent vous recommander : donnez-leur l’adresse du site. Comptez plusieurs semaines avant d’en voir les effets.`,
    },
    {
      q: `Quelles obligations et mentions pour le site d’un carreleur qui vend aussi les fournitures ?`,
      a: `Les mentions habituelles d’un site professionnel : identité, SIRET, adresse, hébergeur, contact. Si vous vendez le carrelage en plus de la pose, les conditions de vente et les informations sur les produits doivent être claires ; economie.gouv.fr détaille les règles. Pour la pose, l’assurance de la profession est à mentionner selon les exigences en vigueur, à confirmer auprès de service-public.fr ou de votre assureur. Un formulaire qui collecte des données personnelles appelle une page de confidentialité, selon les repères de la cnil.fr.`,
    },
  ],

  'serrurier-depannage': [
    {
      q: `Quelle catégorie Google un serrurier choisit-il pour ne pas être confondu avec les faux dépanneurs ?`,
      a: `Retenez serrurier comme catégorie principale, ajoutez ensuite les services réels : fabrication de clés, blindage, pose de portes. Utilisez une adresse véritable et vérifiable, avec la vérification de la fiche par Google, et si vous vous déplacez uniquement, masquez l’adresse tout en listant les communes. Affichez votre nom, votre numéro d’entreprise sur le site et sur la fiche. Les faux dépanneurs s’appuient sur des adresses fictives : votre force est d’être joignable, identifié et d’avoir des avis de voisins.`,
    },
    {
      q: `Quel nom de domaine et quelle adresse e-mail pour un serrurier de proximité ?`,
      a: `Prenez un nom lié à votre identité ou à votre commune, évitez les noms génériques à base de « dépannage 24h » qui ressemblent aux centrales d’appel. Un client inquiet regarde si l’adresse e-mail et le site portent le même nom que sur le devis et la fiche. Une boîte à votre domaine sert à envoyer les devis des remplacements de serrures non urgents et à dialoguer avec les syndics et les gestionnaires. Gardez votre numéro mobile en évidence : en urgence, personne n’écrit.`,
    },
    {
      q: `Comment faire un devis de serrurerie lisible, même pour une intervention d’urgence ?`,
      a: `Un devis clair détaille le déplacement, la main-d’œuvre, la fourniture et la nature de l’intervention, avant le début des travaux. Préparez un modèle court que vous remplissez sur place depuis un téléphone, signé par le client, puis envoyé par e-mail. Le client peut ainsi comprendre ce qu’il paie, ce qui vous distingue des pratiques dénoncées dans le métier. Les mentions de la facture et les règles d’information du consommateur se lisent sur service-public.fr et economie.gouv.fr, à vérifier avant de finaliser vos modèles.`,
    },
    {
      q: `Que peut-on automatiser pour un serrurier sans dégrader la relation en urgence ?`,
      a: `L’urgence, elle, se traite au téléphone : n’en faites pas passer la prise en charge par un robot. Automatisez le reste : confirmation d’une demande de devis planifiée, rappel du rendez-vous pour un changement de cylindre, envoi du devis et de la facture par e-mail, relance d’un paiement tardif. Un message qui indique le délai d’attente probable pendant que vous êtes sur une autre intervention rassure aussi. Gardez toujours la possibilité d’un appel direct, sans menu ni file d’attente.`,
    },
    {
      q: `Quelles photos montrer sur le site d’un serrurier, entre portes blindées et dépannages ?`,
      a: `Évitez les photos de banque d’images : elles laissent penser à une centrale. Montrez votre véhicule, votre atelier, vos poses de portes blindées ou de serrures multipoints, après accord du client et sans rendre l’adresse identifiable. Un portrait de vous, avec votre nom, crée la confiance. Les avis Google sont décisifs : après un dépannage, un client soulagé laisse volontiers un mot si vous lui envoyez le lien. Sur les réseaux, le conseil de prévention, comme vérifier une serrure avant les vacances, a plus de valeur qu’une promotion.`,
    },
    {
      q: `Comment progresser sur « serrurier urgence » quand mon site n’arrive pas en tête ?`,
      a: `Sur cette requête, les annonces payantes et les centrales d’appel occupent le haut de la page. Visez donc le local : fiche Google exacte, pages par commune desservie, avec votre vrai secteur et vos horaires, et des avis récents. Cherchez aussi les requêtes moins disputées : changement de serrure après un cambriolage, blindage de porte, clé cassée dans la serrure. Le site doit s’afficher vite sur un téléphone, avec le numéro cliquable en haut. Comptez des mois avant de gagner des places durables.`,
    },
    {
      q: `Quelles règles propres à la serrurerie faut-il respecter sur son site ?`,
      a: `Outre les mentions légales classiques, identité, SIRET, adresse, hébergeur, un serrurier est exposé aux règles d’information sur les prix et sur le démarchage d’urgence : consultez service-public.fr et economie.gouv.fr, ainsi que les indications de la DGCCRF, car elles évoluent. Affichez ce que vous pouvez prouver, sans formule trompeuse du type « agréé » sans titre à l’appui. Un formulaire de contact appelle une page de confidentialité, selon la cnil.fr. Le plus sûr reste la transparence : identité claire, tarifs lisibles avant intervention.`,
    },
  ],

  'cuisiniste': [
    {
      q: `Comment mon showroom de cuisines apparaît-il sur Google Maps pour une cuisine sur mesure ?`,
      a: `Sur votre fiche, choisissez la catégorie qui correspond à votre activité de vente et d’agencement de cuisines, puis des secondaires pour la pose ou le mobilier. Indiquez les horaires du showroom, sur rendez-vous ou en libre accès. Montrez des photos des cuisines exposées et de réalisations chez des clients, avec leur accord. Ajoutez le nom des marques que vous distribuez, seulement si vous en êtes revendeur. Un avis qui raconte la visite de métré, la conception, puis la pose en dit plus qu’une note seule.`,
    },
    {
      q: `Nom de domaine et adresse mail professionnelle : que choisir pour un cuisiniste indépendant ?`,
      a: `Le nom de votre enseigne, complété du mot cuisine seulement s’il est libre et lisible, fera l’affaire. Les clients reviennent plusieurs fois au fil des rendez-vous, ils notent l’adresse et l’écrivent sur le plan. Une adresse à votre domaine sert à envoyer plans, devis et simulations ; elle paraît plus sérieuse que celle d’un fournisseur d’accès. Si vous travaillez avec des architectes ou des promoteurs, elle facilite l’échange de pièces jointes lourdes. Prévoyez une signature avec l’adresse du showroom.`,
    },
    {
      q: `Comment établir plus vite le devis d’une cuisine équipée et garder la trace des options ?`,
      a: `Le devis d’une cuisine est un assemblage : meubles, plan de travail, électroménager, pose, raccordements, évacuation de l’ancienne. Votre logiciel de conception en génère déjà une partie ; l’enjeu est de le relier à la facturation pour ne pas ressaisir. Notez les options refusées par le client, elles servent au rendez-vous suivant. Des versions numérotées évitent les confusions. L’acompte, la commande fournisseur et la livraison forment une chaîne : un suivi simple par dossier vous fait gagner du temps. Les mentions se vérifient sur service-public.fr.`,
    },
    {
      q: `Quels suivis automatisés ont du sens entre la commande d’une cuisine et sa pose ?`,
      a: `Une cuisine s’étale sur de longues semaines, avec des étapes que le client ne voit pas. Un message à chaque jalon, commande confirmée chez le fournisseur, arrivée des meubles, date de pose, le rassure sans que vous décrochiez. Un rappel avant la pose précise ce qu’il faut préparer : eau coupée, pièce dégagée. En fin de projet, une demande d’avis suffit. Évitez en revanche d’annoncer par automatisme une date que le fournisseur n’a pas confirmée, car un retard promis déçoit plus qu’une attente expliquée.`,
    },
    {
      q: `Quelles photos et quels contenus sociaux montrer pour une cuisine sur mesure ?`,
      a: `Rien ne remplace les photos de cuisines posées chez de vrais clients, prises le jour de la fin de chantier, avec la lumière de la pièce. Montrez un angle d’ensemble puis un plan de travail, une poignée, un tiroir ouvert. Les plans en perspective de votre logiciel complètent l’ensemble, quand ils sont rendus lisibles. Instagram et Pinterest sont de bons relais, car on y collecte des idées avant de consulter un cuisiniste. Demandez toujours l’accord du client avant de publier un intérieur reconnaissable.`,
    },
    {
      q: `Comment avoir plus de clients quand mon site de cuisiniste reste invisible sur Google ?`,
      a: `Les recherches de ce métier ressemblent à cuisine sur mesure et le nom de la ville, ou cuisiniste près de chez moi. Faites donc une page par style, moderne, bois, îlot central, et une sur votre façon de travailler, de la visite-métré à la pose. Ajoutez la zone que vous desservez. Les photos réelles et les avis recueillis après pose comptent beaucoup. Pensez aussi aux artisans voisins, plaquistes ou électriciens, qui peuvent vous recommander. Le référencement local se construit sur plusieurs mois.`,
    },
    {
      q: `Quelles obligations légales pour le site d’un cuisiniste qui vend et pose ?`,
      a: `En plus des mentions légales classiques, identité, SIRET, adresse du showroom, hébergeur, un cuisiniste vend à des consommateurs, parfois hors établissement lors d’un salon : le droit de rétractation et les règles d’information précontractuelle s’appliquent selon les cas. Vérifiez-les sur economie.gouv.fr et service-public.fr avant d’écrire vos conditions. Une mention de médiation de la consommation peut aussi être requise. Pour les données reçues par formulaire, une page de confidentialité suffit, en suivant les repères de la cnil.fr.`,
    },
  ],

  'pisciniste': [
    {
      q: `Comment un pisciniste ressort-il sur Google Maps au moment où les gens préparent l’été ?`,
      a: `Avant le printemps, passez en revue votre fiche : catégorie principale adaptée à votre activité, construction ou entretien de piscines, horaires de la saison, photos récentes de bassins terminés. Les recherches montent dès les premiers beaux jours, donc les avis doivent être déjà là. Demandez-les en fin de chantier, quand la piscine est remplie. Précisez si vous vendez des produits d’entretien en magasin ou seulement sur rendez-vous, pour éviter les déplacements inutiles.`,
    },
    {
      q: `Faut-il un nom de domaine spécial piscine et une adresse mail professionnelle ?`,
      a: `Un nom qui ressemble à votre enseigne vaut mieux qu’un nom truffé de mots comme piscine et prix, qui vieillit mal. Vos clients sont souvent des propriétaires qui comparent plusieurs entreprises : une adresse à votre domaine, sur le devis et les échanges, fait sérieux, surtout pour un chantier important. Elle reçoit aussi les plans du terrain, les photos et les documents d’urbanisme que les clients envoient. Gardez les identifiants du domaine à votre nom, pas chez celui qui vous l’a installé.`,
    },
    {
      q: `Comment faire plus vite le devis d’une piscine et celui d’un contrat d’entretien ?`,
      a: `Pour la construction, séparez terrassement, bassin, filtration, margelles, pose d’une couverture et branchements : le client voit ce qui est inclus et ce qui est en option. Pour l’entretien, un modèle distinct reprend la fréquence des passages, l’ouverture et l’hivernage. Un logiciel de devis et de facturation qui garde vos tarifs et gère les échéances évite la ressaisie. Le formulaire du site peut recueillir en amont la taille du terrain, la forme souhaitée et le type de bassin. Pour les mentions obligatoires, consultez service-public.fr.`,
    },
    {
      q: `Quels rappels automatiques pour un pisciniste : ouverture, hivernage, contrôles ?`,
      a: `Votre métier suit le calendrier de l’eau. Un message envoyé aux clients sous contrat en début de printemps, pour fixer la remise en service, puis un autre à l’automne pour l’hivernage, vous aide à remplir vos tournées. Un rappel de rendez-vous la veille évite l’accès fermé. Une relance sur un devis de bassin non signé, plus espacée, laisse au client le temps de réfléchir. Respectez toujours le choix des clients de ne pas recevoir de messages commerciaux, selon les repères de la cnil.fr.`,
    },
    {
      q: `Quelles photos montrer sur un site de pisciniste pour donner envie sans exposer les clients ?`,
      a: `Rien ne vaut les bassins terminés, de jour, avec le ciel dégagé, en vue d’ensemble puis en détail : margelles, plage, escalier, local technique rangé. Ajoutez des photos de chantier, terrassement, ferraillage, qui montrent comment le bassin est construit. Demandez l’accord du propriétaire, car on reconnaît facilement un jardin, et évitez les clichés qui laissent voir la maison voisine. Une vidéo courte d’un chantier, ou d’une couverture qui se referme, intéresse beaucoup sur les réseaux, tout comme les avis sur la durée de l’entretien.`,
    },
    {
      q: `Pourquoi mon site de pisciniste est-il peu visible en dehors de l’été ?`,
      a: `La demande suit les saisons, mais la décision d’un chantier se prépare des mois avant. Publiez donc de l’information utile en automne et en hiver : les étapes d’un projet, les démarches à prévoir, les différences entre types de bassins, l’entretien. Ces pages se positionnent et attirent des visiteurs qui prévoient leurs travaux. Associez-les à votre fiche Google à jour et à des pages par secteur desservi. La Search Console, gratuite, vous montre quelles requêtes amènent des visites et lesquelles ne vous trouvent pas encore.`,
    },
    {
      q: `Quelles règles propres aux piscines faut-il mentionner ou respecter sur le site ?`,
      a: `Les mentions légales classiques : identité, SIRET, adresse, hébergeur, contact. S’ajoutent des sujets propres au métier, comme la sécurité des bassins et les formalités d’urbanisme selon la taille de l’ouvrage : ne les détaillez pas de mémoire, renvoyez vers service-public.fr et vers la mairie du client, car les règles changent. Mentionnez l’assurance de votre profession selon les exigences en vigueur. Pour les données collectées par formulaire, une page de confidentialité est nécessaire, avec les repères de la cnil.fr. N’annoncez aucune garantie que vous ne donnez pas par écrit.`,
    },
  ],

  'vitrier': [
    {
      q: `Quelle catégorie Google un vitrier retient-il pour être trouvé après un bris de glace ?`,
      a: `Choisissez vitrier comme catégorie principale, puis ajoutez les services que vous assurez : miroiterie, double vitrage, vitrines. Renseignez des horaires réalistes ; si vous intervenez en urgence le soir, précisez-le seulement si c’est vrai. Si vous vous déplacez chez les clients, indiquez vos communes plutôt que de laisser croire à un magasin ouvert. Ajoutez des photos de remplacements terminés et de votre véhicule. Les avis qui racontent une intervention rapide un samedi comptent beaucoup pour une recherche faite dans l’urgence.`,
    },
    {
      q: `Quel nom de domaine et quelle adresse e-mail pour une entreprise de vitrerie ?`,
      a: `Prenez un nom qui reprend votre entreprise ou votre nom, simple à dicter par téléphone. Les noms bourrés de mots comme urgence, pas cher ou 24h ressemblent aux centrales d’appel que vous voulez justement éviter. Une adresse à votre domaine est utile pour les échanges avec les assurances, les syndics et les gérants de commerces qui demandent un devis écrit. Elle sert aussi à recevoir les photos d’un vitrage cassé que le client envoie avant votre passage, ce qui vous permet de préparer le bon matériel.`,
    },
    {
      q: `Comment gagner du temps sur les devis de vitrage, surtout avec les assurances ?`,
      a: `Préparez un modèle qui détaille dimensions, type de vitrage, pose, évacuation de l’ancien, déplacement, avec une ligne par pièce. Les experts d’assurance attendent un devis lisible et des photos du sinistre : un formulaire qui les demande dès la première prise de contact vous évite les allers-retours. Un logiciel de devis et de facturation garde les cotes et les références des vitrages. Pour la facture, vérifiez les mentions obligatoires et les règles d’information sur service-public.fr et economie.gouv.fr.`,
    },
    {
      q: `Que peut-on automatiser chez un vitrier sans ralentir les dépannages ?`,
      a: `Le dépannage urgent se décide au téléphone. Automatisez ce qui l’entoure : l’accusé de réception d’une demande de devis non urgente, le rappel du rendez-vous de pose d’un vitrage sur mesure, qui prend du temps à fabriquer, l’envoi du devis et du justificatif pour l’assureur, la relance d’un règlement. Un message qui annonce que le vitrage est arrivé et propose un créneau de pose réduit les appels. Gardez le numéro très visible pour qu’un client pressé puisse vous joindre directement.`,
    },
    {
      q: `Quelles photos de vitrerie et de miroiterie faut-il montrer, et sur quels réseaux ?`,
      a: `Les vitrages réussis se photographient mal : évitez les reflets en cadrant en biais ou en fin de journée. Montrez des poses variées : fenêtre, devanture de commerce, miroir sur mesure, cloison vitrée, ainsi que le moment du chantier lui-même. Ne publiez pas l’intérieur d’un commerce sans l’accord du gérant. Les commerçants et les professionnels consultent surtout le site et la fiche Google ; les particuliers y arrivent après un sinistre. Les réseaux sociaux servent surtout à montrer des réalisations sur mesure plus visuelles.`,
    },
    {
      q: `Mon site de vitrier se trouve mal sur Google : comment attirer plus de clients ?`,
      a: `Cherchez ce que tape un client pressé, comme remplacement de vitre cassée ou double vitrage près de chez moi, et créez une page par prestation avec les communes que vous couvrez. Soignez la vitesse d’affichage sur mobile et rendez le numéro cliquable. Pour les projets planifiés, comme les vitrines ou les cloisons, publiez des réalisations commentées. Complétez la fiche Google et gardez-la à jour. Les syndics, les agents immobiliers et les commerçants de la zone peuvent aussi vous solliciter si le site leur donne une raison de vous retenir.`,
    },
    {
      q: `Quelles mentions légales et obligations pour le site d’un vitrier ?`,
      a: `Affichez identité, forme juridique, SIRET, adresse, hébergeur et contact. Pour le dépannage, soyez transparent sur ce qui détermine le prix, déplacement, main-d’œuvre, fourniture, car l’information du consommateur est encadrée : lisez economie.gouv.fr et service-public.fr. Indiquez votre assurance professionnelle selon les exigences en vigueur. N’utilisez aucun logo d’assureur ou de label sans autorisation. Si le site collecte des données avec un formulaire de sinistre, une page de confidentialité explique l’usage qui en est fait, d’après la cnil.fr.`,
    },
  ],

  'ramoneur': [
    {
      q: `Comment un ramoneur se fait-il trouver sur Google Maps à l’approche de l’hiver ?`,
      a: `Renseignez la catégorie ramoneur en principale, puis des secondaires pour l’entretien de poêles ou de chaudières si vous les traitez. Indiquez vos communes de tournée plutôt qu’une adresse si vous travaillez chez les clients. À l’automne, les recherches montent : mettez vos horaires de rendez-vous à jour et ajoutez des photos de conduits et de poêles entretenus. Après chaque ramonage, un client qui vient de recevoir son certificat est bien placé pour laisser un avis ; envoyez-lui le lien avec le document.`,
    },
    {
      q: `Quel nom de domaine et quelle e-mail utiliser pour envoyer les certificats de ramonage ?`,
      a: `Un domaine à votre nom ou à celui de votre entreprise, court et facile à retenir, suffit. L’adresse e-mail à ce domaine sert à envoyer le certificat de ramonage et les factures : un client qui reçoit un document depuis une adresse sérieuse le conserve et le présente plus volontiers à son assureur. Évitez une messagerie grand public qui part en courrier indésirable. Si vous travaillez avec des syndics ou des agences, une signature claire avec la raison sociale et le SIRET facilite leurs échanges.`,
    },
    {
      q: `Comment préparer plus vite mes devis et factures de ramonage et d’entretien ?`,
      a: `La plupart de vos interventions sont répétitives : un tarif par type d’appareil, conduit de cheminée, insert, poêle à bois ou à granulés, chaudière, plus un éventuel déplacement. Préparez un modèle pour chacune et un logiciel de facturation qui garde la fiche du client avec l’appareil et la date du dernier passage. La facture et le certificat peuvent partir ensemble en fin de journée. Pour les mentions obligatoires, vérifiez service-public.fr. Le formulaire du site peut demander dès le départ le type d’appareil et le combustible.`,
    },
    {
      q: `Quels rappels automatiques sont utiles pour un ramoneur : saison, rendez-vous, impayés ?`,
      a: `Le rappel annuel est la meilleure automatisation de votre métier : un message envoyé à l’automne aux clients qui l’ont accepté, avec un lien pour choisir un créneau dans leur secteur. La veille de la visite, un rappel du rendez-vous évite les portes closes, et un mot sur l’accès au conduit. En cas de facture non réglée, un premier rappel poli suffit souvent. Chaque client doit pouvoir refuser ces messages, comme l’explique la cnil.fr ; gardez la liste à jour.`,
    },
    {
      q: `Quelles photos de ramonage montrer sur le site, sans gêner mes clients ?`,
      a: `Montrez le matériel, les hérissons, les aspirateurs, la caméra d’inspection, plutôt que le salon du client. Une photo d’un conduit avant et après, ou d’une vue de caméra, explique mieux que des mots pourquoi l’entretien compte. Photographiez à l’extérieur, un toit ou un chapeau de cheminée, si vous êtes en sécurité. Demandez l’accord avant de publier tout ce qui montre un logement. Sur les réseaux, un conseil de saison, comme préparer son poêle avant la première flambée, fonctionne bien auprès des particuliers.`,
    },
    {
      q: `Mon site de ramoneur n’apparaît pas sur Google : comment remplir mon planning d’automne ?`,
      a: `La demande se concentre sur quelques semaines : préparez le terrain avant. Une page par commune ou secteur de tournée, une par type d’appareil, une sur l’intérêt de l’entretien, avec un texte à vous. Vérifiez que la fiche Google est à jour dès la fin de l’été. Mettez en place la prise de rendez-vous en ligne pour désengorger le téléphone. Le bouche-à-oreille entre voisins reste fort dans votre métier : un client satisfait en parle à ses voisins, d’où l’intérêt d’une page simple à partager.`,
    },
    {
      q: `Quelles règles du ramonage faut-il respecter sur son site et ses documents ?`,
      a: `Les obligations d’entretien des conduits varient selon le lieu et le combustible, et peuvent être fixées par le règlement sanitaire départemental ou par des textes nationaux : ne les résumez pas de mémoire sur le site, renvoyez vers service-public.fr et la mairie. Le certificat que vous remettez doit être exact, daté et à votre nom. Ajoutez les mentions légales classiques, identité, SIRET, adresse, hébergeur, et indiquez votre assurance professionnelle. Une page de confidentialité couvre les données des rendez-vous, selon les repères de la cnil.fr.`,
    },
  ],
}
