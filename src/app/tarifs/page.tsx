import type { Metadata } from 'next'
import Tarifs from '@/experiences/tarifs/Tarifs'
import { decoder } from '@/domain/devis/etat'
import { JsonLd, filAriane, meta } from '@/lib/seo'
import { nombreFr } from '@/lib/jetons'
import { PRIX_PLANCHER } from '@/domain/devis/offres'

export const metadata: Metadata = meta({
  titre: 'Tarifs — estimez votre projet · Stackup Agency',
  description: `Estimez votre site, votre boutique ou votre outil : une fourchette qui se précise à chaque choix, un site vitrine dès ${nombreFr(PRIX_PLANCHER())} €. Appel gratuit, démo avant de signer.`,
  chemin: '/tarifs',
})

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const q = await searchParams
  const e = typeof q.e === 'string' ? q.e : null
  return (
    <>
      <JsonLd data={filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Tarifs', chemin: '/tarifs' }])} />
      <Tarifs initial={decoder(e)} />
    </>
  )
}
