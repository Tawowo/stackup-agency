/**
 * /faq — les questions de l'ancien site, regroupées par thème, en accordéons
 * natifs (details/summary). Prix et conditions lus dans SITE, chaque réponse
 * passée par conforme(). Aucune durée de réalisation : le calendrier se fixe
 * au devis.
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import MondeFaq from '@/components/mondes/MondeFaq'
import Accordeon from '@/components/editorial/Accordeon'
import Action from '@/components/ui/Action'
import { SITE, formatAPartirDe } from '@/config/site'
import { LIGNES } from '@/config/tarifs.generated'
import { exemplesAbonnement } from '@/domain/devis/offres'
import { conforme } from '@/lib/conformite'
import { JsonLd, faqPage, filAriane, meta } from '@/lib/seo'
import '@/experiences/ressources/ressources.css'

export const metadata = meta({
  titre: 'Questions fréquentes — création de site et d’outils sur mesure | Stackup Agency',
  description: 'Prix, déroulé d’un projet, paiement, propriété du code, hébergement, maintenance, référencement : les réponses aux questions qu’on nous pose avant de commencer.',
  chemin: '/faq',
})

const C = SITE.conditions
const aboMin = exemplesAbonnement()[0]!.mensuel
const rapport = LIGNES.find((l) => l.code === 'A17')
const offres = SITE.offres.map((o) => `${o.nom} : ${formatAPartirDe(o)}`).join(' ; ')

const THEMES: { id: string; titre: string; questions: { q: string; r: string }[] }[] = [
  {
    id: 'projet',
    titre: 'Le déroulé d’un projet',
    questions: [
      {
        q: 'Comment se déroule la création de mon site ?',
        r: `1. Prise de contact et échange sur votre besoin. 2. Devis et bon de commande. 3. Acompte de ${C.acomptePourcent} %. 4. Maquette. 5. Développement. 6. Vos retours et les ajustements (${C.revisionsIncluses} séries de modifications comprises sur la maquette, puis un mois d’ajustements après la mise en ligne). 7. Mise en ligne. 8. Prise en main : on vous montre comment faire vivre votre site.`,
      },
      {
        q: 'Combien de temps faut-il pour créer mon site ?',
        r: 'L’estimateur de la page tarifs donne un délai indicatif, calculé à partir du travail que représente votre projet. Le calendrier est ensuite fixé ensemble au devis : il dépend du périmètre et du moment où vos contenus (textes, photos, accès) sont prêts, et il est écrit avant de commencer.',
      },
      {
        q: 'Combien de modifications puis-je demander ?',
        r: `${C.revisionsIncluses} séries de retours sont comprises dans chaque projet. Au-delà, le temps supplémentaire est facturé ${C.tarifHoraire} € de l’heure, et toujours annoncé avant d’être fait.`,
      },
      {
        q: 'Travaillez-vous à distance ou en présentiel ?',
        r: `Surtout à distance, par visio, téléphone et e-mail : c’est ce qui permet de travailler avec des entreprises partout en France. L’atelier est à ${SITE.ville} ; autour, un déplacement est possible quand il est utile.`,
      },
      {
        q: 'Pourquoi vous plutôt qu’une agence classique ?',
        r: `Un seul interlocuteur, ${SITE.fondateur}, qui conçoit et code lui-même votre site : pas d’intermédiaire commercial. Du code écrit pour vous, pas un modèle rempli. Des prix « à partir de » annoncés d’entrée, et des démonstrations en ligne, étiquetées comme telles.`,
      },
    ],
  },
  {
    id: 'tarifs',
    titre: 'Tarifs et paiement',
    questions: [
      {
        q: 'Quels sont vos tarifs ?',
        r: `${offres}. Le prix exact dépend de votre projet et il est fixé au devis. Ces prix comprennent le design, le développement, la mise en ligne et le nom de domaine offert la première année. L’hébergement et la maintenance se règlent dans un abonnement mensuel facultatif, composé selon vos besoins.`,
      },
      {
        q: 'Y a-t-il des frais cachés ?',
        r: 'Non. Ce qui est compris est écrit dans le devis, ligne par ligne. Ce qui ne l’est pas — une page en plus, une révision supplémentaire — a un prix publié sur la page tarifs, et rien n’est ajouté sans votre accord.',
      },
      {
        q: 'Comment se déroule le paiement ?',
        r: `${C.acomptePourcent} % d’acompte à la commande, ${C.soldePourcent} % à la livraison. Par virement, carte bancaire ou PayPal. ${SITE.mentions.tva}.`,
      },
      {
        q: 'Existe-t-il des aides pour financer mon site ?',
        r: 'Des dispositifs publics accompagnent parfois la transformation numérique des TPE (France Num, aides régionales). Ils changent souvent : renseignez-vous auprès de votre chambre de commerce ou de votre chambre des métiers.',
      },
    ],
  },
  {
    id: 'technique',
    titre: 'Propriété, technique et hébergement',
    questions: [
      {
        q: 'Suis-je propriétaire du code ?',
        r: 'Oui. À réception du solde, une cession de droits vous transfère le code et les créations graphiques. Vous êtes libre de le modifier, de le confier à un autre prestataire ou de changer d’hébergeur.',
      },
      {
        q: 'Où est hébergé mon site ?',
        r: 'Par défaut sur Vercel, une plateforme d’hébergement professionnelle, en HTTPS. Le code étant à vous, un autre hébergeur reste possible : le choix se discute au devis.',
      },
      {
        q: 'Que se passe-t-il après les 12 mois d’hébergement inclus ?',
        r: `Deux possibilités : un abonnement composé selon vos besoins, à partir d’environ ${aboMin} € par mois pour un site d’une page, ou la reprise de votre code pour l’héberger vous-même. Le nom de domaine, offert la première année, reste ensuite à votre charge, sauf abonnement actif : il est alors inclus.`,
      },
      {
        q: 'Mon site sera-t-il sécurisé ?',
        r: `Chaque site est livré en HTTPS, avec un certificat SSL. Les mises à jour, les sauvegardes et les corrections suivies dans le temps font partie de l’abonnement, à partir d’environ ${aboMin} € par mois, sans engagement, préavis d’un mois.`,
      },
      {
        q: 'Mon site s’affichera-t-il bien sur mobile ?',
        r: 'Oui. Chaque page est conçue pour le téléphone, la tablette et l’ordinateur, et vérifiée sur chacun avant la mise en ligne.',
      },
    ],
  },
  {
    id: 'visibilite',
    titre: 'Référencement et visibilité',
    questions: [
      {
        q: 'Le référencement est-il inclus ?',
        r: 'Un référencement de base est compris dans chaque projet : balises titre et description, structure HTML sémantique, données structurées, plan du site XML, pages rapides et adaptées au mobile.',
      },
      {
        q: 'Proposez-vous un suivi du référencement ?',
        r: `Oui, en option dans l’abonnement : un rapport mensuel d’une page (visites, demandes reçues, évolution)${rapport ? `, à partir de ${rapport.prix} € par mois` : ''}.`,
      },
      {
        q: 'Comment être visible localement ?',
        r: 'Chaque site est préparé pour la recherche locale : données structurées d’entreprise locale, plan d’accès, et des pages pensées pour votre ville et votre département.',
      },
    ],
  },
  {
    id: 'documents',
    titre: 'Documents et contrats',
    questions: [
      {
        q: 'Avez-vous des CGV et un contrat ?',
        r: 'Oui. Chaque projet est encadré par un contrat de prestation signé, des conditions générales de vente et une cession de droits explicite.',
      },
      {
        q: 'Où retrouver mes documents ?',
        r: 'Les modèles (devis, bon de commande, contrats, accord de confidentialité, avenant…) sont téléchargeables sur la page Ressources › Documents. Votre exemplaire personnalisé vous est remis par e-mail au fil du projet.',
      },
    ],
  },
]

const PROPRES = THEMES.map((t) => ({ ...t, questions: t.questions.map((x) => ({ q: x.q, r: conforme(x.r) })) }))

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'Questions fréquentes', chemin: '/faq' },
          ]),
          faqPage(PROPRES.flatMap((t) => t.questions.map((x) => ({ q: x.q, a: x.r })))),
        ]}
      />
      <Document
        moment="doc-faq"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/faq', nom: 'Questions fréquentes' },
        ]}
        etiquette={`${PROPRES.reduce((n, t) => n + t.questions.length, 0)} questions · ${PROPRES.length} thèmes`}
        titre="Les questions qu’on nous pose avant de commencer."
        chapo="Prix, déroulé, propriété, hébergement, référencement : les réponses courtes. Pour le reste, on en parle de vive voix."
        monde={<MondeFaq qui={SITE.fondateur} echanges={PROPRES.flatMap((t) => t.questions.slice(0, 1)).map((x) => ({ q: x.q, r: x.r.length > 190 ? `${x.r.slice(0, 187).replace(/\s+\S*$/, '')}…` : x.r }))} />}
        sommaire={PROPRES.map((t) => ({ id: t.id, titre: t.titre }))}
      >
        {PROPRES.map((t) => (
          <section key={t.id} className="su-faq__theme" aria-labelledby={t.id}>
            <h2 id={t.id}>{t.titre}</h2>
            <Accordeon questions={t.questions} groupe={`su-acc-${t.id}`} />
          </section>
        ))}

        <h2 id="parrainage">Vous connaissez quelqu’un qui a besoin d’un site ?</h2>
        <p>
          Le <Link href="/parrainage">programme de parrainage</Link> profite à vous deux : une récompense pour vous, une remise pour la personne que vous recommandez.
        </p>

        <h2 id="contact">Une question sans réponse ici ?</h2>
        <p>Écrivez-nous : la réponse vient de la personne qui fera votre site.</p>
        <p>
          <Action href="/contact">Poser ma question</Action>
        </p>
        <p>
          <Link href="/tarifs">Voir les tarifs</Link> · <Link href="/services">Les services</Link> · <Link href="/ressources">Les ressources</Link>
        </p>
      </Document>
    </>
  )
}
