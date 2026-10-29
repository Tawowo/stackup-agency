// À faire relire par un professionnel du droit avant le premier contrat.
/**
 * /cgv-plateforme — conditions générales de vente de la plateforme d'abonnement des clubs (site + logiciel), distinctes
 * des CGV de l'agence (/cgv). Identité lue dans src/config/company.ts ; textes dans src/data/offre-clubs/cgv-plateforme.ts.
 * Les notes `todo` des articles (points à faire valider) ne sont jamais affichées.
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import Lie from '@/components/editorial/Lie'
import { JsonLd, filAriane, meta } from '@/lib/seo'
import { jetonsProfond } from '@/lib/jetons'
import { COMPANY, adresseComplete } from '@/config/company'
import { SITE } from '@/config/site'
import { PRODUCT_NAME, MENTIONS_CLUBS } from '@/config/offre-clubs'
import { CGV_PLATEFORME, type ArticleCgv } from '@/data/offre-clubs/cgv-plateforme'

export const metadata = meta({
  titre: `CGV de la plateforme ${PRODUCT_NAME} (clubs de tennis)`,
  description: `Conditions générales de vente de ${PRODUCT_NAME}, la plateforme site + logiciel des clubs de tennis : licence, catégories, prix, durée, données personnelles, fin de contrat.`,
  chemin: '/cgv-plateforme',
})

const CGV = jetonsProfond(CGV_PLATEFORME)

function Article({ a }: { a: ArticleCgv }) {
  return (
    <section id={a.id} aria-labelledby={`${a.id}-t`}>
      <h2 id={`${a.id}-t`}>{a.titre}</h2>
      {a.paragraphes.map((p) => (
        <p key={p.slice(0, 48)}>
          <Lie t={p} />
        </p>
      ))}
      {a.liste && (
        <ul>
          {a.liste.map((l) => (
            <li key={l.slice(0, 48)}>
              <Lie t={l} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default function Page() {
  const sommaire = [{ id: 'prestataire', titre: 'Le Prestataire' }, ...CGV.articles.map((a) => ({ id: a.id, titre: a.titre })), { id: 'annexe', titre: 'Annexe : contrat de traitement des données' }]
  return (
    <>
      <JsonLd data={filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: `CGV de la plateforme ${PRODUCT_NAME}`, chemin: '/cgv-plateforme' }])} />
      <Document
        moment="doc-cgv-plateforme"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/clubs-de-tennis', nom: 'Clubs de tennis' },
          { href: '/cgv-plateforme', nom: 'CGV de la plateforme' },
        ]}
        etiquette="Conditions de vente · plateforme"
        titre={`Conditions générales de la plateforme ${PRODUCT_NAME}`}
        chapo="L’abonnement des clubs au site et au logiciel : une licence d’utilisation, jamais une cession du code ; le club reste propriétaire de ses données et de ses contenus. Le devis signé précise les montants."
        maj={CGV.dateVersion}
        sommaire={sommaire}
      >
        <p>
          Version {CGV.version} du {CGV.dateVersion}. Pour les créations vendues avec cession du code (sites, boutiques et outils sur mesure), ce sont les <Link href="/cgv">CGV de l’agence</Link> qui s’appliquent.
        </p>
        <section id="prestataire" aria-labelledby="prestataire-t">
          <h2 id="prestataire-t">Le Prestataire</h2>
          <ul>
            <li>
              <strong>Dénomination :</strong> {COMPANY.denomination}, {COMPANY.forme.toLowerCase()}
            </li>
            <li>
              <strong>Nom commercial :</strong> {COMPANY.nomCommercial} (« {COMPANY.nomCommercialRegistre} » au registre)
            </li>
            <li>
              <strong>Adresse :</strong> {adresseComplete()}
            </li>
            <li>
              <strong>SIREN / SIRET :</strong> {COMPANY.siren} / {COMPANY.siret}
            </li>
            <li>
              <strong>Code APE :</strong> {COMPANY.ape} — {COMPANY.apeLibelle}
            </li>
            <li>
              <strong>Immatriculation :</strong> {COMPANY.immatriculation.registre}, le {COMPANY.immatriculation.date}
            </li>
            <li>
              <strong>TVA :</strong> {COMPANY.tva}
            </li>
            <li>
              <strong>Contact :</strong> <a href={`mailto:${SITE.email}`}>{SITE.email}</a> · <a href={SITE.telephoneLien}>{SITE.telephone}</a>
            </li>
          </ul>
        </section>
        {CGV.articles.map((a) => (
          <Article key={a.id} a={a} />
        ))}
        <section id="annexe" aria-labelledby="annexe-t">
          <h2 id="annexe-t">Annexe : contrat de traitement des données (article 28 du RGPD)</h2>
          {CGV.annexeDonnees.map((a) => (
            <div key={a.id} id={`annexe-${a.id}`}>
              <h3>{a.titre}</h3>
              {a.paragraphes.map((p) => (
                <p key={p.slice(0, 48)}>
                  <Lie t={p} />
                </p>
              ))}
              {a.liste && (
                <ul>
                  {a.liste.map((l) => (
                    <li key={l.slice(0, 48)}>
                      <Lie t={l} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
        <p>{MENTIONS_CLUBS.fft}</p>
      </Document>
    </>
  )
}
