/**
 * REDIRECTIONS — reprend TOUTES les 301 de l'ancien site (ancien/next.config.mjs)
 * et ajoute celles des pages qui n'existent plus en V5. Écrit src/config/redirections.ts.
 * Aucune ancienne URL ne doit finir en 404.
 */
import fs from 'node:fs'
const ancien = (await import('../ancien/next.config.mjs')).default
const vieilles = await ancien.redirects()
const nouvelles = [
  { source: '/laboratoire', destination: '/solutions', permanent: true },
  { source: '/laboratoire/:path*', destination: '/solutions', permanent: true },
  { source: '/configurateur', destination: '/tarifs#estimer', permanent: true },
  { source: '/devis', destination: '/tarifs#estimer', permanent: true },
  { source: '/outils/studio-de-style', destination: '/tarifs#estimer', permanent: true },
  { source: '/blog/site-vitrine-449-inclus', destination: '/blog/site-vitrine-inclus', permanent: true },
  // L'article cible est programmé (pas encore en ligne) : on envoie vers le journal tant qu'il n'est pas publié.
  { source: '/blog/idee-mise-en-ligne-10-jours-methode', destination: '/blog', permanent: true },
  { source: '/tarifs/:plan', destination: '/tarifs', permanent: true },
  { source: '/services/marketing-digital', destination: '/services', permanent: true },
  { source: '/services/maintenance-support', destination: '/tarifs', permanent: true },
  { source: '/services/redaction-blog-seo', destination: '/services', permanent: true },
  ...['demo-videaste', 'chateau-lumieres', 'maison-elise', 'au-pain-dore', 'prestige-immo', 'lolivier-dashboard', 'chateau-fleury'].map((slug) => ({
    source: `/realisations/${slug}`,
    destination: '/realisations',
    permanent: true,
  })),
  { source: '/solutions/commande-en-ligne-livraison', destination: '/solutions/click-and-collect', permanent: true },
  { source: '/solutions/galerie-client-photographe', destination: '/solutions', permanent: true },
  { source: '/services/site-association', destination: '/services', permanent: true },
  // Villes et départements hors de la zone réelle d'intervention : plus de page (contenu de page satellite), tout mène aux zones.
  ...['orleans', 'chartres', 'dreux', 'bourges', 'vierzon', 'chateaudun', 'nantes', 'laval', 'caen', 'rouen', 'evreux', 'alencon', 'lisieux', 'rambouillet', 'anet', 'vernouillet', 'nogent-le-rotrou'].map((slug) => ({ source: `/agence-web/${slug}`, destination: '/zones-intervention', permanent: true })),
  { source: '/agence-web/chateauroux', destination: '/agence-web/departement/indre', permanent: true },
  ...['loiret', 'eure-et-loir', 'cher', 'deux-sevres', 'yonne', 'nievre', 'allier', 'creuse', 'orne'].map((slug) => ({ source: `/agence-web/departement/${slug}`, destination: '/zones-intervention', permanent: true })),
]
// Les anciennes URL de catégorie mènent au journal : les rayons sont des listes noindex, jamais une cible de redirection.
const blogTs = fs.readFileSync('src/lib/blog.ts', 'utf8')
const rayons = [...blogTs.matchAll(/\{ id: '([a-z-]+)', nom: '[^']+', categories: \[([^\]]*)\]/g)].map((m) => ({ id: m[1], cats: [...m[2].matchAll(/'([a-z-]+)'/g)].map((c) => c[1]) }))
const categories = new Set(rayons.flatMap((r) => r.cats))
for (const dossier of ['src/content/blog', 'ancien/src/content/blog'])
  for (const f of fs.readdirSync(dossier)) {
    const c = fs.readFileSync(`${dossier}/${f}`, 'utf8').match(/^category:\s*["']?([a-z-]+)/m)?.[1]
    if (c) categories.add(c)
  }
const parCategorie = [...categories]
  .filter((c) => !rayons.some((r) => r.id === c))
  .map((c) => ({ source: `/blog/categorie/${c}`, destination: '/blog', permanent: true }))
nouvelles.push(...parCategorie)
// Articles fusionnés ou retirés par l'audit éditorial (scripts/seo/audit-articles.mjs --appliquer).
if (fs.existsSync('src/config/redirections-articles.json')) nouvelles.push(...JSON.parse(fs.readFileSync('src/config/redirections-articles.json', 'utf8')))
const brut = [...vieilles, ...nouvelles]
// Aucune chaîne : chaque destination est suivie jusqu'à une URL qui ne redirige plus (anti-boucle à 10 sauts).
const parSource = new Map(brut.filter((r) => !r.source.includes(':')).map((r) => [r.source, r.destination]))
const aplatir = (d) => {
  let cible = d
  for (let i = 0; i < 10; i++) {
    const [chemin, ancre] = cible.split('#')
    const suite = parSource.get(chemin)
    if (!suite) break
    cible = ancre && !suite.includes('#') ? `${suite}#${ancre}` : suite
  }
  return cible
}
// Une cible programmée (publishAt dans le futur) n'est pas encore en ligne : on renvoie vers le journal en attendant.
const aujourdhui = new Date().toISOString().slice(0, 10)
const programme = (d) => {
  const m = d.match(/^\/blog\/([a-z0-9-]+)$/)
  const f = m && `src/content/blog/${m[1]}.md`
  const pub = f && fs.existsSync(f) && fs.readFileSync(f, 'utf8').match(/^publishAt:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1]
  return pub && pub > aujourdhui ? '/blog' : d
}
const toutes = brut.map((r) => ({ ...r, destination: programme(aplatir(r.destination)) })).filter((r) => r.source !== r.destination)
const sortie = `/**
 * REDIRECTIONS 301 — générées par scripts/redirections.mjs (ne pas éditer à la main).
 * ${vieilles.length} reprises de l'ancien site + ${nouvelles.length} pour les pages retirées en V5.
 */
import type { Redirect } from 'next/dist/lib/load-custom-routes'

export const REDIRECTIONS: Redirect[] = ${JSON.stringify(toutes, null, 2)}
`
fs.writeFileSync('src/config/redirections.ts', sortie)
console.log(toutes.length, 'redirections dont', parCategorie.length, 'catégories de blog → /blog')

// Table versionnée, lisible : toutes les 301 du site (source unique : ce script → src/config/redirections.ts → next.config.ts).
fs.mkdirSync('seo', { recursive: true })
fs.writeFileSync('seo/redirects.csv', 'source,destination,statut\n' + toutes.map((r) => `${r.source},${r.destination},301`).join('\n') + '\n')
console.log('seo/redirects.csv écrit :', toutes.length, 'lignes')
