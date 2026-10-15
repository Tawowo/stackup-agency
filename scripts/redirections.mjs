/**
 * REDIRECTIONS — reprend TOUTES les 301 de l'ancien site (ancien/next.config.mjs)
 * et ajoute celles des pages qui n'existent plus en V5. Écrit src/config/redirections.ts.
 * Aucune ancienne URL ne doit finir en 404.
 */
import fs from 'node:fs'
const ancien = (await import('../ancien/next.config.mjs')).default
const vieilles = await ancien.redirects()
const nouvelles = [
  { source: '/laboratoire', destination: '/solutions', permanent: true },
  { source: '/laboratoire/:path*', destination: '/solutions', permanent: true },
  { source: '/configurateur', destination: '/tarifs#estimer', permanent: true },
  { source: '/devis', destination: '/tarifs#estimer', permanent: true },
  { source: '/outils/studio-de-style', destination: '/tarifs#estimer', permanent: true },
  { source: '/blog/site-vitrine-449-inclus', destination: '/blog/site-vitrine-inclus', permanent: true },
  { source: '/blog/idee-mise-en-ligne-10-jours-methode', destination: '/blog/idee-mise-en-ligne-methode', permanent: true },
  { source: '/tarifs/:plan', destination: '/tarifs', permanent: true },
  { source: '/services/marketing-digital', destination: '/services', permanent: true },
  { source: '/services/maintenance-support', destination: '/tarifs', permanent: true },
  { source: '/services/redaction-blog-seo', destination: '/services', permanent: true },
  ...['demo-videaste', 'chateau-lumieres', 'maison-elise', 'au-pain-dore', 'prestige-immo', 'lolivier-dashboard', 'chateau-fleury'].map((slug) => ({
    source: `/realisations/${slug}`,
    destination: '/realisations',
    permanent: true,
  })),
  { source: '/solutions/commande-en-ligne-livraison', destination: '/solutions/click-and-collect', permanent: true },
  { source: '/solutions/galerie-client-photographe', destination: '/solutions', permanent: true },
  { source: '/services/site-association', destination: '/services', permanent: true },
]
const toutes = [...vieilles, ...nouvelles]
const sortie = `/**
 * REDIRECTIONS 301 — générées par scripts/redirections.mjs (ne pas éditer à la main).
 * ${vieilles.length} reprises de l'ancien site + ${nouvelles.length} pour les pages retirées en V5.
 */
import type { Redirect } from 'next/dist/lib/load-custom-routes'

export const REDIRECTIONS: Redirect[] = ${JSON.stringify(toutes, null, 2)}
`
fs.writeFileSync('src/config/redirections.ts', sortie)
console.log(toutes.length, 'redirections')
