import type { Metadata } from 'next'
import Chantier from '@/gabarits/Chantier'

export const metadata: Metadata = { title: 'Politique de confidentialité — Stackup Agency', robots: { index: false } }

export default function Page() {
  return <Chantier titre="Politique de confidentialité" phase={6} />
}
