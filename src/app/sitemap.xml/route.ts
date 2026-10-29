import { FAMILLES_SITEMAP } from '@/config/routes'
import { ORIGINE } from '@/lib/seo'

export const revalidate = 43200

/** Index des sitemaps : un fichier par type de page (pages, services, solutions, métiers, villes, blog, réalisations, outils, lexique). */
export function GET() {
  const corps = FAMILLES_SITEMAP.map((id) => `  <sitemap><loc>${ORIGINE}/sitemap-${id}.xml</loc></sitemap>`).join('\n')
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${corps}\n</sitemapindex>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  })
}
