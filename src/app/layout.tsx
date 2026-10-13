import type { Metadata, Viewport } from 'next'
import './globals.css'
import { inter, jetbrains, poppins } from './fonts'
import SceneMount from '@/webgl/SceneMount'
import Nav from '@/components/layout/Nav'
import Defilement from '@/components/layout/Defilement'
import Lumiere from '@/experiences/lumiere'
import ScrollRefresh from '@/components/layout/ScrollRefresh'
import Traversee from '@/experiences/traversee/Traversee'
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
      <body>
        <SceneMount />
        <div className="su-lueur" aria-hidden="true" />
        <Defilement />
        <Nav />
        <div className="su-page">{children}</div>
        <Lumiere />
        <ScrollRefresh />
        <Traversee />
      </body>
    </html>
  )
}
