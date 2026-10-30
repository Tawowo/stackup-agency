import PageClubs from '@/gabarits/clubs/PageClubs'
import { LiensOffre, MentionFft } from '@/gabarits/clubs/blocs'
import Simulateur from '@/experiences/clubs/Simulateur'
import { CLUBS } from '@/config/offre-clubs'
import { metaClubs } from '@/lib/clubs'
import { serviceClubs } from '@/lib/schema-clubs'
import { ORIGINE } from '@/lib/seo'

const CHEMIN = `${CLUBS}/simulateur`
export const metadata = metaClubs({
  titre: 'Simulateur de prix pour club de tennis',
  description: 'Estimez en cinq étapes le prix du site et du logiciel de votre club selon vos licenciés : mise en place, abonnement, trois premiers mois, coût par licencié.',
  chemin: CHEMIN,
})

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  // Un lien partagé réinstalle la simulation : l'état se lit dans l'URL, côté serveur, donc sans écart au chargement.
  const q = await searchParams
  const initial = Object.fromEntries(Object.entries(q).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]))
  return (
    <PageClubs
      moment="clubs-simulateur"
      chemin={CHEMIN}
      etiquette="Le simulateur"
      titre="Estimez le prix pour votre club"
      chapo="Cinq étapes, un résumé qui se met à jour à chaque choix. Vous pouvez envoyer l’estimation par e-mail, la partager avec votre trésorier ou demander un devis."
      maj="2026-10-30"
      schema={[
        {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          '@id': `${ORIGINE}${CHEMIN}#outil`,
          name: 'Simulateur de prix pour clubs de tennis',
          url: `${ORIGINE}${CHEMIN}`,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web (tous navigateurs)',
          inLanguage: 'fr-FR',
          isAccessibleForFree: true,
          author: { '@id': `${ORIGINE}/#agence` },
          publisher: { '@id': `${ORIGINE}/#agence` },
          offers: { '@type': 'Offer', price: 0, priceCurrency: 'EUR' },
        },
        serviceClubs({ chemin: CHEMIN, nom: 'Simulateur de prix de l’offre pour clubs de tennis' }),
      ]}
    >
      <Simulateur initial={initial} />
      <LiensOffre />
      <MentionFft />
    </PageClubs>
  )
}
