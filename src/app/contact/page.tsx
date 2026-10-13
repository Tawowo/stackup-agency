import type { Metadata } from 'next'
import Chantier from '@/gabarits/Chantier'

export const metadata: Metadata = { title: 'Contact — Stackup Agency', robots: { index: false } }

export default function Page() {
  return <Chantier titre="Contact" phase={4} />
}
