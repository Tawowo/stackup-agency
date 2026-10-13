import type { MetadataRoute } from 'next'
import { ORIGINE } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/lab', '/contact/merci'] }],
    sitemap: `${ORIGINE}/sitemap.xml`,
    host: ORIGINE,
  }
}
