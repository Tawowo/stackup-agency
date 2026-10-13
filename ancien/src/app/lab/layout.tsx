import type { Metadata } from 'next'

/**
 * Le banc de mesure ne doit jamais être indexé ni suivi : c'est un outil
 * interne, pas une page du site. Il est aussi absent du sitemap.
 */
export const metadata: Metadata = {
  title: 'Banc de mesure technique',
  robots: { index: false, follow: false, nocache: true },
}

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return children
}
