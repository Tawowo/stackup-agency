import { nombreFr } from '@/lib/jetons'
import { notFound } from 'next/navigation'
import { CATEGORIES_METIERS, METIERS, getMetier } from '@/data/metiers'
import { SERVICES } from '@/data/services'
import Locale from '@/gabarits/locale/Locale'
import MondeMetier from '@/components/maquettes/MondeMetier'
import type { MetierBloc } from '@/components/maquettes/blocs'
import { sansDelai } from '@/gabarits/locale/formes'
import { CONTENU_METIERS } from '@/data/enrichissements'
import { conforme, conformeListe } from '@/lib/conformite'
import { JsonLd, faqPage, filAriane, meta } from '@/lib/seo'
import { service as schemaService } from '@/lib/schema'
import { offre } from '@/config/site'
import { METIERS_VOISINS } from '@/data/metiers-voisins'

export const dynamicParams = false
export function generateStaticParams() {
  return METIERS.map((m) => ({ metier: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ metier: string }> }) {
  const m = getMetier((await params).metier)
  if (!m) return {}
  return meta({
    titre: `Création de site internet pour ${m.metier.toLowerCase()}`,
    description: conforme(`${m.intro.slice(0, 120)}… Site à partir de ${nombreFr(offre('une-page').aPartirDe)} €, une démo avant de signer.`),
    chemin: `/creation-site-internet/${m.slug}`,
  })
}

const CATEGORIE: Record<string, { picto: MetierBloc['picto']; teinte: string }> = {
  restauration: { picto: 'couvert', teinte: '#b4532a' },
  'artisanat-btp': { picto: 'marteau', teinte: '#8a5a2b' },
  commerce: { picto: 'sac', teinte: '#2f6f5e' },
  'sante-bien-etre': { picto: 'etoile', teinte: '#3d7f9e' },
  services: { picto: 'dossier', teinte: '#1f4c97' },
  tourisme: { picto: 'calendrier', teinte: '#7a4a9e' },
  creatifs: { picto: 'etoile', teinte: '#a23f6b' },
}
const majuscule = (t: string) => t.charAt(0).toUpperCase() + t.slice(1)

export default async function PageMetier({ params }: { params: Promise<{ metier: string }> }) {
  const m = getMetier((await params).metier)
  if (!m) notFound()
  const local = CONTENU_METIERS[m.slug]
  const faq = sansDelai([...m.faq, ...(local?.faq ?? [])].map((f) => ({ q: f.q, a: conforme(f.a) })))
  const service = SERVICES[m.serviceLie]
  const cat = CATEGORIE[m.categorie] ?? CATEGORIE.services!
  const premiere = conforme(m.intro).split(/(?<=[.!?])\s/)[0] ?? ''
  const monde: MetierBloc = {
    nom: majuscule(m.metier),
    accroche: premiere.length > 74 ? `Le site de votre ${m.metier}` : premiere,
    etiquette: CATEGORIES_METIERS[m.categorie] ?? 'Métier',
    cartes: conformeListe(m.inclus),
    picto: cat.picto,
    teinte: cat.teinte,
  }
  const voisins = METIERS_VOISINS[m.slug] ?? []
  const listeVoisins = voisins.length > 1 ? `${voisins.slice(0, -1).join(', ')} et ${voisins.at(-1)}` : (voisins[0] ?? '')
  const proches = METIERS.filter((x) => x.categorie === m.categorie && x.slug !== m.slug).slice(0, 10)
  return (
    <>
      <JsonLd
        data={[
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'Création de site internet', chemin: '/creation-site-internet' },
            { nom: m.metier, chemin: `/creation-site-internet/${m.slug}` },
          ]),
          schemaService({ nom: `Création de site internet pour ${m.metier.toLowerCase()}`, chemin: `/creation-site-internet/${m.slug}`, description: conforme(m.intro).split(/(?<=[.!?])\s/)[0], audience: m.metier, offre: ({ 'site-multi-pages': 'multi-pages', 'site-ecommerce': 'boutique', 'systeme-gestion': 'outil' } as Record<string, 'multi-pages' | 'boutique' | 'outil'>)[m.serviceLie] ?? 'une-page' }),
          faqPage(faq),
        ]}
      />
      <Locale
        moment="loc-metier"
        monde={<MondeMetier metier={monde} />}
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/creation-site-internet', nom: 'Par métier' },
          { href: `/creation-site-internet/${m.slug}`, nom: m.metier },
        ]}
        etiquette={CATEGORIES_METIERS[m.categorie] ?? 'Métier'}
        titre={`Le site internet de votre ${m.metier.toLowerCase().replace(/s$/, '')}.`.replace('votre votre', 'votre')}
        intro={conforme(m.intro)}
        sections={local?.sections}
        apres={
          voisins.length > 0 ? (
            <section className="su-loc__bloc">
              <h2 className="su-loc__h2">Un métier voisin ? Cette page vous concerne aussi</h2>
              <p className="su-loc__long">
                Si vous êtes {listeVoisins}, vos besoins en ligne ressemblent à ceux décrits ici : être trouvé près de chez vous, montrer votre travail, faciliter la prise de contact. Le site, la fiche Google et les outils de gestion se construisent à partir de votre activité réelle : décrivez-la lors de l’échange et la démo de votre page d’accueil portera vos mots.
              </p>
            </section>
          ) : undefined
        }
        fonctions={{ titre: 'Ce qu’on y met', items: conformeListe(m.inclus).map((nom) => ({ nom })) }}
        liens={{
          titre: 'Pour aller plus loin',
          items: [...(service ? [{ href: `/services/${m.serviceLie}`, nom: service.title, note: 'l’offre' }] : []), { href: '/realisations', nom: 'Les démos', note: 'galerie' }, ...proches.map((p) => ({ href: `/creation-site-internet/${p.slug}`, nom: p.metier }))],
        }}
        faq={faq}
      />
    </>
  )
}
