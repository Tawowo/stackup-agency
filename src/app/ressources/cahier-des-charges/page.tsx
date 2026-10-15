/**
 * /ressources/cahier-des-charges — le questionnaire en cinq plaques et la
 * feuille générée. Les réponses peuvent arriver par l'URL (formulaire GET sans
 * JS, ou rechargement) : la page rend alors la feuille côté serveur.
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import Action from '@/components/ui/Action'
import Cahier from '@/experiences/ressources/Cahier'
import { lireReponses } from '@/experiences/ressources/cahier-modele'
import { JsonLd, filAriane, meta } from '@/lib/seo'
import '@/experiences/ressources/ressources.css'

export const metadata = meta({
  titre: 'Cahier des charges de site internet — à remplir et imprimer | Stackup Agency',
  description: 'Un cahier des charges guidé pour votre site : activité, objectifs, fonctionnalités, identité visuelle, contenus et budget. Gratuit, imprimable en PDF, sans inscription.',
  chemin: '/ressources/cahier-des-charges',
})

const CONSEILS = [
  'Commencez par les objectifs, pas par la liste des fonctionnalités.',
  'Citez trois sites que vous aimez, et dites pourquoi en une phrase.',
  'Précisez si vous fournissez les textes et les photos, ou s’il faut les produire.',
  'Donnez une fourchette de budget : elle aide à proposer la bonne solution, pas la plus chère.',
  'Mentionnez votre échéance : une ouverture, un salon, une saison.',
]

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const q = await searchParams
  const initiale = lireReponses(q)
  const genere = q.genere === '1'
  const jeton = typeof q.e === 'string' ? q.e.slice(0, 2400) : ''
  return (
    <>
      <JsonLd
        data={filAriane([
          { nom: 'Accueil', chemin: '/' },
          { nom: 'Ressources', chemin: '/ressources' },
          { nom: 'Cahier des charges', chemin: '/ressources/cahier-des-charges' },
        ])}
      />
      <Document
        moment="doc-cahier"
        forme="page"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/ressources', nom: 'Ressources' },
          { href: '/ressources/cahier-des-charges', nom: 'Cahier des charges' },
        ]}
        etiquette="Ressource gratuite · 5 étapes"
        titre="Votre cahier des charges, plaque par plaque."
        chapo="Cinq étapes de questions, une feuille prête à imprimer ou à nous envoyer. Aucune réponse n’est obligatoire, rien n’est enregistré sans vous."
        entete={
          <div className="su-res__entete">
            <Action href="#su-cdc-titre">Commencer</Action>
          </div>
        }
        large
      >
        <div className="su-res">
          <Cahier initiale={initiale} genere={genere} jeton={jeton} />

          <div className="su-prose">
            <h2 id="pourquoi">Pourquoi écrire un cahier des charges ?</h2>
            <p>
              Il évite les malentendus, raccourcit le premier échange et vous permet de comparer des devis qui parlent de la même chose. Il n’a pas besoin d’être exhaustif pour être utile : vos objectifs, votre client idéal et vos contraintes de
              budget et d’échéance suffisent à poser le projet.
            </p>
            <h2 id="conseils">Cinq conseils pour le remplir</h2>
            <ul>
              {CONSEILS.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p>
              Le cahier rempli, le calendrier et le prix sont fixés ensemble au devis. Les documents qui encadrent ensuite le projet sont <Link href="/ressources/documents">consultables ici</Link>.
            </p>
          </div>

          <div className="su-res__suite">
            <Link className="su-res__lien" href="/comparatif/wix-wordpress-sur-mesure">
              Wix, WordPress ou sur mesure ?
            </Link>
            <Link className="su-res__lien" href="/tarifs">
              Les tarifs
            </Link>
            <Link className="su-res__lien" href="/ressources">
              Toutes les ressources
            </Link>
          </div>
        </div>
      </Document>
    </>
  )
}
