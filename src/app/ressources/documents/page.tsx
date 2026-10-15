/**
 * /ressources/documents — les PDF de public/documents/, générés par `npm run documents` depuis des sources HTML
 * de marque (scripts/documents/). La liste, les descriptions, le nombre de pages et le poids viennent du manifeste
 * src/config/documents.generated.ts ; l'identité et la version, de src/config/site.ts.
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import Plaque from '@/components/ui/Plaque'
import { DOCUMENTS } from '@/config/documents.generated'
import { SITE } from '@/config/site'
import { JsonLd, filAriane, meta } from '@/lib/seo'
import '@/experiences/ressources/ressources.css'

export const metadata = meta({
  titre: 'Documents en PDF — conditions de vente, devis, cession, RGPD, grille tarifaire | Stackup Agency',
  description: 'Les documents qui encadrent chaque projet Stackup Agency : conditions générales, abonnement, modèles de devis et de livraison, cession de droits, protection des données, grille tarifaire.',
  chemin: '/ressources/documents',
})

const GROUPES = [
  { id: 'legal', nom: 'Légal' },
  { id: 'contractuel', nom: 'Contractuel' },
  { id: 'commercial', nom: 'Commercial' },
]

/** Page du site qui reprend le même contenu, quand elle existe. */
const PAGE_EN_LIGNE: Record<string, string> = {
  cgv: '/cgv',
  'politique-confidentialite-cookies': '/politique-confidentialite',
  'grille-tarifaire': '/tarifs',
  'reglement-parrainage': '/parrainage',
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={filAriane([
          { nom: 'Accueil', chemin: '/' },
          { nom: 'Ressources', chemin: '/ressources' },
          { nom: 'Documents', chemin: '/ressources/documents' },
        ])}
      />
      <Document
        moment="doc-documents"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/ressources', nom: 'Ressources' },
          { href: '/ressources/documents', nom: 'Documents' },
        ]}
        etiquette={`${DOCUMENTS.length} documents · PDF`}
        titre="Les papiers, avant de signer."
        chapo={`Chaque projet est encadré par ces documents. Lisez-les avant de vous engager. Version ${SITE.documents.version}, ${SITE.documents.dateVersion}.`}
        maj={SITE.documents.dateVersion}
        large
      >
        <div className="su-res">
          {GROUPES.map((g) => {
            const docs = DOCUMENTS.filter((d) => d.groupe === g.id)
            if (!docs.length) return null
            return (
              <section key={g.id} className="su-res__section" aria-labelledby={`su-docs-${g.id}`}>
                <h2 id={`su-docs-${g.id}`} className="su-res__h2">
                  {g.nom}
                </h2>
                <ul className="su-res__grille">
                  {docs.map((d) => (
                    <li key={d.slug}>
                      <Plaque as="article" className="su-res__carte">
                        <p className="su-mono su-res__etiquette">
                          PDF · {d.pages} page{d.pages > 1 ? 's' : ''} · {d.ko.toLocaleString('fr-FR')} Ko
                        </p>
                        <h3 className="su-res__carte-titre">{d.titre}</h3>
                        <p className="su-res__carte-texte">{d.description}</p>
                        {d.revue && !SITE.documents.documentsValides && <p className="su-res__cote">Version de travail, en cours de relecture juridique.</p>}
                        <div className="su-res__carte-pied">
                          <a className="su-res__lien" href={`/documents/${d.slug}.pdf`} download>
                            Télécharger<span className="sr-only"> {d.titre} (PDF, {d.pages} pages)</span>
                          </a>
                          {PAGE_EN_LIGNE[d.slug] && (
                            <Link className="su-res__lien" href={PAGE_EN_LIGNE[d.slug]!}>
                              Voir en ligne<span className="sr-only"> : {d.titre}</span>
                            </Link>
                          )}
                        </div>
                      </Plaque>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}

          <p className="su-res__note">
            Les modèles de devis, de livraison et de cession sont donnés à titre d’exemple : votre exemplaire personnalisé vous est remis au fil du projet. Une question sur l’un d’eux ? <Link href="/contact">Écrivez-nous</Link>.
          </p>
        </div>
      </Document>
    </>
  )
}
