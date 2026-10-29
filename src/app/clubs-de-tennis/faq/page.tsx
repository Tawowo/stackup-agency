/**
 * /clubs-de-tennis/faq — toutes les questions des présidents, trésoriers et secrétaires, regroupées par thème.
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import Accordeon from '@/components/editorial/Accordeon'
import { AppelFinal, PiedOffre } from '@/gabarits/clubs/composants'
import { arianeDe } from '@/gabarits/clubs/PageClub'
import { JsonLd, faqPage, filAriane, meta } from '@/lib/seo'
import { jetonsProfond } from '@/lib/jetons'
import { FAQ_CLUBS, THEMES_FAQ } from '@/data/offre-clubs/faq'
import { PRODUCT_NAME, RACINE_CLUBS } from '@/config/offre-clubs'
import '@/gabarits/clubs/clubs.css'

const CHEMIN = `${RACINE_CLUBS}/faq`

export const metadata = meta({
  titre: 'FAQ : site et logiciel de club de tennis',
  description: `Prix, catégorie, contrat, données, ADOC, HelloAsso, démo : toutes les réponses sur ${PRODUCT_NAME}, la plateforme des clubs de tennis, pour présidents et trésoriers.`,
  chemin: CHEMIN,
  image: '/og/clubs/faq.png',
})

const FAQ = jetonsProfond(FAQ_CLUBS)

export default function Page() {
  const ariane = arianeDe({ chemin: CHEMIN, titre: 'Questions fréquentes', famille: 'formule' })
  const themes = THEMES_FAQ.filter((t) => FAQ.some((q) => q.theme === t.id))
  return (
    <>
      <JsonLd data={[filAriane(ariane.map((a) => ({ nom: a.nom, chemin: a.href }))), faqPage(FAQ.map((f) => ({ q: f.q, a: f.a })))]} />
      <Document
        moment="clubs-faq"
        ariane={ariane}
        etiquette="Clubs de tennis · questions fréquentes"
        titre="Les questions des présidents et des trésoriers."
        chapo={`${FAQ.length} réponses courtes et concrètes sur l’offre, les prix, le contrat, les données du club, ADOC, HelloAsso et la démo. Une question manque ? Écrivez-la : elle rejoindra la liste.`}
        sommaire={[{ id: 'essentielles', titre: 'Les plus fréquentes' }, ...themes.map((t) => ({ id: t.id, titre: t.titre }))]}
      >
        <section id="essentielles" aria-labelledby="essentielles-t">
          <h2 id="essentielles-t">Les plus fréquentes</h2>
          <Accordeon questions={FAQ.filter((q) => q.essentielle).map((f) => ({ q: f.q, r: f.a }))} groupe="faq-clubs-essentielles" />
        </section>
        {themes.map((t) => (
          <section key={t.id} id={t.id} aria-labelledby={`${t.id}-t`} className="cl-bloc">
            <h2 id={`${t.id}-t`}>{t.titre}</h2>
            <Accordeon questions={FAQ.filter((q) => q.theme === t.id && !q.essentielle).map((f) => ({ q: f.q, r: f.a }))} groupe={`faq-clubs-${t.id}`} />
          </section>
        ))}
        <p className="cl-bloc">
          Pour aller plus loin : <Link href={`${RACINE_CLUBS}/tarifs`}>les tarifs</Link>, <Link href={`${RACINE_CLUBS}/simulateur`}>le simulateur</Link>, <Link href={`${RACINE_CLUBS}/demo`}>la démo</Link> et <Link href="/cgv-plateforme">les conditions de la plateforme</Link>.
        </p>
        <AppelFinal />
        <PiedOffre />
      </Document>
    </>
  )
}
