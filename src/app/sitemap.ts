import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const base = 'https://stackup-agency.fr'

const serviceSlugs = [
  'site-vitrine',
  'site-multi-pages',
  'site-ecommerce',
  'systeme-gestion',
  'marketing-digital',
  'maintenance-support',
]

const tarifPlans = ['starter', 'pro', 'premium']

const realisationSlugs = [
  'chateau-lumieres',
  'maison-elise',
  'au-pain-dore',
  'prestige-immo',
  'lolivier-dashboard',
  'chateau-fleury',
]

const servicesLocauxSlugs = [
  'creation-site-restaurant',
  'creation-site-artisan',
  'creation-site-commerce',
  'creation-boutique-en-ligne',
  'developpement-application-metier',
  'referencement-local-seo',
]

function getBlogSlugs(): string[] {
  const dir = path.join(process.cwd(), 'src/content/blog')
  try {
    return fs.readdirSync(dir)
      .filter(f => f.endsWith('.md'))
      .map(f => f.replace(/\.md$/, ''))
  } catch {
    return []
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getBlogSlugs()
  const now = new Date()

  return [
    // Accueil
    { url: base, lastModified: now, changeFrequency: 'daily', priority: 1.0 },

    // Pages statiques principales
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/parrainage`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/services/site-association`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },

    // Services
    ...serviceSlugs.map(slug => ({
      url: `${base}/services/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),

    // Tarifs
    ...tarifPlans.map(plan => ({
      url: `${base}/tarifs/${plan}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    // Réalisations
    ...realisationSlugs.map(slug => ({
      url: `${base}/realisations/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),

    // Services locaux
    ...servicesLocauxSlugs.map(slug => ({
      url: `${base}/services-locaux/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    // Articles de blog
    ...blogSlugs.map(slug => ({
      url: `${base}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    // Pages légales
    { url: `${base}/mentions-legales`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/politique-confidentialite`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/cookies`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
