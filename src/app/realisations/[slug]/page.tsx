import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Fiche from '@/experiences/galerie/Fiche'
import { PROJETS, projetDe } from '@/experiences/galerie/projets'
import { meta, filAriane, JsonLd, ORIGINE } from '@/lib/seo'

export function generateStaticParams() {
  return PROJETS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = projetDe((await params).slug)
  if (!p) return {}
  return meta({ titre: `${p.nom} — ${p.type.toLowerCase()} | Stackup Agency`, description: p.description, chemin: `/realisations/${p.slug}`, image: p.capture })
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const p = projetDe((await params).slug)
  if (!p) notFound()
  const i = PROJETS.indexOf(p)
  const suivant = PROJETS[(i + 1) % PROJETS.length]!
  return (
    <main>
      <JsonLd
        data={[
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'Réalisations', chemin: '/realisations' },
            { nom: p.nom, chemin: `/realisations/${p.slug}` },
          ]),
          { '@context': 'https://schema.org', '@type': 'CreativeWork', name: p.nom, url: `${ORIGINE}/realisations/${p.slug}`, image: `${ORIGINE}${p.capture}`, creator: { '@id': `${ORIGINE}/#agence` }, description: p.description },
        ]}
      />
      <Fiche projet={p} suivant={{ slug: suivant.slug, nom: suivant.nom }} />
    </main>
  )
}
