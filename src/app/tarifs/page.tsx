import type { Metadata } from 'next'
import Tarifs from '@/experiences/tarifs/Tarifs'
import { deserialiser } from '@/lib/configuration'

export const metadata: Metadata = {
  title: 'Tarifs — le configurateur de pile · Stackup Agency',
  description: 'Choisissez ce qu’on empile : type de site ou d’outil, fonctions, options. Le plancher se recalcule, toujours « à partir de ».',
}

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const q = await searchParams
  const c = typeof q.c === 'string' ? q.c : null
  return <Tarifs initiale={deserialiser(c)} />
}
