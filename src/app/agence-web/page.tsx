import Locale from '@/gabarits/locale/Locale'
import { VILLES } from '@/data/villes'
import { DEPARTEMENTS } from '@/data/departements'
import { JsonLd, filAriane, meta } from '@/lib/seo'
import { SITE } from '@/config/site'

export const metadata = meta({
  titre: 'Agence web — les villes où l’on travaille',
  description: `Stackup Agency, agence web en Touraine (atelier à ${SITE.ville}) : sites et outils sur mesure pour les entreprises de ${VILLES.length} villes et ${DEPARTEMENTS.length} départements. Prix « à partir de », une démo avant de signer.`,
  chemin: '/agence-web',
})

export default function AgenceWeb() {
  return (
    <>
      <JsonLd data={filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Agence web', chemin: '/agence-web' }])} />
      <Locale
        moment="loc-index"
        forme="empile"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/agence-web', nom: 'Agence web' },
        ]}
        etiquette={`${VILLES.length} villes · ${DEPARTEMENTS.length} départements`}
        titre="Une agence web en Touraine, pour toute la région."
        intro="Le même atelier, les mêmes prix, la même démo avant de signer — que vous soyez à deux rues ou à deux heures de route."
        liens={{ titre: 'Les villes', items: VILLES.map((v) => ({ href: `/agence-web/${v.slug}`, nom: v.ville, note: v.departement })) }}
        points={{
          titre: 'Les départements',
          items: DEPARTEMENTS.map((d) => `${d.nom} (${d.code}) — chef-lieu ${d.chefLieu}`),
        }}
      />
    </>
  )
}
