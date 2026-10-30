/**
 * /clubs-de-tennis — la grande page de l'offre (celle envoyée par e-mail aux clubs). Voir src/experiences/clubs/Offre.tsx.
 */
import Offre from '@/experiences/clubs/Offre'
import { JsonLd, faqPage, filAriane, meta } from '@/lib/seo'
import { jetonsProfond } from '@/lib/jetons'
import { howTo, logicielClubs, serviceClubs } from '@/gabarits/clubs/schema'
import { FAQ_CLUBS } from '@/data/offre-clubs/faq'
import { CATEGORIES, tarif } from '@/data/offre-clubs/pricing'
import { PRODUCT_NAME, PROMESSE, RACINE_CLUBS } from '@/config/offre-clubs'

export const metadata = meta({
  titre: 'Site et logiciel de gestion pour club de tennis',
  description: `Le site de votre club et le logiciel du bureau, connectés en direct : adhésions en ligne, HelloAsso, école de tennis, fichiers ADOC. Dès ${tarif(CATEGORIES[0]!, 'site').mois} €/mois.`,
  chemin: RACINE_CLUBS,
  image: '/og/clubs.png',
})

const FAQ = jetonsProfond(FAQ_CLUBS.filter((q) => q.essentielle))

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'Clubs de tennis', chemin: RACINE_CLUBS },
          ]),
          serviceClubs({ nom: `${PRODUCT_NAME} : site et logiciel pour clubs de tennis`, chemin: RACINE_CLUBS, description: `${PROMESSE.titre} ${PROMESSE.sousTitre}` }),
          logicielClubs(),
          faqPage(FAQ.map((f) => ({ q: f.q, a: f.a }))),
          howTo('Mettre en place la plateforme dans un club de tennis', [
            { titre: 'Un premier échange', texte: 'Un appel de 30 minutes ou un rendez-vous au club.' },
            { titre: 'Le justificatif des licenciés', texte: 'Un export ADOC ou le rapport d’assemblée générale avec les trois dernières saisons.' },
            { titre: 'Le devis', texte: 'Un devis écrit et ferme, à partir de la grille publique.' },
            { titre: 'La mise en place', texte: 'Thème, pages, import des membres ; délai indicatif.' },
            { titre: 'La formation', texte: 'Les heures d’accompagnement incluses.' },
            { titre: 'La mise en ligne', texte: 'Publication du site et accès des adhérents à l’espace membre.' },
            { titre: 'Le suivi', texte: 'Support, mises à jour et nouvelles fonctionnalités de la formule.' },
          ]),
        ]}
      />
      <Offre />
    </>
  )
}
