/**
 * TRIAGE DU BLOG — une ligne par article (publié, programmé) et par article déjà fusionné/renommé.
 * Décisions : Garder · Améliorer (étoffer, sourcer, rafraîchir) · Fusionné (301 appliquée) · Renommé (301 appliquée).
 * « Supprimer » et « Noindex » ne sont jamais décidés automatiquement : un article < 500 mots sans lien entrant est signalé « À arbitrer ».
 * Sortie : seo/blog-triage.csv.   Usage : node scripts/seo/blog-triage.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { RACINE, csv } from './lib.mjs'

const blog = path.join(RACINE, 'src/content/blog')
const script = fs.readFileSync(path.join(RACINE, 'scripts/seo/appliquer-fusions.mjs'), 'utf8')
const bloc = (nom) => script.match(new RegExp(`const ${nom} = \\{([\\s\\S]*?)\\n\\}`))[1]
const paires = (b) => [...b.matchAll(/'([^']+)':\s*'([^']+)'/g)].map((m) => [m[1], m[2]])
const FUSIONS = paires(bloc('FUSIONS'))
const RENOMMAGES = paires(bloc('RENOMMAGES'))

const fichiers = []
const parcourir = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) { if (!['node_modules', '.next'].includes(e.name)) parcourir(p) } else if (/\.(md|tsx?|json)$/.test(e.name)) fichiers.push(p) } }
parcourir(path.join(RACINE, 'src'))
const entrants = new Map()
for (const f of fichiers) {
  const t = fs.readFileSync(f, 'utf8')
  const soi = f.endsWith('.md') && f.startsWith(blog) ? path.basename(f, '.md') : null
  for (const m of t.matchAll(/\/blog\/([a-z0-9-]+)/g)) if (m[1] !== soi) entrants.set(m[1], (entrants.get(m[1]) ?? 0) + 1)
}
const aujourdhui = new Date().toISOString().slice(0, 10)
const lignes = []
for (const nom of fs.readdirSync(blog).filter((n) => n.endsWith('.md')).sort()) {
  const slug = nom.slice(0, -3)
  const t = fs.readFileSync(path.join(blog, nom), 'utf8')
  const fm = t.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''
  const champ = (k) => fm.match(new RegExp(`^${k}:\\s*"?([^"\\n]*)"?`, 'm'))?.[1] ?? ''
  const corps = t.replace(/^---[\s\S]*?\n---/, '')
  const mots = corps.replace(/[#>*_`|\[\]()-]/g, ' ').split(/\s+/).filter(Boolean).length
  const publie = champ('publishAt') || champ('date')
  const maj = champ('updated') || publie
  const ent = entrants.get(slug) ?? 0
  const raisons = []
  if (mots < 800) raisons.push(`${mots} mots : étoffer`)
  if (maj && (new Date(aujourdhui) - new Date(maj)) / 864e5 > 365) raisons.push('non mis à jour depuis plus d’un an')
  const pourcents = (corps.match(/\d+\s?%/g) ?? []).length
  if (pourcents >= 3 && !/https?:\/\/|service-public|cnil\.fr|economie\.gouv|insee\.fr|developers\.google/.test(corps)) raisons.push(`${pourcents} pourcentages sans source citée`)
  let decision = raisons.length ? 'Améliorer' : 'Garder'
  if (mots < 500 && ent === 0) { decision = 'À arbitrer'; raisons.push('aucun lien entrant') }
  lignes.push({ article: `/blog/${slug}`, titre: champ('title').slice(0, 90), publication: publie, programme: publie > aujourdhui ? 'oui' : 'non', maj, mots, liens_entrants: ent, decision, raison: raisons.join(' ; '), cible: '' })
}
for (const [a, v] of FUSIONS) lignes.push({ article: `/blog/${a}`, titre: '', publication: '', programme: '', maj: '', mots: '', liens_entrants: '', decision: 'Fusionné', raison: 'sujet couvert par l’article cible (contenu repris, 301 en place)', cible: v })
for (const [a, v] of RENOMMAGES) lignes.push({ article: `/blog/${a}`, titre: '', publication: '', programme: '', maj: '', mots: '', liens_entrants: '', decision: 'Renommé', raison: 'slug illisible remplacé (301 en place)', cible: `/blog/${v}` })
fs.writeFileSync(path.join(RACINE, 'seo/blog-triage.csv'), csv(lignes, ['article', 'titre', 'publication', 'programme', 'maj', 'mots', 'liens_entrants', 'decision', 'raison', 'cible']))
const n = (d) => lignes.filter((l) => l.decision === d).length
console.log(`${lignes.length} lignes · Garder ${n('Garder')} · Améliorer ${n('Améliorer')} · À arbitrer ${n('À arbitrer')} · Fusionné ${n('Fusionné')} · Renommé ${n('Renommé')}`)
