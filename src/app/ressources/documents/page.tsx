/**
 * /ressources/documents — les PDF de public/documents/, groupés (légal,
 * contractuel, commercial). Taille lue sur disque au rendu serveur. Les
 * descriptions sont reprises de l'ancien site, nettoyées (aucune durée,
 * aucun délai chiffré).
 */
import { statSync } from 'node:fs'
import path from 'node:path'
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import Plaque from '@/components/ui/Plaque'
import { SITE } from '@/config/site'
import { JsonLd, filAriane, meta } from '@/lib/seo'
import '@/experiences/ressources/ressources.css'

export const metadata = meta({
  titre: 'Documents contractuels en PDF — CGV, contrats, modèles | Stackup Agency',
  description: 'Les documents qui encadrent chaque projet Stackup Agency : conditions générales, contrats de prestation et de maintenance, cession de droits, modèles de devis et de facture.',
  chemin: '/ressources/documents',
})

interface Doc {
  fichier: string
  titre: string
  texte: string
  /** Page du site qui reprend le même contenu. */
  page?: string
}

/*
 * PDF RETIRÉS DU TÉLÉCHARGEMENT (CLAUDE.md, règle 8 et Identité) : leur texte
 * actuel contredit le site — offre « site association » et durées de
 * réalisation chiffrées (CGV, contrat de prestation), nom « Valéry » comme
 * responsable de traitement (politique de confidentialité). Ils restent
 * listés, sans lien, jusqu'à ce que le propriétaire les régénère.
 */
const EN_REVISION = new Set(['cgv.pdf', 'contrat-prestation.pdf', 'politique-confidentialite.pdf'])

const GROUPES: { id: string; nom: string; docs: Doc[] }[] = [
  {
    id: 'legal',
    nom: 'Légal',
    docs: [
      {
        fichier: 'cgv.pdf',
        titre: 'Conditions générales de vente',
        texte: 'Le cadre de toute la relation commerciale : commande, tarifs, paiement, propriété du code, résiliation. Avec son annexe sur la protection des données.',
        page: '/cgv',
      },
      {
        fichier: 'mentions-legales.pdf',
        titre: 'Mentions légales',
        texte: 'Éditeur du site, hébergeur, propriété intellectuelle et droit applicable.',
        page: '/mentions-legales',
      },
      {
        fichier: 'politique-confidentialite.pdf',
        titre: 'Politique de confidentialité',
        texte: 'Données collectées, durées de conservation, droits d’accès et de suppression, base légale de chaque traitement, au regard du RGPD.',
        page: '/politique-confidentialite',
      },
    ],
  },
  {
    id: 'contractuel',
    nom: 'Contractuel',
    docs: [
      {
        fichier: 'contrat-prestation.pdf',
        titre: 'Contrat de prestation de services',
        texte: 'Le contrat de la mission : périmètre, livrables, calendrier, conditions de paiement, transfert de propriété du code à réception du solde.',
      },
      {
        fichier: 'contrat-maintenance.pdf',
        titre: 'Contrat de maintenance',
        texte: 'Les engagements de suivi selon la formule choisie et leurs délais de prise en charge. Un abonnement sans engagement de durée, résiliable avec un mois de préavis.',
      },
      {
        fichier: 'cession-droits.pdf',
        titre: 'Cession de droits',
        texte: 'Le transfert explicite des droits patrimoniaux sur le code et les créations graphiques, effectif à l’encaissement du solde.',
      },
      {
        fichier: 'nda-confidentialite.pdf',
        titre: 'Accord de confidentialité',
        texte: 'Protège les informations sensibles échangées pendant le projet (données métier, stratégie, accès). Un engagement réciproque.',
      },
      {
        fichier: 'avenant-contrat.pdf',
        titre: 'Avenant au contrat',
        texte: 'Toute modification en cours de projet — périmètre, calendrier, prix — passe par un avenant signé des deux parties.',
      },
    ],
  },
  {
    id: 'commercial',
    nom: 'Commercial',
    docs: [
      {
        fichier: 'devis-type.pdf',
        titre: 'Devis type',
        texte: `Le modèle de devis : prestations détaillées ligne par ligne, modalités de paiement, espace de signature. Valable ${SITE.mentions.devisValable} à compter de son émission.`,
      },
      {
        fichier: 'bon-de-commande.pdf',
        titre: 'Bon de commande',
        texte: 'Valide la commande : références du projet, montants, échéancier de paiement et acompte de démarrage.',
      },
      {
        fichier: 'facture-type.pdf',
        titre: 'Facture type',
        texte: `Le modèle de facture avec ses mentions obligatoires et sa numérotation. ${SITE.mentions.tva}.`,
      },
      {
        fichier: 'pv-livraison.pdf',
        titre: 'Procès-verbal de livraison',
        texte: 'La validation de la recette : signé sans réserve, il vaut réception définitive de la prestation.',
      },
    ],
  },
]

function taille(fichier: string): string | null {
  try {
    const octets = statSync(path.join(process.cwd(), 'public', 'documents', fichier)).size
    return `${Math.max(1, Math.round(octets / 1024)).toLocaleString('fr-FR')} Ko`
  } catch {
    return null
  }
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
        etiquette={`${GROUPES.reduce((n, g) => n + g.docs.length, 0)} documents · PDF`}
        titre="Les papiers, avant de signer."
        chapo="Chaque projet est encadré par ces documents. Lisez-les avant de vous engager, ou retrouvez ici celui que vous avez égaré."
        large
      >
        <div className="su-res">
          {GROUPES.map((g) => (
            <section key={g.id} className="su-res__section" aria-labelledby={`su-docs-${g.id}`}>
              <h2 id={`su-docs-${g.id}`} className="su-res__h2">
                {g.nom}
              </h2>
              <ul className="su-res__grille">
                {g.docs.map((d) => {
                  const poids = taille(d.fichier)
                  const retire = EN_REVISION.has(d.fichier) || !poids
                  return (
                    <li key={d.fichier}>
                      <Plaque as="article" className="su-res__carte" data-revision={retire ? '1' : '0'}>
                        <p className="su-mono su-res__etiquette">{retire ? 'En cours de mise à jour' : `PDF · ${poids}`}</p>
                        <h3 className="su-res__carte-titre">{d.titre}</h3>
                        <p className="su-res__carte-texte">{d.texte}</p>
                        <div className="su-res__carte-pied">
                          {retire ? (
                            <span className="su-res__cote">La version à jour vous est remise avec votre devis.</span>
                          ) : (
                            <a className="su-res__lien" href={`/documents/${d.fichier}`} download>
                              Télécharger<span className="sr-only"> {d.titre} (PDF, {poids})</span>
                            </a>
                          )}
                          {d.page && (
                            <Link className="su-res__lien" href={d.page}>
                              Lire en ligne<span className="sr-only"> : {d.titre}</span>
                            </Link>
                          )}
                        </div>
                      </Plaque>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}

          <p className="su-res__note">
            Les modèles commerciaux sont donnés à titre indicatif : votre exemplaire personnalisé vous est remis au fil du projet. Une question sur l’un d’eux ? <Link href="/contact">Écrivez-nous</Link>.
          </p>
        </div>
      </Document>
    </>
  )
}
