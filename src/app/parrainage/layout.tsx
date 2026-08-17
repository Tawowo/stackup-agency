import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Parrainage — 1 mois Premium offert ou −10 % sur votre prestation',
  description: 'Parrainez un professionnel : à la signature de son projet, choisissez votre récompense — 1 mois d\'abonnement Premium (89 €) offert ou −10 % sur votre propre prestation. Cumulable sur plusieurs filleuls.',
  alternates: { canonical: 'https://stackup-agency.fr/parrainage' },
  openGraph: {
    url: 'https://stackup-agency.fr/parrainage',
    title: 'Parrainage — 1 mois Premium offert ou −10 % sur votre prestation',
    description: 'Recommandez Stackup Agency et gagnez 200€ pour chaque client que vous nous apportez.',
    type: 'website',
  },
}

export default function ParrainageLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
