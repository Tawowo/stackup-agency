import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://stackup-agency.vercel.app', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://stackup-agency.vercel.app/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://stackup-agency.vercel.app/blog/pourquoi-votre-restaurant-a-besoin-dun-site-web-en-2026', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://stackup-agency.vercel.app/blog/comment-jai-cree-un-systeme-de-gestion-complet-en-100h', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://stackup-agency.vercel.app/blog/les-5-erreurs-digitales-des-petits-commerces', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://stackup-agency.vercel.app/mentions-legales', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://stackup-agency.vercel.app/politique-confidentialite', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]
}
