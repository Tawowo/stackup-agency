import Locale from '@/gabarits/locale/Locale'
import { CATEGORIES_METIERS, METIERS } from '@/data/metiers'
import { JsonLd, filAriane, meta } from '@/lib/seo'

export const metadata = meta({
  titre: 'Création de site internet par métier',
  description: `Un site pensé pour votre métier : ${METIERS.length} métiers de l’artisanat, du commerce, de la restauration, de la santé et des services. Prix « à partir de », une démo avant de signer.`,
  chemin: '/creation-site-internet',
})

export default function ParMetier() {
  const parCat = Object.entries(CATEGORIES_METIERS).map(([id, nom]) => ({ id, nom, metiers: METIERS.filter((m) => m.categorie === id) }))
  return (
    <>
      <JsonLd data={filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Création de site internet', chemin: '/creation-site-internet' }])} />
      <Locale
        moment="loc-metiers"
        forme="page"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/creation-site-internet', nom: 'Par métier' },
        ]}
        etiquette={`${METIERS.length} métiers`}
        titre="Un site qui parle votre métier."
        intro="Un plombier n’a pas les besoins d’un restaurant, ni une esthéticienne ceux d’un caviste. Choisissez le vôtre : on vous montre ce qu’on y met."
        communes={{ titre: 'Trouver votre métier', groupes: parCat.map((c) => ({ epci: c.nom, communes: c.metiers.map((m) => m.metier) })) }}
        liens={{ titre: 'Tous les métiers', items: METIERS.map((m) => ({ href: `/creation-site-internet/${m.slug}`, nom: m.metier })) }}
      />
    </>
  )
}
