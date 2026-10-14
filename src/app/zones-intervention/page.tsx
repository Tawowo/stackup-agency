import Locale from '@/gabarits/locale/Locale'
import CarteRelief from '@/components/carte/CarteRelief'
import type { Epingle } from '@/components/carte/epingles'
import { CHEF_LIEU, GEO } from '@/data/geo'
import { DEPARTEMENTS } from '@/data/departements'
import { VILLES } from '@/data/villes'
import { getCommunesGrandTotal } from '@/data/communes-groupes'
import { JsonLd, filAriane, meta } from '@/lib/seo'

const REGIONS: { nom: string; deps: string[] }[] = [
  { nom: 'Centre-Val de Loire', deps: ['indre-et-loire', 'loiret', 'loir-et-cher', 'eure-et-loir', 'cher', 'indre'] },
  { nom: 'Pays de la Loire', deps: ['sarthe', 'maine-et-loire'] },
  { nom: 'Nouvelle-Aquitaine', deps: ['vienne', 'deux-sevres', 'creuse'] },
  { nom: 'Bourgogne-Franche-Comté', deps: ['yonne', 'nievre'] },
  { nom: 'Auvergne-Rhône-Alpes', deps: ['allier'] },
  { nom: 'Normandie', deps: ['orne'] },
]

export const metadata = meta({
  titre: 'Zones d’intervention — Tours, la région, et toute la France',
  description: `L’atelier est à Tours. On travaille avec les entreprises de ${DEPARTEMENTS.length} départements autour, et à distance partout en France, aux mêmes prix.`,
  chemin: '/zones-intervention',
})

export default function Zones() {
  const total = getCommunesGrandTotal()
  const epingles: Epingle[] = DEPARTEMENTS.map((d) => {
    const g = GEO[CHEF_LIEU[d.slug] ?? '']!
    return { id: d.slug, nom: g.nom, lat: g.lat, lon: g.lon, role: d.slug === 'indre-et-loire' ? ('cible' as const) : ('voisin' as const), href: `/agence-web/departement/${d.slug}` }
  }).filter((e) => e.nom)
  return (
    <>
      <JsonLd data={filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Zones d’intervention', chemin: '/zones-intervention' }])} />
      <Locale
        moment="loc-zones"
        monde={<CarteRelief epingles={epingles} libelle="Carte des départements couverts, autour de Tours" />}
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/zones-intervention', nom: 'Zones d’intervention' },
        ]}
        etiquette={`${DEPARTEMENTS.length} départements · ${total.toLocaleString('fr-FR')} communes`}
        titre="Tours d’abord. Puis partout où l’on vous répond."
        intro="L’atelier est à Tours. Autour, on se déplace quand c’est utile ; plus loin, tout se fait en visio et par écrit — avec la même démo avant de signer et les mêmes prix."
        communes={{
          titre: 'Les départements, par région',
          groupes: REGIONS.map((r) => ({ epci: r.nom, communes: r.deps.map((s) => DEPARTEMENTS.find((d) => d.slug === s)?.nom ?? s) })),
        }}
        liens={{
          titre: 'Pages département et ville',
          items: [
            ...DEPARTEMENTS.map((d) => ({ href: `/agence-web/departement/${d.slug}`, nom: d.nom, note: d.code })),
            ...VILLES.map((v) => ({ href: `/agence-web/${v.slug}`, nom: v.ville })),
          ],
        }}
      />
    </>
  )
}
