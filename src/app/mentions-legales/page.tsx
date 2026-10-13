import type { Metadata } from 'next'
import Chantier from '@/gabarits/Chantier'

export const metadata: Metadata = { title: 'Mentions légales — Stackup Agency', robots: { index: false } }

export default function Page() {
  return <Chantier titre="Mentions légales" phase={6} />
}
