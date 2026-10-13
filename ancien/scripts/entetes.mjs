/**
 * Photographier le HAUT de plusieurs pages, côte à côte.
 *
 * Sert à juger d'un coup d'œil si les ouvertures se ressemblent — ce qui ne
 * se voit pas en lisant les fichiers un par un.
 *
 * Usage : node scripts/entetes.mjs <dossier> <route> [route…]
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const [dossier, ...routes] = process.argv.slice(2)
const SORTIE = `docs/entetes/${dossier}`
mkdirSync(SORTIE, { recursive: true })

const n = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox'],
})
const ctx = await n.newContext({ viewport: { width: 1280, height: 620 } })
const page = await ctx.newPage()
const souci = []
page.on('pageerror', (e) => souci.push(String(e).slice(0, 110)))

for (const r of routes) {
  const url = 'http://localhost:3100' + r
  const rep = await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  const nom = (r === '/' ? 'accueil' : r.replace(/\//g, '-').replace(/^-/, '')) + '.png'
  await page.screenshot({ path: `${SORTIE}/${nom}` })
  console.log(`  ${String(rep?.status()).padEnd(4)} ${r}`)
}
console.log(`erreurs : ${souci.length}`)
souci.slice(0, 5).forEach((s) => console.log('  ' + s))
console.log('→ ' + SORTIE)
await n.close()
