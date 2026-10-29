import type { Metadata } from 'next'
import { JsonLd, filAriane, meta } from '@/lib/seo'
import Formulaire from '@/experiences/contact/Formulaire'

export const metadata: Metadata = meta({
  titre: 'Contact et devis site internet sur mesure | Stackup Agency',
  description: 'Parlez de votre projet de site ou d’outil de gestion sur mesure : réponse personnelle de Mathéo Reboul, appel découverte gratuit, démo avant de signer.',
  chemin: '/contact',
})

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const q = await searchParams
  const s = (k: string) => (typeof q[k] === 'string' ? (q[k] as string) : '')
  return (
    <>
      <JsonLd data={filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Contact', chemin: '/contact' }])} />
      <Formulaire e={s('e') || null} action={s('a')} projet={s('projet').slice(0, 3000)} objet={s('objet')} />
    </>
  )
}
