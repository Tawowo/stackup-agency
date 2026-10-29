import { notFound } from 'next/navigation'
import Locale from '@/gabarits/locale/Locale'
import { sansDelai } from '@/gabarits/locale/formes'
import { ZONES, distanceIndicative, modeIntervention, zone } from '@/data/zones'
import { VILLES } from '@/data/villes'
import { JsonLd, ORIGINE, faqPage, filAriane, meta, offreService } from '@/lib/seo'
import { SITE } from '@/config/site'

export const dynamicParams = false
export function generateStaticParams() {
  return ZONES.map((z) => ({ epci: z.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ epci: string }> }) {
  const z = zone((await params).epci)
  if (!z) return {}
  return meta({ titre: z.contenu.titleSeo, description: z.contenu.descriptionSeo, chemin: `/zones-intervention/${z.slug}` })
}

/** « A, B et C » */
const liste = (l: string[]) => (l.length < 2 ? l.join('') : `${l.slice(0, -1).join(', ')} et ${l.at(-1)}`)

export default async function PageZone({ params }: { params: Promise<{ epci: string }> }) {
  const z = zone((await params).epci)
  if (!z) notFound()
  const c = z.contenu
  const km = distanceIndicative(z)
  const sur = z.slug === 'touraine-ouest-val-de-loire'
  const villesDeLaZone = VILLES.filter((v) => z.communes.some((n) => n.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z]+/g, '-') === v.slug))
  const voisines = c.voisines.map((s) => ZONES.find((x) => x.slug === s)).filter((x): x is NonNullable<typeof x> => !!x)
  const repere = sur
    ? `Cette zone est celle de l’atelier : Mathéo Reboul travaille depuis Savigné-sur-Lathan, l’une des ${z.communes.length} communes de ${z.court}. Pas de déplacement à prévoir : rendez-vous sur place chez vous, ou en visio.`
    : `Depuis Savigné-sur-Lathan, comptez environ ${km} km par la route jusqu’à ${c.centre} (estimation) : rendez-vous ${modeIntervention(km) === 'sur place ou visio' ? 'sur place possible, ou en visio, au choix' : 'en visio, avec un déplacement possible pour une étape clé'}. La démo avant de signer, les prix et le suivi sont les mêmes partout.`
  const faq = sansDelai([
    { q: `Intervenez-vous dans toutes les communes de ${z.court} ?`, a: `Oui : les ${z.communes.length} communes de ${z.court} sont couvertes (${liste(z.communes)}). Il n’y a pas de page par commune : cette page sert pour toute la zone.` },
    ...c.faq,
  ])
  const sections = [
    { titre: 'Où et comment on travaille ici', paragraphes: [repere] },
    ...c.sections,
    { titre: `Les ${z.communes.length} communes de ${z.court}`, paragraphes: [`Stackup Agency travaille avec les artisans, commerçants et petites entreprises de ${liste(z.communes)}.`] },
  ]
  return (
    <>
      <JsonLd
        data={[
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'Zones d’intervention', chemin: '/zones-intervention' },
            { nom: z.court, chemin: `/zones-intervention/${z.slug}` },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: c.titreH1,
            serviceType: 'Création de sites internet et d’outils de gestion sur mesure',
            provider: { '@id': `${ORIGINE}/#agence` },
            url: `${ORIGINE}/zones-intervention/${z.slug}`,
            offers: offreService('une-page'),
            areaServed: [{ '@type': 'AdministrativeArea', name: z.nom }, ...z.communes.map((n) => ({ '@type': 'City', name: n, containedInPlace: { '@type': 'AdministrativeArea', name: z.nom } }))],
          },
          faqPage(faq),
        ]}
      />
      <Locale
        moment="loc-zone"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/zones-intervention', nom: 'Zones d’intervention' },
          { href: `/zones-intervention/${z.slug}`, nom: z.court },
        ]}
        etiquette={`${z.communes.length} communes · Indre-et-Loire · ${SITE.ville} à ${km} km`.replace(`${SITE.ville} à ${km} km`, sur ? 'zone de l’atelier' : `${c.centre}, environ ${km} km`)}
        titre={c.titreH1}
        intro={c.intro}
        sections={sections}
        offres={false}
        liens={{
          titre: 'Autour de vous',
          items: [
            ...villesDeLaZone.map((v) => ({ href: `/agence-web/${v.slug}`, nom: `Agence web à ${v.ville}` })),
            ...voisines.map((v) => ({ href: `/zones-intervention/${v.slug}`, nom: v.court, note: 'zone voisine' })),
            { href: '/agence-web/departement/indre-et-loire', nom: 'Tout l’Indre-et-Loire', note: '37' },
            { href: '/zones-intervention', nom: 'Toutes les zones, et votre commune' },
          ],
        }}
        faq={faq}
      />
    </>
  )
}
