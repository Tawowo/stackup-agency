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
  communes: string[] // texte indexable (échantillon court, utilisé en résumé)
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
  {
    slug: 'yonne',
    nom: 'Yonne',
    code: '89',
    region: 'Bourgogne-Franche-Comté',
    chefLieu: 'Auxerre',
    intro:
      "Aux confins nord du Loiret, l'Yonne prolonge notre zone d'intervention naturelle vers la Bourgogne. Stackup Agency y crée des sites internet pour les vignerons, artisans et commerces d'Auxerre, Sens et de tout le département, intégralement à distance.",
    economie:
      "L'Yonne vit d'une identité viticole mondialement connue — le vignoble de Chablis exporte ses blancs sur toute la planète, et Auxerre, Tonnerre et le Sénonais gravitent autour de cette économie de la vigne, du tourisme œnologique et de la vente directe. Sens, aux portes de l'Île-de-France, attire une économie logistique et tertiaire portée par l'A6 ; le sud du département, plus rural, vit d'agriculture et d'un artisanat dense entre Avallon et le Morvan. Les besoins sont concrets : les domaines viticoles ont besoin de vente en ligne et de réservation de dégustations, les commerces d'Auxerre et Sens d'un SEO local solide, et les artisans des bourgs d'une visibilité que les annuaires payants ne fournissent plus.",
    metiersPhares: [
      { metier: 'Vignerons de Chablis & du Tonnerrois', besoin: 'vente directe en ligne, réservation de dégustations, export' },
      { metier: 'Commerces d’Auxerre & Sens', besoin: 'SEO local, click & collect' },
      { metier: 'Artisans du bâtiment', besoin: 'devis en ligne, chantiers en photos' },
      { metier: 'Hébergement & tourisme (Morvan, vallée de l’Yonne)', besoin: 'réservation directe sans commission' },
      { metier: 'PME logistiques (axe A6)', besoin: 'site B2B crédible' },
    ],
    communesPrincipales: ['Auxerre', 'Sens', 'Joigny', 'Migennes', 'Avallon', 'Villeneuve-sur-Yonne', 'Tonnerre'],
    communes: [
      'Auxerre', 'Monéteau', 'Saint-Georges-sur-Baulche', 'Sens', 'Villeneuve-sur-Yonne', 'Paron', 'Charny Orée de Puisaye',
      'Toucy', 'Saint-Fargeau', 'Villeneuve-la-Guyard', 'Pont-sur-Yonne', 'Saint-Florentin', 'Brienon-sur-Armançon',
      'Joigny', 'Saint-Julien-du-Sault', 'Avallon', 'Chéroy', 'Tonnerre', 'Flogny-la-Chapelle', 'Tanlay', 'Chablis',
      'Vermenton', 'Migennes', 'Coulanges-sur-Yonne', 'Fleury-la-Vallée', 'Villeneuve-l’Archevêque', 'Cerisiers',
      'Joux-la-Ville', 'Noyers', 'Ligny-le-Châtel', 'Cruzy-le-Châtel', 'Ancy-le-Franc', 'Chéu', 'Champs-sur-Yonne',
      'Escamps', 'Courson-les-Carrières', 'Chemilly-sur-Yonne', 'Seignelay',
    ],
    faq: [
      { q: 'Créez-vous des sites pour les vignerons de Chablis ?', a: 'Oui. Vente directe en ligne, présentation des cuvées, réservation de dégustations et export : notre offre e-commerce à partir de 1 647 € couvre ces besoins, avec les mentions légales alcool intégrées.' },
      { q: 'L’Yonne est-elle dans votre zone d’intervention habituelle ?', a: 'L’Yonne prolonge notre zone d’intervention Centre-Val de Loire vers le nord-est. Les projets se mènent intégralement à distance (visio, téléphone, partage d’écran), aux mêmes tarifs affichés partout en France.' },
      { q: 'Quels tarifs pour une entreprise de l’Yonne ?', a: 'Les mêmes que partout : site vitrine dès 449 €, e-commerce dès 1 647 €, système de gestion dès 1 447 €. Devis gratuit sous 72 h, livraison en 10 jours ouvrés pour un site vitrine.' },
    ],
  },
  {
    slug: 'nievre',
    nom: 'Nièvre',
    code: '58',
    region: 'Bourgogne-Franche-Comté',
    chefLieu: 'Nevers',
    intro:
      "Voisine du Cher au-delà de la Loire, la Nièvre est un département rural et attachant où Stackup Agency accompagne commerces, artisans et acteurs du tourisme vert, à distance, aux mêmes tarifs fixes que partout en France.",
    economie:
      "La Nièvre s'organise autour de Nevers — connue pour sa faïence traditionnelle et son tertiaire administratif — et d'un vaste arrière-pays rural où le Morvan (parc naturel régional) porte un tourisme vert en croissance : randonnée, la Loire à vélo, lacs et forêts. Le circuit de Magny-Cours, ancien haut lieu de la Formule 1 devenu pôle d'essais automobiles, ancre une activité économique singulière. Le reste du département vit d'élevage bovin charolais, d'un artisanat dense et de commerces qui, loin des métropoles, ont un besoin criant de visibilité en ligne : les gîtes du Morvan ont besoin de réservation directe, les artisans de Nevers, Cosne et Clamecy de devis en ligne, et les petits commerces d'une fiche Google bien tenue.",
    metiersPhares: [
      { metier: 'Hébergement & tourisme du Morvan', besoin: 'réservation directe, visibilité saisonnière' },
      { metier: 'Artisans du bâtiment', besoin: 'devis en ligne, SEO local' },
      { metier: 'Commerces de Nevers & Cosne', besoin: 'fiche Google, click & collect' },
      { metier: 'Élevage & producteurs charolais', besoin: 'vente directe en ligne' },
      { metier: 'Professions libérales', besoin: 'site vitrine, prise de rendez-vous' },
    ],
    communesPrincipales: ['Nevers', 'Cosne-Cours-sur-Loire', 'Varennes-Vauzelles', 'Decize', 'La Charité-sur-Loire', 'Clamecy', 'Château-Chinon (Ville)'],
    communes: [
      'Nevers', 'Varennes-Vauzelles', 'Fourchambault', 'Guérigny', 'Cosne-Cours-sur-Loire', 'Pouilly-sur-Loire', 'Donzy',
      'Decize', 'La Machine', 'Imphy', 'La Charité-sur-Loire', 'Prémery', 'Luzy', 'Cercy-la-Tour', 'Moulins-Engilbert',
      'Château-Chinon (Ville)', 'Lormes', 'Clamecy', 'Varzy', 'Corbigny', 'Tannay', 'Saint-Benin-d’Azy', 'Saint-Saulge',
      'Saint-Pierre-le-Moûtier', 'Magny-Cours', 'Saint-Amand-en-Puisaye', 'Entrains-sur-Nohain', 'Dornes',
      'Saint-Parize-en-Viry', 'Rouy', 'Chantenay-Saint-Imbert', 'Saint-Parize-le-Châtel', 'Arleuf', 'Cervon', 'Nolay',
    ],
    faq: [
      { q: 'Travaillez-vous avec les gîtes du Morvan ?', a: 'Oui : un site avec réservation directe (calendrier, acompte en ligne) permet aux hébergements du Morvan de capter les randonneurs et cyclistes de la Loire à vélo sans commission de plateforme.' },
      { q: 'Intervenez-vous dans toute la Nièvre à distance ?', a: 'Oui, intégralement à distance : visio, téléphone, partage d’écran. C’est le même modèle qui nous permet de servir Nevers, Cosne ou Clamecy aux tarifs affichés publiquement.' },
      { q: 'Combien coûte un site vitrine dans la Nièvre ?', a: 'À partir de 449 €, tout inclus (design sur mesure, SEO de base, hébergement 12 mois, nom de domaine offert la première année). Devis gratuit sous 72 h.' },
    ],
  },
  {
    slug: 'allier',
    nom: 'Allier',
    code: '03',
    region: 'Auvergne-Rhône-Alpes',
    chefLieu: 'Moulins',
    intro:
      "Département thermal et industriel entre Bourbonnais et Auvergne, l'Allier accueille Vichy, Montluçon et Moulins. Stackup Agency y crée des sites internet pour les entreprises du département, à distance et aux mêmes tarifs fixes que partout en France.",
    economie:
      "L'Allier repose sur trois pôles bien distincts : Vichy, ville thermale de renommée internationale dont l'économie tourne autour du bien-être, de l'eau minérale et d'une clientèle touristique fidèle ; Montluçon, ancien bastion industriel en reconversion ; et Moulins, préfecture administrative et commerçante au cœur du Bourbonnais agricole. Entre ces pôles, un tissu rural d'éleveurs (bœuf charolais), d'artisans et de petits commerces cherche une présence en ligne solide. Les instituts et acteurs du bien-être vichyssois ont besoin de prise de rendez-vous en ligne, les commerces des centres-villes de visibilité Google, et les artisans du bocage bourbonnais de devis qualifiés.",
    metiersPhares: [
      { metier: 'Thermalisme & bien-être (Vichy)', besoin: 'prise de rendez-vous en ligne, réservation de soins' },
      { metier: 'Artisans du bâtiment', besoin: 'devis en ligne, SEO local' },
      { metier: 'Commerces de Moulins & Montluçon', besoin: 'fiche Google, click & collect' },
      { metier: 'Élevage & producteurs charolais', besoin: 'vente directe en ligne' },
      { metier: 'Professions libérales', besoin: 'site rassurant, prise de rendez-vous' },
    ],
    communesPrincipales: ['Montluçon', 'Vichy', 'Moulins', 'Cusset', 'Yzeure', 'Gannat', 'Saint-Pourçain-sur-Sioule'],
    communes: [
      'Vichy', 'Cusset', 'Bellerive-sur-Allier', 'Moulins', 'Yzeure', 'Avermes', 'Montluçon', 'Domérat', 'Désertines',
      'Gannat', 'Saint-Pourçain-sur-Sioule', 'Ébreuil', 'Commentry', 'Néris-les-Bains', 'Cosne-d’Allier',
      'Varennes-sur-Allier', 'Dompierre-sur-Besbre', 'Beaulon', 'Bourbon-l’Archambault', 'Saint-Menoux',
      'Buxières-les-Mines', 'Lapalisse', 'Isserpent', 'Cérilly', 'Ainay-le-Château', 'Huriel', 'Vallon-en-Sully',
      'Estivareilles', 'Le Donjon', 'Jaligny-sur-Besbre', 'Chevagnes', 'Souvigny', 'Toulon-sur-Allier', 'Villeneuve-sur-Allier',
      'Tronget',
    ],
    faq: [
      { q: 'Créez-vous des sites pour les instituts et thermes de Vichy ?', a: 'Oui : prise de rendez-vous en ligne, présentation des soins, avis clients mis en avant. Un site vitrine à partir de 449 € ou un système de réservation sur mesure selon vos besoins.' },
      { q: 'Intervenez-vous dans tout l’Allier à distance ?', a: 'Oui, intégralement à distance : visio, téléphone, partage d’écran. Même qualité de suivi et mêmes tarifs affichés qu’ailleurs en France, pour Vichy, Montluçon ou Moulins.' },
      { q: 'Quel budget pour un site internet dans l’Allier ?', a: 'Site vitrine à partir de 449 €, multi-pages à partir de 749 €, e-commerce à partir de 1 647 €. Devis gratuit sous 72 h, livraison en 10 jours ouvrés pour un site vitrine.' },
    ],
  },
  {
    slug: 'creuse',
    nom: 'Creuse',
    code: '23',
    region: 'Nouvelle-Aquitaine',
    chefLieu: 'Guéret',
    intro:
      "La Creuse est l'un des départements les moins couverts par les agences web traditionnelles — c'est précisément là que notre modèle 100 % à distance prend tout son sens. Stackup Agency y crée des sites pour artisans, commerces et hébergements, aux mêmes tarifs et délais qu'en métropole.",
    economie:
      "La Creuse est le département le moins densément peuplé de France métropolitaine, mais son économie a une identité forte : la tapisserie d'Aubusson, classée au patrimoine culturel immatériel de l'UNESCO, fait rayonner l'artisanat d'art à l'international ; les maçons creusois ont historiquement essaimé leur savoir-faire dans toute la France ; et l'élevage bovin limousin structure l'agriculture. Le tourisme vert (lacs, monts de Guéret, Bénévent-l'Abbaye) se développe pour une clientèle en quête de calme. Face à une offre de prestataires web rare et souvent distante, les artisans, commerces et hébergements de la Creuse ont un besoin direct d'un partenaire fiable qui travaille à distance, sans surcoût lié à l'éloignement.",
    metiersPhares: [
      { metier: 'Artisanat d’art (tapisserie d’Aubusson)', besoin: 'portfolio en ligne, vente d’œuvres' },
      { metier: 'Artisans du bâtiment (maçons, couvreurs)', besoin: 'devis en ligne, zone d’intervention claire' },
      { metier: 'Hébergement & tourisme vert', besoin: 'réservation directe sans commission' },
      { metier: 'Élevage & producteurs limousins', besoin: 'vente directe en ligne' },
      { metier: 'Commerces de Guéret', besoin: 'fiche Google, SEO local' },
    ],
    communesPrincipales: ['Guéret', 'La Souterraine', 'Aubusson', 'Bourganeuf', 'Boussac', 'Auzances', 'Felletin'],
    communes: [
      'Guéret', 'Sainte-Feyre', 'Saint-Sulpice-le-Guérétois', 'Saint-Vaury', 'La Souterraine', 'Saint-Maurice-la-Souterraine',
      'Dun-le-Palestel', 'Le Grand-Bourg', 'Bénévent-l’Abbaye', 'Bonnat', 'Aubusson', 'Felletin', 'Vallière', 'Gouzon',
      'Évaux-les-Bains', 'Boussac', 'Ahun', 'Auzances', 'Chénérailles', 'Bourganeuf', 'Royère-de-Vassivière',
      'Pontarion', 'Jarnages', 'Genouillac', 'Chambon-sur-Voueize', 'Bosmoreau-les-Mines', 'Chatelus-Malvaleix',
      'Crocq', 'Bellegarde-en-Marche', 'Peyrat-la-Nonière', 'Anzême', 'Sardent',
    ],
    faq: [
      { q: 'Pourquoi si peu d’agences travaillent-elles en Creuse ?', a: 'La faible densité et l’éloignement des métropoles découragent les agences traditionnelles, organisées autour du rendez-vous physique. Notre méthode 100 % à distance supprime cette barrière : mêmes tarifs, même délai, même qualité qu’ailleurs en France.' },
      { q: 'Créez-vous des sites pour les artisans d’art (tapisserie) ?', a: 'Oui : portfolio soigné, présentation des créations, vente en ligne si besoin. Un site vitrine dès 449 € ou une boutique en ligne dès 1 647 € selon votre activité.' },
      { q: 'Quel délai pour un site en Creuse ?', a: 'Le même que partout : à partir de 10 jours ouvrés après validation de la maquette, devis gratuit sous 72 h, suivi intégral à distance.' },
    ],
  },
  {
    slug: 'orne',
    nom: 'Orne',
    code: '61',
    region: 'Normandie',
    chefLieu: 'Alençon',
    intro:
      "L'Orne, entre Perche et Normandie bocagère, prolonge notre zone d'intervention vers le nord-ouest. Stackup Agency y crée des sites internet pour artisans, commerces et hébergements d'Alençon, Flers, Argentan et de tout le département, à distance.",
    economie:
      "L'Orne conjugue un savoir-faire artisanal d'exception — la dentelle d'Alençon, classée à l'UNESCO — et une économie rurale structurée par l'élevage (le haras du Pin, berceau du cheval de sport français) et l'agroalimentaire, notamment autour du camembert. Alençon, Flers et Argentan forment trois pôles économiques modestes mais actifs, entourés d'un parc naturel régional (Normandie-Maine) qui porte un tourisme vert croissant. Pour les entreprises du département, souvent loin des agences web de Caen ou Rouen, un partenaire à distance et à prix fixes répond à un besoin réel : les artisans ont besoin de devis en ligne, les hébergements du Perche de réservation directe, et les commerces des centres-villes d'un SEO local efficace.",
    metiersPhares: [
      { metier: 'Artisanat d’art & dentelle', besoin: 'portfolio en ligne, vente de créations' },
      { metier: 'Artisans du bâtiment', besoin: 'devis en ligne, SEO local' },
      { metier: 'Hébergement & tourisme (Perche, Normandie-Maine)', besoin: 'réservation directe sans commission' },
      { metier: 'Élevage & filière équine', besoin: 'site vitrine, catalogue' },
      { metier: 'Commerces d’Alençon, Flers, Argentan', besoin: 'fiche Google, click & collect' },
    ],
    communesPrincipales: ['Alençon', 'Flers', 'Argentan', 'L’Aigle', 'La Ferté Macé', 'Mortagne-au-Perche', 'Sées'],
    communes: [
      'Alençon', 'Saint-Germain-du-Corbéis', 'Condé-sur-Sarthe', 'Flers', 'La Ferté Macé', 'Athis-Val de Rouvre',
      'Argentan', 'Gouffern en Auge', 'Écouché-les-Vallées', 'L’Aigle', 'La Ferté-en-Ouche', 'Tinchebray-Bocage',
      'Domfront en Poiraie', 'Vimoutiers', 'Gacé', 'Mortagne-au-Perche', 'Bagnoles de l’Orne Normandie',
      'Rives d’Andaine', 'Sées', 'Mortrée', 'Chailloué', 'Ceton', 'Belforêt-en-Perche', 'Perche en Nocé',
      'Rémalard en Perche', 'Tourouvre au Perche', 'Longny les Villages', 'Courtomer', 'Le Mêle-sur-Sarthe',
      'Putanges-le-Lac', 'Juvigny Val d’Andaine', 'Trun', 'Vimoutiers',
    ],
    faq: [
      { q: 'Créez-vous des sites pour les artisans d’art de l’Orne ?', a: 'Oui : dentelliers, créateurs et artisans d’art bénéficient d’un site portfolio soigné pour présenter leur savoir-faire et vendre en ligne si besoin, à partir de 449 € en vitrine ou 1 647 € en boutique.' },
      { q: 'Intervenez-vous à Alençon et dans tout le département ?', a: 'Oui, intégralement à distance (visio, téléphone, partage d’écran), aux mêmes tarifs affichés partout en France, pour Alençon, Flers, Argentan ou les communes du Perche.' },
      { q: 'Quel budget pour un site internet dans l’Orne ?', a: 'Site vitrine à partir de 449 €, multi-pages à partir de 749 €, e-commerce à partir de 1 647 €. Devis gratuit sous 72 h, livraison en 10 jours ouvrés pour un site vitrine.' },
    ],
  },
]

