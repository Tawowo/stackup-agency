/**
 * /parrainage — quatre formules au choix du parrain. Chaque montant vient de SITE.parrainage (src/config/site.ts) ;
 * les exemples chiffrés sont calculés à partir d'un « à partir de » du moteur, jamais écrits à la main.
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import Accordeon from '@/components/editorial/Accordeon'
import Plaque from '@/components/ui/Plaque'
import Parrainage from '@/experiences/ressources/Parrainage'
import { FORMULES, type Formule } from '@/lib/parrainage'
import { SITE } from '@/config/site'
import { aPartirDe } from '@/domain/devis/offres'
import { euros } from '@/domain/devis/resume'
import { JsonLd, faqPage, filAriane, meta } from '@/lib/seo'
import '@/experiences/ressources/ressources.css'

const P = SITE.parrainage
/** Création d'exemple : la boutique, au « à partir de » du moteur. Elle sert aux quatre exemples chiffrés. */
const EXEMPLE = aPartirDe('boutique')
const argent = Math.min(P.argent.maximum, Math.max(P.argent.minimum, Math.round((EXEMPLE * P.argent.pourcent) / 100)))
const credit = Math.round((EXEMPLE * P.credit.pourcent) / 100)
const mois = EXEMPLE > P.abonnement.seuil2 ? P.abonnement.mois2 : EXEMPLE > P.abonnement.seuil1 ? P.abonnement.mois1 : 0
const partageParrain = Math.round((EXEMPLE * P.partage.parrainPourcent) / 100)
const partageFilleul = Math.round((EXEMPLE * P.partage.filleulPourcent) / 100)

export const metadata = meta({
  titre: 'Parrainage — quatre formules au choix | Stackup Agency',
  description: `Recommandez Stackup Agency à un professionnel et choisissez votre récompense : argent, crédit, mois d’abonnement offerts ou partage avec votre filleul. Au 3e filleul signé, une prestation offerte.`,
  chemin: '/parrainage',
})

const CARTES: { id: Formule; nom: string; chiffre: string; pour: string; texte: string; exemple: string }[] = [
  {
    id: 'argent',
    nom: 'Récompense en argent',
    chiffre: `${P.argent.pourcent} % de la création`,
    pour: 'Ouverte à tous, clients ou non',
    texte: `${P.argent.pourcent} % du montant de la création signée par votre filleul, au minimum ${euros(P.argent.minimum)} et au maximum ${euros(P.argent.maximum)}. Versée quand votre filleul a tout payé.`,
    exemple: `Création de ${euros(EXEMPLE)} : ${euros(argent)} pour vous.`,
  },
  {
    id: 'credit',
    nom: 'Crédit Stackup',
    chiffre: `${P.credit.pourcent} % en crédit`,
    pour: 'Pour mes propres projets',
    texte: `${P.credit.pourcent} % du montant du projet de votre filleul, en crédit sur vos prochaines prestations (pages, modules, évolutions), valable ${P.credit.moisValidite} mois. La plus avantageuse en valeur quand vous êtes déjà client.`,
    exemple: `Création de ${euros(EXEMPLE)} : ${euros(credit)} de crédit pour vous.`,
  },
  {
    id: 'abonnement',
    nom: 'Mois d’abonnement offerts',
    chiffre: `${P.abonnement.mois1} à ${P.abonnement.mois2} mois offerts`,
    pour: 'Pour les parrains abonnés',
    texte: `${P.abonnement.mois1} mois offerts si la création de votre filleul dépasse ${euros(P.abonnement.seuil1)}, ${P.abonnement.mois2} mois au-delà de ${euros(P.abonnement.seuil2)}. Réservée aux parrains qui ont un abonnement.`,
    exemple: mois ? `Création de ${euros(EXEMPLE)} : ${mois} mois offerts pour vous.` : `Création de ${euros(EXEMPLE)} : pas de mois offert (sous le seuil).`,
  },
  {
    id: 'partage',
    nom: 'Partage avec mon filleul',
    chiffre: `${P.partage.parrainPourcent} % + ${P.partage.filleulPourcent} %`,
    pour: 'Pour que votre filleul y gagne aussi',
    texte: `${P.partage.parrainPourcent} % pour vous et ${P.partage.filleulPourcent} % de remise pour votre filleul, sur le montant de sa création. Il a une bonne raison de venir de votre part.`,
    exemple: `Création de ${euros(EXEMPLE)} : ${euros(partageParrain)} pour vous, ${euros(partageFilleul)} de remise pour votre filleul.`,
  },
]

