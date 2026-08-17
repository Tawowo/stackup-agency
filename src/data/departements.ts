export interface Departement {
  slug: string
  nom: string
  code: string
  region: string
  chefLieu: string
  intro: string
  economie: string
  metiersPhares: { metier: string; besoin: string }[]
  communesPrincipales: string[] // avec page ville éventuelle
  communes: string[] // texte indexable
  faq: { q: string; a: string }[]
}

export const DEPARTEMENTS: Departement[] = [
  {
    slug: 'indre-et-loire',
    nom: 'Indre-et-Loire',
    code: '37',
    region: 'Centre-Val de Loire',
    chefLieu: 'Tours',
    intro:
      "Stackup Agency est basée à Tours : l'Indre-et-Loire est notre département d'origine. Nous y créons des sites internet pour les commerces, artisans, professions libérales et acteurs du tourisme, avec la possibilité de nous rencontrer en personne.",
    economie:
      "L'Indre-et-Loire vit d'un équilibre rare : une métropole dynamique (Tours et sa première couronne, plus de 300 000 habitants), un tissu industriel et pharmaceutique solide, et une économie touristique portée par les châteaux de la Loire et les vignobles de Vouvray, Chinon, Bourgueil et Montlouis. Les besoins numériques y sont très concrets : les restaurants et hôtels de la vallée de la Loire ont besoin de réservation en ligne, les vignerons de vente directe, les artisans du bâtiment de demandes de devis qualifiées, et les commerces tourangeaux d'une visibilité locale sur Google face aux zones commerciales périphériques.",
    metiersPhares: [
      { metier: 'Vignerons & caves', besoin: 'vente directe en ligne, réservation de dégustations' },
      { metier: 'Hôtels, gîtes & chambres d’hôtes', besoin: 'réservation sans commission, visibilité val de Loire' },
      { metier: 'Artisans du bâtiment', besoin: 'devis en ligne, chantiers en photos, SEO local' },
      { metier: 'Restaurants', besoin: 'menu en ligne, réservation, click & collect' },
      { metier: 'Professions libérales', besoin: 'prise de rendez-vous, site vitrine rassurant' },
    ],
    communesPrincipales: ['Tours', 'Joué-lès-Tours', 'Saint-Cyr-sur-Loire', 'Saint-Pierre-des-Corps', 'Amboise', 'Chinon', 'Loches'],
    communes: [
      'Tours', 'Joué-lès-Tours', 'Saint-Cyr-sur-Loire', 'Saint-Pierre-des-Corps', 'Saint-Avertin', 'Chambray-lès-Tours',
      'La Riche', 'Fondettes', 'Amboise', 'Chinon', 'Loches', 'Montlouis-sur-Loire', 'Vouvray', 'Bléré', 'Château-Renault',
      'Langeais', 'Azay-le-Rideau', 'Sainte-Maure-de-Touraine', 'Richelieu', 'Bourgueil', 'Descartes', 'Preuilly-sur-Claise',
      'Montbazon', 'Veigné', 'Esvres', 'Monts', 'Ballan-Miré', 'Luynes', 'Vernou-sur-Brenne', 'Rochecorbon',
      'Notre-Dame-d’Oé', 'Parçay-Meslay', 'Mettray', 'La Membrolle-sur-Choisille', 'Semblançay', 'Neuillé-Pont-Pierre',
      'Château-la-Vallière', 'Savonnières', 'Villandry', 'Cinq-Mars-la-Pile', 'Avoine', 'Beaumont-en-Véron',
      'L’Île-Bouchard', 'Sainte-Catherine-de-Fierbois', 'Cormery', 'Genillé', 'Montrésor', 'Ligueil', 'Le Grand-Pressigny',
      'Yzeures-sur-Creuse',
    ],
    faq: [
      { q: 'Peut-on se rencontrer en personne en Indre-et-Loire ?', a: 'Oui. Stackup Agency est basée à Tours : pour les projets du département, un rendez-vous physique est possible, à l’agence ou dans vos locaux. Le premier rendez-vous est offert et sans engagement.' },
      { q: 'Travaillez-vous avec les petites communes du département ?', a: 'Oui, et c’est même le cœur de notre activité : commerces de Loches, artisans de Chinon, gîtes d’Azay-le-Rideau… La création de site se fait à distance ou en rendez-vous, au même tarif partout : à partir de 449 € pour un site vitrine.' },
      { q: 'Combien coûte un site internet en Indre-et-Loire ?', a: 'Les tarifs sont les mêmes dans tout le département : site vitrine à partir de 449 €, site multi-pages à partir de 749 €, boutique en ligne à partir de 1 647 €, système de gestion à partir de 1 447 €. Devis gratuit sous 72 h.' },
    ],
  },
  {
    slug: 'loiret',
    nom: 'Loiret',
    code: '45',
    region: 'Centre-Val de Loire',
    chefLieu: 'Orléans',
    intro:
      "À une heure de Tours, le Loiret et sa métropole Orléans forment le deuxième bassin économique où Stackup Agency intervient le plus. Création de sites vitrines, boutiques en ligne et systèmes de gestion pour les entreprises orléanaises et de tout le département.",
    economie:
      "Le Loiret est un département logisticien et industriel : le croisement des autoroutes A10, A71 et A19 en a fait l'un des premiers hubs logistiques de France, la Cosmetic Valley y ancre des sous-traitants cosmétiques et pharmaceutiques, et Orléans concentre services, administrations et une scène de PME en digitalisation rapide. Concrètement : les transporteurs et prestataires logistiques ont besoin de sites B2B crédibles, les commerces d'Orléans, Olivet et Saran d'un SEO local solide, et les entreprises du Montargois et du Giennois — plus éloignées des agences parisiennes — d'un partenaire web accessible qui travaille à distance sans surcoût.",
    metiersPhares: [
      { metier: 'Logistique & transport', besoin: 'site B2B crédible, demandes de devis entreprises' },
      { metier: 'Commerces d’Orléans métropole', besoin: 'SEO local, click & collect' },
      { metier: 'Sous-traitants industriels', besoin: 'site vitrine technique, catalogue de capacités' },
      { metier: 'Restaurants & brasseries', besoin: 'menu en ligne, réservation sans commission' },
      { metier: 'Artisans du bâtiment', besoin: 'devis en ligne, avis Google, zones d’intervention' },
    ],
    communesPrincipales: ['Orléans', 'Olivet', 'Fleury-les-Aubrais', 'Saran', 'Montargis', 'Gien', 'Pithiviers'],
    communes: [
      'Orléans', 'Olivet', 'Fleury-les-Aubrais', 'Saran', 'Saint-Jean-de-Braye', 'Saint-Jean-de-la-Ruelle',
      'Saint-Denis-en-Val', 'La Chapelle-Saint-Mesmin', 'Ingré', 'Chécy', 'Montargis', 'Amilly', 'Châlette-sur-Loing',
      'Villemandeur', 'Gien', 'Sully-sur-Loire', 'Pithiviers', 'Malesherbes', 'Beaugency', 'Meung-sur-Loire',
      'Châteauneuf-sur-Loire', 'Jargeau', 'La Ferté-Saint-Aubin', 'Lamotte-Beuvron', 'Courtenay', 'Ferrières-en-Gâtinais',
      'Bellegarde', 'Neuville-aux-Bois', 'Artenay', 'Patay', 'Cléry-Saint-André', 'Saint-Ay', 'Chaingy', 'Ormes',
      'Boigny-sur-Bionne', 'Marigny-les-Usages', 'Traînou', 'Vitry-aux-Loges', 'Lorris', 'Châtillon-Coligny',
      'Briare', 'Châtillon-sur-Loire', 'Ouzouer-sur-Loire', 'Dampierre-en-Burly', 'Sermaises', 'Outarville',
    ],
    faq: [
      { q: 'Intervenez-vous à Orléans et dans tout le Loiret ?', a: 'Oui. La création de site se fait à distance (visio, téléphone, partage d’écran) avec la même qualité de suivi qu’en présentiel. Des déplacements à Orléans sont possibles pour les projets qui le justifient — Tours est à une heure de route.' },
      { q: 'Quels types d’entreprises du Loiret accompagnez-vous ?', a: 'Commerces et restaurants d’Orléans métropole, artisans du Montargois et du Giennois, prestataires logistiques, professions libérales… Nos offres s’adaptent au besoin : site vitrine dès 449 €, e-commerce dès 1 647 €, gestion sur mesure dès 1 447 €.' },
      { q: 'Le tarif est-il le même qu’à Tours ?', a: 'Oui. Nos prix sont les mêmes partout en France : ils sont affichés publiquement sur notre page tarifs et n’augmentent pas selon votre localisation.' },
    ],
  },
  {
    slug: 'loir-et-cher',
    nom: 'Loir-et-Cher',
    code: '41',
    region: 'Centre-Val de Loire',
    chefLieu: 'Blois',
    intro:
      "Entre Tours et Orléans, le Loir-et-Cher est un territoire où le tourisme des châteaux côtoie un artisanat dense. Stackup Agency crée des sites internet pour les acteurs de Blois, Vendôme, Romorantin et de toutes les communes du département.",
    economie:
      "Le Loir-et-Cher vit fortement du tourisme — Chambord, Cheverny, Blois et le ZooParc de Beauval attirent des millions de visiteurs par an — et cette manne irrigue hôtels, gîtes, restaurants et sites de loisirs qui ont tous besoin d'une présence en ligne à la hauteur. À côté, Vendôme (reliée à Paris en 42 minutes de TGV) attire entreprises et indépendants, et la Sologne romorantinaise garde un tissu artisanal et industriel actif. Les besoins types : réservation en ligne sans commission pour l'hébergement, sites multilingues pour la clientèle touristique, visibilité Google locale pour les artisans entre Blois et Vendôme.",
    metiersPhares: [
      { metier: 'Gîtes & chambres d’hôtes', besoin: 'réservation directe sans commission Booking' },
      { metier: 'Restaurants touristiques', besoin: 'menu en ligne multilingue, réservation' },
      { metier: 'Sites de loisirs & activités', besoin: 'billetterie simple, visibilité saisonnière' },
      { metier: 'Artisans & PME de Sologne', besoin: 'site vitrine, devis en ligne' },
      { metier: 'Commerces de Blois & Vendôme', besoin: 'SEO local, click & collect' },
    ],
    communesPrincipales: ['Blois', 'Vendôme', 'Romorantin-Lanthenay', 'Vineuil', 'Mer', 'Salbris'],
    communes: [
      'Blois', 'Vendôme', 'Romorantin-Lanthenay', 'Vineuil', 'La Chaussée-Saint-Victor', 'Saint-Gervais-la-Forêt',
      'Mer', 'Salbris', 'Lamotte-Beuvron', 'Selles-sur-Cher', 'Contres', 'Montrichard', 'Saint-Aignan',
      'Cour-Cheverny', 'Cheverny', 'Chambord', 'Bracieux', 'Onzain', 'Herbault', 'Montoire-sur-le-Loir',
      'Savigny-sur-Braye', 'Droué', 'Mondoubleau', 'Morée', 'Oucques', 'Marchenoir', 'Ouzouer-le-Marché',
      'Saint-Laurent-Nouan', 'Muides-sur-Loire', 'Suèvres', 'Candé-sur-Beuvron', 'Chailles', 'Cellettes',
      'Chitenay', 'Sambin', 'Pontlevoy', 'Noyers-sur-Cher', 'Châtillon-sur-Cher', 'Gièvres', 'Villefranche-sur-Cher',
      'Pruniers-en-Sologne', 'Neung-sur-Beuvron', 'Dhuizon', 'Fontaines-en-Sologne',
    ],
    faq: [
      { q: 'Créez-vous des sites multilingues pour la clientèle touristique ?', a: 'Oui. Pour les hébergements et restaurants du Val de Loire, un site bilingue français/anglais est souvent un investissement rentable dès la première saison. L’option multilingue est chiffrée au devis selon le nombre de pages.' },
      { q: 'Un gîte peut-il éviter les commissions des plateformes ?', a: 'C’est l’un de nos cas d’usage favoris : un site avec réservation directe (calendrier, acompte en ligne, synchronisation iCal avec les plateformes) permet de convertir les voyageurs en réservation directe, sans les 15-25 % de commission.' },
      { q: 'Vous déplacez-vous à Blois ou Vendôme ?', a: 'Blois est à 40 minutes de Tours : des rendez-vous physiques sont possibles pour les projets du département. La majorité du suivi se fait ensuite à distance, ce qui maintient nos tarifs accessibles.' },
    ],
  },
  {
    slug: 'eure-et-loir',
    nom: 'Eure-et-Loir',
    code: '28',
    region: 'Centre-Val de Loire',
    chefLieu: 'Chartres',
    intro:
      "Aux portes de l'Île-de-France, l'Eure-et-Loir combine l'attractivité de Chartres, le bassin drouais et une grande couronne agricole et artisanale. Stackup Agency accompagne les entreprises du département avec des sites livrés en 10 jours ouvrés, à distance.",
    economie:
      "L'Eure-et-Loir bénéficie d'une situation privilégiée : Chartres est à une heure de Paris, la Cosmetic Valley y a son siège, et le département attire entreprises et actifs franciliens en quête de coûts plus doux. Le tissu est double : d'un côté des PME industrielles et cosmétiques structurées autour de Chartres et Dreux, de l'autre un maillage dense d'artisans, de commerces et de professions libérales dans les bourgs beaucerons et du Perche. Pour ces acteurs, la concurrence des prestataires parisiens est chère et distante — un partenaire web qui livre vite, à prix fixes et affichés, y trouve toute sa place.",
    metiersPhares: [
      { metier: 'Sous-traitants cosmétique & industrie', besoin: 'site B2B, catalogue de savoir-faire' },
      { metier: 'Artisans du bâtiment', besoin: 'devis en ligne, chantiers en photos' },
      { metier: 'Commerces de Chartres & Dreux', besoin: 'SEO local, click & collect' },
      { metier: 'Professions libérales', besoin: 'site vitrine, prise de rendez-vous' },
      { metier: 'Tourisme du Perche', besoin: 'gîtes, réservation directe' },
    ],
    communesPrincipales: ['Chartres', 'Dreux', 'Lucé', 'Châteaudun', 'Nogent-le-Rotrou', 'Vernouillet'],
    communes: [
      'Chartres', 'Dreux', 'Lucé', 'Châteaudun', 'Nogent-le-Rotrou', 'Vernouillet', 'Mainvilliers', 'Luisant',
      'Le Coudray', 'Champhol', 'Épernon', 'Maintenon', 'Nogent-le-Roi', 'Anet', 'Ézy-sur-Eure', 'Brezolles',
      'Senonches', 'La Loupe', 'Illiers-Combray', 'Brou', 'Bonneval', 'Cloyes-les-Trois-Rivières', 'Voves',
      'Auneau-Bleury-Saint-Symphorien', 'Gallardon', 'Hanches', 'Pierres', 'Saint-Piat', 'Jouy', 'Saint-Georges-sur-Eure',
      'Fontaine-la-Guyon', 'Courville-sur-Eure', 'Thiron-Gardais', 'Authon-du-Perche', 'Arrou', 'Orgères-en-Beauce',
      'Toury', 'Janville-en-Beauce', 'Sours', 'Berchères-les-Pierres',
    ],
    faq: [
      { q: 'Pourquoi choisir une agence de Tours plutôt qu’une agence parisienne ?', a: 'Pour la même qualité technique, nos tarifs sont deux à cinq fois inférieurs aux agences parisiennes — et ils sont affichés publiquement. Le suivi à distance (visio, téléphone) est le même qu’avec un prestataire francilien, sans les tarifs franciliens.' },
      { q: 'Accompagnez-vous les PME industrielles du département ?', a: 'Oui. Sites B2B, catalogues de capacités, formulaires de demandes techniques : nous construisons des sites crédibles pour les donneurs d’ordre, avec un SEO pensé pour les requêtes métier.' },
      { q: 'Quel est le délai pour un site vitrine en Eure-et-Loir ?', a: 'Le même que partout : à partir de 10 jours ouvrés après validation de la maquette, quel que soit votre emplacement dans le département.' },
    ],
  },
  {
    slug: 'cher',
    nom: 'Cher',
    code: '18',
    region: 'Centre-Val de Loire',
    chefLieu: 'Bourges',
    intro:
      "De Bourges à Vierzon et jusqu'aux vignobles de Sancerre, Stackup Agency crée des sites internet pour les entreprises du Cher : commerces, artisans, vignerons et industriels, avec des prix fixes et une livraison en 10 jours ouvrés.",
    economie:
      "Le Cher s'articule autour de Bourges — ville d'art et d'histoire, pôle militaro-industriel et future capitale européenne de la culture 2028 — et de bassins bien distincts : Vierzon l'industrielle, le Sancerrois viticole dont les vins s'exportent dans le monde entier, et une large campagne artisanale et agricole. Les vignerons de Sancerre, Menetou-Salon et Quincy ont des besoins concrets de vente directe et de réservation de dégustations ; les commerces berruyers préparent l'échéance 2028 ; et les artisans du département cherchent une visibilité locale que les annuaires payants ne leur donnent plus.",
    metiersPhares: [
      { metier: 'Vignerons du Sancerrois', besoin: 'vente directe, réservation de dégustations, export' },
      { metier: 'Commerces de Bourges', besoin: 'SEO local, visibilité avant 2028' },
      { metier: 'Artisans & PME de Vierzon', besoin: 'site vitrine, devis en ligne' },
      { metier: 'Tourisme & hébergement', besoin: 'réservation directe sans commission' },
      { metier: 'Professions libérales', besoin: 'site rassurant, prise de rendez-vous' },
    ],
    communesPrincipales: ['Bourges', 'Vierzon', 'Saint-Amand-Montrond', 'Aubigny-sur-Nère', 'Sancerre', 'Mehun-sur-Yèvre'],
    communes: [
      'Bourges', 'Vierzon', 'Saint-Amand-Montrond', 'Aubigny-sur-Nère', 'Mehun-sur-Yèvre', 'Saint-Doulchard',
      'Trouy', 'Saint-Germain-du-Puy', 'La Chapelle-Saint-Ursin', 'Marmagne', 'Sancerre', 'Saint-Satur',
      'Menetou-Salon', 'Quincy', 'Châteauneuf-sur-Cher', 'Dun-sur-Auron', 'Avord', 'Baugy', 'Les Aix-d’Angillon',
      'Henrichemont', 'La Guerche-sur-l’Aubois', 'Sancoins', 'Nérondes', 'Lignières', 'Le Châtelet',
      'Châteaumeillant', 'Culan', 'Saulzais-le-Potier', 'Orval', 'Saint-Florent-sur-Cher', 'Lunery', 'Chârost',
      'Graçay', 'Massay', 'Foëcy', 'Vignoux-sur-Barangeon', 'Argent-sur-Sauldre', 'Blancafort', 'Léré', 'Belleville-sur-Loire',
    ],
    faq: [
      { q: 'Créez-vous des sites de vente en ligne pour les vignerons ?', a: 'Oui. Vente directe de vin en ligne (avec les mentions légales alcool obligatoires), réservation de dégustations, expédition France et export : notre offre e-commerce à partir de 1 647 € couvre ces besoins, avec un devis précis selon votre gamme.' },
      { q: 'Travaillez-vous à distance avec les entreprises du Cher ?', a: 'Oui, intégralement : visio, téléphone, partage d’écran. C’est ce qui nous permet de servir Bourges, Vierzon ou Sancerre aux mêmes tarifs affichés que partout en France.' },
      { q: 'Combien coûte un site vitrine à Bourges ?', a: 'À partir de 449 €, tout inclus (design sur mesure, SEO de base, hébergement 12 mois, nom de domaine offert la première année). Devis gratuit sous 72 h.' },
    ],
  },
  {
    slug: 'indre',
    nom: 'Indre',
    code: '36',
    region: 'Centre-Val de Loire',
    chefLieu: 'Châteauroux',
    intro:
      "Dans l'Indre, où les grandes agences ne se déplacent pas, Stackup Agency apporte le même niveau de site web qu'aux entreprises des métropoles : à distance, à prix fixes, livré en 10 jours ouvrés. De Châteauroux au Blanc, d'Issoudun à La Châtre.",
    economie:
      "L'Indre est un département rural et industrieux : Châteauroux garde une base aéroportuaire et logistique singulière (l'un des plus longs tarmacs d'Europe), Issoudun une tradition industrielle, et le Parc naturel de la Brenne — pays des mille étangs — nourrit un tourisme nature en croissance. C'est aussi l'un des départements les moins couverts par les prestataires web : les artisans, commerces et hébergements y font face à des offres rares, chères ou dépassées. Notre modèle 100 % à distance y prend tout son sens : mêmes tarifs, même qualité, même délai qu'en métropole.",
    metiersPhares: [
      { metier: 'Tourisme nature (Brenne)', besoin: 'gîtes, réservation directe, visibilité saisonnière' },
      { metier: 'Artisans du bâtiment', besoin: 'site vitrine, zone d’intervention claire' },
      { metier: 'Commerces de Châteauroux', besoin: 'SEO local, click & collect' },
      { metier: 'PME industrielles', besoin: 'site B2B crédible' },
      { metier: 'Professions de santé', besoin: 'site conforme, prise de rendez-vous' },
    ],
    communesPrincipales: ['Châteauroux', 'Issoudun', 'Déols', 'Le Blanc', 'Argenton-sur-Creuse', 'La Châtre'],
    communes: [
      'Châteauroux', 'Issoudun', 'Déols', 'Le Blanc', 'Argenton-sur-Creuse', 'La Châtre', 'Buzançais',
      'Le Poinçonnet', 'Saint-Maur', 'Ardentes', 'Levroux', 'Valençay', 'Chabris', 'Écueillé',
      'Châtillon-sur-Indre', 'Mézières-en-Brenne', 'Tournon-Saint-Martin', 'Saint-Gaultier', 'Éguzon-Chantôme',
      'Aigurande', 'Sainte-Sévère-sur-Indre', 'Neuvy-Saint-Sépulchre', 'Cluis', 'Vatan', 'Reuilly',
      'Villedieu-sur-Indre', 'Niherne', 'Luant', 'Velles', 'Arthon', 'Clion', 'Palluau-sur-Indre',
      'Azay-le-Ferron', 'Martizay', 'Rosnay', 'Ruffec', 'Bélâbre', 'Saint-Benoît-du-Sault', 'Chaillac',
    ],
    faq: [
      { q: 'Pourquoi peu d’agences travaillent-elles dans l’Indre ?', a: 'Les agences traditionnelles fonctionnent au rendez-vous physique et concentrent leurs efforts sur les métropoles. Notre méthode 100 % à distance supprime cette barrière : les entreprises de Châteauroux, du Blanc ou de La Châtre ont accès aux mêmes prestations, aux mêmes prix affichés.' },
      { q: 'Comment se passe un projet à distance ?', a: 'Un appel de découverte, un devis sous 72 h, une maquette à valider, puis la livraison en 10 jours ouvrés. Tout se fait par visio, téléphone et email — vous validez chaque étape.' },
      { q: 'Un gîte en Brenne a-t-il vraiment besoin d’un site ?', a: 'Le Parc de la Brenne attire une clientèle nature qui prépare ses séjours en ligne. Un site avec réservation directe évite les commissions des plateformes et capte cette clientèle en direct — souvent rentabilisé en une saison.' },
    ],
  },
  {
    slug: 'sarthe',
    nom: 'Sarthe',
    code: '72',
    region: 'Pays de la Loire',
    chefLieu: 'Le Mans',
    intro:
      "Département limitrophe de l'Indre-et-Loire, la Sarthe et sa capitale Le Mans sont à moins d'une heure de Tours. Stackup Agency y accompagne commerces, artisans et PME avec des sites internet professionnels livrés en 10 jours ouvrés.",
    economie:
      "La Sarthe conjugue l'image mondiale des 24 Heures du Mans, un secteur automobile et industriel structuré, et un vaste tissu de PME, d'artisans et de commerces entre Le Mans, La Flèche et Sablé-sur-Sarthe. L'agroalimentaire (rillettes, volailles de Loué) y est un pilier avec de vrais enjeux de vente directe en ligne. À 55 minutes de Tours en voiture et sur l'axe TGV Paris-Le Mans, le département est dans notre zone naturelle d'intervention, à distance ou en rendez-vous ponctuel.",
    metiersPhares: [
      { metier: 'Producteurs & agroalimentaire', besoin: 'vente directe en ligne, click & collect' },
      { metier: 'Artisans & garages', besoin: 'devis en ligne, SEO local mancelle' },
      { metier: 'Commerces du Mans', besoin: 'visibilité Google, fiche établissement' },
      { metier: 'Hébergement & tourisme', besoin: 'réservation directe (24 Heures, vallée du Loir)' },
      { metier: 'PME industrielles', besoin: 'site B2B, recrutement' },
    ],
    communesPrincipales: ['Le Mans', 'La Flèche', 'Sablé-sur-Sarthe', 'Allonnes', 'Coulaines', 'Château-du-Loir'],
    communes: [
      'Le Mans', 'La Flèche', 'Sablé-sur-Sarthe', 'Allonnes', 'Coulaines', 'Arnage', 'Mulsanne', 'Changé',
      'Yvré-l’Évêque', 'La Chapelle-Saint-Aubin', 'Montval-sur-Loir', 'La Ferté-Bernard', 'Mamers', 'Bonnétable',
      'Connerré', 'Savigné-l’Évêque', 'Parigné-l’Évêque', 'Écommoy', 'Le Lude', 'Pontvallain', 'Mayet',
      'Loué', 'Brûlon', 'Sillé-le-Guillaume', 'Fresnay-sur-Sarthe', 'Beaumont-sur-Sarthe', 'Ballon-Saint Mars',
      'Conlie', 'Loue', 'Noyen-sur-Sarthe', 'Malicorne-sur-Sarthe', 'Parcé-sur-Sarthe', 'Précigné',
      'Bouloire', 'Vibraye', 'Tuffé-Val-de-la-Chéronne', 'Saint-Calais', 'Bessé-sur-Braye', 'Marolles-les-Braults',
    ],
    faq: [
      { q: 'Intervenez-vous au Mans depuis Tours ?', a: 'Oui : Le Mans est à moins d’une heure de Tours. La majorité des projets sarthois se mènent entièrement à distance, avec un rendez-vous physique possible au démarrage si le projet le justifie.' },
      { q: 'Accompagnez-vous les producteurs pour la vente en ligne ?', a: 'Oui. Vente directe de produits fermiers ou artisanaux, click & collect, expédition : notre offre e-commerce démarre à 1 647 € et se chiffre précisément au devis selon votre catalogue.' },
      { q: 'Quels sont vos délais pour la Sarthe ?', a: 'Les mêmes que partout : site vitrine à partir de 10 jours ouvrés après validation de la maquette, devis gratuit sous 72 h.' },
    ],
  },
  {
    slug: 'maine-et-loire',
    nom: 'Maine-et-Loire',
    code: '49',
    region: 'Pays de la Loire',
    chefLieu: 'Angers',
    intro:
      "Voisin direct de l'Indre-et-Loire, le Maine-et-Loire prolonge le Val de Loire jusqu'à Angers et Saumur. Stackup Agency y crée des sites internet pour vignerons, artisans, commerces et entreprises du végétal, à distance ou en rendez-vous.",
    economie:
      "Le Maine-et-Loire est le premier département horticole de France — le pôle du végétal d'Angers fait référence en Europe — et un grand département viticole avec Saumur-Champigny, le Layon et les caves troglodytiques. Angers, régulièrement classée parmi les villes les plus agréables de France, attire entreprises et indépendants ; Cholet garde une tradition textile et industrielle entreprenante. Vente directe pour les vignerons et producteurs, réservation pour les caves et hébergements troglodytes, SEO local pour les artisans angevins et choletais : les cas d'usage y sont nombreux et concrets.",
    metiersPhares: [
      { metier: 'Vignerons (Saumur, Layon)', besoin: 'vente directe, réservation de visites de caves' },
      { metier: 'Horticulture & végétal', besoin: 'catalogues en ligne, B2B' },
      { metier: 'Artisans d’Angers & Cholet', besoin: 'devis en ligne, SEO local' },
      { metier: 'Tourisme troglodytique', besoin: 'réservation directe' },
      { metier: 'Commerces angevins', besoin: 'click & collect, fiche Google' },
    ],
    communesPrincipales: ['Angers', 'Cholet', 'Saumur', 'Trélazé', 'Avrillé', 'Les Ponts-de-Cé'],
    communes: [
      'Angers', 'Cholet', 'Saumur', 'Trélazé', 'Avrillé', 'Les Ponts-de-Cé', 'Saint-Barthélemy-d’Anjou',
      'Beaucouzé', 'Montreuil-Juigné', 'Bouchemaine', 'Murs-Érigné', 'Beaupréau-en-Mauges', 'Sèvremoine',
      'Chemillé-en-Anjou', 'Doué-en-Anjou', 'Longué-Jumelles', 'Baugé-en-Anjou', 'Seiches-sur-le-Loir',
      'Durtal', 'Tiercé', 'Châteauneuf-sur-Sarthe', 'Le Lion-d’Angers', 'Candé', 'Segré-en-Anjou Bleu',
      'Pouancé', 'Chalonnes-sur-Loire', 'Montjean-sur-Loire', 'Saint-Georges-sur-Loire', 'Brissac Loire Aubance',
      'Gennes-Val-de-Loire', 'Fontevraud-l’Abbaye', 'Montsoreau', 'Varennes-sur-Loire', 'Allonnes',
      'Vernantes', 'Noyant-Villages', 'Beaufort-en-Anjou', 'Mazé-Milon', 'La Ménitré',
    ],
    faq: [
      { q: 'Travaillez-vous avec les vignerons du Saumurois ?', a: 'La vente directe de vin en ligne est l’un de nos cas d’usage phares : boutique conforme (mentions alcool), réservation de dégustations, expédition. Offre e-commerce à partir de 1 647 €, devis précis selon la gamme.' },
      { q: 'Angers est-elle dans votre zone d’intervention ?', a: 'Oui. Angers est à une heure de Tours ; le suivi se fait à distance comme pour tous nos clients, avec la même réactivité (réponse sous 72 h ouvrées, livraison en 10 jours ouvrés pour un site vitrine).' },
      { q: 'Quels tarifs pour une entreprise du Maine-et-Loire ?', a: 'Les mêmes que partout en France, affichés publiquement : site vitrine dès 449 €, multi-pages dès 749 €, e-commerce dès 1 647 €, gestion sur mesure dès 1 447 €.' },
    ],
  },
  {
    slug: 'vienne',
    nom: 'Vienne',
    code: '86',
    region: 'Nouvelle-Aquitaine',
    chefLieu: 'Poitiers',
    intro:
      "Au sud de la Touraine, la Vienne — Poitiers, Châtellerault, le Futuroscope — est un département voisin où Stackup Agency intervient à distance, avec les mêmes tarifs fixes et la même livraison en 10 jours ouvrés qu'ailleurs en France.",
    economie:
      "La Vienne s'appuie sur trois moteurs : Poitiers, ville universitaire au tertiaire dense (60 000 étudiants et un vivier de professions libérales et de services), le Futuroscope et sa technopole qui ancrent tourisme et entreprises numériques, et Châtellerault, pôle industriel historique reconverti dans l'aéronautique et la mécanique de précision. Autour, un large tissu rural d'artisans, de producteurs et d'hébergements touristiques (vallée de la Vienne, abbaye de Saint-Savin) cherche une visibilité en ligne que les annuaires ne fournissent plus.",
    metiersPhares: [
      { metier: 'Professions libérales de Poitiers', besoin: 'site vitrine, prise de rendez-vous' },
      { metier: 'PME industrielles de Châtellerault', besoin: 'site B2B, recrutement' },
      { metier: 'Hébergements touristiques', besoin: 'réservation directe sans commission' },
      { metier: 'Artisans', besoin: 'devis en ligne, SEO local' },
      { metier: 'Commerces poitevins', besoin: 'click & collect, fiche Google' },
    ],
    communesPrincipales: ['Poitiers', 'Châtellerault', 'Buxerolles', 'Chasseneuil-du-Poitou', 'Loudun', 'Montmorillon'],
    communes: [
      'Poitiers', 'Châtellerault', 'Buxerolles', 'Chasseneuil-du-Poitou', 'Jaunay-Marigny', 'Saint-Benoît',
      'Migné-Auxances', 'Fontaine-le-Comte', 'Vouneuil-sous-Biard', 'Ligugé', 'Loudun', 'Montmorillon',
      'Chauvigny', 'Lusignan', 'Vivonne', 'Gençay', 'Civray', 'Couhé-Vérac', 'Neuville-de-Poitou',
      'Mirebeau', 'Lencloître', 'Dangé-Saint-Romain', 'Naintré', 'Bonneuil-Matours', 'Vouillé',
      'Latillé', 'Rouillé', 'La Villedieu-du-Clain', 'Smarves', 'Iteuil', 'Béruges', 'Croutelle',
      'Saint-Julien-l’Ars', 'Jardres', 'La Puye', 'Saint-Savin', 'L’Isle-Jourdain', 'Availles-Limouzine',
    ],
    faq: [
      { q: 'Intervenez-vous à Poitiers depuis Tours ?', a: 'Oui : Poitiers est à une heure de Tours. Les projets de la Vienne se mènent à distance (visio, téléphone) avec la même qualité de suivi, aux mêmes tarifs affichés.' },
      { q: 'Accompagnez-vous les professions libérales ?', a: 'C’est l’une de nos spécialités : avocats, thérapeutes, experts-comptables… Un site sobre et rassurant, conforme aux règles de communication de votre profession, avec prise de rendez-vous en option.' },
      { q: 'Quel budget prévoir pour un site dans la Vienne ?', a: 'Site vitrine à partir de 449 €, tout inclus la première année (hébergement, nom de domaine). Devis gratuit sous 72 h, prix identiques partout en France.' },
    ],
  },
  {
    slug: 'deux-sevres',
    nom: 'Deux-Sèvres',
    code: '79',
    region: 'Nouvelle-Aquitaine',
    chefLieu: 'Niort',
    intro:
      "Département des mutuelles et du Marais poitevin, les Deux-Sèvres accueillent un tissu économique singulier que Stackup Agency sert à distance : commerces niortais, artisans bressuirais, hébergements du Marais et professions libérales.",
    economie:
      "Niort est la quatrième place financière de France grâce aux mutuelles d'assurance (MAIF, MACIF, MAAF) qui y ont leur siège — un écosystème qui irrigue tout le tertiaire local en prestataires et professions libérales. Au nord, le bocage bressuirais garde une vraie densité industrielle et artisanale ; à l'ouest, le Marais poitevin attire un tourisme vert en croissance constante. Entre ces pôles, des dizaines de bourgs commerçants où un site internet bien référencé fait la différence entre une activité qui vivote et une activité qui recrute des clients.",
    metiersPhares: [
      { metier: 'Prestataires du tertiaire niortais', besoin: 'site B2B crédible, recrutement' },
      { metier: 'Artisans du bocage', besoin: 'site vitrine, devis en ligne' },
      { metier: 'Tourisme du Marais poitevin', besoin: 'réservation directe, visibilité saisonnière' },
      { metier: 'Commerces de Niort & Bressuire', besoin: 'SEO local, click & collect' },
      { metier: 'Producteurs locaux', besoin: 'vente directe en ligne' },
    ],
    communesPrincipales: ['Niort', 'Bressuire', 'Parthenay', 'Thouars', 'Melle', 'Saint-Maixent-l’École'],
    communes: [
      'Niort', 'Bressuire', 'Parthenay', 'Thouars', 'Melle', 'Saint-Maixent-l’École', 'Chauray', 'Aiffres',
      'Bessines', 'Magné', 'Coulon', 'Frontenay-Rohan-Rohan', 'Mauléon', 'Cerizay', 'Nueil-les-Aubiers',
      'Moncoutant-sur-Sèvre', 'Secondigny', 'Champdeniers', 'Coulonges-sur-l’Autize', 'Mauzé-sur-le-Mignon',
      'Prahecq', 'Celles-sur-Belle', 'Lezay', 'Sauzé-Vaussais', 'Chef-Boutonne', 'Brioux-sur-Boutonne',
      'La Crèche', 'Échiré', 'Vouillé', 'Airvault', 'Saint-Varent', 'Argentonnay', 'Val en Vignes',
      'Loretz-d’Argenton', 'Plaine-et-Vallées', 'Mougon-Thorigné', 'Aigondigné',
    ],
    faq: [
      { q: 'Travaillez-vous avec les acteurs du tourisme du Marais poitevin ?', a: 'Oui : embarcadères, gîtes, chambres d’hôtes, loueurs de vélos… Un site avec réservation directe capte la clientèle qui prépare sa venue en ligne, sans commission de plateforme.' },
      { q: 'À quelle distance de Tours se trouvent les Deux-Sèvres ?', a: 'Niort est à environ 2 h de Tours : les projets se mènent intégralement à distance, comme pour la majorité de nos clients partout en France, avec la même réactivité.' },
      { q: 'Quels tarifs pour les Deux-Sèvres ?', a: 'Les mêmes qu’ailleurs, affichés publiquement : site vitrine dès 449 €, e-commerce dès 1 647 €, système de gestion dès 1 447 €. Devis gratuit sous 72 h.' },
    ],
  },
]

export function getDepartement(slug: string): Departement | undefined {
  return DEPARTEMENTS.find(d => d.slug === slug)
}
