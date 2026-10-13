import type { Metadata } from 'next'
import Hall from '@/experiences/galerie/Hall'
import { PROJETS } from '@/experiences/galerie/projets'
import { meta, filAriane, JsonLd, ORIGINE } from '@/lib/seo'

export const metadata: Metadata = meta({
  titre: 'Réalisations — la galerie des démos | Stackup Agency',
  description: 'Sept démonstrations complètes de sites et d’outils sur mesure, une par métier : boulangerie, hôtel, boutique, immobilier, restaurant, vidéaste, domaine viticole.',
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
