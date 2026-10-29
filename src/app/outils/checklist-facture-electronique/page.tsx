/**
 * /outils/checklist-facture-electronique — la checklist gratuite « suis-je prêt ? ».
 * Rendu serveur : les vingt points, l'explication et la FAQ sont dans le HTML ;
 * l'îlot client ajoute la progression, la mémoire du navigateur et l'impression.
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import Accordeon from '@/components/editorial/Accordeon'
import ChecklistFactureElectronique, { type BlocChecklist } from '@/experiences/outils/ChecklistFactureElectronique'
import { JsonLd, ORIGINE, faqPage, filAriane, meta } from '@/lib/seo'

const CHEMIN = '/outils/checklist-facture-electronique'

export const metadata = meta({
  titre: 'Checklist facture électronique : suis-je prêt ?',
  description: '21 points à cocher pour savoir où vous en êtes avant la facture électronique : clients, logiciel, données, comptable. Gratuit, imprimable.',
  chemin: CHEMIN,
})

const IMPOTS = 'https://www.impots.gouv.fr'
const ECONOMIE = 'https://www.economie.gouv.fr'
const SERVICE_PUBLIC = 'https://www.service-public.fr'
const ENTREPRENDRE = 'https://entreprendre.service-public.fr'

const BLOCS: BlocChecklist[] = [
  {
    id: 'comprendre',
    titre: 'Comprendre où l’on en est',
    intro: 'Avant de choisir quoi que ce soit, posez les mots et les dates. Ce bloc ne demande que de la lecture.',
    points: [
      {
        id: 'pdf-differe',
        titre: 'Je sais qu’un PDF envoyé par e-mail n’est pas une facture électronique',
        explication: 'Une facture électronique contient des données lisibles par un logiciel, et circule par une plateforme agréée. Le PDF seul ne suffit pas.',
        lien: { href: IMPOTS, nom: 'Voir impots.gouv.fr' },
      },
      {
        id: 'deux-echeances',
        titre: 'Je distingue recevoir des factures et en émettre',
        explication: 'Ce sont deux échéances différentes, et la réception peut arriver avant l’émission. Les dates sont à vérifier sur les sites officiels.',
        lien: { href: ECONOMIE, nom: 'Voir economie.gouv.fr' },
      },
      {
        id: 'calendrier',
        titre: 'J’ai consulté le calendrier officiel pour mon entreprise et noté la date qui me concerne',
        explication: 'Le calendrier dépend de la taille de l’entreprise et il a déjà évolué. Notez la source et la date de votre lecture, et relisez-la de temps en temps.',
        lien: { href: IMPOTS, nom: 'Voir impots.gouv.fr' },
      },
      {
        id: 'ventes-concernees',
        titre: 'Je sais quelles ventes concernent des entreprises et lesquelles concernent des particuliers',
        explication: 'Les ventes entre entreprises relèvent de la facture électronique. Les ventes aux particuliers et à l’étranger peuvent relever d’une autre obligation, la transmission de données. À vérifier pour votre activité.',
        lien: { href: ENTREPRENDRE, nom: 'Voir entreprendre.service-public.fr' },
      },
    ],
  },
  {
    id: 'clients-fournisseurs',
    titre: 'Vos clients et fournisseurs',
    intro: 'Une facture mal adressée est rejetée ou perdue. Ce bloc met vos fichiers à plat.',
    points: [
      {
        id: 'liste-clients',
        titre: 'J’ai séparé mes clients professionnels de mes clients particuliers',
        explication: 'Une simple colonne dans votre tableur ou votre logiciel suffit. Vous saurez ainsi quelles factures sont concernées en premier.',
      },
      {
        id: 'siren-clients',
        titre: 'Chaque client professionnel a un SIREN, une raison sociale exacte et une adresse de facturation',
        explication: 'Reprenez les informations telles qu’elles figurent au registre officiel des entreprises, pas telles qu’elles sont tapées de mémoire dans vos fiches.',
        lien: { href: SERVICE_PUBLIC, nom: 'Voir service-public.fr' },
      },
      {
        id: 'livraison',
        titre: 'J’ai noté l’adresse de livraison quand elle diffère de l’adresse de facturation',
        explication: 'Un chantier, un dépôt ou une boutique peuvent être à une autre adresse que le siège du client. Cette information peut devenir une mention de la facture : à vérifier.',
      },
      {
        id: 'fournisseurs',
        titre: 'J’ai demandé à mes principaux fournisseurs comment ils m’enverront leurs factures',
        explication: 'Vous pourriez recevoir des factures électroniques avant d’avoir à en émettre. Mieux vaut savoir par quel canal elles arriveront, et à quelle adresse.',
      },
    ],
  },
  {
    id: 'logiciel',
    titre: 'Votre logiciel de facturation',
    intro: 'Un seul outil suffit si le bon se raccorde à une plateforme agréée. Ce bloc vous donne les questions à poser.',
    points: [
      {
        id: 'outil-actuel',
        titre: 'Je sais avec quel outil je facture aujourd’hui, et qui s’en occupe',
        explication: 'Traitement de texte, tableur, logiciel de caisse, logiciel de facturation ou outil de votre comptable : chacun appelle une réponse différente.',
      },
      {
        id: 'question-editeur',
        titre: 'J’ai demandé à mon éditeur si son logiciel se raccorde à une plateforme agréée',
        explication: 'Demandez une réponse écrite : laquelle, à quelle date, et pour quel coût. Une réponse vague est déjà une information.',
      },
      {
        id: 'liste-officielle',
        titre: 'J’ai vérifié que la plateforme visée figure sur la liste officielle des plateformes agréées',
        explication: 'La liste est tenue par l’administration. Elle se consulte sur le site des impôts et peut changer : vérifiez-la au moment de votre choix.',
        lien: { href: IMPOTS, nom: 'Voir impots.gouv.fr' },
      },
      {
        id: 'sortie',
        titre: 'Je sais comment récupérer mes factures et mes données si je change d’outil',
        explication: 'Un export dans un format ouvert vous évite d’être prisonnier d’un seul fournisseur. Posez la question avant de signer, pas après.',
      },
    ],
  },
  {
    id: 'donnees-mentions',
    titre: 'Vos données et vos mentions',
    intro: 'La plupart des rejets viennent d’informations incomplètes. Ce bloc vérifie ce que vous écrivez sur vos factures.',
    points: [
      {
        id: 'fiche-entreprise',
        titre: 'Ma dénomination, mon adresse, mon SIREN et mon régime de TVA sont exacts dans mon outil',
        explication: 'Comparez avec vos documents officiels et avec votre espace professionnel sur le site des impôts. Une faute ici se répète sur chaque facture.',
        lien: { href: IMPOTS, nom: 'Voir impots.gouv.fr' },
      },
      {
        id: 'mentions-a-jour',
        titre: 'J’ai relu la liste officielle à jour des mentions obligatoires d’une facture',
        explication: 'Les mentions évoluent avec la réforme. Appuyez-vous sur la page officielle plutôt que sur une liste recopiée, y compris celle-ci.',
        lien: { href: SERVICE_PUBLIC, nom: 'Voir service-public.fr' },
      },
      {
        id: 'modele-facture',
        titre: 'J’ai comparé mon modèle de facture actuel à cette liste et noté ce qui manque',
        explication: 'Mettez une facture récente à côté de la liste. Les manques les plus fréquents sont une identité de client incomplète ou une nature d’opération absente.',
      },
      {
        id: 'catalogue',
        titre: 'Mes prestations et mes produits ont des désignations, des prix et des taux de TVA cohérents',
        explication: 'Une ligne mal décrite ou un taux incohérent se répercute sur tous les devis qui la reprennent. Un nettoyage de votre catalogue fait gagner du temps ensuite.',
      },
    ],
  },
  {
    id: 'organisation',
    titre: 'Votre organisation et votre comptable',
    intro: 'Un outil ne remplace pas une habitude. Ce bloc règle qui fait quoi, et avec quel appui.',
    points: [
      {
        id: 'comptable-solution',
        titre: 'J’ai demandé à mon expert-comptable quelle solution il recommande et ce qu’il récupère automatiquement',
        explication: 'Beaucoup de cabinets proposent déjà un outil ou une plateforme. Mieux vaut le savoir avant d’acheter autre chose.',
      },
      {
        id: 'comptable-reporting',
        titre: 'Je sais qui s’occupe de la transmission des données de mes ventes aux particuliers, si elle me concerne',
        explication: 'Votre comptable, votre outil de caisse ou vous-même : décidez-le clairement, et notez-le. Cela dépend de votre activité.',
      },
      {
        id: 'responsable',
        titre: 'J’ai décidé qui émet les factures et qui contrôle celles qu’on me renvoie en cas de rejet',
        explication: 'Une personne désignée, avec une suppléante si possible, évite les factures qui dorment. Prévoyez aussi à qui l’on s’adresse si un rejet survient.',
      },
      {
        id: 'essai',
        titre: 'J’ai prévu un essai avec une ou deux factures réelles ou de test avant ma date limite',
        explication: 'Mieux vaut découvrir un rejet sur un essai que sur une facture importante. Gardez de la marge entre l’essai et l’échéance.',
      },
      {
        id: 'veille',
        titre: 'J’ai noté une date pour relire les sites officiels',
        explication: 'Le calendrier et les règles peuvent évoluer. Une relecture de temps en temps vous évite de vous fier à une information périmée.',
        lien: { href: ECONOMIE, nom: 'Voir economie.gouv.fr' },
      },
    ],
  },
]

const FAQ = [
  { q: 'Cette checklist garantit-elle que je suis en règle ?', r: 'Non. Elle vous aide à faire le point et à ne rien oublier, mais elle ne remplace ni les textes officiels ni l’avis de votre expert-comptable. Les règles et les dates peuvent évoluer.' },
  { q: 'Mes réponses sont-elles envoyées quelque part ?', r: 'Non. Les cases cochées restent dans votre navigateur, sur cet appareil, et nous ne les recevons pas. Si vous videz les données du navigateur, la liste repart de zéro ; l’impression en garde une trace sur papier.' },
  { q: 'Dois-je cocher tous les points ?', r: 'Pas forcément. Certains points ne concernent pas votre activité, par exemple si vous ne vendez qu’à des particuliers. Cochez ce qui est fait ou ce qui ne vous concerne pas, après vérification, et notez le reste.' },
  { q: 'Où trouver le calendrier et la liste des plateformes agréées ?', r: 'Sur les sites officiels : impots.gouv.fr et economie.gouv.fr. Ils font foi, et ils sont mis à jour quand le dispositif évolue. Ne vous fiez pas à une date lue ailleurs sans la recouper.' },
  { q: 'Stackup est-elle une plateforme agréée ?', r: 'Non. Stackup fabrique des outils de devis et de facturation sur mesure, raccordés à une plateforme agréée choisie avec vous. La transmission réglementaire est assurée par cette plateforme.' },
  { q: 'Puis-je imprimer la liste pour la partager avec mon comptable ?', r: 'Oui. Le bouton « Imprimer ma liste » ne garde que la liste et vos cases cochées, sans le reste du site. Vous pouvez aussi l’enregistrer en PDF depuis la fenêtre d’impression.' },
]

const HOWTO = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Vérifier sa préparation à la facture électronique',
  description: 'Cinq blocs à parcourir pour faire le point avant la facturation électronique : calendrier, clients et fournisseurs, logiciel, données et mentions, organisation.',
  totalTime: 'PT30M',
  step: BLOCS.map((b, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: b.titre,
    text: `${b.intro} ${b.points.map((p) => p.titre).join(' ; ')}.`,
    url: `${ORIGINE}${CHEMIN}#${b.id}`,
  })),
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'Outils', chemin: '/outils' },
            { nom: 'Checklist facture électronique', chemin: CHEMIN },
          ]),
          HOWTO,
          faqPage(FAQ.map((f) => ({ q: f.q, a: f.r }))),
        ]}
      />
      <Document
        moment="outils-checklist-fe"
        forme="page"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/outils', nom: 'Outils' },
          { href: CHEMIN, nom: 'Checklist facture électronique' },
        ]}
        etiquette="Outil gratuit · checklist"
        titre="Facture électronique : êtes-vous prêt ?"
        chapo="Vingt et un points en cinq blocs, à cocher à votre rythme. Vous voyez où vous en êtes, ce qu’il reste à demander à votre éditeur et à votre comptable, et vous imprimez la liste."
        large
      >
        <ChecklistFactureElectronique blocs={BLOCS} />

        <section className="su-cfe-explic su-prose" aria-labelledby="su-cfe-explic">
          <h2 id="su-cfe-explic" className="su-display">
            À quoi sert cette liste, et comment s’en servir ?
          </h2>
          <p>
            <strong>Cette liste sert à savoir, en une demi-heure, ce que vous avez déjà fait et ce qui reste à faire avant la facturation électronique.</strong> Elle ne dit pas si vous êtes conforme : seuls les textes officiels, et votre expert-comptable, peuvent répondre à cette question pour votre cas.
          </p>
          <h3>Pourquoi une checklist plutôt qu’un long guide ?</h3>
          <p>
            Parce que la préparation est surtout une affaire de petites vérifications, faites dans le bon ordre. Un plombier, une coiffeuse ou un caviste n’ont pas besoin de connaître le détail technique des formats. Ils ont besoin de savoir qui sont leurs clients professionnels, avec quel outil ils facturent et qui leur répondra en cas de problème. Les cinq blocs suivent cet ordre : comprendre, regarder vos tiers, regarder votre outil, regarder vos données, puis organiser le travail.
          </p>
          <h3>Comment l’utiliser concrètement ?</h3>
          <p>
            Parcourez les blocs dans l’ordre, et cochez uniquement ce que vous avez réellement fait ou vérifié. Quand une case ne peut pas être cochée, c’est une question à poser : à votre éditeur, à un fournisseur ou à votre comptable. Notez-la dans la marge de la version imprimée. La barre de progression vous montre l’avancement, sans note ni verdict. Vos cases sont gardées dans votre navigateur, sur cet appareil : si vous changez d’ordinateur, imprimez la liste ou enregistrez-la en PDF.
          </p>
          <h3>Que faire des cases que l’on ne peut pas cocher ?</h3>
          <p>
            Ne les cachez pas : triez-les. Certaines ne vous concernent pas, par exemple si vous ne travaillez qu’avec des particuliers. D’autres dépendent d’un tiers, comme la réponse d’un éditeur. Les dernières sont des tâches pour vous, que vous pouvez dater et répartir. Une liste honnête, avec des cases vides, vaut mieux qu’une liste entièrement cochée sur la foi d’une hypothèse.
          </p>
          <h3>Pourquoi commencer par les données plutôt que par le logiciel ?</h3>
          <p>
            Parce qu’un bon outil alimenté par des fiches approximatives produit des factures approximatives. Le nettoyage de vos clients, de votre catalogue et de vos propres informations ne coûte rien, il peut se faire dès maintenant, et il servira quel que soit l’outil retenu. C’est aussi le travail que vos futurs interlocuteurs, éditeur ou comptable, vous demanderont en premier. Arriver avec des données propres, c’est gagner du temps et en faire gagner à ceux qui vous accompagnent.
          </p>
          <h3>À quoi ressemble un cas concret ?</h3>
          <p>
            Exemple type, fictif : une boulangerie vend surtout au comptoir, mais livre aussi un restaurant et une cantine chaque semaine. Elle coche le premier bloc après lecture des pages officielles, repère dans le deuxième que le restaurant a une adresse de livraison différente de son siège, découvre dans le troisième que son logiciel de caisse ne produit pas de factures pour les professionnels, et prend rendez-vous avec son comptable pour le cinquième. Au bout d’une soirée, elle sait quoi demander, à qui, et dans quel ordre. Elle n’a encore rien acheté.
          </p>
          <h3>Quelles limites faut-il connaître ?</h3>
          <p>
            Les obligations de la facturation électronique, leur calendrier et la liste des plateformes agréées sont fixés par l’administration. Ils ont déjà été ajustés une fois et peuvent l’être encore. Cette page décrit donc les choses en termes généraux, et chaque lien officiel proposé dans la liste est à relire au moment où vous agissez. Nous ne donnons ni date ni montant de sanction : ils sont à vérifier sur les sites officiels, et à confirmer avec votre expert-comptable.
          </p>
          <h3>Et après la checklist ?</h3>
          <p>
            Si la plupart des cases sont cochées, il vous reste à choisir votre outil et à l’essayer sur quelques factures. La page{' '}
            <Link href="/services/facture-electronique">facture électronique</Link> détaille les notions et les décisions à prendre. Si vos devis sont la partie la plus lourde, partez d’un{' '}
            <Link href="/outils/modele-devis">modèle de devis</Link> propre, puis voyez si un{' '}
            <Link href="/services/logiciel-de-gestion">logiciel de gestion sur mesure</Link> vaut la peine pour votre métier. Un logiciel du marché suffit parfois : nous vous le dirons. Pour en parler, <Link href="/contact">écrivez-nous</Link>.
          </p>
        </section>

        <section className="su-cfe-faq" aria-labelledby="su-cfe-faq">
          <h2 id="su-cfe-faq" className="su-display">
            Questions fréquentes
          </h2>
          <Accordeon questions={FAQ} />
        </section>
      </Document>
    </>
  )
}
