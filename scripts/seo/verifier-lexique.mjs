/**
 * Vérifie des entrées du lexique (src/content/lexique) : front matter, longueurs, FAQ, interdits, liens.
 * Usage : node scripts/seo/verifier-lexique.mjs slug1 slug2 …   |   --tous
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
const racine = path.resolve(import.meta.dirname, '../..')
const dossier = path.join(racine, 'src/content/lexique')
const blog = path.join(racine, 'src/content/blog')
const termes = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'lexique/termes.json'), 'utf8'))
const slugsValides = new Set(termes.map((t) => t.slug))
const args = process.argv.slice(2)
const slugs = args.includes('--tous') ? fs.readdirSync(dossier).filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3)) : args
const INTERDITS = [
  [/\d[\d\s  .,]*\s?(€|euros?)\b/i, 'montant en chiffres (utiliser un jeton {{prix:…}})'],
  [/\b(?:livr[ée]e?s?|livraison|délai)\b[^.\n]{0,40}\b\d+\s*(?:jours?|semaines?|mois)\b/i, 'délai de livraison chiffré'],
  [/fois moins cher/i, 'comparatif « × moins cher »'],
  [/hébergé?e?s? en (France|Europe)|hébergement en (France|Europe)/i, 'hébergement France/Europe'],
  [/\bValéry\b|depuis 2018/i, 'mention interdite'],
  [/site association|site pour association/i, 'offre association'],
  [/dans cet article,? nous (allons|verrons)/i, 'formule creuse'],
]
let erreurs = 0
for (const slug of slugs) {
  const f = path.join(dossier, slug + '.md')
  if (!fs.existsSync(f)) { console.log('✗', slug, 'introuvable'); erreurs++; continue }
  const { data, content } = matter(fs.readFileSync(f, 'utf8'))
  const mots = content.split(/\s+/).filter(Boolean).length
  const pb = []
  if (!slugsValides.has(slug)) pb.push('slug absent de termes.json')
  for (const c of ['term', 'title', 'seoTitle', 'excerpt', 'definition', 'date', 'updated', 'category', 'keywords', 'related']) if (!data[c]) pb.push('champ manquant : ' + c)
  if (data.seoTitle && String(data.seoTitle).length > 60) pb.push(`seoTitle ${String(data.seoTitle).length} car. (> 60)`)
  if (data.excerpt && String(data.excerpt).length > 155) pb.push(`excerpt ${String(data.excerpt).length} car. (> 155)`)
  if (data.definition && (String(data.definition).length < 90 || String(data.definition).length > 220)) pb.push(`definition ${String(data.definition).length} car. (90-220)`)
  if (data.category && !['web', 'seo', 'legal', 'gestion'].includes(data.category)) pb.push('catégorie inconnue : ' + data.category)
  const attendue = termes.find((t) => t.slug === slug)?.categorie
  if (attendue && data.category && data.category !== attendue) pb.push(`catégorie ${data.category} ≠ ${attendue}`)
  if (mots < 450) pb.push(`${mots} mots (< 450)`)
  if (mots > 900) pb.push(`${mots} mots (> 900)`)
  if (!/^\*\*[^*]{40,}\*\*/.test(content.trim())) pb.push('réponse directe en gras absente en tête')
  const faq = content.match(/##\s*Questions fréquentes[\s\S]*$/i)?.[0] ?? ''
  const nq = (faq.match(/^\*\*.+\?\*\*\s*$/gm) ?? []).length
  if (nq < 3) pb.push(`FAQ : ${nq} question(s) (< 3)`)
  const rel = Array.isArray(data.related) ? data.related : []
  if (rel.length < 3) pb.push('related : moins de 3 entrées')
  for (const r of rel) if (!slugsValides.has(r) || r === slug) pb.push('related invalide : ' + r)
  for (const [re, msg] of INTERDITS) if (re.test(content.replace(/\{\{[^}]+\}\}/g, ''))) pb.push(msg)
  for (const m of content.matchAll(/\]\((\/[^)\s]*)\)/g)) {
    if (m[1].startsWith('/blog/') && !fs.existsSync(path.join(blog, m[1].slice(6).replace(/\/$/, '') + '.md'))) pb.push('lien vers un article inexistant : ' + m[1])
    if (m[1].startsWith('/lexique/') && !slugsValides.has(m[1].slice(9).replace(/\/$/, ''))) pb.push('lien lexique inexistant : ' + m[1])
  }
  if (!/\]\(\/(services|outils|tarifs|creation-site-internet)/.test(content)) pb.push('aucun lien vers un service, un outil ou les tarifs')
  console.log(pb.length ? '✗' : '✓', slug, mots + ' mots', pb.join(' · '))
  erreurs += pb.length
}
process.exit(erreurs ? 1 : 0)
