/**
 * CONDITIONS GÉNÉRALES DE VENTE — reprises de l'ancien site, dans le gabarit
 * Document. Prix, acompte, révisions et support lus dans config/site (source
 * unique) ; aucune durée de réalisation : le calendrier se fixe au devis.
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import { SITE, formatAPartirDe } from '@/config/site'
import { LIGNES } from '@/config/tarifs.generated'
import { euros } from '@/domain/devis/resume'

const prixDe = (code: string) => LIGNES.find((l) => l.code === code)?.prix ?? 0
import { JsonLd, filAriane, meta } from '@/lib/seo'

export const metadata = meta({
  titre: 'Conditions générales de vente — Stackup Agency',
  description: 'Conditions générales de vente de Stackup Agency : devis, prix, acompte et solde, calendrier fixé ensemble, révisions, support, propriété du code et maintenance.',
  chemin: '/cgv',
})

const C = SITE.conditions

const SOMMAIRE = [
  { id: 'prestataire', titre: '1. Prestataire' },
  { id: 'objet', titre: '2. Objet' },
  { id: 'prix', titre: '3. Offres et prix' },
  { id: 'devis', titre: '4. Devis et commande' },
  { id: 'paiement', titre: '5. Paiement' },
  { id: 'calendrier', titre: '6. Calendrier et réception' },
  { id: 'revisions', titre: '7. Révisions' },
  { id: 'support', titre: '8. Support après livraison' },
  { id: 'hebergement', titre: '9. Hébergement et domaine' },
  { id: 'propriete', titre: '10. Propriété intellectuelle' },
  { id: 'retractation', titre: '11. Droit de rétractation' },
  { id: 'responsabilite', titre: '12. Responsabilité' },
  { id: 'contenus', titre: '13. Contenus du client' },
  { id: 'evolution', titre: '14. Évolution du périmètre' },
  { id: 'parrainage', titre: '15. Parrainage' },
  { id: 'maintenance', titre: '16. Maintenance' },
  { id: 'mediation', titre: '17. Médiation' },
  { id: 'droit', titre: '18. Droit applicable' },
  { id: 'acceptation', titre: '19. Acceptation' },
]

export default function CGV() {
  return (
    <>
      <JsonLd data={filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Conditions générales de vente', chemin: '/cgv' }])} />
      <Document
        moment="doc-cgv"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/cgv', nom: 'CGV' },
        ]}
        etiquette="Conditions de vente"
        titre="Conditions générales de vente"
        chapo="Ce qui est inclus, comment on paie, à qui appartient le code. Le devis précise le reste, par écrit, avant de commencer."
        maj="13 octobre 2026"
        sommaire={SOMMAIRE}
      >
        <h2 id="prestataire">1. Identification du prestataire</h2>
        <ul>
          <li>
            <strong>Nom commercial :</strong> {SITE.nom}
          </li>
          <li>
            <strong>Fondateur :</strong> {SITE.fondateur}
          </li>
          <li>
            <strong>Forme juridique et titulaire :</strong> [à compléter par le propriétaire]
          </li>
          <li>
            <strong>Adresse :</strong> 706 rue des Cormiers, 37340 Savigné-sur-Lathan
          </li>
          <li>
            <strong>E-mail :</strong> <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </li>
          <li>
            <strong>SIRET :</strong> [à compléter par le propriétaire]
          </li>
          <li>
            <strong>TVA :</strong> {SITE.mentions.tva}
          </li>
        </ul>

        <h2 id="objet">2. Objet</h2>
        <p>
          Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre {SITE.nom} et tout client qui lui commande l’une des prestations suivantes : création de sites internet, boutiques en ligne, outils de gestion sur mesure, maintenance et services associés.
        </p>

        <h2 id="prix">3. Offres et prix</h2>
        <p>Les prix sont exprimés en euros, nets ({SITE.mentions.tva}). Ce sont des prix de départ : le prix définitif est celui du devis signé.</p>
        <table>
          <thead>
            <tr>
              <th scope="col">Prestation</th>
              <th scope="col">Prix</th>
            </tr>
          </thead>
          <tbody>
            {SITE.offres.map((o) => (
              <tr key={o.id}>
                <td>{o.nom}</td>
                <td>{formatAPartirDe(o)}</td>
              </tr>
            ))}
            <tr>
              <td>Abonnement mensuel (facultatif)</td>
              <td>composé selon vos besoins, calculé au devis</td>
            </tr>
            <tr>
              <td>Démo de la page d’accueil et visio de conseil</td>
              <td>{euros(prixDe('P02'))} et {euros(prixDe('P03'))}, facturées à part</td>
            </tr>
          </tbody>
        </table>
        <p>
          Le contenu de chaque offre est détaillé sur la page <Link href="/tarifs">tarifs</Link> et repris au devis. Toute demande hors offre fait l’objet d’un devis personnalisé.
        </p>

        <h2 id="devis">4. Devis et commande</h2>
        <p>
          Toute prestation fait l’objet d’un devis gratuit préalable, valable {SITE.mentions.devisValable}. La commande est ferme à réception du devis signé (ou d’un accord écrit par e-mail reprenant sa référence) et du versement de l’acompte.
        </p>

        <h2 id="paiement">5. Modalités de paiement</h2>
        <ul>
          <li>
            <strong>{C.acomptePourcent} %</strong> du montant total à la signature du devis ;
          </li>
          <li>
            <strong>{C.soldePourcent} %</strong> à la livraison, payables au plus tard 30 jours après la date de livraison.
          </li>
        </ul>
        <p>Paiement par virement bancaire, PayPal ou carte bancaire.</p>
        <p>
          En cas de retard de paiement : pénalités au taux de trois fois le taux d’intérêt légal, et indemnité forfaitaire de 40 € pour frais de recouvrement (art. L. 441-10 et D. 441-5 du Code de commerce).
        </p>

        <h2 id="calendrier">6. Calendrier, livraison et réception</h2>
        <p>
          Le calendrier de réalisation est fixé ensemble au devis. Il court à compter de l’encaissement de l’acompte et de la réception de l’ensemble des éléments nécessaires (textes, images, accès, informations), et il est suspendu tant qu’un élément ou une validation est attendu du client. Si un décalage se présente, {SITE.nom} vous en informe par écrit et propose une nouvelle date.
        </p>
        <p>
          À la livraison, le client dispose d’un délai de validation, précisé au devis, pour signaler par écrit toute non-conformité avec les spécifications du devis. Passé ce délai sans retour écrit, la prestation est considérée comme acceptée.
        </p>

        <h2 id="revisions">7. Révisions</h2>
        <p>
          Chaque création inclut {C.rendezVousInclus} rendez-vous de finalisation et {C.revisionsIncluses} séries de modifications sur la maquette avant le développement final. Une série est une demande groupée de modifications (textes, couleurs, images, mise en page) dans la limite du design validé. L’ajout de pages ou de fonctionnalités n’en est pas une. Au-delà, le temps supplémentaire est facturé {C.tarifHoraire} € de l’heure, toujours annoncé avant d’être fait.
        </p>

        <h2 id="support">8. Support après livraison</h2>
        <p>
          Un mois d’ajustements est inclus après la mise en ligne : les petites modifications du périmètre prévu sont gratuites, et la correction des anomalies imputables à {SITE.nom} est assurée. Au-delà, toute intervention relève de l’abonnement (maintenance, heures de modifications) ou d’un devis.
        </p>

        <h2 id="hebergement">9. Hébergement et nom de domaine</h2>
        <p>
          Le nom de domaine est offert la première année. Ensuite, il est inclus dans l’abonnement ; sans abonnement, son renouvellement et celui de l’hébergement sont à la charge du client, au tarif du prestataire technique. En cas de départ, {SITE.nom} transfère l’ensemble des accès (hébergement, nom de domaine, fichiers), sans frais ni rétention, une fois les sommes dues réglées.
        </p>

        <h2 id="propriete">10. Propriété intellectuelle</h2>
        <p>
          Une fois le solde intégralement réglé, le client devient pleinement propriétaire du code source et des éléments créés pour son projet. Il peut librement les réutiliser, les modifier ou les héberger ailleurs, sans restriction de la part de {SITE.nom}. Les éléments de tiers intégrés (bibliothèques libres, polices, images sous licence) restent régis par leurs propres licences.
        </p>
        <p>
          Sauf opposition écrite du client à la signature du devis, {SITE.nom} peut présenter la réalisation dans son portfolio. Une mention « Réalisé par {SITE.nom} » figure par défaut en pied de page ; son retrait peut être demandé gratuitement.
        </p>

        <h2 id="retractation">11. Droit de rétractation</h2>
        <p>
          Conformément à l’article L. 221-18 du Code de la consommation, le client particulier dispose d’un délai de <strong>14 jours</strong> pour se rétracter à compter de la signature du devis. S’il souhaite que la prestation commence avant l’expiration de ce délai, il en fait la demande expresse et écrite ; il perd alors son droit de rétractation une fois la prestation pleinement exécutée, et reste redevable du travail réalisé jusqu’à sa rétractation.
        </p>

        <h2 id="responsabilite">12. Responsabilité</h2>
        <p>
          {SITE.nom} s’engage à fournir une prestation conforme aux spécifications du devis. Sa responsabilité ne peut être engagée en cas de mauvaise utilisation du site par le client après livraison, de modifications effectuées par un tiers, ni de défaillance d’un prestataire tiers (hébergement, nom de domaine, paiement). Aucun positionnement dans les moteurs de recherche n’est garanti.
        </p>

        <h2 id="contenus">13. Contenus fournis par le client</h2>
        <p>
          Le client garantit disposer de tous les droits nécessaires sur les contenus qu’il fournit (textes, images, logos, vidéos). {SITE.nom} ne peut être tenue responsable d’une utilisation non autorisée de contenus fournis par le client.
        </p>

        <h2 id="evolution">14. Évolution du périmètre</h2>
        <p>
          Le prix peut évoluer selon la complexité du projet, le volume de contenu ou des demandes nouvelles du client. Tout ajustement fait l’objet d’un avenant écrit et signé par les deux parties, avant d’être réalisé.
        </p>

        <h2 id="parrainage">15. Programme de parrainage</h2>
        <p>
          Les conditions du programme de parrainage sont décrites sur la page <Link href="/parrainage">parrainage</Link> et rappelées au devis du filleul. Le parrainage doit être signalé lors de la prise de contact, avant la signature du devis.
        </p>

        <h2 id="maintenance">16. Maintenance</h2>
        <p>
          Les abonnements de maintenance sont sans engagement de durée minimum. Ils peuvent être résiliés à tout moment par le client, avec un préavis de <strong>30 jours</strong> notifié par e-mail à <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Le client conserve l’intégralité de son code source et de ses données, sans frais ni contrainte.
        </p>

        <h2 id="mediation">17. Médiation de la consommation</h2>
        <p>
          Conformément à l’article L. 612-1 du Code de la consommation, le client particulier peut recourir gratuitement à un médiateur de la consommation en cas de litige non résolu à l’amiable. Médiateur compétent : [à compléter par le propriétaire].
        </p>

        <h2 id="droit">18. Droit applicable et juridiction</h2>
        <p>Les présentes CGV sont soumises au droit français. En cas de litige, et après tentative de résolution amiable, les tribunaux français sont seuls compétents.</p>

        <h2 id="acceptation">19. Acceptation</h2>
        <p>
          Toute commande passée auprès de {SITE.nom} implique l’acceptation pleine et entière des présentes CGV, qui prévalent sur tout document du client. Les CGV applicables sont celles en vigueur au jour de la signature du devis.
        </p>
        <p>
          Voir aussi : <Link href="/tarifs">tarifs</Link>, <Link href="/mentions-legales">mentions légales</Link>, <Link href="/contact">contact</Link>.
        </p>
      </Document>
    </>
  )
}
