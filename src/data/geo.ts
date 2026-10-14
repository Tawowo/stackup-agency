/**
 * COORDONNÉES — latitude / longitude (degrés) des villes ayant une page et des
 * chefs-lieux des départements couverts. Servent uniquement à placer les
 * épingles de la carte en relief, à leurs vraies positions relatives.
 */
export const GEO: Record<string, { nom: string; lat: number; lon: number }> = {
  tours: { nom: 'Tours', lat: 47.394, lon: 0.684 },
  orleans: { nom: 'Orléans', lat: 47.903, lon: 1.909 },
  blois: { nom: 'Blois', lat: 47.586, lon: 1.335 },
  chartres: { nom: 'Chartres', lat: 48.447, lon: 1.489 },
  dreux: { nom: 'Dreux', lat: 48.737, lon: 1.366 },
  bourges: { nom: 'Bourges', lat: 47.081, lon: 2.399 },
  chateauroux: { nom: 'Châteauroux', lat: 46.811, lon: 1.694 },
  amboise: { nom: 'Amboise', lat: 47.413, lon: 0.985 },
  chinon: { nom: 'Chinon', lat: 47.167, lon: 0.241 },
  vendome: { nom: 'Vendôme', lat: 47.792, lon: 1.066 },
  chateaudun: { nom: 'Châteaudun', lat: 48.07, lon: 1.337 },
  loches: { nom: 'Loches', lat: 47.129, lon: 1.0 },
  'joue-les-tours': { nom: 'Joué-lès-Tours', lat: 47.353, lon: 0.668 },
  vierzon: { nom: 'Vierzon', lat: 47.222, lon: 2.069 },
  'le-mans': { nom: 'Le Mans', lat: 48.006, lon: 0.199 },
  angers: { nom: 'Angers', lat: 47.478, lon: -0.563 },
  nantes: { nom: 'Nantes', lat: 47.218, lon: -1.554 },
  saumur: { nom: 'Saumur', lat: 47.26, lon: -0.077 },
  laval: { nom: 'Laval', lat: 48.073, lon: -0.77 },
  caen: { nom: 'Caen', lat: 49.182, lon: -0.371 },
  rouen: { nom: 'Rouen', lat: 49.443, lon: 1.099 },
  evreux: { nom: 'Évreux', lat: 49.027, lon: 1.151 },
  alencon: { nom: 'Alençon', lat: 48.432, lon: 0.091 },
  lisieux: { nom: 'Lisieux', lat: 49.146, lon: 0.229 },
  rambouillet: { nom: 'Rambouillet', lat: 48.644, lon: 1.829 },
  anet: { nom: 'Anet', lat: 48.862, lon: 1.438 },
  vernouillet: { nom: 'Vernouillet', lat: 48.723, lon: 1.362 },
  'nogent-le-rotrou': { nom: 'Nogent-le-Rotrou', lat: 48.32, lon: 0.822 },
  // Chefs-lieux sans page ville (points de repère des départements).
  poitiers: { nom: 'Poitiers', lat: 46.58, lon: 0.34 },
  niort: { nom: 'Niort', lat: 46.324, lon: -0.459 },
  auxerre: { nom: 'Auxerre', lat: 47.798, lon: 3.573 },
  nevers: { nom: 'Nevers', lat: 46.99, lon: 3.159 },
  moulins: { nom: 'Moulins', lat: 46.566, lon: 3.334 },
  gueret: { nom: 'Guéret', lat: 46.17, lon: 1.871 },
}

/** Chef-lieu → clé GEO, par département. */
export const CHEF_LIEU: Record<string, string> = {
  'indre-et-loire': 'tours',
  loiret: 'orleans',
  'loir-et-cher': 'blois',
  'eure-et-loir': 'chartres',
  cher: 'bourges',
  indre: 'chateauroux',
  sarthe: 'le-mans',
  'maine-et-loire': 'angers',
  vienne: 'poitiers',
  'deux-sevres': 'niort',
  yonne: 'auxerre',
  nievre: 'nevers',
  allier: 'moulins',
  creuse: 'gueret',
  orne: 'alencon',
}
