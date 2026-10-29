import type { Metadata, Viewport } from 'next'
import './globals.css'
import { inter, jetbrains, poppins } from './fonts'
import SceneMount from '@/webgl/SceneMount'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import AnimationsDifferees from '@/components/layout/AnimationsDifferees'
import Mesure from '@/components/layout/Mesure'
import { JsonLd, organisation, siteWeb } from '@/lib/seo'
import '@/styles/chrome.css'

export const metadata: Metadata = {
  title: 'Stackup Agency — Sites et outils sur mesure, Tours',
  description:
    'Agence web à Tours. Sites et outils de gestion sur mesure pour les artisans, les commerçants et les petites entreprises.',
  metadataBase: new URL('https://stackup-agency.fr'),
}

export const viewport: Viewport = {
  themeColor: '#0B1E36',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${poppins.variable} ${inter.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="alternate" type="application/rss+xml" title="Le journal de Stackup Agency" href="/blog/feed.xml" />
      </head>
      <body>
        <JsonLd data={[organisation(), siteWeb()]} />
        <SceneMount />
        <div className="su-lueur" aria-hidden="true" />
        <Nav />
        <div className="su-page">
          {children}
          <Footer />
        </div>
        <AnimationsDifferees />
        <Mesure />
      </body>
    </html>
  )
}
