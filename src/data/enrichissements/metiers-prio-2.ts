import type { ContenuLocal } from './types'

export const SECTIONS_PRIO: Record<string, ContenuLocal['sections']> = {
  'paysagiste-jardinier': [
    {
      titre: `Ce que tapent vos clients sur Google`,
      paragraphes: [
        `Les recherches de jardin suivent les saisons. Au printemps, on tape « tonte de pelouse particulier » ou « jardinier entretien régulier Tours » : la personne cherche quelqu’un qui revienne, donc elle compare des formules et des rythmes de passage, pas des photos. Après une tempête, « élagage arbre dangereux » ou « abattage arbre tombé » révèle une urgence : il lui faut un numéro cliquable et une réponse sur la rapidité, sur une page distincte de votre portfolio.`,
        `Les projets d’aménagement s’expriment autrement : « paysagiste création de jardin devis », « terrasse bois ou pierre », « allée en gravier ou en pavés », « installation arrosage automatique ». Ces visiteurs comparent d’abord des matériaux, ensuite des entreprises. Une page par aménagement, qui explique les choix, la durée de vie et l’entretien de chaque solution, vous place en conseiller avant même la prise de contact.`,
        `Restent les recherches de confiance et de prix : « paysagiste avis Saumur », « paysagiste près de moi », « combien coûte un jardinier à l’heure », « paysagiste ou jardinier, quelle différence ». Pour les avis, une fiche Google soignée fait le travail. Pour le prix, le visiteur ne veut pas une grille figée mais comprendre ce qui fait bouger un devis : surface, accès au terrain, évacuation des déchets verts, fréquence de passage. Expliquez cette mécanique plutôt que d’inventer un tarif au mètre carré.`,
      ],
    },
    {
      titre: `Les pages d’un bon site de paysagiste`,
      paragraphes: [
        `L’accueil doit séparer deux publics dès le premier écran : ceux qui veulent créer ou transformer un jardin, ceux qui veulent le faire entretenir. Deux grands boutons, deux univers, chacun renvoyant vers sa rubrique. Derrière, une page par prestation : création et aménagement, terrasses et allées, plantations, taille et élagage, entretien régulier, arrosage. Chaque page décrit le déroulement, ce qui est inclus, ce que le client doit prévoir (accès, point d’eau, stockage des déchets) et mène vers un formulaire adapté.`,
        `Les réalisations méritent des fiches chantier plutôt qu’une galerie en vrac : type de terrain, contrainte de départ, solution retenue, saison de réalisation, photos avant, pendant et après. Chaque fiche sert de preuve et de page qui peut sortir sur une recherche précise. Ajoutez une rubrique de conseils par saison, mise à jour au rythme de votre année, pour apparaître quand les gens se posent la question.`,
        `Les pages de zone viennent ensuite, et seulement pour les communes où vous vous déplacez vraiment : une page pour Tours et sa périphérie, une autre pour le Chinonais si vous y travaillez, avec des chantiers de ce secteur. Elles fonctionnent mieux avec une fiche Google cohérente, ce que détaille le [référencement local](/services/referencement-local). Le formulaire de demande ferme le parcours : adresse, surface approximative, photos, type de travaux, période souhaitée.`,
      ],
    },
    {
      titre: `Ce que vous devez afficher, et ce qu’il faut éviter`,
      paragraphes: [
        `Affichez votre identité d’entreprise complète, votre assurance de responsabilité civile professionnelle et, pour les ouvrages comme les terrasses, murets ou dallages, ce que couvre votre assurance selon la nature des travaux. La garantie décennale ne concerne pas tous les ouvrages : demandez à votre assureur ce qui s’applique à votre activité avant de la mentionner. Le guide sur l’[assurance décennale et la RC pro](/blog/assurance-decennale-rc-pro-artisan) aide à poser les bonnes questions. Si vous détenez une qualification professionnelle reconnue du paysage, indiquez-la avec son intitulé exact.`,
        `Le produit phytosanitaire est un sujet sensible : son usage est encadré, y compris chez les particuliers, et un professionnel qui l’applique relève d’un certificat individuel. Ne vantez aucun traitement sans avoir vérifié les règles en vigueur sur le site du ministère de l’Agriculture. De même, le brûlage des déchets verts est interdit aux particuliers : dites simplement comment vous les évacuez, par broyage sur place ou apport en déchèterie. En période de sécheresse, des arrêtés de la préfecture peuvent restreindre l’arrosage ; évitez de promettre un gazon vert en toute circonstance.`,
        `Si vous proposez l’entretien courant chez des particuliers, vérifiez sur service-public.fr les conditions qui permettent à vos clients de bénéficier d’avantages fiscaux liés aux services à la personne, et n’en promettez aucun avant confirmation. Pour les photos, demandez l’accord des clients dont le jardin apparaît, et ne montrez jamais un jardin qui n’est pas le vôtre. Ne garantissez pas la reprise de chaque plante : un végétal reste vivant, et un engagement précis, écrit au devis, vaut mieux qu’une promesse générale.`,
      ],
    },
    {
      titre: `Quels outils de gestion pour un paysagiste`,
      paragraphes: [
        `Le premier outil est un formulaire de demande guidé, qui récupère l’adresse, la surface, des photos et le type de travaux. Il alimente votre [gestion des devis et factures](/solutions/gestion-devis-factures) : vous chiffrez à partir d’éléments déjà structurés, vous suivez les devis envoyés et vous relancez ceux qui restent sans réponse. Vous évitez les visites inutiles sur des demandes qui ne vous concernent pas.`,
        `Le deuxième est le planning. Entre les chantiers de création, les passages d’entretien et la météo qui bouscule tout, un [planning d’équipe](/solutions/planning-employes) partagé montre qui est où, et permet de décaler une journée de pluie sans réécrire tout l’agenda. Un contrat d’entretien annuel peut y générer ses passages à l’avance, que vous ajustez au fil des saisons.`,
        `Le troisième est une fiche par jardin dans un [CRM sur mesure](/solutions/crm-sur-mesure) : plan de plantation, produits employés, dates de taille, particularités du terrain, rappels saisonniers à envoyer au client. Quand la personne rappelle deux ans plus tard, tout est retrouvé en quelques secondes. Enfin, un [portail client](/solutions/portail-client) peut rassembler les photos avant et après, les devis signés et les consignes d’entretien, ce qui évite de renvoyer les mêmes documents par e-mail.`,
      ],
    },
    {
      titre: `Budget, et erreurs fréquentes`,
      paragraphes: [
        `Un site de paysagiste qui présente vos prestations et vos zones sur une seule page démarre à partir de {{prix:une-page}} €. Dès que vous voulez une rubrique par prestation, des fiches chantier et des conseils de saison, il s’agit d’un site multi-pages, à partir de {{prix:multi-pages}} €. Le prix final dépend du nombre de prestations à développer, du volume de photos à traiter, du formulaire guidé et de l’éventuel outil de suivi des contrats d’entretien. Le calendrier se fixe ensemble avant de commencer, et l’estimateur de la page [tarifs](/tarifs) donne un ordre de grandeur.`,
        `Première erreur fréquente : mêler création et entretien sur la même page. Les deux clientèles n’ont ni le même budget ni la même attente ; séparez-les, chacune avec ses exemples. Deuxième erreur : des photos sans contexte, prises au printemps puis jamais renouvelées. Ajoutez la date, le type de terrain et la contrainte résolue, et mettez à jour le site après chaque chantier marquant.`,
        `Troisième erreur : afficher tout un département comme zone d’intervention. Un visiteur éloigné appelle, vous refusez, et Google lit une page vague. Citez les communes réellement desservies. Quatrième erreur : un site figé, qui parle de taille d’hiver en plein été. Prévoyez un bandeau de saison que vous changez en deux minutes. Pour élargir la réflexion, lisez aussi les pages voisines des métiers de la [terrasse et du terrassement](/creation-site-internet/terrassier) et de la [jardinerie](/creation-site-internet/jardinerie-animalerie).`,
      ],
    },
  ],

  'peintre-decorateur': [
    {
      titre: `Ce que tapent vos clients sur Google`,
      paragraphes: [
        `La recherche la plus fréquente est la plus large : « peintre en bâtiment Tours » ou « peintre près de moi ». Elle vient de quelqu’un qui n’a pas encore défini son chantier, et le site doit alors l’aider à le formuler : appartement, maison, parties communes, façade. D’autres tapent directement le besoin, comme « repeindre un appartement avant vente », « peinture cage d’escalier » ou « ravalement de façade peintre ». Ceux-là ont une échéance, et la page doit parler de planning et de remise en état propre.`,
        `Les requêtes de prix reviennent sans cesse : « prix peinture au m² », « combien coûte repeindre une pièce », « devis peinture gratuit ». Le visiteur cherche un repère, pas un engagement. Répondez en expliquant ce qui fait varier le devis : état des supports, hauteur sous plafond, nombre de couches, protection du mobilier, finition. Si vous établissez vos devis gratuitement, dites-le ; si vous facturez la visite dans certains cas, dites-le aussi.`,
        `Un troisième groupe parle de technique : « enduit à la chaux ou peinture », « traiter une tache d’humidité au plafond avant de repeindre », « pose de toile de verre », « laquer des boiseries ». Ces personnes mûrissent un projet de bricolage ou comparent avec un professionnel ; une page qui répond honnêtement, y compris quand la solution est de ne pas repeindre tout de suite, gagne leur confiance. Enfin « peintre avis » et « peintre disponible rapidement » demandent des avis visibles et une indication claire de votre rythme de prise de commandes.`,
      ],
    },
    {
      titre: `Les pages d’un bon site de peintre en bâtiment`,
      paragraphes: [
        `Commencez par un accueil qui sépare intérieur et extérieur, car ils n’impliquent ni les mêmes matériaux ni les mêmes saisons. Dessous, une page par famille de travaux : peinture de pièces, plafonds et boiseries, revêtements muraux (papier peint, toile de verre), enduits décoratifs, ravalement et peinture de façade. Chaque page explique le déroulement, les finitions possibles et ce que vous demandez au client de libérer ou de protéger avant votre arrivée.`,
        `Une page pour les professionnels de l’immobilier et les syndics rend service à une clientèle récurrente : remise en état entre deux locataires, parties communes, calendrier compatible avec la vie de l’immeuble. Une autre peut être dédiée aux conseils de couleurs et d’ambiances, avec quelques réalisations bien éclairées et le nom des teintes employées. Les réalisations s’organisent par type de pièce plutôt que par ordre chronologique.`,
        `Les pages de zone, limitées aux communes où vous travaillez, ancrent votre présence locale et se relient au [référencement local](/services/referencement-local). Le formulaire de devis arrive en dernier : type de travaux, surface approximative, état des murs, photos, date souhaitée. Il alimente votre devis sans appel préalable, et l’option de proposer un rendez-vous de visite évite les allers-retours.`,
      ],
    },
    {
      titre: `Ce que vous devez afficher, et ce qu’il faut éviter`,
      paragraphes: [
        `Affichez vos informations d’entreprise et votre assurance de responsabilité civile professionnelle. Pour la garantie décennale, tout dépend de la nature des travaux : une peinture intérieure n’entre pas toujours dans ce cadre, un ravalement ou une étanchéité de façade peut y entrer. Interrogez votre assureur avant d’écrire quoi que ce soit, et reportez-vous au guide sur l’[assurance décennale et la RC pro](/blog/assurance-decennale-rc-pro-artisan). Une qualification professionnelle du bâtiment, si vous en avez une, s’affiche avec son intitulé exact.`,
        `Dans les logements anciens, d’anciennes peintures peuvent contenir du plomb, ce qui impose des précautions de ponçage et de gestion des déchets. Pour affirmer quoi que ce soit sur ce sujet, appuyez-vous sur les organismes officiels de prévention, comme l’OPPBTP, et ne promettez pas un chantier sans poussière. Pour les produits, l’étiquette obligatoire sur les émissions dans l’air intérieur, classée de A+ à C, se mentionne telle qu’elle est ; évitez les formules vagues comme « peinture 100 % naturelle » sans référence.`,
        `Pour un ravalement ou un changement de couleur de façade, une démarche en mairie peut être nécessaire selon la commune : invitez le client à se renseigner auprès de sa mairie ou sur service-public.fr plutôt que d’affirmer une règle générale. Les photos avant et après doivent venir de vos chantiers, avec l’accord des clients. Ne publiez pas de prix au mètre carré présentés comme des engagements : un prix indicatif sans mise en contexte devient vite un point de désaccord au moment du devis.`,
      ],
    },
    {
      titre: `Quels outils de gestion pour un peintre en bâtiment`,
      paragraphes: [
        `Un peintre jongle entre devis, séchage, disponibilité des équipes et attentes du client. Le premier outil utile est la [gestion des devis et factures](/solutions/gestion-devis-factures) : lignes réutilisables par type de prestation, devis envoyé sans ressaisie, acompte demandé et facture finale générée à partir du devis accepté. Le guide du [devis en ligne pour artisan](/blog/devis-en-ligne-artisan) détaille ce fonctionnement.`,
        `Le deuxième est la [prise de rendez-vous en ligne](/solutions/prise-rendez-vous-en-ligne) pour les visites de chantier : le client choisit un créneau pendant que vous gardez la main sur vos disponibilités. Le troisième est le planning des chantiers, qui tient compte des temps de séchage entre deux couches et du retour des équipes sur un même site ; le [logiciel de planning de chantiers](/blog/logiciel-planning-chantiers-interventions) explique comment le choisir.`,
        `Enfin, un [portail client](/solutions/portail-client) fait gagner du temps sur une étape délicate : la validation des teintes. Le client y retrouve la référence retenue, le devis signé et les photos d’avancement, sans relancer par téléphone. Cela limite les contestations de couleur, source classique de tension dans le métier.`,
      ],
    },
    {
      titre: `Budget, et erreurs fréquentes`,
      paragraphes: [
        `Un site de peintre à une seule page, avec vos prestations, vos zones, quelques réalisations et un formulaire, démarre à partir de {{prix:une-page}} €. Si vous voulez une page par famille de travaux, une rubrique pour les professionnels et des réalisations classées, on passe à un site multi-pages, à partir de {{prix:multi-pages}} €. Le prix varie avec le nombre de pages, la quantité de photos à préparer et la présence d’un formulaire de devis détaillé ou d’un outil de suivi. L’estimateur de la page [tarifs](/tarifs) vous donne un repère, et le calendrier se fixe ensemble avant de commencer.`,
        `Première erreur : des photos de murs blancs sans contexte. Montrez les raccords, les angles, les plafonds et les boiseries, avec la pièce entière en plan large. Deuxième erreur : parler uniquement de peinture alors que les clients cherchent aussi du papier peint, de l’enduit ou du ravalement ; créez une page par besoin réel.`,
        `Troisième erreur : promettre un délai ou un prix sans conditions ; indiquez plutôt ce dont dépendent le calendrier et le prix. Quatrième erreur : oublier de dire ce qui est inclus, comme la protection des sols ou le nettoyage final, alors que c’est souvent ce qui départage deux devis. Pour les chantiers de façade, regardez aussi la page voisine consacrée au [façadier](/creation-site-internet/facadier), et pour les sols, celle du [carreleur](/creation-site-internet/carreleur-sol).`,
      ],
    },
  ],

  'carreleur-sol': [
    {
      titre: `Ce que tapent vos clients sur Google`,
      paragraphes: [
        `Ceux qui cherchent un carreleur partent presque toujours d’un projet : « rénovation salle de bain carrelage », « remplacer baignoire par douche », « carreler une terrasse », « sol cuisine carrelage grand format ». La requête « carreleur Tours » vient plutôt de quelqu’un qui a déjà choisi ses matériaux et cherche la main. Selon la formulation, le site doit donc accueillir deux profils : celui qui découvre son chantier et celui qui veut un devis rapidement.`,
        `Les questions de faisabilité sont nombreuses : « carrelage sur carrelage possible », « poser du carrelage sur un plancher chauffant », « béton ciré dans une salle de bain », « douche à l’italienne installation ». La personne y cherche surtout une réponse honnête, avec les conditions qui permettent ou non la solution. Une page qui nuance, en expliquant l’état du support ou l’épaisseur à prévoir, gagne en crédibilité sur un concurrent qui répond « oui, toujours ».`,
        `Côté prix, on tape « prix pose carrelage au m² » ou « combien coûte refaire une salle de bain ». Le visiteur veut un repère ; expliquez les facteurs du devis : dépose de l’ancien revêtement, préparation du support, format des carreaux, calepinage, étanchéité, évacuation des gravats. « Carreleur avis » appelle des avis visibles, idéalement accompagnés de photos de la salle terminée, et « carreleur disponible rapidement » une indication franche sur votre rythme de prise de chantiers.`,
      ],
    },
    {
      titre: `Les pages d’un bon site de carreleur`,
      paragraphes: [
        `Organisez le site par projet plutôt que par produit. Une page salle de bains et douche, une page cuisine et pièces de vie, une page terrasse et extérieur, une page entrée et couloirs, puis une page pour les finitions de sol continues comme le béton ciré ou la résine. Chaque page présente ce que comprend votre prestation, les contraintes courantes du support et les réalisations de ce type de pièce. Le visiteur se retrouve dans son projet dès le deuxième clic.`,
        `Une page consacrée aux matériaux aide à guider le choix : grès cérame, faïence, pierre naturelle, grands formats, mosaïque, avec pour chacun un mot sur l’usage, l’entretien et ce que la pose exige. Placez-y vos fournisseurs habituels et la possibilité de choisir en showroom si vous travaillez avec l’un d’eux. Une autre page peut détailler la fourniture : ce que vous commandez, ce que le client apporte, qui gère la livraison du carrelage sur le chantier.`,
        `Les réalisations viennent avec leur contexte : pièce, surface, matériau, particularité de pose. Les pages de zone se limitent aux secteurs où vous intervenez, à relier à votre fiche d’établissement, comme l’explique le guide pour [apparaître dans le pack local de Google Maps](/blog/apparaitre-google-maps-pack-local). Le formulaire demande les dimensions, le type de support actuel, des photos, le matériau envisagé et la période, ce qui évite des déplacements à vide.`,
      ],
    },
    {
      titre: `Ce que vous devez afficher, et ce qu’il faut éviter`,
      paragraphes: [
        `Affichez vos informations d’entreprise et vos assurances. L’étanchéité sous carrelage, notamment dans les pièces d’eau, est un point sensible du métier : demandez à votre assureur comment sont couverts ces travaux et ne parlez de garantie décennale que si elle s’applique réellement à votre activité. Le guide sur l’[assurance décennale et la RC pro](/blog/assurance-decennale-rc-pro-artisan) est un bon point de départ. Une qualification professionnelle du bâtiment, comme celle délivrée par Qualibat, se mentionne avec son intitulé exact et seulement si vous la détenez.`,
        `Vous pouvez vous référer aux règles de l’art, qui passent par les documents techniques unifiés pour la pose collée ou scellée, sans les citer dans le détail si vous n’êtes pas certain de la version en vigueur. Pour les sols exposés à l’eau, un indice d’adhérence antidérapant existe : précisez-le seulement pour les produits dont la fiche technique le mentionne. Le raccordement électrique d’une salle de bains relève d’un électricien, et les règles de volumes sont à confier à ce professionnel ; ne vous engagez pas sur ce point.`,
        `Évitez les promesses absolues comme « pose sans aucune poussière » ou « joints qui ne noircissent jamais ». Ne présentez pas un carrelage posé sur carrelage comme toujours possible : la hauteur, l’adhérence de l’ancien revêtement et les seuils sont à contrôler sur place. Enfin, n’affichez pas des photos de catalogue de fabricant comme s’il s’agissait de vos chantiers.`,
      ],
    },
    {
      titre: `Quels outils de gestion pour un carreleur`,
      paragraphes: [
        `Un chantier de carrelage dépend d’un fournisseur, d’une livraison, d’un support qui doit sécher et d’un client à qui il faut rendre la pièce. Le premier outil est la [gestion des devis et factures](/solutions/gestion-devis-factures) : devis par pièce avec lignes de dépose, préparation, fourniture et pose, acompte à la commande du matériau, facture finale reprise du devis accepté. Vous gardez la trace de ce que le client a validé.`,
        `Le deuxième est la [gestion des stocks](/solutions/gestion-stocks), utile pour les restes de lots, les chutes de belle taille et les produits d’appoint comme les colles, les joints et les croisillons, afin de ne pas manquer d’un matériau à la dernière minute. Le troisième est un planning de chantiers qui enchaîne les temps de séchage et de livraison ; le guide sur le [logiciel de planning de chantiers](/blog/logiciel-planning-chantiers-interventions) vous aide à comparer les approches.`,
        `Pour suivre vos prospects, un [CRM sur mesure](/solutions/crm-sur-mesure) conserve l’historique des devis envoyés, la date de relance et l’origine de la demande. Vous retrouvez rapidement le client qui voulait une terrasse « au printemps » et vous le relancez au bon moment, sans fichier éparpillé.`,
      ],
    },
    {
      titre: `Budget, et erreurs fréquentes`,
      paragraphes: [
        `Une page unique présentant vos prestations, vos zones, quelques réalisations et un formulaire démarre à partir de {{prix:une-page}} €. Pour un site organisé par projet, avec des pages matériaux et des réalisations détaillées, comptez un site multi-pages, à partir de {{prix:multi-pages}} €. Ce qui fait varier le prix : le nombre de pages de projet, le volume de photos à préparer, un éventuel calculateur de métrage ou un outil de devis. L’estimateur de la page [tarifs](/tarifs) donne un repère, et le calendrier se fixe ensemble avant de commencer.`,
        `Première erreur : une galerie de sols vus de haut, sans pièce ni éclairage. Montrez la salle de bains entière puis les détails de coupes autour des équipements. Deuxième erreur : un texte qui ne parle que de carrelage alors que les clients cherchent aussi une douche, une terrasse ou du béton ciré ; créez des pages par projet. Troisième erreur : ne pas préciser ce qui est inclus, comme la dépose, la préparation ou l’évacuation des gravats, ce qui crée des malentendus au devis.`,
        `Quatrième erreur : un formulaire de contact qui ne demande ni dimensions ni photos, et vous oblige à rappeler pour tout. Ajoutez les champs utiles dès le départ. Pour compléter votre réflexion, regardez aussi les pages des métiers voisins, comme le [peintre en bâtiment](/creation-site-internet/peintre-decorateur) et le [maçon rénovateur](/creation-site-internet/macon-renovateur).`,
      ],
    },
  ],

  'serrurier-depannage': [
    {
      titre: `Ce que tapent vos clients sur Google`,
      paragraphes: [
        `Devant une porte fermée, on tape vite et mal : « serrurier urgence Tours », « porte claquée que faire », « clé cassée dans la serrure », « serrurier ouvert maintenant ». L’intention est immédiate, souvent depuis un téléphone, parfois avec une batterie qui baisse. Le site doit répondre en trois secondes : êtes-vous joignable, intervenez-vous chez moi, annoncez-vous le coût avant de venir. Le numéro cliquable en haut de chaque page vaut plus que tout le reste.`,
        `Après un cambriolage ou une tentative, les formulations changent : « changement de serrure après cambriolage », « sécuriser une porte forcée », « serrurier agréé assurance ». La personne cherche un professionnel qui comprend les démarches avec l’assureur et qui peut remettre la maison en état de fermeture le jour même ou sous peu. Une page dédiée, avec la façon dont vous établissez les devis et factures détaillées, répond à cette inquiétude précise.`,
        `Les recherches de projet sont plus calmes : « porte blindée pose », « serrure A2P », « changer le cylindre d’une porte », « contrôle d’accès immeuble », « serrure connectée ». Elles viennent de gens qui comparent et lisent. Enfin « prix ouverture de porte » et « serrurier pas cher avis » sont des recherches de méfiance : la personne redoute un mauvais prix. Répondez en expliquant comment se compose un devis (déplacement, main-d’œuvre, pièces, horaire de nuit) sans afficher de chiffre que vous ne pourriez pas tenir.`,
      ],
    },
    {
      titre: `Les pages d’un bon site de serrurier`,
      paragraphes: [
        `Deux entrées valent mieux qu’une. La première, l’urgence : une page courte, avec le numéro, les secteurs desservis, les situations prises en charge (porte claquée, clé cassée, serrure forcée, porte bloquée) et la façon dont se déroule l’appel. Pas de texte long, pas de menu encombré. La seconde, le projet : remplacement de serrures, porte blindée, cylindre de sécurité, contrôle d’accès, avec un formulaire détaillé et un délai de réponse annoncé de façon honnête.`,
        `Une page par type de porte ou de situation aide à capter les recherches précises : porte d’entrée d’appartement, porte de maison, porte de garage, local commercial, boîtes aux lettres et serrures de portail. Chacune explique ce que vous faites, dans quel ordre, et ce que le client doit préparer. Une page de conseils de sécurité, sobre et utile, rassure sans dramatiser.`,
        `Les pages de zone sont stratégiques et doivent être sincères : uniquement les communes où vous pouvez réellement vous rendre, avec votre vrai point de départ. Elles se relient à une fiche Google exacte, sans fausse adresse ; vérifiez les règles dans l’aide de Google Business Profile. Terminez par une page « qui je suis » avec votre visage, votre véhicule et votre entreprise, car dans ce métier la confiance passe par l’identité.`,
      ],
    },
    {
      titre: `Ce que vous devez afficher, et ce qu’il faut éviter`,
      paragraphes: [
        `Affichez sans détour votre raison sociale, votre adresse réelle, votre numéro SIRET et vos assurances. Ce métier est connu pour des abus de la part de certains prestataires : la clarté sur qui vous êtes est votre meilleur argument. Dites aussi comment vous annoncez le prix avant toute intervention et ce qui peut le faire varier, comme l’heure ou le type de serrure. Pour l’information sur les prix et le devis préalable lors d’un dépannage à domicile, des règles précises existent : consultez la DGCCRF et appliquez-les telles quelles.`,
        `Ne mentionnez une certification que pour les produits qui la portent. La certification A2P, attribuée à des serrures et des blocs-portes selon des niveaux d’une, deux ou trois étoiles, se vérifie auprès de l’organisme certificateur et du fabricant : n’affichez que ce que vous pouvez prouver. Il en va de même pour tout label, agrément ou partenariat : si vous ne pouvez pas produire le justificatif, ne l’écrivez pas.`,
        `Évitez les numéros qui prétendent être locaux alors qu’ils redirigent ailleurs, les adresses inexistantes dans l’annuaire et les avis suspects. Évitez aussi un ton alarmiste sur les cambriolages : informer vaut mieux qu’effrayer. Enfin, n’invitez jamais à intervenir sur un logement sans que la personne puisse justifier qu’elle en est l’occupant légitime : indiquez que vous demandez une preuve avant d’ouvrir. Cette règle protège les occupants comme vous.`,
      ],
    },
    {
      titre: `Quels outils de gestion pour un serrurier`,
      paragraphes: [
        `Le serrurier travaille avec des appels irréguliers, souvent hors horaires de bureau. Le premier outil est le devis et la facture immédiats : la [gestion des devis et factures](/solutions/gestion-devis-factures) permet d’établir sur place un devis lisible, de le faire valider par le client puis de produire la facture, avec le détail du déplacement, de la main-d’œuvre et des pièces. La [signature électronique du devis](/blog/signature-electronique-devis-en-ligne) évite les contestations ultérieures.`,
        `Le deuxième outil est la [prise de rendez-vous en ligne](/solutions/prise-rendez-vous-en-ligne) pour tout ce qui n’est pas urgent : changement de serrures, pose d’une porte blindée, contrôle d’accès. Les créneaux se placent entre deux dépannages, et vous distinguez nettement ce qui se planifie de ce qui se traite à l’instant.`,
        `Si vous travaillez à plusieurs ou avec un système de permanence, un [planning d’équipe](/solutions/planning-employes) montre qui est d’astreinte et où se trouve chaque intervenant. Enfin, un [CRM sur mesure](/solutions/crm-sur-mesure) conserve l’historique par adresse : serrures posées, références, dates, ce qui accélère la relation avec les syndics, les agences et les assureurs qui vous rappellent régulièrement.`,
      ],
    },
    {
      titre: `Budget, et erreurs fréquentes`,
      paragraphes: [
        `Pour un serrurier, un site à une seule page convient souvent : urgence, projets, zone, identité et formulaire sur le même écran. Il démarre à partir de {{prix:une-page}} €. Si vous voulez des pages par situation, un contenu de conseils et une zone étendue, on passe à un site multi-pages, à partir de {{prix:multi-pages}} €. Le prix varie avec le nombre de pages de zone, de situations traitées et l’éventuel outil de devis. Vous pouvez simuler votre cas sur la page [tarifs](/tarifs) ; le calendrier se fixe ensemble avant de commencer.`,
        `Première erreur : un numéro de téléphone en image, impossible à toucher pour appeler. Utilisez un lien cliquable visible sur tous les écrans, avec une version texte. Deuxième erreur : cacher la manière dont se fixe le prix. Un visiteur méfiant part ; expliquez la composition du devis. Troisième erreur : des pages de zone en série, qui annoncent une présence dans trente communes où vous ne vous rendez jamais. Limitez-vous à celles que vous desservez.`,
        `Quatrième erreur : des photos de banque d’images et aucun visage. Montrez-vous, avec votre véhicule et votre atelier ou votre matériel. Pour compléter, regardez aussi les pages des métiers proches, comme le [vitrier](/creation-site-internet/vitrier) et le [menuisier-ébéniste](/creation-site-internet/menuisier-ebeniste), qui appellent le même niveau de confiance au premier contact.`,
      ],
    },
  ],

  'restaurant': [
    {
      titre: `Ce que tapent vos clients sur Google`,
      paragraphes: [
        `Les requêtes sont nombreuses et très ciblées dans le temps. « Restaurant ouvert dimanche midi Tours », « restaurant ce soir pas loin », « où manger à Chinon » : la personne a faim ou prépare une sortie imminente. Elle regarde les horaires du jour, le téléphone, un avis récent. Votre fiche Google compte ici autant que le site, et les deux doivent afficher les mêmes jours d’ouverture.`,
        `Un deuxième groupe cherche une occasion : « restaurant anniversaire », « repas de famille 20 personnes », « restaurant terrasse », « brunch Saumur », « restaurant romantique ». L’intention porte sur l’ambiance et la capacité, pas sur le plat. Répondez avec des pages dédiées, des photos de la salle et de la terrasse, le nombre de couverts, la possibilité de privatiser et la façon de demander un devis pour un groupe.`,
        `Un troisième groupe veut des garanties : « restaurant sans gluten », « restaurant végétarien Tours », « menu enfant », « restaurant accessible fauteuil roulant ». Ces recherches sont décisives pour ceux qui les tapent, et elles sont souvent mal servies. Une page qui dit précisément ce que vous proposez, sans en promettre plus que votre cuisine ne peut faire, vous donne un avantage durable. Enfin « menu du jour », « carte restaurant » et « prix menu » traduisent une envie de se projeter : la carte à jour, lisible sur mobile, répond à ces trois recherches à la fois.`,
      ],
    },
    {
      titre: `Les pages d’un bon site de restaurant`,
      paragraphes: [
        `L’accueil doit répondre en un écran : ouvert ou fermé aujourd’hui, bouton d’appel, bouton de réservation, photo vraie de la salle ou d’un plat. Viennent ensuite la carte et le menu du jour, sur une page à part qu’on peut mettre à jour sans toucher au reste. Une page réservation, simple, avec le nombre de couverts, la date et l’heure, et une indication claire de ce qui se passe quand la salle est complète.`,
        `Les pages qui travaillent votre visibilité sont celles que les restaurants oublient : une page groupes et privatisation, une page événements (soirées à thème, menus de fêtes, dégustations), une page « notre cuisine » où vous racontez vos producteurs et le rythme de votre carte, et une page infos pratiques avec l’accès, le stationnement, l’accessibilité et les moyens de paiement acceptés. Chacune répond à une recherche différente, que décrit le guide du [SEO local pour restaurant](/blog/seo-local-restaurant).`,
        `L’ordre compte. Le visiteur pressé lit l’accueil, ouvre la carte et réserve. Le visiteur qui prépare une occasion lit d’abord l’ambiance, les groupes, puis la carte. Placez donc la carte et la réservation dans le menu principal, et les pages d’occasion juste derrière. Pour l’inspiration, le [guide du site de restaurant](/blog/guide-site-internet-restaurant) détaille les rubriques essentielles.`,
      ],
    },
    {
      titre: `Ce que vous devez afficher, et ce qu’il faut éviter`,
      paragraphes: [
        `Les prix de la carte doivent être affichés en toutes lettres, toutes taxes comprises, à l’extérieur de l’établissement et à l’intérieur ; reprenez la même information sur le site pour éviter toute différence entre ce que le client lit en ligne et ce qu’il paie. Pour la mention « fait maison », la réglementation précise ce qui peut être revendiqué : vérifiez les conditions exactes sur le site economie.gouv.fr avant de l’écrire. L’origine de certaines viandes doit aussi être indiquée dans la restauration ; consultez la DGCCRF pour la liste et les modalités.`,
        `Si vous servez de l’alcool, votre licence ou votre permis d’exploitation s’affichent dans l’établissement, et la publicité pour les boissons alcoolisées est encadrée par la loi Evin : ne glissez pas de visuels promotionnels sur l’alcool sans avoir vérifié ce qu’elle autorise sur service-public.fr. Si vous recevez des avis en ligne, respectez les règles d’information sur leur vérification, détaillées dans le guide des [obligations sur les avis clients](/blog/avis-clients-en-ligne-obligations-verifies). Rappelez le dispositif de médiation de la consommation dans vos conditions, comme toute entreprise qui vend à des particuliers.`,
        `À éviter : des photos de plats qui ne sont pas les vôtres, une page « avis clients » avec des témoignages que vous auriez choisis sans source, un menu qui annonce des produits que la cuisine n’a plus. Évitez aussi d’afficher un label ou une distinction sans justificatif. Enfin, n’incorporez pas une carte Google Maps ou un widget de réservation sans vérifier ce qu’il dépose comme traceurs, afin que le bandeau de consentement reste cohérent.`,
      ],
    },
    {
      titre: `Quels outils de gestion pour un restaurant`,
      paragraphes: [
        `Le premier outil est la réservation : une [réservation en ligne pour restaurant](/solutions/reservation-restaurant) que vous possédez, avec des créneaux par service, des limites de couverts et un fichier de clients qui reste chez vous. Pour réduire les défections, le guide sur les [no-shows en restaurant](/blog/no-show-reservation-restaurant) présente les rappels et les confirmations qui fonctionnent.`,
        `Le deuxième est le [menu par QR code](/solutions/menu-qr-code), qui permet de mettre à jour la carte en un geste, de signaler les plats épuisés et d’afficher les allergènes à la bonne ligne. Le troisième est le [programme de fidélité](/solutions/programme-fidelite) : une carte numérique qui récompense le retour, sans application à télécharger.`,
        `Côté arrière-boutique, une [gestion des stocks](/solutions/gestion-stocks) adaptée à la cuisine limite les pertes et signale ce qu’il faut commander ; le guide de la [gestion de stock en restaurant](/blog/gestion-stock-restaurant-digital) en donne les principes. Un [tableau de bord](/solutions/tableau-de-bord) rassemble réservations, couverts et ventes de la semaine, pour décider du personnel sans fouiller dans plusieurs outils.`,
      ],
    },
    {
      titre: `Budget, et erreurs fréquentes`,
      paragraphes: [
        `Un restaurant dont l’essentiel tient sur une page, avec horaires, carte, photos, accès et lien de réservation, démarre à partir de {{prix:une-page}} €. Pour un site complet avec pages groupes, événements, présentation de la cuisine et carte éditable, on passe au multi-pages, à partir de {{prix:multi-pages}} €. Un outil de réservation ou de carte propre, développé pour vous, relève de l’offre d’outil, à partir de {{prix:outil}} €. Le prix dépend du nombre de pages, de la quantité de photos et de la complexité des options. Retrouvez un repère sur la page [tarifs](/tarifs) ; le calendrier se fixe ensemble avant de commencer.`,
        `Première erreur : une carte du jour qui n’est jamais mise à jour. Le visiteur y voit un plat que la cuisine ne fait plus et perd confiance. Rendez la mise à jour faisable en quelques secondes depuis un téléphone. Deuxième erreur : confier la réservation à un tiers sans garder ses clients. Gardez un fichier à vous et rappelez les clients avec leur accord.`,
        `Troisième erreur : une vidéo plein écran qui ralentit la page sur mobile alors que le visiteur veut juste l’horaire. Préférez des photos légères et une accroche en texte. Quatrième erreur : aucune indication sur la façon de venir ni sur le stationnement. Écrivez-le simplement. Pour élargir la réflexion, consultez la page voisine du métier de [brasserie ou bar](/creation-site-internet/brasserie-bar) et celle de la [pizzeria](/creation-site-internet/pizzeria).`,
      ],
    },
  ],

  'pizzeria': [
    {
      titre: `Ce que tapent vos clients sur Google`,
      paragraphes: [
        `La recherche type est très directe : « pizza à emporter Tours », « pizzeria ouverte dimanche soir », « pizza livraison Chinon ». La personne veut manger dans l’heure et choisit en quelques secondes entre trois onglets. Si votre site est lent, que la carte est en image ou que le bouton de commande se cache, elle bascule vers le concurrent suivant. L’horaire du jour, le bouton d’appel et l’accès à la commande doivent se voir sans défiler.`,
        `D’autres requêtes révèlent un goût précis : « pizza au feu de bois près de moi », « pizza napolitaine », « pizza sans gluten », « pizza végétarienne », « pizza à la crème ». Elles demandent de dire ce que vous faites vraiment : type de four, pâte maison ou non, temps de repos de la pâte si vous le pratiquez, ingrédients de saison. N’utilisez une appellation que si vous pouvez la justifier, car certaines désignations de pizza sont précisément définies.`,
        `Les recherches de prix et de groupe suivent : « menu pizza midi », « prix pizza 4 fromages », « commander 10 pizzas pour une fête », « pizza pour club sportif ». Les premières veulent la carte lisible avec formules ; les secondes, un contact pour une grosse commande. Enfin « avis pizzeria » et « meilleure pizza de Saumur » se jouent sur la fiche Google et les photos de vraies pizzas, pas sur la phrase d’accueil.`,
      ],
    },
    {
      titre: `Les pages d’un bon site de pizzeria`,
      paragraphes: [
        `Au centre, la carte commandable : les pizzas classées par famille (tomate, crème, végétariennes, spécialités de la maison), les desserts, les boissons et les formules. Chaque pizza porte sa liste d’ingrédients, ses allergènes et une photo réelle. Au premier écran de l’accueil, deux actions : commander et appeler. Entre les deux, les horaires du jour et le mode de service : sur place, à emporter, livraison.`,
        `Une page « livraison et retrait » explique la zone desservie, le montant minimum, les frais éventuels et l’horaire de retrait. Une page « formules et menus » regroupe le midi, les soirées, les offres pour deux ou pour la famille. Une page « groupes et associations » reçoit les demandes de grosses commandes, avec les champs date, nombre de pizzas et contraintes alimentaires.`,
        `Une page « notre pâte » raconte votre méthode, vos fournisseurs et la façon dont vous cuisez : c’est le contenu qui vous distingue d’une carte copiée. Les pages de zone sont utiles si vous livrez dans plusieurs communes : une par commune réellement desservie, avec les horaires de passage. Le parcours de commande est décrit dans le guide du [click and collect](/blog/click-and-collect-mise-en-place).`,
      ],
    },
    {
      titre: `Ce que vous devez afficher, et ce qu’il faut éviter`,
      paragraphes: [
        `Comme tout établissement qui prépare des repas, vous devez former au moins une personne à l’hygiène alimentaire adaptée à la restauration commerciale, et vous suivez la méthode HACCP. Sur le site, cela se traduit par une page sobre sur votre hygiène, sans grands mots. Les prix de la carte s’affichent toutes taxes comprises et doivent correspondre à ce qui est facturé à la commande, frais de livraison compris. Pour l’alcool, si vous en proposez, vérifiez la licence nécessaire et les règles de vente aux mineurs sur service-public.fr.`,
        `Ne revendiquez « fait maison », « artisanal » ou une appellation traditionnelle que si vous répondez aux conditions réglementaires : consultez economie.gouv.fr pour la définition du fait maison. Pour la vente à distance de repas préparés, les règles d’information du consommateur s’appliquent ; la DGCCRF les présente. Indiquez les modalités de paiement et le traitement d’une commande erronée ou en retard, dans des conditions simples.`,
        `À éviter : une pizza « sans gluten » annoncée alors que la même surface de travail et le même four servent aux pizzas classiques. Dites ce qui est vrai : « préparation en cuisine non exclusivement sans gluten, traces possibles ». Évitez aussi les photos de banque d’images, les promesses de rapidité sans condition, et les avis choisis un par un. Enfin, ne collectez pas de données de commande au-delà du nécessaire : nom, téléphone et adresse pour la livraison suffisent.`,
      ],
    },
    {
      titre: `Quels outils de gestion pour une pizzeria`,
      paragraphes: [
        `Le premier outil est la commande en ligne avec retrait : le [click and collect](/solutions/click-and-collect) reçoit les commandes structurées, par créneau, avec le paiement. Il s’intègre à votre rythme de cuisine : le guide sur les [commandes à emporter en restaurant](/blog/commandes-emporter-gestion-restaurant) présente la façon de gérer l’affichage en cuisine et les files de retrait.`,
        `Le deuxième est la [caisse enregistreuse](/solutions/caisse-enregistreuse), reliée aux commandes web pour qu’une vente en ligne et une vente au comptoir finissent dans le même journal. Pour la conformité, lisez le guide sur le [logiciel de caisse certifié](/blog/logiciel-de-caisse-enregistreuse-certifie-petit-commerce). Le troisième est le [programme de fidélité](/solutions/programme-fidelite) : une carte à tampons numériques qui remplace la carte papier et ramène les habitués.`,
        `Côté arrière-boutique, une [gestion des stocks](/solutions/gestion-stocks) suit la farine, la mozzarella, la tomate et les garnitures périssables, pour que vous commandiez au bon moment et que vous perdiez moins. Enfin, un module de livraison interne, présenté dans le guide de l’[application de livraison pour restaurant](/blog/application-livraison-restaurant), organise les tournées de vos livreurs si vous en avez.`,
      ],
    },
    {
      titre: `Budget, et erreurs fréquentes`,
      paragraphes: [
        `Si vous voulez d’abord une vitrine claire, avec carte, horaires, photos, zone de livraison et lien de commande, un site d’une page démarre à partir de {{prix:une-page}} €. Pour un site complet avec pages formules, groupes et présentation de la pâte, on passe au multi-pages, à partir de {{prix:multi-pages}} €. Une commande en ligne développée pour votre pizzeria, avec créneaux et paiement, relève de l’outil sur mesure, à partir de {{prix:outil}} €. Le prix varie avec le nombre d’options de la carte, la logique de créneaux et la livraison. Un abonnement de suivi démarre à partir de {{abo:min}} € par mois. Le calendrier se fixe ensemble avant de commencer ; la page [tarifs](/tarifs) donne un repère.`,
        `Première erreur : un panier qui oblige à dix clics. Un client affamé abandonne ; réduisez le parcours à l’essentiel. Deuxième erreur : ne pas annoncer l’heure à laquelle la commande sera prête, ce qui multiplie les appels. Affichez une estimation honnête et ajustez-la en période d’affluence.`,
        `Troisième erreur : une carte copiée sur un fichier de plateforme, avec des prix qui diffèrent du comptoir. Alignez-les. Quatrième erreur : oublier le téléphone, que beaucoup de clients préfèrent encore : gardez un numéro cliquable sur chaque écran. Pour élargir la réflexion, consultez aussi les pages voisines des métiers du [kebab et fast-food](/creation-site-internet/kebab-fast-food) et du [food truck](/creation-site-internet/food-truck).`,
      ],
    },
  ],
}