export function getDepartement(slug: string): Departement | undefined {
  return DEPARTEMENTS.find(d => d.slug === slug)
}

// Articles grammaticaux (« dans l'Yonne », « du Loiret »…) — trop irrégulier pour être déduit de la première lettre.
const ARTICLES: Record<string, { dans: string; de: string }> = {
  'indre-et-loire': { dans: "l'", de: "de l'" },
  'loiret': { dans: 'le ', de: 'du ' },
  'loir-et-cher': { dans: 'le ', de: 'du ' },
  'eure-et-loir': { dans: "l'", de: "de l'" },
  'cher': { dans: 'le ', de: 'du ' },
  'indre': { dans: "l'", de: "de l'" },
  'sarthe': { dans: 'la ', de: 'de la ' },
  'maine-et-loire': { dans: 'le ', de: 'du ' },
  'vienne': { dans: 'la ', de: 'de la ' },
  'deux-sevres': { dans: 'les ', de: 'des ' },
  'yonne': { dans: "l'", de: "de l'" },
  'nievre': { dans: 'la ', de: 'de la ' },
  'allier': { dans: "l'", de: "de l'" },
  'creuse': { dans: 'la ', de: 'de la ' },
  'orne': { dans: "l'", de: "de l'" },
}

export function getArticles(slug: string): { dans: string; de: string } {
  return ARTICLES[slug] || { dans: 'le ', de: 'du ' }
}
