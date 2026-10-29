/**
 * /recherche — recherche interne simple (titres des pages et des articles). Hors index (noindex) : elle sert aux visiteurs
 * et à l'action de recherche déclarée dans les données structurées du site, pas au référencement.
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import { toutesLesRoutes } from '@/config/routes'
import { tousLesArticles } from '@/lib/blog'
import { meta } from '@/lib/seo'

export const metadata = meta({ titre: 'Rechercher sur le site', description: 'Recherchez une page, un guide ou une réponse sur Stackup Agency.', chemin: '/recherche', noindex: true })

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const q = (await searchParams).q
  const terme = typeof q === 'string' ? q.slice(0, 80).trim() : ''
  const mots = norm(terme).split(/\s+/).filter((m) => m.length > 1)
  const articles = tousLesArticles()
  const index = [
    ...toutesLesRoutes().filter((r) => !r.chemin.startsWith('/blog/')).map((r) => ({ chemin: r.chemin, titre: r.nom, texte: '' })),
    ...articles.map((a) => ({ chemin: `/blog/${a.slug}`, titre: a.titre, texte: `${a.extrait} ${a.motsCles.join(' ')}` })),
  ]
  const resultats = mots.length ? index.filter((p) => mots.every((m) => norm(`${p.titre} ${p.texte} ${p.chemin}`).includes(m))).slice(0, 40) : []
  return (
    <Document moment="recherche" etiquette="Recherche" titre="Rechercher sur le site." ariane={[{ href: '/', nom: 'Accueil' }, { href: '/recherche', nom: 'Recherche' }]}>
      <form role="search" action="/recherche" method="get">
        <label htmlFor="rq">Votre recherche</label>
        <input id="rq" name="q" type="search" defaultValue={terme} style={{ display: 'block', width: '100%', maxWidth: '30rem', padding: '0.7rem', margin: '0.4rem 0 0.8rem', font: 'inherit' }} />
        <button type="submit">Rechercher</button>
      </form>
      {terme && (
        <>
          <h2>{resultats.length} résultat{resultats.length > 1 ? 's' : ''} pour « {terme} »</h2>
          <ul>
            {resultats.map((r) => (
              <li key={r.chemin}>
                <Link href={r.chemin}>{r.titre}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </Document>
  )
}
