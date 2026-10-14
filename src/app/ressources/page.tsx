/**
 * /ressources — l'index : le cahier des charges interactif, les documents PDF,
 * les deux outils gratuits. Rendu serveur, des plaques-liens.
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import Plaque from '@/components/ui/Plaque'
import { JsonLd, filAriane, meta } from '@/lib/seo'
import '@/experiences/ressources/ressources.css'

export const metadata = meta({
  titre: 'Ressources gratuites — cahier des charges, documents, outils | Stackup Agency',
  description: 'Préparez votre projet web : un cahier des charges à remplir et imprimer, les documents contractuels en PDF, un audit de site et un studio de style. Gratuit, sans inscription.',
  chemin: '/ressources',
})

const RESSOURCES = [
  {
    href: '/ressources/cahier-des-charges',
    etiquette: 'À remplir · imprimable',
    titre: 'Cahier des charges',
    texte: 'Cinq étapes de questions sur votre activité, vos objectifs, vos besoins, votre identité et votre budget. À la fin, une feuille propre à imprimer ou à nous envoyer.',
    action: 'Préparer mon cahier',
  },
  {
    href: '/ressources/documents',
    etiquette: 'PDF · téléchargement',
    titre: 'Documents contractuels',
    texte: 'CGV, contrats, cession de droits, modèles de devis et de facture : le cadre de chaque projet, à lire avant de signer ou à retrouver après.',
    action: 'Voir les documents',
  },
  {
    href: '/outils/audit-site',
    etiquette: 'Outil gratuit',
    titre: 'Audit de site',
    texte: 'Performances, référencement, accessibilité : une lecture rapide de votre site actuel, avec les points à corriger en priorité.',
    action: 'Lancer un audit',
  },
  {
    href: '/outils/studio-de-style',
    etiquette: 'Outil gratuit',
    titre: 'Studio de style',
    texte: 'Essayez des couleurs et des typographies sur des maquettes de site, et repartez avec une direction visuelle à nous transmettre.',
    action: 'Ouvrir le studio',
  },
]

export default function Page() {
  return (
    <>
      <JsonLd
        data={filAriane([
          { nom: 'Accueil', chemin: '/' },
          { nom: 'Ressources', chemin: '/ressources' },
        ])}
      />
      <Document
        moment="doc-ressources"
        forme="strates"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/ressources', nom: 'Ressources' },
        ]}
        etiquette="Gratuit · sans inscription"
        titre="De quoi préparer votre projet."
        chapo="Un cahier des charges à remplir, les documents qui encadrent chaque projet, et deux outils pour regarder votre site actuel ou essayer un style. Rien à créer, rien à payer."
        large
      >
        <div className="su-res">
          <section className="su-res__section" aria-labelledby="su-res-liste">
            <h2 id="su-res-liste" className="sr-only">
              Les ressources
            </h2>
            <ul className="su-res__grille">
              {RESSOURCES.map((r) => (
                <li key={r.href}>
                  <Plaque as={Link} href={r.href} className="su-res__carte">
                    <p className="su-mono su-res__etiquette">{r.etiquette}</p>
                    <h3 className="su-res__carte-titre">{r.titre}</h3>
                    <p className="su-res__carte-texte">{r.texte}</p>
                    <span className="su-res__carte-pied">
                      <span className="su-res__lien">{r.action}</span>
                    </span>
                  </Plaque>
                </li>
              ))}
            </ul>
          </section>

          <section className="su-res__section" aria-labelledby="su-res-aussi">
            <h2 id="su-res-aussi" className="su-res__h2">
              Pour aller plus loin
            </h2>
            <p className="su-res__chapo">Les questions qu’on nous pose le plus souvent, et un comparatif entre Wix, WordPress et un site sur mesure qui dit aussi quand le sur mesure n’est pas le bon choix.</p>
            <div className="su-res__suite">
              <Link className="su-res__lien" href="/faq">
                Questions fréquentes
              </Link>
              <Link className="su-res__lien" href="/comparatif/wix-wordpress-sur-mesure">
                Wix, WordPress ou sur mesure
              </Link>
              <Link className="su-res__lien" href="/parrainage">
                Le parrainage
              </Link>
            </div>
          </section>
        </div>
      </Document>
    </>
  )
}
