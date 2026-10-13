/**
 * Capture d'une section nommée, à plusieurs avancements de son défilement.
 *
 * Une animation pilotée par le défilement ne se juge pas sur un arrêt : on
 * traverse la section et on regarde le début, le milieu et la fin.
 *
 * Usage : node scripts/vue-section.mjs <sélecteur> [largeur] [pas]
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const SEL = process.argv[2] ?? '#anatomie'
const L = Number(process.argv[3] ?? 1440)
const PAS = Number(process.argv[4] ?? 5)
const H = L < 700 ? 844 : 900
const NOM = SEL.replace(/[^a-z0-9]/gi, '') || 'section'
const SORTIE = `docs/vue/${NOM}-${L}`
mkdirSync(SORTIE, { recursive: true })
const dormir = (ms) => new Promise((r) => setTimeout(r, ms))

const n = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox'],
})
const ctx = await n.newContext({
  viewport: { width: L, height: H },
  ...(L < 700 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}),
})
const page = await ctx.newPage()
const erreurs = []
page.on('pageerror', (e) => erreurs.push(e.message))
page.on('console', (m) => m.type() === 'error' && erreurs.push(m.text()))

await page.goto('http://127.0.0.1:3100/', { waitUntil: 'networkidle', timeout: 90000 })
await page.evaluate(() => { try { localStorage.setItem('cookie-consent', 'accepted') } catch {} })
await page.reload({ waitUntil: 'networkidle' })
await dormir(3200)

const cadre = await page.evaluate((s) => {
  const el = document.querySelector(s)
  if (!el) return null
  const r = el.getBoundingClientRect()
  return { haut: Math.round(r.top + window.scrollY), hauteur: Math.round(r.height) }
}, SEL)
if (!cadre) { console.log(`section ${SEL} absente`); await n.close(); process.exit(1) }
console.log(`${SEL} : haut ${cadre.haut} · hauteur ${cadre.hauteur}`)

// On traverse la section en partant d'un écran avant son haut.
const debut = Math.max(0, cadre.haut - H * 0.85)
const fin = cadre.haut + cadre.hauteur - H * 0.15
for (let i = 0; i < PAS; i++) {
  const y = Math.round(debut + ((fin - debut) * i) / Math.max(PAS - 1, 1))
  await page.evaluate((v) => window.scrollTo({ top: v, behavior: 'instant' }), y)
  await dormir(900)
  await page.screenshot({ path: `${SORTIE}/${i}-y${y}.png` })
  console.log(`  ${i} · y=${y}`)
}

console.log(`erreurs console : ${erreurs.length}`)
erreurs.slice(0, 3).forEach((e) => console.log('   ', e.slice(0, 150)))
console.log(`→ ${SORTIE}`)
await n.close()
