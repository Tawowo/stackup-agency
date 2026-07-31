import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Parrainage — 1 mois de maintenance offert',
  description: 'Recommandez Stackup Agency et recevez 1 mois de maintenance offert (jusqu\'à 89€) pour chaque client apporté. Programme simple, transparent, sans condition cachée.',
  alternates: { canonical: 'https://stackup-agency.fr/parrainage' },
  openGraph: {
    url: 'https://stackup-agency.fr/parrainage',
    title: 'Parrainage — 1 mois de maintenance offert',
    description: 'Recommandez Stackup Agency et gagnez 200€ pour chaque client que vous nous apportez.',
    type: 'website',
  },
}

export default function ParrainageLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
