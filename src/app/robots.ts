import type { MetadataRoute } from 'next'
import { ORIGINE } from '@/lib/seo'

/** Les robots des moteurs d'IA sont AUTORISÉS (visibilité dans ChatGPT, Claude, Perplexity, Gemini…), sauf sur les pages techniques. */
const TECHNIQUE = ['/api/', '/lab', '/contact/merci', '/*?url=', '/*?e=', '/*?objet=']
const ROBOTS_IA = ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'cohere-ai', 'MistralAI-User', 'Meta-ExternalAgent', 'DuckAssistBot']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: TECHNIQUE },
      { userAgent: ROBOTS_IA, allow: '/', disallow: TECHNIQUE },
    ],
    sitemap: `${ORIGINE}/sitemap.xml`,
  }
}