const REGLES = [
  'La récompense n’est versée ou accordée que lorsque votre filleul a payé l’intégralité de sa création.',
  'Votre filleul doit être un nouveau client, et la mise en relation doit être signalée avant la signature de son devis.',
  'Une seule formule par filleul, choisie par vous au moment de la mise en relation.',
  'Les montants sont calculés sur la création signée, hors abonnement.',
  'On ne se parraine pas soi-même (ni son entreprise, ni un proche associé à la même structure).',
]

const FAQ = [
  { q: 'Quelle formule choisir ?', r: `Si vous n’êtes pas client et voulez simplement un remerciement : la récompense en argent. Si vous avez d’autres projets avec nous : le crédit Stackup. Si vous avez un abonnement : les mois offerts. Si vous voulez que votre filleul y gagne aussi : le partage.` },
  { q: 'Y a-t-il un bonus si je parraine plusieurs personnes ?', r: `Oui : au ${P.fidelite.filleuls}e filleul signé, vous choisissez une prestation offerte : ${P.fidelite.cadeau}.` },
  { q: 'Quand la récompense est-elle versée ?', r: 'Quand votre filleul a payé l’intégralité de sa création. Pour l’argent, le versement se fait par virement ; pour le crédit et les mois offerts, ils sont inscrits sur votre compte client.' },
  { q: 'Mon filleul doit-il savoir qu’il est parrainé ?', r: 'Oui : prévenez-le avant de nous le signaler. Nous le contactons une fois que vous avez confirmé son accord.' },
  { q: 'Où est le règlement complet ?', r: 'Il se télécharge en PDF sur cette page. Il précise chaque formule, les exemples chiffrés et les cas particuliers.' },
]

const formuleDepuisUrl = (v: string | string[] | undefined): Formule => (FORMULES as readonly string[]).includes(String(v)) ? (v as Formule) : 'argent'

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
        chapo="Quatre formules, à vous de choisir celle qui vous convient. Et au 3e filleul signé, une prestation offerte en plus."
        large
      >
        <div className="su-res">
          <section className="su-res__section" aria-labelledby="su-par-formules">
            <h2 id="su-par-formules" className="su-res__h2">
              Les quatre formules
            </h2>
            <div className="su-par__cartes">
              {CARTES.map((c) => (
                <Plaque key={c.id} as="article" className="su-par__carte">
                  <p className="su-mono su-res__etiquette">{c.pour}</p>
                  <h3 className="su-res__carte-titre">{c.nom}</h3>
                  <p className="su-par__chiffre">{c.chiffre}</p>
                  <p className="su-res__carte-texte">{c.texte}</p>
                  <p className="su-par__exemple">Exemple : {c.exemple}</p>
                  <Link className="su-res__lien" href={`/parrainage?formule=${c.id}#formulaire`}>
                    Choisir cette formule
                  </Link>
                </Plaque>
              ))}
            </div>
            <Plaque as="aside" variante="encre" className="su-par__bonus">
              <p className="su-mono su-res__etiquette">Bonus de fidélité</p>
              <p className="su-res__carte-titre">
                Au {P.fidelite.filleuls}e filleul signé : {P.fidelite.cadeau}.
              </p>
              <p className="su-res__carte-texte">Au choix, quelle que soit la formule que vous avez prise pour les précédents.</p>
            </Plaque>
            <p className="su-par__note">Les exemples partent d’une création de {euros(EXEMPLE)}, le prix de départ d’une boutique en ligne : un montant d’illustration, pas un engagement. Le prix réel de chaque projet est fixé au devis.</p>
          </section>

          <section className="su-res__section" aria-labelledby="su-par-regles">
            <h2 id="su-par-regles" className="su-res__h2">
              Les règles, en clair
            </h2>
            <ul className="su-par__regles">
              {REGLES.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <p>
              <a className="su-res__lien" href="/documents/reglement-parrainage.pdf">
                Télécharger le règlement du parrainage (PDF)
              </a>
            </p>
          </section>

          <section id="formulaire" className="su-res__section" aria-labelledby="su-par-form">
            <h2 id="su-par-form" className="su-res__h2">
              Signaler une mise en relation
            </h2>
            <p className="su-res__chapo">Vos coordonnées, celles de votre filleul, et la formule que vous choisissez. Prévenez-le avant : c’est vous qu’il connaît.</p>
            <Parrainage resultat={resultat} formuleInitiale={formuleDepuisUrl(q.formule)} />
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
              Les réalisations
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
