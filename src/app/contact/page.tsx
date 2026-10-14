import type { Metadata } from 'next'
import Formulaire from '@/experiences/contact/Formulaire'

export const metadata: Metadata = {
  title: 'Contact — Stackup Agency',
  description: 'Parlez-nous de votre projet : site ou outil sur mesure. Réponse personnelle, démo avant signature.',
}

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const q = await searchParams
  const s = (k: string) => (typeof q[k] === 'string' ? (q[k] as string) : '')
  return <Formulaire e={s('e') || null} action={s('a')} projet={s('projet').slice(0, 3000)} objet={s('objet')} />
}
