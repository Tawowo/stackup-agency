/**
 * /parrainage — le programme tel que l'ancien site le décrivait (une seule
 * version : celle de l'ancien SITE.parrainage), trois temps, les deux
 * récompenses, le formulaire, la FAQ (JSON-LD FAQPage).
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import Accordeon from '@/components/editorial/Accordeon'
import Plaque from '@/components/ui/Plaque'
import Parrainage from '@/experiences/ressources/Parrainage'
import { JsonLd, faqPage, filAriane, meta } from '@/lib/seo'
import '@/experiences/ressources/ressources.css'

/*
 * CONDITIONS DU PARRAINAGE — reprises telles quelles de l'ancien site
 * (ancien/src/config/site.ts › parrainage, et la page /parrainage) : le filleul
 * a −10 % sur son premier projet ; le parrain choisit, par filleul signé, entre
 * un mois d'abonnement Premium offert et −10 % sur sa propre prestation non
 * encore signée. Volontairement hors de site.ts (consigne de session). L'abonnement
 * étant composé à la carte, la récompense est « un mois d'abonnement offert ».
 */
const FILLEUL_REMISE = 10
const PARRAIN_REMISE = 10
const RECOMPENSE_A = '1 mois de votre abonnement offert'
const RECOMPENSE_B = `−${PARRAIN_REMISE} % sur votre propre prestation non encore signée`

export const metadata = meta({
  titre: `Parrainage — un mois d’abonnement offert ou −${PARRAIN_REMISE} % | Stackup Agency`,
  description: `Recommandez Stackup Agency à un professionnel. À la signature de son projet, vous choisissez : ${RECOMPENSE_A} ou −${PARRAIN_REMISE} % sur votre prestation. Votre filleul : −${FILLEUL_REMISE} % sur son premier projet.`,
  chemin: '/parrainage',
})

const TEMPS = [
  {
    titre: 'Vous nous signalez la mise en relation',
    texte: 'Parlez de nous à un professionnel qui a besoin d’un site ou d’un outil, et signalez-le-nous avant qu’il signe son devis, avec le formulaire ci-dessous.',
  },
  {
    titre: 'Votre filleul signe son projet',
    texte: 'Votre filleul, un nouveau client, signe son devis. C’est cette signature qui déclenche votre récompense.',
  },
  {
    titre: 'Vous choisissez votre récompense',
    texte: `${RECOMPENSE_A}, ou ${RECOMPENSE_B}. Une récompense par filleul signé.`,
  },
]

const FAQ = [
  {
    q: 'Quelle est la récompense du parrain ?',
    r: `À la signature du projet de votre filleul, vous choisissez : ${RECOMPENSE_A}, ou ${RECOMPENSE_B}. Une récompense par filleul signé, cumulable sur plusieurs filleuls.`,
  },
  {
    q: 'Quelle est la remise du filleul ?',
    r: `Votre filleul a −${FILLEUL_REMISE} % sur son premier projet, si la mise en relation a été signalée avant la signature de son devis. Il doit être un nouveau client.`,
  },
  {
    q: 'Le parrainage est-il cumulable ?',
    r: `Oui pour le parrain : une récompense par filleul signé, sur autant de filleuls que vous voulez. La remise du filleul (−${FILLEUL_REMISE} %) ne se cumule pas avec une autre offre.`,
  },
  {
    q: 'Quand la récompense est-elle activée ?',
    r: `À la signature du projet de votre filleul, à condition que la mise en relation ait été signalée avant. La remise de −${PARRAIN_REMISE} % ne s’applique qu’à une prestation pas encore signée ni payée : si tout est déjà réglé de votre côté, la récompense est le mois d’abonnement offert.`,
  },
]

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const q = await searchParams
  const resultat = q.merci === '1' ? 'merci' : q.erreur === '1' ? 'erreur' : null
  return (
    <>
      <JsonLd
        data={[
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'Parrainage', chemin: '/parrainage' },
          ]),
          faqPage(FAQ.map((x) => ({ q: x.q, a: x.r }))),
        ]}
      />
      <Document
        moment="doc-parrainage"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/parrainage', nom: 'Parrainage' },
        ]}
        etiquette="Parrainage"
        titre="Recommandez un professionnel. Choisissez votre récompense."
        chapo={`À la signature de son projet : ${RECOMPENSE_A}, ou −${PARRAIN_REMISE} % sur votre propre prestation. Votre filleul a −${FILLEUL_REMISE} % sur son premier projet.`}
        large
      >
        <div className="su-res">
          <section className="su-res__section" aria-labelledby="su-par-temps">
            <h2 id="su-par-temps" className="su-res__h2">
              Comment ça marche
            </h2>
            <ol className="su-par__etapes">
              {TEMPS.map((t, i) => (
                <li key={t.titre}>
                  <Plaque as="article" className="su-res__carte">
                    <p className="su-mono su-res__etiquette">0{i + 1}</p>
                    <h3 className="su-res__carte-titre">{t.titre}</h3>
                    <p className="su-res__carte-texte">{t.texte}</p>
                  </Plaque>
                </li>
              ))}
            </ol>
          </section>

          <section className="su-res__section" aria-labelledby="su-par-recompenses">
            <h2 id="su-par-recompenses" className="su-res__h2">
              Les deux récompenses
            </h2>
            <div className="su-par__recompenses">
              <Plaque as="article" variante="encre" className="su-par__recompense">
                <p className="su-par__ou">Pour vous, le parrain · au choix</p>
                <p className="su-par__chiffre">1 mois d’abonnement offert</p>
                <p className="su-par__ou">ou</p>
                <p className="su-par__chiffre">−{PARRAIN_REMISE} % sur votre prestation</p>
                <ul>
                  <li>Mise en relation signalée avant la signature du devis du filleul.</li>
                  <li>Une récompense par filleul signé, cumulable sur plusieurs filleuls.</li>
                  <li>Les −{PARRAIN_REMISE} % portent sur une prestation pas encore signée ; si tout est réglé, c’est le mois offert.</li>
                </ul>
              </Plaque>
              <Plaque as="article" className="su-par__recompense">
                <p className="su-par__ou">Pour votre filleul</p>
                <p className="su-par__chiffre">−{FILLEUL_REMISE} % sur son premier projet</p>
                <ul>
                  <li>Sur toutes nos offres : site, boutique, outil de gestion.</li>
                  <li>Votre nom est mentionné au devis.</li>
                  <li>Non cumulable avec une autre offre.</li>
                </ul>
              </Plaque>
            </div>
          </section>

          <section id="formulaire" className="su-res__section" aria-labelledby="su-par-form">
            <h2 id="su-par-form" className="su-res__h2">
              Signaler une mise en relation
            </h2>
            <p className="su-res__chapo">Vos coordonnées et celles de votre filleul. Prévenez-le avant : c’est vous qu’il connaît.</p>
            <Parrainage resultat={resultat} />
          </section>

          <section className="su-res__section su-prose" aria-labelledby="su-par-faq">
            <h2 id="su-par-faq">Questions fréquentes</h2>
            <Accordeon questions={FAQ} />
          </section>

          <div className="su-res__suite">
            <Link className="su-res__lien" href="/tarifs">
              Les tarifs
            </Link>
            <Link className="su-res__lien" href="/realisations">
              Les démos
            </Link>
            <Link className="su-res__lien" href="/faq">
              Toutes les questions
            </Link>
          </div>
        </div>
      </Document>
    </>
  )
}
