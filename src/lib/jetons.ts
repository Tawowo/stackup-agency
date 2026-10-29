/**
 * JETONS DE PRIX — les textes éditoriaux (articles, données de pages) ne contiennent jamais de montant :
 * ils portent des jetons `{{prix:une-page}}`, remplacés ici par le résultat du moteur de devis (donc par
 * l'Excel, via `prix-publics.generated.ts`). Un seul endroit pour que tous les « à partir de » suivent la grille.
 */
import { PRIX_PUBLICS as P } from '../config/prix-publics.generated.ts'

const fr = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 })
const nombre = (n: number) => fr.format(n).replace(/[\u202f\u00a0]/g, '\u00a0')
/** Nombre à la française (1 780) pour les textes construits à la main. */
export const nombreFr = nombre

const VALEURS: Record<string, number> = {
  'prix:une-page': P.offres['une-page'],
  'prix:multi-pages': P.offres['multi-pages'],
  'prix:boutique': P.offres.boutique,
  'prix:outil': P.offres.outil,
  /** Abonnement d'un site d'une page : le plus petit « à partir de » mensuel. */
  'abo:min': P.abonnementMin,
  'abo:suivi-local': P.suiviLocal,
  'abo:publication': P.publication,
  'abo:article': P.article,
  'abo:rapport': P.rapport,
  'abo:heure': P.heureMois,
  'tarif:heure': P.tarifHoraire,
  'carte:demo': P.demo,
  'carte:visio': P.visio,
}

export function jetons(texte: string): string {
  if (!texte.includes('{{')) return texte
  return texte.replace(/\{\{([a-z:-]+)\}\}/g, (m, k: string) => (k in VALEURS ? nombre(VALEURS[k]!) : m))
}

/** Applique `jetons` à toutes les chaînes d'une structure de données (récursif). */
export function jetonsProfond<T>(x: T): T {
  if (typeof x === 'string') return jetons(x) as T
  if (Array.isArray(x)) return x.map((v) => jetonsProfond(v)) as T
  if (x && typeof x === 'object') return Object.fromEntries(Object.entries(x as Record<string, unknown>).map(([k, v]) => [k, jetonsProfond(v)])) as T
  return x
}
