import type { Metadata } from 'next'
import Chantier from '@/gabarits/Chantier'

export const metadata: Metadata = { title: 'Tarifs — Stackup Agency', robots: { index: false } }

export default function Page() {
  return <Chantier titre="Tarifs" phase={4} />
}
