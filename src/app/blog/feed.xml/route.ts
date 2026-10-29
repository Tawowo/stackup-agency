/** Flux RSS du journal : les 40 derniers articles publiés (les articles programmés n'y figurent qu'à leur date). */
import { tousLesArticles } from '@/lib/blog'
import { ORIGINE } from '@/lib/seo'
import { SITE } from '@/config/site'

export const revalidate = 43200

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function GET() {
  const articles = tousLesArticles().slice(0, 40)
  const maj = articles.map((a) => a.maj ?? a.date).sort().at(-1) ?? '2026-10-29'
  const items = articles
    .map(
      (a) => `    <item>
      <title>${esc(a.titre)}</title>
      <link>${ORIGINE}/blog/${a.slug}</link>
      <guid isPermaLink="true">${ORIGINE}/blog/${a.slug}</guid>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <author>${esc(SITE.email)} (${esc(SITE.fondateur)})</author>
      <description>${esc(a.extrait)}</description>
    </item>`,
    )
    .join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Le journal de Stackup Agency</title>
    <link>${ORIGINE}/blog</link>
    <atom:link href="${ORIGINE}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <description>Guides et réponses précises pour les artisans, commerçants et TPE : site internet, référencement, outils de gestion, obligations.</description>
    <language>fr-FR</language>
    <lastBuildDate>${new Date(maj).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}
