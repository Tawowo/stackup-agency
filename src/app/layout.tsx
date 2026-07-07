import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/ui/CookieBanner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://stackup-agency.fr'),
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
    'agence digitale',
    'site vitrine',
    'site e-commerce',
    'application web sur mesure',
    'agence web Touraine',
    'agence web Indre-et-Loire',
    'création site web Tours',
    'développeur web freelance',
    'agence web pas cher',
    'système de gestion restaurant',
    'site web restaurant',
    'agence web jeune',
    'stackup agency',
  ],
  authors: [{ name: 'Stackup Agency', url: 'https://stackup-agency.fr' }],
  creator: 'Stackup Agency',
  publisher: 'Stackup Agency',
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
    url: 'https://stackup-agency.fr',
    siteName: 'Stackup Agency',
    title: 'Stackup Agency — Agence Web & Digital | Création Site Internet',
    description:
      'Agence digitale spécialisée en création de sites web, applications et systèmes de gestion sur mesure. Devis gratuit sous 72h.',
    images: [
      {
        url: 'https://stackup-agency.fr/og-image.png',
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
    images: ['https://stackup-agency.fr/og-image.png'],
  },
  alternates: {
    canonical: 'https://stackup-agency.fr',
    languages: {
      'fr-FR': 'https://stackup-agency.fr',
      'en-US': 'https://stackup-agency.fr/en',
    },
  },
  manifest: '/manifest.json',
  verification: {
    google: 'xiP5qgErkvFWvBzdgLl2rUGwMVWq0jLJTk0OwUnGrX4',
  },
}

const schemaOrg = [
  {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': 'https://stackup-agency.fr/#organization',
    name: 'Stackup Agency',
    description: 'Agence digitale spécialisée en création de sites web, applications et systèmes de gestion sur mesure — basée en Indre-et-Loire, intervenant sur toute la France.',
    url: 'https://stackup-agency.fr',
    email: 'contact@stackup-agency.fr',
    logo: {
      '@type': 'ImageObject',
      url: 'https://stackup-agency.fr/logo.png',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tours',
      addressRegion: 'Indre-et-Loire',
      addressCountry: 'FR',
    },
    areaServed: {
      '@type': 'Country',
      name: 'France',
    },
    priceRange: '€€',
    knowsAbout: ['Création de site web', 'Développement web', 'SEO', 'Marketing digital', 'Applications web sur mesure'],
    sameAs: [
      'https://linkedin.com/in/matheo-reboul',
      'https://instagram.com/stackup.agency',
      'https://tiktok.com/@stackupagency',
    ],
  },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className={`${inter.variable} antialiased overflow-x-hidden`}>
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            {children}
            <Footer />
            <CookieBanner />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
