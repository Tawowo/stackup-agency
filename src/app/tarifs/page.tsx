import type { Metadata } from 'next'
import Tarifs from '@/experiences/tarifs/Tarifs'
import { decoder } from '@/domain/devis/etat'
import { PRIX_PLANCHER } from '@/domain/devis/offres'

export const metadata: Metadata = {
  title: 'Tarifs — estimez votre projet · Stackup Agency',
  description: `Estimez votre site, votre boutique ou votre outil : une fourchette qui se précise à chaque choix, un site vitrine dès ${PRIX_PLANCHER()} €. Appel gratuit, démo avant de signer.`,
}

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const q = await searchParams
  const e = typeof q.e === 'string' ? q.e : null
  return <Tarifs initial={decoder(e)} />
}
