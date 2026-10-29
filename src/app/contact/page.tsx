import type { Metadata } from 'next'
import { JsonLd, filAriane, meta } from '@/lib/seo'
import Formulaire from '@/experiences/contact/Formulaire'

export const metadata: Metadata = meta({
  titre: 'Contact — Stackup Agency',
  description: 'Parlez-nous de votre projet : site ou outil sur mesure. Réponse personnelle de Mathéo Reboul, démo avant signature.',
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
