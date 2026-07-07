/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
  redirects: async () => [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'www.stackup-agency.fr' }],
      destination: 'https://stackup-agency.fr/:path*',
      permanent: true,
    },
    {
      source: '/blog/pourquoi-votre-restaurant-a-besoin-dun-site-web-en-2026',
      destination: '/blog/pourquoi-votre-restaurant-perd-des-clients-sans-site-web',
      permanent: true,
    },
    {
      source: '/blog/avis-clients-google-strategie',
      destination: '/blog/avis-google-strategie-complete',
      permanent: true,
    },
    {
      source: '/blog/hebergement-web-comment-choisir',
      destination: '/blog/hebergement-web-choisir',
      permanent: true,
    },
    {
      source: '/blog/seo-local-google-maps-premier',
      destination: '/blog/seo-local-google-maps-2026',
      permanent: true,
    },
  ],
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
    {
      source: '/(.*)\\.(jpg|jpeg|png|gif|ico|svg|woff|woff2)',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
  ],
}

export default nextConfig
