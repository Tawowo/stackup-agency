/**
 * CONFORMITÉ COMMERCIALE (CLAUDE.md, règle 8) — appliquée à tout texte repris de
 * l'ancien site (articles, données) avant affichage : aucune durée de livraison
 * de l'agence, aucun comparatif « × moins cher », aucune mention d'hébergement
 * en France ou en Europe comme argument de l'agence.
 */
const REGLES: [RegExp, string][] = [
  // Durées de livraison de l'agence.
  [/(un )?délai( de livraison)? de \d+\s*(?:à|-|–)\s*\d+\s*jours ouvrés(?: selon le type de site)?/gi, 'un calendrier fixé ensemble avant de commencer'],
  [/\(\d+\s*(?:à|-|–)\s*\d+\s*jours ouvrés(?: selon le type de site)?\)/gi, '(calendrier fixé ensemble)'],
  [/\d+\s*(?:à|-|–)\s*\d+\s*jours ouvrés(?: selon le type de site)?/gi, 'un calendrier fixé ensemble'],
  // Comparatifs chiffrés.
  [/coûte \d+\s*à\s*\d+ fois moins cher que/gi, 'coûte nettement moins que'],
  [/\d+\s*(?:à\s*\d+\s*)?fois moins cher/gi, 'moins cher'],
  // Hébergement comme argument de l'agence.
  [/Hébergement en Europe — RGPD natif/g, 'Conformité RGPD prise en compte dès la conception'],
  [/(?:,\s*)?et vos données restent en France/gi, ' et vos données vous appartiennent'],
  [/vos données restent en France/gi, 'vos données vous appartiennent'],
]

export function conforme(texte: string): string {
  let t = texte
  for (const [re, par] of REGLES) t = t.replace(re, par)
  return t
}

export function conformeListe(l: readonly string[]): string[] {
  return l.map(conforme)
}
