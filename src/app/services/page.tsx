import { jetons } from '@/lib/jetons'
import type { Metadata } from 'next'
import Compilation from '@/experiences/compil/Compilation'
import { meta, filAriane, JsonLd } from '@/lib/seo'

export const metadata: Metadata = meta({
  titre: 'Services — sites vitrines, boutiques et outils sur mesure | Stackup Agency',
  description: jetons('Site une page, site multi-pages, boutique en ligne, outil de gestion : quatre fabrications sur mesure, écrites à la main, à partir de {{prix:une-page}} €.'),
  chemin: '/services',
})

export default function Page() {
  return (
    <main>
      <JsonLd data={filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Services', chemin: '/services' }])} />
      <Compilation />
    </main>
  )
}
