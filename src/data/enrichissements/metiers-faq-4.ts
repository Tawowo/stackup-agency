import type { ContenuLocal } from './types'

export const FAQ_METIERS: Record<string, ContenuLocal['faq']> = {
  'librairie-papeterie': [
    {
      q: `Comment ma librairie apparaît-elle dans Google Maps pour « livre près de moi » ?`,
      a: `Créez ou revendiquez votre fiche Google Business Profile, puis choisissez comme catégorie principale « Librairie », en ajoutant « Papeterie » ou « Fournitures scolaires » en catégories secondaires si vous les vendez vraiment. Renseignez les horaires, y compris ceux de la rentrée et des fêtes, et publiez des photos de la vitrine, des tables de nouveautés et du coin jeunesse. Les avis comptent : répondez à chacun, sans jamais offrir de remise en échange d’un avis, ce que Google n’autorise pas. Le détail des règles est sur support.google.com/business.`,
    },
    {
      q: `Quel nom de domaine choisir pour une librairie et comment avoir une adresse e-mail professionnelle ?`,
      a: `Prenez le nom de la librairie tel qu’il figure sur la vitrine, sans tiret ni abréviation, de préférence en .fr : c’est ce que vos clients taperont de mémoire. Réservez-le à votre nom, pas à celui d’un prestataire, pour rester maître de votre adresse. Côté courrier, une adresse du type commandes@votre-domaine inspire plus confiance qu’une messagerie grand public, surtout pour les établissements scolaires, les mairies et les comités d’entreprise qui vous passent des commandes groupées. Elle peut se rediriger vers votre boîte actuelle si vous le souhaitez.`,
    },
    {
      q: `Comment faire vite un devis pour une école qui commande des livres ?`,
      a: `Les écoles et collectivités demandent un devis avant tout bon de commande. Gardez un modèle unique avec vos coordonnées, votre numéro SIRET, la liste des titres avec leur ISBN, les quantités et, le cas échéant, la remise accordée. Un formulaire sur le site où l’acheteur colle sa liste d’ISBN vous épargne la saisie : il ne vous reste qu’à vérifier la disponibilité chez votre diffuseur avant d’envoyer le document. Un logiciel de facturation courant suffit, pourvu qu’il produise un PDF propre avec toutes les mentions obligatoires, détaillées sur service-public.fr.`,
    },
    {
      q: `Que puis-je automatiser dans une librairie : réservations de titres, relances, messages de retrait ?`,
      a: `Le plus utile est de prévenir sans décrocher le téléphone : un message automatique dès qu’un livre commandé auprès du diffuseur est arrivé, avec la durée pendant laquelle il reste en réserve au comptoir. Même logique pour les réservations en ligne : confirmation immédiate, puis rappel avant la remise en rayon. Les alertes de parution conviennent aux lecteurs de sagas ou d’un auteur précis, qui s’inscrivent une fois. Gardez à la main les conseils de lecture et les relances d’impayés des comptes collectivités, qui demandent un ton personnel.`,
    },
    {
      q: `Quelles photos et quels contenus montrer sur le site d’une librairie indépendante ?`,
      a: `Montrez ce qu’une grande plateforme ne peut pas montrer : votre vitrine, vos tables thématiques, les visages de ceux qui conseillent, le coin jeunesse. Une photo de chaque libraire avec son coup de cœur du mois vaut mieux qu’un catalogue sans fin. Sur les réseaux, annoncez les dédicaces et les rencontres, en demandant l’accord de l’auteur et de la maison d’édition pour les visuels. Côté avis, invitez les lecteurs à laisser un mot sur votre fiche Google plutôt que de recopier des critiques trouvées ailleurs, dont vous n’avez pas les droits.`,
    },
    {
      q: `Pourquoi ma librairie n’apparaît pas sur Google et comment attirer plus de lecteurs du quartier ?`,
      a: `Un site neuf peut mettre du temps avant d’être repéré. Vérifiez d’abord qu’il est indexé en tapant le nom de la librairie, puis que votre ville figure dans le titre de la page d’accueil et dans le texte. Ensuite, une page par rayon que vous tenez vraiment (bande dessinée, jeunesse, papeterie fine, livres régionaux de Touraine) répond aux recherches précises. Les liens depuis la mairie, l’office de tourisme et les écoles pèsent plus que n’importe quelle astuce. Search Console, gratuit, montre ce que Google voit ; le guide est sur developers.google.com/search.`,
    },
    {
      q: `Quelles mentions légales et obligations RGPD pour le site d’une librairie avec commande en ligne ?`,
      a: `Tout site professionnel affiche l’identité de l’exploitant, l’adresse, le contact, le numéro d’immatriculation et l’hébergeur. Si vous vendez en ligne, s’ajoutent les conditions générales de vente, le droit de rétractation et la politique de retour. Côté données, votre formulaire de réservation et une éventuelle lettre d’information imposent une information claire sur l’usage des coordonnées et un consentement pour les envois commerciaux. Le prix du livre est encadré par la loi : vérifiez les règles sur les sites officiels (service-public.fr, cnil.fr) avant de publier une promotion.`,
    },
  ],
  'tabac-presse': [
    {
      q: `Comment un bureau de tabac ressort-il sur Google Maps quand on cherche un point colis ?`,
      a: `Beaucoup de recherches n’ont rien à voir avec le tabac : « point relais près de moi », « photocopie », « timbres fiscaux ». Dans la fiche Google, gardez « Bureau de tabac » en catégorie principale, mais décrivez les services réels : retrait de colis, presse, jeux, papeterie, timbres. Les horaires doivent être exacts, jours fériés compris, car une porte fermée alors que la fiche annonce l’ouverture provoque des avis rageurs. Répondez calmement à tous les avis, y compris négatifs. Les consignes de Google sont sur support.google.com/business.`,
    },
    {
      q: `Quelle adresse e-mail professionnelle et quel nom de domaine pour mon tabac-presse ?`,
      a: `Un nom de domaine composé du nom du bar-tabac suivi de la commune évite les confusions entre établissements portant le même nom dans la région. L’adresse e-mail ne sert pas qu’à écrire : elle reçoit les messages des fournisseurs, de votre réseau de jeux, des transporteurs pour les colis et de la banque. Séparez une adresse de gestion (comptabilité, contrats) d’une adresse de contact affichée sur le site, pour qu’un courrier indésirable ne noie jamais un message important d’un organisme officiel.`,
    },
    {
      q: `Un tabac-presse doit-il faire des factures, et comment les préparer sans y passer la soirée ?`,
      a: `La plupart des ventes au comptoir se règlent par ticket, mais certains clients demandent une facture : entreprises voisines, artisans qui achètent des fournitures, commerçants du coin. Gardez un modèle prêt, avec identité complète, numéro SIRET, date, désignation et TVA par ligne, plutôt que de rédiger à la main au moment de la demande. Votre logiciel de caisse peut parfois en émettre ; sinon, un outil de facturation simple suffit. Pour les mentions obligatoires et la réforme de la facture électronique, vérifiez les sites officiels (impots.gouv.fr, economie.gouv.fr).`,
    },
    {
      q: `Quelles alertes automatiques ont du sens pour un bureau de tabac ?`,
      a: `Peu de choses se relancent dans un tabac, mais deux usages sont utiles. D’abord, un message aux clients qui attendent un colis, dès qu’il est enregistré au comptoir, avec les horaires de retrait et la pièce d’identité à présenter. Ensuite, un rappel de réservation pour les titres de presse ou les collections que vos habitués suivent. N’automatisez rien autour des produits du tabac, dont la promotion est très encadrée. Les impayés sont rares au comptoir : inutile d’y consacrer un outil.`,
    },
    {
      q: `Que montrer en photos et sur les réseaux pour un tabac-presse sans publicité interdite ?`,
      a: `Montrez le lieu et les services : la devanture, le rayon presse, le coin papeterie, le comptoir colis, la vitrine de cartes postales ou de souvenirs. Évitez les photos qui mettent en avant des produits du tabac ou du vapotage, leur publicité étant encadrée par la loi ; en cas de doute, interrogez votre organisation professionnelle ou consultez les sites officiels. Les réseaux servent surtout à annoncer une parution attendue, un changement d’horaires, une fermeture pour congés. Un bon avis récent parle de l’accueil, pas des produits.`,
    },
    {
      q: `Mon tabac n’apparaît pas sur Google : comment attirer plus de clients dans la commune ?`,
      a: `Pour un commerce de proximité, le gros du trafic vient de Google Maps et des recherches « près de moi », donc de la fiche. Vérifiez qu’elle est validée, que l’adresse est précise et que le téléphone est joignable aux horaires annoncés. Sur le site, une page par service réel (colis, presse, papeterie, jeux) avec le nom de la commune répond aux recherches précises. Les annuaires locaux et le site de la mairie listent souvent les commerces ouverts le dimanche : demandez à y figurer. Search Console vous montre ce que Google a indexé.`,
    },
    {
      q: `Quelles règles légales pour le site d’un bureau de tabac, entre mentions et publicité ?`,
      a: `Comme tout professionnel, affichez vos mentions légales : identité de l’exploitant, adresse, numéro d’immatriculation, contact, hébergeur. Spécificité de la profession : un buraliste est un débitant agréé, et la publicité en faveur du tabac comme la vente à distance de ces produits sont très encadrées. Ne vendez et ne promouvez rien sur le site sans l’avoir vérifié auprès de l’administration compétente ou de votre confédération. Pour les jeux d’argent, évitez toute incitation et renvoyez vers les sites officiels des opérateurs. Le RGPD s’applique à vos formulaires (cnil.fr).`,
    },
  ],
  'magasin-sport': [
    {
      q: `Comment mon magasin de sport apparaît-il sur Google Maps pour un vélo ?`,
      a: `Choisissez la catégorie principale qui correspond à votre cœur de métier (magasin d’articles de sport, magasin de vélos ou de chaussures de sport) et ajoutez les autres en secondaires. Dans la fiche, listez vos services réels : réparation, location, fixation de skis, gravure de cadres, thermoformage, selon ce que vous faites. Publiez des photos du rayon et de l’atelier à chaque saison. Demandez des avis aux clients juste après un service réussi, sans contrepartie, et répondez à tous. Le détail est sur support.google.com/business.`,
    },
    {
      q: `Quel nom de domaine et quelle adresse e-mail pour un magasin de sport indépendant ?`,
      a: `Si vous êtes connu sous une enseigne, reprenez-la telle quelle ; si le nom est courant, ajoutez la commune ou la spécialité pour éviter la confusion avec une grande enseigne. Évitez un nom trop long ou truffé de tirets, difficile à dicter au comptoir. Pour les messages, prévoyez au moins deux adresses : une pour les commandes de clubs, de comités d’entreprise et de collectivités, une pour l’atelier et les rendez-vous. Elles arrivent sur le même téléphone sans se mélanger, et les responsables de clubs savent à qui écrire.`,
    },
    {
      q: `Comment faire vite un devis pour équiper un club ou une équipe ?`,
      a: `Un club demande souvent le même devis avec de petites variantes : maillots, shorts, survêtements, flocage, tailles par joueur. Préparez un modèle où chaque ligne indique la référence, la quantité par taille, la personnalisation et les conditions de remise, puis dupliquez-le. Un tableau des tailles à remplir par le responsable évite les allers-retours par téléphone. Précisez dès le devis ce qui s’applique à la marchandise personnalisée, souvent ni reprise ni échangée ; vérifiez la règle exacte sur service-public.fr ou economie.gouv.fr. Votre logiciel de caisse ou un outil de facturation suffit.`,
    },
    {
      q: `Quels rappels automatiques sont utiles pour un atelier de réparation de vélos ou de skis ?`,
      a: `Prévenez par message quand la réparation est prête, avec l’horaire de retrait et le solde à régler : c’est ce qui évite qu’un vélo reste des semaines sur l’étagère. Avant la saison, un rappel de révision (entretien annuel du vélo, affûtage des carres avant l’hiver) fait revenir vos clients sans promotion agressive. Pour la location, une confirmation puis un rappel de retour la veille. Les relances d’impayés des comptes de clubs restent à votre main. Chaque message suppose le consentement du client, détaillé sur cnil.fr.`,
    },
    {
      q: `Que montrer sur le site d’un magasin de sport : photos, événements, réseaux ?`,
      a: `Les clients veulent vous voir pratiquer. Montrez l’équipe sur un sentier, au bord d’un terrain, sur la route avec les produits que vous conseillez, plutôt que des visuels de catalogue fournis par les marques. Mettez en avant l’atelier, les essais de matériel, les sorties organisées, les résultats des clubs que vous soutenez, avec leur accord. Sur les réseaux, un conseil de saison (choisir sa chaussure de trail, régler sa selle) vaut mieux qu’une promotion. Citez seulement de vrais avis, en indiquant leur source.`,
    },
    {
      q: `Comment avoir plus de clients quand les grandes enseignes occupent les premiers résultats Google ?`,
      a: `N’essayez pas de gagner sur le mot « magasin de sport » : visez des requêtes précises où vous avez un vrai savoir-faire, comme « réparation vélo » avec la commune, « location de raquettes » ou « chaussures de randonnée conseil ». Une page par discipline et par service, avec vos conseils et votre zone, attire des visiteurs qualifiés. La fiche Google et les avis locaux font le reste pour la recherche « près de moi ». Les liens depuis les clubs, les offices de tourisme et les organisateurs de courses du coin sont précieux.`,
    },
    {
      q: `Quelles obligations légales pour le site d’un magasin de sport avec location ?`,
      a: `Le site affiche vos mentions légales classiques et, si vous vendez en ligne, les conditions générales de vente, le droit de rétractation et la politique de retour. Pour la location, des conditions précisant caution, état du matériel et responsabilité en cas de casse évitent les litiges. Certains équipements de sécurité (casques, protections, matériel d’escalade) répondent à des exigences de conformité : ne formulez aucune promesse de protection, renvoyez à la notice et vérifiez sur economie.gouv.fr. Vos formulaires de réservation relèvent du RGPD (cnil.fr).`,
    },
  ],
  'magasin-jouets': [
    {
      q: `Comment un magasin de jouets ressort-il dans Google Maps avant Noël ?`,
      a: `Revendiquez la fiche, choisissez « Magasin de jouets » en catégorie principale, et passez en revue les horaires bien avant décembre : ouvertures du dimanche, nocturnes, jours fériés. Ajoutez des photos des rayons par tranche d’âge et de la vitrine de Noël, que les parents consultent en quête d’idées. Publiez une mise à jour de la fiche (nouveautés, soirée jeux) quand c’est pertinent. Les avis comptent beaucoup à cette saison : répondez-y vite, et ne proposez jamais de remise ni de cadeau en échange, contraire aux règles de Google (support.google.com/business).`,
    },
    {
      q: `Quelle adresse e-mail et quel nom de domaine pour une boutique de jouets ?`,
      a: `Le nom de domaine doit se retenir à l’oreille, car on le dit souvent à voix haute entre parents : évitez les tirets et les noms trop longs. Si vous tenez une enseigne connue, reprenez-la ; sinon, ajoutez « jouets » et la commune. Pour le courrier, une adresse de contact et une adresse de commandes distinctes aident à trier en période de pointe, quand les messages pleuvent sur les disponibilités. Pensez aussi à une adresse pour les crèches, écoles et ludothèques, qui demandent des devis et attendent une réponse écrite.`,
    },
    {
      q: `Comment faire vite des devis et des factures pour une crèche ou une école ?`,
      a: `Les crèches, écoles et centres de loisirs achètent souvent par bon de commande après un devis. Un modèle comprenant vos coordonnées, votre SIRET, la désignation des jeux avec référence, la quantité, la TVA par ligne et les conditions de paiement accélère tout. Gardez-y la tranche d’âge, que l’acheteur recopie dans son dossier. Dans votre logiciel de caisse ou un outil de facturation, enregistrez un client « collectivité » une fois pour toutes. Pour les mentions obligatoires, consultez service-public.fr ; la facture électronique évolue, à vérifier sur impots.gouv.fr.`,
    },
    {
      q: `Quelles relances automatiques pour les commandes, listes de Noël et jouets mis de côté ?`,
      a: `Ce qui a du sens : confirmation de commande immédiate, message « votre jouet est arrivé » avec la durée de mise de côté, rappel avant la fin de la réservation. Pour les listes d’anniversaire ou de Noël, un récapitulatif envoyé à la famille indique ce qui reste à offrir, sans doublons. En décembre, l’annonce de la dernière date de commande pour être prêt avant Noël évite les appels paniqués. Moins utile : relancer sans cesse les paniers abandonnés, ce qui irrite. Dosez, et laissez toujours la possibilité de se désinscrire.`,
    },
    {
      q: `Quelles photos de jouets publier sans enfreindre le droit à l’image des enfants ?`,
      a: `Photographiez le jouet seul sur fond clair, puis mis en situation avec des mains d’adulte ou d’enfant, sans visage. Si un enfant apparaît, il faut l’autorisation écrite de ses parents, y compris pour vos réseaux sociaux. Une courte vidéo de démonstration d’un jeu de société ou d’une construction aide les parents à juger de la difficulté. Les photos fournies par les fabricants obéissent à leurs conditions d’utilisation : demandez-les. Les commentaires de parents sur des jouets précis rassurent, à condition d’être réels et datés, sans tri flatteur.`,
    },
    {
      q: `Mon magasin de jouets reste invisible sur Google : comment attirer les parents ?`,
      a: `Les parents cherchent par âge (« jeu pour enfant de quatre ans »), par thème (jeux de société, construction, éveil) ou par occasion (cadeau d’anniversaire). Une page par tranche d’âge et par grande catégorie, rédigée avec vos conseils, répond à ces requêtes mieux qu’un simple catalogue. Ajoutez la commune et les alentours dans le texte, et vérifiez que la fiche Google est complète. Les relais locaux, comme les sites d’écoles, de crèches ou de la mairie à l’occasion d’un marché de Noël, aident aussi. Search Console permet de suivre les recherches réellement tapées.`,
    },
    {
      q: `Quelles obligations légales pour vendre des jouets en ligne, du marquage CE aux mentions ?`,
      a: `Le site doit comporter les mentions légales classiques, les conditions générales de vente, le droit de rétractation et la politique de retour. Les jouets mis sur le marché portent le marquage CE et des avertissements adaptés à l’âge : assurez-vous que votre fiche produit reprend les informations du fabricant, sans les modifier. Les règles de sécurité des jouets sont précises ; consultez economie.gouv.fr pour ce qui vous concerne, surtout si vous importez. Le RGPD s’applique à votre formulaire et aux listes de cadeaux. Ne collectez pas de données d’enfants sans cadre précis (cnil.fr).`,
    },
  ],
  'boutique-decoration': [
    {
      q: `Comment une boutique de décoration est-elle visible sur Google Maps et Google Images ?`,
      a: `Pour la carte, choisissez la catégorie qui vous décrit le mieux (décoration d’intérieur, cadeaux ou meubles selon l’offre) et soignez les photos : devanture, ambiances, nouveautés du mois, car le public décide à l’œil. Mettez la fiche à jour à chaque renouvellement de collection. Pour Google Images, des noms de fichiers descriptifs et un texte alternatif sur chaque photo du site aident. Répondez à chaque avis, sans jamais offrir un avantage contre un commentaire, ce que Google interdit (support.google.com/business).`,
    },
    {
      q: `Quel nom de domaine choisir pour une boutique déco et comment organiser mes adresses e-mail ?`,
      a: `Un nom de domaine évocateur et court reflète l’univers de la boutique, mais il doit rester facile à épeler : évitez les jeux de mots que l’on ne sait pas écrire. Le .fr rassure. Séparez une adresse pour les clients (conseil, retrait) d’une adresse pour les créateurs et fournisseurs, avec lesquels vous échangez souvent des visuels lourds et des bons de commande. Pour les décorateurs d’intérieur, architectes ou agences immobilières qui vous achètent en nombre, une adresse nominative inspire davantage confiance qu’une adresse générique.`,
    },
    {
      q: `Comment faire un devis pour un client qui veut décorer toute une pièce ?`,
      a: `Un projet de pièce rassemble souvent luminaires, textiles, miroirs et petits meubles venus de plusieurs fournisseurs. Faites un devis listant chaque article avec référence, quantité, dimension et couleur, plus un mot sur les délais annoncés par les fournisseurs, qui restent indicatifs. Précisez ce qui est livré chez le client et ce qui reste à retirer. L’acompte à la commande protège les pièces commandées spécialement. Un modèle de devis se duplique d’un projet à l’autre et votre outil de facturation reprend les lignes. Les mentions à vérifier se trouvent sur service-public.fr.`,
    },
    {
      q: `Quels rappels automatiques pour les commandes spéciales et les acomptes en boutique de déco ?`,
      a: `Les commandes spéciales sont le cas où l’automatisation aide le plus : un message dès que l’article arrive chez vous, un rappel avant la fin de la période de mise de côté, une relance polie du solde si un acompte a été versé. Pour la livraison d’un gros objet, une confirmation du créneau convenu. Les relances de paniers abandonnés conviennent mal à des pièces uniques : mieux vaut un message quand un article revient en stock. Gardez à la main les échanges avec les clients de projets, qui attendent une relation personnelle.`,
    },
    {
      q: `Quelles photos et quels contenus pour vendre des objets de décoration en ligne ?`,
      a: `Combinez le détail et l’ambiance : une photo sur fond neutre pour montrer la forme et la matière, une photo dans un intérieur pour donner l’échelle, et les dimensions écrites. La lumière naturelle rend les couleurs plus justes, ce qui réduit les retours. Des vidéos courtes d’arrivage ou de mise en scène de la vitrine nourrissent les réseaux, notamment Instagram et Pinterest, très regardés pour l’inspiration. Quand vous publiez le travail d’un créateur, demandez-lui son accord pour ses visuels. Privilégiez les avis de clients réels, avec leurs photos si elles les autorisent.`,
    },
    {
      q: `Pourquoi ma boutique de décoration ne ressort pas sur Google et comment gagner en visibilité ?`,
      a: `Les internautes cherchent par pièce (déco salon, chambre d’enfant), par style (scandinave, bohème, rétro) ou par objet (miroir rond, suspension). Une page par univers ou par pièce, avec un texte écrit par vous plutôt que la description du fournisseur recopiée, se démarque : le même texte d’un site à l’autre est mal vu des moteurs. Un lien depuis les créateurs que vous vendez, la presse locale ou un blog déco apporte de la crédibilité. Vérifiez que chaque produit possède un titre et une description propres, et suivez les recherches dans Search Console.`,
    },
    {
      q: `Quelles mentions légales et règles de vente à distance pour une boutique de décoration ?`,
      a: `Affichez vos mentions légales, les conditions générales de vente, le droit de rétractation et la politique de retour, avec les modalités pour les articles volumineux ou fragiles. Indiquez clairement les frais de transport avant la validation de la commande. Les produits venus de créateurs étrangers doivent respecter les règles européennes de sécurité, par exemple pour les bougies, les objets en contact avec des aliments ou les luminaires : vérifiez sur economie.gouv.fr. Le RGPD s’applique à la lettre d’information et aux formulaires (cnil.fr). Pour une pièce signée, citez le créateur avec son accord.`,
    },
  ],
  'magasin-informatique': [
    {
      q: `Comment un réparateur de téléphones et d’ordinateurs ressort-il sur Google Maps ?`,
      a: `Choisissez la catégorie principale la plus proche de votre cœur d’activité (réparateur d’ordinateurs, réparateur de téléphones portables ou magasin d’informatique) et renseignez les services : réparation d’écran, récupération de données, dépannage à domicile. Dans la description, citez les marques que vous réparez vraiment. Les photos de l’atelier et du comptoir rassurent le client qui hésite à confier son appareil. Demandez un avis quand la réparation est réussie, sans contrepartie, et répondez posément aux mécontents. Les règles de Google sont sur support.google.com/business.`,
    },
    {
      q: `Quel nom de domaine et quelle adresse e-mail professionnelle pour un magasin informatique ?`,
      a: `Dans ce métier, on est jugé sur l’exemple : une adresse en gmail pour un commerce de réparation informatique fait mauvais effet. Prenez un domaine à votre nom et une adresse fonctionnelle (atelier, devis) ou nominative. Veillez à ce que l’authentification de la messagerie soit correctement configurée (SPF, DKIM) pour que vos mails de suivi de réparation n’aillent pas dans les indésirables : votre prestataire peut s’en charger. Gardez la propriété du nom de domaine à votre nom et notez les accès dans un gestionnaire de mots de passe, pas sur une feuille.`,
    },
    {
      q: `Comment faire un devis de réparation et une facture claire dès la prise en charge ?`,
      a: `Le client dépose l’appareil, vous lui remettez un bon de dépôt précisant le matériel, le numéro de série, les symptômes et l’état visible. Le devis indique ensuite la panne constatée, la pièce, la main-d’œuvre et ce qui se passe si le client refuse la réparation (frais de diagnostic éventuels, annoncés avant). Pour aller vite sans erreur, un modèle avec les pannes fréquentes en liste déroulante suffit. La facture reprend les mêmes lignes ; vérifiez les mentions obligatoires sur service-public.fr, notamment pour la garantie après réparation.`,
    },
    {
      q: `Quelles relances automatiques pour les réparations terminées et les appareils non récupérés ?`,
      a: `C’est probablement le meilleur cas d’usage : un message dès que l’appareil est réparé, un rappel quelque temps plus tard, puis un courrier écrit rappelant les conditions de stockage prévues dans votre bon de dépôt. Sans cela, des appareils s’accumulent et prennent la place. Un suivi par numéro de dossier évite que le client appelle trois fois. Pour les devis en attente de réponse, une seule relance polie. Gardez une trace écrite de chaque échange ; pour le sort juridique des appareils jamais récupérés, voir service-public.fr.`,
    },
    {
      q: `Que montrer sur le site d’une boutique de réparation informatique : photos, avis, réseaux ?`,
      a: `Montrez l’atelier propre et ordonné, le matériel de diagnostic, le plan de travail antistatique : cela prouve le sérieux. Des photos avant et après d’un écran remplacé, publiées avec l’accord du client et sans données personnelles visibles, valent mieux que des phrases. Ne montrez jamais l’écran d’un appareil client ni son contenu. Sur les réseaux, des conseils pratiques (sauvegarder son téléphone, repérer un mail frauduleux) sont plus partagés que des promotions. Les avis les plus utiles parlent de la clarté du diagnostic et de la transparence sur le prix, pas seulement de la rapidité.`,
    },
    {
      q: `Mon réparateur de téléphones n’apparaît pas sur Google : comment avoir plus de clients ?`,
      a: `Les gens tapent leur panne : « écran cassé iPhone », « ordinateur qui ne démarre plus », « récupération de photos ». Rédigez une page par panne ou par appareil que vous traitez réellement, avec la commune, le déroulement et ce que vous ne faites pas, ce qui rassure. Une fiche Google bien remplie couvre les recherches « près de moi ». Les liens depuis les entreprises voisines, les groupements de commerçants et la presse locale aident. Ne promettez pas de résultat que vous ne maîtrisez pas : une panne de carte mère ne se garantit pas. Search Console suit votre indexation.`,
    },
    {
      q: `Quelles mentions légales pour un site qui vend du reconditionné et répare des appareils ?`,
      a: `Au-delà des mentions légales habituelles, la vente de matériel neuf ou reconditionné suppose de distinguer clairement l’état de chaque appareil (neuf, reconditionné, occasion), la garantie proposée et les conditions de retour. Pour l’occasion, évitez les formules floues du type « comme neuf » sans critère. La réparation a ses propres informations à fournir au client avant de commencer. Le RGPD s’applique à vos formulaires de dépôt et de diagnostic (cnil.fr). Les règles de garantie légale et de rétractation varient selon les cas : vérifiez sur service-public.fr et economie.gouv.fr.`,
    },
  ],
  'opticien': [
    {
      q: `Comment mon opticien indépendant se classe-t-il sur Google Maps face aux chaînes ?`,
      a: `Choisissez « Opticien » en catégorie principale et ajoutez ce que vous faites vraiment : lunetterie, lentilles de contact, examen de vue si un professionnel habilité le réalise chez vous. Photographiez l’espace d’essayage, la sélection de montures, la vitrine. Précisez dans la fiche les mutuelles et dispositifs de remboursement que vous acceptez, car beaucoup de patients tapent le nom de leur mutuelle. Invitez les clients à laisser un avis après la remise de l’équipement, sans contrepartie, et répondez avec sobriété, sans jamais citer d’information de santé.`,
    },
    {
      q: `Quelle adresse e-mail professionnelle pour un opticien qui reçoit des données de santé ?`,
      a: `Un opticien échange des ordonnances, des devis pour les mutuelles, des questions sur l’adaptation de verres progressifs : ce sont des informations de santé. Une adresse sur votre propre domaine, plutôt qu’une messagerie grand public, limite les erreurs d’envoi et s’intègre mieux à un hébergement sérieux. Choisissez un nom de domaine proche de l’enseigne et de la commune. Évitez de recevoir des documents médicaux sur une adresse partagée par toute l’équipe sans règle d’accès. La CNIL (cnil.fr) publie des repères sur la sécurité des données de santé.`,
    },
    {
      q: `Comment préparer plus vite des devis d’optique pour les clients et leur mutuelle ?`,
      a: `En optique, le devis est un document encadré : il présente des éléments précis sur les équipements proposés et sert aussi à la demande de remboursement. Gardez un modèle conforme à la réglementation en vigueur, avec les champs préremplis (monture, verres, traitements, reste à charge éventuel), pour ne modifier que les lignes concernées. Votre logiciel de gestion d’optique le propose généralement déjà : vérifiez qu’il est à jour plutôt que de refaire un document à la main. Pour les mentions exactes, référez-vous à service-public.fr et aux sites des autorités de santé.`,
    },
    {
      q: `Quels rappels automatiques pour les rendez-vous et les renouvellements chez un opticien ?`,
      a: `Trois usages ont du sens : le rappel de rendez-vous la veille, avec la possibilité de décaler en un clic ; le message « vos lunettes sont arrivées », qui évite les appels ; le rappel de renouvellement, envoyé à la personne dont l’équipement est ancien, sans promesse de remboursement. Pour les lentilles, un rappel de réassort selon le rythme de port fait revenir. Gardez des messages neutres, sans détail médical, et respectez le consentement ainsi que le droit de se désinscrire (cnil.fr). Les relances d’impayés, rares mais sensibles, restent à votre main.`,
    },
    {
      q: `Quelles photos et quels contenus montrer sur le site d’un opticien, sans publicité abusive ?`,
      a: `Montrez la boutique, l’espace d’essayage, le choix de montures par univers (enfant, sport, solaire) et l’équipe qui conseille. Pour les portraits avec lunettes, il faut l’accord écrit des personnes, surtout des enfants. Les contenus sur la santé visuelle doivent rester informatifs et prudents : aucune promesse de guérison ou de résultat. La publicité des professions de santé est encadrée ; en cas de doute sur une formulation, vérifiez auprès de votre organisation professionnelle ou des sites officiels. Les avis clients portent sur l’accueil et l’ajustement, pas sur le détail d’une correction.`,
    },
    {
      q: `Mon site d’opticien n’apparaît pas sur Google : comment recevoir plus de rendez-vous ?`,
      a: `Les recherches fréquentes portent sur des besoins précis : « lunettes enfant », « verres progressifs », « lentilles de contact », « lunettes de soleil à la vue », avec le nom de la commune. Prévoyez une page par besoin, avec le déroulé du rendez-vous et ce qu’il faut apporter (ordonnance, carte de mutuelle). Une fiche Google complète, avec un bouton de prise de rendez-vous, rapproche de la décision. Les liens des écoles, des maisons de santé voisines et des clubs de sport, pour les lunettes de pratique, sont de bons relais. Search Console permet de surveiller ce qui est indexé.`,
    },
    {
      q: `Quelles obligations légales spécifiques pour le site d’un opticien-lunetier ?`,
      a: `Votre site affiche les mentions légales de tout professionnel, ainsi que les informations propres à votre activité de santé : identité de l’exploitant, adresse, qualifications éventuelles, numéro d’immatriculation. Les prix de produits de santé et la publicité sont encadrés ; ne publiez pas de promotion sans avoir vérifié les règles sur les sites officiels (service-public.fr, economie.gouv.fr). Les données de santé reçues par formulaire demandent une attention particulière : prévoyez un consentement clair et un hébergement sérieux, et consultez cnil.fr. Aucun site ne remplace un conseil juridique pour une formulation douteuse.`,
    },
  ],
  'bijouterie-horlogerie': [
    {
      q: `Comment une bijouterie apparaît-elle sur Google Maps pour « bijoutier près de moi » ?`,
      a: `Choisissez « Bijouterie » en catégorie principale, ajoutez « Horloger » ou « Réparateur de montres » si vous réparez, puis détaillez dans la fiche les services demandés : réparation, changement de pile ou de bracelet, gravure, création sur mesure. Les photos de vitrine, d’atelier et de pièces finies donnent confiance. Les avis comptent beaucoup pour un achat où l’on confie un objet de valeur : demandez-les après un retrait réussi, sans contrepartie, et répondez à tous. Les règles de la fiche sont expliquées sur support.google.com/business.`,
    },
    {
      q: `Quel nom de domaine et quelle adresse e-mail pour une bijouterie-horlogerie ?`,
      a: `Le nom de la bijouterie, éventuellement avec la ville, constitue la meilleure base : les clients qui reçoivent une carte de garantie ou un devis retapent ce que vous avez écrit. Une adresse e-mail sur votre domaine est presque indispensable dans ce métier, où la confiance se joue sur l’identité ; une messagerie grand public paraît fragile quand on confie une montre de famille. Prévoyez une adresse pour les réparations et une autre pour les créations, afin de retrouver vite les échanges avec photos et croquis. Gardez les accès à votre nom.`,
    },
    {
      q: `Comment faire plus vite un devis de création de bijou ou de réparation de montre ?`,
      a: `Préparez un modèle en deux volets : réparation (désignation de l’objet, état constaté, intervention proposée, pièces remplacées) et création (croquis, métal, pierres, dimensions, étapes de validation). Joignez-y les photos du dépôt, car elles protègent les deux parties en cas de litige sur l’état initial. Précisez la durée de validité du devis et le fait que le cours des métaux peut le faire évoluer. Un acompte à la commande d’une création est courant. Votre outil de facturation réutilise les lignes ; vérifiez les mentions obligatoires sur service-public.fr.`,
    },
    {
      q: `Que puis-je automatiser pour une bijouterie : suivi de réparation, rappels de pile, rendez-vous ?`,
      a: `Un message pour dire que la réparation est terminée et prête à retirer est le premier gain. Ensuite, des rappels bien choisis : l’entretien d’une montre mécanique ou le changement de pile à la période habituelle, la date anniversaire d’un achat pour une alliance ou un bijou offert, avec l’accord du client. Pour la création sur mesure, un message à chaque étape (validation du croquis, début de fabrication, pièce prête) rassure. Évitez les relances commerciales insistantes : l’achat d’un bijou est un moment personnel. Chaque envoi suppose un consentement (cnil.fr).`,
    },
    {
      q: `Quelles photos montrer pour vendre des bijoux et des montres sans décevoir ?`,
      a: `Des gros plans nets, sous une lumière stable, avec un repère d’échelle (une main, une règle, une pièce) pour que le client juge la taille réelle. Montrez le fermoir, le dos, la tranche d’une bague, et si possible une courte vidéo de la pièce qui joue avec la lumière. L’atelier, les outils et le geste de l’artisan sont des images fortes sur les réseaux. Restez fidèle aux couleurs : une photo retouchée à l’excès crée des retours. Citez les avis de clients ayant fait réaliser une pièce avec leur accord, et ne publiez leurs photos qu’avec autorisation.`,
    },
    {
      q: `Mon site de bijoutier n’apparaît pas sur Google : comment attirer des clients ?`,
      a: `Les internautes cherchent « alliance sur mesure », « réparation de montre ancienne » ou « bijou personnalisé » plus souvent que « bijouterie ». Faites une page par savoir-faire, avec un texte original sur votre méthode, des photos de vos réalisations et la ville. Ne copiez pas les descriptions des fournisseurs, car un texte identique d’un site à l’autre se classe mal. Mariages, naissances et fêtes sont des moments d’achat : préparez des pages saisonnières. Les liens depuis des photographes, organisateurs de mariage et salons locaux sont précieux. Suivez vos résultats dans Search Console.`,
    },
    {
      q: `Quelles mentions légales et conditions de vente prévoir pour une bijouterie qui vend en ligne ?`,
      a: `Prévoyez les mentions légales, des conditions générales de vente avec rétractation et retours, en précisant que les créations faites sur mesure suivent des règles particulières à vérifier sur service-public.fr. Décrivez chaque pièce avec exactitude : matière, origine, état pour l’occasion ; une description trompeuse est une pratique sanctionnée. Pour les montres de marque, ne laissez pas croire à un lien officiel avec la marque. Indiquez le médiateur de la consommation pour la vente aux particuliers (economie.gouv.fr). Le RGPD s’applique à vos formulaires (cnil.fr).`,
    },
  ],
  'vetements-enfants': [
    {
      q: `Comment ma boutique de vêtements pour enfants ressort-elle dans Google Maps auprès des parents ?`,
      a: `Choisissez « Magasin de vêtements pour enfants » comme catégorie principale et précisez dans la description les âges couverts, de la naissance à l’adolescence si c’est le cas, ainsi que les services : liste de naissance, retouches, cadeaux. Photographiez la boutique avec les portants par âge, la cabine, le coin d’attente adapté aux petits. Indiquez l’accès poussette, qui compte pour les parents. Sollicitez les avis sans contrepartie et répondez à chacun. Les consignes de Google se trouvent sur support.google.com/business.`,
    },
    {
      q: `Quel nom de domaine et quelle adresse e-mail pour une boutique de vêtements d’enfants ?`,
      a: `Choisissez un nom facile à épeler et à retenir pour des parents pressés, avec ou sans le mot « enfants » selon que l’enseigne le contient. Vérifiez qu’il ne ressemble pas trop à une grande marque, pour ne pas créer de confusion. Côté messages, une adresse de contact et une adresse dédiée aux listes de naissance, avec laquelle la famille peut échanger, rendent le suivi plus lisible. Les e-mails de confirmation de commande partent de votre domaine, ce qui améliore leur arrivée en boîte principale. Gardez la propriété du domaine à votre nom.`,
    },
    {
      q: `Comment faire plus vite une facture ou un devis pour un cadeau de naissance groupé ?`,
      a: `Un cadeau de naissance rassemble parfois plusieurs proches qui contribuent : le devis récapitule les articles, tailles et couleurs, avec un lien de paiement ou un acompte. Un modèle prêt à l’emploi permet d’y ajouter le prénom du bébé, la date de naissance prévue et les consignes de remise. Sur la facture, détaillez chaque article avec la TVA de la ligne. Si vous gérez une liste, un état de ce qui est déjà offert évite les doublons. Votre outil de caisse ou de facturation réutilise les fiches clients. Vérifiez les mentions sur service-public.fr.`,
    },
    {
      q: `Quelles relances automatiques ont du sens pour une boutique de vêtements d’enfants ?`,
      a: `Les enfants grandissent vite, donc le cycle est court : un message avant la rentrée ou le changement de saison pour rappeler les besoins de la tranche d’âge, uniquement avec le consentement des parents. Pour le retrait d’une commande : un message dès qu’elle est prête, avec le rappel de la durée de mise de côté. Pour les tailles épuisées, une alerte de retour en stock. Pour les retours, un message qui explique la marche à suivre. Évitez de conserver l’âge exact de l’enfant sans nécessité : la CNIL demande de limiter les données collectées (cnil.fr).`,
    },
    {
      q: `Quelles photos montrer sans publier d’images d’enfants ni enfreindre le droit à l’image ?`,
      a: `Photographiez les vêtements à plat, sur cintre, ou portés par un mannequin adulte pour les grandes tailles ; pour les petits, un portant, un mannequin d’étude ou des photos de détail (boutons, matière, coutures) suffisent. Si des enfants apparaissent, l’accord écrit des parents est nécessaire, y compris pour les réseaux sociaux. Montrez les étiquettes de composition en gros plan : les parents les lisent. Les avis les plus utiles précisent la taille achetée et si elle convient bien ; encouragez-les.`,
    },
    {
      q: `Pourquoi ma boutique pour enfants n’apparaît-elle pas sur Google, et comment attirer des parents ?`,
      a: `Les parents cherchent par occasion et par âge : « tenue de baptême », « body naissance », « vêtements de pluie enfant », « cadeau naissance ». Une page par grande occasion ou par saison, avec vos conseils de tailles et de matières, capte ces recherches. Dites clairement dans les titres les âges concernés. Les liens depuis des assistantes maternelles, des crèches, des groupes de parents ou le site de la mairie lors d’une brocante de puériculture sont de bons relais, à demander poliment. Vérifiez que la fiche Google est à jour, puis suivez les requêtes dans Search Console.`,
    },
    {
      q: `Quelles obligations légales pour un site de vêtements d’enfants : sécurité, étiquetage, données ?`,
      a: `Vous affichez les mentions légales habituelles, les conditions générales de vente, le droit de rétractation et la politique de retour. Les vêtements d’enfants ont des exigences de sécurité propres, par exemple sur les cordons des vêtements pour jeunes enfants, et l’étiquetage de composition est réglementé ; consultez economie.gouv.fr pour les règles applicables à vos articles. Ne présentez pas comme « bio » ou « éco-responsable » ce que vous ne pouvez pas justifier. Le RGPD s’applique aux listes de naissance et aux informations sur les enfants, sensibles : collectez le minimum (cnil.fr).`,
    },
  ],
  'boutique-mode': [
    {
      q: `Comment une boutique de prêt-à-porter se fait-elle voir sur Google Maps ?`,
      a: `Prenez « Boutique de vêtements pour femmes », « pour hommes » ou « Magasin de vêtements » selon votre clientèle, plutôt qu’une catégorie générique. Mettez à jour les photos à chaque arrivage : un portant neuf, une vitrine de saison, c’est ce qui donne envie de pousser la porte. Précisez les marques vendues quand elles sont connues. Les horaires des soldes, nocturnes et ouvertures exceptionnelles se saisissent via les horaires spéciaux de la fiche. Sollicitez des avis après achat, sans remise ni cadeau en échange. Les règles se trouvent sur support.google.com/business.`,
    },
    {
      q: `Quel nom de domaine pour une boutique de mode et quelle adresse e-mail utiliser ?`,
      a: `Votre nom de domaine est votre enseigne en ligne : choisissez-le court, lisible à l’écrit comme à l’oral, et facile à reprendre sur les étiquettes, les sacs et les stories. Si vous prévoyez un jour de vendre en ligne, évitez un nom qui ne vous représente que localement. Côté messages, séparez le contact, le service client et la communication avec la presse ou les créateurs de contenu. Les e-mails de confirmation de commande ou de retrait doivent partir de votre domaine, pas d’une adresse personnelle. Gardez une trace des accès.`,
    },
    {
      q: `Comment faire un devis pour des tenues de cérémonie ou une commande groupée ?`,
      a: `Cérémonie, mariage, tenues d’équipe ou de personnel : le devis liste les pièces avec référence, taille, couleur, retouches éventuelles et l’acompte demandé pour les articles commandés auprès de la marque. Précisez les conditions de reprise : une pièce commandée spécialement n’est pas toujours reprise, à indiquer d’avance. Prévoyez un modèle avec un cadre pour les mesures et la date des essayages. La facture reprend ces lignes avec la TVA. Pour les mentions obligatoires, vérifiez service-public.fr ; détaillez à part les retouches faites par votre couturière.`,
    },
    {
      q: `Que puis-je automatiser dans une boutique de mode : relances, retraits, alertes stock ?`,
      a: `Les alertes de retour en stock par taille, les messages de retrait prêt, les rappels de rendez-vous d’essayage privé et les confirmations de commande sont utiles. Pour les nouveautés, une lettre d’information par saison, adressée à celles qui l’ont demandée, vaut mieux que des envois hebdomadaires. Les relances de paniers abandonnés sont à manier avec modération. Pour les retouches, un message quand elles sont terminées. Gardez la relation personnelle pour vos meilleures clientes, que vous appelez par leur prénom, et respectez toujours la désinscription (cnil.fr).`,
    },
    {
      q: `Quelles photos de vêtements et quels contenus pour les réseaux sociaux d’une boutique de mode ?`,
      a: `Les réseaux comptent plus que partout ailleurs dans la mode. Montrez les pièces portées, sous plusieurs angles, avec la taille du mannequin et la taille portée, plus un détail de la matière. Une courte vidéo du portant ou d’un look composé fonctionne bien en story. Pour les mannequins ou clientes, demandez une autorisation écrite avant de publier une image. Les avis de clientes, avec leur accord, peuvent être repris sur le site, en indiquant leur source. Utilisez vos propres photos plutôt que celles des marques, ou demandez d’abord leurs conditions d’utilisation.`,
    },
    {
      q: `Mon site de boutique de mode reste introuvable sur Google : comment attirer des clientes ?`,
      a: `Les clientes cherchent un besoin ou une occasion : « robe invitée mariage », « manteau en laine femme », « tenue de soirée » plus que « boutique de mode ». Créez des pages éditoriales par occasion, avec des conseils de style de la boutique, plutôt que de seulement lister des produits. Évitez la description copiée sur le site de la marque, identique à celle de dizaines d’autres sites. Associez la ville aux titres. Les liens depuis un salon de coiffure, un photographe ou un organisateur de mariages sont des relais efficaces. Search Console vous montre ce qui fonctionne.`,
    },
    {
      q: `Quelles règles légales pour le site d’une boutique de prêt-à-porter qui vend en ligne ?`,
      a: `En plus des mentions légales, ayez des conditions générales de vente claires, le formulaire de rétractation, les frais de retour (à votre charge ou à celle du client) et le médiateur de la consommation. La composition et l’entretien des textiles doivent figurer sur les fiches : l’étiquetage des fibres textiles est réglementé, voir economie.gouv.fr. Les allégations environnementales (« éco-responsable », « durable ») sont surveillées ; ne les employez que si vous pouvez les justifier. Le RGPD couvre votre fichier clientes et la lettre d’information (cnil.fr).`,
    },
  ],
  'cosmetiques-naturels': [
    {
      q: `Comment une marque de cosmétiques naturels apparaît-elle sur Google Maps et dans les recherches ?`,
      a: `Si vous avez un lieu de vente, choisissez la catégorie de magasin la plus proche (produits de beauté, produits naturels). Si vous vendez seulement en ligne depuis un atelier, la fiche peut être configurée avec une zone de service plutôt qu’une adresse affichée au public. Précisez les gammes, les marchés où l’on vous trouve et vos événements. Des photos de l’atelier ou du rayon, et des avis réels, aident. N’employez pas d’allégation de santé dans vos réponses aux avis. Voir support.google.com/business.`,
    },
    {
      q: `Quel nom de domaine pour une marque de cosmétiques et comment gérer l’e-mail professionnel ?`,
      a: `Le nom de la marque est capital : consultez la base de l’INPI (inpi.fr) pour vérifier qu’il n’est pas déjà pris avant d’acheter le domaine et de faire imprimer les étiquettes. Un .fr rassure les clientes de proximité, un .com convient si vous visez l’étranger. Côté messagerie, une adresse sur votre domaine est quasi indispensable pour les revendeurs et les professionnels : sans elle, vos envois de catalogues et d’échantillons peuvent finir dans les indésirables. Séparez le service client des relations avec les revendeurs, et conservez les accès à votre nom.`,
    },
    {
      q: `Comment faire un devis ou une facture pour un revendeur ou un institut de beauté ?`,
      a: `Pour un revendeur, un institut ou une boutique bio, le devis détaille les produits avec référence, contenance, quantité, remise professionnelle, conditions de paiement et conditions de réassort. Préparez une grille tarifaire pro à part, envoyée sur demande. La facture reprend ces lignes, avec la TVA, le numéro de lot si vous suivez la traçabilité, et vos conditions de paiement. Un outil de facturation simple avec une fiche client pro évite de retaper vos références. Pour les mentions obligatoires et la facturation électronique, consultez impots.gouv.fr et economie.gouv.fr.`,
    },
    {
      q: `Quelles relances automatiques pour les abonnements et les réassorts de cosmétiques ?`,
      a: `Les cosmétiques se consomment : un rappel de réassort au bon moment, basé sur la contenance du produit et l’usage habituel, est le plus pertinent. Pour une routine en plusieurs produits, un message d’accompagnement quelque temps après l’achat, avec les conseils d’usage et de conservation. Pour les abonnements, un rappel avant chaque envoi et un lien simple pour modifier ou suspendre. Les alertes de retour en stock plaisent pour les séries limitées. Évitez toute allégation de soin ou de traitement dans les messages. Le consentement et la désinscription sont obligatoires (cnil.fr).`,
    },
    {
      q: `Quelles photos et quels contenus montrer pour des cosmétiques naturels sans promesse trompeuse ?`,
      a: `Montrez le produit, son emballage, la liste d’ingrédients lisible, et l’atelier si vous fabriquez. Les photos avant et après et les témoignages de transformation sont à manier avec une grande prudence : elles suggèrent un résultat et peuvent être jugées trompeuses si elles ne sont pas strictement réelles et représentatives. Préférez des images d’usage (texture, geste, routine) et des explications sur la fabrication. Les partenariats avec des créateurs de contenu doivent être signalés clairement comme tels. Les avis publiés doivent être authentiques.`,
    },
    {
      q: `Mon site de cosmétiques naturels n’apparaît pas sur Google : comment attirer des clientes ?`,
      a: `Une marque inconnue ne gagne pas sur « crème visage naturelle » : visez des requêtes précises liées à vos produits (savon surgras, baume à lèvres sans parfum, huile de massage) avec des guides d’usage honnêtes. Chaque fiche produit doit avoir un texte propre avec les ingrédients, l’usage et la conservation, pas la description du fournisseur ni celle de la matière première. Les marchés, boutiques bio et instituts qui vous revendent peuvent faire un lien vers vous. Un blog sur la fabrication attire des lectrices. Suivez les résultats dans Search Console.`,
    },
    {
      q: `Quelles mentions et conditions de vente prévoir sur le site d’une marque de cosmétiques ?`,
      a: `Prévoyez les mentions légales, les conditions générales de vente, la politique de retour et le médiateur de la consommation. Pour les produits d’hygiène ou de beauté descellés après livraison, le droit de rétractation peut être limité : la règle exacte est sur service-public.fr, à reprendre dans vos conditions. Soyez attentive aux formulaires : demander à la cliente ses allergies ou son type de peau touche à des données sensibles, donc consentement clair et minimum de données (cnil.fr). Précisez aussi les conditions d’expédition des produits sensibles à la chaleur.`,
    },
  ],
}
