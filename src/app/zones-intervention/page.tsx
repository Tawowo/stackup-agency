import Link from 'next/link'
import Locale from '@/gabarits/locale/Locale'
import VotreCommune, { type CommuneZone } from '@/components/zones/VotreCommune'
import CarteRelief from '@/components/carte/CarteRelief'
import type { Epingle } from '@/components/carte/epingles'
import { CHEF_LIEU, GEO } from '@/data/geo'
import { DEPARTEMENTS } from '@/data/departements'
import { VILLES } from '@/data/villes'
import { ZONES, distanceIndicative, modeIntervention, nbCommunes37 } from '@/data/zones'
import { JsonLd, ORIGINE, faqPage, filAriane, meta } from '@/lib/seo'
import { SITE } from '@/config/site'

export const metadata = meta({
  titre: 'Zones d’intervention : Touraine, Indre-et-Loire et au-delà',
  description: 'Les 11 communautés de communes d’Indre-et-Loire, les départements voisins et la visio partout en France. Tapez votre commune : distance et contact.',
  chemin: '/zones-intervention',
})

const FAQ = [
  { q: 'Où intervenez-vous exactement ?', a: `Mathéo Reboul travaille depuis Savigné-sur-Lathan, en Touraine. Les ${nbCommunes37()} communes d’Indre-et-Loire sont couvertes, réparties en ${ZONES.length} communautés de communes ; les départements voisins (Loir-et-Cher, Indre, Maine-et-Loire, Sarthe, Vienne) le sont aussi, avec plus de visio. Ailleurs en France, tout se fait à distance.` },
  { q: 'Pourquoi une page par communauté de communes et pas une page par commune ?', a: 'Parce qu’une page par commune où seul le nom change n’apporterait rien à personne, et Google le sanctionne. Chaque page de zone décrit un territoire réel, ses entreprises et ses besoins, et cite toutes ses communes. Le moteur « Votre commune » vous donne la réponse immédiate sans créer de page en double.' },
  { q: 'Faut-il se déplacer pour travailler ensemble ?', a: 'Non. Le premier échange, la démo, la maquette et le suivi se font très bien en visio et par écrit. Un rendez-vous sur place reste possible en Indre-et-Loire quand il apporte quelque chose : voir le local, prendre des photos, former l’équipe.' },
  { q: 'Les prix changent-ils selon la distance ?', a: 'Non : les prix « à partir de » sont les mêmes partout, ils dépendent de ce que vous commandez. Le devis précis se calcule dans l’estimateur ou lors de notre échange.' },
]

export default function Zones() {
  const total = nbCommunes37()
  const communes: CommuneZone[] = ZONES.flatMap((z) => {
    const km = z.slug === 'touraine-ouest-val-de-loire' ? 5 : distanceIndicative(z)
    return z.communes.map((nom) => ({ nom, zone: z.slug, zoneNom: z.court, km, surPlace: modeIntervention(km) === 'sur place ou visio' }))
  }).sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
  const epingles: Epingle[] = DEPARTEMENTS.map((d) => {
    const g = GEO[CHEF_LIEU[d.slug] ?? '']!
    return { id: d.slug, nom: g.nom, lat: g.lat, lon: g.lon, role: d.slug === 'indre-et-loire' ? ('cible' as const) : ('voisin' as const), href: `/agence-web/departement/${d.slug}` }
  }).filter((e) => e.nom)
  return (
    <>
      <JsonLd
        data={[
          filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Zones d’intervention', chemin: '/zones-intervention' }]),
          { '@context': 'https://schema.org', '@type': 'Service', name: 'Création de sites internet et d’outils de gestion sur mesure', provider: { '@id': `${ORIGINE}/#agence` }, areaServed: ZONES.map((z) => ({ '@type': 'AdministrativeArea', name: z.nom })) },
          faqPage(FAQ),
        ]}
      />
      <Locale
        moment="loc-zones"
        monde={<CarteRelief epingles={epingles} libelle="Carte des départements couverts, autour de la Touraine" />}
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/zones-intervention', nom: 'Zones d’intervention' },
        ]}
        etiquette={`${ZONES.length} communautés de communes · ${total.toLocaleString('fr-FR')} communes`}
        titre="La Touraine d’abord. Puis partout où l’on vous répond."
        intro="Mathéo Reboul travaille depuis Savigné-sur-Lathan, au nord-ouest de Tours. Chez vous, en visio, par écrit : la démo avant de signer et les prix sont les mêmes partout."
        sections={[
          { titre: 'Une page par territoire, pas une page par commune', paragraphes: [`L’Indre-et-Loire compte ${total} communes réparties en ${ZONES.length} communautés de communes. Chacune a sa page, qui décrit son territoire, ses entreprises et la façon d’y être trouvé, et qui cite toutes ses communes. Si vous cherchez la vôtre, le moteur ci-dessous vous répond tout de suite.`] },
        ]}
        apres={
          <>
            <VotreCommune communes={communes} telephone={SITE.telephone} lienTel={SITE.telephoneLien} />
            <section className="su-loc__bloc su-loc__bloc--large" aria-labelledby="zones-liste">
              <h2 id="zones-liste" className="su-loc__h2">
                Les {ZONES.length} communautés de communes d’Indre-et-Loire
              </h2>
              <ul className="su-loc__liens">
                {ZONES.map((z) => (
                  <li key={z.slug}>
                    <Link href={`/zones-intervention/${z.slug}`}>
                      {z.nom}
                      <span className="su-mono"> · {z.communes.length} communes</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </>
        }
        liens={{
          titre: 'Villes et départements',
          items: [...DEPARTEMENTS.map((d) => ({ href: `/agence-web/departement/${d.slug}`, nom: d.nom, note: d.code })), ...VILLES.map((v) => ({ href: `/agence-web/${v.slug}`, nom: `Agence web à ${v.ville}` }))],
        }}
        faq={FAQ}
      />
    </>
  )
}
