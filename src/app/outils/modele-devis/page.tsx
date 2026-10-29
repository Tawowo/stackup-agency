/**
 * /outils/modele-devis — le modèle de devis gratuit. L'outil est un îlot client
 * (calcul exact, aperçu, impression) ; le texte et la FAQ en dessous sont rendus
 * côté serveur : tout le contenu est dans le HTML sans JS.
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import Accordeon from '@/components/editorial/Accordeon'
import ModeleDevis from '@/experiences/outils/ModeleDevis'
import { jetons } from '@/lib/jetons'
import { JsonLd, ORIGINE, faqPage, filAriane, meta } from '@/lib/seo'
import '@/experiences/outils/modele-devis.css'

const DESCRIPTION = 'Remplissez votre devis en ligne : totaux HT, TVA, TTC et acompte calculés au centime, aperçu à imprimer en PDF. Gratuit, rien n’est envoyé.'

export const metadata = meta({
  titre: 'Modèle de devis gratuit à remplir, imprimer ou copier',
  description: DESCRIPTION,
  chemin: '/outils/modele-devis',
})

const FAQ = [
  { q: 'Mes données sont-elles envoyées quelque part ?', r: 'Non. Le calcul et l’aperçu se font dans votre navigateur ; rien n’est envoyé à Stackup ni à un tiers, et rien n’est enregistré. Si vous fermez la page, la saisie disparaît : imprimez ou copiez avant.' },
  { q: 'Comment obtenir un PDF ?', r: 'Cliquez sur « Imprimer ou enregistrer en PDF », puis choisissez « Enregistrer au format PDF » comme imprimante dans la fenêtre d’impression de votre navigateur. Seul l’aperçu du devis est imprimé, pas le reste de la page.' },
  { q: 'Que mettre si je ne facture pas la TVA ?', r: 'Si vous êtes en franchise en base de TVA, choisissez la mention « TVA non applicable, art. 293 B du CGI » : la colonne de taux disparaît et la mention s’ajoute au devis. Pour savoir si vous en bénéficiez, voyez impots.gouv.fr.' },
  { q: 'Quelle durée de validité indiquer ?', r: 'C’est à vous de la fixer, selon la nature de votre travail : un prix de matériaux peut changer vite, un forfait de service beaucoup moins. Le champ est volontairement vide, aucune durée n’est imposée par l’outil.' },
  { q: 'Ce devis est-il valable juridiquement ?', r: 'Il reprend les mentions courantes d’un devis, mais il reste un modèle : votre activité peut exiger d’autres mentions. Vérifiez sur service-public.fr ou auprès de votre chambre de métiers, de commerce ou de votre comptable.' },
  { q: 'Puis-je arrondir les prix comme je veux ?', r: 'Les lignes sont calculées au centime, arrondies à la moitié supérieure, et la TVA est calculée par taux sur le total net. Si votre logiciel de facturation calcule autrement, un écart d’un centime est possible : gardez la même méthode du devis à la facture.' },
]

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'Outils', chemin: '/outils' },
            { nom: 'Modèle de devis', chemin: '/outils/modele-devis' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Modèle de devis gratuit',
            url: `${ORIGINE}/outils/modele-devis`,
            description: DESCRIPTION,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Navigateur web',
            inLanguage: 'fr',
            isAccessibleForFree: true,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            publisher: { '@id': `${ORIGINE}/#agence` },
          },
          faqPage(FAQ.map((f) => ({ q: f.q, a: f.r }))),
        ]}
      />
      <Document
        moment="outils-devis"
        forme="page"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/outils', nom: 'Outils' },
          { href: '/outils/modele-devis', nom: 'Modèle de devis' },
        ]}
        etiquette="Outil gratuit · rien n’est envoyé"
        titre="Un devis propre, calculé au centime."
        chapo="Remplissez les champs : les totaux HT, TVA, TTC et l’acompte se calculent en direct, et l’aperçu est prêt à imprimer ou à enregistrer en PDF. Tout reste dans votre navigateur."
        large
      >
        <ModeleDevis />

        <article className="su-prose su-mdv-texte" aria-labelledby="su-mdv-contenu">
          <h2 id="su-mdv-contenu">Que doit contenir un devis ?</h2>
          <p>
            <strong>Un devis décrit ce que vous allez faire, pour quel prix et à quelles conditions, avant que le client ne s’engage.</strong> Plus il est précis, moins il donne lieu à discussion après coup. Le modèle ci-dessus reprend les mentions courantes ; votre activité peut en demander d’autres.
          </p>
          <ul>
            <li>
              <strong>Vous :</strong> nom ou raison sociale, adresse, SIRET, moyen de vous joindre. Selon votre statut, d’autres informations s’ajoutent (forme juridique, numéro de TVA, assurance pour certains métiers).
            </li>
            <li>
              <strong>Le client :</strong> son nom et son adresse, et l’adresse du chantier ou de la prestation si elle diffère.
            </li>
            <li>
              <strong>Le devis lui-même :</strong> une date, un numéro, un objet clair, la durée de validité de l’offre.
            </li>
            <li>
              <strong>Le détail des prestations :</strong> une ligne par poste, avec quantité, unité et prix unitaire hors taxes, puis les totaux HT, la TVA par taux et le total TTC.
            </li>
            <li>
              <strong>Les conditions :</strong> acompte éventuel, modalités et échéance de paiement, et la mention de TVA qui vous concerne.
            </li>
          </ul>
          <p>
            Exemple type : un plombier remplace un chauffe-eau. Il écrit une ligne pour la fourniture, une pour la pose, une pour l’évacuation de l’ancien appareil. Le client voit ce qu’il paie, et le plombier a de quoi répondre si on lui demande pourquoi le total n’est pas celui d’un voisin.
          </p>

          <h2>Quand un devis est-il obligatoire ?</h2>
          <p>
            Cela dépend de votre secteur et de votre client. Dans certains métiers (dépannage, réparation, travaux dans un logement, déménagement, par exemple) la réglementation impose de remettre un devis, parfois au-delà d’un montant fixé par les textes. Pour un client particulier, l’information sur le prix avant la prestation est de toute façon la règle. Pour les autres cas, le devis reste une très bonne pratique, même sans obligation.
          </p>
          <p>
            Les seuils et les listes de métiers évoluent : ne vous fiez pas à un article, y compris celui-ci. Consultez <a href="https://www.service-public.fr" target="_blank" rel="noopener noreferrer">service-public.fr<span className="sr-only"> (nouvel onglet)</span></a> ou votre chambre consulaire pour votre activité précise.
          </p>

          <h2>Devis ou facture proforma : quelle différence ?</h2>
          <p>
            Le devis est une offre : une fois accepté, il engage les deux parties sur le prix et la prestation. La facture proforma est un document préparatoire qui ressemble à une facture mais n’en est pas une : elle n’a pas de valeur comptable, ne se déclare pas comme une vente, et sert surtout à demander un règlement avant livraison, à préparer un dossier de financement ou des formalités de douane. Si votre client veut simplement savoir combien cela coûtera, c’est un devis qu’il lui faut.
          </p>

          <h2>Signature et acceptation : quand le devis devient-il un contrat ?</h2>
          <p>
            En règle générale, un devis daté, signé et précédé de la mention « Bon pour accord » vaut accord des deux parties sur la prestation et son prix. C’est pourquoi l’outil prévoit un cadre « Bon pour accord, date et signature du client » et la mention « Devis reçu avant l’exécution des travaux », très répandue dans le bâtiment : elle atteste que le client a eu le devis en main avant que le travail ne commence.
          </p>
          <p>
            Attention aux contrats signés hors de votre établissement (au domicile du client, lors d’un démarchage) : des règles spécifiques de protection du consommateur, dont un droit de rétractation, peuvent s’appliquer. Renseignez-vous sur service-public.fr avant de demander un acompte dans ces situations.
          </p>

          <h2>Ce qui fait gagner du temps pour relancer</h2>
          <p>
            Un devis resté sans réponse n’est pas forcément un refus : il est souvent simplement oublié. Trois éléments rendent la relance facile.
          </p>
          <ul>
            <li>
              <strong>Une date et un numéro</strong> : vous retrouvez le bon document en quelques secondes et vous pouvez écrire « suite à mon devis n° … du … ».
            </li>
            <li>
              <strong>Une durée de validité</strong> : elle donne une raison naturelle de recontacter le client avant que l’offre n’expire, sans avoir l’air de le presser.
            </li>
            <li>
              <strong>Un objet précis</strong> : le client se souvient de quoi il s’agit sans rouvrir le document.
            </li>
          </ul>
          <p>
            Notez la date d’envoi quelque part, et relancez une fois, poliment, quelques jours après l’échéance que vous avez indiquée. Le bouton « Copier le texte » vous donne une version brute du devis à coller dans un e-mail ou un message.
          </p>

          <h2>Les erreurs fréquentes</h2>
          <ul>
            <li>
              <strong>Mélanger HT et TTC.</strong> Les prix unitaires de l’outil sont hors taxes ; le TTC se déduit. Un client particulier raisonne en TTC, précisez-le dans l’objet si besoin.
            </li>
            <li>
              <strong>Un seul taux de TVA pour tout.</strong> Matériel et main-d’œuvre n’ont pas toujours le même taux ; l’outil permet un taux par ligne et calcule la TVA par taux.
            </li>
            <li>
              <strong>Oublier la mention de TVA</strong> quand vous êtes en franchise en base : elle doit figurer sur le devis.
            </li>
            <li>
              <strong>Une désignation vague</strong> (« travaux divers ») : elle ouvre la porte aux litiges. Découpez en postes.
            </li>
            <li>
              <strong>Pas de durée de validité</strong> : un devis sans limite peut revenir six mois plus tard, avec des prix devenus faux.
            </li>
            <li>
              <strong>Modifier un devis signé</strong> sans nouveau document : tout changement de prestation mérite un devis complémentaire ou un avenant daté.
            </li>
          </ul>

          <h2>Quand le devis sur papier ne suffit plus</h2>
          <p>
            Ce modèle convient tant que vous faites quelques devis par semaine. Si vous les refaites à la main, si vous cherchez quel devis a été accepté, ou si la facture se ressaisit à partir du devis, un outil de gestion fait gagner du temps : devis, suivi des acceptations, facture et relances au même endroit, adaptés à votre manière de travailler. Stackup en fabrique sur mesure, {jetons('à partir de {{prix:outil}} €')} : voir <Link href="/services/logiciel-de-gestion">le logiciel de gestion sur mesure</Link>. Pour comparer avec les logiciels du marché, lisez le <Link href="/comparatif/obat-tolteck-logiciel-sur-mesure">comparatif avec Obat et Tolteck</Link>, qui en montre aussi les limites.
          </p>
          <p>
            Pour les documents qui encadrent un projet (conditions générales, contrats, cession de droits), voyez les <Link href="/ressources/documents">documents en PDF</Link>. D’autres outils gratuits sont réunis sur la <Link href="/outils">page des outils</Link>, et vous pouvez <Link href="/contact">nous écrire</Link> pour poser une question.
          </p>
        </article>

        <section className="su-mdv-faq" aria-labelledby="su-mdv-faq">
          <h2 id="su-mdv-faq" className="su-display">
            Questions fréquentes
          </h2>
          <Accordeon questions={FAQ} />
        </section>
      </Document>
    </>
  )
}
