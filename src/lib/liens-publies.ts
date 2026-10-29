/**
 * LIENS VERS LES ARTICLES PUBLIÉS UNIQUEMENT — les textes de données (métiers, villes, solutions, comparatifs…) peuvent citer des articles
 * programmés : tant qu'un article n'est pas en ligne, son lien `[texte](/blog/slug)` devient du texte simple et une entrée `{ href: '/blog/slug' }`
 * d'une liste disparaît (jamais de 404).
 * Réservé au rendu serveur (lit le dossier des articles).
 */
import { tousLesArticles } from './blog'

const LIEN_BLOG = /\[([^\]]+)\]\(\/blog\/([a-z0-9-]+)(#[^)]*)?\)/g
let publies: Set<string> | null = null

export function liensPublies<T>(x: T): T {
  publies ??= new Set(tousLesArticles().map((a) => a.slug))
  const ok = publies
  const f = (v: unknown): unknown => {
    if (typeof v === 'string') return v.replace(LIEN_BLOG, (m, texte: string, slug: string) => (ok.has(slug) ? m : texte))
    if (Array.isArray(v))
      return v
        .filter((i) => {
          const h = i && typeof i === 'object' ? (i as { href?: unknown }).href : undefined
          const m = typeof h === 'string' ? h.match(/^\/blog\/([a-z0-9-]+)\/?(#.*)?$/) : null
          return !m || ok.has(m[1]!)
        })
        .map(f)
    if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v as Record<string, unknown>).map(([k, w]) => [k, f(w)]))
    return v
  }
  return f(x) as T
}
