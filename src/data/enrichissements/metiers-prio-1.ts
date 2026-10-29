import type { ContenuLocal } from './types'

export const SECTIONS_PRIO: Record<string, ContenuLocal['sections']> = {
  'plombier': [
    {
      titre: `Ce que tapent vos clients sur Google`,
      paragraphes: [
        `Les recherches d’un plombier se rangent en familles, et chacune attend une réponse différente. L’urgence d’abord : « plombier urgence Tours », « fuite d’eau plombier dimanche », « dépannage plomberie Joué-lès-Tours ». Celui qui tape cela a de l’eau au sol ou un chauffe-eau froid. Il veut un numéro cliquable, une zone claire et la preuve que quelqu’un décroche. Le site doit répondre en trois secondes, sans formulaire à remplir.`,
        `Vient ensuite le prix : « prix remplacement chauffe-eau », « combien coûte un déplacement de plombier », « tarif débouchage canalisation ». La personne n’est pas pressée, elle cherche à éviter une mauvaise surprise. Inutile de publier une grille complète, mais expliquez ce qui fait varier un devis (accès à la canalisation, état de l’existant, matériel choisi, distance) et dites si le déplacement est facturé. Celui qui lit cela avant d’appeler pose de meilleures questions et conteste moins la facture.`,
        `Le local et la confiance : « plombier près de moi », « plombier Saumur avis », « plombier chauffagiste Chinon ». Ici, Google regarde la fiche avant le site. Les avis, les photos et des coordonnées identiques partout pèsent plus que n’importe quel texte. Le site doit reprendre les mêmes informations et pointer vers vos avis.`,
        `Enfin les projets : « remplacer une baignoire par une douche », « devis salle de bains complète », « plombier ou chauffagiste, qui appeler ». Ces visiteurs lisent. Une page par projet, avec les étapes et ce que vous demandez au client de préparer, les mène au devis. Et une phrase franche sur ce que vous ne faites pas (chauffage, gros œuvre, carrelage) leur évite un appel inutile et vous épargne des devis hors sujet.`,
      ],
    },
    {
      titre: `Les pages d’un bon site de plombier`,
      paragraphes: [
        `L’accueil sert d’aiguillage : deux grands boutons, « Je dépanne » et « J’ai un projet », avant tout discours sur l’entreprise. Le premier mène à une page d’urgence qui tient sur un écran de téléphone : numéro, horaires réels d’intervention, communes couvertes, et trois conseils utiles en attendant (fermer l’arrivée d’eau, couper le chauffe-eau, prendre une photo pour l’assurance). Le second mène au catalogue des travaux planifiés.`,
        `Les prestations méritent chacune leur page : fuite et recherche de fuite, chauffe-eau, débouchage, salle de bains, remplacement de sanitaires, adoucisseur si vous en posez. Chaque page répond à la question que se pose le visiteur à ce moment précis, montre un chantier réel et se termine sur la demande de devis. Les zones d’intervention viennent après : une page pour chaque secteur que vous desservez réellement, avec un exemple d’intervention de la commune plutôt qu’une liste de noms alignés.`,
        `Gardez pour la fin du menu les pages de réassurance : réalisations, qui vous êtes, avis et garanties. Elles servent à confirmer une décision déjà à moitié prise, pas à la provoquer. Le formulaire de devis, enfin, doit demander peu : nature du problème, adresse, une ou deux photos, un créneau de rappel. Chaque champ supplémentaire fait perdre des demandes, surtout sur mobile.`,
      ],
    },
    {
      titre: `Ce que vous devez afficher, et ce qu’il faut éviter`,
      paragraphes: [
        `Affichez vos garanties de façon visible : assurance décennale pour les travaux concernés, responsabilité civile professionnelle, identité complète de l’entreprise (forme juridique, SIRET, adresse). Si vous intervenez sur une installation au gaz, votre qualification gaz doit pouvoir être montrée ; si vous posez des pompes à chaleur ou de la climatisation, l’attestation de capacité pour les fluides frigorigènes aussi. N’affichez que ce que vous détenez réellement et à jour : un logo sans justificatif vous expose plus qu’il ne rassure.`,
        `Côté devis, les règles de présentation et de signature sont rappelées sur service-public.fr ; relisez-les avant de publier un modèle en ligne. Évitez surtout les promesses qui ne sont pas tenables : un « intervention en un quart d’heure » que vous ne tenez pas le soir, un tarif d’appel qui ne couvre pas la réalité du devis, un « 24h/24 » sans astreinte. Ces annonces relèvent des pratiques commerciales trompeuses, que surveille la DGCCRF.`,
        `Après un dégât des eaux, ne dites jamais au client que son assurance prendra tout en charge : cela dépend de son contrat. Vous pouvez en revanche lui rappeler de photographier les dégâts et de prévenir son assureur, ce qui est un vrai service. Si vous publiez des photos de chantier, obtenez l’accord de la personne et masquez son adresse, son nom et tout ce qui permettrait de reconnaître le logement.`,
      ],
    },
    {
      titre: `Quels outils de gestion pour un plombier`,
      paragraphes: [
        `Le premier outil utile est celui qui fait le devis depuis le téléphone, sur place, avec vos prestations types déjà saisies : changement de chauffe-eau, remplacement de mitigeur, débouchage. Le module [gestion des devis et factures](/solutions/gestion-devis-factures) transforme ensuite le devis accepté en facture, avec l’acompte si vous en demandez un, sans ressaisie le soir. Sur un métier où l’on rédige beaucoup de petits devis, c’est là que se gagnent les heures.`,
        `Pour les interventions qui ne sont pas urgentes (entretien, remplacement planifié, visite de contrôle), la [prise de rendez-vous en ligne](/solutions/prise-rendez-vous-en-ligne) laisse le client choisir un créneau parmi ceux que vous ouvrez, et vous évite des allers-retours par SMS. Vous bloquez les plages réservées aux urgences, et les rappels partent tout seuls la veille.`,
        `Deux autres outils reviennent souvent chez les plombiers : un planning de tournées quand vous avez un salarié ou un apprenti, et une fiche par client qui garde l’historique de ce que vous avez posé chez lui (modèle de chauffe-eau, date, garantie du fabricant). Quand la même personne rappelle trois ans plus tard, vous savez ce qu’il y a derrière la cloison avant d’arriver.`,
      ],
    },
    {
      titre: `Budget, et erreurs fréquentes`,
      paragraphes: [
        `Pour un plombier, un site d’une page qui contient l’essentiel (urgence, prestations, zone, devis) démarre à partir de {{prix:une-page}} €. Dès que vous voulez une page par prestation et par secteur, comptez un site multi-pages à partir de {{prix:multi-pages}} €. Un outil sur mesure, par exemple un formulaire d’urgence relié à votre téléphone et à vos devis, démarre à partir de {{prix:outil}} €. Le [simulateur de tarifs](/tarifs) donne le chiffre exact selon vos choix.`,
        `Ce qui fait varier le prix chez un plombier : le nombre de communes pour lesquelles vous voulez une page utile, la galerie de chantiers à constituer, la présence ou non d’un formulaire avec photos, et le lien avec un outil de devis. L’accompagnement local sur Google se traite à part, voir le [référencement local](/services/referencement-local).`,
        `Première erreur : un numéro de téléphone inséré dans une image, que personne ne peut toucher pour appeler. Corrigez en texte cliquable, fixé en bas de l’écran sur mobile. Deuxième erreur : une seule page « Nos services » qui énumère tout ; faites une page par prestation, elle sera trouvée pour sa requête précise.`,
        `Troisième erreur : des photos de stock où l’on voit un plombier souriant devant une baignoire de catalogue. Remplacez-les par quatre vrais chantiers, même simples. Quatrième erreur : un numéro différent sur le site, la fiche Google et les annuaires ; harmonisez-les, puis consultez le [guide du site de plombier](/blog/guide-site-internet-plombier). Et si vous posez aussi du chauffage, regardez comment travaille un [chauffagiste en ligne](/creation-site-internet/chauffagiste-climatisation).`,
      ],
    },
  ],

  'electricien': [
    {
      titre: `Ce que tapent vos clients sur Google`,
      paragraphes: [
        `Quand le courant saute, la recherche est brève : « électricien urgence panne de courant Tours », « disjoncteur qui saute tout le temps », « électricien dépannage ce soir ». L’intention est claire, la personne veut un professionnel qui vient aujourd’hui. Le site doit donc afficher le téléphone en haut de chaque page et dire sans détour si vous prenez les urgences, et jusqu’à quelle heure.`,
        `Autre famille, celle de la mise en sécurité : « mise aux normes électriques maison ancienne », « refaire un tableau électrique devis », « prise qui chauffe danger ». Ces visiteurs ont peur, ou préparent une vente ou une location. Ils cherchent quelqu’un qui explique avant de vendre. Une page qui décrit ce que vous contrôlez en arrivant (tableau, terre, protection différentielle, état des circuits) et comment le devis est construit les rassure davantage qu’une promesse de conformité.`,
        `Les projets neufs ont leurs propres mots : « installation borne de recharge à domicile », « électricien pour rénovation complète », « volets roulants électriques pose », « prix installation chauffage électrique ». Ceux-là comparent trois ou quatre artisans et lisent beaucoup. Donnez-leur de quoi décider : matériel que vous posez, ce que vous demandez au client de vérifier (puissance du compteur, emplacement du garage), et la suite des démarches.`,
        `Enfin la proximité et la preuve : « électricien près de moi », « électricien Amboise avis », « électricien qualifié Qualifelec ». Ici, la fiche Google et les avis comptent autant que le site. Prévoyez un renvoi clair vers vos avis, et la mention de la zone que vous couvrez réellement, sans promettre d’intervenir partout dans le département.`,
      ],
    },
    {
      titre: `Les pages d’un bon site d’électricien`,
      paragraphes: [
        `Trois entrées sur l’accueil, qui correspondent à trois visiteurs différents : dépannage, mise aux normes et rénovation, bornes et équipements. Chacune ouvre sur un ensemble de pages courtes. Le dépannage tient en une page, le reste demande de la place pour expliquer, parce que le visiteur a besoin de comprendre avant de signer.`,
        `Pour la mise aux normes, prévoyez une page tableau électrique, une page rénovation d’installation ancienne, une page diagnostic ou contrôle avant achat, chacune avec un exemple de chantier réel et ce que le devis comprend. Pour les équipements, une page borne de recharge, une page VMC et ventilation, une page chauffage électrique ou radiateurs, une page domotique simple si vous en posez vraiment. Une page par spécialité que vous maîtrisez, et rien sur ce que vous ne faites pas.`,
        `Ajoutez une page destinée aux professionnels (constructeurs, agences, syndics, artisans qui sous-traitent) avec vos références de collaboration, vos qualifications et la façon de vous confier un chantier : ces clients-là reviennent et pèsent plus que des particuliers ponctuels. Terminez par les zones d’intervention et un formulaire de devis qui demande l’âge du logement, la surface, la nature du problème et une photo du tableau. Vous saurez déjà quoi emporter.`,
      ],
    },
    {
      titre: `Ce que vous devez afficher, et ce qu’il faut éviter`,
      paragraphes: [
        `Un électricien engage la sécurité des gens : le site doit permettre de vérifier qui vous êtes. Identité complète de l’entreprise, assurance décennale pour les travaux qui en relèvent, responsabilité civile professionnelle, et vos qualifications avec leur numéro quand vous en avez (un organisme de qualification comme Qualifelec, la qualification pour les bornes de recharge, RGE si vous intervenez en rénovation énergétique). Chaque mention doit correspondre à un justificatif valide que vous pouvez produire.`,
        `Parlez des normes sans vous engager au-delà de ce que vous contrôlez. La norme d’installation de référence et l’attestation du Consuel pour certaines installations neuves ou rénovées sont des sujets que vous pouvez expliquer en termes simples, en renvoyant vers le site du Consuel pour le détail. Évitez en revanche d’écrire « conforme à toutes les normes » sur une installation que vous n’avez pas entièrement refaite.`,
        `Évitez aussi les conseils de bricolage électrique, même bien intentionnés : expliquer à un visiteur comment remplacer lui-même un disjoncteur engage votre image, et pas dans le bon sens. Préférez la règle simple « ne touchez pas, coupez au disjoncteur général, appelez ». Pour les aides à la rénovation énergétique, renvoyez vers le site officiel France Rénov’ plutôt que d’annoncer des montants qui changent.`,
      ],
    },
    {
      titre: `Quels outils de gestion pour un électricien`,
      paragraphes: [
        `Le devis est l’outil de base. Un électricien chiffre des ouvrages qui se répètent : remplacement de tableau, création de circuit, pose de prise ou de borne. Le module [gestion des devis et factures](/solutions/gestion-devis-factures) garde ces ouvrages en bibliothèque, calcule le total sur place et fait suivre le devis jusqu’à la facture, avec les acomptes sur les gros chantiers.`,
        `Pour les clients professionnels, un [CRM sur mesure](/solutions/crm-sur-mesure) évite que les syndics, agences et constructeurs se perdent dans votre boîte mail : chaque contact a sa fiche, ses chantiers en cours, et la prochaine relance prévue. C’est aussi là que vous notez qui paie vite et qui oublie.`,
        `Autour de cela, trois outils que les électriciens apprécient : un planning qui évite de placer deux dépannages au même moment, un dossier par installation où l’on garde schémas, photos du tableau avant et après et attestations remises, et des rappels de contrôle périodique pour les clients qui en ont besoin, par exemple les petits locaux professionnels. Rien de tout cela n’est obligatoire, mais c’est ce qui vous fait gagner du temps chaque semaine.`,
      ],
    },
    {
      titre: `Budget, et erreurs fréquentes`,
      paragraphes: [
        `Un site d’électricien qui réunit l’essentiel sur une page (dépannage, prestations, zone, devis) démarre à partir de {{prix:une-page}} €. Avec une page par spécialité et par secteur, un site multi-pages démarre à partir de {{prix:multi-pages}} €. Un outil dédié, comme un formulaire de demande de devis qui range les photos par chantier, démarre à partir de {{prix:outil}} €. Le [simulateur de tarifs](/tarifs) affine le montant selon vos besoins.`,
        `Le prix varie surtout avec le nombre de spécialités à présenter séparément, la place laissée aux réalisations, la présence d’un espace professionnels et le lien avec un outil de devis. Un artisan qui ne traite que du dépannage a besoin de moins qu’un électricien qui fait du neuf, de la rénovation et des bornes.`,
        `Première erreur : annoncer « mise aux normes » sans expliquer ce que cela contient. Corrigez avec une page qui détaille les points contrôlés et ce qui fait monter ou baisser le devis. Deuxième erreur : un formulaire qui ne demande ni l’âge du logement ni une photo du tableau, ce qui vous oblige à une visite pour rien ; ajoutez ces deux champs.`,
        `Troisième erreur : le logo de qualification collé en pied de page sans nom d’organisme ni lien de vérification ; ajoutez le numéro et, quand c’est possible, le lien vers l’annuaire officiel. Quatrième erreur : traiter tout le monde pareil ; séparez particuliers et professionnels. Pour aller plus loin, lisez le [guide du site d’électricien](/blog/guide-site-internet-electricien), l’article sur la [prise de rendez-vous en ligne](/blog/prise-rdv-en-ligne-plombier-electricien), et regardez le cas voisin du [plombier](/creation-site-internet/plombier).`,
      ],
    },
  ],

  'chauffagiste-climatisation': [
    {
      titre: `Ce que tapent vos clients sur Google`,
      paragraphes: [
        `En plein hiver, la recherche est brutale : « chaudière en panne chauffagiste Tours », « plus de chauffage ce week-end », « dépannage chaudière gaz urgent ». Le visiteur a froid, souvent avec des enfants à la maison. Il appelle le premier numéro qui répond. Votre site doit donc afficher en tête si vous dépannez, sur quelles marques, et les jours où quelqu’un décroche.`,
        `Au printemps et à l’approche de l’été, les recherches changent de nature : « climatisation réversible installation devis », « pompe à chaleur air-eau prix », « climatiseur ou pompe à chaleur ». Le visiteur a le temps de lire et veut comprendre avant de commander. Il cherche ce qu’il peut attendre de chaque solution, ce qu’exige son logement et ce qui pèse sur le devis. Répondez avec des pages d’explication honnêtes, qui disent aussi quand une solution ne convient pas.`,
        `Les recherches d’entretien forment une famille à part : « contrat entretien chaudière », « entretien annuel pompe à chaleur », « attestation d’entretien chaudière ». C’est la plus régulière et la plus rentable, parce que chaque client satisfait revient chaque année. Une page claire sur ce que comprend la visite, ce que vous remettez au client à la fin et comment la réserver fait gagner des contrats.`,
        `Enfin les recherches de confiance et d’aides : « chauffagiste RGE près de moi », « chauffagiste Loches avis », « MaPrimeRénov’ pompe à chaleur chauffagiste ». Le visiteur veut un artisan qualifié et ne se perdre ni dans les démarches ni dans les promesses. Une page qui explique, sans montants, comment fonctionnent les aides et où vérifier les conditions à jour répond à cette inquiétude.`,
      ],
    },
    {
      titre: `Les pages d’un bon site de chauffagiste`,
      paragraphes: [
        `Le site d’un chauffagiste a trois étages. Le premier est la page de dépannage, rapide, avec le téléphone, les marques et appareils pris en charge et les communes couvertes. Le deuxième regroupe l’entretien : une page contrat, une page par type d’appareil (chaudière gaz, fioul, pompe à chaleur, poêle), et un formulaire de demande qui recueille l’adresse, l’appareil et la date de dernière visite.`,
        `Le troisième étage concerne les installations. Une page par énergie ou technologie que vous posez vraiment : chaudière à condensation, pompe à chaleur air-eau, climatisation réversible, poêle à granulés, plancher chauffant. Chaque page présente la solution, les cas où elle convient, le déroulement du chantier, la visite préalable indispensable et un exemple de réalisation. Placez après elles la page des aides et des financements, qui renvoie vers les sites officiels, et la page des marques que vous installez et entretenez.`,
        `Terminez par vos qualifications, les zones d’intervention et un formulaire de devis en trois temps : le logement, le chauffage actuel, le projet. Les photos de la chaufferie ou de l’unité extérieure y sont précieuses. Mettez le contenu de la saison en avant : en automne, l’entretien et le dépannage à l’accueil ; au printemps, la climatisation et les pompes à chaleur.`,
      ],
    },
    {
      titre: `Ce que vous devez afficher, et ce qu’il faut éviter`,
      paragraphes: [
        `Dans ce métier les qualifications sont nombreuses, et le public les confond. Affichez celles que vous détenez avec leur intitulé exact : qualification gaz, attestation de capacité pour les fluides frigorigènes, RGE et les mentions de domaine qui l’accompagnent (par exemple pompe à chaleur, bois, solaire thermique), ainsi que la décennale et la responsabilité civile. Une qualification RGE n’est valable que dans les domaines pour lesquels elle est délivrée : ne la présentez pas comme un label général.`,
        `Sur les aides, restez prudent. Les montants, plafonds et conditions évoluent régulièrement, et votre client perd confiance s’il découvre un écart avec ce que vous aviez écrit. Dites que des aides existent pour certains travaux, qu’elles dépendent du logement et des ressources du foyer, et renvoyez vers France Rénov’ pour la situation à jour. N’écrivez jamais « travaux gratuits » ou « installation offerte » : ces formules sont dans le viseur de la DGCCRF.`,
        `Le démarchage est un autre sujet sensible : la rénovation énergétique a été la cible de nombreux abus, et la réglementation sur le démarchage a été durcie. Renseignez-vous sur economie.gouv.fr avant de lancer une opération de prospection, et ne présentez jamais votre site ou votre entreprise comme liée à un organisme public. Pour l’entretien des chaudières, indiquez simplement ce que vous remettez à la fin de la visite, sans réécrire la réglementation à votre façon.`,
      ],
    },
    {
      titre: `Quels outils de gestion pour un chauffagiste`,
      paragraphes: [
        `L’outil le plus rentable pour un chauffagiste est celui qui retient le parc d’appareils. Un [portail client](/solutions/portail-client) rassemble pour chaque foyer l’appareil installé, la date de pose, les visites passées, les factures et l’attestation d’entretien. Le client retrouve ses documents seul, et vous retrouvez la référence exacte de la chaudière avant de partir avec la mauvaise pièce.`,
        `Les contrats d’entretien reposent sur des rappels. Avec la [prise de rendez-vous en ligne](/solutions/prise-rendez-vous-en-ligne), le client réserve sa visite annuelle au moment où il le décide, parmi les créneaux que vous avez ouverts hors des périodes de forte demande. Les rappels partent seuls quelques semaines avant l’échéance, ce qui évite de tout concentrer sur les premiers froids.`,
        `Pour les installations, le module de [devis et factures](/solutions/gestion-devis-factures) gère les devis détaillés par poste, les acomptes et les situations de travaux. Un [tableau de bord](/solutions/tableau-de-bord) montre ensuite les entretiens à planifier, les devis en attente de réponse et les chantiers de la semaine. Enfin, si vous avez des techniciens, le [planning des équipes](/solutions/planning-employes) répartit dépannages et poses selon les tournées.`,
      ],
    },
    {
      titre: `Budget, et erreurs fréquentes`,
      paragraphes: [
        `Un site de chauffagiste à partir de {{prix:une-page}} € suffit pour être joignable : dépannage, services, zone, demande de devis. Pour une page par énergie, une page entretien, une page aides et des pages par secteur, un site multi-pages démarre à partir de {{prix:multi-pages}} €. Un outil sur mesure, par exemple la gestion des contrats d’entretien avec rappels, démarre à partir de {{prix:outil}} €. Le [simulateur](/tarifs) donne le calcul exact.`,
        `Le prix dépend du nombre de technologies à présenter, de la présence d’un formulaire de contrat d’entretien et de son lien avec un outil de suivi, de la quantité de photos de chantiers à produire, et du nombre de secteurs desservis. Un artisan qui se limite au dépannage et à l’entretien a un site plus léger qu’une entreprise qui pose aussi des pompes à chaleur et de la climatisation.`,
        `Première erreur : afficher des montants d’aides ou d’économies d’énergie. Corrigez en décrivant le principe et en renvoyant vers le site officiel. Deuxième erreur : une seule page « Chauffage et climatisation » où tout est mélangé ; séparez, car celui qui tape « pompe à chaleur » n’attend pas la même réponse que celui qui tape « chaudière en panne ».`,
        `Troisième erreur : oublier l’entretien, pourtant le contrat le plus durable. Donnez-lui une page et un formulaire à lui. Quatrième erreur : des pages de marques copiées des fabricants, que Google reconnaît comme déjà vues ; racontez plutôt vos installations. Pour la visibilité autour de chez vous, voyez le [référencement local](/services/referencement-local), le cas du [plombier](/creation-site-internet/plombier) qui travaille souvent à côté de vous, et l’article sur le [SEO local pour les artisans du bâtiment](/blog/seo-local-artisan-batiment-2026).`,
      ],
    },
  ],

  'macon-renovateur': [
    {
      titre: `Ce que tapent vos clients sur Google`,
      paragraphes: [
        `Le client d’un maçon prépare un projet qui engage son logement : ses mots sont plus longs et plus précis que ceux d’un dépannage. « Maçon extension maison devis », « ouverture mur porteur prix », « rénovation longère Touraine », « maçon terrasse béton près de moi », « reprise en sous-œuvre fissures ». Chaque formulation désigne un chantier précis, avec ses risques et ses interlocuteurs. Une page qui porte le même nom et explique le déroulement est celle qui sera lue.`,
        `Certaines recherches expriment l’inquiétude : « fissure façade maison grave ou pas », « humidité mur maçonnerie remonte », « fondations qui bougent ». Le visiteur ne cherche pas encore un devis, il veut savoir s’il faut s’alarmer. Répondez avec prudence : quelques signes à observer, la précision qu’un diagnostic se fait sur place, et la manière de vous contacter avec des photos. Ne promettez jamais de poser un diagnostic à distance.`,
        `D’autres sont comparatives : « maçon artisan ou entreprise de rénovation », « maçon décennale attestation », « maçon avis Loches ». Ici le client vérifie le sérieux. Il veut voir une attestation, une adresse, des chantiers identifiables et des avis. Les réponses sont à portée de main, à condition de les mettre dans le site et de renvoyer à votre fiche Google.`,
        `Enfin les recherches de coordination : « architecte ou maçon pour une extension », « qui fait les plans d’une extension », « maçon plus plombier plus électricien ». Le visiteur ne sait pas à qui s’adresser. Une page qui explique ce que vous prenez en charge et ce qui relève d’un architecte ou d’un bureau d’études vous place en conseiller, et vous évite des demandes mal dirigées.`,
      ],
    },
    {
      titre: `Les pages d’un bon site de maçon`,
      paragraphes: [
        `La structure suit la nature des travaux, du plus fréquent au plus rare. Une page rénovation de maison ancienne, une page extension et surélévation, une page ouverture dans un mur porteur, une page terrasse, dalle et dallage, une page murs et clôtures. Si vous faites aussi de l’isolation par l’extérieur ou de l’enduit de façade, chacune a sa page. Toutes suivent le même plan : le besoin, ce qui est fait, ce qui reste à la charge du client, un exemple de chantier.`,
        `La page réalisations est le cœur du site. Classez-la par type de travaux, pas par date, et pour chaque chantier mettez l’état initial, une étape en cours et le résultat, avec la commune et la nature des travaux. Deux photos prises sous le même angle valent mieux qu’une galerie de vingt clichés disparates. Une page « comment se déroule un chantier » rassure ceux qui n’ont jamais fait construire : visite, devis, démarches, préparation, gros œuvre, finitions, réception.`,
        `Ajoutez les zones d’intervention, une page qualifications et assurances, et un formulaire de devis qui accepte plans et photos. Mettez en avant, avant le formulaire, une courte liste de ce que vous aimeriez recevoir : adresse du chantier, plans s’il y en a, photos de l’existant, projet d’ouvertures. Le visiteur qui prépare sa demande vous envoie un dossier utilisable, ce qui rend votre première réponse précise.`,
      ],
    },
    {
      titre: `Ce que vous devez afficher, et ce qu’il faut éviter`,
      paragraphes: [
        `Dans la maçonnerie, l’assurance décennale est la pièce qui pèse le plus. Publiez l’attestation en cours de validité, avec le nom de l’assureur et la période couverte, et mettez-la à jour à chaque renouvellement. Indiquez votre responsabilité civile professionnelle, vos qualifications (Qualibat par exemple) avec leur numéro, et la mention RGE seulement si vous réalisez des travaux d’isolation pour lesquels elle vous a été délivrée.`,
        `Les travaux de maçonnerie touchent souvent à l’urbanisme. Extension, création d’ouverture en façade, clôture, changement d’aspect extérieur : selon le projet, une déclaration préalable ou un permis peut être nécessaire, et le recours à un architecte peut s’imposer selon la surface. Ne donnez pas de règle chiffrée sur votre site : expliquez le principe et renvoyez vers la mairie, le service urbanisme et service-public.fr. Selon l’âge du bâtiment, des diagnostics (amiante, plomb) peuvent aussi être nécessaires avant certains travaux.`,
        `Évitez trois pièges. Les photos de chantiers de confrères ou d’une banque d’images présentées comme les vôtres, qui détruisent la confiance si elles sont reconnues. Les prix au mètre carré affichés sans conditions, qui ne tiennent jamais face à un vrai chantier. Les promesses du type « zéro fissure » ou « aucune mauvaise surprise » : un chantier de rénovation en réserve toujours, et mieux vaut le dire. Pour les contrats signés chez le client, un délai de rétractation existe en principe : vérifiez-le sur economie.gouv.fr avant de rédiger vos conditions.`,
      ],
    },
    {
      titre: `Quels outils de gestion pour un maçon`,
      paragraphes: [
        `Le premier outil est un devis structuré par lots : démolition, gros œuvre, ouvertures, enduits, évacuation des gravats. Le module [gestion des devis et factures](/solutions/gestion-devis-factures) permet d’établir un devis en lots, de suivre les acomptes et de facturer par situation. Votre client voit à quoi correspond chaque ligne, ce qui limite les discussions en fin de chantier.`,
        `Le deuxième est un suivi de chantier avec photos datées. L’article sur l’[application de gestion de chantiers](/blog/application-gestion-chantiers) décrit ce que peut faire un tel outil. Depuis le téléphone, vous prenez une photo, la rattachez à une étape, et votre client la retrouve dans un [portail client](/solutions/portail-client). Cela évite les appels du type « où en est-on » et sert de preuve en cas de désaccord.`,
        `Un planning qui tient compte de la météo et des sous-traitants est le troisième outil. Quand l’électricien passe après le coulage, quand le plaquiste attend le séchage, il vaut mieux voir le tout sur un écran. Enfin, un petit tableau de bord indique les devis en attente, les situations à facturer et les chantiers qui prennent du retard.`,
      ],
    },
    {
      titre: `Budget, et erreurs fréquentes`,
      paragraphes: [
        `Un site d’une page pour un maçon, avec vos types de travaux, quelques réalisations et un formulaire de devis, démarre à partir de {{prix:une-page}} €. Pour des pages par type de chantier, une galerie classée et une page par secteur, un site multi-pages démarre à partir de {{prix:multi-pages}} €. Un outil de suivi de chantiers ou de devis par lots démarre à partir de {{prix:outil}} €. Le [simulateur de tarifs](/tarifs) précise le chiffre.`,
        `Le prix varie selon le nombre de types de chantiers à documenter, la quantité de photos à mettre en forme, la présence d’un espace client de suivi et l’ampleur de la zone. Un maçon qui ne montre que dix chantiers bien choisis n’a pas les mêmes besoins qu’une entreprise de rénovation qui souhaite documenter toutes ses spécialités. Pour compléter, voir le service de [création de site internet](/services/creation-de-site-internet).`,
        `Première erreur : des photos de chantier uniquement en fin de travaux, sans l’état initial. Montrez l’avant et une étape intermédiaire. Deuxième erreur : un portfolio sans légende, ni commune ni nature des travaux ; ajoutez deux lignes à chaque projet. Troisième erreur : aucun mot sur les démarches administratives, qui sont pourtant la première inquiétude de l’acheteur ; une page d’explication prudente les couvre.`,
        `Quatrième erreur : un formulaire trop court qui oblige à rappeler pour tout demander. Ajoutez l’adresse, la nature du projet, la possibilité de joindre des plans. Pour la couverture, la charpente et les toitures qui accompagnent souvent un chantier, voyez comment présenter un [couvreur-charpentier](/creation-site-internet/couvreur-charpentier) en ligne.`,
      ],
    },
  ],

  'couvreur-charpentier': [
    {
      titre: `Ce que tapent vos clients sur Google`,
      paragraphes: [
        `La requête la plus pressante est celle de la fuite : « fuite toiture urgence couvreur Chinon », « réparation toiture après tempête », « tuiles cassées qui tombent ». Elle arrive un matin de vent, parfois à la nuit. Le visiteur a besoin d’un professionnel qui vienne sécuriser rapidement et qui lui dise quoi faire en attendant. Montrez le numéro, la zone, et dites sans détour si vous bâchez en urgence ou si vous ne faites que les réparations planifiées.`,
        `Plus calmes, les recherches d’entretien : « démoussage toiture prix », « nettoyage toiture traitement hydrofuge », « changer les gouttières ». Le propriétaire veut savoir si l’opération est utile ou si on cherche à lui vendre un chantier. Une page honnête sur ce que fait le démoussage, ses limites et le moment où une réparation devient préférable à un traitement est la meilleure façon de gagner sa confiance.`,
        `Les projets de fond forment la troisième famille : « rénovation toiture ardoise devis », « refaire une toiture en tuiles prix », « charpente traditionnelle maison », « isolation combles couvreur », « pose fenêtre de toit ». Ces visiteurs comparent plusieurs artisans et lisent des pages entières. Détaillez par matériau, par type d’ouvrage et par ce que le chantier suppose pour la maison : échafaudage, bâchage, évacuation, délai de séchage.`,
        `Enfin la méfiance : « couvreur arnaque démarchage », « couvreur sérieux près de moi », « avis couvreur Amboise ». Dans ce métier, le démarchage abusif est connu et le particulier est sur ses gardes. Votre meilleur atout est une identité complète affichée, des chantiers réels avec la commune et des avis consultables.`,
      ],
    },
    {
      titre: `Les pages d’un bon site de couvreur-charpentier`,
      paragraphes: [
        `Le site s’organise autour de la toiture, de haut en bas. Une page fuite et réparation, qui sert aussi de page d’urgence. Une page par matériau que vous travaillez réellement (ardoise, tuile, zinc, bac acier), avec photos de détails comme les rives, les faîtages et les solins. Une page zinguerie et gouttières, une page démoussage et entretien, une page isolation des combles et sous-toiture si vous la posez.`,
        `Côté charpente, séparez les travaux : charpente neuve, traitement et réparation de charpente ancienne, lucarne et surélévation, extension à ossature bois. Chaque page explique ce que vous faites en atelier et ce qui se passe sur le chantier, avec des photos d’assemblage. Une page fenêtres de toit complète l’ensemble.`,
        `Terminez par une page « comment se passe un chantier de toiture » (visite, devis, protections, dépose, pose, nettoyage, réception), les réalisations par matériau, les zones d’intervention et le formulaire. Celui-ci doit accepter des photos prises du sol ou d’une fenêtre, et demander le type de couverture et l’âge approximatif du toit. Pour la fuite, ajoutez une case « eau qui entre en ce moment », qui fait remonter la demande en tête de liste.`,
      ],
    },
    {
      titre: `Ce que vous devez afficher, et ce qu’il faut éviter`,
      paragraphes: [
        `La décennale est l’assurance centrale d’un couvreur, parce que l’étanchéité d’une toiture engage sa responsabilité sur la durée. Publiez l’attestation en cours, avec le nom de l’assureur. Ajoutez la responsabilité civile, vos qualifications (Qualibat en couverture ou en charpente, par exemple) avec leur numéro et, si vous isolez, la mention RGE correspondant à vos domaines. Affichez l’identité de l’entreprise et le SIRET, sans quoi vous ressemblez aux sociétés éphémères qui font fuir les clients.`,
        `Plusieurs sujets demandent de la prudence. Dans un secteur protégé (abords d’un monument historique, site patrimonial), l’architecte des Bâtiments de France peut encadrer les matériaux et les teintes : c’est fréquent dans les villes classées de Touraine, et le client doit se renseigner en mairie avant de choisir. Changer l’aspect d’une toiture ou poser une fenêtre de toit peut nécessiter une démarche d’urbanisme. Certaines couvertures anciennes contiennent de l’amiante : si vous ne les traitez pas, dites-le et orientez vers des professionnels formés.`,
        `Évitez de dramatiser. Les « urgences » inventées pour vendre une rénovation complète sont l’une des pratiques que la DGCCRF et les associations de consommateurs signalent le plus, et un site qui joue sur la peur se démarque mal d’elles. Après une tempête, rappelez au client de prévenir son assureur et de conserver photos et devis, sans jamais garantir la prise en charge. Choisissez enfin vos photos : un compagnon sur un toit sans protection contre les chutes envoie un très mauvais signal sur votre sérieux en matière de sécurité.`,
      ],
    },
    {
      titre: `Quels outils de gestion pour un couvreur-charpentier`,
      paragraphes: [
        `La météo décide de votre semaine, donc le planning est l’outil qui compte. Le module de [planning des employés](/solutions/planning-employes) laisse déplacer les chantiers quand le vent se lève, remplacer une équipe absente et prévoir l’échafaudage. Quand un chantier saute, vous voyez tout de suite lequel prend sa place.`,
        `Le devis vient ensuite. Une toiture se chiffre au mètre carré de couverture, au linéaire de gouttière et à l’unité pour les accessoires. Le module [gestion des devis et factures](/solutions/gestion-devis-factures) conserve ces postes en bibliothèque, ajoute le bâchage et l’évacuation, puis suit l’acompte et la facture finale. L’article sur [l’assurance décennale et la RC pro de l’artisan](/blog/assurance-decennale-rc-pro-artisan) rappelle ce que vos documents doivent contenir.`,
        `Autour de cela, un registre des demandes d’urgence classées par secteur et par degré (eau qui entre, tuile qui menace de tomber, simple inspection) évite de passer la soirée à relire des messages. Et un dossier photos par chantier, avant, pendant et après, fait office de preuve en cas de litige et de matière pour votre galerie.`,
      ],
    },
    {
      titre: `Budget, et erreurs fréquentes`,
      paragraphes: [
        `Un site d’une page pour un couvreur, avec l’urgence, les matériaux, la zone et le formulaire, démarre à partir de {{prix:une-page}} €. Avec une page par matériau, par type de charpente et par secteur, un site multi-pages démarre à partir de {{prix:multi-pages}} €. Un outil de tri des demandes d’urgence ou de suivi de chantier démarre à partir de {{prix:outil}} €. Le [simulateur](/tarifs) vous donne le chiffre selon vos réponses.`,
        `Ce qui fait varier le budget : le nombre de matériaux et d’ouvrages que vous voulez traiter chacun sur sa page, la quantité de photos de détail à préparer, un formulaire d’urgence relié à un outil, et la taille de votre zone. Si vous comptez sur Google pour recevoir les demandes locales, prévoyez aussi du [référencement local](/services/referencement-local), qui se chiffre à part.`,
        `Première erreur : des photos de toitures vues de loin, sans détail. Montrez les rives, les faîtages, les noues, ce qui prouve le soin. Deuxième erreur : l’absence de nom, d’adresse et de SIRET ; affichez-les en pied de chaque page. Troisième erreur : un formulaire qui n’accepte pas les photos, alors que c’est le meilleur moyen de chiffrer à distance.`,
        `Quatrième erreur : un discours alarmiste sur les « dangers » d’une toiture, que le visiteur lit comme du démarchage. Remplacez-le par des critères sobres pour juger de l’état de sa couverture. Si vous travaillez avec des maçons sur les mêmes maisons, regardez ce que raconte le site d’un [maçon-rénovateur](/creation-site-internet/macon-renovateur) : vous pouvez vous renvoyer des clients.`,
      ],
    },
  ],

  'menuisier-ebeniste': [
    {
      titre: `Ce que tapent vos clients sur Google`,
      paragraphes: [
        `Les clients d’un menuisier tapent presque toujours l’objet qu’ils veulent, pas le métier : « dressing sur mesure prix », « escalier bois sur mesure », « bibliothèque sous pente », « porte d’entrée bois sur mesure », « table en chêne massif artisan ». Ils savent à quoi ressemble la pièce et cherchent quelqu’un qui sache la fabriquer. Une page par type d’ouvrage, avec des photos et des dimensions réelles, est ce qui répond à cette intention.`,
        `Il y a ensuite les recherches de remplacement : « fenêtres bois ou PVC », « changer ses fenêtres menuisier Saumur », « volets bois sur mesure ». Le visiteur compare des matériaux et se demande qui peut les poser. Parlez de pose, d’entretien et de durée de vie sans promettre de performance chiffrée : renvoyez aux fiches techniques de vos fournisseurs pour les caractéristiques exactes.`,
        `La restauration forme une famille à part : « restauration meuble ancien ébéniste », « réparer une commode ancienne », « décaper et reteindre une armoire ». Le propriétaire a un attachement affectif à la pièce, il veut savoir si vous saurez la respecter. Parlez-lui de vos gestes, de ce que vous gardez, de ce que vous refusez de modifier, et montrez des avant/après.`,
        `Enfin, la recherche locale et comparative : « menuisier près de moi », « ébéniste Tours avis », « menuisier ou cuisiniste pour une cuisine sur mesure », « artisan ou grande enseigne pour un dressing ». Le client veut savoir ce qu’un artisan apporte que l’enseigne n’apporte pas : relevé de cotes sur place, choix des essences, pièce unique. Dites-le avec vos photos, pas avec des slogans.`,
      ],
    },
    {
      titre: `Les pages d’un bon site de menuisier-ébéniste`,
      paragraphes: [
        `L’accueil doit montrer tout de suite le travail, avec trois ou quatre réalisations en grand, puis orienter vers les familles d’ouvrages : agencements et placards, escaliers, menuiseries extérieures, meubles sur mesure, restauration. Chaque famille a sa page, avec des fiches de projets : contexte, essence, finition, dimensions, durée du travail de façon générale. Moins de projets mais mieux documentés valent mieux qu’une galerie de cinquante images muettes.`,
        `Une page sur les essences et finitions aide à choisir : chêne, noyer, frêne, bois peints, huilés, vernis, avec la manière dont chacun vieillit. Une page « l’atelier » montre les étapes de fabrication et la machine ou le geste qui font la différence. Ce sont les pages que les visiteurs partagent, et celles qui convainquent un client d’attendre votre disponibilité plutôt que d’aller vers un produit de série.`,
        `Prévoyez enfin un parcours « votre projet » : questions sur la pièce, les dimensions, le style, le budget souhaité, les photos de l’existant, puis une explication de ce qui suit (visite, plan, devis, acompte, fabrication, pose). Si vous vendez aussi des pièces uniques ou du petit mobilier, une courte boutique peut s’ajouter plus tard, sans bouleverser le reste.`,
      ],
    },
    {
      titre: `Ce que vous devez afficher, et ce qu’il faut éviter`,
      paragraphes: [
        `Les mentions dépendent de ce que vous faites. Si vous posez des ouvrages, la décennale peut être concernée ; si vous ne faites que fabriquer et livrer des meubles, la situation diffère. Renseignez-vous auprès de votre assureur et de votre chambre de métiers, puis affichez ce qui s’applique : assurance, identité complète de l’entreprise, titre d’artisan ou de maître artisan si vous le détenez, qualification pour les menuiseries extérieures si vous en posez. Le label Entreprise du Patrimoine Vivant n’est à afficher que si vous l’avez obtenu.`,
        `Pour l’origine du bois, n’affichez un label de gestion forestière (PEFC, FSC) que si votre entreprise est certifiée ou si vous pouvez prouver la certification de vos fournisseurs. Sinon dites simplement d’où viennent vos bois et pourquoi, sans formule vague comme « bois écologiques ». Sur les performances de fenêtres ou de portes, citez les fiches techniques des fabricants plutôt que des chiffres de votre cru.`,
        `Un meuble sur mesure vendu à distance ne bénéficie pas, en principe, du droit de rétractation prévu pour les ventes en ligne, car il est fabriqué selon les spécifications du client. Dites-le clairement avant l’acompte et précisez vos conditions d’annulation ; vérifiez la formulation sur economie.gouv.fr. Évitez les photos prises sur des banques d’images ou sur des sites tiers : un menuisier est jugé sur ce qu’il fait de ses mains, et la même photo trouvée ailleurs détruit cette crédibilité.`,
      ],
    },
    {
      titre: `Quels outils de gestion pour un menuisier-ébéniste`,
      paragraphes: [
        `Un projet de menuiserie dure plusieurs semaines et passe par des validations successives. Un [portail client](/solutions/portail-client) rassemble le plan validé, le choix d’essence, la finition retenue, les photos d’avancement et le solde à régler. Le client sait où en est son meuble sans vous téléphoner, et vous gardez la trace de chaque décision, ce qui éteint la plupart des discussions de fin de projet.`,
        `Le devis demande de distinguer matière, fabrication, pose et livraison. Le module de [gestion des devis et factures](/solutions/gestion-devis-factures) le fait, enregistre l’acompte avant le début de la fabrication et émet la facture finale. C’est utile pour un artisan dont les projets sont uniques et dont les chiffrages ne se copient pas d’un client à l’autre.`,
        `L’atelier a aussi besoin de suivre sa matière. Un petit module de [gestion de stock](/solutions/gestion-stocks) recense les planches en séchage, les plateaux réservés, la quincaillerie et les chutes réutilisables, avec des alertes avant rupture. Enfin, si vous vendez des petites pièces ou du mobilier fini, un [site e-commerce](/services/site-ecommerce) peut se greffer sur le même catalogue.`,
      ],
    },
    {
      titre: `Budget, et erreurs fréquentes`,
      paragraphes: [
        `Un site de menuisier d’une page, avec vos réalisations phares, vos familles d’ouvrages et un formulaire de projet, démarre à partir de {{prix:une-page}} €. Pour une page par famille d’ouvrage, des fiches de projets détaillées et une page essences et finitions, un site multi-pages démarre à partir de {{prix:multi-pages}} €. Un outil de suivi de projets pour les clients démarre à partir de {{prix:outil}} €, et une boutique pour vos pièces à partir de {{prix:boutique}} €. Le [simulateur](/tarifs) précise le calcul.`,
        `Le budget bouge avec le nombre de projets à documenter, la place des photos et vidéos de fabrication, la présence d’un espace client de validation et l’éventualité d’une boutique. Un menuisier qui travaille sur commande pour quelques clients par an n’a pas les mêmes besoins qu’un atelier qui vend des meubles finis toute l’année.`,
        `Première erreur : des galeries sans légende. Ajoutez pour chaque réalisation la pièce, l’essence, la finition et une phrase sur la contrainte résolue. Deuxième erreur : parler de « qualité artisanale » sans montrer un seul geste ; une photo d’assemblage ou une courte vidéo d’atelier prouve davantage. Troisième erreur : un formulaire qui se contente de « votre message » ; posez des questions sur la pièce, les dimensions et le style.`,
        `Quatrième erreur : cacher votre façon de travailler et vos conditions (acompte, étapes, durée générale), ce qui fait fuir les clients prudents. Écrivez-les. Pour aller plus loin, lisez l’article sur le [portfolio numérique de l’artisan](/blog/portfolio-artisan-digital) et regardez comment un [cuisiniste](/creation-site-internet/cuisiniste), proche de votre métier, présente ses projets.`,
      ],
    },
  ],
}
