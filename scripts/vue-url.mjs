/** Photographier une URL à un défilement donné. Usage : node scripts/vue-url.mjs <route> <y> [largeur] [nom] */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
const [route, y, L = '1280', nom] = process.argv.slice(2)
mkdirSync('docs/cadre', { recursive: true })
const n = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox'],
})
const page = await (await n.newContext({ viewport: { width: +L, height: 720 } })).newPage()
await page.goto('http://localhost:3100' + route, { waitUntil: 'networkidle' })
await page.evaluate((v) => scrollTo({ top: v, behavior: 'instant' }), +y)
await page.waitForTimeout(1400)
const f = `docs/cadre/${nom || route.replace(/\//g, '-').replace(/^-/, '')}-y${y}.png`
await page.screenshot({ path: f })
console.log('→ ' + f)
await n.close()
