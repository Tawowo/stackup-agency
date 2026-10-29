import type { Metadata } from 'next'
import Tarifs from '@/experiences/tarifs/Tarifs'
import { decoder } from '@/domain/devis/etat'
import { JsonLd, filAriane, meta } from '@/lib/seo'
import { outilGratuit } from '@/lib/schema'
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
      <JsonLd data={[filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Tarifs', chemin: '/tarifs' }]), outilGratuit({ nom: 'Estimateur de prix de site internet et d’outil de gestion', description: 'Composez votre projet pas à pas : le prix « à partir de » se calcule avec la même grille que le devis.', chemin: '/tarifs' })]} />
      <Tarifs initial={decoder(e)} />
    </>
  )
}
