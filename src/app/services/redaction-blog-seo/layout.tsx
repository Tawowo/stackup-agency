import type { Metadata } from 'next'
import { SITE } from '@/config/site'

export const metadata: Metadata = {
  title: 'Rédaction blog SEO — Articles optimisés dès à partir de 25 €',
  description: 'Articles de blog optimisés SEO rédigés et relus par des humains. Formules à l\'unité (à partir de 25 €) ou en pack mensuel (à partir de 89 €/à partir de 159 €). Résultats mesurables en 3 mois.',
  alternates: { canonical: `${SITE.url}/services/redaction-blog-seo` },
  openGraph: {
    url: `${SITE.url}/services/redaction-blog-seo`,
    title: 'Rédaction blog SEO — Articles optimisés',
    description: 'Articles de blog SEO rédigés et relus par des humains. À partir de 25€.',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
