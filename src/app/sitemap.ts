import type { MetadataRoute } from 'next'
import { toutesLesRoutes } from '@/config/routes'
import { tousLesArticles } from '@/lib/blog'
import { ORIGINE } from '@/lib/seo'

export const revalidate = 43200

export default function sitemap(): MetadataRoute.Sitemap {
  const dates = new Map(tousLesArticles().map((a) => [`/blog/${a.slug}`, a.maj ?? a.date]))
  return toutesLesRoutes().map((r) => ({
    url: `${ORIGINE}${r.chemin === '/' ? '' : r.chemin}`,
    lastModified: dates.get(r.chemin) ?? undefined,
    priority: r.priorite,
  }))
}
