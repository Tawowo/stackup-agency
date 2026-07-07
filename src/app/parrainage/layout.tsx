import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Programme de Parrainage — Gagnez 200€ par Filleul | Stackup Agency',
  description: 'Recommandez Stackup Agency et gagnez 200€ pour chaque client que vous nous apportez. Programme de parrainage simple, transparent et rémunérateur.',
  alternates: { canonical: 'https://stackup-agency.fr/parrainage' },
  openGraph: {
    url: 'https://stackup-agency.fr/parrainage',
    title: 'Programme de Parrainage — Gagnez 200€ par Filleul | Stackup Agency',
    description: 'Recommandez Stackup Agency et gagnez 200€ pour chaque client que vous nous apportez.',
    type: 'website',
  },
}

export default function ParrainageLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
