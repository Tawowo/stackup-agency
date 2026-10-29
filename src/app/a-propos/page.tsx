import type { Metadata } from 'next'
import AtelierNuit from '@/experiences/atelier-nuit/AtelierNuit'
import { SITE } from '@/config/site'
import { meta, filAriane, JsonLd, ORIGINE } from '@/lib/seo'

export const metadata: Metadata = meta({
  titre: `À propos — ${SITE.fondateur}, l’atelier Stackup Agency en Touraine`,
  description: `${SITE.fondateur} conçoit, code et met en ligne des sites et des outils sur mesure pour les artisans, commerçants et petites entreprises, depuis la Touraine, à Savigné-sur-Lathan.`,
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
          { '@context': 'https://schema.org', '@type': 'ProfilePage', '@id': `${ORIGINE}/a-propos#page`, url: `${ORIGINE}/a-propos`, name: `À propos de ${SITE.fondateur}`, inLanguage: 'fr-FR', mainEntity: { '@id': `${ORIGINE}/#matheo` }, about: { '@id': `${ORIGINE}/#agence` } },
        ]}
      />
      <AtelierNuit />
    </main>
  )
}
