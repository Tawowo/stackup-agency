import { notFound } from 'next/navigation'
import PageClub, { metaPageClub } from '@/gabarits/clubs/PageClub'
import { GUIDES } from '@/data/offre-clubs/pages'

type Params = { slug: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return GUIDES.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const p = GUIDES.find((x) => x.slug === slug)
  return p ? metaPageClub(p) : {}
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const p = GUIDES.find((x) => x.slug === slug)
  if (!p) notFound()
  return <PageClub page={p} />
}
