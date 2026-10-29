import type { MetadataRoute } from 'next'
import { toutesLesRoutes } from '@/config/routes'
import { LASTMOD } from '@/config/lastmod.generated'
import regles from '@/config/lastmod-regles.json'
import { RAYONS, tousLesArticles } from '@/lib/blog'
import { ORIGINE } from '@/lib/seo'

export const revalidate = 43200

type Regle = { exact?: string; prefixe?: string; cle: string }

/** La clé de date d'une route : la règle exacte d'abord, puis le préfixe le plus long. */
function cle(chemin: string): string | undefined {
  const r = regles as Regle[]
  const exacte = r.find((x) => x.exact === chemin)
  if (exacte) return exacte.cle
  return r
    .filter((x) => x.prefixe && (chemin === x.prefixe || chemin.startsWith(x.prefixe + '/')))
    .sort((a, b) => b.prefixe!.length - a.prefixe!.length)[0]?.cle
}

/** Sitemap : uniquement des pages qui répondent 200, indexables, sans redirection ; lastmod = vraie date de mise à jour. */
export default function sitemap(): MetadataRoute.Sitemap {
  const articles = tousLesArticles()
  const dates = new Map(articles.map((a) => [`/blog/${a.slug}`, a.maj ?? a.date]))
  const dernier = articles.map((a) => a.maj ?? a.date).sort().at(-1)
  const rayons = new Set(RAYONS.map((r) => `/blog/categorie/${r.id}`))
  return toutesLesRoutes().map((r) => {
    let lastModified: string | undefined = dates.get(r.chemin)
    if (!lastModified && (r.chemin === '/blog' || rayons.has(r.chemin))) lastModified = dernier
    if (!lastModified) {
      const k = cle(r.chemin)
      lastModified = k ? LASTMOD[k] : undefined
    }
    return { url: `${ORIGINE}${r.chemin === '/' ? '' : r.chemin}`, lastModified, priority: r.priorite }
  })
}
