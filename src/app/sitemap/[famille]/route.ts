import { FAMILLES_SITEMAP } from '@/config/routes'
import { entreesSitemap, xmlSitemap } from '@/lib/sitemap'

export const revalidate = 43200
export const dynamicParams = false

export function generateStaticParams() {
  return FAMILLES_SITEMAP.map((f) => ({ famille: `${f}.xml` }))
}

/** /sitemap/<famille>.xml : un sitemap par type de page. */
export async function GET(_req: Request, { params }: { params: Promise<{ famille: string }> }) {
  const famille = (await params).famille.replace(/\.xml$/, '')
  if (!(FAMILLES_SITEMAP as string[]).includes(famille)) return new Response('Not found', { status: 404 })
  return new Response(xmlSitemap(entreesSitemap(famille)), { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}
