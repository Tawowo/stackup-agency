import type { Metadata } from 'next'
import Merci from '@/experiences/contact/Merci'

export const metadata: Metadata = { title: 'Message reçu — Stackup Agency', robots: { index: false } }

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const q = await searchParams
  return <Merci envoye={q.envoye === '1'} />
}
