import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ThemeProvider } from '@/contexts/ThemeContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Stackup Agency — Votre vision. Notre code.',
  description: 'Agence digitale spécialisée en création de sites web, applications et systèmes de gestion sur mesure. Prix accessibles, qualité premium.',
  keywords: 'agence digitale, création site web, développement web, application web, e-commerce, design',
  authors: [{ name: 'Stackup Agency' }],
  openGraph: {
    title: 'Stackup Agency — Votre vision. Notre code.',
    description: 'Sites web, applications et systèmes de gestion sur mesure. Prix accessibles, qualité premium.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Stackup Agency',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stackup Agency',
    description: 'Votre vision. Notre code.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
