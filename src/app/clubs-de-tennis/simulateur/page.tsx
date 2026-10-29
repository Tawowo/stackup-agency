/**
 * /clubs-de-tennis/simulateur — le simulateur de prix dédié aux clubs (distinct de l'estimateur de /tarifs#estimer).
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import Accordeon from '@/components/editorial/Accordeon'
import Simulateur from '@/experiences/simulateur-clubs/Simulateur'
import { AppelFinal, PiedOffre } from '@/gabarits/clubs/composants'
import { arianeDe } from '@/gabarits/clubs/PageClub'
import { JsonLd, faqPage, filAriane, meta } from '@/lib/seo'
import { outilGratuit } from '@/lib/schema'
import { jetonsProfond } from '@/lib/jetons'
import { FAQ_CLUBS } from '@/data/offre-clubs/faq'
import { PRODUCT_NAME, RACINE_CLUBS } from '@/config/offre-clubs'
import '@/gabarits/clubs/clubs.css'

const CHEMIN = `${RACINE_CLUBS}/simulateur`

export const metadata = meta({
  titre: 'Simulateur de prix : site et logiciel de club de tennis',
  description: 'Estimez en deux minutes le prix du site et du logiciel de votre club de tennis : catégorie selon vos licenciés, options, 3 premiers mois, coût par licencié.',
  chemin: CHEMIN,
  image: '/og/clubs/simulateur.png',
})

const FAQ = jetonsProfond(FAQ_CLUBS.filter((q) => q.theme === 'prix').slice(0, 8))

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const q = await searchParams
  const initial = new URLSearchParams(Object.entries(q).flatMap(([k, v]) => (typeof v === 'string' ? [[k, v]] : []))).toString()
  const ariane = arianeDe({ chemin: CHEMIN, titre: 'Simulateur', famille: 'formule' })
  return (
    <>
      <JsonLd data={[filAriane(ariane.map((a) => ({ nom: a.nom, chemin: a.href }))), outilGratuit({ nom: `Simulateur de prix ${PRODUCT_NAME}`, description: 'Estimation indicative du prix du site et du logiciel d’un club de tennis.', chemin: CHEMIN }), faqPage(FAQ.map((f) => ({ q: f.q, a: f.a })))]} />
      <Document
        moment="clubs-simulateur"
        ariane={ariane}
        etiquette="Clubs de tennis · simulateur"
        titre="Combien coûterait la plateforme pour votre club ?"
        chapo="Cinq étapes, deux minutes : le nombre de licenciés fixe la catégorie, vous choisissez la formule et les options, et vous voyez tout de suite la mise en place, l’abonnement, les trois premiers mois et le coût par licencié. Estimation indicative ; le devis définitif suit un premier échange."
        large
      >
        <Simulateur initial={initial} />
        <div className="su-prose su-doc__prose" style={{ margin: '72px auto 0' }}>
          <h2>Comment le prix est calculé</h2>
          <p>
            Le simulateur lit la même grille que la page <Link href={`${RACINE_CLUBS}/tarifs`}>tarifs</Link> : la catégorie dépend des licenciés de la saison en cours, le pack site + logiciel est déjà remisé, les options s’ajoutent sans remise, et le paiement annuel retire 10 % sur tout l’abonnement. La mise en place comprend la formule, la mise en place des options et les heures d’accompagnement que vous prévoyez au-delà des heures incluses.
          </p>
          <h2>Questions sur le prix</h2>
          <Accordeon questions={FAQ.map((f) => ({ q: f.q, r: f.a }))} groupe="faq-simulateur" />
          <p>
            Toutes les questions : <Link href={`${RACINE_CLUBS}/faq`}>la FAQ des clubs</Link>.
          </p>
          <AppelFinal />
          <PiedOffre />
        </div>
      </Document>
    </>
  )
}
