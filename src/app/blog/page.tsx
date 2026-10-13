import type { Metadata } from 'next'
import Kiosque from '@/experiences/journal/Kiosque'
import { RAYONS, tousLesArticles } from '@/lib/blog'
import { meta, filAriane, JsonLd } from '@/lib/seo'

// Les articles programmés (publishAt) paraissent à leur date sans redéploiement.
export const revalidate = 43200

export const metadata: Metadata = meta({
  titre: 'Blog — créer son site, être trouvé, vendre en ligne | Stackup Agency',
  description: 'Trois cents guides pour les artisans, commerçants et petites entreprises : création de site, référencement local, boutique en ligne, outils de gestion.',
  chemin: '/blog',
})

export default function Page() {
  return (
    <main>
      <JsonLd data={filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Blog', chemin: '/blog' }])} />
      <Kiosque articles={tousLesArticles()} rayons={RAYONS} />
    </main>
  )
}
