/**
 * PLAN DU SITE — toutes les routes, depuis la source unique (config/routes),
 * rangées par groupe puis par famille d'adresse. Le journal (≈ 300 articles)
 * tient en colonnes serrées : les rubriques d'abord, les articles ensuite.
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import { toutesLesRoutes, type Route } from '@/config/routes'
import { RAYONS } from '@/lib/blog'
import { JsonLd, filAriane, meta } from '@/lib/seo'
import './plan.css'

// Les articles programmés entrent au plan à leur date, comme sur /blog.
export const revalidate = 43200

export const metadata = meta({
  titre: 'Plan du site : toutes les pages de Stackup Agency',
  description: 'Toutes les pages de Stackup Agency sur une seule : offres, réalisations, outils gratuits, pages locales, articles du journal et pages légales.',
  chemin: '/plan-du-site',
})

type Groupe = Route['groupe']

const GROUPES: { id: Groupe; titre: string }[] = [
  { id: 'principal', titre: 'L’essentiel' },
  { id: 'offre', titre: 'Les offres' },
  { id: 'outils', titre: 'Outils et ressources' },
  { id: 'local', titre: 'Près de chez vous' },
  { id: 'journal', titre: 'Le journal' },
  { id: 'legal', titre: 'Informations légales' },
]

/** Familles d'adresses : le premier préfixe qui correspond donne le sous-titre. */
const FAMILLES: { prefixe: string; titre: string }[] = [
  { prefixe: '/realisations/', titre: 'Réalisations' },
  { prefixe: '/services/', titre: 'Services' },
  { prefixe: '/solutions/', titre: 'Outils de gestion' },
  { prefixe: '/services-locaux/', titre: 'Services locaux' },
  { prefixe: '/agence-web/departement/', titre: 'Départements' },
  { prefixe: '/agence-web/', titre: 'Villes' },
  { prefixe: '/creation-site-internet/', titre: 'Métiers' },
  { prefixe: '/blog/categorie/', titre: 'Rubriques' },
  { prefixe: '/blog/', titre: 'Articles' },
]

function famille(chemin: string) {
  return FAMILLES.find((f) => chemin.startsWith(f.prefixe))?.titre ?? 'Pages'
}

/** Une rubrique du journal : le nom du rayon s'il existe, sinon le slug remis en mots. */
function nomRubrique(r: Route) {
  const id = r.chemin.split('/').pop() ?? r.nom
  const rayon = RAYONS.find((x) => x.id === id)
  if (rayon) return rayon.nom
  const mots = id.replace(/-/g, ' ')
  return mots.charAt(0).toUpperCase() + mots.slice(1)
}

function nomLien(r: Route) {
  if (r.chemin.startsWith('/blog/categorie/')) return nomRubrique(r)
  return r.nom.charAt(0).toUpperCase() + r.nom.slice(1)
}

export default function PlanDuSite() {
  const routes = toutesLesRoutes()
  const sections = GROUPES.map((g) => {
    const familles = new Map<string, Route[]>()
    for (const r of routes) {
      if (r.groupe !== g.id) continue
      const f = famille(r.chemin)
      familles.set(f, [...(familles.get(f) ?? []), r])
    }
    return { ...g, familles: [...familles.entries()], total: [...familles.values()].reduce((n, l) => n + l.length, 0) }
  }).filter((s) => s.total > 0)

  return (
    <>
      <JsonLd data={filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Plan du site', chemin: '/plan-du-site' }])} />
      <Document
        moment="doc-plan"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/plan-du-site', nom: 'Plan du site' },
        ]}
        etiquette={`${routes.length} pages`}
        titre="Plan du site"
        chapo="Toutes les pages, sur une seule. Rangées comme l’atelier : ce qu’on fabrique, pour qui, et ce qu’on en écrit."
        maj="13 octobre 2026"
        sommaire={sections.map((s) => ({ id: `plan-${s.id}`, titre: s.titre }))}
        large
      >
        <div className="su-plan">
          {sections.map((s) => (
            <section key={s.id} className="su-plan__groupe" aria-labelledby={`plan-${s.id}`}>
              <h2 id={`plan-${s.id}`} className="su-display su-plan__titre">
                {s.titre}
                <span className="su-mono su-plan__compte">{s.total}</span>
              </h2>
              {s.familles.map(([nom, liste]) => (
                <div key={nom} className="su-plan__famille">
                  {s.familles.length > 1 && (
                    <h3 className="su-mono su-plan__sous">
                      {nom} <span aria-hidden="true">·</span> {liste.length}
                    </h3>
                  )}
                  <ul className={`su-plan__liste${liste.length > 24 ? ' su-plan__liste--dense' : ''}`}>
                    {liste.map((r) => (
                      <li key={r.chemin}>
                        <Link href={r.chemin}>{nomLien(r)}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          ))}
        </div>
      </Document>
    </>
  )
}
