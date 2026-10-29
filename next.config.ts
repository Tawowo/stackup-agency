import type { NextConfig } from 'next'
import { REDIRECTIONS } from './src/config/redirections'

const ORIGINE = 'https://stackup-agency.fr'
const HOTE_WWW = [{ type: 'host' as const, value: 'www.stackup-agency.fr' }]

/**
 * REDIRECTIONS — une ancienne URL mène à sa page en UNE seule redirection 301, quelle que soit la variante
 * (barre finale, www). Next retire lui-même la barre finale par un premier saut puis applique les règles : pour éviter
 * cette chaîne (/ancien/ → /ancien → /nouvelle), `skipTrailingSlashRedirect` est activé et chaque règle littérale a
 * ses jumelles « avec barre » et « www ». Les règles générales ne passent qu'en dernier.
 */
function redirections() {
  const absolue = (d: string) => (/^https?:/.test(d) ? d : `${ORIGINE}${d}`)
  const vers = (source: string, destination: string, has?: typeof HOTE_WWW) => ({ source, destination, statusCode: 301 as const, ...(has ? { has } : {}) })
  const propres = REDIRECTIONS.filter((r) => !('has' in r && r.has))
  const sortie = []
  for (const r of propres) {
    const litterale = !/[:*()]/.test(r.source)
    // Hôte www : directement vers l'adresse finale, sur le domaine principal.
    sortie.push(vers(r.source, absolue(r.destination), HOTE_WWW))
    if (litterale) sortie.push(vers(`${r.source}/`, absolue(r.destination), HOTE_WWW))
    sortie.push(vers(r.source, r.destination))
    if (litterale) sortie.push(vers(`${r.source}/`, r.destination))
  }
  // Règles générales : www → domaine principal (barre finale retirée en même temps), puis barre finale seule.
  sortie.push(vers('/:path+/', `${ORIGINE}/:path+`, HOTE_WWW))
  sortie.push(vers('/:path*', `${ORIGINE}/:path*`, HOTE_WWW))
  sortie.push(vers('/:path+/', '/:path+'))
  return sortie
}

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typescript: { ignoreBuildErrors: false },
  agentRules: false,
  devIndicators: false,
  skipTrailingSlashRedirect: true,
  experimental: { agentUpgrade: 'security' },
  redirects: async () => redirections(),
}

export default config
