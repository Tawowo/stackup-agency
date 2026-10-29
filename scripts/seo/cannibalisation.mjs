/**
 * CANNIBALISATION — deux pages du site se disputent-elles la même requête ?
 * Pour chaque grappe (docs/seo/grappes.csv, 20 premières variantes comprises), on cherche les AUTRES pages du sitemap dont le
 * title + h1 contiennent tous les mots de la requête principale. Une page cible qui ne les contient pas elle-même est aussi signalée.
 * Sortie : docs/seo/cannibalisation.csv (paires de pages, requêtes en cause) + résumé.
 *
 * Usage : node scripts/seo/cannibalisation.mjs [http://localhost:3100]
 */
import fs from 'node:fs'
import path from 'node:path'
import { RACINE, jetons, csv, lireCsv } from './lib.mjs'

const BASE = process.argv.find((a) => a.startsWith('http')) ?? 'http://localhost:3100'
const index = await (await fetch(`${BASE}/sitemap.xml`)).text()
const urls = []
for (const m of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const x = await (await fetch(m[1].replace('https://stackup-agency.fr', BASE))).text()
  for (const u of x.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.push(new URL(u[1]).pathname)
}
const brut = (h, re) => [...h.matchAll(re)].map((m) => m[1].replace(/<[^>]+>/g, ' ')).join(' ')
const entetes = new Map()
for (let i = 0; i < urls.length; i += 10)
  await Promise.all(
    urls.slice(i, i + 10).map(async (u) => {
      const h = await (await fetch(BASE + u)).text()
      entetes.set(u, new Set(jetons(brut(h, /<title>([\s\S]*?)<\/title>/g) + ' ' + brut(h, /<h1[^>]*>([\s\S]*?)<\/h1>/g))))
    }),
  )

const [e, ...rows] = lireCsv(fs.readFileSync(path.join(RACINE, 'docs/seo/grappes.csv'), 'utf8'))
const grappes = rows.filter((r) => r.length > 3).map((r) => Object.fromEntries(e.map((c, i) => [c, r[i] ?? ''])))
const paires = new Map()
let sansTitre = 0
for (const g of grappes) {
  const mots = [...new Set(jetons(g.requete_principale))]
  if (mots.length < 2) continue
  const couvre = (u) => entetes.has(u) && mots.every((m) => entetes.get(u).has(m))
  if (entetes.has(g.page_cible) && !couvre(g.page_cible)) sansTitre++
  for (const u of urls) {
    if (u === g.page_cible || !couvre(u)) continue
    // Pages de zone / ville / métier : le lieu ou le métier fait la différence, pas une cannibalisation.
    if (/^\/(agence-web|zones-intervention|creation-site-internet|services-locaux)\//.test(u) && /^\/(agence-web|zones-intervention|creation-site-internet|services-locaux)\//.test(g.page_cible)) continue
    const k = [g.page_cible, u].sort().join(' ↔ ')
    const p = paires.get(k) ?? { a: g.page_cible, b: u, n: 0, pot: 0, ex: g.requete_principale }
    p.n++; p.pot += Number(g.potentiel) || 0
    paires.set(k, p)
  }
}
const liste = [...paires.values()].sort((a, b) => b.pot - a.pot)
fs.writeFileSync(path.join(RACINE, 'docs/seo/cannibalisation.csv'), csv(liste.map((p) => ({ page_a: p.a, page_b: p.b, grappes: p.n, potentiel: Math.round(p.pot), exemple: p.ex })), ['page_a', 'page_b', 'grappes', 'potentiel', 'exemple']))
console.log(`${urls.length} pages · ${grappes.length} grappes · ${liste.length} paires de pages en concurrence potentielle · ${sansTitre} grappes dont la page cible n'a pas tous les mots en title/h1`)
for (const p of liste.slice(0, 12)) console.log(`  ${p.n} grappes · ${Math.round(p.pot)} · ${p.a} ↔ ${p.b} · « ${p.ex} »`)
