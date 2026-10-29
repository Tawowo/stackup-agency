/**
 * AUDIT VISUEL — une page par gabarit (échantillon tiré du sitemap), en 1440 et 390 px :
 * capture pleine page, débordement horizontal, erreurs console, images cassées, h1 unique.
 * Usage : node scripts/audit-visuel.mjs [http://localhost:3100]
 * Sortie : docs/qa/shots/audit-visuel/<page>-<largeur>.png + docs/qa/audit-visuel.json
 */
import fs from 'node:fs'
import { chromium } from 'playwright'

const BASE = process.argv.find((a) => a.startsWith('http')) ?? 'http://localhost:3100'
const SORTIE = 'docs/qa/shots/audit-visuel'
fs.mkdirSync(SORTIE, { recursive: true })

const index = await (await fetch(`${BASE}/sitemap.xml`)).text()
const urls = []
for (const m of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const x = await (await fetch(m[1].replace(/^https:\/\/stackup-agency\.fr/, BASE))).text()
  for (const u of x.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.push(new URL(u[1]).pathname)
}
// Un gabarit = le premier niveau d'URL + sa profondeur ; on garde les deux premières pages de chaque.
const parGabarit = new Map()
for (const u of urls) {
  const seg = u.split('/').filter(Boolean)
  const cle = `${seg[0] ?? 'accueil'}:${Math.min(seg.length, 3)}`
  parGabarit.set(cle, [...(parGabarit.get(cle) ?? []), u])
}
const echantillon = [...new Set([...parGabarit.values()].flatMap((l) => l.slice(0, 1)).concat(['/zones-intervention/touraine-ouest-val-de-loire', '/creation-site-internet', '/stackup-agency-en-bref']))]

const navigateur = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--use-gl=swiftshader'] })
const rapport = []
for (const [largeur, hauteur] of [[1440, 900], [390, 844]]) {
  const ctx = await navigateur.newContext({ viewport: { width: largeur, height: hauteur } })
  for (const chemin of echantillon) {
    const page = await ctx.newPage()
    const erreurs = []
    page.on('console', (m) => m.type() === 'error' && !/WebGL|GPU|GL_/i.test(m.text()) && erreurs.push(m.text().slice(0, 140)))
    page.on('pageerror', (e) => erreurs.push(String(e).slice(0, 140)))
    const r = await page.goto(BASE + chemin, { waitUntil: 'load' })
    await page.waitForTimeout(700)
    const mesure = await page.evaluate(() => ({
      debord: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1: document.querySelectorAll('h1').length,
      imagesCassees: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length,
    }))
    const nom = (chemin === '/' ? 'accueil' : chemin.slice(1).replace(/\//g, '_')).slice(0, 80)
    await page.screenshot({ path: `${SORTIE}/${nom}-${largeur}.png`, fullPage: false })
    const pb = []
    if (r?.status() !== 200) pb.push(`statut ${r?.status()}`)
    if (mesure.debord > 1) pb.push(`débordement horizontal ${mesure.debord}px`)
    if (mesure.h1 !== 1) pb.push(`${mesure.h1} h1`)
    if (mesure.imagesCassees) pb.push(`${mesure.imagesCassees} image(s) cassée(s)`)
    if (erreurs.length) pb.push(`console : ${erreurs[0]}`)
    rapport.push({ chemin, largeur, problemes: pb })
    if (pb.length) console.log(`✗ ${chemin} (${largeur}) — ${pb.join(' · ')}`)
    await page.close()
  }
  await ctx.close()
}
await navigateur.close()
fs.writeFileSync('docs/qa/audit-visuel.json', JSON.stringify(rapport, null, 1))
const ko = rapport.filter((r) => r.problemes.length).length
console.log(`${echantillon.length} pages × 2 largeurs : ${ko} avec problème`)
process.exit(ko ? 1 : 0)
