import type { Metadata } from 'next'
import AtelierNuit from '@/experiences/atelier-nuit/AtelierNuit'
import { SITE } from '@/config/site'
import { meta, filAriane, JsonLd, ORIGINE } from '@/lib/seo'

export const metadata: Metadata = meta({
  titre: `À propos — ${SITE.fondateur}, l’atelier Stackup Agency à Tours`,
  description: `${SITE.fondateur} conçoit, code et met en ligne des sites et des outils sur mesure pour les artisans, commerçants et petites entreprises, depuis Tours.`,
  chemin: '/a-propos',
})

export default function Page() {
  return (
    <main>
      <JsonLd
        data={[
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'À propos', chemin: '/a-propos' },
          ]),
          { '@context': 'https://schema.org', '@type': 'Person', name: SITE.fondateur, jobTitle: 'Fondateur, développeur', worksFor: { '@id': `${ORIGINE}/#agence` }, address: { '@type': 'PostalAddress', addressLocality: 'Tours', addressCountry: 'FR' } },
        ]}
      />
      <AtelierNuit />
    </main>
  )
}
