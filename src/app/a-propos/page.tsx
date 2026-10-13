import type { Metadata } from 'next'
import Chantier from '@/gabarits/Chantier'

export const metadata: Metadata = { title: 'À propos — Stackup Agency', robots: { index: false } }

export default function Page() {
  return <Chantier titre="À propos" phase={5} />
}
