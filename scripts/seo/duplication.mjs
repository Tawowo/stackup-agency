/**
 * DUPLICATION ENTRE PAGES — pour chaque couple de pages du sitemap, part de séquences de 6 mots communes (Jaccard).
 * Le gabarit commun (menus, pied de page, blocs de gabarit présents sur au moins 8 % des pages d'une même famille) est retiré :
 * on mesure le texte propre de chaque page. Seuil : 15 %. Usage : node scripts/seo/duplication.mjs [BASE] → docs/qa/duplication.json
 */
import { writeFileSync } from 'node:fs'
import { lireSitemapXml } from '../lib-sitemap.mjs'

const BASE = process.argv.find((a) => a.startsWith('http')) ?? 'http://localhost:3100'
const SEUIL = 0.15
const N = 6
const xml = await lireSitemapXml(BASE)
const pages = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace('https://stackup-agency.fr', '') || '/')
const entites = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, ' ')
const texte = new Map()
const file = [...pages]
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (file.length) {
      const p = file.shift()
      const html = await (await fetch(BASE + p)).text()
      const main = (html.match(/<main[\s\S]*?<\/main>/i) ?? [html])[0].replace(/<(script|style|svg|template|noscript)[\s\S]*?<\/\1>/gi, ' ')
      texte.set(p, entites(main.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim().toLowerCase().split(' ').filter(Boolean))
    }
  }),
)
const famille = (p) => (p.startsWith('/blog/') ? 'article' : p.startsWith('/creation-site-internet/') ? 'metier' : p.startsWith('/agence-web/departement/') ? 'dep' : p.startsWith('/agence-web/') ? 'ville' : p.startsWith('/zones-intervention/') ? 'zone' : p.startsWith('/solutions/') ? 'solution' : p.startsWith('/services') ? 'service' : p.startsWith('/outils') ? 'outil' : 'autre')
const shingles = new Map()
for (const [p, mots] of texte) {
  const s = new Set()
  for (let i = 0; i + N <= mots.length; i++) s.add(mots.slice(i, i + N).join(' '))
  shingles.set(p, s)
}
// gabarit : séquences présentes sur au moins 8 % des pages de la famille (au moins 3 pages)
const gabarit = new Set()
const parFamille = new Map()
for (const p of texte.keys()) {
  const f = famille(p)
  if (!parFamille.has(f)) parFamille.set(f, [])
  parFamille.get(f).push(p)
}
for (const [, liste] of parFamille) {
  const c = new Map()
  for (const p of liste) for (const s of shingles.get(p)) c.set(s, (c.get(s) ?? 0) + 1)
  const seuil = Math.max(3, Math.ceil(liste.length * 0.08))
  for (const [s, n] of c) if (n >= seuil) gabarit.add(s)
}
for (const s of shingles.values()) for (const g of gabarit) s.delete(g)
// index inversé
const index = new Map()
for (const [p, s] of shingles) for (const x of s) { if (!index.has(x)) index.set(x, []); index.get(x).push(p) }
const communs = new Map()
for (const liste of index.values()) {
  if (liste.length < 2 || liste.length > 12) continue
  for (let i = 0; i < liste.length; i++) for (let j = i + 1; j < liste.length; j++) { const k = liste[i] + '|' + liste[j]; communs.set(k, (communs.get(k) ?? 0) + 1) }
}
const fortes = []
let pire = 0
for (const [k, n] of communs) {
  const [a, b] = k.split('|')
  const j = n / (shingles.get(a).size + shingles.get(b).size - n || 1)
  pire = Math.max(pire, j)
  if (j > SEUIL) fortes.push({ a, b, similarite: Math.round(j * 1000) / 10 })
}
fortes.sort((x, y) => y.similarite - x.similarite)
writeFileSync('docs/qa/duplication.json', JSON.stringify({ date: new Date().toISOString(), base: BASE, pages: texte.size, seuil: SEUIL * 100, pireSimilarite: Math.round(pire * 1000) / 10, couplesAuDessus: fortes.length, couples: fortes.slice(0, 200) }, null, 1))
console.log(`${texte.size} pages · pire similarité ${(pire * 100).toFixed(1)} % · ${fortes.length} couple(s) au-dessus de ${SEUIL * 100} %`)
for (const f of fortes.slice(0, 15)) console.log(`  ${f.similarite} %  ${f.a}  ↔  ${f.b}`)
process.exit(fortes.length ? 1 : 0)
