import type { Metadata } from 'next'
import LabBench from './LabBench'

export const metadata: Metadata = {
  title: 'Lab — Stack Engine',
  robots: { index: false, follow: false },
}

export default async function Lab({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const q = await searchParams
  return <LabBench hud={q.hud !== '0'} />
}
