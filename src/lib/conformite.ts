/**
 * CONFORMITÉ COMMERCIALE (CLAUDE.md, règle 8) — appliquée à tout texte repris de
 * l'ancien site (articles, données) avant affichage : aucune durée de livraison
 * de l'agence, aucun comparatif « × moins cher », aucune mention d'hébergement
 * en France ou en Europe comme argument de l'agence.
 */
import { jetons } from './jetons'

const REGLES: [RegExp, string][] = [
  // Plus d'offre « site association » (règle 8) : l'offre d'entrée est le site une page.
  [/(offre|formule) site association/gi, '$1 Site une page'],
  // Durées de livraison de l'agence : la proposition disparaît, le calendrier se fixe au devis.
  [/(?:,|\s+et)?\s*(?:pour une livraison|une livraison|la même livraison|livraison|livrée?s?|livrés?) en \d+\s*(?:(?:à|-|–)\s*\d+\s*)?(?:jours ouvrés|jours|semaines)/gi, ''],
  [/nous livrons en \d+\s*jours ouvrés/gi, 'le calendrier est fixé ensemble au devis,'],
  [/(devis gratuit|réponse garantie|réponse) sous \d+\s?h(?:eures)?(?: ouvrées)?/gi, (_: string, a: string) => (/devis/i.test(a) ? 'Devis gratuit' : 'réponse personnelle')] as unknown as [RegExp, string],
  [/(un )?délai( de livraison)? de \d+\s*(?:à|-|–)\s*\d+\s*jours ouvrés(?: selon le type de site)?/gi, 'un calendrier fixé ensemble avant de commencer'],
  [/\(\d+\s*(?:à|-|–)\s*\d+\s*jours ouvrés(?: selon le type de site)?\)/gi, '(calendrier fixé ensemble)'],
  [/\d+\s*(?:à|-|–)\s*\d+\s*jours ouvrés(?: selon le type de site)?/gi, 'un calendrier fixé ensemble'],
  [/(?:à partir de )?\d+\s*jours ouvrés/gi, 'un calendrier fixé ensemble'],
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
  return jetons(t)
}

export function conformeListe(l: readonly string[]): string[] {
  return l.map(conforme)
}
