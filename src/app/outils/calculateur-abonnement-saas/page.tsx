/**
 * /outils/calculateur-abonnement-saas — abonnement d'un logiciel du marché ou outil sur mesure : le cumul sur 3 et 5 ans,
 * avec les chiffres du visiteur. Aucun prix de concurrent n'est cité : le visiteur saisit le sien.
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import Accordeon from '@/components/editorial/Accordeon'
import CalculateurAbonnement from '@/experiences/outils/CalculateurAbonnement'
import { JsonLd, faqPage, filAriane, meta } from '@/lib/seo'
import { outilGratuit } from '@/lib/schema'
import { jetons } from '@/lib/jetons'
import { PRIX_PUBLICS as P } from '@/config/prix-publics.generated'

export const metadata = meta({
  titre: 'Abonnement ou outil sur mesure : calculez sur 3 et 5 ans',
  description: 'Comparez ce que vous payez chaque mois pour un logiciel ou une plateforme avec le coût d’un outil à vous, sur 3 et 5 ans. Vos chiffres, calcul gratuit.',
  chemin: '/outils/calculateur-abonnement-saas',
})

const FAQ = [
  { q: 'Un outil sur mesure revient-il toujours moins cher qu’un abonnement ?', r: 'Non. Sur une courte durée ou avec un besoin très simple, un abonnement reste souvent plus économique. Le calcul sert à voir à partir de quand l’écart s’inverse, et il faut y ajouter ce que l’abonnement ne fait pas : adaptation à votre façon de travailler, propriété du code et des données, absence de commission.' },
  { q: 'Pourquoi aucun prix de concurrent n’est-il affiché ?', r: 'Les tarifs changent, varient selon les formules et le nombre d’utilisateurs. Plutôt que d’afficher des chiffres qui seraient périmés ou discutables, l’outil part de ce que vous payez réellement, facture en main.' },
  { q: 'Que comprend le montant « à partir de » de l’outil ?', r: 'Il correspond au socle de l’outil de gestion avec ses premiers modules, calculé par la grille tarifaire du site. Le devis précis dépend des modules que vous choisissez ; l’estimateur de la page tarifs donne le chiffre pour votre projet.' },
  { q: 'À quoi sert l’abonnement facultatif ?', r: 'Il couvre l’hébergement, la maintenance et le suivi. Il est sans engagement et facultatif : vous restez propriétaire du code et des données, et pouvez héberger ailleurs.' },
  { q: 'Mes chiffres sont-ils conservés ?', r: 'Non. Le calcul s’exécute dans votre navigateur, rien n’est envoyé à nos serveurs et rien n’est enregistré.' },
]

export default function Page() {
  const prixOutil = P.offres.outil
  const aboMin = P.abonnementMin
  return (
    <>
      <JsonLd
        data={[
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'Outils', chemin: '/outils' },
            { nom: 'Abonnement ou outil sur mesure', chemin: '/outils/calculateur-abonnement-saas' },
          ]),
          outilGratuit({ nom: 'Calculateur abonnement ou outil sur mesure', description: 'Cumul sur 3 et 5 ans d’un abonnement mensuel comparé à un outil de gestion à soi, avec les chiffres saisis par le visiteur.', chemin: '/outils/calculateur-abonnement-saas' }),
          faqPage(FAQ.map((f) => ({ q: f.q, a: f.r }))),
        ]}
      />
      <Document
        moment="outils-abonnement"
        forme="cadran"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/outils', nom: 'Outils' },
          { href: '/outils/calculateur-abonnement-saas', nom: 'Abonnement ou outil sur mesure' },
        ]}
        etiquette="Outil gratuit · calcul dans votre navigateur"
        titre="Abonnement ou outil à vous : que coûte chaque option sur 3 et 5 ans ?"
        chapo="Saisissez ce que vous payez chaque mois : le tableau compare le cumul de votre abonnement avec un outil de gestion sur mesure, avec ou sans abonnement facultatif."
        large
      >
        <CalculateurAbonnement prixOutil={prixOutil} aboMin={aboMin} />
        <div className="su-prose">
          <p>
            <strong>Un abonnement se paie tant qu’on l’utilise ; un outil sur mesure se paie une fois, puis éventuellement un suivi facultatif.</strong> Entre les deux, la bonne réponse dépend de la durée, du nombre d’utilisateurs et de la place que prend l’outil dans votre quotidien.
          </p>
          <h2>Comment lire le résultat ?</h2>
          <p>
            Le tableau place trois colonnes côte à côte : le cumul de votre abonnement actuel (mensualité multipliée par le nombre d’utilisateurs et la durée, plus d’éventuels frais de démarrage), le montant de départ d’un outil à vous, et ce même montant avec l’abonnement facultatif au tarif minimum. Les deux horizons, trois et cinq ans, évitent de juger sur un seul mois.
          </p>
          <p>
            Si la ligne de trois ans montre que votre abonnement coûte déjà plus que l’outil, la question devient : le logiciel du marché vous apporte-t-il quelque chose que l’outil sur mesure ne vous apporterait pas ? Si l’abonnement reste moins cher, c’est une réponse honnête : on peut préférer un outil sur mesure pour d’autres raisons que le prix, mais le calcul ne doit pas faire semblant.
          </p>
          <h2>Ce que le calcul ne dit pas</h2>
          <p>
            Il ne chiffre ni le temps perdu à contourner un logiciel qui ne fait pas tout, ni les commissions prélevées sur une réservation ou une vente, ni le coût de ressaisir des données dans plusieurs outils. Il ne chiffre pas non plus le risque inverse : changer d’outil demande du temps, une reprise des données et une prise en main. Ces éléments existent des deux côtés ; notez-les à part.
          </p>
          <p>
            Il ignore enfin la propriété. Avec un abonnement, vos données vivent chez un éditeur qui peut changer ses prix ou ses conditions. Avec un outil à vous, le code et les données vous appartiennent à la fin du projet : vous pouvez les héberger ailleurs ou confier la suite à un autre prestataire.
          </p>
          <h2>Quand l’abonnement est le bon choix</h2>
          <p>
            Pour un besoin standard (facturer, encaisser, tenir un agenda simple) et peu d’utilisateurs, un logiciel du marché remplit souvent très bien son rôle, avec un coût mensuel modeste et des mises à jour incluses. Pour un usage ponctuel ou une activité qui démarre, l’abonnement permet aussi de tester sans engager de gros montant.
          </p>
          <h2>Quand un outil à vous prend l’avantage</h2>
          <p>
            Il prend l’avantage quand votre façon de travailler ne rentre pas dans les cases d’un logiciel générique, quand plusieurs outils abonnés se superposent pour faire ce qu’un seul ferait, quand le nombre d’utilisateurs fait grimper la facture, ou quand vous voulez retirer les commissions d’une plateforme de réservation ou de vente. Les <Link href="/solutions">modules de l’outil de gestion</Link> et l’<Link href="/tarifs#estimer">estimateur de prix</Link> montrent ce qu’un outil composé pour votre activité coûterait vraiment.
          </p>
          <p>
            Pour aller plus loin sur le choix, lisez <Link href="/comparatif/obat-tolteck-logiciel-sur-mesure">logiciel de devis du marché ou logiciel sur mesure</Link> ou les définitions du <Link href="/lexique/saas">SaaS</Link> et du <Link href="/lexique/logiciel-de-gestion">logiciel de gestion</Link>. {jetons('Une visio de conseil ({{carte:visio}} €, prestation à part) permet de chiffrer votre cas avant de décider.')}
          </p>
        </div>
        <h2>Questions fréquentes</h2>
        <Accordeon questions={FAQ.map((f) => ({ q: f.q, r: f.r }))} groupe="faq-abo" />
      </Document>
    </>
  )
}
