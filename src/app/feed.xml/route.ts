import { tousLesArticles } from '@/lib/blog'
import { ORIGINE } from '@/lib/seo'

// Les articles programmés (publishAt) paraissent à leur date sans redéploiement.
export const revalidate = 43200

export const dynamic = 'force-static'

const x = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function GET() {
  const items = tousLesArticles()
    .slice(0, 60)
    .map((a) => `<item><title>${x(a.titre)}</title><link>${ORIGINE}/blog/${a.slug}</link><guid>${ORIGINE}/blog/${a.slug}</guid><pubDate>${new Date(a.date).toUTCString()}</pubDate><description>${x(a.extrait)}</description></item>`)
    .join('')
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Stackup Agency — le journal</title><link>${ORIGINE}/blog</link><description>Guides pour créer son site, être trouvé et vendre en ligne.</description><language>fr-FR</language>${items}</channel></rss>`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
