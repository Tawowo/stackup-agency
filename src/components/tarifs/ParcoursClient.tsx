/**
 * « COMMENT ÇA SE PASSE » — les quatre temps avant et pendant un projet. Les libellés,
 * descriptions et montants viennent de l'Excel (onglet Parcours client, codes P01 à P03).
 */
import { LIGNES } from '@/config/tarifs.generated'
import { euros } from '@/domain/devis/resume'
import './tarifs-blocs.css'

const ligne = (code: string) => LIGNES.find((l) => l.code === code)

export default function ParcoursClient({ titre = 'Comment ça se passe', niveau = 2, id }: { titre?: string; niveau?: 2 | 3; id?: string }) {
  const appel = ligne('P01')
  const demo = ligne('P02')
  const visio = ligne('P03')
  const T = niveau === 2 ? 'h2' : 'h3'
  const etapes = [
    appel && { n: '1', nom: 'Un appel pour faire connaissance', duree: '30 min', prix: appel.prix === 0 ? 'Gratuit' : euros(appel.prix), texte: appel.description },
    demo && {
      n: '2',
      nom: 'La démo de votre page d’accueil',
      duree: 'Votre future page d’accueil',
      prix: euros(demo.prix),
      texte: `${demo.description} Son prix est déduit si vous continuez.`,
    },
    visio && {
      n: '3',
      nom: 'La visio de présentation et de conseil',
      duree: '1 h 30',
      prix: euros(visio.prix),
      texte: `${visio.description} Son prix est déduit si vous continuez.`,
    },
    { n: '4', nom: 'Le devis détaillé, puis la création', duree: 'Prix exact, signé', prix: '', texte: 'Le prix exact est fixé ensemble, par écrit. Vous validez, puis nous fabriquons votre site ou votre outil.' },
  ].filter(Boolean) as { n: string; nom: string; duree: string; prix: string; texte: string }[]
  return (
    <section id={id} className="su-tg su-tg--parcours" aria-labelledby={`${id ?? 'su-parcours'}-t`} data-nuit="0">
      <div className="su-tg__enveloppe">
        <T id={`${id ?? 'su-parcours'}-t`} className="su-display su-tg__titre">
          {titre}
        </T>
        <p className="su-tg__intro">Vous jugez sur pièce avant de vous engager. Si vous continuez, la démo et la visio sont déduites du prix de votre projet.</p>
        <ol className="su-tg__etapes">
          {etapes.map((e) => (
            <li key={e.n} className="su-tg__etape">
              <span className="su-tg__num su-mono" aria-hidden="true">
                {e.n}
              </span>
              <h3 className="su-tg__etape-nom">{e.nom}</h3>
              <p className="su-tg__etape-meta su-mono">
                {e.duree}
                {e.prix ? ` · ${e.prix}` : ''}
              </p>
              <p className="su-tg__etape-texte">{e.texte}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
