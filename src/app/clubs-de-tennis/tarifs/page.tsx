/**
 * /clubs-de-tennis/tarifs — tous les prix de l'offre, lus dans src/data/offre-clubs/pricing.ts : catégories (cartes
 * empilées sur téléphone, jamais un tableau qui déborde), options, abonnement inclus / non inclus, conditions, sur devis.
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import Accordeon from '@/components/editorial/Accordeon'
import Action from '@/components/ui/Action'
import { AppelFinal, PiedOffre, eur } from '@/gabarits/clubs/composants'
import { arianeDe } from '@/gabarits/clubs/PageClub'
import { serviceClubs } from '@/gabarits/clubs/schema'
import { JsonLd, faqPage, filAriane, meta } from '@/lib/seo'
import { jetons, jetonsProfond } from '@/lib/jetons'
import { CATEGORIES, OPTIONS, PRICING, coutParLicencieAn, economiePack, tarif } from '@/data/offre-clubs/pricing'
import { ABONNEMENT_INCLUS, ABONNEMENT_NON_INCLUS, CONDITIONS, SUR_DEVIS } from '@/data/offre-clubs/inclus'
import { FAQ_CLUBS } from '@/data/offre-clubs/faq'
import { MENTIONS_CLUBS, PRODUCT_NAME, RACINE_CLUBS } from '@/config/offre-clubs'
import '@/gabarits/clubs/clubs.css'
import './tarifs.css'

const CHEMIN = `${RACINE_CLUBS}/tarifs`

export const metadata = meta({
  titre: 'Prix du site et du logiciel pour club de tennis',
  description: `Tarifs ${PRODUCT_NAME} par catégorie de club : site dès ${tarif(CATEGORIES[0]!, 'site').mois} €/mois, logiciel dès ${tarif(CATEGORIES[0]!, 'logiciel').mois} €/mois, pack −${Math.round(PRICING.packDiscount * 100)} %. Options, inclus et non inclus.`,
  chemin: CHEMIN,
  image: '/og/clubs/tarifs.png',
})

const SOMMAIRE = [
  { id: 'categories', titre: 'Les prix par catégorie' },
  { id: 'par-licencie', titre: 'Le coût par licencié' },
  { id: 'inclus', titre: 'Ce que comprend l’abonnement' },
  { id: 'options', titre: 'Les options' },
  { id: 'conditions', titre: 'Les conditions' },
  { id: 'sur-devis', titre: 'Ce qui passe en devis' },
  { id: 'faq', titre: 'Questions sur le contrat' },
]

const FORMULES = [
  { id: 'site', nom: 'Le site' },
  { id: 'logiciel', nom: 'Le logiciel' },
  { id: 'pack', nom: 'Site + logiciel' },
] as const

const FAQ = jetonsProfond(FAQ_CLUBS.filter((q) => q.theme === 'contrat'))

export default function Page() {
  const ariane = arianeDe({ chemin: CHEMIN, titre: 'Tarifs', famille: 'formule' })
  return (
    <>
      <JsonLd data={[filAriane(ariane.map((a) => ({ nom: a.nom, chemin: a.href }))), serviceClubs({ nom: `${PRODUCT_NAME} : site et logiciel pour clubs de tennis`, chemin: CHEMIN, description: 'Prix indicatifs par catégorie de club, options, inclus et non inclus.' }), faqPage(FAQ.map((f) => ({ q: f.q, a: f.a })))]} />
      <Document
        moment="clubs-tarifs"
        ariane={ariane}
        etiquette="Clubs de tennis · tarifs"
        titre="Les tarifs, catégorie par catégorie."
        chapo={`Le prix dépend du nombre de licenciés de la saison en cours et de la formule : le site, le logiciel, ou les deux avec ${Math.round(PRICING.packDiscount * 100)} % de remise. Une mise en place, payable en ${PRICING.installments} fois sans frais, puis un abonnement mensuel. ${MENTIONS_CLUBS.prix}`}
        sommaire={SOMMAIRE}
        entete={
          <p className="cl-demo-boutons">
            <Action href={`${RACINE_CLUBS}/simulateur`}>Estimer le prix pour mon club</Action>
            <Action href={`${RACINE_CLUBS}/demo`} variante="contour">
              Voir la démo
            </Action>
          </p>
        }
      >
        <section id="categories" aria-labelledby="categories-t">
          <h2 id="categories-t">Les prix par catégorie</h2>
          <p>
            On compte les <strong>licenciés FFT de la saison en cours</strong>, sections tennis, padel et pickleball comprises. Le club fournit un justificatif : un export ADOC, ou le rapport d’assemblée générale avec les chiffres des trois dernières saisons. La catégorie est revue une fois par an, au renouvellement, jamais en cours de saison.
          </p>
          <div className="ct-categories">
            {CATEGORIES.map((c) => {
              const eco = economiePack(c)
              return (
                <article key={c.id} className="ct-cat su-plaque su-plaque--ivoire" aria-labelledby={`cat-${c.id}`}>
                  <header>
                    <h3 id={`cat-${c.id}`}>{c.nom}</h3>
                    <p className="su-mono">{c.max === null ? `${c.min} licenciés et plus` : `${c.min} à ${c.max} licenciés`}</p>
                  </header>
                  <dl>
                    {FORMULES.map((f) => {
                      const t = tarif(c, f.id)
                      return (
                        <div key={f.id} data-pack={f.id === 'pack' ? '1' : '0'}>
                          <dt>{f.nom}</dt>
                          <dd>
                            <strong>{eur(t.mois)}</strong> par mois
                            <span>mise en place {eur(t.miseEnPlace)}</span>
                            <span>{c.heures[f.id]} h d’accompagnement incluses</span>
                          </dd>
                        </div>
                      )
                    })}
                  </dl>
                  <p className="ct-cat__eco">
                    Le pack fait économiser {eur(eco.miseEnPlace)} sur la mise en place et {eur(eco.mois)} par mois. Stockage : {c.stockageGo} Go.
                  </p>
                </article>
              )
            })}
          </div>
          <p>
            Le pack site + logiciel bénéficie de {Math.round(PRICING.packDiscount * 100)} % de remise sur la mise en place et sur l’abonnement, par rapport à la somme des deux (mise en place arrondie à la dizaine, abonnement à l’euro). Aucune autre remise que celle-ci et le paiement annuel.
          </p>
        </section>

        <section id="par-licencie" aria-labelledby="par-licencie-t">
          <h2 id="par-licencie-t">Combien par licencié et par an ?</h2>
          <p>Pour un club type de chaque catégorie, avec le site et le logiciel, abonnement mensuel :</p>
          <ul>
            {CATEGORIES.map((c) => {
              const t = tarif(c, 'pack')
              return (
                <li key={c.id}>
                  <strong>{c.nom}</strong>, {c.clubType} licenciés : {eur(t.mois)} par mois, soit environ <strong>{coutParLicencieAn(t.mois, c.clubType).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} € par licencié et par an</strong>.
                </li>
              )
            })}
          </ul>
          <p>
            Le calcul est simple : abonnement mensuel × 12 ÷ nombre de licenciés. Pour votre propre club, le <Link href={`${RACINE_CLUBS}/simulateur`}>simulateur</Link> le fait avec vos chiffres.
          </p>
        </section>

        <section id="inclus" aria-labelledby="inclus-t">
          <h2 id="inclus-t">Ce que comprend l’abonnement mensuel</h2>
          <div className="ct-deux">
            <div>
              <h3>Inclus</h3>
              <ul className="ct-liste ct-liste--oui">
                {ABONNEMENT_INCLUS.map((x) => (
                  <li key={jetons(x)}>{jetons(x)}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Non inclus</h3>
              <ul className="ct-liste ct-liste--non">
                {ABONNEMENT_NON_INCLUS.map((x) => (
                  <li key={jetons(x)}>{jetons(x)}</li>
                ))}
              </ul>
            </div>
          </div>
          <p>
            Le détail de chaque formule : <Link href={`${RACINE_CLUBS}/site-internet`}>le site du club</Link> et <Link href={`${RACINE_CLUBS}/logiciel-de-gestion`}>le logiciel du bureau</Link>.
          </p>
        </section>

        <section id="options" aria-labelledby="options-t">
          <h2 id="options-t">Les options, à prix fixe</h2>
          <ul className="ct-options">
            {OPTIONS.map((o) => (
              <li key={o.id}>
                <div>
                  <h3>{o.nom}</h3>
                  <p>{o.description}</p>
                  <p className="ct-options__condition">{o.condition}</p>
                </div>
                <p className="ct-options__prix">
                  <strong>{eur(o.miseEnPlace)}</strong>
                  <span>{o.unite === 'page' ? 'par page' : 'à la mise en place'}</span>
                  {o.mois > 0 && <span>+ {eur(o.mois)} par mois</span>}
                </p>
              </li>
            ))}
            <li>
              <div>
                <h3>Heure d’accompagnement supplémentaire</h3>
                <p>En visio, par téléphone ou au club, au-delà des heures incluses.</p>
                <p className="ct-options__condition">Par tranche de {PRICING.trancheMinutes} minutes.</p>
              </div>
              <p className="ct-options__prix">
                <strong>{eur(PRICING.heureSupplementaire)}</strong>
                <span>de l’heure</span>
              </p>
            </li>
          </ul>
        </section>

        <section id="conditions" aria-labelledby="conditions-t">
          <h2 id="conditions-t">Les conditions</h2>
          <ul>
            {CONDITIONS.map((x) => (
              <li key={jetons(x)}>{jetons(x)}</li>
            ))}
            <li>Support par e-mail ou formulaire, réponse sous {PRICING.supportJoursOuvres} jours ouvrés.</li>
          </ul>
          <p>
            Tout est écrit dans les <Link href="/cgv-plateforme">conditions générales de la plateforme</Link>.
          </p>
        </section>

        <section id="sur-devis" aria-labelledby="sur-devis-t">
          <h2 id="sur-devis-t">Ce qui passe en devis sur mesure</h2>
          <ul>
            {SUR_DEVIS.map((x) => (
              <li key={jetons(x)}>{jetons(x)}</li>
            ))}
          </ul>
          <p className="cl-demo-boutons">
            <Action href={`${RACINE_CLUBS}/simulateur#devis`}>Demander un devis</Action>
          </p>
        </section>

        <section id="faq" aria-labelledby="faq-t">
          <h2 id="faq-t">Questions sur le contrat</h2>
          <Accordeon questions={FAQ.map((f) => ({ q: f.q, r: f.a }))} groupe="faq-tarifs-clubs" />
        </section>
        <AppelFinal />
        <PiedOffre />
      </Document>
    </>
  )
}
