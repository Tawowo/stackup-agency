/**
 * AUDIT — une mesure Google PageSpeed Insights (Lighthouse, mobile) réduite à
 * l'essentiel : trois scores, trois mesures, les recommandations prioritaires
 * en français. Serveur uniquement (route /api/audit et rendu sans JS de
 * /outils/audit-site). PAGESPEED_API_KEY est facultative : sans elle, Google
 * répond quand même, sur un quota partagé très bas (429 fréquents).
 */
const PSI = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
const DELAI_MS = 55_000

export type Categorie = 'performance' | 'accessibilite' | 'seo'

export interface Recommandation {
  id: string
  categorie: Categorie
  titre: string
  detail: string
  /** Nombre d'éléments relevés par Google (0 : non précisé). */
  elements: number
  /** Documentation Google, quand la recommandation en cite une. */
  lien: string
}

export interface ResultatAudit {
  url: string
  mesureLe: string
  scores: Record<Categorie, number | null>
  mesures: { cle: string; libelle: string; valeur: string }[]
  recommandations: Recommandation[]
}

export type ReponseAudit = { ok: true; resultat: ResultatAudit } | { ok: false; statut: number; erreur: string }

/* Le strict nécessaire du format Lighthouse. */
interface AuditLH {
  title?: string
  description?: string
  score?: number | null
  scoreDisplayMode?: string
  displayValue?: string
  details?: { items?: unknown[]; overallSavingsMs?: number }
  metricSavings?: Record<string, number>
}
interface LH {
  fetchTime?: string
  finalDisplayedUrl?: string
  categories?: Record<string, { score?: number | null; auditRefs?: { id: string; weight?: number; group?: string }[] }>
  audits?: Record<string, AuditLH>
}

const CATEGORIES: [Categorie, string][] = [
  ['performance', 'performance'],
  ['accessibilite', 'accessibility'],
  ['seo', 'seo'],
]
const MESURES: [string, string, string][] = [
  ['LCP', 'largest-contentful-paint', 'affichage du contenu principal'],
  ['TBT', 'total-blocking-time', 'temps où la page ne répond pas'],
  ['CLS', 'cumulative-layout-shift', 'stabilité de la mise en page'],
]
const MODES = new Set(['numeric', 'binary', 'metricSavings'])
const PAR_CATEGORIE = 3

