import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/ui/CookieBanner'
import Palette from '@/components/ui/Palette'
import RevealObserver from '@/components/ui/RevealObserver'
import BrandPreloader from '@/components/ui/BrandPreloader'
import PageProgressBar from '@/components/ui/PageProgressBar'
import SectionProgressBar from '@/components/ui/SectionProgressBar'

import { SITE } from '@/config/site'
import { BanniereProvider } from '@/contexts/BanniereContext'
import BanniereRentree from '@/components/rentree/BanniereRentree'
import MobileBannerSpacer from '@/components/rentree/MobileBannerSpacer'
import { isRentreeActive } from '@/config/rentree'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-space',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Stackup Agency — Agence Web & Digital | Création Site Internet',
    template: '%s | Stackup Agency',
  },
  description:
    'Stackup Agency : agence digitale spécialisée en création de sites web, applications et systèmes de gestion sur mesure. Devis gratuit sous 72h. Prix accessibles, qualité premium.',
  keywords: [
    'agence web',
    'création site internet',
    'développement web',
    'agence digitale Tours',
    'site vitrine',
    'site e-commerce',
    'application web sur mesure',
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE.url,
    siteName: SITE.name,
    title: 'Stackup Agency — Agence Web & Digital | Création Site Internet',
    description:
      'Agence digitale spécialisée en création de sites web, applications et systèmes de gestion sur mesure. Devis gratuit sous 72h.',
    images: [
      {
        url: `${SITE.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Stackup Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stackup Agency — Agence Web & Digital',
    description: 'Création de sites web, applications et systèmes de gestion sur mesure.',
    images: [`${SITE.url}/og-image.png`],
  },
  alternates: {
    canonical: SITE.url,
    types: {
      'application/rss+xml': `${SITE.url}/feed.xml`,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icons/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icons/icon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'xiP5qgErkvFWvBzdgLl2rUGwMVWq0jLJTk0OwUnGrX4',
  },
}

const schemaOrg = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    publisher: { '@id': `${SITE.url}/#organization` },
  },
  {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    description: 'Agence digitale spécialisée en création de sites web, applications et systèmes de gestion sur mesure — basée à Tours, intervenant sur toute la France.',
    url: SITE.url,
    email: SITE.email,
    foundingDate: SITE.founded,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE.url}/icons/icon-512.png`,
      width: 512,
      height: 512,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.department,
      addressCountry: SITE.address.country,
    },
    areaServed: {
      '@type': 'Country',
      name: 'France',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE.email,
      contactType: 'customer service',
      availableLanguage: ['fr'],
    },
    priceRange: '€€',
    knowsAbout: ['Création de site web', 'Développement web', 'SEO', 'Marketing digital', 'Applications web sur mesure'],
    sameAs: [
      SITE.social.linkedin,
      SITE.social.instagram,
      SITE.social.facebook,
    ],
  },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Marque la disponibilité de JavaScript AVANT le premier rendu.
            Les primitives de révélation (.su-ligne-interne) ne masquent leur
            contenu que sous `.su-js` : sans JavaScript le texte reste
            simplement visible, et comme la classe est posée de façon
            synchrone dans <head>, il n'y a aucun scintillement. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('su-js')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <BanniereProvider initialActive={isRentreeActive()}>
              {isRentreeActive() && <BanniereRentree />}
              {isRentreeActive() && <MobileBannerSpacer />}
              <PageProgressBar />
              <SectionProgressBar />
              <BrandPreloader />
              <RevealObserver />
              {/* Lien d'évitement : premier élément focalisable de la page,
                  il permet de sauter la navigation sans la parcourir au
                  clavier à chaque changement de page. */}
              <a href="#contenu" className="su-evitement">Aller au contenu</a>
              <Navbar />
              {/* Repère principal unique pour toutes les pages. Il était
                  absent de 29 gabarits, qui génèrent l'essentiel des 438
                  pages du site (règle WCAG landmark-one-main). */}
              <main id="contenu">{children}</main>
              <Footer />
              <CookieBanner />
              <Palette />
            </BanniereProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
