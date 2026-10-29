/**
 * JETONS DE PRIX — les textes éditoriaux (articles, données de pages) ne contiennent jamais de montant :
 * ils portent des jetons `{{prix:une-page}}`, remplacés ici par le résultat du moteur de devis (donc par
 * l'Excel, via `prix-publics.generated.ts`). Un seul endroit pour que tous les « à partir de » suivent la grille.
 */
import { PRIX_PUBLICS as P } from '../config/prix-publics.generated.ts'
import { PRODUCT_NAME } from '../config/offre-clubs.ts'
import { CATEGORIES, OPTIONS, PRICING, coutParLicencieAn, tarif } from '../data/offre-clubs/pricing.ts'

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

/**
 * Offre « clubs de tennis » (src/data/offre-clubs/pricing.ts) : `{{club:pack:moyen:mois}}`, `{{club:site:mini:mise}}`,
 * `{{club:option:assistant-ia:mise}}`, `{{club:heures:pack:moyen}}`, `{{club:stockage:grand}}`, `{{club:heure}}`,
 * `{{club:remise-pack}}` (en %), `{{club:par-licencie:moyen}}` (pack, club type), `{{produit}}` (nom du produit).
 */
function valeursClubs(): Record<string, number> {
  const v: Record<string, number> = {
    'club:heure': PRICING.heureSupplementaire,
    'club:dev-heure': PRICING.heureDeveloppement,
    'club:km': PRICING.premierRdvGratuitKm,
    'club:pages': PRICING.pagesIncluses,
    'club:support-jours': PRICING.supportJoursOuvres,
    'club:remise-pack': Math.round(PRICING.packDiscount * 100),
    'club:remise-annuelle': Math.round(PRICING.annualDiscount * 100),
    'club:fois': PRICING.installments,
    'club:engagement': PRICING.engagementMois,
  }
  for (const c of CATEGORIES) {
    for (const f of ['site', 'logiciel', 'pack'] as const) {
      const t = tarif(c, f)
      v[`club:${f}:${c.id}:mise`] = t.miseEnPlace
      v[`club:${f}:${c.id}:mois`] = t.mois
      v[`club:heures:${f}:${c.id}`] = c.heures[f]
    }
    v[`club:stockage:${c.id}`] = c.stockageGo
    v[`club:licencies-type:${c.id}`] = c.clubType
    v[`club:min:${c.id}`] = c.min
    if (c.max !== null) v[`club:max:${c.id}`] = c.max
  }
  for (const o of OPTIONS) {
    v[`club:option:${o.id}:mise`] = o.miseEnPlace
    v[`club:option:${o.id}:mois`] = o.mois
  }
  return v
}
Object.assign(VALEURS, valeursClubs())

const decimal = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const TEXTES: Record<string, string> = {
  produit: PRODUCT_NAME,
  ...Object.fromEntries(CATEGORIES.map((c) => [`club:par-licencie:${c.id}`, decimal.format(coutParLicencieAn(tarif(c, 'pack').mois, c.clubType))])),
}

export function jetons(texte: string): string {
  if (!texte.includes('{{')) return texte
  return texte.replace(/\{\{([a-z0-9:-]+)\}\}/g, (m, k: string) => (k in VALEURS ? nombre(VALEURS[k]!) : k in TEXTES ? TEXTES[k]! : m))
}

/** Applique `jetons` à toutes les chaînes d'une structure de données (récursif). */
export function jetonsProfond<T>(x: T): T {
  if (typeof x === 'string') return jetons(x) as T
  if (Array.isArray(x)) return x.map((v) => jetonsProfond(v)) as T
  if (x && typeof x === 'object') return Object.fromEntries(Object.entries(x as Record<string, unknown>).map(([k, v]) => [k, jetonsProfond(v)])) as T
  return x
}
