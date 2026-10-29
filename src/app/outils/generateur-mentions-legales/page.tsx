/**
 * /outils/generateur-mentions-legales — générateur gratuit de mentions légales.
 * L'outil est un îlot client (tout se passe dans le navigateur) ; le texte
 * explicatif et la FAQ sont rendus côté serveur, présents sans JS.
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import Accordeon from '@/components/editorial/Accordeon'
import GenerateurMentions from '@/experiences/outils/GenerateurMentions'
import { ORIGINE, JsonLd, faqPage, filAriane, meta } from '@/lib/seo'

export const metadata = meta({
  titre: 'Générateur de mentions légales gratuit',
  description: 'Créez gratuitement le texte de vos mentions légales : éditeur, hébergeur, données personnelles, cookies. Calculé dans votre navigateur, rien n’est envoyé.',
  chemin: '/outils/generateur-mentions-legales',
})

const FAQ = [
  { q: 'Mes données sont-elles envoyées quelque part ?', r: 'Non. Le texte se compose dans votre navigateur, à mesure que vous écrivez. Rien n’est transmis à Stackup ni à un tiers, rien n’est enregistré : si vous fermez la page, la saisie disparaît. Pensez à copier le texte avant.' },
  { q: 'Ce texte suffit-il pour être en règle ?', r: 'C’est un modèle de départ, pas un avis juridique. Il couvre les rubriques usuelles ; selon votre activité, d’autres informations peuvent être exigées. Relisez-le, complétez les repères entre crochets, et vérifiez sur service-public.fr ou auprès de votre organisme professionnel.' },
  { q: 'Où placer les mentions légales sur mon site ?', r: 'Sur une page dédiée, accessible depuis toutes les pages, en général par un lien dans le pied de page nommé « Mentions légales ». Le lien doit être visible et facile à trouver, sur mobile comme sur ordinateur.' },
  { q: 'Dois-je indiquer mon adresse personnelle ?', r: 'Un professionnel indique en principe l’adresse de son activité. Si vous travaillez depuis votre domicile, renseignez-vous sur les possibilités prévues pour une adresse de domiciliation avant de publier : service-public.fr détaille les solutions.' },
  { q: 'Qu’est-ce que la mention « TVA non applicable, art. 293 B du CGI » ?', r: 'C’est la formule utilisée par les entrepreneurs qui bénéficient de la franchise en base de TVA : ils ne facturent pas la TVA. Si vous êtes assujetti à la TVA, vous indiquez à la place votre numéro de TVA intracommunautaire. En cas de doute sur votre régime, demandez à votre comptable ou au service des impôts des entreprises.' },
  { q: 'Dois-je mettre à jour mes mentions légales ?', r: 'Oui, dès qu’une information change : adresse, forme juridique, capital, hébergeur, numéro de téléphone. Une mention fausse ou périmée est presque aussi gênante qu’une mention absente.' },
]

const URL_PAGE = `${ORIGINE}/outils/generateur-mentions-legales`

const APPLICATION = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Générateur de mentions légales',
  url: URL_PAGE,
  description: 'Outil gratuit qui compose en direct, dans le navigateur, un modèle de mentions légales à copier ou à imprimer.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Tout navigateur web',
  inLanguage: 'fr',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  creator: { '@type': 'Organization', name: 'Stackup Agency', url: ORIGINE },
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          APPLICATION,
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'Outils', chemin: '/outils' },
            { nom: 'Générateur de mentions légales', chemin: '/outils/generateur-mentions-legales' },
          ]),
          faqPage(FAQ.map((f) => ({ q: f.q, a: f.r }))),
        ]}
      />
      <Document
        moment="outils-mentions"
        forme="cadran"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/outils', nom: 'Outils' },
          { href: '/outils/generateur-mentions-legales', nom: 'Générateur de mentions légales' },
        ]}
        etiquette="Outil gratuit · dans votre navigateur"
        titre="Vos mentions légales, prêtes à copier."
        chapo="Renseignez votre statut, votre hébergeur et vos coordonnées : le texte se compose en direct. Aucune donnée n’est envoyée, rien n’est conservé. Ce texte est un modèle, pas un conseil juridique."
        large
      >
        <GenerateurMentions />

        <div className="su-prose su-gm-texte">
          <h2>Que demande la loi pour les mentions légales ?</h2>
          <p>
            <strong>Tout site tenu à titre professionnel doit permettre de savoir qui l’édite, qui le dirige et qui l’héberge.</strong> Ces obligations viennent de la loi pour la confiance dans l’économie numérique, dite LCEN. Les mentions se placent sur une page à part, accessible depuis chaque page du site.
          </p>
          <p>
            Le détail précis, les sanctions et les cas particuliers évoluent : le texte de référence et les fiches pratiques sont sur <a href="https://www.service-public.fr" target="_blank" rel="noopener noreferrer">service-public.fr<span className="sr-only"> (nouvel onglet)</span></a>. Vérifiez-y votre situation avant de publier.
          </p>

          <h2>Qui doit avoir des mentions légales ?</h2>
          <p>
            Tout professionnel qui publie un site : le plombier avec sa page de contact, la coiffeuse qui prend ses rendez-vous en ligne, le caviste qui vend ses bouteilles, le kinésithérapeute qui présente son cabinet. Le fait que le site soit petit, gratuit ou sans boutique ne change rien : dès qu’il présente une activité professionnelle, il lui faut ses mentions. Une simple page de présentation avec un numéro de téléphone est déjà concernée, tout comme une page sur un réseau social ou une plateforme de réservation si vous en êtes l’éditeur.
          </p>
          <p>
            Un particulier qui tient un site personnel n’est pas soumis aux mêmes règles : il peut rester discret sur son identité vis-à-vis du public, à condition que son hébergeur, lui, la connaisse. Si votre site rapporte un revenu ou fait la promotion d’une activité, considérez-vous comme un professionnel.
          </p>

          <h2>Quelles informations selon votre statut ?</h2>
          <p>Le socle ne change pas, mais les détails varient avec la forme de votre activité. Le générateur ci-dessus adapte les champs et la rédaction à votre statut ; voici ce qu’il faut avoir en tête.</p>
          <ul>
            <li><strong>Entrepreneur individuel ou micro-entrepreneur</strong> : votre nom et prénom, votre adresse, votre numéro SIREN ou SIRET, un moyen de contact.</li>
            <li><strong>Société</strong> : la dénomination, la forme juridique, le montant du capital, l’adresse du siège social, le numéro d’immatriculation.</li>
            <li><strong>Profession libérale réglementée</strong> : en plus de l’identité, l’ordre ou l’organisme dont vous dépendez et votre numéro d’inscription.</li>
            <li><strong>Dans tous les cas</strong> : le nom du directeur de la publication, et le nom, l’adresse et le téléphone de l’hébergeur.</li>
            <li><strong>Selon l’activité</strong> : le numéro de TVA si vous y êtes assujetti, une autorisation ou une qualification pour une activité réglementée, le médiateur de la consommation si vous vendez à des particuliers.</li>
          </ul>

          <h2>Quelles sont les erreurs fréquentes ?</h2>
          <ul>
            <li><strong>Copier les mentions d’un autre site</strong> : elles décrivent une autre entreprise, avec un autre statut et un autre hébergeur. Le résultat est faux, et ça se voit.</li>
            <li><strong>Oublier l’hébergeur</strong> ou garder celui d’un ancien site après un changement.</li>
            <li><strong>Laisser des champs vides ou des crochets</strong> du modèle dans la version publiée.</li>
            <li><strong>Ne pas mettre à jour</strong> après un déménagement, un changement de forme juridique ou d’hébergeur.</li>
            <li><strong>Cacher la page</strong> : un lien minuscule, gris sur gris, ou seulement présent sur l’accueil. Le lien doit être lisible partout.</li>
            <li><strong>Mélanger toutes les rubriques</strong> : les mentions légales, la politique de confidentialité et les conditions de vente sont trois documents différents.</li>
          </ul>

          <h2>Ce qu’on ne met pas dans les mentions légales</h2>
          <p>
            Les mentions légales identifient l’éditeur ; elles ne remplacent pas les autres documents. N’y mettez pas vos conditions générales de vente, vos tarifs ou vos promesses commerciales : une boutique en ligne a besoin de ses propres conditions de vente.
          </p>
          <p>
            Le détail de la collecte de données personnelles (ce que vous collectez, pourquoi, combien de temps, à qui vous les transmettez) se trouve dans une politique de confidentialité à part ; les mentions légales y renvoient. De même pour les cookies : une page ou un bandeau dédié explique lesquels sont utilisés. Le site de la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">CNIL<span className="sr-only"> (nouvel onglet)</span></a> propose des modèles et des conseils pour ces deux sujets.
          </p>
          <p>
            Enfin, n’écrivez pas d’information que vous n’avez pas : un numéro d’inscription « en attendant », une qualification que vous n’avez pas encore. Mieux vaut un champ à compléter qu’une mention inexacte. Et ne publiez jamais le texte avec les repères entre crochets : relisez-le à voix haute, une fois en ligne, comme le ferait un visiteur qui cherche à savoir à qui il a affaire.
          </p>

          <h2>Et ensuite ?</h2>
          <p>
            Collez le texte dans une page dédiée, ajoutez le lien dans le pied de page, puis relisez-le une fois publié. Si vous préparez un nouveau site, nous construisons des <Link href="/services/creation-de-site-internet">sites sur mesure</Link> avec leurs pages légales en place, et la <Link href="/services/maintenance">maintenance</Link> inclut de les garder à jour. Vous voulez d’abord faire le tour des autres ressources ? Les <Link href="/outils">outils gratuits</Link> sont réunis sur une page. Une question sur votre cas ? <Link href="/contact">Écrivez-nous</Link>.
          </p>
        </div>

        <section className="su-gm-faq" aria-labelledby="su-gm-faq">
          <h2 id="su-gm-faq" className="su-display">
            Questions fréquentes
          </h2>
          <Accordeon questions={FAQ} groupe="su-gm-acc" />
        </section>
      </Document>
    </>
  )
}
