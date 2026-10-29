import type { ContenuLocal } from './types'

export const FAQ_METIERS: Record<string, ContenuLocal['faq']> = {
  'cafe-salon-the': [
    {
      q: `Comment mon salon de thé apparaît-il dans la carte Google Maps ?`,
      a: `Il vous faut une fiche d’établissement Google, rattachée à votre adresse réelle et validée par courrier ou par appel. Choisissez comme catégorie principale « Salon de thé » ou « Café » selon ce que vos clients cherchent vraiment, puis ajoutez des catégories secondaires : brunch, pâtisserie, boutique de thés. Renseignez les horaires de chaque jour, y compris la fermeture du lundi ou les ouvertures de dimanche. Répondez aux avis, même brefs : un message de remerciement montre que la salle est tenue avec soin. Les photos de la salle et de la vitrine de gâteaux complètent la fiche.`,
    },
    {
      q: `Quelle adresse e-mail prendre pour mon café, au-delà d’une boîte gratuite ?`,
      a: `Réservez un nom de domaine proche du nom de l’enseigne, puis créez une adresse du type contact@ ou bonjour@ avec ce domaine. C’est plus rassurant pour un organisateur de goûter ou une entreprise qui réserve vos tables pour un petit-déjeuner d’équipe. Gardez le domaine à votre nom, pas à celui d’un prestataire : si vous changez de développeur, l’adresse et le site vous suivent. Évitez les accents et les tirets multiples, difficiles à dicter au comptoir quand un client demande comment vous écrire.`,
    },
    {
      q: `Comment préparer un devis pour un goûter de groupe ou un petit-déjeuner d’entreprise ?`,
      a: `Préparez un modèle unique où vous n’avez qu’à changer le nombre de convives, la formule choisie, la date et l’heure d’arrivée. Prévoyez les lignes qui reviennent : théières ou cafetières à volonté, viennoiseries, mise à disposition de la salle, vaisselle. Précisez les conditions d’annulation et le délai de confirmation du nombre de personnes. Un formulaire sur le site qui récolte ces informations en amont vous évite les allers-retours de messages. Les mentions obligatoires d’un devis sont rappelées sur service-public.fr, à consulter avant de figer votre modèle.`,
    },
    {
      q: `Peut-on automatiser les rappels de réservation du brunch du dimanche ?`,
      a: `Oui, et c’est l’un des usages les plus utiles : un message de confirmation envoyé dès la demande, puis un rappel la veille avec l’heure, le nombre de couverts et une phrase invitant à prévenir en cas d’empêchement. Les tables vides du dimanche midi coûtent cher quand la cuisine a déjà préparé les fournitures. Un lien d’annulation inclus dans le rappel libère la place pour une autre famille. En revanche, ne multipliez pas les relances : un seul rappel suffit pour un brunch, davantage agace la clientèle.`,
    },
    {
      q: `Quelles photos montrer sur le site d’un salon de thé pour donner envie ?`,
      a: `Montrez ce qu’un client ne peut pas deviner en passant devant : la lumière de la salle à l’heure du goûter, une théière servie, la vitrine de gâteaux, la vaisselle. Évitez les photos de clients identifiables sans leur accord. Privilégiez la lumière naturelle plutôt que le flash, qui écrase les textures d’un scone ou d’une tarte. Si vous publiez sur Instagram, une galerie du site peut reprendre ces images sans qu’il faille s’y connecter. Renouvelez-les avec les saisons : la terrasse l’été, les boissons chaudes l’hiver.`,
    },
    {
      q: `Pourquoi mon salon de thé reste-t-il introuvable dans ma ville ?`,
      a: `Plusieurs raisons possibles : fiche Google incomplète ou non validée, site sans page qui nomme clairement la ville et le type d’établissement, ou adresse écrite différemment d’un endroit à l’autre. Vérifiez que le nom, l’adresse et le téléphone sont identiques partout : site, fiche, annuaires. Ajoutez une page sur la carte et une autre sur les événements, avec du vrai texte plutôt que des images de menu. Les avis récents pèsent aussi. Soyez patient : un site neuf met du temps à être pris en compte par les moteurs.`,
    },
    {
      q: `Quelles mentions légales mon site de salon de thé doit-il afficher ?`,
      a: `Comme tout site professionnel, il doit identifier son éditeur : raison sociale ou nom de l’exploitant, adresse, contact, numéro d’immatriculation, et l’hébergeur du site. Si vous collectez des demandes de réservation, une information sur l’usage des données personnelles est nécessaire, et un bandeau de consentement dès qu’un outil de mesure ou une vidéo externe dépose des traceurs. Les règles propres à la restauration, comme l’information sur les allergènes ou le débit de boissons, relèvent de la réglementation officielle : vérifiez sur service-public.fr, economie.gouv.fr et cnil.fr.`,
    },
  ],

  'restaurant-gastronomique': [
    {
      q: `Comment faire apparaître ma table sur Google Maps parmi les restaurants gastronomiques ?`,
      a: `Soignez la fiche d’établissement : choisissez la catégorie qui décrit votre cuisine, par exemple « Restaurant gastronomique » ou « Restaurant français », puis ajoutez le lien de réservation et le menu. Indiquez les jours de fermeture, les horaires de service midi et soir, et mettez à jour les exceptions de fêtes. Publiez des photos de la salle, des assiettes et de l’équipe en cuisine. Répondez à chaque avis avec mesure, y compris quand il est sévère : un convive hésitant lit surtout la manière dont vous répondez, pas seulement la note.`,
    },
    {
      q: `Faut-il un nom de domaine à mon nom ou à celui de l’établissement ?`,
      a: `Plutôt celui de l’établissement, qui est ce que le public tape et retient, avec éventuellement le nom du chef en redirection si vous êtes connu sous votre propre nom. Une adresse de réservation du type reservation@ sur ce domaine fait plus sérieux qu’une boîte grand public pour un dîner d’exception ou un repas d’affaires. Veillez à ce que le domaine soit enregistré à votre nom, avec un contact de secours, pour éviter qu’une échéance oubliée ne coupe le site et la messagerie en pleine saison.`,
    },
    {
      q: `Comment gagner du temps sur les devis de repas privés ou de séminaires ?`,
      a: `Construisez une trame où figurent le menu proposé, le nombre de couverts, les boissons, le service et l’éventuelle mise à disposition d’un salon. Pour chaque demande, vous ne remplacez que les variables. Un formulaire sur le site qui demande la date, le nombre d’invités, l’occasion et les contraintes alimentaires vous donne l’essentiel avant de répondre. Précisez ce qui est inclus, les conditions d’annulation et le délai de confirmation. Le contenu obligatoire d’un devis se vérifie sur service-public.fr et sur le site du ministère de l’Économie.`,
    },
    {
      q: `Que peut-on automatiser pour une table d’exception sans perdre le contact humain ?`,
      a: `Ce qui concerne la logistique, jamais la relation. Une confirmation de réservation envoyée immédiatement, un rappel avant le dîner qui demande de signaler une allergie ou une occasion à fêter, et un message court après le repas invitant à laisser un avis. Les no-shows coûtent très cher à une salle de petite taille : demander une confirmation active, ou une empreinte de carte si vous en êtes équipé, peut avoir du sens. En revanche, l’accueil par téléphone du jour même et les réponses aux demandes spéciales restent à la main.`,
    },
    {
      q: `Que montrer sur le site d’un restaurant gastronomique : plats, chef, salle ?`,
      a: `Les trois, dans cet ordre de priorité pour un visiteur qui n’est jamais venu : les assiettes, qui racontent la cuisine, puis la salle, qui dit l’ambiance et le niveau de service, enfin l’équipe, qui donne un visage. Les photos doivent être cohérentes entre elles, avec la même lumière et un style sobre. Renouvelez-les à chaque changement de carte importante. Les distinctions ou articles de presse peuvent figurer, mais seulement les vôtres et à jour : ne citez jamais une récompense que vous ne détenez plus.`,
    },
    {
      q: `Pourquoi les gens trouvent-ils les autres restaurants avant le mien en ville ?`,
      a: `Souvent parce que ces établissements sont mieux décrits : une fiche Google complète, un site avec une carte lisible en texte, des avis récents et des mentions dans des guides ou dans la presse locale. Regardez ce que dit votre page d’accueil à un inconnu : type de cuisine, ville, jours d’ouverture, lien de réservation. Écrivez des pages pour les occasions que les gens recherchent, comme un anniversaire ou un menu de saison. Un restaurant gastronomique ne gagne pas par le volume, mais par la clarté de ce qu’il promet.`,
    },
    {
      q: `Quelles règles propres à la restauration mon site doit-il respecter ?`,
      a: `Au-delà des mentions légales habituelles et de l’information sur les données personnelles, un restaurant est soumis à des obligations d’affichage : prix, allergènes, parfois origine de certaines viandes. Elles s’appliquent d’abord en salle, et il est prudent de les refléter sur la carte publiée en ligne. Si le menu change chaque semaine, mettez-le à jour pour qu’il corresponde à ce que vous servez. Vérifiez le détail sur service-public.fr et auprès de votre chambre consulaire, car ces règles évoluent.`,
    },
  ],

  'traiteur-evenementiel': [
    {
      q: `Mon traiteur doit-il apparaître sur Google Maps si je n’ai pas de boutique ?`,
      a: `Oui, c’est possible. Google prévoit les entreprises qui se déplacent chez le client : vous pouvez masquer l’adresse de votre laboratoire et indiquer à la place les communes ou départements où vous intervenez. Choisissez une catégorie comme « Traiteur » ou « Service de restauration pour événements ». Ajoutez des photos de buffets, de tables et de plateaux, ainsi que des avis laissés par vos clients après un mariage ou un séminaire. Cette fiche est souvent la première chose qu’un futur marié consulte, avant même de lire votre site.`,
    },
    {
      q: `Faut-il une adresse e-mail à mon nom d’entreprise pour recevoir des demandes de mariage ?`,
      a: `C’est vivement conseillé. Un couple qui hésite entre trois traiteurs envoie ses questions à plusieurs adresses, et une boîte au nom de l’entreprise inspire davantage confiance qu’une adresse grand public. Prévoyez une boîte commune, contact@ ou devis@, que vous lisez tous les jours, car les demandes tardent à être traitées quand elles dorment dans une messagerie personnelle. Le domaine doit être enregistré à votre nom. Évitez les noms trop longs et les tirets : dictés au téléphone, ils se transforment en erreurs.`,
    },
    {
      q: `Comment faire un devis de traiteur plus vite sans refaire chaque ligne ?`,
      a: `Constituez une bibliothèque de formules : cocktail, repas assis, buffet, brunch d’entreprise. Chacune comporte les mêmes lignes de base, et vous modulez le nombre de convives, la vaisselle, le personnel de service et le transport. Un formulaire de demande bien conçu recueille la date, le lieu, le type de salle et le nombre d’invités. Indiquez clairement ce que le devis inclut ou non, ainsi que les conditions d’acompte et d’annulation. Les mentions à porter sur un devis sont rappelées sur service-public.fr.`,
    },
    {
      q: `Quelles relances automatiser pour un traiteur qui jongle avec les devis ?`,
      a: `Trois moments se prêtent bien à l’automatisation : un accusé de réception dès qu’une demande arrive, une relance courtoise quand un devis n’a pas reçu de réponse, et un rappel avant la date limite de confirmation du nombre de convives. Pour le solde d’une prestation, un message de rappel d’échéance évite de téléphoner. Gardez un ton personnel et signez de votre nom. Une relance trop mécanique pour un mariage fait perdre la chaleur qu’un client attend de la part de la personne qui va préparer son repas.`,
    },
    {
      q: `Quelles photos un traiteur doit-il publier pour décrocher des devis ?`,
      a: `Des photos de vos préparations en situation : un buffet dressé dans une salle, un plateau de cocktail, une table prête avant l’arrivée des invités. Évitez les images de stock, que les couples repèrent vite. Photographiez avant l’arrivée du public, sans personnes reconnaissables ; si des invités apparaissent, demandez l’accord de l’organisateur. Classez les images par type d’événement : mariage, entreprise, anniversaire. Cela aide le visiteur à se projeter dans sa propre réception et réduit les questions du premier échange.`,
    },
    {
      q: `Pourquoi mon traiteur est-il absent des recherches « traiteur mariage » ?`,
      a: `La requête est concurrentielle et les moteurs favorisent les pages qui nomment clairement le service et le territoire. Une page « Mariage » distincte, avec un vrai texte sur vos formules, les communes où vous intervenez et les salles que vous connaissez, vaut mieux qu’une page d’accueil généraliste. Les avis, les liens depuis des sites de salles de réception ou de photographes, et une fiche Google soignée comptent aussi. Un site neuf met du temps à monter ; n’attendez pas de résultat immédiat, et travaillez les recherches plus précises d’abord.`,
    },
    {
      q: `Un traiteur doit-il afficher des informations sanitaires particulières sur son site ?`,
      a: `Les mentions légales classiques et l’information sur les données personnelles s’appliquent, comme pour tout site. Pour l’activité elle-même, le traitement de denrées destinées à être livrées relève d’obligations sanitaires, notamment de déclaration et de traçabilité, que le site n’a pas vocation à remplacer. Ne publiez pas de promesse que votre organisation ne peut pas tenir, par exemple sur l’absence totale d’allergènes. Renseignez-vous auprès de la direction départementale chargée de la protection des populations et sur service-public.fr pour connaître vos obligations exactes.`,
    },
  ],

  'boucherie-charcuterie': [
    {
      q: `Comment ma boucherie sort-elle quand on cherche « boucher près de moi » ?`,
      a: `Votre fiche doit utiliser la bonne catégorie, « Boucherie » ou « Boucherie-charcuterie », avec des catégories complémentaires comme « Traiteur » si vous cuisinez. Vérifiez l’adresse, le téléphone et surtout les horaires, souvent chargés dans une boucherie : pause de midi, fermeture du lundi, marché le samedi matin. Ajoutez des photos de l’étal, de la vitrine et de l’atelier si votre boucher les montre volontiers. Encouragez vos clients fidèles à laisser un avis, sans rien offrir en échange : cela reste interdit par Google et peut conduire à la suppression de l’avis.`,
    },
    {
      q: `Ai-je intérêt à créer une adresse mail professionnelle pour ma boucherie ?`,
      a: `Oui, car vos clients ne sont pas que des particuliers : restaurants, collectivités, associations et traiteurs vous écrivent pour des commandes plus importantes. Une adresse du type commandes@ sur le nom de domaine de la boucherie rassure et permet à plusieurs personnes de la lire, par exemple l’épouse au comptoir et le patron au laboratoire. Évitez les adresses personnelles mêlées à la vie de famille. Gardez l’enregistrement du domaine à votre nom et notez l’identifiant de connexion dans un endroit sûr, car on le cherche toujours au pire moment.`,
    },
    {
      q: `Comment établir plus vite les devis de buffets et de commandes de fête ?`,
      a: `Dressez une liste de vos formules habituelles : méchoui, barbecue de groupe, plateau de charcuterie, repas de Noël. Pour chacune, notez les quantités par personne, ce qui fait gagner un temps précieux quand le téléphone sonne au milieu d’une découpe. Le devis ne retient que le nombre de convives et la date. Mentionnez que le prix des pièces peut varier selon le cours ou le poids réel, et précisez les modalités de retrait. Les mentions obligatoires d’un devis sont rappelées sur service-public.fr, à relire pour votre modèle.`,
    },
    {
      q: `Quelles relances ou rappels automatiser dans une boucherie artisanale ?`,
      a: `Le plus utile est le rappel de retrait : un message envoyé quand la commande est prête, ou la veille pour une commande de fête, avec l’heure limite. Pour les clients réguliers qui prennent le même rôti chaque dimanche, une proposition de reconduction en une touche est appréciée. Les plus grosses commandes de Noël ou de Pâques gagnent à avoir une date limite annoncée sur le site puis rappelée par message. En revanche, une viande se prépare et se parle : n’automatisez ni le conseil de cuisson ni l’accueil au comptoir.`,
    },
    {
      q: `Que montrer sur le site d’une boucherie : étal, viandes, équipe, éleveurs ?`,
      a: `Montrez ce qui prouve le soin : une vitrine propre, des pièces maturées, le geste de découpe, la fabrication de la charcuterie et le visage de l’équipe. Si vous travaillez avec des éleveurs identifiés, une page qui les présente avec leur accord rassure sur l’origine. Évitez les photos de viande crue très rapprochée sans contexte, qui peuvent rebuter. Pensez à la saison : barbecue en été, plats mijotés en hiver, plateaux de Noël. Indiquez les labels uniquement si vous êtes en droit de les utiliser.`,
    },
    {
      q: `Que faire pour avoir plus de clients quand le supermarché est à côté ?`,
      a: `Misez sur ce que le rayon ne propose pas : conseil, découpe à la demande, pièces rares, fabrication maison, produits prêts à cuire pour le week-end. Un site qui annonce les arrivages, les offres de la semaine et les plats du jour donne une raison de passer. Une bonne fiche Google et des avis récents ramènent les gens du quartier. Pour les commandes de fête, la prise en ligne évite les files d’attente. Ne tentez pas de concurrencer sur le prix, mais sur la confiance accumulée avec le temps.`,
    },
    {
      q: `Quelles obligations légales pour le site d’une boucherie qui vend de la viande ?`,
      a: `Outre les mentions légales du site et l’information sur les données personnelles, la vente de viande est encadrée : étiquetage, origine de certaines viandes, information sur les allergènes pour les préparations. Ces règles s’appliquent d’abord en boutique ; si vous les affichez en ligne, elles doivent être exactes. Si vous proposez la vente à distance, d’autres règles de conservation et de livraison existent. Consultez service-public.fr, le site du ministère chargé de l’agriculture et votre chambre de métiers ou votre syndicat professionnel avant de publier une fiche produit.`,
    },
  ],

  'chocolatier': [
    {
      q: `Comment une chocolaterie sort-elle sur Google Maps face aux grandes enseignes ?`,
      a: `Misez sur la précision. Choisissez la catégorie « Chocolatier » ou « Chocolaterie », ajoutez « Confiserie » ou « Pâtisserie » en complément si c’est le cas, et décrivez l’activité : fabrication sur place, bonbons, tablettes, ateliers. Mettez à jour les horaires des périodes de fêtes, qui diffèrent du reste de l’année. Publiez des photos du laboratoire, du comptoir, des coffrets. Les avis de personnes qui ont offert vos chocolats pèsent beaucoup : invitez-les à laisser une remarque après un achat, sans jamais vous faire passer pour un client vous-même.`,
    },
    {
      q: `Quel nom de domaine et quelle adresse mail pour mon artisan chocolatier ?`,
      a: `Le nom de l’enseigne suivi de .fr est le plus naturel, et mieux vaut éviter les mots génériques comme « chocolat » seul, déjà pris par d’autres. Créez une adresse de contact sur ce domaine pour les particuliers et une autre, du type commandes@, pour les cadeaux d’entreprise ou les mariages. Les clients professionnels apprécient une adresse sérieuse pour leur comptabilité. Gardez la propriété du domaine et renouvelez-le bien avant l’échéance : une coupure en novembre, avant les commandes de fêtes, serait très pénalisante.`,
    },
    {
      q: `Comment faire plus vite le devis d’un cadeau d’entreprise ou d’un mariage ?`,
      a: `Définissez trois ou quatre formules types : coffret de fin d’année, boîte de ballotins, bonbonnières, pièces pour dragées. Pour chacune, votre trame reprend la composition, le conditionnement et la personnalisation éventuelle, comme le ruban ou la carte. Un formulaire sur le site demande la quantité, la date d’événement et le lieu de livraison. Précisez à quel moment la commande doit être validée pour être prête, car les périodes de fêtes saturent l’atelier. Les mentions à faire figurer sur un devis sont détaillées sur service-public.fr.`,
    },
    {
      q: `Quelles relances automatiques sont utiles à un chocolatier avant les fêtes ?`,
      a: `Un message envoyé aux entreprises qui ont commandé l’an dernier, quelques semaines avant la saison, pour leur demander si elles reconduisent leur coffret : c’est souvent la commande la plus facile à décrocher. Un rappel de date limite de commande pour Pâques ou Noël, affiché sur le site et diffusé par courriel aux clients qui l’ont accepté. Une confirmation avec le créneau de retrait. Respectez le consentement : n’écrivez qu’aux personnes qui ont accepté de recevoir vos messages, et laissez-leur un moyen simple de se désinscrire.`,
    },
    {
      q: `Quelles photos de chocolats publier pour que le site donne envie ?`,
      a: `Des photos nettes, en lumière douce, avec un fond sobre qui laisse vivre les brillances et les couleurs. Montrez la coupe d’un bonbon pour révéler le cœur, la texture d’un praliné, le geste de l’enrobage. Une photo de coffret fermé et ouvert aide à choisir un cadeau. Évitez les reflets blancs sur les tablettes brillantes et les chocolats posés sur un papier froissé. Les images des fêtes se préparent en amont, parfois plusieurs mois avant la période, afin qu’elles soient en ligne au moment où les gens cherchent.`,
    },
    {
      q: `Pourquoi mes chocolats n’apparaissent-ils pas sur Google quand on cherche un cadeau gourmand ?`,
      a: `Les recherches de cadeaux sont disputées par de grandes marques et des sites de vente. Votre atout est local et artisanal : écrivez des pages sur des occasions précises, comme un cadeau de naissance ou de remerciement, et sur le fait que vous fabriquez à proximité. Ajoutez le nom de la commune dans les titres et les textes, pas en bourrage mais là où cela se lit naturellement. Une fiche Google active, des avis récents et des liens de blogs ou de sites d’entreprises locales aident. Cela prend du temps et ne se décrète pas.`,
    },
    {
      q: `Quelles règles légales encadrent le site d’un chocolatier qui vend en ligne ?`,
      a: `Les mentions légales, l’information sur les données personnelles et, dès qu’il y a vente à distance, des informations précontractuelles : description du produit, modalités de paiement, de livraison et de retour, ainsi que l’exercice ou non du droit de rétractation, qui comporte des exceptions pour les denrées périssables. Les règles d’étiquetage, dont les allergènes, s’appliquent aussi. Vérifiez chaque point sur service-public.fr, economie.gouv.fr et sur le site de la DGCCRF, car ces dispositions se précisent régulièrement.`,
    },
  ],

  'glacier': [
    {
      q: `Comment mon glacier est-il visible sur Google Maps pendant la belle saison ?`,
      a: `Choisissez la catégorie « Glacier » ou « Salon de glaces » et renseignez les horaires d’été, qui diffèrent de ceux de l’hiver. Utilisez la fonction d’horaires exceptionnels pour les jours de fort soleil ou les fermetures imprévues. Placez des photos des parfums, de la vitrine et de la terrasse. Une grosse partie de votre clientèle cherche depuis son téléphone, en promenade : la précision de l’adresse et de l’ouverture du jour compte plus que n’importe quel texte. Répondez aux avis des familles, qui sont nombreux en saison.`,
    },
    {
      q: `Quelle adresse e-mail professionnelle pour un glacier artisanal ?`,
      a: `Une adresse sur le nom de domaine de la boutique, par exemple contact@, pour les demandes de privatisation, de commandes d’entremets glacés et de fournitures à des restaurants. Si vous vendez aussi sur des marchés, indiquez-la sur les cartes de visite et les affiches. Pensez à consulter la messagerie en saison creuse : c’est souvent là que tombent les demandes d’événements pour l’été à venir. Conservez le domaine à votre nom, même quand la boutique ferme plusieurs mois, afin de ne pas perdre l’adresse que les clients retiennent.`,
    },
    {
      q: `Comment établir rapidement un devis pour des glaces de mariage ou de fête ?`,
      a: `Préparez des formules claires : bacs de parfums à servir, cornets, chariot ou stand avec service sur place, entremets glacés. Le devis retient le nombre d’invités, les parfums choisis, le lieu et les contraintes de froid, qui sont la vraie difficulté de votre métier. Précisez si vous fournissez le matériel de conservation et jusqu’à quelle heure la prestation se déroule. Un formulaire sur le site demande ces informations avant votre réponse. Les mentions d’un devis sont détaillées sur service-public.fr ; relisez-les avant de figer votre modèle.`,
    },
    {
      q: `Que peut-on automatiser pour un glacier dont le planning dépend de la météo ?`,
      a: `Peu de choses se prêtent à l’automatisation quotidienne, car vos horaires bougent avec le soleil. Utile en revanche : un message de confirmation de commande d’entremets, un rappel du créneau de retrait, et un bandeau sur le site que vous modifiez en deux gestes pour annoncer une fermeture exceptionnelle. Pour les commandes événementielles, un accusé de réception immédiat évite que le client contacte un concurrent. Les relances sur la saison suivante peuvent partir à la fin de l’hiver, à destination des clients qui ont déjà organisé une fête avec vous.`,
    },
    {
      q: `Quelles photos du glacier mettre sur le site pour attirer les familles ?`,
      a: `Des parfums bien lisibles dans leurs bacs, photographiés avant que la vitrine ne soit entamée, et des cornets pris en lumière naturelle avant qu’ils ne fondent. Montrez aussi l’atelier, la machine, le geste de fabrication, car beaucoup de gens aiment savoir que la glace est faite sur place. Ajoutez la terrasse ou le point de vente ambulant. Évitez de publier des visages d’enfants sans l’accord de leurs parents. Gardez deux séries d’images, l’une pour l’été et l’autre pour l’automne, avec les entremets et les bûches glacées.`,
    },
    {
      q: `Pourquoi mon glacier est-il introuvable en hiver quand on tape son nom ?`,
      a: `Parce que les moteurs voient un site pauvre en contenu et une fiche inactive pendant la fermeture. Gardez la page en ligne toute l’année, avec une date de réouverture clairement annoncée, et publiez quelques contenus hors saison : entremets, commandes de fêtes, présentation du laboratoire. Mettez la fiche Google en « fermé temporairement » plutôt que de la laisser sans horaires. Ainsi, quand les beaux jours reviennent, l’établissement n’a pas à reconquérir sa visibilité de zéro, et les habitués retrouvent aussitôt l’information.`,
    },
    {
      q: `Quelles obligations légales s’appliquent au site d’un glacier artisanal ?`,
      a: `Les mentions légales du site, l’information sur les données personnelles et, si un formulaire de commande existe, une explication simple de l’usage des données. Pour les produits eux-mêmes, l’étiquetage et l’information sur les allergènes font l’objet de règles précises, en boutique comme pour la vente à distance. Les denrées glacées posent en plus des exigences de conservation au froid. Ne mentionnez pas de label ou de qualification sans pouvoir les justifier. Pour le détail applicable à votre cas, consultez service-public.fr, la DGCCRF et votre chambre consulaire.`,
    },
  ],

  'epicerie-fine': [
    {
      q: `Que faire pour que mon épicerie fine apparaisse dans Google Maps ?`,
      a: `Créez la fiche en choisissant « Épicerie fine » comme catégorie principale, puis ajoutez des catégories secondaires utiles : « Magasin de produits du terroir », « Cave à vins » ou « Traiteur » selon ce que vous vendez. Détaillez les rayons dans la description : conserves, huiles, thés, produits locaux. Photographiez les étagères, les coffrets et la vitrine de produits frais. Les avis comptent beaucoup pour un commerce de conseil : les clients qui disent avoir été guidés vers le bon produit rassurent mieux que la meilleure description.`,
    },
    {
      q: `Quel nom de domaine choisir pour une épicerie fine qui veut vendre en ligne ?`,
      a: `Un nom proche de l’enseigne, court et facile à épeler, terminé par .fr pour une clientèle française. Évitez d’y inclure un produit précis si votre gamme évolue : une boutique qui vend aujourd’hui des huiles vendra peut-être demain des bières locales. Créez ensuite une adresse de contact, une autre pour les commandes, et si vous avez des associés ou des employés, des adresses distinctes. Le nom de domaine doit être à votre nom d’exploitant, avec des coordonnées à jour, car c’est sur lui que repose toute la présence en ligne.`,
    },
    {
      q: `Comment faire un devis plus vite pour des coffrets destinés aux entreprises ?`,
      a: `Constituez des coffrets types, avec leur composition, leur conditionnement et leurs options de personnalisation. Un comité d’entreprise ou un artisan qui offre des cadeaux à ses clients veut surtout choisir une formule et voir une facture claire. Votre trame de devis reprend les produits, les quantités, la date de livraison et la manière de payer. Prévoyez la substitution d’un produit en rupture, en la mentionnant d’avance. Pour les mentions à faire apparaître sur un devis et une facture, reportez-vous à service-public.fr.`,
    },
    {
      q: `Quelles relances ou alertes automatiques conviennent à une épicerie fine ?`,
      a: `Trois cas sont intéressants : informer les clients inscrits quand un produit recherché revient en stock, relancer les paniers laissés en cours de commande sur la boutique en ligne, et rappeler l’échéance des commandes de fêtes. Les alertes de retour de stock fonctionnent bien pour les produits rares ou saisonniers. Pour les professionnels, un récapitulatif des précédentes commandes facilite la reconduction. N’envoyez rien sans consentement préalable et proposez toujours une désinscription simple ; un excès de messages dessert une clientèle venue chercher du conseil.`,
    },
    {
      q: `Quelles photos faut-il pour un site d’épicerie fine qui vend des produits du terroir ?`,
      a: `Des photos de produits sur fond neutre pour les fiches, qui permettent de comparer, et des photos d’ambiance pour la page d’accueil : l’étagère de bocaux, le comptoir, une dégustation. Montrez les producteurs, avec leur accord, car l’origine est votre argument. Une même lumière et un même cadrage donnent un site cohérent. Prenez les photos des étiquettes de face, lisibles, pour que le visiteur retrouve ce qu’il a vu en boutique. Renouvelez les images à chaque saison de fêtes, où les coffrets changent de composition.`,
    },
    {
      q: `Comment attirer plus de clients dans mon épicerie fine sans devenir un supermarché ?`,
      a: `Soyez la boutique où l’on trouve ce qu’on ne trouve pas ailleurs et où l’on est conseillé. Des pages sur vos produits phares, vos producteurs et vos idées de cadeaux répondent à des recherches réelles. Les dégustations, les soirées thématiques et les ateliers sont des occasions de revenir, à annoncer sur le site et sur la fiche Google. Une newsletter avec consentement entretient le lien. Ne vous éparpillez pas : une épicerie reconnue pour trois spécialités se retient mieux qu’une boutique qui promet tout.`,
    },
    {
      q: `Quelles règles s’appliquent au site d’une épicerie fine qui vend des produits alimentaires ?`,
      a: `Les mentions légales de l’éditeur, l’information sur les données personnelles et, pour toute vente à distance, les informations précontractuelles sur le prix, la livraison et les retours. Les produits alimentaires imposent un étiquetage précis et, pour certains, des règles de conservation. Si vous vendez des boissons alcoolisées, des dispositions supplémentaires s’appliquent. Ne faites jamais figurer un label, une appellation ou une origine qui ne soit pas exacte. Consultez service-public.fr, la DGCCRF et la CNIL, puis demandez conseil à votre chambre consulaire si un point vous paraît incertain.`,
    },
  ],

  'cave-vins-spiritueux': [
    {
      q: `Comment ma cave à vins se fait-elle trouver sur Google Maps ?`,
      a: `Sélectionnez la catégorie « Caviste » ou « Magasin de vins et spiritueux », puis ajoutez ce qui vous distingue : vins naturels, bières artisanales, whiskies, conseils. Remplissez les horaires et mentionnez les soirées de dégustation dans les publications de la fiche. Les photos de la cave, des rayons et du comptoir donnent confiance. Les avis comptent beaucoup : un client qui explique que vous l’avez aidé à trouver le vin d’un repas précis vaut mieux que cent étoiles sans commentaire. Répondez avec courtoisie et sans polémique.`,
    },
    {
      q: `Quel nom de domaine et quelle adresse mail pour un caviste indépendant ?`,
      a: `Prenez le nom de la cave, suivi de .fr, et évitez les mots vagues. Si vous êtes connu sous votre propre nom, un second domaine peut rediriger vers le premier. Une adresse professionnelle sert à recevoir les demandes de restaurateurs, de particuliers qui organisent un mariage et de producteurs qui vous proposent leurs cuvées. Utilisez une adresse distincte pour les commandes. Gardez le domaine à votre nom, avec une adresse de secours, et notez la date de renouvellement dans votre agenda : on l’oublie facilement.`,
    },
    {
      q: `Comment faire des devis et des factures plus vite pour un caviste ?`,
      a: `Pour les commandes de groupe, comme un mariage, un repas d’entreprise ou une cave de restaurant, préparez un modèle où vous saisissez les références, les quantités, le conditionnement et le calendrier de livraison. Prévoyez un champ pour la reprise éventuelle des bouteilles ouvertes et une mention sur la disponibilité des millésimes. Un logiciel de caisse ou de gestion qui édite facture et suivi de stock en même temps évite la double saisie. Les mentions d’une facture et la réforme de la facturation électronique sont à vérifier sur impots.gouv.fr et economie.gouv.fr.`,
    },
    {
      q: `Que peut-on automatiser dans une cave pour fidéliser les amateurs de vin ?`,
      a: `L’arrivée d’une cuvée attendue : un client qui a demandé à être prévenu reçoit un message dès que la bouteille est en rayon. Le rappel d’une soirée de dégustation à laquelle il s’est inscrit. La reconduction d’une caisse habituelle. Ces envois s’appuient sur le consentement du client, qu’il peut retirer à tout moment. Ne programmez rien qui incite à boire davantage, et gardez la relation de conseil au comptoir. L’automatisation sert à ne pas oublier un client, pas à le noyer de promotions.`,
    },
    {
      q: `Quelles photos montrer sur le site d’une cave sans enfreindre les règles sur l’alcool ?`,
      a: `Privilégiez l’information : étiquettes lisibles, régions, producteurs, caves, ambiance du magasin, dégustations encadrées. Évitez les images qui associent l’alcool à la performance, à la séduction ou à des mineurs. Les règles de communication sur l’alcool sont strictes et relèvent de la loi Evin, qu’il faut consulter précisément sur legifrance.gouv.fr ou auprès d’un conseil juridique avant de publier. Des photos de vignerons au travail ou de caisses en préparation montrent le métier sans prendre de risque. En cas de doute sur une image, retirez-la.`,
    },
    {
      q: `Pourquoi ma cave n’est-elle pas visible quand on cherche « vin » et ma commune ?`,
      a: `Cette requête est très concurrentielle, avec des supermarchés et des sites nationaux. Concentrez-vous sur des recherches plus précises : « vin bio », « caviste conseil », « coffret cadeau vin », associées à votre commune. Votre fiche Google doit être complète et vos avis récents. Sur le site, rédigez des pages sur vos spécialités et vos producteurs, avec du texte plutôt que des images de listes de prix. Soyez patient : un caviste connu sur son territoire s’y bâtit une réputation sur la durée, et le site vient la confirmer.`,
    },
    {
      q: `Quelles obligations légales pour le site d’un caviste qui parle d’alcool ?`,
      a: `Aux mentions légales et à l’information sur les données personnelles s’ajoutent des règles propres à l’alcool : encadrement de la publicité, avertissement sanitaire, interdiction de vente aux mineurs, régime fiscal des boissons alcooliques et, pour la vente à distance, des formalités supplémentaires. Une simple case « j’ai plus de dix-huit ans » ne suffit pas toujours à elle seule. Le cadre exact dépend de votre activité : consultez douane.gouv.fr, service-public.fr et legifrance.gouv.fr, ou un conseil spécialisé, avant de mettre une boutique en ligne.`,
    },
  ],

  'fromager': [
    {
      q: `Comment une fromagerie apparaît-elle dans Google Maps quand on cherche du fromage ?`,
      a: `Choisissez « Fromagerie » comme catégorie principale, puis ajoutez « Crémerie » ou « Épicerie fine » si c’est votre cas. Décrivez en quelques lignes ce qui vous distingue : fromages affinés sur place, laits crus, produits locaux. Les horaires comptent, surtout si vous êtes aussi sur les marchés : précisez-le dans la description plutôt que de laisser le client se déplacer pour rien. Des photos de la cave d’affinage, du comptoir et des plateaux préparés donnent envie. Les avis qui évoquent le conseil et la dégustation sont les plus utiles.`,
    },
    {
      q: `Quelle adresse e-mail professionnelle créer pour ma crèmerie-fromagerie ?`,
      a: `Une adresse construite sur le nom de domaine de la boutique, sous la forme contact@ ou commandes@. Elle sert aux particuliers qui commandent un plateau, mais aussi aux restaurants qui se fournissent chez vous et aux organisateurs de repas. Évitez de mélanger boîte personnelle et boîte du commerce : en période de fêtes, vous ne voulez pas manquer une commande noyée dans le courrier de famille. Si vous êtes plusieurs au comptoir, une adresse partagée permet à chacun de répondre. Conservez l’enregistrement du domaine à votre nom.`,
    },
    {
      q: `Comment faire des devis de plateaux de fromages sans y passer la soirée ?`,
      a: `Définissez des plateaux types, par exemple pour dix, vingt ou trente personnes, avec la composition, le poids par convive et les accompagnements. Le devis reprend la formule choisie, la date de retrait ou de livraison et la manière de conserver les fromages d’ici là. Indiquez que les affinages varient et que certaines références peuvent être remplacées par un équivalent. Pour les mariages et les repas d’entreprise, un formulaire sur le site recueille le nombre de convives et l’occasion. Les mentions d’un devis sont à vérifier sur service-public.fr.`,
    },
    {
      q: `Quels rappels automatiques sont utiles à un fromager avant les fêtes ?`,
      a: `Un message qui annonce la date limite pour commander un plateau de Noël, puis un autre qui confirme la composition et l’horaire de retrait. Un rappel la veille, car un fromage préparé et non retiré se perd. Pour les fidèles, une proposition de reconduire le plateau de l’année précédente. Le reste du temps, l’échange au comptoir est votre force : on vient pour le conseil sur l’affinage, le choix du jour et l’accord avec un vin. L’outil doit simplement vous libérer du temps pour cela.`,
    },
    {
      q: `Que photographier pour le site d’une fromagerie ?`,
      a: `La coupe d’une pâte, la croûte d’un fromage affiné, la cave, la vitrine à l’heure où elle est la mieux garnie, un plateau complet, et le geste de la découpe. Montrez aussi les producteurs et les fermes si vous en avez l’autorisation. Une lumière chaude et naturelle rend mieux les couleurs des pâtes que l’éclairage de la vitrine, souvent trop blanc. Prenez vos photos tôt le matin, quand les plateaux sont frais. Évitez de montrer des produits dont l’aspect est dégradé : une seule photo ratée suffit à faire douter de la fraîcheur.`,
    },
    {
      q: `Comment faire connaître ma fromagerie au-delà des clients du quartier ?`,
      a: `Racontez ce que vous faites de particulier : affinage maison, fromages de petits producteurs, sélection de saison, accords avec des vins du coin. Des pages sur ces sujets répondent à de vraies recherches, comme « plateau de fromages pour un mariage » ou « fromagerie artisanale » associées à votre commune. Une fiche Google active, des avis, des mentions dans des sites de producteurs ou de restaurants ajoutent de la visibilité. Si vous tenez un stand de marché, signalez-le avec les jours et le lieu, pour que le site serve aussi à vous retrouver.`,
    },
    {
      q: `Quelles obligations légales pour le site d’un fromager qui parle d’AOP ?`,
      a: `Les mentions légales classiques et l’information sur les données personnelles s’appliquent. Pour les fromages, les appellations et indications de qualité sont protégées : n’en utilisez une que pour un produit qui y a droit, et reprenez son nom exact. Les règles d’étiquetage, d’information sur les allergènes et de conservation s’appliquent aussi, en boutique comme à distance. Pour l’expédition de produits frais, des conditions particulières existent. Vérifiez sur service-public.fr, auprès de l’INAO et de la DGCCRF ce qui vous concerne avant de publier vos fiches.`,
    },
  ],

  'primeur': [
    {
      q: `Comment mon étal de fruits et légumes est-il trouvé sur Google Maps ?`,
      a: `Créez la fiche avec la catégorie « Marchand de fruits et légumes » ou « Primeur », en ajoutant « Épicerie » ou « Marché de producteurs » si c’est pertinent. Si vous êtes aussi sur des marchés de plein vent, indiquez les jours et lieux dans la description, car l’adresse du magasin ne dit pas tout. Mettez à jour les horaires pendant les vacances. Des photos d’étal garni, prises le matin, sont plus parlantes que celles d’un rayon vide en fin de journée. Les avis qui mentionnent la fraîcheur et l’origine aident beaucoup.`,
    },
    {
      q: `Faut-il un nom de domaine et une adresse mail pour un primeur de quartier ?`,
      a: `Oui, car de plus en plus de clients, y compris des restaurateurs, des crèches et des cantines, passent commande par écrit. Un nom de domaine simple, au nom de la boutique, et une adresse commandes@ ou contact@ leur permettent de vous joindre sans passer par un téléphone souvent occupé pendant la vente. Une adresse dédiée permet aussi de ne pas rater une demande lors du coup de feu du matin. Gardez le nom de domaine à votre nom et ajoutez un second contact en cas de problème de connexion.`,
    },
    {
      q: `Comment gagner du temps sur les devis et factures pour les restaurateurs ?`,
      a: `Avec des clients professionnels qui commandent chaque semaine, tenez une liste de produits habituels et de conditions de livraison, de façon à ne ressaisir que les quantités. Les cours changent de semaine en semaine : un bon de commande qui précise que le prix est confirmé à la livraison évite les discussions. Un outil qui édite les bons de livraison et les factures à partir de la même saisie réduit les erreurs. Les mentions obligatoires et le calendrier de la facture électronique sont à vérifier sur impots.gouv.fr et economie.gouv.fr.`,
    },
    {
      q: `Quelles commandes ou relances automatiser quand les produits changent chaque jour ?`,
      a: `L’automatisation convient aux commandes récurrentes : un restaurateur ou une crèche qui reçoit chaque semaine un message pour confirmer sa liste habituelle, avec la possibilité de la modifier avant une heure limite. Pour les particuliers, les paniers hebdomadaires peuvent faire l’objet d’un rappel de retrait. En revanche, la liste des arrivages du jour se publie à la main, en quelques secondes. Ne promettez jamais un produit avant d’être certain de l’avoir reçu : un message qui annonce des fraises qui n’arrivent pas fait plus de tort qu’une vitrine vide.`,
    },
    {
      q: `Quelles photos de fruits et légumes mettre sur le site d’un primeur ?`,
      a: `L’étal du matin, les caisses fraîchement déchargées, un gros plan sur un produit de saison, le producteur ou le maraîcher, avec son accord. Préférez la lumière du jour, qui rend les couleurs sans les saturer. Montrez le geste du commerçant, qui goûte, trie et conseille : c’est ce que la grande surface n’offre pas. Évitez les images de stock où tout est parfait et uniforme, qui contredisent le caractère de vos produits. Faites évoluer les photos avec les saisons, des asperges du printemps aux courges de l’automne.`,
    },
    {
      q: `Comment avoir plus de clients quand les supermarchés vendent aussi des légumes ?`,
      a: `Parlez de ce qu’ils n’ont pas : fraîcheur du jour, produits locaux, variétés anciennes, conseil de cuisson, fruits mûrs à point selon le jour où vous les mangez. Un site qui annonce les arrivages et les produits de saison donne une raison de passer. Les paniers composés, les commandes pour le week-end et la livraison à proximité élargissent la clientèle. Une fiche Google bien tenue et des avis réguliers font venir les nouveaux habitants du quartier. Inutile de rivaliser sur les prix : la confiance vient de la qualité constatée.`,
    },
    {
      q: `Quelles règles légales pour le site d’un primeur qui vend des produits frais ?`,
      a: `Les mentions légales du site et l’information sur les données personnelles. La vente de fruits et légumes est encadrée : affichage des prix, indication de l’origine et de la catégorie pour de nombreux produits. Ces obligations valent d’abord sur l’étal et s’appliquent à vos annonces en ligne si elles mentionnent des prix. Si vous revendez des produits de producteurs, ne présentez pas comme les vôtres des produits qui ne le sont pas. Vérifiez le détail sur service-public.fr et auprès de la DGCCRF, car certaines règles dépendent du type de produit.`,
    },
  ],

  'poissonnier': [
    {
      q: `Comment ma poissonnerie ressort-elle quand on cherche du poisson frais sur Google Maps ?`,
      a: `Choisissez la catégorie « Poissonnerie », ajoutez « Marchand de fruits de mer » si vous vendez des coquillages, et vérifiez que les horaires correspondent à vos arrivages et à vos jours de fermeture, souvent le lundi. Indiquez dans la description si vous êtes aussi sur des marchés. Des photos de l’étal bien garni, de la glace et de la vitrine sont les plus efficaces. Les avis sur la fraîcheur et le conseil de préparation rassurent les nouveaux clients. Répondez avec précision, y compris quand un client a eu un souci.`,
    },
    {
      q: `Quel nom de domaine et quelle adresse e-mail pour ma poissonnerie ?`,
      a: `Un nom de domaine proche de l’enseigne, simple à écrire, terminé par .fr. Évitez les mots techniques de la pêche que le public écrit de plusieurs façons. Créez ensuite une adresse commandes@ pour les plateaux de fruits de mer des fêtes et une autre pour les professionnels, restaurants ou collectivités. La messagerie est consultée à des heures où vous n’êtes plus à l’étal, ce qui vous permet de traiter les demandes avec calme. Gardez le contrôle du domaine et notez bien sa date de renouvellement.`,
    },
    {
      q: `Comment établir plus vite un devis de plateau de fruits de mer ?`,
      a: `Préparez des plateaux types dont la composition est décrite par nombre de personnes : huîtres, crustacés, coquillages, accompagnements. Le devis précise le conditionnement, le jour de retrait ou de livraison et la possibilité d’ajuster la composition selon la pêche. Mentionnez que les arrivages influencent le contenu et que vous proposerez un équivalent si besoin. Pour les gros plateaux de fêtes, indiquez la date limite de commande. Les mentions à porter sur un devis ou une facture sont rappelées sur service-public.fr, à relire avant de finaliser le modèle.`,
    },
    {
      q: `Quelles notifications automatiques ont du sens pour une poissonnerie ?`,
      a: `Un message à vos clients inscrits quand un produit apprécié arrive, comme les saint-jacques en saison, à condition qu’ils l’aient demandé. Un rappel de retrait de commande, plus important que dans d’autres commerces, car un produit de la mer ne s’attend pas. Une date limite annoncée avant les fêtes. Évitez d’annoncer à l’avance un poisson dont la pêche est incertaine : mieux vaut publier l’arrivage une fois reçu. L’automatisation fait gagner du temps sur la logistique, mais les conseils sur la préparation se donnent de vive voix.`,
    },
    {
      q: `Quelles photos de poissons et de coquillages publier sur le site ?`,
      a: `Des photos de l’étal prises tôt, quand la glace est propre et les produits brillants : poissons entiers, filets, coquillages, crustacés vivants s’il y en a. Montrez aussi les gestes, comme le levage de filets ou l’écaillage, qui rassurent sur le travail fait sur place. Une lumière naturelle donne une image plus fidèle que le flash, qui accentue les reflets. Évitez les images de stock de poissons exotiques que vous ne vendez pas. Mettez à jour les photos au rythme des saisons de pêche et des produits de fête.`,
    },
    {
      q: `Pourquoi mon site de poissonnerie ne m’amène-t-il aucun client nouveau ?`,
      a: `Il manque sans doute de contenu précis et de mise à jour. Un site qui n’affiche ni arrivages, ni horaires fiables, ni page sur les plateaux n’apporte rien à un passant qui hésite. Vérifiez que votre fiche Google est complète et que le nom, l’adresse et le téléphone sont identiques partout. Ajoutez des pages sur vos spécialités et sur la commande de fêtes. Les avis récents et les mentions par des restaurants ou des associations locales aident. Le travail est progressif, et le site doit refléter ce que vous proposez réellement chaque semaine.`,
    },
    {
      q: `Quelles règles légales s’appliquent au site d’une poissonnerie ?`,
      a: `Les mentions légales du site et l’information sur les données personnelles s’appliquent comme partout. Pour les produits de la mer, l’information du consommateur est encadrée : dénomination de l’espèce, méthode de production, zone de capture, notamment sur les étiquettes et à l’étal. Reprenez ces informations avec exactitude si vous les publiez en ligne. La vente à distance de produits frais impose en plus des règles de conservation et de transport. Consultez service-public.fr, la DGCCRF et le site de l’administration chargée de la pêche pour connaître vos obligations précises.`,
    },
  ],
}
