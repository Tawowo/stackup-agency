import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { VILLES } from '@/data/villes'
import { METIERS } from '@/data/metiers'
import { SOLUTIONS } from '@/data/solutions'

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

const blogCategories = ['seo', 'creation-sites', 'applications-metier', 'strategie', 'restaurants', 'artisans']

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

function getBlogPosts(): { slug: string; date: Date }[] {
  const dir = path.join(process.cwd(), 'src/content/blog')
  try {
    return fs.readdirSync(dir)
      .filter(f => f.endsWith('.md'))
      .map(f => {
        const slug = f.replace(/\.md$/, '')
        const raw = fs.readFileSync(path.join(dir, f), 'utf8')
        const { data } = matter(raw)
        const d = data.updated ?? data.date
        return { slug, date: d ? new Date(d) : new Date() }
      })
      .sort((a, b) => b.date.getTime() - a.date.getTime())
  } catch {
    return []
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getBlogPosts()
  const now = new Date()

  return [
    // Accueil
    { url: base, lastModified: new Date('2026-07-29'), changeFrequency: 'weekly', priority: 1.0 },

    // Pages statiques principales
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/parrainage`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/cgv`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/ressources/documents`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },

    // Services
    { url: `${base}/services/site-association`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/services/redaction-blog-seo`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
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

    // Catégories blog
    ...blogCategories.map(cat => ({
      url: `${base}/blog/categorie/${cat}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),

    // Articles de blog (avec dates réelles)
    ...blogPosts.map(({ slug, date }) => ({
      url: `${base}/blog/${slug}`,
      lastModified: date,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    // Hub pages Phase 2
    { url: `${base}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${base}/tarifs`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/realisations`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },

    // Motion Lab

    // Cocons sémantiques — hubs
    { url: `${base}/agence-web`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/creation-site-internet`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/solutions`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/a-propos`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },

    // Pages villes /agence-web/[ville]
    ...VILLES.map(v => ({
      url: `${base}/agence-web/${v.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: v.priorite === 'P1' ? 0.85 : v.priorite === 'P2' ? 0.75 : 0.65,
    })),

    // Pages métier /creation-site-internet/[metier]
    ...METIERS.map(m => ({
      url: `${base}/creation-site-internet/${m.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: m.priorite === 'P1' ? 0.85 : m.priorite === 'P2' ? 0.75 : 0.65,
    })),

    // Pages solutions /solutions/[slug]
    ...SOLUTIONS.map(s => ({
      url: `${base}/solutions/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: s.priorite === 'P1' ? 0.8 : 0.7,
    })),

    // Pages légales
    { url: `${base}/mentions-legales`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/politique-confidentialite`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/cookies`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
