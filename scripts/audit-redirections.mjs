/**
 * AUDIT DES REDIRECTIONS — lit src/config/redirections.ts : boucles, chaînes (A → B → C), cibles qui ne sont ni une
 * route du sitemap ni un fichier public, sources en double. Lit aussi le sitemap servi par BASE (serveur de production local). Usage : node --experimental-strip-types --no-warnings scripts/audit-redirections.mjs
 */
import { REDIRECTIONS } from '../src/config/redirections.ts'
import { existsSync } from 'node:fs'

const BASE = process.env.BASE ?? 'http://localhost:3000'
const xml = await (await fetch(`${BASE}/sitemap.xml`)).text()
const routes = new Set([...xml.matchAll(/<loc>https:\/\/stackup-agency\.fr([^<]*)<\/loc>/g)].map((m) => m[1] || '/'))
// Chemins qui répondent 200 sans être dans le sitemap (pages noindex, API, fichiers).
const AUTRES = new Set(['/contact/merci', '/lab'])
const sansHote = REDIRECTIONS.filter((r) => !r.has)
const simples = sansHote.filter((r) => !/[:*()]/.test(r.source))
const motifs = sansHote.filter((r) => /[:*()]/.test(r.source))
const parSource = new Map()
let problemes = 0
const dit = (m) => {
  problemes++
  console.log('✗', m)
}
for (const r of simples) {
  if (parSource.has(r.source)) dit(`source en double : ${r.source}`)
  parSource.set(r.source, r)
}
const motifVers = (chemin) => {
  for (const m of motifs) {
    const re = new RegExp('^' + m.source.replace(/\/:path\*/g, '(?:/.*)?').replace(/:[a-zA-Z]+/g, '[^/]+') + '$')
    if (re.test(chemin)) return m
  }
  return null
}
const ok = (c) => routes.has(c) || AUTRES.has(c) || existsSync('public' + c)
for (const r of sansHote) {
  const cible = r.destination.split('#')[0].split('?')[0]
  if (/^https?:/.test(r.destination)) continue
  if (cible === r.source) dit(`boucle directe : ${r.source}`)
  if (parSource.has(cible)) dit(`chaîne : ${r.source} → ${cible} → ${parSource.get(cible).destination}`)
  else if (motifVers(cible)) dit(`chaîne (motif) : ${r.source} → ${cible} → ${motifVers(cible).destination}`)
  else if (!ok(cible) && !/:/.test(cible)) dit(`cible qui ne répond pas 200 : ${r.source} → ${r.destination}`)
}
// Une source qui est aussi une route du sitemap : la redirection masque une vraie page.
for (const r of simples) if (routes.has(r.source)) dit(`la source est une page du sitemap : ${r.source} → ${r.destination}`)
console.log(`${REDIRECTIONS.length} redirections (${simples.length} simples, ${motifs.length} à motif) · ${problemes ? problemes + ' problème(s)' : 'aucun problème'}`)
