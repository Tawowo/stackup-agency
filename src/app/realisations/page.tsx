import type { Metadata } from 'next'
import Hall from '@/experiences/galerie/Hall'
import { PROJETS } from '@/experiences/galerie/projets'
import { meta, filAriane, JsonLd, ORIGINE } from '@/lib/seo'

export const metadata: Metadata = meta({
  titre: 'Réalisations — un site en ligne et notre logiciel de gestion | Stackup Agency',
  description: 'Le site du Tennis Club Savigné-Gizeux, en ligne, et Artibox, le logiciel de gestion pour artisans, en développement : deux réalisations réelles, avec leurs vraies captures d’écran.',
  chemin: '/realisations',
})

export default function Page() {
  return (
    <main>
      <JsonLd
        data={[
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'Réalisations', chemin: '/realisations' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: PROJETS.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${ORIGINE}/realisations/${p.slug}`, name: p.nom })),
          },
        ]}
      />
      <Hall />
    </main>
  )
}
