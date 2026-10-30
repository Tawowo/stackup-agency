/**
 * JETONS DE L'OFFRE CLUBS — `{{club:abo-moyen-pack}}` : les textes ne contiennent jamais un montant écrit à la main, ils lisent pricing.ts.
 * Grammaire (les montants sont rendus sans symbole : écrire « {{club:abo-moyen-pack}} € ») :
 *   club:mep-<catégorie>-<site|logiciel|pack>      mise en place          club:abo-<catégorie>-<site|logiciel|pack>   abonnement mensuel
 *   club:heures-<catégorie>-<site|logiciel|pack>   heures incluses        club:go-<catégorie>                          stockage en Go
 *   club:opt-<option>-mep | club:opt-<option>-mensuel                      club:remise-pack | remise-annuel (pourcentages)
 *   club:fois | km | heure-supp | dev-heure | support-jours | engagement
 * Catégories : mini, petit, moyen, grand, tres-grand.
 */
import { PRICING, categorieDe, optionDe, type CategorieId } from '../../data/offre-clubs/pricing.ts'
import { prixFormule } from './calcul.ts'

const CATS = PRICING.categories.map((c) => c.id)

export function valeurJetonClub(cle: string): number | undefined {
  const k = cle.replace(/^club:/, '')
  const simples: Record<string, number> = {
    'remise-pack': Math.round(PRICING.packDiscount * 100),
    'remise-annuel': Math.round(PRICING.annualDiscount * 100),
    fois: PRICING.miseEnPlaceEnFois,
    km: PRICING.deplacementGratuitKm,
    'heure-supp': PRICING.heureSupplementaire.prix,
    'dev-heure': PRICING.developpementSurMesureHeure,
    'support-jours': PRICING.supportJoursOuvres,
    engagement: PRICING.engagementMois,
  }
  if (k in simples) return simples[k]
  let m = k.match(/^(mep|abo|heures)-(.+)-(site|logiciel|pack)$/)
  if (m) {
    const cat = m[2] as CategorieId
    if (!CATS.includes(cat)) return undefined
    const c = categorieDe(cat)
    const f = m[3] as 'site' | 'logiciel' | 'pack'
    if (m[1] === 'heures') return c.heures[f]
    const p = prixFormule(c, f)
    return m[1] === 'mep' ? p.miseEnPlace : p.mensuel
  }
  m = k.match(/^go-(.+)$/)
  if (m && CATS.includes(m[1] as CategorieId)) return categorieDe(m[1] as CategorieId).stockageGo
  m = k.match(/^opt-(.+)-(mep|mensuel)$/)
  if (m) {
    const o = optionDe(m[1]!)
    const v = m[2] === 'mep' ? o?.miseEnPlace : o?.mensuel
    return v ?? undefined
  }
  return undefined
}
