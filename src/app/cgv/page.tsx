import type { Metadata } from 'next'
import Chantier from '@/gabarits/Chantier'

export const metadata: Metadata = { title: 'Conditions générales de vente — Stackup Agency', robots: { index: false } }

export default function Page() {
  return <Chantier titre="Conditions générales de vente" phase={6} />
}
