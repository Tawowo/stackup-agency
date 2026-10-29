/**
 * /clubs-de-tennis/guides — le sommaire des guides pour les clubs (articles de fond).
 */
import Document from '@/gabarits/document/Document'
import { AppelFinal, GrilleLiens, PiedOffre } from '@/gabarits/clubs/composants'
import { arianeDe } from '@/gabarits/clubs/PageClub'
import { JsonLd, ORIGINE, filAriane, meta } from '@/lib/seo'
import { jetons } from '@/lib/jetons'
import { GUIDES } from '@/data/offre-clubs/pages'
import { RACINE_CLUBS } from '@/config/offre-clubs'
import '@/gabarits/clubs/clubs.css'

const CHEMIN = `${RACINE_CLUBS}/guides`

export const metadata = meta({
  titre: 'Guides pour les clubs de tennis : site, adhésions, école',
  description: 'Guides pratiques pour les bureaux de clubs de tennis : site du club, réinscriptions en ligne, école de tennis, ADOC, HelloAsso, challenge, équipes, RGPD, financement.',
  chemin: CHEMIN,
  image: '/og/clubs/guides.png',
})

export default function Page() {
  const ariane = arianeDe({ chemin: CHEMIN, titre: 'Guides', famille: 'formule' })
  return (
    <>
      <JsonLd
        data={[
          filAriane(ariane.map((a) => ({ nom: a.nom, chemin: a.href }))),
          { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Guides pour les clubs de tennis', url: `${ORIGINE}${CHEMIN}`, hasPart: GUIDES.map((g) => ({ '@type': 'Article', headline: jetons(g.titre), url: `${ORIGINE}${g.chemin}` })) },
        ]}
      />
      <Document moment="clubs-guides" ariane={ariane} etiquette="Clubs de tennis · guides" titre="Des guides pour les bureaux de bénévoles." chapo="Des méthodes concrètes, utiles même sans logiciel : créer le site du club, organiser les réinscriptions, tenir une école de tennis, échanger avec ADOC, encaisser avec HelloAsso, faire jouer les membres, convoquer les équipes, respecter le RGPD, financer le numérique." large={false}>
        <GrilleLiens id="guides" titre="Tous les guides" liens={GUIDES.map((g) => ({ href: g.chemin, nom: jetons(g.titre), note: jetons(g.reponse).split('. ')[0] + '.' }))} />
        <AppelFinal />
        <PiedOffre />
      </Document>
    </>
  )
}
