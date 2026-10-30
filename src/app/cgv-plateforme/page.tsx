/**
 * CONDITIONS GÉNÉRALES DE LA PLATEFORME — distinctes des CGV de l'agence (qui prévoient la cession du code au client) :
 * ici, licence d'utilisation pendant l'abonnement, aucune cession du code, le club reste propriétaire de ses données et de ses contenus.
 *
 * À FAIRE RELIRE PAR UN PROFESSIONNEL DU DROIT AVANT LE PREMIER CONTRAT.
 * TODO juriste : (1) reconduction — information des non-professionnels (§ 9) : ne mettre en place AUCUNE automatisation de reconduction ni de
 * relance tant que ce point n'est pas validé ; (2) durées proposées (préavis, mise en demeure, révision des prix) : config/offre-clubs.ts ;
 * (3) clause de juridiction ; (4) sous-traitants ultérieurs et localisation des données : annexe 1.
 * Les montants ne sont jamais écrits ici : ils viennent de data/offre-clubs/pricing.ts.
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import { COMPANY, adresseComplete } from '@/config/company'
import { CGV_PLATEFORME as C, CLUBS, DEMO, MENTION_FFT, PRODUCT_NAME, SOUS_TRAITANTS } from '@/config/offre-clubs'
import { SITE } from '@/config/site'
import { PRICING } from '@/data/offre-clubs/pricing'
import { JsonLd, filAriane, meta } from '@/lib/seo'

export const metadata = meta({
  titre: `Conditions générales de la plateforme ${PRODUCT_NAME}`,
  description: 'Conditions générales de l’abonnement au site et au logiciel pour clubs : licence d’utilisation, prix, durée, données personnelles, fin de contrat, responsabilité.',
  chemin: '/cgv-plateforme',
})

const SOMMAIRE = [
  { id: 'parties', titre: '1. Les parties' },
  { id: 'objet', titre: '2. Objet' },
  { id: 'licence', titre: '3. Licence d’utilisation' },
  { id: 'categories', titre: '4. Catégories et licenciés' },
  { id: 'prix', titre: '5. Prix' },
  { id: 'mise-en-place', titre: '6. Mise en place' },
  { id: 'abonnement', titre: '7. Abonnement et paiement' },
  { id: 'duree', titre: '8. Durée et résiliation' },
  { id: 'reconduction', titre: '9. Information sur la reconduction' },
  { id: 'impayes', titre: '10. Retards et impayés' },
  { id: 'support', titre: '11. Support' },
  { id: 'disponibilite', titre: '12. Disponibilité' },
  { id: 'evolutions', titre: '13. Évolutions et développements' },
  { id: 'deplacements', titre: '14. Déplacements' },
  { id: 'donnees', titre: '15. Données personnelles' },
  { id: 'fin', titre: '16. Fin du contrat' },
  { id: 'responsabilite', titre: '17. Responsabilité' },
  { id: 'divers', titre: '18. Force majeure, droit applicable, litiges' },
  { id: 'annexe', titre: 'Annexe 1 — Traitement des données' },
]

export default function CgvPlateforme() {
  const pc = (n: number) => Math.round(n * 100)
  return (
    <>
      <JsonLd data={filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Clubs de tennis', chemin: CLUBS }, { nom: 'Conditions générales de la plateforme', chemin: '/cgv-plateforme' }])} />
      <Document
        moment="doc-cgv-plateforme"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: CLUBS, nom: 'Clubs de tennis' },
          { href: '/cgv-plateforme', nom: 'Conditions de la plateforme' },
        ]}
        etiquette="Conditions générales"
        titre={`Conditions générales de la plateforme ${PRODUCT_NAME}`}
        chapo="Les règles de l’abonnement au site et au logiciel d’un club : ce que le club obtient, ce qu’il paie, combien de temps, et ce qu’il devient de ses données."
        maj={new Date(C.maj).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
        sommaire={SOMMAIRE}
      >
        <p>
          <strong>Version {C.version}.</strong> Ces conditions s’appliquent à tout abonnement à la plateforme {PRODUCT_NAME}. Elles sont distinctes des <Link href="/cgv">conditions générales de vente de l’agence</Link>, qui régissent la création de sites et d’outils livrés au client.
        </p>

        <h2 id="parties">1. Les parties</h2>
        <p>
          <strong>Le Prestataire :</strong> {COMPANY.denomination} (nom commercial : {COMPANY.nomCommercial}), {COMPANY.formeJuridique}, SIREN {COMPANY.sirenAffiche}, SIRET {COMPANY.siretAffiche}, {adresseComplete}. Contact : <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. {COMPANY.tva.mention}.
        </p>
        <p>
          <strong>Le Club :</strong> l’association sportive désignée au devis signé, représentée par la personne qui signe. Le Club peut comprendre des sections de tennis, de padel et de pickleball.
        </p>

        <h2 id="objet">2. Objet</h2>
        <p>
          Les présentes conditions règlent la mise à disposition, par abonnement, d’une plateforme en ligne composée, selon la formule choisie au devis : (a) le site internet du Club, (b) le logiciel de gestion du Club, ou (c) les deux, avec l’espace membre et parent. Les options choisies au devis s’y ajoutent.
        </p>
        <p>
          {PRODUCT_NAME} n’est ni affilié ni approuvé par la Fédération française de tennis. ADOC et Ten’Up sont des services de la FFT. La plateforme permet l’import et l’export de fichiers ADOC ; elle n’offre aucune connexion directe avec ADOC. {MENTION_FFT}
        </p>

        <h2 id="licence">3. Licence d’utilisation, propriété du code, données et contenus</h2>
        <p>
          Le Prestataire concède au Club un droit d’utilisation de la plateforme, <strong>non exclusif</strong>, non cessible, pour la durée de l’abonnement et pour les besoins du Club. <strong>Aucune cession du code n’est consentie</strong> : le code source, le design de la plateforme, ses composants et leurs évolutions restent la propriété du Prestataire.
        </p>
        <p>
          Le Club reste <strong>propriétaire de ses données</strong> (adhérents, familles, dossiers, paiements, résultats…) <strong>et de ses contenus</strong> (textes, photos, logo, documents). Il garantit disposer des droits nécessaires sur les contenus qu’il publie, notamment le droit à l’image des personnes photographiées, et en est seul responsable. Il accorde au Prestataire le droit de les héberger et de les afficher pour fournir le service, et rien de plus.
        </p>

        <h2 id="categories">4. Catégories et licenciés</h2>
        <p>
          Le prix dépend d’une <strong>catégorie</strong> fixée selon le nombre de licenciés FFT de la saison en cours, sections tennis, padel et pickleball comprises. Les catégories sont : {PRICING.categories.map((c) => `${c.nom} (${c.licencies.min}${c.licencies.max ? ` à ${c.licencies.max}` : ' et plus'})`).join(', ')}.
        </p>
        <p>
          Le Club fournit un justificatif : un export ADOC, ou le rapport d’assemblée générale mentionnant les chiffres des trois dernières saisons. La catégorie est <strong>revue une fois par an, au renouvellement</strong>, jamais en cours de saison.
        </p>

        <h2 id="prix">5. Prix</h2>
        <p>
          Les prix affichés sur le site stackup-agency.fr (pages de l’offre et simulateur) sont <strong>indicatifs</strong> : ils sont établis pour un club type de chaque catégorie. Le <strong>prix ferme</strong> est celui du devis signé. Les prix sont exprimés en euros ; {COMPANY.tva.mention}.
        </p>
        <p>
          Le Prestataire peut réviser ses prix <strong>au plus une fois par an</strong>, en l’annonçant par écrit au moins {C.revisionPrixPreavisMois} mois avant leur entrée en vigueur ; le Club peut alors résilier selon l’article 8. Aucune autre remise que celle du pack site + logiciel ({pc(PRICING.packDiscount)} %) et celle du paiement annuel ({pc(PRICING.annualDiscount)} %) n’est appliquée.
        </p>

        <h2 id="mise-en-place">6. Mise en place</h2>
        <p>
          La mise en place (création du site, paramétrage du logiciel, reprise des membres, formation) est facturée au prix du devis. Elle est payable <strong>en une fois ou en {PRICING.miseEnPlaceEnFois} fois sans frais</strong>, sur les {PRICING.miseEnPlaceEnFois} premiers mois. Le devis indique un délai indicatif, qui n’est pas un engagement de livraison à date fixe. Les heures d’accompagnement comprises dans la catégorie servent à la formation et à la prise en main ; au-delà, elles sont facturées au tarif du devis, par tranche de {PRICING.heureSupplementaire.trancheMinutes} minutes.
        </p>

        <h2 id="abonnement">7. Abonnement et paiement</h2>
        <p>
          L’abonnement est payable <strong>chaque mois par prélèvement automatique</strong> (mandat SEPA), ou <strong>à l’année</strong> avec {pc(PRICING.annualDiscount)} % de moins. Il comprend l’hébergement, le nom de domaine, le https, les sauvegardes quotidiennes, la surveillance et la sécurité, les mises à jour et les nouvelles fonctionnalités de la formule, la maintenance, le support, des comptes illimités pour le bureau et les enseignants, des membres illimités dans la catégorie, des e-mails automatiques dans un usage normal d’association, le stockage de la catégorie, l’export des données et le contrat de traitement des données.
        </p>
        <p>
          Ne sont pas compris : les heures d’accompagnement au-delà de celles incluses, les développements propres à un seul club, les options, les frais de paiement en ligne (HelloAsso est gratuit pour le Club ; avec un autre prestataire, les frais sont à la charge du Club), la saisie du contenu à la place du Club, les SMS et la gestion des accès physiques aux courts, qui ne sont pas proposés.
        </p>

        <h2 id="duree">8. Durée et résiliation</h2>
        <p>
          Le contrat est conclu pour <strong>une saison ({PRICING.engagementMois} mois)</strong> à compter de la mise en ligne, puis reconduit chaque année pour la même durée. Chaque partie peut y mettre fin pour la prochaine échéance, par e-mail ou par courrier, en respectant un <strong>préavis de {C.preavisResiliationMois} mois avant la date anniversaire</strong>. Le Club ne peut pas résilier en cours de période d’engagement, sauf manquement grave du Prestataire ou refus d’une révision de prix annoncée à l’article 5.
        </p>

        <h2 id="reconduction">9. Information sur la reconduction</h2>
        {/* TODO juriste : à valider avant tout contrat. Aucune automatisation d'information ou de relance n'est en place tant que ce point n'est pas validé. */}
        <p>
          Lorsque le Club est considéré comme un non-professionnel au sens du Code de la consommation, le Prestataire l’informe par écrit (courrier ou e-mail), au plus tôt trois mois et au plus tard un mois avant le terme de la période autorisant le rejet de la reconduction, de la possibilité de ne pas reconduire le contrat. À défaut, le Club peut mettre gratuitement un terme au contrat à tout moment à compter de la reconduction, dans les conditions prévues par la loi.
        </p>

        <h2 id="impayes">10. Retards et impayés</h2>
        <p>
          Toute somme impayée à l’échéance donne lieu à une relance. Si elle reste impayée {C.miseEnDemeureJours} jours après une mise en demeure, le Prestataire peut <strong>suspendre l’accès</strong> à la plateforme jusqu’au paiement, sans que les données ne soient supprimées. Les pénalités de retard sont dues au taux de trois fois le taux d’intérêt légal, et, lorsque le Club est un professionnel, une indemnité forfaitaire de recouvrement de {SITE.conditions.indemniteRecouvrement} € s’y ajoute.
        </p>

        <h2 id="support">11. Support</h2>
        <p>
          Le support est assuré par e-mail ou par le formulaire de contact, avec une réponse <strong>sous {PRICING.supportJoursOuvres} jours ouvrés</strong>. Ce délai est un délai de réponse, pas un délai de résolution : le Prestataire ne garantit pas de délai de correction.
        </p>

        <h2 id="disponibilite">12. Disponibilité</h2>
        <p>
          Le Prestataire est tenu d’une <strong>obligation de moyens</strong> : il met en œuvre les moyens raisonnables pour que la plateforme soit disponible, sauvegardée chaque jour et sécurisée. Les opérations de maintenance sont annoncées quand elles peuvent interrompre le service. Le Prestataire ne garantit pas une disponibilité ininterrompue.
        </p>

        <h2 id="evolutions">13. Évolutions et développements</h2>
        <p>
          Les nouvelles fonctionnalités de la formule choisie sont incluses dans l’abonnement. Toute fonction absente des formules et des options, tout développement propre à un seul club, tout design entièrement unique, toute connexion à un autre logiciel, toute reprise depuis un autre logiciel, tout club omnisport, toute traduction et toute application publiée sur les boutiques d’applications font l’objet d’un <strong>devis sur mesure</strong>, chiffré avant (développement propre à un club : {PRICING.developpementSurMesureHeure} € de l’heure).
        </p>

        <h2 id="deplacements">14. Déplacements et rendez-vous</h2>
        <p>
          Le premier rendez-vous en présentiel est <strong>gratuit jusqu’à {PRICING.deplacementGratuitKm} km</strong> de Savigné-sur-Lathan. Au-delà, il a lieu en visio ou donne lieu à une indemnité de déplacement chiffrée sur devis. Les rendez-vous suivants entrent dans les heures d’accompagnement.
        </p>

        <h2 id="donnees">15. Données personnelles</h2>
        <p>
          Le Club est <strong>responsable de traitement</strong> des données personnelles de ses membres ; le Prestataire est son <strong>sous-traitant</strong> au sens de l’article 28 du règlement (UE) 2016/679 (RGPD). Les obligations de chacun sont précisées dans l’<a href="#annexe">annexe 1</a>, qui forme le contrat de traitement des données. Le Club veille notamment à informer ses membres et à recueillir, quand elles sont nécessaires, les autorisations relatives aux mineurs et au droit à l’image.
        </p>
        <p>
          Pour ses propres échanges avec le Club (devis, facturation, support), le Prestataire agit comme responsable de traitement : voir la <Link href="/politique-confidentialite">politique de confidentialité</Link>.
        </p>

        <h2 id="fin">16. Fin du contrat</h2>
        <p>
          À la fin du contrat, quelle qu’en soit la cause, le Prestataire remet au Club <strong>l’export complet de ses données</strong>. Le site reste en ligne <strong>{C.maintienEnLigneMois} mois</strong> ; les données sont <strong>supprimées {C.suppressionDonneesMois} mois</strong> après la fin du contrat. Une <strong>copie autonome du site</strong>, qui fonctionne sans la plateforme, peut être commandée en option.
        </p>

        <h2 id="responsabilite">17. Responsabilité</h2>
        <p>
          La responsabilité du Prestataire est limitée aux dommages directs et plafonnée au <strong>montant payé par le Club au cours des 12 derniers mois</strong>. Le Prestataire n’est pas responsable des services de tiers, notamment HelloAsso, l’hébergeur, les services de messagerie et d’envoi d’e-mails, ni de l’usage que le Club fait de ses données et de ses contenus. Aucun résultat de référencement ni de fréquentation n’est garanti.
        </p>

        <h2 id="divers">18. Force majeure, droit applicable, litiges</h2>
        <p>
          Aucune partie n’est responsable d’un manquement dû à un cas de force majeure au sens de l’article 1218 du Code civil. Les présentes conditions sont soumises au <strong>droit français</strong>. En cas de litige, les parties cherchent d’abord une solution amiable ; à défaut, les tribunaux compétents du ressort du siège du Prestataire sont seuls compétents, sous réserve des règles impératives de compétence applicables à un Club non-professionnel.
        </p>
        <p>
          Lorsque le Club est un non-professionnel, il peut recourir gratuitement à un médiateur de la consommation : {SITE.entreprise.mediateur}
        </p>

        <h2 id="annexe">Annexe 1 — Contrat de traitement des données personnelles (article 28 du RGPD)</h2>
        <h3>1. Objet, durée, nature du traitement</h3>
        <p>
          Le Prestataire traite, pour le compte du Club, les données nécessaires à la fourniture de la plateforme : hébergement, sauvegarde, affichage et traitement des données de gestion du Club (adhésions, école de tennis, équipes, paiements, communication). La durée du traitement est celle du contrat, augmentée du délai de restitution et de suppression prévu à l’article 16.
        </p>
        <h3>2. Finalités, personnes concernées, catégories de données</h3>
        <ul>
          <li>
            <strong>Finalités :</strong> gestion des adhésions, des licences, des séances, des compétitions, des paiements, de la communication avec les membres, de la vie associative.
          </li>
          <li>
            <strong>Personnes concernées :</strong> adhérents, familles et représentants légaux, enseignants, bénévoles, dirigeants, partenaires du Club.
          </li>
          <li>
            <strong>Catégories de données :</strong> identité, coordonnées, date de naissance, numéro de licence, niveau de jeu et résultats, présence aux séances, références de paiement (le Prestataire ne conserve aucune coordonnée bancaire), photographies, journaux d’actions.
          </li>
          <li>
            <strong>Données sensibles ou à protéger :</strong> données de <strong>mineurs</strong> et <strong>attestations ou certificats de santé</strong> joints aux dossiers. Le Club ne téléverse que ce que la réglementation l’autorise à recueillir ; le Prestataire applique des droits d’accès restreints à ces pièces.
          </li>
        </ul>
        <h3>3. Obligations du Prestataire</h3>
        <ul>
          <li>Traiter les données uniquement sur instruction documentée du Club, dont le présent contrat fait partie.</li>
          <li>Garantir la confidentialité : les personnes autorisées sont tenues à la confidentialité.</li>
          <li>Mettre en œuvre les mesures de sécurité de l’article 32 du RGPD : connexion chiffrée (https), droits d’accès par rôle, sauvegardes quotidiennes, surveillance, journal des actions.</li>
          <li>Recourir à des sous-traitants ultérieurs dans les conditions du point 4, en imposant les mêmes obligations.</li>
          <li>Aider le Club à répondre aux demandes d’exercice des droits des personnes (accès, rectification, effacement, limitation, portabilité, opposition) et à ses obligations de sécurité et d’analyse d’impact.</li>
          <li>Notifier au Club, dans les meilleurs délais après en avoir pris connaissance, toute violation de données personnelles, avec les éléments utiles pour qu’il puisse l’évaluer.</li>
          <li>Au terme du contrat, restituer l’export complet des données puis les supprimer dans le délai de l’article 16, sauf obligation légale de conservation.</li>
          <li>Tenir à disposition du Club les informations nécessaires pour démontrer le respect de ces obligations et permettre les audits raisonnables, annoncés à l’avance.</li>
        </ul>
        <h3>4. Sous-traitants ultérieurs et localisation des données</h3>
        <p>Le Club donne une autorisation générale d’avoir recours aux sous-traitants ci-dessous. Le Prestataire informe le Club de tout changement, qui peut s’y opposer pour un motif légitime.</p>
        <ul>
          {SOUS_TRAITANTS.map((s) => (
            <li key={s.role}>
              <strong>{s.role}{s.option ? ' (option)' : ''} :</strong> {s.prestataire}. Localisation : {s.localisation}.
              {s.aConfirmer && <em> Information à confirmer avant la signature du contrat.</em>}
            </li>
          ))}
        </ul>
        <p>Le paiement en ligne passe par HelloAsso, service choisi par le Club et dont il reste responsable : les fonds vont directement sur le compte du Club.</p>
        <h3>5. Responsabilités du Club</h3>
        <p>
          Le Club, responsable de traitement, détermine les finalités, informe ses membres, recueille les consentements nécessaires, tient son registre des traitements et décide des durées de conservation propres à son activité. Le Club peut demander à tout moment un export de ses données.
        </p>
        <p>
          Voir aussi : <Link href="/mentions-legales">mentions légales</Link>, <Link href="/politique-confidentialite">politique de confidentialité</Link>, <a href={DEMO.roles} target="_blank" rel="noopener noreferrer">démo en ligne</a>.
        </p>
      </Document>
    </>
  )
}
