import { jetons } from '@/lib/jetons'
import type { Metadata } from 'next'
import Compilation from '@/experiences/compil/Compilation'
import Link from 'next/link'
import { meta, filAriane, JsonLd } from '@/lib/seo'
import { PILIER as CREATION } from '@/data/piliers/creation-de-site-internet'
import { PILIER as REFONTE } from '@/data/piliers/refonte-de-site-internet'
import { PILIER as REFERENCEMENT } from '@/data/piliers/referencement'
import { PILIER as LOCAL } from '@/data/piliers/referencement-local'
import { PILIER as ECOMMERCE } from '@/data/piliers/site-ecommerce'
import { PILIER as LOGICIEL } from '@/data/piliers/logiciel-de-gestion'
import { PILIER as IA } from '@/data/piliers/ia-et-automatisation'
import { PILIER as FACTURE } from '@/data/piliers/facture-electronique'
import { PILIER as MAINTENANCE } from '@/data/piliers/maintenance'

export const metadata: Metadata = meta({
  titre: 'Services — sites vitrines, boutiques et outils sur mesure | Stackup Agency',
  description: jetons('Site une page, site multi-pages, boutique en ligne, outil de gestion : quatre fabrications sur mesure, écrites à la main, à partir de {{prix:une-page}} €.'),
  chemin: '/services',
})

export default function Page() {
  return (
    <main data-lecture="1">
      <JsonLd data={filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Services', chemin: '/services' }])} />
      <Compilation />
      <section className="su-doc__corps" data-nuit="0" aria-labelledby="tous-services" style={{ padding: '3rem var(--su-gouttiere, 24px)' }}>
        <div className="su-prose su-doc__prose">
          <h2 id="tous-services">Tous les services, en détail</h2>
          <ul>
            {[CREATION, REFONTE, REFERENCEMENT, LOCAL, ECOMMERCE, LOGICIEL, IA, FACTURE, MAINTENANCE].map((p) => (
              <li key={p.slug}>
                <Link href={p.chemin}>{p.titre}</Link> — {jetons(p.reponse).split('. ')[0]}.
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
