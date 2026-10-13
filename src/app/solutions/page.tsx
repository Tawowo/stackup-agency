import type { Metadata } from 'next'
import Chantier from '@/gabarits/Chantier'

export const metadata: Metadata = { title: 'Outils de gestion — Stackup Agency', robots: { index: false } }

export default function Page() {
  return <Chantier titre="Outils de gestion" phase={5} />
}