/** « mon-site.fr » → https://mon-site.fr/ ; null si l'adresse n'est pas publiable. */
export function normaliserAdresse(brute: string): URL | null {
  const s = brute.trim()
  if (!s || s.length > 500 || /\s/.test(s)) return null
  try {
    const u = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`)
    if (!/^https?:$/.test(u.protocol) || !u.hostname.includes('.') || u.hostname.endsWith('.local')) return null
    return u
  } catch {
    return null
  }
}

/** Markdown Lighthouse → texte : le lien final (« En savoir plus… ») gardé à part, les autres réduits à leur texte, deux phrases au plus. */
function nettoyer(md = ''): { texte: string; lien: string } {
  let lien = ''
  const texte = md
    .replace(/\[[^\]]+\]\((https?:[^)]+)\)\.?\s*$/, (_, u: string) => {
      lien = u
      return ''
    })
    .replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, (_, t: string, u: string) => {
      if (!lien) lien = u
      return t
    })
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+([.,])/g, '$1')
    .replace(/\.{2,}/g, '.')
    .replace(/\s{2,}/g, ' ')
    .trim()
  return { texte: texte.split(/(?<=[.!?])\s+/).slice(0, 2).join(' '), lien }
}

/** Réduit un rapport Lighthouse à ce que la page affiche. */
export function lireRapport(lh: LH, adresse: string): ResultatAudit {
  const audits = lh.audits ?? {}
  const scores = {} as Record<Categorie, number | null>
  const recommandations: Recommandation[] = []
  for (const [cat, cle] of CATEGORIES) {
    const c = lh.categories?.[cle]
    scores[cat] = typeof c?.score === 'number' ? Math.round(c.score * 100) : null
    const candidates = (c?.auditRefs ?? [])
      .filter((r) => r.group !== 'metrics' && r.group !== 'hidden')
      .map((r) => ({ r, a: audits[r.id] }))
      .filter((x): x is { r: (typeof x)['r']; a: AuditLH & { score: number } } => !!x.a && MODES.has(x.a.scoreDisplayMode ?? '') && typeof x.a.score === 'number' && x.a.score < 0.9)
      .map(({ r, a }) => {
        const gain = a.details?.overallSavingsMs ?? Object.values(a.metricSavings ?? {}).reduce((s, v) => s + (v > 1 ? v : 0), 0)
        return { r, a, poids: (1 - a.score) * Math.max(r.weight ?? 0, 1) + gain / 500 }
      })
      .sort((x, y) => y.poids - x.poids)
      .slice(0, PAR_CATEGORIE)
    for (const { r, a } of candidates) {
      const { texte, lien } = nettoyer(a.description)
      recommandations.push({ id: r.id, categorie: cat, titre: nettoyer(a.title).texte, detail: texte, elements: Array.isArray(a.details?.items) ? a.details.items.length : 0, lien })
    }
  }
  return {
    url: lh.finalDisplayedUrl || adresse,
    mesureLe: lh.fetchTime ?? new Date().toISOString(),
    scores,
    mesures: MESURES.flatMap(([cle, id, libelle]) => (audits[id]?.displayValue ? [{ cle, libelle, valeur: audits[id]!.displayValue! }] : [])),
    recommandations,
  }
}

/** Lance la mesure chez Google et traduit chaque échec en une phrase claire. */
export async function auditer(brute: string): Promise<ReponseAudit> {
  const u = normaliserAdresse(brute)
  if (!u) return { ok: false, statut: 400, erreur: 'Cette adresse ne semble pas valide. Exemple : mon-site.fr' }
  const q = new URLSearchParams({ url: u.href, strategy: 'mobile', locale: 'fr' })
  for (const [, cle] of CATEGORIES) q.append('category', cle)
  const cle = process.env.PAGESPEED_API_KEY
  if (cle) q.set('key', cle)

  let res: Response
  try {
    res = await fetch(`${PSI}?${q}`, { cache: 'no-store', signal: AbortSignal.timeout(DELAI_MS) })
  } catch (e) {
    if (e instanceof Error && (e.name === 'TimeoutError' || e.name === 'AbortError'))
      return { ok: false, statut: 504, erreur: 'La mesure a pris trop de temps : la page met peut-être longtemps à répondre. Réessayez dans un moment.' }
    return { ok: false, statut: 502, erreur: 'Impossible de joindre le service de mesure de Google pour l’instant. Réessayez dans un moment.' }
  }
  if (!res.ok) {
    const message = await res
      .json()
      .then((d: { error?: { message?: string } }) => d.error?.message ?? '')
      .catch(() => '')
    if (res.status === 429) return { ok: false, statut: 429, erreur: 'Le quota de mesures gratuites de Google est atteint pour le moment. Réessayez dans quelques minutes.' }
    if (res.status === 400) return { ok: false, statut: 400, erreur: 'Google n’a pas pu ouvrir cette page. Vérifiez qu’elle est en ligne, publique et sans mot de passe.' }
    if (/lighthouse|NO_FCP|DOCUMENT_REQUEST/i.test(message))
      return { ok: false, statut: 422, erreur: 'Google a ouvert la page mais n’a pas réussi à la mesurer (page vide, bloquée ou trop lente à s’afficher).' }
    return { ok: false, statut: 502, erreur: `Le service de mesure de Google a répondu par une erreur (code ${res.status}). Réessayez dans un moment.` }
  }
  const data = (await res.json().catch(() => null)) as { lighthouseResult?: LH } | null
  if (!data?.lighthouseResult?.categories) return { ok: false, statut: 422, erreur: 'Google n’a renvoyé aucun score pour cette page. Réessayez dans un moment.' }
  return { ok: true, resultat: lireRapport(data.lighthouseResult, u.href) }
}
