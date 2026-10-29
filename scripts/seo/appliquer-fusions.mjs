/**
 * APPLIQUER LES FUSIONS ET RENOMMAGES D'ARTICLES — après réécriture de l'article gardé :
 *   - supprime les fichiers fusionnés, écrit leurs redirections 301 (src/config/redirections-articles.json) ;
 *   - renomme les articles dont le slug n'est pas lisible (paa-*) avec leur 301 ;
 *   - réécrit tous les liens internes `/blog/<ancien>` vers la cible (contenus, données, pages) pour qu'aucun lien ne passe par une redirection.
 * Les décisions sont journalisées dans seo/blog-triage.csv (lignes « fusionner » et « renommer »).
 * Usage : node scripts/seo/appliquer-fusions.mjs [--appliquer]   (sans option : simulation)
 */
import fs from 'node:fs'
import path from 'node:path'
import { RACINE } from './lib.mjs'

const FUSIONS = {
  // refonte
  'refonte-site-web-quand-pourquoi': '/blog/refonte-site-web-guide',
  'refonte-site-web-budget': '/blog/refonte-site-web-guide',
  'refonte-site-web-seo-redirections-301': '/blog/refonte-site-web-guide',
  // prix
  'paa-combien-coute-site-web': '/blog/cout-site-internet-2026',
  'tarif-agence-web-france': '/blog/cout-site-internet-2026',
  'devis-site-internet-pourquoi-ecarts': '/blog/cout-site-internet-2026',
  // SEO artisans du bâtiment
  'seo-artisan-batiment': '/blog/seo-local-artisan-batiment-2026',
  // IA générative
  'ai-overviews-seo-tpe': '/blog/seo-ia-generative-ai-overviews-google',
  'chatgpt-apparence-resultats-google': '/blog/seo-ia-generative-ai-overviews-google',
  // portfolio
  'portfolio-digital-artisan-art': '/blog/portfolio-artisan-digital',
  // fiche Google
  'google-my-business-guide-commercants': '/blog/fiche-google-business-optimisation',
  // articles de ville : la page de la ville fait référence
  'site-web-blois': '/agence-web/blois',
  'seo-blois-entreprises': '/agence-web/blois',
  'seo-angers-entreprises': '/agence-web/angers',
}
const RENOMMAGES = {
  'paa-delai-creation-site': 'combien-de-temps-creer-site-web',
  'paa-hebergement-site': 'quel-hebergement-choisir-site-web',
  'paa-seo-local-gratuit': 'seo-local-gratuit-actions-a-faire-soi-meme',
  'paa-site-web-necessaire': 'un-site-web-est-il-necessaire',
  'paa-site-web-ventes': 'un-site-web-fait-il-vendre',
  'paa-wordpress-vs-agence': 'wordpress-soi-meme-ou-agence-web',
}
const appliquer = process.argv.includes('--appliquer')
const blog = path.join(RACINE, 'src/content/blog')
const cible = { ...FUSIONS, ...Object.fromEntries(Object.entries(RENOMMAGES).map(([a, b]) => [a, `/blog/${b}`])) }

// Vérifications : les gardés existent.
for (const [ancien, vers] of Object.entries(FUSIONS)) {
  if (vers.startsWith('/blog/') && !fs.existsSync(path.join(blog, vers.slice(6) + '.md'))) throw new Error(`cible absente : ${vers}`)
  if (!fs.existsSync(path.join(blog, ancien + '.md'))) console.log('déjà absent :', ancien)
}

// Réécriture des liens.
const fichiers = []
const parcourir = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) { if (!['node_modules', '.next'].includes(e.name)) parcourir(p) } else if (/\.(md|ts|tsx|json|csv)$/.test(e.name)) fichiers.push(p) } }
parcourir(path.join(RACINE, 'src'))
let nbLiens = 0
const motif = (a) => new RegExp(`(/blog/)${a.replace(/[-]/g, '\\-')}(?![a-z0-9-])`, 'g')
for (const f of fichiers) {
  if (f.includes('redirections')) continue
  let s = fs.readFileSync(f, 'utf8')
  const o = s
  for (const [ancien, vers] of Object.entries(cible)) s = s.replace(motif(ancien), () => { nbLiens++; return vers })
  if (s !== o && appliquer) fs.writeFileSync(f, s)
}
console.log(`${nbLiens} lien(s) interne(s) réécrit(s)`)

// Redirections et fichiers.
const fichierRedir = path.join(RACINE, 'src/config/redirections-articles.json')
const deja = JSON.parse(fs.readFileSync(fichierRedir, 'utf8'))
const sources = new Set(deja.map((r) => r.source))
const nouvelles = []
for (const [ancien, vers] of Object.entries(cible)) {
  if (!sources.has(`/blog/${ancien}`)) nouvelles.push({ source: `/blog/${ancien}`, destination: vers, permanent: true })
  const f = path.join(blog, ancien + '.md')
  if (!appliquer || !fs.existsSync(f)) continue
  if (RENOMMAGES[ancien]) fs.renameSync(f, path.join(blog, RENOMMAGES[ancien] + '.md'))
  else fs.unlinkSync(f)
}
if (appliquer) fs.writeFileSync(fichierRedir, JSON.stringify([...deja, ...nouvelles], null, 1))
console.log(`${nouvelles.length} redirection(s) 301 ${appliquer ? 'écrites' : 'à écrire'} ; ${Object.keys(FUSIONS).length} fusions, ${Object.keys(RENOMMAGES).length} renommages`)
