import type { Enrichissements } from './types'

export const ENRICHISSEMENTS: Enrichissements = {
  'magasin-informatique': {
    sections: [
      {
        titre: `Entre le comptoir, l’établi et le téléphone qui sonne`,
        paragraphes: [
          `Dans un magasin d’informatique et de téléphonie, la journée se joue sur trois fronts à la fois : le client qui entre avec un écran brisé, le technicien penché sur une carte mère au fond de l’atelier, et la sonnerie qui interrompt les deux. Les rentrées scolaires, les pannes juste après Noël et les ordinateurs qui rendent l’âme en pleine déclaration de revenus créent des pics imprévisibles. Chaque appel pour demander « vous réparez ça ? » vous coûte dix minutes d’atelier. Un site qui répond d’avance aux questions courantes libère ce temps.`,
          `Le point sensible, c’est le suivi : un client dont l’appareil est déposé veut savoir où il en est sans vous déranger. Stackup fabrique sur mesure un petit outil de suivi de dossiers, où chaque dépôt reçoit un numéro, un statut (diagnostic, pièce commandée, prêt à retirer) et un message envoyé au client à chaque étape. Vous gardez la trace des mots de passe oubliés, des sauvegardes à faire avant intervention et des accords donnés pour un devis de remise en état, ce qui évite les litiges au retrait.`,
        ],
      },
      {
        titre: `Ce que tapent vos futurs clients dans la barre de recherche`,
        paragraphes: [
          `Personne ne cherche « magasin informatique » quand son téléphone ne s’allume plus. Les requêtes sont précises : modèle exact, nature de la panne, nom de la ville. Un écran fissuré, une batterie qui gonfle, un PC portable qui chauffe, un virus, un disque dur qui claque. Chaque famille de panne mérite sa page, avec une explication honnête de ce qui est réparable, ce qui ne l’est pas, et ce que vous faites avant d’engager des frais. Ces pages ramènent des visiteurs qui ont déjà décidé de passer la porte de quelqu’un près de chez eux.`,
          `L’erreur la plus fréquente dans ce secteur est le site-catalogue : une liste de marques et de produits, sans explication ni prise de contact claire. Le client veut savoir si vous reprenez les vieux appareils, si vous travaillez pour les entreprises, si vous dépannez à distance, et surtout comment déposer son appareil. Mettez en avant les horaires du comptoir, un plan d’accès, la liste de ce que vous apportez avec vous au dépôt, et un formulaire de diagnostic simple où l’on décrit le symptôme et joint une photo.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment éviter les litiges sur les données d’un appareil déposé ?`,
        a: `En faisant accepter, au moment de la demande en ligne ou du dépôt, une fiche qui précise que la sauvegarde est conseillée avant toute intervention et que vous pouvez avoir à réinitialiser l’appareil. Cette fiche, enregistrée avec le numéro de dossier, protège le client comme vous.`,
      },
      {
        q: `Mon site peut-il distinguer particuliers et entreprises ?`,
        a: `Oui. Deux entrées distinctes dès l’accueil permettent à un particulier de déposer son téléphone et à une entreprise de demander une maintenance de parc ou un dépannage sur site. Chacun trouve les informations utiles sans parcourir celles de l’autre.`,
      },
      {
        q: `Puis-je afficher le stock de pièces et accessoires ?`,
        a: `Si vous tenez déjà un stock informatisé, nous pouvons en publier une partie : coques, chargeurs, écrans courants. Sinon, une simple page des accessoires disponibles en magasin, mise à jour à la main, suffit à renseigner les clients avant leur déplacement.`,
      },
    ],
  },

  opticien: {
    sections: [
      {
        titre: `Derrière le comptoir : adaptation, retouches et ordonnances`,
        paragraphes: [
          `Un opticien indépendant passe sa journée entre le conseil à la monture, l’adaptation d’un équipement, les retouches de branches et les échanges avec les mutuelles. L’activité suit un rythme précis : renouvellements d’équipement quand les ordonnances arrivent à échéance, rendez-vous de contactologie, ajustements après livraison, solaires dès les beaux jours. Une grande partie du téléphone sert à des questions répétitives : est-ce que mes verres sont arrivés, puis-je passer sans rendez-vous, travaillez-vous avec ma mutuelle. Chaque réponse prise en ligne vous donne du temps pour les clients présents.`,
          `Le site n’est pas là pour vendre des lunettes à distance mais pour préparer la visite. Il peut annoncer clairement que vous êtes diplômé en optique-lunetterie, proposer un créneau de rendez-vous pour l’essayage ou la remise d’un équipement, et informer sur les offres de l’équipement 100 % Santé que vous tenez en boutique. Stackup peut aussi concevoir un outil de suivi de commande : le client reçoit un message dès que ses verres sont montés et prêts à être ajustés.`,
        ],
      },
      {
        titre: `Ce qu’un porteur de lunettes veut vérifier avant de pousser la porte`,
        paragraphes: [
          `Les personnes qui cherchent un opticien en ligne tapent rarement un mot générique. Elles cherchent des lunettes pour enfant, des verres progressifs, une paire de rechange rapide, un contrôle de vue sans ordonnance récente, ou une boutique près d’un lieu précis. Chaque besoin gagne à avoir sa page : une pour les enfants et les rendez-vous avec les parents, une pour les verres progressifs avec l’explication de la période d’adaptation, une pour les lentilles. Les visiteurs veulent comprendre vos façons de faire avant de se déplacer.`,
          `Les sites du secteur commettent souvent trois erreurs : des photos de montures génériques fournies par les fabricants, aucune présentation de l’équipe, et des informations sur la prise en charge noyées dans un texte technique. Montrez votre vitrine réelle, les visages de ceux qui reçoivent, vos marques indépendantes et vos horaires. Une page claire sur le tiers payant, les mutuelles que vous traitez et les pièces à apporter (ordonnance, carte vitale, attestation de mutuelle) évite des appels et des visites pour rien. Précisez enfin si vous réalisez les réparations de montures sur place, pour que les porteurs de lunettes cassées sachent qu’ils peuvent passer vous voir.`,
        ],
      },
    ],
    faq: [
      {
        q: `Puis-je demander à mes clients d’envoyer leur ordonnance par le site ?`,
        a: `C’est possible : un champ permet de joindre une photo de l’ordonnance avant la visite, ce qui vous laisse préparer un devis. Les données de santé étant sensibles, nous prévoyons un envoi sécurisé et une mention d’information claire.`,
      },
      {
        q: `Comment présenter les marques sans copier les catalogues des fabricants ?`,
        a: `Photographiez vos propres montures, en boutique ou portées. Quelques fiches avec le style, la matière et l’ajustement donnent bien plus de caractère qu’un visuel fournisseur que tout le monde retrouve sur d’autres sites.`,
      },
      {
        q: `Mon site peut-il annoncer les rendez-vous de contactologie séparément ?`,
        a: `Oui. Nous créons un motif de rendez-vous distinct, avec sa propre durée et sa propre explication de ce qu’il faut apporter. Cela évite de bloquer un créneau d’essayage de monture pour un suivi de lentilles.`,
      },
    ],
  },

  'bijouterie-horlogerie': {
    sections: [
      {
        titre: `Sous la loupe de l’atelier : une journée de bijoutier-horloger`,
        paragraphes: [
          `La journée d’un bijoutier-horloger alterne le travail minutieux à l’établi et l’accueil de la boutique : un sertissage à reprendre, une pile de montre à changer, un bracelet à ajuster, une alliance à graver. L’activité culmine autour de Noël, de la Saint-Valentin, de la fête des mères et des saisons de mariages, avec des commandes spéciales à planifier longtemps à l’avance. Vos pièces portent des poinçons de garantie qui attestent le titre du métal précieux, et vos clients vous confient des objets de famille : la confiance se construit sur la précision et la discrétion.`,
          `Un site peut reprendre ces deux versants. D’un côté, la vitrine des créations et des pièces en dépôt, photographiées sous plusieurs angles. De l’autre, les services d’atelier : réparation, rhabillage, révision de montres, gravure. Stackup peut fabriquer un outil de prise en charge où chaque objet confié reçoit une fiche avec photos, description de l’état et accord du client sur les travaux, pour garder une trace propre de ce qui entre et sort de l’atelier.`,
        ],
      },
      {
        titre: `Ce qu’un acheteur de bijoux a besoin de lire`,
        paragraphes: [
          `Celui qui cherche une bague de fiançailles ou un cadeau de naissance veut des informations précises avant d’acheter : le titre du métal (par exemple l’or 18 carats, soit 750 millièmes), la nature des pierres, les dimensions, la possibilité de modifier la taille. Une bonne fiche produit les donne toutes, avec une photo portée pour juger de l’échelle. Les recherches mêlent souvent l’occasion, le matériau et la ville : alliance sur mesure, bijou en argent pour homme, réparation de montre ancienne.`,
          `Dans ce secteur, les sites déçoivent par leurs images : photos floues, reflets mal maîtrisés, aucun détail du fermoir ni du poinçon. Un acheteur ne touche pas la pièce, c’est donc le site qui doit remplacer sa main. Prévoyez aussi des pages claires sur la taille de doigt avec un guide à imprimer, sur l’entretien des bijoux, sur la garantie et les conditions de retour. Un bijoutier-créateur gagne enfin à raconter sa méthode de travail : le dessin, la cire ou la fonte, la finition. Une page dédiée aux commandes spéciales, avec les étapes de la conception à la remise, aide un futur marié à se projeter bien avant son rendez-vous.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment proposer la réparation de montres sans voir l’objet ?`,
        a: `Le site peut recueillir la marque, le modèle et une photo du problème, puis vous laisser proposer un premier avis avant dépôt. Le devis définitif reste établi en boutique, après examen de la montre à l’établi.`,
      },
      {
        q: `Que faire pour les bijoux d’occasion ou de famille à transformer ?`,
        a: `Une page dédiée à la transformation explique comment confier un bijou ancien, ce que vous pouvez en tirer, et ce que vous conservez avec accord écrit. Un formulaire avec photos permet de discuter d’une idée avant le rendez-vous.`,
      },
      {
        q: `Mon site doit-il afficher les poinçons et le titre des métaux ?`,
        a: `Mentionner le titre du métal sur chaque fiche est une information attendue par l’acheteur. Pour les poinçons et la réglementation précise du commerce des métaux précieux, nous reprenons les textes que vous fournissez, sans rien improviser.`,
      },
    ],
  },

  'vetements-enfants': {
    sections: [
      {
        titre: `Des parents pressés, des enfants qui grandissent trop vite`,
        paragraphes: [
          `Dans une boutique de vêtements pour enfants, la clientèle est faite de parents qui achètent dans l’urgence : une fête d’école demain, un pantalon trop court découvert le matin de la rentrée, une naissance dans la famille. Le rythme suit les saisons, les changements de taille et les cadeaux. Un enfant change de taille avant la fin de la saison, ce qui explique les échanges fréquents et les questions sur les équivalences d’âge. Chaque semaine, vous rangez, étiquetez, conseillez sur les matières et prenez des commandes pour un cadeau de dernière minute.`,
          `Un site bien pensé répond à ce flux sans vous mobiliser : taille, tranche d’âge, matière et conseils de lavage visibles sur chaque fiche, disponibilité en boutique indiquée clairement, retraits sur place pour les parents qui n’ont pas le temps de flâner. Stackup peut ajouter un outil de listes de naissance et de cadeaux, où la famille réserve une pièce et vous voyez en un coup d’œil ce qui reste disponible. Pour la vente à distance, le droit de rétractation et les conditions de retour doivent être lisibles avant le paiement.`,
        ],
      },
      {
        titre: `Les mots que tapent les parents, et ce qui les fait fuir`,
        paragraphes: [
          `Les parents recherchent par âge, par occasion et par valeur : cadeau de naissance, tenue de cérémonie, vêtement en coton biologique, pyjama doux pour peau sensible, manteau de saison. La page d’accueil doit leur permettre d’entrer par l’un de ces chemins en un clic. Chaque grande catégorie mérite un texte qui explique votre sélection, vos critères de choix des marques et vos conseils pour acheter une taille au-dessus ou non. Ces pages servent à la fois aux visiteurs et à la recherche.`,
          `Les sites d’habillement pour enfants échouent souvent sur la clarté des tailles : mesures absentes, équivalences âge-taille contradictoires, photos sans échelle. Un guide par marque, avec la taille de l’enfant en centimètres, rassure davantage qu’un grand tableau général. Évitez aussi les promesses vagues sur les matières : indiquez la composition réelle de chaque article et les labels textiles que vous pouvez justifier. Ajoutez un mot sur le soin des vêtements et la transmission au frère ou à la sœur, très cohérent avec une boutique sélective.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment gérer les retours quand l’enfant a grandi entre-temps ?`,
        a: `En indiquant clairement les conditions d’échange sur la fiche et au panier : délai, état de l’article, étiquettes conservées. Une page dédiée détaille la marche à suivre pour échanger une taille, en boutique ou par envoi.`,
      },
      {
        q: `Puis-je proposer un bon cadeau pour les naissances ?`,
        a: `Oui, un bon cadeau imprimable ou envoyé par e-mail se prête bien aux naissances. Il peut porter un message personnalisé et être utilisé en boutique comme en ligne, avec une date de validité affichée sans ambiguïté.`,
      },
      {
        q: `Mon site peut-il annoncer l’arrivée d’une nouvelle collection ?`,
        a: `Oui. Une page de nouveautés, mise à jour à chaque arrivage, et un formulaire d’inscription à l’annonce des collections suffisent. Vos clients savent ainsi quand repasser sans suivre un réseau social au quotidien.`,
      },
    ],
  },

  'boutique-mode': {
    sections: [
      {
        titre: `Le rythme d’une boutique de mode : arrivages, cabine et vitrine`,
        paragraphes: [
          `Dans une boutique de mode, tout se joue sur le renouvellement. Les collections arrivent par vagues, la vitrine change, les cintres se réorganisent, et chaque pièce doit être photographiée, mesurée, étiquetée. Les soldes, dont les dates sont fixées par la réglementation nationale, imposent une grande rigueur sur les prix barrés et les stocks restants. En parallèle, vous conseillez en cabine, retouchez des ourlets, gérez les échanges, répondez aux clientes qui demandent si la robe vue en story existe en 40. Votre mémoire de stock est votre premier outil.`,
          `Un site e-commerce n’a de sens que s’il reste cohérent avec le magasin. Stackup fabrique des boutiques en ligne dont le stock est partagé avec le point de vente, pour qu’une pièce vendue en boutique ne reste pas affichée en ligne. Le click & collect permet aux clientes locales de réserver une tenue et de venir l’essayer. Vous gardez le contrôle des retours, des bons d’achat et des périodes de promotion, sans jongler entre trois fichiers et la caisse.`,
        ],
      },
      {
        titre: `Ce que vos clientes cherchent, et ce qui les fait quitter la page`,
        paragraphes: [
          `Les clientes cherchent un style plus qu’une catégorie : robe pour un mariage, tenue de rendez-vous, manteau de mi-saison, marque précise de votre sélection. Les requêtes mêlent souvent une occasion, une taille et une ville. Pensez à des pages d’occasion plutôt qu’à de simples rayons : tenues de cérémonie, looks de bureau, essentiels de saison. Chaque page associe photos portées, conseils de coupe et pièces disponibles en boutique. Cela donne au site une personnalité que les grandes plateformes ne peuvent pas copier.`,
          `Les erreurs courantes des sites de mode : photos de qualité inégale selon les marques, tailles sans précision de la coupe, fiches sans matière ni entretien, paiement compliqué sur téléphone. Une cliente qui doute sur le tombé d’un vêtement cherche une photo de dos et de profil, la taille portée par le mannequin et la possibilité de retour. Affichez l’adresse de la boutique, ses horaires et la possibilité de venir essayer. Et réservez la page d’accueil à ce qui change vraiment : arrivages, pièces rares, conseils de la saison. Une page sur votre manière de conseiller en cabine et sur l’accueil en boutique complète utilement ces rubriques.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment synchroniser le stock du magasin et celui du site ?`,
        a: `Nous relions le site à votre outil de caisse ou à un tableau de stock que vous tenez. Chaque vente en boutique met à jour la disponibilité en ligne, avec une marge de sécurité pour les pièces à un seul exemplaire.`,
      },
      {
        q: `Puis-je vendre des pièces uniques ou en série limitée ?`,
        a: `Oui. Une fiche peut afficher un exemplaire unique, se retirer dès la vente et passer dans une page des pièces déjà parties. Cela crée de la rareté sans mensonge et entretient l’intérêt des clientes régulières.`,
      },
      {
        q: `Mon site doit-il afficher les prix de soldes avec le prix initial ?`,
        a: `La réduction annoncée doit respecter les règles sur les prix de référence. Nous prévoyons un affichage du prix barré avec activation par période, mais le calendrier et la base de comparaison relèvent de votre responsabilité.`,
      },
    ],
  },

  'cosmetiques-naturels': {
    sections: [
      {
        titre: `De la formule à l’étiquette : le quotidien d’un créateur de cosmétiques`,
        paragraphes: [
          `Une marque de cosmétiques naturels vit sous le regard de la réglementation européenne. Avant la première vente, chaque produit passe par une évaluation de sécurité, un dossier d’information produit, une étiquette conforme et une notification sur le portail européen. Le responsable de la mise sur le marché, c’est vous, ce qui demande une organisation rigoureuse. À côté, il y a la fabrication ou le suivi du sous-traitant, le conditionnement, les marchés, les envois, et la relation avec les clients qui posent des questions précises sur une peau sensible ou un ingrédient.`,
          `Un site peut faire gagner du temps sur cette partie documentaire. Chaque fiche produit regroupe la liste INCI, les précautions d’emploi, le contenant et les labels éventuels, sans les redéfinir à chaque modification. Stackup peut fabriquer un petit outil interne qui relie chaque référence à sa version de formule, à ses lots et à son dossier, pour retrouver rapidement le bon document quand un client, un revendeur ou un contrôle le demande. Le site devient la face publique d’un travail déjà bien tenu.`,
        ],
      },
      {
        titre: `Ce que vos clients vérifient avant de commander`,
        paragraphes: [
          `Les acheteurs de cosmétiques naturels lisent les étiquettes. Ils tapent le nom d’un ingrédient, cherchent une alternative sans parfum, demandent si un produit convient à une peau réactive, vérifient un label comme Cosmébio ou Ecocert COSMOS. Ils veulent des informations complètes et lisibles : la liste INCI entière, les précautions, la contenance, la conservation après ouverture. Une page qui explique votre démarche, vos fournisseurs et vos choix de formulation vous distingue d’une boutique qui se contente d’empiler des adjectifs.`,
          `Les erreurs classiques : des promesses de type médical que la réglementation des allégations ne permet pas, des termes comme « naturel » employés sans définition, des photos sans échelle de contenance, un panier qui ne montre les frais d’envoi qu’à la fin. Dites précisément ce que contiennent vos produits et ce qu’ils ne contiennent pas, sans dénigrer. Proposez des échantillons ou des formats découverte, des routines expliquées pas à pas et des conseils d’utilisation en fonction du type de peau, formulés comme des repères et non comme des diagnostics. Un journal de la marque, avec vos choix d’ingrédients et vos fournisseurs, nourrit la confiance sans phrases toutes faites.`,
        ],
      },
    ],
    faq: [
      {
        q: `Puis-je écrire que mes produits soignent ou traitent une affection de la peau ?`,
        a: `Non : un cosmétique ne peut pas revendiquer de propriété thérapeutique. Nous rédigeons les fiches avec des formulations descriptives (hydrate, apaise la sensation d’inconfort) et vous restez libre de valider chaque terme avec votre dossier de sécurité.`,
      },
      {
        q: `Comment afficher les labels bio sans risque de confusion ?`,
        a: `En n’affichant un label que sur les références effectivement certifiées, avec le nom de l’organisme et, si vous le souhaitez, un lien vers votre attestation. Une mention générale sur tout le site pourrait induire en erreur.`,
      },
      {
        q: `Mon site peut-il gérer les ventes aux revendeurs ?`,
        a: `Oui. Nous pouvons ouvrir un espace professionnel avec un catalogue dédié, un formulaire de demande d’ouverture de compte et des conditions de vente spécifiques, sans mélanger ces informations avec la boutique grand public.`,
      },
    ],
  },

  'jardinerie-animalerie': {
    sections: [
      {
        titre: `Au rythme des saisons : plants, graines et gamelles`,
        paragraphes: [
          `Une jardinerie-animalerie vit selon deux calendriers à la fois. Côté jardin, le printemps déclenche l’afflux de plants, de terreaux et d’outils, avec la crainte des dernières gelées ; l’automne amène les bulbes, les arbustes et la préparation du jardin. Côté animaux, la demande est plus régulière : aliments, litières, accessoires, soins, toilettage. Vous réceptionnez, arrosez, étiquetez, conseillez quelqu’un sur un rosier qui jaunit ou un chiot qui ne mange pas. Le stock vivant exige une attention quotidienne, et la vente d’animaux suit ses propres obligations d’information.`,
          `Le site vous aide à montrer ce qui est vraiment en rayon ce week-end, car un végétal ou un animal ne se stocke pas comme un objet. Stackup peut fabriquer un outil léger de « nouveautés de la semaine » que vous mettez à jour depuis votre téléphone, un agenda des ateliers et une prise de rendez-vous pour le toilettage. Les conseils de saison (quoi planter maintenant, quand rentrer les plantes sensibles) fidélisent les clients qui reviennent d’une année sur l’autre.`,
        ],
      },
      {
        titre: `Ce que cherchent les jardiniers et les propriétaires d’animaux`,
        paragraphes: [
          `Les clients ne cherchent pas « jardinerie » mais un besoin : que planter à l’ombre, quel gazon pour un terrain sec, comment lutter sans produit chimique contre un parasite, quelle croquette pour un chat âgé. Chaque question appelle une page de conseil écrite par quelqu’un qui connaît le terrain local, ses sols et son climat. C’est là que vous battez les grandes surfaces : un conseil adapté à la région vaut plus qu’une fiche générique, et il fait venir en magasin ceux qui voulaient seulement s’informer.`,
          `Les sites du secteur se contentent souvent d’un catalogue sans date ni disponibilité, ce qui pousse les visiteurs à se déplacer pour rien. Indiquez les horaires, les produits phares du moment, vos services (toilettage, livraison de terreau, reprise de pots) et vos événements. Soyez précis sur les animaux : espèce, âge, conditions d’accueil, informations légales à remettre à l’acquéreur. Pour les produits de jardin, mettez en avant des alternatives respectueuses de l’environnement plutôt que de longs discours. Une page par grande saison, avec un petit calendrier des gestes à faire au jardin, donne une raison de revenir sur le site.`,
        ],
      },
    ],
    faq: [
      {
        q: `Mon site peut-il annoncer les arrivages de plants chaque semaine ?`,
        a: `Oui. Une page « arrivages » que vous complétez en quelques lignes et une photo suffit. Nous pouvons y ajouter une inscription par e-mail pour prévenir les clients qui attendent une variété précise.`,
      },
      {
        q: `Comment présenter la vente d’animaux de compagnie de façon responsable ?`,
        a: `En rappelant les besoins de chaque espèce, les obligations de l’acquéreur et les informations que vous remettez à la vente. Nous reprenons vos documents officiels tels quels ; aucune fiche ne doit présenter un animal comme un simple produit.`,
      },
      {
        q: `Puis-je prendre des rendez-vous de toilettage en ligne ?`,
        a: `Oui, avec des créneaux selon la taille et le type de poil de l’animal, qui déterminent la durée. Le client précise la race et vous visualisez la journée du salon sans appels répétés.`,
      },
    ],
  },

  'macon-renovateur': {
    sections: [
      {
        titre: `Entre la dalle du lundi et la fissure du vendredi`,
        paragraphes: [
          `Un maçon-rénovateur jongle avec plusieurs chantiers à des stades différents : une dalle à couler en début de semaine, un mur porteur à ouvrir en milieu de semaine, un client qui rappelle pour une fissure. La météo dicte le calendrier du béton et des enduits, le gel et les pluies longues bouleversent le planning, et vous passez la journée sur site, le téléphone dans une poche pleine de poussière. Les messages se perdent et les devis traînent. Un site qui reçoit les demandes avec photos, nature des travaux et adresse permet de trier le soir, au calme.`,
          `Votre cadre professionnel est exigeant et vos futurs clients le savent : assurance décennale, qualification Qualibat, mention RGE si vous intervenez sur la performance énergétique, déclaration préalable ou permis pour une extension. Le site est l’endroit où ces justificatifs se consultent sans être envoyés trois fois. Stackup peut aussi fabriquer un petit outil de suivi de chantiers, avec photos datées et statut par étape, alimenté depuis le téléphone, qui nourrit directement votre galerie de réalisations et garde une mémoire propre de chaque ouvrage.`,
        ],
      },
      {
        titre: `Comment un particulier choisit son maçon`,
        paragraphes: [
          `Un particulier qui prépare une extension, une ouverture dans un mur ou une rénovation complète compare surtout la confiance. Il tape « extension maison » suivie d’une commune, « ouverture mur porteur », « reprise de fondations » ou « rénovation de longère ». Pour chacun de ces projets, une page qui explique les étapes, ce que vous prenez en charge et ce qui dépend d’autres intervenants (architecte, bureau d’études, plombier) est plus convaincante qu’une liste de mots-clés. Il veut comprendre comment un chantier se déroule avant de vous ouvrir sa maison.`,
          `Les sites de maçons échouent souvent sur les photos : des clichés pris de loin, en fin de chantier, sans état initial. Montrez l’avant, une étape en cours, puis l’après, avec la nature des travaux et la commune. Évitez les fonds d’écran de matériaux génériques. Ajoutez une page sur la manière de demander un devis : plans, photos, dimensions, accès au chantier, délais souhaités. Plus la demande arrive complète, plus votre réponse est précise, et plus le client sent qu’il traite avec un professionnel organisé.`,
        ],
      },
    ],
    faq: [
      {
        q: `Que mettre en ligne pour prouver que je suis assuré ?`,
        a: `Votre attestation d’assurance décennale en cours de validité, avec le nom de l’assureur et la période couverte. Elle est remplacée à chaque renouvellement. Nous prévoyons un emplacement pour la mettre à jour en autonomie.`,
      },
      {
        q: `Mon site peut-il aider les clients à préparer leur dossier d’urbanisme ?`,
        a: `Il peut expliquer, en termes généraux, quand une extension relève d’une déclaration préalable ou d’un permis et orienter vers la mairie. Nous ne remplaçons pas l’architecte ni le service d’urbanisme, et le site le précise.`,
      },
      {
        q: `Comment présenter des chantiers dont les clients ne veulent pas être identifiés ?`,
        a: `En ne publiant que la commune ou le département, sans adresse ni visage, et avec l’accord du client sur les photos. Beaucoup de réalisations se présentent très bien sans aucune indication permettant de reconnaître le lieu.`,
      },
    ],
  },

  'couvreur-charpentier': {
    sections: [
      {
        titre: `Sur le toit, à la merci du ciel`,
        paragraphes: [
          `Le couvreur-charpentier travaille en hauteur et à la merci du temps : un chantier reporté pour le vent, une bâche posée en urgence après un orage, un devis à chiffrer entre deux montées sur échelle. Après une tempête ou de fortes pluies, les appels affluent en quelques heures de gens qui découvrent une tuile cassée, une infiltration, un plafond taché. Entre les chantiers programmés et ces urgences, votre planning change en permanence. La sécurité en hauteur, le montage des échafaudages et le tri des déchets de couverture rythment aussi votre journée.`,
          `Un site peut absorber une partie de cette pression. Une page « fuite de toiture » claire explique quoi photographier, comment protéger provisoirement une pièce, et ce que vous faites en urgence. Un formulaire collecte l’adresse, le type de toiture et des photos avant votre rappel. Stackup peut ajouter un outil de tournée qui regroupe les demandes par secteur et par degré d’urgence, pour que vous décidiez de l’ordre des passages sans fouiller dans vos messages.`,
        ],
      },
      {
        titre: `Ce que le propriétaire lit avant de vous appeler`,
        paragraphes: [
          `Le propriétaire cherche d’abord un diagnostic : fuite, mousse sur la toiture, tuiles déplacées, charpente attaquée par des insectes, isolation des combles. Il tape souvent le matériau (ardoise, tuile, zinc), la commune et l’urgence. Prévoyez une page par matériau et par type d’intervention : réparation, démoussage, rénovation complète, charpente neuve, lucarne, fenêtre de toit. Chaque page explique ce que vous faites, comment vous protégez la maison pendant les travaux et les points que vous contrôlez en fin de chantier.`,
          `Les erreurs fréquentes du secteur nourrissent la méfiance : aucun nom d’entreprise, absence de numéro SIRET, adresse introuvable. Dans un métier où le démarchage abusif est connu, vous gagnez en affichant votre identité complète, vos assurances, vos qualifications Qualibat ou RGE si vous les détenez, et des photos de chantiers réels avec la commune. Précisez votre zone d’intervention, les matériaux que vous travaillez le plus et indiquez ce que vous refusez de faire par téléphone : un devis sérieux demande une visite. Quelques photos de chantiers en cours, avec casques, échafaudages et protections en place, prouvent aussi que la sécurité et l’ordre font partie de votre manière de travailler.`,
        ],
      },
    ],
    faq: [
      {
        q: `Mon site doit-il parler de la déclaration à l’assurance après une tempête ?`,
        a: `Une page d’information peut rappeler qu’il faut déclarer le sinistre à son assureur et conserver photos et devis. C’est un service utile pour les clients, sans promesse sur la prise en charge, qui dépend de leur contrat.`,
      },
      {
        q: `Comment valoriser un savoir-faire de charpente traditionnelle ?`,
        a: `Par des photos de détail d’assemblages, des plans ou croquis de vos réalisations, et une page qui décrit les essences et traitements que vous employez. Cela distingue la charpente façonnée de l’assemblage industriel.`,
      },
      {
        q: `Puis-je afficher un formulaire de visite de toiture avec photos aériennes ?`,
        a: `Le formulaire accepte des photos prises depuis le sol ou une fenêtre. Pour des images par drone, il faut respecter la réglementation en vigueur ; nous n’en faisons pas un argument sans votre confirmation de conformité.`,
      },
    ],
  },

  'menuisier-ebeniste': {
    sections: [
      {
        titre: `À l’atelier : du plan à la pose`,
        paragraphes: [
          `Le menuisier-ébéniste partage son temps entre l’atelier et la maison du client. Il prend des cotes sur place, dessine, choisit les essences, débite, assemble, ponce, vernit puis revient poser. Une bibliothèque sur mesure ou un escalier ne se fait pas en un jour, et chaque projet demande des allers-retours : validation du plan, choix des finitions, ajustements à la pose. Pendant ce temps, les nouveaux contacts arrivent par téléphone alors que vous êtes devant la scie à ruban. Les titres d’artisan ou de maître artisan, voire le label Entreprise du Patrimoine Vivant, comptent pour les clients exigeants.`,
          `Le site met de l’ordre dans ces échanges. Un formulaire de projet demande la pièce, les dimensions approximatives, le style souhaité et des photos de l’existant, ce qui vous évite une première visite pour rien. Stackup peut fabriquer un outil de suivi par projet où le client retrouve plans validés, choix d’essences, photos d’avancement et prochaines étapes. Vous y gardez l’historique des décisions, ce qui limite les malentendus quand un détail a été modifié en cours de fabrication.`,
        ],
      },
      {
        titre: `Ce que cherche celui qui veut du sur-mesure`,
        paragraphes: [
          `Le client potentiel ne sait souvent pas nommer ce qu’il veut. Il tape « meuble sous escalier », « dressing sur mesure », « bibliothèque encastrée », « restauration de meuble ancien », « cuisine en bois massif », suivi de sa ville. Des pages par type d’ouvrage, avec des photos de chaque étape (dessin, fabrication, pose), lui montrent ce qui est possible. Expliquez vos essences, vos finitions, vos assemblages visibles, et ce qui change dans le temps : un bois massif travaille, se patine, se répare.`,
          `Les sites de menuiserie pèchent par des galeries trop nombreuses, sans légende ni contexte. Une photo de meuble sans dimensions, sans essence ni pièce ne dit rien. Choisissez moins de projets, mieux documentés, avec une courte histoire pour chacun : le besoin de départ, la contrainte, la solution trouvée. Précisez si vous travaillez pour les particuliers, les architectes d’intérieur ou les professionnels, et si vous restaurez des pièces anciennes. Un client qui lit cela comprend que vous construisez avec lui plutôt que vous ne vendez du catalogue. Mentionnez aussi les réparations ou ajustements que vous acceptez après la pose, qui rassurent sur la durée de votre ouvrage.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment éviter d’être contacté pour des meubles que je ne fais pas ?`,
        a: `En énonçant clairement sur le site ce que vous faites et ce que vous refusez : pas de meubles en kit, pas de petites retouches de bricolage. Le formulaire peut aussi poser quelques questions de tri avant l’envoi.`,
      },
      {
        q: `Puis-je présenter une restauration de meuble ancien ?`,
        a: `Oui, avec une page dédiée et des séries avant/après qui montrent l’état d’origine, les gestes de restauration et la finition. Précisez aussi ce que vous refusez de restaurer, ce qui rassure sur votre honnêteté.`,
      },
      {
        q: `Mon site peut-il parler de provenance du bois ?`,
        a: `Oui, si vous connaissez et pouvez justifier l’origine de vos bois, par exemple auprès d’un scieur local. Nous n’affichons un label de gestion forestière que si vous en détenez la preuve.`,
      },
    ],
  },

  'peintre-decorateur': {
    sections: [
      {
        titre: `Préparer, poncer, enduire, peindre : le vrai travail avant la couleur`,
        paragraphes: [
          `Le client voit la couleur finale, vous savez que le plus gros du travail se joue avant : protéger les sols, reboucher, poncer, appliquer une sous-couche, enduire. La journée dépend du séchage, de l’humidité de l’air et de la lumière. Les chantiers intérieurs se calent sur l’occupation des lieux, les extérieurs sur la météo. Dans les maisons anciennes, la question des anciennes peintures au plomb impose des précautions. Vous choisissez aussi des produits dont l’étiquette d’émissions dans l’air intérieur, notée de A+ à C, compte pour les familles.`,
          `Un site peut raconter cette préparation, que les clients sous-estiment et qui justifie un devis honnête. Une page « comment se déroule un chantier de peinture » rassure en expliquant les étapes. Stackup peut fabriquer un outil de devis par pièce, où le client indique la surface approximative, l’état des murs et les finitions voulues, et vous recevez une demande déjà structurée. Vous gardez un accès rapide à vos fiches de chantier : références de teintes, produits utilisés, dates, pour les retouches futures.`,
        ],
      },
      {
        titre: `Ce que veulent voir ceux qui cherchent un peintre`,
        paragraphes: [
          `Les clients recherchent peintre en bâtiment pour un appartement avant vente, une maison à rafraîchir, une cage d’escalier, un ravalement ou un papier peint. Les termes changent selon le projet : peinture de plafond, enduit décoratif, pose de toile de verre, laquage de boiseries. Chaque prestation mérite sa page, avec des photos d’avant et d’après, la surface typique concernée et ce qui influence le devis. Les teintes et les ambiances comptent : montrez des pièces finies, bien éclairées, avec un mot sur le choix des couleurs.`,
          `Dans ce secteur, les sites commettent l’erreur de montrer des murs blancs : sans ombre, sans contexte, rien ne distingue un chantier soigné d’un autre. Photographiez les raccords nets, les angles, les boiseries, les plafonds. Précisez si vous conseillez sur les couleurs ou si le client apporte sa palette, si vous déplacez le mobilier, si vous nettoyez en fin de chantier. Ces détails de service font la différence entre deux devis proches, et un visiteur lit plus volontiers un site qui lui annonce ce qu’il va vivre chez lui. Une rubrique sur la remise en état de fin de chantier, protections retirées et sols nettoyés, complète ce tableau.`,
        ],
      },
    ],
    faq: [
      {
        q: `Mon site peut-il présenter des nuanciers ou des idées de couleurs ?`,
        a: `Oui, sous forme de pages d’ambiances avec photos de vos chantiers et teintes utilisées. Les couleurs variant selon les écrans et la lumière, nous ajoutons une mention invitant à valider l’échantillon sur place.`,
      },
      {
        q: `Comment parler des peintures écologiques sans exagérer ?`,
        a: `En indiquant précisément les produits que vous employez et leurs étiquettes d’émissions ou labels vérifiables. Nous évitons les formules vagues du type « entièrement naturel » qui ne reposent sur aucune référence.`,
      },
      {
        q: `Puis-je décrire mes interventions en copropriété ?`,
        a: `Oui, une page dédiée aux syndics et conseils syndicaux présente vos références de parties communes, votre façon de planifier avec les résidents et les documents que vous fournissez pour les devis.`,
      },
    ],
  },

  'carreleur-sol': {
    sections: [
      {
        titre: `Au sol et au mur : la précision du carreleur`,
        paragraphes: [
          `Un carreleur passe ses journées à genoux, le niveau à la main. Avant la première plaque, il vérifie la planéité du support, prévoit un ragréage si besoin, choisit la colle et le joint selon le matériau, calcule la coupe pour que les carreaux tombent juste aux seuils. Dans une douche à l’italienne, l’étanchéité sous carrelage fait partie du métier. Un plancher chauffant, un grand format ou une pose en extérieur imposent chacun leurs précautions. Entre deux chantiers, il faut commander, livrer, stocker et débarrasser, souvent dans des appartements occupés.`,
          `Votre site peut expliquer ce travail que le client ne voit jamais, car un carrelage mal préparé se paie des années plus tard. Une page sur la préparation des supports, la pose collée ou scellée, les joints et l’entretien rassure ceux qui comparent plusieurs devis. Sur mesure, Stackup peut aussi livrer un outil de calcul de métrage où le client saisit les dimensions de ses pièces et reçoit une estimation de surface à prévoir avec pertes, que vous retrouvez dans sa demande de devis, prête à chiffrer.`,
        ],
      },
      {
        titre: `Ce que cherchent ceux qui rénovent un sol ou une salle de bains`,
        paragraphes: [
          `Les recherches portent sur le projet plus que sur le métier : refaire une salle de bains, poser du carrelage grand format, remplacer une baignoire par une douche, carreler une terrasse, rénover un sol de cuisine, poser du béton ciré. Une page par projet, avec des réalisations photographiées en pleine lumière, attire des visiteurs qui savent ce qu’ils veulent. Expliquez ce qui est compris dans votre prestation : dépose de l’ancien revêtement, préparation du support, fourniture ou non du carrelage, évacuation des gravats.`,
          `Le défaut le plus répandu sur les sites de carreleurs est la galerie de sols vus de haut, sans pièce ni contexte. Un visiteur veut voir un carrelage dans une vraie salle de bains, avec les joints, les coupes autour des équipements et les angles. Précisez les formats que vous maîtrisez, vos fournisseurs habituels, et la possibilité de venir choisir en showroom partenaire. Mentionnez votre assurance et votre qualification si vous en avez. Une section sur l’entretien des joints et des sols selon le matériau prolonge la relation après le chantier. Évoquez aussi la dépose des anciens revêtements et la gestion des gravats, qui pèsent dans la décision du client.`,
        ],
      },
    ],
    faq: [
      {
        q: `Dois-je fournir le carrelage ou laisser le client le choisir ?`,
        a: `Les deux fonctionnent, à condition de l’annoncer sur le site. Une page « fourniture » explique ce que vous commandez, ce que le client peut apporter et pourquoi vous préférez valider le matériau avant la pose.`,
      },
      {
        q: `Mon site peut-il aider à estimer la quantité de carrelage ?`,
        a: `Oui, avec un petit calculateur de surface qui ajoute une marge de coupe. Il donne un ordre de grandeur et ne remplace pas votre métré sur place, qui reste la référence pour le devis.`,
      },
      {
        q: `Comment montrer le résultat d’un béton ciré ou d’une résine ?`,
        a: `Par des photos en lumière naturelle, de près et de loin, et des conseils d’entretien. Ces finitions suscitent des questions de durabilité : une page honnête sur leurs limites inspire davantage confiance qu’un discours promotionnel.`,
      },
    ],
  },

  'serrurier-depannage': {
    sections: [
      {
        titre: `Appelé quand tout va mal : la nuit, le week-end, devant une porte fermée`,
        paragraphes: [
          `Le serrurier est sollicité au pire moment : une clé perdue, une porte claquée, une serrure forcée après un cambriolage, un enfant enfermé dans une pièce. Les appels arrivent le soir, la nuit, les jours fériés, avec des gens stressés qui ne savent pas à qui se fier. Vous arrivez avec votre matériel, évaluez si la porte est claquée ou verrouillée, choisissez la méthode qui ne casse rien, puis proposez, le cas échéant, un changement de cylindre ou un renforcement. La porte blindée et les serrures certifiées A2P font partie de votre catalogue.`,
          `Pour un client en détresse, le site doit rassurer en quelques secondes : votre nom, votre numéro, votre zone, ce que vous faites et comment vous annoncez le coût avant d’intervenir. Nous pouvons concevoir un outil de prise d’appel qui note l’adresse, le type de porte et la nature du problème, pour que vous arriviez préparé. Vous y conservez aussi les interventions passées par adresse, ce qui facilite les suivis après un cambriolage et les demandes des assureurs.`,
        ],
      },
      {
        titre: `Ce que tapent les gens avant de composer un numéro`,
        paragraphes: [
          `La personne bloquée dehors tape « serrurier » suivi de sa ville, parfois « ouverture de porte » ou « serrurier de nuit ». Elle clique sur les premiers résultats et cherche un numéro local, un nom, un avis. La plupart de ces recherches se font sur téléphone, avec une main libre. Votre page d’accueil doit afficher le numéro cliquable en haut, les secteurs couverts et les types d’interventions. D’autres visiteurs, plus posés, cherchent une porte blindée, un contrôle d’accès ou le remplacement de leurs serrures après un déménagement.`,
          `Le secteur est entaché de pratiques abusives, et les visiteurs le savent. Les sites qui inspirent confiance disent qui ils sont : raison sociale, adresse réelle, numéro SIRET, méthode d’établissement du devis avant intervention. Évitez les numéros prétendument locaux qui redirigent ailleurs, et les photos de stock sans visage. Expliquez comment vous procédez selon la situation, sans jargon, et ce que le client doit vérifier chez n’importe quel serrurier avant de le laisser commencer : identité, devis écrit, facture détaillée. Un encart avec votre photo et votre véhicule marqué à votre nom aide la personne en attente devant sa porte à reconnaître celui qu’elle a appelé.`,
        ],
      },
    ],
    faq: [
      {
        q: `Que dois-je afficher pour inspirer confiance à quelqu’un en urgence ?`,
        a: `Votre raison sociale, votre adresse, votre SIRET, une photo de vous ou de votre véhicule, votre zone et la manière dont vous annoncez le coût avant d’intervenir. Ces éléments comptent plus qu’un slogan.`,
      },
      {
        q: `Mon site peut-il distinguer l’urgence de la demande de devis planifiée ?`,
        a: `Oui. L’urgence pousse à appeler directement avec un bouton visible, tandis que le remplacement de serrure ou la porte blindée passent par un formulaire détaillé. Chaque visiteur est orienté selon son besoin dès l’accueil.`,
      },
      {
        q: `Comment parler de la certification A2P ?`,
        a: `En expliquant simplement ce qu’elle représente et en ne l’affichant que pour les produits qui en bénéficient réellement. Un renvoi vers la fiche du fabricant ou de l’organisme certificateur permet au visiteur de vérifier.`,
      },
    ],
  },

  cuisiniste: {
    sections: [
      {
        titre: `Du métré à la dernière poignée : le fil d’un projet de cuisine`,
        paragraphes: [
          `Un projet de cuisine se déroule en plusieurs temps. Visite chez le client, relevé des cotes, repérage des arrivées d’eau, de gaz et d’électricité, puis dessin du plan, choix des façades, des plans de travail et de l’électroménager, validation du devis. La commande déclenche la fabrication ou l’approvisionnement, puis la pose, avec le plombier et l’électricien qui interviennent aux bons moments. L’installation électrique doit respecter les règles en vigueur, notamment la norme NF C 15-100. Entre ces étapes, un cuisiniste indépendant gère des dizaines de détails que le client découvre au fil du chantier.`,
          `Un site peut préparer le terrain. En amont, il explique comment se déroule un projet, ce qu’il faut apporter à la visite (plan de la pièce, photos, envies, budget global), et vous évite de répondre cent fois aux mêmes questions. Stackup peut fabriquer un espace client où chaque projet réunit le plan validé, la liste des éléments commandés et les étapes à venir. Le client sait où en est sa cuisine, et vous gardez une trace claire de chaque décision en cas de désaccord.`,
        ],
      },
      {
        titre: `Comment un futur client prépare sa cuisine sur internet`,
        paragraphes: [
          `Avant de franchir la porte d’un cuisiniste, le client passe des heures à regarder des ambiances. Il cherche « cuisine ouverte sur salon », « petite cuisine optimisée », « îlot central », « cuisine en bois et noir ». Il compare les styles avant de comparer les prix. Vos pages gagnent à s’organiser par ambiance et par contrainte (petit espace, ouverture sur le séjour, rénovation à budget maîtrisé), chacune accompagnée de réalisations réelles et d’un mot sur les choix techniques : rangements, éclairage, hotte, implantation.`,
          `Les sites de cuisinistes se ressemblent trop : ambiances de catalogue, aucune cuisine vécue, aucun nom de client ni de chantier. Montrez vos réalisations finies, avec un plan et une photo du résultat, en précisant ce qui était imposé par la pièce. Expliquez votre politique de pose et de raccordements, les marques d’électroménager que vous distribuez et ce qui se passe après la livraison en cas de défaut. Un visiteur qui comprend tout cela arrive au rendez-vous avec les bonnes questions et moins d’appréhension. Une page sur l’entretien des plans de travail et des façades selon leur matériau fait suite logiquement à la pose.`,
        ],
      },
    ],
    faq: [
      {
        q: `Que préparer avant la visite de métré ?`,
        a: `Votre site peut proposer une liste simple : plan de la pièce, photos des arrivées d’eau et d’électricité, électroménager à conserver, inspirations. Une page ou un PDF à imprimer rend la première visite beaucoup plus productive.`,
      },
      {
        q: `Mon site peut-il présenter les plans en perspective de mes projets ?`,
        a: `Oui, si votre logiciel de dessin en produit. Nous les associons à la photo finale lorsque c’est possible. Cet avant/après montre que le rendu promis correspond à la réalité de la pose.`,
      },
      {
        q: `Comment expliquer ce que couvre la pose et les raccordements ?`,
        a: `Par une page claire listant ce que vous réalisez vous-même, ce que sous-traitent des partenaires et ce qui reste à la charge du client, comme la remise en état des murs. Elle prévient les surprises en fin de chantier.`,
      },
    ],
  },

  pisciniste: {
    sections: [
      {
        titre: `De l’étude de terrain à la mise en eau : une saison de pisciniste`,
        paragraphes: [
          `Le métier de pisciniste est rythmé par une saison qui démarre bien avant le premier bain. Les projets se montent en hiver : visite du terrain, étude du sol, choix entre béton, coque ou structure légère, démarches d’urbanisme (déclaration préalable ou permis selon la surface), terrassement, local technique, mise en eau. Au printemps, les remises en service s’enchaînent ; à l’automne, l’hivernage. La sécurité est encadrée : toute piscine enterrée privée doit être équipée d’un dispositif de sécurité normalisé, comme une barrière, une alarme, une couverture ou un abri.`,
          `Votre site accompagne ces temps forts. Il présente votre méthode de la première visite jusqu’à la réception, rappelle les obligations de sécurité et d’urbanisme à vérifier, et propose les contrats d’entretien aux clients déjà équipés. Stackup sait aussi bâtir un outil de suivi d’entretien qui garde, par piscine, le volume, le type de traitement, les dates de passage et les relevés d’analyse de l’eau, pour que vos tournées de printemps et vos hivernages soient préparés sans fouiller dans des carnets.`,
        ],
      },
      {
        titre: `Ce que cherche un propriétaire qui rêve d’une piscine`,
        paragraphes: [
          `Le futur propriétaire se pose des questions très concrètes avant de demander un devis : quelle taille pour mon terrain, quel type de revêtement, faut-il une autorisation, combien de temps dure l’entretien, quel équipement pour chauffer l’eau. Il tape « piscine coque ou béton », « piscine pour petit jardin », « pompe à chaleur piscine » ou « rénovation de liner ». Des pages explicatives sérieuses, rédigées par quelqu’un qui construit, vous placent en conseiller. C’est aussi là que vous évoquez la taxe d’aménagement et les démarches, sans prétendre les remplacer.`,
          `Les sites de pisciniste aiment les images de bassin turquoise sous le soleil, qui ne disent rien de votre travail. Montrez des chantiers : le terrassement, le ferraillage, le local technique, la plage, et la piscine terminée dans son jardin. Détaillez le suivi après installation, qui compte autant que la construction. Soyez clair sur les contraintes : accès des engins, nature du sol, proximité de réseaux, règles de la commune. Un client qui lit cela comprend qu’un projet réussi commence par un terrain bien étudié. Ajoutez un guide de la première saison avec les gestes de mise en route, qui prolonge la relation avec les nouveaux propriétaires.`,
        ],
      },
    ],
    faq: [
      {
        q: `Mon site peut-il aider les clients à comprendre les démarches d’urbanisme ?`,
        a: `Il peut en donner un aperçu général : selon la surface, une déclaration préalable ou un permis, et le renvoi vers la mairie pour les règles locales. Il le fait sans se substituer au service d’urbanisme de la commune.`,
      },
      {
        q: `Comment parler de la sécurité des enfants sans alarmer ?`,
        a: `Par une page factuelle sur les dispositifs de sécurité normalisés que vous installez, leurs principes et leur entretien. C’est à la fois une obligation et un argument de sérieux pour les familles.`,
      },
      {
        q: `Puis-je présenter les différentes formules de traitement de l’eau ?`,
        a: `Oui, avec une page qui compare les approches (chlore, sel, autres systèmes) en termes de fonctionnement, d’entretien et de confort. Nous restons descriptifs et évitons de promettre un résultat qui dépendrait de chaque bassin.`,
      },
    ],
  },

  vitrier: {
    sections: [
      {
        titre: `Quand la vitre se brise, tout s’accélère`,
        paragraphes: [
          `Un vitrier travaille souvent dans l’urgence : une vitrine brisée à l’ouverture d’un commerce, une fenêtre cassée après une tentative d’effraction, un pare-douche éclaté, un double vitrage embué qui ne se répare plus. Dans ces cas, la première mission est de mettre en sécurité, par un panneau provisoire ou un film, avant de prendre les mesures pour fabriquer la nouvelle vitre. Entre deux urgences, vous prenez des cotes, commandez, découpez, posez, calfeutrez, en choisissant le bon verre : feuilleté, trempé, isolant, selon l’endroit et le risque.`,
          `Le site relie ces deux rythmes. Pour l’urgence, une page unique avec votre numéro cliquable, vos secteurs et ce que vous faites en premier. Pour les projets programmés, un formulaire qui demande dimensions, nombre de vitrages, étage et accès. Mathéo Reboul peut développer pour vous un outil de relevé de mesures où vous saisissez les cotes sur place depuis votre téléphone et envoyez au client un récapitulatif à valider. Vous évitez les erreurs de retranscription entre la mesure et la commande de verre.`,
        ],
      },
      {
        titre: `Particuliers, commerçants, assurances : trois lecteurs, trois attentes`,
        paragraphes: [
          `Votre site s’adresse à trois profils. Le particulier cherche à réparer une vitre brisée, changer un double vitrage ou poser un miroir. Le commerçant veut une vitrine remplacée vite et correctement sécurisée. Le gestionnaire d’immeuble ou le syndic cherche un prestataire pour des parties communes. Chacun a ses mots : « bris de glace », « remplacement vitrine », « miroir sur mesure », « verrière », « garde-corps en verre ». Une page d’accueil qui oriente vers ces trois entrées évite à chacun de chercher dans un texte générique.`,
          `Dans ce secteur, l’erreur la plus fréquente est de ne rien dire des assurances. Beaucoup de clients ont une garantie bris de glace et se demandent comment procéder : que photographier, quel devis fournir, quelle facture garder. Une page qui l’explique de façon générale, sans parler à la place de leur contrat, rend service et vous fait connaître. Montrez aussi vos réalisations de miroiterie et de verre décoratif, souvent absentes des sites alors qu’elles distinguent un artisan d’un simple poseur. Précisez les verres de sécurité que vous posez, notamment pour les portes vitrées et les salles de bains, un sujet qui préoccupe les familles.`,
        ],
      },
    ],
    faq: [
      {
        q: `Quelles informations demander dans le formulaire pour un bris de glace ?`,
        a: `L’adresse, l’emplacement de la vitre, ses dimensions approximatives, une photo et si elle est simple, feuilletée ou isolante. Ces éléments vous permettent de préparer le matériel et de rappeler en connaissance de cause.`,
      },
      {
        q: `Mon site peut-il présenter des verrières, garde-corps et cloisons vitrées ?`,
        a: `Oui, dans une rubrique réalisations sur mesure, avec dimensions, type de verre et fixation. Ce sont des projets à forte valeur de conseil, que les visiteurs aiment voir en situation avant de se décider.`,
      },
      {
        q: `Comment éviter les demandes hors de ma zone d’intervention ?`,
        a: `En affichant la zone sur une carte et en demandant le code postal en premier dans le formulaire. Si l’adresse est hors zone, le site l’indique tout de suite au lieu de laisser le visiteur remplir tout le reste.`,
      },
    ],
  },

  ramoneur: {
    sections: [
      {
        titre: `La saison du feu : de la première fumée aux dernières tournées`,
        paragraphes: [
          `Le ramoneur travaille au rythme du chauffage : dès la fin de l’été, les appels affluent de personnes qui veulent faire ramoner avant les premiers feux. Votre planning se remplit de tournées par quartier, de conduits à inspecter, de poêles à nettoyer, de chaudières à entretenir. La fréquence réglementaire dépend du combustible et du règlement sanitaire du département ; vous la rappelez à chaque client. Sur place, vous contrôlez l’état du conduit, vérifiez les risques liés au monoxyde de carbone et établissez le certificat de ramonage, que l’assurance habitation peut demander après un sinistre.`,
          `Un site peut réduire le temps passé à planifier. Le client choisit sa commune, son type d’appareil et un créneau dans votre tournée du secteur, ce qui regroupe vos passages. Pour aller plus loin, Stackup peut réaliser un outil de carnet de clients qui retient, pour chaque foyer, l’appareil, la dernière date de ramonage et le prochain rappel, et envoie le certificat par e-mail dès la fin de l’intervention. Au lieu de recharger un agenda papier chaque automne, vous reprenez la tournée là où elle s’était arrêtée.`,
        ],
      },
      {
        titre: `Ce que les foyers veulent savoir avant d’appeler`,
        paragraphes: [
          `Les propriétaires et locataires se demandent d’abord s’ils sont concernés, à quelle fréquence ramoner, qui doit payer en location, et quel document conserver. Ils tapent « ramonage cheminée », « ramonage poêle à bois », « ramoneur près de chez moi », « certificat de ramonage ». Des pages claires par type d’appareil (cheminée ouverte, insert, poêle à bois, poêle à granulés, chaudière) répondent à ces questions et vous positionnent en interlocuteur compétent. Chaque page peut aussi rappeler les gestes de prudence liés au monoxyde de carbone.`,
          `Les sites de ramoneurs se contentent souvent d’un numéro et d’une liste de services. Ils omettent ce que le client cherche vraiment : un créneau précis, la commune desservie, le justificatif obtenu à la fin. Précisez l’intervention selon l’appareil, ce qu’il faut préparer (accès au conduit, pièce dégagée, appareil froid), et la manière dont les déchets de suie sont traités. Ajoutez une page de conseils pour entretenir son poêle entre deux ramonages et reconnaître un conduit qui demande une inspection plus poussée. Un rappel sur la ventilation de la pièce et sur les détecteurs de monoxyde de carbone prolonge utilement ces conseils.`,
        ],
      },
    ],
    faq: [
      {
        q: `Qui doit faire ramoner : le locataire ou le propriétaire ?`,
        a: `En règle générale, l’entretien courant, dont le ramonage, est à la charge du locataire. Les situations varient selon le bail et les travaux de conduit. Notre page l’explique en termes généraux et renvoie vers le contrat pour les cas particuliers.`,
      },
      {
        q: `Mon site peut-il organiser mes tournées par commune ?`,
        a: `Oui. Le client indique sa commune, et le site ne propose que les créneaux de votre prochaine tournée dans ce secteur. Vous regroupez ainsi vos passages et réduisez les trajets entre deux foyers éloignés.`,
      },
      {
        q: `Peut-on aborder l’inspection par caméra des conduits ?`,
        a: `Si vous disposez de ce matériel, une page dédiée peut l’expliquer, avec ce que l’inspection permet de vérifier. Elle reste présentée comme une prestation complémentaire, jamais comme une obligation pour tous les clients.`,
      },
    ],
  },

  facadier: {
    sections: [
      {
        titre: `Sur l’échafaudage, en copropriété ou chez un particulier`,
        paragraphes: [
          `Le façadier travaille à l’échelle du bâtiment. Un chantier de ravalement commence par l’inspection du support : fissures, enduit qui se décolle, remontées d’humidité, peinture écaillée. Viennent ensuite l’échafaudage, le nettoyage, les réparations, l’enduit ou la peinture, parfois l’isolation par l’extérieur. Selon la commune, certains travaux modifiant l’aspect de la façade exigent une déclaration préalable en mairie. Vos interlocuteurs sont tantôt un particulier, tantôt un syndic qui présente votre devis en assemblée générale. Le calendrier dépend de la météo, de la température et du séchage des enduits.`,
          `Pour une copropriété, la décision passe par plusieurs mains et plusieurs réunions. Votre site doit donc fournir des éléments qui circulent bien : références de bâtiments collectifs, attestations d’assurance, présentation de la méthode de chantier, protection des fenêtres, gestion des accès des résidents. Stackup peut fabriquer un dossier de présentation consultable en ligne et téléchargeable, que le syndic transmet au conseil syndical. Un outil de suivi de chantier permet aussi d’informer les résidents de l’avancement, étage par étage.`,
        ],
      },
      {
        titre: `Ce que cherchent propriétaires, syndics et gestionnaires`,
        paragraphes: [
          `Les propriétaires tapent « ravalement de façade », « enduit de façade », « isolation thermique par l’extérieur » ou « traitement des fissures », suivi de leur commune. Les syndics cherchent un prestataire pour un immeuble entier et veulent des références comparables. Chaque lecteur a besoin d’un parcours différent : pour le particulier, des exemples de maisons et une explication des étapes ; pour le syndic, des chantiers collectifs, vos assurances et votre manière de gérer l’information aux résidents. Une page claire sur l’ITE précise les conditions des aides, qui supposent souvent une entreprise qualifiée RGE.`,
          `Le défaut majeur des sites de façadiers est la photo unique d’un mur terminé, sans l’état initial. L’impact vient du contraste : façade fissurée, puis enduit repris, puis couleur finale. Montrez des détails, comme les angles, les soubassements et les encadrements de fenêtres, qui révèlent la qualité. Précisez les types de finitions que vous maîtrisez : enduit gratté, taloché, projeté, chaux, peinture minérale. Expliquez aussi ce que vous ne ferez pas sans diagnostic préalable, par exemple une humidité à traiter avant de couvrir. Une page sur la protection des abords pendant le chantier (plantations, véhicules, fenêtres) montre le soin que vous apportez aux lieux.`,
        ],
      },
    ],
    faq: [
      {
        q: `Mon site peut-il être utile à un syndic qui compare plusieurs entreprises ?`,
        a: `Oui, avec un espace dédié aux professionnels qui regroupe attestations, références de copropriétés et description de votre méthode de chantier. Le syndic peut transmettre le lien à son conseil syndical sans vous rappeler.`,
      },
      {
        q: `Comment parler des aides à la rénovation sans promettre une prise en charge ?`,
        a: `En présentant les dispositifs de manière générale, en précisant que les conditions évoluent et dépendent du dossier, et en renvoyant vers les organismes officiels. Nous n’affichons aucun montant d’aide qui engagerait votre responsabilité.`,
      },
      {
        q: `Puis-je afficher l’état d’avancement des chantiers en cours ?`,
        a: `Oui, une page de chantiers en cours indique l’adresse générale, l’étape en cours et la prochaine. Pour les copropriétés, elle sert de point d’information aux résidents, avec l’accord du syndic.`,
      },
    ],
  },

  terrassier: {
    sections: [
      {
        titre: `Avant les fondations : ce que fait un terrassier sur un terrain`,
        paragraphes: [
          `Le terrassier intervient au tout début des projets : décaper la terre végétale, creuser les fouilles, niveler, préparer les tranchées de réseaux, évacuer ou réutiliser les terres. Avant de planter la première dent de la pelle, il faut connaître ce qui se cache sous le sol : la déclaration préalable aux gestionnaires de réseaux enterrés, la DICT, évite d’abîmer une conduite. L’étude de sol détermine la profondeur et le type de fondations. Les engins demandent des conducteurs formés, et l’acheminement des terres dépend d’un lieu de dépôt autorisé.`,
          `Votre site ne peut pas montrer la poussière du chantier, mais il peut en donner le sérieux. Il présente votre parc d’engins sans faire de simple inventaire, explique vos étapes de préparation et votre manière de gérer les terres excavées. À Tours, Stackup construit au besoin un outil de planification d’engins, qui répartit pelles, camions et conducteurs selon les chantiers de la semaine et prévient les clients d’un décalage dû à la pluie. Vous gardez aussi une fiche par chantier : accès, réseaux repérés, volume évacué.`,
        ],
      },
      {
        titre: `Particuliers, constructeurs et collectivités : trois façons de vous trouver`,
        paragraphes: [
          `Un particulier qui fait construire cherche souvent un terrassier via son constructeur ou son maçon, mais il vérifie ensuite son sérieux sur internet. Il tape « terrassement maison individuelle », « création d’accès », « assainissement individuel », « pose de fosse », « nivellement de terrain ». Le constructeur et l’architecte cherchent plutôt un partenaire fiable sur un secteur. Chaque profil lit des pages différentes : exemples de maisons pour le premier, capacités et organisation pour le second. Une page séparée sur l’assainissement autonome et le contrôle par le service compétent de la commune répond à une recherche très précise.`,
          `Dans le terrassement, les sites décevent par leur monotonie : photos d’engins posés dans un champ, liste de prestations sans contexte. Un visiteur veut voir un chantier du début à la fin, avec la nature du terrain, la contrainte principale et la solution adoptée. Indiquez votre rayon d’intervention, les terrains difficiles que vous avez traités et la façon dont vous organisez l’évacuation des terres. Un mot sur le respect des voisins, des voies d’accès et de la propreté de la voirie rassure ceux qui craignent un chantier bruyant.`,
        ],
      },
    ],
    faq: [
      {
        q: `Mon site peut-il parler de l’assainissement individuel ?`,
        a: `Oui, avec une page sur votre rôle dans la pose d’un dispositif et un rappel que l’installation est contrôlée par le service d’assainissement compétent. Nous reprenons vos explications techniques sans les remplacer.`,
      },
      {
        q: `Comment présenter mes engins sans faire un simple inventaire ?`,
        a: `En associant chaque machine à un type de chantier : la mini-pelle pour les accès étroits, le camion pour l’évacuation, la pelle pour les grandes fouilles. Le visiteur comprend l’intérêt de chaque matériel pour son projet.`,
      },
      {
        q: `Le formulaire peut-il récolter des informations sur le terrain ?`,
        a: `Oui : adresse, surface approximative, pente, accès pour les engins, présence de réseaux connus, et photos. Plus la demande est précise, plus votre visite est utile, et vous évitez de vous déplacer pour des terrains inaccessibles.`,
      },
    ],
  },
}
