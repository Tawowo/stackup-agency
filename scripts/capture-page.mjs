/**
 * Capture de la page d'accueil, section par section.
 *
 * Se cale sur le haut de chaque section réelle plutôt que sur une grille
 * régulière : on regarde des compositions, pas des tranches arbitraires.
 *
 * Usage : node scripts/capture-page.mjs [largeur]
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const LARGEUR = Number(process.argv[2] ?? 1440)
const HAUTEUR = LARGEUR < 700 ? 844 : 900
const SORTIE = `docs/page/${LARGEUR}`
mkdirSync(SORTIE, { recursive: true })
const dormir = (ms) => new Promise((r) => setTimeout(r, ms))

const n = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox'],
})
const ctx = await n.newContext({
  viewport: { width: LARGEUR, height: HAUTEUR },
  ...(LARGEUR < 700 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}),
})
const page = await ctx.newPage()
const erreurs = []
page.on('pageerror', (e) => erreurs.push(e.message))
page.on('console', (m) => m.type() === 'error' && erreurs.push(m.text()))

await page.goto('http://127.0.0.1:3100/', { waitUntil: 'networkidle', timeout: 90000 })
await page.evaluate(() => { try { localStorage.setItem('cookie-consent', 'accepted') } catch {} })
await page.reload({ waitUntil: 'networkidle' })
await dormir(3500)

const reperes = await page.evaluate(() => {
  const vus = []
  const pousser = (nom, el) => { if (el) vus.push({ nom, y: Math.round(el.getBoundingClientRect().top + window.scrollY) }) }
  pousser('hero', document.querySelector('[data-scene="ouverture"]'))
  pousser('seuil', document.querySelector('.su-seuil'))
  document.querySelectorAll('main section, .page-transition > div > section, .page-transition > section').forEach((s) => {
    const t = s.querySelector('h2')
    pousser((t?.textContent ?? s.id ?? 'section').trim().slice(0, 28).replace(/[^\w à-ÿÀ-Ÿ'-]/g, ''), s)
  })
  return vus
})

let i = 0
for (const r of reperes) {
  const y = Math.max(0, r.y - 20)
  await page.evaluate((v) => window.scrollTo({ top: v, behavior: 'instant' }), y)
  await dormir(1100)
  const nom = `${String(i).padStart(2, '0')}-${r.nom.replace(/\s+/g, '-').toLowerCase() || 'section'}`
  await page.screenshot({ path: `${SORTIE}/${nom}.png` })
  console.log(`  ${nom.padEnd(36)} y=${y}`)
  i++
}
console.log(`\nerreurs console : ${erreurs.length}`)
erreurs.slice(0, 3).forEach((e) => console.log('   ', e.slice(0, 150)))
console.log(`→ ${SORTIE}`)
await n.close()
