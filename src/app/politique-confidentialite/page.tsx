/**
 * POLITIQUE DE CONFIDENTIALITÉ — reprise de l'ancien site, mise à jour sur ce
 * que le site fait réellement : un formulaire de contact (lib/contact), envoyé
 * par Resend, hébergé chez Vercel, sans cookie ni mesure d'audience.
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import { SITE } from '@/config/site'
import { COMPANY, adresseComplete } from '@/config/company'
import Lie from '@/components/editorial/Lie'
import { jetonsProfond } from '@/lib/jetons'
import { PROSPECTION } from '@/data/offre-clubs/cgv-plateforme'
import { PRODUCT_NAME } from '@/config/offre-clubs'
import { JsonLd, filAriane, meta } from '@/lib/seo'

const PROSPECTION_TEXTE = jetonsProfond(PROSPECTION)

export const metadata = meta({
  titre: 'Politique de confidentialité — Stackup Agency',
  description: 'Quelles données le formulaire de contact de Stackup Agency collecte, pourquoi, combien de temps, qui les traite, et comment exercer vos droits (RGPD).',
  chemin: '/politique-confidentialite',
})

const SOMMAIRE = [
  { id: 'responsable', titre: 'Responsable du traitement' },
  { id: 'donnees', titre: 'Données collectées' },
  { id: 'finalites', titre: 'Finalités' },
  { id: 'base', titre: 'Base légale' },
  { id: 'duree', titre: 'Durée de conservation' },
  { id: 'destinataires', titre: 'Destinataires' },
  { id: 'transferts', titre: 'Transferts hors Union européenne' },
  { id: 'droits', titre: 'Vos droits' },
  { id: 'exercer', titre: 'Exercer vos droits' },
  { id: 'prospection', titre: 'Prospection des clubs' },
  { id: 'cookies', titre: 'Cookies' },
  { id: 'reclamation', titre: 'Réclamation' },
]

export default function PolitiqueConfidentialite() {
  return (
    <>
      <JsonLd data={filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Politique de confidentialité', chemin: '/politique-confidentialite' }])} />
      <Document
        moment="doc-confidentialite"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/politique-confidentialite', nom: 'Politique de confidentialité' },
        ]}
        etiquette="Données personnelles"
        titre="Politique de confidentialité"
        chapo="Ce que le formulaire de contact recueille, ce qu’on en fait, et rien de plus. Pas de publicité, pas de revente, pas de pistage."
        maj="29 octobre 2026"
        sommaire={SOMMAIRE}
      >
        <h2 id="responsable">Responsable du traitement</h2>
        <p>
          {COMPANY.denomination}, exerçant sous le nom commercial {COMPANY.nomCommercial} — {adresseComplete()} — SIRET {COMPANY.siret} — <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Les coordonnées complètes de l’éditeur figurent dans les <Link href="/mentions-legales">mentions légales</Link>.
        </p>

        <p>
          Cette politique concerne le site stackup-agency.fr. Les données des adhérents qu’un club gère dans la plateforme {PRODUCT_NAME} relèvent du club, responsable de traitement ; {COMPANY.nomCommercial} y agit comme sous-traitant, selon l’<Link href="/cgv-plateforme#annexe">annexe données des CGV de la plateforme</Link>.
        </p>

        <h2 id="donnees">Données collectées</h2>
        <p>Le site ne collecte des données personnelles que par le formulaire de contact :</p>
        <ul>
          <li>prénom et nom ;</li>
          <li>entreprise et métier (facultatifs) ;</li>
          <li>objet de la demande et description du projet ;</li>
          <li>adresse e-mail ;</li>
          <li>numéro de téléphone (facultatif) et moyen de contact préféré ;</li>
          <li>le cas échéant, la configuration composée sur la page tarifs ;</li>
          <li>
            pour le <Link href="/clubs-de-tennis/simulateur">simulateur des clubs de tennis</Link> : le nom, la commune et le département du club, ses licenciés et ses choix, votre rôle au club (facultatif) et, pour un devis, votre message ;
          </li>
          <li>l’adresse IP d’envoi, utilisée pour limiter les envois abusifs et jointe au message reçu.</li>
        </ul>
        <p>Aucune donnée n’est collectée à votre insu. Aucune donnée bancaire n’est traitée sur ce site.</p>
        <p>
          L’<Link href="/outils/audit-site">audit de site</Link> gratuit ne demande que l’adresse du site à mesurer : elle est transmise à Google PageSpeed Insights depuis notre serveur, sans aucune donnée vous concernant.
        </p>

        <h2 id="finalites">Finalités du traitement</h2>
        <p>Les données transmises servent exclusivement à :</p>
        <ul>
          <li>répondre à votre demande de contact ou de devis ;</li>
          <li>établir un devis ;</li>
          <li>vous recontacter dans le cadre de votre projet ;</li>
          <li>vous envoyer un accusé de réception de votre message.</li>
        </ul>
        <p>Elles ne sont ni utilisées à des fins publicitaires, ni vendues, ni transmises à des tiers en dehors des prestataires techniques cités plus bas.</p>

        <h2 id="base">Base légale</h2>
        <p>
          Le traitement repose sur l’intérêt légitime de {SITE.nom} à répondre aux demandes qui lui sont adressées (article 6.1.f du RGPD) et, pour une demande de devis, sur les mesures précontractuelles prises à votre demande (article 6.1.b).
        </p>

        <h2 id="duree">Durée de conservation</h2>
        <p>
          Vos données sont conservées au maximum <strong>3 ans</strong> à compter du dernier contact, conformément aux recommandations de la CNIL. Si un contrat est conclu, les pièces comptables sont conservées pendant la durée imposée par la loi.
        </p>

        <h2 id="destinataires">Destinataires des données</h2>
        <p>Vos données sont traitées par {SITE.nom} seule. Elles transitent par des sous-traitants techniques, strictement nécessaires au fonctionnement du service et tenus à la confidentialité :</p>
        <ul>
          <li>
            <strong>Vercel Inc.</strong> — hébergement du site ;
          </li>
          <li>
            <strong>Resend</strong> — envoi des e-mails issus du formulaire ;
          </li>
          <li>
            <strong>OVH SAS</strong> — messagerie professionnelle qui reçoit les messages.
          </li>
        </ul>

        <h2 id="transferts">Transferts hors Union européenne</h2>
        <p>
          Vercel et Resend sont des prestataires américains. Les données peuvent donc être transférées aux États-Unis ; ces transferts sont encadrés par les garanties prévues au chapitre V du RGPD, notamment les clauses contractuelles types de la Commission européenne.
        </p>

        <h2 id="droits">Vos droits</h2>
        <p>Conformément au RGPD (règlement UE 2016/679) et à la loi Informatique et Libertés, vous disposez des droits suivants :</p>
        <ul>
          <li>
            <strong>accès</strong> : obtenir une copie de vos données ;
          </li>
          <li>
            <strong>rectification</strong> : corriger des données inexactes ;
          </li>
          <li>
            <strong>effacement</strong> : demander la suppression de vos données ;
          </li>
          <li>
            <strong>portabilité</strong> : recevoir vos données dans un format structuré ;
          </li>
          <li>
            <strong>opposition</strong> : vous opposer au traitement ;
          </li>
          <li>
            <strong>limitation</strong> : demander la limitation du traitement.
          </li>
        </ul>

        <h2 id="exercer">Exercer vos droits</h2>
        <p>
          Écrivez à <a href={`mailto:${SITE.email}`}>{SITE.email}</a> en précisant votre demande. Une réponse vous est apportée dans un délai d’un mois.
        </p>

        <h2 id="prospection">{PROSPECTION_TEXTE.titre}</h2>
        {PROSPECTION_TEXTE.paragraphes.map((p) => (
          <p key={p.slice(0, 40)}>
            <Lie t={p} />
          </p>
        ))}

        <h2 id="cookies">Cookies</h2>
        <p>
          Le site ne dépose aucun cookie publicitaire, de mesure d’audience ou de réseau social. Le détail est sur la page <Link href="/cookies">cookies</Link>.
        </p>
        <h3>Mesure d’audience sans cookie</h3>
        <p>
          Pour savoir quelles pages sont lues et si le site aide à être contacté, le site compte, de façon anonyme, les vues de pages, les clics sur le numéro de téléphone et sur « demander ma démo », les demandes d’estimation et les messages envoyés. Chaque comptage ne contient que le nom de l’événement, l’adresse de la page et, s’il existe, le domaine du site d’où vient la visite. Il n’y a ni cookie, ni identifiant, ni adresse IP conservée, ni outil tiers ; ces comptages ne permettent pas de reconnaître un visiteur d’une page à l’autre et ne sont pas croisés avec d’autres données. Votre navigateur peut s’y opposer avec l’option « Ne pas me suivre » ou le signal Global Privacy Control, que le site respecte.
        </p>

        <h2 id="reclamation">Droit de réclamation</h2>
        <p>
          Si vous estimez que le traitement de vos données ne respecte pas le RGPD, vous pouvez introduire une réclamation auprès de la CNIL (Commission nationale de l’informatique et des libertés) :{' '}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            cnil.fr
          </a>
          .
        </p>
      </Document>
    </>
  )
}
