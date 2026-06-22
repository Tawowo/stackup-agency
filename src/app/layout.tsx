import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ThemeProvider } from '@/contexts/ThemeContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://stackup-agency.vercel.app'),
  title: {
    default: 'Stackup Agency — Agence Web & Digital | Création Site Internet',
    template: '%s | Stackup Agency',
  },
  description:
    'Stackup Agency : agence digitale spécialisée en création de sites web, applications et systèmes de gestion sur mesure. Devis gratuit sous 24h. Prix accessibles, qualité premium.',
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
  authors: [{ name: 'Mathéo Reboul', url: 'https://stackup-agency.vercel.app' }],
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
    url: 'https://stackup-agency.vercel.app',
    siteName: 'Stackup Agency',
    title: 'Stackup Agency — Agence Web & Digital | Création Site Internet',
    description:
      'Agence digitale spécialisée en création de sites web, applications et systèmes de gestion sur mesure. Devis gratuit sous 24h.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Stackup Agency — Votre vision. Notre code.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stackup Agency — Agence Web & Digital',
    description: 'Création de sites web, applications et systèmes de gestion sur mesure.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://stackup-agency.vercel.app',
    languages: {
      'fr-FR': 'https://stackup-agency.vercel.app',
      'en-US': 'https://stackup-agency.vercel.app/en',
    },
  },
  verification: {
    google: 'À_REMPLIR_APRÈS_GOOGLE_SEARCH_CONSOLE',
  },
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Stackup Agency',
  description:
    'Agence digitale spécialisée en création de sites web, applications et systèmes de gestion sur mesure',
  url: 'https://stackup-agency.vercel.app',
  telephone: '+33764020898',
  email: 'contact@stackup.agency',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Indre-et-Loire',
    addressCountry: 'FR',
  },
  priceRange: '€€',
  serviceType: ['Création de site web', 'Développement web', 'Marketing digital'],
  founder: {
    '@type': 'Person',
    name: 'Mathéo Reboul',
  },
  sameAs: ['https://stackup-agency.vercel.app'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className={`${inter.variable} antialiased overflow-x-hidden`}>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
