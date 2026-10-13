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
  { source: '/configurateur', destination: '/tarifs', permanent: true },
  { source: '/devis', destination: '/tarifs', permanent: true },
  { source: '/tarifs/:plan', destination: '/tarifs', permanent: true },
  { source: '/services/marketing-digital', destination: '/services', permanent: true },
  { source: '/services/maintenance-support', destination: '/tarifs', permanent: true },
  { source: '/services/redaction-blog-seo', destination: '/services', permanent: true },
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
