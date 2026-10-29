/**
 * /stackup-agency-en-bref — la fiche d'identité citable : qui, quoi, où, pour qui, combien, comment joindre.
 * Les mêmes informations que partout (nom, adresse, téléphone), en texte court et en données structurées, pour les lecteurs
 * pressés, les moteurs et les assistants d'IA. Les prix viennent du moteur de devis (« à partir de »).
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import Accordeon from '@/components/editorial/Accordeon'
import { SITE, offre } from '@/config/site'
import { ZONES, nbCommunes37 } from '@/data/zones'
import { nombreFr } from '@/lib/jetons'
import { JsonLd, ORIGINE, faqPage, filAriane, meta } from '@/lib/seo'
import '@/gabarits/pilier/pilier.css'

export const metadata = meta({
  titre: 'Stackup Agency en bref : qui, quoi, où, combien',
  description: 'Stackup Agency, agence web d’une personne en Touraine : sites, boutiques et outils de gestion sur mesure. Qui, où, pour qui, prix « à partir de », contact.',
  chemin: '/stackup-agency-en-bref',
})

const e = SITE.entreprise
const prix = (id: 'une-page' | 'multi-pages' | 'boutique' | 'outil') => `à partir de ${nombreFr(offre(id).aPartirDe)} €`

const FAITS: [string, string][] = [
  ['Nom', `Stackup Agency (${e.identite})`],
  ['Fondateur', `${SITE.fondateur}, ${e.forme.toLowerCase()}`],
  ['Activité', 'Création de sites internet, de boutiques en ligne et d’outils de gestion sur mesure ; référencement ; maintenance'],
  ['Pour qui', 'Artisans, commerçants, TPE, professions libérales'],
  ['Adresse', e.adresse],
  ['Zone', `Indre-et-Loire (${nbCommunes37()} communes, ${ZONES.length} communautés de communes), départements voisins ; visio partout en France`],
  ['Téléphone', SITE.telephone],
  ['E-mail', SITE.email],
  ['Site', ORIGINE],
  ['TVA', SITE.mentions.tva],
]

const FAQ = [
  { q: 'Qu’est-ce que Stackup Agency ?', a: `Stackup Agency est une agence web d’une seule personne, ${SITE.fondateur}, installée à Savigné-sur-Lathan (Indre-et-Loire). Elle conçoit, code et met en ligne des sites internet, des boutiques et des outils de gestion sur mesure pour les artisans, commerçants, TPE et professions libérales.` },
  { q: 'Où se trouve Stackup Agency ?', a: `${e.adresse}, en Touraine, au nord-ouest de Tours. Les rendez-vous se tiennent sur place en Indre-et-Loire quand c’est utile, et en visio partout ailleurs.` },
  { q: 'Combien coûte un site avec Stackup Agency ?', a: `Les prix sont toujours « à partir de » : site une page ${prix('une-page')}, site de plusieurs pages ${prix('multi-pages')}, boutique en ligne ${prix('boutique')}, outil de gestion ${prix('outil')}. Le devis précis se calcule dans l’estimateur ou après un échange.` },
  { q: 'Peut-on voir son site avant de s’engager ?', a: 'Oui : une démo de la page d’accueil est présentée avant toute signature. Elle est facturée à part (au tarif affiché sur la page des tarifs) et n’est pas déduite du devis.' },
  { q: 'Comment joindre Stackup Agency ?', a: `Par téléphone au ${SITE.telephone}, par e-mail à ${SITE.email}, ou par le formulaire de la page contact.` },
]

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Stackup Agency en bref', chemin: '/stackup-agency-en-bref' }]),
          { '@context': 'https://schema.org', '@type': 'AboutPage', name: 'Stackup Agency en bref', url: `${ORIGINE}/stackup-agency-en-bref`, about: { '@id': `${ORIGINE}/#agence` }, inLanguage: 'fr-FR', dateModified: '2026-10-30' },
          faqPage(FAQ),
        ]}
      />
      <Document
        moment="en-bref"
        ariane={[{ href: '/', nom: 'Accueil' }, { href: '/stackup-agency-en-bref', nom: 'Stackup Agency en bref' }]}
        etiquette="Fiche d’identité"
        titre="Stackup Agency en bref."
        chapo={`Agence web d’une personne, ${SITE.fondateur}, en Touraine. Des sites, des boutiques et des outils de gestion sur mesure pour les artisans, commerçants et TPE. Une démo avant de signer.`}
        maj="30 octobre 2026"
      >
        <h2>L’essentiel</h2>
        <dl className="su-bref">
          {FAITS.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <h2>Ce que fait Stackup Agency</h2>
        <ul>
          <li>
            <Link href="/services/creation-de-site-internet">Création de site internet</Link> : site une page {prix('une-page')}, plusieurs pages {prix('multi-pages')}.
          </li>
          <li>
            <Link href="/services/site-ecommerce">Boutique en ligne</Link> : {prix('boutique')}.
          </li>
          <li>
            <Link href="/services/logiciel-de-gestion">Logiciel de gestion sur mesure</Link> (devis, factures, planning, rendez-vous) : {prix('outil')}.
          </li>
          <li>
            <Link href="/services/referencement">Référencement</Link>, <Link href="/services/referencement-local">référencement local</Link>, <Link href="/services/maintenance">maintenance</Link>, <Link href="/services/facture-electronique">facture électronique</Link>, <Link href="/services/ia-et-automatisation">IA et automatisation</Link>.
          </li>
        </ul>
        <h2>Comment on travaille</h2>
        <p>Un échange pour comprendre le métier, une démo de la page d’accueil avant de signer, un prix écrit avant de commencer, le code et les données qui appartiennent au client à la fin. Pas de durée de livraison promise à l’avance : le calendrier se fixe ensemble.</p>
        <h2>Où</h2>
        <p>
          Les {nbCommunes37()} communes d’Indre-et-Loire sont couvertes, réparties en {ZONES.length} communautés de communes : <Link href="/zones-intervention">voir les zones et trouver sa commune</Link>. Ailleurs en France, tout se fait à distance.
        </p>
        <h2>Questions fréquentes</h2>
        <Accordeon questions={FAQ.map((f) => ({ q: f.q, r: f.a }))} groupe="faq-en-bref" />
        <p className="su-mono su-doc__maj-fin">
          Plus de détails : <Link href="/a-propos">à propos</Link> · <Link href="/auteur/matheo-reboul">l’auteur</Link> · <Link href="/tarifs">tarifs</Link> · <Link href="/contact">contact</Link>
        </p>
      </Document>
    </>
  )
}
