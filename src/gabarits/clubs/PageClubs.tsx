/**
 * GABARIT DES PAGES DE L'OFFRE CLUBS — le gabarit Document (relevé de nuit en tête, corps sur ivoire) avec fil d'Ariane,
 * données structurées (fil d'Ariane + celles de la page) et conteneur `.cl`. Mobile d'abord.
 */
import type { ReactNode } from 'react'
import Document from '@/gabarits/document/Document'
import { JsonLd, filAriane } from '@/lib/seo'
import { jetons } from '@/lib/jetons'
import { CLUBS } from '@/config/offre-clubs'
import './clubs.css'

export interface Miette {
  nom: string
  chemin: string
}

export default function PageClubs({
  moment,
  chemin,
  fil = [],
  etiquette,
  titre,
  chapo,
  maj,
  monde,
  entete,
  schema = [],
  children,
}: {
  moment: string
  chemin: string
  /** Les étapes intermédiaires du fil d'Ariane (après « Accueil » et « Clubs de tennis »). */
  fil?: Miette[]
  etiquette: string
  titre: string
  chapo?: string
  maj?: string
  monde?: ReactNode
  entete?: ReactNode
  schema?: object[]
  children: ReactNode
}) {
  const racine = chemin === CLUBS
  const etapes: Miette[] = [{ nom: 'Accueil', chemin: '/' }, ...(racine ? [] : [{ nom: 'Clubs de tennis', chemin: CLUBS }]), ...fil, { nom: jetons(titre).replace(/\s*[:—].*$/, ''), chemin }]
  const nomRacine = racine ? [{ nom: 'Clubs de tennis', chemin: CLUBS }] : []
  const ariane = [...(racine ? [etapes[0]!, ...nomRacine] : etapes)]
  return (
    <>
      <JsonLd data={[filAriane(ariane), ...schema]} />
      <Document
        moment={moment}
        ariane={ariane.map((e) => ({ href: e.chemin, nom: e.nom }))}
        etiquette={jetons(etiquette)}
        titre={jetons(titre)}
        chapo={chapo ? jetons(chapo) : undefined}
        maj={maj ? new Date(maj).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : undefined}
        monde={monde}
        entete={entete}
        large
      >
        <div className="cl">{children}</div>
      </Document>
    </>
  )
}
