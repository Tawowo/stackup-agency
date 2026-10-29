import { familleSitemap, toutesLesRoutes } from '@/config/routes'
import { LASTMOD } from '@/config/lastmod.generated'
import regles from '@/config/lastmod-regles.json'
import { RAYONS, tousLesArticles } from '@/lib/blog'
import { toutesLesEntrees } from '@/lib/lexique'
import { ORIGINE } from '@/lib/seo'
import { PROJETS } from '@/experiences/galerie/projets'

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

export interface EntreeSitemap {
  url: string
  lastModified?: string
  /** Images importantes de la page (balises image:image). */
  images?: string[]
}

/** Les entrées d'un sitemap (une famille de pages) : uniquement des pages 200, indexables, sans redirection ; lastmod = vraie date de mise à jour. */
export function entreesSitemap(famille: string): EntreeSitemap[] {
  const articles = tousLesArticles()
  const dates = new Map<string, string>([
    ...articles.map((a): [string, string] => [`/blog/${a.slug}`, a.maj ?? a.date]),
    ...toutesLesEntrees().map((e): [string, string] => [`/lexique/${e.slug}`, e.maj]),
  ])
  const dernier = articles.map((a) => a.maj ?? a.date).sort().at(-1)
  const rayons = new Set(RAYONS.map((r) => `/blog/categorie/${r.id}`))
  return toutesLesRoutes()
    .filter((r) => familleSitemap(r.chemin) === famille && !rayons.has(r.chemin)) // les rayons du blog sont des listes d'articles (noindex, suivis)
    .map((r) => {
      let lastModified: string | undefined = dates.get(r.chemin)
      if (!lastModified && (r.chemin === '/blog' || rayons.has(r.chemin))) lastModified = dernier
      if (!lastModified) {
        const k = cle(r.chemin)
        lastModified = k ? LASTMOD[k] : undefined
      }
      const projet = PROJETS.find((p) => `/realisations/${p.slug}` === r.chemin)
      // Une date de mise à jour n'est jamais dans le futur.
      const aujourdhui = new Date().toISOString().slice(0, 10)
      if (lastModified && lastModified.slice(0, 10) > aujourdhui) lastModified = aujourdhui
      return { url: `${ORIGINE}${r.chemin === '/' ? '' : r.chemin}`, lastModified, images: projet ? [`${ORIGINE}${projet.capture}`] : undefined }
    })
}

export const xmlSitemap = (entrees: EntreeSitemap[]) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entrees
    .map((e) => `  <url><loc>${e.url}</loc>${e.lastModified ? `<lastmod>${e.lastModified}</lastmod>` : ''}${(e.images ?? []).map((i) => `<image:image><image:loc>${i}</image:loc></image:image>`).join('')}</url>`)
    .join('\n')}\n</urlset>\n`
