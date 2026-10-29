/**
 * Vérifie seoTitle (35-60) et excerpt (140-158) des articles, et l'unicité sur TOUT le blog.
 * Usage : node scripts/seo/verifier-meta.mjs slug1 slug2 …   |   --tous
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
const dossier = path.resolve(import.meta.dirname, '../../src/content/blog')
const tous = fs.readdirSync(dossier).filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3))
const data = Object.fromEntries(tous.map((s) => [s, matter(fs.readFileSync(path.join(dossier, s + '.md'), 'utf8')).data]))
const compte = (champ) => tous.reduce((a, s) => { const v = String(data[s][champ] ?? '').trim().toLowerCase(); if (v) (a[v] ??= []).push(s); return a }, {})
const titres = compte('seoTitle'), excerpts = compte('excerpt')
const args = process.argv.slice(2)
const slugs = args.includes('--tous') ? tous : args
let erreurs = 0
for (const s of slugs) {
  const d = data[s]
  if (!d) { console.log('✗', s, 'introuvable'); erreurs++; continue }
  const pb = []
  const t = String(d.seoTitle ?? ''), e = String(d.excerpt ?? '')
  if (t.length < 35 || t.length > 60) pb.push(`seoTitle ${t.length} car. (35-60)`)
  if (e.length < 125 || e.length > 158) pb.push(`excerpt ${e.length} car. (125-158)`)
  if (titres[t.toLowerCase()]?.length > 1) pb.push('seoTitle en double : ' + titres[t.toLowerCase()].filter((x) => x !== s).join(', '))
  if (excerpts[e.toLowerCase()]?.length > 1) pb.push('excerpt en double')
  if (/…|\.\.\.$/.test(e)) pb.push('excerpt tronqué')
  if (/\d[\d\s  .,]*\s?(€|euros?)\b/i.test(t + ' ' + e)) pb.push('montant en chiffres')
  if (/\[|\]|TODO|\{\{/.test(t + ' ' + e)) pb.push('placeholder')
  console.log(pb.length ? '✗' : '✓', s, pb.join(' · '))
  erreurs += pb.length
}
process.exit(erreurs ? 1 : 0)
