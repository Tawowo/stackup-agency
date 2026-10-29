/**
 * CONTRÔLE DU MAILLAGE INTERNE — parcourt toutes les URL du sitemap d'un serveur de production, reconstruit le graphe des liens
 * internes (liens <a href> du HTML rendu) et vérifie :
 *   - aucune page orpheline (au moins un lien entrant, hors elle-même) ;
 *   - chaque page est à 3 clics au plus de l'accueil ;
 *   - un fil d'Ariane (nav « Fil d'Ariane » ou BreadcrumbList) sur toute page autre que l'accueil.
 * Usage : node scripts/seo/maillage.mjs [BASE] → docs/qa/maillage.json ; code 1 s'il reste une erreur.
 */
import { writeFileSync } from 'node:fs'
import { lireSitemapXml } from '../lib-sitemap.mjs'

const BASE = process.argv.find((a) => a.startsWith('http')) ?? 'http://localhost:3000'
const ORIGINE = 'https://stackup-agency.fr'
const xml = await lireSitemapXml(BASE)
const pages = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(ORIGINE, '') || '/')
const ensemble = new Set(pages)
const sortants = new Map()
const sansAriane = []
const file = [...pages]
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (file.length) {
      const p = file.shift()
      const html = await (await fetch(BASE + p)).text()
      const liens = new Set()
      for (const m of html.matchAll(/<a\b[^>]*\bhref="([^"#?]*)[^"]*"/g)) {
        let h = m[1]
        if (h.startsWith(ORIGINE)) h = h.slice(ORIGINE.length)
        if (!h.startsWith('/') || h.startsWith('//')) continue
        h = h.replace(/\/$/, '') || '/'
        if (h !== p) liens.add(h)
      }
      sortants.set(p, liens)
      if (p !== '/' && !/aria-label="Fil d(’|')Ariane"|"@type":"BreadcrumbList"/.test(html)) sansAriane.push(p)
    }
  }),
)
const entrants = new Map(pages.map((p) => [p, 0]))
for (const [p, ls] of sortants) for (const l of ls) if (ensemble.has(l) && l !== p) entrants.set(l, (entrants.get(l) ?? 0) + 1)
const profondeur = new Map([['/', 0]])
const q = ['/']
while (q.length) {
  const p = q.shift()
  for (const l of sortants.get(p) ?? []) if (ensemble.has(l) && !profondeur.has(l)) { profondeur.set(l, profondeur.get(p) + 1); q.push(l) }
}
const orphelines = pages.filter((p) => p !== '/' && (entrants.get(p) ?? 0) === 0)
const injoignables = pages.filter((p) => !profondeur.has(p))
const trop = pages.filter((p) => profondeur.has(p) && profondeur.get(p) > 3)
const repartition = {}
for (const p of pages) repartition[profondeur.get(p) ?? 'inatteignable'] = (repartition[profondeur.get(p) ?? 'inatteignable'] ?? 0) + 1
const faibles = pages.filter((p) => (entrants.get(p) ?? 0) === 1)
writeFileSync('docs/qa/maillage.json', JSON.stringify({ date: new Date().toISOString(), base: BASE, pages: pages.length, repartitionProfondeur: repartition, orphelines, injoignables, plusDeTroisClics: trop, sansFilAriane: sansAriane, avecUnSeulLienEntrant: faibles.length }, null, 1))
console.log(`${pages.length} pages · profondeur ${JSON.stringify(repartition)} · orphelines ${orphelines.length} · à plus de 3 clics ${trop.length + injoignables.length} · sans fil d'Ariane ${sansAriane.length} · 1 seul lien entrant ${faibles.length}`)
for (const [t, l] of [['orphelines', orphelines], ['injoignables', injoignables], ['> 3 clics', trop], ['sans fil d’Ariane', sansAriane]]) if (l.length) console.log('  ' + t + ' :', l.slice(0, 12).join(' '), l.length > 12 ? `… (+${l.length - 12})` : '')
process.exit(orphelines.length + injoignables.length + trop.length + sansAriane.length ? 1 : 0)
