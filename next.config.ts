import type { NextConfig } from 'next'
import { REDIRECTIONS } from './src/config/redirections'

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typescript: { ignoreBuildErrors: false },
  agentRules: false,
  devIndicators: false,
  // Toutes les anciennes URL (ancien site + pages retirées en V5) : 301, jamais 404.
  redirects: async () => REDIRECTIONS,
}

export default config
