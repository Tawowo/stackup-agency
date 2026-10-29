import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Fiche from '@/experiences/galerie/Fiche'
import { PROJETS, projetDe } from '@/experiences/galerie/projets'
import { meta, filAriane, JsonLd } from '@/lib/seo'
import { realisation, logiciel } from '@/lib/schema'

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
          realisation({ nom: p.nom, chemin: `/realisations/${p.slug}`, description: p.description, image: p.capture, url: /^https?:/.test(p.url) ? p.url : undefined, genre: p.type }),
          ...(p.statut === 'En développement' || /logiciel|gestion/i.test(p.type) ? [logiciel({ nom: p.nom, description: p.description, chemin: `/realisations/${p.slug}`, offre: 'outil', image: p.capture })] : []),
        ]}
      />
      <Fiche projet={p} suivant={{ slug: suivant.slug, nom: suivant.nom }} />
    </main>
  )
}
